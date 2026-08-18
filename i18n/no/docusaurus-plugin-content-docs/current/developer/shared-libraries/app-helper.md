---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Pakken `@churchapps/apphelper` gir delte React-komponenter og hjelpere for alle ChurchApps-nettapplikasjoner. Det er en enkelt publisert pakke som eksponerer funksjonsmoduler gjennom understibasisslutpunkter -- innlogging, gaver, skjemaer, markering og nettsted/CMS-funksjonalitet -- sammen med et kjerneset av delte komponenter og hjelpere.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Bli kjent med [Packages-arbeidsrommet](./index.md) og utgivelsesflyt

</div>

## Slutpunkter

Pakken definerer understi-eksporter i dens `package.json`, så hver funksjonsmodul kan importeres på sin egen:

| Slutpunkt | Innhold |
|-------------|----------|
| `@churchapps/apphelper` | Kjernkomponenter, hjelpere og kriker |
| `@churchapps/apphelper/login` | Innlogging og registrering UI |
| `@churchapps/apphelper/donations` | Giver- og gavekomponenter |
| `@churchapps/apphelper/forms` | Skjemaet innleggkomponenter |
| `@churchapps/apphelper/markdown` | Markering og HTML-redigerere og renderers |
| `@churchapps/apphelper/website` | Nettsted-bygger og CMS-komponenter |

## Hvem bruker hva

Før endring av en delt eksport, sjekk hvilke apper som importerer den:

| Eksportområde | Hva det gir | Brukt av |
|---|---|---|
| Root -- kjernkomponenter og kriker | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, pluss re-eksportert `@churchapps/helpers`-hjelpere (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, osv.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- nettstedskrom | `SiteHeader` (nav, bruker-meny, varsler) | B1Admin, B1Transfer, LessonsApp |
| Root -- admin-innholdsredigerere | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- sanntidsrørlegging | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- chat/tilstedeværelsesbutikker | `ConversationStore`, `PresenceStore` | B1App |
| Root -- noter og meldinger UI | `Notes` (personalnaktet på mennesker/oppgaver); `AddNote`, `SubscriptionToggle` (medlemsmeldinger) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- Lessons-spesifikk | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (delt); `MarkdownPreview`, `HtmlEditor` (admin-innholdsredigering) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (delt); `FundDonations` (bare admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (gjengir `ConversationalForm` når skjemaets `displayMode` er `conversational`) | B1Admin, B1App |
| `./website` | Sidegjengivelseskjerne delt av redigeringen og renderingen (`Element` + de per-type rendererne løst via `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); nettstedsbrede miniprogrammer (`AnnouncementBanner`, `Launcher` + deres `parse*Config`-hjelpere); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` brukt bare av den offentlige renderingen | B1Admin (redigering), B1App (redigeringkomponenter + renderer) |

B1Transfer og LessonsApp bruker bare rot- og `login`-slutpunkter -- `donations`-, `forms`- og `website`-understiene brukes utelukkende av B1Admin og B1App i dag.

## Oppsett for lokal utvikling

Denne pakken lever i [Packages](https://github.com/ChurchApps/Packages)-arbeidsrommet sammen med de andre delte bibliotekene:

1. Kloner arbeidsrommet:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installer avhengigheter ved arbeidsromroten:

   ```bash
   cd Packages && yarn install
   ```

3. Start Vite-lekeplassen fra pakkemappen:

   ```bash
   cd apphelper && yarn dev
   ```

   Lekeplassens dev-server starter på `http://localhost:3001`. Kopier `playground/dotenv.sample` til `playground/.env` og fyll inn de nødvendige verdiene først.

For å bygge pakken for forbruk (kompilerer til `dist/` og kopier setningssted/CSS-eiendeler), kjør `yarn workspace @churchapps/apphelper build` -- eller `yarn build` ved rot for å bygge hver pakke i avhengighetsrekkefølge. For å teste en upublisert bygging i en forbrukende app, bruk en midlertidig Yarn-portal -- se [Lokal utvikling mot en forbrukende app](./index.md#local-development-against-a-consuming-app).

:::tip
Lekeplassen er den raskeste måten å utvikle og teste AppHelper-komponenter på. Det varmer-laster Vite dev-serveren så du kan se endringer i sanntid.
:::

## Publisering

Utgaver går gjennom setninger: kjør `yarn changeset` ved arbeidsromroten med hver endring, deretter `yarn publish-all` når du er klar til å slippe. Se [Oversikt over delte biblioteker](./index.md#releasing-with-changesets) for hele flytene.

:::warning
Aldri fjern eller gi nytt navn til en eksport til erstatningen blir publisert og hver forbruker blir migrer -- grep alle forbrukende depoter før sammenslåing av en fjerning.
:::

## Relaterte artikler

- **[Hjelpere](./helpers)** -- Grunninnstillingspakken brukt sammen med AppHelper
- **[Nettapper](../web-apps/)** -- Nettapplikasjonene som bruker denne pakken
- **[Oversikt over delte biblioteker](./index.md)** -- Arbeidsromsoppsett, utgivelsesflyt og lokal-linkflyt
