---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks 让教会向第三方工具推送实时通知——自动化平台（Zapier、Make、n8n）、CRM、会计系统或任何接受 HTTP POST 的东西。当人员、团体或家庭在 B1 中改变时，B1 向订阅该事件的每个 URL 发送签名的 JSON 负载。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 一个具有**编辑教会设置**权限的教会管理员注册和管理 webhooks
- 您的接收端点必须在**HTTPS** 上于公共地址可到达
- 有办法安全地存储签名密钥——它只显示一次

</div>

## 概述

Webhooks 是**仅出站**：B1 调用您的端点，您不调用 B1。每个 webhook 是一个按教会订阅，包括目标 URL、签名密钥和订阅事件列表。

交付使用**持久出站箱**：当订阅的事件发生时，B1 记录一条交付行，背景工作者在约一分钟内 POST 它。失败的交付使用指数退避进行重试。如果交付缓慢或您的端点短暂停机，不会丢失任何内容。

## 注册 Webhook

### 在 B1Admin 中

转到**设置 → 开发者 → Webhooks → 新 Webhook**。输入名称、负载 URL，并选择要订阅的事件。保存时，**签名密钥显示一次**——立即复制并与您的集成一起存储。不会再显示（您可以稍后轮换它，但不能检索原始值）。

### 通过 API

所有端点都在成员模块基本路径 `/membership/webhooks` 下，并需要具有 `Settings / Edit` 权限的教会管理员的 JWT，**或使用 `settings:write` 作用域的 [API 密钥](./api-keys)****。相同的路由接受两者。这就是当 Zap 或场景打开时 Zapier 和 Make 代表教会注册 webhooks 的方式。

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — 新成员",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

创建响应——**仅**创建响应——包括 `secret`：

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — 新成员",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| 方法和路径 | 用途 |
|---|---|
| `GET /membership/webhooks` | 列出教会的 webhooks（密钥省略） |
| `GET /membership/webhooks/events` | 有效事件名称的目录 |
| `GET /membership/webhooks/:id` | 加载一个 webhook |
| `POST /membership/webhooks` | 创建（无 `id`）或更新（带 `id`） |
| `POST /membership/webhooks/:id/regenerate-secret` | 轮换签名密钥；返回新值一次 |
| `DELETE /membership/webhooks/:id` | 删除 webhook |
| `GET /membership/webhooks/:id/deliveries` | webhook 最近的交付尝试 |
| `GET /membership/webhooks/deliveries/:deliveryId` | 一个交付的完整负载和响应 |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | 重新队列交付 |

## 事件目录

事件名称遵循 `{entity}.{action}` 的模式。从 `GET /membership/webhooks/events` 获取实时列表。

| 事件 | 触发时 |
|---|---|
| `person.created` | 人员被添加 |
| `person.updated` | 人员记录被更改 |
| `person.destroyed` | 人员被删除 |
| `household.created` | 家庭被添加 |
| `household.updated` | 家庭被改变 |
| `household.destroyed` | 家庭被删除 |
| `group.created` | 团体被添加 |
| `group.updated` | 团体被改变 |
| `group.destroyed` | 团体被删除 |
| `group.member.added` | 人员被添加到团体 |
| `group.member.removed` | 人员被从团体中移除 |
| `donation.created` | 礼物被记录——手动输入、在线或待定 → 完成转换 |
| `donation.updated` | 捐赠记录被编辑 |
| `attendance.recorded` | 访问被记录（手动输入或签到） |
| `session.created` | 新的出席会话被创建（手动或在第一次签到时自动） |
| `form.submission.created` | 表单被提交 |
| `event.created` | 日历事件被添加 |
| `event.updated` | 日历事件被编辑 |
| `event.destroyed` | 日历事件被删除 |

## 负载格式

每个交付是 HTTP `POST`，带有 JSON 主体和这些标题：

| 标题 | 描述 |
|---|---|
| `Content-Type` | 总是 `application/json` |
| `X-B1-Event` | 事件名称，例如 `person.created` |
| `X-B1-Delivery-Id` | 此交付尝试的唯一 id——使用它来去重 |
| `X-B1-Signature` | 原始主体的 HMAC-SHA256 签名（见下文） |
| `X-B1-Timestamp` | 发送请求时的 Unix 纪元秒 |
| `User-Agent` | `B1-Webhooks/1.0` |

主体在小信封中包装已更改的资源：

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

对于 `*.destroyed` 事件，`data` 仅包含已删除记录的 `id` 和 `churchId`。

其负载按 id 引用其他记录的事件也携带人类可读的名称，在交付时解析：组成员事件上的 `personName` 和 `groupName`、出席、捐赠和列表成员事件上的 `personName`、`session.created` 上的 `groupName`，以及 `form.submission.created` 上的 `formName`（加上提交与人员绑定时的 `personName`）。

## 连接器类型

默认交付格式是上面的 JSON 信封——`connectorType: "standard"`。对于 [Slack 和 Discord](/docs/b1-admin/integrations/slack-discord)，相同的 webhook 引擎改为发布这些服务直接接受的聊天型消息：

