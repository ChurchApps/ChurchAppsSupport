---
title: "Architettura"
---

# Architettura

<div class="article-intro">

Queste pagine sono mappe di sistema cross-repository: descrivono come funziona un sistema core di ChurchApps dall'inizio alla fine — attraverso le app, i moduli dell'API e le librerie condivise — anziché come configurare un singolo progetto. Leggile prima di modificare il comportamento di un sistema; leggi [Setup](../setup/) per avviare un progetto e la [sezione API](../api/) per il riferimento agli endpoint.

</div>

## L'ecosistema in sintesi

ChurchApps è composto da circa 20 repository indipendenti (non è un monorepo). Le app client comunicano con un piccolo insieme di API backend tramite HTTPS e WebSocket, e condividono il codice tramite pacchetti npm pubblicati con lo scope `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
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

Due regole strutturali determinano tutto ciò che è documentato in questa sezione:

1. **I moduli sono isolati.** Ogni modulo dell'Api possiede il proprio database e le proprie tabelle; gli altri moduli e le app raggiungono i suoi dati solo tramite i suoi endpoint REST. Vedi [Struttura dei moduli](../api/module-structure).
2. **Il codice condiviso viene distribuito come pacchetti npm.** Le app non importano mai il sorgente l'una dell'altra; tutto ciò che viene riutilizzato attraversa i confini dei repository tramite `@churchapps/helpers`, `@churchapps/apphelper` o `@churchapps/apihelper`. Vedi [Librerie condivise](../shared-libraries/).

## Mappe di sistema

| Pagina | Cosa descrive | Coinvolge |
|------|----------------|-------|
| [Notifiche e promemoria](./notifications) | Come un sistema comunica qualcosa a una persona: le due porte di invio, la catena di escalation dei canali e il motore dei promemoria | Api (messaging), B1Admin, B1App |
| [Architettura in tempo reale](../realtime) | Il framework di consegna WebSocket alla base di chat, presenza e consegna in-app | Api (messaging), tutte le app web |
| [Notifiche push web](../web-push) | Il canale push del browser: chiavi VAPID, archiviazione delle iscrizioni, consegna | Api (messaging), tutte le app web |
| [Donazioni](./giving) | Provider e gateway di pagamento, flussi di donazione, fondi/lotti, webhook dei gateway | Api (giving), apphelper, B1App, B1Admin |
| [Iscrizioni agli eventi](./registrations) | Il modello commerciale delle iscrizioni: tipi di partecipante, selezioni, codici sconto, pagamenti tramite il gateway delle donazioni, e la lista d'attesa | Api (content + giving), B1App, B1Admin |
| [Check-In](./check-ins) | Check-in al kiosk e self check-in, modello dei dati delle presenze, instradamento verso le aule, livello di sicurezza dei minori, stampa delle etichette | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Costruttore di siti web](./website-builder) | L'albero di pagine/sezioni/elementi, il contratto dei tipi di elemento e i renderer, il blog, le pagine con accesso limitato, la SEO e la generazione con IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routing dei siti web e multi-sito](./websites) | Come una richiesta viene risolta in una chiesa e in un sito specifico, il modello dei dati multi-sito con `siteId` e il bordo Caddy per i domini personalizzati | B1App, Api (membership + content), B1Admin |
| [Integrazioni](./integrations) | La superficie di estensione: OAuth, chiavi API, webhook, provider di contenuti, MCP | Api, librerie condivise, app esterne |
| [Registro di audit e batch annullabili](./audit-log) | Audit attivo per impostazione predefinita di ogni modifica nel punto di controllo dei controller, e il livello di batch che rende annullabili importazioni e azioni in blocco | Api (tutti i moduli), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Il servizio a pagamento per l'archiviazione e i crediti per gli SMS: identità tramite JWT condiviso, S2S con chiave di servizio, i punti di estensione dei provider di messaggistica e archiviazione, fatturazione Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pacchetti texting/apihelper, B1Admin |
| [Archiviazione propria (BYOS)](./byos-storage) | Le chiese collegano Google Drive, Dropbox, OneDrive o un bucket compatibile S3 per i caricamenti oltre i 100 MB gratuiti: connessione OAuth, forme di caricamento per provider, reindirizzamento pubblico al download | Api (content + membership), pacchetti helpers/apphelper, B1Admin, B1App |
| [Commons dei contenuti](./commons) | La struttura condivisa di asset e invii alla base dei contenuti generati dagli utenti tra prodotti, e la coda di moderazione unica riservata al personale in B1Admin Server Admin | Api (modulo commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Quando una modifica altera il funzionamento di uno di questi sistemi — e non solo una pagina all'interno di una singola app — la corrispondente mappa di sistema qui presente va aggiornata nello stesso lavoro. In questo modo la sezione resta affidabile come primo punto di riferimento per i nuovi collaboratori.
:::

## Proposte

Questi documenti descrivono lavori proposti in attesa di revisione, anziché comportamenti di prodotto disponibili.

| Proposta | Cosa descrive |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Account, chiavi, servizio e numero di telefono di proprietà della chiesa; ambito di integrazione, consenso, consegna, stime e verifiche di rilascio |
| [Bozza di onboarding Twilio per le chiese](./twilio-byok-onboarding-draft) | Impostazioni proposte per il modulo di iscrizione di B1, esempi di campagne specifiche per chiesa e liste di controllo per approvazione e operatività |
