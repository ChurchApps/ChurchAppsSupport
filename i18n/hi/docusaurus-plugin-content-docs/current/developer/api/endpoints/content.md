---
title: "Content एंडपॉइंट्स"
---

# Content एंडपॉइंट्स

<div class="article-intro">

Content मॉड्यूल वेबसाइट पेजों, सेक्शंस, एलिमेंट्स, ब्लॉक्स, ब्लॉग पोस्ट्स, रीडायरेक्ट्स, सर्मन्स, प्लेलिस्ट्स, स्ट्रीमिंग सर्विसेज़, इवेंट्स, क्यूरेटेड कैलेंडर्स, फ़ाइल्स, गैलरीज़, बाइबल ट्रांसलेशंस और वर्स लुकअप्स, सॉन्ग्स, अरेंजमेंट्स, ग्लोबल स्टाइल्स, स्टॉक फ़ोटोज़, और सेटिंग्स को मैनेज करता है। यह API का सबसे बड़ा मॉड्यूल है और सभी ChurchApps एप्लिकेशंस में CMS, मीडिया/स्ट्रीमिंग, वर्शिप प्लानिंग, और बाइबल फ़ीचर्स को पावर देता है।

</div>

**बेस पथ:** `/content`

## Pages

बेस पथ: `/content/pages`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | सार्वजनिक | — | URL या ID से पूरा पेज ट्री (सेक्शंस, एलिमेंट्स, ब्लॉक्स) लोड करें। URL से प्राप्त करते समय आंतरिक IDs हटा देता है। URL-आधारित प्राप्तियाँ `pages.visibility` लागू करती हैं — कोई गेटेड पेज `{ restricted: true, visibility }` लौटाता है जब तक (वैकल्पिक) JWT उस गेट को पूरा न करे |
| GET | `/public/:churchId` | सार्वजनिक | — | सार्वजनिक पेज सूचीबद्ध करें (`url`, `title`, `metaDescription`); केवल `visibility = everyone` |
| GET | `/:id` | JWT | — | ID से एक पेज प्राप्त करें |
| GET | `/` | JWT | — | चर्च के लिए सभी पेज सूचीबद्ध करें |
| POST | `/duplicate/:id` | JWT | Content.Edit | सभी सेक्शंस और एलिमेंट्स के साथ किसी पेज को डुप्लिकेट करें |
| POST | `/temp/ai` | JWT | Content.Edit | AI-जनरेटेड पेज सेव करें (एक ही कॉल में पेज, सेक्शंस, और एलिमेंट्स) |
| POST | `/` | JWT | Content.Edit | पेज बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | एक पेज हटाएं |

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

बेस पथ: `/content/sections`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से एक सेक्शन प्राप्त करें |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | किसी सेक्शन को डुप्लिकेट करें या उसे पुन: उपयोग योग्य ब्लॉक में बदलें |
| POST | `/` | JWT | Content.Edit | सेक्शंस बनाएं या अपडेट करें (बैच)। सॉर्ट ऑर्डर स्वतः अपडेट करता है |
| DELETE | `/:id` | JWT | Content.Edit | एक सेक्शन हटाएं (सॉर्ट ऑर्डर स्वतः अपडेट करता है) |

## Elements

बेस पथ: `/content/elements`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से एक एलिमेंट प्राप्त करें |
| POST | `/duplicate/:id` | JWT | Content.Edit | सभी चाइल्ड एलिमेंट्स सहित किसी एलिमेंट को डुप्लिकेट करें |
| POST | `/` | JWT | Content.Edit | एलिमेंट्स बनाएं या अपडेट करें (बैच)। रो कॉलम्स और कैरूसेल स्लाइड्स को स्वतः मैनेज करता है |
| DELETE | `/:id` | JWT | Content.Edit | एक एलिमेंट हटाएं |

## Blocks

बेस पथ: `/content/blocks`

