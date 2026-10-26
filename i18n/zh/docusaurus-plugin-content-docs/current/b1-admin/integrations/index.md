---
title: "集成"
---

# 集成

<div class="article-intro">

B1 可以与您的团队已经在使用的工具相连。您可以连接 Slack 或 Discord 以接收员工通知，在 Zapier 或 Make 中自动化工作流程，或随时将数据导出到 Google Sheets。无需另外购买集成平台，ChurchApps 也不会托管任何额外的服务。每个集成都运行在第三方自身的基础设施上，并通过 B1 的 webhooks 或 REST API 与您的教会进行通信。

</div>

## 可用的集成

| 集成 | 功能 | 方向 | 设置所需时间 |
|---|---|---|---|
| **[Slack](./slack-discord)** | 将易读的通知（新增人员、奉献、报名等……）发布到 Slack 频道 | B1 → Slack | 2 分钟 |
| **[Discord](./slack-discord)** | 同上，发布到 Discord 频道 | B1 → Discord | 2 分钟 |
| **[Zapier](./zapier)** | 将 B1 事件用作触发器，并在 Zapier 的 7,000 多个应用中使用 B1 操作 | 双向 | 每个 Zap 5–10 分钟 |
| **[Make](./make)** | 与 Zapier 思路相同，在 Make 的可视化场景构建器中使用 | 双向 | 每个场景 5–10 分钟 |
| **[Google Sheets](./google-sheets)** | 随时将人员、奉献、小组和考勤导出到电子表格 | B1 → 表格 | 5 分钟 |
| **[Claude](./claude)** | 向 Anthropic 的 Claude 询问您教会数据的相关问题，权限范围与您的权限一致；免费试用，推荐使用 | 双向 | 不到 3 分钟 |
| **[ChatGPT](./chatgpt)** | 同样的思路，使用 OpenAI 的 ChatGPT（需要付费的 ChatGPT 套餐） | 双向 | 10 分钟 |
| **[已连接的服务](./services/)** | 为 Mailchimp、Donorbox、Subsplash、VOMO、Clearstream、Text In Church、Mobile Message、Checkr 提供的精选方案 | 各不相同 | 每项 5–10 分钟 |

## 如何选择

- **只想在聊天中收到通知？** 使用 **Slack** 或 **Discord**，无需第三方账户，也无需维护 Zap。完全在 B1Admin 内配置即可。
- **想跨应用自动化某项工作**（例如"当有人奉献时，将其添加到我的 Mailchimp 列表并发送到 Slack #donations 频道"）？请使用 **Zapier** 或 **Make**。Zapier 更易上手；Make 在规模较大时更便宜，并且逻辑更灵活。
- **需要一次性的数据提取或定期报告？** 使用 **Google Sheets**：将 API 密钥粘贴到插件的侧边栏中，然后点击导出即可。
- **想用日常语言提问**（例如"上周日有多少首次到访的访客？"、"总结本月奉献情况"）？请从 **[Claude](./claude)** 开始。它可以免费试用，并且不到 3 分钟即可设置完成。**[ChatGPT](./chatgpt)** 也可以使用，但需要付费套餐。Claude 通过登录您的 B1 账户进行连接；ChatGPT 则使用 B1 API 密钥。
- **想构建您自己的定制集成？** 以上都不适用的话，可以直接使用 [API 密钥](/docs/developer/api/api-keys) 调用 [REST API](/docs/developer/api)，或将您控制的服务器订阅到 [webhooks](/docs/developer/api/webhooks)。

## 共同之处

每个集成都使用 **B1 API 密钥**进行身份验证，该密钥在 B1Admin 中通过 **Settings → Developer → API Keys** 创建。该密钥：

- 与教会中的某个特定人员绑定，并继承该人员的权限
- 可以通过**权限范围**进行限制，例如 Google Sheets 导出只需要 `people:read`，而不需要 `settings:write`
- 可以随时撤销，立即切断集成的访问权限，而不影响其他任何内容

部分连接器（Zapier、Make）会在 Zap 或场景开启时代您注册一个 [webhook](/docs/developer/api/webhooks)，并在您关闭 Zap 时将其移除。您无需自行管理 webhook 网址。

:::tip
要让 Zapier 和 Make 自动注册 webhooks，API 密钥需要具备 **`settings:write`** 权限范围（以及该集成所涉及资源的权限范围）。只读密钥可用于操作和导出，但无法用于触发器。
:::

## 费用

ChurchApps 是免费且开源的。对我们而言，Slack/Discord、[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)，以及官方的 Zapier / Make / Google Sheets 连接器同样免费。第三方平台可能会收取其自身平台的费用（Zapier 和 Make 都提供相当宽松的免费套餐；Slack、Discord 和 Google Sheets 用于此类用途时是免费的）。

## 构建您自己的集成

如果以上方案都不适合您，B1 的每个功能接口都是开放的：

- **[REST API](/docs/developer/api)**：使用任意语言调用 B1，只需添加 `Authorization: Bearer cak_…` 标头
- **[Webhooks](/docs/developer/api/webhooks)**：将一个公共 HTTPS 端点订阅到一种或多种事件类型，并接收经过签名的 JSON 载荷
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)**：如果您正在构建一个供多家教会使用的 SaaS 产品

## 后续步骤

- [Slack 与 Discord](./slack-discord)：发布聊天通知
- [Zapier](./zapier)：连接 7,000 多个应用
- [Make](./make)：可视化工作流自动化
- [Google Sheets](./google-sheets)：导出到电子表格
- [Claude](./claude)：向 Anthropic 的 Claude 询问您教会的数据
- [ChatGPT](./chatgpt)：向 OpenAI 的 ChatGPT 询问您教会的数据
- [已连接的服务](./services/)：各服务的具体方案（Mailchimp、Donorbox、Clearstream 等）
