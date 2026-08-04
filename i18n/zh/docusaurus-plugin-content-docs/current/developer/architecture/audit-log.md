---
title: "审计日志与可撤销批次"
---

# 审计日志与可撤销批次

<div class="article-intro">

Api 中每一次由用户发起的变更都会被记录下来——谁、做了什么、何时、从哪里——覆盖所有模块，且无需为每个控制器单独接线。在这份账本之上叠加了一个批次层：一次导入或批量操作可以被标记为一个批次，之后可以像 Planning Center 那样**逐行撤销**。二者都存放在 membership 数据库中的同一张 `auditLogs` 表里，并完全由同一个统一入口 `BaseController.actionWrapper` 驱动。本页面梳理了哪些内容会被审计、数据存放在哪里、塑造这套设计的性能取舍，以及撤销操作如何在不依赖跨数据库事务的情况下安全地反转一个批次。

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

以下两个结构性事实驱动了下面的一切：

1. **只有控制器层知道操作者是谁。**仓储层从不接触 `AuthenticatedUser`；只有控制器持有 `au`。每个模块的控制器早已都经过 `BaseController.actionWrapper`，因此审计逻辑就接入在这里——不需要改动任何地方的仓储方法签名。
2. **一张表服务所有模块。**捐赠、出勤、内容等各类审计记录都通过 `RepoManager.getRepos("membership")` 写入 membership 数据库的 `auditLogs` 表，即使调用方是一个非 membership 模块的控制器也是如此。“Jane 今天改动了什么”这样的查询因此始终只需一次查询即可完成。

## 哪些内容会被审计

审计功能对**所有路由上的每一个变更类动词都默认开启**。`actionWrapper` 会以零逐路由配置的方式从请求中推导出审计字段：

| 字段 | 推导来源 |
|-------|--------------|
| `module` | `this.moduleName`（所属模块） |
| `entityType` | `req.baseUrl` 最后一段的单数化形式（例如 `/membership/people` → `person`） |
| `category` | 默认等于 `entityType` |
| `action` | `POST /` 记为 `${entityType}_saved`，`DELETE /:id` 记为 `${entityType}_deleted`，其他情况记为 `${entityType}_${method}:${routePath}`，从而自动捕获非 CRUD 的子路由（例如 `task_post:/:id/move`） |

`BaseController.AUDIT_REGISTRY` **仅用于覆盖设置和退出选择**——它不是一份白名单。某个路由出现在这份注册表里，是为了重命名其 category/entityType，声明 `{ dbModule, table }`（使其具备批次与撤销能力），将其标记为 `sensitive`（对匿名变更也进行审计），或者用 `optOut: true` 将其关闭。

**退出列表**（会淹没账本的高频写入路径）：出勤模块的 `visits` / `visitsessions` / `sessions` / `checkin`（周日签到高峰）以及消息模块的 `messages` / `connections` / `devices`（聊天与在线状态）。其他一切都会被记录。

**批量端点**（`people/bulk-delete`、`people/bulk-update`、`groupmembers/bulk-add`、`groupmembers/bulk-remove`）在 `BULK_ROUTES` 中注册，会为每一个受影响的 ID 各生成**一条审计记录**，因此一次一万人的导入会产生一万条记录——正是这种按实体粒度记录的方式，才使得批次可以被撤销。

**匿名变更**（`actionWrapperAnon`——访客捐赠、访客报名、表单提交）只对注册表中标记为 `sensitive` 的路由进行审计，写入时 `userId="anonymous"` 并附带客户端 IP。捐赠功能是这份列表里最主要的一项；这条路径有过真实的回归问题历史。

### 敏感信息脱敏与体积上限

在任何 `details` 负载被存储之前，`AuditLogHelper.capDetails()` 都会对其运行 `sanitizeValue()`：

