---
title: "Service Plans"
description: "Set up volunteer scheduling in B1 Admin: create service plans by date, copy from earlier weeks, assign team members to positions, and manage signup deadlines and reminders."
---

# Service Plans

<div class="article-intro">

Service plans organize who is serving and when. Each plan is tied to a specific date and ministry, making it easy to coordinate your volunteer teams week by week and ensure every service is fully staffed.

</div>

## Training Video

<YouTube id="_ekj0UR6H5g" title="Creating Plans and Scheduling Volunteers in B1" next="Building the Service Order and Song Library in B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up your [ministries, teams, and plan types](./ministries-and-teams.md) in the Serving area
- Make sure volunteers have been added to your [people directory](../people/adding-people.md) and assigned to teams

</div>

## Accessing Plans

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Serving**, and click **Plans**.
2. Select a **ministry tab** at the top of the page.
3. Click on a **plan type** to see the list of plans for that type. Use **Upcoming** and **Past** above the list to switch between future and earlier plans. **Upcoming** lists plans from today on, soonest first, with undated plans at the end. **Past** lists only earlier plans, newest first.
4. Click on a specific plan to open it.

Each plan page shows links back to its plan type and to **Plans**, so you can move back up without the browser's back button.

To move to the plan before or after this one, use the arrows on either side of the service date at the top of the page. They step through plans of the same plan type in service date order, and keep you on the same page, so if you are on the order of service or the serving team page, the arrow opens that same page on the neighboring plan. Hover over an arrow to see which plan it goes to.

:::info
Full admin access is not required to manage plans. Anyone who is a member of a ministry can navigate to Serving and create, edit, and schedule plans for their own ministry without needing the Plans Edit permission. Editors with the Plans Edit role can manage plans across every ministry.
:::

## Creating a Plan

1. From the plan type page, click **New Plan** at the top of the page. The **Add a Plan** form opens.
2. Give the plan a name or use the date as the name. Select the **Service Date**. If your church has more than one campus, you can also pick the plan's **Campus**.
3. If your ministry has [templates](./plan-templates.md), you can pick one under **Start from template** to fill in the order of service, positions, and notes in one step.
4. Otherwise, if you would like to copy from a previous plan, use **Copy from Previous Plan** to choose **Positions Only** or **Positions and Assignments**. If you do not want to copy, choose **Nothing**. You can also check **Copy Order of Service**. When you copy from a previous plan, the new plan also keeps that plan's **Notes**, **Signup Deadline**, **Show volunteer names on signup page**, and automatic-replacement setting, so you don't have to re-enter them each week. You can change any of them in the new plan's settings.
5. To set up several plans at once while copying, choose **Repeat every** and **Frequency** (Day, Week, or Month), then enter the **Number of plans** (up to 12). For Month, **On** lets you keep the same day of the month or the same weekday, such as the second Saturday. B1 lists the dates before you save and creates one plan for each date, each copied from the one before it. If the plan is named after its date, each new plan is named after its own date.
6. Optionally set the **Signup Deadline (hours before service)**. A new plan starts with the previous plan's deadline, and you can change it here. Leave it blank for no deadline. See [Plan Settings](#plan-settings) for how the deadline is counted.
7. Save the plan. You can now begin assigning team members and building out the [service order](./service-order.md).

:::tip
The repeat settings are only available while you are copying something from the previous plan (positions, assignments, or the order of service).
:::

## The Plan Page

When you open a plan, its ministry and plan type, name, and service date appear at the top, with **Print** and **Edit details** buttons. The page gives you an overview of the whole plan:

- **Run time**, **Serving team**, and **Responses** tiles show the length of the order of service, how many positions are filled (for example, "10 of 13 filled"), and how many volunteers have accepted, are pending, or declined.
- **Order of Service** shows the first items of the [order of service](./service-order.md) with their lengths. Click **Edit order of service** to open the full order of service on its own page.
- **Serving team** lists each position by category with the volunteers assigned and how many are still needed. If anything needs attention, a line such as "1 conflict · 3 not notified" appears with a **Review** link. Click **Manage serving team** to open the full serving team page.
- **Times** lists the plan's service and rehearsal times. See [Service Times](#service-times).
- **Notes** holds notes for the whole team. Click **Edit**, type your notes, and click **Save Notes**.

