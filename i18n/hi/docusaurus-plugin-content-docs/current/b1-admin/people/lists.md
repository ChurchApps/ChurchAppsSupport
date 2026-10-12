---
title: "सहेजी गई सूचियाँ"
---

# सहेजी गई सूचियाँ {#saved-lists}

<div class="article-intro">

**Saved Lists** आपको किसी search query को एक नाम के तहत सहेजने और उसे किसी भी समय एक क्लिक में फिर से चलाने देती हैं। एक बार सूची बनाएँ — "Active Members in Campus North," "पिछले 90 दिनों के Visitors," या कोई भी advanced filter — और वह People पेज के सबसे ऊपर बनी रहती है, ताकि आपको query दोबारा बनानी न पड़े।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- सहेजने के लिए परिणाम पाने हेतु People सेक्शन में कम से कम एक search चलाएँ। देखें [Searching People](./searching-people.md) या [AI Search](./ai-search.md)।

</div>

## Search को सूची के रूप में सहेजना {#saving-a-search-as-a-list}

1. **People** पेज पर एक search चलाएँ — quick search, AI search, या advanced filter search।
2. जब परिणाम दिखें, तो People पेज के हेडर में **Save as List** बटन दिखता है।
3. **Save as List** पर क्लिक करें।
4. **List Name** दर्ज करें (अनिवार्य)।
5. वैकल्पिक रूप से, संबंधित सूचियों को एक साथ समूहित करने के लिए **Category** दर्ज करें (उदाहरण के लिए, "Outreach" या "Membership")।
6. **Who can see this list** के तहत **All staff** या **Only me** चुनें।
7. **Save** पर क्लिक करें।

सूची अब सहेजी जा चुकी है और People पेज के ऊपर, **Everyone** के बगल में सहेजी गई सूचियों की पंक्ति में एक बटन के रूप में दिखती है। **Only me** वाली सूचियों पर एक छोटा lock icon दिखता है।

:::info
**All staff** पर सेट सूचियाँ पूरे चर्च में साझा होती हैं — People की पहुँच वाला कोई भी स्टाफ सदस्य उन्हें देख और लोड कर सकता है। केवल उचित permission वाले स्टाफ ही सूचियों को बदल या हटा सकते हैं।
:::

## सहेजी गई सूची लोड करना {#loading-a-saved-list}

People पेज के ऊपर, किसी भी सूची के नाम पर क्लिक करें। Search सहेजी गई query के साथ तुरंत फिर से चलेगा और परिणाम अपडेट करेगा। अपनी पूरी directory पर वापस जाने के लिए **Everyone** पर क्लिक करें।

सूचियाँ श्रेणी के अनुसार समूहित होती हैं (यदि आपने कोई श्रेणी दी हो), और बिना श्रेणी वाली सूचियाँ सबसे अंत में दिखती हैं।

:::tip
सूचियाँ **लाइव queries** होती हैं, snapshots नहीं। हर बार जब आप कोई सूची लोड करते हैं, search आपके वर्तमान डेटा पर नए सिरे से चलता है, इसलिए जो नए लोग अब मानदंड पर खरे उतरते हैं, वे दिखाई देंगे।
:::

## सूचियों का नाम बदलना और हटाना {#renaming-and-deleting-lists}

Manage permission वाले स्टाफ People पेज से किसी भी सूची का नाम बदल सकते हैं या उसे हटा सकते हैं। पहले सूची पर क्लिक करके उसे लोड करें — फिर उसके नाम के बगल में दो icons दिखेंगे:

- उसका नाम या श्रेणी, साझाकरण और अन्य सेटिंग्स बदलने के लिए **List Settings** (gear) icon पर क्लिक करें।
- उसे हटाने के लिए **Delete** (trash) icon पर क्लिक करें (आपसे पुष्टि माँगी जाएगी)।

## उपयोग के मामले {#use-cases}

| परिदृश्य | सूची कैसे बनाएँ |
|---|---|
| सभी visitors | Advanced search: Membership Status = Visitor |
| किसी विशेष campus के members | Advanced search: Campus = [आपका campus] |
| बिना email पते वाले लोग | Advanced search: Email is empty |
| जिन volunteers की background check की अवधि समाप्त हो गई है | Advanced search: [Custom Field](../settings/custom-fields.md) "Background check expires" is before today |
| AI प्रश्न के परिणाम | AI Search में कोई प्रश्न पूछें, फिर सहेजें |

## संबंधित लेख {#related-articles}

- [Searching People](./searching-people.md) — quick search और column customization
- [AI Search](./ai-search.md) — प्राकृतिक-भाषा queries जिन्हें आप सूचियों के रूप में सहेज सकते हैं
- [Custom Fields](../settings/custom-fields.md) — अपने व्यक्ति fields परिभाषित करें, फिर उन पर filter करके सूचियाँ सहेजें
- [Demographics](./demographics.md) — किसी जनसांख्यिकीय चार्ट को People filter में बदलें, फिर उसे सूची के रूप में सहेजें
- [Bulk Editing](./bulk-editing.md) — कोई सूची लोड करने के बाद, उसके सभी सदस्यों को एक साथ बल्क में अपडेट करें
