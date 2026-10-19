---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App è l'applicazione pubblica per i membri della chiesa, costruita con Next.js. Offre l'esperienza del membro, comprendente profili, elenchi dei gruppi, streaming in diretta e pagine per le donazioni.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installate **Node.js 22+** e **Git** -- vedere [Prerequisiti](../setup/prerequisites)
- Configurate il vostro target API (demo o locale) -- vedere [Variabili d'ambiente](../setup/environment-variables)

</div>

:::warning
B1App richiede Node.js 22 o successivo. Le versioni precedenti non sono supportate.
:::

## Configurazione

### 1. Clonare il repository

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Installare le dipendenze

```bash
cd B1App
npm install
```

### 3. Configurare le variabili d'ambiente

```bash
cp dotenv.sample.txt .env
```

Aprite `.env` e configurate gli URL degli endpoint `NEXT_PUBLIC_*_API`. Possono puntare alla API demo condivisa (`https://api.demo.churchapps.org`) oppure alla vostra istanza locale della API. Il file di esempio potrebbe ancora elencare URL di staging ritirati; sostituiteli.

### 4. Avviare il server di sviluppo

```bash
npm run dev
```

Il server di sviluppo Next.js si avvia su [http://localhost:3301](http://localhost:3301).

## Comandi principali

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo Next.js sulla porta 3301 |
| `npm run build` | Build di produzione tramite Next.js |
| `npm run test` | Esegue i test end-to-end con Playwright |
| `npm run lint` | Esegue il lint di Next.js |

## Variabili d'ambiente principali

| Variabile | Descrizione |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | URL degli endpoint API per ciascun modulo |

:::info
Lo script `postinstall` copia i file di locale e CSS da `@churchapps/apphelper`. Se i componenti appaiono senza stile dopo l'installazione, eseguite manualmente `npm run postinstall`.
:::

## Stack tecnologico

- **Next.js 16** con TypeScript
- **React 19** per i componenti dell'interfaccia
- **Material-UI 7** per il design system
- **React Query 5** per lo stato lato server
- **`@churchapps/apphelper*`** pacchetti per i componenti condivisi

## Distribuzione

Le build di produzione vengono distribuite su **S3 + CloudFront**:

1. `npm run build` genera la build ottimizzata di Next.js
2. L'output della build viene sincronizzato con un bucket S3
3. Viene attivata un'invalidazione di CloudFront per servire la nuova versione

:::tip
Per le istruzioni dettagliate sulla distribuzione, vedere la guida [Distribuzione delle web app](../deployment/web-apps).
:::
