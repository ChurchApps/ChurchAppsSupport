---
title: "开发者文档"
---

# 开发者文档

<div class="article-intro">

ChurchApps 是一个由大约 20 个开源项目组成的集合，共同提供一个完整的教会管理平台。项目涵盖后端 API、Web 应用程序、移动应用程序、桌面应用程序和共享库——全部使用 TypeScript 编写。本部分提供了设置本地开发环境和开始贡献所需的一切内容。

</div>

## 架构概览

项目是**独立的代码仓库**（不是 monorepo）。共享代码发布到 npm 的 `@churchapps/*` 作用域下，并作为常规依赖项使用。这意味着您可以在不克隆整个生态系统的情况下处理单个项目。

主要特点：

- **语言：** 全面使用 TypeScript
- **后端：** Node.js / Express API，通过 Serverless Framework 部署到 AWS Lambda
- **Web：** React 19（Vite 和 Next.js），Material-UI 7
- **移动端：** React Native 配合 Expo
- **数据库：** MySQL 8.0，每个 API 模块一个数据库

## 本部分涵盖的内容

- **[设置](setup/)** -- 本地开发环境、前置条件和配置
  - [前置条件](setup/prerequisites) -- 所需的工具和软件
  - [项目概览](setup/project-overview) -- 所有项目一览
  - [环境变量](setup/environment-variables) -- 配置 `.env` 文件
- **[API](api/)** -- 核心 API 本地设置、数据库初始化和模块结构
- **[Web 应用](web-apps/)** -- 在本地运行 B1Admin、B1App 和 LessonsApp
- **[移动应用](mobile/)** -- 构建 B1Mobile 和其他 Expo 应用
- **[共享库](shared-libraries/)** -- 使用 Helpers、ApiHelper 和 AppHelper
- **[部署](deployment/)** -- 部署 API、Web 应用和移动应用

## 社区和资源

| 资源 | 链接 |
|----------|------|
| GitHub 组织 | [github.com/ChurchApps](https://github.com/ChurchApps) |
| 问题追踪器 | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack 社区 | [加入 Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
开始贡献的最快方式是选择一个 Web 应用（如 B1Admin），将其指向 **staging API**，然后开始进行前端更改。无需数据库或 API 设置。
:::
