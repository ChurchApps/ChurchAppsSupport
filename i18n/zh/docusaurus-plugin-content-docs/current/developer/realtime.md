---
title: "实时架构"
---

# 实时架构

<div class="article-intro">

ChurchApps 使用单一的基于 WebSocket 的传递框架处理每个实时表面——小组聊天、私人消息、内容笔记、直播聊天和在线状态/出席。本页记录协议、服务器和消费者使用的客户端原语。

</div>

## 概述

```
┌────────────────────┐                ┌────────────────────────────┐
│ 浏览器 / B1Admin  │                │  MessagingApi (Lambda)     │
│ 浏览器 / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (服务器) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

协议有三个部分：

1. **每个浏览器选项卡一个持久 WebSocket**，由 `SocketHelper` 打开。
2. **连接行**（`POST /messaging/connections`）记录在 `connections` 表中——这些标记一个 `(socketId, churchId, conversationId)` 元组作为房间的订阅者。
3. **服务器端扇出**由 `DeliveryHelper.sendConversationMessages()`——当消息被保存时（`POST /messaging/messages/send`），服务器读取匹配的连接行并向每个打开的套接字推送类型化有效负载。

没有 Socket.IO、没有长轮询回退，也没有单独的微服务。WebSocket 在与 REST API 相同的进程中运行（AWS 中 HTTP 为 `web` Lambda，WebSocket 为 `socket` Lambda；本地和在 Railway 上是一个组合进程）。

## 端口和传输

| 环境 | HTTP | WebSocket |
|-------------|------|-----------|
| 本地开发 | `8084` | `ws://localhost:8087`（单独的 `WebSocketServer`） |
| Railway / 单端口主机 | 共享 | 共享 HTTP 服务器（`SocketHelper.attachToServer()`） |
| AWS Lambda | API Gateway HTTP | API Gateway WebSocket（`$connect` / `$disconnect` / `$default` 路由） |

传输选择器是 `deliveryProvider` 配置：

- `local` → 原始 `ws` 库；客户端连接到来自 `CommonEnvironmentHelper` 的 `MessagingApiSocket`。
- `aws` → API Gateway WebSocket；服务器通过 `@aws-sdk/client-apigatewaymanagementapi` 向活跃连接发送有效负载。

客户端永远不必知道正在使用哪一个——无论哪种方式，它都使用相同的 JSON 协议。

## 有线协议

每个帧都是 `PayloadInterface` 形式的 JSON：

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // "房间" —— 通常是 UUID，有时是 "alerts" 或 "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // 服务器 → 客户端，连接后，携带 socketId 用于房间加入
  | "message"             // 服务器 → 客户端，新消息
  | "deleteMessage"       // 服务器 → 客户端，消息已删除
  | "privateMessage"      // 服务器 → 客户端，当直接消息升级时，向收件人的 "alerts" 房间发送徽章计数 ping；消息正文本身通过 "message" 操作到达打开的对话
  | "reaction"            // 服务器 → 客户端，消息上的表情符号反应切换；数据是 { messageId, conversationId, personId, emoji, added }（added=false 表示已删除）。通过 POST /messaging/messages/:messageId/reactions 向对话房间广播
  | "conversationActivity"// 服务器 → 客户端，内容室订阅者的辅助 "发生了什么" 信号
  | "attendance"          // 服务器 → 客户端，查看者列表 / 在线状态快照
  | "notification"        // 服务器 → 客户端，通用通知（计数等）
  | "reconnect"           // 客户端内部，在新 socketId 握手完成后由 SocketHelper 在本地调度，遵循断开后——要么是意外关闭后的指数退避重新连接，要么是由恢复探针触发的立即重新连接（选项卡焦点/可见性/在线）；服务器永远不会发送
  | "alert" | "callout";  // 过时，请参阅连接端点参考
```

### 握手

1. 客户端打开套接字并发送文字字符串 `"getId"`。
2. 服务器回复 `{ action: "socketId", data: "<id>" }`。
3. 客户端存储 `socketId` 并将其用作每个房间订阅的第三个坐标。

### 加入房间

"房间"只是一个 `(churchId, conversationId)` 元组。要订阅，客户端发送一个 `Connection` 行：

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // 可选；匿名直播查看者为 null
    "displayName": "Anonymous4823"
  }
]
```

发送还会在对话上触发 `attendance` 广播，以便现有订阅者了解新查看者已加入。

