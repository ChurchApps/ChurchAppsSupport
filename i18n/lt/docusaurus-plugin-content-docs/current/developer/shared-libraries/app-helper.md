---
title: "AppHelper"
description: "@churchapps/apphelper paketo nuoroda: pošakių įėjimo taškai, kurios programos naudoja kiekvieną eksportą, vietinis kūrimas ir publikavimo žingsniai."
---

# AppHelper

<div class="article-intro">

Paketas `@churchapps/apphelper` teikia bendrus React komponentus ir pagalbines funkcijas visoms ChurchApps žiniatinklio programoms. Tai vienas publikuojamas paketas, kuris funkcijas eksportuoja per posričių įėjimo taškus: prisijungimą, aukojimus, formas, „markdown“ ir svetainės / turinio valdymo (CMS) funkcijas. Kartu su jomis pateikiamas bendras pagrindinių komponentų ir pagalbinių funkcijų rinkinys.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiegite **Node.js** ir **Git** -- žr. [Reikalavimai](../setup/prerequisites.md)
- Susipažinkite su [Paketų darbo sritimi](./index.md) ir leidimo eiga

</div>

## Įėjimo taškai

`package.json` faile paketas apibrėžia posrečių eksportus, todėl kiekvieną funkcijų modulį galima importuoti atskirai:

| Įėjimo taškas | Turinys |
|-------------|----------|
| `@churchapps/apphelper` | Pagrindiniai komponentai, pagalbinės funkcijos ir „hooks“ |
| `@churchapps/apphelper/login` | Prisijungimo ir registracijos sąsaja |
| `@churchapps/apphelper/donations` | Aukojimo ir aukų komponentai |
| `@churchapps/apphelper/forms` | Formų pateikimo komponentai |
| `@churchapps/apphelper/markdown` | „Markdown“ ir HTML redaktoriai bei atvaizdavimo komponentai |
| `@churchapps/apphelper/website` | Svetainių kūrėjo ir CMS komponentai |

## Kas ką naudoja

Prieš keisdami bendrą eksportą, patikrinkite, kurios programos jį importuoja:

| Eksporto sritis | Ką teikia | Naudoja |
|---|---|---|
| Šaknis -- pagrindiniai komponentai ir „hooks“ | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, taip pat iš naujo eksportuojamos `@churchapps/helpers` pagalbinės funkcijos (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` ir kt.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Šaknis -- svetainės apvalkalas | `SiteHeader` (navigacija, naudotojo meniu, pranešimai) | B1Admin, B1Transfer, LessonsApp |
| Šaknis -- administratoriaus turinio redaktoriai | `ImageEditor`, `HelpIcon` | B1Admin |
| Šaknis -- realaus laiko infrastruktūra | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Šaknis -- pokalbių ir buvimo būsenos saugyklos | `ConversationStore`, `PresenceStore` | B1App |
| Šaknis -- pastabos ir pranešimų sąsaja | `Notes` (darbuotojų pastabos apie asmenis ir užduotis); `AddNote`, `SubscriptionToggle` (narių pranešimai) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Šaknis -- specifiniai Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (bendri); `MarkdownPreview`, `HtmlEditor` (administratoriaus turinio redagavimas) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (bendri); `FundDonations` (tik administratoriui) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (atvaizduoja `ConversationalForm`, kai formos `displayMode` yra `conversational`) | B1Admin, B1App |
| `./website` | Puslapių atvaizdavimo pagrindas, bendras redaktoriui ir atvaizdavimo komponentui (`Element` ir per `ElementRegistry` parenkami tipo atvaizdavimo komponentai, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); visai svetainei skirti valdikliai (`AnnouncementBanner`, `Launcher` ir jų `parse*Config` pagalbinės funkcijos); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` naudojami tik viešame atvaizdavimo komponente | B1Admin (redaktorius), B1App (redaktoriaus komponentai ir atvaizdavimo komponentas) |

B1Transfer ir LessonsApp naudoja tik šaknies ir `login` įėjimo taškus. Posrečius `donations`, `forms` ir `website` šiuo metu naudoja tik B1Admin ir B1App.

## Sąranka vietiniam kūrimui

Šis paketas yra [Packages](https://github.com/ChurchApps/Packages) darbo srityje kartu su kitomis bendromis bibliotekomis:

1. Klonuokite darbo sritį:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Įdiekite priklausomybes darbo srities šakniniame kataloge:

   ```bash
   cd Packages && yarn install
   ```

3. Paleiskite Vite žaidimų aplinką iš paketo katalogo:

   ```bash
   cd apphelper && yarn dev
   ```

   Žaidimų aplinkos kūrimo serveris pasileidžia adresu `http://localhost:3001`. Pirmiausia nukopijuokite `playground/dotenv.sample` į `playground/.env` ir užpildykite reikalingas reikšmes.

Norėdami sukompiliuoti paketą naudojimui (rezultatas įrašomas į `dist/`, taip pat nukopijuojami lokalizacijos ir CSS failai), paleiskite `yarn workspace @churchapps/apphelper build` -- arba `yarn build` šakniniame kataloge, kad būtų sukompiliuoti visi paketai priklausomybių tvarka. Norėdami išbandyti nepublikuotą versiją vartojančioje programoje, naudokite laikiną Yarn portalą -- žr. [Vietinis kūrimas su vartojančia programa](./index.md#local-development-against-a-consuming-app).

:::tip
Žaidimų aplinka yra greičiausias būdas kurti ir testuoti AppHelper komponentus. Ji automatiškai perkrauna Vite kūrimo serverį, todėl pakeitimus matote iš karto.
:::

## Publikavimas

Leidimai vyksta per „changesets“: su kiekvienu pakeitimu paleiskite `yarn changeset` darbo srities šakniniame kataloge, o kai būsite pasiruošę leisti, paleiskite `yarn publish-all`. Visą eigą žr. [Bendrųjų bibliotekų apžvalgoje](./index.md#releasing-with-changesets).

:::warning
Niekada nepašalinkite ir nepervadinkite eksporto, kol pakaitalas nepublikuotas ir visi vartotojai nepersikėlė. Prieš sujungdami pašalinimą, ieškokite visose vartojančiose saugyklose.
:::

## Susiję straipsniai

- **[Pagalbinės funkcijos](./helpers.md)** -- Bazinis pagalbinių funkcijų paketas, naudojamas kartu su AppHelper
- **[Žiniatinklio programos](../web-apps/index.md)** -- Žiniatinklio programos, kurios naudoja šį paketą
- **[Bendrųjų bibliotekų apžvalga](./index.md)** -- Darbo srities sąranka, leidimo eiga ir vietinio susiejimo darbo eiga
