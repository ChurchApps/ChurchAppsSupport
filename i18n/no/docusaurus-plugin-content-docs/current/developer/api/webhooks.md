---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks lar en kirke dytte sanntidsvarsler til tredjepartsverktøy — automatiseringsplattformer (Zapier, Make, n8n), CRM-er, regnskapssystemer, eller hva som helst som aksepterer en HTTP POST. Når en person, gruppe eller husstand endres i B1, sender B1 en signert JSON-payload til hver URL som abonnerer på den hendelsen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En kirkadministrator med tillatelsen **Rediger kirkens innstillinger** registrerer og administrerer webhooks
- Mottaksslutpunktet ditt må være nåelig over **HTTPS** på en offentlig adresse
- Har en måte å lagre signeringshemmeligheten sikkert — den vises kun en gang

</div>

## Oversikt

Webhooks er **bare utgående**: B1 kaller slutpunktet ditt, du kaller ikke B1. Hver webhook er en per-kirke-abonnement bestående av en destinasjons-URL, en signeringshemmelighet og en liste over abonnerte hendelser.

Levering bruker en **vedvarende utkassboks**: når en abonnert hendelse oppstår, registrerer B1 en leveringsrad og en bakgrunnsarbeider POSTer den innen omtrent ett minutt. Mislykkede leveringer prøves på nytt med eksponentiell backoff. Ingenting går tapt hvis en levering er langsom eller slutpunktet ditt er kort nedetid.

## Registrering av en webhook

### I B1Admin

Gå til **Innstillinger → Utvikler → Webhooker → Ny webhook**. Oppgi et navn, payload-URL-en og velg hendelsene du vil abonnere på. Når du lagrer, vises **signeringshemmeligheten en gang** — kopier den umiddelbart og lagre den med integrasjonen din. Den vises aldri igjen (du kan rotere den senere, men du kan ikke hente originalen).

### Via API-et

Alle slutpunkter er under Medlemskapsmodulen basissøkestien `/membership/webhooks` og krever enten en JWT fra en kirkadministrator med tillatelsen `Settings / Edit`, **eller en [API-nøkkel](./api-keys) myntet med omfanget `settings:write`**. De samme rutene aksepterer begge deler. Dette er det som lar Zapier og Make registrere webhooks på kirkens vegne når en Zap eller scenario slås på.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — nye medlemmer",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

Opprettelsesresponsen — og **bare** opprettelsesresponsen — inkluderer `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — nye medlemmer",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Metode og bane | Formål |
|---|---|
| `GET /membership/webhooks` | Vis kirkens webhooks (hemmelighet utelatt) |
| `GET /membership/webhooks/events` | Katalogen over gyldige hendelsenesavn |
| `GET /membership/webhooks/:id` | Last en webhook |
| `POST /membership/webhooks` | Opprett (no `id`) eller oppdater (med `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rotér signeringshemmeligheten; returnerer den nye verdien en gang |
| `DELETE /membership/webhooks/:id` | Slett en webhook |
| `GET /membership/webhooks/:id/deliveries` | Nylige leveringsforsøk for en webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Full payload og svar for en levering |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Re-kø en levering |

## Hendelskatalog

Hendelsenesavn følger mønsteret `{entity}.{action}`. Hent den live listen fra `GET /membership/webhooks/events`.

| Hendelse | Lyder når |
|---|---|
| `person.created` | En person blir lagt til |
| `person.updated` | En personpost blir endret |
| `person.destroyed` | En person blir slettet |
| `household.created` | En husstand blir lagt til |
| `household.updated` | En husstand blir endret |
| `household.destroyed` | En husstand blir slettet |
| `group.created` | En gruppe blir lagt til |
| `group.updated` | En gruppe blir endret |
| `group.destroyed` | En gruppe blir slettet |
| `group.member.added` | En person blir lagt til en gruppe |
| `group.member.removed` | En person blir fjernet fra en gruppe |
| `donation.created` | En gave blir registrert — manuell oppføring, online eller overgang fra ventende → fullført |
| `donation.updated` | En gavepost blir redigert |
| `attendance.recorded` | Et besøk blir loggført (manuell oppføring eller innsjekking) |
| `session.created` | En ny oppmøtesesjon blir opprettet (manuelt eller automatisk ved første innsjekking) |
| `form.submission.created` | Et skjema blir sendt inn |
| `event.created` | En kalenderhendelse blir lagt til |
| `event.updated` | En kalenderhendelse blir redigert |
| `event.destroyed` | En kalenderhendelse blir slettet |

