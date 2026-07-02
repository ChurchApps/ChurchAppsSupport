---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

The `@churchapps/apphelper` package provides shared React components and utilities for all ChurchApps web applications. It is a single published package that exposes feature modules through subpath entry points -- login, donations, forms, markdown, and website/CMS functionality -- alongside a core set of shared components and helpers.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install **Node.js** and **Git** -- see [Prerequisites](../setup/prerequisites)
- Familiarize yourself with the [Packages workspace](./index.md) setup and release flow

</div>

## Entry Points

The package defines subpath exports in its `package.json`, so each feature module is importable on its own:

| Entry point | Contents |
|-------------|----------|
| `@churchapps/apphelper` | Core components, helpers, and hooks |
| `@churchapps/apphelper/login` | Login and registration UI |
| `@churchapps/apphelper/donations` | Giving and donation components |
| `@churchapps/apphelper/forms` | Form submission components |
| `@churchapps/apphelper/markdown` | Markdown and HTML editors and renderers |
| `@churchapps/apphelper/website` | Website builder and CMS components |

## Who Consumes What

Before changing a shared export, check which apps import it:

| Export area | What it provides | Consumed by |
|---|---|---|
| Root -- core components & hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, plus re-exported `@churchapps/helpers` utilities (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, etc.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- site chrome | `SiteHeader` (nav, user menu, notifications) | B1Admin, B1Transfer, LessonsApp |
| Root -- admin content editors | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- realtime plumbing | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- chat/presence stores | `ConversationStore`, `PresenceStore` | B1App |
| Root -- notes & messaging UI | `Notes` (staff notes on people/tasks); `AddNote`, `SubscriptionToggle` (member messaging) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- Lessons-specific | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (shared); `MarkdownPreview`, `HtmlEditor` (admin content editing) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (shared); `FundDonations` (admin only) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renders `ConversationalForm` when the form's `displayMode` is `conversational`) | B1Admin, B1App |
| `./website` | Page-rendering core shared by the editor and renderer (`Element` + the per-type renderers resolved via `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); site-wide widgets (`AnnouncementBanner`, `Launcher` + their `parse*Config` helpers); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` used only by the public-facing renderer | B1Admin (editor), B1App (editor components + renderer) |

B1Transfer and LessonsApp use only the root and `login` entry points -- the `donations`, `forms`, and `website` subpaths are consumed exclusively by B1Admin and B1App today.

## Setup for Local Development

This package lives in the [Packages](https://github.com/ChurchApps/Packages) workspace alongside the other shared libraries:

1. Clone the workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Install dependencies at the workspace root:

   ```bash
   cd Packages && yarn install
   ```

3. Launch the Vite playground from the package directory:

   ```bash
   cd apphelper && yarn dev
   ```

   The playground dev server starts at **http://localhost:3001**. Copy `playground/dotenv.sample` to `playground/.env` and fill in the required values first.

To build the package for consumption (compiles to `dist/` and copies locale/CSS assets), run `yarn workspace @churchapps/apphelper build` -- or `yarn build` at the root to build every package in dependency order. To test an unpublished build inside a consuming app, use a temporary Yarn portal -- see [Local Development Against a Consuming App](./index.md#local-development-against-a-consuming-app).

:::tip
The playground is the fastest way to develop and test AppHelper components. It hot-reloads the Vite dev server so you can see changes in real time.
:::

## Publishing

Releases go through changesets: run `yarn changeset` at the workspace root with every change, then `yarn publish-all` when ready to release. See the [Shared Libraries Overview](./index.md#releasing-with-changesets) for the full flow.

:::warning
Never remove or rename an export until the replacement is published and every consumer has been migrated -- grep all consuming repos before merging a removal.
:::

## Related Articles

- **[Helpers](./helpers)** -- The base utility package used alongside AppHelper
- **[Web Apps](../web-apps/)** -- The web applications that consume this package
- **[Shared Libraries Overview](./index.md)** -- Workspace setup, release flow, and local-link workflow
