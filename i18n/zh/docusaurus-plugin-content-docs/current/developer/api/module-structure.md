---
title: "模块结构"
---

# 模块结构

<div class="article-intro">

每个 API 模块遵循一致的内部结构，包含控制器、资源库、模型和助手。了解此布局可以使浏览代码库和向任何模块添加新功能变得简单明了。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在本地设置 API——请参阅 [本地 API 设置](./local-setup)
- 查看 [数据库](./database) 架构以了解数据访问层

</div>

## 目录布局

模块位于 `src/modules/{name}/` 下。一个典型的模块包含四个目录：

```
src/modules/{name}/
├── controllers/    ← 路由处理器（Express 端点）
├── repositories/   ← 数据访问层（类型化 SQL 查询）
├── models/         ← TypeScript 接口和类型
└── helpers/        ← 模块特定的业务逻辑
```

例如，Membership 模块：

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

六个核心数据模块——membership、attendance、content、giving、messaging 和 doing——都遵循此布局。一些专门的模块（例如 reporting，为跨模块报告提供服务，不拥有自己的数据）位于 `src/modules/` 下的它们旁边。

## 一个应用，许多模块

API 是一个**模块化单体**：模块标记代码组织和数据所有权的边界，而不是单独的服务。在启动时，每个模块的控制器都注册到单个依赖注入容器中，后面是一个 Express 应用，所以整个 API 作为一个单元构建、运行和部署——下面描述的已部署函数都是进入此相同应用的入口点。

每个模块的路由位于与模块名称匹配的 URL 前缀下：

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

这使每个模块的 API 表面自包含，同时客户端仍然与单个主机通信。

## 控制器

控制器为模块定义 API 路由。每个模块都有自己的基控制器（例如 `MembershipBaseController`），它扩展共享的 `BaseController`——本身构建在 `@churchapps/apihelper` 中的 `CustomBaseController` 上。路由使用 Inversify 装饰器注册。

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = 认证用户上下文
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` 在运行您的操作之前认证请求并使用模块的资源库对 `this.repos` 进行充实。

### 路由装饰器

| 装饰器 | HTTP 方法 |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")` 装饰器为控制器中的所有路由设置基础路径。

## 资源库

资源库处理所有数据库操作。没有 ORM——查询使用 Kysely 查询构建器编写，针对模块的数据库模式进行类型化。每个模块的 `db/index.ts` 公开一个 `getDb()` 函数，该函数返回模块的类型化 Kysely 实例。

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

在控制器内，模块的资源库可作为 `this.repos` 获得。在控制器外，通过 `RepoManager` 获得它们：

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## 跨模块通信

每个模块拥有自己的数据库（参见 [数据库](./database)），模块永远不会直接查询另一个模块的表。当一个模块需要另一个模块拥有的数据时——例如，doing 模块从 membership 解析人员——它通过拥有模块的 **gateway** 在 `src/shared/modules/` 中进行：

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

每个网关（`MembershipModuleGateway`、`GivingModuleGateway` 等）是一个 TypeScript 接口，定义拥有模块向 API 的其余部分公开的确切操作。接口是契约：当前实现在进程中读取拥有模块的数据库，但因为调用者只依赖接口，实现可以被交换——例如，用于进行 HTTP 调用的实现——如果模块曾经被提取到单独的服务。

:::info
如果您需要的数据位于另一个模块中，而其网关没有为其公开操作，请扩展网关接口，而不是进入另一个模块的资源库或数据库。
:::

## 认证和授权

### JWT 认证

所有请求通过由 `CustomAuthProvider` 处理的 JWT 令牌进行认证。令牌会自动验证，已认证用户上下文（`au`）在每个控制器操作中都可用。

### 权限检查

使用 `au.checkAccess()` 验证当前用户是否具有所需的权限。权限是预定义的常数，结合内容类型和操作：

```typescript
au.checkAccess(Permissions.people.view);    // 读取访问
au.checkAccess(Permissions.people.edit);    // 写入访问
```

如果用户缺少所需的权限，将自动返回错误响应。

:::warning
在执行任何数据操作之前，始终调用 `au.checkAccess()`。不要跳过权限检查，即使对于看似只读的端点。
:::

## 环境配置

`Environment` 类处理跨环境的配置：

- **本地开发：** 从项目根目录的 `.env` 文件读取
- **已部署环境：** 从 AWS SSM Parameter Store 读取

```typescript
// 访问环境变量
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

此抽象意味着您的代码无需知道配置来自何处。

## Lambda 函数

部署到 AWS 时，API 作为六个 Lambda 函数运行：

| 函数 | 用途 |
|----------|---------|
| `web` | 处理所有 HTTP REST API 请求 |
| `socket` | 管理实时功能的 WebSocket 连接 |
| `timer15Min` | 每 30 分钟调度一次以处理电子邮件通知（名称是历史性的） |
| `timerMidnight` | 每天调度一次以处理摘要电子邮件和维护 |
| `timerScheduledTasks` | 每天调度一次以处理到期的自动化和逾期工作流处理 |
| `timerWebhooks` | 每分钟调度一次以传递排队的出站 Webhook |

:::info
在本地，`web` 函数在端口 8084 上运行，`socket` 函数在端口 8087 上运行。定时器函数可以在开发期间手动触发。
:::

## 相关文章

- **[数据库](./database)** ——连接字符串、模式脚本和数据访问模式
- **[本地 API 设置](./local-setup)** ——完整的分步设置指南
- **[ApiHelper](../shared-libraries/api-helper)** ——提供 `CustomBaseController` 和认证中间件的共享库
