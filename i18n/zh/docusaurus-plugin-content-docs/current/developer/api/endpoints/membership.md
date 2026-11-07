---
title: "Membership 端点"
description: "ChurchApps 会员 API 的端点参考：人员、家庭、小组、角色、表单和设置，并附有认证和权限规则。"
---

# Membership 端点

<div class="article-intro">

Membership 模块负责管理人员、教会、小组、家庭、角色、权限、表单和设置。它是规模最大的模块，为所有其他模块提供核心的身份与授权层。

</div>

**基础路径：** `/membership`

## 人员

基础路径：`/membership/people`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View 或 Member | 列出教会的所有人员 |
| GET | `/:id` | JWT | People.View 或本人记录 | 根据 ID 获取人员（包含表单提交内容） |
| GET | `/ids?ids=` | JWT | People.View、Member 或 People.ViewNames | 根据逗号分隔的 ID 获取多个人员。仅具有 People.ViewNames 而不具有 People.View 的调用者会获得基础模型，已退订的人员会被排除（调用者本人除外） |
| GET | `/basic?ids=` | JWT | — | 获取多个人员的基础信息（仅姓名） |
| GET | `/names?ids=` | JWT | 任意教会权限 | `[{ id, name: { display, first, last }, photo }]`，按姓氏、再按名字排序，针对调用者已拥有的逗号分隔 ID，使得没有 People.View 的角色（奉献、出勤）也能为人员添加标签。不提供搜索，也不做目录过滤 |
| POST | `/names` | JWT | 任意教会权限 | 与 `GET /names` 相同。请求体：`{ peopleIds }`（或 `{ ids }`） |
| GET | `/recent` | JWT | People.View、Member 或 People.ViewNames | 最近添加的人员。仅具有 People.ViewNames 而不具有 People.View 的调用者（即使是具有目录访问权限的成员）获得基础模型（`id`、`name.display`、`photo`、`membershipStatus`），已退订的人员会被排除 |
| GET | `/guest-register/options?churchId=` | Public | — | 二维码访客登记的检查清单：返回 `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`，每项取值为 `"off"`、`"optional"` 或 `"required"`（从公开的 `guestRegistrationFields` 设置中解析；缺失或格式错误的值会回退为电子邮件/电话为可选、其余关闭）。除非请求携带匹配的网站/教会令牌，否则需要开启 `enableQRGuestRegistration`；有速率限制（429） |
| GET | `/search?term=&email=` | JWT | People.View、Member 或 People.ViewNames | 按姓名或电子邮件搜索人员（最多 100 人，按姓氏、再按名字排序）。仅具有 People.ViewNames 而不具有 People.View 的调用者（即使是具有目录访问权限的成员）会获得返回基础模型的姓名搜索；使用 `email` 搜索则返回 `[]` |
| GET | `/search/phone?number=` | JWT | People.View 或 Member | 按电话号码搜索 |
| GET | `/search/group?groupId=` | JWT | People.View 或 Member | 获取特定小组中的人员 |
| GET | `/household/:householdId` | JWT | — | 获取某家庭中的所有人员 |
| GET | `/attendance` | JWT | People.Edit | 按筛选条件加载出席者（campusId、serviceId、serviceTimeId、groupId、categoryName、startDate、endDate） |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | 加载人员和小组的时间线数据 |
| GET | `/directory/:id` | JWT | — | 获取用于通讯录视图的人员信息（遵循可见性偏好） |
| GET | `/claim/:churchId` | JWT | — | 为当前用户在某教会认领一条人员记录 |
| POST | `/` | JWT | People.Edit 或 EditSelf | 创建或更新人员（批量） |
| POST | `/search` | JWT | People.View、Member 或 People.ViewNames | 搜索人员（POST 变体）。请求体：`{ term }` 或 `{ email }`；仅姓名可见规则与 `GET /search` 相同 |
| POST | `/advancedSearch` | JWT | People.View 或 Member | 多条件搜索（年龄、出生月份、会籍状态等）。请求体为条件数组；空请求体表示无条件，其他非数组的请求体返回 400 |
| POST | `/loadOrCreate` | Public | — | 按电子邮件查找或创建人员。请求体：`{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Public | — | 二维码访客登记。请求体：`{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }`（1–10 名成员；email/phone/maritalStatus 仅适用于第一位成员）。教会关闭的字段会被丢弃；缺少必填项或值无效则返回 400。该接口会先复用已有人员：当恰好有一名未被移除的人员与某成员的名字相同（不区分大小写），且电子邮件或电话号码数字（住宅、工作或手机）相同时，即视为匹配；没有电子邮件或电话的成员则在已匹配的家庭内按名字匹配。匹配的人员永远不会被编辑。未匹配的成员会加入已匹配的家庭，或者新建一个家庭（以第一位成员的姓氏命名），会籍状态为 `membershipStatus: "Visitor"`，并使用共享的 `address`。若提交了 `comments`，则将其保存为第一位成员的备注；如果设置了 `guestRegistrationGroupId`，则将所有人加入该私密小组；当 `guestRegistrationRecordAttendance` 为 `"true"` 时，还会为该小组中当前签到窗口已开放、且已安排的礼拜时间记录出勤。返回 `{ householdId, people: [{ id, name }] }`，回显提交的姓名而非存储的姓名。与选项接口相同的选择加入/令牌及速率限制规则 |
| POST | `/household/:householdId` | JWT | People.Edit | 更新家庭成员分配 |
| POST | `/public/email` | Public | — | 向某人发送电子邮件。请求体：`{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | 按 ID 加载人员的电子邮件（服务器间调用，需要 jwtSecret） |
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

有关登录、注册和密码管理端点，请参阅[身份验证与权限](./authentication.md)。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | 登录（电子邮件/密码、JWT 刷新或 authGuid） |
| POST | `/register` | Public | — | 注册新用户 |
| POST | `/forgot` | Public | — | 发送密码重置邮件 |
| POST | `/setPasswordGuid` | Public | — | 使用邮件链接中的 auth GUID 设置密码 |
| POST | `/verifyCredentials` | Public | — | 验证电子邮件/密码，并返回关联的教会 |
| POST | `/loadOrCreate` | JWT | — | 按电子邮件/userId 查找或创建用户 |
| POST | `/setDisplayName` | JWT | — | 更新用户的名字和姓氏 |
| POST | `/updateEmail` | JWT | — | 更改用户的电子邮件地址 |
| POST | `/updatePassword` | JWT | — | 更改用户密码（至少 6 个字符） |
| POST | `/updateOptedOut` | JWT | — | 设置人员的退订状态 |
| POST | `/sendInviteEmail` | JWT | People.Edit | 向本教会的某人发送邀请邮件（`email`、`personName`、`contextName`）。对于没有账号的人，按钮显示 **Sign Up**（注册）；对于已有用户，显示 **Log In**（登录）。从未登录过的用户则会收到一个 **Set Your Password**（设置密码）链接，该链接 7 天后过期。这是固定模板，因此不计入教会的每日邮件上限 |
| GET | `/search?term=` | JWT | Server.Admin | 按姓名/电子邮件搜索所有用户 |
| DELETE | `/` | JWT | — | 删除当前用户账号 |

## 教会

基础路径：`/membership/churches`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 加载当前用户的所有教会 |
| GET | `/:id` | JWT | — | 根据 ID 获取教会 |
| GET | `/:id/getDomainAdmin` | JWT | — | 获取某教会的域名管理员用户 |
| GET | `/:id/impersonate` | JWT | Server.Admin | 模拟某教会（仅限服务器管理员） |
| GET | `/all?term=` | JWT | Server.Admin | 搜索所有教会（管理员） |
| GET | `/search/?name=` | Public | — | 按名称搜索教会 |
| GET | `/lookup/?subDomain=&id=` | Public | — | 按子域名或 ID 查找教会 |
| POST | `/` | JWT | Settings.Edit | 更新教会详情 |
| POST | `/add` | JWT | — | 注册新教会。必填字段：name、address1、city、state、zip、country |
| POST | `/search` | Public | — | 按名称搜索教会（POST 变体） |
| POST | `/select` | JWT | — | 选择/切换到某教会。请求体：`{ churchId }` 或 `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | 归档或取消归档某教会 |
| POST | `/byIds` | Public | — | 按 ID 加载多个教会 |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 删除已被弃用 7 天以上的教会 |

## 小组

基础路径：`/membership/groups`

继承标准 CRUD（GET `/`、GET `/:id` 来自基类）。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有小组 |
| GET | `/:id` | JWT | — | 根据 ID 获取小组 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | 按礼拜筛选条件搜索小组 |
| GET | `/my` | JWT | — | 获取当前用户所在的小组 |
| GET | `/my/:tag` | JWT | — | 获取当前用户按标签筛选的小组 |
| GET | `/tag/:tag` | JWT | — | 获取带有特定标签的所有小组 |
| GET | `/public/:churchId/:id` | Public | — | 按教会和 ID 获取公开小组 |
| GET | `/public/:churchId/tag/:tag` | Public | — | 按标签获取公开小组 |
| GET | `/public/:churchId/label?label=` | Public | — | 按标签（label）获取公开小组 |
| GET | `/public/:churchId/slug/:slug` | Public | — | 按 slug 获取公开小组 |
| POST | `/` | JWT | Groups.Edit | 创建或更新小组（自动生成 slug） |
| DELETE | `/:id` | JWT | Groups.Edit | 删除小组（对于事工小组，同时删除子团队） |

## 小组成员

基础路径：`/membership/groupmembers`

继承标准 CRUD（GET `/:id`、DELETE `/:id` 来自基类）。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | 根据 ID 获取小组成员 |
| GET | `/` | JWT | GroupMembers.View* | 列出小组成员。可按 `?groupId=`、`?groupIds=` 或 `?personId=` 筛选。*若用户在该小组中，或正在查询本人的 personId，同样允许访问；当用户具有 Attendance.View 或 Attendance.Edit 权限时，对任何非保密小组的 `?groupId=` 查询同样允许（对其而言会包含 13 岁以下的成员） |
| GET | `/my` | JWT | — | 获取当前用户的小组成员资格 |
| GET | `/basic/:groupId` | JWT | — | 获取某小组的基础成员名单 |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | 获取小组负责人（公开） |
| GET | `/public/:churchId/:groupId` | Public | — | 获取小组的公开名册（最少字段：`personId`、`displayName`、`leader`、照片）。仅当小组通过 `publicRoster` 选择加入时可用；为网站构建器的 `staffGrid` 元素提供数据 |
| POST | `/` | JWT | GroupMembers.Edit | 添加或更新小组成员 |
| DELETE | `/:id` | JWT | GroupMembers.View | 移除小组成员 |

## 家庭

基础路径：`/membership/households`

标准 CRUD 控制器。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有家庭 |
| GET | `/:id` | JWT | — | 根据 ID 获取家庭 |
| POST | `/` | JWT | People.Edit | 创建或更新家庭 |
| DELETE | `/:id` | JWT | People.Edit | 删除家庭 |

## 角色

基础路径：`/membership/roles`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | 根据 ID 获取角色 |
| GET | `/church/:churchId` | JWT | Roles.View | 获取某教会的所有角色。每个角色都包含 `memberCount`，即其中不同用户的数量 |
| POST | `/` | JWT | Roles.Edit | 创建或更新角色 |
| DELETE | `/:id` | JWT | Roles.Edit | 删除角色（同时删除其权限和成员） |

## 角色成员

基础路径：`/membership/rolemembers`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 获取某角色的成员。添加 `?include=users` 可包含用户详情 |
| POST | `/` | JWT | Roles.Edit | 将成员添加到角色（如果电子邮件不存在则创建用户） |
| DELETE | `/:id` | JWT | Roles.View | 移除角色成员 |
| DELETE | `/self/:churchId/:userId` | JWT | — | 将自己从某教会中移除 |

## 角色权限

基础路径：`/membership/rolepermissions`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | 获取某角色的权限（ID 使用 `null` 表示 "Everyone" 角色） |
| POST | `/` | JWT | Roles.Edit | 创建或更新角色权限 |
| DELETE | `/:id` | JWT | Roles.Edit | 删除角色权限 |

## 权限

基础路径：`/membership/permissions`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 获取可用权限的完整列表 |

每个条目都包含 `apiName`、`section`（内容类型）、`action`，以及 B1Admin 角色编辑器所显示的 `displaySection` / `displayAction` 标签。近期新增的权限包括：`MembershipApi` / `People` / `View Names`（**View People Names Only**（仅查看人员姓名），位于 People and Groups（人员与小组）下），以及 `GivingApi` / `Donations` / `Enter`（**Enter Donations**（录入奉献），位于 Donations（奉献）下；参见[奉献批次](./giving.md#donation-batches)）。

## 表单

基础路径：`/membership/forms`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 或 Forms.Edit | 列出所有表单（管理员可见全部；编辑者可见分配给自己的表单及非成员表单） |
| GET | `/:id` | JWT | 表单访问权限 | 根据 ID 获取表单 |
| GET | `/archived` | JWT | Forms.Admin 或 Forms.Edit | 列出已归档的表单 |
| GET | `/group/:groupId` | JWT | 小组成员、小组负责人或 Forms.Admin | 关联到该小组的独立表单（`forms.groupId`），不包括已归档的表单，按名称排序。返回 `id`、`name`、`description` 和 `open`（是否在开放时间段内）。成员仅能看到开放的表单；负责人和表单管理员还能看到已关闭的表单。为小组页面的关联表单提供数据 |
| GET | `/standalone/:id?churchId=` | JWT | — | 获取独立表单（受限表单需要身份验证） |
| POST | `/` | JWT | Forms.Admin 或 Forms.Edit | 创建或更新表单。独立表单可接受可选的 `photoUrl`（显示在表单上方的页眉照片）和 `groupId`（关联小组） |
| DELETE | `/:id` | JWT | 表单访问权限 | 删除表单 |

## 表单提交

基础路径：`/membership/formsubmissions`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 或 Forms.Edit | 列出提交内容。可按 `?personId=` 或 `?formId=` 筛选 |
| GET | `/my?include=questions,answers` | JWT | — | 仅限本人：已登录成员提交的或关联到其人员记录的至多 50 份独立表单提交（不包括人员表单）（`contentType` 为 `person`，`contentId` 为其人员 ID——例如管理员更改人员后），按最新在前排序，每份都包含 `form.name`。`include` 会附加每个表单的问题以及提交的答案。如果用户未关联到人员，则返回 `401`。为 B1 "我的页面"中的 **My Forms**（我的表单）部分提供数据 |
| GET | `/group/:groupId` | JWT | 该小组的负责人 | 小组负责人可查看的答复：每个关联表单以及每个带有报名表单的小组活动各对应一条记录，每条包含 `form`、`event`（`id`、`title`、`start`；仅活动条目）、`questions` 以及 `submissions`（包含 `answers` 和 `personName`，匿名时为 `null`） |
| GET | `/:id` | JWT | Forms.Admin、Forms.Edit 或查看权限 | 根据 ID 获取提交内容。添加 `?include=form,questions,answers`。表单所关联小组的负责人，以及活动报名所属小组的负责人，也可以阅读该内容 |
| GET | `/formId/:formId` | JWT | 表单访问权限（查看） | 获取某表单的所有提交内容（包括表单、问题和答案）。表单所关联小组的负责人拥有查看权限 |
| POST | `/` | JWT | — | 提交表单答案（处理受限/非受限表单，并发送电子邮件通知）。当表单设置了 `autoCreatePerson` 时，会按电子邮件查找或创建一名访客人员，并关联该提交内容；若表单还设置了 `groupId`，则将该人员加入小组；当设置了 `followUpSubject`/`followUpBody` 时，会向提交人发送模板化的跟进邮件。除非调用者有权管理该表单，否则 `submittedBy` 始终设置为已登录成员的人员（匿名提交则留空） |
| DELETE | `/:id` | JWT | Forms.Admin 或 Forms.Edit | 删除提交内容及其答案 |

## 问题

基础路径：`/membership/questions`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | 表单访问权限 | 列出某表单的问题。需要 `?formId=` |
| GET | `/:id` | JWT | 表单访问权限 | 根据 ID 获取问题 |
| GET | `/unrestricted?formId=` | JWT | — | 获取非受限表单的问题 |
| GET | `/sort/:id/up` | JWT | — | 将问题在排序中上移 |
| GET | `/sort/:id/down` | JWT | — | 将问题在排序中下移 |
| POST | `/` | JWT | 表单访问权限 | 创建或更新问题（自动分配排序） |
| DELETE | `/:id?formId=` | JWT | 表单访问权限 | 删除问题 |

## 答案

基础路径：`/membership/answers`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin 或 Forms.Edit | 列出答案。可按 `?formSubmissionId=` 筛选 |
| POST | `/` | JWT | Forms.Admin 或 Forms.Edit | 创建或更新答案 |

## 成员权限

基础路径：`/membership/memberpermissions`

用于控制每位成员对特定表单的访问权限。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | 表单访问权限 | 根据 ID 获取成员权限 |
| GET | `/member/:id` | JWT | 表单访问权限 | 获取某成员的所有表单权限 |
| GET | `/form/:id` | JWT | 表单访问权限 | 获取某表单的所有成员权限 |
| GET | `/form/:id/my` | JWT | 表单访问权限 | 获取当前用户对某表单的权限 |
| POST | `/` | JWT | 表单访问权限 | 创建或更新成员权限 |
| DELETE | `/:id?formId=` | JWT | 表单访问权限 | 删除成员权限 |
| DELETE | `/member/:id?formId=` | JWT | 表单访问权限 | 删除某成员对某表单的所有权限 |

## 设置

基础路径：`/membership/settings`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | 获取教会的所有设置 |
| GET | `/public/:churchId` | Public | — | 获取某教会的公开设置 |
| POST | `/` | JWT | Settings.Edit | 保存设置（支持 base64 图片上传） |

## 域名

基础路径：`/membership/domains`

继承标准 CRUD（GET `/:id`、GET `/`、DELETE `/:id` 来自基类）。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有域名 |
| GET | `/:id` | JWT | — | 根据 ID 获取域名 |
| GET | `/lookup/:domainName` | JWT | — | 按名称查找域名 |
| GET | `/public/lookup/:domainName` | Public | — | 按名称公开查找域名 |
| GET | `/health/check` | Public | — | 对未检查的域名运行健康检查 |
| POST | `/` | JWT | Settings.Edit | 创建或更新域名（会触发 Caddy 更新） |
| DELETE | `/:id` | JWT | Settings.Edit | 删除域名 |

## 用户与教会关联

基础路径：`/membership/userchurch`

管理用户与教会之间的关联。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | 按用户 ID 获取用户-教会记录 |
| GET | `/personid/:personId` | JWT | — | 获取某人员所关联用户的电子邮件 |
| GET | `/user/:userId` | JWT | Server.Admin | 加载某用户的所有教会 |
| POST | `/` | JWT | — | 创建用户与教会的关联 |
| PATCH | `/:userId` | JWT | — | 更新最近访问时间并记录访问日志 |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | 删除用户-教会记录 |

## 可见性偏好

基础路径：`/membership/visibilityPreferences`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的可见性偏好 |
| POST | `/` | JWT | — | 保存可见性偏好（地址、电话、电子邮件的可见性） |

## 查询

基础路径：`/membership/query`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | 使用 AI 进行自然语言成员搜索。请求体：`{ text, subDomain, siteUrl }` |

## 客户端错误

基础路径：`/membership/clientErrors`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | 记录客户端错误 |

## 相关页面

- [身份验证与权限](./authentication.md) —— 登录流程、JWT、OAuth、权限模型
- [出勤端点](./attendance.md) —— 礼拜和到访追踪
- [模块结构](../module-structure.md) —— 代码组织模式
