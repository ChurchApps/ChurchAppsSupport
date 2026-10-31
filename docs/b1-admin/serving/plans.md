---
title: "Service Plans"
---

# Service Plans

<div class="article-intro">

Service plans organize who is serving and when. Each plan is tied to a specific date and ministry, making it easy to coordinate your volunteer teams week by week and ensure every service is fully staffed.

</div>

## Training Video

<YouTube id="47DstBXKl74" title="Creating Plans and Scheduling Volunteers in B1" next="Building the Service Order and Song Library in B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up your ministries and teams in the Serving area
- Make sure volunteers have been added to your [people directory](../people/adding-people.md) and assigned to teams

</div>

## Accessing Plans

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Serving**, and click **Plans**.
2. Select a **ministry tab** at the top of the page.
3. Click on a **plan type** to see the list of plans for that type. Use **Upcoming** and **Past** above the list to switch between future and earlier plans. **Upcoming** lists plans from today on, soonest first, with undated plans at the end. **Past** lists only earlier plans, newest first.
4. Click on a specific plan to open it.

Each plan page shows links back to its plan type and to **Plans**, so you can move back up without the browser's back button.

:::info
Full admin access is not required to manage plans. Anyone who is a member of a ministry can navigate to Serving and create, edit, and schedule plans for their own ministry without needing the Plans Edit permission. Editors with the Plans Edit role can manage plans across every ministry.
:::

## Creating a Plan

1. From the plan type page, click **New Plan** at the top of the page.
2. Give the plan a name or use the date as the name. Select the **date** for the service.
3. If your ministry has [templates](./plan-templates.md), you can pick one under **Start from template** to fill in the order of service, positions, and notes in one step.
4. Otherwise, if you would like to copy from a previous plan, use **Copy from Previous Plan** to choose **Positions Only** or **Positions and Assignments**. If you do not want to copy, choose **Nothing**. You can also check **Copy Order of Service**. When you copy from a previous plan, the new plan also keeps that plan's **Notes**, **Signup Deadline**, **Show volunteer names on signup page**, and automatic-replacement setting, so you don't have to re-enter them each week. You can change any of them in the new plan's settings.
5. To set up several weeks at once while copying, enter a number in **Repeat weekly for this many weeks** (up to 12). B1 creates one plan per week, each copied from the one before it. If the plan is named after its date, each new plan is named after its own date.
6. Optionally set the **Signup Deadline (hours before service)**. A new plan starts with the previous plan's deadline, and you can change it here. Leave it blank for no deadline. See [Plan Settings](#plan-settings) for how the deadline is counted.
7. Save the plan. You can now begin assigning team members and building out the [service order](./service-order.md).

:::tip
**Repeat weekly for this many weeks** is only available while you are copying something from the previous plan (positions, assignments, or the order of service).
:::

## The Plan Detail Page

When you open a plan, the plan's name, ministry, plan type, and service date appear at the top, with **Edit** and **Print** buttons. Below that, everything is on one page:

- **[Order of Service](./service-order.md)** -- Build the order of service with elements like worship songs, prayers, announcements, and the sermon.
- **Serving Team Assignments** -- Manage which team members are assigned to this plan. You can add people from your existing teams and see who has confirmed or is still pending. Links above the positions let you open the plan's **Notes** and **Times**.

## Assigning Team Members

1. Open a plan and scroll to **Serving Team Assignments**.
2. Click **Add Position**. Fill out the information in the add a position form. For category name add whatever category you like. To let anyone in your church fill the position (not just members of one team), leave **Volunteer Group** set to **None**.
3. Click on **People Needed** and choose volunteers to fill that position. If the position has a **Volunteer Group**, you choose from that group's members. If its Volunteer Group is set to **None**, you can search for anyone in your church instead.
4. Add members from your team roster by clicking **Add**.
5. Assigned members will appear under their team with their assignment status.
6. Click notify volunteers to notify them within the B1 app or via email. If the plan uses a [confirmation workflow](#plan-settings), notifying also starts a workflow card that follows up on each request until the volunteer responds.

Each position shows a count chip (for example, "2/3") so you can see how many spots are filled at a glance. Under the **Serving Team Assignments** heading, a summary ("X of Y positions filled") shows your overall staffing for the plan, along with how many are still needed, switching to **Fully staffed** once every position is covered.

:::tip
Set up your teams in the ministry settings before creating plans. This way, you will have a ready pool of volunteers to assign from.
:::

### Copying Positions into an Empty Plan

If a plan has no positions yet and there is an earlier plan of the same type, a **Copy from Previous Plan** link appears in **Serving Team Assignments**. Choose **Positions Only** or **Positions and Assignments** to fill the plan you have open with the previous plan's positions (and volunteers). The copy goes into the current plan; it does not create a second plan for the same date.

## Plan Settings

Each plan has additional settings you can configure by clicking **Edit** next to the plan in the plan type's list, or the **Edit** button at the top of the plan page. Click **Done** (or the plan's name) to return to the plan. These include:

