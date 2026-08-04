---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Das Paket `@churchapps/apphelper` stellt gemeinsam genutzte React-Komponenten und Hilfsprogramme für alle Web-Anwendungen von ChurchApps bereit. Es ist ein einziges veröffentlichtes Paket, das Feature-Module über Subpath-Einstiegspunkte bereitstellt -- Login, Spenden, Formulare, Markdown und Website-/CMS-Funktionalität -- zusätzlich zu einer Kernmenge gemeinsam genutzter Komponenten und Hilfsprogramme.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem Aufbau und Release-Ablauf des [Packages-Workspace](./index.md) vertraut

</div>

## Einstiegspunkte

Das Paket definiert Subpath-Exporte in seiner `package.json`, sodass jedes Feature-Modul einzeln importierbar ist:

| Einstiegspunkt | Inhalt |
|-------------|----------|
| `@churchapps/apphelper` | Kernkomponenten, Hilfsprogramme und Hooks |
| `@churchapps/apphelper/login` | Login- und Registrierungs-UI |
| `@churchapps/apphelper/donations` | Komponenten für Spenden und Gaben |
| `@churchapps/apphelper/forms` | Komponenten zur Formularübermittlung |
| `@churchapps/apphelper/markdown` | Markdown- und HTML-Editoren und -Renderer |
| `@churchapps/apphelper/website` | Website-Builder- und CMS-Komponenten |

## Wer was nutzt

Bevor Sie einen gemeinsam genutzten Export ändern, prüfen Sie, welche Apps ihn importieren:

| Export-Bereich | Was er bereitstellt | Genutzt von |
|---|---|---|
| Root -- Kernkomponenten & Hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, plus erneut exportierte Hilfsprogramme aus `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` usw.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- Site-Chrome | `SiteHeader` (Navigation, Benutzermenü, Benachrichtigungen) | B1Admin, B1Transfer, LessonsApp |
| Root -- Admin-Content-Editoren | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- Realtime-Infrastruktur | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- Chat-/Präsenz-Stores | `ConversationStore`, `PresenceStore` | B1App |
| Root -- Notizen- & Messaging-UI | `Notes` (Mitarbeiternotizen zu Personen/Aufgaben); `AddNote`, `SubscriptionToggle` (Mitglieder-Messaging) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- Lessons-spezifisch | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (gemeinsam genutzt); `MarkdownPreview`, `HtmlEditor` (Admin-Content-Bearbeitung) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (gemeinsam genutzt); `FundDonations` (nur Admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (rendert `ConversationalForm`, wenn der `displayMode` des Formulars `conversational` ist) | B1Admin, B1App |
| `./website` | Seiten-Rendering-Kern, gemeinsam genutzt vom Editor und Renderer (`Element` + die typspezifischen Renderer, aufgelöst über `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); seitenweite Widgets (`AnnouncementBanner`, `Launcher` + deren `parse*Config`-Hilfsfunktionen); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement`, die nur vom öffentlich zugänglichen Renderer verwendet werden | B1Admin (Editor), B1App (Editor-Komponenten + Renderer) |

B1Transfer und LessonsApp nutzen nur den Root- und den `login`-Einstiegspunkt -- die Subpaths `donations`, `forms` und `website` werden heute ausschließlich von B1Admin und B1App verwendet.

## Einrichtung für die lokale Entwicklung

Dieses Paket befindet sich im [Packages](https://github.com/ChurchApps/Packages)-Workspace zusammen mit den anderen gemeinsam genutzten Bibliotheken:

1. Workspace klonen:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Abhängigkeiten im Workspace-Root installieren:

   ```bash
   cd Packages && yarn install
   ```

3. Vite-Playground aus dem Paketverzeichnis starten:

   ```bash
   cd apphelper && yarn dev
   ```

   Der Playground-Dev-Server startet unter **http://localhost:3001**. Kopieren Sie zunächst `playground/dotenv.sample` nach `playground/.env` und tragen Sie die erforderlichen Werte ein.

Um das Paket für den Verbrauch zu bauen (kompiliert nach `dist/` und kopiert Locale-/CSS-Assets), führen Sie `yarn workspace @churchapps/apphelper build` aus -- oder `yarn build` im Root, um alle Pakete in Abhängigkeitsreihenfolge zu bauen. Um einen unveröffentlichten Build innerhalb einer konsumierenden App zu testen, verwenden Sie ein temporäres Yarn-Portal -- siehe [Lokale Entwicklung gegen eine konsumierende App](./index.md#local-development-against-a-consuming-app).

:::tip
Der Playground ist der schnellste Weg, um AppHelper-Komponenten zu entwickeln und zu testen. Er lädt den Vite-Dev-Server per Hot-Reload neu, sodass Sie Änderungen in Echtzeit sehen.
:::

## Veröffentlichung

Releases laufen über Changesets: Führen Sie bei jeder Änderung `yarn changeset` im Workspace-Root aus, dann `yarn publish-all`, wenn Sie bereit für die Veröffentlichung sind. Den vollständigen Ablauf finden Sie unter [Übersicht der gemeinsam genutzten Bibliotheken](./index.md#releasing-with-changesets).

:::warning
Entfernen oder benennen Sie niemals einen Export um, bevor der Ersatz veröffentlicht und jeder Konsument migriert wurde -- durchsuchen Sie vor dem Mergen einer Entfernung alle konsumierenden Repositories.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** -- Das Basis-Utility-Paket, das zusammen mit AppHelper verwendet wird
- **[Web-Apps](../web-apps/)** -- Die Web-Anwendungen, die dieses Paket konsumieren
- **[Übersicht der gemeinsam genutzten Bibliotheken](./index.md)** -- Workspace-Setup, Release-Ablauf und lokaler Link-Workflow
