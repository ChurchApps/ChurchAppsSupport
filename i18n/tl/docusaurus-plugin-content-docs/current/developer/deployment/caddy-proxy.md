---
title: "Caddy Custom-Domain Proxy"
description: "I-build at patakbuhin ang Caddy reverse proxy para sa custom domain ng B1.church site, sakop ang TLS certificate, host mapping, at mga pitfall."
---

# Caddy Custom-Domain Proxy

<div class="article-intro">

Ang mga custom na domain ng simbahan (`mychurch.org` → ang B1 website ng simbahan) ay nagtatapos sa iisang Windows EC2 box na nagpapatakbo ng Caddy. Ang box ang may-ari ng mga TLS certificate, nireresolba ang bawat domain papunta sa `{sub}.b1.church` na site nito, at nagre-reverse-proxy gamit ang binagong header na Host. Dalawang file lang ang buong configuration nito -- isang static na `Caddyfile` at isang `hosts.map` na nire-refresh mula sa Membership API -- kaya nabubuhay ito sa mga restart nang walang runtime state. Sakop ng pahinang ito kung paano binubuo ang box mula sa simula, kung paano ito pinapatakbo, at ang mga bitag na nasubukan na sa field na tatama sa sinumang mag-a-rebuild nito.

</div>

Para sa kung paano nireresolba ang request sa isang simbahan/site kapag nakarating na ito sa B1App, tingnan ang [Website Routing & Multi-Site](../architecture/websites.md).

## Mga bahagi

