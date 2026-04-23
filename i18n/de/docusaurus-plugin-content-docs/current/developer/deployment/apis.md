---
title: "API-Deployment"
---

# API-Deployment

<div class="article-intro">

ChurchApps APIs werden als AWS Lambda-Funktionen über das Serverless Framework deployed. Diese Seite behandelt den Build-, Deploy- und Konfigurationsverlauf für Staging- und Produktionsumgebungen.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Richten Sie die API lokal ein — siehe [Lokales API-Setup](../api/local-setup)
- Konfigurieren Sie AWS-Anmeldedaten auf Ihrer Maschine
- Stellen Sie sicher, dass Sie Zugriff auf das Ziel-AWS-Konto haben

</div>

## Build

APIs werden für Production mit einer dedizierten TypeScript-Konfiguration gebaut:

```bash
npm run build:prod
```

Dies nutzt `tsconfig.prod.json`, um das Projekt für die Lambda-Runtime zu kompilieren.

## Deploy

Deploy zu Staging:

```bash
npm run deploy-staging
```

Deploy zu Production:

```bash
npm run deploy-prod
```

## Was wird erstellt

Jedes API-Deployment erstellt oder aktualisiert die folgenden AWS Lambda-Funktionen:

| Funktion | Zweck |
|----------|---------|
| `web` | HTTP-Request-Handler via API Gateway |
| `socket` | WebSocket-Connection-Handler |
| `timer15Min` | Geplante Aufgabe, die alle 15 Minuten läuft |
| `timerMidnight` | Geplante Aufgabe, die täglich um Mitternacht läuft |

## Umgebungskonfiguration

In bereitgestellten Umgebungen wird die Konfiguration aus **AWS SSM Parameter Store** gelesen, nicht aus `.env`-Dateien. Dies hält Geheimnisse aus dem Deployment-Paket heraus und ermöglicht Konfigurationsänderungen ohne neu zu deployen.

:::warning
Speichern Sie niemals Production-Anmeldedaten im Repository. Alle sensiblen Konfigurationen sollten in AWS SSM Parameter Store gespeichert und zur Laufzeit zugegriffen werden.
:::

:::tip
Um ein Deployment zu testen, ohne Production zu beeinflussen, deployen Sie immer zuerst zu Staging mit `npm run deploy-staging` und verifizieren Sie die Änderungen, bevor Sie zu Prod promoten.
:::

## Verwandte Artikel

- **[Lokales API-Setup](../api/local-setup)** — API für Entwicklung einrichten
- **[Modulstruktur](../api/module-structure)** — Die Lambda-Funktionen-Architektur verstehen
- **[Web-App-Deployment](./web-apps)** — Frontend-Anwendungen deployen
