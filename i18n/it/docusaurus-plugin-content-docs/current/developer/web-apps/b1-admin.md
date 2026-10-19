---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin è la dashboard di amministrazione della chiesa — un'applicazione React a pagina singola costruita con Vite e Material-UI. Il personale della chiesa la usa per gestire persone, gruppi, presenze, donazioni, contenuti e altro.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa **Node.js 22+** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Configura il target delle API (demo o locale) -- vedi [Variabili d'ambiente](../setup/environment-variables)

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

### 3. Configura le variabili d'ambiente

```bash
cp dotenv.sample.txt .env
```

Apri `.env` e configura gli endpoint delle API. Puoi puntarli all'API demo condivisa (`https://api.demo.churchapps.org`) oppure alla tua istanza locale dell'API. Il file di esempio potrebbe ancora elencare URL di staging ritirati; sostituiscili.

### 4. Avvia il server di sviluppo

```bash
npm start
```

Questo avvia il server di sviluppo Vite. L'app sarà disponibile nel browser con l'hot module replacement attivo.

## Variabili d'ambiente principali

| Variabile | Descrizione |
|----------|-------------|
| `REACT_APP_STAGE` | Nome dell'ambiente (ad esempio `demo` come nel file di esempio, `prod` o `selfhost`) |
| `PORT` | Porta del server di sviluppo (predefinita: `3101`) |
| `REACT_APP_*_API` | URL degli endpoint delle API per ciascun modulo |

:::info
Lo script `postinstall` copia i file di localizzazione e CSS da `@churchapps/apphelper`. Se i componenti appaiono senza stile, esegui manualmente `npm run postinstall`.
:::

## Comandi principali

| Comando | Descrizione |
|---------|-------------|
| `npm start` | Avvia il server di sviluppo Vite |
| `npm run build` | Build di produzione tramite Vite |
| `npm run test` | Esegue i test end-to-end con Playwright |
| `npm run lint` | Esegue ESLint con correzione automatica |

## Stack tecnologico

- **React 19** con TypeScript
- **Vite** per la build e il server di sviluppo
- **Material-UI 7** per i componenti dell'interfaccia
- **React Query 5** per lo stato lato server
- **`@churchapps/apphelper*`** pacchetti per i componenti condivisi

## Distribuzione

Le build di produzione vengono distribuite su **S3 + CloudFront**:

1. `npm run build` genera gli asset statici
2. Gli asset vengono sincronizzati con un bucket S3
3. Viene attivata l'invalidazione di CloudFront per servire la nuova versione

:::tip
Per le istruzioni dettagliate sulla distribuzione, consulta la guida [Distribuzione delle web app](../deployment/web-apps).
:::
