---
title: "मॉड्यूल संरचना"
description: "API के मॉड्यूल कैसे व्यवस्थित हैं, इसकी व्याख्या: कंट्रोलर, रिपॉज़िटरी, गेटवे, प्रमाणीकरण जाँच और B1 डेवलपर वातावरण में कोड चलाने वाले छह Lambda फ़ंक्शन।"
---

# मॉड्यूल संरचना

<div class="article-intro">

हर API मॉड्यूल एक सुसंगत आंतरिक संरचना का पालन करता है, जिसमें controllers, repositories, models और helpers शामिल हैं। इस लेआउट को समझने से कोडबेस में आसानी से नेविगेट करना और किसी भी मॉड्यूल में नई कार्यक्षमता जोड़ना सरल हो जाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- API को स्थानीय रूप से सेट अप करें -- देखें [स्थानीय API सेटअप](./local-setup.md)
- डेटा एक्सेस लेयर को समझने के लिए [Database](./database.md) आर्किटेक्चर की समीक्षा करें

</div>

## डायरेक्टरी लेआउट

मॉड्यूल `src/modules/{name}/` के अंतर्गत रहते हैं। एक सामान्य मॉड्यूल में चार डायरेक्टरी होती हैं:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
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

छह मुख्य डेटा मॉड्यूल -- membership, attendance, content, giving, messaging और doing -- सभी इसी लेआउट का पालन करते हैं। कुछ विशेष मॉड्यूल (जैसे reporting, जो क्रॉस-मॉड्यूल रिपोर्ट देता है और अपना कोई डेटा नहीं रखता) इनके साथ `src/modules/` के अंतर्गत स्थित हैं।

## एक एप्लिकेशन, कई मॉड्यूल

API एक **मॉड्यूलर मोनोलिथ** है: मॉड्यूल कोड के संगठन और डेटा स्वामित्व की सीमाएँ तय करते हैं, अलग-अलग सेवाएँ नहीं। स्टार्टअप के समय, हर मॉड्यूल के controllers एक ही dependency-injection container में, एक Express एप्लिकेशन के पीछे, पंजीकृत किए जाते हैं। इसलिए पूरा API एक इकाई के रूप में बनता, चलता और deploy होता है -- नीचे वर्णित deployed फ़ंक्शन इसी एक एप्लिकेशन के entry points हैं।

हर मॉड्यूल के routes एक URL prefix के अंतर्गत होते हैं जो मॉड्यूल के नाम से मेल खाता है:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

इससे हर मॉड्यूल का API सतह स्वयं-निहित रहती है, जबकि क्लाइंट फिर भी एक ही होस्ट से बात करते हैं।

## Controllers

Controllers किसी मॉड्यूल के API routes परिभाषित करते हैं। हर मॉड्यूल का अपना base controller होता है (उदाहरण के लिए `MembershipBaseController`), जो साझा `BaseController` को extend करता है -- जो स्वयं `@churchapps/apihelper` के `CustomBaseController` पर बना है। Routes Inversify decorators से पंजीकृत किए जाते हैं।

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
      // au = authenticated user context
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` अनुरोध को प्रमाणित करता है और आपकी action चलाने से पहले `this.repos` को मॉड्यूल के repositories से भर देता है।

### Route Decorators

| Decorator | HTTP Method |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")` decorator उस controller के सभी routes के लिए base path तय करता है।

## Repositories

Repositories सभी डेटाबेस संचालन संभालते हैं। यहाँ कोई ORM नहीं है -- queries Kysely query builder से लिखी जाती हैं, जो मॉड्यूल की typed database schema के अनुसार टाइप की जाती हैं। हर मॉड्यूल की `db/index.ts` एक `getDb()` function उपलब्ध कराती है, जो मॉड्यूल का typed Kysely instance लौटाता है।

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

Controller के अंदर, मॉड्यूल के repositories `this.repos` के रूप में उपलब्ध होते हैं। Controllers के बाहर, इन्हें `RepoManager` के माध्यम से प्राप्त करें:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## क्रॉस-मॉड्यूल संचार

हर मॉड्यूल अपने डेटाबेस का स्वामी है (देखें [Database](./database.md)), और कोई मॉड्यूल किसी दूसरे मॉड्यूल की tables को सीधे query नहीं करता। जब एक मॉड्यूल को किसी दूसरे के स्वामित्व वाला डेटा चाहिए -- उदाहरण के लिए, doing मॉड्यूल का membership से लोगों को resolve करना -- तो वह `src/shared/modules/` में स्थित स्वामी मॉड्यूल के **gateway** के माध्यम से जाता है:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

