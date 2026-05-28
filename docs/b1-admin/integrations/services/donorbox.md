---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

If your church takes donations through Donorbox but tracks people and statements in B1, you can have Donorbox's instant Zapier triggers create matching donation records inside B1 — and create the donor as a B1 person if they don't already exist. No manual reconciliation, no monthly export.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [Donorbox](https://donorbox.org) account with at least one campaign
- A [Zapier](https://zapier.com) account
- A B1Admin user with **Edit Settings** permission

</div>

## What You Can Wire Up

| Direction | Donorbox trigger | B1 action |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (instant) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (recurring) | Find Person → Add Donation (use Plan id as note) |

Donorbox publishes its triggers as **instant** — they fire within seconds of a real donation. No polling delay.

## Setup

### 1. Mint a B1 API key

In B1Admin: **Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read` — to look up the donor by email
- `people:write` — to create them if they're new
- `donations:write` — to record the gift

Triggers in this direction are Donorbox's, not B1's, so you don't need `settings:write` here.

### 2. Build the "record a donation" Zap

1. **Trigger** — Donorbox: New Donation. Connect with Donorbox's API key (in Donorbox: *Account → Profile → API Settings*).
2. **Action** — B1.church: Find Person. Map the donor's email from the trigger to the *Email* search field.
3. **Action** — Filter by Zapier (optional): only continue if the donor wasn't found, then…
4. **Action** — B1.church: Create Person. Map first/last/email so the donor lands as a member, not just a gift record.
5. **Action** — B1.church: Add Donation. Map:
   - Amount → `data.amount`
   - Donation Date → trigger's donation date
   - Fund → pick the B1 fund that mirrors the Donorbox campaign (Zapier lets you switch funds based on a filter or formatter step)
   - Method → "Online"
   - Notes → Donorbox transaction id (handy when reconciling)

Turn the Zap on. The next live donation through Donorbox lands in **B1Admin → Donations** automatically.

## Common Recipes

### One Zap per fund

If you run multiple Donorbox campaigns that map to separate B1 funds, the cleanest layout is one Zap per campaign with a Donorbox *campaign* filter at the top — that way the fund mapping is hard-coded and you skip the lookup step.

### Treat updated donations as corrections

Donorbox's *New or Updated Donation* fires on edits too. Use a Zapier *Path* step on `event_type` to fork: "new" → Add Donation, "updated" → Find Donation + Update (note: B1's Zapier app does not currently have an Update Donation action — for now, log "updated" events to a Slack channel for manual review).

### Sync recurring plan changes to a Slack channel

- **Trigger** — Donorbox: New or Updated Plan
- **Action** — Slack: Send Message to `#donations` (e.g. "Plan changed — Sarah's monthly gift is now $200")

## Limits & Notes

- **Match donors by email.** Donorbox doesn't share B1's person id; the only durable join key is email. Donors who give under a different email will create a new B1 person — your monthly reconciliation should look for these.
- **Refunds aren't separately exposed** — Donorbox emits a status update on the same donation. B1's Zapier app currently doesn't have an *Update Donation* action; the safe pattern today is to log refund events out-of-band and adjust the donation manually.
- **Test in Donorbox's sandbox first** to avoid creating fake gifts in production B1. Donorbox provides test mode credentials separate from live.

## Troubleshooting

- **"Person not found" warning every run** — that's fine if you've ordered the steps so a *Create Person* runs in the not-found branch. If the Create Person step never runs either, double-check the API key has `people:write`.
- **Donation amount looks 100× too big or small** — Donorbox sends cents in some payload variants and dollars in others. Use a *Formatter by Zapier — Numbers* step to divide by 100 if needed.
- **Duplicate donations from a single gift** — Donorbox fires both *New Donation* and *Updated Donation*. Either filter to `event_type = "donation.succeeded"` or build two Zaps with non-overlapping filters.

## See Also

- [Zapier (overview)](../zapier) — the B1 side of every Zapier recipe
- [Subsplash](./subsplash) — another donation platform with a Zapier app
- [Mailchimp](./mailchimp) — chain "new gift" into an email tag