मानक CRUD विस्तारित करता है (बेस क्लास से GET `/:id`, GET `/`, POST `/`, DELETE `/:id`, लिखने के लिए Content.Edit अनुमति के साथ)।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से एक ब्लॉक प्राप्त करें |
| GET | `/` | JWT | — | सभी ब्लॉक्स सूचीबद्ध करें |
| GET | `/:churchId/tree/:id` | सार्वजनिक | — | सेक्शंस और एलिमेंट्स सहित पूरा ब्लॉक ट्री लोड करें |
| GET | `/blockType/:blockType` | JWT | — | टाइप से ब्लॉक्स लोड करें (जैसे footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | सार्वजनिक | — | किसी चर्च के लिए फ़ुटर ब्लॉक ट्री लोड करें |
| POST | `/` | JWT | Content.Edit | ब्लॉक्स बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Content.Edit | एक ब्लॉक हटाएं |

## Links

बेस पथ: `/content/links`

मानक CRUD विस्तारित करता है (बेस क्लास से GET `/:id`, GET `/`, POST `/`, DELETE `/:id`, लिखने के लिए Content.Edit अनुमति के साथ)।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से एक लिंक प्राप्त करें |
| GET | `/` | JWT | — | सभी लिंक सूचीबद्ध करें। वैकल्पिक `?category=` फ़िल्टर। सेव होने के बाद स्वतः सॉर्ट होता है |
| GET | `/church/:churchId/filtered?category=` | JWT | — | विज़िबिलिटी (everyone, visitors, members, staff, groups) से फ़िल्टर किए गए लिंक लोड करें |
| GET | `/church/:churchId?category=` | सार्वजनिक | — | किसी चर्च के लिए श्रेणी से लिंक लोड करें (सार्वजनिक) |
| POST | `/` | JWT | Content.Edit | लिंक बनाएं या अपडेट करें (बैच)। श्रेणी के अनुसार स्वतः सॉर्ट करता है |
| DELETE | `/:id` | JWT | Content.Edit | एक लिंक हटाएं |

## Global Styles

बेस पथ: `/content/globalStyles`

मानक CRUD विस्तारित करता है (बेस क्लास से POST `/`, DELETE `/:id`, लिखने के लिए Content.Edit अनुमति के साथ)।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | सार्वजनिक | — | किसी चर्च के लिए ग्लोबल स्टाइल्स लोड करें (यदि कोई सेट न हो तो डिफ़ॉल्ट लौटाता है) |
| GET | `/` | JWT | — | ऑथेंटिकेटेड चर्च के लिए ग्लोबल स्टाइल्स लोड करें |
| POST | `/` | JWT | Content.Edit | ग्लोबल स्टाइल्स बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Content.Edit | ग्लोबल स्टाइल्स हटाएं |

## Page History

बेस पथ: `/content/pageHistory`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | किसी पेज के लिए हिस्ट्री एंट्रीज़ सूचीबद्ध करें |
| GET | `/block/:blockId` | JWT | Content.Edit | किसी ब्लॉक के लिए हिस्ट्री एंट्रीज़ सूचीबद्ध करें |
| GET | `/:id` | JWT | Content.Edit | ID से एक हिस्ट्री एंट्री प्राप्त करें |
| POST | `/` | JWT | Content.Edit | पेज/ब्लॉक का स्नैपशॉट सेव करें। समय-समय पर 30 दिनों से पुरानी एंट्रीज़ साफ़ करता है |
| POST | `/restore/:id` | JWT | Content.Edit | किसी हिस्ट्री स्नैपशॉट से पेज/ब्लॉक रीस्टोर करें (मौजूदा कंटेंट हटाकर स्नैपशॉट से फिर से बनाता है) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | इनलाइन स्नैपशॉट ऑब्जेक्ट से रीस्टोर करें। बॉडी: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

बेस पथ: `/content/posts`

ब्लॉग पोस्ट्स स्टैंडअलोन रो हैं: `title`, `slug` (प्रति चर्च यूनीक), `excerpt`, `content` (मार्कडाउन बॉडी), `authorId`, `photoUrl`, `publishDate`, `category`, और `tags`। कोई पोस्ट तब पब्लिश्ड मानी जाती है जब `publishDate` सेट हो और अतीत में हो। रीड एंडपॉइंट्स हर पोस्ट को `authorId` से रिज़ॉल्व किए गए `authorName` से समृद्ध करते हैं। देखें [Website Builder Architecture](../../architecture/website-builder#blog)।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | सार्वजनिक | — | पब्लिश्ड पोस्ट्स सूचीबद्ध करें, पेजिनेटेड (प्रति पेज अधिकतम 50) |
| GET | `/public/:churchId/categories` | सार्वजनिक | — | पब्लिश्ड पोस्ट्स में अलग-अलग श्रेणियाँ |
| GET | `/public/:churchId/slug/:slug` | सार्वजनिक | — | slug से एक पब्लिश्ड पोस्ट प्राप्त करें |
| GET | `/rss/:churchId?siteUrl=` | सार्वजनिक | — | पब्लिश्ड पोस्ट्स का RSS 2.0 फ़ीड (लिंक्स `{siteUrl}/blog/{slug}` के रूप में बनते हैं) |
| GET | `/:id` | JWT | — | ID से एक पोस्ट प्राप्त करें |
| GET | `/` | JWT | — | चर्च के लिए सभी पोस्ट्स सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | पोस्ट्स बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | एक पोस्ट हटाएं |

## Redirects

बेस पथ: `/content/redirects`

प्रति चर्च URL रीडायरेक्ट्स (`fromPath` → `toPath`), प्रति चर्च अधिकतम 200 तक सीमित। पथ नॉर्मलाइज़ किए जाते हैं (लोअरकेस, लीडिंग स्लैश, बिना ट्रेलिंग स्लैश) और `fromPath` प्रति चर्च यूनीक है। B1App would-be 404s पर इन्हें रिज़ॉल्व करता है और एक HTTP 308 जारी करता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | सार्वजनिक | — | किसी पथ को रिज़ॉल्व करें (जब `path` छोड़ा जाए तो सभी रीडायरेक्ट्स सूचीबद्ध करें) |
| GET | `/:id` | JWT | — | ID से एक रीडायरेक्ट प्राप्त करें |
| GET | `/` | JWT | — | चर्च के लिए सभी रीडायरेक्ट्स सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | रीडायरेक्ट्स बनाएं या अपडेट करें। `fromPath = toPath` को अस्वीकार करता है और 200-रो सीमा लागू करता है |
| DELETE | `/:id` | JWT | Content.Edit | एक रीडायरेक्ट हटाएं |

## Sermons

बेस पथ: `/content/sermons`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | एक सैंपल FreeShow प्लेलिस्ट संरचना प्राप्त करें |
| GET | `/public/tvWrapper/:churchId` | JWT | — | सर्मन, लेसन, और FreeShow सोर्सेज़ के साथ TV ऐप रैपर प्राप्त करें |
| GET | `/public/tvFeed/:churchId/:sermonId` | सार्वजनिक | — | एक सिंगल सर्मन को TV फ़ीड प्लेलिस्ट के रूप में प्राप्त करें |
| GET | `/public/tvFeed/:churchId` | सार्वजनिक | — | सभी सार्वजनिक प्लेलिस्ट्स/सर्मन्स को TV फ़ीड के रूप में प्राप्त करें |
| GET | `/public/:churchId` | सार्वजनिक | — | किसी चर्च के लिए सभी सार्वजनिक सर्मन्स सूचीबद्ध करें |
| GET | `/timeline?sermonIds=` | JWT | — | सर्मन्स के लिए टाइमलाइन डेटा लोड करें |
| GET | `/lookup?videoType=&videoData=` | सार्वजनिक | — | YouTube या Vimeo से सर्मन मेटाडेटा देखें |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | सर्मन सबटाइटल्स से AI सोशल मीडिया पोस्ट सुझाव जनरेट करें |
| GET | `/outline?url=&title=&author=` | JWT | — | किसी URL से AI लेसन आउटलाइन जनरेट करें |
| GET | `/youtubeImport/:channelId` | JWT | — | किसी YouTube चैनल से वीडियो इम्पोर्ट करें |
| GET | `/vimeoImport/:channelId` | JWT | — | किसी Vimeo चैनल से वीडियो इम्पोर्ट करें |
| GET | `/:id` | JWT | — | ID से एक सर्मन प्राप्त करें |
| GET | `/` | JWT | — | सभी सर्मन्स सूचीबद्ध करें |
| POST | `/` | JWT | StreamingServices.Edit | सर्मन्स बनाएं या अपडेट करें (बैच, base64 थंबनेल अपलोड सपोर्ट करता है) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | एक सर्मन हटाएं |

### उदाहरण: एक YouTube सर्मन देखें

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

बेस पथ: `/content/playlists`

मानक CRUD विस्तारित करता है (बेस क्लास से GET `/:id`, GET `/`, DELETE `/:id`, लिखने के लिए StreamingServices.Edit अनुमति के साथ)।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से एक प्लेलिस्ट प्राप्त करें |
| GET | `/` | JWT | — | सभी प्लेलिस्ट्स सूचीबद्ध करें |
| GET | `/public/:churchId` | सार्वजनिक | — | किसी चर्च के लिए सभी सार्वजनिक प्लेलिस्ट्स सूचीबद्ध करें |
| POST | `/` | JWT | StreamingServices.Edit | प्लेलिस्ट्स बनाएं या अपडेट करें (बैच, base64 थंबनेल अपलोड सपोर्ट करता है) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | एक प्लेलिस्ट हटाएं |

## Streaming Services

बेस पथ: `/content/streamingServices`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | किसी सर्विस के लिए एन्क्रिप्टेड होस्ट चैट रूम ID प्राप्त करें |
| GET | `/` | JWT | — | सभी स्ट्रीमिंग सर्विसेज़ सूचीबद्ध करें। एक्सपायर्ड नॉन-रिकरिंग सर्विसेज़ को स्वतः साफ़ करता है और रिकरिंग वाली को आगे बढ़ाता है |
| POST | `/` | JWT | StreamingServices.Edit | स्ट्रीमिंग सर्विसेज़ बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | एक स्ट्रीमिंग सर्विस हटाएं (ब्लॉक्ड IPs भी साफ़ करता है) |

## Events

बेस पथ: `/content/events`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | किसी ग्रुप के लिए टाइमलाइन इवेंट्स लोड करें |
| GET | `/timeline?eventIds=` | JWT | — | वर्तमान यूज़र के ग्रुप्स के लिए टाइमलाइन इवेंट्स लोड करें |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | सार्वजनिक | — | ICS कैलेंडर फ़ीड के रूप में इवेंट्स को सब्सक्राइब करें |
| GET | `/group/:groupId` | JWT | — | किसी ग्रुप के लिए इवेंट्स प्राप्त करें (एक्सेप्शन तारीखें सहित) |
| GET | `/public/group/:churchId/:groupId` | सार्वजनिक | — | किसी ग्रुप के लिए सार्वजनिक इवेंट्स प्राप्त करें |
| GET | `/:id` | JWT | — | ID से एक इवेंट प्राप्त करें |
| POST | `/` | JWT | — | इवेंट्स बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | एक इवेंट हटाएं |

## Event Exceptions

बेस पथ: `/content/eventExceptions`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से एक इवेंट एक्सेप्शन प्राप्त करें |
| POST | `/` | JWT | Content.Edit | इवेंट एक्सेप्शंस बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | एक इवेंट एक्सेप्शन हटाएं |

## Curated Calendars

बेस पथ: `/content/curatedCalendars`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से एक क्यूरेटेड कैलेंडर प्राप्त करें |
| GET | `/` | JWT | — | सभी क्यूरेटेड कैलेंडर्स सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | क्यूरेटेड कैलेंडर्स बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | एक क्यूरेटेड कैलेंडर हटाएं |

## Curated Events

बेस पथ: `/content/curatedEvents`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | किसी कैलेंडर के लिए क्यूरेटेड इवेंट्स प्राप्त करें (जब तक `?withoutEvents` सेट न हो, इवेंट विवरण और एक्सेप्शन तारीखें शामिल) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | सार्वजनिक | — | किसी कैलेंडर के लिए सार्वजनिक क्यूरेटेड इवेंट्स प्राप्त करें |
| GET | `/:id` | JWT | — | ID से एक क्यूरेटेड इवेंट प्राप्त करें |
| GET | `/` | JWT | — | सभी क्यूरेटेड इवेंट्स सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | क्यूरेटेड इवेंट्स बनाएं या अपडेट करें। विशिष्ट ग्रुप इवेंट्स जोड़ने के लिए `eventIds` array सपोर्ट करता है |
| DELETE | `/:id` | JWT | Content.Edit | एक क्यूरेटेड इवेंट हटाएं |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | किसी क्यूरेटेड कैलेंडर से एक विशिष्ट इवेंट हटाएं |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | किसी क्यूरेटेड कैलेंडर से किसी ग्रुप के सभी इवेंट्स हटाएं |

## Files

बेस पथ: `/content/files`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | कंटेंट टाइप और कंटेंट ID से फ़ाइलें प्राप्त करें |
| GET | `/` | JWT | — | चर्च वेबसाइट के लिए सभी फ़ाइलें सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID से एक फ़ाइल प्राप्त करें |
| POST | `/` | JWT | Content.Edit* | फ़ाइलें अपलोड करें (base64)। *यह तब भी अनुमति है जब यूज़र उस ग्रुप का सदस्य हो जो `contentId` से मेल खाता है |
| POST | `/postUrl` | JWT | Content.Edit* | एक प्री-साइन्ड S3 अपलोड URL प्राप्त करें। *ग्रुप सदस्यों के लिए भी अनुमति है। प्रति कंटेंट आइटम अधिकतम 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | एक फ़ाइल हटाएं और स्टोरेज से निकालें। *ग्रुप सदस्यों के लिए भी अनुमति है |

## Gallery

बेस पथ: `/content/gallery`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | सार्वजनिक | — | किसी फ़ोल्डर में स्टॉक फ़ोटोज़ सूचीबद्ध करें |
| GET | `/:folder` | JWT | Content.Edit | किसी फ़ोल्डर में गैलरी इमेजेज़ सूचीबद्ध करें |
| POST | `/requestUpload` | JWT | Content.Edit | गैलरी इमेज के लिए प्री-साइन्ड S3 अपलोड URL प्राप्त करें |
| DELETE | `/:folder/:image` | JWT | Content.Edit | एक गैलरी इमेज हटाएं |

## Bibles

बेस पथ: `/content/bibles`

सभी बाइबल एंडपॉइंट्स सार्वजनिक हैं (कोई ऑथेंटिकेशन आवश्यक नहीं)। डेटा बाहरी सोर्सेज़ से लाया जाता है और लोकली कैश किया जाता है।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | सार्वजनिक | — | सभी बाइबल ट्रांसलेशंस सूचीबद्ध करें (यदि कैश खाली है तो सोर्स से लाता है) |
| GET | `/stats?startDate=&endDate=` | सार्वजनिक | — | किसी तारीख सीमा के लिए बाइबल लुकअप स्टैटिस्टिक्स प्राप्त करें |
| GET | `/availableTranslations/:source` | सार्वजनिक | — | किसी सोर्स (जैसे api.bible) से उपलब्ध ट्रांसलेशंस सूचीबद्ध करें |
| GET | `/updateTranslations` | सार्वजनिक | — | सभी सोर्सेज़ से सभी ट्रांसलेशंस सिंक करें |
| GET | `/updateTranslations/:source` | सार्वजनिक | — | किसी विशिष्ट सोर्स से ट्रांसलेशंस सिंक करें |
| GET | `/updateCopyrights` | सार्वजनिक | — | जिन ट्रांसलेशंस में कॉपीराइट जानकारी नहीं है उनके लिए अपडेट करें |
| GET | `/:translationKey/updateCopyright` | सार्वजनिक | — | किसी विशिष्ट ट्रांसलेशन के लिए कॉपीराइट अपडेट करें |
| GET | `/:translationKey/search?query=&limit=` | सार्वजनिक | — | किसी ट्रांसलेशन में वर्सेज़ खोजें |
| GET | `/:translationKey/books` | सार्वजनिक | — | किसी ट्रांसलेशन के लिए बुक्स प्राप्त करें (लोकली कैश करता है) |
| GET | `/:translationKey/:bookKey/chapters` | सार्वजनिक | — | किसी बुक के लिए चैप्टर्स प्राप्त करें (लोकली कैश करता है) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | सार्वजनिक | — | किसी चैप्टर के लिए वर्सेज़ प्राप्त करें (लोकली कैश करता है) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | सार्वजनिक | — | किसी रेंज के लिए वर्स टेक्स्ट प्राप्त करें। लुकअप्स लॉग करता है। कुछ ट्रांसलेशंस लाइसेंसिंग के कारण कैशिंग को बायपास करते हैं |

### उदाहरण: वर्स टेक्स्ट प्राप्त करें

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

बेस पथ: `/content/songs`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | क्वेरी से सॉन्ग्स खोजें |
| GET | `/:id` | JWT | — | ID से एक सॉन्ग प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी सॉन्ग्स सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | सॉन्ग्स बनाएं या अपडेट करें (बैच) |
| POST | `/import` | JWT | — | FreeShow से सॉन्ग्स इम्पोर्ट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | एक सॉन्ग हटाएं |

## Song Details

बेस पथ: `/content/songDetails`

Song details ग्लोबल हैं (चर्च-स्कोप्ड नहीं)। ये चर्चेज़ के बीच साझा किया गया कैनोनिकल सॉन्ग मेटाडेटा दर्शाते हैं।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से एक सॉन्ग डिटेल प्राप्त करें (ग्लोबल) |
| GET | `/` | JWT | — | चर्च के लिए सॉन्ग डिटेल्स सूचीबद्ध करें |
| POST | `/create` | JWT | — | PraiseCharts ID से एक सॉन्ग डिटेल बनाएं (यदि पहले से बनी हो तो मौजूदा लौटाता है)। PraiseCharts और MusicBrainz से मेटाडेटा स्वतः लाता है |
| POST | `/` | JWT | — | सॉन्ग डिटेल्स बनाएं या अपडेट करें (बैच) |

## Song Detail Links

बेस पथ: `/content/songDetailLinks`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से एक सॉन्ग डिटेल लिंक प्राप्त करें |
| GET | `/songDetail/:songDetailId` | JWT | — | किसी सॉन्ग डिटेल के सभी लिंक्स प्राप्त करें |
| POST | `/` | JWT | — | सॉन्ग डिटेल लिंक्स बनाएं या अपडेट करें (बैच)। लिंक्ड होने पर MusicBrainz डेटा स्वतः लाता है |
| DELETE | `/:id` | JWT | — | एक सॉन्ग डिटेल लिंक हटाएं |

## Arrangements

बेस पथ: `/content/arrangements`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID से एक अरेंजमेंट प्राप्त करें |
| GET | `/song/:songId` | JWT | Content.Edit | किसी सॉन्ग के लिए अरेंजमेंट्स प्राप्त करें |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | किसी सॉन्ग डिटेल के लिए अरेंजमेंट्स प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी अरेंजमेंट्स सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | अरेंजमेंट्स बनाएं या अपडेट करें (बैच) |
| POST | `/freeShow/missing` | JWT | — | ऐसे FreeShow IDs खोजें जो चर्च में मौजूद नहीं हैं। बॉडी: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | एक अरेंजमेंट हटाएं (कीज़ भी हटाता है; यदि कोई अरेंजमेंट शेष न रहे तो सॉन्ग भी हटाता है) |

## Arrangement Keys

बेस पथ: `/content/arrangementKeys`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | सार्वजनिक | — | प्रेज़ेंटर व्यू के लिए पूरे सॉन्ग डेटा के साथ अरेंजमेंट की प्राप्त करें |
| GET | `/:id` | JWT | — | ID से एक अरेंजमेंट की प्राप्त करें |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | किसी अरेंजमेंट के लिए कीज़ प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी अरेंजमेंट कीज़ सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | अरेंजमेंट कीज़ बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | एक अरेंजमेंट की हटाएं |

## Settings

बेस पथ: `/content/settings`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान यूज़र की सेटिंग्स प्राप्त करें |
| GET | `/` | JWT | Settings.Edit | चर्च के लिए सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | सार्वजनिक | — | किसी चर्च के लिए सार्वजनिक सेटिंग्स प्राप्त करें (key-value जोड़ों के रूप में लौटाई जाती हैं) |
| POST | `/my` | JWT | — | यूज़र-लेवल सेटिंग्स सेव करें (base64 इमेज अपलोड सपोर्ट करता है) |
| POST | `/` | JWT | Settings.Edit | चर्च-लेवल सेटिंग्स सेव करें (base64 इमेज अपलोड सपोर्ट करता है) |
| DELETE | `/my/:id` | JWT | — | एक यूज़र सेटिंग हटाएं |

## Preview

बेस पथ: `/content/preview`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | सार्वजनिक | — | सबडोमेन की से किसी चर्च के लिए स्ट्रीमिंग प्रीव्यू डेटा लोड करें (टैब्स, लिंक्स, सर्विसेज़, सर्मन्स) |

## Gallery (Stock Photos)

बेस पथ: `/content/stock`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/search` | सार्वजनिक | — | Pexels स्टॉक फ़ोटोज़ खोजें। बॉडी: `{ term: "church" }` |

## PraiseCharts

बेस पथ: `/content/praiseCharts`

वर्शिप सॉन्ग डिस्कवरी और शीट म्यूज़िक डाउनलोड्स के लिए PraiseCharts के साथ इंटीग्रेशन।

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | किसी सॉन्ग के लिए रॉ PraiseCharts डेटा प्राप्त करें |
| GET | `/hasAccount` | JWT | — | जांचें कि यूज़र के पास लिंक्ड PraiseCharts खाता है या नहीं |
| GET | `/search?q=` | JWT | — | PraiseCharts कैटलॉग खोजें |
| GET | `/products/:id?keys=` | JWT | — | किसी सॉन्ग के लिए प्रोडक्ट्स प्राप्त करें (यदि ऑथेंटिकेटेड हो तो लाइब्रेरी से, अन्यथा कैटलॉग से) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | लाइब्रेरी से रॉ अरेंजमेंट डेटा प्राप्त करें |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts से कोई फ़ाइल डाउनलोड करें (PDF या ZIP)। `{ redirectUrl }` लौटाता है |
| GET | `/authUrl?returnUrl=` | सार्वजनिक | — | PraiseCharts के लिए OAuth ऑथराइज़ेशन URL प्राप्त करें |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth वेरिफ़ायर को एक्सेस टोकन से बदलें और यूज़र सेटिंग्स में सेव करें |
| GET | `/library` | JWT | — | यूज़र की PraiseCharts लाइब्रेरी ब्राउज़ करें |

## Support

बेस पथ: `/content/support`

| मेथड | पथ | ऑथ | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | सार्वजनिक | — | AWS Polly का उपयोग करके SSML को MP3 ऑडियो में बदलें। बॉडी: `{ ssml: "<speak>...</speak>" }` |

## संबंधित पेज

- [Website Builder Architecture](../../architecture/website-builder) -- पेजेज़, सेक्शंस, एलिमेंट्स, पोस्ट्स, और रीडायरेक्ट्स सभी ऐप्स में कैसे साथ काम करते हैं
- [Membership एंडपॉइंट्स](./membership) -- लोग, चर्चेज़, ग्रुप्स, रोल्स, परमिशंस
- [Attendance एंडपॉइंट्स](./attendance) -- सर्विस और विज़िट ट्रैकिंग
- [Authentication & Permissions](./authentication) -- लॉगिन फ़्लो, JWT, परमिशन मॉडल
- [Module Structure](../module-structure) -- कोड ऑर्गनाइज़ेशन पैटर्न
