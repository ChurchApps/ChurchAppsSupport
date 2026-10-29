---
title: "Caddy-Proxy für eigene Domains"
---

# Caddy-Proxy für eigene Domains

<div class="article-intro">

Eigene Domains der Kirchen (`meinekirche.org` → die B1-Website der Kirche) enden auf einer einzigen Windows-EC2-Maschine mit Caddy. Der Kasten besitzt die TLS-Zertifikate, ordnet jede Domain ihrer Site `{sub}.b1.church` zu und leitet per Reverse-Proxy mit umgeschriebenem Host-Header weiter. Seine gesamte Konfiguration besteht aus zwei Dateien -- einer statischen `Caddyfile` und einer `hosts.map`, die von der Mitgliedschafts-API aktualisiert wird --, daher übersteht er Neustarts ohne Laufzeitzustand. Diese Seite behandelt den Aufbau des Kastens von Grund auf, seinen Betrieb und die in der Praxis erprobten Stolpersteine, die jeden beim Neuaufbau treffen.

</div>

Wie eine Anfrage nach Erreichen von B1App einer Kirche bzw. Site zugeordnet wird, beschreibt [Website-Routing & Mehrere Sites](../architecture/websites).

## Bestandteile

| Teil | Beschreibung |
|---|---|
| EC2-Instanz | Windows Server; Elastic IP **`3.23.251.61`** (weltweit in den DNS-Einträgen der Kirchen hinterlegt -- die IP ist dauerhaft, Instanzen sind austauschbar) |
| `C:\caddy\caddy.exe` | **Eigener** Caddy-Build mit dem Speichermodul `techknowlogick/certmagic-s3` -- das Standard-Caddy kann den Zertifikatspeicher nicht lesen |
| `C:\caddy\Caddyfile` | Die gesamte Proxy-Konfiguration: TLS auf Abruf, `map` von Host→Upstream, Weiterleitungen von www auf den Apex, `:80`→https |
| `C:\caddy\hosts.map` | Eine Zeile `{domain} {sub}.b1.church` je routbarer Domain, eingebunden in den Block `map` der Caddyfile |
| `sync-hostmap.ps1` + Aufgabe `CaddyHostmapSync` | Geplante Aufgabe (alle 5 Minuten und beim Start, als SYSTEM) aktualisiert `hosts.map` aus der API und lädt Caddy nur bei Änderungen geordnet neu |
| Windows-Dienst `caddy` (Hülle WinSW) | Führt `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` aus; startet bei Fehlern automatisch neu. Caddy kennt den Dienststeuerungs-Manager (SCM) nicht, daher ist eine Hülle nötig |
| S3-Bucket `churchapps-caddy-certs` | Gemeinsamer Zertifikatspeicher (`region us-east-2`, Präfix `certs`) -- Zertifikate überstehen den Neuaufbau von Instanzen |
| IAM-Rolle `CaddyRole` | Gewährt der Instanz den Zugriff auf S3; Caddy nutzt die Standard-Anmeldekette von AWS (keine Schlüssel in der Konfiguration) |

## Die zwei API-Endpunkte, von denen der Kasten abhängt

Beide liegen in der Mitgliedschafts-API. `authorize` ist anonym; `hostmap` verlangt seit Api-PR #67 (16.08.2026) den Header `x-internal-key: <INTERNAL_API_KEY>` -- `sync-hostmap.ps1` liest ihn aus `C:\caddy\internal-key.txt`:

| Endpunkt | Aufgabe |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Das **Tor für On-Demand-TLS `ask`** von Caddy: `200 {"authorized":true}`, wenn der Host (bei einem Host `www.` seine Apex-Domain) eine Zeile in `domains` ist; sonst `404`. Dies ist die Missbrauchskontrolle -- Caddy stellt kein Zertifikat für einen Host aus, den dieser Endpunkt ablehnt |
| `GET /membership/domains/hostmap` | Verlangt `x-internal-key` (oder ein JWT eines Serveradministrators). `text/plain`, sortierte, von Dubletten bereinigte Zeilen `{domain} {sub}.b1.church` (site-bewusst: Eine Domain, die einer zweiten Site zugewiesen ist, wählt die Subdomain dieser Site). Quelle der `map` |

## Ablauf einer Anfrage

