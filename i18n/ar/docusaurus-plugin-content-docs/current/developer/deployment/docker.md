---
title: "الاستضافة الذاتية باستخدام Docker"
description: "ثبّت بيئة خاصة لـ B1 Admin وبوابة الأعضاء والواجهة البرمجية وقاعدة بيانات MySQL على جهازك باستخدام Docker، ثم حدّثها وانسخها احتياطياً بأمر b1."
---

# الاستضافة الذاتية باستخدام Docker

<div class="article-intro">

شغّل نسختك الخاصة من B1 Admin وبوابة أعضاء B1 والموقع الإلكتروني وواجهة API وقاعدة بيانات MySQL على أي جهاز يعمل بـ Docker، سواء كان خادماً منزلياً أو خادماً افتراضياً صغيراً أو جهازاً داخلياً. يثبّته أمر واحد، ويحدّثه أمر واحد، وتأخذ كل عملية تحديث نسخة احتياطية أولاً. إذا كنت تفضّل ألّا تدير خادماً على الإطلاق، فراجع [الاستضافة الذاتية على Railway](./railway-template.md) كبديل مُدار.

</div>

## البدء السريع

<div class="prereqs">
<h4>ما تحتاجه</h4>

- جهاز Linux (أو macOS / Windows مع WSL أو Git Bash، فأداة `b1` المساعدة هي سكربت bash) مع [Docker Engine](https://docs.docker.com/engine/install/) و Compose v2 (متضمّن في Docker Desktop)
- حوالي 2 غيغابايت من الذاكرة العشوائية (RAM) و 5 غيغابايت من مساحة القرص
- للموقع العام: اسم نطاق يشير إلى الجهاز، مع إمكانية الوصول إلى المنفذين 80 و 443

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

إذا حذفت `--domain`، فسيعمل التطبيق على `http://localhost`. ينشئ المثبّت مجلد `b1church`، ويكتب ملف `.env` بأسرار مُولَّدة حديثاً، ويسحب الصور الجاهزة من GitHub Container Registry، وينتظر حتى تُبلغ API بأنها سليمة. لا يُبنى أي شيء على جهازك، لذا يستغرق التشغيل الأول دقيقة أو دقيقتين.

عند الانتهاء:

1. افتح **https://church.example.org/admin** (أو http://localhost/admin) واضغط **Register**. يصبح أول حساب تلقائياً مسؤول الخادم.
2. اتبع التعليمات داخل التطبيق لإنشاء كنيستك الأولى. يصبح موقعها وبوابة أعضائها متاحَين على **https://church.example.org/** بمجرد إنشائها.

يعمل كل شيء خلف نطاق واحد:

| المسار | الخدمة |
|------|---------|
| `/` | B1App — موقع الكنيسة الإلكتروني وبوابة الأعضاء |
| `/admin` | B1Admin — لوحة تحكم الموظفين |
| `/api` | API، والملفات المرفوعة، وWebSocket للتحديثات المباشرة |

HTTPS يعمل تلقائياً: يحصل وكيل [Caddy](https://caddyserver.com/) المرفق على شهادة Let's Encrypt للنطاق المحدد في `.env` ويجدّدها. المنفذان 80 و 443 فقط مكشوفان، أما قاعدة البيانات فلا يمكن الوصول إليها إلا من داخل شبكة Docker.

## أمر `b1`

يترك المثبّت سكربت `deploy/b1` بجوار `docker-compose.yml`. وهو الأداة الوحيدة التي تحتاجها يومياً:

| الأمر | الوظيفة |
|---------|--------------|
| `./deploy/b1 upgrade` | سحب الإصدار الحالي، وأخذ نسخة احتياطية، وإعادة التشغيل، والتحقق من سلامة API |
| `./deploy/b1 upgrade 2026.10.1` | نفس الأمر، مع تثبيته على إصدار محدد |
| `./deploy/b1 backup` | أخذ لقطة من قاعدة البيانات والملفات المرفوعة وملف `.env` وحفظها في `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | استعادة لقطة (تتوقف API أثناء التشغيل) |
| `./deploy/b1 rollback` | استعادة أحدث نسخة احتياطية، بما في ذلك الإصدار الذي أُخذت عليه |
| `./deploy/b1 status` | الإصدار المثبّت وصحة الحاويات |
| `./deploy/b1 logs api` | متابعة سجلات خدمة معيّنة |

تُنشر الإصدارات كحزمة واحدة مُرقَّمة، لتبقى الصور الثلاث متطابقة دائماً. يتتبّع `B1_VERSION=stable` في `.env` أحدث إصدار؛ اضبطه على إصدار محدد للتثبيت عليه. ملاحظات الإصدارات موجودة ضمن [إصدارات B1Admin](https://github.com/ChurchApps/B1Admin/releases).

## الإعدادات

جميع الإعدادات موجودة في `.env` بجوار `docker-compose.yml`. يملأ المثبّت الإعدادات المطلوبة:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

بعد تعديل `.env`، طبّق التغييرات باستخدام `docker compose up -d`. تعرف تطبيقات الويب الواجهة البرمجية التي يجب التواصل معها من العنوان الموجود في المتصفح، لذا فإن تغيير النطاق يتطلب فقط تحديث `SITE_ADDRESS` و `PUBLIC_URL` وإعادة التشغيل، دون إعادة بناء.

:::warning
احفظ ملف `.env` في مكان آمن. يحمي `ENCRYPTION_KEY` بيانات اعتماد بوابات الدفع وأنظمة التخزين المحفوظة، والنسخة الاحتياطية بدونه لا يمكنها فك تشفيرها. يتضمن الأمر `./deploy/b1 backup` نسخة منه لهذا السبب.
:::

### الانتقال إلى نطاق لاحقاً

إذا ثبّتَّ على `localhost` وأردت لاحقاً جعله عاماً: وجّه DNS إلى الجهاز، واضبط `DOMAIN` و `SITE_ADDRESS` (النطاق المجرد) و `PUBLIC_URL` (`https://` + النطاق) في `.env`، ثم نفّذ `docker compose up -d`. يجلب Caddy الشهادة عند أول طلب.

## البريد الإلكتروني والتبرعات وتعدد المواقع والتكاملات

تعمل هذه الميزات تماماً كما على Railway، بنفس متغيرات البيئة، لكن تُضبط في `.env` بدلاً من لوحة تحكم Railway:

- **[البريد الإلكتروني / SMTP](./railway-template.md#1-email-highly-recommended)**: أدلة الإعداد لـ Resend وBrevo وGmail
- **[تعدد المواقع](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)**: عدد غير محدود من الكنائس في كل نسخة. يخدم `/` الكنيسة التي يطابق معرّفها `DEFAULT_CHURCH_SLUG` (الكنيسة الأولى معرّفها `church`). وجّه النطاقات الإضافية إلى الجهاز، ثم اربطها ضمن **الإعدادات ← النطاقات** في B1Admin
- **[التبرعات عبر الإنترنت](./railway-template.md#4-online-giving-stripe--paypal)**: يُضبط لكل كنيسة من واجهة الإدارة
- **[التكاملات الاختيارية](./railway-template.md#6-optional-feature-integrations)**: `OPENAI_API_KEY` و`YOUTUBE_API_KEY` و`PEXELS_KEY` و`VIMEO_TOKEN` و`API_BIBLE_KEY` و`GOOGLE_RECAPTCHA_SECRET_KEY`
- **[إشعارات الدفع](#push-notifications)**: `WEB_PUSH_*`. يترك المثبّت هذه القيم فارغة، لذا تكون الإشعارات معطلة حتى تضيفها

تُفعَّل الدعوات والرسائل الأخرى التي ترسلها الكنيسة تلقائياً على النسخة المستضافة ذاتياً (أما الخدمة المستضافة فتُخضع هذه الرسائل لمراجعة يدوية لحماية سمعة المرسل).

## إشعارات الدفع

تبقى إشعارات الدفع للمتصفح والويب المتنقل معطلة حتى يحصل الخادم على زوج مفاتيح VAPID. لا ينشئ المثبّت هذا الزوج. وإلى أن تضيفه، تقول صفحة الإشعارات في تطبيق الويب المتنقل إن الإشعارات الفورية غير مفعّلة للموقع.

1. أنشئ زوج مفاتيح. لا يحتاج هذا إلا إلى Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. أضف القيمتين إلى `.env`. `WEB_PUSH_SUBJECT` اختياري، وهو عنوان التواصل الذي تراه خدمات الدفع:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. طبّقها:

   ```bash
   docker compose up -d
   ```

4. للتأكد، افتح **Server Admin ← Server Health** في B1Admin. يجب أن تظهر مفاتيح Web Push الاثنان كمُعدّة. عندها يمكن للأعضاء تفعيل الإشعارات من تطبيق الويب المتنقل.

:::warning
احتفظ بالمفاتيح نفسها بعد أن يشترك الأعضاء. تغييرها يُبطل كل الاشتراكات الحالية، ويجب على كل جهاز أن يسجّل من جديد.
:::

## البيانات والنسخ الاحتياطية وتخزين الملفات

تحتفظ ثلاثة مجلدات Docker مسمّاة بكل الحالة:

| المجلد | المحتوى |
|--------|----------|
| `b1church_mysql-data` | جميع مخططات قواعد البيانات |
| `b1church_api-content` | الملفات المرفوعة: الصور والمستندات وصور الموقع |
| `b1church_caddy-data` | شهادات TLS |

يكتب `./deploy/b1 backup` لقطة متسقة من الاثنين الأولين بالإضافة إلى `.env` في `backups/<timestamp>/`. جدوِلها عبر cron وانسخ المجلد إلى مكان خارج الجهاز:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

لمكتبات الوسائط الكبيرة يمكنك التحويل إلى تخزين الملفات على S3. اضبط `FILE_STORE=S3` مع متغيرات `AWS_*` الموضّحة في [قسم تخزين الملفات في دليل Railway](./railway-template.md#5-file-storage). النسخ الاحتياطية لقاعدة البيانات لا تشمل كائنات S3، لذا فعّل إصدارات الحاوية (bucket versioning) هناك.

## التحديث

```bash
./deploy/b1 upgrade
```

بالترتيب: يسحب الإصدار، ويأخذ نسخة احتياطية، ويعيد إنشاء الحاويات، ويشغّل أي ترحيلات معلّقة لقاعدة البيانات عند بدء API، وينتظر فحص السلامة الخاص بـ API. إذا فشل أي شيء، يتوقف ويطلب منك تشغيل `./deploy/b1 rollback`، الذي يستعيد تلك النسخة الاحتياطية والإصدار السابق. الترحيلات تسير للأمام فقط، والتراجع يعني دائماً استعادة اللقطة.

الترقية من ملف compose التجريبي (الذي كان يبني الصور من المصدر) تعمل بالطريقة نفسها بعد أن يكون لديك ملف `.env`. كان ذلك الملف يستخدم `MYSQL_ROOT_PASSWORD=churchapps` افتراضياً، لذا ضع هذا في `.env` مع `PUBLIC_URL` و`SITE_ADDRESS`، واستبدل `docker-compose.yml` ومجلد `deploy/` بالملفات الحالية، ثم نفّذ `./deploy/b1 upgrade`.

## البناء من المصدر

يمكن للمطورين بناء الصور محلياً بدلاً من سحبها:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

يوجّه `API_CONTEXT` و`B1APP_CONTEXT` في `.env` عمليات البناء إلى نسخ محلية (مثل `../Api`) أو إلى مرجع git.

## استكشاف الأخطاء وإصلاحها

| الأعراض | السبب المحتمل | الحل |
|---------|--------------|-----|
| تعيد حاوية `api` التشغيل باستمرار | فشل ترحيل أو كلمة مرور قاعدة بيانات خاطئة | `./deploy/b1 logs api`، يوضّح سجل الترحيل أي وحدة فشلت |
| تسجّل `api` الرسالة "ENCRYPTION_KEY must be exactly 32 characters" | مفتاح مُعدَّل يدوياً أو مقتطع في `.env` | استعد المفتاح الأصلي المكوّن من 32 حرفاً (أنشئ مفتاحاً جديداً فقط إذا لم تكن هناك بيانات اعتماد محفوظة بعد) |
| يعرض المتصفح تحذير شهادة | DNS لا يشير إلى هنا بعد، أو المنفذ 80/443 محجوب | أصلح DNS أو الجدار الناري؛ يعيد Caddy المحاولة تلقائياً |
| يعرض `/` لوحة تحكم بدلاً من الموقع | لا توجد كنيسة بعد، أو `DEFAULT_CHURCH_SLUG` غير مطابق | أنشئ الكنيسة، أو اضبط المعرّف من **الإعدادات ← الكنيسة** |
| تظهر رسالة "Check your email" ولا تصل أي رسالة | `MAIL_SYSTEM=SMTP` ببيانات اعتماد خاطئة | أصلح بيانات الاعتماد، أو احذف `MAIL_SYSTEM` لتعطيل البريد |
| يقول تطبيق الويب المتنقل إن إشعارات الدفع غير مفعّلة | لا توجد مفاتيح VAPID على الخادم | أضفها كما هو موضّح في [إشعارات الدفع](#push-notifications) |
| ميزات الدردشة والبث المباشر لا تعمل | الـ websocket محجوب بوكيل آخر أمامه | يعمل السوكيت على `/api/` عبر المنفذ نفسه؛ اسمح بترويسات `Upgrade` |
| يرفض `install` مع "database volume already exists" | بقايا من تثبيت سابق | `docker compose down -v` لمسحها، أو اكتب `.env` واستخدم `upgrade` |

ما زلت عالقاً؟ افتح مشكلة على [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) مع مخرجات `./deploy/b1 logs`.

## مقالات ذات صلة

- **[الاستضافة الذاتية على Railway](./railway-template.md)**: بديل الاستضافة المُدارة، إضافة إلى أدلة الإعداد المشتركة بعد النشر
- **[الإعداد الأولي](../../getting-started/initial-setup.md)**: الخطوات الأولى بعد إنشاء كنيستك
- **[إعداد API المحلي](../api/local-setup.md)**: تشغيل المنظومة مباشرة للتطوير
