---
title: "उपस्थिति दर्ज करना"
---

# उपस्थिति दर्ज करना

<div class="article-intro">

एक बार जब आपके campuses, service times, और groups सेट अप हो जाते हैं, तो आप हर सभा के बाद मैन्युअल रूप से उपस्थिति दर्ज कर सकते हैं। B1 Admin उपस्थिति को **sessions** के आधार पर व्यवस्थित करता है -- हर group के लिए हर मीटिंग की तारीख पर एक session। आप session बनाते हैं, चिह्नित करते हैं कि कौन उपस्थित था, और डेटा सीधे आपकी attendance reports में चला जाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपके campuses, service times, और groups कॉन्फ़िगर होने चाहिए। यदि आपने अभी तक यह नहीं किया है, तो [Attendance Setup](setup.md) देखें।
- जिन groups को आप track करना चाहते हैं, उनमें **Track Attendance** सक्षम होना चाहिए। विवरण के लिए [Attendance Setup](setup.md) देखें।

</div>

## एक Session बनाना

एक session किसी group की मीटिंग की एक घटना को दर्शाता है -- उदाहरण के लिए, किसी विशेष रविवार को आपकी K--3rd grade class।

1. **B1 Admin** खोलें, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाईं ओर का search bar) खोलें, **People** को expand करें, और **Groups** पर click करें।
2. वह group चुनें जिसके लिए आप उपस्थिति दर्ज करना चाहते हैं।
3. group के page पर **Sessions** section में **All sessions** पर click करें।
4. नया session बनाने के लिए **New** पर click करें।
5. यदि group किसी service time को assign है, तो **Service Time** चुनें। यदि यह एक unscheduled group है, तो यह field दिखाई नहीं देगा।
6. **Session Date** चुनें -- यह आज, कोई पिछली तारीख, या कोई आने वाली तारीख हो सकती है।
7. **Save** पर click करें।

### एक Service Time की हर Class के लिए Sessions जोड़ना

यदि उसी service time पर अन्य groups भी मिलते हैं (उदाहरण के लिए, रविवार सुबह 9:00 बजे आपकी सभी बच्चों की classes), तो आप हर group पर जाने के बजाय एक ही step में उनके sessions बना सकते हैं।

1. ऊपर दिए steps का पालन करें और एक **Service Time** चुनें।
2. **Also add for the other _N_ groups in _service time_** पर checkmark लगाएं। यह checkbox दिखाता है कि उस service time को कितने अन्य groups assign हैं। यह केवल तब दिखता है जब आप नया session जोड़ रहे हों और उस समय पर कम से कम एक और group मिलता हो।
3. **Save** पर click करें।

एक session वर्तमान group के लिए और उसी तारीख व service time पर मिलने वाले हर अन्य group के लिए बनाया जाता है। जिन groups के पास उस तारीख और service time के लिए पहले से session है, उन्हें छोड़ दिया जाता है, इसलिए आपको duplicates नहीं मिलेंगे।

:::tip
आप पिछली तारीखों के लिए sessions बना सकते हैं ताकि जो उपस्थिति आपने अभी तक दर्ज नहीं की है उसे पूरा कर सकें, या पहले से बनाकर रख सकते हैं ताकि जब आपका group मिले तो वे तैयार हों।
:::

## Attendance चिह्नित करना

उसकी attendance list देखने के लिए एक session चुनें। हर group सदस्य एक checkbox के साथ सूचीबद्ध होता है, last name के अनुसार sorted, और जो कोई पहले से present दर्ज है, उसका checkbox चिह्नित होता है।

1. हर उपस्थित व्यक्ति के आगे box पर checkmark लगाएं। सभी को एक साथ बदलने के लिए **Select All** या **Select None** का उपयोग करें।
2. सूची के ऊपर की गिनती (उदाहरण के लिए, "12 of 15 present") आपके boxes चिह्नित करने के साथ update होती है।
3. **Save Attendance** पर click करें। Save करने तक कुछ भी दर्ज नहीं होता, और save पूरा होने पर एक message पुष्टि करता है।

किसी ऐसे व्यक्ति का checkmark हटाकर save करना जो पहले से present दर्ज था, उन्हें session से हटा देता है।

### Visitors जोड़ना

किसी ऐसे व्यक्ति को दर्ज करने के लिए जो group का सदस्य नहीं है, attendance list के बगल में person search में उन्हें खोजें। यदि वे अभी तक आपके database में नहीं हैं, तो आप search से ही उन्हें बना सकते हैं। दोनों ही स्थितियों में, उन्हें पहले से checked के रूप में सूची में जोड़ दिया जाता है। उन्हें दर्ज करने के लिए **Save Attendance** पर click करें।

