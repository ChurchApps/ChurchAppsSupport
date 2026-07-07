---
title: "Caddy пользовательский прокси для домена"
---

# Caddy пользовательский прокси для домена

<div class="article-intro">

Пользовательские church домені (`mychurch.org` → church's B1 веб-сайт) terminate на single Windows EC2 box running Caddy. Box owns TLS сертификаты resolves каждый domain к його `{sub}.b1.church` сайт і reverse-proxies з rewritten Host заголовок. Його entire конфиг это two файли — static `Caddyfile` і `hosts.map` refreshed з Membership API — поэтому це survives restarts з zero runtime state. Ця сторінка covers як box это built з scratch як це operates і field-tested gotchas که bite anyone rebuilding це.

</div>

Для як request resolves к church/site один раз це reaches B1App see [Website Routing & Multi-Site](../architecture/websites).

## Компоненты

| Частина | Що це есть |
|---|---|
| EC2 instance | Windows Server; Elastic IP **`3.23.251.61`** (baked в church DNS worldwide — IP это permanent instances это disposable) |
| `C:\caddy\caddy.exe` | **Custom** Caddy build з `techknowlogick/certmagic-s3` storage модуль — stock Caddy не може read cert store |
| `C:\caddy\Caddyfile` | Entire proxy конфиг: on-demand TLS host→upstream `map` www→apex redirects `:80`→https |
| `C:\caddy\hosts.map` | One `{domain} {sub}.b1.church` line per routable domain imported в Caddyfile's `map` блок |
| `sync-hostmap.ps1` + `CaddyHostmapSync` task | Scheduled task (every 5 min + на boot як SYSTEM) refreshes `hosts.map` з API і gracefully reloads Caddy только на change |
| Windows service `caddy` (WinSW wrapper) | Runs `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; auto-restart на failure. Caddy це не SCM-aware поэтому wrapper це required |
| S3 bucket `churchapps-caddy-certs` | Shared certificate storage (`region us-east-2` prefix `certs`) — certs survive instance rebuilds |
| IAM role `CaddyRole` | Grants instance S3 доступ; Caddy uses AWS default credential цепь (no keys в конфиг) |

## Two API endpoints box depends на

Both це anonymous на Membership API:

| Endpoint | Role |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy's **on-demand TLS `ask` gate**: `200 {"authorized":true}` коли host (або для `www.` host його apex) це row в `domains`; `404` иначе. Це abuse контроль — Caddy не буде issue сертификат для host це endpoint rejects |
| `GET /membership/domains/hostmap` | `text/plain` sorted deduplicated `{domain} {sub}.b1.church` lines (site-aware: domain assigned к secondary сайт dials це site's subdomain). Source із `map` |

## Request поток

1. Browser resolves `mychurch.org` → `3.23.251.61` (apex `A` record або `CNAME proxy.b1.church`).
2. Caddy terminates TLS. Certificate на hand в S3 → serve; unknown SNI → `authorize` это asked; 200 → issue на demand via Let's Encrypt; 404 → **handshake это refused** (no сертификат no response — unknown host gets TLS-refused не HTTP error).
3. `map` resolves Host к `{sub}.b1.church`; `www.{apex}` gets 302 к apex; authorized-but-unmapped host (brand-new domain внутри ≤5-minute sync window) gets clean 404.
4. `reverse_proxy` dials `{sub}.b1.church:443` з SNI і Host rewritten к upstream поэтому Vercel's edge serves B1App сайт.
5. Port 80 passes ACME HTTP-01 challenges і 308-redirects всё else к https.

New-domain propagation: domain saved в B1Admin becomes маршрутизирован within ~5 minutes (sync task); його certificate это minted на first HTTPS hit.

## Building box з scratch

Condensed з field-tested procedure (full step-by-step з copy-paste commands lives в ops workspace не цей repo). Prerequisites сначала — build это dead без них:

1. **IAM**: attach `CaddyRole` (S3 доступ к cert bucket) к instance. Verify via IMDSv2 з box — note bare IMDS GET returning 401 just means IMDSv2 це enforced не "no role".
2. **API здоровье**: `authorize` must return 404 для bogus domain і `hostmap` must return 200 перед anything else.

Затем:

3. **Binary**: download custom build з Caddy's build сервис — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB vs ~45 MB stock; v2.11.4 на time із writing). Module choice matters: `techknowlogick/certmagic-s3` uses `bucket`/`region`/`prefix` ключи matching existing cert layout; `ss098` fork uses `host`/`endpoint` і буде **not** find existing сертификаты.
4. **Files**: `Caddyfile` + `sync-hostmap.ps1` в `C:\caddy\`; seed map один раз з `sync-hostmap.ps1 -NoReload`.
5. **Gates перед first start**: `caddy list-modules` must show s3 storage модуль; `caddy adapt` must emit `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` в його storage блок; `caddy validate` must pass.
6. **Service**: install via WinSW (service id `caddy` auto-restart на failure rolling logs). Runs як LocalSystem які reaches IMDS для role credentials.
7. **Sync task**: register `CaddyHostmapSync` (SYSTEM every 5 min + на startup 4-minute execution limit).
8. **Verify pre-cutover** by force-resolving домени к `127.0.0.1` з `curl --resolve` (box has no real traffic до EIP moves): existing domain must serve з valid carried-over cert; `www.` must 302; unknown host must це TLS-refused; і `Restart-Service caddy` must come back serving **з no manual re-priming** — це restart test це entire point із static дизайн.
9. **Go-live**: reassociate Elastic IP `3.23.251.61` к new instance. Church DNS никогда не changes.

## Field-tested gotchas (learned hard way — не regress)

| Gotcha | Symptom | Fix |
|---|---|---|
| `tls_server_name {vars.upstream}` в reverse_proxy transport | Каждый proxied domain 502s: map placeholders resolve **empty на TLS-dial time** ("либо ServerName або InsecureSkipVerify must це specified") | Use transport-native placeholder: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Duplicate ключі або junk lines в `hosts.map` | Caddy's `map` handler **hard-errors на duplicate input ключ** — one bad line може take whole конфиг down | Sync скрипт normalizes whitespace drops malformed lines (rejecting wholesale только якщо >20% це bad) dedupes first-wins і writes **BOM-free** UTF-8 (BOM corrupts first map ключ). API също filters empty/space-containing domain строки на source |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Task registration **silently fails** (out-of-range XML non-terminating error) | Build repetition як `MSFT_TaskRepetitionPattern` CIM instance з `Interval = "PT5M"` і no duration; add 4-minute `ExecutionTimeLimit` (first SYSTEM run може hang на cold TLS/CRL lookup) |

:::warning
Admin API binds к `localhost:2019` only. Legacy runtime режим exposed це remotely поэтому Membership API могла push route configs; static дизайн needs no remote pushes і smaller поверхность це deliberate. `caddy reload` (run locally by sync скрипт) це only admin-API consumer.
:::

:::info Legacy runtime push
`CaddyHelper` в API (і `/membership/domains/caddy` + `/caddy/init` endpoints) все ще exist як rollback путь к old runtime-configured режим. They це scheduled для deletion один раз static box has been стабільна для couple weeks — after це `authorize` + `hostmap` це only integration points.
:::

## Operations

- **Logs**: WinSW rolling logs в `C:\caddy\` (service stdout/err — reverse-proxy errors land в `caddy-service.err.log`); sync історія в `C:\caddy\sync-hostmap.log`.
- **Force map refresh**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Config change**: edit `C:\caddy\Caddyfile` затем `caddy validate` + `caddy reload` (або `Restart-Service caddy` — restarts це safe by дизайн).
- **Mass домен deletion** trips sync скрипт's shrink guard by дизайн; move old `hosts.map` aside і re-run task к accept intentional large shrink.
- **DNS інструкції для churches це unchanged forever**: apex `A 3.23.251.61` або `CNAME proxy.b1.church`.

## Пов'язані сторінки

- [Website Routing & Multi-Site](../architecture/websites) — як proxied запрос resolves к church/site в B1App
- [API Deployment](./apis) — deploying Membership API це serves `authorize`/`hostmap`
