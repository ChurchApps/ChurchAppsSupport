---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Ang `@churchapps/apphelper` package ay nagbibigay ng shared React components at utilities para sa lahat ng ChurchApps web applications. Ito ay isang single published package na nag-expose ng feature modules sa pamamagitan ng subpath entry points -- login, donations, forms, markdown, at website/CMS functionality -- kasama ang isang core set ng shared components at helpers.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **Node.js** at **Git** -- tingnan ang [Prerequisites](../setup/prerequisites)
- Pamilyarin mo ang sarili mo sa [Packages workspace](./index.md) setup at release flow

</div>

## Entry Points

Ang package ay tumutukoy ng subpath exports sa `package.json`, kaya bawat feature module ay importable sa sarili nito:

| Entry point | Contents |
|-------------|----------|
| `@churchapps/apphelper` | Core components, helpers, at hooks |
| `@churchapps/apphelper/login` | Login at registration UI |
| `@churchapps/apphelper/donations` | Giving at donation components |
| `@churchapps/apphelper/forms` | Form submission components |
| `@churchapps/apphelper/markdown` | Markdown at HTML editors at renderers |
| `@churchapps/apphelper/website` | Website builder at CMS components |

## Sino ang Gumagamit ng Ano

Bago baguhin ang isang shared export, suriin kung aling apps ang nag-import nito:

| Export area | What it provides | Consumed by |
|---|---|---|
| Root -- core components & hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, kasama ang re-exported `@churchapps/helpers` utilities (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, atbp.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- site chrome | `SiteHeader` (nav, user menu, notifications) | B1Admin, B1Transfer, LessonsApp |
| Root -- admin content editors | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- realtime plumbing | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- chat/presence stores | `ConversationStore`, `PresenceStore` | B1App |
| Root -- notes & messaging UI | `Notes` (staff notes sa people/tasks); `AddNote`, `SubscriptionToggle` (member messaging) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- Lessons-specific | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (shared); `MarkdownPreview`, `HtmlEditor` (admin content editing) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (shared); `FundDonations` (admin only) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renders `ConversationalForm` kapag ang `displayMode` ng form ay `conversational`) | B1Admin, B1App |
| `./website` | Page-rendering core na shared ng editor at renderer (`Element` + ang per-type renderers na nire-resolve sa pamamagitan ng `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); site-wide widgets (`AnnouncementBanner`, `Launcher` + ang kanilang `parse*Config` helpers); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` na ginagamit lamang ng public-facing renderer | B1Admin (editor), B1App (editor components + renderer) |

Ang B1Transfer at LessonsApp ay gumagamit lamang ng root at `login` entry points -- ang `donations`, `forms`, at `website` subpaths ay consumed eksklusibo ng B1Admin at B1App ngayon.

## Setup para sa Local Development

Ang package na ito ay nakatira sa [Packages](https://github.com/ChurchApps/Packages) workspace kasama ang iba pang shared libraries:

1. I-clone ang workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. I-install ang dependencies sa workspace root:

   ```bash
   cd Packages && yarn install
   ```

3. Ilunsad ang Vite playground mula sa package directory:

   ```bash
   cd apphelper && yarn dev
   ```

   Ang playground dev server ay nagsisimula sa **http://localhost:3001**. I-copy ang `playground/dotenv.sample` sa `playground/.env` at punan ang kinakailangang values muna.

Upang i-build ang package para sa consumption (nag-compile sa `dist/` at nag-copy ng locale/CSS assets), patakbuhin ang `yarn workspace @churchapps/apphelper build` -- o `yarn build` sa root upang i-build ang bawat package sa dependency order. Upang subukan ang isang unpublished build sa loob ng isang consuming app, gamitin ang isang temporary Yarn portal -- tingnan ang [Local Development Against a Consuming App](./index.md#local-development-against-a-consuming-app).

:::tip
Ang playground ay ang pinakamabilis na paraan upang bumuo at subukan ang AppHelper components. Ito ay hot-reloads ang Vite dev server kaya makikita mo ang changes sa real time.
:::

## Publishing

Ang mga releases ay napupunta sa pamamagitan ng changesets: patakbuhin ang `yarn changeset` sa workspace root sa bawat change, pagkatapos ay `yarn publish-all` kapag handa na mag-release. Tingnan ang [Shared Libraries Overview](./index.md#releasing-with-changesets) para sa buong flow.

:::warning
Hindi kailanman alisin o baguhin ang pangalan ng isang export hanggang sa ang replacement ay nai-publish at ang bawat consumer ay na-migrate na -- grep ang lahat ng consuming repos bago magsama ng isang removal.
:::

## Related Articles

- **[Helpers](./helpers)** -- Ang base utility package na ginagamit kasama ng AppHelper
- **[Web Apps](../web-apps/)** -- Ang web applications na gumagamit ng package na ito
- **[Shared Libraries Overview](./index.md)** -- Workspace setup, release flow, at local-link workflow
