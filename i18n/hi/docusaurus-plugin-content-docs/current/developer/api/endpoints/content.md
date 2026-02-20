---
title: "सामग्री एंडपॉइंट"
---

# सामग्री एंडपॉइंट

<div class="article-intro">

Content मॉड्यूल वेबसाइट पृष्ठों, खंडों, तत्वों, ब्लॉक, उपदेशों, प्लेलिस्ट, स्ट्रीमिंग सेवाओं, इवेंट, क्यूरेटेड कैलेंडर, फ़ाइलों, गैलरी, बाइबल अनुवादों और आयत लुकअप, गीतों, अरेंजमेंट, ग्लोबल स्टाइल, स्टॉक फ़ोटो और सेटिंग्स का प्रबंधन करता है। यह API में सबसे बड़ा मॉड्यूल है और सभी ChurchApps एप्लिकेशन में CMS, मीडिया/स्ट्रीमिंग, वर्शिप प्लानिंग और बाइबल सुविधाओं को संचालित करता है।

</div>

**बेस पथ:** `/content`

## पृष्ठ

बेस पथ: `/content/pages`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | URL या ID द्वारा पूर्ण पृष्ठ ट्री (खंड, तत्व, ब्लॉक) लोड करें। URL द्वारा लाने पर आंतरिक ID हटा दिए जाते हैं |
| GET | `/:id` | JWT | — | ID द्वारा पृष्ठ प्राप्त करें |
| GET | `/` | JWT | — | चर्च के सभी पृष्ठ सूचीबद्ध करें |
| POST | `/duplicate/:id` | JWT | Content.Edit | सभी खंडों और तत्वों के साथ पृष्ठ डुप्लिकेट करें |
| POST | `/temp/ai` | JWT | Content.Edit | AI-जनरेटेड पृष्ठ सहेजें (एक कॉल में पृष्ठ, खंड और तत्व) |
| POST | `/` | JWT | Content.Edit | पृष्ठ बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | पृष्ठ हटाएँ |

### उदाहरण: पृष्ठ ट्री लोड करें

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## खंड

बेस पथ: `/content/sections`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा खंड प्राप्त करें |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | खंड डुप्लिकेट करें या पुन: प्रयोज्य ब्लॉक में परिवर्तित करें |
| POST | `/` | JWT | Content.Edit | खंड बनाएँ या अपडेट करें (बैच)। क्रम स्वचालित-अपडेट होता है |
| DELETE | `/:id` | JWT | Content.Edit | खंड हटाएँ (क्रम स्वचालित-अपडेट होता है) |

## तत्व

बेस पथ: `/content/elements`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा तत्व प्राप्त करें |
| POST | `/duplicate/:id` | JWT | Content.Edit | सभी चाइल्ड के साथ तत्व डुप्लिकेट करें |
| POST | `/` | JWT | Content.Edit | तत्व बनाएँ या अपडेट करें (बैच)। पंक्ति कॉलम और कैरोसेल स्लाइड स्वचालित प्रबंधित होते हैं |
| DELETE | `/:id` | JWT | Content.Edit | तत्व हटाएँ |

## ब्लॉक

बेस पथ: `/content/blocks`

