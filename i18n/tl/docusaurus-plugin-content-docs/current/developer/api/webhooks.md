---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Ang mga Webhooks ay nagpapahintulot sa isang church na magpadala ng real-time notifications sa third-party tools — automation platforms (Zapier, Make, n8n), CRMs, accounting systems, o anumang tumatanggap ng HTTP POST. Kapag ang isang tao, grupo, o household ay nagbabago sa B1, ang B1 ay nagpapadala ng isang signed JSON payload sa bawat URL na naka-subscribe sa event na iyon.

</div>

<div class="prereqs">
<h4>Bago Kang Magsimula</h4>

- Isang church admin na may **Edit Church Settings** permission ay nag-register at namamahala ng mga webhooks
- Ang iyong receiving endpoint ay dapat na accessible sa **HTTPS** sa isang public address
- Magkaroon ng isang paraan upang secure na mag-store ang signing secret — ito ay ipinapakita lamang nang minsan

</div>

## Overview

Ang mga Webhooks ay **outbound** lamang: B1 ay tumatawag sa iyong endpoint, hindi mo tinawag ang B1. Bawat webhook ay isang per-church subscription na binubuo ng isang destination URL, isang signing secret, at isang listahan ng subscribed events.

Ang paghahatid ay gumagamit ng isang **durable outbox**: kapag ang isang subscribed event ay nangyayari, B1 ay nag-record ng isang delivery row at isang background worker ay POSTs ito sa loob ng humigit-kumulang na isang minuto. Ang mga nabigong deliveries ay muling sinusubok na may exponential backoff. Walang nawala kung ang isang delivery ay mabagal o ang iyong endpoint ay pansamantalang pababa.

## Pag-register ng Webhook

### Sa B1Admin

Pumunta sa **Settings → Developer → Webhooks → New Webhook**. Magpasok ng isang pangalan, ang payload URL, at pumili ng mga event na mag-subscribe. Sa save, ang **signing secret ay ipinapakita nang minsan** — kopyahin ito kaagad at ilagay ito sa iyong integration. Hindi ito kailanman ipapakita muli (maaari mong i-rotate ito mamaya, ngunit hindi mo makukuha ang orihinal).

### Sa pamamagitan ng API

Ang lahat ng endpoints ay nasa ilalim ng Membership module base path `/membership/webhooks` at nangangailangan ng alinman sa isang JWT mula sa isang church admin na may `Settings / Edit` permission, **o isang [API key](./api-keys) na mintado na may `settings:write` scope**. Ang parehong mga route ay tumatanggap sa pareho. Ito ang nagbibigay-daan sa Zapier at Make na mag-register ng mga webhooks sa ngalan ng church kapag ang isang Zap o scenario ay inilabas.

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