The order of service and serving team pages each have a **Back to plan** link that returns you to the overview.

## Service Times

Times tell B1 when the service and any rehearsals happen. They are used for the signup deadline, [plan validation](./plan-validation.md), volunteer reminders, and the clock times in the order of service.

1. On the plan page, click **Add time** next to **Times**.
2. Choose the **Type**: **Service**, **Rehearsal**, or **Other**.
3. Enter a **Display Name** (for example, "Sunday Service" or "Rehearsal").
4. Set the **Start Time** and **End Time**.
5. Under **Needed Serving Teams**, check the position categories (for example, Worship or Technical) that serve at this time.
6. Click **Save**.

Click a time's name to edit or delete it.

## Assigning Team Members

1. Open a plan and click **Manage serving team**.
2. Click **Add Position**. In the **Add a Position** dialog, choose or type a **Category Name** (for example, Worship or Hospitality), enter the position **Name** and the **Volunteer Count**, and pick a **Volunteer Group**. To let anyone in your church fill the position (not just members of one team), leave **Volunteer Group** set to **None**. Check **Allow Self-Signup** to let volunteers sign themselves up for open spots, and add an optional **Description** that volunteers see when they browse signup opportunities. Click **Save**.
3. Click the **People Needed** link next to the position (for example, "2 People Needed").
4. In the **Assign Position** dialog, click a team member's name to assign them. On a long team, type in the **Search team** box to filter the list by name; the list scrolls inside the dialog so **Done** stays in view. If the position's Volunteer Group is set to **None**, search for anyone in your church and click the add-person icon next to the person instead. Click **Done** when you're finished.
5. Assigned volunteers appear next to the position. A green dot on their picture means they accepted, and a red dot means they declined. A volunteer who has blocked out the plan's date shows a red **Unavailable** badge (see [Block-Out Dates](#block-out-dates)). When a volunteer accepts or declines, the leaders of the plan's ministry get a notification. If the volunteer gave a reason for declining, it is included at the end of that notification (for example, "...Reason: Out of town").
6. Notify the volunteers from the **Validation** panel (see [Notifying Volunteers](./plan-validation.md#notifying-volunteers)). If the plan uses a [confirmation workflow](#plan-settings), notifying also starts a workflow card that follows up on each request until the volunteer responds.

To change or remove an assignment, click the volunteer's name and click **Delete** in the **Edit Assignment** dialog. To change a position, click its name; **Delete** in the **Edit Position** dialog removes the position and unschedules anyone assigned to it.

Each position shows a count chip (for example, "2/3", or "1/2 signup" for self-signup positions) so you can see how many spots are filled at a glance. At the top of the serving team page, a summary ("X of Y positions filled") shows your overall staffing for the plan, along with how many are still needed, switching to **Fully staffed** once every position is covered.

:::tip
Set up your [serving teams](./ministries-and-teams.md#creating-serving-teams) before creating plans. This way, you will have a ready pool of volunteers to assign from. In the position list, the team a position draws from is shown in parentheses after the position's name.
:::

### Choosing Who to Assign

The **Assign Position** dialog helps you spread the load across your team:

- Under each name, **Last served** shows the date that person last served on a plan before this one (declined assignments don't count). People who have never served show **Hasn't served yet**.
- A **Serving that day** badge means the person is already assigned somewhere else on the same day. Hover over it to see the other position and plan.
- An **Unavailable** badge means the person has blocked out the date. Hover over it to see the dates.

The list puts people who are free first, then people already serving that day, then people who are unavailable. Within each group, whoever served least recently comes first, the same order Auto Assign uses. You can still pick anyone in the list, including people marked **Serving that day** or **Unavailable**.

### Auto Assign

Click **Auto Assign** on the serving team page to fill every open spot from the position's Volunteer Group. Positions without a Volunteer Group are skipped. To take back the volunteers it just added, click **Undo Auto Assign**. You can also fill many plans at once from the [Plans Overview](./plans-overview.md#auto-scheduling-from-the-overview).

### Scheduling Preferences

In the **Assign Position** dialog, click the sliders icon next to a team member to set their **Scheduling Preferences**: **Max times per month**, **Preferred service times**, and **Household scheduling** (schedule the household together, or not on the same day). [Plan validation](./plan-validation.md) warns you when an assignment goes against these preferences.

Volunteers can also set their own preferences from the **Plans** page of the member app (see [Scheduling Preferences](../../b1-church/plans/viewing-plans.md#scheduling-preferences)). Both places edit the same preferences.

### Block-Out Dates {#block-out-dates}

Volunteers usually enter the dates they can't serve themselves, on the **Plans** page of the member app. For volunteers who won't do that, staff can record block-out dates for them on the team's page:

1. In **Serving**, select the ministry tab and click the team's name in the **Serving Teams** list.
2. Below the team's members, the **Block-out dates** card lists each member's upcoming block-out dates, with **From** and **To** dates.
3. Click **Add block-out**, choose the **Team member**, set the **From** and **To** dates, and click **Save**.
4. To remove one, click the trash icon on its row and confirm.

Adding and removing block-out dates on the team page requires the Plans Edit permission.

When a volunteer has blocked out a plan's date, a red **Unavailable** badge appears beside their name in the serving team's position list, in the **Assign Position** dialog, and in the [Plans Overview](./plans-overview.md) grid. Hover over the badge to see the blocked-out dates. The [Validation](./plan-validation.md#blockout-dates) panel also lists the conflict.

### Copying Positions into an Empty Plan

If a plan has no positions yet and there is an earlier plan of the same type, a **Copy from Previous Plan** link appears on the serving team page. Choose **Positions Only** or **Positions and Assignments** to fill the plan you have open with the previous plan's positions (and volunteers). The copy goes into the current plan; it does not create a second plan for the same date.

## Plan Settings

Each plan has additional settings you can configure by clicking **Edit** next to the plan in the plan type's list, or **Edit details** at the top of the plan page. Click **Done** (or the plan's name above the form) to return to the plan. The same form has a **Delete** button that deletes the plan, including its positions, assignments, and order of service. The settings include:

- **Signup Deadline (hours before service)** — the number of hours before the service when volunteer signups close. The hours are counted back from the plan's first **Service** time (rehearsals and other times are skipped unless the plan has nothing else), so a 2-hour deadline on a 10:00 AM service closes signups at 8:00 AM that morning. If the plan has no times, the deadline is counted from 9:00 AM on the service date in your church's time zone. Once it passes, volunteers can neither sign up nor remove themselves. Enter a negative number to keep signups open past the service start time. Leave it blank, or clear it, for no deadline.
- **Confirmation workflow** — choose a [Serving Assignment Confirmation workflow](./workflows.md#serving-assignment-confirmations) to follow up on this plan's serving requests by email and text until each volunteer accepts or declines. When you **Notify** volunteers on the published plan, each new request gets its own card on that workflow's board, and a note above the notify link says *"New requests use the confirmation workflow."* Leave it on **Use existing assignment notifications** to keep the usual notifications. Only active confirmation workflows appear in the list; create one under **Serving > Workflows** first.
- **Show volunteer names on signup page** — when checked, signed-in volunteers can see who else is already signed up for each position on the B1.church signup page. Names are never shown to visitors who aren't signed in. It also controls whether the volunteers covering each order-of-service item are printed next to it (see [Printing Plans](#printing-plans)).
- **Penciled in** — hides assignments from volunteers until you are ready to publish the schedule. While a plan is penciled in, the **Validation** panel on the serving team page shows a **Publish Plan** button (or **Publish & Notify** when volunteers haven't been notified yet) that makes the assignments visible.
- **Automatically schedule a replacement when a volunteer declines** — when checked, if an assigned volunteer declines their position B1 will automatically contact the next available person on the team roster and ask if they can serve. This continues down the list until someone accepts, keeping your positions filled without manual follow-up.

:::tip
On the member signup page, each plan's open positions are listed by category and then by name. Members see every upcoming week with open positions unless you turn on **Show only the next week of each plan type** in [Settings > Volunteer Signup](../settings/church-settings.md#volunteer-signup).
:::

## Volunteer Reminders {#volunteer-reminders}

B1 can automatically remind volunteers ahead of the services they are scheduled for, so you do not have to chase down your team each week. Reminders go to **everyone scheduled** — both those who have confirmed and those who have not yet responded. The exception is a request sent through a [confirmation workflow](./workflows.md#serving-assignment-confirmations): that volunteer gets reminders only after they accept, since the workflow handles following up until then. Each reminder email includes the volunteer's position(s), the service date, the plan notes, and your custom message.

Reminder timing and content are set per **plan type**, so each kind of service can keep its own schedule.

1. From the **Serving** area, select the ministry that contains the plan type.
2. In the **Plan Types** list, click **Edit** next to the plan type.
3. Expand the **Reminders** section and turn on **Send reminders for plans of this type**.
4. Under **When should reminders go out?**, pick up to three timings. Use the quick choices (**7 days before**, **3 days before**, **2 days before**, **1 day before**, **Day of**) or type any number of days up to 14 in the **Other** box and click **Add**. For a Sunday service, 6 days before is Monday.
5. Set the **Time of Day** the reminders go out.
6. Optionally add a **Message**. Leave it blank to use the default reminder wording.
7. Under **Send By**, choose **Push**, **Email**, and, if your church has a [texting provider](../settings/church-settings.md#texting) connected, **Text**.
8. Click **Save Reminders**.

Reminders are off for a plan type until you turn them on.

:::tip
Volunteers who have not yet confirmed get **Accept** and **Decline** buttons right inside the reminder email, so they can respond without signing in.
:::

### Text Reminders

The **Text** option only appears when your church has a texting provider connected. Texts go out through your church's texting provider, and each text may cost your church. A volunteer only receives a text reminder if they have turned on **Text messages** in their [Notification Preferences](../../b1-church/getting-started/notification-preferences.md) and have a mobile number on their profile. Staff with permission to send texts can turn **Text reminders** on for a volunteer from the volunteer's [record](../people/adding-people.md#text-reminders). Each text starts with your church's name, is kept to a single text message, and ends with "Reply STOP to opt out." Anyone who replies STOP stops receiving texts from your church. For STOP replies to reach B1, paste the **Inbound (STOP) webhook URL** from your [texting settings](../settings/church-settings.md#texting) into your provider's inbound message webhook.

To text everyone scheduled over a range of dates right away, use **Text Volunteers** on the [Plans Overview](./plans-overview.md#texting-everyone-scheduled).

:::info
Each reminder is sent once. Text reminders are sent in addition to push and email, not instead of them.
:::

### Leader Gap Alerts {#leader-gap-alerts}

The same **Reminders** section can also warn your ministry leaders when a plan isn't fully staffed yet.

1. Open the plan type's **Reminders** section as above.
2. Turn on **Alert ministry leaders about scheduling gaps**.
3. Enter how many days before the service the alert should go out (0 to 14; it starts at 3).
4. Click **Save Reminders**.

The leaders of the plan's ministry (the members marked as leaders of the ministry) each get one push notification and email listing the unfilled positions and the people who haven't confirmed, with a link to the plan. Nothing is sent when the plan is fully scheduled, and each plan only gets the alert once. The alert goes out at the **Time of Day** set for reminders (9:00 AM unless you change it), and it is saved separately from the volunteer reminders, so you can use either one without the other.

## Associating Groups with a Plan Type

Below the plan list on the plan type page, the **Associated Groups** section lets you decide which groups can see the plans for this plan type from their member portal. This is a quick way to surface upcoming services to the right teams without giving them admin access.

1. On the plan type page, click **Associated Groups** at the top of the page (or scroll down to that section).
2. Click **Add Group** and pick a group from the dropdown.
3. In the **Shows** column, choose whether members of that group should see **Past plans only**, **Upcoming plans only**, or **Past and upcoming plans** for this plan type.
4. Repeat to associate additional groups, or click the trash icon to remove a group.

:::info
Only groups tagged as **Standard** appear in the picker. Members of an associated group automatically see this plan type's plans on the group's page in the B1 member portal — limited to the window you selected.
:::

If the plans are Lessons.church lessons, members of the associated group also see a **This week's lesson** card on the group page (bottom line, verse, and a question for parents). Associate a parent group here and set the filter to **Past plans only** so today's lesson is included. Volunteer teams typically use **Upcoming plans only** or **Past and upcoming plans**.

## Printing Plans

You can print a plan for distribution to your team. Open the plan and click **Print** at the top of the page to generate a printable version that includes assignments and the service order. The top of the printout shows your church logo (the **Light Background Logo** from [Website > Appearance](../website/appearance.md), if you've uploaded one) with your church's name beneath it, and the plan's name, so loose pages are easy to identify. This is useful for handing out at rehearsals or posting in a common area.

When the plan has more than one service time, the printout has a time column for each service, headed with its start time. An item left out of a service (see [Including Items in Specific Service Times](./service-order.md#including-items-in-specific-service-times)) shows a dash in that service's column.

To give your musicians their charts in the same printout, check **Include chord charts** at the top of the print page. Each song in the order of service is added on its own page after the plan, with its title, artist, key, and sequence, and its lyrics and chords transposed into the key picked for the song on the plan. Only songs whose arrangement has lyrics in B1 get a chart. The checkbox only appears when the plan has songs, and B1 Admin remembers your choice on that browser.

The printout leaves off anything that would be empty. If no volunteers are assigned, there's no team box and the service order uses the full page width. If no items have a length, the **Length** column is left off, and if the plan has no service times and no lengths, so is the **Time** column. To drop the black **Service Order** heading bar with the service date, uncheck **Show Service Order heading** at the top of the print page; B1 Admin remembers your choice on that browser.

The print page opens in a new browser tab with **Print** and **Close** buttons at the top. **Print** opens your browser's print dialog; when you finish printing (or cancel), the tab returns to the plan.

### Printing a Lesson Plan

When the plan is linked to a lesson from a content provider (see [Scheduling Lessons](./scheduling-lessons.md)), **Print** opens a full-screen **Print Preview** instead, because a lesson prints best as its script rather than as a run sheet. Use the **Format:** tabs at the top to pick a layout:

- **Lessons.church** -- one card per lesson section, headed with the section's name and its **Materials:** list, followed by each line and its media.
- **Color Coded** -- a compact leader guide. The lesson's name, venue, and picture head the page, and inside each section consecutive lines of the same kind are grouped under a bold label such as **SAY**, **DO**, or **PLAY**, so a teacher can find the next spoken part at a glance.
- **Script** -- the same header followed by every line of every section in order, styled by its kind, for reading straight through.
- **Service Order** -- the regular run sheet described above, with the team box, times, and the **Show Service Order heading** and **Include chord charts** options.

The lesson formats only include the sections and lines you kept in the plan: anything you took out while [editing a lesson section](./service-order.md#editing-a-lesson-section) is left off the printout too. Click **Print** in the preview's toolbar to send the chosen format to your printer, or **Close** to return to the plan.

:::info
Plans are organized by ministry. Make sure you are on the correct ministry tab before creating or viewing plans.
:::

## Next Steps

- Add ministries, serving teams, and plan types in [Ministries, Teams, and Plan Types](./ministries-and-teams.md)
- Use the [Plans Overview](./plans-overview.md) to see all upcoming assignments across multiple weeks in one grid and spot unfilled positions — and assign volunteers directly from the grid
- Save a plan's structure as a [Plan Template](./plan-templates.md) so you can stamp it onto future plans in one click
- Build out your [Service Order](./service-order.md) with songs, readings, and other elements
- Add [songs](./songs.md) from your library directly into the service order
- Use [Tasks](./tasks.md) to assign follow-up action items to team members
- Display current lesson content on a lobby TV with [Digital Signage](./digital-signage.md)
