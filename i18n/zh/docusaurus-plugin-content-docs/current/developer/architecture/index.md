---
title: "架构"
---

# 架构

<div class="article-intro">

这些页面是跨仓库系统地图：它们记录核心 ChurchApps 系统如何端到端工作 -- 跨应用、API 模块和共享库 -- 而不是任何单一项目如何设置。在更改系统行为前读它们；读[设置](../setup/)获取项目运行和[API 部分](../api/)用于端点级参考。

</div>

## 生态系统一览

ChurchApps 是约 20 个独立仓库（不是单仓库）。客户应用通过 HTTPS 和 WebSocket 与少数后端 API 通话，并通过在 `@churchapps` 范围下发布的 npm 包共享代码。

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

两个结构规则塑造本部分中记录的所有内容：

1. **模块是隔离的。** 每个 Api 模块拥有其数据库和其表；其他模块和应用仅通过其 REST 端点到达其数据。看[模块结构](../api/module-structure)。
2. **共享代码以 npm 包的形式发送。** 应用不导入彼此的源；任何重用都通过 `@churchapps/helpers`、`@churchapps/apphelper` 或 `@churchapps/apihelper` 跨越仓库边界。看[共享库](../shared-libraries/)。

## 系统地图

| 页面 | 它覆盖什么 | 跨度 |
|------|----------------|-------|
| [通知和提醒](./notifications) | 如何任何东西告诉人某事：两个调度门、频道升级链和提醒引擎 | Api（消息），B1Admin，B1App |
| [实时架构](../realtime) | 聊天、呈现和应用内传递后的 WebSocket 交付框架 | Api（消息），所有网络应用 |
| [网络推送通知](../web-push) | 浏览器推送频道：VAPID 密钥、订阅存储、传递 | Api（消息），所有网络应用 |
| [捐赠](./giving) | 支付提供商和网关、捐赠流、资金/批次、网关 webhook | Api（捐赠），apphelper，B1App，B1Admin |
| [活动注册](./registrations) | 注册商务模型：与会者类型、选择、折扣代码、通过捐赠网关的付款以及等候名单 | Api（内容 + 捐赠），B1App，B1Admin |
| [签到](./check-ins) | 亭和自助签到、出席数据模型、房间路由、儿童安全层、标签打印 | B1Checkin，B1App，B1Admin，Api（出席 + 成员） |
| [网站生成器](./website-builder) | 页面/部分/元素树、元素类型合同和呈现器、博客、访问限制页面、SEO 和 AI 生成 | Api（内容），AskApi，helpers/apphelper，B1Admin，B1App |
| [网站路由和多站点](./websites) | 请求如何解析到教会和特定站点、多站点 `siteId` 数据模型以及 Caddy 自定义域边缘 | B1App，Api（成员 + 内容），B1Admin |
| [集成](./integrations) | 扩展表面：OAuth、API 密钥、webhook、内容提供商、MCP | Api，共享库，外部应用 |
| [审计日志和可撤销批次](./audit-log) | 在控制器阻塞点上每个突变的默认启用审计，以及使导入和批量操作可撤销的批层 | Api（所有模块），B1Admin，B1Transfer |
| [MinistryStuff](./ministrystuff) | 付费存储和短信积分服务：共享 JWT 身份、服务密钥 S2S、短信和存储提供商接缝、Stripe 计费 | MinistryStuffApi，MinistryStuffWeb，Api（内容 + 消息），短信/apihelper 包，B1Admin |
| [自带存储](./byos-storage) | 教会链接 Google Drive、Dropbox、OneDrive 或 S3 兼容桶用于过免费 100MB 的上传：OAuth 连接、每提供商上传形状、公共下载重定向 | Api（内容 + 成员），helpers/apphelper 包，B1Admin，B1App |

:::tip
当改变改变这些系统之一的工作方式时 -- 不仅仅是应用内一个页面 -- 此处的匹配系统地图应在相同努力中更新。这保持本部分值得信赖为新贡献者的首站。
:::
