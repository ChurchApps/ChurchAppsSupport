---
title: "मॉड्यूल संरचना"
---

# मॉड्यूल संरचना

<div class="article-intro">

प्रत्येक API मॉड्यूल नियंत्रक, भंडार, मॉडल, और हेल्पर्स के साथ एक सुसंगत आंतरिक संरचना का पालन करता है। इस लेआउट को समझना कोडबेस को नेविगेट करना और किसी भी मॉड्यूल में नई कार्यक्षमता जोड़ना सरल बनाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- API को स्थानीय रूप से सेटअप करें -- देखें [स्थानीय API सेटअप](./local-setup)
- डेटा एक्सेस लेयर को समझने के लिए [Database](./database) आर्किटेक्चर देखें

</div>

## डायरेक्टरी लेआउट

मॉड्यूल `src/modules/{name}/` के अंतर्गत रहते हैं। एक विशिष्ट मॉड्यूल में चार डायरेक्टरी होती हैं:

```
src/modules/{name}/
├── controllers/    ← रूट हैंडलर (Express एंडपॉइंट)
├── repositories/   ← डेटा एक्सेस लेयर (टाइप किए गए SQL क्वेरीज़)
├── models/         ← TypeScript इंटरफेस और प्रकार
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
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

छह मुख्य डेटा मॉड्यूल -- membership, attendance, content, giving, messaging, और doing -- सभी इस लेआउट का पालन करते हैं। कुछ विशेष मॉड्यूल (जैसे reporting, जो क्रॉस-मॉड्यूल रिपोर्ट देता है और अपना कोई डेटा नहीं रखता) `src/modules/` के तहत उनके साथ रहते हैं।

## एक एप्लिकेशन, कई मॉड्यूल

API एक **मॉड्यूलर मोनोलिथ** है: मॉड्यूल कोड संगठन और डेटा स्वामित्व की सीमाओं को चिह्नित करते हैं, अलग सेवाएं नहीं। Startup पर, प्रत्येक मॉड्यूल के नियंत्रक एक एकल निर्भरता-इंजेक्शन कंटेनर में एक Express एप्लिकेशन के पीछे रजिस्टर किए जाते हैं, इसलिए संपूर्ण API बनता है, चलता है, और एक इकाई के रूप में तैनात होता है -- नीचे वर्णित तैनात किए गए फंक्शन इसी एप्लिकेशन में सभी प्रवेश बिंदु हैं।

प्रत्येक मॉड्यूल के मार्ग एक URL उपसर्ग के अंतर्गत रहते हैं जो मॉड्यूल नाम से मेल खाता है:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

यह प्रत्येक मॉड्यूल की API सतह को आत्मनिर्भर रखता है जबकि क्लाइंट अभी भी एक एकल होस्ट से बात करते हैं।

## नियंत्रक

नियंत्रक एक मॉड्यूल के API मार्गों को परिभाषित करते हैं। प्रत्येक मॉड्यूल का अपना आधार नियंत्रक होता है (उदाहरण के लिए `MembershipBaseController`), जो साझा `BaseController` को विस्तारित करता है -- स्वयं `@churchapps/apihelper` से `CustomBaseController` पर बनाया गया। मार्ग Inversify डेकोरेटर के साथ पंजीकृत होते हैं।

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = प्रमाणित उपयोगकर्ता संदर्भ
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` अनुरोध को प्रमाणित करता है और आपकी कार्रवाई चलाने से पहले `this.repos` को मॉड्यूल के भंडार के साथ हाइड्रेट करता है।

### रूट डेकोरेटर

| डेकोरेटर | HTTP मेथड |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")` डेकोरेटर नियंत्रक में सभी मार्गों के लिए आधार पथ सेट करता है।

## भंडार

भंडार सभी डेटाबेस संचालन को संभालते हैं। कोई ORM नहीं है -- क्वेरीज़ Kysely query builder के साथ लिखी गई हैं, मॉड्यूल के डेटाबेस स्कीमा के विरुद्ध टाइप किई गई। प्रत्येक मॉड्यूल का `db/index.ts` एक `getDb()` फंक्शन उजागर करता है जो मॉड्यूल के टाइप किए गए Kysely उदाहरण को रिटर्न करता है।

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

एक नियंत्रक के अंदर, मॉड्यूल के भंडार `this.repos` के रूप में उपलब्ध हैं। नियंत्रकों के बाहर, `RepoManager` के माध्यम से उन्हें प्राप्त करें:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## क्रॉस-मॉड्यूल संचार

प्रत्येक मॉड्यूल अपना डेटाबेस स्वामित्व करता है (देखें [Database](./database)), और एक मॉड्यूल कभी सीधे दूसरे मॉड्यूल की तालिकाओं को क्वेरी नहीं करता। जब एक मॉड्यूल को दूसरे द्वारा स्वामित्व किए गए डेटा की आवश्यकता हो -- उदाहरण के लिए, doing मॉड्यूल membership से लोगों को resolve कर रहा हो -- यह `src/shared/modules/` में स्वामी मॉड्यूल के **gateway** के माध्यम से जाता है:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

