---
title: "Caddy कस्टम-डोमेन Proxy"
---

# Caddy कस्टम-डोमेन Proxy

<div class="article-intro">

चर्च के कस्टम डोमेन (`mychurch.org` → चर्च की B1 वेबसाइट) Caddy चलाने वाले एक Windows EC2 बॉक्स पर समाप्त होते हैं। बॉक्स TLS प्रमाणपत्रों का मालिक है, हर डोमेन को उसकी `{sub}.b1.church` साइट से हल करता है, और एक पुनर्लिखित Host header के साथ रिवर्स-प्रॉक्सी करता है। इसकी पूरी कॉन्फ़िगरेशन दो फ़ाइलें हैं -- एक static `Caddyfile` और एक `hosts.map` जो Membership API से रीफ़्रेश होती है -- इसलिए यह शून्य runtime state के साथ पुनरारंभ से बच जाता है। यह पृष्ठ बताता है कि बॉक्स को शुरू से कैसे बनाया जाता है, यह कैसे संचालित होता है, और field-tested gotchas जो इसे दोबारा बनाने वाले किसी को भी परेशान करेंगे।

</div>

एक अनुरोध B1App तक पहुँचने के बाद चर्च/साइट से कैसे हल होता है, इसके लिए [Website Routing और Multi-Site](../architecture/websites) देखें।

## घटक

| हिस्सा | यह क्या है |
|---|---|
| EC2 instance | Windows Server; Elastic IP **`3.23.251.61`** (दुनिया भर में चर्च DNS में बेक्ड -- IP स्थायी है, instances डिस्पोज़ेबल हैं) |
| `C:\caddy\caddy.exe` | **Custom** Caddy build जिसमें `techknowlogick/certmagic-s3` storage module है -- stock Caddy प्रमाणपत्र स्टोर नहीं पढ़ सकता |
| `C:\caddy\Caddyfile` | पूरी proxy कॉन्फ़िग: on-demand TLS, host→upstream `map`, www→apex redirects, `:80`→https |
| `C:\caddy\hosts.map` | हर routable डोमेन के लिए एक `{domain} {sub}.b1.church` पंक्ति, Caddyfile के `map` block में import की गई |
| `sync-hostmap.ps1` + `CaddyHostmapSync` task | Scheduled task (हर 5 मिनट + boot पर, SYSTEM के रूप में) API से `hosts.map` रीफ़्रेश करता है और केवल बदलाव होने पर Caddy को graceful रूप से reload करता है |
| Windows service `caddy` (WinSW wrapper) | `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` चलाता है; विफलता पर auto-restart। Caddy SCM-aware नहीं है, इसलिए wrapper आवश्यक है |
| S3 bucket `churchapps-caddy-certs` | साझा प्रमाणपत्र भंडारण (`region us-east-2`, prefix `certs`) -- प्रमाणपत्र instance rebuilds के बाद भी बचे रहते हैं |
| IAM role `CaddyRole` | instance को S3 access देता है; Caddy AWS default credential chain का उपयोग करता है (कॉन्फ़िग में कोई keys नहीं) |

## दो API endpoints जिन पर बॉक्स निर्भर है

दोनों Membership API पर हैं। `authorize` गुमनाम है; `hostmap` को Api PR #67 (2026-08-16) से `x-internal-key: <INTERNAL_API_KEY>` header चाहिए -- `sync-hostmap.ps1` इसे `C:\caddy\internal-key.txt` से पढ़ता है:

| Endpoint | भूमिका |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy का **on-demand TLS `ask` gate**: `200 {"authorized":true}` जब host (या, `www.` host के लिए, उसका apex) `domains` में एक पंक्ति हो; अन्यथा `404`। यही दुरुपयोग नियंत्रण है -- Caddy उस host के लिए प्रमाणपत्र जारी नहीं करेगा जिसे यह endpoint अस्वीकार करता है |
| `GET /membership/domains/hostmap` | `x-internal-key` आवश्यक (या server-admin JWT)। `text/plain`, क्रमबद्ध, deduplicated `{domain} {sub}.b1.church` पंक्तियाँ (साइट-जागरूक: द्वितीयक साइट को सौंपा गया डोमेन उस साइट के subdomain पर dial करता है)। `map` का स्रोत |

## अनुरोध प्रवाह

