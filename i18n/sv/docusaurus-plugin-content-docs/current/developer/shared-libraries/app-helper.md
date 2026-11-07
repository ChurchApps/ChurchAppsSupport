---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Paketet `@churchapps/apphelper` innehåller delade React-komponenter och verktyg för alla ChurchApps webbappar. Det är ett enda publicerat paket som exponerar funktionsmoduler via undersökvägar för ingång -- inloggning, gåvor, formulär, markdown och webbplats-/CMS-funktioner -- tillsammans med en kärnuppsättning delade komponenter och hjälpfunktioner.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera **Node.js** och **Git** -- se [Förutsättningar](../setup/prerequisites)
- Bekanta dig med [Packages-arbetsytan](./index.md) och släppflödet

</div>

## Ingångspunkter

Paketet definierar undersökvägsexporter i sin `package.json`, så varje funktionsmodul kan importeras separat:

| Ingångspunkt | Innehåll |
|-------------|----------|
| `@churchapps/apphelper` | Kärnkomponenter, hjälpfunktioner och hooks |
| `@churchapps/apphelper/login` | Användargränssnitt för inloggning och registrering |
| `@churchapps/apphelper/donations` | Komponenter för gåvor och donationer |
| `@churchapps/apphelper/forms` | Komponenter för formulärinskickning |
| `@churchapps/apphelper/markdown` | Editorer och renderare för Markdown och HTML |
| `@churchapps/apphelper/website` | Komponenter för webbplatsbyggare och CMS |

## Vem använder vad

Innan du ändrar en delad export, kontrollera vilka appar som importerar den:

| Exportområde | Vad det tillhandahåller | Används av |
|---|---|---|
| Rot -- kärnkomponenter och hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, samt återexporterade hjälpfunktioner från `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` m.fl.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Rot -- webbplatsgränssnitt | `SiteHeader` (navigering, användarmeny, aviseringar) | B1Admin, B1Transfer, LessonsApp |
| Rot -- redigerare för administratörsinnehåll | `ImageEditor`, `HelpIcon` | B1Admin |
| Rot -- realtidsinfrastruktur | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Rot -- butiker för chatt och närvaro | `ConversationStore`, `PresenceStore` | B1App |
| Rot -- anteckningar och meddelandegränssnitt | `Notes` (interna anteckningar om personer/uppgifter); `AddNote`, `SubscriptionToggle` (medlemsmeddelanden) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Rot -- specifikt för Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (delade); `MarkdownPreview`, `HtmlEditor` (redigering av administratörsinnehåll) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (delade); `FundDonations` (endast admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renderar `ConversationalForm` när formulärets `displayMode` är `conversational`) | B1Admin, B1App |
| `./website` | Kärnan för sidrendering som delas av redigeraren och renderaren (`Element` + renderarna per typ som hämtas via `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widgetar för hela webbplatsen (`AnnouncementBanner`, `Launcher` samt deras hjälpfunktioner `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` som endast används av den publika renderaren | B1Admin (redigerare), B1App (redigeringskomponenter och renderare) |

B1Transfer och LessonsApp använder endast rot- och `login`-ingångspunkterna -- undersökvägarna `donations`, `forms` och `website` används för närvarande endast av B1Admin och B1App.

## Installation för lokal utveckling

Det här paketet finns i [Packages](https://github.com/ChurchApps/Packages)-arbetsytan tillsammans med de andra delade biblioteken:

1. Klona arbetsytan:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installera beroenden i arbetsytans rotmapp:

   ```bash
   cd Packages && yarn install
   ```

3. Starta Vite-lekplatsen från paketmappen:

   ```bash
   cd apphelper && yarn dev
   ```

   Utvecklingsservern för lekplatsen startar på `http://localhost:3001`. Kopiera `playground/dotenv.sample` till `playground/.env` och fyll i de obligatoriska värdena först.

För att bygga paketet för användning (kompilerar till `dist/` och kopierar språk- och CSS-filer) kör du `yarn workspace @churchapps/apphelper build` -- eller `yarn build` i roten för att bygga alla paket i beroendeordning. För att testa ett opublicerat bygge inuti en appen som använder paketet, använd en tillfällig Yarn-portal -- se [Lokal utveckling mot en konsumerande app](./index.md#local-development-against-a-consuming-app).

:::tip
Lekplatsen är det snabbaste sättet att utveckla och testa AppHelper-komponenter. Den laddar om ändringar direkt i Vite-utvecklingsservern, så att du ser ändringarna i realtid.
:::

## Publicering

Releaser går via changesets: kör `yarn changeset` i arbetsytans rot för varje ändring, och sedan `yarn publish-all` när du är redo att släppa. Se [Översikt över delade bibliotek](./index.md#releasing-with-changesets) för hela flödet.

:::warning
Ta aldrig bort eller byt namn på en export förrän ersättningen har publicerats och alla konsumenter har migrerats -- sök igenom alla konsumerande repositorier innan du slår ihop en borttagning.
:::

## Relaterade artiklar

- **[Helpers](./helpers)** -- Basverktygspaketet som används tillsammans med AppHelper
- **[Webbappar](../web-apps/)** -- Webbapplikationerna som använder paketet
- **[Översikt över delade bibliotek](./index.md)** -- Arbetsytans installation, släppflöde och arbetsflöde för lokala länkar
