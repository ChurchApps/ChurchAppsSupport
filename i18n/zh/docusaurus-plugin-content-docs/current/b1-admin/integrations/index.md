---
title: "集成"
---

# 集成

<div class="article-intro">

B1 集成到您的团队已经使用的工具。连接 Slack 或 Discord 获取员工通知、自动化 Zapier 或 Make 中的工作流、或按需导出数据到 Google Sheets — 无需为单独的集成平台付费，无需 ChurchApps 托管额外内容。每个集成都在第三方自己的基础设施上运行，并通过 B1 的 webhooks 或 REST API 与您的教会通信。

</div>

## 可用功能

| 集成 | 功能说明 | 方向 | 设置难度 |
|---|---|---|---|
| **[Slack](./slack-discord)** | 将可读通知（新人员、捐款、注册等）发布到 Slack 频道 | B1 → Slack | 2 分钟 |
| **[Discord](./slack-discord)** | 同样功能，在 Discord 频道中 | B1 → Discord | 2 分钟 |
| **[Zapier](./zapier)** | 使用 B1 事件作为触发器，在 Zapier 的 7000+ 个应用中使用 B1 操作 | 双向 | 每个 Zap 5-10 分钟 |
| **[Make](./make)** | 与 Zapier 相同的想法，在 Make 的可视化场景生成器中 | 双向 | 每个场景 5-10 分钟 |
| **[Google Sheets](./google-sheets)** | 按需导出人员、捐款、小组、出席情况到电子表格 | B1 → Sheet | 5 分钟 |
| **[Claude](./claude)** | 询问 Anthropic 的 Claude 关于您的教会数据的问题，范围限制在您的权限内 | 双向 | 5 分钟 |
| **[ChatGPT](./chatgpt)** | 与 OpenAI 的 ChatGPT 相同的想法，通过自定义 GPT 或支持 MCP 的 OpenAI 工具 | 双向 | 10 分钟 |
| **[已连接的服务](./services/)** | Mailchimp、Donorbox、Subsplash、VOMO、Clearstream、Text In Church、Mobile Message、Checkr 的精选方案 | 因情况而异 | 每个 5-10 分钟 |

## 如何选择

- **只想在聊天中获得通知？** 使用 **Slack** 或 **Discord** — 无需第三方账户，无需维护 Zap。完全在 B1Admin 内配置。
- **想自动化跨应用的内容**（例如"当有人捐款时，将他们添加到我的 Mailchimp 列表和 Slack #donations"）？使用 **Zapier** 或 **Make**。Zapier 更友好；Make 在规模上更便宜，逻辑也更灵活。
- **需要一次性数据拉取或定时报告？** 使用 **Google Sheets** — 将 API 密钥粘贴到插件的侧边栏并点击导出。
- **想用纯英文提出问题**（"上周有多少首次访问者？"、"总结本月的捐款"）？使用 **[Claude](./claude)** 或 **[ChatGPT](./chatgpt)** — 两者都使用单个 API 密钥连接到 B1。
- **构建自己的自定义集成？** 上述都不是 — 直接与 [REST API](/docs/developer/api) 对话，使用 [API 密钥](/docs/developer/api/api-keys)，或订阅 [webhooks](/docs/developer/api/webhooks) 到您控制的服务器。

## 它们的共同点

每个集成都使用 **B1 API 密钥**进行身份验证，在 B1Admin 的 **设置 → 开发者 → API 密钥** 中创建。该密钥：

- 绑定到您教会中的特定人员并继承该人员的权限
- 可以通过 **scopes** 缩小范围 — 例如 Google Sheets 导出只需要 `people:read`，不需要 `settings:write`
- 可以随时撤销，立即切断集成的访问权限，不影响其他任何东西

少数连接器（Zapier、Make）也会在您打开 Zap 或场景时代表您注册 [webhook](/docs/developer/api/webhooks)，在您关闭 Zap 时删除它 — 您不需要自己管理 webhook URL。

:::tip
为了让 Zapier 和 Make 自动注册 webhooks，API 密钥需要 **`settings:write`** scope（加上集成涉及的任何资源 scope）。只读密钥适用于操作和导出，但不适用于触发器。
:::

## 成本

ChurchApps 是免费和开源的。Slack/Discord、[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) 和官方 Zapier、Make、Google Sheets 连接器在我们这边也是免费的。第三方可能对他们自己的平台收费（Zapier 和 Make 都有慷慨的免费层；Slack、Discord 和 Google Sheets 对此目的是免费的）。

## 构建您自己的

如果上述都不符合，每个 B1 表面都是开放的：

- **[REST API](/docs/developer/api)** — 使用 `Authorization: Bearer cak_…` 标头从任何语言调用 B1
- **[Webhooks](/docs/developer/api/webhooks)** — 订阅一个公开的 HTTPS 端点到一个或多个事件类型，并接收签名的 JSON 有效载荷
- **[OAuth + 已连接的应用](/docs/developer/api/connected-apps)** — 如果您正在构建被许多教会使用的 SaaS 产品

## 后续步骤

- [Slack 和 Discord](./slack-discord) — 发布聊天通知
- [Zapier](./zapier) — 连接到 7000+ 个应用
- [Make](./make) — 可视化工作流自动化
- [Google Sheets](./google-sheets) — 导出到电子表格
- [Claude](./claude) — 询问 Anthropic 的 Claude 关于您的教会数据
- [ChatGPT](./chatgpt) — 询问 OpenAI 的 ChatGPT 关于您的教会数据
- [已连接的服务](./services/) — 按服务的方案（Mailchimp、Donorbox、Clearstream 等）
