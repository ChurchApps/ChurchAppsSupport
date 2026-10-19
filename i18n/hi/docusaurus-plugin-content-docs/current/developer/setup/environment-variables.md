---
title: "एनवायरनमेंट वेरिएबल्स"
---

# एनवायरनमेंट वेरिएबल्स

<div class="article-intro">

हर ChurchApps प्रोजेक्ट स्थानीय कॉन्फ़िगरेशन के लिए `.env` फ़ाइल का उपयोग करता है। हर प्रोजेक्ट में एक नमूना फ़ाइल होती है, जिसे आप कॉपी करके अपने अनुसार बदलते हैं। यह पृष्ठ APIs, वेब ऐप्स और मोबाइल ऐप्स के एनवायरनमेंट वेरिएबल्स बताता है, और यह भी कि डेमो और स्थानीय API लक्ष्य के बीच कैसे चुनाव करें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपने प्रोजेक्ट की [पूर्वापेक्षाएँ](./prerequisites) इंस्टॉल करें
- जिस प्रोजेक्ट पर काम करना है, उसका रिपॉज़िटरी क्लोन करें
- [प्रोजेक्ट का अवलोकन](./project-overview) देखें, ताकि समझ सकें कि आपके प्रोजेक्ट को किन API मॉड्यूल्स की जरूरत है

</div>

## सामान्य पैटर्न

1. प्रोजेक्ट के रूट में `dotenv.sample.txt` या `.env.sample` खोजें।
2. उसे `.env` के रूप में कॉपी करें।
3. आवश्यकतानुसार मान बदलें।

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**`.env` फ़ाइलों को कभी भी version control में commit न करें।** इनमें डेटाबेस क्रेडेंशियल, API keys और JWT secrets जैसी गोपनीय जानकारी होती है। सभी ChurchApps प्रोजेक्ट्स में `.env` `.gitignore` में होता है, फिर भी commit करने से पहले हमेशा दोबारा जाँच लें।
:::

## API लक्ष्य चुनना

सबसे महत्वपूर्ण निर्णय यह है कि आपका फ़्रंटएंड API कॉल्स के लिए कहाँ इंगित करता है। दो विकल्प हैं:

### विकल्प 1: डेमो APIs (फ़्रंटएंड डेवलपमेंट के लिए अनुशंसित)

साझा डेमो एनवायरनमेंट का उपयोग करें। किसी स्थानीय API या डेटाबेस सेटअप की आवश्यकता नहीं है। यह `main` का नवीनतम कोड चलाता है, और इसका नमूना डेटा हर रात फिर से भरा जाता है।

```bash
# Base URL pattern
https://api.demo.churchapps.org/{module}

# Example module URLs
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
स्टेजिंग एनवायरनमेंट (`api.staging.churchapps.org`, `api.staging.lessons.church`, और संबंधित होस्ट) बंद कर दिया गया है। कुछ नमूना `.env` फ़ाइलों में अब भी स्टेजिंग URL हो सकते हैं; उन्हें इस पृष्ठ पर दिखाए गए डेमो या स्थानीय मानों से बदलें। कोई साझा गैर-प्रोडक्शन Lessons API उपलब्ध नहीं है -- जब भी आपको उसकी आवश्यकता हो, [LessonsApi](https://github.com/ChurchApps/LessonsApi) को स्थानीय रूप से चलाएँ (यह पोर्ट `8090` पर सुनता है)।
:::

### विकल्प 2: स्थानीय API

Api प्रोजेक्ट को अपनी मशीन पर चलाएँ। इसके लिए MySQL 8.0+ चाहिए, जिसमें हर मॉड्यूल के लिए डेटाबेस बने हों। देखें [API स्थानीय सेटअप](../api/local-setup) मार्गदर्शिका।

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API एनवायरनमेंट वेरिएबल्स

मुख्य **Api** प्रोजेक्ट (`.env.sample`) में सबसे अधिक कॉन्फ़िगरेशन है। यहाँ प्रमुख वेरिएबल्स हैं:

### साझा सेटिंग्स

| वेरिएबल | विवरण | उदाहरण |
|----------|-------------|---------|
| `ENVIRONMENT` | रनटाइम एनवायरनमेंट | `dev` |
| `SERVER_PORT` | स्थानीय डेव सर्वर का HTTP पोर्ट | `8084` |
| `ENCRYPTION_KEY` | संवेदनशील डेटा के लिए 192-बिट एन्क्रिप्शन key | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON Web Tokens पर हस्ताक्षर करने के लिए secret | `jwt-secret-dev` |
| `FILE_STORE` | अपलोड की गई फ़ाइलें कहाँ सहेजें (`disk` या `s3`) | `disk` |
| `CORS_ORIGIN` | अनुमत CORS origins (स्थानीय डेव के लिए `*`) | `*` |

### डेटाबेस कनेक्शन

एक ही बेस URL API को MySQL से जोड़ता है। API इसी बेस से हर मॉड्यूल के लिए एक डेटाबेस तय करता है (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`)।

