---
title: "Panoramica dei progetti"
---

# Panoramica dei progetti

<div class="article-intro">

ChurchApps è composto da circa 20 repository indipendenti, tutti pubblicati sotto l'[organizzazione GitHub ChurchApps](https://github.com/ChurchApps). Questa pagina fornisce un inventario completo di tutti i progetti organizzati per categoria, con i relativi framework, porte e relazioni.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa i [prerequisiti](./prerequisites) per la categoria di progetto su cui vuoi lavorare

</div>

## API backend

Tutte le API sono costruite con Node.js, Express e TypeScript, e vengono distribuite su AWS Lambda tramite Serverless Framework.

| Progetto | Scopo | Porta dev | Database |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Monolite modulare principale che copre membership, attendance, content, giving, messaging e doing | 8084 | Database MySQL separato per modulo (6 totali) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend di Lessons.church | -- | Singolo database MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Strumento di query AI alimentato da OpenAI | -- | -- |

:::info
Il progetto **Api** principale è un monolite modulare. Ogni modulo (membership, attendance, content, giving, messaging, doing) ha il proprio database ed è accessibile tramite un sottopercorso come `/membership` o `/giving`. In produzione, questi vengono esposti come funzioni Lambda separate dietro API Gateway.
:::

## App web

| Progetto | Framework | Porta dev | Scopo |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Dashboard di amministrazione della chiesa |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | App pubblica per i membri della chiesa |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend di Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilità di importazione/esportazione dati |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Siti web brochure statici per chiese |

## App mobili

Tutte le app mobili utilizzano React Native con Expo.

| Progetto | Scopo | Versioni principali |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | App per i membri della chiesa per iOS e Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | App kiosk per il check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Display per lezioni su Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Riproduzione contenuti (incluso TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Telecomando mobile per FreeShow | Expo |

## Desktop

| Progetto | Stack | Scopo |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software per presentazioni e culto |

## Librerie condivise

Il codice condiviso viene pubblicato su npm con lo scope `@churchapps`. Queste vengono consumate come normali dipendenze npm dai progetti sopra elencati.

| Pacchetto | Nome npm | Scopo | Usato da |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Utilità base (DateHelper, ApiHelper, CurrencyHelper, ecc.) | Tutti i progetti |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Utilità server Express (auth middleware, DB helpers, integrazione AWS) | Tutte le API |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Workspace con 6 pacchetti | Libreria di componenti React | Tutte le app web |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | Provider di contenuti YouTube, Vimeo e locali | FreeShow, FreePlay, Api |

### Sotto-pacchetti AppHelper

Il progetto AppHelper è un workspace monorepo che pubblica sei pacchetti:

| Pacchetto | Nome npm |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## Relazioni tra progetti

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Tutte le app frontend dipendono da `@churchapps/helpers`. Le app web dipendono inoltre dai pacchetti `@churchapps/apphelper`. Tutte le API backend dipendono sia da `@churchapps/helpers` che da `@churchapps/apihelper`.

## Prossimi passi

- **[Variabili d'ambiente](./environment-variables)** -- Configura i file `.env` per connetterti alle API
- **[Setup locale dell'API](../api/local-setup)** -- Configura l'API backend in locale
