---
title: "Paid Registrations"
---

# Paid Registrations

<div class="article-intro">

Event registration can go beyond a simple head count. You can define priced attendee types (like Adult and Child), offer optional add-ons with their own prices and quantities, create discount codes, and collect payment at registration through your church's existing giving provider. When an event fills up, an optional waitlist keeps interested members in line and promotes them automatically as spots open.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Enable registration on the event first — see [Creating Calendars](creating-calendars#enabling-event-registration)
- To collect payments, your church needs [online giving configured](../donations/online-giving-setup.md) (Stripe, PayPal, or Kingdom Funding). Free events need no giving setup.

</div>

## Opening Registration Settings

1. In B1 Admin, go to the **Registrations** page and open your event (or open the event from its calendar).
2. The **Registration Settings** card shows the basics — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags**, and **Registration Questions**.
3. Below the basics are three accordions: **Attendee Types**, **Selections**, and **Discount Codes**.

## Attendee Types

Attendee types let you charge different prices for different kinds of attendees — and cap each one separately.

1. Expand the **Attendee Types** accordion and click **Add Type**.
2. Enter a **Name** (e.g. "Adult", "Child", "Student").
3. Set a **Price**. Use 0 for a free type.
4. Optionally set a **Capacity** for just this type (e.g. only 20 Child spots). Leave blank for no per-type limit.
5. Click **Save**.

During registration, each attendee picks a type; sold-out types are shown as **Sold out** and cannot be selected. The roster shows each attendee's type and running per-type counts.

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
- When someone cancels, the oldest waitlisted registration is **promoted automatically** and receives an email that a spot opened. If they owe a balance, the email links them to complete payment.
- You can promote someone manually at any time with the **Promote** action on a waitlisted row — useful after raising the event capacity.

:::info
Promoted registrations stay *pending* until any balance is paid; paying (or having nothing to pay) confirms them.
:::

## The Registration Roster

Open an event from the Registrations page to see every registration. The table shows **Name**, **Members**, **Type** (each attendee's type), **Paid / Total** (with a balance warning when money is still owed), **Status**, and **Date**, plus per-type count chips above the table.

- Click a row's details icon to open the **Registration Details** dialog — members, selections, paid/balance, and a **Payments** table listing every charge (amount, method, date).
- **Export CSV** downloads the full roster with columns for members, attendee types, selections, paid/total/balance, status, and one column per registration question.
- **Add Attendee** still lets you record offline signups manually.

:::info
Refunds are not processed inside B1. If you need to refund a cancelled paid registration, issue the refund from your giving provider's dashboard (e.g. Stripe).
:::

## How Payment Works

Payments run through the same giving gateway your church already uses for donations — card details go straight to the provider and never touch B1's servers. Prices are always computed on the server from your configured types, selections, and discount codes, so a registrant can't tamper with the total. Logged-in members can pay with a saved card; guests enter a card at checkout.

## Related Articles

- [Creating Calendars](creating-calendars#enabling-event-registration) — enable registration and the basic settings
- [Online Giving Setup](../donations/online-giving-setup.md) — configure the payment gateway used at checkout
- [Registering for Events](../../b1-church/events/registering) — what members see when they sign up
- [My Registrations](../../b1-church/events/my-registrations) — how members pay balances and edit registrations
