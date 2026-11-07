---
title: "ओपन लेसन फ़ॉर्मेट"
description: "Lessons.church पर तृतीय-पक्ष पाठ्यक्रम प्रदाताओं के लिए प्रारूप विनिर्देश: प्रदाता ट्री और वेन्यू फ़ीड JSON फ़ील्ड, क्रियाएँ और मीडिया फ़ाइलें।"
---

# ओपन लेसन फ़ॉर्मेट

<div class="article-intro">

ओपन लेसन फ़ॉर्मेट एक मानकीकृत JSON स्कीमा है, जो तृतीय-पक्ष कंटेंट प्रदाताओं को Lessons.church के लिए पाठ्यक्रम प्रकाशित करने की अनुमति देता है। कोई भी संगठन जो इस फ़ॉर्मेट में फ़ीड होस्ट करता है, उसे बाहरी प्रदाता के रूप में जोड़ा जा सकता है, जिससे उसकी सामग्री इन-बिल्ट लाइब्रेरी के साथ-साथ ब्राउज़ और चलाने योग्य बन जाती है।

</div>

## यह कैसे काम करता है

एक प्रदाता दो प्रकार के एंडपॉइंट होस्ट करता है:

1. **प्रोवाइडर ट्री** -- एक ही URL जो प्रोग्रामों, अध्ययनों, लेसनों और वेन्यू की पूरी सूची लौटाता है। हर वेन्यू में विस्तृत लेसन सामग्री की ओर इशारा करने वाला एक फ़ीड URL होता है।
2. **वेन्यू फ़ीड** -- हर वेन्यू के लिए एक URL, जो पूरी लेसन सामग्री (सेक्शन, एक्शन और मीडिया फ़ाइलें) लौटाता है।

जब कोई चर्च Lessons.church में आपका प्रदाता URL जोड़ता है, तो प्लेटफ़ॉर्म उपलब्ध सामग्री खोजने के लिए आपका ट्री फ़ेच करता है, और फिर माँग के अनुसार अलग-अलग वेन्यू फ़ीड फ़ेच करता है।

## प्रोवाइडर ट्री

आपका प्रदाता URL इस संरचना वाला JSON ऑब्जेक्ट लौटाना चाहिए:

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

### ट्री फ़ील्ड

