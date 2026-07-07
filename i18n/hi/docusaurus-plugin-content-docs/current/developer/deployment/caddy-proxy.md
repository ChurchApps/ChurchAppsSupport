---
title: "Caddy Custom-Domain Proxy"
---

# Caddy Custom-Domain Proxy

<div class="article-intro">

Custom church domains (`mychurch.org` → church का B1 website) एक single Windows EC2 box पर terminate होते हैं जो Caddy चला रहा है। Box TLS certificates को own करता है, हर domain को अपने `{sub}.b1.church` site में resolve करता है, और एक rewritten Host header के साथ reverse-proxy करता है। पूरा configuration दो files है — एक static `Caddyfile` और एक `hosts.map` Membership API से refreshed — तो यह restarts को zero runtime state के साथ survive करता है। यह पृष्ठ covers करता है कि box को scratch से कैसे build किया जाता है, यह कैसे operate होता है, और field-tested gotchas जो anyone को rebuild करते समय bite करेंगे।

</div>

एक बार request B1App तक पहुंचने के बाद church/site को resolve करने के लिए कैसे, देखें [Website Routing & Multi-Site](../architecture/websites)।

## Components

| Piece | क्या है |
|---|---|
| EC2 instance | Windows Server; Elastic IP **`3.23.251.61`** (worldwide church DNS में baked — IP permanent है, instances disposable हैं) |
| `C:\caddy\caddy.exe` | **Custom** Caddy build `techknowlogick/certmagic-s3` storage module के साथ — stock Caddy cert store को नहीं read कर सकता |
| `C:\caddy\Caddyfile` | पूरा proxy config: on-demand TLS, host→upstream `map`, www→apex redirects, `:80`→https |
| `C:\caddy\hosts.map` | एक `{domain} {sub}.b1.church` line per routable domain, Caddyfile के `map` block में imported |
| `sync-hostmap.ps1` + `CaddyHostmapSync` task | Scheduled task (हर 5 min + boot पर, SYSTEM के रूप में) API से `hosts.map` को refresh करता है और केवल change पर gracefully Caddy को reload करता है |
| Windows service `caddy` (WinSW wrapper) | `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` को run करता है; failure पर auto-restart। Caddy SCM-aware नहीं है, तो एक wrapper required है |
| S3 bucket `churchapps-caddy-certs` | Shared certificate storage (`region us-east-2`, prefix `certs`) — certs instance rebuilds को survive करते हैं |
| IAM role `CaddyRole` | Instance को S3 access grant करता है; Caddy AWS default credential chain को use करता है (no keys in config) |

## Box जिन दो API endpoints पर depend करता है

दोनों anonymous हैं, Membership API पर:

| Endpoint | भूमिका |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy का **on-demand TLS `ask` gate**: `200 {"authorized":true}` जब host (या, `www.` host के लिए, उसका apex) `domains` में एक row है; `404` अन्यथा। यह abuse control है — Caddy इस endpoint को reject करने वाले host के लिए certificate issue नहीं करेगा |
| `GET /membership/domains/hostmap` | `text/plain`, sorted, deduplicated `{domain} {sub}.b1.church` lines (site-aware: एक secondary site को assigned domain उस site के subdomain को dial करता है)। `map` का source |

## Request flow

1. Browser `mychurch.org` → `3.23.251.61` (apex `A` record, या `CNAME proxy.b1.church`) resolve करता है।
2. Caddy TLS terminate करता है। S3 में certificate hand पर है → serve करता है; unknown SNI → `authorize` को ask किया जाता है; 200 → Let's Encrypt के माध्यम से on demand issue करता है; 404 → **handshake को refuse किया जाता है** (कोई certificate नहीं, कोई response नहीं — एक unknown host को TLS-refused मिलता है, HTTP error नहीं)।
3. `map` Host को `{sub}.b1.church` में resolve करता है; `www.{apex}` को apex को 302 मिलता है; एक authorized-but-unmapped host (≤5-minute sync window के अंदर एक brand-new domain) को clean 404 मिलता है।
4. `reverse_proxy` `{sub}.b1.church:443` को dial करता है SNI और Host upstream पर rewrite किए गए साथ, तो Vercel का edge B1App site को serve करता है।
5. Port 80 ACME HTTP-01 challenges को pass करता है और बाकी सब को https पर 308-redirect करता है।

New-domain propagation: B1Admin में save किया गया domain ~5 मिनट में routable हो जाता है (sync task); इसका certificate पहली HTTPS hit पर minted है।

## Box को scratch से build करना

Field-tested procedure से condensed (full step-by-step copy-paste commands के साथ ops workspace में रहता है, यह repo में नहीं)। Prerequisites पहले — build इन के बिना dead है:

1. **IAM**: instance को `CaddyRole` attach करें (cert bucket के लिए S3 access)। IMDSv2 से box से verify करें।
2. **API health**: `authorize` को एक bogus domain के लिए 404 return करना चाहिए और `hostmap` को 200 return करना चाहिए।

फिर:

3. **Binary**: Caddy build service से एक custom build download करें।
4. **Files**: `Caddyfile` + `sync-hostmap.ps1` को `C:\caddy\` में; map को एक बार `sync-hostmap.ps1 -NoReload` के साथ seed करें।
5. **Gates before first start**: `caddy list-modules` को s3 storage module दिखाना चाहिए; `caddy adapt` को अपने storage block में `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` emit करना चाहिए।
6. **Service**: WinSW के माध्यम से install करें।
7. **Sync task**: `CaddyHostmapSync` register करें।
8. **Verify pre-cutover** existing domains को serve करना चाहिए; restart को verify करें।
9. **Go-live**: Elastic IP को नई instance को reassociate करें।

## Field-tested gotchas (कठिन तरीके से सीखा गया — regress न करें)

| Gotcha | Symptom | Fix |
|---|---|---|
| `tls_server_name {vars.upstream}` | हर proxied domain 502s: map placeholders TLS-dial time पर **empty resolve करते हैं** | transport-native placeholder को use करें: `tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map` में duplicate keys या junk lines | Caddy का `map` handler **एक duplicate input key पर hard-error करता है** | Sync script whitespace को normalize करता है, malformed lines को drop करता है, dedupe करता है, और **BOM-free** UTF-8 को write करता है |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Task registration **silently fail** होता है | `MSFT_TaskRepetitionPattern` CIM instance बनाएं |

:::warning
Admin API केवल `localhost:2019` को bind करता है। Legacy runtime mode इसे remotely expose करता था तो Membership API route configs को push कर सकता था; static design को remote pushes की जरूरत नहीं है।
:::

:::info Legacy runtime push
API में `CaddyHelper` (और `/membership/domains/caddy` + `/caddy/init` endpoints) अभी भी पुराने runtime-configured mode के rollback path के रूप में exist करते हैं।
:::

## Operations

- **Logs**: `C:\caddy\` में WinSW rolling logs।
- **Force a map refresh**: `Start-ScheduledTask -TaskName CaddyHostmapSync`।
- **Config change**: `C:\caddy\Caddyfile` को edit करें, फिर `caddy validate` + `caddy reload`।
- **Mass domain deletion** sync script के shrink guard को by design trip करता है।
- **DNS instructions churches के लिए forever unchanged हैं**: apex `A 3.23.251.61` या `CNAME proxy.b1.church`।

## संबंधित पृष्ठ

- [Website Routing & Multi-Site](../architecture/websites) — proxied request कैसे B1App में church/site को resolve करता है
- [API Deployment](./apis) — Membership API को deploy करना जो `authorize`/`hostmap` serve करता है
