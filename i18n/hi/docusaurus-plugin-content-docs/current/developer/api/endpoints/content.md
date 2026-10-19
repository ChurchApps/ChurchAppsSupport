---
title: "Content एंडपॉइंट्स"
---

# Content एंडपॉइंट्स

<div class="article-intro">

Content मॉड्यूल वेबसाइट पेज, सेक्शन, एलिमेंट, ब्लॉक, ब्लॉग पोस्ट, रीडायरेक्ट, उपदेश, प्लेलिस्ट, स्ट्रीमिंग सेवाएँ, इवेंट, क्यूरेटेड कैलेंडर, फ़ाइलें, गैलरी, बाइबल अनुवाद और पद खोज, गीत, व्यवस्थाएँ (arrangements), ग्लोबल स्टाइल, स्टॉक फ़ोटो, और सेटिंग्स का प्रबंधन करता है। यह API का सबसे बड़ा मॉड्यूल है और सभी ChurchApps एप्लिकेशन में CMS, मीडिया/स्ट्रीमिंग, पूजा योजना और बाइबल सुविधाओं को शक्ति देता है।

</div>

**बेस पथ:** `/content`

## पेज

बेस पथ: `/content/pages`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | URL या ID द्वारा पूरा पेज ट्री (sections, elements, blocks) लोड करें। URL द्वारा प्राप्त करने पर आंतरिक IDs हटा दिए जाते हैं। URL-आधारित प्राप्ति `pages.visibility` लागू करती है -- प्रतिबंधित पेज `{ restricted: true, visibility }` लौटाता है, जब तक (वैकल्पिक) JWT गेट को संतुष्ट न करे |
| GET | `/public/:churchId` | Public | — | सार्वजनिक पेज सूचीबद्ध करें (`url`, `title`, `metaDescription`); केवल `visibility = everyone` वाले |
| GET | `/:id` | JWT | — | ID द्वारा एक पेज प्राप्त करें |
| GET | `/` | JWT | — | चर्च के सभी पेज सूचीबद्ध करें |
| POST | `/duplicate/:id` | JWT | Content.Edit | सभी sections और elements के साथ पेज की डुप्लिकेट बनाएं |
| POST | `/temp/ai` | JWT | Content.Edit | AI-जनित पेज सहेजें (पेज, sections, और elements एक ही कॉल में) |
| POST | `/importTree` | JWT | Content.Edit | एक नेस्टेड ट्री से पेज बनाएं (`title`, `url`, `sections[].elements[]…`)। हमेशा कॉलर के चर्च के अंतर्गत डालता है; बॉडी के ids अनदेखे किए जाते हैं। पंक्तियों में उनके `column` children होने चाहिए। अधिकतम 30 sections / 500 elements |
| POST | `/` | JWT | Content.Edit | पेज बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | पेज हटाएं |

### उदाहरण: पेज ट्री लोड करना

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

## सेक्शन

बेस पथ: `/content/sections`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक सेक्शन प्राप्त करें |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | सेक्शन की डुप्लिकेट बनाएं या उसे पुन: उपयोग योग्य ब्लॉक में बदलें |
| POST | `/` | JWT | Content.Edit | सेक्शन बनाएं या अपडेट करें (बैच)। sort order स्वतः अपडेट होता है |
| DELETE | `/:id` | JWT | Content.Edit | सेक्शन हटाएं (sort order स्वतः अपडेट होता है) |

## एलिमेंट

बेस पथ: `/content/elements`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक एलिमेंट प्राप्त करें |
| POST | `/duplicate/:id` | JWT | Content.Edit | सभी children के साथ एलिमेंट की डुप्लिकेट बनाएं |
| POST | `/` | JWT | Content.Edit | एलिमेंट बनाएं या अपडेट करें (बैच)। row columns और carousel slides स्वतः प्रबंधित होते हैं |
| DELETE | `/:id` | JWT | Content.Edit | एलिमेंट हटाएं |

