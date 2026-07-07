---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) kjører bakgrunnsscreening for personale og frivillige -- et nesten universelt behov for enhver kirke som kjører et barne- eller ungdomsprogram. B1 har **ingen innebygd bakgrunnssjekkfunksjon** -- bestilling av sjekker, sporing av resultater og screeningcompliance lever alle i Checkr; oppskriften nedenfor bare knytter B1-begivenheter til den. Checkr har ikke en Zapier-app, men [Make.com's Checkr-integrasjon](https://www.make.com/en/integrations/checkr) er bekreftet og eksponerer handlingene du trenger for å sparke i gang en sjekk fra en B1-begivenhet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Checkr](https://checkr.com) konto med API-tilgang og minst ett screeningpakke konfigurert
- En [Make](https://www.make.com) konto
- En B1Admin-bruker med **Rediger innstillinger**-tillatelse

</div>

## Hva du kan koble opp

Make's Checkr-app eksponerer 1 trigger og 6 handlinger:

| Retning | B1 / Make trigger | Handling |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrert til en frivilliges gruppe) | Checkr: Opprett kandidat → Opprett bakgrunnssjekkeinvitasjon |
| Checkr → B1 | Checkr webhook (invitasjon / rapportbegivenhet) | B1: Oppdater personposten (f.eks. tag "Checkr ryddet") |

Make's Checkr-handlinger: Opprett kandidat, Opprett bakgrunnssjekkeinvitasjon, Hent kandidat, Hent rapport, Hent rapportens ETA, Hent en invitasjon. Plus 4 søkemoduler.

## Oppsett

### 1. Myndiggjør en B1 API-nøkkel

**Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**:

- `settings:write` — for trigger webhook
- `people:read` -- for å slå opp personens navn/e-post når du starter en sjekk
- (Valgfritt) `people:write` hvis du vil skrive rapportstatus tilbake som et egendefinert felt eller tag

### 2. Bygg "kick off a check on volunteer signup" scenarioet i Make

1. **Trigger** — B1.church: Watch Events (`group.member.added`).
2. **Filter** -- bare fortsett hvis `data.groupId` matcher din "Børns frivillige" (eller tilsvarende) gruppe.
3. **Handling** — B1.church: Finn person (etter `data.personId`) for å få e-post + første/etternavn.
4. **Handling** — Checkr: Opprett kandidat. Kartlegg første/siste/e-post fra trinn 3.
5. **Handling** — Checkr: Opprett bakgrunnssjekkeinvitasjon. Kartlegg den nye kandidat-ID-en fra trinn 4 til *candidate_id*-feltet. Velg screeningpakken (f.eks. `tasker_standard` eller hva kontoen din eksponerer).
6. (Valgfritt) **Handling** — Slack: varsle sikkerhetskoordinatoren din om at en sjekk er blitt initialisert.

Slå på scenarioet. Nye frivillige i den målrettede gruppen får automatisk en Checkr-invitasjon via e-post; de fullfører den på telefonen eller bærbare; Checkr kjører skjermen.

### 3. (Valgfritt) Motta rapporten tilbake

1. **Trigger** — Checkr: Watch Events (webhook). Make registrerer en Checkr webhook ved aktivering.
2. **Filter** -- bare fortsett hvis `event_type = report.completed`.
3. **Handling** — Checkr: Hent rapport (bruk rapport-ID-en fra webhook).
4. **Handling** — B1.church: Finn person (etter kandidat e-post).
5. **Handling** — Betinget Slack / E-post: varsle koordinatoren med `clear` / `consider` / `suspended` status.

Merk: B1 har ikke et innebygd "bakgrunnssjekk-status"-felt i dag. De praktiske alternativene er (a) post resultatet til en privat Slack-kanal for gjennomgang, (b) skriv det til et Google-regneark for audit, eller (c) legg personen til en "Ryddet frivillige" B1-gruppe på `clear`.

## Vanlige oppskrifter

### Rescan frivillige hver 2. år

Paret det ovenfor med en Make-planleggingstrigger:

- **Trigger** — Make: Planlegg (månedlig)
- **Handling** — B1.church: Listegruppmedlemmer for "Ryddet frivillige"
- **Handling** — Filter etter Make: ryddet dato eldre enn 22 måneder
- **Handling** — Checkr: Opprett bakgrunnssjekkeinvitasjon (samme som det første flowet)

### Blokker scenariofase 1-tilgang inntil sjekken fullføres

Hvis kirken din bruker B1-gruppemedlemskap til porthuset (f.eks. bare "Ryddet" gruppemedblemmer vises i tjenesteplanlegging), hold nye frivillige i en holdinggruppe inntil Checkr `report.completed`-begivenheten snu dem.

## Grenser & Merknader

- **Checkr er bare USA** for de fleste screeningpakker. Australske, britiske og kanadiske kirker trenger et alternativ.
- **Prising** er per sjekk -- hver Create Invitation i Make brenner en reell sjekk. Test i Checkr's sandbox / staging-konto først (Make's Checkr-app respekterer legitimasjonen du sender i forbindelsen, så bytte av legitimasjon veksler sandbox/live).
- **Checkr API-tilgang er planlagt.** Mindre Checkr-kontoer kan være på et UI-only-nivå; kontakt Checkr for å muliggjøre API.

## Feilsøking

- **Opprett kandidat mislykkes med `403`** -- Checkr API-tokenet er skrivebeskyttet eller mangler riktige kontotillatelser. Gjenomgiv det fra Checkr-instrumentbordet med skrivepermisjon.
- **Invitasjonen kommer aldri** -- sjekk kandidatens e-post i trinn 3; B1 kan ha et tomt e-postfelt for den personen. Legg til et e-post-påkrevd filter før Checkr-trinnet.
- **Webhook-trigger skytes ikke** -- Checkr's webhook-registrering mislykkes noen ganger stille hvis Make-kontoen din ikke er på en betalt nivå som støtter utgående webhooks. Bekreft på Checkr's instrumentbord *Webhooks*-siden at Make's URL er oppført.

## Se også

- [Make (oversikt)](../make) -- B1-siden av hvert Make-scenario
- [Mobil melding](./mobile-message) -- for SMS-leverandører-uten-Zapier-apper, samme Webhooks/HTTP-mønster som Checkr Make-ledning
- [Checkr API-dokumenter](https://docs.checkr.com/)
