---
title: "Custom Fields"
---

# Custom Fields

<div class="article-intro">

**Custom Fields** let you track your own information on every person record — things B1 doesn't have a built-in field for, like a background-check expiration date, a T-shirt size, or a baptism class status. You define a field once in Settings, then fill in a value on each person's profile and search or build lists on it. This replaces the older workaround of creating a People form just to store a single piece of custom data.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need **People** edit permission to define fields and to fill in values, and access to the **Settings** area. Anyone with People view permission can see the values. See [Roles & Permissions](./roles-permissions.md).
- Decide what you want to track and which type fits best (text, a number, a date, a yes/no answer, or a pick-list) before you start.

</div>

## Opening Custom Fields

In B1 Admin, go to **Settings** in the left sidebar and select the **Custom Fields** card. You can also go straight there at **/settings/custom-fields**. You'll see a list of every field you've defined, showing its **Name** and **Field Type**. If you haven't created any yet, the panel reads *"No custom fields have been added yet."*

## Adding a Field

1. Click **Add Field**.
2. In the editor that opens on the right, enter a **Name** — this is the label staff will see on person profiles and in search (for example, *Background check expires*).
3. Choose a **Field Type**:
   - **Textbox** — free-form short text.
   - **Whole Number** — numbers without decimals (for example, a count).
   - **Decimal** — numbers that can include decimals.
   - **Date** — a calendar date.
   - **Yes/No** — a simple yes-or-no answer.
   - **Multiple Choice** — a pick-list. When you choose this type, a **choices editor** appears so you can add each option people can select from.
4. Click **Save**.

The field is now available on every person's profile.

:::info
The field types are the same set used for [form questions](../forms/creating-forms.md), so values behave consistently across B1.
:::

## Editing a Field

Click any field row in the list to reopen it in the editor. Change the name, type, or choices and click **Save**.

:::warning
Changing the **Field Type** of a field that already has values (for example, from Textbox to Date) can leave previously entered values in a format that no longer matches the new type. Change types with care once staff have started filling the field in.
:::

## Deleting a Field

Open a field for editing and click **Delete**. You'll be asked to confirm: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Deleting a field permanently removes it **and every value stored for it** on all people — this cannot be undone.

## Filling In Values on a Person

Once at least one custom field exists, its values live right alongside the built-in details on each person's record — you view them in **Personal Details** and edit them on the same form you use for the rest of the person's information. Nothing extra appears until you've defined your first field.

1. Open a person's record in **People**.
2. In the **Personal Details** section, click the **Edit** (pencil) button.
3. Scroll to the **Custom Fields** area at the bottom of the edit form and fill in a value for each field. Each field shows the input that matches its type — a date picker for Date fields, a yes/no dropdown for Yes/No fields, a pick-list for Multiple Choice, and so on.
4. Click **Save**. Your custom-field values are saved together with the rest of the person's details.

Back on the profile, any field that has a value now shows in the **Personal Details** section (Yes/No answers read as *Yes* or *No*, and Multiple Choice shows the option's label). Fields left blank are simply hidden. To remove a value, edit the person, clear the field, and save — an empty value is deleted from the record rather than stored as blank.

:::tip
The classic use case is volunteer safety: create a **Date** field called *Background check expires*, record each volunteer's date, then build a [Saved List](../people/lists.md) that flags anyone whose date has passed.
:::

## Searching and Building Lists on Custom Fields

Custom fields are fully searchable:

1. On the **People** page, open the [Advanced Search](../people/searching-people.md).
2. Expand the **Custom Fields** category.
3. Check the field you want to filter on, choose an operator, and enter a value. The operators offered match the field's type:
   - **Textbox** — contains, equals, starts with, ends with.
   - **Whole Number / Decimal** — equals, greater than, greater than or equal, less than, less than or equal.
   - **Date** — equals, after (greater than), before (less than).
   - **Yes/No** — equals Yes or No.
   - **Multiple Choice** — equals or contains one of the choices.

Save any custom-field search as a [List](../people/lists.md). Lists are live queries, so a list built on *Background check expires is before today* re-checks every person each time you open it — no manual upkeep.

## What Happens on Merge

When you [merge two person records](../people/adding-people.md), custom-field values carry over automatically. The person you keep holds on to their own values; for any field where only the removed person had a value, that value is copied over so nothing is lost.

## Related Articles

- [Searching People](../people/searching-people.md) — advanced search, including the Custom Fields category
- [Saved Lists](../people/lists.md) — save a custom-field search and re-run it live
- [Roles & Permissions](./roles-permissions.md) — who can define fields and edit values
- [Creating Forms](../forms/creating-forms.md) — for multi-question data collection where a full form fits better than single fields
