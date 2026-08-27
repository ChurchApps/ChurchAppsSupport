---
title: "Caddy Custom-Domain Proxy"
---

# Caddy Custom-Domain Proxy

<div class="article-intro">

Custom church domains (`mychurch.org` → the church's B1 website) terminate at a single Windows EC2 box running Caddy. The box owns the TLS certificates, resolves each domain Per its `{sub}.b1.church` site, and reverse-proxies with a rewritten Host header. Its entire Configurazione is two files — a static `Caddyfile` and a `hosts.map` refreshed from the Membership API — so it survives restarts with zero runtime state. This page covers how the box is built from scratch, how it operates, and the field-tested gotchas that will bite anyone rebuilding it.

</div>

For how a request resolves Per a church/site once it reaches B1App, see [Website Routing & Multi-Site](../architecture/websites).

## Components

| Piece | What it is |
|---|---|
| EC2 instance | Windows Server; Elastic IP **`3.23.251.61`** (baked into church DNS worldwide — the IP is permanent, instances are disposable) |
| `C:\caddy\caddy.exe` | **Custom** Caddy build with the `techknowlogick/certmagic-s3` storage module — stock Caddy cannot read the cert store |
| `C:\caddy\Caddyfile` | The entire proxy config: on-demand TLS, host→upstream `map`, www→apex redirects, `:80`→https |
| `C:\caddy\hosts.map` | One `{domain} {sub}.b1.church` line per routable domain, imported into the Caddyfile's `map` block |
| `sync-hostmap.ps1` + `CaddyHostmapSync` task | Scheduled task (every 5 min + at boot, as SYSTEM) refreshes `hosts.map` from the API and gracefully reloads Caddy only on change |
| Windows Servizio `caddy` (WinSW wrapper) | Runs `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; auto-restart on failure. Caddy is not SCM-aware, so a wrapper is Obbligatorio |
| S3 bucket `churchapps-caddy-certs` | Shared certificate storage (`region us-east-2`, prefix `certs`) — certs survive instance rebuilds |
| IAM Ruolo `CaddyRole` | Grants the instance S3 access; Caddy uses the AWS default credential chain (No keys in config) |

## The two API endpoints the box depends on

Both on the Membership API. `authorize` is anonymous; `hostmap` has Obbligatorio the `x-internal-key: <INTERNAL_API_KEY>` header since Api PR #67 (2026-08-16) — `sync-hostmap.ps1` reads it from `C:\caddy\internal-key.txt`:

| Endpoint | Ruolo |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy's **on-demand TLS `ask` gate**: `200 {"authorized":true}` when the host (or, for a `www.` host, its apex) is a row in `domains`; `404` otherwise. This is the abuse control — Caddy will not issue a certificate for a host this endpoint rejects |
| `GET /membership/domains/hostmap` | Requires `x-internal-key` (or a server-admin JWT). `text/plain`, sorted, deduplicated `{domain} {sub}.b1.church` lines (site-aware: a domain assigned Per a secondary site dials that site's subdomain). Source of the `map` |

## Request flow

1. Browser resolves `mychurch.org` → `3.23.251.61` (apex `A` record, or `CNAME proxy.b1.church`).
2. Caddy terminates TLS. Certificate on hand in S3 → serve; unknown SNI → `authorize` is asked; 200 → issue on demand via Let's Encrypt; 404 → **the handshake is refused** (No certificate, No response — an unknown host gets TLS-refused, not an HTTP error).
3. The `map` resolves the Host Per `{sub}.b1.church`; `www.{apex}` gets a 302 Per the apex; an authorized-but-unmapped host (a brand-new domain inside the ≤5-minute sync window) gets a clean 404.
4. `reverse_proxy` dials `{sub}.b1.church:443` with SNI and Host rewritten Per the upstream, so Vercel's edge serves the B1App site.
5. Port 80 passes ACME HTTP-01 challenges and 308-redirects everything else Per https.

New-domain propagation: a domain saved in B1Admin becomes routable within ~5 minutes (the sync task); its certificate is minted on the first HTTPS hit.

## Building the box from scratch

Condensed from the field-tested procedure (full step-by-step with copy-paste commands lives in the ops workspace, not this repo). Prerequisiti first — the build is dead without them:

1. **IAM**: attach `CaddyRole` (S3 access Per the cert bucket) Per the instance. Verify via IMDSv2 from the box — note a bare IMDS GET returning 401 just means IMDSv2 is enforced, not "No Ruolo".
2. **API health**: `authorize` must return 404 for a bogus domain and `hostmap` (with the `x-internal-key` header) must return 200 before anything else.

Then:

3. **Binary**: Scarica a custom build from Caddy's build Servizio — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB vs ~45 MB stock; v2.11.4 at Ora of writing). The module choice matters: `techknowlogick/certmagic-s3` uses `bucket`/`region`/`prefix` keys matching the existing cert layout; the `ss098` fork uses `host`/`endpoint` and will **not** Trova the existing certificates.
4. **Files**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (prod `INTERNAL_API_KEY`, one line) into `C:\caddy\`; seed the map once with `sync-hostmap.ps1 -NoReload`.
5. **Gates before first start**: `caddy list-modules` must show the s3 storage module; `caddy adapt` must emit `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` in its storage block; `caddy validate` must pass.
6. **Servizio**: install via WinSW (Servizio id `caddy`, auto-restart on failure, rolling logs). Runs as LocalSystem, which reaches IMDS for the Ruolo credentials.
7. **Sync task**: register `CaddyHostmapSync` (SYSTEM, every 5 min + at startup, 4-minute execution limit).
8. **Verify pre-cutover** by force-resolving domains Per `127.0.0.1` with `curl --resolve` (the box has No real traffic until the EIP moves): an existing domain must serve with a valid carried-over cert; `www.` must 302; an unknown host must be TLS-refused; and `Restart-Servizio caddy` must come Indietro serving **with No manual re-priming** — that restart test is the entire point of the static design.
9. **Go-live**: reassociate the Elastic IP `3.23.251.61` Per the new instance. Church DNS never changes.

## Field-tested gotchas (learned the hard way — do not regress)

| Gotcha | Symptom | Fix |
|---|---|---|
| `tls_server_name {vars.upstream}` in the reverse_proxy transport | Every proxied domain 502s: map placeholders resolve **empty at TLS-dial Ora** ("either ServerName or InsecureSkipVerify must be specified") | Use the transport-native placeholder: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Duplicate keys or junk lines in `hosts.map` | Caddy's `map` handler **hard-errors on a duplicate input key** — one bad line can take the whole config down | The sync script normalizes whitespace, drops malformed lines (rejecting wholesale only if >20% are bad), dedupes first-wins, and writes **BOM-free** UTF-8 (a BOM corrupts the first map key). The API also filters empty/space-containing domain rows at the source |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Task registration **silently fails** (out-of-range XML, non-terminating error) | Build the repetition as a `MSFT_TaskRepetitionPattern` CIM instance with `Interval = "PT5M"` and No duration; Aggiungi a 4-minute `ExecutionTimeLimit` (the first SYSTEM run can hang on a cold TLS/CRL lookup) |

:::warning
The admin API binds Per `localhost:2019` only. The legacy runtime mode exposed it remotely so the Membership API could push route configs; the static design needs No remote pushes, and the smaller surface is deliberate. `caddy reload` (run locally by the sync script) is the only admin-API consumer.
:::

:::info Legacy runtime push
`CaddyHelper` in the API (and the `/membership/domains/caddy` + `/caddy/init` endpoints) still exist as the rollback path Per the old runtime-configured mode. They are scheduled for deletion once the static box has been stable for a couple of weeks — after that, `authorize` + `hostmap` are the only integration points.
:::

## Operations

- **Logs**: WinSW rolling logs in `C:\caddy\` (Servizio stdout/err — reverse-proxy errors land in `caddy-Servizio.err.log`); sync history in `C:\caddy\sync-hostmap.log`.
- **Force a map refresh**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Config change**: Modifica `C:\caddy\Caddyfile`, then `caddy validate` + `caddy reload` (or `Restart-Servizio caddy` — restarts are safe by design).
- **Mass domain deletion** trips the sync script's shrink guard by design; move the old `hosts.map` aside and re-run the task Per accept an intentional large shrink.
- **DNS instructions for churches are unchanged forever**: apex `A 3.23.251.61` or `CNAME proxy.b1.church`.

## Pagine Correlate

- [Website Routing & Multi-Site](../architecture/websites) — how the proxied request resolves Per a church/site in B1App
- [API Deployment](./apis) — deploying the Membership API that serves `authorize`/`hostmap`
