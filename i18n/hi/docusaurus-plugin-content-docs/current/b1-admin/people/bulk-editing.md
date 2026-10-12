---
title: "लोगों का बल्क संपादन"
---

# लोगों का बल्क संपादन {#bulk-editing-people}

<div class="article-intro">
बल्क संपादन आपको एक साथ कई लोगों को अपडेट करने देता है, जिससे कई व्यक्तियों में एक ही बदलाव करते समय समय बचता है। आप एक ही ऑपरेशन में membership status, marital status, gender, opt-out प्राथमिकताएँ और group memberships अपडेट कर सकते हैं।
</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- आपको लोगों के डेटा को manage करने की permission चाहिए। विवरण के लिए [Roles & Permissions](./roles-permissions.md) देखें।
- जिन लोगों का आप संपादन करना चाहते हैं, उन्हें आपने पहले ही जोड़ या import कर लिया होना चाहिए। ज़रूरत हो तो [Adding People](./adding-people.md) देखें।
</div>

## बल्क संपादन के लिए लोगों का चयन {#selecting-people-for-bulk-editing}

1. B1 Admin में **People** पर जाएँ
2. जिन लोगों को अपडेट करना है उन्हें खोजने के लिए search या filter tools का उपयोग करें
3. लोगों को चुनने के लिए checkboxes पर निशान लगाएँ
   - **Households** view में, किसी household पर निशान लगाने से उसके सभी लोग चुने जाते हैं
   - **Table** view में (**View as** toggle से बदलें), आप लोगों को अलग-अलग चुन सकते हैं
   - या दिखाई देने वाले सभी लोगों को चुनने के लिए सूची के ऊपर के checkbox का उपयोग करें
4. कम से कम एक व्यक्ति चुनने के बाद, सूची के ऊपर की bar दिखाती है कि कितने लोग चुने गए हैं, साथ में **Clear Selection** और एक **Actions** button भी दिखता है

:::tip
यदि आपको किसी विशेष मानदंड के आधार पर लोगों के बड़े समूह को अपडेट करना है, तो पहले अपनी सूची को संकीर्ण करने के लिए [AI Search](./ai-search.md) सुविधा या filters का उपयोग करें, फिर सभी मेल खाने वाले लोगों को चुनें।
:::

## उपलब्ध बल्क क्रियाएँ {#available-bulk-actions}

**Actions** मेनू में कई विकल्प हैं:

### Membership Status अपडेट करें {#update-membership-status}

चुने गए सभी लोगों का membership status अपडेट करें:

1. **Actions** → **Set Membership Status** पर क्लिक करें
2. नया status चुनें:
   - **Visitor** -- पहली बार या कभी-कभार आने वाले लोग
   - **Guest** -- मेहमान, जैसे check-in kiosk पर पंजीकृत परिवार
   - **Regular Attendee** -- नियमित रूप से आने वाले लोग जो सदस्य नहीं हैं
   - **Member** -- आधिकारिक चर्च सदस्य
   - **Staff** -- चर्च के स्टाफ सदस्य
   - **Inactive** -- जो लोग अब उपस्थित नहीं होते
   - **Deceased** -- जो लोग गुज़र चुके हैं
3. अपडेट मोड चुनें:
   - **Overwrite all** -- चुने गए सभी लोगों का मौजूदा status बदलें
   - **Only update empty** -- केवल उन्हीं लोगों का status सेट करें जिनका कोई status नहीं है
4. **Update** पर क्लिक करें

### Marital Status अपडेट करें {#update-marital-status}

बल्क में marital status अपडेट करें:

1. **Actions** → **Set Marital Status** पर क्लिक करें
2. नया status चुनें:
   - **Unknown**
   - **Single**
   - **Married**
   - **Divorced**
   - **Widowed**
3. चुनें कि मौजूदा मान बदलने हैं या केवल खाली fields अपडेट करने हैं
4. **Update** पर क्लिक करें

### Gender अपडेट करें {#update-gender}

कई लोगों की gender जानकारी अपडेट करें:

1. **Actions** → **Set Gender** पर क्लिक करें
2. मान चुनें:
   - **Unspecified**
   - **Male**
   - **Female**
3. अपडेट मोड चुनें (सभी को overwrite करें या केवल खाली वाले)
4. **Update** पर क्लिक करें

### Opt-Out Status अपडेट करें {#update-opt-out-status}

नियंत्रित करें कि लोगों ने communications से opt out किया है या नहीं:

1. **Actions** → **Set Directory Opt-Out** पर क्लिक करें
2. चुनें:
   - **No** -- Communications की अनुमति दें (opt-out हटाएँ)
   - **Yes** -- Communications रोकें (opt-out सेट करें)
3. अपडेट मोड चुनें
4. **Update** पर क्लिक करें

:::warning
Opt-out status बदलते समय सावधान रहें। जिन लोगों ने स्पष्ट रूप से opt out किया है, उन्हें नई सहमति मिले बिना communications नहीं मिलने चाहिए।
:::

### Custom Field सेट करें {#set-custom-field}

चुने गए सभी लोगों के लिए एक साथ Yes/No [custom field](../settings/custom-fields.md) का मान सेट करें:

1. **Actions** → **Set Custom Field** पर क्लिक करें।
2. वह Yes/No custom field चुनें जिसे आप सेट करना चाहते हैं।
3. लागू करने के लिए मान (**Yes** या **No**) चुनें।
4. **Update** पर क्लिक करें।

:::info
इस बल्क क्रिया के लिए केवल Yes/No custom fields उपलब्ध हैं। अन्य प्रकार के fields सेट करने के लिए हर व्यक्ति को अलग से संपादित करें।
:::