किसी kiosk पर check in करने वाले लोगों के आगे **Volunteer** या **Guest** chip दिखता है। जो लोग group के सदस्य नहीं हैं, उनके आगे **Guest** chip दिखता है।

## कौन-से Groups को अभी भी Attendance चाहिए, यह जाँचना

जब एक ही service time पर कई classes मिलती हैं, तो आप एक नज़र में देख सकते हैं कि किन classes की उस तारीख की उपस्थिति अभी भी दर्ज होनी बाकी है।

1. एक ऐसा session खोलें जिसकी service time हो।
2. attendance list के ऊपर **Who Still Needs Attendance** पर click करें।
3. एक dialog उस service time को assign हर group को सूचीबद्ध करता है, ऊपर "5 of 8 groups entered" जैसे सारांश के साथ।

जिस group में उस तारीख के लिए किसी को भी present चिह्नित नहीं किया गया है, वह **Not entered** chip दिखाता है और सबसे पहले सूचीबद्ध होता है। जिन groups की उपस्थिति दर्ज है, वे उपस्थित लोगों की संख्या के साथ **Entered** दिखाते हैं (उदाहरण के लिए, "Entered (12)")। उस group के sessions खोलने के लिए उसके नाम पर click करें, जिसमें उसी तारीख का session पहले से चुना होगा, ताकि आप तुरंत उसकी उपस्थिति दर्ज कर सकें। यदि उस तारीख के लिए group का अभी तक कोई session नहीं है, तो उसकी sessions list खुलती है ताकि आप एक जोड़ सकें।

:::tip
इसे **Print All Classes** और [service time की हर class के लिए sessions जोड़ने](#adding-sessions-for-every-class-in-a-service-time) के साथ इस्तेमाल करें: sessions बनाएं, roll sheets बांटें, फिर **Who Still Needs Attendance** से देखें कि कौन-सी sheets की प्रविष्टि अभी बाकी है।
:::

## Roll Sheet प्रिंट करना

roll sheet एक प्रिंट करने योग्य class list है, जिसे शिक्षक हाथ से चिह्नित करके बाद में आपको वापस दे सकते हैं ताकि आप उसे दर्ज कर सकें। हर sheet पर आपके church का logo दिखता है ([Website > Appearance](../website/appearance.md) से **Light Background Logo**, यदि आपने एक अपलोड किया है), उसके नीचे church का नाम, class, class के नाम के नीचे एक बड़ी **Date** line, और service time। Members दो columns में सूचीबद्ध होते हैं (पहले बाएं column को नीचे की ओर पढ़ें, फिर दाएं), ताकि एक page पर अधिक नाम आ सकें, और हर member के लिए **Present** और **Absent** boxes होते हैं। visitors के लिए खाली lines और एक **Teacher / Notes** क्षेत्र होता है।

- **एक session से** -- session की attendance list के ऊपर **Print Roll Sheet** (printer) icon पर click करें। sheet पर session की तारीख लिखी होती है।
- **एक service की सभी classes** -- यदि session की service time है, तो **Print All Classes** पर click करें ताकि उस service time को assign हर class की एक sheet प्रिंट हो। हर class अपने अलग page पर प्रिंट होती है।
- **Member list से** -- group के page पर **All members** पर click करें, फिर member list के ऊपर **Print Roll Sheet** icon पर click करें और बिना तारीख वाली sheet प्रिंट करने के लिए **Attendance Sheet** चुनें। उसी menu में **Contact Roster** layout भी है, जिसमें हर member का phone, email, और address होता है -- देखें [Printing the Member List](../groups/group-members.md#printing-the-member-list)।

sheet एक नए tab में खुलती है और आपके browser का print dialog अपने-आप दिखाई देता है।

## Attendance को Spreadsheet में Export करना

Excel, Numbers, या Google Sheets में उपयोग के लिए आप session का रिकॉर्ड CSV file के रूप में download कर सकते हैं।

1. वह session खोलें जिसे आप export करना चाहते हैं।
2. attendance list के ऊपर **Export** button पर click करें।
3. download हुई file को अपने spreadsheet application में खोलें।

## दर्ज की गई Attendance देखना

sessions दर्ज करने के बाद, डेटा आपकी attendance reports में दिखाई देता है।

- **Attendance Trend tab** (Attendance page पर **All years** के अंतर्गत) -- समय के साथ church-wide trends दिखाता है। देखें [Tracking Attendance](tracking-attendance.md)।
- **Group Attendance tab** -- हर व्यक्तिगत group के अनुसार बंटी हुई attendance दिखाता है। देखें [Attendance Reports](../reports/attendance-reports.md#group-attendance)।

:::tip
यदि आपके द्वारा अभी बनाया गया session reports में तुरंत नहीं दिखता, तो सुनिश्चित करें कि session की तारीख report filters में चुनी गई date range के भीतर आती है।
:::