### 发送消息

`POST /messaging/messages/send`（允许匿名）或 `POST /messaging/messages/`（需要认证）：

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

服务器保存消息，然后 `DeliveryHelper.sendConversationMessages()` 查找该 `conversationId` 的每个连接行并向每个套接字发送一个 `{ action: "message", data: <message> }` 帧。

对于内容绑定的对话（例如，附加到人员的笔记），第二个具有 `action: "conversationActivity"` 的广播触发在合成的 `"content-{type}-{id}"` 房间上，以便列表视图消费者知道刷新而不必保持底层对话打开。

### 离开房间

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

清除连接行并触发最后的出席广播。

## 服务器端组件

| 文件 | 角色 |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | 拥有 `WebSocketServer`。在连接时分配 `socketId`。运行 30 秒 ping/pong 心跳（`startHeartbeat`），`terminate()`s 并清理任何丢失 pong 的连接。在断开连接时清理死套接字并触发出席重新广播。公开 `getLiveSocketIds()` 和 `reapStaleConnections()`，由 30 分钟定时器作业用来删除过时 `connections` 行——本地通过检查哪些 socketId 仍在进程中活跃，AWS 作为 24 小时 TTL 备选方案，用于错过的 `$disconnect` 事件（API Gateway 将连接上限为 ~2 小时，所以这不能回收活跃的） |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` 读取房间的连接并将每个帧路由到本地套接字或 AWS API Gateway 连接。`sendAttendance(churchId, conversationId)` 构建并广播查看者快照 |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` 加入，`DELETE /:churchId/:conversationId/:socketId` 离开，`POST /setName` 更新显示名称 |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send`（匿名）和 `POST /`（已认证）保存然后扇出 |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` 是谁订阅的真实来源 |

## 客户端原语（`@churchapps/apphelper`）

所有五个原语都是 `apphelper/src/helpers/` 中的静态单例。它们互相协作，以便每个选项卡打开**一个** WebSocket，无论页面上装载了多少个组件。

### `SocketHelper`

拥有单一 WebSocket 连接。重进 `init()` 是幂等的——多个组件可以调用它而不会打开重复的套接字。公开：

- `init()` —— 打开（或重用）套接字并完成 `getId` 握手。在握手完成后解决或在 5 秒超时后一旦后台重试循环接管，它永远不会拒绝，所以调用者不需要对失败的首次连接进行特殊情况处理。
- `addHandler(action, id, fn)` / `removeHandler(id)` —— 按 `action` 注册/注销监听器。多个处理程序可以监听相同的操作。
- `setPersonChurch({ personId, churchId })` —— 用于已认证调用者；触发 `"alerts"` 房间订阅，以便推送通知到达此套接字。
- `onSocketIdReady(fn)` —— 在每个新 socketId 上触发，不仅仅是第一个——初始握手和每个后续重新连接。由 `SubscriptionManager` 用来刷新待处理加入。
- `checkConnection()` —— 由下面的恢复监听器调用；如果套接字已关闭，立即重新连接，或如果它看起来打开，发送活跃性探针。

