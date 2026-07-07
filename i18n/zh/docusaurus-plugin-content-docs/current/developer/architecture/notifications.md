---
title: "通知和提醒架构"
---

# 通知和提醒架构

<div class="article-intro">

教会成员在他们查看的页面之外看到的每条消息 — 徽章计数、推送通知、摘要电子邮件 — 都通过MessagingApi中的两个门之一传递。此页面记录了漏斗、在计划中馈入它的提醒引擎以及决定什么实际上到达一个人的偏好模型。

</div>

## 概览 — 两个门

```
计划任何 ──▶ ReminderEngine（定义→发生→扫描）─┐
聊天/请求/工作流/批量发送 ──────────────────────────────┼─▶ createNotifications()
                                                          │    in_app门→socket→push→email（→sms槽）
账户/法律邮件 ──▶ TransactionalEmailHelper.sendTransactional()  [白名单、lint强制]
```

1. **任何告诉一个人某事的东西**通过messaging模块中的`NotificationHelper.createNotifications()`。它持久化一个`notifications`行并升级socket→push→email，每个频道评估`PreferenceGateHelper` — 包括级别0处的`in_app`。
2. **任何计划的东西**是一个`reminderDefinition`（实体级或范围级）扩展为`reminderOccurrences`并由`ReminderEngine.scan()`在循环定时器上调度。一个扩展器、一个调度器、一个发送账本（`reminderSentLog`）。
3. **直接电子邮件**仅存在于`TransactionalEmailHelper.sendTransactional()`后面。一个ESLint规则在编译时强制这一点 — 见下文。

:::tip 电子邮件门是lint强制的，不只是约定
`Api/tools/eslint-rules/email-door.cjs`定义`no-direct-email-helper`：对`NotificationHelper.ts`或`TransactionalEmailHelper.ts`之外的`EmailHelper.sendTemplatedEmail()`或`EmailHelper.sendEmail()`的任何调用都会失败lint。如果您需要发送电子邮件，通过漏斗（`createNotifications`与`emailImmediate`）或通过`TransactionalEmailHelper.sendTransactional()`路由它 — 没有第三种方式通过CI。
:::

## 通知漏斗

`NotificationHelper.createNotifications()`是任何不是计划的或事务的的单个条目点：

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
    deliveryStartLevel?: number;      // 0 socket（默认）、1 push、2仅电子邮件
    category?: string;                // 偏好轴；如果省略则从contentType派生
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // 立即发送电子邮件而不是等待摘要
  }
)
```

对于每个收件人，它在`notifications`中保存一行，并调用`attemptDeliveryWithEscalation`，它遍历下面的频道梯。相同`(contentType, contentId)`的仍未读行抑制重新创建 — 此去重防守对`emailImmediate`发送（提醒偏移、工作人员"全部电子邮件"、工作流步骤拥有自己的去重）跳过，对于直接消息跳过，这总是ping socket。

`shared/helpers/NotificationService.ts`为messaging模块之外的调用者镜像相同的签名（`NotificationServiceOptions`），并在启动时向messaging模块注册。

## 频道升级链

交付从一个级别开始（默认0或更高用于提醒/显式发送），仅当前一个成功时才进行到下一个频道。每个级别在尝试任何事物之前由`PreferenceGateHelper`门控。

| 级别 | 频道 | 行为 |
|-------|---------|----------|
| 0 | **in_app / socket** | `in_app`门首先检查。如果被抑制（静音），行被保存为`isNew=false`，交付完全停止 — 无socket ping、无徽章、无进一步升级。否则服务器查找人的`alerts`房间的开放socket连接，并推送一个`notification`（或`privateMessage`）帧。对于普通通知，成功的socket交付停止此处的链 — 30分钟定时器重新检查未读项并稍后升级它们。直接消息从不在socket处停止：已安装的PWA可以在背景中保持alerts socket开启，这样会以其他方式抑制OS级推送。 |
| 1 | **push** | 在`allowPush` / category选择退出/安静时间上门控。发送到在人的`devices`行上找到的Expo推送令牌和Web推送订阅，按端点去重并清除陈旧令牌。 |
| 2 | **email** | 在`emailFrequency`和category选择退出上门控。立即发送（`emailImmediate`）立即呈现并写`deliveryLogs`行；否则通知保持待定用于批摘要，如下所述。 |
| — | **sms** | 偏好管道（`allowSms`、按category频道列表）已考虑SMS频道，但今天没有生产者通过它发送 — 它保持为批量SMS产品保留，它通过`TextingController` / `@churchapps/texting`作为单独的、隔离的流运行。 |

在socket或push处留下的未读通知由30分钟定时器升级（`NotificationHelper.escalateDelivery`）。批电子邮件由`NotificationHelper.sendEmailNotifications(frequency)`发送，由每个人的`emailFrequency`偏好驱动：`individual`在30分钟定时器上运行，`daily`在夜间定时器上运行。（`weekly`是有效的偏好值，但尚未有专用批量运行。）

## 提醒引擎

计划的提醒 — 事件提醒、任务截止日期、服务/计划分配提醒 — 都通过一个通用引擎而不是特别的按功能cron逻辑。

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan（30分钟）──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 实体或范围级              每个（定义、               deliveryStartLevel: 1
 偏移/频道/消息        实体、发生、偏移）一行      + reminderSentLog账本
```

