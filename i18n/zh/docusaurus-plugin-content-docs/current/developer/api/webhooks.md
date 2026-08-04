---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhook 允许教会向第三方工具推送实时通知——自动化平台(Zapier、Make、n8n)、CRM、会计系统,或任何接受 HTTP POST 的系统。当 B1 中的人员、小组或家庭发生变化时,B1 会向每个订阅该事件的 URL 发送一个已签名的 JSON 负载。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 具有**编辑教会设置**权限的教会管理员负责注册和管理 webhook
- 你的接收端点必须能通过公开地址的 **HTTPS** 访问
- 准备好一种安全存储签名密钥的方式——它只会显示一次

</div>

## 概览

Webhook 只是**出站**的:B1 调用你的端点,你不调用 B1。每个 webhook 都是一个按教会划分的订阅,由目标 URL、签名密钥和订阅事件列表组成。

投递使用**持久发件箱**:当订阅事件发生时,B1 会记录一条投递行,后台工作进程会在大约一分钟内向其发送 POST 请求。失败的投递会以指数退避方式重试。即使投递变慢或你的端点短暂宕机,也不会丢失任何数据。

## 注册 Webhook

### 在 B1Admin 中

前往 **设置 → 开发者 → Webhook → 新建 Webhook**。输入名称、负载 URL,并选择要订阅的事件。保存时,**签名密钥只会显示一次**——请立即复制并妥善保存到你的集成中。它不会再次显示(之后可以轮换密钥,但无法找回原始密钥)。

### 通过 API

所有端点都位于 Membership 模块的基础路径 `/membership/webhooks` 下,需要具有 `Settings / Edit` 权限的教会管理员的 JWT,**或者使用带有 `settings:write` 作用域签发的 [API 密钥](./api-keys)**。同一批路由同时接受这两种方式。这正是 Zapier 和 Make 在启用一个 Zap 或场景时能够代表教会注册 webhook 的原因。

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

创建响应——**只有**创建响应——包含 `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| 方法与路径 | 用途 |
|---|---|
| `GET /membership/webhooks` | 列出教会的 webhook(不含密钥) |
| `GET /membership/webhooks/events` | 有效事件名称目录 |
| `GET /membership/webhooks/:id` | 加载一个 webhook |
| `POST /membership/webhooks` | 创建(不带 `id`)或更新(带 `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | 轮换签名密钥;新值只返回一次 |
| `DELETE /membership/webhooks/:id` | 删除一个 webhook |
| `GET /membership/webhooks/:id/deliveries` | 某个 webhook 最近的投递尝试 |
| `GET /membership/webhooks/deliveries/:deliveryId` | 一次投递的完整负载和响应 |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | 重新排队一次投递 |

## 事件目录

事件名称遵循 `{entity}.{action}` 模式。可从 `GET /membership/webhooks/events` 获取实时列表。

| 事件 | 触发时机 |
|---|---|
| `person.created` | 新增一个人员 |
| `person.updated` | 一条人员记录被修改 |
| `person.destroyed` | 一个人员被删除 |
| `household.created` | 新增一个家庭 |
| `household.updated` | 一个家庭信息被修改 |
| `household.destroyed` | 一个家庭被删除 |
| `group.created` | 新增一个小组 |
| `group.updated` | 一个小组被修改 |
| `group.destroyed` | 一个小组被删除 |
| `group.member.added` | 一个人被加入某个小组 |
| `group.member.removed` | 一个人被从某个小组移除 |
| `donation.created` | 记录了一笔捐款——手动录入、在线捐款,或从待处理转为完成的状态变化 |
| `donation.updated` | 一条捐款记录被编辑 |
| `attendance.recorded` | 记录了一次到访(手动录入或签到) |
| `session.created` | 新建了一个出勤场次(手动创建,或首次签到时自动创建) |
| `form.submission.created` | 提交了一份表单 |
| `event.created` | 新增了一个日历事件 |
| `event.updated` | 一个日历事件被编辑 |
| `event.destroyed` | 一个日历事件被删除 |

## 负载格式

每次投递都是一个带有 JSON 正文和以下请求头的 HTTP `POST`:

| 请求头 | 说明 |
|---|---|
| `Content-Type` | 始终为 `application/json` |
| `X-B1-Event` | 事件名称,例如 `person.created` |
| `X-B1-Delivery-Id` | 本次投递尝试的唯一 id——用于去重 |
| `X-B1-Signature` | 原始正文的 HMAC-SHA256 签名(见下文) |
| `X-B1-Timestamp` | 请求发送时的 Unix 纪元秒数 |
| `User-Agent` | `B1-Webhooks/1.0` |

正文将变更的资源包装在一个小信封中:

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

