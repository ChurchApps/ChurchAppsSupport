---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Webhooks lar en kirke sende sanntidsvarsler til tredjepartsverktøy -- automatiseringsplattformer (Zapier, Make, n8n), CRM-er, regnskapssystemer eller alt som aksepterer en HTTP POST. Når en person, gruppe eller husholdning endres i B1, sender B1 en signert JSON-nyttelast til hver URL som abonnerer på den hendelsen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En kirkeadministrator med **Rediger kirkeinnstillinger**-tillatelse registrerer og administrerer webhooks
- Mottakerendepunktet ditt må være tilgjengelig over **HTTPS** på en offentlig adresse
- Ha en måte å lagre signeringshemmeligheten sikkert -- den vises bare én gang

</div>

## Oversikt

Webhooks er **bare utgående**: B1 kaller endepunktet ditt, du kaller ikke B1. Hver webhook er et per-kirke-abonnement bestående av en destinasjons-URL, en signeringshemmelighet og en liste over abonnerte hendelser.

Levering bruker en **holdbar outbox**: når en abonnert hendelse inntreffer, registrerer B1 en leveringsrad, og en bakgrunnsarbeider POST-er den innen omtrent ett minutt. Mislykkede leveringer prøves på nytt med eksponentiell tilbakefall. Ingenting går tapt hvis en levering er treg eller endepunktet ditt er kort nede.

## Registrere en webhook

### I B1Admin

Gå til **Innstillinger → Webhooks → Ny webhook**. Skriv inn et navn, nyttelast-URL og velg hendelsene du vil abonnere på. Ved lagring vises **signeringshemmeligheten én gang** -- kopier den umiddelbart og lagre den med integrasjonen din. Den vises aldri igjen (du kan rotere den senere, men du kan ikke hente den opprinnelige).

### Via API-et

Alle endepunkter er under Membership-modulens basissti `/membership/webhooks` og krever en JWT fra en kirkeadministrator med `Settings / Edit`-tillatelse.

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

| Metode og sti | Formål |
|---|---|
| `GET /membership/webhooks` | List kirkens webhooks (hemmelighet utelatt) |
| `GET /membership/webhooks/events` | Katalogen over gyldige hendelsesnavn |
| `GET /membership/webhooks/:id` | Last en webhook |
| `POST /membership/webhooks` | Opprett (ingen `id`) eller oppdater (med `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Roter signeringshemmeligheten; returnerer den nye verdien én gang |
| `DELETE /membership/webhooks/:id` | Slett en webhook |
| `GET /membership/webhooks/:id/deliveries` | Nylige leveringsforsøk for en webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Full nyttelast og respons for én levering |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Sett en levering i kø på nytt |

## Hendelseskatalog

Hendelsesnavn følger mønsteret `{entitet}.{handling}`. Hent den live listen fra `GET /membership/webhooks/events`.

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

## Nyttelastformat

Hver levering er en HTTP `POST` med en JSON-kropp og disse overskriftene:

| Overskrift | Beskrivelse |
|---|---|
| `Content-Type` | Alltid `application/json` |
| `X-B1-Event` | Hendelsesnavnet, f.eks. `person.created` |
| `X-B1-Delivery-Id` | Unik id for dette leveringsforsøket -- bruk den til å deduplisere |
| `X-B1-Signature` | HMAC-SHA256 signatur av den rå kroppen (se nedenfor) |
| `X-B1-Timestamp` | Unix-epoke sekunder når forespørselen ble sendt |
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

For `*.destroyed`-hendelser inneholder `data` bare `id` og `churchId` til den slettede posten.

## Verifisere signaturer

Verifiser alltid `X-B1-Signature` før du stoler på en nyttelast. Signaturen er `sha256=` etterfulgt av heksa HMAC-SHA256 av **rå forespørselskropp** nøklet med signeringshemmeligheten din. Beregn den over bytene du mottok -- ikke re-serialiser den parsede JSON-en.

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

Avvis enhver forespørsel hvis signatur ikke stemmer. Valgfritt avvis også forespørsler hvis `X-B1-Timestamp` er mer enn noen få minutter gammel for å begrense reprise-vinduer.

## Levering og nye forsøk

Endepunktet ditt bør svare med en `2xx`-status så raskt som mulig -- ideelt sett etter bare å ha satt arbeidet i kø, ikke etter å ha behandlet det. Enhver ikke-`2xx`-respons, en tilkoblingsfeil eller en respons langsommere enn **10 sekunder** teller som en mislykket levering.

Mislykkede leveringer prøves på nytt med eksponentiell tilbakefall -- **16 forsøk over omtrent 5 dager**. Intervallet vokser fra 1 minutt, gjennom timer, opp til 3-dagers gap for de siste forsøkene. Etter det 16. mislykkede forsøket markeres leveringen som `exhausted` og forlates.

Levering er **minst én gang**: en levering kan ankomme mer enn én gang (for eksempel hvis endepunktet ditt lykkes, men responsen går tapt). Bruk `X-B1-Delivery-Id`-overskriften til å deduplisere -- behandle hver id bare én gang og behandle gjentagelser som no-ops.

### Automatisk deaktivering

Hvis en webhook produserer **tre påfølgende exhausted-leveringer**, deaktiverer B1 den automatisk. Fiks endepunktet ditt, og reaktiver deretter webhooken i B1Admin (eller via `POST /membership/webhooks` med `"active": true`).

## Inspisere og levere på nytt

Webhook-editoren i B1Admin viser en **Nylige leveringer**-tabell -- hendelse, status, antall forsøk, svarkode og tidsstempel. Ved å velge en rad vises full nyttelast som ble sendt og responsen som kom tilbake.

Bruk **Lever på nytt** for å sette en tidligere levering i kø igjen med den opprinnelige nyttelasten -- nyttig etter å ha fikset en feil i endepunktet ditt, eller for å fylle tilbake hendelser som endepunktet ditt gikk glipp av mens det var nede.

## URL-krav

Fordi webhook-URL-er er kirkelevererte, håndhever B1 vakter mot server-side request forgery. En webhook-URL avvises -- ved registrering og re-sjekket før hver levering -- hvis den:

- ikke bruker **`https`**
- peker på `localhost`, et `.local` / `.internal` vertsnavn, eller
- løses til en **privat, loopback, link-local eller cloud-metadata** IP-adresse

Endepunktet ditt må være en offentlig tilgjengelig HTTPS-tjeneste.
