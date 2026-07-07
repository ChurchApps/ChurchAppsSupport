---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API 是一个**模块化单体**——一个单一的代码库，为六个数据模块提供服务，每个模块都有自己的数据库。这种架构为您提供了微服务的组织优势（清晰的边界、独立的数据存储）以及单一部署的运营简便性。

</div>

## 模块

| 模块 | 用途 |
|--------|---------|
| **Membership** | 人员、小组、家庭、权限 |
| **Attendance** | 服务、会话、签到记录 |
| **Content** | 页面、部分、元素、流媒体 |
| **Giving** | 捐赠、基金、支付处理 |
| **Messaging** | 对话、通知、电子邮件 |
| **Doing** | 任务、计划、分配 |

## 技术栈

- **Runtime:** Node.js 22.x 搭配 TypeScript（ES 模块）
- **Framework:** Express
- **依赖注入:** Inversify（基于装饰器的路由）
- **数据库:** MySQL——每个模块一个数据库，每个都有自己的连接池
- **认证:** 通过 `CustomAuthProvider` 的基于 JWT 的认证
- **部署:** AWS Lambda 通过 Serverless Framework v3

## 端口

| 协议 | 端口 | 描述 |
|----------|------|-------------|
| HTTP | `8084` | 主 REST API |
| WebSocket | `8087` | 实时套接字连接 |

## Lambda 函数

部署到 AWS 时，API 以六个 Lambda 函数运行：

- **`web`** ——处理所有 HTTP 请求
- **`socket`** ——管理 WebSocket 连接
- **`timer15Min`** ——每 30 分钟运行一次以发送电子邮件通知（名称是历史性的）
- **`timerMidnight`** ——每天运行一次以处理摘要电子邮件和维护任务
- **`timerScheduledTasks`** ——每天运行一次以处理到期的自动化和逾期工作流处理
- **`timerWebhooks`** ——每分钟运行一次以传递排队的出站 Webhook

## 共享库

API 依赖于两个 ChurchApps 共享包：

- **[`@churchapps/helpers`](../shared-libraries/helpers)** ——基本实用程序（DateHelper、ApiHelper 等）
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** ——Express 服务器实用程序，包括认证、数据库助手和 AWS 集成

:::info
API 使用 ES 模块（`package.json` 中的 `"type": "module"`）。确保您的导入使用 ES 模块语法。
:::

## 本节内容

- **[本地设置](./local-setup)** ——克隆、配置和本地运行 API
- **[数据库](./database)** ——数据库按模块架构、模式脚本和数据访问模式
- **[模块结构](./module-structure)** ——控制器、资源库、模型和认证
- **[API 密钥](./api-keys)** ——用于脚本和连接器的个人访问令牌
- **[连接应用（OAuth）](./connected-apps)** ——用于第三方应用的多租户 OAuth 流程
- **[Webhook](./webhooks)** ——将事件通知推送到外部系统
- **[MCP 服务器](./mcp)** ——向 AI 助手公开 API 的模型上下文协议端点
- **[端点参考](./endpoints/)** ——所有模块的完整 REST API 文档
