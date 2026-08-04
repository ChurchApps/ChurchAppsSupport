---
title: "Caddy Custom-Domain Proxy"
---

# Caddy Custom-Domain Proxy

<div class="article-intro">

Custom church domains (`mychurch.org` → चर्च की B1 वेबसाइट) Caddy चलाने वाले एक ही Windows EC2 box पर terminate होते हैं। यह box TLS certificates का मालिक है, हर domain को उसकी `{sub}.b1.church` साइट में resolve करता है, और एक rewritten Host header के साथ reverse-proxy करता है। इसका पूरा कॉन्फ़िगरेशन दो फ़ाइलें हैं — एक static `Caddyfile` और एक `hosts.map` जो Membership API से refresh होती है — इसलिए यह restarts को zero runtime state के साथ झेल लेता है। यह पृष्ठ कवर करता है कि box को शुरू से कैसे बनाया जाए, यह कैसे काम करता है, और वे field-tested gotchas जो इसे दोबारा बनाने वाले किसी को भी काटेंगे।

</div>

रिक्वेस्ट B1App तक पहुँचने के बाद वह किसी चर्च/साइट में कैसे resolve होती है, इसके लिए देखें [Website Routing & Multi-Site](../architecture/websites)।

## Components

| हिस्सा | यह क्या है |
|---|---|
| EC2 instance | Windows Server; Elastic IP **`3.23.251.61`** (दुनिया भर में चर्च DNS में baked — IP स्थायी है, instances disposable हैं) |
| `C:\caddy\caddy.exe` | `techknowlogick/certmagic-s3` storage module वाला **Custom** Caddy build — स्टॉक Caddy cert स्टोर को पढ़ नहीं सकता |
| `C:\caddy\Caddyfile` | पूरा proxy कॉन्फ़िग: on-demand TLS, host→upstream `map`, www→apex रीडायरेक्ट, `:80`→https |
| `C:\caddy\hosts.map` | प्रति routable domain एक `{domain} {sub}.b1.church` लाइन, Caddyfile के `map` ब्लॉक में import की गई |
| `sync-hostmap.ps1` + `CaddyHostmapSync` task | Scheduled task (हर 5 मिनट + बूट पर, SYSTEM के रूप में) API से `hosts.map` को refresh करता है और केवल बदलाव होने पर gracefully Caddy को reload करता है |
| Windows service `caddy` (WinSW wrapper) | `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` चलाता है; विफलता पर auto-restart। Caddy SCM-aware नहीं है, इसलिए एक wrapper ज़रूरी है |
| S3 bucket `churchapps-caddy-certs` | Shared certificate storage (`region us-east-2`, prefix `certs`) — certs instance rebuilds को झेल जाते हैं |
| IAM role `CaddyRole` | Instance को S3 access देता है; Caddy AWS default credential chain का उपयोग करता है (कॉन्फ़िग में कोई keys नहीं) |

## वे दो API endpoints जिन पर box निर्भर है

दोनों Membership API पर anonymous हैं:

| Endpoint | भूमिका |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy का **on-demand TLS `ask` gate**: `200 {"authorized":true}` जब host (या, `www.` host के लिए, उसका apex) `domains` में एक row है; अन्यथा `404`। यह abuse control है — Caddy इस endpoint द्वारा रिजेक्ट किए गए किसी host के लिए certificate जारी नहीं करेगा |
| `GET /membership/domains/hostmap` | `text/plain`, sorted, deduplicated `{domain} {sub}.b1.church` लाइनें (site-aware: एक secondary साइट को assigned domain उस साइट का subdomain dial करता है)। `map` का स्रोत |

## Request फ़्लो

