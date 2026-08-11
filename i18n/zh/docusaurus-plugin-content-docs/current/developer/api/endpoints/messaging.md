---
title: "消息传递端点"
---

# 消息传递端点

<div class="article-intro">

消息传递模块管理实时对话、聊天消息、推送通知、SMS/电子邮件传递、WebSocket 连接、私人消息、设备注册和短信提供商。它提供在所有 ChurchApps 应用中用于直播聊天和异步通知的通信层。

</div>

**基本路径：** `/messaging`

## 对话

基本路径：`/messaging/conversations`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | 使用第一条/最后一条消息加载逗号分隔 ID 的对话 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 使用分页消息加载内容对话（`?page=&limit=`） |
| GET | `/posts` | JWT | — | 为当前用户的小组获取帖子类型对话 |
| GET | `/posts/group/:groupId` | JWT | — | 获取特定小组的帖子类型对话 |
| GET | `/current/:churchId/:contentType/:contentId` | 公开 | — | 为内容获取或创建当前对话（自动解密 contentId） |
| GET | `/:churchId/:contentType/:contentId` | 公开 | — | 按内容类型和 ID 加载对话 |
| GET | `/:churchId/:id` | 公开 | — | 按 ID 加载单个对话 |
| POST | `/` | JWT | — | 创建或更新对话（批量） |
| POST | `/start` | JWT | — | 使用初始评论消息开始新对话 |
| DELETE | `/:churchId/:id` | JWT | — | 删除对话 |

### 人员笔记访问控制

具有 `contentType: "person"`（人员记录上的笔记选项卡）或 `contentType: "personConfidential"`（机密笔记部分）的对话在每个读写路径上受限，包括上面的公开路由，对这些内容类型返回 `401`。`person` 需要 MembershipApi **人员 / 编辑**权限；`personConfidential` 需要**人员 / 查看机密笔记**。对于范围化的 API 密钥，`people:write` 携带两个动作（密钥的用户必须仍然持有底层角色权限）。

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

基本路径：`/messaging/messages`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | 加载对话的所有消息 |
| GET | `/catchup/:churchId/:conversationId` | 公开 | — | 加载对话的所有消息（直播聊天的公开追赶） |
| GET | `/:churchId/:id` | 公开 | — | 按 ID 加载单个消息 |
| POST | `/` | JWT | — | 保存消息（批量）。发送实时更新并触发通知 |
| POST | `/send` | 公开 | — | 发送消息（批量，公开）。通过 WebSocket 发送实时更新并触发通知 |
| POST | `/setCallout` | JWT | — | （旧版）实时广播标注消息。无活跃客户端；直播聊天不再呈现标注 |
| DELETE | `/:churchId/:id` | JWT | — | 删除消息并实时广播删除 |

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

基本路径：`/messaging/privatemessages`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 为当前用户加载所有私人消息（包括每个对话的最后一条消息，标记所有为已读） |
| GET | `/existing/:personId` | JWT | — | 查找与特定人员的现有私人对话 |
| GET | `/:id` | JWT | — | 按 ID 加载私人消息（如果处理当前用户，清除通知） |
| POST | `/` | JWT | — | 发送私人消息（批量）。触发对收件人的推送通知 |

## 通知

