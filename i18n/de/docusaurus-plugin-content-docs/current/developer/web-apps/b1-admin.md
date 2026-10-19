---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin ist das Verwaltungs-Dashboard der Kirche -- eine React-Single-Page-Anwendung, die mit Vite und Material-UI erstellt wurde. Kirchenmitarbeiter nutzen sie, um Personen, Gruppen, Anwesenheit, Spenden, Inhalte und mehr zu verwalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js 22+** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites)
- Konfigurieren Sie Ihr API-Ziel (Demo oder lokal) -- siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

## Einrichtung

### 1. Das Repository klonen

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

Öffnen Sie `.env` und konfigurieren Sie die API-Endpunkte. Sie können sie auf die gemeinsame Demo-API (`https://api.demo.churchapps.org`) oder auf Ihre lokale API-Instanz richten. Die Beispieldatei enthält möglicherweise noch ausgemusterte Staging-URLs; ersetzen Sie diese.

### 4. Den Entwicklungsserver starten

```bash
npm start
```

Dadurch wird der Vite-Entwicklungsserver gestartet. Die App ist anschließend in Ihrem Browser verfügbar, mit aktiviertem Hot Module Replacement.

## Wichtige Umgebungsvariablen

| Variable | Beschreibung |
|----------|-------------|
| `REACT_APP_STAGE` | Name der Umgebung (z. B. `demo` wie in der Beispieldatei, `prod` oder `selfhost`) |
| `PORT` | Port des Entwicklungsservers (Standard: `3101`) |
| `REACT_APP_*_API` | API-Endpunkt-URLs für jedes Modul |

:::info
Das Skript `postinstall` kopiert Sprach- und CSS-Dateien aus `@churchapps/apphelper`. Wenn Komponenten ohne Gestaltung erscheinen, führen Sie `npm run postinstall` manuell aus.
:::

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm start` | Vite-Entwicklungsserver starten |
| `npm run build` | Produktionsbuild über Vite |
| `npm run test` | End-to-End-Tests mit Playwright ausführen |
| `npm run lint` | ESLint mit automatischer Korrektur ausführen |

## Technologie-Stack

- **React 19** mit TypeScript
- **Vite** für Build-Werkzeuge und Entwicklungsserver
- **Material-UI 7** für UI-Komponenten
- **React Query 5** für den Serverzustand
- **`@churchapps/apphelper*`**-Pakete für gemeinsam genutzte Komponenten

## Bereitstellung

Produktionsbuilds werden auf **S3 + CloudFront** bereitgestellt:

1. `npm run build` erzeugt statische Assets
2. Die Assets werden in einen S3-Bucket synchronisiert
3. Eine CloudFront-Invalidierung wird ausgelöst, damit die neue Version ausgeliefert wird

:::tip
Ausführliche Bereitstellungsanweisungen finden Sie im Leitfaden [Web-App-Bereitstellung](../deployment/web-apps).
:::
