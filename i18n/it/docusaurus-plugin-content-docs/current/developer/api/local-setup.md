---
title: "Configurazione locale dell'API"
---

# Configurazione locale dell'API

<div class="article-intro">

Questa guida ti guida attraverso la configurazione dell'API ChurchApps per lo sviluppo locale. Clonerai il repository, configurerai le tue connessioni di database, inizializzerai lo schema e avvierai il server di sviluppo con hot reload.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa **Node.js 22+**, **Git** e **MySQL 8.0+** -- vedi [Prerequisiti](../setup/prerequisites)
- Crea un utente MySQL con privilegi di creazione del database
- Consulta il riferimento [Variabili di ambiente](../setup/environment-variables) per la configurazione dell'API

</div>

## Configurazione passo dopo passo

### 1. Clona il repository

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installa le dipendenze

Il progetto utilizza Yarn (una guardia blocca `npm install`):

```bash
cd Api
yarn install
```

### 3. Configura le variabili di ambiente

```bash
cp .env.sample .env
```

Apri `.env` e configura le tue stringhe di connessione MySQL. Ogni modulo ha bisogno della propria connessione di database nel seguente formato:

```
mysql://root:password@localhost:3306/dbname
```

Avrai bisogno di stringhe di connessione per tutti e sei i database dei moduli (membership, attendance, content, giving, messaging, doing).

### 4. Inizializza i database

```bash
npm run initdb
```

Questo crea automaticamente tutti e sei i database e le loro tabelle.

:::tip
Puoi inizializzare il database di un singolo modulo con `npm run initdb -- --module=membership` (o `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Avvia il server di sviluppo

```bash
npm run dev
```

L'API si avvia con hot reload su [http://localhost:8084](http://localhost:8084).

## Comandi principali

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo con hot reload (tsx watch) |
| `npm run build` | Pulisci, compila TypeScript e copia gli asset |
| `npm run test` | Esegui i test con Jest (include coverage) |
| `npm run test:watch` | Esegui i test in modalità watch |
| `npm run lint` | Esegui ESLint con auto-fix (ESLint è l'unico formatter) |

## Distribuzione in staging

Per distribuire nell'ambiente di staging:

```bash
npm run deploy-staging
```

Questo esegue una build di produzione e quindi distribuisce tramite Serverless Framework.

:::warning
Assicurati che le tue credenziali AWS siano configurate prima di eseguire il comando di distribuzione.
:::

## Sviluppo della libreria locale

Se hai bisogno di sviluppare una libreria condivisa (`@churchapps/helpers` o `@churchapps/apihelper`) insieme all'API, compilala nello spazio di lavoro [Packages](https://github.com/ChurchApps/Packages) e aggiungi un portale Yarn temporaneo nell'API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Questo ti consente di testare le modifiche della libreria rispetto all'API senza pubblicare su npm. Vedi [Librerie condivise](../shared-libraries/#local-development-against-a-consuming-app) per i dettagli -- e non commettere mai la risoluzione del portale che il link scrive in `package.json`.

## Articoli correlati

- **[Database](./database)** -- Comprendere l'architettura database-per-modulo
- **[Struttura dei moduli](./module-structure)** -- Come controller, repository e modelli sono organizzati
- **[Librerie condivise](../shared-libraries/)** -- Lavorare con `@churchapps/helpers` e `@churchapps/apihelper`
