---
title: "Entwickler-Dokumentation"
---

# Entwickler-Dokumentation

<div class="article-intro">

ChurchApps ist eine Sammlung von etwa 20 Open-Source-Projekten, die zusammen eine vollständige Kirchenverwaltungsplattform bieten. Die Projekte umfassen Backend-APIs, Web-Anwendungen, Mobile-Apps, eine Desktop-Anwendung und gemeinsame Biblioteken — alle in TypeScript geschrieben. Dieser Abschnitt bietet alles, was Sie benötigen, um eine lokale Entwicklungsumgebung einzurichten und mit dem Beitragen zu beginnen.

</div>

## Architektur auf einen Blick

Die Projekte sind **unabhängige Repositories** (kein Monorepo). Gemeinsamer Code wird zu npm unter dem `@churchapps/*`-Scope veröffentlicht und als reguläre Abhängigkeiten konsumiert. Das bedeutet, dass Sie an einem einzelnen Projekt arbeiten können, ohne das gesamte Ökosystem zu klonen.

Wichtige Merkmale:

- **Sprache:** TypeScript durchgehend
- **Backend:** Node.js / Express APIs, deployed zu AWS Lambda via Serverless Framework
- **Web:** React 19 (Vite und Next.js), Material-UI 7
- **Mobile:** React Native mit Expo
- **Datenbank:** MySQL 8.0, eine Datenbank pro API-Modul

## Was dieser Abschnitt behandelt

- **[Setup](setup/)** — Lokale Entwicklungsumgebung, Voraussetzungen und Konfiguration
  - [Voraussetzungen](setup/prerequisites) — Erforderliche Werkzeuge und Software
  - [Projekt-Übersicht](setup/project-overview) — Alle Projekte auf einen Blick
  - [Umgebungsvariablen](setup/environment-variables) — `.env`-Dateien konfigurieren
- **[API](api/)** — Core API lokales Setup, Datenbank-Initialisierung und Modulstruktur
- **[Web-Apps](web-apps/)** — B1Admin, B1App und LessonsApp lokal ausführen
- **[Mobile-Apps](mobile/)** — B1Mobile und andere Expo-Apps bauen
- **[Gemeinsame Biblioteken](shared-libraries/)** — Arbeiten mit Helpers, ApiHelper und AppHelper
- **[Deployment](deployment/)** — APIs, Web-Apps und Mobile-Apps deployen

## Gemeinschaft und Ressourcen

| Ressource | Link |
|----------|------|
| GitHub-Organisation | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Issue-Tracker | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack-Gemeinschaft | [Slack beitreten](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Der schnellste Weg zum Beitragen ist, eine Web-App (wie B1Admin) auszuwählen, sie auf die **Staging-APIs** zu zeigen und mit Frontend-Änderungen zu beginnen. Kein Datenbank- oder API-Setup erforderlich.
:::
