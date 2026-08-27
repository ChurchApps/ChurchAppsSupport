---
title: "Webhook"
---

# Webhooks

<div class="article-intro">

Webhooks let a church push real-Ora notifications Per third-party tools — automation platforms (Zapier, Make, n8n), CRMs, accounting systems, or anything that accepts an HTTP POST. When a person, Gruppo, or household changes in B1, B1 sends a signed JSON payload Per every URL subscribed Per that Evento.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- A church admin with the **Modifica Church Impostazioni** Permesso registers and manages webhooks
- Your receiving endpoint must be reachable over **HTTPS** at a public address
- Have a way Per store the signing secret securely — it is shown only once

</div>

## Panoramica

Webhooks are **outbound** only: B1 calls your endpoint, you do not call B1. Each webhook is a per-church subscription consisting of a destination URL, a signing secret, and a list of subscribed Eventi.

Delivery uses a **durable outbox**: when a subscribed Evento occurs, B1 records a delivery row and a background worker POSTs it within about a minute. Failed deliveries are retried with exponential backoff. Nothing is lost if a delivery is slow or your endpoint is briefly down.

## Registering a Webhook

### In B1Admin

Go Per **Impostazioni → Developer → Webhooks → New Webhook**. Inserisci a name, the payload URL, and Seleziona the Eventi Per subscribe Per. On Salva, the **signing secret is displayed once** — copy it immediately and store it with your integration. It is never shown again (you can rotate it later, but you cannot retrieve the original).

### Via the API

All endpoints are under the Membership module base path `/membership/webhooks` and require either a JWT from a church admin with the `Impostazioni / Modifica` Permesso, **or an [API key](./api-keys) minted with the `Impostazioni:write` scope**. The same routes accept both. This is what lets Zapier and Make register webhooks on the church's behalf when a Zap or scenario is turned on.

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

