---
title: "通知与提醒架构"
---

# 通知与提醒架构

<div class="article-intro">

教会成员在当前页面之外看到的每一条消息——徽章计数、推送通知、摘要邮件——都会经过 MessagingApi 中两个入口之一。本页介绍这条通道、按计划为其提供消息的提醒引擎，以及决定消息最终是否送达用户的偏好模型。

</div>

## 概览——两个入口

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **任何需要告知用户的内容**都会经过 messaging 模块中的 `NotificationHelper.createNotifications()`。它会保存一条 `notifications` 记录，依次升级为 socket → 推送 → 邮件，并对每个渠道评估 `PreferenceGateHelper`——包括级别 0 的 `in_app`。
2. **任何定时发送的内容**都是一个 `reminderDefinition`（实体级或范围级），它会展开为 `reminderOccurrences`，并由 `ReminderEngine.scan()` 在一个循环定时器上分发。一个展开器、一个分发器、一份发送台账（`reminderSentLog`）。
3. **直接发送邮件**只能通过 `TransactionalEmailHelper.sendTransactional()` 进行。ESLint 规则会在编译时强制执行——见下文。

:::tip 邮件入口由 lint 强制执行，而不仅仅是约定
`Api/tools/eslint-rules/email-door.cjs` 定义了 `no-direct-email-helper`：在 `NotificationHelper.ts` 或 `TransactionalEmailHelper.ts` 之外调用 `EmailHelper.sendTemplatedEmail()` 或 `EmailHelper.sendEmail()`，都会导致 lint 失败。如果需要发送邮件，请通过通道（配合 `emailImmediate` 使用 `createNotifications`）或 `TransactionalEmailHelper.sendTransactional()` 发送——没有任何第三种方式能通过 CI。
:::

## 通知通道

`NotificationHelper.createNotifications()` 是所有非定时、非事务性内容的唯一入口：

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

对于每位接收者，它会在 `notifications` 中保存一行，并调用 `attemptDeliveryWithEscalation`，依次经过下方的渠道阶梯。对于同一 `(contentType, contentId)` 仍未读的记录，会阻止重复创建。此去重保护对以下情况会被跳过：`emailImmediate` 发送（提醒偏移、员工的“全部邮件”、工作流步骤各自负责去重），以及直接消息（它们总是触发 socket）。

`shared/helpers/NotificationService.ts` 为消息模块之外的调用方提供相同的签名（`NotificationServiceOptions`），并在启动时注册到消息模块。

## 渠道升级链

送达从某个级别开始（默认为 0，提醒或显式发送时可以更高），并且只有在前一个渠道未成功时才会进入下一个渠道。每个级别在尝试之前都会先经过 `PreferenceGateHelper` 的门控。

