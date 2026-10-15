---
title: "Exporting Data"
---

# Exporting Data

<div class="article-intro">

B1 Admin lets you export your church data so you can use it in spreadsheets, share it with your team, or keep a backup. Whether you need a quick list of names and emails or a complete database export, there are options to fit your needs.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need an active B1 Admin account with permission to view the data you want to export. See [Roles & Permissions](roles-permissions.md) if you're unsure about your access level.
- For a full database export, you need access to the **Settings** area.

</div>

## Exporting from the People Page

The fastest way to export your directory is directly from the **People** page:

1. Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin), expand **People**, and click **People**.
2. Use the search bar or filters to narrow down the results you want to export (or leave it unfiltered to export everyone). See [Searching People](searching-people.md) for tips on filtering.
3. Click the **Export** button in the People page header.
4. A CSV file will download to your computer with the people currently in your results, including their name, contact information, address, and other standard fields.

:::tip
The export includes everyone in your current results. Run a search, load a [Saved List](./lists.md), or use **Advanced** search first to export just the people you need.
:::

## Full Data Export from Settings

For a complete export of all your B1 data (not just people), use the export tool in Settings:

1. In the Jump menu, choose **Settings > Settings**.
2. Click the **Import/Export** link under your church's name at the top of the left-hand settings menu.
3. Select **B1 Database** from the **Data Source** dropdown.
4. Review the data preview and click **Continue to Destination**.
5. Select **B1 Export Zip** as the export destination.
6. Monitor the export progress until all items show green checkmarks.
7. The export file will download automatically. Look for the `B1Export` file in your downloads folder.
8. Unzip the file to access individual CSV files (such as `people.csv`) that you can open in Excel, Google Sheets, or Numbers.

:::info
The B1 Export Zip is a full backup of your church data. It holds:

- people (with photos) and households, including household pickup contacts
- campuses, services, and service times
- groups and group members
- funds and donations, including gifts split across several funds
- attendance
- forms, questions, submissions, and answers
- custom fields and their values
- saved people lists

To restore it, choose **B1 Import Zip** as the source and **B1 Database** as the destination (see [Importing Data](./importing-data.md)). Households, pickup contacts, and saved lists are rebuilt along with the people. Saved list filters are pointed at the restored groups, funds, campuses, and custom fields.
:::

## Exporting Group Data

You can also export member lists for individual groups. From the **Groups** page, open a group and click the **download icon** to export that group's member list. See [Group Members](../groups/group-members.md) for more details.

:::info
Exported CSV files work with all major spreadsheet applications including Microsoft Excel, Google Sheets, and Apple Numbers.
:::