基本路径：`/messaging/notifications`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | 获取当前用户的未读通知数 |
| GET | `/my` | JWT | — | 为当前用户加载所有通知（标记所有为已读） |
| GET | `/tmpEmail` | 公开 | — | 触发每日电子邮件通知摘要（调试/cron 端点） |
| GET | `/:churchId/person/:personId` | JWT | — | 加载特定人员的通知 |
| GET | `/:churchId/:id` | JWT | — | 按 ID 加载通知 |
| POST | `/` | JWT | — | 创建或更新通知（批量） |
| POST | `/create` | JWT | — | 为多个人创建通知。正文：`{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 为人员标记所有通知为已读 |
| POST | `/sendTest` | JWT | — | 发送测试推送通知。正文：`{ personId, title }` |
| POST | `/ping` | 公开 | — | 从外部触发创建通知。正文：`{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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

## 通知偏好

基本路径：`/messaging/notificationpreferences`

扩展标准 CRUD。基类提供 POST `/`（创建或更新，无权限要求）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | 创建或更新通知偏好（来自 CRUD 基类） |
| GET | `/my` | JWT | — | 为当前用户加载通知偏好（如果不存在，自动创建默认值） |

## 连接

基本路径：`/messaging/connections`

管理聊天、小组对话、私人消息和直播的 WebSocket/实时连接。有关端到端协议，请参阅[实时架构](../../realtime)。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | 公开 | — | 加载对话的所有连接 |
| POST | `/` | 公开 | — | 注册连接（批量）。触发对话的出席广播。正文项：`{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | 公开 | — | 按 socket ID 更新连接的显示名称。正文：`{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | 公开 | — | 从对话中删除连接。触发出席广播 |
| POST | `/tmpSendAlert` | 公开 | — | 向人员的连接发送通知警报。正文：`{ churchId, personId }` |

## 设备

基本路径：`/messaging/devices`

管理推送通知和内容配对的设备注册（例如，电视上的课程应用）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | 注册或更新设备（移动推送注册）。按 FCM 令牌或设备 ID 匹配 |
| POST | `/enrollAnon` | 公开 | — | 注册匿名设备并生成 4 字符配对代码 |
| POST | `/` | 公开 | — | 保存设备（批量） |
| GET | `/pair/:pairingCode` | JWT | — | 使用其配对代码配对设备。可选 `?contentType=&contentId=` 来分配内容 |
| GET | `/status/:deviceId` | 公开 | — | 检查设备的配对状态 |
| GET | `/:churchId` | JWT | — | 加载教会的所有设备 |
| GET | `/:churchId/person/:personId` | JWT | — | 加载人员的所有设备 |
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

基本路径：`/messaging/devicecontents`

管理配对设备的内容分配（例如，电视上显示哪个课程）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | 加载设备的内容分配 |
| POST | `/` | JWT | — | 保存设备内容分配（批量） |
| DELETE | `/:id` | JWT | — | 删除设备内容分配 |

## 短信

基本路径：`/messaging/texting`

管理短信提供商、小组文本消息和传递跟踪。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | 加载教会的短信提供商（凭据被掩盖） |
| GET | `/preview/:groupId` | JWT | — | 预览小组文本的收件人（符合条件、退出、无电话计数） |
| GET | `/sent` | JWT | — | 加载教会的所有已发送文本消息记录 |
| GET | `/sent/:id/details` | JWT | — | 加载发送的文本及每个收件人的传递日志 |
| POST | `/providers` | JWT | — | 保存短信提供商（批量）。加密 API 凭据 |
| POST | `/send` | JWT | — | 发送短信至小组的所有符合条件成员。正文：`{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | 发送短信至单个人。正文：`{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | 删除短信提供商 |

### 示例：发送小组文本

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

基本路径：`/messaging/emailTemplates`

管理可重用的电子邮件模板和向小组发送模板电子邮件。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载教会的所有电子邮件模板 |
| GET | `/:id` | JWT | — | 按 ID 加载单个电子邮件模板 |
| GET | `/preview/:groupId` | JWT | — | 预览小组的电子邮件传递（符合条件的收件人数、没有电子邮件的成员） |
| POST | `/` | JWT | — | 创建或更新电子邮件模板（批量） |
| POST | `/send` | JWT | — | 向小组的所有成员发送模板电子邮件。正文：`{ groupId, subject, htmlContent }` |
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

## 被阻止的 IP

基本路径：`/messaging/blockedips`

（旧版）直播聊天的 IP 阻止。B1App 客户端不再调用 `POST /` -- IP 阻止在统一交付迁移中被删除。`/clear` 路由仍然由 `StreamingServiceController` 在保存直播服务时以服务器到服务器的方式调用。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | （旧版）保存被阻止的 IP（批量）。无活跃客户端 |
| POST | `/clear` | JWT | — | 清除特定服务的所有被阻止的 IP。正文：`[{ serviceId, churchId }]` |

## 传递日志

基本路径：`/messaging/deliverylogs`

跟踪已发送消息的传递状态（短信、推送通知、电子邮件）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | 按内容类型和 ID 加载传递日志 |
| GET | `/person/:personId` | JWT | — | 加载人员的传递日志。可选 `?startDate=&endDate=` 过滤 |
| GET | `/recent` | JWT | — | 加载教会的最近传递日志。可选 `?limit=`（默认 100） |
| GET | `/:id` | JWT | — | 按 ID 加载传递日志 |

## 相关页面

- [实时架构](../../realtime) -- WebSocket 协议、房间订阅和统一交付框架
- [网络推送通知](../../web-push) -- 浏览器推送注册和传递
- [成员端点](./membership) -- 人员、小组、角色和核心身份
- [出席端点](./attendance) -- 服务和访问跟踪
- [认证和权限](./authentication) -- 登录流、JWT、OAuth、权限模型
- [模块结构](../module-structure) -- 代码组织模式
