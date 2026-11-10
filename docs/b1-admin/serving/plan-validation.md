---
title: "Plan Validation & Notifications"
description: "Check service plans in B1 Admin for unfilled positions, scheduling conflicts, and blocked-out volunteers, then push-notify your whole team in one click."
---

# Plan Validation & Volunteer Notifications

<div class="article-intro">

B1 Admin automatically checks your plans for problems before Sunday — unfilled positions, scheduling conflicts, and volunteers who have blocked out the date. When everything looks good, you can notify your whole team with a single click.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Create a [service plan](./plans.md) and assign volunteers to positions
- Add [service times](./plans.md) to the plan so conflict detection can check for overlaps
- Make sure volunteers have the [B1 App installed](../../b1-church/getting-started/installing-pwa.md) to receive push notifications

</div>

## The Validation Panel

Every plan has a **Validation** panel that runs automatically as you build it. Open the plan and click **Manage serving team** to see it beside the positions. The plan page itself shows a one-line summary under **Serving team** (for example, "2 conflicts · 3 not notified") with a **Review** link to the full panel. Positions that still need people are listed on the plan page too, so the summary line counts only conflicts and volunteers who haven't been notified.

The panel checks the following:

### Unfilled Positions
If a position requires more people than are currently assigned, the validation panel lists exactly what is still needed — for example, *"Sound Tech: 1 more person needed."* You can see at a glance whether your plan is fully staffed before the week arrives.

### Scheduling Conflicts
If a volunteer is assigned to two positions that overlap in time within the same plan, the validation panel flags the conflict — for example, *"Jane Smith: time conflict between Worship Leader and Children's Check-in during Sunday Service."* This catches double-bookings before they become a Sunday morning problem.

### Blockout Dates
Volunteers can set dates they are unavailable in the B1 App. If someone is assigned to a plan that falls within one of their blockout dates, the validation panel surfaces the conflict automatically so you can find a replacement.

### Cross-Plan Conflicts
The validation also checks across all your plans at once. If the same volunteer is assigned in two different plans that overlap in time — for example, a 9am service and a 10am service that both run until 10:30am — B1 Admin will flag that person as double-booked across plans.

### Scheduling Preferences
If a volunteer has [scheduling preferences](./plans.md#scheduling-preferences), the panel warns you when an assignment goes against them: when they are scheduled more times this month than their **Max times per month**, when none of the plan's times match their **Preferred service times**, or when they asked not to serve on the same day as their household and a household member is also scheduled.

When everything checks out, the panel reads **Plan is valid.**

:::tip
You don't need to do anything to run validation — it updates automatically every time you add or change an assignment. Just keep an eye on the panel as you build the plan.
:::

## Notifying Volunteers

Once your plan is set, you can notify all assigned volunteers at once directly from the validation panel.

1. Open the plan and click **Manage serving team** (or **Review** in the plan's summary line) to see the **Validation** panel
2. If there are unnotified volunteers, you will see a link showing how many need to be notified (e.g., *"Notify 8 volunteer(s)"*). Once everyone has been notified, the panel reads **All volunteers notified.**
3. Click the link to send push notifications to everyone who hasn't been notified yet
4. Volunteers receive a notification on their phone letting them know they have been scheduled and prompting them to confirm their assignment

:::info
Only volunteers who have not yet been notified will be included. If you add someone to the plan later, the link will reappear so you can notify the new addition without re-notifying the rest of the team.
:::

### Publishing a Penciled-In Plan

If the plan is [penciled in](./plans.md#plan-settings), volunteers can't see their assignments yet, and the panel shows *"Penciled in — volunteers can't see these assignments yet."* with a button in place of the notify link:

- **Publish Plan** makes the assignments visible.
- **Publish & Notify** (shown when some volunteers haven't been notified, for example *"Publish & Notify 8 volunteer(s)"*) makes the assignments visible and notifies those volunteers right away.

Confirm in the dialog to publish.

### Plans with a Confirmation Workflow

If the plan's settings name a [confirmation workflow](./workflows.md#serving-assignment-confirmations), the panel shows *"New requests use the confirmation workflow. App alerts stay enabled. Follow-ups stop when each request is accepted or declined."* In that case:

- The notify link counts only volunteers who haven't been notified and haven't responded yet.
- Clicking it sends the usual in-app alert and starts one card per request on the workflow's board. The workflow then sends the email and text follow-ups and, if needed, hands the request to someone to call.
- The plan must be published (not penciled in) and the workflow must be active. Otherwise the panel shows *"Requests could not be issued. Check that the selected workflow is active and the plan is published, then try again."*

:::warning
Volunteers must have the B1 App installed on their home screen with notifications enabled to receive push notifications. See [Installing as an App (PWA)](../../b1-church/getting-started/installing-pwa.md) for setup instructions.
:::

## Related Articles

- [Service Plans](./plans.md)
- [Workflows](./workflows.md)
- [Installing the B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
