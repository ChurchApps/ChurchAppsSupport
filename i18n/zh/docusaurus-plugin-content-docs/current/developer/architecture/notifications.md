---
title: "通知与提醒架构"
---

# 通知与提醒架构

<div class="article-intro">

教会成员在当前所看页面之外看到的每一条消息——徽标数字、推送通知、摘要邮件——都会经过 MessagingApi 中的两个入口之一。本页面记录了这条消息漏斗、按计划为其提供输入的提醒引擎，以及决定什么内容最终能送达到某个人的偏好设置模型。

</div>

## 概览 —— 两个入口

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **任何需要告知某人某事的场景**都会经过 messaging 模块中的 `NotificationHelper.createNotifications()`。它会持久化一条 `notifications` 记录，并依次升级 socket → push → email，每个渠道都会经过 `PreferenceGateHelper` 的评估——包括第 0 级的 `in_app`。
2. **任何按计划发生的事情**都是一条 `reminderDefinition`（实体级或范围级），会被展开为若干条 `reminderOccurrences`，并由 `ReminderEngine.scan()` 在循环定时器上调度发送。一个展开器、一个调度器、一份发送账本（`reminderSentLog`）。
3. **直接发送邮件**只能通过 `TransactionalEmailHelper.sendTransactional()`。一条 ESLint 规则在编译期强制执行这一约束——详见下文。

:::tip 邮件入口是通过 lint 强制执行的，而不仅仅是约定
`Api/tools/eslint-rules/email-door.cjs` 定义了 `no-direct-email-helper` 规则：在 `NotificationHelper.ts` 或 `TransactionalEmailHelper.ts` 之外调用 `EmailHelper.sendTemplatedEmail()` 或 `EmailHelper.sendEmail()` 都会导致 lint 失败。如果你需要发送邮件，请通过消息漏斗（配合 `emailImmediate` 使用 `createNotifications`）或通过 `TransactionalEmailHelper.sendTransactional()` 来发送——没有第三条能通过 CI 的路径。
:::

## 通知漏斗

`NotificationHelper.createNotifications()` 是所有非计划性、非事务性通知的唯一入口：

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

对每一位收件人，它都会在 `notifications` 中保存一条记录，并调用 `attemptDeliveryWithEscalation`，沿下方的渠道阶梯依次尝试。对同一 `(contentType, contentId)`，如果已存在一条未读记录，则会抑制重复创建——这一去重保护对 `emailImmediate` 类发送（提醒偏移量、工作人员的“全员邮件”、自带去重逻辑的工作流步骤）以及始终会 ping socket 的私信场景是被跳过的。

`shared/helpers/NotificationService.ts` 为 messaging 模块之外的调用方镜像了同样的函数签名（`NotificationServiceOptions`），并在启动时向 messaging 模块注册。

## 渠道升级链

投递从某个级别开始（默认 0，提醒/显式发送场景可以更高），只有在上一级未能成功送达时才会推进到下一个渠道。每一级在尝试投递之前都会先经过 `PreferenceGateHelper` 的门控检查。

| 级别 | 渠道 | 行为 |
|-------|---------|----------|
| 0 | **应用内 / socket** | 首先检查 `in_app` 门控。如果被抑制（静音），该记录会以 `isNew=false` 持久化，投递完全终止——不会发送 socket 消息、不产生徽标、不再继续升级。否则服务器会查找该用户 `alerts` 房间的活跃 socket 连接，推送一个 `notification`（或 `privateMessage`）帧。对于普通通知，socket 投递一旦成功即在此处终止链条——30 分钟定时器会稍后重新检查未读项并继续升级。私信永远不会止步于 socket 这一级：已安装的 PWA 可能在后台保持 alerts socket 长连接，如果止步于此会导致本应触发的操作系统级推送被抑制。 |
| 1 | **push** | 受 `allowPush`、按类别退订状态、免打扰时段门控。会同时发送到该用户 `devices` 记录中找到的 Expo 推送令牌和 Web Push 订阅，按端点去重，并顺带清理失效令牌。 |
| 2 | **email（邮件）** | 受 `emailFrequency` 和按类别退订状态门控。立即发送（`emailImmediate`）会立刻渲染并写入一条 `deliveryLogs` 记录；否则该通知会保留待处理，等待下文所述的批量摘要发送。 |
| —— | **sms（短信）** | 偏好设置的相关管道（`allowSms`、按类别的渠道列表）已经预留了短信渠道，但目前没有任何生产者通过它发送——它保留给批量短信产品使用，该产品作为一条独立、隔离的流程通过 `TextingController` / `@churchapps/texting` 运行。 |

滞留在 socket 或 push 阶段的未读通知会由 30 分钟定时器（`NotificationHelper.escalateDelivery`）升级。批量摘要邮件由 `NotificationHelper.sendEmailNotifications(frequency)` 发送，受每位用户的 `emailFrequency` 偏好驱动：`individual`（逐条）在 30 分钟定时器上运行，`daily`（每日）在夜间定时器上运行。（`weekly`——每周——是一个合法的偏好取值，但目前尚无专属的批量发送任务。）

