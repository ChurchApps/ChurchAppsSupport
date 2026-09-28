---
title: "通知和提醒架构"
---

# 通知和提醒架构

<div class="article-intro">

教会成员在其查看的页面之外看到的每条消息 —— 徽章计数、推送通知、摘要电子邮件 —— 都通过 MessagingApi 中的两扇门之一传递。本页面记录了漏斗、在计划上为其提供的提醒引擎以及决定实际到达的人的偏好模型。

</div>

## 概述 —— 两扇门

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **任何告诉人员某事的内容**都通过消息模块中的 `NotificationHelper.createNotifications()` 进行。它保持一个 `notifications` 行并递升 socket → push → email,按通道评估 `PreferenceGateHelper` —— 包括第 0 级的 `in_app`。
2. **任何计划的内容**都是一个 `reminderDefinition`(实体级别或作用域级别)扩展为 `reminderOccurrences` 并由 `ReminderEngine.scan()` 在循环计时器上调度。一个扩展器、一个调度器、一个发送账本(`reminderSentLog`)。
3. **直接电子邮件**仅存在于 `TransactionalEmailHelper.sendTransactional()` 后面。ESLint 规则在编译时执行此操作 —— 见下文。

:::tip 电子邮件门是 lint 强制执行的,而不仅仅是约定
`Api/tools/eslint-rules/email-door.cjs` 定义了 `no-direct-email-helper`:对 `EmailHelper.sendTemplatedEmail()` 或 `EmailHelper.sendEmail()` 的任何调用(在 `NotificationHelper.ts` 或 `TransactionalEmailHelper.ts` 之外)都会失败 lint。如果您需要发送电子邮件,请将其路由通过漏斗(`createNotifications` 使用 `emailImmediate`)或通过 `TransactionalEmailHelper.sendTransactional()` —— 没有第三种方式能通过 CI。
:::

## 通知漏斗

`NotificationHelper.createNotifications()` 是任何不是计划或事务性的单个入口点:

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

对于每个收件人,它在 `notifications` 中保存一行并调用 `attemptDeliveryWithEscalation`,该函数走下面的通道阶梯。同一 `(contentType, contentId)` 的仍未读行会抑制重新创建 —— 对于 `emailImmediate` 发送(提醒偏移、员工"电子邮件全部"、工作流步骤拥有其自己的重复数据删除)和直接消息(总是 ping socket)跳过此重复数据删除防护。

`shared/helpers/NotificationService.ts` 为消息模块外的调用者镜像相同的签名(`NotificationServiceOptions`),并在启动时向消息模块注册。

## 通道递升链

交付从一个级别(默认情况下为 0,或对于提醒/显式发送更高)开始,仅在上一个未成功时才继续到下一个通道。在尝试任何内容之前,每个级别都由 `PreferenceGateHelper` 控制。

| 级别 | 通道 | 行为 |
|-------|---------|----------|
| 0 | **in_app / socket** | 首先检查 `in_app` 门。如果被抑制(静音),行使用 `isNew=false` 保持并交付完全停止 —— 没有 socket ping、没有徽章、没有进一步递升。否则服务器查找人员 `alerts` 房间的开放 socket 连接,并推送一个 `notification`(或 `privateMessage`)帧。对于普通通知,成功的 socket 交付在此处停止链 —— 30 分钟计时器重新检查未读项目并稍后递升它们。直接消息永远不会在 socket 处停止:已安装的 PWA 可以在后台持有警报 socket 打开,这会以其他方式抑制操作系统级 push。 |
| 1 | **push** | 在 `allowPush` / 类别选择退出 / 安静时间上控制。发送到在人员 `devices` 行上找到的 Expo push 令牌和 Web Push 订阅,按端点重复数据删除并沿途清理陈旧令牌。 |
| 2 | **email** | 在 `emailFrequency` 和类别选择退出上控制。立即发送(`emailImmediate`)立即呈现并写入 `deliveryLogs` 行;否则通知留待批处理摘要,如下所述。 |
| — | **sms** | 偏好管道(`allowSms`、每类别通道列表)已经考虑了 SMS 通道,但没有生产者今天通过它发送 —— 它保留用于批量 SMS 产品,通过 `TextingController` / `@churchapps/texting` 作为单独、隔离的流运行。 |

