---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO is a volunteer engagement platform — people sign up for projects, check in at the kiosk, and accumulate hours. If you use VOMO for volunteer scheduling but B1 for people records, Zapier can sync membership and check-ins between them so neither side drifts.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [VOMO](https://vomo.org) account on a plan that exposes Zapier (check with VOMO support if unsure)
- A [Zapier](https://zapier.com) account
- A B1Admin user with **Edit Settings** permission

</div>

## What You Can Wire Up

VOMO's Zapier app exposes four instant triggers and four actions. The recipes most churches want:

| Direction | Trigger | Action |
|---|---|---|
| VOMO → B1 | VOMO Membership (created) | B1: Find Person → Create Person (if new) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member to a "Currently Serving" group, or record as attendance |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (by email); else custom step |
| Either | VOMO Participation (signups) | B1: Add Group Member to project-specific group |

The VOMO actions are limited to **drafting projects** and **finding** existing organizers/projects — there's no "add this person to a VOMO project" action today. The interesting wiring is mostly VOMO → B1.

## Setup

### 1. Mint a B1 API key

**Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read`, `people:write` — to look up and create volunteers as B1 people
- `groups:write` — to add them to serving-team groups
- (Optional) `attendance:write` if you treat kiosk check-ins as attendance

### 2. Build the membership-sync Zap

1. **Trigger** — VOMO: Membership (event = `created`).
2. **Action** — B1.church: Find Person, matched on email.
3. **Filter / Path** — fork on found vs. not found:
   - Not found → B1.church: Create Person, then Add Group Member to the appropriate volunteer group.
   - Found → B1.church: Add Group Member directly.
4. Turn on. New VOMO volunteers now appear in B1 with the right group membership.

### 3. (Optional) Build the kiosk-check-in Zap

1. **Trigger** — VOMO: Kiosk
2. **Action** — B1.church: Find Person (by email)
3. **Action** — your choice:
   - *If treating as attendance* — Webhooks by Zapier POST to B1's `/attendance/visits` endpoint (B1's Zapier app doesn't yet have a first-class *Record Attendance* action). The B1 [API key](/docs/developer/api/api-keys) goes in the `Authorization: Bearer cak_…` header.
   - *If treating as group membership* — B1.church: Add Group Member with a "Currently Serving (Today)" group, and a second Zap later in the day removes them via a scheduled cleanup.

## Common Recipes

### Per-project group sync

- **Trigger** — VOMO: Participation (created)
- **Action** — Filter by Zapier on project id, then
- **Action** — B1.church: Add Group Member to a B1 group whose name mirrors the VOMO project.

When the VOMO project ends, manually clear the B1 group (or pair this with a *Participation deleted* trigger that removes them).

### Send a "thanks for signing up" text via SMS

Chain VOMO Participation → Clearstream Send Text or Text In Church Send Message in the same Zap. Both have first-class Zapier actions — see [Clearstream](./clearstream) and [Text In Church](./text-in-church).

### Detect drop-off

Run a daily Zapier *Schedule* trigger that calls Find Organizer in VOMO for a list of B1 people who joined the serving team this month — if VOMO returns "not found", they didn't activate VOMO and need a nudge.

## Limits & Notes

- **Email is the join key.** VOMO's payloads expose a user email but no B1 person id. Donors who use different emails in each system will create duplicates.
- **No "Add to Project" action in VOMO's Zapier app today.** If you need B1 → VOMO project enrollment, you'd POST to VOMO's REST API from a *Webhooks by Zapier* step, which is a custom integration.
- **VOMO's free / lower tiers may not include Zapier.** Confirm with VOMO support before promising a wiring date.

## Troubleshooting

- **Trigger never fires** — VOMO's instant triggers require the API token to remain valid. Re-test the Zap; reconnect VOMO if the token was rotated.
- **B1 *Add Group Member* fails with 422** — the group id in the action doesn't exist. Open **B1Admin → Groups**, click the group, and copy the URL's id segment into the Zap step.
- **Duplicate B1 people from a single VOMO volunteer** — they probably signed up under a different email than they already had in B1. Either standardise emails, or add a Zapier *Path* that also searches by phone before creating.

## See Also

- [Zapier (overview)](../zapier) — B1 side of every Zapier recipe
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — pair volunteer signups with SMS confirmations
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — the events VOMO can trigger on
