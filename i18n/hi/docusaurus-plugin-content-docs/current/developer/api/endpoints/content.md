---
title: "कंटेंट एंडपॉइंट्स"
---

# कंटेंट एंडपॉइंट्स

<div class="article-intro">

कंटेंट (Content) मॉड्यूल वेबसाइट पेज, सेक्शन, एलिमेंट, ब्लॉक, ब्लॉग पोस्ट, रीडायरेक्ट, सरमन, प्लेलिस्ट, स्ट्रीमिंग सेवाएँ, इवेंट, क्यूरेटेड कैलेंडर, फ़ाइलें, गैलरी, बाइबल अनुवाद और वचन खोज, गाने, व्यवस्थाएँ (arrangements), ग्लोबल स्टाइल, स्टॉक फ़ोटो और सेटिंग्स का प्रबंधन करता है। यह API का सबसे बड़ा मॉड्यूल है और सभी ChurchApps एप्लिकेशन में CMS, मीडिया/स्ट्रीमिंग, पूजा योजना और बाइबल सुविधाओं को शक्ति देता है।

</div>

**Base path:** `/content`

## Pages

Base path: `/content/pages`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | URL या ID के आधार पर पूरा पेज ट्री (सेक्शन, एलिमेंट, ब्लॉक) लोड करें। URL से लाने पर आंतरिक ID हटा दी जाती हैं। URL-आधारित प्राप्ति `pages.visibility` लागू करती है — सीमित पेज `{ restricted: true, visibility }` लौटाता है, जब तक (वैकल्पिक) JWT उस शर्त को पूरा न करे |
| GET | `/public/:churchId` | Public | — | सार्वजनिक पेज सूचीबद्ध करें (`url`, `title`, `metaDescription`); केवल `visibility = everyone` वाले |
| GET | `/:id` | JWT | — | ID के आधार पर पेज प्राप्त करें |
| GET | `/` | JWT | — | चर्च के सभी पेज सूचीबद्ध करें |
| POST | `/duplicate/:id` | JWT | Content.Edit | सभी सेक्शन और एलिमेंट सहित पेज की प्रतिलिपि बनाएँ |
| POST | `/temp/ai` | JWT | Content.Edit | AI-जनित पेज सहेजें (एक ही कॉल में पेज, सेक्शन और एलिमेंट) |
| POST | `/importTree` | JWT | Content.Edit | नेस्टेड ट्री (`title`, `url`, `sections[].elements[]…`) से पेज बनाएँ। हमेशा कॉलर के चर्च के अंदर जोड़ता है; बॉडी के ID अनदेखे किए जाते हैं। पंक्तियों में उनके `column` चाइल्ड शामिल होने चाहिए। अधिकतम 30 सेक्शन / 500 एलिमेंट |
| POST | `/` | JWT | Content.Edit | पेज बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | पेज हटाएँ |

### उदाहरण: पेज ट्री लोड करें

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

## Sections

Base path: `/content/sections`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID के आधार पर सेक्शन प्राप्त करें |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | सेक्शन की प्रतिलिपि बनाएँ या उसे पुन: उपयोग योग्य ब्लॉक में बदलें |
| POST | `/` | JWT | Content.Edit | सेक्शन बनाएँ या अपडेट करें (बैच)। क्रम (sort order) स्वचालित रूप से अपडेट होता है |
| DELETE | `/:id` | JWT | Content.Edit | सेक्शन हटाएँ (क्रम स्वचालित रूप से अपडेट होता है) |

## Elements

Base path: `/content/elements`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID के आधार पर एलिमेंट प्राप्त करें |
| POST | `/duplicate/:id` | JWT | Content.Edit | सभी चाइल्ड सहित एलिमेंट की प्रतिलिपि बनाएँ |
| POST | `/` | JWT | Content.Edit | एलिमेंट बनाएँ या अपडेट करें (बैच)। पंक्ति के कॉलम और कैरोसेल स्लाइड स्वचालित रूप से प्रबंधित होते हैं |
| DELETE | `/:id` | JWT | Content.Edit | एलिमेंट हटाएँ |

## Blocks