在 socket 或 push 处留下的未读通知由 30 分钟计时器(`NotificationHelper.escalateDelivery`)递升。批处理电子邮件由 `NotificationHelper.sendEmailNotifications(frequency)` 发送,由每个人的 `emailFrequency` 偏好驱动:`individual` 在 30 分钟计时器上运行,`daily` 在夜间计时器上运行。(`weekly` 是有效的偏好值但还没有专用的批处理运行。)

## 提醒引擎

计划的提醒 —— 事件提醒、任务截止日期、服务/计划分配提醒 —— 都通过一个通用引擎而不是特定于功能的 cron 逻辑。

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**定义**(`reminderDefinitions`)要么是实体级别(设置 `entityId` —— 特定事件、任务或计划)要么是作用域级别(`entityId` null、`scopeId` 设置 —— 例如服务计划类型下的每个计划)。定义包含分钟偏移的 CSV(`offsets`,例如 `"1440,60"` 用于一天和一小时之前)、本地发送时间(`sendLocalTime`)、通道的 CSV(`channels` —— 包括 `email` 在发送时触发立即富电子邮件)、`recipientMode` 和可选的自定义 `message`。

**扩展**为未来的地平线(滚动多天窗口)物化火行。它在夜间计时器上运行,并在定义保存时同步运行,以便最后一刻事件的提醒仍会触发。作用域定义通过适配器的 `loadScopeEntities` 扇出,为每个具体实体生成一个发生集;实体级别发生使用键 `definitionId:occurrenceISO:offset`,而有作用域的发生按实体 ID 命名空间,以便它们永远不会冲突。上升一个发生**复活**之前取消的行 —— 取消然后重新扩展是重新同步提醒的标准方法之后底层实体更改;已 `sent`、`failed` 或 `processing` 的行保持不变。

**调度**(`ReminderEngine.scan()`)在 30 分钟计时器上运行。它声称到期的发生(租赁防止双处理)、通过实体的适配器加载收件人、筛选出任何已在该发生的 `reminderSentLog` 中记录的人,并以 `deliveryStartLevel: 1`(跳过直接推送)加上 `emailImmediate`/`emailByPerson` 调用 `createNotifications`当定义的通道包括电子邮件时。

内部事件总线对实体变异做出反应,而无需等待夜间扩展:内容事件(通过 webhook 调度程序)和计划/任务更新事件触发受影响实体的立即重新扩展或取消,计划更新也重新扩展任何与其计划类型相关的作用域定义。

### 适配器

引擎是实体不可知的;每个支持的实体类型通过适配器(`helpers/adapters/`)插入:

| 实体类型 | 适配器 | 说明 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 收件人的作用域是注册者或群组成员,取决于事件和 `recipientMode`。 |
| `plan` | `PlanReminderAdapter` | 收件人是已接受 + 未确认的计划分配。`buildEmails` 调用 `DoingModuleGateway.buildPlanReminderEmails`,该网关通过 `doing/helpers/PlanReminderEmailHelper` 呈现位置、注记和自定义消息,包括由 `ReminderTokenHelper` 签署的接受/拒绝按钮,这些按钮发布到公共分配响应端点。 |
| `task` | `TaskReminderAdapter` | 收件人是任务的受分配者。 |

### 端点

| 方法 | 路径 | 目的 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 加载或保存一个实体的提醒定义。 |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 加载或保存一个作用域级别(继承)提醒定义。 |
| `DELETE` | `/messaging/reminders/:defId` | 删除定义并取消其待处理发生。 |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 在保存之前预览事件提醒的收件人计数和下次触发时间。 |
| `GET` | `/messaging/reminders/log` | 教会最近的提醒发生历史。 |
| `POST` | `/messaging/reminders/mute` | 静音特定实体的提醒。 |

