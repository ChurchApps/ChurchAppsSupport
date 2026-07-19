---
title: "Projektübersicht"
---

# Projektübersicht

<div class="article-intro">

ChurchApps besteht aus etwa 20 unabhängigen Repositorys, jedes veröffentlicht unter der [ChurchApps-GitHub-Organisation](https://github.com/ChurchApps). Diese Seite bietet ein vollständiges Verzeichnis aller Projekte, organisiert nach Kategorie, samt ihrer Frameworks, Ports und Beziehungen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie die [Voraussetzungen](./prerequisites) für die Projektkategorie, an der Sie arbeiten möchten

</div>

## Backend-APIs

Alle APIs sind mit Node.js, Express und TypeScript gebaut und werden über das Serverless Framework auf AWS Lambda bereitgestellt.

| Projekt | Zweck | Dev-Port | Datenbank |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Kern-Modul-Monolith für Mitgliedschaft, Anwesenheit, Inhalte, Spenden, Messaging und Doing | 8084 | Separate MySQL-Datenbank pro Modul (6 insgesamt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church-Backend | -- | Einzelne `lessons`-MySQL-Datenbank |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | KI-Abfragewerkzeug, angetrieben von OpenAI | -- | -- |

:::info
Das Kernprojekt **Api** ist ein Modul-Monolith. Jedes Modul (Mitgliedschaft, Anwesenheit, Inhalte, Spenden, Messaging, Doing) hat seine eigene Datenbank und ist unter einem Unterpfad wie `/membership` oder `/giving` erreichbar. In der Produktion werden diese als separate Lambda-Funktionen hinter dem API Gateway bereitgestellt.
:::

## Webanwendungen

| Projekt | Framework | Dev-Port | Zweck |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Kirchenverwaltungs-Dashboard |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Öffentlich zugängliche App für Kirchenmitglieder |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church-Frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Werkzeug für Datenimport/-export |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statisch | -- | Statische Kirchen-Broschürenwebsites |

## Mobile Apps

Alle mobilen Apps verwenden React Native mit Expo.

| Projekt | Zweck | Schlüsselversionen |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | App für Kirchenmitglieder für iOS und Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Check-in-Kiosk-App | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android-TV-Lektionsanzeige | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Inhaltswiedergabe (einschließlich TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobile Fernbedienung für FreeShow | Expo |

## Desktop

| Projekt | Stack | Zweck |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Präsentations- und Anbetungssoftware |

## Gemeinsame Bibliotheken

Gemeinsamer Code wird unter dem `@churchapps`-Scope auf npm veröffentlicht und von den obigen Projekten als reguläre npm-Abhängigkeiten konsumiert. Alle gemeinsamen Pakete leben in einem einzigen Repository -- [Packages](https://github.com/ChurchApps/Packages) -- verwaltet als Yarn-Workspace und veröffentlicht mit Changesets.

| Paket | Zweck | Verwendet von |
|---------|---------|---------|
| `@churchapps/helpers` | Basis-Utilities und gemeinsame TypeScript-Schnittstellen (DateHelper, ApiHelper, CurrencyHelper usw.) | Alle Projekte |
| `@churchapps/apihelper` | Express-Server-Utilities (Auth, Basis-Controller, Datenbankzugriff, AWS-Integrationen) | Alle APIs |
| `@churchapps/apphelper` | React-Komponentenbibliothek mit Unterpfad-Modulen für Login, Spenden, Formulare, Markdown und Website-Aufbau | Alle Webanwendungen |
| `@churchapps/content-providers` | Abstraktion für Drittanbieter-Inhaltsanbieter (Lessons.church, Planning Center, Dropbox und andere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church-Integrations-Toolkit: Webhooks, REST-Client, OAuth | Externe Integrationsentwickler |
| `@churchapps/texting` | SMS-Anbieter-Abstraktion | Api |

Siehe [Gemeinsame Bibliotheken](../shared-libraries/) für die Workspace-Einrichtung und den Release-Workflow.

## Projektbeziehungen

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Alle Frontend-Apps hängen von `@churchapps/helpers` ab. Webanwendungen hängen zusätzlich von `@churchapps/apphelper`-Paketen ab. Alle Backend-APIs hängen sowohl von `@churchapps/helpers` als auch von `@churchapps/apihelper` ab.

## Nächste Schritte

- **[Umgebungsvariablen](./environment-variables)** -- Konfigurieren Sie Ihre `.env`-Dateien für die Verbindung zu APIs
- **[Lokale API-Einrichtung](../api/local-setup)** -- Richten Sie die Backend-API lokal ein
</content>
