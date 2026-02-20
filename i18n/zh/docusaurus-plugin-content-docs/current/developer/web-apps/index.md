---
title: "Web 应用"
---

# Web 应用

<div class="article-intro">

ChurchApps 包含三个 Web 应用，各自服务于不同的受众和目的。它们共享 React 19、TypeScript 和 Material-UI 7 的通用技术基础，但在构建工具和部署目标上有所不同。

</div>

## 应用一览

| 应用 | 用途 | 框架 | 开发端口 |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | 教会管理仪表板 | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | 面向公众的教会成员应用 | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | 课程内容管理 | Next.js 16 + React 19 | 3501 |

## 共享技术栈

所有三个 Web 应用都使用以下技术构建：

- **TypeScript** -- 端到端类型安全
- **React 19** -- UI 组件库
- **Material-UI 7** -- 设计系统和组件工具包
- **React Query 5** -- 服务端状态管理

## 共享组件

这些应用通过 `@churchapps/apphelper*` 系列包共享 UI 组件和工具：

| 包 | 用途 |
|---------|---------|
| `@churchapps/apphelper` | 核心共享 React 组件 |
| `@churchapps/apphelper-login` | 认证 UI 组件 |
| `@churchapps/apphelper-donations` | 捐赠和奉献表单 |
| `@churchapps/apphelper-forms` | 表单构建器组件 |
| `@churchapps/apphelper-markdown` | Markdown 渲染 |
| `@churchapps/apphelper-website` | 网站/CMS 组件 |

:::tip
有关在本地开发这些共享包的详细信息，请参见 [AppHelper](../shared-libraries/app-helper) 文档。
:::

## Postinstall 脚本

每个 Web 应用都有一个 `postinstall` 脚本，将 `@churchapps/apphelper` 的语言文件和 CSS 资源复制到项目中。这在 `npm install` 后会自动运行。

:::info
如果安装依赖后组件样式缺失，`postinstall` 脚本可能没有正确运行。你可以使用 `npm run postinstall` 手动触发。
:::

## 构建工具

这些应用使用两种不同的构建工具：

- **B1Admin** 使用 **Vite** -- 一个快速、现代的打包工具，适合单页应用
- **B1App** 和 **LessonsApp** 使用 **Next.js** -- 提供服务端渲染、基于文件的路由和优化的生产构建
