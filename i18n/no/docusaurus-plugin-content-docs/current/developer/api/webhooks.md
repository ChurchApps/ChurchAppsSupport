---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks lar en kirke sende sanntidsvarsler til tredjepartsverktøy — automatiseringsplattformer (Zapier, Make, n8n), CRM-er, regnskapssystemer, eller hva som helst som tar imot en HTTP POST. Når en person, gruppe eller husholdning endres i B1, sender B1 en signert JSON-nyttelast til hver URL som er abonnert på den hendelsen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En kirkeadministrator med tillatelsen **Rediger kirkeinnstillinger** registrerer og administrerer webhooks
- Mottaksendepunktet ditt må være tilgjengelig over **HTTPS** på en offentlig adresse
- Ha en måte å lagre signeringshemmeligheten sikkert på — den vises bare én gang

</div>

## Oversikt

Webhooks er kun **utgående**: B1 kaller endepunktet ditt, du kaller ikke B1. Hver webhook er et abonnement per kirke som består av en mål-URL, en signeringshemmelighet og en liste over abonnerte hendelser.

Levering bruker en **holdbar utboks**: når en abonnert hendelse inntreffer, registrerer B1 en leveringsrad, og en bakgrunnsarbeider sender den med POST innen omtrent ett minutt. Mislykkede leveringer forsøkes på nytt med eksponentiell tilbaketrekking. Ingenting går tapt hvis en levering er treg eller endepunktet ditt er nede en kort stund.

## Registrere en webhook

### I B1Admin

Gå til **Innstillinger → Utvikler → Webhooks → Ny webhook**. Skriv inn et navn, nyttelast-URL-en, og velg hendelsene du vil abonnere på. Ved lagring **vises signeringshemmeligheten én gang** — kopier den umiddelbart og lagre den sammen med integrasjonen din. Den vises aldri igjen (du kan rotere den senere, men du kan ikke hente den opprinnelige).

### Via API-et

Alle endepunkter ligger under Membership-modulens grunnsti `/membership/webhooks` og krever enten en JWT fra en kirkeadministrator med tillatelsen `Settings / Edit`, **eller en [API-nøkkel](./api-keys) utstedt med omfanget `settings:write`**. De samme rutene godtar begge deler. Dette er det som lar Zapier og Make registrere webhooks på kirkens vegne når en Zap eller et scenario slås på.

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

Opprettelsessvaret — og **bare** opprettelsessvaret — inkluderer `secret`:

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

