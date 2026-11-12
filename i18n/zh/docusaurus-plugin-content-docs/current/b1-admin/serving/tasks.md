---
title: "任务"
description: "在 B1 Admin 中创建、指派和完成任务，在“服事 > 我的工作”中找到它们，并设置到期提醒，确保后续事项不会遗漏。"
---

# 任务

<div class="article-intro">

任务让你可以将行动事项指派给教会中的个人或小组。无论是一次性的待办事项，还是定期的职责，任务都能帮助你跟踪需要完成的工作以及负责人，确保不会有任何遗漏。

</div>

<div class="prereqs">
<h4>开始之前</h4>

- 确保你要指派任务的人员或[小组](../groups/creating-groups.md)已存在于 B1 Admin 中
- 在[跳转菜单](../introduction.md#getting-around-with-the-jump-menu)中，选择 **Serving > My Work**（服事 > 我的工作）以查看任务

</div>

## 查看任务 {#viewing-tasks}

在跳转菜单中，选择 **Serving > My Work**（或搜索 "My Work"（我的工作））。**Tasks**（任务）列表会显示每个任务的标题、关联对象、指派对象、开启时间和状态。你的[工作流](./workflows.md)卡片会显示在其旁边的 **My Cards**（我的卡片）下。被指派人也可以在 B1 应用的 **Me**（我）页面中查看和处理自己的卡片及待办任务。

使用列表上方的标签页，可在 **Assigned to Me**（指派给我）、**Assigned to My Groups**（指派给我的小组）和 **Requested by Me**（由我发起）之间切换。每个标签页都会显示其中的任务数量。任务和 **My Cards** 均按从新到旧排列，因此最新到达的内容会显示在最上方。

:::tip
默认情况下，只显示未完成的任务。点击列表上方的 **Closed**（已关闭）可查看已完成的任务。
:::

## 创建任务 {#creating-a-task}

1. 在 **My Work** 页面上，点击 **Add Task**（添加任务）。随即打开 **New Task**（新建任务）表单。
2. 可选：点击 **Associate with**（关联对象）输入框，并选择该任务所涉及的个人或小组。如果是与任何人无关的普通待办事项（例如给自己的提醒），可留空。
3. 点击 **Assign to**（指派给）输入框。在 **Select a Person or Group**（选择个人或小组）窗口中，在 **Person**（个人）标签页中搜索，或切换到 **Group**（小组）标签页搜索小组，然后选择搜索结果。
4. 输入任务的 **Title**（标题）。
5. 可选：选择 **Due date**（截止日期）。
6. 在 **Notes**（备注）中添加任何详细信息或给被指派人的说明。
7. 点击 **Save**（保存）。

该任务现在会出现在任务列表中，被指派人可以在其仪表板和移动应用中看到。

## 管理任务 {#managing-a-task}

点击任意任务即可打开其详情页。在此页面你可以：

- **关闭或重新开启任务** -- 工作完成后点击 **Close task**（关闭任务），或点击 **Reopen task**（重新开启任务）以再次开启。
- **重新指派任务** -- 点击 **Assign**（指派），选择其他个人或小组。
- **更改关联对象** -- 点击 **Associate**（关联），选择其他个人或小组，或选择 **No person or group**（无个人或小组）以清除关联。
- **更改截止日期** -- 在 **Due** 字段中选择日期；点击其他位置后即会保存。（为[服事分派确认](./workflows.md#serving-assignment-confirmations)创建的任务会显示截止日期，但无法在此更改。）
- **添加备注** -- 在任务的备注中为被指派人发布更新或详细信息。
- **设置提醒** -- 请参阅下文的[任务提醒](#task-reminders)。

## 任务提醒 {#task-reminders}

设有截止日期的任务可以在到期前提醒被指派人。

1. 在任务页面上，点击 **Reminders**（提醒）旁边的 **Edit**（编辑）。
2. 开启 **Send reminders for this task**（为此任务发送提醒）。
3. 在 **When should reminders go out?**（何时发送提醒？）下，最多选择三个时间点：**7 days before**（提前 7 天）、**3 days before**（提前 3 天）、**1 day before**（提前 1 天）或 **Day of**（当天）。
4. 设置 **Time of Day**（时间），并可选择填写 **Message**（消息）。
5. 在 **Send By**（发送方式）下，选择 **Push**（推送）、**Email**（电子邮件），以及在你的教会已连接[短信服务商](../settings/church-settings.md#texting)的情况下选择 **Text**（短信）。
6. 点击 **Save Reminders**（保存提醒）。

如果任务没有截止日期，B1 会提示你：在设置 **Due** 字段之前，将不会发送任何提醒。短信提醒只会发送给在其[通知偏好](../../b1-church/getting-started/notification-preferences.md)中开启了 **Text messages**（短信）的人员，且每条短信都可能产生费用。

## 任务生命周期 {#task-lifecycle}

1. 新任务的初始状态为 **Open**（进行中）。
2. 被指派人会收到通知，并可以在其仪表板、**Serving > My Work** 或移动应用中查看该任务。
3. 工作完成后，被指派人（或管理员）点击 **Close task**（关闭任务）。
4. 已关闭的任务会从默认视图中移除，但仍可通过点击任务列表上方的 **Closed**（已关闭）找到。

:::info
B1 Admin 不再按计划自动创建定期任务。如需对人员进行定期跟进，请使用带有[定时触发器](./workflows.md#schedule-triggers)的[工作流](./workflows.md)。
:::

:::tip
当你需要让许多人依次经历相同的几个阶段时（例如新访客跟进或入会流程），请使用[工作流](./workflows.md)。工作流会将任务转化为可拖放看板上的卡片，并配有步骤、截止日期和分流规则。
:::

:::info
B1 的其他部分会自动创建一些任务，这些任务会打开专门的审核卡片，而不是标准的备注/重新指派视图 -- [小组加入请求](../groups/group-join-requests.md#approving-from-the-tasks-page)、[个人资料变更请求](../profile/approving-profile-changes.md)以及[账户删除请求](../profile/account-deletion.md)均采用此方式。
:::

## 后续步骤 {#next-steps}

- 使用[工作流](./workflows.md)引导人员完成多步骤流程
- 使用[工作流](./workflows.md)自动推进可重复的流程
- 将任务与[服事计划](./plans.md)配合使用，跟踪礼拜准备的行动事项