Ang create response — at **lamang** ang create response — ay may kasamang `secret`:

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
| `GET /membership/webhooks` | I-list ang mga webhook ng church (secret na inalis) |
| `GET /membership/webhooks/events` | Ang catalog ng valid event names |
| `GET /membership/webhooks/:id` | I-load ang isang webhook |
| `POST /membership/webhooks` | Lumikha (walang `id`) o i-update (na may `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | I-rotate ang signing secret; ibabalik ang bagong halaga nang minsan |
| `DELETE /membership/webhooks/:id` | Tanggalin ang webhook |
| `GET /membership/webhooks/:id/deliveries` | Mga kamakailang paghahatid na subok para sa webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Buong payload at response para sa isang paghahatid |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Muling i-queue ang isang paghahatid |

## Event Catalog

Ang mga event names ay sumusunod sa pattern `{entity}.{action}`. I-fetch ang live list mula sa `GET /membership/webhooks/events`.

| Event | Fires when |
|---|---|
| `person.created` | Isang tao ay idinagdag |
| `person.updated` | Ang tao record ay binago |
| `person.destroyed` | Isang tao ay natanggal |
| `household.created` | Isang household ay idinagdag |
| `household.updated` | Ang household ay nabago |
| `household.destroyed` | Isang household ay natanggal |
| `group.created` | Isang grupo ay idinagdag |
| `group.updated` | Ang grupo ay nabago |
| `group.destroyed` | Isang grupo ay natanggal |
| `group.member.added` | Isang tao ay idinagdag sa isang grupo |
| `group.member.removed` | Isang tao ay inalis mula sa isang grupo |
| `donation.created` | Isang regalo ay naitala — manual entry, online, o ang pending → complete transition |
| `donation.updated` | Ang donation record ay nag-edit |
| `attendance.recorded` | Isang pagbisita ay naka-log (manual entry o check-in) |
| `session.created` | Isang bagong attendance session ay nilikha (manu-mano o auto sa unang check-in) |
| `form.submission.created` | Isang form ay isinumite |
| `event.created` | Isang calendar event ay idinagdag |
| `event.updated` | Isang calendar event ay nag-edit |
| `event.destroyed` | Isang calendar event ay natanggal |

## Payload Format

Bawat paghahatid ay isang HTTP `POST` na may isang JSON body at ang mga headers na ito:

| Header | Description |
|---|---|
| `Content-Type` | Laging `application/json` |
| `X-B1-Event` | Ang event name, halimbawa `person.created` |
| `X-B1-Delivery-Id` | Natatanging id para sa attempt ng paghahatid na ito — gamitin ito upang mag-deduplicate |
| `X-B1-Signature` | HMAC-SHA256 signature ng raw body (tingnan sa ibaba) |
| `X-B1-Timestamp` | Unix epoch seconds kapag ipinadala ang request |
| `User-Agent` | `B1-Webhooks/1.0` |

Ang body ay bumalot sa binagong resource sa isang maliit na envelope:

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

Para sa `*.destroyed` events, ang `data` ay naglalaman lamang ng `id` at `churchId` ng natanggal na record.

Ang mga event na ang mga payload ay sumusuporta sa ibang mga record sa pamamagitan ng id ay nagdadala din ng mga human-readable na pangalan, na nalutas sa oras ng paghahatid: `personName` at `groupName` sa mga group membership events, `personName` sa attendance, donation, at list membership events, `groupName` sa `session.created`, at `formName` (kasama ang `personName` kapag ang submission ay nakatali sa isang tao) sa `form.submission.created`.

## Connector Types

Ang default na delivery format ay ang JSON envelope sa itaas — `connectorType: "standard"`. Para sa [Slack and Discord](/docs/b1-admin/integrations/slack-discord) ang parehong webhook engine ay nagpo-post ng isang chat-shaped message na ang mga serbisyo na ito ay tumatanggap direkta:

| `connectorType` | Body sent | Use when |
|---|---|---|
| `"standard"` (default) | `{event, churchId, occurredAt, data}` envelope, signed | Ikaw ay nagsusulat ng iyong sariling integration, o nakatutok sa Zapier / Make / isang custom server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Ikaw ay naglalahad direkta sa isang Slack Incoming Webhook URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Ikaw ay naglalahad direkta sa isang Discord channel webhook URL |
| `"mailchimp"` | n/a — ang connector ay tumatawag sa Mailchimp's API mismo | Gusto mo ng [audience sync](/docs/b1-admin/integrations/services/mailchimp) nang walang URL na i-host |

Ang connector type ay nakatakda sa **Connector Type** dropdown sa webhook editor, o sa pamamagitan ng `connectorType` sa `POST /membership/webhooks` body. Ang signed `X-B1-Signature` header ay pa rin ipinapadala para sa Slack/Discord deliveries (hindi nila ito pinahahalagahan), kaya ang pagsisimula ng webhook pabalik sa `standard` mamaya ay hindi nangangailangan ng muling pag-sign.

Ang Slack at Discord ay purong body reshapes — ang engine ay pa rin POSTs sa church-supplied URL. Ang `mailchimp` ay ang una na connector na sa halip na nag-own ng kanya na HTTP exchange: bawat event ay naglalabas ito ng authenticated upsert/archive/tag requests laban sa Mailchimp's API (`MailchimpConnector.deliver`), at ang mga credentials nito (`{apiKey, audienceId}`) ay naka-store AES-encrypted sa `webhooks.connectorConfig`, write-only sa pamamagitan ng API. Ang mga Mailchimp webhooks ay tumatanggap lamang ng tao, group-member, at list-member events; ang save route ay nag-verify ng key at audience laban sa Mailchimp bago tanggapin. Ang mga delivery rows ay nag-store ng standard envelope, kaya ang delivery log ay nagpapakita kung ano ang nakita ng B1 kasama ng response ng Mailchimp. Ang mga unmapped na sitwasyon (tao na walang email, event na walang mapping) ay nagtatapos bilang successful na may `Skipped:` response body sa halip na masusunog ang retries.

## Test Deliveries

Bawat webhook editor ay may **Send Test Event** button — ang kaugnay na API call ay `POST /membership/webhooks/:id/test`. Ang test route ay bumubuo ng synthetic payload para sa unang subscribed event, dispatch ito sa pamamagitan ng tunay na signed-delivery path (at sa pamamagitan ng `formatForConnector` para sa Slack/Discord), at nagbabalik ng nagreresultang delivery row na may kasamang `responseStatus` at `responseBody`. Gamitin ito upang kumpirmahin ang connectivity at signature handling bago i-flip ang integration on para sa tunay. Para sa `mailchimp` webhooks ang test ay sa halip ay nag-verify ng stored credentials laban sa Mailchimp API (ang isang synthetic event ay magsusulat ng isang fake subscriber sa tunay na audience ng church) at nagbabalik ng isang delivery-shaped result nang walang lumilikha ng row.

## Pagsusuri ng Mga Signature

Laging i-verify ang `X-B1-Signature` bago magtiwala sa isang payload. Ang signature ay `sha256=` na sinusundan ng hex HMAC-SHA256 ng **raw request body** na may key na iyong signing secret. Kalkulahin ito sa mga byte na iyong natanggap — huwag muling i-serialize ang parsed JSON.

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

Tanggihan ang anumang request na ang signature ay hindi tumugma. Opsyonal din na tanggihan ang mga request na ang `X-B1-Timestamp` ay higit sa ilang minuto ng lumang upang limitahan ang replay windows.

## SDK Support

Para sa Node.js, ang `@churchapps/integration-sdk` ay naghahatid ng isang typed verifier at isang Express middleware na sumasagot sa raw-body capture, signature check, at envelope parsing para sa iyo:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Kunin ang raw body bago ang JSON parsing — kinakailangan upang ang signature ay manatiling nag-verify.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

Ang SDK ay nagbalanse din ng `WebhookVerifier.verify(secret, rawBody, signatureHeader)` para sa non-Express runtimes (serverless functions, Fastify, atbp.). Tingnan ang package sa npm.

## Delivery & Retries

Ang iyong endpoint ay dapat tumugon na may `2xx` status kasing bilis ng posible — ideyal pagkatapos lamang ng pag-queue ng trabaho, hindi pagkatapos ng pagproseso. Anumang non-`2xx` response, isang failure ng koneksyon, o isang response na mas mabagal kaysa **10 seconds** ay tumutok bilang isang nabigong paghahatid.

Ang mga nabigong deliveries ay muling sinusubok na may exponential backoff — **16 attempts sa loob ng humigit-kumulang 5 days**. Ang interval ay lumalaki mula 1 minuto, sa pamamagitan ng mga oras, hanggang sa 3-day na mga agwat para sa mga final na pagsubok. Pagkatapos ng ika-16 na nabigong pagsubok ang paghahatid ay minarkahan `exhausted` at iniwan.

Ang paghahatid ay **at-least-once**: ang isang paghahatid ay maaaring dumating nang higit sa minsan (halimbawa, kung ang iyong endpoint ay successful ngunit ang response ay nawala). Gamitin ang `X-B1-Delivery-Id` header upang mag-deduplicate — iproseso ang bawat id lamang nang minsan at tratuhin ang repeats bilang no-ops.

### Auto-disabling

Kung ang isang webhook ay gumagawa ng **tatlong sunod-sunod na nakaubos na deliveries**, B1 ay awtomatikong nag-disable nito. I-ayos ang iyong endpoint, pagkatapos ay muling i-enable ang webhook sa B1Admin (o sa pamamagitan ng `POST /membership/webhooks` na may `"active": true`).

## Pagsusuri at Paghahatid Muli

Ang webhook editor sa B1Admin ay nagpapakita ng **Recent Deliveries** table — event, status, attempt count, response code, at timestamp. Ang pagpili ng isang row ay nagbubunyag ng buong payload na ipinadala at ang response na bumalik.

Gamitin ang **Redeliver** upang muling i-queue ang anumang nakaraang paghahatid na may kanya na orihinal na payload — kapaki-pakinabang pagkatapos ayusin ang isang bug sa iyong endpoint, o upang mag-backfill ng mga event na ang iyong endpoint ay nawala habang ito ay pababa.

## URL Requirements

Dahil ang mga webhook URL ay church-supplied, B1 ay nag-enforce ng mga guards laban sa server-side request forgery. Ang isang webhook URL ay tinatanggihan — sa pagpaparehistro at nire-check muli bago ang bawat paghahatid — kung ito:

- ay hindi gumagamit ng **`https`**
- puntos sa `localhost`, isang `.local` / `.internal` hostname, o
- nalulutas sa isang **private, loopback, link-local, o cloud-metadata** IP address

Ang iyong endpoint ay dapat na isang publicly reachable HTTPS service.
