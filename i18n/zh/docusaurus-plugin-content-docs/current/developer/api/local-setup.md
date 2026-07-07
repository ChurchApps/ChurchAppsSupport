---
title: "本地 API 设置"
---

# 本地 API 设置

<div class="article-intro">

本指南将引导您完成 ChurchApps API 的本地开发设置。您将克隆仓库、配置数据库连接、初始化模式并启动带热重载的开发服务器。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js 22+**、**Git** 和 **MySQL 8.0+** ——请参见[前提条件](../setup/prerequisites)
- 创建具有数据库创建权限的 MySQL 用户
- 查看 [环境变量](../setup/environment-variables) 参考以了解 API 配置

</div>

## 逐步设置

### 1. 克隆仓库

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. 安装依赖

该项目使用 Yarn（防守机制阻止了 `npm install`）：

```bash
cd Api
yarn install
```

### 3. 配置环境变量

```bash
cp .env.sample .env
```

打开 `.env` 并配置您的 MySQL 连接字符串。每个模块需要其自己的数据库连接，格式如下：

```
mysql://root:password@localhost:3306/dbname
```

您需要为所有六个模块数据库（membership、attendance、content、giving、messaging、doing）配置连接字符串。

### 4. 初始化数据库

```bash
npm run initdb
```

这将自动创建所有六个数据库及其表。

:::tip
您可以使用 `npm run initdb -- --module=membership`（或 `attendance`、`content`、`giving`、`messaging`、`doing`）初始化单个模块的数据库。
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
| `npm run lint` | 运行 ESLint 并自动修复 (ESLint 是唯一的格式化程序) |

## 暂存部署

要部署到暂存环境：

```bash
npm run deploy-staging
```

这将运行生产构建，然后通过 Serverless Framework 部署。

:::warning
运行部署命令之前，请确保您的 AWS 凭据已配置。
:::

## 本地库开发

如果您需要在 API 旁边开发共享库（`@churchapps/helpers` 或 `@churchapps/apihelper`），请在 [Packages](https://github.com/ChurchApps/Packages) 工作区中构建它，并在 API 中添加临时 Yarn 链接：

```bash
# 在 Packages 工作区中
yarn build

# 在 API 目录中
yarn link ../Packages/helpers
# ... 测试 ...
yarn unlink ../Packages/helpers && yarn install
```

这让您无需发布到 npm 即可针对 API 测试库的更改。有关详细信息，请参阅 [共享库](../shared-libraries/#local-development-against-a-consuming-app)——并且切勿提交该链接写入 `package.json` 的门户解决方案。

## 相关文章

- **[数据库](./database)** ——了解数据库按模块的架构
- **[模块结构](./module-structure)** ——控制器、资源库和模型的组织方式
- **[共享库](../shared-libraries/)** ——使用 `@churchapps/helpers` 和 `@churchapps/apihelper`
