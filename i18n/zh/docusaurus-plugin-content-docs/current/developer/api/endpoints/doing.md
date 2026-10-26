---
title: "Doing 接口"
---

# Doing 接口

<div class="article-intro">

Doing 模块负责服务策划、志愿者排班、任务管理和自动化。它提供了创建包含时间和岗位的服务计划、分配志愿者、管理不可排期日期、构建服务流程项、连接外部内容提供方，以及配置带有条件和动作的自动化工作流的工具。

</div>

**基础路径：** `/doing`

## 计划

基础路径：`/doing/plans`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有计划 |
| GET | `/:id` | JWT | — | 按 ID 获取计划 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个计划 |
| GET | `/types/:planTypeId` | JWT | — | 按计划类型获取计划 |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + 事工编辑 | 预览 **文本志愿者** 将发送的服务概览：`{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }`，统计时段内被分配的志愿者（每人计一次，跳过已退订和缺少号码的人员，共用号码去重，上限为 200） |
| GET | `/presenter` | JWT | — | 获取未来 7 天的计划（演示视图） |
| GET | `/confirmationWorkflows?ministryId=` | JWT | 事工编辑 | 计划可选用的有效服务分配确认工作流（`workflowType = "assignmentConfirmation"`），格式为 `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | 获取某计划类型的当前计划 |
| GET | `/public/signup/:churchId` | Public | — | 获取开放自助报名的计划，按最近排序，每个计划包含其自助报名岗位（按 `categoryName`、再按 `name` 排序，并包含已接受/未确认分配的 `filledCount`）及时间。不包含志愿者姓名。当教会设置 `volunteerSignupNextOnly` 为 `"true"` 时，每种计划类型仅返回第一个计划。每个 `plan` 包含计算得出的 `signupDeadline`（ISO 时间点，或 `null`）：即计划最早 `service` 类型时间之前 `signupDeadlineHours` 小时（若无服务时间，则取任一有时间的条目；若计划没有任何时间，则为教会时区中 `serviceDate` 当天的 9:00） |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]`，即计划自助报名岗位中已接受/未确认的被分配人员显示名称。除非计划的 `showVolunteerNames` 已开启，否则返回 `[]` |
| POST | `/` | JWT | — | 创建或更新计划（接受单个对象或数组）。设置 `confirmationWorkflowId` 可让计划加入服务确认工作流，设为 `null` 则在之后的请求中退出。发送 `signupDeadlineHours: null` 可清除截止时间；省略该字段则保留已保存的值 |
| POST | `/copy/:id` | JWT | 事工编辑 | 复制计划，包括岗位、时间、分配和服务流程项。请求体包含 `ministryId`、`serviceDate`、`copyMode`（"none"、"positions"、"all"）以及 `copyServiceOrder`（布尔值）。若未提供 `targetPlanId`，则创建新计划，且 `notes`、`signupDeadlineHours`、`showVolunteerNames` 和 `autoReplaceOnDecline` 会从源计划继承（除非请求体中另行提供）。若提供 `targetPlanId`，则将副本填入该已有计划（调用者必须有编辑该计划的权限）。B1Admin 的 **每周重复** 选项每周调用一次此接口，每次都从前一周创建的计划复制 |
| POST | `/textRange` | JWT | `texting.send` + 事工编辑 | 通过教会的短信服务商，向某日期范围内被分配的每位志愿者发送短信。请求体：`{ startDate, endDate, ministryId, planTypeId?, message }`（短信内容最多 1600 个字符；合并字段按收件人分别解析）。返回预览计数，以及 `recipientCount`、`successCount`、`failCount`，若发送提前停止，还会返回 `error`（`no_provider` 或 `insufficient_credits`） |
| POST | `/:id/issueRequests` | JWT | 计划编辑 | 通过确认工作流发出计划中新的未确认、未通知分配：将每项分配标记为已通知，并为每项分配启动一个工作流卡片。请求体为空；返回 `{ issued }`。除非计划已发布（非 `prepared`）、具有至少一个步骤的有效 `confirmationWorkflowId`，且响应截止时间尚未过期，否则将失败 |
| POST | `/autofill/:id` | JWT | — | 为计划自动填充志愿者分配。请求体：`{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | 删除计划及其所有相关时间、分配、岗位和计划项 |

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

继承 CRUD 基类（GET `/`、GET `/:id`、POST `/`、DELETE `/:id`，不进行权限检查）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有计划类型 |
| GET | `/:id` | JWT | — | 按 ID 获取计划类型 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个计划类型 |
| GET | `/ministryId/:ministryId` | JWT | — | 获取某事工的计划类型 |
| POST | `/` | JWT | — | 创建或更新计划类型 |
| DELETE | `/:id` | JWT | — | 删除计划类型 |

## 计划项

基础路径：`/doing/planItems`

管理以父子树形结构组织的服务流程项（标题、章节、诗歌等）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取计划项 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个计划项 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有计划项（返回树形结构） |
| GET | `/presenter/:churchId/:planId` | Public | — | 获取用于演示视图的计划项（返回树形结构） |
| POST | `/` | JWT | — | 创建或更新计划项 |
| POST | `/sort` | JWT | — | 更新计划项的排序（对同级项目重新排序） |
| DELETE | `/:id` | JWT | — | 删除计划项 |

## 计划订阅源

基础路径：`/doing/planFeed`

为演示视图提供计划项订阅源。若不存在计划项，则会根据计划的 `contentId` 从 Lessons.church 场地订阅源自动填充。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | 获取演示视图的计划订阅源（若为空，则从场地订阅源自动填充） |

## 岗位

基础路径：`/doing/positions`

继承 CRUD 基类（GET `/:id`、POST `/`、DELETE `/:id`，不进行权限检查）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取岗位 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个岗位 |
| GET | `/plan/ids?planIds=` | JWT | — | 按逗号分隔的计划 ID 获取多个计划的岗位 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有岗位 |
| POST | `/` | JWT | — | 创建或更新岗位 |
| DELETE | `/:id` | JWT | — | 删除岗位 |

## 时间

基础路径：`/doing/times`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/all` | JWT | — | 列出教会的所有时间 |
| GET | `/:id` | JWT | — | 按 ID 获取时间 |
| GET | `/plans?planIds=` | JWT | — | 按逗号分隔的计划 ID 获取多个计划的时间 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有时间 |
| POST | `/` | JWT | — | 创建或更新时间 |
| DELETE | `/:id` | JWT | — | 删除时间 |

