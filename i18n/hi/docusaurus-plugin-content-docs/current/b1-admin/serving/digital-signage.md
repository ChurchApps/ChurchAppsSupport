---
title: "Digital Signage"
---

# Digital Signage

<div class="article-intro">

Digital signage feed का उपयोग करके अपना lesson content lobby या hallway के TV पर भेजें। हर plan type को एक feed URL मिलता है जो हमेशा मौजूदा plan का content चलाता है, इसलिए हर हफ्ते कुछ भी अपडेट करने की ज़रूरत नहीं है। अगर आपके TV FreePlay चलाते हैं, तो आप इसके बजाय FreePlay Admin में plan type को उन पर schedule कर सकते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- [Lessons.church](../../b1-church/content/lessons.md) या किसी अन्य lesson content के साथ एक [plan type](./plans.md) सेट करें
- [SignPresenter](https://www.signpresenter.com) account और उसे दिखाने के लिए सेट किया गया device रखें, या [FreePlay](../../freeplay/) चलाने वाला TV रखें

</div>

## Feed URL प्राप्त करना

1. **Serving** पर जाएं, वह ministry चुनें जिसमें आपका plan type है, और plan type खोलने के लिए उस पर क्लिक करें।
2. plan type page के ऊपर **Digital Signage** (TV icon) पर क्लिक करें।
3. **Digital Signage Feed** dialog में, **Feed Url** के आगे copy बटन पर क्लिक करें।

:::info
feed URL किसी एक plan के बजाय plan type से जुड़ा होता है। यह अपने-आप उस plan को ट्रैक करता है जो उस plan type के लिए मौजूदा के रूप में schedule है, इसलिए आपको इसे केवल एक बार सेट करना होता है।
:::

## SignPresenter से जोड़ना

यह feed [SignPresenter](https://www.signpresenter.com) के साथ काम करने के लिए बनाया गया है, जो एक third-party digital signage app है। कॉपी किया गया URL SignPresenter में एक external feed के रूप में पेस्ट करें, ताकि आपका मौजूदा lesson content एक जुड़ी हुई screen पर दिखे।

SignPresenter के अंदर चरण-दर-चरण setup के लिए, देखें [SignPresenter's Lessons.church guide](https://support.signpresenter.com/topics/lessons-dot-church.html)। dialog में भी इन निर्देशों के लिंक हैं।

## इसके बजाय FreePlay TVs का उपयोग

अगर आपकी screens [FreePlay](../../freeplay/) चलाती हैं, तो आपको feed URL की ज़रूरत नहीं है। **Digital Signage Feed** dialog **admin.freeplay.church/calendar** का लिंक देता है, जहां आप इस plan type को अपने FreePlay TVs पर schedule कर सकते हैं:

1. dialog में **admin.freeplay.church/calendar** लिंक पर क्लिक करें। FreePlay Admin वही login उपयोग करता है जो B1 Admin में है।
2. अपने TVs के लिए screen group चुनें और **Add schedule** पर क्लिक करें।
3. **Play** के नीचे, **Service plans** से अपना plan type चुनें। वह **(current plan)** के रूप में चिह्नित है।
4. दिन और समय सेट करें, फिर **Save** पर क्लिक करें।

TVs हर हफ्ते उस plan type के लिए मौजूदा plan चलाते हैं, जो आपके सेट किए गए समय पर होता है। सभी विकल्पों के लिए देखें [Scheduling the Calendar](../../freeplay/scheduled-mode/scheduling-the-calendar), और TV जोड़ने के लिए [Pairing a Screen](../../freeplay/scheduled-mode/pairing-a-screen) देखें।

## आगे के कदम

- इस signage display को फ़ीड करने वाले plans को [Plans](./plans.md) page पर प्रबंधित करें
- [Lessons.church](./scheduling-lessons.md) के साथ content schedule करें
- [Scheduled Mode](../../freeplay/scheduled-mode/) के साथ FreePlay TVs को calendar पर रखें
