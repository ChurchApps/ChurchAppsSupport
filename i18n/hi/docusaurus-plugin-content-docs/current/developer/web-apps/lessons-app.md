---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp, [Lessons.church](https://lessons.church) के लिए lesson content management application है। यह चर्च के lesson curricula बनाने, व्यवस्थित करने और प्रकाशित करने के लिए एक interface देता है, जो Next.js और React से बना है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **Node.js 22+** और **Git** इंस्टॉल करें -- [Prerequisites](../setup/prerequisites) देखें
- अपना API target कॉन्फ़िगर करें (local LessonsApi) -- [Environment Variables](../setup/environment-variables) देखें

</div>

:::warning
LessonsApp को Node.js 22 या उसके बाद का संस्करण चाहिए। पुराने संस्करण समर्थित नहीं हैं।
:::

## Setup

### 1. Repository clone करें

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Dependencies इंस्टॉल करें

```bash
cd LessonsApp
npm install
```

### 3. Environment variables कॉन्फ़िगर करें

Environment sample file को `.env` में copy करें और API endpoints कॉन्फ़िगर करें:

```bash
cp dotenv.sample.txt .env
```

API endpoint URLs को अपने local LessonsApi instance (`http://localhost:8090`) की ओर इंगित करें। Staging Lessons API बंद हो चुका है, इसलिए sample file में बचे किसी भी `api.staging.lessons.church` URL को बदल दें।

### 4. Dev server शुरू करें

```bash
npm run dev
```

Next.js dev server [http://localhost:3501](http://localhost:3501) पर शुरू होता है।

## मुख्य Commands

| Command | विवरण |
|---------|-------------|
| `npm run dev` | port 3501 पर Next.js dev server शुरू करें |
| `npm run build` | Next.js के माध्यम से production build |

## Tech Stack

- **Next.js 16** TypeScript के साथ
- **React 19** UI components के लिए
- साझा components के लिए **`@churchapps/apphelper*`** packages

:::info
LessonsApp **LessonsApi** backend से बात करता है, जो मुख्य ChurchApps Api से अलग API है। सुनिश्चित करें कि आपका environment सही Lessons API endpoint पर कॉन्फ़िगर है।
:::

## Deployment

Production builds **S3 + CloudFront** पर deploy होते हैं:

1. `npm run build` अनुकूलित Next.js build बनाता है
2. Build output एक S3 bucket में sync होता है
3. नया संस्करण serve करने के लिए CloudFront invalidation शुरू होता है

:::tip
विस्तृत deployment निर्देशों के लिए [Web App Deployment](../deployment/web-apps) guide देखें।
:::
