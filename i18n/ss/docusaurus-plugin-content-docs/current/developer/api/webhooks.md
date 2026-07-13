---
title: "Ema-Webhook"
---

# Ema-Webhook

<div class="article-intro">

Ema-Webhook avumela libandla kutfumela tatiso tesikhatsi lesiphila kuma-thulusi elucezu lwesitsatfu — ema-platform ekutenta ngekutentekela (Zapier, Make, n8n), ema-CRM, ema-system emali, nobe nome ngiyiphi into levumela i-HTTP POST. Nangabe umuntfu, licembu, nobe likhaya lishintja ku-B1, i-B1 itfumela umtimba we-JSON losayinwe kuwo wonkhe umkhondvo lobhalisele lomcimbi.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Umphatsi welibandla lonemvumo ye-**Edit Church Settings** nguye lobhalisa futsi laphatse ema-webhook
- I-endpoint yakho lelamukelako kufanele ifinyeleleke nge-**HTTPS** ku-khelo leliyaziwa mphakatsi
- Yiba nendlela yekugcina imfihlo yekusayina ngekuphephile — ikhonjiswa kanye kuphela

</div>

## Sifundvo Lesibanti

Ema-Webhook a**phumako** kuphela: i-B1 iyahlaba i-endpoint yakho, wena awukayihlabi i-B1. Webhook ngayinye kubhalisa kwelibandla lelinye lokuhlanganisa i-URL yekuya, imfihlo yekusayina, kanye neluhla lwemicimbi lebhaliswelwe.

Kuletfulwa kusetjentiswa **i-outbox lecinile**: nangabe kwentekela umcimbi lobhaliswelwe, i-B1 ibhala umugca wekuletfulwa futsi umsebenti wangemuva u-POSTa emuva kwemzuzu lomunye kacishe. Kuletfulwa lokwehlulekile kuyaphindzwaphindzwa nge-backoff leyandzako. Akukho lokulahlekako nangabe kuletfulwa kunensiye nobe i-endpoint yakho ivalekile sikhashana.

## Kubhalisa I-Webhook

### Ku-B1Admin

Yendza ku **Settings → Webhooks → New Webhook**. Faka ligama, i-URL yekuya (payload URL), bese ukhetsa imicimbi lofuna kubhalisela yona. Nawugcina, **imfihlo yekusayina ikhonjiswa kanye kuphela** — kopisha ngekushesha bese uyigcina ne-integration yakho. Ayikaze ikhonjiswe futsi (ungayishintja ngemuva kwaloko, kepha awukwati kutfola leyekucala).

### Nge-API

Tonkhe ema-endpoint asendleleni lesisekelo se-module ye-Membership `/membership/webhooks` futsi adzinga nome i-JWT lesuka kumphatsi welibandla lonemvumo ye-`Settings / Edit`, **nobe [sikhiya se-API](./api-keys) lesakhelwe i-scope ye-`settings:write`**. Tindlela letifanako tiyawemukela kokubili. Yilokhu lokuvumela i-Zapier ne-Make kubhalisa ema-webhook egameni lelibandla nangabe i-Zap nobe i-scenario ivuliwe.

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

Imphendvulo yekwakha — futsi **kuphela** imphendvulo yekwakha — ifaka i-`secret`:

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

