---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) kjører bakgrunnsscreening for ansatte og frivillige — et nesten universelt behov for enhver kirke som kjører et barn- eller ungdomsprogram. Checkr har ikke en Zapier-app, men [Make.coms Checkr-integrasjon](https://www.make.com/en/integrations/checkr) er verifisert og viser handlingene du trenger for å sparke av en sjekk fra en B1-hendelse.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Checkr](https://checkr.com)-konto med API-tilgang og minst en screeningpakke konfigurert
- En [Make](https://www.make.com)-konto
- En B1Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan lede opp

Makes Checkr-app viser 1 utløser og 6 handlinger:

| Retning | B1 / Make utløser | Handling |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrert til en frivilliggruppe) | Checkr: Opprett kandidat → Opprett bakgrunnssjekkinvitasjon |
| Checkr → B1 | Checkr webhook (invitasjon / raporthendelse) | B1: Oppdater personens rekord (f.eks. tag "Checkr ryddet") |

Makes Checkr-handlinger: Opprett kandidat, Opprett bakgrunnssjekkinvitasjon, Få kandidat, Få rapport, Få rapportens ETA, Få en invitasjon. Plus 4 søkmoduler.

## Oppsett

### 1. Lag en B1 API-nøkkel

**Innstillinger → Utviklernavn → API-nøkler → Ny API-nøkkel**:

- `settings:write` — for webhook-utløseren
- `people:read` — for å slå opp personens navn/e-post når du starter en sjekk
- (Valgfritt) `people:write` hvis du vil skrive rapportstatus tilbake som et egendefinert felt eller tag

### 2. Bygg "sett i gang en sjekk ved frivilligpåmelding"-scenarioet i Make

1. **Utløser** — B1.church: Se hendelser (`group.member.added`).
2. **Filter** — fortsett bare hvis `data.groupId` samsvarer med din "Barns frivillige" (eller tilsvarende) gruppe.
3. **Handling** — B1.church: Finn person (etter `data.personId`) for å få e-post + fornavn/etternavn.
4. **Handling** — Checkr: Opprett kandidat. Map fornavn/etternavn/e-post fra trinn 3.
5. **Handling** — Checkr: Opprett bakgrunnssjekkinvitasjon. Map den nye kandidat-ID-en fra trinn 4 til *candidate_id*-feltet. Velg screeningpakken (f.eks. `tasker_standard` eller det som kontoen din viser).
6. (Valgfritt) **Handling** — Slack: varsle dine sikker-ministerium-koordinator om at en sjekk har blitt iverksatt.

Slå scenarioet på. Nye frivillige i målgruppen får en automatisk Checkr-invitasjon via e-post; de fullfører den på telefonen eller laptopen; Checkr kjører skjermen.

### 3. (Valgfritt) Motta rapporten tilbake

1. **Utløser** — Checkr: Se hendelser (webhook). Make registrerer en Checkr-webhook ved aktivering.
2. **Filter** — fortsett bare hvis `event_type = report.completed`.
3. **Handling** — Checkr: Få rapport (bruk rapport-ID-en fra webhoken).
4. **Handling** — B1.church: Finn person (etter kandidat-e-post).
5. **Handling** — Betinget Slack / e-post: varsle koordinatoren med `clear` / `consider` / `suspended`-status.

Merk: B1 har ikke et innebygd "bakgrunnssjekk-status"-felt i dag. De pragmatiske alternativene er (a) post resultatet til en privat Slack-kanal for gjennomgang, (b) skriv det til et Google Sheet for revisjon, eller (c) legg personen til en "Fjernet frivillige" B1-gruppe på `clear`.

## Vanlige oppskrifter

### Re-screen frivillige hvert 2. år

Pair det ovenfor med en Make-plan-utløser:

- **Utløser** — Make: Tidsplan (månedlig)
- **Handling** — B1.church: List gruppemedalemmer for "Fjernet frivillige"
- **Handling** — Filter etter Make: fjernet dato eldre enn 22 måneder
- **Handling** — Checkr: Opprett bakgrunnssjekkinvitasjon (samme som initial-flyten)

### Blokker fase 1-tilgang til sjekken fullføres

Hvis kirka di bruker B1-gruppemedalemskap for å portåpne tilgang (f.eks. bare "Fjernet"-gruppemedalemmers gruppe vises i servingskjemaer), hold nye frivillige i en hold-gruppe til Checkr `report.completed`-hendelse flipper dem.

## Grenser og merknader

- **Checkr er bare US** for de fleste screeningpakker. Australske, britiske og kanadiske kirker vil trenge et alternativ.
- **Prising** er per sjekk — hver opprett invitasjon i Make brenner en ekte sjekk. Test i Checkrs sandkasse / staging-konto først (Makes Checkr-app respekterer legitimasjonen du sender i forbindelsen, så bytte legitimasjon bytter sandkasse/live).
- **Checkr API-tilgang er plan-gate.** Mindre Checkr-kontoer kan være på et UI-bare-nivå; kontakt Checkr for å aktivere API.

## Problemløsing

- **Opprett kandidat mislykkes med `403`** — Checkr API-tokenet er skrivebeskyttet eller mangler riktige kontotillatelser. Reissue fra Checkr-dashbordet med skriveskopeomfang.
- **Invitasjon kommer aldri fram** — sjekk kandidatens e-post i trinn 3; B1 kan ha et tomt e-postfelt for den personen. Legg til et e-postfelt-obligatorisk filter før Checkr-trinnet.
- **Webhook-utløseren avfyres ikke** — Checkrs webhook-registrering mislykkes noen ganger stille hvis Make-kontoen din ikke er på et betalt nivå som støtter utgående webhooks. Bekreft på Checkrs dashbord *Webhooks*-side at Makes URL er oppført.

## Se også

- [Make (oversikt)](../make) — B1-siden av hvert Make-scenario
- [Mobile Message](./mobile-message) — for SMS-leverandører-uten-Zapier-apper, samme webhooks/HTTP-mønster som Checkr Make-ledelsen
- [Checkr API-dokumentasjon](https://docs.checkr.com/)
