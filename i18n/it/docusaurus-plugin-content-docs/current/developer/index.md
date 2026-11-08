---
title: "Documentazione per sviluppatori"
description: "Orientati nella documentazione per sviluppatori di ChurchApps: configurazione locale, guide per API e applicazioni web, librerie condivise, build mobile e deployment per i progetti open source."
---

# Documentazione per sviluppatori

<div class="article-intro">

ChurchApps è una raccolta di circa 20 progetti open source che insieme forniscono una piattaforma completa per la gestione delle chiese. I progetti comprendono API backend, applicazioni web, app mobili, un'applicazione desktop e librerie condivise, tutti scritti in TypeScript. Questa sezione fornisce tutto ciò che serve per configurare un ambiente di sviluppo locale e iniziare a contribuire.

</div>

## Panoramica dell'architettura

I progetti sono **repository indipendenti** (non un monorepo). Il codice condiviso viene pubblicato su npm sotto lo scope `@churchapps/*` e utilizzato come normali dipendenze. Ciò significa che puoi lavorare su un singolo progetto senza clonare l'intero ecosistema.

Caratteristiche principali:

- **Linguaggio:** TypeScript in tutto il progetto
- **Backend:** API Node.js / Express distribuite su AWS Lambda tramite Serverless Framework
- **Web:** React 19 (Vite e Next.js), Material-UI 7
- **Mobile:** React Native con Expo
- **Database:** MySQL 8.0, un database per ogni modulo API

## Contenuti di questa sezione

- **[Configurazione](./setup/index.md)** -- Ambiente di sviluppo locale, prerequisiti e configurazione
  - [Prerequisiti](./setup/prerequisites.md) -- Strumenti e software necessari
  - [Panoramica del progetto](./setup/project-overview.md) -- Tutti i progetti in sintesi
  - [Variabili d'ambiente](./setup/environment-variables.md) -- Configurazione dei file `.env`
- **[API](./api/index.md)** -- Configurazione locale dell'API principale, inizializzazione del database e struttura dei moduli
- **[Applicazioni web](./web-apps/index.md)** -- Esecuzione in locale di B1Admin, B1App e LessonsApp
- **[App mobili](./mobile/index.md)** -- Build di B1Checkin e di altre app Expo
- **[Librerie condivise](./shared-libraries/index.md)** -- Utilizzo di Helpers, ApiHelper e AppHelper
- **[Deployment](./deployment/index.md)** -- Deployment di API, applicazioni web e app mobili
- **[Provider di contenuti FreePlay](./freeplay-content-provider.md)** -- Integrazione della tua libreria di lezioni con FreePlay

## Community e risorse

| Risorsa | Link |
|----------|------|
| Organizzazione GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Gestione delle segnalazioni | [Issue di ChurchAppsSupport](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Community su Slack | [Iscriviti a Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Il modo più rapido per iniziare a contribuire è scegliere un'applicazione web (come B1Admin), collegarla alle **API demo** condivise e iniziare a fare modifiche al frontend. Non serve alcuna configurazione di database o API.
:::
