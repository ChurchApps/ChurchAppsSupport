---
title: "签到"
---

# 签到

<div class="article-intro">

签到是一个统一的系统，拥有三个入口：面向配有工作人员或自助服务站点的 B1Checkin 自助终端应用、B1App 会员门户内的自助签到，以及 B1Admin 中面向管理端的出勤管理。三者都写入核心 Api 中同一个出勤模块，且教室路由完全由“小组”驱动——系统中不存在单独的“地点”或“房间”实体。在此之上叠加了一层儿童安全机制：按次签到类型、服务器端的容量与志愿者配比限制、终端侧的年龄/年级适用性判断、签出时的可信接送人验证，以及通过教会短信服务商实现的家长寻呼。本页面梳理数据模型、签到流程、安全层，以及标签打印流水线。

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

标签打印路径（仅限自助终端）：
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper（标签模板，或内置的 HTML 兜底方案）
       └▶ LabelRenderer → HTML 文档 + 内联 SVG 条码
            └▶ PrintUI：WebView 渲染 → ViewShot JPG 截图
                 └▶ printer-helper 原生模块 → Brother QL / Zebra
```

| 接入面 | 代码仓库 | 技术栈 | 角色 |
|---------|------|-------|------|
| 自助终端 | `B1Checkin` | Expo / React Native，expo-router 文件路由；通过 EAS 为 Android、Amazon Fire 和 iOS 构建；通过 `expo-updates` 实现 OTA 更新 | 有人值守或自助服务站点，支持标签打印和已验证的签出 |
| 自助签到 | `B1App` | Next.js（b1.church 会员门户） | 已登录的会员从手机为自己的家庭办理签到；不涉及打印 |
| 管理端 | `B1Admin` | React 单页应用 | 配置服务结构、将小组分配到具体服务时间、设计标签、录入手动出勤、运行报表 |

三者都通过 `ApiHelper` 调用同样的两个 API 模块：**MembershipApi**（`/membership`）负责人员、家庭和小组；**AttendanceApi**（`/attendance`）负责以下所有内容。

## 数据模型（`Api/src/modules/attendance`）

| 实体/表 | 关键字段 | 含义 |
|----------------|-----------|---------|
| `campuses` | 名称、地址 | 在此已弃用——校区信息以 membership 模块（`/membership/campuses`）为准；这里的副本被冻结为只读，仅供旧版读取者使用（`models/Campus.ts`） |
| `services` | campusId、名称 | 一场周期性聚会，例如“周日早堂”（`models/Service.ts`） |
| `serviceTimes` | serviceId、名称 | 一场服务内的一个时段，例如“上午 9:00”（`models/ServiceTime.ts`） |
| `groupServiceTimes` | groupId、serviceTimeId | 关联表：哪些小组（教室）对应哪些服务时段（`models/GroupServiceTime.ts`） |
| `sessions` | groupId、serviceTimeId、sessionDate | 某个小组在某一天的一次聚会——在签到时按需惰性创建（`models/Session.ts`） |
| `visits` | personId、serviceId、visitDate、checkinTime、securityCode、checkinType、checkedInById、checkoutTime、checkedOutBy、checkedOutById | 某人在某一天的一次出席记录（`models/Visit.ts`）。`checkinType` 为 `member` / `guest` / `volunteer`（NULL 表示旧版会员），由自助终端设置，并被容量/配比限制逻辑读取 |
| `visitSessions` | visitId、sessionId | 一次出席对应的一个或多个场次——若一个孩子签到到两个服务时段，会生成两行记录（`models/VisitSession.ts`） |
| `labelTemplates` | 名称、labelType（`nametag`/`pickup`）、宽度、高度、isDefault、content（JSON 块） | 可自定义设计的标签排版（`models/LabelTemplate.ts`） |

### 一次完成的签到如何被持久化

`VisitController.postCheckin`（`Api/src/modules/attendance/controllers/VisitController.ts`）处理 `POST /attendance/visits/checkin?serviceId=&peopleIds=`。请求体是一个 `Visit` 对象数组，每个对象都携带 `visitSessions`，其内嵌的 `session` 只指明一个 `(serviceTimeId, groupId)` 组合。服务器接下来会：

1. **在任何写入之前先做容量与配比限制检查。**`evaluateGates()` → `CheckinGateHelper.evaluate()` 会检查每个目标房间的容量、访客容量、关闭标志以及志愿者配比与当前入住人数的关系。由于 postCheckin **不是事务性的**，因此必须在第一次保存之前完成检查——一旦出现硬性违规，会返回 409 并指明具体的房间，且不会有任何数据被持久化。参见[容量与志愿者配比限制](#容量与志愿者配比限制)。
2. **惰性解析场次。**`getSessionId()` 会查找或创建对应 `(groupId, serviceTimeId, today)` 的 `sessions` 记录——场次 ID 会按天在进程内缓存。新场次的创建会触发 `session.created` Webhook。这个循环使用了带 `await` 的 `for..of`——早先那种“发后不管”的 `forEach(async …)` 写法会与保存操作产生竞态，导致首次创建场次时写入 NULL 的 sessionId（该问题已修复；在循环处的代码注释中有说明）。
3. **替换当天的记录。**当天该服务下这些人已有的所有出席记录（连同其 visitSessions）会先被删除，然后保存本次提交的数据集。因此为一个家庭重新办理签到，是一次幂等的“这就是当前状态”操作，而非追加。若传入 `?checkDuplicates=true`，则会改为返回 `{ duplicates: [personId…] }` 而不做任何写入——这正是自助终端在覆盖之前发出警告所依赖的机制。
4. **每一批生成一个安全码。**`SecurityCodeHelper.generate()` 会从字母表 `23456789BCDFGHJKLMNPQRSTVWXYZ`（不含元音字母或易混淆字符，因此代码既拼不出单词，也不容易读错）中生成一个 4 位字符代码。服务器会针对同一教会同一天已开放的出席记录进行冲突重试，并将该代码盖在这一批所有出席记录上。
5. **返回 `{ streaks, securityCode }`。**`streaks` 将 personId 映射为连续出席周数；自助终端会在每达成一个里程碑（每 5 周）时用彩带庆祝。

每一条被保存的出席记录还会触发一次 `attendance.recorded` Webhook。读取端 `GET /attendance/visits/checkin` 会返回这些人**最近一次记录日期**的出席记录——如果那是上一周的记录，其中的 ID 会被剥离，因此客户端收到的是一份上周房间选择的预填充副本，保存时会作为新记录写入。

### 签出

有两个端点用于完成签到/签出闭环（`VisitController`）：

- `GET /attendance/visits/code/:code` —— 携带该安全码、今天尚未签出的所有出席记录，并已填充场次信息。
- `POST /attendance/visits/checkout` —— 请求体为 `{ visitIds, checkedOutBy?, checkedOutById? }`；记录 `checkoutTime` 以及是谁接走的孩子，并为每条出席记录触发一次 `attendance.checkout` Webhook。

权限方面：自助终端使用 `attendance.checkin` 权限进行认证，该权限恰好覆盖签到/签出/标签模板这部分接入面；`attendance.view`/`attendance.edit` 覆盖报表和手动录入；结构性配置（服务、服务时段、小组分配）则需要 `services.edit` 权限。

## 小组驱动房间路由

系统中任何地方都不存在“房间”或“教室”这样的实体。所谓“房间”其实就是一个开启了 `trackAttendance` 的 membership **小组**，通过 `groupServiceTimes` 关联到一个或多个服务时段。以下小组字段（位于 `Api/src/modules/membership/models/Group.ts`）会影响自助终端的行为：

| 字段 | 作用 |
|------|--------|
| `trackAttendance` | 该小组是否参与出勤统计；B1Admin 的设置树会将开启了 `trackAttendance` 但没有任何 `groupServiceTimes` 记录的小组标记为“未分配” |
| `parentPickup` | 标记该小组为儿童房间：签到到此房间会使这次出席被视为“儿童”出席，从而打印一张家庭接送标签，并把安全码印在姓名标签上 |
| `printNametag` | 签到到该小组时是否打印姓名标签 |
| `capacity` / `guestCapacity` / `checkinClosed` | 房间容量限制以及一个硬性的“关闭”开关，由服务器端的签到限制逻辑强制执行（在 B1Admin 小组设置的“签到容量”下编辑） |
| `volunteerRatio` / `minVolunteers` | 每位志愿者对应的儿童配比以及最低志愿者人数，依据全教会级别的 `ratioEnforcement` 设置强制执行 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 年龄/年级适用范围，在自助终端侧计算，用于高亮或置灰房间选项 |

每个客户端都以相同方式对数据进行去规范化处理（例如 `B1Checkin/app/services.tsx`、`B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`）：并行加载 `GET /attendance/servicetimes?serviceId=`、`GET /attendance/groupservicetimes` 和 `GET /membership/groups`，然后针对每个服务时段，把 `groupServiceTimes` 中指向它的小组汇总进 `serviceTime.groups`。房间选择器展示的正是这个数组，并按小组的 `categoryName` 进行分类组织。

分配关系在 B1Admin 的小组页面中编辑（`B1Admin/src/groups/components/ServiceTimesEdit.tsx` —— `POST`/`DELETE /attendance/groupservicetimes`），整个 校区 → 服务 → 服务时段 → 小组 的树状结构则在 `B1Admin/src/attendance/components/AttendanceSetup.tsx` 中通过 `GET /attendance/attendancerecords/tree` 可视化展示。

:::info
由于小组是唯一的事实来源，同一份小组成员关系同时驱动了自助终端的路由、B1Admin 小组页面中花名册风格的出勤记录，以及出勤报表——把一个小组分配到某个服务时段，就是使其成为一个签到目的地所需的唯一步骤。
:::

## 儿童安全

### 签到类型

每一条出席记录都携带一个 `checkinType`——`member`、`guest` 或 `volunteer`（NULL 表示旧版记录/成员；对应迁移脚本 `tools/migrations/attendance/2026-07-03_checkin_type.ts`）。该类型是在**自助终端侧**选定的：在展开的成员行上有“成员 / 访客 / 志愿者”标签芯片（`B1Checkin/src/components/MemberServiceTimes.tsx`），在完成签到时盖在每一条待处理的出席记录上（`app/checkinComplete.tsx`，默认为 `member`）。服务器在容量限制逻辑中会读取这个类型——志愿者计入配比覆盖率，而不是计入容量占用；访客则计入 `guestCapacity`。

### 容量与志愿者配比限制

`CheckinGateHelper.evaluate()`（`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`）会在 `postCheckin` 中的任何保存操作之前运行（由于该端点是非事务性的，“先检查后保存”正是保证正确性的机制）。它会加载每个目标小组当前的入住人数（`VisitRepo.countActiveByGroupToday`）以及通过 membership 模块网关获取的小组配置，然后对违规情况进行分类：

- **硬性限制（始终阻断）：**`checkinClosed`、`当前人数 + 即将进入人数 > capacity`、访客人数超过 `guestCapacity`。这批签到会被以 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` 拒绝——自助终端会显示具体是哪个房间。
- **配比限制（警告或阻断）：**当有非志愿者要进入某个房间，而该房间 `志愿者人数 < minVolunteers`、完全没有志愿者，或 `儿童人数 > 志愿者人数 × volunteerRatio` 时触发。严重程度取决于每教会的 `ratioEnforcement` 设置（默认为 `"warn"` / 也可设为 `"block"`，在 B1Admin 的“管理教会 → 签到”中编辑，`CheckinSettingsEdit.tsx`）。警告模式会返回 `409 { warning: true, error: "ratio", … }`，除非客户端携带 `acknowledgeWarnings=true` 重新提交——那次重新提交正是自助终端上工作人员确认覆盖的操作。

