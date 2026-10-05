---
title: "डेटा आयात करना"
---

# डेटा आयात करना

<div class="article-intro">

B1 Transfer tool आपके मौजूदा डेटा को B1 में लाना आसान बनाता है, चाहे आप एक स्प्रेडशीट से ताजा शुरू कर रहे हों, किसी अन्य चर्च प्रबंधन प्लेटफॉर्म से माइग्रेट कर रहे हों, या देने के रिकॉर्ड आयात कर रहे हों। इसका उपयोग किसी भी समय आपके डेटा को निर्यात या बैकअप करने के लिए भी किया जा सकता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको **Settings** तक पहुंच के साथ एक सक्रिय B1 Admin खाता चाहिए।
- शुरू करने से पहले अपने पिछले सिस्टम से निर्यात किया गया और तैयार डेटा रखें।
- यह tool प्रारंभिक डेटा माइग्रेशन के लिए है। यदि आप B1 का उपयोग करते समय एक समय के लिए कर चुके हैं, तो फिर से आयात करने से डुप्लिकेट रिकॉर्ड बन सकते हैं।

</div>

## Transfer Tool तक पहुंचना

1. **B1 Admin** में लॉग इन करें।
2. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (शीर्ष-बाएं में खोज पट्टी), **Settings** को विस्तृत करें, और **Settings** पर क्लिक करें।
3. पृष्ठ हेडर के शीर्ष दाएं में **Import/Export** बटन पर क्लिक करें।
4. यह **B1 Transfer** tool को [transfer.b1.church](https://transfer.b1.church) पर एक नए टैब में खोल देगा।

Transfer tool आपको चार चरणों के माध्यम से ले जाता है: Source, Preview, Destination, और Run।

---

## चरण 1 - अपना स्रोत चुनें

चुनें कि आपका डेटा कहाँ से आ रहा है। सात विकल्प हैं:

- **B1 Database** — सीधे आपके मौजूदा B1 चर्च से डेटा खींचता है। एक बैकअप बनाने या अपने डेटा को दूसरे प्रारूप में परिवर्तित करने के लिए उपयोगी। इस विकल्प का उपयोग करने के लिए आपको लॉग इन होना चाहिए।
- **B1 Import Zip** — B1 के अपने प्रारूप में एक zip file। यह मुख्य रूप से एक पिछली B1 export को restore करने के लिए प्रयोग किया जाता है।
- **Breeze Import Zip** — एक zip file जिसमें Breeze ChMS से निर्यात की गई files हैं।
- **Planning Center Zip** — Planning Center से निर्यात की गई एक zip या CSV file।
- **Custom CSV / Excel** — लोगों के डेटा वाली कोई भी CSV या Excel file। अपलोड करने के बाद, आप अपने कॉलम को B1 fields में मैप करेंगे इससे पहले कि import आगे बढ़े।
- **Tithe.ly CSV** — Tithe.ly से लोग या देना निर्यात फ़ाइल (CSV या Excel प्रारूप स्वीकार किया जाता है)।
- **CCB / Pushpay CSV** — Church Community Builder या Pushpay से लोग या देना निर्यात CSV।

आप अपनी file को अपलोड क्षेत्र पर drag और drop कर सकते हैं, या इसे browse करने के लिए क्लिक कर सकते हैं।

---

## चरण 1b - अपने फील्ड मैप करें (केवल Custom CSV / Excel)

यदि आपने **Custom CSV / Excel** चुना है, तो अपनी file अपलोड करने के बाद tool preview से पहले एक field mapping स्क्रीन दिखाएगा।

आपकी file से प्रत्येक कॉलम एक नमूना value के साथ सूचीबद्ध है। प्रत्येक कॉलम के लिए, मिलान करने वाली B1 field चुनने के लिए ड्रॉपडाउन का उपयोग करें। Tool "First Name," "Email," या "Zip Code" जैसे सामान्य कॉलम नामों को auto-detect करेगा, लेकिन आपको हर पंक्ति की समीक्षा करनी चाहिए और जो कुछ भी मिस किया है उसे सही करना चाहिए।

उपलब्ध B1 fields में शामिल हैं:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — नाम के आधार पर व्यक्ति को एक समूह सौंपता है
- **Custom Field (match by name)** -- कॉलम को अपनी चर्च के एक [custom person field](../settings/custom-fields.md) में सहेजता है। एक **B1 field name** box दिखाई देता है, कॉलम header से भरा हुआ। इसे field के नाम में बदलें जैसा कि यह B1 में दिखाई देता है (capitalization मायने नहीं रखता)।
- **Form Answer (custom field)** -- उस कॉलम के value को व्यक्ति के रिकॉर्ड से जुड़े एक custom field के रूप में सहेजता है। यदि आप इस विकल्प का उपयोग करते हैं, तो आपको फॉर्म को एक नाम देने के लिए कहा जाएगा।

तारीखें `9/17/1994` जैसे सामान्य प्रारूप में हो सकती हैं और स्वचालित रूप से परिवर्तित होती हैं। custom fields के लिए, हां/नहीं fields हां, नहीं, Y, N, True, False, 1, और 0 जैसे values स्वीकार करते हैं, और multiple-choice fields विकल्प text या उसके value दोनों स्वीकार करते हैं।

:::info
import करने से पहले B1 Admin में अपनी custom person fields बनाएं। जब import समाप्त होता है, तो **Custom Fields** चरण किसी भी कॉलम नामों को सूचीबद्ध करता है जो B1 field से मेल नहीं खाते और किसी भी values की गणना करता है जो field के प्रकार में फिट नहीं होते। वे values छोड़ दिए जाते हैं, और rest import अभी भी पूरा होता है।
:::

कॉलम जो आप import नहीं करना चाहते हैं उन्हें **(Skip)** पर सेट किया जा सकता है। कम से कम एक name field (First Name या Last Name) को map किया जाना चाहिए इससे पहले कि आप जारी रख सकें।

Preview पर जाने के लिए **Confirm Mapping & Import** पर क्लिक करें।

---

## चरण 2 - अपने डेटा का पूर्वावलोकन करें

अपलोड करने के बाद, tool हर चीज का एक preview दिखाता है जो import किया जाएगा। प्रत्येक data प्रकार की समीक्षा करने के लिए tabs का उपयोग करें:

- **People** — household द्वारा सूचीबद्ध, photos शामिल होने पर।
- **Groups** — campus, service, time, और category द्वारा आयोजित।
- **Attendance** — Session dates, groups, और visit counts।
- **Donations** — Batches, funds, donors, और amounts।
- **Forms** — Form names और content types।

आगे बढ़ने से पहले इसकी सावधानीपूर्वक समीक्षा करें। यदि कुछ गलत दिखता है, तो **Start Over** पर क्लिक करें और अपनी source file को सही करें।

---

## चरण 3 - अपना गंतव्य चुनें

चुनें कि आप डेटा को कहाँ भेजना चाहते हैं:

- **B1 Database** — सीधे आपकी चर्च की B1 database में import करता है। इसका चयन करने के बाद, tool added किए जाने वाले records की एक अंतिम गणना दिखाएगा। confirm करने के लिए **Start Transfer** पर क्लिक करें।
- **B1 Export Zip** — आपके डेटा को B1-format zip file के रूप में डाउनलोड करता है। backups के लिए अच्छा है।
- **Breeze Export Zip** — आपके डेटा को Breeze format में परिवर्तित करता है।
- **Planning Center Zip** — आपके डेटा को Planning Center format में परिवर्तित करता है।

:::warning
source और destination समान format नहीं हो सकते। यदि वे match करते हैं, तो tool आपको आकस्मिक duplication को रोकने के लिए warn करेगा।
:::

---

## चरण 4 - चलाएँ

Tool transfer को प्रोसेस करता है और प्रत्येक चरण के लिए progress दिखाता है:

- Campuses, Services, और Times
- People
- Photos
- Groups और Group Members
- Donations
- Attendance
- Forms, Questions, Answers, और Form Submissions
- Custom Fields (जब आपने कोई Custom Field कॉलम map किए)
- Compressing (केवल zip file गंतव्यों के लिए)

जब गंतव्य **B1 Database** होता है, तो progress card को **Import Progress** शीर्षक दिया जाता है और **Import Complete!** के साथ समाप्त होता है (या **Import Completed with Errors**)। zip file गंतव्यों के लिए, समान संदेश **Export** कहते हैं।

:::warning
transfer चलते समय अपने ब्राउज़र को बंद न करें। जब तक सभी चरण पूर्ण न दिखाई दें प्रतीक्षा करें।
:::

---

## Breeze Import Zip तैयार करना

1. Breeze में, **Settings** पर जाएं और बाएं sidebar में **Export** पर क्लिक करें।
2. तीन अलग files निर्यात करें: **People**, **Tags**, और **Contributions**।
3. सभी तीनों files का चयन करें, राइट-क्लिक करें, और उन्हें एक single zip file में संपीड़ित करें।
   - Mac पर: files का चयन करें, राइट-क्लिक करें, और **Compress** चुनें।
   - PC पर: files का चयन करें, राइट-क्लिक करें, **Send to** चुनें, फिर **Compressed (zipped) folder**।
4. Step 1 में **Breeze Import Zip** विकल्प का उपयोग करके zip file अपलोड करें।

Breeze import लोग, समूह (tags), और दान records को स्वचालित रूप से transfer करता है।

---

## Planning Center Export तैयार करना

1. Planning Center में लॉग इन करें और **People** product खोलें।
2. बाएं sidebar में, **Lists** पर क्लिक करें और एक list बनाएं जिसमें हर किसी को शामिल किया जाए जिसे आप लाना चाहते हैं। (यदि आपके पास पहले से अपनी पूरी congregation की एक list है, तो उसका उपयोग करें।)
3. list को खोलें और अपने लोगों को **CSV** file के रूप में डाउनलोड करने के लिए अपना **export** विकल्प का उपयोग करें। जिन fields को आप रखना चाहते हैं उन्हें शामिल करें -- नाम, ईमेल, फोन, पता, जन्मतिथि, लिंग, और सदस्यता स्थिति सभी B1 में मैप करते हैं।
4. यदि Planning Center आपको एक से अधिक files देता है, तो उन सभी का चयन करें, राइट-क्लिक करें, और उन्हें एक single zip में संपीड़ित करें।
   - Mac पर: files का चयन करें, राइट-क्लिक करें, और **Compress** चुनें।
   - PC पर: files का चयन करें, राइट-क्लिक करें, **Send to** चुनें, फिर **Compressed (zipped) folder**।
5. Step 1 में **Planning Center Zip** विकल्प का उपयोग करके CSV या zip अपलोड करें।

अपलोड करने के बाद, preview पर जाएं और import को चलाने से पहले पुष्टि करें कि आपके लोग और households सही दिखते हैं।

---

## Tithe.ly Export तैयार करना

1. Tithe.ly में, अपने **People** डेटा को CSV या Excel file के रूप में निर्यात करें। यदि आप दान records लाना चाहते हैं तो आप एक अलग **Giving** file को भी निर्यात कर सकते हैं।
2. Tool कॉलम नामों के आधार पर स्वचालित रूप से पता लगाएगा कि file में लोग या देना data है या नहीं।
3. Step 1 में **Tithe.ly CSV** विकल्प का उपयोग करके file अपलोड करें।

:::info
Tithe.ly exports को एक बार में एक file import किया जा सकता है। यदि आपको लोग और देना records दोनों को अलग से import करने की आवश्यकता है तो process को दो बार चलाएं।
:::

---

## CCB या Pushpay Export तैयार करना

1. Church Community Builder या Pushpay में, अपने **People** डेटा को CSV file के रूप में निर्यात करें। आप एक अलग देना/contributions file को भी निर्यात कर सकते हैं।
2. Tool कॉलम नामों के आधार पर स्वचालित रूप से पता लगाएगा कि file में लोग या देना data है या नहीं।
3. Step 1 में **CCB / Pushpay CSV** विकल्प का उपयोग करके file अपलोड करें।

---

## Import करने के बाद

एक बार transfer पूरा होने के बाद, अपने डेटा को verify करने के लिए कुछ मिनट लें:

1. [लोग](../people/adding-people.md) पृष्ठ browse करें और कुछ profiles को spot-check करें।
2. पुष्टि करें कि नाम, ईमेल, फोन नंबर, और पते सही से आए हैं।
3. जांचें कि household connections intact हैं।
4. import किए गए समूहों और देना records की समीक्षा करें।

यदि आप समस्याओं को notice करते हैं, तो आप People पृष्ठ से व्यक्तिगत profiles को संपादित कर सकते हैं। आप transfer tool को फिर से चलाकर [अपने डेटा को निर्यात](exporting-data.md) कर सकते हैं एक बैकअप के रूप में।
