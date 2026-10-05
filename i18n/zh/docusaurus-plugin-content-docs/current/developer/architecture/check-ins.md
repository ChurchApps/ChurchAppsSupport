---
title: "签到"
---

# 签到

<div class="article-intro">

签到是一个系统，有三个前门：B1Checkin 亭应用（用于工作人员和自助服务站）、B1App 成员门户内的自助签到，以及 B1Admin 中的管理员端参与。这三个都写入核心 Api 中的相同参与模块，教室路由完全由小组驱动 -- 没有单独的"位置"或"房间"实体。儿童安全层位于最顶层：每次访问签到类型、服务器端容量和志愿者比率门、亭端年龄/年级资格、签出时的受信任接送验证，以及通过教会的短信提供商进行的家长寻呼。此页面映射数据模型、签到流程、安全层和标签打印管道。

</div>

## 概述

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

标签打印路径（仅限亭）：
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| 表面 | 仓库 | 栈 | 角色 |
|------|------|------|------|
| 亭 | `B1Checkin` | Expo / React Native，expo-router 文件路由；EAS 为 Android、Amazon Fire 和 iOS 构建；通过 `expo-updates` 的 OTA 更新 | 工作人员或自助服务站，带有标签打印和验证签出 |
| 自助签到 | `B1App` | Next.js（b1.church 成员门户） | 已登录成员从手机签到其家庭；无打印 |
| 管理员 | `B1Admin` | React SPA | 配置服务结构、将小组分配给服务时间、设计标签、记录手动参与、运行报告 |

这三个都通过 `ApiHelper` 调用相同的两个 API 模块：**MembershipApi**（`/membership`）用于人员、家庭和小组；**AttendanceApi**（`/attendance`）用于所有以下内容。

## 数据模型（`Api/src/modules/attendance`）

| 实体/表 | 关键字段 | 含义 |
|---------|--------|------|
| `campuses` | name，address | 这里已弃用 -- 校园在成员资格模块（`/membership/campuses`）中管理；参与副本为已冻结的只读（`models/Campus.ts`） |
| `services` | campusId，name | 定期集聚，例如"Sunday Morning"（`models/Service.ts`） |
| `serviceTimes` | serviceId，name | 服务内的时间段，例如"9:00 AM"（`models/ServiceTime.ts`） |
| `groupServiceTimes` | groupId，serviceTimeId | 联接表：哪些小组（教室）在哪些服务时间满足（`models/GroupServiceTime.ts`） |
| `sessions` | groupId，serviceTimeId，sessionDate | 一个小组在一个日期的一次会议 -- 在签到时懒创建（`models/Session.ts`） |
| `visits` | personId，serviceId，visitDate，checkinTime，securityCode，checkinType，checkedInById，checkoutTime，checkedOutBy，checkedOutById | 一个人在一个日期参与（`models/Visit.ts`）。`checkinType` 是 `member` / `guest` / `volunteer`（NULL = 旧成员），由亭设置并由容量/比率门使用 |
| `visitSessions` | visitId，sessionId | 访问覆盖的会话 -- 在两个服务时间签到的儿童获得两行（`models/VisitSession.ts`） |
| `labelTemplates` | name，labelType（`nametag`/`pickup`），width，height，isDefault，content (JSON blocks) | 可设计的标签布局（`models/LabelTemplate.ts`） |

### 完成的签到如何持久化

`VisitController.postCheckin`（`Api/src/modules/attendance/controllers/VisitController.ts`）处理 `POST /attendance/visits/checkin?serviceId=&peopleIds=`。正文是 `Visit` 对象的数组，每个对象都携带 `visitSessions`，其嵌入的 `session` 仅命名 `(serviceTimeId, groupId)` 对。服务器然后：

