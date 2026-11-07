---
title: "记录出勤"
description: "在 B1 Admin 中记录每次小组聚会的考勤：创建聚会记录、标记出席人员、保存备注，并打印点名表或导出为电子表格。"
---

# 记录出勤

<div class="article-intro">

设置好校区、礼拜时间和小组后，你就可以在每次聚会结束后手动记录出勤。B1 Admin 以**场次**来组织出勤——每个小组每个聚会日期对应一个场次。你创建场次、标记谁出席，数据便会直接汇入你的出勤报表。

</div>

## 培训视频

<YouTube id="gS8h2rhyMys" title="Recording and Tracking Attendance in B1" next="Creating Plans and Scheduling Volunteers in B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>开始之前</h4>

- 你的校区、礼拜时间和小组必须已经配置完成。如果你还没有完成这些设置，请参阅[考勤设置](setup.md)。
- 你要追踪的小组必须已启用 **Track Attendance**。详情参见[考勤设置](setup.md)。
- 你需要具备 **Edit Attendance** 权限才能保存出勤。仅对人员拥有 **View People Names Only** 权限的志愿者，仍可通过此方式记录出勤——他们可以从**小组**中打开班级，并只看到成员的姓名。参见[仅显示姓名](../settings/roles-permissions.md#people-names-only)。

</div>

## 创建场次

场次代表小组的一次聚会——例如，某个星期日的幼儿园至三年级班。

1. 打开 **B1 Admin**，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **People**，然后点击 **Groups**。
2. 选择你要记录出勤的小组。
3. 在小组页面的 **Sessions** 部分，点击 **All sessions**。
4. 点击 **New** 创建新场次。
5. 如果该小组已分配礼拜时间，请选择 **Service Time**。如果是未安排的小组，则不会出现此字段。
6. 选择 **Session Date**——可以是今天、过去的日期或未来的日期。
7. 点击 **Save**。

### 为礼拜时间内的每个班级添加场次 {#adding-sessions-for-every-class-in-a-service-time}

如果其他小组也在同一礼拜时间聚会（例如，星期日上午 9:00 的所有儿童班），你可以一次性为它们创建场次，而无需逐个访问每个小组。

1. 按照上述步骤操作，并选择一个 **Service Time**。
2. 勾选 **Also add for the other _N_ groups in _service time_**。该复选框会显示分配到该礼拜时间的其他小组数量。只有在添加新场次且至少还有一个其他小组在该时间聚会时，才会出现此复选框。
3. 点击 **Save**。

系统会为当前小组以及同一日期和礼拜时间的其他每个小组创建场次。已在该日期和礼拜时间拥有场次的小组会被跳过，因此不会产生重复记录。

:::tip
你可以为过去的日期创建场次，以补记尚未录入的出勤；也可以提前创建场次，以便小组聚会时场次已准备就绪。
:::

## 场次备注 {#session-notes}

每个场次都可以添加备注——例如讲授内容的摘要、公告或代祷事项。

1. 添加场次时，或点击列表中某场次旁边的 **Edit**（铅笔）图标后，在日期下方的 **Notes (what was covered, announcements, prayer requests)** 文本框中输入内容。工具栏可用于添加粗体文字、列表和链接。
2. 点击 **Save**。

备注会显示在场次出勤列表的顶部。它们也是小组成员在 B1.church 上小组页面的 **Meetings** 部分阅读的聚会备注，小组负责人同样可以在那里撰写和编辑。参见[小组详情](../../b1-church/groups/group-details.md#meeting-notes-and-attendance)。

## 标记出勤

选择一个场次即可查看其出勤列表。每位小组成员都会列出并附有复选框，按姓氏排序，已记录为出席的人员会被勾选。

1. 勾选每位出席者旁边的复选框。使用 **Select All** 或 **Select None** 可一次性更改所有人。
2. 列表上方的计数（例如"15 人中有 12 人出席"）会随着你勾选复选框而更新。
3. 点击 **Save Attendance**。在保存之前不会记录任何内容，保存完成后会显示确认消息。如果在保存仍在进行时尝试关闭或刷新浏览器标签页，浏览器会先发出提醒，以免更改丢失。

如果取消勾选一位已记录为出席的人员并保存，该人员将从场次中移除。

### 添加访客

要记录不属于该小组成员的人员，请在出勤列表旁边的人员搜索框中搜索此人。如果其尚未在你的数据库中，你可以直接从搜索中创建该人员。无论哪种方式，他们都会以已勾选的状态添加到列表中。点击 **Save Attendance** 即可记录。

在信息亭签到的人员会显示 **Volunteer** 或 **Guest** 标签。不属于小组成员的人员会显示 **Guest** 标签。

## 查看哪些小组仍需录入出勤

当多个班级在同一礼拜时间聚会时，你可以一目了然地看到哪些班级仍需录入该日期的出勤。

1. 打开一个设有礼拜时间的场次。
2. 点击出勤列表顶部的 **Who Still Needs Attendance**。
3. 弹出的对话框会列出分配到该礼拜时间的每个小组，顶部显示摘要，例如"8 个小组中已录入 5 个"。

该日期尚未标记任何出席人员的小组会显示 **Not entered** 标签，并排在最前面。已录入出勤的小组会显示 **Entered** 以及出席人数（例如"Entered (12)"）。点击小组名称，即可打开该小组的场次列表，并自动选中同一日期的场次，方便你立即录入出勤。如果该小组在该日期还没有场次，则会打开其场次列表，供你添加。

:::tip
可将此功能与 **Print All Classes** 以及[为礼拜时间内的每个班级添加场次](#adding-sessions-for-every-class-in-a-service-time)搭配使用：先创建场次、分发点名表，然后使用 **Who Still Needs Attendance** 查看哪些点名表尚未录入。
:::

## 打印点名表 {#printing-a-roll-sheet}

点名表是一份可打印的班级名单，教师可以手工点名，之后再交还给你录入。每张点名表上方会显示教会标志（如果你已上传，则为来自[网站 > 外观](../website/appearance.md)的 **Light Background Logo**），标志下方是教会名称，然后是班级、班级名称下方一条醒目的 **Date** 填写线，以及礼拜时间。成员分为两栏排列（先读左栏，再读右栏），以便一页容纳更多姓名，每位成员都有 **Present** 和 **Absent** 复选框。另外还有供访客填写的空白行以及 **Teacher / Notes** 区域。

- **从场次打印** —— 点击场次出勤列表顶部的 **Print Roll Sheet**（打印机）图标。点名表上的日期为该场次的日期，并显示该场次的礼拜时间。
- **某礼拜的所有班级** —— 如果场次设有礼拜时间，点击 **Print All Classes**，即可为分配到该礼拜时间的每个班级各打印一张点名表。每个班级单独占一页。
- **从成员列表打印** —— 在小组页面点击 **All members**，然后点击成员列表上方的 **Print Roll Sheet** 图标，并选择 **Attendance Sheet**，即可打印一张不含日期的点名表。同一菜单中还有 **Contact Roster** 版式，会列出每位成员的电话、电子邮件和地址——参见[打印成员名单](../groups/group-members.md#printing-the-member-list)。

点名表会在新标签页中打开，并自动弹出浏览器的打印对话框。

## 将出勤导出为电子表格

你可以将场次记录下载为 CSV 文件，用于 Excel、Numbers 或 Google Sheets。

1. 打开你要导出的场次。
2. 点击出勤列表顶部的 **Export** 按钮。
3. 在电子表格应用中打开下载的文件。

## 查看已记录的出勤

记录场次后，数据会显示在你的出勤报表中。

- **Attendance Trend 标签页**（位于出勤页面的 **All years** 下）—— 显示全教会随时间变化的趋势。参见[追踪出勤](tracking-attendance.md)。
- **Group Attendance 标签页** —— 按单个小组细分显示出勤情况。参见[出勤报表](../reports/attendance-reports.md#group-attendance)。

:::tip
如果你刚创建的场次没有立即出现在报表中，请确认该场次的日期在报表筛选器所选的日期范围内。
:::
