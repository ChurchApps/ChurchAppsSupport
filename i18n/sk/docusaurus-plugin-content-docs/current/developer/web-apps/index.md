---
title: "Webové aplikácie"
description: "Prehľad troch webových aplikácií ChurchApps (B1 Admin, B1.church, Lessons.church), ich spoločného stacku React a MUI, balíkov apphelper a nástrojov na zostavenie."
---

# Webové aplikácie

<div class="article-intro">

ChurchApps obsahuje tri webové aplikácie, z ktorých každá slúži inému publiku a inému účelu. Všetky zdieľajú spoločný technologický základ React 19, TypeScript a Material-UI 7, no líšia sa nástrojmi na zostavenie a cieľmi nasadenia.

</div>

## Prehľad aplikácií

| Aplikácia | Účel | Framework | Port pre vývoj |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Administračný panel cirkvi | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Verejná aplikácia pre členov cirkvi | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Správa obsahu lekcií | Next.js 16 + React 19 | 3501 |

## Spoločný technologický základ

Všetky tri webové aplikácie sú postavené na:

- **TypeScript** -- Typová bezpečnosť od začiatku až do konca
- **React 19** -- Knižnica komponentov používateľského rozhrania
- **Material-UI 7** -- Dizajnový systém a sada nástrojov na komponenty
- **React Query 5** -- Správa stavu servera

## Zdieľané komponenty

Aplikácie zdieľajú komponenty používateľského rozhrania a pomocné nástroje prostredníctvom rodiny balíkov `@churchapps/apphelper*`:

| Balík | Účel |
|---------|---------|
| `@churchapps/apphelper` | Základné zdieľané React komponenty |
| `@churchapps/apphelper-login` | Komponenty používateľského rozhrania pre prihlásenie |
| `@churchapps/apphelper-donations` | Formuláre na dary a štedrosť |
| `@churchapps/apphelper-forms` | Komponenty na tvorbu formulárov |
| `@churchapps/apphelper-markdown` | Vykresľovanie Markdownu |
| `@churchapps/apphelper-website` | Komponenty webu a CMS |

:::tip
Podrobnosti o lokálnom vývoji týchto zdieľaných balíkov nájdete v dokumentácii [AppHelper](../shared-libraries/app-helper.md).
:::

## Skript postinstall

Každá webová aplikácia obsahuje skript `postinstall`, ktorý kopíruje súbory lokalizácie a CSS štýly z `@churchapps/apphelper` do projektu. Spúšťa sa automaticky po `npm install`.

:::info
Ak komponenty po inštalácii závislostí vyzerajú bez štýlov, skript `postinstall` pravdepodobne nebežal správne. Môžete ho spustiť manuálne príkazom `npm run postinstall`.
:::

## Nástroje na zostavenie

Aplikácie používajú dva rôzne nástroje na zostavenie:

- **B1Admin** používa **Vite** -- rýchly moderný bundler vhodný pre jednostránkové aplikácie
- **B1App** a **LessonsApp** používajú **Next.js** -- poskytujú renderovanie na strane servera, smerovanie založené na súboroch a optimalizované produkčné zostavenia
