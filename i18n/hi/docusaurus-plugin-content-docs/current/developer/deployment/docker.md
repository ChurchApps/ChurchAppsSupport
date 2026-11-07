---
title: "Docker के साथ स्व-होस्टिंग"
description: "Docker से अपनी मशीन पर निजी B1 Admin, मेंबर पोर्टल, API और MySQL स्टैक इंस्टॉल करें, फिर b1 कमांड से अपग्रेड और बैकअप करें।"
---

# Docker के साथ स्व-होस्टिंग

<div class="article-intro">

Docker वाली किसी भी मशीन पर -- एक होम सर्वर, एक छोटा VPS, या ऑन-प्रिमाइसेस बॉक्स -- B1 Admin, B1 सदस्य पोर्टल और वेबसाइट, API, और एक MySQL डेटाबेस का अपना निजी इंस्टेंस चलाएँ। एक कमांड इसे इंस्टॉल करता है, एक कमांड इसे अपग्रेड करता है, और हर अपग्रेड पहले बैकअप लेता है। यदि आप सर्वर बिल्कुल प्रबंधित नहीं करना चाहते, तो प्रबंधित विकल्प के लिए [Railway पर स्व-होस्टिंग](./railway-template.md) देखें।

</div>

## त्वरित शुरुआत

<div class="prereqs">
<h4>आपको क्या चाहिए</h4>

