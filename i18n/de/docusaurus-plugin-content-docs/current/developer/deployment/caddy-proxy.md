---
title: "Caddy-Proxy für eigene Domains"
---

# Caddy-Proxy für eigene Domains

<div class="article-intro">

Eigene Domains der Gemeinden (`mychurch.org` → die B1-Website der Gemeinde) enden auf einer einzigen Windows-EC2-Maschine mit Caddy. Die Maschine besitzt die TLS-Zertifikate, ordnet jede Domain ihrer Website `{sub}.b1.church` zu und leitet mit einem umgeschriebenen Header Host weiter. Ihre gesamte Konfiguration besteht aus zwei Dateien — einer statischen `Caddyfile` und einer `hosts.map`, die aus der Membership-API aktualisiert wird —, daher übersteht sie Neustarts ohne jeden Laufzeitzustand. Diese Seite beschreibt, wie die Maschine von Grund auf aufgebaut wird, wie sie betrieben wird, und die praxiserprobten Stolperfallen, die jeden treffen, der sie neu aufbaut.

</div>

Für die Frage, wie eine Anfrage nach dem Erreichen von B1App einer Gemeinde bzw. Website zugeordnet wird, siehe [Website-Routing und Multi-Site](../architecture/websites).

## Komponenten

| Bestandteil | Beschreibung |
|---|---|
| EC2-Instanz | Windows Server; Elastic IP **`3.23.251.61`** (in den DNS-Einträgen der Gemeinden weltweit hinterlegt — die IP ist dauerhaft, Instanzen sind austauschbar) |
| `C:\caddy\caddy.exe` | **Eigener** Caddy-Build mit dem Speichermodul `techknowlogick/certmagic-s3` — der Standard-Caddy kann den Zertifikatsspeicher nicht lesen |
| `C:\caddy\Caddyfile` | Die gesamte Proxy-Konfiguration: On-Demand-TLS, `map` von Host zu Upstream, Weiterleitungen von www zur Apex-Domain, `:80` → https |
| `C:\caddy\hosts.map` | Eine Zeile `{domain} {sub}.b1.church` je routbarer Domain, eingebunden in den Block `map` der Caddyfile |
| `sync-hostmap.ps1` + Aufgabe `CaddyHostmapSync` | Geplante Aufgabe (alle 5 Minuten und beim Start, als SYSTEM) aktualisiert `hosts.map` aus der API und lädt Caddy nur bei einer Änderung geordnet neu |
| Windows-Dienst `caddy` (Wrapper WinSW) | Führt `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` aus; startet bei einem Fehler automatisch neu. Caddy ist nicht SCM-fähig, daher ist ein Wrapper erforderlich |
| S3-Bucket `churchapps-caddy-certs` | Gemeinsamer Speicher für Zertifikate (`region us-east-2`, Präfix `certs`) — Zertifikate überleben die Neuerstellung der Instanz |
| IAM-Rolle `CaddyRole` | Gewährt der Instanz Zugriff auf S3; Caddy verwendet die Standardkette der AWS-Zugangsdaten (keine Schlüssel in der Konfiguration) |

## Die zwei API-Endpunkte, auf die die Maschine angewiesen ist

Beide liegen in der Membership-API. `authorize` ist anonym; `hostmap` verlangt seit Api PR #67 (2026-08-16) den Header `x-internal-key: <INTERNAL_API_KEY>` — `sync-hostmap.ps1` liest ihn aus `C:\caddy\internal-key.txt`:

| Endpunkt | Funktion |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Das **On-Demand-TLS-`ask`-Tor** von Caddy: `200 {"authorized":true}`, wenn der Host (bei einem Host `www.` seine Apex-Domain) als Zeile in `domains` existiert; sonst `404`. Dies ist die Missbrauchskontrolle — Caddy stellt kein Zertifikat für einen Host aus, den dieser Endpunkt ablehnt |
| `GET /membership/domains/hostmap` | Verlangt `x-internal-key` (oder ein JWT eines Server-Admins). `text/plain`, sortierte und deduplizierte Zeilen `{domain} {sub}.b1.church` (abhängig von der Website: Eine Domain, die einer zweiten Website zugeordnet ist, verbindet sich mit deren Subdomain). Quelle der `map` |

## Ablauf einer Anfrage

