---
title: "المكتبات المشتركة"
---

# المكتبات المشتركة

<div class="article-intro">

يُنشر الكود المشترك لـ ChurchApps على npm ضمن النطاق `@churchapps/*`. توجد جميع الحزم المشتركة في مستودع واحد — [Packages](https://github.com/ChurchApps/Packages) — يُدار كمساحة عمل Yarn (Berry) وتُدار إصداراته بواسطة [changesets](https://github.com/changesets/changesets).

</div>

## الحزم

| الحزمة | الوصف | يُستخدم من قِبَل |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | طبقة الأساس: دوال مساعدة مستقلة عن أي إطار عمل، والواجهات المشتركة في TypeScript التي تشكّل عقد البيانات المتبادل بين التطبيقات | جميع المشاريع |
| [`@churchapps/apihelper`](./api-helper) | أدوات الخادم المبنية على Express: المصادقة، والمتحكّمات الأساسية، والوصول إلى قاعدة البيانات، وتكاملات AWS والبريد الإلكتروني | جميع واجهات API |
| [`@churchapps/apphelper`](./app-helper) | مكونات React المشتركة ووحدات الميزات (تسجيل الدخول، والتبرعات، والنماذج، وMarkdown، والموقع الإلكتروني) | جميع تطبيقات الويب |
| `@churchapps/content-providers` | تجريد فوق مزودي المحتوى من أطراف ثالثة (Lessons.church وPlanning Center وDropbox وغيرها) | Api وB1Admin وB1App وFreePlay |
| `@churchapps/integration-sdk` | أداة لبناء تكاملات B1.church: التحقق من Webhook، وعميل REST مُنمَّط الأنواع، ومساعدات OAuth | مطوّرو التكاملات الخارجية |
| `@churchapps/texting` | تجريد لمزودي الرسائل النصية القصيرة (Text In Church وClearstream وMutual Ministry وMinistryStuff وNalo Solutions وTwilio) | Api |

يسير اتجاه التبعيات نحو الأسفل بصرامة: تعتمد التطبيقات على `apihelper` و`apphelper`، واللذين يُعلنان `@churchapps/helpers` كـ**تبعية نظيرة** حتى يحلّ كل تطبيق نسخةً واحدةً بالضبط منها.

## إعداد مساحة العمل

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

يستخدم المستودع Yarn Berry (حقل `packageManager` في الجذر هو المرجع المعتمد) مع ملف قفل واحد. يبني `yarn build` كل حزمة بحسب ترتيب تبعياتها، ويشغّل `yarn test` اختبارات جميع الحزم.

## النشر باستخدام Changesets

يُشحن كل تغيير في أي حزمة مع changeset:

1. شغّل `yarn changeset` في جذر مساحة العمل. اختر الحزمة (الحزم) التي عدّلتها، ونوع الرفع (patch = إصلاح، minor = تصدير جديد أو ميزة، major = تغيير كاسر)، واكتب ملخصاً من سطر واحد — وسيصبح هذا الملخص إدخالاً في CHANGELOG.
2. أضف ملف `.changeset/*.md` المُولَّد إلى الـ commit مع تغيير الكود. يمنع خطاف pre-commit أي commit يغيّر كود مصدر حزمة دون وجود changeset مُدرَج في staging.
3. عند الاستعداد للنشر، شغّل `yarn publish-all` في الجذر. يستهلك هذا الأمر الـ changesets المعلّقة (فيرفع الإصدارات، ويكتب ملفات CHANGELOG، ويزامن نطاقات التبعيات الداخلية)، ثم يبني كل شيء بحسب ترتيب التبعيات، وينشر الحزم المرفوعة إصداراتها إلى npm. بعد ذلك، أنشئ commit وادفع رفعات الإصدارات.

:::warning
لا تشغّل أبداً `npm publish` مباشرةً داخل حزمة واحدة، فهذا يتجاوز ترتيب البناء ومسك سجلات الإصدارات الذي يتولاه سكربت النشر. يتطلب النشر حساب npm له صلاحية النشر في نطاق `@churchapps`.
:::

## التطوير المحلي مقابل تطبيق مستهلك

داخل مساحة العمل، تُبنى الحزم مباشرةً مقابل حزم شقيقاتها، ولا حاجة إلى ربط. لاختبار بناء حزمة غير منشورة داخل تطبيق يستخدمها (B1Admin وB1App وغيرهما)، أضف Yarn portal مؤقتاً في التطبيق المستهلك:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

ابنِ الحزمة أولاً (`yarn build` في جذر مساحة العمل)، فالتطبيق المستهلك يقرأ مخرجات `dist/` المُترجمة، لا الكود المصدري.

:::warning
يكتب `yarn link` مسار portal في `package.json` الخاص بالتطبيق المستهلك. لا تُدرجه في commit أبداً. شغّل دائماً `yarn unlink` ثم أعد التثبيت عند الانتهاء.
:::
