---
title: "Caddy Custom-Domain Proxy"
---

# Caddy Custom-Domain Proxy

<div class="article-intro">

Ang mga custom church domains (`mychurch.org` → ang website ng church's B1) ay nagtatapos sa isang single Windows EC2 box na tumatakbo ng Caddy. Ang box ay nagmamay-ari ng TLS certificates, nagresolba ng bawat domain sa `{sub}.b1.church` site nito, at reverse-proxies na may rewritten Host header. Ang buong configuration nito ay dalawang files — isang static `Caddyfile` at isang `hosts.map` na nag-refresh mula sa Membership API — kaya ito ay nakakaligtas sa restarts na walang runtime state. Ang pahinang ito ay sumasaklaw kung paano ang box ay binuo mula sa simula, kung paano ito gumagana, at ang field-tested gotchas na susugutin ang sinuman na muling bubuo nito.

</div>

Para sa kung paano ang request ay nagresolba sa isang church/site kapag ito ay umaabot sa B1App, tingnan ang [Website Routing & Multi-Site](../architecture/websites).

## Mga Bahagi

| Piece | Ano ito |
|---|---|
| EC2 instance | Windows Server; Elastic IP **`3.23.251.61`** (baked sa church DNS sa buong mundo — ang IP ay permanent, ang mga instances ay disposable) |
| `C:\caddy\caddy.exe` | **Custom** Caddy build na may `techknowlogick/certmagic-s3` storage module — ang stock Caddy ay hindi maaaring magbasa ng cert store |
| `C:\caddy\Caddyfile` | Ang buong proxy config: on-demand TLS, host→upstream `map`, www→apex redirects, `:80`→https |
| `C:\caddy\hosts.map` | Isang `{domain} {sub}.b1.church` line bawat routable domain, na imported sa Caddyfile's `map` block |
| `sync-hostmap.ps1` + `CaddyHostmapSync` task | Scheduled task (bawat 5 min + sa boot, bilang SYSTEM) ay nag-refresh ng `hosts.map` mula sa API at nag-gracefully reload ng Caddy lamang sa pagbabago |
| Windows service `caddy` (WinSW wrapper) | Tumatakbo ng `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; auto-restart sa failure. Ang Caddy ay hindi SCM-aware, kaya ang wrapper ay kinakailangan |
| S3 bucket `churchapps-caddy-certs` | Shared certificate storage (`region us-east-2`, prefix `certs`) — ang mga certs ay nakakaligtas sa instance rebuilds |
| IAM role `CaddyRole` | Nagbibigay ng instance S3 access; ang Caddy ay gumagamit ng AWS default credential chain (walang keys sa config) |

## Ang dalawang API endpoints na ang box ay nakadepende

Pareho ay anonymous, sa Membership API:

| Endpoint | Papel |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Ang Caddy's **on-demand TLS `ask` gate**: `200 {"authorized":true}` kapag ang host (o, para sa `www.` host, ang apex nito) ay isang row sa `domains`; `404` kung hindi. Ito ay ang abuse control — ang Caddy ay hindi magbibigay ng certificate para sa host na ang endpoint na ito ay tinatanggihan |
| `GET /membership/domains/hostmap` | `text/plain`, sorted, deduplicated `{domain} {sub}.b1.church` lines (site-aware: isang domain na nakatalagang secondary site ay nag-dial ng site's subdomain nito). Source ng `map` |

## Request flow

1. Ang browser ay nagresolba `mychurch.org` → `3.23.251.61` (apex `A` record, o `CNAME proxy.b1.church`).
2. Ang Caddy ay nagtatapos TLS. Certificate sa kamay sa S3 → maglingkod; unknown SNI → `authorize` ay itatanong; 200 → issue on demand sa pamamagit ng Let's Encrypt; 404 → **ang handshake ay tinatanggihan** (walang certificate, walang response — isang unknown host ay nakakakuha ng TLS-refused, hindi isang HTTP error).
3. Ang `map` ay nagresolba ng Host sa `{sub}.b1.church`; `www.{apex}` ay nakakakuha ng 302 sa apex; isang authorized-but-unmapped host (isang brand-new domain sa loob ng ≤5-minuto sync window) ay nakakakuha ng clean 404.
4. Ang `reverse_proxy` ay nag-dial ng `{sub}.b1.church:443` na may SNI at Host na muling isinulat sa upstream, kaya ang Vercel's edge ay nagsisilbi ng B1App site.
5. Ang Port 80 ay pumipigil sa ACME HTTP-01 challenges at 308-nag-redirect ng lahat ng iba sa https.

Ang bagong domain propagation: isang domain na na-save sa B1Admin ay nagiging routable sa loob ng ~5 minuto (ang sync task); ang certificate nito ay na-mint sa unang HTTPS hit.

## Pagbuo ng box mula sa simula

Naka-condense mula sa field-tested procedure (buong step-by-step na may copy-paste commands ay nabubuhay sa ops workspace, hindi repo na ito). Prerequisites muna — ang build ay patay nang wala sila:

1. **IAM**: i-attach ang `CaddyRole` (S3 access sa cert bucket) sa instance. I-verify sa pamamagit ng IMDSv2 mula sa box — tandaan ang bare IMDS GET na nagbabalik ng 401 ay nangangahulugang IMDSv2 ay ipinapahigpit, hindi "walang papel".
2. **API health**: ang `authorize` ay dapat magbalik ng 404 para sa bogus domain at `hostmap` ay dapat magbalik ng 200 bago ang anumang iba.

Pagkatapos:

3. **Binary**: i-download ang custom build mula sa Caddy's build service — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB vs ~45 MB stock; v2.11.4 sa oras ng pagsusulat). Ang module choice ay mahalaga: `techknowlogick/certmagic-s3` ay gumagamit ng `bucket`/`region`/`prefix` keys na tumutugma sa existing cert layout; ang `ss098` fork ay gumagamit ng `host`/`endpoint` at **hindi** makakahanap ng existing certificates.
4. **Files**: `Caddyfile` + `sync-hostmap.ps1` sa `C:\caddy\`; i-seed ang map minsan na may `sync-hostmap.ps1 -NoReload`.
5. **Gates bago ang unang start**: ang `caddy list-modules` ay dapat ipakita ang s3 storage module; ang `caddy adapt` ay dapat mag-emit ng `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` sa storage block nito; ang `caddy validate` ay dapat magpasa.
6. **Service**: i-install sa pamamagit ng WinSW (service id `caddy`, auto-restart sa failure, rolling logs). Tumatakbo bilang LocalSystem, na umaabot sa IMDS para sa role credentials.
7. **Sync task**: i-register `CaddyHostmapSync` (SYSTEM, bawat 5 min + sa startup, 4-minute execution limit).
8. **I-verify pre-cutover** sa pamamagit ng force-resolving domains sa `127.0.0.1` na may `curl --resolve` (ang box ay walang tunay na traffic hanggang ang EIP ay umaalis): isang existing domain ay dapat maglingkod na may valid carried-over cert; ang `www.` ay dapat 302; isang unknown host ay dapat TLS-refused; at ang `Restart-Service caddy` ay dapat bumalik na nagsisilbi **na walang manual re-priming** — ang restart test na ito ay ang buong punto ng static design.
9. **Go-live**: muling i-associate ang Elastic IP `3.23.251.61` sa bagong instance. Ang church DNS ay hindi kailanman nagbabago.

## Field-tested gotchas (natuto nang mahirap — huwag mag-regress)

| Gotcha | Symptom | Fix |
|---|---|---|
| `tls_server_name {vars.upstream}` sa reverse_proxy transport | Bawat proxied domain ay 502s: ang map placeholders ay nagresolba **empty sa TLS-dial time** ("either ServerName o InsecureSkipVerify ay dapat na ma-specify") | Gamitin ang transport-native placeholder: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Duplicate keys o junk lines sa `hosts.map` | Ang Caddy's `map` handler ay **hard-errors sa duplicate input key** — isang masayang linya ay maaaring dalhin ang buong config pababa | Ang sync script ay nag-normalize ng whitespace, nag-drop ng malformed lines (tinatanggihan nang pandaigdig kung >20% ay masama), nag-dedup first-wins, at nagsusulat ng **BOM-free** UTF-8 (isang BOM ay nag-corrupt ng unang map key). Ang API ay nag-filter din ng empty/space-containing domain rows sa source |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Task registration ay **tahimik na nabigo** (out-of-range XML, non-terminating error) | Itayo ang repetition bilang `MSFT_TaskRepetitionPattern` CIM instance na may `Interval = "PT5M"` at walang duration; magdagdag ng 4-minute `ExecutionTimeLimit` (ang unang SYSTEM run ay maaaring mag-hang sa cold TLS/CRL lookup) |

:::warning
Ang admin API ay nag-bind sa `localhost:2019` lamang. Ang legacy runtime mode ay nag-expose nito nang malayo kaya ang Membership API ay maaaring mag-push ng route configs; ang static design ay walang pangangailangan para sa remote pushes, at ang mas maliit na surface ay sinandig. Ang `caddy reload` (tumatakbo nang lokal ng sync script) ay ang tanging admin-API consumer.
:::

:::info Legacy runtime push
Ang `CaddyHelper` sa API (at ang `/membership/domains/caddy` + `/caddy/init` endpoints) ay umiiral pa rin bilang ang rollback path sa lumang runtime-configured mode. Sila ay naka-schedule para sa deletion kapag ang static box ay maging stable na ng ilang linggo — pagkatapos nito, `authorize` + `hostmap` ay ang tanging integration points.
:::

## Operasyon

- **Logs**: WinSW rolling logs sa `C:\caddy\` (service stdout/err — ang reverse-proxy errors ay lumilitaw sa `caddy-service.err.log`); sync history sa `C:\caddy\sync-hostmap.log`.
- **Force a map refresh**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Config change**: i-edit ang `C:\caddy\Caddyfile`, pagkatapos `caddy validate` + `caddy reload` (o `Restart-Service caddy` — ang restarts ay ligtas sa design).
- **Mass domain deletion** ay nag-trigger ng sync script's shrink guard sa design; ilipat ang lumang `hosts.map` at ilayo at i-run muli ang task upang tumanggap ng sinandig na malaking shrink.
- **DNS instructions para sa mga simbahan ay hindi nagbabago magpakailanman**: apex `A 3.23.251.61` o `CNAME proxy.b1.church`.

## Mga Kaugnay na Pahina

- [Website Routing & Multi-Site](../architecture/websites) — kung paano ang proxied request ay nagresolba sa church/site sa B1App
- [API Deployment](./apis) — pagda-deploy ng Membership API na nagsisilbi ng `authorize`/`hostmap`
