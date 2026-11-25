---
title: "Integrations"
description: "Connect B1 Admin to Slack, Discord, Zapier, Mailchimp, and AI assistants like Claude and ChatGPT, with setup steps and the API key scopes each one needs."
---

# Integrations

<div class="article-intro">

B1 plugs into the tools your team already uses. Connect Slack or Discord for staff notifications, automate workflows in Zapier, or ask an AI assistant like Claude about your church data, without paying for a separate integration platform and without ChurchApps hosting anything extra. Every integration runs on the third party's own infrastructure and talks to your church through B1's webhooks or REST API.

</div>

## What's Available

| Integration | What it does | Direction | Effort to set up |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Post readable notifications (new people, donations, sign-ups, …) to a Slack channel | B1 → Slack | 2 minutes |
| **[Discord](./slack-discord.md)** | Same, in a Discord channel | B1 → Discord | 2 minutes |
| **[Zapier](./zapier.md)** | Use B1 events as triggers and B1 actions in any of Zapier's 7,000+ apps (waiting on Zapier's approval) | Both | 5–10 min per Zap |
| **[Claude](./claude.md)** | Ask Anthropic's Claude questions about your church data, scoped to your permissions — free to try, recommended | Both | Under 3 minutes |
| **[ChatGPT](./chatgpt.md)** | Same idea with OpenAI's ChatGPT (needs a paid ChatGPT plan) | Both | 10 minutes |
| **[Mailchimp](./services/mailchimp.md)** | Keep a Mailchimp audience in sync with your people, groups, and saved lists — built into B1 | B1 → Mailchimp | 5 minutes |
| **[Connected services](./services/index.md)** | Curated recipes for Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message | Varies | 5–10 min each |

## How to Pick

- **Just want a notification in chat?** Use **Slack** or **Discord** — no third-party account, no Zap to maintain. Configured entirely inside B1Admin.
- **Want to automate something across apps** (e.g. "when someone gives, add them to my Mailchimp list and Slack #donations")? Use **Zapier**.
- **Need a one-off data pull?** Use B1's built-in CSV exports. The **Export** button on the People page downloads your directory or any search, and **Import/Export** in Settings downloads all of your church's data. See [Exporting Data](../people/exporting-data.md). For a report that has to refresh on a schedule, have a script call the [REST API](../../developer/api/index.md) with an [API key](../../developer/api/api-keys.md).
- **Want to ask questions in plain English** ("how many first-time visitors last Sunday?", "summarize giving this month")? Start with **[Claude](./claude.md)** — it's free to try and sets up in less than 3 minutes. **[ChatGPT](./chatgpt.md)** works too with a paid plan. Claude connects by signing in with your B1 account; ChatGPT uses a B1 API key.
- **Building your own custom integration?** None of the above — talk to the [REST API](/docs/developer/api) directly with an [API key](/docs/developer/api/api-keys), or subscribe a server you control to [webhooks](/docs/developer/api/webhooks).

## What They Have In Common

Everything is set up in B1Admin under **Settings → Developer**, which has three tabs: **API Keys**, **Webhooks**, and **Connected Apps**. [Developer Settings](./developer-settings.md) walks through every field on those tabs, including the webhook event list, delivery log, and API key scopes.

- **Slack, Discord, and Mailchimp** are webhooks you create yourself on the **Webhooks** tab (pick the matching **Connector Type**). They don't need an API key.
- **Claude** (signing in with your B1 account) shows up on the **Connected Apps** tab, where you can revoke it.
- **Zapier, ChatGPT, and Claude with a key** authenticate with a **B1 API key**, created on the **API Keys** tab. The key:

  - Is bound to the person who created it and inherits that person's permissions
  - Can be narrowed with **scopes**. For example, a script that only reads your directory needs `people:read`, not `settings:write`
  - Can be deleted at any time, instantly cutting the integration's access without affecting anything else

Zapier also registers a [webhook](/docs/developer/api/webhooks) on your behalf when a Zap is turned on, and removes it when you turn the Zap off, so you don't manage the webhook URL yourself.

:::tip
For Zapier to register webhooks automatically, the API key needs the **`settings:write`** scope (plus the resource scopes for whatever the integration touches). Zapier also checks the key against B1's webhook list when you connect it, so a key without `settings:write` fails the connection test even if your Zaps only use B1 actions.
:::

## Cost

ChurchApps is free and open-source. Slack/Discord, the [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), and the official Zapier app are also free from our side. The third parties may charge for their own platforms (Zapier has a generous free tier; Slack and Discord are free for this purpose).

## Building Your Own

If none of the above fits, every B1 surface is open:

- **[REST API](/docs/developer/api)** — call B1 from any language with an `Authorization: Bearer cak_…` header
- **[Webhooks](/docs/developer/api/webhooks)** — subscribe a public HTTPS endpoint to one or more event types and receive signed JSON payloads
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — if you're building a SaaS product used by many churches

## Next Steps

- [Developer Settings](./developer-settings.md) — the API Keys, Webhooks, and Connected Apps tabs, field by field
- [Slack & Discord](./slack-discord.md) — post chat notifications
- [Zapier](./zapier.md) — connect to 7,000+ apps
- [Claude](./claude.md) — ask Anthropic's Claude about your church data
- [ChatGPT](./chatgpt.md) — ask OpenAI's ChatGPT about your church data
- [Connected services](./services/index.md) — per-service recipes (Mailchimp, Donorbox, Clearstream, …)
