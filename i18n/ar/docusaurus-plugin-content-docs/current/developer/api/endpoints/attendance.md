---
title: "نقاط نهاية الحضور"
description: "مرجع واجهة الحضور البرمجية في B1 Admin وB1 Checkin: الفروع، والخدمات، وأوقات الخدمة، والجلسات، والزيارات، وقواعد التسجيل، ونقاط تصدير البيانات."
---

# نقاط نهاية الحضور

<div class="article-intro">

تُدير وحدة الحضور مواقع الفروع والخدمات وأوقات الخدمات وجلسات الحضور والزيارات وجلسات الزيارات. وتوفّر البنية الأساسية لتتبّع من حضر أي خدمة أو اجتماع مجموعة، وتدعم سير عمل تسجيل الوصول، وتقدّم تقارير عن اتجاهات الحضور وملخصاته.

</div>

**المسار الأساسي:** `/attendance`

## الفروع

المسار الأساسي: `/attendance/campuses`

وحدة تحكم CRUD قياسية (ترث من GenericCrudController). توفّر مسارات `getById` و`getAll` و`post` و`delete` عبر فئة CRUD الأساسية.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | عرض جميع فروع الكنيسة |
| GET | `/:id` | JWT | — | الحصول على فرع حسب المعرّف |
| POST | `/` | JWT | Services.Edit | إنشاء الفروع أو تحديثها |
| DELETE | `/:id` | JWT | Services.Edit | حذف فرع |

## الخدمات

المسار الأساسي: `/attendance/services`

ترث من GenericCrudController مع مسارات CRUD هي `getById` و`getAll` و`post` و`delete`. تُستبدل نقطتا `getAll` (`GET /`) و`search` بتطبيقات مخصصة.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | عرض جميع الخدمات (تتضمن معلومات الفرع) |
| GET | `/:id` | JWT | — | الحصول على خدمة حسب المعرّف |
| GET | `/search?campusId=` | JWT | — | البحث عن الخدمات حسب معرّف الفرع |
| POST | `/` | JWT | Services.Edit | إنشاء الخدمات أو تحديثها |
| DELETE | `/:id` | JWT | Services.Edit | حذف خدمة |

### مثال: البحث عن الخدمات حسب الفرع

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## أوقات الخدمات

المسار الأساسي: `/attendance/servicetimes`

ترث من GenericCrudController مع مسارات CRUD هي `getById` و`post` و`delete`. نقطتا `getAll` و`search` تطبيقان مخصصان.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | عرض جميع أوقات الخدمات. للتصفية استخدم `?serviceId=`. أضف `?include=groups` لإلحاق بيانات المجموعات. يتضمن كل صف قيمة منطقية محسوبة `checkinOpen` (تكون false فقط عندما يكون لموعد الخدمة جدول تسجيل وصول ونافذته مغلقة في هذه اللحظة). تُقاس النافذة بالمنطقة الزمنية لفرع الخدمة، ثم المنطقة الزمنية للكنيسة، ثم أول فرع لديه منطقة زمنية، ثم `America/New_York` |
| GET | `/:id` | JWT | — | الحصول على موعد خدمة حسب المعرّف |
| GET | `/search?campusId=&serviceId=` | JWT | — | البحث عن أوقات الخدمات حسب الفرع والخدمة |
| GET | `/public/:churchId` | عام | — | الحصول على شجرة الفرع ← الخدمة ← الوقت لكنيسة معينة. تغذي عنصر `serviceTimes` في منشئ المواقع |
| POST | `/` | JWT | Services.Edit | إنشاء أوقات الخدمات أو تحديثها. حقول الجدول الاختيارية: `dayOfWeek` (0 = الأحد … 6)، و`startTime` / `endTime` (`HH:mm`)، و`checkinOpenMinutes` (قبل البداية)، و`checkinCloseMinutes` (بعد النهاية). لا يخضع تسجيل الوصول لتقييد زمني إلا عندما يتم تعيين كل من `dayOfWeek` و`startTime` |
| DELETE | `/:id` | JWT | Services.Edit | حذف موعد خدمة |

## أوقات خدمات المجموعات

المسار الأساسي: `/attendance/groupservicetimes`

يربط المجموعات بأوقات خدمات محددة.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | عرض جميع ارتباطات المجموعات بأوقات الخدمات. للتصفية استخدم `?groupId=` للحصول على الارتباطات مع أسماء الخدمات |
| GET | `/:id` | JWT | — | الحصول على ارتباط مجموعة بوقت خدمة حسب المعرّف |
| POST | `/` | JWT | Services.Edit | إنشاء ارتباطات المجموعات بأوقات الخدمات أو تحديثها |
| DELETE | `/:id` | JWT | Services.Edit | حذف ارتباط مجموعة بوقت خدمة |

## سجلات الحضور

المسار الأساسي: `/attendance/attendancerecords`

توفّر عروضًا مجمّعة للقراءة فقط لبيانات الحضور لأغراض التقارير والعرض.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | تحميل سجلات الحضور لشخص معين. يتطلب `?personId=` |
| GET | `/my` | JWT | — | ذاتي النطاق: سجلات حضور العضو المسجَّل دخوله خلال آخر 12 شهرًا، من الأحدث إلى الأقدم. يُرجع `401` إذا لم يكن المستخدم مرتبطًا بشخص. يغذي قسم **حضوري** في صفحة "أنا" في B1 |
| GET | `/tree` | JWT | — | تحميل شجرة الحضور الكاملة (الفروع والخدمات وأوقات الخدمات والمجموعات) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | تحميل بيانات اتجاه الحضور مع مرشحات اختيارية |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | تحميل حضور المجموعات لخدمة معينة في أسبوع محدد |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | لكل مجموعة مخصصة لموعد الخدمة، يُرجع `{ groupId, sessionId, attendanceCount }` لذلك التاريخ (`date` بصيغة `YYYY-MM-DD`؛ و`sessionId` يكون null عندما لا تملك المجموعة جلسة). يغذي مربع الحوار **من لا يزال بحاجة إلى تسجيل الحضور** في B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | البحث في سجلات الحضور مع مرشحات (الفرع، والخدمة، وموعد الخدمة، والمجموعة، ونطاق التاريخ) |