Base path: `/content/blocks`

मानक CRUD का विस्तार (बेस क्लास से GET `/:id`, GET `/`, POST `/`, DELETE `/:id`, लिखने के लिए Content.Edit अनुमति के साथ)।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID के आधार पर ब्लॉक प्राप्त करें |
| GET | `/` | JWT | — | सभी ब्लॉक सूचीबद्ध करें |
| GET | `/:churchId/tree/:id` | Public | — | सेक्शन और एलिमेंट सहित पूरा ब्लॉक ट्री लोड करें |
| GET | `/blockType/:blockType` | JWT | — | प्रकार के आधार पर ब्लॉक लोड करें (जैसे footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | किसी चर्च का फ़ुटर ब्लॉक ट्री लोड करें |
| POST | `/` | JWT | Content.Edit | ब्लॉक बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Content.Edit | ब्लॉक हटाएँ |

## Links

Base path: `/content/links`

मानक CRUD का विस्तार (बेस क्लास से GET `/:id`, GET `/`, POST `/`, DELETE `/:id`, लिखने के लिए Content.Edit अनुमति के साथ)।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID के आधार पर लिंक प्राप्त करें |
| GET | `/` | JWT | — | सभी लिंक सूचीबद्ध करें। वैकल्पिक `?category=` फ़िल्टर। सहेजने के बाद स्वतः क्रमबद्ध होते हैं |
| GET | `/church/:churchId/filtered?category=` | JWT | — | दृश्यता (everyone, visitors, members, staff, groups) के आधार पर फ़िल्टर किए गए लिंक लोड करें |
| GET | `/church/:churchId?category=` | Public | — | श्रेणी के आधार पर किसी चर्च के लिंक लोड करें (सार्वजनिक) |
| POST | `/` | JWT | Content.Edit | लिंक बनाएँ या अपडेट करें (बैच)। श्रेणी के अनुसार स्वतः क्रमबद्ध |
| DELETE | `/:id` | JWT | Content.Edit | लिंक हटाएँ |

## Global Styles

Base path: `/content/globalStyles`

मानक CRUD का विस्तार (बेस क्लास से POST `/`, DELETE `/:id`, लिखने के लिए Content.Edit अनुमति के साथ)।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | किसी चर्च के ग्लोबल स्टाइल लोड करें (कोई सेट न होने पर डिफ़ॉल्ट लौटाता है) |
| GET | `/` | JWT | — | प्रमाणित चर्च के ग्लोबल स्टाइल लोड करें |
| POST | `/` | JWT | Content.Edit | ग्लोबल स्टाइल बनाएँ या अपडेट करें |
| DELETE | `/:id` | JWT | Content.Edit | ग्लोबल स्टाइल हटाएँ |

## Page History

Base path: `/content/pageHistory`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | किसी पेज की इतिहास प्रविष्टियाँ सूचीबद्ध करें |
| GET | `/block/:blockId` | JWT | Content.Edit | किसी ब्लॉक की इतिहास प्रविष्टियाँ सूचीबद्ध करें |
| GET | `/:id` | JWT | Content.Edit | ID के आधार पर इतिहास प्रविष्टि प्राप्त करें |
| POST | `/` | JWT | Content.Edit | पेज/ब्लॉक का स्नैपशॉट सहेजें। समय-समय पर 30 दिन से पुरानी प्रविष्टियाँ साफ़ करता है |
| POST | `/restore/:id` | JWT | Content.Edit | इतिहास स्नैपशॉट से पेज/ब्लॉक पुनर्स्थापित करें (मौजूदा कंटेंट हटाकर स्नैपशॉट से दोबारा बनाता है) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | इनलाइन स्नैपशॉट ऑब्जेक्ट से पुनर्स्थापित करें। बॉडी: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Base path: `/content/posts`

ब्लॉग पोस्ट स्वतंत्र पंक्तियाँ हैं: `title`, `slug` (हर चर्च में अद्वितीय), `excerpt`, `content` (markdown बॉडी), `authorId`, `photoUrl`, `publishDate`, `category` और `tags`। `publishDate` सेट होने और अतीत में होने पर पोस्ट प्रकाशित मानी जाती है। पढ़ने वाले एंडपॉइंट हर पोस्ट में `authorId` से हल किया गया `authorName` जोड़ते हैं। देखें [Website Builder Architecture](../../architecture/website-builder#blog)।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | प्रकाशित पोस्ट, पृष्ठांकित (प्रति पेज अधिकतम 50) |
| GET | `/public/:churchId/categories` | Public | — | प्रकाशित पोस्ट में अलग-अलग श्रेणियाँ |
| GET | `/public/:churchId/slug/:slug` | Public | — | slug के आधार पर प्रकाशित पोस्ट प्राप्त करें |
| GET | `/rss/:churchId?siteUrl=` | Public | — | प्रकाशित पोस्ट का RSS 2.0 फ़ीड (लिंक `{siteUrl}/blog/{slug}` के रूप में बनते हैं) |
| GET | `/:id` | JWT | — | ID के आधार पर पोस्ट प्राप्त करें |
| GET | `/` | JWT | — | चर्च की सभी पोस्ट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | पोस्ट बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | पोस्ट हटाएँ |

## Redirects

Base path: `/content/redirects`

प्रति चर्च URL रीडायरेक्ट (`fromPath` → `toPath`), प्रति चर्च अधिकतम 200। पथ सामान्यीकृत होते हैं (छोटे अक्षर, आरंभ में स्लैश, अंत में स्लैश नहीं) और प्रति चर्च `fromPath` अद्वितीय होता है। B1App संभावित 404 पर इन्हें हल करता है और HTTP 308 जारी करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | एक पथ हल करें (`path` छोड़ने पर सभी रीडायरेक्ट सूचीबद्ध करें) |
| GET | `/:id` | JWT | — | ID के आधार पर रीडायरेक्ट प्राप्त करें |
| GET | `/` | JWT | — | चर्च के सभी रीडायरेक्ट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | रीडायरेक्ट बनाएँ या अपडेट करें। `fromPath = toPath` को अस्वीकार करता है और 200-पंक्ति सीमा लागू करता है |
| DELETE | `/:id` | JWT | Content.Edit | रीडायरेक्ट हटाएँ |

## Sermons

Base path: `/content/sermons`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | FreeShow प्लेलिस्ट संरचना का नमूना प्राप्त करें |
| GET | `/public/tvWrapper/:churchId` | JWT | — | सरमन, पाठ और FreeShow स्रोतों सहित TV ऐप रैपर प्राप्त करें |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | एक सरमन को TV फ़ीड प्लेलिस्ट के रूप में प्राप्त करें |
| GET | `/public/tvFeed/:churchId` | Public | — | सभी सार्वजनिक प्लेलिस्ट/सरमन को TV फ़ीड के रूप में प्राप्त करें |
| GET | `/public/:churchId` | Public | — | किसी चर्च के सभी सार्वजनिक सरमन सूचीबद्ध करें |
| GET | `/timeline?sermonIds=` | JWT | — | सरमन का टाइमलाइन डेटा लोड करें |
| GET | `/lookup?videoType=&videoData=` | Public | — | YouTube या Vimeo से सरमन की मेटाडेटा खोजें |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | सरमन के उपशीर्षकों से AI सोशल मीडिया पोस्ट सुझाव बनाएँ |
| GET | `/outline?url=&title=&author=` | JWT | — | URL से AI पाठ की रूपरेखा बनाएँ |
| GET | `/youtubeImport/:channelId` | JWT | — | YouTube चैनल से वीडियो आयात करें। YouTube के सर्च API द्वारा शीर्षकों और विवरणों में दिए गए HTML एंटिटी (जैसे `&amp;` और `&#39;`) डिकोड किए जाते हैं |
| GET | `/vimeoImport/:channelId` | JWT | — | Vimeo चैनल से वीडियो आयात करें |
| GET | `/:id` | JWT | — | ID के आधार पर सरमन प्राप्त करें |
| GET | `/` | JWT | — | सभी सरमन सूचीबद्ध करें |
| POST | `/` | JWT | StreamingServices.Edit | सरमन बनाएँ या अपडेट करें। एक सरणी या एकल सरमन ऑब्जेक्ट स्वीकार करता है (हमेशा सरणी लौटाता है); खाली बॉडी पर 400 लौटता है। base64 थंबनेल अपलोड का समर्थन करता है |
| DELETE | `/:id` | JWT | StreamingServices.Edit | सरमन हटाएँ |

### उदाहरण: YouTube सरमन खोजें

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

## Playlists

Base path: `/content/playlists`

मानक CRUD का विस्तार (बेस क्लास से GET `/:id`, GET `/`, DELETE `/:id`, लिखने के लिए StreamingServices.Edit अनुमति के साथ)।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID के आधार पर प्लेलिस्ट प्राप्त करें |
| GET | `/` | JWT | — | सभी प्लेलिस्ट सूचीबद्ध करें |
| GET | `/public/:churchId` | Public | — | किसी चर्च की सभी सार्वजनिक प्लेलिस्ट सूचीबद्ध करें |
| POST | `/` | JWT | StreamingServices.Edit | प्लेलिस्ट बनाएँ या अपडेट करें (बैच, base64 थंबनेल अपलोड का समर्थन) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | प्लेलिस्ट हटाएँ |

## Streaming Services

Base path: `/content/streamingServices`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | किसी सेवा के लिए एन्क्रिप्टेड होस्ट चैट रूम ID प्राप्त करें |
| GET | `/` | JWT | — | सभी स्ट्रीमिंग सेवाएँ सूचीबद्ध करें। समाप्त हो चुकी गैर-आवर्ती सेवाएँ स्वतः साफ़ होती हैं और आवर्ती सेवाएँ आगे बढ़ा दी जाती हैं |
| POST | `/` | JWT | StreamingServices.Edit | स्ट्रीमिंग सेवाएँ बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | स्ट्रीमिंग सेवा हटाएँ (ब्लॉक किए गए IP भी साफ़ करता है) |

## Events

Base path: `/content/events`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | किसी समूह के लिए टाइमलाइन इवेंट लोड करें (अपवाद तिथियाँ शामिल, ताकि हटाई गई घटनाएँ छोड़ी जा सकें) |
| GET | `/timeline?eventIds=` | JWT | — | वर्तमान उपयोगकर्ता के समूहों के लिए टाइमलाइन इवेंट लोड करें (अपवाद तिथियाँ शामिल) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | इवेंट को ICS कैलेंडर फ़ीड के रूप में सब्सक्राइब करें |
| GET | `/group/:groupId` | JWT | — | किसी समूह के इवेंट प्राप्त करें (अपवाद तिथियाँ शामिल) |
| GET | `/public/group/:churchId/:groupId` | Public | — | किसी समूह के सार्वजनिक इवेंट प्राप्त करें |
| GET | `/public/:churchId/:id` | Public | — | सार्वजनिक पेज के लिए एक इवेंट प्राप्त करें, जिसमें `roomNames` (ऐसी बुकिंग के कमरे जो अस्वीकृत नहीं हैं) शामिल हैं। लंबित या अस्वीकृत इवेंट के लिए, और ऐसे निजी इवेंट के लिए जो पंजीकरण नहीं लेते, `null` लौटाता है |
| GET | `/public/:churchId/:id/ical` | Public | — | उस एकल इवेंट को `.ics` फ़ाइल के रूप में डाउनलोड करें (`text/calendar`, अपवाद तिथियाँ लागू)। जब इवेंट उन्हीं नियमों से छिपा हो तो `404` |
| GET | `/:id` | JWT | — | ID के आधार पर इवेंट प्राप्त करें |
| POST | `/` | JWT | — | इवेंट बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, या group leader | इवेंट और उसकी बुकिंग हटाएँ। इवेंट के समूह के लीडर इसे हटा सकते हैं, और अनुरोधकर्ता अपना लंबित अनुरोध वापस ले सकता है |

इवेंट रिकॉर्ड में `photoUrl` (सार्वजनिक इवेंट पेज और आगामी इवेंट टाइल्स पर दिखाई जाने वाली 16:9 इवेंट फ़ोटो), `tags` (कॉमा-से-अलग, वेबसाइट Calendar एलिमेंट के टैग फ़िल्टर द्वारा उपयोग), और `notesViewRole` / `notesPostRole` (`null` होने पर `staff`, या `leaders`, या `members`) शामिल हैं, जो इवेंट की `eventNote` बातचीत को नियंत्रित करते हैं — देखें [Group and event notes access control](./messaging.md#group-and-event-notes-access-control)। सार्वजनिक क्यूरेटेड-इवेंट प्रतिक्रियाओं में भी हर इवेंट का `photoUrl` और `tags` शामिल होते हैं।

## Event Exceptions

Base path: `/content/eventExceptions`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID के आधार पर इवेंट अपवाद प्राप्त करें |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, या group leader | इवेंट अपवाद बनाएँ या अपडेट करें (बैच)। लीडर केवल अपने समूहों के इवेंट के लिए अपवाद जोड़ सकते हैं |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, या group leader | इवेंट अपवाद हटाएँ |

## Curated Calendars

Base path: `/content/curatedCalendars`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID के आधार पर क्यूरेटेड कैलेंडर प्राप्त करें |
| GET | `/` | JWT | — | सभी क्यूरेटेड कैलेंडर सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | क्यूरेटेड कैलेंडर बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | क्यूरेटेड कैलेंडर हटाएँ |

## Curated Events

Base path: `/content/curatedEvents`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | किसी कैलेंडर के क्यूरेटेड इवेंट प्राप्त करें (इवेंट विवरण और अपवाद तिथियाँ शामिल, जब तक `?withoutEvents` सेट न हो) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | किसी कैलेंडर के सार्वजनिक क्यूरेटेड इवेंट प्राप्त करें |
| GET | `/:id` | JWT | — | ID के आधार पर क्यूरेटेड इवेंट प्राप्त करें |
| GET | `/` | JWT | — | सभी क्यूरेटेड इवेंट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | क्यूरेटेड इवेंट बनाएँ या अपडेट करें। विशिष्ट समूह इवेंट जोड़ने के लिए `eventIds` सरणी समर्थित है |
| DELETE | `/:id` | JWT | Content.Edit | क्यूरेटेड इवेंट हटाएँ |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | क्यूरेटेड कैलेंडर से एक विशिष्ट इवेंट हटाएँ |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | क्यूरेटेड कैलेंडर से किसी समूह के सभी इवेंट हटाएँ |

## Files

Base path: `/content/files`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | कंटेंट प्रकार और कंटेंट ID के आधार पर फ़ाइलें प्राप्त करें |
| GET | `/` | JWT | — | चर्च वेबसाइट की सभी फ़ाइलें सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID के आधार पर फ़ाइल प्राप्त करें |
| POST | `/` | JWT | Content.Edit* | फ़ाइलें अपलोड करें (base64)। *यदि उपयोगकर्ता `contentId` से मेल खाने वाले समूह का सदस्य है तो भी अनुमति है |
| POST | `/postUrl` | JWT | Content.Edit* | पूर्व-हस्ताक्षरित S3 अपलोड URL प्राप्त करें। *समूह सदस्यों के लिए भी अनुमति है। प्रति कंटेंट आइटम अधिकतम 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | फ़ाइल हटाएँ और स्टोरेज से निकालें। *समूह सदस्यों के लिए भी अनुमति है |

## Gallery

Base path: `/content/gallery`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | किसी फ़ोल्डर के स्टॉक फ़ोटो सूचीबद्ध करें |
| GET | `/:folder` | JWT | Content.Edit | किसी फ़ोल्डर की गैलरी छवियाँ सूचीबद्ध करें |
| POST | `/requestUpload` | JWT | Content.Edit | गैलरी छवि के लिए पूर्व-हस्ताक्षरित S3 अपलोड URL प्राप्त करें |
| DELETE | `/:folder/:image` | JWT | Content.Edit | गैलरी छवि हटाएँ |

## Bibles

Base path: `/content/bibles`

सभी बाइबल एंडपॉइंट सार्वजनिक हैं (कोई प्रमाणीकरण आवश्यक नहीं)। डेटा बाहरी स्रोतों से लाया जाता है और स्थानीय रूप से कैश किया जाता है। api.bible के अनुरोध 15 सेकंड के बाद समय-सीमा पार कर जाते हैं; समय-सीमा पार होने पर **504** लौटता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | सभी बाइबल अनुवाद सूचीबद्ध करें (कैश खाली हो तो स्रोत से लाता है) |
| GET | `/stats?startDate=&endDate=` | Public | — | किसी तारीख सीमा के लिए बाइबल खोज के आँकड़े प्राप्त करें |
| GET | `/availableTranslations/:source` | Public | — | किसी स्रोत (जैसे api.bible) से उपलब्ध अनुवाद सूचीबद्ध करें |
| GET | `/updateTranslations` | Public | — | सभी स्रोतों के सभी अनुवाद सिंक करें |
| GET | `/updateTranslations/:source` | Public | — | किसी विशिष्ट स्रोत से अनुवाद सिंक करें |
| GET | `/updateCopyrights` | Public | — | जिन अनुवादों में कॉपीराइट जानकारी नहीं है, उनकी कॉपीराइट जानकारी अपडेट करें |
| GET | `/:translationKey/updateCopyright` | Public | — | किसी विशिष्ट अनुवाद का कॉपीराइट अपडेट करें |
| GET | `/:translationKey/search?query=&limit=` | Public | — | किसी अनुवाद में वचन खोजें |
| GET | `/:translationKey/books` | Public | — | किसी अनुवाद की पुस्तकें प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | किसी पुस्तक के अध्याय प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | किसी अध्याय के वचन प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | एक सीमा के वचनों का पाठ प्राप्त करें। खोजों को लॉग करता है। कुछ अनुवाद लाइसेंसिंग के कारण कैश बायपास करते हैं |

### उदाहरण: वचन का पाठ प्राप्त करें

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

## Songs

Base path: `/content/songs`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | क्वेरी से गाने खोजें |
| GET | `/:id` | JWT | — | ID के आधार पर गाना प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी गाने सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | गाने बनाएँ या अपडेट करें (बैच) |
| POST | `/import` | JWT | — | FreeShow से गाने आयात करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | गाना हटाएँ |

## Song Details

Base path: `/content/songDetails`

गाने का विवरण वैश्विक है (चर्च-विशिष्ट नहीं)। ये सभी चर्चों में साझा किए गए मानक गीत मेटाडेटा को दर्शाते हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID के आधार पर गाने का विवरण प्राप्त करें (वैश्विक) |
| GET | `/` | JWT | — | चर्च के लिए गाने के विवरण सूचीबद्ध करें |
| POST | `/create` | JWT | — | PraiseCharts ID से गाने का विवरण बनाएँ (यदि पहले से बना है तो मौजूदा लौटाता है)। PraiseCharts और MusicBrainz से मेटाडेटा स्वतः लाता है |
| POST | `/` | JWT | — | गाने के विवरण बनाएँ या अपडेट करें (बैच) |

## Song Detail Links

Base path: `/content/songDetailLinks`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID के आधार पर गाने के विवरण का लिंक प्राप्त करें |
| GET | `/songDetail/:songDetailId` | JWT | — | किसी गाने के विवरण के सभी लिंक प्राप्त करें |
| POST | `/` | JWT | — | गाने के विवरण के लिंक बनाएँ या अपडेट करें (बैच)। जुड़ा होने पर MusicBrainz डेटा स्वतः लाता है |
| DELETE | `/:id` | JWT | — | गाने के विवरण का लिंक हटाएँ |

## Arrangements

Base path: `/content/arrangements`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID के आधार पर व्यवस्था (arrangement) प्राप्त करें |
| GET | `/song/:songId` | JWT | Content.Edit | किसी गाने की व्यवस्थाएँ प्राप्त करें |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | किसी गाने के विवरण की व्यवस्थाएँ प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी व्यवस्थाएँ सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | व्यवस्थाएँ बनाएँ या अपडेट करें (बैच) |
| POST | `/freeShow/missing` | JWT | — | FreeShow ID खोजें जो चर्च में मौजूद नहीं हैं। बॉडी: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | व्यवस्था हटाएँ (उसकी कुंजियाँ भी हटाता है; कोई व्यवस्था न बचे तो गाना भी हटाता है) |

## Arrangement Keys

Base path: `/content/arrangementKeys`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | प्रस्तुतकर्ता दृश्य के लिए पूर्ण गाने के डेटा सहित व्यवस्था कुंजी प्राप्त करें |
| GET | `/:id` | JWT | — | ID के आधार पर व्यवस्था कुंजी प्राप्त करें |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | किसी व्यवस्था की कुंजियाँ प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी व्यवस्था कुंजियाँ सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | व्यवस्था कुंजियाँ बनाएँ या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | व्यवस्था कुंजी हटाएँ |

## Settings

Base path: `/content/settings`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सेटिंग्स प्राप्त करें |
| GET | `/` | JWT | Settings.Edit | चर्च की सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | Public | — | किसी चर्च की सार्वजनिक सेटिंग्स प्राप्त करें (की-वैल्यू जोड़ों के रूप में लौटाई जाती हैं) |
| POST | `/my` | JWT | — | उपयोगकर्ता-स्तरीय सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |
| POST | `/` | JWT | Settings.Edit | चर्च-स्तरीय सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |
| DELETE | `/my/:id` | JWT | — | उपयोगकर्ता सेटिंग हटाएँ |

## Preview

Base path: `/content/preview`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | सबडोमेन कुंजी के आधार पर किसी चर्च का स्ट्रीमिंग प्रीव्यू डेटा लोड करें (टैब, लिंक, सेवाएँ, सरमन) |

## Gallery (Stock Photos)

Base path: `/content/stock`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Pexels स्टॉक फ़ोटो खोजें। बॉडी: `{ term: "church" }` |

## PraiseCharts

Base path: `/content/praiseCharts`

आराधना गीतों की खोज और शीट म्यूज़िक डाउनलोड के लिए PraiseCharts के साथ इंटीग्रेशन।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | किसी गाने का कच्चा PraiseCharts डेटा प्राप्त करें |
| GET | `/hasAccount` | JWT | — | जाँचें कि उपयोगकर्ता का कोई लिंक किया गया PraiseCharts खाता है या नहीं |
| GET | `/search?q=` | JWT | — | PraiseCharts कैटलॉग खोजें |
| GET | `/products/:id?keys=` | JWT | — | किसी गाने के उत्पाद प्राप्त करें (प्रमाणित होने पर लाइब्रेरी से, अन्यथा कैटलॉग से) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | लाइब्रेरी से कच्चा व्यवस्था डेटा प्राप्त करें |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts से फ़ाइल डाउनलोड करें (PDF या ZIP)। `{ redirectUrl }` लौटाता है |
| GET | `/authUrl?returnUrl=` | Public | — | PraiseCharts के लिए OAuth प्राधिकरण URL प्राप्त करें |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth verifier को एक्सेस टोकन के लिए बदलें और उपयोगकर्ता सेटिंग्स में सहेजें |
| GET | `/library` | JWT | — | उपयोगकर्ता की PraiseCharts लाइब्रेरी ब्राउज़ करें |

## Support

Base path: `/content/support`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | AWS Polly का उपयोग करके SSML को MP3 ऑडियो में बदलें। बॉडी: `{ ssml: "<speak>...</speak>" }` |

## Related Pages

- [Website Builder Architecture](../../architecture/website-builder) -- पेज, सेक्शन, एलिमेंट, पोस्ट और रीडायरेक्ट सभी ऐप्स में कैसे जुड़ते हैं
- [Membership Endpoints](./membership) -- व्यक्ति, चर्च, समूह, भूमिकाएँ, अनुमतियाँ
- [Attendance Endpoints](./attendance) -- सेवा और विज़िट ट्रैकिंग
- [Authentication & Permissions](./authentication) -- लॉगिन प्रवाह, JWT, अनुमति मॉडल
- [Module Structure](../module-structure) -- कोड संगठन के पैटर्न