**重新连接生命周期。** 意外关闭安排重新连接与指数退避（1 秒，以 30 秒上限翻倍）。`SocketHelper` 也监听 `window`/`document` 上的 `online`、`focus`、`pageshow` 和 `visibilitychange` 来检测恢复的选项卡：如果套接字已关闭，它立即重新连接并重置退避；如果它看起来打开，它发送 `"getId"` 活跃性探针并在 3 秒内未到达帧时强制重新连接——这捕获移动 OS 暂停应用后留下的半开套接字。在成功的重新握手上，`SocketHelper` 向该操作的每个已注册处理程序调度本地 `"reconnect"` 操作（参见 [有线协议](#有线协议)）。

### `SubscriptionManager`

引用计数的房间成员资格。多个组件订阅相同的对话只注册一个服务器端连接行。

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... 组件渲染，通过 ConversationStore.subscribe 接收套接字帧 ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

消费者免费获得的三个行为：

- **去抖离开（300 毫秒）**——在 React StrictMode 的双挂载/卸载和短重新挂载周期中生存而不丢弃服务器端订阅；`reset()` 也取消任何待处理的去抖离开。
- **重新连接重新加入**—— `SubscriptionManager` 记住用来加入每个房间的 `personId`/`displayName`，所以在 `SocketHelper` 的 `"reconnect"` 事件（和每个 `onSocketIdReady` 调用）上，它重新发送每个具有身份完整的活跃连接行。重新加入按 socketId 去重，所以相同的重新连接不会重新发送房间两次。
- **后期绑定 socketId**—— `joinRoom` 在套接字完成握手之前记录意图；实际的 `POST /connections` 在 `onSocketIdReady` 上触发。

### `ConversationStore`

按 `conversationId` 键的内存中缓存。注册 `message` / `deleteMessage` / `privateMessage` 套接字处理程序恰好一次并将入站帧应用到当前打开的任何对话。

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ 在认证时使用 /messages/conversation/:id，匿名时使用 /messages/catchup/:churchId/:id

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // 使用最新快照重新渲染
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // 可选的显式清理
```

已认证的调用者也获得**人员水合作用**—— 入站消息上的 `personId` 通过缓存的 `GET /people/ids` 查询解析为 `PersonInterface` 对象。匿名调用者跳过此。

在 `SocketHelper` 的 `"reconnect"` 事件上，`ConversationStore` 重新获取当前具有活跃 `subscribe` 监听器的每个对话，恢复套接字停机期间丢失的消息。如果其 `churchId` 永远未被记录，匿名对话跳过此追赶（追赶端点需要一个）。

### `PresenceStore`

对 `attendance` 操作镜像 `ConversationStore` 的模式。订阅者在服务器重新广播在线状态时接收 `PresenceSnapshot { conversationId, totalViewers, viewers }`。相同的快照在通知前被去重，所以重新连接风暴不会触发不必要的重新渲染。

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

已**认证**调用者的顶级启动。包装 `SocketHelper.init()`，设置人员/教会上下文（自动加入 `"alerts"` 房间），并调用 `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` 恰好一次。它也注册自己的 `"reconnect"` 处理程序，重新加载通知/PM 计数，以便徽章在断开连接后恢复。

```typescript
await NotificationService.getInstance().initialize(userContext);
```

匿名流程（直播聊天是标准示例）跳过 `NotificationService` 并直接调用原语——有关参考实现，请参阅 `B1App/src/helpers/StreamChatManager.ts`。

## 直播聊天

直播是框架的最大匿名消费者。它使用两个 `contentType` 用于房间范围化：

- `streamingLive` —— `/stream` 上的公共聊天选项卡（每个 `streamingService` 一个房间）。
- `streamingLiveHost` —— 仅对具有 `contentApi.chat.host` 权限的员工可见的私人房间。房间 id 在服务器上加密（`GET /streamingServices/:id/hostChat`），以便临时爬取不会泄露它。

`B1App/src/helpers/StreamChatManager.ts` 通过统一的原语启动两个房间——不再有直播特定的套接字代码。

## 模式和陷阱

- **不要打开您自己的 WebSocket。** `SocketHelper` 是单例有原因的。如果您需要监听自定义操作，通过 `SocketHelper.addHandler` 在现有套接字上注册处理程序。
- **不要绕过 `SubscriptionManager`。** 直接 `POST /connections` 调用工作但失去引用计数、去抖离开和重新连接重新加入。小组聊天和 PM 消费者都通过 `SubscriptionManager` 进行。
- **处理程序 id 必须按操作唯一。** `SocketHelper.addHandler(action, id, fn)` 按 `(action, id)` 键；为两个监听器重用相同的 id 替换第一个。统一的存储使用 id，如 `"ConversationStore-Message"` 和 `"PresenceStore-Attendance"` 以保持清晰的消费者 id。
- **房间 id 是不透明字符串。** 大多数是对话 UUID，但系统也支持 `"alerts"`（每人通知）、`"content-{type}-{id}`（合成活动房间）和加密的 `streamingLiveHost` id。
- **认证在 REST 边界检查，不在套接字。** 通过 `POST /connections` 加入房间允许匿名；访问控制发生在消息发送时（消息控制器决定匿名调用者可能发送什么 `messageType`）。

## 相关页面

- [通知架构](./architecture/notifications) ——此传输进入的应用内/推送/电子邮件升级漏斗
- [消息端点](./api/endpoints/messaging) ——消息、对话、连接、设备的完整 REST 表面
- [Web 推送通知](./web-push) ——浏览器推送，独立于页面内套接字传递
- [AppHelper](./shared-libraries/app-helper) ——提供客户端原语的 npm 包
- [模块结构](./api/module-structure) ——消息模块在服务器端的组织方式
