---
title: "任务"
---

# 任务

<div class="article-intro">

任务让您将操作项目分配给您教会中的人员或群组。无论是一次性待办事项还是经常性责任，任务帮助您跟踪需要做什么以及谁负责，以便不会遗漏任何内容。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 确保您想要分配任务的人员或[群组](../groups/creating-groups.md)存在于B1 Admin中
- 在[Jump菜单](../introduction.md#getting-around-with-the-jump-menu)中，选择**服侍 > 我的工作**来查看任务

</div>

## 查看任务

在Jump菜单中，选择**服侍 > 我的工作**（或搜索"我的工作"）。**Tasks**列表显示每个任务的标题、关联的人员、分配给的人员、打开时间和状态。您的[工作流](./workflows.md)卡片会显示在其旁边的**My Cards**下。

使用列表上方的选项卡在**Assigned to Me**（分配给我）、**Assigned to My Groups**（分配给我的群组）和**Requested by Me**（我请求的）任务之间切换。每个选项卡都会显示其中的任务数量。

:::tip
默认情况下，仅显示打开的任务。选择列表上方的**Closed**来查看已完成的任务。
:::

## 创建任务

1. 在**我的工作**页面上，点击**添加任务**。将打开**New Task**表单。
2. 点击**Associate with**框并选择该任务涉及的人员。
3. 点击**Assign to**框。在**Select a Person or Group**窗口中，在**Person**选项卡上搜索，或切换到**Group**选项卡搜索群组，然后选择结果。
4. 输入任务的**Title**（标题）。
5. 添加**Notes**（说明），其中包含分配人的任何详细信息或说明。
6. 点击**保存**。

任务现在将出现在任务列表中，并在分配人的仪表板和移动应用上可见。

## 管理任务

点击任何任务来打开其详情页面。从这里您可以：

- **关闭或重新打开任务** -- 工作完成后点击**Close task**，或点击**Reopen task**以再次打开。
- **重新分配任务** -- 点击**Assign**选择不同的人或群组。
- **更改任务涉及的人** -- 点击**Associate**选择不同的人。
- **添加说明** -- 在任务的说明中为分配人发布更新或详细信息。
- **设置提醒** -- 参见下方的[任务提醒](#task-reminders)。

## 任务提醒 {#task-reminders}

带有截止日期的任务可以在到期前提醒其分配人。

1. 在任务页面上，点击**Reminders**旁边的**Edit**。
2. 打开**Send reminders for this task**（为此任务发送提醒）。
3. 在**When should reminders go out?**（何时发送提醒？）下，最多选择三个时间：**7 days before**（提前7天）、**3 days before**（提前3天）、**1 day before**（提前1天）或**Day of**（当天）。
4. 设置**Time of Day**（时间），并可选择添加**Message**（消息）。
5. 在**Send By**（发送方式）下，选择**Push**（推送）、**Email**（电子邮件），如果您的教会已连接[短信提供商](../settings/church-settings.md#texting)，还可以选择**Text**（短信）。
6. 点击**Save Reminders**（保存提醒）。

如果任务没有截止日期，B1会提示您在设置截止日期之前不会发送任何提醒。短信提醒只会发送给在其[通知首选项](../../b1-church/getting-started/notification-preferences.md)中开启了**Text messages**的人，并且每条短信可能会产生费用。

## 任务生命周期

1. 新任务以**打开**状态开始。
2. 分配人收到通知，可以从他们的仪表板、**服侍 > 我的工作**或移动应用查看任务。
3. 工作完成后，分配人（或管理员）点击**Close task**。
4. 已关闭的任务将从默认视图中删除，但可以通过选择任务列表上方的**Closed**来找到。

:::info
B1 Admin不再按计划创建经常性任务。对于与人的重复跟进，使用带有[日程触发器](./workflows.md#schedule-triggers)的[工作流](./workflows.md)。
:::

:::tip
当您需要让许多人通过相同的一套阶段 -- 例如新访问者跟进或会员过程 -- 时，使用[工作流](./workflows.md)。工作流将任务变成拖放式看板上的卡片，带有步骤、截止日期和路由。
:::

:::info
一些任务由B1的其他部分自动创建，并打开到特殊审查卡而不是标准说明/重新分配视图 -- [群组加入请求](../groups/group-join-requests.md#approving-from-the-tasks-page)、[个人资料更改请求](../profile/approving-profile-changes.md)和[账户删除请求](../profile/account-deletion.md)都以这种方式工作。
:::

## 后续步骤

- 使用[工作流](./workflows.md)将人员移动通过多步骤过程
- 使用[工作流](./workflows.md)自动将人员移动通过可重复的过程
- 在[服务计划](./plans.md)旁边使用任务来跟踪服务准备操作项目
