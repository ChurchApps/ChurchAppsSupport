---
title: "模块结构"
---

# 模块结构

<div class="article-intro">

每个 API 模块遵循一致的内部结构，包含控制器、仓储、模型和助手。了解此布局可以使浏览代码库和向任何模块添加新功能变得简单明了。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在本地配置好 API -- 参见[本地 API 配置](./local-setup)
- 查看[数据库](./database)架构以了解数据访问层

</div>

## 目录布局

每个模块位于 `src/modules/{name}/` 下，包含四个目录：

```
src/modules/{name}/
├── controllers/    ← 路由处理器（Express 端点）
├── repositories/   ← 数据访问层（直接 SQL）
├── models/         ← TypeScript 接口和类型
└── helpers/        ← 模块特定的业务逻辑
```

例如，成员管理模块：

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepository.ts
│   ├── GroupRepository.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

## 控制器

控制器为模块定义 API 路由。它们继承 `@churchapps/apihelper` 中的 `CustomBaseController`，并使用 Inversify 装饰器进行路由注册。

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = 已认证用户上下文
      au.checkAccess("People", "View");
      const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
      return repos.person.loadByChurchId(au.churchId);
    });
  }

  @httpPost("/")
  public async save() {
    return this.actionWrapper(async (au) => {
      au.checkAccess("People", "Edit");
      const data = this.request.body;
      // ... 保存逻辑
    });
  }
}
```

### 路由装饰器

| 装饰器 | HTTP 方法 |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")` 装饰器为控制器中的所有路由设置基础路径。

## 仓储

仓储通过 `DB.query()` 使用直接 SQL 处理所有数据库操作。没有使用 ORM -- 你直接编写 SQL。

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // INSERT 或 UPDATE 逻辑
  }
}
```

通过 `RepositoryManager` 访问仓储：

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## 认证和授权

### JWT 认证

所有请求通过 `CustomAuthProvider` 处理的 JWT 令牌进行认证。令牌会自动验证，已认证用户上下文（`au`）在每个控制器操作中都可用。

### 权限检查

使用 `au.checkAccess()` 验证当前用户是否具有所需权限：

```typescript
au.checkAccess("People", "View");    // 读取权限
au.checkAccess("People", "Edit");    // 写入权限
```

如果用户缺少所需权限，将自动返回错误响应。

:::warning
在执行任何数据操作之前，始终调用 `au.checkAccess()`。即使对于看似只读的端点，也不要跳过权限检查。
:::

## 环境配置

`Environment` 类处理跨环境的配置：

- **本地开发：** 从项目根目录的 `.env` 文件读取
- **部署环境：** 从 AWS SSM Parameter Store 读取

```typescript
// 访问环境变量
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

这种抽象意味着你的代码不需要知道配置来自哪里。

## Lambda 函数

部署到 AWS 时，API 作为四个 Lambda 函数运行：

| 函数 | 用途 |
|----------|---------|
| `web` | 处理所有 HTTP REST API 请求 |
| `socket` | 管理实时功能的 WebSocket 连接 |
| `timer15Min` | 每 15 分钟调度一次，用于邮件通知 |
| `timerMidnight` | 每天调度一次，用于摘要邮件和维护 |

:::info
在本地，`web` 函数运行在端口 8084，`socket` 函数运行在端口 8087。定时器函数可以在开发期间手动触发。
:::

## 相关文章

- **[数据库](./database)** -- 连接字符串、架构脚本和数据访问模式
- **[本地 API 配置](./local-setup)** -- 完整的分步配置指南
- **[ApiHelper](../shared-libraries/api-helper)** -- 提供 `CustomBaseController` 和认证中间件的共享库
