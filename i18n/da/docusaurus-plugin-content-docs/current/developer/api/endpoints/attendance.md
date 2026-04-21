---
title: "Tilstedeværelse slutpunkter"
---

# Tilstedeværelse slutpunkter

<div class="article-intro">

Tilstedeværelse modulet administrerer campus steder, tjenester, serviceider, tilstedeværelse sessioner, besøg og besøg sessioner. Det giver infrastrukturen til at spore hvem der deltog hvilken gudstjeneste eller gruppemøde, understøtter tjek ind arbejdsgange og tilbyder tilstedeværelse trend og opsummerings rapportering.

</div>

**Basesti:** `/attendance`

## Campusser

Basesti: `/attendance/campuses`

Standard CRUD kontrol (udvider GenericCrudController). Giver `getById`, `getAll`, `post` og `delete` ruter via CRUD base klassen.

| Metode | Sti | Auth | Tilladelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle campusser til kirken |
| GET | `/:id` | JWT | — | Få en campus ved ID |
| POST | `/` | JWT | Services.Edit | Opret eller opdater campusser |
| DELETE | `/:id` | JWT | Services.Edit | Slet en campus |

## Tjenester

Basesti: `/attendance/services`

Udvider GenericCrudController med CRUD ruter `getById`, `getAll`, `post` og `delete`. `getAll` (`GET /`) og `search` slutpunkter er overskrevet med brugerdefinerede implementeringer.

| Metode | Sti | Auth | Tilladelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle tjenester (omfatter campus info) |
| GET | `/:id` | JWT | — | Få en tjeneste ved ID |
| GET | `/search?campusId=` | JWT | — | Søg tjenester efter campus ID |
| POST | `/` | JWT | Services.Edit | Opret eller opdater tjenester |
| DELETE | `/:id` | JWT | Services.Edit | Slet en tjeneste |

## Relaterede artikler

- [Medlemskab slutpunkter](./membership) — Mennesker, grupper, roller og kirkestyre
- [Godkendelse & Tilladelser](./authentication) — Login flow, JWT, tilladels model
- [Modul struktur](../module-structure) — Kode organiserings mønstre
