---
title: "Campuses"
---

# Campuses

<div class="article-intro">

If your church meets at more than one location, **Campuses** let you track which site each person and group belongs to. Once configured, campuses appear as an option on person profiles, in attendance setup, and in the Demographics dashboard. Multi-site churches can filter, search, and report by campus throughout B1 Admin.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Church Settings** permission to manage campuses. See [Roles & Permissions](./roles-permissions.md).

</div>

## Opening Campus Settings

In B1 Admin, go to **Settings** in the left sidebar and select **Campuses** from the Settings navigation. You will see a list of all configured campuses with their name, location, and timezone.

## Adding a Campus

1. Click **Add Campus** (or the **+** button if no campuses exist yet).
2. Fill in the campus details:
   - **Name** *(required)* — the display name shown throughout B1 Admin (for example, "Main Campus" or "North Campus").
   - **Address** — the campus street address (used for informational display; not the same as your main church address in Church Settings).
   - **City / State / Zip** — the campus location.
   - **Timezone** — the IANA timezone for this campus (for example, *America/Chicago*). Useful when campuses are in different time zones.
   - **Website** — an optional URL for this campus's own web presence.
3. Click **Save**.

## Editing a Campus

Click any campus row in the list to open its editor in the panel to the right. Update the fields and click **Save**.

## Deleting a Campus

Open a campus for editing and click **Delete**. You will be asked to confirm. Deleting a campus does not remove the people assigned to it — their campus field simply becomes blank.

## Assigning People to a Campus

After creating campuses, staff can assign a person to a campus from their profile:

1. Open a person's record in **People**.
2. Click **Edit**.
3. Choose the campus from the **Campus** dropdown.
4. Click **Save**.

You can also update campus in bulk from the People page. Select multiple people, use **Bulk Edit**, and set the Campus field for everyone at once.

## Filtering by Campus

Once campuses are set up, you can filter across B1 Admin by campus:

- **People search** — add a Campus condition in the advanced search, or load a [Saved List](../people/lists.md) scoped to a campus.
- **Demographics** — the [Demographics dashboard](../people/demographics.md) shows a Campus donut chart when at least one person has a campus assigned.
- **Attendance Setup** — each service time in Attendance can be tied to a campus.

:::tip
Single-location churches don't need to configure campuses. All campus features are optional — if no campuses exist, campus fields and charts simply don't appear.
:::

## Related Articles

- [Church Settings](./church-settings.md) — your main church address and branding (separate from campus addresses)
- [Demographics](../people/demographics.md) — the Campus breakdown chart
- [Attendance Setup](../attendance/setup.md) — link service times to a campus
- [Bulk Editing](../people/bulk-editing.md) — assign campus to many people at once
