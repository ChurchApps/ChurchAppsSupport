---
title: "Mga Webhook"
---

# Mga Webhook

<div class="article-intro">

Ang mga webhook ay nagpapahintulot sa isang simbahan na mag-push ng real-time na mga notification sa mga third-party na tool — mga automation platform (Zapier, Make, n8n), mga CRM, mga accounting system, o anumang tumatanggap ng HTTP POST. Kapag nagbago ang isang tao, grupo, o sambahayan sa B1, ang B1 ay nagpapadala ng signed na JSON payload sa bawat URL na naka-subscribe sa kaganapang iyon.

</div>

<div class="prereqs">
<h4>Bago Kayo Magsimula</h4>

- Ang isang church admin na may pahintulot na **Edit Church Settings** ay nagrerehistro at namamahala ng mga webhook
- Ang inyong receiving endpoint ay dapat maaabot sa **HTTPS** sa isang pampublikong address
- Magkaroon ng paraan upang itago ang signing secret nang ligtas — ipinakikita ito nang isang beses lamang

</div>

## Pangkalahatang Tanawin

Ang mga webhook ay **outbound** lamang: ang B1 ay tumatawag sa inyong endpoint, hindi kayo tumatawag sa B1. Ang bawat webhook ay isang per-church na subscription na binubuo ng isang destination URL, isang signing secret, at isang listahan ng mga naka-subscribe na kaganapan.

Ang paghahatid ay gumagamit ng **durable outbox**: kapag nangyari ang isang naka-subscribe na kaganapan, ang B1 ay nagtatalang ng delivery row at ang isang background worker ay nagpo-POST nito sa loob ng humigit-kumulang isang minuto. Ang mga nabigong paghahatid ay sinusubukan muli na may exponential backoff. Walang nawawala kung mabagal ang paghahatid o panandaliang down ang inyong endpoint.

## Pagpaparehistro ng Webhook

### Sa B1Admin

Pumunta sa **Settings → Webhooks → New Webhook**. Maglagay ng pangalan, ang payload URL, at piliin ang mga kaganapan kung saan mag-subscribe. Sa pag-save, ang **signing secret ay ipinapakita nang isang beses** — kopyahin ito kaagad at itago ito sa inyong integration. Hindi na ito muling ipapakita (maaari ninyong i-rotate ito mamaya, ngunit hindi ninyo mababawi ang orihinal).

### Sa Pamamagitan ng API

Ang lahat ng endpoint ay nasa ilalim ng Membership module base path `/membership/webhooks` at nangangailangan alinman ng JWT mula sa isang church admin na may pahintulot na `Settings / Edit`, **o isang [API key](./api-keys) na ginawa na may `settings:write` scope**. Ang parehong mga route ay tumatanggap ng pareho. Ito ang nagbibigay-daan sa Zapier at Make na magrehistro ng mga webhook sa ngalan ng simbahan kapag ang isang Zap o scenario ay pinaganda.

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

Ang create response — at **lamang** ang create response — ay naglalaman ng `secret`:

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

