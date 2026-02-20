---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp è l'applicazione per la gestione dei contenuti delle lezioni per [Lessons.church](https://lessons.church). Fornisce un'interfaccia per creare, organizzare e pubblicare programmi di lezioni per la chiesa, costruita con Next.js e React.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js 22+** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Configura il target API (staging o locale) -- vedi [Variabili di Ambiente](../setup/environment-variables)

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

### 3. Configura le variabili di ambiente

Copia il file di esempio dell'ambiente in `.env` e configura gli endpoint API:

```bash
cp dotenv.sample.txt .env
```

Aggiorna gli URL degli endpoint API per puntare alle API di staging o alla tua istanza API locale.

### 4. Avvia il server di sviluppo

```bash
npm run dev
```

Il server di sviluppo Next.js si avvia su [http://localhost:3501](http://localhost:3501).

## Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo Next.js sulla porta 3501 |
| `npm run build` | Build di produzione tramite Next.js |

## Stack Tecnologico

- **Next.js 16** con TypeScript
- **React 19** per i componenti UI
- Pacchetti **`@churchapps/apphelper*`** per i componenti condivisi

:::info
LessonsApp comunica con il backend **LessonsApi**, che è un'API separata dall'Api principale di ChurchApps. Assicurati che il tuo ambiente sia configurato con l'endpoint corretto dell'API Lessons.
:::

## Distribuzione

Le build di produzione vengono distribuite su **S3 + CloudFront**:

1. `npm run build` genera la build ottimizzata Next.js
2. L'output della build viene sincronizzato in un bucket S3
3. L'invalidazione di CloudFront viene attivata per servire la nuova versione

:::tip
Per istruzioni dettagliate sulla distribuzione, vedi la guida alla [Distribuzione delle Applicazioni Web](../deployment/web-apps).
:::
