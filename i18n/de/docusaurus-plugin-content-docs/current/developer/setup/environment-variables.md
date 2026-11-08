---
title: "Umgebungsvariablen"
description: "Richten Sie .env-Dateien für ChurchApps-Projekte ein, wählen Sie die gemeinsame Demo-API oder eine lokale API und tragen Sie Variablen für B1 Admin, B1.church, B1 Checkin und weitere ein."
---

# Umgebungsvariablen

<div class="article-intro">

Jedes ChurchApps-Projekt verwendet eine `.env`-Datei für die lokale Konfiguration. Jedes Projekt enthält eine Beispieldatei, die Sie kopieren und anpassen. Diese Seite beschreibt die Umgebungsvariablen für APIs, Web-Apps und mobile Apps, einschließlich der Auswahl zwischen dem Demo- und dem lokalen API-Ziel.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie die [Voraussetzungen](./prerequisites.md) für Ihr Projekt
- Klonen Sie das Projekt-Repository, mit dem Sie arbeiten möchten
- Lesen Sie die [Projektübersicht](./project-overview.md), um zu verstehen, welche API-Module Ihr Projekt benötigt

</div>

## Allgemeines Vorgehen

1. Suchen Sie im Projektstammverzeichnis nach `dotenv.sample.txt` oder `.env.sample`.
2. Kopieren Sie die Datei nach `.env`.
3. Passen Sie die Werte bei Bedarf an.

```bash
# Beispiel für ein Projekt mit .env.sample
cp .env.sample .env

# Beispiel für ein Projekt mit dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Committen Sie `.env`-Dateien niemals in die Versionsverwaltung.** Sie enthalten Geheimnisse wie Datenbank-Zugangsdaten, API-Schlüssel und JWT-Secrets. Alle ChurchApps-Projekte nehmen `.env` in die `.gitignore` auf, prüfen Sie dennoch vor jedem Commit noch einmal.
:::

## Auswahl des API-Ziels

Die wichtigste Entscheidung ist, wohin Ihr Frontend API-Aufrufe sendet. Es gibt zwei Optionen:

### Option 1: Demo-APIs (empfohlen für die Frontend-Entwicklung)

Verwenden Sie die gemeinsame Demo-Umgebung. Es ist keine lokale API- oder Datenbankeinrichtung nötig. Sie führt den neuesten Code aus `main` aus, und ihre Beispieldaten werden jede Nacht neu eingespielt.

```bash
# Muster der Basis-URL
https://api.demo.churchapps.org/{module}