प्रत्येक gateway (`MembershipModuleGateway`, `GivingModuleGateway`, आदि) एक TypeScript इंटरफेस है जो ठीक से परिभाषित करता है कि स्वामी मॉड्यूल बाकी API के लिए कौन सी संचालन उजागर करता है। इंटरफेस संविदा है: वर्तमान कार्यान्वयन स्वामी मॉड्यूल के डेटाबेस को in-process में पढ़ते हैं, लेकिन क्योंकि कॉलर केवल इंटरफेस पर निर्भर करते हैं, एक कार्यान्वयन को स्वैप किया जा सकता है -- उदाहरण के लिए, एक ऐसा जो HTTP कॉल करता हो -- यदि कोई मॉड्यूल कभी अलग सेवा में निकाला जाता।

:::info
यदि आपको जिस डेटा की आवश्यकता है वह दूसरे मॉड्यूल में रहता है और इसका gateway उसके लिए कोई संचालन उजागर नहीं करता है, तो दूसरे मॉड्यूल के भंडार या डेटाबेस तक पहुंचने के बजाय gateway इंटरफेस को विस्तारित करें।
:::

## प्रमाणीकरण और प्राधिकरण

### JWT प्रमाणीकरण

सभी अनुरोध `CustomAuthProvider` द्वारा संभाले गए JWT tokens के माध्यम से प्रमाणित होते हैं। token स्वचालित रूप से मान्य होता है और प्रमाणित उपयोगकर्ता संदर्भ (`au`) प्रत्येक नियंत्रक कार्रवाई में उपलब्ध होता है।

### अनुमति जाँच

`au.checkAccess()` का उपयोग करके सत्यापित करें कि वर्तमान उपयोगकर्ता के पास आवश्यक अनुमति है। अनुमतियां पूर्वनिर्धारित स्थिरांक हैं जो सामग्री प्रकार और कार्रवाई को जोड़ती हैं:

```typescript
au.checkAccess(Permissions.people.view);    // पढ़ने की पहुँच
au.checkAccess(Permissions.people.edit);    // लिखने की पहुँच
```

यदि उपयोगकर्ता के पास आवश्यक अनुमति नहीं है, तो एक त्रुटि प्रतिक्रिया स्वचालित रूप से रिटर्न की जाती है।

:::warning
कोई भी डेटा संचालन करने से पहले हमेशा `au.checkAccess()` कॉल करें। अनुमति जाँच कभी न छोड़ें, यहां तक कि प्रतीत होने वाली केवल-पठन एंडपॉइंट के लिए भी।
:::

## पर्यावरण कॉन्फ़िगरेशन

`Environment` क्लास विभिन्न वातावरणों में कॉन्फ़िगरेशन को संभालती है:

- **स्थानीय विकास:** प्रोजेक्ट रूट में `.env` फ़ाइल से पढ़ता है
- **तैनात किए गए वातावरण:** AWS SSM Parameter Store से पढ़ता है

```typescript
// पर्यावरण चर एक्सेस करें
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

यह अमूर्तता का मतलब है कि आपके कोड को यह जानने की आवश्यकता नहीं है कि कॉन्फ़िगरेशन कहां से आता है।

## Lambda फंक्शन

AWS पर तैनात होने पर, API छह Lambda फंक्शन के रूप में चलता है:

| फंक्शन | उद्देश्य |
|----------|---------|
| `web` | सभी HTTP REST API अनुरोधों को संभालता है |
| `socket` | रीयल-टाइम सुविधाओं के लिए WebSocket कनेक्शन को प्रबंधित करता है |
| `timer15Min` | ईमेल सूचनाओं के लिए हर 30 मिनट में शेड्यूल किया गया (नाम ऐतिहासिक है) |
| `timerMidnight` | दैनिक पाचन ईमेल और रखरखाव के लिए दैनिक शेड्यूल किया गया |
| `timerScheduledTasks` | देय स्वचालन और अतिदेय वर्कफ़्लो प्रसंस्करण के लिए दैनिक शेड्यूल किया गया |
| `timerWebhooks` | कतारबद्ध आउटबाउंड webhooks प्रदान करने के लिए हर मिनट शेड्यूल किया गया |

:::info
स्थानीय रूप से, `web` फंक्शन पोर्ट 8084 पर चलता है और `socket` फंक्शन पोर्ट 8087 पर चलता है। टाइमर फंक्शन विकास के दौरान मैन्युअल रूप से ट्रिगर किए जा सकते हैं।
:::

## संबंधित लेख

- **[Database](./database)** -- कनेक्शन स्ट्रिंग, स्कीमा स्क्रिप्ट, और डेटा एक्सेस पैटर्न
- **[स्थानीय API सेटअप](./local-setup)** -- पूर्ण चरण-दर-चरण सेटअप गाइड
- **[ApiHelper](../shared-libraries/api-helper)** -- साझा लाइब्रेरी जो `CustomBaseController` और auth middleware प्रदान करती है
