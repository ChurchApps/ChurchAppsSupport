---
title: "Doing-endepunkter"
---

# Doing-endepunkter

<div class="article-intro">

Doing-modulen håndterer tjenesteplanlegging, planlegging av frivillige, oppgavehåndtering og automatiseringer. Den gir verktøy for å lage tjenesteplaner med tider og posisjoner, tildele frivillige, administrere blokkeringsdatoer, bygge elementer i gudstjenesteordenen, koble til eksterne innholdsleverandører og konfigurere automatiserte arbeidsflyter med betingelser og handlinger.

</div>

**Basisbane:** `/doing`

## Planer

Basisbane: `/doing/plans`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste over alle planer for kirken |
| GET | `/:id` | JWT | — | Hent en plan etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere planer etter kommaseparerte ID-er |
| GET | `/types/:planTypeId` | JWT | — | Hent planer etter plantype |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + ministeredigering | Forhåndsvis hvem **Send tekst til frivillige** i tjenesteoversikten vil sende til: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` for de frivillige som er satt opp i perioden (én per person, avmeldte og manglende numre hoppes over, delte numre dedupliseres, begrenset til 200) |
| GET | `/presenter` | JWT | — | Hent planer for de neste 7 dagene (presentasjonsvisning) |
| GET | `/public/current/:planTypeId` | Offentlig | — | Hent gjeldende plan for en plantype |
| GET | `/public/signup/:churchId` | Offentlig | — | Planer åpne for selvpåmelding, nærmeste først, hver med sine selvpåmeldingsposisjoner (sortert etter `categoryName`, deretter `name`, pluss `filledCount` for oppgaver med status Accepted/Unconfirmed) og tider. Ingen frivilliges navn. Når kirkeinnstillingen `volunteerSignupNextOnly` er `"true"`, returneres bare den første planen for hver plantype |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` for planens selvpåmeldingsposisjoner (visningsnavn for personer med oppgaver med status Accepted/Unconfirmed). Returnerer `[]` med mindre `showVolunteerNames` er på for planen |
| POST | `/` | JWT | — | Opprett eller oppdater planer (godtar ett objekt eller en matrise) |
| POST | `/copy/:id` | JWT | Ministeredigering | Kopier en plan inkludert posisjoner, tider, oppgaver og elementer i gudstjenesteordenen. Forespørselen inkluderer `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) og `copyServiceOrder` (boolsk). Uten `targetPlanId` opprettes en ny plan, og `notes`, `signupDeadlineHours`, `showVolunteerNames` og `autoReplaceOnDecline` overføres fra kildeplanen med mindre forespørselen angir dem. Med `targetPlanId` fylles den eksisterende planen i stedet (den som kaller må kunne redigere den). Alternativet **Gjenta ukentlig** i B1Admin kaller dette én gang per uke, og kopierer hver gang fra planen som ble opprettet uken før |
| POST | `/textRange` | JWT | `texting.send` + ministeredigering | Send tekst til alle frivillige som er satt opp i et datointervall via kirkens leverandør av tekstmeldinger. Forespørsel: `{ startDate, endDate, ministryId, planTypeId?, message }` (melding opptil 1600 tegn; flettefelt løses per mottaker). Returnerer forhåndsvisningstallene pluss `recipientCount`, `successCount`, `failCount`, og `error` (`no_provider` eller `insufficient_credits`) når utsending stopper tidlig |
| POST | `/autofill/:id` | JWT | — | Fyll ut frivillige oppgaver automatisk for en plan. Forespørsel: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Slett en plan og alle tilhørende tider, oppgaver, posisjoner og planelementer |

### Eksempel: Kopiere en plan

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Plantyper

Basisbane: `/doing/planTypes`

Utvider CRUD-basisklassen (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ingen tillatelseskontroller).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste over alle plantyper |
| GET | `/:id` | JWT | — | Hent en plantype etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere plantyper etter kommaseparerte ID-er |
| GET | `/ministryId/:ministryId` | JWT | — | Hent plantyper for en tjeneste |
| POST | `/` | JWT | — | Opprett eller oppdater plantyper |
| DELETE | `/:id` | JWT | — | Slett en plantype |

## Planelementer

Basisbane: `/doing/planItems`

Administrerer elementer i gudstjenesteordenen (overskrifter, seksjoner, sanger osv.) organisert i et tre med forelder- og barneelementer.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et planelement etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere planelementer etter kommaseparerte ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle planelementer for en plan (returnerer trestruktur) |
| GET | `/presenter/:churchId/:planId` | Offentlig | — | Hent planelementer for presentasjonsvisning (returnerer trestruktur) |
| POST | `/` | JWT | — | Opprett eller oppdater planelementer |
| POST | `/sort` | JWT | — | Oppdater sorteringsrekkefølgen for et planelement (sorterer søsken på nytt) |
| DELETE | `/:id` | JWT | — | Slett et planelement |

## Planstrøm

Basisbane: `/doing/planFeed`

Gir strømmer med planelementer til presentasjonsvisningen. Hvis ingen planelementer finnes, fylles de automatisk fra Lessons.church-venue-strømmen ved hjelp av planens `contentId`.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Offentlig | — | Hent planstrøm for presentasjon (fylles automatisk fra venue-strømmen hvis tom) |

## Posisjoner

Basisbane: `/doing/positions`

Utvider CRUD-basisklassen (GET `/:id`, POST `/`, DELETE `/:id` — ingen tillatelseskontroller).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en posisjon etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere posisjoner etter kommaseparerte ID-er |
| GET | `/plan/ids?planIds=` | JWT | — | Hent posisjoner for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle posisjoner for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater posisjoner |
| DELETE | `/:id` | JWT | — | Slett en posisjon |

## Tider

Basisbane: `/doing/times`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Liste over alle tider for kirken |
| GET | `/:id` | JWT | — | Hent en tid etter ID |
| GET | `/plans?planIds=` | JWT | — | Hent tider for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle tider for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater tider |
| DELETE | `/:id` | JWT | — | Slett en tid |

## Oppgaver (assignments)

Basisbane: `/doing/assignments`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent oppgaver for gjeldende bruker |
| GET | `/my/upcoming` | JWT | — | Opptil 20 av gjeldende brukers oppgaver på planer datert fra i går og fremover (planer som er penciled-in, eller `prepared`, hoppes over), nærmeste først: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Støtter tjenesteforhåndsvisningen på medlemmets startside |
| GET | `/:id` | JWT | — | Hent en oppgave etter ID |
| GET | `/plan/ids?planIds=` | JWT | — | Hent oppgaver for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle oppgaver for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater oppgaver (setter status til "Unconfirmed" som standard) |
| POST | `/accept/:id` | JWT | — | Aksepter en oppgave (må være personen oppgaven er tildelt) |
| POST | `/decline/:id` | JWT | — | Takk nei til en oppgave (må være personen oppgaven er tildelt) |
| DELETE | `/:id` | JWT | — | Slett en oppgave |

### Eksempel: Akseptere en oppgave

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Blokkeringsdatoer

Basisbane: `/doing/blockoutDates`

Utvider CRUD-basisklassen (GET `/:id`, DELETE `/:id` — ingen tillatelseskontroller).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en blokkeringsdato etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere blokkeringsdatoer etter kommaseparerte ID-er |
| GET | `/my` | JWT | — | Hent blokkeringsdatoer for gjeldende bruker |
| GET | `/upcoming` | JWT | — | Hent alle kommende blokkeringsdatoer for kirken |
| POST | `/` | JWT | — | Opprett eller oppdater blokkeringsdatoer (setter personId til gjeldende bruker hvis ikke oppgitt) |
| DELETE | `/:id` | JWT | — | Slett en blokkeringsdato |

## Oppgaver

Basisbane: `/doing/tasks`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hent åpne oppgaver for gjeldende bruker |
| GET | `/:id` | JWT | — | Hent en oppgave etter ID |
| GET | `/:id/contact` | JWT | Kan se kortet | Kontaktinformasjon for personen et arbeidsflytkort gjelder: `{ personId, displayName, mobilePhone, email }`. Lar en tildelt bruker uten tilgang til Personer nå personen |
| GET | `/closed` | JWT | — | Hent lukkede oppgaver for gjeldende bruker |
| GET | `/timeline?taskIds=` | JWT | — | Hent tidslinjedata for oppgaver etter kommaseparerte oppgave-ID-er |
| GET | `/directoryUpdate/:personId` | JWT | — | Hent oppgave for katalogoppdatering for en person |
| POST | `/` | JWT | — | Opprett eller oppdater oppgaver. Legg til `?type=directoryUpdate` for å håndtere oppgaver for katalogoppdatering (laster opp bilder automatisk) |
| POST | `/:id/conversation` | JWT | `tasks.edit` eller kortansvarlig | Knytt notatsamtalen til et kort. Forespørsel: `{ conversationId }`. Den første samtalen som knyttes, vinner; senere kall returnerer kortet uendret |
| POST | `/loadForGroups` | JWT | — | Last oppgaver for bestemte grupper. Forespørsel: `{ groupIds: [], status: "Open" }` |

## Automatiseringer

Basisbane: `/doing/automations`

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste over alle automatiseringer for kirken |
| GET | `/:id` | JWT | — | Hent en automatisering etter ID |
| GET | `/check` | Offentlig | — | Utløs en sjekk av alle automatiseringer |
| POST | `/` | JWT | — | Opprett eller oppdater automatiseringer |
| DELETE | `/:id` | JWT | — | Slett en automatisering |

## Handlinger

Basisbane: `/doing/actions`

Handlinger definerer hva som skjer når en automatisering utløses.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en handling etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle handlinger for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater handlinger |
| DELETE | `/:id` | JWT | — | Slett en handling |

## Betingelser

Basisbane: `/doing/conditions`

Betingelser definerer kriteriene som utløser en automatisering.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en betingelse etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle betingelser for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater betingelser |
| DELETE | `/:id` | JWT | — | Slett en betingelse |

## Konjunksjoner

Basisbane: `/doing/conjunctions`

Konjunksjoner kobler flere betingelser sammen i en automatisering (OG/ELLER-logikk).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en konjunksjon etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle konjunksjoner for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater konjunksjoner |
| DELETE | `/:id` | JWT | — | Slett en konjunksjon |

## Autentiseringer for innholdsleverandører

Basisbane: `/doing/contentProviderAuths`

Utvider CRUD-basisklassen (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ingen tillatelseskontroller).

Administrerer OAuth-autentiseringsposter for eksterne innholdsleverandører (for eksempel integrasjoner med presentasjonsprogramvare).

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste over alle autentiseringer for innholdsleverandører |
| GET | `/:id` | JWT | — | Hent en autentisering for innholdsleverandør etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere autentiseringer for innholdsleverandører etter kommaseparerte ID-er |
| GET | `/ministry/:ministryId` | JWT | — | Hent alle autentiseringer for innholdsleverandører for en tjeneste |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Hent autentiseringspost for en bestemt tjeneste og leverandør |
| POST | `/` | JWT | — | Opprett eller oppdater autentiseringer for innholdsleverandører |
| DELETE | `/:id` | JWT | — | Slett en autentisering for innholdsleverandør |

## Leverandørproxy

Basisbane: `/doing/providerProxy`

Videresender forespørsler til eksterne innholdsleverandører (for eksempel ProPresenter, EasyWorship). Håndterer tokenfornyelse automatisk når tokener utløper.

| Metode | Bane | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Bla gjennom filer hos innholdsleverandøren. Forespørsel: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Hent presentasjoner fra en innholdsleverandør. Forespørsel: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Hent en spilleliste fra en innholdsleverandør. Forespørsel: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Hent instruksjoner for et innholdselement. Forespørsel: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Hent utvidede instruksjoner for et innholdselement. Forespørsel: `{ ministryId, providerId, path }` |

## Relaterte sider

- [Membership-endepunkter](./membership) — Personer, grupper, roller og tillatelser
- [Attendance-endepunkter](./attendance) — Sporing av gudstjenester og besøk
- [Modulstruktur](../module-structure) — Mønstre for kodeorganisering
