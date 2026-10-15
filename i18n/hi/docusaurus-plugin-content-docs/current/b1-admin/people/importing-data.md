---
title: "डेटा Import करना"
---

# डेटा Import करना

<div class="article-intro">

B1 Transfer tool आपके मौजूदा डेटा को B1 में लाना आसान बनाता है, चाहे आप किसी spreadsheet से नई शुरुआत कर रहे हों, किसी अन्य church management platform से migrate कर रहे हों, या giving records import कर रहे हों। इसका उपयोग किसी भी समय अपने डेटा को export या backup करने के लिए भी किया जा सकता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको **Settings** तक पहुंच वाला एक सक्रिय B1 Admin account चाहिए।
- शुरू करने से पहले अपने पिछले system से डेटा export करके तैयार रखें।
- यह tool प्रारंभिक डेटा migration के लिए है। यदि आप B1 का उपयोग कुछ समय से कर रहे हैं, तो दोबारा import करने से duplicate records बन सकते हैं।

</div>

## Transfer Tool तक पहुंचना

1. **B1 Admin** में login करें।
2. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ऊपर-बाईं ओर का search bar) खोलें, **Settings** को expand करें, और **Settings** पर click करें।
3. settings menu के बाईं ओर के शीर्ष पर, अपने church के नाम के नीचे **Import/Export** link पर click करें।
4. यह [transfer.b1.church](https://transfer.b1.church) पर एक नए tab में **B1 Transfer** tool खोलेगा।

transfer tool आपको चार steps में ले जाता है: Source, Preview, Destination, और Run।

---

## Step 1 - अपना Source चुनें

चुनें कि आपका डेटा कहां से आ रहा है। सात विकल्प हैं:

- **B1 Database** — सीधे आपके मौजूदा B1 church से डेटा खींचता है। backup बनाने या अपने डेटा को किसी अन्य format में बदलने के लिए उपयोगी। इस विकल्प का उपयोग करने के लिए आपको logged in होना चाहिए।
- **B1 Import Zip** — B1 के अपने format की एक zip file। यह मुख्य रूप से पिछला B1 export वापस लाने के लिए उपयोग होता है। B1 Export Zip को **B1 Database** में वापस लोड करने से export में मौजूद सब कुछ वापस आ जाता है (देखें [Exporting Data](./exporting-data.md#full-data-export-from-settings))। यदि file पढ़ी नहीं जा सकती, तो tool शुरू से शुरू करने के बजाय error दिखाता है।
- **Breeze Import Zip** — Breeze ChMS से export की गई files वाली एक zip file।
- **Planning Center Zip** — Planning Center से export की गई zip या CSV file।
- **Custom CSV / Excel** — लोगों का डेटा रखने वाली कोई भी CSV या Excel file। upload करने के बाद, import आगे बढ़ने से पहले आप अपने columns को B1 fields से map करेंगे।
- **Tithe.ly CSV** — Tithe.ly से people या giving export file (CSV या Excel format स्वीकार्य)।
- **CCB / Pushpay CSV** — Church Community Builder या Pushpay से people या giving export CSV।

अपनी file को upload area पर drag और drop कर सकते हैं, या उसे ब्राउज़ करने के लिए click कर सकते हैं।

---

## Step 1b - अपने Fields Map करें (केवल Custom CSV / Excel)

यदि आपने **Custom CSV / Excel** चुना है, तो file upload करने के बाद, preview पर जाने से पहले tool एक field mapping screen दिखाएगा।

आपकी file का हर column एक नमूना value के साथ सूचीबद्ध होता है। हर column के लिए, मेल खाने वाला B1 field चुनने के लिए dropdown का उपयोग करें। tool "First Name," "Email," या "Zip Code" जैसे सामान्य column नामों को अपने-आप पहचानने की कोशिश करेगा, लेकिन आपको हर row की जांच करनी चाहिए और जो छूट गया हो उसे ठीक करना चाहिए।

उपलब्ध B1 fields में शामिल हैं:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — नाम से व्यक्ति को एक group में assign करता है
- **Custom Field (match by name)** — column को आपके church के [custom person fields](../settings/custom-fields.md) में से किसी एक में सहेजता है। एक **B1 field name** box दिखता है, जिसमें column header भरा होता है। इसे field के नाम से बदलें, बिल्कुल वैसे जैसे वह B1 में दिखता है (capitalization मायने नहीं रखता)।
- **Form Answer (custom field)** — उस column की value को व्यक्ति के record से जुड़े custom field के रूप में सहेजता है। यदि आप इस विकल्प का उपयोग करते हैं, तो आपसे form को एक नाम देने के लिए कहा जाएगा।

तारीखें `9/17/1994` जैसे सामान्य formats में हो सकती हैं और अपने-आप बदल दी जाती हैं। custom fields के लिए, Yes/No fields Yes, No, Y, N, True, False, 1, और 0 जैसे values स्वीकार करते हैं, और multiple-choice fields choice का text या उसकी value, दोनों में से कोई भी स्वीकार करते हैं।

:::info
Import से पहले B1 Admin में अपने custom person fields बनाएं। import पूरा होने पर, **Custom Fields** step उन column नामों को सूचीबद्ध करता है जो किसी B1 field से मेल नहीं खाते, और उन values की गिनती करता है जो field के प्रकार में फिट नहीं होतीं। वे values छोड़ दी जाती हैं, और बाकी import फिर भी पूरा हो जाता है।
:::

जो columns आप import नहीं करना चाहते, उन्हें **(Skip)** पर सेट किया जा सकता है। आगे बढ़ने से पहले कम से कम एक name field (First Name या Last Name) map होना आवश्यक है।

preview पर जाने के लिए **Confirm Mapping & Import** पर click करें।

---

## Step 2 - अपने डेटा का Preview देखें

upload के बाद, tool import होने वाली हर चीज़ का preview दिखाता है। हर डेटा प्रकार की जांच के लिए tabs का उपयोग करें:

- **People** — household के अनुसार सूचीबद्ध, शामिल होने पर photos के साथ।
- **Groups** — campus, service, समय, और category के अनुसार व्यवस्थित।
- **Attendance** — session की तारीखें, groups, और visit counts।
- **Donations** — batches, funds, donors, और राशियां।
- **Forms** — form के नाम और content types।

आगे बढ़ने से पहले इसे ध्यान से देखें। यदि कुछ गलत लगे, तो **Start Over** पर click करें और अपनी source file सुधारें।

---

## Step 3 - अपना Destination चुनें

चुनें कि डेटा कहां जाना चाहिए:

- **B1 Database** — सीधे आपके church के B1 database में import करता है। इसे चुनने के बाद, tool जोड़े जाने वाले records की अंतिम गिनती दिखाएगा। पुष्टि के लिए **Start Transfer** पर click करें।
- **B1 Export Zip** — आपके डेटा को B1-format zip file के रूप में download करता है, जिसे बाद में **B1 Import Zip** से वापस लाया जा सकता है। backup के लिए अच्छा।
- **Breeze Export Zip** — आपके डेटा को Breeze format में बदलता है।
- **Planning Center Zip** — आपके डेटा को Planning Center format में बदलता है।

:::warning
source और destination एक ही format के नहीं हो सकते। यदि वे मेल खाते हैं, तो गलती से duplication रोकने के लिए tool आपको चेतावनी देगा।
:::

---

## Step 4 - Run

tool transfer प्रक्रिया करता है और हर step की प्रगति दिखाता है:

- Campuses, Services, और Times
- People
- Photos
- Groups और Group Members
- Donations
- Attendance
- Forms, Questions, Answers, और Form Submissions
- Custom Fields (जब आपने कोई Custom Field columns map किए हों)
- Compressing (केवल zip file destinations के लिए)

जब destination **B1 Database** होता है, तो progress card का शीर्षक **Import Progress** होता है और वह **Import Complete!** (या **Import Completed with Errors**) पर समाप्त होता है। zip file destinations के लिए, वही messages **Export** शब्द का उपयोग करते हैं।

:::warning
transfer चलने के दौरान अपना browser बंद न करें। सभी steps पूरे दिखने तक प्रतीक्षा करें।
:::

---

## Breeze Import Zip तैयार करना

1. Breeze में, **Settings** पर जाएं और बाईं sidebar में **Export** पर click करें।
2. तीन अलग files export करें: **People**, **Tags**, और **Contributions**।
3. तीनों files चुनें, right-click करें, और उन्हें एक ही zip file में compress करें।
   - Mac पर: files चुनें, right-click करें, और **Compress** चुनें।
   - PC पर: files चुनें, right-click करें, **Send to** चुनें, फिर **Compressed (zipped) folder**।
4. Step 1 में **Breeze Import Zip** विकल्प का उपयोग करके zip file upload करें।

Breeze import अपने-आप people, groups (tags), और donation records transfer करता है।

---

## Planning Center Export तैयार करना

1. Planning Center में login करें और **People** product खोलें।
2. बाईं sidebar में **Lists** पर click करें और एक list बनाएं जिसमें वे सभी लोग हों जिन्हें आप लाना चाहते हैं। (यदि आपके पास पूरी congregation की list पहले से है, तो उसी का उपयोग करें।)
3. list खोलें और उसके **export** विकल्प से अपने लोगों को **CSV** file के रूप में download करें। वे fields शामिल करें जिन्हें आप रखना चाहते हैं -- name, email, phone, address, birthdate, gender, और membership status सभी B1 में map हो जाते हैं।
4. यदि Planning Center एक से अधिक files देता है, तो उन सभी को चुनें, right-click करें, और एक ही zip में compress करें।
   - Mac पर: files चुनें, right-click करें, और **Compress** चुनें।
   - PC पर: files चुनें, right-click करें, **Send to** चुनें, फिर **Compressed (zipped) folder**।
5. Step 1 में **Planning Center Zip** विकल्प का उपयोग करके CSV या zip upload करें।

upload के बाद, preview पर जारी रखें और import चलाने से पहले पुष्टि करें कि आपके लोग और households सही दिख रहे हैं।

---

## Tithe.ly Export तैयार करना

1. Tithe.ly में, अपना **People** डेटा CSV या Excel file के रूप में export करें। यदि आप donation records लाना चाहते हैं, तो एक अलग **Giving** file भी export कर सकते हैं।
2. tool column नामों के आधार पर अपने-आप पता लगाएगा कि file में people का डेटा है या giving का।
3. Step 1 में **Tithe.ly CSV** विकल्प का उपयोग करके file upload करें।

:::info
Tithe.ly exports एक समय में एक file करके import किए जा सकते हैं। यदि आपको people और giving records अलग-अलग import करने हैं, तो प्रक्रिया दो बार चलाएं।
:::

---

## CCB या Pushpay Export तैयार करना

1. Church Community Builder या Pushpay में, अपना **People** डेटा CSV file के रूप में export करें। आप एक अलग giving/contributions file भी export कर सकते हैं।
2. tool column नामों के आधार पर अपने-आप पता लगाएगा कि file में people का डेटा है या giving का।
3. Step 1 में **CCB / Pushpay CSV** विकल्प का उपयोग करके file upload करें।

---

## Import के बाद

transfer पूरा होने के बाद, अपने डेटा की जांच करने के लिए कुछ मिनट लें:

1. [People](../people/adding-people.md) page ब्राउज़ करें और कुछ profiles की जांच करें।
2. पुष्टि करें कि नाम, emails, phone numbers, और addresses सही आए हैं।
3. जांचें कि household connections सुरक्षित हैं। हर व्यक्ति की household role (Head, Spouse, Child, या Other) तब साथ लाई जाती है जब source में वह होती है: B1 Import Zip में **householdRole** column, Breeze या Tithe.ly में **Family Role**, और CCB / Pushpay में **Family Position**। "Head of Household", "Primary", "Wife", या "Son" जैसी roles संबंधित B1 role में बदल दी जाती हैं। Planning Center और Custom CSV / Excel imports में कोई role column नहीं होता, इसलिए उन लोगों को **Other** पर सेट किया जाता है; आप व्यक्ति के household से, [People](../people/adding-people.md#managing-households) page पर role बदल सकते हैं।
4. import हुए groups और giving records की समीक्षा करें।

यदि आपको कोई समस्या दिखे, तो People page से व्यक्तिगत profiles edit कर सकते हैं। आप backup के रूप में [अपना डेटा export](exporting-data.md) करने के लिए transfer tool फिर से भी चला सकते हैं।
