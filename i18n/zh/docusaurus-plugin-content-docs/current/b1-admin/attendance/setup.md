---
title: "考勤设置"
description: "在 B1 Admin 中设置堂区、聚会、聚会时间和小组分配，使考勤跟踪和签到时间表在整个教会中正常运作。"
---

# 考勤设置

<div class="article-intro">

在跟踪考勤之前，你需要告诉 B1 Admin 教会的实际地点、聚会的举行时间，以及每场聚会有哪些小组参加。这项一次性设置将创建支撑教会所有考勤跟踪和报表的基础结构。

</div>

## 培训视频 {#training-video}

<YouTube id="LQPc2gVlXvQ" title="在 B1 中设置聚会和考勤" next="在 B1 中设置儿童签到" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要一个拥有 **Edit Services** 考勤权限的有效 B1 Admin 账户。只有拥有该权限的人员才能看到 **Setup** 选项；仅查看考勤是不够的。如果你不确定自己的访问级别，请参阅[角色与权限](../people/roles-permissions.md)。
- 如果你计划为聚会时间分配小组，请先确保已[创建小组](../groups/creating-groups.md)。

</div>

## 核心概念 {#key-concepts}

- **堂区（Campus）**——教会聚会的实际地点（例如"主堂区""北堂区"）。堂区在 **Settings** 下管理。
- **聚会（Service）**——在某个堂区定期举行的聚会（例如"主日崇拜""周间聚会"）。
- **聚会时间（Service Time）**——聚会举行的具体时间（例如"上午 9:00""上午 11:00"）。
- **已排定小组（Scheduled Group）**——分配到特定聚会时间的小组。考勤在该聚会的语境下进行跟踪。
- **未排定小组（Unscheduled Group）**——自行跟踪考勤、未与聚会时间关联的小组。

## 设置考勤结构 {#setting-up-your-attendance-structure}

