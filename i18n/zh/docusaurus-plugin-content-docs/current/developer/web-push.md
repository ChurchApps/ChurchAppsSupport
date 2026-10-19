---
title: "Web 推送通知"
---

# Web 推送通知

<div class="article-intro">

ChurchApps 网页应用通过 W3C Web Push API 发送推送通知——这与服务端的 Firebase Cloud Messaging 所使用的机制相同，但通过浏览器原生的 `PushManager` 投递，而不是 FCM。单个 VAPID 密钥对即可覆盖所有使用方（B1Admin、B1App 以及未来的 PWA）。

</div>

## 推送何时触发 {#when-push-fires}

推送是 `NotificationHelper.attemptDeliveryWithEscalation()`（`Api/src/modules/messaging/helpers/NotificationHelper.ts`）单次投递流程中的一个层级：先经过应用内偏好设置检查，然后在同一次流程中尝试套接字投递和推送（各自受其自身的偏好设置检查约束），最后是电子邮件。已将该类别设为静音的接收人永远不会收到推送。套接字投递成功不再会阻止推送——现在每种通知类型的行为都与私信一直以来的行为相同，因此即使套接字投递已成功，后台运行的已安装 PWA 仍会显示操作系统级通知；重复横幅则由 Service Worker 在客户端进行去重（参见 [Service Worker 要求](#service-worker-requirement)）。定时提醒和工作人员触发的广播会直接从推送层级开始，完全跳过套接字步骤。电子邮件仍由定时器驱动，按其自己的计划对未读记录进行升级，而不是作为此流程的一部分。

最常见的、会进入推送层级的路径：

1. **内容通知** —— 对用户关注的对话的回复、提及，或通过 `NotificationHelper.createNotifications()` 路由的其他事件。
2. **私信** —— 直接消息通过相同的投递函数发送，并始终在套接字投递的同时尝试推送。
3. **定时提醒** —— 由提醒引擎展开并分发的活动、任务和服事提醒，提醒引擎会直接从推送层级启动新的实例。
4. **工作人员触发的推送** —— `POST /messaging/notifications/create`、`/ping` 和 `/group/send`，用于一次性或群组广播。

## 服务端流程

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ in-app preference gate                  ← muted recipients stop here, no push
       ├─ same pass, both attempted (neither gates the other):
       │    ├─ socket delivery via DeliveryHelper  ← skipped for reminders/broadcasts (they start at push)
       │    └─ push preference gate
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push library → VAPID-signed POST → browser push service
       └─ email preference gate → timer-driven, escalates unread rows separately
```

### 必需的环境变量

VAPID 密钥存储在 `Environment` 中，必须存在才能启用推送：

| 变量 | 说明 |
|----------|-------------|
| `webPushPublicKey` | VAPID 公钥（base64url）。通过 `GET /messaging/webpush/publicKey` 返回给客户端 |
| `webPushPrivateKey` | VAPID 私钥。用于对每个出站推送进行签名 |
| `webPushSubject` | 报告给推送服务的 `mailto:` URI。默认为 `mailto:support@churchapps.org` |

只要缺少任一密钥，`WebPushHelper.isEnabled()` 就会返回 `false`——消息模块将继续运行，但推送投递将不执行任何操作。

### 生成 VAPID 密钥对

```bash
npx web-push generate-vapid-keys
```

将输出添加到您的 `.env` 文件（本地）或 AWS SSM Parameter Store（已部署环境）中。轮换密钥会使所有现有订阅失效——客户端必须在下次加载页面时重新注册。

## 存储模型

Web Push 订阅存储在现有的 `devices` 表中，与 FCM 设备记录并存。它们通过 `fcmToken` 列上的 `webpush:` 前缀加以区分：

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

这使得单次 `loadByPersonId` 调用即可返回用户注册的所有设备，无论平台如何。`WebPushHelper.isWebPushToken(token)` 和 `decodeSubscription(token)` 负责处理前缀逻辑。

## 端点

基础路径：`/messaging/webpush`

| 方法 | 路径 | 认证 | 说明 |
|--------|------|------|-------------|
| GET | `/publicKey` | 公开 | 返回 `{ publicKey, enabled }`。客户端将 `publicKey` 传递给 `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | 为已认证用户注册（或更新）订阅。请求体：`{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | 公开 | 删除 `fcmToken` 包含给定端点的所有设备行。请求体：`{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | 按服务端 ID 删除特定设备行 |

## 客户端组件：`WebPushHelper`

`@churchapps/apphelper` 的 `WebPushHelper` 是唯一的客户端入口。宿主应用在启动时进行一次配置，并在登录后调用 `subscribe()`。

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// In your app's bootstrap (e.g., _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // service worker scope; matches sw.js registration
  appName: "B1AppPwa"        // stored on the device row, useful for filtering by surface
});