## Payload-format

Hver levering er en HTTP `POST` med en JSON-kropp og disse overskriftene:

| Overskrift | Beskrivelse |
|---|---|
| `Content-Type` | Alltid `application/json` |
| `X-B1-Event` | Hendelsenesnavnet, f.eks. `person.created` |
| `X-B1-Delivery-Id` | Unikt id for dette leveringsforsøket — bruk det til å deduplikere |
| `X-B1-Signature` | HMAC-SHA256-signatur av den råe kroppen (se under) |
| `X-B1-Timestamp` | Unix epok-sekunder når forespørselen ble sendt |
| `User-Agent` | `B1-Webhooks/1.0` |

Kroppen pakker den endrede ressursen i en liten konvolutt:

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

For `*.destroyed`-hendelser inneholder `data` bare `id` og `churchId` fra den slettede posten.

Hendelser hvis payloads refererer til andre poster etter id bærer også menneskelesesbare navn, løst ved leveringstid: `personName` og `groupName` på gruppmedlemskaphendelsene, `personName` på oppmøte-, gave- og listmedlemskaphendelsene, `groupName` på `session.created`, og `formName` (pluss `personName` når innmeldingen er knyttet til en person) på `form.submission.created`.

## Koblingtyper

Standardleverings-formatet er JSON-konvolutten ovenfor — `connectorType: "standard"`. For [Slack og Discord](/docs/b1-admin/integrations/slack-discord) omformer den samme webhookmotoren i stedet en chatformet melding som disse tjenestene aksepterer direkte:

| `connectorType` | Kropp sendt | Bruk når |
|---|---|---|
| `"standard"` (standard) | `{event, churchId, occurredAt, data}`-konvolutt, signert | Du skriver din egen integrasjon, eller peker på Zapier / Make / en tilpasset server |
| `"slack"` | `{ "text": "💝 Ny gave: $50.00" }` | Du poster direkte til en Slack inngående webhook-URL |
| `"discord"` | `{ "content": "💝 Ny gave: $50.00" }` | Du poster direkte til en Discord-kanal webhook-URL |
| `"mailchimp"` | n/a — koblingen kaller Mailchimp-API-et selv | Du ønsker [publikumssynk](/docs/b1-admin/integrations/services/mailchimp) uten noen URL å være vert for |

Koblingtypen er satt i **Koblingstype**-rullegardinen på webhook-redigeringen, eller via `connectorType` i `POST /membership/webhooks`-kroppen. Den signerte `X-B1-Signature`-overskriften sendes fortsatt for Slack/Discord-leveringer (de ignorerer den ufarlig), så bytte en webhook tilbake til `standard` senere krever ingen resignering.

Slack og Discord er rene kroppomformer — motoren POSTer fortsatt til den kirkefylkte URL-en. `mailchimp` er den første koblingen som i stedet eier hele HTTP-utvekslingen: per hendelse utsteder den autentiserte upsert/arkiv/tag-forespørsler mot Mailchimp-API-et (`MailchimpConnector.deliver`), og kredentialene (`{apiKey, audienceId}`) lagres AES-kryptert i `webhooks.connectorConfig`, skrivebeskyttet gjennom API-et. Mailchimp-webhooks aksepterer bare person-, gruppmedlemskap- og listmedlemskaphendelser; sparingen rutiner bekrefter nøkkelen og publikummet mot Mailchimp før godkjenning. Leveringsrader lagrer standardkonvolutten, så leveringsloggen viser hva B1 så ved siden av Mailchimp-svar. Umappet situasjoner (person uten e-post, hendelse med ingen kartlegging) fullføres som vellykkede med en `Skipped:`-svarskropp i stedet for å brenne nye forsøk.

## Test-leveringer

