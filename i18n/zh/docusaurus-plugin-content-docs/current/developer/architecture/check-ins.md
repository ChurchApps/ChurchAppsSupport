---
title: "签到"
---

# 签到

<div class="article-intro">

签到是一个系统，拥有三个入口：用于有人值守和自助签到站点的 B1Checkin 自助终端应用、B1App 会员门户内的自助签到，以及 B1Admin 中的管理端考勤。三者都写入核心 Api 中的同一个考勤模块，教室路由完全由小组驱动 -- 系统中没有单独的"地点"或"房间"实体。在此之上还有一层儿童安全机制：每次到访的签到类型、服务端的容量和志愿者比例门禁、终端端的年龄/年级资格校验、离场时的可信接送人验证，以及通过教会短信服务商进行的家长呼叫。本页介绍数据模型、签到流程、安全机制以及标签打印流程。

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

| 终端 | 代码仓库 | 技术栈 | 职责 |
|---------|----------|-------|------|
| 自助终端 | `B1Checkin` | Expo / React Native，使用 expo-router 文件路由；为 Android、Amazon Fire 和 iOS 进行 EAS 构建；通过 `expo-updates` 进行 OTA 更新 | 有人值守或自助的签到站点，支持标签打印和已验证的离场 |
| 自助签到 | `B1App` | Next.js（b1.church 会员门户） | 已登录的会员通过手机为自己的家庭办理签到；不支持打印 |
| 管理端 | `B1Admin` | React SPA | 配置服务结构，将小组分配到服务时间，设计标签，记录人工考勤，生成报表 |

这三者都通过 `ApiHelper` 调用相同的两个 API 模块：**MembershipApi**（`/membership`）用于人员、家庭和小组；**AttendanceApi**（`/attendance`）用于以下所有内容。

## 数据模型（`Api/src/modules/attendance`）

