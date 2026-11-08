---
title: "消息接口端点"
description: "ChurchApps 消息接口端点参考：对话、备注访问规则、短信、电子邮件模板、通知和设备。"
---

# 消息接口端点

<div class="article-intro">

消息模块负责管理实时对话、聊天消息、推送通知、短信/电子邮件发送、WebSocket 连接、私信、设备注册和短信服务提供商。它为所有 ChurchApps 应用提供通信层，既支持直播聊天，也支持异步通知。

</div>

**基础路径：** `/messaging`

## 对话

基础路径：`/messaging/conversations`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | 按逗号分隔的 ID 加载对话，并返回首条和末条消息 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 加载某内容的对话及分页消息（`?page=&limit=`） |
| GET | `/posts` | JWT | — | 获取当前用户所在小组的帖子类型对话 |
| GET | `/posts/group/:groupId` | JWT | — | 获取指定小组的帖子类型对话 |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | 获取所有记录中最新的备注，用于 B1 Admin 备注页面。`section` 可以是 `people`、`groups`、`events` 或 `workflows`（其他值返回 400）；`limit` 默认为 25（最大 100）；`before` 为上一页的游标。每条备注仍需通过其所属类型的规则检查（人员编辑/机密备注权限、小组负责人、活动查看者、工作流卡片查看者），因此调用者只能看到其有权打开的备注。备注文本截取前 300 个字符 |
| GET | `/current/:churchId/:contentType/:contentId` | 公开 | — | 获取或创建某内容当前的对话（自动解密 contentId） |
| GET | `/:churchId/:contentType/:contentId` | 公开 | — | 按内容类型和 ID 加载对话 |
| GET | `/:churchId/:id` | 公开 | — | 按 ID 加载单个对话 |
| POST | `/` | JWT | — | 创建或更新对话（批量） |
| POST | `/start` | JWT | — | 以一条初始评论消息开始新对话 |
| DELETE | `/:churchId/:id` | JWT | — | 删除对话 |

### 人员备注访问控制

`contentType: "person"`（人员记录上的备注标签页）或 `contentType: "personConfidential"`（机密备注部分）的对话，在每条读写路径上都受到限制，包括上方的公开路由。对于这些内容类型，这些路由会返回 `401`。`person` 需要 MembershipApi 的 **People / Edit** 权限；`personConfidential` 需要 **People / View Confidential Notes** 权限。对于有范围限制的 API 密钥，`people:write` 同时包含这两项操作（但密钥所属用户仍须持有相应的角色权限）。

### 小组和活动备注访问控制 {#group-and-event-notes-access-control}

另外两种备注内容类型同样在每条读写路径上受到限制（包括上方的公开路由），并且从不向匿名用户开放发帖：

- **`groupNote`**（`contentId` = 小组 ID）-- 小组上的 **Leader notes**（负责人备注）数据流。只有该小组的负责人（JWT 中的 `leaderGroupIds`）可以读取或发帖。任何员工权限都无法授予访问权，包括 `content.edit` 和小组成员相关权限。
- **`eventNote`**（`contentId` = 活动 ID）-- 日历活动上的备注。拥有 `content.edit` 或 **Calendars / Admin** 权限的员工始终可以读取和发帖。否则访问权限取决于活动的 `notesViewRole`（读取）和 `notesPostRole`（发帖）：`staff`（默认值，字段为 `null` 时使用）不允许其他任何人访问；`leaders` 允许活动所属小组的负责人访问；`members` 允许活动所属小组的成员和负责人访问。没有 `groupId` 的活动仅限员工访问。

### 工作流卡片备注访问控制

