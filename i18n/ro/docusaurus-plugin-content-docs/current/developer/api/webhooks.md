---
title: "Webhookuri"
description: "Configurați webhook-uri în timp real din B1 Admin: înregistrați endpoint-uri, alegeți evenimentele, verificați semnăturile HMAC, gestionați reîncercările și retrimiteți payload-urile eșuate."
---

# Webhookuri

<div class="article-intro">

Webhookurile permit unei biserici să trimită notificări în timp real către instrumente de la terți: platforme de automatizare (Zapier, Make, n8n), CRM-uri, sisteme contabile sau orice serviciu care acceptă un HTTP POST. Când o persoană, un grup sau o gospodărie se modifică în B1, B1 trimite un payload JSON semnat către fiecare URL abonat la acel eveniment.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un administrator al bisericii cu permisiunea **Edit Church Settings** înregistrează și gestionează webhookurile
- Endpoint-ul de primire trebuie să fie accesibil prin **HTTPS**, la o adresă publică
- Pregătiți o modalitate de a stoca în siguranță secretul de semnare — acesta este afișat o singură dată

</div>

## Prezentare generală

Webhookurile sunt doar pentru trafic **de ieșire**: B1 apelează endpoint-ul dvs., dvs. nu apelați B1. Fiecare webhook este un abonament specific bisericii, format dintr-o adresă URL de destinație, un secret de semnare și o listă de evenimente la care se abonează.

Livrarea folosește un **outbox durabil**: când are loc un eveniment la care există un abonament, B1 înregistrează un rând de livrare, iar un proces de fundal trimite payload-ul prin POST în aproximativ un minut. Livrările eșuate sunt reîncercate cu backoff exponențial. Nimic nu se pierde dacă o livrare este lentă sau dacă endpoint-ul dvs. este indisponibil pentru scurt timp.

## Înregistrarea unui webhook

### În B1Admin

Mergeți la **Settings → Developer → Webhooks → New Webhook**. Introduceți un nume, adresa URL pentru payload și selectați evenimentele la care doriți să vă abonați. La salvare, **secretul de semnare este afișat o singură dată** — copiați-l imediat și stocați-l împreună cu integrarea. Nu va mai fi afișat niciodată (îl puteți roti ulterior, dar nu puteți recupera valoarea originală).

### Prin API

Toate endpoint-urile se află sub calea de bază a modulului Membership, `/membership/webhooks`, și necesită fie un JWT de la un administrator al bisericii cu permisiunea `Settings / Edit`, **fie o [cheie API](./api-keys.md) creată cu scope-ul `settings:write`**. Aceleași rute acceptă ambele variante. Acest lucru permite Zapier și Make să înregistreze webhookuri în numele bisericii atunci când un Zap sau un scenariu este activat.

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

Răspunsul la creare — și **doar** răspunsul la creare — include `secret`:

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

