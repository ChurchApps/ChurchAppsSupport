---
title: "Web 推送通知"
---

# Web 推送通知

<div class="article-intro">

ChurchApps 网页应用通过 W3C Web Push API 投递推送通知——服务器端的机制与 Firebase Cloud Messaging 所用的相同，但投递路径是通过浏览器原生的 `PushManager`，而非 FCM。MessagingApi 上的单个 VAPID 密钥对可供所有使用方（B1Admin、B1App，以及未来的 PWA）共用。

</div>

## 推送何时触发 {#when-push-fires}

推送是 `NotificationHelper.attemptDeliveryWithEscalation()`（`Api/src/modules/messaging/helpers/NotificationHelper.ts`）中单次投递流程的一个层级：先经过应用内偏好设置闸门，然后在同一轮中尝试套接字投递和推送（各自都有独立的偏好设置闸门），最后是电子邮件。已将某类通知设为静音的接收者永远不会收到推送。现在，套接字投递成功也不再阻止推送——所有通知类型的行为都与私信一直以来的方式保持一致，因此即使套接字投递已经完成，后台运行的已安装 PWA 仍会显示操作系统级别的通知；重复的横幅则改由服务工作线程在客户端进行抑制（参见[服务工作线程要求](#service-worker-requirement)）。定时提醒和工作人员发起的广播会直接从推送层级开始，完全跳过套接字步骤。电子邮件仍由定时器驱动，按自身的计划对未读记录进行升级，而不属于此轮流程的一部分。

最常见的推送触发路径包括：

1. **内容通知** —— 对某人所关注的会话的回复、提及，或其他经由 `NotificationHelper.createNotifications()` 路由的事件。
2. **私信** —— 直接消息经过同一投递函数，并始终在套接字投递的同时尝试推送。
3. **定时提醒** —— 活动、任务和服事提醒由提醒引擎展开并分发，新的发生实例直接从推送层级开始。
4. **工作人员发起的推送** —— `POST /messaging/notifications/create`、`/ping` 和 `/group/send`，用于一次性或小组广播。

## 服务端流程

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ 应用内偏好设置闸门                       ← 已静音的接收者在此停止，不发送推送
       ├─ 同一轮，两者都会尝试（互不闸控）：
       │    ├─ 通过 DeliveryHelper 进行套接字投递   ← 提醒/广播跳过此步（它们从推送层级开始）
       │    └─ 推送偏好设置闸门
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push 库 → 经 VAPID 签名的 POST → 浏览器推送服务
       └─ 电子邮件偏好设置闸门 → 由定时器驱动，单独对未读记录进行升级
```

### 必需的环境变量

VAPID 密钥存储在 `Environment` 中，必须配置后才能启用推送：

| 环境变量 | `Environment` 设置项 | 说明 |
|----------|----------|----------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID 公钥（base64url）。通过 `GET /messaging/webpush/publicKey` 返回给客户端 |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID 私钥。用于对每一条出站推送进行签名 |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | 报告给推送服务的 `mailto:` URI。默认为 `mailto:support@churchapps.org` |

只要缺少任一密钥，`WebPushHelper.isEnabled()` 就会返回 `false`——消息模块仍会正常运行，推送投递则会直接空操作。随后，B1App 移动网站会告知成员推送尚未开启，而不是提供设置入口。

### 生成 VAPID 密钥对

```bash
npx web-push generate-vapid-keys
```

将输出内容添加到你的 `.env`（本地）或 AWS SSM Parameter Store（已部署环境）中。轮换密钥会使所有现有订阅失效——客户端必须在下次加载页面时重新注册。

## 存储模型

Web Push 订阅与 FCM 设备记录一同保存在现有的 `devices` 表中。它们通过 `fcmToken` 列上的 `webpush:` 前缀加以区分：

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

这使得一次 `loadByPersonId` 调用即可返回某用户注册过的所有设备，无论其平台为何。`WebPushHelper.isWebPushToken(token)` 和 `decodeSubscription(token)` 负责处理前缀逻辑。

## 端点

基础路径：`/messaging/webpush`

| 方法 | 路径 | 身份验证 | 说明 |
|--------|------|------|-------------|
| GET | `/publicKey` | Public | 返回 `{ publicKey, enabled }`。客户端将 `publicKey` 传给 `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | 为已通过身份验证的用户注册（或更新）订阅。请求体：`{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Public | 删除 `fcmToken` 包含给定 endpoint 的所有设备记录。请求体：`{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | 按服务端 ID 删除特定的设备记录 |

## 客户端基础组件：`WebPushHelper`

`@churchapps/apphelper` 中的 `WebPushHelper` 是唯一的客户端入口。宿主应用在启动时配置一次，并在登录后调用 `subscribe()`。

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// 在应用的启动代码中（例如 _app.tsx、layout.tsx）
WebPushHelper.configure({
  scope: "/",                // 服务工作线程的作用域；需与 sw.js 的注册一致
  appName: "B1AppPwa"        // 存储在设备记录上，便于按使用入口进行筛选
});

// 登录之后（以及每次 userChurch 变更之后）
await WebPushHelper.subscribe();
```

使用方无需额外编写代码即可获得以下行为：

- **能力检查** —— 在不支持 `serviceWorker` / `PushManager` / `Notification` 的浏览器上，`isSupported()` 返回 `false`。
- **冷却期** —— `canPromptNow()` 通过 `localStorage` 在两次提示之间强制执行 7 天的冷却期，因此拒绝了操作系统提示的用户不会在每次会话中被反复询问。
- **退出选择** —— `setOptedOut(true)` 和 `unsubscribe()` 会阻止再次提示，并删除服务端的设备记录。
- **独立 PWA 检测** —— `isStandalone()` 让宿主可以将 iOS 推送提示限制在"用户已将 PWA 安装到主屏幕"的情况下（iOS 仅允许来自已安装 PWA 的推送）。
- **切换教会后重新注册** —— `refreshEnrollment()` 会将现有的浏览器订阅重新提交到新的 `userChurch`，且无需再次提示用户。请在 `userChurch` 变更处理器中调用它。

### 服务工作线程要求 {#service-worker-requirement}

只有在配置的作用域下注册了服务工作线程，浏览器的 `PushManager` 才能解析订阅。ChurchApps 的 PWA 使用 [Serwist](https://serwist.dev/)（Next.js 应用）或 workbox 生成服务工作线程。由于服务端现在总是在套接字投递的同时尝试推送（参见[推送何时触发](#when-push-fires)），服务工作线程就成了去重的节点：其 `push` 处理器在某个已聚焦/可见的客户端已经位于通知的深链接目标上时，必须抑制 `showNotification`，但无论横幅是否显示，都应始终更新应用角标：

```javascript
// public/sw.js（或 Serwist/workbox 生成的任何文件）
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // 始终执行，即使横幅被抑制

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // 路径相同；对于私信，还需 conversationId 相同。
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // 已经位于目标页面：聚焦即可，不进行导航

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` 和 `clientMatchesTarget` 因使用方而异——参考实现请参阅 `B1App/src/app/sw.ts`。B1App 将 `privateMessage` 路由到 `/mobile/messages/:personId`，B1Admin 则将 `notification` 路由到其提醒面板，依此类推。

## 运维说明

- **`gone: true` 的结果** —— `WebPushHelper.sendBulk` 会为每位接收者返回 `{ token, success, gone, errorMessage }`。`gone: true`（推送服务返回 `404` 或 `410`）表示该订阅已永久失效；`NotificationHelper` 中的下游代码会删除这些设备记录，使其不再被尝试。
- **TTL** —— 推送消息以 `TTL: 86400`（24 小时）发送。如果用户的浏览器在 24 小时内没有连接到推送服务，该推送将被丢弃。
- **不重试** —— 临时性失败（超时、5xx）会被记录日志，但不会重试。推送采用尽力而为的策略；持久性保障由页面内的套接字以及电子邮件通知层级负责。
- **禁用的环境** —— 开发环境可以将 VAPID 密钥留空；此时 `WebPushHelper.isEnabled()` 返回 `false`，推送会直接短路返回。对于没有自身 VAPID 身份的环境，这是预期的行为。

## 相关页面

- [通知架构](./architecture/notifications) —— 完整的应用内/推送/电子邮件升级流程，以及提醒引擎
- [实时架构](./realtime) —— WebSocket 投递；现在推送与套接字投递在同一轮中从同一应用内流程触发，而不仅仅在套接字投递未成功时作为备用
- [消息端点](./api/endpoints/messaging) —— 通知、设备以及消息模块的其余接口
- [AppHelper](./shared-libraries/app-helper) —— 提供 `WebPushHelper` 的 npm 包
