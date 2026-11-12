---
title: "Clearstream"
description: "Koble Clearstream SMS til B1 Admin gjennom Zapier: send tekstmeldinger ved nye gaver eller skjemainnsendinger, og hent innkommende svar tilbake inn som personer."
---

# Clearstream

<div class="article-intro">

Utløs en [Clearstream](https://clearstream.io)-tekstmelding fra en hvilken som helst B1-hendelse, som ny person, ny gave, skjemainnsending eller oppdatering i kalenderen, og hent svar tilbake som B1-poster. Clearstreams Zapier-app dekker begge retninger, så hele oppsettet er en oppskrift og ikke egendefinert kode.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Clearstream](https://clearstream.io)-konto med minst én liste og en SMS-kvote
- En [Zapier](https://zapier.com)-konto
- En B1 Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan koble sammen {#what-you-can-wire-up}

| Retning | Utløser | Handling |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Opprett/oppdater abonnent + Send tekst til nummer |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send tekst til liste (f.eks. varsle økonomiteamet) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send tekst til en rutingliste (f.eks. teamet for bønnebehov) |
| Clearstream → B1 | Ny innkommende tekst | B1: Opprett person; merk med søkeordet de skrev |

Clearstreams Zapier-handlinger: *Send tekst til nummer*, *Send tekst til liste*, *Opprett/oppdater abonnent*, *Legg abonnent til i automatisk arbeidsflyt*, *Legg merkelapp til abonnent*, *Fjern abonnent fra liste*.

## Oppsett {#setup}

### 1. Lag en B1 API-nøkkel {#1-mint-a-b1-api-key}

**Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**:

- `settings:write`: kreves for å koble nøkkelen til Zapier og for at B1 skal registrere utløser-webhooken
- `people:read`: trengs for å slå opp personen fra hendelsen (`personId` → navn/telefon/e-post)
- (Valgfritt) `people:write` hvis svar fra Clearstream skal opprette B1-kontakter

### 2. Bygg Zapen «tekst ved ny gave» {#2-build-the-text-on-new-gift-zap}

1. **Utløser**: B1.church: Ny gave
2. **Handling**: B1.church: Finn person (gavens `personId`)
3. **Handling**: Clearstream: Send tekst til nummer. Bruk personens telefon fra steg 2 som mottaker, og skriv meldingen (`"Thanks for your gift, {first}! …"`).

Slå på Zapen. B1 registrerer gave-webhooken når den aktiveres. Du vil se `Zapier — donation.created` under **Innstillinger → Utvikler → Webhooks**.

### 3. (Valgfritt) Hent svar tilbake som B1-poster {#3-optional-pull-replies-back-as-b1-records}

1. **Utløser**: Clearstream: Ny innkommende tekst
2. **Handling**: Filter i Zapier på søkeordet, f.eks. fortsett bare hvis tekstinnholdet starter med `PRAY`
3. **Handling**: Lagre tekstinnholdet et sted teamet ditt ser det (Slack, et Google-regneark eller en B1-oppgave). B1s *Finn person* slår opp personer bare etter ID, e-post eller navn, ikke etter telefon. Koble derfor svaret til en B1-person manuelt (eller legg til et Webhooks by Zapier GET-kall mot B1s endepunkt `/membership/people/search/phone?number=…`).

## Vanlige oppskrifter {#common-recipes}

### Personsøk til frivillig team {#volunteer-team-paging}

- **Utløser**: B1.church: Ny skjemainnsending (filtrert på ID-en til bønnebehov-skjemaet)
- **Handling**: Clearstream: Send tekst til liste, der listen er ditt pastorale vaktteam. Skriv meldingen slik: `New prayer request: {data.questions.0.answer}`.

### Oppfølgingsserie for førstegangsbesøkende {#first-time-visitor-follow-up-sequence}

- **Utløser**: B1.church: Ny person, filtrert på personens medlemsstatus (f.eks. *Besøkende*)
- **Handling**: Clearstream: Legg abonnent til i automatisk arbeidsflyt. Koble arbeidsflyt-ID-en til en ferdig 7-dagers tekstserie.

### Gruppepåmelding styrt av søkeord {#keyword-driven-group-join}

- **Utløser**: Clearstream: Ny innkommende tekst (filtrer på søkeordet `MENS`)
- **Handling**: B1.church: Opprett person fra avsenderens navn og telefon (B1s *Finn person* kan ikke slå opp personer etter telefon, så sjekk for duplikater senere under **Personer**)
- **Handling**: B1.church: Legg gruppemedlem til i gruppen Menns tjeneste

## Begrensninger og merknader {#limits--notes}

- **Clearstream måler SMS per melding.** Hver handling Send tekst bruker ett eller flere kreditter, avhengig av lengde og antall mottakere. Sjekk kvoten i abonnementet ditt.
- **Telefonnummeret må være i E.164-format** (f.eks. `+15555550199`) for *Send tekst til nummer*. B1-personposten lagrer det som ble skrevet inn. Bruk et steg *Formatter by Zapier: Numbers → Format Phone Number* hvis du ikke kan garantere formatet.
- **B1 trenger ingen header fra sin side.** Clearstreams autentisering ligger helt inne i Zapier-tilkoblingen.

## Feilsøking {#troubleshooting}

- **Utløseren starter aldri**: `Settings → Developer → Webhooks` skal vise en rad `Zapier — <event>` etter at Zapen er slått på. Hvis ikke, mangler B1 API-nøkkelen `settings:write`. Lag en ny nøkkel og koble til på nytt.
- **Clearstream svarer «Invalid phone number»**: mottakerfeltet er ikke i E.164. Legg til et steg Format Phone Number.
- **Send tekst til liste mislykkes med `403`**: Clearstream-API-brukeren mangler tilgang til listen, eller listens ID er feil. List-ID-er vises på detaljsiden for listen i Clearstream.

## Se også {#see-also}

- [Text In Church](./text-in-church.md): alternativ SMS-plattform, lignende oppsett
- [Mobile Message](./mobile-message.md): for kirker utenfor USA
- [Zapier (oversikt)](../zapier.md): B1-delen av hver Zapier-oppskrift
- [Clearstream API-dokumentasjon](https://api-docs.clearstream.io/): for egne integrasjoner utover Zapier-appen
