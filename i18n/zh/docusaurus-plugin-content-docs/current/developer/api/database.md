---
title: "数据库"
---

# 数据库

<div class="article-intro">

ChurchApps API 使用**每个模块一个数据库**的架构。六个数据模块中的每一个都有自己的 MySQL 数据库，具有独立的连接池，提供清晰的数据边界，同时将所有内容保留在单个部署中。

</div>

<div class="prereqs">
<h4>开始前</h4>

- 安装 **MySQL 8.0+** -- 请参见[先决条件](../setup/prerequisites)
- 在您的 `.env` 文件中配置数据库连接字符串 -- 请参见[环境变量](../setup/environment-variables)

</div>

## 架构概览

```
Api
├── membership_db   ← 人员、小组、权限
├── attendance_db   ← 服务、会话、记录
├── content_db      ← 页面、部分、元素
├── giving_db       ← 捐赠、基金、支付
├── messaging_db    ← 对话、通知
└── doing_db        ← 任务、计划、分配
```

### 关键设计决策

- **每个模块一个数据库** -- 每个模块维护自己的 MySQL 数据库，带有专用连接池（由 `KyselyPool` 管理）。这使模块解耦并允许独立的模式演变。
- **独占所有权** -- 模块的表仅由该模块的自有代码读取和写入。当另一个模块需要数据时，它调用拥有模块的网关，而不是直接查询表 -- 请参见[跨模块通信](./module-structure#跨模块通信)。
- **没有 ORM 的存储库模式** -- 所有数据访问都通过针对模块模式使用 Kysely 查询构建器构建类型化 SQL 的存储库类。这完全控制查询性能和行为。
- **多租户设计** -- 每个查询都由 `churchId` 限定。所有表都包括 `churchId` 列，存储库层自动强制租户隔离。

## 连接字符串

每个模块的数据库连接在 `.env` 中使用标准 MySQL 连接字符串格式配置：

```
mysql://user:password@host:port/database
```

例如，本地开发设置可能看起来像：

每个模块从名为 `<MODULE>_CONNECTION_STRING` 的环境变量读取其连接：

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
在生产中，连接字符串存储在 AWS SSM 参数存储中，并在启动时由 `Environment` 类读取。
:::

## 架构脚本

表架构定义为 `tools/migrations/` 目录中的 Kysely 迁移，按模块组织：

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

迁移定义表创建、索引和模式更改。`tools/dbScripts/` 目录保存可以加载在架构之上的演示和种子数据。

## 数据库初始化

### 初始化所有数据库

```bash
npm run initdb
```

这会创建所有六个数据库并为每个数据库运行迁移。

### 初始化单个模块

```bash
npm run initdb -- --module=membership
```

:::tip
处理特定模块时，您可以仅重新初始化该模块的数据库，而不影响其他数据库。
:::

## 数据访问模式

存储库使用 Kysely 查询构建器针对模块的类型化数据库架构构建查询，通过模块的 `getDb()` 函数获得。典型的存储库方法看起来像这样：

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

存储库通过 `RepoManager` 获得：

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
始终在您的查询中包含 `churchId` 以维护多租户隔离。除非您有特定的、授权的原因，否则永远不要跨租户查询。
:::

## 跨模块引用

因为每个模块的数据驻留在单独的数据库中，所以模块边界之间没有外键或 SQL 连接。与另一个模块的数据相关的记录存储该记录的 id -- 例如，给予数据库中的捐赠携带成员数据库中的人员的 `personId` -- 并且任何跨模块组合都在应用程序代码中发生。

这个约束是使模块边界真实的东西：每个架构可以独立演变，模块的数据库可以移到其自己的服务器，模块甚至可以提取到独立服务中，而无需解开共享表或跨数据库查询。

## 相关文章

- **[模块结构](./module-structure)** -- 每个模块内如何组织控制器和存储库
- **[本地 API 设置](./local-setup)** -- 完整的分步设置指南
