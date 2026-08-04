---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Il pacchetto `@churchapps/apihelper` fornisce utilità lato server per tutte le API Express.js di ChurchApps. Include la classe controller base, l'autenticazione JWT, le utilità del database e le integrazioni AWS da cui dipende ogni progetto API.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Familiarizza con la configurazione del [workspace Packages](./index.md) e il flusso di rilascio
- Questo pacchetto dipende da [`@churchapps/helpers`](./helpers) (come dipendenza peer) e lo ri-esporta

</div>

## Cosa È Incluso

- **CustomBaseController** -- classe base per i controller API, costruita su `inversify-express-utils`
- **Auth** -- autenticazione JWT tramite `CustomAuthProvider`, `AuthenticatedUser` e `Principal`
- **Utilità database** -- `DB.query` / `DB.queryOne` e la classe `Pool` per la gestione delle connessioni MySQL, oltre a `MySqlHelper` e `DBCreator` per la configurazione dello schema
- **Integrazioni AWS** -- `AwsHelper` per l'archiviazione file S3 e le letture da SSM Parameter Store
- **Email** -- `EmailHelper` con supporto per i trasporti SES e SMTP
- **Caricamento configurazione** -- `EnvironmentBase` legge stringhe di connessione e segreti dalle variabili d'ambiente o da Parameter Store
- **Varie** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Configurazione per lo Sviluppo Locale

Questo pacchetto risiede nel workspace [Packages](https://github.com/ChurchApps/Packages) insieme alle altre librerie condivise:

1. Clona il workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installa le dipendenze alla root del workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Compila (compila TypeScript in `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Oppure esegui `yarn build` alla root per compilare ogni pacchetto nell'ordine di dipendenza.

Per testare le modifiche all'interno di un'API che lo consuma, usa un portale Yarn temporaneo -- vedi [Sviluppo Locale contro un'App Consumatrice](./index.md#local-development-against-a-consuming-app).

## Pubblicazione

I rilasci passano attraverso changesets: esegui `yarn changeset` alla root del workspace ad ogni modifica, poi `yarn publish-all` quando sei pronto per il rilascio. Vedi la [Panoramica delle Librerie Condivise](./index.md#releasing-with-changesets) per il flusso completo.

:::info
Questo pacchetto è una dipendenza di ogni API di ChurchApps -- l'Api principale, AskApi e LessonsApi. Quando apporti modifiche, testa contro un'API in locale prima di pubblicare.
:::

## Articoli Correlati

- **[Helpers](./helpers)** -- Il pacchetto di utilità base da cui dipende questo pacchetto
- **[Struttura dei Moduli](../api/module-structure)** -- Come controller e middleware di autenticazione vengono usati nei moduli API
- **[Configurazione Locale dell'API](../api/local-setup)** -- Configurazione dell'API per lo sviluppo locale
