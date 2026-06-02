---
title: "已连接的服务"
---

# 已连接的服务

<div class="article-intro">

将 B1 连接到另一个教会科技工具的最快方式通常是 Zapier 或 Make 方案 — 您不需要新的 B1 基础设施，第三方托管工作流。此页面是我们已确认今天可连接的服务的精选列表，为每个提供了简短的复制粘贴设置指南。

</div>

## 一览

| 服务 | 类别 | 网桥 | 您可以连接什么 |
|---|---|---|---|
| [Mailchimp](./mailchimp) | 电子邮件 | Zapier 或 Make | 将新 B1 人员/捐赠者同步到 Mailchimp 受众 |
| [Donorbox](./donorbox) | 捐款 | Zapier | 推送 Donorbox 捐款和捐赠者回到 B1 |
| [Subsplash](./subsplash) | 应用/捐款 | Zapier | 拉取 Subsplash 捐款和人员到 B1 |
| [VOMO](./vomo) | 志愿服务 | Zapier | 在 B1 小组和 VOMO 项目之间同步志愿者注册 |
| [Clearstream](./clearstream) | 短信 | Zapier | 从 B1 事件触发 Clearstream 文本；将回复摄取为 B1 记录 |
| [Text In Church](./text-in-church) | 短信/工作流 | Zapier | 从 B1 触发 Text In Church 工作流；接收连接卡数据 |
| [Mobile Message](./mobile-message) | 短信（澳大利亚） | Webhooks by Zapier 或 Make | 从任何 B1 事件发送短信 |
| [Checkr](./checkr) | 背景检查 | Make | 当有人加入服务团队时启动背景检查 |

## 所有这些的共同点

1. **B1 侧的连接方式相同** — 在 **B1Admin → 设置 → 开发者 → API 密钥** 中使用正确的 scopes 创建 API 密钥，然后要么让网桥为触发器注册 webhook（Zapier/Make 自动执行此操作，需要 `settings:write`），要么从下游操作调用 B1 的 REST 端点。
2. **网桥向您收费，不是我们。** ChurchApps 是免费的；Zapier 和 Make 都有免费层，覆盖少数方案。
3. **您可以在上线前测试连接。** 两个网桥都有"测试步骤"按钮，对 B1 触发一次并在您打开方案前显示数据形状。

## 选择网桥

- **Zapier** 更友好，应用目录更大 — 除非成本成问题，否则默认使用它。
- **Make** 规模上更便宜，路由/过滤逻辑更灵活 — 当单个工作流有扇出、条件或许多步骤时使用它。
- **Webhooks by Zapier**（用于 Mobile Message 文档）是一个通用适配器，当目标不是一流 Zapier 应用时，让您从 Zap 发布到任何 HTTP 端点。

如果您想要此列表上没有的东西，B1 的 [REST API](/docs/developer/api) 和 [webhooks](/docs/developer/api/webhooks) 是开放的 — 您可以在几小时内用 [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) 构建一个一次性网桥。

## 这里缺少什么（以及为什么）

几个受欢迎的教会科技工具 — Tithe.ly、Pushpay、Vanco、PastorsLine、Gloo、Notebird、KidCheck、MinistrySafe — 今天没有发布的 Zapier 应用或 Make 模块。他们有自己的 API，但将他们连接到 B1 是一个自定义代码工作，而不是方案，所以他们不适合此列表。如果供应商添加了 Zapier 应用或 Make 模块，我们将添加文档。

我们也故意跳过了 Planning Center 服务特定的工具（音乐、演示）、竞争的 ChMS 产品、迁移顾问和仅清理 PCO 特定数据的工具 — 他们中没有一个有有用的连接路径到 B1。

## 另请参阅

- [Zapier（概览）](../zapier) — 每个 Zapier 方案的 B1 侧相同；此文档覆盖一次
- [Make（概览）](../make) — 对于 Make 场景相同
- [Slack 和 Discord](../slack-discord) — 聊天通知，不需要任何网桥
- [Google Sheets](../google-sheets) — 按需导出
- [Webhooks（开发者参考）](/docs/developer/api/webhooks) — 每个方案依赖的事件目录
