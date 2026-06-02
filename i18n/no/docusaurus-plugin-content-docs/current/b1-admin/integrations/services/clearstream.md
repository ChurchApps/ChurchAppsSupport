---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Utløs en [Clearstream](https://clearstream.io)-tekstmelding fra en B1-hendelse — ny person, ny gave, skjemainnsending, kalenderoppdatering — og trekk svar tilbake som B1-poster. Clearstreams Zapier-app viser begge retninger, så hele ledelsen er en oppskrift og ikke tilpasset kode.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Clearstream](https://clearstream.io)-konto med minst én liste og en SMS-godtgjørelse
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan lede opp

| Retning | Utløser | Handling |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Opprett/oppdater abonnent + Send tekst til nummer |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send tekst til liste (f.eks. varsle finansteamet) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send tekst til en rutingsliste (f.eks. bønneforespørsel-team) |
| Clearstream → B1 | Ny innkommende tekst | B1: Opprett person; tag med nøkkelordet de sendte sms-en |

Clearstreams Zapier-handlinger: *Send tekst til nummer*, *Send tekst til liste*, *Opprett/oppdater abonnent*, *Legg abonnent til automatisert arbeidsflyt*, *Legg tag til abonnent*, *Fjern abonnent fra liste*.

## Oppsett

### 1. Lag en B1 API-nøkkel

**Innstillinger → Utviklernavn → API-nøkler → Ny API-nøkkel**:

- `settings:write` — påkrevd for B1 for å registrere webhook-utløseren
- `people:read` — trengs for å slå opp personen fra hendelsen (`personId` → navn/telefon/e-post)
- (Valgfritt) `people:write` hvis Clearstream-svar skal opprette B1-kontakter

### 2. Bygg "sms på ny gave" Zap

1. **Utløser** — B1.church: Ny donasjon
2. **Handling** — B1.church: Finn person (donasjonens `personId`)
3. **Handling** — Clearstream: Send tekst til nummer. Bruk personens telefon fra trinn 2 som mottaker, skriv meldingen (`"Takk for gaven, {first}! …"`).

Slå Zap-en på. B1 registrerer donasjonens webhook ved aktivering; du vil se `Zapier — donation.created` dukke opp i **Innstillinger → Utviklernavn → Webhooks**.

### 3. (Valgfritt) Trekk svar tilbake som B1-poster

1. **Utløser** — Clearstream: Ny innkommende tekst
2. **Handling** — Filter etter Zapier på nøkkelordet — f.eks. fortsett bare hvis tekstmeldingen starter med `PRAY`
3. **Handling** — B1.church: Finn person (etter telefon)
4. **Handling** — Filter / path — hvis ikke funnet, opprett dem; uansett, fil tekstmeldingen noe sted (Slack, Google Sheet, eller en B1-skjemainnsending via Webhooks av Zapier).

## Vanlige oppskrifter

### Frivillig lag paging

- **Utløser** — B1.church: Ny skjemainnsending (filtrert på bønnebeskfelt form-id)
- **Handling** — Clearstream: Send tekst til liste, hvor listen er ditt on-call-pastoralteam. Skriv kroppen som `Ny bønneforespørsel: {data.questions.0.answer}`.

### Første-gangsbesøkende oppfølgingssekvens

- **Utløser** — B1.church: Ny person, filtrert på en B1-persontag av "Første-gangsbesøkende"
- **Handling** — Clearstream: Legg abonnent til automatisert arbeidsflyt. Map arbeidsflyt-id til en forhåndsbygget 7-dagers tekstdrypp.

### Nøkkelord-drevet gruppetilslutning

- **Utløser** — Clearstream: Ny innkommende tekst (filter til nøkkelord `MENS`)
- **Handling** — B1.church: Finn person (etter telefon); fork på ikke-funnet → Opprett person
- **Handling** — B1.church: Legg gruppemedalem til Mensgroppen

## Grenser og merknader

- **Clearstream måler SMS etter melding.** Hver Send teksthandling forbruker en eller flere kreditter avhengig av lengde og antall mottakere — sjekk planens godtgjørelse.
- **Telefonen må være i E.164-format** (f.eks. `+15555550199`) for *Send tekst til nummer*. B1s personrekord lagrer det som ble oppgitt; bruk et *Formatter av Zapier — tall → formattel telefonnummer*-trinn hvis du kan ikke garantere formatet.
- **Ingen overskrift kreves fra B1s side** — Clearstreams auth lever helt innenfor Zapier-forbindelsen.

## Problemløsing

- **Utløseren avfyres aldri** — `Innstillinger → Utviklernavn → Webhooks` skal vise en `Zapier — <event>`-rad etter at Zap er slått på. Hvis ikke, mangler B1 API-nøkkelen `settings:write`. Re-mint og gjen-koble.
- **Clearstream returnerer "Ugyldig telefonnummer"** — mottakerfeltet er ikke i E.164. Legg til et formattel telefonnummer-trinn.
- **Send tekst til liste mislykkes med `403`** — Clearstream API-brukeren mangler tillatelse for den listen, eller liste-ID-en er feil. Liste-ID-er er synlige på Clearstream-listedetaljer-siden.

## Se også

- [Text In Church](./text-in-church) — alternativ SMS-plattform, lignende ledelsesform
- [Mobile Message](./mobile-message) — for kirker utenfor USA
- [Zapier (oversikt)](../zapier) — B1-siden av hver Zapier-oppskrift
- [Clearstream API-dokumentasjon](https://api-docs.clearstream.io/) — for tilpasset integrasjoner utover Zapier-appen
