---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Workflows move people through a series of steps on a visual board. Each person becomes a card that travels from one step to the next -- from a first-time guest follow-up, to a membership process, to a first-time giver thank-you, and anything else where you need to track many people through the same set of stages. A step can ask a volunteer to do something (make a call, have a conversation) **and** run automated actions on its own -- send an email, wait a few days, add the person to a group -- so Workflows handle both the human follow-up and the busywork around it. Workflows extend [Tasks](./tasks.md) into a drag-and-drop Kanban board so nothing and no one falls through the cracks.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Make sure the people you want to track exist in B1 Admin
- Familiarize yourself with how [Tasks](./tasks.md) work, since each card on a board is a task
- To use the **Send email** action, create the email templates you want to send first (managed under **Messaging → Manage Templates**)
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
Use the **Duplicate** button on the Workflows list to copy an existing workflow -- including its steps, automated actions, and routing -- as the starting point for a new one.
:::

## Building the Board with Steps

Each workflow board is made up of **steps**, shown as columns from left to right. Open a workflow and use **Add Step** to create each stage of your process.

When you add or edit a step, you can configure:

- **Step Name** -- the column heading (for example, "Welcome Call" or "Awaiting Registration").
- **Due in (days)** -- automatically sets a due date when a card enters this step. Cards past their due date are flagged as **Overdue**.
- **Default assignee** -- the person or group new cards on this step are assigned to automatically.
- **Automated actions** -- things the system does on its own when a card arrives (see below).
- **Routing** -- where the card goes when it leaves the step (see [Routing](#routing-cards-with-outcomes-and-conditions)).

Drag step columns into the order that matches your process. The order also defines the default path a card takes when no other routing applies.

:::info
Save a new step first. Automated actions and routing attach to the step, so the editor unlocks those sections once the step exists.
:::

## Automated Actions

Every step can carry a list of **automated actions** that run by themselves the moment a card **enters** the step -- before anyone touches it. This is how a step both prompts a volunteer *and* takes care of the routine work around the follow-up.

In the step editor, open **Automated actions**, click **Add Action**, choose a type, fill in its settings, and click the save icon on that action. Add as many as you need; they run **top to bottom in order**.

| Action | What it does |
|---|---|
| **Send email** | Emails the person an email template you choose. You can override the subject line. |
| **Wait** | Pauses the card for a number of days before continuing (see below). |
| **Add to group** | Adds the person to a [group](../groups/index.md) you pick. |
| **Add to workflow** | Starts the person on another workflow -- useful for handing off between processes. |
| **Add note** | Records a note in the card's history. |
| **Set field** | Updates a field on the person's record: Membership Status, Marital Status, Gender, City, State, or Zip. |
| **Webhook** | Sends the card's details to an external web address (URL) you provide, for connecting to other systems. |

After all of a step's actions finish, the card **rests on that step** so a person can work it -- unless the step has an automatic route that moves it onward (see [Fully automated steps](#fully-automated-steps)).

:::info
Automated actions run only when a card arrives through the normal flow -- when it's first added, when an outcome or automatic route brings it in, or after a Wait finishes. They do **not** re-run when a staff member manually drags a card onto the step or sends it back, so a person won't get the same email twice.
:::

### Sending email

Choose **Send email**, pick one of your email templates, and optionally type a custom subject. When a card enters the step, the person receives that email automatically. (If the person has no email address on file, the step simply skips this action.)

### Waiting a few days (drip sequences)

The **Wait** action holds a card for the number of days you set. While it waits, the card shows as **Snoozed**. When the wait is over:

1. Any **remaining actions on the same step** run -- so you can build a drip like **Send email → Wait 3 days → Send a reminder email**.
2. Then, if the step has an automatic route, the card moves on; otherwise it rests on the step for a person to pick up.

:::tip
A **Wait** at the very start of a step is a simple way to "hold" a card before it surfaces to a volunteer -- for example, *Wait 7 days, then a coach reaches out*.
:::

## Adding People as Cards

There are several ways to put people on a board:

- **From the board** -- Click **Add Card** at the bottom of a step column and pick a person. You can also pick a group, and every member of that group is added as a card.
- **From a person's record** -- Use **Add to Workflow** on a person's page to drop them onto a workflow.
- **From People search** -- Select multiple people and use the bulk **Add to Workflow** action to add them all at once.
- **Automatically with a trigger** -- Add people when something happens, like a form submission or a first gift (see [Triggers](#triggers) below).

## Working the Board

Open a workflow to see its board. Each card shows the person's name, who it is assigned to, and a due-date or status chip (**Overdue** or **Snoozed**). A step column also shows small badges for any automated actions it runs and annotations for its routing, giving you an at-a-glance map of how cards flow.

- **Move a card** -- Drag a card from one column to the next as the person progresses.
- **Open a card** -- Double-click a card (or click it) to open its detail drawer, where you can change the step, reassign it, add notes, and review what's already happened.

From the card drawer you can:

- **Assign** the card to a different person or group.
- **Snooze** the card for 1 day, 3 days, or 1 week to temporarily hide its due date.
- **Send Back** to the previous step or **Skip** to the next step.
- **Pin assignment** -- keep the same owner on the card even as it moves between steps. By default, moving a card to a new step reassigns it to that step's default assignee; pinning keeps the current person responsible throughout.
- **Complete** the card to finish it, or choose an **Outcome** button if the step has outcomes configured (see [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Add notes** and review the card's **history** -- including a log of automated actions that have run (emails sent, waits, etc.).

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

Automatic routes move a card onward **the moment it enters a step** (and after its automated actions finish), without anyone clicking, if the person matches a set of conditions. Add a route, choose the target step, and define one or more **conditions** (for example, a person's campus, age, or membership status). A route with no conditions matches everyone.

:::info
On the board, each step column shows small annotations describing its routing -- for example, an outcome label or "if matches" followed by an arrow to the destination step or workflow.
:::

## Fully Automated Steps

You can make a step run entirely on its own, with no one working it. Give the step its **automated actions** and add an **automatic route** (with no conditions) pointing to the next step. When a card enters, the actions run, and then the route advances it immediately -- the card passes straight through.

:::tip
Combine this with **Wait**: *Send welcome email → Wait 3 days → automatically advance to the "Personal call" step.* The email and the timing are handled for you, and a volunteer only sees the card when it's time for the human touch.
:::

## Triggers

Triggers add people to a workflow automatically when something happens, so you never have to add cards by hand. On a workflow board, click the **Triggers** tab, then **Add Trigger**. There are two kinds:

### Event triggers

Fire as soon as a record changes in B1. Choose the event, then optionally add **conditions** so only matching people are added:

- **Person · Created / Updated** -- e.g. add anyone whose status becomes *Visitor*.
- **Donation · Created** -- e.g. add a first-time or large gift to a thank-you workflow (match on amount, fund, or method).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- add anyone who submits a chosen form (great for an "I'm New" or "Connect" card).

### Schedule triggers

Run on a recurring basis -- daily, weekly, monthly, or yearly -- against a set of conditions. Use these for time-based outreach such as *everyone whose membership anniversary is today* or a *monthly* check-in.

For any trigger you can also set:

- The **entry step** the new card starts on (defaults to the first step).
- **Once per person** -- so the same person isn't added to the workflow twice by the trigger.
- **Active** -- turn the trigger on or off without deleting it.

:::tip
Pair a **Form · Submitted** trigger with the **New Visitor Follow-up** template to turn your "Connect Card" or "I'm New" form into an automatic follow-up pipeline.
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
- [Groups](../groups/index.md) -- the groups an "Add to group" action can place people in
- [Roles & Permissions](../settings/roles-permissions.md) -- control who can view, edit, and manage workflows
