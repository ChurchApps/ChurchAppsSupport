---
title: "Architettura"
---

# Architettura

<div class="article-intro">

Queste pagine sono mappe di sistema cross-repo: documentano come funziona end-to-end un sistema ChurchApps centrale — tra le app, i moduli API, e le librerie condivise — piuttosto che come un singolo progetto è configurato. Leggile prima di cambiare il comportamento di un sistema; leggi [Setup](../setup/) per far funzionare un progetto e la [sezione API](../api/) per il riferimento a livello di endpoint.

</div>

## L'ecosistema a colpo d'occhio

ChurchApps è ~20 repository indipendenti (non un monorepo). Le app client parlano a un piccolo insieme di API backend su HTTPS e WebSocket, e condividono il codice attraverso pacchetti npm pubblicati sotto lo scope `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Client                        │            │  Api — monolite modulare principale (AWS Lambda)
│                                │            │                                              │
│  B1Admin    dashboard staff    │   HTTPS    │   membership    attendance    content        │
│  B1App      portale membri +   │ ─────────▶ │   giving        messaging     doing          │
│             siti web chiese    │            │                                              │
│  B1Checkin  chiosco check-in   │ ◀───WS───▶ │   uno database MySQL per modulo (6 totali)  │
│  B1Mobile   (solo manutenzione)│            └──────────────────────────────────────────────┘
│  FreePlay   lettore contenuti TV│            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — backend Lessons.church          │
                │                             └──────────────────────────────────────────────┘
                │  codice condiviso via npm (@churchapps/*)
                ▼
   helpers (interfacce cross-app) · apphelper (componenti React) · apihelper (utilità Express/server)
```

Due regole strutturali modellano tutto documentato in questa sezione:

1. **I moduli sono isolati.** Ogni modulo Api possiede il suo database e le sue tabelle; gli altri moduli e le app raggiungono i suoi dati solo attraverso i suoi endpoint REST. Vedi [Struttura del modulo](../api/module-structure).
2. **Il codice condiviso viene spedito come pacchetti npm.** Le app non importano mai il codice sorgente l'una dell'altra; qualcosa di riusato attraversa i confini del repo tramite `@churchapps/helpers`, `@churchapps/apphelper`, o `@churchapps/apihelper`. Vedi [Librerie condivise](../shared-libraries/).

## Mappe di sistema

| Pagina | Cosa copre | Intervalli |
|------|----------------|-------|
| [Notifiche e promemoria](./notifications) | Come qualcosa dice a una persona qualcosa: le due porte di dispatch, la catena di escalation del canale, e il motore di promemoria | Api (messaging), B1Admin, B1App |
| [Architettura in tempo reale](../realtime) | Il framework di consegna WebSocket dietro chat, presenza, e consegna in-app | Api (messaging), tutte le app web |
| [Notifiche push del web](../web-push) | Il canale push del browser: chiavi VAPID, archiviazione di sottoscrizione, consegna | Api (messaging), tutte le app web |
| [Contributi](./giving) | Provider di pagamento e gateway, flussi di donazione, fondi/batch, webhook del gateway | Api (giving), apphelper, B1App, B1Admin |
| [Registrazioni agli eventi](./registrations) | Il modello di commercio di registrazione: tipi di partecipanti, selezioni, codici di sconto, pagamenti tramite il gateway di donazione, e la lista d'attesa | Api (content + giving), B1App, B1Admin |
| [Check-in](./check-ins) | Chiosco e self check-in, il modello di dati di presenza, routing delle stanze, lo strato di sicurezza dei bambini, stampa di etichette | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder) | L'albero pagina/sezione/elemento, il contratto di tipo elemento e i renderer, blog, pagine protette da accesso, SEO, e generazione AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routing del sito web e multi-sito](./websites) | Come una richiesta si risolve in una chiesa e un sito specifico, il modello di dati `siteId` multi-sito, e il bordo di dominio personalizzato Caddy | B1App, Api (membership + content), B1Admin |
| [Integrazioni](./integrations) | La superficie dell'estensione: OAuth, API key, webhook, provider di contenuti, MCP | Api, librerie condivise, app esterne |
| [Registro di audit e batch annullabili](./audit-log) | Auditing predefinito di ogni mutazione al punto di controllo del controller, e lo strato batch che rende le importazioni e le azioni bulk annullabili | Api (tutti i moduli), B1Admin, B1Transfer |

:::tip
Quando una modifica altera come funziona uno di questi sistemi — non solo una pagina dentro un'app — la mappa di sistema corrispondente qui dovrebbe essere aggiornata nello stesso sforzo. Quello mantiene questa sezione affidabile come prima fermata per i nuovi contributori.
:::
