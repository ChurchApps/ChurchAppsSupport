---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App è l'applicazione pubblica per i membri della chiesa costruita con Next.js. Fornisce l'esperienza utente per i membri, inclusi profili, directory dei gruppi, streaming dal vivo e pagine per le donazioni.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js 22+** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Configura il target API (staging o locale) -- vedi [Variabili di Ambiente](../setup/environment-variables)

</div>

:::warning
B1App richiede Node.js 22 o successivo. Le versioni precedenti non sono supportate.
:::

## Configurazione

### 1. Clona il repository

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Installa le dipendenze

```bash
cd B1App
npm install
```

### 3. Configura le variabili di ambiente

```bash
cp dotenv.sample.txt .env
```

Apri `.env` e configura gli URL degli endpoint `NEXT_PUBLIC_*_API`. Questi possono puntare alle API di staging o alla tua istanza API locale.

### 4. Avvia il server di sviluppo

```bash
npm run dev
```

Il server di sviluppo Next.js si avvia su [http://localhost:3301](http://localhost:3301).

## Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo Next.js sulla porta 3301 |
| `npm run build` | Build di produzione tramite Next.js |
| `npm run test` | Esegui test end-to-end con Playwright |
| `npm run lint` | Esegui lint di Next.js |

## Variabili di Ambiente Principali

| Variabile | Descrizione |
|-----------|-------------|
| `NEXT_PUBLIC_*_API` | URL degli endpoint API per ogni modulo |

:::info
Lo script `postinstall` copia i file di localizzazione e CSS da `@churchapps/apphelper`. Se i componenti appaiono senza stili dopo l'installazione, esegui `npm run postinstall` manualmente.
:::

## Stack Tecnologico

- **Next.js 16** con TypeScript
- **React 19** per i componenti UI
- **Material-UI 7** per il design system
- **React Query 5** per la gestione dello stato del server
- Pacchetti **`@churchapps/apphelper*`** per i componenti condivisi

## Distribuzione

Le build di produzione vengono distribuite su **S3 + CloudFront**:

1. `npm run build` genera la build ottimizzata Next.js
2. L'output della build viene sincronizzato in un bucket S3
3. L'invalidazione di CloudFront viene attivata per servire la nuova versione

:::tip
Per istruzioni dettagliate sulla distribuzione, vedi la guida alla [Distribuzione delle Applicazioni Web](../deployment/web-apps).
:::
