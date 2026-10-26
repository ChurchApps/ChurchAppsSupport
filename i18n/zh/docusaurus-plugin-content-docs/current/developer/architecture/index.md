---
title: "架构"
---

# 架构

<div class="article-intro">

这些页面是跨代码仓库的系统地图：它们端到端地记录核心 ChurchApps 系统的工作方式，涵盖各应用、API 模块和共享库，而不是记录某个单独项目的设置方法。在修改某个系统的行为之前，请先阅读这些页面；如需让项目运行起来，请阅读[设置](../setup/)；如需端点级别的参考，请查阅 [API 部分](../api/)。

</div>

## 生态系统概览

ChurchApps 由约 20 个相互独立的代码仓库组成（并非单体仓库）。客户端应用通过 HTTPS 和 WebSocket 与一小组后端 API 通信，并通过以 `@churchapps` 为作用域发布的 npm 包共享代码。

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

本节所记录的一切都建立在两条结构性规则之上：

1. **模块相互隔离。** 每个 Api 模块拥有自己的数据库和数据表；其他模块和应用只能通过其 REST 端点访问其数据。参见[模块结构](../api/module-structure)。
2. **共享代码以 npm 包形式发布。** 应用之间从不导入彼此的源代码；任何可复用的内容都通过 `@churchapps/helpers`、`@churchapps/apphelper` 或 `@churchapps/apihelper` 跨越代码仓库边界。参见[共享库](../shared-libraries/)。

## 系统地图

| 页面 | 涵盖内容 | 涉及范围 |
|------|----------------|-------|
| [通知与提醒](./notifications) | 系统如何告知某人某事：两个分发入口、渠道升级链以及提醒引擎 | Api（messaging）、B1Admin、B1App |
| [实时架构](../realtime) | 支撑聊天、在线状态和应用内投递的 WebSocket 投递框架 | Api（messaging）、所有 Web 应用 |
| [Web 推送通知](../web-push) | 浏览器推送渠道：VAPID 密钥、订阅存储、投递 | Api（messaging）、所有 Web 应用 |
| [奉献](./giving) | 支付服务商与网关、捐款流程、基金/批次、网关 webhook | Api（giving）、apphelper、B1App、B1Admin |
| [活动报名](./registrations) | 报名商务模型：参与者类型、选项、折扣码、通过奉献网关付款，以及候补名单 | Api（content + giving）、B1App、B1Admin |
| [签到](./check-ins) | 自助终端与自助签到、出勤数据模型、房间路由、儿童安全层、标签打印 | B1Checkin、B1App、B1Admin、Api（attendance + membership） |
| [网站构建器](./website-builder) | 页面/区块/元素树、元素类型契约与渲染器、博客、受访问控制的页面、SEO 以及 AI 生成 | Api（content）、AskApi、helpers/apphelper、B1Admin、B1App |
| [网站路由与多站点](./websites) | 请求如何解析到教会及具体站点、多站点 `siteId` 数据模型，以及 Caddy 自定义域名边缘层 | B1App、Api（membership + content）、B1Admin |
| [集成](./integrations) | 扩展接口：OAuth、API 密钥、webhook、内容提供方、MCP | Api、共享库、外部应用 |
| [审计日志与可撤销批处理](./audit-log) | 在控制器关键节点默认开启的所有变更审计，以及使导入和批量操作可撤销的批处理层 | Api（所有模块）、B1Admin、B1Transfer |
| [MinistryStuff](./ministrystuff) | 付费存储与短信额度服务：共享 JWT 身份、服务密钥 S2S、短信和存储服务商接缝、Stripe 计费 | MinistryStuffApi、MinistryStuffWeb、Api（content + messaging）、texting/apihelper 包、B1Admin |
| [自带存储（BYOS）](./byos-storage) | 教会可连接 Google Drive、Dropbox、OneDrive 或兼容 S3 的存储桶，以上传超过免费 100MB 的文件：OAuth 连接、各服务商的上传形式、公共下载重定向 | Api（content + membership）、helpers/apphelper 包、B1Admin、B1App |
| [内容公共库](./commons) | 跨产品用户生成内容所依托的共享资产/投稿核心，以及 B1Admin 服务器管理中唯一的仅限员工使用的审核队列 | Api（commons 模块）、B1Admin、WorshipCommons、Lessons.church、FreeShow |

:::tip
当某项变更改变了这些系统之一的工作方式（而不仅仅是某个应用内的一个页面）时，应在同一项工作中同步更新此处对应的系统地图。这能让本节始终可靠，成为新贡献者的首要参考。
:::

## 提案

这些文档描述的是供审阅的拟议工作，而非现有的产品行为。

| 提案 | 涵盖内容 |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | 教会自有账户、密钥、服务和电话号码；集成范围、同意、投递、估算以及发布检查 |
| [Twilio 教会入驻草案](./twilio-byok-onboarding-draft) | 拟议的 B1 注册表单设置、针对特定教会的活动示例，以及审批/运营检查清单 |
