---
title: "بنية نظام التبرعات"
description: "دليل المطورين للعطاء في ChurchApps: كيف يرسل B1 Admin وB1.church التبرعات عبر بوابات Stripe وPayPal وKingdom Funding وPaystack."
---

# بنية نظام التبرعات

<div class="article-intro">

تعمل ChurchApps على التبرعات وفق نموذج "البوابة الخارجية للمدفوعات": تحتفظ الكنيسة بحساب Stripe الخاص بها (أو PayPal أو Kingdom Funding أو Paystack)، ولا تمرّ B1 أبدًا في مسار الأموال بوصفها معالجًا للمدفوعات على مستوى المنصة. تُحوَّل بيانات البطاقة إلى رمز (token) داخل المتصفح، ولا تصل إلى أي خادم تابع لـ ChurchApps. تستعرض هذه الصفحة البنية الكاملة: سجل مزودي الدفع في جانب العميل ضمن `@churchapps/apphelper`، وتجريد بوابة GivingApi، ونموذج بيانات التبرعات، وكيفية مطابقة إشعارات webhook الواردة من البوابات مع قاعدة البيانات.

</div>

## نظرة عامة

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

تنطبق ثلاثة مبادئ على المكدّس بأكمله:

1. **البوابة هي التي تحتفظ بالبطاقة.** يُحوّل أداة الإدخال الخاصة بكل مزود بيانات البطاقة داخل المتصفح، ولا تستقبل الواجهة البرمجية (API) إلا رمزًا (token) أو nonce أو معرّف طلب.
2. **تجريد واحد لمزودين متعددين.** يحدد المتصفح `PaymentProvider` من سجل، ويحدد الخادم `IGatewayProvider` من مصنع (factory). ويعتمد الطرفان على اسم المزود الموحَّد نفسه المخزَّن في سجل البوابة.
3. **إشعارات webhook هي المرجع في التسوية.** تُسجَّل استجابة الخصم بشكل تفاؤلي، لكن إشعار webhook الموقَّع من البوابة هو ما يؤكد التبرع المكتمل (أو ينشئه)، مع ضوابط لمنع التكرار على الجانبين.

## جانب العميل: سجل مزودي الدفع (`@churchapps/apphelper`)

يقع السجل في `Packages/apphelper/src/donations/providers/`، وتوجد أدوات واجهة كل مزود ومساعداته في مجلد فرعي خاص به (`providers/stripe/` و`providers/paypal/` و`providers/kingdomfunding/` و`providers/paystack/`). ولا يتفرع أي كود خارج `providers/` بحسب اسم المزود. ويجمع `PaymentProvider` (انظر `providers/types.ts`) كل ما يحتاجه تطبيق المضيف لبوابة واحدة:

- `descriptor`: تسميات الإدارة، والعملات المدعومة، وحقول الرسوم، ومعدلات الرسوم الافتراضية، وروابط لوحة التحكم والتسجيل.
- مجموعة الأعلام `capabilities`: البطاقات المحفوظة، وACH، والتكرار، وإدخال بطاقة جديدة مضمَّن، والحفظ الضمني عند التحويل إلى رمز.
- أدوات React الخاصة بإدخال الأعضاء (`MemberWrapper`/`MemberEntry`)، والتبرع للضيوف (`GuestForm`)، وتعديل وسيلة دفع محفوظة (`MethodEditForm`)، ودفعات النماذج (`FormPayment`).
- `buildChargeRequest(ctx, token)`، وهي الدالة الوحيدة التي تختلف فيها بنية طلب الخصم من مزود لآخر.

ويحمّل `MemberWrapper` الخاص بكل مزود حزمة SDK الخاصة به من المفتاح العام المسجَّل في سجل البوابة، لذلك لا تستورد تطبيقات المضيف أي SDK للبوابة أبدًا (لا تعتمد B1App وB1Admin على `@stripe/*`). وتتولى `pickDefaultGateway(gateways, capability?)` تحديد البوابة التي ينبغي لكل واجهة استخدامها من بين بوابات الكنيسة.

