---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Il pacchetto `@churchapps/apihelper` fornisce utilità lato server per tutte le API Express.js di ChurchApps. Include la classe base del controller, il middleware di autenticazione JWT, le utilità per il database e le integrazioni AWS da cui dipende ogni progetto API.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Familiarizza con il [flusso di lavoro npm link](./index.md) per lo sviluppo locale
- Questo pacchetto dipende da [`@churchapps/helpers`](./helpers)

</div>

## Cosa Include

- **CustomBaseController** -- classe base per i controller API
- **Middleware Auth** -- autenticazione JWT tramite `CustomAuthProvider`
- **Utilità database** -- `DB.query`, `EnhancedPoolHelper` per la gestione delle connessioni MySQL
- **Integrazioni AWS** -- helper per S3, SSM Parameter Store e altri servizi AWS
- **Configurazione DI Inversify** -- configurazione del container di dependency injection

## Configurazione per lo Sviluppo Locale

1. Clona il repository:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Installa le dipendenze:

   ```bash
   cd ApiHelper && npm install
   ```

3. Compila il pacchetto (compila TypeScript in `dist/`):

   ```bash
   npm run build
   ```

4. Rendilo disponibile per il linking locale:

   ```bash
   npm link
   ```

## Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm run build` | Compila TypeScript in `dist/` |
| `npm run lint` | Esegui ESLint |
| `npm run lint:fix` | Esegui ESLint con correzione automatica |
| `npm run format` | Formatta il codice con Prettier |

:::info
Questo pacchetto è una dipendenza di ogni API di ChurchApps. Quando apporti modifiche, usa `npm link` per testare con un'API in locale prima di pubblicare.
:::

## Articoli Correlati

- **[Helpers](./helpers)** -- Il pacchetto di utilità base da cui dipende questo pacchetto
- **[Struttura dei Moduli](../api/module-structure)** -- Come i controller e il middleware di autenticazione vengono utilizzati nei moduli API
- **[Configurazione API Locale](../api/local-setup)** -- Configurazione dell'API per lo sviluppo locale
