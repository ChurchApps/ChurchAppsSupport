---
title: "Helpers"
---

# Helpers

<div class="article-intro">

`@churchapps/helpers` 包提供所有 ChurchApps 项目（前端和后端）使用的基础工具。它与框架无关，包含常用助手如 `DateHelper`、`ApiHelper`、`CurrencyHelper` 和其他共享工具。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js** 和 **Git** -- 参见[前置条件](../setup/prerequisites)
- 熟悉[npm link 工作流](./index.md)以进行本地开发

</div>

## 本地开发配置

1. 克隆仓库：

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. 安装依赖：

   ```bash
   cd Helpers && npm install
   ```

3. 构建包（将 TypeScript 编译到 `dist/`）：

   ```bash
   npm run build
   ```

4. 使其可用于本地链接：

   ```bash
   npm link
   ```

然后你可以将其链接到任何使用它的项目：

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## 发布

要发布新版本到 npm：

1. 更新 `package.json` 中的版本号
2. 发布：

   ```bash
   npm publish --access=public
   ```

:::warning
由于此包被每个 ChurchApps 项目使用，这里的更改影响范围很广。发布前请至少在一个使用它的 API 和一个 Web 应用中使用 `npm link` 进行充分测试。
:::

## 相关文章

- **[ApiHelper](./api-helper)** -- 依赖此包的服务端工具
- **[AppHelper](./app-helper)** -- 依赖此包的 React 组件
- **[共享库概览](./index.md)** -- `npm link` 工作流和包概览
