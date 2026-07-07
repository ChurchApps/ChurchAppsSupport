---
title: "架构"
---

# 架构

<div class="article-intro">

这些页面是跨存储库系统映射：它们记录了一个核心ChurchApps系统如何端到端工作 — 跨应用、API模块和共享库 — 而不是任何单个项目的设置方式。在更改系统行为之前阅读它们；阅读[设置](../setup/)使项目运行，阅读[API部分](../api/)用于端点级参考。

</div>

## 生态系统一览

ChurchApps是约20个独立存储库（不是一个monorepo）。客户应用通过HTTPS和WebSocket与一小组后端API通信，并通过在`@churchapps`范围下发布的npm包共享代码。

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  客户端                        │            │  Api — 核心模块化整体（AWS Lambda）         │
│                                │            │                                              │
│  B1Admin    工作人员仪表板    │   HTTPS    │   membership    attendance    content        │
│  B1App      成员门户+         │ ─────────▶ │   giving        messaging     doing          │
│             教会网站           │            │                                              │
│  B1Checkin  签到信息亭         │ ◀───WS───▶ │   每个模块一个MySQL数据库（总共6个）       │
│  B1Mobile   （仅维护）         │            └──────────────────────────────────────────────┘
│  FreePlay   电视内容播放器     │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church后端             │
                │                             └──────────────────────────────────────────────┘
                │  通过npm共享代码（@churchapps/*）
                ▼
   helpers（跨应用接口）· apphelper（React组件）· apihelper（Express/服务器实用程序）
```

两个结构规则塑造了本部分记录的所有内容：

1. **模块被隔离。**每个Api模块拥有其数据库和表；其他模块和应用只通过其REST端点到达其数据。请参见[模块结构](../api/module-structure)。
2. **共享代码作为npm包发货。**应用永不导入彼此的源；任何重用的东西通过`@churchapps/helpers`、`@churchapps/apphelper`或`@churchapps/apihelper`跨越存储库边界。请参见[共享库](../shared-libraries/)。

## 系统映射

| 页面 | 它覆盖的内容 | 跨越 |
|------|----------------|-------|
| [通知和提醒](./notifications) | 任何东西如何告诉某人某事：两个调度门、频道升级链和提醒引擎 | Api（messaging）、B1Admin、B1App |
| [实时架构](../realtime) | WebSocket交付框架，在聊天、状态和应用内交付后面 | Api（messaging）、所有web应用 |
| [Web推送通知](../web-push) | 浏览器推送频道：VAPID密钥、订阅存储、交付 | Api（messaging）、所有web应用 |
| [赠与](./giving) | 支付提供商和网关、捐赠流程、基金/批次、网关webhook | Api（giving）、apphelper、B1App、B1Admin |
| [事件注册](./registrations) | 注册商业模式：参与者类型、选择、折扣代码、通过赠与网关的付款和候补名单 | Api（content+giving）、B1App、B1Admin |
| [签到](./check-ins) | 信息亭和自助签到、出勤数据模型、房间路由、儿童安全层、标签打印 | B1Checkin、B1App、B1Admin、Api（attendance+membership） |
| [网站建设者](./website-builder) | 页面/部分/元素树、元素类型合同和渲染器、博客、访问受限页面、SEO和AI生成 | Api（content）、AskApi、helpers/apphelper、B1Admin、B1App |
| [网站路由和多站点](./websites) | 请求如何解析到教会和特定站点、多站点`siteId`数据模型和Caddy自定义域边缘 | B1App、Api（membership+content）、B1Admin |
| [集成](./integrations) | 扩展表面：OAuth、API密钥、webhook、内容提供商、MCP | Api、共享库、外部应用 |
| [审计日志和可撤销批次](./audit-log) | 每个变更在控制器瓶颈处的默认启用审计，以及使导入和批量操作可撤销的批次层 | Api（所有模块）、B1Admin、B1Transfer |

:::tip
当一个改变改变了这些系统之一的工作方式 — 不只是一个应用内的页面 — 这里匹配的系统映射应该在同样的努力中更新。那保持这个部分作为新贡献者的首个停靠点值得信赖。
:::
