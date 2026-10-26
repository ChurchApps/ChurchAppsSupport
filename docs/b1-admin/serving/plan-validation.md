---
title: "Plan Validation & Notifications"
---

# Plan Validation & Volunteer Notifications

<div class="article-intro">

B1 Admin automatically checks your plans for problems before Sunday — unfilled positions, scheduling conflicts, and volunteers who have blocked out the date. When everything looks good, you can notify your whole team with a single click.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Create a [service plan](./plans.md) and assign volunteers to positions
- Add [service times](./plans.md) to the plan so conflict detection can check for overlaps
- Make sure volunteers have the B1 Mobile app installed to receive push notifications

</div>

## The Validation Panel

Every plan has a **Validation** panel that runs automatically as you build it. It checks three things:

### Unfilled Positions
If a position requires more people than are currently assigned, the validation panel lists exactly what is still needed — for example, *"Sound Tech: 1 more person needed."* You can see at a glance whether your plan is fully staffed before the week arrives.

### Scheduling Conflicts
If a volunteer is assigned to two positions that overlap in time within the same plan, the validation panel flags the conflict — for example, *"Jane Smith: time conflict between Worship Leader and Children's Check-in during Sunday Service."* This catches double-bookings before they become a Sunday morning problem.

### Blockout Dates
Volunteers can set dates they are unavailable in B1 Mobile. If someone is assigned to a plan that falls within one of their blockout dates, the validation panel surfaces the conflict automatically so you can find a replacement.

### Cross-Plan Conflicts
The validation also checks across all your plans at once. If the same volunteer is assigned in two different plans that overlap in time — for example, a 9am service and a 10am service that both run until 10:30am — B1 Admin will flag that person as double-booked across plans.

:::tip
You don't need to do anything to run validation — it updates automatically every time you add or change an assignment. Just keep an eye on the panel as you build the plan.
:::

## Notifying Volunteers

Once your plan is set, you can notify all assigned volunteers at once directly from the validation panel.

1. Open the plan and scroll to the **Validation** panel
2. If there are unnotified volunteers, you will see a link showing how many need to be notified (e.g., *"Notify 8 volunteers"*)
3. Click the link to send push notifications to everyone who hasn't been notified yet
4. Volunteers receive a notification on their phone letting them know they have been scheduled and prompting them to confirm their assignment

:::info
Only volunteers who have not yet been notified will be included. If you add someone to the plan later, the link will reappear so you can notify the new addition without re-notifying the rest of the team.
:::

### Plans with a Confirmation Workflow

If the plan's settings name a [confirmation workflow](./workflows.md#serving-assignment-confirmations), the panel shows *"New requests use the confirmation workflow. App alerts stay enabled. Follow-ups stop when each request is accepted or declined."* In that case:

- The notify link counts only volunteers who haven't been notified and haven't responded yet.
- Clicking it sends the usual in-app alert and starts one card per request on the workflow's board. The workflow then sends the email and text follow-ups and, if needed, hands the request to someone to call.
- The plan must be published (not penciled in) and the workflow must be active. Otherwise the panel shows *"Requests could not be issued. Check that the selected workflow is active and the plan is published, then try again."*

:::warning
Volunteers must have the B1.church mobile experience installed (PWA on their home screen, or the deprecated B1 Mobile native app for users who still have it) with notifications enabled to receive push notifications. See [Installing as an App (PWA)](/docs/b1-church/getting-started/installing-pwa) for setup instructions.
:::

## Related Articles

- [Service Plans](./plans.md)
- [Workflows](./workflows.md)
- [Installing the B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
