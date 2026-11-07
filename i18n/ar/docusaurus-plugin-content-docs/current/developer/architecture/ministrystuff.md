# MinistryStuff (التخزين المدفوع والرسائل النصية)

MinistryStuff.org خدمة مدفوعة منفصلة تموّل أمرين لا تستطيع ChurchApps تقديمهما مجانًا: تخزين الملفات بكميات كبيرة (1 تيرابايت فأكثر) ورصيد الرسائل النصية القصيرة (SMS)، وكلاهما اشتراكات شهرية بسعر ثابت. تبقى ChurchApps مجانية بالكامل، ولا يتطلب أي جزء في B1 اشتراكًا في MinistryStuff، وكل نقطة تكامل هي "نقطة توصيل للمزوّد" (provider seam) يمكن لطرف ثالث تنفيذها أيضًا.

## المكوّنات

| المكوّن | المستودع | الدور |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (المنفذ 8097 في بيئة التطوير) | الفوترة (Stripe)، وإرسال الرسائل النصية وسجل الرصيد (AWS End User Messaging)، والتخزين (S3 مع محاسبة الحصص). قاعدة بيانات MySQL واحدة `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (المنفذ 3103 في بيئة التطوير) | ministrystuff.org: التسويق والأسعار وبوابة الحساب (الخطط والاستخدام وإعادة التوجيه إلى Stripe Checkout وCustomer Portal). |
| مزوّد الرسائل النصية | `Packages/texting` ← `MinistryStuffProvider` | مسجَّل باسم `ministrystuff` إلى جانب Clearstream وTextInChurch. |
| نقطة توصيل التخزين | `Packages/apihelper` ← `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (الافتراضي والمجاني) يغلّف مبدّل S3/القرص الأصلي، و`FileStorageHelper` يفوّض إلى المزوّد الافتراضي دون أي تغيير. |
| ربط الـ Api | وحدات المحتوى والرسائل في `Api/` | `MinistryStuffStorageProvider` و`StorageResolver` (المحتوى)، وحقن مفتاح الخدمة في `TextingConfigHelper` (الرسائل)، وجدول `storageProviders`، ونقاط النهاية `/content/storage/*` و`/messaging/texting/credits`. |

## الهوية والثقة

- **الحسابات والكنائس نفسها:** تتحقق MinistryStuffApi من رموز JWT الخاصة بـ ChurchApps باستخدام `JWT_SECRET` المشترك (وهو نمط التطبيقات الشقيقة، مثل B1Transfer). تسجّل البوابة الدخول عبر MembershipApi وتقبل عمليات التسليم عبر `?jwt=`.
- **من خادم إلى خادم** (من Api الأساسية إلى MinistryStuffApi): ترويسة `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`، على الطرفين) مع `churchId` صريح. يُتحقَّق دائمًا من الاستحقاق مقابل اشتراك تلك الكنيسة. لا تحمل الكنائس أي بيانات اعتماد لـ MinistryStuff أبدًا، فيكفي اختيار المزوّد في B1Admin.

## مسار الرسائل النصية

B1Admin Send Text ← Api `TextingController` ← `@churchapps/texting` `getProvider("ministrystuff")` ← MinistryStuffApi `/sms/send|/sms/sendBulk` ← يُخصم عدد الأجزاء (segments) من `smsCreditGrants` للفترة الحالية ← AWS End User Messaging (أو `smsMode: mock` في بيئة التطوير).

الرصيد **حدّ صارم**: عند نفاد الرصيد يُرفض الطلب بالكامل (`insufficient_credits`، ويظهر في B1Admin كرسالة ودية تدعو إلى الترقية). لا يوجد إرسال جزئي ولا فوترة للتجاوز. تُمنح أرصدة الرسائل بطريقة idempotent لكل فترة فوترة من أحداث Stripe `invoice.paid` عبر webhooks. تُستبعد جهات الاتصال التي أوقفت الاستلام (`smsOptOuts`) قبل كل إرسال.