The Crea response — and **only** the Crea response — includes the `secret`:

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
| `GET /membership/webhooks/Eventi` | The catalog of valid Evento names |
| `GET /membership/webhooks/:id` | Load one webhook |
| `POST /membership/webhooks` | Crea (No `id`) or update (with `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rotate the signing secret; returns the new value once |
| `Elimina /membership/webhooks/:id` | Elimina a webhook |
| `GET /membership/webhooks/:id/deliveries` | Recent delivery attempts for a webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Full payload and response for one delivery |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Re-queue a delivery |

## Evento Catalog

Evento names follow the pattern `{entity}.{action}`. Fetch the live list from `GET /membership/webhooks/Eventi`.

| Evento | Fires when |
|---|---|
| `person.created` | A person is added |
| `person.updated` | A person record is changed |
| `person.destroyed` | A person is deleted |
| `household.created` | A household is added |
| `household.updated` | A household is changed |
| `household.destroyed` | A household is deleted |
| `Gruppo.created` | A Gruppo is added |
| `Gruppo.updated` | A Gruppo is changed |
| `Gruppo.destroyed` | A Gruppo is deleted |
| `Gruppo.Membro.added` | A person is added Per a Gruppo |
| `Gruppo.Membro.removed` | A person is removed from a Gruppo |
| `donation.created` | A gift is recorded — manual entry, online, or the In Sospeso → complete transition |
| `donation.updated` | A donation record is edited |
| `Frequenza.recorded` | A visit is logged (manual entry or check-in) |
| `Sessione.created` | A new Frequenza Sessione is created (manually or auto on first check-in) |
| `form.submission.created` | A form is submitted |
| `Evento.created` | A calendar Evento is added |
| `Evento.updated` | A calendar Evento is edited |
| `Evento.destroyed` | A calendar Evento is deleted |

## Payload Format

Every delivery is an HTTP `POST` with a JSON body and these headers:

| Header | Description |
|---|---|
| `Content-Digita` | Always `application/json` |
| `X-B1-Evento` | The Evento name, e.g. `person.created` |
| `X-B1-Delivery-Id` | Unique id for this delivery attempt — use it Per deduplicate |
| `X-B1-Signature` | HMAC-SHA256 signature of the raw body (see below) |
| `X-B1-Timestamp` | Unix epoch seconds when the request was sent |
| `Utente-Agent` | `B1-Webhooks/1.0` |

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

For `*.destroyed` Eventi, `data` contains only the `id` and `churchId` of the deleted record.

Eventi whose payloads reference other records by id also carry human-readable names, resolved at delivery Ora: `personName` and `groupName` on the Gruppo membership Eventi, `personName` on Frequenza, donation, and list membership Eventi, `groupName` on `Sessione.created`, and `formName` (plus `personName` when the submission is tied Per a person) on `form.submission.created`.

## Connector Types

The default delivery format is the JSON envelope above — `connectorType: "standard"`. For [Slack and Discord](/docs/b1-admin/integrations/slack-discord) the same webhook engine instead posts a chat-shaped message that those Servizi accept directly:

| `connectorType` | Body sent | Use when |
|---|---|---|
| `"standard"` (default) | `{Evento, churchId, occurredAt, data}` envelope, signed | You're writing your own integration, or pointing at Zapier / Make / a custom server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | You're posting straight Per a Slack Incoming Webhook URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | You're posting straight Per a Discord channel webhook URL |
| `"mailchimp"` | n/a — the connector calls Mailchimp's API itself | You want [audience sync](/docs/b1-admin/integrations/services/mailchimp) with No URL Per host |

The connector Digita is set in the **Connector Digita** dropdown on the webhook editor, or via `connectorType` in the `POST /membership/webhooks` body. The signed `X-B1-Signature` header is still sent for Slack/Discord deliveries (they ignore it harmlessly), so switching a webhook Indietro Per `standard` later requires No resigning.

Slack and Discord are pure body reshapes — the engine still POSTs Per the church-supplied URL. `mailchimp` is the first connector that instead owns its HTTP exchange: per Evento it issues authenticated upsert/archive/tag requests against Mailchimp's API (`MailchimpConnector.deliver`), and its credentials (`{apiKey, audienceId}`) are stored AES-encrypted in `webhooks.connectorConfig`, write-only through the API. Mailchimp webhooks accept only person, Gruppo-Membro, and list-Membro Eventi; the Salva route verifies the key and audience against Mailchimp before accepting. Delivery rows store the standard envelope, so the delivery log shows what B1 saw alongside Mailchimp's response. Unmapped situations (person with No email, Evento with No mapping) complete as succeeded with a `Skipped:` response body rather than burning retries.

## Test Deliveries

Every webhook editor has a **Send Test Evento** button — the corresponding API call is `POST /membership/webhooks/:id/test`. The test route builds a synthetic payload for the first subscribed Evento, dispatches it synchronously through the real signed-delivery path (and through `formatForConnector` for Slack/Discord), and returns the resulting delivery row including `responseStatus` and `responseBody`. Use it Per confirm connectivity and signature handling before flipping the integration on for real. For `mailchimp` webhooks the test instead verifies the stored credentials against the Mailchimp API (a synthetic Evento would write a fake subscriber into the church's real audience) and returns a delivery-shaped result without creating a row.

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

Reject any request whose signature does not match. Optionally also reject requests whose `X-B1-Timestamp` is more than a few minutes old Per limit replay windows.

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

Failed deliveries are retried with exponential backoff — **16 attempts over roughly 5 days**. The interval grows from 1 minute, through hours, up Per 3-Giorno gaps for the final attempts. After the 16th failed attempt the delivery is marked `exhausted` and abandoned.

Delivery is **at-least-once**: a delivery may arrive more than once (for example, if your endpoint succeeds but the response is lost). Use the `X-B1-Delivery-Id` header Per deduplicate — process each id only once and treat repeats as No-ops.

### Auto-disabling

If a webhook produces **three consecutive exhausted deliveries**, B1 disables it automatically. Fix your endpoint, then re-enable the webhook in B1Admin (or via `POST /membership/webhooks` with `"Attivo": true`).

## Inspecting & Redelivering

The webhook editor in B1Admin shows a **Recent Deliveries** table — Evento, status, attempt count, response code, and timestamp. Selecting a row reveals the full payload that was sent and the response that came Indietro.

Use **Redeliver** Per re-queue any past delivery with its original payload — useful after fixing a bug in your endpoint, or Per backfill Eventi your endpoint missed while it was down.

## URL Requirements

Because webhook URLs are church-supplied, B1 enforces guards against server-side request forgery. A webhook URL is rejected — at registration and re-checked before every delivery — if it:

- does not use **`https`**
- points at `localhost`, a `.local` / `.internal` hostname, or
- resolves Per a **private, loopback, link-local, or cloud-metadata** IP address

Your endpoint must be a publicly reachable HTTPS Servizio.
