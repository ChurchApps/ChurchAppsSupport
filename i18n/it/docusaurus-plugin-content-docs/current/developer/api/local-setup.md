---
title: "Configurazione locale dell'API"
---

# Configurazione locale dell'API

<div class="article-intro">

Questa guida ti accompagna nella configurazione dell'API di ChurchApps per lo sviluppo locale. Clonerai il repository, configurerai le connessioni al database, inizializzerai lo schema e avvierai il server di sviluppo con hot reload.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa **Node.js 24+**, **Git** e **MySQL 8.0+** -- vedi [Prerequisiti](../setup/prerequisites)
- Crea un utente MySQL con privilegi di creazione dei database
- Consulta il riferimento delle [Variabili d'ambiente](../setup/environment-variables) per la configurazione dell'API

</div>

## Configurazione passo dopo passo

### 1. Clona il repository

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installa le dipendenze

Il progetto usa Yarn (una protezione blocca `npm install`):

```bash
cd Api
yarn install
```

### 3. Configura le variabili d'ambiente

```bash
cp .env.sample .env
```

Apri `.env` e configura le stringhe di connessione a MySQL. Ogni modulo ha bisogno della propria connessione al database nel seguente formato:

```
mysql://root:password@localhost:3306/dbname
```

Ti serviranno le stringhe di connessione per tutti e sei i database dei moduli (membership, attendance, content, giving, messaging, doing).

### 4. Inizializza i database

```bash
npm run initdb
```

Questo comando crea automaticamente tutti e sei i database e le relative tabelle.

:::tip
Puoi inizializzare il database di un singolo modulo con `npm run initdb -- --module=membership` (oppure `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Avvia il server di sviluppo

```bash
npm run dev
```

L'API si avvia con hot reload all'indirizzo [http://localhost:8084](http://localhost:8084).

## Comandi principali

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo con hot reload (tsx watch) |
| `npm run build` | Pulisce, compila TypeScript e copia gli asset |
| `npm run test` | Esegue i test con Jest (include la copertura) |
| `npm run test:watch` | Esegue i test in modalità watch |
| `npm run lint` | Esegue ESLint con correzione automatica (ESLint è l'unico formattatore) |

## Distribuzione

L'ambiente di staging è stato dismesso. L'API viene distribuita nell'ambiente demo a ogni push su `main` e in produzione tramite il workflow manuale **Deploy Prod**, che applica anche le migrazioni del database in sospeso. Vedi [Distribuzione dell'API](../deployment/apis) per i dettagli.

## Sviluppo di librerie locali

Se devi sviluppare una libreria condivisa (`@churchapps/helpers` o `@churchapps/apihelper`) insieme all'API, compilala nel workspace [Packages](https://github.com/ChurchApps/Packages) e aggiungi un portale Yarn temporaneo nell'API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Questo ti permette di testare le modifiche alle librerie con l'API senza pubblicarle su npm. Vedi [Librerie condivise](../shared-libraries/#local-development-against-a-consuming-app) per i dettagli -- e non committare mai la risoluzione del portale che il link scrive in `package.json`.

## Articoli correlati

- **[Database](./database)** -- Comprendere l'architettura con un database per modulo
- **[Struttura del modulo](./module-structure)** -- Come sono organizzati controller, repository e modelli
- **[Librerie condivise](../shared-libraries/)** -- Lavorare con `@churchapps/helpers` e `@churchapps/apihelper`
