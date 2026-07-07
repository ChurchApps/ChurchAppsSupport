---
title: "签到"
---

# 签到

<div class="article-intro">

签到是一个具有三个前门的系统：B1Checkin信息亭应用程序用于配备人员和自助服务站，B1App成员门户中的自助签到，以及B1Admin中的管理方出勤。所有三个都写入核心Api中的相同出勤模块，教室路由完全由小组驱动 — 没有单独的"位置"或"房间"实体。一个儿童安全层坐在顶部：按访问签到类型、服务器端容量和志愿者比率门、信息亭端年龄/等级资格、签出时验证信任接送，以及通过教会的短信提供商给家长发页面。此页面映射数据模型、签到流程、安全层和标签打印管道。

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

标签打印路径（仅信息亭）：
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper（标签模板或捆绑的HTML回退）
       └▶ LabelRenderer → HTML文档+内联SVG条形码
            └▶ PrintUI：WebView渲染 → ViewShot JPG捕获
                 └▶ printer-helper本地模块 → Brother QL / Zebra
```

| 表面 | 存储库 | 堆栈 | 角色 |
|---------|------|-------|------|
| 信息亭 | `B1Checkin` | Expo / React Native，expo-router文件路由；EAS为Android、Amazon Fire和iOS构建；通过`expo-updates`进行OTA更新 | 配备人员或自助服务站，带有标签打印和已验证的签出 |
| 自助签到 | `B1App` | Next.js（b1.church成员门户） | 已登录的成员从电话签入其家庭；无打印 |
| 管理 | `B1Admin` | React SPA | 配置服务结构、将小组分配给服务时间、设计标签、记录手动出勤、运行报告 |

所有三个都通过`ApiHelper`调用相同的两个API模块：**MembershipApi**（`/membership`）用于人员、家庭和小组；**AttendanceApi**（`/attendance`）用于下面的所有内容。

## 数据模型（`Api/src/modules/attendance`）

| 实体/表 | 关键字段 | 含义 |
|----------------|-----------|---------|
| `campuses` | 名称、地址 | 在这里已弃用 — 校园在成员资格模块（`/membership/campuses`）中掌握；出勤副本是冻结的只读，用于旧版读者（`models/Campus.ts`） |
| `services` | campusId、名称 | 一个定期聚集，例如"周日早上"（`models/Service.ts`） |
| `serviceTimes` | serviceId、名称 | 服务内的时间段，例如"9:00 AM"（`models/ServiceTime.ts`） |
| `groupServiceTimes` | groupId、serviceTimeId | 加入表：哪些小组（教室）在哪些服务时间相遇（`models/GroupServiceTime.ts`） |
| `sessions` | groupId、serviceTimeId、sessionDate | 一个小组在一个日期的一次会议 — 在签到时懒惰创建（`models/Session.ts`） |
| `visits` | personId、serviceId、visitDate、checkinTime、securityCode、checkinType、checkedInById、checkoutTime、checkedOutBy、checkedOutById | 一个人在一个日期出席（`models/Visit.ts`）。`checkinType`是`member` / `guest` / `volunteer`（NULL =旧版成员），由信息亭设置并由容量/比率门消耗 |
| `visitSessions` | visitId、sessionId | 访问涵盖的会话 — 签入到两个服务时间的儿童获得两行（`models/VisitSession.ts`） |
| `labelTemplates` | 名称、labelType（`nametag`/`pickup`）、宽度、高度、isDefault、内容（JSON块） | 可设计的标签布局（`models/LabelTemplate.ts`） |

### 完成的签到如何持久化

`VisitController.postCheckin`（`Api/src/modules/attendance/controllers/VisitController.ts`）处理`POST /attendance/visits/checkin?serviceId=&peopleIds=`。主体是`Visit`对象数组，每个携带`visitSessions`，其嵌入的`session`仅命名`(serviceTimeId, groupId)`对。服务器然后：

1. **在任何写入之前门控容量和比率。**`evaluateGates()` → `CheckinGateHelper.evaluate()`检查每个目标房间的容量、访客容量、关闭标志和志愿者比率对抗当前占用率。postCheckin**不是事务性的**，所以门必须在第一次保存之前运行 — 硬违规返回409命名有问题的房间，什么都不持久化。请参见[容量和志愿者比率门](#容量和志愿者比率门)。
2. **解析会话懒惰。**`getSessionId()`找到或创建`sessions`行为`(groupId, serviceTimeId, today)` — 会话id按日期进行过程缓存。新会话发出`session.created`webhook。循环是等待的`for..of` — 较早的消防忘记`forEach(async …)`与保存竞争并在首次会话创建时写NULL sessionIds（已修复；在循环处的代码注释中注明）。
3. **替换当天的记录。**当天该服务的那些人的任何现有访问都被删除，连同他们的visitSessions，然后保存提交的集。重新签入家庭因此是等幂"这是当前状态"操作，不是附加。通过`?checkDuplicates=true`代替返回`{ duplicates: [personId…] }`不写入，这是信息亭在覆盖之前警告的方式。
4. **每批生成一个安全代码。**`SecurityCodeHelper.generate()`从字母表`23456789BCDFGHJKLMNPQRSTVWXYZ`生成4个字符的代码（没有元音或歧义字符，所以代码不能拼写单词或误读）。服务器在对同一教会的同日开放访问的碰撞上重试，并在批次中的每个访问上标记代码。
5. **返回`{ streaks, securityCode }`。**`streaks`映射personId到连续周的出勤计数；信息亭用五彩纸屑庆祝里程碑（每5周）。

每个保存的访问也发出`attendance.recorded`webhook。读边，`GET /attendance/visits/checkin`，从他们的**最后记录日期**返回人们的访问 — 如果那是前一周，id被剥离，所以客户端收到上周房间选择的预填充副本，将保存为新记录。

### 签出

两个端点完成循环（`VisitController`）：

- `GET /attendance/visits/code/:code` — 今天的尚未签出的访问携带该安全代码，带有填充的会话。
- `POST /attendance/visits/checkout` — 主体`{ visitIds, checkedOutBy?, checkedOutById? }`；标记`checkoutTime`和谁接送，并为每个访问发出`attendance.checkout`webhook。

权限：信息亭使用`attendance.checkin`进行身份验证，它授予完全的签到/签出/标签模板表面；`attendance.view`/`attendance.edit`覆盖报告和手动条目；结构（服务、服务时间、小组分配）需要`services.edit`。

## 小组驱动房间路由

系统中的任何地方都没有房间或教室实体。"房间"是一个成员资格**小组**，启用了`trackAttendance`，通过`groupServiceTimes`链接到一个或多个服务时间。小组字段（在`Api/src/modules/membership/models/Group.ts`上）塑造信息亭行为：

| 字段 | 效果 |
|------|--------|
| `trackAttendance` | 小组在所有出勤中参与；B1Admin的设置树用`trackAttendance`小组标记，无`groupServiceTimes`行为未分配 |
| `parentPickup` | 标记儿童房间：签入它使访问成为"儿童"访问，打印家庭接送标签并在姓名标签上放置安全代码 |
| `printNametag` | 是否对该小组的签入完全打印姓名标签 |
| `capacity` / `guestCapacity` / `checkinClosed` | 房间容量限制和硬"关闭"开关，通过签到门由服务器端执行（在B1Admin的小组设置下的"签到容量"下编辑） |
| `volunteerRatio` / `minVolunteers` | 每志愿者的儿童比率和最小志愿者人数，根据教会范围`ratioEnforcement`设置执行 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 年龄/等级资格界限，在信息亭端进行评估，突出显示或暗淡房间 |

每个客户端以相同的方式非正规化（例如`B1Checkin/app/services.tsx`、`B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`）：并行加载`GET /attendance/servicetimes?serviceId=`、`GET /attendance/groupservicetimes`和`GET /membership/groups`，然后对于每个服务时间收集其`groupServiceTimes`行指向它的小组到`serviceTime.groups`。该数组是房间选择器显示的，按小组`categoryName`组织。

分配从B1Admin中的小组页面编辑（`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`），整个Campus → Service → Service Time → Group树在`B1Admin/src/attendance/components/AttendanceSetup.tsx`中通过`GET /attendance/attendancerecords/tree`可视化。

:::info
因为小组是单一事实来源，相同的小组成员资格为信息亭路由、B1Admin小组页面中的名册风格出勤以及出勤报告提供动力 — 将小组分配给服务时间是使其成为签到目标所需的唯一步骤。
:::

## 儿童安全

### 签到类型

每个访问都携带`checkinType` — `member`、`guest`或`volunteer`（NULL意味着旧版/成员；迁移`tools/migrations/attendance/2026-07-03_checkin_type.ts`）。类型由**信息亭端**选择：成员/访客/志愿者芯片在展开的成员行上（`B1Checkin/src/components/MemberServiceTimes.tsx`），标记到每个待定访问完成时（`app/checkinComplete.tsx`，默认为`member`）。服务器在门中消耗它 — 志愿者计入比率覆盖而不是对抗容量，访客计入`guestCapacity`。

### 容量和志愿者比率门

`CheckinGateHelper.evaluate()`（`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`）在postCheckin内任何保存之前运行（端点是非事务性的，所以门前保存是正确性机制）。它通过成员资格模块网关加载每个目标小组的当前占用率（`VisitRepo.countActiveByGroupToday`）和小组配置，然后分类违规：

- **硬（始终阻止）：**`checkinClosed`、`current + incoming > capacity`、访客计数超过`guestCapacity`。批次被拒绝为`409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — 信息亭显示命名的房间。
- **比率（警告或阻止）：**进入房间的非志愿者，其中`volunteers < minVolunteers`、根本没有志愿者或`children > volunteers × volunteerRatio`。严重性遵循每教会设置`ratioEnforcement`（`"warn"`默认/`"block"`，在B1Admin管理教会→签到中编辑，`CheckinSettingsEdit.tsx`）。警告模式返回`409 { warning: true, error: "ratio", … }`除非客户端用`acknowledgeWarnings=true`重新提交 — 那个重新提交是信息亭的工作人员确认覆盖。

