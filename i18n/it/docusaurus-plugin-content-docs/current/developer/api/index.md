---
title: "API"
---

# API

<div class="article-intro">

L'API di ChurchApps è un **monolite modulare** -- un unico codebase che serve sei moduli di dati, ciascuno con il proprio database. Questa architettura offre i vantaggi organizzativi dei microservizi (confini chiari, archivi dati indipendenti) con la semplicità operativa di un'unica implementazione.

</div>

## Moduli

| Modulo | Scopo |
|--------|---------|
| **Membership** | Persone, gruppi, nuclei familiari, permessi |
| **Attendance** | Servizi, sessioni, registrazioni di check-in |
| **Content** | Pagine, sezioni, elementi, streaming |
| **Giving** | Donazioni, fondi, elaborazione pagamenti |
| **Messaging** | Conversazioni, notifiche, email |
| **Doing** | Attività, piani, assegnazioni |

## Stack Tecnologico

- **Runtime:** Node.js 22.x con TypeScript (moduli ES)
- **Framework:** Express
- **Dependency Injection:** Inversify (routing basato su decoratori)
- **Database:** MySQL -- un database per modulo, ciascuno con il proprio pool di connessioni
- **Autenticazione:** basata su JWT tramite `CustomAuthProvider`
- **Deployment:** AWS Lambda tramite Serverless Framework v3

## Porte

| Protocollo | Porta | Descrizione |
|----------|------|-------------|
| HTTP | `8084` | API REST principale |
| WebSocket | `8087` | Connessioni socket in tempo reale |

## Funzioni Lambda

Quando distribuita su AWS, l'API viene eseguita come sei funzioni Lambda:

- **`web`** -- Gestisce tutte le richieste HTTP
- **`socket`** -- Gestisce le connessioni WebSocket
- **`timer15Min`** -- Viene eseguita ogni 30 minuti per le notifiche email (il nome è storico)
- **`timerMidnight`** -- Viene eseguita quotidianamente per email di riepilogo e attività di manutenzione
- **`timerScheduledTasks`** -- Viene eseguita quotidianamente per le automazioni in scadenza e l'elaborazione dei flussi di lavoro in ritardo
- **`timerWebhooks`** -- Viene eseguita ogni minuto per consegnare i webhook in uscita accodati

## Librerie Condivise

L'API dipende da due pacchetti ChurchApps condivisi:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilità di base (DateHelper, ApiHelper, ecc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilità del server Express che includono autenticazione, helper per il database e integrazioni AWS

:::info
L'API utilizza moduli ES (`"type": "module"` in `package.json`). Assicurati che i tuoi import usino la sintassi dei moduli ES.
:::

## In Questa Sezione

- **[Configurazione Locale](./local-setup)** -- Clona, configura ed esegui l'API in locale
- **[Database](./database)** -- Architettura database-per-modulo, script di schema e pattern di accesso ai dati
- **[Struttura dei Moduli](./module-structure)** -- Controller, repository, modelli e autenticazione
- **[Chiavi API](./api-keys)** -- Token di accesso personale per script e connettori
- **[App Connesse (OAuth)](./connected-apps)** -- Flusso OAuth multi-tenant per app di terze parti
- **[Webhook](./webhooks)** -- Invia notifiche di eventi a sistemi esterni
- **[Server MCP](./mcp)** -- Endpoint Model Context Protocol che espone l'API agli assistenti AI
- **[Riferimento Endpoint](./endpoints/)** -- Documentazione completa dell'API REST per tutti i moduli
