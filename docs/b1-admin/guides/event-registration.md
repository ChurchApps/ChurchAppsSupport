---
title: "Guide: Set Up Event Registration"
---

# Set Up Event Registration

<div class="article-intro">

Create an event registration form, collect attendee information and optional payments, embed it on your church website, and manage submissions as they come in. By the end, you'll have a shareable registration page for any church event.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- B1 Admin account with admin access
- For collecting payments: [Stripe must be configured](../donations/online-giving-setup.md) first

</div>

## Step 1: Create a Stand Alone Form

Stand Alone forms have their own public URL that anyone can access — perfect for event registration.

Follow the [Creating Forms](../forms/creating-forms.md) guide to:

1. Navigate to Forms and click Add Form
2. Choose "Stand Alone" type — this gives your form its own public URL
3. Name it after the event (e.g., "Men's Retreat Registration", "VBS Sign-Up")

## Step 2: Add Questions

Build out the fields you need to collect from registrants.

Follow the [Creating Forms](../forms/creating-forms.md#adding-questions) guide to add your questions:

1. Go to the Questions tab and add fields for the information you need: name, email, phone, dietary restrictions, T-shirt size, emergency contact, etc.
2. Use Multiple Choice for options like meal preferences or session selections

:::warning
The Payment field type requires Stripe to be configured. If you haven't set up online giving yet, see [Online Giving Setup](../donations/online-giving-setup.md) before adding payment fields.
:::

## Step 3: Configure Form Settings

Control when and how your registration form is available.

1. Set availability dates if the registration should only be open for a limited time
2. Copy the public URL — you can share this directly
3. Add form members with Admin or View Only roles to help manage submissions

## Step 4: Embed on Your Website

Make the registration form easy to find by adding it to your church website.

Follow the [Managing Pages](../website/managing-pages.md) guide to:

1. In your B1 website editor, add a new section to a page and select the Form element
2. Choose your registration form from the list

:::tip
Share the standalone URL via email, social media, and church bulletins too — the more places it's visible, the more signups you'll get.
:::

## Step 5: Manage Submissions

Track registrations as they come in and export data when you need it.

Follow the [Managing Submissions](../forms/managing-submissions.md) guide to:

1. Review responses as they come in on the Submissions tab
2. Export to CSV for spreadsheets, headcount tracking, or sharing with event coordinators

## You're Done!

Your event registration is live. Share the link, embed it on your website, and track signups from B1 Admin. When the event is over, export the final list for your records.

## Related Articles

- [Creating Forms](../forms/creating-forms.md) — build forms with different field types
- [Managing Submissions](../forms/managing-submissions.md) — review and export form responses
- [Managing Pages](../website/managing-pages.md) — embed forms on your website
- [Online Giving Setup](../donations/online-giving-setup.md) — required for payment fields