### 年龄/等级资格（信息亭端）

房间资格是顾问UI，在信息亭上评估，不由服务器执行。`B1Checkin/src/helpers/EligibilityHelper.ts`将一个人的出生日期/等级与小组的`minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`相比（等级顺序：PreK、K、1–12、Graduated）并返回`eligible` / `ineligible` / `unknown` — 缺失数据产生`unknown`并从不隐藏房间。年龄和等级计算为教会的**等级晋升日期**（`gradePromotionDate`设置，`"MM-DD"`，在`B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`中编辑）；信息亭从`GET /attendance/checkin/settings`获取它，`resolveAsOfDate`选择今天或之前最近的发生。房间选择器突出显示符合条件的房间并暗淡不符合条件的房间；拿起暗淡房间需要工作人员确认。

### 信任和未授权接送

接送人员是成员资格实体，按家庭：`householdPickupPeople`（`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId、可选personId、名称、photoUrl、关系、`status` `trusted` / `notAuthorized`、笔记）。CRUD是`GET /membership/householdpickup/:householdId`（任何经过身份验证的教会用户，所以信息亭可以读取它）加上`POST` / `DELETE`由`people.edit`门控。工作人员在人员页面的**接送**卡上管理列表（`B1Admin/src/people/components/PickupPeople.tsx`） — 照片、关系和信任/未授权状态芯片。

在签出时（`B1Checkin/app/checkout.tsx`），信息亭加载家庭的接送列表：`trusted`条目呈现为可点击的接送卡，旁边是家庭成人照片网格，免费输入的"其他"名称是模糊匹配的（Levenshtein，`src/helpers/PickupMatchHelper.ts`）对抗`notAuthorized`条目 — 匹配阻止签出，带有警告表单和工作人员**覆盖**按钮。覆盖被记录在访问本身：它通过正常的`POST /attendance/visits/checkout`将`checkedOutBy`发布为`"OVERRIDE: {name}"`，所以它降落在出勤记录和`attendance.checkout`webhook而不是单独的审计表中。

### 给家长发页面和紧急广播

`CheckinController`（`Api/src/modules/attendance/controllers/CheckinController.ts`，`/attendance/checkin`）暴露两个SMS端点：

- `POST /page` — `{ visitId, message }`：给一个签入的儿童的监护人发页面（信息亭签出屏幕，配备人员模式）。
- `POST /broadcast` — `{ serviceId, message }`：文本为服务的每个签入家庭的成人（信息亭管理员设置，在`B1Checkin/app/adminSettings.tsx`中在类型`EMERGENCY`-to-confirm表后）。

两者都通过成员资格网关解析家庭成人，然后交付给**`MessagingModuleGateway.sendBulkText`**（`Api/src/shared/modules/MessagingModuleGateway.ts`） — 交叉模块门到教会配置的短信提供商（`@churchapps/texting`：TextInChurch、Clearstream或MutualMinistry；没有内置的SMS发送器）。网关记录`sentText`行加上每个接收者`deliveryLog`条目，并将批次限制为500个接收者；没有配置的提供商时返回`no_provider`，信息亭显示为"无SMS提供商配置"。控制器的`dispatch()`去重电话号码并跳过没有手机或`optedOut`设置的人，返回`{ sent, failed, skippedOptedOut, skippedNoPhone }`以便信息亭可以显示什么被跳过。

## 信息亭（B1Checkin）

屏幕是`B1Checkin/app/`下的expo-router文件；跨屏状态存在于静态`CachedData`类（`src/helpers/CachedData.ts`），不是React状态。

```
索引（启动/自动登录） → 选择教会 → 服务 ──▶ 查找 ──▶ 家庭 ──▶ 签到完成
                                          │             │  ▲         │ │            │
             加载serviceTimes、小组、  │             │  └─────────┘ └▶ 添加访客  └▶ 打印标签、
             groupServiceTimes、           │             └▶ 签出（配备人员）           自动返回
             labelTemplates               │                                            到查找
