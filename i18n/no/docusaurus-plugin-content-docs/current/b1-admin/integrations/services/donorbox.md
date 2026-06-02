---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Hvis kirka di tar imot donasjoner gjennom Donorbox men sporer mennesker og erklæringer i B1, kan du få Donorbox umiddelbar Zapier-utløsere til å opprette samsvarende donasjonsposter innenfor B1 — og opprette donoren som en B1-person hvis de ikke allerede eksisterer. Ingen manuell avstemming, ingen månedlig eksport.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Donorbox](https://donorbox.org)-konto med minst én kampanje
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan lede opp

| Retning | Donorbox utløser | B1 handling |
|---|---|---|
| Donorbox → B1 | Ny eller oppdatert donasjon (øyeblikkelig) | Finn person → legg til donasjon |
| Donorbox → B1 | Ny eller oppdatert donor | Opprett person |
| Donorbox → B1 | Ny eller oppdatert plan (gjentakende) | Finn person → legg til donasjon (bruk plan-id som merknad) |

Donorbox publiserer sine utløsere som **øyeblikkelige** — de avfyres innen sekunder av en ekte donasjon. Ingen polling-forsinkelse.

## Oppsett

### 1. Lag en B1 API-nøkkel

I B1Admin: **Innstillinger → Utviklernavn → API-nøkler → Ny API-nøkkel**. Scoper:

- `people:read` — for å slå opp donoren etter e-post
- `people:write` — for å opprette dem hvis de er nye
- `donations:write` — for å registrere gaven

Utløsere i denne retningen er Donorboxs, ikke B1s, så du trenger ikke `settings:write` her.

### 2. Bygg "registrer en donasjon" Zap

1. **Utløser** — Donorbox: Ny donasjon. Koble til med Donorboxs API-nøkkel (i Donorbox: *konto → profil → API-innstillinger*).
2. **Handling** — B1.church: Finn person. Map donorens e-post fra utløseren til *e-post*-søkefeltet.
3. **Handling** — Filter av Zapier (valgfritt): fortsett bare hvis donoren ikke ble funnet, deretter…
4. **Handling** — B1.church: Opprett person. Map fornavn/etternavn/e-post slik at donoren lander som medlem, ikke bare gaveposter.
5. **Handling** — B1.church: Legg til donasjon. Map:
   - Beløp → `data.amount`
   - Donasjonsdato → utløserens donasjonsdato
   - Fond → velg B1-fondet som speilbilder Donorbox-kampanjen (Zapier lar deg bytte fonder basert på et filtertrinn eller formattertrinn)
   - Metode → "Online"
   - Merknader → Donorbox-transaksjon-id (praktisk ved avstemming)

Slå Zap-en på. Den neste live-donasjonen gjennom Donorbox lander i **B1Admin → donasjoner** automatisk.

## Vanlige oppskrifter

### En Zap per fond

Hvis du kjører flere Donorbox-kampanjer som kartlegges til separate B1-fonder, er den reneste layouten en Zap per kampanje med et Donorbox *kampanje*-filter øverst — på den måten er fondsabbildet hardkodet og du hopper over oppslåslssteget.

### Behandle oppdatert donasjoner som korreksjoner

Donorboxs *ny eller oppdatert donasjon* avfyres på endringer for. Bruk et Zapier *path*-trinn på `event_type` for å fourche: "ny" → legg til donasjon, "oppdatert" → Finn donasjon + oppdater (merknad: B1s Zapier-app har for øyeblikket ikke en oppdatert donasjon-handling — for nå, logg "oppdatert" hendelser til en Slack-kanal for manuell gjennomgang).

### Synkroniser gjentakende planendringer til en Slack-kanal

- **Utløser** — Donorbox: Ny eller oppdatert plan
- **Handling** — Slack: Send melding til `#donations` (f.eks. "Plan endret — Sarahs månedlige gave er nå $200")

## Grenser og merknader

- **Match donorer etter e-post.** Donorbox deler ikke B1s person-id; den eneste holdbare sammenføyingsnøkkelen er e-post. Donorer som gir under en annen e-post vil opprette en ny B1-person — din månedlige avstemming bør se etter disse.
- **Refusjoner er ikke separat eksponert** — Donorbox utsender en statusoppdatering på samme donasjon. B1s Zapier-app har for øyeblikket ikke en *oppdater donasjon*-handling; det sikre mønsteret i dag er å logge refusjons hendelser out-of-band og justere donasjonen manuelt.
- **Test i Donorboxs sandkasse først** for å unngå å opprette falske gaver i produksjons-B1. Donorbox gir test-modustilleggsdata separat fra live.

## Problemløsing

- **"Person ikke funnet" advarsel hver gang** — det er greit hvis du har ordnet trinnene slik at en *opprett person*-handling kjøres i ikke-funnet-grenen. Hvis oppretting av persontrinn aldri kjøres heller, dobbeltsjekk at API-nøkkelen har `people:write`.
- **Donasjonsmengde ser 100 × for stor eller liten ut** — Donorbox sender cent i noen nyttelast-varianter og dollar i andre. Bruk et *formatttrinn av Zapier — tall* for å dele med 100 hvis det er nødvendig.
- **Duplikat donasjoner fra en enkelt gave** — Donorbox avfyres både *ny donasjon* og *oppdatert donasjon*. Enten filter til `event_type = "donation.succeeded"` eller bygg to Zapier med ikke-overlappende filtre.

## Se også

- [Zapier (oversikt)](../zapier) — B1-siden av hver Zapier-oppskrift
- [Subsplash](./subsplash) — en annen donasjon-plattform med en Zapier-app
- [Mailchimp](./mailchimp) — kjede "ny gave" inn i en e-posttag
