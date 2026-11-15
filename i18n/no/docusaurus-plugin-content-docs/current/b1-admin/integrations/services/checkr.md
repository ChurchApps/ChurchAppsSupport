---
title: "Checkr"
description: "Koble frivillige-påmeldinger i B1 Admin til Checkr-bakgrunnssjekker med Make.com, med valgfrie varsler om rapportstatus til koordinatoren for trygg tjeneste."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) gjennomfører bakgrunnssjekker for ansatte og frivillige. Det er et nesten universelt behov for enhver kirke som driver barne- eller ungdomsprogram. B1 har **ingen innebygd funksjon for bakgrunnssjekk**. Bestilling av sjekker, oppfølging av resultater og kontroll av samsvar med krav ligger alle i Checkr. Oppskriften nedenfor kobler bare B1-hendelser til Checkr. Checkr har ingen Zapier-app, men [Make.coms Checkr-integrasjon](https://www.make.com/en/integrations/checkr) er verifisert og tilbyr handlingene du trenger for å starte en sjekk fra en B1-hendelse.

</div>

:::caution
Denne oppskriften bruker B1.church-appen for Make, som ikke er lansert ennå (se [Make](../make.md)). Inntil den er lansert, må B1-delen av disse scenarioene bygges med Makes **HTTP**-modul som kaller B1s [REST API](/docs/developer/api).
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Checkr](https://checkr.com)-konto med API-tilgang og minst én konfigurert screeningpakke
- En [Make](https://www.make.com)-konto
- En B1 Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan koble sammen {#what-you-can-wire-up}

Make-appen for Checkr tilbyr 1 utløser og 6 handlinger:

| Retning | B1 / Make-utløser | Handling |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrert til en frivilliggruppe) | Checkr: Opprett kandidat → Opprett invitasjon til bakgrunnssjekk |
| Checkr → B1 | Checkr-webhook (hendelse for invitasjon / rapport) | B1: Oppdater personens post (f.eks. merkelapp «Checkr godkjent») |

Makes Checkr-handlinger: Opprett kandidat, Opprett invitasjon til bakgrunnssjekk, Hent kandidat, Hent rapport, Hent rapportens forventede ferdigstillelse og Hent en invitasjon. I tillegg kommer 4 søkemoduler.

## Oppsett {#setup}

### 1. Lag en B1 API-nøkkel {#1-mint-a-b1-api-key}

**Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**:

- `settings:write`: for utløser-webhooken
- `people:read`: for å slå opp personens navn og e-post når en sjekk startes
- (Valgfritt) `people:write` hvis du vil skrive rapportstatusen tilbake som et egendefinert felt eller en merkelapp

### 2. Bygg scenarioet «start en sjekk ved frivillig-påmelding» i Make {#2-build-the-kick-off-a-check-on-volunteer-signup-scenario-in-make}

1. **Utløser**: B1.church: Følg hendelser (`group.member.added`).
2. **Filter**: fortsett bare hvis `data.groupId` samsvarer med gruppen din «Frivillige i barnearbeid» (eller tilsvarende).
3. **Handling**: B1.church: Finn person (etter `data.personId`) for å hente e-post og fornavn/etternavn.
4. **Handling**: Checkr: Opprett kandidat. Map fornavn, etternavn og e-post fra steg 3.
5. **Handling**: Checkr: Opprett invitasjon til bakgrunnssjekk. Map den nye kandidat-ID-en fra steg 4 til feltet *candidate_id*. Velg screeningpakken (f.eks. `tasker_standard` eller det kontoen din viser).
6. (Valgfritt) **Handling**: Slack: varsle koordinatoren for trygg tjeneste om at en sjekk er startet.

Slå på scenariet. Nye frivillige i den valgte gruppen får automatisk en Checkr-invitasjon på e-post. De fullfører den på telefonen eller laptopen, og Checkr gjennomfører sjekken.

### 3. (Valgfritt) Motta rapporten tilbake {#3-optional-receive-the-report-back}

1. **Utløser**: Checkr: Følg hendelser (webhook). Make registrerer en Checkr-webhook når scenariet aktiveres.
2. **Filter**: fortsett bare hvis `event_type = report.completed`.
3. **Handling**: Checkr: Hent rapport (bruk rapport-ID-en fra webhooken).
4. **Handling**: B1.church: Finn person (etter kandidatens e-post).
5. **Handling**: Betinget Slack / e-post: varsle koordinatoren med statusen `clear` / `consider` / `suspended`.

Merk: B1 har i dag ingen innebygd statusfelt for bakgrunnssjekk. De praktiske alternativene er (a) å publisere resultatet i en privat Slack-kanal for gjennomgang, (b) å skrive det til et Google-regneark for revisjon, eller (c) å legge personen til i en B1-gruppe «Godkjente frivillige» ved `clear`.

## Vanlige oppskrifter {#common-recipes}

### Kontroller frivillige på nytt hvert andre år {#re-screen-volunteers-every-2-years}

Kombiner det over med en tidsplanutløser i Make:

- **Utløser**: Make: Tidsplan (månedlig)
- **Handling**: HTTP: Lag en forespørsel: GET B1s `/membership/groupmembers?groupId=…` for gruppen din «Godkjente frivillige» (B1.church-appen har ingen listehandling)
- **Handling**: Filter i Make: godkjenningsdato eldre enn 22 måneder
- **Handling**: Checkr: Opprett invitasjon til bakgrunnssjekk (samme som den første flyten)

### Blokker tilgang på trinn 1 til sjekken er fullført {#block-stage-1-access-until-check-completes}

Hvis kirken din bruker gruppemedlemskap i B1 for å styre tilgang (f.eks. at bare medlemmer i gruppen «Godkjent» vises i tjenesteplanene), hold nye frivillige i en ventegruppe til Checkr-hendelsen `report.completed` flytter dem.

## Begrensninger og merknader {#limits--notes}

- **Checkr er bare for USA** for de fleste screeningpakker. Kirker i Australia, Storbritannia og Canada må bruke et alternativ.
- **Prisen** er per sjekk. Hver opprettelse av invitasjon i Make bruker en ekte sjekk. Test i Checkrs sandbox- eller staging-konto først. Make-appen for Checkr bruker legitimasjonen du sender inn i tilkoblingen, så bytte av legitimasjon veksler mellom sandbox og live.
- **API-tilgang til Checkr krever abonnement.** Mindre Checkr-kontoer kan ha et nivå med bare nettgrensesnitt. Kontakt Checkr for å aktivere API.

## Feilsøking {#troubleshooting}

- **Opprett kandidat mislykkes med `403`**: Checkr-API-tokenet er skrivebeskyttet eller mangler riktige kontotillatelser. Utsted et nytt fra Checkr-dashbordet med skrivetilgang.
- **Invitasjonen kommer aldri frem**: sjekk kandidatens e-post i steg 3. B1 kan ha et tomt e-postfelt for personen. Legg til et filter som krever e-post før Checkr-steget.
- **Webhook-utløseren starter ikke**: Checkrs registrering av webhooks kan noen ganger mislykkes stille hvis Make-kontoen din ikke er på et betalt nivå som støtter utgående webhooks. Bekreft på siden *Webhooks* i Checkr-dashbordet at Makes URL er oppført.

## Se også {#see-also}

- [Make (oversikt)](../make.md): B1-delen av hvert Make-scenario
- [Mobile Message](./mobile-message.md): for SMS-leverandører uten Zapier-apper, samme Webhooks/HTTP-mønster som Checkr-oppsettet i Make
- [Checkr API-dokumentasjon](https://docs.checkr.com/)
