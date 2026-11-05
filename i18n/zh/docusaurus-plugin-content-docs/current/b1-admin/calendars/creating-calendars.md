---
title: "创建日历"
---

# 创建日历

<div class="article-intro">

在 B1 Admin 中创建日历，可以通过关联一个或多个小组来构建一个精选的活动视图。活动由小组负责人在各自的小组中管理，而你的日历会将这些活动集中显示在一处。拥有编辑权限的管理员可以为任何小组添加或编辑活动。非管理员的小组负责人只能管理自己所带领小组的活动。

</div>

## 培训视频

<YouTube id="Ko3kgsCSLFs" title="Creating Calendars, Events, and Room Bookings in B1" next="Event Registration and Paid Events in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>开始之前</h4>

- 设置好你希望纳入日历的活动所属的[小组](../groups/creating-groups.md)
- 你需要拥有 B1 Admin 中日历部分的管理访问权限

</div>

## 创建新日历

1. 在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Calendars**，然后点击 **Calendars**。
2. 点击页面顶部的 **Add Calendar**。新日历表单会在日历列表下方打开。
3. 输入日历的**名称**（例如"青年事工活动"或"主教会日历"）。
4. 可选填写**描述**，帮助团队了解该日历的用途。
5. 点击 **Create** 保存新日历。

## 日历详情页

创建日历后，在其所在行点击 **Manage Events**，即可打开详情页。该页面包含两个主要区域：

- **左侧栏** —— 日历名称及其操作按钮（**New Event**、**Edit**、**Import .ics** 和 **Print**），下方是 **Groups in Calendar** 列表，显示该日历中包含的小组。点击某个小组旁边的 **Remove**，即可将其从日历中移除。
- **主区域** —— **Calendar Events** 视图，显示从已关联小组中汇集而来的活动，上方有 **Subscribe** 和 **Add Group** 按钮。

## 关联小组

在日历中有活动的小组会自动出现在详情页左侧的 **Groups in Calendar** 列表中。

1. 点击日历上方的 **Add Group**，将一个小组关联到日历。
2. 从下拉菜单中选择小组。列表包含教会中的每个小组，而不仅仅是你所属的小组。
3. 选择纳入该小组的是**所有活动**，还是**特定活动**。
4. 点击 **Save**。

每个活动在日历上只会出现一次。如果你添加了整个小组，那么之前已逐个添加的活动会被合并到该小组条目中；而对于已在日历中的小组，再从中选择特定活动不会新增任何内容。只有作为整体添加的小组才会列在 **Groups in Calendar** 中。

### 导入 .ics 文件

点击 **Import .ics**，即可从其他日历导入活动。选择活动应归属的 **Group**（小组），然后点击 **Choose .ics file**（选择 .ics 文件）或粘贴文件内容，再点击 **Import**。活动会在该小组中创建，同时该小组会被添加到你导入时所用的日历中，因此活动会立即显示在那里。

### 从日历中移除活动

点击日历上的某个活动，然后点击 **Remove from Calendar**（从日历中移除）。这只会将该活动从此日历中移除，活动本身仍保留在其所属小组中。如果该活动是因为整个小组被添加而出现在日历中，移除它会将该小组的所有活动都从此日历中移除（活动仍保留在小组中）。若要永久删除某个活动，请从[小组日历](../groups/group-calendar.md)中将其删除。

:::tip
将小组关联到日历，是自动汇总活动的好方法。当小组负责人将活动添加到其[小组](../groups/creating-groups.md)中时，它就会自动进入全教会的日历，无需你额外操作。
:::

:::info
如果你想创建一个汇集全教会多个小组活动的日历，请参阅[精选日历](curated-calendar)，了解更简便的做法。
:::

## 添加和编辑活动 {#adding-and-editing-events}

在日历详情页点击 **New Event** 即可添加活动，或在日历上点击某个活动，然后点击 **Edit** 进行修改。**New Event** / **Edit Event** 表单包含以下字段：

