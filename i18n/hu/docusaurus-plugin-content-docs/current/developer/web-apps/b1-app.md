---
title: "B1App"
description: "A B1App tagi webalkalmazás helyi beállítása Next.js 22+ segítségével, API-végpontjainak konfigurálása .env-ben, a fejlesztői szerver futtatása a 3301-es porton."
---

# B1App

<div class="article-intro">

B1App ist die öffentlich zugängliche Anwendung für Gemeindemitglieder, die mit Next.js entwickelt wurde. Sie bietet das Mitgliedererlebnis, einschließlich Profilen, Gruppenverzeichnissen, Live-Streaming und Spendenseiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **Node.js 22+** und **Git** -- siehe [Voraussetzungen](../setup/prerequisites.md)
- Konfigurieren Sie Ihr API-Ziel (Demo oder lokal) -- siehe [Umgebungsvariablen](../setup/environment-variables.md)

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

Öffnen Sie `.env` und konfigurieren Sie die `NEXT_PUBLIC_*_API`-Endpunkt-URLs. Diese können auf die gemeinsame Demo-API (`https://api.demo.churchapps.org`) oder auf Ihre lokale API-Instanz verweisen. Die Beispieldatei enthält möglicherweise noch ausgemusterte Staging-URLs; ersetzen Sie diese.

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Der Next.js-Entwicklungsserver wird unter [http://localhost:3301](http://localhost:3301) gestartet.

## Wichtige Befehle

| Befehl | Beschreibung |
|---------|-------------|
| `npm run dev` | Startet den Next.js-Entwicklungsserver auf Port 3301 |
| `npm run build` | Produktionsbuild über Next.js |
| `npm run test` | Führt End-to-End-Tests mit Playwright aus |
| `npm run lint` | Führt den Next.js-Linter aus |

## Wichtige Umgebungsvariablen

| Variable | Beschreibung |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | API-Endpunkt-URLs für jedes Modul |

:::info
Das Skript `postinstall` kopiert Locale- und CSS-Dateien aus `@churchapps/apphelper`. Falls Komponenten nach der Installation ungestylt aussehen, führen Sie `npm run postinstall` manuell aus.
:::

## Technologie-Stack

- **Next.js 16** mit TypeScript
- **React 19** für UI-Komponenten
- **Material-UI 7** als Design-System
- **React Query 5** für den Serverzustand
- **`@churchapps/apphelper*`**-Pakete für gemeinsam genutzte Komponenten

## Bereitstellung

Produktionsbuilds werden auf **S3 + CloudFront** bereitgestellt:

1. `npm run build` erzeugt den optimierten Next.js-Build
2. Die Build-Ausgabe wird mit einem S3-Bucket synchronisiert
3. Eine CloudFront-Invalidierung wird ausgelöst, damit die neue Version ausgeliefert wird

:::tip
Ausführliche Bereitstellungsanweisungen finden Sie im Leitfaden [Webanwendungs-Bereitstellung](../deployment/web-apps.md).
:::
