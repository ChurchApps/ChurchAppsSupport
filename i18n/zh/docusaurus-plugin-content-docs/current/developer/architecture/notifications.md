---
title: "通知与提醒架构"
description: "B1 Admin API 如何通过统一的投递通道和偏好设置门控来路由通知、定时提醒、教会邮件限制以及短信退订。"
---

# 通知与提醒架构

<div class="article-intro">

会员在其正在查看的页面之外看到的每一条消息——角标计数、推送通知、摘要邮件——都会经过 MessagingApi 中的两扇门之一。本页记录了这一投递通道、按计划为其提供内容的提醒引擎，以及决定消息是否真正送达某人的偏好模型。

</div>

## 概述——两扇门

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **任何告知人员某事的内容**，都会经过消息模块中的 `NotificationHelper.createNotifications()`。它会保存一条 `notifications` 记录，并依次经过 socket → 推送 → 邮件，在每个渠道上评估 `PreferenceGateHelper`——包括处于第 0 级的 `in_app`。
2. **任何已排定的内容**都是一个 `reminderDefinition`（实体级或范围级），会展开为 `reminderOccurrences`，并由 `ReminderEngine.scan()` 在定时器上分发。一个展开器、一个分发器、一份发送账本（`reminderSentLog`）。唯一的例外是从 B1Admin 的 **Mobile > Push Notifications** 页面或小组的 **Notify** 对话框排定的教职人员推送：它是一条 `scheduledNotifications` 记录（受众为 `church` 或 `group`），由 `ScheduledNotificationHelper.dispatchDue()` 在每分钟的定时器上发送。首次尝试时，若超过 `sendAt` 30 分钟以上的记录会被标记为失败并注明 `missed send window`，而不会迟发；发送失败的记录最多重试 3 次。收件人在发送时由 `PushAudienceHelper` 解析（与即时小组发送所用的辅助工具相同），并通过 `createNotifications()` 以 `churchPushNotification`（偏好类别 `announcements`）或 `groupPushNotification` 的形式投递。
3. **直接发送邮件**只能通过 `TransactionalEmailHelper.sendTransactional()` 进行。ESLint 规则会在编译时强制执行这一点——参见下文。

:::tip 邮件通道由 lint 强制执行，而非仅靠约定
`Api/tools/eslint-rules/email-door.cjs` 定义了 `no-direct-email-helper`：在 `NotificationHelper.ts` 或 `TransactionalEmailHelper.ts` 之外调用 `EmailHelper.sendTemplatedEmail()` 或 `EmailHelper.sendEmail()` 都会导致 lint 失败。如果需要发送邮件，请通过通道（使用 `emailImmediate` 的 `createNotifications`）或 `TransactionalEmailHelper.sendTransactional()` 进行——没有任何第三种方式能通过 CI。
:::

## 通知通道

`NotificationHelper.createNotifications()` 是任何非定时、非事务性内容的唯一入口：

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

对于每位收件人，它会保存 `notifications` 中的一行，并调用 `attemptDeliveryWithEscalation`，后者沿着下面的渠道阶梯逐级进行。同一 `(contentType, contentId)` 下仍未读的记录会阻止重复创建——对于 `emailImmediate` 发送（提醒的偏移量、工作人员的“群发邮件”、工作流步骤自行管理去重）以及私信（它们总是会触发 socket）则跳过此去重保护。

`shared/helpers/NotificationService.ts` 为消息模块之外的调用方提供了相同的签名（`NotificationServiceOptions`），并在启动时注册到消息模块。

## 渠道升级链

投递从某一级别开始（默认为 0，提醒或显式发送可以从更高级别开始），且只有在前一渠道未成功时才会进入下一渠道。每一级在尝试前都要先经过 `PreferenceGateHelper` 的门控。

