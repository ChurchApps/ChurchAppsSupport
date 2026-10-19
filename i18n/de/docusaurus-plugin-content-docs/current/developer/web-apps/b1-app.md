---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App ist die öffentlich zugängliche Mitglieder-Anwendung der Kirche, entwickelt mit Next.js. Sie bietet das Mitgliedererlebnis mit Profilen, Gruppenverzeichnissen, Live-Streaming und Spendenseiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js 22+** und **Git** — siehe [Voraussetzungen](../setup/prerequisites)
- Konfigurieren Sie Ihr API-Ziel (Demo oder lokal) — siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

:::warning
B1App erfordert Node.js 22 oder neuer. Frühere Versionen werden nicht unterstützt.
:::

## Einrichtung

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

Öffnen Sie `.env` und konfigurieren Sie die URLs der Endpunkte `NEXT_PUBLIC_*_API`. Diese können auf die gemeinsame Demo-API (`https://api.demo.churchapps.org`) oder auf Ihre lokale API-Instanz zeigen. Die Beispieldatei enthält unter Umständen noch eingestellte Staging-URLs; ersetzen Sie diese.

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Der Next.js-Entwicklungsserver startet unter [http://localhost:3301](http://localhost:3301).

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm run dev` | Next.js-Entwicklungsserver auf Port 3301 starten |
| `npm run build` | Produktionsbuild über Next.js |
| `npm run test` | End-to-End-Tests mit Playwright ausführen |
| `npm run lint` | Next.js-Lint ausführen |

## Wichtige Umgebungsvariablen

| Variable | Beschreibung |
|----------|----------|
| `NEXT_PUBLIC_*_API` | API-Endpunkt-URLs für jedes Modul |

:::info
Das Skript `postinstall` kopiert Locale- und CSS-Dateien aus `@churchapps/apphelper`. Wirken Komponenten nach der Installation unformatiert, führen Sie `npm run postinstall` manuell aus.
:::

## Technologie-Stack

- **Next.js 16** mit TypeScript
- **React 19** für UI-Komponenten
- **Material-UI 7** als Designsystem
- **React Query 5** für den Serverstatus
- **`@churchapps/apphelper*`**-Pakete für gemeinsam genutzte Komponenten

## Bereitstellung

Produktionsbuilds werden auf **S3 + CloudFront** bereitgestellt:

1. `npm run build` erzeugt den optimierten Next.js-Build
2. Die Build-Ausgabe wird in einen S3-Bucket synchronisiert
3. Eine CloudFront-Invalidierung wird ausgelöst, damit die neue Version ausgeliefert wird

:::tip
Ausführliche Anweisungen zur Bereitstellung finden Sie im Leitfaden [Bereitstellung der Web-Apps](../deployment/web-apps).
:::
