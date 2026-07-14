---
title: "Self-Hosting mit Docker"
---

# Self-Hosting mit Docker

<div class="article-intro">

Führen Sie Ihre eigene private Instanz von B1 Admin, dem B1-Mitgliederportal, der API und einer MySQL-Datenbank auf jeder Maschine mit Docker aus – einem Home Server, einer $5 VPS oder einer On-Prem-Box. Ein `docker compose up` bauen und startet alles.

</div>

## Schnellstart

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

Der erste Lauf dauert 10–20 Minuten: er bauen B1Admin aus Ihrem Clone und bauen die API und B1App direkt von ihren GitHub-Repositories. Nachfolgende Starts sind Sekunden.

Wenn alle vier Services aktiv sind:

1. Öffnen Sie **http://localhost:3101** (B1 Admin)
2. Klicken Sie **Registrieren** und erstellen Sie Ihr Konto
3. Folgen Sie den In-App-Eingabeaufforderungen, um Ihre erste Kirche zu erstellen

| Service | URL |
|---------|-----|
| B1Admin (Personal/Admin) | http://localhost:3101 |
| B1App (Mitgliederportal / Website) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | Nur intern (`mysql:3306`) |

## Konfiguration

Alle Einstellungen befinden sich in einer `.env` Datei neben `docker-compose.yml`. Jede Variable hat einen funktionierenden Standard für Localhost.

```bash
# .env — alles ist optional
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # genau 32 Zeichen

# Public URLs (ändern Sie diese, wenn Sie über Localhost hinaus exponieren)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084
```

Vor echter Nutzung ändern Sie `MYSQL_ROOT_PASSWORD`, `JWT_SECRET` und `ENCRYPTION_KEY` (jede 32-Zeichen-String).
