---
title: "Doing 端点"
---

# Doing 端点

<div class="article-intro">

Doing 模块负责管理服事计划、志愿者排班、任务管理和自动化。它提供了以下工具：创建包含时间和职位的服事计划、分配志愿者、管理不可服事日期、构建礼拜程序项目、连接外部内容提供商，以及配置包含条件和动作的自动化工作流。

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
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + 事工编辑权限 | 预览服事概览中**群发志愿者短信**的发送情况：`{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }`，针对指定时间范围内被分配的志愿者（每人一条，跳过已退订和无号码的人员，共享号码去重，上限 200 人） |
| GET | `/presenter` | JWT | — | 获取未来 7 天的计划（演示者视图） |
| GET | `/public/current/:planTypeId` | 公开 | — | 获取某计划类型的当前计划 |
| GET | `/public/signup/:churchId` | 公开 | — | 开放自主报名的计划，最近的排在最前，每个计划包含其自主报名职位（按 `categoryName` 排序，然后按 `name` 排序，并附带已接受/未确认安排的 `filledCount`）及时间。不包含志愿者姓名。当教会设置 `volunteerSignupNextOnly` 为 `"true"` 时，每种计划类型仅返回第一个计划 |
| GET | `/signup/:planId/volunteers` | JWT | — | 计划自主报名职位的 `[{ positionId, names }]`（已接受/未确认受派人员的显示名称）。除非计划的 `showVolunteerNames` 已开启，否则返回 `[]` |
| POST | `/` | JWT | — | 创建或更新计划（接受单个对象或数组） |
| POST | `/copy/:id` | JWT | 事工编辑权限 | 复制计划，包括职位、时间、安排和礼拜程序项目。请求体包括 `ministryId`、`serviceDate`、`copyMode`（"none"、"positions"、"all"）以及 `copyServiceOrder`（布尔值）。若未提供 `targetPlanId`，则会创建新计划，除非请求体另有指定，否则 `notes`、`signupDeadlineHours`、`showVolunteerNames` 和 `autoReplaceOnDecline` 会从源计划继承。若提供了 `targetPlanId`，则复制内容会填充到该已有计划中（调用者必须有编辑该计划的权限）。B1Admin 的**每周重复**选项会为每一周调用一次此接口，每次都从前一周创建的计划复制 |
| POST | `/textRange` | JWT | `texting.send` + 事工编辑权限 | 通过教会的短信服务商，向指定日期范围内的每位被分配志愿者发送短信。请求体：`{ startDate, endDate, ministryId, planTypeId?, message }`（消息最多 1600 个字符；合并字段会针对每位收件人进行解析）。返回预览统计数据，以及 `recipientCount`、`successCount`、`failCount`，若发送提前停止，还会返回 `error`（`no_provider` 或 `insufficient_credits`） |
| POST | `/autofill/:id` | JWT | — | 为计划自动填充志愿者安排。请求体：`{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | 删除计划及其所有相关时间、安排、职位和计划项目 |

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

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有计划类型 |
| GET | `/:id` | JWT | — | 按 ID 获取计划类型 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个计划类型 |
| GET | `/ministryId/:ministryId` | JWT | — | 获取某事工的计划类型 |
| POST | `/` | JWT | — | 创建或更新计划类型 |
| DELETE | `/:id` | JWT | — | 删除计划类型 |

## 计划项目

基础路径：`/doing/planItems`

管理以父子树结构组织的礼拜程序项目（标题、板块、诗歌等）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取计划项目 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个计划项目 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有计划项目（返回树形结构） |
| GET | `/presenter/:churchId/:planId` | 公开 | — | 获取演示者视图的计划项目（返回树形结构） |
| POST | `/` | JWT | — | 创建或更新计划项目 |
| POST | `/sort` | JWT | — | 更新计划项目的排序（对同级项目重新排序） |
| DELETE | `/:id` | JWT | — | 删除计划项目 |

## 计划信息流

基础路径：`/doing/planFeed`

为演示者提供计划项目信息流。如果不存在计划项目，则会使用计划的 `contentId` 从 Lessons.church 场地信息流中自动填充。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | 公开 | — | 获取演示者的计划信息流（如为空则从场地信息流自动填充） |

## 职位

基础路径：`/doing/positions`

继承 CRUD 基类（GET `/:id`、POST `/`、DELETE `/:id` —— 不进行权限检查）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取职位 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个职位 |
| GET | `/plan/ids?planIds=` | JWT | — | 按逗号分隔的计划 ID 获取多个计划的职位 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有职位 |
| POST | `/` | JWT | — | 创建或更新职位 |
| DELETE | `/:id` | JWT | — | 删除职位 |

## 时间

基础路径：`/doing/times`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | 列出教会的所有时间 |
| GET | `/:id` | JWT | — | 按 ID 获取时间 |
| GET | `/plans?planIds=` | JWT | — | 按逗号分隔的计划 ID 获取多个计划的时间 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有时间 |
| POST | `/` | JWT | — | 创建或更新时间 |
| DELETE | `/:id` | JWT | — | 删除时间 |

## 安排

基础路径：`/doing/assignments`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | 获取当前用户的安排 |
| GET | `/my/upcoming` | JWT | — | 当前用户在某日起（含当日）的计划中的最多 20 条安排（会跳过暂定或 `prepared` 状态的计划），最近的排在最前：`{ assignmentId, status, positionName, planId, planName, serviceDate }`。为会员首页的服事预览提供数据 |
| GET | `/:id` | JWT | — | 按 ID 获取安排 |
| GET | `/plan/ids?planIds=` | JWT | — | 按逗号分隔的计划 ID 获取多个计划的安排 |
| GET | `/plan/:planId` | JWT | — | 获取某计划的所有安排 |
| POST | `/` | JWT | — | 创建或更新安排（默认状态为 "Unconfirmed"） |
| POST | `/accept/:id` | JWT | — | 接受安排（必须是被指派的人员本人） |
| POST | `/decline/:id` | JWT | — | 婉拒安排（必须是被指派的人员本人） |
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

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取不可服事日期 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个不可服事日期 |
| GET | `/my` | JWT | — | 获取当前用户的不可服事日期 |
| GET | `/upcoming` | JWT | — | 获取教会所有即将到来的不可服事日期 |
| POST | `/` | JWT | — | 创建或更新不可服事日期（如未提供 personId，则默认为当前用户） |
| DELETE | `/:id` | JWT | — | 删除不可服事日期 |

## 任务

基础路径：`/doing/tasks`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 获取当前用户的未完成任务 |
| GET | `/:id` | JWT | — | 按 ID 获取任务 |
| GET | `/:id/contact` | JWT | 可查看卡片 | 工作流卡片所涉人员的联系信息：`{ personId, displayName, mobilePhone, email }`。使没有人员访问权限的被指派呼叫者也能联系到该人员 |
| GET | `/closed` | JWT | — | 获取当前用户的已关闭任务 |
| GET | `/timeline?taskIds=` | JWT | — | 按逗号分隔的任务 ID 获取任务的时间线数据 |
| GET | `/directoryUpdate/:personId` | JWT | — | 获取某人员的名录更新任务 |
| POST | `/` | JWT | — | 创建或更新任务。添加 `?type=directoryUpdate` 以处理名录更新任务（自动上传照片） |
| POST | `/:id/conversation` | JWT | `tasks.edit` 或卡片负责人 | 将备注对话附加到卡片。请求体：`{ conversationId }`。第一个附加的对话生效；之后的调用将原样返回卡片 |
| POST | `/loadForGroups` | JWT | — | 加载指定小组的任务。请求体：`{ groupIds: [], status: "Open" }` |

## 自动化

基础路径：`/doing/automations`

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有自动化 |
| GET | `/:id` | JWT | — | 按 ID 获取自动化 |
| GET | `/check` | 公开 | — | 触发对所有自动化的检查 |
| POST | `/` | JWT | — | 创建或更新自动化 |
| DELETE | `/:id` | JWT | — | 删除自动化 |

## 动作

基础路径：`/doing/actions`

动作定义了自动化被触发时执行的操作。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取动作 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有动作 |
| POST | `/` | JWT | — | 创建或更新动作 |
| DELETE | `/:id` | JWT | — | 删除动作 |

## 条件

基础路径：`/doing/conditions`

条件定义了触发自动化的判断标准。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取条件 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有条件 |
| POST | `/` | JWT | — | 创建或更新条件 |
| DELETE | `/:id` | JWT | — | 删除条件 |

## 连接词

基础路径：`/doing/conjunctions`

连接词用于在自动化中将多个条件组合在一起（AND/OR 逻辑）。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | 按 ID 获取连接词 |
| GET | `/automation/:id` | JWT | — | 获取某自动化的所有连接词 |
| POST | `/` | JWT | — | 创建或更新连接词 |
| DELETE | `/:id` | JWT | — | 删除连接词 |

## 内容提供商认证

基础路径：`/doing/contentProviderAuths`

继承 CRUD 基类（GET `/`、GET `/:id`、POST `/`、DELETE `/:id` —— 不进行权限检查）。

管理外部内容提供商（例如演示软件集成）的 OAuth 认证记录。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有内容提供商认证记录 |
| GET | `/:id` | JWT | — | 按 ID 获取内容提供商认证记录 |
| GET | `/ids?ids=` | JWT | — | 按逗号分隔的 ID 获取多个内容提供商认证记录 |
| GET | `/ministry/:ministryId` | JWT | — | 获取某事工的所有内容提供商认证记录 |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | 获取某事工和某提供商的认证记录 |
| POST | `/` | JWT | — | 创建或更新内容提供商认证记录 |
| DELETE | `/:id` | JWT | — | 删除内容提供商认证记录 |

## 提供商代理

基础路径：`/doing/providerProxy`

将请求代理到外部内容提供商（例如 ProPresenter、EasyWorship）。令牌过期时会自动刷新。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | 浏览内容提供商的文件。请求体：`{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | 从内容提供商获取演示文稿。请求体：`{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | 从内容提供商获取播放列表。请求体：`{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | 获取某内容项的说明。请求体：`{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | 获取某内容项的展开说明。请求体：`{ ministryId, providerId, path }` |

## 相关页面

- [会员端点](./membership) —— 人员、小组、角色和权限
- [考勤端点](./attendance) —— 礼拜和到访记录
- [模块结构](../module-structure) —— 代码组织模式