## 分配

基础路径：`/doing/assignments`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的分配 |
| GET | `/my/upcoming` | JWT | — | 当前用户在今天及以后日期的计划中的最多 20 个分配（暂定或 `prepared` 状态的计划将被跳过），按最近排序：`{ assignmentId, status, positionName, planId, planName, serviceDate }`。为成员首页的服务预览提供数据 |
| GET | `/:id` | JWT | — | 按 ID 获取分配 |
| GET | `/plan/ids?planIds=` | JWT | — | 按逗号分隔的计划 ID 获取多个计划的分配 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有分配 |
| POST | `/` | JWT | — | 创建或更新分配（状态默认为 "Unconfirmed"） |
| POST | `/accept/:id` | JWT | — | 接受分配（必须是被分配的人员） |
| POST | `/decline/:id` | JWT | — | 拒绝分配（必须是被分配的人员） |
| POST | `/signup` | JWT | — | 为某岗位自助报名。请求体：`{ positionId }`。该岗位必须允许自助报名且有空位；将创建一个 Accepted 状态的分配。若已超过计划的报名截止时间（从其第一个服务时间向前推算，如上所述），则返回 "Signup deadline has passed" |
| DELETE | `/signup/:id` | JWT | — | 取消您自己的自助报名。若已超过计划的报名截止时间，则返回 "Removal deadline has passed" |
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

## 不可排期日期

基础路径：`/doing/blockoutDates`

继承 CRUD 基类（GET `/:id`、DELETE `/:id`，不进行权限检查）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取不可排期日期 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个不可排期日期 |
| GET | `/my` | JWT | — | 获取当前用户的不可排期日期 |
| GET | `/upcoming` | JWT | — | 获取教会所有即将到来的不可排期日期 |
| POST | `/` | JWT | — | 创建或更新不可排期日期（若未提供 personId，则默认为当前用户） |
| DELETE | `/:id` | JWT | — | 删除不可排期日期 |

