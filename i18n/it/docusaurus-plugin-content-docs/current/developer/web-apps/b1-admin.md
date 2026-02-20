---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin è il pannello di amministrazione della chiesa -- un'applicazione React a pagina singola costruita con Vite e Material-UI. Il personale della chiesa lo utilizza per gestire persone, gruppi, presenze, donazioni, contenuti e molto altro.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js 22+** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Configura il target API (staging o locale) -- vedi [Variabili di Ambiente](../setup/environment-variables)

</div>

## Configurazione

### 1. Clona il repository

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Installa le dipendenze

```bash
cd B1Admin
npm install
```

### 3. Configura le variabili di ambiente

```bash
cp dotenv.sample.txt .env
```

Apri `.env` e configura gli endpoint API. Puoi puntarli alle API di staging o alla tua istanza API locale.

### 4. Avvia il server di sviluppo

```bash
npm start
```

Questo avvia il server di sviluppo Vite. L'app sarà disponibile nel tuo browser con il ricaricamento a caldo dei moduli abilitato.

## Variabili di Ambiente Principali

| Variabile | Descrizione |
|-----------|-------------|
| `REACT_APP_STAGE` | Nome dell'ambiente (es. `local`, `staging`, `prod`) |
| `PORT` | Porta del server di sviluppo (predefinita: `3101`) |
| `REACT_APP_*_API` | URL degli endpoint API per ogni modulo |

:::info
Lo script `postinstall` copia i file di localizzazione e CSS da `@churchapps/apphelper`. Se i componenti appaiono senza stili, esegui `npm run postinstall` manualmente.
:::

## Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm start` | Avvia il server di sviluppo Vite |
| `npm run build` | Build di produzione tramite Vite |
| `npm run test` | Esegui test end-to-end con Playwright |
| `npm run lint` | Esegui ESLint con correzione automatica |

## Stack Tecnologico

- **React 19** con TypeScript
- **Vite** per gli strumenti di build e il server di sviluppo
- **Material-UI 7** per i componenti UI
- **React Query 5** per la gestione dello stato del server
- Pacchetti **`@churchapps/apphelper*`** per i componenti condivisi

## Distribuzione

Le build di produzione vengono distribuite su **S3 + CloudFront**:

1. `npm run build` genera gli asset statici
2. Gli asset vengono sincronizzati in un bucket S3
3. L'invalidazione di CloudFront viene attivata per servire la nuova versione

:::tip
Per istruzioni dettagliate sulla distribuzione, vedi la guida alla [Distribuzione delle Applicazioni Web](../deployment/web-apps).
:::
