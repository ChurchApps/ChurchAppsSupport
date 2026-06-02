---
title: "API"
---

# API

<div class="article-intro">

L'API di ChurchApps è un **monolite modulare** -- una singola codebase che serve sei moduli distinti, ognuno con il suo database. Questa architettura ti offre i vantaggi organizzativi dei microservizi (confini chiari, archivi dati indipendenti) con la semplicità operativa di un singolo deployment.

</div>

## Moduli

| Modulo | Scopo |
|--------|---------|
| **Membership** | Persone, gruppi, nuclei familiari, permessi |
| **Attendance** | Servizi, sessioni, registri di check-in |
| **Content** | Pagine, sezioni, elementi, streaming |
| **Giving** | Donazioni, fondi, elaborazione pagamenti |
| **Messaging** | Conversazioni, notifiche, email |
| **Doing** | Attività, piani, incarichi |

## Stack Tecnologico

- **Runtime:** Node.js 22.x con TypeScript (moduli ES)
- **Framework:** Express
- **Dependency Injection:** Inversify (routing basato su decoratori)
- **Database:** MySQL -- un database per modulo, ognuno con il suo pool di connessioni
- **Auth:** Autenticazione basata su JWT tramite `CustomAuthProvider`
- **Deployment:** AWS Lambda tramite Serverless Framework v3

## Porte

| Protocollo | Porta | Descrizione |
|----------|------|-------------|
| HTTP | `8084` | API REST principale |
| WebSocket | `8087` | Connessioni socket in tempo reale |

## Funzioni Lambda

Quando distribuito su AWS, l'API viene eseguito come quattro funzioni Lambda:

- **`web`** -- Gestisce tutte le richieste HTTP
- **`socket`** -- Gestisce le connessioni WebSocket
- **`timer15Min`** -- Eseguito ogni 15 minuti per le notifiche email
- **`timerMidnight`** -- Eseguito giornalmente per email digest e attività di manutenzione

## Librerie Condivise

L'API dipende da due pacchetti ChurchApps condivisi:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilità di base (DateHelper, ApiHelper, ecc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilità di server Express incluse autenticazione, helper di database e integrazioni AWS

:::info
L'API utilizza moduli ES (`"type": "module"` in `package.json`). Assicurati che i tuoi import utilizzino la sintassi del modulo ES.
:::

## In questa Sezione

- **[Setup Locale](./local-setup)** -- Clona, configura ed esegui l'API localmente
- **[Database](./database)** -- Architettura database-per-modulo, script di schema e pattern di accesso ai dati
- **[Struttura Modulo](./module-structure)** -- Controller, repository, modelli e autenticazione
- **[Chiavi API](./api-keys)** -- Token di accesso personale per script e connettori
- **[App Connesse (OAuth)](./connected-apps)** -- Flusso OAuth multi-tenant per app di terze parti
- **[Webhooks](./webhooks)** -- Notifiche di eventi push a sistemi esterni
- **[Server MCP](./mcp)** -- Endpoint Model Context Protocol che espone l'API agli assistenti IA
- **[Riferimento Endpoint](./endpoints/)** -- Documentazione API REST completa per tutti i moduli
