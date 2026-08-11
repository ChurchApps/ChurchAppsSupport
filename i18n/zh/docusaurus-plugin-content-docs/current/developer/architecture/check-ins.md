---
title: "签到"
---

# 签到

<div class="article-intro">

签到是一个系统，有三个前门：B1Checkin 亭应用用于有人值守和自助站，B1App 成员门户内的自助签到，以及 B1Admin 中的管理端出席。这三个都写入核心 Api 中的相同出席模块，教室路由完全由小组驱动 -- 没有单独的 "位置" 或 "房间" 实体。儿童安全层位于顶部：每次访问签到类型、服务器端容量和志愿者比率门、亭端年龄/年级资格、签出时的信任接送验证以及通过教会短信提供商的家长寻呼。本页映射数据模型、签到流程、安全层和标签打印管道。

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

| 表面 | 仓库 | 堆栈 | 角色 |
|---------|------|-------|------|
| 亭 | `B1Checkin` | Expo / React Native，expo-router 文件路由；用于 Android、Amazon Fire 和 iOS 的 EAS 构建；通过 `expo-updates` 的 OTA 更新 | 有人值守或自助站，带标签打印和验证签出 |
| 自助签到 | `B1App` | Next.js（b1.church 成员门户） | 已登录成员从手机签到他们的家庭；无打印 |
| 管理 | `B1Admin` | React SPA | 配置服务结构，将小组分配到服务时间，设计标签，记录手动出席，运行报告 |

这三个都通过 `ApiHelper` 调用相同的两个 API 模块：**MembershipApi**（`/membership`）用于人员、家庭和小组；**AttendanceApi**（`/attendance`）用于下面的所有内容。

## 数据模型（`Api/src/modules/attendance`）

| 实体 / 表 | 关键字段 | 含义 |
|----------------|-----------|---------|
| `campuses` | name, address | 在这里已弃用 -- 校园在成员模块（`/membership/campuses`）中掌控；出席副本对旧版读者冻结为只读（`models/Campus.ts`） |
| `services` | campusId, name | 定期聚集，例如 "Sunday Morning"（`models/Service.ts`） |
| `serviceTimes` | serviceId, name | 服务中的时间槽，例如 "9:00 AM"（`models/ServiceTime.ts`） |
| `groupServiceTimes` | groupId, serviceTimeId | 连接表：哪些小组（教室）在哪些服务时间开会（`models/GroupServiceTime.ts`） |
| `sessions` | groupId, serviceTimeId, sessionDate | 一个小组在一个日期的一次会议 -- 在签到时延迟创建（`models/Session.ts`） |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 一个人在一个日期的出席（`models/Visit.ts`）。`checkinType` 是 `member` / `guest` / `volunteer`（NULL = 旧版成员），由亭设置并由容量/比率门消耗 |
| `visitSessions` | visitId, sessionId | 访问覆盖的会话 -- 签到到两个服务时间的孩子获得两行（`models/VisitSession.ts`） |
| `labelTemplates` | name, labelType（`nametag`/`pickup`），width, height, isDefault, content (JSON blocks) | 可设计的标签布局（`models/LabelTemplate.ts`） |

### 已完成签到如何持久化

`VisitController.postCheckin`（`Api/src/modules/attendance/controllers/VisitController.ts`）处理 `POST /attendance/visits/checkin?serviceId=&peopleIds=`。正文是 `Visit` 对象的数组，每个都携带 `visitSessions`，其嵌入的 `session` 仅命名 `(serviceTimeId, groupId)` 对。服务器然后：

