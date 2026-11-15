---
title: "Mobile Message"
description: "通过 Zapier 或 Make 的 webhook，将 B1 Admin 事件连接到澳大利亚短信 API Mobile Message，以发送欢迎、奉献与提醒短信。"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) 是一个澳大利亚的短信 API——在澳大利亚的教会中很受欢迎，因为它提供本地号码，而且相较于以美国为主的 Clearstream 与 Text In Church，其在澳大利亚的价格更具竞争力。Mobile Message 目前没有一流的 Zapier 应用程序，但它公开了 REST API，因此你只需几分钟，就能透过 **Webhooks by Zapier**（或 Make 的 HTTP 模块）将 B1 事件连接到 Mobile Message 短信。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 一个 [Mobile Message](https://mobilemessage.com.au) 账户，并已注册 Sender ID 及 API 凭证（API 用户名 + 密码，位于 *Account → API Settings* 下）
- 一个 [Zapier](https://zapier.com) 账户（或 [Make](https://www.make.com)）
- 一位在 B1Admin 中具有 **Edit Settings** 权限的用户

</div>

## 你可以设置的内容 {#what-you-can-wire-up}

Mobile Message 的 API 属于"发送短信"类型——没有触发器，只有外发的短信。因此所有范例都是 B1 → 短信：

| 方向 | B1 触发器 | 结果 |
|---|---|---|
| B1 → Mobile Message | `person.created` | 向新人员发送欢迎短信 |
| B1 → Mobile Message | `donation.created` | 向奉献者发送感谢短信 |
| B1 → Mobile Message | `form.submission.created` | 呼叫值班团队 |
| B1 → Mobile Message | `event.created` | 向某个名单广播提醒 |

## 设置 {#setup}

### 1. 建立 B1 API 密钥 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**：

- `settings:write`——用于注册触发器 webhook
- `people:read`——用于依 `personId` 查找收件人的电话号码

### 2. 使用 Webhooks by Zapier 建立 Zap {#2-build-the-zap-with-webhooks-by-zapier}

1. **触发器**——B1.church：选择你想要的事件（例如 New Donation）。
2. **操作**——B1.church：Find Person（使用 `data.personId`），以取得电话号码与姓名。
3. **操作**——Webhooks by Zapier：**POST**。依下方方式设置。

POST 步骤的设置：

- **URL**——`https://api.mobilemessage.com.au/v1/messages`
- **Payload Type**——JSON
- **Data**——
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers**——`Content-Type: application/json`（Webhooks by Zapier 会自动加入）
- **Basic Auth**——将 *Basic Auth* 字段设为 `<api_username>|<api_password>`（Zapier 会将其转换为正确的 `Authorization: Basic …` 标头）

开启 Zap。在 B1Admin 中发送一笔测试奉献，以确认短信确实送达。

## 常见范例 {#common-recipes}

### 活动当天早上的提醒 {#event-reminders-the-morning-of}

- **触发器**——Schedule by Zapier（每天早上 7 点）
- **操作**——将当天的活动清单保存在 Google Sheet（或其他 Zapier 可读取的应用程序）中，并查找当天的资料列——B1 的 Zapier 应用程序没有查找活动的操作
- **操作**——Webhooks by Zapier：将活动清单以 POST 发送到 Mobile Message，发送给已注册的订阅者群组

### 使用批量端点进行名单广播 {#use-the-batch-endpoint-for-a-list-broadcast}

Mobile Message 的 `/v1/messages` 端点每次呼叫最多可接受 10,000 则讯息。若要向 B1 小组广播：

- **触发器**——B1.church：New Form Submission（筛选特定表单）
- **操作**——Webhooks by Zapier：GET `/membership/groupmembers?groupId=…`，列出目标小组的成员（B1 的 Zapier 应用程序没有为此提供列表操作；请以 `Authorization: Bearer cak_…` 标头发送 API 密钥）
- **操作**——Formatter by Zapier → Utilities → Line-itemize，将回应转换为 `messages` 数组
- **操作**——Webhooks by Zapier：将完整数组 POST 到 `/v1/messages`

### Make 替代方案 {#make-alternative}

如果你偏好 Make，请在 B1 Watch Events 触发器之后加入 **HTTP — Make a request** 模块，并以相同方式设置（POST、Basic Auth、JSON 内容）。B1 这一端的设置请参阅 [Make 概览](../make.md)——注意 B1.church Make 应用程序尚未推出。

## 限制与注意事项 {#limits--notes}

- **Basic Auth 是唯一的身份验证方式**——Mobile Message 会从控制台发出用户名与密码。两者都应视为机密。
- **`sender` 必须是你 Mobile Message 账户中已注册的 Sender ID**，否则发送会返回 `400 Invalid sender`。澳大利亚法规要求事先注册发送者。
- **澳大利亚电话号码**可以是 `0412345678`（本地格式）或 `+61412345678`（国际格式）。API 两者皆接受，但如果你同时发送到海外，建议统一使用 `+61…` 格式。
- **每个请求最多 10,000 则讯息**——适合广播，但单一 B1 webhook 传送很少会产生如此庞大的名单；请将批量端点保留给定时的大量 Zap。

## 故障排除 {#troubleshooting}

- **POST 返回 `401 Unauthorized`**——Basic Auth 凭证有误。请从 Mobile Message 控制台的 *Account → API Settings* 重新复制。请注意，用户名默认为你的账户电子邮件，而非独立的 API 密钥。
- **POST 返回 `400 Invalid sender`**——`sender` 的值不是你账户中已注册的 Sender ID。请先在 Mobile Message 控制台中注册。
- **短信送达但内容被截断**——Mobile Message 会将超过约 160 个字符的讯息拆分为多个部分，并依部分数量收费。请查看回应内容，其中会显示部分数量。

## 另见 {#see-also}

- [Clearstream](./clearstream.md)、[Text In Church](./text-in-church.md)：其他短信服务商，提供原生 Zapier 应用程序（无需 Webhooks by Zapier 步骤）
- [Zapier（概览）](../zapier.md)：每个 Zapier 范例的 B1 端设置
- [Mobile Message API 文档](https://mobilemessage.com.au/api-documentation)