| Inchubo & Umkhondvo | Injongo |
|---|---|
| `GET /membership/webhooks` | Bala ema-webhook elibandla (imfihlo ayifakwa) |
| `GET /membership/webhooks/events` | Luhla lwematigama emicimbi lasesekile |
| `GET /membership/webhooks/:id` | Layisha i-webhook linye |
| `POST /membership/webhooks` | Akha (kute `id`) nobe buyeketa (ne-`id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Shintja imfihlo yekusayina; ibuyisela linani lelisha kanye kuphela |
| `DELETE /membership/webhooks/:id` | Sula webhook |
| `GET /membership/webhooks/:id/deliveries` | Kuletfulwa kwesikhashana lokwentekile kwe-webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Umtimba logcwele nemphendvulo yekuletfulwa kunye |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Faka kabusha kuletfulwa ku-cwecwe |

## Luhla Lwemicimbi

Emagama emicimbi alandzela sifanekiso `{entity}.{action}`. Tfola luhla loluphilako ku-`GET /membership/webhooks/events`.

| Umcimbi | Uvela nini |
|---|---|
| `person.created` | Umuntfu wengetiwe |
| `person.updated` | Umbhalo womuntfu washintjwa |
| `person.destroyed` | Umuntfu wesuliwe |
| `household.created` | Likhaya lengetiwe |
| `household.updated` | Likhaya lashintjwa |
| `household.destroyed` | Likhaya lesuliwe |
| `group.created` | Licembu lengetiwe |
| `group.updated` | Licembu lashintjwa |
| `group.destroyed` | Licembu lesuliwe |
| `group.member.added` | Umuntfu wengetwe elicenjeni |
| `group.member.removed` | Umuntfu wesuswe elicenjeni |
| `donation.created` | Sipho sibhalwe phansi — kufakwa ngesandla, ku-inthanethi, nobe kushintja kusuka ku-pending kuya ku-complete |
| `donation.updated` | Umbhalo wemnikelo uhleliwe |
| `attendance.recorded` | Kuvakasha kubhalwe phansi (kufakwa ngesandla nobe kungena) |
| `session.created` | Sigcawu lesisha sekubakhona sakhiwe (ngesandla nobe ngekutentekela ekungeneni kwekucala) |
| `form.submission.created` | Ifomu ifakwe |
| `event.created` | Umcimbi wekhalenda wengetiwe |
| `event.updated` | Umcimbi wekhalenda uhleliwe |
| `event.destroyed` | Umcimbi wekhalenda wesuliwe |

## Umumo Wemtimba

Kuletfulwa ngakunye ngu-HTTP `POST` lonemtimba we-JSON kanye naletihedla:

| Hedla | Incazelo |
|---|---|
| `Content-Type` | Njalo `application/json` |
| `X-B1-Event` | Ligama lemcimbi, sibonelo `person.created` |
| `X-B1-Delivery-Id` | I-id leyodvwa yalokuletfulwa lokutsite — sebentisa kususa lokuphindziwe |
| `X-B1-Signature` | Sayindvo ye-HMAC-SHA256 yemtimba loluhlata (buka ngentasi) |
| `X-B1-Timestamp` | Emasekondi e-Unix epoch ngesikhatsi sicelo sitfunyelwa |
| `User-Agent` | `B1-Webhooks/1.0` |

Umtimba usonga sitfo lesishintjile ku-envelope lencane:

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

Kwemicimbi ye-`*.destroyed`, i-`data` ifaka kuphela i-`id` ne-`churchId` yembhalo losuliwe.

## Tinhlobo Te-Connector

Umumo weletfulwa lovamile yi-envelope ye-JSON lengetulu — `connectorType: "standard"`. Ku-[Slack ne-Discord](/docs/b1-admin/integrations/slack-discord) yona injini yefanako ye-webhook itfumela umlayeto losimo se-chat lawomabhungane leyamukela ngalokujwayelekile:

| `connectorType` | Umtimba lotfunyelwe | Sebentisa nini |
|---|---|---|
| `"standard"` (levamile) | envelope ye-`{event, churchId, occurredAt, data}`, isayiniwe | Nawubhala integration yakho, nobe ukhomba ku-Zapier / Make / server yakho |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Nawutfumela ngalokugcwele ku-Slack Incoming Webhook URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Nawutfumela ngalokugcwele ku-Discord channel webhook URL |

Luhlobo lwe-connector luhlelwa ku-dropdown ye-**Connector Type** ku-webhook editor, nobe nge-`connectorType` ku-`POST /membership/webhooks` umtimba. Hedla lesayiniwe le-`X-B1-Signature` isatfunyelwa ekuletfulweni kwe-Slack/Discord (ziyayishaya indiva ngaphandle kwenkinga), ngako kuphindzela webhook ku-`standard` ngemuva kwaloko akudzingi kusayina kabusha.

## Kuhlola Kuletfulwa

Yonkhe i-webhook editor inenkhinobho ye-**Send Test Event** — sicelo se-API lesihambisana yi-`POST /membership/webhooks/:id/test`. Indlela yekuhlola yakha umtimba lozenzakalelo wemcimbi wekucala lobhaliswelwe, uwutfumela ngesikhatsi lesifanako ngendlela yangempela lesayiniwe (nange-`formatForConnector` yeSlack/Discord), futsi ibuyisela umugca weletfulwa lophumako lofaka i-`responseStatus` ne-`responseBody`. Sebentisa lokhu kucinisekisa kuhlangana kanye nekuphatsa kwesayindvo ngaphambi kwekuvula i-integration ngekwangempela.

## Kucinisekisa Tisayindvo

Njalo cinisekisa i-`X-B1-Signature` ngaphambi kwekwetsemba umtimba. Sayindvo yi-`sha256=` lelandzelwa yi-hex HMAC-SHA256 ye**umtimba losicelo loluhlata**, isayiniwe ngemfihlo yakho yekusayina. Ibale phindze ku-bytes lotitfolile — ungakaki uphindze u-serialize i-JSON lehlaziyiwe.

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

Yala nome ngusiphi sicelo lesayindvo yaso lengafani. Ngekukhetsa, yala futsi ticelo leti-`X-B1-Timestamp` yato indzala kunemizuzu lembalwa kuze kuncishiswe emathuba ekuphindzaphindzwa.

## Kusekelwa Yi-SDK

Kwe-Node.js, i-`@churchapps/integration-sdk` iletsa i-verifier lekhitiwe ne-middleware ye-Express lephatsa kubamba umtimba loluhlata, kuhlola sayindvo, kanye nekuhlatiya i-envelope ngenca yakho:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Bamba umtimba loluhlata ngaphambi kwekuhlatiya i-JSON — kuyadzingeka kuze sayindvo isacinisekiseke.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

I-SDK futsi ikhomba i-`WebhookVerifier.verify(secret, rawBody, signatureHeader)` kuma-runtime langasiwo e-Express (ema-function e-serverless, Fastify, njll.). Buka liphakheji ku-npm.

## Kuletfulwa Nekuphindzaphindza

I-endpoint yakho kufanele iphendvule nge-status ye-`2xx` ngekushesha lokukhona — ngalokuncomekile ngemuva kwekufaka umsebenti ku-cwecwe kuphela, hhayi ngemuva kwekuwucedza. Nome ngimuphi imphendvulo lengasiyo `2xx`, kwehluleka kwekuxhumana, nobe imphendvulo lensiye kuneme**sekondi lasi-10** kubalwa njengekuletfulwa lokwehlulekile.

Kuletfulwa lokwehlulekile kuyaphindzaphindzwa nge-backoff leyandzako — **emazamo langu-16 phindze emalanga lacishe lasihlanu**. Sikhala sikhula kusuka kumzuzu munye, sichubeka emahoreni, kuze kufike sikhala semalanga lamatsatfu kuma-zamo ekugcina. Ngemuva kwe-zamo lesi-16 lokwehlulekile, kuletfulwa kuphawulwa `exhausted` futsi kuyekwe.

Kuletfulwa **kungenteka kanyekanye nobe kaningi**: kuletfulwa kungafika ngetulu kwakanye (sibonelo, nangabe i-endpoint yakho iphumelela kepha imphendvulo ilahleke). Sebentisa hedla le-`X-B1-Delivery-Id` kususa lokuphindziwe — cwayisa i-id ngayinye kanye kuphela bese uphatsa lokuphindziwe njengalokungenzi lutfo.

### Kutivalela Kwako

Nangabe webhook ikhicita **kuletfulwa lokwehlulekile katsatfu lokulandzelanako**, i-B1 iyayivimbela ngekutentekela. Lungisa i-endpoint yakho, bese uphindze uvule webhook ku-B1Admin (nobe nge-`POST /membership/webhooks` ne-`"active": true`).

## Kuhlola Nekuphindza Kuletfula

I-webhook editor ku-B1Admin ikhombisa tafula le-**Recent Deliveries** — umcimbi, simo, sibalo semzamo, ikhodi yemphendvulo, kanye nesikhatsi. Kukhetsa umugca kuvela umtimba logcwele lotfunyelwe kanye nemphendvulo leyabuya.

Sebentisa **Redeliver** kufaka kabusha kuletfulwa nome ngusiphi kwakadzeni ngemtimba wako weveleni — kusita ngemuva kwekulungisa iphutsa ku-endpoint yakho, nobe kugcwalisa emicimbi i-endpoint yakho leyayingayitfoli ngesikhatsi ivalekile.

## Tidzingo Te-URL

Njengobe ema-URL ewebhook aniketwa libandla, i-B1 iphatsa kuvikela kumelene ne-server-side request forgery. I-URL ye-webhook iyalwa — ngesikhatsi sekubhalisa futsi kuhlolwa kabusha ngaphambi kwako konkhe kuletfulwa — nangabe:

- ayisebentisi **`https`**
- ikhomba ku-`localhost`, ligama lelisayithi le-`.local` / `.internal`, nobe
- iphetsa ku-khelo le-IP **elizimele, le-loopback, le-link-local, nobe le-cloud-metadata**

I-endpoint yakho kufanele ibe yinsita ye-HTTPS letfolakala mphakatsi.
