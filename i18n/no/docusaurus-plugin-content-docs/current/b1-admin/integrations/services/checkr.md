---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) utfører bakgrunnssjekk for ansatte og frivillige — et nesten universelt behov for enhver menighet som driver et barne- eller ungdomsprogram. B1 har **ingen innebygd funksjon for bakgrunnssjekk** -- bestilling av sjekker, sporing av resultater, og overholdelse av screeningkrav skjer alt i Checkr; oppskriften nedenfor kobler bare B1-hendelser til det. Checkr har ikke en Zapier-app, men [Make.com sin Checkr-integrasjon](https://www.make.com/en/integrations/checkr) er verifisert og eksponerer handlingene du trenger for å starte en sjekk fra en B1-hendelse.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Checkr](https://checkr.com)-konto med API-tilgang og minst én screeningpakke konfigurert
- En [Make](https://www.make.com)-konto
- En B1Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan koble sammen

Makes Checkr-app eksponerer 1 trigger og 6 handlinger:

| Retning | B1 / Make-trigger | Handling |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrert til en frivillig-gruppe) | Checkr: Opprett kandidat → Opprett invitasjon til bakgrunnssjekk |
| Checkr → B1 | Checkr-webhook (invitasjons-/rapporthendelse) | B1: Oppdater personens post (f.eks. tag "Checkr godkjent") |

Makes Checkr-handlinger: Opprett kandidat, Opprett invitasjon til bakgrunnssjekk, Hent kandidat, Hent rapport, Hent rapportens forventede ferdigstillelse, Hent en invitasjon. Pluss 4 søkemoduler.

## Oppsett

### 1. Lag en B1 API-nøkkel

**Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**:

- `settings:write` — for triggerens webhook
- `people:read` — for å slå opp personens navn/e-post når en sjekk startes
- (Valgfritt) `people:write` hvis du vil skrive tilbake rapportstatus som et egendefinert felt eller tag

### 2. Bygg scenarioet «start en sjekk ved frivillig-påmelding» i Make

1. **Trigger** — B1.church: Overvåk hendelser (`group.member.added`).
2. **Filter** — fortsett bare hvis `data.groupId` matcher gruppen din «Barneleder-frivillige» (eller tilsvarende).
3. **Handling** — B1.church: Finn person (etter `data.personId`) for å hente e-post og for-/etternavn.
4. **Handling** — Checkr: Opprett kandidat. Map for-/etternavn/e-post fra steg 3.
5. **Handling** — Checkr: Opprett invitasjon til bakgrunnssjekk. Map den nye kandidat-ID-en fra steg 4 til feltet *candidate_id*. Velg screeningpakken (f.eks. `tasker_standard` eller det kontoen din eksponerer).
6. (Valgfritt) **Handling** — Slack: varsle den trygghetsansvarlige for tjenester om at en sjekk er startet.

Slå på scenarioet. Nye frivillige i den valgte gruppen får en automatisk Checkr-invitasjon på e-post; de fullfører den på telefonen eller laptopen sin; Checkr kjører sjekken.

### 3. (Valgfritt) Motta rapporten tilbake

1. **Trigger** — Checkr: Overvåk hendelser (webhook). Make registrerer en Checkr-webhook ved aktivering.
2. **Filter** — fortsett bare hvis `event_type = report.completed`.
3. **Handling** — Checkr: Hent rapport (bruk rapport-ID-en fra webhooken).
4. **Handling** — B1.church: Finn person (etter kandidatens e-post).
5. **Handling** — Betinget Slack / E-post: varsle den ansvarlige med status `clear` / `consider` / `suspended`.

Merk: B1 har ikke i dag et innebygd felt for «status for bakgrunnssjekk». De praktiske alternativene er (a) publisere resultatet til en privat Slack-kanal for gjennomgang, (b) skrive det til et Google-regneark for revisjon, eller (c) legge personen til i en B1-gruppe «Godkjente frivillige» ved `clear`.

## Vanlige oppskrifter

### Screen frivillige på nytt hvert 2. år

Kombiner det ovenstående med en Make-tidsplan-trigger:

- **Trigger** — Make: Tidsplan (månedlig)
- **Handling** — B1.church: List gruppemedlemmer for «Godkjente frivillige»
- **Handling** — Filtrer med Make: godkjenningsdato eldre enn 22 måneder
- **Handling** — Checkr: Opprett invitasjon til bakgrunnssjekk (samme som den innledende flyten)

### Blokker trinn 1-tilgang til sjekken er fullført

Hvis menigheten din bruker B1-gruppemedlemskap for å styre tilgang (f.eks. bare medlemmer av gruppen «Godkjent» vises i tjenesteplaner), hold nye frivillige i en ventegruppe til Checkr-hendelsen `report.completed` flytter dem videre.

## Begrensninger og merknader

- **Checkr er kun for USA** for de fleste screeningpakker. Menigheter i Australia, Storbritannia og Canada vil trenge et alternativ.
- **Prising** er per sjekk — hver Opprett invitasjon i Make bruker en reell sjekk. Test i Checkrs sandkasse-/testkonto først (Makes Checkr-app respekterer legitimasjonen du oppgir i tilkoblingen, så bytte av legitimasjon bytter mellom sandkasse/produksjon).
- **Checkr API-tilgang er begrenset av abonnement.** Mindre Checkr-kontoer kan være på et rent UI-nivå; kontakt Checkr for å aktivere API.

## Feilsøking

- **Opprett kandidat feiler med `403`** — Checkr API-tokenet er skrivebeskyttet eller mangler riktige kontotillatelser. Utsted det på nytt fra Checkr-dashbordet med skrivetilgang.
- **Invitasjonen kommer aldri frem** — sjekk kandidatens e-post i steg 3; B1 kan ha et tomt e-postfelt for den personen. Legg til et filter som krever e-post før Checkr-steget.
- **Webhook-triggeren utløses ikke** — Checkrs webhook-registrering feiler noen ganger stille hvis Make-kontoen din ikke er på et betalt nivå som støtter utgående webhooker. Kontroller på Checkrs *Webhooks*-side i dashbordet at Makes URL er oppført.

## Se også

- [Make (oversikt)](../make) — B1-siden av alle Make-scenarioer
- [Mobile Message](./mobile-message) — for SMS-leverandører uten Zapier-apper, samme Webhooks/HTTP-mønster som Checkr Make-koblingen
- [Checkr API-dokumentasjon](https://docs.checkr.com/)
