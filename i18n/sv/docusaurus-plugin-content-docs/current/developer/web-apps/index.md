---
title: "Webbappar"
description: "Översikt över de tre ChurchApps-webbapparna (B1 Admin, B1.church, Lessons.church), deras gemensamma React- och MUI-stack, apphelper-paket och byggverktyg."
---

# Webbappar

<div class="article-intro">

ChurchApps innehåller tre webbapplikationer. Var och en riktar sig till en annan målgrupp och har ett eget syfte. De delar en gemensam teknisk grund med React 19, TypeScript och Material-UI 7, men skiljer sig åt när det gäller byggverktyg och driftsättningsmål.

</div>

## Applikationer i korthet

| App | Syfte | Ramverk | Utvecklingsport |
|-----|-------|---------|-----------------|
| [**B1Admin**](./b1-admin.md) | Instrumentpanel för kyrkoadministration | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Offentlig app för kyrkomedlemmar | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Hantering av lektionsinnehåll | Next.js 16 + React 19 | 3501 |

## Gemensam teknikstack

Alla tre webbapparna är byggda med:

- **TypeScript** -- Typsäkerhet från början till slut
- **React 19** -- UI-komponentbibliotek
- **Material-UI 7** -- Designsystem och komponentverktyg
- **React Query 5** -- Hantering av serverstatus

## Delade komponenter

Apparna delar UI-komponenter och verktyg via paketfamiljen `@churchapps/apphelper*`:

| Paket | Syfte |
|-------|-------|
| `@churchapps/apphelper` | Centrala delade React-komponenter |
| `@churchapps/apphelper-login` | UI-komponenter för autentisering |
| `@churchapps/apphelper-donations` | Formulär för donationer och gåvor |
| `@churchapps/apphelper-forms` | Komponenter för formulärbyggare |
| `@churchapps/apphelper-markdown` | Rendering av markdown |
| `@churchapps/apphelper-website` | Komponenter för webbplats/CMS |

:::tip
Information om hur du utvecklar dessa delade paket lokalt finns i dokumentationen för [AppHelper](../shared-libraries/app-helper.md).
:::

## Postinstall-skript

Varje webbapp har ett `postinstall`-skript som kopierar språkfiler och CSS-resurser från `@churchapps/apphelper` till projektet. Skriptet körs automatiskt efter `npm install`.

:::info
Om komponenterna saknar formatering efter installation av beroenden kanske `postinstall`-skriptet inte kördes korrekt. Du kan starta det manuellt med `npm run postinstall`.
:::

## Byggverktyg

Apparna använder två olika byggverktyg:

- **B1Admin** använder **Vite** -- en snabb, modern bundler som är idealisk för ensidesapplikationer
- **B1App** och **LessonsApp** använder **Next.js** -- som ger serverside-rendering, filbaserad routing och optimerade produktionsbyggen
