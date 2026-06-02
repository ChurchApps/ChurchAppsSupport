---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) 是一个澳大利亚短信 API — 在澳大利亚教会中流行，因为它提供本地号码和竞争性澳大利亚定价，而 Clearstream 和 Text In Church 是美国中心。Mobile Message 今天没有一流的 Zapier 应用，但它发布一个公开 REST API，所以您可以在几分钟内通过 **Webhooks by Zapier**（或 Make 的 HTTP 模块）将 B1 事件连接到 Mobile Message 文本。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 一个具有已注册的发件人 ID 和 API 凭证（*账户 → API 设置* 下的 API 用户名 + 密码）的 [Mobile Message](https://mobilemessage.com.au) 账户
- 一个 [Zapier](https://zapier.com) 账户（或 [Make](https://www.make.com)）
- 一个具有 **编辑设置** 权限的 B1Admin 用户

</div>

## 您可以连接什么

Mobile Message 的 API 是"发送短信"形状 — 没有触发器，仅出站文本。所以方案都是 B1 → 短信：

| 方向 | B1 触发器 | 结果 |
|---|---|---|
| B1 → Mobile Message | `person.created` | 向新人员欢迎文本 |
| B1 → Mobile Message | `donation.created` | 向捐赠者感谢文本 |
| B1 → Mobile Message | `form.submission.created` | 页面随叫随到团队 |
| B1 → Mobile Message | `event.created` | 提醒广播到列表 |

## 设置

### 1. 生成一个 B1 API 密钥

**设置 → 开发者 → API 密钥 → 新建 API 密钥**：

- `settings:write` — 用于触发器 webhook 注册
- `people:read` — 从 `personId` 查找收件人的电话号码

### 2. 使用 Webhooks by Zapier 构建 Zap

1. **触发器** — B1.church：选择您想要的事件（例如新捐款）。
2. **操作** — B1.church：查找人员（使用 `data.personId`）以获取电话号码和名字。
3. **操作** — Webhooks by Zapier：**POST**。如下配置。

POST 步骤的设置：

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **有效负载类型** — JSON
- **数据** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "感谢您的礼物，{{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **标题** — `Content-Type: application/json`（Webhooks by Zapier 自动添加此项）
- **基本身份验证** — 将 *基本身份验证* 字段设置为 `<api_username>|<api_password>`（Zapier 将其转换为正确的 `Authorization: Basic …` 标题）

打开 Zap。在 B1Admin 中发送测试礼物以验证文本到达。

## 常见方案

### 事件提醒早上

- **触发器** — Schedule by Zapier（每天，早上 7 点）
- **操作** — B1.church：查找今天的事件（或使用带固定日期过滤器的查找步骤，或在 Google Sheet 中存储今天的事件列表）
- **操作** — Webhooks by Zapier：POST 到具有事件列表的 Mobile Message 的已注册订阅者组

### 使用批处理端点进行列表广播

Mobile Message 的 `/v1/messages` 端点每次调用接受最多 10,000 条消息。要广播到 B1 小组：

- **触发器** — B1.church：新表格提交（过滤到特定表单）
- **操作** — B1.church：列出目标小组的小组成员（通过 *Webhooks by Zapier — GET* 步骤在 `/membership/groupmembers?groupId=…`）
- **操作** — Formatter by Zapier → 实用程序 → 将响应行项目化为 `messages` 数组
- **操作** — Webhooks by Zapier：将完整数组 POST 到 `/v1/messages`

### Make 替代方案

如果您更喜欢 Make，在 B1 观察事件触发器后放置 **HTTP — 发起请求** 模块，以相同方式配置它（POST、基本身份验证、JSON 主体）。查看 [Make 概览](../make) 以获取 B1 侧。

## 限制和注释

- **基本身份验证是唯一的身份验证方法** — Mobile Message 从仪表板颁发用户名和密码。将两者都视为机密。
- **`sender` 必须是已注册的发件人 ID** 在您的 Mobile Message 账户上，否则发送将返回 `400 无效发件人`。澳大利亚法规要求发件人注册。
- **澳大利亚电话号码** 可以是 `0412345678`（本地）或 `+61412345678`（国际）。API 接受两者，但如果您也向海外发送，规范化为 `+61…`。
- **最多 10,000 条消息每请求** — 对广播很有用，但单个 B1 webhook 交付很少会发出那么大的列表；为计划的批量 Zaps 保留批处理端点。

## 故障排查

- **POST 返回 `401 未授权`** — 基本身份验证凭证错误。从 Mobile Message 仪表板 *账户 → API 设置* 重新复制。注意用户名默认是您的账户电子邮件，不是单独的 API 密钥。
- **POST 返回 `400 无效发件人`** — `sender` 值不是您账户上已注册的发件人 ID。首先在 Mobile Message 仪表板中注册它。
- **文本到达但被截断** — Mobile Message 将 ~160 个字符的消息拆分为多个部分；您按部分计费。检查响应主体 — 它告诉您部分计数。

## 另请参阅

- [Clearstream](./clearstream)、[Text In Church](./text-in-church) — 具有原生 Zapier 应用的替代短信提供商（无需 Webhooks-by-Zapier 步骤）
- [Zapier（概览）](../zapier) — 每个 Zapier 方案的 B1 侧
- [Mobile Message API 文档](https://mobilemessage.com.au/api-documentation)
