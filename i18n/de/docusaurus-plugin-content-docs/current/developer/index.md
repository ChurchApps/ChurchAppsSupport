---
title: "Entwicklerdokumentation"
---

# Entwicklerdokumentation

<div class="article-intro">

ChurchApps ist eine Sammlung von etwa 20 Open-Source-Projekten, die zusammen eine vollständige Plattform für die Kirchenverwaltung bilden. Die Projekte umfassen Backend-APIs, Web-Anwendungen, mobile Apps, eine Desktop-Anwendung und gemeinsame Bibliotheken, alles in TypeScript geschrieben. Dieser Bereich bietet alles, was Sie brauchen, um eine lokale Entwicklungsumgebung einzurichten und mitzuarbeiten.

</div>

## Architektur auf einen Blick

Die Projekte sind **unabhängige Repositories** (kein Monorepo). Gemeinsamer Code wird unter dem Scope `@churchapps/*` auf npm veröffentlicht und als gewöhnliche Abhängigkeit eingebunden. Das bedeutet, dass Sie an einem einzelnen Projekt arbeiten können, ohne das gesamte Ökosystem zu klonen.

Wichtige Merkmale:

- **Sprache:** durchgängig TypeScript
- **Backend:** Node.js / Express-APIs, über das Serverless Framework auf AWS Lambda bereitgestellt
- **Web:** React 19 (Vite und Next.js), Material-UI 7
- **Mobil:** React Native mit Expo
- **Datenbank:** MySQL 8.0, eine Datenbank pro API-Modul

## Was dieser Bereich behandelt

- **[Einrichtung](setup/)**: Lokale Entwicklungsumgebung, Voraussetzungen und Konfiguration
  - [Voraussetzungen](setup/prerequisites): Benötigte Werkzeuge und Software
  - [Projektübersicht](setup/project-overview): Alle Projekte auf einen Blick
  - [Umgebungsvariablen](setup/environment-variables): Konfiguration der `.env`-Dateien
- **[API](api/)**: Lokale Einrichtung der Kern-API, Initialisierung der Datenbank und Modulstruktur
- **[Web-Apps](web-apps/)**: B1Admin, B1App und LessonsApp lokal ausführen
- **[Mobile Apps](mobile/)**: B1Mobile und andere Expo-Apps erstellen
- **[Gemeinsame Bibliotheken](shared-libraries/)**: Mit Helpers, ApiHelper und AppHelper arbeiten
- **[Bereitstellung](deployment/)**: APIs, Web-Apps und mobile Apps bereitstellen
- **[FreePlay-Inhaltsanbieter](freeplay-content-provider)**: Ihre Lektionsbibliothek in FreePlay einbinden

## Community und Ressourcen

| Ressource | Link |
|----------|------|
| GitHub-Organisation | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Issue-Tracker | [ChurchAppsSupport-Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-Community | [Slack beitreten](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Der schnellste Weg, einen Beitrag zu leisten, ist, eine Web-App wie B1Admin auszuwählen, sie auf die gemeinsamen **Demo-APIs** zu richten und mit Änderungen am Frontend zu beginnen. Eine Datenbank oder eine API-Einrichtung ist dafür nicht nötig.
:::
