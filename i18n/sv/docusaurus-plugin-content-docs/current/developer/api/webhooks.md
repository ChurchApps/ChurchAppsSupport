---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Med webhooks kan en kyrka skicka realtidsnotiser till verktyg från tredje part, till exempel automationsplattformar (Zapier, Make, n8n), CRM-system, bokföringssystem eller allt som tar emot en HTTP POST. När en person, grupp eller familj ändras i B1 skickar B1 en signerad JSON-payload till varje URL som prenumererar på händelsen.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- En kyrkadministratör med behörigheten **Redigera kyrkoinställningar** registrerar och hanterar webhooks
- Din mottagande endpoint måste vara nåbar via **HTTPS** på en offentlig adress
- Ha ett sätt att lagra signeringshemligheten säkert. Den visas bara en gång.

</div>

## Översikt

Webhooks är enbart **utgående**: B1 anropar din endpoint, du anropar inte B1. Varje webhook är en prenumeration per kyrka som består av en måladress (URL), en signeringshemlighet och en lista över prenumererade händelser.

Leveransen använder en **varaktig utkorg**: När en prenumererad händelse inträffar skapar B1 en leveransrad, och en bakgrundsprocess skickar den med POST inom ungefär en minut. Misslyckade leveranser görs om med exponentiellt ökande väntetid. Inget går förlorat om en leverans är långsam eller din endpoint tillfälligt är nere.

## Registrera en webhook

### I B1Admin

Gå till **Inställningar → Utvecklare → Webhooks → Ny webhook**. Ange ett namn, payload-URL:en och välj de händelser som du vill prenumerera på. När du sparar visas **signeringshemligheten en gång**. Kopiera den direkt och lagra den tillsammans med din integration. Den visas aldrig igen. Du kan rotera den senare, men du kan inte hämta den ursprungliga.

### Via API:et

Alla endpoints ligger under sökvägen för Membership-modulen `/membership/webhooks` och kräver antingen en JWT från en kyrkadministratör med behörigheten `Settings / Edit`, **eller en [API-nyckel](./api-keys) skapad med scopet `settings:write`**. Samma rutter accepterar båda. Det är det som gör att Zapier och Make kan registrera webhooks för kyrkans räkning när en Zap eller ett scenario aktiveras.

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

Svaret på skapandet, och **endast** svaret på skapandet, innehåller `secret`:

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

