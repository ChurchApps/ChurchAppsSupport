---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (formerly Integromat) is a visual workflow automation platform — similar in spirit to Zapier, with more flexible logic and a cheaper bill at scale. The official B1.church Make app lets you build "scenarios" that react instantly to B1 events and write records back to B1.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [Make](https://www.make.com) account (the free tier covers small workflows)
- A church admin with the **Edit Settings** permission in B1Admin
- A rough idea of the scenario you want to build

</div>

## Modules

| Type | What | B1 event / endpoint |
|---|---|---|
| **Instant Trigger** | Watch Events | any subscribed B1 event (`person.created`, `donation.created`, …) |
| **Action** | Create Person | adds a new person |
| **Action** | Add Donation | records a donation |
| **Action** | Add Group Member | adds a person to a group |
| **Search** | Search People | finds people by name or email |

The instant trigger lets you pick which event to listen for — one trigger module per scenario, configured per event.

## Setup

### 1. Create a B1 API key

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, name it "Make", and grant the scopes you need.
3. **Include `settings:write`** if any of your scenarios use the instant trigger — Make registers a webhook on your behalf when the scenario turns on.
4. Also grant the scopes the action modules need (e.g. `donations:write` for the Add Donation module).
5. Save and copy the `cak_…` key.

### 2. Install the connection

1. In Make, build a new scenario and drop the **B1.church** trigger module onto the canvas.
2. When prompted, **Create a connection**. Paste the API key into the *API Key* field and leave *API Base URL* as `https://api.churchapps.org` (unless you're testing against staging).
3. Click **Save** — Make tests the key by reading your church profile.

The connection is saved on your Make account and reused across scenarios.

### 3. Configure the trigger

1. Open the **Watch Events** module's settings.
2. Pick the event you want — e.g. `donation.created`.
3. Save. Make generates a unique webhook URL and stores it internally.

### 4. Add downstream modules

Drop any of Make's hundreds of app modules onto the canvas — Mailchimp, Google Sheets, Slack, HubSpot, your own HTTP endpoint, etc. Map the trigger's output (`event`, `churchId`, `data.id`, `data.amount`, …) into their input fields. Make's flatten / iterator / router / aggregator modules let you build branching and parallel flows that would be hard in Zapier.

### 5. Turn the scenario on

Toggle **Active** in the scenario header. Make calls B1's `POST /membership/webhooks` to register the URL. From that moment, every matching B1 event flows through the scenario in real time.

Turning the scenario off calls `DELETE /membership/webhooks/{id}` so there are no orphan subscriptions.

## Common Recipes

### Sync donations to a Google Sheet for finance review

- **Trigger** — B1: Watch Events (`donation.created`)
- **Action** — Google Sheets: Add a Row. Map `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` into the sheet's columns.

### Conditional Slack notification by donation amount

- **Trigger** — B1: Watch Events (`donation.created`)
- **Router**:
  - Branch A — Filter: `data.amount >= 1000` → Slack: post to `#major-gifts`
  - Branch B — fallthrough → Slack: post to `#donations`

### New person → CRM + welcome email + Slack

- **Trigger** — B1: Watch Events (`person.created`)
- **Action** — HubSpot: Create Contact
- **Action** — Mailgun: Send Welcome Email
- **Action** — Slack: Notify `#new-people` (in parallel — use Make's router)

## How the Instant Trigger Works

The instant trigger is webhook-backed, not polling — when activated, Make calls `POST /membership/webhooks` with its generated URL and the event you chose. When the event fires in B1, B1 POSTs the envelope to Make's URL and your scenario runs within seconds. Deactivating the scenario removes the webhook.

The trigger only fires for events that happen **while the scenario is active**. There's no backfill.

## Limits & Notes

- **One event per Watch Events module.** To listen for several events in one scenario, drop multiple trigger modules into separate scenarios (or use a single module with the unioned event list — see below).
- **Signature verification is not exposed** — Make doesn't pass `X-B1-Signature` through to the scenario; the trust boundary is Make's unguessable per-scenario webhook URL. This is normal Make practice. If you need explicit signature checks, build a custom integration with the [SDK](/docs/developer/api/webhooks#sdk-support) instead.
- **Operation count** — every API call from an action module counts against your Make operations quota, not against anything on B1's side.

## Troubleshooting

- **Connection test fails** — most often a typo in the API key. Re-copy it from B1Admin (the full key is only shown once; if you've lost it, create a new key).
- **Trigger module doesn't activate** — check **Settings → Developer → Webhooks** in B1Admin. If you don't see a "Make — &lt;event&gt;" row after activating the scenario, the key is missing `settings:write`. Update the key and reactivate.
- **Action returns `403 Forbidden`** — the API key lacks the scope for that endpoint. For example, Add Donation needs `donations:write`. Update the key in B1Admin and re-test.

## Customising the App

The B1.church Make app is open source — the JSON definitions live in the `B1Integrations/Make/` repo. If you need a module that doesn't exist (e.g. a new action for an endpoint we haven't covered), open an issue or PR there.

## See Also

- [Zapier](./zapier) — same pattern with a simpler UI and a larger app catalog
- [Slack & Discord](./slack-discord) — built-in chat notifications without Make
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
