---
title: "Documentazione per sviluppatori"
---

# Documentazione per sviluppatori

<div class="article-intro">

ChurchApps è una raccolta di circa 20 progetti open-source che insieme forniscono una piattaforma completa per la gestione delle chiese. I progetti comprendono API backend, applicazioni web, app mobili, un'applicazione desktop e librerie condivise -- tutti scritti in TypeScript. Questa sezione fornisce tutto il necessario per configurare un ambiente di sviluppo locale e iniziare a contribuire.

</div>

## Architettura in breve

I progetti sono **repository indipendenti** (non un monorepo). Il codice condiviso viene pubblicato su npm con lo scope `@churchapps/*` e consumato come normali dipendenze. Ciò significa che puoi lavorare su un singolo progetto senza clonare l'intero ecosistema.

Caratteristiche principali:

- **Linguaggio:** TypeScript in tutto il progetto
- **Backend:** API Node.js / Express distribuite su AWS Lambda tramite Serverless Framework
- **Web:** React 19 (Vite e Next.js), Material-UI 7
- **Mobile:** React Native con Expo
- **Database:** MySQL 8.0, un database per modulo API

## Cosa copre questa sezione

- **[Setup](setup/)** -- Ambiente di sviluppo locale, prerequisiti e configurazione
  - [Prerequisiti](setup/prerequisites) -- Strumenti e software necessari
  - [Panoramica dei progetti](setup/project-overview) -- Tutti i progetti a colpo d'occhio
  - [Variabili d'ambiente](setup/environment-variables) -- Configurazione dei file `.env`
- **[API](api/)** -- Setup locale dell'API principale, inizializzazione del database e struttura dei moduli
- **[App Web](web-apps/)** -- Esecuzione locale di B1Admin, B1App e LessonsApp
- **[App Mobili](mobile/)** -- Build di B1Mobile e altre app Expo
- **[Librerie condivise](shared-libraries/)** -- Lavorare con Helpers, ApiHelper e AppHelper
- **[Deployment](deployment/)** -- Distribuzione di API, app web e app mobili

## Comunità e risorse

| Risorsa | Link |
|----------|------|
| Organizzazione GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Issue Tracker | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Comunità Slack | [Unisciti a Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Il modo più veloce per iniziare a contribuire è scegliere un'app web (come B1Admin), puntarla alle **API di staging** e iniziare a fare modifiche al frontend. Non è necessario alcun setup di database o API.
:::