| Metod och sökväg | Syfte |
|---|---|
| `GET /membership/webhooks` | Lista kyrkans webhooks (hemligheten utelämnas) |
| `GET /membership/webhooks/events` | Katalogen över giltiga händelsenamn |
| `GET /membership/webhooks/:id` | Hämta en webhook |
| `POST /membership/webhooks` | Skapa (utan `id`) eller uppdatera (med `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Rotera signeringshemligheten. Returnerar det nya värdet en gång. |
| `DELETE /membership/webhooks/:id` | Ta bort en webhook |
| `GET /membership/webhooks/:id/deliveries` | Senaste leveransförsöken för en webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Fullständig payload och svar för en leverans |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Lägg tillbaka en leverans i kön |

## Händelsekatalog

Händelsenamn följer mönstret `{entity}.{action}`. Hämta den aktuella listan från `GET /membership/webhooks/events`.

| Händelse | Utlöses när |
|---|---|
| `person.created` | En person läggs till |
| `person.updated` | En personpost ändras |
| `person.destroyed` | En person tas bort |
| `household.created` | En familj läggs till |
| `household.updated` | En familj ändras |
| `household.destroyed` | En familj tas bort |
| `group.created` | En grupp läggs till |
| `group.updated` | En grupp ändras |
| `group.destroyed` | En grupp tas bort |
| `group.member.added` | En person läggs till i en grupp |
| `group.member.removed` | En person tas bort från en grupp |
| `donation.created` | En gåva registreras: manuell inmatning, online eller övergången från väntande till slutförd |
| `donation.updated` | En gåvopost redigeras |
| `attendance.recorded` | Ett besök loggas (manuell inmatning eller incheckning) |
| `session.created` | En ny närvarosession skapas (manuellt eller automatiskt vid första incheckningen) |
| `form.submission.created` | Ett formulär skickas in |
| `event.created` | En kalenderhändelse läggs till |
| `event.updated` | En kalenderhändelse redigeras |
| `event.destroyed` | En kalenderhändelse tas bort |

## Payloadformat

Varje leverans är en HTTP-`POST` med en JSON-body och dessa headers:

| Header | Beskrivning |
|---|---|
| `Content-Type` | Alltid `application/json` |
| `X-B1-Event` | Händelsenamnet, t.ex. `person.created` |
| `X-B1-Delivery-Id` | Unikt id för detta leveransförsök. Använd det för att deduplicera. |
| `X-B1-Signature` | HMAC-SHA256-signatur för den råa bodyn (se nedan) |
| `X-B1-Timestamp` | Unix-tid i sekunder när begäran skickades |
| `User-Agent` | `B1-Webhooks/1.0` |

Bodyn lindar in den ändrade resursen i ett litet kuvert:

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

För händelser av typen `*.destroyed` innehåller `data` endast `id` och `churchId` för den borttagna posten.

Händelser vars payloads refererar till andra poster via id innehåller också läsbara namn som löses vid leveranstillfället: `personName` och `groupName` för gruppmedlemskapshändelserna, `personName` för närvaro-, gåv- och listmedlemskapshändelser, `groupName` för `session.created` och `formName` (plus `personName` när inlämningen är kopplad till en person) för `form.submission.created`.

## Anslutningstyper

Standardformatet för leverans är JSON-kuvertet ovan, `connectorType: "standard"`. För [Slack och Discord](/docs/b1-admin/integrations/slack-discord) skickar samma webhook-motor i stället ett chattliknande meddelande som dessa tjänster accepterar direkt:

| `connectorType` | Skickad body | Används när |
|---|---|---|
| `"standard"` (standard) | Kuvertet `{event, churchId, occurredAt, data}`, signerat | Du skriver en egen integration eller pekar mot Zapier / Make / en egen server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Du postar direkt till en Slack Incoming Webhook-URL |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Du postar direkt till en Discord-kanals webhook-URL |
| `"mailchimp"` | Ej tillämpligt. Kopplingen anropar Mailchimps API själv. | Du vill ha [målgruppssynkronisering](/docs/b1-admin/integrations/services/mailchimp) utan någon URL att hosta |

Anslutningstypen väljs i rullgardinsmenyn **Connector Type** i webhook-redigeraren, eller via `connectorType` i bodyn för `POST /membership/webhooks`. Den signerade headern `X-B1-Signature` skickas fortfarande för Slack- och Discord-leveranser (de ignorerar den utan problem), så det går bra att senare byta tillbaka en webhook till `standard` utan att signera om något.

Slack och Discord är rena omformningar av bodyn. Motorn skickar fortfarande till den URL som kyrkan angett. `mailchimp` är den första kopplingen som i stället äger sitt eget HTTP-utbyte. Per händelse gör den autentiserade anrop för upsert, arkivering och taggar mot Mailchimps API (`MailchimpConnector.deliver`). Dess autentiseringsuppgifter (`{apiKey, audienceId}`) lagras AES-krypterade i `webhooks.connectorConfig` och kan bara skrivas via API:et. Mailchimp-webhooks accepterar endast händelser för person, gruppmedlem och listmedlem. Sparrutten verifierar nyckeln och målgruppen mot Mailchimp innan den accepterar dem. Leveransraderna lagrar det standardiserade kuvertet, så leveranslogen visar vad B1 såg tillsammans med Mailchimps svar. Situationer som inte kan mappas (person utan e-postadress, händelse utan mappning) markeras som lyckade med ett svar i bodyn som börjar med `Skipped:` i stället för att förbruka nya försök.

## Testleveranser

Varje webhook-redigerare har en knapp för **Send Test Event**. Motsvarande API-anrop är `POST /membership/webhooks/:id/test`. Testrutten bygger en syntetisk payload för den första prenumererade händelsen, skickar den synkront genom den riktiga signerade leveransvägen (och genom `formatForConnector` för Slack och Discord) och returnerar den resulterande leveransraden, inklusive `responseStatus` och `responseBody`. Använd den för att bekräfta anslutning och signaturhantering innan du slår på integrationen på riktigt. För `mailchimp`-webhooks verifierar testet i stället de lagrade autentiseringsuppgifterna mot Mailchimps API (en syntetisk händelse skulle skriva en falsk prenumerant till kyrkans riktiga målgrupp) och returnerar ett resultat i leveransformat utan att skapa någon rad.

## Verifiera signaturer

Verifiera alltid `X-B1-Signature` innan du litar på en payload. Signaturen är `sha256=` följt av den hexadecimala HMAC-SHA256 för den **råa begäran-bodyn**, nycklad med din signeringshemlighet. Beräkna den över de byte du tog emot. Serialisera inte om den tolkade JSON:en.

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

Avvisa alla begäranden vars signatur inte stämmer. Du kan också valfritt avvisa begäranden vars `X-B1-Timestamp` är mer än några minuter gammal, för att begränsa upprepningsfönstret.

## SDK-stöd

För Node.js levererar `@churchapps/integration-sdk` en typad verifierare och en Express-middleware som sköter insamlingen av den råa bodyn, signaturkontrollen och tolkningen av kuvertet åt dig:

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

SDK:t exponerar också `WebhookVerifier.verify(secret, rawBody, signatureHeader)` för körmiljöer utan Express (serverless-funktioner, Fastify m.fl.). Se paketet på npm.

## Leverans och nya försök

Din endpoint bör svara med status `2xx` så snabbt som möjligt, helst efter att bara ha köat arbetet och inte efter att ha bearbetat det. Varje svar som inte är `2xx`, ett anslutningsfel eller ett svar som tar längre än **10 sekunder** räknas som en misslyckad leverans.

Misslyckade leveranser görs om med exponentiellt ökande väntetid, **16 försök under ungefär 5 dagar**. Intervallet växer från 1 minut, via timmar, upp till 3 dygns uppehåll för de sista försöken. Efter det 16:e misslyckade försöket markeras leveransen som `exhausted` och överges.

Leveransen är **minst en gång**: en leverans kan komma fram mer än en gång, till exempel om din endpoint lyckas men svaret går förlorat. Använd headern `X-B1-Delivery-Id` för att deduplicera. Bearbeta varje id bara en gång och behandla upprepningar som no-ops.

### Automatisk inaktivering

Om en webhook ger **tre `exhausted`-leveranser i rad** inaktiverar B1 den automatiskt. Åtgärda din endpoint och aktivera sedan webhooken igen i B1Admin (eller via `POST /membership/webhooks` med `"active": true`).

## Granska och skicka om

Webhook-redigeraren i B1Admin visar en tabell med **Senaste leveranser**: händelse, status, antal försök, svarskod och tidsstämpel. Om du väljer en rad visas hela payloaden som skickades och det svar som kom tillbaka.

Använd **Skicka om** för att lägga tillbaka en tidigare leverans i kön med dess ursprungliga payload. Det är användbart efter att du har åtgärdat ett fel i din endpoint, eller för att efterleverera händelser som din endpoint missade medan den var nere.

## Krav på URL:en

Eftersom webhook-URL:er anges av kyrkan tillämpar B1 skydd mot server-side request forgery. En webhook-URL avvisas, både vid registrering och igen före varje leverans, om den:

- inte använder **`https`**
- pekar på `localhost`, ett `.local`- eller `.internal`-värdnamn, eller
- löses till en **privat, loopback-, link-local- eller molnmetadata-IP-adress**

Din endpoint måste vara en offentligt nåbar HTTPS-tjänst.
