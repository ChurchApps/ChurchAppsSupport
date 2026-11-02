---
title: "Caddy कस्टम-डोमेन प्रॉक्सी"
---

# Caddy कस्टम-डोमेन प्रॉक्सी

<div class="article-intro">

कस्टम चर्च डोमेन (`mychurch.org` → चर्च की B1 वेबसाइट) एक एकल Windows EC2 बॉक्स पर चल रहे Caddy पर TLS समाप्त होते हैं। बॉक्स TLS सर्टिफ़िकेट का स्वामी है, हर डोमेन को उसकी `{sub}.b1.church` साइट पर हल करता है, और एक फिर से लिखे Host header के साथ रिवर्स-प्रॉक्सी करता है। इसका पूरा कॉन्फ़िगरेशन दो फ़ाइलें हैं -- एक स्टेटिक `Caddyfile` और Membership API से रिफ़्रेश होने वाली `hosts.map` -- इसलिए यह शून्य रनटाइम स्थिति के साथ रीस्टार्ट से बचता है। यह पृष्ठ बताता है कि बॉक्स शून्य से कैसे बनता है, यह कैसे संचालित होता है, और फ़ील्ड-परीक्षित समस्याएँ जो इसे दोबारा बनाने वाले किसी भी व्यक्ति को परेशान करेंगी।

</div>

B1App तक पहुँचने के बाद अनुरोध किसी चर्च/साइट पर कैसे हल होता है, इसके लिए [Website Routing & Multi-Site](../architecture/websites) देखें।

## घटक

| घटक | यह क्या है |
|---|---|
| EC2 इंस्टेंस | Windows Server; Elastic IP **`3.23.251.61`** (दुनिया भर में चर्च DNS में अंकित -- IP स्थायी है, इंस्टेंस डिस्पोज़ेबल हैं) |
| `C:\caddy\caddy.exe` | **कस्टम** Caddy बिल्ड जिसमें `techknowlogick/certmagic-s3` storage मॉड्यूल है -- स्टॉक Caddy सर्टिफ़िकेट स्टोर नहीं पढ़ सकता |
| `C:\caddy\Caddyfile` | पूरा प्रॉक्सी कॉन्फ़िग: on-demand TLS, होस्ट→upstream `map`, www→apex रीडायरेक्ट, `:80`→https |
| `C:\caddy\hosts.map` | प्रति routable डोमेन एक `{domain} {sub}.b1.church` पंक्ति, Caddyfile के `map` ब्लॉक में इम्पोर्ट की गई |
| `sync-hostmap.ps1` + `CaddyHostmapSync` टास्क | शेड्यूल्ड टास्क (हर 5 मिनट + बूट पर, SYSTEM के रूप में) API से `hosts.map` रिफ़्रेश करता है और केवल बदलाव होने पर Caddy को graceful reload करता है |
| Windows सेवा `caddy` (WinSW wrapper) | `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` चलाता है; विफलता पर auto-restart। Caddy SCM-aware नहीं है, इसलिए wrapper आवश्यक है |
| S3 बकेट `churchapps-caddy-certs` | साझा सर्टिफ़िकेट स्टोरेज (`region us-east-2`, prefix `certs`) -- सर्टिफ़िकेट इंस्टेंस रीबिल्ड से बचते हैं |
| IAM role `CaddyRole` | इंस्टेंस को S3 एक्सेस देता है; Caddy AWS डिफ़ॉल्ट credential chain उपयोग करता है (कॉन्फ़िग में कोई keys नहीं) |

## बॉक्स जिन दो API endpoints पर निर्भर है

दोनों Membership API पर। `authorize` गुमनाम है; `hostmap` के लिए API PR #67 (2026-08-16) से `x-internal-key: <INTERNAL_API_KEY>` header आवश्यक है -- `sync-hostmap.ps1` इसे `C:\caddy\internal-key.txt` से पढ़ता है:

| Endpoint | भूमिका |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy का **on-demand TLS `ask` गेट**: `200 {"authorized":true}` जब होस्ट (या `www.` होस्ट के लिए उसका apex) `domains` में एक पंक्ति हो; अन्यथा `404`। यह दुरुपयोग नियंत्रण है -- Caddy उस होस्ट के लिए सर्टिफ़िकेट जारी नहीं करेगा जिसे यह endpoint अस्वीकार करे |
| `GET /membership/domains/hostmap` | `x-internal-key` आवश्यक (या server-admin JWT)। `text/plain`, क्रमबद्ध, डुप्लिकेट-रहित `{domain} {sub}.b1.church` पंक्तियाँ (साइट-जागरूक: द्वितीयक साइट को असाइन डोमेन उस साइट का सबडोमेन डायल करता है)। `map` का स्रोत |

## अनुरोध प्रवाह

