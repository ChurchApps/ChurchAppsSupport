---
title: "API Keys, Webhooks & Connected Apps"
sidebar_label: "Developer Settings"
description: "Use the Developer section of B1 Admin Settings to create scoped API keys, set up webhooks with Slack, Discord, Mailchimp or raw JSON connectors, inspect deliveries, and revoke connected apps."
---

# API Keys, Webhooks & Connected Apps

<div class="article-intro">

Every integration in this section is switched on from one place in B1 Admin: the **Developer** section of **Settings**. Its three tabs let you mint **API Keys** for tools that call B1, create **Webhooks** that push B1 events out to other tools, and review the **Connected Apps** that have been given access to your church. This page walks through each tab field by field; the technical payload and signature details live in the [developer reference](/docs/developer/api).

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Church Settings** permission (the **Settings** &gt; **Edit** permission in [Roles & Permissions](../settings/roles-permissions.md)). Every tab in the Developer section, and every action on it, checks this permission.
- Know which integration you are setting up: the pages under [Integrations](./index.md) tell you whether it needs an API key, a webhook, or neither.

</div>

## Opening the Developer Section

1. In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Settings**, and click **Settings**.
2. In the **Configuration** list, click **Developer**. The section opens with three pill tabs: **API Keys**, **Webhooks**, and **Connected Apps**.

You can also go straight there: **/settings/developer** opens the section on the **API Keys** tab, and **/settings/webhooks** opens it on the **Webhooks** tab. Both addresses redirect to the Settings page with the Developer section selected.

## API Keys

An API key lets another program act in B1 on your behalf. Use one for [Zapier](./zapier.md), [Make](./make.md), [Google Sheets](./google-sheets.md), [ChatGPT](./chatgpt.md), [Claude with a key](./claude.md), or your own scripts.

The **API Keys** tab lists each key with its **Name**, **Key** (the `cak_` prefix followed by the first few characters and an ellipsis; the full key is never shown again), **Scopes** (one chip per scope), **Last Used**, and **Expires**. A dash means the key has never been used or never expires. When you have no keys yet the card reads *No API keys yet.*

### Creating a Key

