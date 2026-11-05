---
title: "任务"
---

# 任务

<div class="article-intro">

任务功能让你可以将待办事项分配给教会中的个人或小组。无论是一次性的待办事项还是定期的职责，任务都能帮助你追踪需要完成的工作以及负责人，确保不会有任何事情被遗漏。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 确保你要分配任务的人员或[小组](../groups/creating-groups.md)已存在于 B1 Admin 中
- 在[快速跳转菜单](../introduction.md#getting-around-with-the-jump-menu)中，选择 **Serving > My Work** 即可查看任务

</div>

## 查看任务

在快速跳转菜单中，选择 **Serving > My Work**（或搜索 "My Work"）。**Tasks**（任务）列表会显示每项任务的标题、关联的人员、受托人、开启时间及其状态。你的[工作流](./workflows.md)卡片会在 **My Cards**（我的卡片）下与之一同显示。

使用列表上方的标签页，可在 **Assigned to Me**（分配给我）、**Assigned to My Groups**（分配给我的小组）和 **Requested by Me**（由我发起）之间切换。每个标签页都会显示其中包含的任务数量。

:::tip
默认情况下，只显示未完成的任务。若要查看已完成的任务，请选择列表上方的 **Closed**（已关闭）。
:::

## 创建任务

1. 在 **My Work** 页面，点击 **Add Task**（添加任务）。随即会打开 **New Task**（新任务）表单。
2. 可选择点击 **Associate with**（关联对象）框，选择任务所涉及的人员或小组。如果是与任何人无关的普通待办事项（例如给自己的提醒），可留空。
3. 点击 **Assign to**（分配给）框。在 **Select a Person or Group**（选择人员或小组）窗口中，在 **Person**（人员）标签页下搜索，或切换到 **Group**（小组）标签页搜索小组，然后选择搜索结果。
4. 为任务输入 **Title**（标题）。
5. 可选择设置 **Due date**（截止日期）。
6. 添加 **Notes**（备注），填写供受托人参考的任何详情或说明。
7. 点击 **Save**。

任务现在会出现在任务列表中，并会显示在受托人的仪表板和移动应用中。

## 管理任务

点击任意任务即可打开其详情页面。在这里，你可以：

- **关闭或重新开启任务**——工作完成后点击 **Close task**（关闭任务），或点击 **Reopen task**（重新开启任务）再次开启。
- **重新分配任务**——点击 **Assign**（分配），选择其他人员或小组。
- **更改关联对象**——点击 **Associate**（关联），选择其他人员或小组，或选择 **No person or group**（无人员或小组）以清除。
- **更改截止日期**——在 **Due** 字段中选择一个日期；点击其他地方即保存。（为[服事安排确认](./workflows.md#serving-assignment-confirmations)创建的任务会显示其截止日期，但无法在此更改。）
- **添加备注**——在任务的备注中发布更新或详细信息，供受托人查看。
- **设置提醒**——请参阅下方的[任务提醒](#task-reminders)。

## 任务提醒 {#task-reminders}

带有截止日期的任务可以在截止之前提醒其受托人。

1. 在任务页面中，点击 **Reminders**（提醒）旁边的 **Edit**。
2. 开启 **Send reminders for this task**（为此任务发送提醒）。
3. 在 **When should reminders go out?**（何时发送提醒？）下，最多选择三个时间点：**7 days before**（提前 7 天）、**3 days before**（提前 3 天）、**1 day before**（提前 1 天）或 **Day of**（当天）。
4. 设置 **Time of Day**（具体时间），并可选填 **Message**（消息）。
5. 在 **Send By**（发送方式）下，选择 **Push**（推送）、**Email**（电子邮件），以及如果你的教会已连接[短信服务提供方](../settings/church-settings.md#texting)，还可以选择 **Text**（短信）。
6. 点击 **Save Reminders**（保存提醒）。

如果任务没有截止日期，B1 会提示你：在设置 **Due** 字段之前，不会发送任何提醒。短信提醒只会发送给在其[通知偏好设置](../../b1-church/getting-started/notification-preferences.md)中开启了**短信**的人员，而且每条短信都可能产生费用。

## 任务生命周期

1. 新任务的状态初始为 **Open**（开启）。
2. 受托人会收到通知，并可以从其仪表板、**Serving > My Work** 或移动应用中查看该任务。
3. 工作完成后，受托人（或管理员）点击 **Close task**。
4. 已关闭的任务会从默认视图中移除，但仍可以通过选择任务列表上方的 **Closed** 找到。

:::info
B1 Admin 不再按计划自动创建定期任务。对于需要与人员定期跟进的事项，请使用带有[定时触发器](./workflows.md#schedule-triggers)的[工作流](./workflows.md)。
:::

:::tip
当你需要让许多人依次经过同一组阶段时（例如新访客跟进或入会流程），请使用[工作流](./workflows.md)。工作流会将任务转化为一张可拖放看板上的卡片，其中包含步骤、截止日期和流转规则。
:::

:::info
某些任务由 B1 的其他部分自动创建，它们会打开一个专门的审核卡片，而不是标准的备注/重新分配视图。[小组加入申请](../groups/group-join-requests.md#approving-from-the-tasks-page)、[个人资料变更请求](../profile/approving-profile-changes.md)和[账号删除请求](../profile/account-deletion.md)均以此方式工作。
:::

## 后续步骤

- 使用[工作流](./workflows.md)推动人员完成多步骤的流程
- 使用[工作流](./workflows.md)自动推进可重复的流程
- 将任务与[服事计划](./plans.md)结合使用，跟踪礼拜准备工作的待办事项
