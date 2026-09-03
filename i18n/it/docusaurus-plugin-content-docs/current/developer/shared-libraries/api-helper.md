---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Il pacchetto `@churchapps/apihelper` fornisce utilità lato server per tutti gli API Express.js di ChurchApps. Include la classe di controller base, l'autenticazione JWT, le utilità del database e le integrazioni AWS che ogni progetto API dipende.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js** e **Git** — vedi [Prerequisiti](../setup/prerequisites)
- Familiarizzati con la configurazione del [workspace Packages](./index.md) e il flusso di rilascio
- Questo pacchetto dipende da [`@churchapps/helpers`](./helpers) (come dipendenza peer) e lo re-esporta

</div>

## Cosa Incluso

- **CustomBaseController** — classe base per i controller API, costruita su `inversify-express-utils`
- **Auth** — autenticazione JWT tramite `CustomAuthProvider`, `AuthenticatedUser` e `Principal`
- **Utilità del database** — `DB.query` / `DB.queryOne` e la classe `Pool` per la gestione della connessione MySQL, più `MySqlHelper` e `DBCreator` per la configurazione dello schema
- **Integrazioni AWS** — `AwsHelper` per l'archiviazione di file S3 e letture SSM Parameter Store
- **Email** — `EmailHelper` che supporta i trasporti SES e SMTP
- **Caricamento della configurazione** — `EnvironmentBase` legge le stringhe di connessione e i segreti dalle variabili di ambiente o Parameter Store
- **Misc** — `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Setup per Sviluppo Locale

Questo pacchetto vive nel workspace [Packages](https://github.com/ChurchApps/Packages) accanto alle altre librerie condivise:

1. Clona il workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installa le dipendenze alla radice del workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Crea (compila TypeScript a `dist/`):

   ```bash
   yarn build
   ```
