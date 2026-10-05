---
title: "通知和提醒架构"
---

# 通知和提醒架构

<div class="article-intro">

教会成员在浏览页面外看到的每条消息 — 徽章计数、推送通知、摘要电子邮件 — 都通过 MessagingApi 中的两个门之一。本页面记录了漏斗、定期供给它的提醒引擎，以及决定哪些实际上到达一个人的偏好模型。

</div>

## 概述 — 两个门

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email (→ sms slot)
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **任何告诉一个人某事的东西**都通过消息模块中的 `NotificationHelper.createNotifications()` 进行。它保存 `notifications` 行并升级 socket → push → email，评估每个通道的 `PreferenceGateHelper` — 包括第 0 级的 `in_app`。
2. **任何预定的东西**是一个 `reminderDefinition`（实体级或作用域级），扩展到 `reminderOccurrences` 并由定期计时器上的 `ReminderEngine.scan()` 分派。一个扩展器、一个分派器、一个发送分类账（`reminderSentLog`）。
3. **直接电子邮件**仅存在于 `TransactionalEmailHelper.sendTransactional()` 后面。ESLint 规则在编译时强制执行此操作 — 请参阅下文。

:::tip 电子邮件门是 lint 强制的，不仅仅是约定
`Api/tools/eslint-rules/email-door.cjs` 定义 `no-direct-email-helper`：在 `NotificationHelper.ts` 或 `TransactionalEmailHelper.ts` 之外调用 `EmailHelper.sendTemplatedEmail()` 或 `EmailHelper.sendEmail()` 会失败 lint。如果您需要发送电子邮件，通过漏斗（带有 `emailImmediate` 的 `createNotifications`）或通过 `TransactionalEmailHelper.sendTransactional()` 路由它 — 没有第三种方式可以通过 CI。
:::

## 通知漏斗

`NotificationHelper.createNotifications()` 是任何不是预定或事务性的东西的单一入口点：

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

对于每个收件人，它在 `notifications` 中保存一行并调用 `attemptDeliveryWithEscalation`，它遍历下面的通道阶梯。同一 `(contentType, contentId)` 的仍未读的行会抑制重新创建 — 此重复数据删除防护对于 `emailImmediate` 发送被跳过（提醒偏移、员工"全部电子邮件"、工作流步骤拥有自己的重复数据删除）以及始终对 socket 的直接消息。

`shared/helpers/NotificationService.ts` 为消息模块外的调用者镜像相同的签名（`NotificationServiceOptions`），并在启动时向消息模块注册。

## 频道升级链

传递从一个级别开始（默认为 0，或更高用于提醒/显式发送），只有在前一个频道未成功时才进行到下一个频道。每个级别都被 `PreferenceGateHelper` 门控。

| 级别 | 频道 | 行为 |
|-------|---------|----------|
| 0 | **in_app / socket** | 首先检查 `in_app` 门。如果被抑制（静音），该行被保存为 `isNew=false` 并且传递完全停止 — 没有 socket 平移、没有徽章、没有进一步升级。否则服务器查找一个人的 `alerts` 房间的开放 socket 连接并推送 `notification`（或 `privateMessage`）帧。对于普通通知，成功的 socket 传递在此处停止链 — 30 分钟计时器重新检查未读项目并稍后升级它们。直接消息从不在 socket 处停止：已安装的 PWA 可以在后台保持 alerts socket 打开，这会以其他方式抑制操作系统级推送。 |
| 1 | **push** | 在 `allowPush` / 类别选择退出 / 安静时间上门控。发送到一个人的 `devices` 行上找到的 Expo 推送令牌和 Web Push 订阅，按端点去重并在过程中修剪过时的令牌。 |
| 2 | **email** | 在 `emailFrequency` 和类别选择退出上门控。立即发送（`emailImmediate`）立即渲染并写入 `deliveryLogs` 行；否则通知被留在待处理以进行批量摘要，如下所述。 |
| — | **sms** | 偏好管道（`allowSms`、每类别频道列表）已说明了 SMS 频道，但今天没有生产者通过它发送 — 它保留用于批量 SMS 产品，该产品通过 `TextingController` / `@churchapps/texting` 作为单独的、孤立的流运行。工作流**发送文本**步骤操作（`StepActionHelper.sendText` → `MessagingModuleGateway.sendPersonText`）也绕过这个漏斗：它通过教会的提供商直接给卡片的人发短信，所以通知偏好和安静时间不适用 — 仅尊重人的 `optedOut` 标志。 |

