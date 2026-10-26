---
title: "Groups बनाना"
---

# Groups बनाना

<div class="article-intro">

B1 Admin में group बनाना सीधा है। आप एक category सेट करेंगे, अपने group को नाम देंगे, और फिर उसकी सेटिंग्स कॉन्फ़िगर करेंगे। Groups आपके church को small groups, committees और classes जैसी सार्थक इकाइयों में व्यवस्थित करने में मदद करते हैं।

</div>

## प्रशिक्षण वीडियो

<YouTube id="uG93pXVreNo" title="Creating Groups and Adding Members in B1" />

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपके पास groups प्रबंधित करने की अनुमति वाला एक सक्रिय B1 Admin account होना चाहिए। अगर आप अपनी access level के बारे में निश्चित नहीं हैं, तो [Roles & Permissions](../people/roles-permissions.md) देखें।
- अपने groups के लिए category संरचना तय करें (जैसे "Small Groups", "Ministries", "Committees")। categories संबंधित groups को व्यवस्थित रखने में मदद करती हैं।

</div>

## नया Group जोड़ना

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (B1 Admin में ऊपर-बाईं ओर का search bar), **People** को expand करें, और **Groups** पर click करें।
2. पेज के header में **Add Group** पर click करें। सूची के नीचे एक **New Group** form खुलता है। **Category Name** लिखें। Categories संबंधित groups को एक साथ व्यवस्थित करने में मदद करती हैं (जैसे "Small Groups", "Ministries", या "Committees")। अगर कोई category पहले से मौजूद है, तो आप उसे सूची से चुन सकते हैं।
3. group का **Name** लिखें।
4. **Add** पर click करें। आपका नया group सूची में दिखेगा, उसके नाम के नीचे उसकी category के साथ।

## Group सेटिंग्स कॉन्फ़िगर करना

एक बार group बन जाए, तो आप उसके अतिरिक्त विवरण भर सकते हैं:

1. सूची में **group name** पर click करके उसे खोलें।
2. group पेज के बाईं ओर, group के विवरण के नीचे **Edit** बटन पर click करें।
3. ये विकल्प कॉन्फ़िगर करें:
   - **Description** -- group किस बारे में है, इसका संक्षिप्त सार। यह सदस्यों को दिखता है।
   - **Meeting Times** -- group आम तौर पर कब मिलता है (जैसे "Wednesdays at 7 PM")।
   - **Join Policy** -- चुनें कि इस group में कौन शामिल हो सकता है:
     - **Open** -- कोई भी तुरंत, बिना मंज़ूरी के शामिल हो सकता है
     - **Request** -- लोगों को join request भेजनी होती है, जिसके लिए मंज़ूरी चाहिए (देखें [Group Join Requests](./group-join-requests.md))
     - **Closed** -- सदस्यों को leaders या administrators द्वारा हाथ से जोड़ना होगा
   - **Labels** -- group को एक या अधिक विवरणात्मक labels असाइन करें (जैसे "In-Person", "Online", "New Members Welcome")। Labels आपके परिभाषित किए गए मुक्त-रूप tags हैं; जो लागू हों उन्हें चिह्नित करें। Labels का उपयोग Groups Browser website element में groups को फ़िल्टर करने के लिए किया जा सकता है।
   - **Confidential group** -- इस group और उसकी roster को public pages, group finder, और गैर-सदस्यों से छिपाएं। यह recovery या counseling ministries जैसे संवेदनशील groups के लिए उपयोग करें; केवल group के सदस्य और church staff ही उसे देख सकते हैं।
   - **Discussions** -- group का chat feed चालू या बंद करता है, जहां कोई भी सदस्य पोस्ट कर सकता है। डिफ़ॉल्ट रूप से चालू।
   - **Announcements** -- एक दूसरा, केवल leaders के लिए chat feed चालू करता है -- सदस्य पढ़ और react कर सकते हैं, लेकिन केवल leaders पोस्ट कर सकते हैं। डिफ़ॉल्ट रूप से चालू।
   - **Attendance Tracking** -- अगर आप इस group की [उपस्थिति](../attendance/tracking-attendance.md) दर्ज करना चाहते हैं तो इसे चालू करें।
   - **Service Times** -- लागू हो तो group को विशिष्ट church service times से जोड़ें। service times के विवरण के लिए [Attendance Setup](../attendance/setup.md) देखें।
4. अपने बदलाव लागू करने के लिए **Save** पर click करें।

:::tip
स्पष्ट description और meeting time जोड़ने से सदस्यों को पता रहता है कि group से जुड़ने पर उन्हें क्या उम्मीद करनी है।
:::

:::info
Discussions और Announcements दोनों बंद करने पर member portal में group से Messages tab पूरी तरह हट जाता है। केवल एक बंद करने पर उसका tab छिपता है, और सदस्य उस feed पर चले जाते हैं जो अभी भी चालू है। मौजूदा messages दोनों ही स्थितियों में बने रहते हैं -- ये toggles केवल नई posting को नियंत्रित करते हैं।
:::

## Group की प्रतिलिपि बनाना

किसी आवर्ती class या ministry का नया session शुरू कर रहे हैं? सारी सेटिंग्स दोबारा भरने के बजाय, मौजूदा group की प्रतिलिपि बनाएं:

1. group खोलें और **Duplicate** पर click करें (group पेज के बाईं ओर **Edit** बटन के नीचे)।
2. पुष्टि करें।

प्रतिलिपि मूल group की सेटिंग्स -- category, description, meeting time/location, join policy, labels, और campus -- साथ ले जाती है, लेकिन उसके **सदस्य** नहीं। नए group का नाम मूल के नाम पर होगा जिसके अंत में " (Copy)" जुड़ा होगा; उसका नाम group सेटिंग्स से बदलें।

## Group को Archive करना

जब कोई group सक्रिय न रहे लेकिन आप उसका इतिहास रखना चाहें, उसे हटाने के बजाय:

1. group खोलें और उसकी सेटिंग्स संपादित करने के लिए **Edit** पर click करें।
2. **Archive** पर click करें और पुष्टि करें।

Archived groups मुख्य Groups सूची से हट जाते हैं। किसी को फिर से ढूंढने के लिए, Groups पेज के ऊपर category बटनों के बगल में **Show archived** बटन पर click करें, फिर group के बगल में **Restore** पर click करके उसे वापस लाएं।

:::info
किसी group को archive करने से उसके सदस्य, उपस्थिति का इतिहास, या calendar events नहीं हटते -- यह केवल group को तब तक डिफ़ॉल्ट सूची से छिपाता है जब तक आप उसे restore न करें।
:::

## आगे के कदम

group बनाने और कॉन्फ़िगर करने के बाद, आप ये कर सकते हैं:

- **सदस्य जोड़ें** -- लोगों को खोजें और उन्हें group में जोड़ें। group leaders नियुक्त करने के लिए star icon (**Make Leader**) का उपयोग करें। देखें [Group Members](./group-members.md)।
- **Calendar सेट करें** -- group के लिए events और आवर्ती meetings बनाएं। देखें [Group Calendar](./group-calendar.md)।
- **संवाद करें** -- group पेज से सीधे सभी group सदस्यों को messages भेजें।
- **डेटा export करें** -- group की सदस्य सूची डाउनलोड करने के लिए उसके ऊपर **Export** पर click करें।

:::info
हर group एक category में होता है, और मुख्य Groups पेज आपको category के अनुसार सूची फ़िल्टर करने देता है। जैसे-जैसे आपका church बढ़ता है, आप categories को कभी भी पुनर्व्यवस्थित या नाम बदल सकते हैं।
:::
