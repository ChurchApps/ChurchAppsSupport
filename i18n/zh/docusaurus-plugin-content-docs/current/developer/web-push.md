---
title: "Web 推送通知"
description: "设置 VAPID 密钥、WebPushHelper 客户端和 Service Worker 处理，使 B1.church 和 B1 Admin 能够向会员投递浏览器推送通知。"
---

# Web 推送通知

<div class="article-intro">

ChurchApps 的网页应用通过 W3C Web Push API 投递推送通知——与服务器端 Firebase Cloud Messaging 所用的机制相同，但通过浏览器原生的 `PushManager` 投递，而非 FCM。MessagingApi 上的一对 VAPID 密钥即可覆盖所有使用者（B1Admin、B1App，以及未来的 PWA）。

</div>

## 推送何时触发 {#when-push-fires}

推送是 `NotificationHelper.attemptDeliveryWithEscalation()`（`Api/src/modules/messaging/helpers/NotificationHelper.ts`）中单次投递流程的一层：先经过应用内偏好门控，然后在同一轮中尝试 socket 投递和推送（两者各自经过自己的偏好门控，且互不限制），最后是邮件。对某类别设置了静音的收件人永远不会到达推送这一层。socket 投递成功不再阻止推送——现在每种通知类型的行为都与私信一直以来的行为一致，因此即使 socket 投递已经成功，在后台运行的已安装 PWA 仍会显示操作系统级通知；重复的横幅则由 Service Worker 在客户端进行抑制（参见[Service Worker 要求](#service-worker-requirement)）。已排定的提醒和教职人员发起的广播会直接从推送这一层开始，完全跳过 socket 步骤。邮件仍由定时器驱动，按自己的时间表升级未读记录，而不是作为此流程的一部分。

以下是最常见的、会到达推送层的路径：

1. **内容通知**——对用户关注的对话的回复、提及，或其他经由 `NotificationHelper.createNotifications()` 路由的事件。
2. **私信**——直接消息经过同一投递函数，并且总会在 socket 投递的同时尝试推送。
3. **已排定的提醒**——活动、任务和服事提醒由提醒引擎展开并分发，引擎会直接在推送层启动新的出现记录。
4. **教职人员发起的推送**——`POST /messaging/notifications/create`、`/ping` 和 `/group/send`，用于一次性或小组广播。
5. **已排定的教职人员推送**——`POST /messaging/scheduledNotifications` 保存一条面向所有使用应用的人（`audience: "church"`）或某个小组的推送，到期时由每分钟运行的定时器发送（参见[通知架构](./architecture/notifications.md)）。没有链接的全教会推送会打开 `/mobile/notifications`；没有链接的小组推送会打开该小组。

## 服务器流程

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

| 环境变量 | `Environment` 设置 | 说明 |
|----------|----------|----------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | VAPID 公钥（base64url）。通过 `GET /messaging/webpush/publicKey` 返回给客户端 |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | VAPID 私钥。用于对每个外发推送进行签名 |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | 向推送服务报告的 `mailto:` URI。默认为 `mailto:support@churchapps.org` |

只要缺少任一密钥，`WebPushHelper.isEnabled()` 就会返回 `false`——消息模块仍会正常运行，推送投递则直接跳过。随后，B1App 移动网站会告知会员推送功能未开启，而不是提供设置入口。

### 生成 VAPID 密钥对

```bash
npx web-push generate-vapid-keys
```

将输出添加到您的 `.env`（本地）或 AWS SSM Parameter Store（已部署环境）中。轮换密钥会使所有现有订阅失效——客户端必须在下次加载页面时重新注册。

## 存储模型

Web Push 订阅与 FCM 设备记录一起存储在现有的 `devices` 表中。它们通过 `fcmToken` 列上的 `webpush:` 前缀加以区分：

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

这样，单次 `loadByPersonId` 调用即可返回用户注册过的每台设备，无论其平台为何。`WebPushHelper.isWebPushToken(token)` 和 `decodeSubscription(token)` 负责处理前缀逻辑。

## 端点

基础路径：`/messaging/webpush`

| 方法 | 路径 | 认证 | 说明 |
|--------|------|------|-------------|
| GET | `/publicKey` | 公开 | 返回 `{ publicKey, enabled }`。客户端将 `publicKey` 传给 `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | 为已认证用户注册（或更新）一个订阅。请求体：`{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | 公开 | 删除 `fcmToken` 包含给定端点的任何设备记录。请求体：`{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | 按服务器端 ID 删除特定的设备记录 |

## 客户端原语：`WebPushHelper`

`@churchapps/apphelper` 中的 `WebPushHelper` 是唯一的客户端入口。宿主应用在启动时配置一次，并在登录后调用 `subscribe()`。

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

使用者无需额外配置即可获得的行为：

- **能力检测**——在不支持 `serviceWorker` / `PushManager` / `Notification` 的浏览器上，`isSupported()` 返回 `false`。
- **冷却期**——`canPromptNow()` 通过 `localStorage` 在两次提示之间强制 7 天的冷却期，因此关闭系统提示的用户不会在每次会话中都被再次询问。
- **退出选择**——`setOptedOut(true)` 和 `unsubscribe()` 会阻止再次提示，并删除服务器端的设备记录。
- **独立 PWA 检测**——`isStandalone()` 让宿主可以将 iOS 推送提示限制在“用户已将 PWA 安装到主屏幕”的情况下（iOS 只允许已安装的 PWA 发送推送）。
- **切换教会时重新注册**——`refreshEnrollment()` 会把现有的浏览器订阅重新提交到新的 `userChurch`，无需再次提示用户。请在 `userChurch` 变更处理程序中调用它。

### 服务工作线程要求 {#service-worker-requirement}

只有在为配置的作用域注册了 Service Worker 时，浏览器的 `PushManager` 才能解析订阅。ChurchApps 的 PWA 使用 [Serwist](https://serwist.dev/)（Next.js 应用）或 workbox 生成 Service Worker。由于服务器现在总是在 socket 投递的同时尝试推送（参见[推送何时触发](#when-push-fires)），Service Worker 就成了去重的关键点：其 `push` 处理程序必须在已聚焦或可见的客户端已位于该通知的深层链接目标上时抑制 `showNotification`，但无论是否显示横幅，都应始终更新应用角标：

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

`deepLinkFor` 和 `clientMatchesTarget` 因使用者而异——参考实现见 `B1App/src/app/sw.ts`。B1App 将 `privateMessage` 路由到 `/mobile/messages/:personId`，B1Admin 将 `notification` 路由到其提醒面板，依此类推。

## 运维注意事项

- **`gone: true` 结果**——`WebPushHelper.sendBulk` 为每位收件人返回 `{ token, success, gone, errorMessage }`。`gone: true` 结果（推送服务返回 `404` 或 `410`）表示该订阅已永久失效；`NotificationHelper` 中的下游代码会删除这些设备记录，使其不再被尝试。
- **TTL**——推送消息以 `TTL: 86400`（24 小时）发送。如果用户的浏览器在 24 小时内未连接到推送服务，该推送会被丢弃。
- **不重试**——临时性失败（超时、5xx）会被记录但不会重试。推送属于尽力而为：应用内 socket 和邮件通道负责保证送达的持久性。
- **禁用的环境**——开发环境可以将 VAPID 密钥留空；此时 `WebPushHelper.isEnabled()` 返回 `false`，推送会直接短路。这是没有自身 VAPID 身份的环境的预期行为。

## 相关页面

- [通知架构](./architecture/notifications.md)——完整的应用内/推送/邮件升级通道以及提醒引擎
- [实时架构](./realtime.md)——WebSocket 投递；推送现在与 socket 投递在同一轮的应用内通道中一同触发，而不再只是在 socket 投递未成功时作为后备
- [消息端点](./api/endpoints/messaging.md)——通知、设备以及其余消息接口
- [AppHelper](./shared-libraries/app-helper.md)——提供 `WebPushHelper` 的 npm 包
