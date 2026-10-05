---
title: "लोगों को खोजना"
---

# लोगों को खोजना

<div class="article-intro">

**People** पृष्ठ आपकी चर्च निर्देशिका को एक खोज योग्य, क्रमणीय तालिका में प्रदर्शित करता है। आप अपनी congregation में किसी को भी जल्दी से खोज सकते हैं, कस्टमाइज कर सकते हैं कि कौन सी जानकारी दिखाई दे, और अपने परिणामों को export कर सकते हैं। कुशल खोज दिन-प्रतिदिन के चर्च प्रशासन कार्यों के लिए आवश्यक है जैसे आगंतुकों का पालन करना, संपर्क सूचियां तैयार करना, और सदस्य रिकॉर्ड का प्रबंधन करना।

</div>

<div class="prereqs">
<h4>शुरुआत करने से पहले</h4>

- आपको लोगों को देखने की अनुमति के साथ एक सक्रिय B1 Admin खाता चाहिए। यदि आप अपने access level के बारे में सुनिश्चित नहीं हैं तो [Roles & Permissions](roles-permissions.md) देखें।
- आपकी चर्च निर्देशिका में लोग होने चाहिए। यदि आपने अभी तक किसी को नहीं जोड़ा है, तो [लोगों को जोड़ना](adding-people.md) या [डेटा import करना](importing-data.md) देखें।

</div>

## क्विक सर्च

People पृष्ठ के शीर्ष पर खोज बार आपको real time में सदस्यों को खोजने देता है:

1. People पृष्ठ के शीर्ष पर **search box** पर क्लिक करें।
2. किसी नाम, ईमेल, या अन्य keyword को टाइप करना शुरू करें।
3. जब आप type करते हैं तो परिणाम automatically filter होंगे (लगभग आधे सेकंड की देरी होती है ताकि खोज हर keystroke पर न चले)।
4. नीचे की तालिका केवल matching परिणाम दिखाने के लिए update होगी।

:::tip
आपको Enter दबाने की जरूरत नहीं है। खोज automatically उस समय चलती है जब आप typing बंद करते हैं।
:::

## परिणामों को क्रमबद्ध करना

आप तालिका में किसी भी column header पर क्लिक करके निर्देशिका को क्रमबद्ध कर सकते हैं:

1. एक **column header** पर क्लिक करें (उदाहरण के लिए, **Name** या **Email**) उस column के अनुसार क्रमबद्ध करने के लिए।
2. समान header पर दोबारा क्लिक करने से क्रमबद्ध order reverse होता है।

यह लोगों को alphabetically, आयु के आधार पर, या किसी अन्य दृश्यमान column के आधार पर खोजना आसान बनाता है।

## Columns को अनुकूलित करना

हर जानकारी को एक ही समय में दृश्यमान होने की जरूरत नहीं है। आप चुन सकते हैं कि तालिका में कौन से columns दिखाई दें:

1. तालिका के शीर्ष के पास **column selector dropdown** देखें।
2. columns को show या hide करने के लिए उन्हें check या uncheck करें। उपलब्ध columns में शामिल हैं:
   - **Photo**
   - **Name**
   - **Email**
   - **Phone**
   - **Address**
   - **Birth Date**
   - **Age**
   - **Gender**
   - **Membership Status**
   - **Campus**
3. तालिका तुरंत आपकी selections को reflect करने के लिए update होगी।

### Custom Fields को Columns के रूप में दिखाना

column chooser के दो tabs हैं: **Standard** ऊपर listed built-in columns को रखता है, और **Custom** आपके चर्च के [Custom Fields](../settings/custom-fields.md) को साथ ही किसी भी People forms के प्रश्नों को रखता है। **Custom** tab पर एक custom field को check करने से इसे एक column के रूप में जोड़ा जाता है, और हर व्यक्ति का उस field के लिए value तालिका में दिखाई देता है। Values को उसी तरह दिखाया जाता है जैसे व्यक्ति के profile पर दिखाया जाता है -- Yes/No fields *Yes* या *No* को पढ़ते हैं, Multiple Choice fields विकल्प के label को दिखाते हैं, और dates short dates के रूप में दिखाई देते हैं। जिन लोगों के पास field के लिए कोई value नहीं है वे एक blank cell दिखाते हैं।

:::info
आपकी column choices उस समय को प्रभावित करता है जब आप CSV को export करते हैं। आप जिस exact data की जरूरत है उसे प्राप्त करने के लिए export करने से पहले columns को customize करें।
:::

## Pagination

जब आपकी निर्देशिका के पास कई records हैं, तो परिणाम pages के पार split किए जाते हैं। तालिका के नीचे **pagination controls** का उपयोग करके pages के बीच move करें। current page और total record count display किया जाता है इसलिए आप हमेशा जानते हैं कि आप सूची में कहां हैं।

:::tip
यदि आप एक बार में अधिक परिणाम देखना चाहते हैं, तो एक बड़ी निर्देशिका के माध्यम से paging करने के बजाय अपनी खोज को refine करें list को narrow down करने के लिए।
:::

## सर्च परिणामों को Export करना

आप किसी भी समय अपने वर्तमान search परिणामों को CSV file के रूप में download कर सकते हैं:

1. कोई भी search या filters apply करें जो आप चाहते हैं।
2. अपने columns को उस डेटा को include करने के लिए customize करें जिसकी आपको जरूरत है।
3. **Export** बटन पर क्लिक करें।
4. एक CSV file आपके computer को download होगी, Excel, Google Sheets, या किसी भी spreadsheet application में खोलने के लिए तैयार।

Exporting पर अधिक details के लिए, [डेटा export करना](./exporting-data.md) देखें।

:::tip
अधिक advanced queries के लिए -- जैसे कि सभी को खोजना जिन्होंने पिछले तीन महीनों में attendance नहीं की है -- [AI Search](./ai-search.md) feature को आजमाएं, जो आपको plain language questions का उपयोग करके खोज करने देता है।
:::

## Advanced Search

Advanced Search आपको conditions को combine करके precise filters बनाने देता है। People page से इसे खोलें, फिर एक category को expand करें और उन fields को check करें जिन्हें आप filter करना चाहते हैं, प्रत्येक के लिए एक operator और value चुनते हुए। Categories में शामिल हैं **Names**, **Demographics**, **Contact**, **Membership**, **Activity** (donations और attendance), और **Custom Fields**।

**Custom Fields** category आपके चर्च के [Custom Fields](../settings/custom-fields.md) को list करता है — वह fields जिन्हें आप अपनी जानकारी track करने के लिए Settings में define करते हैं (जैसे एक background-check expiration date)। offered operators हर field के type से match करते हैं: text fields *contains / equals / starts with / ends with* को support करते हैं, number fields comparison operators को support करते हैं, date fields *equals / after / before* को support करते हैं, और Yes/No और Multiple Choice fields आपको एक value pick करने देते हैं। कोई भी field जिसे आप यहाँ filter कर सकते हैं उसे एक live [List](./lists.md) के रूप में saved किया जा सकता है।

## Searches को Lists के रूप में सेव करना

एक search चलाने के बाद, एक **Save as List** बटन (bookmark icon) People page header में दिखाई देता है। इसे अपनी current query को एक नाम और optional category के तहत store करने के लिए क्लिक करें, इसलिए आप भविष्य के sessions में इसे instantly reload कर सकते हैं। पूर्ण details के लिए [Saved Lists](./lists.md) देखें।
