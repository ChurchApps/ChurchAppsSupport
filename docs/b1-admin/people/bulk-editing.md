---
title: "Bulk Editing People"
---

# Bulk Editing People

<div class="article-intro">
Bulk editing allows you to update multiple people at once, saving time when making the same change to many individuals. You can update membership status, marital status, gender, opt-out preferences, and group memberships in a single operation.
</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need permission to manage people data. See [Roles & Permissions](./roles-permissions.md) for details.
- You should have already added or imported the people you want to edit. See [Adding People](./adding-people.md) if needed.
</div>

## Selecting People for Bulk Editing

1. Navigate to **People** in B1 Admin
2. Use the search or filter tools to find the people you want to update
3. Check the boxes next to each person's name to select them
   - You can select people individually
   - Or use the header checkbox to select all visible people on the current page
4. Once you have selected at least one person, the **Bulk Actions** button will appear

:::tip
If you need to update a large group of people based on specific criteria, use the [AI Search](./ai-search.md) feature or filters to narrow down your list first, then select all matching people.
:::

## Available Bulk Actions

The **Bulk Actions** menu provides several options:

### Update Membership Status

Update the membership status for all selected people:

1. Click **Bulk Actions** → **Set Membership Status**
2. Choose the new status:
   - **Visitor** -- First-time or occasional attendees
   - **Regular Attendee** -- Frequent attendees who aren't members
   - **Member** -- Official church members
   - **Staff** -- Church staff members
   - **Inactive** -- People who are no longer attending
3. Choose update mode:
   - **Overwrite all** -- Replace the current status for all selected people
   - **Only update empty** -- Only set the status for people who don't have one
4. Click **Update**

### Update Marital Status

Update marital status in bulk:

1. Click **Bulk Actions** → **Set Marital Status**
2. Select the new status:
   - **Unknown**
   - **Single**
   - **Married**
   - **Divorced**
   - **Widowed**
3. Choose whether to overwrite existing values or only update empty fields
4. Click **Update**

### Update Gender

Update gender information for multiple people:

1. Click **Bulk Actions** → **Set Gender**
2. Select the value:
   - **Unspecified**
   - **Male**
   - **Female**
3. Choose update mode (overwrite all or only empty)
4. Click **Update**

### Update Opt-Out Status

Control whether people have opted out of communications:

1. Click **Bulk Actions** → **Set Opted Out**
2. Choose:
   - **No** -- Allow communications (remove opt-out)
   - **Yes** -- Block communications (set opt-out)
3. Choose update mode
4. Click **Update**

:::warning
Be careful when changing opt-out status. People who have explicitly opted out should not receive communications unless they have given new consent.
:::

### Add to Group

Add all selected people to one or more groups:

1. Click **Bulk Actions** → **Add to Group**
2. Search for and select the group(s) to add people to
3. You can select multiple groups to add people to all of them
4. Click **Add to Groups**

Each person will be added as a regular member of the selected group(s). You can later promote individuals to group leaders if needed from the [Group Members](../groups/group-members.md) page.

### Remove from Group

Remove all selected people from one or more groups:

1. Click **Bulk Actions** → **Remove from Group**
2. Search for and select the group(s) to remove people from
3. You can select multiple groups
4. Click **Remove from Groups**

:::info
This action only removes people from the specified groups. It does not delete their person records.
:::

### Delete People

Permanently delete the selected people from your church database:

1. Click **Bulk Actions** → **Delete**
2. Review the list of people who will be deleted
3. Type **DELETE** in the confirmation field
4. Click **Confirm Delete**

:::danger
Deleting people is permanent and cannot be undone. This will remove all their data including:
- Personal information
- Group memberships
- Attendance records
- Donation history
- Form submissions

Only use this action if you are absolutely certain you want to remove these people from your system.
:::

## Bulk Edit Results

After completing a bulk action, you'll see a summary showing:

- **Total selected** -- How many people were included in the operation
- **Successfully updated** -- How many records were changed
- **Failed** -- Any records that couldn't be updated (if applicable)
- **Unchanged** -- Records that didn't need changes (e.g., when using "only update empty" mode)

If any updates failed, you'll see error details explaining why.

## Best Practices

- **Start small** -- Test bulk operations on a few records first to ensure you're making the right changes
- **Use filters** -- Narrow your list with filters or AI search before selecting people to ensure you're only updating the right individuals
- **Double-check selections** -- Review the selected people before applying bulk changes
- **Use "only update empty" mode** -- When you want to fill in missing data without overwriting existing information
- **Document major changes** -- Keep notes about bulk updates in case you need to reference them later
- **Coordinate with your team** -- Let other administrators know when making large bulk changes

## Common Use Cases

### Updating New Members

After a membership class, update all attendees to Member status:

1. Search for the people who attended the class
2. Select them all
3. Use **Bulk Actions** → **Set Membership Status** → **Member**

### Organizing Small Groups

Add multiple people to a new small group:

1. Search for the people you want in the group
2. Select them
3. Use **Bulk Actions** → **Add to Group** and select the small group

### Cleaning Up Data

Fill in missing marital status for married couples:

1. Filter for people who are married (using household information)
2. Select those with blank marital status
3. Use **Bulk Actions** → **Set Marital Status** → **Married** → **Only update empty**

## Related Articles

- [Searching People](./searching-people.md) -- Find people to edit
- [AI Search](./ai-search.md) -- Use natural language to find specific groups of people
- [Group Members](../groups/group-members.md) -- Manage group membership
- [Exporting Data](./exporting-data.md) -- Export people data before making bulk changes
