---
title: "Roles & Permissions"
description: "Set up roles in B1 Admin to control what staff and volunteers can see and change, from donations and attendance to people and groups."
---

# Roles & Permissions

<div class="article-intro">

Roles let you control what different users can access within your ChurchApps account. You can create custom roles for staff, volunteers, and other team members, each with their own level of access to keep your data secure.

</div>

## Training Video

<YouTube id="ZzCIkinVMnE" title="Roles, Permissions, and Inviting Your Team in B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Before You Begin</h4>

- You need Domain Admin access or a role with permission to manage roles
- Have a list of team members and the areas they need access to
- Review the available permission categories below to plan your roles

</div>

## Accessing Roles

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left) and expand **Settings**.
2. Click **Roles**.
3. The Roles page displays all currently defined roles for your church. The **Members** column shows how many users are in each role, and the **(Everyone)** row shows **All users**.

## Creating a Role

Click **Add role** at the top of the Roles page. The menu offers:

- **Add Custom Role** -- Opens an **Edit Role** form above the list. Enter a **Role Name** and click **Save**. The new role starts with no permissions.
- **Add "Accounting" Role**, **Add "Church Staff" Role**, **Add "Content Admin" Role**, and **Add "Lessons Admin" Role** -- Ready-made roles with a sensible set of permissions already checked. B1 asks you to confirm, then creates the role. You can change its permissions afterward like any other role.

## Renaming or Deleting a Role

Hover over a role's row and click **Edit**. In the **Edit Role** form, change the **Role Name** and click **Save**, or click **Delete** and confirm to remove the role. The **Domain Admins** role can't be deleted.

## Understanding a Role's Page

Click a role's name to open its page. It has two panels:

- **Members** (left) -- The people in the role, with their name and email.
- **Edit Permissions** (right) -- The permissions you can grant to the role.

The **(Everyone)** row opens a page for permissions that apply to every user of your church; it has no member list.

## Adding Users to a Role

1. Open the role and click **Add** in the **Members** panel. An **Add To** form for that role opens.
2. Type a name or email in the search box and click the search button.
3. Click the add button next to the person. They're added to the role right away, and B1 offers to send them an invite email so they can sign in.
4. If the person isn't in your church yet, click **Create New User** under the search results, enter their **First Name**, **Last Name**, and **Email**, and click **Save**.

To change a member's name or email, click the edit icon on their row.

## Removing Users from a Role

1. Open the role containing the user you want to remove.
2. Find the person in the **Members** list.
3. Click the delete icon on their row and confirm.

Your church must always have at least one Domain Admin, so the last member of **Domain Admins** can't be removed.

## Configuring Permissions

Each role can be granted access to specific areas of B1 Admin. In the **Edit Permissions** panel, permissions are grouped into sections you can expand, such as **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups**, and **Tasks**. Type in the **Filter permissions** box to show only the permissions that match.

Check or uncheck a permission to grant or remove it for the role. Each change saves right away; there is no Save button. Note that **Edit Church Settings**, which opens the Settings page, is in the **Content** section. Each section heading shows how many of its permissions the role has, such as **2 of 5**, and the count updates as you check and uncheck boxes.

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

Pair **View People Names Only** with **View Attendance** or **Edit Attendance** for volunteers who take class attendance. **People** in their menu then opens **Groups**, where they can open the **All groups** list and see each class's member names and sessions. With **Edit Attendance** they can also [record attendance](../attendance/recording-attendance.md) and add visitors by searching their names. Names aren't links to person records, and confidential groups stay hidden unless the volunteer is a member.

B1 Admin hides links and buttons that need permissions a role doesn't have. For example, the **All groups** list is only available to people who can edit groups, view group members, or view people, or who have **View People Names Only** together with **View Attendance** or **Edit Attendance** (others are sent back to the Dashboard), attendance setup only appears with **Edit Services**, a group's **Email** button only appears for people with **Edit Group Members** (the permission needed to send group email), printing a group roster needs **View Group Members** or leading that group, and deleting a calendar event needs **Edit Content** (or withdrawing your own pending request).

### Check-In Kiosk Accounts

The account that signs in to a [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) kiosk needs the **Checkin** permission in the **Attendance** section (or **Edit Attendance**). With **Checkin** alone, the kiosk can look up families by name or phone, check them in and out, and show who may pick up a child, without access to the People directory.

Checkin is no longer granted through the **(Everyone)** row. Being in a role with other permissions does not let someone run the kiosk; add **Checkin** to a role such as "Check-In Volunteers" and put the kiosk accounts in it.

:::warning
**Domain Admins** have full access to all areas of your ChurchApps account. Their permissions cannot be modified or restricted. Use this role only for your most trusted administrators.
:::

:::tip
Create specific roles like "Treasurer" with only **Donations** access, "Counting Team" with **Enter Donations** and **View Donations**, or "Check-In Volunteer" with only **Attendance** access. This follows the principle of least privilege and keeps your data secure. See [Data Security](./data-security.md) for more on how ChurchApps protects your information.
:::
