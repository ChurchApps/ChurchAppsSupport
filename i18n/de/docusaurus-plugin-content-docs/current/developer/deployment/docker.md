---
title: "Self-Hosting mit Docker"
---

# Self-Hosting mit Docker

<div class="article-intro">

Führen Sie Ihre eigene private Instanz von B1 Admin, dem B1-Mitgliederportal, der API und einer MySQL-Datenbank auf jedem Rechner mit Docker aus — einem Heimserver, einem 5-$-VPS oder einer On-Prem-Box. Ein einziges `docker compose up` baut und startet alles. Wenn Sie überhaupt keinen Server verwalten möchten, siehe [Self-Hosting auf Railway](./railway-template) für die verwaltete Alternative.

</div>

## Schnellstart

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) mit Compose v2 (in Docker Desktop enthalten)
- ~4 GB verfügbarer RAM während des anfänglichen Builds (die Webanwendungen werden aus dem Quellcode gebaut)
- Git, oder einfach nur die rohe `docker-compose.yml`-Datei

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

Der erste Durchlauf dauert 10–20 Minuten: Er baut B1Admin aus Ihrem Klon und baut die API und B1App direkt aus ihren GitHub-Repositorys. Nachfolgende Starts dauern nur Sekunden.

Wenn alle vier Dienste laufen:

1. Öffnen Sie **http://localhost:3101** (B1 Admin).
2. Klicken Sie auf **Register** und legen Sie Ihr Konto an. Das erste Konto wird automatisch zu einem Server-Administrator.
3. Folgen Sie den Eingabeaufforderungen in der App, um Ihre erste Kirche anzulegen.

Datenbankschemas werden automatisch durch die Startmigration des API-Containers erstellt — kein manuelles SQL erforderlich.

| Dienst | URL |
|---------|-----|
| B1Admin (Mitarbeiter/Admin) | http://localhost:3101 |
| B1App (Mitgliederportal / Website) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | nur intern (`mysql:3306` im Compose-Netzwerk) |

## Konfiguration

Alle Einstellungen liegen in einer `.env`-Datei neben `docker-compose.yml`. Jede Variable hat einen funktionierenden Standardwert für localhost, daher ist die Datei optional, bis Sie etwas anpassen.

```bash
# .env — everything is optional; shown with defaults
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # exactly 32 characters

# Public URLs (change these when exposing beyond localhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# Email — see the Railway guide's Email section for provider walkthroughs
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Vor dem echten Einsatz sollten Sie `MYSQL_ROOT_PASSWORD`, `JWT_SECRET` und `ENCRYPTION_KEY` ändern (eine beliebige 32-Zeichen-Zeichenkette).

:::warning
Die `*_URL`-Werte werden **zur Build-Zeit fest in die Webanwendungen eingebacken** (Standardverhalten von Vite/Next.js). Ihre Änderung in `.env` erfordert einen Rebuild, keinen bloßen Neustart:

```bash
docker compose up -d --build
```
:::

Das Ändern des MySQL-Passworts nach dem ersten Start erfordert auch die Aktualisierung des Passworts innerhalb von MySQL — der Datenträger behält die alten Zugangsdaten.

## Für das Internet freigeben

Stellen Sie einen beliebigen Reverse-Proxy davor und geben Sie jedem Dienst einen Hostnamen. Mit [Caddy](https://caddyserver.com/) sieht das so aus:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

Setzen Sie dann die URLs in `.env` und bauen Sie neu:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

Der WebSocket für Chat und Live-Benachrichtigungen teilt sich den Port der API, daher ist `SOCKET_URL` einfach die API-URL mit `wss://`.

## E-Mail, Spenden, Multi-Site und Integrationen

Diese funktionieren identisch zum Railway-Deployment — dieselben Umgebungsvariablen, gesetzt in Ihrer `.env`-Datei statt im Railway-Dashboard (die Compose-Datei reicht sie an die API durch):