1. Browser `mychurch.org` को `3.23.251.61` से resolve करता है (apex `A` रिकॉर्ड, या `CNAME proxy.b1.church`)।
2. Caddy TLS terminate करता है। S3 में certificate हाथ में है → serve करता है; अज्ञात SNI → `authorize` से पूछा जाता है; 200 → Let's Encrypt के माध्यम से on demand जारी करता है; 404 → **handshake रिजेक्ट कर दिया जाता है** (कोई certificate नहीं, कोई response नहीं — एक अज्ञात host को TLS-refused मिलता है, HTTP error नहीं)।
3. `map` Host को `{sub}.b1.church` में resolve करता है; `www.{apex}` को apex पर एक 302 मिलता है; एक authorized-लेकिन-unmapped host (≤5-मिनट sync विंडो के भीतर एक बिल्कुल नया domain) को एक clean 404 मिलता है।
4. `reverse_proxy` SNI और Host को upstream पर rewrite करते हुए `{sub}.b1.church:443` को dial करता है, इसलिए Vercel का edge B1App साइट को serve करता है।
5. Port 80 ACME HTTP-01 चैलेंज को पास करता है और बाकी सब कुछ को https पर 308-रीडायरेक्ट करता है।

New-domain propagation: B1Admin में सेव किया गया एक domain ~5 मिनट में routable हो जाता है (sync task); इसका certificate पहली HTTPS hit पर minted होता है।

## Box को शुरू से बनाना

Field-tested procedure से संक्षिप्त (पूरी step-by-step, copy-paste commands वाली प्रक्रिया ops workspace में रहती है, इस repo में नहीं)। पहले prerequisites — इनके बिना build dead है:

1. **IAM**: instance से `CaddyRole` (cert bucket के लिए S3 access) attach करें। Box से IMDSv2 के ज़रिए verify करें — ध्यान दें कि 401 लौटाने वाला एक bare IMDS GET का मतलब बस यह है कि IMDSv2 enforced है, "कोई role नहीं" नहीं।
2. **API health**: `authorize` को एक बोगस domain के लिए 404 लौटाना चाहिए और `hostmap` को 200 लौटाना चाहिए, इससे पहले कि कुछ और हो।

फिर:

