---
title: "تسجيل الوصول"
---

# تسجيل الوصول

<div class="article-intro">

تسجيل الوصول نظام واحد له ثلاثة مداخل: تطبيق B1Checkin على أكشاك الخدمة للمحطات التي يشرف عليها موظفون وللمحطات ذاتية الخدمة، وتسجيل الوصول الذاتي داخل بوابة الأعضاء في تطبيق B1App، والحضور من جهة الإدارة في B1Admin. تكتب الواجهات الثلاث جميعها في وحدة الحضور نفسها في Api الأساسي، ويُحدَّد توجيه الفصول بالكامل من خلال المجموعات، ولا يوجد كيان منفصل باسم "المواقع" أو "الغرف". فوق ذلك طبقة لسلامة الأطفال تشمل أنواع تسجيل الوصول لكل زيارة، وبوابات السعة ونسب المتطوعين على الخادم، والتحقق من الأهلية حسب العمر والصف على الكشك، والتحقق من الأشخاص المعتمدين للاستلام عند تسجيل الخروج، والتنبيه الهاتفي للأولياء عبر مزود الرسائل النصية الخاص بالكنيسة. تعرض هذه الصفحة نموذج البيانات، وتدفقات تسجيل الوصول، وطبقة السلامة، وخط طباعة الملصقات.

</div>

## نظرة عامة

```
┌──────────────────────────┐
│ B1Checkin (كشك Expo)     │──┐         ┌──────────────────────────────────────────────┐
│  بحث → العائلة →         │  │         │ Api                                          │
│  المجموعات → إتمام/طباعة │  │  HTTPS  │  ┌─ وحدة العضوية ─────────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ الأشخاص · العائلات · المجموعات          │ │
│ B1App (تسجيل ذاتي)       │──┤         │  └─────────────────────────────────────────┘ │
│  شاشة /mobile/checkin    │  │         │  ┌─ وحدة الحضور ───────────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (الموظفون)       │──┘         │  │ groupServiceTimes  (توجيه الغرف)        │ │
│  الإعداد · التقارير ·    │            │  │ sessions ← visitSessions → visits       │ │
│  مصمم الملصقات           │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

مسار طباعة الملصقات (الكشك فقط):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (قوالب الملصقات، أو احتياطي HTML المرفق)
       └▶ LabelRenderer → مستند HTML + رموز شريطية SVG مضمّنة
            └▶ PrintUI: عرض WebView ← التقاط ViewShot بصيغة JPG
                 └▶ وحدة printer-helper الأصلية → Brother QL / Zebra
```

| الواجهة | المستودع | التقنية | الدور |
|---------|----------|---------|-------|
| الكشك | `B1Checkin` | Expo / React Native، وتوجيه الملفات عبر expo-router؛ بناءات EAS لـ Android وAmazon Fire وiOS؛ تحديثات OTA عبر `expo-updates` | محطة يشرف عليها موظفون أو ذاتية الخدمة، مع طباعة الملصقات وتسجيل الخروج المتحقق منه |
| التسجيل الذاتي | `B1App` | Next.js (بوابة الأعضاء b1.church) | يسجّل الأعضاء المسجّلو الدخول عائلتهم من الهاتف؛ بدون طباعة |
| الإدارة | `B1Admin` | تطبيق React أحادي الصفحة (SPA) | يضبط بنية الخدمة، ويعيّن المجموعات إلى أوقات الخدمة، ويصمم الملصقات، ويسجل الحضور اليدوي، ويشغّل التقارير |

تستدعي الواجهات الثلاث وحدتي API نفسيهما عبر `ApiHelper`: **MembershipApi** (`/membership`) للأشخاص والعائلات والمجموعات، و**AttendanceApi** (`/attendance`) لكل ما يرد أدناه.

## نموذج البيانات (`Api/src/modules/attendance`)

| الكيان / الجدول | الحقول الرئيسية | المعنى |
|----------------|-----------------|--------|
| `campuses` | name, address | مُهمَل هنا — تُدار الفروع في وحدة العضوية (`/membership/campuses`)؛ نسخة الحضور للقراءة فقط للقراء القدامى (`models/Campus.ts`) |
| `services` | campusId, name | اجتماع متكرر، مثل "صباح الأحد" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | فترة زمنية داخل الخدمة، مثل "9:00 ص" (`models/ServiceTime.ts`). أعمدة الجدول الزمني اختيارية (الترحيل `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) وتحدد [نافذة تسجيل الوصول](#نوافذ-تسجيل-الوصول-المجدولة) |
| `groupServiceTimes` | groupId, serviceTimeId | جدول ربط: أي المجموعات (الفصول) تجتمع في أي أوقات خدمة (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | اجتماع واحد لمجموعة واحدة في تاريخ واحد — يُنشأ عند الحاجة وقت تسجيل الوصول (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | حضور شخص واحد في تاريخ واحد (`models/Visit.ts`). قيمة `checkinType` هي `member` / `guest` / `volunteer` (NULL = عضو قديم)، ويضبطها الكشك وتستخدمها بوابات السعة/النسبة |
| `visitSessions` | visitId, sessionId | الجلسة (الجلسات) التي تغطيها الزيارة — الطفل المسجَّل في وقتي خدمة يحصل على صفين (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (كتل JSON) | تخطيطات ملصقات قابلة للتصميم (`models/LabelTemplate.ts`) |

### كيف يُحفظ تسجيل الوصول المكتمل

يعالج `VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) الطلب `POST /attendance/visits/checkin?serviceId=&peopleIds=`. يتكوّن النص من مصفوفة كائنات `Visit`، يحمل كل منها `visitSessions` تشير فيها الجلسة المضمّنة `session` إلى زوج `(serviceTimeId, groupId)` فقط. ثم يقوم الخادم بما يلي:

