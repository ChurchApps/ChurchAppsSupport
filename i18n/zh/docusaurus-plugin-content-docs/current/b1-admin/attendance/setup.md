---
title: "考勤设置"
---

# 考勤设置

<div class="article-intro">

在追踪出勤之前，你需要告诉 B1 Admin 教会的实际地点、礼拜的时间，以及每场礼拜有哪些小组参加。这项一次性设置会建立起整个教会出勤追踪和报表的基础结构。

</div>

## 培训视频

<YouTube id="LQPc2gVlXvQ" title="Setting Up Services and Attendance in B1" next="Setting Up Children's Check-In in B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>开始之前</h4>

- 你需要拥有一个启用了 **Edit Services** 考勤权限的 B1 Admin 账号。只有拥有该权限的人员才能看到 **Setup** 选项；仅有查看出勤的权限是不够的。如果你不确定自己的访问级别，请参阅[角色与权限](../people/roles-permissions.md)。
- 如果你计划为礼拜时间分配小组，请先确保[已创建相应的小组](../groups/creating-groups.md)。

</div>

## 核心概念

- **Campus（校区）** —— 教会聚会的实际地点（例如"主校区""北校区"）。校区在 **Settings** 下管理。
- **Service（礼拜）** —— 在某校区定期举行的聚会（例如"星期日礼拜""周间聚会"）。
- **Service Time（礼拜时间）** —— 礼拜举行的具体时间（例如"上午 9:00""上午 11:00"）。
- **Scheduled Group（已安排小组）** —— 分配到特定礼拜时间的小组。出勤是在该礼拜的背景下进行追踪的。
- **Unscheduled Group（未安排小组）** —— 独立追踪出勤、不与任何礼拜时间相关联的小组。

## 设置你的考勤结构

1. 打开 **B1 Admin**，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），并展开 **People**。
2. 点击 **Attendance**，然后点击左侧栏中的 **Setup**。**Service structure** 表格会打开，顶部显示你的校区、礼拜时间，以及已安排和未安排小组的数量。每当你在表格中添加、编辑或删除内容时，这些数字都会立即更新。
3. 点击 **Service structure** 面板右上角的 **Manage Campuses**。这会带你进入 **Settings → Campuses**。点击 **Add Campus**，输入你的地点名称（地址和时区为可选项），然后点击 **Save**。
4. 返回 **People → Attendance**，点击 **Setup**。你的校区现在会出现在设置表格中。
5. 点击校区下方 **Service** 列中的 **+ 按钮**。输入礼拜名称，例如"星期日礼拜"，然后点击 **Save**。
6. 点击该礼拜下方 **Time** 列中的 **+ 按钮**。输入 **Service Time** 名称，例如"9:00 AM"，可选择填写[签到计划](#setting-a-check-in-schedule)，然后点击 **Save**。每个礼拜时间都需重复此步骤。
7. 要将小组关联到礼拜时间，请从 **People > Groups** 打开该小组，点击 **Edit**，然后使用 **Add Service Time**——参见下一节。

### 为小组启用 Track Attendance

在为某个小组记录出勤之前，必须先为该小组开启 Track Attendance。

1. 在快速跳转菜单中，选择 **People > Groups** 并选中该小组。
2. 点击小组名称下方的 **Edit** 按钮。
3. 将 **Track Attendance** 设为 **Yes**。
4. 点击 **Save**。

:::tip
如果你在上一步中已为小组分配了礼拜时间，还可以在小组的编辑页面中使用 **Add Service Time** 选项，将其关联到正确的礼拜。这样可以确保场次与正确的校区和时间相连。
:::

:::tip
如果某个小组在常规礼拜之外聚会——例如一个独立追踪出勤的周间小组——你可以将其保留为未安排小组。它仍会出现在 **Group Attendance** 报表中，用于出勤统计。
:::

## 设置签到计划 {#setting-a-check-in-schedule}

每个礼拜时间都可以设置一个可选的签到计划，使[自助签到](check-in.md)每周自动开放和关闭。如果没有设置计划，该礼拜时间的签到将一直可用（除非因其他原因，例如房间已满而关闭）。

1. 在 **Setup** 视图中，点击 **Time** 列中某个礼拜时间的名称（或添加一个新的礼拜时间）。
2. 在 **Check-in Schedule** 下，选择该礼拜时间举行的**星期**。
3. 设置 **Start Time**，并可选择设置 **End Time**。
4. 输入 **Open check-in (minutes before start)**——例如，填写 `30` 表示在礼拜开始前半小时开放签到。
5. 输入 **Close check-in (minutes after end)**——例如，填写 `15` 表示在结束时间后 15 分钟仍保持签到开放。如果你没有设置结束时间，则从开始时间计算。
6. 点击 **Save**。

该计划每周重复一次，并以礼拜所在校区的时区为准。如果该校区未设置时区，则使用教会的[时区](../settings/church-settings.md#time-zone)；若仍未设置，则依次使用第一个设有时区的校区的时区，最后使用美国东部时间（America/New_York）。如果签到在错误的时间开放，请检查[校区](../settings/campuses.md)中该校区的 **Time Zone**。要删除计划，请将 **Day** 改回 **No schedule**，然后点击 **Save**。只有同时设置了 **Day** 和 **Start Time**，计划才会生效。

当礼拜时间的签到窗口关闭时：

- **B1.church 上的自助签到** 会将该礼拜时间显示为 **Closed**（或例如 **Closed · opens Sun 9:30 AM**），且无法选择。如果某场礼拜的所有时间都未开放，家庭会看到签到何时开放的提示，例如"签到将于周日 9:30 AM 开放"。
- **B1 Checkin 自助机应用** 同样会将该礼拜时间显示为 **Closed** 并附上开放时间。如果某场礼拜的所有时间都已关闭，自助机会提示该礼拜的签到何时开放。已在某个已关闭的礼拜时间签到的人员，其小组会显示为 **Checked in**。如果签到过程中窗口恰好关闭，自助机将无法完成签到，并显示 **Can't check in yet** 屏幕，列出受影响的房间，以便家庭选择其他房间。

同一家庭如果已为较早的礼拜时间签到，即使较早的时间窗口已经关闭，仍可以回来添加一个仍处于开放状态的较晚礼拜时间。他们之前的签到记录会被保留。

:::tip
将开放窗口设置得宽裕一些（例如开始前 45 分钟），以便提前到达的家庭和志愿者能够签到；将关闭窗口设置得较短，以便迟到者在礼拜开始后仍能签到。
:::

## 编辑你的设置

你可以随时更新设置。选择某个校区、礼拜时间或小组，然后点击 **Edit** 修改其详情，或点击 **Delete** 将其删除。

:::info
删除礼拜时间不会删除过去的出勤记录。即使你更改了时间安排，历史数据也会被保留。
:::

## 下一步

当校区、礼拜时间和小组设置完毕后，你就可以开始[手动记录出勤](recording-attendance.md)，或为礼拜设置[自助签到](check-in.md)了。
