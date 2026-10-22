---
title: "भूमिकाएं और अनुमतियां"
---

# भूमिकाएं और अनुमतियां {#roles-permissions}

<div class="article-intro">

भूमिकाएं आपको नियंत्रित करने देती हैं कि आपके ChurchApps account में अलग-अलग उपयोगकर्ता क्या एक्सेस कर सकते हैं। आप staff, स्वयंसेवकों और अन्य team members के लिए कस्टम भूमिकाएं बना सकते हैं, हर एक की अपनी पहुंच के स्तर के साथ, ताकि आपका डेटा सुरक्षित रहे।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको Domain Admin पहुंच या भूमिकाएं प्रबंधित करने की अनुमति वाली भूमिका चाहिए
- Team members की सूची और उन क्षेत्रों की जानकारी रखें जिनकी उन्हें पहुंच चाहिए
- अपनी भूमिकाओं की योजना बनाने के लिए नीचे दी गई उपलब्ध अनुमति श्रेणियों की समीक्षा करें

</div>

## भूमिकाओं तक पहुंचना {#accessing-roles}

1. B1 Admin में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाईं ओर का search bar) खोलें और **Settings** को expand करें।
2. **Roles** पर click करें।
3. Roles पेज आपके चर्च के लिए परिभाषित सभी मौजूदा भूमिकाएं दिखाता है।

## Roles पेज को समझना {#understanding-the-roles-page}

Roles पेज दो panels में बंटा है:

- **बाईं ओर** -- चुनी गई भूमिका को सौंपे गए सदस्यों की सूची दिखाता है।
- **दाईं ओर** -- उस भूमिका के लिए configure की जा सकने वाली permission settings दिखाता है।

किसी भी भूमिका के नाम पर click करें ताकि उसके सदस्य और अनुमतियां देखें और प्रबंधित करें।

## भूमिका में उपयोगकर्ता जोड़ना {#adding-users-to-a-role}

1. वह भूमिका चुनें जिसमें आप सदस्य जोड़ना चाहते हैं।
2. बाईं ओर **search field** का उपयोग करके वह व्यक्ति ढूंढें जिसे आप जोड़ना चाहते हैं।
3. खोज परिणामों में से व्यक्ति को चुनें।
4. वे तुरंत भूमिका में जोड़ दिए जाएंगे।

## भूमिका से उपयोगकर्ता हटाना {#removing-users-from-a-role}

1. वह भूमिका चुनें जिसमें वह उपयोगकर्ता है जिसे आप हटाना चाहते हैं।
2. बाईं ओर सदस्य सूची में व्यक्ति को ढूंढें।
3. उनके नाम के बगल में **remove button** पर click करें।

## अनुमतियां कॉन्फ़िगर करना {#configuring-permissions}

हर भूमिका को B1 Admin के विशिष्ट क्षेत्रों की पहुंच दी जा सकती है। **Edit Permissions** panel में, अनुमतियां sections में समूहित होती हैं जिन्हें आप expand कर सकते हैं, जैसे **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups**, और **Tasks**। केवल मेल खाने वाली अनुमतियां दिखाने के लिए **Filter permissions** box में टाइप करें।

किसी भूमिका के लिए अनुमति देने या हटाने के लिए उसे check या uncheck करें।

### Donations अनुमतियां {#donations-permissions}

**Donations** section में ये अनुमतियां हैं:

