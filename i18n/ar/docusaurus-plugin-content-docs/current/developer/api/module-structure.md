---
title: "هيكل الوحدة"
description: "يشرح تنظيم وحدات الواجهة البرمجية، من المتحكمات والمستودعات والبوابات وفحوص المصادقة، ودوال Lambda الست التي تشغّل الكود في بيئات B1 للمطورين."
---

# هيكل الوحدة

<div class="article-intro">

تتبع كل وحدة من وحدات واجهة البرمجة (API) بنية داخلية موحدة تتكون من المتحكمات (Controllers) والمستودعات (Repositories) والنماذج (Models) والمساعدات (Helpers). فهم هذا التخطيط يجعل التنقل في قاعدة الشيفرة وإضافة وظائف جديدة إلى أي وحدة أمراً سهلاً.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- قم بإعداد واجهة البرمجة محلياً -- راجع [إعداد واجهة البرمجة المحلي](./local-setup.md)
- راجع بنية [قاعدة البيانات](./database.md) لفهم طبقة الوصول إلى البيانات

</div>

## تخطيط المجلدات

توجد الوحدات ضمن `src/modules/{name}/`. وتحتوي الوحدة النموذجية على أربعة مجلدات:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

على سبيل المثال، وحدة العضوية:

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

تتبع الوحدات الأساسية الستة للبيانات -- العضوية والحضور والمحتوى والعطاء والمراسلة والمهام -- جميعها هذا التخطيط. وتوجد إلى جانبها بعض الوحدات المتخصصة (مثل وحدة التقارير، التي تقدم تقارير تشمل وحدات متعددة ولا تمتلك أي بيانات خاصة بها) ضمن `src/modules/`.

## تطبيق واحد، وحدات كثيرة

واجهة البرمجة هي **نظام متجانس معياري (Modular Monolith)**: تحدد الوحدات حدود تنظيم الشيفرة وملكية البيانات، وليست خدمات منفصلة. عند بدء التشغيل، تُسجَّل متحكمات كل وحدة في حاوية حقن تبعيات (Dependency Injection) واحدة خلف تطبيق Express واحد، لذلك تُبنى واجهة البرمجة بأكملها وتعمل وتُنشر كوحدة واحدة -- فالدوال المنشورة الموضحة أدناه جميعها نقاط دخول إلى هذا التطبيق نفسه.

تقع مسارات كل وحدة تحت بادئة عنوان URL تطابق اسم الوحدة:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

هذا يُبقي واجهة برمجة كل وحدة مستقلة بذاتها، بينما تستمر العملاء في التواصل مع مضيف واحد.

## المتحكمات

تحدد المتحكمات مسارات واجهة البرمجة لكل وحدة. ولكل وحدة متحكم أساسي خاص بها (على سبيل المثال `MembershipBaseController`)، يمتد من `BaseController` المشترك -- وهو نفسه مبني على `CustomBaseController` من `@churchapps/apihelper`. تُسجَّل المسارات باستخدام مزخرفات Inversify (Decorators).

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

يتحقق `actionWrapper` من هوية الطلب ويملأ `this.repos` بمستودعات الوحدة قبل تنفيذ الإجراء الخاص بك.

### مزخرفات المسارات

| المزخرف | طريقة HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

تحدد المزخرفة `@controller("/base")` المسار الأساسي لجميع المسارات في المتحكم.

## المستودعات

تتولى المستودعات جميع عمليات قاعدة البيانات. لا يوجد ORM هنا -- تُكتب الاستعلامات باستخدام منشئ الاستعلامات Kysely، مع أنواع مطابقة لمخطط قاعدة بيانات الوحدة. يعرض الملف `db/index.ts` الخاص بكل وحدة دالة `getDb()` التي تُرجع نسخة Kysely المُنمَّطة الخاصة بالوحدة.

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

داخل المتحكم، تكون مستودعات الوحدة متاحة عبر `this.repos`. وخارج المتحكمات، احصل عليها من خلال `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## التواصل بين الوحدات

لكل وحدة قاعدة بياناتها الخاصة (راجع [قاعدة البيانات](./database.md))، ولا تستعلم أي وحدة مباشرةً عن جداول وحدة أخرى. عندما تحتاج وحدة إلى بيانات تملكها وحدة أخرى -- على سبيل المثال، تحديد الأشخاص من وحدة العضوية داخل وحدة المهام -- فإنها تمر عبر **البوابة (Gateway)** التابعة للوحدة المالكة في `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

