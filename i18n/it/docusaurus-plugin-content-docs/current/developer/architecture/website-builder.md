---
title: "Architettura del Generatore di Sito Web"
---

# Architettura del Generatore di Sito Web

<div class="article-intro">

Ogni sito web della chiesa servito da B1App è renderizzato da un albero di contenuto -- pagine, sezioni, elementi -- archiviati in ContentApi e modificati visivamente in B1Admin. Una biblioteca di componenti condivisa renderizza sia l'anteprima dell'editor che il sito live, un catalogo dei tipi di elementi definisce cosa può apparire su una pagina, e un servizio AI separato può generare o riscrivere quell'albero.

</div>

## Panoramica

```
┌──────────────────────────┐             ┌─────────────────────────┐
│  B1Admin — editor        │             │  Api — /content module  │
│  ContentEditor · ...     │  POST /…    │  pages · sections ·     │
│  ElementEdit · ...       │ ──────────▶ │  elements · blocks      │
└──────────────┬───────────┘             └───────────┬─────────────┘
               │                                     │
               │  rendering condiviso                ▼
               │   ┌─────────────────────┐  GET /content/pages/tree
               └──▶│  @churchapps/helpers│◀──│  B1App — public site  │
                   │  ElementTypes.ts    │   │  Zone → Section →     │
                   │  @churchapps/...    │   │  Element              │
                   └─────────────────────┘   └───────────────────────┘
```

Tre regole:

1. **Un albero, due renderer.** Una pagina è un albero `pagine → sezioni → elementi` dove ogni nodo trasporta i suoi impostazioni come JSON.
2. **Il contratto vive in `@churchapps/helpers`.** `ElementTypes.ts` è l'unico catalogo dei tipi di elemento.
3. **Il sito pubblico legge endpoint anonimi.** Tutto ciò che B1App necessita è pubblico. L'autenticazione è facoltativa: un JWT sblocca solo pagine solo per membri.

## L'Albero di Contenuto

Il modulo di contenuto (Api/src/modules/content) possiede i dati del builder:

| Tabella | Ruolo |
|-------|------|
| `pages` | Una pagina per URL con `visibility` e `metaDescription` |
| `sections` | Bande orizzontali su una pagina |
| `elements` | Pezzi di contenuto dentro una sezione |
| `blocks` | Sezioni/elementi riutilizzabili |
| `posts` | Post di blog autonomi |
| `redirects` | Coppie `fromPath → toPath` per chiesa |
| `settings` | Impostazioni della chiesa chiave-valore |

## Il Contratto Elemento

### Il Catalogo

`Packages/helpers/src/ElementTypes.ts` definisce ogni tipo di elemento come `ElementTypeDefinition`. **35 tipi vengono spediti oggi:**

| Categoria | Tipi |
|----------|------|
| layout (6) | row, column, box, carousel, whiteSpace, block |
| content (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| church (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| advanced (2) | rawHTML, iframe |

### Renderer

I renderer vivono in `Packages/apphelper/src/website/components/elementTypes/`, uno per tipo, risolti tramite `ElementRegistry.ts`.

### Moduli Editor

I moduli per tipo vivono in `B1Admin/src/site/admin/elements/`.

## Elementi Dati di Chiesa

Tre tipi di elemento renderizzano dati di chiesa in diretta:

| Elemento | Endpoint | Note |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/.../:fundId/total` | Ritorna importi e conteggi di donazione |
| `staffGrid` | `GET /membership/groupmembers/public/.../:groupId` | Richiede `publicRoster` impostato |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Ritorna l'albero campus → servizio → ora |

## Pagine Solo Membri

`pages.visibility` riutilizza l'enum dei link di navigazione -- `everyone`, `visitors`, `members`, `staff`, `team`, `groups` -- come una **porta di accesso rigida**.

## SEO e Scopribilità

- Meta descrizioni da `pages.metaDescription`
- Reindirizzamenti da `redirects` righe
- JSON-LD strutturato per post blog e pagine di sermone
- Feed RSS per blog
- Sitemap per chiesa

## Generazione AI (AskApi)

La generazione di pagine e siti viene eseguita in **AskApi**, un servizio separato, sotto il controller `/website`. Restituisce JSON e il chiamante (B1Admin) persiste il risultato tramite ContentApi.

## Pagine Correlate

- [Routing del Sito Web e Multi-Sito](./websites) — come una richiesta si risolve in una chiesa/sito
- [Endpoint di Contenuto](../api/endpoints/content) — superficie REST completa
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che spedisce i renderer
- [Editor della Pagina](../../b1-admin/website/page-editor) — documentazione per staff
