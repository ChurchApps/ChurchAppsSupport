---
title: "डिजिटल साइनेज"
---

# डिजिटल साइनेज {#digital-signage}

<div class="article-intro">

Digital signage feed का उपयोग करके अपना lesson content lobby या hallway TV पर भेजें। हर plan type को एक feed URL मिलता है जो हमेशा उस समय के current plan का content चलाता है, इसलिए हर हफ्ते कुछ भी अपडेट करने की ज़रूरत नहीं होती। यदि आपके TVs पर FreePlay चलता है, तो इसके बजाय आप FreePlay Admin में plan type को उन पर शेड्यूल कर सकते हैं।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- एक [plan type](./plans.md) सेट करें जिसमें [Lessons.church](../../b1-church/content/lessons.md) या अन्य lesson content शेड्यूल हो
- एक [SignPresenter](https://www.signpresenter.com) account और उसे दिखाने के लिए सेट किया गया device, या [FreePlay](../../freeplay/) चलाने वाला TV होना चाहिए

</div>

## Feed URL प्राप्त करना {#getting-the-feed-url}

1. **Serving** पर जाएं, वह ministry चुनें जिसमें आपका plan type है, और plan type खोलने के लिए उस पर click करें।
2. plan type पेज के ऊपर **Digital Signage** (TV icon) पर click करें।
3. **Digital Signage Feed** dialog में, **Feed Url** के आगे copy button पर click करें।

:::info
Feed URL एक single plan से नहीं, बल्कि plan type से जुड़ा होता है। यह अपने-आप उस plan को ट्रैक करता है जो उस plan type के लिए current के रूप में शेड्यूल है, इसलिए आपको इसे केवल एक बार सेट करना होता है।
:::

## SignPresenter से जोड़ना {#connecting-to-signpresenter}

यह feed [SignPresenter](https://www.signpresenter.com) के साथ काम करने के लिए बनाया गया है, जो एक third-party digital signage app है। कॉपी किए गए URL को SignPresenter में एक external feed के रूप में paste करें ताकि आपका current lesson content किसी जुड़ी हुई स्क्रीन पर दिखे।

SignPresenter के भीतर चरण-दर-चरण setup के लिए, [SignPresenter का Lessons.church guide](https://support.signpresenter.com/topics/lessons-dot-church.html) देखें। dialog में भी इन निर्देशों का link है।

## इसके बजाय FreePlay TVs का उपयोग {#using-freeplay-tvs-instead}

यदि आपकी screens [FreePlay](../../freeplay/) चलाती हैं, तो आपको feed URL की ज़रूरत नहीं है। **Digital Signage Feed** dialog **admin.freeplay.church/calendar** का link देता है, जहां आप इस plan type को अपने FreePlay TVs पर शेड्यूल कर सकते हैं:

1. dialog में **admin.freeplay.church/calendar** link पर click करें। FreePlay Admin वही login उपयोग करता है जो B1 Admin उपयोग करता है।
2. अपने TVs के लिए screen group चुनें और **Add schedule** पर click करें।
3. **Play** के अंतर्गत, **Service plans** में से अपना plan type चुनें। वह **(current plan)** के रूप में चिह्नित होगा।
4. दिन और समय सेट करें, फिर **Save** पर click करें।

TVs हर हफ्ते उस plan type का current plan चलाते हैं, आपके सेट किए गए समय पर। यह Go Curriculum lessons के साथ भी काम करता है, जिनमें आपके द्वारा customize किए गए plans भी शामिल हैं। FreePlay उस Go Curriculum account से sign in करता है जो ministry के लिए **Content Providers** के अंतर्गत जुड़ा है (देखें [पाठ शेड्यूल करना](./scheduling-lessons.md)), या यदि ministry के पास कोई नहीं है तो church का Go Curriculum connection। सभी विकल्पों के लिए [कैलेंडर शेड्यूल करना](../../freeplay/scheduled-mode/scheduling-the-calendar) देखें, और TV जोड़ने के लिए [स्क्रीन जोड़ना](../../freeplay/scheduled-mode/pairing-a-screen) देखें।

:::note
Feed URL में Go Curriculum media शामिल नहीं होता, क्योंकि उस content के लिए आपकी church के Go Curriculum login की ज़रूरत होती है। lobby या classroom TV पर Go Curriculum lesson दिखाने के लिए FreePlay का उपयोग करें।
:::

## अगले चरण {#next-steps}

- इस signage display को फ़ीड करने वाले plans को [Plans](./plans.md) पेज पर प्रबंधित करें
- [Lessons.church](./scheduling-lessons.md) से content शेड्यूल करें
- [Scheduled Mode](../../freeplay/scheduled-mode/) के साथ FreePlay TVs को कैलेंडर पर रखें
