---
title: "Hjälpfunktioner"
description: "Guide till @churchapps/helpers: funktioner, vilka appar som använder paketet, lokal byggning i Packages-arbetsytan och publicering via changesets."
---

# Hjälpfunktioner

<div class="article-intro">

Paketet `@churchapps/helpers` innehåller grundläggande verktyg som används av alla ChurchApps-projekt, både frontend och backend. Det är oberoende av ramverk och innehåller vanliga hjälpfunktioner såsom `DateHelper`, `ApiHelper` och `CurrencyHelper`, samt de delade TypeScript-gränssnitten som utgör datakontraktet mellan apparna och API:erna.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera **Node.js** och **Git** -- se [Förutsättningar](../setup/prerequisites.md)
- Sätt dig in i [Packages-arbetsytan](./index.md) och release-flödet

</div>

## Vem som använder detta

Varje ChurchApps-API (kärn-API:et, AskApi och LessonsApi) och varje webbfrontend (B1Admin, B1App, B1Transfer, LessonsApp) är direkt beroende av det här paketet. Frontend-delarna får också många av dess exporter (`ApiHelper`, `DateHelper`, `UserHelper` och andra gränssnitt) återexporterade via [`@churchapps/apphelper`](./app-helper.md). De andra delade paketen deklarerar det som ett peer-beroende så att varje app använder exakt en kopia.

## Konfiguration för lokal utveckling

Det här paketet finns i [Packages](https://github.com/ChurchApps/Packages)-arbetsytan tillsammans med de andra delade biblioteken:

1. Klona arbetsytan:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installera beroenden i arbetsytans rot:

   ```bash
   cd Packages && yarn install
   ```

3. Bygg (kompilerar TypeScript till `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Eller kör `yarn build` i roten för att bygga alla paket i beroendeordning.

För att testa ändringar i ett projekt som använder paketet, använd en tillfällig Yarn-portal -- se [Lokal utveckling mot en konsumerande app](./index.md#local-development-against-a-consuming-app).

## Publicering

Releaser går via changesets i stället för manuella versionshöjningar:

1. Kör `yarn changeset` i arbetsytans rot, välj `@churchapps/helpers` med lämplig typ av versionshöjning, och committa den genererade changeset-filen tillsammans med din ändring.
2. När du är redo att släppa en release kör du `yarn publish-all` i roten -- det höjer versionerna, skriver CHANGELOG-filerna, bygger i beroendeordning och publicerar till npm.

Nya delade gränssnitt läggs i `helpers/src/interfaces/` och återexporteras via paketets barrel-fil. Webbplatsbyggarens katalog över elementtyper (`ElementTypes.ts` — 35 typer med sina schemas för svar) finns också här; den är kontraktet som delas av apphelper-renderarna, redigeringsformulären i B1Admin och AI-genereringens prompter (se [Webbplatsbyggarens arkitektur](../architecture/website-builder.md)).

:::warning
Eftersom det här paketet används av alla ChurchApps-projekt har ändringar här stor påverkan. En release av `helpers` höjer automatiskt `apihelper` och `apphelper` så att deras versionsintervall för beroenden hålls aktuella. Testa med en Yarn-portal i minst ett konsumerande API och en konsumerande webbapp innan du publicerar.
:::

## Relaterade artiklar

- **[ApiHelper](./api-helper.md)** -- Serverside-verktyg som är beroende av det här paketet
- **[AppHelper](./app-helper.md)** -- React-komponenter som är beroende av det här paketet
- **[Översikt över delade bibliotek](./index.md)** -- Arbetsytans konfiguration, release-flöde och arbetsflöde för lokala länkar
