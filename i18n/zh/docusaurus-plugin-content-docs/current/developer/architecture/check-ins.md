---
title: "签到"
---

# 签到

<div class="article-intro">

签到是一个系统，拥有三个入口：用于有人值守和自助服务站点的 B1Checkin 自助机应用、B1App 成员门户内的自助签到，以及 B1Admin 中的管理端出勤功能。这三者都写入核心 Api 中的同一个出勤模块，并且课堂路由完全由小组驱动——系统中不存在单独的"地点"或"教室"实体。在此之上还有一层儿童安全机制：按次访问的签到类型、服务端的容量和志愿者比例门控、自助机端的年龄/年级资格检查、离场时的可信接送人验证，以及通过教会的短信服务商进行的家长呼叫。本页介绍数据模型、签到流程、安全机制以及标签打印流程。

</div>

## 概览

```
┌──────────────────────────┐
│ B1Checkin（Expo 自助机）  │──┐         ┌──────────────────────────────────────────────┐
│  查找 → 家庭 →           │  │         │ Api                                          │
│  小组 → 完成/打印         │  │  HTTPS  │  ┌─ membership 模块 ──────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups          │ │
│ B1App（自助签到）         │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin 屏幕     │  │         │  ┌─ attendance 模块 ───────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin（工作人员）       │──┘         │  │ groupServiceTimes  （房间路由）          │ │
│  设置 · 报表 ·            │            │  │ sessions ← visitSessions → visits       │ │
│  标签设计器               │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

标签打印路径（仅限自助机）：
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper（标签模板，或内置的 HTML 备用模板）
       └▶ LabelRenderer → HTML 文档 + 内联 SVG 条码
            └▶ PrintUI：WebView 渲染 → ViewShot JPG 截图
                 └▶ printer-helper 原生模块 → Brother QL / Zebra
```

| 入口 | 代码仓库 | 技术栈 | 角色 |
|---------|------|-------|------|
| 自助机 | `B1Checkin` | Expo / React Native，expo-router 文件路由；为 Android、Amazon Fire 和 iOS 使用 EAS 构建；通过 `expo-updates` 进行 OTA 更新 | 有人值守或自助服务站，支持标签打印和可验证的离场 |
| 自助签到 | `B1App` | Next.js（b1.church 成员门户） | 已登录的成员通过手机为自己的家庭签到；不支持打印 |
| 管理端 | `B1Admin` | React SPA | 配置礼拜结构、为礼拜时间分配小组、设计标签、录入手动出勤、运行报表 |

这三者都通过 `ApiHelper` 调用同样的两个 API 模块：**MembershipApi**（`/membership`）用于人员、家庭和小组；**AttendanceApi**（`/attendance`）用于下文中的其他所有功能。

## 数据模型（`Api/src/modules/attendance`）

