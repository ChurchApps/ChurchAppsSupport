---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks 允许教会向第三方工具推送实时通知——自动化平台(Zapier、Make、n8n)、CRM、会计系统或任何接受 HTTP POST 的系统。当 B1 中的人员、小组或家庭发生更改时,B1 会向订阅该事件的每个 URL 发送签名的 JSON 负载。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 具有**编辑教会设置**权限的教会管理员注册和管理 webhooks
- 您的接收端点必须可通过**公网地址**的 **HTTPS** 访问
- 准备好安全存储签名密钥的方法——它只显示一次

</div>

## 概览

Webhooks 是**仅出站**的:B1 调用您的端点,您不调用 B1。每个 webhook 是一个按教会订阅,包含目标 URL、签名密钥和订阅事件列表。

传递使用**持久发件箱**:当订阅事件发生时,B1 记录一个传递行,后台工作程序在大约一分钟内 POST 它。失败的传递以指数退避重试。如果传递缓慢或您的端点暂时宕机,不会丢失任何内容。

## 注册 Webhook

### 在 B1Admin 中

转到**设置 → Webhooks → 新建 Webhook**。输入名称、负载 URL,并选择要订阅的事件。保存时,**签名密钥仅显示一次**——立即复制它并与您的集成一起存储。它不会再次显示(您稍后可以轮换它,但无法检索原始密钥)。

### 通过 API

所有端点都在 Membership 模块基础路径 `/membership/webhooks` 下,需要来自具有 `Settings / Edit` 权限的教会管理员的 JWT。

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

创建响应——**仅**创建响应——包含 `secret`:

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

| 方法和路径 | 用途 |
|---|---|
| `GET /membership/webhooks` | 列出教会的 webhooks(省略密钥) |
| `GET /membership/webhooks/events` | 有效事件名称目录 |
| `GET /membership/webhooks/:id` | 加载一个 webhook |
| `POST /membership/webhooks` | 创建(无 `id`)或更新(带 `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | 轮换签名密钥;返回新值一次 |
| `DELETE /membership/webhooks/:id` | 删除 webhook |
| `GET /membership/webhooks/:id/deliveries` | webhook 的最近传递尝试 |
| `GET /membership/webhooks/deliveries/:deliveryId` | 一次传递的完整负载和响应 |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | 重新排队传递 |

## 事件目录

事件名称遵循 `{entity}.{action}` 模式。从 `GET /membership/webhooks/events` 获取实时列表。

| 事件 | 触发时机 |
|---|---|
| `person.created` | 添加人员 |
| `person.updated` | 人员记录更改 |
| `person.destroyed` | 删除人员 |
| `household.created` | 添加家庭 |
| `household.updated` | 家庭更改 |
| `household.destroyed` | 删除家庭 |
| `group.created` | 添加小组 |
| `group.updated` | 小组更改 |
| `group.destroyed` | 删除小组 |
| `group.member.added` | 将人员添加到小组 |
| `group.member.removed` | 从小组中移除人员 |

## 负载格式

每次传递都是带有 JSON 正文和以下标头的 HTTP `POST`:

| 标头 | 描述 |
|---|---|
| `Content-Type` | 始终为 `application/json` |
| `X-B1-Event` | 事件名称,例如 `person.created` |
| `X-B1-Delivery-Id` | 此传递尝试的唯一 id——用于去重 |
| `X-B1-Signature` | 原始正文的 HMAC-SHA256 签名(见下文) |
| `X-B1-Timestamp` | 发送请求时的 Unix 纪元秒 |
| `User-Agent` | `B1-Webhooks/1.0` |

正文将更改的资源包装在一个小信封中:

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

对于 `*.destroyed` 事件,`data` 仅包含已删除记录的 `id` 和 `churchId`。

## 验证签名

在信任负载之前始终验证 `X-B1-Signature`。签名是 `sha256=` 后跟使用您的签名密钥作为密钥的**原始请求正文**的十六进制 HMAC-SHA256。对您收到的字节进行计算——不要重新序列化解析的 JSON。

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

拒绝签名不匹配的任何请求。可选地,也拒绝 `X-B1-Timestamp` 超过几分钟的请求以限制重放窗口。

## 传递和重试

您的端点应尽快响应 `2xx` 状态——理想情况下仅在排队工作之后,而不是在处理之后。任何非 `2xx` 响应、连接失败或慢于 **10 秒**的响应都算作传递失败。

失败的传递以指数退避重试——**在大约 5 天内进行 16 次尝试**。间隔从 1 分钟增长,经过数小时,最终尝试达到 3 天间隔。在第 16 次失败尝试后,传递被标记为 `exhausted` 并放弃。

传递是**至少一次**:传递可能到达多次(例如,如果您的端点成功但响应丢失)。使用 `X-B1-Delivery-Id` 标头去重——每个 id 仅处理一次,将重复视为无操作。

### 自动禁用

如果 webhook 产生**连续三次耗尽的传递**,B1 会自动禁用它。修复您的端点,然后在 B1Admin 中重新启用 webhook(或通过 `POST /membership/webhooks` 使用 `"active": true`)。

## 检查和重新传递

B1Admin 中的 webhook 编辑器显示**最近传递**表——事件、状态、尝试次数、响应代码和时间戳。选择一行显示发送的完整负载和返回的响应。

使用**重新传递**以其原始负载重新排队任何过去的传递——在修复端点中的错误后或在端点宕机时回填错过的事件时很有用。

## URL 要求

由于 webhook URL 由教会提供,B1 执行防止服务器端请求伪造的防护。如果 webhook URL 符合以下条件,则在注册时和每次传递前都会被拒绝:

- 不使用 **`https`**
- 指向 `localhost`、`.local` / `.internal` 主机名,或
- 解析为**私有、环回、链路本地或云元数据** IP 地址

您的端点必须是可公开访问的 HTTPS 服务。
