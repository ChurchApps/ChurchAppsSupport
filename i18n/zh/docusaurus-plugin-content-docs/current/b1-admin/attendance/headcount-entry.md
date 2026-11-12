---
title: "人数登记与趋势"
description: "在 B1 Admin 中无需记名名单，直接登记某个聚会或小组的总人数，并在人数趋势报表中按周查看这些数字。"
---

# 人数登记与趋势

<div class="article-intro">

人数登记让你无需逐一签到名单，即可记录一个简单的总出席人数——可用于某场聚会、某个聚会时间或某个小组。当你只需要知道"当时有多少人在场"时，可以使用此功能，并配合人数趋势报表，按时间查看这些数字的变化。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你的堂区、聚会和聚会时间必须已配置完成。参见[考勤设置](setup.md)。
- 登记人数需要 **Attendance &gt; Edit** 权限；查看趋势报表需要 **Attendance &gt; View** 权限。参见[角色与权限](../settings/roles-permissions.md)。

</div>

:::info
人数登记是[记录考勤](recording-attendance.md)的仅统计总数替代方式。如果你需要知道**是谁**出席了——例如，为了跟进那些已经很久没来的人——请继续在小组的聚会记录中使用记名的聚会考勤。人数登记只保存一个数字。
:::

## 登记人数 {#recording-a-headcount}

1. 打开 **B1 Admin**，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **People**，然后点击 **Attendance**。
2. 点击左侧栏中的 **Enter headcount**。
3. 填写表单：
   - **Service**（*必填*）
   - **Service Time**——保持为 **All service times**，即可记录该聚会所有时间的总人数
   - **Group**——可选；仅列出已启用 Track Attendance 的小组。留空则表示"无小组（整场聚会）"。
   - **Date**
   - **Headcount**——到场人数的总计（整数，0 或更大）
4. 点击 **Save**。

表单旁边的 **Recent Headcounts** 表格会列出你最近几次的登记，包括日期、聚会、聚会时间、小组和人数。如需更正或删除，点击某一行即可将其载入表单。

## 人数趋势报表 {#headcount-trend-report}

1. 在同一个 **Attendance** 页面，点击左侧栏中的 **All years**，然后选择 **Headcount Trend** 标签。
2. 打开标签时报表会自动运行。如需缩小范围，可选择 **Campus**、**Service**、**Service Time** 或 **Group**，然后点击 **Run Report**。报表没有日期筛选器——它会涵盖所有有人数登记的周。

报表会将你登记的人数按周汇总，同时以折线图和表格的形式显示——与[考勤趋势和小组考勤标签](tracking-attendance.md)采用相同的报表样式。为当前周登记的人数也会显示在主考勤页面的 **Headcounts this week** 下方。

## 相关页面 {#related-pages}

- [记录考勤](recording-attendance.md)——按人记名的聚会考勤
- [跟踪考勤](tracking-attendance.md)——考勤和小组趋势报表
- [考勤设置](setup.md)——配置堂区、聚会和聚会时间
