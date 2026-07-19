---
title: "Caddy Custom-Domain-Proxy"
---

# Caddy Custom-Domain-Proxy

<div class="article-intro">

Eigene Kirchendomains (`mychurch.org` → die B1-Website der Kirche) terminieren bei einer einzelnen Windows-EC2-Box, auf der Caddy läuft. Die Box besitzt die TLS-Zertifikate, löst jede Domain auf ihre `{sub}.b1.church`-Site auf und reverse-proxyt mit neu geschriebenem Host-Header. Ihre gesamte Konfiguration besteht aus zwei Dateien — einer statischen `Caddyfile` und einer `hosts.map`, die von der Membership-API aufgefrischt wird — sodass sie Neustarts mit null Laufzeitzustand übersteht. Diese Seite behandelt, wie die Box von Grund auf gebaut wird, wie sie im Betrieb funktioniert, und die feldgetesteten Fallstricke, die jeden beißen, der sie neu aufbaut.

</div>

Wie eine Anfrage zu einer Kirche/Site aufgelöst wird, sobald sie B1App erreicht, siehe [Website-Routing & Multi-Site](../architecture/websites).

## Komponenten

| Teil | Was es ist |
|---|---|
| EC2-Instanz | Windows Server; Elastic IP **`3.23.251.61`** (weltweit fest in der Kirchen-DNS verankert — die IP ist dauerhaft, Instanzen sind verbrauchbar) |
| `C:\caddy\caddy.exe` | **Eigener** Caddy-Build mit dem Speichermodul `techknowlogick/certmagic-s3` — Standard-Caddy kann den Zertifikatsspeicher nicht lesen |
| `C:\caddy\Caddyfile` | Die gesamte Proxy-Konfiguration: On-Demand-TLS, Host→Upstream-`map`, www→Apex-Weiterleitungen, `:80`→https |
| `C:\caddy\hosts.map` | Eine Zeile `{domain} {sub}.b1.church` pro routbarer Domain, importiert in den `map`-Block der Caddyfile |
| `sync-hostmap.ps1` + `CaddyHostmapSync`-Task | Geplante Aufgabe (alle 5 Min + beim Booten, als SYSTEM), die `hosts.map` von der API auffrischt und Caddy nur bei Änderung sanft neu lädt |
| Windows-Dienst `caddy` (WinSW-Wrapper) | Führt `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` aus; automatischer Neustart bei Fehler. Caddy ist nicht SCM-fähig, daher ist ein Wrapper erforderlich |
| S3-Bucket `churchapps-caddy-certs` | Gemeinsamer Zertifikatsspeicher (`region us-east-2`, Präfix `certs`) — Zertifikate überstehen Instanz-Neuerstellungen |
| IAM-Rolle `CaddyRole` | Gewährt der Instanz S3-Zugriff; Caddy nutzt die AWS-Standard-Credential-Chain (keine Schlüssel in der Konfiguration) |

## Die beiden API-Endpunkte, von denen die Box abhängt

Beide sind anonym, auf der Membership-API:

| Endpunkt | Rolle |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddys **On-Demand-TLS-`ask`-Gate**: `200 {"authorized":true}`, wenn der Host (oder bei einem `www.`-Host dessen Apex) eine Zeile in `domains` ist; sonst `404`. Dies ist die Missbrauchskontrolle — Caddy stellt kein Zertifikat für einen Host aus, den dieser Endpunkt ablehnt |
| `GET /membership/domains/hostmap` | `text/plain`, sortierte, deduplizierte `{domain} {sub}.b1.church`-Zeilen (site-bewusst: eine einer sekundären Site zugewiesene Domain wählt die Subdomain dieser Site). Quelle der `map` |

## Anfragefluss

