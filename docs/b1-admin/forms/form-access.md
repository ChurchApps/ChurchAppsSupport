---
title: "Form Access & Permissions"
description: "Understand who can build, manage, fill in, and read each form in B1 Admin: church-wide form permissions, per-form members, Public and Restricted access, availability dates, and linked-group leaders."
---

# Form Access & Permissions

<div class="article-intro">

Access to forms works on two levels. Church-wide permissions on a role decide who can open the Forms page and manage forms in general, while each Stand Alone form can also have its own **Form Members** with **Admin** or **View Only** access to just that form. On top of that, a form's **Form Access** and availability dates control who can fill it in. This page brings those rules together so you can give each person exactly the access they need.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Permissions are granted to roles under **Settings > Roles**. See [Configuring Permissions](../settings/roles-permissions.md#configuring-permissions).
- Per-form access is set on the **Form Members** tab of a Stand Alone form. See [Managing Form Members](./creating-forms.md#managing-form-members).

</div>

## Church-Wide Permissions

Two permissions in the **Forms and Plans** section of a role control forms for the whole church:

- **Form Admin** -- Full control of every form, People and Stand Alone alike: create, edit settings, build questions, manage form members, read and export submissions, duplicate, archive, restore, and delete. Form admins also see every archived form, and the **Linked forms** section on a [group's page](../groups/group-page.md#linked-forms).
- **Edit Forms** -- Full control of **People** forms (the ones filled in from a person's record), and the ability to add new forms. For Stand Alone forms, people with **Edit Forms** only see and manage the forms they have been added to as a [form member](#per-form-members); other Stand Alone forms don't appear in their list.

To open the Forms page at all, a person needs one of these two permissions. Someone with neither sees a permission message instead of the list, even if they are a member of a form.

:::tip
When you add a staff member or volunteer as a form member, also give their role **Edit Forms** so they can reach the Forms page and find the form. Without it, they can only open the form by its direct link.
:::

## Per-Form Members

Stand Alone forms have a **Form Members** tab where you give individual people access to that one form. Each member has one of two roles:

- **Admin** -- Can do everything a Form Admin can do on this form: edit its settings (**Edit Form**), add and reorder questions, manage its members, read, export, and print submissions, and duplicate or archive it.
- **View Only** -- Can read, export, and print the form's submissions on the **Form Submissions** tab, and nothing else. New members start as **View Only**.

Each member also has an **Email Notification** switch. When it is on, that person gets an email every time the form is submitted, which is handy for a visitor card or prayer request form.

People forms don't have a **Form Members** tab; access to them comes only from the church-wide permissions above.

## What Each Person Sees

A form's page shows up to three tabs, depending on how you got your access:

| Tab or action | Form Admin | Edit Forms (People forms) | Form member: Admin | Form member: View Only |
|---------------|------------|---------------------------|--------------------|------------------------|
| **Questions** tab | Yes | Yes | Yes | No |
| **Form Members** tab (Stand Alone only) | Yes | -- | Yes | No |
| **Form Submissions** tab | Yes | No (read a person's answers from their record instead) | Yes | Yes |
| **Edit Form** settings, **Edit**, **Duplicate**, **Archive**, **Restore** | Yes | Yes | Yes | No |
| **Print** a blank form and show the **QR Code** | Yes | Yes | Yes | Yes |

When only one tab is available, the tab bar is hidden and that tab shows on its own. See [The Forms Page](./index.md#the-forms-page) for the list actions and [Managing Submissions](./managing-submissions.md) for the submissions tab.

:::info
Someone with **Edit Forms** but not **Form Admin** doesn't get a **Form Submissions** tab on People forms. They read each person's answers from the **Forms** section of that person's record instead. See [Working with Forms](../people/adding-people.md#working-with-forms).
:::

## Leaders of a Linked Group

When a Stand Alone form is [linked to a group](./creating-forms.md#linking-a-form-to-a-group), the group's leaders can read and print its submissions on the group's page in B1.church without being form members or having any form permission. In B1 Admin they see the form in the group's **Linked forms** section, but they can't open it or change it unless they also have one of the permissions above. Leaders never get to edit a linked form; to let a leader manage the form itself, add them as an **Admin** form member.

## Who Can Fill In a Form

Which people can submit a form is a separate question from who manages it:

- **People forms** are filled in from a person's record in B1 Admin by staff. They have no public link.
- **Stand Alone forms** have a public URL. Their **Form Access** setting decides who can open it:
  - **Public** -- Anyone with the link, signed in or not. People who pay on a public form without signing in must pass the **I'm not a robot** check.
  - **Restricted** -- The person must sign in to your church's B1.church site first. Signed-in members of your church can submit; so can anyone with access to manage the form.
- **Set Form Availability Timeframe** -- With **Yes** and an **Availability Start Date** and **Availability End Date**, the form only accepts submissions between those dates (the end date counts in full). Outside them it is closed: the public page won't take submissions and the group page shows the form as **Closed**. People who can manage the form can still submit it while it is closed, for example to enter a late paper registration. Archived forms disappear from group pages.
- Forms embedded on your website with the **Form** element follow the same access and availability rules as the public URL.

See [Configuring Form Properties](./creating-forms.md#configuring-form-properties) for where these settings live.

## Related Articles

- [Creating Forms](./creating-forms.md) -- build forms, link them to groups, and manage form members
- [Managing Submissions](./managing-submissions.md) -- read, export, and reassign responses
- [Roles & Permissions](../settings/roles-permissions.md) -- grant **Form Admin** and **Edit Forms** to roles