### 年龄/年级适用性（自助终端侧）

房间适用性只是一种建议性的界面提示，是在自助终端上计算的，服务器并不强制执行。`B1Checkin/src/helpers/EligibilityHelper.ts` 会将一个人的出生日期/年级与小组的 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`（年级顺序：学前班、幼儿园、1–12 年级、已毕业）进行比对，返回 `eligible`（适用）/ `ineligible`（不适用）/ `unknown`（未知）——数据缺失会得到 `unknown`，且永远不会因此隐藏某个房间。年龄和年级的计算是以教会的**年级晋升日期**（`gradePromotionDate` 设置，格式为 `"MM-DD"`，在 `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx` 中编辑）为基准日期的；自助终端从 `GET /attendance/checkin/settings` 获取这个日期，`resolveAsOfDate` 会选取今天或之前最近一次出现的日期。房间选择器会高亮显示适用的房间，并将不适用的房间置灰；选择一个被置灰的房间需要工作人员确认。

### 可信接送人与未授权接送人

接送人是一个 membership 层面的实体，按家庭组织：`householdPickupPeople`（`Api/src/modules/membership/models/HouseholdPickupPerson.ts` —— householdId、可选的 personId、姓名、photoUrl、关系、`status`（`trusted` / `notAuthorized`）、备注）。其增删改查为 `GET /membership/householdpickup/:householdId`（任何已认证的教会用户都可读取，因此自助终端也能读取它），加上受 `people.edit` 权限控制的 `POST` / `DELETE`。工作人员在人员页面的**接送**卡片上管理这份列表（`B1Admin/src/people/components/PickupPeople.tsx`）——包含照片、关系,以及“可信/未授权”状态标签。

在签出时（`B1Checkin/app/checkout.tsx`），自助终端会加载该家庭的接送人列表：`trusted`（可信）状态的条目会渲染为可点击的接送人卡片,与该家庭成年人的照片网格并列展示；自由输入的“其他”姓名会与 `notAuthorized`（未授权）条目进行模糊匹配（Levenshtein 算法，`src/helpers/PickupMatchHelper.ts`）——一旦匹配上，签出会被阻断，弹出警告面板并显示工作人员的**覆盖**按钮。这次覆盖操作本身会被记录在出席记录上：它会通过常规的 `POST /attendance/visits/checkout` 将 `checkedOutBy` 提交为 `"OVERRIDE: {name}"`，因此该记录会进入出勤记录和 `attendance.checkout` Webhook，而不是记在一张单独的审计表里。

### 家长寻呼与紧急广播

`CheckinController`（`Api/src/modules/attendance/controllers/CheckinController.ts`，`/attendance/checkin`）暴露了两个短信端点：

- `POST /page` —— `{ visitId, message }`：向一位已签到儿童的监护人发送寻呼（自助终端的签出界面，有人值守模式下）。
- `POST /broadcast` —— `{ serviceId, message }`：向某场服务下所有已签到家庭的成年人群发短信（自助终端的管理设置界面，位于 `B1Checkin/app/adminSettings.tsx` 中一个需要输入 `EMERGENCY` 确认的面板之后）。

两者都会通过 membership 网关解析出家庭中的成年人，然后交由 **`MessagingModuleGateway.sendBulkText`**（`Api/src/shared/modules/MessagingModuleGateway.ts`）负责投递——这是通向教会所配置短信服务商（`@churchapps/texting`：TextInChurch、Clearstream 或 MutualMinistry；系统本身没有内置的短信发送器）的跨模块入口。该网关会记录一条 `sentText` 记录以及每位收件人各一条的 `deliveryLog`，并将单批次上限设为 500 位收件人；如果没有配置服务商，会返回 `no_provider`，自助终端会将其展示为“未配置短信服务商”。控制器的 `dispatch()` 会对电话号码去重，并跳过没有手机号或已设置 `optedOut` 的人员，最终返回 `{ sent, failed, skippedOptedOut, skippedNoPhone }`，以便自助终端能够展示哪些被跳过了。

## 自助终端（B1Checkin）

各屏幕是 `B1Checkin/app/` 下的 expo-router 文件；跨屏幕状态保存在一个静态的 `CachedData` 类中（`src/helpers/CachedData.ts`），而非 React 状态。

```
索引（启动/自动登录） → 选择教会 → 服务 ──▶ 查找 ──▶ 家庭 ──▶ 签到完成
                                          │             │  ▲         │ │            │
             加载 serviceTimes、小组、  │             │  └─────────┘ └▶ 添加访客  └▶ 打印标签、
             groupServiceTimes、          │             └▶ 签出（有人值守）           自动返回
             labelTemplates               │                                            到查找
