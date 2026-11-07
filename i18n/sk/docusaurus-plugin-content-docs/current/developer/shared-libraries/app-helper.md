---
title: "AppHelper"
description: "Referencia k balíku @churchapps/apphelper vo workspace Packages: vstupné body podcestí, aplikácie, ktoré ich používajú, a lokálny vývoj a publikovanie."
---

# AppHelper

<div class="article-intro">

Balík `@churchapps/apphelper` poskytuje zdieľané React komponenty a pomocné nástroje pre všetky webové aplikácie ChurchApps. Ide o jediný publikovaný balík, ktorý sprístupňuje funkčné moduly cez podcesty vstupných bodov -- prihlásenie, dary, formuláre, markdown a funkcie webových stránok/CMS -- spolu so súborom základných zdieľaných komponentov a pomocných funkcií.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte **Node.js** a **Git** -- pozri [Požiadavky](../setup/prerequisites.md)
- Oboznámte sa s nastavením [pracovného priestoru Packages](./index.md) a postupom vydávania

</div>

## Vstupné body

Balík definuje podcestné exporty vo svojom `package.json`, takže každý funkčný modul je možné importovať samostatne:

| Vstupný bod | Obsah |
|-------------|----------|
| `@churchapps/apphelper` | Základné komponenty, pomocné funkcie a hooky |
| `@churchapps/apphelper/login` | Používateľské rozhranie prihlásenia a registrácie |
| `@churchapps/apphelper/donations` | Komponenty pre dary a štedrosť |
| `@churchapps/apphelper/forms` | Komponenty na odosielanie formulárov |
| `@churchapps/apphelper/markdown` | Editory a zobrazovače pre Markdown a HTML |
| `@churchapps/apphelper/website` | Komponenty tvorby webových stránok a CMS |

## Kto čo používa

Pred zmenou zdieľaného exportu skontrolujte, ktoré aplikácie ho importujú:

| Oblasť exportu | Čo poskytuje | Používa |
|---|---|---|
| Koreň -- základné komponenty a hooky | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, a ďalej znovu exportované pomocné funkcie `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` atď.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Koreň -- časť webu | `SiteHeader` (navigácia, používateľská ponuka, upozornenia) | B1Admin, B1Transfer, LessonsApp |
| Koreň -- editory obsahu pre správcov | `ImageEditor`, `HelpIcon` | B1Admin |
| Koreň -- infraštruktúra v reálnom čase | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Koreň -- úložiská chatu/prítomnosti | `ConversationStore`, `PresenceStore` | B1App |
| Koreň -- poznámky a rozhranie správ | `Notes` (interné poznámky k osobám/úlohám); `AddNote`, `SubscriptionToggle` (správy pre členov) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Koreň -- špecifické pre Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (zdieľané); `MarkdownPreview`, `HtmlEditor` (úprava obsahu v administrácii) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (zdieľané); `FundDonations` (iba administrácia) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (vykresľuje `ConversationalForm`, keď má formulár `displayMode` nastavený na `conversational`) | B1Admin, B1App |
| `./website` | Jadro vykresľovania stránok zdieľané editorom a vykresľovačom (`Element` + vykresľovače jednotlivých typov riešené cez `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); celostránkové widgety (`AnnouncementBanner`, `Launcher` a ich pomocné funkcie `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` používané iba verejne prístupným vykresľovačom | B1Admin (editor), B1App (komponenty editora + vykresľovač) |

B1Transfer a LessonsApp používajú iba koreňový a `login` vstupný bod -- podcesty `donations`, `forms` a `website` dnes používajú výhradne B1Admin a B1App.

## Nastavenie pre lokálny vývoj

Tento balík sa nachádza v pracovnom priestore [Packages](https://github.com/ChurchApps/Packages) spolu s ostatnými zdieľanými knižnicami:

1. Naklonujte pracovný priestor:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Nainštalujte závislosti v koreni pracovného priestoru:

   ```bash
   cd Packages && yarn install
   ```

3. Spustite Vite playground z adresára balíka:

   ```bash
   cd apphelper && yarn dev
   ```

   Vývojový server playground sa spustí na adrese `http://localhost:3001`. Najprv skopírujte `playground/dotenv.sample` do `playground/.env` a vyplňte požadované hodnoty.

Na zostavenie balíka pre použitie (skompiluje do `dist/` a skopíruje lokalizačné a CSS súbory) spustite `yarn workspace @churchapps/apphelper build` -- alebo `yarn build` v koreni, ktorý zostaví všetky balíky v poradí závislostí. Na otestovanie nepublikovanej zostavy v konzumujúcej aplikácii použite dočasný Yarn portal -- pozri [Lokálny vývoj voči konzumujúcej aplikácii](./index.md#local-development-against-a-consuming-app).

:::tip
Playground je najrýchlejší spôsob, ako vyvíjať a testovať komponenty AppHelper. Vite dev server sa automaticky znovu načítava, takže zmeny uvidíte v reálnom čase.
:::

## Vydávanie

Vydania prebiehajú cez changesets: pri každej zmene spustite `yarn changeset` v koreni pracovného priestoru a keď budete pripravení na vydanie, spustite `yarn publish-all`. Úplný postup nájdete v [Prehľade zdieľaných knižníc](./index.md#releasing-with-changesets).

:::warning
Nikdy neodstraňujte ani nepremenúvajte export, kým nebude publikovaná náhrada a každý konzument nebude migrovaný -- pred zlúčením odstránenia prehľadajte všetky konzumujúce repozitáre.
:::

## Súvisiace články

- **[Helpers](./helpers.md)** -- Základný balík pomocných funkcií používaný spolu s AppHelper
- **[Webové aplikácie](../web-apps/index.md)** -- Webové aplikácie, ktoré tento balík používajú
- **[Prehľad zdieľaných knižníc](./index.md)** -- Nastavenie pracovného priestoru, postup vydávania a workflow lokálneho prepojenia
