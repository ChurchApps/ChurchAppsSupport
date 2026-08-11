---
title: "Architettura"
---

# Architettura

<div class="article-intro">

Queste pagine sono mappe di sistema tra repository: documentano come un sistema core ChurchApps funziona end-to-end -- attraverso le app, i moduli API e le librerie condivise -- piuttosto che come un singolo progetto sia configurato. Leggi prima di cambiare il comportamento di un sistema; leggi [Setup](../setup/) per ottenere un progetto in esecuzione e la [sezione API](../api/) per il riferimento a livello di endpoint.

</div>

## L'ecosistema a colpo d'occhio

ChurchApps è ~20 repository indipendenti (non un monorepo). Le app client parlano con un piccolo set di API backend su HTTPS e WebSocket, e condividono il codice attraverso i pacchetti npm pubblicati sotto lo scope `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Client                        │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Due regole strutturali plasmare tutto quello documentato in questa sezione:

1. **I moduli sono isolati.** Ogni modulo Api possiede il suo database e le sue tabelle; altri moduli e app raggiungono i suoi dati solo attraverso i suoi endpoint REST. Vedi [Struttura Modulo](../api/module-structure).
2. **Il codice condiviso viene spedito come pacchetti npm.** Le app non importano mai il sorgente dell'altro; qualsiasi cosa riutilizzata attraversa i confini del repository attraverso `@churchapps/helpers`, `@churchapps/apphelper`, o `@churchapps/apihelper`. Vedi [Librerie Condivise](../shared-libraries/).

## Mappe di sistema

| Pagina | Copre | Copre |
|--------|-------|-------|
| [Notifiche e Promemoria](./notifications) | Come qualsiasi cosa dice a una persona qualcosa: le due porte di invio, la catena di escalation del canale e il motore di promemoria | Api (messaging), B1Admin, B1App |
| [Architettura Real-time](../realtime) | Il framework di consegna WebSocket dietro chat, presence e consegna in-app | Api (messaging), tutte le app web |
| [Notifiche Push Web](../web-push) | Il canale push del browser: chiavi VAPID, archiviazione dell'iscrizione, consegna | Api (messaging), tutte le app web |
| [Donazioni](./giving) | Provider di pagamento e gateway, flussi di donazione, fondi/batch, webhook del gateway | Api (giving), apphelper, B1App, B1Admin |
| [Registrazioni di Evento](./registrations) | Il modello di commercio di registrazione: tipi di partecipante, selezioni, codici sconto, pagamenti tramite gateway di donazione e la lista d'attesa | Api (content + giving), B1App, B1Admin |
| [Check-in](./check-ins) | Chiosco e auto check-in, il modello di dati di frequenza, instradamento della stanza, il livello di sicurezza infantile, stampa di etichette | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Generatore di Sito Web](./website-builder) | L'albero pagina/sezione/elemento, il contratto di tipo di elemento e i renderer, blog, pagine gated di accesso, SEO e generazione AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routing del Sito Web e Multi-Sito](./websites) | Come una richiesta si risolve a una chiesa e un sito specifico, il modello di dati multi-sito `siteId` e il bordo Caddy di dominio personalizzato | B1App, Api (membership + content), B1Admin |
| [Integrazioni](./integrations) | La superficie di estensione: OAuth, chiavi API, webhook, provider di contenuto, MCP | Api, librerie condivise, app esterne |
| [Registro di Audit e Batch Annullabili](./audit-log) | Auditing impostato di default di ogni mutazione al punto di soffocamento del controller e il livello di batch che rende importazioni e azioni in massa annullabili | Api (tutti i moduli), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Il servizio a pagamento di archiviazione e crediti di texting: identità JWT condivisa, S2S della chiave di servizio, i seam del provider di texting e archiviazione, fatturazione Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pacchetti texting/apihelper, B1Admin |
| [Archiviazione Bring-Your-Own](./byos-storage) | Le chiese collegano Google Drive, Dropbox, OneDrive o un bucket S3-compatibile per upload oltre i 100MB liberi: connect OAuth, forme di upload per provider, redirect di download pubblico | Api (content + membership), pacchetti helpers/apphelper, B1Admin, B1App |

:::tip
Quando un cambiamento altera il funzionamento di uno di questi sistemi -- non solo una pagina all'interno di un'app -- la mappa di sistema corrispondente qui dovrebbe essere aggiornata nello stesso sforzo. Questo mantiene questa sezione affidabile come la prima fermata per i nuovi contributori.
:::
