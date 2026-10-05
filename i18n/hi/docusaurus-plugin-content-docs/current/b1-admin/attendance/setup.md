---
title: "उपस्थिति व्यवस्था"
---

# उपस्थिति व्यवस्था

<div class="article-intro">

इससे पहले कि आप उपस्थिति को track कर सकें, आपको B1 Admin को अपने चर्च के भौतिक स्थानों, सेवाएं कब होती हैं, और कौन से समूह प्रत्येक सेवा पर मिलते हैं, के बारे में बताने की आवश्यकता है। यह एक बार setup संरचना बनाता है जो आपके चर्च में सभी उपस्थिति tracking और reporting को power देती है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको उपस्थिति को manage करने की अनुमति के साथ एक सक्रिय B1 Admin खाता चाहिए। यदि आप अपने access level के बारे में निश्चित नहीं हैं तो [Roles & Permissions](../people/roles-permissions.md) देखें।
- यदि आप groups को service times से assign करना चाहते हैं, तो सुनिश्चित करें कि आपके [groups पहले बनाए गए हैं](../groups/creating-groups.md)।

</div>

## मुख्य अवधारणाएं

- **Campus** -- एक भौतिक स्थान जहां आपका चर्च मिलता है (उदाहरण के लिए, "Main Campus," "North Campus")। Campuses को **Settings** के तहत manage किया जाता है।
- **Service** -- एक कैंपस पर एक recurring gathering (उदाहरण के लिए, "Sunday Service," "Midweek")।
- **Service Time** -- एक विशिष्ट समय जब एक सेवा होती है (उदाहरण के लिए, "9:00 AM," "11:00 AM")।
- **Scheduled Group** -- एक group जो एक विशिष्ट सेवा समय को assign किया जाता है। Attendance उस सेवा के context में track किया जाता है।
- **Unscheduled Group** -- एक group जो एक सेवा समय के tied होने के बिना अपनी attendance को track करता है।

## अपनी Attendance Structure को सेट अप करना

1. **B1 Admin** खोलें, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (शीर्ष-बाएं खोज बार) खोलें, और **People** विस्तृत करें।
2. **Attendance** पर क्लिक करें। **Setup** tab डिफ़ॉल्ट रूप से selected है।
3. **Manage Campuses** पर क्लिक करें (Setup panel के top right पर)। यह आपको **Settings → Campuses** पर ले जाता है। **Add Campus** पर क्लिक करें, अपने स्थान का नाम दर्ज करें (address और time zone optional हैं), और **Save** पर क्लिक करें।
4. **People → Attendance → Setup** पर वापस लौटें। आपका कैंपस अब setup table में दिखाई देता है।
5. अपने कैंपस के तहत **Service column में + button** पर क्लिक करें। एक सेवा का नाम दर्ज करें जैसे "Sunday Service" और **Save** पर क्लिक करें।
6. सेवा के तहत **Time column में + button** पर क्लिक करें। एक समय दर्ज करें जैसे "9:00 AM" और **Save** पर क्लिक करें। प्रत्येक सेवा समय के लिए दोहराएं।
7. एक group को एक सेवा समय से जोड़ने के लिए, **People > Groups** से group को खोलें, **Edit** pencil पर क्लिक करें, और **Add Service Time** का उपयोग करें — अगले section को देखें।

### एक Group पर Track Attendance को सक्षम करना

इससे पहले कि एक group के लिए उपस्थिति दर्ज की जा सके, Track Attendance को उस group के लिए चालू किया जाना चाहिए।

1. Jump menu में, **People > Groups** चुनें और group को select करें।
2. **Edit** pencil icon पर क्लिक करें।
3. **Track Attendance** को **Yes** पर सेट करें।
4. **Save** पर क्लिक करें।

:::tip
यदि आपने पिछले step में group को एक सेवा समय assign किया है, तो group के edit screen पर **Add Service Time** option का भी उपयोग करें ताकि इसे सही सेवा से link किया जा सके। यह सुनिश्चित करता है कि sessions सही कैंपस और समय से जुड़े हैं।
:::

:::tip
यदि कोई समूह एक नियमित सेवा के बाहर मिलता है -- जैसे एक midweek small group जो अपनी attendance को track करता है -- तो आप इसे एक unscheduled group के रूप में छोड़ सकते हैं। यह अभी भी attendance रिपोर्टिंग के लिए Groups tab पर दिखाई देगा।
:::

## अपने Setup को Edit करना

आप कभी भी अपने setup को update कर सकते हैं। एक कैंपस, सेवा समय, या group select करें और इसके details को change करने के लिए **Edit** पर क्लिक करें, या इसे remove करने के लिए **Delete** पर क्लिक करें।

:::info
एक सेवा समय को हटाना पिछली उपस्थिति records को delete नहीं करता है। आपकी historical data संरक्षित है भले ही आप अपने schedule को change करें।
:::

## अगले क्या हैं

एक बार जब आपके कैंपस, सेवा समय, और group सही जगह पर हैं, तो आप [attendance को manually दर्ज करना](recording-attendance.md) शुरू करने के लिए तैयार हैं या अपनी सेवाओं के लिए [self check-in](check-in.md) को सेट अप करें।
