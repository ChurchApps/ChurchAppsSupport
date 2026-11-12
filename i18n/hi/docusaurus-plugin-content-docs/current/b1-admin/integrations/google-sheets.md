---
title: "Google Sheets"
description: "B1 Export add-on के साथ B1 Admin को Google Sheets से जोड़ें, ताकि People, Donations, Groups, और Attendance मांग पर spreadsheet tabs में आ जाएँ।"
---

# Google Sheets

<div class="article-intro">

**B1 Export** B1.church के लिए आधिकारिक Google Sheets add-on है। यह किसी भी spreadsheet में एक sidebar जोड़ता है, जो आपके B1 चर्च से People, Donations, Groups, या Attendance को नाम वाले tabs में निर्यात करता है — मांग पर, एक क्लिक में। यह add-on पूरी तरह उपयोगकर्ता के Google account के अंदर चलता है; हर निर्यात द्वारा की गई केवल-पढ़ने वाली API calls के अलावा इसका ChurchApps के सर्वरों से कोई संबंध नहीं है।

</div>

:::caution अभी उपलब्ध नहीं
B1 Export add-on अभी Google Workspace Marketplace पर प्रकाशित नहीं हुआ है, इसलिए आप इसे आज इंस्टॉल नहीं कर सकते। तब तक B1Admin से लोगों का निर्यात करें (देखें [Exporting Data](../people/exporting-data.md)) और CSV को Google Sheets में इंपोर्ट करें। नीचे दिया गया सब कुछ बताता है कि add-on रिलीज़ होने के बाद कैसे काम करेगा।
:::

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक Google account जिसके पास उस spreadsheet पर edit पहुँच हो जिसमें आप निर्यात करना चाहते हैं
- एक चर्च admin (या ऐसा कोई व्यक्ति जिसके पास उस डेटा की read पहुँच हो जिसे आप निर्यात करना चाहते हैं) जो B1 API key बना सके
- Google Workspace Marketplace से इंस्टॉल किया गया B1 Export add-on

</div>

## यह क्या निर्यात करता है {#what-it-exports}

| मेनू आइटम | Sheet tab | डेटा |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

हर निर्यात अपने नाम वाले tab की सामग्री को **बदल देता** है — निर्यात दोबारा चलाने पर आपको नया snapshot मिलता है, जुड़ी हुई पंक्तियाँ नहीं। spreadsheet के बाकी tabs अछूते रहते हैं।

## सेटअप {#setup}

### 1. सही scopes के साथ B1 API key बनाएँ {#1-create-a-b1-api-key-with-the-right-scopes}

1. B1Admin में **Settings → Developer → API Keys** पर जाएँ।
2. **New API Key** पर क्लिक करें, उसका नाम "Sheets Export" रखें, और जो भी निर्यात करना चाहते हैं उसके लिए **read** scopes दें:
   - People निर्यात के लिए `people:read`
   - Donations के लिए `donations:read`
   - Groups के लिए `groups:read`
   - Attendance के लिए `attendance:read`
3. जो key केवल निर्यात करती है उसे `settings:write` **की ज़रूरत नहीं** है — वह scope केवल उन connectors के लिए है जो webhooks रजिस्टर करते हैं (Zapier / Make)। इस key को सीमित रखें।
4. सेव करें और `cak_…` key कॉपी करें।

### 2. Add-on इंस्टॉल करें {#2-install-the-add-on}

1. वह spreadsheet खोलें जिसमें आप निर्यात करना चाहते हैं।
2. **Extensions → Add-ons → Get add-ons**।
3. **B1 Export** खोजें और इंस्टॉल करें। Google आपसे आपकी sheets और external HTTP (ताकि add-on B1 API call कर सके) तक पहुँच देने के लिए कहेगा।

इंस्टॉल के बाद, इस Google account से खोली गई हर spreadsheet के **Extensions** मेनू में **B1 Export** दिखाई देगा।

### 3. Key जोड़ें {#3-connect-the-key}

1. **Extensions → B1 Export → Connect…** चुनें (या पहली बार खोलने के बाद मेनू बार से **B1 Export → Connect…**)।
2. sidebar में API key चिपकाएँ, Base URL को `https://api.churchapps.org` ही रहने दें (जब तक आप staging पर परीक्षण न कर रहे हों), और **Save** पर क्लिक करें।
3. **Test Connection** पर क्लिक करें — हरा "Connection OK" पुष्टि करता है कि key काम कर रही है।

key **प्रति-उपयोगकर्ता properties** (`PropertiesService.getUserProperties()`) में संग्रहीत होती है — यह आपके Google account से जुड़ी रहती है, कभी sheet में नहीं लिखी जाती, और spreadsheet के दूसरे editors को कभी दिखाई नहीं देती।

