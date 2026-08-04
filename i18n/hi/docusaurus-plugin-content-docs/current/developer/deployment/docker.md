---
title: "Docker के साथ सेल्फ-होस्टिंग"
---

# Docker के साथ सेल्फ-होस्टिंग

<div class="article-intro">

B1 Admin, B1 मेंबर पोर्टल, API, और एक MySQL डेटाबेस का अपना निजी इंस्टेंस किसी भी मशीन पर Docker के साथ चलाएँ — एक होम सर्वर, एक $5 VPS, या एक on-prem बॉक्स। एक `docker compose up` सब कुछ बनाता और शुरू करता है। यदि आप सर्वर को बिल्कुल भी मैनेज नहीं करना चाहते, तो मैनेज्ड विकल्प के लिए [Self-Hosting on Railway](./railway-template) देखें।

</div>

## क्विक स्टार्ट

<div class="prereqs">
<h4>आपको क्या चाहिए</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) Compose v2 के साथ (Docker Desktop में शामिल)
- शुरुआती बिल्ड के दौरान उपलब्ध ~4 GB RAM (वेब ऐप्स सोर्स से बिल्ड होते हैं)
- Git, या केवल raw `docker-compose.yml` फ़ाइल

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

पहला रन 10–20 मिनट लेता है: यह आपके क्लोन से B1Admin को बिल्ड करता है और सीधे उनके GitHub रिपॉज़िटरी से API और B1App को बिल्ड करता है। बाद के स्टार्ट सेकंडों में होते हैं।

जब सभी चार सर्विसेज़ ऊपर हों:

1. **http://localhost:3101** (B1 Admin) खोलें।
2. **Register** पर क्लिक करें और अपना अकाउंट बनाएँ। पहला अकाउंट स्वचालित रूप से सर्वर एडमिन होता है।
3. अपना पहला चर्च बनाने के लिए इन-ऐप प्रॉम्प्ट का पालन करें।

डेटाबेस स्कीमा API कंटेनर की स्टार्टअप माइग्रेशन द्वारा स्वचालित रूप से बनाए जाते हैं — कोई मैनुअल SQL आवश्यक नहीं है।

| सर्विस | URL |
|---------|-----|
| B1Admin (स्टाफ़/एडमिन) | http://localhost:3101 |
| B1App (मेंबर पोर्टल / वेबसाइट) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | केवल आंतरिक (`mysql:3306` compose नेटवर्क पर) |

## कॉन्फ़िगरेशन

सभी सेटिंग्स `docker-compose.yml` के बगल में एक `.env` फ़ाइल में रहती हैं। हर वेरिएबल के पास localhost के लिए एक काम करने वाला डिफ़ॉल्ट है, इसलिए यह फ़ाइल तब तक वैकल्पिक है जब तक आप इसे कस्टमाइज़ नहीं करते।

```bash
# .env — सब कुछ वैकल्पिक है; डिफ़ॉल्ट के साथ दिखाया गया
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # ठीक 32 अक्षर

# सार्वजनिक URLs (localhost से आगे expose करते समय इन्हें बदलें)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# ईमेल — प्रोवाइडर वॉकथ्रू के लिए Railway गाइड का ईमेल सेक्शन देखें
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

वास्तविक उपयोग से पहले, `MYSQL_ROOT_PASSWORD`, `JWT_SECRET`, और `ENCRYPTION_KEY` (कोई भी 32-अक्षर की स्ट्रिंग) बदलें।

:::warning
`*_URL` वैल्यूज़ **बिल्ड टाइम पर वेब ऐप्स में बेक की जाती हैं** (मानक Vite/Next.js व्यवहार)। `.env` में इन्हें बदलने के लिए सिर्फ restart नहीं, एक rebuild चाहिए:

```bash
docker compose up -d --build
```
:::

पहली बार लॉन्च के बाद MySQL पासवर्ड बदलने के लिए MySQL के अंदर भी पासवर्ड अपडेट करना होगा — वॉल्यूम पुराने क्रेडेंशियल रखता है।

## इसे इंटरनेट पर एक्सपोज़ करना

कोई भी reverse proxy आगे रखें और हर सर्विस को एक होस्टनेम दें। [Caddy](https://caddyserver.com/) के साथ यह ऐसा है:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

फिर `.env` में URLs सेट करें और rebuild करें:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

चैट और live नोटिफ़िकेशन के लिए इस्तेमाल होने वाला WebSocket API के पोर्ट को ही शेयर करता है, इसलिए `SOCKET_URL` बस `wss://` के साथ API URL है।

## ईमेल, Giving, मल्टी-साइट, और इंटीग्रेशन

ये Railway डिप्लॉयमेंट जैसे ही काम करते हैं — वही एनवायरनमेंट वेरिएबल, Railway डैशबोर्ड के बजाय आपकी `.env` फ़ाइल में सेट (compose फ़ाइल इन्हें API को पास through करती है):

