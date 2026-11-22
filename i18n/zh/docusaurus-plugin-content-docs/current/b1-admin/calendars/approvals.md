---
title: "日历审批"
description: "在 B1 Admin 中审阅待处理的房间和资源预订申请，检查冲突，批准或拒绝申请，并在历史记录中回顾过去的决定。"
---

# 日历审批

<div class="article-intro">

审批页面是管理员审阅并处理待处理的房间和资源预订申请的地方，同时也用于处理在发布前需要审批的日历活动。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 在[房间与资源](./rooms-resources.md)中为房间或资源配置**审批小组（Approval Group）**
- 你需要 **Edit Content** 权限，或 **Resolve Calendar Conflicts & Approvals** 权限（两者均位于[角色与权限](../settings/roles-permissions.md)的 **Content** 部分）。若没有 **Edit Content** 权限，则不会显示 **Calendars** 菜单——此时可改从**仪表板**中的待审批链接或审批电子邮件打开审批页面。

</div>

## 打开审批页面 {#opening-approvals}

在 B1 Admin 中，打开[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)（左上角的搜索栏），展开 **Calendars**，然后点击 **Approvals**。此处会列出待处理的预订申请和等待审阅的活动。使用页面顶部的 **Pending** 和 **History** 按钮，可在仍需决定的申请与已作出决定的申请之间切换。

## 预订申请 {#booking-requests}

当有人预订设有**审批小组**的房间或资源，而其本人又不属于该小组时，该申请会出现在 **Room & Resource Requests** 部分。（审批小组成员的预订将自动获得批准。）审批小组成员还会收到一封电子邮件，列出新的待处理申请，并附有通往本页面的链接。每一行显示以下内容：

- 活动名称和日期/时间
- 所申请的房间或资源（对于多单位资源，还会显示数量）
- **Requested by**——提出申请的人员，可点击链接查看其记录
- 状态标记，显示该申请是否存在冲突

### 冲突提示 {#conflict-indicators}

如果某个申请与同一房间或资源的其他预订或封锁时段重叠，其状态会显示 **Conflicts** 标记；将鼠标悬停其上即可查看详情。没有重叠的申请显示 **No conflicts**。在批准任何一项存在冲突的申请之前，请仔细审阅。

### 批准或拒绝 {#approving-or-rejecting}

将鼠标悬停在某个预订申请上，然后点击 **Approve** 或 **Reject**（拒绝时会先要求你确认）。申请人会收到该决定的通知。已批准的预订会锁定该房间或资源在该活动时段的使用；被拒绝的预订则会释放该时段供他人使用。

当你点击 **Approve** 时，会打开 **Approve booking** 对话框，以便你在同一步骤中同时发布该活动：

1. 勾选 **Publish to public calendar**，即可将该活动发布到其小组的公开日历上。若不勾选，则仅批准预订，不更改活动的可见性。
2. 勾选 **Publish to public calendar** 后，你可以选择从 **Also add to calendar** 中选择一个精选日历，同时将该活动添加到你的[精选日历](./curated-calendar.md)之一。保持为 **None** 则跳过此步骤。（仅当你拥有 **content.edit** 权限时才会显示此选项。）
3. 点击 **Approve**。

## 待处理活动 {#pending-events}

成员提交的活动申请（例如来自 B1 应用中的 **My Requests**）会出现在 **Event Requests** 部分，并显示日期、**Description** 和 **Requested by**。点击 **Approve** 可将活动发布到日历上，或点击 **Reject** 通知提交人需要进行修改。在做决定之前，可点击 **Edit** 修正申请的详细信息，或点击 **Delete** 将其删除。

:::tip
在[房间与资源](./rooms-resources.md)中为某个房间设置审批小组，即可要求该房间的预订需经审批。之后，有权限的小组在创建活动时即可申请使用该房间，这些申请会进入本页面。
:::

## 更改申请所属人员 {#changing-who-a-request-is-for}

如果你是代表某位成员提交申请（例如成员打电话到办公室时），该申请会列在你的名下。点击 **Requested by** 下方姓名旁的交换图标（在任一部分、位于 **Pending** 或 **History** 页面上均可），搜索该成员，然后点击 **Move to this person**。整个申请都会随之转移：活动申请以及其上的每一项房间和资源预订。该成员随后会收到批准或拒绝的通知，在 B1 应用的 **My Requests** 中看到该申请，并且它会出现在其个人记录的申请部分。转移申请不会改变其是否已获批准。

## 历史记录 {#history}

已批准和已拒绝的申请会保留在页面上。点击审批页面顶部的 **History** 即可查看；点击 **Pending** 则可返回未处理的申请。

- **Room & Resource Requests** 列出每一条已作出决定的预订，包括活动、房间或资源、**Requested by**、**Approved** 或 **Rejected** 标记，以及 **Decided**（显示做出决定的人员和日期）。最近作出决定的申请排在最前。
- **Event Requests** 列出每一条已作出决定的活动，包括说明、**Requested by**、**Approved** 或 **Rejected** 标记，以及 **Decided**（显示做出决定的人员和日期）。在 B1 开始记录此信息之前作出决定的旧活动申请，则显示为一个破折号。

你可以在历史记录中改变决定：已批准的申请会有 **Reject** 操作，已拒绝的申请会有 **Approve** 操作。拒绝一个你此前已批准的活动申请，会将其从公开日历中移除。活动申请也可以在此处进行编辑或删除。

点击 **Requested by** 下的姓名即可打开该人员的记录。

## 相关文章 {#related-articles}

- [房间、资源与排期](./rooms-resources.md)——配置可预订的房间和资源
- [创建日历](./creating-calendars.md)——管理日历和活动
