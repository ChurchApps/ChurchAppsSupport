---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) runs background screening for staff and volunteers — a near-universal need for any church running a children's or youth program. B1 has **no built-in background-check feature** — ordering checks, tracking results, and screening compliance all live in Checkr; the recipe below only wires B1 events to it. Checkr doesn't have a Zapier app, but [Make.com's Checkr integration](https://www.make.com/en/integrations/checkr) is verified and exposes the actions you need to kick off a check from a B1 event.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [Checkr](https://checkr.com) account with API access and at least one screening package configured
- A [Make](https://www.make.com) account
- A B1Admin user with **Edit Settings** permission

</div>

## What You Can Wire Up

Make's Checkr app exposes 1 trigger and 6 actions:

| Direction | B1 / Make trigger | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtered to a volunteer group) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (invitation / report event) | B1: Update the person's record (e.g. tag "Checkr cleared") |

Make's Checkr actions: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Plus 4 search modules.

## Setup

### 1. Mint a B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — for the trigger webhook
- `people:read` — to look up the person's name/email when starting a check
- (Optional) `people:write` if you want to write the report status back as a custom field or tag

### 2. Build the "kick off a check on volunteer signup" scenario in Make

1. **Trigger** — B1.church: Watch Events (`group.member.added`).
2. **Filter** — only continue if `data.groupId` matches your "Children's Volunteers" (or equivalent) group.
3. **Action** — B1.church: Find Person (by `data.personId`) to get email + first/last name.
4. **Action** — Checkr: Create Candidate. Map first/last/email from step 3.
5. **Action** — Checkr: Create Background Check Invitation. Map the new candidate id from step 4 to the *candidate_id* field. Pick the screening package (e.g. `tasker_standard` or whatever your account exposes).
6. (Optional) **Action** — Slack: notify your safe-ministry coordinator that a check has been initiated.

Turn the scenario on. New volunteers in the targeted group get an automatic Checkr invitation by email; they complete it on their phone or laptop; Checkr runs the screen.

### 3. (Optional) Receive the report back

1. **Trigger** — Checkr: Watch Events (webhook). Make registers a Checkr webhook on activation.
2. **Filter** — only continue if `event_type = report.completed`.
3. **Action** — Checkr: Get Report (use the report id from the webhook).
4. **Action** — B1.church: Find Person (by candidate email).
5. **Action** — Conditional Slack / Email: notify the coordinator with `clear` / `consider` / `suspended` status.

Note: B1 doesn't have a built-in "background-check status" field today. The pragmatic options are (a) post the result to a private Slack channel for review, (b) write it to a Google Sheet for audit, or (c) add the person to a "Cleared volunteers" B1 group on `clear`.

## Common Recipes

### Re-screen volunteers every 2 years

Pair the above with a Make schedule trigger:

- **Trigger** — Make: Schedule (monthly)
- **Action** — B1.church: List Group Members for "Cleared volunteers"
- **Action** — Filter by Make: cleared date older than 22 months
- **Action** — Checkr: Create Background Check Invitation (same as the initial flow)

### Block stage 1 access until check completes

If your church uses B1 group membership to gate access (e.g. only "Cleared" group members appear in serving schedules), keep new volunteers in a holding group until the Checkr `report.completed` event flips them.

## Limits & Notes

- **Checkr is US-only** for most screening packages. Australian, UK, and Canadian churches will need an alternative.
- **Pricing** is per check — every Create Invitation in Make burns a real check. Test in Checkr's sandbox / staging account first (Make's Checkr app respects the credentials you pass in the connection, so swapping creds switches sandbox/live).
- **Checkr API access is plan-gated.** Smaller Checkr accounts may be on a UI-only tier; contact Checkr to enable API.

## Troubleshooting

- **Create Candidate fails with `403`** — the Checkr API token is read-only or lacks the right account permissions. Re-issue it from the Checkr dashboard with write scope.
- **Invitation never arrives** — check the candidate's email in step 3; B1 may have an empty email field for that person. Add an email-required filter before the Checkr step.
- **Webhook trigger doesn't fire** — Checkr's webhook registration sometimes silently fails if your Make account isn't on a paid tier that supports outbound webhooks. Verify in Checkr's dashboard *Webhooks* page that Make's URL is listed.

## See Also

- [Make (overview)](../make) — B1 side of every Make scenario
- [Mobile Message](./mobile-message) — for SMS-providers-without-Zapier-apps, same Webhooks/HTTP pattern as the Checkr Make wiring
- [Checkr API docs](https://docs.checkr.com/)