| Metodă și cale | Scop |
|---|---|
| `GET /membership/webhooks` | Listează webhookurile bisericii (secretul este omis) |
| `GET /membership/webhooks/events` | Catalogul numelor de evenimente valide |
| `GET /membership/webhooks/:id` | Încarcă un webhook |
| `POST /membership/webhooks` | Creează (fără `id`) sau actualizează (cu `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rotește secretul de semnare; returnează noua valoare o singură dată |
| `DELETE /membership/webhooks/:id` | Șterge un webhook |
| `GET /membership/webhooks/:id/deliveries` | Încercările recente de livrare pentru un webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload-ul complet și răspunsul pentru o livrare |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Pune din nou în coadă o livrare |

## Catalogul de evenimente

Numele evenimentelor urmează modelul `{entity}.{action}`. Obțineți lista actualizată de la `GET /membership/webhooks/events`.

| Eveniment | Se declanșează când |
|---|---|
| `person.created` | O persoană este adăugată |
| `person.updated` | Înregistrarea unei persoane este modificată |
| `person.destroyed` | O persoană este ștearsă |
| `household.created` | O gospodărie este adăugată |
| `household.updated` | O gospodărie este modificată |
| `household.destroyed` | O gospodărie este ștearsă |
| `group.created` | Un grup este adăugat |
| `group.updated` | Un grup este modificat |
| `group.destroyed` | Un grup este șters |
| `group.member.added` | O persoană este adăugată într-un grup |
| `group.member.removed` | O persoană este eliminată dintr-un grup |
| `donation.created` | O donație este înregistrată — introdusă manual, online sau la trecerea din pending → complete |
| `donation.updated` | O înregistrare de donație este editată |
| `attendance.recorded` | O prezență este înregistrată (introdusă manual sau prin check-in) |
| `session.created` | O nouă sesiune de prezență este creată (manual sau automat la primul check-in) |
| `form.submission.created` | Un formular este trimis |
| `event.created` | Un eveniment din calendar este adăugat |
| `event.updated` | Un eveniment din calendar este editat |
| `event.destroyed` | Un eveniment din calendar este șters |

## Formatul payload-ului

Fiecare livrare este un `POST` HTTP cu un corp JSON și următoarele anteturi:

| Antet | Descriere |
|---|---|
| `Content-Type` | Întotdeauna `application/json` |
| `X-B1-Event` | Numele evenimentului, de exemplu `person.created` |
| `X-B1-Delivery-Id` | Identificator unic pentru această încercare de livrare — folosiți-l pentru a elimina duplicatele |
| `X-B1-Signature` | Semnătura HMAC-SHA256 a corpului brut (vezi mai jos) |
| `X-B1-Timestamp` | Numărul de secunde Unix epoch la care a fost trimisă cererea |
| `User-Agent` | `B1-Webhooks/1.0` |

Corpul încapsulează resursa modificată într-un mic envelope:

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

Pentru evenimentele `*.destroyed`, `data` conține doar `id` și `churchId` ale înregistrării șterse.

Evenimentele ale căror payload-uri fac referire la alte înregistrări prin id includ și nume ușor de citit, rezolvate în momentul livrării: `personName` și `groupName` pentru evenimentele de apartenență la grup, `personName` pentru evenimentele de prezență, donație și apartenență la liste, `groupName` pentru `session.created` și `formName` (plus `personName` când trimiterea este legată de o persoană) pentru `form.submission.created`.

## Tipuri de conectori

Formatul implicit de livrare este envelope-ul JSON de mai sus — `connectorType: "standard"`. Pentru [Slack și Discord](/docs/b1-admin/integrations/slack-discord), același motor de webhook trimite în schimb un mesaj de tip chat, pe care aceste servicii îl acceptă direct:

| `connectorType` | Corp trimis | Utilizați atunci când |
|---|---|---|
| `"standard"` (implicit) | Envelope-ul `{event, churchId, occurredAt, data}`, semnat | Scrieți propria integrare sau indicați către Zapier / Make / un server personalizat |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Trimiteți direct către un URL de Incoming Webhook din Slack |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Trimiteți direct către un URL de webhook al unui canal Discord |
| `"mailchimp"` | n/a — conectorul apelează singur API-ul Mailchimp | Doriți [sincronizarea audienței](/docs/b1-admin/integrations/services/mailchimp) fără un URL pe care să îl găzduiți |

Tipul de conector se setează din lista **Connector Type** din editorul de webhook sau prin `connectorType` în corpul `POST /membership/webhooks`. Antetul semnat `X-B1-Signature` este trimis în continuare pentru livrările către Slack și Discord (ele îl ignoră fără efecte), astfel încât, dacă reveniți ulterior la `standard`, nu este nevoie de o nouă semnare.

Slack și Discord reprezintă doar o restructurare a corpului — motorul trimite în continuare prin POST către URL-ul furnizat de biserică. `mailchimp` este primul conector care gestionează singur schimbul HTTP: pentru fiecare eveniment, emite cereri autentificate de tip upsert/archive/tag către API-ul Mailchimp (`MailchimpConnector.deliver`), iar credențialele sale (`{apiKey, audienceId}`) sunt stocate criptate AES în `webhooks.connectorConfig`, fiind accesibile doar la scriere prin API. Webhookurile Mailchimp acceptă doar evenimente de tip persoană, membru de grup și membru de listă; ruta de salvare verifică cheia și audiența în Mailchimp înainte de a accepta configurația. Rândurile de livrare stochează envelope-ul standard, astfel încât jurnalul de livrări arată ce a văzut B1 alături de răspunsul Mailchimp. Situațiile nemapate (persoană fără e-mail, eveniment fără mapare) se finalizează ca reușite, cu un corp de răspuns `Skipped:`, în loc să consume reîncercări.

## Livrări de test

Fiecare editor de webhook are un buton **Send Test Event** — apelul API corespunzător este `POST /membership/webhooks/:id/test`. Ruta de test construiește un payload sintetic pentru primul eveniment abonat, îl trimite sincron prin calea reală de livrare semnată (și prin `formatForConnector` pentru Slack/Discord) și returnează rândul de livrare rezultat, inclusiv `responseStatus` și `responseBody`. Folosiți-o pentru a confirma conectivitatea și gestionarea semnăturii înainte de a activa integrarea pentru date reale. Pentru webhookurile `mailchimp`, testul verifică în schimb credențialele stocate față de API-ul Mailchimp (un eveniment sintetic ar scrie un abonat fals în audiența reală a bisericii) și returnează un rezultat de tip livrare, fără a crea un rând.

## Verificarea semnăturilor

Verificați întotdeauna `X-B1-Signature` înainte de a avea încredere într-un payload. Semnătura este `sha256=` urmat de HMAC-SHA256 în format hexazecimal al **corpului brut al cererii**, cu cheia secretului de semnare. Calculați-o pe octeții primiți — nu re-serializați JSON-ul parsat.

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

Respingeți orice cerere a cărei semnătură nu se potrivește. Opțional, respingeți și cererile al căror `X-B1-Timestamp` are mai mult de câteva minute, pentru a limita ferestrele de reluare a cererilor.

## Suport SDK

Pentru Node.js, `@churchapps/integration-sdk` include un verificator tipizat și un middleware pentru Express, care se ocupă de capturarea corpului brut, verificarea semnăturii și parsarea envelope-ului:

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

SDK-ul expune și `WebhookVerifier.verify(secret, rawBody, signatureHeader)` pentru runtime-uri care nu sunt Express (funcții serverless, Fastify etc.). Consultați pachetul pe npm.

## Livrare și reîncercări

Endpoint-ul dvs. ar trebui să răspundă cu un status `2xx` cât mai repede posibil — idealmente după ce a pus în coadă doar lucrul de făcut, nu după ce l-a procesat. Orice răspuns non-`2xx`, o eroare de conexiune sau un răspuns mai lent de **10 secunde** este considerat livrare eșuată.

Livrările eșuate sunt reîncercate cu backoff exponențial — **16 încercări în aproximativ 5 zile**. Intervalul crește de la 1 minut, trecând prin ore, până la pauze de 3 zile pentru ultimele încercări. După a 16-a încercare eșuată, livrarea este marcată ca `exhausted` și abandonată.

Livrarea este **cel puțin o dată**: o livrare poate ajunge de mai multe ori (de exemplu, dacă endpoint-ul dvs. reușește, dar răspunsul se pierde). Folosiți antetul `X-B1-Delivery-Id` pentru a elimina duplicatele — procesați fiecare id o singură dată și tratați repetările ca operațiuni fără efect.

### Dezactivarea automată

Dacă un webhook produce **trei livrări epuizate consecutive**, B1 îl dezactivează automat. Remediați endpoint-ul, apoi reactivați webhook-ul în B1Admin (sau prin `POST /membership/webhooks` cu `"active": true`).

## Inspectarea și retrimiterea

Editorul de webhook din B1Admin afișează un tabel **Recent Deliveries** — eveniment, status, numărul de încercări, codul de răspuns și data/ora. Selectarea unui rând afișează payload-ul complet trimis și răspunsul primit.

Folosiți **Redeliver** pentru a pune din nou în coadă orice livrare anterioară, cu payload-ul original — util după remedierea unui bug în endpoint-ul dvs. sau pentru a recupera evenimente pe care endpoint-ul nu le-a primit cât timp a fost indisponibil.

## Cerințe privind adresa URL

Deoarece adresele URL ale webhookurilor sunt furnizate de biserică, B1 aplică protecții împotriva falsificării cererilor pe partea serverului (SSRF). O adresă URL de webhook este respinsă — la înregistrare și din nou înainte de fiecare livrare — dacă:

- nu folosește **`https`**
- indică spre `localhost`, un nume de gazdă `.local` / `.internal` sau
- se rezolvă la o adresă IP privată, de loopback, link-local sau de metadate ale furnizorului de cloud

Endpoint-ul dvs. trebuie să fie un serviciu HTTPS accesibil public.
