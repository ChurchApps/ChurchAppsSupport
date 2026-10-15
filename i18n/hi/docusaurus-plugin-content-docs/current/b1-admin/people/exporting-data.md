---
title: "डेटा Export करना"
---

# डेटा Export करना

<div class="article-intro">

B1 Admin आपको अपने church का डेटा export करने देता है ताकि आप उसे spreadsheets में उपयोग कर सकें, अपनी team के साथ साझा कर सकें, या backup रख सकें। चाहे आपको नामों और emails की एक त्वरित सूची चाहिए हो या पूरे database का export, आपकी ज़रूरत के अनुसार विकल्प उपलब्ध हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको एक सक्रिय B1 Admin account चाहिए, जिसमें उस डेटा को देखने की अनुमति हो जिसे आप export करना चाहते हैं। यदि आपको अपने access level के बारे में निश्चितता नहीं है, तो [Roles & Permissions](roles-permissions.md) देखें।
- पूरे database export के लिए, आपको **Settings** क्षेत्र तक पहुंच चाहिए।

</div>

## People Page से Export करना

अपनी directory export करने का सबसे तेज़ तरीका सीधे **People** page से है:

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (B1 Admin में ऊपर-बाईं ओर का search bar) खोलें, **People** को expand करें, और **People** पर click करें।
2. जिन परिणामों को export करना है उन्हें सीमित करने के लिए search bar या filters का उपयोग करें (या सभी को export करने के लिए इसे बिना filter के छोड़ दें)। filtering के सुझावों के लिए [Searching People](searching-people.md) देखें।
3. People page के header में **Export** button पर click करें।
4. आपके परिणामों में मौजूद लोगों की एक CSV file आपके computer पर download होगी, जिसमें उनका नाम, contact जानकारी, address, और अन्य मानक fields शामिल होंगे।

:::tip
Export में आपके वर्तमान परिणामों के सभी लोग शामिल होते हैं। केवल आवश्यक लोगों को export करने के लिए पहले search चलाएं, एक [Saved List](./lists.md) लोड करें, या **Advanced** search का उपयोग करें।
:::

## Settings से पूरा Data Export

आपके सभी B1 डेटा (केवल लोग नहीं) का पूरा export करने के लिए, Settings में export tool का उपयोग करें:

1. Jump menu में, **Settings > Settings** चुनें।
2. settings menu के बाईं ओर के शीर्ष पर, अपने church के नाम के नीचे **Import/Export** link पर click करें।
3. **Data Source** dropdown से **B1 Database** चुनें।
4. data preview देखें और **Continue to Destination** पर click करें।
5. export destination के रूप में **B1 Export Zip** चुनें।
6. जब तक सभी items पर हरे checkmarks न दिखें, export की प्रगति देखते रहें।
7. export file अपने-आप download हो जाएगी। अपने downloads folder में `B1Export` file खोजें।
8. अलग-अलग CSV files (जैसे `people.csv`) तक पहुंचने के लिए file को unzip करें, जिन्हें आप Excel, Google Sheets, या Numbers में खोल सकते हैं।

:::info
B1 Export Zip आपके church के डेटा का पूरा backup है। इसमें शामिल है:

- लोग (photos सहित) और households, जिनमें household pickup contacts भी शामिल हैं
- campuses, services, और service times
- groups और group members
- funds और donations, जिनमें कई funds में बंटे gifts भी शामिल हैं
- attendance
- forms, questions, submissions, और answers
- custom fields और उनके values
- सहेजी गई people lists

इसे वापस लाने के लिए, source के रूप में **B1 Import Zip** और destination के रूप में **B1 Database** चुनें (देखें [Importing Data](./importing-data.md))। Households, pickup contacts, और सहेजी गई lists लोगों के साथ फिर से बनाई जाती हैं। सहेजी गई list के filters वापस लाए गए groups, funds, campuses, और custom fields की ओर इंगित होते हैं।
:::

## Group डेटा Export करना

आप व्यक्तिगत groups की member lists भी export कर सकते हैं। **Groups** page से, कोई group खोलें और उस group की member list export करने के लिए **download icon** पर click करें। अधिक विवरण के लिए [Group Members](../groups/group-members.md) देखें।

:::info
Exported CSV files Microsoft Excel, Google Sheets, और Apple Numbers सहित सभी प्रमुख spreadsheet applications में काम करती हैं।
:::
