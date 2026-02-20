---
title: "消息端点"
---

# 消息端点

<div class="article-intro">

消息模块管理实时会话、聊天消息、推送通知、短信/邮件投递、WebSocket 连接、私信、设备注册和短信提供商。它提供了所有 ChurchApps 应用中用于直播聊天和异步通知的通信层。

</div>

**基础路径：** `/messaging`

## 会话

基础路径：`/messaging/conversations`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | 按逗号分隔的 ID 加载会话，包含首条/末条消息 |
| GET | `/messages/:contentType/:contentId` | JWT | — | 加载内容的会话及分页消息（`?page=&limit=`） |
| GET | `/posts` | JWT | — | 获取当前用户群组的帖子类型会话 |
| GET | `/posts/group/:groupId` | JWT | — | 获取特定群组的帖子类型会话 |
| GET | `/current/:churchId/:contentType/:contentId` | 公开 | — | 获取或创建内容的当前会话（自动解密 contentId） |
| GET | `/:churchId/:contentType/:contentId` | 公开 | — | 按内容类型和 ID 加载会话 |
| GET | `/:churchId/:id` | 公开 | — | 按 ID 加载单个会话 |
| POST | `/` | JWT | — | 创建或更新会话（批量） |
| POST | `/start` | JWT | — | 启动一个新会话并发送初始评论消息 |
| DELETE | `/:churchId/:id` | JWT | — | 删除会话 |

### 示例：启动会话

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
| GET | `/conversation/:conversationId` | JWT | — | 加载某会话的所有消息 |
| GET | `/catchup/:churchId/:conversationId` | 公开 | — | 加载某会话的所有消息（直播聊天公开追赶） |
| GET | `/:churchId/:id` | 公开 | — | 按 ID 加载单条消息 |
| POST | `/` | JWT | — | 保存消息（批量）。发送实时更新并触发通知 |
| POST | `/send` | 公开 | — | 发送消息（批量，公开）。通过 WebSocket 发送实时更新并触发通知 |
| POST | `/setCallout` | JWT | — | 向会话实时广播一条醒目消息 |
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

## 私信

基础路径：`/messaging/privatemessages`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载当前用户的所有私信（包含每个会话的最后一条消息，标记全部为已读） |
| GET | `/existing/:personId` | JWT | — | 查找与特定人员的现有私聊会话 |
| GET | `/:id` | JWT | — | 按 ID 加载私信（如果发给当前用户则清除通知） |
| POST | `/` | JWT | — | 发送私信（批量）。向收件人触发推送通知 |

## 通知

基础路径：`/messaging/notifications`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | 获取当前用户的未读通知数量 |
| GET | `/my` | JWT | — | 加载当前用户的所有通知（标记全部为已读） |
| GET | `/tmpEmail` | 公开 | — | 触发每日邮件通知摘要（调试/定时任务端点） |
| GET | `/:churchId/person/:personId` | JWT | — | 加载特定人员的通知 |
| GET | `/:churchId/:id` | JWT | — | 按 ID 加载通知 |
| POST | `/` | JWT | — | 创建或更新通知（批量） |
| POST | `/create` | JWT | — | 为多人创建通知。请求体：`{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | 将某人的所有通知标记为已读 |
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

## 通知偏好

基础路径：`/messaging/notificationpreferences`

继承标准 CRUD。基类提供 POST `/`（创建或更新，无需权限）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | 创建或更新通知偏好（来自 CRUD 基类） |
| GET | `/my` | JWT | — | 加载当前用户的通知偏好（如不存在则自动创建默认值） |

## 连接

基础路径：`/messaging/connections`

管理直播聊天的 WebSocket/实时连接。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | 公开 | — | 加载某会话的所有连接 |
| POST | `/` | 公开 | — | 注册连接（批量）。自动为匿名用户编号，并发送出席/封锁 IP 更新 |
| POST | `/setName` | 公开 | — | 通过 socket ID 更新连接的显示名称。请求体：`{ socketId, name }` |
| POST | `/tmpSendAlert` | 公开 | — | 向某人的连接发送通知提醒。请求体：`{ churchId, personId }` |

## 设备

基础路径：`/messaging/devices`

管理推送通知和内容配对（如课程应用在电视显示器上）的设备注册。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | 注册或更新设备（移动推送注册）。按 FCM 令牌或设备 ID 匹配 |
| POST | `/enrollAnon` | 公开 | — | 注册匿名设备并生成 4 位配对码 |
| POST | `/` | 公开 | — | 保存设备（批量） |
| GET | `/pair/:pairingCode` | JWT | — | 使用配对码配对设备。可选 `?contentType=&contentId=` 分配内容 |
| GET | `/status/:deviceId` | 公开 | — | 检查设备的配对状态 |
| GET | `/:churchId` | JWT | — | 加载教会的所有设备 |
| GET | `/:churchId/person/:personId` | JWT | — | 加载某人的所有设备 |
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

管理配对设备的内容分配（如电视上显示哪个课程）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | 加载设备的内容分配 |
| POST | `/` | JWT | — | 保存设备内容分配（批量） |
| DELETE | `/:id` | JWT | — | 删除设备内容分配 |

## 短信

基础路径：`/messaging/texting`

管理短信提供商、群组短信发送和投递跟踪。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | 加载教会的短信提供商（凭据已脱敏） |
| GET | `/preview/:groupId` | JWT | — | 预览群组短信的接收者（合格、已退出、无电话号码的计数） |
| GET | `/sent` | JWT | — | 加载教会所有已发送的短信记录 |
| GET | `/sent/:id/details` | JWT | — | 加载已发送短信及每个接收者的投递日志 |
| POST | `/providers` | JWT | — | 保存短信提供商（批量）。加密 API 凭据 |
| POST | `/send` | JWT | — | 向群组所有合格成员发送短信。请求体：`{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | 向单个人发送短信。请求体：`{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | 删除短信提供商 |

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

## 封锁 IP

基础路径：`/messaging/blockedips`

管理直播聊天会话的 IP 封锁。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | 保存封锁的 IP（批量）。向会话广播更新后的封锁列表 |
| POST | `/clear` | JWT | — | 清除特定服务的所有封锁 IP。请求体：`[{ serviceId, churchId }]` |

## 投递日志

基础路径：`/messaging/deliverylogs`

跟踪已发送消息的投递状态（短信、推送通知、邮件）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | 按内容类型和 ID 加载投递日志 |
| GET | `/person/:personId` | JWT | — | 加载某人的投递日志。可选 `?startDate=&endDate=` 过滤器 |
| GET | `/recent` | JWT | — | 加载教会的最近投递日志。可选 `?limit=`（默认 100） |
| GET | `/:id` | JWT | — | 按 ID 加载投递日志 |

## 相关页面

- [成员管理端点](./membership) -- 人员、群组、角色和核心身份
- [出席端点](./attendance) -- 礼拜和访问跟踪
- [认证与权限](./authentication) -- 登录流程、JWT、OAuth、权限模型
- [模块结构](../module-structure) -- 代码组织模式