## निर्यात चलाना {#running-an-export}

इनमें से कोई एक करें:

- **मेनू से** — **Extensions → B1 Export → Export People** (या Donations / Groups / Attendance)
- **sidebar से** — sidebar खोलें (Connect…) और उपयुक्त dataset बटन पर क्लिक करें

काम पूरा होने पर एक toast पुष्टि करता है — "_N_ row(s) written to 'B1 People'."

## उस पर रिपोर्ट बनाना {#building-reports-on-top}

निर्यात किए गए tabs सामान्य Google Sheets डेटा हैं। उनका संदर्भ लेकर अपना विश्लेषण बनाएँ:

- कार्ड से दिए गए उपहारों का योग करने के लिए `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` वाला **summary tab**
- केवल सदस्यों का **फ़िल्टर किया हुआ दृश्य** `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")` से
- `B1 Attendance` से डेटा लेने वाला उपस्थिति रुझानों का **चार्ट**

निर्यात दोबारा चलाने पर अंतर्निहित tab ताज़ा हो जाता है; आपके formulas अपने-आप अपडेट हो जाते हैं।

## दोहराए जाने वाले निर्यात शेड्यूल करना {#scheduling-recurring-exports}

add-on डिफ़ॉल्ट रूप से मांग पर चलता है। साप्ताहिक या मासिक निर्यात के लिए, Apps Script के अंतर्निहित समय-आधारित triggers का उपयोग करें:

1. spreadsheet में **Extensions → Apps Script** (यह add-on की bound script खोलता है)।
2. बाईं sidebar में **⏰ Triggers** आइकन पर क्लिक करें।
3. `exportPeople` (या कोई भी निर्यात function) के लिए **Add Trigger** — *Time-driven*, *Week timer* चुनें, जैसे *Every Monday 6am*।

निर्यात आपके Google account के अंतर्गत पृष्ठभूमि में चलता है। अगर API key बदली या रद्द की गई, तो trigger अगली बार विफल होने पर आपको ईमेल भेजेगा।

## गोपनीयता और अनुमतियाँ {#permissions--privacy}

- add-on केवल `spreadsheets.currentonly` (वह केवल उसी spreadsheet को छू सकता है जो खुली है) और `script.external_request` (ताकि `UrlFetchApp` B1 API call कर सके) माँगता है। यह आपका Drive, Gmail, या अन्य Google डेटा **नहीं** देखता।
- B1 API key प्रति-उपयोगकर्ता संग्रहीत होती है — उसी spreadsheet के दूसरे editors उसे नहीं देख सकते।
- सभी B1 API calls HTTPS पर `Authorization: Bearer cak_…` के साथ होती हैं।

## समस्या निवारण {#troubleshooting}

- **"No API key set"** — **Extensions → B1 Export → Connect…** खोलें और key चिपकाएँ।
- **"B1 rejected the API key (401)"** — key हटा दी गई है या गलत है। नई key बनाएँ और चिपकाएँ।
- **"This API key lacks permission for /giving/donations (403)"** — key में `donations:read` नहीं है। मौजूदा key के scopes नहीं बदले जा सकते, इसलिए B1Admin में सही scopes के साथ नई key बनाएँ।
- **चलाने के बाद sheet ताज़ा नहीं होती** — सुनिश्चित करें कि आप *सही* tab नाम देख रहे हैं (`B1 People` आदि)। अगर tab मौजूद नहीं था तो निर्यात उसे बनाता है।
- **"Quota exceeded"** — Apps Script `UrlFetchApp` पर प्रति-उपयोगकर्ता दैनिक सीमाएँ लगाता है (आम तौर पर प्रतिदिन हज़ारों calls)। बहुत सारे रिकॉर्ड वाले बड़े चर्च को निर्यात कई दिनों में बाँटने पड़ें, या उच्च-मात्रा सिंक के लिए [Make](./make.md) / कस्टम integration का उपयोग करना पड़े।

## कोई column गायब है? {#missing-a-column}

अगर आपको ऐसा column चाहिए जो हम निर्यात नहीं करते, एक अतिरिक्त dataset, या अलग output format, तो [support@churchapps.org](mailto:support@churchapps.org) पर ईमेल करें।

## यह भी देखें {#see-also}

- [Zapier](./zapier.md) — मांग पर निर्यात के बजाय real-time सिंक के लिए
- [Make](./make.md) — अधिक जटिल transformations वाले सिंक के लिए
- [API Keys (developer reference)](/docs/developer/api/api-keys)
