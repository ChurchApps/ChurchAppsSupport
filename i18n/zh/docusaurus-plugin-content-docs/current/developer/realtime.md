---
title: "实时架构"
---

# 实时架构

<div class="article-intro">

ChurchApps 对所有实时功能使用单一的基于 WebSocket 的传递框架 -- 小组聊天、私人消息、内容笔记、直播聊天和在线状态。

</div>

## 概述

协议由三部分组成:
1. 每个浏览器选项卡一个 WebSocket(由 SocketHelper 打开)
2. 连接行记录订阅(socketId, churchId, conversationId)
3. 服务器端扇出(DeliveryHelper)

## 端口和传输

- 本地开发:HTTP 8084、WebSocket ws://localhost:8087
- Railway:共享 HTTP 服务器
- AWS Lambda:API Gateway WebSocket

## 有线协议

每个帧都是 PayloadInterface JSON:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // "房间"
  action: PayloadAction;    // socketId、message、deleteMessage、privateMessage 等
  data: unknown;
}
```

### 握手
1. 客户端发送 "getId"
2. 服务器返回 socketId
3. 客户端存储用于订阅

### 加入房间
POST /messaging/connections 包含 churchId、conversationId、socketId、displayName

### 发送消息
POST /messaging/messages/send 保存并扇出到所有订阅者

### 离开房间
DELETE /messaging/connections/:churchId/:conversationId/:socketId

## 服务器端组件

- SocketHelper.ts - 拥有 WebSocketServer
- DeliveryHelper.ts - 扇出消息
- ConnectionController.ts - 管理连接
- MessageController.ts - 保存和传递消息

## 客户端基元(@churchapps/apphelper)

### SocketHelper
管理单个 WebSocket 连接。方法:init()、addHandler()、setPersonChurch()

### SubscriptionManager
引用计数的房间成员资格。自动处理重新连接、去抖离开。

### ConversationStore
按 conversationId 缓存消息。自动应用入站帧。

### PresenceStore
管理 attendance 事件。提供查看者快照。

### NotificationService
已验证用户的顶级启动。初始化所有帮助程序。

## 直播聊天

使用两个内容类型:
- streamingLive - 公共聊天
- streamingLiveHost - 私人员工聊天

## 模式和陷阱

- 不要打开自己的 WebSocket
- 不要绕过 SubscriptionManager
- 处理程序 ID 必须唯一
- 房间 ID 是不透明字符串
- 身份验证在 REST 边界检查

## 相关页面

消息端点、Web 推送通知、AppHelper、模块结构