- **[ईमेल / SMTP](./railway-template#1-email-highly-recommended)** — दृढ़ता से अनुशंसित; इसके बिना मेंबर पासवर्ड रीसेट नहीं कर सकते
- **[मल्टी-साइट](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — एक इंस्टेंस पर असीमित चर्च, एडमिन UI में मैनेज किए गए
- **[ऑनलाइन Giving](./railway-template#4-online-giving-stripe--paypal)** — एडमिन UI में प्रति-चर्च कॉन्फ़िगर की गई, env वेरिएबल से नहीं
- **[वैकल्पिक इंटीग्रेशन](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## डेटा, बैकअप, और फ़ाइल स्टोरेज

दो नामित Docker वॉल्यूम सारी स्टेट रखते हैं:

| वॉल्यूम | सामग्री |
|--------|----------|
| `mysql-data` | सभी डेटाबेस स्कीमा |
| `api-content` | अपलोड की गई फ़ाइलें — फोटो, दस्तावेज़, वेबसाइट इमेज (`/app/content` पर माउंटेड) |

एक-लाइनर के साथ डेटाबेस का बैकअप लें (इसे cron के साथ शेड्यूल करें):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

वॉल्यूम को कॉपी करके अपलोड की गई फ़ाइलों का बैकअप लें:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

बड़ी मीडिया लाइब्रेरी के लिए आप फ़ाइल स्टोरेज को लोकल वॉल्यूम के बजाय S3 पर स्विच कर सकते हैं — [Railway गाइड के File Storage सेक्शन](./railway-template#5-file-storage) में बताए गए `FILE_STORE=S3` प्लस `AWS_*` वेरिएबल सेट करें।

## अपडेट करना

API और B1App उनके GitHub रिपॉज़िटरी की `main` ब्रांच से बिल्ड होते हैं; B1Admin आपके लोकल क्लोन से बिल्ड होता है।

```bash
git pull                              # B1Admin को अपडेट करें
docker compose build --pull           # नवीनतम main के विरुद्ध सभी images को rebuild करें
docker compose up -d
```

API कंटेनर शुरू होने पर डेटाबेस माइग्रेशन स्वचालित रूप से चलते हैं।

`main` को ट्रैक करने के बजाय वर्जन पिन करने के लिए, बिल्ड कॉन्टेक्स्ट को `.env` में एक टैग पर पॉइंट करें:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

डेवलपर्स इन्हीं वेरिएबल को लोकल checkouts पर पॉइंट कर सकते हैं (जैसे `API_CONTEXT=../Api`)।

## समस्या निवारण

| लक्षण | संभावित कारण | समाधान |
|---------|--------------|-----|
| `api` कंटेनर बार-बार restart होता है | MySQL तैयार नहीं है या माइग्रेशन विफलता | `docker compose logs api` — माइग्रेशन प्रिंट करता है कि कौन सा मॉड्यूल विफल हुआ |
| लॉगिन `api.churchapps.org` पर रीडायरेक्ट होता है | वेब ऐप `custom` स्टेज args के बिना बिल्ड हुआ | Rebuild करें: `docker compose build --no-cache b1admin b1app` |
| `.env` में एक URL बदला लेकिन कुछ नहीं हुआ | URLs बिल्ड टाइम पर बेक होते हैं | `docker compose up -d --build` |
| "Check your email" लेकिन कोई ईमेल नहीं आता | खराब क्रेडेंशियल के साथ `MAIL_SYSTEM=SMTP` | क्रेडेंशियल ठीक करें, या ईमेल अक्षम करने के लिए `MAIL_SYSTEM` unset करें |
| चैट / लाइव फ़ीचर चुप हैं | ब्राउज़र से `SOCKET_URL` पहुँच योग्य नहीं है | HTTPS के पीछे `wss://` होना चाहिए और पोर्ट 8084 पर proxied होना चाहिए |
| छोटे VPS पर बिल्ड फेल होता है | `next build` के दौरान मेमोरी खत्म | Swap जोड़ें, या दूसरी मशीन पर बिल्ड करें और `docker save`/`load` करें |

अभी भी अटके हैं? `docker compose logs` के आउटपुट के साथ [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) पर एक issue खोलें।

## संबंधित लेख

- **[Self-Hosting on Railway](./railway-template)** — मैनेज्ड होस्टिंग विकल्प, साथ ही शेयर्ड post-deploy कॉन्फ़िगरेशन गाइड
- **[Initial Setup](../../getting-started/initial-setup)** — आपका चर्च बनने के बाद के पहले कदम
- **[Local API Setup](../api/local-setup)** — डेवलपमेंट के लिए सीधे स्टैक चलाना
