---
title: "Doing-endepunkter"
---

# Doing-endepunkter

<div class="article-intro">

Doing-modulen administrerer tjenesteplanlegging, frivilligplanlegging, oppgaveadministrasjon og automatiseringer. Den tilbyr verktøy for å opprette tjenesteplaner med tider og posisjoner, tildele frivillige, administrere blokkeringsdatoer, bygge gudstjenesterekkefølge-elementer, koble til eksterne innholdsleverandører og konfigurere automatiserte arbeidsflyter med betingelser og handlinger.

</div>

**Basissti:** `/doing`

## Planer

Basissti: `/doing/plans`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle planer for kirken |
| GET | `/:id` | JWT | — | Hent en plan etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere planer etter kommaseparerte ID-er |
| GET | `/types/:planTypeId` | JWT | — | Hent planer etter plantype |
| GET | `/presenter` | JWT | — | Hent planer for de neste 7 dagene (presentasjonsvisning) |
| GET | `/public/current/:planTypeId` | Public | — | Hent gjeldende plan for en plantype |
| POST | `/` | JWT | — | Opprett eller oppdater planer (aksepterer enkeltobjekt eller liste) |
| POST | `/copy/:id` | JWT | — | Kopier en plan inkludert posisjoner, tider, tildelinger og gudstjenesterekkefølge-elementer. Body inkluderer `copyMode` ("none", "positions", "all") og `copyServiceOrder` (boolean) |
| POST | `/autofill/:id` | JWT | — | Autofyll frivilligtildelinger for en plan. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Slett en plan og alle relaterte tider, tildelinger, posisjoner og planelementer |

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

Utvider CRUD-baseklassen (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ingen tillatelseskontroller).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle plantyper |
| GET | `/:id` | JWT | — | Hent en plantype etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere plantyper etter kommaseparerte ID-er |
| GET | `/ministryId/:ministryId` | JWT | — | Hent plantyper for en tjeneste |
| POST | `/` | JWT | — | Opprett eller oppdater plantyper |
| DELETE | `/:id` | JWT | — | Slett en plantype |

## Planelementer

Basissti: `/doing/planItems`

Administrerer gudstjenesterekkefølge-elementer (overskrifter, seksjoner, sanger osv.) organisert i en overordnet-underordnet trestruktur.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et planelement etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere planelementer etter kommaseparerte ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle planelementer for en plan (returnerer trestruktur) |
| GET | `/presenter/:churchId/:planId` | Public | — | Hent planelementer for presentasjonsvisning (returnerer trestruktur) |
| POST | `/` | JWT | — | Opprett eller oppdater planelementer |
| POST | `/sort` | JWT | — | Oppdater sorteringsrekkefølge for et planelement (sorterer søsken på nytt) |
| DELETE | `/:id` | JWT | — | Slett et planelement |

## Plan-feed

Basissti: `/doing/planFeed`

Tilbyr planelement-feeds for presentatøren. Hvis ingen planelementer finnes, fylles det automatisk ut fra Lessons.church-stedsfeeden ved hjelp av planens `contentId`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Hent plan-feed for presentatør (fylles automatisk fra steds-feed hvis tom) |

## Posisjoner

Basissti: `/doing/positions`

Utvider CRUD-baseklassen (GET `/:id`, POST `/`, DELETE `/:id` — ingen tillatelseskontroller).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en posisjon etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere posisjoner etter kommaseparerte ID-er |
| GET | `/plan/ids?planIds=` | JWT | — | Hent posisjoner for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle posisjoner for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater posisjoner |
| DELETE | `/:id` | JWT | — | Slett en posisjon |

## Tider

Basissti: `/doing/times`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | List alle tider for kirken |
| GET | `/:id` | JWT | — | Hent en tid etter ID |
| GET | `/plans?planIds=` | JWT | — | Hent tider for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle tider for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater tider |
| DELETE | `/:id` | JWT | — | Slett en tid |

## Tildelinger

Basissti: `/doing/assignments`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent tildelinger for gjeldende bruker |
| GET | `/:id` | JWT | — | Hent en tildeling etter ID |
| GET | `/plan/ids?planIds=` | JWT | — | Hent tildelinger for flere planer etter kommaseparerte plan-ID-er |
| GET | `/plan/:planId` | JWT | — | Hent alle tildelinger for en plan |
| POST | `/` | JWT | — | Opprett eller oppdater tildelinger (setter status til "Unconfirmed" som standard) |
| POST | `/accept/:id` | JWT | — | Aksepter en tildeling (må være den tildelte personen) |
| POST | `/decline/:id` | JWT | — | Avslå en tildeling (må være den tildelte personen) |
| DELETE | `/:id` | JWT | — | Slett en tildeling |