1. ब्राउज़र `mychurch.org` → `3.23.251.61` हल करता है (apex `A` record, या `CNAME proxy.b1.church`)।
2. Caddy TLS समाप्त करता है। S3 में प्रमाणपत्र उपलब्ध → परोसें; अज्ञात SNI → `authorize` से पूछा जाता है; 200 → Let's Encrypt के माध्यम से मांग पर जारी; 404 → **handshake अस्वीकार** (कोई प्रमाणपत्र नहीं, कोई response नहीं -- अज्ञात host को TLS-refused मिलता है, HTTP त्रुटि नहीं)।
3. `map` Host को `{sub}.b1.church` से हल करता है; `www.{apex}` को apex पर 302 मिलता है; एक authorized-but-unmapped host (≤5-मिनट sync विंडो के भीतर बिल्कुल नया डोमेन) एक साफ़ 404 पाता है।
4. `reverse_proxy` `{sub}.b1.church:443` को SNI और upstream की ओर पुनर्लिखित Host के साथ dial करता है, ताकि Vercel का edge B1App साइट परोसे।
   Caddy विज़िटर का मूल डोमेन `X-Church-Host` के रूप में भी भेजता है (Vercel `X-Forwarded-Host` को पुनर्लिखित Host से overwrite करता है)। B1App middleware इसे केवल तभी स्वीकार करता है जब `/domains/public/lookup/{host}` उसे अनुरोध के host के समान `{sub}` से मैप करे, फिर इसे canonical `Link` header, `robots.txt` और `sitemap.xml` के लिए `x-public-host` के रूप में उजागर करता है; क्लाइंट-भेजा गया `x-public-host` हमेशा हटाया जाता है। Schema.org `ChurchJsonLd` अब भी `b1.church` URL उपयोग करता है (वहाँ headers पढ़ने से पेज dynamic हो जाते)।
5. Port 80 ACME HTTP-01 challenges पास करता है और बाकी सब को https पर 308-redirect करता है।

नए-डोमेन का प्रसार: B1Admin में सहेजा गया डोमेन ~5 मिनट में routable हो जाता है (sync task); उसका प्रमाणपत्र पहली HTTPS hit पर बनता है।

## बॉक्स को शुरू से बनाना

field-tested प्रक्रिया से संक्षिप्त (copy-paste commands सहित पूर्ण step-by-step ops workspace में है, इस repo में नहीं)। पहले पूर्वापेक्षाएँ -- इनके बिना build मृत है:

1. **IAM**: instance पर `CaddyRole` (cert bucket तक S3 access) संलग्न करें। बॉक्स से IMDSv2 के माध्यम से सत्यापित करें -- ध्यान दें कि एक साधारण IMDS GET जो 401 लौटाता है, इसका केवल अर्थ है कि IMDSv2 लागू है, "कोई role नहीं" नहीं।
2. **API health**: किसी भी चीज़ से पहले `authorize` को एक नकली डोमेन पर 404 लौटाना चाहिए और `hostmap` (`x-internal-key` header के साथ) को 200।

फिर:

3. **Binary**: Caddy की build service से एक custom build डाउनलोड करें -- `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB बनाम stock के ~45 MB; लिखे जाने के समय v2.11.4)। module का चुनाव मायने रखता है: `techknowlogick/certmagic-s3` `bucket`/`region`/`prefix` keys उपयोग करता है जो मौजूदा cert layout से मेल खाती हैं; `ss098` fork `host`/`endpoint` उपयोग करता है और मौजूदा प्रमाणपत्र **नहीं** ढूँढेगा।
4. **फ़ाइलें**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (production `INTERNAL_API_KEY`, एक पंक्ति) को `C:\caddy\` में रखें; map को एक बार `sync-hostmap.ps1 -NoReload` से seed करें।
5. **पहली start से पहले gates**: `caddy list-modules` में s3 storage module दिखना चाहिए; `caddy adapt` अपने storage block में `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` उत्सर्जित करना चाहिए; `caddy validate` पास होना चाहिए।
6. **Service**: WinSW से इंस्टॉल करें (service id `caddy`, विफलता पर auto-restart, rolling logs)। LocalSystem के रूप में चलता है, जो role credentials के लिए IMDS तक पहुँचता है।
7. **Sync task**: `CaddyHostmapSync` register करें (SYSTEM, हर 5 मिनट + startup पर, 4-मिनट execution limit)।
8. **Pre-cutover सत्यापन** domains को `127.0.0.1` पर `curl --resolve` से force-resolve करके (EIP हिलने तक बॉक्स पर कोई वास्तविक traffic नहीं है): एक मौजूदा डोमेन को एक वैध carried-over प्रमाणपत्र के साथ परोसना चाहिए; `www.` को 302 मिलना चाहिए; एक अज्ञात host TLS-refused होना चाहिए; और `Restart-Service caddy` **बिना किसी manual re-priming** के परोसते हुए वापस आना चाहिए -- वही restart test static डिज़ाइन का पूरा बिंदु है।
9. **Go-live**: Elastic IP `3.23.251.61` को नए instance से पुनः संबद्ध करें। चर्च DNS कभी नहीं बदलता।

## Field-tested gotchas (कठिन तरीके से सीखे गए -- regress न करें)

| Gotcha | लक्षण | समाधान |
|---|---|---|
| reverse_proxy transport में `tls_server_name {vars.upstream}` | हर proxied डोमेन 502: map placeholders **TLS-dial समय पर खाली हल होते हैं** ("either ServerName or InsecureSkipVerify must be specified") | transport-native placeholder उपयोग करें: `tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map` में duplicate keys या कचरा पंक्तियाँ | Caddy का `map` handler **duplicate input key पर कठोर त्रुटि देता है** -- एक खराब पंक्ति पूरी कॉन्फ़िग गिरा सकती है | sync script whitespace को normalize करता है, खराब पंक्तियाँ हटाता है (केवल >20% खराब होने पर पूरी तरह अस्वीकार), first-wins से dedupe करता है, और **BOM-free** UTF-8 लिखता है (BOM पहली map key को खराब करता है)। API भी स्रोत पर खाली/space-युक्त domain पंक्तियाँ फ़िल्टर करता है |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Task registration **चुपचाप विफल** (out-of-range XML, non-terminating error) | repetition को `MSFT_TaskRepetitionPattern` CIM instance के रूप में बनाएँ जिसमें `Interval = "PT5M"` हो और कोई duration न हो; 4-मिनट `ExecutionTimeLimit` जोड़ें (पहला SYSTEM run cold TLS/CRL lookup पर अटक सकता है) |

:::warning
admin API केवल `localhost:2019` पर bind होता है। legacy runtime मोड इसे दूर से expose करता था ताकि Membership API route configs push कर सके; static डिज़ाइन को कोई दूरस्थ push नहीं चाहिए, और छोटी surface जानबूझकर है। `caddy reload` (sync script द्वारा स्थानीय रूप से चलाया गया) एकमात्र admin-API उपभोक्ता है।
:::

:::info Legacy runtime push
API में `CaddyHelper` (और `/membership/domains/caddy` + `/caddy/init` endpoints) अब भी पुराने runtime-कॉन्फ़िगर मोड के rollback पथ के रूप में मौजूद हैं। static बॉक्स के कुछ हफ़्तों तक स्थिर रहने के बाद इन्हें हटाने के लिए निर्धारित हैं -- उसके बाद `authorize` + `hostmap` ही एकमात्र integration points होंगे।
:::

## परिचालन

- **Logs**: `C:\caddy\` में WinSW rolling logs (service stdout/err -- reverse-proxy त्रुटियाँ `caddy-service.err.log` में जाती हैं); sync इतिहास `C:\caddy\sync-hostmap.log` में।
- **Map refresh को ज़बरदस्ती चलाना**: `Start-ScheduledTask -TaskName CaddyHostmapSync`।
- **कॉन्फ़िग बदलाव**: `C:\caddy\Caddyfile` संपादित करें, फिर `caddy validate` + `caddy reload` (या `Restart-Service caddy` -- पुनरारंभ डिज़ाइन से सुरक्षित हैं)।
- **बड़े पैमाने पर डोमेन हटाना** sync script के shrink guard को जानबूझकर ट्रिप करता है; पुराने `hosts.map` को किनारे रखें और task फिर चलाएँ ताकि एक जानबूझकर बड़ी कमी स्वीकार हो।
- **चर्चों के लिए DNS निर्देश हमेशा के लिए अपरिवर्तित**: apex `A 3.23.251.61` या `CNAME proxy.b1.church`।

## संबंधित पृष्ठ

- [Website Routing और Multi-Site](../architecture/websites) — B1App में proxied अनुरोध चर्च/साइट से कैसे हल होता है
- [API Deployment](./apis) — Membership API को deploy करना जो `authorize`/`hostmap` परोसता है
