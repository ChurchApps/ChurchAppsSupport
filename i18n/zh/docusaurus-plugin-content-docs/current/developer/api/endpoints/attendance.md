---
title: "出席端点"
---

# 出席端点

<div class="article-intro">

出席模块管理校区位置、礼拜、礼拜时间、出席场次、来访记录以及来访场次。它为跟踪谁参加了哪场礼拜或小组聚会提供了基础设施，支持签到工作流程，并提供出席趋势和汇总报表。

</div>

**基础路径：** `/attendance`

## 校区

基础路径：`/attendance/campuses`

标准 CRUD 控制器（继承 GenericCrudController）。通过 CRUD 基类提供 `getById`、`getAll`、`post` 和 `delete` 路由。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有校区 |
| GET | `/:id` | JWT | — | 按 ID 获取校区 |
| POST | `/` | JWT | Services.Edit | 创建或更新校区 |
| DELETE | `/:id` | JWT | Services.Edit | 删除校区 |

## 礼拜

基础路径：`/attendance/services`

继承 GenericCrudController，包含 CRUD 路由 `getById`、`getAll`、`post` 和 `delete`。`getAll`（`GET /`）和 `search` 端点被自定义实现覆盖。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有礼拜（包含校区信息） |
| GET | `/:id` | JWT | — | 按 ID 获取礼拜 |
| GET | `/search?campusId=` | JWT | — | 按校区 ID 搜索礼拜 |
| POST | `/` | JWT | Services.Edit | 创建或更新礼拜 |
| DELETE | `/:id` | JWT | Services.Edit | 删除礼拜 |

### 示例：按校区搜索礼拜

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

## 礼拜时间

基础路径：`/attendance/servicetimes`

继承 GenericCrudController，包含 CRUD 路由 `getById`、`post` 和 `delete`。`getAll` 和 `search` 端点为自定义实现。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有礼拜时间。可用 `?serviceId=` 筛选。加上 `?include=groups` 可附加小组数据 |
| GET | `/:id` | JWT | — | 按 ID 获取礼拜时间 |
| GET | `/search?campusId=&serviceId=` | JWT | — | 按校区和礼拜搜索礼拜时间 |
| GET | `/public/:churchId` | Public | — | 获取某教会的校区 → 礼拜 → 时间树。为网站构建器的 `serviceTimes` 元素提供支持 |
| POST | `/` | JWT | Services.Edit | 创建或更新礼拜时间 |
| DELETE | `/:id` | JWT | Services.Edit | 删除礼拜时间 |

## 小组礼拜时间

基础路径：`/attendance/groupservicetimes`

将小组与特定礼拜时间关联。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有"小组-礼拜时间"关联记录。用 `?groupId=` 筛选可获取带礼拜名称的关联 |
| GET | `/:id` | JWT | — | 按 ID 获取"小组-礼拜时间"关联记录 |
| POST | `/` | JWT | Services.Edit | 创建或更新"小组-礼拜时间"关联记录 |
| DELETE | `/:id` | JWT | Services.Edit | 删除"小组-礼拜时间"关联记录 |

## 出席记录

基础路径：`/attendance/attendancerecords`

为报表和展示提供出席数据的只读聚合视图。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 加载某人的出席记录。需要 `?personId=` |
| GET | `/tree` | JWT | — | 加载完整的出席树（校区、礼拜、礼拜时间、小组） |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | 加载带可选筛选条件的出席趋势数据 |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | 加载某场礼拜在指定周的小组出席情况 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | 按条件（校区、礼拜、礼拜时间、小组、日期范围）搜索出席记录 |

### 示例：出席趋势

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

## 场次

基础路径：`/attendance/sessions`

继承 GenericCrudController，包含 CRUD 路由 `getById` 和 `delete`。`getAll` 和 `save` 端点为自定义实现，同时也允许小组负责人管理自己小组的场次。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 或小组负责人 | 列出所有场次。可用 `?groupId=` 筛选（包含名称）。小组负责人可以查看自己小组的场次 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取场次 |
| POST | `/` | JWT | Attendance.Edit 或小组负责人 | 创建或更新场次。小组负责人可以为自己的小组保存场次 |
| DELETE | `/:id` | JWT | Attendance.Edit | 删除场次 |

## 来访记录

基础路径：`/attendance/visits`

管理单次来访记录（某人在特定日期的出席情况），并提供签到工作流程。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 列出所有来访记录。可用 `?personId=` 筛选 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取来访记录 |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View 或 Attendance.Checkin | 加载某场礼拜中一批人员的签到数据。返回带有最近一次登记日期的来访场次的来访记录 |
| POST | `/` | JWT | Attendance.Edit | 创建或更新来访记录 |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit 或 Attendance.Checkin | 提交签到数据。创建/更新来访记录和来访场次，并移除过期记录 |
| DELETE | `/:id` | JWT | Attendance.Edit | 删除来访记录 |

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

## 来访场次

基础路径：`/attendance/visitsessions`

管理来访记录与场次之间的关联（即某人在一次来访中参加的具体场次）。同时提供快速登记端点和下载/导出端点。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 或小组负责人 | 列出来访场次。可用 `?sessionId=` 筛选。小组负责人可以查看自己小组的来访场次 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取来访场次 |
| GET | `/download/:sessionId` | JWT | Attendance.View | 下载某场次的出席情况（返回人员姓名及出席/缺席状态） |
| POST | `/` | JWT | Attendance.Edit | 创建或更新来访场次 |
| POST | `/log` | JWT | Attendance.Edit 或小组负责人 | 快速登记某人在某场次的出席情况。如有需要会自动创建来访记录。小组负责人可以为自己的小组登记出席情况 |
| DELETE | `/:id` | JWT | Attendance.Edit | 按 ID 删除来访场次 |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit 或小组负责人 | 将某人从某场次中移除。会删除该来访场次，如果没有剩余场次则同时删除其所属的来访记录。小组负责人可以为自己的小组移除出席记录 |

### 示例：快速登记出席

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

### 示例：下载场次出席情况

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

## 连续出席记录

基础路径：`/attendance/streaks`

跟踪个人的连续出席记录——某人连续参加了多少周。可用于参与度指标和游戏化。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | 加载某人的连续出席记录 |

## 相关页面

- [成员管理端点](./membership) — 人员、小组、角色和教会管理
- [认证与权限](./authentication) — 登录流程、JWT、权限模型
- [模块结构](../module-structure) — 代码组织模式
