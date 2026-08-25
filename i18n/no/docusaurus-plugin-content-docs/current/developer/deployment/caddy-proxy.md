---
title: "Caddy Custom-Domain Proxy"
---

# Caddy Custom-Domain Proxy

<div class="article-intro">

Egendefinerte kirkedomener (`mychurch.org` → kirkens B1-nettsted) avsluttes på en enkelt Windows EC2-boks som kjører Caddy. Boksen eier TLS-sertifikatene, løser hver domene til sitt `{sub}.b1.church`-nettsted, og reverse-proxies med en omskrevet Host-header. Hele konfigurasjonen er to filer -- en statisk `Caddyfile` og en `hosts.map` oppdatert fra Membership API -- slik at den overlever omstarter med null runtime-tilstand.

</div>

For hvordan en forespørsel løser seg til en kirke/nettsted når den når B1App, se [Website Routing & Multi-Site](../architecture/websites).

## Komponenter

| Stykke | Hva det er |
|---|---|
| EC2-instans | Windows Server; Elastic IP **`3.23.251.61`** (bakt inn i kirkenes DNS verden -- IP-en er permanent) |
| `C:\caddy\caddy.exe` | **Egendefinert** Caddy-build med `techknowlogick/certmagic-s3`-lagringsmodul |
| `C:\caddy\Caddyfile` | Hele proxy-konfigurasjonen: on-demand TLS, host→upstream `map` |
| `C:\caddy\hosts.map` | En `{domain} {sub}.b1.church`-linje per rutable domene |
| `sync-hostmap.ps1` + `CaddyHostmapSync`-oppgave | Oppdater `hosts.map` fra API hver 5. min + ved oppstart |
| Windows-tjeneste `caddy` (WinSW-innpakning) | Kjør `caddy.exe run --config`; auto-restart ved feil |
| S3-bøtte `churchapps-caddy-certs` | Delt sertifikatlagring (`region us-east-2`, prefiks `certs`) |
| IAM-rolle `CaddyRole` | Gir instansen S3-tilgang; Caddy bruker AWS default-kredensialskjeden |

## De to API-endepunktene boksen avhenger av

Begge på Membership API.

| Endepunkt | Rolle |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy s **on-demand TLS `ask`-port**: `200 {"authorized":true}` når verten er en rad i `domains` |
| `GET /membership/domains/hostmap` | Kilde av `map`. Returnerer sortert, deduplisert `{domain} {sub}.b1.church`-linjer (nettsted-klar) |

## Forespørsel-flyt

1. Nettleser løser `mychurch.org` → `3.23.251.61` (apex `A`-oppføring eller `CNAME proxy.b1.church`).
2. Caddy avslutter TLS. Sertifikat på hånd i S3 → betjen; ukjent SNI → `authorize` blir spurt; 200 → utstede på etterspørsel via Let's Encrypt; 404 → **håndshaken nektes** (ingen sertifikat, ingen respons).
3. `map` løser verten til `{sub}.b1.church`; `www.{apex}` får en 302 til apexen; en autorisert-men-umappet vert får en ren 404.
4. `reverse_proxy` ringer `{sub}.b1.church:443` med SNI og Host omskrevet til oppstrøms, så Vercel-kanten betjener B1App-nettstedet.
5. Port 80 passerer ACME HTTP-01-utfordringer og 308-omdiriger alt annet til https.

Ny-domene-spredning: et domene som er lagret i B1Admin blir rutbar innen ~5 minutter (synk-oppgaven); sertifikatet blir preget på første HTTPS-slag.

## Felt-testet gotchas (lært på vanskelig måte -- gjør ikke regresjon)

| Gotcha | Symptom | Reparasjon |
|---|---|---|
| `tls_server_name {vars.upstream}` i reverse_proxy-transporten | Hver proxied domene 502s: kartplassholderere løser **tomt ved TLS-dial-tid** | Bruk transporten-innebygd plassholder: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Dupliserte taster eller rotoppføringer i `hosts.map` | Caddy s `map`-handler **hard-feil på en duplisert inputtast** -- en dårlig linje kan ta hele konfigurasjonen ned | Synk-skriptet normaliserer mellomrom, dropper malformede linjer, deduper først-vinn, og skriver **BOM-fri** UTF-8 |
| `Register-ScheduledTask -RepetitionDuration` | Oppgave-registrering **stille mislykkes** | Bygg repetisjon som en `MSFT_TaskRepetitionPattern` CIM-instans med `Interval = "PT5M"` |

## Operasjoner

- **Logs**: WinSW-rullekalder i `C:\caddy\` (service stdout/err); synk-historie i `C:\caddy\sync-hostmap.log`.
- **Force a map refresh**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Config change**: rediger `C:\caddy\Caddyfile`, deretter `caddy validate` + `caddy reload`.
- **DNS-instruksjoner for kirker er uendret for alltid**: apex `A 3.23.251.61` eller `CNAME proxy.b1.church`.

