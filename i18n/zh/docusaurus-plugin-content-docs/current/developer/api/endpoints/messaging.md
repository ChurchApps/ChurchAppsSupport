---
title: "消息端点"
---

# 消息端点

<div class="article-intro">

消息模块负责管理实时对话、聊天消息、推送通知、短信/电子邮件投递、WebSocket 连接、私信、设备注册以及短信服务提供商。它为所有 ChurchApps 应用提供通信层，同时支持直播聊天和异步通知。

</div>

**基础路径：** `/messaging`

## 对话

基础路径：`/messaging/conversations`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | 按逗号分隔的 ID 加载对话，并附带首条和末条消息 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 按内容加载对话并分页返回消息（`?page=&limit=`） |
| GET | `/posts` | JWT | — | 获取当前用户所在群组的帖子类对话 |
| GET | `/posts/group/:groupId` | JWT | — | 获取指定群组的帖子类对话 |
| GET | `/current/:churchId/:contentType/:contentId` | 公开 | — | 获取或创建内容的当前对话（自动解密 contentId） |
| GET | `/:churchId/:contentType/:contentId` | 公开 | — | 按内容类型和 ID 加载对话 |
| GET | `/:churchId/:id` | 公开 | — | 按 ID 加载单个对话 |
| POST | `/` | JWT | — | 创建或更新对话（批量） |
| POST | `/start` | JWT | — | 以初始评论消息开始新对话 |
| DELETE | `/:churchId/:id` | JWT | — | 删除对话 |

### 人员备注访问控制

内容类型为 `person`（人员记录上的“备注”标签页）或 `personConfidential`（“机密备注”部分）的对话，在每条读写路径上都受到限制，包括上方的公开路由；这些内容类型在这些路由上会返回 `401`。`person` 需要 MembershipApi 的 **人员 / 编辑** 权限；`personConfidential` 需要 **人员 / 查看机密备注** 权限。对于有范围限制的 API 密钥，`people:write` 同时包含这两项操作（该密钥对应的用户仍须持有相应的角色权限）。

### 群组和活动备注访问控制 {#group-and-event-notes-access-control}

另外两种备注内容类型同样在每条读写路径上受到限制（包括上方的公开路由），并且永远不会向匿名用户开放发布：

- **`groupNote`**（`contentId` = 群组 ID）-- 群组上的 **领袖备注** 信息流。只有该群组的领袖（JWT 中的 `leaderGroupIds`）可以读取或发布。任何员工权限都无法授予访问权限，包括 `content.edit` 和群组成员相关权限。
- **`eventNote`**（`contentId` = 活动 ID）-- 日历活动上的备注。拥有 `content.edit` 或 **日历 / 管理** 权限的员工始终可以读取和发布。否则访问权限取决于活动的 `notesViewRole`（读取）和 `notesPostRole`（发布）：`staff`（默认值，字段为 `null` 时使用）不允许其他人访问，`leaders` 允许活动所属群组的领袖访问，`members` 允许活动所属群组的成员和领袖访问。没有 `groupId` 的活动仅限员工访问。

### 工作流卡片备注访问控制

内容类型为 `workflowCard`（工作流卡片上的备注，其中 `contentId` 为卡片的任务 ID）的对话，只有能够打开该卡片的人才能读取和写入：即拥有 DoingApi **任务 / 查看** 权限的用户，或卡片所分配、创建或关联的人员或群组。其他人在每条读取路径上都会收到 `401`，包括上方的公开路由。卡片的对话通过卡片本身附加，使用 `POST /doing/tasks/:id/conversation`（请求体 `{ "conversationId": "..." }`；先附加的对话生效），卡片的编辑者及其负责人均可调用此接口。

### 示例：开始对话

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

## 消息

