---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

توفر حزمة `@churchapps/apihelper` أدوات مساعدة من جانب الخادم لجميع واجهات ChurchApps البرمجية المبنية على Express.js. وتتضمن فئة المتحكم الأساسية، ومصادقة JWT، وأدوات قاعدة البيانات، وتكاملات AWS التي تعتمد عليها كل مشاريع الواجهات البرمجية.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- ثبّت **Node.js** و**Git** -- راجع [المتطلبات الأساسية](../setup/prerequisites)
- تعرّف على إعداد [مساحة عمل الحزم](./index.md) وآلية الإصدار
- تعتمد هذه الحزمة على [`@churchapps/helpers`](./helpers) كتبعية نظيرة (peer dependency) وتعيد تصديرها

</div>

## ما الذي تتضمنه

- **CustomBaseController** -- فئة أساسية لمتحكمات الواجهات البرمجية، مبنية على `inversify-express-utils`
- **Auth** -- مصادقة JWT عبر `CustomAuthProvider` و`AuthenticatedUser` و`Principal`
- **أدوات قاعدة البيانات** -- `DB.query` و`DB.queryOne` وفئة `Pool` لإدارة اتصالات MySQL، إلى جانب `MySqlHelper` و`DBCreator` لإعداد المخطط
- **تكاملات AWS** -- `AwsHelper` لتخزين الملفات في S3 وقراءة معلمات SSM Parameter Store
- **البريد الإلكتروني** -- `EmailHelper` ويدعم وسيلتي النقل SES وSMTP
- **تحميل الإعدادات** -- يقرأ `EnvironmentBase` سلاسل الاتصال والأسرار من متغيرات البيئة أو Parameter Store
- **متفرقات** -- `EncryptionHelper` و`FileStorageHelper` و`LoggingHelper` و`BasePermissions` و`SlugHelper`

## الإعداد للتطوير المحلي

تقع هذه الحزمة ضمن مساحة عمل [Packages](https://github.com/ChurchApps/Packages) إلى جانب المكتبات المشتركة الأخرى:

1. انسخ مساحة العمل:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. ثبّت التبعيات في جذر مساحة العمل:

   ```bash
   cd Packages && yarn install
   ```

3. ابنِ الحزمة (يترجم TypeScript إلى `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   أو شغّل `yarn build` في الجذر لبناء كل الحزم بحسب ترتيب التبعيات.

لاختبار التغييرات داخل واجهة برمجية مستهلكة، استخدم Yarn portal مؤقتًا -- راجع [التطوير المحلي مع تطبيق مستهلك](./index.md#local-development-against-a-consuming-app).

## النشر

تمر الإصدارات عبر changesets: شغّل `yarn changeset` في جذر مساحة العمل مع كل تغيير، ثم `yarn publish-all` عند الاستعداد للإصدار. راجع [نظرة عامة على المكتبات المشتركة](./index.md#releasing-with-changesets) للاطلاع على المسار الكامل.

:::info
هذه الحزمة تابعة لكل واجهة برمجية من واجهات ChurchApps -- أي Api الأساسية وAskApi وLessonsApi. عند إجراء تغييرات، اختبرها مقابل واجهة برمجية محلية قبل النشر.
:::

## مقالات ذات صلة

- **[Helpers](./helpers)** -- حزمة الأدوات الأساسية التي تعتمد عليها هذه الحزمة
- **[بنية الوحدات](../api/module-structure)** -- كيفية استخدام المتحكمات ووسائط المصادقة في وحدات الواجهة البرمجية
- **[إعداد الواجهة البرمجية محليًا](../api/local-setup)** -- إعداد الواجهة البرمجية للتطوير المحلي
