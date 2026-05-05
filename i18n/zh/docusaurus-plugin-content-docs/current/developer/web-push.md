---
title: "Web 推送通知"
---

# Web 推送通知

<div class="article-intro">

ChurchApps Web 应用通过 W3C Web Push API 提供推送通知。单个 VAPID 密钥对覆盖所有消费者(B1Admin、B1App、PWA)。

</div>

## 何时触发推送

三种情况:
1. 小组/内容通知
2. 私人消息
3. 通用通知

推送是最后手段。如果用户有活动的 WebSocket,会抑制推送。

## 服务器流程

NotificationHelper → WebPushHelper → web-push 库 → VAPID 签名的 POST → 浏览器推送服务

### 所需环境变量

- webPushPublicKey - VAPID 公钥
- webPushPrivateKey - VAPID 私钥
- webPushSubject - mailto: URI

### 生成 VAPID 密钥对

```bash
npx web-push generate-vapid-keys
```

## 存储模型

Web 推送订阅存储在 devices 表中,前缀为 "webpush:"。

## 端点

- GET /publicKey - 返回公钥
- POST /subscribe - 注册订阅
- POST /unsubscribe - 删除订阅
- DELETE /subscription/:id - 删除设备

## 客户端基元:WebPushHelper

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// 配置
WebPushHelper.configure({
  scope: "/",
  appName: "B1AppPwa"
});

// 订阅
await WebPushHelper.subscribe();
```

功能:
- 功能检查
- 7 天冷却期
- 选择退出
- 独立 PWA 检测
- 教会切换时重新注册

### Service Worker 要求

必须有 push 事件处理程序:

```javascript
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icons/icon-192.png"
  }));
});
```

## 操作说明

- TTL: 24 小时
- gone: true 结果会删除设备
- 没有重试
- 禁用的环境会短路

## 相关页面

实时架构、消息端点、AppHelper