## ब्लॉक

बेस पथ: `/content/blocks`

बेस क्लास से मानक CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id`) का विस्तार, लेखन के लिए Content.Edit अनुमति के साथ।

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक ब्लॉक प्राप्त करें |
| GET | `/` | JWT | — | सभी ब्लॉक सूचीबद्ध करें |
| GET | `/:churchId/tree/:id` | Public | — | sections और elements के साथ पूरा ब्लॉक ट्री लोड करें |
| GET | `/blockType/:blockType` | JWT | — | प्रकार के अनुसार ब्लॉक लोड करें (जैसे footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | किसी चर्च के लिए footer ब्लॉक ट्री लोड करें |
| POST | `/` | JWT | Content.Edit | ब्लॉक बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Content.Edit | ब्लॉक हटाएं |

## लिंक

बेस पथ: `/content/links`

बेस क्लास से मानक CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id`) का विस्तार, लेखन के लिए Content.Edit अनुमति के साथ।

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक लिंक प्राप्त करें |
| GET | `/` | JWT | — | सभी लिंक सूचीबद्ध करें। वैकल्पिक `?category=` फ़िल्टर। सहेजने के बाद स्वतः क्रमबद्ध |
| GET | `/church/:churchId/filtered?category=` | JWT | — | दृश्यता (everyone, visitors, members, staff, groups) के आधार पर फ़िल्टर किए गए लिंक लोड करें |
| GET | `/church/:churchId?category=` | Public | — | श्रेणी के अनुसार किसी चर्च के लिंक लोड करें (सार्वजनिक) |
| POST | `/` | JWT | Content.Edit | लिंक बनाएं या अपडेट करें (बैच)। श्रेणी के अनुसार स्वतः क्रमबद्ध |
| DELETE | `/:id` | JWT | Content.Edit | लिंक हटाएं |

## ग्लोबल स्टाइल

बेस पथ: `/content/globalStyles`

बेस क्लास से मानक CRUD (POST `/`, DELETE `/:id`) का विस्तार, लेखन के लिए Content.Edit अनुमति के साथ।

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | किसी चर्च के ग्लोबल स्टाइल लोड करें (कोई सेट न होने पर डिफ़ॉल्ट लौटाता है) |
| GET | `/` | JWT | — | प्रमाणित चर्च के ग्लोबल स्टाइल लोड करें |
| POST | `/` | JWT | Content.Edit | ग्लोबल स्टाइल बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Content.Edit | ग्लोबल स्टाइल हटाएं |

## पेज इतिहास

बेस पथ: `/content/pageHistory`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | किसी पेज के इतिहास की प्रविष्टियाँ सूचीबद्ध करें |
| GET | `/block/:blockId` | JWT | Content.Edit | किसी ब्लॉक के इतिहास की प्रविष्टियाँ सूचीबद्ध करें |
| GET | `/:id` | JWT | Content.Edit | ID द्वारा इतिहास प्रविष्टि प्राप्त करें |
| POST | `/` | JWT | Content.Edit | पेज/ब्लॉक का स्नैपशॉट सहेजें। समय-समय पर 30 दिन से पुरानी प्रविष्टियाँ साफ़ करता है |
| POST | `/restore/:id` | JWT | Content.Edit | इतिहास स्नैपशॉट से पेज/ब्लॉक पुनर्स्थापित करें (मौजूदा सामग्री हटाकर स्नैपशॉट से दोबारा बनाता है) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | इनलाइन स्नैपशॉट ऑब्जेक्ट से पुनर्स्थापित करें। बॉडी: `{ pageId, blockId, snapshot }` |

## पोस्ट (ब्लॉग)

बेस पथ: `/content/posts`