3. **Binary**: Caddy की build सेवा से एक custom build डाउनलोड करें — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (लगभग 57 MB बनाम स्टॉक का ~45 MB; लिखे जाने के समय v2.11.4)। Module का चुनाव मायने रखता है: `techknowlogick/certmagic-s3` मौजूदा cert layout से मेल खाती `bucket`/`region`/`prefix` keys का उपयोग करता है; `ss098` fork `host`/`endpoint` का उपयोग करता है और मौजूदा certificates को **नहीं** ढूँढेगा।
4. **Files**: `Caddyfile` + `sync-hostmap.ps1` को `C:\caddy\` में डालें; `sync-hostmap.ps1 -NoReload` के साथ map को एक बार seed करें।
5. **पहले start से पहले Gates**: `caddy list-modules` को s3 storage module दिखाना चाहिए; `caddy adapt` को अपने storage ब्लॉक में `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` emit करना चाहिए; `caddy validate` पास होना चाहिए।
6. **Service**: WinSW के ज़रिए install करें (service id `caddy`, विफलता पर auto-restart, rolling logs)। LocalSystem के रूप में चलता है, जो role credentials के लिए IMDS तक पहुँचता है।
7. **Sync task**: `CaddyHostmapSync` को रजिस्टर करें (SYSTEM, हर 5 मिनट + स्टार्टअप पर, 4-मिनट execution limit)।
8. **Pre-cutover verify करें** `curl --resolve` के साथ domains को `127.0.0.1` पर force-resolve करके (box के पास असली traffic तब तक नहीं है जब तक EIP move न हो): एक मौजूदा domain को एक वैध carried-over cert के साथ serve होना चाहिए; `www.` को 302 करना चाहिए; एक अज्ञात host को TLS-refused होना चाहिए; और `Restart-Service caddy` को **बिना किसी मैनुअल re-priming के** वापस serve करते हुए आना चाहिए — वह restart टेस्ट ही static डिज़ाइन का पूरा मकसद है।
9. **Go-live**: Elastic IP `3.23.251.61` को नई instance से reassociate करें। चर्च का DNS कभी नहीं बदलता।

## Field-tested gotchas (कठिन तरीके से सीखे गए — इन्हें regress न होने दें)

| Gotcha | लक्षण | समाधान |
|---|---|---|
| reverse_proxy transport में `tls_server_name {vars.upstream}` | हर proxied domain 502 देता है: map placeholders TLS-dial समय पर **खाली resolve होते हैं** ("either ServerName or InsecureSkipVerify must be specified") | transport-native placeholder का उपयोग करें: `tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map` में duplicate keys या junk lines | Caddy का `map` handler एक **duplicate input key पर hard-error करता है** — एक खराब लाइन पूरे कॉन्फ़िग को गिरा सकती है | Sync script whitespace को normalize करता है, malformed लाइनों को drop करता है (केवल तभी पूरी तरह रिजेक्ट करता है जब >20% खराब हों), first-wins dedupe करता है, और **BOM-free** UTF-8 लिखता है (एक BOM पहली map key को corrupt कर देता है)। API भी स्रोत पर खाली/space-वाली domain rows को फ़िल्टर करता है |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Task registration **चुपचाप विफल** हो जाता है (out-of-range XML, non-terminating error) | Repetition को `Interval = "PT5M"` और बिना duration के एक `MSFT_TaskRepetitionPattern` CIM instance के रूप में बनाएँ; एक 4-मिनट का `ExecutionTimeLimit` जोड़ें (पहला SYSTEM run एक cold TLS/CRL lookup पर hang हो सकता है) |

:::warning
Admin API केवल `localhost:2019` को bind करता है। Legacy runtime मोड इसे remotely expose करता था ताकि Membership API route configs push कर सके; static डिज़ाइन को किसी remote push की ज़रूरत नहीं है, और छोटी सतह जानबूझकर है। `caddy reload` (sync script द्वारा locally चलाया गया) ही एकमात्र admin-API consumer है।
:::

:::info Legacy runtime push
API में `CaddyHelper` (और `/membership/domains/caddy` + `/caddy/init` endpoints) अभी भी पुराने runtime-configured मोड के rollback पाथ के रूप में मौजूद हैं। ये static box के कुछ हफ़्तों तक स्थिर रहने के बाद डिलीट किए जाने के लिए scheduled हैं — उसके बाद, `authorize` + `hostmap` ही एकमात्र integration points होंगे।
:::

## Operations

- **Logs**: `C:\caddy\` में WinSW rolling logs (service stdout/err — reverse-proxy errors `caddy-service.err.log` में जाती हैं); sync इतिहास `C:\caddy\sync-hostmap.log` में।
- **एक map refresh को force करें**: `Start-ScheduledTask -TaskName CaddyHostmapSync`।
- **कॉन्फ़िग बदलाव**: `C:\caddy\Caddyfile` edit करें, फिर `caddy validate` + `caddy reload` (या `Restart-Service caddy` — restarts डिज़ाइन से सुरक्षित हैं)।
- **Mass domain deletion** जानबूझकर sync script के shrink guard को trip करता है; पुराने `hosts.map` को एक तरफ़ रखें और एक जानबूझकर बड़े shrink को स्वीकार करने के लिए task को दोबारा चलाएँ।
- **चर्चों के लिए DNS निर्देश हमेशा के लिए अपरिवर्तित हैं**: apex `A 3.23.251.61` या `CNAME proxy.b1.church`।

## संबंधित पृष्ठ

- [Website Routing & Multi-Site](../architecture/websites) — proxied रिक्वेस्ट B1App में किसी चर्च/साइट को कैसे resolve करती है
- [API Deployment](./apis) — वह Membership API deploy करना जो `authorize`/`hostmap` सर्व करता है
