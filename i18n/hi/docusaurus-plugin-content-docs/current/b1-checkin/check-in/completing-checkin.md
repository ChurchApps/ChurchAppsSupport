---
title: "चेक-इन पूरा करना"
---

# चेक-इन पूरा करना {#completing-checkin}

<div class="article-intro">

एक बार आप अपने परिवार की समीक्षा कर लें और ज़रूरी group assignments कर लें, तो आप check-in को अंतिम रूप देने के लिए तैयार हैं। यह kiosk workflow का आखिरी चरण है -- ऐप attendance सबमिट करता है, labels प्रिंट करता है, और अगले परिवार के लिए रीसेट हो जाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- [अपने परिवार की समीक्षा करें](./household-review) household review screen पर
- उन परिवार के सदस्यों को [groups असाइन करें](./group-assignment) जिन्हें किसी विशेष कक्षा या कार्यक्रम में check in करना है
- वैकल्पिक रूप से, अपने परिवार के साथ आए [कोई भी guests जोड़ें](./adding-guests)

</div>

## चेक-इन कैसे करें {#how-to-check-in}

1. **household review screen** से, स्क्रीन के नीचे **Check-in** button पर tap करें।
2. ऐप attendance डेटा सर्वर पर सबमिट करता है और हरे checkmark और स्वागत संदेश के साथ एक **success screen** दिखाता है।

बस इतना ही। आपके परिवार की attendance दर्ज हो गई है।

## भरे हुए कमरे और volunteer ratios {#full-rooms-and-volunteer-ratios}

अगर आपके चर्च ने अपने कमरों पर [सुरक्षा सीमाएं](../../b1-admin/attendance/checkin-safety) कॉन्फ़िगर किए हैं, तो सर्वर सेव करने से पहले उन्हें जांचता है:

- अगर चुना गया कमरा **भरा हुआ या बंद** है, तो check-in नहीं होता और ऐप उस कमरे का नाम बताता है ताकि आप कोई दूसरा कमरा चुन सकें।
- अगर service time में एक [चेक-इन schedule](../../b1-admin/attendance/setup#setting-a-check-in-schedule) है और उसकी check-in window अभी खुली नहीं है, तो उस service time के कमरों में check-in भी रोक दिया जाता है। **Can't check in yet** screen कमरे को इस कारण के साथ सूचीबद्ध करती है कि "check-in isn't open right now"; कोई दूसरा service time या group चुनने के लिए **Change Rooms** पर tap करें। (जो service times पहले से बंद हैं, वे [परिवार की screen](./household-review) पर **Closed** दिखते हैं और उन्हें चुना नहीं जा सकता, इसलिए आप यह आम तौर पर तभी देखेंगे जब check-in के दौरान कोई window आधे रास्ते में बंद हो जाए।)
- जो परिवार किसी पिछले service time के लिए check in कर चुका है, वह बाद में वापस आकर कोई खुला service time जोड़ सकता है, भले ही पिछली window बंद हो चुकी हो। उनके मौजूदा check-ins बने रहते हैं और नए check-in को रोकते नहीं।
- अगर बच्चों के कमरे में उसके ratio के लिए **volunteers की कमी** है, तो ऐप या तो एक चेतावनी दिखाता है कि कोई staff सदस्य आगे बढ़ने की पुष्टि कर सकता है, या check-in को पूरी तरह रोक देता है -- यह इस पर निर्भर करता है कि आपके चर्च ने ratio enforcement कैसे कॉन्फ़िगर किया है।

## Label प्रिंटिंग {#label-printing}

अगर एक network printer कॉन्फ़िगर है, तो check-in के बाद ऐप अपने-आप labels प्रिंट करता है:

- **Name labels** उस हर व्यक्ति के लिए प्रिंट होते हैं जो ऐसे group में असाइन है जिसकी **Print Nametag** setting चालू है। Name labels में व्यक्ति का नाम, उनका group असाइनमेंट, और फ़ाइल में मौजूद कोई भी allergy/notes जानकारी होती है।
- **Parent pickup slips** तब प्रिंट होते हैं जब कोई check-in किया गया व्यक्ति ऐसे group में हो जिसकी **Parent Pickup** setting चालू है। **Volunteer** के रूप में check in किए गए लोगों को छोड़ दिया जाता है, इसलिए **Parent Pickup** कमरे में सेवा दे रहा childcare कार्यकर्ता pickup slip नहीं पाता। Pickup slip में बच्चे, उनके group असाइनमेंट, और एक अनोखा **4-character security code** होता है।

:::info
वही security code बच्चे के name label और माता-पिता के pickup slip, दोनों पर दिखता है। Pickup के समय, स्वयंसेवक codes का मिलान करते हैं ताकि पुष्टि हो कि हर बच्चे को सही वयस्क ले जा रहा है।
:::

Security code हर check-in के लिए नया बनता है और इसमें केवल व्यंजन (consonants) और अंक होते हैं (अनुचित शब्द बनने से बचने के लिए स्वर हटा दिए गए हैं)।

:::warning
अगर labels प्रिंट नहीं होते, तो **चर्च के logo** पर सात बार tap करके Admin Settings खोलें, फिर printer connection जांचने के लिए **Change Printer** पर tap करें। समस्या निवारण के चरणों के लिए [प्रिंटर सेटअप](../getting-started/printer-setup) देखें।
:::

## Check-in के बाद क्या होता है {#what-happens-after-check-in}

- अगर printer कॉन्फ़िगर है, तो ऐप सभी labels प्रिंट करता है और फिर अगले परिवार के लिए अपने-आप **lookup screen** पर लौट आता है।
- अगर कोई printer कॉन्फ़िगर नहीं है, तो success screen कुछ सेकंड के लिए दिखती है और फिर अपने-आप **lookup screen** पर लौट आती है।

Lookup screen पर लौटने के लिए आपको कुछ भी tap करने की ज़रूरत नहीं है -- ऐप यह बदलाव अपने-आप संभालता है।

:::tip
हर check-in के बाद ऐप पूरी तरह रीसेट हो जाता है, इसलिए किसी एक परिवार को दूसरे परिवार की जानकारी दिखने का कोई जोखिम नहीं है।
:::

## क्या रिकॉर्ड होता है {#what-gets-recorded}

जब आप **Check-in** tap करते हैं, तो ऐप हर उस परिवार के सदस्य के लिए जिसका group असाइनमेंट है, सर्वर को ये भेजता है:

- वह **person** जिसका check in हो रहा है
- वह **service** जिसमें वे भाग ले रहे हैं
- वह **service time** और **group** जिसमें वे असाइन हैं

यह डेटा B1 Admin में Attendance section के अंतर्गत दिखता है, जहां आपके चर्च के administrators attendance रिकॉर्ड देख और प्रबंधित कर सकते हैं। विवरण के लिए [check-in प्रशासन गाइड](../../b1-admin/attendance/check-in.md) देखें।
