---
title: "भूमिकाएं और अनुमतियां"
---

# भूमिकाएं और अनुमतियां

<div class="article-intro">

भूमिकाएं आपको नियंत्रित करने देती हैं कि विभिन्न उपयोगकर्ता आपके ChurchApps खाते के अंदर क्या एक्सेस कर सकते हैं। आप कर्मचारियों, स्वयंसेवकों और अन्य team members के लिए कस्टम भूमिकाएं बना सकते हैं, प्रत्येक की अपनी access level आपके डेटा को सुरक्षित रखने के लिए।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- आपको Domain Admin access की आवश्यकता है या भूमिकाओं को manage करने की permission वाली एक भूमिका
- Team members और उन क्षेत्रों की एक सूची है जहां उन्हें एक्सेस की आवश्यकता है
- निम्न में उपलब्ध permission categories की समीक्षा करें अपनी भूमिकाओं को plan करने के लिए

</div>

## भूमिकाओं तक पहुंचना

1. B1 Admin में, शीर्ष-बाएं कोने में **section menu** खोलें (छोटे तीर के साथ section का नाम) और **Settings** चुनें।
2. शीर्षलेख में **Roles** बटन पर क्लिक करें।
3. भूमिकाएं पृष्ठ आपकी चर्च के लिए सभी currently defined भूमिकाओं को प्रदर्शित करता है।

## भूमिकाएं पृष्ठ को समझना

भूमिकाएं पृष्ठ दो panels में विभाजित है:

- **Left side** -- Selected भूमिका को assigned members की सूची दिखाता है।
- **Right side** -- उन permission settings को प्रदर्शित करता है जिन्हें आप उस भूमिका के लिए कॉन्फ़िगर कर सकते हैं।

इसकी members और permissions को view और manage करने के लिए किसी भी भूमिका name पर क्लिक करें।

## एक भूमिका में उपयोगकर्ताओं को जोड़ना

1. जिस भूमिका में आप members को जोड़ना चाहते हैं उसे select करें।
2. Left side पर **search field** का उपयोग करें जिस व्यक्ति को जोड़ना चाहते हैं उसे खोजने के लिए।
3. Search results से व्यक्ति को select करें।
4. वे तुरंत भूमिका में जोड़े जाएंगे।

## एक भूमिका से उपयोगकर्ताओं को हटाना

1. उस भूमिका को select करें जिसमें उपयोगकर्ता को हटाना चाहते हैं।
2. Left side के member list में व्यक्ति को खोजें।
3. उनके नाम के आगे **remove button** पर क्लिक करें।

## अनुमतियों को कॉन्फ़िगर करना

प्रत्येक भूमिका को B1 Admin के विशिष्ट क्षेत्रों में एक्सेस दिया जा सकता है। अनुमतियों को section द्वारा organized किया जाता है:

- **People** -- Member directory और person records तक एक्सेस।
- **Donations** -- Donation records और fund management तक एक्सेस।
- **Attendance** -- Attendance tracking और reports तक एक्सेस।
- **Content** -- Website और content management तक एक्सेस।
- और अतिरिक्त क्षेत्र जैसे वे उपलब्ध हों।

भूमिकाएं पृष्ठ के right side पर checkboxes का उपयोग करके प्रत्येक क्षेत्र के लिए एक्सेस को enable या disable करें।

:::warning
**Domain Admins** को आपके ChurchApps खाते के सभी क्षेत्रों तक पूर्ण एक्सेस है। उनकी अनुमतियों को modified या restricted नहीं किया जा सकता। यह भूमिका केवल अपने सबसे विश्वस्त administrators के लिए उपयोग करें।
:::

:::tip
"Treasurer" जैसी विशिष्ट भूमिकाएं बनाएं जिसमें केवल **Donations** एक्सेस हो, या "Check-In Volunteer" जिसमें केवल **Attendance** एक्सेस हो। यह least privilege के सिद्धांत का पालन करता है और आपके डेटा को सुरक्षित रखता है। ChurchApps कैसे आपकी जानकारी की रक्षा करता है इस पर अधिक के लिए [Data Security](./data-security.md) देखें।
:::
