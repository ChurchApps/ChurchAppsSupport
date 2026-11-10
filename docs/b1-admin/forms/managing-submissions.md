---
title: "Managing Submissions"
description: "Review, print, and reassign form submissions in B1 Admin, moving responses to the right person and following up on visitor cards and prayer requests."
---

# Managing Submissions

<div class="article-intro">

Once your form is live, submissions will start coming in. The **Form Submissions** tab lets you review every response, track who has submitted, and use the data to follow up with your congregation in a timely manner.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Create a form](./creating-forms.md) with at least one question
- Share the form via its public URL or embed it on your [website](../website/managing-pages.md)

</div>

## Viewing Submissions

1. Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin), expand **People**, and click **Forms**.
2. Click on the form you want to review.
3. Go to the **Form Submissions** tab.

The tab has two cards:

- **Form Submission Summary** -- For each Multiple Choice, Checkbox, and Yes/No question, a tally of how many people picked each answer.
- **Form Submission Results** -- A table of every response, with a count of submissions. Each row shows who the submission is for (**Submitted For** on People forms, **Submitted By** on Stand Alone forms, or **Anonymous**) and the **Submission Date**, followed by one column for every question on the form, in the form's order. If your form has many questions, scroll the table sideways to see the rest of the columns. Click a person's name to open their record.

Click **Export** on either card to download the responses as a CSV file, one row per submission. Click the **Print** (printer) icon to print the summary and the results table, headed with your church's name.

## Reviewing Individual Submissions

To read or print one person's answers, open that person's record in [People](../people/adding-people.md#working-with-forms) and click the form in their **Forms** section. You will see all the answers they gave, one question per line.

Click the **print icon** next to the submission to print that person's filled-in answers -- useful for a paper file or a signed release you need to keep on hand. The printout shows your church logo (the **Light Background Logo** from [Website > Appearance](../website/appearance.md), if you've uploaded one) centered at the top with your church's name beneath it. Printouts always use dark text on a white page, even if you use B1 Admin in dark mode. This is separate from [printing a blank form](./creating-forms.md#printing-a-blank-form); it prints one person's already-submitted answers, not an empty copy.

## Changing the Person on a Submission

If a submission is linked to the wrong person — for example, two family members share an email address — you can move it to the right person or unlink it.

1. On the **Form Submissions** tab, click the **Change person** icon (two arrows) next to the person's name. The same icon appears next to a submission on a [person's profile](../people/adding-people.md#working-with-forms).
2. In the **Change person** dialog, search for the correct person and click **Move to this person**.
3. Or click **Unlink (Anonymous)** to detach the submission from any person. It then shows as **Anonymous**.

Only the link changes. The answers stay the same, and no follow-up emails are sent again.

:::info
On forms set to create a person record, when someone is signed in to your church's site while submitting, the submission is linked to their own record, even if another person in your database shares their email address. When you [merge two person records](../people/adding-people.md), the removed person's form submissions move to the person you keep.
:::

## How Submissions Are Collected

Submissions can come in through several channels:

- **Public URL** -- If your form has a public URL (Stand Alone forms), anyone with the link can submit a response. Share the URL via email, social media, or text messages.
- **Embedded on your website** -- Forms embedded on your B1 website collect submissions automatically when visitors fill them out.
- **Internal use** -- Staff can fill in People forms for someone from that person's record in B1 Admin. See [Working with Forms](../people/adding-people.md#working-with-forms).

:::tip
Check the **Form Submissions** tab regularly for forms like visitor cards or prayer requests, so you can follow up promptly.
:::

## Using Submission Data

The data collected through forms can help you:

- Track event registrations and plan accordingly
- Follow up with visitors or new members
- Collect survey feedback for ministry planning
- Process payments for events or programs

:::info
Form members with **Admin** or **View Only** roles can access the **Form Submissions** tab. Make sure the right people on your team have access to the forms they need by managing roles in the **Form Members** tab.
:::

:::info
If a Stand Alone form is [linked to a group](./creating-forms.md#linking-a-form-to-a-group), that group's leaders can read and print its submissions from the group's page on B1.church, without being form members. Leaders can also read the answers to registration questions for their group's events there. See [Group Details](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
If a **Stand Alone** form is set to create a person record, any submissions matched to an existing person also show up in the **Forms** section of that person's page in People — not just People-type forms.
:::

## Next Steps

- Learn how to build and customize forms in [Creating Forms](./creating-forms.md)
- Add people from form submissions to your [people directory](../people/adding-people.md) for ongoing follow-up
- [Link a form to a group](./creating-forms.md#linking-a-form-to-a-group) so its leaders can read the answers, or [automatically add submitters to the group](./creating-forms.md#automatically-adding-submitters-to-a-group) so a stand-alone sign-up form builds its own roster
