---
title: "已连接的服务"
description: "使用 Zapier 或 Make 范例将 B1 Admin 连接到 Mailchimp、Donorbox、Subsplash、VOMO、Clearstream 及其他工具，并附有每项服务的设置指南。"
---

# 已连接的服务

<div class="article-intro">

将 B1 连接到其他教会科技工具，通常最快的方式是使用 Zapier 或 Make 范例——你无需新增任何 B1 基础设施，工作流程由第三方托管。本页是我们已确认目前可以连接的服务精选清单，每项服务都附有简短、可直接套用的设置指南。

</div>

## 概览 {#at-a-glance}

| 服务 | 类别 | 桥接方式 | 可以设置的内容 |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | 电子邮件 | 内置于 B1（Webhooks 标签页） | 让 Mailchimp 受众名单与 B1 的人员、小组和已保存的名单保持同步 |
| [Donorbox](./donorbox.md) | 奉献 | Zapier | 将 Donorbox 的奉献与捐献者推送到 B1 |
| [Subsplash](./subsplash.md) | 应用程序／奉献 | Zapier | 将 Subsplash 的奉献与人员拉入 B1 |
| [VOMO](./vomo.md) | 志愿服务 | Zapier | 在 B1 小组与 VOMO 项目之间同步志愿者报名 |
| [Clearstream](./clearstream.md) | 短信 | Zapier | 由 B1 事件触发 Clearstream 短信；将回复汇入为 B1 记录 |
| [Text In Church](./text-in-church.md) | 短信／工作流程 | Zapier | 由 B1 触发 Text In Church 工作流程；接收 Connect Card 资料 |
| [Mobile Message](./mobile-message.md) | 短信（澳大利亚） | Webhooks by Zapier 或 Make | 由任何 B1 事件发送短信 |
| [Checkr](./checkr.md) | 背景调查 | Make | 当有人加入服事团队时发起背景调查 |

## 这些服务的共同点 {#what-all-of-these-have-in-common}

1. **B1 这一端的设置完全相同**——在 **B1Admin → Settings → Developer → API Keys** 中建立具有正确权限范围的 API 密钥，然后让桥接工具为触发器注册 webhook（Zapier／Make 会自动执行此操作，需要 `settings:write`），或从后续操作中调用 B1 的 REST 端点。B1.church Zapier 应用程序要求每个密钥都具有 `settings:write`，因为连接时它会将密钥与 B1 的 webhook 清单进行核对。（Mailchimp 是例外：其同步功能已内置于 B1，并在 **Webhooks** 标签页中设置，无需 API 密钥或桥接工具。）
2. **费用由桥接工具收取，而非我们**。ChurchApps 是免费的；Zapier 和 Make 都提供免费方案，足以应付少量的范例。
3. **你可以在不正式上线的情况下测试设置**。Zapier 有"Test step"按钮，可从 B1 拉取示例资料，让你在启用范例之前查看资料结构。

## 选择桥接工具 {#picking-a-bridge}

- **Zapier** 较易上手，且应用程序目录较为庞大——除非成本是考虑因素，否则可将其作为你的预设选择。
- **Make** 在规模较大时费用较低，并且具有更灵活的路由／筛选逻辑——当单一工作流程需要分支扩散、条件判断或多个步骤时，请使用 Make。
- **Webhooks by Zapier**（Mobile Message 文档中所使用的）是一个通用的适配器，当目标服务不是一流的 Zapier 应用程序时，可让你从 Zap 向任何 HTTP 端点发送 POST 请求。

如果你要找的服务不在此清单上，B1 的 [REST API](/docs/developer/api) 与 [webhook](/docs/developer/api/webhooks) 都是开放的——你可以使用 [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)，在几个小时内建立一个一次性的桥接工具。

## 不在此列的服务（及原因） {#whats-not-here-and-why}

有几款常见的教会科技工具——Tithe.ly、Pushpay、Vanco、PastorsLine、Gloo、Notebird、KidCheck、MinistrySafe——目前没有已发布的 Zapier 应用程序或 Make 模块。它们有自己的 API，但要与 B1 连接需要自定义代码，而非一个范例，因此不适合列于此处。如果供应商日后推出 Zapier 应用程序或 Make 模块，我们会再新增相应的文档。

我们也刻意略过了专属于 Planning Center Services 的工具（音乐、简报）、竞争性的 ChMS 产品、迁移顾问，以及仅用于清理 PCO 专属资料的工具——这些工具都没有可以有效连接 B1 的途径。

## 另见 {#see-also}

- [Zapier（概览）](../zapier.md)：每个 Zapier 范例的 B1 端设置完全相同；本文件仅说明一次
- [Make（概览）](../make.md)：Make 场景的相同说明
- [Slack 与 Discord](../slack-discord.md)：无需任何桥接工具的聊天通知
- [Google Sheets](../google-sheets.md)：按需导出
- [Webhook（开发者参考）](/docs/developer/api/webhooks)：每个范例所依赖的事件目录
