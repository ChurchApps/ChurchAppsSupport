---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App एक सार्वजनिक-मुखी चर्च सदस्य एप्लिकेशन है, जो Next.js से बना है। यह प्रोफ़ाइल, समूह डायरेक्टरी, लाइव स्ट्रीमिंग और दान पेज सहित सदस्य अनुभव देता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js 22+** और **Git** इंस्टॉल करें -- देखें [Prerequisites](../setup/prerequisites)
- अपना API लक्ष्य कॉन्फ़िगर करें (demo या local) -- देखें [Environment Variables](../setup/environment-variables)

</div>

:::warning
B1App के लिए Node.js 22 या उसके बाद का संस्करण आवश्यक है। पुराने संस्करण समर्थित नहीं हैं।
:::

## सेटअप

### 1. रिपॉज़िटरी क्लोन करें

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. डिपेंडेंसी इंस्टॉल करें

```bash
cd B1App
npm install
```

### 3. एनवायरनमेंट वेरिएबल कॉन्फ़िगर करें

```bash
cp dotenv.sample.txt .env
```

`.env` खोलें और `NEXT_PUBLIC_*_API` एंडपॉइंट URL कॉन्फ़िगर करें। ये साझा demo API (`https://api.demo.churchapps.org`) या आपके local API इंस्टेंस की ओर इशारा कर सकते हैं। सैंपल फ़ाइल में अब भी बंद हो चुके staging URL सूचीबद्ध हो सकते हैं; उन्हें बदल दें।

### 4. डेव सर्वर शुरू करें

```bash
npm run dev
```

Next.js डेव सर्वर [http://localhost:3301](http://localhost:3301) पर शुरू होता है।

## मुख्य कमांड

| कमांड | विवरण |
|---------|-------------|
| `npm run dev` | पोर्ट 3301 पर Next.js डेव सर्वर शुरू करें |
| `npm run build` | Next.js के माध्यम से प्रोडक्शन बिल्ड |
| `npm run test` | Playwright से एंड-टू-एंड टेस्ट चलाएँ |
| `npm run lint` | Next.js लिंट चलाएँ |

## मुख्य एनवायरनमेंट वेरिएबल

| वेरिएबल | विवरण |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | हर मॉड्यूल के लिए API एंडपॉइंट URL |

:::info
`postinstall` स्क्रिप्ट `@churchapps/apphelper` से लोकेल और CSS फ़ाइलें कॉपी करती है। इंस्टॉल के बाद कंपोनेंट बिना स्टाइल के दिखें, तो `npm run postinstall` स्वयं चलाएँ।
:::

## टेक स्टैक

- TypeScript के साथ **Next.js 16**
- UI कंपोनेंट के लिए **React 19**
- डिज़ाइन सिस्टम के लिए **Material-UI 7**
- सर्वर स्टेट के लिए **React Query 5**
- साझा कंपोनेंट के लिए **`@churchapps/apphelper*`** पैकेज

## डिप्लॉयमेंट

प्रोडक्शन बिल्ड **S3 + CloudFront** पर डिप्लॉय होते हैं:

1. `npm run build` अनुकूलित Next.js बिल्ड तैयार करता है
2. बिल्ड आउटपुट एक S3 बकेट में सिंक होता है
3. नया संस्करण देने के लिए CloudFront invalidation ट्रिगर होता है

:::tip
विस्तृत डिप्लॉयमेंट निर्देशों के लिए [Web App Deployment](../deployment/web-apps) गाइड देखें।
:::