كل بوابة (مثل `MembershipModuleGateway` و`GivingModuleGateway` وغيرهما) هي واجهة TypeScript تحدد بدقة العمليات التي تعرضها الوحدة المالكة لبقية واجهة البرمجة. والواجهة هي العقد: تقرأ التطبيقات الحالية قاعدة بيانات الوحدة المالكة ضمن العملية نفسها، ولكن لأن المستدعين يعتمدون على الواجهة فقط، يمكن استبدال التطبيق -- على سبيل المثال، بتطبيق يُجري استدعاءات HTTP -- إذا تم استخراج وحدة ما يوماً ما إلى خدمة منفصلة.

:::info
إذا كانت البيانات التي تحتاجها موجودة في وحدة أخرى ولم تكشف بوابتها عن عملية لها، فوسّع واجهة البوابة بدلاً من الوصول إلى مستودعات الوحدة الأخرى أو قاعدة بياناتها.
:::

## المصادقة والتفويض

### مصادقة JWT

تتم مصادقة جميع الطلبات عبر رموز JWT التي يعالجها `CustomAuthProvider`. يتم التحقق من الرمز تلقائياً، ويكون سياق المستخدم المُصادَق عليه (`au`) متاحاً في كل إجراء من إجراءات المتحكم.

### فحوصات الأذونات

استخدم `au.checkAccess()` للتحقق من أن المستخدم الحالي يملك الإذن المطلوب. والأذونات ثوابت محددة مسبقاً تجمع بين نوع المحتوى والإجراء:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

إذا كان المستخدم يفتقر إلى الإذن المطلوب، يُرجَع ردّ خطأ تلقائياً.

:::warning
استدعِ دائماً `au.checkAccess()` قبل تنفيذ أي عمليات على البيانات. لا تتخطَّ فحوصات الأذونات أبداً، حتى في النقاط الطرفية التي تبدو للقراءة فقط.
:::

## إعدادات البيئة

تتولى فئة `Environment` إدارة الإعدادات عبر البيئات المختلفة:

- **التطوير المحلي:** يقرأ من ملف `.env` في جذر المشروع
- **البيئات المنشورة:** يقرأ من مخزن معلمات AWS SSM (AWS SSM Parameter Store)

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

بهذا التجريد لا تحتاج شيفرتك إلى معرفة مصدر الإعدادات.

## دوال Lambda

عند نشرها على AWS، تعمل واجهة البرمجة كستّ دوال Lambda:

| الدالة | الغرض |
|----------|---------|
| `web` | يعالج جميع طلبات REST API عبر HTTP |
| `socket` | يدير اتصالات WebSocket للميزات الفورية |
| `timer15Min` | مجدولة كل 30 دقيقة لإشعارات البريد الإلكتروني (الاسم تاريخي ولا يعكس الجدولة الحالية) |
| `timerMidnight` | مجدولة يومياً لرسائل الملخص البريدية وأعمال الصيانة |
| `timerScheduledTasks` | مجدولة يومياً لتشغيل الأتمتة المستحقة ومعالجة سير العمل المتأخر |
| `timerWebhooks` | مجدولة كل دقيقة لتسليم خطافات الويب (Webhooks) الصادرة المنتظرة في الطابور |

:::info
محلياً، تعمل دالة `web` على المنفذ 8084 وتعمل دالة `socket` على المنفذ 8087. ويمكن تشغيل دوال المؤقت يدوياً أثناء التطوير.
:::

## مقالات ذات صلة

- **[قاعدة البيانات](./database.md)** -- سلاسل الاتصال وسكربتات المخطط وأنماط الوصول إلى البيانات
- **[إعداد واجهة البرمجة المحلي](./local-setup.md)** -- دليل إعداد كامل خطوة بخطوة
- **[ApiHelper](../shared-libraries/api-helper.md)** -- المكتبة المشتركة التي توفر `CustomBaseController` ووسيط المصادقة
