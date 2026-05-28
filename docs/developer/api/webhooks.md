---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks let a church push real-time notifications to third-party tools — automation platforms (Zapier, Make, n8n), CRMs, accounting systems, or anything that accepts an HTTP POST. When a person, group, or household changes in B1, B1 sends a signed JSON payload to every URL subscribed to that event.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A church admin with the **Edit Church Settings** permission registers and manages webhooks
- Your receiving endpoint must be reachable over **HTTPS** at a public address
- Have a way to store the signing secret securely — it is shown only once

</div>

## Overview

Webhooks are **outbound** only: B1 calls your endpoint, you do not call B1. Each webhook is a per-church subscription consisting of a destination URL, a signing secret, and a list of subscribed events.

Delivery uses a **durable outbox**: when a subscribed event occurs, B1 records a delivery row and a background worker POSTs it within about a minute. Failed deliveries are retried with exponential backoff. Nothing is lost if a delivery is slow or your endpoint is briefly down.

## Registering a Webhook

### In B1Admin

Go to **Settings → Webhooks → New Webhook**. Enter a name, the payload URL, and select the events to subscribe to. On save, the **signing secret is displayed once** — copy it immediately and store it with your integration. It is never shown again (you can rotate it later, but you cannot retrieve the original).

### Via the API

All endpoints are under the Membership module base path `/membership/webhooks` and require either a JWT from a church admin with the `Settings / Edit` permission, **or an [API key](./api-keys) minted with the `settings:write` scope**. The same routes accept both. This is what lets Zapier and Make register webhooks on the church's behalf when a Zap or scenario is turned on.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

The create response — and **only** the create response — includes the `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Method & Path | Purpose |
|---|---|
| `GET /membership/webhooks` | List the church's webhooks (secret omitted) |
| `GET /membership/webhooks/events` | The catalog of valid event names |
| `GET /membership/webhooks/:id` | Load one webhook |
| `POST /membership/webhooks` | Create (no `id`) or update (with `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rotate the signing secret; returns the new value once |
| `DELETE /membership/webhooks/:id` | Delete a webhook |
| `GET /membership/webhooks/:id/deliveries` | Recent delivery attempts for a webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Full payload and response for one delivery |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Re-queue a delivery |

## Event Catalog

Event names follow the pattern `{entity}.{action}`. Fetch the live list from `GET /membership/webhooks/events`.

| Event | Fires when |
|---|---|
| `person.created` | A person is added |
| `person.updated` | A person record is changed |
| `person.destroyed` | A person is deleted |
| `household.created` | A household is added |
| `household.updated` | A household is changed |
| `household.destroyed` | A household is deleted |
| `group.created` | A group is added |
| `group.updated` | A group is changed |
| `group.destroyed` | A group is deleted |
| `group.member.added` | A person is added to a group |
| `group.member.removed` | A person is removed from a group |
| `donation.created` | A gift is recorded — manual entry, online, or the pending → complete transition |
| `donation.updated` | A donation record is edited |
| `attendance.recorded` | A visit is logged (manual entry or check-in) |
| `session.created` | A new attendance session is created (manually or auto on first check-in) |
| `form.submission.created` | A form is submitted |
| `event.created` | A calendar event is added |
| `event.updated` | A calendar event is edited |
| `event.destroyed` | A calendar event is deleted |

## Payload Format

Every delivery is an HTTP `POST` with a JSON body and these headers:

| Header | Description |
|---|---|
| `Content-Type` | Always `application/json` |
| `X-B1-Event` | The event name, e.g. `person.created` |
| `X-B1-Delivery-Id` | Unique id for this delivery attempt — use it to deduplicate |
| `X-B1-Signature` | HMAC-SHA256 signature of the raw body (see below) |
| `X-B1-Timestamp` | Unix epoch seconds when the request was sent |
| `User-Agent` | `B1-Webhooks/1.0` |

