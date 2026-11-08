---
title: "Projektübersicht"
description: "Alle ChurchApps-Repositories nach Kategorien geordnet mit Frameworks, Entwicklungsports, Datenbanken und der Art, wie die gemeinsam genutzten @churchapps-Pakete sie verbinden, in den Entwickler-Einrichtungsdokumenten."
---

# Projektübersicht

<div class="article-intro">

ChurchApps besteht aus etwa 20 unabhängigen Repositories, die jeweils unter der [ChurchApps-GitHub-Organisation](https://github.com/ChurchApps) veröffentlicht werden. Diese Seite bietet ein vollständiges Verzeichnis aller Projekte, nach Kategorien geordnet, mit ihren Frameworks, Ports und Beziehungen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie die [Voraussetzungen](./prerequisites.md) für die Projektkategorie, an der Sie arbeiten möchten

</div>

## Backend-APIs

Alle APIs sind mit Node.js, Express und TypeScript entwickelt und werden über das Serverless Framework auf AWS Lambda bereitgestellt.

| Projekt | Zweck | Dev-Port | Datenbank |
|---------|-------|----------|-----------|
| **[Api](https://github.com/ChurchApps/Api)** | Zentraler modularer Monolith für Mitgliedschaft, Anwesenheit, Inhalte, Spenden, Nachrichten und Doing | 8084 | Separate MySQL-Datenbank pro Modul (insgesamt 6) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend für Lessons.church | -- | Einzelne MySQL-Datenbank `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | KI-Abfragetool auf Basis von OpenAI | -- | -- |

:::info
Die Kern-**Api** ist ein modularer Monolith. Jedes Modul (Mitgliedschaft, Anwesenheit, Inhalte, Spenden, Nachrichten, Doing) hat seine eigene Datenbank und ist unter einem Unterpfad wie `/membership` oder `/giving` erreichbar. In der Produktion werden diese als separate Lambda-Funktionen hinter dem API Gateway bereitgestellt.
:::

## Web-Apps

| Projekt | Framework | Dev-Port | Zweck |
|---------|-----------|----------|-------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Verwaltungs-Dashboard für Kirchen |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Öffentlich zugängliche App für Kirchenmitglieder |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend für Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Dienstprogramm für Datenimport und -export |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statisch | -- | Statische Prospekt-Websites für Kirchen |

## Mobile Apps

Alle mobilen Apps verwenden React Native mit Expo.

| Projekt | Zweck | Wichtige Versionen |
|---------|-------|--------------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Check-in-Kiosk-App | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Lektionsanzeige für Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Wiedergabe von Inhalten (einschließlich TV-Betriebssysteme) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobile Fernbedienung für FreeShow | Expo |

## Desktop

| Projekt | Stack | Zweck |
|---------|-------|-------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Präsentations- und Gottesdienstsoftware |

## Gemeinsam genutzte Bibliotheken

Gemeinsam genutzter Code wird unter dem Scope `@churchapps` in npm veröffentlicht und von den oben genannten Projekten als reguläre npm-Abhängigkeiten verwendet. Alle gemeinsamen Pakete befinden sich in einem einzigen Repository – [Packages](https://github.com/ChurchApps/Packages) – und werden als Yarn-Workspace verwaltet und mit Changesets veröffentlicht.

| Paket | Zweck | Verwendet von |
|-------|-------|---------------|
| `@churchapps/helpers` | Grundlegende Hilfsfunktionen und gemeinsame TypeScript-Schnittstellen (DateHelper, ApiHelper, CurrencyHelper usw.) | Alle Projekte |
| `@churchapps/apihelper` | Hilfsfunktionen für den Express-Server (Authentifizierung, Basis-Controller, Datenbankzugriff, AWS-Integrationen) | Alle APIs |
| `@churchapps/apphelper` | React-Komponentenbibliothek mit Untermodulen für Anmeldung, Spenden, Formulare, Markdown und Website-Erstellung | Alle Web-Apps |
| `@churchapps/content-providers` | Abstraktion für Drittanbieter-Inhaltsquellen (Lessons.church, Planning Center, Dropbox und andere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Integrationswerkzeugkasten für B1.church: Webhooks, REST-Client, OAuth | Externe Integrationsentwickler |
| `@churchapps/texting` | Abstraktion für SMS-Anbieter | Api |

Informationen zur Einrichtung des Workspaces und zum Veröffentlichungsablauf finden Sie unter [Gemeinsam genutzte Bibliotheken](../shared-libraries/index.md).

## Projektbeziehungen

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Alle Frontend-Apps hängen von `@churchapps/helpers` ab. Web-Apps hängen zusätzlich von den Paketen `@churchapps/apphelper` ab. Alle Backend-APIs hängen sowohl von `@churchapps/helpers` als auch von `@churchapps/apihelper` ab.

## Nächste Schritte

- **[Umgebungsvariablen](./environment-variables.md)** -- Konfigurieren Sie Ihre `.env`-Dateien für die Verbindung mit den APIs
- **[Lokale API-Einrichtung](../api/local-setup.md)** -- Richten Sie das Backend-API lokal ein
