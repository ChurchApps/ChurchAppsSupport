---
title: "समूह बनाना"
---

# समूह बनाना

<div class="article-intro">

B1 Admin में एक समूह बनाना सीधा है। आप एक category सेट अप करेंगे, अपने समूह को नाम देंगे, और फिर इसकी सेटिंग को कॉन्फ़िगर करेंगे। समूह आपके चर्च को सार्थक इकाइयों में संगठित करने में मदद करते हैं जैसे छोटे समूह, समितियां, और कक्षाएं।

</div>

<div class="prereqs">
<h4>शुरुआत से पहले</h4>

- आपको एक सक्रिय B1 Admin खाते की आवश्यकता है समूहों को प्रबंधित करने की अनुमति के साथ। यदि आप अपने access level के बारे में निश्चित नहीं हैं तो [Roles & Permissions](../people/roles-permissions.md) देखें।
- अपने समूहों के लिए एक category structure तय करें (उदाहरण के लिए, "Small Groups," "Ministries," "Committees")। Categories संबंधित समूहों को संगठित रखने में मदद करती हैं।

</div>

## एक नया समूह जोड़ना

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (B1 Admin के ऊपरी बाईं ओर), **People** को विस्तृत करें, और **Groups** पर क्लिक करें।
2. **Add Group** पर क्लिक करें और एक **Category Name** दर्ज करें। Categories आपको संबंधित समूहों को एक साथ संगठित करने में मदद करते हैं (उदाहरण के लिए, "Small Groups," "Ministries," या "Committees")। यदि एक category पहले से मौजूद है, तो आप इसे सूची से चुन सकते हैं।
3. **Group Name** दर्ज करें।
4. **Add** पर क्लिक करें। आपका नया समूह चुनी गई category के तहत सूची में दिखाई देगा।

## समूह सेटिंग कॉन्फ़िगर करना

एक बार जब आपका समूह बनाया जा जाता है, तो आप अतिरिक्त विवरण भर सकते हैं:

1. सूची में **group name** पर क्लिक करके इसे खोलें।
2. समूह सेटिंग संपादित करने के लिए **pencil icon** पर क्लिक करें।
3. निम्नलिखित विकल्पों को कॉन्फ़िगर करें:
   - **Description** -- समूह के बारे में एक संक्षिप्त सारांश। यह सदस्यों के लिए दृश्यमान है।
   - **Meeting Times** -- समूह आम तौर पर कब मिलता है (उदाहरण के लिए, "Wednesdays at 7 PM")।
   - **Join Policy** -- इस समूह में कौन शामिल हो सकता है चुनें:
     - **Open** -- कोई भी बिना approval के तुरंत शामिल हो सकता है
     - **Request** -- लोगों को एक join request submit करना चाहिए जिसे approval की आवश्यकता है ([Group Join Requests](./group-join-requests.md) देखें)
     - **Closed** -- सदस्यों को leaders या administrators द्वारा मैनुअल रूप से जोड़ा जाना चाहिए
   - **Labels** -- समूह को एक या अधिक वर्णनात्मक labels असाइन करें (उदाहरण के लिए, "In-Person", "Online", "New Members Welcome")। Labels freeform tags हैं जिन्हें आप define करते हैं; सभी लागू करने वाले को check करें। Labels को Groups Browser website element में समूहों को filter करने के लिए उपयोग किया जा सकता है।
   - **Confidential group** -- इस समूह और इसके रोस्टर को सार्वजनिक पृष्ठों, समूह finder, और गैर-सदस्यों से छुपाएं। recovery या counseling ministries जैसे संवेदनशील समूहों के लिए इसका उपयोग करें; केवल समूह के सदस्य और चर्च स्टाफ इसे देख सकते हैं।
   - **Discussions** -- समूह के chat feed को चालू या बंद करता है, जहां कोई भी सदस्य post कर सकता है। Default पर चालू है।
   - **Announcements** -- एक दूसरा, leader-only chat feed चालू करता है -- सदस्य read और react कर सकते हैं, लेकिन केवल leaders ही post कर सकते हैं। Default पर चालू है।
   - **Attendance Tracking** -- इसे enable करें यदि आप इस समूह के लिए [attendance](../attendance/tracking-attendance.md) रिकॉर्ड करना चाहते हैं।
   - **Service Times** -- यदि लागू हो तो समूह को विशिष्ट चर्च service times के साथ associate करें। Service times पर विवरण के लिए [Attendance Setup](../attendance/setup.md) देखें।