The body wraps the changed resource in a small envelope:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

For `*.destroyed` events, `data` contains only the `id` and `churchId` of the deleted record.

## Connector Types

The default delivery format is the JSON envelope above — `connectorType: "standard"`. For [Slack and Discord](/docs/b1-admin/integrations/slack-discord) the same webhook engine instead posts a chat-shaped message that those services accept directly:

| `connectorType` | Body sent | Use when |
|---|---|---|
| `"standard"` (default) | `{event, churchId, occurredAt, data}` envelope, signed | You're writing your own integration, or pointing at Zapier / Make / a custom server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | You're posting straight to a Slack Incoming Webhook URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | You're posting straight to a Discord channel webhook URL |

The connector type is set in the **Connector Type** dropdown on the webhook editor, or via `connectorType` in the `POST /membership/webhooks` body. The signed `X-B1-Signature` header is still sent for Slack/Discord deliveries (they ignore it harmlessly), so switching a webhook back to `standard` later requires no resigning.

## Test Deliveries

Every webhook editor has a **Send Test Event** button — the corresponding API call is `POST /membership/webhooks/:id/test`. The test route builds a synthetic payload for the first subscribed event, dispatches it synchronously through the real signed-delivery path (and through `formatForConnector` for Slack/Discord), and returns the resulting delivery row including `responseStatus` and `responseBody`. Use it to confirm connectivity and signature handling before flipping the integration on for real.

## Verifying Signatures

Always verify `X-B1-Signature` before trusting a payload. The signature is `sha256=` followed by the hex HMAC-SHA256 of the **raw request body** keyed with your signing secret. Compute it over the bytes you received — do not re-serialize the parsed JSON.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

Reject any request whose signature does not match. Optionally also reject requests whose `X-B1-Timestamp` is more than a few minutes old to limit replay windows.

## SDK Support

For Node.js, `@churchapps/integration-sdk` ships a typed verifier and an Express middleware that handles the raw-body capture, signature check, and envelope parsing for you:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture the raw body before JSON parsing — required so the signature still verifies.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

The SDK also exposes `WebhookVerifier.verify(secret, rawBody, signatureHeader)` for non-Express runtimes (serverless functions, Fastify, etc.). See the package on npm.

## Delivery & Retries

Your endpoint should respond with a `2xx` status as quickly as possible — ideally after only queuing the work, not after processing it. Any non-`2xx` response, a connection failure, or a response slower than **10 seconds** counts as a failed delivery.

Failed deliveries are retried with exponential backoff — **16 attempts over roughly 5 days**. The interval grows from 1 minute, through hours, up to 3-day gaps for the final attempts. After the 16th failed attempt the delivery is marked `exhausted` and abandoned.

Delivery is **at-least-once**: a delivery may arrive more than once (for example, if your endpoint succeeds but the response is lost). Use the `X-B1-Delivery-Id` header to deduplicate — process each id only once and treat repeats as no-ops.

### Auto-disabling

If a webhook produces **three consecutive exhausted deliveries**, B1 disables it automatically. Fix your endpoint, then re-enable the webhook in B1Admin (or via `POST /membership/webhooks` with `"active": true`).

## Inspecting & Redelivering

The webhook editor in B1Admin shows a **Recent Deliveries** table — event, status, attempt count, response code, and timestamp. Selecting a row reveals the full payload that was sent and the response that came back.

Use **Redeliver** to re-queue any past delivery with its original payload — useful after fixing a bug in your endpoint, or to backfill events your endpoint missed while it was down.

## URL Requirements

Because webhook URLs are church-supplied, B1 enforces guards against server-side request forgery. A webhook URL is rejected — at registration and re-checked before every delivery — if it:

- does not use **`https`**
- points at `localhost`, a `.local` / `.internal` hostname, or
- resolves to a **private, loopback, link-local, or cloud-metadata** IP address

Your endpoint must be a publicly reachable HTTPS service.
