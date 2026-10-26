---
title: "दान दर्ज करना"
---

# दान दर्ज करना

<div class="article-intro">

B1 Admin में दान दर्ज करना Batches सिस्टम के ज़रिए होता है। आप किसी संग्रह (जैसे रविवार का चढ़ावा) को दर्शाने के लिए एक batch बनाते हैं, फिर उस batch में अलग-अलग donations जोड़ते हैं। इससे आपके giving records व्यवस्थित रहते हैं और उनका मिलान (reconcile) करना आसान होता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपने [funds](funds.md) सेट करें ताकि आप donations को सही श्रेणियों में असाइन कर सकें
- वे donations रखने के लिए एक [batch](batches.md) बनाएं जिन्हें आप अभी दर्ज करने वाले हैं
- सुनिश्चित करें कि donors आपकी [people directory](../people/adding-people.md) में हों, ताकि गिफ़्ट दर्ज करते समय आप उन्हें खोज सकें
- batch में गिफ़्ट दर्ज करने के लिए आपको **Edit Donations**, या **Enter Donations** के साथ **View Donations** की ज़रूरत है (देखें [Who Can Change a Batch](batches.md#who-can-change-a-batch))

</div>

## Batch बनाना और Donations जोड़ना

1. **B1 Admin** में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (ऊपर-बाईं ओर का search bar), **Donations** को expand करें, और **Batches** पर click करें।
2. पेज के ऊपर **Add Batch** पर click करें।
3. batch का नाम लिखें (जैसे "Sunday Offering - Jan 5") और तारीख चुनें। **Save** पर click करें।
4. आपका नया batch सूची में दिखेगा, जिसमें zero donations और $0.00 लिखा होगा।
5. उसे खोलने के लिए **batch name** पर click करें।

## अलग-अलग Donations दर्ज करना

1. batch के विवरण पेज पर, donations की सूची के बगल में donation entry panel दिखता है। **Select Person or Anonymous** के नीचे, किसी donor को खोजने के लिए search field में उसका नाम लिखें, या **Anonymous** पर click करें। (पेज के ऊपर **Add Donation** पर click करने से आप इसी panel पर पहुंच जाते हैं।)
2. किसी व्यक्ति को चुनने के बाद entry form में **Date**, **Method** (Check, Cash, Card, या In-Kind), **Fund**, **Notes**, **Amount**, और **Check #** (कार्ड गिफ़्ट के लिए **Last 4 digits**, या in-kind गिफ़्ट का वर्णन करने के लिए **Item**) के fields दिखते हैं। किसी और व्यक्ति को चुनने के लिए donor के नाम के बगल में **Change** पर click करें।
3. विवरण भरें और **Add Donation** पर click करें (या Enter दबाएं)।
4. donation donations की सूची में जुड़ जाता है, और form रीसेट हो जाता है ताकि आप अगला दर्ज कर सकें।

:::info
अगर batch को [बंद](batches.md#closing-and-reopening-a-batch) कर दिया गया है, तो जिनके पास **Edit Donations** नहीं है, उनके लिए entry panel और **Edit** links छिप जाते हैं, और batch के ऊपर एक सूचना दिखती है कि वह बंद है। इसे दोबारा खोलने के लिए **Edit Donations** वाले किसी व्यक्ति से कहें।
:::

:::tip
आप batch पेज छोड़े बिना एक के बाद एक कई donations जल्दी दर्ज कर सकते हैं। हर entry के बाद form रीसेट हो जाता है, जिससे चेक या लिफ़ाफ़ों के ढेर से काम करना कुशल रहता है।
:::

## CSV फ़ाइल से Donations आयात करना {#importing-donations-from-a-csv-file}

अगर आपके donations पहले से किसी spreadsheet में हैं -- जैसे किसी दूसरे giving system का export या गिनती करने वाली टीम की tally sheet -- तो हर donation को हाथ से टाइप करने के बजाय आप उन्हें batch में आयात कर सकते हैं।

1. batch खोलें और पेज के ऊपर **Import CSV** पर click करें। (यह बटन तब दिखता है जब आप batch बदल सकते हैं और आपके church में कम से कम एक [fund](funds.md) है।)
2. **Choose CSV File** पर click करें और अपनी फ़ाइल चुनें। फ़ाइल में एक header row होनी चाहिए, और columns किसी भी क्रम में हो सकते हैं:
   - **Amount** (ज़रूरी; `Total` भी चलता है) -- मुद्रा के चिह्न और commas अनदेखे किए जाते हैं, इसलिए `$1,250.00` ठीक है। राशि शून्य से अधिक होनी चाहिए।
   - **Date** -- `2026-10-25` या `10/25/2026` जैसा format उपयोग करें। अगर यह खाली है, तो batch की तारीख ली जाती है।
   - **Fund** -- fund का नाम, जो capitalization पर ध्यान दिए बिना मिलाया जाता है। अगर यह खाली है, तो आपका पहला fund लिया जाता है।
   - **Method** -- **Check**, **Cash**, **Card**, या **In-Kind**। अगर यह खाली है, तो **Check** लिया जाता है।
   - **Check Number** -- चेक नंबर (या भुगतान का कोई अन्य विवरण)।
   - **Notes**
   - **Email**, **Name**, या **First Name** और **Last Name** -- donor को आपके database के किसी व्यक्ति से मिलाने के लिए उपयोग होते हैं। "Smith, John" जैसा नाम "John Smith" पढ़ा जाता है।
3. preview की समीक्षा करें। हर row में उसकी line number, फ़ाइल से donor का नाम, **Match**, fund, और राशि दिखती है:
   - किसी व्यक्ति का नाम दिखने का मतलब है कि donor मिल गया। B1 पहले email से, फिर सटीक नाम से मिलाता है, और तभी जब ठीक एक ही व्यक्ति मेल खाए।
   - **Not found — anonymous** का मतलब है कि कोई एक मेल नहीं मिला। गिफ़्ट anonymous के रूप में आयात होता है, और उसके notes में "Imported as:" के साथ donor का नाम जोड़ा जाता है ताकि आप उसे बाद में असाइन कर सकें।
   - **Invalid amount**, **Unknown fund**, **Unknown method**, या **Invalid date** जैसा लाल संदेश बताता है कि वह row छोड़ दी जाएगी। फ़ाइल सुधारें और उसे दोबारा चुनें ताकि वह शामिल हो सके।
4. **Import** पर click करें (बटन पर लिखा होता है कि कितनी rows आयात होंगी)। donations batch में जुड़ जाते हैं।

:::tip
आयात के बाद, किसी भी anonymous donation पर **Edit** का उपयोग करके सही व्यक्ति चुनें। "Imported as:" वाला note बताता है कि फ़ाइल के अनुसार वह किसका था।
:::

## किसी व्यक्ति के रिकॉर्ड से गिफ़्ट दर्ज करना

batch खोले बिना एक ही गिफ़्ट दर्ज करने के लिए, **People** में donor का रिकॉर्ड खोलें और **Log a gift** पर click करें (giving summary में, या व्यक्ति के giving view पर)।

1. **Date** और **Amount** सेट करें।
2. **Fund** और **Method** (Check, Cash, Card, या In-Kind) चुनें, और ज़रूरत हो तो **Check #**, **Last 4 digits**, या **Item** (in-kind गिफ़्ट के लिए) भरें।
3. चाहें तो **Notes** जोड़ें, फिर **Save** पर click करें।

गिफ़्ट उस तारीख के batch में सेव हो जाता है। अगर उस तारीख का अभी कोई batch नहीं है, तो आपके लिए एक नया batch बनता है, जिसका नाम तारीख पर रखा जाता है।

## एक Donation को कई Funds में बांटना

कभी-कभी कोई donor एक ही transaction में एक से अधिक fund में दान देता है। इसे संभालने के लिए:

1. entry panel के नीचे **full donation editor** link पर click करें (या किसी मौजूदा donation row पर **Edit** पर click करें)।
2. full editor में, अलग-अलग funds में राशियां जोड़ें। कुल राशि अपने-आप अलग-अलग fund की राशियों से गणना हो जाती है।
3. donation अपडेट करने के लिए **Save** पर click करें।

:::info
किसी donor के एक ही चेक को कई उद्देश्यों के लिए चिह्नित करने पर donations को funds में बांटना आम है, जैसे General Fund और Missions।
:::

## Donations संपादित या हटाना

donation को संपादित करने के लिए, batch में उसकी row पर **Edit** बटन पर click करें। आप तारीख, राशि, fund, भुगतान का तरीका (Check, Cash, Card, या In-Kind), या कोई अन्य विवरण बदल सकते हैं। in-kind गिफ़्ट के लिए, editor विवरण वाले field को **Item** लेबल देता है ताकि आप बता सकें कि क्या दिया गया। पूरा होने पर **Save** पर click करें।

:::tip
पेज के ऊपर batch के नाम के नीचे की पंक्ति entries जोड़ने या बदलने पर अपने-आप अपडेट होती है, और batch की तारीख, गिफ़्ट की संख्या और कुल राशि दिखाती है। इसका उपयोग अपनी deposit slip से मिलान करने के लिए करें।
:::

## Donation की Refund करना

अगर किसी donor से गलती से पैसे लिए गए हैं या वह अपनी राशि वापस मांगता है, तो आप पूरी हो चुकी donation को सीधे उसकी edit screen से refund कर सकते हैं -- अपने payment gateway के dashboard पर जाने की ज़रूरत नहीं।

1. donation खोलें और **Edit** पर click करें।
2. form के नीचे Delete के बगल में **Refund** बटन पर click करें।
3. dialog की पुष्टि करें: "Refund this donation in full through the payment gateway? This cannot be undone."

donation मूल payment gateway के ज़रिए पूरी तरह refund हो जाती है और आपकी donation सूचियों में **Refunded** चिह्नित हो जाती है।

:::warning
Refunds केवल पूरे refund होते हैं -- B1 Admin से आंशिक राशि refund करने का कोई तरीका नहीं है। पुष्टि होने के बाद refund को भी वापस नहीं लिया जा सकता।
:::

:::info
**Refund** बटन केवल उन donations के लिए दिखता है जो ऑनलाइन भुगतान किए गए थे (जिनका gateway transaction है) और जो अभी भी **Complete** status में हैं। हाथ से दर्ज किए गए donations (cash, check) के पास refund करने के लिए gateway transaction नहीं होता -- उन्हें संपादित या हटाएं।
:::

## आगे के कदम

- [Donation Reports](donation-reports.md) का उपयोग करके अपनी entries की समीक्षा करें और सटीकता जांचें
- साल के अंत में अपने donors के लिए [Giving Statements](giving-statements.md) बनाएं
