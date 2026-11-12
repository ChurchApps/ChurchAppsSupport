---
title: "消息接口"
description: "ChurchApps 消息 API 端点参考：对话、备注访问规则、短信、电子邮件模板、通知和设备。"
---

# 消息接口

<div class="article-intro">

消息模块负责管理实时对话、聊天消息、推送通知、短信/电子邮件投递、WebSocket 连接、私信、设备注册以及短信服务商。它为所有 ChurchApps 应用提供通信层，既用于直播聊天，也用于异步通知。

</div>

**基础路径：** `/messaging`

## 对话 {#conversations}

基础路径：`/messaging/conversations`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | 通过逗号分隔的 ID 加载对话，包含首条和末条消息 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 加载某内容的对话及分页消息（`?page=&limit=`） |
| GET | `/posts` | JWT | — | 获取当前用户所在小组的帖子类型对话 |
| GET | `/posts/group/:groupId` | JWT | — | 获取特定小组的帖子类型对话 |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | B1 管理后台备注页面中，所有记录的最新备注。`section` 为 `people`、`groups`、`events` 或 `workflows`（否则返回 400）；`limit` 默认为 25（最大 100）；`before` 为上一页的游标。每条备注仍需通过其所属类型的规则检查（人员编辑 / 机密备注权限、小组领袖、活动查看者、工作流卡片查看者），因此调用方只能看到其有权打开的备注。备注文本截取前 300 个字符 |
| GET | `/current/:churchId/:contentType/:contentId` | 公开 | — | 获取或创建某内容当前的对话（自动解密 contentId） |
| GET | `/:churchId/:contentType/:contentId` | 公开 | — | 按内容类型和 ID 加载对话 |
| GET | `/:churchId/:id` | 公开 | — | 按 ID 加载单个对话 |
| POST | `/` | JWT | — | 创建或更新对话（批量） |
| POST | `/start` | JWT | — | 以一条初始评论消息开始新对话 |
| DELETE | `/:churchId/:id` | JWT | — | 删除对话 |

### 人员备注访问控制 {#person-notes-access-control}

`contentType: "person"`（人员记录上的备注选项卡）或 `contentType: "personConfidential"`（机密备注板块）的对话，会在每条读取和写入路径上受到限制，包括上述原本公开的路由 -- 对于这些内容类型，它们会返回 `401`。`person` 需要 MembershipApi 的 **人员 / 编辑** 权限；`personConfidential` 需要 **人员 / 查看机密备注** 权限。对于限定范围的 API 密钥，`people:write` 同时包含这两项操作（该密钥的用户仍须拥有底层角色权限）。

### 小组和活动备注访问控制 {#group-and-event-notes-access-control}

另外两种备注内容类型同样在每条读取和写入路径上受到限制（包括上述公开路由），并且绝不对匿名用户开放发布：

- **`groupNote`**（`contentId` 为小组 ID）-- 小组上的**领袖备注**信息流。只有该小组的领袖（JWT 中的 `leaderGroupIds`）可以读取或发布。任何员工权限都不授予访问权，包括 `content.edit` 以及小组成员相关权限。
- **`eventNote`**（`contentId` 为活动 ID）-- 日历活动上的备注。拥有 `content.edit` 或 **日历 / 管理员** 权限的员工始终可以读取和发布。否则，访问权限取决于活动的 `notesViewRole`（读取）和 `notesPostRole`（发布）：`staff`（默认值，字段为 `null` 时使用）不允许其他任何人访问，`leaders` 允许活动所属小组的领袖访问，`members` 允许活动所属小组的成员和领袖访问。没有 `groupId` 的活动仅限员工访问。

### 工作流卡片备注访问控制 {#workflow-card-notes-access-control}

`contentType: "workflowCard"`（工作流卡片上的备注，其中 `contentId` 为卡片的任务 ID）的对话，仅能由有权打开该卡片的人读取和写入：具有 DoingApi **任务 / 查看** 权限的用户，或该卡片所分配、创建或关于的人员或小组。其他人在每条读取路径上（包括上述公开路由）都会收到 `401`。卡片的对话通过卡片本身使用 `POST /doing/tasks/:id/conversation`（请求体 `{ "conversationId": "..." }`；首次关联的对话生效）进行关联，卡片的编辑者及其负责人均可调用该接口。

