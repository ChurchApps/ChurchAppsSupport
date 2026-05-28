---
title: "Zapier"
---

# Zapier

<div class="article-intro">

The official B1.church app on Zapier lets a Zap react to events in your church (new person, new donation, new group member, …) and write records back to B1. No coding, no infrastructure — you wire it up in Zapier's drag-and-drop editor, paste an API key, and turn the Zap on.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [Zapier](https://zapier.com) account (the free tier is enough for a handful of Zaps)
- A church admin with the **Edit Settings** permission in B1Admin (you'll create an API key)
- An idea of what you want to do — e.g. "when a person is added in B1, add them to my Mailchimp list"

</div>

## Triggers and Actions

| Type | What | B1 event / endpoint |
|---|---|---|
| **Trigger** | New Person | `person.created` |
| **Trigger** | Updated Person | `person.updated` |
| **Trigger** | New Donation | `donation.created` |
| **Trigger** | New Group Member | `group.member.added` |
| **Trigger** | New Form Submission | `form.submission.created` |
| **Action** | Create Person | adds a new person |
| **Action** | Add Donation | records a donation |
| **Action** | Add Group Member | adds a person to a group |
| **Search** | Find Person | looks up a person by name or email |

Combine these freely with any of Zapier's 7,000+ supported apps.

## Setup

### 1. Create a B1 API key

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, give it a name like "Zapier", and select the scopes the Zap needs.
3. **Important:** Zapier triggers register a webhook on your behalf when the Zap turns on, which requires the **`settings:write`** scope. Always include `settings:write` if any of your Zaps use a B1 trigger.
4. Also grant the scopes the actions need — for example a "Add Donation" action needs `donations:write`, "Create Person" needs `people:write`.
5. Save. The full `cak_…` key is shown **once** — copy it.

### 2. Connect Zapier to B1

1. In Zapier, build a new Zap.
2. When you pick a B1 trigger or action for the first time, Zapier asks you to **Sign in to B1.church**.
3. Paste the API key from step 1 and click **Yes, Continue**. Zapier validates it against your church.

The connection is saved in Zapier and reused by every Zap on your account.

### 3. Build the Zap

Pick a trigger, then add one or more action steps. Examples below.

## Common Recipes

### Add new B1 people to Mailchimp

- **Trigger** — B1: New Person
- **Action** — Mailchimp: Add/Update Subscriber. Map B1's `name__first`, `name__last`, `contactInfo__email` into Mailchimp's First Name / Last Name / Email fields.

### Post donations to a Slack channel with a richer card than the built-in connector

- **Trigger** — B1: New Donation
- **Action** — Slack: Send Channel Message. Compose any layout — buttons, attachments, etc. — that the built-in [Slack connector](./slack-discord) can't.

### Add new group members to a Google Group

- **Trigger** — B1: New Group Member (filtered to a specific `groupId`)
- **Action** — Filter by Zapier: only continue if the B1 group is the one you care about
- **Action** — B1: Find Person (use the trigger's `personId` to fetch the email)
- **Action** — Google Groups: Add Member

### Forward form submissions to a project tracker

- **Trigger** — B1: New Form Submission
- **Action** — Notion / Linear / Asana / Trello: Create page / issue / task

## How Triggers Work Under the Hood

Triggers are **REST hooks**, not polling — Zapier doesn't ping B1 every 15 minutes. When you turn the Zap on, Zapier asks B1 to register a webhook pointing at a private Zapier URL; when the event fires, B1 POSTs the envelope to Zapier and your Zap kicks off **within seconds**. Turn the Zap off and Zapier asks B1 to delete the webhook — no orphan subscriptions.

This means the trigger only fires for events that happen **after** the Zap is turned on. There is no backfill — turning a Zap on does not replay yesterday's donations.

## Limits & Notes

- **Multiple Zaps with the same trigger** each register their own B1 webhook — there's no conflict, but it's worth knowing if you're inspecting **Settings → Developer → Webhooks** and wondering why three identical `Zapier — donation.created` rows are there.
- **Test data in Zap setup** — when you build a Zap, Zapier asks for sample data to map fields. It will pull the most recent matching event from B1 if there is one; otherwise it uses a synthetic sample from the app definition.
- **Action failures surface as Zap errors** in Zapier's task history. Common cause: an API key without the right scope (e.g. an "Add Donation" action needs `donations:write`). Re-mint the key with the correct scopes and re-connect in Zapier.
- **Outbound API call quotas** — every B1 API call from an action counts toward your Zapier task quota, not toward anything on B1's side.

## Troubleshooting

- **"Authentication failed"** when connecting — the API key is wrong, revoked, or missing the scopes the Zap needs. Re-mint it in B1Admin with at least `settings:write` plus whatever resource scopes the Zap touches, then update the connection.
- **Trigger never fires** — confirm the webhook actually got registered: in B1Admin, **Settings → Developer → Webhooks** should now show a row named "Zapier — &lt;event&gt;". If it's not there, the API key probably lacked `settings:write` when you turned the Zap on. Fix the key, toggle the Zap off and back on.
- **Trigger fires twice** — Zapier occasionally redelivers if its acknowledgement was lost. Use a "Filter by Zapier" step on a unique id (e.g. the person's `id`) if you need strict deduplication.

## See Also

- [Make](./make) — same pattern, different platform
- [Slack & Discord](./slack-discord) — simpler chat notifications without Zapier
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
