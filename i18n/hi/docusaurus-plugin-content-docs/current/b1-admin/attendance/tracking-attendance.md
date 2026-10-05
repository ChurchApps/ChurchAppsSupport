---
title: "उपस्थिति की ट्रैकिंग"
---

# उपस्थिति की ट्रैकिंग

<div class="article-intro">

एक बार जब आपके कैंपस, सेवा समय, और समूह कॉन्फ़िगर हो जाते हैं, तो B1 Admin उपस्थिति डेटा को review करना और trends को spot करना आसान बनाता है। Attendance page दो reporting views प्रदान करता है -- **Attendance Trend** tab चर्च-व्यापी trends के लिए और **Group Attendance** tab group-level detail के लिए। इन tools का उपयोग करके growth patterns को समझें, declining engagement को identify करें, और अपने चर्च के लिए data-driven decisions लें।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपकी attendance structure को कम से कम एक कैंपस और सेवा समय के साथ सेट अप किया जाना चाहिए। यदि आपने अभी तक ऐसा नहीं किया है तो [Attendance Setup](setup.md) देखें।
- Reports को दिखाने के लिए attendance data को दर्ज किया जाना चाहिए। Data [manual entry](recording-attendance.md) या [self check-in](check-in.md) से आ सकता है।

</div>

## Attendance Trends को Viewing करना

1. **B1 Admin** खोलें, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (शीर्ष-बाएं खोज बार) खोलें, **People** विस्तृत करें, और **Attendance** पर क्लिक करें।
2. **Attendance Trend** tab पर क्लिक करें।
3. Report स्वचालित रूप से tab खुलने पर चलता है, प्रत्येक week के लिए कुल attendance दिखाता है।

## अपने Data को Filter करना

**Filter Report** box में filters का उपयोग करके परिणामों को narrow करें, फिर **Run Report** पर क्लिक करें:

- **Campus** -- केवल उस location के लिए attendance देखने के लिए एक कैंपस select करें।
- **Service** -- report को एक सेवा तक सीमित करें।
- **Service Time** -- एक विशेष gathering में drill करने के लिए एक सेवा समय pick करें।
- **Group** -- एक single group के लिए attendance दिखाएं।
- **Start Date** और **End Date** -- include करने के लिए date range। डिफ़ॉल्ट रूप से report एक साल का सिलसिला देता है, एक साल पहले से आज तक, और end date पूर्ण रूप से included है।

Report एक bar chart और total visits per week का एक table दिखाता है। प्रत्येक week को उस week के Sunday की date के साथ labeled किया जाता है। Table में एक **Session Dates** column भी है जो उस week में actual dates को list करता है जिनके पास attendance था (उदाहरण के लिए, "9/27, 9/30"), ताकि आप देख सकें कि एक midweek gathering Sunday के समान week में कब counted होता है।

:::info
Reports हर बार जब आप Attendance Trend tab खोलते हैं तो auto-run होते हैं, इसलिए आप हमेशा refresh button पर क्लिक किए बिना up-to-date numbers देखेंगे।
:::

## Group Attendance

**Group Attendance** tab दिखाता है कि हर group session में कौन attend किया। यह useful है जब आप overall service numbers को देखने के बजाय एक specific class, ministry team, या small group को monitor करना चाहते हैं।

1. **Group Attendance** tab को select करें।
2. Optionally एक **Campus** और **Service** choose करें।
3. **Start Date** और **End Date** सेट करें। डिफ़ॉल्ट रूप से report last Sunday से आज का सिलसिला देता है।
4. **Run Report** पर क्लिक करें।

Results को session date द्वारा grouped किया जाता है, फिर service time और group द्वारा, प्रत्येक group के तहत attend किए गए लोगों के साथ listed। Service times, groups, और names को alphabetically sort किया जाता है इसलिए प्रत्येक heading एक बार दिखाई देता है। प्रत्येक person की row में एक **Checked In** column भी है जिसमें उनकी attendance record किए जाने का समय है (कोई file पर समय न होने पर blank) और एक **Membership Status** column (उदाहरण के लिए, Member या Visitor), ताकि आप guests को एक नज़र में spot कर सकें।

Data को download करने के लिए, **Download Options** पर क्लिक करें और **Summary** चुनें। CSV में group member प्रति एक row है, group द्वारा फिर name द्वारा sorted, और range में प्रत्येक dated session के लिए एक column (उदाहरण के लिए, "Sunday - 9:00 AM (2026-09-27)") **present** या **absent** marked।

:::tip
Group attendance विशेष रूप से valuable है [small group](../groups/creating-groups.md) leaders के लिए जो अपने group में समय के साथ engagement को track करना चाहते हैं।
:::

## Attendance Data को उपयोग करने के लिए Tips

- Seasonal patterns को जल्दी catch करने के लिए हर महीने trends को review करें।
- campus-level data को compare करें ताकि समझ सकें कि कौन सी locations बढ़ रही हैं।
- [groups](../groups/group-members.md) का पालन करने के लिए group-level reports का उपयोग करें जो declining attendance दिखाते हैं।
- Attendance insights को combine करें [AI Search](../people/ai-search.md) tool के साथ उन लोगों को खोजने के लिए जो हाल ही में attend नहीं किए हैं।

## संबंधित पृष्ठ

- [Recording Attendance](recording-attendance.md) -- एक group session के लिए मैन्युअल रूप से attendance दर्ज करें
- [Headcount Entry & Trend](headcount-entry.md) -- एक simpler total-count विकल्प, अपने स्वयं के weekly trend chart के साथ
- [Check-In](check-in.md) -- self check-in सेट अप करें ताकि attendance स्वचालित रूप से दर्ज हो