| 实体 / 数据表 | 关键字段 | 含义 |
|----------------|-----------|---------|
| `campuses` | name, address | 此处已弃用 -- 校区主数据位于会员模块（`/membership/campuses`）；考勤模块中的副本已冻结为只读，仅供旧版读取方使用（`models/Campus.ts`） |
| `services` | campusId, name | 定期举行的聚会，例如"主日早上"（`models/Service.ts`） |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | 服务中的一个时间段，例如"9:00 AM"（`models/ServiceTime.ts`）。排程相关列为可选（迁移文件 `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`），并决定[签到时间窗口](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | 连接表：哪些小组（教室）在哪些服务时间聚会（`models/GroupServiceTime.ts`） |
| `sessions` | groupId, serviceTimeId, sessionDate | 某个小组在某一日期的一次聚会 -- 在签到时惰性创建（`models/Session.ts`） |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 某人在某一日期的一次到访（`models/Visit.ts`）。`checkinType` 为 `member` / `guest` / `volunteer`（NULL 表示旧版会员），由自助终端设置，并由容量/比例门禁使用 |
| `visitSessions` | visitId, sessionId | 某次到访涵盖的聚会 -- 例如，一名儿童签到了两个服务时间，则会生成两行记录（`models/VisitSession.ts`） |
| `labelTemplates` | name, labelType（`nametag`/`pickup`）, width, height, isDefault, content（JSON 块） | 可设计的标签版式（`models/LabelTemplate.ts`） |

### 完成的签到如何持久化

`VisitController.postCheckin`（`Api/src/modules/attendance/controllers/VisitController.ts`）处理 `POST /attendance/visits/checkin?serviceId=&peopleIds=`。请求体是一个 `Visit` 对象数组，每个对象都带有 `visitSessions`，其嵌入的 `session` 仅指定一个 `(serviceTimeId, groupId)` 组合。服务器随后会：

1. **在任何写入之前检查容量和比例。** `evaluateGates()` → `CheckinGateHelper.evaluate()` 会根据当前人数，检查每个目标房间的容量、访客容量、关闭标志和志愿者比例。postCheckin **不是事务性的**，因此门禁必须在第一次保存之前运行 -- 一旦出现严重违规，将返回 409 响应，并指明违规的房间，且不会保存任何内容。参见[容量和志愿者比例门禁](#capacity-and-volunteer-ratio-gates)。
2. **惰性解析聚会。** `getSessionId()` 会为 `(groupId, serviceTimeId, today)` 查找或创建 `sessions` 记录 -- 聚会 ID 按日期缓存在进程内。新建聚会会触发 `session.created` webhook。循环使用的是 await 的 `for..of` -- 早先使用的即发即忘 `forEach(async …)` 与保存操作产生竞争，导致在首次创建聚会时写入 NULL 的 sessionId（已修复；循环处有代码注释说明）。
3. **替换当天的记录。** 该服务当天这些人已有的所有到访记录，连同其 visitSessions 一并删除，然后保存提交的数据集。因此，为一个家庭重新签到是一种幂等的"当前状态"操作，而不是追加。若改传 `?checkDuplicates=true`，则返回 `{ duplicates: [personId…] }` 而不写入任何内容，这是自助终端在覆盖前发出警告的方式。
4. **每批生成一个安全码。** `SecurityCodeHelper.generate()` 从字符集 `23456789BCDFGHJKLMNPQRSTVWXYZ` 中生成一个 4 位代码（不含元音字母和易混淆字符，因此代码无法拼成单词，也不易被误读）。服务器会针对同一教会当天未签离的到访记录进行冲突重试，并将该代码标记到批次中的每条到访记录上。
5. **返回 `{ streaks, securityCode }`。** `streaks` 将 personId 映射到连续出席周数；自助终端会以彩纸庆祝里程碑（每 5 周）。

每条保存的到访记录还会触发一个 `attendance.recorded` webhook。读取端 `GET /attendance/visits/checkin` 会从人员的**上次记录日期**返回其到访记录 -- 如果该日期是上一周，则会去除 ID，因此客户端收到的是上周房间选择的预填充副本，保存时将作为新记录写入。

### 签离

有两个端点完成整个流程（`VisitController`）：

- `GET /attendance/visits/code/:code` -- 今天尚未签离、带有该安全码的到访记录，并填充了聚会信息。
- `POST /attendance/visits/checkout` -- 请求体为 `{ visitIds, checkedOutBy?, checkedOutById? }`；记录 `checkoutTime` 和接送人信息，并为每条到访记录触发一个 `attendance.checkout` webhook。

权限：自助终端使用 `attendance.checkin` 进行身份验证，该权限仅授予签到/签离/标签模板相关的操作；`attendance.view`/`attendance.edit` 涵盖报表和人工录入；结构设置（服务、服务时间、小组分配）则需要 `services.edit`。会员自助签到（B1App）无需任何权限：任何在该教会中关联了人员的已认证用户都可以调用 `GET`/`POST /attendance/visits/checkin`，服务器会将提交的 `personId` 限制在调用者自己的家庭范围内（否则返回 403）-- 正是这一限制使其他家庭的 `securityCode` 无法被读取。会员资格即授权；至于会员是否*能看到*该功能，则由教会的 B1App 导航标签页控制。其他签到端点（`code/:code`、`checkout`、`guardians`、`CheckinController`）仍仅限自助终端/工作人员使用。

## 小组驱动房间路由

系统中任何地方都没有房间或教室实体。"房间"就是一个启用了 `trackAttendance` 的会员**小组**，并通过 `groupServiceTimes` 关联到一个或多个服务时间。以下是决定自助终端行为的小组字段（位于 `Api/src/modules/membership/models/Group.ts`）：

| 字段 | 作用 |
|------|--------|
| `trackAttendance` | 小组是否参与考勤；B1Admin 的设置树会将没有 `groupServiceTimes` 记录的 `trackAttendance` 小组标记为未分配 |
| `parentPickup` | 标记为儿童房间：在此房间签到会使该到访记录成为"儿童"到访，并打印家长接送标签，同时将安全码印在名牌上 |
| `printNametag` | 在此小组签到时是否打印名牌 |
| `capacity` / `guestCapacity` / `checkinClosed` | 房间容量限制以及硬性"关闭"开关，由签到门禁在服务端强制执行（在 B1Admin 的小组设置中"签到容量"下编辑） |
| `volunteerRatio` / `minVolunteers` | 儿童与志愿者的比例以及最低志愿者人数，根据全教会的 `ratioEnforcement` 设置执行 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 年龄/年级资格范围，由自助终端评估，用于突出显示或淡化房间 |

每个客户端的非规范化方式都相同（例如 `B1Checkin/app/services.tsx`、`B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`）：并行加载 `GET /attendance/servicetimes?serviceId=`、`GET /attendance/groupservicetimes` 和 `GET /membership/groups`，然后对每个服务时间，将其 `groupServiceTimes` 记录指向它的小组收集到 `serviceTime.groups` 中。这个数组即房间选择器所显示的内容，并按小组的 `categoryName` 进行组织。

分配关系在 B1Admin 的小组页面中编辑（`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`），整个校区 → 服务 → 服务时间 → 小组的树形结构则通过 `GET /attendance/attendancerecords/tree` 在 `B1Admin/src/attendance/components/AttendanceSetup.tsx` 中可视化。

:::info
由于小组是唯一的数据来源，同一套小组成员关系同时驱动自助终端的路由、B1Admin 小组页面中的名册式考勤以及考勤报表 -- 将小组分配到服务时间是使其成为签到目的地的唯一必要步骤。
:::

## 儿童安全

### 签到类型

每条到访记录都带有 `checkinType` -- `member`、`guest` 或 `volunteer`（NULL 表示旧版/会员；迁移文件 `tools/migrations/attendance/2026-07-03_checkin_type.ts`）。该类型由**自助终端**选择：在展开的会员行中使用"会员 / 访客 / 志愿者"标签（`B1Checkin/src/components/MemberServiceTimes.tsx`），并在完成时标记到每条待处理的到访记录上（`app/checkinComplete.tsx`，默认为 `member`）。服务端在门禁中使用该类型 -- 志愿者计入比例覆盖而非容量，访客则计入 `guestCapacity`。

### 容量和志愿者比例门禁 {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()`（`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`）在 `postCheckin` 保存之前运行（该端点是非事务性的，因此"保存前门禁"是保证正确性的机制）。它会加载每个目标小组的当前人数（`VisitRepo.countActiveByGroupToday`）以及通过会员模块网关获取的小组配置，然后对违规情况进行分类：

- **严重（始终阻止）：** `checkinClosed`、`current + incoming > capacity`、访客人数超过 `guestCapacity`。整批记录将被拒绝，返回 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- 自助终端会显示违规的房间名称。
- **比例（警告或阻止）：** 进入某房间的非志愿者人数，在以下情况下触发：`volunteers < minVolunteers`、完全没有志愿者，或 `children > volunteers × volunteerRatio`。严重程度取决于教会级别的 `ratioEnforcement` 设置（默认为 `"warn"`，另可设为 `"block"`，在 B1Admin 的管理教会 → 签到中编辑，即 `CheckinSettingsEdit.tsx`）。警告模式下会返回 `409 { warning: true, error: "ratio", … }`，除非客户端带上 `acknowledgeWarnings=true` 重新提交 -- 这次重新提交即自助终端的工作人员确认覆盖。

### 定时签到窗口 {#scheduled-check-in-windows}

服务时间可以设置可选的每周排程（`dayOfWeek` 为 0–6，其中 0 表示周日；`startTime`/`endTime` 为 `HH:mm` 格式；以及 `checkinOpenMinutes`、`checkinCloseMinutes`），可在 B1Admin 的**考勤 → 设置**服务时间表单中编辑（`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`，"签到排程"）。只有当 `dayOfWeek` 和 `startTime` 都已设置时，`CheckinGateHelper.hasSchedule()` 才会将服务时间视为已排程；未排程的时间永远不会受时间限制。`isServiceTimeOpen()` 以教会当地时间（`DateHelper.toChurchTime`）计算窗口。时区取自教会的 `timeZone`；如果未设置，则回退到第一个未删除且带有 `timezone` 的校区（`MembershipModuleGateway.loadCampusTimeZone`），最后才使用 `America/New_York`。下面的列表和提交路径都以相同方式解析时区。窗口从开始前 `checkinOpenMinutes` 分钟，到结束后 `checkinCloseMinutes` 分钟为止（若无结束时间，则以开始时间为准），并可处理跨越午夜或跨周边界的窗口。

该窗口在两处强制执行：

- **列表：** `GET /attendance/servicetimes` 会为每一行附加一个计算出的 `checkinOpen` 布尔值。B1App 的自助签到（`CheckinPage.tsx`）和 B1Checkin 的服务选择器（`app/services.tsx`）都会过滤掉 `checkinOpen === false` 的时间；当某个服务有时间安排但都未开放时，显示"此服务当前不开放签到。"（终端会提供返回按钮，以便选择其他服务。）
- **提交：** 在 `evaluateGates()` 中，于容量/比例评估之前，如果任何目标聚会的服务时间不在其窗口内，`findClosedServiceTimeGroups()` 会以 `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` 拒绝整批记录。B1Checkin 会通过其硬性门禁屏幕显示该结果，原因为"当前不开放签到"（容量违规仍显示"房间已满或已关闭"）。

### 年龄/年级资格（终端端） {#agegrade-eligibility-kiosk-side}

房间资格仅作为建议性的界面提示，在自助终端上评估，并不由服务端强制执行。`B1Checkin/src/helpers/EligibilityHelper.ts` 将人员的出生日期/年级与小组的 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` 进行比较（年级顺序：PreK、K、1–12、Graduated），并返回 `eligible` / `ineligible` / `unknown`。数据缺失时返回 `unknown`，且绝不会隐藏房间。年龄和年级以教会的**升级日期**（`gradePromotionDate` 设置，格式为 `"MM-DD"`，在 `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` 中编辑）计算；自助终端从 `GET /attendance/checkin/settings` 获取该设置，`resolveAsOfDate` 会选取今天或之前最近的那个日期。房间选择器会突出显示符合条件的房间，并淡化不符合条件的房间；选择被淡化的房间需要工作人员确认。

### 可信接送人与未授权接送人 {#trusted-and-not-authorized-pickup}

接送人是按家庭划分的会员实体：`householdPickupPeople`（`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId、可选的 personId、name、photoUrl、relationship、`status` 为 `trusted` / `notAuthorized`、notes）。其增删改查通过 `GET /membership/householdpickup/:householdId`（任何已认证的教会用户均可访问，以便自助终端读取）以及由 `people.edit` 控制的 `POST` / `DELETE` 实现。工作人员在人员页面的**接送**卡片（`B1Admin/src/people/components/PickupPeople.tsx`）中管理该名单 -- 包括照片、关系，以及"可信 / 未授权"状态标签。

在离场时（`B1Checkin/app/checkout.tsx`），自助终端会加载该家庭的接送人名单：`trusted` 条目会以可点击的接送卡片显示，与家庭成人照片网格并列；而自由输入的"其他"姓名会与 `notAuthorized` 条目进行模糊匹配（Levenshtein 算法，`src/helpers/PickupMatchHelper.ts`）-- 一旦匹配，将阻止离场，并弹出警告页面，其中带有工作人员的**覆盖**按钮。覆盖操作会记录在到访记录本身上：它通过常规的 `POST /attendance/visits/checkout` 提交 `checkedOutBy` 值 `"OVERRIDE: {name}"`，因此会出现在考勤记录和 `attendance.checkout` webhook 中，而不是单独的审计表。

### 呼叫家长与紧急广播

`CheckinController`（`Api/src/modules/attendance/controllers/CheckinController.ts`，路径为 `/attendance/checkin`）提供两个短信端点：

- `POST /page` -- `{ visitId, message }`：呼叫一名已签到儿童的监护人（自助终端的签离屏幕，有人值守模式）。
- `POST /broadcast` -- `{ serviceId, message }`：向某次服务中每个已签到家庭的成人发送短信（自助终端管理设置中，需通过 `B1Checkin/app/adminSettings.tsx` 中要求输入 `EMERGENCY` 确认的弹窗）。

两者都通过会员网关解析家庭成人，然后将投递交给 **`MessagingModuleGateway.sendBulkText`**（`Api/src/shared/modules/MessagingModuleGateway.ts`）-- 这是通往教会已配置短信服务商的跨模块入口（`@churchapps/texting`：TextInChurch、Clearstream 或 MutualMinistry；系统中没有内置的短信发送器）。网关会记录一条 `sentText` 记录以及每个收件人的 `deliveryLog` 条目，并将每批次限制为 500 名收件人；若未配置服务商，则返回 `no_provider`，自助终端会将其显示为"未配置短信服务商"。控制器的 `dispatch()` 会去除重复的电话号码，并跳过没有手机号码或设置了 `optedOut` 的人员，返回 `{ sent, failed, skippedOptedOut, skippedNoPhone }`，以便自助终端显示被跳过的内容。

## 自助终端（B1Checkin）

各屏幕是位于 `B1Checkin/app/` 下的 expo-router 文件；跨屏幕的状态保存在静态的 `CachedData` 类中（`src/helpers/CachedData.ts`），而不是 React 状态中。

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **查找**（`app/lookup.tsx`）-- 通过电话号码（`GET /membership/people/search/phone?number=`，后四位或完整号码）或姓名（`GET /membership/people/search?term=`）搜索。选择一个匹配项后，会加载家庭信息（`GET /membership/people/household/{householdId}`）和已有的到访记录（`GET /attendance/visits/checkin`），并以上周的选择预填 `pendingVisits`。
2. **家庭审核**（`app/household.tsx`、`src/components/MemberList.tsx`）-- 每个成员行都会显示已签到标记、过敏/`nametagNotes` 标记以及当前的房间标签。展开某位成员后，会列出每个服务时间及其房间按钮，以及"会员 / 访客 / 志愿者"签到类型标签（`MemberServiceTimes.tsx`）。在每个服务时间名称下方，`ServiceTimeHelper.getGroupSummary()` 会显示该时间提供的小组（即 `serviceTime.groups` 的名称，去除首尾空格，忽略大小写去重，以逗号连接）；如果该时间没有小组，则不显示任何内容。
3. **小组分配**（`app/selectGroup.tsx`）-- 由 `serviceTime.groups` 构建的分类树，符合年龄/年级资格的房间会被突出显示，不符合的则被淡化，需要工作人员确认（参见[年龄/年级资格](#agegrade-eligibility-kiosk-side)）；选择房间会在该人员的待处理到访记录中写入一条 `{ session: { serviceTimeId, groupId } }` 的 visitSession（`src/helpers/VisitSessionHelper.ts`）。选择"无"则清除该项。
4. **完成**（`app/checkinComplete.tsx`）-- 以 `pendingVisits`（每条都标记了其 `checkinType`）调用 `POST /attendance/visits/checkin`，如果已配置打印机则打印标签，然后自动返回查找屏幕。若返回 `409` 容量或 `notOpen` 响应，将显示违规房间及原因（已满/已关闭，或签到未开放）；比例警告会提供工作人员确认选项，确认后以 `acknowledgeWarnings=true` 重新提交。

**签离**屏幕（`app/checkout.tsx`）通过自动聚焦的输入框接受 4 位安全码 -- 因此 USB/蓝牙键盘式条码扫描器无需摄像头即可使用 -- 或使用相同字符集的屏幕键盘，输入满 4 位时自动提交。**扫描**按钮会打开一个面板，其中使用共享的 `src/components/CodeScanner.tsx` 摄像头（默认为后置摄像头，支持 QR、Code 128 和 Code 39），使没有键盘式扫描器的站点也能读取接送标签；扫描到的代码会进入与手动输入相同的 `handleCode()` 路径。屏幕会查询该代码，显示待接走的儿童，并以可点击卡片的形式展示该家庭的**可信接送人**，与家庭成人照片网格并列（另有"其他"自由文本选项，会与未授权姓名进行模糊检查 -- 参见[可信接送人与未授权接送人](#trusted-and-not-authorized-pickup)），然后以选择者的姓名/ID 提交 `POST /attendance/visits/checkout`。在有人值守模式下，该屏幕还提供**呼叫家长**（`POST /attendance/checkin/page`）和**安全标签重新打印**功能 -- `reprint()` 使用 `LabelHelper.getAllLabelsFor(...)` 重建该家庭的标签，并将其交给与签到相同的 `PrintUI` 流程。

站点模式通过 AsyncStorage 标志 `@StationMode`（`"self"` 或 `"manned"`，在 `app/adminSettings.tsx` 中切换）设置。有人值守模式会在查找屏幕上增加签离入口，并在家庭屏幕上提供逐个成员的资料编辑（`POST /membership/people`）。自助终端内置了安全加固：可选的 PIN 码（`app/setPin.tsx`、`src/components/PinEntryModal.tsx`）用于保护管理和打印机屏幕；管理屏幕只能通过快速连续点击标题栏 Logo 7 次打开；在两户家庭之间，空闲的引导屏幕（`src/hooks/useInactivityTimer.ts`）会接管显示。

## 自助签到（B1App）

会员从 b1.church 门户的 `/mobile/checkin` 屏幕签到（由 `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` 路由至 `screens/CheckinPage.tsx`）。该功能要求用户已登录，并以相同的端点执行与自助终端相同的四个步骤 -- 服务 → 家庭 → 小组 → 完成 -- 状态保存在 `B1App/src/helpers/CheckinHelper.ts` 中。与自助终端的区别如下：家庭信息来自已登录用户自己的 `householdId`（无需搜索步骤），并且不支持标签打印 -- 取而代之的是，完成屏幕会以二维码（`qrcode.react`）显示该批次的安全码，并附带"请在签到站点出示此码"的提示。如果页面加载时该家庭已经签到，则"显示签到码"按钮会根据 `GET /attendance/visits/checkin` 返回的第一条带有 `securityCode` 的已有到访记录，重新显示二维码。签到在提交时立即记录（没有待处理状态）；二维码仅用于在自助终端上驱动标签打印。

**手机到自助终端的标签打印**（`B1Checkin/app/scan.tsx`，从查找屏幕上的二维码"扫描代码"按钮进入）：自助终端显示 `CodeScanner`（一个 `expo-camera` 的 `CameraView`，默认为前置摄像头，可切换）以扫描二维码。`ScanCodeHelper.parse()` 只接受符合安全码字符集的裸 4 位代码，`ScanCodeHelper.isRepeat()` 会在 4 秒内忽略同一代码，因此 B1App 的二维码和打印标签上的二维码区块都可以使用。随后屏幕会沿用签离的重新打印流程 -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- 并返回查找屏幕。扫描时不会写入任何考勤数据；仅打印标签。没有有效到访记录的代码、没有打印机的站点，以及没有标签的小组，都会显示一条提示并返回查找屏幕。

类型以及 `ApiHelper`/`ArrayHelper` 来自 `@churchapps/helpers` 和 `@churchapps/apphelper`；没有与 B1Admin 共享的 React 组件。

## 管理端考勤（B1Admin）

- **设置** -- `/attendance`（`B1Admin/src/attendance/AttendancePage.tsx`）渲染结构树，并支持创建服务（`ServiceEdit.tsx`）和服务时间（`ServiceTimeEdit.tsx`）。校区数据通过 `useCampuses()` 钩子从会员模块获取。
- **人工考勤**位于小组板块，而非考勤板块：`B1Admin/src/groups/components/GroupSessionsTab.tsx` 用于创建聚会（`POST /attendance/sessions`；添加时，`SessionEdit.tsx` 可以为与所选服务时间共享的其他每个小组各包含一次聚会，并跳过该日期已有聚会的小组），并通过 `POST /attendance/visitsessions/log` 标记人员出席，该接口会为该人员和聚会查找或创建到访记录。小组负责人无需 `attendance.edit` 权限即可为自己的小组记录考勤 -- 控制器会检查 `au.leaderGroupIds`。
- **报表** -- 考勤趋势和小组考勤是服务端定义的报表（`B1Admin/src/components/reporting/ReportWithFilter.tsx` 对接 ReportingApi；定义位于 `Api/reports/*.json`）。两者都接受 `startDate`/`endDate`（结束日期包含在内）；趋势报表默认为一年前至今天，并增加每周的 `sessionDates` 列；小组考勤的屏幕树包含每条到访记录的 `checkinTime` 以及该人员的 `membershipStatus`。小组考勤的 CSV 来自配套的 `groupAttendanceDownload` 报表，由 `GroupAttendanceDownloadHelper` 转换为每位小组成员一行、每个带日期的聚会一列（显示出席/缺席）；个人考勤历史则通过 `GET /attendance/attendancerecords?personId=` 获取（`B1Admin/src/people/components/PersonAttendance.tsx`）。

## 标签打印

### 模板与设计器

教会在 B1Admin 的 `/mobile/checkin/labels`（`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`，从签到设置页面进入）中设计自己的标签。模板即一条 `labelTemplates` 记录，其 `content` 是一个由块组成的 JSON 数组 -- `text`、`field`、`barcode`、`qrcode` 或 `box` -- 每个块都以百分比坐标定位，并设置字体、对齐方式、编码格式（`code39`/`code128`/`qr`）以及可选的显示条件（例如，仅当 `person.nametagNotes` 非空时才渲染过敏提示框）。存在两种 `labelType`：`nametag`（每位签到人员一张；字段包括 `person.displayName`、`sessions`、`securityCode`，以及 `person.isBirthdayWeek` -- 当生日的月/日在今天前后 3 天之内时为 `"true"`，跨年时同样适用，由 `LabelHelper.isBirthdayWithin()` 计算）和 `pickup`（每个家庭一张；字段包括 `children`、`childrenAllergies`）。服务端会为每个教会的每种类型强制只保留一个默认模板（`LabelTemplateController.save`）。设计器附带起始模板，与自助终端内置的标签相对应，并可使用示例数据预览。

### 自助终端上的渲染与打印

在签到完成时，`B1Checkin/src/helpers/LabelHelper.ts` 会根据每条待处理到访记录上的小组标记决定打印什么：`printNametag` 小组打印名牌，若有任何到访记录命中 `parentPickup` 小组，则额外打印一张家庭接送标签。`checkinType` 为 `volunteer` 的到访记录会被 `LabelHelper.selectChildVisits()` 跳过，因此在家长接送房间工作的托儿工作人员不会触发接送标签。签到响应中的安全码会印在儿童名牌和接送标签上；成人名牌则不印安全码。如果教会设置了模板，`LabelRenderer`（`src/helpers/LabelRenderer.ts`）会将区块和字段上下文转换为独立的 HTML 文档；否则使用 `B1Checkin/assets/labels/` 中内置的 HTML 标签，并进行占位符替换。

条码由纯 TypeScript 编码器在 `B1Checkin/src/helpers/barcode.ts` 中生成为内联 SVG -- 包括 Code 39 模式表和 Code 128（B 码集，带 mod-103 校验和）宽度表，以及通过 `qrcode` 包生成的二维码。**这些编码器在 B1Admin 中被有意重复实现**（`LabelEditor.tsx` 内联了相同的表格，并在代码注释中注明），以使设计器预览与自助终端的输出像素级一致；修改其中一处时必须同步修改另一处。

打印流程（`src/components/PrintUI.tsx`）在 `WebView` 中渲染每个 HTML 标签，通过 `react-native-view-shot` 将其截图为 JPG，然后把图片 URI 交给原生的 **printer-helper** Expo 模块（`B1Checkin/modules/printer-helper/`）。该模块提供 `scan()`、`checkInit()`、`printUris()` 和状态事件，并在两个平台上为每个品牌提供对应的服务提供者：

| 品牌 | Android | iOS | 说明 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`（Brother 打印 SDK） | `BrotherProvider.swift`（`BRLMPrinterKit.xcframework`） | QL 系列网络打印机（QL-800/810W/820NWB/1100/1110NWB 等），支持 29×90 模切标签，为推荐默认选项 |
| Zebra | `ZebraProvider.kt`（Link-OS SDK） | `ZebraProvider.swift` + `ZebraBridge` | 网络发现 + 通过 TCP 进行 ZPL 图像打印 |

打印机选择位于 `app/printers.tsx`（网络扫描返回 `brand~model~ip` 格式的条目；所选项会保存到 AsyncStorage）。`src/helpers/PrinterLog.ts` 会保留一份设备端诊断日志，并通过自助终端页眉中的实时状态指示点呈现。

## 访客登记

有两种方式可以在签到过程中创建人员：

- **在自助终端上** -- 家庭屏幕中的"添加访客"会打开 `B1Checkin/app/addGuest.tsx`，该页面首先通过 `GET /membership/people/search?term=` 搜索是否存在匹配的非会员人员，若没有则通过 `POST /membership/people` 创建一条记录，并关联到当前家庭。访客随后与普通会员一样进行小组分配。
- **通过二维码自助登记** -- 当教会设置 `enableQRGuestRegistration` 开启时（在 B1Admin 的签到设置中配置，并从 `GET /membership/settings/public/{churchId}` 读取），自助终端查找屏幕会显示一个二维码，指向 `https://{subdomain}.b1.church/guest-register?serviceId=`。该 B1App 页面（`src/app/[sdSlug]/(public)/guest-register/page.tsx`）允许来访的家庭通过匿名的 `POST /membership/people/guest-register` 端点在自己的手机上登记，从而保持自助终端前的队伍顺畅。二维码面板还带有一个**在此登记**按钮，它会在自助终端上（`app/guestRegister.tsx`）通过无痕模式、禁用缓存的 `WebView` 打开同一页面；`src/helpers/GuestRegisterHelper.ts` 为二维码和 WebView 构建网址，并阻止导航到 `https://{subdomain}.b1.church/guest-register` 之外的地址。点击**完成**、返回，或 120 秒无操作（表单输入会作为活动信号从 WebView 中转发）后，屏幕将返回查找界面，并卸载 WebView，确保一个家庭输入的内容不会传到下一个家庭。

## 相关页面

- [考勤接口](../api/endpoints/attendance) -- 校区、服务、聚会、到访记录和到访聚会关联的完整 REST 接口
- [会员接口](../api/endpoints/membership) -- 人员、家庭和小组
- [Webhook](../api/webhooks) -- `session.created`、`attendance.recorded` 和 `attendance.checkout` 事件
- [模块结构](../api/module-structure) -- 考勤模块在服务端的组织方式
