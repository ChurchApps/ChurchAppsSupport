---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

If you use Subsplash for your church app, giving, or forms but want B1 as the system of record for people and donations, Subsplash's Zapier app can pipe donations, new profiles, and form responses into B1 in real time. Note that Subsplash's Zapier app is currently **triggers-only** — the wiring is one-way (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A Subsplash account on a plan that includes **API + Zapier** access (check with your Subsplash Client Success Manager — these gate behind plan tier)
- A [Zapier](https://zapier.com) account
- A B1Admin user with **Edit Settings** permission

</div>

## What You Can Wire Up

All triggers below are Subsplash's. The actions are B1's.

| Subsplash trigger | B1 action |
|---|---|
| New Donation | Find Person → Add Donation (Create Person if missing) |
| New Pledge | Add Donation (with `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (no direct B1 action — log to a Google Sheet for manual review) |
| New Form Response | Create Person + (optionally) Add Group Member based on the form |

Subsplash → B1 is the only direction Subsplash's app supports right now.

## Setup

### 1. Mint a B1 API key

In B1Admin: **Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read` — to look up the donor by email
- `people:write` — to create them if they don't exist
- `donations:write` — to record the gift
- (No `settings:write` needed — Subsplash, not B1, owns the trigger here.)

### 2. Connect Subsplash to Zapier

Follow [Subsplash's Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration). They issue an API token from inside the Subsplash Dashboard that Zapier uses to authenticate the trigger side.

### 3. Build the "record a donation" Zap

1. **Trigger** — Subsplash: New Donation
2. **Action** — B1.church: Find Person (by email)
3. **Filter / Path** — branch on "person found":
   - **Found:** B1.church: Add Donation. Map amount, date, fund, method = "Online", notes = Subsplash transaction id.
   - **Not found:** B1.church: Create Person → B1.church: Add Donation (using the newly created person's id).

Turn the Zap on. Future Subsplash donations flow into **B1Admin → Donations** within seconds.

## Common Recipes

### Send a thank-you when a first-time gift lands

- **Trigger** — Subsplash: New Donation
- **Action** — Filter by Zapier: only continue if it's the donor's first gift (use a *Lookup Table* on Donor Email against a Google Sheet of past givers, or a Zapier *Paths* step on the donor created date)
- **Action** — Mailchimp / SMTP / SendGrid: send first-gift thank-you message
- **Action** — B1.church: Add Donation (as usual)

### Filter pledges off the regular giving flow

- **Trigger** — Subsplash: New Pledge
- **Action** — B1.church: Add Donation with `notes = "Pledge — Subsplash"` and a fund called `Pledges` (separate from your operating fund) so you can report on pledges independently in **B1Admin → Donations → Reports**.

### Sync new app users as B1 people

- **Trigger** — Subsplash: New Person Created
- **Action** — B1.church: Create Person, populating name, email, phone. Tag in B1 by adding the new person to a group like "Subsplash App Users".

## Limits & Notes

- **Subsplash's Zapier app is triggers-only.** If you want B1-side changes (e.g. a new B1 person to land in Subsplash too), you'd need to build that bridge from B1's Zapier app triggers calling Subsplash's REST API via a custom *Webhooks by Zapier — POST* action. That's a custom integration, not a recipe.
- **API access is plan-gated.** If Zapier connection fails with `403 Forbidden`, your Subsplash plan likely doesn't include API access — contact your Client Success Manager.
- **Fund mapping is manual.** Subsplash passes a campaign or category name; B1 needs a numeric fund id. Either hard-code the fund in the Zap or maintain a Zapier *Lookup Table* mapping Subsplash campaigns to B1 funds.

## Troubleshooting

- **No trigger fires after a donation** — verify in Subsplash's Zapier dashboard that the connection still shows *Connected*. If the API token was rotated on the Subsplash side, the Zap silently stops; reconnect.
- **B1 *Add Donation* fails with 422** — most often a missing or unrecognised `fundId`. List your funds via **B1Admin → Donations → Funds** and copy the exact id into the Zap step.
- **First gift triggers twice** — Subsplash occasionally re-delivers a trigger if Zapier missed its ack. Add a *Filter by Zapier* on the donation id (Subsplash sends one in the payload) to drop duplicates.

## See Also

- [Donorbox](./donorbox) — same recipe shape, different donation platform
- [Zapier (overview)](../zapier) — B1 side of every Zapier recipe
- [Subsplash Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash's docs)
