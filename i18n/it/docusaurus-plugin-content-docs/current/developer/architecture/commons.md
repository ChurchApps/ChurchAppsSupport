---
title: "Content Commons"
---

# Content Commons — Biblioteca di Asset Condivisa e Moderazione

Il contenuto inviato dagli utenti condiviso tra prodotti (canzoni WorshipCommons, lezioni Lessons.church, modelli FreeShow, modelli di sito web B1) passa attraverso una singola coda di moderazione piuttosto che un flusso di revisione per prodotto.

## La Spina di Asset

Due tabelle trasportano ogni elemento commons, indipendentemente dal prodotto:

- **`assets`** — il file di identità pubblica. `status`: `pending` | `published` | `unpublished` | `removed`.
- **`assetFiles`** — ogni file allegato a un asset (audio, immagini, documenti).
- **`submissions`** — l'unità di moderazione. Ciclo di vita: `draft → pending → approved | rejected | withdrawn`.

L'approvazione di una presentazione esegue un **hook di pubblicazione** specifico del prodotto (Api/src/modules/commons/helpers/publishHooks/, ad es. `song.ts`) che espande la presentazione nei record del prodotto.

## Flusso di Presentazione

`CommonsSubmissionController` (Api/src/modules/commons/) è l'API rivolta all'utente finale: crea una bozza, presegna e allega file, invia per revisione o ritira.

## Coda di Moderazione

La coda vive in **B1Admin → Server Admin → Commons** (B1Admin/src/serverAdmin/components/CommonsTab.tsx), gestita dal permesso `Permissions.server.admin`.

Tre sub-tab:

- **Coda** — ogni presentazione in sospeso in tutti i prodotti. Filtrabile per prodotto/tipo di asset.
- **Rapporti** — rapporti di copyright e politica/qualità sugli asset pubblicati.
- **Asset** — un browser cercabile di contenuto pubblicato con azioni per asset: riepilogo, annullamento pubblicazione/ripubblicazione o rimozione.

Ogni endpoint sotto `/commons/admin/*` ricontrolla indipendentemente il permesso server-admin.

:::info
Questo design intenzionalmente ha una singola coda. L'interfaccia di moderazione `/admin` di WorshipCommons è stata ritirata a favore dell'instradamento di ogni presentazione di prodotto attraverso gli strumenti Server Admin di B1Admin.
:::

## Span

Api (modulo commons), B1Admin (Server Admin) e i siti del produttore esterno: WorshipCommons, Lessons.church, FreeShow, modelli del generatore di siti web B1.
