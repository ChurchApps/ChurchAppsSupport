---
title: "Projektübersicht"
---

# Projektübersicht

ChurchApps besteht aus etwa 20 unabhängigen Repositories, jeweils unter der ChurchApps GitHub-Organisation veröffentlicht. Diese Seite bietet eine komplette Bestandsaufnahme aller Projekte nach Kategorie, zusammen mit ihren Frameworks, Ports und Beziehungen.

## Backend-APIs

Alle APIs werden mit Node.js, Express und TypeScript erstellt und auf AWS Lambda über das Serverless Framework bereitgestellt.

| Projekt | Zweck | Dev-Port | Datenbank |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Kern-Monolith für Membership, Attendance, Content, Giving, Messaging und Doing | 8084 | Separate MySQL-DB pro Modul (6 gesamt) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church Backend | -- | Einzelne `lessons` MySQL-DB |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | KI-Abfrage-Tool mit OpenAI | -- | -- |

:::info
Die Kern-**Api** ist ein modulares Monolith. Jedes Modul hat seine eigene Datenbank und ist unter `/membership` oder `/giving` zugänglich.
:::

## Web-Apps

| Projekt | Framework | Dev-Port | Zweck |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Kirchen-Admin-Dashboard |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Öffentlich zugängliche Kirchen-Member-App |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church Frontend |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Daten-Import/Export-Hilfsprogramm |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Statische Kirchen-Broschüren-Websites |

## Mobile-Apps

Alle Mobile-Apps verwenden React Native mit Expo.

| Projekt | Zweck | Versionen |
|---------|---------|-----------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Kirchen-Member-App für iOS und Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Check-in-Kiosk-App | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV Lektions-Anzeige | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Inhalts-Wiedergabe | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Mobile Fernbedienung | Expo |

## Desktop

| Projekt | Stack | Zweck |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Präsentations- und Worship-Software |

## Freigegebene Bibliotheken

Gemeinsamer Code wird auf npm unter dem Scope `@churchapps` veröffentlicht und von den obigen Projekten als reguläre npm-Abhängigkeiten verwendet.

| Paket | Zweck | Verwendet von |
|---------|---------|---------|
| `@churchapps/helpers` | Basis-Hilfsfunktionen und geteilte TypeScript-Schnittstellen | Alle Projekte |
| `@churchapps/apihelper` | Express-Server-Hilfsfunktionen | Alle APIs |
| `@churchapps/apphelper` | React-Komponentenbibliothek | Alle Web-Apps |
| `@churchapps/content-providers` | Content-Provider-Abstraktion | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church Integration Toolkit | Externe Entwickler |
| `@churchapps/texting` | SMS-Provider-Abstraktion | Api |

## Projekt-Beziehungen

```
Frontend-Apps              Freigegebene Bibliotheken    Backend-APIs
--------------             ----------------              ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄─────── Api
LessonsApp   ──────┼──►    @churchapps/apphelper        LessonsApi
B1Mobile     ──────┤                                     AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄──────┘
```

Alle Frontend-Apps hängen von `@churchapps/helpers` ab. Web-Apps hängen zusätzlich von `@churchapps/apphelper` ab.