| Bahagi | Ano ito |
|---|---|
| EC2 instance | Windows Server; Elastic IP **`3.23.251.61`** (nakabaon sa DNS ng mga simbahan sa buong mundo -- permanente ang IP, maaaring itapon ang mga instance) |
| `C:\caddy\caddy.exe` | **Custom** na build ng Caddy na may storage module na `techknowlogick/certmagic-s3` -- hindi mababasa ng stock na Caddy ang cert store |
| `C:\caddy\Caddyfile` | Ang buong config ng proxy: on-demand TLS, `map` ng host→upstream, redirect ng www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Isang linyang `{domain} {sub}.b1.church` kada routable na domain, na ini-import sa `map` block ng Caddyfile |
| `sync-hostmap.ps1` + task na `CaddyHostmapSync` | Scheduled task (kada 5 minuto + sa boot, bilang SYSTEM) na nagre-refresh ng `hosts.map` mula sa API at maayos na nagre-reload ng Caddy lang kapag may pagbabago |
| Windows service `caddy` (WinSW wrapper) | Pinapatakbo ang `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; awtomatikong nagre-restart kapag pumalya. Hindi SCM-aware ang Caddy, kaya kailangan ang wrapper |
| S3 bucket `churchapps-caddy-certs` | Shared na imbakan ng certificate (`region us-east-2`, prefix `certs`) -- nananatili ang mga cert kahit i-rebuild ang instance |
| IAM role `CaddyRole` | Nagbibigay ng S3 access sa instance; ginagamit ng Caddy ang default na credential chain ng AWS (walang key sa config) |

## Ang dalawang API endpoint na kailangan ng box

Parehong nasa Membership API. Anonymous ang `authorize`; ang `hostmap` ay nangangailangan ng header na `x-internal-key: <INTERNAL_API_KEY>` mula pa noong Api PR #67 (2026-08-16) -- binabasa ito ng `sync-hostmap.ps1` mula sa `C:\caddy\internal-key.txt`:

| Endpoint | Papel |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Ang **on-demand TLS `ask` gate** ng Caddy: `200 {"authorized":true}` kapag ang host (o, para sa host na `www.`, ang apex nito) ay row sa `domains`; `404` kung hindi. Ito ang abuse control -- hindi maglalabas ng certificate ang Caddy para sa host na tinatanggihan ng endpoint na ito |
| `GET /membership/domains/hostmap` | Nangangailangan ng `x-internal-key` (o JWT ng server-admin). `text/plain`, sorted, deduplicated na mga linyang `{domain} {sub}.b1.church` (site-aware: ang domain na itinalaga sa pangalawang site ay tumatawag sa subdomain ng site na iyon). Pinagmumulan ng `map` |

## Daloy ng request

1. Nireresolba ng browser ang `mychurch.org` → `3.23.251.61` (apex na `A` record, o `CNAME proxy.b1.church`).
2. Tinatapos ng Caddy ang TLS. Kung nasa S3 ang certificate → ihahain; kung hindi kilalang SNI → tinatanong ang `authorize`; 200 → ibibigay on demand sa pamamagitan ng Let's Encrypt; 404 → **tinatanggihan ang handshake** (walang certificate, walang tugon -- ang hindi kilalang host ay TLS-refused, hindi HTTP error).
3. Nireresolba ng `map` ang Host papunta sa `{sub}.b1.church`; ang `www.{apex}` ay nakakakuha ng 302 papunta sa apex; ang authorized-pero-hindi-pa-namamapa na host (isang bagong domain sa loob ng ≤5-minutong sync window) ay nakakakuha ng malinis na 404.
4. Dinadaungan ng `reverse_proxy` ang `{sub}.b1.church:443` na may SNI at Host na nire-rewrite sa upstream, kaya inihahain ng edge ng Vercel ang site ng B1App.
   Ipinapadala rin ng Caddy ang orihinal na domain ng bisita bilang `X-Church-Host` (ina-overwrite ng Vercel ang `X-Forwarded-Host` ng nire-rewrite na Host). Tinatanggap ito ng middleware ng B1App kapag minamapa ito ng `/domains/public/lookup/{host}` sa parehong `{sub}` ng request host, pagkatapos ay inilalantad bilang `x-public-host` para sa canonical na header na `Link`, `robots.txt`, at `sitemap.xml`; palaging tinatanggal ang `x-public-host` na ipinadala ng client. Gumagamit pa rin ang `ChurchJsonLd` ng schema.org ng URL na `b1.church` (ang pagbabasa ng header doon ay gagawing dynamic ang mga pahina).
5. Pumapasa ang port 80 sa mga ACME HTTP-01 challenge at nagre-redirect ng 308 sa https ang lahat ng iba pa.

Propagation ng bagong domain: ang domain na sine-save sa B1Admin ay nagiging routable sa loob ng ~5 minuto (ang sync task); ang certificate nito ay minimint sa unang HTTPS hit.

## Pagbuo ng box mula sa simula

Pinaikli mula sa field-tested na procedure (ang kumpletong hakbang-hakbang na may copy-paste na command ay nasa ops workspace, hindi sa repo na ito). Mga prerequisite muna -- wala ang mga ito, patay ang build:

1. **IAM**: ikabit ang `CaddyRole` (S3 access sa cert bucket) sa instance. I-verify sa pamamagitan ng IMDSv2 mula sa box -- tandaan na ang bare na IMDS GET na nagbabalik ng 401 ay nangangahulugang ipinapatupad ang IMDSv2, hindi "walang role".
2. **Health ng API**: dapat magbalik ng 404 ang `authorize` para sa pekeng domain at 200 ang `hostmap` (kasama ang header na `x-internal-key`) bago ang anumang iba pa.

Pagkatapos:

3. **Binary**: mag-download ng custom na build mula sa build service ng Caddy -- `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB kumpara sa ~45 MB ng stock; v2.11.4 sa oras ng pagsulat). Mahalaga ang pagpili ng module: ang `techknowlogick/certmagic-s3` ay gumagamit ng mga key na `bucket`/`region`/`prefix` na tumutugma sa umiiral na layout ng cert; ang fork na `ss098` ay gumagamit ng `host`/`endpoint` at **hindi** makakahanap ng umiiral na mga certificate.
4. **Mga file**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (ang prod `INTERNAL_API_KEY`, isang linya) sa `C:\caddy\`; i-seed ang map nang isang beses gamit ang `sync-hostmap.ps1 -NoReload`.
5. **Mga gate bago ang unang start**: dapat ipakita ng `caddy list-modules` ang s3 storage module; dapat maglabas ng `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` ang `caddy adapt` sa storage block nito; dapat pumasa ang `caddy validate`.
6. **Service**: i-install sa pamamagitan ng WinSW (service id `caddy`, auto-restart sa pagkabigo, rolling logs). Tumatakbo bilang LocalSystem, na nakakarating sa IMDS para sa role credential.
7. **Sync task**: irehistro ang `CaddyHostmapSync` (SYSTEM, kada 5 minuto + sa startup, 4-minutong execution limit).
8. **I-verify bago ang cutover** sa pamamagitan ng sapilitang pag-resolve ng mga domain sa `127.0.0.1` gamit ang `curl --resolve` (walang totoong trapiko ang box hangga't hindi lumilipat ang EIP): dapat maihain ang umiiral na domain na may dalang valid na cert; dapat mag-302 ang `www.`; dapat TLS-refused ang hindi kilalang host; at dapat bumalik sa paghahain ang `Restart-Service caddy` **nang walang manual na re-priming** -- ang restart test na iyon ang buong punto ng static na disenyo.
9. **Go-live**: i-reassociate ang Elastic IP na `3.23.251.61` sa bagong instance. Hindi kailanman nagbabago ang DNS ng simbahan.

## Mga bitag na nasubukan na sa field (natutunan sa mahirap na paraan -- huwag ulitin)

| Bitag | Sintomas | Ayos |
|---|---|---|
| `tls_server_name {vars.upstream}` sa transport ng reverse_proxy | Bawat domain na pine-proxy ay nagbibigay ng 502: ang map placeholder ay nagre-resolve na **walang laman sa oras ng TLS dial** ("either ServerName or InsecureSkipVerify must be specified") | Gamitin ang placeholder na katutubo sa transport: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Mga duplicate na key o sirang linya sa `hosts.map` | **Mahigpit na nagbabagsak** ang `map` handler ng Caddy sa duplicate na input key -- ang iisang masamang linya ay maaaring magpabagsak sa buong config | Ang sync script ay nagnonormalize ng whitespace, nag-aalis ng malformed na linya (tinatanggihan nang buo lang kung >20% ang masama), nag-dedupe na first-wins, at sumusulat ng UTF-8 na **walang BOM** (sisirain ng BOM ang unang map key). Nagfi-filter din ang API ng walang-lamang/may-espasyong domain row sa pinagmulan |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Tahimik na **pumapalya** ang pagrerehistro ng task (XML na wala sa saklaw, hindi terminating na error) | Buuin ang repetition bilang CIM instance ng `MSFT_TaskRepetitionPattern` na may `Interval = "PT5M"` at walang duration; magdagdag ng 4-minutong `ExecutionTimeLimit` (ang unang SYSTEM run ay maaaring mabitin sa malamig na TLS/CRL lookup) |

:::warning
Nakabind lang sa `localhost:2019` ang admin API. Inilantad ito nang malayuan ng legacy runtime mode para maitulak ng Membership API ang mga route config; hindi kailangan ng static na disenyo ang mga remote push, at sinadya ang mas maliit na surface. Ang `caddy reload` (pinapatakbo nang lokal ng sync script) ang tanging consumer ng admin API.
:::

:::info Legacy na runtime push
Nananatili ang `CaddyHelper` sa API (at ang mga endpoint na `/membership/domains/caddy` + `/caddy/init`) bilang rollback path papunta sa lumang runtime-configured na mode. Nakatakda silang burahin kapag naging matatag na ang static box sa loob ng ilang linggo -- pagkatapos nito, ang `authorize` + `hostmap` lang ang mga integration point.
:::

## Operasyon

- **Logs**: rolling logs ng WinSW sa `C:\caddy\` (stdout/err ng service -- ang mga error ng reverse-proxy ay napupunta sa `caddy-service.err.log`); kasaysayan ng sync sa `C:\caddy\sync-hostmap.log`.
- **Pilitin ang pag-refresh ng map**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Pagbabago sa config**: i-edit ang `C:\caddy\Caddyfile`, pagkatapos `caddy validate` + `caddy reload` (o `Restart-Service caddy` -- ligtas ang mga restart ayon sa disenyo).
- **Malawakang pagbura ng domain** ay nagti-trigger ng shrink guard ng sync script ayon sa disenyo; ilipat ang lumang `hosts.map` sa tabi at patakbuhin muli ang task para tanggapin ang sinadyang malaking pag-urong.
- **Mga tagubilin sa DNS para sa mga simbahan ay hindi magbabago kailanman**: apex `A 3.23.251.61` o `CNAME proxy.b1.church`.

## Mga Kaugnay na Pahina

- [Website Routing & Multi-Site](../architecture/websites.md) -- kung paano nireresolba ang na-proxy na request sa isang simbahan/site sa B1App
- [API Deployment](./apis.md) -- pag-deploy ng Membership API na naghahain ng `authorize`/`hostmap`
