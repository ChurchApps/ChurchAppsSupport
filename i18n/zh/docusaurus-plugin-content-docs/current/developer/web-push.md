---
title: "Web 推送通知"
---

# Web 推送通知

<div class="article-intro">

ChurchApps Web 应用通过 W3C Web Push API 提供推送通知——与 Firebase Cloud Messaging 在服务器端使用的机制相同，但通过浏览器的原生 `PushManager` 而非 FCM 传递。MessagingApi 上的单个 VAPID 密钥对覆盖每个消费者（B1Admin、B1App、未来的 PWA）。

</div>

## 何时推送触发

推送是 `NotificationHelper.attemptDeliveryWithEscalation()`（`Api/src/modules/messaging/helpers/NotificationHelper.ts`）内单一传递通过的一层：应用内偏好门槛、然后套接字传递和推送在相同通过中尝试（每个都在自己的偏好门槛后）、然后电子邮件。已将类别静音的收件人永远不会到达推送。套接字传递成功不再停止推送——每种通知类型现在都表现得像私人消息一直那样做的方式，所以坐在后台的已安装 PWA 即使套接字传递已经到达，仍然会显示 OS 级别的通知；重复的横幅由服务工作者在客户端被抑制（参见 [服务工作者要求](#service-worker-requirement)）。定时提醒和员工触发的广播直接从推送层开始，完全跳过套接字步骤。电子邮件保持定时器驱动，按自己的时间表升级未读行而非作为此通过的一部分。

最常见的到达推送的路径：

1. **内容通知**——对人员关注的对话的回复、提及或通过 `NotificationHelper.createNotifications()` 路由的另一个事件。
2. **私人消息**——直接消息通过相同的传递函数，并始终与套接字传递一起尝试推送。
3. **定时提醒**——由提醒引擎扩展和调度的事件、任务和服侍提醒，直接从推送层开始新出现。
4. **员工触发的推送**—— `POST /messaging/notifications/create`、`/ping` 和 `/group/send` 用于一次性或小组广播。

## 服务器流程

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ 应用内偏好门槛                  ← 静音的收件人在此停止，无推送
       ├─ 相同通过，两个都尝试（彼此不门槛）：
       │    ├─ 通过 DeliveryHelper 的套接字传递  ← 对提醒/广播跳过（它们从推送开始）
       │    └─ 推送偏好门槛
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ web-push 库 → VAPID 签名的 POST → 浏览器推送服务
       └─ 电子邮件偏好门槛 → 定时器驱动，单独升级未读行
```

### 所需环境变量

VAPID 密钥存储在 `Environment` 中，必须存在才能启用推送：

| 变量 | 描述 |
|----------|-------------|
| `webPushPublicKey` | VAPID 公钥（base64url）。通过 `GET /messaging/webpush/publicKey` 返回给客户端 |
| `webPushPrivateKey` | VAPID 私钥。用于签署每个出站推送 |
| `webPushSubject` | 报告给推送服务的 `mailto:` URI。默认为 `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` 当任一密钥缺失时返回 `false`——消息模块继续操作，推送传递只是无操作。

### 生成 VAPID 密钥对

```bash
npx web-push generate-vapid-keys
```

将输出添加到您的 `.env`（本地）或 AWS SSM Parameter Store（已部署）。轮转密钥使每个现有订阅无效——客户端必须在下一个页面加载时重新注册。

## 存储模型

Web Push 订阅存储在现有 `devices` 表中，与 FCM 设备记录一起。它们通过 `fcmToken` 列上的 `webpush:` 前缀区分：

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

这让单个 `loadByPersonId` 调用返回用户注册的每个设备，无论平台如何。`WebPushHelper.isWebPushToken(token)` 和 `decodeSubscription(token)` 处理前缀逻辑。

## 端点

基础路径：`/messaging/webpush`

| 方法 | 路径 | 认证 | 描述 |
|--------|------|------|-------------|
| GET | `/publicKey` | 公共 | 返回 `{ publicKey, enabled }`。客户端将 `publicKey` 传给 `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | 为认证用户注册（或更新插入）订阅。正文：`{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | 公共 | 删除任何 `fcmToken` 包含给定端点的设备行。正文：`{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | 按其服务器端 id 删除特定的设备行 |

## 客户端原语：`WebPushHelper`

`@churchapps/apphelper` 的 `WebPushHelper` 是单个客户端入口点。主机在启动时配置它一次，在登录后调用 `subscribe()`。

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// 在您应用的启动中（例如 _app.tsx、layout.tsx）
WebPushHelper.configure({
  scope: "/",                // 服务工作者范围；匹配 sw.js 注册
  appName: "B1AppPwa"        // 存储在设备行上，对按表面过滤有用
});

// 登录后（以及每个 userChurch 变更后）
await WebPushHelper.subscribe();
```

消费者免费获得的行为：

- **能力检查**—— `isSupported()` 在没有 `serviceWorker` / `PushManager` / `Notification` 的浏览器上返回 `false`。
- **冷却时间**—— `canPromptNow()` 通过 `localStorage` 强制 7 天冷却时间，以便关闭 OS 提示的用户不会在每个会话中被再次询问。
- **选择退出**—— `setOptedOut(true)` 和 `unsubscribe()` 阻止重新提示并删除服务器端设备行。
- **独立 PWA 检测**—— `isStandalone()` 让主机将 iOS 推送提示关联在"用户已将 PWA 安装到其主屏幕"后（iOS 仅允许来自已安装 PWA 的推送）。
- **教会切换时重新注册**—— `refreshEnrollment()` 重新发送现有浏览器订阅针对新的 `userChurch` 而不重新提示用户。从 `userChurch` 变更处理程序调用它。

### 服务工作者要求

浏览器的 `PushManager` 仅在在配置的范围注册了服务工作者时解决订阅。ChurchApps PWA 使用 [Serwist](https://serwist.dev/)（Next.js 应用）或 workbox 进行服务工作者生成。因为服务器现在始终与套接字传递一起尝试推送（参见 [何时推送触发](#何时推送触发)），服务工作者是去重点：其 `push` 处理程序必须在已关注/可见的客户端已经在通知的深层链接目标上时抑制 `showNotification`，但无论横幅是否显示，应始终更新应用徽章：

```javascript
// public/sw.js（或 Serwist/workbox 发出的任何内容）
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // 始终运行，即使横幅被抑制

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // 相同的路径名；对于私人消息，也相同的 conversationId。
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
    if (exact) return exact.focus(); // 已在目标上：聚焦，不导航

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` / `clientMatchesTarget` 是消费者特定的——有关参考实现，请参阅 `B1App/src/app/sw.ts`。B1App 路由 `privateMessage` 到 `/mobile/messages/:personId`，B1Admin 路由 `notification` 到其警报面板，等等。

## 运营笔记

- **`gone: true` 结果**—— `WebPushHelper.sendBulk` 按收件人返回 `{ token, success, gone, errorMessage }`。`gone: true` 结果（推送服务响应 `404` 或 `410`）意味着订阅是永久无效的；`NotificationHelper` 中的下游代码删除这些设备行，以便不再尝试它们。
- **TTL**——推送消息以 `TTL: 86400`（24 小时）发送。如果用户的浏览器在 24 小时内未连接到推送服务，推送被丢弃。
- **无重试**——瞬时失败（超时、5xx）被记录但不重试。推送是尽力而为；页面内套接字和电子邮件通知层处理持久性。
- **禁用的环境**——暂存和开发环境可以将 VAPID 密钥留空；`WebPushHelper.isEnabled()` 将返回 `false` 推送将短路。这是没有自己 VAPID 身份的环境的预期行为。

## 相关页面

- [通知架构](./architecture/notifications) ——完整的应用内/推送/电子邮件升级漏斗和提醒引擎
- [实时架构](./realtime) ——WebSocket 传递；推送现在从相同的应用内漏斗在相同通过中与套接字传递一起触发，不仅作为套接字传递不到达时的回退
- [消息端点](./api/endpoints/messaging) ——通知、设备和消息表面的其余部分
- [AppHelper](./shared-libraries/app-helper) ——提供 `WebPushHelper` 的 npm 包