1. 打开 **B1 Admin**，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），然后展开 **People**。
2. 点击 **Attendance**，再点击左侧栏中的 **Setup**。**Service structure** 表格会打开，顶部显示堂区、聚会时间、已排定和未排定小组以及小组总数的统计。你在表格中添加、编辑或删除任何内容时，统计数字都会立即更新。每个堂区会列出其聚会、各聚会的时间以及分配到每个时间的小组，并按类别分组（服事团队会显示在其所属事工的名称下）。已跟踪考勤但没有聚会时间的小组会列在底部的 **Unassigned** 下。
3. 点击 **Manage Campuses**（位于 **Service structure** 面板右上角）。这会带你进入 **Settings → Campuses**。点击 **Add Campus**，输入地点名称（地址和时区为可选项），然后点击 **Save**。
4. 返回 **People → Attendance**，点击 **Setup**。你的堂区现在会出现在设置表格中。
5. 点击堂区下方 **Service** 列中的 **+ 按钮**。输入聚会名称，例如"主日崇拜"，然后点击 **Save**。
6. 点击聚会下方 **Time** 列中的 **+ 按钮**。输入 **Service Time** 名称，例如"上午 9:00"，可选择填写[签到时间表](#setting-a-check-in-schedule)，然后点击 **Save**。每个聚会时间都需重复此操作。
7. 要将小组关联到某个聚会时间，请从 **People > Groups** 打开该小组，点击 **Edit**，然后使用 **Add Service Time**——参见下一节。

### 为小组启用 Track Attendance {#enabling-track-attendance-on-a-group}

在为小组记录考勤之前，必须先为该小组开启 Track Attendance。

1. 在跳转菜单中，选择 **People > Groups** 并选中该小组。
2. 点击小组名称下方的 **Edit** 按钮。
3. 将 **Track Attendance** 设置为 **Yes**。
4. 点击 **Save**。

:::tip
如果你在上一步中已为小组分配了聚会时间，还可以在小组的编辑界面使用 **Add Service Time** 选项，将其关联到正确的聚会。这可确保聚会记录与正确的堂区和时间相连。
:::

:::tip
如果某个小组在常规聚会之外聚会——例如一个自行跟踪考勤的周间小组——你可以将其保留为未排定小组。它仍会出现在**小组考勤**报表中，用于考勤统计。
:::

## 设置签到时间表 {#setting-a-check-in-schedule}

每个聚会时间都可以选择设置签到时间表，使[自助签到](check-in.md)每周自动开启和关闭。若未设置时间表，该聚会时间的签到将随时可用（前提是教室未因其他原因关闭，例如已满员）。

1. 在 **Setup** 视图中，点击 **Time** 列中某个聚会时间的名称（或添加一个新的聚会时间）。
2. 在 **Check-in Schedule** 下，选择该聚会时间举行的**星期**。
3. 设置 **Start Time**，并可选择设置 **End Time**。
4. 输入 **Open check-in (minutes before start)**——例如 `30` 表示在聚会开始前半小时开放签到。
5. 输入 **Close check-in (minutes after end)**——例如 `15` 表示在结束时间后 15 分钟内仍开放签到。若未设置结束时间，则从开始时间起算。若 **End Time** 和 **Close check-in** 均留空，则签到将一直开放至当天结束。
6. 点击 **Save**。

该时间表每周重复，并以聚会所在堂区的时区为准。若该堂区未设置时区，则使用教会的[时区](../settings/church-settings.md#time-zone)；若仍未设置，则使用第一个已设置时区的堂区的时区；最后，使用美国东部时间（America/New_York）。如果签到开放的时间不对，请检查[堂区](../settings/campuses.md)中该堂区的 **Time Zone**。若要删除时间表，请将 **Day** 设回 **No schedule**，然后点击 **Save**。只有同时设置了 **Day** 和 **Start Time**，时间表才会生效。

当某个聚会时间的签到窗口关闭时：

- **B1.church 上的自助签到**会将该聚会时间列为 **Closed**（或例如 **Closed · opens Sun 9:30 AM**），且无法选择。如果某场聚会的所有时间都未开放，家庭会看到签到何时开始，例如"签到将于主日上午 9:30 开始"。
- **B1 Checkin 签到亭应用**同样会将该聚会时间显示为 **Closed** 并说明何时开放。如果某场聚会的所有时间都已关闭，签到亭会显示该聚会何时开始签到。已在已关闭的聚会时间签到的人员，其小组会改为显示 **Checked in**。如果签到过程中窗口恰好关闭，签到亭将无法完成签到，并显示 **Can't check in yet** 页面，列出受影响的教室，以便家庭选择其他教室。

已为较早的聚会时间签到的家庭，即使较早的窗口已经关闭，仍可以返回并添加一个仍开放的较晚聚会时间。他们原有的签到记录会被保留。

:::tip
将开放窗口设置得宽裕一些（例如开始前 45 分钟），以便提早到达的家庭和志愿者能够签到；将关闭窗口设置得短一些，以便迟到者在聚会开始后仍可签到。
:::

## 编辑设置 {#editing-your-setup}

你可以随时更新设置：

- **聚会和聚会时间**——点击表格中某个聚会或聚会时间的名称，即可打开其表单。修改详情后点击 **Save**，或点击 **Delete** 将其删除。
- **堂区**——点击 **Manage Campuses**，在 **Settings** 下添加、重命名或删除堂区。
- **小组**——点击小组名称将其打开，然后点击 **Edit** 以更改其聚会时间，或开启/关闭 **Track Attendance**。

表格顶部的 **Check-in kiosk, QR, and labels** 按钮会带你进入 [B1 CheckIn 设置](check-in.md)。

:::info
删除某个聚会时间不会删除过去的考勤记录。即使你更改了时间表，历史数据也会被保留。
:::

## 后续步骤 {#whats-next}

当堂区、聚会时间和小组都设置完成后，你就可以开始手动[记录考勤](recording-attendance.md)，或为聚会设置[自助签到](check-in.md)了。