socket 或 push 处留下的未读通知通过 30 分钟计时器（`NotificationHelper.escalateDelivery`）升级。批量电子邮件由 `NotificationHelper.sendEmailNotifications(frequency)` 发送，由每个人的 `emailFrequency` 偏好驱动：`individual` 在 30 分钟计时器上运行，`daily` 在夜间计时器上运行。（`weekly` 是有效的偏好值但还没有专用批量运行。）

## 提醒引擎

预定的提醒 — 事件提醒、任务截止日期、事件服务/计划分配提醒 — 都通过一个通用引擎而不是每功能 cron 逻辑。

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**定义**（`reminderDefinitions`）要么是实体级（`entityId` 设置 — 一个特定的事件、任务或计划），要么是作用域级（`entityId` null，`scopeId` 设置 — 例如 serving plan type 下的每个计划）。一个定义带有一个分钟偏移 CSV（`offsets`，例如 `"1440,60"` 表示一天和一小时前）、本地发送时间（`sendLocalTime`）、频道 CSV（`channels` — 包括 `email` 在发送时触发立即丰富电子邮件）、`recipientMode` 和可选的自定义 `message`。

**扩展**为前景（滚动多天窗口）实现消防行。它在夜间计时器上运行，以及每当定义被保存时同步运行，所以最后一分钟事件的提醒仍然会触发。作用域定义通过适配器的 `loadScopeEntities` 扇出，为每个具体实体生成一个发生集；实体级发生使用键 `definitionId:occurrenceISO:offset`，而作用域发生按实体 id 命名空间，所以他们永远不会碰撞。Upsetting 一个发生**复活**一个以前取消的行 — 取消然后重新扩展是在底层实体更改后重新同步提醒的标准方法；已 `sent`、`failed` 或 `processing` 的行保持不变。

**分派**（`ReminderEngine.scan()`）在 30 分钟计时器上运行。它声称到期的发生（租约防止双重处理），通过实体的适配器加载收件人，过滤掉该发生的 `reminderSentLog` 中任何已记录的人，并使用 `deliveryStartLevel: 1` 调用 `createNotifications`（跳过直接推送）加上 `emailImmediate`/`emailByPerson` 当定义的频道包括电子邮件时。

内部事件总线对实体突变做出反应，无需等待夜间扩展：内容事件（通过 webhook 分派器）和计划/任务更新事件触发受影响实体的立即重新扩展或取消，计划更新也重新扩展任何范围的定义与其计划类型相关。

### 适配器

引擎是实体无关的；每个支持的实体类型都通过适配器插入（`helpers/adapters/`）：

| 实体类型 | 适配器 | 注意 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 根据事件和 `recipientMode`，接收者范围为注册者或组成员。 |
| `plan` | `PlanReminderAdapter` | 接收者是 Accepted + Unconfirmed plan assignments。`buildEmails` 调用 `DoingModuleGateway.buildPlanReminderEmails`，它通过 `doing/helpers/PlanReminderEmailHelper` 渲染位置、注释和自定义消息，包括由 `ReminderTokenHelper` 签名的 Accept/Decline 按钮，这些按钮发送给公开的分配响应端点。 |
| `task` | `TaskReminderAdapter` | 接收者是任务的受分配人。 |

### 端点

| 方法 | 路径 | 目的 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 加载或保存一个实体的提醒定义。 |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 加载或保存作用域级（继承）提醒定义。 |
| `DELETE` | `/messaging/reminders/:defId` | 删除定义并取消其待处理的发生。 |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 在保存前预览事件提醒的接收者计数和下次火灾时间。 |
| `GET` | `/messaging/reminders/log` | 教会最近的提醒发生历史。 |
| `POST` | `/messaging/reminders/mute` | 为特定实体静音提醒。 |

