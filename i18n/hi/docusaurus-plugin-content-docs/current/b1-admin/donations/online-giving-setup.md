---
title: "ऑनलाइन giving सेटअप"
---

# ऑनलाइन giving सेटअप {#online-giving-setup}

<div class="article-intro">

B1 Admin **Stripe**, **PayPal**, **Kingdom Funding**, और **Paystack** (अफ्रीका के churches के लिए) के साथ एकीकृत होता है, ताकि आपके सदस्य आपकी B1.church साइट के माध्यम से online दे सकें। एक बार कॉन्फ़िगर होने पर, online दान मैन्युअली दर्ज किए गए दानों के साथ आपके donation records में अपने-आप दिखते हैं, जिससे सब कुछ एक ही system में रहता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- अपने [donation funds](funds.md) सेट करें ताकि दानदाता अपने दान किसी fund को तय कर सकें
- [stripe.com](https://stripe.com) पर एक Stripe account बनाएं और उसे सक्रिय करें (test mode से बाहर निकालें)
- अपने B1 Admin login credentials तैयार रखें

</div>

## Stripe सेट करना {#setting-up-stripe}

1. यदि आपके पास पहले से account नहीं है, तो [stripe.com](https://stripe.com) पर एक account बनाएं। सुनिश्चित करें कि आप **अपना account सक्रिय** करें और उसे test mode से बाहर निकालें।
2. Stripe में **Developers > API Keys** पर जाएं।
3. अपनी **Publishable Key** कॉपी करें।
4. [B1 Admin](https://admin.b1.church/) में लॉग इन करें।
5. **Settings** पर जाएं और **Giving** section खोलें।
6. **Giving** section पर **Edit** पर click करें।
7. **Provider** को **Stripe** पर सेट करें।
8. अपनी Publishable Key **Public Key** field में पेस्ट करें।
9. Stripe पर वापस जाएं और अपनी **Secret Key** दिखाएं (इसे केवल एक बार देखा जा सकता है, इसलिए इसका backup रखें)।
10. Secret Key को **Secret Key** field में पेस्ट करें और **Save** पर click करें।

:::warning
आपकी Stripe Secret Key केवल एक बार दिखाई जाती है। Stripe dashboard से दूर जाने से पहले उसे किसी सुरक्षित जगह कॉपी करें। यदि यह खो जाए, तो आपको नई key बनानी होगी।
:::

## अपनी currency चुनना {#choosing-your-currency}

Stripe को provider चुनने के बाद, API keys के साथ एक **Currency** dropdown दिखता है। वह currency चुनें जो आपके Stripe account की settlement currency से मेल खाती हो, ताकि दान सही तरीके से charge हों।

समर्थित currencies में USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, और BRL शामिल हैं। आप अपने [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies) में अपने account की डिफ़ॉल्ट currency की पुष्टि या बदलाव कर सकते हैं।

:::info
यहां जो currency आप चुनते हैं, वह एकमुश्त दानों, आवर्ती subscriptions, fee गणनाओं, और donation reports में उपयोग होती है। यदि आप बाद में currency बदलते हैं, तो केवल नए दान और subscriptions नई currency का उपयोग करेंगे -- मौजूदा आवर्ती दान उसी currency में चलते रहेंगे जिसमें वे बनाए गए थे।
:::

:::warning
सुनिश्चित करें कि आपका Stripe account आपकी चुनी गई currency स्वीकार करने के लिए कॉन्फ़िगर है। यदि आपका Stripe account चुनी गई currency को सपोर्ट नहीं करता, तो checkout पर दान विफल होंगे।
:::

## Apple Pay और Google Pay {#apple-pay-and-google-pay}

Stripe का उपयोग करने वाले churches के सार्वजनिक giving page पर Apple Pay और Google Pay buttons अपने-आप मिलते हैं। एकमुश्त दानों के लिए card fields के ऊपर buttons तब दिखते हैं जब दानदाता ने fund और राशि चुन ली हो, और केवल तब जब दानदाता के browser या device पर wallet सेट हो। आवर्ती दान अभी भी card या bank fields का उपयोग करते हैं।

Google Pay के लिए कोई सेटअप नहीं चाहिए। Apple Pay के लिए आपके giving page का domain Stripe में पंजीकृत होना चाहिए; B1 इसे पहली बार पंजीकृत करता है जब आपके domain पर giving page लोड होता है। यदि iPhone पर Apple Pay button नहीं दिखता, तो अपने Stripe Dashboard में **Settings > Payment method domains** जांचें और पुष्टि करें कि आपका `yoursubdomain.b1.church` (या custom) domain सूचीबद्ध और verified है।

## अनाम gifts {#anonymous-gifts}

सार्वजनिक giving page पर दानदाता **Give anonymously** चिह्नित कर सकते हैं। अनाम दान बिना किसी दानदाता के दर्ज होता है, फिर भी वह दानदाता द्वारा चुने गए fund में जाता है, और आपकी batches और reports में **Anonymous** के रूप में दिखता है। रसीद भेजने के लिए दानदाता का email फिर भी आवश्यक है, लेकिन कोई person record नहीं बनता। अनाम दान केवल एकमुश्त होते हैं और किसी भी giving statement पर नहीं आते।

## असफल आवर्ती दान {#failed-recurring-gifts}

जब Stripe पर कोई आवर्ती दान विफल होता है (उदाहरण के लिए, कोई expired या declined card), तो विफल charge **Donations > Failed Gifts** के अंतर्गत दानदाता, राशि, तारीख, और gateway द्वारा दिए गए कारण के साथ दिखता है। जब दानदाता अपनी payment method अपडेट कर ले, तो charge फिर से आज़माने के लिए **Retry** पर click करें।

charge विफल होने पर B1 दानदाता को email भी भेजता है, और यदि अभी तक सफल न हुआ हो तो तीन और सात दिन बाद फिर से, B1.church में अपनी payment method अपडेट करने के link के साथ।

:::info
यदि आपके church ने यह सुविधा आने से पहले Stripe सेट किया था, तो **Settings** > **Giving** खोलें, edit पर click करें, और एक बार **Save** पर click करें। इससे Stripe webhook refresh होता है, ताकि विफल charges B1 को रिपोर्ट हों।
:::

## अपनी B1.church साइट पर donation page जोड़ना {#adding-a-donation-page-to-your-b1church-site}

1. [b1.church](https://b1.church/) पर जाएं और लॉग इन करें।
2. **Settings** icon पर click करें।
3. **Add Tab** पर click करें।
4. प्रकार के रूप में **Donation** चुनें।
5. tab का नाम दर्ज करें (जैसे "Give") और **Save** पर click करें।
6. वैकल्पिक रूप से, tab icon बदलें -- giving से संबंधित icon के लिए icon search में "Giv" टाइप करें।

आपका donation page अब live है। सदस्य उसे `yoursubdomain.b1.church/donate` पर देख सकते हैं।

## अपना giving link साझा करना {#sharing-your-giving-link}

अपना giving URL खोजने के लिए, **B1 Admin** पर जाएं और अपना subdomain देखने के लिए **Settings** icon पर click करें। आपका donation link इस प्रारूप में होता है:

`https://yoursubdomain.b1.church/donate`

इस link को अपनी website, emails, या bulletin में साझा करें, ताकि सदस्य जान सकें कि online कहां दे सकते हैं।

### पूर्व-निर्धारित fund और राशि वाले links {#links-with-a-preset-fund-and-amount}

दानदाताओं को सीधे किसी खास fund पर भेजने के लिए, **Donations > Funds** पर जाएं और fund पर **Giving Link** पर click करें। वैकल्पिक रूप से राशि दर्ज करें, फिर link कॉपी करें। जब कोई दानदाता इसे खोलता है, तो giving page पर fund और राशि पहले से चुनी होती है। link इस रूप में होता है:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

वही parameters website builder के **Donate Link** element में भी काम करते हैं।

## Donation notifications {#donation-notifications}

हर बार दान प्राप्त होने पर Stripe एक email notification भेजता है। notification का email पता बदलने के लिए, Stripe dashboard पर जाएं, ऊपर-दाईं ओर अपनी profile पर click करें, **Profile** चुनें, और अपना email पता अपडेट करें।

## Processing fee विकल्प {#processing-fee-options}

आप अपने giving page को इस तरह कॉन्फ़िगर कर सकते हैं कि दानदाता वैकल्पिक रूप से processing fees भी दें, ताकि आपके church को पूरी दान राशि मिले। यह सेटिंग B1 Admin के भीतर आपकी church settings में प्रबंधित होती है।

:::tip
सेटअप के बाद, अपनी मंडली को online giving की घोषणा करने से पहले एक छोटा test donation करके पुष्टि करें कि सब कुछ ठीक काम कर रहा है।
:::

## Kingdom Funding सेट करना {#setting-up-kingdom-funding}

Kingdom Funding एक Christian payment processor है जो credit/debit cards और ACH bank transfers को सपोर्ट करता है। यदि आपका church Kingdom Funding में नामांकित है, तो आप उसे अपने giving gateway के रूप में जोड़ सकते हैं।

:::info
Kingdom Funding integration अभी beta में है। इसे अपने church के लिए सक्षम करने हेतु अपने B1 account representative से संपर्क करें।
:::

1. [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) पर साइन अप करें या लॉग इन करें।
2. Kingdom Funding merchant portal से अपनी **Security Key** (public) और **Private Key** प्राप्त करें।
3. B1 Admin में, **Settings** पर जाएं, **Giving** section खोलें और edit पर click करें।
4. **Provider** को **Kingdom Funding** पर सेट करें।
5. अपनी Security Key को **Security Key** field में और Private Key को **Private Key** field में पेस्ट करें।
6. Kingdom Funding से मिली **Webhook Key** सेट करें, और दिखाए गए webhook URL को अपनी Kingdom Funding merchant settings में कॉपी करें, ताकि Kingdom Funding पूरे हुए लेन-देन की सूचना B1 को दे सके।
7. **Save** करें।

जुड़ने के बाद, सदस्यों को donation page पर card/bank toggle दिखेगा और वे credit card या ACH transfer से दे सकेंगे।

## PayPal और Venmo buttons {#paypal-and-venmo-buttons}

अपने provider के रूप में **PayPal** का उपयोग करने वाले churches के giving page पर एकमुश्त दानों के लिए card fields के ऊपर **PayPal** और **Venmo** buttons मिलते हैं। जो दानदाता इनमें से कोई दबाते हैं, वे PayPal window में भुगतान पूरा करते हैं, और दान किसी भी अन्य online दान की तरह दर्ज होता है। Venmo केवल United States के उन दानदाताओं के लिए दिखता है जिनके device PayPal के अनुसार पात्र हैं। आवर्ती दान अभी भी card fields का उपयोग करते हैं।

## Paystack (अफ्रीका) सेट करना {#setting-up-paystack-africa}

Stripe, घाना, नाइजीरिया, केन्या, दक्षिण अफ्रीका, और कोट डिवार के churches के लिए खाते नहीं खोलता। [Paystack](https://paystack.com) खोलता है, और यह स्थानीय cards, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bank transfer, और USSD स्वीकार करता है -- दानदाता आपकी स्थानीय currency (GHS, NGN, KES, ZAR, XOF) में भुगतान करते हैं।

1. [paystack.com](https://paystack.com) पर अपने church के business registration certificate और स्थानीय bank account के साथ पंजीकरण करें, और Paystack की activation (go-live) समीक्षा पूरी करें।
2. Paystack Dashboard में **Settings → API Keys & Webhooks** खोलें और **Public Key** व **Secret Key** कॉपी करें (test keys नहीं, live keys उपयोग करें)।
3. B1 Admin में, **Settings** पर जाएं, **Giving** section खोलें और edit पर click करें।
4. **Provider** को **Paystack** पर सेट करें, Public Key और Secret Key पेस्ट करें, और अपनी **Currency** चुनें।
5. provider के नीचे दिखाया गया **webhook URL** कॉपी करें, Paystack Dashboard (**Settings → API Keys & Webhooks**) पर वापस जाएं और उसे **Webhook URL** field में पेस्ट करें। इसी से आवर्ती दान और mobile money भुगतान रिकॉर्ड होते हैं।
6. **Save** करें।

दानदाता एक सुरक्षित Paystack window में अपना भुगतान पूरा करते हैं और वहीं card, mobile money, या bank transfer चुन सकते हैं। ध्यान दें:

- **आवर्ती दानों** के लिए card चाहिए; mobile money को अपने-आप दोबारा charge नहीं किया जा सकता, इसलिए Paystack केवल एकमुश्त mobile money दानों की अनुमति देता है।
- Paystack के आवर्ती दान B1 से रद्द किए जा सकते हैं, लेकिन रोके या संपादित नहीं किए जा सकते -- राशि बदलने के लिए रद्द करके नया बनाएं।
- **Processing Fee** के डिफ़ॉल्ट आपकी currency के लिए Paystack की स्थानीय-card दरों को दर्शाते हैं; यदि आपकी तय की गई दरें अलग हैं, तो उन्हें संपादित करें।

## अगले कदम {#next-steps}

- यदि वे अपने-आप sync नहीं हो रहे हैं, तो ऑनलाइन लेन-देन को B1 Admin में लाने के लिए [Stripe Import](stripe-import.md) का उपयोग करें
- यह जांचने के लिए कि ऑनलाइन दान सही तरीके से दिख रहे हैं, अपनी [Donation Reports](donation-reports.md) देखें
- ऑनलाइन और ऑफ़लाइन दोनों दानों को शामिल करने वाले [Giving Statements](giving-statements.md) बनाएं
