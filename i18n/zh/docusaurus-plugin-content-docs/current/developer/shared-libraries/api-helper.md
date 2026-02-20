---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper` 包为所有 ChurchApps Express.js API 提供服务端工具。它包含基础控制器类、JWT 认证中间件、数据库工具和 AWS 集成，是每个 API 项目的依赖。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js** 和 **Git** -- 参见[前置条件](../setup/prerequisites)
- 熟悉[npm link 工作流](./index.md)以进行本地开发
- 此包依赖 [`@churchapps/helpers`](./helpers)

</div>

## 包含内容

- **CustomBaseController** -- API 控制器的基类
- **认证中间件** -- 通过 `CustomAuthProvider` 的 JWT 认证
- **数据库工具** -- `DB.query`、`EnhancedPoolHelper` 用于 MySQL 连接管理
- **AWS 集成** -- S3、SSM Parameter Store 和其他 AWS 服务的助手
- **Inversify DI 配置** -- 依赖注入容器配置

## 本地开发配置

1. 克隆仓库：

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. 安装依赖：

   ```bash
   cd ApiHelper && npm install
   ```

3. 构建包（将 TypeScript 编译到 `dist/`）：

   ```bash
   npm run build
   ```

4. 使其可用于本地链接：

   ```bash
   npm link
   ```

## 关键命令

| 命令 | 描述 |
|---------|-------------|
| `npm run build` | 将 TypeScript 编译到 `dist/` |
| `npm run lint` | 运行 ESLint |
| `npm run lint:fix` | 运行 ESLint 并自动修复 |
| `npm run format` | 使用 Prettier 格式化代码 |

:::info
此包是每个 ChurchApps API 的依赖。进行更改时，请使用 `npm link` 在 API 本地测试后再发布。
:::

## 相关文章

- **[Helpers](./helpers)** -- 此包依赖的基础工具包
- **[模块结构](../api/module-structure)** -- 控制器和认证中间件在 API 模块中的使用方式
- **[本地 API 配置](../api/local-setup)** -- 为本地开发配置 API
