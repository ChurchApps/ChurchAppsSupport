---
title: "考勤接口"
---

# 考勤接口

<div class="article-intro">

考勤模块负责管理校区地点、服务、服务时间、考勤会话、访问记录和访问会话。它为记录谁参加了哪个服务或小组聚会提供基础设施，支持签到流程，并提供考勤趋势和汇总报表功能。

</div>

**基础路径：** `/attendance`

## 校区

基础路径：`/attendance/campuses`

标准 CRUD 控制器（继承 GenericCrudController）。通过 CRUD 基类提供 `getById`、`getAll`、`post` 和 `delete` 路由。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有校区 |
| GET | `/:id` | JWT | — | 按 ID 获取校区 |
| POST | `/` | JWT | Services.Edit | 创建或更新校区 |
| DELETE | `/:id` | JWT | Services.Edit | 删除校区 |

## 服务

基础路径：`/attendance/services`

继承 GenericCrudController，提供 CRUD 路由 `getById`、`getAll`、`post` 和 `delete`。`getAll`（`GET /`）和 `search` 接口使用自定义实现进行重写。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有服务（包含校区信息） |
| GET | `/:id` | JWT | — | 按 ID 获取服务 |
| GET | `/search?campusId=` | JWT | — | 按校区 ID 搜索服务 |
| POST | `/` | JWT | Services.Edit | 创建或更新服务 |
| DELETE | `/:id` | JWT | Services.Edit | 删除服务 |

### 示例：按校区搜索服务

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## 服务时间

基础路径：`/attendance/servicetimes`

继承 GenericCrudController，提供 CRUD 路由 `getById`、`post` 和 `delete`。`getAll` 和 `search` 接口为自定义实现。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有服务时间。可使用 `?serviceId=` 筛选。添加 `?include=groups` 可附加小组数据。每一行都包含计算得出的 `checkinOpen` 布尔值（仅当服务时间设有签到时间表且当前处于关闭的时间窗口内时为 false）。时间窗口按服务所在校区的时区计算，其次是教会的时区，然后是第一个设有时区的校区，最后是 `America/New_York` |
| GET | `/:id` | JWT | — | 按 ID 获取服务时间 |
| GET | `/search?campusId=&serviceId=` | JWT | — | 按校区和服务搜索服务时间 |
| GET | `/public/:churchId` | Public | — | 获取某教会的校区 → 服务 → 时间树形数据。为网站构建器的 `serviceTimes` 元素提供数据 |
| POST | `/` | JWT | Services.Edit | 创建或更新服务时间。可选的时间表字段：`dayOfWeek`（0 = 周日 … 6 = 周六）、`startTime` / `endTime`（`HH:mm`）、`checkinOpenMinutes`（开始之前）、`checkinCloseMinutes`（结束之后）。只有同时设置了 `dayOfWeek` 和 `startTime` 时，签到才会受时间限制 |
| DELETE | `/:id` | JWT | Services.Edit | 删除服务时间 |

## 小组服务时间

基础路径：`/attendance/groupservicetimes`

将小组与特定服务时间关联。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有小组与服务时间的关联。可使用 `?groupId=` 筛选，以获取包含服务名称的关联 |
| GET | `/:id` | JWT | — | 按 ID 获取小组服务时间关联 |
| POST | `/` | JWT | Services.Edit | 创建或更新小组服务时间关联 |
| DELETE | `/:id` | JWT | Services.Edit | 删除小组服务时间关联 |

## 考勤记录

基础路径：`/attendance/attendancerecords`

提供只读的考勤数据汇总视图，用于报表和展示。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 加载某人的考勤记录。需要 `?personId=` |
| GET | `/my` | JWT | — | 自助查询：当前登录成员最近 12 个月的考勤记录，按最新排序。如果用户未关联到某个人员，则返回 `401`。为 B1 Me 页面中的 **我的考勤** 部分提供数据 |
| GET | `/tree` | JWT | — | 加载完整的考勤树（校区、服务、服务时间、小组） |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | 按可选筛选条件加载考勤趋势数据 |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | 加载某服务在指定周的小组考勤情况 |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | 对于分配给该服务时间的每个小组，返回该日期的 `{ groupId, sessionId, attendanceCount }`（`date` 格式为 `YYYY-MM-DD`；若小组没有会话，则 `sessionId` 为 null）。为 B1Admin 中的 **谁还需要考勤** 对话框提供数据 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | 按筛选条件（校区、服务、服务时间、小组、日期范围）搜索考勤记录 |

