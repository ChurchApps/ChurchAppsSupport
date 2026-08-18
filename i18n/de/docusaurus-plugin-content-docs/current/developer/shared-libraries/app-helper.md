---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Das Paket `@churchapps/apphelper` bietet gemeinsame React-Komponenten und Utilities für alle ChurchApps-Webanwendungen. Es ist ein einziges veröffentlichtes Paket, das Feature-Module durch Subpfad-Einstiegspunkte – Login, Spenden, Formulare, Markdown und Website-/CMS-Funktionalität – neben einem Kernset gemeinsamer Komponenten und Helfer bereitstellt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** – siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem [Packages Arbeitsbereich](./index.md)-Setup und Release-Fluss vertraut

</div>

## Einstiegspunkte

Das Paket definiert Subpfad-Exporte in seinem `package.json`, sodass jedes Feature-Modul auf sich allein importierbar ist:

| Einstiegspunkt | Inhalte |
|-------------|----------|
| `@churchapps/apphelper` | Kern-Komponenten, Helfer und Hooks |
| `@churchapps/apphelper/login` | Login- und Registrierungs-UI |
| `@churchapps/apphelper/donations` | Spendenkomponenten |
| `@churchapps/apphelper/forms` | Formular-Einreichungskomponenten |
| `@churchapps/apphelper/markdown` | Markdown- und HTML-Editoren und Renderer |
| `@churchapps/apphelper/website` | Website-Builder und CMS-Komponenten |

## Wer konsumiert was

Bevor Sie einen gemeinsamen Export ändern, überprüfen Sie, welche Apps ihn importieren:

| Export-Bereich | Was es bietet | Konsumiert von |
|---|---|---|
| Root – Kern-Komponenten & Hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, plus erneut exportierte `@churchapps/helpers`-Utilities (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` usw.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root – Website-Chrome | `SiteHeader` (Nav, Benutzermenü, Benachrichtigungen) | B1Admin, B1Transfer, LessonsApp |
| Root – Admin-Inhalts-Editoren | `ImageEditor`, `HelpIcon` | B1Admin |
| Root – Realtime-Struktur | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root – Chat/Presence-Stores | `ConversationStore`, `PresenceStore` | B1App |
| Root – Notes & Messaging-UI | `Notes` (Personal-Notizen auf Personen/Aufgaben); `AddNote`, `SubscriptionToggle` (Mitglieder-Messaging) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root – Lessons-spezifisch | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (gemeinsam); `MarkdownPreview`, `HtmlEditor` (Admin-Inhalts-Bearbeitung) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (gemeinsam); `FundDonations` (nur Admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (rendert `ConversationalForm`, wenn die `displayMode` des Formulars `conversational` ist) | B1Admin, B1App |
| `./website` | Seiten-Rendering-Core geteilt durch Editor und Renderer (`Element` + die Pro-Typ-Renderer aufgelöst über `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); Site-wide Widgets (`AnnouncementBanner`, `Launcher` + ihre `parse*Config`-Helfer); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` nur vom öffentlich-gerichteten Renderer verwendet | B1Admin (Editor), B1App (Editor-Komponenten + Renderer) |

B1Transfer und LessonsApp verwenden nur die Root- und `login`-Einstiegspunkte – die `donations`, `forms` und `website`-Subpfade werden ausschließlich von B1Admin und B1App heute konsumiert.

## Setup für lokale Entwicklung

Dieses Paket lebt im [Packages](https://github.com/ChurchApps/Packages)-Arbeitsbereich neben den anderen gemeinsamen Bibliotheken:

1. Klonen Sie den Arbeitsbereich:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installieren Sie Abhängigkeiten im Arbeitsbereich-Root:

   ```bash
   cd Packages && yarn install
   ```

3. Starten Sie den Vite-Spielplatz aus dem Paketverzeichnis:

   ```bash
   cd apphelper && yarn dev
   ```

   Der Spielplatz-Dev-Server startet unter `http://localhost:3001`. Kopieren Sie zuerst `playground/dotenv.sample` zu `playground/.env` und füllen Sie die erforderlichen Werte aus.

Um das Paket zur Verwendung zu bauen (kompiliert zu `dist/` und kopiert Locale-/CSS-Assets), führen Sie `yarn workspace @churchapps/apphelper build` aus – oder `yarn build` im Root, um jedes Paket in Abhängigkeitsreihenfolge zu bauen. Um einen nicht veröffentlichten Build in einer verbrauchenden App zu testen, verwenden Sie ein temporäres Yarn-Portal – siehe [Lokale Entwicklung gegen eine verbrauchende App](./index.md#local-development-against-a-consuming-app).

:::tip
Der Spielplatz ist die schnellste Weise, AppHelper-Komponenten zu entwickeln und zu testen. Es Hot-Reloads den Vite-Dev-Server, sodass Sie Änderungen in Echtzeit sehen können.
:::

## Veröffentlichung

Releases gehen durch Changesets: führen Sie `yarn changeset` im Arbeitsbereich-Root mit jedem Change aus, dann `yarn publish-all`, wenn Sie bereit sind zu veröffentlichen. Siehe [Übersicht über gemeinsame Bibliotheken](./index.md#releasing-with-changesets) für den vollständigen Fluss.

:::warning
Entfernen oder benennen Sie einen Export nie, bis der Ersatz veröffentlicht ist und jeder Verbraucher migriert wurde – Grep alle Verbrauchungs-Repos vor dem Mergen eines Removals.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** – Das Base-Utility-Paket, das neben AppHelper verwendet wird
- **[Web-Apps](../web-apps/)** – Die Webanwendungen, die dieses Paket konsumieren
- **[Übersicht über gemeinsame Bibliotheken](./index.md)** – Arbeitsbereich-Setup, Release-Fluss und lokales Verknüpfungs-Workflow
