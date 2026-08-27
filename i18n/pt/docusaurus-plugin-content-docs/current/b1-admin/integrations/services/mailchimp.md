---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Keep a Mailchimp audience in sync with B1 automatically: people flow in with their name, email, and phone; group and list membership becomes Mailchimp tags; deleted people are archived. The sync is built into B1 — no third-party service, no per-task metering, and changes arrive in near-realtime rather than on a nightly schedule.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [Mailchimp](https://mailchimp.com) account with the audience you want B1 to manage
- A Mailchimp **API key** (Mailchimp: profile icon → **Account & billing → Extras → API keys**)
- Your **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- A B1Admin user with **Edit Settings** permission

</div>

## What Syncs

| B1 change | Mailchimp effect |
|---|---|
| Person added or updated | Subscriber added/updated (first name, last name, phone; new subscribers arrive as `subscribed`) |
| Person deleted (or GDPR-erased) | Subscriber archived |
| Person joins a group | Tag named after the group added |
| Person leaves a group | That tag removed |
| Person enters a saved list | Tag named after the list added |
| Person leaves a saved list | That tag removed |

**Saved lists are usually the better tag source.** A B1 [saved list](/docs/b1-admin/people/lists) is a rule-based audience that re-evaluates itself — "everyone at the North campus," "members who opted into pastoral emails." Point your Mailchimp segments at list tags and the sync maintains them; use group tags for ministry-team mailings.

The sync is **one-way** (B1 → Mailchimp) and only touches Mailchimp's standard fields, so it can't conflict with merge fields or segments you manage inside Mailchimp.

## Configuração

1. In B1Admin go to **Settings → Developer → Webhooks → Add Webhook**.
2. Set **Connector Type** to **Mailchimp**.
3. Paste your **Mailchimp API Key** and **Audience ID**. The key is stored encrypted and never shown again.
4. The relevant events are pre-selected; uncheck any you don't want (e.g. leave person events on but skip group tags).
5. Save. B1 verifies the key and audience against Mailchimp before accepting — a typo fails immediately with a reason.

Use **Send Test** at any time to re-verify the connection. Every sync attempt is logged in the webhook's delivery history with Mailchimp's actual response, and failed deliveries retry automatically with backoff for about five days.

## Initial Import

The connector syncs *changes* from the moment it's on; it doesn't backfill your existing directory. For setup day:

1. In B1Admin go to **People**, search for the people you want (or run a saved list), and click **Export** to download a CSV.
2. In Mailchimp use **Audience → Import contacts** to load the CSV, applying any tags during import.

Doing the initial load through Mailchimp's importer keeps you in control of the consent question — only import people who have actually agreed to receive your emails. Bulk-importing a whole directory as subscribed contacts can violate Mailchimp's terms and anti-spam law (CAN-SPAM/GDPR).

## Limits & Notes

- **One-way sync.** Unsubscribes, bounces, and edits made in Mailchimp do not flow back to B1. Someone who unsubscribes in Mailchimp can still receive email sent directly from B1 — treat Mailchimp as the source of truth for bulk-mail consent.
- **People without an email address are skipped** (logged as such in the delivery history) — Mailchimp subscribers are keyed by email.
- **Email address changes create a new subscriber.** Mailchimp identifies people by email, so changing someone's email in B1 adds them under the new address; the old subscriber stays until you archive it in Mailchimp.
- **Only standard fields sync** — first name, last name, phone. Membership status, campus, and custom B1 fields don't map to Mailchimp merge fields in this version; use list tags to segment instead.
- **Tag names are the group/list names.** Renaming a group or list starts tagging under the new name; the old tag remains on existing subscribers until removed in Mailchimp.
- **Mailchimp's contact limits still apply** — a sync that pushes a free-tier audience past its cap will log `Member limit reached` errors in the delivery history.

## Other Recipes (Zapier / Make)

Anything beyond audience sync — tagging givers on `donation.created`, a Mailchimp → B1 reverse direction, or syncing to a different email platform entirely (Constant Contact, Brevo, etc.) — is still available through [Zapier](../zapier) or [Make](../make), which trigger on the same webhook events:

- **Tag givers:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Two-way:** Mailchimp *New Subscriber* → B1 *Create Person*

If you previously wired person/group sync through Zapier, switch those Zaps off after enabling the native connector — running both double-processes every event and burns Zapier tasks for nothing.

## Solução de Problemas

- **Save fails with "Mailchimp rejected the API key"** — the key was revoked or mistyped. Keys must end in a data-center suffix like `-us21`.
- **Save fails with "audience not found"** — the Audience ID doesn't exist under that account. Copy it from **Audience → Settings → Audience name and defaults** (it's not the audience's name).
- **A person never appeared in Mailchimp** — check the webhook's delivery history. "Skipped: person has no email address" means exactly that; a `4xx` from Mailchimp shows the reason in the response body.
- **Deliveries stopped entirely** — after repeated exhausted deliveries the webhook auto-disables. Fix the cause (usually a revoked key), re-enable it, and use **Send Test** to confirm.

## See Also

- [Webhooks (developer reference)](/docs/developer/api/webhooks) — the engine underneath, event catalog, delivery/retry semantics
- [Saved Lists](/docs/b1-admin/people/lists) — rule-based audiences that map naturally onto Mailchimp tags
- [Zapier (overview)](../zapier) — for recipes beyond audience sync