保存定义会触发该实体或作用域的同步重新扩展,所以编辑者看到最新的"下次触发"而无需等待夜间作业。

## 直接消息

直接消息乘坐与其他所有内容相同的漏斗,而不是单独的递升路径。每个未读对话在 `notifications` 中获得一个**影子行**(`contentType='privateMessage'`、`contentId` = 私人消息 ID、`category='direct_messages'`)拥有所有交付状态 —— socket/push/email 递升、读取跟踪,一切。`privateMessages` 表本身保持消息有效负载和 `notifyPersonId` 列,这是未读徽章的来源并在收件人读取对话时被清除。

影子行对通知铃不可见:它们被排除在未读计数查询、通知列表查询和标记已读/删除查询之外,所有查询都过滤 `contentType <> 'privateMessage'`。每个 DM ping 无论未读状态如何都击中 socket(实时聊天语义 —— 没有重复数据删除),DM 永远不会像普通通知那样在 socket 交付处停止,因为后台 PWA 可以持有 socket 打开同时仍需要操作系统级 push。如果某人静音 DM 通知,影子行被停放(`isNew=false`、`notifyPersonId` 清除) —— 仍在对话本身内可见,仅没有徽章或警报。

## 偏好和控制

每个发送都通过 `PreferenceGateHelper.evaluate()` 传递,一个纯函数(所有状态传递进来,热路径上没有 DB 调用)返回 `allow`、`suppress` 或 `defer`。图层按顺序运行,第一个做出决定的赢了:

1. **锁定类别** —— 某些类别是强制性的(第 0 层)并绕过每个其他图层。
2. **主静音/通道杀死** —— `masterMute`、`allowPush`、`allowSms` 或 `emailFrequency='never'` 完全抑制。
3. **安静时间** —— 仅推送和 SMS(电子邮件被视为非侵入式)。如果人员时区中的当前时钟时间落在其安静窗口中,事务类别仍然通过;非事务性被推迟到安静窗口的结束,通过 `TimezoneHelper.wallClockToUtc` 计算为 DST 正确的 UTC 时刻。
4. **每类别偏好覆盖** —— 对一个类别 × 通道对的显式选择退出;缺失意味着类别的默认值。
5. **每实体静音** —— 针对特定实体记录的静音(例如一个事件、一个计划)限制超过类别级别设置,但仅在调用者随通知提供实体 ID/类型时适用。

涉及的表:`notificationPreferences`(全球 —— `masterMute`、`emailFrequency` 的 `individual|daily|weekly|never`、`allowPush`、安静时间窗口 + 时区、`allowSms`)、`notificationPreferenceOverrides`(每类别 × 通道)和 `notificationEntityMutes`(每实体)。

此门对在漏斗内的 in-app(第 0 级)、push(第 1 级)和 email(第 2 级)强制执行 —— 包括立即提醒/摘要电子邮件。事务电子邮件(身份验证代码、密码重置、邀请、捐赠收据)按设计绕过它;这就是第二扇门的全部要点。

## 教会编写的电子邮件限制

教会编写其内容的电子邮件从共享 ChurchApps SES 身份发送,因此按教会由 `Api/src/shared/helpers/ChurchEmailLimiter.ts` 计量。四个路径调用它:群组/模板发送(`EmailTemplateController`,内容类型 `email`)、表单后续电子邮件(`FormSubmissionController`,`formFollowUp`)、工作流**发送电子邮件**操作(`NotificationHelper` 使用 `churchAuthored`、`workflowEmail`)和 B1 账户邀请(`UserController.sendInviteEmail`,`invite`)。系统邮件(身份验证代码、收据、提醒)不计量。