基础路径：`/messaging/messages`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | 加载对话的所有消息 |
| GET | `/catchup/:churchId/:conversationId` | 公开 | — | 加载对话的所有消息（直播聊天的公开补全） |
| GET | `/:churchId/:id` | 公开 | — | 按 ID 加载单条消息 |
| POST | `/` | JWT | — | 批量保存消息。会发送实时更新并触发通知。更新现有消息需要是其作者或拥有 `content.edit` 权限；存储的作者永远不可更改 |
| POST | `/send` | 公开 | — | 批量发送消息（公开）。通过 WebSocket 发送实时更新并触发通知 |
| POST | `/setCallout` | JWT | — | （旧版）实时广播提示消息。目前无活动客户端；直播聊天已不再渲染提示消息 |
| DELETE | `/:churchId/:id` | JWT | — | 删除消息并实时广播删除事件。参见 [消息审核](#message-moderation) |

### 消息审核 {#message-moderation}

以下人员可以删除消息：

- 消息的作者；
- 拥有 `content.edit` 权限的员工（教会范围内）；
- **群组领袖**，适用于 `contentType` 为 `group` 或 `groupAnnouncement` 且 `contentId` 为其所领导群组的对话（JWT 中的 `leaderGroupIds`）。

人员备注类对话（`person` / `personConfidential`）永远不由领袖审核，而是使用备注相关权限（`people.edit`、`people.viewConfidentialNotes`）。

领袖只能删除，不能编辑：重写其他成员的消息仍仅限作者和拥有 `content.edit` 权限的员工。

### 示例：发送消息

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

## 私信

基础路径：`/messaging/privatemessages`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载当前用户的所有私信（包括每个对话的最后一条消息，并将全部标记为已读） |
| GET | `/existing/:personId` | JWT | — | 查找与特定人员的现有私信对话 |
| GET | `/:id` | JWT | — | 按 ID 加载私信（如果发给当前用户，则清除通知） |
| POST | `/` | JWT | — | 批量发送私信。会触发对接收者的推送通知 |

## 通知

基础路径：`/messaging/notifications`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | 获取当前用户的未读通知数量 |
| GET | `/my` | JWT | — | 加载当前用户的所有通知（并全部标记为已读） |
| GET | `/tmpEmail` | 公开 | — | 触发每日邮件通知摘要（调试/定时任务端点） |
| GET | `/:churchId/person/:personId` | JWT | — | 加载特定人员的通知 |
| GET | `/:churchId/:id` | JWT | — | 按 ID 加载通知 |
| POST | `/` | JWT | — | 创建或更新通知（批量） |
| POST | `/create` | JWT | — | 为多人创建通知。请求体：`{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 将某人员的所有通知标记为已读 |
| POST | `/sendTest` | JWT | — | 发送测试推送通知。请求体：`{ personId, title }` |
| POST | `/ping` | 公开 | — | 从外部触发器创建通知。请求体：`{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | 删除通知 |

### 示例：创建通知

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

## 通知偏好设置

基础路径：`/messaging/notificationpreferences`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | 列出通知类别及其默认渠道和允许的渠道 |
| GET | `/my` | JWT | — | 加载当前用户的通知偏好（如不存在则自动创建默认值） |
| POST | `/` | JWT | — | 保存当前用户的偏好。请求体可包含以下任意字段：`allowPush`、`allowSms`、`emailFrequency`、`masterMute`、`quietHoursStart`、`quietHoursEnd`、`timeZone`、`maxPushPerDay`，以及可选的 `overrides: [{ categoryKey, channel, optedIn }]`（channel 可为 `push`、`email`、`in_app` 或 `sms`；锁定的类别将被忽略）。`allowSms` 是成员对短信提醒的同意选项。仍接受旧版的行数组请求体 |

## 连接

基础路径：`/messaging/connections`

管理聊天、群组对话、私信和直播的 WebSocket/实时连接。端到端协议请参见 [实时架构](../../realtime)。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | 公开 | — | 加载某对话的所有连接 |
| POST | `/` | 公开 | — | 批量注册连接。会在该对话上触发出席广播。请求体项：`{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | 公开 | — | 按 Socket ID 更新连接的显示名称。请求体：`{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | 公开 | — | 从对话中移除连接。会触发出席广播 |
| POST | `/tmpSendAlert` | 公开 | — | 向某人员的连接发送通知提醒。请求体：`{ churchId, personId }` |

## 设备

基础路径：`/messaging/devices`

管理推送通知的设备注册以及内容配对（例如在电视显示屏上运行的 Lessons 应用）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | 注册或更新设备（移动端推送注册）。通过 FCM 令牌或设备 ID 匹配 |
| POST | `/enrollAnon` | 公开 | — | 注册匿名设备并生成 4 位配对码 |
| POST | `/` | 公开 | — | 批量保存设备 |
| GET | `/pair/:pairingCode` | JWT | — | 使用配对码配对设备。可选 `?contentType=&contentId=` 以分配内容 |
| GET | `/status/:deviceId` | 公开 | — | 检查设备的配对状态 |
| GET | `/:churchId` | JWT | — | 加载教会的所有设备 |
| GET | `/:churchId/person/:personId` | JWT | — | 加载某人员的所有设备 |
| GET | `/:churchId/:id` | JWT | — | 按 ID 加载设备 |
| DELETE | `/:churchId/:id` | JWT | — | 删除设备 |

### 示例：注册设备

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## 设备内容

基础路径：`/messaging/devicecontents`

管理已配对设备的内容分配（例如电视上显示哪一节课）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | 加载设备的内容分配 |
| POST | `/` | JWT | — | 批量保存设备内容分配 |
| DELETE | `/:id` | JWT | — | 删除设备内容分配 |

## 短信

基础路径：`/messaging/texting`

管理短信服务提供商、群组短信发送和投递跟踪。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | 加载教会的短信服务提供商（凭据已隐藏） |
| GET | `/status` | JWT | — | `{ enabled }`——教会是否已启用短信服务提供商。任何已登录的教会用户均可访问；用于仅在可以发送短信时显示 **短信** 选项 |
| GET | `/inboundUrl` | JWT | `texting.send` 或 `settings.edit` | `{ url }`——教会的入站（STOP）Webhook URL，用于粘贴到服务提供商中 |
| POST | `/inbound/:churchId/:token` | 公开 | — | 服务提供商的入站短信 Webhook。`token` 是教会 ID 的 HMAC。如果回复内容恰好是停止词（`STOP`、`STOPALL`、`UNSUBSCRIBE`、`CANCEL`、`END`、`QUIT`、`OPTOUT`、`REVOKE`），则将所有匹配人员标记为 `optedOut` 并关闭其 `allowSms`。返回 `{ optedOut: <count> }`；其他回复返回 `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | 预览群组短信的接收人（可接收、已退订、无电话号码的人数） |
| GET | `/sent` | JWT | — | 加载教会所有已发送的短信记录 |
| GET | `/sent/:id/details` | JWT | — | 加载已发送短信及每位接收人的投递日志 |
| POST | `/providers` | JWT | — | 批量保存短信服务提供商。加密 API 凭据 |
| POST | `/send` | JWT | — | 向群组中所有符合条件的成员发送短信。请求体：`{ groupId, message }`。合并字段（`{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{churchName}}`）会针对每位接收人解析 |
| POST | `/sendPerson` | JWT | — | 向单个人员发送短信。请求体：`{ personId, phoneNumber, message }`。合并字段会被解析，记录的是解析后的文本 |
| DELETE | `/providers/:id` | JWT | — | 删除短信服务提供商 |

### 示例：发送群组短信

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

## 电子邮件模板

基础路径：`/messaging/emailTemplates`

管理可重复使用的电子邮件模板，并向群组发送基于模板的电子邮件。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载教会的所有电子邮件模板 |
| GET | `/:id` | JWT | — | 按 ID 加载单个电子邮件模板 |
| GET | `/preview/:groupId` | JWT | — | 预览群组的邮件投递情况（符合条件的接收人数、没有邮箱的成员） |
| POST | `/` | JWT | — | 创建或更新电子邮件模板（批量） |
| POST | `/send` | JWT | — | 向群组所有成员发送基于模板的电子邮件。请求体：`{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | 删除电子邮件模板 |

### 示例：向群组发送电子邮件

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

## 被封禁 IP

基础路径：`/messaging/blockedips`

（旧版）直播聊天的 IP 封禁功能。B1App 客户端不再调用 `POST /`——在统一投递迁移中已移除 IP 封禁。保存直播服务时，`StreamingServiceController` 仍会以服务器间调用的方式使用 `/clear` 路由。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | （旧版）保存被封禁 IP（批量）。目前无活动客户端 |
| POST | `/clear` | JWT | — | 清除特定服务的所有被封禁 IP。请求体：`[{ serviceId, churchId }]` |

## 投递日志

基础路径：`/messaging/deliverylogs`

跟踪已发送消息（短信、推送通知、电子邮件）的投递状态。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | 按内容类型和 ID 加载投递日志 |
| GET | `/person/:personId` | JWT | — | 加载某人员的投递日志。可选 `?startDate=&endDate=` 筛选 |
| GET | `/recent` | JWT | — | 加载教会最近的投递日志。可选 `?limit=`（默认 100） |
| GET | `/:id` | JWT | — | 按 ID 加载投递日志 |

## 相关页面

- [实时架构](../../realtime) -- WebSocket 协议、房间订阅以及统一投递框架
- [Web 推送通知](../../web-push) -- 浏览器推送注册与投递
- [成员端点](./membership) -- 人员、群组、角色和核心身份
- [出席端点](./attendance) -- 服务和到访跟踪
- [身份验证与权限](./authentication) -- 登录流程、JWT、OAuth、权限模型
- [模块结构](../module-structure) -- 代码组织模式
