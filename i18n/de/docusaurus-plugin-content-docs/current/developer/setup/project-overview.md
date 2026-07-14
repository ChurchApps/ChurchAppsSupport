---
title: "Projektübersicht"
---

# Projektübersicht

<div class="article-intro">

ChurchApps besteht aus ungefähr 20 unabhängigen Repositorien, die alle unter der [ChurchApps GitHub-Organisation](https://github.com/ChurchApps) veröffentlicht sind. Diese Seite bietet ein vollständiges Verzeichnis aller Projekte, geordnet nach Kategorie, mit ihren Frameworks, Ports und Beziehungen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie die [Voraussetzungen](./prerequisites) für die Projektkategorie, mit der Sie arbeiten möchten

</div>

## Backend-APIs

Alle APIs sind mit Node.js, Express und TypeScript erstellt und werden über Serverless Framework zu AWS Lambda bereitgestellt.

| Projekt | Zweck | Dev Port | Datenbank |
|---------|-------|----------|-----------|
| **[Api](https://github.com/ChurchApps/Api)** | Kernmodular-Monolith mit Mitgliedschaft, Anwesenheit, Inhalt, Spenden, Messaging und Aufgaben | 8084 | Separate MySQL-Datenbank pro Modul (6 insgesamt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church-Backend | -- | Einzelne `lessons` MySQL-Datenbank |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | KI-Abfrage-Tool powered by OpenAI | -- | -- |

:::info
Das Kern-Projekt **Api** ist ein modularer Monolith. Jedes Modul (Mitgliedschaft, Anwesenheit, Inhalt, Spenden, Messaging, Aufgaben) hat seine eigene Datenbank und ist über einen Subpath wie `/membership` oder `/giving` zugänglich. In der Produktion werden diese als separate Lambda-Funktionen hinter API Gateway verfügbar gemacht.
:::

## Web-Apps

| Projekt | Framework | Dev Port | Zweck |
|---------|-----------|----------|--------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Kirchen-Verwaltungs-Dashboard |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Öffentliche Kirchen-Mitglieder-App |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church-Frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Datenimport/-export-Dienstprogramm |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Statische Kirchen-Broschüren-Websites |

## Mobile-Apps

Alle mobilen Apps verwenden React Native mit Expo.

| Projekt | Zweck | Wichtige Versionen |
|---------|-------|-------------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Kirchen-Mitglieder-App für iOS und Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Check-in-Kiosk-App | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV-Unterrichtsanzeige | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Inhalts-Wiedergabe (einschließlich TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobile Fernbedienung für FreeShow | Expo |

## Desktop

| Projekt | Stack | Zweck |
|---------|-------|--------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Präsentations- und Lobpreis-Software |

## Gemeinsame Bibliotheken

Freigegebener Code wird unter dem `@churchapps`-Bereich zu npm veröffentlicht und von den oben aufgeführten Projekten als reguläre npm-Abhängigkeiten verbraucht. Alle gemeinsamen Pakete befinden sich in einem einzigen Repository -- [Packages](https://github.com/ChurchApps/Packages) -- verwaltet als Yarn-Arbeitsbereich und freigegeben mit Changesets.

| Paket | Zweck | Verwendet von |
|-------|-------|--------------|
| `@churchapps/helpers` | Basisdienstprogramme und gemeinsame TypeScript-Schnittstellen (DateHelper, ApiHelper, CurrencyHelper usw.) | Alle Projekte |
| `@churchapps/apihelper` | Express-Server-Dienstprogramme (Auth, Basis-Controller, Datenbankzugriff, AWS-Integrationen) | Alle APIs |
| `@churchapps/apphelper` | React-Komponentenbibliothek mit Subpath-Modulen für Login, Spenden, Formulare, Markdown und Website-Entwicklung | Alle Web-Apps |
| `@churchapps/content-providers` | Abstraktion von Drittanbieter-Inhaltsanbietern (Lessons.church, Planning Center, Dropbox und andere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church-Integrations-Toolkit: Webhooks, REST-Client, OAuth | Externe Integrationsentwickler |
| `@churchapps/texting` | SMS-Anbieter-Abstraktion | Api |

Siehe [Gemeinsame Bibliotheken](../shared-libraries/) für Arbeitsbereich-Setup und Release-Workflow.

## Projektbeziehungen

```
Frontend-Apps              Gemeinsame Bibliotheken    Backend-APIs
--------------             -----------------------    -----------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Alle Frontend-Apps sind abhängig von `@churchapps/helpers`. Web-Apps sind zusätzlich abhängig von `@churchapps/apphelper`-Paketen. Alle Backend-APIs sind abhängig von sowohl `@churchapps/helpers` als auch `@churchapps/apihelper`.

## Nächste Schritte

- **[Umgebungsvariablen](./environment-variables)** -- Konfigurieren Sie Ihre `.env`-Dateien, um sich mit APIs zu verbinden
- **[API Local Setup](../api/local-setup)** -- Richten Sie die Backend-API lokal ein
