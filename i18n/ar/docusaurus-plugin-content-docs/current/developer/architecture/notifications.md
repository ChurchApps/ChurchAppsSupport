---
title: "بنية الإشعارات والتذكيرات"
---

# بنية الإشعارات والتذكيرات

<div class="article-intro">

كل رسالة يراها أحد أفراد الكنيسة خارج الصفحة التي ينظر إليها — عداد شارة، أو إشعار دفع، أو ملخص بريد إلكتروني — تمر عبر أحد بابين في MessagingApi. توثّق هذه الصفحة هذا المسار، ومحرك التذكيرات الذي يغذيه وفق جدول زمني، ونموذج التفضيلات الذي يحدد ما يصل فعلاً إلى الشخص.

</div>

## نظرة عامة — بابان

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **أي شيء يُخبر شخصاً بأمر ما** يمر عبر `NotificationHelper.createNotifications()` في وحدة المراسلة. يحفظ صفاً في جدول `notifications` ويصعّد الإشعار من socket إلى push ثم إلى البريد الإلكتروني، مع تقييم `PreferenceGateHelper` لكل قناة — بما في ذلك `in_app` عند المستوى 0.
2. **أي شيء مجدول** يكون `reminderDefinition` (على مستوى الكيان أو على مستوى النطاق)، ويُوسَّع إلى `reminderOccurrences`، ويُرسَل بواسطة `ReminderEngine.scan()` على مؤقت متكرر. موسِّع واحد، وموزِّع واحد، وسجل إرسال واحد (`reminderSentLog`).
3. **البريد الإلكتروني المباشر** موجود فقط خلف `TransactionalEmailHelper.sendTransactional()`. تفرض قاعدة ESLint ذلك وقت الترجمة — انظر أدناه.

:::tip قاعدة ESLint تفرض باب البريد الإلكتروني، ولا تعتمد على الاتفاق فقط
يعرّف `Api/tools/eslint-rules/email-door.cjs` القاعدة `no-direct-email-helper`: أي استدعاء لـ `EmailHelper.sendTemplatedEmail()` أو `EmailHelper.sendEmail()` خارج الملفين `NotificationHelper.ts` أو `TransactionalEmailHelper.ts` يُفشل الفحص. إذا كنت بحاجة إلى إرسال بريد إلكتروني، فوجّهه عبر المسار الرئيسي (`createNotifications` مع `emailImmediate`) أو عبر `TransactionalEmailHelper.sendTransactional()` — لا توجد طريقة ثالثة تجتاز CI.
:::

## مسار الإشعارات

`NotificationHelper.createNotifications()` هي نقطة الدخول الوحيدة لأي شيء ليس مجدولاً ولا معاملاتياً:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

لكل مستلم يحفظ صفاً في `notifications` ويستدعي `attemptDeliveryWithEscalation`، الذي يمر عبر سلم القنوات أدناه. يمنع صفٌّ لم يُقرأ بعد للزوج نفسه `(contentType, contentId)` إنشاءَ إشعار مكرر. يُتجاوَز فحص منع التكرار هذا في حالة الإرسال بـ `emailImmediate` (تذكيرات الإزاحة، و"إرسال بريد إلى الجميع" من الموظفين، وخطوات سير العمل التي تدير منع التكرار الخاص بها)، وفي الرسائل المباشرة التي ترسل دائماً تنبيه socket.

يحاكي الملف `shared/helpers/NotificationService.ts` التوقيع نفسه (`NotificationServiceOptions`) للمستدعين خارج وحدة المراسلة، ويُسجَّل لدى وحدة المراسلة عند بدء التشغيل.

## سلسلة تصعيد القنوات

يبدأ التسليم عند مستوى ما (0 افتراضياً، أو أعلى للتذكيرات أو الإرسال الصريح)، ولا ينتقل إلى القناة التالية إلا إذا لم تنجح السابقة. يُفلتر كل مستوى عبر `PreferenceGateHelper` قبل أي محاولة.

