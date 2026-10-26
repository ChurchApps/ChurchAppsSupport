---
title: "签到"
---

# 签到

<div class="article-intro">

签到是一个系统，提供三个入口：用于有人值守和自助签到站的 B1Checkin 自助终端应用、B1App 会员门户中的自助签到，以及 B1Admin 中的管理端出勤功能。三者都写入核心 Api 中的同一个出勤模块，教室路由完全由群组驱动，系统中没有单独的“地点”或“房间”实体。在此之上还有一层儿童安全机制：每次到访的签到类型、服务端的容量与志愿者比例限制、自助终端端的年龄/年级资格检查、签离时的可信接送人核验，以及通过教会短信服务商对家长进行呼叫。本页介绍数据模型、签到流程、安全机制以及标签打印流程。

</div>

## 概览

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| 入口 | 代码仓库 | 技术栈 | 角色 |
|------|----------|--------|------|
| 自助终端 | `B1Checkin` | Expo / React Native，expo-router 文件路由；为 Android、Amazon Fire 和 iOS 进行 EAS 构建；通过 `expo-updates` 进行 OTA 更新 | 有人值守或自助的签到站，支持标签打印和已验证的签离 |
| 自助签到 | `B1App` | Next.js（b1.church 会员门户） | 已登录的会员使用手机为自己的家庭办理签到；不支持打印 |
| 管理端 | `B1Admin` | React SPA | 配置服务结构、将群组分配到服务时段、设计标签、记录手动出勤、生成报表 |

三者都通过 `ApiHelper` 调用相同的两个 API 模块：**MembershipApi**（`/membership`）负责人员、家庭和群组；**AttendanceApi**（`/attendance`）负责下文所述的所有出勤相关功能。

## 数据模型（`Api/src/modules/attendance`）

