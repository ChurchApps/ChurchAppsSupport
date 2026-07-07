---
title: "审计日志和可撤销批次"
---

# 审计日志和可撤销批次

<div class="article-intro">

Api中的每个用户启动的变更都被记录 — 谁、什么、何时以及从哪里 — 跨所有模块，不需要任何按控制器布线。在该账本之上有一个批次层：导入或批量操作可以标记为批次，稍后可以**逐行撤销**，Planning-Center风格。两者都存在于成员资格数据库中的单个`auditLogs`表中，完全由一个瓶颈驱动，`BaseController.actionWrapper`。此页面映射了什么被审计、数据存在的位置、塑造它的性能权衡以及undo如何安全地反向批次而不需要跨数据库事务。

</div>

## 概览

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

下面的两个结构事实驱动了一切：

1. **控制器层是唯一知道参与者的地方。**存储库从不看到`AuthenticatedUser`；只有控制器持有`au`。每个模块的控制器已经通过`BaseController.actionWrapper`，所以这就是审计接入的地方 — 任何地方都不会改变repo签名。
2. **一个表为所有模块服务。**给予、出勤、内容等的审计行都被写入成员资格DB的`auditLogs`，通过`RepoManager.getRepos("membership")`，即使来自非成员资格控制器。"Jane今天改变的一切"保持为单个查询。

## 什么被审计

审计**对所有路由上的每个变更动词都是默认启用的**。`actionWrapper`从请求派生审计字段，零配置：

| 字段 | 派生自 |
|-------|--------------|
| `module` | `this.moduleName`（所属模块） |
| `entityType` | `req.baseUrl`的单数化最后一段（例如`/membership/people` → `person`） |
| `category` | 默认为`entityType` |
| `action` | `POST /`为`${entityType}_saved`，`DELETE /:id`为`${entityType}_deleted`，否则`${entityType}_${method}:${routePath}`，以便自动捕获非CRUD子路由（例如`task_post:/:id/move`） |

`BaseController.AUDIT_REGISTRY`**仅用于覆盖和选择退出** — 它不是一个允许列表。路由出现在那里是为了重命名其category/entityType，声明`{ dbModule, table }`（使其成为批次和撤销capable），将其标记为`sensitive`（审计匿名变更），或用`optOut: true`关闭它。

**选择退出列表**（会淹没账本的消防管写入路径）：出勤`visits` / `visitsessions` / `sessions` / `checkin`（周日签到风暴）和消息`messages` / `connections` / `devices`（聊天和状态）。其他一切都记录。

**批量端点**（`people/bulk-delete`、`people/bulk-update`、`groupmembers/bulk-add`、`groupmembers/bulk-remove`）在`BULK_ROUTES`中注册，为每个接触的id发出**一行审计行**，所以10k个人导入产生10k行 — 那个按实体粒度正是使批次可撤销的原因。

**匿名变更**（`actionWrapperAnon` — 访客给予、访客注册、表单提交）仅针对注册表标记的`sensitive`路由进行审计，使用`userId="anonymous"`加客户端IP写入。捐赠引领列表；该路径有真实的回归历史。

### 秘密编辑和大小限制

在任何`details`有效负载存储之前，`AuditLogHelper.capDetails()`在其上运行`sanitizeValue()`：

- **秘密密钥被编辑。**任何小写名称在`SENSITIVE_KEYS`中的字段（`password`、`token`、`cvv`、`cardnumber`、`routing_number`、`accesstoken`、`clientsecret`等）被替换为`"[redacted]"`。
- **巨大的标量被剥离。**任何`data:`URI或超过4 KB的字符串（base64照片、blob）变为`"[stripped]"`。
- **超大行被限制。**如果序列化JSON超过约64 KB，整个有效负载被替换为`{ truncated: true }`。被截断的行仍然可查看 — 但**不可撤销**（没有before/after图像可从中恢复）。

## 数据存储的位置

单个`auditLogs`表在**成员资格**数据库中支持每个模块。列：`id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`。迁移`tools/migrations/membership/2026-07-04_audit_universal.ts`添加`module` + `batchId`，将`details`从`TEXT`扩展到`MEDIUMTEXT`，添加索引`ix_auditLogs_batch (batchId)`和`ix_auditLogs_entity (churchId, module, entityType, entityId, created)`，并创建`batches`表。`module`列的存在正是为了`entityType`跨模块的碰撞（`note`、`setting`存在于多个中）保持可过滤，而实体索引是什么为每实体历史和撤销冲突防守提供动力的。

