---
title: "Gørende slutpunkter"
---

# Gørende slutpunkter

<div class="article-intro">

Gørende modulet administrerer service planlægning, frivillig planlægning, opgave administration og automationer. Det giver værktøjer til at oprette serviceplaner med tider og positioner, tildele frivillige, administrere blokerings dage, bygge serviceordre emner, forbinde til eksterne indholds udbydere og konfigurere automatiserede arbejdsgange med betingelser og handlinger.

</div>

**Basesti:** `/doing`

## Planer

Basesti: `/doing/plans`

| Metode | Sti | Auth | Tilladelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List alle planer for kirken |
| GET | `/:id` | JWT | — | Få en plan efter ID |
| GET | `/ids?ids=` | JWT | — | Få flere planer efter komma-adskilt ID'er |
| GET | `/types/:planTypeId` | JWT | — | Få planer efter plantype |
| GET | `/presenter` | JWT | — | Få planer til de næste 7 dage (præsentator visning) |
| GET | `/public/current/:planTypeId` | Offentlig | — | Få den aktuelle plan for en plantype |
| POST | `/` | JWT | — | Opret eller opdater planer (accepterer enkelt objekt eller array) |
| POST | `/copy/:id` | JWT | — | Kopiér en plan herunder positioner, tider, tildelte opgaver og serviceordre emner. Brød omfatter `copyMode` ("none", "positions", "all") og `copyServiceOrder` (boolean) |
| POST | `/autofill/:id` | JWT | — | Auto-udfyld frivillige tildelte opgaver for en plan. Brød: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Slet en plan og alle relaterede tider, tildelte opgaver, positioner og plan emner |

## Relaterede sider

- [Medlemskab slutpunkter](./membership) — Mennesker, grupper, roller og tilladelser
- [Tilstedeværelse slutpunkter](./attendance) — Service og besøg sporing
- [Modul struktur](../module-structure) — Kode organiserings mønstre