保存定义会触发该实体或作用域的同步重新扩展，所以编辑者无需等待夜间作业即可看到最新的"下次火灾"。

## 直接消息

直接消息乘坐与其他所有消息相同的漏斗，而不是单独的升级路径。每个未读对话在 `notifications` 中获取一个**影子行**（`contentType='privateMessage'`、`contentId` = 私人消息 id、`category='direct_messages'`），拥有所有传递状态 — socket/push/email 升级、读取跟踪，一切。`privateMessages` 表本身保存消息有效负载和 `notifyPersonId` 列，这是未读徽章的来源，当收件人读取对话时会被清除。

影子行对通知铃声是不可见的：它们被排除在未读计数查询、通知列表查询和标记已读/删除查询之外，所有这些都过滤 `contentType <> 'privateMessage'`。每个 DM ping 都会击中 socket，无论未读状态如何（实时聊天语义 — 没有重复数据删除），DMs 从不在 socket 传递处停止，就像普通通知一样，因为后台的 PWA 可以在仍然需要操作系统级推送时保持 socket 打开。如果一个人静音 DM 通知，影子行被停放（`isNew=false`、`notifyPersonId` 已清除）— 仍在对话本身内可见，只是没有徽章或警报。

## 偏好和门控

每个发送都通过 `PreferenceGateHelper.evaluate()`，一个纯函数（所有状态传递，热路径上没有 DB 调用）返回 `allow`、`suppress` 或 `defer`。图层按顺序运行，第一个决定赢的：

1. **锁定类别** — 一些类别是强制性的（等级 0）并绕过每一个其他层。
2. **主静音 / 频道杀死** — `masterMute`、`allowPush`、`allowSms` 或 `emailFrequency='never'` 完全抑制。
3. **安静时间** — 仅推送和 SMS（电子邮件被认为是非侵入性的）。如果当前挂钟时间在一个人的时区处于他们的安静窗口中，事务性类别仍然可以通过；非事务性的被推迟到安静窗口的末端，通过 `TimezoneHelper.wallClockToUtc` 计算为 DST 正确的 UTC 瞬间。
4. **每类别偏好覆盖** — 一个类别 × 频道对的显式选择退出；缺失意味着类别的默认。
5. **每实体静音** — 对特定实体（例如一个事件、一个计划）记录的静音比类别级别设置更限制，但仅在调用者提供实体 id/type 以及通知时适用。

涉及的表：`notificationPreferences`（全局 — `masterMute`、`individual|daily|weekly|never` 的 `emailFrequency`、`allowPush`、安静时间窗口 + 时区、`allowSms`）、`notificationPreferenceOverrides`（每类别 × 频道）和 `notificationEntityMutes`（每实体）。

这个门对 in-app（第 0 级）、push（第 1 级）和电子邮件（第 2 级）在漏斗内强制 — 包括立即提醒/摘要电子邮件。事务性电子邮件（身份验证码、密码重置、邀请、捐赠收据）按设计绕过它；那是第二道门的全部要点。

## 教会编写的电子邮件限制

教会编写其内容的电子邮件从共享的 ChurchApps SES 身份发送，所以它按教会由 `Api/src/shared/helpers/ChurchEmailLimiter.ts` 进行计量。四条路径调用它：group/template sends（`EmailTemplateController`、内容类型 `email`）、form follow-up emails（`FormSubmissionController`、`formFollowUp`）、工作流**发送电子邮件**操作（`NotificationHelper` with `churchAuthored`、`workflowEmail`）和 B1 account invites（`UserController.sendInviteEmail`、`invite`）。系统邮件（身份验证码、收据、提醒）不按计量。