| `connectorType` | 发送的主体 | 用于 |
|---|---|---|
| `"standard"`（默认） | `{event, churchId, occurredAt, data}` 信封，已签名 | 您编写自己的集成，或指向 Zapier / Make / 自定义服务器 |
| `"slack"` | `{ "text": "💝 新捐赠：$50.00" }` | 您直接发布到 Slack 传入 Webhook URL |
| `"discord"` | `{ "content": "💝 新捐赠：$50.00" }` | 您直接发布到 Discord 频道 webhook URL |
| `"mailchimp"` | n/a——连接器自己调用 Mailchimp 的 API | 您想要 [受众同步](/docs/b1-admin/integrations/services/mailchimp)，无需托管 URL |

连接器类型在 webhook 编辑器中的**连接器类型**下拉菜单中设置，或通过 `POST /membership/webhooks` 主体中的 `connectorType`。对于 Slack/Discord 交付，已签名的 `X-B1-Signature` 标题仍会发送（它们无害地忽略它），所以稍后将 webhook 切换回 `standard` 不需要重新签名。

Slack 和 Discord 是纯主体重塑——引擎仍然 POST 到教会提供的 URL。`mailchimp` 是第一个改为拥有其 HTTP 交换的连接器：每个事件它对 Mailchimp 的 API 发出经过身份验证的 upsert/archive/tag 请求（`MailchimpConnector.deliver`），其凭证（`{apiKey, audienceId}`）在 `webhooks.connectorConfig` 中存储为 AES 加密，仅通过 API 写入。Mailchimp webhooks 仅接受人员、团体成员和列表成员事件；保存路由在接受前验证 Mailchimp 的密钥和受众。未映射的情况（没有电子邮件的人员、没有映射的事件）完成为成功，响应主体为 `Skipped:`，而不是浪费重试。

## 测试交付

每个 webhook 编辑器都有一个**发送测试事件**按钮——相应的 API 调用是 `POST /membership/webhooks/:id/test`。测试路由为第一个订阅的事件构建综合负载，通过真实的签名交付路径（以及通过 `formatForConnector` 用于 Slack/Discord）调度它，并返回生成的交付行，包括 `responseStatus` 和 `responseBody`。使用它在真实启用集成前确认连接和签名处理。对于 `mailchimp` webhooks，测试改为验证存储的凭证与 Mailchimp API（综合事件会将虚假订阅者写入教会的真实受众），并返回没有创建行的交付形状结果。

## 验证签名

在信任负载前始终验证 `X-B1-Signature`。签名是 `sha256=` 后跟原始请求主体的 hex HMAC-SHA256，使用您的签名密钥。在您收到的字节上计算——不要重新序列化解析的 JSON。

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

拒绝任何签名不匹配的请求。可选地，也拒绝其 `X-B1-Timestamp` 超过几分钟的请求以限制重放窗口。

## SDK 支持

对于 Node.js，`@churchapps/integration-sdk` 附带一个类型化验证器和一个 Express 中间件，为您处理原始主体捕获、签名检查和信封解析：

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// 在 JSON 解析前捕获原始主体——必需以便签名仍然验证。
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("新礼物", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK 也为非 Express 运行时（无服务器函数、Fastify 等）公开 `WebhookVerifier.verify(secret, rawBody, signatureHeader)`。查看 npm 上的包。

## 交付和重试

您的端点应该以 `2xx` 状态尽快响应——理想情况下仅在队列工作后，而不是在处理后。任何非 `2xx` 响应、连接失败或响应慢于 **10 秒**都算作失败的交付。

失败的交付使用指数退避进行重试——**16 次尝试超过大约 5 天**。间隔从 1 分钟增长，通过小时，直到最后尝试的 3 天间隔。在第 16 次失败尝试后，交付被标记为 `exhausted` 并被放弃。

交付是 **at-least-once**：交付可能多次到达（例如，如果您的端点成功但响应丢失）。使用 `X-B1-Delivery-Id` 标题进行去重——仅处理每个 id 一次，并将重复视为无操作。

### 自动禁用

如果 webhook 产生 **三个连续耗尽的交付**，B1 会自动禁用它。修复您的端点，然后在 B1Admin 中重新启用 webhook（或通过 `POST /membership/webhooks`，`"active": true`）。

## 检查和重新交付

B1Admin 中的 webhook 编辑器显示**最近交付**表——事件、状态、尝试计数、响应代码和时间戳。选择行会显示发送的完整负载和返回的响应。

使用**重新交付**重新队列任何过去的交付及其原始负载——在修复端点中的 bug 后，或在端点停机时补充事件，这会很有用。

## URL 要求

因为 webhook URL 是教会提供的，B1 执行防止服务器端请求伪造的防护。Webhook URL 被拒绝——在注册时和在每次交付前重新检查——如果它：

- 不使用 **`https`**
- 指向 `localhost`、`.local` / `.internal` 主机名，或
- 解析为 **private、loopback、link-local 或 cloud-metadata** IP 地址

您的端点必须是公开可达的 HTTPS 服务。
