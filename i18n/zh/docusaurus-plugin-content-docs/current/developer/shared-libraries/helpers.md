---
title: "Helpers"
---

# Helpers

<div class="article-intro">

`@churchapps/helpers` 包为所有 ChurchApps 项目（前端和后端）提供基础工具。它与框架无关，包含常见的助手，如 `DateHelper`、`ApiHelper`、`CurrencyHelper`，以及构成应用和 API 之间数据契约的共享 TypeScript 接口。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js** 和 **Git** ——请参阅 [前提条件](../setup/prerequisites)
- 熟悉 [Packages 工作区](./index.md) 的设置和发布流程

</div>

## 谁消费这个

每个 ChurchApps API（核心 Api、AskApi 和 LessonsApi）和每个 Web 前端（B1Admin、B1App、B1Transfer、LessonsApp）都直接依赖此包。前端还通过 [`@churchapps/apphelper`](./app-helper) 重新导出其许多导出（`ApiHelper`、`DateHelper`、`UserHelper` 和其他接口）。其他共享包将其声明为对等依赖，以便每个应用恰好解析一个副本。

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

3. 构建（将 TypeScript 编译到 `dist/`）：

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   或在根目录运行 `yarn build` 以按依赖顺序构建工作区中的每个包。

要在消费项目内测试更改，请使用临时 Yarn 链接——参阅 [针对消费应用的本地开发](./index.md#local-development-against-a-consuming-app)。

## 发布

发布通过 changesets 而非手动版本碰撞进行：

1. 在工作区根目录运行 `yarn changeset` 并使用适当的碰撞类型选择 `@churchapps/helpers`；使用您的更改提交生成的 changeset 文件。
2. 准备发布时，在根目录运行 `yarn publish-all`——它碰撞版本、写入 CHANGELOG、按依赖顺序构建并发布到 npm。

新的共享接口位于 `helpers/src/interfaces/` 中，并通过包 barrel 重新导出。网站构建器的元素类型目录（`ElementTypes.ts` ——35 种类型及其答案模式）也位于此处；它是由 apphelper 渲染器、B1Admin 编辑器表单和 AI 生成提示共享的契约（参阅 [网站构建器架构](../architecture/website-builder)）。

:::warning
由于此包被每个 ChurchApps 项目使用，这里的更改影响范围很广。`helpers` 的发布会自动碰撞 `apihelper` 和 `apphelper`，以便它们的依赖范围保持最新。在发布前，在至少一个消费 API 和一个消费 Web 应用中使用 Yarn 链接进行测试。
:::

## 相关文章

- **[ApiHelper](./api-helper)** ——依赖此包的服务端工具
- **[AppHelper](./app-helper)** ——依赖此包的 React 组件
- **[共享库概览](./index.md)** ——工作区设置、发布流程和本地链接工作流
