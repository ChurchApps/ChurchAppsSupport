---
title: "成员管理端点"
---

# 成员管理端点

<div class="article-intro">

成员管理模块管理人员、教会、群组、家庭、角色、权限、表单和设置。它是最大的模块，为所有其他模块提供核心身份和授权层。

</div>

**基础路径：** `/membership`

## 人员

基础路径：`/membership/people`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View 或成员 | 列出教会的所有人员 |
| GET | `/:id` | JWT | People.View 或自己的记录 | 按 ID 获取人员（包含表单提交） |
| GET | `/ids?ids=` | JWT | People.View 或成员 | 按逗号分隔的 ID 获取多个人员 |
| GET | `/basic?ids=` | JWT | — | 获取多个人员的基本信息（仅姓名） |
| GET | `/recent` | JWT | People.View 或成员 | 最近添加的人员 |
| GET | `/search?term=&email=` | JWT | People.View 或成员 | 按姓名或邮箱搜索人员 |
| GET | `/search/phone?number=` | JWT | People.View 或成员 | 按电话号码搜索 |
| GET | `/search/group?groupId=` | JWT | People.View 或成员 | 获取特定群组中的人员 |
| GET | `/household/:householdId` | JWT | — | 获取家庭中的所有人员 |
| GET | `/attendance` | JWT | People.Edit | 加载带过滤器的出席者（campusId、serviceId、serviceTimeId、groupId、categoryName、startDate、endDate） |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 加载人员和群组的时间线数据 |
| GET | `/directory/:id` | JWT | — | 获取通讯录视图的人员（尊重可见性偏好） |
| GET | `/claim/:churchId` | JWT | — | 为当前用户在某教会认领人员记录 |
| POST | `/` | JWT | People.Edit 或 EditSelf | 创建或更新人员（批量） |
| POST | `/search` | JWT | People.View 或成员 | 搜索人员（POST 变体） |
| POST | `/advancedSearch` | JWT | People.View 或成员 | 多条件搜索（年龄、出生月份、成员状态等） |
| POST | `/loadOrCreate` | 公开 | — | 按邮箱查找或创建人员。请求体：`{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | 更新家庭成员分配 |
| POST | `/public/email` | 公开 | — | 向某人发送邮件。请求体：`{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | 内部 | — | 按 ID 加载人员邮箱（服务器间通信，需要 jwtSecret） |
| DELETE | `/:id` | JWT | People.Edit | 删除人员 |

### 示例：搜索人员

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### 示例：创建人员

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## 用户

基础路径：`/membership/users`

有关登录、注册和密码管理端点，请参见[认证与权限](./authentication)。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/login` | 公开 | — | 登录（邮箱/密码、JWT 刷新或 authGuid） |
| POST | `/register` | 公开 | — | 注册新用户 |
| POST | `/forgot` | 公开 | — | 发送密码重置邮件 |
| POST | `/setPasswordGuid` | 公开 | — | 使用邮件链接中的认证 GUID 设置密码 |
| POST | `/verifyCredentials` | 公开 | — | 验证邮箱/密码并返回关联的教会 |
| POST | `/loadOrCreate` | JWT | — | 按邮箱/userId 查找或创建用户 |
| POST | `/setDisplayName` | JWT | — | 更新用户的姓和名 |
| POST | `/updateEmail` | JWT | — | 更改用户的邮箱地址 |
| POST | `/updatePassword` | JWT | — | 更改用户的密码（最少 6 个字符） |
| POST | `/updateOptedOut` | JWT | — | 设置人员的退出状态 |
| GET | `/search?term=` | JWT | Server.Admin | 按姓名/邮箱搜索所有用户 |
| DELETE | `/` | JWT | — | 删除当前用户账户 |

## 教会

基础路径：`/membership/churches`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载当前用户的所有教会 |
| GET | `/:id` | JWT | — | 按 ID 获取教会 |
| GET | `/:id/getDomainAdmin` | JWT | — | 获取教会的域管理员用户 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 模拟教会（仅服务器管理员） |
| GET | `/all?term=` | JWT | Server.Admin | 搜索所有教会（管理员） |
| GET | `/search/?name=` | 公开 | — | 按名称搜索教会 |
| GET | `/lookup/?subDomain=&id=` | 公开 | — | 按子域名或 ID 查找教会 |
| POST | `/` | JWT | Settings.Edit | 更新教会详情 |
| POST | `/add` | JWT | — | 注册新教会。必填字段：name、address1、city、state、zip、country |
| POST | `/search` | 公开 | — | 按名称搜索教会（POST 变体） |
| POST | `/select` | JWT | — | 选择/切换到某教会。请求体：`{ churchId }` 或 `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 归档或取消归档教会 |
| POST | `/byIds` | 公开 | — | 按 ID 加载多个教会 |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 删除已废弃 7 天以上的教会 |

## 群组

基础路径：`/membership/groups`

继承标准 CRUD（基类提供 GET `/`、GET `/:id`）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有群组 |
| GET | `/:id` | JWT | — | 按 ID 获取群组 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 按礼拜过滤器搜索群组 |
| GET | `/my` | JWT | — | 获取当前用户的群组 |
| GET | `/my/:tag` | JWT | — | 获取当前用户按标签过滤的群组 |
| GET | `/tag/:tag` | JWT | — | 获取具有特定标签的所有群组 |
| GET | `/public/:churchId/:id` | 公开 | — | 按教会和 ID 获取公开群组 |
| GET | `/public/:churchId/tag/:tag` | 公开 | — | 按标签获取公开群组 |
| GET | `/public/:churchId/label?label=` | 公开 | — | 按标签获取公开群组 |
| GET | `/public/:churchId/slug/:slug` | 公开 | — | 按 slug 获取公开群组 |
| POST | `/` | JWT | Groups.Edit | 创建或更新群组（自动生成 slug） |
| DELETE | `/:id` | JWT | Groups.Edit | 删除群组（同时删除事工群组的子团队） |

## 群组成员

基础路径：`/membership/groupmembers`

继承标准 CRUD（基类提供 GET `/:id`、DELETE `/:id`）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | 按 ID 获取群组成员 |
| GET | `/` | JWT | GroupMembers.View* | 列出群组成员。按 `?groupId=`、`?groupIds=` 或 `?personId=` 过滤。*如果用户在群组中或查询自己的 personId 也允许访问 |
| GET | `/my` | JWT | — | 获取当前用户的群组成员资格 |
| GET | `/basic/:groupId` | JWT | — | 获取群组的基本成员列表 |
| GET | `/public/leaders/:churchId/:groupId` | 公开 | — | 获取群组领导者（公开） |
| POST | `/` | JWT | GroupMembers.Edit | 添加或更新群组成员 |
| DELETE | `/:id` | JWT | GroupMembers.View | 移除群组成员 |

## 家庭

基础路径：`/membership/households`

标准 CRUD 控制器。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有家庭 |
| GET | `/:id` | JWT | — | 按 ID 获取家庭 |
| POST | `/` | JWT | People.Edit | 创建或更新家庭 |
| DELETE | `/:id` | JWT | People.Edit | 删除家庭 |

## 角色

基础路径：`/membership/roles`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | 按 ID 获取角色 |
| GET | `/church/:churchId` | JWT | Roles.View | 获取教会的所有角色 |
| POST | `/` | JWT | Roles.Edit | 创建或更新角色 |
| DELETE | `/:id` | JWT | Roles.Edit | 删除角色（同时移除其权限和成员） |

## 角色成员

基础路径：`/membership/rolemembers`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 获取角色的成员。添加 `?include=users` 以包含用户详情 |
| POST | `/` | JWT | Roles.Edit | 向角色添加成员（如果邮箱不存在则创建用户） |
| DELETE | `/:id` | JWT | Roles.View | 移除角色成员 |
| DELETE | `/self/:churchId/:userId` | JWT | — | 将自己从教会中移除 |

## 角色权限

基础路径：`/membership/rolepermissions`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 获取角色的权限（使用 `null` 作为 ID 获取"所有人"角色） |
| POST | `/` | JWT | Roles.Edit | 创建或更新角色权限 |
| DELETE | `/:id` | JWT | Roles.Edit | 删除角色权限 |

## 权限

基础路径：`/membership/permissions`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 获取完整的可用权限列表 |

## 表单

基础路径：`/membership/forms`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 或 Forms.Edit | 列出所有表单（管理员看到所有；编辑者看到已分配的和非成员表单） |
| GET | `/:id` | JWT | 表单访问权限 | 按 ID 获取表单 |
| GET | `/archived` | JWT | Forms.Admin 或 Forms.Edit | 列出已归档的表单 |
| GET | `/standalone/:id?churchId=` | JWT | — | 获取独立表单（受限表单需要认证） |
| POST | `/` | JWT | Forms.Admin 或 Forms.Edit | 创建或更新表单 |
| DELETE | `/:id` | JWT | 表单访问权限 | 删除表单 |

## 表单提交

基础路径：`/membership/formsubmissions`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 或 Forms.Edit | 列出提交。按 `?personId=` 或 `?formId=` 过滤 |
| GET | `/:id` | JWT | Forms.Admin 或 Forms.Edit | 按 ID 获取提交。添加 `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | 表单访问权限 | 获取某表单的所有提交（包含表单、问题、答案） |
| POST | `/` | JWT | — | 提交表单答案（处理受限/非受限表单，发送邮件通知） |
| DELETE | `/:id` | JWT | Forms.Admin 或 Forms.Edit | 删除提交及其答案 |

## 问题

基础路径：`/membership/questions`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | 表单访问权限 | 列出某表单的问题。需要 `?formId=` |
| GET | `/:id` | JWT | 表单访问权限 | 按 ID 获取问题 |
| GET | `/unrestricted?formId=` | JWT | — | 获取非受限表单的问题 |
| GET | `/sort/:id/up` | JWT | — | 将问题向上移动排序 |
| GET | `/sort/:id/down` | JWT | — | 将问题向下移动排序 |
| POST | `/` | JWT | 表单访问权限 | 创建或更新问题（自动分配排序顺序） |
| DELETE | `/:id?formId=` | JWT | 表单访问权限 | 删除问题 |

## 答案

基础路径：`/membership/answers`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 或 Forms.Edit | 列出答案。按 `?formSubmissionId=` 过滤 |
| POST | `/` | JWT | Forms.Admin 或 Forms.Edit | 创建或更新答案 |

## 成员权限

基础路径：`/membership/memberpermissions`

控制每个成员对特定表单的访问权限。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | 表单访问权限 | 按 ID 获取成员权限 |
| GET | `/member/:id` | JWT | 表单访问权限 | 获取成员的所有表单权限 |
| GET | `/form/:id` | JWT | 表单访问权限 | 获取表单的所有成员权限 |
| GET | `/form/:id/my` | JWT | 表单访问权限 | 获取当前用户对某表单的权限 |
| POST | `/` | JWT | 表单访问权限 | 创建或更新成员权限 |
| DELETE | `/:id?formId=` | JWT | 表单访问权限 | 删除成员权限 |
| DELETE | `/member/:id?formId=` | JWT | 表单访问权限 | 删除成员在某表单上的所有权限 |

## 设置

基础路径：`/membership/settings`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | 获取教会的所有设置 |
| GET | `/public/:churchId` | 公开 | — | 获取教会的公开设置 |
| POST | `/` | JWT | Settings.Edit | 保存设置（支持 base64 图片上传） |

## 域名

基础路径：`/membership/domains`

继承标准 CRUD（基类提供 GET `/:id`、GET `/`、DELETE `/:id`）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有域名 |
| GET | `/:id` | JWT | — | 按 ID 获取域名 |
| GET | `/lookup/:domainName` | JWT | — | 按名称查找域名 |
| GET | `/public/lookup/:domainName` | 公开 | — | 公开按名称查找域名 |
| GET | `/health/check` | 公开 | — | 对未检查的域名运行健康检查 |
| POST | `/` | JWT | Settings.Edit | 创建或更新域名（触发 Caddy 更新） |
| DELETE | `/:id` | JWT | Settings.Edit | 删除域名 |

## 用户教会

基础路径：`/membership/userchurch`

管理用户和教会之间的关联。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | 按用户 ID 获取用户-教会记录 |
| GET | `/personid/:personId` | JWT | — | 获取人员关联用户的邮箱 |
| GET | `/user/:userId` | JWT | Server.Admin | 加载用户的所有教会 |
| POST | `/` | JWT | — | 创建用户-教会关联 |
| PATCH | `/:userId` | JWT | — | 更新最后访问时间并记录访问 |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | 删除用户-教会记录 |

## 可见性偏好

基础路径：`/membership/visibilityPreferences`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的可见性偏好 |
| POST | `/` | JWT | — | 保存可见性偏好（地址、电话、邮箱可见性） |

## 查询

基础路径：`/membership/query`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | 使用 AI 进行自然语言成员搜索。请求体：`{ text, subDomain, siteUrl }` |

## 客户端错误

基础路径：`/membership/clientErrors`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | 记录客户端错误 |

## 相关页面

- [认证与权限](./authentication) — 登录流程、JWT、OAuth、权限模型
- [出席端点](./attendance) — 礼拜和访问跟踪
- [模块结构](../module-structure) — 代码组织模式
