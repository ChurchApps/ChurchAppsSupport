---
title: "डेटाबेस"
---

# डेटाबेस

<div class="article-intro">

ChurchApps API एक **डेटाबेस-प्रति-मॉड्यूल** आर्किटेक्चर का उपयोग करता है। छह डेटा मॉड्यूलों में से हर एक का अपना MySQL डेटाबेस है जिसका अपना स्वतंत्र कनेक्शन पूल है, जो एक ही डिप्लॉयमेंट के भीतर सब कुछ रखते हुए स्पष्ट डेटा सीमाएँ प्रदान करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **MySQL 8.0+** इंस्टॉल करें -- [Prerequisites](../setup/prerequisites) देखें
- अपनी `.env` फ़ाइल में डेटाबेस कनेक्शन स्ट्रिंग्स कॉन्फ़िगर करें -- [Environment Variables](../setup/environment-variables) देखें

</div>

## आर्किटेक्चर अवलोकन

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

- **प्रति मॉड्यूल एक डेटाबेस** -- हर मॉड्यूल अपने MySQL डेटाबेस को एक समर्पित कनेक्शन पूल (`KyselyPool` द्वारा प्रबंधित) के साथ बनाए रखता है। इससे मॉड्यूल्स एक-दूसरे से अलग रहते हैं और स्वतंत्र स्कीमा विकास संभव होता है।
- **एक्सक्लूसिव ओनरशिप** -- किसी मॉड्यूल की टेबल्स को केवल उसी मॉड्यूल का अपना कोड पढ़ता और लिखता है। जब किसी दूसरे मॉड्यूल को वह डेटा चाहिए होता है, तो वह टेबल्स को खुद क्वेरी करने के बजाय उस डेटा के मालिक मॉड्यूल के गेटवे को कॉल करता है -- [Cross-Module Communication](./module-structure#cross-module-communication) देखें।
- **ORM के बिना रिपॉज़िटरी पैटर्न** -- सभी डेटा एक्सेस रिपॉज़िटरी क्लासेज़ के ज़रिए होता है जो मॉड्यूल की स्कीमा के विरुद्ध Kysely क्वेरी बिल्डर के साथ टाइप्ड SQL बनाती हैं। इससे क्वेरी परफ़ॉर्मेंस और व्यवहार पर पूरा नियंत्रण मिलता है।
- **डिज़ाइन से ही मल्टी-टेनेंट** -- हर क्वेरी `churchId` द्वारा स्कोप की जाती है। सभी टेबल्स में एक `churchId` कॉलम शामिल है, और रिपॉज़िटरी लेयर स्वचालित रूप से टेनेंट आइसोलेशन लागू करती है।

## कनेक्शन स्ट्रिंग्स

हर मॉड्यूल का डेटाबेस कनेक्शन `.env` में मानक MySQL कनेक्शन स्ट्रिंग फ़ॉर्मेट का उपयोग करके कॉन्फ़िगर किया जाता है:

```
mysql://user:password@host:port/database
```

उदाहरण के लिए, एक लोकल डेवलपमेंट सेटअप कुछ इस तरह दिख सकता है:

हर मॉड्यूल `<MODULE>_CONNECTION_STRING` नाम के एक एनवायरनमेंट वेरिएबल से अपना कनेक्शन पढ़ता है:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
प्रोडक्शन में, कनेक्शन स्ट्रिंग्स AWS SSM Parameter Store में संग्रहीत होती हैं और स्टार्टअप पर `Environment` क्लास द्वारा पढ़ी जाती हैं।
:::

## स्कीमा स्क्रिप्ट्स

टेबल स्कीमाज़ को `tools/migrations/` डायरेक्टरी में Kysely माइग्रेशंस के रूप में परिभाषित किया गया है, जो मॉड्यूल के अनुसार व्यवस्थित हैं:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

माइग्रेशंस टेबल निर्माण, इंडेक्स, और स्कीमा में बदलावों को परिभाषित करते हैं। `tools/dbScripts/` डायरेक्टरी में डेमो और सीड डेटा है जिसे स्कीमा के ऊपर लोड किया जा सकता है।

## डेटाबेस इनिशियलाइज़ेशन

### सभी डेटाबेस इनिशियलाइज़ करें

```bash
npm run initdb
```

यह सभी छह डेटाबेस बनाता है और हर एक के लिए माइग्रेशंस चलाता है।

### एक ही मॉड्यूल इनिशियलाइज़ करें

```bash
npm run initdb -- --module=membership
```

:::tip
किसी विशेष मॉड्यूल पर काम करते समय, आप बाकी को प्रभावित किए बिना केवल उस मॉड्यूल के डेटाबेस को फिर से इनिशियलाइज़ कर सकते हैं।
:::

## डेटा एक्सेस पैटर्न

रिपॉज़िटरीज़, मॉड्यूल के `getDb()` फ़ंक्शन के ज़रिए मिली मॉड्यूल की टाइप्ड डेटाबेस स्कीमा के विरुद्ध Kysely क्वेरी बिल्डर से क्वेरीज़ बनाती हैं। एक सामान्य रिपॉज़िटरी मेथड कुछ इस तरह दिखती है:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

रिपॉज़िटरीज़ `RepoManager` के ज़रिए प्राप्त की जाती हैं:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
मल्टी-टेनेंट आइसोलेशन बनाए रखने के लिए हमेशा अपनी क्वेरीज़ में `churchId` शामिल करें। किसी विशेष, अधिकृत कारण के बिना कभी भी टेनेंट्स के आर-पार क्वेरी न करें।
:::

## क्रॉस-मॉड्यूल रेफ़रेंस

क्योंकि हर मॉड्यूल का डेटा एक अलग डेटाबेस में रहता है, मॉड्यूल सीमाओं के आर-पार कोई फ़ॉरेन की या SQL जॉइन नहीं होते। कोई रिकॉर्ड जो किसी दूसरे मॉड्यूल के डेटा से संबंधित है वह उस रिकॉर्ड की id संग्रहीत करता है -- उदाहरण के लिए, giving डेटाबेस में एक डोनेशन membership डेटाबेस में किसी व्यक्ति की `personId` रखता है -- और कोई भी क्रॉस-मॉड्यूल कंपोज़िशन एप्लिकेशन कोड में होता है।

यही बाधा है जो मॉड्यूल सीमाओं को वास्तविक बनाती है: हर स्कीमा स्वतंत्र रूप से विकसित हो सकती है, किसी मॉड्यूल के डेटाबेस को उसके अपने सर्वर पर ले जाया जा सकता है, और किसी मॉड्यूल को साझा टेबल्स या क्रॉस-डेटाबेस क्वेरीज़ को सुलझाए बिना एक स्टैंडअलोन सर्विस के रूप में भी अलग किया जा सकता है।

## संबंधित लेख

- **[Module Structure](./module-structure)** -- हर मॉड्यूल के भीतर कंट्रोलर्स और रिपॉज़िटरीज़ कैसे व्यवस्थित हैं
- **[Local API Setup](./local-setup)** -- पूरी चरण-दर-चरण सेटअप गाइड