# Beispiele für Modul-URLs
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Die Staging-Umgebung (`api.staging.churchapps.org`, `api.staging.lessons.church` und zugehörige Hosts) wurde stillgelegt. Einige Beispiel-`.env`-Dateien enthalten möglicherweise noch Staging-URLs; ersetzen Sie diese durch die Demo- oder lokalen Werte, die auf dieser Seite angegeben sind. Eine gemeinsame Nicht-Produktions-Lessons-API gibt es nicht. Wenn Sie eine benötigen, führen Sie [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokal aus (sie lauscht auf Port `8090`).
:::

### Option 2: Lokale API

Starten Sie das Api-Projekt auf Ihrem Rechner. Dafür benötigen Sie MySQL 8.0 oder neuer mit für jedes Modul angelegten Datenbanken. Siehe die Anleitung [Lokale API-Einrichtung](../api/local-setup.md).

```bash
# Muster der Basis-URL
http://localhost:8084/{module}

# Beispiele für Modul-URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API-Umgebungsvariablen

Das zentrale **Api**-Projekt (`.env.sample`) hat die umfangreichste Konfiguration. Hier sind die wichtigsten Variablen:

### Gemeinsame Einstellungen

| Variable | Beschreibung | Beispiel |
|----------|-------------|----------|
| `ENVIRONMENT` | Laufzeitumgebung | `dev` |
| `SERVER_PORT` | HTTP-Port für den lokalen Entwicklungsserver | `8084` |
| `ENCRYPTION_KEY` | 192-Bit-Verschlüsselungsschlüssel für sensible Daten | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Secret zum Signieren von JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Speicherort für hochgeladene Dateien (`disk` oder `s3`) | `disk` |
| `CORS_ORIGIN` | Erlaubte CORS-Ursprünge (`*` für die lokale Entwicklung) | `*` |

### Datenbankverbindung

Eine einzelne Basis-URL verbindet die API mit MySQL. Die API leitet daraus eine Datenbank pro Modul ab (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Variable | Beispiel |
|----------|----------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Ersetzen Sie `root:password` durch Ihre tatsächlichen MySQL-Zugangsdaten. Jede Modul-Datenbank muss vor dem Start der API existieren. Verwenden Sie `npm run initdb`, um das Schema für alle Module anzulegen, oder `npm run initdb:membership` für ein einzelnes Modul.
:::

### WebSocket-Einstellungen

| Variable | Beschreibung | Beispiel |
|----------|-------------|----------|
| `SOCKET_PORT` | Port für den WebSocket-Server | `8087` |
| `SOCKET_URL` | WebSocket-URL, mit der sich Clients verbinden | `ws://localhost:8087` |

---

## Umgebungsvariablen der Web-Apps

### B1Admin (React + Vite)

Beispieldatei: `.env.sample`

| Variable | Beschreibung | Beispiel (Demo) |
|----------|-------------|-----------------|
| `REACT_APP_STAGE` | Name der Umgebung | `demo` |
| `PORT` | Port des Entwicklungsservers | `3101` |
| `REACT_APP_API_BASE` | Eine einzelne Basis-URL für alle ChurchApps-APIs (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` werden automatisch angehängt) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL der Inhaltsauslieferung | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google-Analytics-ID (optional) | `UA-123456789-1` |

Für die Entwicklung mit einer lokalen API richten Sie die Basis-URL auf Ihren lokalen Stack:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Beispieldatei: `.env.sample`

| Variable | Beschreibung | Beispiel (Demo) |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_API_BASE` | Eine einzelne Basis-URL für alle ChurchApps-APIs (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` werden automatisch angehängt) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL der Inhaltsauslieferung | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google-Analytics-ID (optional) | `UA-123456789-1` |

:::info
Next.js erfordert das Präfix `NEXT_PUBLIC_` für jede Umgebungsvariable, die im Browser verfügbar sein soll. Variablen, die nur auf dem Server benötigt werden, brauchen dieses Präfix nicht.
:::

### LessonsApp (Next.js)

Beispieldatei: `dotenv.sample.txt`

| Variable | Beschreibung | Beispiel (lokale LessonsApi) |
|----------|-------------|------------------------------|
| `STAGE` | Stufe der Umgebung (leer lassen oder `dev` für die lokale Entwicklung) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL der Lessons-API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL der Inhaltsauslieferung | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Basis der ChurchApps-API für die Anmeldung (wird nur berücksichtigt, wenn `STAGE` nicht gesetzt oder `dev` ist) | `https://api.demo.churchapps.org` |

---

## Umgebungsvariablen der mobilen App

### B1Checkin (React Native / Expo)

Beispieldatei: `dotenv.sample.txt`

| Variable | Beschreibung | Beispiel |
|----------|-------------|----------|
| `EXPO_PUBLIC_STAGE` | Legt fest, mit welchem API-Satz sich die App verbindet: `dev` (lokale API unter `http://127.0.0.1:8084`), `staging` oder `prod` (Standard, wenn nicht gesetzt) | `dev` |

B1Checkin verwendet nur die API-Module Membership und Attendance sowie die URL der Inhaltsauslieferung. Ihre Adressen für jede Stufe sind in `src/helpers/EnvironmentHelper.ts` festgelegt.

:::info
Expo fügt nur Variablen mit dem Präfix `EXPO_PUBLIC_` in das App-Bundle ein. Starten Sie den Entwicklungsserver nach einer Änderung an `.env` mit `yarn start --reset-cache` neu.
:::

---

## Kurzübersicht: Speicherorte der Beispieldateien

| Projekt | Beispieldatei |
|---------|---------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
