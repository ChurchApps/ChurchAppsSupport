---
title: "出席端点"
---

# 出席端点

<div class="article-intro">

出席模块管理校区地点、礼拜、礼拜时间、出席场次、访问和访问场次。它提供了跟踪谁参加了哪个礼拜或小组聚会的基础设施，支持签到工作流程，并提供出席趋势和汇总报告。

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

继承 GenericCrudController，带有 CRUD 路由 `getById`、`getAll`、`post` 和 `delete`。`getAll`（`GET /`）和 `search` 端点使用自定义实现进行了覆盖。

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

继承 GenericCrudController，带有 CRUD 路由 `getById`、`post` 和 `delete`。`getAll` 和 `search` 端点为自定义实现。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有礼拜时间。按 `?serviceId=` 过滤。添加 `?include=groups` 以附加群组数据 |
| GET | `/:id` | JWT | — | 按 ID 获取礼拜时间 |
| GET | `/search?campusId=&serviceId=` | JWT | — | 按校区和礼拜搜索礼拜时间 |
| POST | `/` | JWT | Services.Edit | 创建或更新礼拜时间 |
| DELETE | `/:id` | JWT | Services.Edit | 删除礼拜时间 |

## 群组礼拜时间

基础路径：`/attendance/groupservicetimes`

将群组关联到特定礼拜时间。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有群组-礼拜时间关联。按 `?groupId=` 过滤以获取带有礼拜名称的关联 |
| GET | `/:id` | JWT | — | 按 ID 获取群组-礼拜时间关联 |
| POST | `/` | JWT | Services.Edit | 创建或更新群组-礼拜时间关联 |
| DELETE | `/:id` | JWT | Services.Edit | 删除群组-礼拜时间关联 |

## 出席记录

基础路径：`/attendance/attendancerecords`

提供出席数据的只读聚合视图，用于报表和展示。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 加载某人的出席记录。需要 `?personId=` |
| GET | `/tree` | JWT | — | 加载完整的出席树（校区、礼拜、礼拜时间、群组） |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | 加载出席趋势数据，支持可选过滤器 |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | 加载某个礼拜在指定周的群组出席情况 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | 使用过滤器搜索出席记录（校区、礼拜、礼拜时间、群组、日期范围） |

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

继承 GenericCrudController，带有 CRUD 路由 `getById` 和 `delete`。`getAll` 和 `save` 端点为自定义实现，还允许小组长管理其群组的场次。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 或小组长 | 列出所有场次。按 `?groupId=` 过滤（包含名称）。小组长可查看其所属群组的场次 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取场次 |
| POST | `/` | JWT | Attendance.Edit 或小组长 | 创建或更新场次。小组长可保存其所属群组的场次 |
| DELETE | `/:id` | JWT | Attendance.Edit | 删除场次 |

## 访问

基础路径：`/attendance/visits`

管理单次访问记录（某人在特定日期的出席），并提供签到工作流程。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 列出所有访问。按 `?personId=` 过滤 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取访问 |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View 或 Attendance.Checkin | 加载某个礼拜中人员的签到数据。返回最后记录日期的访问和访问场次 |
| POST | `/` | JWT | Attendance.Edit | 创建或更新访问 |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit 或 Attendance.Checkin | 提交签到数据。创建/更新访问和访问场次，移除过期记录 |
| DELETE | `/:id` | JWT | Attendance.Edit | 删除访问 |

### 示例：签到流程

**步骤 1 -- 加载现有签到数据：**

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

**步骤 2 -- 提交签到：**

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

## 访问场次

基础路径：`/attendance/visitsessions`

管理访问与场次之间的关联（某人在一次访问中参加了哪个具体场次）。还提供快速记录端点和下载/导出端点。

| 方法 | 路径 | 认证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View 或小组长 | 列出访问场次。按 `?sessionId=` 过滤。小组长可查看其所属群组的访问场次 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取访问场次 |
| GET | `/download/:sessionId` | JWT | Attendance.View | 下载某场次的出席情况（返回带有出席/缺席状态的人员姓名） |
| POST | `/` | JWT | Attendance.Edit | 创建或更新访问场次 |
| POST | `/log` | JWT | Attendance.Edit 或小组长 | 快速记录某人某场次的出席。如需要则自动创建访问。小组长可记录其所属群组的出席 |
| DELETE | `/:id` | JWT | Attendance.Edit | 按 ID 删除访问场次 |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit 或小组长 | 将某人从场次中移除。删除访问场次，如果没有剩余场次则删除父级访问。小组长可移除其所属群组的出席记录 |

### 示例：快速记录出席

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

## 相关页面

- [成员管理端点](./membership) — 人员、群组、角色和教会管理
- [认证与权限](./authentication) — 登录流程、JWT、权限模型
- [模块结构](../module-structure) — 代码组织模式
