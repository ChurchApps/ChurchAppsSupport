---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks lar en kirke skyve sanntidsmeldinger til tredjeparts verktøy -- automasjonsplattformer (Zapier, Make, n8n), CRM-er, regnskapssystemer eller hva som helst som tar imot en HTTP POST. Når en person, gruppe eller husstand endres i B1, sender B1 en signert JSON-last til hver URL som er abonnert på den hendelsen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En kirkeadmin med tillatelsen **Rediger kirkekonstruksjoner** registrerer og administrerer webhooks
- Mottakersluttpunktet ditt må være nåbart over **HTTPS** på en offentlig adresse
- Ha en måte å lagre signeringshemmeligheten på sikkert -- den vises bare en gang

</div>

## Oversikt

Webhooks er **kun utgående**: B1 kaller sluttpunktet ditt, du kaller ikke B1. Hver webhook er et per-kirke abonnement som består av en destinasjons-URL, en signeringshemmelighet og en liste over abonnerte hendelser.

Levering bruker en **holdbar utboks**: når en abonnert hendelse oppstår, registrerer B1 en leveringsrad og en bakgrunnsarbeider POSTer den innen omtrent ett minutt. Mislykkede leveringer blir forsøkt på nytt med eksponensiell backoff. Ingenting går tapt hvis en levering er langsom eller sluttpunktet ditt er kortvarig nede.

## Registrering av en webhook

### I B1Admin

Gå til **Innstillinger → Webhooks → Ny Webhook**. Skriv inn et navn, nyttelast-URL og velg hendelsene du vil abonnere på. Ved lagring vises **signeringshemmeligheten en gang** -- kopier den umiddelbart og lagre den med integrasjonen. Den vises aldri igjen (du kan rotere den senere, men du kan ikke hente originalen).

### Via API-en

Alle sluttpunkter er under medlemskapsmodulens basisvei `/membership/webhooks` og krever enten en JWT fra en kirkeadmin med tillatelsen `Innstillinger / Rediger`, **eller en [API-nøkkel](./api-keys) preget med `settings:write`-omfanget**. De samme rutene aksepterer begge. Dette er det som gjør at Zapier og Make kan registrere webhooks på kirkens vegne når en Zap eller scenario slås på.

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

Opprettelsesresponsen -- og **bare** opprettelsesresponsen -- inkluderer `secret`:

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

