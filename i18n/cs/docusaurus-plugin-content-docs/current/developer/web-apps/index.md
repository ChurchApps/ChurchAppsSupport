---
title: "Webové aplikace"
description: "Přehled tří webových aplikací ChurchApps (B1 Admin, B1.church, Lessons.church), sdíleného stacku React a MUI, balíčků apphelper a build nástrojů."
---

# Webové aplikace

<div class="article-intro">

ChurchApps zahrnuje tři webové aplikace, každá pro jiné publikum a účel. Sdílejí společný technologický základ tvořený React 19, TypeScriptem a Material-UI 7, ale liší se nástroji pro sestavení a cílovým prostředím nasazení.

</div>

## Přehled aplikací

| Aplikace | Účel | Framework | Port pro vývoj |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Administrační panel církve | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Veřejná aplikace pro členy církve | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Správa obsahu lekcí | Next.js 16 + React 19 | 3501 |

## Sdílený technologický základ

Všechny tři webové aplikace jsou postaveny na:

- **TypeScript** -- typová bezpečnost od začátku do konce
- **React 19** -- knihovna UI komponent
- **Material-UI 7** -- designový systém a sada komponent
- **React Query 5** -- správa stavu serveru

## Sdílené komponenty

Aplikace sdílejí UI komponenty a pomocné nástroje prostřednictvím rodiny balíčků `@churchapps/apphelper*`:

| Balíček | Účel |
|---------|---------|
| `@churchapps/apphelper` | Základní sdílené React komponenty |
| `@churchapps/apphelper-login` | UI komponenty pro přihlášení |
| `@churchapps/apphelper-donations` | Formuláře pro dary a příspěvky |
| `@churchapps/apphelper-forms` | Komponenty pro tvorbu formulářů |
| `@churchapps/apphelper-markdown` | Vykreslování Markdownu |
| `@churchapps/apphelper-website` | Komponenty webu/CMS |

:::tip
Podrobnosti o místním vývoji těchto sdílených balíčků najdete v dokumentaci [AppHelper](../shared-libraries/app-helper.md).
:::

## Skript postinstall

Každá webová aplikace má skript `postinstall`, který zkopíruje jazykové soubory a CSS soubory z `@churchapps/apphelper` do projektu. Spouští se automaticky po `npm install`.

:::info
Pokud komponenty po instalaci závislostí vypadají bez stylů, skript `postinstall` se pravděpodobně nespustil správně. Můžete ho spustit ručně příkazem `npm run postinstall`.
:::

## Nástroje pro sestavení

Aplikace používají dva různé nástroje pro sestavení:

- **B1Admin** používá **Vite** -- rychlý, moderní bundler ideální pro jednostránkové aplikace
- **B1App** a **LessonsApp** používají **Next.js** -- poskytují vykreslování na straně serveru, směrování podle souborů a optimalizované produkční sestavení