4. अपने changes को लागू करने के लिए **Save** पर क्लिक करें।

:::tip
एक स्पष्ट description और meeting time जोड़ने से सदस्यों को पता चल जाता है कि जब वे कोई समूह में शामिल होते हैं तो उन्हें क्या उम्मीद करनी चाहिए।
:::

:::info
जब आप दोनों Discussions और Announcements को बंद करते हैं तो यह member portal में समूह से Messages टैब को पूरी तरह से हटा देता है। केवल एक को बंद करने से इसके टैब को छुपा दिया जाता है; सदस्य उस feed पर चले जाते हैं जो अभी भी चालू है। Existing messages किसी भी तरह से रखे जाते हैं -- toggles केवल नई posting को नियंत्रित करते हैं।
:::

## समूह को डुप्लिकेट करना

एक आवर्ती class या ministry का एक नया session शुरू कर रहे हैं? सभी सेटिंग को फिर से दर्ज करने के बजाय, एक मौजूदा समूह को डुप्लिकेट करें:

1. समूह को खोलें और समूह banner में **duplicate** icon पर क्लिक करें (Edit के बगल में)।
2. duplication की पुष्टि करें।

कॉपी original की सेटिंग को ले जाता है -- category, description, meeting time/location, join policy, labels, और campus -- लेकिन **not** इसके सदस्य। नया समूह original के बाद " (Copy)" के साथ नाम दिया जाता है; इसे समूह सेटिंग से rename करें।

## समूह को आर्काइव करना

जब कोई समूह सक्रिय नहीं रहता है लेकिन आप इसे हटाने के बजाय इसका history रखना चाहते हैं:

1. समूह को खोलें और इसकी सेटिंग संपादित करने के लिए **pencil icon** पर क्लिक करें।
2. **Archive** पर क्लिक करें और पुष्टि करें।

आर्काइव किए गए समूह मुख्य Groups सूची से दूर चले जाते हैं। फिर से एक को खोजने के लिए, Groups पृष्ठ के शीर्ष पर **Show archived** toggle को चालू करें, फिर समूह को वापस लाने के लिए समूह के बगल में **Restore** पर क्लिक करें।

:::info
किसी समूह को आर्काइव करने से इसके सदस्य, attendance history, या calendar events नहीं हटते -- यह केवल जब तक आप इसे restore न करें तब तक समूह को default सूची से छुपाता है।
:::

## अगले कदम

अपने समूह को बनाने और कॉन्फ़िगर करने के बाद, आप तैयार हैं:

- **सदस्य जोड़ें** -- लोगों की खोज करें और उन्हें समूह में जोड़ें। green key icon का उपयोग करके group leaders को designate करें। [Group Members](./group-members.md) देखें।
- **एक calendar सेट अप करें** -- समूह के लिए events और recurring meetings बनाएं। [Group Calendar](./group-calendar.md) देखें।
- **Communicate** -- समूह पृष्ठ से सीधे सभी समूह सदस्यों को संदेश भेजें।
- **डेटा export करें** -- अपने समूह की सदस्य सूची export करने के लिए download icon पर क्लिक करें।

:::info
आपके सभी चर्च समूह मुख्य Groups पृष्ठ पर categories द्वारा संगठित हैं। जब आपका चर्च बढ़ता है तो आप हमेशा categories को पुनर्व्यवस्थित या rename कर सकते हैं।
:::
