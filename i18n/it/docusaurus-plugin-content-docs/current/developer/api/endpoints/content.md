---
title: "Endpoint di Contenuto"
---

# Endpoint di Contenuto

<div class="article-intro">

Il modulo Content gestisce le pagine del sito web, le sezioni, gli elementi, i blocchi, i post del blog, i reindirizzamenti, i sermoni, le liste di riproduzione, i servizi di streaming, gli eventi, i calendari curati, i file, le gallerie, le traduzioni bibliche e le ricerche di versetti, le canzoni, gli arrangiamenti, gli stili globali, le foto stock e le impostazioni. È il modulo più grande dell'API e alimenta il CMS, i media/streaming, la pianificazione del culto e le funzioni della Bibbia in tutte le applicazioni di ChurchApps.

</div>

**Percorso di base:** `/content`

## Pagine

Percorso di base: `/content/pages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Carica l'albero della pagina completo |
| POST | `/` | JWT | Content.Edit | Creare o aggiornare pagine |
| DELETE | `/:id` | JWT | Content.Edit | Eliminare una pagina |

## Articoli Correlati

- [Membership Endpoints](./membership)
- [Attendance Endpoints](./attendance)