### Eksempel: Aksepter en tildeling

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

Utvider CRUD-baseklassen (GET `/:id`, DELETE `/:id` — ingen tillatelseskontroller).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en blokkeringsdato etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere blokkeringsdatoer etter kommaseparerte ID-er |
| GET | `/my` | JWT | — | Hent blokkeringsdatoer for gjeldende bruker |
| GET | `/upcoming` | JWT | — | Hent alle kommende blokkeringsdatoer for kirken |
| POST | `/` | JWT | — | Opprett eller oppdater blokkeringsdatoer (setter personId til gjeldende bruker som standard hvis ikke angitt) |
| DELETE | `/:id` | JWT | — | Slett en blokkeringsdato |

## Oppgaver

Basissti: `/doing/tasks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Hent åpne oppgaver for gjeldende bruker |
| GET | `/:id` | JWT | — | Hent en oppgave etter ID |
| GET | `/closed` | JWT | — | Hent lukkede oppgaver for gjeldende bruker |
| GET | `/timeline?taskIds=` | JWT | — | Hent tidslinjedata for oppgaver etter kommaseparerte oppgave-ID-er |
| GET | `/directoryUpdate/:personId` | JWT | — | Hent katalogoppdateringsoppgave for en person |
| POST | `/` | JWT | — | Opprett eller oppdater oppgaver. Legg til `?type=directoryUpdate` for å håndtere katalogoppdateringsoppgaver (laster opp bilder automatisk) |
| POST | `/loadForGroups` | JWT | — | Last oppgaver for spesifikke grupper. Body: `{ groupIds: [], status: "Open" }` |

## Automatiseringer

Basissti: `/doing/automations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle automatiseringer for kirken |
| GET | `/:id` | JWT | — | Hent en automatisering etter ID |
| GET | `/check` | Public | — | Utløs en sjekk av alle automatiseringer |
| POST | `/` | JWT | — | Opprett eller oppdater automatiseringer |
| DELETE | `/:id` | JWT | — | Slett en automatisering |

## Handlinger

Basissti: `/doing/actions`

Handlinger definerer hva som skjer når en automatisering utløses.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en handling etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle handlinger for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater handlinger |
| DELETE | `/:id` | JWT | — | Slett en handling |

## Betingelser

Basissti: `/doing/conditions`

Betingelser definerer kriteriene som utløser en automatisering.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en betingelse etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle betingelser for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater betingelser |
| DELETE | `/:id` | JWT | — | Slett en betingelse |

## Konjunksjoner

Basissti: `/doing/conjunctions`

Konjunksjoner knytter sammen flere betingelser i en automatisering (OG/ELLER-logikk).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en konjunksjon etter ID |
| GET | `/automation/:id` | JWT | — | Hent alle konjunksjoner for en automatisering |
| POST | `/` | JWT | — | Opprett eller oppdater konjunksjoner |
| DELETE | `/:id` | JWT | — | Slett en konjunksjon |

## Innholdsleverandør-autentiseringer

Basissti: `/doing/contentProviderAuths`

Utvider CRUD-baseklassen (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — ingen tillatelseskontroller).

Administrerer OAuth-autentiseringsoppføringer for eksterne innholdsleverandører (f.eks. integrasjoner med presentasjonsprogramvare).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle innholdsleverandør-autentiseringer |
| GET | `/:id` | JWT | — | Hent en innholdsleverandør-autentisering etter ID |
| GET | `/ids?ids=` | JWT | — | Hent flere innholdsleverandør-autentiseringer etter kommaseparerte ID-er |
| GET | `/ministry/:ministryId` | JWT | — | Hent alle innholdsleverandør-autentiseringer for en tjeneste |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Hent autentiseringsoppføring for en spesifikk tjeneste og leverandør |
| POST | `/` | JWT | — | Opprett eller oppdater innholdsleverandør-autentiseringer |
| DELETE | `/:id` | JWT | — | Slett en innholdsleverandør-autentisering |

## Leverandørproxy

Basissti: `/doing/providerProxy`

Videresender forespørsler til eksterne innholdsleverandører (f.eks. ProPresenter, EasyWorship). Håndterer tokenfornyelse automatisk når tokens utløper.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Bla gjennom innholdsleverandørfiler. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Hent presentasjoner fra en innholdsleverandør. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Hent en spilleliste fra en innholdsleverandør. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Hent instruksjoner for et innholdselement. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Hent utvidede instruksjoner for et innholdselement. Body: `{ ministryId, providerId, path }` |

## Relaterte sider

- [Membership-endepunkter](./membership) — Personer, grupper, roller og tillatelser
- [Attendance-endepunkter](./attendance) — Gudstjeneste- og besøkssporing
- [Modulstruktur](../module-structure) — Kodeorganiseringsmønstre
