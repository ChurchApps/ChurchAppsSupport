---
title: "API 部署"
---

# API 部署

<div class="article-intro">

ChurchApps API 使用 Serverless Framework 部署为 AWS Lambda 函数。本页介绍暂存和生产环境的构建、部署和配置工作流程。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在本地配置好 API -- 参见[本地 API 配置](../api/local-setup)
- 在你的机器上配置 AWS 凭据
- 确保你有目标 AWS 账户的访问权限

</div>

## 构建

API 使用专用的 TypeScript 配置进行生产构建：

```bash
npm run build:prod
```

这使用 `tsconfig.prod.json` 为 Lambda 运行时编译项目。

## 部署

部署到暂存环境：

```bash
npm run deploy-staging
```

部署到生产环境：

```bash
npm run deploy-prod
```

## 创建的内容

每次 API 部署会创建或更新以下 AWS Lambda 函数：

| 函数 | 用途 |
|----------|---------|
| `web` | 通过 API Gateway 处理 HTTP 请求 |
| `socket` | WebSocket 连接处理器 |
| `timer15Min` | 每 15 分钟运行的定时任务 |
| `timerMidnight` | 每天午夜运行的定时任务 |

## 环境配置

在部署环境中，配置从 **AWS SSM Parameter Store** 读取，而非 `.env` 文件。这使得密钥不包含在部署包中，并允许无需重新部署即可更改配置。

:::warning
切勿将生产凭据提交到仓库。所有敏感配置应存储在 AWS SSM Parameter Store 中并在运行时访问。
:::

:::tip
要在不影响生产的情况下测试部署，请始终先使用 `npm run deploy-staging` 部署到暂存环境，验证更改后再推广到生产环境。
:::

## 相关文章

- **[本地 API 配置](../api/local-setup)** -- 为开发配置 API
- **[模块结构](../api/module-structure)** -- 了解 Lambda 函数架构
- **[Web 应用部署](./web-apps)** -- 部署前端应用
