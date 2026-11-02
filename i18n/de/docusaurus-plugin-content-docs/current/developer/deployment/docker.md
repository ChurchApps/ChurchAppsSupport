---
title: "Selbst-Hosting mit Docker"
---

# Selbst-Hosting mit Docker

<div class="article-intro">

Betreiben Sie Ihre eigene, private Instanz von B1 Admin, des B1-Mitgliederportals und der Website, der API und einer MySQL-Datenbank auf jedem Rechner mit Docker — einem Heimserver, einem kleinen VPS oder einem Gerät vor Ort. Ein Befehl installiert alles, ein Befehl aktualisiert es, und jede Aktualisierung legt zuerst eine Sicherung an. Wenn Sie sich gar nicht um einen Server kümmern möchten, lesen Sie [Selbst-Hosting auf Railway](./railway-template) für die verwaltete Alternative.

</div>

## Schnellstart

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- Einen Linux-Rechner (oder macOS / Windows mit WSL oder Git Bash — der Helfer `b1` ist ein Bash-Skript) mit [Docker Engine](https://docs.docker.com/engine/install/) und Compose v2 (in Docker Desktop enthalten)
- Etwa 2 GB RAM und 5 GB Speicherplatz
- Für eine öffentliche Website: einen Domainnamen, der auf den Rechner zeigt, wobei die Ports 80 und 443 erreichbar sein müssen

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Lassen Sie `--domain` weg, um auf `http://localhost` zu laufen. Der Installer legt einen Ordner `b1church` an, schreibt eine `.env` mit frisch erzeugten Geheimnissen, lädt die vorgefertigten Images aus der GitHub Container Registry und wartet, bis die API meldet, dass sie gesund ist. Auf Ihrem Rechner wird nichts gebaut, daher dauert der erste Start ein bis zwei Minuten.

Wenn der Vorgang abgeschlossen ist:

1. Öffnen Sie **https://church.example.org/admin** (oder http://localhost/admin) und klicken Sie auf **Register**. Das erste Konto wird automatisch Server-Admin.
2. Folgen Sie den Hinweisen in der Anwendung, um Ihre erste Gemeinde anzulegen. Ihre Website und das Mitgliederportal sind unter **https://church.example.org/** live, sobald die Gemeinde existiert.

Alles läuft hinter einer einzigen Domain:

| Pfad | Dienst |
|------|--------|
| `/` | B1App — Website der Gemeinde und Mitgliederportal |
| `/admin` | B1Admin — Dashboard für Mitarbeitende |
| `/api` | API, hochgeladene Dateien und der Live-Updates-WebSocket |

HTTPS ist automatisch: Der mitgelieferte [Caddy](https://caddyserver.com/)-Proxy besorgt und erneuert ein Let's-Encrypt-Zertifikat für die Domain aus `.env`. Nur die Ports 80 und 443 sind nach außen geöffnet; die Datenbank ist nur innerhalb des Docker-Netzwerks erreichbar.

## Der Befehl `b1`

Der Installer legt ein Skript `deploy/b1` neben `docker-compose.yml` ab. Im täglichen Betrieb brauchen Sie nur dieses:

| Befehl | Was er tut |
|---------|--------------|
| `./deploy/b1 upgrade` | Lädt die aktuelle Version, legt eine Sicherung an, startet neu und prüft, ob die API gesund ist |
| `./deploy/b1 upgrade 2026.10.1` | Dasselbe, aber auf eine bestimmte Version festgelegt |
| `./deploy/b1 backup` | Sichert die Datenbank, die hochgeladenen Dateien und `.env` in `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Stellt eine Sicherung wieder her (die API wird dabei angehalten) |
| `./deploy/b1 rollback` | Stellt die neueste Sicherung wieder her, einschließlich der Version, zu der sie gehört |
| `./deploy/b1 status` | Installierte Version und Zustand der Container |
| `./deploy/b1 logs api` | Protokolle eines Dienstes live verfolgen |

Versionen werden als ein gemeinsames, nummeriertes Paket veröffentlicht, sodass die drei Images immer zusammenpassen. `B1_VERSION=stable` in `.env` folgt der neuesten Version; geben Sie eine bestimmte Version an, um sie festzulegen. Die Versionshinweise finden Sie unter [B1Admin-Versionen](https://github.com/ChurchApps/B1Admin/releases).

## Konfiguration

Alle Einstellungen stehen in `.env` neben `docker-compose.yml`. Der Installer füllt die Pflichtwerte aus:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # Was Caddy ausliefert; http://localhost bei einer lokalen Installation
PUBLIC_URL=https://church.example.org    # Wie Browser und E-Mails die Seite erreichen
MYSQL_ROOT_PASSWORD=…                    # wird erzeugt
JWT_SECRET=…                             # wird erzeugt
ENCRYPTION_KEY=…                         # wird erzeugt, genau 32 Zeichen — nach dem Speichern von Zugangsdaten niemals ändern

# E-Mail — dringend empfohlen; ohne sie können Mitglieder ihre Passwörter nicht selbst zurücksetzen
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Nach dem Bearbeiten von `.env` übernehmen Sie die Änderungen mit `docker compose up -d`. Die Web-Anwendungen ermitteln, welche API sie ansprechen sollen, anhand der Adresse im Browser. Ein Wechsel der Domain erfordert daher nur die Anpassung von `SITE_ADDRESS` und `PUBLIC_URL` und einen Neustart — kein neues Bauen.

:::warning
Bewahren Sie `.env` sorgfältig auf. `ENCRYPTION_KEY` schützt die gespeicherten Zugangsdaten von Zahlungsgateways und Speicher; eine Sicherung ohne diesen Schlüssel kann sie nicht entschlüsseln. `./deploy/b1 backup` enthält aus diesem Grund eine Kopie davon.
:::

### Später auf eine Domain umziehen

Wenn Sie auf `localhost` installiert haben und die Instanz später öffentlich machen möchten: Zeigen Sie das DNS auf den Rechner, setzen Sie in `.env` `DOMAIN`, `SITE_ADDRESS` (die blanke Domain) und `PUBLIC_URL` (`https://` + Domain), und führen Sie danach `docker compose up -d` aus. Caddy holt das Zertifikat bei der ersten Anfrage.

## E-Mail, Spenden, Multi-Site und Integrationen

Diese funktionieren genauso wie auf Railway — dieselben Umgebungsvariablen, gesetzt in `.env` statt im Railway-Dashboard:

- **[E-Mail / SMTP](./railway-template#1-email-highly-recommended)** — Anleitungen für die Anbieter Resend, Brevo und Gmail
- **[Multi-Site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — beliebig viele Gemeinden pro Instanz. `/` liefert die Gemeinde, deren Slug `DEFAULT_CHURCH_SLUG` ist (die erste Gemeinde heißt `church`); richten Sie zusätzliche Domains auf den Rechner und ordnen Sie sie in B1Admin unter **Einstellungen → Domains** zu
- **[Online-Spenden](./railway-template#4-online-giving-stripe--paypal)** — pro Gemeinde in der Administrationsoberfläche konfiguriert
- **[Optionale Integrationen](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Push-Benachrichtigungen](#push-notifications)** — `WEB_PUSH_*`; der Installer lässt diese leer, sodass Push deaktiviert bleibt, bis Sie sie ergänzen

Einladungen und andere E-Mails, die von der Gemeinde versendet werden, sind auf einer selbst betriebenen Instanz automatisch aktiviert (der gehostete Dienst schaltet sie erst nach einer manuellen Prüfung frei, um seinen Ruf als Absender zu schützen).

## Push-Benachrichtigungen {#push-notifications}

Browser- und mobile Web-Push bleiben aus, bis der Server ein VAPID-Schlüsselpaar hat. Der Installer erzeugt keines. Bis Sie es ergänzen, zeigt die Seite Benachrichtigungen der mobilen Web-App an, dass Push für die Website nicht aktiviert ist.

1. Erzeugen Sie ein Schlüsselpaar. Dafür genügt Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Tragen Sie die beiden Werte in `.env` ein. `WEB_PUSH_SUBJECT` ist optional und ist die Kontaktadresse, die die Push-Dienste sehen:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Übernehmen Sie die Werte:

   ```bash
   docker compose up -d
   ```

4. Zur Kontrolle öffnen Sie in B1Admin **Server Admin → Server Health**. Beide Web-Push-Schlüssel sollten als konfiguriert angezeigt werden. Mitglieder können danach in der mobilen Web-App Benachrichtigungen aktivieren.

:::warning
Behalten Sie dieselben Schlüssel bei, sobald Mitglieder sich angemeldet haben. Eine Änderung macht jedes bestehende Abonnement ungültig, und jedes Gerät muss sich erneut registrieren.
:::

## Daten, Sicherungen und Dateispeicher

Drei benannte Docker-Volumes enthalten den gesamten Zustand:

| Volume | Inhalt |
|--------|----------|
| `b1church_mysql-data` | Alle Datenbankschemata |
| `b1church_api-content` | Hochgeladene Dateien — Fotos, Dokumente, Bilder der Website |
| `b1church_caddy-data` | TLS-Zertifikate |

`./deploy/b1 backup` schreibt einen konsistenten Snapshot der ersten beiden sowie von `.env` nach `backups/<timestamp>/`. Planen Sie die Sicherung mit cron und kopieren Sie den Ordner an einen Ort außerhalb des Rechners:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Für große Medienbibliotheken können Sie den Dateispeicher auf S3 umstellen — setzen Sie `FILE_STORE=S3` und die Variablen `AWS_*`, die im Abschnitt Dateispeicher des [Railway-Leitfadens](./railway-template#5-file-storage) beschrieben sind. Datenbanksicherungen enthalten keine S3-Objekte; aktivieren Sie dort die Versionierung des Buckets.

## Aktualisierung

```bash
./deploy/b1 upgrade
```

Der Vorgang läuft in dieser Reihenfolge ab: Er lädt die Version, legt eine Sicherung an, erstellt die Container neu, führt ausstehende Datenbankmigrationen beim Start der API aus und wartet auf die Prüfung des Zustands der API. Schlägt ein Schritt fehl, bricht er ab und weist Sie an, `./deploy/b1 rollback` auszuführen; das stellt diese Sicherung und die vorherige Version wieder her. Migrationen sind nur vorwärts gerichtet; ein Zurücksetzen bedeutet immer das Wiederherstellen des Snapshots.

Wenn Sie von der Beta-Compose-Datei (die Images aus dem Quellcode baute) aktualisieren, funktioniert dies ebenso, sobald Sie eine `.env` haben: Dort war standardmäßig `MYSQL_ROOT_PASSWORD=churchapps` gesetzt. Tragen Sie dies in `.env` ein, zusammen mit `PUBLIC_URL` und `SITE_ADDRESS`, ersetzen Sie `docker-compose.yml` und `deploy/` durch die aktuellen Dateien und führen Sie `./deploy/b1 upgrade` aus.

## Aus dem Quellcode bauen

Entwickler können die Images lokal bauen, statt sie herunterzuladen:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` und `B1APP_CONTEXT` in `.env` verweisen beim Bauen auf lokale Checkouts (z. B. `../Api`) oder einen Git-Ref.

## Fehlerbehebung

| Symptom | Wahrscheinliche Ursache | Lösung |
|---------|--------------|-----|
| Der Container `api` startet ständig neu | Fehler bei einer Migration oder falsches Datenbankpasswort | `./deploy/b1 logs api` — die Migration zeigt an, welches Modul fehlgeschlagen ist |
| `api` meldet „ENCRYPTION_KEY must be exactly 32 characters“ | Der Schlüssel in `.env` wurde von Hand bearbeitet oder abgeschnitten | Stellen Sie den ursprünglichen 32-stelligen Schlüssel wieder her (erzeugen Sie nur dann einen neuen, wenn noch keine Zugangsdaten gespeichert sind) |
| Der Browser zeigt eine Zertifikatswarnung | DNS zeigt noch nicht hierher oder die Ports 80/443 sind blockiert | DNS bzw. Firewall korrigieren; Caddy versucht es selbstständig erneut |
| `/` zeigt ein Dashboard statt der Website | Es gibt noch keine Gemeinde oder `DEFAULT_CHURCH_SLUG` stimmt nicht überein | Legen Sie die Gemeinde an oder setzen Sie den Slug unter **Einstellungen → Gemeinde** |
| „Check your email“, aber keine E-Mail kommt an | `MAIL_SYSTEM=SMTP` mit falschen Zugangsdaten | Zugangsdaten korrigieren oder `MAIL_SYSTEM` entfernen, um E-Mail zu deaktivieren |
| Die mobile Web-App meldet, dass Push-Benachrichtigungen nicht aktiviert sind | Keine VAPID-Schlüssel auf dem Server | Ergänzen Sie sie wie unter [Push-Benachrichtigungen](#push-notifications) beschrieben |
| Chat-/Live-Funktionen reagieren nicht | Der WebSocket wird von einem anderen Proxy davor blockiert | Der Socket liegt unter `/api/` auf demselben Port; erlauben Sie die Header `Upgrade` |
| `install` lehnt ab: „database volume already exists“ | Reste einer früheren Installation | `docker compose down -v` zum Löschen ausführen oder eine `.env` schreiben und `upgrade` verwenden |

Sie kommen nicht weiter? Eröffnen Sie ein Issue unter [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) und fügen Sie die Ausgabe von `./deploy/b1 logs` bei.

## Verwandte Artikel

- **[Selbst-Hosting auf Railway](./railway-template)** — verwaltete Alternative sowie die gemeinsamen Anleitungen für die Konfiguration nach der Bereitstellung
- **[Ersteinrichtung](../../getting-started/initial-setup)** — erste Schritte, nachdem Ihre Gemeinde angelegt wurde
- **[Lokale API-Einrichtung](../api/local-setup)** — den Stack für die Entwicklung direkt ausführen