| Metode og sti | Formål |
|---|---|
| `GET /membership/webhooks` | List opp kirkens webhooks (hemmelighet utelatt) |
| `GET /membership/webhooks/events` | Katalogen over gyldige hendelsesnavn |
| `GET /membership/webhooks/:id` | Last inn én webhook |
| `POST /membership/webhooks` | Opprett (uten `id`) eller oppdater (med `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Roter signeringshemmeligheten; returnerer den nye verdien én gang |
| `DELETE /membership/webhooks/:id` | Slett en webhook |
| `GET /membership/webhooks/:id/deliveries` | Nylige leveringsforsøk for en webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Fullstendig nyttelast og respons for én levering |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Sett en levering i kø på nytt |

## Hendelseskatalog

Hendelsesnavn følger mønsteret `{entity}.{action}`. Hent den gjeldende listen fra `GET /membership/webhooks/events`.

| Hendelse | Utløses når |
|---|---|
| `person.created` | En person legges til |
| `person.updated` | En personpost endres |
| `person.destroyed` | En person slettes |
| `household.created` | En husholdning legges til |
| `household.updated` | En husholdning endres |
| `household.destroyed` | En husholdning slettes |
| `group.created` | En gruppe legges til |
| `group.updated` | En gruppe endres |
| `group.destroyed` | En gruppe slettes |
| `group.member.added` | En person legges til i en gruppe |
| `group.member.removed` | En person fjernes fra en gruppe |
| `donation.created` | En gave registreres — manuell registrering, nettbasert, eller overgangen fra ventende til fullført |
| `donation.updated` | En donasjonspost redigeres |
| `attendance.recorded` | Et besøk logges (manuell registrering eller innsjekking) |
| `session.created` | En ny oppmøteøkt opprettes (manuelt eller automatisk ved første innsjekking) |
| `form.submission.created` | Et skjema sendes inn |
| `event.created` | En kalenderhendelse legges til |
| `event.updated` | En kalenderhendelse redigeres |
| `event.destroyed` | En kalenderhendelse slettes |

## Nyttelastformat

Hver levering er en HTTP `POST` med en JSON-kropp og disse headerne:

| Header | Beskrivelse |
|---|---|
| `Content-Type` | Alltid `application/json` |
| `X-B1-Event` | Hendelsesnavnet, f.eks. `person.created` |
| `X-B1-Delivery-Id` | Unik ID for dette leveringsforsøket — bruk den til deduplisering |
| `X-B1-Signature` | HMAC-SHA256-signatur av den rå kroppen (se nedenfor) |
| `X-B1-Timestamp` | Unix epoch-sekunder da forespørselen ble sendt |
| `User-Agent` | `B1-Webhooks/1.0` |

Kroppen pakker den endrede ressursen inn i en liten konvolutt:

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

For `*.destroyed`-hendelser inneholder `data` bare `id` og `churchId` for den slettede posten.

Hendelser hvis nyttelaster refererer til andre poster med ID, bærer også lesbare navn, løst opp ved leveringstidspunktet: `personName` og `groupName` på gruppemedlemskapshendelser, `personName` på oppmøte-, donasjons- og listemedlemskapshendelser, `groupName` på `session.created`, og `formName` (pluss `personName` når innsendingen er knyttet til en person) på `form.submission.created`.

## Koblingstyper

Standard leveringsformat er JSON-konvolutten ovenfor — `connectorType: "standard"`. For [Slack og Discord](/docs/b1-admin/integrations/slack-discord) sender den samme webhook-motoren i stedet en chat-formet melding som disse tjenestene godtar direkte:

| `connectorType` | Kropp som sendes | Bruk når |
|---|---|---|
| `"standard"` (standard) | `{event, churchId, occurredAt, data}`-konvolutt, signert | Du skriver din egen integrasjon, eller peker på Zapier / Make / en egendefinert server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Du poster direkte til en Slack Incoming Webhook-URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Du poster direkte til en Discord-kanal-webhook-URL |

Koblingstypen angis i rullegardinmenyen **Connector Type** i webhook-redigeringsverktøyet, eller via `connectorType` i kroppen til `POST /membership/webhooks`. Den signerte `X-B1-Signature`-headeren sendes fortsatt for Slack/Discord-leveringer (de ignorerer den harmløst), så det kreves ingen ny signering hvis du bytter en webhook tilbake til `standard` senere.

## Testleveringer

Hvert webhook-redigeringsverktøy har en **Send Test Event**-knapp — det tilsvarende API-kallet er `POST /membership/webhooks/:id/test`. Testruten bygger en syntetisk nyttelast for den første abonnerte hendelsen, sender den synkront gjennom den virkelige signerte leveringsbanen (og gjennom `formatForConnector` for Slack/Discord), og returnerer den resulterende leveringsraden inkludert `responseStatus` og `responseBody`. Bruk den til å bekrefte tilkobling og signaturhåndtering før du slår integrasjonen på for godt.

## Verifisere signaturer

Bekreft alltid `X-B1-Signature` før du stoler på en nyttelast. Signaturen er `sha256=` etterfulgt av hex-HMAC-SHA256 av den **rå forespørselskroppen**, nøklet med signeringshemmeligheten din. Beregn den over bytene du mottok — ikke serialiser den parsede JSON-en på nytt.

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

Avvis enhver forespørsel hvis signatur ikke stemmer. Du kan valgfritt også avvise forespørsler der `X-B1-Timestamp` er mer enn noen få minutter gammel, for å begrense mulighetsvinduet for gjenspilling.

## SDK-støtte

For Node.js leverer `@churchapps/integration-sdk` en typet verifikator og en Express-mellomvare som håndterer fangst av den rå kroppen, signatursjekk og konvoluttparsing for deg:

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

SDK-et eksponerer også `WebhookVerifier.verify(secret, rawBody, signatureHeader)` for kjøretidsmiljøer uten Express (serverløse funksjoner, Fastify, osv.). Se pakken på npm.

## Levering og nye forsøk

Endepunktet ditt bør svare med en `2xx`-status så raskt som mulig — helst rett etter at arbeidet er satt i kø, ikke etter at det er behandlet. Enhver respons som ikke er `2xx`, en tilkoblingsfeil, eller en respons som er tregere enn **10 sekunder**, telles som en mislykket levering.

Mislykkede leveringer forsøkes på nytt med eksponentiell tilbaketrekking — **16 forsøk over omtrent 5 dager**. Intervallet vokser fra 1 minutt, gjennom flere timer, opp til 3-dagers mellomrom for de siste forsøkene. Etter det 16. mislykkede forsøket blir leveringen merket `exhausted` og forlatt.

Levering skjer **minst én gang**: en levering kan komme mer enn én gang (for eksempel hvis endepunktet ditt lykkes, men responsen går tapt). Bruk `X-B1-Delivery-Id`-headeren til deduplisering — behandle hver ID bare én gang, og behandle gjentakelser som ingen-operasjoner.

### Automatisk deaktivering

Hvis en webhook produserer **tre påfølgende utmattede leveringer**, deaktiverer B1 den automatisk. Fiks endepunktet ditt, og aktiver deretter webhooken på nytt i B1Admin (eller via `POST /membership/webhooks` med `"active": true`).

## Inspisere og levere på nytt

Webhook-redigeringsverktøyet i B1Admin viser en tabell med **nylige leveringer** — hendelse, status, antall forsøk, svarkode og tidsstempel. Hvis du velger en rad, vises den fullstendige nyttelasten som ble sendt, og svaret som kom tilbake.

Bruk **Levere på nytt** for å sette enhver tidligere levering i kø på nytt med sin opprinnelige nyttelast — nyttig etter at du har fikset en feil i endepunktet ditt, eller for å etterfylle hendelser endepunktet ditt gikk glipp av mens det var nede.

## URL-krav

Fordi webhook-URL-er leveres av kirken, håndhever B1 vern mot server-side request forgery. En webhook-URL avvises — ved registrering og sjekket på nytt før hver levering — hvis den:

- ikke bruker **`https`**
- peker på `localhost`, et `.local`- / `.internal`-vertsnavn, eller
- løses til en **privat, loopback, link-lokal, eller sky-metadata**-IP-adresse

Endepunktet ditt må være en offentlig tilgjengelig HTTPS-tjeneste.
