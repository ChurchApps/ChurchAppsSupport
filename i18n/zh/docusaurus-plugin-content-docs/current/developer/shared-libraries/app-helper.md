---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper*` 包为所有 ChurchApps Web 应用提供共享的 React 组件和工具。AppHelper 结构为 monorepo 工作区，包含六个包，涵盖核心组件、认证、捐赠、表单、Markdown 和网站/CMS 功能。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js** 和 **Git** -- 参见[前置条件](../setup/prerequisites)
- 熟悉[npm link 工作流](./index.md)以进行本地开发

</div>

## 包

| 包 | 描述 |
|---------|-------------|
| `@churchapps/apphelper` | 核心组件和工具 |
| `@churchapps/apphelper-login` | 登录和注册 UI |
| `@churchapps/apphelper-donations` | 捐赠和奉献组件 |
| `@churchapps/apphelper-forms` | 表单构建器组件 |
| `@churchapps/apphelper-markdown` | Markdown 编辑器和渲染器 |
| `@churchapps/apphelper-website` | 网站和 CMS 组件 |

## 本地开发配置

1. 克隆仓库：

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. 安装依赖：

   ```bash
   cd AppHelper && npm install
   ```

3. 构建所有包并启动 Vite playground：

   ```bash
   npm run playground:reload
   ```

   这将构建工作区中的每个包，然后在 **http://localhost:3001** 启动 playground 开发服务器。

:::tip
Playground 是开发和测试 AppHelper 组件的最快方式。它会热重载 Vite 开发服务器，让你可以实时看到更改。
:::

## 发布

发布单个包：

```bash
npm run publish:apphelper
```

发布所有包：

```bash
npm run publish:all
```

:::warning
发布时，请确保在运行发布命令之前更新相关 `package.json` 文件中的版本号。所有依赖已更改包的包也应同步更新。
:::

## 相关文章

- **[Helpers](./helpers)** -- 与 AppHelper 一起使用的基础工具包
- **[Web 应用](../web-apps/)** -- 使用这些包的 Web 应用
- **[共享库概览](./index.md)** -- `npm link` 工作流和包概览
