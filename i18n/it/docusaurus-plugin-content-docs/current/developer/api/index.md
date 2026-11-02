---
title: "API"
---

# API

<div class="article-intro">

L'API di ChurchApps è un **monolite modulare** -- un'unica base di codice che serve sei moduli dati, ciascuno con il proprio database. Questa architettura offre i vantaggi organizzativi dei microservizi (confini chiari, archivi dati indipendenti) con la semplicità operativa di un unico deployment.

</div>

## Moduli

| Modulo | Scopo |
|--------|---------|
| **Membership** | Persone, gruppi, nuclei familiari, permessi |
| **Attendance** | Culti, sessioni, record di check-in |
| **Content** | Pagine, sezioni, elementi, streaming |
| **Giving** | Donazioni, fondi, elaborazione dei pagamenti |
| **Messaging** | Conversazioni, notifiche, email |
| **Doing** | Attività, piani, assegnazioni |

## Stack tecnologico

- **Runtime:** Node.js 24.x con TypeScript (moduli ES)
- **Framework:** Express
- **Dependency Injection:** Inversify (routing basato su decoratori)
- **Database:** MySQL -- un database per modulo, ciascuno con il proprio pool di connessioni
- **Autenticazione:** autenticazione basata su JWT tramite `CustomAuthProvider`
- **Deployment:** AWS Lambda tramite Serverless Framework v3

## Porte

| Protocollo | Porta | Descrizione |
|----------|------|-------------|
| HTTP | `8084` | API REST principale |
| WebSocket | `8087` | Connessioni socket in tempo reale |

## Funzioni Lambda

Quando viene distribuita su AWS, l'API viene eseguita come sei funzioni Lambda:

- **`web`** -- Gestisce tutte le richieste HTTP
- **`socket`** -- Gestisce le connessioni WebSocket
- **`timer15Min`** -- Viene eseguita ogni 30 minuti per le notifiche email (il nome è storico)
- **`timerMidnight`** -- Viene eseguita ogni giorno per le email di riepilogo e le attività di manutenzione
- **`timerScheduledTasks`** -- Viene eseguita ogni giorno per le automazioni in scadenza e l'elaborazione dei flussi di lavoro in ritardo
- **`timerWebhooks`** -- Viene eseguita ogni minuto per inviare i webhook in uscita in coda

## Librerie condivise

L'API dipende da due pacchetti condivisi di ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilità di base (DateHelper, ApiHelper, ecc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilità per il server Express, inclusi autenticazione, helper per il database e integrazioni AWS

:::info
L'API usa i moduli ES (`"type": "module"` in `package.json`). Assicurati che i tuoi import usino la sintassi dei moduli ES.
:::

## In questa sezione

- **[Setup locale](./local-setup)** -- Clona, configura ed esegui l'API in locale
- **[Database](./database)** -- Architettura con un database per modulo, script dello schema e schemi di accesso ai dati
- **[Struttura del modulo](./module-structure)** -- Controller, repository, modelli e autenticazione
- **[Chiavi API](./api-keys)** -- Token di accesso personali per script e connettori
- **[App collegate (OAuth)](./connected-apps)** -- Flusso OAuth multi-tenant per app di terze parti
- **[Webhook](./webhooks)** -- Invio di notifiche di eventi a sistemi esterni
- **[Server MCP](./mcp)** -- Endpoint Model Context Protocol che espone l'API agli assistenti IA
- **[Riferimento degli endpoint](./endpoints/)** -- Documentazione REST completa dell'API per tutti i moduli
