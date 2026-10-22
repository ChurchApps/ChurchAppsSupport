---
title: "कंटेंट एंडपॉइंट"
---

# कंटेंट एंडपॉइंट {#content-endpoints}

<div class="article-intro">

Content मॉड्यूल वेबसाइट पेज, सेक्शन, एलिमेंट, ब्लॉक, ब्लॉग पोस्ट, रीडायरेक्ट, सरमन, प्लेलिस्ट, स्ट्रीमिंग सेवाएं, इवेंट, क्यूरेटेड कैलेंडर, फ़ाइलें, गैलरी, बाइबल अनुवाद और वर्स लुकअप, गाने, व्यवस्थाएं (arrangements), ग्लोबल स्टाइल, स्टॉक फ़ोटो और सेटिंग्स का प्रबंधन करता है। यह API का सबसे बड़ा मॉड्यूल है और सभी ChurchApps एप्लिकेशन में CMS, मीडिया/स्ट्रीमिंग, वर्शिप प्लानिंग और बाइबल फ़ीचर को शक्ति देता है।

</div>

**बेस पथ:** `/content`

## पेज {#pages}

बेस पथ: `/content/pages`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | सार्वजनिक | — | URL या ID द्वारा पूरा पेज ट्री (सेक्शन, एलिमेंट, ब्लॉक) लोड करें। URL से लाने पर आंतरिक ID हटा दिए जाते हैं। URL-आधारित फ़ेच `pages.visibility` लागू करते हैं: प्रतिबंधित पेज `{ restricted: true, visibility }` लौटाता है, जब तक (वैकल्पिक) JWT बाधा पूरी न करे |
| GET | `/public/:churchId` | सार्वजनिक | — | सार्वजनिक पेज सूचीबद्ध करें (`url`, `title`, `metaDescription`); केवल `visibility = everyone` |
| GET | `/:id` | JWT | — | ID द्वारा पेज प्राप्त करें |
| GET | `/` | JWT | — | चर्च के सभी पेज सूचीबद्ध करें |
| POST | `/duplicate/:id` | JWT | Content.Edit | सभी सेक्शन और एलिमेंट सहित पेज की प्रति बनाएं |
| POST | `/temp/ai` | JWT | Content.Edit | AI द्वारा बनाया गया पेज सहेजें (एक ही कॉल में पेज, सेक्शन और एलिमेंट) |
| POST | `/importTree` | JWT | Content.Edit | नेस्टेड ट्री से पेज बनाएं (`title`, `url`, `sections[].elements[]…`)। हमेशा कॉलर के चर्च के अंतर्गत डालता है; बॉडी के ID अनदेखे किए जाते हैं। पंक्तियों में उनके `column` चाइल्ड होने चाहिए। अधिकतम 30 सेक्शन / 500 एलिमेंट |
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

## सेक्शन {#sections}

बेस पथ: `/content/sections`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा सेक्शन प्राप्त करें |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | सेक्शन की प्रति बनाएं या उसे पुन: उपयोग योग्य ब्लॉक में बदलें |
| POST | `/` | JWT | Content.Edit | सेक्शन बनाएं या अपडेट करें (बैच)। क्रम (sort order) स्वतः अपडेट होता है |
| DELETE | `/:id` | JWT | Content.Edit | सेक्शन हटाएं (क्रम स्वतः अपडेट होता है) |

## एलिमेंट {#elements}

बेस पथ: `/content/elements`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा एलिमेंट प्राप्त करें |
| POST | `/duplicate/:id` | JWT | Content.Edit | सभी चाइल्ड सहित एलिमेंट की प्रति बनाएं |
| POST | `/` | JWT | Content.Edit | एलिमेंट बनाएं या अपडेट करें (बैच)। row के कॉलम और कैरोसेल स्लाइड स्वतः प्रबंधित होते हैं |
| DELETE | `/:id` | JWT | Content.Edit | एलिमेंट हटाएं |

## ब्लॉक {#blocks}

बेस पथ: `/content/blocks`