تصل مسارات أخرى إلى نقطة توصيل المزوّد نفسها دون المرور عبر `TextingController`: تنبيهات تسجيل الوصول (`CheckinController` ← `MessagingModuleGateway.sendBulkText`)، وإجراء **Send Text** في سير العمل (`Api/src/modules/doing/helpers/StepActionHelper.ts` ← `sendText` ← `MessagingModuleGateway.sendPersonText`، الذي يكتب صفوف `sentTexts` و`deliveryLogs` بمرسل فارغ null). تُحلّ حقول الدمج (`{{firstName}}`، و`{{lastName}}`، و`{{displayName}}`، و`{{churchName}}`) لكل مستلم بواسطة `MergeFieldHelper.resolve`، ويُقتصر الناتج على 1,600 حرف. في `TextingController`، تُرسل الرسالة الجماعية التي تحتوي على `{{` كعملية `sendMessage` منفصلة لكل مستلم بدلًا من `sendBulk` واحد، أما الرسالة التي لا تحتوي على حقول نائبة فتُرسل كعملية bulk واحدة.

## مسار التخزين

يحدد سجل المزوّد الخاص بالكنيسة (`content.storageProviders`، ويُدار في B1Admin ← Settings ← File Storage) المكان الذي تُرفع إليه **الملفات الجديدة**. إن `contentPath` عنوان URL مطلق لكل ملف، لذلك تتعايش مزوّدات مختلفة دون أي ترحيل: تستمر الملفات القديمة في الظهور من `content.churchapps.org`، والجديدة من `content.ministrystuff.org`.

تمر عمليات الرفع من Api ← `StorageResolver.forChurch` ← `store` أو `getUploadUrl` لدى المزوّد (presigned POST مع `content-length-range` في وضع S3، وفي وضع القرص أو التطوير يُستخدم base64 احتياطيًا). وتُوجَّه عمليات الحذف بحسب عنوان URL المخزَّن (`StorageResolver.forUrl`).

الحصة هي بايتات الخطة، وتُحسب من `storageObjects` (الحجوزات `stored` و`pending`). وتجاوز الحصة يمنع الرفع الجديد (`storage_quota_exceeded`)، ولا يُحذف شيء ولا تُفرض رسوم إضافية أبدًا. مستوى ChurchApps المجاني لم يتغير، فله الحدود نفسها كما كانت، ولا توجد حصة على مستوى الكنيسة بأكملها.

**ملاحظة عن النطاق:** يشمل اختيار المزوّد تدفّق **الملفات والموارد** في المحتوى، أي المكان الذي توجد فيه الوسائط الكبيرة. أما عمليات رفع الصور في المعرض والشعارات والصور فتبقى على المزوّد الافتراضي، لأنها تسرد المفاتيح من التخزين وتبني عناوين URL من جانب العميل، لذا لا ينطبق التوجيه الخاص بكل كنيسة بعد.

تعتمد [التخزين الخاص بك (Bring-Your-Own Storage)](./byos-storage.md) على النقطة نفسها أيضًا: يمكن للكنائس ربط Google Drive أو Dropbox أو OneDrive أو حاوية S3 متوافقة تملكها، بدلًا من خطة MinistryStuff.

## الفوترة

يُستخدم Stripe Checkout (المستضاف) للاشتراك، ويُستخدم Stripe Customer Portal لتحديث البطاقة والإلغاء والفواتير. لا تحتوي MinistryStuffWeb على أي نماذج بطاقات. يوجد صف واحد في `subscriptions` لكل زوج (كنيسة، منتج)، وتُحفظ الخطط والمستويات في الكود (`MinistryStuffApi/src/helpers/Plans.ts`) مع معرّفات أسعار Stripe من الإعدادات.

يقود webhook (`/billing/webhook`، مع التحقق من توقيع الجسم الخام ومنع التكرار عبر `webhookEvents`) دورة حياة الاشتراك: نشط → past_due (فترة سماح) → canceled (ملغى).

## إعداد بيئة التطوير

شغّل MinistryStuffApi (`yarn dev`، المنفذ 8097، ويحتاج ملف `.env` يحتوي على `JWT_SECRET` المشترك و`MINISTRYSTUFF_SERVICE_KEY`)، واضبط مفتاح الخدمة نفسه في `Api/.env`. يشير `Api/config/dev.json` إلى `localhost:8097` في `ministryStuffApi` بالفعل. يحتاج MinistryStuffWeb إلى ملف `.env` يحتوي على `VITE_STAGE=dev`. تستخدم بيئة التطوير `smsMode: mock` والتخزين على القرص، ولا حاجة إلى AWS.
