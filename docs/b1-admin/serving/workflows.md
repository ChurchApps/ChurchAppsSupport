---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Workflows move people through a series of steps on a visual board. Each person becomes a card that travels from one step to the next -- from a first-time guest follow-up, to a membership process, to a first-time giver thank-you, and anything else where you need to track many people through the same set of stages. Workflows extend [Tasks](./tasks.md) into a drag-and-drop Kanban board so nothing and no one falls through the cracks.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Make sure the people you want to track exist in B1 Admin
- Familiarize yourself with how [Tasks](./tasks.md) work, since each card on a board is a task
- You will need the appropriate Tasks permission. Viewing, editing cards, and managing workflows are separate permission levels (see [Roles & Permissions](../settings/roles-permissions.md))

</div>

## Viewing Workflows

Navigate to **Serving**, open the **Tasks** area, and select **Workflows** from the menu. You will see your workflows listed and grouped by category, with active workflows highlighted. Click any workflow to open its board.

## Creating a Workflow

1. On the Workflows page, click **Add Workflow**.
2. Choose how to start:
   - **Blank workflow** -- start from scratch and build your own steps.
   - **From a template** -- start with a ready-made set of steps you can edit. Built-in templates include:
     - **New Visitor Follow-up** -- Send welcome email → Personal phone call → Invite to next step → Connected
     - **Membership Class** -- Express interest → Register for class → Attend class → Complete membership
     - **First-time Giver Thank-you** -- Send thank-you note → Share giving impact → Stewarded
3. Give the workflow a **Name**.
4. Optionally assign a **Category** to group related workflows together. You can create a new category right from the dropdown.
5. Leave the workflow **Active** so people can be added to it, or set it to **Inactive** to hide it from the add-to-workflow lists.
6. Click **Save**.

:::tip
Use the **Duplicate** button on the Workflows list to copy an existing workflow -- including its steps and routing -- as the starting point for a new one.
:::

## Building the Board with Steps

Each workflow board is made up of **steps**, shown as columns from left to right. Open a workflow and use **Add Step** to create each stage of your process.

When you add or edit a step, you can configure:

- **Step Name** -- the column heading (for example, "Welcome Call" or "Awaiting Registration").
- **Due in (days)** -- automatically sets a due date when a card enters this step. Cards past their due date are flagged as **Overdue**.
- **Default assignee** -- the person or group new cards on this step are assigned to automatically.

Drag step columns into the order that matches your process.

## Adding People as Cards

There are several ways to put people on a board:

- **From the board** -- Click **Add Card** at the bottom of a step column and pick a person. You can also pick a group, and every member of that group is added as a card.
- **From a person's record** -- Use **Add to Workflow** on a person's page to drop them onto a workflow.
- **From People search** -- Select multiple people and use the bulk **Add to Workflow** action to add them all at once.
- **Automatically from a form** -- Set up a trigger so people are added when they submit a form (see [Form Triggers](#form-triggers) below).

## Working the Board

Open a workflow to see its board. Each card shows the person's name, who it is assigned to, and a due-date or status chip (**Overdue** or **Snoozed**).

- **Move a card** -- Drag a card from one column to the next as the person progresses.
- **Open a card** -- Double-click a card (or click it) to open its detail drawer, where you can change the step, reassign it, and add notes.

From the card drawer you can:

- **Assign** the card to a different person or group.
- **Snooze** the card for 1 day, 3 days, or 1 week to temporarily hide its due date.
- **Send Back** to the previous step or **Skip** to the next step.
- **Pin assignment** -- keep the same owner on the card even as it moves between steps. By default, moving a card to a new step reassigns it to that step's default assignee; pinning keeps the current person responsible throughout.
- **Complete** the card to finish it, or choose an **Outcome** button if the step has outcomes configured (see [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Add notes** -- leave a private note thread on the card to record what happened.

### Bulk actions

Select the checkboxes on multiple cards to act on them together. A toolbar appears letting you **Complete**, **Snooze**, **Reassign**, or **Move** all selected cards to another step at once.

## Routing Cards with Outcomes and Conditions

Routing controls where a card goes when it leaves a step. Open a step's editor to configure two kinds of routing.

### Outcome buttons

Outcomes are buttons shown on the card drawer when you are completing a card on that step. Instead of a single **Complete** button, you can offer choices like "Joined a Group" or "Not Interested." Each outcome can:

- Send the card to **another step** in this workflow,
- **Hand the card off** to a different workflow entirely, or
- **Close** the card.

This lets one decision branch the person down different paths.

### Automatic routing (conditional)

Automatic routes move a card onward **the moment it enters a step**, without anyone clicking, if the person matches a set of conditions. Add a route, choose the target step, and define one or more **conditions** (for example, a person's campus, age, or membership status). A route with no conditions matches everyone.

:::info
On the board, each step column shows small annotations describing its routing -- for example, an outcome label or "if matches" followed by an arrow to the destination step or workflow. This gives you an at-a-glance map of how cards flow.
:::

## Form Triggers

You can automatically add people to a workflow when they submit a form. On a workflow board, click **Triggers**, choose a form, and click **Add Trigger**. From then on, anyone who submits that form is added to the workflow as a new card.

:::tip
Pair a form trigger with the **New Visitor Follow-up** template to turn your "Connect Card" or "I'm New" form into an automatic follow-up pipeline.
:::

## My Cards

Volunteers and staff do not need to dig through every board to find their work. The **My Cards** page (linked from the Workflows page) lists every card assigned to the current user across all workflows. Clicking a card opens the board it belongs to.

## Reports

Open a workflow and click **Reports** to see analytics for that workflow:

- **Overdue** -- the number of cards past their due date.
- **Cards per Step** -- how many cards currently sit on each step, shown as a column chart.
- **Completed (30 days)** -- throughput over the last 30 days, shown as a line chart.

Use these to spot bottlenecks -- for example, a step where cards pile up and never advance.

## Related Articles

- [Tasks](./tasks.md) -- the individual action items that workflow cards are built on
- [Automations](./automations.md) -- create recurring tasks on a schedule
- [Forms](../forms/index.md) -- build the forms that can trigger workflows
- [Roles & Permissions](../settings/roles-permissions.md) -- control who can view, edit, and manage workflows
