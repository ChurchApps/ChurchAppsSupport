---
title: "Panoramica del Progetto"
---

# Panoramica del Progetto

<div class="article-intro">

ChurchApps è composto da circa 20 repository indipendenti, ciascuno pubblicato sotto l'[organizzazione GitHub ChurchApps](https://github.com/ChurchApps). Questa pagina fornisce un inventario completo di tutti i progetti organizzati per categoria, insieme ai relativi framework, porte e relazioni.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa i [prerequisiti](./prerequisites) per la categoria di progetto su cui vuoi lavorare

</div>

## API Backend

Tutte le API sono costruite con Node.js, Express e TypeScript, e vengono distribuite su AWS Lambda tramite Serverless Framework.

| Progetto | Scopo | Porta dev | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Monolite modulare principale che copre membership, attendance, content, giving, messaging e doing | 8084 | Database MySQL separato per modulo (6 totali) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend di Lessons.church | -- | Database MySQL singolo `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Strumento di query AI alimentato da OpenAI | -- | -- |

:::info
Il progetto principale **Api** è un monolite modulare. Ogni modulo (membership, attendance, content, giving, messaging, doing) ha il proprio database ed è accessibile a un sottopercorso come `/membership` o `/giving`. In produzione, questi vengono esposti come funzioni Lambda separate dietro API Gateway.
:::

## Applicazioni Web

| Progetto | Framework | Porta dev | Scopo |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Dashboard di amministrazione della chiesa |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | App rivolta ai membri della chiesa |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend di Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilità di importazione/esportazione dati |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statico | -- | Siti web brochure statici per chiese |

## Applicazioni Mobile

Tutte le applicazioni mobile utilizzano React Native con Expo.

| Progetto | Scopo | Versioni chiave |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | App per i membri della chiesa per iOS e Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | App kiosk per il check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Display delle lezioni per Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Riproduzione di contenuti (incluso TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Telecomando mobile per FreeShow | Expo |

## Desktop

| Progetto | Stack | Scopo |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software per presentazioni e culto |

## Librerie Condivise

Il codice condiviso viene pubblicato su npm sotto lo scope `@churchapps` e consumato come dipendenze npm regolari dai progetti sopra elencati. Tutti i pacchetti condivisi risiedono in un unico repository -- [Packages](https://github.com/ChurchApps/Packages) -- gestito come workspace Yarn e rilasciato con changesets.

| Pacchetto | Scopo | Usato da |
|---------|---------|---------|
| `@churchapps/helpers` | Utilità di base e interfacce TypeScript condivise (DateHelper, ApiHelper, CurrencyHelper, ecc.) | Tutti i progetti |
| `@churchapps/apihelper` | Utilità del server Express (autenticazione, controller base, accesso al database, integrazioni AWS) | Tutte le API |
| `@churchapps/apphelper` | Libreria di componenti React con moduli subpath per login, donazioni, moduli, markdown e costruzione di siti web | Tutte le applicazioni web |
| `@churchapps/content-providers` | Astrazione dei provider di contenuti di terze parti (Lessons.church, Planning Center, Dropbox e altri) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit di integrazione B1.church: webhook, client REST, OAuth | Sviluppatori di integrazioni esterne |
| `@churchapps/texting` | Astrazione del provider SMS | Api |

Vedi [Librerie Condivise](../shared-libraries/) per la configurazione del workspace e il flusso di rilascio.

## Relazioni tra i Progetti

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Tutte le applicazioni frontend dipendono da `@churchapps/helpers`. Le applicazioni web dipendono inoltre dai pacchetti `@churchapps/apphelper`. Tutte le API backend dipendono sia da `@churchapps/helpers` sia da `@churchapps/apihelper`.

## Prossimi Passi

- **[Variabili d'Ambiente](./environment-variables)** -- Configura i tuoi file `.env` per connetterti alle API
- **[Configurazione Locale dell'API](../api/local-setup)** -- Configura l'API backend in locale