| 级别 | 渠道 | 行为 |
|-------|---------|----------|
| 0 | **in_app / socket** | 首先检查 `in_app` 门控。如果被抑制（已静音），该行会以 `isNew=false` 保存，送达完全停止——不发送 socket 推送，没有徽章，也不再升级。否则，服务器会查找该用户 `alerts` 房间中已打开的 socket 连接，并推送一个 `notification`（或 `privateMessage`）帧。对于普通通知，socket 送达成功即在此停止——30 分钟定时器会重新检查未读项并在之后升级。直接消息永远不会止步于 socket：已安装的 PWA 可能在后台保持 alerts socket 打开，否则会抑制操作系统级的推送。 |
| 1 | **push** | 受 `allowPush`、类别退订和免打扰时段控制。发送到该用户 `devices` 行中的 Expo 推送令牌和 Web Push 订阅，按端点去重，并在过程中清理过期令牌。 |
| 2 | **email** | 受 `emailFrequency` 和类别退订控制。立即发送（`emailImmediate`）会马上渲染并写入一条 `deliveryLogs` 记录；否则通知会保持待处理状态，等待下方所述的批量摘要。 |
| — | **sms** | 不是升级阶梯中的一个级别。唯一受门控的短信来源是提醒引擎：当某个定义的 `channels` 包含 `sms` 时，`ReminderEngine.sendSms()` 会在推送/邮件通知**之外**，另外向每位接收者发送短信（见[文本提醒](#text-reminders)）。批量短信（`TextingController` / `@churchapps/texting`）、服务概览中的 **Text Volunteers** 发送（`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`），以及工作流中的 **Send Text** 步骤操作（`StepActionHelper.sendText` → `sendPersonText`），都直接通过教会的服务商发送短信，因此通知偏好和免打扰时段对它们不适用——只遵守该用户的 `optedOut` 标记。 |

停留在 socket 或 push 的未读通知会由 30 分钟定时器（`NotificationHelper.escalateDelivery`）升级。批量邮件由 `NotificationHelper.sendEmailNotifications(frequency)` 发送，依据每位用户的 `emailFrequency` 偏好：`individual` 在 30 分钟定时器上运行，`daily` 在每晚定时器上运行。（`weekly` 是一个有效的偏好值，但目前还没有专门的批量运行任务。）

## 提醒引擎

定时提醒——活动提醒、任务截止日期、服务/排班分配提醒——都通过一个通用引擎处理，而不是各功能各自的定制定时逻辑。

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**定义**（`reminderDefinitions`）可以是实体级（设置了 `entityId`——某个特定活动、任务或计划），也可以是范围级（`entityId` 为空，设置了 `scopeId`——例如某个服务计划类型下的每个计划）。定义包含：以逗号分隔的分钟偏移量（`offsets`，例如 `"1440,60"` 表示提前一天和提前一小时）、本地发送时间（`sendLocalTime`）、以逗号分隔的渠道列表（`channels`——其中 `email` 表示在发送时立即发出富文本邮件）、`recipientMode`，以及可选的自定义 `message`。

**展开**会为未来一段时间（滚动的多日窗口）生成触发行。它在每晚定时器上运行，并且在每次保存定义时同步运行，以确保即将到来的临时活动也能触发提醒。范围定义通过适配器的 `loadScopeEntities` 扇出，为每个具体实体生成一组发生记录；实体级的发生记录使用键 `definitionId:occurrenceISO:offset`，而范围内的发生记录则以实体 ID 作为命名空间，因此二者不会冲突。对某条发生记录执行 upsert 会**恢复**之前已取消的行——在底层实体变更后，先取消再重新展开是重新同步提醒的标准做法；已为 `sent`、`failed` 或 `processing` 状态的行则保持不变。

**分发**（`ReminderEngine.scan()`）在 30 分钟定时器上运行。它会认领到期的发生记录（租约机制可防止重复处理），通过实体的适配器加载接收者，过滤掉已在 `reminderSentLog` 中为该发生记录留有记录的人员，并以 `deliveryStartLevel: 1`（直接跳到推送）调用 `createNotifications`；当定义的渠道包含邮件时，还会附带 `emailImmediate`/`emailByPerson`。

### 文本提醒

当定义的 `channels` 包含 `sms` 时，`scan()` 会在推送/邮件通知创建之后，针对同一批新接收者调用 `ReminderEngine.sendSms()`。短信功能需要每位成员主动选择加入：

- 每位接收者都会经过 `PreferenceGateHelper.evaluate(..., "sms", ...)`，因此必须开启 `allowSms`（默认关闭，由 B1App 中的 **Text messages** 开关设置），并且该类别的 `sms` 渠道不能被覆盖为关闭。`event_reminders`、`serving_schedule` 和 `tasks` 在 `defaultChannels` 与 `allowedChannels` 中都列出了 `sms`。
- 没有 `mobilePhone` 或设置了 `optedOut` 的人员会被抑制。如果教会没有短信服务商，则整批的剩余接收者都会被抑制，原因为 `no_provider`。
- 短信正文由 `ReminderEngine.smsBody()` 构建：`"<Church name>: <message> Reply STOP to opt out."`，并截断为一个 160 字符的段。
- 每位接收者都有自己的 `reminderSentLog` 行，其中 `channel: "sms"`，状态为 `sent` / `suppressed` / `failed`，与推送/邮件的行分开记录，因此短信失败不会导致推送或邮件被重新发送。

只有当 `GET /messaging/texting/status` 返回 `{ enabled: true }`（即教会的第一个短信服务商已启用）时，编辑器才会提供 **Text** 选项。

**STOP 退订。** `POST /messaging/texting/inbound/:churchId/:token` 是一个匿名 webhook，教会会将其粘贴到自己的服务商后台中（B1Admin 会在短信设置中显示来自 `GET /messaging/texting/inboundUrl` 的 URL）。令牌是教会 ID 的 HMAC（`SmsOptOutHelper.token`）。`SmsOptOutHelper.parse` 同时接受 Twilio 风格的表单字段，以及 Clearstream/TextInChurch 风格的 JSON；如果回复恰好是运营商的退订关键词（`STOP`、`STOPALL`、`UNSUBSCRIBE`、`CANCEL`、`END`、`QUIT`、`OPTOUT`、`REVOKE`），则该教会中每个手机号匹配且未被移除的人员都会被设置 `people.optedOut = true` 和 `allowSms = false`。其他回复会被确认但忽略。

一个内部事件总线会对实体变更作出反应，无需等待每晚的展开：内容事件（通过 webhook 分发器）以及计划/任务更新事件会立即为受影响的实体重新展开或取消；计划更新还会重新展开与该计划类型关联的任何范围定义。

### 适配器

引擎与实体类型无关；每种受支持的实体类型都通过适配器（`helpers/adapters/`）接入：

| 实体类型 | 适配器 | 说明 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 接收者范围根据活动和 `recipientMode` 限定为报名者或小组成员。 |
| `plan` | `PlanReminderAdapter` | 接收者为已发布（非草稿）计划上状态为已接受和未确认的分配。通过服务确认工作流发出的未确认分配在被接受之前会被排除（见下文）。`buildEmails` 会调用 `DoingModuleGateway.buildPlanReminderEmails`，后者通过 `doing/helpers/PlanReminderEmailHelper` 渲染职位、备注和自定义消息，包括由 `ReminderTokenHelper` 签名的接受/拒绝按钮，这些按钮会提交到公开的分配回复端点。 |
| `task` | `TaskReminderAdapter` | 接收者为任务的负责人。 |

### 端点

| 方法 | 路径 | 用途 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 加载或保存某个实体的提醒定义。 |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 加载或保存范围级（继承）的提醒定义。 |
| `DELETE` | `/messaging/reminders/:defId` | 删除一个定义并取消其待处理的发生记录。 |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 在保存前预览某个活动提醒的接收者人数和下次触发时间。 |
| `GET` | `/messaging/reminders/log` | 某个教会最近的提醒发生历史。 |
| `POST` | `/messaging/reminders/mute` | 对特定实体静音提醒。 |

保存定义会对该实体或范围触发同步的重新展开，因此编辑者无需等待每晚任务，即可看到最新的“下次触发”时间。

## 直接消息

直接消息与其他所有内容一样走同一条通道，而不是单独的升级路径。每个未读对话在 `notifications` 中都有一行**影子行**（`contentType='privateMessage'`，`contentId` = 私信 ID，`category='direct_messages'`），由它负责所有送达状态——socket/推送/邮件升级、已读跟踪等全部内容。`privateMessages` 表本身保存消息内容以及 `notifyPersonId` 列，后者是未读徽章的数据来源，并会在接收者阅读该对话时被清除。

影子行对通知铃铛不可见：它们会被未读计数查询、通知列表查询以及标记已读/删除查询排除，这些查询都会过滤 `contentType <> 'privateMessage'`。每条私信都会无论未读状态如何触发 socket（实时聊天语义——不去重），并且直接消息永远不会像普通通知那样止步于 socket 送达，因为处于后台的 PWA 可能保持 socket 打开，但仍需要操作系统级的推送。如果某人静音了私信通知，影子行会被暂存（`isNew=false`，清除 `notifyPersonId`）——在对话内部仍然可见，只是不再显示徽章或提醒。

## 偏好与门控

每次发送都会经过 `PreferenceGateHelper.evaluate()`。它是一个纯函数（所有状态都通过参数传入，热路径上没有数据库调用），返回 `allow`、`suppress` 或 `defer`。各层按顺序运行，第一个做出决定的层生效：

1. **锁定类别**——某些类别是强制性的（层级 0），会绕过所有其他层。
2. **总静音 / 渠道关闭**——`masterMute`、`allowPush`、`allowSms`（默认关闭——成员需主动选择加入），或 `emailFrequency='never'`，都会直接抑制。
3. **免打扰时段**——仅适用于推送和短信（邮件被视为非打扰性）。如果用户所在时区的当前墙上时间落在其免打扰时段内，事务性类别仍会送达；非事务性类别则会被推迟到免打扰时段结束，该时刻由 `TimezoneHelper.wallClockToUtc` 计算为正确处理夏令时的 UTC 时间点。
4. **按类别的偏好覆盖**——针对某一个类别 × 渠道组合的明确退订；没有记录则使用该类别的默认值。
5. **按实体静音**——针对某个具体实体（例如某个活动、某个计划）记录的静音，其限制比类别级设置更严格，但仅当调用方在通知中同时提供了实体 ID/类型时才适用。

涉及的表：`notificationPreferences`（全局设置——`masterMute`、`emailFrequency`（取值为 `individual|daily|weekly|never`）、`allowPush`、免打扰时段窗口及时区、`allowSms`）、`notificationPreferenceOverrides`（按类别 × 渠道）以及 `notificationEntityMutes`（按实体）。

此门控在通道内部对应用内（级别 0）、推送（级别 1）和邮件（级别 2）都会强制执行——包括即时的提醒/摘要邮件——并且对 `ReminderEngine.sendSms()` 中的提醒短信同样生效。事务性邮件（验证码、密码重置、邀请、捐赠收据）按设计绕过此门控；这正是第二个入口存在的意义。

### 服务确认工作流

计划可以选择使用 `workflowType = "assignmentConfirmation"` 工作流（`plans.confirmationWorkflowId`）。发布/通知随后会调用 `POST /doing/plans/:id/issueRequests`，而不是为每个分配发送单独的通知：每个新的未确认分配都会获得 `notified` + `confirmationWorkflowId`，以及一张工作流卡片（`tasks.assignmentId`，唯一的 `followupKey`）。该卡片会发送仅限应用内的提醒（`appOnly: true`——不升级到推送/邮件），然后执行工作流的 `sendAssignmentRequest` 操作，这些操作通过 `MessagingModuleGateway.sendServingWorkflowMessage` 完成：邮件经由 `NotificationHelper.sendWorkflowEmail` 发送（偏好门控 + `ChurchEmailLimiter`，计入 `workflowEmail`），短信则只有在 `allowSms` 开启且 `serving_schedule` 类别门控通过时，才经由 `sendPersonText` 发送。接受/拒绝（事件总线上的 `assignment.updated`）会关闭该卡片；30 分钟定时器（`AssignmentWorkflowHelper.processPending`）会修复遗漏的启动和事件，并在跟进截止时间仍未回复的请求转为负责人审核任务。完整生命周期见 `Api/docs/assignment-confirmation-workflows.md`。

## 教会撰写邮件的限制

由教会撰写内容的邮件会从 ChurchApps 共享的 SES 身份发出，因此由 `Api/src/shared/helpers/ChurchEmailLimiter.ts` 按教会进行计量。共有四条路径会调用它：群组/模板发送（`EmailTemplateController`，内容类型为 `email`）、表单跟进邮件（`FormSubmissionController`，`formFollowUp`）、工作流的 **Send email** 操作（配合 `churchAuthored` 的 `NotificationHelper`，`workflowEmail`），以及服务确认请求邮件（`NotificationHelper.sendWorkflowEmail`，`workflowEmail`）。系统邮件（验证码、收据、提醒）以及角色和小组邀请（`UserController.sendInviteEmail`，使用固定模板）不计量。

- **审批门控。** 在服务器管理员设置 `churches.emailApprovedDate` 之前，教会不会发送任何内容（`POST /membership/churches/:id/emailApproval`，服务器管理 → Churches → **Group Email** 标签）。已归档的教会始终被阻止。B1Admin 的 Send Email 对话框会读取 `GET /messaging/emailTemplates/sendStatus`（`approved`、`paused`、`remaining`、`requested`），如果未获批准，则显示 **Request review** 卡片而不是编辑器。工作流步骤编辑器读取同一端点（对 `tasks.admin` 以及 `groupMembers.edit` 开放），以便在教会未获批准或已暂停时，对 **Send email** 操作发出警告。在发送时，当 `ChurchEmailLimiter.remaining()` 低于 1 时，`MessagingModuleGateway.sendTemplatedEmail` 会返回 `false` 且不创建通知，因此卡片的历史记录不会声称那些被丢弃的邮件已发送（**Email sent**）。`POST /messaging/emailTemplates/requestApproval` 每个教会每周最多向支持团队发送一封邮件。
- **已获得的配额。** 已获批准的教会可获得 `max(150, 2 × 其在前 30 天内最佳的教会撰写邮件日发送量)`，每滚动 24 小时最多 2,000 封。计算“最佳日”时会排除当前 24 小时，因此突发发送无法提高自身的限额。
- **先预留，后结算。** `reserve()` 会在发送前为每位接收者写入一条 `deliveryLogs` 行，将这些行计算在内重新检查配额，如果两个请求竞争超出了限额，则回滚（发送返回 429）。`settle()` 会将每行标记为已发送或失败。
- **投诉暂停。** `sesFeedback` Lambda（`Api/src/lambda/ses-feedback-handler.ts`，数据来自 SES → SNS）会将每一次永久性退信或投诉，关联到在该时间段内向该地址送达了教会撰写邮件的那个教会，存储为 `deliveryMethod` `sesBounce` / `sesComplaint`。在 7 天内，若出现 2 次及以上投诉（占发送量的 ≥ 0.3%）或 10 次及以上硬退信（≥ 5%），该教会将被暂停。

## 调度

提醒引擎和通知摘要都依托现有的定时器运行，而不是引入新的基础设施：

| 定时器 | 计划 | 运行内容 |
|-------|----------|----------|
| 30 分钟定时器 | 每 30 分钟 | 升级未读通知；发送 `individual` 频率的摘要邮件；分发到期的提醒发生记录（`ReminderEngine.scan`）；审批摘要；到期的自动化执行 |
| 每晚定时器 | 05:00 UTC | 小组考勤提醒；推进循环的流媒体服务；刷新自动刷新列表；为下一个时间范围展开提醒发生记录（`ReminderEngine.expandAll`）；发送 `daily` 频率的摘要邮件 |

在本地，可以在 `Api` 项目中通过 `npm run timer:30min` 和 `npm run timer:midnight` 按需触发相同的逻辑。

## 文件清单

| 区域 | 文件 |
|------|------|
| 通道 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`、`PreferenceGateHelper.ts`、`NotificationCategoryHelper.ts`、`WebPushHelper.ts`、`ExpoPushHelper.ts`、`SocketHelper.ts`、`DeliveryHelper.ts` |
| 共享入口 | `Api/src/shared/helpers/NotificationService.ts` |
| 事务性入口 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`，lint 规则 `Api/tools/eslint-rules/email-door.cjs` |
| 教会邮件限制 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`、`Api/src/lambda/ses-feedback-handler.ts`、`Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 提醒引擎 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`、`ReminderBootstrap.ts`、`helpers/adapters/*`、`controllers/ReminderController.ts` |
| 短信 / STOP 退订 | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`、`controllers/TextingController.ts`（`/status`、`/inboundUrl`、`/inbound/:churchId/:token`）、`Api/src/modules/doing/helpers/MatrixTextHelper.ts`（服务概览中的 **Text Volunteers**） |
| 提醒存储库 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`、`ReminderOccurrenceRepo.ts`、`ReminderSentLogRepo.ts` |
| 服务/计划邮件 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`、`ReminderTokenHelper.ts`、`Api/src/shared/modules/DoingModuleGateway.ts` |
| 提醒编辑器（B1Admin） | `serving/components/PlanTypeReminderEdit.tsx`、`calendars/components/EventReminderEdit.tsx`、`serving/tasks/components/TaskReminderEdit.tsx`、`hooks/useTextingEnabled.ts` |
| 提醒编辑器 / 偏好设置（B1App） | `EventReminderEdit.tsx`、`NotificationPrefsPage.tsx`、`useRealtimeNotifications.ts` |

## 相关页面

- [实时架构](../realtime)——应用内送达级别所依托的 WebSocket 协议和客户端基础组件（`SocketHelper`、`SubscriptionManager`、`ConversationStore`）
- [Web Push 通知](../web-push)——VAPID 设置以及推送升级级别所使用的浏览器 Push API 路径
- [消息端点](../api/endpoints/messaging)——消息、对话、连接以及通知/提醒路由的完整 REST 接口