1. **在任何写入之前门控容量和比率。** `evaluateGates()` → `CheckinGateHelper.evaluate()` 检查每个目标房间的容量、访客容量、关闭标志和志愿者比率是否符合当前人数。postCheckin **不是事务性的**，所以门必须在第一次保存之前运行 -- 硬违规会返回 409 命名令人反感的房间，不会持久化任何内容。请参阅[容量和志愿者比率门](#capacity-and-volunteer-ratio-gates)。
2. **懒注册会话。** `getSessionId()` 查找或创建 `sessions` 行用于 `(groupId, serviceTimeId, today)` -- 会话 id 按日期在进程中缓存。新会话发出 `session.created` webhook。循环是等待的 `for..of` -- 早期的消防-忘记 `forEach(async …)` 赛了保存并在首次会话创建时写了 NULL sessionIds（已修复；在循环处的代码评论中注明）。
3. **替换当天的记录。** 当天那些人在该服务处的任何现有访问都被删除及其 visitSessions，然后保存提交的集合。重新签到家庭因此是幂等的"这是当前状态"操作，不是追加。传递 `?checkDuplicates=true` 而不返回 `{ duplicates: [personId…] }` 不写，这是亭如何在覆盖之前警告的。
4. **生成一个每批次安全代码。** `SecurityCodeHelper.generate()` 从字母表 `23456789BCDFGHJKLMNPQRSTVWXYZ` 生成 4 字符代码（无元音或不明确的字符，所以代码不能拼写单词或误读）。服务器在同一教会的同一天开放访问之间重试碰撞并在批次中的每次访问上标记代码。
5. **返回 `{ streaks, securityCode }`。** `streaks` 映射 personId 到连续周参与计数；亭用五彩纸屑庆祝里程碑（每 5 周）。

每个保存的访问也发出 `attendance.recorded` webhook。读取端 `GET /attendance/visits/checkin` 从其**上次记录日期**返回人员的访问 -- 如果那是前一周，则删除 id，所以客户端收到将保存为新记录的上周房间选择的预填充副本。

### 签出

两个端点完成循环（`VisitController`）：

- `GET /attendance/visits/code/:code` -- 今天的未签出访问携带该安全代码，带有会话填充。
- `POST /attendance/visits/checkout` -- 正文 `{ visitIds, checkedOutBy?, checkedOutById? }`；标记 `checkoutTime` 和谁接了，并为每次访问发出 `attendance.checkout` webhook。

权限：亭使用 `attendance.checkin` 认证，这完全授予签到/签出/标签模板表面；`attendance.view`/`attendance.edit` 涵盖报告和手动条目；结构（服务、服务时间、小组分配）需要 `services.edit`。成员自助签到（B1App）不需要任何权限：任何具有链接人员在教会中的认证用户可以调用 `GET`/`POST /attendance/visits/checkin`，服务器限制提交的 `personId` 为调用者自己的家庭（否则 403 -- 这个围栏是让其他家庭的 `securityCode` 无法读取）。成员资格是赠予；成员是否*看到*功能由教会的 B1App 导航选项卡控制。其他签到端点（`code/:code`、`checkout`、`guardians`、`CheckinController`）保持仅亭/员工。

## 小组驱动房间路由

系统中任何地方都没有房间或教室实体。"房间"是一个成员**小组**，启用了 `trackAttendance`，通过 `groupServiceTimes` 链接到一个或多个服务时间。影响亭行为的小组字段（在 `Api/src/modules/membership/models/Group.ts` 上）：

| 字段 | 效果 |
|------|------|
| `trackAttendance` | 小组在所有参与中参与；B1Admin 的设置树标记没有 `groupServiceTimes` 行的 `trackAttendance` 小组为未分配 |
| `parentPickup` | 标记儿童房间：签到它会使访问成为"儿童"访问，这会打印家族接送标签并将安全代码放在名牌上 |
| `printNametag` | 是否签到此小组打印名牌 |
| `capacity` / `guestCapacity` / `checkinClosed` | 房间容量限制和硬"关闭"开关，由签到门强制执行服务器端（在 B1Admin 的小组设置中的"签到容量"下编辑） |
| `volunteerRatio` / `minVolunteers` | 每个志愿者儿童比率和最少志愿者人数，根据教会范围的 `ratioEnforcement` 设置强制执行 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 年龄/年级资格界限在亭端评估以突出或暗淡房间 |

每个客户端以相同方式进行反范化（例如 `B1Checkin/app/services.tsx`、`B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`）：并行加载 `GET /attendance/servicetimes?serviceId=`、`GET /attendance/groupservicetimes` 和 `GET /membership/groups`，然后对于每个服务时间收集 `groupServiceTimes` 行指向它的小组到 `serviceTime.groups`。那个数组是房间选择器显示的，按小组 `categoryName` 组织。

分配从 B1Admin 中小组的页面编辑（`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`），整个校园 → 服务 → 服务时间 → 小组树在 `B1Admin/src/attendance/components/AttendanceSetup.tsx` 中通过 `GET /attendance/attendancerecords/tree` 可视化。

:::info
因为小组是单一事实来源，相同的小组成员资格为亭路由、B1Admin 小组页面中名册风格参与以及参与报告提供动力 -- 将小组分配给服务时间是进行签到目的地的唯一必需步骤。
:::

## 儿童安全

### 签到类型

每次访问都携带 `checkinType` -- `member`、`guest` 或 `volunteer`（NULL 意味着旧版/成员；迁移 `tools/migrations/attendance/2026-07-03_checkin_type.ts`）。类型由**亭端**选择：在扩展成员行上的成员/访客/志愿者芯片（`B1Checkin/src/components/MemberServiceTimes.tsx`），在完成时标记到每个待签到（`app/checkinComplete.tsx`，默认为 `member`）。服务器在门中使用它 -- 志愿者计向比率覆盖而不是针对容量，访客计向 `guestCapacity`。

### 容量和志愿者比率门

`CheckinGateHelper.evaluate()`（`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`）在 `postCheckin` 内部保存前运行（端点非事务性，所以门-保存-前是正确机制）。它加载每个目标小组的当前人数（`VisitRepo.countActiveByGroupToday`）和通过成员资格模块网关的小组配置，然后分类违规：

- **硬（总是阻止）：** `checkinClosed`、`current + incoming > capacity`、访客计数超过 `guestCapacity`。批次被拒绝为 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- 亭显示命名房间。
- **比率（警告或阻止）：** 传入非志愿者到一个房间，其中 `volunteers < minVolunteers`，没有志愿者或 `children > volunteers × volunteerRatio`。严重性遵循每教会设置 `ratioEnforcement`（`"warn"` 默认 / `"block"`，在 B1Admin Manage Church → 签到中编辑，`CheckinSettingsEdit.tsx`）。警告模式返回 `409 { warning: true, error: "ratio", … }` 除非客户端用 `acknowledgeWarnings=true` 重新提交 -- 那个重新提交是亭的工作人员确认覆盖。

### 年龄/年级资格（亭端）

房间资格是建议 UI，在亭上评估，不由服务器强制。`B1Checkin/src/helpers/EligibilityHelper.ts` 将一个人的出生日期/年级与小组的 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`（年级顺序：PreK、K、1-12、已毕业）进行比较，并返回 `eligible` / `ineligible` / `unknown` -- 缺失数据产生 `unknown` 并永远不隐藏房间。年龄和年级从教会的**年级晋升日期**（`gradePromotionDate` 设置，`"MM-DD"`，在 `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` 中编辑）计算；亭从 `GET /attendance/checkin/settings` 获取它，`resolveAsOfDate` 选择最近的本地或今天之前发生。房间选择器突出符合条件的房间并暗淡不符合条件的房间；选择暗淡的房间需要工作人员确认。

### 受信任和未授权接送

接送人员是成员资格实体，按家庭：`householdPickupPeople`（`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId、可选 personId、name、photoUrl、relationship、`status` `trusted` / `notAuthorized`、notes）。CRUD 是 `GET /membership/householdpickup/:householdId`（任何认证教会用户，所以亭可以读取它）加上 `POST` / `DELETE` 由 `people.edit` 门控。员工在人员页面的**接送**卡管理列表（`B1Admin/src/people/components/PickupPeople.tsx`）-- 照片、关系和受信任/未授权状态芯片。

在签出（`B1Checkin/app/checkout.tsx`）亭加载家庭的接送列表：`trusted` 条目在家庭成人照片网格旁边呈现为可点击接送卡，自由打字"其他"名称是模糊匹配（Levenshtein，`src/helpers/PickupMatchHelper.ts`）对 `notAuthorized` 条目 -- 匹配阻止签出带警告表和工作人员**覆盖**按钮。覆盖被记录在访问本身上：它通过正常 `POST /attendance/visits/checkout` 发布 `checkedOutBy` 作为 `"OVERRIDE: {name}"`，所以它落在参与记录和 `attendance.checkout` webhook 中，而不是单独的审计表。

### 家长寻呼和紧急广播

`CheckinController`（`Api/src/modules/attendance/controllers/CheckinController.ts`、`/attendance/checkin`）暴露两个 SMS 端点：

- `POST /page` -- `{ visitId, message }`：寻呼一个已签到儿童的监护人（亭签出屏幕，管理模式）。
- `POST /broadcast` -- `{ serviceId, message }`：为服务的每个已签到家庭的成人发短信（亭管理设置，在 B1Checkin/app/adminSettings.tsx 中的"请输入 EMERGENCY 确认"表后面）。

两者通过成员资格网关解决家庭成人，然后交付给**`MessagingModuleGateway.sendBulkText`**（`Api/src/shared/modules/MessagingModuleGateway.ts`）-- 跨模块门进入教会配置的短信提供商（`@churchapps/texting`：TextInChurch、Clearstream 或 MutualMinistry；没有内置 SMS 发送者）。网关记录 `sentText` 行加每个接收者 `deliveryLog` 条目并限制批次为 500 接收者；如果没有提供商配置，它返回 `no_provider`，亭将其显示为"未配置 SMS 提供商"。控制器的 `dispatch()` 去重电话号码并跳过没有手机或 `optedOut` 设置的人，返回 `{ sent, failed, skippedOptedOut, skippedNoPhone }` 所以亭可以显示跳过了什么。

## 亭（B1Checkin）

屏幕是 `B1Checkin/app/` 下的 expo-router 文件；跨屏幕状态位于静态 `CachedData` 类（`src/helpers/CachedData.ts`），而不是 React 状态。

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **查找**（`app/lookup.tsx`）-- 按电话搜索（`GET /membership/people/search/phone?number=`，最后 4 个或完整）或按名称（`GET /membership/people/search?term=`）。选择一个匹配加载家庭（`GET /membership/people/household/{householdId}`）和现有访问（`GET /attendance/visits/checkin`），用上周的选择播种 `pendingVisits`。
2. **家庭审查**（`app/household.tsx`、`src/components/MemberList.tsx`）-- 每个成员行显示一个已签到徽章、过敏/`nametagNotes` 徽章和他们的当前房间芯片。扩展一个成员列出每个服务时间，带有房间按钮加成员/访客/志愿者签到类型芯片（`MemberServiceTimes.tsx`）。在每个服务时间名称下，`ServiceTimeHelper.getGroupSummary()` 显示那里提供的小组（`serviceTime.groups` 名称、修剪、去重不区分大小写、逗号联接）；当时间没有小组时什么都不呈现。
3. **小组分配**（`app/selectGroup.tsx`）-- 从 `serviceTime.groups` 构建的类别树，年龄/年级符合条件的房间突出显示，不符合条件的房间暗淡在工作人员确认后面（请参阅[年龄/年级资格](#agegrade-eligibility-kiosk-side)）；选择房间将 `{ session: { serviceTimeId, groupId } }` visitSession 写入那个人的待签到（`src/helpers/VisitSessionHelper.ts`）。"无"清除它。
4. **完成**（`app/checkinComplete.tsx`）-- `POST /attendance/visits/checkin` 与 `pendingVisits`（每个标记其 `checkinType`），然后如果配置了打印机则打印标签并自动返回查找。`409` 容量响应显示命名满/关闭房间；比率警告提供工作人员确认，用 `acknowledgeWarnings=true` 重新提交。

**签出**屏幕（`app/checkout.tsx`）通过自动聚焦输入接受 4 字符安全代码 -- 所以 USB/蓝牙键盘楔形条形码扫描器无需相机也能工作 -- 或使用相同字母的屏幕键盘，在 4 字符处自动提交。**扫描**按钮打开一个带有共享 `src/components/CodeScanner.tsx` 相机（默认后置，接受 QR、Code 128 和 Code 39）的表，所以没有楔形扫描仪的站点可以读取接送标签；扫描代码进入相同 `handleCode()` 路径如打字输入。它查找代码，显示要接送的儿童，并呈现家庭的**受信任接送人员**作为可点击卡片及家庭成人照片网格旁边（加"其他"自由文本选项，模糊检查对未授权名称 -- 请参阅[受信任和未授权接送](#trusted-and-not-authorized-pickup)），然后邮政 `POST /attendance/visits/checkout` 带拾取者的名字/id。在管理模式下屏幕也提供**家长寻呼**（`POST /attendance/checkin/page`）和**安全标签重印** -- `reprint()` 用 `LabelHelper.getAllLabelsFor(...)` 重建家族标签并通过相同 `PrintUI` 管道如签到。

站点个性是 AsyncStorage 旗 `@StationMode`（`"self"` | `"manned"`，在 `app/adminSettings.tsx` 中切换）。管理模式在查找屏幕上添加签出入口和来自家庭屏幕的每成员档案编辑（`POST /membership/people`）。亭强化内置：可选 PIN（`app/setPin.tsx`、`src/components/PinEntryModal.tsx`）门管理和打印机屏幕，管理屏幕仅通过 7 次快速点击标题徽标打开，空闲吸引屏幕（`src/hooks/useInactivityTimer.ts`）在家族之间接管。

## 自助签到（B1App）

成员从 b1.church 门户的 `/mobile/checkin` 屏幕签到（由 `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` 路由到 `screens/CheckinPage.tsx`）。它需要登录用户并遍历与亭相同的四个步骤 -- 服务 → 家庭 → 小组 → 完成 -- 对相同端点，使用 `B1App/src/helpers/CheckinHelper.ts` 中的状态。亭的差异：家庭来自登录用户自己的 `householdId`（无搜索步骤），没有标签打印 -- 而是完成屏幕通过 `qrcode.react` 显示批次的安全代码作为二维码，带"在签到站显示这个"提示。如果家庭在页面加载时已签到，"显示签到代码"按钮重新显示来自第一个现有访问的二维码（来自 `GET /attendance/visits/checkin`），这携带 `securityCode`。签到在提交时立即记录（没有待状态）；二维码仅在亭驱动标签打印。

**电话到亭标签打印**（`B1Checkin/app/scan.tsx`，从查找屏幕上的二维码"扫描代码"按钮到达）：亭显示 `CodeScanner`（`expo-camera` `CameraView`，前置，可翻转）扫描二维码。`ScanCodeHelper.parse()` 仅接受当它是安全代码字母表中的裸 4 字符代码时的有效载荷，`ScanCodeHelper.isRepeat()` 忽略相同代码 4 秒，所以 B1App 二维码和打印标签的二维码都有效。屏幕然后遵循签出重印路径 -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- 并返回查找。扫描时没有参与写发生；仅标签。没有活跃访问、没有打印机的站点和标签-较少小组的代码每个呈现烤面包并返回查找。

类型和 `ApiHelper`/`ArrayHelper` 来自 `@churchapps/helpers` 和 `@churchapps/apphelper`；没有 React 组件与 B1Admin 共享。

## 管理员端参与（B1Admin）

- **设置** -- `/attendance`（`B1Admin/src/attendance/AttendancePage.tsx`）呈现结构树并创建服务（`ServiceEdit.tsx`）和服务时间（`ServiceTimeEdit.tsx`）。校园数据通过 `useCampuses()` 挂钩来自成员资格。
- **手动参与**位于小组端，而不是参与部分：`B1Admin/src/groups/components/GroupSessionsTab.tsx` 创建会话（`POST /attendance/sessions`；添加时，`SessionEdit.tsx` 可以包括每个其他小组共享所选服务时间的一个会话，跳过已在该日期有会话的小组）并通过 `POST /attendance/visitsessions/log` 标记人员出席，这找到或创建该人员和会话的访问。小组领导者可以为其自己的小组记录参与，无需 `attendance.edit` 权限 -- 控制器检查 `au.leaderGroupIds`。
- **报告** -- 参与趋势和小组参与是服务器定义的报告（`B1Admin/src/components/reporting/ReportWithFilter.tsx` 对 ReportingApi；定义在 `Api/reports/*.json`）。两者都采用 `startDate`/`endDate`（包含结束日期）；趋势报告默认为一年前通过今天并添加每周 `sessionDates` 列，小组参与的屏幕树包括每次访问的 `checkinTime` 和人员的 `membershipStatus`。小组参与的 CSV 来自伴随 `groupAttendanceDownload` 报告，由 `GroupAttendanceDownloadHelper` 转向，每个小组成员一行，带每个日期会话的出席/缺席列；每人历史是 `GET /attendance/attendancerecords?personId=`（`B1Admin/src/people/components/PersonAttendance.tsx`）。

## 标签打印

### 模板和设计器

教会在 `/mobile/checkin/labels`（`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`，从签到设置页面到达）在 B1Admin 处设计自己的标签。模板是 `labelTemplates` 行，其 `content` 是 JSON 块数组 -- `text`、`field`、`barcode`、`qrcode` 或 `box` -- 每个位于百分比坐标中，带字体、对齐、符号学（`code39`/`code128`/`qr`）和可选可见性条件（例如，仅当 `person.nametagNotes` 非空时呈现过敏盒）。两个 `labelType` 存在：`nametag`（每个已签到人员一个；字段如 `person.displayName`、`sessions`、`securityCode` 和 `person.isBirthdayWeek` -- `"true"` 当生日的月/日在今天 3 天内，跨年末换行，由 `LabelHelper.isBirthdayWithin()` 计算）和 `pickup`（每个家族一个；字段如 `children`、`childrenAllergies`）。服务器强制每教会每类型单个默认（`LabelTemplateController.save`）。设计器配备反映亭捆绑标签的启动程序模板并针对样本数据预览。

### 在亭上呈现和打印

在签到完成时，`B1Checkin/src/helpers/LabelHelper.ts` 从每个待签到上的小组标志决定打印什么：`printNametag` 小组的名牌，加一个家族接送标签如果任何访问命中 `parentPickup` 小组。`checkinType` `volunteer` 的访问由 `LabelHelper.selectChildVisits()` 跳过，所以儿保工作者在父接送房间中永远不会触发接送标签。来自签到响应的安全代码放在儿童名牌和接送标签上；成人名牌没有代码打印。如果教会有模板，`LabelRenderer`（`src/helpers/LabelRenderer.ts`）将块 + 字段上下文变成独立 HTML 文档；否则 `B1Checkin/assets/labels/` 中的捆绑 HTML 标签用于占位符替换。

条形码由纯 TypeScript 编码器在 `B1Checkin/src/helpers/barcode.ts` 生成为内联 SVG -- Code 39 模式表和 Code 128（代码集 B with mod-103 校验和）宽度表，加上 QR 通过 `qrcode` 包。**这些编码器故意复制在 B1Admin 中**（`LabelEditor.tsx` 内联相同表，在代码评论中注明），所以设计器预览像素忠实于亭输出；一个改变必须镜像到另一个。

打印管道（`src/components/PrintUI.tsx`）在 `WebView` 中呈现每个 HTML 标签，通过 `react-native-view-shot` 捕获到 JPG，并交付图像 URI 给本机**printer-helper** Expo 模块（`B1Checkin/modules/printer-helper/`）。模块暴露 `scan()`、`checkInit()`、`printUris()` 和状态事件，每个品牌在两个平台上的提供商：

| 品牌 | Android | iOS | 笔记 |
|------|---------|-----|------|
| Brother | `BrotherProvider.kt`（Brother 打印 SDK） | `BrotherProvider.swift`（`BRLMPrinterKit.xcframework`） | QL 系列网络打印机（QL-800/810W/820NWB/1100/1110NWB…），模切 29×90 标签，推荐默认值 |
| Zebra | `ZebraProvider.kt`（Link-OS SDK） | `ZebraProvider.swift` + `ZebraBridge` | 网络发现 + TCP/ZPL 图像打印 |

打印机选择位于 `app/printers.tsx`（网络扫描返回 `brand~model~ip` 条目；选择持久化到 AsyncStorage），`src/helpers/PrinterLog.ts` 保留可从亭标题中的实时状态点显示的设备诊断日志。

## 访客注册

两条路径在签到中期创建人员：

- **在亭处** -- 家庭屏幕的"添加访客"打开 `B1Checkin/app/addGuest.tsx`，它首先搜索 `GET /membership/people/search?term=` 获取现有非成员匹配，否则创建一个带 `POST /membership/people`，附加到当前家庭。访客然后如任何成员一样流过小组分配。
- **自助通过二维码** -- 当教会设置 `enableQRGuestRegistration` 打开（在 B1Admin 的签到设置中配置，从 `GET /membership/settings/public/{churchId}` 读取）时，亭查找屏幕显示二维码链接到 `https://{subdomain}.b1.church/guest-register?serviceId=`。那个 B1App 页面（`src/app/[sdSlug]/(public)/guest-register/page.tsx`）让访问家族在他们自己的电话通过匿名 `POST /membership/people/guest-register` 端点在他们自己的电话注册自己，保持亭线移动。二维码表也有**在这里注册**按钮，在亭上打开相同页面（`app/guestRegister.tsx`）在无痕、缓存禁用 `WebView`；`src/helpers/GuestRegisterHelper.ts` 为二维码和 WebView 都构建 URL 并阻止导航关闭 `https://{subdomain}.b1.church/guest-register`。屏幕在**完成**、返回或 120 秒不活动（表单打字从 WebView 中继作为活动）时弹出回查找，卸载 WebView 所以一个家族的条目永不到达下一个。

## 相关页面

- [出勤端点](../api/endpoints/attendance) -- 校园、服务、会话、访问和访问会话的完整 REST 表面
- [成员资格端点](../api/endpoints/membership) -- 人员、家庭和小组
- [Webhooks](../api/webhooks) -- `session.created`、`attendance.recorded` 和 `attendance.checkout` 事件
- [模块结构](../api/module-structure) -- 参与模块如何在服务器端组织
