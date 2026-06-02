---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) er en australsk SMS API — populær blant AU-kirker fordi den tilbyr lokale tall og konkurransedyktig AU-priser der Clearstream og Text In Church er US-sentrert. Mobile Message har ikke en førsteklasses Zapier-app i dag, men den publiserer en offentlig REST API, så du kan lede B1-hendelser til Mobile Message-tekster gjennom **webhooks av Zapier** (eller Makes HTTP-modul) på et par minutter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Mobile Message](https://mobilemessage.com.au)-konto med en registrert avsender-ID og API-legitimasjon (API-brukernavn + passord under *konto → API-innstillinger*)
- En [Zapier](https://zapier.com)-konto (eller [Make](https://www.make.com))
- En B1Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan lede opp

Mobile Messages API er "send SMS"-formet — ingen utløsere, bare utgående tekst. Så oppskriftene er alle B1 → SMS:

| Retning | B1 utløser | Resultat |
|---|---|---|
| B1 → Mobile Message | `person.created` | velkomst-tekst til den nye personen |
| B1 → Mobile Message | `donation.created` | takk-tekst til donoren |
| B1 → Mobile Message | `form.submission.created` | page on-call-teamet |
| B1 → Mobile Message | `event.created` | påminnelse-broadcast til en liste |

## Oppsett

### 1. Lag en B1 API-nøkkel

**Innstillinger → Utviklernavn → API-nøkler → Ny API-nøkkel**:

- `settings:write` — for webhook-utløseren for å registrere
- `people:read` — for å slå opp mottakerens telefonnummer fra en `personId`

### 2. Bygg Zap-en med webhooks av Zapier

1. **Utløser** — B1.church: velg hendelsen du vil ha (f.eks. ny donasjon).
2. **Handling** — B1.church: Finn person (ved bruk av `data.personId`) for å få telefonnummeret og navn.
3. **Handling** — webhooks av Zapier: **POST**. Konfigurer som under.

POST-trinnets innstillinger:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **nyttelast-type** — JSON
- **data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Takk for gaven, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **overskrifter** — `Content-Type: application/json` (webhooks av Zapier legger dette til automatisk)
- **grunnleggende auth** — sett *grunnleggende auth*-feltet til `<api_username>|<api_password>` (Zapier konverterer det til riktig `authorization: grunnleggende …` overskrift)

Slå Zap-en på. Send en test-gave i B1Admin for å bekrefte at en tekst ankommer.

## Vanlige oppskrifter

### Event påminnelser morgenen av

- **Utløser** — Tidsplan av Zapier (daglig, 0700)
- **Handling** — B1.church: Finn hendelser for i dag (eller bruk et finn-trinn med et fast dato-filter, eller lagre dagens hendelsesliste i et Google Sheet)
- **Handling** — webhooks av Zapier: POST til Mobile Message med hendelseslisten til en registrert abonnent-gruppe

### Bruk batch-endepunktet for en liste-broadcast

Mobile Messages `/v1/messages`-endepunkt tar opp til 10 000 meldinger per anrop. For å broadcast til en B1-gruppe:

- **Utløser** — B1.church: ny skjemainnsending (filter til et spesifikt skjema)
- **Handling** — B1.church: list gruppemedalemmer for en målgruppe (via et *webhooks av Zapier — GET*-trinn på `/membership/groupmembers?groupId=…`)
- **Handling** — formattrer av Zapier → verktøy → line-itemize svaret til en `messages`-matrise
- **Handling** — webhooks av Zapier: POST hele matrisen til `/v1/messages`

### Make alternativ

Hvis du foretrekker Make, drar du **HTTP — gjør en forespørsel**-modulen etter B1 se hendelser-utløseren, konfigurerer det samme (POST, grunnleggende auth, JSON-kropp). Se [Make oversikt](../make) for B1-siden.

## Grenser og merknader

- **grunnleggende auth er den eneste autentiseringsmetoden** — Mobile Message utsteder et brukernavn og passord fra dashbordet. Behandle begge som hemmeligheter.
- **`avsender` må være en registrert avsender-ID** på Mobile Message-kontoen din, eller sendingen vil returnere `400 ugyldig avsender`. AU-forskrifter krever avsender-registrering.
- **AU-telefonnumre** kan være `0412345678` (lokal) eller `+61412345678` (internasjonal). API-en godtar begge, men normalisere på `+61…` hvis du også sender utenlands.
- **opptil 10 000 meldinger per forespørsel** — nyttig for broadcasts, men en enkelt B1-webhook-levering vil sjelden utsende en liste så stor; reserver batch-endepunktet for planlagte bulk-Zapier.

## Problemløsing

- **POST returnerer `401 ikke autorisert`** — grunnleggende auth-legitimasjon er feil. Re-kopier fra Mobile Message-dashbordet *konto → API-innstillinger*. Merk at brukernavn er kontoen din e-post som standard, ikke en egen API-nøkkel.
- **POST returnerer `400 ugyldig avsender`** — `avsender`-verdien er ikke en registrert avsender-ID på kontoen din. Registrer det i Mobile Message-dashbordet først.
- **Teksten ankommer men er avkortet** — Mobile Message deler meldinger over ~160 tegn i flere deler; du blir fakturert per del. Sjekk svarkroppen — den forteller deg delantallet.

## Se også

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — alternative SMS-leverandører med egen Zapier-apper (ingen webhooks-av-Zapier-trinn nødvendig)
- [Zapier (oversikt)](../zapier) — B1-siden av hver Zapier-oppskrift
- [Mobile Message API-dokumentasjon](https://mobilemessage.com.au/api-documentation)
