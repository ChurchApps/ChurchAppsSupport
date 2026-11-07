---
title: "Webhook'ai"
description: "Nustatykite B1 Admin webhook'us: registruokite galinius taškus, pasirinkite įvykius, tikrinkite HMAC parašus ir iš naujo siųskite nepavykusius pranešimus."
---

# Webhook'ai

<div class="article-intro">

Webhook'ai leidžia bažnyčiai siųsti tiesioginius pranešimus trečiųjų šalių įrankiams: automatizavimo platformoms (Zapier, Make, n8n), CRM sistemoms, apskaitos sistemoms ar bet kuriam įrankiui, kuris priima HTTP POST užklausas. Kai B1 sistemoje pasikeičia asmuo, grupė ar namų ūkis, B1 išsiunčia pasirašytą JSON duomenų paketą kiekvienam URL, prenumeruojančiam tą įvykį.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Webhook'us registruoja ir tvarko bažnyčios administratorius, turintis leidimą **Redaguoti bažnyčios nustatymus**
- Jūsų gavimo galinis taškas turi būti pasiekiamas per **HTTPS** viešu adresu
- Turėkite būdą saugiai saugoti pasirašymo paslaptį, nes ji rodoma tik vieną kartą

</div>

## Apžvalga

Webhook'ai veikia tik **išeinamuoju** būdu: B1 kviečia jūsų galinį tašką, o ne jūs – B1. Kiekvienas webhook'as yra atskira bažnyčios prenumerata, kurią sudaro paskirties URL, pasirašymo paslaptis ir prenumeruojamų įvykių sąrašas.

Pristatymui naudojama **patvari išsiuntimo eilė (outbox)**: kai įvyksta prenumeruojamas įvykis, B1 įrašo pristatymo eilutę, o fono procesas ją per maždaug minutę išsiunčia POST užklausa. Nepavykę pristatymai kartojami su eksponentiniu laukimo didėjimu. Nieko nepražūsta, jei pristatymas užtrunka arba jūsų galinis taškas trumpam nepasiekiamas.

## Webhook'o registravimas

### B1Admin

Eikite į **Nustatymai → Kūrėjui → Webhook'ai → Naujas webhook'as**. Įveskite pavadinimą, pranešimo URL ir pasirinkite prenumeruojamus įvykius. Išsaugojus, **pasirašymo paslaptis rodoma tik vieną kartą**. Nedelsdami ją nukopijuokite ir saugokite kartu su savo integracija. Ji niekada nebebus rodoma (vėliau galite ją pakeisti, bet pradinės paslapties atgauti negalėsite).

### Per API

Visi galiniai taškai yra po Membership modulio bazinio kelio `/membership/webhooks` ir reikalauja arba JWT iš bažnyčios administratoriaus, turinčio leidimą `Settings / Edit`, **arba [API rakto](./api-keys.md), sukurto su `settings:write` apimtimi**. Tie patys maršrutai priima abu. Tai leidžia Zapier ir Make registruoti webhook'us bažnyčios vardu, kai įjungiamas Zap ar scenarijus.

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

Sukūrimo atsakymas (ir **tik** sukūrimo atsakymas) apima `secret`:

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

