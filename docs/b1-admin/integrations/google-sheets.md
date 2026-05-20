---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** is the official Google Sheets add-on for B1.church. It adds a sidebar to any spreadsheet that exports People, Donations, Groups, or Attendance from your B1 church into named tabs — on demand, with one click. The add-on runs entirely inside the user's Google account; nothing about it touches ChurchApps' servers beyond the read-only API calls each export makes.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A Google account with edit access to the spreadsheet you want to export into
- A church admin (or someone with read access to the data you want to export) able to mint a B1 API key
- The B1 Export add-on installed from the Google Workspace Marketplace

</div>

## What It Exports

| Menu item | Sheet tab | Data |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Each export **replaces** the contents of its named tab — re-running an export gives you a fresh snapshot, not appended rows. Other tabs in the spreadsheet are untouched.

## Setup

### 1. Create a B1 API key with the right scopes

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, name it "Sheets Export", and grant the **read** scopes for whatever you plan to export:
   - `people:read` for the People export
   - `donations:read` for Donations
   - `groups:read` for Groups
   - `attendance:read` for Attendance
3. A key that only does exports does **not** need `settings:write` — that scope is only for connectors that register webhooks (Zapier / Make). Keep this key narrow.
4. Save and copy the `cak_…` key.

### 2. Install the add-on

1. Open the spreadsheet you want to export into.
2. **Extensions → Add-ons → Get add-ons**.
3. Search for **B1 Export** and install it. Google asks you to grant access to your sheets and to external HTTP (so the add-on can call the B1 API).

After installation, a **B1 Export** entry appears under the **Extensions** menu of every spreadsheet you open with this Google account.

### 3. Connect the key

1. **Extensions → B1 Export → Connect…** (or **B1 Export → Connect…** from the menu bar after the first open).
2. Paste the API key into the sidebar, leave the Base URL as `https://api.b1.church` (unless you're testing against staging), and click **Save**.
3. Click **Test Connection** — a green "Connection OK" confirms the key works.

The key is stored in **per-user properties** (`PropertiesService.getUserProperties()`) — it's tied to your Google account, never written into the sheet, and never visible to other editors of the spreadsheet.

## Running an Export

Either:

- **From the menu** — **Extensions → B1 Export → Export People** (or Donations / Groups / Attendance)
- **From the sidebar** — open the sidebar (Connect…) and click the appropriate dataset button

A toast confirms when it's done — "_N_ row(s) written to 'B1 People'."

## Building Reports On Top

The exported tabs are plain Google Sheets data. Build your own analytics on referencing tabs:

- A **summary tab** with `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` to total card gifts
- A **filtered view** of just members with `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- A **chart** of attendance trends pulling from `B1 Attendance`

Re-running the export refreshes the underlying tab; your formulas update automatically.

## Scheduling Recurring Exports

The add-on is on-demand by default. For weekly or monthly exports, use Apps Script's built-in time-driven triggers:

1. **Extensions → Apps Script** in the spreadsheet (this opens the add-on's bound script).
2. Click the **⏰ Triggers** icon in the left sidebar.
3. **Add Trigger** for `exportPeople` (or any export function) — choose *Time-driven*, *Week timer*, e.g. *Every Monday 6am*.

The export runs in the background under your Google account. If the API key is rotated or revoked, the trigger emails you the next time it fails.

## Permissions & Privacy

- The add-on requests only `spreadsheets.currentonly` (it can only touch the spreadsheet it's open in) and `script.external_request` (so `UrlFetchApp` can call the B1 API). It does **not** see your Drive, Gmail, or other Google data.
- The B1 API key is stored per-user — other editors of the same spreadsheet cannot see it.
- All B1 API calls are made over HTTPS with `Authorization: Bearer cak_…`.

## Troubleshooting

- **"No API key set"** — open **Extensions → B1 Export → Connect…** and paste the key.
- **"B1 rejected the API key (401)"** — the key was revoked or is wrong. Re-mint and re-paste it.
- **"This API key lacks permission for /giving/donations (403)"** — the key doesn't have `donations:read`. Update the key's scopes in B1Admin.
- **Sheet doesn't refresh** after running — make sure you're looking at the *correct* tab name (`B1 People` etc.). The export creates the tab if it didn't exist.
- **"Quota exceeded"** — Apps Script imposes per-user daily quotas on `UrlFetchApp` (typically thousands of calls per day). A large church with many records may need to split exports across multiple days or use [Make](./make) / a custom integration for high-volume sync.

## Customising the Add-On

The add-on is open source — the Apps Script project lives in the `B1Integrations/GoogleSheetsAddon/` repo. If you want a column we don't export, an extra dataset, or a different output format, open an issue or PR there.

## See Also

- [Zapier](./zapier) — for real-time sync rather than on-demand export
- [Make](./make) — for sync with more complex transformations
- [API Keys (developer reference)](/docs/developer/api/api-keys)
