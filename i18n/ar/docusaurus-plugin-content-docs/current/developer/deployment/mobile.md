---
title: "نشر تطبيق الجوال"
---

# نشر تطبيق الجوال

<div class="article-intro">

تُبنى تطبيقات ChurchApps للجوال وتُنشر باستخدام **Expo EAS Build**، وتُوزَّع عبر متاجر التطبيقات. تغطي هذه الصفحة بناء التطبيقات وتقديمها وإرسال تحديثات OTA (عبر الهواء) لكل من Android وiOS.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- إعداد تطبيق الجوال محليًا — راجع [B1 Mobile](../mobile/b1-mobile)
- تثبيت [EAS CLI](https://docs.expo.dev/eas/) وإعداده
- الحصول على صلاحية الوصول إلى Google Play Console (لنظام Android) و/أو Apple App Store Connect (لنظام iOS)

</div>

## البناء

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## تقديم التطبيق إلى متاجر التطبيقات

### Android — متجر Google Play

بعد نجاح بناء EAS، يُقدَّم ملف Android الثنائي (AAB) إلى متجر Google Play عبر Play Console.

### iOS — App Store من Apple

قدِّم بناء iOS مباشرةً عبر EAS:

```bash
eas submit --platform ios
```

## تحديثات OTA

للتغييرات المقتصرة على JavaScript والتي لا تتطلب مراجعة من متجر التطبيقات، استخدم تحديثات OTA (عبر الهواء):

```bash
npm run update:production
```

يستخدم هذا الأمر EAS Update لدفع التغييرات مباشرةً إلى المستخدمين دون الحاجة إلى تقديم كامل للمتجر.

:::tip
تحديثات OTA أسرع بكثير من بناءات المتجر، إذ قد تصل التغييرات إلى المستخدمين خلال دقائق بدلًا من أيام. استخدمها لإصلاح الأخطاء وتعديلات النصوص وتحسينات واجهة المستخدم البسيطة التي لا تتضمن تغييرات في الكود الأصلي.
:::

## أرقام الإصدارات

قبل إنشاء بناء جديد للمتجر، يجب تحديث أرقام الإصدارات في عدة ملفات:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
إن نسيان تحديث أرقام الإصدارات في جميع الملفات سيؤدي إلى فشل البناء أو رفض التطبيق من متجر التطبيقات. تحقّق مرتين من كل ملف مذكور أعلاه قبل بدء بناء الإنتاج.
:::

## مقالات ذات صلة

- **[B1 Mobile](../mobile/b1-mobile)** — دليل الإعداد المحلي والتطوير
- **[API Deployment](./apis)** — نشر واجهات برمجة التطبيقات الخلفية
- **[Web App Deployment](./web-apps)** — نشر تطبيقات الويب الأمامية
