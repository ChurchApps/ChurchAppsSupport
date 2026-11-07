---
title: "Webhooks"
description: "Opsæt realtids-webhooks fra B1 Admin: registrer endpoints, vælg hændelser, verificer HMAC-signaturer, håndter gentagelsesforsøg og send fejlede payloads igen."
---

# Webhooks

<div class="article-intro">

Med webhooks kan en kirke sende realtidsnotifikationer til tredjepartsværktøjer: automatiseringsplatforme (Zapier, Make, n8n), CRM-systemer, regnskabssystemer eller alt andet, der accepterer en HTTP POST. Når en person, gruppe eller husstand ændres i B1, sender B1 en signeret JSON-nyttelast til hver URL, der abonnerer på den pågældende hændelse.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- En kirkeadministrator med tilladelsen **Rediger kirkeindstillinger** registrerer og administrerer webhooks
- Dit modtageendepunkt skal kunne nås via **HTTPS** på en offentlig adresse
- Sørg for at have en sikker måde at gemme signeringshemmeligheden på — den vises kun én gang

</div>

## Oversigt

Webhooks er kun **udgående**: B1 kalder dit endepunkt, du kalder ikke B1. Hver webhook er et abonnement for en enkelt kirke, bestående af en destinations-URL, en signeringshemmelighed og en liste over abonnerede hændelser.

Levering sker via en **holdbar udbakke** (outbox): Når en abonneret hændelse indtræffer, gemmer B1 en leveringsrække, og en baggrundsproces sender den som POST inden for cirka et minut. Mislykkede leveringer forsøges igen med eksponentiel backoff. Der går intet tabt, hvis en levering er langsom, eller dit endepunkt er midlertidigt nede.

## Registrering af en webhook

### I B1Admin

Gå til **Indstillinger → Udvikler → Webhooks → Ny webhook**. Angiv et navn, nyttelast-URL'en, og vælg de hændelser, du vil abonnere på. Når du gemmer, **vises signeringshemmeligheden én gang**. Kopiér den med det samme, og gem den sammen med din integration. Den vises aldrig igen (du kan senere skifte den, men du kan ikke hente den oprindelige).

### Via API'et

Alle endepunkter ligger under modulets basissti `/membership/webhooks` og kræver enten en JWT fra en kirkeadministrator med tilladelsen `Settings / Edit`, **eller en [API-nøgle](./api-keys.md) oprettet med scopet `settings:write`**. De samme ruter accepterer begge. Det er det, der gør det muligt for Zapier og Make at registrere webhooks på kirkens vegne, når et Zap eller et scenarie aktiveres.

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

