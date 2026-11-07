---
title: "تنسيق الدرس المفتوح"
---

# تنسيق الدرس المفتوح

<div class="article-intro">

تنسيق الدرس المفتوح هو مخطط JSON موحّد يتيح لمزوّدي المحتوى من الجهات الخارجية نشر مناهج لـ Lessons.church. يمكن إضافة أي مؤسسة تستضيف خلاصة (feed) بهذا التنسيق كمزوّد خارجي، فيصبح محتواها قابلاً للتصفح والتشغيل جنباً إلى جنب مع المكتبة المدمجة.

</div>

## كيف يعمل

يستضيف المزوّد نوعين من نقاط النهاية:

1. **شجرة المزوّد** -- عنوان URL واحد يعيد الفهرس الكامل للبرامج والدراسات والدروس والأماكن (venues). يتضمن كل مكان عنوان خلاصة يشير إلى محتوى الدرس التفصيلي.
2. **خلاصة المكان** -- عنوان URL واحد لكل مكان، يعيد المحتوى الكامل للدرس (الأقسام والإجراءات وملفات الوسائط).

عندما تضيف كنيسة عنوان المزوّد الخاص بك في Lessons.church، تجلب المنصة الشجرة لاكتشاف المحتوى المتاح، ثم تجلب خلاصات الأماكن الفردية عند الطلب.

## شجرة المزوّد

يجب أن يعيد عنوان URL الخاص بالمزوّد كائن JSON بهذه البنية:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "title": "The Baptism of Jesus",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "An introduction to Jesus' ministry.",
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
              "parentQuestion": "What is one promise God has kept in our family?",
              "parentNote": "Pray together thanking God for keeping His promises.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adults",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### حقول الشجرة

| الحقل | النوع | الوصف |
|-------|------|-------------|
| `programs[].id` | string | معرّف فريد للبرنامج |
| `programs[].name` | string | الاسم المعروض |
| `programs[].slug` | string | اسم صديق للروابط (URL) |
| `programs[].image` | string | عنوان URL لصورة البرنامج (اختياري) |
| `programs[].about` | string | الوصف (اختياري) |
| `studies[].id` | string | معرّف فريد للدراسة |
| `studies[].name` | string | الاسم المعروض |
| `studies[].slug` | string | اسم صديق للروابط (URL) |
| `studies[].image` | string | عنوان URL لصورة الدراسة (اختياري) |
| `lessons[].id` | string | معرّف فريد للدرس |
| `lessons[].name` | string | الاسم المعروض |
| `lessons[].slug` | string | اسم صديق للروابط (URL) |
| `lessons[].title` | string | العنوان الكامل |
| `lessons[].image` | string | عنوان URL لصورة الدرس (اختياري) |
| `lessons[].description` | string | ملخص الدرس (اختياري). نص كتالوج للمعلمين الذين يتصفحون المكتبة، وليس ملاحظة للأهل لأخذها إلى البيت. |
| `lessons[].bottomLine` | string | جملة واحدة تلخص الفكرة الأساسية للأهل ليأخذوها إلى البيت (اختياري) |
| `lessons[].verse` | string | مرجع آية الحفظ ونص قصير منها (اختياري) |
| `lessons[].parentQuestion` | string | سؤال واحد يطرحه الأهل في البيت (اختياري) |
| `lessons[].parentNote` | string | ملاحظة إضافية اختيارية للأهل (Markdown) |
| `venues[].id` | string | معرّف فريد للمكان |
| `venues[].name` | string | اسم المكان (مثل "Kids" أو "Adults" أو "Youth") |
| `venues[].apiUrl` | string | عنوان URL الذي يعيد خلاصة المكان (انظر أدناه) |

حقول الملاحظات الأربعة للأهل (`bottomLine` و`verse` و`parentQuestion` و`parentNote`) اختيارية في كل من الشجرة وخلاصة المكان. وإذا حُذفت، تُعامل على أنها فارغة. لا تنسخ `description` إليها.

**الأماكن (Venues)** تمثل نسخاً مختلفة من الدرس نفسه مُصممة لفئات مختلفة من الجمهور (الفئات العمرية، والبيئات، وغير ذلك).

## خلاصة المكان

