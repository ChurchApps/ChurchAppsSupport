---
title: "Panoramica del progetto"
description: "Mappa di tutti i repository ChurchApps per categoria, con framework, porte di sviluppo, database e il modo in cui i pacchetti condivisi @churchapps li collegano, nella documentazione di configurazione per sviluppatori."
---

# Panoramica del progetto

<div class="article-intro">

ChurchApps è composto da circa 20 repository indipendenti, ciascuno pubblicato sull'[organizzazione GitHub ChurchApps](https://github.com/ChurchApps). Questa pagina offre un inventario completo di tutti i progetti, organizzati per categoria, insieme ai loro framework, porte e relazioni.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa i [prerequisiti](./prerequisites.md) per la categoria di progetto su cui vuoi lavorare

</div>

## API backend

Tutte le API sono costruite con Node.js, Express e TypeScript, e vengono distribuite su AWS Lambda tramite Serverless Framework.

| Progetto | Scopo | Porta di sviluppo | Database |
|---------|-------|-------------------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Monolite modulare principale che copre membership, presenze, contenuti, donazioni, messaggistica e attività | 8084 | Database MySQL separato per modulo (6 in totale) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend di Lessons.church | -- | Singolo database MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Strumento di interrogazione basato sull'IA, alimentato da OpenAI | -- | -- |

:::info
Il progetto principale **Api** è un monolite modulare. Ogni modulo (membership, presenze, contenuti, donazioni, messaggistica, attività) ha il proprio database ed è accessibile a un sottopercorso come `/membership` o `/giving`. In produzione, questi sono esposti come funzioni Lambda separate dietro API Gateway.
:::

## Applicazioni web

| Progetto | Framework | Porta di sviluppo | Scopo |
|---------|-----------|-------------------|-------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Dashboard di amministrazione della chiesa |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | App pubblica per i membri della chiesa |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend di Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utility di importazione/esportazione dei dati |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statico | -- | Siti web brochure statici per chiese |

## App mobili

Tutte le app mobili usano React Native con Expo.

| Progetto | Scopo | Versioni principali |
|---------|-------|---------------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | App chiosco per il check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Visualizzazione delle lezioni su Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Riproduzione di contenuti (incluso il sistema operativo per TV) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Telecomando mobile per FreeShow | Expo |

## Desktop

| Progetto | Stack | Scopo |
|---------|-------|-------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software per presentazioni e culto |

## Librerie condivise

Il codice condiviso è pubblicato su npm sotto l'ambito `@churchapps` e utilizzato come normale dipendenza npm dai progetti sopra elencati. Tutti i pacchetti condivisi risiedono in un unico repository -- [Packages](https://github.com/ChurchApps/Packages) -- gestito come workspace Yarn e rilasciato con changesets.

| Pacchetto | Scopo | Utilizzato da |
|---------|-------|---------------|
| `@churchapps/helpers` | Utility di base e interfacce TypeScript condivise (DateHelper, ApiHelper, CurrencyHelper, ecc.) | Tutti i progetti |
| `@churchapps/apihelper` | Utility per il server Express (autenticazione, controller di base, accesso al database, integrazioni AWS) | Tutte le API |
| `@churchapps/apphelper` | Libreria di componenti React con moduli a sottopercorso per login, donazioni, moduli, markdown e creazione di siti web | Tutte le app web |
| `@churchapps/content-providers` | Astrazione per i fornitori di contenuti di terze parti (Lessons.church, Planning Center, Dropbox e altri) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit di strumenti per l'integrazione con B1.church: webhook, client REST, OAuth | Sviluppatori di integrazioni esterne |
| `@churchapps/texting` | Astrazione per i fornitori di SMS | Api |

Consulta [Librerie condivise](../shared-libraries/index.md) per la configurazione del workspace e il flusso di rilascio.

## Relazioni tra i progetti

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Tutte le app frontend dipendono da `@churchapps/helpers`. Le app web dipendono inoltre dai pacchetti `@churchapps/apphelper`. Tutte le API backend dipendono sia da `@churchapps/helpers` sia da `@churchapps/apihelper`.

## Passaggi successivi

- **[Variabili d'ambiente](./environment-variables.md)** -- Configura i tuoi file `.env` per collegarti alle API
- **[Configurazione locale dell'API](../api/local-setup.md)** -- Configura l'API backend in locale