1. Click **New API Key**.
2. Fill in the form:
   - **Name** -- A label that tells you what the key is for, such as *Zapier integration*. Required.
   - **Expires** -- An optional date after which the key stops working. *Leave blank for a key that never expires.*
   - **Scopes** -- Tick at least one. Scopes are grouped by resource (**people**, **groups**, **donations**, **attendance**, **forms**, **content**, **messaging**, **roles**, **settings**, **workflows**). A `write` scope includes the matching `read`. See [Choosing scopes](#choosing-scopes).
3. Click **Save**. If the name is missing or no scope is ticked you see *Name is required* or *Select at least one scope*.
4. An **API Key** dialog shows the full key with the note *Copy your API key now — it will not be shown again.* Click **Copy** (it changes to **Copied**) and paste the key into the tool you are connecting, then click **Close**.

:::warning
B1 stores only a hash of the key, so there is no way to see it again after you close the dialog. If you lose it, delete the key and create a new one.
:::

A key is bound to the person who created it. It can never do more than that person's own role allows, and the scopes narrow it further. If the creator loses a permission, every key they made loses it too.

### Choosing Scopes {#choosing-scopes}

| Scope | Lets the key... |
|---|---|
| `people:read` / `people:write` | View / add and edit people and households |
| `groups:read` / `groups:write` | View / edit groups and group members |
| `donations:read` / `donations:write` | View / record donations |
| `attendance:read` / `attendance:write` | View / record attendance, sessions, and check-ins |
| `forms:write` | Manage forms and their submissions (there is no separate read scope) |
| `content:read` / `content:write` | View / edit website content, registrations, and streaming settings |
| `messaging:read` / `messaging:write` | Read messages / also send texts |
| `roles:read` / `roles:write` | View / edit roles |
| `settings:read` / `settings:write` | View / edit church settings. **Required** for Zapier and Make, which register webhooks for you |
| `workflows:read` / `workflows:write` | View / run and edit [workflows](../serving/workflows.md) |

Give each key only the scopes its integration needs. A Google Sheets export needs `people:read`, not `settings:write`; a Zap that triggers on new people needs `settings:write` plus `people:read`.

### Deleting a Key

Click the delete icon at the end of the key's row and confirm *Delete API key "name"? Any integration using it will stop working.* Access ends immediately; nothing else in B1 changes. There is no edit form for keys -- to change a key's scopes or expiry, create a new key and delete the old one.

## Webhooks

A webhook pushes a message out of B1 whenever something you choose happens: a person is added, a donation comes in, a form is submitted, and so on. B1 delivers it to a URL you provide, or, with a connector, straight into Slack, Discord, or Mailchimp.

The **Webhooks** tab lists each webhook with its **Name**, **URL**, number of **Events**, and **Status** (**Active** or **Disabled**). Click a row, or its edit icon, to open it; the delete icon removes it after you confirm *Delete webhook "name"?*. With none set up yet the card reads *No webhooks yet -- Create a webhook to notify external tools when people, groups, or households change.*

### Creating a Webhook

1. Click **New Webhook**.
2. Enter a **Name**, for example *Zapier — new members*. Required.
3. Choose a **Connector Type**. This decides what B1 sends and which fields appear next:
   - **Standard (raw JSON)** -- A signed JSON message to any HTTPS address. Use this for your own server, or any automation tool that accepts incoming webhooks. Enter the **Payload URL**.
   - **Slack** -- Readable chat messages posted to a Slack channel. Paste the channel's Incoming Webhook URL into **Payload URL**. See [Slack & Discord](./slack-discord.md).
   - **Discord** -- The same for a Discord channel's Incoming Webhook URL.
   - **Mailchimp** -- No URL. Enter your **Mailchimp API Key** (*Found in Mailchimp under Account &gt; Extras &gt; API keys. Stored encrypted.*) and **Audience ID** (*Found in Mailchimp under Audience &gt; Settings &gt; Audience name and defaults*). Choosing Mailchimp also pre-selects the person, group-member, and list-member events it can sync, and hides the rest. See [Mailchimp](./services/mailchimp.md).
4. Leave **Active** on. Turn it off to keep the webhook's setup but stop sending.
5. Under **Events**, tick each event the webhook should receive (at least one). See [Events you can subscribe to](#webhook-events).
6. Click **Save**. B1 checks the form (*Name is required*, *URL is required*, *API key is required*, *Audience ID is required*, *Select at least one event*) and, for a **Payload URL**, rejects addresses that do not use `https`, point at `localhost` or a private network, or do not resolve. For Mailchimp, B1 verifies the key and audience against Mailchimp before saving.
7. For a **Standard**, **Slack**, or **Discord** webhook, a **Signing Secret** dialog appears once: *Copy your signing secret now — it will not be shown again. Use it to verify the X-B1-Signature header on every delivery.* Click **Copy**, store the secret with your integration, then **Close**. Slack, Discord, and most automation tools ignore the signature, so you only need the secret if your own code will verify deliveries (see [Verifying signatures](/docs/developer/api/webhooks#verifying-signatures)). Mailchimp webhooks have no secret.

:::info
Zapier and Make create their own webhooks here when you turn a Zap or scenario on (named like *Zapier — person.created*) and remove them when you turn it off. You do not need to add those by hand, but they appear in this list and you can inspect their deliveries like any other.
:::

### Events You Can Subscribe To {#webhook-events}

The events are grouped by the record they describe:

| Group | Events |
|---|---|
| People | `person.created`, `person.updated`, `person.destroyed` |
| Groups | `group.created`, `group.updated`, `group.destroyed` |
| Group members | `group.member.added`, `group.member.removed`, `group.member.requested` (someone asks to join a group) |
| Households | `household.created`, `household.updated`, `household.destroyed` |
| Donations | `donation.created`, `donation.updated` |
| Attendance | `attendance.recorded`, `attendance.checkout` |
| Sessions | `session.created` |
| Forms | `form.submission.created` |
| Calendar events | `event.created`, `event.updated`, `event.destroyed` |
| Registrations | `registration.created`, `registration.cancelled` |
| Saved lists | `list.member.added`, `list.member.removed` |

A **Mailchimp** webhook can only use the person, group-member, and list-member events. For what each payload contains, see the [webhook developer reference](/docs/developer/api/webhooks#event-catalog).

### Testing, Secrets, and Deliveries

Open an existing webhook to see two extra buttons under the events and a **Recent Deliveries** list below the form:

- **Send Test Event** (the button reads **Sending…** while it works) -- Sends a sample payload for the first event you ticked, using the webhook's real address, format, and signature, and adds the result to **Recent Deliveries** so you can see the response. For a **Mailchimp** webhook the test instead checks your key and audience against Mailchimp (so no fake subscriber is written to your audience) and does not add a row.
- **Regenerate Secret** (not shown for Mailchimp) -- After you confirm *Regenerate the signing secret? The current secret stops working immediately.*, a new **Signing Secret** dialog shows the replacement once. Update your integration right away.
- **Recent Deliveries** -- The last 50 deliveries with their **Event**, **Status**, **Attempts**, **Response** (the HTTP status code your endpoint returned, or a dash), and **Date**. Until anything has been sent it reads *No deliveries yet.* Click a row to open **Delivery Detail**, which shows the exact **Payload** B1 sent and the **Response Body** it got back. Click **Redeliver** on a row to queue the same payload again, for example after fixing your endpoint.

Delivery statuses:

| Status | Meaning |
|---|---|
| **pending** | Queued; a background worker sends it within about a minute |
| **succeeded** | Your endpoint answered with a 2xx status |
| **failed** | The last attempt did not get a 2xx (or timed out after 10 seconds); B1 will retry with growing gaps, from a minute up to a few days apart |
| **exhausted** | Every retry failed, or the webhook was disabled before the delivery went out; B1 has given up on this delivery |

:::warning
Three exhausted deliveries in a row switch the webhook to **Disabled** automatically, so a broken endpoint does not keep failing forever. Fix the endpoint, open the webhook, turn **Active** back on, and save. Any successful delivery resets the failure count.
:::

### Editing or Deleting a Webhook

Open the webhook, change any field (including **Connector Type** or the ticked events), and click **Save**. Click **Delete** on the form, or the delete icon in the list, to remove it; deliveries stop immediately. Deleting a webhook that Zapier or Make created will break that Zap or scenario until you turn it off and on again.

## Connected Apps

The **Connected Apps** tab lists apps you have signed in to with your B1 account, such as [Claude](./claude.md) connected through its B1 connector. Each row shows the **Application** name, the **Scopes** you approved when you signed in, when it was **Authorized**, and when its access **Expires**. Expired connections drop off the list on their own; until an app connects, the tab reads *No apps have been authorized yet.*

To cut off an app, click **Revoke** and confirm *Revoke access for "name"?*. The app stops working on its next request; to use it again you sign in to B1 from the app once more.

:::tip
Connected Apps only lists apps that signed in with your account. An app you gave an **API key** is not listed here -- delete its key on the **API Keys** tab instead.
:::

## Related Articles

- [Integrations](./index.md) -- Which integration needs a key, a webhook, or neither
- [Slack & Discord](./slack-discord.md) -- Chat notifications through a Slack or Discord connector webhook
- [Mailchimp](./services/mailchimp.md) -- Audience sync through the Mailchimp connector
- [Zapier](./zapier.md) and [Make](./make.md) -- Automation platforms that use an API key and register webhooks for you
- [Roles & Permissions](../settings/roles-permissions.md) -- Granting the Edit Church Settings permission
- [API Keys](/docs/developer/api/api-keys), [Webhooks](/docs/developer/api/webhooks), and [Connected Apps & OAuth](/docs/developer/api/connected-apps) -- Developer reference for payloads, headers, signatures, and the REST endpoints behind these tabs