| Method & Path | Layunin |
|---|---|
| `GET /membership/webhooks` | I-list ang mga webhook ng simbahan (walang secret) |
| `GET /membership/webhooks/events` | Ang katalogo ng mga valid na pangalan ng kaganapan |
| `GET /membership/webhooks/:id` | Mag-load ng isang webhook |
| `POST /membership/webhooks` | Lumikha (walang `id`) o mag-update (na may `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | I-rotate ang signing secret; ibinabalik ang bagong halaga nang isang beses |
| `DELETE /membership/webhooks/:id` | Burahin ang isang webhook |
| `GET /membership/webhooks/:id/deliveries` | Mga kamakailang pagtatangka sa paghahatid para sa isang webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Buong payload at response para sa isang paghahatid |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Muling i-queue ang isang paghahatid |

## Katalogo ng Kaganapan

Ang mga pangalan ng kaganapan ay sumusunod sa pattern na `{entity}.{action}`. Kunin ang live na listahan mula sa `GET /membership/webhooks/events`.

| Kaganapan | Umaapoy kapag |
|---|---|
| `person.created` | Isang tao ay idinagdag |
| `person.updated` | Ang rekord ng tao ay binago |
| `person.destroyed` | Isang tao ay binura |
| `household.created` | Isang sambahayan ay idinagdag |
| `household.updated` | Ang sambahayan ay binago |
| `household.destroyed` | Ang sambahayan ay binura |
| `group.created` | Isang grupo ay idinagdag |
| `group.updated` | Ang grupo ay binago |
| `group.destroyed` | Ang grupo ay binura |
| `group.member.added` | Isang tao ay idinagdag sa grupo |
| `group.member.removed` | Isang tao ay inalis sa grupo |
| `donation.created` | Isang kaloob ay naitala — manual entry, online, o ang paglipat mula pending → complete |
| `donation.updated` | Isang tala ng donasyon ay na-edit |
| `attendance.recorded` | Isang pagbisita ay naitala (manual entry o check-in) |
| `session.created` | Isang bagong attendance session ay nalikha (manu-mano o awtomatiko sa unang check-in) |
| `form.submission.created` | Isang form ay naisumite |
| `event.created` | Isang kalendaryong kaganapan ay idinagdag |
| `event.updated` | Isang kalendaryong kaganapan ay na-edit |
| `event.destroyed` | Isang kalendaryong kaganapan ay binura |

## Format ng Payload

Ang bawat paghahatid ay isang HTTP `POST` na may JSON body at mga header na ito:

| Header | Paglalarawan |
|---|---|
| `Content-Type` | Laging `application/json` |
| `X-B1-Event` | Ang pangalan ng kaganapan, hal. `person.created` |
| `X-B1-Delivery-Id` | Natatanging id para sa pagtatangkang ito sa paghahatid — gamitin ito upang mag-deduplicate |
| `X-B1-Signature` | HMAC-SHA256 signature ng raw body (tingnan sa ibaba) |
| `X-B1-Timestamp` | Unix epoch seconds kapag ipinadala ang request |
| `User-Agent` | `B1-Webhooks/1.0` |

Ang body ay nakabalot sa nabagong resource sa isang maliit na envelope:

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

Para sa mga kaganapan ng `*.destroyed`, ang `data` ay naglalaman lamang ng `id` at `churchId` ng binurang rekord.

Ang mga kaganapan na ang payload ay tumutukoy sa ibang mga rekord sa pamamagitan ng id ay nagdadala rin ng mga pangalang madaling basahin ng tao, na na-resolve sa oras ng paghahatid: `personName` at `groupName` sa mga kaganapan ng group membership, `personName` sa mga kaganapan ng attendance, donation, at list membership, `groupName` sa `session.created`, at `formName` (kasama ang `personName` kapag ang submission ay nakatali sa isang tao) sa `form.submission.created`.

## Mga Uri ng Connector

Ang default na format ng paghahatid ay ang JSON envelope sa itaas — `connectorType: "standard"`. Para sa [Slack at Discord](/docs/b1-admin/integrations/slack-discord) ang parehong webhook engine ay sa halip ay nag-po-post ng isang chat-shaped na mensahe na direktang tinatanggap ng mga serbisyong iyon:

| `connectorType` | Body na ipinapadala | Gamitin kapag |
|---|---|---|
| `"standard"` (default) | Envelope na `{event, churchId, occurredAt, data}`, naka-sign | Gumagawa kayo ng sariling integration, o tumuturo sa Zapier / Make / isang custom server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Direktang nagpo-post kayo sa isang Slack Incoming Webhook URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Direktang nagpo-post kayo sa isang Discord channel webhook URL |

Ang connector type ay itinatakda sa **Connector Type** dropdown sa webhook editor, o sa pamamagitan ng `connectorType` sa `POST /membership/webhooks` body. Ang naka-sign na `X-B1-Signature` header ay ipinapadala pa rin para sa mga paghahatid sa Slack/Discord (binabalewala nila ito nang hindi nakakasama), kaya ang paglipat ng isang webhook pabalik sa `standard` mamaya ay hindi na nangangailangan ng muling pag-sign.

## Mga Test na Paghahatid

Bawat webhook editor ay may **Send Test Event** button — ang katumbas na API call ay `POST /membership/webhooks/:id/test`. Ang test route ay bumubuo ng isang synthetic na payload para sa unang naka-subscribe na kaganapan, ipinapadala ito nang synchronous sa pamamagitan ng aktwal na signed-delivery path (at sa pamamagitan ng `formatForConnector` para sa Slack/Discord), at ibinabalik ang resultang delivery row kabilang ang `responseStatus` at `responseBody`. Gamitin ito upang kumpirmahin ang konektibidad at ang paghawak ng signature bago buksan ang integration para sa totoong paggamit.

## Pag-verify ng mga Signature

Laging i-verify ang `X-B1-Signature` bago pagkatiwalaan ang isang payload. Ang signature ay `sha256=` na sinusundan ng hex HMAC-SHA256 ng **raw na request body** na kinakabitan ng inyong signing secret. I-compute ito sa mga byte na inyong natanggap — huwag muling i-serialize ang parsed na JSON.

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

Tanggihan ang anumang request na ang signature ay hindi tumutugma. Opsyonal ding tanggihan ang mga request na ang `X-B1-Timestamp` ay higit sa ilang minuto ang tanda upang limitahan ang mga replay window.

## SDK Support

Para sa Node.js, ang `@churchapps/integration-sdk` ay may kasamang typed verifier at isang Express middleware na humahawak ng raw-body capture, signature check, at envelope parsing para sa inyo:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Kunin ang raw body bago ang JSON parsing — kinakailangan upang mag-verify pa rin ang signature.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

Ang SDK ay nagpapakita rin ng `WebhookVerifier.verify(secret, rawBody, signatureHeader)` para sa mga non-Express runtime (serverless functions, Fastify, atbp.). Tingnan ang package sa npm.

## Paghahatid at Mga Retry

Ang inyong endpoint ay dapat tumugon ng `2xx` status nang mabilis hangga't maaari — ideal pagkatapos lamang ng pag-queue ng trabaho, hindi pagkatapos ng pagproseso nito. Ang anumang hindi `2xx` na response, pagkabigo sa koneksyon, o response na mas mabagal sa **10 segundo** ay binibilang bilang nabigong paghahatid.

Ang mga nabigong paghahatid ay sinusubukan muli na may exponential backoff — **16 na pagtatangka sa humigit-kumulang 5 araw**. Ang interval ay lumalaki mula 1 minuto, sa pamamagitan ng mga oras, hanggang sa 3-araw na agwat para sa mga huling pagtatangka. Pagkatapos ng ika-16 na nabigong pagtatangka, ang paghahatid ay minarkahan na `exhausted` at inabandona.

Ang paghahatid ay **at-least-once**: ang isang paghahatid ay maaaring dumating nang higit sa isang beses (halimbawa, kung ang inyong endpoint ay nagtagumpay ngunit ang response ay nawala). Gamitin ang `X-B1-Delivery-Id` header upang mag-deduplicate — iproseso ang bawat id nang isang beses lamang at tratuhin ang mga pag-uulit bilang no-op.

### Auto-disabling

Kung ang isang webhook ay gumagawa ng **tatlong sunud-sunod na exhausted na paghahatid**, ang B1 ay awtomatikong nag-disable nito. Ayusin ang inyong endpoint, pagkatapos ay muling paganahin ang webhook sa B1Admin (o sa pamamagitan ng `POST /membership/webhooks` na may `"active": true`).

## Pag-inspect at Muling Paghahatid

Ang webhook editor sa B1Admin ay nagpapakita ng **Recent Deliveries** na talahanayan — kaganapan, status, bilang ng pagtatangka, response code, at timestamp. Ang pagpili ng isang row ay nagbubunyag ng buong payload na ipinadala at ang response na bumalik.

Gamitin ang **Redeliver** upang muling i-queue ang anumang nakaraang paghahatid na may orihinal na payload — kapaki-pakinabang pagkatapos ayusin ang isang bug sa inyong endpoint, o upang mag-backfill ng mga kaganapan na namiss ng inyong endpoint habang ito ay down.

## Mga Kinakailangan sa URL

Dahil ang mga URL ng webhook ay ibinibigay ng simbahan, ang B1 ay nagpapatupad ng mga guards laban sa server-side request forgery. Ang isang URL ng webhook ay tinatanggihan — sa pagpaparehistro at muling sinusuri bago ng bawat paghahatid — kung ito ay:

- hindi gumagamit ng **`https`**
- tumuturo sa `localhost`, isang `.local` / `.internal` na hostname, o
- nare-resolve sa **private, loopback, link-local, o cloud-metadata** na IP address

Ang inyong endpoint ay dapat na isang publicly na maaabot na HTTPS service.
