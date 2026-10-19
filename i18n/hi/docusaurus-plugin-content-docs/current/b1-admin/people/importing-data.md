---
title: "डेटा इम्पोर्ट करना"
---

# डेटा इम्पोर्ट करना

<div class="article-intro">

B1 Transfer tool आपके मौजूदा डेटा को B1 में लाना आसान बनाता है, चाहे आप किसी spreadsheet से नई शुरुआत कर रहे हों, किसी अन्य church management platform से माइग्रेट कर रहे हों, या giving records इम्पोर्ट कर रहे हों। इसका उपयोग किसी भी समय अपने डेटा को export या backup करने के लिए भी किया जा सकता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपके पास **Settings** तक पहुंच वाला सक्रिय B1 Admin account होना चाहिए।
- शुरू करने से पहले अपना डेटा अपने पिछले सिस्टम से export करके तैयार रखें।
- यह tool शुरुआती डेटा माइग्रेशन के लिए है। अगर आप B1 का उपयोग काफ़ी समय से कर रहे हैं, तो फिर से इम्पोर्ट करने से duplicate records बन सकते हैं।

</div>

## Transfer Tool तक पहुंचना

1. **B1 Admin** में लॉग इन करें।
2. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाएं कोने का search bar) खोलें, **Settings** को विस्तृत करें, और **Settings** पर क्लिक करें।
3. सेटिंग्स के बाएं मेनू में, अपने church के नाम के नीचे **Import/Export** link पर क्लिक करें।
4. इससे **B1 Transfer** tool [transfer.b1.church](https://transfer.b1.church) पर एक नए tab में खुलेगा।

Transfer tool चार चरणों में आपका मार्गदर्शन करता है: Source (स्रोत), Preview (पूर्वावलोकन), Destination (गंतव्य), और Run (चलाएं)।

---

## चरण 1 - अपना स्रोत चुनें

चुनें कि आपका डेटा कहां से आ रहा है। सात विकल्प हैं:

- **B1 Database** — आपके मौजूदा B1 church से सीधे डेटा खींचता है। backup बनाने या डेटा को किसी अन्य format में बदलने के लिए उपयोगी। इस विकल्प का उपयोग करने के लिए आपका लॉग इन होना ज़रूरी है।
- **B1 Import Zip** — B1 के अपने format में एक zip file। यह मुख्य रूप से पिछले B1 export को वापस लाने के लिए उपयोग होती है। B1 Export Zip को **B1 Database** में वापस लोड करने से वह सब कुछ पुनर्स्थापित हो जाता है जो export में है (देखें [Exporting Data](./exporting-data.md#full-data-export-from-settings))। अगर फ़ाइल पढ़ी नहीं जा सकती, तो tool शुरू से शुरू करने के बजाय error दिखाता है।
- **Breeze Import Zip** — Breeze ChMS से export की गई फ़ाइलों वाली एक zip file।
- **Planning Center Zip** — Planning Center से export की गई zip या CSV फ़ाइल।
- **Custom CSV / Excel** — people डेटा वाली कोई भी CSV या Excel फ़ाइल। अपलोड के बाद, इम्पोर्ट आगे बढ़ने से पहले आपको अपने columns को B1 fields से मैप करना होगा।
- **Tithe.ly CSV** — Tithe.ly से people या giving export फ़ाइल (CSV या Excel format स्वीकार्य)।
- **CCB / Pushpay CSV** — Church Community Builder या Pushpay से people या giving export CSV।

आप अपनी फ़ाइल को upload area पर drag and drop कर सकते हैं, या ब्राउज़ करने के लिए click कर सकते हैं।

---

## चरण 1बी - अपने Fields मैप करें (केवल Custom CSV / Excel)

अगर आपने **Custom CSV / Excel** चुना है, तो फ़ाइल अपलोड करने के बाद tool preview से पहले एक field mapping स्क्रीन दिखाएगा।

आपकी फ़ाइल का हर column एक नमूना value के साथ सूचीबद्ध होता है। हर column के लिए, मिलता हुआ B1 field चुनने के लिए dropdown उपयोग करें। Tool "First Name," "Email," या "Zip Code" जैसे आम column नामों को अपने-आप पहचान लेता है, लेकिन आपको हर row की जांच करनी चाहिए और जो भी छूट गया हो उसे ठीक करना चाहिए।

उपलब्ध B1 fields में शामिल हैं:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — नाम से व्यक्ति को एक group में डालता है
- **Custom Field (match by name)** — column को आपके church के [custom person fields](../settings/custom-fields.md) में से किसी एक में सहेजता है। एक **B1 field name** बॉक्स दिखता है, जो column header से भरा होता है। इसे उस field के नाम में बदलें जैसा वह B1 में है (capitalization मायने नहीं रखता)।
- **Form Answer (custom field)** — उस column की value को व्यक्ति के record से जुड़े custom field के रूप में सहेजता है। अगर आप यह विकल्प चुनते हैं, तो आपसे फ़ॉर्म का नाम देने को कहा जाएगा।

`9/17/1994` जैसी सामान्य formats में तारीखें स्वीकार की जाती हैं और अपने-आप बदल दी जाती हैं। Custom fields के लिए, Yes/No fields Yes, No, Y, N, True, False, 1, और 0 जैसे values स्वीकार करते हैं, और multiple-choice fields choice का टेक्स्ट या उसका value, दोनों में से कुछ भी स्वीकार करते हैं।

:::info
इम्पोर्ट से पहले B1 Admin में अपने custom person fields बनाएं। इम्पोर्ट पूरा होने पर, **Custom Fields** चरण उन column नामों की सूची देता है जो किसी B1 field से मेल नहीं खाते, और उन values की गिनती करता है जो field के प्रकार में फ़िट नहीं होतीं। वे values छोड़ दी जाती हैं, और बाकी इम्पोर्ट फिर भी पूरा हो जाता है।
:::

जो columns आप इम्पोर्ट नहीं करना चाहते, उन्हें **(Skip)** पर सेट किया जा सकता है। आगे बढ़ने से पहले कम से कम एक नाम वाला field (First Name या Last Name) मैप होना चाहिए।

preview पर जाने के लिए **Confirm Mapping & Import** पर क्लिक करें।

---

## चरण 2 - अपने डेटा का पूर्वावलोकन करें

अपलोड के बाद, tool उन सभी चीज़ों का पूर्वावलोकन दिखाता है जो इम्पोर्ट होंगी। हर डेटा प्रकार की समीक्षा के लिए tabs उपयोग करें:

- **People** — household के अनुसार सूचीबद्ध, अगर शामिल हों तो photos के साथ।
- **Groups** — campus, service, समय, और श्रेणी के अनुसार व्यवस्थित।
- **Attendance** — session की तारीखें, groups, और visit counts।
- **Donations** — batches, funds, donors, और राशियां।
- **Forms** — form के नाम और content types।

आगे बढ़ने से पहले इसे ध्यान से देखें। अगर कुछ गलत लगे, तो **Start Over** पर क्लिक करें और अपनी स्रोत फ़ाइल सुधारें।

---

## चरण 3 - अपना गंतव्य चुनें

चुनें कि आप डेटा कहां भेजना चाहते हैं:

- **B1 Database** — सीधे आपके church के B1 database में इम्पोर्ट करता है। इसे चुनने के बाद, tool जोड़े जाने वाले records की अंतिम गिनती दिखाएगा। पुष्टि के लिए **Start Transfer** पर क्लिक करें।
- **B1 Export Zip** — आपका डेटा B1 format की zip file में download करता है, जिसे बाद में **B1 Import Zip** से वापस लाया जा सकता है। backups के लिए अच्छा।
- **Breeze Export Zip** — आपके डेटा को Breeze format में बदलता है।
- **Planning Center Zip** — आपके डेटा को Planning Center format में बदलता है।

:::warning
स्रोत और गंतव्य एक ही format के नहीं हो सकते। अगर वे मेल खाते हैं, तो tool गलती से डुप्लिकेशन रोकने के लिए चेतावनी देगा।
:::

---

## चरण 4 - चलाएं

tool transfer प्रक्रिया करता है और हर चरण की प्रगति दिखाता है:

- Campuses, Services, और Times
- People
- Photos
- Groups और Group Members
- Donations
- Attendance
- Forms, Questions, Answers, और Form Submissions
- Custom Fields (जब आपने कोई Custom Field columns मैप किए हों)
- Compressing (केवल zip file गंतव्यों के लिए)

जब गंतव्य **B1 Database** होता है, तो progress card का शीर्षक **Import Progress** होता है और वह **Import Complete!** (या **Import Completed with Errors**) पर खत्म होता है। zip file गंतव्यों के लिए, वही संदेश **Export** शब्द का उपयोग करते हैं।

:::info
**B1 Import Zip** को वापस लाते समय, जो records फ़ाइल में अब मौजूद किसी चीज़ की ओर इशारा करते हैं, उन्हें छोड़ दिया जाता है, इम्पोर्ट रुकता नहीं: उन लोगों या groups के लिए group memberships जो zip में नहीं हैं, हटाए गए groups या लोगों के लिए attendance, और groups और हटाए गए service times के बीच links। जो attendance sessions कभी किसी service time से नहीं जुड़े थे, वे फिर भी पुनर्स्थापित होते हैं। इसी तरह, export करते समय, जो photo डाउनलोड या पढ़ी नहीं जा सकती, उसे छोड़ दिया जाता है ताकि **Photos** चरण आगे बढ़ता रहे।
:::

:::warning
transfer चलते समय अपना browser बंद न करें। सभी चरण पूरे दिखने तक प्रतीक्षा करें।
:::

---

## Breeze Import Zip तैयार करना

1. Breeze में, **Settings** पर जाएं और बाएं sidebar में **Export** पर क्लिक करें।
2. तीन अलग फ़ाइलें export करें: **People**, **Tags**, और **Contributions**।
3. तीनों फ़ाइलें चुनें, right-click करें, और उन्हें एक single zip file में compress करें।
   - Mac पर: फ़ाइलें चुनें, right-click करें, और **Compress** चुनें।
   - PC पर: फ़ाइलें चुनें, right-click करें, **Send to** चुनें, फिर **Compressed (zipped) folder**।
4. चरण 1 में **Breeze Import Zip** विकल्प का उपयोग करके zip file अपलोड करें।

Breeze import people, groups (tags), और donation records अपने-आप transfer करता है।

---

## Planning Center Export तैयार करना

1. Planning Center में लॉग इन करें और **People** product खोलें।
2. बाएं sidebar में **Lists** पर क्लिक करें और एक list बनाएं जिसमें वे सभी लोग शामिल हों जिन्हें आप लाना चाहते हैं। (अगर आपके पास पूरी congregation की list पहले से है, तो उसी का उपयोग करें।)
3. list खोलें और उसके **export** विकल्प से अपने people को **CSV** file के रूप में download करें। वे fields शामिल करें जो आप रखना चाहते हैं — name, email, phone, address, birthdate, gender, और membership status सभी B1 में मैप होते हैं।
4. अगर Planning Center एक से ज़्यादा फ़ाइलें देता है, तो सभी चुनें, right-click करें, और उन्हें एक single zip में compress करें।
   - Mac पर: फ़ाइलें चुनें, right-click करें, और **Compress** चुनें।
   - PC पर: फ़ाइलें चुनें, right-click करें, **Send to** चुनें, फिर **Compressed (zipped) folder**।
5. चरण 1 में **Planning Center Zip** विकल्प का उपयोग करके CSV या zip अपलोड करें।

अपलोड के बाद, preview पर जाएं और इम्पोर्ट चलाने से पहले पुष्टि करें कि आपके people और households सही दिख रहे हैं।

---

## Tithe.ly Export तैयार करना

1. Tithe.ly में, अपना **People** डेटा CSV या Excel फ़ाइल के रूप में export करें। अगर आप donation records लाना चाहते हैं, तो एक अलग **Giving** फ़ाइल भी export कर सकते हैं।
2. column नामों के आधार पर tool अपने-आप पता लगा लेगा कि फ़ाइल में people डेटा है या giving डेटा।
3. चरण 1 में **Tithe.ly CSV** विकल्प का उपयोग करके फ़ाइल अपलोड करें।

:::info
Tithe.ly exports एक समय में एक फ़ाइल करके इम्पोर्ट किए जा सकते हैं। अगर आपको people और giving records अलग-अलग इम्पोर्ट करने हैं, तो प्रक्रिया दो बार चलाएं।
:::

---

## CCB या Pushpay Export तैयार करना

1. Church Community Builder या Pushpay में, अपना **People** डेटा CSV फ़ाइल के रूप में export करें। आप एक अलग giving/contributions फ़ाइल भी export कर सकते हैं।
2. column नामों के आधार पर tool अपने-आप पता लगा लेगा कि फ़ाइल में people डेटा है या giving डेटा।
3. चरण 1 में **CCB / Pushpay CSV** विकल्प का उपयोग करके फ़ाइल अपलोड करें।

---

## इम्पोर्ट के बाद

transfer पूरा होने के बाद, अपने डेटा की पुष्टि करने के लिए कुछ मिनट लें:

1. [People](../people/adding-people.md) page ब्राउज़ करें और कुछ profiles की जांच करें।
2. पुष्टि करें कि नाम, emails, phone numbers, और addresses सही आए हैं।
3. जांचें कि household के संबंध बरकरार हैं। हर व्यक्ति की household role (Head, Spouse, Child, या Other) तब साथ आती है जब स्रोत में वह हो: B1 Import Zip में **householdRole** column, Breeze या Tithe.ly में **Family Role**, और CCB / Pushpay में **Family Position**। "Head of Household", "Primary", "Wife", या "Son" जैसी roles संबंधित B1 role में बदल दी जाती हैं। Planning Center और Custom CSV / Excel इम्पोर्ट में कोई role column नहीं होता, इसलिए उन लोगों को **Other** सेट किया जाता है; आप व्यक्ति की household से [People](../people/adding-people.md#managing-households) page पर role बदल सकते हैं।
4. इम्पोर्ट किए गए groups और giving records की समीक्षा करें।

अगर आपको कोई समस्या दिखे, तो People page से व्यक्तिगत profiles edit कर सकते हैं। आप transfer tool को फिर से चलाकर [अपना डेटा export](exporting-data.md) करके backup भी ले सकते हैं।
