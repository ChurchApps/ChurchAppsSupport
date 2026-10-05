---
title: "उपस्थिति दर्ज करना"
---

# उपस्थिति दर्ज करना

<div class="article-intro">

एक बार जब आपके कैंपस, सेवा समय, और समूह सेट अप हो जाते हैं, तो आप प्रत्येक सभा के बाद मैन्युअल रूप से उपस्थिति दर्ज कर सकते हैं। B1 Admin **sessions** के चारों ओर उपस्थिति को organize करता है -- एक session प्रति समूह प्रति मीटिंग date। आप session बनाते हैं, चिह्नित करते हैं कि कौन दिखाई दिया, और डेटा सीधे आपकी उपस्थिति रिपोर्ट में चला जाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपके कैंपस, सेवा समय, और समूह को कॉन्फ़िगर किया जाना चाहिए। यदि आपने अभी तक ऐसा नहीं किया है तो [Attendance Setup](setup.md) देखें।
- जिन समूहों को आप track करना चाहते हैं उनके पास **Track Attendance** सक्षम होना चाहिए। विवरण के लिए [Attendance Setup](setup.md) देखें।

</div>

## एक Session बनाना

एक session एक समूह मीटिंग की एक घटना का प्रतिनिधित्व करता है -- उदाहरण के लिए, आपकी K--3rd grade class एक विशेष रविवार को।

1. **B1 Admin** खोलें, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (शीर्ष-बाएं खोज बार) खोलें, **People** विस्तृत करें, और **Groups** पर क्लिक करें।
2. उस समूह को चुनें जिसके लिए आप उपस्थिति दर्ज करना चाहते हैं।
3. **Sessions** टैब पर क्लिक करें।
4. एक नया session बनाने के लिए **New** पर क्लिक करें।
5. यदि समूह को एक सेवा समय से assign किया गया है, तो **Service Time** चुनें। यदि यह एक unscheduled समूह है, तो यह field दिखाई नहीं देगा।
6. **Session Date** चुनें -- यह आज, एक पिछली तारीख, या एक भविष्य की तारीख हो सकती है।
7. **Save** पर क्लिक करें।

### एक Service Time में हर Class के लिए Sessions जोड़ना

यदि अन्य समूह एक ही सेवा समय पर मिलते हैं (उदाहरण के लिए, आपकी सभी बाल classes रविवार 9:00 AM पर), तो आप एक step में उनके sessions बना सकते हैं, प्रत्येक समूह को visit करने के बजाय।

1. उपरोक्त step का पालन करें और एक **Service Time** चुनें।
2. **Also add for the other _N_ groups in _service time_** check करें। checkbox दिखाता है कि कितने अन्य समूह उस सेवा समय को assign किए गए हैं। यह केवल तब दिखाई देता है जब एक नया session जोड़ते हैं और कम से कम एक अन्य समूह उस समय पर मिलता है।
3. **Save** पर क्लिक करें।

एक session current समूह के लिए और उसी date और सेवा समय पर मिलने वाले प्रत्येक अन्य समूह के लिए बनाया जाता है। जिन समूहों के पास उस date और सेवा समय के लिए पहले से एक session है, उन्हें छोड़ दिया जाता है, इसलिए आपको duplicates नहीं मिलेंगे।

:::tip
आप पिछली तारीखों के लिए sessions बना सकते हैं ताकि आप उपस्थिति को catch up कर सकें जिसे आपने दर्ज नहीं किया है, या advance में उन्हें बना सकते हैं ताकि जब आपका समूह मिले तो वे तैयार हों।
:::

## Attendance को चिह्नित करना

एक session चुनें ताकि इसकी attendance list देख सकें। हर समूह सदस्य एक checkbox के साथ सूचीबद्ध होता है, अंतिम नाम द्वारा sorted, और जो कोई भी पहले से present के रूप में दर्ज है उसे check किया जाता है।

1. उपस्थित हर व्यक्ति के पास box check करें। **Select All** या **Select None** का उपयोग करके एक ही बार में सभी को change करें।
2. सूची के ऊपर की गणना (उदाहरण के लिए, "12 of 15 present") जैसे-जैसे आप boxes check करते हैं, update होती है।
3. **Save Attendance** पर क्लिक करें। कुछ भी तब तक दर्ज नहीं किया जाता है जब तक आप save न करें, और एक message confirm करता है जब save complete हो।

किसी को uncheck करना जो पहले से present के रूप में दर्ज था और फिर save करना उन्हें session से हटा देता है।

### Visitors को जोड़ना

