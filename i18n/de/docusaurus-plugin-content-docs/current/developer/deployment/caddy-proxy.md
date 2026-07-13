---
title: "Caddy Custom-Domain Proxy"
---

# Caddy Custom-Domain Proxy

<div class="article-intro">

Benutzerdefinierte Kirchen-Domains (`mychurch.org` → Website der Gemeinde B1) enden an einer einzelnen Windows-EC2-Box, die Caddy ausführt. Die Box besitzt die TLS-Zertifikate, löst jede Domain auf ihre `{sub}.b1.church` Site auf und reverse-proxy mit einem umgeschriebenen Host-Header. Die gesamte Konfiguration ist zwei Dateien — eine statische `Caddyfile` und eine `hosts.map`, die von der Membership API aktualisiert wird — daher überlebt sie Neustarts mit null Laufzeit-Status. Diese Seite zeigt, wie die Box von Grund auf gebaut wird, wie sie funktioniert und die Feld-getesteten Fehler, die jeden beißen werden, der sie neu aufbaut.

</div>

## Komponenten

| Stück | Was ist es |
|---|---|
| EC2 Instanz | Windows Server; Elastic IP **`3.23.251.61`** |
| `C:\caddy\caddy.exe` | **Benutzerdefinierte** Caddy-Konstruktion mit `techknowlogick/certmagic-s3` Speicher-Modul |
| `C:\caddy\Caddyfile` | Die gesamte Proxy-Konfiguration |
| `C:\caddy\hosts.map` | Eine `{domain} {sub}.b1.church` Zeile pro routbare Domain |
| `sync-hostmap.ps1` + Task | Aufgabe (alle 5 Min + beim Boot) aktualisiert die Karte |
| Windows Service `caddy` (WinSW) | Läuft `caddy.exe run` |
| S3 Bucket | Gemeinsamer Zertifikats-Speicher |
| IAM Rolle | Gewährt Instanz-S3-Zugriff |

## Zwei API-Endpoints

| Endpoint | Rolle |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy's **On-Demand TLS `ask` Gate** |
| `GET /membership/domains/hostmap` | Host→Upstream-Karte |

## Anfrage-Flow

1. Browser löst `mychurch.org` → `3.23.251.61` auf
2. Caddy beendete TLS; Cert im S3 → servieren; unbekannter SNI → `authorize` fragen; 200 → ausgeben; `404` → TLS-abgelehnt
3. `map` löst Host → `{sub}.b1.church` auf; `www.` → 302 redirect; unbekannter Host → sauberer `404`
4. `reverse_proxy` dials `{sub}.b1.church:443` mit Upstream Host umgeschrieben
5. Port 80 leitet ACME-Herausforderungen und 308-alles-andere zu https weiter

Neue Domain-Propagation: eine in B1Admin gespeicherte Domain wird innerhalb ~ 5 Minuten routbar (die Sync-Aufgabe).

## Box bauen von Grund auf

Kondensiert aus dem Feld-getesteten Verfahren:

1. **IAM**: `CaddyRole` an die Instanz anhängen
2. **API-Gesundheit**: Prüfe `authorize` und `hostmap` Endpoints
3. **Binär**: Herunterladen vom Caddy Build Service mit dem `certmagic-s3` Modul
4. **Dateien**: `Caddyfile` + `sync-hostmap.ps1` in `C:\caddy\`
5. **Gates**: `caddy list-modules`, `caddy adapt`, `caddy validate`
6. **Service**: Installiere via WinSW (Auto-Restart)
7. **Sync-Aufgabe**: Registriere `CaddyHostmapSync`
8. **Überprüfe vor Go-Live**: Force-Domains zu `127.0.0.1`; teste Restart ohne Neukonfiguration
9. **Live**: Reassociate Elastic IP zu neuer Instanz

## Feld-getestete Fehler

| Fehler | Symptom | Fix |
|---|---|---|
| `tls_server_name {vars.upstream}` | Jede Domain 502s | Verwende `tls_server_name {http.reverse_proxy.upstream.host}` |
| Dup-Keys in `hosts.map` | Caddy hart-Error auf Dup-Input-Schlüssel | Sync-Skript normalisiert, dedupliziert, BOM-frei UTF-8 |
| `Register-ScheduledTask -RepetitionDuration` | Registrierung **still fehlgeschlagen** | Build Repetition als CIM-Instanz |

## Operationen

- **Logs**: WinSW rolling logs in `C:\caddy\`
- **Karte erzwingen zu aktualisieren**: `Start-ScheduledTask -TaskName CaddyHostmapSync`
- **Config-Änderung**: Edit `Caddyfile`, dann `caddy reload`
- **DNS-Anweisungen** unveränderlich: apex `A 3.23.251.61` oder `CNAME proxy.b1.church`

## Verwandte Artikel

- [Website-Routing & Multi-Site](../architecture/websites) — Wie die proxied Anfrage zu einer Gemeinde/Site löst
- [API-Bereitstellung](./apis) — Bereitstellung der Membership API
