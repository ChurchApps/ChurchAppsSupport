---
title: "متغيرات البيئة"
---

# متغيرات البيئة

<div class="article-intro">

تستخدم كل مشاريع ChurchApps ملف `.env` للإعدادات المحلية. يتضمن كل مشروع ملف عينة تنسخه وتعدّله حسب حاجتك. تغطي هذه الصفحة متغيرات البيئة الخاصة بواجهات برمجة التطبيقات (APIs) وتطبيقات الويب وتطبيقات الجوال، بما في ذلك كيفية الاختيار بين الواجهة التجريبية والواجهة المحلية.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- ثبّت [المتطلبات الأساسية](./prerequisites) الخاصة بمشروعك
- استنسخ مستودع المشروع الذي تريد العمل عليه
- راجع [نظرة عامة على المشروع](./project-overview) لتعرف وحدات واجهة البرمجة التي يحتاجها مشروعك

</div>

## النمط العام

1. ابحث عن `dotenv.sample.txt` أو `.env.sample` في جذر المشروع.
2. انسخه إلى `.env`.
3. عدّل القيم حسب الحاجة.

```bash
# مثال لمشروع يحتوي على .env.sample
cp .env.sample .env

# مثال لمشروع يحتوي على dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**لا تُضف ملفات `.env` أبداً إلى نظام التحكم بالإصدارات.** فهي تحتوي على أسرار مثل بيانات اعتماد قاعدة البيانات ومفاتيح واجهات البرمجة ومفاتيح JWT السرية. تتضمن جميع مشاريع ChurchApps الملف `.env` في `.gitignore`، لكن تحقّق دائماً قبل الإيداع.
:::

## اختيار هدف واجهة البرمجة

القرار الأهم هو تحديد المكان الذي تشير إليه الواجهة الأمامية في طلبات واجهة البرمجة. هناك خياران:

### الخيار 1: واجهات البرمجة التجريبية (موصى به لتطوير الواجهة الأمامية)

استخدم بيئة العرض التجريبية المشتركة. لا حاجة إلى إعداد واجهة برمجة محلية أو قاعدة بيانات. تعمل هذه البيئة بأحدث كود من `main`، ويُعاد ملء بياناتها التجريبية كل ليلة.

```bash
# نمط عنوان URL الأساسي
https://api.demo.churchapps.org/{module}

