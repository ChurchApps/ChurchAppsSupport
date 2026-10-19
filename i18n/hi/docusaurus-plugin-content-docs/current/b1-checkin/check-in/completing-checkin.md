---
title: "Check-In पूरा करना"
---

# Check-In पूरा करना

<div class="article-intro">

एक बार आप अपने household की समीक्षा कर लें और ज़रूरी group assignments कर लें, तो check-in पूरा करने के लिए तैयार हैं। यह kiosk workflow का आखिरी चरण है — app attendance सबमिट करता है, labels प्रिंट करता है, और अगले परिवार के लिए रीसेट हो जाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- **household review screen** पर [अपने household की समीक्षा करें](./household-review)
- जो परिवार के सदस्य किसी विशेष class या program में check in करें, उनके लिए [groups assign करें](./group-assignment)
- वैकल्पिक रूप से, अपने परिवार के साथ आने वाले [guests जोड़ें](./adding-guests)

</div>

## Check In कैसे करें

1. **household review screen** से, स्क्रीन के नीचे **Check-in** बटन पर tap करें।
2. App attendance डेटा को server पर भेजता है और एक हरे checkmark और स्वागत संदेश के साथ **success screen** दिखाता है।

बस इतना ही। आपके परिवार की attendance दर्ज हो गई है।

## भरे हुए कमरे और Volunteer Ratios

यदि आपके चर्च ने अपने कमरों पर [safety limits](../../b1-admin/attendance/checkin-safety) कॉन्फ़िगर किए हैं, तो server सेव करने से पहले उनकी जांच करता है:

- यदि चुना हुआ कमरा **भरा हुआ या बंद** है, तो check-in नहीं होता और app कमरे का नाम बताता है ताकि आप कोई दूसरा कमरा चुन सकें।
- यदि service time का एक [check-in schedule](../../b1-admin/attendance/setup#setting-a-check-in-schedule) है और उसकी check-in window अभी खुली नहीं है, तो उस service time के कमरों में check-in भी रोका जाता है। **Can't check in yet** screen कमरे को इस कारण के साथ सूचीबद्ध करती है कि "check-in isn't open right now"; किसी अलग service time या group को चुनने के लिए **Change Rooms** पर tap करें। (जो service times [service चुनते](./selecting-service#when-check-in-isnt-open) समय पहले से बंद हैं, वे छिपा दिए जाते हैं, इसलिए आप यह आमतौर पर तभी देखेंगे जब check-in के बीच में कोई window बंद हो जाए।)
- यदि बच्चों के कमरे में उसके ratio के लिए **volunteers कम** हैं, तो app या तो एक चेतावनी दिखाता है जिसे कोई staff सदस्य पुष्टि करके आगे बढ़ा सकता है, या check-in को पूरी तरह रोक देता है — यह इस पर निर्भर है कि आपके चर्च ने ratio enforcement कैसे कॉन्फ़िगर किया है।

## Label Printing

यदि कोई network printer कॉन्फ़िगर है, तो check-in के बाद app अपने आप labels प्रिंट करता है:

- **Name labels** उन सभी के लिए प्रिंट होते हैं जो ऐसे group में assigned हैं जिसमें **Print Nametag** setting चालू है। Name labels में व्यक्ति का नाम, उसका group assignment, और यदि रिकॉर्ड में है तो allergy/notes की जानकारी होती है।
- **Parent pickup slips** तब प्रिंट होती हैं जब check-in किया गया कोई भी व्यक्ति ऐसे group में हो जिसमें **Parent Pickup** setting चालू है। **Volunteer** के रूप में check in किए गए लोगों को छोड़ दिया जाता है, इसलिए Parent Pickup कमरे में सेवा दे रहा childcare worker pickup slip नहीं पाता। Pickup slip में बच्चों, उनके group assignments, और एक अनोखा **4-character security code** सूचीबद्ध होता है।

:::info
वही security code बच्चे के name label और माता-पिता के pickup slip दोनों पर दिखता है। Pickup के समय volunteers code मिलाकर सत्यापित करते हैं कि हर बच्चे को सही वयस्क ले जा रहा है।
:::

Security code हर check-in पर नया बनता है और उसमें केवल व्यंजन और अंक होते हैं (स्वर अनुचित शब्द बनने से बचाने के लिए हटा दिए गए हैं)।

:::warning
यदि labels प्रिंट न हों, तो **चर्च के logo** पर सात बार tap करके Admin Settings खोलें, फिर printer connection जांचने के लिए **Change Printer** पर tap करें। समस्या निवारण के चरणों के लिए [Printer Setup](../getting-started/printer-setup) देखें।
:::

## Check-In के बाद क्या होता है

- यदि printer कॉन्फ़िगर है, तो app सभी labels प्रिंट करता है और फिर अपने आप **lookup screen** पर लौट आता है, अगले परिवार के लिए तैयार।
- यदि कोई printer कॉन्फ़िगर नहीं है, तो success screen कुछ सेकंड दिखती है और फिर अपने आप **lookup screen** पर लौट आती है।

Lookup screen पर लौटने के लिए आपको कुछ tap करने की ज़रूरत नहीं है — संक्रमण app अपने आप संभालता है।

:::tip
हर check-in के बाद app पूरी तरह रीसेट हो जाता है, इसलिए किसी एक परिवार को दूसरे परिवार की जानकारी दिखने का कोई खतरा नहीं है।
:::

## क्या दर्ज होता है

जब आप **Check-in** tap करते हैं, तो app हर उस household सदस्य के लिए server को निम्न भेजता है जिसका group assignment है:

- Check in किया जा रहा **व्यक्ति**
- वह **सेवा** जिसमें वे उपस्थित हैं
- वह **service time** और **group** जिसमें वे assigned हैं

यह डेटा B1 Admin में Attendance section के अंतर्गत दिखता है, जहां आपके चर्च के administrators attendance records देख और प्रबंधित कर सकते हैं। विवरण के लिए [check-in administration guide](../../b1-admin/attendance/check-in.md) देखें।
