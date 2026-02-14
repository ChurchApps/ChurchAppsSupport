---
title: "Creating Forms"
---

# Creating Forms

<div class="article-intro">

Build custom forms to collect information from your congregation. You can create forms for event registrations, surveys, visitor cards, membership applications, and more. Forms can be linked to people in your database or used as standalone pages with their own public URL.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- For **People** forms (linked to person records), you need [people in your database](../people/adding-people.md) first.
- For forms that collect **payments**, you must have [Stripe configured for online giving](../donations/online-giving-setup.md).

</div>

## Creating a New Form

1. Navigate to **Forms** from the main menu.
2. Click **Add Form**.
3. Enter a **name** for your form.
4. Choose the form type from the dropdown:
   - **People** — Associates submissions with [people records](../people/adding-people.md) in your database.
   - **Stand Alone** — Creates an independent form with its own public URL, ideal for external registrations.
5. Click **Save** to create the form.

Your new form will appear in the list. Click on it to start adding questions.

## Adding Questions

1. Open your form and go to the **Questions** tab.
2. Click **Add Question**.
3. Select a **field type** from the Provider dropdown. Available types include:
   - **Textbox** — For short text answers
   - **Date** — For date selections
   - **Email** — For email addresses
   - **Phone Number** — For phone input
   - **Multiple Choice** — For selecting from predefined options
   - **Payment** — For collecting payments
4. Enter a **Title** and optional **Description** for the question.
5. Check **Require an answer** if the field is mandatory.
6. Click **Save**.
7. Repeat to add more questions.

:::warning
The **Payment** field type requires Stripe to be configured. If you haven't set up online giving yet, see [Online Giving Setup](../donations/online-giving-setup.md) before adding payment fields.
:::

## Managing Form Members

1. Open your form and go to the **Members** tab.
2. Search for a person and add them with a role:
   - **Admin** — Can edit the form and view all submissions.
   - **View Only** — Can view submissions but cannot edit the form.

## Configuring Form Properties

You can update your form's name and settings at any time. For Stand Alone forms, you will also see a unique **public URL** that you can share with anyone.

:::tip
Stand Alone forms are great for event registrations. Share the public URL via email, social media, or embed the form directly on your church website.
:::

:::info
To embed a form on your B1 website, go to your website editor, add a new section, and select the **Form** element. Then choose the form you want to display. See [Managing Pages](../website/managing-pages.md) for details on editing your website.
:::
