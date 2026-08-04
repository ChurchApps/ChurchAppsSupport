---
title: "Architettura"
---

# Architettura

<div class="article-intro">

Queste pagine sono mappe di sistema cross-repo: documentano come funziona end-to-end un sistema centrale di ChurchApps — attraverso le app, i moduli API e le librerie condivise — piuttosto che come è configurato un singolo progetto. Leggile prima di modificare il comportamento di un sistema; leggi [Setup](../setup/) per avviare un progetto e la [sezione API](../api/) per il riferimento a livello di endpoint.

</div>

## L'ecosistema in breve

ChurchApps è composto da ~20 repository indipendenti (non un monorepo). Le app client parlano con un piccolo insieme di API di backend via HTTPS e WebSocket, e condividono il codice tramite pacchetti npm pubblicati sotto lo scope `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Client                        │            │  Api — monolite modulare centrale (AWS Lambda)│
│                                │            │                                              │
│  B1Admin    dashboard staff    │   HTTPS    │   membership    attendance    content        │
│  B1App      portale membri +   │ ─────────▶ │   giving        messaging     doing          │
│             siti web chiesa    │            │                                              │
│  B1Checkin  chiosco check-in   │ ◀───WS───▶ │   un database MySQL per modulo (6 totali)    │
│  B1Mobile   (solo manutenzione)│            └──────────────────────────────────────────────┘
│  FreePlay   lettore contenuti TV│           ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — backend di Lessons.church      │
                │                             └──────────────────────────────────────────────┘
                │  codice condiviso via npm (@churchapps/*)
                ▼
   helpers (interfacce cross-app) · apphelper (componenti React) · apihelper (utilità Express/server)
```

Due regole strutturali modellano tutto ciò che è documentato in questa sezione:

1. **I moduli sono isolati.** Ogni modulo dell'Api possiede il proprio database e le proprie tabelle; gli altri moduli e le app raggiungono i suoi dati solo tramite i suoi endpoint REST. Vedi [Struttura del modulo](../api/module-structure).
2. **Il codice condiviso viene distribuito come pacchetti npm.** Le app non importano mai il codice sorgente l'una dell'altra; tutto ciò che viene riutilizzato attraversa i confini dei repository tramite `@churchapps/helpers`, `@churchapps/apphelper` o `@churchapps/apihelper`. Vedi [Librerie condivise](../shared-libraries/).

## Mappe di sistema

| Pagina | Cosa copre | Coinvolge |
|------|----------------|-------|
| [Notifiche e promemoria](./notifications) | Come qualsiasi cosa comunica qualcosa a una persona: le due porte di invio, la catena di escalation dei canali e il motore dei promemoria | Api (messaging), B1Admin, B1App |
| [Architettura in tempo reale](../realtime) | Il framework di consegna WebSocket dietro chat, presenza e consegna in-app | Api (messaging), tutte le app web |
| [Notifiche push web](../web-push) | Il canale push del browser: chiavi VAPID, archiviazione delle sottoscrizioni, consegna | Api (messaging), tutte le app web |
| [Contributi](./giving) | Provider di pagamento e gateway, flussi di donazione, fondi/batch, webhook del gateway | Api (giving), apphelper, B1App, B1Admin |
| [Registrazioni agli eventi](./registrations) | Il modello commerciale della registrazione: tipi di partecipanti, selezioni, codici sconto, pagamenti tramite il gateway di donazione e la lista d'attesa | Api (content + giving), B1App, B1Admin |
| [Check-in](./check-ins) | Chiosco e self check-in, il modello dati delle presenze, l'instradamento delle stanze, lo strato di sicurezza per i bambini, la stampa delle etichette | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | L'albero pagina/sezione/elemento, il contratto dei tipi di elemento e i renderer, il blog, le pagine ad accesso riservato, la SEO e la generazione con AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routing del sito web e multi-sito](./websites) | Come una richiesta si risolve in una chiesa e in un sito specifico, il modello dati multi-sito `siteId`, e il bordo Caddy per i domini personalizzati | B1App, Api (membership + content), B1Admin |
| [Integrazioni](./integrations) | La superficie di estensione: OAuth, chiavi API, webhook, provider di contenuti, MCP | Api, librerie condivise, app esterne |
| [Registro di audit e batch annullabili](./audit-log) | Auditing predefinito di ogni mutazione al punto di controllo del controller, e lo strato batch che rende annullabili le importazioni e le azioni in blocco | Api (tutti i moduli), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Il servizio a pagamento di archiviazione e credito SMS: identità JWT condivisa, S2S con chiave di servizio, i seam dei provider di messaggistica e archiviazione, fatturazione Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pacchetti texting/apihelper, B1Admin |

:::tip
Quando una modifica altera il funzionamento di uno di questi sistemi — non solo una pagina all'interno di un'app — la mappa di sistema corrispondente qui dovrebbe essere aggiornata nello stesso intervento. Questo mantiene questa sezione affidabile come primo punto di riferimento per i nuovi collaboratori.
:::