// After login (and after every userChurch change)
await WebPushHelper.subscribe();
```

使用方无需额外配置即可获得以下行为：

- **能力检查** —— 在不支持 `serviceWorker` / `PushManager` / `Notification` 的浏览器上，`isSupported()` 返回 `false`。
- **冷却时间** —— `canPromptNow()` 通过 `localStorage` 在两次提示之间强制执行 7 天的冷却时间，因此拒绝操作系统提示的用户不会在每次会话中被反复询问。
- **退出订阅** —— `setOptedOut(true)` 和 `unsubscribe()` 会阻止再次提示，并删除服务端的设备行。
- **独立 PWA 检测** —— `isStandalone()` 让宿主应用可以将 iOS 推送提示限制在“用户已将 PWA 安装到主屏幕”的情况下（iOS 只允许已安装 PWA 发送推送）。
- **切换教会时重新注册** —— `refreshEnrollment()` 会将现有的浏览器订阅针对新的 `userChurch` 重新提交，而无需再次提示用户。请在 `userChurch` 变更处理程序中调用它。

### Service Worker 要求 {#service-worker-requirement}

只有在配置的作用域中注册了 Service Worker，浏览器的 `PushManager` 才会解析订阅。ChurchApps 的 PWA 使用 [Serwist](https://serwist.dev/)（Next.js 应用）或 workbox 来生成 Service Worker。由于服务端现在始终在套接字投递的同时尝试推送（参见[推送何时触发](#when-push-fires)），因此 Service Worker 是去重的关键点：其 `push` 处理程序在已有聚焦/可见的客户端正位于该通知的深层链接目标上时，必须抑制 `showNotification`，但无论横幅是否显示，都应始终更新应用角标：

```javascript
// public/sw.js (or whatever Serwist/workbox emits)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // always runs, even if the banner is suppressed

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Same pathname; for private messages, also same conversationId.
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
    if (exact) return exact.focus(); // already on the target: focus, don't navigate

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` 和 `clientMatchesTarget` 是特定于使用方的函数——参见 `B1App/src/app/sw.ts` 中的参考实现。B1App 将 `privateMessage` 路由到 `/mobile/messages/:personId`，B1Admin 则将 `notification` 路由到其提醒面板，依此类推。

## 运维说明

- **`gone: true` 结果** —— `WebPushHelper.sendBulk` 为每位接收人返回 `{ token, success, gone, errorMessage }`。`gone: true` 的结果（推送服务返回 `404` 或 `410`）表示该订阅已永久失效；`NotificationHelper` 中的下游代码会删除这些设备行，使其不会再次被尝试。
- **TTL** —— 推送消息以 `TTL: 86400`（24 小时）发送。如果用户的浏览器在 24 小时内未连接到推送服务，该推送将被丢弃。
- **不重试** —— 临时性故障（超时、5xx）会被记录但不会重试。推送属于尽力而为：页面内的套接字和电子邮件通知层级负责保证通知的可靠送达。
- **已禁用的环境** —— 开发环境可以将 VAPID 密钥留空；此时 `WebPushHelper.isEnabled()` 将返回 `false`，推送将直接短路返回。对于没有自己 VAPID 身份的环境，这是预期的行为。

## 相关页面

- [通知架构](./architecture/notifications) -- 完整的应用内/推送/电子邮件升级流程以及提醒引擎
- [实时架构](./realtime) -- WebSocket 投递；推送现在与套接字投递在同一次应用内流程中一同触发，而不仅仅是在套接字投递未成功时作为备用方案
- [消息端点](./api/endpoints/messaging) -- 通知、设备以及其余的消息接口
- [AppHelper](./shared-libraries/app-helper) -- 提供 `WebPushHelper` 的 npm 包
