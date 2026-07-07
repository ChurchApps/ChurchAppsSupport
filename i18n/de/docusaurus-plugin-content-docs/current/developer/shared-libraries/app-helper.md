---
title: "AppHelper"
---

# AppHelper

Das Paket `@churchapps/apphelper` bietet freigegebene React-Komponenten und Hilfsfunktionen für alle ChurchApps-Web-Anwendungen. Es ist ein einzelnes veröffentlichtes Paket, das Feature-Module durch Subpath-Einstiegspunkte verfügbar macht.

## Einstiegspunkte

Das Paket definiert Subpath-Exporte in `package.json`:

| Einstiegspunkt | Inhalt |
|-------------|----------|
| `@churchapps/apphelper` | Kern-Komponenten, Helfer und Hooks |
| `@churchapps/apphelper/login` | Login- und Registrierungs-UI |
| `@churchapps/apphelper/donations` | Spenden- und Spendendkomponenten |
| `@churchapps/apphelper/forms` | Formulareinreichungskomponenten |
| `@churchapps/apphelper/markdown` | Markdown- und HTML-Editoren |
| `@churchapps/apphelper/website` | Website-Builder und CMS-Komponenten |

## Wer nutzt was

| Export-Bereich | Was es bietet | Verwendet von |
|---|---|---|
| Root -- Kern | `DisplayBox`, `InputBox`, `Loading`, `PageHeader` | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- Site-Chrome | `SiteHeader` (Nav, Benutzermenü, Benachrichtigungen) | B1Admin, B1Transfer, LessonsApp |
| Root -- Admin-Editoren | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- Echtzeit | `SocketHelper`, `SubscriptionManager` | B1Admin, B1App |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer |
| `./markdown` | `MarkdownEditor`, `MarkdownPreview` | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations` | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` | B1Admin, B1App |
| `./website` | Page-Rendering-Kern, Elemente, Widgets | B1Admin, B1App |

## Lokale Entwicklung

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages && yarn install
cd apphelper && yarn dev
```

Der Playground-Dev-Server startet auf http://localhost:3001.

## Veröffentlichung

Releases verwenden Changesets. Lesen Sie die Übersicht [Freigegebene Bibliotheken](./index.md) für den vollständigen Fluss.

:::warning
Entfernen Sie keinen Export, bis der Replacement veröffentlicht und alle Verbraucher migriert wurden.
:::