Hver webhook-editor har en **Send test-hendelse**-knapp — den tilsvarende API-anropet er `POST /membership/webhooks/:id/test`. Test-ruten bygger en syntetisk payload for den første abonnerte hendelsen, sender den gjennom den virkelige signerte-leveransebanen (og gjennom `formatForConnector` for Slack/Discord), og returnerer den resulterende leveringsraden inkludert `responseStatus` og `responseBody`. Bruk det for å bekrefte tilkoblingsplanen og signaturhåndtering før du slår integrasjonen på for det virkelige. For `mailchimp`-webhooks tester det i stedet de lagrede kredentialene mot Mailchimp-API-et (en syntetisk hendelse ville skrive en falsk abonnent til kirkens virkelige publikum) og returnerer et leveringsformet resultat uten å opprette en rad.

## Verifisering av signaturer

Alltid verifiser `X-B1-Signature` før du stoler på en payload. Signaturen er `sha256=` fulgt av det heksadesimale HMAC-SHA256 av **den råe forespørselskroppen** stilt med din signeringshemmelighet. Beregn den over bytene du mottok — ikke re-seralisér den analyserte JSON-en.

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

Avvis en forespørsel hvis signaturen ikke samsvarer. Valgfritt kan du også avvise forespørsler hvis `X-B1-Timestamp` er mer enn noen få minutter gammel for å begrense gjenspillingsvinduene.

## SDK-støtte

For Node.js, `@churchapps/integration-sdk` sender en typesert verifikator og en Express middleware som håndterer rå-kropp-registreringen, signaturkontrollen og konvolutt-analysen for deg:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Registrer den råe kroppen før JSON-parsing — nødvendig slik at signaturen fortsatt bekrefter.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("ny gave", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK-et eksponerer også `WebhookVerifier.verify(secret, rawBody, signatureHeader)` for non-Express runtimes (serverless-funksjoner, Fastify, osv.). Se pakken på npm.

## Levering og nye forsøk

Slutpunktet ditt bør svare med en `2xx`-status så fort som mulig — ideelt etter bare å kø arbeidet, ikke etter å behandle det. En non-`2xx`-svar, en tilkoblingsfeil, eller et svar som er tregere enn **10 sekunder** teller som en mislykket levering.

Mislykkede leveringer prøves på nytt med eksponentiell backoff — **16 forsøk over omtrent 5 dager**. Intervallet vokser fra 1 minutt, gjennom timer, opp til 3-dagers hull for de siste forsøkene. Etter det 16. mislykkede forsøket er leveringen merket `exhausted` og forlatt.

Leveringen er **minst en gang**: en levering kan ankomme mer enn en gang (for eksempel hvis slutpunktet ditt lykkes, men svaret går tapt). Bruk `X-B1-Delivery-Id`-overskriften for å deduplikere — behandle hver id bare en gang og behandle repetisjoner som no-ops.

### Auto-deaktivering

Hvis en webhook produserer **tre på rad uttømt leveringer**, deaktiverer B1 det automatisk. Rett årsaken, re-aktiver da webhoken i B1Admin (eller via `POST /membership/webhooks` med `"active": true`).

## Inspeksjon og genlevering

Webhook-editoren i B1Admin viser en **Nylige leveringer**-tabell — hendelse, status, forsøksantal, svarskode og tidsstempel. Valg av en rad avslører hele payloaden som ble sendt og svaret som kom tilbake.

Bruk **Genlevering** for å re-kø noen tidligere levering med dens originale payload — nyttig etter å ha fikset en feil i slutpunktet ditt, eller for å fylle bakgrunnshendelser slutpunktet ditt misset mens det var nede.

## URL-krav

Fordi webhook-URL-er kirkefylkte, håndhever B1 verner mot serverside-forespørselsmisbruk. En webhook-URL er avvist — ved registrering og re-kontrollert før hver levering — hvis den:

- bruker ikke **`https`**
- peker på `localhost`, et `.local` / `.internal` vertsnavn, eller
- løser til en **privat, loopback, link-local, eller cloud-metadata**-IP-adresse

Slutpunktet ditt må være en offentlig nåelig HTTPS-tjeneste.