- **Group**（小组）—— 活动所属的小组。如果你的教会设有活动模板，还可以选择 **Template**（模板）来填充表单。
- **Title**（标题）
- **Event photo**（活动照片）—— 点击 **Add Photo**（或空白的照片框）选择或上传图片，图片会被裁剪为宽屏的 16:9 比例。点击 **Change Photo** 可更换照片。照片会显示在网站上该活动页面的顶部；当日历元素显示 **Upcoming events**（即将举行的活动）时，它也会作为活动的卡片图片出现（参见[在网站上展示活动](#showing-events-on-your-website)）。
- **Description**（描述）—— 显示在网站上该活动的页面中。支持粗体文字、列表和链接。
- **Start** 和 **End**（开始和结束）、**Repeats**（重复）以及 **Visibility**（可见性）——可选择 **Public**（公开）或 **Private**（私密）。
- **Tags**（标签）—— 以逗号分隔的标签，例如 `youth, students`。网站上的日历元素可以设置为仅显示带有某个标签的活动。这与活动报名设置中显示的 **Tags** 字段是同一个字段。
- **Who can view notes**（谁可以查看备注）和 **Who can post notes**（谁可以发布备注）—— 决定谁可以阅读和添加活动备注（参见[活动备注](#event-notes)）。可选择 **Staff only**（仅工作人员，默认）、**Group leaders**（小组负责人，即活动所属小组的负责人）或 **Group members**（小组成员，即活动所属小组中的所有人，包括负责人）。
- **Rooms**（房间）和 **Resources**（资源）—— 为活动预留场地和设备。请参阅[房间、资源与排程](rooms-resources)。

点击 **Save**。如果活动是重复的，B1 会要求你确认，因为保存会更新该系列中的每一次出现。

### 活动备注 {#event-notes}

每个活动都有自己的备注线程，用于规划和跟进。在日历详情页点击某个活动，对话框会显示活动详情、提醒，以及下方的 **Notes**（备注）。输入备注并发布，即可将其添加到线程中。

具有编辑内容或管理日历权限的工作人员始终可以阅读和发布活动备注。活动上的 **Who can view notes** 和 **Who can post notes** 设置决定该活动所属小组的负责人或成员是否也能阅读和发布备注。

### 在网站上展示活动 {#showing-events-on-your-website}

要在网站上展示日历，请在页面中添加 **Calendar** 元素，并选择此日历。该元素可以显示月历，也可以显示即将举行的活动卡片网格，还可以限定只显示带有某个标签的活动。访客点击某个活动即可打开其专属的活动页面。参见[使用日历元素](../website/page-editor.md#using-the-calendar-element)。

## 开启活动报名 {#enabling-event-registration}

你可以为任何日历活动开启报名，让成员通过 B1 网站或移动应用报名。

1. 点击现有活动，或创建新活动。
2. 在活动编辑器中，将 **Registration** 开关打开。
3. 配置报名设置：
   - **Capacity**（名额，可选）—— 设置最大报名人数。留空表示不限人数。
   - **Registration Opens**（报名开始）—— 报名开放的日期和时间。
   - **Registration Closes**（报名截止）—— 报名结束的日期和时间。
   - **Tags**（标签）—— 以逗号分隔的标签（例如 "youth, retreat, vbs"），用于对可报名的活动进行分类。
   - **Registration Questions**（报名问题）—— 可选择附加一个[表单](../forms/creating-forms.md)，让报名者在报名时回答额外的问题（例如饮食限制、T 恤尺码、紧急联系人等）。选择 **None** 可跳过问题。
   - **Enable Waitlist**（开启候补名单）—— 活动名额已满时，允许更多报名者加入候补名单，而不是被拒绝。参见[付费报名](paid-registrations#waitlist)。
4. 保存活动。

对于付费活动，同一设置页面还可以让你定义带价格的 **Attendee Types**（参与者类型）、可选的 **Selections**（附加选项）以及 **Discount Codes**（折扣码），费用通过教会的捐赠服务商收取。完整说明请参阅[付费报名](paid-registrations)。

开启报名后，成员在[B1 网站](../../b1-church/events/registering)或 [B1 移动应用](../../b1-mobile/events/registering)上查看该活动时，会看到 **Register for this Event**（报名参加此活动）按钮。如果你附加了表单，报名者在报名过程中会看到 **Questions**（问题）步骤，他们的回答会与报名信息一同保存。

:::info
报名问题仅适用于**未**标记为受限（Restricted）的表单。受限表单会在报名过程中被自动跳过而不显示，因此在为活动附加问题时，请使用未受限的表单。
:::

### 管理报名

要查看和管理活动的报名：

1. 在 Jump 菜单中，选择 **Calendars > Registrations**。
2. 你会看到一个表格，列出所有已开启报名的活动，显示活动标题、日期、当前报名人数与名额的对比以及标签。
3. 点击某个活动，即可查看完整的报名列表，包括姓名、人数、参与者类型、付款状态和报名日期。
4. 在详情页中，你可以：
   - **Add Attendee**（添加参与者）—— 为通过线下或电话报名的人员手动登记报名。
   - **Cancel**（取消）个别报名
   - **Delete**（删除）报名（永久删除）
   - **Promote**（转正）候补中的报名，当有名额空出时使用
   - **Export CSV**（导出 CSV）—— 下载全部报名信息，包括参与者类型、附加选项、付款金额和问题回答

如果活动附加了报名问题，详情页还会显示 **Unanswered questions only**（仅显示未回答问题）筛选器，方便快速找到尚未提交答复的报名者；每条已回答的报名旁边还有 **View Answers**（查看答复）按钮，可查看其回答。付费活动会增加 **Type**（类型）列、**Paid / Total**（已付 / 总额）列、各类型的人数统计以及付款详情对话框，参见[付费报名](paid-registrations#the-registration-roster)。

:::tip
使用名额进度条可以监控活动报名的满员速度。当活动达到或超过名额时，进度条会变为红色。
:::

## 后续步骤

- [精选日历](curated-calendar) —— 创建一个汇集多个小组活动的日历
- [付费报名](paid-registrations) —— 参与者类型、附加选项、折扣码、付款和候补名单
- [活动报名指南](../guides/event-registration) —— 设置活动报名的分步指南
- [日历概览](./) —— 返回日历概览页