1. Der Browser löst `mychurch.org` zu `3.23.251.61` auf (Apex-Eintrag `A` oder `CNAME proxy.b1.church`).
2. Caddy beendet TLS. Liegt das Zertifikat in S3 vor → ausliefern; unbekannter SNI → `authorize` wird befragt; 200 → On-Demand-Ausstellung über Let's Encrypt; 404 → **der Handshake wird abgelehnt** (kein Zertifikat, keine Antwort — ein unbekannter Host wird per TLS abgewiesen, nicht mit einem HTTP-Fehler).
3. Die `map` löst den Host zu `{sub}.b1.church` auf; `www.{apex}` erhält eine Weiterleitung 302 zur Apex-Domain; ein autorisierter, aber nicht zugeordneter Host (eine brandneue Domain innerhalb des bis zu 5-minütigen Synchronisierungsfensters) erhält eine saubere 404.
4. `reverse_proxy` verbindet sich mit `{sub}.b1.church:443` mit SNI, und Host ist auf den Upstream umgeschrieben, sodass der Edge von Vercel die B1App-Website ausliefert.
   Caddy sendet außerdem die ursprüngliche Domain des Besuchers als `X-Church-Host` (Vercel überschreibt `X-Forwarded-Host` mit dem umgeschriebenen Host). Die Middleware von B1App akzeptiert ihn nur, wenn `/domains/public/lookup/{host}` ihn derselben `{sub}` zuordnet wie der Host der Anfrage; danach stellt sie ihn als `x-public-host` für den kanonischen Header `Link`, `robots.txt` und `sitemap.xml` bereit. Vom Client gesendete `x-public-host` werden immer entfernt. Das Schema.org-`ChurchJsonLd` verwendet weiterhin die URL `b1.church` (das Lesen der Header dort würde die Seiten dynamisch machen).
5. Port 80 leitet die ACME-HTTP-01-Prüfungen weiter und leitet alles andere mit 308 auf https um.

Ausbreitung neuer Domains: Eine in B1Admin gespeicherte Domain wird innerhalb von etwa 5 Minuten routbar (die Synchronisierungsaufgabe); ihr Zertifikat wird beim ersten HTTPS-Aufruf ausgestellt.

## Aufbau der Maschine von Grund auf

Verdichtet aus dem praxiserprobten Verfahren (die vollständige Schritt-für-Schritt-Anleitung mit kopierfertigen Befehlen liegt im Arbeitsbereich für den Betrieb, nicht in diesem Repository). Zuerst die Voraussetzungen — ohne sie ist der Aufbau zum Scheitern verurteilt:

1. **IAM**: Hängen Sie `CaddyRole` (S3-Zugriff auf den Zertifikats-Bucket) an die Instanz. Prüfen Sie dies über IMDSv2 von der Maschine aus — beachten Sie, dass eine einfache IMDS-Abfrage mit der Antwort 401 nur bedeutet, dass IMDSv2 erzwungen wird, nicht „keine Rolle“.
2. **API-Zustand**: `authorize` muss für eine erfundene Domain 404 liefern, und `hostmap` (mit dem Header `x-internal-key`) muss 200 liefern, bevor irgendetwas anderes geschieht.

Danach:

3. **Binärdatei**: Laden Sie einen eigenen Build vom Build-Dienst von Caddy herunter — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB gegenüber ~45 MB beim Standard; v2.11.4 zum Zeitpunkt des Schreibens). Die Wahl des Moduls ist entscheidend: `techknowlogick/certmagic-s3` verwendet die Schlüssel `bucket`/`region`/`prefix`, die dem bestehenden Layout der Zertifikate entsprechen; der Fork `ss098` verwendet `host`/`endpoint` und **findet die bestehenden Zertifikate nicht**.
4. **Dateien**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (der Produktions-`INTERNAL_API_KEY`, eine Zeile) nach `C:\caddy\`; befüllen Sie die Zuordnung einmalig mit `sync-hostmap.ps1 -NoReload`.
5. **Prüfungen vor dem ersten Start**: `caddy list-modules` muss das Speichermodul s3 anzeigen; `caddy adapt` muss im Speicherblock `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` ausgeben; `caddy validate` muss erfolgreich sein.
6. **Dienst**: Installieren Sie ihn über WinSW (Dienst-ID `caddy`, automatischer Neustart bei Fehlern, rollierende Protokolle). Er läuft als LocalSystem, das IMDS für die Zugangsdaten der Rolle erreicht.
7. **Synchronisierungsaufgabe**: Registrieren Sie `CaddyHostmapSync` (SYSTEM, alle 5 Minuten und beim Start, Ausführungslimit 4 Minuten).
8. **Prüfung vor der Umstellung**: Lösen Sie die Domains mit `curl --resolve` auf `127.0.0.1` auf, da die Maschine noch keinen echten Datenverkehr hat (die EIP wird erst später umgehängt). Eine bestehende Domain muss mit einem übernommenen, gültigen Zertifikat ausliefern; `www.` muss mit 302 weiterleiten; ein unbekannter Host muss per TLS abgelehnt werden; und `Restart-Service caddy` muss mit Auslieferung zurückkehren **ohne manuelles erneutes Vorbereiten** — dieser Neustart-Test ist der eigentliche Sinn des statischen Entwurfs.
9. **Umstellung**: Hängen Sie die Elastic IP `3.23.251.61` an die neue Instanz um. Die DNS-Einträge der Gemeinden ändern sich nie.

## Praxiserprobte Stolperfallen (bitte nicht wiederholen)

| Stolperfalle | Symptom | Lösung |
|---|---|---|
| `tls_server_name {vars.upstream}` im Transport von reverse_proxy | Jede weitergeleitete Domain liefert 502: Platzhalter der Map werden **zum Zeitpunkt des TLS-Verbindungsaufbaus leer aufgelöst** („either ServerName or InsecureSkipVerify must be specified“) | Verwenden Sie den transporteigenen Platzhalter: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Doppelte Schlüssel oder fehlerhafte Zeilen in `hosts.map` | Der Handler `map` von Caddy **bricht hart ab bei einem doppelten Eingabeschlüssel** — eine fehlerhafte Zeile kann die gesamte Konfiguration außer Betrieb setzen | Das Synchronisierungsskript normalisiert Leerzeichen, verwirft fehlerhafte Zeilen (lehnt nur insgesamt ab, wenn mehr als 20 % fehlerhaft sind), entfernt Dubletten (der erste Eintrag gewinnt) und schreibt UTF-8 **ohne BOM** (ein BOM verfälscht den ersten Schlüssel der Map). Die API filtert außerdem leere Domain-Zeilen und Zeilen mit Leerzeichen bereits an der Quelle |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Die Registrierung der Aufgabe **scheitert stillschweigend** (XML außerhalb des Wertebereichs, nicht abbrechender Fehler) | Erstellen Sie die Wiederholung als CIM-Instanz `MSFT_TaskRepetitionPattern` mit `Interval = "PT5M"` und ohne Dauer; ergänzen Sie ein Ausführungslimit `ExecutionTimeLimit` von 4 Minuten (der erste Lauf als SYSTEM kann bei einer Kaltabfrage von TLS/CRL hängen) |

:::warning
Die Admin-API bindet nur an `localhost:2019`. Der ältere Laufzeitmodus machte sie remote erreichbar, damit die Membership-API Routenkonfigurationen übertragen konnte; der statische Entwurf benötigt keine Übertragungen aus der Ferne, und die kleinere Angriffsfläche ist Absicht. `caddy reload` (lokal vom Synchronisierungsskript ausgeführt) ist der einzige Verbraucher der Admin-API.
:::

:::info Älterer Laufzeit-Push
`CaddyHelper` in der API (sowie die Endpunkte `/membership/domains/caddy` + `/caddy/init`) existiert weiterhin als Rückfallpfad zum früheren laufzeitkonfigurierten Modus. Sie sollen gelöscht werden, sobald die statische Maschine ein paar Wochen stabil lief — danach sind `authorize` + `hostmap` die einzigen Integrationspunkte.
:::

## Betrieb

- **Protokolle**: Rollierende WinSW-Protokolle in `C:\caddy\` (Ausgabe und Fehler des Dienstes — Fehler des reverse proxy landen in `caddy-service.err.log`); der Verlauf der Synchronisierung in `C:\caddy\sync-hostmap.log`.
- **Aktualisierung der Zuordnung erzwingen**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Änderung der Konfiguration**: Bearbeiten Sie `C:\caddy\Caddyfile` und führen Sie danach `caddy validate` + `caddy reload` aus (oder `Restart-Service caddy` — Neustarts sind per Konstruktion sicher).
- **Massenhaftes Löschen von Domains** löst die Schutzprüfung des Synchronisierungsskripts gegen Schrumpfung absichtlich aus; verschieben Sie die alte `hosts.map` beiseite und starten Sie die Aufgabe erneut, um eine beabsichtigte starke Verkleinerung zu akzeptieren.
- **DNS-Anweisungen für Gemeinden bleiben dauerhaft unverändert**: Apex-Eintrag `A 3.23.251.61` oder `CNAME proxy.b1.church`.

## Verwandte Seiten

- [Website-Routing und Multi-Site](../architecture/websites) — wie die weitergeleitete Anfrage in B1App einer Gemeinde bzw. Website zugeordnet wird
- [API-Bereitstellung](./apis) — Bereitstellung der Membership-API, die `authorize`/`hostmap` liefert