- **View Donation Summaries** -- Donations section देखें, जिसमें Summary, Batches, Funds, Campaigns, और Giving Statements पेज शामिल हैं।
- **View Donations** -- व्यक्तिगत donations देखें, जैसे किसी batch के अंदर के gifts।
- **Edit Donations** -- पूर्ण नियंत्रण: donations और batches जोड़ें, संपादित करें और हटाएं, और [batches बंद और दोबारा खोलें](../donations/batches.md#closing-and-reopening-a-batch)।
- **Enter Donations** -- batches जोड़ें और donations दर्ज, संपादित, या हटाएं, लेकिन केवल उन batches में जो अभी भी खुली हैं। जिन लोगों के पास केवल यह अनुमति है, वे batches हटा नहीं सकते, उन्हें बंद या दोबारा खोल नहीं सकते, या online giving से आए gifts नहीं बदल सकते।
- **Edit Settings** -- donation settings प्रबंधित करें।

जिस व्यक्ति के पास **Enter Donations** है लेकिन **View Donation Summaries** नहीं है, उसे **Donations** के अंतर्गत केवल **Batches** पेज दिखता है। किसी counting team की भूमिका को **Enter Donations** और **View Donations** दोनों दें, ताकि वे batch खोल सकें और जो gifts उन्होंने दर्ज किए हैं उन्हें देख सकें। विवरण के लिए [Batch कौन बदल सकता है](../donations/batches.md#who-can-change-a-batch) देखें।

### केवल नाम वाली अनुमति {#people-names-only}

**People and Groups** section में **View People Names Only** शामिल है। इसे उन स्वयंसेवकों के लिए उपयोग करें जिन्हें लोगों को नाम से ढूंढना है -- उदाहरण के लिए, search box में किसी को चुनने के लिए -- पूरी directory की पहुंच के बिना। केवल इसी अनुमति के साथ, एक व्यक्ति:

- नाम से लोगों को खोज सकता है और हाल ही में जोड़े गए लोगों की सूची देख सकता है, लेकिन हर व्यक्ति का केवल नाम, फ़ोटो और membership status देखता है
- Email से खोज नहीं सकता, contact विवरण नहीं देख सकता, या **People** directory नहीं खोल सकता

**View People Names Only** को उन स्वयंसेवकों के लिए **View Attendance** या **Edit Attendance** के साथ जोड़ें जो कक्षा की attendance लेते हैं। उनके menu में **People** तब **Groups** खोलता है, जहां वे **All groups** सूची खोलकर हर कक्षा के सदस्यों के नाम और sessions देख सकते हैं। **Edit Attendance** के साथ वे [attendance रिकॉर्ड](../attendance/recording-attendance.md) भी कर सकते हैं और नाम से खोजकर visitors जोड़ सकते हैं। नाम person records के links नहीं होते, और गोपनीय groups तब तक छिपे रहते हैं जब तक स्वयंसेवक उसका सदस्य न हो।

B1 Admin उन links और buttons को छिपाता है जिनके लिए किसी भूमिका के पास अनुमति नहीं है। उदाहरण के लिए, **All groups** सूची केवल उन लोगों के लिए उपलब्ध है जो groups edit कर सकते हैं, group members देख सकते हैं, या people देख सकते हैं, या जिनके पास **View People Names Only** के साथ **View Attendance** या **Edit Attendance** है (बाकी लोग Dashboard पर वापस भेजे जाते हैं)। Attendance setup केवल **View Attendance** या **Edit Services** के साथ दिखता है, किसी group का **Email** button केवल उन लोगों को दिखता है जिनके पास **Edit Group Members** है (group email भेजने के लिए ज़रूरी अनुमति), group roster प्रिंट करने के लिए **View Group Members** या उस group का नेतृत्व चाहिए, और calendar event हटाने के लिए **Edit Content** चाहिए (या अपनी लंबित request वापस लेना)।

:::warning
**Domain Admins** के पास आपके ChurchApps account के सभी क्षेत्रों की पूरी पहुंच है। उनकी अनुमतियां बदली या सीमित नहीं की जा सकतीं। इस भूमिका का उपयोग केवल अपने सबसे भरोसेमंद administrators के लिए करें।
:::

:::tip
विशिष्ट भूमिकाएं बनाएं, जैसे केवल **Donations** पहुंच वाला "Treasurer", **Enter Donations** और **View Donations** वाला "Counting Team", या केवल **Attendance** पहुंच वाला "Check-In Volunteer"। यह न्यूनतम विशेषाधिकार (principle of least privilege) का पालन करता है और आपके डेटा को सुरक्षित रखता है। ChurchApps आपकी जानकारी कैसे सुरक्षित रखता है, इसके बारे में अधिक जानने के लिए [डेटा सुरक्षा](./data-security.md) देखें।
:::
