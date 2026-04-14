---
title: "Oppmøte API-endepunkter"
---

# Oppmøte API-endepunkter

<div class="article-intro">

Oppmøtemodulen administrerer campuslokasjoner, servicer, servicetider, oppmøteøkter, besøk og besøksøkter. Den gir infrastrukturen for oppmøtesporing for servicer eller gruppemøter, støtter innsjekkingsarbeidsflyter og tilbyr oppmøtetrender og sammendragsrapportering.

</div>

**Basisbane:** `/attendance`

## Campuser

Basisbane: `/attendance/campuses`

Standard CRUD-kontroller (utvider GenericCrudController). Gir `getById`, `getAll`, `post`, og `delete`-ruter via CRUD-baseklassen.

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Vis alle campuser for kirken |
| GET | `/:id` | JWT | — | Hent en campus etter ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater campuser |
| DELETE | `/:id` | JWT | Services.Edit | Slett en campus |

## Servicer

Basisbane: `/attendance/services`

Utvider GenericCrudController med CRUD-ruter `getById`, `getAll`, `post` og `delete`. `getAll` (`GET /`) og `search`-endepunktene overstyres med egendefinerte implementeringer.

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Vis alle servicer (inkluderer campusinformasjon) |
| GET | `/:id` | JWT | — | Hent en service etter ID |
| GET | `/search?campusId=` | JWT | — | Søk servicer etter campus-ID |
| POST | `/` | JWT | Services.Edit | Opprett eller oppdater servicer |
| DELETE | `/:id` | JWT | Services.Edit | Slett en service |

### Eksempel: Søk servicer etter campus

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Søndagmorgen"
  }
]
```

## Servicetider

Se API-dokumentasjonen for detaljer.
