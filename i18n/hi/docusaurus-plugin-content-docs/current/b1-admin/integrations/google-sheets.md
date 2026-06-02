---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** B1.church के लिए आधिकारिक Google Sheets add-on है। यह किसी भी स्प्रेडशीट में एक साइडबार जोड़ता है जो People, Donations, Groups, या Attendance को आपके B1 चर्च से नामित tabs में निर्यात करता है — on demand, एक क्लिक के साथ। add-on पूरी तरह से उपयोगकर्ता के Google खाते के अंदर चलता है; इसके बारे में कुछ भी ChurchApps सर्वर को touch नहीं करता है प्रत्येक निर्यात जो read-only API कॉल करता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक Google खाता उस स्प्रेडशीट में edit access के साथ जिसमें आप निर्यात करना चाहते हैं
- एक चर्च प्रशासक (या किसी को जिसके पास आप निर्यात करना चाहते हैं डेटा के लिए read access) एक B1 API कुंजी बनाने में सक्षम
- Google Workspace Marketplace से B1 Export add-on स्थापित

</div>

## यह क्या निर्यात करता है

| Menu item | Sheet tab | डेटा |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

प्रत्येक निर्यात अपने नामित tab की सामग्री को **replace** करता है — एक निर्यात फिर से चलाने से आपको एक ताजा snapshot मिलता है, appended rows नहीं। स्प्रेडशीट में अन्य tabs untouched हैं।

## सेटअप

### 1. सही scopes के साथ एक B1 API कुंजी बनाएं

1. B1Admin में **Settings → Developer → API Keys** पर जाएं।
2. **New API Key** पर क्लिक करें, इसे "Sheets Export" नाम दें, और आप जो कुछ भी निर्यात करने की योजना बनाते हैं उसके लिए **read** scopes प्रदान करें:
   - People निर्यात के लिए `people:read`
   - Donations के लिए `donations:read`
   - Groups के लिए `groups:read`
   - Attendance के लिए `attendance:read`
3. एक कुंजी जो केवल निर्यात करती है उसे `settings:write` की आवश्यकता **नहीं** है — वह scope केवल उन connectors के लिए है जो webhooks register करते हैं (Zapier / Make)। इस कुंजी को narrow रखें।
4. सहेजें और `cak_…` कुंजी की प्रतिलिपि बनाएं।

### 2. add-on स्थापित करें

1. वह स्प्रेडशीट खोलें जिसमें आप निर्यात करना चाहते हैं।
2. **Extensions → Add-ons → Get add-ons**।
3. **B1 Export** की खोज करें और इसे स्थापित करें। Google आपको अपनी sheets और external HTTP को access देने के लिए कहता है (ताकि add-on B1 API को कॉल कर सके)।

installation के बाद, एक **B1 Export** entry इस Google खाते के साथ खोली जाने वाली हर स्प्रेडशीट के **Extensions** मेनू के तहत दिखाई देता है।

### 3. कुंजी को कनेक्ट करें

1. **Extensions → B1 Export → Connect…** (या पहले खुलने के बाद मेनू बार से **B1 Export → Connect…**)।
2. API कुंजी को sidebar में पेस्ट करें, Base URL को `https://api.churchapps.org` के रूप में छोड़ दें (जब तक आप staging के विरुद्ध परीक्षण नहीं कर रहे), और **Save** पर क्लिक करें।
3. **Test Connection** पर क्लिक करें — एक हरा "Connection OK" पुष्टि करता है कि कुंजी काम करती है।

कुंजी **per-user properties** में संग्रहीत होती है (`PropertiesService.getUserProperties()`) — यह आपके Google खाते से जुड़ी होती है, कभी भी sheet में नहीं लिखी जाती है, और स्प्रेडशीट के अन्य editors के लिए कभी दृश्यमान नहीं होती है।

## एक निर्यात चलाना

या तो:

- **मेनू से** — **Extensions → B1 Export → Export People** (या Donations / Groups / Attendance)
- **Sidebar से** — sidebar खोलें (Connect…) और उपयुक्त dataset बटन पर क्लिक करें

