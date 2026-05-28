---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Trigger a [Clearstream](https://clearstream.io) text message from any B1 event — new person, new gift, form submission, calendar update — and pull replies back as B1 records. Clearstream's Zapier app exposes both directions, so the whole wiring is a recipe and not custom code.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [Clearstream](https://clearstream.io) account with at least one list and an SMS allowance
- A [Zapier](https://zapier.com) account
- A B1Admin user with **Edit Settings** permission

</div>

## What You Can Wire Up

| Direction | Trigger | Action |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (e.g. notify the finance team) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (e.g. prayer request team) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; tag with the keyword they texted |

Clearstream's Zapier actions: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Setup

### 1. Mint a B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — required for B1 to register the trigger webhook
- `people:read` — needed to look up the person from the event (`personId` → name/phone/email)
- (Optional) `people:write` if Clearstream replies should create B1 contacts

### 2. Build the "text on new gift" Zap

1. **Trigger** — B1.church: New Donation
2. **Action** — B1.church: Find Person (the donation's `personId`)
3. **Action** — Clearstream: Send Text to Number. Use the person's phone from step 2 as the recipient, compose the message (`"Thanks for your gift, {first}! …"`).

Turn the Zap on. B1 registers the donation webhook on activation; you'll see `Zapier — donation.created` appear in **Settings → Developer → Webhooks**.

### 3. (Optional) Pull replies back as B1 records

1. **Trigger** — Clearstream: New Incoming Text
2. **Action** — Filter by Zapier on the keyword — e.g. only continue if the text body starts with `PRAY`
3. **Action** — B1.church: Find Person (by phone)
4. **Action** — Filter / Path — if not found, create them; either way, file the text body somewhere (Slack, Google Sheet, or a B1 form submission via Webhooks by Zapier).

## Common Recipes

### Volunteer team paging

- **Trigger** — B1.church: New Form Submission (filtered on the prayer-request form id)
- **Action** — Clearstream: Send Text to List, where the list is your on-call pastoral team. Compose the body as `New prayer request: {data.questions.0.answer}`.

### First-time visitor follow-up sequence

- **Trigger** — B1.church: New Person, filtered on a B1 person tag of "First-time visitor"
- **Action** — Clearstream: Add Subscriber to Automated Workflow. Map the workflow id to a pre-built 7-day text drip.

### Keyword-driven group join

- **Trigger** — Clearstream: New Incoming Text (filter to keyword `MENS`)
- **Action** — B1.church: Find Person (by phone); fork on not-found → Create Person
- **Action** — B1.church: Add Group Member to the Men's Ministry group

## Limits & Notes

- **Clearstream meters SMS by message.** Every Send Text action consumes one or more credits depending on length and number of recipients — check your plan's allowance.
- **Phone must be in E.164 format** (e.g. `+15555550199`) for *Send Text to Number*. B1's person record stores whatever was entered; use a *Formatter by Zapier — Numbers → Format Phone Number* step if you can't guarantee the format.
- **No header is required from B1's side** — Clearstream's auth lives entirely inside its Zapier connection.

## Troubleshooting

- **Trigger never fires** — `Settings → Developer → Webhooks` should show a `Zapier — <event>` row after the Zap is turned on. If not, the B1 API key is missing `settings:write`. Re-mint and re-connect.
- **Clearstream returns "Invalid phone number"** — the recipient field isn't in E.164. Add a Format Phone Number step.
- **Send Text to List fails with `403`** — the Clearstream API user lacks permission for that list, or the list id is wrong. List ids are visible on the Clearstream list detail page.

## See Also

- [Text In Church](./text-in-church) — alternative SMS platform, similar wiring shape
- [Mobile Message](./mobile-message) — for churches outside the US
- [Zapier (overview)](../zapier) — B1 side of every Zapier recipe
- [Clearstream API docs](https://api-docs.clearstream.io/) — for custom integrations beyond the Zapier app
