---
title: "Roles & Permissions"
---

# Roles & Permissions

<div class="article-intro">

Roles let you control what different users can access within your ChurchApps account. You can create custom roles for staff, volunteers, and other team members, each with their own level of access to keep your data secure.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need Domain Admin access or a role with permission to manage roles
- Have a list of team members and the areas they need access to
- Review the available permission categories below to plan your roles

</div>

## Accessing Roles

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left) and expand **Settings**.
2. Click **Roles**.
3. The Roles page displays all currently defined roles for your church.

## Understanding the Roles Page

The Roles page is divided into two panels:

- **Left side** -- Shows the list of members assigned to the selected role.
- **Right side** -- Displays the permission settings you can configure for that role.

Click on any role name to view and manage its members and permissions.

## Adding Users to a Role

1. Select the role you want to add members to.
2. Use the **search field** on the left side to find the person you want to add.
3. Select the person from the search results.
4. They will be added to the role immediately.

## Removing Users from a Role

1. Select the role containing the user you want to remove.
2. Find the person in the member list on the left side.
3. Click the **remove button** next to their name.

## Configuring Permissions

Each role can be granted access to specific areas of B1 Admin. In the **Edit Permissions** panel, permissions are grouped into sections you can expand, such as **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups**, and **Tasks**. Type in the **Filter permissions** box to show only the permissions that match.

Check or uncheck a permission to grant or remove it for the role.

### Donations Permissions

The **Donations** section has these permissions:

- **View Donation Summaries** -- see the Donations section, including the Summary, Batches, Funds, Campaigns, and Giving Statements pages.
- **View Donations** -- see individual donations, such as the gifts inside a batch.
- **Edit Donations** -- full control: add, edit, and delete donations and batches, and [close and reopen batches](../donations/batches.md#closing-and-reopening-a-batch).
- **Enter Donations** -- add batches and enter, edit, or delete donations, but only in batches that are still open. People with only this permission cannot delete batches, close or reopen them, or change gifts that came in through online giving.
- **Edit Settings** -- manage donation settings.

Someone with **Enter Donations** but not **View Donation Summaries** sees only the **Batches** page under **Donations**. Give a counting team role both **Enter Donations** and **View Donations** so they can open a batch and see the gifts they entered. See [Who Can Change a Batch](../donations/batches.md#who-can-change-a-batch) for details.

### People Names Only

The **People and Groups** section includes **View People Names Only**. Use it for volunteers who need to look people up by name -- for example, to pick someone in a search box -- without access to the full directory. With this permission alone, a person:

- Can search for people by name and see the list of recently added people, but only sees each person's name, photo, and membership status
- Cannot search by email, see contact details, or open the **People** directory

B1 Admin hides links and buttons that need permissions a role doesn't have. For example, the **All groups** list is only available to people who can edit groups, view group members, or view people (others are sent back to the Dashboard), attendance setup only appears with **View Attendance** or **Edit Services**, a group's **Email** button only appears for people with **Edit Group Members** (the permission needed to send group email), printing a group roster needs **View Group Members** or leading that group, and deleting a calendar event needs **Edit Content** (or withdrawing your own pending request).

:::warning
**Domain Admins** have full access to all areas of your ChurchApps account. Their permissions cannot be modified or restricted. Use this role only for your most trusted administrators.
:::

:::tip
Create specific roles like "Treasurer" with only **Donations** access, "Counting Team" with **Enter Donations** and **View Donations**, or "Check-In Volunteer" with only **Attendance** access. This follows the principle of least privilege and keeps your data secure. See [Data Security](./data-security.md) for more on how ChurchApps protects your information.
:::