- **批准门。** 教会不发送任何东西，直到服务器管理员设置 `churches.emailApprovedDate`（`POST /membership/churches/:id/emailApproval`、Server Admin → Churches → **Group Email** chip）。存档的教会总是被阻止。B1Admin 的 Send Email 对话读取 `GET /messaging/emailTemplates/sendStatus`（`approved`、`paused`、`remaining`、`requested`）并且在未批准时显示**Request review** 卡片而不是编辑器。`POST /messaging/emailTemplates/requestApproval` 电子邮件支持，最多每教会每周一次。
- **赚取的津贴。** 获批准的教会获得 `max(150, 2 × 其前 30 天最好的教会编写日)`，滚动 24 小时最多 2,000。当前 24 小时被排除在"最好日期"之外，所以突发不能提高自己的限制。
- **保留，然后解决。** `reserve()` 为每个收件人写入一个 `deliveryLogs` 行，然后重新检查津贴计数这些行，如果两个请求竞速越过限制则后退（发送返回 429）。`settle()` 标记每行发送或失败。
- **投诉暂停。** `sesFeedback` Lambda（`Api/src/lambda/ses-feedback-handler.ts`，由 SES → SNS 喂养）将每个永久反弹或投诉固定到教会的教会编写电子邮件在该地址附近到达的教会，存储为 `deliveryMethod` `sesBounce` / `sesComplaint`。教会在 7 天内暂停 2+ 投诉（≥ 0.3% 的发送）或 10+ 硬反弹（≥ 5%）。

## 调度

提醒引擎和通知摘要都乘坐现有的预定计时器，而不是引入新的基础设施：

| 计时器 | 时间表 | 运行 |
|-------|----------|------|
| 30 分钟计时器 | 每 30 分钟 | 升级未读通知；发送 `individual` 频率摘要电子邮件；分派到期的提醒发生（`ReminderEngine.scan`）；批准摘要；到期的自动化执行 |
| 夜间计时器 | 05:00 UTC | 组出席提醒；提前重复流媒体服务；刷新自动刷新列表；为下一个地平线扩展提醒发生（`ReminderEngine.expandAll`）；发送 `daily` 频率摘要电子邮件 |

在本地，相同的逻辑可以通过 `Api` 项目中的 `npm run timer:30min` 和 `npm run timer:midnight` 随需应变触发。

## 文件清单

| 区域 | 文件 |
|------|-------|
| 漏斗 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`、`PreferenceGateHelper.ts`、`NotificationCategoryHelper.ts`、`WebPushHelper.ts`、`ExpoPushHelper.ts`、`SocketHelper.ts`、`DeliveryHelper.ts` |
| 共享入口 | `Api/src/shared/helpers/NotificationService.ts` |
| 事务性门 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`、lint rule `Api/tools/eslint-rules/email-door.cjs` |
| 教会电子邮件限制 | `Api/src/shared/helpers/ChurchEmailLimiter.ts`、`Api/src/lambda/ses-feedback-handler.ts`、`Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| 提醒引擎 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`、`ReminderBootstrap.ts`、`helpers/adapters/*`、`controllers/ReminderController.ts` |
| 提醒存储库 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`、`ReminderOccurrenceRepo.ts`、`ReminderSentLogRepo.ts` |
| Serving/plan 电子邮件 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`、`ReminderTokenHelper.ts`、`Api/src/shared/modules/DoingModuleGateway.ts` |
| 提醒编辑器（B1Admin） | `serving/components/PlanTypeReminderEdit.tsx`、`calendars/components/EventReminderEdit.tsx`、`serving/tasks/components/TaskReminderEdit.tsx` |
| 提醒编辑器 / 偏好（B1App） | `EventReminderEdit.tsx`、`NotificationPrefsPage.tsx`、`useRealtimeNotifications.ts` |

## 相关页面

- [实时架构](../realtime) — WebSocket 协议和客户端基元（`SocketHelper`、`SubscriptionManager`、`ConversationStore`），in-app 传递级别依赖
- [Web Push 通知](../web-push) — VAPID 设置和浏览器 Push API 路径由推送升级级别使用
- [消息传递端点](../api/endpoints/messaging) — 消息、对话、连接和通知/提醒路由的完整 REST 表面
