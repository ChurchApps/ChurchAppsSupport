---
title: "架构"
---

# 架构

<div class="article-intro">

这些页面是跨代码仓库的系统地图：它们记录的是某个核心 ChurchApps 系统端到端的工作方式——横跨各个应用、API 模块和共享库——而不是单个项目的搭建方式。在修改某个系统的行为之前请先阅读这些页面；若要让项目跑起来，请阅读[环境搭建](../setup/)；若需要端点级参考，请阅读 [API 部分](../api/)。

</div>

## 生态系统概览

ChurchApps 由约 20 个相互独立的代码仓库组成（不是单一 monorepo）。客户端应用通过 HTTPS 和 WebSocket 与一小组后端 API 通信，并通过发布在 `@churchapps` 作用域下的 npm 包共享代码。

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

本节所记录的一切都由两条结构性规则塑造：

1. **模块相互隔离。**每个 Api 模块拥有自己的数据库和表；其他模块和应用只能通过其 REST 端点访问其数据。参见[模块结构](../api/module-structure)。
2. **共享代码以 npm 包形式发布。**各应用之间从不直接导入彼此的源码；任何需要复用的代码都通过 `@churchapps/helpers`、`@churchapps/apphelper` 或 `@churchapps/apihelper` 跨越代码仓库边界。参见[共享库](../shared-libraries/)。

## 系统地图

| 页面 | 内容概要 | 涉及范围 |
|------|----------------|-------|
| [通知与提醒](./notifications) | 系统如何向用户传达信息：两个调度入口、渠道升级链，以及提醒引擎 | Api（messaging）、B1Admin、B1App |
| [实时架构](../realtime) | 支撑聊天、在线状态与应用内推送的 WebSocket 传输框架 | Api（messaging）、所有 Web 应用 |
| [Web 推送通知](../web-push) | 浏览器推送渠道：VAPID 密钥、订阅存储、消息投递 | Api（messaging）、所有 Web 应用 |
| [捐赠](./giving) | 支付服务商与网关、捐赠流程、基金/批次、网关 Webhook | Api（giving）、apphelper、B1App、B1Admin |
| [活动报名](./registrations) | 报名商业模型：参会者类型、附加选项、折扣码、经由捐赠网关的付款，以及候补名单 | Api（content + giving）、B1App、B1Admin |
| [签到](./check-ins) | 自助终端与自助签到、出勤数据模型、房间路由、儿童安全层、标签打印 | B1Checkin、B1App、B1Admin、Api（attendance + membership） |
| [网站构建器](./website-builder) | 页面/版块/元素树、元素类型契约与渲染器、博客、访问受限页面、SEO 以及 AI 生成 | Api（content）、AskApi、helpers/apphelper、B1Admin、B1App |
| [网站路由与多站点](./websites) | 请求如何解析到某个教会及具体站点、多站点 `siteId` 数据模型，以及 Caddy 自定义域名边缘 | B1App、Api（membership + content）、B1Admin |
| [集成](./integrations) | 扩展接入面：OAuth、API 密钥、Webhook、内容提供方、MCP | Api、共享库、外部应用 |
| [审计日志与可撤销批次](./audit-log) | 在控制器统一入口处对所有变更默认开启的审计，以及使导入和批量操作可撤销的批次层 | Api（所有模块）、B1Admin、B1Transfer |
| [MinistryStuff](./ministrystuff) | 付费存储与短信额度服务：共享 JWT 身份认证、服务密钥 S2S、短信与存储服务商接入点、Stripe 计费 | MinistryStuffApi、MinistryStuffWeb、Api（content + messaging）、texting/apihelper 包、B1Admin |

:::tip
当某项改动改变了这些系统之一的工作方式——而不仅仅是某个应用内某个页面的改动——应在同一次工作中同步更新此处对应的系统地图。这样才能让本节始终作为新贡献者的第一站，值得信赖。
:::
