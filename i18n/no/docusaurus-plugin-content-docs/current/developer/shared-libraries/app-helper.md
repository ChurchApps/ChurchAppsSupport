---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper`-pakken gir delte React-komponenter og verktøy for alle ChurchApps nettapper. Det er en enkelt publisert pakke som eksponerer funksjonmoduler gjennom delstieåpningspunkter -- pålogging, donasjoner, skjemaer, markdown og nettsted/CMS-funksjonalitet -- sammen med et kjerneset med delte komponenter og hjelpere.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Gjør deg kjent med [Packages-arbeidsområdet](./index.md) oppsett og frigjøringsflyt

</div>

## Inngangspunkter

Pakken definerer delsti-eksporter i sin `package.json`, så hver funksjonmodul kan importeres separat:

| Inngangspunkt | Innhold |
|-------------|----------|
| `@churchapps/apphelper` | Kjernkomponenter, hjelpere og hooks |
| `@churchapps/apphelper/login` | Påloggings- og registrerings-brukergrensesnitt |
| `@churchapps/apphelper/donations` | Giver- og donasjonskomponenter |
| `@churchapps/apphelper/forms` | Skjemainnsendingskomponenter |
| `@churchapps/apphelper/markdown` | Markdown- og HTML-redigerere og renderere |
| `@churchapps/apphelper/website` | Nettstedbygger og CMS-komponenter |

## Hvem forbruker hva

Før du endrer en delt eksport, sjekk hvilke apper som importerer det:

| Eksportområde | Hva det gir | Forbrukt av |
|---|---|---|
| Root -- kjernkomponenter og hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, pluss gjeneksportert `@churchapps/helpers`-verktøy (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, osv.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- nettstedsramme | `SiteHeader` (nav, brukermeny, varsler) | B1Admin, B1Transfer, LessonsApp |
| Root -- admin-innholdsredigerere | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- sanntidsrørlegger | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- chat/fremmøte-butikker | `ConversationStore`, `PresenceStore` | B1App |
| Root -- notater og meldinger UI | `Notes` (personalnotater om personer/oppgaver); `AddNote`, `SubscriptionToggle` (medlemsmeldinger) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- Lessons-spesifikk | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (delt); `MarkdownPreview`, `HtmlEditor` (admin innholdsredigering) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (delt); `FundDonations` (kun admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (rendrer `ConversationalForm` når skjemaets `displayMode` er `conversational`) | B1Admin, B1App |
| `./website` | Siderende kjerne delt av redaktør og renderer (`Element` + per-type renderere løst via `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); områdevide widgets (`AnnouncementBanner`, `Launcher` + deres `parse*Config`-hjelpere); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` brukt kun av den offentlig-vendte rendereren | B1Admin (redigeringsapparat), B1App (redigeringskomponenter + renderer) |

B1Transfer og LessonsApp bruker bare root- og `login`-inngangspunktene -- delstiene `donations`, `forms` og `website` forbrukes utelukkende av B1Admin og B1App i dag.

## Oppsett for lokal utvikling

Denne pakken bor i [Packages](https://github.com/ChurchApps/Packages)-arbeidsområdet sammen med de andre delte bibliotekene:

1. Klon arbeidsområdet:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installer avhengigheter ved arbeidsområderoten:

   ```bash
   cd Packages && yarn install
   ```

3. Start Vite lekegrunden fra pakkekatalogen:

   ```bash
   cd apphelper && yarn dev
   ```

   Lekegrunds dev-server starter på **http://localhost:3001**. Kopier `playground/dotenv.sample` til `playground/.env` og fyll inn de nødvendige verdiene først.

For å bygge pakken for forbruk (kompiler til `dist/` og kopier locale/CSS-ressurser), kjør `yarn workspace @churchapps/apphelper build` -- eller `yarn build` ved roten for å bygge hver pakke i avhengighetsrekkefølge. For å teste en upublisert bygging inne i en forbrukerapp, bruk en midlertidig Yarn-portal -- se [Lokal utvikling mot en forbrukerapp](./index.md#local-development-against-a-consuming-app).

:::tip
Lekegrunden er den raskeste måten å utvikle og teste AppHelper-komponenter. Det hot-relaster Vite dev-server slik at du kan se endringer i sanntid.
:::

## Publisering

Frigjøringer går gjennom changesets: kjør `yarn changeset` ved arbeidsområderoten med hver endring, deretter `yarn publish-all` når du er klar til å frigjøre. Se [Oversikt over delte biblioteker](./index.md#releasing-with-changesets) for den fullstendige flyten.

:::warning
Fjern eller endre navn på eksporter aldri til erstatningen er publisert og hver forbruker er migert -- grep alle forbrukerrepoer før du slår sammen en fjerning.
:::

## Relaterte artikler

- **[Helpers](./helpers)** -- Grunnleggende utilitetspakke brukt sammen med AppHelper
- **[Nettapper](../web-apps/)** -- Nettappene som forbruker denne pakken
- **[Oversikt over delte biblioteker](./index.md)** -- Arbeidsområdeoppsett, frigjøringsflyt og lokal-link-arbeitsflyt
