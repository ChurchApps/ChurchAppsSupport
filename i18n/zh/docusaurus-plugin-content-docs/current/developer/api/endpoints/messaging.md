---
title: "消息端点"
---

# 消息端点

<div class="article-intro">

消息模块管理实时对话、聊天消息、推送通知、SMS/电子邮件传递、WebSocket 连接、私人消息、设备注册和短信提供商。它提供在所有 ChurchApps 应用程序中用于实时流媒体聊天和异步通知的通信层。

</div>

**基础路径：** `/messaging`

## 对话

基础路径：`/messaging/conversations`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| GET | `/timeline/ids?ids=` | JWT | — | 通过逗号分隔的 ID 加载对话及首条/末条消息 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 加载内容的对话及分页消息（`?page=&limit=`） |
| GET | `/posts` | JWT | — | 获取当前用户小组的帖子类型对话 |
| GET | `/posts/group/:groupId` | JWT | — | 获取特定小组的帖子类型对话 |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | 获取或创建内容的当前对话（自动解密 contentId） |
| GET | `/:churchId/:contentType/:contentId` | Public | — | 按内容类型和 ID 加载对话 |
| GET | `/:churchId/:id` | Public | — | 按 ID 加载单个对话 |
| POST | `/` | JWT | — | 创建或更新对话（批量） |
| POST | `/start` | JWT | — | 启动一个新对话及初始评论消息 |
| DELETE | `/:churchId/:id` | JWT | — | 删除对话 |

### 人员笔记访问控制

`contentType: "person"`（人员记录上的笔记选项卡）或 `contentType: "personConfidential"`（机密笔记部分）的对话在每个读取和写入路径上进行门控，包括上述公开路由，对这些内容类型返回 `401`。`person` 需要 MembershipApi **People / Edit** 权限；`personConfidential` 需要 **People / View Confidential Notes**。对于作用域 API 密钥，`people:write` 承载两个操作（密钥的用户必须仍持有基础角色权限）。

