---
title: "Doing-endepunkter"
---

# Doing-endepunkter

<div class="article-intro">

Doing-modulen administrerer gudstjenesteplanlegging, planlegging av frivillige, oppgaveadministrasjon og automatiseringer. Den tilbyr verktøy for å lage gudstjenesteplaner med tider og posisjoner, tilordne frivillige, administrere blokkeringsdatoer, bygge elementer i gudstjenesteordenen, koble til eksterne innholdsleverandører og konfigurere automatiserte arbeidsflyter med betingelser og handlinger.

</div>

**Basisti:** `/doing`

## Planer

Basisti: `/doing/plans`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle planer for kirken |
| GET | `/:id` | JWT | — | Hent en plan etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere planer etter kommaseparerte ID-er |
| GET | `/types/:planTypeId` | JWT | — | Hent planer etter plantype |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + redigering av tjeneste | Forhåndsvis det tjenesteoversikten **Send SMS til frivillige** sender: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` for de frivillige som er tilordnet i intervallet (én per person, avmeldte og manglende numre hoppes over, delte numre dedupliseres, begrenset til 200) |
| GET | `/presenter` | JWT | — | Hent planer for de neste 7 dagene (presentatørvisning) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Redigering av tjeneste | Aktive arbeidsflyter for bekreftelse av tjenesteoppdrag (`workflowType = "assignmentConfirmation"`) som en plan kan velge: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Offentlig | — | Hent gjeldende plan for en plantype |
| GET | `/public/signup/:churchId` | Offentlig | — | Planer som er åpne for selvpåmelding, tidligste først, hver med sine selvpåmeldingsposisjoner (sortert etter `categoryName`, deretter `name`, pluss `filledCount` for Accepted/Unconfirmed-tildelinger) og tider. Ingen frivilliges navn. Når kirkeinnstillingen `volunteerSignupNextOnly` er `"true"`, returneres bare den første planen for hver plantype. Hver `plan` inkluderer en beregnet `signupDeadline` (ISO-tidspunkt, eller `null`): `signupDeadlineHours` før planens tidligste tid av typen `service` (eventuell tidsbestemt oppføring hvis det ikke finnes noen gudstjenestetid; 9:00 i kirkens tidssone på `serviceDate` hvis planen ikke har noen tider) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` for planens selvpåmeldingsposisjoner (visningsnavn for Accepted/Unconfirmed-tildelte). Returnerer `[]` med mindre planens `showVolunteerNames` er på |
| POST | `/` | JWT | — | Opprett eller oppdater planer (godtar ett objekt eller en matrise). Sett `confirmationWorkflowId` for å melde planen på en bekreftelsesarbeidsflyt for tjenesteoppdrag, eller `null` for å melde den av for fremtidige forespørsler. Send `signupDeadlineHours: null` for å fjerne en frist; hvis feltet utelates, beholdes den lagrede verdien |
| POST | `/copy/:id` | JWT | Redigering av tjeneste | Kopier en plan med posisjoner, tider, tildelinger og elementer i gudstjenesteorden. Body inkluderer `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) og `copyServiceOrder` (boolsk). Uten `targetPlanId` opprettes en ny plan, og `notes`, `signupDeadlineHours`, `showVolunteerNames` og `autoReplaceOnDecline` overføres fra kildeplanen med mindre body angir dem. Med `targetPlanId` fylles den eksisterende planen i stedet (den som kaller må kunne redigere den). B1Admins alternativ **Gjenta ukentlig** kaller dette én gang per uke, hver gang med kopiering fra planen som ble opprettet uken før |
| POST | `/textRange` | JWT | `texting.send` + redigering av tjeneste | Send SMS til hver frivillig som er tilordnet i et datointervall, via kirkens SMS-leverandør. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (melding på opptil 1600 tegn; flettefelt løses per mottaker). Returnerer forhåndsvisningstallene pluss `recipientCount`, `successCount`, `failCount` og `error` (`no_provider` eller `insufficient_credits`) når sendingen stopper tidlig |
| POST | `/:id/issueRequests` | JWT | Redigering av plan | Send planens nye Unconfirmed, ennå ikke varslede tildelinger gjennom bekreftelsesarbeidsflyten: merker hver som varslet og starter ett arbeidsflytkort per tildeling. Tom body; returnerer `{ issued }`. Mislykkes med mindre planen er publisert (ikke `prepared`), har en aktiv `confirmationWorkflowId` med minst ett steg, og svarfristen ikke har passert |
| POST | `/autofill/:id` | JWT | — | Fyll automatisk ut frivillige tildelinger for en plan. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Slett en plan og alle tilhørende tider, tildelinger, posisjoner og planelementer |

### Eksempel: Kopier en plan

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

Basisti: `/doing/planTypes`

Utvider CRUD-basisklassen (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ingen tillatelsessjekker).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle plantyper |
| GET | `/:id` | JWT | — | Hent en plantype etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere plantyper etter kommaseparerte ID-er |
| GET | `/ministryId/:ministryId` | JWT | — | Hent plantyper for en tjeneste |
| POST | `/` | JWT | — | Opprett eller oppdater plantyper |
| DELETE | `/:id` | JWT | — | Slett en plantype |

## Planelementer

Basisti: `/doing/planItems`

Administrerer elementer i gudstjenesteordenen (overskrifter, seksjoner, sanger osv.) organisert i et tre med foreldre- og barneelementer.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et planelement etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere planelementer etter kommaseparerte ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle planelementer for en plan (returnerer trestruktur) |
| GET | `/presenter/:churchId/:planId` | Offentlig | — | Hent planelementer for presentatørvisningen (returnerer trestruktur) |
| POST | `/` | JWT | — | Opprett eller oppdater planelementer |
| POST | `/sort` | JWT | — | Oppdater sorteringsrekkefølgen for et planelement (sorterer søsken på nytt) |
| DELETE | `/:id` | JWT | — | Slett et planelement |

## Planstrøm

Basisti: `/doing/planFeed`

Gir planelementstrømmer til presentatøren. Hvis det ikke finnes noen planelementer, fylles den automatisk fra Lessons.church-stedsstrømmen ved hjelp av planens `contentId`.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Offentlig | — | Hent planstrøm for presentatøren (fylles automatisk fra stedsstrømmen hvis den er tom) |

## Posisjoner

Basisti: `/doing/positions`

Utvider CRUD-basisklassen (GET `/:id`, POST `/`, DELETE `/:id` — ingen tillatelsessjekker).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en posisjon etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere posisjoner etter kommaseparerte ID-er |
| GET | `/plan/ids?planIds=` | JWT | — | Hent posisjoner for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle posisjoner for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater posisjoner |
| DELETE | `/:id` | JWT | — | Slett en posisjon |

## Tider

Basisti: `/doing/times`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | List alle tider for kirken |
| GET | `/:id` | JWT | — | Hent en tid etter ID |
| GET | `/plans?planIds=` | JWT | — | Hent tider for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle tider for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater tider |
| DELETE | `/:id` | JWT | — | Slett en tid |

## Tildelinger

Basisti: `/doing/assignments`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent tildelinger for den innloggede brukeren |
| GET | `/my/upcoming` | JWT | — | Opptil 20 av den innloggede brukerens tildelinger på planer fra og med i går (planer som er foreløpig planlagt, eller `prepared`, hoppes over), tidligste først: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Brukes av tjenesteforhåndsvisningen på hjemmesiden for medlemmer |
| GET | `/:id` | JWT | — | Hent en tildeling etter ID |
| GET | `/plan/ids?planIds=` | JWT | — | Hent tildelinger for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle tildelinger for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater tildelinger (setter status til "Unconfirmed" som standard) |
| POST | `/accept/:id` | JWT | — | Godta en tildeling (må være den tildelte personen) |
| POST | `/decline/:id` | JWT | — | Avslå en tildeling (må være den tildelte personen) |
| POST | `/signup` | JWT | — | Selvpåmelding til en posisjon. Body: `{ positionId }`. Posisjonen må tillate selvpåmelding og ha plass; oppretter en Accepted-tildeling. Avvises med "Signup deadline has passed" når planens påmeldingsfrist (telt tilbake fra første gudstjenestetid, som ovenfor) har passert |
| DELETE | `/signup/:id` | JWT | — | Fjern din egen selvpåmelding. Avvises med "Removal deadline has passed" etter planens påmeldingsfrist |
| DELETE | `/:id` | JWT | — | Slett en tildeling |

### Eksempel: Godta en tildeling

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

Basisti: `/doing/blockoutDates`

Utvider CRUD-basisklassen (GET `/:id`, DELETE `/:id` — ingen tillatelsessjekker).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en blokkeringsdato etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere blokkeringsdatoer etter kommaseparerte ID-er |
| GET | `/my` | JWT | — | Hent blokkeringsdatoer for den innloggede brukeren |
| GET | `/upcoming` | JWT | — | Hent alle kommende blokkeringsdatoer for kirken |
| POST | `/` | JWT | — | Opprett eller oppdater blokkeringsdatoer (setter personId til innlogget bruker hvis den ikke er oppgitt) |
| DELETE | `/:id` | JWT | — | Slett en blokkeringsdato |

## Oppgaver

Basisti: `/doing/tasks`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hent åpne oppgaver for den innloggede brukeren |
| GET | `/:id` | JWT | — | Hent en oppgave etter ID |
| GET | `/:id/contact` | JWT | Kan se kortet | Kontaktinfo for personen et arbeidsflytkort gjelder: `{ personId, displayName, mobilePhone, email }`. Lar en tilordnet ringer uten tilgang til Personer nå personen |
| GET | `/closed` | JWT | — | Hent lukkede oppgaver for den innloggede brukeren |
| GET | `/timeline?taskIds=` | JWT | — | Hent tidslinjedata for oppgaver etter kommaseparerte oppgave-ID-er |
| GET | `/directoryUpdate/:personId` | JWT | — | Hent oppgave for katalogoppdatering for en person |
| POST | `/` | JWT | — | Opprett eller oppdater oppgaver. Legg til `?type=directoryUpdate` for å håndtere oppgaver for katalogoppdatering (laster automatisk opp bilder) |
| POST | `/:id/conversation` | JWT | `tasks.edit` eller kortets tildelte | Knytt notatsamtalen til et kort. Body: `{ conversationId }`. Den første samtalen som knyttes, vinner; senere kall returnerer kortet uendret |
| POST | `/loadForGroups` | JWT | — | Last oppgaver for bestemte grupper. Body: `{ groupIds: [], status: "Open" }` |

## Automatiseringer

Basisti: `/doing/automations`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle automatiseringer for kirken |
| GET | `/:id` | JWT | — | Hent en automatisering etter ID |
| GET | `/check` | Offentlig | — | Utløs en sjekk av alle automatiseringer |
| POST | `/` | JWT | — | Opprett eller oppdater automatiseringer |
| DELETE | `/:id` | JWT | — | Slett en automatisering |

## Handlinger

Basisti: `/doing/actions`

Handlinger definerer hva som skjer når en automatisering utløses.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en handling etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle handlinger for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater handlinger |
| DELETE | `/:id` | JWT | — | Slett en handling |

## Betingelser

Basisti: `/doing/conditions`

Betingelser definerer kriteriene som utløser en automatisering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en betingelse etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle betingelser for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater betingelser |
| DELETE | `/:id` | JWT | — | Slett en betingelse |

## Konjunksjoner

Basisti: `/doing/conjunctions`

Konjunksjoner kobler flere betingelser sammen i en automatisering (OG/ELLER-logikk).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en konjunksjon etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle konjunksjoner for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater konjunksjoner |
| DELETE | `/:id` | JWT | — | Slett en konjunksjon |

## Autentiseringer for innholdsleverandører

Basisti: `/doing/contentProviderAuths`

Utvider CRUD-basisklassen (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ingen tillatelsessjekker).

Administrerer OAuth-autentiseringsposter for eksterne innholdsleverandører (f.eks. integrasjoner med presentasjonsprogramvare).

`accessToken` og `refreshToken` krypteres i hvile med `EncryptionHelper` og dekrypteres ved lesing, slik at API-et fortsatt returnerer vanlige tokener. Poster som er lagret før kryptering, inneholder klartekst (som aldri inneholder `|`); de returneres som de er, og krypteres neste gang de lagres.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle autentiseringer for innholdsleverandører |
| GET | `/:id` | JWT | — | Hent en autentisering for innholdsleverandør etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere autentiseringer for innholdsleverandører etter kommaseparerte ID-er |
| GET | `/ministry/:ministryId` | JWT | — | Hent alle autentiseringer for innholdsleverandører for en tjeneste |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Hent autentiseringspost for en bestemt tjeneste og leverandør |
| POST | `/` | JWT | — | Opprett eller oppdater autentiseringer for innholdsleverandører |
| DELETE | `/:id` | JWT | — | Slett en autentisering for innholdsleverandør |

## Leverandørproxy

Basisti: `/doing/providerProxy`

Videresender forespørsler til eksterne innholdsleverandører (f.eks. ProPresenter, EasyWorship). Håndterer fornying av tokener automatisk når de utløper.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Bla i filer hos innholdsleverandøren. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Hent presentasjoner fra en innholdsleverandør. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Hent en spilleliste fra en innholdsleverandør. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Hent instrukser for et innholdselement. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Hent utvidede instrukser for et innholdselement. Body: `{ ministryId, providerId, path }` |

## Relaterte sider

- [Medlemskapsendepunkter](./membership) — Personer, grupper, roller og tillatelser
- [Oppmøteendepunkter](./attendance) — Sporing av gudstjenester og besøk
- [Modulstruktur](../module-structure) — Mønstre for kodeorganisering
