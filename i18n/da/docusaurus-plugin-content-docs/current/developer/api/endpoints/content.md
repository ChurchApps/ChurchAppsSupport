---
title: "Indholds slutpunkter"
---

# Indholds slutpunkter

<div class="article-intro">

Indholds modulet administrerer webside sider, afsnit, elementer, blokke, prædikener, afspilningslister, streaming tjenester, arrangementer, kuraterede kalendere, filer, gallerier, Bibel oversættelser og vers opslag, sange, arrangementer, globale stilarter, stock fotos og indstillinger. Det er det største modul i API'en og giver kraft til CMS'en, media/streaming, worship planlægning og Bibel funktioner på tværs af alle ChurchApps applikationer.

</div>

**Basesti:** `/content`

## Sider

Basesti: `/content/pages`

| Metode | Sti | Auth | Tilladelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Offentlig | — | Load fuld side træ (afsnit, elementer, blokke) efter URL eller ID. Fjerner interne ID'er når hentet efter URL |
| GET | `/:id` | JWT | — | Få en side efter ID |
| GET | `/` | JWT | — | List alle sider for kirken |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliker en side med alle afsnit og elementer |
| POST | `/temp/ai` | JWT | Content.Edit | Gem en AI-genereret side (side, afsnit og elementer i et opkald) |
| POST | `/` | JWT | Content.Edit | Opret eller opdater sider (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slet en side |

## Relaterede sider

- [Medlemskab slutpunkter](./membership) -- Mennesker, kirker, grupper, roller og tilladelser
- [Godkendelse & Tilladelser](./authentication) -- Login flow, JWT, tilladels model
- [Modul struktur](../module-structure) -- Kode organiserings mønstre