### 示例：启动对话

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
|------|------|------|------|------|
| GET | `/conversation/:conversationId` | JWT | — | 加载对话的所有消息 |
| GET | `/catchup/:churchId/:conversationId` | Public | — | 加载对话的所有消息（实时聊天的公开追赶） |
| GET | `/:churchId/:id` | Public | — | 按 ID 加载单个消息 |
| POST | `/` | JWT | — | 保存消息（批量）。发送实时更新并触发通知。更新现有消息需要是其作者或持有 `content.edit`；存储的作者永远不可重新分配 |
| POST | `/send` | Public | — | 发送消息（批量、公开）。通过 WebSocket 发送实时更新并触发通知 |
| POST | `/setCallout` | JWT | — | （旧版）实时广播标注消息。无活跃客户端；实时流聊天不再呈现标注 |
| DELETE | `/:churchId/:id` | JWT | — | 删除消息并实时广播删除。请参阅[消息审核](#message-moderation) |

### 消息审核

允许删除消息的条件包括：

- 消息的作者；
- 拥有 `content.edit`（教会任何地方）的员工；
- **小组领导者**，对于 `contentType` 为 `group` 或 `groupAnnouncement` 且 `contentId` 是他们领导的小组的对话（JWT 上的 `leaderGroupIds`）。

人员笔记对话（`person` / `personConfidential`）永远不由领导者审核 -- 它们使用笔记权限（`people.edit`、`people.viewConfidentialNotes`）代替。

领导者只获得删除权，不是编辑权：重写另一个成员的消息仅限于作者和 `content.edit` 员工。

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

## 私人消息

基础路径：`/messaging/privatemessages`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| GET | `/` | JWT | — | 加载当前用户的所有私人消息（包括每个对话的最后消息，标记所有为已读） |
| GET | `/existing/:personId` | JWT | — | 查找与特定人员的现有私人对话 |
| GET | `/:id` | JWT | — | 按 ID 加载私人消息（如果解决给当前用户则清除通知） |
| POST | `/` | JWT | — | 发送私人消息（批量）。触发对收件人的推送通知 |

## 通知

基础路径：`/messaging/notifications`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| GET | `/unreadCount` | JWT | — | 获取当前用户的未读通知计数 |
| GET | `/my` | JWT | — | 加载当前用户的所有通知（标记所有为已读） |
| GET | `/tmpEmail` | Public | — | 触发每日电子邮件通知摘要（调试/cron 端点） |
| GET | `/:churchId/person/:personId` | JWT | — | 加载特定人员的通知 |
| GET | `/:churchId/:id` | JWT | — | 按 ID 加载通知 |
| POST | `/` | JWT | — | 创建或更新通知（批量） |
| POST | `/create` | JWT | — | 为多个人创建通知。正文：`{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 标记一个人的所有通知为已读 |
| POST | `/sendTest` | JWT | — | 发送测试推送通知。正文：`{ personId, title }` |
| POST | `/ping` | Public | — | 从外部触发器创建通知。正文：`{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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

扩展标准 CRUD。基类提供 POST `/`（创建或更新，不需要权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| POST | `/` | JWT | — | 创建或更新通知偏好设置（来自 CRUD 基类） |
| GET | `/my` | JWT | — | 加载当前用户的通知偏好设置（如果不存在则自动创建默认值） |

## 连接

基础路径：`/messaging/connections`

为聊天、小组对话、私人消息和直播管理 WebSocket/实时连接。请参阅[实时架构](../../realtime)了解端到端协议。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| GET | `/:churchId/:conversationId` | Public | — | 加载对话的所有连接 |
| POST | `/` | Public | — | 注册连接（批量）。触发对话的参与广播。正文项：`{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | 按套接字 ID 更新连接的显示名称。正文：`{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | 从对话中删除连接。触发参与广播 |
| POST | `/tmpSendAlert` | Public | — | 向一个人的连接发送通知警报。正文：`{ churchId, personId }` |

## 设备

基础路径：`/messaging/devices`

为推送通知和内容配对（例如，电视显示器上的课程应用程序）管理设备注册。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| POST | `/enroll` | JWT | — | 注册或更新设备（移动推送注册）。按 FCM 令牌或设备 ID 匹配 |
| POST | `/enrollAnon` | Public | — | 注册匿名设备并生成 4 字符配对代码 |
| POST | `/` | Public | — | 保存设备（批量） |
| GET | `/pair/:pairingCode` | JWT | — | 使用配对代码配对设备。可选 `?contentType=&contentId=` 以分配内容 |
| GET | `/status/:deviceId` | Public | — | 检查设备的配对状态 |
| GET | `/:churchId` | JWT | — | 加载教会的所有设备 |
| GET | `/:churchId/person/:personId` | JWT | — | 加载一个人的所有设备 |
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

管理配对设备的内容分配（例如，电视上显示哪个课程）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| GET | `/deviceId/:deviceId` | JWT | — | 加载设备的内容分配 |
| POST | `/` | JWT | — | 保存设备内容分配（批量） |
| DELETE | `/:id` | JWT | — | 删除设备内容分配 |

## 短信

基础路径：`/messaging/texting`

管理 SMS 短信提供商、小组短信和传递跟踪。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| GET | `/providers` | JWT | — | 加载教会的短信提供商（凭据被屏蔽） |
| GET | `/preview/:groupId` | JWT | — | 预览小组短信的接收者（符合条件、已退出、无电话计数） |
| GET | `/sent` | JWT | — | 加载教会的所有已发送短信记录 |
| GET | `/sent/:id/details` | JWT | — | 加载带有每个接收者传递日志的已发送短信 |
| POST | `/providers` | JWT | — | 保存短信提供商（批量）。加密 API 凭据 |
| POST | `/send` | JWT | — | 向小组的所有符合条件成员发送 SMS。正文：`{ groupId, message }`。合并字段（`{{firstName}}`、`{{lastName}}`、`{{displayName}}`、`{{churchName}}`）按接收者解决 |
| POST | `/sendPerson` | JWT | — | 向单个人发送 SMS。正文：`{ personId, phoneNumber, message }`。合并字段被解决，解决的文本是记录的内容 |
| DELETE | `/providers/:id` | JWT | — | 删除短信提供商 |

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

管理可重用电子邮件模板和向小组发送模板化电子邮件。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| GET | `/` | JWT | — | 加载教会的所有电子邮件模板 |
| GET | `/:id` | JWT | — | 按 ID 加载单个电子邮件模板 |
| GET | `/preview/:groupId` | JWT | — | 预览小组的电子邮件传递（符合条件的接收者计数、没有电子邮件的成员） |
| POST | `/` | JWT | — | 创建或更新电子邮件模板（批量） |
| POST | `/send` | JWT | — | 向小组的所有成员发送模板化电子邮件。正文：`{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | 删除电子邮件模板 |

### 示例：向小组发送电子邮件

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

## 被屏蔽的 IP

基础路径：`/messaging/blockedips`

（旧版）用于实时流媒体聊天的 IP 屏蔽。B1App 客户端不再调用 `POST /` -- IP 屏蔽在统一传递迁移中被删除。当流媒体服务被保存时 `/clear` 路由仍由 `StreamingServiceController` 调用。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| POST | `/` | JWT | — | （旧版）保存被屏蔽的 IP（批量）。无活跃客户端 |
| POST | `/clear` | JWT | — | 清除特定服务的所有被屏蔽 IP。正文：`[{ serviceId, churchId }]` |

## 传递日志

基础路径：`/messaging/deliverylogs`

跟踪已发送消息（SMS、推送通知、电子邮件）的传递状态。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|------|------|------|------|------|
| GET | `/content/:contentType/:contentId` | JWT | — | 按内容类型和 ID 加载传递日志 |
| GET | `/person/:personId` | JWT | — | 为一个人加载传递日志。可选 `?startDate=&endDate=` 过滤 |
| GET | `/recent` | JWT | — | 加载教会的最近传递日志。可选 `?limit=`（默认 100） |
| GET | `/:id` | JWT | — | 按 ID 加载传递日志 |

## 相关页面

- [实时架构](../../realtime) -- WebSocket 协议、房间订阅和统一传递框架
- [Web 推送通知](../../web-push) -- 浏览器推送注册和传递
- [成员资格端点](./membership) -- 人员、小组、角色和核心身份
- [出勤端点](./attendance) -- 服务和访问跟踪
- [认证与权限](./authentication) -- 登录流程、JWT、OAuth、权限模型
- [模块结构](../module-structure) -- 代码组织模式
