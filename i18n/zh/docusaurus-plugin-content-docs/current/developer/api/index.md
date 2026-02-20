---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API 是一个**模块化单体应用** -- 一个单一代码库服务六个独立的模块，每个模块有自己的数据库。这种架构既提供了微服务的组织优势（清晰的边界、独立的数据存储），又保持了单一部署的运维简便性。

</div>

## 模块

| 模块 | 用途 |
|--------|---------|
| **Membership** | 人员、群组、家庭、权限 |
| **Attendance** | 礼拜、场次、签到记录 |
| **Content** | 页面、区块、元素、流媒体 |
| **Giving** | 捐款、基金、支付处理 |
| **Messaging** | 会话、通知、邮件 |
| **Doing** | 任务、计划、分配 |

## 技术栈

- **运行时：** Node.js 22.x，使用 TypeScript（ES 模块）
- **框架：** Express
- **依赖注入：** Inversify（基于装饰器的路由）
- **数据库：** MySQL -- 每个模块一个数据库，每个有自己的连接池
- **认证：** 基于 JWT 的认证，通过 `CustomAuthProvider` 实现
- **部署：** 通过 Serverless Framework v3 部署到 AWS Lambda

## 端口

| 协议 | 端口 | 描述 |
|----------|------|-------------|
| HTTP | `8084` | 主 REST API |
| WebSocket | `8087` | 实时 Socket 连接 |

## Lambda 函数

部署到 AWS 时，API 作为四个 Lambda 函数运行：

- **`web`** -- 处理所有 HTTP 请求
- **`socket`** -- 管理 WebSocket 连接
- **`timer15Min`** -- 每 15 分钟运行一次，用于邮件通知
- **`timerMidnight`** -- 每天运行一次，用于摘要邮件和维护任务

## 共享库

API 依赖两个 ChurchApps 共享包：

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- 基础工具（DateHelper、ApiHelper 等）
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express 服务器工具，包括认证、数据库助手和 AWS 集成

:::info
API 使用 ES 模块（`package.json` 中的 `"type": "module"`）。请确保你的导入使用 ES 模块语法。
:::

## 本节内容

- **[本地配置](./local-setup)** -- 克隆、配置并在本地运行 API
- **[数据库](./database)** -- 按模块分库架构、架构脚本和数据访问模式
- **[模块结构](./module-structure)** -- 控制器、仓储、模型和认证
- **[端点参考](./endpoints/)** -- 所有模块的完整 REST API 文档