**定义**（`reminderDefinitions`）要么是实体级（`entityId`设置 — 特定事件、任务或计划）要么是范围级（`entityId` null、`scopeId`设置 — 例如服务计划类型下的每个计划）。定义携带分钟偏移的CSV（`offsets`，例如`"1440,60"`用于前一天和前一小时）、本地发送时间（`sendLocalTime`）、频道的CSV（`channels` — 包括`email`在发送时触发一个立即丰富电子邮件）、`recipientMode`和可选的自定义`message`。

**扩展**实现了前面地平线上的消防行（一个滚动多天窗口）。它在夜间定时器上运行，并同步地在定义保存时运行，所以最后一分钟事件的提醒仍然发火。范围定义通过适配器的`loadScopeEntities`扇出，为每个具体实体产生一个发生设置；实体级发生使用密钥`definitionId:occurrenceISO:offset`，而范围发生按实体id命名空间，所以它们永不碰撞。升级一个发生**复活**一个之前被取消的行 — 取消然后重新扩展是重新同步提醒后的标准方式底层实体改变；已经`sent`、`failed`或`processing`的行保持不变。

**调度**（`ReminderEngine.scan()`）在30分钟定时器上运行。它声明已期限发生（一个租约防止双重处理）、通过实体的适配器加载收件人、过滤掉在`reminderSentLog`中为该发生已记录的任何人，并用`deliveryStartLevel: 1`调用`createNotifications`（直接跳过推送）加上`emailImmediate`/`emailByPerson`当定义的频道包括电子邮件时。

一个内部事件总线对实体变更反应而不等待夜间扩展：内容事件（通过webhook调度器）和计划/任务更新事件触发受影响实体的立即重新扩展或取消，计划更新也重新扩展任何范围定义联系到其计划类型。

### 适配器

引擎是实体不可知的；每个支持的实体类型通过适配器（`helpers/adapters/`）插入：

| 实体类型 | 适配器 | 备注 |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | 收件人范围到注册者或小组成员取决于事件和`recipientMode`。 |
| `plan` | `PlanReminderAdapter` | 收件人是已接受+未确认计划分配。`buildEmails`调用到`DoingModuleGateway.buildPlanReminderEmails`，它通过`doing/helpers/PlanReminderEmailHelper`呈现位置、笔记和自定义消息，包括由`ReminderTokenHelper`签名的接受/拒绝按钮，发布到公开分配响应端点。 |
| `task` | `TaskReminderAdapter` | 收件人是任务的受让人。 |

### 端点

| 方法 | 路径 | 目的 |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | 加载或保存一个实体的提醒定义。 |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | 加载或保存范围级（继承）提醒定义。 |
| `DELETE` | `/messaging/reminders/:defId` | 删除定义并取消其待定发生。 |
| `GET` | `/messaging/reminders/event/:eventId/preview` | 在保存前预览事件提醒的收件人计数和下一次消防时间。 |
| `GET` | `/messaging/reminders/log` | 教会的最近提醒发生历史。 |
| `POST` | `/messaging/reminders/mute` | 静音特定实体的提醒。 |

保存定义触发该实体或范围的同步重新扩展，所以编辑者看到最新的"下一次消防"而不用等待夜间工作。

## 直接消息

直接消息使用与所有其他相同的漏斗而不是单独的升级路径。每个未读会话在`notifications`中获得一个**影子行**（`contentType='privateMessage'`、`contentId` = 私人消息id、`category='direct_messages'`），它拥有所有交付状态 — socket/push/email升级、读取跟踪、所有内容。`privateMessages`表本身保持消息有效负载和`notifyPersonId`列，这是未读徽章的源并在收件人读取会话时被清除。

