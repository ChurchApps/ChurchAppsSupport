---
title: "Doing-endepunkter"
---

# Doing-endepunkter

<div class="article-intro">

Doing-modulen administrerer tjenesteplanlegging, planlegging av frivillige, oppgavehåndtering og automatiseringer. Den gir verktøy for å lage tjenesteplaner med tider og posisjoner, tildele frivillige, administrere blokkeringsdatoer, bygge elementer i tjenesterekkefølgen, koble til eksterne innholdsleverandører og konfigurere automatiserte arbeidsflyter med betingelser og handlinger.

</div>

**Basissti:** `/doing`

## Planer

Basissti: `/doing/plans`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle planer for kirken |
| GET | `/:id` | JWT | — | Hent en plan etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere planer etter kommaseparerte ID-er |
| GET | `/types/:planTypeId` | JWT | — | Hent planer etter plantype |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + redigeringstilgang for tjeneste | Forhåndsvis tjenesteoversikten **Tekst frivillige** sender: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` for de frivillige tildelt i perioden (én per person; de som har reservert seg og manglende numre hoppes over; delte numre dedupliseres; begrenset til 200) |
| GET | `/presenter` | JWT | — | Hent planer for de neste 7 dagene (presentasjonsvisning) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Redigering av tjeneste | Aktive arbeidsflyter for bekreftelse av tjenesteoppdrag (`workflowType = "assignmentConfirmation"`) som en plan kan velge: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Offentlig | — | Hent gjeldende plan for en plantype |
| GET | `/public/signup/:churchId` | Offentlig | — | Planer åpne for selvpåmelding, tidligste først, hver med sine selvpåmeldingsposisjoner (sortert etter `categoryName`, deretter `name`, pluss `filledCount` for Accepted/Unconfirmed-tildelinger) og tider. Ingen frivilliges navn. Når kirkeinnstillingen `volunteerSignupNextOnly` er `"true"`, returneres bare den første planen av hver plantype. Hver `plan` inkluderer en beregnet `signupDeadline` (ISO-tidspunkt, eller `null`): `signupDeadlineHours` før planens tidligste `service`-type tid (enhver tidsfestet oppføring hvis det ikke finnes noen tjenestetid; 9:00 i kirkens tidssone på `serviceDate` hvis planen ikke har noen tider) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` for planens selvpåmeldingsposisjoner (visningsnavn for Accepted/Unconfirmed-tildelte). Returnerer `[]` med mindre planens `showVolunteerNames` er på |
| POST | `/` | JWT | — | Opprett eller oppdater planer (godtar et enkelt objekt eller en array). Sett `confirmationWorkflowId` for å melde planen inn i en arbeidsflyt for bekreftelse av tjeneste, eller `null` for å melde den ut for fremtidige forespørsler. Send `signupDeadlineHours: null` for å fjerne en frist; utelates feltet, beholdes den lagrede verdien |
| POST | `/copy/:id` | JWT | Redigering av tjeneste | Kopier en plan med posisjoner, tider, tildelinger og elementer i tjenesterekkefølgen. Body inkluderer `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") og `copyServiceOrder` (boolsk). Uten `targetPlanId` opprettes en ny plan, og `notes`, `signupDeadlineHours`, `showVolunteerNames` og `autoReplaceOnDecline` arves fra kildeplanen med mindre body-en oppgir dem. Med `targetPlanId` fylles den eksisterende planen i stedet (anroperen må kunne redigere den). B1Admin sitt alternativ **Gjenta ukentlig** kaller dette én gang per uke, og kopierer hver gang fra planen som ble opprettet uken før |
| POST | `/textRange` | JWT | `texting.send` + redigeringstilgang for tjeneste | Send tekst til hver frivillig tildelt i et datoområde via kirkens SMS-leverandør. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (melding opptil 1600 tegn; flettefelt løses for hver mottaker). Returnerer forhåndsvisningstallene samt `recipientCount`, `successCount`, `failCount` og `error` (`no_provider` eller `insufficient_credits`) når sendingen stopper tidlig |
| POST | `/:id/issueRequests` | JWT | Redigering av plan | Send planens nye Unconfirmed-tildelinger som ennå ikke er varslet, gjennom dens arbeidsflyt for bekreftelse: markerer hver som varslet og starter ett arbeidsflytkort per tildeling. Tom body; returnerer `{ issued }`. Mislykkes med mindre planen er publisert (ikke `prepared`), har en aktiv `confirmationWorkflowId` med minst ett steg, og svarfristen for planen ikke har utløpt |
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

Basissti: `/doing/planTypes`

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

Basissti: `/doing/planItems`

Administrerer elementer i tjenesterekkefølgen (overskrifter, seksjoner, sanger osv.) organisert i en tre-struktur med forelder og barn.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et planelement etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere planelementer etter kommaseparerte ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle planelementer for en plan (returnerer trestruktur) |
| GET | `/presenter/:churchId/:planId` | Offentlig | — | Hent planelementer for presentasjonsvisning (returnerer trestruktur) |
| POST | `/` | JWT | — | Opprett eller oppdater planelementer |
| POST | `/sort` | JWT | — | Oppdater sorteringsrekkefølgen for et planelement (sorterer søsken på nytt) |
| DELETE | `/:id` | JWT | — | Slett et planelement |

## Planfeed

Basissti: `/doing/planFeed`

Leverer planelementfeeder til presentasjonsvisningen. Hvis det ikke finnes planelementer, fylles de automatisk ut fra Lessons.church-stedets feed ved hjelp av planens `contentId`.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Offentlig | — | Hent planfeed for presentasjonsvisning (fylles automatisk fra stedets feed hvis den er tom) |

## Posisjoner

Basissti: `/doing/positions`

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

Basissti: `/doing/times`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | List alle tider for kirken |
| GET | `/:id` | JWT | — | Hent en tid etter ID |
| GET | `/plans?planIds=` | JWT | — | Hent tider for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle tider for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater tider |
| DELETE | `/:id` | JWT | — | Slett en tid |

## Tildelinger

Basissti: `/doing/assignments`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent tildelinger for den innloggede brukeren |
| GET | `/my/upcoming` | JWT | — | Opptil 20 av den innloggede brukerens tildelinger på planer datert fra i går og fremover (foreløpig innplanlagte planer, eller `prepared`-planer, hoppes over), tidligste først: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Driver tjenestevisningen på startsiden for medlemmer |
| GET | `/:id` | JWT | — | Hent en tildeling etter ID |
| GET | `/plan/ids?planIds=` | JWT | — | Hent tildelinger for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle tildelinger for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater tildelinger (setter status til "Unconfirmed" som standard) |
| POST | `/accept/:id` | JWT | — | Godta en tildeling (må være den tildelte personen) |
| POST | `/decline/:id` | JWT | — | Avslå en tildeling (må være den tildelte personen) |
| POST | `/signup` | JWT | — | Selvpåmelding til en posisjon. Body: `{ positionId }`. Posisjonen må tillate selvpåmelding og ha ledig plass; oppretter en Accepted-tildeling. Avvises med "Signup deadline has passed" når planens påmeldingsfrist (regnet bakover fra første tjenestetid, som over) har utløpt |
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

Basissti: `/doing/blockoutDates`

Utvider CRUD-basisklassen (GET `/:id`, DELETE `/:id` — ingen tillatelsessjekker).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en blokkeringsdato etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere blokkeringsdatoer etter kommaseparerte ID-er |
| GET | `/my` | JWT | — | Hent blokkeringsdatoer for den innloggede brukeren |
| GET | `/upcoming` | JWT | — | Hent alle kommende blokkeringsdatoer for kirken |
| POST | `/` | JWT | — | Opprett eller oppdater blokkeringsdatoer (setter personId til gjeldende bruker hvis den ikke er oppgitt) |
| DELETE | `/:id` | JWT | — | Slett en blokkeringsdato |

## Oppgaver

Basissti: `/doing/tasks`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hent åpne oppgaver for den innloggede brukeren |
| GET | `/:id` | JWT | — | Hent en oppgave etter ID |
| GET | `/:id/contact` | JWT | Kan se kortet | Kontaktinfo for personen et arbeidsflytkort gjelder: `{ personId, displayName, mobilePhone, email }`. Lar en tildelt oppringer uten tilgang til personer nå kontakt med personen |
| GET | `/closed` | JWT | — | Hent avsluttede oppgaver for den innloggede brukeren |
| GET | `/timeline?taskIds=` | JWT | — | Hent tidslinjedata for oppgaver etter kommaseparerte oppgave-ID-er |
| GET | `/directoryUpdate/:personId` | JWT | — | Hent oppgave for katalogoppdatering for en person |
| POST | `/` | JWT | — | Opprett eller oppdater oppgaver. Legg til `?type=directoryUpdate` for å håndtere oppgaver for katalogoppdatering (laster opp bilder automatisk) |
| POST | `/:id/conversation` | JWT | `tasks.edit` eller kortets tildelte | Knytt notatsamtalen til et kort. Body: `{ conversationId }`. Den første knyttede samtalen gjelder; senere kall returnerer kortet uendret |
| POST | `/loadForGroups` | JWT | — | Last inn oppgaver for bestemte grupper. Body: `{ groupIds: [], status: "Open" }` |

## Automatiseringer

Basissti: `/doing/automations`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle automatiseringer for kirken |
| GET | `/:id` | JWT | — | Hent en automatisering etter ID |
| GET | `/check` | Offentlig | — | Utløs en sjekk av alle automatiseringer |
| POST | `/` | JWT | — | Opprett eller oppdater automatiseringer |
| DELETE | `/:id` | JWT | — | Slett en automatisering |

## Handlinger

Basissti: `/doing/actions`

Handlinger definerer hva som skjer når en automatisering utløses.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en handling etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle handlinger for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater handlinger |
| DELETE | `/:id` | JWT | — | Slett en handling |

## Betingelser

Basissti: `/doing/conditions`

Betingelser definerer kriteriene som utløser en automatisering.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en betingelse etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle betingelser for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater betingelser |
| DELETE | `/:id` | JWT | — | Slett en betingelse |

## Konjunksjoner

Basissti: `/doing/conjunctions`

Konjunksjoner kobler flere betingelser sammen i en automatisering (AND/OR-logikk).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en konjunksjon etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle konjunksjoner for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater konjunksjoner |
| DELETE | `/:id` | JWT | — | Slett en konjunksjon |

## Autentiseringer for innholdsleverandører

Basissti: `/doing/contentProviderAuths`

Utvider CRUD-basisklassen (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ingen tillatelsessjekker).

Administrerer OAuth-autentiseringsposter for eksterne innholdsleverandører (f.eks. integrasjoner med presentasjonsprogramvare).

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

Basissti: `/doing/providerProxy`

Videresender forespørsler til eksterne innholdsleverandører (f.eks. ProPresenter, EasyWorship). Håndterer fornying av token automatisk når tokener utløper.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Bla i filer hos innholdsleverandøren. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Hent presentasjoner fra en innholdsleverandør. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Hent en spilleliste fra en innholdsleverandør. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Hent instruksjoner for et innholdselement. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Hent utvidede instruksjoner for et innholdselement. Body: `{ ministryId, providerId, path }` |

## Relaterte sider

- [Medlemskap-endepunkter](./membership) — Personer, grupper, roller og tillatelser
- [Oppmøte-endepunkter](./attendance) — Sporing av tjenester og besøk
- [Modulstruktur](../module-structure) — Kodeorganiseringsmønstre