| वेरिएबल | उदाहरण |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
`root:password` को अपने वास्तविक MySQL क्रेडेंशियल से बदलें। API चलाने से पहले हर मॉड्यूल का डेटाबेस मौजूद होना चाहिए। सभी मॉड्यूल्स का स्कीमा बनाने के लिए `npm run initdb` चलाएँ, या एक ही मॉड्यूल के लिए `npm run initdb:membership`।
:::

### WebSocket सेटिंग्स

| वेरिएबल | विवरण | उदाहरण |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket सर्वर का पोर्ट | `8087` |
| `SOCKET_URL` | क्लाइंट्स के कनेक्ट होने के लिए WebSocket URL | `ws://localhost:8087` |

---

## वेब ऐप एनवायरनमेंट वेरिएबल्स

### B1Admin (React + Vite)

नमूना फ़ाइल: `.env.sample`

| वेरिएबल | विवरण | उदाहरण (डेमो) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | एनवायरनमेंट का नाम | `demo` |
| `PORT` | डेव सर्वर का पोर्ट | `3101` |
| `REACT_APP_API_BASE` | सभी ChurchApps APIs के लिए एक बेस URL (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` अपने आप जुड़ जाते हैं) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | कंटेंट डिलीवरी URL | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (वैकल्पिक) | `UA-123456789-1` |

स्थानीय API डेवलपमेंट के लिए, बेस URL को अपने स्थानीय स्टैक की ओर इंगित करें:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

नमूना फ़ाइल: `.env.sample`

| वेरिएबल | विवरण | उदाहरण (डेमो) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | सभी ChurchApps APIs के लिए एक बेस URL (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` अपने आप जुड़ जाते हैं) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | कंटेंट डिलीवरी URL | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (वैकल्पिक) | `UA-123456789-1` |

:::info
Next.js को किसी भी ऐसे एनवायरनमेंट वेरिएबल के लिए `NEXT_PUBLIC_` प्रीफ़िक्स चाहिए जो ब्राउज़र में उपलब्ध होना चाहिए। केवल सर्वर पर उपयोग होने वाले वेरिएबल्स को इस प्रीफ़िक्स की आवश्यकता नहीं होती।
:::

### LessonsApp (Next.js)

नमूना फ़ाइल: `dotenv.sample.txt`

| वेरिएबल | विवरण | उदाहरण (स्थानीय LessonsApi) |
|----------|-------------|----------------------------|
| `STAGE` | एनवायरनमेंट स्टेज (स्थानीय डेवलपमेंट के लिए अनसेट छोड़ें या `dev`) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | कंटेंट डिलीवरी URL | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | साइन-इन के लिए उपयोग होने वाला ChurchApps API बेस (केवल तब मान्य जब `STAGE` अनसेट या `dev` हो) | `https://api.demo.churchapps.org` |

---

## मोबाइल ऐप एनवायरनमेंट वेरिएबल्स

### B1Mobile (React Native / Expo)

नमूना फ़ाइल: `dotenv.sample.txt`

| वेरिएबल | विवरण | उदाहरण (डेमो) |
|----------|-------------|----------------|
| `STAGE` | एनवायरनमेंट का नाम | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | हर ChurchApps API मॉड्यूल के लिए एक URL (अनसेट होने पर हर एक डिफ़ॉल्ट रूप से प्रोडक्शन पर होता है) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API (अलग होस्ट; कोई साझा गैर-प्रोडक्शन संस्करण नहीं है) | `https://api.lessons.church` |
| `CONTENT_ROOT` | कंटेंट डिलीवरी URL | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | Lessons साइट URL | `https://lessons.church` |

:::info
मोबाइल ऐप्स `REACT_APP_` या `NEXT_PUBLIC_` प्रीफ़िक्स का उपयोग नहीं करते। एनवायरनमेंट वेरिएबल तक पहुँच Expo कॉन्फ़िगरेशन द्वारा संभाली जाती है।
:::

---

## त्वरित संदर्भ: नमूना फ़ाइल कहाँ है

| प्रोजेक्ट | नमूना फ़ाइल |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
