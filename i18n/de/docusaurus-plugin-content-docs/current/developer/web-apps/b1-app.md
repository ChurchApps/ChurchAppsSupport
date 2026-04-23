---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App ist die öffentliche Gemeinde-Mitglieder-Anwendung gebaut mit Next.js. Sie bietet die Mitglieder-Erfahrung einschließlich Profile, Gruppen-Verzeichnisse, Live-Streaming und Spendenseiten.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie **Node.js 22+** und **Git** — siehe [Voraussetzungen](../setup/prerequisites)
- Konfigurieren Sie Ihr API-Ziel (Staging oder lokal) — siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

:::warning
B1App benötigt Node.js 22 oder später. Frühere Versionen werden nicht unterstützt.
:::

## Setup

### 1. Repository klonen

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Abhängigkeiten installieren

```bash
cd B1App
npm install
```

### 3. Umgebungsvariablen konfigurieren

```bash
cp dotenv.sample.txt .env
```

Öffnen Sie `.env` und konfigurieren Sie die `NEXT_PUBLIC_*_API`-Endpoint-URLs. Diese können auf die Staging-API oder Ihre lokale API-Instanz zeigen.

### 4. Dev-Server starten

```bash
npm run dev
```

Der Next.js-Dev-Server startet bei [http://localhost:3301](http://localhost:3301).

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm run dev` | Next.js-Dev-Server auf Port 3301 starten |
| `npm run build` | Production-Build via Next.js |
| `npm run test` | End-to-End-Tests mit Playwright ausführen |
| `npm run lint` | Next.js Lint ausführen |

## Wichtige Umgebungsvariablen

| Variable | Beschreibung |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | API-Endpoint-URLs für jedes Modul |

:::info
Das `postinstall`-Skript kopiert Locale- und CSS-Dateien von `@churchapps/apphelper`. Wenn Komponenten nach Installation von Abhängigkeiten unstyled aussehen, führen Sie `npm run postinstall` manuell aus.
:::

## Tech-Stack

- **Next.js 16** mit TypeScript
- **React 19** für UI-Komponenten
- **Material-UI 7** für Design-System
- **React Query 5** für Server-State
- **`@churchapps/apphelper*`**-Packages für gemeinsame Komponenten

## Deployment

Production-Builds sind zu **S3 + CloudFront** deployed:

1. `npm run build` generiert den optimierten Next.js-Build
2. Build-Output wird zu einem S3-Bucket synced
3. CloudFront-Invalidation wird ausgelöst, um die neue Version zu servieren

:::tip
Für detaillierte Deployment-Anweisungen, siehe [Web-App-Deployment](../deployment/web-apps)-Leitfaden.
:::
