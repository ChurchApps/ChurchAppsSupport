---
title: "Selbst hosten mit Docker"
---

# Selbst hosten mit Docker

<div class="article-intro">

Betreiben Sie Ihre eigene private Instanz von B1 Admin, der B1-Mitgliederplattform und Website, der API und einer MySQL-Datenbank auf jedem Rechner mit Docker — einem Heimserver, einem kleinen VPS oder einem Vor-Ort-Gerät. Ein Befehl installiert es, ein Befehl aktualisiert es, und jede Aktualisierung erstellt zuerst ein Backup. Wenn Sie sich gar nicht um einen Server kümmern möchten, finden Sie unter [Selbst hosten auf Railway](./railway-template) die verwaltete Alternative.

</div>

## Schnellstart

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- Ein Linux-Rechner (oder macOS / Windows mit WSL oder Git Bash — der Helfer `b1` ist ein Bash-Skript) mit [Docker Engine](https://docs.docker.com/engine/install/) und Compose v2 (in Docker Desktop enthalten)
- Etwa 2 GB RAM und 5 GB Speicherplatz
- Für eine öffentliche Website: ein Domainname, der auf den Rechner zeigt, wobei die Ports 80 und 443 erreichbar sein müssen

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Lassen Sie `--domain` weg, um auf `http://localhost` zu laufen. Der Installer legt einen Ordner `b1church` an, schreibt eine `.env` mit neu erzeugten Geheimnissen, lädt die fertigen Images aus der GitHub Container Registry und wartet, bis die API meldet, dass sie fehlerfrei läuft. Auf Ihrem Rechner wird nichts gebaut, daher dauert der erste Start ein oder zwei Minuten.

Wenn der Vorgang abgeschlossen ist:

1. Öffnen Sie **https://church.example.org/admin** (oder http://localhost/admin) und klicken Sie auf **Registrieren**. Das erste Konto wird automatisch zum Server-Administrator.
2. Folgen Sie den Anweisungen in der Anwendung, um Ihre erste Kirche anzulegen. Ihre Website und Mitgliederplattform sind unter **https://church.example.org/** verfügbar, sobald die Kirche existiert.

Alles läuft hinter einer einzigen Domain:

| Pfad | Dienst |
|------|--------|
| `/` | B1App — Website der Kirche und Mitgliederplattform |
| `/admin` | B1Admin — Verwaltungsoberfläche für Mitarbeitende |
| `/api` | API, hochgeladene Dateien und der Live-Update-Websocket |

HTTPS erfolgt automatisch: Der mitgelieferte [Caddy](https://caddyserver.com/)-Proxy bezieht und erneuert für die Domain in `.env` ein Let's-Encrypt-Zertifikat. Nur die Ports 80 und 443 sind freigegeben; die Datenbank ist nur innerhalb des Docker-Netzwerks erreichbar.

## Der Befehl `b1`

Der Installer legt ein Skript `deploy/b1` neben `docker-compose.yml` ab. Im täglichen Betrieb benötigen Sie nur dieses:

| Befehl | Was er tut |
|--------|------------|
| `./deploy/b1 upgrade` | Aktuelle Version herunterladen, ein Backup erstellen, neu starten und prüfen, ob die API fehlerfrei läuft |
| `./deploy/b1 upgrade 2026.10.1` | Wie oben, aber auf eine bestimmte Version festgelegt |
| `./deploy/b1 backup` | Momentaufnahme der Datenbank, hochgeladenen Dateien und `.env` nach `backups/<timestamp>/` erstellen |
| `./deploy/b1 restore backups/<timestamp>` | Eine Momentaufnahme wiederherstellen (die API wird dabei angehalten) |
| `./deploy/b1 rollback` | Das neueste Backup wiederherstellen, einschließlich der Version, für die es erstellt wurde |
| `./deploy/b1 status` | Installierte Version und Zustand der Container |
| `./deploy/b1 logs api` | Protokolle eines Dienstes live verfolgen |

Versionen werden als ein gemeinsames, versioniertes Paket veröffentlicht, damit die drei Images immer zusammenpassen. `B1_VERSION=stable` in `.env` folgt der neuesten Version; setzen Sie eine bestimmte Version, um sie festzulegen. Versionshinweise finden Sie unter [B1Admin-Releases](https://github.com/ChurchApps/B1Admin/releases).

## Konfiguration

Alle Einstellungen befinden sich in `.env` neben `docker-compose.yml`. Der Installer füllt die erforderlichen Werte aus:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Nach dem Bearbeiten der `.env` übernehmen Sie die Änderungen mit `docker compose up -d`. Die Webanwendungen ermitteln anhand der Adresse im Browser, mit welcher API sie sprechen sollen. Beim Wechsel der Domain müssen Sie also nur `SITE_ADDRESS` und `PUBLIC_URL` anpassen und neu starten — ein Neubau ist nicht nötig.

:::warning
Bewahren Sie `.env` sicher auf. `ENCRYPTION_KEY` schützt die gespeicherten Zugangsdaten für Zahlungs-Gateways und Speicherdienste; ein Backup ohne diesen Schlüssel kann sie nicht entschlüsseln. `./deploy/b1 backup` enthält aus diesem Grund eine Kopie davon.
:::

### Später auf eine Domain umstellen

Wenn Sie auf `localhost` installiert haben und die Instanz später öffentlich erreichbar machen möchten: Richten Sie das DNS auf den Rechner, setzen Sie `DOMAIN`, `SITE_ADDRESS` (die nackte Domain) und `PUBLIC_URL` (`https://` + Domain) in `.env` und führen Sie danach `docker compose up -d` aus. Caddy bezieht beim ersten Aufruf ein Zertifikat.

## E-Mail, Spenden, Mehrere Websites und Integrationen

Diese Funktionen arbeiten genau wie auf Railway — dieselben Umgebungsvariablen, gesetzt in `.env` statt im Railway-Dashboard:

- **[E-Mail / SMTP](./railway-template#1-email-highly-recommended)** — Anleitungen für die Anbieter Resend, Brevo und Gmail
- **[Mehrere Websites](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — unbegrenzt viele Kirchen pro Instanz. `/` zeigt die Kirche, deren Slug `DEFAULT_CHURCH_SLUG` ist (die erste Kirche ist `church`); richten Sie zusätzliche Domains auf den Rechner und ordnen Sie sie in B1Admin unter **Einstellungen → Domains** zu
- **[Online-Spenden](./railway-template#4-online-giving-stripe--paypal)** — pro Kirche in der Verwaltungsoberfläche konfiguriert
- **[Optionale Integrationen](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_*`, `GOOGLE_RECAPTCHA_SECRET_KEY`

Einladungen und andere von der Kirche versendete E-Mails sind auf einer selbst gehosteten Instanz automatisch aktiviert (der gehostete Dienst schaltet diese zum Schutz seiner Absenderreputation erst nach einer manuellen Prüfung frei).

## Daten, Backups und Dateispeicher

Drei benannte Docker-Volumes enthalten sämtliche Daten:

| Volume | Inhalt |
|--------|--------|
| `b1church_mysql-data` | Alle Datenbankschemata |
| `b1church_api-content` | Hochgeladene Dateien — Fotos, Dokumente, Bilder für die Website |
| `b1church_caddy-data` | TLS-Zertifikate |

`./deploy/b1 backup` schreibt einen konsistenten Snapshot der ersten beiden Volumes sowie der `.env` nach `backups/<timestamp>/`. Planen Sie ihn mit cron und kopieren Sie den Ordner an einen Ort außerhalb des Rechners:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Bei großen Medienbibliotheken können Sie den Dateispeicher auf S3 umstellen — setzen Sie `FILE_STORE=S3` sowie die `AWS_*`-Variablen aus dem Abschnitt [Dateispeicher im Railway-Leitfaden](./railway-template#5-file-storage). Datenbank-Backups enthalten keine S3-Objekte; aktivieren Sie dort die Versionierung des Buckets.

## Aktualisieren

```bash
./deploy/b1 upgrade
```

In dieser Reihenfolge: Die Version wird heruntergeladen, ein Backup erstellt, die Container werden neu erstellt, ausstehende Datenbankmigrationen werden beim Start der API ausgeführt, und es wird auf die Systemprüfung der API gewartet. Schlägt etwas fehl, bricht der Vorgang ab und fordert Sie auf, `./deploy/b1 rollback` auszuführen; dieser Befehl stellt das Backup und die vorherige Version wieder her. Migrationen sind nur vorwärts gerichtet; ein Zurücksetzen bedeutet immer die Wiederherstellung der Momentaufnahme.

Eine Aktualisierung von der Beta-Compose-Datei (die Images aus dem Quellcode baute) funktioniert auf dieselbe Weise, sobald Sie eine `.env` haben: Sie verwendete standardmäßig `MYSQL_ROOT_PASSWORD=churchapps`. Tragen Sie diesen Wert daher zusammen mit `PUBLIC_URL` und `SITE_ADDRESS` in `.env` ein, ersetzen Sie `docker-compose.yml` und `deploy/` durch die aktuellen Dateien und führen Sie `./deploy/b1 upgrade` aus.

## Aus dem Quellcode erstellen

Entwickler können die Images lokal erstellen, statt sie herunterzuladen:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` und `B1APP_CONTEXT` in `.env` verweisen für die Builds auf lokale Checkouts (z. B. `../Api`) oder einen Git-Ref.

## Fehlerbehebung

| Symptom | Wahrscheinliche Ursache | Lösung |
|---------|--------------|-----|
| Der Container `api` startet ständig neu | Fehler bei der Migration oder falsches Datenbankpasswort | `./deploy/b1 logs api` — die Migration zeigt an, welches Modul fehlgeschlagen ist |
| `api` protokolliert „ENCRYPTION_KEY must be exactly 32 characters“ | Schlüssel in `.env` manuell bearbeitet oder abgeschnitten | Den ursprünglichen 32-Zeichen-Schlüssel wiederherstellen (einen neuen nur erzeugen, wenn noch keine Zugangsdaten gespeichert sind) |
| Der Browser zeigt eine Zertifikatswarnung | DNS zeigt noch nicht hierher oder die Ports 80/443 sind blockiert | DNS bzw. Firewall korrigieren; Caddy versucht es automatisch erneut |
| Unter `/` erscheint ein Dashboard statt der Website | Noch keine Kirche oder `DEFAULT_CHURCH_SLUG` stimmt nicht überein | Die Kirche anlegen oder den Slug unter **Einstellungen → Kirche** setzen |
| „Prüfen Sie Ihre E-Mail“, aber keine E-Mail kommt an | `MAIL_SYSTEM=SMTP` mit fehlerhaften Zugangsdaten | Zugangsdaten korrigieren oder `MAIL_SYSTEM` entfernen, um E-Mails zu deaktivieren |
| Chat- / Live-Funktionen reagieren nicht | Websocket wird von einem vorgeschalteten Proxy blockiert | Der Socket liegt unter `/api/` auf demselben Port; erlauben Sie `Upgrade`-Header |
| `install` bricht ab: „database volume already exists“ | Reste einer früheren Installation | `docker compose down -v` zum Löschen ausführen oder eine `.env` schreiben und `upgrade` verwenden |

Noch nicht weitergekommen? Eröffnen Sie ein Issue unter [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) und fügen Sie die Ausgabe von `./deploy/b1 logs` bei.

## Verwandte Artikel

- **[Selbst hosten auf Railway](./railway-template)** — verwaltete Hosting-Alternative sowie die gemeinsamen Anleitungen zur Konfiguration nach der Bereitstellung
- **[Ersteinrichtung](../../getting-started/initial-setup)** — erste Schritte, nachdem Ihre Kirche angelegt wurde
- **[Lokale API-Einrichtung](../api/local-setup)** — den Stack direkt für die Entwicklung ausführen
