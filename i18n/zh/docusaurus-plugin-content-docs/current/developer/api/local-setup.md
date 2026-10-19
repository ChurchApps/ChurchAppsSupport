---
title: "本地 API 设置"
---

# 本地 API 设置

<div class="article-intro">

本指南将引导您为 ChurchApps API 设置本地开发环境。您需要克隆代码仓库、配置数据库连接、初始化数据库结构，然后启动支持热重载的开发服务器。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js 22+**、**Git** 和 **MySQL 8.0+** —— 参见[前置条件](../setup/prerequisites)
- 创建一个具有创建数据库权限的 MySQL 用户
- 查阅 [环境变量](../setup/environment-variables) 参考文档，了解 API 的配置项

</div>

## 逐步设置

### 1. 克隆代码仓库

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. 安装依赖

本项目使用 Yarn（有保护机制会阻止 `npm install`）：

```bash
cd Api
yarn install
```

### 3. 配置环境变量

```bash
cp .env.sample .env
```

打开 `.env` 并配置您的 MySQL 连接字符串。每个模块都需要各自的数据库连接，格式如下：

```
mysql://root:password@localhost:3306/dbname
```

您需要为全部六个模块数据库（membership、attendance、content、giving、messaging、doing）分别提供连接字符串。

### 4. 初始化数据库

```bash
npm run initdb
```

此命令会自动创建全部六个数据库及其数据表。

:::tip
您可以只初始化某一个模块的数据库，命令为 `npm run initdb -- --module=membership`（或将 `membership` 替换为 `attendance`、`content`、`giving`、`messaging`、`doing`）。
:::

### 5. 启动开发服务器

```bash
npm run dev
```

API 将以热重载模式启动，地址为 [http://localhost:8084](http://localhost:8084)。

## 常用命令

| 命令 | 说明 |
|---------|-------------|
| `npm run dev` | 启动支持热重载的开发服务器（tsx watch） |
| `npm run build` | 清理、编译 TypeScript 并复制资源文件 |
| `npm run test` | 使用 Jest 运行测试（包含覆盖率统计） |
| `npm run test:watch` | 以监听模式运行测试 |
| `npm run lint` | 运行 ESLint 并自动修复（ESLint 是唯一的格式化工具） |

## 部署

预发布（staging）环境已停用。每次推送到 `main` 分支时，API 会部署到演示（demo）环境；而正式（production）环境则通过手动触发的 **Deploy Prod** 工作流进行部署，该工作流还会执行待处理的数据库迁移。详情请参阅 [API 部署](../deployment/apis)。

## 本地库开发

如果您需要在开发 API 的同时开发共享库（`@churchapps/helpers` 或 `@churchapps/apihelper`），请在 [Packages](https://github.com/ChurchApps/Packages) 工作区中构建该库，并在 API 中临时添加一个 Yarn portal：

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

这样您就可以在不发布到 npm 的情况下，用 API 测试库的改动。详情请参阅[共享库](../shared-libraries/#local-development-against-a-consuming-app)——并且切勿将 link 写入 `package.json` 的 portal 解析结果提交到代码仓库。

## 相关文章

- **[数据库](./database)** —— 了解按模块划分数据库的架构
- **[模块结构](./module-structure)** —— 了解控制器、仓储和模型的组织方式
- **[共享库](../shared-libraries/)** —— 使用 `@churchapps/helpers` 和 `@churchapps/apihelper`