बेस क्लास से मानक CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id`) का विस्तार, जिसमें लिखने के लिए Content.Edit अनुमति है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा ब्लॉक प्राप्त करें |
| GET | `/` | JWT | — | सभी ब्लॉक सूचीबद्ध करें |
| GET | `/:churchId/tree/:id` | सार्वजनिक | — | सेक्शन और एलिमेंट सहित पूरा ब्लॉक ट्री लोड करें |
| GET | `/blockType/:blockType` | JWT | — | प्रकार के अनुसार ब्लॉक लोड करें (जैसे footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | सार्वजनिक | — | किसी चर्च का फ़ुटर ब्लॉक ट्री लोड करें |
| POST | `/` | JWT | Content.Edit | ब्लॉक बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Content.Edit | ब्लॉक हटाएं |

## लिंक {#links}

बेस पथ: `/content/links`

बेस क्लास से मानक CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id`) का विस्तार, जिसमें लिखने के लिए Content.Edit अनुमति है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा लिंक प्राप्त करें |
| GET | `/` | JWT | — | सभी लिंक सूचीबद्ध करें। वैकल्पिक `?category=` फ़िल्टर। सहेजने के बाद स्वतः क्रमबद्ध होते हैं |
| GET | `/church/:churchId/filtered?category=` | JWT | — | दृश्यता (everyone, visitors, members, staff, groups) के आधार पर फ़िल्टर किए गए लिंक लोड करें |
| GET | `/church/:churchId?category=` | सार्वजनिक | — | श्रेणी के अनुसार किसी चर्च के लिंक लोड करें (सार्वजनिक) |
| POST | `/` | JWT | Content.Edit | लिंक बनाएं या अपडेट करें (बैच)। श्रेणी के अनुसार स्वतः क्रमबद्ध |
| DELETE | `/:id` | JWT | Content.Edit | लिंक हटाएं |

## ग्लोबल स्टाइल {#global-styles}

बेस पथ: `/content/globalStyles`

बेस क्लास से मानक CRUD (POST `/`, DELETE `/:id`) का विस्तार, जिसमें लिखने के लिए Content.Edit अनुमति है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | सार्वजनिक | — | किसी चर्च के ग्लोबल स्टाइल लोड करें (कोई सेट न होने पर डिफ़ॉल्ट लौटाता है) |
| GET | `/` | JWT | — | प्रमाणित चर्च के ग्लोबल स्टाइल लोड करें |
| POST | `/` | JWT | Content.Edit | ग्लोबल स्टाइल बनाएं या अपडेट करें |
| DELETE | `/:id` | JWT | Content.Edit | ग्लोबल स्टाइल हटाएं |

## पेज इतिहास {#page-history}

बेस पथ: `/content/pageHistory`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | किसी पेज की इतिहास प्रविष्टियां सूचीबद्ध करें |
| GET | `/block/:blockId` | JWT | Content.Edit | किसी ब्लॉक की इतिहास प्रविष्टियां सूचीबद्ध करें |
| GET | `/:id` | JWT | Content.Edit | ID द्वारा इतिहास प्रविष्टि प्राप्त करें |
| POST | `/` | JWT | Content.Edit | पेज/ब्लॉक का स्नैपशॉट सहेजें। समय-समय पर 30 दिन से पुरानी प्रविष्टियां हटाता है |
| POST | `/restore/:id` | JWT | Content.Edit | इतिहास स्नैपशॉट से पेज/ब्लॉक पुनर्स्थापित करें (वर्तमान कंटेंट हटाकर स्नैपशॉट से दोबारा बनाता है) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | इनलाइन स्नैपशॉट ऑब्जेक्ट से पुनर्स्थापित करें। Body: `{ pageId, blockId, snapshot }` |

## पोस्ट (ब्लॉग) {#posts-blog}

बेस पथ: `/content/posts`

