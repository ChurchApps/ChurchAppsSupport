---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Met webhooks kan een kerk realtime meldingen doorsturen naar externe tools: automatiseringsplatforms (Zapier, Make, n8n), CRM-systemen, boekhoudsystemen of alles wat een HTTP POST accepteert. Wanneer een persoon, groep of huishouden in B1 verandert, stuurt B1 een ondertekende JSON-payload naar elke URL die is geabonneerd op die gebeurtenis.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een kerkbeheerder met het recht **Kerkinstellingen bewerken** registreert webhooks en beheert ze
- Je ontvangende endpoint moet via **HTTPS** bereikbaar zijn op een openbaar adres
- Zorg voor een veilige manier om het ondertekeningsgeheim op te slaan. Het wordt maar één keer getoond.

</div>

## Overzicht

Webhooks zijn alleen **uitgaand**: B1 roept jouw endpoint aan, jij roept B1 niet aan. Elke webhook is een abonnement per kerk, bestaande uit een bestemmings-URL, een ondertekeningsgeheim en een lijst met geabonneerde gebeurtenissen.

Bezorging gebruikt een **duurzame outbox**: wanneer een geabonneerde gebeurtenis plaatsvindt, slaat B1 een bezorgrij op en een achtergrondproces verstuurt de POST binnen ongeveer een minuut. Mislukte bezorgingen worden opnieuw geprobeerd met exponentiële backoff. Er gaat niets verloren als een bezorging traag verloopt of je endpoint even niet beschikbaar is.

## Een webhook registreren

### In B1Admin

Ga naar **Instellingen → Ontwikkelaar → Webhooks → Nieuwe webhook**. Voer een naam en de payload-URL in en selecteer de gebeurtenissen waarop je wilt abonneren. Na het opslaan wordt het **ondertekeningsgeheim één keer getoond**. Kopieer het meteen en sla het op bij je integratie. Het wordt daarna nooit meer getoond. Je kunt het later vervangen, maar het oorspronkelijke geheim kun je niet opvragen.

### Via de API

Alle endpoints staan onder het basispad van de Membership-module `/membership/webhooks`. Ze vereisen een JWT van een kerkbeheerder met de `Settings / Edit`-rechten, **of een [API-sleutel](./api-keys) met de scope `settings:write`**. Dezelfde routes accepteren beide. Hierdoor kunnen Zapier en Make webhooks namens de kerk registreren wanneer een Zap of scenario wordt ingeschakeld.

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

De respons op het aanmaken, en **alleen** die respons, bevat het `secret`:

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