### 示例：考勤趋势

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## 会话

基础路径：`/attendance/sessions`

继承 GenericCrudController，提供 CRUD 路由 `getById` 和 `delete`。`getAll` 和 `save` 接口为自定义实现，同时允许小组负责人管理其所负责小组的会话。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 或小组负责人 | 列出所有会话。可使用 `?groupId=` 筛选（包含名称）。小组负责人可查看其所负责小组的会话 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取会话 |
| POST | `/` | JWT | Attendance.Edit 或小组负责人 | 创建或更新会话。小组负责人可保存其所负责小组的会话 |
| DELETE | `/:id` | JWT | Attendance.Edit | 删除会话 |

## 访问记录

基础路径：`/attendance/visits`

管理单次访问记录（某人在特定日期的出席），并提供签到流程。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 列出所有访问记录。可使用 `?personId=` 筛选 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取访问记录 |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View 或 Attendance.Checkin | 加载某服务中指定人员的签到数据。返回包含最近一次记录日期的访问会话的访问记录 |
| POST | `/` | JWT | Attendance.Edit | 创建或更新访问记录 |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit 或 Attendance.Checkin | 提交签到数据。创建或更新访问记录及访问会话，并删除过期记录 |
| DELETE | `/:id` | JWT | Attendance.Edit | 删除访问记录 |

### 示例：签到流程

**第 1 步 -- 加载现有签到数据：**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**第 2 步 -- 提交签到：**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

如果目标服务时间设有签到时间表且其时间窗口已关闭（按与 `checkinOpen` 相同的校区优先时区顺序计算），则不会保存任何数据，响应为 `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`。容量和志愿者比例超限同样返回 409（`error: "capacity"` 或 `"ratio"`）。某人今天已持有的会话（每次签到时重新提交）会跳过时间窗口检查，因此家庭成员可以在之前某个服务时间的窗口关闭后，仍然添加一个开放中的服务时间。

## 访问会话

基础路径：`/attendance/visitsessions`

管理访问记录与会话之间的关联（某人在某次访问中具体参加了哪个会话）。同时提供快速记录接口和下载/导出接口。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 或小组负责人 | 列出访问会话。可使用 `?sessionId=` 筛选。小组负责人可查看其所负责小组的访问会话 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取访问会话 |
| GET | `/download/:sessionId` | JWT | Attendance.View | 下载某会话的考勤数据（返回人员姓名及出席/缺席状态） |
| POST | `/` | JWT | Attendance.Edit | 创建或更新访问会话 |
| POST | `/log` | JWT | Attendance.Edit 或小组负责人 | 快速记录某人在某会话中的考勤。如有需要会自动创建访问记录。小组负责人可为其所负责小组记录考勤 |
| DELETE | `/:id` | JWT | Attendance.Edit | 按 ID 删除访问会话 |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit 或小组负责人 | 将某人从会话中移除。删除该访问会话，若其父访问记录已无剩余会话，则一并删除。小组负责人可移除其所负责小组的考勤 |

### 示例：快速记录考勤

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### 示例：下载会话考勤

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## 连续出勤

基础路径：`/attendance/streaks`

追踪个人的考勤连续记录，即某人连续参加服务的周数。可用于参与度指标和游戏化场景。

| 方法 | 路径 | 认证 | 权限 | 说明 |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | 加载某人的考勤连续记录 |

## 相关页面

- [成员接口](./membership) —— 人员、小组、角色和教会管理
- [身份验证与权限](./authentication) —— 登录流程、JWT、权限模型
- [模块结构](../module-structure) —— 代码组织模式
