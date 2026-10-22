---
title: "सेवा चुनना"
---

# सेवा चुनना {#selecting-a-service}

<div class="article-intro">

हर check-in का पहला चरण यह चुनना है कि आप किस सेवा में भाग ले रहे हैं। ऐप के लोड होने के तुरंत बाद सेवाओं की screen दिखती है, और यह तय करती है कि check-in प्रवाह के बाकी हिस्से के लिए कौन सी service times और groups उपलब्ध हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- B1 Church Checkin ऐप में [लॉग इन करें](../getting-started/logging-in) और अपना चर्च चुनें
- सुनिश्चित करें कि आपके चर्च के administrator ने B1 Admin में [सेवाएं और service times कॉन्फ़िगर](../../b1-admin/attendance/setup.md) किए हैं

</div>

## यह कैसे काम करता है {#how-it-works}

1. लॉग इन करने के बाद (या लौटने पर auto-login के बाद), ऐप **सेवाओं की screen** दिखाता है।
2. आपको अपने चर्च के लिए कॉन्फ़िगर की गई सभी सेवाओं की सूची दिखेगी। हर सेवा एक card के रूप में दिखती है, जिस पर सेवा का नाम होता है (उदाहरण के लिए, "Sunday Morning" या "Wednesday Evening")।
3. जिस सेवा में आप भाग ले रहे हैं, उस पर tap करें।

ऐप उस सेवा से जुड़े service times और groups लोड करता है, फिर आपको [सदस्य खोज screen](./looking-up-members) पर ले जाता है।

## जब Check-In खुला न हो {#when-check-in-isnt-open}

अगर आपके administrator ने किसी service time को [चेक-इन schedule](../../b1-admin/attendance/setup#setting-a-check-in-schedule) दिया है, तो ऐप परिवारों को उस service time को केवल तभी चुनने देता है जब उसकी check-in window खुली हो। जिन service times की window अभी बंद है, वे अब भी [परिवार की screen](./household-review) पर दिखते हैं, लेकिन उन्हें group button देने के बजाय **Closed** (उदाहरण के लिए, **Closed · opens Sun 9:30 AM**) चिह्नित किया जाता है।

अगर आपने जिस सेवा पर tap किया, उसके हर service time बंद हैं, तो ऐप बताता है कि check-in कब खुलेगा -- उदाहरण के लिए, **"Check-in for this service opens Sun 9:30 AM."** (अगर खुलने का समय दिखाया नहीं जा सकता, तो यह कहता है **"Check-in isn't open for this service right now."**) सेवाओं की सूची पर वापस जाने और कोई दूसरी सेवा चुनने के लिए **Back** पर tap करें, या window खुलने तक इंतज़ार करें और फिर से कोशिश करें।

:::info
Check-in windows सेवा के campus के time zone का पालन करती हैं। अगर उस campus का कोई time zone सेट नहीं है, तो आपके चर्च का time zone इस्तेमाल होता है। अगर कोई service time गलत घंटे पर खुलता लगे, तो अपने administrator से campus या church settings में time zone जांचने को कहें। Household screen पर kiosk service times खोलने और बंद करने के लिए टैबलेट की अपनी घड़ी का भी उपयोग करता है, इसलिए सुनिश्चित करें कि टैबलेट सही समय और time zone पर सेट है।
:::

:::info
सेवाएं आपके चर्च के administrator द्वारा B1 Admin में Attendance section के अंतर्गत कॉन्फ़िगर की जाती हैं। अगर आपको वह सेवा नहीं दिखती जिसकी आपको उम्मीद है, तो अपने admin से [उपस्थिति सेटअप](../../b1-admin/attendance/setup.md) में उसकी जांच करने को कहें।
:::

## पर्दे के पीछे क्या होता है {#what-happens-behind-the-scenes}

जब आप कोई सेवा चुनते हैं, तो ऐप सर्वर से तीन चीज़ें लाता है:

- उस सेवा के **service times** (उदाहरण के लिए, एक ही सेवा में 9:00 AM और 11:00 AM के time slots हो सकते हैं)।
- हर service time पर उपलब्ध **groups** (उदाहरण के लिए, Nursery, Preschool, Elementary)।
- **group-to-service-time links** जो तय करते हैं कि कौन से groups किस समय उपलब्ध हैं।

यह डेटा स्थानीय रूप से cache होता है, ताकि check-in की बाकी प्रक्रिया तेज़ और प्रतिक्रियाशील रहे।

:::tip
अगर आपके चर्च में केवल एक सेवा कॉन्फ़िगर है, तब भी आपको आगे बढ़ने के लिए उस पर tap करना होगा। ऐप एक ही सेवा को अपने-आप नहीं चुनता।
:::

## अगला कदम {#next-step}

सेवा चुनने के बाद, आप फ़ोन नंबर या नाम से [अपने परिवार को खोजेंगे](./looking-up-members)।
