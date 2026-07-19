---
title: "API"
---

# API

<div class="article-intro">

L'API ChurchApps è una **monolite modulare** -- una singola codebase che serve sei moduli dati, ciascuno con il proprio database. Questa architettura ti offre i vantaggi organizzativi dei microservizi (limiti chiari, archivi dati indipendenti) con la semplicità operativa di una singola distribuzione.

</div>

## Moduli

| Modulo | Scopo |
|--------|---------|
| **Membership** | Persone, gruppi, famiglie, permessi |
| **Attendance** | Servizi, sessioni, record di check-in |
| **Content** | Pagine, sezioni, elementi, streaming |
| **Giving** | Donazioni, fondi, elaborazione pagamenti |
| **Messaging** | Conversazioni, notifiche, email |
| **Doing** | Attività, piani, assegnazioni |

## Stack Tecnologico

- **Runtime:** Node.js 22.x con TypeScript (moduli ES)
- **Framework:** Express
- **Dependency Injection:** Inversify (routing basato su decorator)
- **Database:** MySQL -- un database per modulo, ciascuno con il proprio pool di connessioni
- **Auth:** Autenticazione basata su JWT tramite `CustomAuthProvider`
- **Deployment:** AWS Lambda tramite Serverless Framework v3

## Porte

| Protocollo | Porta | Descrizione |
|----------|------|-------------|
| HTTP | `8084` | API REST principale |
| WebSocket | `8087` | Connessioni socket in tempo reale |

## Funzioni Lambda

Quando distribuito su AWS, l'API viene eseguito come sei funzioni Lambda:

- **`web`** -- Gestisce tutte le richieste HTTP
- **`socket`** -- Gestisce le connessioni WebSocket
- **`timer15Min`** -- Viene eseguito ogni 30 minuti per le notifiche email (il nome è storico)
- **`timerMidnight`** -- Viene eseguito giornalmente per email di riepilogo e attività di manutenzione
- **`timerScheduledTasks`** -- Viene eseguito giornalmente per le automazioni dovute e l'elaborazione del flusso di lavoro in ritardo
- **`timerWebhooks`** -- Viene eseguito ogni minuto per consegnare i webhook in uscita in coda

## Librerie Condivise

L'API dipende da due pacchetti ChurchApps condivisi:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilità di base (DateHelper, ApiHelper, ecc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilità del server Express incluse auth, aiutanti di database e integrazioni AWS

:::info
L'API utilizza moduli ES (`"type": "module"` in `package.json`). Assicurati che le tue importazioni utilizzino la sintassi dei moduli ES.
:::

## In questa sezione

- **[Configurazione locale](./local-setup)** -- Clona, configura ed esegui l'API localmente
- **[Database](./database)** -- Architettura database-per-modulo, script di schema e pattern di accesso ai dati
- **[Struttura dei moduli](./module-structure)** -- Controller, repository, modelli e autenticazione
- **[Chiavi API](./api-keys)** -- Token di accesso personali per script e connettori
- **[App connesse (OAuth)](./connected-apps)** -- Flusso OAuth multi-tenant per app di terze parti
- **[Webhook](./webhooks)** -- Notifiche di evento push a sistemi esterni
- **[Server MCP](./mcp)** -- Endpoint Model Context Protocol che espone l'API agli assistenti IA
- **[Riferimento degli endpoint](./endpoints/)** -- Documentazione completa dell'API REST per tutti i moduli
