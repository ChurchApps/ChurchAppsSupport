---
title: "项目概览"
---

# 项目概览

<div class="article-intro">

ChurchApps 由大约 20 个独立的仓库组成，全部发布在 [ChurchApps GitHub 组织](https://github.com/ChurchApps) 下。本页面提供按类别组织的所有项目的完整清单，以及它们的框架、端口和关系。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 为您想要参与的项目类别安装 [前提条件](./prerequisites)

</div>

## 后端 API

所有 API 均使用 Node.js、Express 和 TypeScript 构建，并通过 Serverless Framework 部署到 AWS Lambda。

| 项目 | 用途 | 开发端口 | 数据库 |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | 涵盖 membership、attendance、content、giving、messaging 和 doing 的核心模块化单体 | 8084 | 每个模块一个独立的 MySQL 数据库（共 6 个） |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church 后端 | -- | 单个 `lessons` MySQL 数据库 |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | 由 OpenAI 驱动的 AI 查询工具 | -- | -- |

:::info
核心 **Api** 项目是一个模块化单体。每个模块（membership、attendance、content、giving、messaging、doing）都有自己的数据库，可通过子路径（如 `/membership` 或 `/giving`）访问。在生产环境中，它们作为 API Gateway 后面的独立 Lambda 函数公开。
:::

## Web 应用

| 项目 | 框架 | 开发端口 | 用途 |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | 教会管理仪表板 |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | 面向公众的教会成员应用 |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church 前端 |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | 数据导入/导出工具 |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | 静态 | -- | 教会静态宣传网站 |

## 移动应用

所有移动应用使用 React Native 配合 Expo。

| 项目 | 用途 | 关键版本 |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | iOS 和 Android 教会成员应用 | Expo 54、React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | 签到亭应用 | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV 课程显示 | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | 内容播放（包括 TV OS） | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow 的移动遥控器 | Expo |

## 桌面

| 项目 | 技术栈 | 用途 |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | 演示和敬拜软件 |

## 共享库

共享代码发布到 npm 的 `@churchapps` 作用域下，并由上述项目作为常规 npm 依赖项使用。所有共享包位于单个仓库中——[Packages](https://github.com/ChurchApps/Packages)——作为 Yarn 工作区管理并使用 changesets 发布。

| 包 | 用途 | 使用者 |
|---------|---------|---------|
| `@churchapps/helpers` | 基础工具和共享 TypeScript 接口（DateHelper、ApiHelper、CurrencyHelper 等） | 所有项目 |
| `@churchapps/apihelper` | Express 服务器工具（认证、基础控制器、数据库访问、AWS 集成） | 所有 API |
| `@churchapps/apphelper` | React 组件库，包含用于登录、捐赠、表单、markdown 和网站构建的子路径模块 | 所有 Web 应用 |
| `@churchapps/content-providers` | 第三方内容提供商抽象（Lessons.church、Planning Center、Dropbox 等） | Api、B1Admin、B1App、FreePlay |
| `@churchapps/integration-sdk` | B1.church 集成工具包：Webhook、REST 客户端、OAuth | 外部集成开发者 |
| `@churchapps/texting` | SMS 提供商抽象 | Api |

参阅 [共享库](../shared-libraries/) 了解工作区设置和发布工作流程。

## 项目关系

```
前端应用              共享库                  后端 API
--------------        ----------------       -----------
B1Admin      ──────┐
B1App        ──────┤   @churchapps/helpers ◄─── Api
LessonsApp   ──────┼──► @churchapps/apphelper    LessonsApi
B1Mobile     ──────┤                             AskApi
FreeShow     ──────┘   @churchapps/apihelper ◄──┘
```

所有前端应用依赖于 `@churchapps/helpers`。Web 应用还额外依赖于 `@churchapps/apphelper` 包。所有后端 API 同时依赖于 `@churchapps/helpers` 和 `@churchapps/apihelper`。

## 后续步骤

- **[环境变量](./environment-variables)** ——配置您的 `.env` 文件以连接到 API
- **[API 本地设置](../api/local-setup)** ——在本地设置后端 API