## 任务

基础路径：`/doing/tasks`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | 获取当前用户的未完成任务 |
| GET | `/:id` | JWT | — | 按 ID 获取任务 |
| GET | `/:id/contact` | JWT | 可查看卡片 | 获取工作流卡片所涉及人员的联系信息：`{ personId, displayName, mobilePhone, email }`。使已被分配、但没有人员模块访问权限的呼叫者也能联系到该人员 |
| GET | `/closed` | JWT | — | 获取当前用户的已关闭任务 |
| GET | `/timeline?taskIds=` | JWT | — | 按逗号分隔的任务 ID 获取任务的时间线数据 |
| GET | `/directoryUpdate/:personId` | JWT | — | 获取某人员的目录更新任务 |
| POST | `/` | JWT | — | 创建或更新任务。添加 `?type=directoryUpdate` 可处理目录更新任务（自动上传照片） |
| POST | `/:id/conversation` | JWT | `tasks.edit` 或卡片负责人 | 将笔记对话附加到卡片。请求体：`{ conversationId }`。首个附加的对话生效；之后的调用将原样返回卡片 |
| POST | `/loadForGroups` | JWT | — | 加载特定小组的任务。请求体：`{ groupIds: [], status: "Open" }` |

## 自动化

基础路径：`/doing/automations`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | 列出教会的所有自动化 |
| GET | `/:id` | JWT | — | 按 ID 获取自动化 |
| GET | `/check` | Public | — | 触发对所有自动化的检查 |
| POST | `/` | JWT | — | 创建或更新自动化 |
| DELETE | `/:id` | JWT | — | 删除自动化 |

## 动作

基础路径：`/doing/actions`

动作定义了自动化被触发时执行的操作。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取动作 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有动作 |
| POST | `/` | JWT | — | 创建或更新动作 |
| DELETE | `/:id` | JWT | — | 删除动作 |

## 条件

基础路径：`/doing/conditions`

条件定义了触发自动化的判定标准。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取条件 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有条件 |
| POST | `/` | JWT | — | 创建或更新条件 |
| DELETE | `/:id` | JWT | — | 删除条件 |

## 连接词

基础路径：`/doing/conjunctions`

连接词用于在自动化中将多个条件连接起来（与/或逻辑）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取连接词 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有连接词 |
| POST | `/` | JWT | — | 创建或更新连接词 |
| DELETE | `/:id` | JWT | — | 删除连接词 |

## 内容提供方授权

基础路径：`/doing/contentProviderAuths`

继承 CRUD 基类（GET `/`、GET `/:id`、POST `/`、DELETE `/:id`，不进行权限检查）。

管理外部内容提供方（例如演示软件集成）的 OAuth 认证记录。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | 列出所有内容提供方授权 |
| GET | `/:id` | JWT | — | 按 ID 获取内容提供方授权 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个内容提供方授权 |
| GET | `/ministry/:ministryId` | JWT | — | 获取某事工的所有内容提供方授权 |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | 获取特定事工和提供方的授权记录 |
| POST | `/` | JWT | — | 创建或更新内容提供方授权 |
| DELETE | `/:id` | JWT | — | 删除内容提供方授权 |

## 提供方代理

基础路径：`/doing/providerProxy`

将请求代理至外部内容提供方（例如 ProPresenter、EasyWorship）。令牌过期时会自动刷新。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------|-------------|
| POST | `/browse` | JWT | — | 浏览内容提供方文件。请求体：`{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | 从内容提供方获取演示文稿。请求体：`{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | 从内容提供方获取播放列表。请求体：`{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | 获取某内容项的说明。请求体：`{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | 获取某内容项的扩展说明。请求体：`{ ministryId, providerId, path }` |

## 相关页面

- [成员接口](./membership) —— 人员、小组、角色和权限
- [考勤接口](./attendance) —— 服务和访问记录追踪
- [模块结构](../module-structure) —— 代码组织模式