- **敏感键名会被脱敏。**任何字段名（小写后）出现在 `SENSITIVE_KEYS` 中的（`password`、`token`、`cvv`、`cardnumber`、`routing_number`、`accesstoken`、`clientsecret` 等）都会被替换为 `"[redacted]"`。
- **超大标量值会被剥离。**任何 `data:` URI，或超过 4 KB 的字符串（base64 照片、二进制块），都会变为 `"[stripped]"`。
- **超大记录会被截断。**如果序列化后的 JSON 超过约 64 KB，整个负载会被替换为 `{ truncated: true }`。被截断的记录仍可查看——但**不可撤销**（没有 before/after 镜像可供还原）。

## 数据存放在哪里

membership 数据库中的一张 `auditLogs` 表支撑着所有模块。列：`id、churchId、userId、category、action、entityType、entityId、details（MEDIUMTEXT JSON 字符串）、ipAddress、module、batchId、created`。迁移脚本 `tools/migrations/membership/2026-07-04_audit_universal.ts` 新增了 `module` + `batchId` 两列，将 `details` 从 `TEXT` 扩展为 `MEDIUMTEXT`，新增索引 `ix_auditLogs_batch (batchId)` 和 `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`，并创建了 `batches` 表。`module` 列的存在正是为了让跨模块的 `entityType` 重名（多个模块中都存在 `note`、`setting`）保持可过滤，而实体索引正是支撑按实体查历史和撤销冲突检测的关键。

跨模块写入是从包装器内部通过 `RepoManager.getRepos("membership")` 完成的。顺序是刻意设计的：**主写入先在对应模块的数据库中提交，审计写入随后进行。**在正常模式下，审计写入失败会被吞掉（`console.error`，由 Sentry 捕获）——审计只是辅助性的，绝不能导致用户请求失败。而在**批次模式下审计写入是严格的**（见下文）。

:::info 为什么不用触发器、CDC 或按模块建表？
- **MySQL 触发器**无法知道操作者是谁（数据库连接本身没有 `au` 信息），并且意味着需要在每一套架构里都维护一整套触发器。
- **binlog / CDC** 是一个体量堪比整个基础设施的项目，且同样存在操作者身份未知的问题。
- **把 `userId` 一路穿透到每个仓储方法**意味着要改动数百个文件，只为搬运控制器层本就已经掌握的信息。
- **按模块各建一张审计表**意味着任何跨模块问题都要承受 7 倍的管道搭建成本和扇出查询。在控制器这个统一入口处放一张表，是代价最小、又仍能捕获操作者信息的设计。
:::

## 性能取舍

热路径被刻意做得很轻量；只有在真正能换来价值的地方才会付出成本。

- **常规更新不做“先读后写”。**一次普通保存**不会**先加载旧记录。**提交上来的 after 值**被存入 `details.after`；界面在*查看*时才通过与该实体上一条审计记录做差异比对来重建“旧值 → 新值”。查看时一次查询，写入时零成本。自上线以来从未被改动过的字段只是不显示“旧值”而已——这是可以接受的。
- **删除操作会记录 before 镜像。**在具备 `{ dbModule, table }` 注册信息的路由上，`DELETE /:id` 会先通用性地加载该行数据，并存入 `details.before`。删除操作本就罕见，而 before 镜像正是其取证价值的全部所在。
- **批次模式是唯一系统性地“先读后写”的场景**，且它是可选加入的——批量/导入操作本身开销就已经不低，N 次快照读取正是撤销能力所要付出的代价。
- **审计写入会被等待。**`actionWrapper` 会收集所有日志写入的 Promise，并在返回响应前 `await Promise.allSettled(...)`。这是最重要的一条不变量：在 Lambda 上，容器会**在响应返回的那一瞬间被冻结**，因此一个没有被等待的写入操作会被无声丢弃。这里所说的“发后不管”指的是*错误绝不能导致请求失败*，而不是*不去等待*——在早已热身完毕的 membership 连接池上，单次写入大约只需 1–3 毫秒。

## 批次与撤销

一个**批次**将一组变更打包在一起，以便日后能够整体审阅和反转。有两种方式可以开启一个批次：

- **显式方式：**`POST /membership/batches { label, source }` 返回一个 `batchId`。客户端（B1Transfer、B1Admin 的导入界面）随后在每一次后续的保存/删除请求上都携带 `X-Batch-Id: <id>`。`POST /membership/batches/:id/complete` 会关闭该批次，并记录下 `itemCount`。
- **隐式方式：**四个批量端点会在单次请求内部自行开启、填充并完成一个批次，并在响应中返回该 `batchId`。

