---
title: "भूमिकाएं असाइन करना"
---

# भूमिकाएं असाइन करना {#assigning-roles}

<div class="article-intro">

B1 Admin आपकी team के हर उपयोगकर्ता के लिए role-based permission system का उपयोग करता है, ताकि नियंत्रित रहे कि वे क्या देख और कर सकते हैं। भूमिकाएं असाइन करके, आप staff और volunteers को ठीक उन्हीं क्षेत्रों तक पहुंच दे सकते हैं जिनकी उन्हें आवश्यकता है — और उससे अधिक नहीं। सही भूमिका प्रबंधन आपके church के data को सुरक्षित रखता है और आपकी team को कुशलता से काम करने देता है।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- आपको **Domain Admin** access चाहिए या B1 Admin में **Settings** को प्रबंधित करने की अनुमति वाली भूमिका।
- जिन लोगों को आप भूमिकाएं देना चाहते हैं, वे पहले से आपकी directory में होने चाहिए। यदि आपको उन्हें पहले जोड़ना है, तो [लोगों को जोड़ना](adding-people.md) देखें।

</div>

## भूमिकाओं को समझना {#understanding-roles}

भूमिका अनुमतियों का एक set है जिसे आप एक या अधिक उपयोगकर्ताओं को देते हैं। उदाहरण के लिए, आप एक "Finance Team" भूमिका बना सकते हैं जो [donation records](../donations/recording-donations.md) तक पहुंच देती है, या एक "Check-In Volunteer" भूमिका जो केवल [attendance features](../attendance/check-in.md) तक पहुंच देती है।

हर भूमिका B1 Admin के विशिष्ट क्षेत्रों तक पहुंच नियंत्रित करती है, जिनमें शामिल हैं:

- **People** -- सदस्य profiles देखना और संपादित करना। किसी व्यक्ति के record पर Notes section के लिए **Edit People** चाहिए, और एक अलग **View Confidential Notes** अनुमति Confidential Notes section (pastoral care, personal history, और इसी तरह के संवेदनशील notes के लिए) तक पहुंच नियंत्रित करती है। **View People Names Only** किसी को नाम से लोगों को खोजने देती है (केवल नाम, फ़ोटो, और सदस्यता स्थिति देखते हुए), बिना पूरी directory तक पहुंच के। **View Attendance** या **Edit Attendance** के साथ मिलाकर, यह एक volunteer को **Groups** खोलकर नाम से class rosters देखने देती है; **Edit Attendance** के साथ वे [attendance दर्ज](../attendance/recording-attendance.md) भी कर सकते हैं। देखें [People Names Only](../settings/roles-permissions.md#people-names-only)।
- **Donations** -- योगदान और वित्तीय रिपोर्ट प्रबंधित करना। **Enter Donations** counting teams के लिए एक संकीर्ण विकल्प है: यह किसी को दान दर्ज करने देता है, लेकिन केवल उन [batches](../donations/batches.md#who-can-change-a-batch) में जो अभी भी खुले हैं।
- **Attendance** -- attendance डेटा दर्ज करना और देखना
- **Forms** -- [custom forms](../forms/creating-forms.md) बनाना और प्रबंधित करना
- **Groups** -- [group memberships](../groups/group-members.md) और calendars प्रबंधित करना
- **Settings** -- पूरे church की सेटिंग्स कॉन्फ़िगर करना

:::warning
**Domain Admins** के पास B1 Admin के हर क्षेत्र तक पूरी पहुंच होती है। उनकी अनुमतियां संपादित या सीमित नहीं की जा सकतीं। इस भूमिका का उपयोग केवल अपने मुख्य administrators के लिए करें।
:::

## भूमिकाएं देखना और प्रबंधित करना {#viewing-and-managing-roles}

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (B1 Admin के ऊपर-बाएं कोने में खोज बार) और **Settings** को expand करें।
2. **Roles** पर click करें।
3. आपको अपने church के लिए कॉन्फ़िगर की गई सभी भूमिकाओं की सूची दिखेगी।
4. किसी भी भूमिका पर click करें और उसके सदस्य व अनुमतियां देखें।

## भूमिका में उपयोगकर्ता जोड़ना {#adding-users-to-a-role}

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) में, **Settings > Roles** चुनें।
2. वह भूमिका चुनें जिसमें आप उपयोगकर्ता जोड़ना चाहते हैं।
3. **Members** section में, व्यक्ति को नाम से खोजें।
4. उन्हें भूमिका में असाइन करने के लिए **Add** पर click करें।

उपयोगकर्ता अगली बार लॉग इन करने पर उस भूमिका से जुड़ी सभी अनुमतियां पा जाएगा।

## भूमिका की अनुमतियां संपादित करना {#editing-role-permissions}

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) में, **Settings > Roles** चुनें।
2. वह भूमिका चुनें जिसे आप संशोधित करना चाहते हैं।
3. **Permissions** section में, जिन क्षेत्रों तक भूमिका की पहुंच चाहिए उन्हें check या uncheck करें।
4. अपने बदलाव लागू करने के लिए **Save** पर click करें।

:::tip
Least privilege के सिद्धांत का पालन करें — हर भूमिका को केवल वही अनुमतियां दें जिनकी उसे सच में आवश्यकता है। इससे आपका data सुरक्षित रहता है और गलती से होने वाले बदलावों की संभावना कम होती है।
:::

## सामान्य भूमिका उदाहरण {#common-role-examples}

- **Office Staff** -- People, Donations, Attendance, और Forms तक पहुंच
- **Group Leaders** -- केवल [Groups](../groups/creating-groups.md) तक पहुंच
- **Check-In Volunteers** -- केवल [Attendance](../attendance/check-in.md) तक पहुंच
- **Finance Team** -- [Donations](../donations/recording-donations.md) और रिपोर्टिंग तक पहुंच
- **Counting Team** -- **Enter Donations** और **View Donations**, ताकि volunteers giving summaries देखे बिना खुले batches में offering दर्ज कर सकें

People और donations की अनुमतियों पर करीबी नज़र के लिए [भूमिकाएं और अनुमतियां](../settings/roles-permissions.md) देखें।
