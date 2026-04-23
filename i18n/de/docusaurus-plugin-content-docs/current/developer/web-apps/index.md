---
title: "Web-Apps"
---

# Web-Apps

<div class="article-intro">

ChurchApps enthält drei Web-Anwendungen, die jeweils eine andere Zielgruppe und einen anderen Zweck bedienen. Sie teilen sich eine allgemeine Tech-Foundation aus React 19, TypeScript und Material-UI 7, unterscheiden sich jedoch in ihren Build-Tools und Deployment-Zielen.

</div>

## Anwendungen auf einen Blick

| App | Zweck | Framework | Dev-Port |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Kirchenverwaltungs-Dashboard | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Öffentliche Gemeinde-Mitglieder-App | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Lesson-Content-Management | Next.js 16 + React 19 | 3501 |

## Gemeinsamer Tech-Stack

Alle drei Web-Apps werden mit folgendem gebaut:

- **TypeScript** — End-to-End-Type-Sicherheit
- **React 19** — UI-Komponentenbibliothek
- **Material-UI 7** — Design-System und Komponentenbaukasten
- **React Query 5** — Server-State-Management

## Gemeinsame Komponenten

Die Apps teilen sich UI-Komponenten und Utilities durch die `@churchapps/apphelper*`-Familie von Packages:

| Package | Zweck |
|---------|---------|
| `@churchapps/apphelper` | Core gemeinsame React-Komponenten |
| `@churchapps/apphelper-login` | Authentifizierungs-UI-Komponenten |
| `@churchapps/apphelper-donations` | Spenden- und Spendenformulare |
| `@churchapps/apphelper-forms` | Form-Builder-Komponenten |
| `@churchapps/apphelper-markdown` | Markdown-Rendering |
| `@churchapps/apphelper-website` | Website/CMS-Komponenten |

:::tip
Für Details zur Entwicklung dieser gemeinsamen Packages lokal, siehe [AppHelper](../shared-libraries/app-helper)-Dokumentation.
:::

## Postinstall-Skript

Jede Web-App hat ein `postinstall`-Skript, das Locale-Dateien und CSS-Assets von `@churchapps/apphelper` ins Projekt kopiert. Dies läuft automatisch nach `npm install`.

:::info
Wenn Komponenten nach der Installation von Abhängigkeiten unstyled aussehen, ist das `postinstall`-Skript möglicherweise nicht korrekt gelaufen. Sie können es manuell mit `npm run postinstall` auslösen.
:::

## Build-Tools

Die Apps nutzen zwei verschiedene Build-Tools:

- **B1Admin** nutzt **Vite** — ein schneller, moderner Bundler, ideal für Single-Page-Anwendungen
- **B1App** und **LessonsApp** nutzen **Next.js** — bieten Server-Side-Rendering, File-Based-Routing und optimierte Production-Builds
