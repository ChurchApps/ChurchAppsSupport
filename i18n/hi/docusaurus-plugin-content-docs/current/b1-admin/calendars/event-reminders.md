---
title: "इवेंट रिमाइंडर"
---

# इवेंट रिमाइंडर {#event-reminders}

<div class="article-intro">

इवेंट रिमाइंडर इवेंट होने से पहले सही लोगों को अपने-आप सूचित करते हैं -- उदाहरण के लिए, "Don't miss it! The healthcare workshop starts tomorrow at 9:00 AM." आप रिमाइंडर को इवेंट पर एक बार कॉन्फ़िगर करते हैं, और B1 उसे push notifications, email, और, यदि आपके church में texting सेट है, text messages के जरिए समय पर भेजता है। सदस्य अपनी [Notification Preferences](../../b1-church/getting-started/notification-preferences) से नियंत्रित कर सकते हैं कि उन्हें कौन से रिमाइंडर मिलें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- वह इवेंट बनाएं जिसके बारे में आप लोगों को याद दिलाना चाहते हैं (देखें [Creating Calendars](creating-calendars))
- पंजीकृत attendees तक पहुंचने के लिए, इवेंट पर [registration सक्षम करें](creating-calendars)
- पूरे group तक पहुंचने के लिए, सुनिश्चित करें कि इवेंट सदस्यों वाले [group](../groups/creating-groups) का हिस्सा है

</div>

## रिमाइंडर सेट करना {#setting-up-a-reminder}

आप रिमाइंडर इवेंट के **Reminders** section में कॉन्फ़िगर करते हैं।

- जब आप **नया इवेंट बनाते हैं**, तो सेव करने से पहले इवेंट editor में **Reminders** section expand करें।
- किसी **मौजूदा इवेंट** के लिए, रिमाइंडर जोड़ने या बदलने हेतु इवेंट का **Registration Details** page खोलें (**Registrations** section से)।