| फ़ील्ड | प्रकार | विवरण |
|-------|------|-------------|
| `programs[].id` | string | अनूठा प्रोग्राम पहचानकर्ता |
| `programs[].name` | string | प्रदर्शित होने वाला नाम |
| `programs[].slug` | string | URL-अनुकूल नाम |
| `programs[].image` | string | प्रोग्राम की छवि का URL (वैकल्पिक) |
| `programs[].about` | string | विवरण (वैकल्पिक) |
| `studies[].id` | string | अनूठा अध्ययन पहचानकर्ता |
| `studies[].name` | string | प्रदर्शित होने वाला नाम |
| `studies[].slug` | string | URL-अनुकूल नाम |
| `studies[].image` | string | अध्ययन की छवि का URL (वैकल्पिक) |
| `lessons[].id` | string | अनूठा लेसन पहचानकर्ता |
| `lessons[].name` | string | प्रदर्शित होने वाला नाम |
| `lessons[].slug` | string | URL-अनुकूल नाम |
| `lessons[].title` | string | पूरा शीर्षक |
| `lessons[].image` | string | लेसन की छवि का URL (वैकल्पिक) |
| `lessons[].description` | string | लेसन का सारांश (वैकल्पिक)। यह लाइब्रेरी ब्राउज़ करने वाले शिक्षकों के लिए कैटलॉग का पाठ है, माता-पिता के घर ले जाने वाला संदेश नहीं। |
| `lessons[].bottomLine` | string | माता-पिता के लिए घर ले जाने वाला एक वाक्य का संदेश (वैकल्पिक) |
| `lessons[].verse` | string | स्मरण वाक्य का संदर्भ और संक्षिप्त पाठ (वैकल्पिक) |
| `lessons[].parentQuestion` | string | माता-पिता के लिए घर पर पूछने हेतु एक प्रश्न (वैकल्पिक) |
| `lessons[].parentNote` | string | माता-पिता के लिए अतिरिक्त वैकल्पिक नोट (markdown) |
| `venues[].id` | string | अनूठा वेन्यू पहचानकर्ता |
| `venues[].name` | string | वेन्यू का नाम (जैसे "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | वह URL जो वेन्यू फ़ीड लौटाता है (नीचे देखें) |

माता-पिता के लिए घर ले जाने वाले चारों फ़ील्ड (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) ट्री और वेन्यू फ़ीड, दोनों में वैकल्पिक हैं। यदि इन्हें छोड़ा जाए, तो इन्हें खाली माना जाता है। इनमें `description` की सामग्री न डालें।

**वेन्यू** एक ही लेसन के अलग-अलग संस्करणों को दर्शाते हैं, जो विभिन्न दर्शकों (आयु वर्ग, परिस्थितियाँ आदि) के लिए तैयार किए गए हों।

## वेन्यू फ़ीड

हर वेन्यू का `apiUrl` इस स्कीमा से मेल खाने वाला JSON ऑब्जेक्ट लौटाना चाहिए:

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

### वेन्यू फ़ीड फ़ील्ड

#### रूट ऑब्जेक्ट

| फ़ील्ड | प्रकार | विवरण |
|-------|------|-------------|
| `id` | string | वेन्यू पहचानकर्ता |
| `name` | string | वेन्यू का नाम |
| `lessonId` | string | लेसन पहचानकर्ता |
| `lessonName` | string | लेसन का प्रदर्शित नाम |
| `lessonImage` | string | लेसन की छवि का URL |
| `lessonDescription` | string | लेसन का सारांश (कैटलॉग का पाठ) |
| `bottomLine` | string | माता-पिता के लिए घर ले जाने वाला एक वाक्य का संदेश (वैकल्पिक) |
| `verse` | string | स्मरण वाक्य का संदर्भ और संक्षिप्त पाठ (वैकल्पिक) |
| `parentQuestion` | string | माता-पिता के लिए घर पर पूछने हेतु एक प्रश्न (वैकल्पिक) |
| `parentNote` | string | माता-पिता के लिए अतिरिक्त वैकल्पिक नोट, markdown में (वैकल्पिक) |
| `studyName` | string | मूल अध्ययन का नाम |
| `studySlug` | string | मूल अध्ययन का slug |
| `programName` | string | मूल प्रोग्राम का नाम |
| `programSlug` | string | मूल प्रोग्राम का slug |
| `programAbout` | string | प्रोग्राम का विवरण |
| `downloads` | array | डाउनलोड योग्य फ़ाइल समूह |
| `sections` | array | क्रमबद्ध लेसन सेक्शन |

#### सेक्शन

| फ़ील्ड | प्रकार | विवरण |
|-------|------|-------------|
| `id` | string | सेक्शन पहचानकर्ता |
| `name` | string | सेक्शन का शीर्षक |
| `sort` | number | प्रदर्शन क्रम |
| `materials` | string | सामग्री या तैयारी से जुड़े नोट (वैकल्पिक) |
| `actions` | array | इस सेक्शन के भीतर क्रमबद्ध एक्शन |

#### एक्शन

| फ़ील्ड | प्रकार | विवरण |
|-------|------|-------------|
| `id` | string | एक्शन पहचानकर्ता |
| `actionType` | string | इनमें से एक: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | पाठ्य सामग्री या मीडिया का लेबल |
| `sort` | number | प्रदर्शन क्रम |
| `role` | string | भूमिका का नाम, जैसे "Leader", "Kids" (वैकल्पिक) |
| `roleId` | string | भूमिका पहचानकर्ता (वैकल्पिक) |
| `files` | array | `play` एक्शन के लिए मीडिया फ़ाइलें (वैकल्पिक) |

#### फ़ाइल

| फ़ील्ड | प्रकार | विवरण |
|-------|------|-------------|
| `id` | string | फ़ाइल पहचानकर्ता |
| `name` | string | फ़ाइल का नाम |
| `url` | string | सीधा डाउनलोड URL |
| `streamUrl` | string | स्ट्रीमिंग URL, जैसे Vimeo लिंक (वैकल्पिक) |
| `fileType` | string | MIME प्रकार (जैसे `video/mp4`, `image/jpeg`) |
| `seconds` | number | ऑडियो/वीडियो की अवधि सेकंड में (वैकल्पिक) |
| `bytes` | number | फ़ाइल का आकार बाइट्स में (वैकल्पिक) |
| `thumbnail` | string | थंबनेल छवि का URL (वैकल्पिक) |
| `loop` | boolean | क्या मीडिया लूप होना चाहिए (वैकल्पिक, डिफ़ॉल्ट false) |

#### डाउनलोड

| फ़ील्ड | प्रकार | विवरण |
|-------|------|-------------|
| `name` | string | डाउनलोड समूह का नाम (जैसे "Printable Materials") |
| `files` | array | इस डाउनलोड समूह की फ़ाइलें (ऊपर दिए `File` के समान फ़ील्ड) |

## एक्शन के प्रकार

| प्रकार | उद्देश्य |
|------|---------|
| `play` | मीडिया प्लेबैक -- वीडियो, ऑडियो या स्लाइडशो। इसमें `files` शामिल होना चाहिए। |
| `text` | स्थिर पाठ्य सामग्री। markdown-शैली का बोल्ड (`**text**`) समर्थित है। |
| `question` | दर्शकों के लिए चर्चा या चिंतन का प्रश्न। |
| `quote` | एक हाइलाइट किया गया उद्धरण या धर्मग्रंथ का अंश। |
| `subhead` | किसी सेक्शन के भीतर एक शीर्षक या विभाजक। |

:::tip
फ़ीड को कार्य करते हुए देखने के लिए, आप `https://api.lessons.church/lessons/public/tree` पर Lessons.church का बिल्ट-इन कंटेंट ट्री देख सकते हैं और उसमें से किसी भी वेन्यू फ़ीड URL को फ़ेच कर सकते हैं।
:::
