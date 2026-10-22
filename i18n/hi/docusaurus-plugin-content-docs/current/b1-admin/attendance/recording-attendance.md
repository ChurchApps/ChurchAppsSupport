---
title: "उपस्थिति दर्ज करना"
---

# उपस्थिति दर्ज करना {#recording-attendance}

<div class="article-intro">

एक बार आपके campuses, service times, और groups सेट हो जाने के बाद, आप हर gathering के बाद attendance मैन्युअली दर्ज कर सकते हैं। B1 Admin attendance को **sessions** के आधार पर व्यवस्थित करता है -- हर group के लिए हर meeting date पर एक session। आप session बनाते हैं, यह चिह्नित करते हैं कि कौन आया, और डेटा सीधे आपकी attendance reports में जाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपके campuses, service times, और groups कॉन्फ़िगर होने चाहिए। अगर आपने यह अभी तक नहीं किया है, तो [Attendance Setup](setup.md) देखें।
- जिन groups को आप track करना चाहते हैं, उनके लिए **Track Attendance** सक्षम होना चाहिए। विवरण के लिए [Attendance Setup](setup.md) देखें।
- attendance सहेजने के लिए आपके पास **Edit Attendance** permission होनी चाहिए। जिन volunteers के पास लोगों के लिए केवल **View People Names Only** है, वे भी इस तरह attendance ले सकते हैं -- वे **Groups** से classes खोलते हैं और सदस्यों को केवल नाम से देखते हैं। देखें [People Names Only](../settings/roles-permissions.md#people-names-only)।

</div>

## सत्र बनाना {#creating-a-session}

एक session किसी group की meeting की एक घटना का प्रतिनिधित्व करता है -- उदाहरण के लिए, किसी खास रविवार को आपकी K--3rd grade class।

1. **B1 Admin** खोलें, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (ऊपर-बाईं ओर का search bar), **People** को expand करें, और **Groups** पर click करें।
2. वह group चुनें जिसकी attendance आप दर्ज करना चाहते हैं।
3. group के page के **Sessions** section में **All sessions** पर click करें।
4. नया session बनाने के लिए **New** पर click करें।
5. यदि group किसी service time को सौंपा गया है, तो **Service Time** चुनें। यदि यह unscheduled group है, तो यह field नहीं दिखेगा।
6. **Session Date** चुनें -- यह आज, कोई बीती तारीख, या कोई आने वाली तारीख हो सकती है।
7. **Save** पर click करें।

### एक service time की हर class के लिए sessions जोड़ना {#adding-sessions-for-every-class-in-a-service-time}

यदि उसी service time पर अन्य groups भी मिलते हैं (उदाहरण के लिए, रविवार सुबह 9:00 बजे की आपकी सभी बच्चों की classes), तो आप हर group पर जाने के बजाय उनके sessions एक ही कदम में बना सकते हैं।

1. ऊपर दिए कदम अपनाएं और एक **Service Time** चुनें।
2. **Also add for the other _N_ groups in _service time_** को चिह्नित करें। Checkbox बताता है कि उस service time को कितने अन्य groups सौंपे गए हैं। यह केवल नया session जोड़ते समय दिखता है, और तभी जब उस समय कम से कम एक अन्य group मिलता है।
3. **Save** पर click करें।

वर्तमान group के लिए, और उसी तारीख और service time पर हर अन्य group के लिए session बनाया जाता है। जिन groups का उस तारीख और service time के लिए पहले से session है, उन्हें छोड़ दिया जाता है, इसलिए duplicates नहीं बनेंगे।

:::tip
आप बीती तारीखों के लिए sessions बना सकते हैं, ताकि जो attendance अभी दर्ज नहीं हुई है उसे पूरा कर सकें, या पहले से बनाकर रख सकते हैं ताकि group के मिलने पर वे तैयार हों।
:::

## Session नोट्स {#session-notes}

हर session में नोट्स हो सकते हैं -- क्या पढ़ाया गया, announcements, या prayer requests का सारांश।

1. session जोड़ते समय, या सूची में किसी session के आगे **Edit** (पेंसिल) icon पर click करने के बाद, तारीख के नीचे **Notes (what was covered, announcements, prayer requests)** box में लिखें। Toolbar से आप bold text, lists, और links जोड़ सकते हैं।
2. **Save** पर click करें।

नोट्स session की attendance सूची के सबसे ऊपर दिखते हैं। ये वही meeting notes भी हैं जिन्हें group के सदस्य B1.church पर group page के **Meetings** section में पढ़ते हैं, और जहां group leaders भी इन्हें लिख और संपादित कर सकते हैं। देखें [Group Details](../../b1-church/groups/group-details.md#meeting-notes-and-attendance)।

## Attendance चिह्नित करना {#marking-attendance}

Session चुनें ताकि उसकी attendance सूची दिखे। हर group सदस्य एक checkbox के साथ सूचीबद्ध होता है, अंतिम नाम के अनुसार क्रमबद्ध, और जो पहले से present दर्ज है, वह checked होता है।

1. जो हर व्यक्ति आया, उसके आगे checkbox चिह्नित करें। सभी को एक साथ बदलने के लिए **Select All** या **Select None** का उपयोग करें।
2. सूची के ऊपर की गिनती (उदाहरण के लिए, "12 of 15 present") आपके checkboxes चिह्नित करने के साथ अपडेट होती है।
3. **Save Attendance** पर click करें। जब तक आप सहेजते नहीं, कुछ भी दर्ज नहीं होता, और सहेजना पूरा होने पर एक संदेश पुष्टि करता है।

जिस व्यक्ति को पहले present दर्ज किया गया था, उसका checkbox हटाकर सहेजने पर वह session से हट जाता है।

### Visitors जोड़ना {#adding-visitors}

किसी ऐसे व्यक्ति को दर्ज करने के लिए जो group का सदस्य नहीं है, attendance सूची के बगल में person search में उसे खोजें। यदि वह अभी आपके database में नहीं है, तो आप search से ही उसे बना सकते हैं। दोनों ही स्थितियों में, वे सूची में पहले से checked जुड़ जाते हैं। उन्हें दर्ज करने के लिए **Save Attendance** पर click करें।

जो लोग kiosk पर check in हुए थे, उन पर **Volunteer** या **Guest** chip दिखता है। जो लोग group के सदस्य नहीं हैं, उन पर **Guest** chip दिखता है।

## जांचें कि कौन से groups को अभी भी attendance चाहिए {#checking-which-groups-still-need-attendance}

जब एक ही service time पर कई classes मिलती हैं, तो आप एक नज़र में देख सकते हैं कि किन के लिए उस तारीख की attendance अभी दर्ज होनी बाकी है।

1. ऐसा session खोलें जिसका service time हो।
2. attendance सूची के ऊपर **Who Still Needs Attendance** पर click करें।
3. एक dialog उस service time को सौंपे गए हर group को सूचीबद्ध करता है, ऊपर "5 of 8 groups entered" जैसा सारांश के साथ।

जिन groups में उस तारीख के लिए किसी को present नहीं चिह्नित किया गया, उन पर **Not entered** chip दिखता है और वे सबसे पहले सूचीबद्ध होते हैं। जिन groups में attendance है, उन पर **Entered** दिखता है, साथ में present चिह्नित लोगों की संख्या (उदाहरण के लिए, "Entered (12)")। किसी group के नाम पर click करें, तो उस group के sessions खुलते हैं जिसमें उसी तारीख का session पहले से चुना होता है, ताकि आप तुरंत उसकी attendance दर्ज कर सकें। यदि उस तारीख का group के लिए अभी session नहीं है, तो उसकी sessions सूची खुलती है ताकि आप एक जोड़ सकें।

:::tip
इसे **Print All Classes** और [एक service time की हर class के लिए sessions जोड़ने](#adding-sessions-for-every-class-in-a-service-time) के साथ उपयोग करें: sessions बनाएं, roll sheets बांटें, फिर **Who Still Needs Attendance** से देखें कि कौन सी sheets अभी दर्ज नहीं हुई हैं।
:::

## Roll sheet प्रिंट करना {#printing-a-roll-sheet}

roll sheet एक प्रिंट करने योग्य class सूची है, जिसे शिक्षक हाथ से चिह्नित करके बाद में आपको वापस दे सकते हैं ताकि आप उसे दर्ज कर सकें। हर sheet पर आपके church का logo दिखता है (यदि आपने [Website > Appearance](../website/appearance.md) से **Light Background Logo** अपलोड किया है), उसके नीचे church का नाम, class, class के नाम के नीचे एक बड़ी **Date** line, और service time। सदस्य दो columns में सूचीबद्ध होते हैं (पहले बाएं column को नीचे की ओर पढ़ें, फिर दाएं), ताकि एक page पर ज़्यादा नाम आ सकें, और हर सदस्य के लिए **Present** और **Absent** boxes होते हैं। आगंतुकों के लिए खाली lines और एक **Teacher / Notes** क्षेत्र भी होता है।

- **Session से** -- session की attendance सूची के ऊपर **Print Roll Sheet** (printer) icon पर click करें। Sheet पर session की तारीख होती है।
- **एक service की सभी classes** -- यदि session का service time है, तो **Print All Classes** पर click करें ताकि उस service time को सौंपी हर class की एक sheet प्रिंट हो। हर class अपने अलग page पर प्रिंट होती है।
- **सदस्य सूची से** -- group के page पर **All members** पर click करें, फिर सदस्य सूची के ऊपर **Print Roll Sheet** icon पर click करें और बिना तारीख वाली sheet प्रिंट करने के लिए **Attendance Sheet** चुनें। उसी menu में **Contact Roster** layout भी है, जिसमें हर सदस्य का phone, email, और address होता है -- देखें [सदस्य सूची प्रिंट करना](../groups/group-members.md#printing-the-member-list)।

Sheet एक नए tab में खुलती है और आपका browser का print dialog अपने-आप दिखता है।

## Attendance को spreadsheet में export करना {#exporting-attendance-to-a-spreadsheet}

आप session का रिकॉर्ड CSV फ़ाइल के रूप में डाउनलोड कर सकते हैं, ताकि उसे Excel, Numbers, या Google Sheets में उपयोग कर सकें।

1. वह session खोलें जिसे आप export करना चाहते हैं।
2. attendance सूची के ऊपर **Export** बटन पर click करें।
3. डाउनलोड की गई फ़ाइल को अपने spreadsheet application में खोलें।

## दर्ज की गई attendance देखना {#viewing-recorded-attendance}

sessions दर्ज होने के बाद, डेटा आपकी attendance reports में दिखता है।

- **Attendance Trend tab** (Attendance page पर **All years** के अंतर्गत) -- समय के साथ church-wide रुझान दिखाता है। देखें [Tracking Attendance](tracking-attendance.md)।
- **Group Attendance tab** -- हर अलग group के अनुसार attendance का विवरण दिखाता है। देखें [Attendance Reports](../reports/attendance-reports.md#group-attendance)।

:::tip
यदि आपका अभी बनाया गया session तुरंत reports में नहीं दिखता, तो जांचें कि session की तारीख report filters में चुनी गई date range के भीतर आती है।
:::
