---
title: "Attendance Reports"
---

# Attendance Reports

<div class="article-intro">

B1 Admin attendance को समझने में मदद करने के लिए तीन attendance reports प्रदान करता है कि लोग आपकी services और groups के साथ कैसे engage कर रहे हैं। हर report आपके attendance data पर एक different perspective प्रदान करता है, high-level trends से लेकर daily breakdowns तक।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- सुनिश्चित करें कि attendance को आपकी services और groups के लिए [consistently tracked](../attendance/tracking-attendance.md) किया जा रहा है
- सुनिश्चित करें कि आपके [groups](../groups/creating-groups.md) और services B1 Admin में configure किए गए हैं
- आपको reports को access करने के लिए appropriate [permissions](../settings/roles-permissions.md) की आवश्यकता है

</div>

## Attendance Trend

Attendance Trend report दिखाता है कि आपकी services के लिए attendance समय के साथ कैसे बदलता है।

1. अपने browser में सीधे **admin.b1.church/reports/attendanceTrend** पर जाएं (reports के navigation menu में कोई entry नहीं है — address को bookmark करना सबसे आसान तरीका है इस पर वापस आने के लिए)। समान report Attendance page के **Attendance Trend** tab पर भी है।
2. Optional रूप से परिणामों को filter करने के लिए **Campus**, **Service**, **Service Time**, या **Group** चुनें।
3. **Start Date** और **End Date** सेट करें। Default रूप से report पिछले year को cover करता है, एक year ago से लेकर आज तक, और end date को पूरी तरह से include किया जाता है। **Run Report** पर क्लिक करें।
4. Report एक bar chart और total visits per week की table दिखाता है। हर week को उस week के Sunday के date के साथ label किया जाता है, और table का **Session Dates** column actual dates को list करता है जिन्हें attendance था उस week में (उदाहरण के लिए, "9/27, 9/30")।

यह report seasonal dips, growth trends, या special events के impact जैसे patterns को spot करने के लिए उपयोगी है।

## Group Attendance

Group Attendance report दिखाता है कि date range में हर group session को किसने attend किया।

1. अपने browser में सीधे **admin.b1.church/reports/groupAttendance** पर जाएं, या Attendance page के **Group Attendance** tab को खोलें।
2. Optional रूप से **Campus** और **Service** चुनें।
3. **Start Date** और **End Date** सेट करें। Default रूप से report last Sunday से लेकर आज तक को cover करता है, और end date को पूरी तरह से include किया जाता है।
4. **Run Report** पर क्लिक करें।

परिणाम session date के अनुसार grouped हैं, फिर service time के अनुसार, फिर group के अनुसार, जिसमें उन लोगों को listed किया गया है जिन्होंने हर group को attend किया। Service times, groups, और names alphabetically sorted हैं। हर व्यक्ति के नाम के बगल में, **Checked In** column उस समय को दिखाता है जब उनकी attendance record की गई थी (blank जब कोई time file पर नहीं है) और **Membership Status** column उनकी status दिखाता है, जैसे Member या Visitor।

एक spreadsheet download करने के लिए, **Download Options** पर क्लिक करें और **Summary** चुनें। CSV में है:

- Date range में मिलने वाले हर group के एक सदस्य के लिए एक row, group के अनुसार और फिर name के अनुसार sorted।
- पहले columns में व्यक्ति का नाम और group का नाम।
- हर dated session के लिए एक column, service, service time, और date के साथ named (उदाहरण के लिए, "Sunday - 9:00 AM (2026-09-27)"), हर व्यक्ति को **present** या **absent** के साथ marked।

इस report का उपयोग groups के पार attendance को compare करने और identify करने के लिए करें कि कौन से groups बढ़ रहे हैं या attention की आवश्यकता है।

## Daily Group Attendance

Daily Group Attendance report आपके groups के लिए attendance data का एक day-by-day breakdown प्रदान करता है।

1. अपने browser में सीधे **admin.b1.church/reports/dailyGroupAttendance** पर जाएं।
2. Report के लिए **date range** सेट करें।
3. जिन **group(s)** को आप review करना चाहते हैं उन्हें चुनें।
4. Report range के भीतर हर individual day के लिए attendance numbers दिखाता है।

यह report granular detail देता है, जो week-to-week variation को समझने या unusually high या low attendance वाले specific days को identify करने के लिए helpful है।

:::tip
High-level overview के लिए Attendance Trend report का उपयोग करें और Daily Group Attendance report का उपयोग करें जब आपको specific dates में drill करने की आवश्यकता हो।
:::

## व्यावहारिक उपयोग

- **Planning** -- Upcoming services के लिए seating, staffing, और resources को plan करने के लिए attendance trends का उपयोग करें।
- **Outreach** -- Attendance patterns को decline करते हुए जल्दी identify करें ताकि आप सदस्यों को follow up कर सकें।
- **Board reports** -- Ministry health को दिखाने के लिए अपनी regular leadership reports में attendance data को include करें।
- **Event evaluation** -- Special events से पहले और बाद में attendance को compare करें उनके impact को measure करने के लिए।

:::warning
Attendance data आपकी group और service check-in processes के माध्यम से record किया जाता है। यदि attendance को consistently track नहीं किया जा रहा है, तो आपकी reports actual participation को accurately reflect नहीं करेंगे। Setup instructions के लिए [Tracking Attendance](../attendance/tracking-attendance.md) देखें।
:::
