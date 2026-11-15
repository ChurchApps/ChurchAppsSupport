---
title: "Devices प्रबंधित करना"
description: "B1 Admin में अपने खाते से जुड़ी ChurchAppsPlayer और FreePlay स्क्रीन को जोड़ें, लेबल करें, और हटाएँ, ताकि चर्च के डिस्प्ले अद्यतन और सुरक्षित रहें।"
---

# Devices प्रबंधित करना

<div class="article-intro">

Devices पेज आपको अपने खाते से जुड़े ChurchAppsPlayer और FreePlay devices प्रबंधित करने देता है। ये devices आपकी जगह की स्क्रीन पर सामग्री स्ट्रीम करने और चर्च मीडिया दिखाने के लिए उपयोग होते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक ChurchAppsPlayer या FreePlay device चालू और इंटरनेट से जुड़ा होना चाहिए
- device की स्क्रीन पर दिखाया गया pairing code नोट कर लें
- अगर आपने पहले से नहीं किया है तो अपनी [profile सेटिंग्स](./managing-profile.md) देख लें

</div>

## Devices पेज खोलना {#opening-the-devices-page}

[Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (B1 Admin के ऊपर-बाईं ओर का सर्च बार), **Devices** टाइप करें, और उसे चुनें। आपके Profile पेज पर होने पर, Jump menu **Profile** और **Devices** को साथ-साथ भी सूचीबद्ध करता है।

## अपने Devices देखना {#viewing-your-devices}

Devices पेज खोलने पर, आपको एक table दिखेगी जिसमें आपके खाते से जुड़ी ChurchAppsPlayer और FreePlay स्क्रीन सूचीबद्ध होंगी, इस जानकारी के साथ:

- **Label** -- device को दिया गया नाम (जब तक आप कोई नाम नहीं देते, तब तक **Device**)।
- **Registration Date** -- device पहली बार आपके खाते से कब जुड़ी।
- **Last Active Date** -- device आपके खाते से सबसे हाल में कब जुड़ा।

## नया Device जोड़ना {#adding-a-new-device}

1. Devices पेज के ऊपर **Add Screen** बटन पर क्लिक करें।
2. जिस ChurchAppsPlayer या FreePlay device को आप जोड़ना चाहते हैं, उस पर दिखाया गया pairing code खोजें।
3. उसे **Pairing Code** फ़ील्ड में दर्ज करें।
4. अगर आपके चर्च में [plan types](../serving/plans.md) सेट हैं, तो **Show Plans For** dropdown आपको वह plan type चुनने देता है जिसका FreePlay स्क्रीन अनुसरण करे — device को केवल ब्राउज़िंग और सूचनाओं के लिए उपयोग करने हेतु इसे **None (notifications only)** पर रहने दें।
5. **Save** पर क्लिक करें। जोड़ी जाने के बाद device आपकी devices table में दिखता है। अगर कोड गलत है या उसकी अवधि समाप्त हो गई है, तो आपको *"Invalid pairing code"* दिखेगा।

:::tip
जोड़ने का प्रयास करने से पहले सुनिश्चित करें कि device चालू है और इंटरनेट से जुड़ा है। pairing code device की स्क्रीन पर दिखता है।
:::

## Device का Label संपादित करना {#editing-a-device-label}

1. devices table में device के बगल में **Edit** पर क्लिक करें।
2. **Label** को किसी वर्णनात्मक नाम में बदलें (जैसे "Sanctuary Main Screen" या "Lobby Display")।
3. **Save** पर क्लिक करें।

**Edit Device** फ़ॉर्म में आपके चर्च की Lessons.church classrooms की **Associated Content** सूची भी है। किसी classroom को स्क्रीन से जोड़ने के लिए उसे चेक करें; हर checkbox उस पर क्लिक करते ही सहेजा जाता है।

:::tip
स्पष्ट, वर्णनात्मक labels का उपयोग करने से यह पहचानना आसान होता है कि कौन सा device कौन सा है, खासकर जब आपके चर्च में कई स्क्रीन सेट हों।
:::

## Device पहुँच प्रबंधित करना {#managing-device-access}

Devices पेज का उपयोग यह ट्रैक करने के लिए करें कि कौन से devices आपके चर्च की स्ट्रीमिंग और सामग्री तक पहुँच रखते हैं। अगर कोई device अब उपयोग में नहीं है, तो उसे अपने खाते से हटा दें:

1. device के बगल में **Edit** पर क्लिक करें।
2. **Remove** पर क्लिक करें, फिर पुष्टि के लिए फिर से **Remove** पर क्लिक करें।

स्क्रीन को फिर से जोड़ने के लिए एक नए pairing code की ज़रूरत होगी।

:::warning
नियमित रूप से अपने जुड़े हुए devices की समीक्षा करें ताकि सुनिश्चित हो कि केवल सक्रिय, अधिकृत devices ही आपके खाते से जुड़े हैं। सुरक्षा बनाए रखने के लिए उन devices को हटा दें जो अब उपयोग में नहीं हैं।
:::

## अगले चरण {#next-steps}

- [Managing Your Profile](./managing-profile.md) -- अपनी व्यक्तिगत खाता सेटिंग्स संपादित करें