`batches` 表（membership 数据库）：`id、churchId、userId、label、source、status（open|completed|undone|partial|failed）、itemCount、created、completedAt、undoneAt`。

### 批次模式是严格的

当请求携带 `X-Batch-Id` 时，`actionWrapper` 会收紧每一道防护（`writeBatchAuditRows`）：

1. 该批次必须存在、状态为 `open`，且归属于 `au.churchId`——否则返回 **403**。
2. 该路由必须支持批次能力（在注册表中登记了 `{ dbModule, table }`）——否则返回 **400**。
3. 在执行操作之前，所有受影响 ID 的 before 镜像会通过**一次** `WHERE id IN (...) AND churchId = ?` 查询一次性加载完毕。如果这次快照读取失败，请求会**以 500 失败，且该操作不会执行**——批次模式绝不能悄无声息地产生一份无法撤销的账本。（相比之下，正常模式是尽力而为，会吞掉快照失败的情况。）
4. 操作成功后，会为每个实体写入一条审计记录，包含 `batchId`、`details.before` 和 `details.after`，对于该批次新创建的记录还会额外附上一个明确的**创建标记**。

### 撤销

`POST /membership/batches/:id/undo`（权限：批次创建者或 `Permissions.server.admin`）。如果该批次尚未 `completed`，或已超出**30 天的撤销窗口期**，该请求会被拒绝。此后 `BatchUndoHelper.undo()` 会：

1. 加载该批次的所有审计记录，并按 `(module, entityType, entityId)` **分组**。一个在同一批次内被多次改动的实体只会被反转**一次**，恢复到其真实的批次开始前状态——即最早的 before 镜像，或者如果该实体是本批次新建的，则执行删除。这正是撤销操作不会天真地逐条重放每一行记录的原因：恢复某个批次中间的一个快照状态会是错误的。
2. 对每一个实体，首先运行**冲突检测**：`auditLog.hasLaterModification()` 会检查在此批次之外，是否存在针对同一 `(module, entityType, entityId)` 的*更晚*一条审计记录。如果存在，说明该实体在导入之后又被编辑过——它会被**跳过并记入报告**，绝不会被覆盖。这一机制巧妙地复用审计日志本身作为“是否被修改过”的检测器；不需要在任何表上新增 `modifiedAt` 列。
3. 依据记录下来的操作类型执行反转，从注册表中解析出 `{ dbModule, table }`，并使用通用的 Kysely 写入操作：
   - **创建（created）** → 硬删除该行。
   - **更新（updated）** → 把 `details.before` 写回去。
   - **删除（deleted）** → 重新插入 `details.before`（如果该 ID 对应的记录又重新出现，则改为“存在则更新，不存在则插入”）。
4. 每一次反转本身都会被审计（`action: "<entityType>_undone"`，不带 `batchId`——撤销之上的再撤销不在支持范围内）。

要执行的操作类型是根据明确的**创建标记**来判定的，而不是从“缺少 before 镜像”这一现象去推断——因为一个合法的空 before 镜像，或者一条被截断的记录，都绝不能被误判为“创建”。

结果负载的形式是 `{ restored, skippedConflicts: [...], failed: [...], status }`；批次的状态会转为 `undone`（干净完成）或 `partial`（部分完成）。**这里不存在跨数据库事务**——撤销是按行尽力而为完成的，这与 Planning Center 在其文档中针对“已合并档案”所说明的限制是同一类限制。

:::warning 带副作用的实体需要一个 `onUndo` 钩子
反转一次 `groupMember` 的创建操作时，也必须同步写入一条 `groupMemberHistory`（“left”）记录，否则流失率分析会悄无声息地出错——这是一条固定的工作区不变量。此类实体会在 `AUDIT_REGISTRY` 中注册一个 `onUndo` 回调，当它已经完整处理了反转逻辑时返回 `true`，从而绕过通用处理路径。`groupMembers` 就是这方面的典型案例（在显式路径上以行 ID 为键，而在批量端点上则以 `personId` 为键，且每一次新增/移除都会被写入历史记录）。
:::

