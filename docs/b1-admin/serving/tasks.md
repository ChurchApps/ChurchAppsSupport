---
title: "Tasks"
description: "Create, assign, and close tasks in B1 Admin, find them under Serving > My Work, and set due-date reminders so follow-up items never slip through."
---

# Tasks

<div class="article-intro">

Tasks let you assign action items to people or groups in your church. Whether it is a one-time to-do or a recurring responsibility, tasks help you track what needs to be done and who is responsible so nothing gets overlooked.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Make sure the people or [groups](../groups/creating-groups.md) you want to assign tasks to exist in B1 Admin
- In the [Jump menu](../introduction.md#getting-around-with-the-jump-menu), choose **Serving > My Work** to see tasks

</div>

## Viewing Tasks

In the Jump menu, choose **Serving > My Work** (or search for "My Work"). The **Tasks** list shows each task's title, who it is associated with, who it is assigned to, when it was opened, and its status. Hover over how long ago a task was opened to see the exact date and time. Your [workflow](./workflows.md) cards appear alongside it under **My Cards**. Assignees can also see and work their cards and open tasks from the **Me** screen in the B1 app.

Use the tabs above the list to switch between tasks **Assigned to Me**, **Assigned to My Groups**, and **Requested by Me**. Each tab shows how many tasks it holds. Tasks and **My Cards** are listed newest first, so whatever just arrived is at the top.

:::tip
By default, only open tasks are shown. Choose **Closed** above the list to see completed tasks instead.
:::

## Creating a Task

1. On the **My Work** page, click **Add Task**. A **New Task** form opens.
2. Optionally click the **Associate with** box and choose the person or group the task is about. Leave it blank for a plain to-do that is not about anyone, such as a reminder for yourself.
3. Click the **Assign to** box. In the **Select people or a group** window, choose who should do the work:
   - **One or more people** -- On the **Person** tab, start typing a name; results appear as you type. Click **Select** next to each person you want. The window stays open so you can add more, and the people you picked appear at the top, where you can remove one by clicking the **x** on their name. Click **Done** when you are finished.
   - **A group** -- Switch to the **Group** tab, type to filter the list, and select the group. Everyone in the group shares one task. Picking a group replaces any people you already picked.
   - **Each member of a group** -- On the **Group** tab, check **Create a separate task for each member**, then select the group. Its members are added to your list of people.
4. Enter a **Title** for the task.
5. Optionally pick a **Due date**.
6. Add **Notes** with any details or instructions for the assignee.
7. Click **Save**.

The task will now appear in the task list and will be visible to the assignee on their dashboard and mobile app.

When you pick more than one person, the **Assign to** box shows how many (for example, **3 people**), their names appear underneath, and the form notes "One task will be created for each person." B1 creates a separate copy of the task for each person, with the same title, due date, and notes, so each person closes their own. Each person gets their own notification.

## Managing a Task

Click on any task to open its detail page. Under the title it shows the date and time the task was created and who created it, and for a closed task, the date and time it was closed. From here you can:

- **Close or reopen the task** -- Click **Close task** when the work is done, or **Reopen task** to open it again.
- **Edit the title** -- Click the pencil icon next to the title, change it, and click **Save** (or press Enter). Click **Cancel** to keep the old title. Only people with permission to edit tasks see the pencil.
- **Reassign the task** -- Click **Assign** to choose a different person or group. The new assignee (or every member of the new group) gets a notification, and the change is added to the task's **History**.
- **Change who it's about** -- Click **Associate** to pick a different person or group, or choose **No person or group** to clear it.
- **Contact the person** -- When the task is about a person, their mobile phone and email appear under **Associated** as links you can click to call or email them.
- **Change the due date** -- Pick a date in the **Due** field; it saves when you click away. (Tasks created for a [serving assignment confirmation](./workflows.md#serving-assignment-confirmations) show their due date but can't be changed here.)
- **Add notes** -- Post updates or details for the assignee in the task's notes. The person the task is assigned to, or members of the assigned group, can post notes too, even without permission to edit tasks. Notifications about new notes name the task, such as "New message: Call Sarah Notes".
- **Review the history** -- When a task has been reassigned, a **History** section lists each change (for example, "Reassigned from Jane Smith to John Doe") with its date and time.
- **Set reminders** -- See [Task Reminders](#task-reminders) below.
- **Delete the task** -- Click **Delete task** and confirm. The task is removed for good and you return to **My Work**. Only people with permission to edit tasks see this, and it isn't offered on [account deletion requests](../profile/account-deletion.md), which must be approved or declined instead.

## Task Reminders

A task with a due date can remind its assignee before it is due.

1. On the task's page, click **Edit** next to **Reminders**.
2. Turn on **Send reminders for this task**.
3. Under **When should reminders go out?**, pick up to three timings: **7 days before**, **3 days before**, **1 day before**, or **Day of**.
4. Set the **Time of Day** and, optionally, a **Message**.
5. Under **Send By**, choose **Push**, **Email**, and, if your church has a [texting provider](../settings/church-settings.md#texting) connected, **Text**.
6. Click **Save Reminders**.

To send the reminder right away, click **Send now**. It goes out immediately with the saved settings, and B1 shows how many people it reached, such as **Sent to 3 people**. The scheduled reminders still go out as planned. **Send now** is only available after reminders are turned on and saved. If the reminder includes **Text**, you also need permission to send texts.

If the task has no due date, B1 warns you that no reminders will be sent until one is set in the **Due** field. Text reminders only reach people who turned on **Text messages** in their [Notification Preferences](../../b1-church/getting-started/notification-preferences.md), and each text may cost your church.

## Task Lifecycle

1. A new task starts with a status of **Open**.
2. The assignee receives a notification and can view the task from their dashboard, **Serving > My Work**, or the mobile app.
3. Once the work is complete, the assignee (or an admin) clicks **Close task**.
4. Closed tasks are removed from the default view but can still be found by choosing **Closed** above the task list.

:::info
B1 Admin no longer creates recurring tasks on a schedule. For repeating follow-up with people, use a [workflow](./workflows.md) with a [schedule trigger](./workflows.md#schedule-triggers).
:::

:::tip
When you need to move many people through the same set of stages -- such as new-visitor follow-up or a membership process -- use [Workflows](./workflows.md). Workflows turn tasks into cards on a drag-and-drop board with steps, due dates, and routing.
:::

:::info
Some tasks are created automatically by other parts of B1 and open to a special review card instead of the standard note/reassign view -- [group join requests](../groups/group-join-requests.md#approving-from-the-tasks-page), [profile change requests](../profile/approving-profile-changes.md), and [account deletion requests](../profile/account-deletion.md) all work this way.
:::

## Next Steps

- Move people through a multi-step process with [Workflows](./workflows.md)
- Use [Workflows](./workflows.md) to move people through repeatable processes automatically
- Use tasks alongside [Service Plans](./plans.md) to track service preparation action items