1. **يفحص السعة ونسب المتطوعين قبل أي كتابة.** تستدعي `evaluateGates()` الدالة `CheckinGateHelper.evaluate()`، التي تتحقق من سعة كل غرفة مستهدفة، وسعة الضيوف، وعلامة الإغلاق، ونسبة المتطوعين مقابل الإشغال الحالي. لا تُنفَّذ postCheckin **ضمن معاملة (transaction)**، لذا يجب أن تعمل البوابة قبل أول حفظ — فالانتهاك الصارم يُرجع استجابة 409 تسمّي الغرفة (الغرف) المخالفة، ولا يُحفظ شيء. انظر [بوابات السعة ونسبة المتطوعين](#بوابات-السعة-ونسبة-المتطوعين).
2. **يحلّ الجلسات عند الحاجة.** تجد `getSessionId()` صف `sessions` للزوج `(groupId, serviceTimeId, today)` أو تنشئه — ويُخزَّن معرّف الجلسة مؤقتًا في الذاكرة لكل تاريخ. تُطلق الجلسات الجديدة webhook باسم `session.created`. الحلقة عبارة عن `for..of` مع `await` — إذ كان `forEach(async …)` بلا انتظار يتسابق مع الحفظ ويكتب قيمة NULL في sessionIds عند إنشاء أول جلسة (تم إصلاحه، ومذكور في تعليق برمجي عند الحلقة).
3. **يستبدل سجلات اليوم.** تُحذف أي زيارات موجودة لهؤلاء الأشخاص في تلك الخدمة اليوم مع زيارات جلساتها، ثم تُحفظ المجموعة المُرسلة. لذا فإعادة تسجيل وصول عائلة هي عملية idempotent تعني "هذه هي الحالة الحالية"، وليست إضافة. أما تمرير `?checkDuplicates=true` فيُرجع `{ duplicates: [personId…] }` دون كتابة، وهذا ما يستخدمه الكشك للتحذير قبل الكتابة فوق السجلات.
4. **يولّد رمز أمان واحدًا لكل دفعة.** تُنتج `SecurityCodeHelper.generate()` رمزًا من 4 أحرف من الأبجدية `23456789BCDFGHJKLMNPQRSTVWXYZ` (بلا حروف علة أو أحرف ملتبسة، فلا تكوّن الرموز كلمات ولا تُقرأ خطأً). يعيد الخادم المحاولة عند التعارض مع الزيارات المفتوحة لنفس الكنيسة في اليوم نفسه، ويختم الرمز على كل زيارة في الدفعة.
5. **يُرجع `{ streaks, securityCode }`.** تربط `streaks` معرّف الشخص بعدد أسابيع الحضور المتتالية؛ ويحتفل الكشك بالمحطات (كل أسبوع خامس) بقصاصات الكونفيتي.

كل زيارة محفوظة تُطلق أيضًا webhook باسم `attendance.recorded`. أما جانب القراءة، أي `GET /attendance/visits/checkin`، فيُرجع زيارات الأشخاص من **آخر تاريخ مسجَّل** لهم — وإذا كان ذلك في أسبوع سابق تُحذف المعرّفات، فيتلقى العميل نسخة معبّأة مسبقًا من اختيارات الغرف للأسبوع الماضي، وستُحفظ كسجلات جديدة.

### تسجيل الخروج

يُكمل نقطتا نهاية الحلقة (`VisitController`):

- `GET /attendance/visits/code/:code` — زيارات اليوم التي لم يُسجَّل خروجها بعد وتحمل رمز الأمان هذا، مع تحميل الجلسات.
- `POST /attendance/visits/checkout` — النص `{ visitIds, checkedOutBy?, checkedOutById? }`؛ يختم `checkoutTime` ومَن استلم الطفل، ويُطلق webhook باسم `attendance.checkout` لكل زيارة.

الصلاحيات: تُصادق الأكشاك بصلاحية `attendance.checkin`، التي تمنح بالضبط سطح تسجيل الوصول والخروج وقوالب الملصقات، إضافةً إلى عمليات البحث عن العائلات التي يحتاجها الكشك دون `people.view` (البحث بالهاتف/الاسم، وأفراد العائلة في نموذج تسجيل الوصول، وقائمة استلام العائلة). يعرض `SessionHelper.filterChurches` في B1Checkin فقط الكنائس التي يملك فيها الحساب `Attendance/Checkin` أو `Attendance/Edit`. لم يعد `Checkin` جزءًا من صلاحيات الجميع (الدور الفارغ) (`RoleHelper` والترحيل `2026-11-01_remove_everyone_checkin`)، لذا يجب منحه عبر دور حقيقي؛ وتغطي `attendance.view`/`attendance.edit` التقارير والإدخال اليدوي؛ أما البنية (الخدمات، وأوقات الخدمة، وتعيينات المجموعات) فتتطلب `services.edit`. لا يحتاج التسجيل الذاتي للأعضاء (B1App) إلى أي صلاحية: يحق لأي مستخدم مصادَق عليه مرتبط بشخص في الكنيسة استدعاء `GET`/`POST /attendance/visits/checkin`، ويقصر الخادم معرّفات `personId` المُرسلة على عائلة المتصل نفسه (وإلا 403) — وهذا الحاجز هو ما يحول دون قراءة `securityCode` لعائلات أخرى. العضوية هي التفويض؛ أما ما إذا كان الأعضاء *يرون* الميزة فتتحكم فيه تبويبات التنقل في B1App الخاصة بالكنيسة. تبقى نقاط نهاية التسجيل الأخرى (`code/:code`، و`checkout`، و`guardians`، و`CheckinController`) مقتصرة على الكشك والموظفين.

## المجموعات تقود توجيه الغرف

لا يوجد كيان للغرف أو الفصول في النظام كله. "الغرفة" هي **مجموعة** في وحدة العضوية مفعّل فيها `trackAttendance`، ومرتبطة بوقت خدمة واحد أو أكثر عبر `groupServiceTimes`. الحقول الخاصة بالمجموعة (في `Api/src/modules/membership/models/Group.ts`) التي تشكّل سلوك الكشك:

| الحقل | الأثر |
|------|-------|
| `trackAttendance` | تشارك المجموعة في الحضور أصلًا؛ وتُعلَّم شجرة الإعداد في B1Admin المجموعات ذات `trackAttendance` التي لا يوجد لها صف في `groupServiceTimes` على أنها غير معيّنة |
| `parentPickup` | يحدد غرفة طفل: التسجيل فيها يجعل الزيارة زيارة "طفل"، فتُطبع ملصق استلام العائلة ويوضع رمز الأمان على شارة الاسم |
| `printNametag` | هل تطبع التسجيلات في هذه المجموعة شارة اسم أصلًا |
| `capacity` / `guestCapacity` / `checkinClosed` | حدود سعة الغرفة ومفتاح "إغلاق" صارم، تفرضها بوابة تسجيل الوصول على الخادم (وتُحرَّر في إعدادات المجموعة في B1Admin تحت "سعة تسجيل الوصول") |
| `volunteerRatio` / `minVolunteers` | نسبة الأطفال لكل متطوع، والحد الأدنى لعدد المتطوعين، ويُطبَّقان حسب إعداد `ratioEnforcement` على مستوى الكنيسة |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | حدود أهلية العمر والصف التي يقيّمها الكشك لتمييز الغرف أو تعتيمها |

تُطبّع كل الواجهات البيانات بالطريقة نفسها (مثلًا `B1Checkin/app/services.tsx`، و`B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): تحميل `GET /attendance/servicetimes?serviceId=`، و`GET /attendance/groupservicetimes`، و`GET /membership/groups` بالتوازي، ثم لكل وقت خدمة تُجمع المجموعات التي يشير صف `groupServiceTimes` الخاص بها إليه في `serviceTime.groups`. هذه المصفوفة هي ما يعرضه منتقي الغرف، مرتبةً حسب `categoryName` للمجموعة.

تُحرَّر التعيينات من صفحة المجموعة في B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`)، وتُعرض شجرة الفروع ← الخدمات ← أوقات الخدمة ← المجموعات كاملةً في `B1Admin/src/attendance/components/AttendanceSetup.tsx` عبر `GET /attendance/attendancerecords/tree`.

:::info
بما أن المجموعات هي المصدر الوحيد للحقيقة، فإن عضوية المجموعة نفسها تغذي توجيه الكشك، وسجلات الحضور على شكل قوائم في صفحات المجموعات في B1Admin، وتقارير الحضور — وتعيين مجموعة إلى وقت خدمة هو الخطوة الوحيدة اللازمة لتصبح وجهة لتسجيل الوصول.
:::

## سلامة الأطفال

### أنواع تسجيل الوصول

تحمل كل زيارة قيمة `checkinType` — وهي `member` أو `guest` أو `volunteer` (وتعني NULL عضوًا قديمًا؛ الترحيل `tools/migrations/attendance/2026-07-03_checkin_type.ts`). يُختار النوع **من جهة الكشك**: شرائح عضو / ضيف / متطوع في صف العضو الموسّع (`B1Checkin/src/components/MemberServiceTimes.tsx`)، ويُختم على كل زيارة معلّقة عند الإتمام (`app/checkinComplete.tsx`، والافتراضي `member`). يستهلكه الخادم في البوابة — فالمتطوعون يُحتسبون ضمن تغطية النسبة بدل احتسابهم مقابل السعة، والضيوف يُحتسبون مقابل `guestCapacity`.

### بوابات السعة ونسبة المتطوعين

تعمل `CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) داخل `postCheckin` قبل أي حفظ (النقطة غير خاضعة للمعاملات، لذا فإن البوابة قبل الحفظ هي آلية الصحة). تحمّل الإشغال الحالي لكل مجموعة مستهدفة (`VisitRepo.countActiveByGroupToday`) وإعداد المجموعة عبر بوابة وحدة العضوية، ثم تصنّف الانتهاكات:

- **صارمة (تمنع دائمًا):** `checkinClosed`، و`current + incoming > capacity`، وعدد الضيوف يتجاوز `guestCapacity`. تُرفض الدفعة بالاستجابة `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — ويعرض الكشك الغرفة المسمّاة.
- **النسبة (تحذير أو منع):** الحاضرون من غير المتطوعين في غرفة يكون فيها `volunteers < minVolunteers`، أو لا يوجد متطوعون إطلاقًا، أو `children > volunteers × volunteerRatio`. وتتبع شدة الانتهاك إعداد الكنيسة `ratioEnforcement` (`"warn"` وهو الافتراضي / `"block"`، ويُحرَّر في B1Admin Manage Church ← Check-In، `CheckinSettingsEdit.tsx`). يُرجع وضع التحذير `409 { warning: true, error: "ratio", … }` ما لم يُعد العميل الإرسال مع `acknowledgeWarnings=true` — وهذه الإعادة هي تجاوز تأكيد الموظف في الكشك.

### نوافذ تسجيل الوصول المجدولة

قد يحمل وقت الخدمة جدولًا أسبوعيًا اختياريًا (`dayOfWeek` من 0 إلى 6 حيث 0 = الأحد، و`startTime`/`endTime` بصيغة `HH:mm`، و`checkinOpenMinutes`، و`checkinCloseMinutes`)، ويُحرَّر في نموذج وقت الخدمة ضمن **الحضور ← الإعداد** في B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`، بعنوان "جدول تسجيل الوصول"). تعامل `CheckinGateHelper.hasSchedule()` وقتَ الخدمة على أنه مجدول فقط عندما يُضبط كل من `dayOfWeek` و`startTime`؛ أما الأوقات غير المجدولة فلا تخضع لتقييد زمني أبدًا. تحسب `isServiceTimeOpen()` النافذة بالتوقيت المحلي للساعة الجدارية (`DateHelper.toChurchTime`). تُحدَّد المنطقة الزمنية لكل وقت خدمة عبر `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): تأتي أولًا `timezone` لفرع الخدمة (`service.campusId`، عبر `MembershipModuleGateway.loadCampusTimeZones`)، ثم `timeZone` الخاصة بالكنيسة (تُضبط في معلومات الكنيسة في B1Admin)، ثم أول فرع غير محذوف لديه `timezone` (`loadCampusTimeZone`)، وأخيرًا `America/New_York`. يأتي الفرع أولًا لأن معظم الكنائس كان لديها `America/New_York` مُعبأً رجعيًا كمنطقة للكنيسة. يحل كلٌّ من مسار القائمة ومسار الإرسال أدناه المنطقة بالطريقة نفسها. تمتد النافذة من `checkinOpenMinutes` قبل البداية حتى `checkinCloseMinutes` بعد النهاية (أو بعد البداية عند غياب النهاية)، وتتعامل مع النوافذ التي تعبر منتصف الليل أو حد الأسبوع.

