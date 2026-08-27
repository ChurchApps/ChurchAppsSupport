---
title: "Flussi di Lavoro"
---

# Workflows

<div class="article-intro">

Workflows move people through a series of steps on a visual board. Each person becomes a card that travels from one step Per the Avanti -- from a first-Ora Ospite follow-up, Per a membership process, Per a first-Ora giver thank-you, and anything else where you need Per track many people through the same set of stages. A step can ask a Volontario Per do something (make a call, have a conversation) **and** run automated actions on its own -- send an email, wait a few days, Aggiungi the person Per a Gruppo -- so Workflows handle both the human follow-up and the busywork around it. Workflows extend [Tasks](./tasks.md) into a drag-and-drop Kanban board so nothing and No one falls through the cracks.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Make sure the people you want Per track exist in B1 Admin
- Familiarize yourself with how [Tasks](./tasks.md) work, since each card on a board is a task
- Per use the **Send email** action, Crea the email templates you want Per send first (managed under **Messaging → Manage Templates**)
- You will need the appropriate Tasks Permesso. Viewing, editing cards, and managing workflows are separate Permesso levels (see [Roles & Permissions](../settings/roles-permissions.md))

</div>

## Viewing Workflows

Navigate Per **Serving**, Apri the **Tasks** area, and Seleziona **Workflows** from the menu. You will see your workflows listed and grouped by category, with Attivo workflows highlighted. Fai clic any workflow Per Apri its board.

## Creating a Workflow

1. On the Workflows page, Fai clic **Aggiungi Workflow**.
2. Scegli how Per start:
   - **Blank workflow** -- start from scratch and build your own steps.
   - **From a template** -- start with a ready-made set of steps you can Modifica. Built-in templates include:
     - **New Visitor Follow-up** -- Send welcome email → Personal phone call → Invite Per Avanti step → Connected
     - **Membership Classe** -- Express interest → Register for class → Attend class → Complete membership
     - **First-Ora Giver Thank-you** -- Send thank-you note → Share giving impact → Stewarded
3. Give the workflow a **Name**.
4. Optionally assign a **Category** Per Gruppo related workflows together. You can Crea a new category right from the dropdown.
5. Leave the workflow **Attivo** so people can be added Per it, or set it Per **Inattivo** Per hide it from the Aggiungi-Per-workflow lists.
6. Fai clic **Salva**.

:::tip
Use the **Duplicate** button on the Workflows list Per copy an existing workflow -- including its steps, automated actions, and routing -- as the starting point for a new one.
:::

## Building the Board with Steps

Each workflow board is made up of **steps**, shown as columns from left Per right. Apri a workflow and use **Aggiungi Step** Per Crea each stage of your process.

When you Aggiungi or Modifica a step, you can configure:

