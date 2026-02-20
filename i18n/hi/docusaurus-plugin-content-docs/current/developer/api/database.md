---
title: "डेटाबेस"
---

# डेटाबेस

<div class="article-intro">

ChurchApps API **डेटाबेस-प्रति-मॉड्यूल** आर्किटेक्चर का उपयोग करता है। छह मॉड्यूल में से प्रत्येक का अपना MySQL डेटाबेस है जिसमें एक स्वतंत्र कनेक्शन पूल है, जो एक एकल डिप्लॉयमेंट के भीतर रहते हुए स्पष्ट डेटा सीमाएँ प्रदान करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **MySQL 8.0+** इंस्टॉल करें -- देखें [पूर्वापेक्षाएँ](../setup/prerequisites)
- अपनी `.env` फ़ाइल में डेटाबेस कनेक्शन स्ट्रिंग कॉन्फ़िगर करें -- देखें [पर्यावरण चर](../setup/environment-variables)

</div>

## आर्किटेक्चर अवलोकन

```
Api
├── membership_db   ← लोग, समूह, अनुमतियाँ
├── attendance_db   ← सेवाएँ, सत्र, रिकॉर्ड
├── content_db      ← पृष्ठ, खंड, तत्व
├── giving_db       ← दान, फंड, भुगतान
├── messaging_db    ← वार्तालाप, सूचनाएँ
└── doing_db        ← कार्य, योजनाएँ, असाइनमेंट
```

### प्रमुख डिज़ाइन निर्णय

- **प्रति मॉड्यूल एक डेटाबेस** -- प्रत्येक मॉड्यूल एक समर्पित कनेक्शन पूल (`EnhancedPoolHelper`) के साथ अपना MySQL डेटाबेस बनाए रखता है। यह मॉड्यूल को डिकपल्ड रखता है और स्वतंत्र स्कीमा विकास की अनुमति देता है।
- **डायरेक्ट SQL के साथ रिपॉज़िटरी पैटर्न** -- कोई ORM नहीं है। सभी डेटा एक्सेस रिपॉज़िटरी क्लास के माध्यम से होती है जो `DB.query()` का उपयोग करके सीधे SQL निष्पादित करती हैं। यह क्वेरी प्रदर्शन और व्यवहार पर पूर्ण नियंत्रण देता है।
- **डिज़ाइन से मल्टी-टेनेंट** -- प्रत्येक क्वेरी `churchId` द्वारा स्कोप की जाती है। सभी तालिकाओं में एक `churchId` कॉलम शामिल है, और रिपॉज़िटरी लेयर स्वचालित रूप से टेनेंट अलगाव लागू करती है।

## कनेक्शन स्ट्रिंग

प्रत्येक मॉड्यूल का डेटाबेस कनेक्शन `.env` में मानक MySQL कनेक्शन स्ट्रिंग प्रारूप का उपयोग करके कॉन्फ़िगर किया जाता है:

```
mysql://user:password@host:port/database
```

उदाहरण के लिए, एक स्थानीय विकास सेटअप इस तरह दिख सकता है:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
प्रोडक्शन में, कनेक्शन स्ट्रिंग AWS SSM Parameter Store में संग्रहीत होती हैं और स्टार्टअप पर `Environment` क्लास द्वारा पढ़ी जाती हैं।
:::

## स्कीमा स्क्रिप्ट

डेटाबेस स्कीमा स्क्रिप्ट `tools/dbScripts/` डायरेक्टरी में स्थित हैं, मॉड्यूल के अनुसार व्यवस्थित:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

ये स्क्रिप्ट तालिका निर्माण, इंडेक्स और आवश्यक सीड डेटा को परिभाषित करती हैं।

## डेटाबेस इनिशियलाइज़ेशन

### सभी डेटाबेस इनिशियलाइज़ करें

```bash
npm run initdb
```

यह सभी छह डेटाबेस बनाता है और प्रत्येक के लिए स्कीमा स्क्रिप्ट चलाता है।

### एक मॉड्यूल इनिशियलाइज़ करें

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
किसी विशिष्ट मॉड्यूल पर काम करते समय, आप बाकी को प्रभावित किए बिना केवल उस मॉड्यूल के डेटाबेस को फिर से इनिशियलाइज़ कर सकते हैं।
:::

## डेटा एक्सेस पैटर्न

रिपॉज़िटरी `DB.query()` विधि के माध्यम से डेटा एक्सेस करती हैं। एक सामान्य रिपॉज़िटरी विधि इस तरह दिखती है:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

रिपॉज़िटरी `RepositoryManager` के माध्यम से प्राप्त की जाती हैं:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
मल्टी-टेनेंट अलगाव बनाए रखने के लिए हमेशा अपनी क्वेरी में `churchId` शामिल करें। जब तक आपके पास कोई विशिष्ट, अधिकृत कारण न हो, टेनेंट के बीच क्वेरी न करें।
:::

## संबंधित लेख

- **[मॉड्यूल संरचना](./module-structure)** -- प्रत्येक मॉड्यूल में कंट्रोलर और रिपॉज़िटरी कैसे व्यवस्थित हैं
- **[स्थानीय API सेटअप](./local-setup)** -- पूर्ण चरण-दर-चरण सेटअप गाइड