हर gateway (`MembershipModuleGateway`, `GivingModuleGateway`, आदि) एक TypeScript interface है, जो स्पष्ट रूप से परिभाषित करता है कि स्वामी मॉड्यूल API के बाकी हिस्से को कौन-से operations उपलब्ध कराता है। यह interface अनुबंध है: वर्तमान implementations स्वामी मॉड्यूल के डेटाबेस को उसी प्रक्रिया में पढ़ती हैं, लेकिन चूँकि callers केवल interface पर निर्भर करते हैं, इसलिए implementation को बदला जा सकता है -- उदाहरण के लिए, HTTP calls करने वाली implementation से -- यदि कभी कोई मॉड्यूल अलग सेवा के रूप में निकाला जाए।

:::info
यदि आपको जो डेटा चाहिए वह किसी दूसरे मॉड्यूल में है और उसके gateway में उसके लिए कोई operation उपलब्ध नहीं है, तो दूसरे मॉड्यूल के repositories या डेटाबेस में घुसने के बजाय gateway interface का विस्तार करें।
:::

## प्रमाणीकरण और प्राधिकरण

### JWT प्रमाणीकरण

सभी अनुरोध `CustomAuthProvider` द्वारा संभाले जाने वाले JWT tokens से प्रमाणित होते हैं। Token स्वचालित रूप से सत्यापित होता है और प्रमाणित उपयोगकर्ता संदर्भ (`au`) हर controller action में उपलब्ध होता है।

### अनुमति जाँच

यह सत्यापित करने के लिए `au.checkAccess()` का उपयोग करें कि वर्तमान उपयोगकर्ता के पास आवश्यक अनुमति है। Permissions पूर्वनिर्धारित constants हैं जो एक content type और एक action को मिलाते हैं:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

यदि उपयोगकर्ता के पास आवश्यक अनुमति नहीं है, तो स्वचालित रूप से एक त्रुटि प्रतिक्रिया लौटाई जाती है।

:::warning
किसी भी डेटा संचालन से पहले हमेशा `au.checkAccess()` को कॉल करें। केवल पढ़ने वाले endpoints पर भी अनुमति जाँच कभी न छोड़ें।
:::

## एनवायरनमेंट कॉन्फ़िगरेशन

`Environment` class विभिन्न एनवायरनमेंट में कॉन्फ़िगरेशन संभालती है:

- **स्थानीय विकास:** प्रोजेक्ट root में स्थित `.env` फ़ाइल से पढ़ती है
- **Deployed एनवायरनमेंट:** AWS SSM Parameter Store से पढ़ती है

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

यह अमूर्तता इसका अर्थ है कि आपके कोड को यह जानने की आवश्यकता नहीं कि कॉन्फ़िगरेशन कहाँ से आ रही है।

## Lambda फ़ंक्शन

AWS पर deploy होने पर, API छह Lambda फ़ंक्शन के रूप में चलता है:

| Function | उद्देश्य |
|----------|---------|
| `web` | सभी HTTP REST API अनुरोधों को संभालता है |
| `socket` | रीयल-टाइम सुविधाओं के लिए WebSocket connections प्रबंधित करता है |
| `timer15Min` | ईमेल सूचनाओं के लिए हर 30 मिनट पर निर्धारित (नाम ऐतिहासिक कारणों से पुराना है) |
| `timerMidnight` | डाइजेस्ट ईमेल और रखरखाव के लिए रोज़ाना निर्धारित |
| `timerScheduledTasks` | देय automations और अतिदेय workflow प्रसंस्करण के लिए रोज़ाना निर्धारित |
| `timerWebhooks` | कतारबद्ध outbound webhooks भेजने के लिए हर मिनट निर्धारित |

:::info
स्थानीय रूप से, `web` फ़ंक्शन पोर्ट 8084 पर और `socket` फ़ंक्शन पोर्ट 8087 पर चलता है। विकास के दौरान timer फ़ंक्शन मैन्युअल रूप से ट्रिगर किए जा सकते हैं।
:::

## संबंधित लेख

- **[Database](./database.md)** -- Connection strings, schema scripts और डेटा एक्सेस पैटर्न
- **[स्थानीय API सेटअप](./local-setup.md)** -- पूरी चरण-दर-चरण सेटअप गाइड
- **[ApiHelper](../shared-libraries/api-helper.md)** -- साझा library जो `CustomBaseController` और auth middleware प्रदान करती है