| 级别 | 渠道 | 行为 |
|-------|---------|----------|
| 0 | **in_app / socket** | 首先检查 `in_app` 门控。如果被抑制（静音），该行会以 `isNew=false` 保存，投递立即停止——不会发送 socket 信号、不显示角标，也不会继续升级。否则，服务器会查找该人员 `alerts` 房间中的已打开 socket 连接，并推送 `notification`（或 `privateMessage`）帧。对于普通通知，socket 投递成功即在此停止——30 分钟的定时器会重新检查未读项目并稍后升级。私信从不止步于 socket：已安装的 PWA 可能会在后台保持 alerts socket 打开，否则会抑制操作系统级推送。 |
| 1 | **push** | 受 `allowPush` / 类别退订 / 免打扰时段门控。发送到人员 `devices` 记录中找到的 Expo 推送令牌和 Web Push 订阅，按端点去重，并在过程中清除失效的令牌。 |
| 2 | **email** | 受 `emailFrequency` 和类别退订门控。即时发送（`emailImmediate`）会立即渲染，并写入一条 `deliveryLogs` 记录；否则通知会保持待处理状态，等待下面所述的批量摘要。 |
| — | **sms** | 不属于升级阶梯中的一级。唯一受门控的短信生产者是提醒引擎：当某个定义的 `channels` 包含 `sms` 时，`ReminderEngine.sendSms()` 会在推送/邮件通知**之外**，再向每位收件人发送短信（参见[短信提醒](#text-reminders)）。批量短信（`TextingController` / `@churchapps/texting`）、服务概览中的**短信通知志愿者**（`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`），以及工作流的**发送短信**步骤操作（`StepActionHelper.sendText` → `sendPersonText`），都直接通过教会的服务提供商发送短信，因此通知偏好和免打扰时段对它们不适用——只遵守人员的 `optedOut` 标记。 |

仍为未读状态、停留在 socket 或推送级别的通知，会由 30 分钟定时器（`NotificationHelper.escalateDelivery`）进行升级。批量邮件由 `NotificationHelper.sendEmailNotifications(frequency)` 发送，由每个人员的 `emailFrequency` 偏好驱动：`individual` 在 30 分钟定时器上运行，`daily` 在每晚定时器上运行。（`weekly` 是有效的偏好值，但目前尚无专门的批量运行。）

## 提醒引擎

已排定的提醒——活动提醒、任务截止日期、服事/计划安排提醒——全部通过一个通用引擎运行，而不是各自为政的定时任务逻辑。

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**定义**（`reminderDefinitions`）可以是实体级（设置了 `entityId`——某个特定活动、任务或计划），也可以是范围级（`entityId` 为空，设置了 `scopeId`——例如某服事计划类型下的每个计划）。一个定义包含：以逗号分隔的分钟偏移量（`offsets`，例如 `"1440,60"` 表示提前一天和一小时）、本地发送时间（`sendLocalTime`）、以逗号分隔的渠道列表（`channels`——其中 `email` 会在发送时立即发出富文本邮件）、`recipientMode`，以及可选的自定义 `message`。

**展开**会为前方的时间范围（滚动的多天窗口）实体化触发记录。它在每晚定时器上运行，并且在每次保存定义时同步运行，以确保即将到来的活动的提醒也能触发。范围定义通过适配器的 `loadScopeEntities` 扇出，为每个具体实体生成一组出现记录；实体级的出现记录使用键 `definitionId:occurrenceISO:offset`，而范围级的出现记录则以实体 ID 作为命名空间，因此两者永远不会冲突。插入一条出现记录会**恢复**之前已取消的行——取消后再重新展开，是在底层实体发生变化后重新同步提醒的标准做法；已为 `sent`、`failed` 或 `processing` 状态的行则保持不变。

**分发**（`ReminderEngine.scan()`）在 30 分钟定时器上运行。它会认领已到期的出现记录（租约机制防止重复处理），通过实体的适配器加载收件人，过滤掉 `reminderSentLog` 中已为该出现记录登记过的人员，并以 `deliveryStartLevel: 1`（直接跳到推送）调用 `createNotifications`；当定义的渠道包含邮件时，还会附加 `emailImmediate`/`emailByPerson`。

### 短信提醒 {#text-reminders}

当某个定义的 `channels` 包含 `sms` 时，`scan()` 会在推送/邮件通知创建之后，对同一批新收件人调用 `ReminderEngine.sendSms()`。短信采用逐人同意制：

- 每位收件人都会经过 `PreferenceGateHelper.evaluate(..., "sms", ...)`，因此必须开启 `allowSms`（默认关闭，由 B1App 的**短信**开关设置），且该类别的 `sms` 渠道不能被覆盖为关闭。`event_reminders`、`serving_schedule` 和 `tasks` 在 `defaultChannels` 和 `allowedChannels` 中都列出了 `sms`。
- 没有 `mobilePhone` 或设置了 `optedOut` 的人员会被抑制。如果教会没有短信服务提供商，整批收件人都会以 `no_provider` 原因被抑制。
- 短信正文由 `ReminderEngine.smsBody()` 生成：`"<Church name>: <message> Reply STOP to opt out."`，并修剪为一个 160 个字符的分段。
- 每位收件人都会获得一条独立的 `reminderSentLog` 记录，其 `channel: "sms"`，状态为 `sent` / `suppressed` / `failed`，与推送/邮件记录分开保存，因此短信失败不会导致推送或邮件被重新发送。

编辑器仅在 `GET /messaging/texting/status` 返回 `{ enabled: true }`（即教会的第一个短信服务提供商已启用）时才提供 **Text** 选项。

**STOP 退订。** `POST /messaging/texting/inbound/:churchId/:token` 是一个匿名 Webhook，由教会粘贴到其服务提供商中（B1Admin 在短信设置中显示由 `GET /messaging/texting/inboundUrl` 返回的网址）。令牌是教会 ID 的 HMAC（`SmsOptOutHelper.token`）。`SmsOptOutHelper.parse` 同时支持 Twilio 风格的表单字段和 Clearstream/TextInChurch 风格的 JSON；如果回复恰好是运营商的停止关键词（`STOP`、`STOPALL`、`UNSUBSCRIBE`、`CANCEL`、`END`、`QUIT`、`OPTOUT`、`REVOKE`），则教会中手机号码匹配的每位未删除人员都会被设置 `people.optedOut = true` 和 `allowSms = false`。其他回复会被确认但忽略。

内部事件总线会对实体变更做出响应，无需等待每晚的展开：内容事件（通过 Webhook 分发器）以及计划/任务的更新事件会立即为受影响的实体重新展开或取消；计划更新还会重新展开与其计划类型关联的任何范围定义。

### 适配器

引擎与实体类型无关；每种受支持的实体类型都通过适配器（`helpers/adapters/`）接入：

| 实体类型 | 适配器 | 说明 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 收件人根据活动和 `recipientMode` 限定为报名者或小组成员。 |
| `plan` | `PlanReminderAdapter` | 收件人为已发布（非草稿）计划上状态为已接受和未确认的安排。通过服事确认工作流发出的未确认安排，在被接受之前会被排除（参见下文）。`buildEmails` 调用 `DoingModuleGateway.buildPlanReminderEmails`，后者通过 `doing/helpers/PlanReminderEmailHelper` 渲染岗位、备注和自定义消息，包括由 `ReminderTokenHelper` 签名、并提交到公开安排回复端点的“接受/拒绝”按钮。 |
| `task` | `TaskReminderAdapter` | 收件人为任务的负责人。 |

### 端点

| 方法 | 路径 | 用途 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 加载或保存某一实体的提醒定义。 |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 加载或保存范围级（继承的）提醒定义。 |
| `DELETE` | `/messaging/reminders/:defId` | 删除定义并取消其待处理的出现记录。 |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 在保存前预览活动提醒的收件人数和下次触发时间。 |
| `GET` | `/messaging/reminders/log` | 教会近期的提醒出现记录历史。 |
| `POST` | `/messaging/reminders/mute` | 静音某一特定实体的提醒。 |

保存定义会同步触发该实体或范围的重新展开，因此编辑者无需等待每晚任务即可看到最新的“下次触发”时间。

## 直接消息

私信与其他所有内容一样通过同一通道投递，而不是另建一条升级路径。每个未读对话都会在 `notifications` 中拥有一条**影子行**（`contentType='privateMessage'`，`contentId` = 私信 ID，`category='direct_messages'`），由它管理所有投递状态——socket/推送/邮件升级、已读追踪等一切。`privateMessages` 表本身保存消息内容以及 `notifyPersonId` 列，后者是未读角标的来源，并在接收者阅读对话后被清除。

影子行对通知铃铛不可见：它们被排除在未读计数查询、通知列表查询，以及标记已读/删除查询之外，这些查询都会过滤 `contentType <> 'privateMessage'`。每条私信提醒都会触发 socket，与未读状态无关（实时聊天语义——无去重），而且私信与普通通知不同，从不止步于 socket 投递，因为后台的 PWA 可能保持 socket 打开，但仍需要操作系统级的推送。如果某人静音了私信通知，影子行会被暂停（`isNew=false`，并清除 `notifyPersonId`）——在对话内部仍然可见，只是不再显示角标或提醒。

## 偏好与门控

每次发送都要经过 `PreferenceGateHelper.evaluate()`，这是一个纯函数（所有状态都通过参数传入，热路径上不访问数据库），返回 `allow`、`suppress` 或 `defer`。各层依次运行，第一个作出决定的层生效：

1. **锁定类别**——某些类别是强制的（第 0 层），会绕过所有其他层。
2. **总静音 / 渠道关闭**——`masterMute`、`allowPush`、`allowSms`（默认关闭——成员需主动开启）或 `emailFrequency='never'` 会直接抑制。
3. **免打扰时段**——仅适用于推送和短信（邮件被视为不具打扰性）。如果人员所在时区的当前墙上时间落在其免打扰窗口内，事务性类别仍会送达；非事务性类别则会被推迟到免打扰窗口结束，结束时间通过 `TimezoneHelper.wallClockToUtc` 计算为正确处理夏令时的 UTC 时刻。
4. **按类别的偏好覆盖**——针对某一类别 × 渠道组合的显式退订；没有记录则使用该类别的默认值。
5. **按实体静音**——针对特定实体（例如某个活动、某个计划）记录的静音，比类别级设置限制更多，但仅当调用方同时提供了实体 ID/类型时才生效。

涉及的表：`notificationPreferences`（全局——`masterMute`、`emailFrequency`（`individual|daily|weekly|never`）、`allowPush`、免打扰时段窗口及时区、`allowSms`）、`notificationPreferenceOverrides`（按类别 × 渠道）、`notificationEntityMutes`（按实体）。

该门控在通道内对应用内（第 0 级）、推送（第 1 级）和邮件（第 2 级）均有效——包括即时的提醒/摘要邮件——也适用于 `ReminderEngine.sendSms()` 中的提醒短信。事务性邮件（验证码、密码重置、邀请、奉献收据）按设计绕过此门控；这正是第二扇门存在的意义。

### 服事确认工作流

计划可以选择使用 `workflowType = "assignmentConfirmation"` 的工作流（`plans.confirmationWorkflowId`）。发布/通知时，会调用 `POST /doing/plans/:id/issueRequests`，而不是逐个安排发送通知：每个新的未确认安排都会获得 `notified` 和 `confirmationWorkflowId`，并生成一张工作流卡片（`tasks.assignmentId`，唯一的 `followupKey`）。该卡片会发送一条仅限应用内的提醒（`appOnly: true`——不升级为推送或邮件），然后运行工作流的 `sendAssignmentRequest` 操作，这些操作通过 `MessagingModuleGateway.sendServingWorkflowMessage` 执行：邮件经由 `NotificationHelper.sendWorkflowEmail`（偏好门控 + `ChurchEmailLimiter`，计量为 `workflowEmail`）发送，短信仅在 `allowSms` 且通过 `serving_schedule` 类别门控时经由 `sendPersonText` 发送。接受/拒绝（事件总线上的 `assignment.updated`）会关闭卡片；30 分钟定时器（`AssignmentWorkflowHelper.processPending`）负责修复遗漏的启动和事件，并将在跟进截止时仍未回复的请求转为负责人审核任务。完整的生命周期参见 `Api/docs/assignment-confirmation-workflows.md`。

## 教会撰写的邮件限制

由教会撰写内容的邮件会从 ChurchApps 共享的 SES 身份发出，因此由 `Api/src/shared/helpers/ChurchEmailLimiter.ts` 按教会计量。有四条路径会调用它：小组/模板发送（`EmailTemplateController`，内容类型 `email`）、表单跟进邮件（`FormSubmissionController`，`formFollowUp`）、工作流**发送邮件**操作（`NotificationHelper`，带 `churchAuthored`、`workflowEmail`），以及服事确认的请求邮件（`NotificationHelper.sendWorkflowEmail`，`workflowEmail`）。系统邮件（验证码、收据、提醒）以及角色和小组邀请（`UserController.sendInviteEmail`，固定模板）不计量。

- **审批门控。** 教会在服务器管理员设置 `churches.emailApprovedDate`（`POST /membership/churches/:id/emailApproval`，服务器管理 → 教会 → **Group Email** 标签）之前不会发送任何内容。已归档的教会始终被阻止。B1Admin 的“发送邮件”对话框读取 `GET /messaging/emailTemplates/sendStatus`（`approved`、`paused`、`remaining`、`requested`），在未获批准时显示 **Request review**（申请审核）卡片，而不是编辑器。工作流步骤编辑器读取同一端点（对 `tasks.admin` 与 `groupMembers.edit` 同样开放），以便在教会未获批准或已暂停时对**发送邮件**操作发出警告。发送时，若 `ChurchEmailLimiter.remaining()` 低于 1，`MessagingModuleGateway.sendTemplatedEmail` 会返回 `false` 且不创建通知，因此卡片的历史记录绝不会对被丢弃的邮件显示**邮件已发送**。`POST /messaging/emailTemplates/requestApproval` 每个教会每周最多向支持团队发送一封邮件。
- **按表现获得的配额。** 已获批准的教会可获得 `max(150, 2 × 其在前 30 天内最佳的教会撰写邮件日发送量)`，在滚动的 24 小时内上限为 2,000 封。计算“最佳日”时会排除当前的 24 小时，因此突发发送无法提高其自身的上限。
- **先预留，后结算。** `reserve()` 在发送前为每位收件人写入一条 `deliveryLogs` 记录，并在计入这些记录后重新检查配额；若两个请求竞争超过上限，则回滚（请求返回 429）。`settle()` 将每条记录标记为已发送或失败。
- **投诉暂停。** `sesFeedback` Lambda（`Api/src/lambda/ses-feedback-handler.ts`，数据来自 SES → SNS）会将每个永久退信或投诉关联到该地址在相近时间收到的教会撰写邮件所属的教会，并以 `deliveryMethod` `sesBounce` / `sesComplaint` 的形式存储。在 7 天内，若出现 2 次及以上投诉（≥ 发送量的 0.3%）或 10 次及以上硬退信（≥ 5%），该教会将被暂停。

## 调度

提醒引擎和通知摘要都依托现有的定时器运行，而不是引入新的基础设施：

| 定时器 | 调度 | 运行内容 |
|-------|----------|----------|
| 30 分钟定时器 | 每 30 分钟 | 升级未读通知；发送 `individual` 频率的摘要邮件；分发到期的提醒出现记录（`ReminderEngine.scan`）；审批摘要；到期的自动化执行 |
| 1 分钟定时器（`timerWebhooks`） | 每分钟 | 发送到期的定时推送通知（`ScheduledNotificationHelper.dispatchDue`，任务 `scheduledNotifications`） |
| 每晚定时器 | 世界协调时 05:00 | 小组出勤提醒；推进循环直播服务；刷新自动刷新列表；为下一个时间范围展开提醒出现记录（`ReminderEngine.expandAll`）；发送 `daily` 频率的摘要邮件 |

在本地，可以在 `Api` 项目中通过 `npm run timer:30min` 和 `npm run timer:midnight` 按需触发相同的逻辑。

## 文件清单

| 区域 | 文件 |
|------|------|
| 通道 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`、`PreferenceGateHelper.ts`、`NotificationCategoryHelper.ts`、`WebPushHelper.ts`、`ExpoPushHelper.ts`、`SocketHelper.ts`、`DeliveryHelper.ts` |
| 共享入口 | `Api/src/shared/helpers/NotificationService.ts` |
| 事务性邮件通道 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`，lint 规则 `Api/tools/eslint-rules/email-door.cjs` |
| 教会邮件限制 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`、`Api/src/lambda/ses-feedback-handler.ts`、`Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 提醒引擎 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`、`ReminderBootstrap.ts`、`helpers/adapters/*`、`controllers/ReminderController.ts` |
| 短信/STOP 退订 | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`、`controllers/TextingController.ts`（`/status`、`/inboundUrl`、`/inbound/:churchId/:token`）、`Api/src/modules/doing/helpers/MatrixTextHelper.ts`（服务概览中的**短信通知志愿者**） |
| 提醒仓库 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`、`ReminderOccurrenceRepo.ts`、`ReminderSentLogRepo.ts` |
| 服事/计划邮件 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`、`ReminderTokenHelper.ts`、`Api/src/shared/modules/DoingModuleGateway.ts` |
| 提醒编辑器（B1Admin） | `serving/components/PlanTypeReminderEdit.tsx`、`calendars/components/EventReminderEdit.tsx`、`serving/tasks/components/TaskReminderEdit.tsx`、`hooks/useTextingEnabled.ts` |
| 提醒编辑器/偏好设置（B1App） | `EventReminderEdit.tsx`、`NotificationPrefsPage.tsx`、`useRealtimeNotifications.ts` |

## 相关页面

- [实时架构](../realtime.md)——应用内投递级别所依赖的 WebSocket 协议和客户端原语（`SocketHelper`、`SubscriptionManager`、`ConversationStore`）
- [Web 推送通知](../web-push.md)——推送升级级别所使用的 VAPID 设置和浏览器 Push API 路径
- [消息端点](../api/endpoints/messaging.md)——消息、对话、连接以及通知/提醒路由的完整 REST 接口
