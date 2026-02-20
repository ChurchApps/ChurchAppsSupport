---
title: "数据库"
---

# 数据库

<div class="article-intro">

ChurchApps API 采用**按模块分库**的架构。六个模块各自拥有独立的 MySQL 数据库和独立的连接池，在保持单一部署的同时提供了清晰的数据边界。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 安装 **MySQL 8.0+** -- 参见[前置条件](../setup/prerequisites)
- 在 `.env` 文件中配置数据库连接字符串 -- 参见[环境变量](../setup/environment-variables)

</div>

## 架构概览

```
Api
├── membership_db   ← 人员、群组、权限
├── attendance_db   ← 礼拜、场次、记录
├── content_db      ← 页面、区块、元素
├── giving_db       ← 捐赠、基金、支付
├── messaging_db    ← 会话、通知
└── doing_db        ← 任务、计划、分配
```

### 关键设计决策

- **每个模块一个数据库** -- 每个模块维护自己的 MySQL 数据库和专用连接池（`EnhancedPoolHelper`）。这使模块之间保持解耦，并允许独立的架构演进。
- **仓储模式与直接 SQL** -- 没有使用 ORM。所有数据访问通过仓储类执行，使用 `DB.query()` 直接执行 SQL。这提供了对查询性能和行为的完全控制。
- **原生多租户设计** -- 每个查询都按 `churchId` 限定范围。所有表都包含 `churchId` 列，仓储层自动强制执行租户隔离。

## 连接字符串

每个模块的数据库连接通过 `.env` 文件使用标准 MySQL 连接字符串格式进行配置：

```
mysql://user:password@host:port/database
```

例如，本地开发环境可能如下所示：

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
在生产环境中，连接字符串存储在 AWS SSM Parameter Store 中，由 `Environment` 类在启动时读取。
:::

## 架构脚本

数据库架构脚本位于 `tools/dbScripts/` 目录中，按模块组织：

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

这些脚本定义了表创建、索引以及必要的种子数据。

## 数据库初始化

### 初始化所有数据库

```bash
npm run initdb
```

这将创建所有六个数据库并为每个数据库运行架构脚本。

### 初始化单个模块

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
在处理特定模块时，你可以仅重新初始化该模块的数据库，而不影响其他模块。
:::

## 数据访问模式

仓储通过 `DB.query()` 方法访问数据。典型的仓储方法如下所示：

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

通过 `RepositoryManager` 获取仓储：

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
始终在查询中包含 `churchId` 以维护多租户隔离。除非有特定且经过授权的理由，否则不要跨租户查询。
:::

## 相关文章

- **[模块结构](./module-structure)** -- 每个模块中控制器和仓储的组织方式
- **[本地 API 配置](./local-setup)** -- 完整的分步配置指南
