---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp ist die Lesson-Content-Management-Anwendung für [Lessons.church](https://lessons.church). Sie bietet eine Schnittstelle zum Erstellen, Organisieren und Veröffentlichen von Kirchenlehrplan-Lektionen, gebaut mit Next.js und React.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie **Node.js 22+** und **Git** — siehe [Voraussetzungen](../setup/prerequisites)
- Konfigurieren Sie Ihr API-Ziel (Staging oder lokal) — siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

:::warning
LessonsApp benötigt Node.js 22 oder später. Frühere Versionen werden nicht unterstützt.
:::

## Setup

### 1. Repository klonen

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Abhängigkeiten installieren

```bash
cd LessonsApp
npm install
```

### 3. Umgebungsvariablen konfigurieren

Kopieren Sie die Environment-Sample-Datei zu `.env` und konfigurieren Sie die API-Endpoints:

```bash
cp dotenv.sample.txt .env
```

Aktualisieren Sie die API-Endpoint-URLs, um auf die Staging-API oder Ihre lokale API-Instanz zu zeigen.

### 4. Dev-Server starten

```bash
npm run dev
```

Der Next.js-Dev-Server startet bei [http://localhost:3501](http://localhost:3501).

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm run dev` | Next.js-Dev-Server auf Port 3501 starten |
| `npm run build` | Production-Build via Next.js |

## Tech-Stack

- **Next.js 16** mit TypeScript
- **React 19** für UI-Komponenten
- **`@churchapps/apphelper*`**-Packages für gemeinsame Komponenten

:::info
LessonsApp kommuniziert mit dem **LessonsApi**-Backend, das eine separate API vom Main-ChurchApps-Api ist. Stellen Sie sicher, dass Ihre Umgebung mit dem korrekten Lessons-API-Endpoint konfiguriert ist.
:::

## Deployment

Production-Builds sind zu **S3 + CloudFront** deployed:

1. `npm run build` generiert den optimierten Next.js-Build
2. Build-Output wird zu einem S3-Bucket synced
3. CloudFront-Invalidation wird ausgelöst, um die neue Version zu servieren

:::tip
Für detaillierte Deployment-Anweisungen, siehe [Web-App-Deployment](../deployment/web-apps)-Leitfaden.
:::
