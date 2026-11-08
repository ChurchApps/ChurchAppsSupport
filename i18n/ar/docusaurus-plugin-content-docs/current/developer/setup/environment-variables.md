---
title: "متغيرات البيئة"
description: "إعداد ملفات .env لمشاريع ChurchApps، واختيار واجهة برمجة التطبيقات التجريبية المشتركة أو واجهة محلية، وتعبئة المتغيرات لـ B1 Admin وB1.church وB1 Checkin وغيرها."
---

# متغيرات البيئة

<div class="article-intro">

تستخدم كل مشاريع ChurchApps ملف `.env` للإعدادات المحلية. يتضمن كل مشروع ملفًا نموذجيًا تنسخه ثم تخصّصه. تغطي هذه الصفحة متغيرات البيئة الخاصة بواجهات برمجة التطبيقات وتطبيقات الويب وتطبيقات الجوال، بما في ذلك كيفية الاختيار بين الهدف التجريبي والهدف المحلي.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- ثبّت [المتطلبات الأساسية](./prerequisites.md) لمشروعك
- انسخ (clone) مستودع المشروع الذي تريد العمل عليه
- راجع [نظرة عامة على المشروع](./project-overview.md) لتعرف وحدات واجهة برمجة التطبيقات التي يحتاجها مشروعك

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
**لا تُضف ملفات `.env` أبدًا إلى نظام التحكم في الإصدارات.** فهي تحتوي على بيانات حساسة مثل بيانات اعتماد قاعدة البيانات ومفاتيح واجهات البرمجة وأسرار JWT. تتضمن جميع مشاريع ChurchApps الملف `.env` في `.gitignore`، لكن تأكد دائمًا قبل إجراء الإيداع (commit).
:::

## اختيار هدف واجهة برمجة التطبيقات

القرار الأهم هو تحديد المكان الذي تتجه إليه الواجهة الأمامية عند إجراء استدعاءات واجهة برمجة التطبيقات. هناك خياران:

### الخيار 1: واجهات برمجة التطبيقات التجريبية (موصى به لتطوير الواجهة الأمامية)

