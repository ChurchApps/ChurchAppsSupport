---
title: "Membership 端点"
---

# Membership 端点

<div class="article-intro">

Membership 模块负责管理人员、教会、小组、家庭、角色、权限、表单和设置。它是最大的模块，为所有其他模块提供核心的身份与授权层。

</div>

**基础路径：** `/membership`

## 人员

基础路径：`/membership/people`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View 或 Member | 列出教会的所有人员 |
| GET | `/:id` | JWT | People.View 或本人记录 | 按 ID 获取人员（包含表单提交记录） |
| GET | `/ids?ids=` | JWT | People.View 或 Member | 按逗号分隔的 ID 获取多个人员 |
| GET | `/basic?ids=` | JWT | — | 获取多个人员的基本信息（仅姓名） |
| GET | `/names?ids=` | JWT | 任意教会权限 | `[{ id, name: { display, first, last }, photo }]`，按姓氏再按名字排序，针对调用者已有的逗号分隔 ID 返回。这样即使角色没有 People.View（如奉献、出勤角色）也能为人员显示名称。不支持搜索，也不支持目录筛选 |
| POST | `/names` | JWT | 任意教会权限 | 与 `GET /names` 相同。请求体：`{ peopleIds }`（或 `{ ids }`） |
| GET | `/recent` | JWT | People.View、Member 或 People.ViewNames | 最近添加的人员。仅具有 People.ViewNames 权限的调用者会获得基本模型（`id`、`name.display`、`photo`、`membershipStatus`），且已选择退出的人员不会包含在内 |
| GET | `/search?term=&email=` | JWT | People.View、Member 或 People.ViewNames | 按姓名或电子邮件搜索人员（最多 100 条，按姓氏再按名字排序）。仅具有 People.ViewNames 权限的调用者进行姓名搜索时返回基本模型；使用 `email` 搜索时返回 `[]` |
| GET | `/search/phone?number=` | JWT | People.View 或 Member | 按电话号码搜索 |
| GET | `/search/group?groupId=` | JWT | People.View 或 Member | 获取特定小组中的人员 |
| GET | `/household/:householdId` | JWT | — | 获取某个家庭中的所有人员 |
| GET | `/attendance` | JWT | People.Edit | 按筛选条件加载出席者（campusId、serviceId、serviceTimeId、groupId、categoryName、startDate、endDate） |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 加载人员和小组的时间线数据 |
| GET | `/directory/:id` | JWT | — | 获取用于目录视图的人员信息（遵循可见性偏好设置） |
| GET | `/claim/:churchId` | JWT | — | 在某个教会中为当前用户认领人员记录 |
| POST | `/` | JWT | People.Edit 或 EditSelf | 创建或更新人员（批量） |
| POST | `/search` | JWT | People.View、Member 或 People.ViewNames | 搜索人员（POST 版本）。请求体：`{ term }` 或 `{ email }`；仅姓名的规则与 `GET /search` 相同 |
| POST | `/advancedSearch` | JWT | People.View 或 Member | 多条件搜索（年龄、birthMonth、membershipStatus 等） |
| POST | `/loadOrCreate` | 公开 | — | 按电子邮件查找或创建人员。请求体：`{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | 更新家庭成员分配 |
| POST | `/public/email` | 公开 | — | 向人员发送电子邮件。请求体：`{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | 内部 | — | 按 ID 加载人员的电子邮件（服务器间调用，需要 jwtSecret） |
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

## 用户 {#users}

基础路径：`/membership/users`

有关登录、注册和密码管理端点，请参阅[认证与权限](./authentication)。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| POST | `/login` | 公开 | — | 登录（电子邮件/密码、JWT 刷新或 authGuid） |
| POST | `/register` | 公开 | — | 注册新用户 |
| POST | `/forgot` | 公开 | — | 发送密码重置电子邮件 |
| POST | `/setPasswordGuid` | 公开 | — | 使用电子邮件链接中的认证 GUID 设置密码 |
| POST | `/verifyCredentials` | 公开 | — | 验证电子邮件/密码并返回关联的教会 |
| POST | `/loadOrCreate` | JWT | — | 按电子邮件/userId 查找或创建用户 |
| POST | `/setDisplayName` | JWT | — | 更新用户的名和姓 |
| POST | `/updateEmail` | JWT | — | 更改用户的电子邮件地址 |
| POST | `/updatePassword` | JWT | — | 更改用户密码（至少 6 个字符） |
| POST | `/updateOptedOut` | JWT | — | 设置人员的退出状态 |
| POST | `/sendInviteEmail` | JWT | People.Edit | 向该教会中的某人发送邀请电子邮件（`email`、`personName`、`contextName`）。对于没有账户的人，按钮显示 **Sign Up**；对于已有用户，显示 **Log In**。从未登录过的用户会收到 **Set Your Password** 链接，该链接 7 天后过期。计入教会的每日电子邮件限额（达到上限时返回 `429`） |
| GET | `/search?term=` | JWT | Server.Admin | 按姓名/电子邮件搜索所有用户 |
| DELETE | `/` | JWT | — | 删除当前用户账户 |

## 教会

基础路径：`/membership/churches`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载当前用户的所有教会 |
| GET | `/:id` | JWT | — | 按 ID 获取教会 |
| GET | `/:id/getDomainAdmin` | JWT | — | 获取教会的域管理员用户 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 模拟某个教会（仅限服务器管理员） |
| GET | `/all?term=` | JWT | Server.Admin | 搜索所有教会（管理员） |
| GET | `/search/?name=` | 公开 | — | 按名称搜索教会 |
| GET | `/lookup/?subDomain=&id=` | 公开 | — | 按子域名或 ID 查找教会 |
| POST | `/` | JWT | Settings.Edit | 更新教会详细信息 |
| POST | `/add` | JWT | — | 注册新教会。必填字段：name、address1、city、state、zip、country |
| POST | `/search` | 公开 | — | 按名称搜索教会（POST 版本） |
| POST | `/select` | JWT | — | 选择/切换到某个教会。请求体：`{ churchId }` 或 `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 归档或取消归档教会 |
| POST | `/byIds` | 公开 | — | 按 ID 加载多个教会 |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 删除已废弃 7 天以上的教会 |

## 小组

基础路径：`/membership/groups`

继承标准 CRUD（基类中的 GET `/`、GET `/:id`）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有小组 |
| GET | `/:id` | JWT | — | 按 ID 获取小组 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 按礼拜筛选条件搜索小组 |
| GET | `/my` | JWT | — | 获取当前用户所在的小组 |
| GET | `/my/:tag` | JWT | — | 按标签筛选获取当前用户的小组 |
| GET | `/tag/:tag` | JWT | — | 获取带有特定标签的所有小组 |
| GET | `/public/:churchId/:id` | 公开 | — | 按教会和 ID 获取公开小组 |
| GET | `/public/:churchId/tag/:tag` | 公开 | — | 按标签获取公开小组 |
| GET | `/public/:churchId/label?label=` | 公开 | — | 按标签名获取公开小组 |
| GET | `/public/:churchId/slug/:slug` | 公开 | — | 按 slug 获取公开小组 |
| POST | `/` | JWT | Groups.Edit | 创建或更新小组（自动生成 slug） |
| DELETE | `/:id` | JWT | Groups.Edit | 删除小组（对于事工小组，同时删除其子团队） |

## 小组成员

基础路径：`/membership/groupmembers`

继承标准 CRUD（基类中的 GET `/:id`、DELETE `/:id`）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | 按 ID 获取小组成员 |
| GET | `/` | JWT | GroupMembers.View* | 列出小组成员。可按 `?groupId=`、`?groupIds=` 或 `?personId=` 筛选。*如果用户在该小组中，或查询的是自己的 personId，同样允许 |
| GET | `/my` | JWT | — | 获取当前用户的小组成员身份 |
| GET | `/basic/:groupId` | JWT | — | 获取小组的基本成员列表 |
| GET | `/public/leaders/:churchId/:groupId` | 公开 | — | 获取小组负责人（公开） |
| GET | `/public/:churchId/:groupId` | 公开 | — | 获取小组的公开名册（最少字段：`personId`、`displayName`、`leader`、照片）。仅当小组通过 `publicRoster` 选择加入时可用；为网站构建器的 `staffGrid` 元素提供数据 |
| POST | `/` | JWT | GroupMembers.Edit | 添加或更新小组成员 |
| DELETE | `/:id` | JWT | GroupMembers.View | 移除小组成员 |

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
| GET | `/roles/:id` | JWT | Roles.View | 获取某角色的成员。添加 `?include=users` 可包含用户详细信息 |
| POST | `/` | JWT | Roles.Edit | 向角色添加成员（如果电子邮件不存在则创建用户） |
| DELETE | `/:id` | JWT | Roles.View | 移除角色成员 |
| DELETE | `/self/:churchId/:userId` | JWT | — | 将自己从教会中移除 |

## 角色权限

基础路径：`/membership/rolepermissions`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 获取某角色的权限（使用 `null` 作为 ID 表示 "Everyone" 角色） |
| POST | `/` | JWT | Roles.Edit | 创建或更新角色权限 |
| DELETE | `/:id` | JWT | Roles.Edit | 删除角色权限 |

## 权限

基础路径：`/membership/permissions`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 获取所有可用权限的完整列表 |

每个条目都包含 `apiName`、`section`（内容类型）、`action`，以及 B1Admin 角色编辑器显示的 `displaySection` / `displayAction` 标签。近期新增项：`MembershipApi` / `People` / `View Names`（**View People Names Only**，位于 People and Groups 下）和 `GivingApi` / `Donations` / `Enter`（**Enter Donations**，位于 Donations 下；请参阅[奉献批次](./giving.md#donation-batches)）。

## 表单

基础路径：`/membership/forms`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 或 Forms.Edit | 列出所有表单（管理员可看到全部；编辑者可看到分配给自己的表单和非成员表单） |
| GET | `/:id` | JWT | 表单访问权限 | 按 ID 获取表单 |
| GET | `/archived` | JWT | Forms.Admin 或 Forms.Edit | 列出已归档的表单 |
| GET | `/standalone/:id?churchId=` | JWT | — | 获取独立表单（受限表单需要认证） |
| POST | `/` | JWT | Forms.Admin 或 Forms.Edit | 创建或更新表单 |
| DELETE | `/:id` | JWT | 表单访问权限 | 删除表单 |

## 表单提交

基础路径：`/membership/formsubmissions`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 或 Forms.Edit | 列出提交记录。可按 `?personId=` 或 `?formId=` 筛选 |
| GET | `/:id` | JWT | Forms.Admin 或 Forms.Edit | 按 ID 获取提交记录。添加 `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | 表单访问权限 | 获取某表单的所有提交记录（包含表单、问题和答案） |
| POST | `/` | JWT | — | 提交表单答案（处理受限/非受限表单，并发送电子邮件通知）。当表单设置了 `autoCreatePerson` 时，会按电子邮件查找或创建 Guest 人员，并关联该提交记录；当设置了 `followUpSubject`/`followUpBody` 时，会向提交者发送基于模板的跟进电子邮件 |
| DELETE | `/:id` | JWT | Forms.Admin 或 Forms.Edit | 删除提交记录及其答案 |

## 问题

基础路径：`/membership/questions`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | 表单访问权限 | 列出表单的问题。必须提供 `?formId=` |
| GET | `/:id` | JWT | 表单访问权限 | 按 ID 获取问题 |
| GET | `/unrestricted?formId=` | JWT | — | 获取非受限表单的问题 |
| GET | `/sort/:id/up` | JWT | — | 将问题在排序中上移 |
| GET | `/sort/:id/down` | JWT | — | 将问题在排序中下移 |
| POST | `/` | JWT | 表单访问权限 | 创建或更新问题（自动分配排序） |
| DELETE | `/:id?formId=` | JWT | 表单访问权限 | 删除问题 |

## 答案

基础路径：`/membership/answers`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 或 Forms.Edit | 列出答案。可按 `?formSubmissionId=` 筛选 |
| POST | `/` | JWT | Forms.Admin 或 Forms.Edit | 创建或更新答案 |

## 成员权限

基础路径：`/membership/memberpermissions`

控制每位成员对特定表单的访问权限。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | 表单访问权限 | 按 ID 获取成员权限 |
| GET | `/member/:id` | JWT | 表单访问权限 | 获取某成员的所有表单权限 |
| GET | `/form/:id` | JWT | 表单访问权限 | 获取某表单的所有成员权限 |
| GET | `/form/:id/my` | JWT | 表单访问权限 | 获取当前用户对某表单的权限 |
| POST | `/` | JWT | 表单访问权限 | 创建或更新成员权限 |
| DELETE | `/:id?formId=` | JWT | 表单访问权限 | 删除成员权限 |
| DELETE | `/member/:id?formId=` | JWT | 表单访问权限 | 删除某成员对某表单的所有权限 |

## 设置

基础路径：`/membership/settings`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | 获取教会的所有设置 |
| GET | `/public/:churchId` | 公开 | — | 获取教会的公开设置 |
| POST | `/` | JWT | Settings.Edit | 保存设置（支持 base64 图片上传） |

## 域名

基础路径：`/membership/domains`

继承标准 CRUD（基类中的 GET `/:id`、GET `/`、DELETE `/:id`）。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有域名 |
| GET | `/:id` | JWT | — | 按 ID 获取域名 |
| GET | `/lookup/:domainName` | JWT | — | 按名称查找域名 |
| GET | `/public/lookup/:domainName` | 公开 | — | 按名称公开查找域名 |
| GET | `/health/check` | 公开 | — | 对未检查的域名运行健康检查 |
| POST | `/` | JWT | Settings.Edit | 创建或更新域名（触发 Caddy 更新） |
| DELETE | `/:id` | JWT | Settings.Edit | 删除域名 |

## 用户与教会关联

基础路径：`/membership/userchurch`

管理用户与教会之间的关联。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | 按用户 ID 获取用户与教会的关联记录 |
| GET | `/personid/:personId` | JWT | — | 获取某人员关联用户的电子邮件 |
| GET | `/user/:userId` | JWT | Server.Admin | 加载某用户的所有教会 |
| POST | `/` | JWT | — | 创建用户与教会的关联 |
| PATCH | `/:userId` | JWT | — | 更新最后访问时间并记录访问日志 |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | 删除用户与教会的关联记录 |

## 可见性偏好设置

基础路径：`/membership/visibilityPreferences`

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的可见性偏好设置 |
| POST | `/` | JWT | — | 保存可见性偏好设置（地址、电话、电子邮件的可见性） |

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

- [Membership 端点](./membership) — 人员、教会、小组、角色和权限
- [认证与权限](./authentication) — 登录流程、JWT、OAuth、权限模型
- [模块结构](../module-structure) — 代码组织模式
