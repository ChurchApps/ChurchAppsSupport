---
title: "API-Deployment"
---

# API-Deployment

<div class="article-intro">

ChurchApps-APIs werden als AWS-Lambda-Funktionen mit dem Serverless Framework bereitgestellt. Diese Seite beschreibt den Ablauf von Build, Deployment und Konfiguration für die Demo- und die Produktionsumgebung.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die API lokal ein – siehe [Lokale API-Einrichtung](../api/local-setup)
- Konfigurieren Sie AWS-Zugangsdaten auf Ihrem Rechner
- Stellen Sie sicher, dass Sie Zugriff auf das Ziel-AWS-Konto haben

</div>

## Build

APIs werden für die Produktion mit einer eigenen TypeScript-Konfiguration erstellt:

```bash
npm run build:prod
```

Dies verwendet `tsconfig.prod.json`, um das Projekt für die Lambda-Laufzeitumgebung zu kompilieren.

## Deployment

Deployment in die Demo-Umgebung:

```bash
npm run deploy-demo
```

Deployment in die Produktion:

```bash
npm run deploy-prod
```

In der Praxis wird die API über GitHub Actions bereitgestellt: **Deploy Demo** läuft bei jedem Push auf `main`, und **Deploy Prod** wird manuell gestartet (Workflow-Dispatch). Eine Staging-Umgebung gibt es nicht mehr.

## Datenbankmigrationen

**Deploy Prod** wendet ausstehende Datenbankmigrationen als Teil des Deployments an. Die Produktionsdatenbanken akzeptieren Verbindungen nur aus dem Inneren der VPC. Deshalb ruft der Workflow direkt nach `serverless deploy` die Lambda-Funktion `migrate` (`api-Prod-migrate`) auf. Diese führt alle ausstehenden Migrationen jedes Moduls aus und liefert `{ ok, environment, modules }` zurück. Schlägt ein Modul fehl oder wird es abgelehnt (etwa bei einer Datenbank ohne Migrationsverlauf), schlägt der Job fehl, damit das Schema nie hinter dem Code zurückbleibt. **Rollback Prod** setzt nur den Lambda-Code zurück; Migrationen bleiben angewendet. Halten Sie Migrationen daher additiv. Wie Sie den Status prüfen oder Migrationen manuell ausführen, finden Sie unter [Serververwaltung – Datenbankmigrationen](../server-admin#database-migrations).

## Was erstellt wird

Jedes API-Deployment erstellt oder aktualisiert die folgenden AWS-Lambda-Funktionen:

| Funktion | Zweck |
|----------|---------|
| `web` | HTTP-Anfragehandler über API Gateway |
| `socket` | Handler für WebSocket-Verbindungen |
| `timer15Min` | Geplante Aufgabe, die alle 30 Minuten läuft (der Name ist historisch bedingt) |
| `timerMidnight` | Geplante Aufgabe, die täglich um Mitternacht läuft |
| `migrate` | Wendet ausstehende Datenbankmigrationen an; wird vom Workflow Deploy Prod aufgerufen |

## Umgebungskonfiguration

In bereitgestellten Umgebungen wird die Konfiguration aus dem **AWS Systems Manager Parameter Store (SSM)** gelesen und nicht aus `.env`-Dateien. So bleiben Geheimnisse aus dem Deployment-Paket heraus, und Konfigurationsänderungen sind möglich, ohne neu zu deployen.

:::warning
Speichern Sie niemals Produktionszugangsdaten im Repository. Alle sensiblen Konfigurationen gehören in den AWS Systems Manager Parameter Store und werden zur Laufzeit abgerufen.
:::

:::tip
Jeder Merge in `main` wird zuerst in die Demo-Umgebung deployt. Prüfen Sie Ihre Änderung dort (zum Beispiel auf [demo.b1.church](https://demo.b1.church)), bevor Sie Deploy Prod ausführen.
:::

## Verwandte Artikel

- **[Lokale API-Einrichtung](../api/local-setup)** – Einrichtung der API für die Entwicklung
- **[Modulstruktur](../api/module-structure)** – Verständnis der Architektur der Lambda-Funktionen
- **[Deployment der Web-Apps](./web-apps)** – Bereitstellung der Frontend-Anwendungen