对于 `*.destroyed` 事件,`data` 仅包含被删除记录的 `id` 和 `churchId`。

负载中通过 id 引用其他记录的事件,还会携带在投递时解析出的可读名称:小组成员事件上的 `personName` 和 `groupName`,出勤、捐款和名单成员事件上的 `personName`,`session.created` 上的 `groupName`,以及 `form.submission.created` 上的 `formName`(如果提交与某个人关联,还会附带 `personName`)。

## 连接器类型

默认的投递格式就是上面的 JSON 信封——`connectorType: "standard"`。对于 [Slack 和 Discord](/docs/b1-admin/integrations/slack-discord),同一套 webhook 引擎会改为发送这些服务可以直接接受的聊天格式消息:

| `connectorType` | 发送的正文 | 使用场景 |
|---|---|---|
| `"standard"`(默认) | 已签名的 `{event, churchId, occurredAt, data}` 信封 | 你在编写自己的集成,或对接 Zapier / Make / 自建服务器 |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | 你要直接发送到 Slack 的传入 Webhook URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | 你要直接发送到 Discord 频道 webhook URL |

连接器类型在 webhook 编辑器的**连接器类型**下拉菜单中设置,或在 `POST /membership/webhooks` 请求正文中通过 `connectorType` 设置。发往 Slack/Discord 的投递仍然会带上已签名的 `X-B1-Signature` 请求头(它们会无害地忽略它),所以之后把 webhook 改回 `standard` 无需重新签名。

## 测试投递

每个 webhook 编辑器都有一个**发送测试事件**按钮——对应的 API 调用是 `POST /membership/webhooks/:id/test`。测试路由会为第一个订阅的事件构建一个合成负载,同步地通过真实的已签名投递路径进行分发(对于 Slack/Discord 还会经过 `formatForConnector`),并返回结果投递行,包括 `responseStatus` 和 `responseBody`。在正式启用集成之前,可用它来确认连通性和签名处理是否正常。

## 验证签名

在信任负载之前,务必先验证 `X-B1-Signature`。签名是 `sha256=` 后跟**原始请求正文**以你的签名密钥为密钥计算出的十六进制 HMAC-SHA256。请对你实际收到的字节进行计算——不要重新序列化解析后的 JSON。

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

拒绝任何签名不匹配的请求。也可以选择性地拒绝 `X-B1-Timestamp` 超过几分钟之前的请求,以限制重放窗口。

## SDK 支持

对于 Node.js,`@churchapps/integration-sdk` 提供了一个类型化的验证器和一个 Express 中间件,帮你完成原始正文捕获、签名校验和信封解析:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// 在 JSON 解析之前捕获原始正文——签名校验仍然需要它。
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

该 SDK 还为非 Express 运行时(无服务器函数、Fastify 等)提供了 `WebhookVerifier.verify(secret, rawBody, signatureHeader)`。详见 npm 上的软件包说明。

## 投递与重试

你的端点应尽快以 `2xx` 状态响应——理想情况下只是把工作排队,而不是等处理完再响应。任何非 `2xx` 响应、连接失败,或响应时间超过 **10 秒**,都会被视为投递失败。

失败的投递会以指数退避方式重试——**在大约 5 天内进行 16 次尝试**。间隔从 1 分钟开始增长,经过数小时,最后几次尝试的间隔可达 3 天。第 16 次尝试失败后,该次投递会被标记为 `exhausted` 并放弃。

投递是**至少一次**的:同一次投递可能会到达不止一次(例如你的端点处理成功了,但响应丢失了)。请使用 `X-B1-Delivery-Id` 请求头去重——每个 id 只处理一次,重复的视为无操作。

### 自动禁用

如果某个 webhook 产生**连续三次耗尽的投递**,B1 会自动将其禁用。修复你的端点后,再到 B1Admin 中重新启用该 webhook(或通过 `POST /membership/webhooks` 并设置 `"active": true`)。

## 检查与重新投递

B1Admin 中的 webhook 编辑器会显示一个**最近投递**表格——事件、状态、尝试次数、响应码和时间戳。点击某一行可查看发送的完整负载以及收到的响应。

使用**重新投递**可以用原始负载重新排队任意一次历史投递——适用于修复端点中的 bug 之后,或用于补投端点宕机期间错过的事件。

## URL 要求

由于 webhook URL 是由教会提供的,B1 会实施防范服务器端请求伪造(SSRF)的防护措施。如果某个 webhook URL 满足以下任一条件,则会在注册时以及每次投递前被拒绝:

- 未使用 **`https`**
- 指向 `localhost`、`.local` / `.internal` 主机名,或者
- 解析为**私有、环回、链路本地或云元数据**的 IP 地址

你的端点必须是一个可公开访问的 HTTPS 服务。
