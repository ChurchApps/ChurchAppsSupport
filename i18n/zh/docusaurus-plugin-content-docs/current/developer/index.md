---
title: "开发者文档"
description: "了解 ChurchApps 开发者文档的内容：本地环境搭建、API 与 Web 应用指南、共享库、移动端构建，以及开源项目的部署方法。"
---

# 开发者文档

<div class="article-intro">

ChurchApps 是由约 20 个开源项目组成的集合，共同提供一套完整的教会管理平台。这些项目涵盖后端 API、Web 应用、移动应用、桌面应用和共享库，全部使用 TypeScript 编写。本节提供搭建本地开发环境并开始参与贡献所需的全部内容。

</div>

## 架构概览

这些项目是**独立的代码仓库**（而非单体仓库）。共享代码以 `@churchapps/*` 作用域发布到 npm，并作为常规依赖项被引用。这意味着你无需克隆整个生态系统，即可只针对单个项目进行开发。

主要特点：

- **语言：** 全程使用 TypeScript
- **后端：** Node.js / Express API，通过 Serverless Framework 部署到 AWS Lambda
- **Web：** React 19（Vite 和 Next.js）、Material-UI 7
- **移动端：** React Native 与 Expo
- **数据库：** MySQL 8.0，每个 API 模块对应一个数据库

## 本节内容

- **[设置](./setup/index.md)** —— 本地开发环境、前置条件和配置
  - [前置条件](./setup/prerequisites.md) —— 所需的工具和软件
  - [项目概览](./setup/project-overview.md) —— 所有项目一览
  - [环境变量](./setup/environment-variables.md) —— 配置 `.env` 文件
- **[API](./api/index.md)** —— 核心 API 的本地设置、数据库初始化和模块结构
- **[Web 应用](./web-apps/index.md)** —— 在本地运行 B1Admin、B1App 和 LessonsApp
- **[移动应用](./mobile/index.md)** —— 构建 B1Checkin 及其他 Expo 应用
- **[共享库](./shared-libraries/index.md)** —— 使用 Helpers、ApiHelper 和 AppHelper
- **[部署](./deployment/index.md)** —— 部署 API、Web 应用和移动应用
- **[FreePlay 内容提供方](./freeplay-content-provider.md)** —— 将你的课程库与 FreePlay 集成

## 社区与资源

| 资源 | 链接 |
|----------|------|
| GitHub 组织 | [github.com/ChurchApps](https://github.com/ChurchApps) |
| 问题跟踪 | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack 社区 | [加入 Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
开始参与贡献最快的方式，是选择一个 Web 应用（例如 B1Admin），将其指向共享的**演示 API**，然后直接开始修改前端。无需任何数据库或 API 设置。
:::
