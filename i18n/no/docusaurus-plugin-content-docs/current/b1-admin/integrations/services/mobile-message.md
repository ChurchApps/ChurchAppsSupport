---
title: "Mobile Message"
description: "Koble B1 Admin-hendelser til Mobile Message, en australsk SMS-API, med Zapier- eller Make-webhooks for å sende velkomst-, gave- og påminnelsestekstmeldinger."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) er en australsk SMS-API. Den er populær blant kirker i Australia fordi den tilbyr lokale numre og konkurransedyktige priser i Australia, der Clearstream og Text In Church er USA-orienterte. Mobile Message har ingen førsteklasses Zapier-app i dag, men den publiserer et offentlig REST-API. Du kan derfor koble B1-hendelser til Mobile Message-tekstmeldinger gjennom **Webhooks by Zapier** (eller Makes HTTP-modul) på noen få minutter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Mobile Message](https://mobilemessage.com.au)-konto med registrert avsender-ID og API-legitimasjon (API-brukernavn + passord under *Konto → API-innstillinger*)
- En [Zapier](https://zapier.com)-konto (eller [Make](https://www.make.com))
- En B1 Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan koble sammen {#what-you-can-wire-up}

Mobile Messages API er bygget rundt «send SMS». Det finnes ingen utløsere, bare utgående tekst. Oppskriftene går derfor alle i retningen B1 → SMS:

| Retning | B1-utløser | Resultat |
|---|---|---|
| B1 → Mobile Message | `person.created` | Velkomsttekst til den nye personen |
| B1 → Mobile Message | `donation.created` | Takketekst til giveren |
| B1 → Mobile Message | `form.submission.created` | Varsle vaktteamet |
| B1 → Mobile Message | `event.created` | Påminnelseskringkasting til en liste |

## Oppsett {#setup}

### 1. Lag en B1 API-nøkkel {#1-mint-a-b1-api-key}

**Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**:

- `settings:write`: for at utløser-webhooken skal registreres
- `people:read`: for å slå opp mottakerens telefonnummer fra en `personId`

### 2. Bygg Zapen med Webhooks by Zapier {#2-build-the-zap-with-webhooks-by-zapier}

1. **Utløser**: B1.church: velg hendelsen du vil ha (f.eks. Ny gave).
2. **Handling**: B1.church: Finn person (med `data.personId`) for å hente telefonnummer og navn.
3. **Handling**: Webhooks by Zapier: **POST**. Konfigurer som vist nedenfor.

Innstillingene for POST-steget:

- **URL**: `https://api.mobilemessage.com.au/v1/messages`
- **Nyttelasttype**: JSON
- **Data**:
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
- **Headere**: `Content-Type: application/json` (Webhooks by Zapier legger til dette automatisk)
- **Basic Auth**: sett feltet *Basic Auth* til `<api_username>|<api_password>` (Zapier konverterer det til riktig `Authorization: Basic …`-header)

Slå på Zapen. Send en testgave i B1 Admin for å kontrollere at en tekstmelding kommer frem.

## Vanlige oppskrifter {#common-recipes}

### Påminnelser om arrangementer tidlig om morgenen {#event-reminders-the-morning-of}

- **Utløser**: Schedule by Zapier (daglig, kl. 07)
- **Handling**: behold dagens arrangementsliste i et Google-regneark (eller en annen app Zapier kan lese), og slå opp dagens rader. B1s Zapier-app har ingen handling for å finne arrangementer
- **Handling**: Webhooks by Zapier: POST til Mobile Message med arrangementslisten til en registrert abonnentgruppe

### Bruk batch-endepunktet for kringkasting til en liste {#use-the-batch-endpoint-for-a-list-broadcast}

Mobile Messages endepunkt `/v1/messages` tar imot opptil 10 000 meldinger per kall. For å kringkaste til en B1-gruppe:

- **Utløser**: B1.church: Ny skjemainnsending (filtrer til et bestemt skjema)
- **Handling**: Webhooks by Zapier: GET `/membership/groupmembers?groupId=…` for å liste medlemmene i målgruppen. B1s Zapier-app har ingen listehandling for dette. Send API-nøkkelen som en `Authorization: Bearer cak_…`-header.
- **Handling**: Formatter by Zapier → Utilities → Line-itemize responsen til en `messages`-matrise
- **Handling**: Webhooks by Zapier: POST hele matrisen til `/v1/messages`

### Make som alternativ {#make-alternative}

Hvis du foretrekker Make, legg modulen **HTTP: Lag en forespørsel** etter utløseren Følg hendelser i B1, og konfigurer den på samme måte (POST, Basic Auth, JSON-innhold). Se [Make-oversikten](../make.md) for B1-delen. Merk at B1.church-appen for Make ikke er lansert ennå.

## Begrensninger og merknader {#limits--notes}

- **Basic Auth er den eneste autentiseringsmetoden.** Mobile Message utsteder et brukernavn og passord fra dashbordet. Behandle begge som hemmeligheter.
- **`sender` må være en registrert avsender-ID** på Mobile Message-kontoen din, ellers returnerer sendingen `400 Invalid sender`. Australske regler krever registrering av avsender.
- **Australske telefonnumre** kan skrives som `0412345678` (lokalt) eller `+61412345678` (internasjonalt). API-et godtar begge, men normaliser til `+61…` hvis du også sender til utlandet.
- **Opptil 10 000 meldinger per forespørsel.** Nyttig til kringkasting, men en enkelt B1-webhook-leveranse vil sjelden utløse en liste så stor. Bruk batch-endepunktet til planlagte masse-Zaper.

## Feilsøking {#troubleshooting}

- **POST gir `401 Unauthorized`**: Basic Auth-legitimasjonen er feil. Kopier den på nytt fra Mobile Messages dashbord under *Konto → API-innstillinger*. Merk at brukernavnet som standard er kontoens e-postadresse, ikke en egen API-nøkkel.
- **POST gir `400 Invalid sender`**: verdien i `sender` er ikke en registrert avsender-ID på kontoen din. Registrer den i Mobile Messages dashbord først.
- **Tekstmeldingen kommer, men er avkortet**: Mobile Message deler meldinger som er lengre enn ca. 160 tegn i flere deler, og du faktureres per del. Sjekk responsen. Den viser antall deler.

## Se også {#see-also}

- [Clearstream](./clearstream.md) og [Text In Church](./text-in-church.md): alternative SMS-leverandører med innebygde Zapier-apper (trenger ikke Webhooks by Zapier-steget)
- [Zapier (oversikt)](../zapier.md): B1-delen av hver Zapier-oppskrift
- [Mobile Message API-dokumentasjon](https://mobilemessage.com.au/api-documentation)
