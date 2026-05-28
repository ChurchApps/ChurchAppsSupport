---
title: "Integrations"
---

# Integrations

<div class="article-intro">

B1 plugs into the tools your team already uses. Connect Slack or Discord for staff notifications, automate workflows in Zapier or Make, or export data on demand to Google Sheets — without paying for a separate integration platform and without ChurchApps hosting anything extra. Every integration runs on the third party's own infrastructure and talks to your church through B1's webhooks or REST API.

</div>

## What's Available

| Integration | What it does | Direction | Effort to set up |
|---|---|---|---|
| **[Slack](./slack-discord)** | Post readable notifications (new people, donations, sign-ups, …) to a Slack channel | B1 → Slack | 2 minutes |
| **[Discord](./slack-discord)** | Same, in a Discord channel | B1 → Discord | 2 minutes |
| **[Zapier](./zapier)** | Use B1 events as triggers and B1 actions in any of Zapier's 7,000+ apps | Both | 5–10 min per Zap |
| **[Make](./make)** | Same idea as Zapier, in Make's visual scenario builder | Both | 5–10 min per scenario |
| **[Google Sheets](./google-sheets)** | Export People / Donations / Groups / Attendance to a spreadsheet on demand | B1 → Sheet | 5 minutes |
| **[Claude](./claude)** | Ask Anthropic's Claude questions about your church data, scoped to your permissions | Both | 5 minutes |
| **[ChatGPT](./chatgpt)** | Same idea with OpenAI's ChatGPT, via a Custom GPT or MCP-aware OpenAI tooling | Both | 10 minutes |
| **[Connected services](./services/)** | Curated recipes for Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varies | 5–10 min each |

## How to Pick

- **Just want a notification in chat?** Use **Slack** or **Discord** — no third-party account, no Zap to maintain. Configured entirely inside B1Admin.
- **Want to automate something across apps** (e.g. "when someone gives, add them to my Mailchimp list and Slack #donations")? Use **Zapier** or **Make**. Zapier is friendlier; Make is cheaper at scale and has more flexible logic.
- **Need a one-off data pull or a scheduled report**? Use **Google Sheets** — paste an API key into the add-on's sidebar and click Export.
- **Want to ask questions in plain English** ("how many first-time visitors last Sunday?", "summarize giving this month")? Use **[Claude](./claude)** or **[ChatGPT](./chatgpt)** — both connect to B1 with a single API key.
- **Building your own custom integration?** None of the above — talk to the [REST API](/docs/developer/api) directly with an [API key](/docs/developer/api/api-keys), or subscribe a server you control to [webhooks](/docs/developer/api/webhooks).

## What They Have In Common

Every integration authenticates with a **B1 API key**, created in B1Admin under **Settings → Developer → API Keys**. The key:

- Is bound to a specific person in your church and inherits that person's permissions
- Can be narrowed with **scopes** — for example a Google Sheets export only needs `people:read`, not `settings:write`
- Can be revoked at any time, instantly cutting the integration's access without affecting anything else

A few connectors (Zapier, Make) also register a [webhook](/docs/developer/api/webhooks) on your behalf when the Zap or scenario is turned on, and remove it when you turn the Zap off — you don't manage the webhook URL yourself.

:::tip
For Zapier and Make to register webhooks automatically, the API key needs the **`settings:write`** scope (plus the resource scopes for whatever the integration touches). A read-only key works for actions and exports but not for triggers.
:::

## Cost

ChurchApps is free and open-source. Slack/Discord, the [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), and the official Zapier / Make / Google Sheets connectors are also free from our side. The third parties may charge for their own platforms (Zapier and Make both have generous free tiers; Slack, Discord, and Google Sheets are free for this purpose).

## Building Your Own

If none of the above fits, every B1 surface is open:

- **[REST API](/docs/developer/api)** — call B1 from any language with an `Authorization: Bearer cak_…` header
- **[Webhooks](/docs/developer/api/webhooks)** — subscribe a public HTTPS endpoint to one or more event types and receive signed JSON payloads
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — if you're building a SaaS product used by many churches

## Next Steps

- [Slack & Discord](./slack-discord) — post chat notifications
- [Zapier](./zapier) — connect to 7,000+ apps
- [Make](./make) — visual workflow automation
- [Google Sheets](./google-sheets) — export to spreadsheets
- [Claude](./claude) — ask Anthropic's Claude about your church data
- [ChatGPT](./chatgpt) — ask OpenAI's ChatGPT about your church data
- [Connected services](./services/) — per-service recipes (Mailchimp, Donorbox, Clearstream, …)
