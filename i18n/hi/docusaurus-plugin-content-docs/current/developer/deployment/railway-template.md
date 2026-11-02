---
title: "Railway पर स्व-होस्टिंग"
---

# Railway पर स्व-होस्टिंग

<div class="article-intro">

ChurchApps एक एक-क्लिक [Railway](https://railway.com) टेम्पलेट प्रकाशित करता है जो आपके चर्च को B1 Admin, B1 सदस्य पोर्टल, API, और एक MySQL डेटाबेस का अपना निजी इंस्टेंस देता है -- सब कुछ उस इन्फ़्रास्ट्रक्चर पर चलता है जिसके आप मालिक हैं और जिसका भुगतान आप सीधे करते हैं। यह गाइड आपको लगभग 15 मिनट में लाइव कर देती है और फिर उस पोस्ट-डिप्लॉय कॉन्फ़िगरेशन के बारे में बताती है जो ज़्यादातर चर्च अंततः चाहते हैं।

</div>

## त्वरित शुरुआत

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. ऊपर **Deploy on Railway** बटन पर क्लिक करें।
2. Railway में साइन इन करें (या एक निःशुल्क खाता बनाएँ) और एक भुगतान विधि जोड़ें।
3. कुछ भी बदले बिना **Deploy** पर क्लिक करें -- हर चर का एक उचित डिफ़ॉल्ट है।
4. चारों सेवाओं के हरे होने तक 5–10 मिनट प्रतीक्षा करें।
5. **B1Admin** सेवा का URL खोलें, **Register** पर क्लिक करें, और अपना खाता बनाएँ। पहला खाता अपने आप server admin होता है।
6. अपना पहला चर्च बनाने के लिए ऐप के भीतर के संकेतों का पालन करें।

बस इतना ही। अब आपके पास एक पूरी तरह कार्यशील ChurchApps इंस्टेंस है। नीचे सब कुछ वैकल्पिक सुधार है।

:::tip
डिप्लॉय अभी **बीटा** में है। यदि आपको कुछ ऐसा मिले जो दस्तावेज़ में नहीं है, तो डिप्लॉय लॉग संलग्न करके [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) पर एक issue खोलें।
:::

<div class="prereqs">
<h4>आपको क्या चाहिए</h4>

- एक निःशुल्क [Railway](https://railway.com) खाता
- Railway पर फ़ाइल में एक क्रेडिट कार्ड (छोटी मंडली के लिए ~$15–25/माह; देखें [लागत](#costs))
- प्रारंभिक डिप्लॉय के लिए लगभग 15 मिनट
- *वैकल्पिक लेकिन बाद में दृढ़ता से अनुशंसित:* SMTP credentials और एक कस्टम डोमेन

</div>

## क्या डिप्लॉय होता है

टेम्पलेट एक एकल Railway प्रोजेक्ट में चार सेवाएँ तैयार करता है:

| सेवा | उद्देश्य | डिप्लॉय के बाद URL |
|---------|---------|------------------|
| **MySQL** | सारा डेटा संग्रहीत करता है (एक इंस्टेंस, कई schemas) | केवल आंतरिक |
| **Api** | membership, content, giving, attendance, आदि के लिए बैकएंड | `https://api-<id>.up.railway.app` |
| **B1Admin** | स्टाफ़/एडमिन वेब ऐप | `https://b1admin-<id>.up.railway.app` |
| **B1App** | सदस्य-मुखी वेब ऐप और चर्च वेबसाइट | `https://b1app-<id>.up.railway.app` |

डेटाबेस schemas पहली शुरुआत पर API के startup माइग्रेशन द्वारा अपने आप बनते हैं।

## पहली बार का कॉन्फ़िगरेशन

अब आप चालू हैं, तो ये वे चीज़ें हैं जो ज़्यादातर चर्च अगली बार सेट करते हैं, लगभग प्राथमिकता के क्रम में।

### 1. ईमेल (दृढ़ता से अनुशंसित) {#1-email-highly-recommended}

ईमेल के बिना, सदस्य अब भी पंजीकरण करके सिस्टम का उपयोग कर सकते हैं, लेकिन **वे भूले हुए पासवर्ड रीसेट नहीं कर सकते** -- यह एडमिन को उनके लिए करना होगा। SMTP सेट करने में लगभग 5 मिनट लगते हैं।

Railway डैशबोर्ड में **Api** सेवा → **Variables** खोलें, और जोड़ें:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<आपके प्रदाता का host>
SMTP_USER=<आपका username>
SMTP_PASS=<आपका पासवर्ड या API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

तीन प्रदाता जानने योग्य हैं:

#### Resend -- सबसे सरल निःशुल्क विकल्प (दिन के 100 ईमेल)

1. [resend.com](https://resend.com) पर साइन अप करें।
2. एक भेजने वाला डोमेन सत्यापित करें (या शुरू करने के लिए `onboarding@resend.dev` परीक्षण प्रेषक उपयोग करें)।
3. एक API key बनाएँ।
4. `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx` सेट करें।

#### Gmail -- व्यक्तिगत उपयोग के लिए निःशुल्क (~500/दिन)

1. Google खाते पर 2-factor auth चालू करें।
2. एक [App Password](https://myaccount.google.com/apppasswords) बनाएँ।
3. `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<16-अक्षर का app password>` सेट करें।

#### AWS SES -- बड़े पैमाने पर सबसे सस्ता

1. AWS में एक भेजने वाला डोमेन सत्यापित करें।
2. यदि आप असत्यापित पतों पर भेजेंगे तो SES sandbox से बाहर निकलें।
3. **SES → SMTP Settings → Create credentials** के अंतर्गत SMTP credentials बनाएँ।
4. `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP password>` सेट करें।

Variables सहेजने के बाद, Api सेवा अपने आप फिर से डिप्लॉय होती है। किसी परीक्षण खाते पर पासवर्ड रीसेट शुरू करके इसकी जाँच करें।

:::warning
यदि आप खराब credentials के साथ `MAIL_SYSTEM=SMTP` सेट करते हैं, तो पंजीकरण सफल दिखेगा लेकिन सत्यापन ईमेल कभी नहीं आएगा। या तो credentials ठीक करें या बिना-ईमेल मोड पर लौटने के लिए `MAIL_SYSTEM` हटाएँ।
:::

### 2. कस्टम डोमेन

डिफ़ॉल्ट `*.up.railway.app` URLs काम करते हैं, लेकिन ज़्यादातर चर्च अपने स्वयं के चाहते हैं।

हर वेब सेवा (B1Admin और B1App) के लिए:

1. Railway में सेवा खोलें → **Settings** → **Networking**।
2. **+ Custom Domain** पर क्लिक करें और hostname दर्ज करें:
   - B1Admin के लिए `admin.yourchurch.org`
   - B1App के लिए `app.yourchurch.org` (या `www`)
3. Railway द्वारा दिखाया गया CNAME रिकॉर्ड अपने DNS प्रदाता में जोड़ें।
4. DNS प्रसार के लिए कुछ मिनट प्रतीक्षा करें। Railway TLS सर्टिफ़िकेट अपने आप प्रदान करता है।

फिर **Api** सेवा के variables अपडेट करें ताकि ईमेल के लिंक नए डोमेन उपयोग करें:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

और **B1Admin** सेवा पर:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (यदि आपने कस्टम API डोमेन भी सेट किया है)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

`{subdomain}` टोकन शाब्दिक है -- रनटाइम पर इसे हर चर्च के सबडोमेन से बदला जाता है (नीचे Multi-Site देखें)।

### 3. मल्टी-साइट (एक इंस्टेंस पर कई चर्च) {#3-multi-site-multiple-churches-on-one-instance}

ChurchApps डिज़ाइन से मल्टी-टेनेंट है -- एक डिप्लॉयमेंट किसी भी संख्या में चर्चों को होस्ट कर सकता है, हर एक के अपने लोग, समूह और वेबसाइट के साथ। नए चर्च पूरी तरह एडमिन UI के माध्यम से जोड़े जाते हैं; किसी इन्फ़्रास्ट्रक्चर बदलाव की ज़रूरत नहीं।

#### अतिरिक्त चर्च जोड़ना

1. **B1 Admin** में, **Settings → Manage Church → Switch Church → Create New** पर जाएँ।
2. हर चर्च का एक अनूठा **subdomain slug** होता है (जैसे `firstchurch`, `gracecommunity`)।
3. नए चर्च को अपना डेटा, सदस्य, वेबसाइट, और giving सेटअप मिलता है, जो उसी इंस्टेंस के अन्य चर्चों से पूरी तरह अलग है।

#### हर चर्च को उसके अपने URL पर रूट करना

चर्चों को सार्वजनिक रूप से उजागर करने के दो तरीके हैं:

| पैटर्न | उदाहरण | सेटअप |
|---------|---------|-------|
| **पथ-आधारित** (बॉक्स से बाहर काम करता है) | `app.yourchurch.org/firstchurch` | कोई अतिरिक्त सेटअप नहीं |
| **सबडोमेन-आधारित** (साफ़ URLs) | `firstchurch.yourchurch.org` | वाइल्डकार्ड DNS + वाइल्डकार्ड कस्टम डोमेन |

Railway पर **सबडोमेन-आधारित** रूटिंग के लिए:

1. अपने DNS प्रदाता में एक वाइल्डकार्ड CNAME बनाएँ: `*.yourchurch.org → <b1app railway target>`।
2. Railway में, B1App सेवा → **Settings → Networking** पर, `*.yourchurch.org` को कस्टम डोमेन के रूप में जोड़ें।
3. **B1Admin** सेवा पर, `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org` सेट करें।

फिर से डिप्लॉय के बाद, हर चर्च की साइट अपने आप `<their-subdomain>.yourchurch.org` पर परोसी जाती है।

:::info
वाइल्डकार्ड कस्टम डोमेन के लिए एक भुगतान वाली Railway योजना आवश्यक है। पथ-आधारित रूटिंग हर योजना पर काम करती है और कार्यात्मक रूप से समान है -- बस URL बार में कम सुंदर।
:::

### 4. ऑनलाइन giving (Stripe / PayPal) {#4-online-giving-stripe--paypal}

Giving **हर चर्च के लिए एडमिन UI के भीतर** कॉन्फ़िगर होती है, पर्यावरण चरों के माध्यम से नहीं -- इस तरह हर चर्च अपना स्वयं का merchant खाता उपयोग कर सकता है।

1. [Stripe](https://dashboard.stripe.com/) (Developers → API keys) या [PayPal](https://developer.paypal.com/) (My Apps & Credentials) से डेवलपर credentials प्राप्त करें।
2. B1 Admin में, **Settings → Giving Settings** पर जाएँ।
3. अपना प्रदाता चुनें, Public और Secret keys चिपकाएँ, और शुल्क प्रबंधन कॉन्फ़िगर करें।
4. वैकल्पिक रूप से सार्वजनिक दान फ़ॉर्म को बॉट्स से बचाने के लिए Railway में **Api** सेवा में `GOOGLE_RECAPTCHA_SECRET_KEY` जोड़ें।

### 5. फ़ाइल स्टोरेज {#5-file-storage}

टेम्पलेट Api सेवा पर माउंट एक **1 GB स्थायी वॉल्यूम** तैयार करता है, सदस्य फ़ोटो, उपदेश फ़ाइलों और अपलोड किए गए दस्तावेज़ों के लिए।

इसे बढ़ाने के लिए: Api सेवा → **Volumes** खोलें → आकार स्लाइडर समायोजित करें।

बड़े डिप्लॉयमेंट (100+ GB या कई समवर्ती अपलोड) के लिए, **Api** सेवा पर ये सेट करके S3 पर जाएँ:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

वॉल्यूम में मौजूदा फ़ाइलें अपने आप माइग्रेट नहीं होतीं -- चर बदलने से पहले उन्हें bucket में कॉपी करें।

### 6. वैकल्पिक फ़ीचर एकीकरण {#6-optional-feature-integrations}

ये विशिष्ट फ़ीचर अनलॉक करते हैं और बाद में Railway डैशबोर्ड के माध्यम से जोड़े जा सकते हैं। इन्हें **Api** सेवा पर सेट करें।

| चर | सक्षम होने वाला फ़ीचर |
|----------|--------------------|
| `OPENAI_API_KEY` *या* `OPENROUTER_API_KEY` | AI-सहायता प्राप्त खोज और कंटेंट सुझाव |
| `YOUTUBE_API_KEY` | YouTube उपदेश खोज और एम्बेडिंग |
| `PEXELS_KEY` | वेबसाइट बिल्डर के लिए स्टॉक-इमेज पिकर |
| `VIMEO_TOKEN` | Vimeo उपदेश समर्थन |
| `API_BIBLE_KEY` | पाठों और कंटेंट में बाइबल पद खोज |
| `YOUVERSION_API_KEY` | YouVersion बाइबल एकीकरण |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | ब्राउज़र push सूचनाएँ ([VAPID keypair बनाएँ](./docker#push-notifications)) |
| `HUBSPOT_KEY` | नए पंजीकरणों के लिए वैकल्पिक CRM सिंक |

## अपडेट करना

हर सेवा अपनी संबंधित GitHub रिपॉज़िटरी से जुड़ी है। `ChurchApps/Api`, `ChurchApps/B1Admin`, या `ChurchApps/B1App` पर `main` में push होने से स्वचालित रीडिप्लॉय होते हैं।

किसी विशिष्ट संस्करण को पिन करने के लिए, हर सेवा पर **Branch** सेटिंग को एक tag या रिलीज़ branch में बदलें। उत्पादन के लिए यह अनुशंसित सेटअप है -- `main` से स्वचालित डिप्लॉय का मतलब है कि आप चल रहे किसी भी अधूरे काम को विरासत में लेते हैं।

## लागत {#costs}

एक छोटे चर्च (200 से कम सदस्य, हल्का ट्रैफ़िक) के लिए वास्तविक दुनिया की सीमाएँ:

| घटक | लगभग मासिक लागत |
|-----------|---------------------|
| Railway बेस | $5 |
| MySQL प्लगइन | $5 + ~$1 स्टोरेज |
| 3 वेब सेवाओं का compute | संयुक्त $3–10 |
| 1 GB वॉल्यूम | $0.25 |
| **कुल** | **~$15–25/माह** |

लागत ट्रैफ़िक, फ़ोटो अपलोड और डेटाबेस आकार के साथ रैखिक रूप से बढ़ती है। Railway प्रोजेक्ट के **Usage** टैब में लाइव उपयोग दिखाता है -- अपने जोखिम को सीमित करने के लिए वहाँ खर्च सीमा सेट करें।

## समस्या निवारण

| लक्षण | संभावित कारण | समाधान |
|---------|--------------|-----|
| `EBUSY: rmdir '/app/node_modules/.cache'` के साथ build विफल | Nixpacks cache mount टकराव | प्रभावित सेवा पर `NIXPACKS_NO_CACHE=true` सेट करें |
| B1Admin पर `Missing: @types/...` के साथ build विफल | असिंक्रनाइज़्ड `package-lock.json` | नवीनतम `main` खींचें |
| Api डिप्लॉय "Deploying" पर अटका | Healthcheck विफल -- `/health` 200 नहीं लौटा रहा | डिप्लॉय लॉग देखें; आमतौर पर कोई आवश्यक env var गायब |
| B1Admin "check your email" दिखाता है पर ईमेल नहीं आता | `MAIL_SYSTEM=SMTP` सेट है पर credentials गायब/गलत | credentials ठीक करें, या ईमेल बंद करने के लिए `MAIL_SYSTEM` हटाएँ |
| लॉगिन `api.churchapps.org` पर रीडायरेक्ट होता है | `REACT_APP_STAGE` `prod` है | B1Admin सेवा पर `REACT_APP_STAGE=custom` सेट करें |
| सबडोमेन वाले सभी चर्च एक ही कंटेंट दिखाते हैं | `REACT_APP_B1_WEBSITE_URL` में `{subdomain}` टोकन नहीं है | इसे जैसे `https://{subdomain}.yourchurch.org` पर सेट करें |
| कस्टम डोमेन "Application not found" दिखाता है | DNS अभी प्रसारित नहीं हुआ, या Railway सर्टिफ़िकेट लंबित | 5 मिनट प्रतीक्षा करें; `dig admin.yourchurch.org` से DNS जाँचें |

यदि आपको इस सूची में न दिखने वाली कोई समस्या मिले, तो डिप्लॉय लॉग संलग्न करके [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) पर एक issue खोलें।

## संबंधित लेख

- **[Docker के साथ स्व-होस्टिंग](./docker)** -- अपने हार्डवेयर या VPS पर वही स्टैक
- **[प्रारंभिक सेटअप](../../getting-started/initial-setup)** -- आपका चर्च बनने के बाद पहले कदम
- **[Website Initial Setup](../../b1-admin/website/initial-setup)** -- अपने चर्च की सार्वजनिक साइट कॉन्फ़िगर करें
- **[Giving Settings](../../b1-admin/donations/online-giving-setup)** -- Stripe या PayPal जोड़ें
- **[Local API Setup](../api/local-setup)** -- विकास के लिए स्थानीय रूप से स्टैक चलाना
- **[API Deployment (AWS)](./apis)** -- आधिकारिक ChurchApps SaaS कैसे डिप्लॉय होता है
