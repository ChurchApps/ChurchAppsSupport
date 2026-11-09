---
title: "日历审批"
description: "在 B1 Admin 中审核待处理的房间和资源预订申请，检查冲突，批准或拒绝，并在 History 中查看过往决定。"
---

# 日历审批

<div class="article-intro">

审批页面供管理员审核并处理待处理的房间和资源预订申请，以及需要在发布前经过审批的日历活动。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在[房间与资源](./rooms-resources.md)中为房间或资源配置 **Approval Group**（审批小组）
- 您需要拥有 **Calendars Admin** 权限或 **content.edit** 权限

</div>

## 打开审批页面

在 B1 Admin 中，打开[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Calendars**，然后点击 **Approvals**。待处理的预订申请和等待审核的活动都会列在这里。使用页面顶部的 **Pending** 和 **History** 按钮，可以在仍需处理的申请与已作出决定的申请之间切换。

## 预订申请

当某个小组创建活动并申请房间或资源时，该申请会出现在 **Room & Resource Requests**（房间与资源申请）部分。每一行显示：

- 活动名称和日期/时间
- 所申请的房间或资源（对于可多台使用的资源，还会显示数量）
- **Requested by**（申请人），即提出申请的人员，可点击查看其记录
- 显示申请是否存在冲突的状态标记

### 冲突提示

如果某个申请与同一房间或资源的其他预订或停用时段重叠，其状态会显示 **Conflicts**（冲突）标记；将鼠标悬停其上即可查看详情。没有重叠的申请会显示 **No conflicts**（无冲突）。在批准其中任何一项之前，请仔细检查存在冲突的申请。

### 批准或拒绝

在任意预订申请上点击 **Approve**（批准）或 **Reject**（拒绝）（拒绝前会要求您先确认）。申请人会收到决定的通知。已批准的预订会为该活动锁定该房间或资源；被拒绝的预订会释放该时段，供其他人使用。

点击 **Approve** 后，会打开 **Approve booking**（批准预订）对话框，您可以在同一步骤中同时发布该活动：

1. 勾选 **Publish to public calendar**（发布到公共日历），使该活动显示在其所属小组的公开日历上。若不勾选，则只批准预订，不改变活动的可见性。
2. 勾选 **Publish to public calendar** 后，您还可以从 **Also add to calendar**（同时添加到日历）中选择一个策划日历，将该活动也添加到您的[策划日历](./curated-calendar.md)中。保留为 **None**（无）即可跳过此步。（此选项仅在您拥有 **content.edit** 权限时显示。）
3. 点击 **Approve**。

## 待审活动

如果您的日历流程要求活动在公开可见之前先经过审批，待审活动会出现在 **Event Requests**（活动申请）部分。点击 **Approve** 即可将活动发布到日历上；点击 **Reject** 则会通知提交人需要修改。

:::tip
在[房间与资源](./rooms-resources.md)中为房间设置审批小组，即可要求该房间的预订需经审批。有权限的小组在创建活动时即可申请该房间，这些申请会进入本页面。
:::

## 历史记录

已批准和已拒绝的申请会保留在页面上。点击审批页面顶部的 **History** 即可查看；点击 **Pending** 则返回待处理的申请。

- **Room & Resource Requests** 列出每个已作出决定的预订，包括活动、房间或资源、**Requested by**、**Approved** 或 **Rejected** 标记，以及 **Decided**（决定）。**Decided** 会显示做出决定的人员和日期。最近作出决定的申请排在最前。
- **Event Requests** 列出每个已作出决定的活动，包括其描述、**Requested by** 以及 **Approved** 或 **Rejected** 标记。系统不记录活动申请由谁决定以及何时决定，因此活动列表中不显示该列。

点击 **Requested by** 下的姓名即可打开该人员的记录。

## 相关文章

- [房间、资源与排期](./rooms-resources.md)——配置可预订的房间和资源
- [创建日历](./creating-calendars.md)——管理日历和活动
