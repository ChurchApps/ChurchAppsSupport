---
title: "Bulk Editing People"
---

# Bulk Editing People

<div class="article-intro">
Bulk editing allows you Per update multiple people at once, saving Ora when making the same change Per many individuals. You can update membership status, marital status, gender, opt-out preferences, and Gruppo memberships in a single operation.
</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- You need Permesso Per manage people data. See [Roles & Permissions](./roles-permissions.md) for details.
- You should have already added or imported the people you want Per Modifica. See [Adding People](./adding-people.md) if needed.
</div>

## Selecting People for Bulk Editing

1. Navigate Per **People** in B1 Admin
2. Use the Cerca or filter tools Per Trova the people you want Per update
3. Check the boxes Avanti Per each person's name Per Seleziona them
   - You can Seleziona people individually
   - Or use the header checkbox Per Seleziona all visible people on the current page
4. Once you have selected at least one person, the **Bulk Actions** button will appear

:::tip
If you need Per update a large Gruppo of people based on specific criteria, use the [AI Search](./ai-search.md) feature or filters Per narrow down your list first, then Seleziona all matching people.
:::

## Disponibile Bulk Actions

The **Bulk Actions** menu provides several options:

### Update Membership Status

Update the membership status for all selected people:

1. Fai clic **Bulk Actions** → **Set Membership Status**
2. Scegli the new status:
   - **Visitor** -- First-Ora or occasional attendees
   - **Regular Attendee** -- Frequent attendees who aren't Membri
   - **Membro** -- Official church Membri
   - **Staff** -- Church Staff Membri
   - **Inattivo** -- People who are No longer attending
3. Scegli update mode:
   - **Overwrite all** -- Replace the current status for all selected people
   - **Only update empty** -- Only set the status for people who don't have one
4. Fai clic **Update**

### Update Marital Status

Update marital status in bulk:

1. Fai clic **Bulk Actions** → **Set Marital Status**
2. Seleziona the new status:
   - **Unknown**
   - **Single**
   - **Married**
   - **Divorced**
   - **Widowed**
3. Scegli whether Per overwrite existing values or only update empty fields
4. Fai clic **Update**

### Update Gender

Update gender information for multiple people:

1. Fai clic **Bulk Actions** → **Set Gender**
2. Seleziona the value:
   - **Unspecified**
   - **Male**
   - **Female**
3. Scegli update mode (overwrite all or only empty)
4. Fai clic **Update**

### Update Opt-Out Status

Control whether people have opted out of communications:

1. Fai clic **Bulk Actions** → **Set Opted Out**
2. Scegli:
   - **No** -- Allow communications (Rimuovi opt-out)
   - **Sì** -- Block communications (set opt-out)
3. Scegli update mode
4. Fai clic **Update**

:::warning
Be careful when changing opt-out status. People who have explicitly opted out should not receive communications unless they have given new consent.
:::

### Set Custom Field

Set a Sì/No [custom field](../settings/custom-fields.md) value for all selected people at once:

1. Fai clic **Bulk Actions** → **Set Custom Field**.
2. Scegli the Sì/No custom field you want Per set.
3. Scegli the value (**Sì** or **No**) Per apply.
4. Fai clic **Update**.

:::info
Only Sì/No custom fields are Disponibile for this bulk action. Per set other field types, Modifica each person individually.
:::

### Aggiungi Per Gruppo

Aggiungi all selected people Per one or more Gruppi:

1. Fai clic **Bulk Actions** → **Aggiungi Per Gruppo**
2. Cerca for and Seleziona the Gruppo(s) Per Aggiungi people Per
3. You can Seleziona multiple Gruppi Per Aggiungi people Per all of them
4. Fai clic **Aggiungi Per Gruppi**

Each person will be added as a regular Membro of the selected Gruppo(s). You can later promote individuals Per Gruppo leaders if needed from the [Group Members](../groups/group-members.md) page.

### Rimuovi from Gruppo

Rimuovi all selected people from one or more Gruppi:

1. Fai clic **Bulk Actions** → **Rimuovi from Gruppo**
2. Cerca for and Seleziona the Gruppo(s) Per Rimuovi people from
3. You can Seleziona multiple Gruppi
4. Fai clic **Rimuovi from Gruppi**

:::info
This action only removes people from the specified Gruppi. It does not Elimina their person records.
:::

### Elimina People

Permanently Elimina the selected people from your church database:

1. Fai clic **Bulk Actions** → **Elimina**
2. Review the list of people who will be deleted
3. Digita **Elimina** in the confirmation field
4. Fai clic **Confirm Elimina**

:::danger
Deleting people is permanent and cannot be undone. This will Rimuovi all their data including:
- Personal information
- Gruppo memberships
- Frequenza records
- Donazione history
- Modulo submissions

Only use this action if you are absolutely certain you want Per Rimuovi these people from your system.
:::

## Bulk Modifica Results

After completing a bulk action, you'll see a summary showing:

- **Total selected** -- How many people were included in the operation
- **Successfully updated** -- How many records were changed
- **Failed** -- Any records that couldn't be updated (if applicable)
- **Unchanged** -- Records that didn't need changes (e.g., when using "only update empty" mode)

If any updates failed, you'll see error details explaining why.

## Best Practices

- **Start small** -- Test bulk operations on a few records first Per ensure you're making the right changes
- **Use filters** -- Narrow your list with filters or AI Cerca before selecting people Per ensure you're only updating the right individuals
- **Double-check selections** -- Review the selected people before applying bulk changes
- **Use "only update empty" mode** -- When you want Per fill in missing data without overwriting existing information
- **Document major changes** -- Keep notes about bulk updates in case you need Per reference them later
- **Coordinate with your team** -- Let other administrators know when making large bulk changes

## Common Use Cases

### Updating New Membri

After a membership class, update all attendees Per Membro status:

1. Cerca for the people who attended the class
2. Seleziona them all
3. Use **Bulk Actions** → **Set Membership Status** → **Membro**

### Organizing Small Gruppi

Aggiungi multiple people Per a new small Gruppo:

1. Cerca for the people you want in the Gruppo
2. Seleziona them
3. Use **Bulk Actions** → **Aggiungi Per Gruppo** and Seleziona the small Gruppo

### Cleaning Up Data

Fill in missing marital status for married couples:

1. Filter for people who are married (using household information)
2. Seleziona those with blank marital status
3. Use **Bulk Actions** → **Set Marital Status** → **Married** → **Only update empty**

## Articoli Correlati

- [Searching People](./searching-people.md) -- Trova people Per Modifica
- [AI Search](./ai-search.md) -- Use natural language Per Trova specific Gruppi of people
- [Group Members](../groups/group-members.md) -- Manage Gruppo membership
- [Exporting Data](./exporting-data.md) -- Esporta people data before making bulk changes
