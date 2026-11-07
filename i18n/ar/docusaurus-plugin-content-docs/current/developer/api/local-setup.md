---
title: "إعداد واجهة البرمجة المحلية"
---

# إعداد واجهة البرمجة المحلية

<div class="article-intro">

يرشدك هذا الدليل إلى إعداد واجهة برمجة تطبيقات ChurchApps للتطوير المحلي. ستقوم بنسخ المستودع، وضبط اتصالات قاعدة البيانات، وتهيئة المخطط، وتشغيل خادم التطوير مع إعادة التحميل التلقائي.

</div>

<div class="prereqs">
<h4>قبل البدء</h4>

- ثبّت **Node.js 24+** و**Git** و**MySQL 8.0+** -- راجع [المتطلبات الأساسية](../setup/prerequisites)
- أنشئ مستخدم MySQL بصلاحيات إنشاء قواعد البيانات
- راجع مرجع [متغيرات البيئة](../setup/environment-variables) الخاص بإعدادات واجهة البرمجة

</div>

## خطوات الإعداد

### 1. استنساخ المستودع

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. تثبيت الاعتماديات

يستخدم المشروع Yarn (إذ يمنع أحد حراس الأمان تشغيل `npm install`):

```bash
cd Api
yarn install
```

### 3. ضبط متغيرات البيئة

```bash
cp .env.sample .env
```

افتح ملف `.env` واضبط سلاسل اتصال MySQL. تحتاج كل وحدة إلى اتصال قاعدة بيانات خاص بها بالتنسيق الآتي:

```
mysql://root:password@localhost:3306/dbname
```

ستحتاج إلى سلاسل اتصال لقواعد البيانات الست لجميع الوحدات (membership وattendance وcontent وgiving وmessaging وdoing).

### 4. تهيئة قواعد البيانات

```bash
npm run initdb
```

سينشئ هذا الأمر قواعد البيانات الست وجداولها تلقائياً.

:::tip
يمكنك تهيئة قاعدة بيانات وحدة واحدة باستخدام `npm run initdb -- --module=membership` (أو `attendance` أو `content` أو `giving` أو `messaging` أو `doing`).
:::

### 5. تشغيل خادم التطوير

```bash
npm run dev
```

تبدأ واجهة البرمجة مع إعادة التحميل التلقائي على [http://localhost:8084](http://localhost:8084).

## الأوامر الأساسية

| الأمر | الوصف |
|---------|-------------|
| `npm run dev` | تشغيل خادم التطوير مع إعادة التحميل التلقائي (tsx watch) |
| `npm run build` | التنظيف، وترجمة TypeScript، ونسخ الملفات المساعدة |
| `npm run test` | تشغيل الاختبارات باستخدام Jest (مع تقرير التغطية) |
| `npm run test:watch` | تشغيل الاختبارات في وضع المراقبة |
| `npm run lint` | تشغيل ESLint مع الإصلاح التلقائي (ESLint هو المنسّق الوحيد) |

## النشر

لم تعد بيئة الاختبار المرحلي (staging) مستخدمة. تُنشر واجهة البرمجة على بيئة العرض التوضيحي (demo) عند كل دفع إلى `main`، وعلى بيئة الإنتاج عبر سير العمل اليدوي **Deploy Prod**، الذي يطبّق أيضاً ترحيلات قاعدة البيانات المعلّقة. للتفاصيل راجع [نشر واجهة البرمجة](../deployment/apis).

## تطوير المكتبات محلياً

إذا احتجت إلى تطوير مكتبة مشتركة (`@churchapps/helpers` أو `@churchapps/apihelper`) إلى جانب واجهة البرمجة، فابنِها في مساحة عمل [Packages](https://github.com/ChurchApps/Packages) وأضف رابط Yarn مؤقتاً في واجهة البرمجة:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

يتيح لك ذلك اختبار تغييرات المكتبة مع واجهة البرمجة دون نشرها على npm. راجع [المكتبات المشتركة](../shared-libraries/#local-development-against-a-consuming-app) للتفاصيل -- ولا تُضمّن أبداً مسار الرابط الذي يكتبه أمر `yarn link` في ملف `package.json`.

## مقالات ذات صلة

- **[قاعدة البيانات](./database)** -- فهم بنية قاعدة بيانات مستقلة لكل وحدة
- **[بنية الوحدة](./module-structure)** -- كيفية تنظيم المتحكمات والمستودعات والنماذج
- **[المكتبات المشتركة](../shared-libraries/)** -- العمل مع `@churchapps/helpers` و`@churchapps/apihelper`