تُفرض النافذة في موضعين:

- **القائمة:** يُلصق `GET /attendance/servicetimes` على كل صف قيمة منطقية محسوبة باسم `checkinOpen`. تُبقي شاشة التسجيل الذاتي في B1App (`CheckinPage.tsx`) وأداة اختيار الخدمة في B1Checkin (`app/services.tsx`) كل الأوقات. وعندما تكون جميع أوقات خدمة مغلقة يعرضون أقرب موعد للفتح ("يفتح تسجيل الوصول الأحد 9:30 ص." في B1App، و"يفتح تسجيل الوصول لهذه الخدمة الأحد 9:30 ص." في B1Checkin، من `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`)، مع الرجوع إلى "تسجيل الوصول غير مفتوح لهذه الخدمة الآن." عندما لا يمكن حساب موعد فتح (يوفّر الكشك زر رجوع لاختيار خدمة أخرى). وإلا تُعرض الأوقات المغلقة كصف غير قابل للاختيار بعنوان "مغلق" أو "مغلق · يفتح 9:30 ص". تعيد شاشة العائلة في B1Checkin (`MemberServiceTimes.tsx`) تقييم حالة الفتح مباشرة على ساعة الجهاز باستخدام `ServiceTimeHelper.isCheckinOpen()` (منطقة زمنية الجهاز لا منطقة الكنيسة)، بحيث يفتح الكشك الذي يبقى قيد التشغيل ويغلق في موعده، ويعرض "Kids Room 1 · Checked in" (اسم المجموعة) على وقت مغلق يحمله الشخص أصلًا.
- **الإرسال:** داخل `evaluateGates()`، قبل تقييم السعة والنسبة، ترفض `findClosedServiceTimeGroups()` الدفعة بالاستجابة `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` إذا كان وقت خدمة لأي جلسة مستهدفة خارج نافذته. ولأن الزيارات القائمة للعائلة في اليوم تُعاد إرسالها مع كل تسجيل، فإن الجلسات التي يحملها الشخص أصلًا (`personId|sessionId` في الزيارات القائمة) تتجاوز هذه البوابة، فلا يُرفض إضافة وقت خدمة مفتوح لاحقًا لأن نافذة سابقة أُغلقت. يعرض B1Checkin ذلك عبر شاشة البوابة الصارمة بالسبب "تسجيل الوصول غير مفتوح الآن" (أما انتهاكات السعة فتظل تقول "الغرفة ممتلئة أو مغلقة").

