---
title: "Adding People"
---

# Adding People

<div class="article-intro">

The People section is the foundation of B1 Admin — it's your church's member database. Every other feature (groups, attendance, donations, forms) ties back to person records. This guide walks you through adding someone to your database, editing their details, and linking family members into households.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need an active B1 Admin account with permission to manage people. See [Roles & Permissions](roles-permissions.md) if you're unsure about your access level.
- If you're adding more than a handful of people, consider using the [CSV Import](importing-data.md) tool instead.

</div>

## Adding a Person

1. Navigate to the B1.church Admin dashboard.
2. Open the **section menu** in the top-left corner and choose **People**.
3. Click the **Add Person** button in the upper right corner.
4. Fill in the person's first name, last name, and email address, then click **Add**.

The person's profile page will open, ready for you to add more details.

:::tip
If you're migrating from another church management system, the [Import Data](importing-data.md) feature lets you bring in your entire directory from a CSV file — much faster than adding people one at a time.
:::

### Duplicate Warnings

If the email address (or, when creating a person from the full Edit form, the phone number or matching first name + last name + birth date) matches someone already in your database, a **Possible Duplicate** dialog appears before the new record is saved. It lists each matching person along with their email, phone, and birth date so you can compare.

- Click **Use Existing** next to a match to use that person's record instead of creating a new one.
- Click **Create Anyway** to add the new person even though a possible match was found.

This only checks for duplicates when you're creating a brand-new person — editing an existing record never triggers it. It only prevents new duplicates; it doesn't merge two records that already exist.

## Editing Details

1. On the person's profile page, click the **edit pencil** next to their name.
2. Fill in additional information such as middle name, membership status, dates, address, phone numbers, and (for children and students) grade and school.
3. Click **Save** to store the personal information.

The profile also includes several tabs for related information:

- **Notes** — Add notes about the person (pastoral care, follow-ups, etc.)
- **Groups** — View and manage [group memberships](../groups/group-members.md)
- **Attendance** — View [attendance records](../attendance/tracking-attendance.md)
- **Donations** — View [donation history](../donations/recording-donations.md)

## Working with Forms

You can fill out custom forms directly from a person's profile. These are user-defined forms that you can build by following the [Creating Forms](../forms/creating-forms.md) guide.

1. On the person's profile, click the **Forms** dropdown to select a form.
2. Click **Add Form** to open it.
3. Fill in the form details and click **Save**.

Once a form is submitted, click the **print icon** next to it to print that person's filled-in answers.

:::info
Forms linked to a person's profile use the **People** form type. If you need a standalone form (like an event registration), see the [Stand Alone form option](../forms/creating-forms.md) in the forms guide.
:::

:::tip
If you only need to track one or two extra pieces of information on people — a date, a number, a yes/no answer — use [Custom Fields](../settings/custom-fields.md) instead of a form. They're quicker to fill in and are searchable directly in Advanced Search.
:::

## Managing Households

Households let you link family members together. This is especially useful for [check-in](../attendance/check-in.md), where a parent can check in all their children at once.

1. On a person's profile, click the **edit pencil** next to the household name.
2. The household editor will open. Select the **household role** for the current person (e.g., Head, Spouse, Child).
3. Click **Add** to add another household member.
4. Type the person's name in the search box and click **Search**.
5. When the person appears in the search results, click **Select**.
6. Choose their household role and click **Save** to complete the household setup.
