---
title: "本地 API 配置"
---

# 本地 API 配置

<div class="article-intro">

本指南将引导你完成 ChurchApps API 的本地开发配置。你将克隆仓库、配置数据库连接、初始化架构并启动带有热重载的开发服务器。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js 22+**、**Git** 和 **MySQL 8.0+** -- 参见[前置条件](../setup/prerequisites)
- 创建一个具有数据库创建权限的 MySQL 用户
- 查看 [环境变量](../setup/environment-variables) 参考文档了解 API 配置

</div>

## 分步配置

### 1. 克隆仓库

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. 安装依赖

```bash
cd Api
npm install
```

### 3. 配置环境变量

```bash
cp .env.sample .env
```

打开 `.env` 并配置你的 MySQL 连接字符串。每个模块需要自己的数据库连接，格式如下：

```
mysql://root:password@localhost:3306/dbname
```

你需要为所有六个模块数据库（membership、attendance、content、giving、messaging、doing）配置连接字符串。

### 4. 初始化数据库

```bash
npm run initdb
```

这将自动创建所有六个数据库及其表。

:::tip
你可以使用 `npm run initdb:membership`（或 `attendance`、`content`、`giving`、`messaging`、`doing`）初始化单个模块的数据库。
:::

### 5. 启动开发服务器

```bash
npm run dev
```

API 以热重载方式启动，访问地址为 [http://localhost:8084](http://localhost:8084)。

## 关键命令

| 命令 | 描述 |
|---------|-------------|
| `npm run dev` | 以热重载启动开发服务器（tsx watch） |
| `npm run build` | 清理、编译 TypeScript 并复制资源 |
| `npm run test` | 使用 Jest 运行测试（包含覆盖率） |
| `npm run test:watch` | 以监视模式运行测试 |
| `npm run lint` | 运行 Prettier 和 ESLint 并自动修复 |

## 暂存环境部署

要部署到暂存环境：

```bash
npm run deploy-staging
```

这将运行生产构建，然后通过 Serverless Framework 部署。

:::warning
运行部署命令前请确保你的 AWS 凭据已配置。
:::

## 本地库开发

如果你需要在 API 旁边开发共享库（`@churchapps/helpers` 或 `@churchapps/apihelper`），请使用 `npm link`：

```bash
# 在库目录中
cd Helpers
npm run build
npm link

# 在 API 目录中
cd ../Api
npm link @churchapps/helpers
```

这让你无需发布到 npm 即可针对 API 测试库的更改。

## 相关文章

- **[数据库](./database)** -- 了解按模块分库架构
- **[模块结构](./module-structure)** -- 控制器、仓储和模型的组织方式
- **[共享库](../shared-libraries/)** -- 使用 `@churchapps/helpers` 和 `@churchapps/apihelper`