ब्लॉग पोस्ट स्वतंत्र पंक्तियाँ हैं: `title`, `slug` (प्रति चर्च अद्वितीय), `excerpt`, `content` (markdown बॉडी), `authorId`, `photoUrl`, `publishDate`, `category`, और `tags`। `publishDate` सेट होने और अतीत में होने पर पोस्ट प्रकाशित होती है। पढ़ने वाले endpoints हर पोस्ट को `authorId` से हल किए गए `authorName` के साथ समृद्ध करते हैं। देखें [Website Builder Architecture](../../architecture/website-builder#blog)।

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | प्रकाशित पोस्ट पृष्ठांकित रूप में सूचीबद्ध करें (प्रति पृष्ठ अधिकतम 50) |
| GET | `/public/:churchId/categories` | Public | — | प्रकाशित पोस्ट में अलग-अलग श्रेणियाँ |
| GET | `/public/:churchId/slug/:slug` | Public | — | slug द्वारा एक प्रकाशित पोस्ट प्राप्त करें |
| GET | `/rss/:churchId?siteUrl=` | Public | — | प्रकाशित पोस्ट का RSS 2.0 फ़ीड (लिंक `{siteUrl}/blog/{slug}` के रूप में बनते हैं) |
| GET | `/:id` | JWT | — | ID द्वारा एक पोस्ट प्राप्त करें |
| GET | `/` | JWT | — | चर्च की सभी पोस्ट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | पोस्ट बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | पोस्ट हटाएं |

## रीडायरेक्ट

बेस पथ: `/content/redirects`

प्रति चर्च URL रीडायरेक्ट (`fromPath` → `toPath`), प्रति चर्च 200 तक सीमित। पथ सामान्यीकृत होते हैं (छोटे अक्षर, प्रमुख स्लैश, अंत में स्लैश नहीं) और `fromPath` प्रति चर्च अद्वितीय है। B1App इन्हें संभावित 404 पर हल करता है और HTTP 308 जारी करता है।

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | एक पथ हल करें (या `path` छोड़ने पर सभी रीडायरेक्ट सूचीबद्ध करें) |
| GET | `/:id` | JWT | — | ID द्वारा एक रीडायरेक्ट प्राप्त करें |
| GET | `/` | JWT | — | चर्च के सभी रीडायरेक्ट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | रीडायरेक्ट बनाएं या अपडेट करें। `fromPath = toPath` को अस्वीकार करता है और 200-पंक्ति सीमा लागू करता है |
| DELETE | `/:id` | JWT | Content.Edit | रीडायरेक्ट हटाएं |

## उपदेश

बेस पथ: `/content/sermons`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | FreeShow प्लेलिस्ट संरचना का नमूना प्राप्त करें |
| GET | `/public/tvWrapper/:churchId` | JWT | — | उपदेश, पाठ और FreeShow स्रोतों के साथ TV ऐप wrapper प्राप्त करें |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | एक उपदेश को TV फ़ीड प्लेलिस्ट के रूप में प्राप्त करें |
| GET | `/public/tvFeed/:churchId` | Public | — | सभी सार्वजनिक प्लेलिस्ट/उपदेश TV फ़ीड के रूप में प्राप्त करें |
| GET | `/public/:churchId` | Public | — | किसी चर्च के सभी सार्वजनिक उपदेश सूचीबद्ध करें |
| GET | `/timeline?sermonIds=` | JWT | — | उपदेशों के timeline डेटा लोड करें |
| GET | `/lookup?videoType=&videoData=` | Public | — | YouTube या Vimeo से उपदेश मेटाडेटा खोजें |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | उपदेश के सबटाइटल से AI सोशल मीडिया पोस्ट सुझाव बनाएं |
| GET | `/outline?url=&title=&author=` | JWT | — | URL से AI पाठ रूपरेखा बनाएं |
| GET | `/youtubeImport/:channelId` | JWT | — | YouTube चैनल से वीडियो आयात करें |
| GET | `/vimeoImport/:channelId` | JWT | — | Vimeo चैनल से वीडियो आयात करें |
| GET | `/:id` | JWT | — | ID द्वारा एक उपदेश प्राप्त करें |
| GET | `/` | JWT | — | सभी उपदेश सूचीबद्ध करें |
| POST | `/` | JWT | StreamingServices.Edit | उपदेश बनाएं या अपडेट करें (बैच, base64 थंबनेल अपलोड समर्थित) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | उपदेश हटाएं |

### उदाहरण: YouTube उपदेश खोजना

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

बेस क्लास से मानक CRUD (GET `/:id`, GET `/`, DELETE `/:id`) का विस्तार, लेखन के लिए StreamingServices.Edit अनुमति के साथ।

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक प्लेलिस्ट प्राप्त करें |
| GET | `/` | JWT | — | सभी प्लेलिस्ट सूचीबद्ध करें |
| GET | `/public/:churchId` | Public | — | किसी चर्च की सभी सार्वजनिक प्लेलिस्ट सूचीबद्ध करें |
| POST | `/` | JWT | StreamingServices.Edit | प्लेलिस्ट बनाएं या अपडेट करें (बैच, base64 थंबनेल अपलोड समर्थित) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | प्लेलिस्ट हटाएं |

## स्ट्रीमिंग सेवाएँ

बेस पथ: `/content/streamingServices`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | किसी सेवा के लिए एन्क्रिप्टेड होस्ट चैट रूम ID प्राप्त करें |
| GET | `/` | JWT | — | सभी स्ट्रीमिंग सेवाएँ सूचीबद्ध करें। समाप्त हो चुकी गैर-आवर्ती सेवाएँ स्वतः साफ़ होती हैं और आवर्ती सेवाएँ आगे बढ़ती हैं |
| POST | `/` | JWT | StreamingServices.Edit | स्ट्रीमिंग सेवाएँ बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | स्ट्रीमिंग सेवा हटाएं (ब्लॉक किए गए IPs भी साफ़ करता है) |

## इवेंट

बेस पथ: `/content/events`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | किसी समूह के timeline इवेंट लोड करें |
| GET | `/timeline?eventIds=` | JWT | — | वर्तमान उपयोगकर्ता के समूहों के timeline इवेंट लोड करें |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | ICS कैलेंडर फ़ीड के रूप में इवेंट की सदस्यता लें |
| GET | `/group/:groupId` | JWT | — | किसी समूह के इवेंट प्राप्त करें (अपवाद तिथियाँ शामिल) |
| GET | `/public/group/:churchId/:groupId` | Public | — | किसी समूह के सार्वजनिक इवेंट प्राप्त करें |
| GET | `/public/:churchId/:id` | Public | — | उसके सार्वजनिक पेज के लिए एक इवेंट प्राप्त करें, `roomNames` के साथ (बुकिंग से कमरे जो अस्वीकृत नहीं हैं)। लंबित या अस्वीकृत इवेंट और पंजीकरण न लेने वाले निजी इवेंट के लिए `null` लौटाता है |
| GET | `/public/:churchId/:id/ical` | Public | — | उस एक इवेंट को `.ics` फ़ाइल के रूप में डाउनलोड करें (`text/calendar`, अपवाद तिथियाँ लागू)। उन्हीं नियमों से इवेंट छिपा होने पर `404` |
| GET | `/:id` | JWT | — | ID द्वारा एक इवेंट प्राप्त करें |
| POST | `/` | JWT | — | इवेंट बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | इवेंट हटाएं |

इवेंट रिकॉर्ड में `photoUrl` (16:9 इवेंट फ़ोटो, जो सार्वजनिक इवेंट पेज और आगामी इवेंट टाइलों पर दिखती है), `tags` (कॉमा-से-अलग, वेबसाइट Calendar एलिमेंट के tag फ़िल्टर द्वारा उपयोग), और `notesViewRole` / `notesPostRole` (`null` होने पर `staff`, या `leaders`, या `members`) शामिल होते हैं, जो इवेंट की `eventNote` बातचीत को नियंत्रित करते हैं -- देखें [Group and event notes access control](./messaging.md#group-and-event-notes-access-control)। सार्वजनिक क्यूरेटेड-इवेंट प्रतिक्रियाओं में भी हर इवेंट का `photoUrl` और `tags` होता है।

## इवेंट अपवाद

बेस पथ: `/content/eventExceptions`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक इवेंट अपवाद प्राप्त करें |
| POST | `/` | JWT | Content.Edit | इवेंट अपवाद बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | इवेंट अपवाद हटाएं |

## क्यूरेटेड कैलेंडर

बेस पथ: `/content/curatedCalendars`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक क्यूरेटेड कैलेंडर प्राप्त करें |
| GET | `/` | JWT | — | सभी क्यूरेटेड कैलेंडर सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | क्यूरेटेड कैलेंडर बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | क्यूरेटेड कैलेंडर हटाएं |

## क्यूरेटेड इवेंट

बेस पथ: `/content/curatedEvents`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | किसी कैलेंडर के क्यूरेटेड इवेंट प्राप्त करें (इवेंट विवरण और अपवाद तिथियाँ शामिल, जब तक `?withoutEvents` सेट न हो) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | किसी कैलेंडर के सार्वजनिक क्यूरेटेड इवेंट प्राप्त करें |
| GET | `/:id` | JWT | — | ID द्वारा एक क्यूरेटेड इवेंट प्राप्त करें |
| GET | `/` | JWT | — | सभी क्यूरेटेड इवेंट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | क्यूरेटेड इवेंट बनाएं या अपडेट करें। विशिष्ट समूह इवेंट जोड़ने के लिए `eventIds` ऐरे समर्थित है |
| DELETE | `/:id` | JWT | Content.Edit | क्यूरेटेड इवेंट हटाएं |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | किसी क्यूरेटेड कैलेंडर से एक विशिष्ट इवेंट हटाएं |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | किसी क्यूरेटेड कैलेंडर से किसी समूह के सभी इवेंट हटाएं |

## फ़ाइलें

बेस पथ: `/content/files`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | contentType और contentId द्वारा फ़ाइलें प्राप्त करें |
| GET | `/` | JWT | — | चर्च वेबसाइट की सभी फ़ाइलें सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा एक फ़ाइल प्राप्त करें |
| POST | `/` | JWT | Content.Edit* | फ़ाइलें अपलोड करें (base64)। *यदि उपयोगकर्ता `contentId` से मेल खाने वाले समूह का सदस्य है तो भी अनुमति है |
| POST | `/postUrl` | JWT | Content.Edit* | पूर्व-हस्ताक्षरित S3 अपलोड URL प्राप्त करें। *समूह सदस्यों के लिए भी अनुमति। प्रति सामग्री आइटम अधिकतम 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | फ़ाइल हटाएं और स्टोरेज से निकालें। *समूह सदस्यों के लिए भी अनुमति |

## गैलरी

बेस पथ: `/content/gallery`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | किसी फ़ोल्डर के स्टॉक फ़ोटो सूचीबद्ध करें |
| GET | `/:folder` | JWT | Content.Edit | किसी फ़ोल्डर की गैलरी छवियाँ सूचीबद्ध करें |
| POST | `/requestUpload` | JWT | Content.Edit | गैलरी छवि के लिए पूर्व-हस्ताक्षरित S3 अपलोड URL प्राप्त करें |
| DELETE | `/:folder/:image` | JWT | Content.Edit | गैलरी छवि हटाएं |

## बाइबल

बेस पथ: `/content/bibles`

सभी बाइबल endpoints सार्वजनिक हैं (कोई प्रमाणीकरण आवश्यक नहीं)। डेटा बाहरी स्रोतों से लाया जाता है और स्थानीय रूप से कैश किया जाता है।

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | सभी बाइबल अनुवाद सूचीबद्ध करें (कैश खाली होने पर स्रोत से लाता है) |
| GET | `/stats?startDate=&endDate=` | Public | — | किसी तारीख सीमा के लिए बाइबल खोज आँकड़े प्राप्त करें |
| GET | `/availableTranslations/:source` | Public | — | किसी स्रोत (जैसे api.bible) के उपलब्ध अनुवाद सूचीबद्ध करें |
| GET | `/updateTranslations` | Public | — | सभी स्रोतों के सभी अनुवाद सिंक करें |
| GET | `/updateTranslations/:source` | Public | — | किसी विशिष्ट स्रोत से अनुवाद सिंक करें |
| GET | `/updateCopyrights` | Public | — | जिन अनुवादों में कॉपीराइट जानकारी नहीं है, उनकी कॉपीराइट जानकारी अपडेट करें |
| GET | `/:translationKey/updateCopyright` | Public | — | किसी विशिष्ट अनुवाद का कॉपीराइट अपडेट करें |
| GET | `/:translationKey/search?query=&limit=` | Public | — | किसी अनुवाद में पद खोजें |
| GET | `/:translationKey/books` | Public | — | किसी अनुवाद की पुस्तकें प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | किसी पुस्तक के अध्याय प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | किसी अध्याय के पद प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | किसी सीमा का पद पाठ प्राप्त करें। खोजों को लॉग करता है। कुछ अनुवाद लाइसेंसिंग के कारण कैशिंग छोड़ते हैं |

### उदाहरण: पद पाठ प्राप्त करना

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

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | क्वेरी द्वारा गीत खोजें |
| GET | `/:id` | JWT | — | ID द्वारा एक गीत प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी गीत सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | गीत बनाएं या अपडेट करें (बैच) |
| POST | `/import` | JWT | — | FreeShow से गीत आयात करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | गीत हटाएं |

## गीत विवरण

बेस पथ: `/content/songDetails`

गीत विवरण वैश्विक हैं (चर्च-स्कोप्ड नहीं)। ये विभिन्न चर्चों में साझा मानक गीत मेटाडेटा का प्रतिनिधित्व करते हैं।

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक गीत विवरण प्राप्त करें (वैश्विक) |
| GET | `/` | JWT | — | चर्च के गीत विवरण सूचीबद्ध करें |
| POST | `/create` | JWT | — | PraiseCharts ID से गीत विवरण बनाएं (पहले से बना हो तो मौजूदा लौटाता है)। PraiseCharts और MusicBrainz से मेटाडेटा स्वतः लाता है |
| POST | `/` | JWT | — | गीत विवरण बनाएं या अपडेट करें (बैच) |

## गीत विवरण लिंक

बेस पथ: `/content/songDetailLinks`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक गीत विवरण लिंक प्राप्त करें |
| GET | `/songDetail/:songDetailId` | JWT | — | किसी गीत विवरण के सभी लिंक प्राप्त करें |
| POST | `/` | JWT | — | गीत विवरण लिंक बनाएं या अपडेट करें (बैच)। लिंक होने पर MusicBrainz डेटा स्वतः लाता है |
| DELETE | `/:id` | JWT | — | गीत विवरण लिंक हटाएं |

## व्यवस्थाएँ (Arrangements)

बेस पथ: `/content/arrangements`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एक व्यवस्था प्राप्त करें |
| GET | `/song/:songId` | JWT | Content.Edit | किसी गीत की व्यवस्थाएँ प्राप्त करें |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | किसी गीत विवरण की व्यवस्थाएँ प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी व्यवस्थाएँ सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | व्यवस्थाएँ बनाएं या अपडेट करें (बैच) |
| POST | `/freeShow/missing` | JWT | — | ऐसे FreeShow IDs खोजें जो चर्च में मौजूद नहीं हैं। बॉडी: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | व्यवस्था हटाएं (कीज़ भी हटाता है; कोई व्यवस्था न बचे तो गीत भी हटाता है) |

## व्यवस्था कीज़ (Arrangement Keys)

बेस पथ: `/content/arrangementKeys`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | प्रेज़ेंटर दृश्य के लिए पूर्ण गीत डेटा सहित व्यवस्था की प्राप्त करें |
| GET | `/:id` | JWT | — | ID द्वारा एक व्यवस्था की प्राप्त करें |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | किसी व्यवस्था की कीज़ प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी व्यवस्था कीज़ सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | व्यवस्था कीज़ बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | व्यवस्था की हटाएं |

## सेटिंग्स

बेस पथ: `/content/settings`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सेटिंग्स प्राप्त करें |
| GET | `/` | JWT | Settings.Edit | चर्च की सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | Public | — | किसी चर्च की सार्वजनिक सेटिंग्स प्राप्त करें (key-value जोड़ों के रूप में) |
| POST | `/my` | JWT | — | उपयोगकर्ता-स्तरीय सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |
| POST | `/` | JWT | Settings.Edit | चर्च-स्तरीय सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |
| DELETE | `/my/:id` | JWT | — | एक उपयोगकर्ता सेटिंग हटाएं |

## पूर्वावलोकन (Preview)

बेस पथ: `/content/preview`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | subdomain key द्वारा किसी चर्च का स्ट्रीमिंग पूर्वावलोकन डेटा लोड करें (tabs, links, services, sermons) |

## गैलरी (स्टॉक फ़ोटो)

बेस पथ: `/content/stock`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Pexels स्टॉक फ़ोटो खोजें। बॉडी: `{ term: "church" }` |

## PraiseCharts

बेस पथ: `/content/praiseCharts`

पूजा गीत की खोज और शीट म्यूज़िक डाउनलोड के लिए PraiseCharts के साथ एकीकरण।

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | किसी गीत का मूल PraiseCharts डेटा प्राप्त करें |
| GET | `/hasAccount` | JWT | — | जाँचें कि क्या उपयोगकर्ता के पास लिंक किया हुआ PraiseCharts खाता है |
| GET | `/search?q=` | JWT | — | PraiseCharts कैटलॉग खोजें |
| GET | `/products/:id?keys=` | JWT | — | किसी गीत के उत्पाद प्राप्त करें (प्रमाणित होने पर लाइब्रेरी से, अन्यथा कैटलॉग से) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | लाइब्रेरी से मूल व्यवस्था डेटा प्राप्त करें |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts से एक फ़ाइल डाउनलोड करें (PDF या ZIP)। `{ redirectUrl }` लौटाता है |
| GET | `/authUrl?returnUrl=` | Public | — | PraiseCharts के लिए OAuth प्राधिकरण URL प्राप्त करें |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth verifier को access token के लिए बदलें और उपयोगकर्ता सेटिंग्स में सहेजें |
| GET | `/library` | JWT | — | उपयोगकर्ता की PraiseCharts लाइब्रेरी ब्राउज़ करें |

## सपोर्ट

बेस पथ: `/content/support`

| विधि | पथ | Auth | Permission | विवरण |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | AWS Polly का उपयोग करके SSML को MP3 ऑडियो में बदलें। बॉडी: `{ ssml: "<speak>...</speak>" }` |

## संबंधित पेज

- [Website Builder Architecture](../../architecture/website-builder) -- पेज, सेक्शन, एलिमेंट, पोस्ट और रीडायरेक्ट सभी ऐप्स में कैसे एक साथ जुड़ते हैं
- [Membership Endpoints](./membership) -- लोग, चर्च, समूह, भूमिकाएँ, अनुमतियाँ
- [Attendance Endpoints](./attendance) -- सेवा और विज़िट ट्रैकिंग
- [Authentication & Permissions](./authentication) -- लॉगिन फ़्लो, JWT, अनुमति मॉडल
- [Module Structure](../module-structure) -- कोड संगठन पैटर्न