- एक Linux मशीन (या WSL या Git Bash वाला macOS / Windows -- `b1` helper एक bash स्क्रिप्ट है) जिस पर [Docker Engine](https://docs.docker.com/engine/install/) और Compose v2 (Docker Desktop में शामिल) हों
- लगभग 2 GB RAM और 5 GB डिस्क
- सार्वजनिक साइट के लिए: मशीन की ओर इंगित एक डोमेन नाम, जिसके पोर्ट 80 और 443 पहुँच योग्य हों

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

`http://localhost` पर चलाने के लिए `--domain` छोड़ दें। इंस्टॉलर एक `b1church` फ़ोल्डर बनाता है, नए जनरेट किए गए secrets के साथ एक `.env` लिखता है, GitHub Container Registry से पहले से बनी images खींचता है, और API के स्वस्थ होने की रिपोर्ट तक प्रतीक्षा करता है। आपकी मशीन पर कुछ भी build नहीं होता, इसलिए पहली शुरुआत में एक-दो मिनट लगते हैं।

पूरा होने पर:

1. **https://church.example.org/admin** (या http://localhost/admin) खोलें और **Register** पर क्लिक करें। पहला खाता अपने आप server admin होता है।
2. अपना पहला चर्च बनाने के लिए ऐप के भीतर के संकेतों का पालन करें। चर्च बनते ही उसकी वेबसाइट और सदस्य पोर्टल **https://church.example.org/** पर लाइव हो जाते हैं।

सब कुछ एक ही डोमेन के पीछे चलता है:

| पथ | सेवा |
|------|------|
| `/` | B1App -- चर्च वेबसाइट और सदस्य पोर्टल |
| `/admin` | B1Admin -- स्टाफ़ डैशबोर्ड |
| `/api` | API, अपलोड की गई फ़ाइलें, और लाइव-अपडेट websocket |

HTTPS स्वचालित है: बंडल किया गया [Caddy](https://caddyserver.com/) प्रॉक्सी `.env` के डोमेन के लिए Let's Encrypt सर्टिफ़िकेट प्राप्त और नवीनीकृत करता है। केवल पोर्ट 80 और 443 खुले हैं; डेटाबेस केवल Docker नेटवर्क के भीतर से पहुँच योग्य है।

## `b1` कमांड

इंस्टॉलर `docker-compose.yml` के बगल में एक `deploy/b1` स्क्रिप्ट छोड़ता है। रोज़मर्रा के काम के लिए बस यही चाहिए:

| कमांड | यह क्या करता है |
|---------|--------------|
| `./deploy/b1 upgrade` | वर्तमान रिलीज़ खींचता है, बैकअप लेता है, रीस्टार्ट करता है, और API के स्वस्थ होने की पुष्टि करता है |
| `./deploy/b1 upgrade 2026.10.1` | वही, किसी विशिष्ट रिलीज़ पर पिन किया हुआ |
| `./deploy/b1 backup` | डेटाबेस, अपलोड की गई फ़ाइलों और `.env` का `backups/<timestamp>/` में स्नैपशॉट लेता है |
| `./deploy/b1 restore backups/<timestamp>` | एक स्नैपशॉट वापस रखता है (चलते समय API रुकता है) |
| `./deploy/b1 rollback` | सबसे नया बैकअप पुनर्स्थापित करता है, उस रिलीज़ सहित जिस पर वह लिया गया था |
| `./deploy/b1 status` | इंस्टॉल की गई संस्करण और कंटेनर स्वास्थ्य |
| `./deploy/b1 logs api` | किसी सेवा के लॉग लाइव देखें |

रिलीज़ एक संस्करित bundle के रूप में प्रकाशित होते हैं ताकि तीनों images हमेशा मेल खाएँ। `.env` में `B1_VERSION=stable` नवीनतम रिलीज़ को ट्रैक करता है; पिन करने के लिए इसे किसी विशिष्ट संस्करण पर सेट करें। रिलीज़ नोट्स [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases) के अंतर्गत हैं।

## कॉन्फ़िगरेशन

सभी सेटिंग्स `docker-compose.yml` के बगल में `.env` में रहती हैं। इंस्टॉलर आवश्यक सेटिंग्स भरता है:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # Caddy क्या परोसता है; स्थानीय इंस्टॉल के लिए http://localhost
PUBLIC_URL=https://church.example.org    # ब्राउज़र और ईमेल साइट तक कैसे पहुँचते हैं
MYSQL_ROOT_PASSWORD=…                    # जनरेट किया गया
JWT_SECRET=…                             # जनरेट किया गया
ENCRYPTION_KEY=…                         # जनरेट किया गया, ठीक 32 अक्षर -- credentials संग्रहीत होने के बाद इसे कभी न बदलें

# ईमेल -- दृढ़ता से अनुशंसित; इसके बिना सदस्य अपना पासवर्ड स्वयं रीसेट नहीं कर सकते
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

`.env` संपादित करने के बाद, उसे `docker compose up -d` से लागू करें। वेब ऐप्स ब्राउज़र के पते से पहचानते हैं कि किस API से बात करनी है, इसलिए डोमेन बदलने के लिए केवल `SITE_ADDRESS` और `PUBLIC_URL` अपडेट करने और रीस्टार्ट करने की ज़रूरत है -- कोई रीबिल्ड नहीं।

:::warning
`.env` सुरक्षित रखें। `ENCRYPTION_KEY` संग्रहीत भुगतान-गेटवे और स्टोरेज credentials की रक्षा करता है; इसके बिना बैकअप उन्हें डिक्रिप्ट नहीं कर सकता। `./deploy/b1 backup` इसी कारण से उसकी एक प्रति शामिल करता है।
:::

### बाद में डोमेन पर जाना

यदि आपने `localhost` पर इंस्टॉल किया और बाद में उसे सार्वजनिक करना चाहते हैं: मशीन की ओर DNS इंगित करें, `.env` में `DOMAIN`, `SITE_ADDRESS` (केवल डोमेन) और `PUBLIC_URL` (`https://` + डोमेन) सेट करें, फिर `docker compose up -d`। पहले अनुरोध पर Caddy सर्टिफ़िकेट लाता है।

## ईमेल, Giving, मल्टी-साइट, और एकीकरण

ये बिल्कुल Railway की तरह काम करते हैं -- वही पर्यावरण चर, Railway डैशबोर्ड के बजाय `.env` में सेट:

- **[ईमेल / SMTP](./railway-template.md#1-email-highly-recommended)** -- Resend, Brevo, और Gmail के लिए प्रदाता वॉकथ्रू
- **[मल्टी-साइट](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** -- प्रति इंस्टेंस असीमित चर्च। `/` वह चर्च परोसता है जिसका slug `DEFAULT_CHURCH_SLUG` है (पहला चर्च `church` है); अतिरिक्त डोमेन को बॉक्स की ओर इंगित करें और B1Admin में **Settings → Domains** के अंतर्गत उन्हें मैप करें
- **[ऑनलाइन giving](./railway-template.md#4-online-giving-stripe--paypal)** -- हर चर्च के लिए एडमिन UI में कॉन्फ़िगर
- **[वैकल्पिक एकीकरण](./railway-template.md#6-optional-feature-integrations)** -- `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Push notifications](#push-notifications)** -- `WEB_PUSH_*`; इंस्टॉलर इन्हें खाली छोड़ता है, इसलिए आप इन्हें जोड़ने तक push बंद रहता है

स्व-होस्टेड इंस्टेंस पर निमंत्रण और अन्य चर्च द्वारा भेजे गए ईमेल अपने आप सक्षम होते हैं (होस्टेड सेवा अपनी प्रेषक प्रतिष्ठा की रक्षा के लिए इन्हें मैन्युअल समीक्षा के पीछे रखती है)।

## Push Notifications {#push-notifications}

सर्वर पर VAPID key pair आने तक ब्राउज़र और मोबाइल वेब push बंद रहते हैं। इंस्टॉलर इसे नहीं बनाता। आप इसे जोड़ने तक, मोबाइल वेब ऐप का Notifications पृष्ठ बताता है कि साइट के लिए push चालू नहीं है।

1. एक key pair बनाएँ। इसके लिए केवल Docker चाहिए:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. `.env` में दो मान जोड़ें। `WEB_PUSH_SUBJECT` वैकल्पिक है, और यह वह संपर्क पता है जो push सेवाएँ देखती हैं:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. इन्हें लागू करें:

   ```bash
   docker compose up -d
   ```

4. पुष्टि के लिए, B1Admin में **Server Admin → Server Health** खोलें। दोनों Web Push keys कॉन्फ़िगर दिखनी चाहिए। फिर सदस्य मोबाइल वेब ऐप से सूचनाएँ चालू कर सकते हैं।

:::warning
सदस्यों के पंजीकरण के बाद वही keys रखें। उन्हें बदलने से हर मौजूदा सदस्यता अमान्य हो जाती है, और हर डिवाइस को फिर से पंजीकरण करना होता है।
:::

## डेटा, बैकअप, और फ़ाइल स्टोरेज

तीन नामित Docker volumes सारी स्थिति रखते हैं:

| Volume | सामग्री |
|--------|----------|
| `b1church_mysql-data` | सभी डेटाबेस schemas |
| `b1church_api-content` | अपलोड की गई फ़ाइलें -- फ़ोटो, दस्तावेज़, वेबसाइट इमेज |
| `b1church_caddy-data` | TLS सर्टिफ़िकेट |

`./deploy/b1 backup` पहले दो का, साथ में `.env` का, एक सुसंगत स्नैपशॉट `backups/<timestamp>/` में लिखता है। इसे cron से शेड्यूल करें और फ़ोल्डर को मशीन से बाहर कहीं कॉपी करें:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

बड़ी मीडिया लाइब्रेरी के लिए आप फ़ाइल स्टोरेज को S3 पर बदल सकते हैं -- `FILE_STORE=S3` और [Railway गाइड के File Storage अनुभाग](./railway-template.md#5-file-storage) में वर्णित `AWS_*` चर सेट करें। डेटाबेस बैकअप में S3 objects शामिल नहीं होते; वहाँ bucket versioning चालू करें।

## अपडेट करना

```bash
./deploy/b1 upgrade
```

क्रम में: रिलीज़ खींचता है, बैकअप लेता है, कंटेनर फिर से बनाता है, API शुरू होते समय लंबित डेटाबेस माइग्रेशन चलाता है, और API के health check की प्रतीक्षा करता है। यदि कुछ भी विफल होता है, तो यह रुक जाता है और `./deploy/b1 rollback` चलाने को कहता है, जो वह बैकअप और पिछली रिलीज़ पुनर्स्थापित करता है। माइग्रेशन केवल आगे की ओर चलते हैं; रोलबैक का मतलब हमेशा स्नैपशॉट पुनर्स्थापित करना होता है।

बीटा compose फ़ाइल (जो स्रोत से images बनाती थी) से अपग्रेड करना, एक `.env` होने के बाद, उसी तरह काम करता है: यह डिफ़ॉल्ट रूप से `MYSQL_ROOT_PASSWORD=churchapps` उपयोग करती थी, इसलिए उसे `PUBLIC_URL` और `SITE_ADDRESS` के साथ `.env` में डालें, `docker-compose.yml` और `deploy/` को वर्तमान फ़ाइलों से बदलें, और `./deploy/b1 upgrade` चलाएँ।

## स्रोत से build करना

डेवलपर images खींचने के बजाय उन्हें स्थानीय रूप से build कर सकते हैं:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`.env` में `API_CONTEXT` और `B1APP_CONTEXT` builds को स्थानीय checkouts (जैसे `../Api`) या एक git ref की ओर इंगित करते हैं।

## समस्या निवारण

| लक्षण | संभावित कारण | समाधान |
|---------|--------------|-----|
| `api` कंटेनर लूप में रीस्टार्ट होता है | माइग्रेशन विफलता या गलत डेटाबेस पासवर्ड | `./deploy/b1 logs api` -- माइग्रेशन बताता है कि कौन सा मॉड्यूल विफल हुआ |
| `api` लॉग कहता है "ENCRYPTION_KEY must be exactly 32 characters" | `.env` में हाथ से संपादित या कटी हुई key | मूल 32-अक्षर की key पुनर्स्थापित करें (नई जनरेट करें केवल तब जब अभी कोई credentials संग्रहीत न हों) |
| ब्राउज़र सर्टिफ़िकेट चेतावनी दिखाता है | DNS अभी यहाँ इंगित नहीं कर रहा, या पोर्ट 80/443 अवरुद्ध | DNS / फ़ायरवॉल ठीक करें; Caddy अपने आप पुनः प्रयास करता है |
| `/` वेबसाइट के बजाय डैशबोर्ड दिखाता है | अभी कोई चर्च नहीं, या `DEFAULT_CHURCH_SLUG` मेल नहीं खाता | चर्च बनाएँ, या **Settings → Church** से slug सेट करें |
| "Check your email" लेकिन ईमेल नहीं आता | खराब credentials के साथ `MAIL_SYSTEM=SMTP` | credentials ठीक करें, या ईमेल बंद करने के लिए `MAIL_SYSTEM` हटाएँ |
| मोबाइल वेब ऐप कहता है push notifications चालू नहीं हैं | सर्वर पर कोई VAPID keys नहीं | [Push Notifications](#push-notifications) में वर्णित अनुसार जोड़ें |
| चैट / लाइव सुविधाएँ चुप | सामने किसी अन्य प्रॉक्सी द्वारा websocket अवरुद्ध | socket उसी पोर्ट पर `/api/` पर है; `Upgrade` headers की अनुमति दें |
| `install` अस्वीकार: "database volume already exists" | किसी पिछले इंस्टॉल के अवशेष | मिटाने के लिए `docker compose down -v`, या `.env` लिखकर `upgrade` उपयोग करें |

अब भी अटके हैं? `./deploy/b1 logs` के आउटपुट के साथ [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) पर एक issue खोलें।

## संबंधित लेख

- **[Railway पर स्व-होस्टिंग](./railway-template.md)** -- प्रबंधित होस्टिंग विकल्प, साथ में साझा पोस्ट-डिप्लॉय कॉन्फ़िगरेशन गाइड
- **[प्रारंभिक सेटअप](../../getting-started/initial-setup.md)** -- आपका चर्च बनने के बाद पहले कदम
- **[Local API Setup](../api/local-setup.md)** -- विकास के लिए स्टैक को सीधे चलाना