### 示例：发起对话 {#example-start-a-conversation}

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## 消息 {#messages}

基础路径：`/messaging/messages`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | 加载某对话的所有消息 |
| GET | `/catchup/:churchId/:conversationId` | 公开 | — | 加载某对话的所有消息（直播聊天的公开追赶接口） |
| GET | `/:churchId/:id` | 公开 | — | 按 ID 加载单条消息 |
| POST | `/` | JWT | — | 保存消息（批量）。发送实时更新并触发通知。更新已有消息需为其作者或拥有 `content.edit` 权限；存储的作者信息不可重新分配 |
| POST | `/send` | 公开 | — | 发送消息（批量，公开）。通过 WebSocket 发送实时更新并触发通知 |
| POST | `/setCallout` | JWT | — | （旧版）实时广播提示消息。目前没有活跃客户端；直播聊天已不再渲染提示 |
| DELETE | `/:churchId/:id` | JWT | — | 删除消息并实时广播删除事件。参见[消息管理](#message-moderation) |

### 消息管理 {#message-moderation}

以下人员可以删除消息：

- 消息的作者；
- 拥有 `content.edit` 权限的员工（全教会范围）；
- **小组领袖**，适用于 `contentType` 为 `group` 或 `groupAnnouncement`、且 `contentId` 为其所领导小组的对话（JWT 中的 `leaderGroupIds`）。

人员备注对话（`person` / `personConfidential`）永远不由领袖管理 -- 它们使用备注权限（`people.edit`、`people.viewConfidentialNotes`）。

领袖只能删除，不能编辑：重写其他成员的消息仍仅限于作者和拥有 `content.edit` 权限的员工。

### 示例：发送消息 {#example-send-a-message}

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## 私信 {#private-messages}

基础路径：`/messaging/privatemessages`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载当前用户的所有私信（包括每个对话的最后一条消息，并将所有消息标记为已读） |
| GET | `/existing/:personId` | JWT | — | 查找与特定人员已有的私人对话 |
| GET | `/:id` | JWT | — | 按 ID 加载私信（若发给当前用户，则清除通知） |
| POST | `/` | JWT | — | 发送私信（批量）。会向接收者触发推送通知 |

## 通知 {#notifications}

基础路径：`/messaging/notifications`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | 获取当前用户的未读通知数量 |
| GET | `/my` | JWT | — | 加载当前用户的所有通知（并将其全部标记为已读） |
| GET | `/tmpEmail` | 公开 | — | 触发每日电子邮件通知摘要（调试/定时任务端点） |
| GET | `/:churchId/person/:personId` | JWT | — | 加载特定人员的通知 |
| GET | `/:churchId/:id` | JWT | — | 按 ID 加载通知 |
| POST | `/` | JWT | — | 创建或更新通知（批量） |
| POST | `/create` | JWT | — | 为多人创建通知。请求体：`{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 将某人的所有通知标记为已读 |
| POST | `/sendTest` | JWT | — | 发送测试推送通知。请求体：`{ personId, title }` |
| POST | `/ping` | 公开 | — | 由外部触发器创建通知。请求体：`{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | 删除通知 |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | 统计推送将覆盖该小组的多少名成员 |
| GET | `/churchPreview` | JWT | `content.edit` | 统计向所有安装了应用的人发送推送将覆盖多少人 |
| POST | `/group/send` | JWT | `groupMembers.edit` | 立即向小组成员发送推送 |

### 示例：创建通知 {#example-create-notifications}

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## 定时通知 {#scheduled-notifications}

基础路径：`/messaging/scheduledNotifications`

提前安排的推送。`audience` 可以是 `church`（所有安装了应用的人；需要 `content.edit`）或 `group`（需要 `groupMembers.edit` 并提供 `groupId`）。标题限制为 80 个字符，消息限制为 240 个字符。到期的记录会由每分钟运行的定时器发送。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` 或 `content.edit` | 列出教会的已安排及近期通知 |
| POST | `/` | JWT | 视受众而定 | 创建定时通知；若设置了 `id` 则更新该通知。请求体：`{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`。若更新的通知已不再处于待发送状态，则返回 409 |
| POST | `/:id/sendNow` | JWT | 视受众而定 | 立即发送待发送的通知。若已发送、已取消或正在发送中，则返回 409 |
| DELETE | `/:id` | JWT | 视受众而定 | 取消待发送的通知，或从列表中移除已发送、失败或已取消的通知。正在发送时返回 409 |
| DELETE | `/` | JWT | `groupMembers.edit` 或 `content.edit` | 删除用户可发送至的受众中所有已发送、失败和已取消的通知。返回 `{ deleted }` |

## 通知偏好设置 {#notification-preferences}

基础路径：`/messaging/notificationpreferences`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | 列出通知类别及其默认和允许的渠道 |
| GET | `/my` | JWT | — | 加载当前用户的通知偏好设置（若不存在则自动创建默认值） |
| POST | `/` | JWT | — | 保存当前用户的偏好设置。请求体：可包含 `allowPush`、`allowSms`、`emailFrequency`、`masterMute`、`quietHoursStart`、`quietHoursEnd`、`timeZone`、`maxPushPerDay`，以及可选的 `overrides: [{ categoryKey, channel, optedIn }]`（channel 可为 `push`、`email`、`in_app` 或 `sms`；锁定的类别将被忽略）。`allowSms` 是成员对短信提醒的同意设置。仍接受旧版的行数组请求体 |

## 连接 {#connections}

基础路径：`/messaging/connections`

管理用于聊天、小组对话、私信和直播的 WebSocket/实时连接。端到端协议请参阅[实时架构](../../realtime.md)。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | 公开 | — | 加载某对话的所有连接 |
| POST | `/` | 公开 | — | 注册连接（批量）。会在该对话上触发出勤广播。请求项：`{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | 公开 | — | 按 socket ID 更新连接的显示名称。请求体：`{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | 公开 | — | 从对话中移除连接。会触发出勤广播 |
| POST | `/tmpSendAlert` | 公开 | — | 向某人的连接发送通知提醒。请求体：`{ churchId, personId }` |

## 设备 {#devices}

基础路径：`/messaging/devices`

管理用于推送通知和内容配对的设备注册（例如电视显示屏上的 Lessons 应用）。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | 注册或更新设备（移动端推送注册）。按 FCM 令牌或设备 ID 匹配 |
| POST | `/enrollAnon` | 公开 | — | 注册匿名设备并生成 4 个字符的配对码 |
| POST | `/` | 公开 | — | 保存设备（批量） |
| GET | `/pair/:pairingCode` | JWT | — | 使用配对码配对设备。可选 `?contentType=&contentId=` 以分配内容 |
| GET | `/status/:deviceId` | 公开 | — | 检查设备的配对状态 |
| GET | `/:churchId` | JWT | — | 加载某教会的所有设备 |
| GET | `/:churchId/person/:personId` | JWT | — | 加载某人的所有设备 |
| GET | `/:churchId/:id` | JWT | — | 按 ID 加载设备 |
| DELETE | `/:churchId/:id` | JWT | — | 删除设备 |

### 示例：注册设备 {#example-enroll-a-device}

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## 设备内容 {#device-contents}

基础路径：`/messaging/devicecontents`

管理已配对设备的内容分配（例如电视上显示哪一节课程）。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | 加载某设备的内容分配 |
| POST | `/` | JWT | — | 保存设备内容分配（批量） |
| DELETE | `/:id` | JWT | — | 删除设备内容分配 |

## 短信 {#texting}

基础路径：`/messaging/texting`

管理短信服务商、小组短信群发以及投递跟踪。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | 加载教会的短信服务商（凭据已隐藏） |
| GET | `/status` | JWT | — | `{ enabled }` -- 教会是否已启用短信服务商。任何已登录的教会用户均可访问；用于仅在可以发送短信时才显示**短信**选项 |
| GET | `/inboundUrl` | JWT | `texting.send` 或 `settings.edit` | `{ url }` -- 教会的入站（STOP）webhook URL，需粘贴到服务商处 |
| POST | `/inbound/:churchId/:token` | 公开 | — | 服务商的入站消息 webhook。`token` 为教会 ID 的 HMAC。若回复内容恰好为停止词（`STOP`、`STOPALL`、`UNSUBSCRIBE`、`CANCEL`、`END`、`QUIT`、`OPTOUT`、`REVOKE`），则将所有匹配的人员标记为 `optedOut`，并关闭其 `allowSms`。返回 `{ optedOut: <count> }`；其他回复返回 `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | 预览小组短信的接收对象（可接收、已退订、无电话号码的人数） |
| GET | `/sent` | JWT | — | 加载教会所有已发送的短信记录 |
| GET | `/sent/:id/details` | JWT | — | 加载已发送短信及每位接收者的投递日志 |
| POST | `/providers` | JWT | — | 保存短信服务商（批量）。加密 API 凭据 |
| POST | `/send` | JWT | — | 向某小组所有符合条件的成员发送短信。请求体：`{ groupId, message }`。合并字段（`{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{churchName}}`）会针对每位接收者进行解析 |
| POST | `/sendPerson` | JWT | — | 向单个人员发送短信。请求体：`{ personId, phoneNumber, message }`。合并字段会被解析，记录的是解析后的文本 |
| DELETE | `/providers/:id` | JWT | — | 删除短信服务商 |

### 示例：发送小组短信 {#example-send-group-text}

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## 电子邮件模板 {#email-templates}

基础路径：`/messaging/emailTemplates`

管理可复用的电子邮件模板，并向小组发送模板化邮件。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载教会的所有电子邮件模板 |
| GET | `/:id` | JWT | — | 按 ID 加载单个电子邮件模板 |
| GET | `/sendStatus` | JWT | `groupMembers.edit` 或 `tasks.admin` | 教会的小组电子邮件状态：`{ approved, paused, remaining, requested }`。B1Admin 的发送邮件对话框和工作流**发送邮件**操作会使用它，在邮件无法发出时发出警告 |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | 请求支持团队批准教会使用小组电子邮件（每个教会每周最多一次） |
| GET | `/preview/:groupId` | JWT | — | 预览小组的电子邮件投递情况（符合条件的接收者人数、没有邮箱的成员） |
| POST | `/` | JWT | — | 创建或更新电子邮件模板（批量） |
| POST | `/send` | JWT | — | 向某小组所有成员发送模板化邮件。请求体：`{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | 删除电子邮件模板 |

### 示例：向小组发送电子邮件 {#example-send-email-to-group}

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**支持的合并字段：** `{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{email}}`、`{{churchName}}`

## 被屏蔽的 IP {#blocked-ips}

基础路径：`/messaging/blockedips`

（旧版）直播聊天的 IP 屏蔽功能。B1App 客户端已不再调用 `POST /` -- IP 屏蔽已在统一投递迁移中移除。保存直播服务时，`StreamingServiceController` 仍会以服务器间调用的方式调用 `/clear` 路由。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | （旧版）保存被屏蔽的 IP（批量）。目前没有活跃客户端 |
| POST | `/clear` | JWT | — | 清除特定服务的所有被屏蔽 IP。请求体：`[{ serviceId, churchId }]` |

## 投递日志 {#delivery-logs}

基础路径：`/messaging/deliverylogs`

跟踪已发送消息（短信、推送通知、电子邮件）的投递状态。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | 按内容类型和 ID 加载投递日志 |
| GET | `/person/:personId` | JWT | — | 加载某人的投递日志。可选 `?startDate=&endDate=` 进行筛选 |
| GET | `/recent` | JWT | — | 加载教会近期的投递日志。可选 `?limit=`（默认 100） |
| GET | `/:id` | JWT | — | 按 ID 加载投递日志 |

## 相关页面 {#related-pages}

- [实时架构](../../realtime.md) -- WebSocket 协议、房间订阅以及统一投递框架
- [Web 推送通知](../../web-push.md) -- 浏览器推送注册与投递
- [成员接口](./membership.md) -- 人员、小组、角色和核心身份
- [出勤接口](./attendance.md) -- 场次和到访跟踪
- [身份验证与权限](./authentication.md) -- 登录流程、JWT、OAuth 以及权限模型
- [模块结构](../module-structure.md) -- 代码组织模式