1. Der Browser löst `mychurch.org` → `3.23.251.61` auf (Apex-`A`-Eintrag oder `CNAME proxy.b1.church`).
2. Caddy terminiert TLS. Zertifikat vorhanden in S3 → ausliefern; unbekannte SNI → `authorize` wird abgefragt; 200 → Ausstellung on demand via Let's Encrypt; 404 → **der Handshake wird verweigert** (kein Zertifikat, keine Antwort — ein unbekannter Host bekommt TLS-Verweigerung, keinen HTTP-Fehler).
3. Die `map` löst den Host auf `{sub}.b1.church` auf; `www.{apex}` erhält ein 302 zum Apex; ein autorisierter, aber noch nicht gemappter Host (eine brandneue Domain innerhalb des ≤5-minütigen Sync-Fensters) erhält ein sauberes 404.
4. `reverse_proxy` wählt `{sub}.b1.church:443` mit SNI und neu geschriebenem Host für den Upstream, sodass Vercels Edge die B1App-Site ausliefert.
5. Port 80 lässt ACME-HTTP-01-Challenges durch und leitet alles andere per 308 auf https um.

Propagation neuer Domains: Eine in B1Admin gespeicherte Domain wird innerhalb von ~5 Minuten routbar (der Sync-Task); ihr Zertifikat wird beim ersten HTTPS-Zugriff geprägt.

## Die Box von Grund auf bauen

Verdichtet aus der feldgetesteten Prozedur (die vollständige Schritt-für-Schritt-Anleitung mit Copy-Paste-Befehlen liegt im Ops-Workspace, nicht in diesem Repository). Zunächst die Voraussetzungen — ohne sie ist der Build zum Scheitern verurteilt:

1. **IAM**: `CaddyRole` (S3-Zugriff auf den Zertifikats-Bucket) an die Instanz anhängen. Über IMDSv2 von der Box aus verifizieren — beachten Sie, dass ein nackter IMDS-GET mit 401 nur bedeutet, dass IMDSv2 erzwungen wird, nicht „keine Rolle".
2. **API-Health**: `authorize` muss für eine unechte Domain 404 liefern und `hostmap` muss 200 liefern, bevor irgendetwas anderes geschieht.

Danach:

