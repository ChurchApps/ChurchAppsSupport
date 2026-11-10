---
title: "Guide: Set Up Event Registration"
description: "Set up an event registration form in B1 Admin to collect attendee details and optional payments, embed it on your church website, and track signups."
---

# Set Up Event Registration

<div class="article-intro">

Create an event registration form, collect attendee information and optional payments, embed it on your church website, and manage submissions as they come in. By the end, you'll have a shareable registration page for any church event.

</div>

:::info
**Two ways to handle event registration:** This guide covers **forms-based registration** -- a Stand Alone form with its own public link, custom questions, and an optional payment field. For an event on your calendar, you can instead use **event registration** built into the calendar -- see [Creating Calendars](../calendars/creating-calendars.md#enabling-event-registration). It lets members sign up directly from [B1.church or the B1 App](../../b1-church/events/registering.md) with capacity, open and close dates, a waitlist, optional registration questions from a form, and priced attendee types (see [Paid Registrations](../calendars/paid-registrations.md)).
:::

<div class="prereqs">
<h4>Before You Begin</h4>

- B1 Admin account with admin access
- For collecting payments: [Stripe must be configured](../donations/online-giving-setup.md) first

</div>

## Step 1: Create a Stand Alone Form

Stand Alone forms have their own public URL that anyone can access — perfect for event registration.

Follow the [Creating Forms](../forms/creating-forms.md) guide to:

1. In the [Jump menu](../introduction.md#getting-around-with-the-jump-menu), choose **People > Forms** and click **Add Form**
2. Name it after the event (e.g., "Men's Retreat Registration", "VBS Sign-Up")
3. In **Associate With**, choose **Stand Alone** — this gives your form its own public URL
4. Click **Save**

## Step 2: Add Questions

Build out the fields you need to collect from registrants.

Follow the [Creating Forms](../forms/creating-forms.md#adding-questions) guide to add your questions:

1. Open the form, go to the **Questions** tab, and click **Add Question** for each piece of information you need: name, email, phone, dietary restrictions, T-shirt size, emergency contact, etc.
2. Use **Multiple Choice** for options like meal preferences or session selections
3. To collect a fee, add a **Payment** question and choose its **Fund** and **Amount**

:::warning
The Payment field type requires Stripe to be configured. If you haven't set up online giving yet, see [Online Giving Setup](../donations/online-giving-setup.md) before adding payment fields.
:::

## Step 3: Configure Form Settings

Control when and how your registration form is available. Follow the [Configuring Form Properties](../forms/creating-forms.md#configuring-form-properties) section to:

1. Click **Edit Form** and, if registration should only be open for a limited time, set **Set Form Availability Timeframe** to **Yes** and pick the start and end dates
2. Copy the **public URL** shown on the left side of the form page — you can share this directly. Click **QR Code** next to the form on the Forms list to download a QR code for flyers and slides
3. On the **Form Members** tab, add people as **Admin** or **View Only** to help manage submissions, and turn on **Email Notification** for anyone who should be emailed about each new registration

## Step 4: Embed on Your Website

Make the registration form easy to find by adding it to your church website.

Follow the [Page Editor](../website/page-editor.md) guide to:

1. Open a page in your B1 website editor and click **Add Content**
2. Drag the **Form** element into a section and choose your registration form

:::tip
Share the standalone URL via email, social media, and church bulletins too — the more places it's visible, the more signups you'll get.
:::

## Step 5: Manage Submissions

Track registrations as they come in and export data when you need it.

Follow the [Managing Submissions](../forms/managing-submissions.md) guide to:

1. Review responses as they come in on the **Form Submissions** tab
2. Click **Export** to download a CSV for spreadsheets, headcount tracking, or sharing with event coordinators

## You're Done!

Your event registration is live. Share the link, embed it on your website, and track signups from B1 Admin. When the event is over, export the final list for your records.

## Related Articles

- [Creating Forms](../forms/creating-forms.md) — build forms with different field types
- [Managing Submissions](../forms/managing-submissions.md) — review and export form responses
- [Page Editor](../website/page-editor.md) — embed forms on your website
- [Online Giving Setup](../donations/online-giving-setup.md) — required for payment fields
