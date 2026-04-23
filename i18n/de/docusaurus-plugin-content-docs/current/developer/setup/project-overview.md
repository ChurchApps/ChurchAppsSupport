---
title: "Projekt-Übersicht"
---

# Projekt-Übersicht

<div class="article-intro">

ChurchApps umfasst etwa 20 unabhängige Repositories, die alle unter der [ChurchApps GitHub-Organisation](https://github.com/ChurchApps) veröffentlicht werden. Diese Seite bietet einen vollständigen Bestand aller Projekte, organisiert nach Kategorie, zusammen mit ihren Frameworks, Ports und Beziehungen.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie die [Voraussetzungen](./prerequisites) für die Projekt-Kategorie, die Sie bearbeiten möchten

</div>

## Backend-APIs

Alle APIs werden mit Node.js, Express und TypeScript gebaut und sind als AWS Lambda via Serverless Framework deployed.

| Projekt | Zweck | Dev-Port | Datenbank |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Core modularer Monolith, der Membership, Attendance, Content, Giving, Messaging und Doing abdeckt | 8084 | Separate MySQL-Datenbank pro Modul (6 insgesamt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church Backend | -- | Einzelne `lessons` MySQL-Datenbank |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | AI-Query-Werkzeug powered by OpenAI | -- | -- |

:::info
Das Core-**Api**-Projekt ist ein modularer Monolith. Jedes Modul (Membership, Attendance, Content, Giving, Messaging, Doing) hat seine eigene Datenbank und ist unter einem Unterpfad wie `/membership` oder `/giving` zugänglich. In Production werden diese als separate Lambda-Funktionen hinter API Gateway freigelegt.
:::

## Web-Apps

| Projekt | Framework | Dev-Port | Zweck |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Kirchenverwaltungs-Dashboard |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Öffentliche Gemeinde-Mitglieder-App |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church Frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Daten-Import/Export-Werkzeug |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statisch | -- | Statische Kirchen-Brochure-Websites |

## Mobile-Apps

Alle Mobile-Apps nutzen React Native mit Expo.

| Projekt | Zweck | Wichtige Versionen |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Gemeinde-Mitglieder-App für iOS und Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Check-in-Kiosk-App | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV Lesson-Anzeige | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Content-Wiedergabe (inkl. TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobile Fernbedienung für FreeShow | Expo |

## Desktop

| Projekt | Stack | Zweck |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Präsentations- und Worship-Software |

## Gemeinsame Biblioteken

Gemeinsamer Code wird zu npm unter dem `@churchapps`-Scope veröffentlicht. Diese werden als reguläre npm-Abhängigkeiten von den oben genannten Projekten konsumiert.

| Package | npm-Name | Zweck | Nutzen durch |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Basis-Utilities (DateHelper, ApiHelper, CurrencyHelper, usw.) | Alle Projekte |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Express-Server-Utilities (Auth-Middleware, DB-Helfer, AWS-Integration) | Alle APIs |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Workspace mit 6 Packages | React-Komponentenbibliothek | Alle Web-Apps |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | YouTube, Vimeo und lokale Content-Provider | FreeShow, FreePlay, Api |

### AppHelper Sub-Packages

Das AppHelper-Projekt ist ein Monorepo Workspace, der sechs Packages veröffentlicht:

| Package | npm-Name |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## Projekt-Beziehungen

```
Frontend-Apps              Gemeinsame Biblioteken     Backend-APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Alle Frontend-Apps hängen von `@churchapps/helpers` ab. Web-Apps hängen zusätzlich von `@churchapps/apphelper`-Packages ab. Alle Backend-APIs hängen von `@churchapps/helpers` und `@churchapps/apihelper` ab.

## Nächste Schritte

- **[Umgebungsvariablen](./environment-variables)** — Konfigurieren Sie Ihre `.env`-Dateien, um Ihre API zu verbinden
- **[API Lokales Setup](../api/local-setup)** — Richten Sie das Backend API lokal ein