## 提醒引擎

计划性提醒——活动提醒、任务截止日期、服事/计划分配提醒——全部经由一个统一的通用引擎处理，而非各功能各自实现的定时任务逻辑。

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**定义**（`reminderDefinitions`）要么是实体级的（设置了 `entityId`——指向某个具体的活动、任务或计划），要么是范围级的（`entityId` 为空，设置了 `scopeId`——例如某个服事计划类型下的每一个计划）。一条定义携带一组以分钟为单位的偏移量 CSV（`offsets`，例如 `"1440,60"` 表示提前一天和提前一小时）、一个本地发送时间（`sendLocalTime`）、一组渠道 CSV（`channels`——包含 `email` 会在发送时触发一封即时的富文本邮件）、一个 `recipientMode`，以及一条可选的自定义 `message`。

**展开**过程会为未来一段时间范围（一个滚动的多日窗口）物化出触发行。它在夜间定时器上运行，并且每当一条定义被保存时也会同步触发一次，以确保临时新增的活动仍能收到提醒。范围级定义会通过适配器的 `loadScopeEntities` 展开成多份，为每一个具体实体生成一组独立的发生记录；实体级发生记录使用键 `definitionId:occurrenceISO:offset`，而范围级发生记录则按实体 ID 划分命名空间，因此二者永远不会冲突。对一条发生记录执行 upsert 操作会**复活**此前被取消的记录——先取消再重新展开，是在底层实体发生变化后重新同步提醒的标准做法；已经处于 `sent`、`failed` 或 `processing` 状态的记录则保持不变。

**调度**（`ReminderEngine.scan()`）在 30 分钟定时器上运行。它会认领已到期的发生记录（通过租约机制防止重复处理）、通过对应实体的适配器加载收件人、过滤掉已在该发生记录的 `reminderSentLog` 中记录过的收件人，然后以 `deliveryStartLevel: 1`（直接跳到 push 级别）调用 `createNotifications`，并在定义的渠道包含邮件时附带 `emailImmediate`/`emailByPerson`。

一条内部事件总线会响应实体变更，而无需等待夜间展开任务：内容事件（经由 Webhook 调度器）以及计划/任务的更新事件会触发受影响实体的立即重新展开或取消，一次计划更新还会连带重新展开与其计划类型关联的所有范围级定义。

### 适配器

引擎本身与具体实体类型无关；每一种受支持的实体类型都通过一个适配器（`helpers/adapters/`）接入：

| 实体类型 | 适配器 | 说明 |
|-------------|---------|-------|
| `event`（活动） | `EventReminderAdapter` | 收件人范围取决于活动本身和 `recipientMode`，可以是报名者，也可以是小组成员。 |
| `plan`（计划） | `PlanReminderAdapter` | 收件人是已接受和未确认的计划分配人员。`buildEmails` 会调用 `DoingModuleGateway.buildPlanReminderEmails`，后者通过 `doing/helpers/PlanReminderEmailHelper` 渲染职位、备注和自定义消息，其中包含由 `ReminderTokenHelper` 签名的“接受/拒绝”按钮，点击后会提交到一个公开的分配响应端点。 |
| `task`（任务） | `TaskReminderAdapter` | 收件人是该任务的受理人。 |

### 端点

| 方法 | 路径 | 用途 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 加载或保存某个实体的提醒定义。 |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 加载或保存某个范围级（可继承）的提醒定义。 |
| `DELETE` | `/messaging/reminders/:defId` | 删除一条定义并取消其所有待处理的发生记录。 |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 在保存前预览某条活动提醒的收件人数量和下一次触发时间。 |
| `GET` | `/messaging/reminders/log` | 某个教会近期的提醒发生历史记录。 |
| `POST` | `/messaging/reminders/mute` | 针对某个具体实体静音提醒。 |

保存一条定义会为对应的实体或范围触发一次同步重新展开，因此编辑者无需等待夜间任务即可看到最新的“下一次触发时间”。

## 私信

私信复用了与其他一切相同的漏斗，而非另起一条独立的升级路径。每一段未读对话都会在 `notifications` 中对应一条**影子记录**（`contentType='privateMessage'`，`contentId` 为该私信 ID，`category='direct_messages'`），由它承载全部投递状态——socket/push/email 升级、已读跟踪，无一例外。`privateMessages` 表本身保存消息正文以及一个 `notifyPersonId` 列，后者正是未读徽标的来源，会在收件人读取该对话时被清空。