| Metode og vei | Formål |
|---|---|
| `GET /membership/webhooks` | Vis kirkens webhooks (hemmelighet utelatt) |
| `GET /membership/webhooks/events` | Katalogen over gyldige hendelsesnavn |
| `GET /membership/webhooks/:id` | Last en webhook |
| `POST /membership/webhooks` | Opprett (ingen `id`) eller oppdater (med `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Roter signeringshemmeligheten; returnerer den nye verdien en gang |
| `DELETE /membership/webhooks/:id` | Slett en webhook |
| `GET /membership/webhooks/:id/deliveries` | Nylige leveringsforsøk for en webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Full last og respons for en levering |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Omstill en levering |

## Hendelsesk katalog

Hendelsenavnet følger mønsteret `{entity}.{action}`. Hent den aktuelle listen fra `GET /membership/webhooks/events`.

| Hendelse | Utløses når |
|---|---|
| `person.created` | En person blir lagt til |
| `person.updated` | En personpost er endret |
| `person.destroyed` | En person blir slettet |
| `household.created` | En husstand blir lagt til |
| `household.updated` | En husstand blir endret |
| `household.destroyed` | En husstand blir slettet |
| `group.created` | En gruppe blir lagt til |
| `group.updated` | En gruppe blir endret |
| `group.destroyed` | En gruppe blir slettet |
| `group.member.added` | En person blir lagt til en gruppe |
| `group.member.removed` | En person blir fjernet fra en gruppe |
| `donation.created` | En gave blir registrert -- manuell oppføring, nettbasert eller ventende → fullstending overgang |
| `donation.updated` | En donasjonpost blir redigert |
| `attendance.recorded` | Et besøk blir logget (manuell oppføring eller sjekk-inn) |
| `session.created` | En ny frammøtesesjon blir opprettet (manuelt eller auto ved første sjekk-inn) |
| `form.submission.created` | Et skjema blir sendt |
| `event.created` | En kalenderhendelse blir lagt til |
| `event.updated` | En kalenderhendelse blir redigert |
| `event.destroyed` | En kalenderhendelse blir slettet |

## Lastnytteformat

Hver levering er en HTTP `POST` med en JSON-kropp og disse hodene:

| Hode | Beskrivelse |
|---|---|
| `Content-Type` | Alltid `application/json` |
| `X-B1-Event` | Hendelsenavnet, f.eks. `person.created` |
| `X-B1-Delivery-Id` | Unik id for dette leveringsforsøket -- bruk det til deduplicering |
| `X-B1-Signature` | HMAC-SHA256 signatur av raw body (se nedenfor) |
| `X-B1-Timestamp` | Unix epoch sekunder når forespørselen ble sendt |
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

For `*.destroyed`-hendelser inneholder `data` bare `id` og `churchId` for den slettede posten.

## Koblingstyper

Standardleveringsformatet er JSON-konvolutten ovenfor -- `connectorType: "standard"`. For [Slack og Discord](/docs/b1-admin/integrations/slack-discord) poster webhook-motoren i stedet en chat-formet melding som disse tjenestene godtar direkte:

| `connectorType` | Kropp sendt | Bruk når |
|---|---|---|
| `"standard"` (standard) | `{event, churchId, occurredAt, data}` konvolutt, signert | Du skriver din egen integrasjon, eller peker på Zapier / Make / en egendefinert server |
| `"slack"` | `{ "text": "💝 Ny donasjon: $50.00" }` | Du poster direkte til en Slack Incoming Webhook URL |
| `"discord"` | `{ "content": "💝 Ny donasjon: $50.00" }` | Du poster direkte til en Discord kanal-webhook URL |

Koblingstypen angis i rullegardinmenyen **Koblingtype** på webhook-editoren, eller via `connectorType` i `POST /membership/webhooks`-kroppen. Det signerte `X-B1-Signature`-hodet sendes fortsatt for Slack/Discord-leveringer (de ignorerer det harmløst), så hvis du bytter webhook tilbake til `standard` senere kreves ingen signering på nytt.

## Testleveringer

Hver webhook-editor har en **Send testegenskap**-knapp -- det tilsvarende API-kallet er `POST /membership/webhooks/:id/test`. Testruten bygger en syntetisk last for den første abonnerte hendelsen, dispatcher den synkront gjennom den virkelige signerte leveringsbanen (og gjennom `formatForConnector` for Slack/Discord) og returnerer den resulterende leveringsraden inkludert `responseStatus` og `responseBody`. Bruk den til å bekrefte tilkoblinger og signaturhåndtering før du slår integrasjonen på for reelt.

## Verifisering av signaturer

Bekreft alltid `X-B1-Signature` før du stoler på en last. Signaturen er `sha256=` fulgt av den hex HMAC-SHA256 av den **raw request body** tastet med signeringshemmeligheten din. Beregn det over bytene du mottok -- ikke serieller JSON på nytt.

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

Avvis enhver forespørsel hvis signaturen ikke samsvarer. Du kan også eventuelt avvise forespørsler hvis `X-B1-Timestamp` er mer enn et par minutter gammel for å begrense gjenskrift av vinduer.

## SDK-støtte

For Node.js leverer `@churchapps/integration-sdk` en typet bekrefter og en Express-melding som håndterer raw-body-oppdageringen, signaturkontroll og konvolutteanalyse for deg:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Fang raw body før JSON-analyse -- nødvendig slik at signaturen fortsatt bekrefter seg selv.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK-en eksponerer også `WebhookVerifier.verify(secret, rawBody, signatureHeader)` for ikke-Express-kjøretider (serverløse funksjoner, Fastify, osv.). Se pakken på npm.

## Levering og omforsøk

Sluttpunktet ditt bør svare med en `2xx`-status så raskt som mulig -- helst etter bare å ha stilt arbeidet i kø, ikke etter å ha behandlet det. Enhver ikke-`2xx`-respons, tilkoblingsfeil eller respons som er sakte enn **10 sekunder** regnes som en mislykket levering.

Mislykkede leveringer blir forsøkt på nytt med eksponensiell backoff -- **16 forsøk over omtrent 5 dager**. Intervallet vokser fra 1 minutt, gjennom timer, opp til 3-dagers avstander for de siste forsøkene. Etter det 16. mislykkede forsøket blir leveringen merket `exhausted` og oppgitt.

Levering er **minst-en gang**: en levering kan komme mer enn en gang (for eksempel hvis sluttpunktet ditt lykkes men responsen er tapt). Bruk `X-B1-Delivery-Id`-hodet til deduplicering -- behandle hver id bare en gang og behandle repetisjoner som no-ops.

### Auto-deaktivering

Hvis en webhook produserer **tre påfølgende utslittete leveringer**, deaktiverer B1 den automatisk. Rett sluttpunktet, og reaktiver deretter webhook i B1Admin (eller via `POST /membership/webhooks` med `"active": true`).

## Inspeksjon og omleveringer

Webhook-editoren i B1Admin viser en **Nylige leveringer**-tabell -- hendelse, status, forsøkstall, svarskode og tidsstempel. Hvis du velger en rad vises den fullstendige lasten som ble sendt og svaret som kom tilbake.

Bruk **Omlevering** til å omsignalere enhver tidligere levering med dens opprinnelige last -- nyttig etter å ha fikset en feil i sluttpunktet ditt, eller for å fylle ut hendelser som sluttpunktet ditt gikk glipp av mens det var nede.

## URL-krav

Fordi webhook-URLer leveres av kirken, håndhever B1 vakter mot server-side request forgery. En webhook-URL blir avvist -- ved registrering og sjekket på nytt før hver levering -- hvis den:

- bruker ikke **`https`**
- peker på `localhost`, et `.local` / `.internal` vertsnavn, eller
- løses til en **privat, loopback, link-lokal eller cloud-metadata** IP-adresse

Sluttpunktet ditt må være en offentlig nåbar HTTPS-tjeneste.
