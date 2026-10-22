---
title: "Calendar का शेड्यूल करना"
---

# Calendar का शेड्यूल करना {#scheduling-the-calendar}

<div class="article-intro">

FreePlay Admin में **Calendar** पेज नियंत्रित करता है कि हर screen group क्या चलाता है और कब। किसी playlist, service plan, या provider folder के लिए schedule जोड़ें, और उसे हर हफ्ते दोहराने या एक बार चलाने के लिए सेट करें। जब कुछ भी शेड्यूल नहीं होता, तो group का default loop चलता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- कम से कम एक screen group बनाएं। देखें [Managing Screens और Groups](./managing-screens#screen-groups)
- [एक playlist बनाएं](./building-playlists), या B1 Admin में एक plan type सेट किया हो

</div>

## Calendar पढ़ना {#reading-the-calendar}

1. **Calendar** पर जाएं।
2. ऊपर के tabs में से एक screen group चुनें। हर tab दिखाता है कि group के कितने schedules हैं।
3. Week view सोमवार से रविवार तक, सुबह 6 बजे से रात 10 बजे तक चलता है। एक लाल रेखा वर्तमान समय दिखाती है।
4. पिछले या अगले हफ्ते पर जाने के लिए तीरों का उपयोग करें, या इस हफ्ते पर लौटने के लिए **Today** पर click करें।

पेज का subtitle calendar के लिए उपयोग किया गया time zone दिखाता है। Schedules आपके church के time zone का पालन करते हैं, जिसे आप B1 Admin में [Church Information](../../b1-admin/settings/church-settings.md#time-zone) के अंतर्गत सेट करते हैं। यदि आपके church का time zone सेट नहीं है, तो FreePlay आपके campus के time zone का उपयोग करता है। Calendar और आपके TVs एक ही time zone का उपयोग करते हैं, इसलिए calendar पर सुबह 9:00 बजे रखा गया block TV पर भी 9:00 बजे चलता है, भले ही आपके कंप्यूटर का time zone अलग हो।

Schedules उनके प्रकार के अनुसार रंग-कोडित होते हैं। एक legend रंगों को समझाता है:

- **Default loop** - hatched background, जो हर चीज़ के पीछे दिखता है जब group के पास default loop होता है
- **Playlist**
- **Service plan**
- **Provider folder**

हर block अपना नाम दिखाता है, और बड़े blocks समय, यह कि वह दोहराता है (**weekly** या **once**), और जब वह जल्दी खत्म होता है तो क्या होता है, वह भी दिखाते हैं।

## Default loop सेट करना {#setting-the-default-loop}

default loop group की screens पर तब चलता है जब कुछ भी शेड्यूल नहीं होता।

1. **Calendar** पेज पर, header में **Default loop…** पर click करें। यदि default loop पहले से सेट है, तो बटन **Default loop:** के बाद playlist का नाम दिखाता है।
2. एक **Playlist** चुनें, या **None — screen goes dark** चुनें।
3. **Save** पर click करें।

## Schedule जोड़ना {#adding-a-schedule}

नया schedule शुरू करने के तीन तरीके हैं:

- calendar पर किसी खाली जगह पर click करें। फ़ॉर्म उस दिन और आधे घंटे के समय के साथ पहले से भरा खुलता है।
- header में **Add schedule** पर click करें।
- command palette (**Ctrl+K** या **⌘K**) से **Add schedule** चुनें।

फिर फ़ॉर्म भरें:

1. **Play** - चुनें कि क्या चले:
   - **Playlists** - आपके बनाए गए कोई भी playlist
   - **Service plans** - B1 Admin से एक plan type, **(current plan)** के रूप में चिह्नित। स्क्रीन हर हफ्ते उस plan type का वर्तमान plan चलाती है, जिसमें Go Curriculum lessons (customize किए गए भी) शामिल हैं, जो plan type की ministry से जुड़े Go login का उपयोग करते हैं
   - **Provider folder…** - **Choose a provider folder** खोलता है। एक folder में browse करें और **Use this folder** पर click करें। बाद में कोई दूसरा folder चुनने के लिए **Change** पर click करें
2. **Repeats** - वे हफ्ते के दिन चुनें जब यह schedule चले। इसके बजाय एक ही तारीख के लिए **One time** चालू करें और **Date** चुनें।
3. **Start** और **End** - वे समय जब schedule शुरू और बंद हो
4. **If it finishes early** - जब end time से पहले सामग्री खत्म हो जाए तो क्या करना है:
   - **Loop until the end time** - शुरुआत से फिर शुरू होता है। signage loops, announcements और countdowns के लिए अच्छा
   - **Teacher paced** - slides teacher के remote का इंतज़ार करती हैं। आखिरी slide तक lesson end time के बाद भी लगा रहता है
   - **Play once, then go back to the default loop**
5. दोहराने वाले schedules के लिए, **Starts** को पहली तारीख पर सेट करें। **Ends** के अंतर्गत **Never** चुनें, या **On date** चुनकर **End date** दर्ज करें।
6. **Save** पर click करें।

:::info
**Teacher paced** ने पुराने "hold the last slide" विकल्प की जगह ली है। उस विकल्प के साथ सहेजे गए schedules अब teacher paced के रूप में चलते हैं।
:::

## Schedule संपादित या delete करना {#editing-or-deleting-a-schedule}

1. calendar पर schedule के block पर click करें।
2. कोई भी field बदलें और **Save** पर click करें, या schedule हटाने के लिए **Delete** पर click करें।

## Overlapping Schedules {#overlapping-schedules}

यदि दो schedules overlap करते हैं, तो फ़ॉर्म एक चेतावनी दिखाता है: **Overlaps another schedule. The one that starts later wins.** जब बाद वाला schedule चल रहा होता है, तो screens वही चलाती हैं। जब वह खत्म होता है, तो यदि पहला अभी भी चल रहा है तो वे उस पर लौट आती हैं।

## Screens बदलाव कैसे उठाती हैं {#how-screens-pick-up-changes}

Paired screens अगले 7 दिनों के लिए शेड्यूल की गई हर चीज़ डाउनलोड करती हैं, और वे अपने-आप बदलावों की जांच करती हैं। calendar संपादित करने के बाद आपको TV को छूने की ज़रूरत नहीं है। यह देखने के लिए कि screen के पास सब कुछ है या नहीं, [Screens पेज](./managing-screens) पर **Ready through** देखें।

## संबंधित लेख {#related-articles}

- **[Playlists बनाना](./building-playlists)** - वे playlists बनाएं जिन्हें आप शेड्यूल करते हैं
- **[TV पर शेड्यूल्ड Playback](./scheduled-playback)** - Teacher paced lessons और remote TV पर कैसे काम करते हैं
- **[Managing Screens और Groups](./managing-screens)** - groups जोड़ें और हर screen के downloads जांचें