影子行对通知铃声不可见：它们从未读计数查询、通知列表查询和标记读/删除查询中排除，所有都过滤`contentType <> 'privateMessage'`。每个DM ping无论未读状态如何都命中socket（实时聊天语义 — 无去重），DM从不在socket交付处停止的方式普通通知确实，因为后台PWA可以保持socket开启，同时仍然需要OS级推送。如果一个人静音DM通知，影子行被停放（`isNew=false`、`notifyPersonId`清除） — 仍在会话本身内可见，只是无徽章或警报。

## 偏好和门控

每个发送通过`PreferenceGateHelper.evaluate()`，一个纯函数（所有状态传入，热路径上无DB调用）返回`allow`、`suppress`或`defer`。层按顺序运行，第一个决定的赢：

1. **锁定类别** — 某些类别是强制的（层0）并绕过所有其他层。
2. **主静音/频道关闭** — `masterMute`、`allowPush`、`allowSms`或`emailFrequency='never'`直接抑制。
3. **安静时间** — 仅推送和SMS（电子邮件被认为是非入侵性的）。如果当前墙钟时间在人的时区中在他们的安静窗口中，事务类别仍然通过；非事务的被推迟到安静窗口的结尾，计算为DST正确的UTC即时通过`TimezoneHelper.wallClockToUtc`。
4. **按类别偏好覆盖** — 一个显式选择退出用于一个类别×频道对；缺失意味着类别的默认。
5. **按实体静音** — 针对特定实体（例如一个事件、一个计划）记录的静音比类别级设置更限制，但仅在调用者随通知一起提供实体id/类型时应用。

涉及的表：`notificationPreferences`（全局 — `masterMute`、`emailFrequency`为`individual|daily|weekly|never`、`allowPush`、安静时间窗口+时区、`allowSms`）、`notificationPreferenceOverrides`（按类别×频道）和`notificationEntityMutes`（按实体）。

此门对in-app（级别0）、push（级别1）和email（级别2）在漏斗内强制 — 包括立即提醒/摘要电子邮件。事务电子邮件（认证代码、密码重置、邀请、捐赠收据）通过设计绕过它；那是第二个门的全部点。

## 调度

提醒引擎和通知摘要都使用现有的计划定时器而不是引入新基础设施：

| 定时器 | 计划 | 运行 |
|-------|----------|------|
| 30分钟定时器 | 每30分钟 | 升级未读通知；发送`individual`频率摘要电子邮件；调度已期限提醒发生（`ReminderEngine.scan`）；批准摘要；已期限自动化执行 |
| 夜间定时器 | 05:00 UTC | 小组出勤提醒；推进循环流媒体服务；刷新自动刷新列表；扩展提醒发生用于下一个地平线（`ReminderEngine.expandAll`）；发送`daily`频率摘要电子邮件 |

本地，相同的逻辑可以按需从`Api`项目用`npm run timer:30min`和`npm run timer:midnight`触发。

## 文件清单

| 区域 | 文件 |
|------|-------|
| 漏斗 | `Api/src/modules/messaging/helpers/NotificationHelper.ts`、`PreferenceGateHelper.ts`、`NotificationCategoryHelper.ts`、`WebPushHelper.ts`、`ExpoPushHelper.ts`、`SocketHelper.ts`、`DeliveryHelper.ts` |
| 共享条目 | `Api/src/shared/helpers/NotificationService.ts` |
| 事务门 | `Api/src/shared/helpers/TransactionalEmailHelper.ts`、lint规则`Api/tools/eslint-rules/email-door.cjs` |
| 提醒引擎 | `Api/src/modules/messaging/helpers/ReminderEngine.ts`、`ReminderBootstrap.ts`、`helpers/adapters/*`、`controllers/ReminderController.ts` |
| 提醒存储库 | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`、`ReminderOccurrenceRepo.ts`、`ReminderSentLogRepo.ts` |
| 服务/计划电子邮件 | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`、`ReminderTokenHelper.ts`、`Api/src/shared/modules/DoingModuleGateway.ts` |
| 提醒编辑器（B1Admin） | `serving/components/PlanTypeReminderEdit.tsx`、`calendars/components/EventReminderEdit.tsx`、`serving/tasks/components/TaskReminderEdit.tsx` |
| 提醒编辑器/偏好（B1App） | `EventReminderEdit.tsx`、`NotificationPrefsPage.tsx`、`useRealtimeNotifications.ts` |

## 相关页面

- [实时架构](../realtime) — WebSocket协议和客户端原始件（`SocketHelper`、`SubscriptionManager`、`ConversationStore`）in-app交付级骑在
- [Web推送通知](../web-push) — VAPID设置和浏览器推送API路径由推送升级级使用
- [消息端点](../api/endpoints/messaging) — 消息、会话、连接和通知/提醒路由的完整REST表面