1. ब्राउज़र `mychurch.org` → `3.23.251.61` हल करता है (apex `A` रिकॉर्ड, या `CNAME proxy.b1.church`)।
2. Caddy TLS समाप्त करता है। S3 में सर्टिफ़िकेट हाथ में → परोसो; अज्ञात SNI → `authorize` से पूछा जाता है; 200 → Let's Encrypt के माध्यम से माँग पर जारी करो; 404 → **हैंडशेक अस्वीकार** (कोई सर्टिफ़िकेट नहीं, कोई प्रतिक्रिया नहीं -- एक अज्ञात होस्ट को HTTP त्रुटि नहीं, TLS-refused मिलता है)।
3. `map` होस्ट को `{sub}.b1.church` पर हल करता है; `www.{apex}` को 302 मिलता है apex पर; एक authorized-लेकिन-अमैप्ड होस्ट (≤5-मिनट sync विंडो के भीतर एक बिल्कुल नया डोमेन) एक साफ़ 404 पाता है।
4. `reverse_proxy` `{sub}.b1.church:443` को SNI और upstream पर फिर से लिखे Host के साथ डायल करता है, ताकि Vercel का edge B1App साइट परोसे।
   Caddy विज़िटर का मूल डोमेन `X-Church-Host` के रूप में भी भेजता है (Vercel फिर से लिखे Host से `X-Forwarded-Host` को overwrite करता है)। B1App middleware इसे केवल तभी स्वीकार करता है जब `/domains/public/lookup/{host}` उसे अनुरोध वाले होस्ट के समान `{sub}` पर मैप करे, फिर इसे canonical `Link` header, `robots.txt` और `sitemap.xml` के लिए `x-public-host` के रूप में प्रकट करता है; क्लाइंट-भेजा `x-public-host` हमेशा हटाया जाता है। Schema.org `ChurchJsonLd` अब भी `b1.church` URL उपयोग करता है (वहाँ headers पढ़ने से पृष्ठ dynamic हो जाएँगे)।
5. पोर्ट 80 ACME HTTP-01 challenges पास करता है और बाकी सब को https पर 308 रीडायरेक्ट करता है।

नए-डोमेन प्रसार: B1Admin में सहेजा गया डोमेन ~5 मिनट में routable होता है (sync टास्क); इसका सर्टिफ़िकेट पहली HTTPS hit पर ढाला जाता है।

## बॉक्स को शून्य से बनाना

फ़ील्ड-परीक्षित प्रक्रिया से संक्षिप्त (पूर्ण चरण-दर-चरण copy-paste कमांड ops workspace में हैं, इस रिपॉज़िटरी में नहीं)। पहले पूर्वापेक्षाएँ -- इनके बिना बिल्ड बेकार है:

1. **IAM**: इंस्टेंस पर `CaddyRole` (सर्टिफ़िकेट बकेट का S3 एक्सेस) संलग्न करें। IMDSv2 के माध्यम से बॉक्स से सत्यापित करें -- ध्यान दें कि खाली IMDS GET पर 401 का मतलब सिर्फ़ यह है कि IMDSv2 लागू है, "कोई role नहीं" नहीं।
2. **API स्वास्थ्य**: एक नकली डोमेन के लिए `authorize` 404 लौटाना चाहिए और `hostmap` (`x-internal-key` header के साथ) 200 -- इससे पहले कुछ और।

फिर:

3. **बाइनरी**: Caddy की build सेवा से एक कस्टम बिल्ड डाउनलोड करें -- `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB बनाम स्टॉक का ~45 MB; लिखने के समय v2.11.4)। मॉड्यूल चुनाव मायने रखता है: `techknowlogick/certmagic-s3` मौजूदा सर्टिफ़िकेट लेआउट से मेल खाने वाली `bucket`/`region`/`prefix` keys उपयोग करता है; `ss098` fork `host`/`endpoint` उपयोग करता है और मौजूदा सर्टिफ़िकेट **नहीं** ढूँढेगा।
4. **फ़ाइलें**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (prod `INTERNAL_API_KEY`, एक पंक्ति) `C:\caddy\` में; `sync-hostmap.ps1 -NoReload` से एक बार मैप सीड करें।
5. **पहली शुरुआत से पहले गेट**: `caddy list-modules` में s3 storage मॉड्यूल दिखना चाहिए; `caddy adapt` को अपने storage ब्लॉक में `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` उत्सर्जित करना चाहिए; `caddy validate` पास होना चाहिए।
6. **सेवा**: WinSW (सेवा id `caddy`, विफलता पर auto-restart, rolling logs) से इंस्टॉल करें। LocalSystem के रूप में चलती है, जो role credentials के लिए IMDS तक पहुँचती है।
7. **Sync टास्क**: `CaddyHostmapSync` रजिस्टर करें (SYSTEM, हर 5 मिनट + स्टार्टअप पर, 4-मिनट execution limit)।
8. **Cutover से पहले सत्यापन** `curl --resolve` से डोमेनों को `127.0.0.1` पर force-resolve करके (बॉक्स पर EIP हिलने तक कोई असली ट्रैफ़िक नहीं): एक मौजूदा डोमेन को एक वैध, साथ लाए गए सर्टिफ़िकेट के साथ परोसना चाहिए; `www.` 302 होना चाहिए; एक अज्ञात होस्ट TLS-refused होना चाहिए; और `Restart-Service caddy` **बिना किसी मैन्युअल री-प्राइमिंग के** परोसते हुए वापस आना चाहिए -- वह रीस्टार्ट टेस्ट ही स्टैटिक डिज़ाइन का पूरा उद्देश्य है।
9. **Go-live**: Elastic IP `3.23.251.61` को नए इंस्टेंस से फिर से संबद्ध करें। चर्च DNS कभी नहीं बदलता।

## फ़ील्ड-परीक्षित समस्याएँ (कठिन तरीके से सीखी गई -- पीछे न जाएँ)

| समस्या | लक्षण | समाधान |
|---|---|---|
| reverse_proxy transport में `tls_server_name {vars.upstream}` | हर प्रॉक्सी किया गया डोमेन 502 देता है: map placeholders **TLS-dial के समय खाली** resolve होते हैं ("either ServerName or InsecureSkipVerify must be specified") | transport-नेटिव placeholder उपयोग करें: `tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map` में डुप्लिकेट keys या कचरा पंक्तियाँ | Caddy का `map` handler **डुप्लिकेट इनपुट key पर कठोर त्रुटि देता है** -- एक खराब पंक्ति पूरे कॉन्फ़िग को गिरा सकती है | Sync स्क्रिप्ट whitespace सामान्यीकृत करती है, गलत पंक्तियाँ हटाती है (केवल >20% खराब होने पर पूरी तरह अस्वीकार), पहली-जीत के आधार पर डुप्लिकेट हटाती है, और **BOM-रहित** UTF-8 लिखती है (BOM पहली map key को खराब करता है)। API भी स्रोत पर खाली/स्पेस-युक्त डोमेन पंक्तियाँ फ़िल्टर करता है |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | टास्क रजिस्ट्रेशन **चुपचाप विफल** (सीमा से बाहर XML, गैर-terminating त्रुटि) | repetition को `MSFT_TaskRepetitionPattern` CIM instance के रूप में बनाएँ जिसमें `Interval = "PT5M"` और कोई duration न हो; 4-मिनट `ExecutionTimeLimit` जोड़ें (पहला SYSTEM रन cold TLS/CRL lookup पर अटक सकता है) |

:::warning
Admin API केवल `localhost:2019` पर बाइंड होता है। लेगेसी runtime मोड ने इसे दूर से उजागर किया था ताकि Membership API route कॉन्फ़िग पुश कर सके; स्टेटिक डिज़ाइन को दूरस्थ पुश की ज़रूरत नहीं है, और छोटी सतह जानबूझकर है। `caddy reload` (sync स्क्रिप्ट द्वारा स्थानीय रूप से चलाया गया) एकमात्र admin-API उपभोक्ता है।
:::

:::info लेगेसी runtime push
API में `CaddyHelper` (और `/membership/domains/caddy` + `/caddy/init` endpoints) अब भी पुराने runtime-कॉन्फ़िगर मोड के रोलबैक पथ के रूप में मौजूद हैं। स्टेटिक बॉक्स के कुछ हफ़्तों तक स्थिर रहने के बाद उन्हें हटाने के लिए शेड्यूल है -- उसके बाद `authorize` + `hostmap` ही एकमात्र एकीकरण बिंदु हैं।
:::

## संचालन

- **लॉग**: `C:\caddy\` में WinSW rolling logs (सेवा stdout/err -- reverse-proxy त्रुटियाँ `caddy-service.err.log` में आती हैं); sync इतिहास `C:\caddy\sync-hostmap.log` में।
- **मैप रिफ़्रेश ज़बरदस्ती करें**: `Start-ScheduledTask -TaskName CaddyHostmapSync`।
- **कॉन्फ़िग बदलाव**: `C:\caddy\Caddyfile` संपादित करें, फिर `caddy validate` + `caddy reload` (या `Restart-Service caddy` -- डिज़ाइन से रीस्टार्ट सुरक्षित हैं)।
- **बड़े पैमाने पर डोमेन हटाना** sync स्क्रिप्ट के shrink guard को डिज़ाइन से ट्रिगर करता है; एक इरादतन बड़े shrink को स्वीकार करने के लिए पुराना `hosts.map` एक तरफ़ रखें और टास्क फिर चलाएँ।
- **चर्चों के लिए DNS निर्देश हमेशा के लिए अपरिवर्तित**: apex `A 3.23.251.61` या `CNAME proxy.b1.church`।

## संबंधित पृष्ठ

- [Website Routing & Multi-Site](../architecture/websites) -- प्रॉक्सी किया गया अनुरोध B1App में चर्च/साइट पर कैसे हल होता है
- [API Deployment](./apis) -- Membership API जो `authorize`/`hostmap` परोसता है, उसे डिप्लॉय करना
