---
title: "LessonsApp"
description: "إعداد محرر الدروس LessonsApp المبني بـ Next.js محلياً على Node.js 22+، وربطه بواجهة LessonsApi محلية، وفهم البناء والنشر عبر S3 وCloudFront."
---

# LessonsApp

<div class="article-intro">

LessonsApp هو تطبيق إدارة محتوى الدروس الخاص بموقع [Lessons.church](https://lessons.church). يوفّر واجهة لإنشاء المناهج الدراسية الكنسية وتنظيمها ونشرها، ومبني باستخدام Next.js وReact.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- ثبّت **Node.js 22+** و**Git** -- راجع [المتطلبات الأساسية](../setup/prerequisites.md)
- اضبط نقطة وصول واجهة برمجة التطبيقات (LessonsApi المحلية) -- راجع [متغيرات البيئة](../setup/environment-variables.md)

</div>

:::warning
يتطلب LessonsApp الإصدار 22 من Node.js أو أحدث. الإصدارات الأقدم غير مدعومة.
:::

## الإعداد

### 1. نسخ المستودع

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. تثبيت الاعتماديات

```bash
cd LessonsApp
npm install
```

### 3. ضبط متغيرات البيئة

انسخ ملف عينة البيئة إلى `.env` واضبط نقاط نهاية واجهة برمجة التطبيقات:

```bash
cp dotenv.sample.txt .env
```

حدّث عناوين نقاط نهاية واجهة البرمجة لتشير إلى نسخة LessonsApi المحلية لديك (`http://localhost:8090`). تم إيقاف واجهة Lessons API التجريبية، لذا استبدل أي عناوين `api.staging.lessons.church` المتبقية في ملف العينة.

### 4. تشغيل خادم التطوير

```bash
npm run dev
```

يبدأ خادم التطوير الخاص بـ Next.js على [http://localhost:3501](http://localhost:3501).

## الأوامر الرئيسية

| الأمر | الوصف |
|---------|-------------|
| `npm run dev` | تشغيل خادم تطوير Next.js على المنفذ 3501 |
| `npm run build` | بناء نسخة الإنتاج عبر Next.js |

## المكدّس التقني

- **Next.js 16** مع TypeScript
- **React 19** لمكونات الواجهة
- حزم **`@churchapps/apphelper*`** للمكونات المشتركة

:::info
يتواصل LessonsApp مع الواجهة الخلفية **LessonsApi**، وهي واجهة برمجة تطبيقات منفصلة عن واجهة ChurchApps Api الرئيسية. تأكد من ضبط بيئتك بنقطة نهاية Lessons API الصحيحة.
:::

## النشر

تُنشر نسخ الإنتاج على **S3 + CloudFront**:

1. يُنشئ `npm run build` نسخة Next.js المحسّنة للإنتاج
2. تُزامَن مخرجات البناء إلى حاوية S3
3. يُطلق إبطال CloudFront لتقديم النسخة الجديدة

:::tip
للاطلاع على تعليمات النشر التفصيلية، راجع دليل [نشر تطبيقات الويب](../deployment/web-apps.md).
:::
