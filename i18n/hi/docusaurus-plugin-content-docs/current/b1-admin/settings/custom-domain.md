---
title: "कस्टम डोमेन"
---

# कस्टम डोमेन

<div class="article-intro">

आप अपना domain (उदाहरण के लिए, **www.yourchurch.org**) अपनी B1 site की ओर point कर सकते हैं, ताकि visitors आपके church के असली web address पर पहुंचें, न कि डिफ़ॉल्ट yourchurch.b1.church address पर।

</div>

## चरण 1 — पहले DNS record जोड़ें

B1 में अपना domain जोड़ने से पहले, आपको अपने domain registrar (GoDaddy, Namecheap, Cloudflare, आदि) पर उसे B1 के servers की ओर point करना होगा।

इनमें से कोई एक record जोड़ें — CNAME को प्राथमिकता दी जाती है:

| प्रकार | Host | मान |
|------|------|-----------------------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

अपने `www` address के लिए **CNAME** का उपयोग करें। अगर आपका registrar root/apex domain (बिना www वाला) पर CNAME सपोर्ट नहीं करता, या अगर आप चाहते हैं कि root domain भी काम करे, तो **A record** का उपयोग करें।

DNS में बदलाव प्रभावी होने में कुछ मिनट से कुछ घंटे लग सकते हैं।

## चरण 2 — B1 में domain जोड़ें

एक बार DNS B1 की ओर point करने लगे, तो:

1. B1 Admin में **सेटिंग्स** पर जाएं।
2. बाईं ओर की सूची में **Domains** पर क्लिक करें, फिर **Domains** section में **Edit** पर क्लिक करें।
3. फ़ील्ड में अपना domain टाइप करें और **Save** पर क्लिक करें।

आपको पहले **+** बटन दबाने की ज़रूरत नहीं है -- फ़ील्ड में टाइप किया हुआ domain save करने पर जुड़ जाता है। जब आप सेव करने से पहले सूची में कई domains जोड़ना चाहें, तो **+** (या **Enter**) का उपयोग करें।

B1 SSL अपने-आप संभालता है — certificate खरीदने की ज़रूरत नहीं है।

:::warning
अगर आप DNS records लगाने से पहले B1 में domain जोड़ते हैं, तो वह save नहीं होगा। हमेशा पहले DNS सेट करें।
:::

## जांचना कि यह काम कर रहा है

सेव करने के बाद, अपना domain browser में खोलें। अगर वह आपकी B1 site लोड करता है, तो आप हो गए। अगर कोई error दिखता है, तो हो सकता है DNS अभी फैल रहा हो -- कुछ मिनट रुकें और फिर से कोशिश करें।

आप [dnschecker.org](https://dnschecker.org) पर DNS propagation भी जांच सकते हैं — अपना domain खोजें और देखें कि आपका CNAME या A record दिख रहा है या नहीं।