# أمثلة على عناوين URL للوحدات
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
تم إيقاف بيئة التجهيز (`api.staging.churchapps.org` و`api.staging.lessons.church` والمضيفات المرتبطة بها). قد تحتوي بعض ملفات `.env` النموذجية على عناوين التجهيز؛ استبدلها بالقيم التجريبية أو المحلية الموضحة في هذه الصفحة. لا توجد واجهة برمجة مشتركة لـ Lessons غير الإنتاجية -- شغّل [LessonsApi](https://github.com/ChurchApps/LessonsApi) محلياً (يستمع على المنفذ `8090`) عند الحاجة إليها.
:::

### الخيار 2: واجهة برمجة محلية

شغّل مشروع Api على جهازك. يتطلب ذلك MySQL 8.0 أو أحدث مع قواعد بيانات منشأة لكل وحدة. راجع دليل [الإعداد المحلي لواجهة البرمجة](../api/local-setup).

```bash
# نمط عنوان URL الأساسي
http://localhost:8084/{module}

# أمثلة على عناوين URL للوحدات
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## متغيرات البيئة لواجهة البرمجة

يحتوي مشروع **Api** الأساسي (`.env.sample`) على أكبر قدر من الإعدادات. إليك المتغيرات الرئيسية:

### الإعدادات المشتركة

| المتغير | الوصف | مثال |
|----------|-------------|---------|
| `ENVIRONMENT` | بيئة التشغيل | `dev` |
| `SERVER_PORT` | منفذ HTTP لخادم التطوير المحلي | `8084` |
| `ENCRYPTION_KEY` | مفتاح تشفير بطول 192 بت للبيانات الحساسة | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | السر المستخدم لتوقيع رموز JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | مكان تخزين الملفات المرفوعة (`disk` أو `s3`) | `disk` |
| `CORS_ORIGIN` | أصول CORS المسموح بها (`*` للتطوير المحلي) | `*` |

### اتصال قاعدة البيانات

يشير عنوان URL أساسي واحد واجهة البرمجة إلى MySQL. تستنتج واجهة البرمجة قاعدة بيانات واحدة لكل وحدة (`/membership` و`/attendance` و`/content` و`/giving` و`/messaging` و`/doing` و`/reporting`) من هذا العنوان الأساسي.

| المتغير | مثال |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
حدّث `root:password` ببيانات اعتماد MySQL الفعلية لديك. يجب أن تكون كل قاعدة بيانات خاصة بوحدة موجودة قبل تشغيل واجهة البرمجة. استخدم `npm run initdb` لإنشاء المخطط لجميع الوحدات، أو `npm run initdb:membership` لوحدة واحدة.
:::

### إعدادات WebSocket

| المتغير | الوصف | مثال |
|----------|-------------|---------|
| `SOCKET_PORT` | المنفذ الخاص بخادم WebSocket | `8087` |
| `SOCKET_URL` | عنوان WebSocket الذي تتصل به العملاء | `ws://localhost:8087` |

---

## متغيرات البيئة لتطبيقات الويب

### B1Admin (React + Vite)

ملف العينة: `.env.sample`

| المتغير | الوصف | مثال (تجريبي) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | اسم البيئة | `demo` |
| `PORT` | منفذ خادم التطوير | `3101` |
| `REACT_APP_API_BASE` | عنوان URL أساسي واحد لجميع واجهات برمجة ChurchApps (تُلحق `/membership` و`/attendance` و`/content` و`/giving` و`/messaging` و`/doing` و`/reporting` تلقائياً) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | عنوان URL لتقديم المحتوى | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | معرّف Google Analytics (اختياري) | `UA-123456789-1` |

لتطوير واجهة البرمجة محلياً، وجّه عنوان URL الأساسي نحو مجموعتك المحلية:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

ملف العينة: `.env.sample`

| المتغير | الوصف | مثال (تجريبي) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | عنوان URL أساسي واحد لجميع واجهات برمجة ChurchApps (تُلحق `/membership` و`/attendance` و`/content` و`/giving` و`/messaging` و`/doing` و`/reporting` تلقائياً) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | عنوان URL لتقديم المحتوى | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | معرّف Google Analytics (اختياري) | `UA-123456789-1` |

:::info
يتطلب Next.js البادئة `NEXT_PUBLIC_` لأي متغير بيئة يجب أن يكون متاحاً في المتصفح. المتغيرات الخاصة بالخادم فقط لا تحتاج هذه البادئة.
:::

### LessonsApp (Next.js)

ملف العينة: `dotenv.sample.txt`

| المتغير | الوصف | مثال (LessonsApi محلي) |
|----------|-------------|----------------------------|
| `STAGE` | مرحلة البيئة (اتركها غير معيّنة أو اجعلها `dev` للتطوير المحلي) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | عنوان URL لواجهة Lessons البرمجية | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | عنوان URL لتقديم المحتوى | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | عنوان URL الأساسي لواجهة ChurchApps البرمجية المستخدم لتسجيل الدخول (يُعتمد فقط عندما لا يكون `STAGE` معيّناً أو يكون `dev`) | `https://api.demo.churchapps.org` |

---

## متغيرات البيئة لتطبيقات الجوال

### B1Mobile (React Native / Expo)

ملف العينة: `dotenv.sample.txt`

| المتغير | الوصف | مثال (تجريبي) |
|----------|-------------|----------------|
| `STAGE` | اسم البيئة | `dev` |
| `MEMBERSHIP_API`، `ATTENDANCE_API`، `GIVING_API`، `DOING_API`، `MESSAGING_API`، `CONTENT_API` | عنوان URL واحد لكل وحدة من وحدات واجهة ChurchApps البرمجية (كل منها يستخدم الإنتاج افتراضياً عند عدم تعيينه) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | واجهة Lessons البرمجية (مضيف منفصل؛ لا توجد واجهة مشتركة غير إنتاجية) | `https://api.lessons.church` |
| `CONTENT_ROOT` | عنوان URL لتقديم المحتوى | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | عنوان URL لموقع Lessons | `https://lessons.church` |

:::info
لا تستخدم تطبيقات الجوال البادئة `REACT_APP_` أو `NEXT_PUBLIC_`. يتم التعامل مع الوصول إلى متغيرات البيئة عبر إعدادات Expo.
:::

---

## مرجع سريع: مواقع ملفات العينة

| المشروع | ملف العينة |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