| 实体 / 数据表 | 关键字段 | 含义 |
|----------------|-----------|---------|
| `campuses` | name, address | 此处已弃用——校区在会员模块（`/membership/campuses`）中维护；出勤模块中的副本已冻结为只读，供旧版读取器使用（`models/Campus.ts`） |
| `services` | campusId, name | 定期举行的聚会，例如"周日早间"（`models/Service.ts`） |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | 某场礼拜中的一个时段，例如"9:00 AM"（`models/ServiceTime.ts`）。排期相关列为可选项（迁移脚本 `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`），并驱动[签到窗口](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | 连接表：哪些小组（教室）在哪些礼拜时间聚会（`models/GroupServiceTime.ts`） |
| `sessions` | groupId, serviceTimeId, sessionDate | 某小组在某一日期的一次聚会——在签到时惰性创建（`models/Session.ts`） |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 某人在某一日期的一次出席（`models/Visit.ts`）。`checkinType` 为 `member` / `guest` / `volunteer`（NULL 表示旧版成员），由自助机设置，并供容量/比例门控使用 |
| `visitSessions` | visitId, sessionId | 某次到访涵盖哪些场次——签到两个礼拜时间的儿童会获得两行记录（`models/VisitSession.ts`） |
| `labelTemplates` | name, labelType（`nametag`/`pickup`）, width, height, isDefault, content（JSON 区块） | 可设计的标签布局（`models/LabelTemplate.ts`） |

### 完成签到如何持久化

`VisitController.postCheckin`（`Api/src/modules/attendance/controllers/VisitController.ts`）处理 `POST /attendance/visits/checkin?serviceId=&peopleIds=`。请求体是一个 `Visit` 对象数组，每个对象都带有 `visitSessions`，其中嵌入的 `session` 仅指定一个 `(serviceTimeId, groupId)` 组合。服务器随后会：

1. **在任何写入之前先检查容量和比例。** `evaluateGates()` → `CheckinGateHelper.evaluate()` 会根据当前的在场人数，检查每个目标房间的容量、访客容量、关闭标志以及志愿者比例。postCheckin **不是事务性的**，因此门控必须在第一次保存之前运行——一旦出现严重违规，将返回 409，指出违规的房间，且不会保存任何内容。参见[容量与志愿者比例门控](#capacity-and-volunteer-ratio-gates)。
2. **惰性解析场次。** `getSessionId()` 会为 `(groupId, serviceTimeId, today)` 查找或创建 `sessions` 行——场次 ID 按日期在进程内缓存。新建的场次会触发 `session.created` webhook。该循环是一个被等待的 `for..of`——早先使用的非等待 `forEach(async …)` 与保存操作产生了竞争，导致首个场次创建时写入了 NULL 的 sessionId（已修复；循环处附有代码注释说明）。
3. **替换当天的记录。** 该服务当天这些人员已有的所有到访记录（连同其 visitSessions）会被删除，然后保存提交的整组记录。因此，重新为一个家庭签到是一个幂等的"当前状态"操作，而不是追加。如果传入 `?checkDuplicates=true`，则会返回 `{ duplicates: [personId…] }` 而不写入任何内容，这正是自助机在覆盖前发出警告的方式。
4. **为每批次生成一个安全码。** `SecurityCodeHelper.generate()` 使用字符集 `23456789BCDFGHJKLMNPQRSTVWXYZ` 生成 4 位安全码（不含元音字母和易混淆字符，因此安全码不会拼成单词，也不易被误读）。服务器会针对同一教会当天未签离的到访记录进行碰撞重试，并将该安全码盖在批次中的每一条到访记录上。
5. **返回 `{ streaks, securityCode }`。** `streaks` 将 personId 映射到连续出勤周数；自助机会在里程碑（每 5 周）时以彩纸效果庆祝。

每条保存的到访记录还会触发一个 `attendance.recorded` webhook。读取端 `GET /attendance/visits/checkin` 会返回这些人员自**最近一次记录日期**起的到访记录——如果该日期是上一周，则会去掉 ID，因此客户端收到的是上周房间选择的预填副本，保存后将作为新记录写入。

### 离场

两个端点完成整个流程（`VisitController`）：

- `GET /attendance/visits/code/:code` —— 返回今天尚未签离、带有该安全码的到访记录，并填充其场次。
- `POST /attendance/visits/checkout` —— 请求体为 `{ visitIds, checkedOutBy?, checkedOutById? }`；盖上 `checkoutTime` 以及接走人的信息，并为每条到访记录触发一个 `attendance.checkout` webhook。

权限：自助机使用 `attendance.checkin` 进行身份验证，该权限恰好授予签到/签离/标签模板相关的接口，外加自助机所需的、无需 `people.view` 的家庭查询（电话/姓名搜索、签到模型中的家庭成员，以及家庭接送人名单）。B1Checkin 的 `SessionHelper.filterChurches` 只会提供账号拥有 `Attendance/Checkin` 或 `Attendance/Edit` 权限的教会。`Checkin` 已不再属于 Everyone（null 角色）的权限（`RoleHelper` 以及迁移脚本 `2026-11-01_remove_everyone_checkin`），因此必须通过真正的角色授予；`attendance.view`/`attendance.edit` 涵盖报表和手动录入；礼拜结构（礼拜、礼拜时间、小组分配）则需要 `services.edit`。成员自助签到（B1App）无需任何权限：任何在本教会拥有已关联人员的已登录用户，都可以调用 `GET`/`POST /attendance/visits/checkin`，服务器会将提交的 `personId` 限制在调用者自己的家庭范围内（否则返回 403——正是这一限制防止了其他家庭的 `securityCode` 被读取）。成员资格即是授权；成员是否能看到该功能，则由教会的 B1App 导航标签页控制。其他签到端点（`code/:code`、`checkout`、`guardians`、`CheckinController`）仍仅限自助机/工作人员使用。

## 小组驱动房间路由

系统中的任何地方都没有房间或教室实体。"房间"就是启用了 `trackAttendance` 的会员**小组**，并通过 `groupServiceTimes` 关联到一个或多个礼拜时间。影响自助机行为的小组字段（位于 `Api/src/modules/membership/models/Group.ts`）如下：

| 字段 | 效果 |
|------|--------|
| `trackAttendance` | 小组是否参与出勤；B1Admin 的设置树会将没有任何 `groupServiceTimes` 行的 `trackAttendance` 小组标记为未分配 |
| `parentPickup` | 标记为儿童房间：签到到该小组会使到访成为"儿童"到访，并打印家长接送标签，同时将安全码印在名牌上 |
| `printNametag` | 签到到该小组时是否打印名牌 |
| `capacity` / `guestCapacity` / `checkinClosed` | 房间容量限制以及硬性"关闭"开关，由签到门控在服务端强制执行（可在 B1Admin 的小组设置中"Check-In Capacity"（签到容量）下编辑） |
| `volunteerRatio` / `minVolunteers` | 儿童与志愿者的比例以及最低志愿者人数，按全教会的 `ratioEnforcement` 设置执行 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 年龄/年级资格范围，在自助机端计算，用于突出或淡化显示房间 |

每个客户端的数据组织方式相同（例如 `B1Checkin/app/services.tsx`、`B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`）：并行加载 `GET /attendance/servicetimes?serviceId=`、`GET /attendance/groupservicetimes` 和 `GET /membership/groups`，然后对每个礼拜时间，将 `groupServiceTimes` 行指向它的小组收集到 `serviceTime.groups` 中。该数组即为房间选择器所显示的内容，并按小组的 `categoryName` 组织。

分配关系在 B1Admin 的小组页面中编辑（`B1Admin/src/groups/components/ServiceTimesEdit.tsx`——`POST`/`DELETE /attendance/groupservicetimes`），整个校区 → 礼拜 → 礼拜时间 → 小组的树形结构则在 `B1Admin/src/attendance/components/AttendanceSetup.tsx` 中通过 `GET /attendance/attendancerecords/tree` 进行可视化展示。

:::info
由于小组是唯一的事实来源，同一套小组成员资格同时驱动自助机路由、B1Admin 小组页面中类似名册的出勤功能以及出勤报表——将小组分配到礼拜时间，是使其成为签到目的地所需的唯一步骤。
:::

## 儿童安全

### 签到类型 {#check-in-types}

每条到访记录都携带一个 `checkinType`——`member`、`guest` 或 `volunteer`（NULL 表示旧版/成员；迁移脚本 `tools/migrations/attendance/2026-07-03_checkin_type.ts`）。该类型由**自助机端**选择：在展开的成员行上通过 Member / Guest / Volunteer 标签进行选择（`B1Checkin/src/components/MemberServiceTimes.tsx`），并在完成时（`app/checkinComplete.tsx`）盖到每条待定的到访记录上，默认为 `member`。服务器在门控中使用该类型——志愿者计入比例覆盖，而非计入容量；访客则计入 `guestCapacity`。

### 容量与志愿者比例门控 {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()`（`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`）在 `postCheckin` 保存之前运行（该端点非事务性，因此"先门控后保存"是正确性的保障机制）。它会按目标小组加载当前的在场人数（`VisitRepo.countActiveByGroupToday`），并通过会员模块网关加载小组配置，然后对违规情况进行分类：

- **严重（始终阻止）：** `checkinClosed`、`当前人数 + 即将签到人数 > capacity`、访客人数超过 `guestCapacity`。整个批次会被拒绝，并返回 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`——自助机会显示所指明的房间。
- **比例（警告或阻止）：** 将非志愿者人员签入某房间时，若 `志愿者人数 < minVolunteers`、完全没有志愿者，或 `儿童人数 > 志愿者人数 × volunteerRatio`。严重程度由教会的 `ratioEnforcement` 设置决定（默认为 `"warn"`，可选 `"block"`，在 B1Admin 的 Manage Church → Check-In（管理教会 → 签到）中编辑，`CheckinSettingsEdit.tsx`）。警告模式下会返回 `409 { warning: true, error: "ratio", … }`，除非客户端携带 `acknowledgeWarnings=true` 重新提交——这次重新提交即是自助机上工作人员确认覆盖的方式。

### 签到窗口排期 {#scheduled-check-in-windows}

礼拜时间可以携带一个可选的每周排期（`dayOfWeek` 为 0–6，其中 0 表示周日；`startTime`/`endTime` 为 `HH:mm` 格式；以及 `checkinOpenMinutes`、`checkinCloseMinutes`），可在 B1Admin 的 **Attendance → Setup**（出勤 → 设置）礼拜时间表单中编辑（`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`，"Check-in Schedule"（签到计划））。`CheckinGateHelper.hasSchedule()` 只有在 `dayOfWeek` 和 `startTime` 均已设置时，才会将礼拜时间视为已排期；未排期的礼拜时间永远不受时间门控。`isServiceTimeOpen()` 以本地挂钟时间计算窗口（`DateHelper.toChurchTime`）。时区由 `CheckinTimeZoneHelper.load()`（`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`）按礼拜时间逐一解析：首先使用礼拜所属校区的 `timezone`（`service.campusId`，通过 `MembershipModuleGateway.loadCampusTimeZones`）；其次是教会的 `timeZone`（在 B1Admin 的教会信息中设置）；再次是第一个设有 `timezone` 的未删除校区（`loadCampusTimeZone`）；最后才是 `America/New_York`。之所以校区优先，是因为大多数教会的教会时区都被回填为 `America/New_York`。下文的列表和提交路径均以相同方式解析时区。窗口从开始前 `checkinOpenMinutes` 分钟开始，到结束后 `checkinCloseMinutes` 分钟结束（若无结束时间，则从开始后算起），并可处理跨午夜或跨周边界的窗口。

该窗口在两处强制执行：

- **列表：** `GET /attendance/servicetimes` 会为每行附加一个计算得出的 `checkinOpen` 布尔值。B1App 的自助签到（`CheckinPage.tsx`）和 B1Checkin 的礼拜选择器（`app/services.tsx`）会保留所有礼拜时间。当某场礼拜的所有时间均已关闭时，它们会显示最近的开放时间（B1App 中为"Check-in opens Sun 9:30 AM."（签到将于周日 9:30 开放），B1Checkin 中为"Check-in for this service opens Sun 9:30 AM."（本场礼拜的签到将于周日 9:30 开放），来自 `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`）；如果无法计算出开放时间，则回退为"Check-in isn't open for this service right now."（本场礼拜目前未开放签到）（自助机提供返回按钮，供选择其他礼拜）。否则，已关闭的时间会以不可选择的"Closed"/"Closed · opens 9:30 AM"行显示。B1Checkin 的家庭屏幕（`MemberServiceTimes.tsx`）会使用 `ServiceTimeHelper.isCheckinOpen()` 根据设备时钟实时重新评估开放状态（使用设备时区而非教会时区），因此长时间运行的自助机能够准时开放和关闭；并且在某人已签到的已关闭礼拜时间上，会显示"Kids Room 1 · Checked in"（小组名称 · 已签到）。
- **提交：** 在 `evaluateGates()` 中，于容量/比例评估之前，`findClosedServiceTimeGroups()` 会在任何目标场次的礼拜时间超出其窗口时，以 `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` 拒绝该批次。由于某家庭当天已有的到访记录会随每次签到重新提交，因此该人员已经持有的场次（现有到访记录中的 `personId|sessionId`）会跳过此门控，因此即使较早的窗口已经关闭，添加一个仍然开放的较晚礼拜时间也不会被拒绝。B1Checkin 通过其硬门控屏幕呈现此结果，并显示原因"check-in isn't open right now"（签到目前未开放）（容量违规仍显示"room is full or closed"（房间已满或已关闭））。

### 年龄/年级资格（自助机端） {#agegrade-eligibility-kiosk-side}

房间资格是建议性的 UI，在自助机端计算，服务器并不强制执行。`B1Checkin/src/helpers/EligibilityHelper.ts` 将人员的出生日期/年级与小组的 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` 进行比较（年级顺序：PreK、K、1–12、Graduated），并返回 `eligible`（符合）/ `ineligible`（不符合）/ `unknown`（未知）——缺失数据会得到 `unknown`，且永远不会隐藏房间。年龄和年级以教会的**年级升级日期**（`gradePromotionDate` 设置，格式为 `"MM-DD"`，在 `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` 中编辑）为准计算；自助机从 `GET /attendance/checkin/settings` 获取该日期，`resolveAsOfDate` 会选取今天或之前最近的一次发生日期。房间选择器会高亮显示符合条件的房间，并淡化不符合条件的房间；选择被淡化的房间需要工作人员确认。

### 可信接送与未授权接送 {#trusted-and-not-authorized-pickup}

接送人员是会员实体，按家庭划分：`householdPickupPeople`（`Api/src/modules/membership/models/HouseholdPickupPerson.ts`——householdId、可选的 personId、name、photoUrl、relationship、`status` 为 `trusted` / `notAuthorized`，以及 notes）。其 CRUD 操作包括 `GET /membership/householdpickup/:householdId`（任何已通过身份验证的教会用户均可访问，以便自助机读取），以及受 `people.edit` 控制的 `POST` / `DELETE`。工作人员在人员页面的 **Pickup**（接送）卡片上管理该名单（`B1Admin/src/people/components/PickupPeople.tsx`）——包括照片、关系，以及可信/未授权状态标签。

在离场（`B1Checkin/app/checkout.tsx`）时，自助机会加载该家庭的接送人名单：`trusted` 的条目会显示为可点击的接送卡片，与家庭成年人的照片网格并列显示；自由输入的"其他"姓名会与 `notAuthorized` 条目进行模糊匹配（Levenshtein 距离，`src/helpers/PickupMatchHelper.ts`）——一旦匹配，离场将被阻止，并弹出警告面板，同时提供工作人员的 **Override**（覆盖）按钮。覆盖操作会记录在到访记录本身上：它通过常规的 `POST /attendance/visits/checkout` 提交 `checkedOutBy` 为 `"OVERRIDE: {name}"`，因此它会出现在出勤记录和 `attendance.checkout` webhook 中，而不是单独的审计表。

### 呼叫家长与紧急广播

`CheckinController`（`Api/src/modules/attendance/controllers/CheckinController.ts`，路由 `/attendance/checkin`）提供两个短信端点：

- `POST /page` —— `{ visitId, message }`：呼叫某个已签到儿童的监护人（自助机离场屏幕，有人值守模式）。
- `POST /broadcast` —— `{ serviceId, message }`：向某场礼拜所有已签到家庭的成年人发送短信（自助机管理员设置，位于 `B1Checkin/app/adminSettings.tsx` 中一个需要输入 `EMERGENCY` 确认的表单之后）。

两者都会通过会员网关解析家庭成年人，然后将投递交给 **`MessagingModuleGateway.sendBulkText`**（`Api/src/shared/modules/MessagingModuleGateway.ts`）——这是通往教会已配置短信服务商（`@churchapps/texting`：TextInChurch、Clearstream 或 MutualMinistry；系统中没有内置的短信发送器）的跨模块入口。网关会记录一行 `sentText` 以及每位收件人的 `deliveryLog` 条目，并将单批次限制为 500 名收件人；如果未配置任何服务商，则返回 `no_provider`，自助机会将其显示为"No SMS provider configured"（未配置短信服务商）。控制器的 `dispatch()` 会对电话号码去重，并跳过没有手机号码或已设置 `optedOut` 的人员，返回 `{ sent, failed, skippedOptedOut, skippedNoPhone }`，以便自助机显示被跳过的内容。

## 自助机（B1Checkin）

各屏幕是 `B1Checkin/app/` 下的 expo-router 文件；跨屏幕的状态保存在静态的 `CachedData` 类（`src/helpers/CachedData.ts`）中，而非 React 状态。

```
index（启动/自动登录）→ selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             加载 serviceTimes、groups、  │             │  └─────────┘ └▶ addGuest  └▶ 打印标签，
             groupServiceTimes、          │             └▶ checkout（有人值守）          自动返回
             labelTemplates               │                                            至 lookup
```

1. **查找**（`app/lookup.tsx`）—— 按电话（`GET /membership/people/search/phone?number=`，后四位或完整号码）或按姓名（`GET /membership/people/search?term=`）搜索。选中某个匹配项后，会加载家庭（`GET /membership/people/household/{householdId}`）和已有的到访记录（`GET /attendance/visits/checkin`），并以上周的选择预填 `pendingVisits`。
2. **家庭核对**（`app/household.tsx`、`src/components/MemberList.tsx`）—— 每个成员行会显示已签到标记、过敏/`nametagNotes` 标记，以及其当前的房间标签。展开某个成员即可列出每个礼拜时间，并提供房间按钮以及 Member / Guest / Volunteer 签到类型标签（`MemberServiceTimes.tsx`）。在每个礼拜时间名称下方，`ServiceTimeHelper.getGroupSummary()` 会显示该时间提供的小组（`serviceTime.groups` 的名称，去除空白、不区分大小写去重，并以逗号连接）；如果该礼拜时间没有任何小组，则不显示任何内容。
3. **小组分配**（`app/selectGroup.tsx`）—— 根据 `serviceTime.groups` 构建的分类树，符合年龄/年级的房间会被高亮显示，不符合的房间会被淡化，并需要工作人员确认（参见[年龄/年级资格](#agegrade-eligibility-kiosk-side)）；选择房间会在该人员的待定到访记录中写入一条 `{ session: { serviceTimeId, groupId } }` 形式的 visitSession（`src/helpers/VisitSessionHelper.ts`）。选择"None"（无）则会清除。
4. **完成**（`app/checkinComplete.tsx`）—— 以 `pendingVisits`（每条都盖有其 `checkinType`）调用 `POST /attendance/visits/checkin`，如果配置了打印机则打印标签，然后自动返回 lookup。若返回 `409` 的容量或 `notOpen` 响应，会显示相关房间及原因（已满/已关闭，或签到未开放）；比例警告则会提供工作人员确认选项，确认后携带 `acknowledgeWarnings=true` 重新提交。

**离场**屏幕（`app/checkout.tsx`）通过一个自动聚焦的输入框接受 4 位安全码——因此 USB/蓝牙键盘模拟的条码扫描枪无需摄像头即可使用——或使用同一字符集的屏幕键盘，输入满 4 位后自动提交。**扫描**按钮会打开一个面板，其中包含共享的 `src/components/CodeScanner.tsx` 摄像头（默认使用后置摄像头，支持 QR、Code 128 和 Code 39），因此没有键盘扫描枪的站点也能读取接送标签；扫描到的安全码会进入与手动输入相同的 `handleCode()` 处理路径。它会查询安全码，显示正在被接走的儿童，并将家庭的**可信接送人**以可点击卡片的形式展示，同时还有家庭成年人的照片网格（以及一个"其他"自由文本选项，该选项会与未授权姓名进行模糊检查——参见[可信接送与未授权接送](#trusted-and-not-authorized-pickup)），然后以选择人员的姓名/ID 调用 `POST /attendance/visits/checkout`。在有人值守模式下，该屏幕还提供 **Page a parent**（呼叫家长，`POST /attendance/checkin/page`）以及**安全标签重新打印**功能——`reprint()` 会使用 `LabelHelper.getAllLabelsFor(...)` 重建该家庭的标签，并将其交给与签到相同的 `PrintUI` 流程。

站点模式通过 AsyncStorage 标志 `@StationMode`（`"self"` 或 `"manned"`，在 `app/adminSettings.tsx` 中切换）设置。有人值守模式会在 lookup 屏幕上增加离场入口，并在家庭屏幕中增加逐个成员的资料编辑功能（`POST /membership/people`）。自助机内置了安全加固措施：可选的 PIN 码（`app/setPin.tsx`、`src/components/PinEntryModal.tsx`）用于保护管理员和打印机屏幕；管理员屏幕仅能通过快速连续点击标题栏标志 7 次打开；另外，空闲时的吸引屏幕（`src/hooks/useInactivityTimer.ts`）会在家庭之间接管屏幕。

## 自助签到（B1App）

成员在 b1.church 门户的 `/mobile/checkin` 屏幕上签到（由 `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` 路由至 `screens/CheckinPage.tsx`）。该功能需要已登录的用户，并针对完全相同的端点执行与自助机相同的四个步骤——礼拜 → 家庭 → 小组 → 完成——状态保存在 `B1App/src/helpers/CheckinHelper.ts` 中。与自助机的区别在于：家庭来自已登录用户自己的 `householdId`（没有搜索步骤），并且不支持标签打印——取而代之，完成屏幕会将该批次的安全码以二维码（`qrcode.react`）形式显示，并附有"请在签到站出示此码"的提示。如果页面加载时家庭已经签到，则会显示"Show check-in code"（显示签到码）按钮，从 `GET /attendance/visits/checkin` 返回的第一条带有 `securityCode` 的已有到访记录重新显示二维码。签到在提交时即被立即记录（没有待定状态）；二维码仅用于在自助机上打印标签。

**手机到自助机的标签打印**（`B1Checkin/app/scan.tsx`，从 lookup 屏幕上的二维码"Scan code"（扫描码）按钮进入）：自助机显示 `CodeScanner`（一个 `expo-camera` 的 `CameraView`，默认使用前置摄像头，可翻转），扫描二维码。`ScanCodeHelper.parse()` 只接受纯 4 位、属于安全码字符集的码，`ScanCodeHelper.isRepeat()` 会在 4 秒内忽略同一个码，因此 B1App 的二维码和打印标签上的二维码区域都可以使用。随后，该屏幕会执行与离场重新打印相同的路径——`GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`——然后返回 lookup。扫描时不会写入任何出勤记录；仅打印标签。没有有效到访记录的安全码、没有打印机的站点，以及没有标签的小组，都会显示一条提示并返回 lookup。

类型以及 `ApiHelper`/`ArrayHelper` 来自 `@churchapps/helpers` 和 `@churchapps/apphelper`；没有任何 React 组件与 B1Admin 共享。

## 管理端出勤（B1Admin）

- **设置** —— `/attendance`（`B1Admin/src/attendance/AttendancePage.tsx`）渲染结构树，并创建礼拜（`ServiceEdit.tsx`）和礼拜时间（`ServiceTimeEdit.tsx`）。校区数据通过 `useCampuses()` 钩子从会员模块获取。
- **手动出勤**位于小组一侧，而非出勤板块：`B1Admin/src/groups/components/GroupSessionsTab.tsx` 创建场次（`POST /attendance/sessions`；添加时，`SessionEdit.tsx` 可以为与所选礼拜时间共享的每个其他小组各创建一个场次，并跳过在该日期已有场次的小组），并通过 `POST /attendance/visitsessions/log` 标记人员出席，该接口会为该人员和场次查找或创建到访记录。小组负责人无需 `attendance.edit` 权限即可为自己的小组录入出勤——控制器会检查 `au.leaderGroupIds`。
- **报表**——出勤趋势和小组出勤是服务器端定义的报表（`B1Admin/src/components/reporting/ReportWithFilter.tsx` 对接 ReportingApi；定义位于 `Api/reports/*.json`）。两者都接受 `startDate`/`endDate`（结束日期包含在内）；趋势报表默认为一年前至今，并增加一个每周的 `sessionDates` 列；屏幕上的小组出勤树包含每条到访记录的 `checkinTime` 以及人员的 `membershipStatus`。小组出勤的 CSV 来自配套的 `groupAttendanceDownload` 报表，由 `GroupAttendanceDownloadHelper` 透视为每位小组成员一行，每个带日期的场次一列（标记出席/缺席）；个人历史记录则通过 `GET /attendance/attendancerecords?personId=` 获取（`B1Admin/src/people/components/PersonAttendance.tsx`）。

## 标签打印

### 模板与设计器

教会可以在 B1Admin 的 `/mobile/checkin/labels`（`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`，从签到设置页面进入）中设计自己的标签。模板即 `labelTemplates` 中的一行，其 `content` 是一个 JSON 数组，由区块组成——`text`、`field`、`barcode`、`qrcode` 或 `box`——每个区块都以百分比坐标定位，并可设置字体、对齐方式、编码方式（`code39`/`code128`/`qr`），以及可选的显示条件（例如仅当 `person.nametagNotes` 非空时才渲染过敏信息框）。标签有两种 `labelType`：`nametag`（每位已签到人员一张；字段包括 `person.displayName`、`sessions`、`securityCode`，以及 `person.isBirthdayWeek`——当生日的月/日在今天前后 3 天之内时为 `"true"`，并可跨越年末，由 `LabelHelper.isBirthdayWithin()` 计算）和 `pickup`（每个家庭一张；字段包括 `children`、`childrenAllergies`）。服务器会确保每个教会的每种类型只有一个默认模板（`LabelTemplateController.save`）。设计器附带了与自助机内置标签相对应的入门模板，并可使用示例数据进行预览。

### 自助机上的渲染与打印

在完成签到时，`B1Checkin/src/helpers/LabelHelper.ts` 会根据每条待定到访记录上的小组标志决定要打印的内容：`printNametag` 小组打印名牌，若任何到访记录命中了 `parentPickup` 小组，则额外打印一张家庭接送标签。`checkinType` 为 `volunteer` 的到访记录会被 `LabelHelper.selectChildVisits()` 跳过，因此在家长接送房间工作的托儿工作人员永远不会触发接送标签。签到响应中的安全码会被印在儿童名牌和接送标签上；成人名牌则不印安全码。如果教会配置了模板，`LabelRenderer`（`src/helpers/LabelRenderer.ts`）会将区块和字段上下文转换为独立的 HTML 文档；否则，将使用 `B1Checkin/assets/labels/` 中的内置 HTML 标签，并进行占位符替换。

条码由纯 TypeScript 编码器以内联 SVG 形式生成，位于 `B1Checkin/src/helpers/barcode.ts`——包括 Code 39 的图案表和 Code 128（B 代码集，带 mod-103 校验位）的宽度表，以及通过 `qrcode` 包生成的 QR 码。**这些编码器在 B1Admin 中被有意复制一份**（`LabelEditor.tsx` 内联了相同的表，并在代码注释中说明），以确保设计器的预览与自助机的输出像素级一致；修改其中一处，必须同步修改另一处。

打印流程（`src/components/PrintUI.tsx`）在 `WebView` 中渲染每个 HTML 标签，通过 `react-native-view-shot` 将其截图为 JPG，然后将图片 URI 交给原生的 **printer-helper** Expo 模块（`B1Checkin/modules/printer-helper/`）。该模块提供 `scan()`、`checkInit()`、`printUris()` 以及状态事件，并在两个平台上为每个品牌提供一个 provider：

| 品牌 | Android | iOS | 说明 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`（Brother 打印 SDK） | `BrotherProvider.swift`（`BRLMPrinterKit.xcframework`） | QL 系列网络打印机（QL-800/810W/820NWB/1100/1110NWB 等），模切 29×90 标签，为推荐的默认选项 |
| Zebra | `ZebraProvider.kt`（Link-OS SDK） | `ZebraProvider.swift` + `ZebraBridge` | 网络发现 + 通过 TCP 进行 ZPL 图像打印 |

打印机选择位于 `app/printers.tsx`（网络扫描返回 `brand~model~ip` 格式的条目；所选项持久化到 AsyncStorage），`src/helpers/PrinterLog.ts` 保存一份设备端诊断日志，并通过自助机页眉中的实时状态指示点展示。

## 访客登记

有两种途径可以在签到过程中创建人员：

- **在自助机上** —— 家庭屏幕上的"Add guest"（添加访客）会打开 `B1Checkin/app/addGuest.tsx`，它首先通过 `GET /membership/people/search?term=` 搜索是否有现存的非会员匹配项，若没有，则通过 `POST /membership/people` 创建一个人员，并关联到当前家庭。之后，该访客会像普通成员一样进行小组分配。
- **通过二维码自助登记** —— 当教会设置 `enableQRGuestRegistration` 开启时（在 B1Admin 的签到设置中配置，并通过 `GET /membership/settings/public/{churchId}` 读取），自助机的 lookup 屏幕会显示一个二维码，链接到 `https://{subdomain}.b1.church/guest-register?serviceId=`。该 B1App 页面（`src/app/[sdSlug]/(public)/guest-register/page.tsx`）允许前来的家庭通过匿名的 `POST /membership/people/guest-register` 端点，在自己的手机上完成登记，从而保持自助机队伍的顺畅。二维码面板上还有一个 **Register here**（在此登记）按钮，它会在自助机上以无痕模式、禁用缓存的 `WebView` 打开同一页面（`app/guestRegister.tsx`）；`src/helpers/GuestRegisterHelper.ts` 为二维码和 WebView 构建 URL，并阻止导航至 `https://{subdomain}.b1.church/guest-register` 之外的地址。点击 **Done**（完成）、返回，或 120 秒无操作（表单输入会从 WebView 中转发为活动信号）后，屏幕会返回 lookup，并卸载 WebView，以确保一个家庭的输入内容不会泄露给下一个家庭。

二维码登记由 B1Admin 的 **QR Guest Registration**（二维码访客登记）卡片（`src/mobile/CheckInPage.tsx`）保存的教会设置驱动：

| 设置 | 可见性 | 用途 |
|---|---|---|
| `enableQRGuestRegistration` | 公开 | 二维码自助机和匿名端点的启用开关 |
| `guestRegistrationFields` | 公开 | JSON 映射，包含 `email`、`phone`、`address`、`birthDate`、`gender`、`maritalStatus`、`grade`、`comments` → `"off"` / `"optional"` / `"required"`。默认：电子邮件和电话为可选，其余关闭。名和姓始终为必填 |
| `guestRegistrationImage` | 公开 | 页眉照片 URL；B1App 会以 16:9 比例在表单和确认屏幕上代替图标显示 |
| `guestRegistrationGroupId` | 私密 | 每次登记都会加入的小组（访客永远看不到或选择该小组） |
| `guestRegistrationRecordAttendance` | 私密 | 设为 `"true"` 时，同时为该小组记录出勤 |

B1App 的 `src/components/checkin/GuestRegister.tsx` 通过匿名的 `GET /membership/people/guest-register/options?churchId=` 获取检查清单，并仅渲染已包含的字段（主要联系人的电子邮件、电话、婚姻状况和地址；每位成员的出生日期、性别和年级；以及一个备注框），并且只提交这些字段。服务器在 `PersonHelper.registerGuestHousehold()` 运行之前，通过 `GuestRegistrationHelper.sanitize()` 再次应用检查清单——关闭的字段会被丢弃，缺少必填项或取值不在列表中的情况返回 400。之后，它会对每位带有电子邮件或电话的成员调用 `PersonRepo.findGuestMatch()`：恰好一名未删除的人员具有相同的名字，并且电子邮件或电话数字相同，则复用该人员（零个或多个匹配则创建新人员，因此系统从不猜测）。没有任何联系方式的成员会在已匹配的家庭内按名字匹配。被复用的人员永远不会被编辑，因此匿名表单无法覆盖已存储的信息；响应会回显提交的姓名。未匹配的成员会加入已匹配的家庭或新建的家庭，会籍状态为 `membershipStatus: "Visitor"`，并为每位新人员触发 `person.created`。之后，失败会被记录日志，而不会返回给客户端：成员会被加入已配置的小组（`group.member.added`）；如果开启了出勤记录，`AttendanceModuleGateway.recordAttendance()` 会为该小组每个已排期且当前签到窗口（`CheckinGateHelper.isServiceTimeOpen`）已开放的礼拜时间，将每位成员标记为出席，并在需要时按教会当地日期创建当天的场次——未排期的礼拜时间以及窗口之外的登记不会记录任何内容；备注则会作为隐藏的人员备注讨论串附加到户主上（留言作者为"Guest sign-up"），并通过 `person.conversationId` 关联。

## 相关页面

- [出勤端点](../api/endpoints/attendance) —— 校区、礼拜、场次、到访记录和到访场次的完整 REST 接口
- [会员端点](../api/endpoints/membership) —— 人员、家庭和小组
- [Webhooks](../api/webhooks) —— `session.created`、`attendance.recorded` 和 `attendance.checkout` 事件
- [模块结构](../api/module-structure) —— 出勤模块在服务端的组织方式
