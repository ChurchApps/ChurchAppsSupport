---
title: "Doing Eindpunten"
---

# Doing Eindpunten

<div class="article-intro">

De Doing-module beheert serviceplanning, vrijwilligerontwerp, taakbeheer en automatisering. Het biedt hulpprogramma's voor het maken van serviceplanning met tijden en posities, het toewijzen van vrijwilligers, het beheren van blokkeerdata, het bouwen van serviceorder-items, het verbinden met externe inhoudsproviders en het configureren van geautomatiseerde workflows met voorwaarden en acties.

</div>

**Basispad:** `/doing`

## Plannen

Basispad: `/doing/plans`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | — | Lijst alle plannen voor kerk |
| GET | `/:id` | JWT | — | Haal plan op ID |
| GET | `/ids?ids=` | JWT | — | Haal meerdere plannen door komma gescheiden ID's |
| GET | `/types/:planTypeId` | JWT | — | Haal plannen per plan type |
| GET | `/presenter` | JWT | — | Haal plannen voor volgende 7 dagen (presentator weergave) |
| GET | `/public/current/:planTypeId` | Openbaar | — | Haal huidigeplan voor plan type |
| POST | `/` | JWT | — | Maak of update plannen (accepteert enkel object of array) |
| POST | `/copy/:id` | JWT | — | Kopieer plan inclusief posities, tijden, toewijzingen en serviceorder-items. Body omvat `copyMode` ("none", "positions", "all") en `copyServiceOrder` (boolean) |
| POST | `/autofill/:id` | JWT | — | Automatisch vul vrijwilligers toewijzingen voor plan. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Verwijder plan en alle gerelateerde tijden, toewijzingen, posities en planitems |

### Voorbeeld: Plan kopiëren

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

## Plan Types

Basispad: `/doing/planTypes`

