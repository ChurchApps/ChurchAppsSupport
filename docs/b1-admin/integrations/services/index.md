---
title: "Connected Services"
---

# Connected Services

<div class="article-intro">

The fastest way to connect B1 to another church-tech tool is usually a Zapier or Make recipe — you don't need new B1 infrastructure, and the third party hosts the workflow. This page is a curated list of services we've confirmed are wireable today, with a short, copy-paste setup guide for each.

</div>

## At a Glance

| Service | Category | Bridge | What you can wire |
|---|---|---|---|
| [Mailchimp](./mailchimp) | Email | Zapier or Make | Sync new B1 people / givers into a Mailchimp audience |
| [Donorbox](./donorbox) | Donations | Zapier | Push Donorbox donations and donors back into B1 |
| [Subsplash](./subsplash) | App / Donations | Zapier | Pull Subsplash giving and people into B1 |
| [VOMO](./vomo) | Volunteering | Zapier | Sync volunteer signups between B1 groups and VOMO projects |
| [Clearstream](./clearstream) | SMS | Zapier | Trigger a Clearstream text from B1 events; ingest replies as B1 records |
| [Text In Church](./text-in-church) | SMS / Workflows | Zapier | Trigger Text In Church workflows from B1; receive Connect Card data |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier or Make | Send SMS from any B1 event |
| [Checkr](./checkr) | Background checks | Make | Kick off a background check when someone joins a serving team |

## What All Of These Have In Common

1. **B1 side of the wiring is identical** — create an API key with the right scopes in **B1Admin → Settings → Developer → API Keys**, then either let the bridge register a webhook for the trigger (Zapier / Make do this automatically, requires `settings:write`) or call B1's REST endpoints from a downstream action.
2. **The bridge bills you, not us.** ChurchApps is free; Zapier and Make both have free tiers that cover a handful of recipes.
3. **You can test the wiring without going live.** Both bridges have a "Test step" button that fires the trigger once against B1 and shows you the data shape before you turn the recipe on.

## Picking a Bridge

- **Zapier** is friendlier and has the larger app catalogue — use it as your default unless cost is an issue.
- **Make** is cheaper at scale and has more flexible routing/filter logic — use it when a single workflow has fan-out, conditionals, or many steps.
- **Webhooks by Zapier** (used for the Mobile Message doc) is a generic adapter that lets you POST to any HTTP endpoint from a Zap when the destination isn't a first-class Zapier app.

If you want something not on this list, B1's [REST API](/docs/developer/api) and [webhooks](/docs/developer/api/webhooks) are open — you can build a one-off bridge with the [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) in a few hours.

## What's Not Here (and Why)

Several popular church-tech tools — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — don't have a published Zapier app or Make module today. They have their own APIs but wiring them up to B1 is a custom-code job, not a recipe, so they don't fit this list. If a vendor adds a Zapier app or Make module, we'll add the doc.

We've also deliberately skipped Planning Center-Services-specific tools (music, presentation), competing ChMS products, migration consultants, and tools that only clean up PCO-specific data — none of them have a useful wiring path into B1.

## See Also

- [Zapier (overview)](../zapier) — the B1 side of every Zapier recipe is identical; this doc covers it once
- [Make (overview)](../make) — same for Make scenarios
- [Slack & Discord](../slack-discord) — chat notifications without any bridge
- [Google Sheets](../google-sheets) — on-demand exports
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — the event catalog every recipe relies on