استخدم البيئة التجريبية المشتركة. لا حاجة إلى تشغيل واجهة برمجة تطبيقات محلية أو إعداد قاعدة بيانات. تعمل هذه البيئة بأحدث كود من `main`، وتُعاد تعبئة بياناتها التجريبية كل ليلة.

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
تم إيقاف بيئة الاختبار (staging) (`api.staging.churchapps.org` و`api.staging.lessons.church` والمضيفات ذات الصلة). قد تظل بعض ملفات `.env` النموذجية تحتوي على عناوين staging؛ استبدلها بالقيم التجريبية أو المحلية الموضحة في هذه الصفحة. لا توجد واجهة LessonsApi مشتركة وغير إنتاجية -- شغّل [LessonsApi](https://github.com/ChurchApps/LessonsApi) محليًا (يستمع على المنفذ `8090`) عندما تحتاج إليها.
:::

### الخيار 2: واجهة برمجة تطبيقات محلية

شغّل مشروع Api على جهازك. يتطلب MySQL 8.0 أو أحدث مع قواعد بيانات منشأة لكل وحدة. راجع دليل [إعداد واجهة برمجة التطبيقات المحلية](../api/local-setup.md).

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

## متغيرات البيئة لواجهة برمجة التطبيقات

يتضمن مشروع **Api** الأساسي (`.env.sample`) أكبر قدر من الإعدادات. فيما يلي المتغيرات الرئيسية:

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

يشير عنوان URL أساسي واحد واجهةَ برمجة التطبيقات إلى MySQL. تستنتج واجهة برمجة التطبيقات قاعدة بيانات واحدة لكل وحدة (`/membership` و`/attendance` و`/content` و`/giving` و`/messaging` و`/doing` و`/reporting`) من هذا العنوان الأساسي.

| المتغير | مثال |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
حدّث `root:password` ببيانات اعتماد MySQL الفعلية لديك. يجب أن توجد قاعدة بيانات كل وحدة قبل تشغيل واجهة برمجة التطبيقات. استخدم `npm run initdb` لإنشاء المخطط لجميع الوحدات، أو `npm run initdb:membership` لوحدة واحدة.
:::

### إعدادات WebSocket

| المتغير | الوصف | مثال |
|----------|-------------|---------|
| `SOCKET_PORT` | المنفذ الخاص بخادم WebSocket | `8087` |
| `SOCKET_URL` | عنوان WebSocket الذي يتصل به العملاء | `ws://localhost:8087` |

---

## متغيرات البيئة لتطبيقات الويب

### B1Admin (React + Vite)

الملف النموذجي: `.env.sample`

| المتغير | الوصف | مثال (تجريبي) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | اسم البيئة | `demo` |
| `PORT` | منفذ خادم التطوير | `3101` |
| `REACT_APP_API_BASE` | عنوان URL أساسي واحد لجميع واجهات برمجة تطبيقات ChurchApps (تُلحق تلقائيًا `/membership` و`/attendance` و`/content` و`/giving` و`/messaging` و`/doing` و`/reporting`) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | عنوان URL لتقديم المحتوى | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | معرّف Google Analytics (اختياري) | `UA-123456789-1` |

للتطوير باستخدام واجهة برمجة تطبيقات محلية، وجّه عنوان URL الأساسي إلى المجموعة المحلية لديك:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

الملف النموذجي: `.env.sample`

| المتغير | الوصف | مثال (تجريبي) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | عنوان URL أساسي واحد لجميع واجهات برمجة تطبيقات ChurchApps (تُلحق تلقائيًا `/membership` و`/attendance` و`/content` و`/giving` و`/messaging` و`/doing` و`/reporting`) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | عنوان URL لتقديم المحتوى | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | معرّف Google Analytics (اختياري) | `UA-123456789-1` |

:::info
يتطلب Next.js البادئة `NEXT_PUBLIC_` لأي متغير بيئة يجب أن يكون متاحًا في المتصفح. لا تحتاج المتغيرات الخاصة بالخادم فقط إلى هذه البادئة.
:::

### LessonsApp (Next.js)

الملف النموذجي: `dotenv.sample.txt`

| المتغير | الوصف | مثال (LessonsApi محلية) |
|----------|-------------|----------------------------|
| `STAGE` | مرحلة البيئة (اتركه غير محدد أو اجعله `dev` للتطوير المحلي) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | عنوان URL لواجهة Lessons API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | عنوان URL لتقديم المحتوى | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | عنوان URL الأساسي لواجهة برمجة تطبيقات ChurchApps المستخدمة لتسجيل الدخول (يُعتمد فقط عندما يكون `STAGE` غير محدد أو `dev`) | `https://api.demo.churchapps.org` |

---

## متغيرات البيئة لتطبيقات الجوال

### B1Checkin (React Native / Expo)

الملف النموذجي: `dotenv.sample.txt`

| المتغير | الوصف | مثال |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | يحدد مجموعة واجهات برمجة التطبيقات التي يتصل بها التطبيق: `dev` (واجهة محلية على `http://127.0.0.1:8084`)، أو `staging`، أو `prod` (الافتراضي عند عدم التعيين) | `dev` |

يستخدم B1Checkin وحدتي Membership وAttendance من واجهة برمجة التطبيقات فقط، إضافةً إلى عنوان URL لتقديم المحتوى؛ وتُحدَّد عناوينها لكل مرحلة في `src/helpers/EnvironmentHelper.ts`.

:::info
يدرج Expo فقط المتغيرات ذات البادئة `EXPO_PUBLIC_` في حزمة التطبيق. أعد تشغيل خادم التطوير باستخدام `yarn start --reset-cache` بعد تغيير `.env`.
:::

---

## مرجع سريع: مواقع الملفات النموذجية

| المشروع | الملف النموذجي |
|---------|---------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