Breidt CRUD basisklasse uit (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` -- geen toestemmingscontroles).

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | — | Lijst alle plan types |
| GET | `/:id` | JWT | — | Haal plan type op ID |
| GET | `/ids?ids=` | JWT | — | Haal meerdere plan types door komma gescheiden ID's |
| GET | `/ministryId/:ministryId` | JWT | — | Haal plan types voor ministerie |
| POST | `/` | JWT | — | Maak of update plan types |
| DELETE | `/:id` | JWT | — | Verwijder plan type |

## Plan Items

Basispad: `/doing/planItems`

Beheert serviceorder-items (koppen, secties, nummers, enz.) georganiseerd in bovenliggende/onderliggende boomstructuur.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal plan item op ID |
| GET | `/ids?ids=` | JWT | — | Haal meerdere plan items door komma gescheiden ID's |
| GET | `/plan/:planId` | JWT | — | Haal alle plan items voor plan (retourneert boomstructuur) |
| GET | `/presenter/:churchId/:planId` | Openbaar | — | Haal plan items voor presentator weergave (retourneert boomstructuur) |
| POST | `/` | JWT | — | Maak of update plan items |
| POST | `/sort` | JWT | — | Update sort order voor plan item (sorteert siblings opnieuw) |
| DELETE | `/:id` | JWT | — | Verwijder plan item |

## Plan Feed

Basispad: `/doing/planFeed`

Biedt plan item feeds voor presentator. Als geen plan items voorkomen, auto-populate vanuit Lessons.church venue feed met plan `contentId`.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/presenter/:churchId/:planId` | Openbaar | — | Haal plan feed voor presentator (auto-populate vanuit venue feed als leeg) |

## Posities

Basispad: `/doing/positions`

Breidt CRUD basisklasse uit (GET `/:id`, POST `/`, DELETE `/:id` -- geen toestemmingscontroles).

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal positie op ID |
| GET | `/ids?ids=` | JWT | — | Haal meerdere posities door komma gescheiden ID's |
| GET | `/plan/ids?planIds=` | JWT | — | Haal posities voor meerdere plannen door komma gescheiden plan ID's |
| GET | `/plan/:planId` | JWT | — | Haal alle posities voor plan |
| POST | `/` | JWT | — | Maak of update posities |
| DELETE | `/:id` | JWT | — | Verwijder positie |

## Tijden

Basispad: `/doing/times`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/all` | JWT | — | Lijst alle tijden voor kerk |
| GET | `/:id` | JWT | — | Haal tijd op ID |
| GET | `/plans?planIds=` | JWT | — | Haal tijden voor meerdere plannen door komma gescheiden plan ID's |
| GET | `/plan/:planId` | JWT | — | Haal alle tijden voor plan |
| POST | `/` | JWT | — | Maak of update tijden |
| DELETE | `/:id` | JWT | — | Verwijder tijd |

## Toewijzingen

Basispad: `/doing/assignments`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/my` | JWT | — | Haal toewijzingen voor huidge gebruiker |
| GET | `/:id` | JWT | — | Haal toewijzing op ID |
| GET | `/plan/ids?planIds=` | JWT | — | Haal toewijzingen voor meerdere plannen door komma gescheiden plan ID's |
| GET | `/plan/:planId` | JWT | — | Haal alle toewijzingen voor plan |
| POST | `/` | JWT | — | Maak of update toewijzingen (zet status standaard op "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Accepteer toewijzing (moet de toegewezen persoon zijn) |
| POST | `/decline/:id` | JWT | — | Weiger toewijzing (moet de toegewezen persoon zijn) |
| DELETE | `/:id` | JWT | — | Verwijder toewijzing |

### Voorbeeld: Toewijzing accepteren

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

## Blokkeerdata

Basispad: `/doing/blockoutDates`

Breidt CRUD basisklasse uit (GET `/:id`, DELETE `/:id` -- geen toestemmingscontroles).

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal blokkeerdata op ID |
| GET | `/ids?ids=` | JWT | — | Haal meerdere blokkeerdata door komma gescheiden ID's |
| GET | `/my` | JWT | — | Haal blokkeerdata voor huidge gebruiker |
| GET | `/upcoming` | JWT | — | Haal alle komende blokkeerdata voor kerk |
| POST | `/` | JWT | — | Maak of update blokkeerdata (zet personId standaard op huidge gebruiker als niet gegeven) |
| DELETE | `/:id` | JWT | — | Verwijder blokkeerdata |

## Taken

Basispad: `/doing/tasks`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | — | Haal openstaande taken voor huidge gebruiker |
| GET | `/:id` | JWT | — | Haal taak op ID |
| GET | `/closed` | JWT | — | Haal gesloten taken voor huidge gebruiker |
| GET | `/timeline?taskIds=` | JWT | — | Haal tijdlijngegevens voor taken door komma gescheiden taak ID's |
| GET | `/directoryUpdate/:personId` | JWT | — | Haal directory update taak voor persoon |
| POST | `/` | JWT | — | Maak of update taken. Voeg `?type=directoryUpdate` toe om directory update taken af te handelen (auto-upload foto's) |
| POST | `/loadForGroups` | JWT | — | Laad taken voor specifieke groepen. Body: `{ groupIds: [], status: "Open" }` |

## Automatisering

Basispad: `/doing/automations`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | — | Lijst alle automatisering voor kerk |
| GET | `/:id` | JWT | — | Haal automatisering op ID |
| GET | `/check` | Openbaar | — | Zet een controle van alle automatisering aan |
| POST | `/` | JWT | — | Maak of update automatisering |
| DELETE | `/:id` | JWT | — | Verwijder automatisering |

## Acties

Basispad: `/doing/actions`

Acties definiëren wat gebeurt wanneer automatisering wordt geactiveerd.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal actie op ID |
| GET | `/automation/:id` | JWT | — | Haal alle acties voor automatisering |
| POST | `/` | JWT | — | Maak of update acties |
| DELETE | `/:id` | JWT | — | Verwijder actie |

## Voorwaarden

Basispad: `/doing/conditions`

Voorwaarden definiëren de criteria die automatisering activeren.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal voorwaarde op ID |
| GET | `/automation/:id` | JWT | — | Haal alle voorwaarden voor automatisering |
| POST | `/` | JWT | — | Maak of update voorwaarden |
| DELETE | `/:id` | JWT | — | Verwijder voorwaarde |

## Conjuncties

Basispad: `/doing/conjunctions`

Conjuncties linken meerdere voorwaarden in automatisering (AND/OR logica).

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal conjunctie op ID |
| GET | `/automation/:id` | JWT | — | Haal alle conjuncties voor automatisering |
| POST | `/` | JWT | — | Maak of update conjuncties |
| DELETE | `/:id` | JWT | — | Verwijder conjunctie |

## Content Provider Auths

Basispad: `/doing/contentProviderAuths`

Breidt CRUD basisklasse uit (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` -- geen toestemmingscontroles).

Beheert OAuth verificatieverslagen voor externe inhoudsprovodders (bijv. presentatiesoftware integraties).

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | JWT | — | Lijst alle content provider auths |
| GET | `/:id` | JWT | — | Haal content provider auth op ID |
| GET | `/ids?ids=` | JWT | — | Haal meerdere content provider auths door komma gescheiden ID's |
| GET | `/ministry/:ministryId` | JWT | — | Haal alle content provider auths voor ministerie |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Haal auth verslag voor specifieke ministerie en provider |
| POST | `/` | JWT | — | Maak of update content provider auths |
| DELETE | `/:id` | JWT | — | Verwijder content provider auth |

## Provider Proxy

Basispad: `/doing/providerProxy`

Proxy aanvragen naar externe inhoudsprovodders (bijv. ProPresenter, EasyWorship). Behandelt token vernieuwing automatisch wanneer tokens verlopen.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| POST | `/browse` | JWT | — | Blader content provider bestanden. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Haal presentaties vanuit content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Haal afspeellijst vanuit content provider. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Haal instructies voor inhoudsitem. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Haal uitgebreide instructies voor inhoudsitem. Body: `{ ministryId, providerId, path }` |

## Gerelateerde pagina's

- [Lidmaatschap Eindpunten](./membership) — Mensen, groepen, rollen en toestemmingen
- [Aanwezigheid Eindpunten](./attendance) — Service en bezoek tracering
- [Modulestructuur](../module-structure) — Codeorganisatiepatronen