跨模块写入通过`RepoManager.getRepos("membership")`从包装器内部进行。顺序是深思熟虑的：**主写入首先在模块DB中提交，审计插入第二。**在正常模式下审计插入失败被吞掉（`console.error`，Sentry拾起它） — 审计是顾问性的且必须从不使请求失败。在**批次模式下它是严格的**（见下文）。

:::info 为什么不使用触发器、CDC或每模块表？
- **MySQL触发器**不知道表演者（连接没有`au`），并且意味着维护跨每个架构的触发器集。
- **binlog / CDC**是一个整个基础设施项目，具有相同的参与者身份问题。
- **通过每个repo线程化`userId`**将意味着数百个文件的触动，以移动控制器层已经具有的信息。
- **每模块审计表**意味着任何跨模块问题的7倍管道和扇出查询。在控制器瓶颈处的一个表是最少代码的设计，仍然捕获参与者。
:::

## 性能立场

热路径故意很便宜；成本只在购买的地方支付。

- **正常更新时没有读前写。**常规保存**不会**加载旧记录。**提交的after-values**存储在`details.after`中；UI在*视图*时通过与实体的前一个审计行进行diff来重建old→new。查看时一次查询，写时零成本。自启动以来从不接触的字段只是显示没有"旧"值 — 可接受的。
- **删除获得before-image。**`DELETE /:id`在具有`{ dbModule, table }`的注册表路由上首先通用加载行并将其存储在`details.before`中。删除很少见，before-image是整个法医价值。
- **批次模式是唯一的系统读前写**，它是选择加入的 — 批量/导入操作已经很昂贵，所以N快照读是撤销的代价。
- **审计插入被等待。**`actionWrapper`收集日志承诺并在返回之前`await Promise.allSettled(...)`。这是最单一的最重要的不变量：在Lambda上容器**在响应返回的瞬间冻结**，所以un-awaited插入被无声地丢弃。"消防忘记"这里意味着*错误从不失败请求*，不*不等待* — 单个插入在已经温暖的成员资格池上是约1–3毫秒。

## 批次和撤销

一个**批次**分组一组变更，以便它们可以一起审查和反向。有两种方式打开：

- **显式：**`POST /membership/batches { label, source }`返回`batchId`。然后客户端（B1Transfer、B1Admin导入UI）在每个后续保存/删除上发送`X-Batch-Id: <id>`。`POST /membership/batches/:id/complete`关闭它并标记`itemCount`。
- **隐式：**四个批量端点在单个请求内打开、填充和完成它们自己的批次，在响应中返回`batchId`。

`batches`表（成员资格DB）：`id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`。

### 批次模式是严格的

当`X-Batch-Id`存在时，`actionWrapper`收紧每个防守（`writeBatchAuditRows`）：

1. 批次必须存在、为`open`且属于`au.churchId` — 否则**403**。
2. 路由必须支持批次（注册表中的`{ dbModule, table }`） — 否则**400**。
3. 在操作运行之前，所有受影响ID的before-images在**一个**`WHERE id IN (...) AND churchId = ?`查询中加载。如果该快照读失败，请求**失败500且操作不执行** — 批次模式必须从不无声地产生un-undoable账本。（相比之下，正常模式是尽力而为并吞掉快照失败。）
4. 操作成功后，使用`batchId`、`details.before`和`details.after`，加上明确的**创建标记**为批次创建的行，写入每个实体的一个审计行。

### 撤销

`POST /membership/batches/:id/undo`（权限：批次创建者或`Permissions.server.admin`）。如果批次不是`completed`或早于**30天撤销窗口**，它会拒绝。`BatchUndoHelper.undo()`然后：

1. 加载批次的审计行并**按`(module, entityType, entityId)`分组它们。**一个在一个批次内多次接触的实体被反向**一次**，回到其真实的pre-batch状态 — 最早的before-image，或一个delete如果批次创建它。这就是为什么撤销不天真地重播每一行：恢复中间批次内快照将是错误的。
2. 对于每个实体，首先运行**冲突防守**：`auditLog.hasLaterModification()`询问是否存在该相同`(module, entityType, entityId)`的任何*稍后*审计条目在此批次之外。如果是这样，实体在导入后被编辑 — 它被**跳过并报告**，从不被覆盖。这重用审计日志本身作为修改检测器；任何表上都不需要`modifiedAt`列。
3. 根据记录的操作进行反向，从注册表解析`{ dbModule, table }`并使用通用Kysely写入：
   - **创建** → 硬删除行。
   - **更新** → 写回`details.before`。
   - **删除** → 重新插入`details.before`（如果具有该id的行重新出现则update-or-insert）。
