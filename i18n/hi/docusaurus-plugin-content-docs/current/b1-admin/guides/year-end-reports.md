---
title: "गाइड: वर्ष-अंत दान रिपोर्ट बनाएँ"
description: "B1 Admin में वर्ष की donation records पूरी करें, fund tax settings जाँचें, और हर donor के लिए कर-कटौती योग्य giving statements बनाएँ।"
---

# वर्ष-अंत दान रिपोर्ट बनाएँ

<div class="article-intro">

donation records को अंतिम रूप देने, fund settings सत्यापित करने, और हर donor के लिए कर-कटौती योग्य giving statements बनाने की वर्ष-अंत प्रक्रिया से गुज़रें। यह आम तौर पर पिछले कैलेंडर वर्ष के लिए जनवरी की शुरुआत में किया जाता है।

</div>

<div class="prereqs">
<h4>शुरू करने से पहले</h4>

- financial पहुँच वाला B1 Admin account
- पूरे वर्ष दर्ज की गई donations (Stripe के माध्यम से ऑनलाइन और/या मैन्युअली दर्ज)
- यदि आप ऑनलाइन donations स्वीकार करते हैं तो अपने Stripe account तक पहुँच

</div>

## चरण 1: अंतिम Stripe Transactions इंपोर्ट करें {#step-1-import-final-stripe-transactions}

सुनिश्चित करें कि वर्ष के अंत की सभी ऑनलाइन donations आपके सिस्टम में हैं।

इन कामों के लिए [Stripe Import](../donations/stripe-import.md) गाइड का पालन करें:

1. [Jump menu](../introduction.md#getting-around-with-the-jump-menu) में **Donations > Stripe Import** चुनें (यह केवल तभी दिखता है जब आपका giving provider Stripe हो)
2. **Start Date** और **End Date** सेट करें ताकि वर्ष का अंत शामिल हो (जैसे 1 दिसंबर - 31 दिसंबर)
3. समीक्षा के लिए पहले **Preview** पर क्लिक करें, फिर अंतिम रूप देने के लिए **Import Missing** पर क्लिक करें

:::warning
statements बनाने से पहले यह import चलाएँ। जो transactions आपने इंपोर्ट नहीं किए, वे donor statements पर नहीं दिखेंगे।
:::

## चरण 2: Donation Reports की समीक्षा करें {#step-2-review-donation-reports}

statements बनाने से पहले सत्यापित करें कि आपके रिकॉर्ड सटीक हैं।

इन कामों के लिए [Donation Reports](../donations/donation-reports.md) गाइड का पालन करें:

1. Jump menu में **Donations > Summary** चुनें, **Filter Report** में **Start Date** और **End Date** पूरे वर्ष के लिए सेट करें, और **Run Report** पर क्लिक करें
2. fund के अनुसार totals की समीक्षा करें और किसी भी विसंगति को पकड़ने के लिए उन्हें अपने बैंक statements से मिलाएँ। CSV के लिए **Download Options** पर क्लिक करें और **Summary** चुनें
3. ज़रूरत हो तो donor-स्तर के विवरण सत्यापित करने के लिए **Donations > Batches** के अंतर्गत अलग-अलग batches खोलें

## चरण 3: Fund की कर स्थिति सत्यापित करें {#step-3-verify-fund-tax-status}

सुनिश्चित करें कि हर fund की कर-कटौती योग्य सेटिंग सही है ताकि statements सटीक हों।

इन कामों के लिए [Funds](../donations/funds.md) गाइड का पालन करें:

1. Jump menu में **Donations > Funds** चुनें और हर fund की **Tax Status** जाँचें
2. **Tax Deductible** सेटिंग बदलने के लिए किसी fund पर **Edit** पर क्लिक करें

:::info
केवल वे donations giving statements पर दिखती हैं जो कर-कटौती योग्य चिह्नित funds में दी गई हों। अगर कोई fund कर-कटौती योग्य होना चाहिए पर इस तरह चिह्नित नहीं है, तो statements बनाने से पहले उसे अपडेट करें।
:::

## चरण 4: Giving Statements बनाएँ {#step-4-generate-giving-statements}

अपने donors के लिए आधिकारिक giving statements बनाएँ।

इन कामों के लिए [Giving Statements](../donations/giving-statements.md) गाइड का पालन करें:

1. Jump menu में **Donations > Giving Statements** चुनें
2. **Year** चुनें और summary statistics की समीक्षा करें। कनाडा, ऑस्ट्रेलिया, या न्यूज़ीलैंड के चर्च अपने देश के आधिकारिक receipt layout पर जाने के लिए **Statement format** पर क्लिक कर सकते हैं
3. अपनी download विधि चुनें:
   - **Download ZIP** — व्यक्तिगत CSV फ़ाइलें, हर donor के लिए एक
   - **Print All** — छपने योग्य दृश्य, हर statement नए पन्ने पर, और ऊपर आपके चर्च का लोगो (यदि आपने अपलोड किया हो)

:::tip
जनवरी की शुरुआत में ही statements बनाएँ जब रिकॉर्ड ताज़ा हों। इससे उन्हें भेजने से पहले किसी भी समस्या को पकड़ने का समय मिलता है।
:::

## चरण 5: Donors तक पहुँचाएँ {#step-5-distribute-to-donors}

statements अपने donors के हाथों तक पहुँचाएँ।

1. statements प्रिंट करके डाक से भेजें, या व्यक्तिगत CSV donors को ईमेल करें
2. सदस्य [B1.church या B1 App पर](../../b1-church/giving/donation-history.md) अपना giving इतिहास देख सकते हैं और statements प्रिंट कर सकते हैं

## हो गया! {#youre-done}

आपकी वर्ष-अंत दान रिपोर्ट पूरी हो गई है। donors के पास उनके कर-कटौती योग्य statements हैं, और आपके वित्तीय रिकॉर्ड वर्ष के लिए अंतिम हो गए हैं।

## संबंधित लेख {#related-articles}

- [Stripe Import](../donations/stripe-import.md) — ऑनलाइन transactions इंपोर्ट करें
- [Donation Reports](../donations/donation-reports.md) — giving के रुझान और totals देखें
- [Funds](../donations/funds.md) — funds और कर-कटौती योग्य सेटिंग प्रबंधित करें
- [Giving Statements](../donations/giving-statements.md) — वर्ष-अंत statements बनाएँ
- [Recording Donations](../donations/recording-donations.md) — नकद/चेक donations मैन्युअली दर्ज करें
- [Donation History (Web)](../../b1-church/giving/donation-history.md) — सदस्य का अपना देखने का दृश्य
- [Set Up Online Giving Guide](./online-giving.md) — प्रारंभिक Stripe और giving सेटअप