| المستوى | القناة | السلوك |
|-------|---------|----------|
| 0 | **in_app / socket** | يُفحص أولاً قيد `in_app`. إذا كان الإشعار مكتوماً، يُحفظ الصف بـ `isNew=false` ويتوقف التسليم تماماً — لا تنبيه socket، ولا شارة، ولا تصعيد لاحق. وإلا يبحث الخادم عن اتصالات socket مفتوحة لغرفة `alerts` الخاصة بالشخص، ويرسل إطار `notification` (أو `privateMessage`). بالنسبة للإشعارات العادية، يوقف التسليم الناجح عبر socket السلسلة هنا — ويعيد مؤقت الثلاثين دقيقة فحص العناصر غير المقروءة ويصعّدها لاحقاً. الرسائل المباشرة لا تتوقف عند socket أبداً: قد يُبقي تطبيق PWA مثبتاً اتصال socket الخاص بالتنبيهات مفتوحاً في الخلفية، وهذا من شأنه أن يمنع إشعار الدفع على مستوى نظام التشغيل. |
| 1 | **push** | مشروط بـ `allowPush` أو بانسحاب الفئة أو بساعات الهدوء. يُرسل إلى رموز Expo Push وإلى اشتراكات Web Push الموجودة في صفوف `devices` الخاصة بالشخص، مع إزالة التكرار حسب نقطة النهاية وحذف الرموز القديمة أثناء ذلك. |
| 2 | **email** | مشروط بـ `emailFrequency` وبانسحاب الفئة. تُعرض الإرساليات الفورية (`emailImmediate`) مباشرة وتكتب صفاً في `deliveryLogs`؛ وإلا يبقى الإشعار معلقاً لملخص الدفعة الموضح أدناه. |
| — | **sms** | ليس مستوى في سلسلة التصعيد. المنتج الوحيد المشروط للرسائل النصية هو محرك التذكيرات: عندما تتضمن `channels` للتعريف القيمة `sms`، يرسل `ReminderEngine.sendSms()` رسالة نصية إلى كل مستلم **إضافةً إلى** إشعار push/email (انظر [التذكيرات النصية](#text-reminders)). أما الرسائل النصية الجماعية (`TextingController` / `@churchapps/texting`)، وإرسال **Text Volunteers** من نظرة الخدمة العامة (`MatrixTextHelper` ← `MessagingModuleGateway.sendPersonText`)، وإجراء **Send Text** في خطوة سير العمل (`StepActionHelper.sendText` ← `sendPersonText`)، فكلها ترسل نصوصاً مباشرة عبر مزوّد الكنيسة، لذا لا تنطبق عليها تفضيلات الإشعارات ولا ساعات الهدوء — ويُحترم فقط علم `optedOut` الخاص بالشخص. |

تُصعَّد الإشعارات غير المقروءة العالقة عند socket أو push عبر مؤقت الثلاثين دقيقة (`NotificationHelper.escalateDelivery`). يُرسل البريد الإلكتروني المجمّع بواسطة `NotificationHelper.sendEmailNotifications(frequency)`، ويقوده تفضيل `emailFrequency` لكل شخص: يعمل `individual` على مؤقت الثلاثين دقيقة، ويعمل `daily` على المؤقت الليلي. (`weekly` قيمة تفضيل صالحة لكنها لا تملك تشغيلاً مجمّعاً مخصصاً حتى الآن.)

## محرك التذكيرات

التذكيرات المجدولة — تذكيرات الفعاليات، وتواريخ استحقاق المهام، وتذكيرات الخدمة وتعيينات الخطط — تمر جميعها عبر محرك واحد عام بدلاً من منطق cron خاص بكل ميزة.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**التعريفات** (`reminderDefinitions`) إما على مستوى الكيان (`entityId` مضبوط — فعالية أو مهمة أو خطة محددة)، أو على مستوى النطاق (`entityId` فارغ، و`scopeId` مضبوط — مثلاً كل خطة تحت نوع خطة خدمة). يحمل التعريف قائمة مفصولة بفواصل من إزاحات الدقائق (`offsets`، مثل `"1440,60"` لقبل يوم وقبل ساعة)، ووقت إرسال محلياً (`sendLocalTime`)، وقائمة قنوات مفصولة بفواصل (`channels` — إذ يؤدي `email` إلى إرسال بريد إلكتروني غني فورياً عند وقت الإرسال)، و`recipientMode`، ورسالة مخصصة اختيارية (`message`).

**التوسيع** يُنشئ صفوف التنفيذ للأفق القادم (نافذة متدحرجة من عدة أيام). يعمل على المؤقت الليلي، وبشكل متزامن كلما حُفظ تعريف، حتى يُطلق تذكير فعالية في اللحظة الأخيرة. تتوسع تعريفات النطاق عبر `loadScopeEntities` الخاص بالمحوِّل، فتُنتج مجموعة إرساليات لكل كيان فعلي؛ وتستخدم إرساليات مستوى الكيان المفتاح `definitionId:occurrenceISO:offset`، بينما تُضاف للإرساليات المقيّدة بالنطاق معرّفات الكيانات حتى لا تتصادم أبداً. إدراج إرسالية يُعيد **إحياء** صف أُلغي سابقاً — وإلغاء ثم إعادة التوسيع هو الأسلوب المعتاد لمزامنة تذكير بعد تغيّر الكيان الأساسي؛ أما الصفوف التي حالتها `sent` أو `failed` أو `processing` فتُترك دون تغيير.

**التوزيع** (`ReminderEngine.scan()`) يعمل على مؤقت الثلاثين دقيقة. يحجز الإرساليات المستحقة (يمنع عقد الإيجار المزدوج المعالجة)، ويحمّل المستلمين عبر محوِّل الكيان، ويستبعد أي شخص مسجّل بالفعل في `reminderSentLog` لتلك الإرسالية، ثم يستدعي `createNotifications` مع `deliveryStartLevel: 1` (التخطي مباشرة إلى push) إضافةً إلى `emailImmediate`/`emailByPerson` عندما تتضمن قنوات التعريف البريد الإلكتروني.

### التذكيرات النصية

عندما تتضمن `channels` للتعريف القيمة `sms`، يستدعي `scan()` الدالة `ReminderEngine.sendSms()` بعد إنشاء إشعارات push/email، للمستلمين الجدد أنفسهم. الإرسال النصي اختياري لكل عضو:

- يمر كل مستلم عبر `PreferenceGateHelper.evaluate(..., "sms", ...)`، لذا يجب أن يكون `allowSms` مفعّلاً (وهو معطّل افتراضياً ويُضبط من مفتاح **Text messages** في B1App)، ولا يجوز أن تكون قناة `sms` للفئة مُعطّلة بالتجاوز. تُدرج `event_reminders` و`serving_schedule` و`tasks` القيمة `sms` في كل من `defaultChannels` و`allowedChannels`.
- يُستبعد الأشخاص الذين ليس لديهم `mobilePhone` أو الذين ضُبط عليهم `optedOut`. إذا لم يكن لدى الكنيسة مزوّد رسائل نصية، تُستبعد بقية الدفعة بالسبب `no_provider`.
- يُبنى المحتوى بواسطة `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`، ويُقتطع إلى جزء واحد بطول 160 حرفاً.
- يحصل كل مستلم على صف `reminderSentLog` خاص به بالقيمة `channel: "sms"` وحالة `sent` أو `suppressed` أو `failed`، ومفتاحه منفصل عن صف push/email، بحيث لا تؤدي رسالة نصية فاشلة إلى إعادة إرسال push أو البريد الإلكتروني.

لا يعرض المحررون خيار **Text** إلا عندما يُرجع `GET /messaging/texting/status` القيمة `{ enabled: true }` (أي أن أول مزوّد رسائل نصية للكنيسة مفعّل).

**إلغاء الاشتراك بكلمة STOP.** إن `POST /messaging/texting/inbound/:churchId/:token` هو webhook مجهول تلصقه الكنيسة في مزوّدها (تعرض B1Admin العنوان من `GET /messaging/texting/inboundUrl` في إعدادات الرسائل النصية). الرمز المميز هو HMAC لمعرّف الكنيسة (`SmsOptOutHelper.token`). تقبل `SmsOptOutHelper.parse` حقول النماذج بأسلوب Twilio وJSON بأسلوب Clearstream/TextInChurch. إذا كان الرد كلمة إيقاف قياسية للناقل بالضبط (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`)، فإن كل شخص غير محذوف في الكنيسة يطابق رقم جواله يحصل على `people.optedOut = true` و`allowSms = false`. أما الردود الأخرى فتُقرّ استلامها وتُتجاهل.

يتفاعل ناقل أحداث داخلي مع تعديلات الكيانات دون انتظار التوسيع الليلي: تُحدث أحداث المحتوى (عبر موزِّع الـ webhook) وأحداث تحديث الخطط والمهام إعادة توسيع أو إلغاء فوري للكيان المتأثر، ويؤدي تحديث الخطة أيضاً إلى إعادة توسيع تعريفات النطاق المرتبطة بنوع تلك الخطة.

### المحوِّلات

المحرك لا يعرف الكيانات؛ يتصل كل نوع كيان مدعوم عبر محوِّل (`helpers/adapters/`):

| نوع الكيان | المحوِّل | ملاحظات |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | المستلمون محصورون بالمسجلين أو بأعضاء المجموعة، بحسب الفعالية و`recipientMode`. |
| `plan` | `PlanReminderAdapter` | المستلمون هم التعيينات المقبولة وغير المؤكدة في الخطط المنشورة (غير المسودات). تُستثنى التعيينات غير المؤكدة الصادرة عبر سير عمل تأكيد الخدمة حتى تُقبل (انظر أدناه). تستدعي `buildEmails` الدالة `DoingModuleGateway.buildPlanReminderEmails`، التي تعرض المواقع والملاحظات ورسالة مخصصة عبر `doing/helpers/PlanReminderEmailHelper`، بما في ذلك أزرار القبول والرفض الموقّعة بواسطة `ReminderTokenHelper` التي ترسل إلى نقطة نهاية عامة للرد على التعيين. |
| `task` | `TaskReminderAdapter` | المستلمون هم المكلَّفون بالمهمة. |

### نقاط النهاية

| الطريقة | المسار | الغرض |
|--------|--------|--------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | تحميل أو حفظ تعريف التذكير لكيان واحد. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | تحميل أو حفظ تعريف تذكير على مستوى النطاق (موروث). |
| `DELETE` | `/messaging/reminders/:defId` | حذف تعريف وإلغاء إرسالياته المعلقة. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | معاينة عدد المستلمين وأوقات التنفيذ التالية لتذكير فعالية قبل الحفظ. |
| `GET` | `/messaging/reminders/log` | سجل إرساليات التذكيرات الأخيرة لكنيسة. |
| `POST` | `/messaging/reminders/mute` | كتم التذكيرات لكيان محدد. |

يؤدي حفظ التعريف إلى إعادة توسيع متزامنة للكيان أو النطاق، فيرى المحررون أوقات "التنفيذ التالي" محدّثة دون انتظار المهمة الليلية.

## الرسائل المباشرة

تسلك الرسائل المباشرة المسار نفسه الذي تسلكه كل الأشياء الأخرى بدلاً من مسار تصعيد منفصل. تحصل كل محادثة غير مقروءة على **صف ظلّي** واحد في `notifications` (`contentType='privateMessage'`، و`contentId` = معرّف الرسالة الخاصة، و`category='direct_messages'`) يملك كامل حالة التسليم — تصعيد socket/push/email، وتتبع القراءة، وكل شيء. يحتفظ جدول `privateMessages` نفسه بمحتوى الرسالة وبعمود `notifyPersonId`، وهو مصدر شارة غير المقروء، ويُمسح عندما يقرأ المستلم المحادثة.

الصفوف الظلّية غير مرئية لجرس الإشعارات: فهي مستبعدة من استعلام عدد غير المقروء، ومن استعلام قائمة الإشعارات، ومن استعلامات وضع علامة "مقروء" والحذف، وكلها تصفّي بـ `contentType <> 'privateMessage'`. كل تنبيه للرسالة المباشرة يصل إلى socket بغض النظر عن حالة القراءة (دلالات الدردشة الحية — دون منع تكرار)، ولا تتوقف الرسائل المباشرة عند تسليم socket كما تفعل الإشعارات العادية، لأن تطبيق PWA في الخلفية قد يُبقي socket مفتوحاً بينما يحتاج مع ذلك إلى إشعار دفع على مستوى نظام التشغيل. إذا كتم الشخص إشعارات الرسائل المباشرة، يُوقف الصف الظلّي (`isNew=false`، ويُمسح `notifyPersonId`) — فيظل مرئياً داخل المحادثة نفسها، لكن دون شارات أو تنبيهات.

## التفضيلات والتحكم

كل إرسال يمر عبر `PreferenceGateHelper.evaluate()`، وهي دالة نقية (تُمرَّر كل الحالة كمدخلات، ولا استدعاءات لقاعدة البيانات في المسار الساخن)، وتعيد `allow` أو `suppress` أو `defer`. تعمل الطبقات بالترتيب، والطبقة الأولى التي تحسم الأمر تفوز:

1. **فئة مقفلة** — بعض الفئات إلزامية (المستوى 0) وتتجاوز كل الطبقات الأخرى.
2. **الكتم الرئيسي / إيقاف القناة** — `masterMute` و`allowPush` و`allowSms` (معطّل افتراضياً — يشترك الأعضاء فيه بأنفسهم) أو `emailFrequency='never'` تحجب الإرسال مباشرة.
3. **ساعات الهدوء** — للدفع والرسائل النصية فقط (يُعدّ البريد الإلكتروني غير مزعج). إذا وقع الوقت الحالي بتوقيت الحائط في منطقة الشخص الزمنية ضمن نافذة هدوئه، تمر الفئة المعاملاتية؛ أما غير المعاملاتية فتُؤجَّل إلى نهاية نافذة الهدوء، محسوبةً كلحظة UTC صحيحة وفق التوقيت الصيفي عبر `TimezoneHelper.wallClockToUtc`.
4. **تجاوز تفضيل الفئة** — انسحاب صريح لزوج فئة × قناة واحد؛ وغيابه يعني القيمة الافتراضية للفئة.
5. **كتم الكيان** — كتم مسجّل على كيان محدد (مثل فعالية واحدة، أو خطة واحدة) يقيّد أكثر من إعداد مستوى الفئة، لكنه ينطبق فقط عندما يوفّر المستدعي معرّف الكيان/نوعه مع الإشعار.

الجداول المعنية: `notificationPreferences` (عامة — `masterMute`، و`emailFrequency` بقيم `individual|daily|weekly|never`، و`allowPush`، ونافذة ساعات الهدوء مع المنطقة الزمنية، و`allowSms`)، و`notificationPreferenceOverrides` (لكل فئة × قناة)، و`notificationEntityMutes` (لكل كيان).

يُفرض هذا القيد على الإشعار داخل التطبيق (المستوى 0)، والدفع (المستوى 1)، والبريد الإلكتروني (المستوى 2) داخل المسار — بما في ذلك رسائل التذكير والملخص الفورية — وعلى التذكيرات النصية في `ReminderEngine.sendSms()`. أما البريد الإلكتروني المعاملاتي (رموز المصادقة، وإعادة تعيين كلمات المرور، والدعوات، وإيصالات التبرع) فيتجاوزه عن قصد؛ وهذا هو جوهر الباب الثاني.

### سير عمل تأكيد الخدمة

يمكن للخطة أن تشترك في سير عمل `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). عندئذٍ ينادي النشر/الإشعار على `POST /doing/plans/:id/issueRequests` بدلاً من الإشعار الفردي لكل تعيين: يحصل كل تعيين جديد غير مؤكد على `notified` و`confirmationWorkflowId` وبطاقة سير عمل واحدة (`tasks.assignmentId`، و`followupKey` فريد). تُرسل البطاقة تنبيهاً للتطبيق فقط (`appOnly: true` — دون تصعيد عبر push/email)، ثم تُنفّذ إجراءات `sendAssignmentRequest` في سير العمل، وتمر عبر `MessagingModuleGateway.sendServingWorkflowMessage`: بريد إلكتروني عبر `NotificationHelper.sendWorkflowEmail` (بوابة التفضيلات مع `ChurchEmailLimiter`، ويُحتسب كـ `workflowEmail`)، ورسائل SMS عبر `sendPersonText` فقط عند تفعيل `allowSms` وبوابة فئة `serving_schedule`. يغلق القبول/الرفض (`assignment.updated` على ناقل الأحداث) البطاقة؛ ويصلح مؤقت الثلاثين دقيقة (`AssignmentWorkflowHelper.processPending`) البدايات والأحداث الفائتة، ويحوّل الطلب غير المُجاب عنه عند الموعد النهائي للمتابعة إلى مهمة مراجعة للقائد. دورة الحياة الكاملة في `Api/docs/assignment-confirmation-workflows.md`.

## حدود البريد الإلكتروني الذي تكتبه الكنيسة

يُرسَل البريد الذي تكتب الكنيسة محتواه من هوية SES المشتركة لـ ChurchApps، لذا يُقاس لكل كنيسة بواسطة `Api/src/shared/helpers/ChurchEmailLimiter.ts`. تستدعي أربعة مسارات هذه الدالة: إرسال المجموعات/القوالب (`EmailTemplateController`، ونوع المحتوى `email`)، ورسائل المتابعة للنماذج (`FormSubmissionController`، و`formFollowUp`)، وإجراءات **Send email** في سير العمل (`NotificationHelper` مع `churchAuthored`، و`workflowEmail`)، ورسائل طلب تأكيد الخدمة (`NotificationHelper.sendWorkflowEmail`، و`workflowEmail`). لا تُحتسب رسائل النظام (رموز المصادقة، والإيصالات، والتذكيرات)، ولا دعوات الأدوار والمجموعات (`UserController.sendInviteEmail`، وهو قالب ثابت).

- **بوابة الموافقة.** لا ترسل الكنيسة أي شيء حتى يضبط مسؤول الخادم `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`، من Server Admin ← Churches ← شريحة **Group Email**). الكنائس المؤرشفة محظورة دائماً. تقرأ نافذة Send Email في B1Admin القيمة `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`)، وعندما تكون الكنيسة غير معتمدة تعرض بطاقة **Request review** بدلاً من المحرر. يقرأ محرر خطوات سير العمل النقطة النهائية نفسها (وهي متاحة لـ `tasks.admin` بالإضافة إلى `groupMembers.edit`) لتحذير من إجراءات **Send email** عندما تكون الكنيسة غير معتمدة أو موقوفة. وعند الإرسال، يعيد `MessagingModuleGateway.sendTemplatedEmail` القيمة `false` دون إنشاء إشعار عندما يكون `ChurchEmailLimiter.remaining()` أقل من 1، حتى لا يدّعي سجل البطاقة **Email sent** لرسالة أُسقطت. تُرسل `POST /messaging/emailTemplates/requestApproval` بريداً إلى الدعم، مرة واحدة على الأكثر لكل كنيسة في الأسبوع.
- **حصة مكتسبة.** تحصل الكنيسة المعتمدة على `max(150, 2 × أفضل يوم لها من البريد الذي كتبته الكنيسة خلال الثلاثين يوماً السابقة)`، بحد أقصى 2,000 في أي 24 ساعة متدحرجة. تُستبعد الساعات الـ24 الحالية من حساب "أفضل يوم" حتى لا ترفع الدفعة حدها بنفسها.
- **الحجز ثم التسوية.** تكتب `reserve()` صف `deliveryLogs` واحداً لكل مستلم قبل الإرسال، وتعيد التحقق من الحصة مع احتساب تلك الصفوف، وتتراجع إذا تجاوز طلبان متزامنان الحد (يعيد الإرسال الرمز 429). تُعلّم `settle()` كل صف بأنه أُرسل أو فشل.
- **إيقاف الشكاوى.** تثبّت دالة Lambda ‏`sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`، وتتلقى البيانات من SES ← SNS) كل ارتداد دائم أو شكوى إلى الكنيسة التي وصل بريدها المكتوب من الكنيسة إلى ذلك العنوان في الوقت تقريباً، ويُخزَّن كـ `deliveryMethod` بالقيمة `sesBounce` أو `sesComplaint`. تُوقَف الكنيسة عند شكويين أو أكثر (≥ 0.3% من الإرساليات)، أو عند 10 ارتدادات صلبة أو أكثر (≥ 5%) خلال 7 أيام.

