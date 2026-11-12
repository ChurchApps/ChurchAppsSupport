---
title: "跟踪考勤"
description: "查看考勤趋势，按堂区、聚会或小组筛选报表，并从 B1 Admin 的考勤页面导出小组考勤。"
---

# 跟踪考勤

<div class="article-intro">

在配置好堂区、聚会时间和小组之后，B1 Admin 可以让你轻松查看考勤数据并发现趋势。考勤页面默认显示本周考勤的摘要，其 **All years** 报表提供两种主要视图——用于教会整体趋势的 **Attendance Trend** 标签，以及用于小组层面细节的 **Group Attendance** 标签——此外还有一个 **Headcount Trend** 标签，用于查看[人数总计](headcount-entry.md)。利用这些工具，你可以了解增长模式、发现参与度下降的情况，并为教会做出基于数据的决策。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你的考勤结构必须至少设置了一个堂区和一个聚会时间。如果你尚未完成此项，请参阅[考勤设置](setup.md)。
- 报表要显示结果，必须先记录考勤数据。数据可以来自[手动录入](recording-attendance.md)或[自助签到](check-in.md)。

</div>

## 查看考勤趋势 {#viewing-attendance-trends}

1. 打开 **B1 Admin**，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **People**，然后点击 **Attendance**。
2. 点击左侧栏中的 **All years**。默认选中 **Attendance Trend** 标签。
3. 打开该标签时报表会自动运行，显示每周的考勤总数。

:::tip
如需快速查看当前周，主考勤页面会显示本周在场人数、按教室（小组）的细分、访客人数，以及一张 13 周签到柱状图——无需打开报表。
:::

## 筛选数据 {#filtering-your-data}

使用 **Filter Report** 框中的筛选器缩小结果范围，然后点击 **Run Report**：

- **Campus**——选择一个堂区，仅查看该地点的考勤。
- **Service**——将报表限定在某一场聚会。
- **Service Time**——选择某个聚会时间，以深入查看特定的聚会。
- **Group**——仅显示某一个小组的考勤。
- **Start Date** 和 **End Date**——要包含的日期范围。默认情况下，报表涵盖过去一年，即从一年前到今天，且结束日期会完整包含在内。

报表会以柱状图和表格的形式显示每周的总到访人次。点击打印图标即可打印，或使用 **Download Options** 保存数据。每周均以该周主日的日期作为标签。表格还包含 **Session Dates** 列，列出该周内实际有考勤记录的日期（例如"9/27、9/30"），让你能看出周间聚会与主日是否计入同一周。

:::info
每次打开 Attendance Trend 标签时，报表都会自动运行，因此你无需点击刷新按钮，始终可以看到最新的数字。
:::

## 小组考勤 {#group-attendance}

**Group Attendance** 标签显示每次小组聚会的出席人员。当你想关注某个特定班级、事工团队或小组，而不是查看整体聚会人数时，这项功能非常有用。

1. 在 **All years** 报表中，选择 **Group Attendance** 标签。
2. 可选择一个 **Campus** 和 **Service**。
3. 设置 **Start Date** 和 **End Date**。默认情况下，报表涵盖上一个主日至今天。
4. 点击 **Run Report**。

结果会先按聚会日期分组，再按聚会时间和小组分组，每个小组下列出出席的人员。聚会时间、小组和姓名均按字母顺序排列，因此每个标题只会出现一次。每位人员所在的行还会显示 **Checked In** 列（即记录其考勤的时间；若无记录则留空）以及 **Membership Status** 列（例如 Member 或 Visitor），方便你一眼识别访客。

要下载数据，请点击 **Download Options** 并选择 **Summary**。生成的 CSV 文件每位小组成员占一行，按小组再按姓名排序；每个在范围内的已排定聚会日期占一列（例如"Sunday - 9:00 AM (2026-09-27)"），并标记为 **present**（出席）或 **absent**（缺席）。

:::tip
小组考勤对于希望长期追踪本小组参与度的[小组](../groups/creating-groups.md)负责人尤其有价值。
:::

## 使用考勤数据的建议 {#tips-for-using-attendance-data}

- 每月查看趋势，及早发现季节性规律。
- 比较各堂区的数据，了解哪些地点在增长。
- 利用小组层面的报表，跟进[考勤下降的小组](../groups/group-members.md)。
- 将考勤洞察与 [AI 搜索](../people/ai-search.md)工具结合使用，找出近期没有来过的人。

## 相关页面 {#related-pages}

- [记录考勤](recording-attendance.md)——为小组聚会手动录入考勤
- [人数登记与趋势](headcount-entry.md)——更简单的总人数统计方式，附有各自的每周趋势图
- [签到](check-in.md)——设置自助签到，使考勤自动记录
