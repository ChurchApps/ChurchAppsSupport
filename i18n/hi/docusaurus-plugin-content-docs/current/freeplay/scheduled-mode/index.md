---
title: "शेड्यूल्ड मोड"
---

# शेड्यूल्ड मोड {#scheduled-mode}

<div class="article-intro">

शेड्यूल्ड मोड से FreePlay TV अपने-आप चल सकता है। आप **FreePlay Admin** में [admin.freeplay.church](https://admin.freeplay.church) पर playlists बनाते हैं और उन्हें calendar पर रखते हैं। उस calendar से जुड़ा हर TV आने वाले हफ्ते की सामग्री डाउनलोड करता है और घड़ी के अनुसार जो भी शेड्यूल्ड है वही चलाता है, बिना किसी के Start दबाए। चूंकि फ़ाइलें पहले से डाउनलोड हो चुकी होती हैं, इसलिए Wi-Fi कट जाने पर भी playback चलता रहता है।

</div>

:::tip
FreePlay Admin आपका ChurchApps login इस्तेमाल करता है, वही जो आप B1 Admin के लिए इस्तेमाल करते हैं। अलग खाता बनाने की ज़रूरत नहीं है।
:::

## यह कैसे जुड़ता है {#how-it-fits-together}

FreePlay Admin में चार मुख्य पेज हैं, जो साइट के ऊपर सूचीबद्ध हैं:

- **[Screens](./managing-screens)** - आपके paired TVs, उनकी स्थिति, और वे **screen groups** जिनमें वे हैं। किसी group की screens एक calendar और एक default loop साझा करती हैं
- **[Playlists](./building-playlists)** - आपके content providers से चुनी गई images और videos की loops
- **[Calendar](./scheduling-the-calendar)** - हर screen group क्या चलाता है, और कब
- **[Providers](./building-playlists#connecting-providers)** - वे content sources जहां से आपकी playlists सामग्री लेती हैं। आप हर एक को पूरे church के लिए एक बार जोड़ते हैं

जब कुछ भी शेड्यूल नहीं होता, तो group की screens उसका **default loop** चलाती हैं। यदि group के पास default loop नहीं है, तो screens काली हो जाती हैं।

## Plan Mode से कैसे अलग है {#how-it-differs-from-plan-mode}

- **[Plan Mode](../plan-mode/)** B1 Admin से एक service plan type का अनुसरण करता है। कोई TV पर **Start Plan** दबाता है, और जब वे दबाते हैं तब lesson चलता है
- **शेड्यूल्ड मोड** एक calendar का अनुसरण करता है। सामग्री आपके सेट किए समय पर शुरू और बंद होती है, इसलिए यह lobby signage, announcement loops और कक्षाओं के लिए अच्छी तरह काम करता है जहां lesson किसी के अंदर आने से पहले ही चालू होना चाहिए

एक calendar entry अब भी service plan चला सकती है। schedule जोड़ते समय **Service plans** के अंतर्गत plan type चुनें, और स्क्रीन उस हफ्ते B1 Admin में जो plan current है वही चलाती है। इसमें Go Curriculum lessons भी शामिल हैं, यहां तक कि वे भी जिन्हें आपने plan में customize किया है। स्क्रीन उस ministry से जुड़े Go Curriculum login का उपयोग करती है जो B1 Admin में plan type की ministry से लिंक है, या यदि ministry के पास कोई नहीं है तो church का Go Curriculum connection।

## शुरू करना {#getting-started}

जब तक आप इनमें से हर एक कर नहीं लेते, **Screens** पेज हर चरण के लिंक के साथ **Get started** checklist दिखाता है:

1. **Provider जोड़ें** - **Providers** पेज पर Dropbox, OneDrive, Lessons.church, या कोई अन्य source जोड़ें
2. **Playlist बनाएं** - किसी provider से images और videos चुनें
3. **Calendar पर रखें** - चुनें कि कब क्या चले, या group के लिए default loop सेट करें
4. **Screen pair करें** - TV पर दिखाया गया चार अक्षरों का code दर्ज करें

checklist छिपाने के लिए **Hide** पर click करें।

:::tip
**Ctrl+K** दबाएं (Mac पर **⌘K**), या header में search box पर click करें, ताकि command palette खुले। वहां से आप किसी भी पेज पर जा सकते हैं, या **Pair screen**, **Add playlist**, या **Add schedule** जैसी कोई action शुरू कर सकते हैं।
:::

## इस सेक्शन में {#in-this-section}

- **[Pairing a Screen](./pairing-a-screen)** - TV पर code दिखाएं और FreePlay Admin में उसे pair करें
- **[Managing Screens और Groups](./managing-screens)** - स्थिति और downloads देखें, और screens को groups में व्यवस्थित करें
- **[Providers जोड़ना और Playlists बनाना](./building-playlists)** - content sources जोड़ें और images और videos की loops बनाएं
- **[Calendar का शेड्यूल करना](./scheduling-the-calendar)** - तय करें कि कब क्या चले, और जब वह जल्दी खत्म हो तो क्या हो
- **[TV पर शेड्यूल्ड Playback](./scheduled-playback)** - TV अपने-आप क्या करता है, और playback के दौरान remote कैसे इस्तेमाल करें
