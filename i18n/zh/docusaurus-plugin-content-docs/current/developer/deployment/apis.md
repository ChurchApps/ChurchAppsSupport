---
title: "API 部署"
---

# API 部署

<div class="article-intro">

ChurchApps API 以 AWS Lambda 函数的形式部署，使用 Serverless Framework 进行管理。本页介绍演示（demo）和正式（production）环境的构建、部署和配置流程。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在本地设置 API —— 参见[本地 API 设置](../api/local-setup)
- 在您的机器上配置 AWS 凭据
- 确保您有权访问目标 AWS 账户

</div>

## 构建

API 使用专用的 TypeScript 配置进行生产构建：

```bash
npm run build:prod
```

此命令使用 `tsconfig.prod.json` 为 Lambda 运行时编译项目。

## 部署

部署到演示环境：

```bash
npm run deploy-demo
```

部署到正式环境：

```bash
npm run deploy-prod
```

实际上，API 由 GitHub Actions 部署：**Deploy Demo** 会在每次推送到 `main` 分支时运行，**Deploy Prod** 则需手动启动（workflow dispatch）。目前已不再有预发布（staging）环境。

## 数据库迁移

**Deploy Prod** 会在部署过程中应用待处理的数据库迁移。正式环境的数据库仅接受来自 VPC 内部的连接，因此在 `serverless deploy` 完成后，工作流会调用 `migrate` Lambda（`api-Prod-migrate`），由它运行所有模块的待处理迁移，并返回 `{ ok, environment, modules }`。如果任何模块失败或被拒绝（例如某个数据库没有迁移历史记录），该任务将失败，从而确保数据库结构永远不会落后于代码。**Rollback Prod** 只会回滚 Lambda 代码；迁移会保持已应用状态，因此请保持迁移为增量式（additive）。有关检查状态或手动运行迁移的方法，请参阅 [服务器管理 —— 数据库迁移](../server-admin#database-migrations)。

## 创建的资源

每次 API 部署都会创建或更新以下 AWS Lambda 函数：

| 函数 | 用途 |
|----------|---------|
| `web` | 通过 API Gateway 处理 HTTP 请求 |
| `socket` | WebSocket 连接处理程序 |
| `timer15Min` | 每 30 分钟运行一次的计划任务（名称为历史遗留） |
| `timerMidnight` | 每天午夜运行的计划任务 |
| `migrate` | 应用待处理的数据库迁移；由 Deploy Prod 工作流调用 |

## 环境配置

在已部署的环境中，配置从 **AWS SSM Parameter Store** 读取，而不是 `.env` 文件。这样可以将机密信息排除在部署包之外，并且无需重新部署即可更改配置。

:::warning
切勿将正式环境的凭据提交到代码仓库。所有敏感配置都应存储在 AWS SSM Parameter Store 中，并在运行时读取。
:::

:::tip
每次合并到 `main` 都会先部署到演示环境。在运行 Deploy Prod 之前，请先在演示环境中检查您的改动（例如在 [demo.b1.church](https://demo.b1.church) 上）。
:::

## 相关文章

- **[本地 API 设置](../api/local-setup)** —— 为开发配置 API
- **[模块结构](../api/module-structure)** —— 了解 Lambda 函数架构
- **[Web 应用部署](./web-apps)** —— 部署前端应用
