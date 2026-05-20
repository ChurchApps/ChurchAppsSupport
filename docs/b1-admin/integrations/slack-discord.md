---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

Post readable notifications from B1 directly to a Slack or Discord channel — new people, donations, group sign-ups, form submissions, calendar events, and more. No third-party account, no Zap to maintain: B1 reformats events into chat messages and POSTs them to the channel's webhook URL itself.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Settings** permission in B1Admin
- An admin in your Slack workspace or Discord server to create the channel's Incoming Webhook
- Decide which channel you want notifications in (you can use the same channel for several event types, or split them across channels)

</div>

## How It Works

B1 has a built-in **Connector Type** for chat platforms. When you create a webhook with type **Slack** or **Discord**, the webhook engine still does its usual delivery + retry + signed-header dance, but the body it sends is reshaped from B1's normal `{event,churchId,data}` envelope into the small `{text}` (Slack) or `{content}` (Discord) message those services expect.

No B1 servers reach out to Slack on a per-church basis other than the existing outbound webhook flow — there is nothing new to host, nothing extra to pay for.

## Slack — Step by Step

### 1. Get a Slack Incoming Webhook URL

1. Open [api.slack.com/apps](https://api.slack.com/apps) in the Slack workspace you want notifications in.
2. Click **Create New App → From scratch**, name it something like "B1 Notifications", and pick the workspace.
3. In the left nav choose **Incoming Webhooks** and toggle **Activate Incoming Webhooks** to *On*.
4. Click **Add New Webhook to Workspace**, pick the channel (e.g. `#donations`), then **Allow**.
5. Slack lands you back on the page with a fresh **Webhook URL** that looks like `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Copy it — that's the only piece of information B1 needs.

:::caution
Treat the Slack webhook URL as a secret. Anyone with it can post arbitrary messages to the channel. If you accidentally expose it, regenerate it from the Slack app page (regenerating just rotates the URL; update B1 to match).
:::

### 2. Connect it in B1Admin

1. In B1Admin go to **Settings → Developer → Webhooks**.
2. Click **New Webhook**.
3. Fill in:
   - **Name** — something readable like "Donations → #donations". Only your team sees it.
   - **Connector Type** — choose **Slack**.
   - **Payload URL** — paste the Slack URL from step 1.
   - **Events** — tick the events you want as messages. For a donations channel, just `donation.created`. For a #people channel, try `person.created` and `group.member.added`.
4. Click **Save**. A "Signing Secret" dialog appears — you can ignore it for Slack (Slack doesn't verify B1 signatures) and close it.

### 3. Test it

Re-open the webhook from the list and click **Send Test Event**. Within a second or two a message like

> 💝 New donation: $50.00

appears in your Slack channel, and a new row shows up in the **Recent Deliveries** table on the same screen with status `succeeded`. You're done.

## Discord — Step by Step

### 1. Get a Discord Webhook URL

1. In your Discord server, hover over the channel you want notifications in and click the **⚙ gear** (Edit Channel).
2. Open **Integrations → Webhooks → New Webhook**.
3. Give it a name and (optionally) an avatar, then click **Copy Webhook URL** — looks like `https://discord.com/api/webhooks/123…/abc…`.

### 2. Connect it in B1Admin

Identical to the Slack flow above, except set **Connector Type** to **Discord**. Paste the Discord URL into **Payload URL** and save.

:::tip
You do **not** need to add `/slack` to the end of the Discord URL — B1 sends Discord-native `{content}` payloads, not Slack-compatible ones. Just paste the URL Discord gave you.
:::

### 3. Test it

Same **Send Test Event** button — Discord shows the message in the chosen channel and the delivery log flips to `succeeded`.

## What the Messages Look Like

| Event | Example message |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

The full list lives in the [webhook event catalog](/docs/developer/api/webhooks#event-catalog) — any event there can be routed to Slack/Discord.

## One Channel Per Topic

You don't have to put every event in one place. Most churches set up a handful of webhooks:

- A **#donations** channel that only listens to `donation.created`
- A **#new-people** channel for `person.created` and `group.member.added`
- A **#admin-alerts** channel for low-volume things like `form.submission.created`

There's no limit on the number of webhooks per church. Each one is independent — deleting or disabling one doesn't affect the others.

## Inspecting Deliveries

The webhook editor's **Recent Deliveries** table shows the last 50 attempts. Click a row to see the exact payload that was sent and the response that came back. For a Slack connector the payload is `{"text":"💝 New donation: $50.00"}` — not the raw `{event,churchId,...}` envelope — because B1 reshapes it before delivery.

If something failed (red `failed` or `exhausted` badge), the dialog shows the HTTP status and response body so you can see exactly what Slack or Discord didn't like — usually a copy/paste error in the URL.

## Troubleshooting

- **No message appears + delivery status `400`** — usually the Connector Type is set to **Standard** but the URL is a Slack/Discord one. Slack/Discord reject the raw envelope. Switch the dropdown to **Slack** or **Discord** and resend the test.
- **Webhook auto-disabled** — after 3 consecutive failed deliveries B1 turns the webhook off. Fix the URL (or rotate it on Slack/Discord) and toggle **Active** back on.
- **Message arrived but is missing detail** — every chat platform limits message size. B1's messages are one-liners by design; for richer notifications use [Zapier](./zapier) or [Make](./make) to compose a fuller Slack message via their Slack actions.

## Switching Connector Types Later

You can change the Connector Type on an existing webhook — it takes effect on the next delivery. If you switch from Slack to Standard, point the URL at your own HTTPS endpoint and the same signing secret (it was issued when the webhook was created) starts being verifiable as the raw envelope.

## See Also

- [Zapier](./zapier) — for multi-step workflows triggered by B1 events
- [Make](./make) — visual scenario builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — the full payload + signature format if you ever point a webhook at your own server