يحتوي `providers/registry.ts` على المزودين المدمجين. وهم **مُشار إليهم بالقيمة** وليسوا مسجَّلين عبر أثر جانبي للوحدة، حتى لا تتمكن إزالة الكود غير المستخدم (tree-shaking) في أداة التجميع من إسقاط التسجيل أبدًا:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| الدالة | الغرض |
|----------|---------|
| `getPaymentProvider(name)` | يحل المزود بالاسم الموحَّد، ويعود إلى Stripe عند عدم وجوده حتى لا يتعطل نموذج المتبرع بسبب مزود سيئ الإعداد |
| `registerPaymentProvider(p)` | يسجّل مزودًا إضافيًا وقت التشغيل (لبوابة مخصصة يوفرها تطبيق المضيف) |
| `listPaymentProviders()` | يعدّد المزودين المدمجين والمخصصين، ويُستخدم لبناء قائمة بوابات الإدارة المنسدلة |
| `hasPaymentProvider(name)` | فحص العضوية |

**المزودون المدمجون في جانب العميل: Stripe وPayPal وKingdom Funding وPaystack.** يقرأ B1App وB1Admin السجل فقط (`getPaymentProvider` و`listPaymentProviders`)، ولا يستدعي أيٌّ منهما `registerPaymentProvider`، إذ يبقى التسجيل داخل apphelper.

يُحوّل كل مزود بيانات البطاقة بطريقة مختلفة، لكن الجميع يُبقي البطاقة خارج B1:

| المزود | أداة الإدخال | الرمز المُرسل إلى الواجهة البرمجية |
|----------|--------------|-----------------------|
| Stripe | `CardElement` من Stripe `Elements` ← `stripe.createPaymentMethod(...)`؛ كما يركّب نموذج الضيوف أيضًا `ExpressCheckoutElement` (Apple Pay / Google Pay، للهدايا لمرة واحدة) الذي تُحل دالة `onConfirm` فيه إلى المعرّف `pm_…` نفسه | معرّف وسيلة الدفع (`pm_…`)؛ أما الحساب المصرفي فعبر `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` للبوابات بالدولار الأمريكي، وخصم PAD الكندي `acss_debit` (نافذة تفويض مستضافة، وتفويض `default_for` للفواتير والاشتراكات، وتمرير معرّف التفويض في الخصومات لمرة واحدة) للبوابات بالدولار الكندي |
| Kingdom Funding | نموذج تحويل مستضاف يُعرَّف بالمفتاح العام للبوابة | nonce لمرة واحدة |
| PayPal | حقول PayPal المستضافة (البطاقة، والتكرار) إضافةً إلى أزرار PayPal Smart مع تمويل Venmo (لمرة واحدة)؛ يشترك الاثنان في تحميل SDK واحد وفي طلب الخادم الذي يُنشأ عبر `/donate/client-token` و`/donate/create-order` | معرّف الطلب المحصَّل |
| Paystack | نافذة Paystack Inline المنبثقة (`js.paystack.co/v2/inline.js`)، وتتولى النافذة الدفع نفسه (بطاقة، أو أموال عبر الهاتف، أو تحويل بنكي، أو USSD) | مرجع المعاملة المدفوعة؛ والوسائل المحفوظة هي رموز تفويض Paystack من نوع `AUTH_…` |

تُنفِّذ دالة `finalizeResult` في Stripe التحقق 3-D Secure / SCA داخل المتصفح (`providers/stripe/stripe3DS.ts` ← `stripe.confirmCardPayment`) قبل اعتبار التبرع مكتملًا. ويستدعي النموذج المشترك الدالة `provider.finalizeResult(result)` دون أن يعرف ما الذي تفعله.

## جانب الخادم: تجريد البوابة (GivingApi)

تعرض وحدة `/giving` (`Api/src/modules/giving`) واجهة REST، أما آليات البوابة فتقع في `Api/src/shared/helpers`. لا يتعامل `DonateController` مع أي SDK للبوابة مباشرةً، بل يمر عبر `GatewayService`، الذي يحدد `IGatewayProvider` المناسب من `GatewayFactory` ويمرّر إليه `GatewayConfig` بعد فك تشفيره.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

