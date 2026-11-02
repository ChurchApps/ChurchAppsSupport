---
title: "Doing 端点"
---

# Doing 端点

<div class="article-intro">

Doing 模块负责服事计划、志愿者排班、任务管理和自动化。它提供了创建带有时间和岗位的服事计划、分配志愿者、管理不可服事日期、构建礼拜程序项目、连接外部内容服务商，以及配置带有条件和动作的自动化工作流等工具。

</div>

**基础路径：** `/doing`

## 计划

基础路径：`/doing/plans`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有计划 |
| GET | `/:id` | JWT | — | 根据 ID 获取计划 |
| GET | `/ids?ids=` | JWT | — | 根据逗号分隔的 ID 获取多个计划 |
| GET | `/types/:planTypeId` | JWT | — | 根据计划类型获取计划 |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + 事工编辑 | 预览服事总览中 **Text Volunteers**（向志愿者发送短信）的发送情况：返回 `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }`，统计所选时间范围内被分配的志愿者（每人计一次，跳过已退订和缺少号码的人员，共享号码会去重，上限为 200 人） |
| GET | `/presenter` | JWT | — | 获取未来 7 天的计划（展示者视图） |
| GET | `/confirmationWorkflows?ministryId=` | JWT | 事工编辑 | 计划可以选择的活动服事安排确认工作流（`workflowType = "assignmentConfirmation"`）：`[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | 获取某计划类型的当前计划 |
| GET | `/public/signup/:churchId` | Public | — | 开放自助报名的计划，最近的排在最前，每个计划都包含其自助报名岗位（按 `categoryName` 排序，再按 `name` 排序，并包含已接受/未确认安排的 `filledCount`）以及时间。不包含志愿者姓名。当教会设置 `volunteerSignupNextOnly` 为 `"true"` 时，每种计划类型只返回第一个计划。每个 `plan` 都包含一个计算得出的 `signupDeadline`（ISO 时间戳，或 `null`）：即计划最早的 `service` 类型时间之前 `signupDeadlineHours` 小时（如果没有礼拜时间，则为任何有时间的条目；如果计划没有任何时间，则为教会时区中 `serviceDate` 当天的 9:00） |
| GET | `/signup/:planId/volunteers` | JWT | — | 计划自助报名岗位的 `[{ positionId, names }]`（已接受/未确认的被分配者的显示名称）。除非计划的 `showVolunteerNames` 已开启，否则返回 `[]` |
| POST | `/` | JWT | — | 创建或更新计划（接受单个对象或数组）。设置 `confirmationWorkflowId` 可让计划选择服事确认工作流，设为 `null` 则在之后的请求中选择退出。发送 `signupDeadlineHours: null` 可清除截止时间；省略该字段则保留已保存的值 |
| POST | `/copy/:id` | JWT | 事工编辑 | 复制计划，包括岗位、时间、分配和礼拜程序项目。请求体包含 `ministryId`、`serviceDate`、`copyMode`（"none"、"positions"、"all"）以及 `copyServiceOrder`（布尔值）。若未提供 `targetPlanId`，则会创建新计划，除非请求体另有提供，否则 `notes`、`signupDeadlineHours`、`showVolunteerNames` 和 `autoReplaceOnDecline` 会从源计划沿用。提供 `targetPlanId` 时，复制内容会填充到该已存在的计划中（调用者必须有权编辑该计划）。B1Admin 的 **Repeat weekly**（每周重复）选项会每周调用一次此接口，每次都从前一周创建的计划复制 |
| POST | `/textRange` | JWT | `texting.send` + 事工编辑 | 通过教会的短信服务商，向日期范围内的每位被分配志愿者发送短信。请求体：`{ startDate, endDate, ministryId, planTypeId?, message }`（消息最多 1600 个字符；合并字段会针对每位收件人分别解析）。返回预览统计数据，以及 `recipientCount`、`successCount`、`failCount`，若发送提前中止，还会返回 `error`（`no_provider` 或 `insufficient_credits`） |
| POST | `/:id/issueRequests` | JWT | 计划编辑 | 通过确认工作流发出该计划中新的、未确认且尚未通知的安排：将每项安排标记为已通知，并为每项安排创建一张工作流卡片。请求体为空；返回 `{ issued }`。除非计划已发布（不是 `prepared` 状态）、拥有处于活动状态且至少包含一个步骤的 `confirmationWorkflowId`，并且回复截止时间尚未过去，否则会失败 |
| POST | `/autofill/:id` | JWT | — | 为计划自动填充志愿者安排。请求体：`{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | 删除计划及所有相关的时间、安排、岗位和计划项目 |

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

继承 CRUD 基类（GET `/`、GET `/:id`、POST `/`、DELETE `/:id` —— 不进行权限检查）。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有计划类型 |
| GET | `/:id` | JWT | — | 根据 ID 获取计划类型 |
| GET | `/ids?ids=` | JWT | — | 根据逗号分隔的 ID 获取多个计划类型 |
| GET | `/ministryId/:ministryId` | JWT | — | 获取某事工的计划类型 |
| POST | `/` | JWT | — | 创建或更新计划类型 |
| DELETE | `/:id` | JWT | — | 删除计划类型 |

## 计划项目

基础路径：`/doing/planItems`

管理以父子树状结构组织的礼拜程序项目（标题、段落、歌曲等）。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 根据 ID 获取计划项目 |
| GET | `/ids?ids=` | JWT | — | 根据逗号分隔的 ID 获取多个计划项目 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有计划项目（返回树状结构） |
| GET | `/presenter/:churchId/:planId` | Public | — | 获取展示者视图的计划项目（返回树状结构） |
| POST | `/` | JWT | — | 创建或更新计划项目 |
| POST | `/sort` | JWT | — | 更新计划项目的排序（会重新排列同级项目） |
| DELETE | `/:id` | JWT | — | 删除计划项目 |

## 计划 Feed

基础路径：`/doing/planFeed`

为展示者提供计划项目 Feed。如果不存在任何计划项目，则会根据计划的 `contentId` 从 Lessons.church 场地 Feed 自动填充。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | 获取展示者的计划 Feed（若为空则从场地 Feed 自动填充） |

## 岗位

基础路径：`/doing/positions`

继承 CRUD 基类（GET `/:id`、POST `/`、DELETE `/:id` —— 不进行权限检查）。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 根据 ID 获取岗位 |
| GET | `/ids?ids=` | JWT | — | 根据逗号分隔的 ID 获取多个岗位 |
| GET | `/plan/ids?planIds=` | JWT | — | 根据逗号分隔的计划 ID 获取多个计划的岗位 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有岗位 |
| POST | `/` | JWT | — | 创建或更新岗位 |
| DELETE | `/:id` | JWT | — | 删除岗位 |

## 时间

基础路径：`/doing/times`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | 列出教会的所有时间 |
| GET | `/:id` | JWT | — | 根据 ID 获取时间 |
| GET | `/plans?planIds=` | JWT | — | 根据逗号分隔的计划 ID 获取多个计划的时间 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有时间 |
| POST | `/` | JWT | — | 创建或更新时间 |
| DELETE | `/:id` | JWT | — | 删除时间 |

## 安排

基础路径：`/doing/assignments`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的安排 |
| GET | `/my/upcoming` | JWT | — | 当前用户在今天及以后日期的计划中最多 20 项安排（跳过待定或 `prepared` 状态的计划），最近的排在最前：`{ assignmentId, status, positionName, planId, planName, serviceDate }`。为成员主页上的服事预览提供数据 |
| GET | `/:id` | JWT | — | 根据 ID 获取安排 |
| GET | `/plan/ids?planIds=` | JWT | — | 根据逗号分隔的计划 ID 获取多个计划的安排 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有安排 |
| POST | `/` | JWT | — | 创建或更新安排（默认状态为 "Unconfirmed"） |
| POST | `/accept/:id` | JWT | — | 接受安排（必须是被分配的人员本人） |
| POST | `/decline/:id` | JWT | — | 婉拒安排（必须是被分配的人员本人） |
| POST | `/signup` | JWT | — | 自助报名某个岗位。请求体：`{ positionId }`。该岗位必须允许自助报名且仍有名额；将创建一条已接受的安排。一旦计划的报名截止时间（如上所述，从其第一个礼拜时间倒推计算）已过，将返回 "Signup deadline has passed" |
| DELETE | `/signup/:id` | JWT | — | 取消你自己的自助报名。计划报名截止时间过后将返回 "Removal deadline has passed" |
| DELETE | `/:id` | JWT | — | 删除安排 |

### 示例：接受安排

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

## 不可服事日期

基础路径：`/doing/blockoutDates`

继承 CRUD 基类（GET `/:id`、DELETE `/:id` —— 不进行权限检查）。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 根据 ID 获取不可服事日期 |
| GET | `/ids?ids=` | JWT | — | 根据逗号分隔的 ID 获取多个不可服事日期 |
| GET | `/my` | JWT | — | 获取当前用户的不可服事日期 |
| GET | `/upcoming` | JWT | — | 获取教会所有即将到来的不可服事日期 |
| POST | `/` | JWT | — | 创建或更新不可服事日期（若未提供 personId，则默认为当前用户） |
| DELETE | `/:id` | JWT | — | 删除不可服事日期 |

## 任务

基础路径：`/doing/tasks`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 获取当前用户未完成的任务 |
| GET | `/:id` | JWT | — | 根据 ID 获取任务 |
| GET | `/:id/contact` | JWT | 可以查看该卡片 | 工作流卡片所涉及人员的联系信息：`{ personId, displayName, mobilePhone, email }`。让没有人员板块访问权限的被分配呼叫者也能联系到该人员 |
| GET | `/closed` | JWT | — | 获取当前用户已关闭的任务 |
| GET | `/timeline?taskIds=` | JWT | — | 根据逗号分隔的任务 ID 获取任务的时间线数据 |
| GET | `/directoryUpdate/:personId` | JWT | — | 获取某人员的目录更新任务 |
| POST | `/` | JWT | — | 创建或更新任务。添加 `?type=directoryUpdate` 可处理目录更新任务（自动上传照片） |
| POST | `/:id/conversation` | JWT | `tasks.edit` 或卡片的被分配人 | 将备注讨论串附加到卡片上。请求体：`{ conversationId }`。第一个附加的讨论串会生效；之后的调用将原样返回卡片 |
| POST | `/loadForGroups` | JWT | — | 加载特定小组的任务。请求体：`{ groupIds: [], status: "Open" }` |

## 自动化

基础路径：`/doing/automations`

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有自动化 |
| GET | `/:id` | JWT | — | 根据 ID 获取自动化 |
| GET | `/check` | Public | — | 触发对所有自动化的检查 |
| POST | `/` | JWT | — | 创建或更新自动化 |
| DELETE | `/:id` | JWT | — | 删除自动化 |

## 动作

基础路径：`/doing/actions`

动作定义了自动化被触发时会发生的事情。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 根据 ID 获取动作 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有动作 |
| POST | `/` | JWT | — | 创建或更新动作 |
| DELETE | `/:id` | JWT | — | 删除动作 |

## 条件

基础路径：`/doing/conditions`

条件定义了触发自动化的标准。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 根据 ID 获取条件 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有条件 |
| POST | `/` | JWT | — | 创建或更新条件 |
| DELETE | `/:id` | JWT | — | 删除条件 |

## 连接词

基础路径：`/doing/conjunctions`

连接词用于在自动化中将多个条件连接起来（AND/OR 逻辑）。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 根据 ID 获取连接词 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有连接词 |
| POST | `/` | JWT | — | 创建或更新连接词 |
| DELETE | `/:id` | JWT | — | 删除连接词 |

## 内容服务商授权

基础路径：`/doing/contentProviderAuths`

继承 CRUD 基类（GET `/`、GET `/:id`、POST `/`、DELETE `/:id` —— 不进行权限检查）。

管理外部内容服务商（例如演示软件集成）的 OAuth 授权记录。

`accessToken` 和 `refreshToken` 在存储时会使用 `EncryptionHelper` 加密，读取时解密，因此 API 仍会返回明文令牌。在加密功能推出之前保存的记录为明文（明文中永远不会包含 `|`）；它们会按原样返回，并在下次保存时加密。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有内容服务商授权 |
| GET | `/:id` | JWT | — | 根据 ID 获取内容服务商授权 |
| GET | `/ids?ids=` | JWT | — | 根据逗号分隔的 ID 获取多个内容服务商授权 |
| GET | `/ministry/:ministryId` | JWT | — | 获取某事工的所有内容服务商授权 |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | 获取某事工和某服务商的授权记录 |
| POST | `/` | JWT | — | 创建或更新内容服务商授权 |
| DELETE | `/:id` | JWT | — | 删除内容服务商授权 |

## 服务商代理

基础路径：`/doing/providerProxy`

将请求代理到外部内容服务商（例如 ProPresenter、EasyWorship）。令牌过期时会自动刷新。

| 方法 | 路径 | 身份验证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | 浏览内容服务商的文件。请求体：`{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | 从内容服务商获取演示文稿。请求体：`{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | 从内容服务商获取播放列表。请求体：`{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | 获取内容项的说明。请求体：`{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | 获取内容项的扩展说明。请求体：`{ ministryId, providerId, path }` |

## 相关页面

- [会员端点](./membership) —— 人员、小组、角色和权限
- [出勤端点](./attendance) —— 礼拜和到访记录
- [模块结构](../module-structure) —— 代码组织模式
