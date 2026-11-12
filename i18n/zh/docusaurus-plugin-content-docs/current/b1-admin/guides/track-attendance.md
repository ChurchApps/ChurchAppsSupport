---
title: "指南：统计教会出席人数"
description: "在 B1 Admin 中统计教会出席人数：设置堂会与礼拜时间，通过手动记录或自助报到方式登记，并查看报表。"
---

# 统计教会出席人数

<div class="article-intro">

为礼拜和小组设置出席统计——从配置堂会与礼拜时间，到手动登记或通过自助报到应用程序登记，再到在报表中查看趋势。完成后，你将全面掌握谁在何时出席。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 具有管理员权限的 B1 Admin 账户
- [已添加到通讯录的人员](../people/adding-people.md)
- 为你想统计的事工[建立的小组](../groups/creating-groups.md)

</div>

## 步骤 1：配置堂会与礼拜 {#step-1-configure-campuses--services}

定义教会聚会的地点与时间。

请按照[出席设置](../attendance/setup.md)指南完成以下操作：

1. 在[快速菜单](../introduction.md#getting-around-with-the-jump-menu)中，选择 **People > Attendance**，然后点击 **Setup**
2. 添加你的堂会（例如「主堂」）及其礼拜
3. 添加礼拜时间（例如「周日上午 9:00」、「周日上午 11:00」、「周三晚上 7:00」）

## 步骤 2：开启小组出席统计 {#step-2-enable-group-attendance-tracking}

为你想监测的小组开启出席统计。

请按照[建立小组](../groups/creating-groups.md)指南完成以下操作：

1. 打开每个要统计的小组，点击 **Edit**，并将 **Track Attendance** 设置为 **Yes**
2. 如果小组是在某场礼拜期间聚会，请在 **Add Service Time** 中选择时间并点击加号按钮，使出席记录能对应到正确的礼拜，然后点击 **Save**

:::info
并非每个小组都需要统计出席。请为想要监测参与情况的小组开启此功能，例如儿童班、小组、主日学等。
:::

## 步骤 3：手动登记出席 {#step-3-record-attendance-manually}

勾选每场礼拜和每个小组的出席者。

请按照[登记出席](../attendance/recording-attendance.md)指南完成以下操作：

1. 打开一个小组，在其 **Sessions** 区块中点击 **All sessions**，点击 **New**，然后选择 **Service Time** 和 **Session Date**。勾选 **Also add for the other _N_ groups in _service time_**，即可一次为该礼拜时间的所有班级建立聚会记录。
2. 勾选出席者，然后点击 **Save Attendance**

如果你只需要总人数而不需要记录姓名（例如主礼拜），请改在 **Attendance** 页面点击 **Enter headcount**，参见[人数登记](../attendance/headcount-entry.md)。

:::tip
手动统计非常适合成人礼拜、小组，以及不便使用报到机的任何情况。
:::

## 步骤 4：设置自助报到（选填） {#step-4-set-up-self-check-in-optional}

让会员使用平板报到机自行报到。

请按照[报到](../attendance/check-in.md)指南完成以下操作：

1. 在平板上安装 B1 Checkin 应用程序，供自助报到使用
2. 会员搜索自己的姓名，为自己和家人办理报到
3. 报到记录会与手动登记的记录一同显示，数据上没有任何差异

:::info
如需完整的儿童事工设置（包括硬件与打印机配置），请参阅[儿童报到指南](./childrens-checkin.md)。
:::

## 步骤 5：查看出席报表 {#step-5-view-attendance-reports}

全面了解教会的参与情况。

请按照[出席报表](../reports/attendance-reports.md)指南操作。在 **Attendance** 页面，点击 **All years**，即可在标签页中找到以下报表：

1. **Attendance Trend**：查看出席人数随时间的变化，以发现增长或下降
2. **Headcount Trend**：绘制你手动输入的人数总计图表
3. **Group Attendance**：查看某个日期范围内每个小组聚会的出席者，并可下载 CSV 文件

若要查看某个小组逐日的人数统计，请打开 **admin.b1.church/reports/dailyGroupAttendance** 中的 **Daily Group Attendance** 报表。

:::info
出席报表同时包含手动登记和自助报到的出席记录。两种方式的数据显示方式没有区别，都会汇入同一份报表。
:::

## 完成！ {#youre-done}

你的出席统计已设置完成。无论你是手动登记、使用报到应用程序，还是两者并用，所有数据都会汇入同一份报表，让你清楚掌握教会的参与情况。

## 相关文章 {#related-articles}

- [出席设置](../attendance/setup.md)：配置堂会与礼拜
- [人数登记](../attendance/headcount-entry.md)：在不记录姓名的情况下登记总人数
- [登记出席](../attendance/recording-attendance.md)：手动登记出席
- [统计出席](../attendance/tracking-attendance.md)：查看出席趋势
- [报到](../attendance/check-in.md)：自助报到应用程序
- [建立小组](../groups/creating-groups.md)：设置含出席统计的小组
- [出席报表](../reports/attendance-reports.md)：查看出席趋势
- [儿童报到指南](./childrens-checkin.md)：完整的儿童事工报到设置