1. Der Browser löst `meinekirche.org` nach `3.23.251.61` auf (Apex-Eintrag `A` oder `CNAME proxy.b1.church`).
2. Caddy beendet TLS. Liegt das Zertifikat in S3 vor → ausliefern; unbekannter SNI → `authorize` wird befragt; 200 → Ausstellung auf Abruf über Let's Encrypt; 404 → **der Handshake wird abgewiesen** (kein Zertifikat, keine Antwort -- ein unbekannter Host erhält eine TLS-Ablehnung, keinen HTTP-Fehler).
3. Die `map` ordnet den Host `{sub}.b1.church` zu; `www.{apex}` erhält eine 302 auf den Apex; ein autorisierter, aber nicht abgebildeter Host (eine ganz neue Domain innerhalb des Synchronisationsfensters von höchstens 5 Minuten) erhält eine saubere 404.
4. `reverse_proxy` verbindet sich mit `{sub}.b1.church:443` mit SNI und umgeschriebenem Host, sodass die Edge von Vercel die B1App-Site ausliefert.
   Caddy sendet außerdem die ursprüngliche Domain des Besuchers als `X-Church-Host` (Vercel überschreibt `X-Forwarded-Host` mit dem umgeschriebenen Host). Die Middleware der B1App akzeptiert ihn nur, wenn `/domains/public/lookup/{host}` ihn derselben `{sub}` zuordnet wie der Host der Anfrage; danach stellt sie ihn als `x-public-host` für den kanonischen Header `Link`, `robots.txt` und `sitemap.xml` bereit. Vom Client gesendetes `x-public-host` wird immer entfernt. Das Schema.org-`ChurchJsonLd` verwendet weiterhin die URL `b1.church` (würde man dort Header lesen, würden die Seiten dynamisch).
5. Port 80 leitet die ACME-HTTP-01-Prüfungen weiter und sendet alles andere mit 308 auf https um.

Ausbreitung neuer Domains: Eine in B1Admin gespeicherte Domain ist innerhalb von etwa 5 Minuten routbar (Synchronisationsaufgabe); ihr Zertifikat entsteht beim ersten HTTPS-Aufruf.

## Den Kasten von Grund auf neu aufbauen

Verkürzt aus dem in der Praxis erprobten Ablauf (die vollständige Schritt-für-Schritt-Anleitung mit Befehlen zum Kopieren liegt im Betriebsarbeitsbereich, nicht in diesem Repository). Zuerst die Voraussetzungen -- ohne sie ist der Aufbau wirkungslos:

1. **IAM**: Hängen Sie `CaddyRole` (S3-Zugriff auf den Zertifikat-Bucket) an die Instanz. Prüfen Sie dies über IMDSv2 vom Kasten aus -- beachten Sie, dass ein einfacher IMDS-Abruf mit 401 nur bedeutet, dass IMDSv2 erzwungen wird, nicht "keine Rolle".
2. **API-Zustand**: `authorize` muss für eine erfundene Domain 404 liefern, und `hostmap` (mit dem Header `x-internal-key`) muss 200 liefern, bevor etwas anderes geschieht.

Danach:

