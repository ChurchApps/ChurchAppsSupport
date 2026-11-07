---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile هو تطبيق الجوال الرئيسي لأعضاء الكنيسة ضمن ChurchApps، ومبني باستخدام React Native وExpo. يتيح للأعضاء تصفح الدليل، والوصول إلى صفحة العطاء، وتسجيل الحضور، واستلام الإشعارات، والتفاعل مع مجتمع كنيستهم.

</div>

<div class="prereqs">
<h4>قبل البدء</h4>

- ثبّت **Node.js** و**Expo CLI** -- راجع [المتطلبات الأساسية](../setup/prerequisites)
- ثبّت **Android Studio** (لمحاكي Android) أو **Xcode** (لمحاكي iOS)
- اضبط عنوان واجهة البرمجة الخاصة بك (تجريبي أو محلي) -- راجع [متغيرات البيئة](../setup/environment-variables)

</div>

## الإعداد

1. انسخ المستودع:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. ثبّت الاعتماديات:

   ```bash
   cd B1Mobile && npm install
   ```

3. اضبط متغيرات البيئة -- انسخ الملف النموذجي وحدّث نقاط نهاية واجهة البرمجة:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. شغّل خادم التطوير الخاص بـ Expo:

   ```bash
   npm start
   ```

:::tip
يمكنك استخدام تطبيق **Expo Go** على جهاز فعلي للاختبار السريع دون إعداد Android Studio أو Xcode.
:::

## متغيرات البيئة

| المتغير | الوصف |
|----------|-------------|
| `STAGE` | مرحلة البيئة (مثل `dev` و`staging` و`prod`) |
| `CONTENT_ROOT` | عنوان URL الجذر لتقديم المحتوى |
| `MEMBERSHIP_API` | نقطة نهاية واجهة برمجة العضوية |
| `MESSAGING_API` | نقطة نهاية واجهة برمجة الرسائل |
| `ATTENDANCE_API` | نقطة نهاية واجهة برمجة الحضور |
| `GIVING_API` | نقطة نهاية واجهة برمجة العطاء |
| `DOING_API` | نقطة نهاية واجهة برمجة المهام |
| `CONTENT_API` | نقطة نهاية واجهة برمجة المحتوى |
| `LESSONS_ROOT` | عنوان URL الجذر لمحتوى الدروس |

## الأوامر الرئيسية

| الأمر | الوصف |
|---------|-------------|
| `npm start` | تشغيل خادم التطوير الخاص بـ Expo |
| `npm run android` | التشغيل على محاكي Android |
| `npm run ios` | التشغيل على محاكي iOS |
| `npm run test` | تشغيل الاختبارات (Jest) |

## بناءات الإنتاج

قبل إنشاء بناء إنتاج، حدّث أرقام الإصدار في جميع الملفات التالية:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

يستخدم هذا الأمر EAS Build لإنشاء ملف Android الثنائي.

### iOS

```bash
eas build --platform ios --profile production
```

### تحديثات OTA

لدفع تحديث عبر الهواء (دون المرور بمراجعة متجر التطبيقات):

```bash
npm run update:production
```

:::info
تحديثات OTA مثالية للتغييرات الخاصة بJavaScript فقط. إذا عدّلت الكود الأصلي أو الاعتماديات، فيجب عليك تقديم بناء كامل إلى المتجر بدلاً من ذلك.
:::

## مقالات ذات صلة

- **[نشر تطبيقات الجوال](../deployment/mobile)** -- دليل شامل لبناء تطبيقات الجوال وتقديمها ونشرها
- **[متغيرات البيئة](../setup/environment-variables)** -- المرجع الكامل لإعدادات بيئة الجوال
