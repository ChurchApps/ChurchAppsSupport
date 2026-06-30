---
title: "ऑनलाइन दान सेटअप"
---

# ऑनलाइन दान सेटअप

<div class="article-intro">

B1 Admin **Stripe**, **PayPal**, और **Kingdom Funding** के साथ एकीकृत है ताकि आपके सदस्य आपकी B1.church साइट के माध्यम से ऑनलाइन दान कर सकें। एक बार कॉन्फ़िगर करने के बाद, ऑनलाइन दान स्वचालित रूप से आपके दान रिकॉर्ड में मैन्युअल रूप से दर्ज किए गए उपहारों के साथ दिखाई देते हैं, सब कुछ एक सिस्टम में रखते हुए।

</div>

<div class="prereqs">
<h4>शुरुआत से पहले</h4>

- अपने [दान फंड](funds.md) सेट अप करें ताकि दाताएं अपने उपहारों को नामित कर सकें
- [stripe.com](https://stripe.com) पर एक Stripe खाता बनाएं और इसे सक्रिय करें (इसे टेस्ट मोड से बाहर निकालें)
- अपने B1 Admin लॉगिन क्रेडेंशियल्स तैयार रखें

</div>

## Stripe सेटअप

1. यदि आपके पास पहले से नहीं है तो [stripe.com](https://stripe.com) पर एक खाता बनाएं। सुनिश्चित करें कि आप **अपने खाते को सक्रिय करें** और इसे टेस्ट मोड से बाहर निकालें।
2. Stripe में, **Developers > API Keys** पर जाएं।
3. अपनी **Publishable Key** कॉपी करें।
4. [B1 Admin](https://admin.b1.church/) में लॉगिन करें।
5. शीर्ष नेविगेशन में **Church** पर क्लिक करें, फिर **Edit Church Settings** पर क्लिक करें।
6. **Church Settings** के बगल में edit icon पर क्लिक करें।
7. **Giving** सेक्शन तक स्क्रॉल करें।
8. **Provider** को **Stripe** पर सेट करें।
9. अपनी Publishable Key को **Public Key** फील्ड में पेस्ट करें।
10. Stripe में वापस जाएं और अपनी **Secret Key** को reveal करें (आप इसे केवल एक बार देख सकते हैं, इसलिए एक बैकअप सहेजें)।
11. Secret Key को **Secret Key** फील्ड में पेस्ट करें और **Save** पर क्लिक करें।

:::warning
आपकी Stripe Secret Key केवल एक बार दिखाई देती है। Stripe डैशबोर्ड से दूर जाने से पहले इसे एक सुरक्षित स्थान पर कॉपी करें। यदि आप इसे खो देते हैं, तो आपको एक नई key जेनरेट करनी होगी।
:::

## अपनी मुद्रा चुनना

Stripe को अपने provider के रूप में चुनने के बाद, आपकी API keys के साथ एक **Currency** ड्रॉपडाउन दिखाई देता है। ऐसी मुद्रा चुनें जो आपके Stripe खाते की settlement currency से मेल खाती हो ताकि दान सही तरीके से charge किए जाएं।

समर्थित currencies में USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN और BRL शामिल हैं। आप अपने [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies) में अपने खाते की डिफ़ॉल्ट currency को confirm या change कर सकते हैं।

:::info
यहां चुनी गई currency का उपयोग one-time donations, recurring subscriptions, fee calculations, और donation reports के लिए किया जाता है। यदि आप बाद में currencies बदलते हैं, तो केवल नए donations और subscriptions नई currency का उपयोग करेंगे - existing recurring gifts उस currency में जारी रहते हैं जिसमें वे बनाए गए थे।
:::

:::warning
सुनिश्चित करें कि आपका Stripe खाता आपके द्वारा चुनी गई currency को accept करने के लिए configured है। यदि आपका Stripe खाता selected currency को support नहीं करता है, तो checkout पर donations fail हो जाएंगे।
:::

## अपनी B1.church साइट में एक दान पृष्ठ जोड़ना

1. [b1.church](https://b1.church/) पर जाएं और लॉगिन करें।
2. **Settings** icon पर क्लिक करें।
3. **Add Tab** पर क्लिक करें।
4. प्रकार के रूप में **Donation** चुनें।
5. tab के लिए एक नाम दर्ज करें (उदा। "Give") और **Save** पर क्लिक करें।
6. वैकल्पिक रूप से, tab icon को change करें -- एक giving-related icon के लिए icon search में "Giv" type करें।

आपका दान पृष्ठ अब live है। Members इसे `yoursubdomain.b1.church/donate` पर visit कर सकते हैं।

## अपना देने वाला लिंक साझा करना

अपना giving URL खोजने के लिए, **B1 Admin** पर जाएं और **Settings** icon पर क्लिक करके अपना subdomain देखें। आपका donation link इस प्रारूप का पालन करता है:

`https://yoursubdomain.b1.church/donate`

इस लिंक को अपनी वेबसाइट पर, emails में, या अपनी bulletin में साझा करें ताकि members जान सकें कि कहां ऑनलाइन दान करें।

## दान सूचनाएं

Stripe हर बार एक email notification भेजता है जब एक donation प्राप्त होता है। notification email पता बदलने के लिए, Stripe dashboard पर जाएं, top right में अपनी profile पर क्लिक करें, **Profile** चुनें, और अपना email पता update करें।

## Processing Fee विकल्प

आप अपने giving page को configure कर सकते हैं ताकि donors optional रूप से processing fees को cover करें ताकि आपकी church को पूरी donation amount मिले। यह सेटिंग B1 Admin के भीतर आपकी church settings में manage की जाती है।

:::tip
सेटअप के बाद, अपनी congregation को ऑनलाइन giving की announce करने से पहले सब कुछ काम कर रहा है यह confirm करने के लिए एक छोटी test donation करें।
:::

## Kingdom Funding सेटअप

Kingdom Funding एक Christian payment processor है जो credit/debit cards और ACH bank transfers को support करता है। यदि आपकी church Kingdom Funding के साथ enrolled है, तो आप इसे अपने giving gateway के रूप में connect कर सकते हैं।

:::info
Kingdom Funding integration currently beta में है। इसे अपनी church के लिए enable करने के लिए अपने B1 account representative से contact करें।
:::

1. [kingdomfunding.org](https://kingdomfunding.org) पर sign up या लॉगिन करें।
2. Kingdom Funding merchant portal से अपनी **Security Key** (public) और **Private Key** obtain करें।
3. B1 Admin में, **Settings** पर जाएं और **Church Settings** खोलें।
4. **Giving** सेक्शन में, **Provider** को **Kingdom Funding** पर सेट करें।
5. अपनी Security Key को **Security Key** फील्ड में और अपनी Private Key को **Private Key** फील्ड में पेस्ट करें।
6. Kingdom Funding से प्राप्त **Webhook Key** सेट करें, और displayed webhook URL को अपनी Kingdom Funding merchant settings में कॉपी करें ताकि Kingdom Funding B1 को completed transactions के बारे में notify कर सके।
7. Save करें।

एक बार connect होने के बाद, members donation page पर एक card/bank toggle देखेंगे और credit card या ACH transfer द्वारा दान कर सकेंगे।

## अगले कदम

- [Stripe Import](stripe-import.md) का उपयोग करके ऑनलाइन transactions को B1 Admin में pull करें यदि वे स्वचालित रूप से sync नहीं हो रहे हैं
- [Donation Reports](donation-reports.md) को check करें यह verify करने के लिए कि ऑनलाइन donations सही तरीके से दिखाई दे रहे हैं
- [Giving Statements](giving-statements.md) generate करें जो ऑनलाइन और offline donations दोनों को include करें
