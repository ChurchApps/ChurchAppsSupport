---
title: "出勤报表"
description: "了解 B1 Admin 的三份出勤报表（出勤趋势、小组出勤和每日小组出勤）各自显示的内容，以及运行和导出它们的步骤。"
---

# 出勤报表

<div class="article-intro">

B1 Admin 提供三份出勤报表，帮助你了解人们如何参与你的礼拜和小组。每份报表都从不同角度展示你的出勤数据，从宏观趋势到每日明细，应有尽有。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 请确保你的礼拜和小组的出勤[被持续记录](../attendance/tracking-attendance.md)
- 确保你的[小组](../groups/creating-groups.md)和礼拜已在 B1 Admin 中配置完成
- 你需要具备查看报表的相应[权限](../settings/roles-permissions.md)

</div>

## 出勤趋势 {#attendance-trend}

出勤趋势报表显示你的礼拜出勤随时间的变化情况。

1. 在浏览器中直接访问 **admin.b1.church/reports/attendanceTrend**（报表没有导航菜单入口，收藏该地址是最便捷的返回方式）。同一报表也位于出勤页面中：点击 **All years**，然后选择 **Attendance Trend** 标签页。
2. 可选择 **Campus**、**Service**、**Service Time** 或 **Group** 来筛选结果。
3. 设置 **Start Date** 和 **End Date**。默认情况下，报表涵盖过去一年，即从一年前到今天，且结束日期会完整包含在内。点击 **Run Report**。
4. 报表会以柱状图和表格的形式显示每周的总访问人次。每周以该周周日的日期标注，表格中的 **Session Dates** 列列出该周内有出勤记录的实际日期（例如 "9/27, 9/30"）。

这份报表有助于发现季节性下降、增长趋势或特殊活动的影响等规律。

:::tip
出勤页面的 **All years** 视图在另外两个标签页之间还有一个 **Headcount Trend** 标签页，它以图表形式显示你手动输入的每周总人数（而非个人签到记录）。它的筛选条件与 **Campus**、**Service**、**Service Time** 和 **Group** 相同。
:::

## 小组出勤 {#group-attendance}

小组出勤报表显示指定日期范围内每次小组聚会的出席人员。

1. 在浏览器中直接访问 **admin.b1.church/reports/groupAttendance**，或在出勤页面点击 **All years**，然后选择 **Group Attendance** 标签页。
2. 可选择 **Campus** 和 **Service** 进行筛选。
3. 设置 **Start Date** 和 **End Date**。默认情况下，报表涵盖上周日至今天，且结束日期会完整包含在内。
4. 点击 **Run Report**。

结果按聚会日期、再按礼拜时间、最后按小组分组，每个小组下列出出席的人员。礼拜时间、小组和姓名均按字母顺序排列。在每个人的姓名旁边，**Checked In** 列显示其出勤记录的时间（若无记录则留空），**Membership Status** 列显示其身份状态，例如 Member（会员）或 Visitor（访客）。对于不在某个礼拜时间聚会的小组，其聚会记录同样会包含在内，但会显示为没有礼拜时间。

要下载电子表格，请点击 **Download Options** 并选择 **Summary**。生成的 CSV 文件包含以下内容：

- 每个在日期范围内聚会过的小组中，每位成员占一行，按小组再按姓名排序。
- 前几列为人员姓名和小组名称。
- 每个有日期的聚会占一列，列名由礼拜、礼拜时间和日期组成（例如 "Sunday - 9:00 AM (2026-09-27)"），每人标注 **present**（出席）或 **absent**（缺席）。没有礼拜时间的聚会仅以日期命名。

利用这份报表可以比较各小组之间的出勤情况，找出哪些小组正在增长，哪些需要关注。

## 每日小组出勤 {#daily-group-attendance}

每日小组出勤报表（标题为 **Group attendance by day**，即"按日显示的小组出勤"）按天统计某一个小组的出席人数。

1. 在浏览器中直接访问 **admin.b1.church/reports/dailyGroupAttendance**。
2. 使用 **Campus**、**Service** 和 **Service Time** 下拉菜单缩小列表范围，然后选择你要查看的 **Group**。
3. 运行报表。它会按时间从早到晚列出该小组聚会的每一天，并显示 **Date**（日期）以及当天记录的 **Attendees**（出席人数）。

这份报表提供了更细致的明细，有助于了解每周之间的波动，或找出出勤异常高或低的特定日期。

:::tip
需要宏观概览时使用出勤趋势报表；需要深入查看具体日期时，使用每日小组出勤报表。
:::

## 实际用途 {#practical-uses}

- **规划** -- 利用出勤趋势为即将到来的礼拜安排座位、人手和资源。
- **外展** -- 及早发现出勤下降的迹象，以便跟进会众。
- **董事会报告** -- 将出勤数据纳入定期的领导层报告，展示事工的健康状况。
- **活动评估** -- 比较特殊活动前后的出勤情况，衡量其影响。

:::warning
出勤数据是通过你的小组和礼拜签到流程记录的。如果出勤没有被持续记录，报表将无法准确反映实际参与情况。设置说明请参阅[追踪出勤](../attendance/tracking-attendance.md)。
:::
