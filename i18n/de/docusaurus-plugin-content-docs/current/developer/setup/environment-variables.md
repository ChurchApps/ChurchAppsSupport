---
title: "Umgebungsvariablen"
---

# Umgebungsvariablen

<div class="article-intro">

Jedes ChurchApps-Projekt nutzt eine `.env`-Datei für lokale Konfiguration. Jedes Projekt enthält eine Sample-Datei, die Sie kopieren und anpassen. Diese Seite behandelt Umgebungsvariablen für APIs, Web-Apps und Mobile-Apps, einschließlich wie man zwischen Staging- und lokalen API-Zielen wählt.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie die [Voraussetzungen](./prerequisites) für Ihr Projekt
- Klonen Sie das Projekt-Repository, das Sie bearbeiten möchten
- Überprüfen Sie die [Projekt-Übersicht](./project-overview), um zu verstehen, welche API-Module Ihr Projekt benötigt

</div>

## Allgemeines Muster

1. Schauen Sie nach `dotenv.sample.txt` oder `.env.sample` im Projektroot.
2. Kopieren Sie es zu `.env`.
3. Bearbeiten Sie die Werte nach Bedarf.

```bash
# Beispiel für ein Projekt mit .env.sample
cp .env.sample .env

# Beispiel für ein Projekt mit dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Speichern Sie niemals `.env`-Dateien unter Versionskontrolle.** Sie enthalten Geheimnisse wie Datenbank-Anmeldedaten, API-Schlüssel und JWT-Geheimnisse. Alle ChurchApps-Projekte enthalten `.env` in `.gitignore`, aber überprüfen Sie immer vor dem Committen doppelt.
:::

## API-Ziel wählen

Die wichtigste Entscheidung ist, wohin Ihr Frontend für API-Aufrufe zeigt. Es gibt zwei Optionen:

### Option 1: Staging-APIs (Empfohlen für Frontend-Entwicklung)

Nutzen Sie die gemeinsame Staging-Umgebung. Kein lokales API- oder Datenbank-Setup erforderlich.

```bash
# Basis-URL-Muster
https://api.staging.churchapps.org/{module}

# Beispiel-Modul-URLs
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Option 2: Lokale API

Führen Sie das Api-Projekt auf Ihrer Maschine aus. Erfordert MySQL 8.0+ mit erstellten Datenbanken für jedes Modul. Siehe [API lokales Setup](../api/local-setup)-Leitfaden.

```bash
# Basis-URL-Muster
http://localhost:8084/{module}

# Beispiel-Modul-URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API-Umgebungsvariablen

Das Core-**Api**-Projekt (`.env.sample`) hat die meiste Konfiguration. Hier sind die Schlüssel-Variablen:

### Gemeinsame Einstellungen

| Variable | Beschreibung | Beispiel |
|----------|-------------|---------|
| `ENVIRONMENT` | Runtime-Umgebung | `dev` |
| `SERVER_PORT` | HTTP-Port für den lokalen Dev-Server | `8084` |
| `ENCRYPTION_KEY` | 192-Bit-Verschlüsselungsschlüssel für sensible Daten | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Geheimnis zum Signieren von JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Wo hochgeladene Dateien zu speichern sind (`disk` oder `s3`) | `disk` |
| `CORS_ORIGIN` | Erlaubte CORS-Ursprünge (`*` für lokale Entwicklung) | `*` |

### Datenbankverbindungen

Jedes API-Modul hat seine eigene MySQL-Datenbank und Verbindungszeichenfolge:

| Variable | Datenbank |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
Aktualisieren Sie `root:password` mit Ihren aktuellen MySQL-Anmeldedaten. Jede Datenbank muss vor Lauf der API erstellt werden. Nutzen Sie `npm run initdb`, um das Schema für alle Module zu erstellen, oder `npm run initdb:membership` für ein einzelnes Modul.
:::

### WebSocket-Einstellungen

| Variable | Beschreibung | Beispiel |
|----------|-------------|---------|
| `SOCKET_PORT` | Port für den WebSocket-Server | `8087` |
| `SOCKET_URL` | WebSocket-URL für Clients zum Verbinden | `ws://localhost:8087` |

---

## Web-App-Umgebungsvariablen

### B1Admin (React + Vite)

Sample-Datei: `.env.sample`

| Variable | Beschreibung | Beispiel (Staging) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | Umgebungsname | `demo` |
| `PORT` | Dev-Server-Port | `3101` |
| `REACT_APP_MEMBERSHIP_API` | Membership-API-URL | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | Attendance-API-URL | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | Giving-API-URL | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | Content-Lieferungs-URL | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics-ID (optional) | `UA-123456789-1` |

Für lokale API-Entwicklung, uncomment und nutzen Sie die `localhost`-Varianten:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

Sample-Datei: `.env.sample`

| Variable | Beschreibung | Beispiel (Staging) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | Membership-API-URL | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | Attendance-API-URL | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | Giving-API-URL | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | Messaging-API-URL | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | Content-API-URL | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Content-Lieferungs-URL | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps-Basis-URL | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics-ID (optional) | `UA-123456789-1` |

:::info
Next.js benötigt das `NEXT_PUBLIC_`-Präfix für jede Umgebungsvariable, die im Browser verfügbar sein muss. Server-Only-Variablen benötigen dieses Präfix nicht.
:::

### LessonsApp (Next.js)

Sample-Datei: `dotenv.sample.txt`

| Variable | Beschreibung | Beispiel (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Umgebungsstadium | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons-API-URL | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | Content-Lieferungs-URL | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps-Basis-URL | `https://staging.churchapps.org` |

---

## Mobile-App-Umgebungsvariablen

### B1Mobile (React Native / Expo)

Sample-Datei: `dotenv.sample.txt`

| Variable | Beschreibung | Beispiel (Staging) |
|----------|-------------|-------------------|
| `STAGE` | Umgebungsname | `dev` |
| `MEMBERSHIP_API` | Membership-API-URL | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | Messaging-API-URL | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | Attendance-API-URL | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | Giving-API-URL | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | Doing-API-URL | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | Content-API-URL | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | Content-Lieferungs-URL | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | Lessons-Seiten-URL | `https://staging.lessons.church` |

:::info
Mobile-Apps nutzen das `REACT_APP_`- oder `NEXT_PUBLIC_`-Präfix nicht. Umgebungsvariablen-Zugriff wird durch die Expo-Konfiguration verarbeitet.
:::

---

## Schnell-Referenz: Sample-Datei-Standorte

| Projekt | Sample-Datei |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
