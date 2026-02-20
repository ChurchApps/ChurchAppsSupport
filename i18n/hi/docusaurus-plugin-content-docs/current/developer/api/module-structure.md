---
title: "मॉड्यूल संरचना"
---

# मॉड्यूल संरचना

<div class="article-intro">

प्रत्येक API मॉड्यूल कंट्रोलर, रिपॉज़िटरी, मॉडल और हेल्पर्स के साथ एक सुसंगत आंतरिक संरचना का पालन करता है। इस लेआउट को समझना कोडबेस को नेविगेट करने और किसी भी मॉड्यूल में नई कार्यक्षमता जोड़ने को सरल बनाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- API को स्थानीय रूप से सेटअप करें -- देखें [स्थानीय API सेटअप](./local-setup)
- डेटा एक्सेस लेयर को समझने के लिए [डेटाबेस](./database) आर्किटेक्चर देखें

</div>

## डायरेक्टरी लेआउट

प्रत्येक मॉड्यूल `src/modules/{name}/` के अंतर्गत रहता है और इसमें चार डायरेक्टरी होती हैं:

```
src/modules/{name}/
├── controllers/    ← रूट हैंडलर (Express एंडपॉइंट)
├── repositories/   ← डेटा एक्सेस लेयर (डायरेक्ट SQL)
├── models/         ← TypeScript इंटरफेस और टाइप
└── helpers/        ← मॉड्यूल-विशिष्ट बिज़नेस लॉजिक
```

उदाहरण के लिए, membership मॉड्यूल:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepository.ts
│   ├── GroupRepository.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

## कंट्रोलर

कंट्रोलर एक मॉड्यूल के लिए API रूट परिभाषित करते हैं। वे `@churchapps/apihelper` से `CustomBaseController` को विस्तारित करते हैं और रूट रजिस्ट्रेशन के लिए Inversify डेकोरेटर का उपयोग करते हैं।

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = प्रमाणित उपयोगकर्ता संदर्भ
      au.checkAccess("People", "View");
      const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
      return repos.person.loadByChurchId(au.churchId);
    });
  }

  @httpPost("/")
  public async save() {
    return this.actionWrapper(async (au) => {
      au.checkAccess("People", "Edit");
      const data = this.request.body;
      // ... सेव लॉजिक
    });
  }
}
```

### रूट डेकोरेटर

| डेकोरेटर | HTTP मेथड |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")` डेकोरेटर कंट्रोलर में सभी रूट के लिए बेस पथ सेट करता है।

## रिपॉज़िटरी

रिपॉज़िटरी `DB.query()` के माध्यम से डायरेक्ट SQL का उपयोग करके सभी डेटाबेस ऑपरेशन संभालती हैं। कोई ORM नहीं है -- आप सीधे SQL लिखते हैं।

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // INSERT या UPDATE लॉजिक
  }
}
```

`RepositoryManager` के माध्यम से रिपॉज़िटरी एक्सेस करें:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## प्रमाणीकरण और प्राधिकरण

### JWT प्रमाणीकरण

सभी अनुरोध `CustomAuthProvider` द्वारा संभाले गए JWT टोकन के माध्यम से प्रमाणित होते हैं। टोकन स्वचालित रूप से मान्य होता है और प्रमाणित उपयोगकर्ता संदर्भ (`au`) प्रत्येक कंट्रोलर एक्शन में उपलब्ध होता है।

### अनुमति जाँच

वर्तमान उपयोगकर्ता के पास आवश्यक अनुमति है यह सत्यापित करने के लिए `au.checkAccess()` का उपयोग करें:

```typescript
au.checkAccess("People", "View");    // पढ़ने की पहुँच
au.checkAccess("People", "Edit");    // लिखने की पहुँच
```

यदि उपयोगकर्ता के पास आवश्यक अनुमति नहीं है, तो एक त्रुटि प्रतिक्रिया स्वचालित रूप से लौटाई जाती है।

:::warning
कोई भी डेटा ऑपरेशन करने से पहले हमेशा `au.checkAccess()` कॉल करें। अनुमति जाँच कभी न छोड़ें, यहाँ तक कि प्रतीत होने वाले केवल-पठन एंडपॉइंट के लिए भी।
:::

## पर्यावरण कॉन्फ़िगरेशन

`Environment` क्लास विभिन्न एनवायरनमेंट में कॉन्फ़िगरेशन को संभालती है:

- **स्थानीय विकास:** प्रोजेक्ट रूट में `.env` फ़ाइल से पढ़ता है
- **डिप्लॉय किए गए एनवायरनमेंट:** AWS SSM Parameter Store से पढ़ता है

```typescript
// पर्यावरण चर एक्सेस करें
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

यह अमूर्तता का मतलब है कि आपके कोड को यह जानने की आवश्यकता नहीं है कि कॉन्फ़िगरेशन कहाँ से आता है।

## Lambda फंक्शन

AWS पर डिप्लॉय होने पर, API चार Lambda फंक्शन के रूप में चलता है:

| फंक्शन | उद्देश्य |
|----------|---------|
| `web` | सभी HTTP REST API अनुरोधों को संभालता है |
| `socket` | रीयल-टाइम सुविधाओं के लिए WebSocket कनेक्शन प्रबंधित करता है |
| `timer15Min` | ईमेल सूचनाओं के लिए हर 15 मिनट में शेड्यूल किया गया |
| `timerMidnight` | डाइजेस्ट ईमेल और रखरखाव के लिए दैनिक शेड्यूल किया गया |

:::info
स्थानीय रूप से, `web` फंक्शन पोर्ट 8084 पर चलता है और `socket` फंक्शन पोर्ट 8087 पर चलता है। टाइमर फंक्शन विकास के दौरान मैन्युअल रूप से ट्रिगर किए जा सकते हैं।
:::

## संबंधित लेख

- **[डेटाबेस](./database)** -- कनेक्शन स्ट्रिंग, स्कीमा स्क्रिप्ट और डेटा एक्सेस पैटर्न
- **[स्थानीय API सेटअप](./local-setup)** -- पूर्ण चरण-दर-चरण सेटअप गाइड
- **[ApiHelper](../shared-libraries/api-helper)** -- साझा लाइब्रेरी जो `CustomBaseController` और प्रमाणीकरण मिडलवेयर प्रदान करती है