### أهلية العمر والصف (من جهة الكشك)

أهلية الغرفة واجهة إرشادية تُقيَّم على الكشك، ولا يفرضها الخادم. تقارن `B1Checkin/src/helpers/EligibilityHelper.ts` تاريخ ميلاد الشخص وصفه بالحدود `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` الخاصة بالمجموعة (ترتيب الصفوف: PreK، و K، و1–12، وGraduated)، وتُرجع `eligible` / `ineligible` / `unknown` — فالبيانات المفقودة تعطي `unknown` ولا تُخفي الغرفة أبدًا. يُحسب العمر والصف بتاريخ **ترقية الصفوف** للكنيسة (إعداد `gradePromotionDate`، بصيغة `"MM-DD"`، ويُحرَّر في `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`)؛ ويجلبه الكشك من `GET /attendance/checkin/settings`، وتختار `resolveAsOfDate` أحدث تكرار في اليوم أو قبله. يبرز منتقي الغرف الغرف المؤهلة ويعتّم غير المؤهلة، ويتطلب اختيار غرفة معتَّمة تأكيدًا من الموظف.

### الاستلام المعتمد وغير المصرّح

الأشخاص المخوّلون للاستلام كيان في العضوية، لكل عائلة: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId، و personId اختياري، والاسم، وphotoUrl، وصلة القرابة، والحالة `trusted` / `notAuthorized`، والملاحظات). تتم عمليات الإنشاء والقراءة والحذف عبر `GET /membership/householdpickup/:householdId` (لأي مستخدم كنيسة مصادَق عليه، حتى تتمكن الأكشاك من القراءة)، إضافةً إلى `POST` / `DELETE` ومحميّين بالصلاحية `people.edit`. يدير الموظفون القائمة في بطاقة **الاستلام** في صفحة الشخص (`B1Admin/src/people/components/PickupPeople.tsx`) — الصورة وصلة القرابة وشارة الحالة "معتمد" / "غير مصرّح".

عند تسجيل الخروج (`B1Checkin/app/checkout.tsx`) يحمّل الكشك قائمة استلام العائلة: تُعرض مدخلات `trusted` كبطاقات استلام قابلة للنقر بجانب شبكة صور البالغين في العائلة، ويُطابَق اسم "أخرى" المكتوب حرًا بتقريب (Levenshtein، `src/helpers/PickupMatchHelper.ts`) مع مدخلات `notAuthorized` — فالتطابق يمنع تسجيل الخروج ويعرض ورقة تحذير وزر **تجاوز** للموظف. يُسجَّل التجاوز على الزيارة نفسها: يرسل `checkedOutBy` بالقيمة `"OVERRIDE: {name}"` عبر `POST /attendance/visits/checkout` المعتاد، فيصل إلى سجل الحضور وإلى webhook `attendance.checkout` بدلًا من جدول تدقيق منفصل.