| Methode & pad | Doel |
|---|---|
| `GET /membership/webhooks` | Toon de webhooks van de kerk (geheim weggelaten) |
| `GET /membership/webhooks/events` | De catalogus met geldige gebeurtenisnamen |
| `GET /membership/webhooks/:id` | Laad één webhook |
| `POST /membership/webhooks` | Aanmaken (zonder `id`) of bijwerken (met `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Ondertekeningsgeheim vernieuwen; geeft de nieuwe waarde één keer terug |
| `DELETE /membership/webhooks/:id` | Verwijder een webhook |
| `GET /membership/webhooks/:id/deliveries` | Recente bezorgpogingen voor een webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Volledige payload en respons voor één bezorging |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Bezorging opnieuw in de wachtrij zetten |

## Gebeurteniscatalogus

Gebeurtenisnamen volgen het patroon `{entity}.{action}`. Haal de actuele lijst op via `GET /membership/webhooks/events`.

| Gebeurtenis | Wordt geactiveerd wanneer |
|---|---|
| `person.created` | Een persoon wordt toegevoegd |
| `person.updated` | Een persoonsrecord wordt gewijzigd |
| `person.destroyed` | Een persoon wordt verwijderd |
| `household.created` | Een huishouden wordt toegevoegd |
| `household.updated` | Een huishouden wordt gewijzigd |
| `household.destroyed` | Een huishouden wordt verwijderd |
| `group.created` | Een groep wordt toegevoegd |
| `group.updated` | Een groep wordt gewijzigd |
| `group.destroyed` | Een groep wordt verwijderd |
| `group.member.added` | Een persoon wordt aan een groep toegevoegd |
| `group.member.removed` | Een persoon wordt uit een groep verwijderd |
| `donation.created` | Een gift wordt vastgelegd: handmatig ingevoerd, online, of de overgang van in behandeling naar voltooid |
| `donation.updated` | Een donatierecord wordt bewerkt |
| `attendance.recorded` | Een bezoek wordt vastgelegd (handmatig of via check-in) |
| `session.created` | Een nieuwe aanwezigheidssessie wordt aangemaakt (handmatig of automatisch bij de eerste check-in) |
| `form.submission.created` | Een formulier wordt ingediend |
| `event.created` | Een agenda-item wordt toegevoegd |
| `event.updated` | Een agenda-item wordt bewerkt |
| `event.destroyed` | Een agenda-item wordt verwijderd |

## Payloadformaat

Elke bezorging is een HTTP `POST` met een JSON-body en deze headers:

| Header | Beschrijving |
|---|---|
| `Content-Type` | Altijd `application/json` |
| `X-B1-Event` | De gebeurtenisnaam, bijvoorbeeld `person.created` |
| `X-B1-Delivery-Id` | Unieke id voor deze bezorgpoging. Gebruik deze om duplicaten te herkennen. |
| `X-B1-Signature` | HMAC-SHA256-handtekening van de ruwe body (zie hieronder) |
| `X-B1-Timestamp` | Unix-tijd in seconden op het moment dat het verzoek is verzonden |
| `User-Agent` | `B1-Webhooks/1.0` |

De body verpakt de gewijzigde resource in een kleine envelop:

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

Bij `*.destroyed`-gebeurtenissen bevat `data` alleen de `id` en `churchId` van het verwijderde record.

Gebeurtenissen waarvan de payloads andere records via id noemen, bevatten ook leesbare namen die op het moment van bezorging worden opgezocht: `personName` en `groupName` bij groepslidmaatschap-gebeurtenissen, `personName` bij aanwezigheids-, donatie- en lijstlidmaatschap-gebeurtenissen, `groupName` bij `session.created`, en `formName` (plus `personName` wanneer de inzending aan een persoon is gekoppeld) bij `form.submission.created`.

## Connectortypen

Het standaard bezorgformaat is de JSON-envelop hierboven: `connectorType: "standard"`. Voor [Slack en Discord](/docs/b1-admin/integrations/slack-discord) past dezelfde webhook-engine de body aan naar een chatbericht dat deze diensten rechtstreeks accepteren:

| `connectorType` | Verzonden body | Gebruik wanneer |
|---|---|---|
| `"standard"` (standaard) | `{event, churchId, occurredAt, data}`-envelop, ondertekend | Je je eigen integratie bouwt, of verwijst naar Zapier / Make / een eigen server |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Je rechtstreeks naar een Slack Incoming Webhook-URL post |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Je rechtstreeks naar een Discord-kanaal-webhook-URL post |
| `"mailchimp"` | n.v.t. — de connector roept zelf de Mailchimp-API aan | Je [audience-synchronisatie](/docs/b1-admin/integrations/services/mailchimp) wilt zonder URL om te hosten |

Het connectortype stel je in via de dropdown **Connector Type** in de webhook-editor, of via `connectorType` in de body van `POST /membership/webhooks`. De ondertekende `X-B1-Signature`-header wordt bij Slack- en Discord-bezorgingen nog steeds meegestuurd. Ze negeren die zonder problemen. Als je een webhook later weer naar `standard` zet, hoef je dus niet opnieuw te ondertekenen.

Slack en Discord passen alleen de body aan. De engine stuurt nog steeds naar de door de kerk opgegeven URL. `mailchimp` is de eerste connector die zelf de HTTP-uitwisseling beheert: per gebeurtenis doet hij geauthenticeerde upsert-, archiverings- en tagverzoeken aan de Mailchimp-API (`MailchimpConnector.deliver`). De inloggegevens (`{apiKey, audienceId}`) worden AES-versleuteld opgeslagen in `webhooks.connectorConfig` en zijn via de API alleen schrijfbaar. Mailchimp-webhooks accepteren alleen persoon-, groepslid- en lijstlid-gebeurtenissen. De save-route controleert de sleutel en de doelgroep bij Mailchimp voordat ze worden geaccepteerd. Bezorgrijen slaan de standaardenvelop op, zodat het bezorgoverzicht laat zien wat B1 heeft verstuurd, naast het antwoord van Mailchimp. Niet-toegewezen situaties (een persoon zonder e-mailadres, een gebeurtenis zonder koppeling) worden als geslaagd afgerond met een `Skipped:`-responsbody, zodat er geen herhalingspogingen worden verspild.

## Testbezorgingen

Elke webhook-editor heeft een knop **Test-gebeurtenis verzenden**. De bijbehorende API-aanroep is `POST /membership/webhooks/:id/test`. De testroute bouwt een synthetische payload voor de eerste geabonneerde gebeurtenis en verstuurt die synchroon via het echte ondertekende bezorgpad (en via `formatForConnector` voor Slack en Discord). Daarna geeft de route de resulterende bezorgrij terug, inclusief `responseStatus` en `responseBody`. Gebruik dit om de verbinding en de afhandeling van de handtekening te controleren voordat je de integratie echt inschakelt. Voor `mailchimp`-webhooks verifieert de test in plaats daarvan de opgeslagen inloggegevens bij de Mailchimp-API. Een synthetische gebeurtenis zou anders een nep-abonnee in de echte doelgroep van de kerk schrijven. Het resultaat lijkt op een bezorging, maar er wordt geen rij aangemaakt.

## Handtekeningen verifiëren

Vertrouw een payload pas nadat je de `X-B1-Signature` hebt geverifieerd. De handtekening is `sha256=`, gevolgd door de hexadecimale HMAC-SHA256 van de **ruwe request-body**, ondertekend met je ondertekeningsgeheim. Bereken de handtekening over de bytes die je hebt ontvangen. Serialiseer de geparste JSON niet opnieuw.

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

Wijs elk verzoek af waarvan de handtekening niet overeenkomt. Optioneel kun je ook verzoeken afwijzen waarvan de `X-B1-Timestamp` meer dan enkele minuten oud is. Zo beperk je het replay-venster.

## SDK-ondersteuning

Voor Node.js bevat `@churchapps/integration-sdk` een getypeerde verifier en een Express-middleware. Die regelt het opvangen van de ruwe body, de controle van de handtekening en het parsen van de envelop voor je:

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

De SDK biedt ook `WebhookVerifier.verify(secret, rawBody, signatureHeader)` voor runtimes zonder Express, zoals serverless functies of Fastify. Zie het pakket op npm voor meer informatie.

## Bezorging en herhalingen

Je endpoint moet zo snel mogelijk met een `2xx`-status antwoorden, idealiter nadat het werk alleen in de wachtrij is gezet en nog niet is verwerkt. Elke niet-`2xx`-respons, verbindingsfout of respons die langer dan **10 seconden** duurt, telt als een mislukte bezorging.

Mislukte bezorgingen worden opnieuw geprobeerd met exponentiële backoff: **16 pogingen over ongeveer 5 dagen**. Het interval begint bij 1 minuut, loopt op naar uren en eindigt bij intervallen van 3 dagen voor de laatste pogingen. Na de 16e mislukte poging wordt de bezorging als `exhausted` gemarkeerd en opgegeven.

Bezorging is **minstens één keer** (*at-least-once*). Een bezorging kan dus meer dan één keer aankomen, bijvoorbeeld als je endpoint slaagt maar het antwoord verloren gaat. Gebruik de header `X-B1-Delivery-Id` om duplicaten te herkennen. Verwerk elke id maar één keer en behandel herhalingen als no-ops.

### Automatisch uitschakelen

Als een webhook **drie opeenvolgende uitgeputte bezorgingen** oplevert, schakelt B1 hem automatisch uit. Repareer je endpoint en schakel de webhook daarna weer in via B1Admin, of via `POST /membership/webhooks` met `"active": true`.

## Inspecteren en opnieuw bezorgen

De webhook-editor in B1Admin toont een tabel **Recente bezorgingen** met gebeurtenis, status, aantal pogingen, responscode en tijdstempel. Als je een rij selecteert, zie je de volledige verzonden payload en de respons die terugkwam.

Gebruik **Opnieuw bezorgen** om een eerdere bezorging met de oorspronkelijke payload opnieuw in de wachtrij te zetten. Dat is handig na het oplossen van een bug in je endpoint, of om gebeurtenissen na te bezorgen die je endpoint miste terwijl het offline was.

## Eisen aan de URL

Omdat webhook-URL's door de kerk worden opgegeven, past B1 beveiligingen toe tegen server-side request forgery. Een webhook-URL wordt geweigerd, zowel bij registratie als opnieuw vóór elke bezorging, als deze:

- geen gebruik maakt van **`https`**
- verwijst naar `localhost`, een `.local`- of `.internal`-hostnaam, of
- verwijst naar een **privé-, loopback-, link-local- of cloud-metadata-IP-adres**

Je endpoint moet een openbaar bereikbare HTTPS-service zijn.