- **Signup Deadline (hours before service)** — the number of hours before the service when volunteer signups close. The hours are counted back from the plan's first **Service** time (rehearsals and other times are skipped unless the plan has nothing else), so a 2-hour deadline on a 10:00 AM service closes signups at 8:00 AM that morning. If the plan has no times, the deadline is counted from 9:00 AM on the service date in your church's time zone. Once it passes, volunteers can neither sign up nor remove themselves. Enter a negative number to keep signups open past the service start time. Leave it blank, or clear it, for no deadline.
- **Confirmation workflow** — choose a [Serving Assignment Confirmation workflow](./workflows.md#serving-assignment-confirmations) to follow up on this plan's serving requests by email and text until each volunteer accepts or declines. When you **Notify** volunteers on the published plan, each new request gets its own card on that workflow's board, and a note above the notify link says *"New requests use the confirmation workflow."* Leave it on **Use existing assignment notifications** to keep the usual notifications. Only active confirmation workflows appear in the list; create one under **Serving > Workflows** first.
- **Show volunteer names on signup page** — when checked, signed-in volunteers can see who else is already signed up for each position on the B1.church signup page. Names are never shown to visitors who aren't signed in.
- **Penciled in** — hides assignments from volunteers until you are ready to publish the schedule.
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
4. Under **When should reminders go out?**, pick up to three timings: **7 days before**, **3 days before**, **2 days before**, **1 day before**, or **Day of**.
5. Set the **Time of Day** the reminders go out.
6. Optionally add a **Message**. Leave it blank to use the default reminder wording.
7. Under **Send By**, choose **Push**, **Email**, and, if your church has a [texting provider](../settings/church-settings.md#texting) connected, **Text**.
8. Click **Save Reminders**.

Reminders are off for a plan type until you turn them on.

:::tip
Volunteers who have not yet confirmed get **Accept** and **Decline** buttons right inside the reminder email, so they can respond without signing in.
:::

### Text Reminders

The **Text** option only appears when your church has a texting provider connected. Texts go out through your church's texting provider, and each text may cost your church. A volunteer only receives a text reminder if they have turned on **Text messages** in their [Notification Preferences](../../b1-church/getting-started/notification-preferences.md) and have a mobile number on their profile. Each text starts with your church's name, is kept to a single text message, and ends with "Reply STOP to opt out." Anyone who replies STOP stops receiving texts from your church. For STOP replies to reach B1, paste the **Inbound (STOP) webhook URL** from your [texting settings](../settings/church-settings.md#texting) into your provider's inbound message webhook.

To text everyone scheduled over a range of dates right away, use **Text Volunteers** on the [Plans Overview](./plans-overview.md#texting-everyone-scheduled).

:::info
Each reminder is sent once. Text reminders are sent in addition to push and email, not instead of them.
:::

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

The printout leaves off anything that would be empty. If no volunteers are assigned, there's no team box and the service order uses the full page width. If no items have a length, the **Length** column is left off, and if the plan has no service times and no lengths, so is the **Time** column. To drop the black **Service Order** heading bar with the service date, uncheck **Show Service Order heading** at the top of the print page; B1 Admin remembers your choice on that browser.

:::info
Plans are organized by ministry. Make sure you are on the correct ministry tab before creating or viewing plans.
:::

## Next Steps

- Use the [Plans Overview](./plans-overview.md) to see all upcoming assignments across multiple weeks in one grid and spot unfilled positions — and assign volunteers directly from the grid
- Save a plan's structure as a [Plan Template](./plan-templates.md) so you can stamp it onto future plans in one click
- Build out your [Service Order](./service-order.md) with songs, readings, and other elements
- Add [songs](./songs.md) from your library directly into the service order
- Use [Tasks](./tasks.md) to assign follow-up action items to team members
- Display current lesson content on a lobby TV with [Digital Signage](./digital-signage.md)
