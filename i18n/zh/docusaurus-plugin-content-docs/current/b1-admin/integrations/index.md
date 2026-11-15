---
title: "整合"
description: "将 B1 Admin 连接到 Slack、Discord、Zapier、Make、Google Sheets，以及 Claude 等 AI 助手，并提供设置步骤与每项整合所需的 API 密钥权限范围。"
---

# 整合

<div class="article-intro">

B1 可以与你的团队已经在使用的工具相连。你可以连接 Slack 或 Discord 以向员工发送通知，在 Zapier 或 Make 中自动化工作流程，或按需将数据导出到 Google Sheets——无需另外购买整合平台，ChurchApps 也不会托管任何额外的服务。每项整合都运行在第三方自己的基础设施上，并通过 B1 的 webhook 或 REST API 与你的教会通信。

</div>

## 可用的整合 {#whats-available}

| 整合 | 功能 | 方向 | 设置所需时间 |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | 将易读的通知（新增人员、奉献、报名等……）发布到 Slack 频道 | B1 → Slack | 2 分钟 |
| **[Discord](./slack-discord.md)** | 同上，发布到 Discord 频道 | B1 → Discord | 2 分钟 |
| **[Zapier](./zapier.md)** | 将 B1 事件用作触发器，并在 Zapier 的 7,000 多个应用中使用 B1 操作（等待 Zapier 审核） | 双向 | 每个 Zap 5–10 分钟 |
| **[Make](./make.md)** | 与 Zapier 思路相同，在 Make 的可视化场景构建器中使用（尚未推出） | 双向 | 每个场景 5–10 分钟 |
| **[Google Sheets](./google-sheets.md)** | 按需将人员、奉献、小组和出席数据导出到电子表格（尚未推出） | B1 → 表格 | 5 分钟 |
| **[Claude](./claude.md)** | 向 Anthropic 的 Claude 询问有关你教会资料的问题，权限范围与你的权限一致——可免费试用，推荐使用 | 双向 | 不到 3 分钟 |
| **[ChatGPT](./chatgpt.md)** | 同样的思路，使用 OpenAI 的 ChatGPT（需要付费的 ChatGPT 套餐） | 双向 | 10 分钟 |
| **[Mailchimp](./services/mailchimp.md)** | 让 Mailchimp 受众名单与你的人员、小组和已保存的名单保持同步——已内置于 B1 | B1 → Mailchimp | 5 分钟 |
| **[已连接的服务](./services/index.md)** | 为 Donorbox、Subsplash、VOMO、Clearstream、Text In Church、Mobile Message、Checkr 提供的精选方案 | 各不相同 | 每项 5–10 分钟 |

## 如何选择 {#how-to-pick}

- **只想在聊天中收到通知**？使用 **Slack** 或 **Discord**——无需第三方账户，也无需维护 Zap。完全在 B1Admin 中设置即可。
- **想跨应用程序自动化某项工作**（例如"当有人奉献时，将其加入我的 Mailchimp 名单并发送到 Slack #donations 频道"）？请使用 **Zapier** 或 **Make**。Zapier 较易上手；Make 在规模较大时更便宜，逻辑也更灵活。
- **需要一次性的资料提取或定期报表**？请使用 **Google Sheets**——将 API 密钥粘贴到扩展功能的侧边栏中，然后点击导出即可。
- **想用日常语言提问**（例如"上周日有多少位初次到访的访客？"、"总结本月的奉献情况"）？请从 **[Claude](./claude.md)** 开始。它可以免费试用，不到 3 分钟即可设置完成。**[ChatGPT](./chatgpt.md)** 也可以使用，但需要付费套餐。Claude 通过登录你的 B1 账户进行连接；ChatGPT 则使用 B1 API 密钥。
- **想建立你自己的自定义整合**？以上皆非也没关系——你可以使用 [API 密钥](/docs/developer/api/api-keys)，直接调用 [REST API](/docs/developer/api)，或将你控制的服务器订阅到 [webhook](/docs/developer/api/webhooks)。

## 共同点 {#what-they-have-in-common}

所有整合都在 B1Admin 的 **Settings → Developer** 中设置，该页面有三个标签页：**API Keys**、**Webhooks** 和 **Connected Apps**。

- **Slack、Discord 和 Mailchimp** 是你在 **Webhooks** 标签页中自行建立的 webhook（选择对应的 **Connector Type**）。它们不需要 API 密钥。
- **Claude**（使用你的 B1 账户登录）会显示在 **Connected Apps** 标签页中，你可以在该处撤销授权。
- **Zapier、Make、Google Sheets、ChatGPT，以及使用密钥的 Claude**都通过 **B1 API 密钥**进行身份验证，该密钥在 **API Keys** 标签页中建立。这个密钥：

  - 与建立它的人员绑定，并继承该人员的权限
  - 可以通过**权限范围**（scopes）进一步缩小——例如，Google Sheets 导出只需要 `people:read`，不需要 `settings:write`
  - 可以随时删除，立即切断该整合的访问权限，而不影响其他任何内容

部分连接器（Zapier、Make）会在你开启 Zap 或场景时，代你注册一个 [webhook](/docs/developer/api/webhooks)，并在你关闭 Zap 时将其移除——你无需自己管理 webhook 网址。

:::tip
要让 Zapier 和 Make 自动注册 webhook，API 密钥需要 **`settings:write`** 权限范围（以及该整合所涉及资源的权限范围）。只读密钥可用于操作与导出，但无法用于触发器。
:::

## 费用 {#cost}

ChurchApps 是免费且开源的。Slack/Discord、[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)，以及官方的 Zapier / Make / Google Sheets 连接器，从我们这一端来看也都是免费的。第三方平台可能会就其自身服务收费（Zapier 和 Make 都提供相当慷慨的免费方案；Slack、Discord 和 Google Sheets 用于此用途时则是免费的）。

## 自行建立 {#building-your-own}

如果以上选项都不符合你的需求，B1 的每个接口都是开放的：

- **[REST API](/docs/developer/api)**——以任何语言调用 B1，只需加上 `Authorization: Bearer cak_…` 标头
- **[Webhook](/docs/developer/api/webhooks)**——将一个公开的 HTTPS 端点订阅到一种或多种事件类型，并接收经过签名的 JSON 数据
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)**——如果你正在开发供许多教会使用的 SaaS 产品

## 后续步骤 {#next-steps}

- [Slack 与 Discord](./slack-discord.md)：发布聊天通知
- [Zapier](./zapier.md)：连接 7,000 多个应用程序
- [Make](./make.md)：可视化的工作流程自动化
- [Google Sheets](./google-sheets.md)：导出到电子表格
- [Claude](./claude.md)：向 Anthropic 的 Claude 询问有关你教会资料的问题
- [ChatGPT](./chatgpt.md)：向 OpenAI 的 ChatGPT 询问有关你教会资料的问题
- [已连接的服务](./services/index.md)：各项服务的专属设置（Mailchimp、Donorbox、Clearstream 等）
