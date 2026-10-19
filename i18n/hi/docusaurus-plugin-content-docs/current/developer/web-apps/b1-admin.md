---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin चर्च प्रशासन डैशबोर्ड है -- Vite और Material-UI से बना एक React सिंगल-पेज एप्लिकेशन। चर्च स्टाफ इसका उपयोग लोगों, समूहों, उपस्थिति, दान, सामग्री और अन्य चीज़ों के प्रबंधन के लिए करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js 22+** और **Git** इंस्टॉल करें -- देखें [आवश्यकताएं](../setup/prerequisites)
- अपना API लक्ष्य कॉन्फ़िगर करें (डेमो या लोकल) -- देखें [पर्यावरण चर](../setup/environment-variables)

</div>

## सेटअप

### 1. रिपॉज़िटरी क्लोन करें

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. डिपेंडेंसी इंस्टॉल करें

```bash
cd B1Admin
npm install
```

### 3. पर्यावरण चर कॉन्फ़िगर करें

```bash
cp dotenv.sample.txt .env
```

`.env` खोलें और API endpoints कॉन्फ़िगर करें। आप उन्हें साझा डेमो API (`https://api.demo.churchapps.org`) या अपने लोकल API इंस्टेंस की ओर इंगित कर सकते हैं। सैंपल फ़ाइल में अभी भी रिटायर हो चुके staging URLs सूचीबद्ध हो सकते हैं; उन्हें बदल दें।

### 4. डेव सर्वर शुरू करें

```bash
npm start
```

यह Vite dev server लॉन्च करता है। ऐप hot module replacement सक्षम के साथ आपके ब्राउज़र में उपलब्ध होगा।

## मुख्य पर्यावरण चर

| चर | विवरण |
|----------|-------------|
| `REACT_APP_STAGE` | पर्यावरण का नाम (जैसे सैंपल फ़ाइल में `demo`, `prod`, या `selfhost`) |
| `PORT` | डेव सर्वर पोर्ट (डिफ़ॉल्ट: `3101`) |
| `REACT_APP_*_API` | हर मॉड्यूल के लिए API endpoint URLs |

:::info
`postinstall` स्क्रिप्ट `@churchapps/apphelper` से locale और CSS फ़ाइलें कॉपी करती है। अगर कंपोनेंट बिना स्टाइल के दिखें, तो `npm run postinstall` मैन्युअल रूप से चलाएं।
:::

## मुख्य कमांड

| कमांड | विवरण |
|---------|-------------|
| `npm start` | Vite dev server शुरू करें |
| `npm run build` | Vite के माध्यम से प्रोडक्शन बिल्ड |
| `npm run test` | Playwright से end-to-end टेस्ट चलाएं |
| `npm run lint` | auto-fix के साथ ESLint चलाएं |

## टेक स्टैक

- **React 19** TypeScript के साथ
- **Vite** बिल्ड टूलिंग और डेव सर्वर के लिए
- **Material-UI 7** UI कंपोनेंट के लिए
- **React Query 5** सर्वर स्टेट के लिए
- **`@churchapps/apphelper*`** पैकेज साझा कंपोनेंट के लिए

## डिप्लॉयमेंट

प्रोडक्शन बिल्ड **S3 + CloudFront** पर डिप्लॉय होते हैं:

1. `npm run build` स्टैटिक एसेट्स बनाता है
2. एसेट्स एक S3 bucket में सिंक होते हैं
3. नया संस्करण परोसने के लिए CloudFront invalidation ट्रिगर होता है

:::tip
विस्तृत डिप्लॉयमेंट निर्देशों के लिए [Web App Deployment](../deployment/web-apps) गाइड देखें।
:::
