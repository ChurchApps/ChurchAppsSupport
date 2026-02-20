---
title: "共享库"
---

# 共享库

<div class="article-intro">

ChurchApps 共享代码以 `@churchapps/*` 作用域发布到 npm。这些包提供通用工具、服务端助手和 React 组件，被所有 ChurchApps 项目作为常规 npm 依赖使用。

</div>

## 包

| 包 | 描述 | 使用方 |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | 基础工具（DateHelper、ApiHelper 等） | 所有项目 |
| [`@churchapps/apihelper`](./api-helper) | 服务端 Express.js 工具 | 所有 API |
| [`@churchapps/apphelper`](./app-helper) | 共享 React 组件和工具 | 所有 Web 应用 |

## 使用 `npm link` 进行本地开发

在开发共享库并同时在使用它的项目中测试时，使用 `npm link` 无需发布到 npm 即可测试更改：

```bash
# 构建并链接库
cd Helpers && npm run build && npm link

# 在使用它的项目中链接
cd ../Api && npm link @churchapps/helpers
```

这将从使用项目的 `node_modules/@churchapps/helpers` 创建一个符号链接到你本地的构建输出，因此重新构建后更改会立即反映。

:::tip
记得在更改后在库项目中运行 `npm run build` -- 使用项目读取的是编译后的 `dist/` 文件夹，而非源代码。
:::

:::warning
每当你在使用项目中运行 `npm install` 时，`npm link` 连接会被重置。你需要在安装依赖后重新运行 `npm link @churchapps/<package>` 命令。
:::
