---
title: "架构"
description: "跨代码库的系统图，展示捐款、签到、通知和网站在 B1 Admin、B1.church 和 Api 之间如何协作，帮助你在修改前理解它们。"
---

# 架构

<div class="article-intro">

这些页面是跨代码库的系统图：它们从头到尾说明一个核心 ChurchApps 系统如何运作，涵盖各个应用、API 模块和共享库，而不是某一个项目如何设置。在修改某个系统的行为之前，请先阅读这些页面；若要让某个项目运行起来，请阅读[设置](../setup/index.md)；若要查阅端点级别的参考资料，请查看 [API 部分](../api/index.md)。

</div>

## 生态系统概览

ChurchApps 包含约 20 个独立的代码库（并非单一仓库）。客户端应用通过 HTTPS 和 WebSocket 与一组较小的后端 API 通信，并通过以 `@churchapps` 为作用域发布的 npm 包共享代码。

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

有两条结构性规则决定了本节记录的所有内容：

1. **模块彼此隔离。** 每个 Api 模块都拥有自己的数据库和数据表；其他模块和应用只能通过其 REST 端点访问其数据。参见[模块结构](../api/module-structure.md)。
2. **共享代码以 npm 包的形式发布。** 应用之间不会直接导入彼此的源代码；任何可复用的内容都要通过 `@churchapps/helpers`、`@churchapps/apphelper` 或 `@churchapps/apihelper` 跨越代码库边界。参见[共享库](../shared-libraries/index.md)。

## 系统图

| 页面 | 涵盖内容 | 涉及范围 |
|------|----------|----------|
| [通知与提醒](./notifications.md) | 任何系统如何告知某人某事：两个分发入口、渠道升级链以及提醒引擎 | Api（messaging）、B1Admin、B1App |
| [实时架构](../realtime.md) | 支撑聊天、在线状态和应用内推送的 WebSocket 投递框架 | Api（messaging）、所有网页应用 |
| [网页推送通知](../web-push.md) | 浏览器推送渠道：VAPID 密钥、订阅存储、投递 | Api（messaging）、所有网页应用 |
| [捐款](./giving.md) | 支付服务商与网关、捐款流程、基金/批次、网关 webhook | Api（giving）、apphelper、B1App、B1Admin |
| [活动报名](./registrations.md) | 报名的商业模型：参与者类型、选项、折扣码、通过捐款网关付款，以及候补名单 | Api（content + giving）、B1App、B1Admin |
| [签到](./check-ins.md) | 自助签到终端与自助签到、出勤数据模型、房间路由、儿童安全层、标签打印 | B1Checkin、B1App、B1Admin、Api（attendance + membership） |
| [网站构建器](./website-builder.md) | 页面/区块/元素树、元素类型契约与渲染器、博客、受访问控制的页面、SEO 以及 AI 生成 | Api（content）、AskApi、helpers/apphelper、B1Admin、B1App |
| [网站路由与多站点](./websites.md) | 请求如何解析到某个教会及特定网站、多站点 `siteId` 数据模型，以及 Caddy 自定义域名边缘层 | B1App、Api（membership + content）、B1Admin |
| [集成](./integrations.md) | 扩展接口：OAuth、API 密钥、webhook、内容提供方、MCP | Api、共享库、外部应用 |
| [审计日志与可撤销批次](./audit-log.md) | 在控制器关键节点默认对每次变更进行审计，以及让导入和批量操作可以撤销的批次层 | Api（所有模块）、B1Admin、B1Transfer |
| [MinistryStuff](./ministrystuff.md) | 付费存储与短信额度服务：共享 JWT 身份、服务密钥 S2S、短信和存储提供方接口、Stripe 计费 | MinistryStuffApi、MinistryStuffWeb、Api（content + messaging）、短信/apihelper 包、B1Admin |
| [自带存储（BYOS）](./byos-storage.md) | 教会可链接 Google Drive、Dropbox、OneDrive 或兼容 S3 的存储桶，以突破免费的 100MB 上传限制：OAuth 连接、各提供方的上传格式、公开下载重定向 | Api（content + membership）、helpers/apphelper 包、B1Admin、B1App |
| [内容共享库](./commons.md) | 支撑跨产品用户生成内容的共享资产/投稿核心，以及 B1Admin 服务器管理中仅限员工使用的单一审核队列 | Api（commons 模块）、B1Admin、WorshipCommons、Lessons.church、FreeShow |

:::tip
当某项变更改变了这些系统的运作方式（而不仅仅是某个应用内的一个页面）时，应在同一项工作中同步更新此处对应的系统图。这样可以让本节始终可靠，成为新贡献者的首要参考。
:::

## 提案

这些文档描述的是供审阅的拟议工作，而非现有的产品功能。

| 提案 | 涵盖内容 |
|---|---|
| [Twilio 自带密钥（BYOK）](./twilio-byok-proposal.md) | 教会自有账户、密钥、服务和电话号码；集成范围、同意、投递、估算以及发布检查 |
| [Twilio 教会入驻草案](./twilio-byok-onboarding-draft.md) | 拟议的 B1 注册表单设置、针对特定教会的营销活动示例，以及审批和运营检查清单 |
