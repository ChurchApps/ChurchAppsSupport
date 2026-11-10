---
title: "Saved Lists"
description: "Save a People search in B1 Admin as a named list, then reload it in one click. Lists stay live, so new matching members appear automatically."
---

# Saved Lists

<div class="article-intro">

**Saved Lists** let you store a search query under a name and re-run it with one click at any time. Build a list once — "Active Members in Campus North," "Visitors in the last 90 days," or any advanced filter — and it stays at the top of the People page so you never have to rebuild the query again.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Run at least one search in the People section so you have results to save. See [Searching People](./searching-people.md) or [AI Search](./ai-search.md).
- Saving, changing, and deleting lists requires the **Edit People** permission. See [Assigning Roles](./roles-permissions.md).

</div>

## Saving a Search as a List

1. Run a search on the **People** page — a quick search, an AI search, or an advanced filter search.
2. When the search finds at least one person, a **Save as List** button shows in the People page header.
3. Click **Save as List**.
4. Enter a **List Name** (required).
5. Optionally enter a **Category** to group related lists together (for example, "Outreach" or "Membership").
6. Under **Who can see this list**, choose **All staff** or **Only me**.
7. Under **Match**, choose **All filters** (people must match every filter) or **Any filter** (people who match at least one filter).
8. Under **Include household**, choose **Matches only**, **Children of matches** (also adds the children in each matching person's household), or **Entire household** (adds everyone in each matching person's household).
9. Optionally check **Refresh nightly** (see [Nightly Refresh](#nightly-refresh) below). When it's checked, you can also check **Email me when membership changes**.
10. Click **Save**.

The list is now saved and appears as a button in the row of saved lists at the top of the People page, next to **Everyone**. Lists marked **Only me** show a small lock icon.

:::info
Lists set to **All staff** are shared across your church — anyone with People access can see and load them. Only staff with the appropriate permission can change or delete lists.
:::

## Loading a Saved List

At the top of the People page, click any list name. The search re-runs instantly with the stored query, updating the results. Click **Everyone** to go back to your whole directory.

Lists are grouped by category (if you assigned one), with uncategorized lists appearing last.

:::tip
Lists are **live queries**, not snapshots. Every time you load a list, the search runs fresh against your current data, so new people who now match the criteria will appear.
:::

## Renaming and Deleting Lists

Staff with manage permission can rename or delete any list from the People page. First click the list to load it — two icons then appear next to its name:

- Click the **List Settings** (gear) icon to rename it or change its category and sharing. Lists saved with these options can also change **Include household**, **Refresh nightly**, and **Email me when membership changes** here. The **Match** setting can't be changed after the list is saved.
- Click the **Delete** (trash) icon to delete it (you will be asked to confirm).

## Nightly Refresh {#nightly-refresh}

Loading a list always runs its search fresh, whether or not **Refresh nightly** is checked. **Refresh nightly** also has B1 re-run the list every night and keep track of who joined or left it. If you checked **Email me when membership changes**, B1 emails you (the person who saved the list) after a nightly refresh that added or removed anyone, with how many people were added and removed. The nightly refresh also sends list membership changes to your [integrations](../integrations/index.md), such as Mailchimp tags.

## Use Cases

| Scenario | How to build the list |
|---|---|
| All visitors | Advanced search: Membership Status = Visitor |
| Members at a specific campus | Advanced search: Campus = [your campus] |
| Volunteers with an expired background check | Advanced search: [Custom Field](../settings/custom-fields.md) "Background check expires" is before today |
| Results from an AI question | Ask a question in AI Search, then save |

## Related Articles

- [Searching People](./searching-people.md) — quick search and column customization
- [AI Search](./ai-search.md) — natural-language queries you can save as lists
- [Custom Fields](../settings/custom-fields.md) — define your own person fields, then filter and save lists on them
- [Demographics](./demographics.md) — drill a demographic chart into a People filter, then save it as a list
- [Bulk Editing](./bulk-editing.md) — after loading a list, bulk-update all its members at once
