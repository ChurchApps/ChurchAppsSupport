---
title: "Configurazione Locale dell'API"
---

# Configurazione Locale dell'API

<div class="article-intro">

Questa guida ti accompagna nella configurazione dell'API di ChurchApps per lo sviluppo locale. Clonerai il repository, configurerai le connessioni al database, inizializzerai lo schema e avvierai il server di sviluppo con hot reload.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js 22+**, **Git** e **MySQL 8.0+** -- vedi [Prerequisiti](../setup/prerequisites)
- Crea un utente MySQL con privilegi di creazione database
- Consulta il riferimento delle [Variabili d'Ambiente](../setup/environment-variables) per la configurazione dell'API

</div>

## Configurazione Passo per Passo

### 1. Clona il repository

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installa le dipendenze

Il progetto utilizza Yarn (una protezione blocca `npm install`):

```bash
cd Api
yarn install
```

### 3. Configura le variabili d'ambiente

```bash
cp .env.sample .env
```

Apri `.env` e configura le stringhe di connessione MySQL. Ogni modulo necessita della propria connessione al database nel seguente formato:

```
mysql://root:password@localhost:3306/dbname
```

Avrai bisogno di stringhe di connessione per tutti e sei i database dei moduli (membership, attendance, content, giving, messaging, doing).

### 4. Inizializza i database

```bash
npm run initdb
```

Questo crea automaticamente tutti e sei i database e le rispettive tabelle.

:::tip
Puoi inizializzare il database di un singolo modulo con `npm run initdb -- --module=membership` (oppure `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Avvia il server di sviluppo

```bash
npm run dev
```

L'API si avvia con hot reload su [http://localhost:8084](http://localhost:8084).

## Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo con hot reload (tsx watch) |
| `npm run build` | Pulisce, compila TypeScript e copia gli asset |
| `npm run test` | Esegue i test con Jest (include la coverage) |
| `npm run test:watch` | Esegue i test in modalità watch |
| `npm run lint` | Esegue ESLint con auto-fix (ESLint è l'unico formattatore) |

## Deployment su Staging

Per distribuire nell'ambiente di staging:

```bash
npm run deploy-staging
```

Questo esegue una build di produzione e poi distribuisce tramite Serverless Framework.

:::warning
Assicurati che le tue credenziali AWS siano configurate prima di eseguire il comando di deploy.
:::

## Sviluppo Locale delle Librerie

Se devi sviluppare una libreria condivisa (`@churchapps/helpers` o `@churchapps/apihelper`) insieme all'API, compilala nel workspace [Packages](https://github.com/ChurchApps/Packages) e aggiungi un portale Yarn temporaneo nell'API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Questo ti permette di testare le modifiche alla libreria contro l'API senza pubblicarle su npm. Vedi [Librerie Condivise](../shared-libraries/#local-development-against-a-consuming-app) per i dettagli -- e non fare mai il commit della risoluzione del portale che il link scrive in `package.json`.

## Articoli Correlati

- **[Database](./database)** -- Comprendere l'architettura database-per-modulo
- **[Struttura dei Moduli](./module-structure)** -- Come sono organizzati controller, repository e modelli
- **[Librerie Condivise](../shared-libraries/)** -- Lavorare con `@churchapps/helpers` e `@churchapps/apihelper`
