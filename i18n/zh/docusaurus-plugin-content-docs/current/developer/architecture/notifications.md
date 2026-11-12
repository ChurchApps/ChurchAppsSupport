---
title: "通知与提醒架构"
description: "B1 管理后台 API 如何通过一个投递漏斗和偏好网关，路由通知、定时提醒、教会电子邮件限额以及短信退订。"
---

# 通知与提醒架构

<div class="article-intro">

教会成员在其所浏览的页面之外看到的每一条消息 -- 角标计数、推送通知、摘要邮件 -- 都会经过消息 API 中两个入口之一。本页介绍该漏斗、按计划为其供给内容的提醒引擎，以及决定消息最终是否送达某人的偏好模型。

</div>

## 概览 -- 两个入口 {#overview--two-doors}

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
scheduled staff push ─▶ scheduledNotifications (1-minute timer) ───────────┤
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **任何告知某人某事的内容**都会经过消息模块中的 `NotificationHelper.createNotifications()`。它会保存一条 `notifications` 记录，并按 socket → 推送 → 电子邮件的顺序逐级升级，同时为每个渠道评估 `PreferenceGateHelper` -- 包括级别 0 的 `in_app`。
2. **任何定时内容**都是一个 `reminderDefinition`（实体级或范围级），会展开为 `reminderOccurrences`，并由 `ReminderEngine.scan()` 通过定期计时器进行分发。只有一个展开器、一个分发器、一个发送账本（`reminderSentLog`）。唯一的例外是从 B1Admin 的 **Mobile > Push Notifications** 页面或小组的 **Notify** 对话框中安排的员工推送：它是一条 `scheduledNotifications` 记录（受众为 `church` 或 `group`），由 `ScheduledNotificationHelper.dispatchDue()` 通过 1 分钟计时器发送。首次尝试时，若某条记录超过其 `sendAt` 30 分钟仍未发送，则会被标记为失败并注明 `missed send window`，而不会延迟发送；发送失败的记录最多重试 3 次。收件人在发送时由 `PushAudienceHelper` 解析（与即时小组发送使用的是同一个辅助工具），并通过 `createNotifications()` 以 `churchPushNotification`（偏好类别为 `announcements`）或 `groupPushNotification` 的形式投递。
3. **直接发送电子邮件**仅可通过 `TransactionalEmailHelper.sendTransactional()` 实现。一条 ESLint 规则会在编译时强制执行这一点 -- 见下文。

:::tip 邮件入口由 lint 强制执行，而非仅依靠约定
`Api/tools/eslint-rules/email-door.cjs` 定义了 `no-direct-email-helper`：在 `NotificationHelper.ts` 或 `TransactionalEmailHelper.ts` 之外调用 `EmailHelper.sendTemplatedEmail()` 或 `EmailHelper.sendEmail()`，都会导致 lint 失败。如果您需要发送电子邮件，请通过漏斗（带有 `emailImmediate` 的 `createNotifications`）或 `TransactionalEmailHelper.sendTransactional()` 进行 -- 除此之外，没有任何方式能通过 CI。
:::

## 通知漏斗 {#the-notification-funnel}

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

对于每位收件人，它会在 `notifications` 中保存一行记录，并调用 `attemptDeliveryWithEscalation`，该函数会依次经过下面的渠道阶梯。对于相同 `(contentType, contentId)` 且仍未读的记录，会阻止重复创建 -- 对于 `emailImmediate` 发送（提醒偏移、员工"向所有人发送邮件"、工作流步骤拥有各自的去重机制）以及直接消息，会跳过此去重保护，因为直接消息总是会触发 socket 通知。

`shared/helpers/NotificationService.ts` 为消息模块以外的调用方提供了相同的签名（`NotificationServiceOptions`），并在启动时注册到消息模块中。

## 渠道升级链 {#channel-escalation-chain}

