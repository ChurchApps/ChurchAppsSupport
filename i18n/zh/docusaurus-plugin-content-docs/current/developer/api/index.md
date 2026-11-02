---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API 是一个**模块化单体（modular monolith）**——一个代码库同时为六个数据模块提供服务，每个模块都有自己的数据库。这种架构既具备微服务的组织优势（边界清晰、数据存储相互独立），又保持了单次部署的运维简便性。

</div>

## 模块

| 模块 | 用途 |
|--------|------|
| **Membership**（会员） | 人员、小组、家庭、权限 |
| **Attendance**（出勤） | 礼拜、场次、签到记录 |
| **Content**（内容） | 页面、区块、元素、直播 |
| **Giving**（奉献） | 奉献、基金、支付处理 |
| **Messaging**（消息） | 会话、通知、电子邮件 |
| **Doing**（服事） | 任务、计划、安排 |

## 技术栈

- **运行时：** Node.js 24.x，使用 TypeScript（ES 模块）
- **框架：** Express
- **依赖注入：** Inversify（基于装饰器的路由）
- **数据库：** MySQL —— 每个模块一个数据库，每个数据库拥有自己的连接池
- **身份验证：** 通过 `CustomAuthProvider` 实现的基于 JWT 的身份验证
- **部署：** 使用 Serverless Framework v3 部署到 AWS Lambda

## 端口

| 协议 | 端口 | 说明 |
|----------|------|-------------|
| HTTP | `8084` | 主 REST API |
| WebSocket | `8087` | 实时套接字连接 |

## Lambda 函数

部署到 AWS 时，API 以六个 Lambda 函数运行：

- **`web`** —— 处理所有 HTTP 请求
- **`socket`** —— 管理 WebSocket 连接
- **`timer15Min`** —— 每 30 分钟运行一次，用于发送电子邮件通知（名称沿用历史命名）
- **`timerMidnight`** —— 每天运行一次，用于发送摘要邮件和维护任务
- **`timerScheduledTasks`** —— 每天运行一次，用于处理到期的自动化和逾期的工作流
- **`timerWebhooks`** —— 每分钟运行一次，用于投递排队中的出站 webhook

## 共享库

API 依赖两个 ChurchApps 共享包：

- **[`@churchapps/helpers`](../shared-libraries/helpers)** —— 基础工具（DateHelper、ApiHelper 等）
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** —— Express 服务器工具，包括身份验证、数据库辅助工具和 AWS 集成

:::info
API 使用 ES 模块（`package.json` 中为 `"type": "module"`）。请确保你的导入语句使用 ES 模块语法。
:::

## 本节内容

- **[本地设置](./local-setup)** —— 在本地克隆、配置并运行 API
- **[数据库](./database)** —— 每个模块一个数据库的架构、建表脚本和数据访问模式
- **[模块结构](./module-structure)** —— 控制器、仓储、模型和身份验证
- **[API 密钥](./api-keys)** —— 用于脚本和连接器的个人访问令牌
- **[已连接的应用（OAuth）](./connected-apps)** —— 第三方应用的多租户 OAuth 流程
- **[Webhooks](./webhooks)** —— 向外部系统推送事件通知
- **[MCP 服务器](./mcp)** —— 向 AI 助手开放 API 的模型上下文协议（Model Context Protocol）端点
- **[端点参考](./endpoints/)** —— 所有模块完整的 REST API 文档
