---
title: "सहेजी गई Lists"
description: "B1 Admin में People खोज को नाम वाली list के रूप में सहेजें, फिर उसे एक क्लिक में दोबारा लोड करें। Lists जीवंत रहती हैं, इसलिए नए मेल खाने वाले सदस्य अपने-आप दिखते हैं।"
---

# सहेजी गई Lists

<div class="article-intro">

**Saved Lists** आपको एक खोज क्वेरी को एक नाम के तहत संग्रहीत करने देती हैं और उसे किसी भी समय एक क्लिक में फिर से चलाने देती हैं। एक बार list बनाएँ — "Active Members in Campus North," "Visitors in the last 90 days," या कोई भी उन्नत फ़िल्टर — और वह People पेज के सबसे ऊपर रहती है ताकि आपको क्वेरी दोबारा कभी न बनानी पड़े।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- सहेजने के लिए परिणाम हों, इसलिए People सेक्शन में कम से कम एक खोज चलाएँ। देखें [Searching People](./searching-people.md) या [AI Search](./ai-search.md)।
- Lists सहेजने, बदलने, और हटाने के लिए **Edit People** अनुमति चाहिए। देखें [Assigning Roles](./roles-permissions.md)।

</div>

## खोज को List के रूप में सहेजना {#saving-a-search-as-a-list}

1. **People** पेज पर एक खोज चलाएँ — त्वरित खोज, AI खोज, या उन्नत फ़िल्टर खोज।
2. जब खोज कम से कम एक व्यक्ति ढूँढती है, तो People पेज हेडर में एक **Save as List** बटन दिखता है।
3. **Save as List** पर क्लिक करें।
4. **List Name** दर्ज करें (आवश्यक)।
5. वैकल्पिक रूप से संबंधित lists को एक साथ समूहित करने के लिए **Category** दर्ज करें (जैसे "Outreach" या "Membership")।
6. **Who can see this list** के अंतर्गत **All staff** या **Only me** चुनें।
7. **Match** के अंतर्गत **All filters** (लोगों को हर फ़िल्टर से मेल खाना चाहिए) या **Any filter** (जो लोग कम से कम एक फ़िल्टर से मेल खाते हैं) चुनें।
8. **Include household** के अंतर्गत **Matches only**, **Children of matches** (हर मेल खाने वाले व्यक्ति के household के बच्चों को भी जोड़ता है), या **Entire household** (हर मेल खाने वाले व्यक्ति के household के सभी लोगों को जोड़ता है) चुनें।
9. वैकल्पिक रूप से **Refresh nightly** चेक करें (नीचे [Nightly Refresh](#nightly-refresh) देखें)। जब यह चेक हो, तो आप **Email me when membership changes** भी चेक कर सकते हैं।
10. **Save** पर क्लिक करें।

list अब सहेजी गई है और People पेज के ऊपर सहेजी गई lists की पंक्ति में **Everyone** के बगल में एक बटन के रूप में दिखती है। **Only me** चिह्नित lists पर एक छोटा lock आइकन दिखता है।

:::info
**All staff** पर सेट lists पूरे चर्च में साझा होती हैं — People पहुँच वाला कोई भी उन्हें देख और लोड कर सकता है। केवल उचित अनुमति वाले staff ही lists बदल या हटा सकते हैं।
:::

## सहेजी गई List लोड करना {#loading-a-saved-list}

People पेज के ऊपर किसी भी list के नाम पर क्लिक करें। खोज संग्रहीत क्वेरी के साथ तुरंत फिर से चलती है और परिणाम अपडेट करती है। पूरी directory पर वापस जाने के लिए **Everyone** पर क्लिक करें।

Lists श्रेणी के अनुसार समूहित होती हैं (यदि आपने कोई श्रेणी सौंपी हो), जिनमें बिना श्रेणी वाली lists अंत में आती हैं।

:::tip
Lists **जीवंत क्वेरी** हैं, स्नैपशॉट नहीं। हर बार जब आप कोई list लोड करते हैं, तो खोज आपके वर्तमान डेटा पर नए सिरे से चलती है, इसलिए जो नए लोग अब मानदंड से मेल खाते हैं, वे दिखेंगे।
:::

## List का नाम बदलना और हटाना {#renaming-and-deleting-lists}

प्रबंधन अनुमति वाला staff People पेज से किसी भी list का नाम बदल सकता है या उसे हटा सकता है। पहले list पर क्लिक करके उसे लोड करें — फिर उसके नाम के बगल में दो आइकन दिखते हैं:

- नाम बदलने या उसकी श्रेणी और साझाकरण बदलने के लिए **List Settings** (गियर) आइकन पर क्लिक करें। इन विकल्पों के साथ सहेजी गई lists यहाँ **Include household**, **Refresh nightly**, और **Email me when membership changes** भी बदल सकती हैं। list सहेजने के बाद **Match** सेटिंग नहीं बदली जा सकती।
- उसे हटाने के लिए **Delete** (ट्रैश) आइकन पर क्लिक करें (आपसे पुष्टि माँगी जाएगी)।

## Nightly Refresh {#nightly-refresh}

list लोड करने पर उसकी खोज हमेशा नए सिरे से चलती है, चाहे **Refresh nightly** चेक हो या नहीं। **Refresh nightly** B1 को हर रात list फिर से चलाने और यह ट्रैक करने के लिए भी कहता है कि कौन उसमें जुड़ा या निकला। अगर आपने **Email me when membership changes** चेक किया है, तो nightly refresh के बाद, जिसमें किसी को जोड़ा या हटाया गया, B1 आपको (list सहेजने वाले व्यक्ति को) ईमेल भेजता है, जिसमें बताया जाता है कि कितने लोग जुड़े और कितने हटे। nightly refresh list सदस्यता बदलावों को आपके [integrations](../integrations/index.md) को भी भेजता है, जैसे Mailchimp tags।

## उपयोग के मामले {#use-cases}

| स्थिति | list कैसे बनाएँ |
|---|---|
| सभी visitors | उन्नत खोज: Membership Status = Visitor |
| किसी विशिष्ट campus के सदस्य | उन्नत खोज: Campus = [आपका campus] |
| जिन volunteers की background check की अवधि समाप्त हो गई | उन्नत खोज: [Custom Field](../settings/custom-fields.md) "Background check expires" आज से पहले है |
| AI प्रश्न के परिणाम | AI Search में एक प्रश्न पूछें, फिर सहेजें |

## संबंधित लेख {#related-articles}

- [Searching People](./searching-people.md) — त्वरित खोज और कॉलम अनुकूलन
- [AI Search](./ai-search.md) — प्राकृतिक भाषा क्वेरी जिन्हें आप lists के रूप में सहेज सकते हैं
- [Custom Fields](../settings/custom-fields.md) — अपने स्वयं के व्यक्ति फ़ील्ड परिभाषित करें, फिर उन पर फ़िल्टर करें और lists सहेजें
- [Demographics](./demographics.md) — किसी जनसांख्यिकीय चार्ट को People फ़िल्टर में ले जाएँ, फिर उसे list के रूप में सहेजें
- [Bulk Editing](./bulk-editing.md) — list लोड करने के बाद, उसके सभी सदस्यों को एक साथ थोक में अपडेट करें
