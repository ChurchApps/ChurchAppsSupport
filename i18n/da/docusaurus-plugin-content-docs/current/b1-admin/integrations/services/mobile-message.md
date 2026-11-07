---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) er en australsk SMS-API, som er populær blandt australske kirker, fordi den tilbyder lokale numre og konkurrencedygtige priser i Australien, hvor Clearstream og Text In Church er rettet mod USA. Mobile Message har i dag ingen dedikeret Zapier-app, men virksomheden udgiver en offentlig REST-API. Derfor kan du på få minutter forbinde B1-hændelser med SMS'er fra Mobile Message via **Webhooks by Zapier** (eller HTTP-modulet i Make).

</div>

<div class="prereqs">
<h4>Før du går i gang</h4>

- En [Mobile Message](https://mobilemessage.com.au)-konto med et registreret afsender-ID og API-legitimationsoplysninger (API-brugernavn + adgangskode under *Account → API Settings*)
- En [Zapier](https://zapier.com)-konto (eller [Make](https://www.make.com))
- En B1Admin-bruger med tilladelsen **Edit Settings**

</div>

## Hvad du kan opsætte

Mobile Messages API er opbygget til at „sende SMS" — der findes ingen triggere, kun udgående tekstbeskeder. Opskrifterne går derfor alle fra B1 → SMS:

| Retning | B1-trigger | Resultat |
|---|---|---|
| B1 → Mobile Message | `person.created` | Velkomst-SMS til den nye person |
| B1 → Mobile Message | `donation.created` | Tak-SMS til giveren |
| B1 → Mobile Message | `form.submission.created` | Udløs en alarm til vagthold-teamet |
| B1 → Mobile Message | `event.created` | Påmindelse sendt som broadcast til en liste |

## Opsætning

### 1. Opret en B1 API-nøgle

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — så trigger-webhooken kan registreres
- `people:read` — så modtagerens telefonnummer kan slås op ud fra et `personId`

### 2. Byg Zap'en med Webhooks by Zapier

1. **Trigger** — B1.church: Vælg den hændelse, du ønsker (f.eks. New Donation).
2. **Action** — B1.church: Find Person (med `data.personId`) for at hente telefonnummer og navn.
3. **Action** — Webhooks by Zapier: **POST**. Konfigurer det som beskrevet nedenfor.

Indstillingerne for POST-trinnet:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier tilføjer dette automatisk)
- **Basic Auth** — angiv `<api_username>|<api_password>` i feltet *Basic Auth* (Zapier omdanner det til den rigtige `Authorization: Basic …`-header)

Tænd for Zap'en. Send en testgave i B1Admin for at kontrollere, at en SMS kommer frem.

## Almindelige opskrifter

### Påmindelser om begivenheder om morgenen

- **Trigger** — Schedule by Zapier (dagligt kl. 7)
- **Action** — B1.church: Find Events for today (eller brug et Find-trin med et fast datofilter, eller gem dagens begivenhedsliste i et Google Sheet)
- **Action** — Webhooks by Zapier: POST til Mobile Message med begivenhedslisten til en registreret abonnentgruppe

### Brug batch-endepunktet til en listebroadcast

Mobile Messages `/v1/messages`-endepunkt accepterer op til 10.000 beskeder pr. kald. Sådan sender du en broadcast til en B1-gruppe:

- **Trigger** — B1.church: New Form Submission (filtrer til en bestemt formular)
- **Action** — B1.church: List Group Members for en målgruppe (via et *Webhooks by Zapier — GET*-trin på `/membership/groupmembers?groupId=…`)
- **Action** — Formatter by Zapier → Utilities → Line-itemize svaret til et `messages`-array
- **Action** — Webhooks by Zapier: POST hele arrayet til `/v1/messages`

### Alternativ med Make

Foretrækker du Make, så indsæt modulet **HTTP — Make a request** efter B1 Watch Events-triggeren, og konfigurer det på samme måde (POST, Basic Auth, JSON-body). Se [oversigten over Make](../make) for B1-delen.

## Begrænsninger og noter

- **Basic Auth er den eneste godkendelsesmetode** — Mobile Message udsteder et brugernavn og en adgangskode fra dashboardet. Behandl begge som hemmelige oplysninger.
- **`sender` skal være et registreret afsender-ID** på din Mobile Message-konto, ellers returnerer afsendelsen `400 Invalid sender`. Australske regler kræver registrering af afsenderen.
- **Australske telefonnumre** kan skrives som `0412345678` (lokalt) eller `+61412345678` (internationalt). API'et accepterer begge, men normalisér til `+61…`, hvis du også sender til udlandet.
- **Op til 10.000 beskeder pr. anmodning** — nyttigt til broadcasts, men en enkelt B1-webhook-levering vil sjældent indeholde en liste så stor. Reservér batch-endepunktet til planlagte bulk-Zaps.

## Fejlfinding

- **POST returnerer `401 Unauthorized`** — Basic Auth-legitimationsoplysningerne er forkerte. Kopiér dem igen fra Mobile Message-dashboardet under *Account → API Settings*. Bemærk, at brugernavnet som standard er din kontos e-mailadresse og ikke en separat API-nøgle.
- **POST returnerer `400 Invalid sender`** — værdien i `sender` er ikke et registreret afsender-ID på din konto. Registrér det først i Mobile Message-dashboardet.
- **SMS'en kommer frem, men er afkortet** — Mobile Message deler beskeder over ca. 160 tegn op i flere dele, og du faktureres pr. del. Tjek svarets indhold, som oplyser antallet af dele.

## Se også

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — alternative SMS-udbydere med indbyggede Zapier-apps (der ikke kræver et Webhooks-by-Zapier-trin)
- [Zapier (oversigt)](../zapier) — B1-delen af alle Zapier-opskrifter
- [Mobile Message API-dokumentation](https://mobilemessage.com.au/api-documentation)
