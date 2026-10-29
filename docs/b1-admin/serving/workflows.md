---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Workflows move people through a series of steps on a visual board. Each person becomes a card that travels from one step to the next -- from a first-time guest follow-up, to a membership process, to a first-time giver thank-you, and anything else where you need to track many people through the same set of stages. A step can ask a volunteer to do something (make a call, have a conversation) **and** run automated actions on its own -- send an email or text, wait a few days, add the person to a group -- so Workflows handle both the human follow-up and the busywork around it. Workflows extend [Tasks](./tasks.md) into a drag-and-drop Kanban board so nothing and no one falls through the cracks.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Make sure the people you want to track exist in B1 Admin
- Familiarize yourself with how [Tasks](./tasks.md) work, since each card on a board is a task
- To use the **Send email** action, create the email templates you want to send first (managed under **Settings → Email Templates**)
- To use the **Send text** action, connect a [texting provider](../settings/church-settings.md#texting) first
- You will need the appropriate Tasks permission. Viewing, editing cards, and managing workflows are separate permission levels (see [Roles & Permissions](../settings/roles-permissions.md))

</div>

## Viewing Workflows

Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin), expand **Serving**, and click **Workflows**. Your workflows are listed in a table showing each one's **Category** and **Status** (**Active** or **Inactive**). If you use categories, tabs above the list let you filter it by category. Click any workflow to open its board.

## Creating a Workflow