| Metodas ir kelias | Paskirtis |
|---|---|
| `GET /membership/webhooks` | Išvardyti bažnyčios webhook'us (paslaptis nepateikiama) |
| `GET /membership/webhooks/events` | Galiojančių įvykių pavadinimų katalogas |
| `GET /membership/webhooks/:id` | Įkelti vieną webhook'ą |
| `POST /membership/webhooks` | Sukurti (be `id`) arba atnaujinti (su `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Pakeisti pasirašymo paslaptį; naują reikšmę grąžina vieną kartą |
| `DELETE /membership/webhooks/:id` | Ištrinti webhook'ą |
| `GET /membership/webhooks/:id/deliveries` | Naujausi pristatymo bandymai šiam webhook'ui |
| `GET /membership/webhooks/deliveries/:deliveryId` | Pilnas vieno pristatymo duomenų paketas ir atsakymas |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Iš naujo įtraukti pristatymą į eilę |

## Įvykių katalogas

Įvykių pavadinimai seka šabloną `{entity}.{action}`. Aktualų sąrašą gaukite iš `GET /membership/webhooks/events`.

| Įvykis | Įvyksta, kai |
|---|---|
| `person.created` | Asmuo pridedamas |
| `person.updated` | Asmens įrašas pakeičiamas |
| `person.destroyed` | Asmuo ištrinamas |
| `household.created` | Namų ūkis pridedamas |
| `household.updated` | Namų ūkis pakeičiamas |
| `household.destroyed` | Namų ūkis ištrinamas |
| `group.created` | Grupė sukuriama |
| `group.updated` | Grupė pakeičiama |
| `group.destroyed` | Grupė ištrinama |
| `group.member.added` | Asmuo pridedamas į grupę |
| `group.member.removed` | Asmuo pašalinamas iš grupės |
| `donation.created` | Auka užregistruojama: įvesta rankiniu būdu, internetu arba perėjus iš laukiamos į užbaigtą būseną |
| `donation.updated` | Aukos įrašas redaguojamas |
| `attendance.recorded` | Apsilankymas užregistruojamas (rankiniu būdu arba registracijos metu) |
| `session.created` | Sukuriama nauja lankomumo sesija (rankiniu būdu arba automatiškai per pirmąją registraciją) |
| `form.submission.created` | Forma pateikiama |
| `event.created` | Kalendoriaus renginys pridedamas |
| `event.updated` | Kalendoriaus renginys redaguojamas |
| `event.destroyed` | Kalendoriaus renginys ištrinamas |

## Duomenų paketo formatas

Kiekvienas pristatymas yra HTTP `POST` užklausa su JSON turiniu ir šiomis antraštėmis:

| Antraštė | Aprašymas |
|---|---|
| `Content-Type` | Visada `application/json` |
| `X-B1-Event` | Įvykio pavadinimas, pvz., `person.created` |
| `X-B1-Delivery-Id` | Unikalus šio pristatymo bandymo identifikatorius. Naudokite jį dublikatams atpažinti |
| `X-B1-Signature` | HMAC-SHA256 parašas nuo neapdoroto turinio (žr. žemiau) |
| `X-B1-Timestamp` | Unix epochos sekundės, kai užklausa buvo išsiųsta |
| `User-Agent` | `B1-Webhooks/1.0` |

Turinys pakeistą išteklių įpakuoja į nedidelį voką (envelope):

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

Įvykiams `*.destroyed` `data` apima tik ištrinto įrašo `id` ir `churchId`.

Įvykiai, kurių duomenų paketai nurodo kitus įrašus pagal id, taip pat pateikia žmogui suprantamus pavadinimus, kurie nustatomi pristatymo metu: `personName` ir `groupName` grupės narystės įvykiuose, `personName` lankomumo, aukų ir sąrašo narystės įvykiuose, `groupName` `session.created` įvykyje, o `formName` (ir `personName`, jei pateikimas susietas su asmeniu) `form.submission.created` įvykyje.

## Jungčių tipai

Numatytasis pristatymo formatas yra aukščiau aprašytas JSON vokas: `connectorType: "standard"`. [Slack ir Discord](/docs/b1-admin/integrations/slack-discord) atveju tas pats webhook variklis vietoj to siunčia pokalbio formato pranešimą, kurį šios paslaugos priima tiesiogiai:

| `connectorType` | Siunčiamas turinys | Naudokite, kai |
|---|---|---|
| `"standard"` (numatytasis) | `{event, churchId, occurredAt, data}` vokas, pasirašytas | Kuriate savo integraciją arba nukreipiate į Zapier / Make ar savo serverį |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Siunčiate tiesiai į Slack Incoming Webhook URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Siunčiate tiesiai į Discord kanalo webhook URL |
| `"mailchimp"` | netaikoma: jungtis pati kviečia Mailchimp API | Norite [auditorijos sinchronizacijos](/docs/b1-admin/integrations/services/mailchimp) be URL, kurį reikėtų talpinti |

Jungties tipas nustatomas išskleidžiamajame sąraše **Connector Type** webhook redaktoriuje arba per `connectorType` `POST /membership/webhooks` turinyje. Pasirašyta `X-B1-Signature` antraštė vis tiek siunčiama Slack ir Discord pristatymams (jie ją nekenksmingai ignoruoja), todėl vėliau perjungus webhook'ą atgal į `standard`, nereikia jo pasirašyti iš naujo.

Slack ir Discord atveju keičiamas tik turinio formatas: variklis vis tiek siunčia POST užklausą į bažnyčios nurodytą URL. `mailchimp` yra pirmoji jungtis, kuri pati valdo savo HTTP apsikeitimą: kiekvienam įvykiui ji siunčia autentifikuotas upsert, archyvavimo ir žymų užklausas į Mailchimp API (`MailchimpConnector.deliver`). Jos prisijungimo duomenys (`{apiKey, audienceId}`) saugomi `webhooks.connectorConfig` lauke, užšifruoti AES algoritmu, ir per API yra tik rašomi. Mailchimp webhook'ai priima tik asmens, grupės narių ir sąrašo narių įvykius. Išsaugojimo maršrutas prieš priimdamas patikrina raktą ir auditoriją Mailchimp sistemoje. Pristatymo eilutėse saugomas standartinis vokas, todėl pristatymų žurnale matyti, ką B1 matė, kartu su Mailchimp atsakymu. Situacijos, kurių nepavyksta susieti (asmuo be el. pašto adreso, įvykis be atitikmens), užbaigiamos kaip sėkmingos su `Skipped:` atsakymo turiniu, o ne eikvoja pakartojimus.

## Bandomieji pristatymai

Kiekvienas webhook redaktorius turi mygtuką **Siųsti bandomąjį įvykį**. Atitinkamas API kvietimas yra `POST /membership/webhooks/:id/test`. Bandymo maršrutas sukuria sintetinį duomenų paketą pirmajam prenumeruojamam įvykiui, sinchroniškai jį išsiunčia per tikrąjį pasirašyto pristatymo kelią (Slack ir Discord atveju, taip pat per `formatForConnector`) ir grąžina gautą pristatymo eilutę, įskaitant `responseStatus` ir `responseBody`. Naudokite jį ryšiui ir parašo tvarkymui patikrinti, prieš tikrai įjungiant integraciją. `mailchimp` webhook'ams bandymas vietoj to patikrina saugomus prisijungimo duomenis Mailchimp API. Sintetinis įvykis į tikrą bažnyčios auditoriją įrašytų netikrą prenumeratorių, todėl bandymas grąžina pristatymo formos rezultatą, bet eilutės nekuria.

## Parašų tikrinimas

Visada patikrinkite `X-B1-Signature` prieš pasitikėdami duomenų paketu. Parašas yra `sha256=`, po kurio eina šešioliktainis HMAC-SHA256 **neapdoroto užklausos turinio**, užkoduoto jūsų pasirašymo paslaptimi. Skaičiuokite jį nuo gautų baitų. Neserializuokite iš naujo išanalizuoto JSON.

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

Atmeskite bet kurią užklausą, kurios parašas nesutampa. Pasirinktinai taip pat atmeskite užklausas, kurių `X-B1-Timestamp` yra senesnis nei keletas minučių, kad apribotumėte pakartojimo (replay) langą.

## SDK palaikymas

Node.js atveju `@churchapps/integration-sdk` pateikia tipizuotą tikrintuvą ir Express tarpinę programinę įrangą, kuri už jus tvarko neapdoroto turinio fiksavimą, parašo patikrinimą ir voko analizę:

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

SDK taip pat pateikia `WebhookVerifier.verify(secret, rawBody, signatureHeader)` ne Express aplinkoms (serverless funkcijoms, Fastify ir pan.). Daugiau informacijos rasite npm ppakete.

## Pristatymas ir pakartojimai

Jūsų galinis taškas turėtų kuo greičiau atsakyti `2xx` statusu, idealiai po to, kai tik įtraukė darbą į eilę, o ne po jo apdorojimo. Bet koks ne `2xx` atsakymas, ryšio klaida arba atsakymas, lėtesnis nei **10 sekundžių**, laikomas nepavykusiu pristatymu.

Nepavykę pristatymai kartojami su eksponentiniu laukimo didėjimu: **16 bandymų per maždaug 5 dienas**. Intervalas auga nuo 1 minutės, per valandas, iki 3 dienų tarpų paskutiniams bandymams. Po 16-o nepavykusio bandymo pristatymas pažymimas kaip `exhausted` ir atmetamas.

Pristatymas yra **bent kartą** (at-least-once): pristatymas gali atkeliauti daugiau nei vieną kartą, pavyzdžiui, jei jūsų galinis taškas sėkmingai apdoroja užklausą, bet atsakymas prarandamas. Naudokite `X-B1-Delivery-Id` antraštę dublikatams atpažinti. Apdorokite kiekvieną identifikatorių tik vieną kartą, o kartotinius pristatymus traktuokite kaip nieko nedarančius.

### Automatinis išjungimas

Jei webhook'as sukuria **tris iš eilės `exhausted` pristatymus**, B1 jį automatiškai išjungia. Ištaisykite savo galinį tašką, tada vėl įjunkite webhook'ą B1Admin (arba per `POST /membership/webhooks` su `"active": true`).

## Peržiūra ir pakartotinis pristatymas

Webhook redaktorius B1Admin rodo lentelę **Naujausi pristatymai**: įvykį, būseną, bandymų skaičių, atsakymo kodą ir laiko žymę. Pasirinkus eilutę, matomas visas išsiųstas duomenų paketas ir gautas atsakymas.

Naudokite **Pakartoti pristatymą**, kad iš naujo įtrauktumėte bet kurį ankstesnį pristatymą su pradiniu duomenų paketu. Tai naudinga, kai ištaisote klaidą savo galiniame taške arba norite atkurti įvykius, kuriuos jūsų galinis taškas praleido, kol buvo nepasiekiamas.

## URL reikalavimai

Kadangi webhook URL nurodo bažnyčia, B1 taiko apsaugas nuo serverio pusės užklausų klastojimo (SSRF). Webhook URL atmetamas (registruojant ir prieš kiekvieną pristatymą iš naujo tikrinant), jei jis:

- nenaudoja **`https`**
- nukreipia į `localhost`, `.local` / `.internal` pavadinimą arba
- išsprendžiamas į **privatų, loopback, link-local ar debesijos metaduomenų** IP adresą

Jūsų galinis taškas turi būti viešai pasiekiama HTTPS paslauga.
