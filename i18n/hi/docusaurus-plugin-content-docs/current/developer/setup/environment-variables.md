---
title: "पर्यावरण चर"
description: "ChurchApps प्रोजेक्ट्स के लिए .env फ़ाइलें सेट करें, साझा डेमो API या लोकल API चुनें, और B1 Admin, B1.church, B1 Checkin तथा अन्य के लिए वेरिएबल भरें।"
---

# पर्यावरण चर

<div class="article-intro">

हर ChurchApps प्रोजेक्ट स्थानीय कॉन्फ़िगरेशन के लिए `.env` फ़ाइल का उपयोग करता है। हर प्रोजेक्ट में एक नमूना फ़ाइल होती है, जिसे आप कॉपी करके अपनी ज़रूरत के अनुसार बदलते हैं। इस पृष्ठ में API, वेब ऐप और मोबाइल ऐप के पर्यावरण चर दिए गए हैं, साथ ही यह भी बताया गया है कि डेमो और लोकल API लक्ष्य के बीच कैसे चुनाव करें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपने प्रोजेक्ट की [पूर्वापेक्षाएँ](./prerequisites.md) इंस्टॉल करें
- वह प्रोजेक्ट रिपॉज़िटरी क्लोन करें जिस पर आप काम करना चाहते हैं
- [प्रोजेक्ट अवलोकन](./project-overview.md) देखें ताकि समझ सकें कि आपके प्रोजेक्ट को कौन-से API मॉड्यूल चाहिए

</div>

## सामान्य पैटर्न

1. प्रोजेक्ट रूट में `dotenv.sample.txt` या `.env.sample` खोजें।
2. उसे `.env` नाम से कॉपी करें।
3. ज़रूरत के अनुसार मान संपादित करें।

```bash
# .env.sample वाले प्रोजेक्ट का उदाहरण
cp .env.sample .env

# dotenv.sample.txt वाले प्रोजेक्ट का उदाहरण
cp dotenv.sample.txt .env
```

:::warning
**`.env` फ़ाइलों को कभी भी वर्ज़न कंट्रोल में कमिट न करें।** इनमें डेटाबेस क्रेडेंशियल, API कुंजियाँ और JWT सीक्रेट जैसी गोपनीय जानकारी होती है। सभी ChurchApps प्रोजेक्ट्स में `.env` को `.gitignore` में शामिल किया गया है, फिर भी कमिट करने से पहले अच्छी तरह जाँच लें।
:::

## API लक्ष्य चुनना

सबसे महत्वपूर्ण निर्णय यह है कि आपका फ़्रंटएंड API कॉल किस पते पर भेजे। इसके दो विकल्प हैं:

### विकल्प 1: डेमो API (फ़्रंटएंड डेवलपमेंट के लिए अनुशंसित)

साझा डेमो वातावरण का उपयोग करें। इसके लिए किसी लोकल API या डेटाबेस सेटअप की ज़रूरत नहीं है। यह `main` शाखा का नवीनतम कोड चलाता है, और इसका नमूना डेटा हर रात फिर से भरा जाता है।

```bash
# बेस URL पैटर्न
https://api.demo.churchapps.org/{module}

# मॉड्यूल URL के उदाहरण
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
स्टेजिंग वातावरण (`api.staging.churchapps.org`, `api.staging.lessons.church` और संबंधित होस्ट) बंद किया जा चुका है। कुछ नमूना `.env` फ़ाइलों में अब भी स्टेजिंग URL हो सकते हैं; उन्हें इस पृष्ठ पर दिए डेमो या लोकल मानों से बदल दें। अब कोई साझा गैर-प्रोडक्शन Lessons API उपलब्ध नहीं है -- जब आपको एक चाहिए, तब [LessonsApi](https://github.com/ChurchApps/LessonsApi) को लोकली चलाएँ (यह पोर्ट `8090` पर सुनता है)।
:::

### विकल्प 2: लोकल API

Api प्रोजेक्ट को अपनी मशीन पर चलाएँ। इसके लिए MySQL 8.0+ चाहिए, जिसमें हर मॉड्यूल के लिए डेटाबेस बने हों। देखें [API लोकल सेटअप](../api/local-setup.md) मार्गदर्शिका।

```bash
# बेस URL पैटर्न
http://localhost:8084/{module}

# मॉड्यूल URL के उदाहरण
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API पर्यावरण चर

मुख्य **Api** प्रोजेक्ट (`.env.sample`) में सबसे अधिक कॉन्फ़िगरेशन है। यहाँ मुख्य वेरिएबल दिए गए हैं:

### साझा सेटिंग्स

