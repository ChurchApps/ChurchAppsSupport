---
title: "Attendance Setup"
---

# Attendance Setup

<div class="article-intro">

इससे पहले कि आप attendance को track कर सकें, आपको B1 Admin को अपने चर्च के physical locations, जब services happen, और कौन से groups प्रत्येक service में meet करते हैं यह बताना चाहिए। यह एक-बार setup एक structure बनाता है जो आपके चर्च में सभी attendance tracking और reporting को power देता है।

</div>

<div class="prereqs">
<h4>शुरुआत से पहले</h4>

- आपको एक active B1 Admin account की जरूरत है जिसमें attendance को manage करने की permission हो। यदि आप अपनी access level के बारे में unsure हैं तो [Roles & Permissions](../people/roles-permissions.md) देखें।
- यदि आप groups को service times से assign करने की योजना बनाते हैं, तो पहले सुनिश्चित करें कि [आपके groups बनाए गए हैं](../groups/creating-groups.md)।

</div>

## Key Concepts

- **Campus** -- एक physical location जहां आपका चर्च meets (जैसे, "Main Campus," "North Campus")।
- **Service Time** -- एक campus में एक recurring gathering (जैसे, "Sunday 9:00 AM," "Wednesday 7:00 PM")।
- **Scheduled Group** -- एक group जो एक specific service time को assign किया जाता है। Attendance को उस service के context में track किया जाता है।
- **Unscheduled Group** -- एक group जो एक service time से independently attendance को track करता है।

## अपनी Attendance Structure को Setup करना

1. **B1 Admin** को खोलें और sidebar में **Attendance** को क्लिक करें।
2. **Setup** tab को चुनें।
3. **Add Campus** को क्लिक करें और अपनी location का नाम enter करें। **Save** को क्लिक करें।
4. अपने campus को selected करके, **Add Service Time** को क्लिक करें। "Sunday 9:00 AM" जैसा नाम enter करें और **Save** को क्लिक करें।
5. उस campus में प्रत्येक service time के लिए repeat करें।
6. एक group को service time से assign करने के लिए, service time को चुनें और **Add Group** को क्लिक करें। List से group को चुनें और **Save** को क्लिक करें।

### Group पर Track Attendance को Enable करना

इससे पहले कि एक group में attendance record किया जा सके, Track Attendance को उस group के लिए turn on होना चाहिए।

1. Sidebar में **Groups** को क्लिक करें और group को चुनें।
2. **Edit** pencil icon को क्लिक करें।
3. **Track Attendance** को **Yes** पर सेट करें।
4. **Save** को क्लिक करें।

:::tip
यदि आपने group को previous step में एक service time से assign किया है, तो group की edit screen पर **Add Service Time** option को भी use करें इसे correct service से link करने के लिए। यह सुनिश्चित करता है कि sessions को right campus और time से जोड़ा जाता है।
:::

:::tip
यदि एक group एक regular service के बाहर meet करता है -- जैसे एक midweek small group जो अपनी own attendance को track करता है -- तो आप इसे एक unscheduled group के रूप में छोड़ सकते हैं। यह फिर भी attendance reporting के लिए Groups tab पर appear होगा।
:::

## अपनी Setup को Edit करना

आप किसी भी समय अपनी setup को update कर सकते हैं। एक campus, service time, या group को चुनें और इसके details को change करने के लिए **Edit** को क्लिक करें, या इसे remove करने के लिए **Delete** को क्लिक करें।

:::info
एक service time को remove करना past attendance records को delete नहीं करता है। आपका historical data preserved रहता है भले ही आप अपनी schedule को change करें।
:::

## आगे क्या है

एक बार जब आपके campuses, service times, और groups जगह पर हों, तो आप [manually recording attendance](recording-attendance.md) को शुरू कर सकते हैं या अपनी services के लिए [self check-in](check-in.md) को setup कर सकते हैं।
