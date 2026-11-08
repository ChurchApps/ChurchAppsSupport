---
title: "项目概览"
description: "按类别列出所有 ChurchApps 代码仓库，包括框架、开发端口、数据库，以及共享 @churchapps 包如何将它们连接起来，见开发者环境搭建文档。"
---

# 项目概览

<div class="article-intro">

ChurchApps 由大约 20 个独立的代码仓库组成，每个仓库都发布在 [ChurchApps GitHub 组织](https://github.com/ChurchApps)下。本页按类别完整列出所有项目，并说明它们的框架、端口及相互关系。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装您想要参与的项目类别所需的[前置条件](./prerequisites.md)

</div>

## 后端 API

所有 API 均使用 Node.js、Express 和 TypeScript 构建，并通过 Serverless Framework 部署到 AWS Lambda。

| 项目 | 用途 | 开发端口 | 数据库 |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | 核心模块化单体，涵盖会员、考勤、内容、奉献、消息和事工 | 8084 | 每个模块使用独立的 MySQL 数据库（共 6 个） |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church 后端 | -- | 单个 `lessons` MySQL 数据库 |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | 基于 OpenAI 的 AI 查询工具 | -- | -- |

:::info
核心 **Api** 项目是一个模块化单体。每个模块（会员、考勤、内容、奉献、消息、事工）都有自己的数据库，并可通过 `/membership` 或 `/giving` 等子路径访问。在生产环境中，这些模块以独立的 Lambda 函数形式部署，并位于 API Gateway 之后。
:::

## Web 应用

| 项目 | 框架 | 开发端口 | 用途 |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | 教会管理仪表板 |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | 面向公众的教会成员应用 |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church 前端 |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | 数据导入/导出工具 |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | 静态 | -- | 静态教会宣传册网站 |

## 移动应用

所有移动应用均使用 React Native 与 Expo 构建。

| 项目 | 用途 | 关键版本 |
|---------|---------|--------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | 签到自助终端应用 | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV 课程展示 | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | 内容播放（包括电视操作系统） | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow 的移动遥控器 | Expo |

## 桌面应用

| 项目 | 技术栈 | 用途 |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | 演示和敬拜软件 |

## 共享库

共享代码以 `@churchapps` 作用域发布到 npm，并作为常规 npm 依赖被上述项目使用。所有共享包都位于同一个代码仓库 —— [Packages](https://github.com/ChurchApps/Packages) 中，该仓库以 Yarn workspace 方式管理，并通过 changesets 发布。

| 包 | 用途 | 使用者 |
|---------|---------|--------------|
| `@churchapps/helpers` | 基础工具和共享的 TypeScript 接口（DateHelper、ApiHelper、CurrencyHelper 等） | 所有项目 |
| `@churchapps/apihelper` | Express 服务器工具（认证、基础控制器、数据库访问、AWS 集成） | 所有 API |
| `@churchapps/apphelper` | React 组件库，包含用于登录、捐赠、表单、Markdown 和网站构建的子路径模块 | 所有 Web 应用 |
| `@churchapps/content-providers` | 第三方内容提供方抽象层（Lessons.church、Planning Center、Dropbox 等） | Api、B1Admin、B1App、FreePlay |
| `@churchapps/integration-sdk` | B1.church 集成工具包：Webhook、REST 客户端、OAuth | 外部集成开发者 |
| `@churchapps/texting` | 短信服务提供方抽象层 | Api |

有关工作区设置和发布流程，请参阅[共享库](../shared-libraries/index.md)。

## 项目关系

```
前端应用                   共享库                     后端 API
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

所有前端应用都依赖 `@churchapps/helpers`。Web 应用还额外依赖 `@churchapps/apphelper` 包。所有后端 API 都同时依赖 `@churchapps/helpers` 和 `@churchapps/apihelper`。

## 后续步骤

- **[环境变量](./environment-variables.md)** -- 配置您的 `.env` 文件以连接 API
- **[API 本地搭建](../api/local-setup.md)** -- 在本地设置后端 API
