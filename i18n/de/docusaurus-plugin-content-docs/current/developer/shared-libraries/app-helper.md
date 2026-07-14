---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Das `@churchapps/apphelper`-Paket bietet gemeinsame React-Komponenten und Dienstprogramme für alle ChurchApps-Webanwendungen. Es ist ein einzelnes veröffentlichtes Paket, das Funktionsmodule durch Subpath-Einstiegspunkte -- Login, Spenden, Formulare, Markdown und Website-/CMS-Funktionalität -- neben einem Kernsatz gemeinsamer Komponenten und Helfer verfügbar macht.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem [Packages-Arbeitsbereich](./index.md)-Setup und Release-Flow vertraut

</div>

## Einstiegspunkte

Das Paket definiert Subpath-Exporte in seiner `package.json`, daher ist jedes Funktionsmodul eigenständig importierbar:

| Einstiegspunkt | Inhalte |
|---|---|
| `@churchapps/apphelper` | Kernkomponenten, Helfer und Hooks |
| `@churchapps/apphelper/login` | Login- und Registrierungs-UI |
| `@churchapps/apphelper/donations` | Spende- und Spendenkomponenten |
| `@churchapps/apphelper/forms` | Formular-Einreichungs-Komponenten |
| `@churchapps/apphelper/markdown` | Markdown- und HTML-Editoren und Renderer |
| `@churchapps/apphelper/website` | Website-Builder und CMS-Komponenten |

## Wer verbraucht was

Bevor Sie einen gemeinsamen Export ändern, überprüfen Sie, welche Apps ihn importieren:

| Export-Bereich | Was es bietet | Verbraucht von |
|---|---|---|
| Root -- Kernkomponenten und Hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, plus wieder exportierte `@churchapps/helpers`-Dienstprogramme (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` usw.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- Website-Chrome | `SiteHeader` (Navigation, Benutzermenü, Benachrichtigungen) | B1Admin, B1Transfer, LessonsApp |
| Root -- Admin-Inhalts-Editoren | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- Echtzeit-Rohrleitungen | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- Chat-/Präsenz-Stores | `ConversationStore`, `PresenceStore` | B1App |
| Root -- Notizen und Messaging-UI | `Notes` (Personalnotizen zu Personen/Aufgaben); `AddNote`, `SubscriptionToggle` (Mitglied-Messaging) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- Lessons-spezifisch | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (freigegeben); `MarkdownPreview`, `HtmlEditor` (Admin-Inhaltsbearbeitung) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (freigegeben); `FundDonations` (nur Admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (rendert `ConversationalForm`, wenn der `displayMode` des Formulars `conversational` ist) | B1Admin, B1App |
| `./website` | Seiten-Rendering-Kern, der vom Editor und Renderer gemeinsam genutzt wird (`Element` + die Pro-Typ-Renderer über `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig` aufgelöst); seitenweite Widgets (`AnnouncementBanner`, `Launcher` + ihre `parse*Config`-Helfer); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement`, die nur vom öffentlich zugänglichen Renderer verwendet werden | B1Admin (Editor), B1App (Editor-Komponenten + Renderer) |

B1Transfer und LessonsApp verwenden nur die Root- und `login`-Einstiegspunkte -- die `donations`, `forms` und `website`-Subpaths werden heute ausschließlich von B1Admin und B1App verbraucht.

## Setup für lokale Entwicklung

Dieses Paket befindet sich im [Packages](https://github.com/ChurchApps/Packages)-Arbeitsbereich neben den anderen gemeinsamen Bibliotheken:

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

   Der Spielplatz-Dev-Server wird unter **http://localhost:3001** gestartet. Kopieren Sie zuerst `playground/dotenv.sample` zu `playground/.env` und füllen Sie die erforderlichen Werte aus.

Um das Paket zum Verbrauch zu bauen (kompiliert zu `dist/` und kopiert Locale-/CSS-Assets), führen Sie `yarn workspace @churchapps/apphelper build` aus -- oder `yarn build` im Root, um jedes Paket in Abhängigkeitsreihenfolge zu bauen. Um einen unveröffentlichten Build in einer verbrauchenden App zu testen, verwenden Sie ein temporäres Yarn-Portal -- siehe [Lokale Entwicklung gegen eine verbrauchende App](./index.md#local-development-against-a-consuming-app).

:::tip
Der Spielplatz ist der schnellste Weg, AppHelper-Komponenten zu entwickeln und zu testen. Er lädt den Vite-Dev-Server neu, damit Sie Änderungen in Echtzeit sehen können.
:::

## Veröffentlichung

Releases erfolgen durch Changesets: Führen Sie `yarn changeset` im Arbeitsbereich-Root mit jeder Änderung aus, dann `yarn publish-all`, wenn Sie bereit sind zu veröffentlichen. Siehe die [Übersicht der gemeinsamen Bibliotheken](./index.md#releasing-with-changesets) für den vollständigen Flow.

:::warning
Entfernen Sie nie einen Export und benennen Sie ihn nicht um, bis der Ersatz veröffentlicht ist und jeder Verbraucher migriert hat -- durchsuchen Sie alle verbrauchenden Repos, bevor Sie eine Entfernung zusammenführen.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** -- Das Basisdienstprogramm-Paket, das neben AppHelper verwendet wird
- **[Web-Apps](../web-apps/)** -- Die Webanwendungen, die dieses Paket verbrauchen
- **[Übersicht der gemeinsamen Bibliotheken](./index.md)** -- Arbeitsbereich-Setup, Release-Flow und Local-Link-Workflow
