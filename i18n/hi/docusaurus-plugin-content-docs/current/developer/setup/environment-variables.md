---
title: "पर्यावरण चर"
---

# पर्यावरण चर

<div class="article-intro">

प्रत्येक ChurchApps प्रोजेक्ट स्थानीय कॉन्फ़िगरेशन के लिए `.env` फ़ाइल का उपयोग करता है। प्रत्येक प्रोजेक्ट में एक नमूना फ़ाइल शामिल है जिसे आप कॉपी और कस्टमाइज़ करते हैं। यह पृष्ठ API, वेब ऐप और मोबाइल ऐप के लिए पर्यावरण चर को कवर करता है, जिसमें स्टेजिंग और स्थानीय API लक्ष्य के बीच चयन करना शामिल है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपने प्रोजेक्ट के लिए [पूर्वापेक्षाएँ](./prerequisites) इंस्टॉल करें
- जिस प्रोजेक्ट पर काम करना चाहते हैं उसकी रिपॉज़िटरी क्लोन करें
- यह समझने के लिए [प्रोजेक्ट अवलोकन](./project-overview) देखें कि आपके प्रोजेक्ट को किन API मॉड्यूल की आवश्यकता है

</div>

## सामान्य पैटर्न

1. प्रोजेक्ट रूट में `dotenv.sample.txt` या `.env.sample` खोजें।
2. इसे `.env` में कॉपी करें।
3. आवश्यकतानुसार मान संपादित करें।

```bash
# .env.sample वाले प्रोजेक्ट के लिए उदाहरण
cp .env.sample .env

# dotenv.sample.txt वाले प्रोजेक्ट के लिए उदाहरण
cp dotenv.sample.txt .env
```

:::warning
**`.env` फ़ाइलें कभी वर्शन कंट्रोल में कमिट न करें।** इनमें डेटाबेस क्रेडेंशियल, API कुंजी और JWT सीक्रेट जैसे रहस्य होते हैं। सभी ChurchApps प्रोजेक्ट `.gitignore` में `.env` शामिल करते हैं, लेकिन कमिट करने से पहले हमेशा दोबारा जाँच करें।
:::

## API लक्ष्य चुनना

सबसे महत्वपूर्ण निर्णय यह है कि आपका फ्रंटएंड API कॉल के लिए कहाँ पॉइंट करता है। दो विकल्प हैं:

### विकल्प 1: स्टेजिंग API (फ्रंटएंड विकास के लिए अनुशंसित)

साझा स्टेजिंग एनवायरनमेंट का उपयोग करें। कोई स्थानीय API या डेटाबेस सेटअप की आवश्यकता नहीं।

```bash
# बेस URL पैटर्न
https://api.staging.churchapps.org/{module}

# मॉड्यूल URL उदाहरण
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### विकल्प 2: स्थानीय API

अपनी मशीन पर Api प्रोजेक्ट चलाएँ। प्रत्येक मॉड्यूल के लिए बनाए गए डेटाबेस के साथ MySQL 8.0+ आवश्यक है। [API स्थानीय सेटअप](../api/local-setup) गाइड देखें।

```bash
# बेस URL पैटर्न
http://localhost:8084/{module}

# मॉड्यूल URL उदाहरण
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## API पर्यावरण चर

मुख्य **Api** प्रोजेक्ट (`.env.sample`) में सबसे अधिक कॉन्फ़िगरेशन है। यहाँ प्रमुख चर हैं:

### साझा सेटिंग्स

| चर | विवरण | उदाहरण |
|----------|-------------|---------|
| `ENVIRONMENT` | रनटाइम एनवायरनमेंट | `dev` |
| `SERVER_PORT` | स्थानीय डेव सर्वर के लिए HTTP पोर्ट | `8084` |
| `ENCRYPTION_KEY` | संवेदनशील डेटा के लिए 192-बिट एन्क्रिप्शन कुंजी | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | JSON Web Tokens साइन करने के लिए सीक्रेट | `jwt-secret-dev` |
| `FILE_STORE` | अपलोड की गई फ़ाइलें कहाँ संग्रहीत करें (`disk` या `s3`) | `disk` |
| `CORS_ORIGIN` | अनुमत CORS ऑरिजिन (स्थानीय डेव के लिए `*`) | `*` |

