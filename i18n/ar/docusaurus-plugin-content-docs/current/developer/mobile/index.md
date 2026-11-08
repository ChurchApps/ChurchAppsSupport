---
title: "تطبيقات الجوال"
description: "نظرة عامة على تطبيقات Expo وReact Native من ChurchApps، أي B1 Checkin وLessonsScreen، مع خطوات الإعداد المحلي لأداة Expo المشتركة بينها."
---

# تطبيقات الجوال

<div class="article-intro">

تُبنى تطبيقات ChurchApps للجوال باستخدام **React Native** و**Expo**، وتوفر تجارب أصلية على Android وiOS وAndroid TV. تشترك جميع تطبيقات الجوال في أداة التطوير نفسها المبنية على Expo، لذا فإن من يستطيع بناء أحدها يستطيع بناء جميعها.

</div>

## التطبيقات

| التطبيق | الغرض | المنصة |
|-----|---------|----------|
| B1 Checkin | تطبيق كشك لمحطات تسجيل الحضور | Android وiOS |
| LessonsScreen | تطبيق Android TV لعرض الدروس في الفصول الدراسية | Android TV |

:::info
تطبيق الأعضاء هو B1 App -- قسم `/mobile` في B1App، which يثبّته الأعضاء كتطبيق ويب تقدمي (Progressive Web App). وهو تطبيق ويب، وليس مشروع Expo؛ راجع [تطبيقات الويب](../web-apps/index.md) لتشغيله محليًا.
:::

### B1 Checkin

تطبيق كشك مصمم خصيصًا لمحطات تسجيل الحضور في الكنائس. يوفر واجهة بسيطة سهلة الاستخدام باللمس تمكّن الأعضاء من تسجيل حضور الأطفال وتدوين الحضور في الخدمات والفعاليات.

### LessonsScreen

تطبيق Android TV يعرض محتوى الدروس في الفصول الدراسية. يمكن للمعلمين إرسال شرائح الدروس ومقاطع الفيديو والأنشطة إلى شاشة التلفاز، مما يسهّل عرض المادة الدراسية أثناء الحصص.

## الإعداد المحلي

تشترك جميع تطبيقات الجوال في أداة التطوير نفسها المبنية على Expo، وتتبع أنماط إعداد متشابهة. نأخذ B1 Checkin مثالًا:

1. ثبّت **Node.js** وAndroid Studio (لمحاكي Android) وXcode (لمحاكي iOS، على macOS فقط) -- راجع [المتطلبات الأساسية](../setup/prerequisites.md).
2. استنسخ المستودع وثبّت الاعتماديات (يستخدم B1 Checkin أداة Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. انسخ `dotenv.sample.txt` إلى `.env`، وحدد البيئة التي يجب أن يتصل بها التطبيق (`dev` لواجهة برمجة تطبيقات محلية) -- راجع [متغيرات البيئة](../setup/environment-variables.md#b1checkin-react-native--expo).
4. شغّل خادم تطوير Expo بالأمر `yarn start`، ثم نفّذ `yarn android` أو `yarn ios` لتشغيل التطبيق على محاكٍ أو جهاز.

راجع [نشر تطبيقات الجوال](../deployment/mobile.md) للإصدارات النهائية والتحديثات عبر الهواء (over-the-air).