ब्लॉग पोस्ट स्वतंत्र पंक्तियां हैं: `title`, `slug` (प्रति चर्च अद्वितीय), `excerpt`, `content` (markdown बॉडी), `authorId`, `photoUrl`, `publishDate`, `category` और `tags`। `publishDate` सेट होने और अतीत में होने पर पोस्ट प्रकाशित मानी जाती है। पढ़ने वाले एंडपॉइंट हर पोस्ट में `authorId` से हल किया गया `authorName` जोड़ते हैं। देखें [वेबसाइट बिल्डर आर्किटेक्चर](../../architecture/website-builder#blog)।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | सार्वजनिक | — | प्रकाशित पोस्ट, पेजिनेटेड (प्रति पेज अधिकतम 50) |
| GET | `/public/:churchId/categories` | सार्वजनिक | — | प्रकाशित पोस्ट में अलग-अलग श्रेणियां |
| GET | `/public/:churchId/slug/:slug` | सार्वजनिक | — | slug द्वारा प्रकाशित पोस्ट प्राप्त करें |
| GET | `/rss/:churchId?siteUrl=` | सार्वजनिक | — | प्रकाशित पोस्ट का RSS 2.0 फ़ीड (लिंक `{siteUrl}/blog/{slug}` के रूप में बनते हैं) |
| GET | `/:id` | JWT | — | ID द्वारा पोस्ट प्राप्त करें |
| GET | `/` | JWT | — | चर्च की सभी पोस्ट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | पोस्ट बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | पोस्ट हटाएं |

## रीडायरेक्ट {#redirects}

बेस पथ: `/content/redirects`

प्रति चर्च URL रीडायरेक्ट (`fromPath` → `toPath`), जो प्रति चर्च 200 तक सीमित हैं। पथ सामान्यीकृत किए जाते हैं (छोटे अक्षर, आरंभ में स्लैश, अंत में स्लैश नहीं) और प्रति चर्च `fromPath` अद्वितीय होता है। B1App संभावित 404 पर इन्हें हल करता है और HTTP 308 जारी करता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | सार्वजनिक | — | कोई पथ हल करें (`path` छोड़ने पर सभी रीडायरेक्ट सूचीबद्ध करें) |
| GET | `/:id` | JWT | — | ID द्वारा रीडायरेक्ट प्राप्त करें |
| GET | `/` | JWT | — | चर्च के सभी रीडायरेक्ट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | रीडायरेक्ट बनाएं या अपडेट करें। `fromPath = toPath` अस्वीकार करता है और 200-पंक्ति सीमा लागू करता है |
| DELETE | `/:id` | JWT | Content.Edit | रीडायरेक्ट हटाएं |

## सरमन {#sermons}

बेस पथ: `/content/sermons`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | FreeShow प्लेलिस्ट संरचना का नमूना प्राप्त करें |
| GET | `/public/tvWrapper/:churchId` | JWT | — | सरमन, पाठ और FreeShow स्रोतों सहित TV ऐप रैपर प्राप्त करें |
| GET | `/public/tvFeed/:churchId/:sermonId` | सार्वजनिक | — | एक सरमन को TV फ़ीड प्लेलिस्ट के रूप में प्राप्त करें |
| GET | `/public/tvFeed/:churchId` | सार्वजनिक | — | सभी सार्वजनिक प्लेलिस्ट/सरमन को TV फ़ीड के रूप में प्राप्त करें |
| GET | `/public/:churchId` | सार्वजनिक | — | किसी चर्च के सभी सार्वजनिक सरमन सूचीबद्ध करें |
| GET | `/timeline?sermonIds=` | JWT | — | सरमन के लिए टाइमलाइन डेटा लोड करें |
| GET | `/lookup?videoType=&videoData=` | सार्वजनिक | — | YouTube या Vimeo से सरमन मेटाडेटा खोजें |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | सरमन के उपशीर्षकों से AI सोशल मीडिया पोस्ट सुझाव बनाएं |
| GET | `/outline?url=&title=&author=` | JWT | — | URL से AI पाठ की रूपरेखा बनाएं |
| GET | `/youtubeImport/:channelId` | JWT | — | YouTube चैनल से वीडियो आयात करें |
| GET | `/vimeoImport/:channelId` | JWT | — | Vimeo चैनल से वीडियो आयात करें |
| GET | `/:id` | JWT | — | ID द्वारा सरमन प्राप्त करें |
| GET | `/` | JWT | — | सभी सरमन सूचीबद्ध करें |
| POST | `/` | JWT | StreamingServices.Edit | सरमन बनाएं या अपडेट करें (बैच, base64 थंबनेल अपलोड समर्थित) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | सरमन हटाएं |

### उदाहरण: YouTube सरमन खोजना

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

## प्लेलिस्ट {#playlists}

बेस पथ: `/content/playlists`

बेस क्लास से मानक CRUD (GET `/:id`, GET `/`, DELETE `/:id`) का विस्तार, जिसमें लिखने के लिए StreamingServices.Edit अनुमति है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा प्लेलिस्ट प्राप्त करें |
| GET | `/` | JWT | — | सभी प्लेलिस्ट सूचीबद्ध करें |
| GET | `/public/:churchId` | सार्वजनिक | — | किसी चर्च की सभी सार्वजनिक प्लेलिस्ट सूचीबद्ध करें |
| POST | `/` | JWT | StreamingServices.Edit | प्लेलिस्ट बनाएं या अपडेट करें (बैच, base64 थंबनेल अपलोड समर्थित) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | प्लेलिस्ट हटाएं |

## स्ट्रीमिंग सेवाएं {#streaming-services}

बेस पथ: `/content/streamingServices`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | किसी सेवा के लिए एन्क्रिप्टेड होस्ट चैट रूम ID प्राप्त करें |
| GET | `/` | JWT | — | सभी स्ट्रीमिंग सेवाएं सूचीबद्ध करें। समाप्त हुई गैर-आवर्ती सेवाएं स्वतः साफ़ होती हैं और आवर्ती सेवाएं आगे बढ़ा दी जाती हैं |
| POST | `/` | JWT | StreamingServices.Edit | स्ट्रीमिंग सेवाएं बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | स्ट्रीमिंग सेवा हटाएं (ब्लॉक किए गए IP भी साफ़ होते हैं) |

## इवेंट {#events}

बेस पथ: `/content/events`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | किसी समूह के टाइमलाइन इवेंट लोड करें (अपवाद तिथियां शामिल, ताकि हटाई गई घटनाएं छोड़ी जा सकें) |
| GET | `/timeline?eventIds=` | JWT | — | वर्तमान उपयोगकर्ता के समूहों के टाइमलाइन इवेंट लोड करें (अपवाद तिथियां शामिल) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | सार्वजनिक | — | ICS कैलेंडर फ़ीड के रूप में इवेंट की सदस्यता लें |
| GET | `/group/:groupId` | JWT | — | किसी समूह के इवेंट प्राप्त करें (अपवाद तिथियां शामिल) |
| GET | `/public/group/:churchId/:groupId` | सार्वजनिक | — | किसी समूह के सार्वजनिक इवेंट प्राप्त करें |
| GET | `/public/:churchId/:id` | सार्वजनिक | — | सार्वजनिक पेज के लिए एक इवेंट प्राप्त करें, जिसमें `roomNames` (अस्वीकृत न हुई बुकिंग के कमरे) शामिल हैं। लंबित या अस्वीकृत इवेंट और पंजीकरण न लेने वाले निजी इवेंट के लिए `null` लौटाता है |
| GET | `/public/:churchId/:id/ical` | सार्वजनिक | — | उस एक इवेंट को `.ics` फ़ाइल के रूप में डाउनलोड करें (`text/calendar`, अपवाद तिथियां लागू)। जब इवेंट उन्हीं नियमों से छिपा हो, तो `404` |
| GET | `/:id` | JWT | — | ID द्वारा इवेंट प्राप्त करें |
| POST | `/` | JWT | — | इवेंट बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, या समूह लीडर | इवेंट और उसकी बुकिंग हटाएं। इवेंट के समूह के लीडर इसे हटा सकते हैं, और अनुरोधकर्ता अपना लंबित अनुरोध वापस ले सकता है |

इवेंट रिकॉर्ड में `photoUrl` (16:9 इवेंट फ़ोटो, जो सार्वजनिक इवेंट पेज और आगामी इवेंट टाइल पर दिखती है), `tags` (कॉमा-separated; वेबसाइट Calendar एलिमेंट के टैग फ़िल्टर में उपयोग होते हैं), और `notesViewRole` / `notesPostRole` (`null` होने पर `staff`, या `leaders`, या `members`) शामिल होते हैं, जो इवेंट की `eventNote` बातचीत को नियंत्रित करते हैं। देखें [समूह और इवेंट नोट्स एक्सेस नियंत्रण](./messaging.md#group-and-event-notes-access-control)। सार्वजनिक क्यूरेटेड-इवेंट प्रतिक्रियाओं में भी हर इवेंट का `photoUrl` और `tags` होता है।

## इवेंट अपवाद {#event-exceptions}

बेस पथ: `/content/eventExceptions`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा इवेंट अपवाद प्राप्त करें |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, या समूह लीडर | इवेंट अपवाद बनाएं या अपडेट करें (बैच)। लीडर केवल अपने समूहों के इवेंट के लिए अपवाद जोड़ सकते हैं |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, या समूह लीडर | इवेंट अपवाद हटाएं |

## क्यूरेटेड कैलेंडर {#curated-calendars}

बेस पथ: `/content/curatedCalendars`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा क्यूरेटेड कैलेंडर प्राप्त करें |
| GET | `/` | JWT | — | सभी क्यूरेटेड कैलेंडर सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | क्यूरेटेड कैलेंडर बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | क्यूरेटेड कैलेंडर हटाएं |

## क्यूरेटेड इवेंट {#curated-events}

बेस पथ: `/content/curatedEvents`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | किसी कैलेंडर के क्यूरेटेड इवेंट प्राप्त करें (इवेंट विवरण और अपवाद तिथियां शामिल, जब तक `?withoutEvents` सेट न हो) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | सार्वजनिक | — | किसी कैलेंडर के सार्वजनिक क्यूरेटेड इवेंट प्राप्त करें |
| GET | `/:id` | JWT | — | ID द्वारा क्यूरेटेड इवेंट प्राप्त करें |
| GET | `/` | JWT | — | सभी क्यूरेटेड इवेंट सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | क्यूरेटेड इवेंट बनाएं या अपडेट करें। विशिष्ट समूह इवेंट जोड़ने के लिए `eventIds` सरणी समर्थित है |
| DELETE | `/:id` | JWT | Content.Edit | क्यूरेटेड इवेंट हटाएं |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | क्यूरेटेड कैलेंडर से एक विशिष्ट इवेंट हटाएं |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | क्यूरेटेड कैलेंडर से किसी समूह के सभी इवेंट हटाएं |

## फ़ाइलें {#files}

बेस पथ: `/content/files`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | कंटेंट प्रकार और कंटेंट ID द्वारा फ़ाइलें प्राप्त करें |
| GET | `/` | JWT | — | चर्च वेबसाइट की सभी फ़ाइलें सूचीबद्ध करें |
| GET | `/:id` | JWT | — | ID द्वारा फ़ाइल प्राप्त करें |
| POST | `/` | JWT | Content.Edit* | फ़ाइलें अपलोड करें (base64)। *`contentId` से मेल खाने वाले समूह के सदस्य को भी अनुमति है |
| POST | `/postUrl` | JWT | Content.Edit* | पूर्व-हस्ताक्षरित S3 अपलोड URL प्राप्त करें। *समूह सदस्यों को भी अनुमति है। प्रति कंटेंट आइटम अधिकतम 100MB |
| DELETE | `/:id` | JWT | Content.Edit* | फ़ाइल हटाएं और स्टोरेज से निकालें। *समूह सदस्यों को भी अनुमति है |

## गैलरी {#gallery}

बेस पथ: `/content/gallery`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | सार्वजनिक | — | किसी फ़ोल्डर में स्टॉक फ़ोटो सूचीबद्ध करें |
| GET | `/:folder` | JWT | Content.Edit | किसी फ़ोल्डर में गैलरी छवियां सूचीबद्ध करें |
| POST | `/requestUpload` | JWT | Content.Edit | गैलरी छवि के लिए पूर्व-हस्ताक्षरित S3 अपलोड URL प्राप्त करें |
| DELETE | `/:folder/:image` | JWT | Content.Edit | गैलरी छवि हटाएं |

## बाइबल {#bibles}

बेस पथ: `/content/bibles`

सभी बाइबल एंडपॉइंट सार्वजनिक हैं (किसी प्रमाणीकरण की आवश्यकता नहीं)। डेटा बाहरी स्रोतों से लाया जाता है और स्थानीय रूप से कैश किया जाता है।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/` | सार्वजनिक | — | सभी बाइबल अनुवाद सूचीबद्ध करें (कैश खाली होने पर स्रोत से लाता है) |
| GET | `/stats?startDate=&endDate=` | सार्वजनिक | — | किसी तिथि सीमा के लिए बाइबल लुकअप आंकड़े प्राप्त करें |
| GET | `/availableTranslations/:source` | सार्वजनिक | — | किसी स्रोत (जैसे api.bible) से उपलब्ध अनुवाद सूचीबद्ध करें |
| GET | `/updateTranslations` | सार्वजनिक | — | सभी स्रोतों से सभी अनुवाद सिंक करें |
| GET | `/updateTranslations/:source` | सार्वजनिक | — | किसी विशिष्ट स्रोत से अनुवाद सिंक करें |
| GET | `/updateCopyrights` | सार्वजनिक | — | जिन अनुवादों में कॉपीराइट जानकारी नहीं है, उनकी कॉपीराइट जानकारी अपडेट करें |
| GET | `/:translationKey/updateCopyright` | सार्वजनिक | — | किसी विशिष्ट अनुवाद की कॉपीराइट जानकारी अपडेट करें |
| GET | `/:translationKey/search?query=&limit=` | सार्वजनिक | — | किसी अनुवाद में वर्स खोजें |
| GET | `/:translationKey/books` | सार्वजनिक | — | किसी अनुवाद की पुस्तकें प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/:bookKey/chapters` | सार्वजनिक | — | किसी पुस्तक के अध्याय प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | सार्वजनिक | — | किसी अध्याय के वर्स प्राप्त करें (स्थानीय रूप से कैश करता है) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | सार्वजनिक | — | किसी सीमा का वर्स पाठ प्राप्त करें। लुकअप लॉग होते हैं। कुछ अनुवाद लाइसेंसिंग के कारण कैश को बायपास करते हैं |

### उदाहरण: वर्स पाठ प्राप्त करना

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

## गाने {#songs}

बेस पथ: `/content/songs`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | क्वेरी से गाने खोजें |
| GET | `/:id` | JWT | — | ID द्वारा गाना प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी गाने सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | गाने बनाएं या अपडेट करें (बैच) |
| POST | `/import` | JWT | — | FreeShow से गाने आयात करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | गाना हटाएं |

## गाने का विवरण {#song-details}

बेस पथ: `/content/songDetails`

गाने का विवरण वैश्विक है (चर्च-स्तरीय नहीं)। ये चर्चों के बीच साझा मानक गाना मेटाडेटा दर्शाते हैं।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा गाने का विवरण प्राप्त करें (वैश्विक) |
| GET | `/` | JWT | — | किसी चर्च के लिए गाने के विवरण सूचीबद्ध करें |
| POST | `/create` | JWT | — | PraiseCharts ID से गाने का विवरण बनाएं (यदि पहले से बना है तो मौजूदा लौटाता है)। PraiseCharts और MusicBrainz से मेटाडेटा स्वतः लाता है |
| POST | `/` | JWT | — | गाने के विवरण बनाएं या अपडेट करें (बैच) |

## गाने के विवरण के लिंक {#song-detail-links}

बेस पथ: `/content/songDetailLinks`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा गाने के विवरण का लिंक प्राप्त करें |
| GET | `/songDetail/:songDetailId` | JWT | — | किसी गाने के विवरण के सभी लिंक प्राप्त करें |
| POST | `/` | JWT | — | गाने के विवरण के लिंक बनाएं या अपडेट करें (बैच)। लिंक होने पर MusicBrainz डेटा स्वतः लाता है |
| DELETE | `/:id` | JWT | — | गाने के विवरण का लिंक हटाएं |

## व्यवस्थाएं (Arrangements) {#arrangements}

बेस पथ: `/content/arrangements`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | ID द्वारा व्यवस्था प्राप्त करें |
| GET | `/song/:songId` | JWT | Content.Edit | किसी गाने की व्यवस्थाएं प्राप्त करें |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | किसी गाने के विवरण की व्यवस्थाएं प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी व्यवस्थाएं सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | व्यवस्थाएं बनाएं या अपडेट करें (बैच) |
| POST | `/freeShow/missing` | JWT | — | FreeShow ID खोजें जो चर्च में मौजूद नहीं हैं। Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | व्यवस्था हटाएं (उसकी keys भी हटती हैं; कोई व्यवस्था न बचने पर गाना भी हटता है) |

## व्यवस्था की Keys {#arrangement-keys}

बेस पथ: `/content/arrangementKeys`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | सार्वजनिक | — | प्रेज़ेंटर व्यू के लिए पूरे गाने डेटा सहित व्यवस्था की key प्राप्त करें |
| GET | `/:id` | JWT | — | ID द्वारा व्यवस्था की key प्राप्त करें |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | किसी व्यवस्था की keys प्राप्त करें |
| GET | `/` | JWT | Content.Edit | सभी व्यवस्था की keys सूचीबद्ध करें |
| POST | `/` | JWT | Content.Edit | व्यवस्था की keys बनाएं या अपडेट करें (बैच) |
| DELETE | `/:id` | JWT | Content.Edit | व्यवस्था की key हटाएं |

## सेटिंग्स {#settings}

बेस पथ: `/content/settings`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | वर्तमान उपयोगकर्ता की सेटिंग्स प्राप्त करें |
| GET | `/` | JWT | Settings.Edit | चर्च की सभी सेटिंग्स प्राप्त करें |
| GET | `/public/:churchId` | सार्वजनिक | — | किसी चर्च की सार्वजनिक सेटिंग्स प्राप्त करें (की-वैल्यू जोड़ों के रूप में) |
| POST | `/my` | JWT | — | उपयोगकर्ता-स्तरीय सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |
| POST | `/` | JWT | Settings.Edit | चर्च-स्तरीय सेटिंग्स सहेजें (base64 छवि अपलोड समर्थित) |
| DELETE | `/my/:id` | JWT | — | उपयोगकर्ता सेटिंग हटाएं |

## पूर्वावलोकन {#preview}

बेस पथ: `/content/preview`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | सार्वजनिक | — | सबडोमेन कुंजी द्वारा किसी चर्च का स्ट्रीमिंग पूर्वावलोकन डेटा लोड करें (टैब, लिंक, सेवाएं, सरमन) |

## गैलरी (स्टॉक फ़ोटो) {#gallery-stock-photos}

बेस पथ: `/content/stock`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/search` | सार्वजनिक | — | Pexels स्टॉक फ़ोटो खोजें। Body: `{ term: "church" }` |

## PraiseCharts {#praisecharts}

बेस पथ: `/content/praiseCharts`

वर्शिप गाने खोजने और शीट म्यूज़िक डाउनलोड के लिए PraiseCharts के साथ एकीकरण।

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | किसी गाने का कच्चा PraiseCharts डेटा प्राप्त करें |
| GET | `/hasAccount` | JWT | — | जांचें कि उपयोगकर्ता का PraiseCharts खाता लिंक है या नहीं |
| GET | `/search?q=` | JWT | — | PraiseCharts कैटलॉग खोजें |
| GET | `/products/:id?keys=` | JWT | — | किसी गाने के उत्पाद प्राप्त करें (प्रमाणित होने पर लाइब्रेरी से, अन्यथा कैटलॉग से) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | लाइब्रेरी से व्यवस्था का कच्चा डेटा प्राप्त करें |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | PraiseCharts से फ़ाइल डाउनलोड करें (PDF या ZIP)। `{ redirectUrl }` लौटाता है |
| GET | `/authUrl?returnUrl=` | सार्वजनिक | — | PraiseCharts के लिए OAuth प्राधिकरण URL प्राप्त करें |
| GET | `/access?verifier=&token=&secret=` | JWT | — | OAuth verifier को एक्सेस टोकन से बदलें और उपयोगकर्ता सेटिंग्स में सहेजें |
| GET | `/library` | JWT | — | उपयोगकर्ता की PraiseCharts लाइब्रेरी ब्राउज़ करें |

## सहायता (Support) {#support}

बेस पथ: `/content/support`

| विधि | पथ | प्रमाणीकरण | अनुमति | विवरण |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | सार्वजनिक | — | AWS Polly का उपयोग करके SSML को MP3 ऑडियो में बदलें। Body: `{ ssml: "<speak>...</speak>" }` |

## संबंधित पेज {#related-pages}

- [वेबसाइट बिल्डर आर्किटेक्चर](../../architecture/website-builder) -- पेज, सेक्शन, एलिमेंट, पोस्ट और रीडायरेक्ट सभी ऐप्स में कैसे जुड़ते हैं
- [मेंबरशिप एंडपॉइंट](./membership) -- लोग, चर्च, समूह, भूमिकाएं, अनुमतियां
- [उपस्थिति एंडपॉइंट](./attendance) -- सेवा और विज़िट ट्रैकिंग
- [प्रमाणीकरण और अनुमतियां](./authentication) -- लॉगिन फ़्लो, JWT, अनुमति मॉडल
- [मॉड्यूल संरचना](../module-structure) -- कोड संगठन पैटर्न
