---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper` 包为所有 ChurchApps 网络应用提供共享的 React 组件和实用工具。它是一个单一发布的包，通过子路径入口点公开功能模块——登录、捐赠、表单、markdown 和网站/CMS 功能——以及一组核心共享组件和助手。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js** 和 **Git**——查看[先决条件](../setup/prerequisites)
- 熟悉[包工作区](./index.md)设置和发布流程

</div>

## 入口点

包在其 `package.json` 中定义子路径导出，因此每个功能模块都可以独立导入：

| 入口点 | 内容 |
|-------------|----------|
| `@churchapps/apphelper` | 核心组件、助手和钩子 |
| `@churchapps/apphelper/login` | 登录和注册 UI |
| `@churchapps/apphelper/donations` | 给予和捐赠组件 |
| `@churchapps/apphelper/forms` | 表单提交组件 |
| `@churchapps/apphelper/markdown` | Markdown 和 HTML 编辑器和渲染器 |
| `@churchapps/apphelper/website` | 网站构建器和 CMS 组件 |

## 谁消费什么

在改变共享导出前，检查哪些应用导入它：

| 导出区域 | 它提供什么 | 消费者 |
|---|---|---|
| 根——核心组件和钩子 | `DisplayBox`、`InputBox`、`Loading`、`PageHeader`、`PersonAvatar`、`SmallButton`、`ErrorMessages`、`ExportLink`、`useMountedState`，加上重新导出的 `@churchapps/helpers` 实用工具（`ApiHelper`、`DateHelper`、`Locale`、`UserHelper` 等） | B1Admin、B1App、B1Transfer、LessonsApp |
| 根——站点 chrome | `SiteHeader`（导航、用户菜单、通知） | B1Admin、B1Transfer、LessonsApp |
| 根——管理内容编辑器 | `ImageEditor`、`HelpIcon` | B1Admin |
| 根——实时管道 | `SocketHelper`、`SubscriptionManager`、`NotificationService` | B1Admin、B1App |
| 根——聊天/存在存储 | `ConversationStore`、`PresenceStore` | B1App |
| 根——笔记和消息 UI | `Notes`（人员/任务上的员工笔记）；`AddNote`、`SubscriptionToggle`（成员消息） | B1Admin（`Notes`）、B1App（`AddNote`、`SubscriptionToggle`） |
| 根——课程特定 | `AnalyticsHelper`、`FloatingSupport`、`SupportModal` | LessonsApp |
| `./login` | `LoginPage`、`LogoutPage` | B1Admin、B1App、B1Transfer、LessonsApp |
| `./markdown` | `MarkdownEditor`、`MarkdownPreviewLight`（共享）；`MarkdownPreview`、`HtmlEditor`（管理内容编辑） | B1Admin、B1App、LessonsApp |
| `./donations` | `MultiGatewayDonationForm`、`RecurringDonations`、`PaymentMethods`、`StripePaymentMethod`、`DonationHelper`/`getPaymentProvider`（共享）；`FundDonations`（仅管理） | B1Admin、B1App |
| `./forms` | `FormSubmissionEdit`（当表单的 `displayMode` 为 `conversational` 时呈现 `ConversationalForm`） | B1Admin、B1App |
| `./website` | 编辑器和渲染器（`Element` + 通过 `ElementRegistry` 解析的每个类型渲染器、`StyleHelper`、`DroppableArea`、`DraggableWrapper`、`Theme`、`YoutubeBackground`、`SectionDivider`/`parseDividerConfig`）共享的页面渲染核心；站点范围小部件（`AnnouncementBanner`、`Launcher` + 它们的 `parse*Config` 助手）；仅由公开渲染器使用的 `Animate`、`ElementBlock`、`NonAuthDonationWrapper`、`SermonElement` | B1Admin（编辑器）、B1App（编辑器组件 + 渲染器） |

B1Transfer 和 LessonsApp 仅使用根和 `login` 入口点——`donations`、`forms` 和 `website` 子路径今天完全由 B1Admin 和 B1App 消费。

## 本地开发设置

此包位于[包](https://github.com/ChurchApps/Packages)工作区中，与其他共享库一起：

1. 克隆工作区：

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. 在工作区根处安装依赖：

   ```bash
   cd Packages && yarn install
   ```

3. 从包目录启动 Vite 操场：

   ```bash
   cd apphelper && yarn dev
   ```

   操场开发服务器在 `http://localhost:3001` 启动。首先复制 `playground/dotenv.sample` 到 `playground/.env` 并填写所需值。

要构建包以供消费（编译到 `dist/` 并复制区域设置/CSS 资产），运行 `yarn workspace @churchapps/apphelper build`——或在根处运行 `yarn build` 以按依赖顺序构建工作区中的每个包。要在消费应用中测试未发布的构建，请使用临时 Yarn 门户——查看[针对消费应用的本地开发](./index.md#local-development-against-a-consuming-app)。

:::tip
操场是开发和测试 AppHelper 组件的最快方式。它热重载 Vite 开发服务器，所以您可以实时看到更改。
:::

## 发布

发布通过变更集进行：在根处每次更改都运行 `yarn changeset`，准备发布时运行 `yarn publish-all`。查看[共享库概述](./index.md#releasing-with-changesets)了解完整流程。

:::warning
永远不要移除或重命名导出，直到替换已发布且每个消费者已迁移——在合并移除前在所有消费仓库中搜索。
:::

## 相关文章

- **[Helpers](./helpers)**——与 AppHelper 一起使用的基本实用工具包
- **[网络应用](../web-apps/)**——消费此包的网络应用
- **[共享库概述](./index.md)**——工作区设置、发布流程和本地链接工作流
