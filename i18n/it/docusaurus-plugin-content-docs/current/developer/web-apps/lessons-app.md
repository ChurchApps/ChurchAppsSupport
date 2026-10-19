---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp è l'applicazione di gestione dei contenuti delle lezioni per [Lessons.church](https://lessons.church). Fornisce un'interfaccia per creare, organizzare e pubblicare i curricula delle lezioni della chiesa, sviluppata con Next.js e React.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa **Node.js 22+** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Configura il target dell'API (LessonsApi in locale) -- vedi [Variabili d'ambiente](../setup/environment-variables)

</div>

:::warning
LessonsApp richiede Node.js 22 o successivo. Le versioni precedenti non sono supportate.
:::

## Configurazione

### 1. Clona il repository

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Installa le dipendenze

```bash
cd LessonsApp
npm install
```

### 3. Configura le variabili d'ambiente

Copia il file di esempio delle variabili d'ambiente in `.env` e configura gli endpoint delle API:

```bash
cp dotenv.sample.txt .env
```

Aggiorna gli URL degli endpoint API in modo che puntino alla tua istanza locale di LessonsApi (`http://localhost:8090`). L'API di staging di Lessons è stata dismessa, quindi sostituisci gli eventuali URL `api.staging.lessons.church` rimasti nel file di esempio.

### 4. Avvia il server di sviluppo

```bash
npm run dev
```

Il server di sviluppo Next.js si avvia all'indirizzo [http://localhost:3501](http://localhost:3501).

## Comandi principali

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo Next.js sulla porta 3501 |
| `npm run build` | Build di produzione tramite Next.js |

## Stack tecnologico

- **Next.js 16** con TypeScript
- **React 19** per i componenti dell'interfaccia
- **`@churchapps/apphelper*`** pacchetti per i componenti condivisi

:::info
LessonsApp comunica con il backend **LessonsApi**, che è un'API separata dalla principale ChurchApps Api. Assicurati che il tuo ambiente sia configurato con l'endpoint corretto dell'API di Lessons.
:::

## Deploy

Le build di produzione vengono distribuite su **S3 + CloudFront**:

1. `npm run build` genera la build ottimizzata di Next.js
2. L'output della build viene sincronizzato su un bucket S3
3. Viene attivata l'invalidazione di CloudFront per servire la nuova versione

:::tip
Per le istruzioni dettagliate sul deploy, vedi la guida [Deploy delle web app](../deployment/web-apps).
:::