1. **Enable reminders** चालू करें।
2. भेजने का **When** चुनें। अधिकतम तीन समय चुनें: **7 days before**, **3 days before**, **1 day before**, और **Day of**।
3. वह **Time of day** सेट करें जब रिमाइंडर जाना चाहिए (डिफ़ॉल्ट **9:00 AM** है, आपके church के [time zone](../settings/church-settings.md#time-zone) में)।
4. चुनें कि **Who** को याद दिलाया जाए (नीचे [Who Gets Reminded](#who-gets-reminded) देखें)।
5. वैकल्पिक रूप से **Message** जोड़ें। डिफ़ॉल्ट शब्दावली के लिए खाली छोड़ें, या अपना लिखें -- आप `{{eventTitle}}` शामिल कर सकते हैं, जो इवेंट के नाम से बदल दिया जाएगा।
6. **Channels** चुनें: **Push** notification, **Email**, और, यदि आपके church के पास कोई [texting provider](../settings/church-settings.md#texting) जुड़ा है, तो **Text**।
7. इवेंट सेव करें।

जैसे-जैसे आप बदलाव करते हैं, एक **live preview** लगभग दिखाता है कि कितने लोगों को रिमाइंडर मिलेगा, कितने attendees तक नहीं पहुंचा जा सकता, और अगले निर्धारित भेजने के समय -- ताकि आप सेव करने से पहले पक्का कर सकें कि रिमाइंडर सही दिख रहा है।

## Who Gets Reminded -- रिमाइंडर किसे मिलता है {#who-gets-reminded}

**Who** setting तय करती है कि रिमाइंडर किसके पास जाए:

- **Registrants only** -- वे सभी जो इवेंट के लिए register हैं और किसी person record से जुड़े हैं। जब इवेंट पर registration सक्षम हो, तो यही डिफ़ॉल्ट है, ताकि एक छोटे registered इवेंट का रिमाइंडर कभी गलती से पूरे group तक न पहुंचे।
- **Heads / registrants only** -- हर registration के लिए एक रिमाइंडर (यानी registration करने वाले व्यक्ति को), न कि registration पर मौजूद हर परिवार के सदस्य को।
- **Group members** -- इवेंट के group के हर सदस्य को। जब इवेंट registration का उपयोग नहीं करता, तो यही डिफ़ॉल्ट है।
- **Auto** -- registration सक्षम होने पर registrants का उपयोग करता है, अन्यथा group का।

:::info
केवल नाम से जोड़े गए guests (बिना किसी linked person record के) रिमाइंडर नहीं पा सकते, क्योंकि उनके लिए कोई account, device, या email नहीं होता जहां भेजा जाए। preview बताता है कि कितने attendees इस श्रेणी में आते हैं, ताकि कोई आश्चर्य न हो। जो सदस्य communication से opt out कर चुके हैं, उन्हें भी छोड़ दिया जाता है।
:::

## रिमाइंडर कब भेजे जाते हैं {#when-reminders-are-sent}

- रिमाइंडर आपके चुने **समय पर** भेजे जाते हैं, आपके church के स्थानीय time zone में, आपके चुने हर offset पर।
- यदि आप इवेंट की **तारीख या समय** बदलते हैं, तो लंबित रिमाइंडर अपने-आप पुनर्निर्धारित हो जाते हैं -- आपको रिमाइंडर को संपादित करने की ज़रूरत नहीं है।
- यदि आप **इवेंट हटाते हैं** (या किसी आवर्ती इवेंट की एक घटना रद्द करते हैं), तो उसके लंबित रिमाइंडर अपने-आप रद्द हो जाते हैं।
- आवर्ती इवेंट अपने-आप संभाले जाते हैं: हर आने वाली घटना को अपना रिमाइंडर मिलता है।

:::tip
रिमाइंडर **पहले push, और email फ़ॉलबैक** के रूप में भेजे जाते हैं। यदि किसी सदस्य के लिए push notifications चालू हैं, तो उसे push मिलता है; यदि नहीं, तो email मिलता है। सदस्य हर notification प्रकार के लिए अपनी [Notification Preferences](../../b1-church/getting-started/notification-preferences) में चुनते हैं कि उन्हें कौन से channels चाहिए।
:::

## Text रिमाइंडर {#text-reminders}

**Text** channel तभी दिखता है जब आपके church के पास कोई texting provider जुड़ा हो। Texts आपके church के texting provider के माध्यम से जाते हैं, और हर text की लागत आपके church को लग सकती है। ये किसी भी push या email रिमाइंडर के अलावा भेजे जाते हैं, और केवल उन्हीं लोगों को जो:

- अपनी [Notification Preferences](../../b1-church/getting-started/notification-preferences) में **Text messages** चालू कर चुके हैं, और
- अपनी प्रोफ़ाइल पर एक mobile number रखते हैं।

हर text आपके church के नाम से शुरू होता है, एक ही text message तक सीमित रहता है, और "Reply STOP to opt out." पर समाप्त होता है। जो कोई STOP का उत्तर देता है, वह आपके church से texts पाना बंद कर देता है। STOP replies B1 तक पहुंचने के लिए, अपनी [texting settings](../settings/church-settings.md#texting) से **Inbound (STOP) webhook URL** को अपने provider के inbound message webhook में पेस्ट करें।

## सदस्य क्या नियंत्रित कर सकते हैं {#what-members-can-control}

रिमाइंडर हमेशा हर सदस्य की [Notification Preferences](../../b1-church/getting-started/notification-preferences) का सम्मान करते हैं। एक सदस्य यह कर सकता है:

- अन्य notifications चालू रखते हुए push, email, या text के लिए **Event Reminders** बंद करना।
- **Text messages** से text रिमाइंडर चालू या बंद करना।
- **quiet hours** सेट करना, ताकि गैर-ज़रूरी notifications उचित समय तक रुकें।

आप इवेंट रिमाइंडर से opt out करने के किसी सदस्य के चुनाव को overwrite नहीं कर सकते -- यह B1 को anti-spam नियमों के अनुरूप रखता है और सदस्यों को अपने inbox पर नियंत्रण देता है।

## Serving रिमाइंडर {#serving-reminders}

किसी plan पर नियुक्त volunteers को plan के विवरण के साथ एक अलग **serving reminder** मिलता है, और जब वे अभी तक जवाब नहीं दे चुके हों, तो email में ही **Accept / Decline** buttons। ये रिमाइंडर plan type पर कॉन्फ़िगर होते हैं, कैलेंडर इवेंट पर नहीं, और text से भी भेजे जा सकते हैं -- देखें [Volunteer Reminders](../serving/plans#volunteer-reminders) और [Sunday Volunteers](../guides/sunday-volunteers), जहां बताया गया है कि volunteer scheduling और रिमाइंडर कैसे काम करते हैं।

## अगले कदम {#next-steps}

- [Notification Preferences](../../b1-church/getting-started/notification-preferences) -- सदस्य क्या नियंत्रित कर सकते हैं
- [Event Registration Guide](../guides/event-registration) -- ताकि रिमाइंडर attendees तक पहुंच सकें, इसके लिए registration सेट करें
- [Creating Calendars](creating-calendars) -- कैलेंडर सेटअप पर वापस जाएं