## الجدولة

يعمل محرك التذكيرات وملخص الإشعارات معاً على المؤقتات المجدولة القائمة بدلاً من إدخال بنية تحتية جديدة:

| المؤقت | الجدول | يشغّل |
|-------|----------|-------|
| مؤقت الثلاثين دقيقة | كل 30 دقيقة | تصعيد الإشعارات غير المقروءة؛ وإرسال ملخصات البريد بتكرار `individual`؛ وتوزيع إرساليات التذكير المستحقة (`ReminderEngine.scan`)؛ وملخصات الموافقات؛ وتنفيذات الأتمتة المستحقة |
| المؤقت الليلي | 05:00 UTC | تذكيرات حضور المجموعات؛ وتقديم خدمات البث المتكررة؛ وتحديث قوائم التحديث التلقائي؛ وتوسيع إرساليات التذكير للأفق التالي (`ReminderEngine.expandAll`)؛ وإرسال ملخصات البريد بتكرار `daily` |

محلياً، يمكن تشغيل المنطق نفسه عند الطلب باستخدام `npm run timer:30min` و`npm run timer:midnight` من مشروع `Api`.

## قائمة الملفات

| المجال | الملفات |
|------|-------|
| المسار | `Api/src/modules/messaging/helpers/NotificationHelper.ts`، و`PreferenceGateHelper.ts`، و`NotificationCategoryHelper.ts`، و`WebPushHelper.ts`، و`ExpoPushHelper.ts`، و`SocketHelper.ts`، و`DeliveryHelper.ts` |
| نقطة الدخول المشتركة | `Api/src/shared/helpers/NotificationService.ts` |
| باب المعاملات | `Api/src/shared/helpers/TransactionalEmailHelper.ts`، وقاعدة lint `Api/tools/eslint-rules/email-door.cjs` |
| حدود بريد الكنيسة | `Api/src/shared/helpers/ChurchEmailLimiter.ts`، و`Api/src/lambda/ses-feedback-handler.ts`، و`Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| محرك التذكيرات | `Api/src/modules/messaging/helpers/ReminderEngine.ts`، و`ReminderBootstrap.ts`، و`helpers/adapters/*`، و`controllers/ReminderController.ts` |
| الرسائل النصية / إلغاء الاشتراك بـ STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`، و`controllers/TextingController.ts` (`/status`، و`/inboundUrl`، و`/inbound/:churchId/:token`)، و`Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Text Volunteers** في نظرة الخدمة العامة) |
| مستودعات التذكيرات | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`، و`ReminderOccurrenceRepo.ts`، و`ReminderSentLogRepo.ts` |
| بريد الخدمة/الخطط | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`، و`ReminderTokenHelper.ts`، و`Api/src/shared/modules/DoingModuleGateway.ts` |
| محررات التذكيرات (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`، و`calendars/components/EventReminderEdit.tsx`، و`serving/tasks/components/TaskReminderEdit.tsx`، و`hooks/useTextingEnabled.ts` |
| محرر التذكيرات / التفضيلات (B1App) | `EventReminderEdit.tsx`، و`NotificationPrefsPage.tsx`، و`useRealtimeNotifications.ts` |

## الصفحات ذات الصلة

- [بنية الوقت الفعلي](../realtime) — بروتوكول WebSocket والعناصر الأساسية للعميل (`SocketHelper`، و`SubscriptionManager`، و`ConversationStore`) التي يعتمد عليها مستوى التسليم داخل التطبيق
- [إشعارات الويب Push](../web-push) — إعداد VAPID ومسار Push API في المتصفح المستخدم في مستوى تصعيد الدفع
- [نقاط نهاية المراسلة](../api/endpoints/messaging) — واجهة REST الكاملة للرسائل والمحادثات والاتصالات ومسارات الإشعارات والتذكيرات
