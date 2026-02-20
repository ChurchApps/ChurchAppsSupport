---
title: "项目概览"
---

# 项目概览

<div class="article-intro">

ChurchApps 由大约 20 个独立的仓库组成，全部发布在 [ChurchApps GitHub 组织](https://github.com/ChurchApps)下。本页面提供按类别组织的所有项目的完整清单，以及它们的框架、端口和关系。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 为您想要参与的项目类别安装[前置条件](./prerequisites)

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
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | 教会管理仪表板 |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | 面向公众的教会成员应用 |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church 前端 |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | 数据导入/导出工具 |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | 教会静态宣传网站 |

## 移动应用

所有移动应用使用 React Native 配合 Expo。

| 项目 | 用途 | 关键版本 |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | iOS 和 Android 教会成员应用 | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | 签到亭应用 | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV 课程显示 | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | 内容播放（包括 TV OS） | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow 的移动遥控器 | Expo |

## 桌面

| 项目 | 技术栈 | 用途 |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | 演示和敬拜软件 |

## 共享库

共享代码发布到 npm 的 `@churchapps` 作用域下。这些被上述项目作为常规 npm 依赖项使用。

| 包 | npm 名称 | 用途 | 使用者 |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | 基础工具（DateHelper、ApiHelper、CurrencyHelper 等） | 所有项目 |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Express 服务器工具（auth middleware、DB helpers、AWS 集成） | 所有 API |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | 包含 6 个包的 Workspace | React 组件库 | 所有 Web 应用 |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | YouTube、Vimeo 和本地内容提供者 | FreeShow, FreePlay, Api |

### AppHelper 子包

AppHelper 项目是一个发布六个包的 monorepo workspace：

| 包 | npm 名称 |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## 项目关系

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

所有前端应用依赖于 `@churchapps/helpers`。Web 应用还额外依赖于 `@churchapps/apphelper` 包。所有后端 API 同时依赖于 `@churchapps/helpers` 和 `@churchapps/apihelper`。

## 后续步骤

- **[环境变量](./environment-variables)** -- 配置 `.env` 文件以连接到 API
- **[API 本地设置](../api/local-setup)** -- 在本地设置后端 API
