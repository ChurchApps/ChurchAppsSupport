---
title: "房间、资源与排期"
description: "在 B1 Admin 中设置房间、设备、封锁时段和活动模板，让小组可以申请预订，由你审批以避免重复预订。"
---

# 房间、资源与排期

<div class="article-intro">

房间和资源功能让你跟踪教会可预订的场地和设备。当某个小组或团队希望为活动使用房间或借用资源时，可以通过 B1 提出申请，而你则可以批准或拒绝这些申请，以避免重复预订。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 你需要 **Edit Content** 权限
- 设置好将提交预订申请的[小组](../groups/creating-groups.md)

</div>

## 打开房间与资源 {#opening-rooms--resources}

在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Calendars**，然后点击 **Rooms & Resources**。该页面有四个标签：**Rooms**、**Resources**、**Blockouts** 和 **Templates**。页面顶部的添加按钮会随所选标签变化，**Find** 框可用于筛选当前列表。

## 房间 {#rooms}

房间是可与日历活动一同预留的实体空间——例如礼拜堂、团契厅、教室等。

### 添加房间 {#adding-a-room}

1. 在 **Rooms** 标签中，点击页面顶部的 **Add Room**。
2. 输入 **Room Name**（房间名称）。
3. 可选择设置 **Capacity**（容纳人数，即最多可容纳的人数）和 **Description**（说明）。人们为活动选择房间时，这两项都会显示在房间旁边。
4. 如果预订需要审批，请设置 **Approval Group**（审批小组）。该小组成员提交的预订会自动获得批准；其他人的预订会显示为 **Pending**（待处理），直到在[审批](./approvals.md)页面获得批准，并且该小组的成员会收到关于新申请的电子邮件。若希望所有预订都自动批准，请保持为 **No approval needed**（无需审批）。
5. 点击 **Save**。

房间列表会显示每个房间的 **Room Name**、**Capacity** 和 **Approval Group**。

### 编辑或删除房间 {#editing-or-deleting-a-room}

将鼠标悬停在某个房间上并点击 **Edit**，进行修改后点击 **Save**。若要永久删除房间，请使用 **Delete**。

## 资源 {#resources}

资源是可与活动一同预订的物品——例如音响设备、投影仪、椅子、面包车等。

### 添加资源 {#adding-a-resource}

1. 点击 **Resources** 标签，然后点击 **Add Resource**。
2. 输入 **Resource Name**（资源名称），并可选择填写 **Description**（说明）。
3. 设置你拥有的 **Quantity**（数量）（例如 3 台投影仪）。每个活动会预订一件，如果同一时段预订该资源的活动多于你拥有的数量，B1 会发出警告。
4. 如果资源外借需要有人签批，请设置 **Approval Group**（审批小组）。其运作方式与房间相同。
5. 点击 **Save**。

编辑或删除资源的方法与房间相同。

## 封锁时段 {#blockouts}

封锁时段可在特定时间内阻止房间或资源被预订——例如用于装修、保留时段或维护。

### 添加封锁时段 {#adding-a-blockout}

1. 点击 **Blockouts** 标签，然后点击 **Add Blockout**。
2. 在 **Applies To**（适用于）中，选择一个房间、一项资源，或 **All rooms & resources**（所有房间和资源）。
3. 设置封锁的 **Start** 和 **End** 日期/时间。
4. 可选择填写 **Reason**（原因）。它会在[可用性](./availability.md)日历上显示为 *Blocked: 原因*。
5. 点击 **Save**。

预订了被封锁房间或资源的活动，会在活动编辑器中显示冲突警告。

## 活动模板 {#event-templates}

模板让你保存可重复使用的活动设置——包括标题、说明、时长、房间和资源——使你经常创建的活动每次都以相同的方式设置。

### 添加模板 {#adding-a-template}

1. 点击 **Templates** 标签，然后点击 **Add Template**。
2. 输入 **Template Name**（模板名称）（在选择模板时显示）。
3. 填写 **Event Title**（活动标题）、**Event Description**（活动说明）和 **Duration (minutes)**（时长，单位为分钟），用于新活动。
4. 可选择要预订的 **Rooms**（房间）和 **Resources**（资源）。
5. 点击 **Save**。

创建新活动时，在活动编辑器的 **Template** 框中选择模板，即可填入标题、说明、房间和资源，并根据模板的时长设置结束时间（请先设置 **Start**）。你仍需选择活动所属的 **Group**（小组）。只有在至少存在一个模板后，**Template** 框才会出现。

## 相关文章 {#related-articles}

- [可用性日历](./availability.md)——一览所有预订，并直接预订房间或资源
- [日历审批](./approvals.md)——批准或拒绝房间和资源的预订申请
- [创建日历](./creating-calendars.md)——设置活动日历
- [创建小组](../groups/creating-groups.md)——设置可预订房间和资源的小组