```

1. **查找**（`app/lookup.tsx`）—— 按电话号码搜索（`GET /membership/people/search/phone?number=`，可用后 4 位或完整号码）或按姓名搜索（`GET /membership/people/search?term=`）。选中一个匹配项后会加载该家庭（`GET /membership/people/household/{householdId}`）以及已有的出席记录（`GET /attendance/visits/checkin`），并以上周的选择预填 `pendingVisits`。
2. **家庭审核**（`app/household.tsx`、`src/components/MemberList.tsx`）—— 每一行成员会显示一个“已签到”徽标、过敏/`nametagNotes` 徽标，以及当前的房间标签。展开某位成员会列出每个服务时段对应的房间按钮，以及成员/访客/志愿者签到类型标签芯片（`MemberServiceTimes.tsx`）。
3. **小组分配**（`app/selectGroup.tsx`）—— 由 `serviceTime.groups` 构建的分类树，符合年龄/年级要求的房间会被高亮，不符合要求的房间会被置灰并要求工作人员确认后方可选择（参见[年龄/年级适用性](#年龄年级适用性自助终端侧)）；选择一个房间会将 `{ session: { serviceTimeId, groupId } }` 这条 visitSession 写入该人待处理的出席记录（`src/helpers/VisitSessionHelper.ts`）。“无”选项则会清除它。
4. **完成**（`app/checkinComplete.tsx`）—— 携带 `pendingVisits`（每条都已盖上其 `checkinType`）调用 `POST /attendance/visits/checkin`，随后在配置了打印机的情况下打印标签，并自动返回查找界面。若返回 `409` 容量响应，会显示具体是哪个房间已满/已关闭；配比警告则会提供工作人员确认操作，确认后以 `acknowledgeWarnings=true` 重新提交。

**签出**界面（`app/checkout.tsx`）通过一个自动获得焦点的输入框接受 4 位安全码——因此 USB/蓝牙键盘模拟型条码扫描枪无需摄像头即可使用——也支持使用同一字母表的屏幕虚拟键盘，输满 4 位后自动提交。它会查找该代码，展示待接走的孩子,并将该家庭的**可信接送人**渲染为可点击卡片,与该家庭成年人的照片网格并列展示（此外还有一个自由文本的“其他”选项，会与未授权名单进行模糊比对——参见[可信接送人与未授权接送人](#可信接送人与未授权接送人)），随后携带所选接送人的姓名/ID 调用 `POST /attendance/visits/checkout`。在有人值守模式下，该界面还提供**寻呼家长**（`POST /attendance/checkin/page`）和**安全标签重新打印**功能——`reprint()` 会用 `LabelHelper.getAllLabelsFor(...)` 重新生成该家庭的标签，并将其送入与签到时相同的 `PrintUI` 流水线。

站点的运行模式是一个 AsyncStorage 标志 `@StationMode`（取值为 `"self"` 或 `"manned"`，在 `app/adminSettings.tsx` 中切换）。有人值守模式会在查找界面上新增签出入口，并支持从家庭界面直接编辑成员资料（`POST /membership/people`）。自助终端还内置了若干加固措施：一个可选的 PIN 码（`app/setPin.tsx`、`src/components/PinEntryModal.tsx`）对管理和打印机界面进行门控，管理界面只能通过在顶部标题 Logo 上连续快速点击 7 次来打开，并有一个空闲时的吸引屏幕（`src/hooks/useInactivityTimer.ts`）会在两个家庭之间接管界面。

## 自助签到（B1App）

会员从 b1.church 门户的 `/mobile/checkin` 界面办理签到（由 `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` 路由到 `screens/CheckinPage.tsx`）。该功能要求用户已登录，并与自助终端一样经历相同的四个步骤——服务 → 家庭 → 小组 → 完成——调用完全相同的端点，状态保存在 `B1App/src/helpers/CheckinHelper.ts` 中。与自助终端的差异在于：家庭信息来自已登录用户自己的 `householdId`（没有搜索这一步），流程在确认界面即告结束——不会显示安全码，也不涉及标签打印。类型定义以及 `ApiHelper`/`ArrayHelper` 均来自 `@churchapps/helpers` 和 `@churchapps/apphelper`；没有任何 React 组件与 B1Admin 共享。

## 管理端出勤（B1Admin）

- **设置** —— `/attendance`（`B1Admin/src/attendance/AttendancePage.tsx`）渲染结构树，并创建服务（`ServiceEdit.tsx`）和服务时段（`ServiceTimeEdit.tsx`）。校区数据通过 `useCampuses()` 钩子从 membership 模块获取。
- **手动出勤**位于“小组”这一侧,而非出勤板块下：`B1Admin/src/groups/components/GroupSessionsTab.tsx` 创建场次（`POST /attendance/sessions`），并通过 `POST /attendance/visitsessions/log` 将人员标记为出席，该端点会为该人和该场次查找或创建出席记录。小组组长可以为自己的小组录入出勤,而无需拥有 `attendance.edit` 权限——控制器会检查 `au.leaderGroupIds`。
- **报表** —— 出勤趋势和小组出勤都是服务器端定义的报表（`B1Admin/src/components/reporting/ReportWithFilter.tsx` 调用 ReportingApi）；按人员查看的历史记录为 `GET /attendance/attendancerecords?personId=`（`B1Admin/src/people/components/PersonAttendance.tsx`）。

## 标签打印

### 模板与设计器

教会在 B1Admin 的 `/mobile/checkin/labels`（`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`，可从签到设置页面进入）中自行设计标签。一个模板就是一条 `labelTemplates` 记录,其 `content` 是一组块的 JSON 数组——`text`、`field`、`barcode`、`qrcode` 或 `box`——每个块都用百分比坐标定位,并配有字体、对齐方式、编码方式（`code39`/`code128`/`qr`）以及可选的可见性条件（例如仅在 `person.nametagNotes` 非空时才渲染过敏提示框）。存在两种 `labelType`：`nametag`（每位签到人员一张;字段如 `person.displayName`、`sessions`、`securityCode`）和 `pickup`（每个家庭一张;字段如 `children`、`childrenAllergies`）。服务器强制每种类型在每个教会下只能有一个默认模板（`LabelTemplateController.save`）。该设计器附带了一批与自助终端内置标签样式一致的起始模板,并能对照示例数据进行预览。

### 在自助终端上渲染与打印

在签到完成时，`B1Checkin/src/helpers/LabelHelper.ts` 会根据每条待处理出席记录上的小组标志来决定打印什么内容：为开启 `printNametag` 的小组打印姓名标签,如果任何一条出席记录命中了 `parentPickup` 小组,则额外打印一张家庭接送标签。签到响应中的安全码会印在儿童姓名标签和接送标签上；成人姓名标签打印时不带代码。如果教会配置了模板,`LabelRenderer`（`src/helpers/LabelRenderer.ts`）会把块加字段上下文转换为一份独立的 HTML 文档；否则会使用 `B1Checkin/assets/labels/` 中内置的 HTML 标签,配合占位符替换。

条码由 `B1Checkin/src/helpers/barcode.ts` 中的纯 TypeScript 编码器生成为内联 SVG —— Code 39 的图案表和 Code 128（代码集 B,配 mod-103 校验和）的宽度表,再加上通过 `qrcode` 包生成的二维码。**这些编码器被有意地在 B1Admin 中重复实现了一份**（`LabelEditor.tsx` 内联了同样的表格,代码注释中有说明），目的是让设计器预览在像素级别上忠实还原自助终端的实际输出;修改其中一处必须同步镜像到另一处。

打印流水线（`src/components/PrintUI.tsx`）会在一个 `WebView` 中渲染每张 HTML 标签,通过 `react-native-view-shot` 将其截图为 JPG,再把图片 URI 交给原生的 **printer-helper** Expo 模块（`B1Checkin/modules/printer-helper/`）。该模块暴露了 `scan()`、`checkInit()`、`printUris()` 以及状态事件,并为两个平台上的每个品牌各自提供了实现：

| 品牌 | Android | iOS | 说明 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`（Brother 打印 SDK） | `BrotherProvider.swift`（`BRLMPrinterKit.xcframework`） | QL 系列网络打印机（QL-800/810W/820NWB/1100/1110NWB…），29×90 模切标签,推荐的默认选择 |
| Zebra | `ZebraProvider.kt`（Link-OS SDK） | `ZebraProvider.swift` + `ZebraBridge` | 网络发现 + TCP/ZPL 图像打印 |

