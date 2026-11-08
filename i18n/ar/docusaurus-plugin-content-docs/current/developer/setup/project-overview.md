---
title: "نظرة عامة على المشروع"
description: "عرض جميع مستودعات ChurchApps حسب الفئة، مع الأطر البرمجية ومنافذ التطوير وقواعد البيانات، وكيفية ربط حزم @churchapps المشتركة بينها، في وثائق إعداد المطورين."
---

# نظرة عامة على المشروع

<div class="article-intro">

تتكون ChurchApps من حوالي 20 مستودعًا مستقلًا، ينشر كل منها ضمن [منظمة ChurchApps على GitHub](https://github.com/ChurchApps). تقدم هذه الصفحة قائمة كاملة بجميع المشاريع مصنفة حسب الفئة، مع أطرها البرمجية ومنافذها وعلاقاتها.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- ثبّت [المتطلبات الأساسية](./prerequisites.md) للفئة التي تريد العمل عليها

</div>

## واجهات برمجة التطبيقات الخلفية

تُبنى جميع واجهات برمجة التطبيقات باستخدام Node.js وExpress وTypeScript، وتُنشر على AWS Lambda عبر Serverless Framework.

| المشروع | الغرض | منفذ التطوير | قاعدة البيانات |
|---------|-------|--------------|----------------|
| **[Api](https://github.com/ChurchApps/Api)** | النواة الأساسية (modular monolith) التي تغطي العضوية والحضور والمحتوى والعطاء والمراسلة والمهام | 8084 | قاعدة بيانات MySQL منفصلة لكل وحدة (6 إجمالًا) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | الواجهة الخلفية لـ Lessons.church | -- | قاعدة بيانات MySQL واحدة باسم `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | أداة استعلام تعمل بالذكاء الاصطناعي عبر OpenAI | -- | -- |

:::info
المشروع **Api** الأساسي هو modular monolith. لكل وحدة (العضوية والحضور والمحتوى والعطاء والمراسلة والمهام) قاعدة بياناتها الخاصة، ويمكن الوصول إليها عبر مسار فرعي مثل `/membership` أو `/giving`. وفي بيئة الإنتاج، تُعرض هذه الوحدات كدوال Lambda منفصلة خلف API Gateway.
:::

## تطبيقات الويب

| المشروع | الإطار | منفذ التطوير | الغرض |
|---------|--------|--------------|-------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | لوحة إدارة الكنيسة |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | تطبيق أعضاء الكنيسة العام |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | الواجهة الأمامية لـ Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | أداة استيراد البيانات وتصديرها |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | ثابت (Static) | -- | مواقع كنائس تعريفية ثابتة |

## تطبيقات الجوال

تستخدم جميع تطبيقات الجوال React Native مع Expo.

| المشروع | الغرض | الإصدارات الرئيسية |
|---------|-------|---------------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | تطبيق كشك تسجيل الحضور | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | عرض الدروس على Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | تشغيل المحتوى (بما في ذلك أنظمة تشغيل التلفاز) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | تحكم عن بُعد عبر الجوال في FreeShow | Expo |

## سطح المكتب

| المشروع | المكدس التقني | الغرض |
|---------|---------------|-------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | برنامج العروض التقديمية وبرامج العبادة |

## المكتبات المشتركة

يُنشر الكود المشترك على npm تحت النطاق `@churchapps` ويُستخدم كاعتماديات npm عادية في المشاريع أعلاه. تُوجد جميع الحزم المشتركة في مستودع واحد، [Packages](https://github.com/ChurchApps/Packages)، يُدار كـ Yarn workspace ويُصدر باستخدام changesets.

| الحزمة | الغرض | يستخدمها |
|--------|-------|----------|
| `@churchapps/helpers` | الأدوات الأساسية وواجهات TypeScript المشتركة (DateHelper وApiHelper وCurrencyHelper وغيرها) | جميع المشاريع |
| `@churchapps/apihelper` | أدوات خادم Express (المصادقة، والمتحكمات الأساسية، والوصول إلى قاعدة البيانات، وتكاملات AWS) | جميع واجهات برمجة التطبيقات |
| `@churchapps/apphelper` | مكتبة مكونات React مع وحدات فرعية لتسجيل الدخول والتبرعات والنماذج وMarkdown وبناء المواقع | جميع تطبيقات الويب |
| `@churchapps/content-providers` | تجريد مزودي المحتوى الخارجيين (Lessons.church وPlanning Center وDropbox وغيرها) | Api وB1Admin وB1App وFreePlay |
| `@churchapps/integration-sdk` | مجموعة أدوات تكامل B1.church: webhooks وREST client وOAuth | مطورو التكامل الخارجيون |
| `@churchapps/texting` | تجريد مزودي الرسائل النصية (SMS) | Api |

راجع [المكتبات المشتركة](../shared-libraries/index.md) لمعرفة إعداد مساحة العمل وسير عمل الإصدار.

## العلاقات بين المشاريع

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

تعتمد جميع تطبيقات الواجهة الأمامية على `@churchapps/helpers`. وتعتمد تطبيقات الويب إضافةً إلى ذلك على حزم `@churchapps/apphelper`. وتعتمد جميع واجهات برمجة التطبيقات الخلفية على كل من `@churchapps/helpers` و`@churchapps/apihelper`.

## الخطوات التالية

- **[متغيرات البيئة](./environment-variables.md)** — اضبط ملفات `.env` الخاصة بك للاتصال بواجهات برمجة التطبيقات
- **[إعداد API المحلي](../api/local-setup.md)** — قم بإعداد واجهة برمجة التطبيقات الخلفية محليًا