4. 每个反向本身被审计（`action: "<entityType>_undone"`，无`batchId` — undo-of-undo超出范围）。

操作从明确的**创建标记**选择，不从缺失的before-image推断 — 合法的空before-image或被截断的行必须不被错认为创建。

结果有效负载是`{ restored, skippedConflicts: [...], failed: [...], status }`；批次移动到`undone`（干净）或`partial`。**没有跨DB事务** — 撤销是按行尽力而为，与Planning Center为合并的档案记录的相同限制。

:::warning 副作用实体需要`onUndo`钩子
反向`groupMember`创建也必须写`groupMemberHistory`（"left"），或搅动分析无声地中断 — 一个常设的工作区不变量。这样的实体在`AUDIT_REGISTRY`中注册一个`onUndo`回调，当它已经完全处理反向时返回`true`，绕过通用路径。`groupMembers`是规范的案例（在显式路径上由行id键化但在批量端点上由`personId`键化，并在每个add/remove上历史追踪）。
:::

## 消费者表面

两个管理表面都**在进行中**；目的：

| 表面 | 存储库 | 目的 |
|---------|------|---------|
| **审计日志页面** | B1 Admin（ManageChurch → 审计日志） | 按模块/类别/用户/实体过滤并呈现old→new差异 — 对于通过与实体的前一条目进行diff的编辑，对于来自`details.before`的删除。由`GET /membership/auditlogs`支持，由`Permissions.server.admin`门控。 |
| **批次页面** | B1 Admin（相同设置中心） | 列出具有状态和计数的批次、**查看结果**（批次的审计行通过`GET /membership/batches/:id/results`）以及一个**撤销**按钮，显示跳过的冲突/失败报告。 |
| **导入批次** | B1Transfer | 打开批次，在其正常保存调用上发送`X-Batch-Id`，在结尾完成 — 导入变为可撤销，不需要新的导入端点。旧的`importKey`保持为仅创建血统标记，为撤销所取代。 |

## Gotchas一个未来的改变必须不回归

- **审计插入必须保持等待。**Un-awaited `AuditLogHelper.log(...)`被Lambda冻结丢弃。收集承诺并在返回前`await Promise.allSettled`。
- **Kysely从`.set()`/`.values()`中丢弃`undefined`。**在恢复时，清除的列将不受影响地存活。`BatchUndoHelper`将每个缺失的字段转换为明确的`null`（`nullify`） — 不要为了"更快"的直接写入绕过它。
- **保留必须保持远高于撤销窗口。**`AuditLogRepo.deleteOld()`在夜间定时器上运行（默认365天保留）；撤销窗口是30天。如果保留曾经向窗口下降，撤销账本从开放批次下被清除。
- **截断的行不可撤销。**`{ truncated: true }`有效负载没有before/after图像；undo报告它为`failed`，从不猜测。
- **顺序是module-write-then-audit。**从不将审计插入移到实际写入之前，在批次中保持严格/在正常中为顾问性。

## 文件清单

| 区域 | 文件 |
|------|-------|
| 包装器/注册表 | `Api/src/shared/infrastructure/BaseController.ts`（`AUDIT_REGISTRY`、`BULK_ROUTES`、`actionWrapper`、`actionWrapperAnon`、快照+写行） |
| 撤销引擎 | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| 审计帮助器 | `Api/src/modules/membership/helpers/AuditLogHelper.ts`（`log`、`capDetails`/`sanitizeValue`、`diffFields`、`getClientIp`） |
| 控制器 | `Api/src/modules/membership/controllers/AuditLogController.ts`、`BatchController.ts` |
| 模型/存储库 | `Api/src/modules/membership/models/AuditLog.ts`、`Batch.ts`；`repositories/AuditLogRepo.ts`（`loadFiltered`、`loadForBatch`、`hasLaterModification`、`deleteOld`）、`BatchRepo.ts` |
| 迁移 | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| 管理UI（进行中） | B1 Admin审计日志+批次页面；B1Transfer导入批次标题 |

## 相关页面

- [模块结构](../api/module-structure) — 非成员资格控制器如何通过`RepoManager`到达成员资格repos
- [给予](./giving) — 即使匿名也被审计为`sensitive`的捐赠写路径
- [成员资格端点](../api/endpoints/membership) — 携带`X-Batch-Id`和暴露`/auditlogs`和`/batches`的REST表面