एक toast पुष्टि करता है जब यह पूर्ण हो — "_N_ row(s) written to 'B1 People'."

## शीर्ष पर रिपोर्ट बनाना

निर्यात किए गए tabs सादे Google Sheets डेटा हैं। tabs को referencing पर अपने स्वयं के analytics बनाएं:

- एक **summary tab** जिसमें `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` है जो कार्ड gifts को total करने के लिए
- **filtered view** केवल members के साथ `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- एक **chart** attendance trends के लिए `B1 Attendance` से pulling

निर्यात को फिर से चलाने से अंतर्निहित tab को refresh किया जाता है; आपके formulas स्वचालित रूप से अपडेट होते हैं।

## आवर्ती निर्यात को शेड्यूल करना

add-on on-demand है। साप्ताहिक या मासिक निर्यात के लिए, Apps Script के built-in time-driven triggers का उपयोग करें:

1. स्प्रेडशीट में **Extensions → Apps Script** (यह add-on की bound script को खोलता है)।
2. बाईं sidebar में **⏰ Triggers** आइकन पर क्लिक करें।
3. `exportPeople` के लिए **Add Trigger** (या कोई भी निर्यात function) — *Time-driven*, *Week timer*, उदाहरण के लिए *Every Monday 6am* चुनें।

निर्यात आपके Google खाते के तहत background में चलता है। यदि API कुंजी को rotate या revoke कर दिया जाता है, तो trigger आपको अगली बार विफल होने पर email करता है।

## अनुमतियां & गोपनीयता

- add-on केवल `spreadsheets.currentonly` (यह केवल उस स्प्रेडशीट को touch कर सकता है जिसमें यह खुला है) और `script.external_request` (ताकि `UrlFetchApp` B1 API को कॉल कर सके) का अनुरोध करता है। यह आपके Drive, Gmail, या अन्य Google डेटा को **नहीं** देखता है।
- B1 API कुंजी per-user संग्रहीत होती है — एक ही स्प्रेडशीट के अन्य editors इसे नहीं देख सकते।
- सभी B1 API कॉल HTTPS के साथ `Authorization: Bearer cak_…` से की जाती हैं।

## समस्या निवारण

- **"No API key set"** — **Extensions → B1 Export → Connect…** खोलें और कुंजी को पेस्ट करें।
- **"B1 rejected the API key (401)"** — कुंजी को revoke कर दिया गया है या गलत है। Re-mint करें और इसे फिर से पेस्ट करें।
- **"This API key lacks permission for /giving/donations (403)"** — कुंजी के पास `donations:read` नहीं है। B1Admin में कुंजी के scopes को अपडेट करें।
- **Sheet refresh नहीं होता** निर्यात चलाने के बाद — सुनिश्चित करें कि आप *सही* tab नाम (`B1 People` आदि) देख रहे हैं। निर्यात tab को बनाता है यदि यह मौजूद नहीं था।
- **"Quota exceeded"** — Apps Script `UrlFetchApp` पर per-user daily quotas (आमतौर पर हजारों कॉल प्रति दिन) लागू करता है। एक बड़े चर्च के साथ कई records को कई दिनों में निर्यात को split करने की आवश्यकता हो सकती है या high-volume sync के लिए [Make](./make) / एक custom integration का उपयोग करें।

## Add-On को कस्टमाइज़ करना

add-on open source है — Apps Script project `B1Integrations/GoogleSheetsAddon/` repo में रहता है। यदि आप एक column चाहते हैं जो हम निर्यात नहीं करते हैं, एक extra dataset, या एक अलग output format, वहां एक issue या PR खोलें।

## यह भी देखें

- [Zapier](./zapier) — on-demand निर्यात के बजाय real-time sync के लिए
- [Make](./make) — अधिक जटिल transformations के साथ sync के लिए
- [API Keys (developer reference)](/docs/developer/api/api-keys)