يُعدّ `IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) العقدَ الذي تلتزم به كل بوابة. ويشمل دورة حياة webhook (`createWebhookEndpoint` و`verifyWebhookSignature` و`classifyWebhookEvent`)، والدفع (`prepareCharge` و`processCharge` و`prepareSubscription` و`createSubscription` و`finalizeSubscription` و`cancelSubscription`)، والرسوم (`calculateFees`)، ومعالجة وسائل الدفع المحفوظة (`listNormalizedPaymentMethods` و`buildAttachOptions` و`buildLocalMethodRecord` و`deletePaymentMethod` و`verifyMethodOwnership` و`ownsPaymentMethodId`)، وإضافات اختيارية (العملاء، والطلبات، وSetupIntents، وإعادة تشغيل الأحداث، و`retryFailedPayment` لفاتورة اشتراك فاشلة، و`registerPaymentMethodDomain` للتحقق من نطاق Apple Pay). ويُعدّ المزود الذي لا يُنفّذ خطافًا اختياريًا غير مدعوم لذلك الإجراء، وتُخفي الواجهة عنصر التحكم المرتبط به.

ويُعلن كل صنف مزود عن مصفوفة `capabilities` الخاصة به (العملات المدعومة، وACH، والاسترداد، ومتطلبات الاشتراك، وحدود المعاملات). ويكتفي `GatewayService.getProviderCapabilities(provider)` بقراءتها. كما تقود أعلام مثل `logsDonationsImmediately` سلوك المتحكمات دون أي شروط مرتبطة باسم المزود داخل المتحكمات.

**المزودون الخادميون المسجَّلون في `GatewayFactory`:**

| المزود | التوفر |
|----------|-------------|
| Stripe | مفعّل دائمًا |
| PayPal | مفعّل دائمًا |
| Kingdom Funding | مفعّل دائمًا |
| Paystack | مفعّل دائمًا (للتجار في نيجيريا وغانا وجنوب أفريقيا وكينيا وساحل العاج؛ والعملات NGN/GHS/ZAR/KES/XOF/USD) |
| Square | اختياري عبر متغير البيئة `ENABLE_SQUARE` |
| ePayMints | اختياري عبر متغير البيئة `ENABLE_EPAYMINTS` |

يختلف Paystack عن غيره في أن الأموال تنتقل قبل أن تتدخل GivingApi: تقوم النافذة المنبثقة بخصم المتبرع، وتكون `processCharge` عملية `GET /transaction/verify/:reference` التي يجب أن يطابق المبلغ المدفوع والعملة فيها التبرعَ الذي يجري تسجيله (والمرجع المسجَّل مسبقًا لا يُسجَّل مرتين أبدًا). ويُسجَّل أول تبرع في الجدول المتكرر من `finalizeSubscription` (التحقق ← `POST /plan` ← `POST /subscription` مع `start_date` بعد فترة واحدة). ووُقِّعت إشعارات webhook بالمفتاح السري نفسه (`x-paystack-signature`، وHMAC-SHA512 على الجسم الخام)، ولا يوفر Paystack واجهة برمجية لإدارة webhook، لذلك تعرض شاشة الإدارة الرابط لتلصقه الكنيسة في لوحة تحكم Paystack. ولا تحمل أحداث `charge.success` الخاصة بالتجديد تقسيمًا للصناديق، بل يستعيدها المزود من صفوف `subscriptions` و`subscriptionFunds` المحلية الخاصة بالمتبرع. وتُعد تفويضات البطاقة وحدها قابلة لإعادة الاستخدام (`reusable`)، أما هدايا الأموال عبر الهاتف فهي لمرة واحدة فقط، لذلك يرفضها `createSubscription`. وتُنشئ البيانات التجريبية كنيسة ثانية (Accra Community Church، ومعرّفها `CHU00000002`) على بوابة Paystack بالعملة GHS في وضع الاختبار، كي تعمل مجموعة اختبارات Paystack في Playwright إلى جانب مجموعة Stripe الخاصة بـ Grace.

يمكن تسجيل مزودين مخصصين وقت التشغيل عند ضبط `ENABLE_CUSTOM_GATEWAY_PROVIDERS`، وتُعد `AbstractExperimentalGatewayProvider` الصنف الأساسي لهم. وتُطابَق أسماء المزودين دون حساسية لحالة الأحرف.

### إعدادات البوابة والأسرار

يحفظ المشرف بيانات اعتماد البوابة عبر `POST /giving/gateways` (`GatewayController`). وعند الحفظ يُشفّر المتحكم المفتاح الخاص ومفتاح webhook باستخدام `EncryptionHelper` قبل تخزينهما. ثم، على أي مضيف غير `localhost`، يحذف webhook الحالي للكنيسة ويُنشئ آخر جديدًا يشير إلى `/giving/donate/webhook/{provider}?churchId=…`. وتحتفظ الكنيسة بصف واحد لكل مزود: فحفظ البوابة يستبدل الصف الموجود لذلك المزود فقط. ولا تُعيد القراءات العامة (`GET /giving/gateways/churchId/:churchId` و`/configured/:churchId`) إلا المفاتيح العامة.

## نموذج البيانات

يُعد مخطط giving (`Api/src/modules/giving/db/DatabaseTypes.ts`، والنماذج في `models/`) مخططَ MySQL يُوصَل إليه عبر Kysely:

| الجدول | الدور |
|-------|------|
| `gateways` | إعدادات المزود لكل كنيسة: `provider`، و`publicKey`، و`privateKey`/`webhookKey` مشفّرين، و`productId`، و`payFees`، و`currency`، و`settings`، و`environment` |
| `funds` | صناديق التبرع (`name`، و`taxDeductible`، و`productId`) |
| `donationBatches` | تجميع للإدخال والتقارير (`name`، و`batchDate`، و`status` وقيمته `open` أو `closed`، و`closedDate`، و`closedBy`) |
| `donations` | تبرع واحد: `batchId`، و`personId`، و`donationDate`، و`amount`، و`currency`، و`method`، و`status` (`pending`/`complete`/`failed`/`refunded`؛ ولا تحسب الكشوفات والإجماليات ولوحات المعلومات وتقارير التبرعات إلا الحالة `complete` أو null)، و`transactionId` |
| `fundDonations` | توزيع التبرع على صندوق واحد أو أكثر (`donationId`، و`fundId`، و`amount`) |
| `subscriptions` | تبرع متكرر؛ و`id` هو معرّف الاشتراك لدى البوابة، ومرتبط بـ `personId` و`customerId` و`gatewayId` |
| `subscriptionFunds` | توزيع الصناديق للتبرع المتكرر |
| `customers` | يربط `personId` بمعرّف العميل لدى البوابة، لكل `provider` |
| `gatewayPaymentMethods` | البطاقات والحسابات البنكية المحفوظة: `customerId`، و`externalId`، و`methodType`، و`displayName`، و`metadata` |
| `eventLogs` | سجل تدقيق الأحداث وإشعارات webhook، ومفتاح منع التكرار (`provider`، و`providerId`، و`eventType`، و`status`، و`resolved`) |
| `campaigns` / `pledges` | حملات التعهدات المرتبطة بصندوق، ومبلغ التعهد لكل شخص |

يُوزَّع التبرع على الصناديق عبر `fundDonations`: يحمل التبرع المجموع الكلي، ويحمل كل `fundDonation` جزءًا منه. ويحمل `donations.currency` و`gateways.currency` رمز العملة وفق ISO. ويعلن كل مزود عن `supportedCurrencies` الخاصة به، وتُنسّق المبالغ باستخدام `CurrencyHelper.formatCurrencyWithLocale`.

## التدفقات من البداية إلى النهاية

### تبرع الأعضاء لمرة واحدة ومتكرر (B1App)

تُركّب شاشة التبرع للأعضاء المسجلين (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) ثلاثة مكونات من apphelper: `MultiGatewayDonationForm` و`PaymentMethods` و`RecurringDonations`. تتولى B1App تحميل البيانات المحيطة، مثل `GET /donations/my` و`/gateways` و`/paymentmethods/personid/:id` و`/customers/:id/subscriptions`، ثم تمرر قائمة البوابات. أما المزود المحدد فيحمّل SDK الخاص به من المفتاح العام للبوابة. وتحدث عملية الخصم نفسها داخل apphelper: يُحوّل المزود المحدد الوسيلة (الجديدة أو المحفوظة) إلى رمز، ثم يرسل الطلب إلى `/giving/donate/charge` في حالة الهدية لمرة واحدة، أو إلى `/giving/donate/subscribe` في حالة التبرع المتكرر. وينسب كلا النقطتين المتبرعَ المسجَّل الدخول إلى `personId` الخاص به (ولا يحق لغير حاملي صلاحية `donations.edit` نسبة التبرع إلى شخص آخر)، ويرفضان توزيعات الصناديق التي يتجاوز مجموعها المبلغ المخصوم. وتنشئ التبرعات المتكررة صف `subscriptions` مع `subscriptionFunds`، وتُسلّم الجدول الزمني إلى البوابة (Stripe Subscriptions أو PayPal Billing Plans أو جدول متكرر في KF).

### تبرع الضيوف والمجهولين

تعرض صفحة التبرع العامة (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) ولوحة "تبرّع الآن" المكوّن `NonAuthDonationWrapper` من `@churchapps/apphelper/website`، الذي يحقن reCAPTCHA وسياق Elements الخاص بالبوابة حول `GuestForm` الخاص بالمزود. ولا يحصل الضيوف على تسجيل دخول أو وسائل دفع محفوظة أو سجل. ويجلب التدفق `GET /giving/funds/churchId/:id` و`GET /giving/donate/gateways/:churchId` (المفاتيح العامة فقط)، ويتحقق من الزائر عبر `POST /giving/donate/captcha-verify`، ويحوّل البيانات إلى رمز داخل المتصفح، ثم يرسل الطلب إلى `/giving/donate/charge` (أو `/subscribe`). ويعيد طلب التحقق `captchaPass` موقَّعًا بـ HMAC صالحًا لمدة 10 دقائق (`Api/src/modules/giving/helpers/CaptchaPass.ts`)، ويرسله النموذج مع كل طلب مالي يصدر عن الضيف. وعند ضبط `CAPTCHA_ENFORCE=true` ترفض الواجهة البرمجية طلبات الضيوف `create-order` و`charge` و`subscribe` و`addcard` و`ach-setup-intent-anon` التي لا تحمل `captchaPass` صالحًا لتلك الكنيسة. وتتحقق تسجيلات الفعاليات المدفوعة للضيوف (`POST /content/registrations/register`) من التصريح نفسه قبل الخصم مباشرة؛ انظر [تسجيلات الفعاليات](./registrations.md#payment-flow). ويستخدم ACH للضيوف النقطة المجهولة `POST /giving/paymentmethods/ach-setup-intent-anon`، التي تسمح بالتحقق الفوري (Financial Connections) فقط، لأن التحقق عبر الإيداعات الصغيرة يستغرق أيامًا بعد أن تكون صفحة الضيف قد أُغلقت، فلا يمكن أن يكتمل التبرع أبدًا. ويرفض النموذج الخصم على SetupIntent غير مُتحقَّق منه، ويوجّه المتبرع إلى البطاقة أو إلى إعداد حساب بنكي بعد تسجيل الدخول.

وتعتمد ثلاثة خيارات في نموذج الضيوف على استدعاء الخصم نفسه. يُحدد `?fundId=` و`?amount=` في رابط التبرع توزيع الصناديق مسبقًا (ويقرؤه `GuestForm` لكل مزود عند التحميل، ويمرره عبر معالج تغيير الصناديق المعتاد فتُحدَّث الإجماليات والرسوم). ويجعل `anonymous: true` المتحكم `DonateController.charge` يتجاهل أي شخص أرسله العميل، ويسجل التبرع بقيمة `personId = null`؛ ويتخطى نموذج الضيوف الاستدعاء `/people/loadOrCreate` وخطوة العميل/الخزنة، كما تتوقف المزودات الثلاثة ذات التسجيل الفوري عن استنتاج الشخص من عميل البوابة. ويحتاج Apple Pay إلى تسجيل نطاق الصفحة لدى Stripe، لذلك يرسل نموذج الضيوف في Stripe طلبًا واحدًا لكل جلسة إلى `POST /giving/donate/register-domain` العام والمحدود بمعدل، ولا يقبل إلا نطاقًا ينتمي إلى الكنيسة (`<subDomain>.b1.church`، أو صفًا في جدول النطاقات الخاص بوحدة المحتوى، أو مضيفًا محليًا)، ثم يستدعي واجهة Stripe لنطاقات طرق الدفع (payment-method-domains).

### التسجيل من المشرف واستيراد Stripe (B1Admin)

يُعد قسم التبرعات في B1Admin (`B1Admin/src/donations/`) المكان الذي يعمل فيه فريق المالية. ويسجّل الإدخال الجماعي (`components/BulkDonationEntry.tsx`) الهدايا النقدية أو الشيكات أو العينية بإرسال `/giving/donations` ثم `/giving/funddonations`، دون أي تدخل من البوابة. أما ورقة **تسجيل هدية** في سجل الشخص (`components/LogGiftDialog.tsx`) فتفعل الأمر نفسه لهدية واحدة، إذ تبحث أولًا عن الدفعة التي يطابق `batchDate` الخاص بها تاريخ الهدية، أو تُنشئ دفعة تحمل اسم ذلك التاريخ (`POST /giving/donationbatches`)، وتحذف التبرع أو الدفعة الجديدة إذا فشلت خطوة لاحقة. وتتوافق الصناديق والدفعات والحملات والكشوفات مع مسارات CRUD الخاصة بـ `/giving/*`. وتطلب صفحات كشوفات العطاء (`BatchGivingStatementsPage` و`PrintAllStatementsPage`) سنةً تقويمية واحدة عبر `GET /donations?startDate=&endDate=` و`GET /fundDonations?startDate=&endDate=` بدلًا من تحميل السجل الكامل للكنيسة، لأن ذلك قد يتجاوز حد حجم الاستجابة في Lambda. أما لوحة التبرع من نوع الأعضاء (`B1Admin/src/donationComponents/`) فتعيد استخدام مكونات apphelper نفسها المستخدمة في B1App.

وعمليات التقارير والمحاسبة تجري على جانب العميل أو في مشغّل التقارير، لا في البوابة. فتصدير QuickBooks من صفحة الدفعة يبني ملف CSV لقيد يومية من `donations` و`fundDonations` الخاصة بالدفعة (مدين: Undeposited Funds، ودائن واحد لكل صندوق). ويشغّل عرض "المتبرعون المنقطعون" في صفحة الملخص الملف `Api/reports/lapsedGivers.json` عبر مشغّل التقارير العام، مع حل أسماء الأشخاص بواسطة `ReportOutput`. وتُعد تنسيقات الإيصالات الخاصة بالدول (كندا وأستراليا ونيوزيلندا) إعدادات للكنيسة في مخزن المفاتيح والقيم الخاص بالعضوية، ويُعرضها `GivingStatementDocument` وتتكرر في صفحة الطباعة في B1App. وتمرر صفحات طباعة كشوفات B1Admin (`PrintDonationPage` و`PrintAllStatementsPage`) إعداد الكنيسة `logoLight` (عبر `usePrintLogo` في `B1Admin/src/components/PrintChurchHeader.tsx`) لتظهر الشعار في أعلى كل كشف، وتنتظر تحميل الصورة قبل الطباعة التلقائية.

### حالة الدفعة وصلاحية إدخال التبرعات

يمكن إغلاق الدفعات حتى تبقى الودائع التي جرى عدّها كما هي. وتُعد `POST /giving/donationbatches/:id/close` و`/:id/reopen` (لحاملي Donations.Edit فقط) الجهتين الوحيدتين اللتين تكتبان `status` و`closedDate` و`closedBy` (عبر `DonationBatchRepo.setStatus`)؛ فحفظ الدفعة العادي لا يمسها أبدًا، لذلك لا يمكن لترحيل الدفعة أن يعيد فتحها. وتتركز صلاحية الكتابة في `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: يستطيع Donations.Edit تغيير أي شيء، بينما تسمح الصلاحية الأضيق Donations.Enter (`GivingApi` / `Donations` / `Enter`، وتظهر باسم "Enter Donations" في محرر الأدوار) بإنشاء الدفعات وحفظ التبرعات وتوزيعات الصناديق وحذفها فقط، بشرط أن تكون الدفعة الحالية للتبرع والدفعة المستهدفة مفتوحتين معًا، ولا تُسمح بذلك أبدًا لهدية من البوابة (أي تبرع له `transactionId`). ويعيد الكتابة المحجوبة الاستجابة `403 { error: "This batch is closed." }`. وتقبل قراءة الدفعات الصلاحية Donations.ViewSummary أو Donations.Enter، حتى يتمكن الموظف من اختيار الدفعة التي يُدخل فيها التبرعات. وعلى جانب العميل، تعكس `B1Admin/src/donations/batchAccess.ts` هذه القواعد (`canSeeBatches` و`canEnterDonations` و`canChangeBatch`)، ويُظهر `Header` / `SecondaryMenuHelper` الخيار **Donations > Batches** لكل من يستطيع رؤية الدفعات، حتى دون صلاحية View Summary.

### تحويل الإجماليات متعددة العملات

تُحوّل أي نقطة نهاية تُرجع إجمالًا واحدًا لتبرعات قد تكون بعملات مختلفة، مثل مؤشرات ملخص العطاء (`GivingKpiCards`)، وإجمالي الدفعة، وإجمالي الصندوق، وإجماليات السنة حتى تاريخه/الفترة في شاشة التبرع في B1App، العملةَ الافتراضية للكنيسة على الخادم، بدلًا من جمع عملات مختلفة معًا. ويجلب `Api/src/shared/helpers/ExchangeRateHelper.ts` أسعار الصرف من `api.frankfurter.dev` بحسب عملة الكنيسة، ويخزنها مؤقتًا داخل العملية لمدة 12 ساعة، ويعرض `convertTotals(rows, churchCurrency, rates)`. وتُجمَّع الصفوف مسبقًا حسب العملة في SQL (عدد قليل من المجموعات، لا تحويل لكل هدية)، ثم تُحوَّل كل مجموعة وتُجمع، وتحمل النتيجة علامة `isConverted` التي يستخدمها العميل لعرض ملاحظة "مُحوَّل بأسعار الصرف الحالية". ويعرض `GET /donations/exchange-rates` جدول الأسعار للعملاء الذين يحتاجونه (شاشة التبرع في B1App)، ولا تُقبل الأسعار نفسها من أي طلب، بل تُجلب من الخادم وحده، حتى لا يتمكن العميل من التأثير في أي إجمالي يُعرض. أما سجلات التبرع الفردية والتقارير بالعملة الأصلية أو التاريخية فلا تُحوَّل أبدًا، ولا يُحوَّل إلا الإجماليات المجمّعة.

ويعيد استيراد Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) تعبئة الهدايا التي جرت خارج B1: إذ يستدعي `POST /giving/donate/replay-stripe-events` مع `dryRun: true` للمعاينة، ثم مع `dryRun: false` للاستيراد. ويعرض الخادم أحداث Stripe ضمن نطاق التاريخ، ويتخطى كل ما هو مسجَّل سلفًا، إذ يُطابَق أولًا بمعرّف المزود في `eventLogs`، ثم بمعرّف المعاملة، ثم بـ `DonationRepo.findMatchingDonation` (المبلغ والتاريخ والشخص)، حتى لا يُستورد التبرع مرتين عند إعادة التشغيل. وتُتخطى أحداث `charge.succeeded` / `payment_intent.succeeded` للاشتراكات لأن `invoice.paid` يسجّل هذه الهدايا، ولأن إصدارات Stripe الأحدث تُسقط `PaymentIntent.invoice`، فإن التخطي يعتمد أيضًا على الوصف الذي يبدأ بـ "Subscription …".

## إشعارات Webhook والمطابقة

تصل المدفوعات المسوّاة وتغييرات حالة الاشتراك إلى `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). وتُصمَّم المعالجة عمدًا لتكون محصّنة ضد التكرار (idempotent):

1. **التحقق**: يفوّض `GatewayService.verifyWebhook` الأمر إلى فحص التوقيع الخاص بالمزود، فإذا فشل التوقيع يعيد الرد 401. أما الأحداث التي لا تحتاج معالجة فتُنهى مبكرًا برد 200.
2. **منع تكرار الحدث**: يتخطى `EventLogRepo.loadByProviderId` إشعار webhook المسجَّل مسبقًا في `eventLogs`.
3. **منع تكرار التبرع**: قبل إنشاء أي شيء، يُفحص `DonationRepo.loadByTransactionId` مقابل كل معرّف مرشح قد تحمله البيانات. وهذا يستوعب عمليات التسليم المكررة، وأحداث ACH متعددة المراحل (معلّق ← مُسوّى)، والحالة التي سجّل فيها `/donate/charge` الهدية بشكل تفاؤلي.
4. **التطبيق**: يحدد `classifyWebhookEvent(eventType)` الخاص بالمزود معنى الحدث (`donation` معلّق أو مكتمل، أو `cancel-subscription`، أو `ignore`). وتُنشئ المدفوعات المكتملة تبرعًا بحالة `complete` (أو تُرقّي تبرعًا موجودًا بحالة `pending` أو `failed`)، وتُسجَّل أحداث نمط ACH كـ `pending` حتى التسوية، وتُنشئ فاتورة الاشتراك الفاشلة (`invoice.payment_failed` في Stripe) تبرعًا بحالة `failed` مرتبطًا بمعرّف الفاتورة، وتحذف أحداث الإلغاء الصف المحلي في `subscriptions`. ولا يفحص المتحكم أبدًا أسماء الأحداث الخاصة بأي مزود.

### الهدايا المتكررة الفاشلة والمتابعة

يمثّل التبرع الذي حالته `failed` وحدة العمل في الاسترداد. ويعرض `GET /giving/donations/failed` هذه التبرعات مع أحدث رسالة فشل من البوابة في `eventLogs` وعلامة `canRetry` المستمدة من قدرات البوابة. ويستدعي `POST /giving/donate/retry/:donationId` الدالة `retryFailedPayment` الخاصة بالمزود (فتسدد Stripe الفاتورة المفتوحة)، ويرقّي إشعار webhook الناتج الصف إلى `complete` عبر مسار منع التكرار المعتاد. أما رسائل المتابعة (dunning) فتُرسل إلى المتبرع من معالج webhook في اليوم صفر، ثم من `DunningHelper.run` في المؤقت الذي يعمل عند منتصف الليل (والمربوط في `lambda/timer-handler.ts` و`RailwayCron.ts`) في اليومين 3 و7؛ ويُسجَّل كل إرسال في `eventLogs` بالقيمة `provider: "dunning"` و`providerId: "<donationId>:<day>"`، فلا يُرسَل البريد مرتين عند إعادة التشغيل. وعندما تتخلى Stripe عن المحاولة وتلغي الاشتراك (`customer.subscription.deleted` مع `cancellation_details.reason: "payment_failed"`)، يرسل `DunningHelper.notifyCanceled` بريدًا واحدًا إلى المتبرع (`providerId: "<subscriptionId>:canceled"`)، أما الإلغاءات التي يبدؤها المتبرع أو المشرف فتمر بصمت. ولا تضيف Stripe أحداثًا إلى نقطة نهاية موجودة أبدًا، لذلك بعد تغيير `StripeHelper.webhookEvents` أعد حفظ البوابة، أو شغّل `tools/manual/stripe-webhook-events.ts` (تشغيل تجريبي افتراضيًا، و`--apply` للكتابة) على بيئة الإنتاج.

وتُسجَّل الرسوم للمزودين الذين لديهم `logsDonationsImmediately` (PayPal وKingdom Funding وPaystack) من استجابة `/charge` مباشرةً (دون الحاجة إلى دورة webhook في المسار السعيد)، بينما تعتمد Stripe على `payment_intent.succeeded` و`invoice.paid`، وعلى `payment_intent.processing` في ACH. ويحسب التعامل مع الرسوم (`POST /giving/donate/fee`، وعلامة `payFees` في البوابة، و`calculateFees` لكل مزود) زيادة "تغطية الرسوم" على جانب المتبرع، فلا تأخذ B1 أي حصة من المنصة، ولا تُضاف أي رسوم تطبيق على الإطلاق.

:::info
يكتب مساران، هما الخصم وwebhook، الصفوف نفسها في `donations` و`fundDonations`. ويُعد `transactionId` مفتاح الربط الذي يمنع أن ينتج عن سجل الخصم التفاؤلي وإشعار webhook اللاحق تبرعان لهدية واحدة.
:::

## صفحات ذات صلة

- [نقاط نهاية التبرعات](../api/endpoints/giving.md): واجهة REST الكاملة للتبرعات والصناديق والدفعات والبوابات والاشتراكات ووسائل الدفع وwebhook
- [AppHelper](../shared-libraries/app-helper.md): حزمة npm التي تحمل سجل مزودي الدفع ومكونات التبرع
- [هيكلية الوحدات](../api/module-structure.md): كيفية تنظيم وحدة GivingApi في الخادم
