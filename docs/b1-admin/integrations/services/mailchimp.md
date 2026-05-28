---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Pipe new B1 people, givers, or group members into a Mailchimp audience so the next welcome series, year-end appeal, or volunteer newsletter pulls from a list that's always up to date. The wiring lives entirely in Zapier (or Make) — B1 fires the event, Mailchimp ingests the subscriber.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [Mailchimp](https://mailchimp.com) account with at least one audience you want B1 people pushed into
- A [Zapier](https://zapier.com) account (the free tier covers small churches)
- A B1Admin user with **Edit Settings** permission so you can mint an API key

</div>

## What You Can Wire Up

| Direction | B1 trigger | Mailchimp action |
|---|---|---|
| B1 → Mailchimp | `person.created` | Add/Update Subscriber |
| B1 → Mailchimp | `donation.created` | Add Subscriber to Tag (e.g. "Gave in 2026") |
| B1 → Mailchimp | `group.member.added` | Add Subscriber to Tag scoped to that group |
| Mailchimp → B1 | New Subscriber | B1 *Create Person* |

The Mailchimp side exposes lots more (campaigns, segments, automations) — see [Mailchimp's Zapier triggers](https://zapier.com/apps/mailchimp/integrations) for the full list. Anything mappable from the B1 envelope is fair game.

## Setup

### 1. Mint a B1 API key

In B1Admin go to **Settings → Developer → API Keys → New API Key**. Give it the scopes the Zap needs:

- `settings:write` — required for the trigger to register its webhook
- `people:read` — so the Zap can read first/last name, email, etc.
- (Optional) `people:write` if you also plan a Mailchimp → B1 direction

Save and copy the `cak_…` string — it's only shown once.

### 2. Build the Zap

1. **Trigger:** `B1.church — New Person`. On first use Zapier asks you to *Sign in to B1.church*; paste the API key.
2. **Action:** `Mailchimp — Add/Update Subscriber`. Map the trigger output:
   - `data.contactInfo.email` → Email Address
   - `data.name.first` → First Name
   - `data.name.last` → Last Name
   - (Optional) `data.id` → a Mailchimp merge field if you want to keep B1's person id alongside.
3. Turn the Zap on. Zapier registers a `person.created` webhook on B1 — verify in **Settings → Developer → Webhooks** that a row named "Zapier — person.created" appears.

That's it. Add a person in B1Admin to confirm — the new subscriber shows up in Mailchimp within seconds.

## Common Recipes

### Tag givers automatically

- **Trigger** — B1: New Donation
- **Action** — B1: Find Person (lookup by `personId`) to get the email
- **Action** — Mailchimp: Add Subscriber to Tag (tag `Gave-2026`)

### Drop a group-specific welcome series

- **Trigger** — B1: New Group Member, filtered by `data.groupId`
- **Action** — Mailchimp: Add Subscriber to Tag named after the group; trigger your existing automation off that tag

### Two-way: new Mailchimp signups become B1 contacts

- **Trigger** — Mailchimp: New Subscriber
- **Action** — B1: Create Person (map First/Last/Email)

## Make Alternative

Make's [Mailchimp app](https://www.make.com/en/integrations/mailchimp) covers 44 modules — the wiring is identical, with the B1 *Watch Events* trigger replacing Zapier's. See the [Make overview doc](../make) for the B1 side.

## Limits & Notes

- **Mailchimp's free tier caps contacts and audiences** — a Zap that floods a free audience past its limit will start erroring with `4xx Member limit reached`. Mailchimp's logs make this obvious.
- **Mailchimp deduplicates by email**, so re-running a Zap on the same B1 person updates them in place; it doesn't create duplicates.
- **Unsubscribes from Mailchimp don't flow back to B1.** If you want Mailchimp unsubscribes to clear B1's "Send Mail" preference, build the reverse Zap explicitly.

## Troubleshooting

- **Zap never fires** — check `Settings → Developer → Webhooks` for the `Zapier — person.created` row. If absent, the API key was missing `settings:write` when the Zap turned on. Re-mint, re-connect, toggle the Zap off and on.
- **`Member exists` warning on Add/Update** — switch the action from *Add Subscriber* to *Add/Update Subscriber* (the verb matters). The upsert variant is idempotent.
- **First name / last name come through blank** — B1's `data.name.first` and `data.name.last` are only populated if those fields are set on the person. Map `data.name.display` as a fallback.

## See Also

- [Zapier (overview)](../zapier) — the B1 side of every Zapier recipe
- [Make (overview)](../make) — same idea, visual builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks#event-catalog)
