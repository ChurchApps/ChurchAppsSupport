---
title: "Docker के साथ सेल्फ़-होस्टिंग"
---

# Docker के साथ सेल्फ़-होस्टिंग

<div class="article-intro">

Docker वाली किसी भी मशीन पर B1 Admin, B1 सदस्य पोर्टल और वेबसाइट, API, और MySQL डेटाबेस का अपना निजी इंस्टेंस चलाएँ, चाहे वह होम सर्वर, छोटा VPS, या ऑन-प्रिमाइसेस बॉक्स हो। एक कमांड इसे इंस्टॉल करता है, एक कमांड इसे अपग्रेड करता है, और हर अपग्रेड से पहले बैकअप लिया जाता है। यदि आप सर्वर बिल्कुल प्रबंधित नहीं करना चाहते, तो प्रबंधित विकल्प के लिए [Railway पर सेल्फ़-होस्टिंग](./railway-template) देखें।

</div>

## त्वरित प्रारंभ

<div class="prereqs">
<h4>आपको क्या चाहिए</h4>

- एक Linux मशीन (या WSL या Git Bash के साथ macOS / Windows — `b1` हेल्पर एक bash स्क्रिप्ट है) जिसमें [Docker Engine](https://docs.docker.com/engine/install/) और Compose v2 (Docker Desktop में शामिल) हो
- लगभग 2 GB RAM और 5 GB डिस्क
- सार्वजनिक साइट के लिए: मशीन की ओर इशारा करने वाला डोमेन नाम, और पोर्ट 80 और 443 तक पहुँच

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

`--domain` छोड़ देने पर `http://localhost` पर चलेगा। इंस्टॉलर एक `b1church` फ़ोल्डर बनाता है, ताज़ा बने गोपनीय कुंजियों वाली `.env` फ़ाइल लिखता है, GitHub Container Registry से तैयार इमेज खींचता है, और API के स्वस्थ होने की प्रतीक्षा करता है। आपकी मशीन पर कुछ भी बिल्ड नहीं होता, इसलिए पहली बार शुरू होने में एक-दो मिनट लगते हैं।

जब यह पूरा हो जाए:

1. **https://church.example.org/admin** (या http://localhost/admin) खोलें और **Register** पर क्लिक करें। पहला खाता अपने-आप सर्वर एडमिन बन जाता है।
2. अपना पहला चर्च बनाने के लिए ऐप के प्रॉम्प्ट का पालन करें। चर्च बनते ही उसकी वेबसाइट और सदस्य पोर्टल **https://church.example.org/** पर लाइव हो जाते हैं।

सब कुछ एक ही डोमेन के अंतर्गत चलता है:

| Path | Service |
|------|---------|
| `/` | B1App — चर्च वेबसाइट और सदस्य पोर्टल |
| `/admin` | B1Admin — स्टाफ़ डैशबोर्ड |
| `/api` | API, अपलोड की गई फ़ाइलें, और लाइव-अपडेट websocket |

HTTPS स्वचालित है: बंडल किया गया [Caddy](https://caddyserver.com/) प्रॉक्सी `.env` में दिए डोमेन के लिए Let's Encrypt प्रमाणपत्र प्राप्त करता और नवीनीकृत करता है। केवल पोर्ट 80 और 443 खुले रहते हैं; डेटाबेस केवल Docker नेटवर्क के अंदर से पहुँचा जा सकता है।

## `b1` कमांड

इंस्टॉलर `docker-compose.yml` के बगल में एक `deploy/b1` स्क्रिप्ट छोड़ता है। रोज़मर्रा के काम के लिए बस यही चाहिए:

| Command | यह क्या करता है |
|---------|--------------|
| `./deploy/b1 upgrade` | वर्तमान रिलीज़ खींचता है, बैकअप लेता है, रीस्टार्ट करता है, और पुष्टि करता है कि API स्वस्थ है |
| `./deploy/b1 upgrade 2026.10.1` | वही, किसी विशेष रिलीज़ पर पिन किया गया |
| `./deploy/b1 backup` | डेटाबेस, अपलोड की गई फ़ाइलों और `.env` का स्नैपशॉट `backups/<timestamp>/` में लेता है |
| `./deploy/b1 restore backups/<timestamp>` | स्नैपशॉट वापस लगाता है (चलते समय API रुक जाता है) |
| `./deploy/b1 rollback` | नवीनतम बैकअप वापस लाता है, जिसमें वह रिलीज़ भी शामिल है जिस पर वह लिया गया था |
| `./deploy/b1 status` | इंस्टॉल किया गया संस्करण और कंटेनर स्वास्थ्य |
| `./deploy/b1 logs api` | किसी सेवा के लॉग लाइव देखें |

रिलीज़ एक ही संस्करण-बद्ध बंडल के रूप में प्रकाशित होती हैं, ताकि तीनों इमेज हमेशा मेल खाएँ। `.env` में `B1_VERSION=stable` नवीनतम रिलीज़ को ट्रैक करता है; किसी विशेष संस्करण पर पिन करने के लिए उसे वह संस्करण दें। रिलीज़ नोट्स [B1Admin रिलीज़](https://github.com/ChurchApps/B1Admin/releases) के अंतर्गत हैं।

## कॉन्फ़िगरेशन

सभी सेटिंग्स `docker-compose.yml` के बगल की `.env` फ़ाइल में रहती हैं। इंस्टॉलर आवश्यक सेटिंग्स भर देता है:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

`.env` बदलने के बाद उसे `docker compose up -d` से लागू करें। वेब ऐप्स ब्राउज़र के पते से पता लगा लेते हैं कि किस API से बात करनी है, इसलिए डोमेन बदलने के लिए केवल `SITE_ADDRESS` और `PUBLIC_URL` अपडेट करना और रीस्टार्ट करना काफ़ी है — कोई रीबिल्ड नहीं।

:::warning
`.env` को सुरक्षित रखें। `ENCRYPTION_KEY` संग्रहीत भुगतान-गेटवे और स्टोरेज क्रेडेंशियल्स की रक्षा करती है; इसके बिना बैकअप उन्हें डिक्रिप्ट नहीं कर सकता। इसी कारण `./deploy/b1 backup` उसकी एक प्रति शामिल करता है।
:::

### बाद में किसी डोमेन पर जाना

यदि आपने `localhost` पर इंस्टॉल किया और बाद में उसे सार्वजनिक करना चाहते हैं: DNS को मशीन की ओर इंगित करें, फिर `.env` में `DOMAIN`, `SITE_ADDRESS` (केवल डोमेन) और `PUBLIC_URL` (`https://` + डोमेन) सेट करें, फिर `docker compose up -d` चलाएँ। Caddy पहले अनुरोध पर प्रमाणपत्र प्राप्त कर लेता है।

## ईमेल, दान, मल्टी-साइट और इंटीग्रेशन

ये सब ठीक Railway जैसे ही काम करते हैं — वही एनवायरनमेंट वेरिएबल, Railway डैशबोर्ड के बजाय `.env` में सेट किए गए:

- **[ईमेल / SMTP](./railway-template#1-email-highly-recommended)** — Resend, Brevo, और Gmail के लिए प्रदाता-वार मार्गदर्शिका
- **[मल्टी-साइट](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — एक इंस्टेंस पर असीमित चर्च। `/` वह चर्च दिखाता है जिसका slug `DEFAULT_CHURCH_SLUG` है (पहला चर्च `church` है); अतिरिक्त डोमेन को बॉक्स की ओर इंगित करें और B1Admin में **Settings → Domains** के अंतर्गत उन्हें मैप करें
- **[ऑनलाइन दान](./railway-template#4-online-giving-stripe--paypal)** — हर चर्च के लिए एडमिन UI में कॉन्फ़िगर किया जाता है
- **[वैकल्पिक इंटीग्रेशन](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_*`, `GOOGLE_RECAPTCHA_SECRET_KEY`

आमंत्रण और चर्च द्वारा भेजे जाने वाले अन्य ईमेल सेल्फ़-होस्टेड इंस्टेंस पर स्वचालित रूप से सक्षम होते हैं (होस्टेड सेवा इन्हें अपनी प्रेषक प्रतिष्ठा की सुरक्षा के लिए मैन्युअल समीक्षा के पीछे रखती है)।

## डेटा, बैकअप और फ़ाइल स्टोरेज

तीन नामित Docker वॉल्यूम सारी स्थिति रखते हैं:

| Volume | सामग्री |
|--------|----------|
| `b1church_mysql-data` | सभी डेटाबेस स्कीमा |
| `b1church_api-content` | अपलोड की गई फ़ाइलें — फ़ोटो, दस्तावेज़, वेबसाइट की इमेज |
| `b1church_caddy-data` | TLS प्रमाणपत्र |

`./deploy/b1 backup` पहले दोनों और `.env` का एक सुसंगत स्नैपशॉट `backups/<timestamp>/` में लिखता है। इसे cron से शेड्यूल करें और फ़ोल्डर को मशीन से बाहर किसी और जगह कॉपी करें:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

बड़ी मीडिया लाइब्रेरी के लिए आप फ़ाइल स्टोरेज को S3 पर बदल सकते हैं — `FILE_STORE=S3` के साथ [Railway गाइड के फ़ाइल स्टोरेज अनुभाग](./railway-template#5-file-storage) में वर्णित `AWS_*` वेरिएबल सेट करें। डेटाबेस बैकअप में S3 ऑब्जेक्ट शामिल नहीं होते; वहाँ बकेट वर्ज़निंग सक्षम करें।

## अपडेट करना

```bash
./deploy/b1 upgrade
```

क्रम से: रिलीज़ खींचता है, बैकअप लेता है, कंटेनर फिर से बनाता है, API शुरू होते समय लंबित डेटाबेस माइग्रेशन चलाता है, और API के हेल्थ चेक की प्रतीक्षा करता है। यदि कुछ भी विफल होता है, तो यह रुक जाता है और कहता है कि `./deploy/b1 rollback` चलाएँ, जो वह बैकअप और पिछली रिलीज़ वापस लाता है। माइग्रेशन केवल आगे की ओर चलते हैं; रोलबैक का मतलब हमेशा स्नैपशॉट वापस लाना है।

यदि आप बीटा compose फ़ाइल से अपग्रेड कर रहे हैं (जो सोर्स से इमेज बनाती थी), तो एक `.env` होने के बाद प्रक्रिया वैसी ही है: उसमें डिफ़ॉल्ट रूप से `MYSQL_ROOT_PASSWORD=churchapps` था, इसलिए उसे `.env` में रखें साथ में `PUBLIC_URL` और `SITE_ADDRESS` भी, `docker-compose.yml` और `deploy/` को वर्तमान फ़ाइलों से बदलें, और `./deploy/b1 upgrade` चलाएँ।

## सोर्स से बिल्ड करना

डेवलपर इमेज खींचने के बजाय उन्हें स्थानीय रूप से बना सकते हैं:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`.env` में `API_CONTEXT` और `B1APP_CONTEXT` बिल्ड को स्थानीय चेकआउट (जैसे `../Api`) या git ref की ओर इंगित करते हैं।

## समस्या निवारण

| लक्षण | संभावित कारण | समाधान |
|---------|--------------|-----|
| `api` कंटेनर लूप में रीस्टार्ट होता है | माइग्रेशन विफलता या गलत डेटाबेस पासवर्ड | `./deploy/b1 logs api` — माइग्रेशन बताता है कि कौन सा मॉड्यूल विफल हुआ |
| `api` लॉग में "ENCRYPTION_KEY must be exactly 32 characters" | `.env` में हाथ से बदली या कटी हुई कुंजी | मूल 32-अक्षर की कुंजी बहाल करें (नई कुंजी तभी बनाएँ जब अभी कोई क्रेडेंशियल संग्रहीत न हो) |
| ब्राउज़र में प्रमाणपत्र चेतावनी दिखती है | DNS अभी यहाँ इंगित नहीं कर रहा, या पोर्ट 80/443 बंद हैं | DNS / फ़ायरवॉल ठीक करें; Caddy अपने-आप फिर कोशिश करता है |
| `/` पर वेबसाइट के बजाय डैशबोर्ड दिखता है | अभी कोई चर्च नहीं, या `DEFAULT_CHURCH_SLUG` मेल नहीं खाता | चर्च बनाएँ, या **Settings → Church** से slug सेट करें |
| "Check your email" दिखता है पर ईमेल नहीं आता | `MAIL_SYSTEM=SMTP` के साथ गलत क्रेडेंशियल | क्रेडेंशियल ठीक करें, या ईमेल बंद करने के लिए `MAIL_SYSTEM` हटा दें |
| चैट / लाइव सुविधाएँ चुप हैं | सामने लगे किसी दूसरे प्रॉक्सी ने websocket ब्लॉक किया है | socket उसी पोर्ट पर `/api/` पर है; `Upgrade` हेडर अनुमति दें |
| `install` मना करता है: "database volume already exists" | किसी पिछले इंस्टॉल के अवशेष | मिटाने के लिए `docker compose down -v`, या `.env` लिखकर `upgrade` उपयोग करें |

अभी भी अटके हैं? `./deploy/b1 logs` के आउटपुट के साथ [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) पर एक issue खोलें।

## संबंधित लेख

- **[Railway पर सेल्फ़-होस्टिंग](./railway-template)** — प्रबंधित होस्टिंग विकल्प, और साझा पोस्ट-डिप्लॉय कॉन्फ़िगरेशन गाइड
- **[प्रारंभिक सेटअप](../../getting-started/initial-setup)** — चर्च बनने के बाद के पहले कदम
- **[स्थानीय API सेटअप](../api/local-setup)** — विकास के लिए स्टैक सीधे चलाना
