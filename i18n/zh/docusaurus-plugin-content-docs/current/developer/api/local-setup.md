---
title: "本地 API 设置"
---

# 本地 API 设置

<div class="article-intro">

本指南将引导你完成 ChurchApps API 的本地开发环境设置。你将克隆代码仓库、配置数据库连接、初始化数据库结构，并启动支持热重载的开发服务器。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js 24+**、**Git** 和 **MySQL 8.0+**——参见[前置条件](../setup/prerequisites)
- 创建一个具有创建数据库权限的 MySQL 用户
- 查阅 [环境变量](../setup/environment-variables) 参考文档，了解 API 的配置项

</div>

## 分步设置

### 1. 克隆代码仓库

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. 安装依赖

本项目使用 Yarn（有防护机制会阻止 `npm install`）：

```bash
cd Api
yarn install
```

### 3. 配置环境变量

```bash
cp .env.sample .env
```

打开 `.env`，配置你的 MySQL 连接字符串。每个模块都需要自己的数据库连接，格式如下：

```
mysql://root:password@localhost:3306/dbname
```

你需要为全部六个模块的数据库（membership、attendance、content、giving、messaging、doing）分别提供连接字符串。

### 4. 初始化数据库

```bash
npm run initdb
```

该命令会自动创建全部六个数据库及其数据表。

:::tip
你可以使用 `npm run initdb -- --module=membership` 只初始化某一个模块的数据库（或将 `membership` 替换为 `attendance`、`content`、`giving`、`messaging`、`doing`）。
:::

### 5. 启动开发服务器

```bash
npm run dev
```

API 将以热重载模式启动，地址为 [http://localhost:8084](http://localhost:8084)。

## 常用命令

| 命令 | 说明 |
|---------|-------------|
| `npm run dev` | 启动带热重载的开发服务器（tsx watch） |
| `npm run build` | 清理、编译 TypeScript 并复制资源文件 |
| `npm run test` | 使用 Jest 运行测试（包括覆盖率） |
| `npm run test:watch` | 以监听模式运行测试 |
| `npm run lint` | 运行 ESLint 并自动修复（ESLint 是唯一的代码格式化工具） |

## 部署

预发布（staging）环境已经停用。每次推送到 `main` 时，API 会部署到演示环境；而通过手动触发的 **Deploy Prod** 工作流部署到生产环境，该工作流还会应用待执行的数据库迁移。详情参见 [API 部署](../deployment/apis)。

## 本地库开发

如果你需要在开发 API 的同时开发共享库（`@churchapps/helpers` 或 `@churchapps/apihelper`），请在 [Packages](https://github.com/ChurchApps/Packages) 工作区中构建它，并在 API 中临时添加一个 Yarn portal：

```bash
# 在 Packages 工作区中
yarn build

# 在 API 目录中
yarn link ../Packages/helpers
# ... 进行测试 ...
yarn unlink ../Packages/helpers && yarn install
```

这样你就可以在不发布到 npm 的情况下，用 API 测试库的修改。详情参见[共享库](../shared-libraries/#local-development-against-a-consuming-app)——并且切勿提交 link 命令写入 `package.json` 的 portal 解析结果。

## 相关文章

- **[数据库](./database)** —— 了解每个模块一个数据库的架构
- **[模块结构](./module-structure)** —— 控制器、仓储和模型的组织方式
- **[共享库](../shared-libraries/)** —— 使用 `@churchapps/helpers` 和 `@churchapps/apihelper`
