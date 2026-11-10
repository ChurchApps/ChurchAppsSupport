---
title: "Bulk Editing People"
description: "Update membership status, marital status, gender, directory opt-out, campus, Yes/No custom fields, or groups for many people at once in B1 Admin."
---

# Bulk Editing People

<div class="article-intro">
Bulk editing allows you to update multiple people at once, saving time when making the same change to many individuals. You can update membership status, marital status, gender, directory opt-out, campus, Yes/No custom fields, group memberships, and workflows in a single operation, or delete people.
</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need permission to manage people data. See [Roles & Permissions](./roles-permissions.md) for details.
- You should have already added or imported the people you want to edit. See [Adding People](./adding-people.md) if needed.
</div>

## Selecting People for Bulk Editing

1. Navigate to **People** in B1 Admin
2. Use the search or filter tools to find the people you want to update
3. Check the boxes to select people
   - In the **Households** view, checking a household selects everyone in it
   - In the **Table** view (switch with the **View as** toggle), you can select people individually
   - Or use the checkbox above the list to select all visible people
4. Once you have selected at least one person, the bar above the list shows how many are selected, along with **Clear Selection** and an **Actions** button

:::tip
If you need to update a large group of people based on specific criteria, use the [AI Search](./ai-search.md) feature or filters to narrow down your list first, then select all matching people.
:::

## Available Bulk Actions

The **Actions** menu provides the options below. Each one opens a small dialog that tells you how many people it will change; pick a value and click **Apply**. The new value replaces whatever each selected person had before. When it's done, a message at the bottom of the page confirms how many people were updated.

### Set Membership Status

1. Click **Actions** → **Set Membership Status**
2. Choose the new **Membership Status**:
   - **Visitor** -- First-time or occasional attendees
   - **Guest** -- Guests, such as families registered at a check-in kiosk
   - **Regular Attendee** -- Frequent attendees who aren't members
   - **Member** -- Official church members
   - **Staff** -- Church staff members
   - **Inactive** -- People who are no longer attending
   - **Deceased** -- People who have passed away
3. Click **Apply**

### Set Marital Status

1. Click **Actions** → **Set Marital Status**
2. Choose **Unknown**, **Single**, **Married**, **Divorced**, or **Widowed**
3. Click **Apply**

### Set Gender

1. Click **Actions** → **Set Gender**
2. Choose **Unspecified**, **Male**, or **Female**
3. Click **Apply**

### Set Directory Opt-Out

Directory opt-out controls whether people appear in the member directory -- the [printed directory](./print-directory.md) and the member directory in the B1 app. It is the same setting as **Hide me from the member directory** on a person's record.

1. Click **Actions** → **Set Directory Opt-Out**
2. Choose **Opted Out Yes** to hide the selected people from the directory, or **Opted Out No** to show them again
3. Click **Apply**

:::warning
People who chose to hide themselves from the directory should stay hidden unless they ask to be listed again.
:::

### Set Campus

This option appears when your church has [campuses](../settings/campuses.md) set up.

1. Click **Actions** → **Set Campus**
2. Choose the campus
3. Click **Apply**

### Set Custom Field

Set a Yes/No [custom field](../settings/custom-fields.md) value for all selected people at once:

1. Click **Actions** → **Set Custom Field**.
2. Choose the Yes/No **Custom Field** you want to set.
3. Choose the **Value** (**Yes** or **No**) to apply.
4. Click **Apply**.

:::info
Only Yes/No custom fields are available for this bulk action. To set other field types, edit each person individually. If your church has no Yes/No custom fields, the dialog says so.
:::

### Add to Group

1. Click **Actions** → **Add to Group**
2. Choose the **Group** to add people to. To put them in a brand-new group instead, check **Create New Group** and type a **New Group Name**.
3. Click **Apply**

Each person is added as a regular member of the group. You can later promote individuals to group leaders from the [Group Members](../groups/group-members.md) page. To add people to several groups, repeat this for each group.

### Remove from Group

1. Click **Actions** → **Remove from Group**
2. Choose the **Group** to remove people from
3. Click **Apply**

:::info
This action only removes people from the group. It does not delete their person records.
:::

### Add to Workflow

Add the selected people to a [workflow](../serving/workflows.md) as cards:

1. Click **Actions** → **Add to Workflow**
2. Choose the workflow
3. Click **Apply**

### Delete People

Delete the selected people from your church database:

1. Click **Actions** → **Delete**
2. The **Delete Selected People** dialog asks you to confirm how many people will be deleted
3. Click **Delete**

:::danger
Deleted people disappear from your directory, groups, and searches. Only use this action if you are certain you want to remove these people from your system.
:::

You can't select yourself, so you can't bulk-delete or bulk-edit your own record.


## Best Practices

- **Start small** -- Test bulk operations on a few records first to ensure you're making the right changes
- **Use filters** -- Narrow your list with filters or AI search before selecting people to ensure you're only updating the right individuals
- **Double-check selections** -- Review the selected people before applying bulk changes
- **Document major changes** -- Keep notes about bulk updates in case you need to reference them later
- **Coordinate with your team** -- Let other administrators know when making large bulk changes

## Common Use Cases

### Updating New Members

After a membership class, update all attendees to Member status:

1. Search for the people who attended the class
2. Select them all
3. Use **Actions** → **Set Membership Status** → **Member**

### Organizing Small Groups

Add multiple people to a new small group:

1. Search for the people you want in the group
2. Select them
3. Use **Actions** → **Add to Group** and select the small group

### Cleaning Up Data

Mark a group of former attendees as inactive:

1. Open **Advanced** search and filter for the people you want to update (for example, everyone who hasn't attended recently)
2. Select them
3. Use **Actions** → **Set Membership Status** → **Inactive**

## Related Articles

- [Searching People](./searching-people.md) -- Find people to edit
- [AI Search](./ai-search.md) -- Use natural language to find specific groups of people
- [Group Members](../groups/group-members.md) -- Manage group membership
- [Exporting Data](./exporting-data.md) -- Export people data before making bulk changes
