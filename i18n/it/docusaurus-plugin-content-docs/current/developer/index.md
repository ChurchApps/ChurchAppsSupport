---
title: "Documentazione per sviluppatori"
---

# Documentazione per sviluppatori

<div class="article-intro">

ChurchApps è una raccolta di circa 20 progetti open source che insieme forniscono una piattaforma completa per la gestione delle chiese. I progetti spaziano da API lato server, applicazioni web, app mobili, un'applicazione desktop e librerie condivise, tutti scritti in TypeScript. Questa sezione contiene tutto ciò che serve per configurare un ambiente di sviluppo locale e iniziare a contribuire.

</div>

## Panoramica dell'architettura

I progetti sono **repository indipendenti** (non un monorepo). Il codice condiviso viene pubblicato su npm sotto lo scope `@churchapps/*` e usato come normale dipendenza. Questo significa che puoi lavorare su un singolo progetto senza clonare l'intero ecosistema.

Caratteristiche principali:

- **Linguaggio:** TypeScript in tutti i progetti
- **Backend:** API Node.js / Express distribuite su AWS Lambda tramite Serverless Framework
- **Web:** React 19 (Vite e Next.js), Material-UI 7
- **Mobile:** React Native con Expo
- **Database:** MySQL 8.0, un database per ogni modulo API

## Cosa copre questa sezione

- **[Configurazione](setup/)**: ambiente di sviluppo locale, prerequisiti e configurazione
  - [Prerequisiti](setup/prerequisites): strumenti e software richiesti
  - [Panoramica dei progetti](setup/project-overview): tutti i progetti in sintesi
  - [Variabili d'ambiente](setup/environment-variables): configurazione dei file `.env`
- **[API](api/)**: configurazione locale dell'API principale, inizializzazione del database e struttura dei moduli
- **[App web](web-apps/)**: avvio locale di B1Admin, B1App e LessonsApp
- **[App mobili](mobile/)**: creazione di B1Mobile e delle altre app Expo
- **[Librerie condivise](shared-libraries/)**: lavorare con Helpers, ApiHelper e AppHelper
- **[Distribuzione](deployment/)**: distribuzione di API, app web e app mobili
- **[Provider di contenuti FreePlay](freeplay-content-provider)**: integra la tua libreria di lezioni con FreePlay

## Comunità e risorse

| Risorsa | Link |
|---------|------|
| Organizzazione GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Segnalazione problemi | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Community Slack | [Unisciti a Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Il modo più veloce per iniziare a contribuire è scegliere un'app web (come B1Admin), puntarla alle **API demo** condivise e iniziare a fare modifiche al frontend. Non serve alcuna configurazione di database o API.
:::
