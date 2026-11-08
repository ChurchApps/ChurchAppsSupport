---
title: "Entwicklerdokumentation"
description: "Finden Sie sich in den ChurchApps-Entwicklerdokumentationen zurecht: lokale Einrichtung, Anleitungen für API und Web-Apps, gemeinsame Bibliotheken, mobile Builds und Bereitstellung für die Open-Source-Projekte."
---

# Entwicklerdokumentation

<div class="article-intro">

ChurchApps ist eine Sammlung von etwa 20 Open-Source-Projekten, die zusammen eine vollständige Gemeindeverwaltungsplattform bereitstellen. Die Projekte umfassen Backend-APIs, Web-Anwendungen, mobile Apps, eine Desktop-Anwendung und gemeinsam genutzte Bibliotheken – alle geschrieben in TypeScript. Dieser Bereich enthält alles, was Sie benötigen, um eine lokale Entwicklungsumgebung einzurichten und mit dem Mitwirken zu beginnen.

</div>

## Architektur im Überblick

Die Projekte sind **eigenständige Repositories** (kein Monorepo). Gemeinsamer Code wird unter dem Scope `@churchapps/*` auf npm veröffentlicht und als normale Abhängigkeit eingebunden. Das bedeutet, dass Sie an einem einzelnen Projekt arbeiten können, ohne das gesamte Ökosystem zu klonen.

Wichtige Merkmale:

- **Sprache:** durchgehend TypeScript
- **Backend:** Node.js / Express-APIs, bereitgestellt auf AWS Lambda über das Serverless Framework
- **Web:** React 19 (Vite und Next.js), Material-UI 7
- **Mobil:** React Native mit Expo
- **Datenbank:** MySQL 8.0, eine Datenbank pro API-Modul

## Was dieser Bereich abdeckt

- **[Einrichtung](./setup/index.md)** – Lokale Entwicklungsumgebung, Voraussetzungen und Konfiguration
  - [Voraussetzungen](./setup/prerequisites.md) – Erforderliche Werkzeuge und Software
  - [Projektübersicht](./setup/project-overview.md) – Alle Projekte auf einen Blick
  - [Umgebungsvariablen](./setup/environment-variables.md) – Konfiguration von `.env`-Dateien
- **[API](./api/index.md)** – Lokale Einrichtung der Core-API, Initialisierung der Datenbank und Modulstruktur
- **[Web-Apps](./web-apps/index.md)** – B1Admin, B1App und LessonsApp lokal ausführen
- **[Mobile Apps](./mobile/index.md)** – Erstellen von B1Checkin und anderen Expo-Apps
- **[Gemeinsame Bibliotheken](./shared-libraries/index.md)** – Arbeiten mit Helpers, ApiHelper und AppHelper
- **[Bereitstellung](./deployment/index.md)** – Bereitstellung von APIs, Web-Apps und mobilen Apps
- **[FreePlay-Inhaltsanbieter](./freeplay-content-provider.md)** – Integration Ihrer Lektionsbibliothek in FreePlay

## Community und Ressourcen

| Ressource | Link |
|----------|------|
| GitHub-Organisation | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Issue-Tracker | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-Community | [Slack beitreten](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Der schnellste Weg, um mitzuwirken, besteht darin, eine Web-App (z. B. B1Admin) auszuwählen, sie auf die gemeinsamen **Demo-APIs** auszurichten und mit Frontend-Änderungen zu beginnen. Es ist keine Datenbank- oder API-Einrichtung erforderlich.
:::