打印机选择位于 `app/printers.tsx`（网络扫描会返回 `brand~model~ip` 形式的条目;选择结果会持久化到 AsyncStorage），`src/helpers/PrinterLog.ts` 在设备上维护一份诊断日志,通过自助终端顶部标题栏中的实时状态点展示。

## 访客登记

有两条路径可以在签到过程中创建人员记录：

- **在自助终端上** —— 家庭界面的“添加访客”会打开 `B1Checkin/app/addGuest.tsx`,它会先通过 `GET /membership/people/search?term=` 搜索是否存在匹配的非成员记录,如果没有,则通过 `POST /membership/people` 创建一个,并将其挂到当前家庭下。之后该访客会像任何成员一样经历小组分配流程。
- **通过二维码自助登记** —— 当教会设置 `enableQRGuestRegistration` 开启时（在 B1Admin 的签到设置中配置,从 `GET /membership/settings/public/{churchId}` 读取），自助终端的查找界面会展示一个链接到 `https://{subdomain}.b1.church/guest-register?serviceId=` 的二维码。对应的 B1App 页面（`src/app/[sdSlug]/(public)/guest-register/page.tsx`）让来访家庭可以在自己的手机上,通过匿名端点 `POST /membership/people/guest-register` 自行登记,从而保持自助终端队列的流转速度。

## 相关页面

- [出勤端点](../api/endpoints/attendance) —— 涵盖校区、服务、场次、出席记录和出席场次的完整 REST 接入面
- [Membership 端点](../api/endpoints/membership) —— 人员、家庭和小组
- [Webhook](../api/webhooks) —— `session.created`、`attendance.recorded` 和 `attendance.checkout` 事件
- [模块结构](../api/module-structure) —— 出勤模块在服务器端的组织方式