1. On the Workflows page, click **Add Workflow**.
2. Choose how to start:
   - **Blank workflow** -- start from scratch and build your own steps.
   - **From a template** -- start with a ready-made set of steps you can edit. Built-in templates include:
     - **New Visitor Follow-up** -- Send welcome email → Personal phone call → Invite to next step → Connected
     - **Membership Class** -- Express interest → Register for class → Attend class → Complete membership
     - **First-time Giver Thank-you** -- Send thank-you note → Share giving impact → Stewarded
     - **Serving Assignment Confirmation** -- Request and wait for response → Call volunteer about unanswered request (see [Serving Assignment Confirmations](#serving-assignment-confirmations))

   Building a template's steps can take a moment. While it works, the **Add Workflow** button reads **Creating...** and can't be clicked again, so you won't end up with a duplicate. If something goes wrong, the page shows *"The workflow could not be created. Please try again."*
3. Give the workflow a **Name**.
4. Optionally assign a **Category** to group related workflows together. You can create a new category right from the dropdown.
   For a blank workflow, you also choose its **Workflow purpose**: **People follow-up** (the usual kind) or **Serving assignment confirmation**. The purpose can't be changed after the workflow is created.
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
- **Default assignee** -- the person or group new cards on this step are assigned to automatically. When the default assignee is a person, they get a notification that a card has been assigned to them.
- **Automated actions** -- things the system does on its own when a card arrives (see below).
- **Routing** -- where the card goes when it leaves the step (see [Routing](#routing-cards-with-outcomes-and-conditions)).

Drag step columns into the order that matches your process. The order also defines the default path a card takes when no other routing applies.

:::info
Save a new step first. Automated actions and routing attach to the step, so the editor unlocks those sections once the step exists.
:::

## Automated Actions

Every step can carry a list of **automated actions** that run by themselves the moment a card **enters** the step -- before anyone touches it. This is how a step both prompts a volunteer *and* takes care of the routine work around the follow-up.

In the step editor, open **Automated actions**, click **Add Action**, choose a type, and fill in its settings. Add as many as you need; they run **top to bottom in order**. Click **Save** on the step to save the step and all of its actions together. Removing an action with its trash icon takes effect right away.

| Action | What it does |
|---|---|
| **Send email** | Emails the person an email template you choose. You can override the subject line. |
| **Send text** | Texts the person a message you write, through your church's [texting provider](../settings/church-settings.md#texting). |
| **Wait** | Pauses the card for a number of days before continuing (see below). |
| **Add to group** | Adds the person to a [group](../groups/index.md) you pick. |
| **Remove from group** | Removes the person from a group you pick. |
| **Record Attendance** | Marks the person present at a group's service time that is in progress (see below). |
| **Add to workflow** | Starts the person on another workflow -- useful for handing off between processes. |
| **Add note** | Records a note in the card's history. |
| **Set field** | Updates a field on the person's record: Membership Status, Marital Status, Gender, City, State, or Zip. |
| **Webhook** | Sends the card's details to an external web address (URL) you provide, for connecting to other systems. |
| **Create task** | Creates a [task](./tasks.md) with the title and description you enter, assigned to whoever you pick. |
| **Notify Person** | Sends a staff member or volunteer you pick an email and a B1 notification about the card (see below). |

After all of a step's actions finish, the card **rests on that step** so a person can work it -- unless the step has an automatic route that moves it onward (see [Fully automated steps](#fully-automated-steps)).

:::info
Automated actions run only when a card arrives through the normal flow -- when it's first added, when an outcome or automatic route brings it in, or after a Wait finishes. They do **not** re-run when a staff member manually drags a card onto the step or sends it back, so a person won't get the same email twice.
:::

### Sending email

Choose **Send email**, pick one of your email templates, and optionally type a custom subject. When a card enters the step, the person receives that email automatically. (If the person has no email address on file, the step simply skips this action.) [Merge fields](../settings/email-templates.md#merge-fields) in the template, such as `{{firstName}}`, are filled in with the person's own details.

When the email goes out, the card's history records **Email sent**. If it can't be sent -- for example, because your church's email isn't approved yet or the daily limit has been reached -- no "Email sent" entry is added.

:::info
Workflow emails only go out after your church has been approved to send group email, and they count toward your church's daily email limit. See [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church). The **Send email** action warns you in the step editor when these emails won't send: *"Your church's email hasn't been approved yet..."* if approval is still pending, or *"Your church's email is paused..."* if recent messages bounced or were reported as spam.
:::

### Recording attendance

Choose **Record Attendance** and click **Pick group** to choose the group whose attendance should be recorded. When the action runs, the person is marked present for that group's service time that is in progress -- the same as if they had checked in. This is useful with a trigger that adds people to the workflow as they arrive, so they are counted without a separate check-in.

- Attendance is measured at the moment the card was **created**, so a **Wait** earlier in the workflow won't push it past the service.
- Only service times with a day and start time count. If none of the group's service times is in progress at that moment, nothing is recorded and the card's history notes **No scheduled service in progress — attendance not recorded**.
- When attendance is recorded, the card's history shows **Attendance recorded** followed by the group's name. Running the action again for the same service doesn't count the person twice.

### Notifying a person

Choose **Notify Person**, click **Pick person**, and optionally type a **Message**. When a card enters the step, that person gets an email and a B1 notification with the name of the person on the card, the workflow and step names, your message, and a link to open the card. Use it to give a staff member or ministry leader a heads-up -- for example, *"Notify the pastor when someone reaches the Membership Interview step."* The card's history records **Notified** followed by the person's name.

### Sending a text

Choose **Send Text** and type the **Text message** (up to 1,600 characters). When a card enters the step, the person receives that text on their mobile phone. To personalize the message, click a chip below the message box -- **First Name**, **Last Name**, **Display Name**, or **Church Name** -- to insert `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, or `{{churchName}}` at your cursor. Each one is filled in with the person's details when the text is sent.

- If the person has no mobile phone on file, no text is sent and the card's history records **Text skipped: no mobile phone**.
- If the person has opted out, no text is sent and the card's history records **Text skipped: opted out**.
- When the text goes out, the card's history records **Text sent**. If the send fails -- for example, because no texting provider is connected or your church is out of texting credits -- the failure is logged in the card's history and the step's remaining actions still run.

:::warning
Texts are sent through your church's own [texting provider](../settings/church-settings.md#texting). If no provider is connected, the action editor warns *"No texting provider is set up"* and texts will not send.
:::

### Waiting a few days (drip sequences)

The **Wait** action holds a card for the number of days you set. While it waits, the card shows as **Snoozed**. B1 checks for finished waits every 30 minutes, so a card picks up again within about half an hour of its wait ending. When the wait is over:

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

Adding someone by hand, or with an **Add to workflow** step action, never gives them a second open card on the same workflow. If they already have an open card, they're skipped (in a bulk add, only the people without one get new cards). Once their card is closed, you can add them again. Triggers follow their own **Only once per person** setting instead.

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
- **Remove card** -- take a card off the board without finishing it, for example when someone was added by mistake. After you confirm, the card is closed and taken off everyone's list. No outcomes, routes, or step actions run, and its history is kept with a **Removed** entry. For a [serving assignment confirmation](#serving-assignment-confirmations) card, removing it closes the request the same way.
- **Add notes** and review the card's **Activity** -- a log of automated actions that have run (emails sent, waits, etc.), each with the date and time it happened.

For a card about a person, the drawer also shows that person's mobile phone and email as links you can tap to call or email them, plus a **View profile** link if you have permission to view people. The person a card is assigned to sees the phone and email even without access to People.

Notes are saved with the card. Anyone who can open the card -- including the person or group it's assigned to -- can read the notes and add their own. People who can't open the card can't see its notes.

### Bulk actions

Select the checkboxes on multiple cards to act on them together. To pick every card in a step at once, check the **Select all** box in that step's column header; check it again to clear them. A toolbar appears letting you **Complete**, **Snooze**, **Assign** (reassign), or **Move to…** another step for all selected cards at once.

## Routing Cards with Outcomes and Conditions

Routing controls where a card goes when it leaves a step. Open a step's editor to configure two kinds of routing.

### Outcome buttons

Outcomes are buttons shown on the card drawer when you are completing a card on that step. Instead of a single **Complete** button, you can offer choices like "Joined a Group" or "Not Interested." Each outcome can:

- Send the card to **another step** in this workflow,
- **Hand the card off** to a different workflow entirely, or
- **Close** the card.

This lets one decision branch the person down different paths.

### Automatic routing (conditional)

Automatic routes move a card onward **the moment it enters a step** (and after its automated actions finish), without anyone clicking, if the person matches a set of conditions. Add a route, choose the target step, and define one or more **conditions** (for example, a person's campus, age, or membership status). Text fields can be matched exactly or with **contains**, **starts with**, or **ends with**. A route with no conditions matches everyone.

Date conditions (Today's Date, Birth Date, or Anniversary) can compare the full date or just part of it -- the day of the week, the **Day of Month**, the **Month**, or years elapsed. For a person's Birth Date or Anniversary, **Day of Month** offers a relative **Today** option, so a condition like *Birth Date · Day of Month = Today* matches people whose birthday falls on today's day of the month. **Month** offers **Previous Month**, **Current Month**, and **Next Month**. Relative values like these are worked out using your church's time zone, so they line up with your church's calendar day rather than the server's.

The **Giving** group of conditions has **Lapsed regular giver**, which finds people who used to give regularly and then stopped. Set three numbers: *Gave in at least* **3** *of the last* **12** *weeks, then nothing in the last* **3** *weeks* (those are the defaults). The weeks are counted back from today in your church's time zone, and a refunded gift doesn't count. It is most useful on a [schedule trigger](#schedule-triggers) -- for example, a weekly rule that adds lapsed givers to a pastoral care follow-up board. The condition only looks at gift dates, never amounts, and cards and alerts never show amounts. Because it reveals who has stopped giving, only people who can view donations see this option and can add, change, or remove it.

If a route's conditions can't be checked for some reason, that route is treated as not matching. The card stays on the step (or follows another route that does match) instead of getting stuck.

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

- **Person · Created / Updated** -- e.g. add anyone whose status becomes *Visitor* or *Guest* (the status given to people who register themselves).
- **Donation · Created** -- e.g. add a first-time or large gift to a thank-you workflow (match on amount, fund, or method).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- add anyone who submits a chosen form (great for an "I'm New" or "Connect" card).

### Schedule triggers

Run on a recurring basis -- daily, weekly, monthly, or yearly -- against a set of conditions. Use these for time-based outreach such as *everyone whose birthday is today* (Birth Date · Day of Month = **Today**, with the month matched to **Current Month**) or a *monthly* check-in. Even without **Only once per person**, a schedule trigger won't add the same person again within one repeat period (a day, week, month, or year, matching how often it runs).

For any trigger you can also set:

- The **Starting step** the new card lands on (defaults to the first step).
- **Only once per person** -- so the same person isn't added to the workflow twice by the trigger. With this on, anyone who already has a card on this workflow is skipped.
  - **Add again after their card is closed** -- appears when **Only once per person** is on. Check it to let the trigger add someone again once their earlier card on this workflow is closed. A person still never has two open cards on the workflow at the same time. Use this for things that can happen more than once, like a returning guest or a yearly process.
- **Active** -- turn the trigger on or off without deleting it.

:::tip
Pair a **Form · Submitted** trigger with the **New Visitor Follow-up** template to turn your "Connect Card" or "I'm New" form into an automatic follow-up pipeline.
:::

## Serving Assignment Confirmations

A special kind of workflow can follow up on [serving requests](./plans.md#assigning-team-members) until each volunteer accepts or declines. Instead of people, each card on this board tracks **one assignment** -- one person in one position on one plan. Two roles or two services for the same person get separate cards. This is opt-in: nothing changes for a plan until you select a confirmation workflow in its settings.

### Setting one up

1. On the Workflows page, click **Add Workflow** and choose the **Serving Assignment Confirmation** template. (Or start a **Blank workflow** and set its **Workflow purpose** to **Serving assignment confirmation**.) Creating from the template requires permission to send texts, since it includes a text step.
2. Review the steps. The template starts with:
   - **Request and wait for response** -- sends the serving request by email and by text, waits 2 days, sends a reminder email, waits 1 more day, then automatically moves the card on.
   - **Call volunteer about unanswered request** -- a step for a person to call the volunteer, due in 1 day. Set a **Default assignee** on this step. If it has none, the card goes to the ministry's leader, or to the ministry team if there isn't one.
3. Edit the waits, messages, and steps to fit your church.
4. Open a [plan's settings](./plans.md#plan-settings) and choose this workflow under **Confirmation workflow**.

These workflows use a **Send serving request** action instead of **Send email** and **Send text**. Choose **Email** or **Text message** and, optionally, write a **Request message**. The request always includes the role, plan, service date, and a link to respond; you can use `{{planName}}`, `{{positionName}}`, and `{{serviceDate}}` in your message. Leave the message empty to use the default request. Volunteers' notification preferences, text opt-in, your texting provider, and your church's email approval all apply, and any skipped or blocked attempt is recorded on the card. **Send email**, **Send text**, and **Add to workflow** aren't available on these boards.

The **Triggers** tab on a confirmation workflow explains how cards are started rather than offering triggers, and these workflows don't appear in the **Add to Workflow** lists for people.

### How cards are started and closed

- Cards start when you **Notify** volunteers on a published plan (see [Notifying Volunteers](./plan-validation.md#notifying-volunteers)). Each new, unanswered assignment gets one card. Saving, publishing, copying, or auto-filling a plan doesn't contact anyone on its own, and penciled-in plans send nothing.
- Volunteers still get the usual in-app alert. Email and text follow-up come from the workflow.
- When the volunteer **accepts or declines**, their card closes automatically, along with any follow-up tasks linked to it.
- The card drawer shows the position, service date, and a link to the plan. Instead of **Complete**, the button reads **Record follow-up done**. Clicking it records that someone followed up, but the card stays open and assigned (shown as **Awaiting response**) until the volunteer responds or the response deadline passes.
- The response deadline is the end of the last service time that the position's team serves in. If the plan has no matching times, it's the end of the service day. If nobody has answered by then, the card closes with **Response deadline passed** and a **Review unanswered serving request** task goes to the card's current owner or the ministry leader so someone can decide how to cover the spot. The assignment stays **Unconfirmed**.
- Removing the assignment, changing its person, position, or plan date, returning the plan to penciled in, or switching the plan to a different confirmation workflow closes the card. A closed card is never reopened by another **Notify**; add a new assignment to send a fresh request.

:::info
For requests sent through a confirmation workflow, [volunteer reminders](./plans.md#volunteer-reminders) go only to volunteers who have **accepted**, so people waiting to respond don't get reminders on top of the workflow's follow-ups.
:::

## My Cards

Volunteers and staff do not need to dig through every board to find their work. The **My Cards** list on the **My Work** page shows every card assigned to the current user across all workflows. To get there, click **My Cards** at the top of the Workflows page, or open **Serving > My Work** in the Jump menu. Clicking a card opens the board it belongs to.

## Reports

Open a workflow and click **Reports** to see analytics for that workflow:

- **Overdue** -- the number of cards past their due date.
- **Cards per Step** -- how many cards currently sit on each step, shown as a column chart.
- **Completed (30 days)** -- throughput over the last 30 days, shown as a line chart.

Use these to spot bottlenecks -- for example, a step where cards pile up and never advance.

## Related Articles

- [Tasks](./tasks.md) -- the individual action items that workflow cards are built on
- [Forms](../forms/index.md) -- build the forms that can trigger workflows
- [Groups](../groups/index.md) -- the groups an "Add to group" action can place people in
- [Service Plans](./plans.md) -- choose a confirmation workflow for a plan's serving requests
- [Roles & Permissions](../settings/roles-permissions.md) -- control who can view, edit, and manage workflows