3. **Binary**: einen eigenen Build vom Build-Service von Caddy herunterladen — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB vs. ~45 MB Standard; v2.11.4 zum Zeitpunkt der Erstellung). Die Modulwahl ist entscheidend: `techknowlogick/certmagic-s3` verwendet die Schlüssel `bucket`/`region`/`prefix`, passend zum bestehenden Zertifikatslayout; der Fork `ss098` verwendet `host`/`endpoint` und findet die vorhandenen Zertifikate **nicht**.
4. **Dateien**: `Caddyfile` + `sync-hostmap.ps1` nach `C:\caddy\`; die Map einmalig mit `sync-hostmap.ps1 -NoReload` befüllen.
5. **Gates vor dem ersten Start**: `caddy list-modules` muss das S3-Speichermodul anzeigen; `caddy adapt` muss `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` in seinem Storage-Block ausgeben; `caddy validate` muss bestehen.
6. **Dienst**: über WinSW installieren (Dienst-ID `caddy`, automatischer Neustart bei Fehler, rotierende Logs). Läuft als LocalSystem, wodurch IMDS für die Rollen-Zugangsdaten erreichbar ist.
7. **Sync-Task**: `CaddyHostmapSync` registrieren (SYSTEM, alle 5 Min + beim Start, 4-Minuten-Ausführungslimit).
8. **Vor der Umschaltung verifizieren**, indem Domains per `curl --resolve` gewaltsam auf `127.0.0.1` aufgelöst werden (die Box hat noch keinen echten Traffic, bis die EIP umzieht): eine bestehende Domain muss mit einem gültigen, übernommenen Zertifikat ausliefern; `www.` muss 302 liefern; ein unbekannter Host muss TLS-verweigert werden; und `Restart-Service caddy` muss **ohne manuelles Neuprimen** wieder funktionieren — dieser Neustart-Test ist der gesamte Sinn des statischen Designs.
9. **Go-Live**: die Elastic IP `3.23.251.61` der neuen Instanz neu zuordnen. Die Kirchen-DNS ändert sich nie.

## Feldgetestete Fallstricke (schmerzhaft gelernt — nicht regressieren lassen)

| Fallstrick | Symptom | Behebung |
|---|---|---|
| `tls_server_name {vars.upstream}` im reverse_proxy-Transport | Jede geproxyte Domain liefert 502: Map-Platzhalter lösen **zum Zeitpunkt des TLS-Dial leer auf** („either ServerName or InsecureSkipVerify must be specified") | Den transport-nativen Platzhalter verwenden: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Doppelte Schlüssel oder unbrauchbare Zeilen in `hosts.map` | Caddys `map`-Handler **bricht bei einem doppelten Eingabeschlüssel hart ab** — eine schlechte Zeile kann die gesamte Konfiguration lahmlegen | Das Sync-Skript normalisiert Whitespace, verwirft fehlerhafte Zeilen (verwirft nur vollständig, wenn >20 % fehlerhaft sind), dedupliziert nach „first wins" und schreibt **BOM-freies** UTF-8 (ein BOM verfälscht den ersten Map-Schlüssel). Die API filtert leere/leerzeichenhaltige Domain-Zeilen zudem bereits an der Quelle |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Die Task-Registrierung **schlägt lautlos fehl** (XML außerhalb des gültigen Bereichs, nicht-terminierender Fehler) | Die Wiederholung als `MSFT_TaskRepetitionPattern`-CIM-Instanz mit `Interval = "PT5M"` und ohne Dauer bauen; ein 4-Minuten-`ExecutionTimeLimit` hinzufügen (der erste SYSTEM-Lauf kann bei einer kalten TLS-/CRL-Abfrage hängen bleiben) |

:::warning
Die Admin-API bindet nur an `localhost:2019`. Der alte Laufzeitmodus exponierte sie remote, damit die Membership-API Routenkonfigurationen pushen konnte; das statische Design benötigt keine Remote-Pushes, und die kleinere Angriffsfläche ist beabsichtigt. `caddy reload` (lokal vom Sync-Skript ausgeführt) ist der einzige Konsument der Admin-API.
:::

:::info Alter Laufzeit-Push
`CaddyHelper` in der API (sowie die Endpunkte `/membership/domains/caddy` + `/caddy/init`) existieren weiterhin als Rollback-Pfad zum alten laufzeitkonfigurierten Modus. Sie sind zur Löschung vorgesehen, sobald die statische Box ein paar Wochen stabil gelaufen ist — danach sind `authorize` + `hostmap` die einzigen Integrationspunkte.
:::

## Betrieb

- **Logs**: rotierende WinSW-Logs in `C:\caddy\` (Dienst-stdout/err — Reverse-Proxy-Fehler landen in `caddy-service.err.log`); Sync-Historie in `C:\caddy\sync-hostmap.log`.
- **Map-Refresh erzwingen**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Konfigurationsänderung**: `C:\caddy\Caddyfile` bearbeiten, dann `caddy validate` + `caddy reload` (oder `Restart-Service caddy` — Neustarts sind laut Design sicher).
- **Massenlöschung von Domains** löst den Schrumpf-Schutz des Sync-Skripts absichtlich aus; die alte `hosts.map` beiseitelegen und den Task erneut ausführen, um eine beabsichtigte große Schrumpfung zu akzeptieren.
- **DNS-Anweisungen für Kirchen bleiben für immer unverändert**: Apex `A 3.23.251.61` oder `CNAME proxy.b1.church`.

## Verwandte Seiten

- [Website-Routing & Multi-Site](../architecture/websites) — wie die geproxyte Anfrage zu einer Kirche/Site in B1App aufgelöst wird
- [API-Deployment](./apis) — Deployment der Membership-API, die `authorize`/`hostmap` bereitstellt
</content>
