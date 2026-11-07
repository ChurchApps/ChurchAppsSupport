---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

تُوفّر الحزمة `@churchapps/apphelper` مكوّنات React مشتركة ودوالًا مساعدة لجميع تطبيقات ويب ChurchApps. وهي حزمة منشورة واحدة تُصدّر وحدات الميزات عبر نقاط دخول فرعية، مثل تسجيل الدخول، والتبرعات، والنماذج، وMarkdown، ووظائف الموقع ونظام إدارة المحتوى، إلى جانب مجموعة أساسية من المكوّنات والدوال المساعدة المشتركة.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- ثبّت **Node.js** و**Git** — راجع [المتطلبات الأساسية](../setup/prerequisites)
- تعرّف على إعداد [مساحة عمل الحزم](./index.md) وتدفق الإصدار

</div>

## نقاط الدخول

تُعرّف الحزمة مسارات تصدير فرعية في ملف `package.json` الخاص بها، لذا يمكن استيراد كل وحدة ميزة على حدة:

| نقطة الدخول | المحتوى |
|-------------|----------|
| `@churchapps/apphelper` | المكوّنات الأساسية والدوال المساعدة والخطافات (hooks) |
| `@churchapps/apphelper/login` | واجهة تسجيل الدخول والتسجيل |
| `@churchapps/apphelper/donations` | مكوّنات العطاء والتبرعات |
| `@churchapps/apphelper/forms` | مكوّنات إرسال النماذج |
| `@churchapps/apphelper/markdown` | محررات Markdown وHTML ومعروضاتهما |
| `@churchapps/apphelper/website` | مكوّنات منشئ المواقع ونظام إدارة المحتوى |

## من يستخدم ماذا

قبل تغيير أي تصدير مشترك، تحقّق من التطبيقات التي تستورده:

| منطقة التصدير | ما توفّره | المستخدمة من قِبل |
|---|---|---|
| الجذر — المكوّنات والخطافات الأساسية | `DisplayBox`، `InputBox`، `Loading`، `PageHeader`، `PersonAvatar`، `SmallButton`، `ErrorMessages`، `ExportLink`، `useMountedState`، إضافةً إلى دوال `@churchapps/helpers` المُعاد تصديرها (`ApiHelper`، `DateHelper`، `Locale`، `UserHelper`، وغيرها) | B1Admin، B1App، B1Transfer، LessonsApp |
| الجذر — هيكل الموقع | `SiteHeader` (التنقل، وقائمة المستخدم، والإشعارات) | B1Admin، B1Transfer، LessonsApp |
| الجذر — محررات محتوى المشرف | `ImageEditor`، `HelpIcon` | B1Admin |
| الجذر — البنية التحتية للوقت الفعلي | `SocketHelper`، `SubscriptionManager`، `NotificationService` | B1Admin، B1App |
| الجذر — مخازن الدردشة والحضور | `ConversationStore`، `PresenceStore` | B1App |
| الجذر — الملاحظات وواجهة المراسلة | `Notes` (ملاحظات الموظفين عن الأشخاص والمهام)؛ `AddNote`، `SubscriptionToggle` (مراسلة الأعضاء) | B1Admin (`Notes`)، B1App (`AddNote`، `SubscriptionToggle`) |
| الجذر — خاص بـ Lessons | `AnalyticsHelper`، `FloatingSupport`، `SupportModal` | LessonsApp |
| `./login` | `LoginPage`، `LogoutPage` | B1Admin، B1App، B1Transfer، LessonsApp |
| `./markdown` | `MarkdownEditor`، `MarkdownPreviewLight` (مشتركة)؛ `MarkdownPreview`، `HtmlEditor` (لتحرير محتوى المشرف) | B1Admin، B1App، LessonsApp |
| `./donations` | `MultiGatewayDonationForm`، `RecurringDonations`، `PaymentMethods`، `StripePaymentMethod`، `DonationHelper`/`getPaymentProvider` (مشتركة)؛ `FundDonations` (للمشرف فقط) | B1Admin، B1App |
| `./forms` | `FormSubmissionEdit` (يعرض `ConversationalForm` عندما تكون قيمة `displayMode` للنموذج هي `conversational`) | B1Admin، B1App |
| `./website` | نواة عرض الصفحات المشتركة بين المحرّر والعارض (`Element` مع العارضات الخاصة بكل نوع والمُسجَّلة عبر `ElementRegistry`، و`StyleHelper`، و`DroppableArea`، و`DraggableWrapper`، و`Theme`، و`YoutubeBackground`، و`SectionDivider`/`parseDividerConfig`)؛ وأدوات الموقع العامة (`AnnouncementBanner`، و`Launcher` مع دوال `parse*Config` الخاصة بهما)؛ و`Animate` و`ElementBlock` و`NonAuthDonationWrapper` و`SermonElement`، وهي مستخدمة فقط في العارض العام المتاح للزوّار | B1Admin (المحرّر)، B1App (مكوّنات المحرّر + العارض) |

تستخدم B1Transfer وLessonsApp نقطتي الدخول الجذر و`login` فقط. أما نقاط الدخول الفرعية `donations` و`forms` و`website` فيستخدمها حصريًا B1Admin وB1App حاليًا.

## إعداد بيئة التطوير المحلية

تقع هذه الحزمة ضمن [مساحة عمل Packages](https://github.com/ChurchApps/Packages) إلى جانب المكتبات المشتركة الأخرى:

1. استنسخ مساحة العمل:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. ثبّت التبعيات في جذر مساحة العمل:

   ```bash
   cd Packages && yarn install
   ```

3. شغّل ملعب Vite من مجلد الحزمة:

   ```bash
   cd apphelper && yarn dev
   ```

   يبدأ خادم التطوير للملعب على `http://localhost:3001`. انسخ `playground/dotenv.sample` إلى `playground/.env` واملأ القيم المطلوبة أولًا.

لبناء الحزمة للاستخدام (تُترجم إلى `dist/` وتنسخ ملفات اللغات وCSS)، شغّل `yarn workspace @churchapps/apphelper build`، أو شغّل `yarn build` في الجذر لبناء كل الحزم بحسب ترتيب التبعيات. ولاختبار نسخة غير منشورة داخل تطبيق مستهلك، استخدم بوابة Yarn مؤقتة. راجع [التطوير المحلي ضمن تطبيق مستهلك](./index.md#local-development-against-a-consuming-app).

:::tip
الملعب هو أسرع طريقة لتطوير مكوّنات AppHelper واختبارها. يُعيد خادم Vite تحميله تلقائيًا، فتتمكن من رؤية التغييرات فورًا.
:::

## النشر

تمرّ الإصدارات عبر changesets: شغّل `yarn changeset` في جذر مساحة العمل مع كل تغيير، ثم شغّل `yarn publish-all` عند الاستعداد للإصدار. راجع [نظرة عامة على المكتبات المشتركة](./index.md#releasing-with-changesets) للاطلاع على التدفق الكامل.

:::warning
لا تحذف أي تصدير أو تعيد تسميته قبل نشر البديل وترحيل كل المستهلكين. ابحث في كل المستودعات المستهلكة قبل دمج أي عملية حذف.
:::

## مقالات ذات صلة

- **[المساعدات](./helpers)**: الحزمة الأساسية للدوال المساعدة المستخدمة مع AppHelper
- **[تطبيقات الويب](../web-apps/)**: تطبيقات الويب التي تستخدم هذه الحزمة
- **[نظرة عامة على المكتبات المشتركة](./index.md)**: إعداد مساحة العمل، وتدفق الإصدار، وسير عمل الربط المحلي