किसी को record करने के लिए जो समूह का सदस्य नहीं है, attendance list के आगे person search में उन्हें खोजें। यदि वे आपके database में अभी तक नहीं हैं, तो आप search से उन्हें बना सकते हैं। उन्हें already checked के साथ सूची में जोड़ा जाता है। उन्हें record करने के लिए **Save Attendance** पर क्लिक करें।

जिन लोगों ने एक किस्क पर चेक-इन किया है वह एक **Volunteer** या **Guest** chip दिखाते हैं। जो लोग समूह सदस्य नहीं हैं वह एक **Guest** chip दिखाते हैं।

## यह Check करना कि किन Groups को अभी भी Attendance की आवश्यकता है

जब कई classes एक ही सेवा समय पर मिलते हैं, तो आप एक नज़र में देख सकते हैं कि किन्हें उस date के लिए अभी भी attendance दर्ज करने की आवश्यकता है।

1. एक session खोलें जिसका एक सेवा समय है।
2. attendance list के शीर्ष पर **Who Still Needs Attendance** पर क्लिक करें।
3. एक dialog हर समूह को list करता है जो उस सेवा समय को assign किया गया है, शीर्ष पर एक summary के साथ जैसे "5 of 8 groups entered"।

जिन समूहों के पास उस date के लिए कोई भी person marked present नहीं है वह एक **Not entered** chip दिखाते हैं और पहले list किए जाते हैं। जिन समूहों के पास attendance है वह **Entered** के साथ present के रूप में marked लोगों की संख्या के साथ दिखाते हैं (उदाहरण के लिए, "Entered (12)")। उस समूह का उपस्थिति दर्ज करने के लिए एक समूह के नाम पर क्लिक करें।

:::tip
इसे **Print All Classes** के साथ जोड़ें और [एक सेवा समय में हर class के लिए sessions जोड़ना](#adding-sessions-for-every-class-in-a-service-time): sessions बनाएं, roll sheets देते हैं, फिर **Who Still Needs Attendance** का उपयोग करें यह देखने के लिए कि कौन सी sheets अभी तक enter नहीं हुई हैं।
:::

## एक Roll Sheet को प्रिंट करना

एक roll sheet एक printable class list है जिसे teachers हाथ से mark कर सकते हैं और बाद में enter करने के लिए आपको वापस दे सकते हैं। प्रत्येक sheet चर्च का नाम, class, class के नाम के तहत एक large **Date** line, और सेवा समय दिखाता है। सदस्यों को दो columns में सूचीबद्ध किया जाता है (left column पढ़ें, फिर right) ताकि अधिक नाम एक page पर fit हों, और हर सदस्य के पास **Present** और **Absent** boxes हैं। visitors के लिए blank lines और एक **Teacher / Notes** area हैं।

- **एक session से** -- session की attendance list के शीर्ष पर **Print Roll Sheet** (printer) icon पर क्लिक करें। sheet को session की date के साथ dated किया जाता है।
- **एक सेवा के लिए सभी classes** -- यदि session का एक सेवा समय है, तो **Print All Classes** पर क्लिक करके उस सेवा समय को assign किए गए प्रत्येक class के लिए एक sheet print करें। हर class अपने ही page पर print होता है।
- **Members tab से** -- समूह की member list के ऊपर **Print Roll Sheet** icon पर क्लिक करके एक undated sheet print करें।

sheet एक नए tab में खुल जाता है और आपके browser की print dialog स्वचालित रूप से दिखाई देता है।

## Attendance को एक Spreadsheet में Export करना

आप session का एक record CSV file के रूप में download कर सकते हैं ताकि Excel, Numbers, या Google Sheets में उपयोग किया जा सके।

1. उस session को खोलें जिसे आप export करना चाहते हैं।
2. attendance list के शीर्ष पर **Export** बटन पर क्लिक करें।
3. अपनी spreadsheet application में downloaded file को खोलें।

## Recorded Attendance को Viewing करना

Sessions को record करने के बाद, डेटा आपकी attendance रिपोर्ट में दिखाई देता है।

- **Attendance Trend tab** -- चर्च-व्यापी trends को समय के साथ दिखाता है। [Tracking Attendance](tracking-attendance.md) देखें।
- **Group Attendance tab** -- व्यक्तिगत समूह द्वारा विभाजित attendance दिखाता है। [Attendance Reports](../reports/attendance-reports.md#group-attendance) देखें।

:::tip
यदि एक session जिसे आपने बनाया है वह तुरंत रिपोर्ट में दिखाई नहीं देता है, तो सुनिश्चित करें कि session की date रिपोर्ट फ़िल्टर में selected date range में आता है।
:::
