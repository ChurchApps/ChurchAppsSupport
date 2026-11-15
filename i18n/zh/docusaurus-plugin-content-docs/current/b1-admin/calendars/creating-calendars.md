---
title: "创建日历"
description: "在 B1 Admin 中创建日历，关联小组或导入 .ics 文件，并在一处统一管理其活动、报名和备注。"
---

# 创建日历

<div class="article-intro">

在 B1 Admin 中创建日历，可以通过关联一个或多个小组，构建一个精选的活动视图。活动由小组负责人在各自小组内管理，而日历会将这些活动集中显示在一处。具有编辑权限的管理员可以为任何小组添加或编辑活动。非管理员身份的小组负责人只能管理其所负责小组的活动。

</div>

## 培训视频 {#training-video}

<YouTube id="Ko3kgsCSLFs" title="在 B1 中创建日历、活动和场地预订" next="B1 中的活动报名和付费活动" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>开始之前</h4>

- 设置好你希望纳入日历的活动所属的[小组](../groups/creating-groups.md)
- 你需要 **Edit Content** 权限

</div>

## 创建新日历 {#creating-a-new-calendar}

1. 在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Calendars**，然后点击 **Calendars**。
2. 点击页面顶部的 **Add Calendar**。新日历表单会在日历列表下方打开。
3. 输入 **Calendar Name**（例如"青少年事工活动"或"主堂日历"）。
4. 点击 **Create** 保存新日历。

之后若要重命名或删除日历，请将鼠标悬停在"Calendars"页面上该日历所在的行，然后点击 **Edit**（或在日历的详情页面点击 **Edit**）。

## 日历详情页面 {#the-calendar-detail-page}

创建日历后，点击其名称（或将鼠标悬停在该行上并点击 **Manage Events**）即可打开详情页面。此页面包含两个主要区域：

- **左侧栏**——日历名称及其操作（**New Event**、**Edit**、**Import .ics** 和 **Print**）、指向任何待审批项目的链接，以及 **Groups in Calendar** 列表，显示本日历包含哪些小组。点击某个小组旁边的 **Remove** 即可将其从日历中移除。
- **主区域**——**Calendar Events** 视图，显示从已关联小组汇入的活动，其上方有 **Subscribe** 和 **Add Group** 按钮。使用 **Today**、**Back**、**Next** 以及 **Month**、**Week**、**Day** 和 **Agenda** 视图进行浏览。每项活动都以其所属小组的颜色显示。颜色会自动分配，且同一小组在每个日历上颜色都相同。

点击 **Print** 可打印月历。打印件顶部会显示教会的浅色背景徽标（若你已在[外观](../website/appearance.md)中设置），随后是教会名称和日历名称。活动名称会换行显示，而不会被截断，同时保留小组颜色。

## 关联小组 {#connecting-groups}

在日历中有活动的小组会自动出现在详情页面左侧的 **Groups in Calendar** 列表中。

1. 点击日历上方的 **Add Group**，将一个小组关联到你的日历。
2. 在 **Select a Group** 中选择小组。列表包括教会中的每个小组，而不仅限于你所属的小组。
3. 选择 **Add all the events of the group**（添加该小组的所有活动），或选择 **Add specific events**，然后在出现的小型日历上点击你想要的每个活动。
4. 点击 **Save**。

每个活动在日历上只会出现一次。如果你添加了整个小组，那么你之前已逐个添加的该小组活动会合并到小组条目中；而从已在日历上的小组中选择特定活动则不会新增任何内容。只有作为整体添加的小组才会列在 **Groups in Calendar** 下。

### 导入 .ics 文件 {#importing-an-ics-file}

点击 **Import .ics**，即可从其他日历导入活动。选择活动应归属的 **Group**，然后点击 **Choose .ics file** 或粘贴文件内容，再点击 **Import**。活动会在该小组中创建，并且该小组会被添加到你导入的日历中，因此活动会立即显示在那里。

### 从日历中移除活动 {#removing-an-event-from-the-calendar}

点击日历上的某个活动，然后点击 **Remove from Calendar**。这只会将该活动从本日历中移除——活动本身仍保留在其小组中。如果该活动是因为整个小组被添加而出现在日历上，移除操作会将该小组的所有活动都从本日历中移除（活动仍保留在小组中）。若要永久删除某个活动，请从[小组日历](../groups/group-calendar.md)中将其删除。