3. **Binärdatei**: Laden Sie einen eigenen Build von Caddys Build-Dienst herunter -- `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (etwa 57 MB gegenüber 45 MB beim Standard; v2.11.4 zum Zeitpunkt der Abfassung). Die Wahl des Moduls ist wichtig: `techknowlogick/certmagic-s3` nutzt die Schlüssel `bucket`/`region`/`prefix`, die zum bestehenden Aufbau des Zertifikatspeichers passen; der Fork `ss098` verwendet `host`/`endpoint` und **findet die bestehenden Zertifikate nicht**.
4. **Dateien**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (der produktive `INTERNAL_API_KEY`, eine Zeile) nach `C:\caddy\`; die Abbildung einmal mit `sync-hostmap.ps1 -NoReload` füllen.
5. **Prüfungen vor dem ersten Start**: `caddy list-modules` muss das S3-Speichermodul zeigen; `caddy adapt` muss im Speicherblock `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` ausgeben; `caddy validate` muss bestehen.
6. **Dienst**: Installieren Sie ihn über WinSW (Dienst-ID `caddy`, automatischer Neustart bei Fehlern, rotierende Protokolle). Er läuft als LocalSystem, das den IMDS für die Anmeldedaten der Rolle erreicht.
7. **Synchronisationsaufgabe**: Registrieren Sie `CaddyHostmapSync` (SYSTEM, alle 5 Minuten und beim Start, Ausführungslimit 4 Minuten).
8. **Prüfung vor der Umschaltung**: Lösen Sie Domains mit `curl --resolve` auf `127.0.0.1` auf (der Kasten hat keinen echten Verkehr, bevor die EIP umgezogen ist). Eine bestehende Domain muss mit einem übernommenen gültigen Zertifikat ausliefern; `www.` muss 302 liefern; ein unbekannter Host muss per TLS abgewiesen werden; und `Restart-Service caddy` muss ohne manuelles erneutes Vorbereiten wieder ausliefern -- dieser Neustart-Test ist der ganze Zweck des statischen Entwurfs.
9. **Live-Schaltung**: Ordnen Sie die Elastic IP `3.23.251.61` der neuen Instanz zu. Die DNS-Einträge der Kirchen ändern sich nie.

## In der Praxis erprobte Stolpersteine (auf keinen Fall wieder einführen)

| Stolperstein | Symptom | Abhilfe |
|---|---|---|
| `tls_server_name {vars.upstream}` im Transport von reverse_proxy | Jede weitergeleitete Domain liefert 502: Die Platzhalter der Map sind **zur Zeit des TLS-Verbindungsaufbaus leer** ("either ServerName or InsecureSkipVerify must be specified") | Verwenden Sie den platzhalter des Transports selbst: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Doppelte Schlüssel oder Fremdzeilen in `hosts.map` | Der Handler `map` von Caddy **bricht bei einem doppelten Eingabeschlüssel hart ab** -- eine fehlerhafte Zeile kann die gesamte Konfiguration lahmlegen | Das Synchronisationsskript normalisiert Leerzeichen, verwirft fehlerhafte Zeilen (lehnt nur insgesamt ab, wenn mehr als 20 % fehlerhaft sind), entfernt Dubletten (die erste gewinnt) und schreibt UTF-8 **ohne BOM** (ein BOM beschädigt den ersten Schlüssel der map). Auch die API filtert leere Domain-Zeilen und solche mit Leerzeichen an der Quelle |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Die Registrierung der Aufgabe **scheitert stillschweigend** (XML außerhalb des Bereichs, nicht abbrechender Fehler) | Bauen Sie die Wiederholung als CIM-Instanz `MSFT_TaskRepetitionPattern` mit `Interval = "PT5M"` ohne Dauer; ergänzen Sie ein `ExecutionTimeLimit` von 4 Minuten (der erste Lauf als SYSTEM kann bei einer kalten TLS-/CRL-Abfrage hängen) |

:::warning
Die Admin-API bindet nur an `localhost:2019`. Der alte Laufzeitmodus stellte sie aus der Ferne bereit, damit die Mitgliedschafts-API Routenkonfigurationen übertragen konnte; der statische Entwurf braucht keine Übertragungen aus der Ferne, und die kleinere Angriffsfläche ist bewusst gewählt. `caddy reload` (lokal vom Synchronisationsskript ausgeführt) ist der einzige Nutzer der Admin-API.
:::

:::info Alter Laufzeit-Push
`CaddyHelper` in der API (und die Endpunkte `/membership/domains/caddy` + `/caddy/init`) existieren weiterhin als Rückfallpfad zum alten, zur Laufzeit konfigurierten Modus. Sie sollen gelöscht werden, sobald der statische Kasten einige Wochen stabil läuft -- danach sind `authorize` und `hostmap` die einzigen Schnittstellen zur Integration.
:::

## Betrieb

- **Protokolle**: rotierende WinSW-Protokolle in `C:\caddy\` (Ausgabe und Fehler des Dienstes -- Fehler des Reverse-Proxys landen in `caddy-service.err.log`); Verlauf der Synchronisation in `C:\caddy\sync-hostmap.log`.
- **Aktualisierung der Abbildung erzwingen**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Änderung der Konfiguration**: Bearbeiten Sie `C:\caddy\Caddyfile`, danach `caddy validate` + `caddy reload` (oder `Restart-Service caddy` -- Neustarts sind per Entwurf sicher).
- **Massenlöschung von Domains** löst die Schutzprüfung des Synchronisationsskripts gegen Schrumpfung absichtlich aus; verschieben Sie die alte `hosts.map` beiseite und starten Sie die Aufgabe erneut, um eine beabsichtigte große Verkleinerung zu akzeptieren.
- **DNS-Anleitungen für Kirchen bleiben dauerhaft gleich**: Apex `A 3.23.251.61` oder `CNAME proxy.b1.church`.

## Verwandte Seiten

- [Website-Routing & Mehrere Sites](../architecture/websites) — wie die weitergeleitete Anfrage in B1App einer Kirche bzw. Site zugeordnet wird
- [API-Bereitstellung](./apis) — Bereitstellung der Mitgliedschafts-API, die `authorize`/`hostmap` liefert
