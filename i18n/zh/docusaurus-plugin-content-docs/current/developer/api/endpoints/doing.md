---
title: "事务端点"
---

# 事务端点

<div class="article-intro">

事务模块管理礼拜规划、志愿者排班、任务管理和自动化。它提供工具来创建包含时间和职位的礼拜计划、分配志愿者、管理封锁日期、构建礼拜流程项目、连接外部内容提供者，以及配置带条件和操作的自动化工作流。

</div>

**基础路径：** `/doing`

## 计划

基础路径：`/doing/plans`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有计划 |
| GET | `/:id` | JWT | — | 按 ID 获取计划 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个计划 |
| GET | `/types/:planTypeId` | JWT | — | 按计划类型获取计划 |
| GET | `/presenter` | JWT | — | 获取未来 7 天的计划（演示视图） |
| GET | `/public/current/:planTypeId` | 公开 | — | 获取某计划类型的当前计划 |
| POST | `/` | JWT | — | 创建或更新计划（接受单个对象或数组） |
| POST | `/copy/:id` | JWT | — | 复制计划，包括职位、时间、分配和礼拜流程项目。请求体包含 `copyMode`（"none"、"positions"、"all"）和 `copyServiceOrder`（布尔值） |
| POST | `/autofill/:id` | JWT | — | 自动填充计划的志愿者分配。请求体：`{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | 删除计划及所有相关的时间、分配、职位和计划项目 |

### 示例：复制计划

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## 计划类型

基础路径：`/doing/planTypes`

继承 CRUD 基类（GET `/`、GET `/:id`、POST `/`、DELETE `/:id` — 无权限检查）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有计划类型 |
| GET | `/:id` | JWT | — | 按 ID 获取计划类型 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个计划类型 |
| GET | `/ministryId/:ministryId` | JWT | — | 获取某事工的计划类型 |
| POST | `/` | JWT | — | 创建或更新计划类型 |
| DELETE | `/:id` | JWT | — | 删除计划类型 |

## 计划项目

基础路径：`/doing/planItems`

管理礼拜流程项目（标题、区段、歌曲等），以父子树结构组织。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取计划项目 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个计划项目 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有计划项目（返回树结构） |
| GET | `/presenter/:churchId/:planId` | 公开 | — | 获取演示视图的计划项目（返回树结构） |
| POST | `/` | JWT | — | 创建或更新计划项目 |
| POST | `/sort` | JWT | — | 更新计划项目的排序顺序（重新排序同级项目） |
| DELETE | `/:id` | JWT | — | 删除计划项目 |

## 计划信号源

基础路径：`/doing/planFeed`

为演示器提供计划项目信号源。如果不存在计划项目，则使用计划的 `contentId` 自动从 Lessons.church 场地信号源填充。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | 公开 | — | 获取演示器的计划信号源（如为空则从场地信号源自动填充） |

## 职位

基础路径：`/doing/positions`

继承 CRUD 基类（GET `/:id`、POST `/`、DELETE `/:id` — 无权限检查）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取职位 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个职位 |
| GET | `/plan/ids?planIds=` | JWT | — | 按逗号分隔的计划 ID 获取多个计划的职位 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有职位 |
| POST | `/` | JWT | — | 创建或更新职位 |
| DELETE | `/:id` | JWT | — | 删除职位 |

## 时间

基础路径：`/doing/times`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | 列出教会的所有时间 |
| GET | `/:id` | JWT | — | 按 ID 获取时间 |
| GET | `/plans?planIds=` | JWT | — | 按逗号分隔的计划 ID 获取多个计划的时间 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有时间 |
| POST | `/` | JWT | — | 创建或更新时间 |
| DELETE | `/:id` | JWT | — | 删除时间 |

## 分配

基础路径：`/doing/assignments`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的分配 |
| GET | `/:id` | JWT | — | 按 ID 获取分配 |
| GET | `/plan/ids?planIds=` | JWT | — | 按逗号分隔的计划 ID 获取多个计划的分配 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有分配 |
| POST | `/` | JWT | — | 创建或更新分配（默认状态为"未确认"） |
| POST | `/accept/:id` | JWT | — | 接受分配（必须是被分配的人员） |
| POST | `/decline/:id` | JWT | — | 拒绝分配（必须是被分配的人员） |
| DELETE | `/:id` | JWT | — | 删除分配 |

### 示例：接受分配

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## 封锁日期

基础路径：`/doing/blockoutDates`

继承 CRUD 基类（GET `/:id`、DELETE `/:id` — 无权限检查）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取封锁日期 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个封锁日期 |
| GET | `/my` | JWT | — | 获取当前用户的封锁日期 |
| GET | `/upcoming` | JWT | — | 获取教会所有即将到来的封锁日期 |
| POST | `/` | JWT | — | 创建或更新封锁日期（如未提供则默认 personId 为当前用户） |
| DELETE | `/:id` | JWT | — | 删除封锁日期 |

## 任务

基础路径：`/doing/tasks`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 获取当前用户的待办任务 |
| GET | `/:id` | JWT | — | 按 ID 获取任务 |
| GET | `/closed` | JWT | — | 获取当前用户的已完成任务 |
| GET | `/timeline?taskIds=` | JWT | — | 按逗号分隔的任务 ID 获取任务的时间线数据 |
| GET | `/directoryUpdate/:personId` | JWT | — | 获取某人的通讯录更新任务 |
| POST | `/` | JWT | — | 创建或更新任务。添加 `?type=directoryUpdate` 处理通讯录更新任务（自动上传照片） |
| POST | `/loadForGroups` | JWT | — | 加载特定群组的任务。请求体：`{ groupIds: [], status: "Open" }` |

## 自动化

基础路径：`/doing/automations`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有自动化 |
| GET | `/:id` | JWT | — | 按 ID 获取自动化 |
| GET | `/check` | 公开 | — | 触发所有自动化的检查 |
| POST | `/` | JWT | — | 创建或更新自动化 |
| DELETE | `/:id` | JWT | — | 删除自动化 |

## 操作

基础路径：`/doing/actions`

操作定义了自动化触发时执行的内容。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取操作 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有操作 |
| POST | `/` | JWT | — | 创建或更新操作 |
| DELETE | `/:id` | JWT | — | 删除操作 |

## 条件

基础路径：`/doing/conditions`

条件定义了触发自动化的标准。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取条件 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有条件 |
| POST | `/` | JWT | — | 创建或更新条件 |
| DELETE | `/:id` | JWT | — | 删除条件 |

## 连接词

基础路径：`/doing/conjunctions`

连接词在自动化中将多个条件链接在一起（AND/OR 逻辑）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取连接词 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有连接词 |
| POST | `/` | JWT | — | 创建或更新连接词 |
| DELETE | `/:id` | JWT | — | 删除连接词 |

## 内容提供者认证

基础路径：`/doing/contentProviderAuths`

继承 CRUD 基类（GET `/`、GET `/:id`、POST `/`、DELETE `/:id` — 无权限检查）。

管理外部内容提供者（如演示软件集成）的 OAuth 认证记录。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有内容提供者认证 |
| GET | `/:id` | JWT | — | 按 ID 获取内容提供者认证 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个内容提供者认证 |
| GET | `/ministry/:ministryId` | JWT | — | 获取某事工的所有内容提供者认证 |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | 获取特定事工和提供者的认证记录 |
| POST | `/` | JWT | — | 创建或更新内容提供者认证 |
| DELETE | `/:id` | JWT | — | 删除内容提供者认证 |

## 提供者代理

基础路径：`/doing/providerProxy`

代理向外部内容提供者（如 ProPresenter、EasyWorship）的请求。当令牌过期时自动处理令牌刷新。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | 浏览内容提供者的文件。请求体：`{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | 从内容提供者获取演示文稿。请求体：`{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | 从内容提供者获取播放列表。请求体：`{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | 获取内容项目的说明。请求体：`{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | 获取内容项目的展开说明。请求体：`{ ministryId, providerId, path }` |

## 相关页面

- [成员管理端点](./membership) — 人员、群组、角色和权限
- [出席端点](./attendance) — 礼拜和访问跟踪
- [模块结构](../module-structure) — 代码组织模式
