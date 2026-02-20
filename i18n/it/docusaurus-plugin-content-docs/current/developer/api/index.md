---
title: "API"
---

# API

<div class="article-intro">

L'API di ChurchApps è un **monolite modulare** -- un'unica codebase che serve sei moduli distinti, ciascuno con il proprio database. Questa architettura offre i vantaggi organizzativi dei microservizi (confini chiari, archivi dati indipendenti) con la semplicità operativa di un singolo deployment.

</div>

## Moduli

| Modulo | Scopo |
|--------|-------|
| **Membership** | Persone, gruppi, nuclei familiari, permessi |
| **Attendance** | Servizi, sessioni, registrazioni presenze |
| **Content** | Pagine, sezioni, elementi, streaming |
| **Giving** | Donazioni, fondi, elaborazione pagamenti |
| **Messaging** | Conversazioni, notifiche, email |
| **Doing** | Attività, piani, assegnazioni |

## Stack Tecnologico

- **Runtime:** Node.js 22.x con TypeScript (moduli ES)
- **Framework:** Express
- **Dependency Injection:** Inversify (routing basato su decoratori)
- **Database:** MySQL -- un database per modulo, ciascuno con il proprio pool di connessioni
- **Autenticazione:** Basata su JWT tramite `CustomAuthProvider`
- **Deployment:** AWS Lambda tramite Serverless Framework v3

## Porte

| Protocollo | Porta | Descrizione |
|------------|-------|-------------|
| HTTP | `8084` | API REST principale |
| WebSocket | `8087` | Connessioni socket in tempo reale |

## Funzioni Lambda

Quando distribuito su AWS, l'API viene eseguito come quattro funzioni Lambda:

- **`web`** -- Gestisce tutte le richieste HTTP
- **`socket`** -- Gestisce le connessioni WebSocket
- **`timer15Min`** -- Eseguito ogni 15 minuti per le notifiche email
- **`timerMidnight`** -- Eseguito giornalmente per email digest e attività di manutenzione

## Librerie Condivise

L'API dipende da due pacchetti condivisi di ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilità di base (DateHelper, ApiHelper, ecc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilità server Express inclusi autenticazione, helper per database e integrazioni AWS

:::info
L'API utilizza moduli ES (`"type": "module"` in `package.json`). Assicurati che le tue importazioni utilizzino la sintassi dei moduli ES.
:::

## In Questa Sezione

- **[Setup Locale](./local-setup)** -- Clona, configura ed esegui l'API localmente
- **[Database](./database)** -- Architettura database-per-modulo, script dello schema e pattern di accesso ai dati
- **[Struttura dei Moduli](./module-structure)** -- Controller, repository, modelli e autenticazione
- **[Riferimento Endpoint](./endpoints/)** -- Documentazione completa dell'API REST per tutti i moduli
