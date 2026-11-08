---
title: "نشر تطبيقات الجوال"
description: "يشرح كيفية بناء إصدارات Android و iOS لتطبيقات Expo مثل B1 Checkin، ورفعها إلى متاجر التطبيقات، ودفع تحديثات OTA باستخدام EAS."
---

# نشر تطبيقات الجوال

<div class="article-intro">

تُبنى تطبيقات Expo للجوال من ChurchApps، مثل B1 Checkin، باستخدام **Expo EAS Build** أو بناء Gradle محلي، وتُوزَّع عبر متاجر التطبيقات. تغطي هذه الصفحة بناء الإصدارات ورفعها ودفع تحديثات عبر الهواء (OTA) لكل من Android و iOS، مع استخدام B1 Checkin كمثال.

</div>

<div class="prereqs">
<h4>قبل أن تبدأ</h4>

- جهّز التطبيق محلياً -- راجع [تطبيقات الجوال](../mobile/index.md#local-setup)
- ثبّت [EAS CLI](https://docs.expo.dev/eas/) وأعدّه
- تأكد من امتلاكك صلاحية الوصول إلى Google Play Console (لنظام Android) و/أو Apple App Store Connect (لنظام iOS)

</div>

## البناء

### Android

تُنفَّذ إصدارات Android النهائية محلياً وتُوقَّع بمفتاح التوقيع الإصدار من EAS. نزّله مرة واحدة باستخدام `npx eas-cli credentials -p android` (اختر **credentials.json: Download credentials from EAS**)، ثم شغّل:

```bash
yarn build:android
```

يُكتب حزمة Google Play في المسار `android/app/build/outputs/bundle/release/app-release.aab`. للبناء على EAS بدلاً من ذلك، شغّل `yarn build:android:eas`.

### iOS

تُنفَّذ إصدارات iOS دائماً على EAS:

```bash
yarn build:ios
```

## الرفع إلى متاجر التطبيقات

### Android -- متجر Google Play

ارفع ملف AAB عبر Play Console، أو أرسله باستخدام EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- متجر Apple App Store

أرسل إصدار iOS مباشرة عبر EAS:

```bash
eas submit --platform ios
```

## تحديثات OTA

للتغييرات المتعلقة بجافاسكربت فقط، والتي لا تتطلب مراجعة متجر التطبيقات، استخدم تحديثات عبر الهواء (OTA):

```bash
yarn update
```

يستخدم هذا الأمر EAS Update لإرسال التغييرات مباشرة إلى المستخدمين دون الحاجة إلى رفع كامل إلى المتجر.

:::tip
تحديثات OTA أسرع بكثير من إصدارات المتاجر، إذ يمكن أن تصل التغييرات إلى المستخدمين في دقائق بدلاً من أيام. استخدمها لإصلاح الأخطاء وتعديلات النصوص والتحسينات البسيطة في الواجهة التي لا تتضمن تغييرات في الكود الأصلي.
:::

## أرقام الإصدارات

قبل إنشاء إصدار للمتجر، يجب تحديث أرقام الإصدارات في عدة ملفات:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` و`versionCode`)

يُزاد رقم بناء iOS تلقائياً بواسطة EAS.

:::warning
إن نسيان تحديث أرقام الإصدارات في جميع الملفات سيؤدي إلى فشل البناء أو رفض التطبيق من متجر التطبيقات. تحقق مرة أخرى من كل ملف مذكور أعلاه قبل بدء بناء الإنتاج.
:::

## مقالات ذات صلة

- **[تطبيقات الجوال](../mobile/index.md)** -- دليل الإعداد المحلي والتطوير
- **[نشر واجهات برمجة التطبيقات](./apis.md)** -- نشر الواجهات الخلفية
- **[نشر تطبيقات الويب](./web-apps.md)** -- نشر تطبيقات الواجهة الأمامية للويب
