---
title: "भूमिकाएँ सौंपना"
description: "B1 Admin में भूमिकाएँ सौंपकर staff और volunteers को केवल वही people, donation, attendance, और group क्षेत्र दें जिनकी उन्हें ज़रूरत है।"
---

# भूमिकाएँ सौंपना

<div class="article-intro">

B1 Admin एक भूमिका-आधारित अनुमति प्रणाली का उपयोग करता है ताकि नियंत्रित हो कि आपकी टीम का हर उपयोगकर्ता क्या देख और कर सकता है। भूमिकाएँ सौंपकर, आप staff और volunteers को ठीक वही क्षेत्र दे सकते हैं जिनकी उन्हें ज़रूरत है -- और उससे अधिक नहीं। सही भूमिका प्रबंधन आपके चर्च के डेटा को सुरक्षित रखता है और आपकी टीम को कुशलता से काम करने में सक्षम बनाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको **Domain Admin** पहुँच या B1 Admin में **Settings** प्रबंधित करने की अनुमति वाली भूमिका चाहिए।
- जिन लोगों को आप भूमिकाएँ सौंपना चाहते हैं, वे पहले से आपकी directory में होने चाहिए। अगर आपको उन्हें पहले जोड़ना है, तो [Adding People](adding-people.md) देखें।

</div>

## भूमिकाओं को समझना {#understanding-roles}

भूमिका अनुमतियों का एक सेट है जिसे आप एक या अधिक उपयोगकर्ताओं को सौंपते हैं। उदाहरण के लिए, आप एक "Finance Team" भूमिका बना सकते हैं जो [donation रिकॉर्ड](../donations/recording-donations.md) तक पहुँच देती है, या एक "Check-In Volunteer" भूमिका जो केवल [attendance सुविधाओं](../attendance/check-in.md) की अनुमति देती है।

हर भूमिका B1 Admin के विशिष्ट क्षेत्रों तक पहुँच नियंत्रित करती है, जिनमें शामिल हैं:

- **People** -- सदस्य profiles देखना और संपादित करना। किसी व्यक्ति के रिकॉर्ड पर Notes सेक्शन के लिए **Edit People** चाहिए, और एक अलग **View Confidential Notes** अनुमति Confidential Notes सेक्शन (pastoral care, व्यक्तिगत इतिहास, और इसी तरह के संवेदनशील notes के लिए) तक पहुँच नियंत्रित करती है। **View People Names Only** किसी को पूरी directory तक पहुँच के बिना लोगों को नाम से खोजने देती है (केवल नाम, फ़ोटो, और सदस्यता स्थिति दिखती है)। **View Attendance** या **Edit Attendance** के साथ मिलाकर, यह एक volunteer को **Groups** खोलने और नाम से कक्षा की सूचियाँ देखने देती है; **Edit Attendance** के साथ वे [attendance दर्ज](../attendance/recording-attendance.md) भी कर सकते हैं। देखें [People Names Only](../settings/roles-permissions.md#people-names-only)।
- **Donations** -- योगदान और वित्तीय रिपोर्ट प्रबंधित करना। **Enter Donations** गिनती टीमों के लिए एक सीमित विकल्प है: यह किसी को उपहार दर्ज करने देता है, लेकिन केवल उन [batches](../donations/batches.md#who-can-change-a-batch) में जो अभी भी खुले हैं।
- **Attendance** -- attendance डेटा दर्ज करना और देखना
- **Forms** -- [custom forms](../forms/creating-forms.md) बनाना और प्रबंधित करना
- **Groups** -- [group सदस्यताएँ](../groups/group-members.md) और calendars प्रबंधित करना
- **Settings** -- चर्च-व्यापी सेटिंग्स कॉन्फ़िगर करना

:::warning
**Domain Admins** के पास B1 Admin के हर क्षेत्र तक पूरी पहुँच है। उनकी अनुमतियाँ संपादित या सीमित नहीं की जा सकतीं। इस भूमिका का उपयोग केवल अपने मुख्य administrators के लिए करें।
:::

## भूमिकाएँ देखना और प्रबंधित करना {#viewing-and-managing-roles}

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (B1 Admin के ऊपर-बाईं ओर का सर्च बार) और **Settings** खोलें।
2. **Roles** पर क्लिक करें।
3. आपको अपने चर्च के लिए कॉन्फ़िगर की गई सभी भूमिकाओं की सूची दिखेगी, जिसमें एक **Members** कॉलम होगा जो दिखाता है कि हर भूमिका में कितने उपयोगकर्ता हैं। **(Everyone)** भूमिका सभी उपयोगकर्ताओं पर लागू होती है।
4. उसके सदस्य और अनुमतियाँ देखने के लिए किसी भी भूमिका पर क्लिक करें।

## भूमिका में उपयोगकर्ता जोड़ना {#adding-users-to-a-role}

1. Jump menu में **Settings > Roles** चुनें।
2. वह भूमिका चुनें जिसमें आप उपयोगकर्ता जोड़ना चाहते हैं।
3. **Members** सेक्शन में **Add** पर क्लिक करें।
4. नाम से व्यक्ति को खोजें (या **Recent people** से चुनें), फिर उनके नाम या उसके बगल के add आइकन पर क्लिक करें। वे तुरंत भूमिका में जुड़ जाते हैं।

अगली बार लॉग इन करने पर उपयोगकर्ता के पास उस भूमिका से जुड़ी सभी अनुमतियाँ होंगी।

## भूमिका अनुमतियाँ संपादित करना {#editing-role-permissions}

1. Jump menu में **Settings > Roles** चुनें।
2. वह भूमिका चुनें जिसे आप बदलना चाहते हैं।
3. **Edit Permissions** सेक्शन में एक अनुमति समूह (जैसे **People and Groups**, **Donations**, या **Attendance**) खोलें और वे अनुमतियाँ चेक या अनचेक करें जो आप भूमिका के पास चाहते हैं। हर समूह दिखाता है कि उसकी कितनी अनुमतियाँ चेक हैं (जैसे **2 of 5**)। नाम से अनुमति खोजने के लिए **Filter permissions** में टाइप करें।
4. हर बदलाव उसी समय सहेजा जाता है जब आप कोई बॉक्स चेक या अनचेक करते हैं।

:::tip
न्यूनतम विशेषाधिकार के सिद्धांत का पालन करें -- हर भूमिका को केवल वही अनुमतियाँ दें जिनकी उसे वास्तव में ज़रूरत है। इससे आपका डेटा सुरक्षित रहता है और गलती से बदलाव होने की संभावना कम होती है।
:::

## सामान्य भूमिका उदाहरण {#common-role-examples}

- **Office Staff** -- People, Donations, Attendance, और Forms तक पहुँच
- **Group Leaders** -- केवल [Groups](../groups/creating-groups.md) तक पहुँच
- **Check-In Volunteers** -- **Checkin** attendance अनुमति, जो उस खाते को चाहिए जिससे [check-in kiosk](../attendance/check-in.md) पर साइन इन किया जाता है
- **Finance Team** -- [Donations](../donations/recording-donations.md) और रिपोर्टिंग तक पहुँच
- **Counting Team** -- **Enter Donations** और **View Donations**, ताकि volunteers giving सारांश देखे बिना खुले batches में भेंट दर्ज कर सकें

donation और people अनुमतियों पर करीब से नज़र डालने के लिए [Roles & Permissions](../settings/roles-permissions.md) देखें।