### डेटाबेस कनेक्शन

प्रत्येक API मॉड्यूल का अपना MySQL डेटाबेस और कनेक्शन स्ट्रिंग है:

| चर | डेटाबेस |
|----------|----------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
`root:password` को अपने वास्तविक MySQL क्रेडेंशियल से अपडेट करें। API चलाने से पहले प्रत्येक डेटाबेस बनाया जाना चाहिए। सभी मॉड्यूल के लिए स्कीमा बनाने के लिए `npm run initdb` या एकल मॉड्यूल के लिए `npm run initdb:membership` उपयोग करें।
:::

### WebSocket सेटिंग्स

| चर | विवरण | उदाहरण |
|----------|-------------|---------|
| `SOCKET_PORT` | WebSocket सर्वर के लिए पोर्ट | `8087` |
| `SOCKET_URL` | क्लाइंट कनेक्ट करने के लिए WebSocket URL | `ws://localhost:8087` |

---

## वेब ऐप पर्यावरण चर

### B1Admin (React + Vite)

नमूना फ़ाइल: `.env.sample`

| चर | विवरण | उदाहरण (स्टेजिंग) |
|----------|-------------|-------------------|
| `REACT_APP_STAGE` | एनवायरनमेंट नाम | `demo` |
| `PORT` | डेव सर्वर पोर्ट | `3101` |
| `REACT_APP_MEMBERSHIP_API` | Membership API URL | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | Attendance API URL | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | Giving API URL | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | सामग्री डिलीवरी URL | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | Google Analytics ID (वैकल्पिक) | `UA-123456789-1` |

स्थानीय API विकास के लिए, `localhost` वेरिएंट अनकमेंट करें और उपयोग करें:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

नमूना फ़ाइल: `.env.sample`

| चर | विवरण | उदाहरण (स्टेजिंग) |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | Membership API URL | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | Attendance API URL | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | Giving API URL | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | Messaging API URL | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | Content API URL | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | सामग्री डिलीवरी URL | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps बेस URL | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics ID (वैकल्पिक) | `UA-123456789-1` |

:::info
Next.js में ब्राउज़र में उपलब्ध होने वाले किसी भी पर्यावरण चर के लिए `NEXT_PUBLIC_` प्रीफ़िक्स आवश्यक है। केवल-सर्वर चर को इस प्रीफ़िक्स की आवश्यकता नहीं है।
:::

### LessonsApp (Next.js)

नमूना फ़ाइल: `dotenv.sample.txt`

| चर | विवरण | उदाहरण (स्टेजिंग) |
|----------|-------------|-------------------|
| `STAGE` | एनवायरनमेंट स्टेज | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | Lessons API URL | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | सामग्री डिलीवरी URL | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | ChurchApps बेस URL | `https://staging.churchapps.org` |

---

## मोबाइल ऐप पर्यावरण चर

### B1Mobile (React Native / Expo)

नमूना फ़ाइल: `dotenv.sample.txt`

| चर | विवरण | उदाहरण (स्टेजिंग) |
|----------|-------------|-------------------|
| `STAGE` | एनवायरनमेंट नाम | `dev` |
| `MEMBERSHIP_API` | Membership API URL | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | Messaging API URL | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | Attendance API URL | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | Giving API URL | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | Doing API URL | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | Content API URL | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | सामग्री डिलीवरी URL | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | Lessons साइट URL | `https://staging.lessons.church` |

:::info
मोबाइल ऐप `REACT_APP_` या `NEXT_PUBLIC_` प्रीफ़िक्स का उपयोग नहीं करते। पर्यावरण चर एक्सेस Expo कॉन्फ़िगरेशन द्वारा संभाला जाता है।
:::

---

## त्वरित संदर्भ: नमूना फ़ाइल स्थान

| प्रोजेक्ट | नमूना फ़ाइल |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