- **[E-Mail / SMTP](./railway-template#1-email-highly-recommended)** — dringend empfohlen; ohne sie können Mitglieder Passwörter nicht zurücksetzen
- **[Multi-Site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — unbegrenzt viele Kirchen pro Instanz, verwaltet in der Admin-Oberfläche
- **[Online-Spenden](./railway-template#4-online-giving-stripe--paypal)** — pro Kirche in der Admin-Oberfläche konfiguriert, nicht über Umgebungsvariablen
- **[Optionale Integrationen](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## Daten, Backups und Dateispeicher

Zwei benannte Docker-Volumes halten den gesamten Zustand:

| Volume | Inhalt |
|--------|----------|
| `mysql-data` | Alle Datenbankschemas |
| `api-content` | Hochgeladene Dateien — Fotos, Dokumente, Website-Bilder (gemountet unter `/app/content`) |

Sichern Sie die Datenbank mit einer einzeiligen Anweisung (planen Sie sie mit Cron):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

Sichern Sie hochgeladene Dateien, indem Sie das Volume kopieren:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

Für große Medienbibliotheken können Sie den Dateispeicher statt des lokalen Volumes auf S3 umstellen — setzen Sie `FILE_STORE=S3` sowie die `AWS_*`-Variablen, die im [Abschnitt „Dateispeicher" der Railway-Anleitung](./railway-template#5-file-storage) beschrieben sind.

## Aktualisieren

Die API und B1App werden aus dem `main`-Branch ihrer GitHub-Repositorys gebaut; B1Admin wird aus Ihrem lokalen Klon gebaut.

```bash
git pull                              # update B1Admin
docker compose build --pull           # rebuild all images against latest main
docker compose up -d
```

Datenbankmigrationen laufen automatisch, wenn der API-Container startet.

Um Versionen festzupinnen, statt `main` zu verfolgen, verweisen Sie die Build-Kontexte in `.env` auf einen Tag:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

Entwickler können dieselben Variablen auf lokale Checkouts verweisen lassen (z. B. `API_CONTEXT=../Api`).

## Fehlerbehebung

| Symptom | Wahrscheinliche Ursache | Behebung |
|---------|--------------|-----|
| `api`-Container startet in einer Schleife neu | MySQL nicht bereit oder Migrationsfehler | `docker compose logs api` — die Migration gibt aus, welches Modul fehlgeschlagen ist |
| Login leitet auf `api.churchapps.org` um | Webanwendung ohne die `custom`-Stage-Argumente gebaut | Neu bauen: `docker compose build --no-cache b1admin b1app` |
| URL in `.env` geändert, aber nichts ist passiert | URLs werden zur Build-Zeit fest eingebacken | `docker compose up -d --build` |
| „Check your email", aber keine E-Mail kommt an | `MAIL_SYSTEM=SMTP` mit falschen Zugangsdaten | Zugangsdaten korrigieren, oder `MAIL_SYSTEM` entfernen, um E-Mail zu deaktivieren |
| Chat-/Live-Funktionen bleiben stumm | `SOCKET_URL` vom Browser aus nicht erreichbar | Muss `wss://` hinter HTTPS sein und auf Port 8084 durchgereicht werden |
| Build bricht auf einem kleinen VPS ab | Speichermangel während `next build` | Swap hinzufügen, oder auf einem anderen Rechner bauen und mit `docker save`/`load` übertragen |

Kommen Sie nicht weiter? Öffnen Sie ein Issue unter [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) mit der Ausgabe von `docker compose logs`.

## Verwandte Artikel

- **[Self-Hosting auf Railway](./railway-template)** — verwaltete Hosting-Alternative, plus die gemeinsamen Nachkonfigurationsanleitungen
- **[Ersteinrichtung](../../getting-started/initial-setup)** — erste Schritte, nachdem Ihre Kirche angelegt wurde
- **[Lokale API-Einrichtung](../api/local-setup)** — den Stack direkt für die Entwicklung ausführen
</content>
