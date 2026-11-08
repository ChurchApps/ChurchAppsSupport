---
title: "Architettura"
description: "Mappe di sistema tra repository che mostrano come donazioni, check-in, notifiche e siti web funzionano tra B1 Admin, B1.church e l'Api, da consultare prima di modificarli."
---

# Architettura

<div class="article-intro">

Queste pagine sono mappe di sistema tra repository: descrivono come un sistema principale di ChurchApps funziona dall'inizio alla fine, attraverso le app, i moduli dell'API e le librerie condivise, anziché come è configurato un singolo progetto. Leggile prima di modificare il comportamento di un sistema; leggi [Configurazione](../setup/index.md) per avviare un progetto e la [sezione API](../api/index.md) per il riferimento a livello di endpoint.

</div>

## L'ecosistema in breve

ChurchApps comprende circa 20 repository indipendenti (non un monorepo). Le app client comunicano con un piccolo insieme di API di backend tramite HTTPS e WebSocket, e condividono il codice tramite pacchetti npm pubblicati nell'ambito `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Due regole strutturali determinano tutto ciò che è documentato in questa sezione:

1. **I moduli sono isolati.** Ogni modulo dell'Api possiede il proprio database e le proprie tabelle; gli altri moduli e le app accedono ai suoi dati solo tramite i suoi endpoint REST. Vedi [Struttura dei moduli](../api/module-structure.md).
2. **Il codice condiviso viene distribuito come pacchetti npm.** Le app non importano mai il codice sorgente l'una dell'altra; tutto ciò che viene riutilizzato attraversa i confini dei repository tramite `@churchapps/helpers`, `@churchapps/apphelper` o `@churchapps/apihelper`. Vedi [Librerie condivise](../shared-libraries/index.md).

## Mappe di sistema

| Pagina | Cosa descrive | Ambito |
|------|----------------|-------|
| [Notifiche e promemoria](./notifications.md) | Come qualsiasi cosa comunica qualcosa a una persona: le due porte di invio, la catena di escalation dei canali e il motore dei promemoria | Api (messaging), B1Admin, B1App |
| [Architettura in tempo reale](../realtime.md) | Il framework di distribuzione WebSocket alla base di chat, presenza e consegna in-app | Api (messaging), tutte le app web |
| [Notifiche push web](../web-push.md) | Il canale di push del browser: chiavi VAPID, archiviazione delle iscrizioni, invio | Api (messaging), tutte le app web |
| [Donazioni](./giving.md) | Fornitori di pagamento e gateway, flussi di donazione, fondi/lotti, webhook dei gateway | Api (giving), apphelper, B1App, B1Admin |
| [Iscrizioni agli eventi](./registrations.md) | Il modello commerciale delle iscrizioni: tipi di partecipanti, selezioni, codici sconto, pagamenti tramite il gateway delle donazioni e la lista d'attesa | Api (content + giving), B1App, B1Admin |
| [Check-in](./check-ins.md) | Check-in da chiosco e self check-in, modello dei dati di presenza, instradamento nelle stanze, livello di sicurezza dei minori, stampa delle etichette | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Creatore di siti web](./website-builder.md) | L'albero di pagine/sezioni/elementi, il contratto e i renderer dei tipi di elemento, il blog, le pagine con accesso limitato, la SEO e la generazione con IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Instradamento dei siti web e multi-sito](./websites.md) | Come una richiesta viene associata a una chiesa e a un sito specifico, il modello dei dati multi-sito con `siteId` e il bordo dei domini personalizzati Caddy | B1App, Api (membership + content), B1Admin |
| [Integrazioni](./integrations.md) | La superficie di estensione: OAuth, chiavi API, webhook, fornitori di contenuti, MCP | Api, librerie condivise, app esterne |
| [Registro di controllo e lotti annullabili](./audit-log.md) | Registrazione predefinita di ogni modifica al punto di controllo del controller, e il livello dei lotti che rende annullabili importazioni e azioni in blocco | Api (tutti i moduli), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Il servizio a pagamento di archiviazione e crediti per SMS: identità tramite JWT condiviso, S2S con chiave di servizio, punti di integrazione dei fornitori di SMS e archiviazione, fatturazione Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pacchetti texting/apihelper, B1Admin |
| [Archiviazione con mezzi propri](./byos-storage.md) | Le chiese collegano Google Drive, Dropbox, OneDrive o un bucket compatibile con S3 per caricamenti oltre i 100 MB gratuiti: connessione OAuth, forme di caricamento per fornitore, reindirizzamento pubblico per il download | Api (content + membership), pacchetti helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons.md) | Il nucleo condiviso di asset e invii alla base dei contenuti generati dagli utenti tra prodotti, e l'unica coda di moderazione riservata allo staff in Server Admin di B1Admin | Api (modulo commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Quando una modifica altera il funzionamento di uno di questi sistemi — non solo una pagina all'interno di una singola app — la relativa mappa di sistema qui presente deve essere aggiornata nello stesso lavoro. Questo mantiene la sezione affidabile come primo punto di riferimento per i nuovi collaboratori.
:::

## Proposte

Questi documenti descrivono lavori proposti da sottoporre a revisione, e non il comportamento disponibile del prodotto.

| Proposta | Cosa descrive |
|---|---|
| [BYOK per Twilio](./twilio-byok-proposal.md) | Account, chiavi, servizio e numero di telefono di proprietà della chiesa; ambito dell'integrazione, consenso, consegna, stime e verifiche di rilascio |
| [Bozza di onboarding delle chiese per Twilio](./twilio-byok-onboarding-draft.md) | Impostazioni proposte per il modulo di iscrizione di B1, esempi di campagne specifiche per chiesa e liste di controllo per l'approvazione e il funzionamento |
