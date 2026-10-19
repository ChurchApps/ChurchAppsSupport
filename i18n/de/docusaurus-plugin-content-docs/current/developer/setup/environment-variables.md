---
title: "Umgebungsvariablen"
---

# Umgebungsvariablen

<div class="article-intro">

Jedes ChurchApps-Projekt verwendet für die lokale Konfiguration eine `.env`-Datei. Jedes Projekt enthält eine Beispieldatei, die Sie kopieren und anpassen. Diese Seite beschreibt die Umgebungsvariablen für APIs, Web-Apps und mobile Apps, einschließlich der Wahl zwischen der Demo-API und einer lokalen API.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie die [Voraussetzungen](./prerequisites) für Ihr Projekt
- Klonen Sie das Projekt-Repository, an dem Sie arbeiten möchten
- Lesen Sie die [Projektübersicht](./project-overview), um zu verstehen, welche API-Module Ihr Projekt benötigt

</div>

## Allgemeines Vorgehen

1. Suchen Sie im Projektstammverzeichnis nach `dotenv.sample.txt` oder `.env.sample`.
2. Kopieren Sie die Datei nach `.env`.
3. Passen Sie die Werte bei Bedarf an.

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Committen Sie `.env`-Dateien niemals in die Versionsverwaltung.** Sie enthalten Geheimnisse wie Datenbank-Zugangsdaten, API-Schlüssel und JWT-Secrets. Alle ChurchApps-Projekte nehmen `.env` in die `.gitignore` auf. Prüfen Sie trotzdem vor jedem Commit noch einmal.
:::

## Die API-Zieleinstellung wählen

Die wichtigste Entscheidung ist, wohin Ihr Frontend API-Aufrufe sendet. Es gibt zwei Möglichkeiten:

### Option 1: Demo-APIs (empfohlen für die Frontend-Entwicklung)

Verwenden Sie die gemeinsame Demo-Umgebung. Es ist weder eine lokale API noch eine Datenbank nötig. Sie führt den neuesten Code aus `main` aus, und ihre Beispieldaten werden jede Nacht neu geladen.

```bash
# Base URL pattern
https://api.demo.churchapps.org/{module}

# Example module URLs
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Die Staging-Umgebung (`api.staging.churchapps.org`, `api.staging.lessons.church` und verwandte Hosts) wurde stillgelegt. Manche Beispiel-`.env`-Dateien enthalten noch Staging-URLs. Ersetzen Sie sie durch die Demo- oder lokalen Werte aus dieser Seite. Eine gemeinsame Nicht-Produktiv-LessonsApi gibt es nicht. Starten Sie bei Bedarf [LessonsApi](https://github.com/ChurchApps/LessonsApi) lokal (sie lauscht auf Port `8090`).
:::

### Option 2: Lokale API

Starten Sie das Api-Projekt auf Ihrem Rechner. Dafür benötigen Sie MySQL 8.0 oder neuer mit je einer Datenbank pro Modul. Siehe die Anleitung [Lokale API einrichten](../api/local-setup).

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API-Umgebungsvariablen

Das zentrale Projekt **Api** (`.env.sample`) hat die meisten Einstellungen. Hier sind die wichtigsten Variablen:

### Gemeinsame Einstellungen

| Variable | Beschreibung | Beispiel |
|----------|-------------|---------|
| `ENVIRONMENT` | Laufzeitumgebung | `dev` |
| `SERVER_PORT` | HTTP-Port des lokalen Entwicklungsservers | `8084` |
| `ENCRYPTION_KEY` | 192-Bit-Verschlüsselungsschlüssel für sensible Daten | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Geheimnis zum Signieren von JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Speicherort für hochgeladene Dateien (`disk` oder `s3`) | `disk` |
| `CORS_ORIGIN` | Erlaubte CORS-Ursprünge (`*` für die lokale Entwicklung) | `*` |

### Datenbankverbindung

Eine einzige Basis-URL verbindet die API mit MySQL. Die API leitet daraus je eine Datenbank pro Modul ab (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`).

| Variable | Beispiel |
|----------|----------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Ersetzen Sie `root:password` durch Ihre tatsächlichen MySQL-Zugangsdaten. Jede Modul-Datenbank muss vor dem Start der API existieren. Verwenden Sie `npm run initdb`, um das Schema für alle Module anzulegen, oder `npm run initdb:membership` für ein einzelnes Modul.
:::

### WebSocket-Einstellungen

| Variable | Beschreibung | Beispiel |
|----------|-------------|---------|
| `SOCKET_PORT` | Port für den WebSocket-Server | `8087` |
| `SOCKET_URL` | WebSocket-URL, mit der sich Clients verbinden | `ws://localhost:8087` |

---

## Umgebungsvariablen der Web-Apps

### B1Admin (React + Vite)

Beispieldatei: `.env.sample`

| Variable | Beschreibung | Beispiel (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Name der Umgebung | `demo` |
| `PORT` | Port des Entwicklungsservers | `3101` |
| `REACT_APP_API_BASE` | Eine gemeinsame Basis-URL für alle ChurchApps-APIs (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing` und `/reporting` werden automatisch angehängt) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL der Inhaltsauslieferung | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google-Analytics-ID (optional) | `UA-123456789-1` |

Für die Entwicklung mit einer lokalen API richten Sie die Basis-URL auf Ihren lokalen Stack:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Beispieldatei: `.env.sample`

| Variable | Beschreibung | Beispiel (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | Eine gemeinsame Basis-URL für alle ChurchApps-APIs (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing` und `/reporting` werden automatisch angehängt) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL der Inhaltsauslieferung | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google-Analytics-ID (optional) | `UA-123456789-1` |

:::info
Next.js benötigt das Präfix `NEXT_PUBLIC_` für jede Umgebungsvariable, die im Browser verfügbar sein muss. Variablen, die nur auf dem Server gebraucht werden, benötigen dieses Präfix nicht.
:::

### LessonsApp (Next.js)

Beispieldatei: `dotenv.sample.txt`

| Variable | Beschreibung | Beispiel (lokale LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | Stufe der Umgebung (leer lassen oder `dev` für die lokale Entwicklung) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL der Lessons-API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL der Inhaltsauslieferung | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Basis-URL der ChurchApps-API für die Anmeldung (wird nur berücksichtigt, wenn `STAGE` leer oder `dev` ist) | `https://api.demo.churchapps.org` |

---

## Umgebungsvariablen der mobilen Apps

### B1Mobile (React Native / Expo)

Beispieldatei: `dotenv.sample.txt`

| Variable | Beschreibung | Beispiel (Demo) |
|----------|-------------|----------------|
| `STAGE` | Name der Umgebung | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Je eine URL pro ChurchApps-API-Modul (ohne Angabe wird jeweils die Produktivumgebung verwendet) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons-API (eigener Host; eine gemeinsame Nicht-Produktiv-Version gibt es nicht) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL der Inhaltsauslieferung | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL der Lessons-Website | `https://lessons.church` |

:::info
Mobile Apps verwenden nicht das Präfix `REACT_APP_` oder `NEXT_PUBLIC_`. Der Zugriff auf Umgebungsvariablen erfolgt über die Expo-Konfiguration.
:::

---

## Kurzübersicht: Speicherorte der Beispieldateien

| Projekt | Beispieldatei |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
