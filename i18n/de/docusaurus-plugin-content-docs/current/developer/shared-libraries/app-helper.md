---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Das Paket `@churchapps/apphelper` bietet gemeinsame React-Komponenten und Dienstprogramme für alle ChurchApps-Webanwendungen. Es ist ein einzelnes veröffentlichtes Paket, das Funktionsmodule durch Subpath-Einstiegspunkte bereitstellt – Anmeldung, Spenden, Formulare, Markdown und Website/CMS-Funktionalität – neben einer Kernsatz von gemeinsamen Komponenten und Helfern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites)
- Machen Sie sich mit dem Setup und dem Release-Fluss des [Packages-Arbeitsbereichs](./index.md) vertraut

</div>

## Einstiegspunkte

Das Paket definiert Subpath-Exporte in seinem `package.json`, daher ist jedes Funktionsmodul auf seinem eigenen importierbar:

| Einstiegspunkt | Inhalt |
|-------------|----------|
| `@churchapps/apphelper` | Kern-Komponenten, Helfer und Hooks |
| `@churchapps/apphelper/login` | Anmeldungs- und Registrierungs-UI |
| `@churchapps/apphelper/donations` | Spenden- und Spendenkomponenten |
| `@churchapps/apphelper/forms` | Formular-Einreichungs-Komponenten |
| `@churchapps/apphelper/markdown` | Markdown- und HTML-Editoren und Renderer |
| `@churchapps/apphelper/website` | Website-Builder und CMS-Komponenten |

## Wer verbraucht Was

Bevor Sie einen gemeinsamen Export ändern, überprüfen Sie, welche Apps ihn importieren:

| Exportbereich | Was es bietet | Verbraucht von |
|---|---|---|
| Root – Kern-Komponenten & Hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, plus re-exported `@churchapps/helpers` Dienstprogramme (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, usw.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root – Website-Chrome | `SiteHeader` (nav, Benutzermenü, Benachrichtigungen) | B1Admin, B1Transfer, LessonsApp |
| Root – Admin-Inhalts-Editoren | `ImageEditor`, `HelpIcon` | B1Admin |
| Root – Echtzeit-Rohrleitungen | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root – Chat/Präsenz-Speicher | `ConversationStore`, `PresenceStore` | B1App |
| Root – Notizen- & Messaging-UI | `Notes` (Stab-Notizen auf Personen/Aufgaben); `AddNote`, `SubscriptionToggle` (Mitglied-Messaging) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root – Lessons-spezifisch | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (gemeinsam); `MarkdownPreview`, `HtmlEditor` (Admin-Inhalts-Bearbeitung) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (gemeinsam); `FundDonations` (nur Admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (rendert `ConversationalForm`, wenn der `displayMode` des Formulars `conversational` ist) | B1Admin, B1App |
| `./website` | Seiten-Rendering-Kern, der vom Editor und Renderer geteilt wird (`Element` + die Pro-Typ-Renderer, die über `ElementRegistry` aufgelöst werden, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); Site-Wide Widgets (`AnnouncementBanner`, `Launcher` + ihre `parse*Config` Helfer); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement`, die nur vom öffentlich-gerichteten Renderer verwendet werden | B1Admin (Editor), B1App (Editor-Komponenten + Renderer) |

B1Transfer und LessonsApp verwenden nur die Root- und `login` Einstiegspunkte – die `donations`, `forms` und `website` Subpaths werden heute ausschließlich von B1Admin und B1App verbraucht.

## Setup für lokale Entwicklung

Dieses Paket lebt im [Packages](https://github.com/ChurchApps/Packages) Arbeitsbereich neben anderen gemeinsamen Bibliotheken:

1. Klonen Sie den Arbeitsbereich:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installieren Sie Abhängigkeiten an der Arbeitsbereich-Root:

   ```bash
   cd Packages && yarn install
   ```

3. Starten Sie den Vite-Spielplatz aus dem Paketverzeichnis:

   ```bash
   cd apphelper && yarn dev
   ```

   Der Spielplatz Dev-Server startet bei `http://localhost:3001`. Kopieren Sie zunächst `playground/dotenv.sample` nach `playground/.env` und füllen Sie die erforderlichen Werte aus.

Zum Bauen des Pakets für den Verbrauch (kompiliert zu `dist/` und kopiert Gebietsschema-/CSS-Vermögenswerte), führen Sie `yarn workspace @churchapps/apphelper build` durch – oder `yarn build` an der Root, um jedes Paket in Abhängigkeitsreihenfolge zu bauen. Zum Testen eines unveröffentlichten Builds innerhalb einer verbrauchenden App verwenden Sie ein temporäres Yarn-Portal – siehe [Lokale Entwicklung gegen eine verbrauchende App](./index.md#local-development-against-a-consuming-app).

:::tip
Der Spielplatz ist der schnellste Weg zur Entwicklung und zum Testen von AppHelper-Komponenten. Er lädt den Vite Dev-Server neu, so dass Sie Änderungen in Echtzeit sehen können.
:::

## Veröffentlichung

Releases gehen durch Changesets: Führen Sie `yarn changeset` an der Arbeitsbereich-Root mit jeder Änderung durch, dann `yarn publish-all`, wenn Sie bereit sind zu veröffentlichen. Siehe [Shared Libraries Overview](./index.md#releasing-with-changesets) für den vollständigen Fluss.

:::warning
Entfernen oder benennen Sie keinen Export um, bis der Ersatz veröffentlicht ist und jeder Consumer migriert wurde – grep über alle verbrauchenden Repos, bevor Sie eine Entfernung zusammenführen.
:::

## Verwandte Artikel

- **[Helpers](./helpers)** – Das Basis-Utility-Paket, das zusammen mit AppHelper verwendet wird
- **[Web-Apps](../web-apps/)** – Die Webanwendungen, die dieses Paket verbrauchen
- **[Shared Libraries Overview](./index.md)** – Arbeitsbereich-Setup, Release-Fluss und lokales Link-Workflow