`contentType: "workflowCard"` 的对话（工作流卡片上的备注，其中 `contentId` 为卡片的任务 ID），仅允许能够打开该卡片的人读写：即拥有 DoingApi 的 **Tasks / View** 权限的用户，或卡片所分配、创建者或所涉及的人员或小组。其他人在每条读取路径上（包括上方的公开路由）都会收到 `401`。卡片的对话通过卡片本身关联，即调用 `POST /doing/tasks/:id/conversation`（请求体 `{ "conversationId": "..." }`；先关联的对话生效），卡片的编辑者及其负责人均可调用。

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

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | 加载某对话的所有消息 |
| GET | `/catchup/:churchId/:conversationId` | 公开 | — | 加载某对话的所有消息（直播聊天的公开补全接口） |
| GET | `/:churchId/:id` | 公开 | — | 按 ID 加载单条消息 |
| POST | `/` | JWT | — | 保存消息（批量）。发送实时更新并触发通知。更新已有消息需要是其作者或拥有 `content.edit` 权限；已保存的作者信息不可更改 |
| POST | `/send` | 公开 | — | 发送消息（批量，公开）。通过 WebSocket 发送实时更新并触发通知 |
| POST | `/setCallout` | JWT | — | （旧版）实时广播提示消息。目前没有活跃的客户端；直播聊天不再显示提示 |
| DELETE | `/:churchId/:id` | JWT | — | 删除消息并实时广播删除事件。参见[消息管理](#message-moderation) |

### 消息管理

以下人员可以删除消息：

- 消息的作者；
- 拥有 `content.edit` 权限的员工（适用于全教会范围）；
- **小组负责人**，适用于 `contentType` 为 `group` 或 `groupAnnouncement`、且 `contentId` 为其所负责小组的对话（JWT 中的 `leaderGroupIds`）。

人员备注对话（`person` / `personConfidential`）永远不由负责人管理，而是改用备注相关权限（`people.edit`、`people.viewConfidentialNotes`）。

负责人只能删除、不能编辑：改写其他成员的消息仍仅限于作者和拥有 `content.edit` 权限的员工。

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

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载当前用户的所有私信（包括每个对话的最后一条消息，并将所有消息标记为已读） |
| GET | `/existing/:personId` | JWT | — | 查找与特定人员已有的私人对话 |
| GET | `/:id` | JWT | — | 按 ID 加载私信（若发送给当前用户，则清除通知） |
| POST | `/` | JWT | — | 发送私信（批量）。会向接收者触发推送通知 |

## 通知

基础路径：`/messaging/notifications`

| 方法 | 路径 | 认证 | 权限 | 描述 |
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

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | 列出通知类别及其默认渠道和允许的渠道 |
| GET | `/my` | JWT | — | 加载当前用户的通知偏好设置（若不存在则自动创建默认值） |
| POST | `/` | JWT | — | 保存当前用户的偏好设置。请求体可包含以下任意字段：`allowPush`、`allowSms`、`emailFrequency`、`masterMute`、`quietHoursStart`、`quietHoursEnd`、`timeZone`、`maxPushPerDay`，以及可选的 `overrides: [{ categoryKey, channel, optedIn }]`（channel 可以是 `push`、`email`、`in_app` 或 `sms`；锁定的类别会被忽略）。`allowSms` 表示成员同意接收短信提醒。仍接受旧版的行数组请求体 |

## 连接

基础路径：`/messaging/connections`

管理聊天、小组对话、私信和直播的 WebSocket/实时连接。完整协议请参见[实时架构](../../realtime.md)。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | 公开 | — | 加载某对话的所有连接 |
| POST | `/` | 公开 | — | 注册连接（批量）。会在该对话上触发出勤广播。请求体项：`{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | 公开 | — | 按 socket ID 更新连接的显示名称。请求体：`{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | 公开 | — | 将连接从对话中移除。会触发出勤广播 |
| POST | `/tmpSendAlert` | 公开 | — | 向某人员的连接发送通知提醒。请求体：`{ churchId, personId }` |

## 设备

基础路径：`/messaging/devices`

管理用于推送通知和内容配对的设备注册（例如电视显示屏上的 Lessons 应用）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | 注册或更新设备（移动端推送注册）。按 FCM 令牌或设备 ID 匹配 |
| POST | `/enrollAnon` | 公开 | — | 注册匿名设备并生成 4 位配对码 |
| POST | `/` | 公开 | — | 保存设备（批量） |
| GET | `/pair/:pairingCode` | JWT | — | 使用配对码配对设备。可选 `?contentType=&contentId=` 用于分配内容 |
| GET | `/status/:deviceId` | 公开 | — | 检查设备的配对状态 |
| GET | `/:churchId` | JWT | — | 加载某教会的所有设备 |
| GET | `/:churchId/person/:personId` | JWT | — | 加载某人员的所有设备 |
| GET | `/:churchId/:id` | JWT | — | 按 ID 加载设备 |
| DELETE | `/:churchId/:id` | JWT | — | 删除设备 |

### 示例：注册设备

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

## 设备内容

基础路径：`/messaging/devicecontents`

管理已配对设备的内容分配（例如电视上显示哪一课）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | 加载某设备的内容分配 |
| POST | `/` | JWT | — | 保存设备内容分配（批量） |
| DELETE | `/:id` | JWT | — | 删除设备内容分配 |

## 短信

基础路径：`/messaging/texting`

管理短信服务提供商、小组短信发送以及发送状态跟踪。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | 加载教会的短信服务提供商（凭据已隐藏） |
| GET | `/status` | JWT | — | `{ enabled }`，表示教会是否已启用短信服务提供商。任何已登录的教会用户均可访问；用于仅在可以发送短信时显示**短信**选项 |
| GET | `/inboundUrl` | JWT | `texting.send` 或 `settings.edit` | `{ url }`，即教会的入站（STOP）Webhook 地址，用于粘贴到服务提供商后台 |
| POST | `/inbound/:churchId/:token` | 公开 | — | 服务提供商的入站短信 Webhook。`token` 为教会 ID 的 HMAC 值。若回复内容恰好是停止关键词（`STOP`、`STOPALL`、`UNSUBSCRIBE`、`CANCEL`、`END`、`QUIT`、`OPTOUT`、`REVOKE`），则将所有匹配的人员标记为 `optedOut`，并关闭其 `allowSms`。返回 `{ optedOut: <count> }`；其他回复返回 `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | 预览小组短信的接收人（可接收、已退订、无电话号码的人数） |
| GET | `/sent` | JWT | — | 加载教会所有已发送的短信记录 |
| GET | `/sent/:id/details` | JWT | — | 加载已发送短信及每位接收人的投递日志 |
| POST | `/providers` | JWT | — | 保存短信服务提供商（批量）。对 API 凭据进行加密 |
| POST | `/send` | JWT | — | 向某小组所有符合条件的成员发送短信。请求体：`{ groupId, message }`。合并字段（`{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{churchName}}`）会针对每位接收人分别解析 |
| POST | `/sendPerson` | JWT | — | 向单个人员发送短信。请求体：`{ personId, phoneNumber, message }`。合并字段会被解析，记录的是解析后的文本 |
| DELETE | `/providers/:id` | JWT | — | 删除短信服务提供商 |

### 示例：发送小组短信

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

管理可重复使用的电子邮件模板，并向小组发送模板化邮件。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载教会的所有电子邮件模板 |
| GET | `/:id` | JWT | — | 按 ID 加载单个电子邮件模板 |
| GET | `/sendStatus` | JWT | `groupMembers.edit` 或 `tasks.admin` | 教会的小组邮件状态：`{ approved, paused, remaining, requested }`。B1Admin 的发送邮件对话框和工作流中的**发送邮件**操作会使用它，在邮件无法发出时发出警告 |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | 请求支持团队批准教会使用小组邮件（每个教会每周最多一次） |
| GET | `/preview/:groupId` | JWT | — | 预览小组的邮件投递情况（符合条件的接收人数，以及没有电子邮件的成员） |
| POST | `/` | JWT | — | 创建或更新电子邮件模板（批量） |
| POST | `/send` | JWT | — | 向某小组的所有成员发送模板化邮件。请求体：`{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | 删除电子邮件模板 |

### 示例：向小组发送邮件

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

## 封禁 IP

基础路径：`/messaging/blockedips`

（旧版）直播聊天的 IP 封禁功能。B1App 客户端不再调用 `POST /`，因为 IP 封禁功能已在统一投递迁移中移除。保存直播服务时，`StreamingServiceController` 仍会通过服务器对服务器的方式调用 `/clear` 路由。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | （旧版）保存被封禁的 IP（批量）。目前没有活跃的客户端 |
| POST | `/clear` | JWT | — | 清除特定服务的所有被封禁 IP。请求体：`[{ serviceId, churchId }]` |

## 投递日志

基础路径：`/messaging/deliverylogs`

跟踪已发送消息（短信、推送通知、电子邮件）的投递状态。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | 按内容类型和 ID 加载投递日志 |
| GET | `/person/:personId` | JWT | — | 加载某人员的投递日志。可选 `?startDate=&endDate=` 进行筛选 |
| GET | `/recent` | JWT | — | 加载教会最近的投递日志。可选 `?limit=`（默认 100） |
| GET | `/:id` | JWT | — | 按 ID 加载投递日志 |

## 相关页面

- [实时架构](../../realtime.md) -- WebSocket 协议、房间订阅和统一投递框架
- [网页推送通知](../../web-push.md) -- 浏览器推送注册与投递
- [成员接口端点](./membership.md) -- 人员、小组、角色和核心身份
- [出勤接口端点](./attendance.md) -- 服务和到访记录
- [认证与权限](./authentication.md) -- 登录流程、JWT、OAuth、权限模型
- [模块结构](../module-structure.md) -- 代码组织模式
