---
title: "डेटाबेस"
description: "जानें कि ChurchApps API डेटा को छह MySQL डेटाबेस में कैसे बाँटता है, प्रत्येक मॉड्यूल के लिए एक, और कनेक्शन कैसे कॉन्फ़िगर और आरंभ करें।"
---

# डेटाबेस

<div class="article-intro">

ChurchApps API एक **database-per-module** आर्किटेक्चर का उपयोग करता है। छह डेटा मॉड्यूल में से हर एक का अपना MySQL डेटाबेस और स्वतंत्र कनेक्शन पूल है। इससे डेटा की सीमाएँ स्पष्ट रहती हैं, और सब कुछ एक ही डिप्लॉयमेंट के भीतर बना रहता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **MySQL 8.0+** इंस्टॉल करें -- देखें [आवश्यकताएँ](../setup/prerequisites.md)
- अपनी `.env` फ़ाइल में डेटाबेस कनेक्शन स्ट्रिंग कॉन्फ़िगर करें -- देखें [एनवायरनमेंट वेरिएबल](../setup/environment-variables.md)

</div>

## आर्किटेक्चर का अवलोकन

```
Api
├── membership_db   ← People, groups, permissions
├── attendance_db   ← Services, sessions, records
├── content_db      ← Pages, sections, elements
├── giving_db       ← Donations, funds, payments
├── messaging_db    ← Conversations, notifications
└── doing_db        ← Tasks, plans, assignments
```

### मुख्य डिज़ाइन निर्णय

- **हर मॉड्यूल के लिए एक डेटाबेस** -- हर मॉड्यूल अपना MySQL डेटाबेस रखता है, जिसका एक समर्पित कनेक्शन पूल होता है (जिसे `KyselyPool` संभालता है)। इससे मॉड्यूल एक-दूसरे से स्वतंत्र रहते हैं और हर मॉड्यूल का स्कीमा अलग से विकसित हो सकता है।
- **विशेष स्वामित्व** -- किसी मॉड्यूल की तालिकाएँ केवल उसी मॉड्यूल के अपने कोड द्वारा पढ़ी और लिखी जाती हैं। जब किसी दूसरे मॉड्यूल को उस डेटा की ज़रूरत होती है, तो वह तालिकाओं को सीधे क्वेरी करने के बजाय स्वामी मॉड्यूल के गेटवे को कॉल करता है -- देखें [मॉड्यूल के बीच संचार](./module-structure.md#cross-module-communication)।
- **ORM के बिना रिपॉज़िटरी पैटर्न** -- सारी डेटा एक्सेस उन रिपॉज़िटरी क्लास के माध्यम से होती है जो मॉड्यूल के स्कीमा के विरुद्ध Kysely क्वेरी बिल्डर से टाइप्ड SQL बनाती हैं। इससे क्वेरी के प्रदर्शन और व्यवहार पर पूरा नियंत्रण मिलता है।
- **डिज़ाइन से ही मल्टी-टेनेंट** -- हर क्वेरी `churchId` द्वारा सीमित होती है। सभी तालिकाओं में `churchId` कॉलम होता है, और रिपॉज़िटरी लेयर टेनेंट के बीच अलगाव अपने आप लागू करती है।

## कनेक्शन स्ट्रिंग

हर मॉड्यूल का डेटाबेस कनेक्शन `.env` में मानक MySQL कनेक्शन स्ट्रिंग फ़ॉर्मैट में कॉन्फ़िगर किया जाता है:

```
mysql://user:password@host:port/database
```

उदाहरण के लिए, एक स्थानीय डेवलपमेंट सेटअप कुछ ऐसा दिख सकता है:

हर मॉड्यूल अपना कनेक्शन `<MODULE>_CONNECTION_STRING` नाम के एनवायरनमेंट वेरिएबल से पढ़ता है:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
प्रोडक्शन में, कनेक्शन स्ट्रिंग AWS SSM Parameter Store में संग्रहीत होती हैं और स्टार्टअप पर `Environment` क्लास द्वारा पढ़ी जाती हैं।
:::

## स्कीमा स्क्रिप्ट

तालिका के स्कीमा `tools/migrations/` डायरेक्टरी में Kysely माइग्रेशन के रूप में परिभाषित हैं, जो मॉड्यूल के अनुसार व्यवस्थित हैं:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

माइग्रेशन तालिका निर्माण, इंडेक्स और स्कीमा में बदलाव परिभाषित करते हैं। `tools/dbScripts/` डायरेक्टरी में डेमो और सीड डेटा होता है, जिसे स्कीमा के ऊपर लोड किया जा सकता है।

## डेटाबेस इनिशियलाइज़ेशन

### सभी डेटाबेस इनिशियलाइज़ करें

```bash
npm run initdb
```

यह छहों डेटाबेस बनाता है और हर एक के लिए माइग्रेशन चलाता है।

### एक ही मॉड्यूल इनिशियलाइज़ करें

```bash
npm run initdb -- --module=membership
```

:::tip
किसी विशेष मॉड्यूल पर काम करते समय, आप केवल उसी मॉड्यूल का डेटाबेस दोबारा इनिशियलाइज़ कर सकते हैं, बिना दूसरों को प्रभावित किए।
:::

## डेटा एक्सेस पैटर्न

रिपॉज़िटरी मॉड्यूल के `getDb()` फ़ंक्शन के माध्यम से प्राप्त टाइप्ड डेटाबेस स्कीमा के विरुद्ध Kysely क्वेरी बिल्डर से क्वेरी बनाती हैं। एक सामान्य रिपॉज़िटरी मेथड कुछ इस तरह दिखता है:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

रिपॉज़िटरी `RepoManager` के माध्यम से प्राप्त की जाती हैं:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
मल्टी-टेनेंट अलगाव बनाए रखने के लिए अपनी क्वेरी में हमेशा `churchId` शामिल करें। किसी विशिष्ट, अधिकृत कारण के बिना टेनेंट के पार कभी क्वेरी न करें।
:::

## क्रॉस-मॉड्यूल संदर्भ

क्योंकि हर मॉड्यूल का डेटा एक अलग डेटाबेस में रहता है, मॉड्यूल की सीमाओं के पार कोई फ़ॉरेन की या SQL जॉइन नहीं होते। जो रिकॉर्ड किसी दूसरे मॉड्यूल के डेटा से संबंधित है, वह उस रिकॉर्ड का id संग्रहीत करता है -- उदाहरण के लिए, giving डेटाबेस में एक दान में membership डेटाबेस के एक व्यक्ति का `personId` होता है -- और कोई भी क्रॉस-मॉड्यूल संयोजन एप्लिकेशन कोड में होता है।

यह बाधा ही मॉड्यूल की सीमाओं को वास्तविक बनाती है: हर स्कीमा स्वतंत्र रूप से विकसित हो सकता है, किसी मॉड्यूल का डेटाबेस अपने अलग सर्वर पर ले जाया जा सकता है, और किसी मॉड्यूल को साझा तालिकाओं या क्रॉस-डेटाबेस क्वेरी को सुलझाए बिना एक स्वतंत्र सेवा के रूप में भी अलग किया जा सकता है।

## संबंधित लेख

- **[मॉड्यूल संरचना](./module-structure.md)** -- हर मॉड्यूल के भीतर कंट्रोलर और रिपॉज़िटरी कैसे व्यवस्थित हैं
- **[स्थानीय API सेटअप](./local-setup.md)** -- चरण-दर-चरण पूरी सेटअप मार्गदर्शिका