### Group में जोड़ें {#add-to-group}

चुने गए सभी लोगों को एक या अधिक groups में जोड़ें:

1. **Actions** → **Add to Group** पर क्लिक करें
2. जिन group(s) में लोगों को जोड़ना है उन्हें खोजकर चुनें
3. आप एक से अधिक groups चुन सकते हैं ताकि लोग उन सभी में जुड़ जाएँ
4. **Add to Groups** पर क्लिक करें

हर व्यक्ति चुने गए group(s) का एक सामान्य सदस्य बनकर जुड़ता है। ज़रूरत पड़ने पर बाद में [Group Members](../groups/group-members.md) पेज से व्यक्तियों को group leaders बनाया जा सकता है।

### Group से हटाएँ {#remove-from-group}

चुने गए सभी लोगों को एक या अधिक groups से हटाएँ:

1. **Actions** → **Remove from Group** पर क्लिक करें
2. जिन group(s) से लोगों को हटाना है उन्हें खोजकर चुनें
3. आप एक से अधिक groups चुन सकते हैं
4. **Remove from Groups** पर क्लिक करें

:::info
यह क्रिया लोगों को केवल निर्दिष्ट groups से हटाती है। यह उनके person records को नहीं मिटाती।
:::

### लोगों को हटाएँ {#delete-people}

चुने गए लोगों को अपने चर्च के database से स्थायी रूप से हटाएँ:

1. **Actions** → **Delete** पर क्लिक करें
2. **Delete Selected People** संवाद पूछता है कि कितने लोग हटाए जाएँगे, इसकी पुष्टि करें
3. **Delete** पर क्लिक करें

:::danger
लोगों को हटाना स्थायी है और इसे पलटा नहीं जा सकता। इससे उनका सारा डेटा हट जाएगा, जिसमें शामिल है:
- व्यक्तिगत जानकारी
- Group memberships
- उपस्थिति के रिकॉर्ड
- दान का इतिहास
- Form submissions

इस क्रिया का उपयोग तभी करें जब आप पूरी तरह निश्चित हों कि आप इन लोगों को अपने सिस्टम से हटाना चाहते हैं।
:::

## बल्क संपादन के परिणाम {#bulk-edit-results}

किसी बल्क क्रिया के पूरा होने के बाद, आपको एक सारांश दिखेगा जिसमें होगा:

- **Total selected** -- ऑपरेशन में कितने लोग शामिल थे
- **Successfully updated** -- कितने रिकॉर्ड बदले गए
- **Failed** -- वे रिकॉर्ड जिन्हें अपडेट नहीं किया जा सका (यदि लागू हो)
- **Unchanged** -- वे रिकॉर्ड जिन्हें बदलाव की ज़रूरत नहीं थी (जैसे "only update empty" मोड में)

यदि कोई अपडेट विफल होता है, तो आपको त्रुटि का विवरण दिखेगा जो बताएगा कि ऐसा क्यों हुआ।

## सर्वोत्तम अभ्यास {#best-practices}

- **छोटे से शुरू करें** -- यह सुनिश्चित करने के लिए कि आप सही बदलाव कर रहे हैं, पहले कुछ रिकॉर्ड पर बल्क ऑपरेशन आज़माएँ
- **Filters का उपयोग करें** -- केवल सही व्यक्तियों को अपडेट करने के लिए, लोगों को चुनने से पहले अपनी सूची को filters या AI search से संकीर्ण करें
- **चयन दोबारा जाँचें** -- बल्क बदलाव लागू करने से पहले चुने गए लोगों की समीक्षा करें
- **"only update empty" मोड का उपयोग करें** -- जब आप मौजूदा जानकारी को overwrite किए बिना गायब डेटा भरना चाहते हों
- **बड़े बदलावों का रिकॉर्ड रखें** -- बाद में संदर्भ के लिए बल्क अपडेट के बारे में नोट्स रखें
- **अपनी टीम से समन्वय करें** -- बड़े बल्क बदलाव करने से पहले अन्य administrators को सूचित करें

## सामान्य उपयोग के मामले {#common-use-cases}

### नए सदस्यों को अपडेट करना {#updating-new-members}

एक सदस्यता कक्षा के बाद, सभी उपस्थित लोगों को Member status दें:

1. उन लोगों को खोजें जो कक्षा में आए थे
2. उन सभी को चुनें
3. **Actions** → **Set Membership Status** → **Member** का उपयोग करें

### छोटे समूह व्यवस्थित करना {#organizing-small-groups}

किसी नए छोटे समूह में कई लोगों को जोड़ें:

1. उन लोगों को खोजें जिन्हें आप समूह में चाहते हैं
2. उन्हें चुनें
3. **Actions** → **Add to Group** का उपयोग करें और छोटा समूह चुनें

### डेटा साफ़ करना {#cleaning-up-data}

विवाहित जोड़ों के लिए खाली marital status भरें:

1. विवाहित लोगों को filter करें (household जानकारी का उपयोग करके)
2. जिनका marital status खाली है उन्हें चुनें
3. **Actions** → **Set Marital Status** → **Married** → **Only update empty** का उपयोग करें

## संबंधित लेख {#related-articles}

- [Searching People](./searching-people.md) -- संपादन के लिए लोगों को खोजें
- [AI Search](./ai-search.md) -- लोगों के विशेष समूह खोजने के लिए प्राकृतिक भाषा का उपयोग करें
- [Group Members](../groups/group-members.md) -- group membership प्रबंधित करें
- [Exporting Data](./exporting-data.md) -- बल्क बदलाव करने से पहले लोगों का डेटा export करें
