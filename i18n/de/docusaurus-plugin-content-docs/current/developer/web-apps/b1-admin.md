---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin ist das Kirchenverwaltungs-Dashboard — eine React Single-Page-Anwendung gebaut mit Vite und Material-UI. Kirchenmitarbeiter nutzen sie zur Verwaltung von Personen, Gruppen, Anwesenheit, Spenden, Content und mehr.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie **Node.js 22+** und **Git** — siehe [Voraussetzungen](../setup/prerequisites)
- Konfigurieren Sie Ihr API-Ziel (Staging oder lokal) — siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

## Setup

### 1. Repository klonen

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Abhängigkeiten installieren

```bash
cd B1Admin
npm install
```

### 3. Umgebungsvariablen konfigurieren

```bash
cp dotenv.sample.txt .env
```

Öffnen Sie `.env` und konfigurieren Sie die API-Endpoints. Sie können sie entweder auf die Staging-API oder Ihre lokale API-Instanz zeigen lassen.

### 4. Dev-Server starten

```bash
npm start
```

Dies startet den Vite-Dev-Server. Die App wird in Ihrem Browser mit Hot-Modul-Replacement verfügbar sein.

## Wichtige Umgebungsvariablen

| Variable | Beschreibung |
|----------|-------------|
| `REACT_APP_STAGE` | Umgebungsname (z.B., `local`, `staging`, `prod`) |
| `PORT` | Dev-Server-Port (Standard: `3101`) |
| `REACT_APP_*_API` | API-Endpoint-URLs für jedes Modul |

:::info
Das `postinstall`-Skript kopiert Locale- und CSS-Dateien von `@churchapps/apphelper`. Wenn Komponenten unstyled aussehen, führen Sie `npm run postinstall` manuell aus.
:::

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm start` | Vite-Dev-Server starten |
| `npm run build` | Production-Build via Vite |
| `npm run test` | End-to-End-Tests mit Playwright ausführen |
| `npm run lint` | ESLint mit Auto-Fix ausführen |

## Tech-Stack

- **React 19** mit TypeScript
- **Vite** für Build-Tools und Dev-Server
- **Material-UI 7** für UI-Komponenten
- **React Query 5** für Server-State
- **`@churchapps/apphelper*`**-Packages für gemeinsame Komponenten

## Deployment

Production-Builds sind zu **S3 + CloudFront** deployed:

1. `npm run build` generiert statische Assets
2. Assets werden zu einem S3-Bucket synced
3. CloudFront-Invalidation wird ausgelöst, um die neue Version zu servieren

:::tip
Für detaillierte Deployment-Anweisungen, siehe [Web-App-Deployment](../deployment/web-apps)-Leitfaden.
:::
