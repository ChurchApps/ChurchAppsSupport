---
title: "Print Directory"
description: "Print a household-grouped member directory from B1 Admin, choose which fields to include, and see how each family card is laid out on letter paper."
---

# Print Directory

<div class="article-intro">

The Print Directory feature generates a formatted, printable member directory for your church. It organizes members by household, includes contact information and photos, and is designed to look professional when printed on standard letter-size paper.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need an active B1 Admin account with permission to view people.
- People in your directory should have photos and contact information filled in for the best results.

</div>

## Opening the Print Directory

1. Navigate to **People** in B1 Admin.
2. Click **Print Directory** in the People page header.
3. The Print Directory opens in a new browser tab and loads your directory, with a toolbar across the top.
4. Under **Include**, check the fields you want on each household card (see [Choosing What to Include](#choosing-what-to-include)).
5. Click **Print** to open your browser's print dialog.

The toolbar only appears on screen; it is not printed. After the print dialog closes, the tab switches back to the People page. Click **Close** to return to the People page without printing.

:::tip
The directory opens in a separate tab so you can print it without leaving the People page.
:::

## Choosing What to Include {#choosing-what-to-include}

The toolbar has a checkbox for each part of a household card: **Photos**, **Address**, **Phone**, **Email**, **Birthdays**, and **Anniversaries**. All are checked the first time you open it. Uncheck any you want to leave off; the preview updates right away, and the field is left off every household card.

B1 remembers your choices in that browser, so the next directory you print uses the same fields.

## What Gets Included

The print directory includes all **active members** of your church. Specifically:

- People with an **Inactive**, **Visitor**, or **Deceased** membership status are automatically excluded.
- People who have **opted out** of the directory (**Hide me from the member directory** on their record) are excluded. Opting out of texts by replying STOP does not remove anyone from the directory.
- Everyone else is grouped by **household**.

### Printing Only Your Search Results

After you run a search on the People page -- a quick search, an [Advanced Search](./searching-people.md#advanced-search), a [Saved List](./lists.md), or an [AI Search](./ai-search.md) -- the **Print Directory** button changes to **Print Results**. Clicking it prints a directory of just the people in your results instead of the whole church, using the same layout.

When printing search results, the membership-status filter above does not apply: everyone you searched for is included, even Visitors or Inactive people. People who have opted out of the directory are still left out. To go back to printing the full directory, clear your search first.

## Directory Layout

The printed directory has two parts:

### Cover Page

The first page includes:
- Your church logo, if one is set
- Your church name
- The title "Member Directory"
- The current year
- Your church's city and state
- The date it was printed and a count of the households included

### Member Listings

The remaining pages list households alphabetically by last name. Each household card shows:

- **Household name** -- A single person shows their own name. Two adults with no children show as a couple, for example "John & Jane Doe". Larger households, and any household with a child (including a parent and one child), show as "The Smith Family". If the household has a name saved in B1, that name is used for the surname.
- **Photos** -- Circular thumbnails for each household member, with their first name below. A member whose last name differs from the household's shows their full name (for example, "Emma Jones" in the Smith household).
- **Names** -- When **Photos** is unchecked, a line under the household name lists the members by first name (and last name when it differs), unless the household name already names everyone.
- **Home** -- Street address, city, state, and zip
- **Phone** -- Every member's home, mobile, and work numbers, one per line, with the member's first name in front (for example, "Jane: (555) 123-4567"). A number that more than one member shares, like a home phone, prints once without a name. A one-person household prints the numbers without names.
- **Email** -- Every member's email address, listed the same way as phone numbers
- **Birthdays** -- Each member's first name and birthday (month and day)
- **Anniversary** -- If recorded

Members are listed in the same order as on the person record's household: Head, Spouse, Children, then anyone else, with older members first.

Households are organized into **alphabetical sections** (A, B, C, ...) with a decorative section header before each letter group. Two household cards appear side by side on each row.

## Print Settings

The directory is formatted for **letter-size paper** (8.5" × 11") with 0.5-inch margins. When the browser print dialog appears:

- Leave the paper size set to **Letter**
- Enable **Background graphics** (sometimes called "Print backgrounds") in your browser's print settings if you want section headers to print with their color styling
- Portrait orientation is recommended

:::info
The directory respects page breaks. Each row of two household cards is kept together on one page, and section headers are not split from the households that follow them.
:::

## Related Articles

- [Searching People](./searching-people.md) -- Filter your directory before printing
- [Exporting Data](./exporting-data.md) -- Export directory data as a spreadsheet instead
- [Adding People](./adding-people.md) -- Add or update member records