- **批准门。** 教会发送任何内容之前,服务器管理员设置 `churches.emailApprovedDate`(`POST /membership/churches/:id/emailApproval`,服务器管理员 → 教会 → **群组电子邮件**芯片)。已存档教会总是被阻止。B1Admin 的发送电子邮件对话读取 `GET /messaging/emailTemplates/sendStatus`(`approved`、`paused`、`remaining`、`requested`)并在未批准时显示**请求审查**卡而不是编辑器。`POST /messaging/emailTemplates/requestApproval` 电子邮件支持,最多每教会每周一次。
- **赚得的津贴。** 批准的教会获得 `max(150, 2 × 其在前 30 天内最好的教会编写的一天)`,上限为每滚动 24 小时 2,000 个。当前的 24 小时被排除在"最好的一天"之外,以便突发无法提高其自身的限制。
- **保留,然后结算。** `reserve()` 在发送前为每个收件人写一个 `deliveryLogs` 行,使用那些行计数重新检查津贴,如果两个请求竞速超过限制则备份(发送返回 429)。`settle()` 标记每行已发送或失败。
- **投诉暂停。** `sesFeedback` Lambda(`Api/src/lambda/ses-feedback-handler.ts`,由 SES → SNS 提供)将每个永久弹回或投诉固定到其教会编写的电子邮件在该地址到达那个时间周围的教会,存储为 `deliveryMethod` `sesBounce` / `sesComplaint`。教会在 7 天内暂停在 2+ 投诉(≥ 0.3% 的发送)或 10+ 硬弹回(≥ 5%)。

## 调度

提醒引擎和通知摘要都使用现有计划计时器,而不是引入新基础设施:

| 计时器 | 计划 | 运行 |
|-------|----------|------|
| 30 分钟计时器 | 每 30 分钟 | 递升未读通知;发送 `individual` 频率摘要电子邮件;调度到期提醒发生(`ReminderEngine.scan`);批准摘要;到期自动执行 |
| 夜间计时器 | 05:00 UTC | 群组出席提醒;推进循环流媒体服务;刷新自动刷新列表;扩展下一个地平线的提醒发生(`ReminderEngine.expandAll`);发送 `daily` 频率摘要电子邮件 |

在本地,相同的逻辑可以通过从 `Api` 项目的 `npm run timer:30min` 和 `npm run timer:midnight` 按需触发。

## 文件清单

| 区域 | 文件 |
|------|-------|
| 漏斗 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`、`PreferenceGateHelper.ts`、`NotificationCategoryHelper.ts`、`WebPushHelper.ts`、`ExpoPushHelper.ts`、`SocketHelper.ts`、`DeliveryHelper.ts` |
| 共享入口 | `Api/src/shared/helpers/NotificationService.ts` |
| 事务门 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`、lint 规则 `Api/tools/eslint-rules/email-door.cjs` |
| 教会电子邮件限制 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`、`Api/src/lambda/ses-feedback-handler.ts`、`Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 提醒引擎 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`、`ReminderBootstrap.ts`、`helpers/adapters/*`、`controllers/ReminderController.ts` |
| 提醒存储库 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`、`ReminderOccurrenceRepo.ts`、`ReminderSentLogRepo.ts` |
| 服务/计划电子邮件 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`、`ReminderTokenHelper.ts`、`Api/src/shared/modules/DoingModuleGateway.ts` |
| 提醒编辑器(B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`、`calendars/components/EventReminderEdit.tsx`、`serving/tasks/components/TaskReminderEdit.tsx` |
| 提醒编辑器/偏好(B1App) | `EventReminderEdit.tsx`、`NotificationPrefsPage.tsx`、`useRealtimeNotifications.ts` |

## 相关页面

- [实时架构](../realtime) —— WebSocket 协议和客户端原语(`SocketHelper`、`SubscriptionManager`、`ConversationStore`)in-app 交付级别乘坐的
- [Web Push 通知](../web-push) —— VAPID 设置和浏览器 Push API 路径由推送递升级别使用
- [消息传递端点](../api/endpoints/messaging) —— 用于消息、对话、连接和通知/提醒路由的完整 REST 表面
