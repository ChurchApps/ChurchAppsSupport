---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper` 包为所有 ChurchApps Express.js API 提供服务端工具。它包含基础控制器类、JWT 认证、数据库工具和 AWS 集成，是每个 API 项目都依赖的。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **Node.js** 和 **Git** ——请参阅 [前提条件](../setup/prerequisites)
- 熟悉 [Packages 工作区](./index.md) 的设置和发布流程
- 此包依赖于 [`@churchapps/helpers`](./helpers)（作为对等依赖）并重新导出它

</div>

## 包含内容

- **CustomBaseController** ——API 控制器的基类，构建在 `inversify-express-utils` 之上
- **认证** ——通过 `CustomAuthProvider`、`AuthenticatedUser` 和 `Principal` 的 JWT 认证
- **数据库工具** —— `DB.query` / `DB.queryOne` 和用于 MySQL 连接管理的 `Pool` 类，加上用于模式设置的 `MySqlHelper` 和 `DBCreator`
- **AWS 集成** —— 用于 S3 文件存储和 SSM Parameter Store 读取的 `AwsHelper`
- **电子邮件** —— `EmailHelper` 支持 SES 和 SMTP 传输
- **配置加载** —— `EnvironmentBase` 从环境变量或 Parameter Store 读取连接字符串和机密
- **杂项** —— `EncryptionHelper`、`FileStorageHelper`、`LoggingHelper`、`BasePermissions`、`SlugHelper`

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
   yarn workspace @churchapps/apihelper build
   ```

   或在根目录运行 `yarn build` 以按依赖顺序构建工作区中的每个包。

要在使用该包的 API 内测试更改，请使用临时 Yarn 链接——参阅 [针对消费应用的本地开发](./index.md#local-development-against-a-consuming-app)。

## 发布

发布通过 changesets 进行：在工作区根目录为每个更改运行 `yarn changeset`，准备发布时运行 `yarn publish-all`。有关完整流程，请参阅 [共享库概览](./index.md#releasing-with-changesets)。

:::info
此包是每个 ChurchApps API 的依赖——核心 Api、AskApi 和 LessonsApi。进行更改时，在发布前在 API 本地测试。
:::

## 相关文章

- **[Helpers](./helpers)** ——此包依赖的基础工具包
- **[模块结构](../api/module-structure)** ——控制器和认证中间件在 API 模块中的使用方式
- **[本地 API 设置](../api/local-setup)** ——为本地开发设置 API
