---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp ist die Anwendung zur Verwaltung von Lektionsinhalten für [Lessons.church](https://lessons.church). Sie bietet eine Oberfläche zum Erstellen, Ordnen und Veröffentlichen kirchlicher Lehrpläne und ist mit Next.js und React entwickelt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js 22+** und **Git** – siehe [Voraussetzungen](../setup/prerequisites)
- Konfigurieren Sie Ihr API-Ziel (lokale LessonsApi) – siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

:::warning
LessonsApp erfordert Node.js 22 oder neuer. Frühere Versionen werden nicht unterstützt.
:::

## Einrichtung

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

Kopieren Sie die Beispieldatei für die Umgebung nach `.env` und konfigurieren Sie die API-Endpunkte:

```bash
cp dotenv.sample.txt .env
```

Passen Sie die API-Endpunkt-URLs so an, dass sie auf Ihre lokale LessonsApi-Instanz (`http://localhost:8090`) zeigen. Die Staging-Schnittstelle der Lessons-API wurde eingestellt. Ersetzen Sie daher alle URLs `api.staging.lessons.church`, die noch in der Beispieldatei stehen.

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Der Next.js-Entwicklungsserver startet unter [http://localhost:3501](http://localhost:3501).

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm run dev` | Next.js-Entwicklungsserver auf Port 3501 starten |
| `npm run build` | Produktionsbuild über Next.js |

## Technologie-Stack

- **Next.js 16** mit TypeScript
- **React 19** für UI-Komponenten
- **`@churchapps/apphelper*`**-Pakete für gemeinsam genutzte Komponenten

:::info
LessonsApp kommuniziert mit dem Backend **LessonsApi**, einer eigenständigen API, die getrennt von der Haupt-API von ChurchApps läuft. Stellen Sie sicher, dass Ihre Umgebung auf den richtigen Lessons-API-Endpunkt konfiguriert ist.
:::

## Deployment

Produktionsbuilds werden auf **S3 + CloudFront** bereitgestellt:

1. `npm run build` erzeugt den optimierten Next.js-Build
2. Die Build-Ausgabe wird mit einem S3-Bucket synchronisiert
3. Eine CloudFront-Invalidierung wird ausgelöst, damit die neue Version ausgeliefert wird

:::tip
Ausführliche Deployment-Anweisungen finden Sie im Leitfaden [Deployment der Web-Apps](../deployment/web-apps).
:::