影子记录对通知铃铛完全不可见：未读计数查询、通知列表查询以及标记已读/删除查询都会过滤掉 `contentType <> 'privateMessage'` 的记录。无论未读状态如何，每一条私信提醒都会照常触达 socket（即时聊天语义——不做去重），而且私信从不像普通通知那样止步于 socket 投递，因为处于后台的 PWA 可能一边保持 socket 长连接，一边仍然需要操作系统级的推送。如果某人将私信通知静音，对应的影子记录会被搁置（`isNew=false`，`notifyPersonId` 被清空）——在对话本身内部依然可见，只是不再产生徽标或提醒。

## 偏好设置与门控

每一次发送都会经过 `PreferenceGateHelper.evaluate()` 的评估，这是一个纯函数（所有状态均作为参数传入，热路径上不发生任何数据库调用），返回 `allow`（允许）、`suppress`（抑制）或 `defer`（推迟）。各层依次执行，最先做出决定的一层生效：

1. **锁定类别** —— 某些类别是强制的（第 0 层），会绕过其余所有层。
2. **主开关静音/渠道整体关闭** —— `masterMute`、`allowPush`、`allowSms` 或 `emailFrequency='never'` 会直接抑制发送。
3. **免打扰时段** —— 仅适用于 push 和短信（邮件被视为非侵入性渠道）。如果用户所在时区的当前墙钟时间落在其免打扰窗口内，事务性类别仍会被放行；非事务性类别则会被推迟到免打扰窗口结束，具体时刻通过 `TimezoneHelper.wallClockToUtc` 计算为一个考虑夏令时的 UTC 时间点。
4. **按类别的偏好覆盖** —— 针对某个“类别 × 渠道”组合的显式退订；缺失该覆盖则沿用该类别的默认设置。
5. **按实体静音** —— 针对某个具体实体（例如某场活动、某个计划）记录的静音设置，其限制范围比类别级设置更细，但仅在调用方随通知一起提供了实体 ID/类型时才会生效。

涉及的表：`notificationPreferences`（全局设置——`masterMute`、`emailFrequency`（取值为 `individual|daily|weekly|never`）、`allowPush`、免打扰时段窗口 + 时区、`allowSms`）、`notificationPreferenceOverrides`（按类别 × 渠道）以及 `notificationEntityMutes`（按实体）。

这一门控机制在漏斗内对应用内（第 0 级）、push（第 1 级）和邮件（第 2 级）全部强制生效——包括即时的提醒/摘要邮件。事务性邮件（认证码、密码重置、邀请、捐赠收据）则按设计绕过这一机制——这正是第二个入口存在的全部意义。

## 调度

提醒引擎和通知摘要都搭载在已有的调度定时器之上，而不是引入新的基础设施：

| 定时器 | 计划 | 执行内容 |
|-------|----------|------|
| 30 分钟定时器 | 每 30 分钟 | 升级未读通知；发送 `individual`（逐条）频率的摘要邮件；调度已到期的提醒发生记录（`ReminderEngine.scan`）；审批摘要；到期的自动化执行 |
| 夜间定时器 | UTC 05:00 | 小组出勤提醒；推进循环性直播服务；刷新自动刷新列表；为下一时间窗口展开提醒发生记录（`ReminderEngine.expandAll`）；发送 `daily`（每日）频率的摘要邮件 |

在本地环境中，同样的逻辑可以从 `Api` 项目通过 `npm run timer:30min` 和 `npm run timer:midnight` 按需触发。

## 文件清单

| 区域 | 文件 |
|------|-------|
| 漏斗 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`、`PreferenceGateHelper.ts`、`NotificationCategoryHelper.ts`、`WebPushHelper.ts`、`ExpoPushHelper.ts`、`SocketHelper.ts`、`DeliveryHelper.ts` |
| 共享入口 | `Api/src/shared/helpers/NotificationService.ts` |
| 事务性邮件入口 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`，lint 规则 `Api/tools/eslint-rules/email-door.cjs` |
| 提醒引擎 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`、`ReminderBootstrap.ts`、`helpers/adapters/*`、`controllers/ReminderController.ts` |
| 提醒相关仓储 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`、`ReminderOccurrenceRepo.ts`、`ReminderSentLogRepo.ts` |
| 服事/计划邮件 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`、`ReminderTokenHelper.ts`、`Api/src/shared/modules/DoingModuleGateway.ts` |
| 提醒编辑器（B1Admin） | `serving/components/PlanTypeReminderEdit.tsx`、`calendars/components/EventReminderEdit.tsx`、`serving/tasks/components/TaskReminderEdit.tsx` |
| 提醒编辑器/偏好设置（B1App） | `EventReminderEdit.tsx`、`NotificationPrefsPage.tsx`、`useRealtimeNotifications.ts` |

## 相关页面

- [实时架构](../realtime) —— 应用内投递级别所依托的 WebSocket 协议与客户端基础组件（`SocketHelper`、`SubscriptionManager`、`ConversationStore`）
- [Web 推送通知](../web-push) —— push 升级级别所使用的 VAPID 设置与浏览器 Push API 路径
- [消息端点](../api/endpoints/messaging) —— 消息、对话、连接以及通知/提醒相关路由的完整 REST 接入面