投递从某一级别开始（默认为 0，提醒或显式发送可以更高），且只有在前一渠道未成功时才会进入下一渠道。每一级在尝试之前都会先经过 `PreferenceGateHelper` 的检查。

| 级别 | 渠道 | 行为 |
|-------|---------|----------|
| 0 | **应用内 / socket** | 首先检查 `in_app` 门控。若被抑制（已静音），则该记录会以 `isNew=false` 保存，投递完全停止 -- 不发送 socket 信号，不显示角标，也不再升级。否则，服务器会查找该人员 `alerts` 房间中已打开的 socket 连接，并推送 `notification`（或 `privateMessage`）帧。对于普通通知，socket 投递成功即在此停止 -- 30 分钟计时器会重新检查未读项目，并在之后对其进行升级。直接消息从不在 socket 处停止：已安装的 PWA 可能在后台保持 alerts socket 打开，否则会抑制操作系统级别的推送。 |
| 1 | **推送** | 受 `allowPush`、类别退出设置和免打扰时段的门控。同时发送至该人员 `devices` 记录中的 Expo 推送令牌和 Web Push 订阅，按端点去重，并在过程中清理失效的令牌。 |
| 2 | **电子邮件** | 受 `emailFrequency` 和类别退出设置的门控。即时发送（`emailImmediate`）会立即渲染并写入一条 `deliveryLogs` 记录；否则，该通知将保持待处理状态，等待下方所述的批量摘要。 |
| — | **短信** | 不属于升级阶梯中的级别。唯一受门控的短信来源是提醒引擎：当某个定义的 `channels` 包含 `sms` 时，`ReminderEngine.sendSms()` 会在推送/电子邮件通知**之外**，额外向每位收件人发送短信（参见[短信提醒](#text-reminders)）。批量短信（`TextingController` / `@churchapps/texting`）、服事概览中的**短信志愿者**发送（`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`），以及工作流的**发送短信**步骤操作（`StepActionHelper.sendText` → `sendPersonText`），都会直接通过教会的服务商发送短信，因此通知偏好和免打扰时段对它们不适用 -- 仅会遵守该人员的 `optedOut` 标记。 |

仍未读的、停留在 socket 或推送级别的通知，会由 30 分钟计时器（`NotificationHelper.escalateDelivery`）进行升级。批量电子邮件由 `NotificationHelper.sendEmailNotifications(frequency)` 发送，其运行频率取决于每个人的 `emailFrequency` 偏好：`individual` 在 30 分钟计时器上运行，`daily` 在夜间计时器上运行。（`weekly` 是一个有效的偏好值，但尚未有专门的批量运行任务。）

## 提醒引擎 {#reminder-engine}

定时提醒 -- 活动提醒、任务截止日期、服事/计划安排提醒 -- 都通过一个通用引擎处理，而不是各功能各自的定制定时任务逻辑。

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**定义**（`reminderDefinitions`）可以是实体级（设置了 `entityId`，针对特定的活动、任务或计划），也可以是范围级（`entityId` 为空，设置了 `scopeId`，例如某服事计划类型下的每个计划）。定义包含：以逗号分隔的分钟偏移量（`offsets`，例如 `"1440,60"` 表示提前一天和一小时）、本地发送时间（`sendLocalTime`）、以逗号分隔的渠道列表（`channels` -- 其中包含 `email` 时，会在发送时立即发送富文本邮件）、`recipientMode`，以及可选的自定义 `message`。

**展开**会为未来的时间范围（一个滚动的多日窗口）物化触发记录。它在夜间计时器上运行，并且在每次保存定义时同步运行，以确保即使是临近开始的活动，其提醒也能正常触发。范围定义通过适配器的 `loadScopeEntities` 扇出，为每个具体实体生成一组发生记录；实体级的发生记录使用键 `definitionId:occurrenceISO:offset`，而范围级的发生记录则按实体 ID 进行命名空间划分，因此永远不会发生冲突。对某个发生记录执行 upsert 会**恢复**之前已取消的记录 -- 先取消再重新展开，是在底层实体变更后重新同步提醒的标准方式；已处于 `sent`、`failed` 或 `processing` 状态的记录则保持不变。

**分发**（`ReminderEngine.scan()`）在 30 分钟计时器上运行。它会认领到期的发生记录（通过租约防止重复处理），通过实体的适配器加载收件人，过滤掉已在该发生记录的 `reminderSentLog` 中记录过的人员，然后调用 `createNotifications`，并设置 `deliveryStartLevel: 1`（直接跳到推送），当定义的渠道包含电子邮件时，还会附带 `emailImmediate` / `emailByPerson`。

### 短信提醒 {#text-reminders}

当某个定义的 `channels` 包含 `sms` 时，`scan()` 会在为相同的新收件人创建推送/电子邮件通知之后，调用 `ReminderEngine.sendSms()`。短信发送需要每位成员主动同意：

- 每位收件人都会经过 `PreferenceGateHelper.evaluate(..., "sms", ...)`，因此 `allowSms` 必须开启（默认关闭，由 B1App 的**短信**开关设置），并且该类别的 `sms` 渠道不能被显式关闭。`event_reminders`、`serving_schedule` 和 `tasks` 在 `defaultChannels` 和 `allowedChannels` 中都列有 `sms`。
- 没有 `mobilePhone` 或设置了 `optedOut` 的人员会被抑制。如果教会没有短信服务商，则整批发送都会以原因 `no_provider` 被抑制。
- 短信内容由 `ReminderEngine.smsBody()` 构建：`"<教会名称>: <消息> Reply STOP to opt out."`，并截断为一个 160 个字符的分段。
- 每位收件人都会获得一条单独的 `reminderSentLog` 记录，其 `channel` 为 `sms`，状态为 `sent` / `suppressed` / `failed`，并与推送/电子邮件记录分开键控，因此短信发送失败时，不会重新发送推送或电子邮件。

只有当 `GET /messaging/texting/status` 返回 `{ enabled: true }`（即教会的第一个短信服务商已启用）时，编辑器才会提供**短信**选项。

**STOP 退订。** `POST /messaging/texting/inbound/:churchId/:token` 是一个匿名 webhook，教会需将其粘贴到服务商处（B1Admin 会在短信设置中显示来自 `GET /messaging/texting/inboundUrl` 的 URL）。令牌是教会 ID 的 HMAC（`SmsOptOutHelper.token`）。`SmsOptOutHelper.parse` 同时接受 Twilio 风格的表单字段，以及 Clearstream/TextInChurch 风格的 JSON；如果回复恰好为运营商的停止词（`STOP`、`STOPALL`、`UNSUBSCRIBE`、`CANCEL`、`END`、`QUIT`、`OPTOUT`、`REVOKE`），则教会中手机号码匹配的每位未被移除的人员都会被设置 `people.optedOut = true` 和 `allowSms = false`。其他回复会被确认并忽略。

内部事件总线会对实体变更作出响应，无需等待夜间展开：内容事件（通过 webhook 分发器）以及计划/任务更新事件会立即为受影响的实体重新展开或取消，并且计划更新还会重新展开与其计划类型相关联的任何范围定义。

### 适配器 {#adapters}

该引擎与实体类型无关；每种受支持的实体类型都通过一个适配器（`helpers/adapters/`）接入：

| 实体类型 | 适配器 | 说明 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 收件人范围根据活动和 `recipientMode`，限定为报名者或小组成员。 |
| `plan` | `PlanReminderAdapter` | 收件人为已发布（非草稿）计划中状态为已接受和未确认的安排。通过服事确认工作流发出的未确认安排，在被接受之前会被排除（见下文）。`buildEmails` 会调用 `DoingModuleGateway.buildPlanReminderEmails`，后者通过 `doing/helpers/PlanReminderEmailHelper` 渲染职位、备注和自定义消息，并包括由 `ReminderTokenHelper` 签名的接受/拒绝按钮，这些按钮会提交至公开的安排回复端点。 |
| `task` | `TaskReminderAdapter` | 收件人为任务的负责人。 |

### 端点 {#endpoints}

| 方法 | 路径 | 用途 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 加载或保存某一实体的提醒定义。 |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 加载或保存范围级（继承的）提醒定义。 |
| `DELETE` | `/messaging/reminders/:defId` | 删除定义并取消其待处理的发生记录。 |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 在保存前预览活动提醒的收件人数量和下次触发时间。 |
| `GET` | `/messaging/reminders/log` | 某教会近期的提醒发生记录历史。 |
| `POST` | `/messaging/reminders/mute` | 静音某一特定实体的提醒。 |

保存定义会为该实体或范围触发同步的重新展开，因此编辑者无需等待夜间任务，即可看到最新的"下次触发"时间。

## 直接消息 {#direct-messages}

直接消息沿用与其他所有内容相同的漏斗，而非单独的升级路径。每个未读对话都会在 `notifications` 中获得一条**影子记录**（`contentType='privateMessage'`，`contentId` 为私信 ID，`category='direct_messages'`），由它负责所有投递状态 -- socket/推送/电子邮件的升级、已读跟踪等全部内容。`privateMessages` 表本身保存消息正文，以及 `notifyPersonId` 列，该列是未读角标的数据来源，并会在收件人阅读对话后被清除。

影子记录对通知铃铛不可见：它们会被排除在未读计数查询、通知列表查询以及标记已读/删除查询之外，这些查询都会过滤 `contentType <> 'privateMessage'`。每条直接消息提醒都会无论未读状态如何都触发 socket（实时聊天语义 -- 不做去重），并且直接消息不会像普通通知那样在 socket 投递时停止，因为在后台运行的 PWA 可能保持 socket 打开，却仍然需要操作系统级别的推送。如果某人静音了直接消息通知，影子记录会被暂存（`isNew=false`，`notifyPersonId` 被清除）-- 在对话内部仍然可见，只是不再显示角标或提醒。

## 偏好与门控 {#preferences--gating}

每次发送都会经过 `PreferenceGateHelper.evaluate()`，这是一个纯函数（所有状态都通过参数传入，热路径上没有数据库调用），返回 `allow`、`suppress` 或 `defer`。各层按顺序执行，第一个做出决定的层生效：

1. **锁定类别** -- 某些类别是强制性的（第 0 层），会绕过所有其他层。
2. **总静音 / 渠道关闭** -- `masterMute`、`allowPush`、`allowSms`（默认关闭 -- 成员需主动开启）或 `emailFrequency='never'` 会直接抑制发送。
3. **免打扰时段** -- 仅适用于推送和短信（电子邮件被视为非干扰性的）。如果该人员时区中的当前墙上时间落在其免打扰时段内，事务性类别仍会送达；非事务性类别则会被推迟到免打扰时段结束，其时间通过 `TimezoneHelper.wallClockToUtc` 计算为符合夏令时规则的 UTC 时刻。
4. **按类别的偏好覆盖** -- 针对某一类别 × 渠道组合的显式退出设置；未设置时使用该类别的默认值。
5. **按实体静音** -- 针对特定实体（例如某个活动、某个计划）记录的静音，其限制比类别级设置更严格，但仅当调用方同时提供了实体 ID/类型时才会生效。

涉及的数据表：`notificationPreferences`（全局 -- `masterMute`、`emailFrequency`（取值为 `individual|daily|weekly|never`）、`allowPush`、免打扰时段窗口及时区、`allowSms`）、`notificationPreferenceOverrides`（按类别 × 渠道）以及 `notificationEntityMutes`（按实体）。

此门控在漏斗内对应用内（级别 0）、推送（级别 1）和电子邮件（级别 2）生效 -- 包括即时的提醒/摘要邮件 -- 并对 `ReminderEngine.sendSms()` 中的提醒短信生效。事务性邮件（验证码、密码重置、邀请、奉献收据）按设计会绕过此门控；这正是第二个入口存在的全部意义。

### 服事确认工作流 {#serving-confirmation-workflows}

计划可以选择使用 `workflowType = "assignmentConfirmation"` 的工作流（`plans.confirmationWorkflowId`）。发布/通知操作随后会调用 `POST /doing/plans/:id/issueRequests`，而不是逐个安排发送通知：每个新的未确认安排都会获得 `notified` 和 `confirmationWorkflowId`，以及一张工作流卡片（`tasks.assignmentId`，唯一的 `followupKey`）。该卡片会发送仅限应用内的提醒（`appOnly: true`，不进行推送/电子邮件升级），然后执行工作流的 `sendAssignmentRequest` 操作，这些操作通过 `MessagingModuleGateway.sendServingWorkflowMessage` 进行：电子邮件经由 `NotificationHelper.sendWorkflowEmail` 发送（偏好门控 + `ChurchEmailLimiter`，计量类型为 `workflowEmail`），短信则仅在 `allowSms` 开启且通过 `serving_schedule` 类别门控时经由 `sendPersonText` 发送。接受/拒绝（事件总线上的 `assignment.updated`）会关闭卡片；30 分钟计时器（`AssignmentWorkflowHelper.processPending`）会修复遗漏的开始和事件，并在后续截止时间到达时仍未回复的请求转为领袖审核任务。完整生命周期：`Api/docs/assignment-confirmation-workflows.md`。

## 教会撰写邮件的限额 {#church-authored-email-limits}

由教会撰写内容的电子邮件会从 ChurchApps 共享的 SES 身份发出，因此由 `Api/src/shared/helpers/ChurchEmailLimiter.ts` 按教会进行计量。有四条路径会调用它：小组/模板发送（`EmailTemplateController`，内容类型 `email`）、表单跟进邮件（`FormSubmissionController`，`formFollowUp`）、工作流**发送邮件**操作（`NotificationHelper`，带 `churchAuthored`，`workflowEmail`），以及服事确认请求邮件（`NotificationHelper.sendWorkflowEmail`，`workflowEmail`）。系统邮件（验证码、收据、提醒）以及角色和小组邀请（`UserController.sendInviteEmail`，固定模板）不计量。

- **审批门控。** 在服务器管理员设置 `churches.emailApprovedDate`（`POST /membership/churches/:id/emailApproval`，服务器管理员 → 教会 → **小组邮件**标签）之前，教会不会发送任何内容。已归档的教会始终被阻止。B1Admin 的发送邮件对话框会读取 `GET /messaging/emailTemplates/sendStatus`（`approved`、`paused`、`remaining`、`requested`），若未获批准，则显示**申请审核**卡片而非编辑器。工作流步骤编辑器也读取同一端点（`tasks.admin` 与 `groupMembers.edit` 均可访问），以便在教会未获批准或已暂停时，对**发送邮件**操作发出警告。在发送时，若 `ChurchEmailLimiter.remaining()` 低于 1，`MessagingModuleGateway.sendTemplatedEmail` 会返回 `false` 且不创建通知，因此卡片的历史记录永远不会对被丢弃的邮件显示"已发送邮件"。`POST /messaging/emailTemplates/requestApproval` 会向支持团队发送邮件，每个教会每周最多一次。
- **赚取的配额。** 已获批准的教会可获得 `max(150, 2 × 其在前 30 天内撰写邮件的最高单日量)` 的配额，每滚动 24 小时上限为 2,000 封。当前 24 小时不计入"最高单日量"，因此突发发送无法提高其自身的限额。
- **先预留，后结算。** `reserve()` 在发送前为每位收件人写入一条 `deliveryLogs` 记录，并在计入这些记录的情况下重新检查配额；若两个请求竞争超出了限额，则回退（发送返回 429）。`settle()` 会将每条记录标记为已发送或失败。
- **投诉暂停。** `sesFeedback` Lambda（`Api/src/lambda/ses-feedback-handler.ts`，由 SES → SNS 驱动）会将每一条永久退信或投诉，关联到在相近时间内向该地址送达教会撰写邮件的教会，并以 `deliveryMethod` `sesBounce` / `sesComplaint` 存储。当 7 天内出现 2 次及以上投诉（占发送量的 ≥ 0.3%）或 10 次及以上硬退信（≥ 5%）时，该教会将被暂停。

## 调度 {#scheduling}

提醒引擎和通知摘要都依托现有的定时计时器运行，而非引入新的基础设施：

| 计时器 | 调度 | 运行内容 |
|-------|----------|----------|
| 30 分钟计时器 | 每 30 分钟 | 升级未读通知；发送 `individual` 频率的摘要邮件；分发到期的提醒发生记录（`ReminderEngine.scan`）；审批摘要；到期的自动化执行 |
| 1 分钟计时器（`timerWebhooks`） | 每分钟 | 发送到期的定时推送通知（`ScheduledNotificationHelper.dispatchDue`，任务 `scheduledNotifications`） |
| 夜间计时器 | UTC 05:00 | 小组考勤提醒；推进循环的直播服务；刷新自动刷新列表；为下一个时间范围展开提醒发生记录（`ReminderEngine.expandAll`）；发送 `daily` 频率的摘要邮件 |

在本地，可以在 `Api` 项目中通过 `npm run timer:30min` 和 `npm run timer:midnight` 按需触发相同的逻辑。

## 文件清单 {#file-inventory}

| 区域 | 文件 |
|------|------|
| 漏斗 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`、`PreferenceGateHelper.ts`、`NotificationCategoryHelper.ts`、`WebPushHelper.ts`、`ExpoPushHelper.ts`、`SocketHelper.ts`、`DeliveryHelper.ts` |
| 共享入口 | `Api/src/shared/helpers/NotificationService.ts` |
| 事务性邮件入口 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`，lint 规则 `Api/tools/eslint-rules/email-door.cjs` |
| 教会邮件限额 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`、`Api/src/lambda/ses-feedback-handler.ts`、`Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 提醒引擎 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`、`ReminderBootstrap.ts`、`helpers/adapters/*`、`controllers/ReminderController.ts` |
| 短信/STOP 退订 | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`、`controllers/TextingController.ts`（`/status`、`/inboundUrl`、`/inbound/:churchId/:token`）、`Api/src/modules/doing/helpers/MatrixTextHelper.ts`（服事概览**短信志愿者**） |
| 提醒仓储 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`、`ReminderOccurrenceRepo.ts`、`ReminderSentLogRepo.ts` |
| 服事/计划邮件 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`、`ReminderTokenHelper.ts`、`Api/src/shared/modules/DoingModuleGateway.ts` |
| 提醒编辑器（B1Admin） | `serving/components/PlanTypeReminderEdit.tsx`、`calendars/components/EventReminderEdit.tsx`、`serving/tasks/components/TaskReminderEdit.tsx`、`hooks/useTextingEnabled.ts` |
| 提醒编辑器/偏好设置（B1App） | `EventReminderEdit.tsx`、`NotificationPrefsPage.tsx`、`useRealtimeNotifications.ts` |

## 相关页面 {#related-pages}

- [实时架构](../realtime.md) -- 应用内投递级别所依托的 WebSocket 协议和客户端基础组件（`SocketHelper`、`SubscriptionManager`、`ConversationStore`）
- [Web 推送通知](../web-push.md) -- 推送升级级别所使用的 VAPID 设置和浏览器 Push API 路径
- [消息接口](../api/endpoints/messaging.md) -- 消息、对话、连接以及通知/提醒路由的完整 REST 接口