### مثال: اتجاه الحضور

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## الجلسات

المسار الأساسي: `/attendance/sessions`

ترث من GenericCrudController مع مسارات CRUD هي `getById` و`delete`. نقطتا `getAll` و`save` تطبيقان مخصصان يسمحان أيضًا لقادة المجموعات بإدارة جلسات مجموعاتهم.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View أو قائد مجموعة | عرض جميع الجلسات. للتصفية استخدم `?groupId=` (تتضمن الأسماء). يمكن لقادة المجموعات عرض جلسات مجموعاتهم |
| GET | `/:id` | JWT | Attendance.View | الحصول على جلسة حسب المعرّف |
| POST | `/` | JWT | Attendance.Edit أو قائد مجموعة | إنشاء الجلسات أو تحديثها. يمكن لقادة المجموعات حفظ جلسات مجموعاتهم |
| DELETE | `/:id` | JWT | Attendance.Edit | حذف جلسة |

## الزيارات

المسار الأساسي: `/attendance/visits`

يدير سجلات الزيارة الفردية (شخص يحضر في تاريخ محدد) ويوفّر سير عمل تسجيل الوصول.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | عرض جميع الزيارات. للتصفية استخدم `?personId=` |
| GET | `/:id` | JWT | Attendance.View | الحصول على زيارة حسب المعرّف |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View أو Attendance.Checkin | تحميل بيانات تسجيل الوصول للأشخاص في خدمة معينة. يُرجع الزيارات مع جلسات الزيارات من آخر تاريخ مسجَّل |
| POST | `/` | JWT | Attendance.Edit | إنشاء الزيارات أو تحديثها |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit أو Attendance.Checkin | إرسال بيانات تسجيل الوصول. يُنشئ الزيارات وجلسات الزيارات أو يحدّثها، ويحذف السجلات القديمة |
| DELETE | `/:id` | JWT | Attendance.Edit | حذف زيارة |

### مثال: سير عمل تسجيل الوصول

**الخطوة 1 -- تحميل بيانات تسجيل الوصول الحالية:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**الخطوة 2 -- إرسال تسجيل الوصول:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

إذا كان لموعد الخدمة المستهدف جدول تسجيل وصول ونافذته مغلقة (تُقاس بترتيب المنطقة الزمنية نفسه الذي يبدأ بالفرع كما في `checkinOpen`)، فلا يُحفظ شيء وتكون الاستجابة `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. كما تُرجع تجاوزات السعة ونسبة المتطوعين الاستجابة 409 أيضًا (`error: "capacity"` أو `"ratio"`). أما الجلسات التي يحملها الشخص بالفعل اليوم (وتُعاد إرسالها مع كل تسجيل وصول) فتتخطى فحص النافذة، لذلك يمكن للأسرة إضافة موعد خدمة مفتوح بعد إغلاق نافذة موعد سابق.

## جلسات الزيارات

المسار الأساسي: `/attendance/visitsessions`

يدير الارتباط بين الزيارات والجلسات (أي جلسة محددة حضرها الشخص خلال الزيارة). ويوفّر أيضًا نقطة تسجيل سريع ونقطة تنزيل/تصدير.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View أو قائد مجموعة | عرض جلسات الزيارات. للتصفية استخدم `?sessionId=`. يمكن لقادة المجموعات عرض جلسات الزيارات لمجموعاتهم |
| GET | `/:id` | JWT | Attendance.View | الحصول على جلسة زيارة حسب المعرّف |
| GET | `/download/:sessionId` | JWT | Attendance.View | تنزيل حضور جلسة (يُرجع أسماء الأشخاص مع حالة الحضور أو الغياب) |
| POST | `/` | JWT | Attendance.Edit | إنشاء جلسات الزيارات أو تحديثها |
| POST | `/log` | JWT | Attendance.Edit أو قائد مجموعة | تسجيل سريع لحضور شخص في جلسة. يُنشئ الزيارة تلقائيًا عند الحاجة. يمكن لقادة المجموعات تسجيل الحضور لمجموعاتهم |
| DELETE | `/:id` | JWT | Attendance.Edit | حذف جلسة زيارة حسب المعرّف |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit أو قائد مجموعة | إزالة شخص من جلسة. يحذف جلسة الزيارة والزيارة الأصلية إذا لم تبقَ جلسات. يمكن لقادة المجموعات إزالة الحضور لمجموعاتهم |

### مثال: التسجيل السريع للحضور

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### مثال: تنزيل حضور الجلسة

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## سلاسل الحضور

المسار الأساسي: `/attendance/streaks`

يتتبع سلاسل الحضور للأفراد، أي عدد الأسابيع المتتالية التي حضر فيها الشخص. مفيد لمقاييس المشاركة وأساليب التحفيز.

| الطريقة | المسار | المصادقة | الصلاحية | الوصف |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | تحميل سلاسل حضور شخص معين |

## صفحات ذات صلة

- [نقاط نهاية العضوية](./membership.md) — الأشخاص والمجموعات والأدوار وإدارة الكنيسة
- [المصادقة والصلاحيات](./authentication.md) — تدفق تسجيل الدخول وJWT ونموذج الصلاحيات
- [بنية الوحدة](../module-structure.md) — أنماط تنظيم الشيفرة