```

1. **查找**（`app/lookup.tsx`） — 按电话搜索（`GET /membership/people/search/phone?number=`，最后4位或完整）或按名称（`GET /membership/people/search?term=`）。选择匹配加载家庭（`GET /membership/people/household/{householdId}`）和现有访问（`GET /attendance/visits/checkin`），用上周的选择播种`pendingVisits`。
2. **家庭审查**（`app/household.tsx`、`src/components/MemberList.tsx`） — 每个成员行显示一个已签入徽章、过敏/`nametagNotes`徽章和他们当前的房间芯片。扩展一个成员列出每个服务时间，带有房间按钮加上成员/访客/志愿者签到类型芯片（`MemberServiceTimes.tsx`）。
3. **小组分配**（`app/selectGroup.tsx`） — 从`serviceTime.groups`构建的类别树，年龄/等级符合条件的房间突出显示，不符合条件的房间在工作人员确认后变暗（请参见[年龄/等级资格](#年龄等级资格信息亭端)）；选择房间将`{ session: { serviceTimeId, groupId } }`visitSession写入该人的待定访问（`src/helpers/VisitSessionHelper.ts`）。"无"清除它。
4. **完成**（`app/checkinComplete.tsx`） — `POST /attendance/visits/checkin`与`pendingVisits`（每个标记其`checkinType`），然后如果配置了打印机打印标签并自动返回到查找。`409`容量响应显示命名的已满/已关闭房间；比率警告提供重新提交为`acknowledgeWarnings=true`的工作人员确认。

**签出**屏幕（`app/checkout.tsx`）接受4字符安全代码通过自动聚焦的输入 — 所以USB/蓝牙键盘楔形条形码扫描器工作，不需要相机 — 或使用相同字母表的屏幕上键盘，在4字符处自动提交。它查找代码，显示正在接送的儿童，并将家庭的**信任接送人**呈现为可点击卡，旁边是家庭成人照片网格（加上一个"其他"自由文本选项，针对未授权名称进行模糊检查 — 请参见[信任和未授权接送](#信任和未授权接送)），然后用接送人的名字/id发布`POST /attendance/visits/checkout`。在配备人员模式下屏幕也提供**给家长发页面**（`POST /attendance/checkin/page`）和一个**安全标签重新打印** — `reprint()`使用`LabelHelper.getAllLabelsFor(...)`重建家族的标签，并将其通过相同的`PrintUI`管道为签到。

工作站个性是AsyncStorage标志`@StationMode`（`"self"` | `"manned"`，在`app/adminSettings.tsx`中切换）。配备人员模式在查找屏幕上添加签出条目点，以及从家庭屏幕进行的按成员资料编辑（`POST /membership/people`）。信息亭强化是内置的：可选的PIN（`app/setPin.tsx`、`src/components/PinEntryModal.tsx`）门控管理员和打印机屏幕，管理员屏幕仅通过标题徽标上的7次快速点击打开，以及一个空闲吸引屏幕（`src/hooks/useInactivityTimer.ts`）在家族之间接管。

## 自助签到（B1App）

成员从b1.church门户在`/mobile/checkin`屏幕签入（由`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`路由到`screens/CheckinPage.tsx`）。它需要一个已登录的用户，并进行与信息亭相同的四个步骤 — 服务→家庭→小组→完成 — 对抗相同的端点，状态保持在`B1App/src/helpers/CheckinHelper.ts`中。与信息亭的差异：家庭来自已登录用户自己的`householdId`（没有搜索步骤），流程在确认屏幕处结束 — 没有安全代码显示，没有标签打印。类型和`ApiHelper`/`ArrayHelper`来自`@churchapps/helpers`和`@churchapps/apphelper`；没有React组件与B1Admin共享。

## 管理方出勤（B1Admin）

- **设置** — `/attendance`（`B1Admin/src/attendance/AttendancePage.tsx`）呈现结构树，创建服务（`ServiceEdit.tsx`）和服务时间（`ServiceTimeEdit.tsx`）。校园数据通过`useCampuses()`钩子从成员资格来源。
- **手动出勤**住在小组方，不是出勤部分：`B1Admin/src/groups/components/GroupSessionsTab.tsx`创建会话（`POST /attendance/sessions`）并通过`POST /attendance/visitsessions/log`标记人员出席，它为那个人和会话找到或创建访问。小组领导可以为他们自己的小组记录出勤，不需要`attendance.edit`权限 — 控制器检查`au.leaderGroupIds`。
- **报告** — 出勤趋势和小组出勤是服务器定义的报告（`B1Admin/src/components/reporting/ReportWithFilter.tsx`对抗ReportingApi）；按人员历史是`GET /attendance/attendancerecords?personId=`（`B1Admin/src/people/components/PersonAttendance.tsx`）。

## 标签打印

### 模板和设计器

教会在B1Admin的`/mobile/checkin/labels`设计自己的标签（`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`，从签到设置页面到达）。一个模板是一个`labelTemplates`行，其`content`是块的JSON数组 — `text`、`field`、`barcode`、`qrcode`或`box` — 每个用百分比坐标、字体、对齐、符号学（`code39`/`code128`/`qr`）和可选可见性条件定位（例如仅当`person.nametagNotes`非空时呈现过敏框）。存在两个`labelType`：`nametag`（每个签入人员一个；诸如`person.displayName`、`sessions`、`securityCode`等字段）和`pickup`（每个家庭一个；诸如`children`、`childrenAllergies`等字段）。服务器为每个类型每教会执行单个默认（`LabelTemplateController.save`）。设计器发出镜像信息亭捆绑标签的启动器模板，并针对样本数据进行预览。

### 在信息亭上呈现和打印

在签到完成时，`B1Checkin/src/helpers/LabelHelper.ts`从每个待定访问上的小组标志决定打印什么：`printNametag`小组的姓名标签，加上一个家庭接送标签如果任何访问点击`parentPickup`小组。签到响应的安全代码进入儿童姓名标签和接送标签；成人姓名标签不打印代码。如果教会有模板，`LabelRenderer`（`src/helpers/LabelRenderer.ts`）将块+字段上下文转变为独立HTML文档；否则`B1Checkin/assets/labels/`中的捆绑HTML标签被用于占位符替换。

条形码由`B1Checkin/src/helpers/barcode.ts`中的纯TypeScript编码器生成为内联SVG — Code 39图案表和Code 128（代码集B与mod-103校验和）宽度表，加上通过`qrcode`包的QR。**这些编码器故意在B1Admin中重复**（`LabelEditor.tsx`内联相同表，在代码注释中注明），以便设计器预览在像素上忠实于信息亭输出；一个改变必须镜像在另一个中。

打印管道（`src/components/PrintUI.tsx`）在`WebView`中呈现每个HTML标签，通过`react-native-view-shot`将其捕获为JPG，并将图像URI交给本地**printer-helper**Expo模块（`B1Checkin/modules/printer-helper/`）。模块暴露`scan()`、`checkInit()`、`printUris()`和状态事件，两个平台上的每个品牌提供商：

| 品牌 | Android | iOS | 备注 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`（Brother打印SDK） | `BrotherProvider.swift`（`BRLMPrinterKit.xcframework`） | QL系列网络打印机（QL-800/810W/820NWB/1100/1110NWB…），模切29×90标签，推荐的默认 |
| Zebra | `ZebraProvider.kt`（Link-OS SDK） | `ZebraProvider.swift` + `ZebraBridge` | 网络发现+TCP/ZPL图像打印 |