### تنبيه الأولياء والبث الطارئ

تكشف `CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`، ضمن `/attendance/checkin`) نقطتي نهاية للرسائل النصية:

- `POST /page` — `{ visitId, message }`: يُنبّه أولياء طفل واحد مسجَّل (شاشة تسجيل الخروج في الكشك، في الوضع المُشرف عليه).
- `POST /broadcast` — `{ serviceId, message }`: يرسل رسالة نصية إلى بالغي كل عائلة مسجَّلة لخدمة معيّنة (إعدادات الكشك الإدارية، خلف ورقة تأكيد من نوع `EMERGENCY` في `B1Checkin/app/adminSettings.tsx`).

يحل كلا المسارين بالغي العائلات عبر بوابة العضوية، ثم يُسلّمان الإرسال إلى **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — وهو الباب العابر للوحدات إلى مزود الرسائل النصية المُعدّ للكنيسة (`@churchapps/texting`: TextInChurch أو Clearstream أو MutualMinistry؛ ولا يوجد مرسل SMS مدمج). تسجّل البوابة صفًا من `sentText` مع إدخالات `deliveryLog` لكل مستلم، وتحد الدفعة بـ 500 مستلم؛ وإذا لم يكن هناك مزود مُعدّ تُرجع `no_provider`، فيعرضها الكشك بالرسالة "لم يُعدّ مزود للرسائل النصية". يُزيل `dispatch()` في المتحكم أرقام الهواتف المكررة، ويتجاوز الأشخاص الذين لا يملكون جوالًا أو المضبوط لديهم `optedOut`، ويُرجع `{ sent, failed, skippedOptedOut, skippedNoPhone }` كي يعرض الكشك ما تم تخطيه.

## الكشك (B1Checkin)

الشاشات ملفات expo-router ضمن `B1Checkin/app/`، والحالة المشتركة بين الشاشات تعيش في الصنف الثابت `CachedData` (`src/helpers/CachedData.ts`)، لا في حالة React.

```
index (الإقلاع/الدخول التلقائي) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
          يحمّل serviceTimes، groups،     │             │  └─────────┘ └▶ addGuest  └▶ طباعة الملصقات،
          groupServiceTimes،              │             └▶ checkout (مُشرف عليه)       عودة تلقائية
          labelTemplates                  │                                            إلى lookup
```

