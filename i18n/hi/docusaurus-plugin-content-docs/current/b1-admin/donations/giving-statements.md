---
title: "दान विवरण"
---

# दान विवरण {#giving-statements}

<div class="article-intro">

हर साल के अंत में, आपके दानदाताओं को अपने रिकॉर्ड के लिए अपने tax-deductible दान का सारांश चाहिए। B1 Admin इन विवरणों को सभी दानदाताओं के लिए एक साथ बनाना आसान बनाता है, जिससे घंटों का मैन्युअल काम बच जाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- सत्यापित करें कि आपके [funds](funds.md) सही तरीके से **Tax Deductible** चिह्नित हैं -- विवरणों में केवल tax-deductible funds के दान आते हैं
- सुनिश्चित करें कि सभी दान [दर्ज](recording-donations.md) हो चुके हैं और सभी online transactions [Stripe से आयात](stripe-import.md) हो चुके हैं

</div>

## Giving statements तक पहुंचना {#accessing-giving-statements}

1. **B1 Admin** में, [Jump menu](../introduction.md#getting-around-with-the-jump-menu) खोलें (ऊपर-बाईं ओर का search bar) और **Donations** को expand करें।
2. **Giving Statements** पर click करें। **Batch Giving Statements** page खुलता है।

## विवरण बनाना {#generating-statements}

1. **Select Year** panel में, dropdown से **Year** चुनें। आप चालू वर्ष या पिछले पांच वर्षों में से कोई भी चुन सकते हैं।
2. page केवल उसी वर्ष (1 जनवरी से 31 दिसंबर तक) की तारीख वाले दान लोड करता है, इसलिए भले ही आपके church के पास कई वर्षों का giving इतिहास हो, यह तेज़ी से खुलता है। जब आप कोई अलग वर्ष चुनते हैं, तो सारांश उस वर्ष के दानों के साथ refresh होता है। वर्ष के नीचे का **Summary** panel उस वर्ष के आंकड़े दिखाता है, जिनमें शामिल हैं:
   - **Total Donors** -- दान देने वाले लोगों की संख्या
   - **Total Donations** -- अलग-अलग donation records की संख्या
   - **Total Amount** -- सभी दान की संयुक्त राशि

## विवरण डाउनलोड करना {#downloading-statements}

**Download Options** panel आपके दानदाताओं तक विवरण पहुंचाने के लिए दो विकल्प देता है:

### CSV फ़ाइलों के रूप में डाउनलोड करें {#download-as-csv-files}

**Individual CSV Files** के अंतर्गत, **Download ZIP** पर click करें ताकि एक ZIP फ़ाइल डाउनलोड हो, जिसमें हर दानदाता की अलग CSV फ़ाइल हो। यह तब उपयोगी है जब आप विवरण अलग-अलग email करना चाहते हैं या उन्हें किसी दूसरे system में import करना चाहते हैं।

### सभी statements प्रिंट करें {#print-all-statements}

**Printable Statements** के अंतर्गत, **Print All** पर click करें (बटन पर statements की संख्या दिखती है) ताकि चुने हुए वर्ष के हर दानदाता के विवरण का प्रिंट करने योग्य view आपके browser में खुले। वहां से, प्रिंटर पर भेजने के लिए अपने browser का print function उपयोग करें। हर statement एक नए page से शुरू होता है, ताकि वे मोड़कर भेजने के लिए तैयार रहें, और statements दानदाता के अंतिम नाम, फिर पहले नाम के क्रम में होते हैं।

यदि आपने [Website > Appearance](../website/appearance.md) के तहत **Light Background Logo** अपलोड किया है, तो वह हर statement के शीर्ष पर, statement के शीर्षक के ऊपर, बीच में प्रिंट होता है। यह **Print All** और अपने record से किसी एक दानदाता का statement प्रिंट करने, दोनों पर लागू होता है।

:::tip
जानकारी ताज़ा रहते हुए जनवरी की शुरुआत में ही अपने statements चलाएं। statements बनाने से पहले दोबारा जांचें कि आपके funds सही तरीके से tax-deductible चिह्नित हैं -- केवल tax-deductible funds के दान शामिल होते हैं।
:::

:::info
Giving statements में केवल वे दान शामिल होते हैं जो ऐसे funds को सौंपे गए हैं जिनकी **Tax Deductible** सेटिंग चालू है। यदि कोई fund tax-deductible चिह्नित नहीं है, तो उसके दान statement पर नहीं आएंगे। यह सेटिंग आप [Funds](funds.md) page पर प्रबंधित कर सकते हैं।
:::

## कनाडा, ऑस्ट्रेलिया और न्यूज़ीलैंड के लिए रसीद प्रारूप {#receipt-formats-for-canada-australia-and-new-zealand}

United States के बाहर के churches statement को अपने देश के आधिकारिक रसीद layout में बदल सकते हैं। Giving Statements page के ऊपर **Statement format** पर click करें (या **Settings** पर जाकर **Giving** section खोलें), और **Statement Format** को **Canada**, **Australia**, या **New Zealand** पर सेट करें, फिर जो fields दिखें उन्हें भरें: आपका registration number (CRA registration number, ABN, या NZ charity registration number), आपके organization का पता, रसीदों पर हस्ताक्षर के लिए अधिकृत व्यक्ति का नाम, और Canada के लिए वह शहर जहां रसीदें जारी होती हैं।

इसके बाद statements में वही शब्दावली होती है जिसकी आपकी tax authority अपेक्षा करती है (Canada के लिए, CRA संदर्भ के साथ "Official Receipt for Income Tax Purposes"), `YEAR-DONORID` रूप में एक रसीद संख्या, केवल tax-deductible funds से गिनी गई eligible राशि, और गैर-deductible funds के दानों के लिए अलग पंक्ति। जब दानदाता B1.church से अपना statement प्रिंट करते हैं, तो उन्हें भी वही रसीद block दिखता है।

## B1.church में सदस्य क्या देखते हैं {#what-members-see-in-b1church}

उसी **Giving** settings section से नियंत्रित होता है कि सदस्य B1.church में अपने giving page पर क्या देखते हैं:

- **Member Giving History** तय करता है कि सदस्य कौन से वर्ष देख सकते हैं। **All years** डिफ़ॉल्ट है। **Through 2025** (या कोई अन्य वर्ष) उस वर्ष पर रुक जाता है, इसलिए सदस्य बाद का वर्ष तब तक नहीं देख या प्रिंट कर सकते जब तक आप इसकी अनुमति न दें। जब आप सुधार और refunds पूरे कर रहे हों, तब चालू वर्ष को रोकने के लिए इसका उपयोग करें। **Hidden** giving history, वार्षिक योग और statement printing पूरी तरह हटा देता है। सदस्य फिर भी दे सकते हैं।
- **Giving Note** सदस्य के giving page और giving history पर दिखने वाला एक छोटा संदेश है, और हर giving statement के नीचे छपता है, जिसमें यहां से प्रिंट किए गए statements भी शामिल हैं। इसका उपयोग अपनी refund नीति जैसी बातों के लिए करें।

ये सेटिंग्स केवल यह बदलती हैं कि सदस्य क्या देखते हैं। आप इस page से फिर भी किसी भी वर्ष का statement प्रिंट कर सकते हैं।

## अगले कदम {#next-steps}

यदि statements बनाने से पहले आपको दान का विवरण जांचना है, तो [Donation Reports](donation-reports.md) page देखें या अलग-अलग [batches](batches.md) जांचें।