:::tip
将小组关联到日历，是自动汇总活动的有效方式。当小组负责人将活动添加到其[小组](../groups/creating-groups.md)中时，该活动便会自动汇入你的全教会日历，无需你额外操作。
:::

:::info
如果你希望创建一个从教会中多个小组汇集活动的单一日历，请参阅[精选日历](./curated-calendar.md)，了解更简便的做法。
:::

## 添加和编辑活动 {#adding-and-editing-events}

在日历详情页面点击 **New Event** 即可添加活动；若要修改某个活动，请点击日历上的该活动，然后点击 **Edit**。**New Event** / **Edit Event** 表单包含以下字段：

- **Group**——活动所属的小组。如果你的教会设有活动模板，还可以选择 **Template** 来填充表单。
- **Title**（标题）
- **Event photo**（活动照片）——点击 **Add Photo**（或空白照片框）选择或上传图片，图片会被裁剪为宽幅 16:9 比例。点击 **Change Photo** 可替换照片。该照片会显示在你网站上活动页面的顶部，并在日历组件显示 **Upcoming events**（即将举行的活动）时作为其卡片图片（参见[在网站上显示活动](#showing-events-on-your-website)）。
- **Description**（说明）——显示在你网站上的活动页面中。支持粗体文字、列表和链接。
- **Start** 和 **End**、**Repeats**（重复）以及 **Visibility**（可见性）——**Public**（公开）或 **Private**（私密）。
- **Tags**（标签）——以逗号分隔的标签，例如 `youth, students`。网站上的日历组件可以设置为仅显示带有特定标签的活动。这与活动报名设置中显示的 **Tags** 字段相同。
- **Who can view notes**（谁可以查看备注）和 **Who can post notes**（谁可以发布备注）——决定谁可以阅读和添加活动备注（参见[活动备注](#event-notes)）。可选择 **Staff only**（仅工作人员，默认值）、**Group leaders**（小组负责人，即该活动所属小组的负责人）或 **Group members**（小组成员，即该活动所属小组的全体成员，包括负责人）。
- **Rooms**（房间）和 **Resources**（资源）——为活动预留场地和设备。参见[房间、资源与排期](./rooms-resources.md)。选定后，你还可以添加准备和收拾时间，或设置自定义预留时段——参见[预订房间或资源](./availability.md#booking-a-room-or-resource)。
- **Reminders**（提醒）——展开此部分，可在活动前发送提醒。参见[活动提醒](./event-reminders.md)。

**Group**、**Title**、**Start** 和 **End** 为必填项，且结束时间必须晚于开始时间。点击 **Save** 保存。如果活动是重复的，B1 会要求你确认，因为保存操作将更新该系列中的每一次安排。若要删除活动，请在编辑器中打开该活动并点击 **Delete**。

### 活动备注 {#event-notes}

每个活动都有自己的备注讨论串，用于计划和跟进。在日历详情页面点击某个活动；对话框会显示该活动的详细信息、其提醒，以及下方的 **Notes**，并附有 **Edit**、**Manage Registrations** 和 **Remove from Calendar** 按钮。输入备注并发布，即可将其添加到讨论串中。

拥有编辑内容或管理日历权限的工作人员始终可以阅读和发布活动备注。活动上的 **Who can view notes** 和 **Who can post notes** 设置则决定该活动所属小组的负责人或成员是否也能阅读和发布。

### 在网站上显示活动 {#showing-events-on-your-website}

若要在你的网站上展示日历，请在页面中添加一个 **Calendar** 组件，并选择此日历。该组件可以显示月历或即将举行的活动卡片网格，并且可以限定为仅显示带有某个标签的活动。访客点击某个活动即可打开其专属的活动页面。参见[使用日历组件](../website/page-editor.md#using-the-calendar-element)。

## 开启活动报名 {#enabling-event-registration}

你可以为任何日历活动开启报名，使成员能够通过 B1 网站或移动应用报名。

1. 在日历上点击一个已有活动（如尚未创建，请先创建），然后点击 **Manage Registrations**。活动的报名页面会打开。（在 **Registrations** 页面上点击 **Turn on registration** 按钮，会带你进入日历以选择活动。）
2. 点击 **Edit settings**，然后在 **Registration Settings** 卡片中开启 **Enable Registration**。
3. 配置报名设置：
   - **Capacity**（名额，可选）——设置报名人数上限。留空则不限名额。
   - **Registration Opens**（报名开始）——报名开放的日期和时间。
   - **Registration Closes**（报名截止）——报名结束的日期和时间。
   - **Tags**（标签）——以逗号分隔的标签（例如"youth, retreat, vbs"），便于对可报名的活动进行分类。
   - **Registration Questions**（报名问题）——可选择附加一个[表单](../forms/creating-forms.md)，使报名人在报名时回答额外的问题（如饮食限制、T 恤尺码、紧急联系人等）。选择 **None** 则跳过问题。
   - **Enable Waitlist**（开启候补名单）——当活动名额已满时，允许更多报名人加入候补名单，而不是被拒之门外。参见[付费报名](./paid-registrations.md#waitlist)。
4. 点击 **Save Settings**。

对于付费活动，同一设置页面还允许你定义有价格的 **Attendee Types**（参与者类型）、可选的 **Selections**（附加选项）以及 **Discount Codes**（折扣码），付款通过教会的奉献服务提供商收取。完整操作说明请参阅[付费报名](./paid-registrations.md)。

开启报名后，成员在 [B1.church 或 B1 应用中](../../b1-church/events/registering.md)查看活动时，将看到 **Register for this Event** 按钮。如果你附加了表单，报名人在报名过程中会看到 **Questions** 步骤，其回答将与报名信息一并保存。

:::info
报名问题仅适用于**未**标记为受限（Restricted）的表单。受限表单在报名过程中会被自动跳过而不会显示，因此在为活动附加问题时，请使用未受限的表单。
:::

### 管理报名 {#managing-registrations}

若要查看和管理活动的报名情况：

1. 在跳转菜单中，选择 **Calendars > Registrations**。
2. 你会看到一个表格，列出所有已开启报名的活动，显示活动标题、日期、当前报名人数与名额的对比，以及标签。在 **Search events** 中输入内容即可筛选。
3. 点击某个活动的名称，即可查看完整的报名列表，其中包括 **Name**、**Members**、**Type**、**Paid / Total**、**Status** 和 **Date** 列。
4. 在详情页面，你可以：
   - **Add Attendee**（添加参与者）——手动为通过线下或电话报名的人员登记。
   - **Cancel Registration**（取消报名）——针对单个报名（需要确认）
   - **Delete**（删除）报名——永久删除（需要确认）
   - **Promote**（递补）候补报名——当出现空位时
   - **Export CSV**（导出 CSV）——下载所有报名信息，包括参与者类型、附加选项、付款金额和问题回答

   这些行操作以图标的形式位于每一行的末尾；将鼠标悬停在图标上可查看其名称。

如果活动附加了报名问题，详情页面还会显示 **Unanswered questions only**（仅显示未回答的问题）筛选器，用于快速找出尚未提交回答的报名人；每条已回答的报名旁还会有 **View Answers**（查看回答）按钮，用于查看其回复内容。设有参与者类型的活动，还会在表格上方显示各类型的人数统计；每一行都有一个 **Registration Details**（报名详情）对话框，其中包含付款信息——参见[付费报名](./paid-registrations.md#the-registration-roster)。

活动详情页面的左侧会显示已报名的人数（报名人加上其报名中的所有人员），并附有名额进度条、候补人数、活动标签以及 **Reminders**（提醒）。**Registrations** 卡片标题则统计报名次数，这也是名额限制所依据的数字——因此一个四口之家算作一次报名，却是四个人。

:::tip
利用报名页面上的名额进度条，可以监控各活动报名的满额速度。当活动达到或超过名额时，进度条会变为红色。
:::

## 后续步骤 {#next-steps}

- [精选日历](./curated-calendar.md)——创建一个汇集多个小组活动的日历
- [付费报名](./paid-registrations.md)——参与者类型、附加选项、折扣码、付款和候补名单
- [活动报名指南](../guides/event-registration.md)——设置活动报名的分步指南
- [日历概览](./index.md)——返回日历概览
