---
title: "Failed Recurring Gifts"
description: "Find recurring gifts the payment gateway could not collect in B1 Admin, retry them, follow the reminder emails donors receive, and clear failed gateway events."
---

# Failed Recurring Gifts

<div class="article-intro">

When a donor's scheduled gift cannot be charged -- an expired card, a declined payment, an empty account -- B1 records it as a failed gift instead of quietly dropping it. The **Failed Gifts** page gathers these in one place so you can retry the charge or follow up with the donor, and B1 emails the donor on your behalf while the gift is unpaid.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **View Donations** permission to open **Failed Gifts**, and **Edit Donations** to use **Retry**
- Failed charges are reported by Stripe webhooks. If your church connected Stripe before this feature existed, open **Settings**, click edit on **Giving**, and click **Save** once to refresh the webhook (see [Online Giving Setup](online-giving-setup.md#failed-recurring-gifts))

</div>

## How a Gift Ends Up Here

Each time Stripe tries to collect a recurring gift and the payment fails, it tells B1, and B1 saves a donation with the status **Failed** for that attempt. Failed gifts are kept out of batch totals, the Summary dashboard, fund totals, campaign progress, and giving statements, so your reports only count money that arrived. Only Stripe reports failed recurring charges to B1; one-time gifts that are declined at checkout never become a record.

## The Failed Gifts Page

Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu), expand **Donations**, and click **Failed Gifts** (or go to **/donations/failed**). The page is titled **Failed Recurring Gifts** and its subtitle sums up the list: "3 failed · $275 at risk". The amount is converted to your church currency if the gifts were made in another one.

Each row shows:

- **Person** -- the donor, linked to their record if you can view people, or **Anonymous**
- **Amount** -- in the currency the gift was attempted in
- **Date** -- the date of the failed attempt
- **Gateway Message** -- the reason the gateway gave, such as the card issuer's decline message. Long messages are shortened; hover to read the whole text
- **Retry** -- a button for people with **Edit Donations**, shown when your gateway can retry (Stripe)

When nothing is outstanding the page says "No failed recurring gifts."

## Retrying a Charge

Once the donor has fixed the problem -- updated their card in B1.church, or you have added a new payment method for them (see [Managing a Donor's Payment Methods](person-giving.md#managing-a-donors-payment-methods)) -- click **Retry** on the row. B1 asks Stripe to collect the open invoice again.

- If the charge goes through, the gift's status changes to **Complete**, it leaves this list, and it counts in totals and statements like any other gift.
- If the charge is declined again, the row stays and a message appears at the top of the page: "The retry was declined.  Ask the donor to update their payment method." (or the gateway's own error).

Only gifts whose status is still **Failed** can be retried, and only through a gateway that supports it. You cannot change the amount or payment method from this page; the donor's recurring gift itself is edited from their person record under **Recurring**.

## What the Donor Receives

B1 emails the donor automatically, using the email address on their person record, so you usually do not need to chase the first failure yourself:

| When | Email |
|------|-------|
| The day the charge fails | "We couldn't process your recurring gift" |
| 3 days later, if still unpaid | "Your recurring gift still hasn't gone through" |
| 7 days later, if still unpaid | "Last reminder about your recurring gift" |

Each email has the subject "Your Recurring Donation Needs Attention", names the amount and the date of the attempt, says the bank or card issuer declined the payment, and has an **Update your payment method** link that opens the donor's **Giving** page on your B1.church site. Each reminder is sent only once per failed gift. Donors without an email address on file receive nothing, so check the **Gateway Message** and contact them another way.

If Stripe gives up after its own retries and cancels the recurring gift, the donor receives one more email, "Your Recurring Donation Was Canceled", explaining that no further charges will be made and inviting them to set the gift up again. A recurring gift you or the donor cancel on purpose sends no email.

:::tip
A **Recurring gift · Created** [workflow trigger](../serving/workflows.md#triggers) can add a donor to a follow-up board when they set up a new schedule, which is a good place to confirm that a gift cancelled after repeated failures has been replaced.
:::

## Failed Gateway Events on the Batches Page

Separately from failed gifts, B1 keeps a log of problem events reported by your payment gateway. When there are any, a **Failed events (2)** button appears at the top of **Donations > Batches**; the number counts the events not yet marked resolved. Click it to show or hide the **Failed Donations** panel under the batch list.

Each event shows the event type and date, the **Person** it concerns (linked when you can view people), the **Event** name (linked to the event in your gateway's dashboard when the provider supports it), and the **Message** from the gateway. Once you have dealt with an event, click **Mark as Resolved**; the entry turns from red to normal text and drops out of the count. Click **Mark as Unresolved** to reopen it. Saving this change needs **Edit Donations**.

## Pending Gifts

Bank (ACH) gifts take a few days to settle. While Stripe is waiting, the gift appears in its batch with a **Pending** badge and its amount in orange; it is already counted in the batch total. When the payment settles it becomes **Complete** without any action from you. If the bank rejects it, it becomes a failed gift and shows up on this page.

## Related Articles

- [Online Giving Setup](online-giving-setup.md) -- connecting Stripe and refreshing its webhook
- [Giving on a Person's Record](person-giving.md) -- change a donor's recurring gift or payment methods
- [Donation Batches](batches.md) -- where the **Failed events** panel lives
- [Recording Donations](recording-donations.md#gift-statuses) -- what **Pending**, **Refunded**, and **Failed** mean on a gift
