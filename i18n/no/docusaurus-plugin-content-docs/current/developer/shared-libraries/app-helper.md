---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Pakken `@churchapps/apphelper` gir delte React-komponenter og verktøy for alle ChurchApps-nettapplikasjoner. Det er én enkelt publisert pakke som eksponerer funksjonsmoduler gjennom delsti-inngangspunkter -- innlogging, donasjoner, skjemaer, markdown og nettsted-/CMS-funksjonalitet -- sammen med et kjernesett med delte komponenter og hjelpere.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Gjør deg kjent med oppsettet og utgivelsesflyten til [Packages-arbeidsområdet](./index.md)

</div>

## Inngangspunkter

Pakken definerer delsti-eksporter i sin `package.json`, slik at hver funksjonsmodul kan importeres for seg selv:

| Inngangspunkt | Innhold |
|-------------|----------|
| `@churchapps/apphelper` | Kjernekomponenter, hjelpere og hooks |
| `@churchapps/apphelper/login` | Innloggings- og registreringsgrensesnitt |
| `@churchapps/apphelper/donations` | Giving- og donasjonskomponenter |
| `@churchapps/apphelper/forms` | Komponenter for skjemainnsending |
| `@churchapps/apphelper/markdown` | Markdown- og HTML-redigeringsverktøy og -visere |
| `@churchapps/apphelper/website` | Komponenter for nettstedsbygger og CMS |

## Hvem bruker hva

Før du endrer en delt eksport, sjekk hvilke apper som importerer den:

| Eksportområde | Hva den gir | Brukes av |
|---|---|---|
| Root -- kjernekomponenter og hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, pluss re-eksporterte `@churchapps/helpers`-verktøy (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, osv.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- nettstedsramme | `SiteHeader` (navigasjon, brukermeny, varsler) | B1Admin, B1Transfer, LessonsApp |
| Root -- admin-innholdsredigerere | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- sanntidsrørlegging | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- chat-/tilstedeværelseslagre | `ConversationStore`, `PresenceStore` | B1App |
| Root -- notat- og meldingsgrensesnitt | `Notes` (stab-notater om personer/oppgaver); `AddNote`, `SubscriptionToggle` (medlemsmeldinger) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- Lessons-spesifikt | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (delt); `MarkdownPreview`, `HtmlEditor` (admin-innholdsredigering) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (delt); `FundDonations` (kun admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (rendrer `ConversationalForm` når skjemaets `displayMode` er `conversational`) | B1Admin, B1App |
| `./website` | Siderenderingskjerne delt mellom redigeringsverktøyet og visningsmotoren (`Element` + de type-spesifikke rendererne løst via `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); nettstedsdekkende widgeter (`AnnouncementBanner`, `Launcher` + deres `parse*Config`-hjelpere); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` brukt bare av den offentlig vendte visningsmotoren | B1Admin (redigeringsverktøy), B1App (redigeringskomponenter + visningsmotor) |

B1Transfer og LessonsApp bruker bare root- og `login`-inngangspunktene -- delstiene `donations`, `forms` og `website` konsumeres i dag utelukkende av B1Admin og B1App.

## Oppsett for lokal utvikling

Denne pakken bor i [Packages](https://github.com/ChurchApps/Packages)-arbeidsområdet sammen med de andre delte bibliotekene:

1. Klon arbeidsområdet:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installer avhengigheter ved roten av arbeidsområdet:

   ```bash
   cd Packages && yarn install
   ```

3. Start Vite-lekeplassen fra pakkekatalogen:

   ```bash
   cd apphelper && yarn dev
   ```

   Lekeplassens utviklingsserver starter på **http://localhost:3001**. Kopier `playground/dotenv.sample` til `playground/.env` og fyll inn de nødvendige verdiene først.

For å bygge pakken for konsum (kompilerer til `dist/` og kopierer locale-/CSS-ressurser), kjør `yarn workspace @churchapps/apphelper build` -- eller `yarn build` ved roten for å bygge hver pakke i avhengighetsrekkefølge. For å teste en upublisert bygg inne i en konsumerende app, bruk en midlertidig Yarn-portal -- se [Lokal utvikling mot en konsumerende app](./index.md#local-development-against-a-consuming-app).

:::tip
Lekeplassen er den raskeste måten å utvikle og teste AppHelper-komponenter på. Den hot-relaster Vite-utviklingsserveren slik at du kan se endringer i sanntid.
:::

## Publisering

Utgivelser går gjennom changesets: kjør `yarn changeset` ved roten av arbeidsområdet for hver endring, og deretter `yarn publish-all` når du er klar til å publisere. Se [Oversikt over delte biblioteker](./index.md#releasing-with-changesets) for hele flyten.

:::warning
Fjern eller gi nytt navn til en eksport bare etter at erstatningen er publisert og hver konsument er migrert -- grep alle konsumerende repositorier før du slår sammen en fjerning.
:::

## Relaterte artikler

- **[Helpers](./helpers)** -- Den grunnleggende verktøypakken som brukes sammen med AppHelper
- **[Nettapper](../web-apps/)** -- Nettapplikasjonene som konsumerer denne pakken
- **[Oversikt over delte biblioteker](./index.md)** -- Arbeidsområdeoppsett, utgivelsesflyt og lokal-lenke-arbeidsflyt