1. **在任何写入前限制容量和比率。** `evaluateGates()` → `CheckinGateHelper.evaluate()` 检查每个目标房间的容量、访客容量、关闭标志和志愿者比率对当前占用率。postCheckin **不是事务性的**，所以门必须在第一次保存前运行 -- 硬违规返回 409，命名得罪房间，不持久化任何东西。看[容量和志愿者比率门](#capacity-and-volunteer-ratio-gates)。
2. **延迟解析会话。** `getSessionId()` 查找或创建 `(groupId, serviceTimeId, today)` 的 `sessions` 行 -- 会话 id 在进程内每个日期缓存。新会话发出 `session.created` webhook。循环是等待的 `for..of` -- 较早的火后即忘的 `forEach(async …)` 在首次会话创建时竞争保存并写入 NULL sessionIds（已修复；在循环处的代码注释中记录）。
3. **替换日期的记录。** 这些人在那个服务上今天的任何现有访问都被删除及其 visitSessions，然后提交的集合被保存。重新签入家庭因此是幂等 "这是当前状态" 操作，不是附加。传递 `?checkDuplicates=true` 反而返回 `{ duplicates: [personId…] }`，无写入，这是亭如何在覆盖前警告的。
4. **每批生成一个安全代码。** `SecurityCodeHelper.generate()` 从字母表 `23456789BCDFGHJKLMNPQRSTVWXYZ`（无元音或模糊字符，所以代码不能拼单词或误读）生成 4 字符代码。服务器在对同一教会同一天开放访问的碰撞重试，并在批中的每个访问上标记代码。
5. **返回 `{ streaks, securityCode }`。** `streaks` 映射 personId 到连续周出席计数；亭庆祝里程碑（每 5 周）及彩纸。

每个保存的访问也发出 `attendance.recorded` webhook。读侧，`GET /attendance/visits/checkin`，从他们的**最后记录日期**返回人的访问 -- 如果那是前一周，id 被剥离，所以客户端接收上周房间选择的预填充副本，将保存为新记录。

### 签出

两个端点完成循环（`VisitController`）：

- `GET /attendance/visits/code/:code` -- 今天的尚未签出的访问，携带该安全代码，带会话填充。
- `POST /attendance/visits/checkout` -- 正文 `{ visitIds, checkedOutBy?, checkedOutById? }`；标记 `checkoutTime` 和谁接走，并为每个访问发出 `attendance.checkout` webhook。

权限：亭使用 `attendance.checkin` 认证，它恰好授予签到/签出/标签模板表面；`attendance.view`/`attendance.edit` 覆盖报告和手动入口；结构（服务、服务时间、小组分配）需要 `services.edit`。成员自助签到（B1App）不需要权限：任何具有链接到教会人员的经过认证的用户可以调用 `GET`/`POST /attendance/visits/checkin`，服务器将提交的 `personId` 限制到调用者自己的家庭（否则 403 -- 这个栅栏是保持其他家庭 `securityCode` 不可读的）。成员资格是授权；成员是否**看到**该功能由教会的 B1App 导航选项卡控制。其他签到端点（`code/:code`、`checkout`、`guardians`、`CheckinController`）保留仅亭/员工。

## 小组驱动房间路由

系统中任何地方都没有房间或教室实体。"房间" 是启用了 `trackAttendance` 的成员**小组**，通过 `groupServiceTimes` 链接到一个或多个服务时间。小组字段（在 `Api/src/modules/membership/models/Group.ts`）塑造亭行为：

| 字段 | 效果 |
|------|--------|
| `trackAttendance` | 小组参与任何地方的出席；B1Admin 的设置树标记没有 `groupServiceTimes` 行的 `trackAttendance` 小组为未分配 |
| `parentPickup` | 标记儿童房间：签到它使访问成为 "儿童" 访问，打印家族接走标签并将安全代码放在名牌上 |
| `printNametag` | 是否对这个小组的签到打印名牌 |
| `capacity` / `guestCapacity` / `checkinClosed` | 房间容量限制和硬 "关闭" 开关，由签到门通过检查强制的服务器端（在 B1Admin 的小组设置中编辑 "签到容量"） |
| `volunteerRatio` / `minVolunteers` | 儿童对志愿者比率和最少志愿者数，按教会范围 `ratioEnforcement` 设置执行 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 年龄/年级资格界限评估亭端以突出或减弱房间 |

每个客户端以相同方式非规范化（例如 `B1Checkin/app/services.tsx`、`B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`）：加载 `GET /attendance/servicetimes?serviceId=`、`GET /attendance/groupservicetimes` 和 `GET /membership/groups` 并行，然后对于每个服务时间收集其 `groupServiceTimes` 行指向它的小组进入 `serviceTime.groups`。该数组是房间选择器显示的，由小组 `categoryName` 组织。

分配从 B1Admin 中的小组页面编辑（`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`），整个校园 → 服务 → 服务时间 → 小组树在 `B1Admin/src/attendance/components/AttendanceSetup.tsx` 通过 `GET /attendance/attendancerecords/tree` 可视化。

:::info
因为小组是唯一真实来源，相同的小组成员资格为亭路由、B1Admin 小组页面的名册风格出席和出席报告提供动力 -- 将小组分配到服务时间是使其成为签到目标所需的唯一步骤。
:::

## 儿童安全

### 签到类型

每个访问携带 `checkinType` -- `member`、`guest` 或 `volunteer`（NULL 表示旧版/成员；迁移 `tools/migrations/attendance/2026-07-03_checkin_type.ts`）。类型在**亭端**被选择：展开成员行上的成员 / 访客 / 志愿者芯片（`B1Checkin/src/components/MemberServiceTimes.tsx`），标记在完成时对每个待定访问（`app/checkinComplete.tsx`，默认为 `member`）。服务器在门中消耗它 -- 志愿者计向比率覆盖而不是对容量，访客计对 `guestCapacity`。

### 容量和志愿者比率门

`CheckinGateHelper.evaluate()`（`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`）在 `postCheckin` 内部任何保存前运行（端点不是事务性的，所以保存前限制是正确性机制）。它通过成员模块网关加载当前每个目标小组占用率和小组配置，然后分类违规：

- **硬（总是阻止）：** `checkinClosed`、`current + incoming > capacity`、访客计数超过 `guestCapacity`。批被拒绝及 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- 亭显示命名房间。
- **比率（警告或阻止）：** 传入非志愿者进入房间其中 `volunteers < minVolunteers`、没有志愿者根本、或 `children > volunteers × volunteerRatio`。严重性跟随教会范围设置 `ratioEnforcement`（`"warn"` 默认 / `"block"`，在 B1Admin 管理教会 → 签到中编辑，`CheckinSettingsEdit.tsx`）。警告模式返回 `409 { warning: true, error: "ratio", … }`，除非客户端用 `acknowledgeWarnings=true` 重新提交 -- 那个重新提交是亭的员工确认覆盖。

### 年龄/年级资格（亭端）

房间资格是咨询 UI，在亭上评估，不由服务器强制。`B1Checkin/src/helpers/EligibilityHelper.ts` 比较人的出生日期/年级对小组的 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`（年级顺序：PreK、K、1–12、毕业）并返回 `eligible` / `ineligible` / `unknown` -- 缺失数据产生 `unknown` 并从不隐藏房间。年龄和年级作为教会的**年级晋升日期**计算（`gradePromotionDate` 设置，`"MM-DD"`，在 `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` 中编辑）；亭从 `GET /attendance/checkin/settings` 获取它，`resolveAsOfDate` 选择今天或之前最近发生。房间选择器突出符合条件的房间并减弱不符合条件的；选择减弱的房间需要员工确认。

### 信任和非授权接走

接走人是成员实体，每个家庭：`householdPickupPeople`（`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId、可选 personId、name、photoUrl、relationship、`status` `trusted` / `notAuthorized`、notes）。CRUD 是 `GET /membership/householdpickup/:householdId`（任何经过认证的教会用户，所以亭可以读取它）加 `POST` / `DELETE` 由 `people.edit` 限制。员工在人员页面的**接走**卡上管理列表（`B1Admin/src/people/components/PickupPeople.tsx`）-- 照片、关系和信任/非授权状态芯片。

在签出（`B1Checkin/app/checkout.tsx`）亭加载家庭的接走列表：`trusted` 条目呈现为可点击接走卡，沿着家庭成人照片网格，自由类型 "其他" 名称是模糊匹配（Levenshtein，`src/helpers/PickupMatchHelper.ts`）对 `notAuthorized` 条目 -- 匹配阻止签出，带警告工作表和员工**覆盖**按钮。覆盖记录在访问本身：它通过正常 `POST /attendance/visits/checkout` 发出 `checkedOutBy` 为 `"OVERRIDE: {name}"`，所以它落入出席记录和 `attendance.checkout` webhook 而不是单独的审计表。

### 页面家长和紧急广播

`CheckinController`（`Api/src/modules/attendance/controllers/CheckinController.ts`，`/attendance/checkin`）暴露两个短信端点：

- `POST /page` -- `{ visitId, message }`：页面已签到儿童的监护人（亭签出屏幕，有人值守模式）。
- `POST /broadcast` -- `{ serviceId, message }`：为服务给每个已签到家庭的成人发短信（亭管理设置，在 `B1Checkin/app/adminSettings.tsx` 中类型 `EMERGENCY` 后确认工作表）。

两者都通过成员网关解析家庭成人，然后手交付给**`MessagingModuleGateway.sendBulkText`**（`Api/src/shared/modules/MessagingModuleGateway.ts`）-- 交叉模块门入教会配置短信提供商（`@churchapps/texting`：TextInChurch、Clearstream 或 MutualMinistry；没有内置 SMS 发送者）。网关记录 `sentText` 行加每收件人 `deliveryLog` 条目和限制批到 500 收件人；没有提供商配置它返回 `no_provider`，亭表面为 "没有短信提供商配置"。控制器的 `dispatch()` 重复删除电话号码并跳过没有手机或 `optedOut` 设置的人，返回 `{ sent, failed, skippedOptedOut, skippedNoPhone }`，所以亭可以显示什么被跳过。

## 亭（B1Checkin）

屏幕是 `B1Checkin/app/` 下的 expo-router 文件；跨屏状态活在静态 `CachedData` 类（`src/helpers/CachedData.ts`）中，不是 React 状态。

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **查找**（`app/lookup.tsx`）-- 按电话（`GET /membership/people/search/phone?number=`，最后 4 或完整）或名称（`GET /membership/people/search?term=`）搜索。选择匹配加载家庭（`GET /membership/people/household/{householdId}`）和现有访问（`GET /attendance/visits/checkin`），播种 `pendingVisits` 带上周的选择。
2. **家庭查看**（`app/household.tsx`、`src/components/MemberList.tsx`）-- 每个成员行显示已签到徽章、过敏/`nametagNotes` 徽章及其当前房间芯片。展开成员列出每个服务时间及房间按钮加成员 / 访客 / 志愿者签到类型芯片（`MemberServiceTimes.tsx`）。
3. **小组分配**（`app/selectGroup.tsx`）-- 从 `serviceTime.groups` 构建的类别树，突出年龄/年级符合条件的房间，不符合条件的减弱在员工确认后（看[年龄/年级资格](#agegrade-eligibility-kiosk-side)）；选择房间将 `{ session: { serviceTimeId, groupId } }` visitSession 写入那个人的待定访问（`src/helpers/VisitSessionHelper.ts`）。"无" 清除它。
4. **完成**（`app/checkinComplete.tsx`）-- `POST /attendance/visits/checkin` 及 `pendingVisits`（每个标记其 `checkinType`），然后如果配置打印机并自动返回查找打印标签。`409` 容量响应显示命名满/关闭房间；比率警告提供员工确认用 `acknowledgeWarnings=true` 重新提交。

**签出**屏幕（`app/checkout.tsx`）通过自动聚焦输入接受 4 字符安全代码 -- 所以 USB/蓝牙键盘楔条形码扫描仪无需相机工作 -- 或使用相同字母的屏幕键盘，在 4 字符自动提交。它查找代码，显示被接走的儿童，并呈现家庭的**信任接走人**为可点击卡片沿着家庭成人照片网格（加 "其他" 自由文本选项，模糊检查对非授权名称 -- 看[信任和非授权接走](#trusted-and-not-authorized-pickup)），然后发出 `POST /attendance/visits/checkout` 及接走人的名称/id。在有人值守模式屏幕也提供**页面家长**（`POST /attendance/checkin/page`）和**安全标签重打** -- `reprint()` 用 `LabelHelper.getAllLabelsFor(...)` 重建家族的标签并通过与签到相同的 `PrintUI` 管道提供它们。

站个性是 AsyncStorage 标志 `@StationMode`（`"self"` | `"manned"`，在 `app/adminSettings.tsx` 中切换）。有人值守模式在查找屏幕上添加签出入口点和从家庭屏幕的每成员档案编辑（`POST /membership/people`）。亭强化内置：可选 PIN（`app/setPin.tsx`、`src/components/PinEntryModal.tsx`）限制管理员和打印机屏幕，管理员屏幕仅通过标头徽标 7 次快速点击打开，空闲吸引屏幕（`src/hooks/useInactivityTimer.ts`）在家庭间接管。

## 自助签到（B1App）

成员从 b1.church 门户在 `/mobile/checkin` 屏幕签到（由 `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` 路由到 `screens/CheckinPage.tsx`）。它需要已登录用户并走与亭相同的四个步骤 -- 服务 → 家庭 → 小组 → 完成 -- 对同一端点，状态持有在 `B1App/src/helpers/CheckinHelper.ts` 中。与亭的差异：家庭来自已登录用户自己的 `householdId`（无搜索步骤），没有标签打印 -- 反而完成屏幕显示批的安全代码为 QR（`qrcode.react`），带 "在签到站显示这个" 提示。如果签到页面加载时家庭已经签到，"显示签到代码" 按钮重新显示现有访问 `securityCode` 的 QR。签到在提交时立即记录（没有待定状态）；QR 仅在亭驱动标签打印。

**电话到亭标签打印**（`B1Checkin/app/scan.tsx`，从查找屏幕上的 "扫描代码" 按钮到达）：亭打开 `expo-camera` `CameraView`（前置默认，可翻转）扫描 QR 代码。扫描的有效载荷在它是安全代码字母表中的裸 4 字符代码时被接受，所以 B1App QR 和打印标签的 QR 块都工作。屏幕然后跟随签出重打路径 -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- 并返回查找。没有出席写入在扫描时发生；仅标签。代码无活跃访问、站无打印机和无标签小组各表面吐司并返回查找。

类型和 `ApiHelper`/`ArrayHelper` 来自 `@churchapps/helpers` 和 `@churchapps/apphelper`；没有 React 组件与 B1Admin 共享。

## 管理端出席（B1Admin）

- **设置** -- `/attendance`（`B1Admin/src/attendance/AttendancePage.tsx`）呈现结构树并创建服务（`ServiceEdit.tsx`）和服务时间（`ServiceTimeEdit.tsx`）。校园数据来自通过 `useCampuses()` 钩的成员。
- **手动出席**活在小组端，不是出席部分：`B1Admin/src/groups/components/GroupSessionsTab.tsx` 创建会话（`POST /attendance/sessions`）和通过 `POST /attendance/visitsessions/log` 标记人出席，它查找或创建那个人和会话的访问。小组领导可以为他们自己的小组记录出席而不需要 `attendance.edit` 权限 -- 控制器检查 `au.leaderGroupIds`。
- **报告** -- 出席趋势和小组出席是服务器定义的报告（`B1Admin/src/components/reporting/ReportWithFilter.tsx` 对 ReportingApi）；每人历史是 `GET /attendance/attendancerecords?personId=`（`B1Admin/src/people/components/PersonAttendance.tsx`）。

## 标签打印

### 模板和设计器

教会在 B1Admin `/mobile/checkin/labels` 设计他们自己的标签（`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`，从签到设置页面到达）。模板是 `labelTemplates` 行，其 `content` 是块的 JSON 数组 -- `text`、`field`、`barcode`、`qrcode` 或 `box` -- 每个在百分比坐标中定位，字体、对齐、符号学（`code39`/`code128`/`qr`）和可选可见性条件（例如，仅在 `person.nametagNotes` 非空时呈现过敏框）。两个 `labelType` 存在：`nametag`（每个已签到人一个；`person.displayName`、`sessions`、`securityCode` 等字段）和 `pickup`（每个家族一个；`children`、`childrenAllergies` 等字段）。服务器强制每教会每类型单一默认（`LabelTemplateController.save`）。设计器通过示例数据镜像亭的捆绑标签和预览的启动程序模板。

### 在亭上呈现和打印

在签到完成，`B1Checkin/src/helpers/LabelHelper.ts` 决定从每个待定访问上的小组标志打印什么：`printNametag` 小组的名牌，加一个家族接走标签，如果任何访问击中 `parentPickup` 小组。从签到响应的安全代码进入儿童名牌和接走标签；成人名牌打印不带代码。如果教会有模板，`LabelRenderer`（`src/helpers/LabelRenderer.ts`）将块 + 字段上下文转变为独立 HTML 文档；否则 `B1Checkin/assets/labels/` 中的捆绑 HTML 标签用占位符替换。

条形码由 `B1Checkin/src/helpers/barcode.ts` 中的纯 TypeScript 编码器生成为内联 SVG -- Code 39 模式表和 Code 128（代码集 B 带 mod-103 校验和）宽度表，加 QR 通过 `qrcode` 包。**这些编码器故意在 B1Admin 中重复**（`LabelEditor.tsx` 内联相同表，在代码注释中记录），以便设计器预览像素忠实于亭输出；一个的改变必须在另一个中镜像。

打印管道（`src/components/PrintUI.tsx`）在 `WebView` 中呈现每个 HTML 标签，通过 `react-native-view-shot` 捕获到 JPG，并手出现给本地**打印机助手** Expo 模块（`B1Checkin/modules/printer-helper/`）。模块暴露 `scan()`、`checkInit()`、`printUris()` 和状态事件，两个平台每品牌一个提供者：

| 品牌 | Android | iOS | 笔记 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`（Brother 打印 SDK） | `BrotherProvider.swift`（`BRLMPrinterKit.xcframework`） | QL 系列网络打印机（QL-800/810W/820NWB/1100/1110NWB…），模切 29×90 标签，推荐的默认值 |
| Zebra | `ZebraProvider.kt`（Link-OS SDK） | `ZebraProvider.swift` + `ZebraBridge` | 网络发现 + TCP/ZPL 图像打印 |

打印机选择活在 `app/printers.tsx`（网络扫描返回 `brand~model~ip` 条目；选择持续到 AsyncStorage），`src/helpers/PrinterLog.ts` 保留在亭标头中表面的设备诊断日志。

## 访客注册

两个路径在签到期间创建人：

- **在亭** -- 家庭屏幕的 "添加访客" 打开 `B1Checkin/app/addGuest.tsx`，首先搜索 `GET /membership/people/search?term=` 对现有非成员匹配，否则用 `POST /membership/people` 创建一个，附加到当前家庭。访客然后像任何成员流通小组分配。
- **通过 QR 自助** -- 当教会设置 `enableQRGuestRegistration` 打开（在 B1Admin 的签到设置中配置，从 `GET /membership/settings/public/{churchId}` 读取），亭查找屏幕显示链接到 `https://{subdomain}.b1.church/guest-register?serviceId=` 的 QR 码。那个 B1App 页面（`src/app/[sdSlug]/(public)/guest-register/page.tsx`）让访问家族在他们自己的手机上通过匿名 `POST /membership/people/guest-register` 端点自己注册，保持亭线移动。

## 相关页面

- [出席端点](../api/endpoints/attendance) -- 校园、服务、会话、访问和访问会话的完整 REST 表面
- [成员端点](../api/endpoints/membership) -- 人员、家庭和小组
- [Webhooks](../api/webhooks) -- `session.created`、`attendance.recorded` 和 `attendance.checkout` 事件
- [模块结构](../api/module-structure) -- 出席模块在服务器端如何组织
