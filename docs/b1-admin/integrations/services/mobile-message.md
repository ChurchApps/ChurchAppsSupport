---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) is an Australian SMS API — popular with AU churches because it offers local numbers and competitive AU pricing where Clearstream and Text In Church are US-centric. Mobile Message doesn't have a first-class Zapier app today, but it does publish a public REST API, so you can wire B1 events to Mobile Message texts through **Webhooks by Zapier** (or Make's HTTP module) in a few minutes.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [Mobile Message](https://mobilemessage.com.au) account with a registered Sender ID and API credentials (API username + password under *Account → API Settings*)
- A [Zapier](https://zapier.com) account (or [Make](https://www.make.com))
- A B1Admin user with **Edit Settings** permission

</div>

## What You Can Wire Up

Mobile Message's API is "send SMS"-shaped — no triggers, just outbound text. So the recipes are all B1 → SMS:

| Direction | B1 trigger | Outcome |
|---|---|---|
| B1 → Mobile Message | `person.created` | Welcome text to the new person |
| B1 → Mobile Message | `donation.created` | Thank-you text to the donor |
| B1 → Mobile Message | `form.submission.created` | Page the on-call team |
| B1 → Mobile Message | `event.created` | Reminder broadcast to a list |

## Setup

### 1. Mint a B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — for the trigger webhook to register
- `people:read` — to look up the recipient's phone number from a `personId`

### 2. Build the Zap with Webhooks by Zapier

1. **Trigger** — B1.church: pick the event you want (e.g. New Donation).
2. **Action** — B1.church: Find Person (using `data.personId`) to get the phone number and name.
3. **Action** — Webhooks by Zapier: **POST**. Configure as below.

The POST step's settings:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier adds this automatically)
- **Basic Auth** — set the *Basic Auth* field to `<api_username>|<api_password>` (Zapier converts that to the right `Authorization: Basic …` header)

Turn the Zap on. Send a test gift in B1Admin to verify a text arrives.

## Common Recipes

### Event reminders the morning of

- **Trigger** — Schedule by Zapier (daily, 7am)
- **Action** — B1.church: Find Events for today (or use a Find step with a fixed date filter, or store today's event list in a Google Sheet)
- **Action** — Webhooks by Zapier: POST to Mobile Message with the event list to a registered subscriber group

### Use the batch endpoint for a list broadcast

Mobile Message's `/v1/messages` endpoint accepts up to 10,000 messages per call. To broadcast to a B1 group:

- **Trigger** — B1.church: New Form Submission (filter to a specific form)
- **Action** — B1.church: List Group Members for a target group (via a *Webhooks by Zapier — GET* step on `/membership/groupmembers?groupId=…`)
- **Action** — Formatter by Zapier → Utilities → Line-itemize the response into a `messages` array
- **Action** — Webhooks by Zapier: POST the full array to `/v1/messages`

### Make alternative

If you prefer Make, drop the **HTTP — Make a request** module after the B1 Watch Events trigger, configure it the same way (POST, Basic Auth, JSON body). See the [Make overview](../make) for the B1 side.

## Limits & Notes

- **Basic Auth is the only authentication method** — Mobile Message issues a username and password from the dashboard. Treat both as secrets.
- **`sender` must be a registered Sender ID** on your Mobile Message account, or the send will return `400 Invalid sender`. AU regulations require sender registration.
- **AU phone numbers** can be `0412345678` (local) or `+61412345678` (international). The API accepts both, but normalise on `+61…` if you're sending overseas as well.
- **Up to 10,000 messages per request** — useful for broadcasts, but a single B1 webhook delivery will rarely emit a list that big; reserve the batch endpoint for scheduled bulk Zaps.

## Troubleshooting

- **POST returns `401 Unauthorized`** — Basic Auth credentials are wrong. Re-copy from the Mobile Message dashboard *Account → API Settings*. Note the username is your account email by default, not a separate API key.
- **POST returns `400 Invalid sender`** — the `sender` value isn't a registered Sender ID on your account. Register it in the Mobile Message dashboard first.
- **Text arrives but is truncated** — Mobile Message splits messages over ~160 characters into multiple parts; you're billed per part. Check the response body — it tells you the part count.

## See Also

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — alternative SMS providers with native Zapier apps (no Webhooks-by-Zapier step needed)
- [Zapier (overview)](../zapier) — B1 side of every Zapier recipe
- [Mobile Message API docs](https://mobilemessage.com.au/api-documentation)