मानक CRUD विस्तारित (बेस क्लास से GET `/:id`, GET `/`, POST `/`, DELETE `/:id`, लिखने के लिए Content.Edit अनुमति)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा ब्लॉक प्राप्त करें |
| GET | `/` | JWT | — | सभी ब्लॉक सूचीबद्ध करें |
| GET | `/:churchId/tree/:id` | Public | — | खंडों और तत्वों के साथ पूर्ण ब्लॉक ट्री लोड करें |
| GET | `/blockType/:blockType` | JWT | — | प्रकार द्वारा ब्लॉक लोड करें (जैसे footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | चर्च के लिए फुटर ब्लॉक ट्री लोड करें |
| POST | `/` | JWT | Content.Edit | ब्लॉक बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Content.Edit | ब्लॉक हटाएँ |

## लिंक

बेस पथ: `/content/links`

मानक CRUD विस्तारित (बेस क्लास से GET `/:id`, GET `/`, POST `/`, DELETE `/:id`, लिखने के लिए Content.Edit अनुमति)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा लिंक प्राप्त करें |
| GET | `/` | JWT | — | सभी लिंक सूचीबद्ध करें। वैकल्पिक `?category=` फ़िल्टर। सेव के बाद स्वचालित-सॉर्ट |
| GET | `/church/:churchId/filtered?category=` | JWT | — | दृश्यता द्वारा फ़िल्टर किए गए लिंक लोड करें (सभी, आगंतुक, सदस्य, स्टाफ, समूह) |
| GET | `/church/:churchId?category=` | Public | — | श्रेणी द्वारा चर्च के लिंक लोड करें (सार्वजनिक) |
| POST | `/` | JWT | Content.Edit | लिंक बनाएँ या अपडेट करें (बैच)। श्रेणी द्वारा स्वचालित-सॉर्ट |
| DELETE | `/:id` | JWT | Content.Edit | लिंक हटाएँ |

## ग्लोबल स्टाइल

बेस पथ: `/content/globalStyles`

मानक CRUD विस्तारित (बेस क्लास से POST `/`, DELETE `/:id`, लिखने के लिए Content.Edit अनुमति)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | चर्च के लिए ग्लोबल स्टाइल लोड करें (सेट न होने पर डिफ़ॉल्ट लौटाता है) |
| GET | `/` | JWT | — | प्रमाणित चर्च के लिए ग्लोबल स्टाइल लोड करें |
| POST | `/` | JWT | Content.Edit | ग्लोबल स्टाइल बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Content.Edit | ग्लोबल स्टाइल हटाएँ |

## पृष्ठ इतिहास

बेस पथ: `/content/pageHistory`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | पृष्ठ के लिए इतिहास प्रविष्टियाँ सूचीबद्ध करें |
| GET | `/block/:blockId` | JWT | Content.Edit | ब्लॉक के लिए इतिहास प्रविष्टियाँ सूचीबद्ध करें |
| GET | `/:id` | JWT | Content.Edit | ID द्वारा इतिहास प्रविष्टि प्राप्त करें |
| POST | `/` | JWT | Content.Edit | पृष्ठ/ब्लॉक स्नैपशॉट सहेजें। समय-समय पर 30 दिन से पुरानी प्रविष्टियाँ साफ़ करता है |
| POST | `/restore/:id` | JWT | Content.Edit | इतिहास स्नैपशॉट से पृष्ठ/ब्लॉक पुनर्स्थापित करें (वर्तमान सामग्री हटाता है और स्नैपशॉट से पुनः बनाता है) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | इनलाइन स्नैपशॉट ऑब्जेक्ट से पुनर्स्थापित करें। बॉडी: `{ pageId, blockId, snapshot }` |

## उपदेश

बेस पथ: `/content/sermons`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | एक नमूना FreeShow प्लेलिस्ट संरचना प्राप्त करें |
| GET | `/public/tvWrapper/:churchId` | JWT | — | उपदेश, पाठ और FreeShow स्रोतों के साथ TV ऐप रैपर प्राप्त करें |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | TV फ़ीड प्लेलिस्ट के रूप में एकल उपदेश प्राप्त करें |
| GET | `/public/tvFeed/:churchId` | Public | — | TV फ़ीड के रूप में सभी सार्वजनिक प्लेलिस्ट/उपदेश प्राप्त करें |
| GET | `/public/:churchId` | Public | — | चर्च के सभी सार्वजनिक उपदेश सूचीबद्ध करें |
| GET | `/timeline?sermonIds=` | JWT | — | उपदेशों के लिए टाइमलाइन डेटा लोड करें |
| GET | `/lookup?videoType=&videoData=` | Public | — | YouTube या Vimeo से उपदेश मेटाडेटा लुकअप करें |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | उपदेश उपशीर्षकों से AI सोशल मीडिया पोस्ट सुझाव जनरेट करें |
| GET | `/outline?url=&title=&author=` | JWT | — | URL से AI पाठ रूपरेखा जनरेट करें |
| GET | `/youtubeImport/:channelId` | JWT | — | YouTube चैनल से वीडियो आयात करें |
| GET | `/vimeoImport/:channelId` | JWT | — | Vimeo चैनल से वीडियो आयात करें |
| GET | `/:id` | JWT | — | ID द्वारा उपदेश प्राप्त करें |
| GET | `/` | JWT | — | सभी उपदेश सूचीबद्ध करें |
| POST | `/` | JWT | StreamingServices.Edit | उपदेश बनाएँ या अपडेट करें (बैच, base64 थंबनेल अपलोड समर्थित) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | उपदेश हटाएँ |

### उदाहरण: YouTube उपदेश लुकअप

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## प्लेलिस्ट

बेस पथ: `/content/playlists`

मानक CRUD विस्तारित (बेस क्लास से GET `/:id`, GET `/`, DELETE `/:id`, लिखने के लिए StreamingServices.Edit अनुमति)।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा प्लेलिस्ट प्राप्त करें |
| GET | `/` | JWT | — | सभी प्लेलिस्ट सूचीबद्ध करें |
| GET | `/public/:churchId` | Public | — | चर्च की सभी सार्वजनिक प्लेलिस्ट सूचीबद्ध करें |
| POST | `/` | JWT | StreamingServices.Edit | प्लेलिस्ट बनाएँ या अपडेट करें (बैच, base64 थंबनेल अपलोड समर्थित) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | प्लेलिस्ट हटाएँ |

## स्ट्रीमिंग सेवाएँ

बेस पथ: `/content/streamingServices`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | सेवा के लिए एन्क्रिप्टेड होस्ट चैट रूम ID प्राप्त करें |
| GET | `/` | JWT | — | सभी स्ट्रीमिंग सेवाएँ सूचीबद्ध करें। समाप्त गैर-पुनरावृत्ति सेवाओं को स्वचालित-साफ़ करता है और पुनरावृत्ति वाली को आगे बढ़ाता है |
| POST | `/` | JWT | StreamingServices.Edit | स्ट्रीमिंग सेवाएँ बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | स्ट्रीमिंग सेवा हटाएँ (ब्लॉक किए गए IP भी साफ़ करता है) |

## इवेंट

बेस पथ: `/content/events`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | समूह के लिए टाइमलाइन इवेंट लोड करें |
| GET | `/timeline?eventIds=` | JWT | — | वर्तमान उपयोगकर्ता के समूहों के लिए टाइमलाइन इवेंट लोड करें |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | ICS कैलेंडर फ़ीड के रूप में इवेंट सब्सक्राइब करें |
| GET | `/group/:groupId` | JWT | — | समूह के लिए इवेंट प्राप्त करें (अपवाद तिथियाँ सहित) |
| GET | `/public/group/:churchId/:groupId` | Public | — | समूह के सार्वजनिक इवेंट प्राप्त करें |
| GET | `/:id` | JWT | — | ID द्वारा इवेंट प्राप्त करें |
| POST | `/` | JWT | — | इवेंट बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | इवेंट हटाएँ |

## इवेंट अपवाद

बेस पथ: `/content/eventExceptions`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा इवेंट अपवाद प्राप्त करें |
| POST | `/` | JWT | Content.Edit | इवेंट अपवाद बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | इवेंट अपवाद हटाएँ |

## क्यूरेटेड कैलेंडर

बेस पथ: `/content/curatedCalendars`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा क्यूरेटेड कैलेंडर प्राप्त करें |
| GET | `/` | JWT | — | सभी क्यूरेटेड कैलेंडर सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | क्यूरेटेड कैलेंडर बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | क्यूरेटेड कैलेंडर हटाएँ |

## क्यूरेटेड इवेंट

बेस पथ: `/content/curatedEvents`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | कैलेंडर के लिए क्यूरेटेड इवेंट प्राप्त करें (जब तक `?withoutEvents` सेट न हो, इवेंट विवरण और अपवाद तिथियाँ शामिल) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | कैलेंडर के लिए सार्वजनिक क्यूरेटेड इवेंट प्राप्त करें |
| GET | `/:id` | JWT | — | ID द्वारा क्यूरेटेड इवेंट प्राप्त करें |
| GET | `/` | JWT | — | सभी क्यूरेटेड इवेंट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | क्यूरेटेड इवेंट बनाएँ या अपडेट करें। विशिष्ट समूह इवेंट जोड़ने के लिए `eventIds` एरे समर्थित |
| DELETE | `/:id` | JWT | Content.Edit | क्यूरेटेड इवेंट हटाएँ |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | क्यूरेटेड कैलेंडर से विशिष्ट इवेंट हटाएँ |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | क्यूरेटेड कैलेंडर से समूह के सभी इवेंट हटाएँ |

## फ़ाइलें

बेस पथ: `/content/files`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | सामग्री प्रकार और सामग्री ID द्वारा फ़ाइलें प्राप्त करें |
| GET | `/` | JWT | — | चर्च वेबसाइट की सभी फ़ाइलें सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा फ़ाइल प्राप्त करें |
| POST | `/` | JWT | Content.Edit* | फ़ाइलें अपलोड करें (base64)। *समूह के सदस्य भी `contentId` से मेल खाने वाले समूह के लिए अनुमत |
| POST | `/postUrl` | JWT | Content.Edit* | प्री-साइन्ड S3 अपलोड URL प्राप्त करें। *समूह सदस्यों के लिए भी अनुमत। प्रति सामग्री आइटम अधिकतम 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | फ़ाइल हटाएँ और स्टोरेज से हटाएँ। *समूह सदस्यों के लिए भी अनुमत |

## गैलरी

बेस पथ: `/content/gallery`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | फ़ोल्डर में स्टॉक फ़ोटो सूचीबद्ध करें |
| GET | `/:folder` | JWT | Content.Edit | फ़ोल्डर में गैलरी छवियाँ सूचीबद्ध करें |
| POST | `/requestUpload` | JWT | Content.Edit | गैलरी छवि के लिए प्री-साइन्ड S3 अपलोड URL प्राप्त करें |
| DELETE | `/:folder/:image` | JWT | Content.Edit | गैलरी छवि हटाएँ |

## बाइबल

बेस पथ: `/content/bibles`

सभी बाइबल एंडपॉइंट सार्वजनिक हैं (कोई प्रमाणीकरण आवश्यक नहीं)। डेटा बाहरी स्रोतों से लाया जाता है और स्थानीय रूप से कैश किया जाता है।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | सभी बाइबल अनुवाद सूचीबद्ध करें (कैश खाली होने पर स्रोत से लाता है) |
| GET | `/stats?startDate=&endDate=` | Public | — | तिथि सीमा के लिए बाइबल लुकअप आँकड़े प्राप्त करें |
| GET | `/availableTranslations/:source` | Public | — | स्रोत से उपलब्ध अनुवाद सूचीबद्ध करें (जैसे api.bible) |
| GET | `/updateTranslations` | Public | — | सभी स्रोतों से सभी अनुवाद सिंक करें |
| GET | `/updateTranslations/:source` | Public | — | विशिष्ट स्रोत से अनुवाद सिंक करें |
| GET | `/updateCopyrights` | Public | — | गायब कॉपीराइट जानकारी वाले अनुवादों के लिए कॉपीराइट अपडेट करें |
| GET | `/:translationKey/updateCopyright` | Public | — | विशिष्ट अनुवाद के लिए कॉपीराइट अपडेट करें |
| GET | `/:translationKey/search?query=&limit=` | Public | — | अनुवाद में आयतें खोजें |
| GET | `/:translationKey/books` | Public | — | अनुवाद के लिए पुस्तकें प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | पुस्तक के लिए अध्याय प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | अध्याय के लिए आयतें प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | श्रेणी के लिए आयत पाठ प्राप्त करें। लुकअप लॉग करता है। कुछ अनुवाद लाइसेंसिंग के लिए कैशिंग बाइपास करते हैं |

### उदाहरण: आयत पाठ प्राप्त करें

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## गीत

बेस पथ: `/content/songs`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | क्वेरी द्वारा गीत खोजें |
| GET | `/:id` | JWT | — | ID द्वारा गीत प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी गीत सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | गीत बनाएँ या अपडेट करें (बैच) |
| POST | `/import` | JWT | — | FreeShow से गीत आयात करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | गीत हटाएँ |

## गीत विवरण

बेस पथ: `/content/songDetails`

गीत विवरण वैश्विक हैं (चर्च-स्कोप नहीं)। ये चर्चों में साझा की गई कैनोनिकल गीत मेटाडेटा का प्रतिनिधित्व करते हैं।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा गीत विवरण प्राप्त करें (वैश्विक) |
| GET | `/` | JWT | — | चर्च के लिए गीत विवरण सूचीबद्ध करें |
| POST | `/create` | JWT | — | PraiseCharts ID से गीत विवरण बनाएँ (पहले से बनाया गया हो तो मौजूदा लौटाता है)। PraiseCharts और MusicBrainz से मेटाडेटा स्वचालित लाता है |
| POST | `/` | JWT | — | गीत विवरण बनाएँ या अपडेट करें (बैच) |

## गीत विवरण लिंक

बेस पथ: `/content/songDetailLinks`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा गीत विवरण लिंक प्राप्त करें |
| GET | `/songDetail/:songDetailId` | JWT | — | गीत विवरण के लिए सभी लिंक प्राप्त करें |
| POST | `/` | JWT | — | गीत विवरण लिंक बनाएँ या अपडेट करें (बैच)। लिंक होने पर MusicBrainz डेटा स्वचालित लाता है |
| DELETE | `/:id` | JWT | — | गीत विवरण लिंक हटाएँ |

## अरेंजमेंट

बेस पथ: `/content/arrangements`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा अरेंजमेंट प्राप्त करें |
| GET | `/song/:songId` | JWT | Content.Edit | गीत के लिए अरेंजमेंट प्राप्त करें |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | गीत विवरण के लिए अरेंजमेंट प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी अरेंजमेंट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | अरेंजमेंट बनाएँ या अपडेट करें (बैच) |
| POST | `/freeShow/missing` | JWT | — | चर्च में मौजूद नहीं FreeShow ID खोजें। बॉडी: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | अरेंजमेंट हटाएँ (की भी हटाता है; कोई अरेंजमेंट न बचने पर गीत हटाता है) |

## अरेंजमेंट की

बेस पथ: `/content/arrangementKeys`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | प्रस्तुतकर्ता दृश्य के लिए पूर्ण गीत डेटा के साथ अरेंजमेंट की प्राप्त करें |
| GET | `/:id` | JWT | — | ID द्वारा अरेंजमेंट की प्राप्त करें |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | अरेंजमेंट के लिए की प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी अरेंजमेंट की सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | अरेंजमेंट की बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | अरेंजमेंट की हटाएँ |

## सेटिंग्स

बेस पथ: `/content/settings`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सेटिंग्स प्राप्त करें |
| GET | `/` | JWT | Settings.Edit | चर्च की सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | Public | — | चर्च की सार्वजनिक सेटिंग्स प्राप्त करें (की-वैल्यू जोड़ों के रूप में) |
| GET | `/imports?playlistId=&channelId=&type=` | JWT | Settings.Edit | स्वचालित-आयात सेटिंग्स प्राप्त करें (YouTube/Vimeo चैनल ID) |
| POST | `/my` | JWT | — | उपयोगकर्ता-स्तरीय सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |
| POST | `/` | JWT | Settings.Edit | चर्च-स्तरीय सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |
| DELETE | `/my/:id` | JWT | — | उपयोगकर्ता सेटिंग हटाएँ |

## प्रीव्यू

बेस पथ: `/content/preview`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | सबडोमेन की द्वारा चर्च के लिए स्ट्रीमिंग प्रीव्यू डेटा लोड करें (टैब, लिंक, सेवाएँ, उपदेश) |

## गैलरी (स्टॉक फ़ोटो)

बेस पथ: `/content/stock`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Pexels स्टॉक फ़ोटो खोजें। बॉडी: `{ term: "church" }` |

## PraiseCharts

बेस पथ: `/content/praiseCharts`

वर्शिप गीत खोज और शीट म्यूज़िक डाउनलोड के लिए PraiseCharts के साथ एकीकरण।

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | गीत के लिए रॉ PraiseCharts डेटा प्राप्त करें |
| GET | `/hasAccount` | JWT | — | जाँचें कि उपयोगकर्ता के पास लिंक किया गया PraiseCharts अकाउंट है या नहीं |
| GET | `/search?q=` | JWT | — | PraiseCharts कैटलॉग खोजें |
| GET | `/products/:id?keys=` | JWT | — | गीत के लिए उत्पाद प्राप्त करें (प्रमाणित होने पर लाइब्रेरी से, अन्यथा कैटलॉग) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | लाइब्रेरी से रॉ अरेंजमेंट डेटा प्राप्त करें |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts से फ़ाइल डाउनलोड करें (PDF या ZIP)। `{ redirectUrl }` लौटाता है |
| GET | `/authUrl?returnUrl=` | Public | — | PraiseCharts के लिए OAuth प्राधिकरण URL प्राप्त करें |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth वेरिफ़ायर को एक्सेस टोकन में बदलें और उपयोगकर्ता सेटिंग्स में सहेजें |
| GET | `/library` | JWT | — | उपयोगकर्ता की PraiseCharts लाइब्रेरी ब्राउज़ करें |

## समर्थन

बेस पथ: `/content/support`

| Method | Path | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | AWS Polly का उपयोग करके SSML को MP3 ऑडियो में परिवर्तित करें। बॉडी: `{ ssml: "<speak>...</speak>" }` |

## संबंधित पृष्ठ

- [Membership एंडपॉइंट](./membership) -- लोग, चर्च, समूह, भूमिकाएँ, अनुमतियाँ
- [Attendance एंडपॉइंट](./attendance) -- सेवा और विज़िट ट्रैकिंग
- [प्रमाणीकरण और अनुमतियाँ](./authentication) -- लॉगिन प्रवाह, JWT, अनुमति मॉडल
- [मॉड्यूल संरचना](../module-structure) -- कोड संगठन पैटर्न