يجب أن يعيد `apiUrl` الخاص بكل مكان كائن JSON يطابق هذا المخطط:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "bottomLine": "God keeps His promises.",
  "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
  "parentQuestion": "What is one promise God has kept in our family?",
  "parentNote": "Pray together thanking God for keeping His promises.",
  "studyName": "The Beginning",
  "studySlug": "the-beginning",
  "programName": "Gospel of Mark",
  "programSlug": "gospel-of-mark",
  "programAbout": "A 12-week study through the Gospel of Mark.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
      "materials": "Whiteboard and markers",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Key Verse:** Mark 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "What do you know about baptism?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Intro Video",
          "sort": 3,
          "files": [
            {
              "id": "file-1",
              "name": "intro-video.mp4",
              "url": "https://example.com/media/intro.mp4",
              "streamUrl": "https://vimeo.com/123456789",
              "fileType": "video/mp4",
              "seconds": 180,
              "bytes": 52428800,
              "thumbnail": "https://example.com/media/intro-thumb.jpg",
              "loop": false
            }
          ]
        }
      ]
    }
  ]
}
```

### حقول خلاصة المكان

#### الكائن الجذري

| الحقل | النوع | الوصف |
|-------|------|-------------|
| `id` | string | معرّف المكان |
| `name` | string | اسم المكان |
| `lessonId` | string | معرّف الدرس |
| `lessonName` | string | الاسم المعروض للدرس |
| `lessonImage` | string | عنوان URL لصورة الدرس |
| `lessonDescription` | string | ملخص الدرس (نص كتالوج) |
| `bottomLine` | string | جملة واحدة تلخص الفكرة الأساسية للأهل ليأخذوها إلى البيت (اختياري) |
| `verse` | string | مرجع آية الحفظ ونص قصير منها (اختياري) |
| `parentQuestion` | string | سؤال واحد يطرحه الأهل في البيت (اختياري) |
| `parentNote` | string | ملاحظة إضافية اختيارية للأهل، بتنسيق Markdown (اختياري) |
| `studyName` | string | اسم الدراسة الأم |
| `studySlug` | string | اسم الدراسة الأم كصيغة صديقة للروابط |
| `programName` | string | اسم البرنامج الأم |
| `programSlug` | string | اسم البرنامج الأم كصيغة صديقة للروابط |
| `programAbout` | string | وصف البرنامج |
| `downloads` | array | حزم الملفات القابلة للتنزيل |
| `sections` | array | أقسام الدرس المرتبة |

#### القسم

| الحقل | النوع | الوصف |
|-------|------|-------------|
| `id` | string | معرّف القسم |
| `name` | string | عنوان القسم |
| `sort` | number | ترتيب العرض |
| `materials` | string | المواد أو ملاحظات التحضير (اختياري) |
| `actions` | array | الإجراءات المرتبة داخل هذا القسم |

#### الإجراء

| الحقل | النوع | الوصف |
|-------|------|-------------|
| `id` | string | معرّف الإجراء |
| `actionType` | string | واحد من: `play` و`text` و`question` و`quote` و`subhead` |
| `content` | string | المحتوى النصي أو تسمية الوسائط |
| `sort` | number | ترتيب العرض |
| `role` | string | اسم الدور، مثل "Leader" أو "Kids" (اختياري) |
| `roleId` | string | معرّف الدور (اختياري) |
| `files` | array | ملفات الوسائط لإجراءات `play` (اختياري) |

#### الملف

| الحقل | النوع | الوصف |
|-------|------|-------------|
| `id` | string | معرّف الملف |
| `name` | string | اسم الملف |
| `url` | string | رابط التنزيل المباشر |
| `streamUrl` | string | رابط البث، مثل رابط Vimeo (اختياري) |
| `fileType` | string | نوع MIME (مثل `video/mp4` أو `image/jpeg`) |
| `seconds` | number | مدة الصوت أو الفيديو بالثواني (اختياري) |
| `bytes` | number | حجم الملف بالبايت (اختياري) |
| `thumbnail` | string | عنوان URL لصورة مصغّرة (اختياري) |
| `loop` | boolean | ما إذا كان يجب تكرار الوسائط (اختياري، والافتراضي false) |

#### التنزيل

| الحقل | النوع | الوصف |
|-------|------|-------------|
| `name` | string | اسم حزمة التنزيل (مثل "Printable Materials") |
| `files` | array | الملفات الموجودة في حزمة التنزيل هذه (بنفس حقول الملف أعلاه) |

## أنواع الإجراءات

| النوع | الغرض |
|------|---------|
| `play` | تشغيل الوسائط -- فيديو أو صوت أو عرض شرائح. يجب أن يتضمن `files`. |
| `text` | محتوى نصي ثابت. يدعم الخط العريض بتنسيق Markdown (`**النص**`). |
| `question` | سؤال للنقاش أو التأمل موجّه للجمهور. |
| `quote` | اقتباس بارز أو مقطع من الكتاب المقدس. |
| `subhead` | عنوان فرعي أو فاصل داخل القسم. |

:::tip
لمشاهدة مثال عملي للخلاصة قيد التشغيل، يمكنك الاطلاع على شجرة محتوى Lessons.church المدمجة على العنوان `https://api.lessons.church/lessons/public/tree` وجلب أي عنوان خلاصة مكان منها.
:::