## 消费端界面

两个管理端界面目前都**尚在开发中**；其设计意图如下：

| 界面 | 所在代码仓库 | 用途 |
|---------|------|---------|
| **审计日志页面** | B1Admin（管理教会 → 审计日志） | 按模块/类别/用户/实体进行筛选，并渲染“旧值 → 新值”差异——对于编辑操作，通过与该实体上一条记录做差异比对得出；对于删除操作，则来自 `details.before`。后端由 `GET /membership/auditlogs` 支撑，受 `Permissions.server.admin` 权限控制。 |
| **批次页面** | B1Admin（同一设置中心内） | 列出各批次及其状态与计数，提供**查看结果**（通过 `GET /membership/batches/:id/results` 获取该批次的审计记录）功能，以及一个**撤销**按钮，可展示被跳过的冲突/失败报告。 |
| **导入批次** | B1Transfer | 开启一个批次，在其常规保存调用上携带 `X-Batch-Id`，并在结束时完成该批次——导入功能因此获得撤销能力，且无需新增任何导入端点。旧有的 `importKey` 仍然保留，作为“仅用于创建操作”的溯源标记，其撤销功能已被本机制取代。 |

## 未来改动切勿破坏的注意事项

- **审计写入必须始终被等待。**未被等待的 `AuditLogHelper.log(...)` 会被 Lambda 冻结而丢失。请务必收集所有 Promise，并在返回响应前 `await Promise.allSettled`。
- **Kysely 会从 `.set()`/`.values()` 中丢弃 `undefined` 值。**在还原时，一个原本应被清空的字段会因此保持不变、未被触及。`BatchUndoHelper` 会把每一个缺失的字段显式转换为 `null`（`nullify`）——切勿为了追求“更快”而绕过这一步直接写入。
- **保留期必须始终远大于撤销窗口期。**`AuditLogRepo.deleteOld()` 在夜间定时任务上运行（默认保留 365 天）；撤销窗口期为 30 天。如果保留期一旦缩短到接近这个窗口期，正打开的批次的撤销账本就有可能在其被使用之前遭到清理。
- **被截断的记录无法撤销。**一份 `{ truncated: true }` 负载没有 before/after 镜像；撤销操作会将其报告为 `failed`，绝不会去猜测。
- **顺序必须始终是“先写入模块数据，后写审计”。**永远不要把审计写入提前到实际写入之前，并保持“批次模式下严格、正常模式下尽力而为”这一区分。

## 文件清单

| 区域 | 文件 |
|------|-------|
| 包装器/注册表 | `Api/src/shared/infrastructure/BaseController.ts`（`AUDIT_REGISTRY`、`BULK_ROUTES`、`actionWrapper`、`actionWrapperAnon`、快照及批量写入逻辑） |
| 撤销引擎 | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| 审计辅助类 | `Api/src/modules/membership/helpers/AuditLogHelper.ts`（`log`、`capDetails`/`sanitizeValue`、`diffFields`、`getClientIp`） |
| 控制器 | `Api/src/modules/membership/controllers/AuditLogController.ts`、`BatchController.ts` |
| 模型/仓储 | `Api/src/modules/membership/models/AuditLog.ts`、`Batch.ts`；`repositories/AuditLogRepo.ts`（`loadFiltered`、`loadForBatch`、`hasLaterModification`、`deleteOld`）、`BatchRepo.ts` |
| 迁移脚本 | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| 管理端界面（进行中） | B1Admin 的审计日志与批次页面；B1Transfer 的导入批次请求头 |

## 相关页面

- [模块结构](../api/module-structure) —— 非 membership 模块的控制器如何通过 `RepoManager` 访问 membership 模块的仓储
- [捐赠](./giving) —— 即便是匿名场景也会被标记为 `sensitive` 加以审计的捐赠写入路径
- [Membership 端点](../api/endpoints/membership) —— 携带 `X-Batch-Id`，并暴露 `/auditlogs` 和 `/batches` 的 REST 接入面
