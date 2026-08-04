---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API 是一个**模块化单体应用**——一个为六个数据模块提供服务的单一代码库,每个模块都有各自的数据库。这种架构既拥有微服务式的组织优势(清晰的边界、独立的数据存储),又保留了单一部署所带来的运维简便性。

</div>

## 模块

| 模块 | 用途 |
|--------|---------|
| **Membership** | 人员、小组、家庭、权限 |
| **Attendance** | 服务、场次、签到记录 |
| **Content** | 页面、板块、元素、流媒体 |
| **Giving** | 捐款、基金、支付处理 |
| **Messaging** | 对话、通知、邮件 |
| **Doing** | 任务、计划、分配 |

## 技术栈

- **运行时:** Node.js 22.x,搭配 TypeScript(ES 模块)
- **框架:** Express
- **依赖注入:** Inversify(基于装饰器的路由)
- **数据库:** MySQL——每个模块一个数据库,各自拥有独立的连接池
- **认证:** 通过 `CustomAuthProvider` 实现基于 JWT 的身份验证
- **部署:** 通过 Serverless Framework v3 部署到 AWS Lambda

## 端口

| 协议 | 端口 | 说明 |
|----------|------|-------------|
| HTTP | `8084` | 主 REST API |
| WebSocket | `8087` | 实时套接字连接 |

## Lambda 函数

部署到 AWS 时,API 以六个 Lambda 函数的形式运行:

- **`web`**——处理所有 HTTP 请求
- **`socket`**——管理 WebSocket 连接
- **`timer15Min`**——每 30 分钟运行一次,用于发送邮件通知(名称是历史遗留)
- **`timerMidnight`**——每天运行一次,用于摘要邮件和维护任务
- **`timerScheduledTasks`**——每天运行一次,处理到期的自动化任务及逾期工作流处理
- **`timerWebhooks`**——每分钟运行一次,投递排队中的出站 Webhook

## 共享库

API 依赖两个共享的 ChurchApps 包:

- **[`@churchapps/helpers`](../shared-libraries/helpers)**——基础工具(DateHelper、ApiHelper 等)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)**——Express 服务器工具,包括认证、数据库辅助函数和 AWS 集成

:::info
API 使用 ES 模块(`package.json` 中的 `"type": "module"`)。请确保你的导入语句使用 ES 模块语法。
:::

## 本节内容

- **[本地环境搭建](./local-setup)**——克隆、配置并在本地运行 API
- **[数据库](./database)**——按模块划分数据库的架构、数据库脚本和数据访问模式
- **[模块结构](./module-structure)**——控制器、仓储层、模型和身份验证
- **[API 密钥](./api-keys)**——供脚本和连接器使用的个人访问令牌
- **[已连接应用(OAuth)](./connected-apps)**——面向第三方应用的多租户 OAuth 流程
- **[Webhook](./webhooks)**——将事件通知推送到外部系统
- **[MCP 服务器](./mcp)**——向 AI 助手开放 API 的模型上下文协议(Model Context Protocol)端点
- **[端点参考](./endpoints/)**——所有模块的完整 REST API 文档