Oprettelsessvaret — og **kun** oprettelsessvaret — indeholder `secret`:

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
| `GET /membership/webhooks` | Vis kirkens webhooks (hemmeligheden udelades) |
| `GET /membership/webhooks/events` | Katalogen over gyldige hændelsesnavne |
| `GET /membership/webhooks/:id` | Hent én webhook |
| `POST /membership/webhooks` | Opret (uden `id`) eller opdatér (med `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Skift signeringshemmeligheden; returnerer den nye værdi én gang |
| `DELETE /membership/webhooks/:id` | Slet en webhook |
| `GET /membership/webhooks/:id/deliveries` | Seneste leveringsforsøg for en webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Fuld nyttelast og svar for én levering |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Sæt en levering i kø igen |

## Hændelseskatalog

Hændelsesnavne følger mønstret `{entity}.{action}`. Hent den aktuelle liste fra `GET /membership/webhooks/events`.

| Hændelse | Udløses når |
|---|---|
| `person.created` | En person tilføjes |
| `person.updated` | En personpost ændres |
| `person.destroyed` | En person slettes |
| `household.created` | En husstand tilføjes |
| `household.updated` | En husstand ændres |
| `household.destroyed` | En husstand slettes |
| `group.created` | En gruppe tilføjes |
| `group.updated` | En gruppe ændres |
| `group.destroyed` | En gruppe slettes |
| `group.member.added` | En person tilføjes til en gruppe |
| `group.member.removed` | En person fjernes fra en gruppe |
| `donation.created` | En gave registreres — manuel indtastning, online, eller overgangen fra afventende → gennemført |
| `donation.updated` | En donationspost redigeres |
| `attendance.recorded` | Et besøg registreres (manuel indtastning eller check-in) |
| `session.created` | En ny fremmødesession oprettes (manuelt eller automatisk ved første check-in) |
| `form.submission.created` | En formular indsendes |
| `event.created` | En kalenderbegivenhed tilføjes |
| `event.updated` | En kalenderbegivenhed redigeres |
| `event.destroyed` | En kalenderbegivenhed slettes |

## Nyttelastens format

Hver levering er en HTTP `POST` med en JSON-tekst og disse headere:

| Header | Beskrivelse |
|---|---|
| `Content-Type` | Altid `application/json` |
| `X-B1-Event` | Hændelsesnavnet, f.eks. `person.created` |
| `X-B1-Delivery-Id` | Unikt id for dette leveringsforsøg — brug det til at fjerne dubletter |
| `X-B1-Signature` | HMAC-SHA256-signatur af den rå tekst (se nedenfor) |
| `X-B1-Timestamp` | Unix-tid i sekunder, da anmodningen blev sendt |
| `User-Agent` | `B1-Webhooks/1.0` |

Teksten pakker den ændrede ressource ind i en lille konvolut:

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

For `*.destroyed`-hændelser indeholder `data` kun `id` og `churchId` for den slettede post.

Hændelser, hvis nyttelast refererer til andre poster via id, medsender også læsbare navne, som bliver opløst på leveringstidspunktet: `personName` og `groupName` på gruppemedlemskabshændelser, `personName` på fremmøde-, donations- og listemedlemskabshændelser, `groupName` på `session.created`, og `formName` (samt `personName`, når indsendelsen er knyttet til en person) på `form.submission.created`.

## Connectortyper

Standardformatet for levering er JSON-konvolutten ovenfor — `connectorType: "standard"`. For [Slack og Discord](/docs/b1-admin/integrations/slack-discord) sender den samme webhook-motor i stedet en chatformateret besked, som disse tjenester accepterer direkte:

| `connectorType` | Sendt indhold | Brug når |
|---|---|---|
| `"standard"` (standard) | `{event, churchId, occurredAt, data}`-konvolut, signeret | Du skriver din egen integration, eller peger mod Zapier / Make / en egen server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Du sender direkte til en Slack Incoming Webhook-URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Du sender direkte til en Discord-kanals webhook-URL |
| `"mailchimp"` | ikke relevant — connectoren kalder selv Mailchimps API | Du ønsker [målgruppesynkronisering](/docs/b1-admin/integrations/services/mailchimp) uden en URL at hoste |

Connectortypen vælges i rullemenuen **Connector Type** i webhook-editoren eller via `connectorType` i `POST /membership/webhooks`-teksten. Den signerede `X-B1-Signature`-header sendes stadig ved Slack/Discord-leveringer (de ignorerer den uden problemer), så det kræver ingen ny signering, hvis du senere skifter en webhook tilbage til `standard`.

Slack og Discord er rene ombygninger af teksten — motoren sender stadig til den URL, kirken har angivet. `mailchimp` er den første connector, der i stedet selv håndterer HTTP-udvekslingen: For hver hændelse udsteder den autentificerede anmodninger om oprettelse/opdatering, arkivering og tagging mod Mailchimps API (`MailchimpConnector.deliver`), og dens legitimationsoplysninger (`{apiKey, audienceId}`) gemmes AES-krypteret i `webhooks.connectorConfig`, og kan kun skrives via API'et. Mailchimp-webhooks accepterer kun person-, gruppemedlem- og listemedlemshændelser; gem-ruten verificerer nøglen og målgruppen hos Mailchimp, før den accepterer dem. Leveringsrækker gemmer den standardiserede konvolut, så leveringsloggen viser, hvad B1 så, sammen med Mailchimps svar. Situationer uden mapping (person uden e-mail, hændelse uden mapping) markeres som gennemført med et `Skipped:`-svar i stedet for at brænde forsøg af.

## Testleveringer

Hver webhook-editor har en knap **Send Test Event** — det tilsvarende API-kald er `POST /membership/webhooks/:id/test`. Testruten opbygger en syntetisk nyttelast for den første abonnerede hændelse, sender den synkront gennem den rigtige signerede leveringssti (og gennem `formatForConnector` for Slack/Discord) og returnerer den resulterende leveringsrække, inklusive `responseStatus` og `responseBody`. Brug den til at bekræfte forbindelse og signaturhåndtering, før du slår integrationen til for alvor. For `mailchimp`-webhooks verificerer testen i stedet de gemte legitimationsoplysninger mod Mailchimps API (en syntetisk hændelse ville skrive en falsk abonnent ind i kirkens rigtige målgruppe) og returnerer et leveringslignende resultat uden at oprette en række.

## Verificering af signaturer

Verificér altid `X-B1-Signature`, før du stoler på en nyttelast. Signaturen er `sha256=` efterfulgt af den hexadecimale HMAC-SHA256 af den **rå anmodningstekst**, nøglet med din signeringshemmelighed. Beregn den over de bytes, du modtog — genserialisér ikke den parsede JSON.

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

Afvis enhver anmodning, hvis signatur ikke stemmer. Du kan eventuelt også afvise anmodninger, hvis `X-B1-Timestamp` er mere end nogle få minutter gammel, for at begrænse vinduet for genafspilning.

## SDK-understøttelse

For Node.js leverer `@churchapps/integration-sdk` en typet verifikator og en Express-middleware, der håndterer optagelse af den rå tekst, signaturkontrollen og parsing af konvolutten for dig:

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

SDK'et udstiller også `WebhookVerifier.verify(secret, rawBody, signatureHeader)` til runtimes uden Express (serverless-funktioner, Fastify osv.). Se pakken på npm.

## Levering og genforsøg

Dit endepunkt bør svare med en `2xx`-status så hurtigt som muligt — helst efter kun at have sat arbejdet i kø, ikke efter at det er behandlet. Enhver svarkode uden for `2xx`, en forbindelsesfejl eller et svar, der tager længere end **10 sekunder**, tæller som en mislykket levering.

Mislykkede leveringer forsøges igen med eksponentiel backoff — **16 forsøg over cirka 5 dage**. Intervallet vokser fra 1 minut, gennem timer, op til 3-dages pauser for de sidste forsøg. Efter det 16. mislykkede forsøg markeres leveringen som `exhausted` og opgives.

Levering sker **mindst én gang**: En levering kan ankomme mere end én gang (f.eks. hvis dit endepunkt lykkes, men svaret går tabt). Brug headeren `X-B1-Delivery-Id` til at fjerne dubletter — behandl hvert id én gang, og behandl gentagelser som ingen handling.

### Automatisk deaktivering

Hvis en webhook giver **tre leveringer i træk, der er `exhausted`**, deaktiverer B1 den automatisk. Ret dit endepunkt, og aktivér derefter webhooken igen i B1Admin (eller via `POST /membership/webhooks` med `"active": true`).

## Inspektion og genlevering

Webhook-editoren i B1Admin viser en tabel **Seneste leveringer** — hændelse, status, antal forsøg, svarkode og tidspunkt. Når du vælger en række, vises den fulde nyttelast, der blev sendt, og svaret, der kom tilbage.

Brug **Redeliver** (Lever igen) til at sætte en tidligere levering i kø igen med sin oprindelige nyttelast — nyttigt efter at have rettet en fejl i dit endepunkt, eller til at efterfylde hændelser, dit endepunkt gik glip af, mens det var nede.

## Krav til URL

Da webhook-URL'er angives af kirken, håndhæver B1 sikkerhedsforanstaltninger mod server-side request forgery. En webhook-URL afvises — ved registrering og igen før hver levering — hvis den:

- ikke bruger **`https`**
- peger på `localhost`, et `.local`- / `.internal`-værtsnavn, eller
- resolverer til en **privat, loopback-, link-local- eller cloud-metadata**-IP-adresse

Dit endepunkt skal være en offentligt tilgængelig HTTPS-tjeneste.
