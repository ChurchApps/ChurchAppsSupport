---
title: "نظرة عامة على المشروع"
description: "خريطة لجميع مستودعات ChurchApps مصنفة حسب الفئة، مع أطر العمل ومنافذ التطوير وقواعد البيانات، وكيفية ربط حزم @churchapps المشتركة بينها."
---

# نظرة عامة على المشروع

<div class="article-intro">

يتألف ChurchApps من حوالي 20 مستودعًا مستقلًا، ويُنشر كل منها ضمن [منظمة ChurchApps على GitHub](https://github.com/ChurchApps). تقدم هذه الصفحة قائمة كاملة بجميع المشاريع مصنفةً حسب الفئة، مع أطرها ومنافذها وعلاقاتها ببعضها.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- ثبّت [المتطلبات الأساسية](./prerequisites.md) لفئة المشروع التي تريد العمل عليها

</div>

## واجهات برمجة التطبيقات الخلفية

جميع واجهات برمجة التطبيقات مبنية باستخدام Node.js وExpress وTypeScript، وتُنشر على AWS Lambda عبر Serverless Framework.

| المشروع | الغرض | منفذ التطوير | قاعدة البيانات |
|---------|-------|--------------|----------------|
| **[Api](https://github.com/ChurchApps/Api)** | النواة المعيارية المتجانسة التي تغطي العضوية والحضور والمحتوى والعطاء والمراسلة والمهام | 8084 | قاعدة بيانات MySQL منفصلة لكل وحدة (6 في المجموع) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | الواجهة الخلفية لـ Lessons.church | -- | قاعدة بيانات MySQL واحدة باسم `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | أداة استعلام بالذكاء الاصطناعي تعمل بواسطة OpenAI | -- | -- |

:::info
مشروع **Api** الأساسي هو نظام متجانس معياري. لكل وحدة (العضوية والحضور والمحتوى والعطاء والمراسلة والمهام) قاعدة بيانات خاصة بها، ويمكن الوصول إليها عبر مسار فرعي مثل `/membership` أو `/giving`. في بيئة الإنتاج، تُعرض هذه الوحدات كدوال Lambda منفصلة خلف API Gateway.
:::

## تطبيقات الويب

| المشروع | الإطار | منفذ التطوير | الغرض |
|---------|--------|--------------|-------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | لوحة إدارة الكنيسة |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | تطبيق أعضاء الكنيسة العام |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | الواجهة الأمامية لـ Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | أداة استيراد البيانات وتصديرها |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | ثابت | -- | مواقع كنائس ثابتة تعريفية |

## تطبيقات الجوال

تستخدم جميع تطبيقات الجوال React Native مع Expo.

| المشروع | الغرض | الإصدارات الرئيسية |
|---------|-------|---------------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | تطبيق أعضاء الكنيسة لنظامي iOS وAndroid | Expo 54، React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | تطبيق كشك تسجيل الحضور | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | عرض الدروس على Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | تشغيل المحتوى (بما في ذلك أنظمة التلفاز) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | جهاز تحكم عن بُعد للجوال لبرنامج FreeShow | Expo |

## سطح المكتب

| المشروع | المكدس | الغرض |
|---------|--------|-------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | برنامج العروض التقديمية والعبادة |

## المكتبات المشتركة

تُنشر الشيفرة المشتركة على npm ضمن نطاق `@churchapps`، وتُستخدم كتبعيات npm عادية من قبل المشاريع المذكورة أعلاه. تقع جميع الحزم المشتركة في مستودع واحد هو [Packages](https://github.com/ChurchApps/Packages)، وتُدار كمساحة عمل Yarn ويُصدر إصداراتها باستخدام changesets.

| الحزمة | الغرض | المستخدمة من قبل |
|--------|-------|------------------|
| `@churchapps/helpers` | الأدوات الأساسية والواجهات المشتركة بلغة TypeScript (DateHelper وApiHelper وCurrencyHelper وغيرها) | جميع المشاريع |
| `@churchapps/apihelper` | أدوات خادم Express (المصادقة، والمتحكمات الأساسية، والوصول إلى قاعدة البيانات، وتكاملات AWS) | جميع واجهات برمجة التطبيقات |
| `@churchapps/apphelper` | مكتبة مكونات React مع وحدات فرعية لتسجيل الدخول والتبرعات والنماذج وMarkdown وبناء المواقع | جميع تطبيقات الويب |
| `@churchapps/content-providers` | تجريد لمزودي المحتوى من أطراف ثالثة (Lessons.church وPlanning Center وDropbox وغيرها) | Api وB1Admin وB1App وFreePlay |
| `@churchapps/integration-sdk` | مجموعة أدوات تكامل B1.church: الwebhooks وREST client وOAuth | مطورو التكاملات الخارجية |
| `@churchapps/texting` | تجريد لمزودي الرسائل النصية SMS | Api |

للاطلاع على إعداد مساحة العمل وسير عمل الإصدار، راجع [المكتبات المشتركة](../shared-libraries/index.md).

## العلاقات بين المشاريع

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

تعتمد جميع تطبيقات الواجهة الأمامية على `@churchapps/helpers`. وتعتمد تطبيقات الويب بالإضافة إلى ذلك على حزم `@churchapps/apphelper`. وتعتمد جميع واجهات برمجة التطبيقات الخلفية على كل من `@churchapps/helpers` و`@churchapps/apihelper`.

## الخطوات التالية

- **[متغيرات البيئة](./environment-variables.md)** -- قم بضبط ملفات `.env` للاتصال بواجهات برمجة التطبيقات
- **[الإعداد المحلي للواجهة البرمجية](../api/local-setup.md)** -- قم بإعداد واجهة برمجة التطبيقات الخلفية محليًا