1. **البحث** (`app/lookup.tsx`) — البحث بالهاتف (`GET /membership/people/search/phone?number=`، آخر 4 أرقام أو الرقم كاملًا) أو بالاسم (`GET /membership/people/search?term=`). يحمّل اختيار نتيجة العائلة (`GET /membership/people/household/{householdId}`) والزيارات القائمة (`GET /attendance/visits/checkin`)، فيملأ `pendingVisits` باختيارات الأسبوع الماضي.
2. **مراجعة العائلة** (`app/household.tsx`، `src/components/MemberList.tsx`) — يعرض صف كل عضو شارة "مسجَّل الوصول بالفعل" وشارة الحساسية/`nametagNotes` وشرائح الغرف الحالية. يؤدي توسيع عضو إلى عرض كل وقت خدمة مع زر غرفة وشرائح نوع تسجيل الوصول عضو / ضيف / متطوع (`MemberServiceTimes.tsx`). تحت اسم كل وقت خدمة، تعرض `ServiceTimeHelper.getGroupSummary()` المجموعات المتاحة فيه (أسماء `serviceTime.groups`، مقتطعة، ومزالة التكرار بغض النظر عن حالة الأحرف، ومفصولة بفواصل)؛ ولا يُعرض شيء عندما لا يحمل الوقت أي مجموعات.
3. **تعيين المجموعة** (`app/selectGroup.tsx`) — شجرة فئات مبنية من `serviceTime.groups`، مع إبراز الغرف المؤهلة بحسب العمر والصف وتعتيم غير المؤهلة خلف تأكيد من الموظف (انظر [أهلية العمر والصف](#أهلية-العمر-والصف-من-جهة-الكشك))؛ يكتب اختيار الغرفة زيارة جلسة `{ session: { serviceTimeId, groupId } }` في الزيارة المعلّقة لذلك الشخص (`src/helpers/VisitSessionHelper.ts`). ويمسح خيار "لا شيء" التعيين.
4. **الإتمام** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` مع `pendingVisits` (كل منها مختوم بـ `checkinType` الخاص به)، ثم تُطبع الملصقات إذا كانت طابعة مُعدّة، وتعود تلقائيًا إلى البحث. تعرض استجابة `409` للسعة أو `notOpen` الغرفة المسمّاة مع السبب (ممتلئة/مغلقة، أو التسجيل غير مفتوح)؛ ويعرض تحذير النسبة تأكيدًا من الموظف يُعيد الإرسال مع `acknowledgeWarnings=true`.

شاشة **تسجيل الخروج** (`app/checkout.tsx`) تقبل رمز الأمان المكوّن من 4 أحرف عبر حقل إدخال يُركَّز تلقائيًا — فتعمل ماسحات الباركود بلوحة المفاتيح عبر USB/Bluetooth دون كاميرا — أو لوحة مفاتيح على الشاشة تستخدم الأبجدية نفسها، وترسل تلقائيًا عند 4 أحرف. يفتح زر **مسح** ورقة تحتوي على الكاميرا المشتركة `src/components/CodeScanner.tsx` (الكاميرا الخلفية افتراضيًا، وتقبل QR وCode 128 وCode 39)، بحيث تتمكن المحطات التي لا تملك ماسحًا بلوحة المفاتيح من قراءة ملصق الاستلام؛ ويغذي الرمز الممسوح المسار `handleCode()` نفسه الذي تسلكه المدخلات المكتوبة. تبحث الشاشة عن الرمز، وتعرض الأطفال الذين يُستلمون، وتقدم **الأشخاص المعتمدين للاستلام** في العائلة كبطاقات قابلة للنقر بجانب شبكة صور لبالغي العائلة (مع خيار "أخرى" للكتابة الحرة يُطابَق تقريبيًا مع أسماء غير المصرّح لهم — انظر [الاستلام المعتمد وغير المصرّح](#الاستلام-المعتمد-وغير-المصرح))، ثم ترسل `POST /attendance/visits/checkout` مع اسم/معرّف المستلِم المختار. وفي الوضع المُشرف عليه تعرض الشاشة أيضًا **تنبيه ولي الأمر** (`POST /attendance/checkin/page`) و**إعادة طباعة ملصق الأمان** — إذ تعيد `reprint()` بناء ملصقات العائلة عبر `LabelHelper.getAllLabelsFor(...)` وتمررها عبر خط `PrintUI` نفسه المستخدم في تسجيل الوصول.

سمة المحطة هي علامة AsyncStorage باسم `@StationMode` (`"self"` | `"manned"`، وتُبدَّل في `app/adminSettings.tsx`). يضيف الوضع المُشرف عليه نقطة الدخول لتسجيل الخروج في شاشة البحث، وتحرير ملف كل شخص (`POST /membership/people`) من شاشة العائلة. ومتانة الكشك مبنية فيه: رمز PIN اختياري (`app/setPin.tsx`، و`src/components/PinEntryModal.tsx`) يحمي شاشتي الإدارة والطابعة، ولا تُفتح شاشة الإدارة إلا بالنقر السريع 7 مرات على شعار الرأس، وتتولى شاشة الجذب الخاملة (`src/hooks/useInactivityTimer.ts`) العرض بين العائلات.

## التسجيل الذاتي (B1App)

يسجّل الأعضاء من بوابة b1.church في الشاشة `/mobile/checkin` (يوجّهها `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` إلى `screens/CheckinPage.tsx`). يتطلب مستخدمًا مسجّلًا للدخول، ويسير عبر الخطوات الأربع نفسها التي في الكشك — الخدمات ← العائلة ← المجموعات ← الإتمام — على نقاط النهاية المطابقة، مع حفظ الحالة في `B1App/src/helpers/CheckinHelper.ts`. الفروق عن الكشك: تأتي العائلة من `householdId` الخاص بالمستخدم المسجَّل (دون خطوة بحث)، ولا توجد طباعة ملصقات — بل تعرض شاشة الإتمام رمز الأمان للدفعة كرمز QR (`qrcode.react`) مع تلميح "أظهر هذا في محطة التسجيل". إذا كانت العائلة مسجّلة بالفعل عند تحميل الصفحة، يعيد زر "عرض رمز تسجيل الوصول" عرض رمز QR من أول زيارة قائمة (من `GET /attendance/visits/checkin`) تحمل `securityCode`. يُسجَّل التسجيل فورًا عند الإرسال (لا توجد حالة معلّقة)؛ ولا يدفع رمز QR سوى طباعة الملصقات في الكشك.

**طباعة الملصقات من الهاتف إلى الكشك** (`B1Checkin/app/scan.tsx`، ويُوصل إليها من زر "مسح الرمز" لرمز QR في شاشة البحث): يعرض الكشك `CodeScanner` (وهو `CameraView` من `expo-camera`، والكاميرا الأمامية افتراضيًا مع إمكانية القلب)، ويمسح رموز QR. لا يقبل `ScanCodeHelper.parse()` حمولة إلا إذا كانت رمزًا من 4 أحرف في أبجدية رمز الأمان، ويتجاهل `ScanCodeHelper.isRepeat()` الرمز نفسه لمدة 4 ثوانٍ، فيعمل كلٌّ من رمز QR في B1App وكتلة QR في الملصق المطبوع. ثم تتبع الشاشة مسار إعادة الطباعة في الخروج — `GET /attendance/visits/code/{code}` ← `GET /membership/people/ids` ← `LabelHelper.getAllLabelsFor(visits, people, code)` ← `PrintUI` — وتعود إلى البحث. لا تحدث أي كتابة للحضور عند المسح؛ بل الطباعة فقط. تعرض الرموز التي لا توجد لها زيارات نشطة، والمحطات التي لا طابعة لها، والمجموعات دون ملصقات، كلٌّ منها رسالة منبثقة ثم عودة إلى البحث.

تأتي الأنواع و`ApiHelper`/`ArrayHelper` من `@churchapps/helpers` و`@churchapps/apphelper`؛ ولا تُشارك أي مكونات React مع B1Admin.

## الحضور من جهة الإدارة (B1Admin)

- **الإعداد** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) يعرض شجرة البنية وينشئ الخدمات (`ServiceEdit.tsx`) وأوقات الخدمة (`ServiceTimeEdit.tsx`). تأتي بيانات الفروع من العضوية عبر الخطاف `useCampuses()`.
- **الحضور اليدوي** يعيش في جانب المجموعات لا في قسم الحضور: ينشئ `B1Admin/src/groups/components/GroupSessionsTab.tsx` الجلسات (`POST /attendance/sessions`؛ وعند الإضافة يمكن لـ `SessionEdit.tsx` تضمين جلسة واحدة لكل مجموعة أخرى تشارك وقت الخدمة المختار، مع تخطي المجموعات التي لديها جلسة في ذلك التاريخ)، ويسجّل الحضور عبر `POST /attendance/visitsessions/log`، الذي يجد الزيارة للشخص والجلسة أو ينشئها. يمكن لقادة المجموعات تسجيل الحضور لمجموعاتهم دون الصلاحية `attendance.edit` — إذ تتحقق المتحكمات من `au.leaderGroupIds`.
- **التقارير** — تقرير اتجاه الحضور وحضور المجموعة تقارير معرّفة على الخادم (`B1Admin/src/components/reporting/ReportWithFilter.tsx` مقابل ReportingApi؛ والتعريفات في `Api/reports/*.json`). كلاهما يأخذ `startDate`/`endDate` (تاريخ النهاية شامل)؛ ويمتد تقرير الاتجاه افتراضيًا من قبل سنة حتى اليوم ويضيف عمود `sessionDates` لكل أسبوع، أما شجرة الشاشة لحضور المجموعة فتتضمن `checkinTime` لكل زيارة و`membershipStatus` للشخص. يأتي ملف CSV لحضور المجموعة من تقرير `groupAttendanceDownload` المرافق، ويحوّله `GroupAttendanceDownloadHelper` إلى صف واحد لكل عضو في المجموعة، مع عمود حضور/غياب لكل جلسة مؤرخة؛ أما سجل كل شخص فيأتي من `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## طباعة الملصقات

### القوالب والمصمم

تصمم الكنائس ملصقاتها بنفسها في B1Admin على المسار `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`، ويُوصل إليها من صفحة إعدادات تسجيل الوصول). القالب صف في `labelTemplates` يكون فيه `content` مصفوفة JSON من الكتل — `text` أو `field` أو `barcode` أو `qrcode` أو `box` — ويُموضع كلٌّ منها بإحداثيات نسبية مئوية، مع الخط والمحاذاة والترميز (`code39`/`code128`/`qr`) وشروط ظهور اختيارية (مثلًا لا تُعرض صندوق الحساسية إلا عندما يكون `person.nametagNotes` غير فارغ). يوجد نوعان لـ `labelType`: `nametag` (واحد لكل شخص مسجَّل، وحقول مثل `person.displayName` و`sessions` و`securityCode` و`person.isBirthdayWeek` — وتساوي `"true"` عندما يقع شهر/يوم عيد الميلاد في غضون 3 أيام من اليوم، مع الالتفاف عبر نهاية السنة، ويحسبها `LabelHelper.isBirthdayWithin()`) و`pickup` (واحد لكل عائلة، وحقول مثل `children` و`childrenAllergies`). يفرض الخادم قالبًا افتراضيًا واحدًا لكل نوع في كل كنيسة (`LabelTemplateController.save`). يأتي المصمم بقوالب مبدئية تحاكي الملصقات المرفقة في الكشك، ويعاين النتائج على بيانات نموذجية.

### العرض والطباعة على الكشك

عند إتمام تسجيل الوصول، يقرر `B1Checkin/src/helpers/LabelHelper.ts` ما يُطبع استنادًا إلى علامات المجموعة في كل زيارة معلّقة: شارات أسماء لمجموعات `printNametag`، بالإضافة إلى ملصق استلام عائلة واحد إذا أصابت أي زيارة مجموعة `parentPickup`. تتجاوز `LabelHelper.selectChildVisits()` الزيارات التي يكون `checkinType` فيها `volunteer`، فلا يُطلق عامل رعاية الأطفال في غرفة "استلام الأهل" ملصق الاستلام أبدًا. يُضاف رمز الأمان من استجابة التسجيل إلى شارات الأطفال وملصق الاستلام؛ أما شارات البالغين فتُطبع دون رمز. وإذا كانت الكنيسة تملك قوالب، فإن `LabelRenderer` (`src/helpers/LabelRenderer.ts`) يحوّل الكتل مع سياق الحقول إلى مستند HTML مستقل؛ وإلا تُستخدم ملصقات HTML المرفقة في `B1Checkin/assets/labels/` مع استبدال العناصر النائبة.

تُولَّد الرموز الشريطية كـ SVG مضمّن عبر مشفّرات TypeScript صرفة في `B1Checkin/src/helpers/barcode.ts` — جداول أنماط Code 39 وجداول عرض Code 128 (المجموعة B مع مجموع التحقق mod-103)، إضافةً إلى QR عبر الحزمة `qrcode`. **هذه المشفّرات مكررة عمدًا في B1Admin** (`LabelEditor.tsx` يضمّن الجداول نفسها، ويُشار إلى ذلك في تعليق برمجي) حتى تكون معاينات المصمم مطابقة بكسل بكسل لمخرجات الكشك؛ ويجب أن يُعكس أي تغيير في أحدهما على الآخر.

يعرض خط الطباعة (`src/components/PrintUI.tsx`) كل ملصق HTML في `WebView`، ويلتقطه بصيغة JPG عبر `react-native-view-shot`، ويسلّم روابط الصور إلى وحدة Expo الأصلية **printer-helper** (`B1Checkin/modules/printer-helper/`). تكشف الوحدة `scan()` و`checkInit()` و`printUris()` وأحداث الحالة، مع مزود لكل علامة تجارية على المنصتين:

| العلامة | Android | iOS | ملاحظات |
|-------|---------|-----|---------|
| Brother | `BrotherProvider.kt` (حزمة Brother Print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | طابعات الشبكة من سلسلة QL (QL-800/810W/820NWB/1100/1110NWB…)، وملصقات مقطوعة بالقالب 29×90، وهي الافتراضي الموصى به |
| Zebra | `ZebraProvider.kt` (حزمة Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | اكتشاف الشبكة + طباعة صور عبر TCP/ZPL |

يقع اختيار الطابعة في `app/printers.tsx` (يُرجع فحص الشبكة مدخلات بصيغة `brand~model~ip`، ويُحفظ الاختيار في AsyncStorage)، ويحتفظ `src/helpers/PrinterLog.ts` بسجل تشخيصي على الجهاز يظهر عبر نقطة حالة حية في رأس الكشك.

## تسجيل الضيوف

ثلاثة مسارات تُنشئ شخصًا أثناء تسجيل الوصول:

- **في الكشك** — يفتح "إضافة ضيف" في شاشة العائلة الملف `B1Checkin/app/addGuest.tsx`، الذي يبحث أولًا عبر `GET /membership/people/search?term=` عن تطابق لشخص غير عضو موجود، وإلا ينشئ شخصًا عبر `POST /membership/people` ويرتبطه بالعائلة الحالية. يمر الضيف بعدها بتعيين المجموعة كأي عضو.
- **ذاتيًا عبر QR** — عندما يكون إعداد الكنيسة `enableQRGuestRegistration` مفعّلًا (يُضبط في إعدادات تسجيل الوصول في B1Admin، ويُقرأ من `GET /membership/settings/public/{churchId}`)، تعرض شاشة البحث في الكشك رمز QR يقود إلى `https://{subdomain}.b1.church/guest-register?serviceId=`. تتيح صفحة B1App هذه (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) لعائلة زائرة أن تسجّل نفسها من هاتفها عبر نقطة النهاية المجهولة `POST /membership/people/guest-register`، فتبقى طابور الكشك متحركًا. تحمل ورقة QR أيضًا زر **سجّل هنا** يفتح الصفحة نفسها على الكشك (`app/guestRegister.tsx`) في `WebView` بوضع التصفح الخاص وبلا تخزين مؤقت؛ ويبني `src/helpers/GuestRegisterHelper.ts` عنوان URL لكلٍّ من QR والـ WebView، ويمنع التنقل خارج `https://{subdomain}.b1.church/guest-register`. تعود الشاشة إلى البحث عند **تم** أو الرجوع أو 120 ثانية من الخمول (ويُعاد إرسال كتابة النموذج من الـ WebView كنشاط)، فيُفكّ تركيب الـ WebView كي لا تصل إدخالات عائلة إلى العائلة التالية.

يُدار التسجيل الذاتي عبر QR بإعدادات الكنيسة المحفوظة من بطاقة **تسجيل الضيوف عبر QR** في B1Admin (`src/mobile/CheckInPage.tsx`):

| الإعداد | الظهور | الغرض |
|---|---|---|
| `enableQRGuestRegistration` | عام | مفتاح الاشتراك لرمز QR في الكشك ولنقاط النهاية المجهولة |
| `guestRegistrationFields` | عام | خريطة JSON لـ `email` و`phone` و`address` و`birthDate` و`gender` و`maritalStatus` و`grade` و`comments` ← `"off"` / `"optional"` / `"required"`. الافتراضي: البريد والهاتف اختياريان، والبقية معطّلة. الاسم الأول والأخير مطلوبان دائمًا |
| `guestRegistrationImage` | عام | رابط صورة الترويسة؛ يعرضها B1App بنسبة 16:9 بدلًا من الأيقونة في النموذج وشاشة التأكيد |
| `guestRegistrationGroupId` | خاص | المجموعة التي تُضاف إليها كل عملية تسجيل (لا يرى الضيوف هذا الإعداد ولا يختارونه) |
| `guestRegistrationRecordAttendance` | خاص | القيمة `"true"` لتسجيل الحضور لتلك المجموعة أيضًا |

يجلب `src/components/checkin/GuestRegister.tsx` في B1App قائمة الحقول من نقطة النهاية المجهولة `GET /membership/people/guest-register/options?churchId=` ويعرض الحقول المضمّنة فقط (البريد والهاتف والحالة الاجتماعية والعنوان لجهة الاتصال الأساسية؛ وتاريخ الميلاد والجنس والصف لكل عضو؛ ومربع تعليقات واحد)، ويرسل تلك الحقول فقط. يعيد الخادم تطبيق القائمة في `GuestRegistrationHelper.sanitize()` — فتُسقَط الحقول المعطّلة، ويُرجع الغياب عن الحقول المطلوبة أو القيم خارج القائمة 400 — قبل أن يعمل `PersonHelper.registerGuestHousehold()`. يستدعي أولًا `PersonRepo.findGuestMatch()` لكل عضو لديه بريد أو هاتف: الشخص الحيّ الوحيد الذي له الاسم الأول نفسه ونفس البريد أو أرقام الهاتف يُعاد استخدامه (ولا يؤدي عدم التطابق أو تعدد التطابقات إلى إعادة الاستخدام، فيُنشأ شخص جديد، ولا يُخمَّن أبدًا). ويُطابَق العضو الذي لا يحمل وسيلة تواصل بالاسم الأول داخل العائلة المطابقة. لا يُعدَّل الأشخاص المعاد استخدامهم أبدًا، فلا يستطيع نموذج مجهول أن يكتب فوق بيانات مخزّنة، وتعيد الاستجابة الأسماء المُرسلة كما هي. يُضاف الأعضاء غير المطابَقين إلى العائلة المطابقة أو إلى عائلة جديدة، بالحالة `membershipStatus: "Visitor"`، مع إطلاق `person.created` لكل شخص جديد. بعد ذلك تُسجَّل الإخفاقات في السجلات بدلًا من إعادتها: يُضاف الأعضاء إلى المجموعة المُعدّة (`group.member.added`)؛ وإذا كان تسجيل الحضور مفعّلًا، فإن `AttendanceModuleGateway.recordAttendance()` يُسجّل كل عضو حاضرًا لكل وقت خدمة من أوقات المجموعة الذي له جدول وتكون نافذة تسجيله (`CheckinGateHelper.isServiceTimeOpen`) مفتوحة الآن، مع إنشاء الجلسة لتاريخ اليوم بحسب توقيت الكنيسة المحلي إن لزم — ولا تُسجَّل أي شيء لأوقات الخدمة غير المجدولة أو للتسجيلات خارج النافذة؛ وتصبح التعليقات ملاحظة شخص مخفية في محادثة لدى رب العائلة (باسم المؤلف "تسجيل ضيف")، مرتبطة عبر `person.conversationId`.

## صفحات ذات صلة

- [نقاط نهاية الحضور](../api/endpoints/attendance) -- واجهة REST الكاملة للفروع والخدمات والجلسات والزيارات وزيارات الجلسات
- [نقاط نهاية العضوية](../api/endpoints/membership) -- الأشخاص والعائلات والمجموعات
- [Webhooks](../api/webhooks) -- أحداث `session.created` و`attendance.recorded` و`attendance.checkout`
- [بنية الوحدات](../api/module-structure) -- كيفية تنظيم وحدة الحضور من جهة الخادم