| 实体 / 数据表 | 关键字段 | 含义 |
|----------------|-----------|---------|
| `campuses` | name, address | 此处已弃用——校区以会员模块为主数据（`/membership/campuses`）；出勤模块中的副本已冻结为只读，仅供旧版读取方使用（`models/Campus.ts`） |
| `services` | campusId, name | 一种定期举行的聚会，例如“周日早间”（`models/Service.ts`） |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | 服务中的一个时间段，例如“9:00 AM”（`models/ServiceTime.ts`）。排期相关字段为可选（迁移文件 `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`），并用于决定[签到时间窗口](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | 关联表：哪些群组（教室）在哪些服务时段聚会（`models/GroupServiceTime.ts`） |
| `sessions` | groupId, serviceTimeId, sessionDate | 某个群组在某一天的一次聚会——在签到时惰性创建（`models/Session.ts`） |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 某人在某一天的一次出席（`models/Visit.ts`）。`checkinType` 取值为 `member` / `guest` / `volunteer`（NULL 表示旧版会员），由自助终端设置，并由容量/比例检查使用 |
| `visitSessions` | visitId, sessionId | 一次到访涵盖的场次——例如一名儿童签到了两个服务时段，则会生成两行记录（`models/VisitSession.ts`） |
| `labelTemplates` | name, labelType（`nametag`/`pickup`）, width, height, isDefault, content（JSON 块） | 可设计的标签版式（`models/LabelTemplate.ts`） |

### 完成签到后如何保存

`VisitController.postCheckin`（`Api/src/modules/attendance/controllers/VisitController.ts`）处理 `POST /attendance/visits/checkin?serviceId=&peopleIds=`。请求体是一个 `Visit` 对象数组，每个对象携带 `visitSessions`，其中嵌入的 `session` 仅指定一个 `(serviceTimeId, groupId)` 组合。服务端随后执行以下步骤：

1. **在任何写入之前检查容量和比例。** `evaluateGates()` → `CheckinGateHelper.evaluate()` 会根据当前人数，检查每个目标房间的容量、访客容量、关闭标志以及志愿者比例。postCheckin **不是事务性的**，因此检查必须在第一次保存之前进行——一旦出现严重违规，将返回 409，并指明相关房间，且不会保存任何数据。参见[容量与志愿者比例检查](#capacity-and-volunteer-ratio-gates)。
2. **惰性解析场次。** `getSessionId()` 会查找或创建 `(groupId, serviceTimeId, today)` 对应的 `sessions` 记录——场次 ID 按日期缓存在进程内。新场次会触发 `session.created` webhook。该循环是一个被 await 的 `for..of`——早期版本使用“即发即弃”的 `forEach(async …)`，与保存操作产生竞争，导致在首次创建场次时写入了 NULL 的 sessionId（已修复；循环处的代码注释中有说明）。
3. **替换当天的记录。** 这些人员在该服务当天已有的所有到访记录（连同其 visitSessions）都会被删除，然后保存提交的数据集。因此，为一个家庭重新签到是一种幂等的“当前状态”操作，而不是追加操作。若传入 `?checkDuplicates=true`，则不写入数据，而是返回 `{ duplicates: [personId…] }`——自助终端正是借此在覆盖数据前发出警告。
4. **每批次生成一个安全码。** `SecurityCodeHelper.generate()` 从字符集 `23456789BCDFGHJKLMNPQRSTVWXYZ` 中生成一个 4 位码（不含元音字母和易混淆字符，因此码不会拼成单词，也不易误读）。服务端会针对同一教会当天未签离的到访记录进行冲突重试，并将该码写入批次中的每条到访记录。
5. **返回 `{ streaks, securityCode }`。** `streaks` 将 personId 映射到连续出席周数；自助终端会在里程碑（每第 5 周）时用彩纸庆祝。

每条保存的到访记录还会触发一个 `attendance.recorded` webhook。读取端 `GET /attendance/visits/checkin` 会从人员的**最后签到日期**返回其到访记录——如果该日期是前一周，则会去除 id，因此客户端收到的是上周房间选择的预填副本，保存时将作为新记录存入。

### 签离

有两个端点完成整个流程（`VisitController`）：

- `GET /attendance/visits/code/:code` ——返回携带该安全码、当天尚未签离的到访记录，并填充了场次信息。
- `POST /attendance/visits/checkout` ——请求体为 `{ visitIds, checkedOutBy?, checkedOutById? }`；写入 `checkoutTime` 以及接送人信息，并为每条到访记录触发一次 `attendance.checkout` webhook。

权限：自助终端使用 `attendance.checkin` 进行身份验证，该权限仅授予签到/签离/标签模板相关的操作；`attendance.view`/`attendance.edit` 用于报表和手动录入；结构配置（服务、服务时段、群组分配）需要 `services.edit`。会员自助签到（B1App）不需要任何权限：任何在教会中关联了人员的已认证用户都可以调用 `GET`/`POST /attendance/visits/checkin`，服务端会将提交的 `personId` 限制在调用者自己的家庭范围内（否则返回 403）——正是这一限制使其他家庭的 `securityCode` 无法被读取。会员身份即授权；成员是否能看到该功能，则由教会的 B1App 导航标签页控制。其他签到端点（`code/:code`、`checkout`、`guardians`、`CheckinController`）仍仅限自助终端/员工使用。

## 群组驱动房间路由

系统中没有任何房间或教室实体。“房间”即一个启用了 `trackAttendance` 的会员**群组**，并通过 `groupServiceTimes` 关联到一个或多个服务时段。下列群组字段（位于 `Api/src/modules/membership/models/Group.ts`）影响自助终端的行为：

| 字段 | 作用 |
|------|----------|
| `trackAttendance` | 群组是否参与出勤统计；B1Admin 的设置树会将未在 `groupServiceTimes` 中有记录的 `trackAttendance` 群组标记为未分配 |
| `parentPickup` | 标记为儿童房间：在此房间签到会使该到访记录成为“儿童”到访，并打印家庭接送标签，同时将安全码印在姓名牌上 |
| `printNametag` | 在此群组签到时是否打印姓名牌 |
| `capacity` / `guestCapacity` / `checkinClosed` | 房间容量上限以及一个强制“关闭”开关，由签到检查在服务端强制执行（在 B1Admin 群组设置的“签到容量”下编辑） |
| `volunteerRatio` / `minVolunteers` | 每位志愿者对应的儿童人数比例，以及最少志愿者人数，按教会全局的 `ratioEnforcement` 设置执行 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 年龄/年级资格范围，由自助终端判断，用于高亮或淡化房间 |

各客户端对数据的处理方式相同（例如 `B1Checkin/app/services.tsx`、`B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`）：并行加载 `GET /attendance/servicetimes?serviceId=`、`GET /attendance/groupservicetimes` 和 `GET /membership/groups`，然后针对每个服务时段，将 `groupServiceTimes` 记录指向它的群组收集到 `serviceTime.groups` 中。该数组即房间选择器所显示的内容，并按群组的 `categoryName` 分类组织。

分配关系可在 B1Admin 的群组页面中编辑（`B1Admin/src/groups/components/ServiceTimesEdit.tsx` —— `POST`/`DELETE /attendance/groupservicetimes`），整个“校区 → 服务 → 服务时段 → 群组”树则通过 `GET /attendance/attendancerecords/tree` 在 `B1Admin/src/attendance/components/AttendanceSetup.tsx` 中可视化展示。

:::info
由于群组是唯一的数据来源，同一套群组成员关系同时支持自助终端路由、B1Admin 群组页面中的名册式出勤记录以及出勤报表——将群组分配到服务时段，是使其成为签到目的地所需的唯一步骤。
:::

## 儿童安全

### 签到类型

每条到访记录都带有 `checkinType`——`member`、`guest` 或 `volunteer`（NULL 表示旧版/会员；迁移文件 `tools/migrations/attendance/2026-07-03_checkin_type.ts`）。该类型由**自助终端端**选择：在展开的会员行上的会员 / 访客 / 志愿者标签（`B1Checkin/src/components/MemberServiceTimes.tsx`），并在完成签到时（`app/checkinComplete.tsx`，默认为 `member`）盖在每条待处理的到访记录上。服务端在检查中使用该类型——志愿者计入比例覆盖，而不占用容量；访客则计入 `guestCapacity`。

### 容量与志愿者比例检查

`CheckinGateHelper.evaluate()`（`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`）在 `postCheckin` 中、任何保存之前运行（该端点不是事务性的，因此“先检查后保存”就是保证正确性的机制）。它会按目标群组加载当前人数（`VisitRepo.countActiveByGroupToday`），并通过会员模块网关加载群组配置，然后对违规情况进行分类：

- **严重（始终阻止）：** `checkinClosed`、`current + incoming > capacity`、访客人数超过 `guestCapacity`。整个批次会被拒绝，返回 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`——自助终端会显示相关房间。
- **比例（警告或阻止）：** 即将进入某房间的非志愿者人员，若该房间 `volunteers < minVolunteers`、完全没有志愿者，或 `children > volunteers × volunteerRatio`。严重程度由每个教会的 `ratioEnforcement` 设置决定（默认为 `"warn"`，也可设为 `"block"`，在 B1Admin 的 Manage Church → Check-In 中编辑，`CheckinSettingsEdit.tsx`）。在警告模式下，除非客户端以 `acknowledgeWarnings=true` 重新提交，否则返回 `409 { warning: true, error: "ratio", … }`——这次重新提交即自助终端的员工确认覆盖。

### 定时签到窗口

服务时段可以带有一个可选的每周排期（`dayOfWeek` 为 0–6，其中 0 表示周日；`startTime`/`endTime` 为 `HH:mm` 格式；`checkinOpenMinutes`、`checkinCloseMinutes`），可在 B1Admin 的**出勤 → 设置**服务时段表单中编辑（`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`，“签到排期”）。`CheckinGateHelper.hasSchedule()` 仅在 `dayOfWeek` 和 `startTime` 均已设置时才将服务时段视为有排期；未排期的时段从不受时间限制。`isServiceTimeOpen()` 以本地挂钟时间（`DateHelper.toChurchTime`）计算窗口。时区由 `CheckinTimeZoneHelper.load()`（`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`）为每个服务时段解析：优先使用服务所属校区（`service.campusId`，通过 `MembershipModuleGateway.loadCampusTimeZones`）的 `timezone`；其次是教会的 `timeZone`（在 B1Admin 的 Church Information 中设置）；再次是第一个设置了 `timezone` 且未被移除的校区（`loadCampusTimeZone`）；最后才是 `America/New_York`。之所以校区优先，是因为大多数教会的教会时区都被回填为 `America/New_York`。下文的列出和提交路径都以相同方式解析时区。窗口从开始时间前 `checkinOpenMinutes` 分钟开始，到结束时间后 `checkinCloseMinutes` 分钟结束（若无结束时间，则以开始时间为基准），并能处理跨午夜或跨周边界的时间窗口。

该窗口在两处强制执行：

- **列出：** `GET /attendance/servicetimes` 会为每一行附加一个计算得出的 `checkinOpen` 布尔值。B1App 的自助签到（`CheckinPage.tsx`）和 B1Checkin 的服务选择器（`app/services.tsx`）会保留所有时段。当某服务的所有时段都已关闭时，它们会显示最近的开放时间（B1App 中为“Check-in opens Sun 9:30 AM.”，B1Checkin 中为“Check-in for this service opens Sun 9:30 AM.”，由 `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel` 生成）；若无法计算出开放时间，则回退为“Check-in isn't open for this service right now.”（自助终端提供返回按钮以选择其他服务）。否则，已关闭的时段将显示为不可选的“Closed”/“Closed · opens 9:30 AM”行。B1Checkin 的家庭界面（`MemberServiceTimes.tsx`）会使用 `ServiceTimeHelper.isCheckinOpen()`，依据设备时钟（设备时区，而非教会时区）实时重新评估开放状态，因此长时间运行的自助终端能准时开启和关闭；对于该人员已签到的已关闭时段，则显示“Kids Room 1 · Checked in”（群组名称）。
- **提交：** 在 `evaluateGates()` 中，在容量/比例评估之前，`findClosedServiceTimeGroups()` 若发现任何目标场次的服务时段超出其窗口，会以 `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` 拒绝整个批次。由于家庭当天已有的到访记录会随每次签到重新提交，人员已持有的场次（现有到访记录中的 `personId|sessionId`）会跳过此检查，因此添加一个较晚的开放服务时段，不会因为较早的窗口已关闭而被拒绝。B1Checkin 通过其严重检查页面显示此结果，原因为“check-in isn't open right now”（容量违规仍显示“room is full or closed”）。

### 年龄/年级资格（自助终端端）

房间资格仅是建议性的界面提示，在自助终端上评估，服务端并不强制执行。`B1Checkin/src/helpers/EligibilityHelper.ts` 会将人员的出生日期/年级与群组的 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` 进行比较（年级顺序：PreK、K、1–12、Graduated），并返回 `eligible` / `ineligible` / `unknown`——缺失数据会得到 `unknown`，且绝不会隐藏房间。年龄和年级以教会的**升级日期**（`gradePromotionDate` 设置，格式为 `"MM-DD"`，在 `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` 中编辑）计算；自助终端从 `GET /attendance/checkin/settings` 获取该设置，`resolveAsOfDate` 会选取今天或之前最近的一次出现日期。房间选择器会高亮显示符合条件的房间，并淡化不符合条件的房间；选择一个被淡化的房间需要员工确认。

### 可信接送与未授权接送

接送人是按家庭划分的会员实体：`householdPickupPeople`（`Api/src/modules/membership/models/HouseholdPickupPerson.ts` —— householdId、可选的 personId、name、photoUrl、relationship、`status`（`trusted` / `notAuthorized`）、notes）。其增删改查操作包括 `GET /membership/householdpickup/:householdId`（任何已认证的教会用户均可访问，以便自助终端读取），以及由 `people.edit` 控制的 `POST` / `DELETE`。员工在人员页面的**接送**卡片中管理列表（`B1Admin/src/people/components/PickupPeople.tsx`）——包括照片、关系，以及“Trusted/Not Authorized”状态标签。

签离时（`B1Checkin/app/checkout.tsx`），自助终端会加载家庭的接送人列表：`trusted` 条目会以可点击的接送卡片形式呈现，并与家庭成人照片网格并列显示；自由输入的“Other”姓名会与 `notAuthorized` 条目进行模糊匹配（Levenshtein 算法，`src/helpers/PickupMatchHelper.ts`）——一旦匹配，签离将被阻止，并弹出警告面板，同时提供员工**覆盖**按钮。覆盖操作会记录在到访记录本身上：它会通过常规的 `POST /attendance/visits/checkout` 提交 `checkedOutBy` 为 `"OVERRIDE: {name}"`，因此它会进入出勤记录和 `attendance.checkout` webhook，而不是单独的审计表。

### 呼叫家长与紧急广播

`CheckinController`（`Api/src/modules/attendance/controllers/CheckinController.ts`，`/attendance/checkin`）提供两个短信端点：

- `POST /page` —— `{ visitId, message }`：呼叫某一位已签到儿童的监护人（自助终端签离界面，有人值守模式）。
- `POST /broadcast` —— `{ serviceId, message }`：向某服务中每个已签到家庭的成人发送短信（自助终端管理设置，位于 `B1Checkin/app/adminSettings.tsx` 中一个需输入 `EMERGENCY` 确认的面板之后）。

两者都通过会员网关解析家庭成人，然后将发送工作交给 **`MessagingModuleGateway.sendBulkText`**（`Api/src/shared/modules/MessagingModuleGateway.ts`）——这是通往教会已配置短信服务商的跨模块入口（`@churchapps/texting`：TextInChurch、Clearstream 或 MutualMinistry；系统中没有内置的短信发送器）。网关会记录一条 `sentText` 记录以及每个收件人的 `deliveryLog` 条目，并将每批次限制为最多 500 名收件人；若未配置服务商，则返回 `no_provider`，自助终端会将其显示为“No SMS provider configured”。控制器的 `dispatch()` 会去除重复的电话号码，并跳过没有手机号码或已设置 `optedOut` 的人员，返回 `{ sent, failed, skippedOptedOut, skippedNoPhone }`，以便自助终端显示被跳过的内容。

## 自助终端（B1Checkin）

各屏幕是 `B1Checkin/app/` 下的 expo-router 文件；跨屏幕的状态保存在一个静态 `CachedData` 类中（`src/helpers/CachedData.ts`），而非 React state。

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **查找**（`app/lookup.tsx`）—— 按电话号码（`GET /membership/people/search/phone?number=`，后四位或完整号码）或姓名（`GET /membership/people/search?term=`）搜索。选中匹配项后，会加载家庭（`GET /membership/people/household/{householdId}`）和已有到访记录（`GET /attendance/visits/checkin`），并以上周的选择预填 `pendingVisits`。
2. **家庭确认**（`app/household.tsx`、`src/components/MemberList.tsx`）—— 每个成员行显示已签到徽章、过敏/`nametagNotes` 徽章，以及其当前房间标签。展开某位成员会列出每个服务时段，并附带一个房间按钮，以及会员 / 访客 / 志愿者签到类型标签（`MemberServiceTimes.tsx`）。在每个服务时段名称下方，`ServiceTimeHelper.getGroupSummary()` 会显示该时段提供的群组（即 `serviceTime.groups` 的名称，去除首尾空格、不区分大小写去重，并以逗号连接）；若该时段没有群组，则不显示任何内容。
3. **群组分配**（`app/selectGroup.tsx`）—— 由 `serviceTime.groups` 构建的分类树，符合年龄/年级条件的房间会高亮显示，不符合条件的房间则被淡化，需员工确认后方可选择（参见[年龄/年级资格](#agegrade-eligibility-kiosk-side)）；选择房间会将 `{ session: { serviceTimeId, groupId } }` 形式的 visitSession 写入该人员的待处理到访记录（`src/helpers/VisitSessionHelper.ts`）。选择“None”则会清除该项。
4. **完成**（`app/checkinComplete.tsx`）—— 以 `pendingVisits` 调用 `POST /attendance/visits/checkin`（每条都盖上其 `checkinType`），若已配置打印机则打印标签，然后自动返回 lookup。若返回 `409` 的容量或 `notOpen` 响应，则会显示相关房间及原因（已满/已关闭，或签到未开放）；比例警告会提供员工确认，并以 `acknowledgeWarnings=true` 重新提交。

**签离**界面（`app/checkout.tsx`）通过自动聚焦的输入框接收 4 位安全码——因此 USB/蓝牙键盘模拟式条码扫描枪无需摄像头即可使用——也可以使用相同字符集的屏幕键盘，输入满 4 位时自动提交。**扫描**按钮会打开一个面板，其中包含共享的 `src/components/CodeScanner.tsx` 摄像头（默认使用后置摄像头，支持 QR、Code 128 和 Code 39），使没有扫描枪的站点也能读取接送标签；扫描到的码会进入与手动输入相同的 `handleCode()` 流程。系统会查询该码，显示待接走的儿童，并将家庭的**可信接送人**以可点击卡片的形式呈现，同时附带家庭成人的照片网格（另有一个“Other”自由文本选项，会与未授权姓名进行模糊检查——参见[可信与未授权接送](#trusted-and-not-authorized-pickup)），然后以所选接送人的姓名/ID 提交 `POST /attendance/visits/checkout`。在有人值守模式下，该界面还提供**呼叫家长**（`POST /attendance/checkin/page`）和**安全标签补打**功能——`reprint()` 会使用 `LabelHelper.getAllLabelsFor(...)` 重建家庭的标签，并通过与签到相同的 `PrintUI` 流程输出。

站点模式是一个 AsyncStorage 标志 `@StationMode`（`"self"` | `"manned"`，在 `app/adminSettings.tsx` 中切换）。有人值守模式会在查找界面增加签离入口，并允许在家庭界面中编辑每位成员的资料（`POST /membership/people`）。自助终端内置了安全加固：可选的 PIN 码（`app/setPin.tsx`、`src/components/PinEntryModal.tsx`）用于保护管理和打印机界面；管理界面只能通过在页眉标志上快速点击 7 次打开；空闲时的吸引屏幕（`src/hooks/useInactivityTimer.ts`）会在两个家庭之间接管显示。

## 自助签到（B1App）

会员通过 b1.church 门户的 `/mobile/checkin` 页面签到（由 `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` 路由到 `screens/CheckinPage.tsx`）。该页面需要已登录用户，并与自助终端走相同的四个步骤——服务 → 家庭 → 群组 → 完成——使用相同的端点，状态保存在 `B1App/src/helpers/CheckinHelper.ts` 中。与自助终端的区别在于：家庭来自已登录用户自己的 `householdId`（无需搜索步骤），并且不进行标签打印——完成页面会以二维码（`qrcode.react`）显示该批次的安全码，并附带“show this at a check-in station”的提示。若页面加载时家庭已签到，则“Show check-in code”按钮会根据第一条带有 `securityCode` 的已有到访记录（来自 `GET /attendance/visits/checkin`）重新显示二维码。签到会在提交时立即记录（不存在待处理状态）；二维码仅用于在自助终端上触发标签打印。

**手机到自助终端的标签打印**（`B1Checkin/app/scan.tsx`，从查找界面上的二维码“Scan code”按钮进入）：自助终端显示 `CodeScanner`（一个 `expo-camera` 的 `CameraView`，默认使用前置摄像头，可切换）以扫描二维码。`ScanCodeHelper.parse()` 仅接受纯 4 位、且属于安全码字符集的载荷，`ScanCodeHelper.isRepeat()` 会在 4 秒内忽略相同的码，因此 B1App 的二维码和打印标签上的二维码块都能正常工作。随后该界面沿用签离补打的流程——`GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`——并返回查找界面。扫描时不会发生任何出勤写入；仅打印标签。没有有效到访记录的安全码、没有打印机的站点以及没有标签的群组，都会显示一条提示并返回查找界面。

类型以及 `ApiHelper`/`ArrayHelper` 来自 `@churchapps/helpers` 和 `@churchapps/apphelper`；没有任何 React 组件与 B1Admin 共享。

## 管理端出勤（B1Admin）

- **设置** —— `/attendance`（`B1Admin/src/attendance/AttendancePage.tsx`）渲染结构树，并创建服务（`ServiceEdit.tsx`）和服务时段（`ServiceTimeEdit.tsx`）。校区数据通过 `useCampuses()` 钩子从会员模块获取。
- **手动出勤**位于群组板块，而非出勤板块：`B1Admin/src/groups/components/GroupSessionsTab.tsx` 创建场次（`POST /attendance/sessions`；添加时，`SessionEdit.tsx` 可以为共享所选服务时段的每个其他群组各包含一个场次，跳过在该日期已有场次的群组），并通过 `POST /attendance/visitsessions/log` 标记人员出席，该接口会为该人员和场次查找或创建到访记录。群组负责人无需 `attendance.edit` 权限即可为自己的群组记录出勤——控制器会检查 `au.leaderGroupIds`。
- **报表** —— 出勤趋势和群组出勤是服务端定义的报表（`B1Admin/src/components/reporting/ReportWithFilter.tsx`，对接 ReportingApi；定义位于 `Api/reports/*.json`）。两者均接受 `startDate`/`endDate`（结束日期包含在内）；趋势报表默认为一年前至今天，并额外增加按周划分的 `sessionDates` 列；群组出勤的屏幕树则包含每条到访记录的 `checkinTime` 以及该人员的 `membershipStatus`。群组出勤的 CSV 来自配套的 `groupAttendanceDownload` 报表，经 `GroupAttendanceDownloadHelper` 透视后，每位群组成员一行，每个带日期的场次一列（显示出席/缺席）；个人出勤历史则通过 `GET /attendance/attendancerecords?personId=` 获取（`B1Admin/src/people/components/PersonAttendance.tsx`）。

## 标签打印

### 模板与设计器

教会可以在 B1Admin 的 `/mobile/checkin/labels` 中设计自己的标签（`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`，从签到设置页面进入）。模板是一行 `labelTemplates` 记录，其 `content` 是一个由块组成的 JSON 数组——块类型为 `text`、`field`、`barcode`、`qrcode` 或 `box`——每个块以百分比坐标定位，并设置字体、对齐方式、符号体系（`code39`/`code128`/`qr`），以及可选的显示条件（例如仅当 `person.nametagNotes` 非空时才渲染过敏提示框）。存在两种 `labelType`：`nametag`（每位已签到人员一张；字段包括 `person.displayName`、`sessions`、`securityCode`，以及 `person.isBirthdayWeek`——当生日的月/日距今天在 3 天之内时为 `"true"`，并可跨年计算，由 `LabelHelper.isBirthdayWithin()` 计算得出）和 `pickup`（每个家庭一张；字段包括 `children`、`childrenAllergies`）。服务端会确保每个教会每种类型只有一个默认模板（`LabelTemplateController.save`）。设计器提供了与自助终端内置标签相对应的入门模板，并可使用示例数据进行预览。

### 自助终端上的渲染与打印

签到完成时，`B1Checkin/src/helpers/LabelHelper.ts` 会根据每条待处理到访记录上的群组标志决定打印内容：对 `printNametag` 群组打印姓名牌，若任一到访记录命中 `parentPickup` 群组，则额外打印一张家庭接送标签。`checkinType` 为 `volunteer` 的到访记录会被 `LabelHelper.selectChildVisits()` 跳过，因此在家长接送房间工作的志愿者不会触发接送标签。签到响应中的安全码会印在儿童姓名牌和接送标签上；成人姓名牌则不印码。若教会设有模板，则 `LabelRenderer`（`src/helpers/LabelRenderer.ts`）会将块与字段上下文转换为独立的 HTML 文档；否则将使用 `B1Checkin/assets/labels/` 中内置的 HTML 标签，并进行占位符替换。

条形码由 `B1Checkin/src/helpers/barcode.ts` 中纯 TypeScript 编码器以内联 SVG 形式生成——包括 Code 39 的图案表、Code 128（B 字符集，带 mod-103 校验和）的宽度表，以及通过 `qrcode` 包生成的 QR 码。**这些编码器在 B1Admin 中有意重复实现**（`LabelEditor.tsx` 内联了相同的表，代码注释中有说明），以使设计器预览与自助终端输出像素级一致；对其中一方的修改必须同步到另一方。

打印流程（`src/components/PrintUI.tsx`）在 `WebView` 中渲染每个 HTML 标签，通过 `react-native-view-shot` 将其截图为 JPG，并将图片 URI 交给原生的 **printer-helper** Expo 模块（`B1Checkin/modules/printer-helper/`）。该模块暴露 `scan()`、`checkInit()`、`printUris()` 以及状态事件，并在两个平台上为每个品牌提供一个 provider：

| 品牌 | Android | iOS | 说明 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`（Brother 打印 SDK） | `BrotherProvider.swift`（`BRLMPrinterKit.xcframework`） | QL 系列网络打印机（QL-800/810W/820NWB/1100/1110NWB…），模切 29×90 标签，推荐的默认选项 |
| Zebra | `ZebraProvider.kt`（Link-OS SDK） | `ZebraProvider.swift` + `ZebraBridge` | 网络发现 + TCP/ZPL 图像打印 |

打印机选择位于 `app/printers.tsx`（网络扫描返回 `brand~model~ip` 格式的条目；所选项会保存到 AsyncStorage）。`src/helpers/PrinterLog.ts` 保存了一份设备端诊断日志，并通过自助终端页眉中的实时状态指示点展示。

## 访客登记

有两种途径可在签到过程中创建人员：

- **在自助终端上** —— 家庭界面中的“Add guest”会打开 `B1Checkin/app/addGuest.tsx`，该页面首先通过 `GET /membership/people/search?term=` 搜索是否已有非会员的匹配记录，若没有，则通过 `POST /membership/people` 创建一条新记录，并关联到当前家庭。访客随后与普通会员一样进行群组分配。
- **通过二维码自助登记** —— 当教会设置 `enableQRGuestRegistration` 开启时（在 B1Admin 的签到设置中配置，从 `GET /membership/settings/public/{churchId}` 读取），自助终端的查找界面会显示一个二维码，链接到 `https://{subdomain}.b1.church/guest-register?serviceId=`。该 B1App 页面（`src/app/[sdSlug]/(public)/guest-register/page.tsx`）允许来访家庭通过匿名的 `POST /membership/people/guest-register` 端点，在自己的手机上完成登记，从而让自助终端的队伍保持流畅。二维码面板上还有一个**在此登记**按钮，它会在自助终端上以无痕、禁用缓存的 `WebView` 打开同一页面（`app/guestRegister.tsx`）；`src/helpers/GuestRegisterHelper.ts` 为二维码和 WebView 构建 URL，并阻止导航至 `https://{subdomain}.b1.church/guest-register` 之外的地址。点击**完成**、返回，或 120 秒无操作（表单输入会从 WebView 中转发为活动信号）后，屏幕会返回查找界面，并卸载 WebView，确保一个家庭的输入不会被带到下一个家庭。

二维码注册由 B1Admin 中**QR Guest Registration** 卡片保存的教会设置驱动（`src/mobile/CheckInPage.tsx`）：

| 设置 | 可见性 | 用途 |
|---|---|---|
| `enableQRGuestRegistration` | public | 自助终端二维码及匿名端点的启用开关 |
| `guestRegistrationFields` | public | JSON 映射，包含 `email`、`phone`、`address`、`birthDate`、`gender`、`maritalStatus`、`grade`、`comments` → `"off"` / `"optional"` / `"required"`。默认：电子邮件和电话为可选，其余关闭。姓名和名字始终为必填 |
| `guestRegistrationImage` | public | 页眉照片 URL；B1App 会在表单和确认页面中以 16:9 比例显示它，代替图标 |
| `guestRegistrationGroupId` | private | 每次注册都会加入的群组（访客永远看不到也无法选择它） |
| `guestRegistrationRecordAttendance` | private | 设为 `"true"` 时，还会为该群组记录出勤 |

B1App 的 `src/components/checkin/GuestRegister.tsx` 从匿名的 `GET /membership/people/guest-register/options?churchId=` 获取清单，并仅渲染所包含的字段（主要联系人的电子邮件、电话、婚姻状况和地址；每位成员的出生日期、性别和年级；一个备注框），且仅提交这些字段。服务端在 `GuestRegistrationHelper.sanitize()` 中重新应用清单——关闭的字段会被丢弃，缺失的必填项或超出列表的值则返回 400——然后 `PersonHelper.registerGuestHousehold()` 创建一个新家庭（不做电子邮件去重），每位成员的 `membershipStatus` 均设为 `"Visitor"`，并为每位成员触发 `person.created`。之后，失败会被记录而非返回：成员会被加入已配置的群组（`group.member.added`）；若开启了出勤记录，则 `AttendanceModuleGateway.recordAttendance()` 会为每位成员标记该群组每个已排期且当前签到窗口（`CheckinGateHelper.isServiceTimeOpen`）处于开放状态的服务时段为出席，并在需要时按教会本地日期创建当天的场次——未排期的服务时段以及窗口之外的登记不会记录任何内容；备注则会成为主要家庭成员上一个隐藏的人员备注对话（消息作者为“Guest sign-up”），并通过 `person.conversationId` 关联。

## 相关页面

- [Attendance Endpoints](../api/endpoints/attendance) -- 校区、服务、场次、到访记录和到访场次的完整 REST 接口
- [Membership Endpoints](../api/endpoints/membership) -- 人员、家庭和群组
- [Webhooks](../api/webhooks) -- `session.created`、`attendance.recorded` 和 `attendance.checkout` 事件
- [Module Structure](../api/module-structure) -- 出勤模块在服务端的组织方式
