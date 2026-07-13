---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper` 包为所有 ChurchApps Web 应用提供共享 React 组件和工具。它是单个发布的包，通过子路径入口点公开功能模块——登录、捐赠、表单、markdown 和网站/CMS 功能——以及一组核心共享组件和助手。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js** 和 **Git** ——请参阅 [前提条件](../setup/prerequisites)
- 熟悉 [Packages 工作区](./index.md) 的设置和发布流程

</div>

## 入口点

该包在其 `package.json` 中定义了子路径导出，因此每个功能模块都可以单独导入：

| 入口点 | 内容 |
|-------------|----------|
| `@churchapps/apphelper` | 核心组件、助手和 hook |
| `@churchapps/apphelper/login` | 登录和注册 UI |
| `@churchapps/apphelper/donations` | 奉献和捐赠组件 |
| `@churchapps/apphelper/forms` | 表单提交组件 |
| `@churchapps/apphelper/markdown` | Markdown 和 HTML 编辑器和渲染器 |
| `@churchapps/apphelper/website` | 网站构建器和 CMS 组件 |

## 谁消费什么

在更改共享导出之前，请检查哪些应用导入它：

| 导出区域 | 提供的内容 | 消费者 |
|---|---|---|
| 根——核心组件和 hook | `DisplayBox`、`InputBox`、`Loading`、`PageHeader`、`PersonAvatar`、`SmallButton`、`ErrorMessages`、`ExportLink`、`useMountedState`，加上重新导出的 `@churchapps/helpers` 工具（`ApiHelper`、`DateHelper`、`Locale`、`UserHelper` 等） | B1Admin、B1App、B1Transfer、LessonsApp |
| 根——站点框架 | `SiteHeader`（导航、用户菜单、通知） | B1Admin、B1Transfer、LessonsApp |
| 根——管理内容编辑器 | `ImageEditor`、`HelpIcon` | B1Admin |
| 根——实时管道 | `SocketHelper`、`SubscriptionManager`、`NotificationService` | B1Admin、B1App |
| 根——聊天/在线状态存储 | `ConversationStore`、`PresenceStore` | B1App |
| 根——笔记和消息 UI | `Notes`（人员/任务上的员工笔记）；`AddNote`、`SubscriptionToggle`（成员消息） | B1Admin（`Notes`）、B1App（`AddNote`、`SubscriptionToggle`） |
| 根——Lessons 特定 | `AnalyticsHelper`、`FloatingSupport`、`SupportModal` | LessonsApp |
| `./login` | `LoginPage`、`LogoutPage` | B1Admin、B1App、B1Transfer、LessonsApp |
| `./markdown` | `MarkdownEditor`、`MarkdownPreviewLight`（共享）；`MarkdownPreview`、`HtmlEditor`（管理内容编辑） | B1Admin、B1App、LessonsApp |
| `./donations` | `MultiGatewayDonationForm`、`RecurringDonations`、`PaymentMethods`、`StripePaymentMethod`、`DonationHelper`/`getPaymentProvider`（共享）；`FundDonations`（仅管理员） | B1Admin、B1App |
| `./forms` | `FormSubmissionEdit`（当表单的 `displayMode` 是 `conversational` 时渲染 `ConversationalForm`） | B1Admin、B1App |
| `./website` | 由编辑器和渲染器共享的页面渲染核心（`Element` + 通过 `ElementRegistry` 解析的每类型渲染器、`StyleHelper`、`DroppableArea`、`DraggableWrapper`、`Theme`、`YoutubeBackground`、`SectionDivider`/`parseDividerConfig`）；站点范围小部件（`AnnouncementBanner`、`Launcher` + 其 `parse*Config` 助手）；仅由面向公众的渲染器使用的 `Animate`、`ElementBlock`、`NonAuthDonationWrapper`、`SermonElement` | B1Admin（编辑器）、B1App（编辑器组件 + 渲染器） |

B1Transfer 和 LessonsApp 只使用根和 `login` 入口点——`donations`、`forms` 和 `website` 子路径目前仅由 B1Admin 和 B1App 消费。

## 本地开发设置

此包位于 [Packages](https://github.com/ChurchApps/Packages) 工作区中，与其他共享库一起：

1. 克隆工作区：

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. 在工作区根目录安装依赖：

   ```bash
   cd Packages && yarn install
   ```

3. 从包目录启动 Vite 游乐场：

   ```bash
   cd apphelper && yarn dev
   ```

   游乐场开发服务器启动在 `http://localhost:3001`。首先复制 `playground/dotenv.sample` 到 `playground/.env` 并填入所需的值。

要构建供使用的包（编译到 `dist/` 并复制 locale/CSS 资源），运行 `yarn workspace @churchapps/apphelper build` ——或在根目录运行 `yarn build` 以按依赖顺序构建工作区中的每个包。要在消费应用内测试未发布的构建，请使用临时 Yarn 链接——参阅 [针对消费应用的本地开发](./index.md#local-development-against-a-consuming-app)。

:::tip
游乐场是开发和测试 AppHelper 组件的最快方式。它热重载 Vite 开发服务器，以便您可以实时看到更改。
:::

## 发布

发布通过 changesets 进行：在工作区根目录为每个更改运行 `yarn changeset`，准备发布时运行 `yarn publish-all`。有关完整流程，请参阅 [共享库概览](./index.md#releasing-with-changesets)。

:::warning
在替换被发布并且每个消费者都被迁移后，不要删除或重命名导出——在合并删除之前，grep 所有消费仓库。
:::

## 相关文章

- **[Helpers](./helpers)** ——与 AppHelper 一起使用的基础工具包
- **[Web 应用](../web-apps/)** ——消费此包的 Web 应用
- **[共享库概览](./index.md)** ——工作区设置、发布流程和本地链接工作流
