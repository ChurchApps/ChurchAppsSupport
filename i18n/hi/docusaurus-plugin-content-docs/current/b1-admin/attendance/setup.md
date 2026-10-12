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
2. **Attendance** पर क्लिक करें, फिर बाएं कॉलम में **Setup** पर क्लिक करें। **Service structure** तालिका खुलती है, जिसके शीर्ष पर आपके कैंपस, सेवा समय, और निर्धारित व अनिर्धारित समूहों की गिनती दिखती है।
3. **Manage Campuses** पर क्लिक करें (**Service structure** panel के top right पर)। यह आपको **Settings → Campuses** पर ले जाता है। **Add Campus** पर क्लिक करें, अपने स्थान का नाम दर्ज करें (address और time zone optional हैं), और **Save** पर क्लिक करें।
4. **People → Attendance** पर वापस लौटें और **Setup** पर क्लिक करें। आपका कैंपस अब setup table में दिखाई देता है।
5. अपने कैंपस के तहत **Service column में + button** पर क्लिक करें। एक सेवा का नाम दर्ज करें जैसे "Sunday Service" और **Save** पर क्लिक करें।
6. सेवा के तहत **Time column में + button** पर क्लिक करें। एक **Service Time** नाम दर्ज करें जैसे "9:00 AM", वैकल्पिक रूप से [check-in schedule](#setting-a-check-in-schedule) भरें, और **Save** पर क्लिक करें। प्रत्येक सेवा समय के लिए दोहराएं।
7. एक group को एक सेवा समय से जोड़ने के लिए, **People > Groups** से group को खोलें, **Edit** पर क्लिक करें, और **Add Service Time** का उपयोग करें — अगले section को देखें।

### एक Group पर Track Attendance को सक्षम करना

इससे पहले कि एक group के लिए उपस्थिति दर्ज की जा सके, Track Attendance को उस group के लिए चालू किया जाना चाहिए।

1. Jump menu में, **People > Groups** चुनें और group को select करें।
2. group के नाम के नीचे **Edit** बटन पर क्लिक करें।
3. **Track Attendance** को **Yes** पर सेट करें।
4. **Save** पर क्लिक करें।

:::tip
यदि आपने पिछले step में group को एक सेवा समय assign किया है, तो group के edit screen पर **Add Service Time** option का भी उपयोग करें ताकि इसे सही सेवा से link किया जा सके। यह सुनिश्चित करता है कि sessions सही कैंपस और समय से जुड़े हैं।
:::

:::tip
यदि कोई समूह एक नियमित सेवा के बाहर मिलता है -- जैसे एक midweek small group जो अपनी attendance को track करता है -- तो आप इसे एक unscheduled group के रूप में छोड़ सकते हैं। यह attendance रिपोर्टिंग के लिए अभी भी **Group Attendance** रिपोर्ट में दिखाई देगा।
:::

## चेक-इन शेड्यूल सेट करना {#setting-a-check-in-schedule}

प्रत्येक सेवा समय का एक वैकल्पिक चेक-इन शेड्यूल हो सकता है, ताकि [self check-in](check-in.md) हर सप्ताह अपने आप खुले और बंद हो। शेड्यूल के बिना, उस सेवा समय के लिए चेक-इन किसी भी समय उपलब्ध रहता है (जब तक कमरा अन्य कारणों से बंद न हो, जैसे भर जाना)।

1. **Setup** दृश्य में, **Time** column में किसी सेवा समय के नाम पर क्लिक करें (या एक नया जोड़ें)।
2. **Check-in Schedule** के तहत, वह **Day** चुनें जिस दिन सेवा समय मिलता है।
3. **Start Time** सेट करें और वैकल्पिक रूप से **End Time** सेट करें।
4. **Open check-in (minutes before start)** दर्ज करें -- उदाहरण के लिए, `30` का अर्थ है कि सेवा शुरू होने से आधा घंटा पहले चेक-इन खुल जाता है।
5. **Close check-in (minutes after end)** दर्ज करें -- उदाहरण के लिए, `15` का अर्थ है कि समाप्ति समय के 15 मिनट बाद तक चेक-इन खुला रहता है। यदि आपने कोई end time सेट नहीं किया है, तो यह start time से गिना जाता है।
6. **Save** पर क्लिक करें।

शेड्यूल आपके चर्च के स्थानीय समय का उपयोग करता है और हर सप्ताह दोहराता है। शेड्यूल हटाने के लिए, **Day** को वापस **No schedule** पर सेट करें और **Save** पर क्लिक करें। शेड्यूल तभी प्रभावी होता है जब **Day** और **Start Time** दोनों सेट हों।

जब किसी सेवा समय की चेक-इन विंडो बंद होती है:

- **B1.church पर self check-in** उस सेवा समय को छिपा देता है। यदि किसी सेवा के सभी समय बंद हैं, तो परिवारों को "Check-in isn't open for this service right now." दिखाई देता है।
- **B1 Checkin किस्क ऐप** उस सेवा समय के समूहों में चेक-इन पूरा नहीं करता; किस्क एक **Can't check in yet** स्क्रीन दिखाता है जिसमें प्रभावित कमरा सूचीबद्ध होता है, ताकि परिवार कोई दूसरा कमरा चुन सके।

:::tip
एक उदार open window सेट करें (उदाहरण के लिए, शुरू होने से 45 मिनट पहले), ताकि जल्दी आने वाले परिवार और स्वयंसेवक चेक-इन कर सकें, और एक छोटा close window, ताकि देर से आने वाले लोग सेवा शुरू होने के बाद भी चेक-इन कर सकें।
:::

## अपने Setup को Edit करना

आप कभी भी अपने setup को update कर सकते हैं। एक कैंपस, सेवा समय, या group select करें और इसके details को change करने के लिए **Edit** पर क्लिक करें, या इसे remove करने के लिए **Delete** पर क्लिक करें।

:::info
एक सेवा समय को हटाना पिछली उपस्थिति records को delete नहीं करता है। आपकी historical data संरक्षित है भले ही आप अपने schedule को change करें।
:::

## अगले क्या हैं

एक बार जब आपके कैंपस, सेवा समय, और group सही जगह पर हैं, तो आप [attendance को manually दर्ज करना](recording-attendance.md) शुरू करने के लिए तैयार हैं या अपनी सेवाओं के लिए [self check-in](check-in.md) को सेट अप करें।