| वेरिएबल | विवरण | उदाहरण |
|----------|-------------|---------|
| `ENVIRONMENT` | रनटाइम वातावरण | `dev` |
| `SERVER_PORT` | लोकल डेव सर्वर के लिए HTTP पोर्ट | `8084` |
| `ENCRYPTION_KEY` | संवेदनशील डेटा के लिए 192-बिट एन्क्रिप्शन कुंजी | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON Web Tokens पर हस्ताक्षर करने का सीक्रेट | `jwt-secret-dev` |
| `FILE_STORE` | अपलोड की गई फ़ाइलें कहाँ संग्रहीत हों (`disk` या `s3`) | `disk` |
| `CORS_ORIGIN` | अनुमत CORS ऑरिजिन (लोकल डेव के लिए `*`) | `*` |

### डेटाबेस कनेक्शन

एक ही बेस URL API को MySQL से जोड़ता है। API इसी बेस से हर मॉड्यूल के लिए एक अलग डेटाबेस तय करता है (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`)।

| वेरिएबल | उदाहरण |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
`root:password` को अपने वास्तविक MySQL क्रेडेंशियल से बदलें। API चलाने से पहले हर मॉड्यूल का डेटाबेस मौजूद होना चाहिए। सभी मॉड्यूल का स्कीमा बनाने के लिए `npm run initdb` का उपयोग करें, या केवल एक मॉड्यूल के लिए `npm run initdb:membership` चलाएँ।
:::

### WebSocket सेटिंग्स

| वेरिएबल | विवरण | उदाहरण |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket सर्वर का पोर्ट | `8087` |
| `SOCKET_URL` | वह WebSocket URL जिससे क्लाइंट कनेक्ट होते हैं | `ws://localhost:8087` |

---

## वेब ऐप पर्यावरण चर

### B1Admin (React + Vite)

नमूना फ़ाइल: `.env.sample`

| वेरिएबल | विवरण | उदाहरण (डेमो) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | वातावरण का नाम | `demo` |
| `PORT` | डेव सर्वर का पोर्ट | `3101` |
| `REACT_APP_API_BASE` | सभी ChurchApps API के लिए एकल बेस URL (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` अपने आप जोड़ दिए जाते हैं) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | कंटेंट डिलीवरी URL | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (वैकल्पिक) | `UA-123456789-1` |

लोकल API डेवलपमेंट के लिए, बेस URL को अपने लोकल स्टैक की ओर इंगित करें:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

नमूना फ़ाइल: `.env.sample`

| वेरिएबल | विवरण | उदाहरण (डेमो) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | सभी ChurchApps API के लिए एकल बेस URL (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` अपने आप जोड़ दिए जाते हैं) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | कंटेंट डिलीवरी URL | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (वैकल्पिक) | `UA-123456789-1` |

:::info
Next.js में, जो भी पर्यावरण चर ब्राउज़र में उपलब्ध होना चाहिए, उस पर `NEXT_PUBLIC_` उपसर्ग (prefix) होना अनिवार्य है। केवल सर्वर पर उपयोग होने वाले वेरिएबल को इस उपसर्ग की ज़रूरत नहीं होती।
:::

### LessonsApp (Next.js)

नमूना फ़ाइल: `dotenv.sample.txt`

| वेरिएबल | विवरण | उदाहरण (लोकल LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | वातावरण का चरण (लोकल डेवलपमेंट के लिए खाली छोड़ें या `dev` रखें) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | कंटेंट डिलीवरी URL | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | साइन-इन के लिए उपयोग होने वाला ChurchApps API बेस (केवल तभी लागू होता है जब `STAGE` खाली हो या `dev` हो) | `https://api.demo.churchapps.org` |

---

## मोबाइल ऐप पर्यावरण चर

### B1Checkin (React Native / Expo)

नमूना फ़ाइल: `dotenv.sample.txt`

| वेरिएबल | विवरण | उदाहरण |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | तय करता है कि ऐप किस API सेट से कनेक्ट होगा: `dev` (लोकल API `http://127.0.0.1:8084` पर), `staging`, या `prod` (सेट न होने पर डिफ़ॉल्ट) | `dev` |

B1Checkin केवल Membership और Attendance API मॉड्यूल तथा कंटेंट डिलीवरी URL का उपयोग करता है। हर चरण के लिए उनके पते `src/helpers/EnvironmentHelper.ts` में सेट हैं।

:::info
Expo केवल `EXPO_PUBLIC_` से शुरू होने वाले वेरिएबल ही ऐप बंडल में शामिल करता है। `.env` बदलने के बाद `yarn start --reset-cache` से डेव सर्वर फिर से शुरू करें।
:::

---

## त्वरित संदर्भ: नमूना फ़ाइलों के स्थान

| प्रोजेक्ट | नमूना फ़ाइल |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
