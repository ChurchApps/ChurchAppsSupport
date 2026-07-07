---
title: "出勤端点"
---

# 出勤端点

<div class="article-intro">

出勤模块管理校园位置、服务、服务时间、出勤会话、访问和访问会话。它提供了用于跟踪谁参加了哪个服务或小组会议的基础设施，支持签到工作流，并提供出勤趋势和摘要报告。

</div>

**基本路径：** `/attendance`

## 校园

基本路径：`/attendance/campuses`

标准 CRUD 控制器（扩展 GenericCrudController）。通过 CRUD 基类提供 `getById`、`getAll`、`post` 和 `delete` 路由。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出教会的所有校园 |
| GET | `/:id` | JWT | — | 按 ID 获取校园 |
| POST | `/` | JWT | Services.Edit | 创建或更新校园 |
| DELETE | `/:id` | JWT | Services.Edit | 删除校园 |

## 服务

基本路径：`/attendance/services`

扩展 GenericCrudController，带有 CRUD 路由 `getById`、`getAll`、`post` 和 `delete`。`getAll`（`GET /`）和 `search` 端点被自定义实现覆盖。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有服务（包括校园信息） |
| GET | `/:id` | JWT | — | 按 ID 获取服务 |
| GET | `/search?campusId=` | JWT | — | 按校园 ID 搜索服务 |
| POST | `/` | JWT | Services.Edit | 创建或更新服务 |
| DELETE | `/:id` | JWT | Services.Edit | 删除服务 |

### 示例：按校园搜索服务

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

基本路径：`/attendance/servicetimes`

扩展 GenericCrudController，带有 CRUD 路由 `getById`、`post` 和 `delete`。`getAll` 和 `search` 端点是自定义实现。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有服务时间。按 `?serviceId=` 筛选。添加 `?include=groups` 以追加小组数据 |
| GET | `/:id` | JWT | — | 按 ID 获取服务时间 |
| GET | `/search?campusId=&serviceId=` | JWT | — | 按校园和服务搜索服务时间 |
| GET | `/public/:churchId` | Public | — | 获取教会的校园 → 服务 → 时间树。为网站构建器的 `serviceTimes` 元素提供支持 |
| POST | `/` | JWT | Services.Edit | 创建或更新服务时间 |
| DELETE | `/:id` | JWT | Services.Edit | 删除服务时间 |

## 小组服务时间

基本路径：`/attendance/groupservicetimes`

将小组链接到特定的服务时间。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 列出所有小组服务时间关联。按 `?groupId=` 筛选以获得带有服务名称的关联 |
| GET | `/:id` | JWT | — | 按 ID 获取小组服务时间关联 |
| POST | `/` | JWT | Services.Edit | 创建或更新小组服务时间关联 |
| DELETE | `/:id` | JWT | Services.Edit | 删除小组服务时间关联 |

## 出勤记录

基本路径：`/attendance/attendancerecords`

提供出勤数据的只读聚合视图用于报告和显示。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 为人员加载出勤记录。需要 `?personId=` |
| GET | `/tree` | JWT | — | 加载完整出勤树（校园、服务、服务时间、小组） |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | 使用可选筛选器加载出勤趋势数据 |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | 为给定周的服务加载小组出勤 |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | 搜索出勤记录及筛选器（校园、服务、服务时间、小组、日期范围） |

### 示例：出勤趋势

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

基本路径：`/attendance/sessions`

扩展 GenericCrudController，带有 CRUD 路由 `getById` 和 `delete`。`getAll` 和 `save` 端点是自定义实现，也允许小组领导者管理其小组的会话。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View or Group Leader | 列出所有会话。按 `?groupId=` 筛选（包括名称）。小组领导者可以查看其自己小组的会话 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取会话 |
| POST | `/` | JWT | Attendance.Edit or Group Leader | 创建或更新会话。小组领导者可以为其自己的小组保存会话 |
| DELETE | `/:id` | JWT | Attendance.Edit | 删除会话 |

## 访问

基本路径：`/attendance/visits`

管理单个访问记录（特定日期的人访问）并提供签到工作流。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | 列出所有访问。按 `?personId=` 筛选 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取访问 |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View or Attendance.Checkin | 为服务中的人员加载签到数据。返回访问及来自最后登录日期的访问会话 |
| POST | `/` | JWT | Attendance.Edit | 创建或更新访问 |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit or Attendance.Checkin | 提交签到数据。创建/更新访问和访问会话，删除陈旧记录 |
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

## 访问会话

基本路径：`/attendance/visitsessions`

管理访问和会话之间的关联（一个人在访问期间参加的特定会话）。也提供快速日志端点和下载/导出端点。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View or Group Leader | 列出访问会话。按 `?sessionId=` 筛选。小组领导者可以查看其自己小组的访问会话 |
| GET | `/:id` | JWT | Attendance.View | 按 ID 获取访问会话 |
| GET | `/download/:sessionId` | JWT | Attendance.View | 下载会话的出勤（返回人员名称及出席/缺席状态） |
| POST | `/` | JWT | Attendance.Edit | 创建或更新访问会话 |
| POST | `/log` | JWT | Attendance.Edit or Group Leader | 快速记录人员到会话的出勤。自动创建访问如果需要。小组领导者可以记录其自己小组的出勤 |
| DELETE | `/:id` | JWT | Attendance.Edit | 按 ID 删除访问会话 |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit or Group Leader | 从会话中删除人员。删除访问会话，如果没有会话保留则删除父访问。小组领导者可以删除其自己小组的出勤 |

### 示例：快速记录出勤

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

### 示例：下载会话出勤

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

## 连胜

基本路径：`/attendance/streaks`

跟踪个人的出勤连胜 -- 人员参加的连续周数。用于参与指标和游戏化。

| 方法 | 路径 | 验证 | 权限 | 描述 |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | 为人员加载出勤连胜 |

## 相关页面

- [成员端点](./membership) — 人员、小组、角色和教会管理
- [验证和权限](./authentication) — 登录流、JWT、权限模型
- [模块结构](../module-structure) — 代码组织模式
