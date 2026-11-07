---
title: "मोबाइल मैसेज"
---

# मोबाइल मैसेज

<div class="article-intro">

[मोबाइल मैसेज](https://mobilemessage.com.au) एक ऑस्ट्रेलियाई SMS API है, जो AU के चर्चों में लोकप्रिय है क्योंकि यह स्थानीय नंबर और AU के लिए प्रतिस्पर्धी मूल्य निर्धारण देता है, जबकि Clearstream और Text In Church अमेरिका-केंद्रित हैं। मोबाइल मैसेज के पास आज कोई फर्स्ट-क्लास Zapier ऐप नहीं है, लेकिन वह एक सार्वजनिक REST API प्रकाशित करता है। इसलिए आप **Webhooks by Zapier** (या Make का HTTP मॉड्यूल) के ज़रिए B1 इवेंट्स को मोबाइल मैसेज के टेक्स्ट से कुछ ही मिनटों में जोड़ सकते हैं।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- एक [मोबाइल मैसेज](https://mobilemessage.com.au) खाता, जिसमें पंजीकृत Sender ID और API क्रेडेंशियल हों (API username + password, *Account → API Settings* के अंतर्गत)
- एक [Zapier](https://zapier.com) खाता (या [Make](https://www.make.com))
- **Edit Settings** अनुमति वाला एक B1Admin उपयोगकर्ता

</div>

## आप क्या जोड़ सकते हैं

मोबाइल मैसेज का API "SMS भेजने" वाले स्वरूप का है, जिसमें कोई ट्रिगर नहीं होता, केवल बाहर जाने वाले टेक्स्ट होते हैं। इसलिए सभी रेसिपी B1 → SMS की दिशा में हैं:

| दिशा | B1 ट्रिगर | परिणाम |
|---|---|---|
| B1 → मोबाइल मैसेज | `person.created` | नए व्यक्ति को स्वागत संदेश |
| B1 → मोबाइल मैसेज | `donation.created` | दाता को धन्यवाद संदेश |
| B1 → मोबाइल मैसेज | `form.submission.created` | ड्यूटी पर मौजूद टीम को पेज करें |
| B1 → मोबाइल मैसेज | `event.created` | किसी सूची को भेजा जाने वाला रिमाइंडर |

## सेटअप

### 1. B1 API key बनाएँ

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: ट्रिगर वेबहुक पंजीकृत करने के लिए
- `people:read`: `personId` से प्राप्तकर्ता का फ़ोन नंबर खोजने के लिए

### 2. Webhooks by Zapier से Zap बनाएँ

1. **ट्रिगर**: B1.church में वह इवेंट चुनें जो आप चाहते हैं (जैसे New Donation)।
2. **एक्शन**: B1.church में Find Person (`data.personId` का उपयोग करके) चुनें, ताकि फ़ोन नंबर और नाम मिल सके।
3. **एक्शन**: Webhooks by Zapier में **POST** चुनें। नीचे दिए अनुसार कॉन्फ़िगर करें।

POST चरण की सेटिंग्स:

- **URL**: `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type**: JSON
- **Data**:
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers**: `Content-Type: application/json` (Webhooks by Zapier इसे अपने-आप जोड़ देता है)
- **Basic Auth**: *Basic Auth* फ़ील्ड में `<api_username>|<api_password>` डालें (Zapier इसे सही `Authorization: Basic …` हेडर में बदल देता है)

Zap चालू करें। B1Admin में एक परीक्षण उपहार भेजें और जाँचें कि टेक्स्ट पहुँचता है।

## सामान्य रेसिपी

### सुबह के इवेंट रिमाइंडर

- **ट्रिगर**: Schedule by Zapier (रोज़ सुबह 7 बजे)
- **एक्शन**: B1.church में आज के लिए Find Events (या कोई निश्चित तिथि फ़िल्टर वाला Find चरण, या आज की इवेंट सूची को Google Sheet में सहेजें)
- **एक्शन**: Webhooks by Zapier: इवेंट सूची के साथ मोबाइल मैसेज पर POST करें, किसी पंजीकृत सब्सक्राइबर समूह के लिए

### सूची प्रसारण के लिए बैच एंडपॉइंट का उपयोग करें

मोबाइल मैसेज का `/v्1/messages` एंडपॉइंट प्रति कॉल 10,000 संदेशों तक स्वीकार करता है। किसी B1 समूह को प्रसारण करने के लिए:

- **ट्रिगर**: B1.church में New Form Submission (किसी विशेष फ़ॉर्म तक सीमित करें)
- **एक्शन**: B1.church में लक्ष्य समूह के लिए List Group Members (`/membership/groupmembers?groupId=…` पर *Webhooks by Zapier: GET* चरण के माध्यम से)
- **एक्शन**: Formatter by Zapier → Utilities → प्रतिक्रिया को `messages` सरणी में Line-itemize करें
- **एक्शन**: Webhooks by Zapier: पूरी सरणी को `/v1/messages` पर POST करें

### Make विकल्प

यदि आप Make पसंद करते हैं, तो B1 Watch Events ट्रिगर के बाद **HTTP — Make a request** मॉड्यूल जोड़ें और उसे उसी तरह कॉन्फ़िगर करें (POST, Basic Auth, JSON body)। B1 की ओर की जानकारी के लिए [Make overview](../make) देखें।

## सीमाएँ और नोट्स

- **Basic Auth ही एकमात्र प्रमाणीकरण विधि है**: मोबाइल मैसेज डैशबोर्ड से username और password जारी करता है। दोनों को गुप्त रखें।
- **`sender` आपके मोबाइल मैसेज खाते पर पंजीकृत Sender ID होना चाहिए**, नहीं तो भेजने पर `400 Invalid sender` त्रुटि आएगी। AU नियमों के अनुसार sender पंजीकरण आवश्यक है।
- **AU फ़ोन नंबर** `0412345678` (स्थानीय) या `+61412345678` (अंतरराष्ट्रीय) हो सकते हैं। API दोनों स्वीकार करता है, लेकिन यदि आप विदेश में भी भेज रहे हैं तो `+61…` प्रारूप में एकरूपता रखें।
- **प्रति अनुरोध 10,000 संदेश तक**: प्रसारण के लिए उपयोगी है, लेकिन एक B1 वेबहुक डिलीवरी शायद ही इतनी बड़ी सूची भेजती है, इसलिए बैच एंडपॉइंट को निर्धारित बल्क Zaps के लिए सुरक्षित रखें।

## समस्या निवारण

- **POST पर `401 Unauthorized` आता है**: Basic Auth क्रेडेंशियल गलत हैं। मोबाइल मैसेज डैशबोर्ड के *Account → API Settings* से दोबारा कॉपी करें। ध्यान दें कि डिफ़ॉल्ट रूप से username आपका खाता ईमेल होता है, कोई अलग API key नहीं।
- **POST पर `400 Invalid sender` आता है**: `sender` मान आपके खाते पर पंजीकृत Sender ID नहीं है। पहले उसे मोबाइल मैसेज डैशबोर्ड में पंजीकृत करें।
- **टेक्स्ट आता है लेकिन कटा हुआ होता है**: मोबाइल मैसेज लगभग 160 अक्षरों से लंबे संदेशों को कई भागों में बाँट देता है, और हर भाग का शुल्क लगता है। प्रतिक्रिया (response body) देखें, उसमें भागों की संख्या लिखी होती है।

## इसे भी देखें

- [Clearstream](./clearstream), [Text In Church](./text-in-church): अन्य SMS प्रदाता जिनके पास मूल Zapier ऐप हैं (Webhooks-by-Zapier चरण की ज़रूरत नहीं)
- [Zapier (overview)](../zapier): हर Zapier रेसिपी का B1 पक्ष
- [मोबाइल मैसेज API दस्तावेज़](https://mobilemessage.com.au/api-documentation)
