---
title: "数据库"
---

# 数据库

<div class="article-intro">

ChurchApps API 采用**每模块一库**的架构。六个数据模块中的每一个都拥有自己独立的 MySQL 数据库和独立的连接池，在保持单一部署的同时提供清晰的数据边界。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **MySQL 8.0+** -- 请参见[前置条件](../setup/prerequisites)
- 在 `.env` 文件中配置数据库连接字符串 -- 请参见[环境变量](../setup/environment-variables)

</div>

## 架构概览

```
Api
├── membership_db   ← People, groups, permissions
├── attendance_db   ← Services, sessions, records
├── content_db      ← Pages, sections, elements
├── giving_db       ← Donations, funds, payments
├── messaging_db    ← Conversations, notifications
└── doing_db        ← Tasks, plans, assignments
```

### 关键设计决策

- **每模块一库** -- 每个模块维护自己的 MySQL 数据库，并配有专属连接池（由 `KyselyPool` 管理）。这使模块之间保持解耦，并支持各自独立的模式演进。
- **独占所有权** -- 某个模块的数据表只能由该模块自身的代码进行读写。当另一个模块需要这些数据时，它会调用所属模块的网关，而不是直接查询这些表——参见[跨模块通信](./module-structure#cross-module-communication)。
- **不使用 ORM 的仓储模式** -- 所有数据访问都通过仓储类完成，这些类使用 Kysely 查询构建器针对模块的模式构建带类型的 SQL。这让开发者能够完全掌控查询性能和行为。
- **原生多租户设计** -- 每个查询都以 `churchId` 为作用域限定。所有数据表都包含 `churchId` 列，仓储层会自动强制执行租户隔离。

## 连接字符串

每个模块的数据库连接都在 `.env` 中使用标准的 MySQL 连接字符串格式进行配置：

```
mysql://user:password@host:port/database
```

例如，一个本地开发环境的配置可能是这样：

每个模块会从名为 `<MODULE>_CONNECTION_STRING` 的环境变量中读取自己的连接信息：

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
在生产环境中，连接字符串存储在 AWS SSM 参数存储中，并由 `Environment` 类在启动时读取。
:::

## 模式脚本

数据表的模式以 Kysely 迁移的形式定义在 `tools/migrations/` 目录中，并按模块组织：

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

迁移脚本定义了表的创建、索引以及模式变更。`tools/dbScripts/` 目录中保存了可在模式之上加载的演示和种子数据。

## 数据库初始化

### 初始化所有数据库

```bash
npm run initdb
```

此命令会创建全部六个数据库，并为每个数据库运行迁移。

### 初始化单个模块

```bash
npm run initdb -- --module=membership
```

:::tip
在处理某个特定模块时，您可以只重新初始化该模块的数据库，而不影响其他模块。
:::

## 数据访问模式

仓储类通过模块的 `getDb()` 函数获取模块的带类型数据库模式，并使用 Kysely 查询构建器构建查询。一个典型的仓储方法大致如下：

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

仓储类通过 `RepoManager` 获取：

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
请始终在查询中包含 `churchId`，以维护多租户隔离。除非有明确、经授权的理由，否则切勿跨租户查询数据。
:::

## 跨模块引用

由于每个模块的数据都存放在各自独立的数据库中，因此模块边界之间不存在外键或 SQL 联接。当某条记录与另一个模块的数据相关联时，它只会存储该记录的 id——例如，giving 数据库中的一条捐款记录会携带 membership 数据库中某个人的 `personId`——任何跨模块的数据组合都在应用程序代码中完成。

正是这一约束让模块边界真正具有意义：每个模式都可以独立演进，某个模块的数据库可以迁移到自己的服务器上，甚至某个模块还可以被拆分为独立的服务，而无需理清共享数据表或跨数据库查询的纠葛。

## 相关文章

- **[模块结构](./module-structure)** -- 每个模块内部控制器和仓储的组织方式
- **[本地 API 环境搭建](./local-setup)** -- 完整的分步搭建指南
