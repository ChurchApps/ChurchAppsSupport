---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) SMS और ड्रिप वर्कफ़्लो के साथ-साथ कनेक्ट-कार्ड ऑटोमेशन एक साथ उपलब्ध कराता है। इसका Zapier ऐप दोनों दिशाओं को सपोर्ट करता है: B1 के इवेंट्स को Text In Church वर्कफ़्लो में भेजें, और कनेक्ट-कार्ड या नए-संपर्क ट्रिगर को दूसरी तरफ़ से B1 में लाएँ।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [Text In Church](https://textinchurch.com) खाता, ऐसे प्लान पर जिसमें Zapier इंटीग्रेशन शामिल हो
- एक [Zapier](https://zapier.com) खाता
- **Edit Settings** अनुमति वाला एक B1Admin उपयोगकर्ता

</div>

## आप क्या जोड़ सकते हैं

| दिशा | ट्रिगर | क्रिया |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | संबंधित टीम के माध्यम से Send Text Message |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (समूह सदस्यता को प्रतिबिंबित करें) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Text In Church की क्रियाओं में *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, और समूह सदस्यता जोड़ना/हटाना भी शामिल हैं।

## सेटअप

### 1. B1 API key बनाएँ

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: B1 से ट्रिगर होने वाले Zaps के लिए आवश्यक
- `people:read`, `people:write`: व्यक्ति को खोजने या बनाने के लिए
- `groups:write`: समूह सिंक के लिए
- (वैकल्पिक) `donations:write` यदि आप दान की पुष्टियों को TIC से जोड़ते हैं

### 2. Text In Church को Zapier से कनेक्ट करें

[Text In Church की Zapier इंटीग्रेशन गाइड](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) का पालन करें। वे TIC डैशबोर्ड के भीतर से एक API टोकन जनरेट करते हैं।

### 3. कनेक्ट-कार्ड-से-B1 Zap बनाएँ

यह सबसे आम दिशा है। TIC से भेजे गए कनेक्ट कार्ड अपने आप B1 में नए व्यक्ति बन जाते हैं।

1. **ट्रिगर**: Text In Church: Connect Card Submitted।
2. **क्रिया**: B1.church: Find Person (ईमेल से)।
3. **पथ**: मिले / न मिले के आधार पर शाखा बनाएँ:
   - न मिले → B1.church: Create Person।
   - मिले → जारी रखें।
4. **क्रिया**: B1.church: Add Group Member, "New Contact" समूह में।

Zap चालू करें। TIC के माध्यम से जमा होने वाला अगला कनेक्ट कार्ड स्वतः **B1Admin → People** में दिखाई देगा।

## सामान्य रेसिपी

### B1 फ़ॉर्म से कनेक्ट-कार्ड-जैसा वर्कफ़्लो शुरू करें

- **ट्रिगर**: B1.church: New Form Submission (फ़ॉर्म "I'm new here" की id पर फ़िल्टर करें)
- **क्रिया**: Text In Church: Create/Update Person, फ़ॉर्म के ईमेल / फ़ोन / नाम के उत्तरों को मैप करते हुए
- **क्रिया**: Text In Church: Add to Group, जहाँ समूह के साथ पहले से बना स्वागत वर्कफ़्लो जुड़ा हो

### समूह सदस्यता प्रतिबिंबित करें

- **ट्रिगर**: B1.church: New Group Member, किसी विशिष्ट `groupId` पर फ़िल्टर किया गया
- **क्रिया**: Text In Church: Add to Group (वही व्यक्ति, प्रतिबिंबित समूह)। पूर्ण सिंक चाहिए तो इसके साथ `group.member.removed` Zap जोड़ें।

### कोई जुड़ने पर लीडर को सूचित करें

- **ट्रिगर**: B1.church: New Group Member
- **क्रिया**: Text In Church: Send Text Message, प्राप्तकर्ता = समूह लीडर का फ़ोन, संदेश = `"{first} {last} just joined {group}"`।

## सीमाएँ और टिप्पणियाँ

- **TIC का Zapier ऐप प्लान स्तर पर निर्भर है।** यदि TIC डैशबोर्ड में Zapier इंटीग्रेशन धूसर दिखे, तो इसे अपने प्लान पर सक्षम करवाने के लिए TIC सपोर्ट से संपर्क करें।
- **समूह ids TIC की हैं, B1 की नहीं।** प्रतिबिंबित करते समय आपको कहीं एक मैपिंग तालिका रखनी होगी (Zapier *Lookup Table*, या हर Zap में हार्ड-कोड किया हुआ)।
- **Send Text Message में क्रेडिट लगते हैं।** *Send Text* चलाने वाला हर Zap आपके TIC SMS कोटे से खर्च करता है।

## समस्या निवारण

- **Connect-Card ट्रिगर नहीं चलता**: TIC में Zapier इंटीग्रेशन का टॉगल चालू होना चाहिए। साथ ही जाँच लें कि जिस फ़ॉर्म से आपने परीक्षण किया, वह "Connect Card" के रूप में कॉन्फ़िगर है, न कि सामान्य सर्वे के रूप में।
- **B1 में Create Person 401 के साथ विफल**: API key गलत है, रद्द हो चुकी है, या उसमें `people:write` नहीं है। नई key बनाएँ।
- **B1 में डुप्लिकेट लोग**: TIC एक ही घटना के लिए *Person Created* और *Connect Card Submitted* दोनों भेजता है। एक को अपना मुख्य स्रोत चुनें और दूसरे पर Zapier Filter जोड़ें।

## इसे भी देखें

- [Clearstream](./clearstream): मिलते-जुलते Zapier ढाँचे वाला वैकल्पिक SMS प्लेटफ़ॉर्म
- [Zapier (सामान्य जानकारी)](../zapier): हर Zapier रेसिपी का B1 पक्ष
- [Text In Church Zapier गाइड](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC के दस्तावेज़)
