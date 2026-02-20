---
title: "端点参考"
---

# 端点参考

<div class="article-intro">

本节记录了 ChurchApps API 暴露的所有 REST 端点。每个模块页面列出了每个路由的 HTTP 方法、路径、认证要求和所需权限。

</div>

## 基础 URL

| 环境 | URL |
|-------------|-----|
| 本地开发 | `http://localhost:8084` |
| 生产环境 | `https://api.churchapps.org` |

## 请求约定

- **Content-Type：** 所有请求和响应体使用 `application/json`
- **多租户：** 每个认证请求都限定到从 JWT 令牌中提取的 `churchId` — 你不需要在 URL 中传递 `churchId`
- **批量保存：** 大多数 `POST` 端点接受**对象数组**。API 将在单次调用中插入新记录（无 `id` 字段）和更新现有记录（有 `id` 字段）
- **ID：** 所有实体 ID 均为 UUID

### 示例：批量保存

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

第一个对象被创建（新建）；第二个被更新（有 `id`）。

## 响应格式

成功的响应返回 JSON — 单个对象或数组。错误响应使用标准 HTTP 状态码：

| 状态码 | 含义 |
|------|---------|
| `200` | 成功 |
| `400` | 请求错误（验证错误） |
| `401` | 未授权（缺少/无效令牌或权限不足） |
| `404` | 未找到 |
| `500` | 服务器错误 |

验证错误返回：

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## 如何阅读端点表

每个模块页面按控制器组织端点。表格使用以下列：

| 列 | 描述 |
|--------|-------------|
| **方法** | HTTP 方法（`GET`、`POST`、`DELETE`） |
| **路径** | 相对于控制器基础路径的路由路径 |
| **认证** | **JWT** = 需要 Bearer 令牌，**公开** = 无需认证 |
| **权限** | 所需权限（如 `People.Edit`）。`—` 表示任何已认证用户 |
| **描述** | 端点的功能说明 |

继承标准 CRUD 基类的控制器自动提供四个端点：`GET /`（列出全部）、`GET /:id`（按 ID 获取）、`POST /`（创建/更新）和 `DELETE /:id`（删除）。

## 报表模块

报表模块的工作方式与其他模块不同。它不使用数据库支持的 CRUD，而是从磁盘上的 JSON 文件加载报表定义，并执行参数化 SQL 查询。

| 方法 | 路径 | 认证 | 描述 |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | 按键名加载报表定义 |
| GET | `/reporting/reports/:keyName/run` | JWT | 执行报表并返回结果 |

报表参数通过查询字符串值传递（如 `?startDate=2024-01-01&endDate=2024-12-31`）。`churchId` 参数从 JWT 令牌中自动注入。每个报表定义可以指定自己的权限要求。

## 模块索引

| 模块 | 基础路径 | 描述 |
|--------|-----------|-------------|
| [认证](./authentication) | `/membership/users`、`/membership/oauth` | 登录、注册、JWT 令牌、OAuth、权限 |
| [成员管理](./membership) | `/membership/*` | 人员、教会、群组、家庭、角色、表单、设置 |
| [出席](./attendance) | `/attendance/*` | 校区、礼拜、场次、访问、签到记录 |
| [内容](./content) | `/content/*` | 页面、讲道、活动、文件、图库、圣经、流媒体 |
| [捐赠](./giving) | `/giving/*` | 捐款、基金、支付网关、订阅 |
| [消息](./messaging) | `/messaging/*` | 会话、通知、设备、短信 |
| [事务](./doing) | `/doing/*` | 计划、任务、分配、自动化、排班 |