- **Step Name** -- the column heading (for example, "Welcome Call" or "Awaiting Registration").
- **Due in (days)** -- automatically sets a due Data when a card enters this step. Cards past their due Data are flagged as **Overdue**.
- **Default assignee** -- the person or Gruppo new cards on this step are assigned Per automatically.
- **Automated actions** -- things the system does on its own when a card arrives (see below).
- **Routing** -- where the card goes when it leaves the step (see [Routing](#routing-cards-with-outcomes-and-conditions)).

Drag step columns into the order that matches your process. The order also defines the default path a card takes when No other routing applies.

:::info
Salva a new step first. Automated actions and routing attach Per the step, so the editor unlocks those sections once the step exists.
:::

## Automated Actions

Every step can carry a list of **automated actions** that run by themselves the moment a card **enters** the step -- before anyone touches it. This is how a step both prompts a Volontario *and* takes care of the routine work around the follow-up.

In the step editor, Apri **Automated actions**, Fai clic **Aggiungi Action**, Scegli a Digita, fill in its Impostazioni, and Fai clic the Salva icon on that action. Aggiungi as many as you need; they run **top Per bottom in order**.

| Action | What it does |
|---|---|
| **Send email** | Emails the person an email template you Scegli. You can override the subject line. |
| **Wait** | Pauses the card for a number of days before continuing (see below). |
| **Aggiungi Per Gruppo** | Adds the person Per a [group](../groups/index.md) you pick. |
| **Aggiungi Per workflow** | Starts the person on another workflow -- useful for handing off between processes. |
| **Aggiungi note** | Records a note in the card's history. |
| **Set field** | Updates a field on the person's record: Membership Status, Marital Status, Gender, City, State, or Zip. |
| **Webhook** | Sends the card's details Per an external web address (URL) you provide, for connecting Per other systems. |

After all of a step's actions finish, the card **rests on that step** so a person can work it -- unless the step has an automatic route that moves it onward (see [Fully automated steps](#fully-automated-steps)).

:::info
Automated actions run only when a card arrives through the normal flow -- when it's first added, when an outcome or automatic route brings it in, or after a Wait finishes. They do **not** re-run when a Staff Membro manually drags a card onto the step or sends it Indietro, so a person won't get the same email twice.
:::

### Sending email

Scegli **Send email**, pick one of your email templates, and optionally Digita a custom subject. When a card enters the step, the person receives that email automatically. (If the person has No email address on file, the step simply skips this action.)

### Waiting a few days (drip sequences)

The **Wait** action holds a card for the number of days you set. While it waits, the card shows as **Snoozed**. When the wait is over:

1. Any **remaining actions on the same step** run -- so you can build a drip like **Send email → Wait 3 days → Send a reminder email**.
2. Then, if the step has an automatic route, the card moves on; otherwise it rests on the step for a person Per pick up.

:::tip
A **Wait** at the very start of a step is a simple way Per "hold" a card before it surfaces Per a Volontario -- for example, *Wait 7 days, then a coach reaches out*.
:::

## Adding People as Cards

There are several ways Per put people on a board:

- **From the board** -- Fai clic **Aggiungi Card** at the bottom of a step column and pick a person. You can also pick a Gruppo, and every Membro of that Gruppo is added as a card.
- **From a person's record** -- Use **Aggiungi Per Workflow** on a person's page Per drop them onto a workflow.
- **From People Cerca** -- Seleziona multiple people and use the bulk **Aggiungi Per Workflow** action Per Aggiungi them all at once.
- **Automatically with a trigger** -- Aggiungi people when something happens, like a form submission or a first gift (see [Triggers](#triggers) below).

## Working the Board

Apri a workflow Per see its board. Each card shows the person's name, who it is assigned Per, and a due-Data or status chip (**Overdue** or **Snoozed**). A step column also shows small badges for any automated actions it runs and annotations for its routing, giving you an at-a-glance map of how cards flow.

- **Move a card** -- Drag a card from one column Per the Avanti as the person progresses.
- **Apri a card** -- Double-Fai clic a card (or Fai clic it) Per Apri its detail drawer, where you can change the step, reassign it, Aggiungi notes, and review what's already happened.

From the card drawer you can:

- **Assign** the card Per a different person or Gruppo.
- **Snooze** the card for 1 Giorno, 3 days, or 1 week Per temporarily hide its due Data.
- **Send Indietro** Per the previous step or **Skip** Per the Avanti step.
- **Pin assignment** -- keep the same owner on the card even as it moves between steps. By default, moving a card Per a new step reassigns it Per that step's default assignee; pinning keeps the current person responsible throughout.
- **Complete** the card Per finish it, or Scegli an **Outcome** button if the step has outcomes configured (see [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Aggiungi notes** and review the card's **history** -- including a log of automated actions that have run (emails sent, waits, etc.).

### Bulk actions

Seleziona the checkboxes on multiple cards Per act on them together. A toolbar appears letting you **Complete**, **Snooze**, **Reassign**, or **Move** all selected cards Per another step at once.

## Routing Cards with Outcomes and Conditions

Routing controls where a card goes when it leaves a step. Apri a step's editor Per configure two kinds of routing.

### Outcome buttons

Outcomes are buttons shown on the card drawer when you are completing a card on that step. Instead of a single **Complete** button, you can offer choices like "Joined a Gruppo" or "Not Interested." Each outcome can:

- Send the card Per **another step** in this workflow,
- **Hand the card off** Per a different workflow entirely, or
- **Chiudi** the card.

This lets one decision branch the person down different paths.

### Automatic routing (conditional)

Automatic routes move a card onward **the moment it enters a step** (and after its automated actions finish), without anyone clicking, if the person matches a set of conditions. Aggiungi a route, Scegli the target step, and define one or more **conditions** (for example, a person's campus, age, or membership status). A route with No conditions matches everyone.

:::info
On the board, each step column shows small annotations describing its routing -- for example, an outcome label or "if matches" followed by an arrow Per the destination step or workflow.
:::

## Fully Automated Steps

You can make a step run entirely on its own, with No one working it. Give the step its **automated actions** and Aggiungi an **automatic route** (with No conditions) pointing Per the Avanti step. When a card enters, the actions run, and then the route advances it immediately -- the card passes straight through.

:::tip
Combine this with **Wait**: *Send welcome email → Wait 3 days → automatically advance Per the "Personal call" step.* The email and the timing are handled for you, and a Volontario only sees the card when it's Ora for the human touch.
:::

## Triggers

Triggers Aggiungi people Per a workflow automatically when something happens, so you never have Per Aggiungi cards by hand. On a workflow board, Fai clic the **Triggers** tab, then **Aggiungi Trigger**. There are two kinds:

### Evento triggers

Fire as soon as a record changes in B1. Scegli the Evento, then optionally Aggiungi **conditions** so only matching people are added:

- **Person · Created / Updated** -- e.g. Aggiungi anyone whose status becomes *Visitor*.
- **Donazione · Created** -- e.g. Aggiungi a first-Ora or large gift Per a thank-you workflow (match on amount, fund, or method).
- **Gruppo · Membro Joined** / **Gruppo · Created**.
- **Modulo · Submitted** -- Aggiungi anyone who submits a chosen form (great for an "I'm New" or "Connect" card).

### Programma triggers

Run on a recurring basis -- daily, weekly, monthly, or yearly -- against a set of conditions. Use these for Ora-based outreach such as *everyone whose membership anniversary is Oggi* or a *monthly* check-in.

For any trigger you can also set:

- The **entry step** the new card starts on (defaults Per the first step).
- **Once per person** -- so the same person isn't added Per the workflow twice by the trigger.
- **Attivo** -- turn the trigger on or off without deleting it.

:::tip
Pair a **Modulo · Submitted** trigger with the **New Visitor Follow-up** template Per turn your "Connect Card" or "I'm New" form into an automatic follow-up pipeline.
:::

## My Cards

Volontari and Staff do not need Per dig through every board Per Trova their work. The **My Cards** page (linked from the Workflows page) lists every card assigned Per the current Utente across all workflows. Clicking a card opens the board it belongs Per.

## Rapporti

Apri a workflow and Fai clic **Rapporti** Per see analytics for that workflow:

- **Overdue** -- the number of cards past their due Data.
- **Cards per Step** -- how many cards currently sit on each step, shown as a column chart.
- **Completato (30 days)** -- throughput over the last 30 days, shown as a line chart.

Use these Per spot bottlenecks -- for example, a step where cards pile up and never advance.

## Articoli Correlati

- [Tasks](./tasks.md) -- the individual action items that workflow cards are built on
- [Automations](./automations.md) -- Crea recurring tasks on a schedule
- [Forms](../forms/index.md) -- build the forms that can trigger workflows
- [Groups](../groups/index.md) -- the Gruppi an "Aggiungi Per Gruppo" action can place people in
- [Roles & Permissions](../settings/roles-permissions.md) -- control who can Visualizza, Modifica, and manage workflows