打印机选择住在`app/printers.tsx`（网络扫描返回`brand~model~ip`条目；选择持续到AsyncStorage），`src/helpers/PrinterLog.ts`保持一个在设备上的诊断日志，通过信息亭标头中的活着状态点显示。

## 访客注册

两个路径在签到中期创建人员：

- **在信息亭** — 家庭屏幕的"添加访客"打开`B1Checkin/app/addGuest.tsx`，它首先搜索`GET /membership/people/search?term=`用于现有非成员匹配，否则使用`POST /membership/people`创建一个，附加到当前家庭。访客然后像任何成员一样流经小组分配。
- **通过QR自助服务** — 当教会设置`enableQRGuestRegistration`打开时（在B1Admin的签到设置中配置，从`GET /membership/settings/public/{churchId}`读取），信息亭查找屏幕显示QR代码链接到`https://{subdomain}.b1.church/guest-register?serviceId=`。那个B1App页面（`src/app/[sdSlug]/(public)/guest-register/page.tsx`）让访问家庭在他们自己的电话上通过匿名`POST /membership/people/guest-register`端点注册自己，保持信息亭队列移动。

## 相关页面

- [出勤端点](../api/endpoints/attendance) -- 校园、服务、会话、访问和访问会话的完整REST表面
- [成员资格端点](../api/endpoints/membership) -- 人员、家庭和小组
- [Webhooks](../api/webhooks) -- `session.created`、`attendance.recorded`和`attendance.checkout`事件
- [模块结构](../api/module-structure) -- 出勤模块如何在服务器端组织
