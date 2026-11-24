---
title: "Paid Registrations"
description: "Set up paid event registrations in B1 Admin: priced attendee types, deposits, add-ons, discount codes, pay later, waitlists, and recording payments and refunds."
---

# Paid Registrations

<div class="article-intro">

Event registration can go beyond a simple head count. You can define priced attendee types (like Adult and Child) with optional deposits and age ranges, offer optional add-ons with their own prices and quantities, create discount codes, and collect payment at registration through your church's existing giving provider. Members can pay later by cash or check when you allow it, and staff can record those payments and issue refunds from the roster. When an event fills up, an optional waitlist keeps interested members in line and promotes them automatically as spots open.

</div>

## Training Video

<YouTube id="eGSZv24Dlzk" title="Event Registration and Paid Events in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Before You Begin</h4>

- Enable registration on the event first — see [Creating Calendars](./creating-calendars.md#enabling-event-registration)
- You need the **Edit Content** permission to open the Registrations pages, **View Registrations** to see the roster, and **Edit Registrations** to save attendee types, selections, and discount codes, add attendees, record payments and refunds, send balance reminders, and promote, cancel, restore, or delete registrations. All three are in the **Content** section of [Roles & Permissions](../settings/roles-permissions.md).
- To collect payments online, your church needs [online giving configured](../donations/online-giving-setup.md) (Stripe, PayPal, or Kingdom Funding). Free events need no giving setup. Without online giving, paid registrations still work, but people pay the church directly — see [Churches Without Online Giving](#churches-without-online-giving).

</div>

## Opening Registration Settings

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), choose **Calendars > Registrations**, and click your event (or click the event on its calendar and choose **Manage Registrations**).
2. Click **Edit settings**. The **Registration Settings** card shows the basics — **Enable Registration**, **Capacity**, **Enable Waitlist**, **Members can cancel their own registration**, **Allow pay later (cash or check)**, **Registration Opens/Closes**, **Tags**, **Registration Questions**, and **Confirmation Message** — with a **Save Settings** button.
3. Below the basics are three accordions: **Attendee Types**, **Selections**, and **Discount Codes**. Each has its own **Save** button, separate from **Save Settings**; B1 warns you if you try to leave with unsaved changes in them. Click **Back to Registrations** to return to the roster.

## Copying Setup from Another Event {#copying-setup-from-another-event}

If you run the same kind of event again (a yearly retreat, or VBS every summer), copy its setup instead of re-entering every price.

1. Open the new event's registration page and click **Edit settings**.
2. Click **Copy setup from another event** at the top of the **Registration Settings** card. The button is grayed out while you have unsaved changes; save or discard them first.
3. Choose the event in **Copy from**. The list shows every other event with registration turned on, newest first, each with its date. If there is none, the dialog says "No other events have registration turned on."
4. Click **Copy Setup**. A message confirms "Setup copied from" the event you picked, and the three accordions reload with the copied rows.

The copy brings over the **Capacity**, **Enable Waitlist**, **Tags**, and **Registration Questions** settings, plus every attendee type (with its price, deposit, capacity, and age range), selection, and discount code. Registrations are never copied. If this event already has an attendee type or selection with the same name, or a discount code with the same code, the existing one is kept as it is. The registration open and close dates, the pay later and self-cancel switches, and the confirmation message are not copied, so check them before you open registration.

## Payment and Cancellation Options {#payment-and-cancellation-options}

These settings in the **Registration Settings** card control how members pay, whether they can cancel online, and what their confirmation email says. Click **Save Settings** after changing them.

- **Members can cancel their own registration** -- On by default. Turn it off and the **Cancel Registration** link no longer appears on the member's [My Registrations](../../b1-church/events/my-registrations.md) page, so they have to contact the church. Staff can still cancel any registration from the roster.
- **Allow pay later (cash or check)** -- Off by default. When it is on, the payment step on a paid event offers a **Register and Pay Later** button below the card form, with the note "Or register now and pay by cash or check at the event." The registration is saved as **pending** with the full amount as a balance due. Churches without online giving always allow paying later (see [Churches Without Online Giving](#churches-without-online-giving)).
- **Confirmation Message** -- Optional plain text (up to 2,000 characters) added to the registration confirmation email, such as directions, what to bring, or a meeting link. Line breaks are kept. People who join the waitlist don't get the message, because they don't have a spot yet. Clear the box to stop sending it.

## Attendee Types

Attendee types let you charge different prices for different kinds of attendees — and cap each one separately.

1. Expand the **Attendee Types** accordion and click **Add Type**.
2. Enter a **Name** (e.g. "Adult", "Child", "Student").
3. Set a **Price**. Use 0 for a free type.
4. Optionally set a **Deposit** to charge less than the full price at signup (see [Deposits](#deposits)).
5. Optionally set a **Capacity** for just this type (e.g. only 20 Child spots). Leave blank for no per-type limit.
6. Optionally set a **Min age** and **Max age**. Ages are in years and inclusive, so a Child type of 0 to 12 includes 12-year-olds. When a member checks a household member whose birthdate fits a type's age range, the signup page picks that type for them. They can still choose a different type.
7. Optionally set **Sort** to control the order types are listed in.
8. Click **Save**.

To remove a saved type, click its delete icon and confirm "Remove this item? This cannot be undone."; it's removed right away. Selections and discount codes are removed the same way. Saving attendee types, selections, and discount codes needs the **Edit Registrations** permission.

During registration, each attendee picks a type; sold-out types are shown as **Sold out** and cannot be selected. The roster shows each attendee's type and running per-type counts.

### Deposits {#deposits}

A deposit lets people hold a spot for part of the price and pay the rest later. Enter it in the type's **Deposit** box. It must be more than 0 and no more than the price; B1 shows "More than 0, up to the price" and won't save a type with an invalid deposit.

When someone pays online at signup, each attendee of that type is charged the deposit instead of the full price. Selections are still charged in full, and the amount charged is never more than the total after any discount code. The payment step shows **Due today** and **Balance due later** under the order total so the registrant knows what they owe. The rest stays on the registration as a balance due, which the member can pay from [My Registrations](../../b1-church/events/my-registrations.md) with **Complete payment**, or which you can record when they pay in person (see [Recording Payments and Refunds](#recording-payments-and-refunds)).

A deposit equal to the price charges the full price. If the registrant chooses **Register and Pay Later**, nothing is charged at signup and the full amount is due.

## Selections

Selections are optional priced add-ons — T-shirts, meal plans, activity upgrades.

1. Expand the **Selections** accordion and click **Add Selection**.
2. Enter a **Name**, optional **Description**, and a **Price** (0 shows as "Free").
3. Optionally set a **Capacity** (total available across all registrations) and a **Max Qty** (the most one registration can order).
4. Click **Save**.

Registrants choose quantities during signup, and the totals count against capacity so you never oversell.

## Discount Codes

1. Expand the **Discount Codes** accordion and click **Add Discount Code**.
2. Enter the **Code** registrants will type.
3. Choose the **Type** — **Percent** or **Amount** — and its **Value**.
4. Optionally limit the code with a **Start Date** / **End Date**, a **Min Members** (minimum number of attendees on the registration), and **Max Uses**.
5. Click **Save**.

Each code shows a **Uses** count so you can see how often it has been redeemed. Registrants get instant feedback when they apply a code — including clear messages when a code has expired, hasn't started, or needs more attendees.

## Waitlist

Turn on **Enable Waitlist** in the Registration Settings card. When the event reaches capacity:

- New registrants are offered a waitlist spot instead of being turned away. They complete the same signup (payment is skipped while waitlisted).
- When someone cancels, the oldest waitlisted registration is **promoted automatically** and receives an email that a spot opened. If they owe a balance, the email links them to [My Registrations](../../b1-church/events/my-registrations.md) on your church's B1 site, where they can complete payment.
- You can promote someone manually at any time with the **Promote** action on a waitlisted row — useful after raising the event capacity.

:::info
Promoted registrations stay *pending* until any balance is paid; paying (or having nothing to pay) confirms them.
:::

## The Registration Roster

This section covers the money side of the roster. For the list page, the roster columns, filters, **Add Attendee**, **Export CSV**, and the cancel, restore, promote, and delete actions in full, see [Managing Registrations](./managing-registrations.md).

Open an event from the Registrations page to see every registration. The card title shows how many registrations hold a spot against the capacity (for example, *Registrations (18 / 20)*). Only pending and confirmed registrations count; when people are waitlisted, the title adds the count (for example, *· 3 waitlisted*), and the same count appears under the capacity bar. The larger number above the capacity bar counts **people** instead of registrations -- everyone on each pending or confirmed registration -- so a family of four counts as four. The capacity limit itself still counts registrations. The table shows **Name**, **Members**, **Type** (each attendee's type), **Paid / Total** (with a balance warning when money is still owed), **Status**, and **Date**, plus per-type count chips above the table.

- Click a row's details icon to open the **Registration Details** dialog — members with their types, selections with quantities and prices, paid/balance, a **Payments** table listing every payment and refund (**Amount**, **Method**, **Kind**, **Date**), and the registrant's answers when the event has questions. Refunds show as negative amounts, and "No payments recorded." appears until there is one.
- **Export CSV** downloads the roster with columns for members, attendee types, selections, paid/total/balance, status, and one column per registration question. If you have filters turned on, only the registrations you can see are exported.
- **Add Attendee** records an offline or phone signup for any person in your church. Pick the person and, on a paid event, their attendee type. Their card is not charged: a paid registration is saved as **pending** with the full amount as a balance due. If your church has online giving, the person can pay it from [My Registrations](../../b1-church/events/my-registrations.md); otherwise collect it in person and [record the payment](#recording-payments-and-refunds). You need the **Edit Registrations** permission to add attendees. A person who is already on another active registration for the event can't be added again.
- **Send Balance Reminder** appears when anyone owes money (see [Sending Balance Reminders](#sending-balance-reminders)).

### Filtering the Roster

Filter chips above the table narrow the list. Click a chip to turn it on and click it again to turn it off; you can combine them.

- **Confirmed**, **Pending**, **Waitlisted**, and **Cancelled** -- Show one status. A chip only appears when at least one registration has that status.
- One chip per attendee type -- Shown when the event has more than one type. Shows registrations with at least one attendee of that type.
- **Balance due** -- Shows registrations that still owe money.
- **Unanswered questions only** -- Shown when the event has Registration Questions. Shows registrations with no answers yet.

If nothing matches, the roster says "No registrations match these filters."

### Editing a Registration

1. Click the row's details icon to open **Registration Details**, then click **Edit**. (Cancelled registrations can't be edited.)
2. Change each person's first name, last name, or **Type** (each type shows its price; **No type** is also offered). Click the remove icon to take someone off, or click **Add Person** and search for someone in your church to add them -- people already on the registration are left out of the search. Every person needs a first and last name.
3. If the event has selections, change the **Qty** of each one, up to the selection's **Max Qty**.
4. Click **Save**.

The total is recalculated when you save, but nothing is charged or refunded. If the new total leaves a balance, the member can pay it from My Registrations or you can record a payment. If it drops below what they already paid, record a refund for the difference. Type and selection capacity still apply, so B1 tells you if a type or selection you picked is full.

### Cancelling, Restoring, and Deleting

The icons at the end of each row (hover to see their names) include:

- **Cancel Registration** -- Marks the registration cancelled after you confirm. The registrant is emailed that it was cancelled, its spot is released and, if the event has a waitlist, the next person is promoted automatically. Payments stay on record.
- **Restore** -- Shown instead of Cancel on a cancelled registration. It becomes **Pending** again if it still owes money, or **Confirmed** if it doesn't. Restore is refused, with a message, if the event is now full, one of its attendee types is full, its discount code has no uses left, or the person has since registered again on another registration.
- **Delete** -- Permanently removes the registration after you confirm. A registration with any payments can't be deleted: B1 shows "This registration has payments, so it can't be deleted. Cancel it instead to keep the payment records."

## Recording Payments and Refunds {#recording-payments-and-refunds}

When someone pays by cash or check, or you need to give money back, record it in the **Registration Details** dialog so the roster and the member's balance stay correct. You need the **Edit Registrations** permission to see these buttons.

### Recording a Cash or Check Payment

1. On the roster, click the row's details icon to open **Registration Details**.
2. Click **Record Payment**. The button only appears when the registration has a balance due and isn't cancelled or waitlisted.
3. Enter the **Amount**. It starts at the full balance and can't be more than the balance due.
4. Choose the **Method**: **Cash**, **Check**, or **Other**. For a check, you can enter the **Check Number**.
5. Click **Record Payment**.

The payment appears in the **Payments** table and the balance goes down. A **pending** registration becomes **confirmed** once it is paid in full.

### Refunding an Online Payment

Each online card payment in the **Payments** table has a **Refund** button.

1. Click **Refund** on the payment.
2. In the **Refund Payment** dialog, enter the **Amount**. You can refund all or part of the payment, up to what hasn't already been refunded.
3. Click **Refund**.

The refund goes back to the original card or bank account through your payment gateway and cannot be undone. If the gateway refuses it, nothing is recorded and B1 shows the error.

### Recording a Cash or Check Refund

Use **Record Refund** when you give money back outside your payment gateway (for example, cash at the door or a check from the church).

1. In **Registration Details**, click **Record Refund**. It appears once the registration has any amount paid.
2. Enter the **Amount** (it starts blank; the dialog shows **Up to** the amount paid), choose the **Method**, and add a **Check Number** for a check.
3. Click **Record Refund**.

:::info
A refund lowers the amount paid, so unless you also lower the registration's total, the balance due goes back up by the refunded amount. Refunds never change a registration's status: cancel the registration separately if the person isn't coming.
:::

## Sending Balance Reminders {#sending-balance-reminders}

When registrants still owe money, a **Send Balance Reminder** button appears above the roster.

1. Click **Send Balance Reminder**.
2. Confirm the prompt, which says how many registrants will be emailed.

Each pending or confirmed registrant who owes money gets an email showing the event, their total, what they've paid, and the balance due, with a link to pay from [My Registrations](../../b1-church/events/my-registrations.md). Waitlisted and cancelled registrations are skipped, and people without an email address can't be reached. A message shows how many reminders were sent. B1 doesn't keep track of earlier reminders, so each click emails everyone who still owes.

## How Payment Works

Payments run through the same giving gateway your church already uses for donations — card details go straight to the provider and never touch B1's servers. Prices are always computed on the server from your configured types, selections, and discount codes, so a registrant can't tamper with the total. Logged-in members can pay with a saved card. Guests enter a card at checkout and must tick the **I'm not a robot** check before paying.

### Churches Without Online Giving

If your church has no giving provider set up, paid events can still take registrations. The payment step tells registrants that online payment is not available and that they can pay the church directly, and a **Register and Pay Later** button saves the registration. It is saved as **pending** with the full amount as a balance due, and it shows up on the roster with a balance warning. When they pay, use **Record Payment** in the Registration Details dialog (see [Recording Payments and Refunds](#recording-payments-and-refunds)); once the balance is paid in full, the registration is confirmed.

## Related Articles

- [Creating Calendars](./creating-calendars.md#enabling-event-registration) — enable registration and the basic settings
- [Managing Registrations](./managing-registrations.md) — the Registrations list, roster columns, filters, exports, and row actions
- [Online Giving Setup](../donations/online-giving-setup.md) — configure the payment gateway used at checkout
- [Registering for Events](../../b1-church/events/registering.md) — what members see when they sign up
- [My Registrations](../../b1-church/events/my-registrations.md) — how members pay balances, answer questions, and edit or cancel registrations
