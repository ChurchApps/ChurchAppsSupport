---
title: "दान आर्किटेक्चर"
---

# दान आर्किटेक्चर

<div class="article-intro">

ChurchApps दानों को गेटवे-रेल मॉडल पर चलाता है: चर्च अपना स्वयं का Stripe (या PayPal, Kingdom Funding, या Paystack) खाता रखता है, और B1 कभी भी प्लेटफ़ॉर्म प्रोसेसर के रूप में पैसे के रास्ते में नहीं बैठता है। कार्ड डेटा को ब्राउज़र में टोकनाइज़ किया जाता है और कभी ChurchApps सर्वर तक नहीं पहुंचता। यह पृष्ठ पूरे स्टैक को मैप करता है — `@churchapps/apphelper` में क्लाइंट-साइड प्रदाता रजिस्ट्री, GivingApi गेटवे अब्सट्रैक्शन, दान डेटा मॉडल, और गेटवे वेबहुक्स डेटाबेस में कैसे सामंजस्य स्थापित करते हैं।

</div>

## अवलोकन

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

पूरे स्टैक में तीन सिद्धांत लागू होते हैं:

1. **गेटवे कार्ड रखता है।** हर प्रदाता की एंट्री विजेट ब्राउज़र में टोकनाइज़ करता है; API केवल एक टोकन, नॉन्स, या ऑर्डर आईडी प्राप्त करता है।
2. **एक अब्सट्रैक्शन, कई प्रदाता।** ब्राउज़र एक रजिस्ट्री से `PaymentProvider` को हल करता है; सर्वर एक फैक्ट्री से `IGatewayProvider` को हल करता है। दोनों गेटवे रिकॉर्ड पर संग्रहीत समान सामान्यीकृत प्रदाता नाम से कुंजी देते हैं।
3. **वेबहुक्स निपटान के लिए सच का स्रोत हैं।** एक चार्ज प्रतिक्रिया को आशावादी रूप से रिकॉर्ड किया जाता है, लेकिन गेटवे का हस्ताक्षरित वेबहुक यही है जो पूर्ण दान की पुष्टि करता है (या बनाता है), दोनों पक्षों पर इडेम्पोटेंसी गार्ड के साथ।

## क्लाइंट-साइड: पेमेंट प्रदाता रजिस्ट्री (`@churchapps/apphelper`)

रजिस्ट्री `Packages/apphelper/src/donations/providers/` में रहती है, प्रत्येक प्रदाता के विजेट और हेल्पर्स अपने सबफोल्डर के तहत (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — `providers/` के बाहर कुछ भी प्रदाता नाम पर शाखा नहीं बनाता। एक `PaymentProvider` (देखें `providers/types.ts`) एक होस्ट ऐप को एक गेटवे के लिए चाहिए सब कुछ बांडल करता है: एक `descriptor` (व्यवस्थापक लेबल, समर्थित मुद्राएं, शुल्क क्षेत्र, डिफ़ॉल्ट शुल्क दरें, डैशबोर्ड/साइन अप URL), एक `capabilities` ध्वज सेट (सहेजे गए कार्ड, ACH, आवर्ती, इनलाइन नया-कार्ड प्रवेश, अंतर्निहित सहेजें-ऑन-टोकनाइज़), सदस्य प्रवेश के लिए React विजेट (`MemberWrapper`/`MemberEntry`), अतिथि दान (`GuestForm`), सहेजी-गई-विधि संपादन (`MethodEditForm`), और फॉर्म-प्रश्न भुगतान (`FormPayment`), साथ ही `buildChargeRequest(ctx, token)` — एक जगह जहां चार्ज पेलोड आकार प्रदाता प्रति भिन्न होता है। प्रत्येक प्रदाता का `MemberWrapper` गेटवे रिकॉर्ड के सार्वजनिक कुंजी से अपना SDK लोड करता है, इसलिए होस्ट ऐप्स कभी भी गेटवे SDK आयात नहीं करते (B1App और B1Admin के पास कोई `@stripe/*` निर्भरता नहीं है)। `pickDefaultGateway(gateways, capability?)` केंद्रीकृत करता है कि एक चर्च के गेटवे में से कौन सा सतह का उपयोग करना चाहिए।

`providers/registry.ts` निर्मित को धारण करता है। वे **मान से संदर्भित** होते हैं, मॉड्यूल साइड-इफ़ेक्ट के माध्यम से पंजीकृत नहीं होते हैं, इसलिए एक बंडलर का ट्री-शेकिंग कभी भी पंजीकरण को नहीं गिरा सकता:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| कार्य | उद्देश्य |
|----------|---------|
| `getPaymentProvider(name)` | सामान्यीकृत नाम से हल करें; Stripe में वापस गिरें ताकि एक गलत तरीके से कॉन्फ़िगर किए गए प्रदाता कभी भी दाता फॉर्म को कठोरता से क्रैश न करें |
| `registerPaymentProvider(p)` | रनटाइम पर एक अतिरिक्त प्रदाता पंजीकृत करें (एक होस्ट ऐप की कस्टम गेटवे के लिए) |
| `listPaymentProviders()` | निर्मित + कस्टम को गणना करें — व्यवस्थापक गेटवे ड्रॉपडाउन बनाने के लिए उपयोग किया जाता है |
| `hasPaymentProvider(name)` | सदस्यता जांच |

**निर्मित क्लाइंट प्रदाता: Stripe, PayPal, Kingdom Funding, Paystack।** B1App और B1Admin केवल रजिस्ट्री को *पढ़ते* हैं (`getPaymentProvider`, `listPaymentProviders`); न ही `registerPaymentProvider` को कॉल करता है — पंजीकरण apphelper के अंदर रहता है।

प्रत्येक प्रदाता अलग-अलग टोकनाइज़ करता है, लेकिन सभी कार्ड को B1 से बाहर रखते हैं:

| प्रदाता | एंट्री विजेट | API को API को टोकन लौटाया गया |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; अतिथि फॉर्म एक `ExpressCheckoutElement` को माउंट करता है (Apple Pay / Google Pay, एकबारी उपहार) जिसका `onConfirm` एक ही `pm_…` आईडी में हल होता है | भुगतान-विधि आईडी (`pm_…`); `/paymentmethods/ach-setup-intent` के माध्यम से बैंक — USD गेटवे के लिए वित्तीय कनेक्शन `us_bank_account`, CAD गेटवे के लिए कनाडाई PAD `acss_debit` (होस्ट किया गया जनादेश मोडल, जनादेश `default_for` चालान/सदस्यताएं, एकबारी चार्ज जनादेश आईडी पास करते हैं) |
| Kingdom Funding | गेटवे सार्वजनिक कुंजी द्वारा keyed होस्ट किया गया टोकनाइज़र फॉर्म | एकल-उपयोग नॉन्स |
| PayPal | PayPal होस्ट किए गए फील्ड (कार्ड, आवर्ती) साथ ही PayPal स्मार्ट बटन Venmo फंडिंग के साथ (एकबारी); दोनों एक SDK लोड साझा करते हैं और `/donate/client-token` + `/donate/create-order` के माध्यम से बनाया गया सर्वर ऑर्डर | पकड़े गए ऑर्डर आईडी |
| Paystack | Paystack इनलाइन पॉपअप (`js.paystack.co/v2/inline.js`) — पॉपअप ही भुगतान लेता है (कार्ड, मोबाइल मनी, बैंक स्थानांतरण, USSD) | भुगतान किए गए लेनदेन संदर्भ; सहेजी गई विधियां Paystack `AUTH_…` प्राधिकरण कोड हैं |

Stripe की `finalizeResult` ब्राउज़र में 3-D Secure / SCA चलाता है (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) इससे पहले दान पूरा माना जाता है; साझा फॉर्म बस `provider.finalizeResult(result)` को कॉल करता है यह जाने बिना कि यह क्या करता है।

## सर्वर-साइड: गेटवे अब्सट्रैक्शन (GivingApi)

`/giving` मॉड्यूल (`Api/src/modules/giving`) REST सतह उजागर करता है; गेटवे नलसाजी `Api/src/shared/helpers` में रहती है। `DonateController` कभी भी गेटवे SDK से सीधे बात नहीं करता — यह `GatewayService` के माध्यम से जाता है, जो सही `IGatewayProvider` को `GatewayFactory` से हल करता है और इसे एक विकृत `GatewayConfig` देता है।

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) वह अनुबंध है जो हर गेटवे लागू करता है — वेबहुक लाइफसाइकल (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), भुगतान (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), शुल्क (`calculateFees`), सहेजी-गई-विधि हैंडलिंग (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), और वैकल्पिक अतिरिक्त (ग्राहक, आदेश, SetupIntents, इवेंट रीप्ले, असफल सदस्यता चालान के लिए `retryFailedPayment`, Apple Pay डोमेन सत्यापन के लिए `registerPaymentMethodDomain`)। एक प्रदाता जो एक वैकल्पिक हुक को छोड़ता है, उसे उस कार्रवाई के लिए असमर्थित के रूप में रिपोर्ट किया जाता है और UI नियंत्रण को छिपाता है। प्रत्येक प्रदाता वर्ग अपना स्वयं का `capabilities` मैट्रिक्स घोषित करता है (समर्थित मुद्राएं, ACH, रिफंड, सदस्यता आवश्यकताएं, लेनदेन सीमाएं) — `GatewayService.getProviderCapabilities(provider)` बस इसे पढ़ता है — और `logsDonationsImmediately` जैसे झंडे नियंत्रक व्यवहार को चलाते हैं नियंत्रकों में किसी भी प्रदाता-नाम शर्त के बिना।

**GatewayFactory में पंजीकृत सर्वर प्रदाता:**

| प्रदाता | उपलब्धता |
|----------|-------------|
| Stripe | हमेशा चालू |
| PayPal | हमेशा चालू |
| Kingdom Funding | हमेशा चालू |
| Paystack | हमेशा चालू (नाइजीरिया, घाना, दक्षिण अफ्रीका, केन्या, Côte d'Ivoire व्यापारी; मुद्राएं NGN/GHS/ZAR/KES/XOF/USD) |
| Square | `ENABLE_SQUARE` पर्यावरण ध्वज के माध्यम से ऑप्ट-इन |
| ePayMints | `ENABLE_EPAYMINTS` पर्यावरण ध्वज के माध्यम से ऑप्ट-इन |

Paystack अन्य से भिन्न है कि पैसा GivingApi शामिल होने से पहले चलता है: पॉपअप दाता को चार्ज करता है, `processCharge` एक `GET /transaction/verify/:reference` है जिसकी भुगतान की गई राशि और मुद्रा दान से मेल खानी चाहिए जो रिकॉर्ड किया जा रहा है (एक संदर्भ पहले से ही फाइल पर कभी दो बार लॉग नहीं किया जाता है), और एक आवर्ती शेड्यूल का पहला उपहार `finalizeSubscription` से लॉग किया जाता है (सत्यापित करें → `POST /plan` → `POST /subscription` के साथ `start_date` एक अंतराल बाहर)। वेबहुक्स को गुप्त कुंजी के साथ हस्ताक्षरित किए जाते हैं (`x-paystack-signature`, कच्चे शरीर पर HMAC-SHA512) और Paystack के पास वेबहुक-प्रबंधन API नहीं है, इसलिए व्यवस्थापक स्क्रीन चर्च को अपने डैशबोर्ड में पेस्ट करने के लिए URL दिखाता है। नवीकरण `charge.success` इवेंट कोई फंड विभाजन नहीं ले; प्रदाता दाता के स्थानीय `subscriptions`/`subscriptionFunds` पंक्तियों से इसे पुनः प्राप्त करता है। केवल कार्ड प्राधिकरण `reusable` हैं — मोबाइल मनी उपहार केवल एकबारी हैं, इसलिए `createSubscription` उन्हें अस्वीकार करता है। डेमो डेटा एक दूसरे चर्च (Accra Community Church, `CHU00000002`) को एक Paystack परीक्षण-मोड GHS गेटवे पर बीज करता है ताकि Paystack Playwright सूट Grace के Stripe के साथ चले।

कस्टम प्रदाताओं को रनटाइम पर पंजीकृत किया जा सकता है जब `ENABLE_CUSTOM_GATEWAY_PROVIDERS` सेट होता है; `AbstractExperimentalGatewayProvider` उन लोगों के लिए आधार वर्ग है। प्रदाता नामों को case-insensitively मिलान किया जाता है।

### गेटवे कॉन्फ़िगरेशन & गुप्त

एक व्यवस्थापक `POST /giving/gateways` के माध्यम से गेटवे क्रेडेंशियल सहेजता है (`GatewayController`)। बचत पर नियंत्रक निजी और वेबहुक कुंजी को `EncryptionHelper` के साथ एन्क्रिप्ट करता है स्थायी होने से पहले, फिर — किसी भी गैर-स्थानीय होस्ट पर — चर्च के मौजूदा वेबहुक को हटाता है और `/giving/donate/webhook/{provider}?churchId=…` की ओर इशारा करते हुए एक नई को प्रदान करता है। एक चर्च प्रति प्रदाता एक पंक्ति रखता है: एक गेटवे बचत केवल उस प्रदाता के लिए मौजूदा पंक्ति को बदलता है। सार्वजनिक पढ़ता है (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) केवल सार्वजनिक कुंजी लौटाते हैं।

## डेटा मॉडल

दान स्कीमा (`Api/src/modules/giving/db/DatabaseTypes.ts`, मॉडल `models/` में) एक MySQL स्कीमा है जिसे Kysely के माध्यम से एक्सेस किया जाता है:

| तालिका | भूमिका |
|-------|------|
| `gateways` | प्रति-चर्च प्रदाता कॉन्फ़िग: `provider`, `publicKey`, एन्क्रिप्ट किए गए `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | दान पदनाम (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | प्रविष्टि/रिपोर्टिंग के लिए समूहीकरण (`name`, `batchDate`) |
| `donations` | एक उपहार: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; विवरण, कुल, और दान रिपोर्ट केवल `complete` या null गणना करते हैं), `transactionId` |
| `fundDonations` | एक दान का एक या अधिक निधियों में आवंटन (`donationId`, `fundId`, `amount`) |
| `subscriptions` | आवर्ती उपहार; `id` गेटवे की सदस्यता आईडी है, `personId`, `customerId`, `gatewayId` से जुड़ी है |
| `subscriptionFunds` | एक आवर्ती उपहार के लिए निधि विभाजन |
| `customers` | एक `personId` को इसकी गेटवे ग्राहक आईडी से लिंक करता है, प्रति `provider` |
| `gatewayPaymentMethods` | सहेजे गए कार्ड/बैंक: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | वेबहुक/इवेंट ऑडिट ट्रेल और dedup कुंजी (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | एक निधि से जुड़ी प्रण अभियान, और प्रत्येक व्यक्ति की प्रण राशि |

एक दान को `fundDonations` के माध्यम से निधियों में विभाजित किया जाता है — दान कुल ले जाता है, प्रत्येक `fundDonation` एक स्लाइस ले जाता है। `donations.currency` और `gateways.currency` ISO मुद्रा ले जाते हैं; प्रत्येक प्रदाता अपनी `supportedCurrencies` विज्ञापन करता है, और राशियों को `CurrencyHelper.formatCurrencyWithLocale` के साथ प्रारूपित किया जाता है।

## अंत-से-अंत प्रवाह

### सदस्य एकबारी और आवर्ती (B1App)

प्रमाणित दान स्क्रीन (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) तीन apphelper घटकों की रचना करती है: `MultiGatewayDonationForm`, `PaymentMethods`, और `RecurringDonations`। B1App आसपास के डेटा-लोडिंग करता है — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — और गेटवे सूची पास करता है; हल किया गया प्रदाता गेटवे के सार्वजनिक कुंजी से अपना SDK लोड करता है। चार्ज स्वयं apphelper के अंदर होता है: हल किया गया प्रदाता (नया या सहेजी गई) विधि को टोकनाइज़ करता है, फिर `/giving/donate/charge` को एकबारी उपहार के लिए या `/giving/donate/subscribe` के लिए एक आवर्ती के लिए पोस्ट करता है। दोनों एंडपॉइंट एक हस्ताक्षरकर्ता दाता को अपने स्वयं के `personId` के लिए जिम्मेदार ठहराते हैं (केवल `donations.edit` धारक किसी और को जिम्मेदार ठहरा सकते हैं) और निधि विभाजन को अस्वीकार करते हैं जो चार्ज की गई राशि से अधिक जोड़ते हैं। आवर्ती उपहार एक `subscriptions` पंक्ति साथ ही `subscriptionFunds` बनाते हैं और शेड्यूल को गेटवे को सौंपते हैं (Stripe Subscriptions, PayPal Billing Plans, या एक KF आवर्ती शेड्यूल)।

### अतिथि / गुमनाम दान

सार्वजनिक दान पृष्ठ (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) और "अभी दें" पैनल `NonAuthDonationWrapper` प्रदान करते हैं `@churchapps/apphelper/website` से, जो reCAPTCHA और गेटवे के Elements संदर्भ को प्रदाता के `GuestForm` के चारों ओर इंजेक्ट करता है। अतिथि कोई लॉगिन, कोई सहेजी गई विधि, और कोई इतिहास नहीं। प्रवाह `GET /giving/funds/churchId/:id` और `GET /giving/donate/gateways/:churchId` (केवल सार्वजनिक कुंजी) लाता है, आगंतुक को `POST /giving/donate/captcha-verify` के साथ सत्यापित करता है, ब्राउज़र में टोकनाइज़ करता है, और `/giving/donate/charge` को पोस्ट करता है (या `/subscribe`)। अतिथि ACH गुमनाम `POST /giving/paymentmethods/ach-setup-intent-anon` का उपयोग करता है।

तीन अतिथि-फॉर्म विकल्प समान चार्ज कॉल पर सवारी करते हैं। दान URL पर `?fundId=` और `?amount=` निधि विभाजन को प्रीचुनेट करते हैं (माउंट पर प्रत्येक प्रदाता के अतिथि फॉर्म द्वारा पढ़ा जाता है, सामान्य फंड-परिवर्तन हैंडलर के माध्यम से मार्ग किया जाता है ताकि कुल और शुल्क अपडेट हों)। `anonymous: true` `DonateController.charge` को किसी भी व्यक्ति को जो क्लाइंट ने भेजा था उसे त्याग देता है और `personId = null` के साथ उपहार लॉग करता है; अतिथि फॉर्म `/people/loadOrCreate` को छोड़ता है और ग्राहक/वॉल्ट चरण, और तीन तत्काल-लॉग प्रदाता व्यक्ति को गेटवे ग्राहक से हल करना बंद करते हैं। Apple Pay को पेज के डोमेन को Stripe के साथ पंजीकृत करने की आवश्यकता है, इसलिए एक Stripe अतिथि फॉर्म सार्वजनिक, दर-सीमित `POST /giving/donate/register-domain` में सत्र में एक बार पोस्ट करता है, जो केवल एक डोमेन को स्वीकार करता है जो चर्च से संबंधित है (`<subDomain>.b1.church`, सामग्री मॉड्यूल की डोमेन तालिका में एक पंक्ति, या एक स्थानीय होस्ट) Stripe की भुगतान-विधि-डोमेन API को कॉल करने से पहले।

### व्यवस्थापक रिकॉर्डिंग और Stripe आयात (B1Admin)

B1Admin दान अनुभाग (`B1Admin/src/donations/`) जहां वित्त दल काम करते हैं। बैच प्रविष्टि (`components/BulkDonationEntry.tsx`) नकद/चेक/इन-काइंड उपहारों को `/giving/donations` फिर `/giving/funddonations` को पोस्ट करके रिकॉर्ड करता है — कोई गेटवे शामिल नहीं। निधियां, बैच, अभियान, और विवरण प्रत्येक अपने `/giving/*` CRUD मार्ग मैप करते हैं। सदस्य-शैली दान पैनल (`B1Admin/src/donationComponents/`) B1App के समान apphelper घटकों को पुनः उपयोग करता है।

रिपोर्टिंग और लेखांकन हैंड-ऑफ्स क्लाइंट-साइड या रिपोर्ट-रनर कार्य हैं, गेटवे कार्य नहीं: बैच पृष्ठ की QuickBooks निर्यात बैच के `donations` + `fundDonations` (डेबिट अनजमा निधि, प्रति निधि एक क्रेडिट) से एक जर्नल-प्रविष्टि CSV बनाता है, Lapsed Givers टैब `Api/reports/lapsedGivers.json` को `ReportOutput` द्वारा हल किए गए व्यक्ति नामों के साथ सामान्य रिपोर्ट रनर के माध्यम से चलाता है, और देश की रसीद प्रारूप (कनाडा / ऑस्ट्रेलिया / न्यूजीलैंड) चर्च सेटिंग्स में सदस्यता कुंजी/मूल्य स्टोर में हैं `GivingStatementDocument` द्वारा प्रस्तुत और B1App प्रिंट पेज में डुप्लिकेट किए गए।

### मिश्रित-मुद्रा कुल में परिवर्तन

कोई भी एंडपॉइंट जो संभवतः मिश्रित-मुद्रा उपहारों में एकल संयुक्त कुल लौटाता है — दान सारांश KPI (`GivingKpiCards`), एक दान बैच कुल, एक निधि कुल, और B1App दान स्क्रीन के वर्ष-से-तारीख/अवधि कुल — सर्वर-साइड चर्च की डिफ़ॉल्ट मुद्रा में परिवर्तित करता है अनुसमर्थन मुद्राओं का योग बजाय। `Api/src/shared/helpers/ExchangeRateHelper.ts` चर्च मुद्रा द्वारा keyed `api.frankfurter.dev` से दर लाता है, उन्हें 12 घंटे के लिए-प्रक्रिया में कैश करता है, और `convertTotals(rows, churchCurrency, rates)` उजागर करता है: पंक्तियां पहले SQL में मुद्रा द्वारा समूहीकृत होती हैं (कुछ समूह, कभी प्रति-उपहार रूपांतरण), प्रत्येक समूह परिवर्तित और योग किया जाता है, और परिणाम एक `isConverted` ध्वज ले जाता है क्लाइंट एक "वर्तमान विनिमय दरों पर रूपांतरित" नोट दिखाने के लिए उपयोग करता है। `GET /donations/exchange-rates` दरों की तालिका को क्लाइंट के लिए उजागर करता है जिसे इसकी आवश्यकता है (B1App की दान स्क्रीन); दरें स्वयं कभी भी एक अनुरोध से स्वीकार नहीं की जाती हैं, केवल कभी सर्वर-साइड लाया जाता है, इसलिए एक क्लाइंट एक रिपोर्ट किए गए कुल को प्रभावित नहीं कर सकता। अलग-अलग दान रिकॉर्ड और ऐतिहासिक/मूल-मुद्रा रिपोर्ट कभी परिवर्तित नहीं होते — केवल संयुक्त कुल हैं।

Stripe आयात (`B1Admin/src/donations/StripeImportPage.tsx`) B1 के बाहर किए गए उपहारों को backfills: यह `dryRun: true` के लिए एक पूर्वावलोकन के लिए `POST /giving/donate/replay-stripe-events` को कॉल करता है, फिर `dryRun: false` आयात के लिए। सर्वर तारीख रेंज के लिए Stripe इवेंट सूचीबद्ध करता है और कुछ भी पहले से रिकॉर्ड किए गए को छोड़ता है — पहले `eventLogs` प्रदाता आईडी द्वारा मिलान किया जाता है, फिर `DonationRepo.findMatchingDonation` (राशि + तारीख + व्यक्ति) द्वारा ताकि एक पुनः-रन कभी दोहरा-आयात न करे।

## वेबहुक्स और सामंजस्य

निपटान किए गए भुगतान और सदस्यता राज्य परिवर्तन `POST /giving/donate/webhook/:provider?churchId=…` पर आते हैं (`DonateController.webhook`)। प्रसंस्करण जानबूझकर idempotent है:

1. **सत्यापित करें** — `GatewayService.verifyWebhook` प्रदाता की हस्ताक्षर जांच को सौंपता है; एक विफल हस्ताक्षर 401 लौटाता है। इवेंट जिन्हें प्रसंस्करण की आवश्यकता नहीं है 200 के साथ शॉर्ट-सर्किट।
2. **इवेंट को dedup करें** — `EventLogRepo.loadByProviderId` एक वेबहुक को छोड़ देता है जो पहले से ही `eventLogs` में रिकॉर्ड किया गया है।
3. **दान को dedup करें** — कुछ भी बनाने से पहले, `DonationRepo.loadByTransactionId` को हर उम्मीदवार आईडी के विरुद्ध जांचा जाता है पेलोड ले सकता है। यह डुप्लिकेट डिलीवरी, मल्टी-स्टेज ACH इवेंट (लंबित → निपटान), और इस मामले को अवशोषित करता है जहां `/donate/charge` पहले से ही आशावादी रूप से उपहार लॉग किया है।
4. **लागू करें** — प्रदाता का `classifyWebhookEvent(eventType)` कहता है इवेंट का मतलब क्या है (`donation` लंबित/पूर्ण, `cancel-subscription`, या `ignore`); पूर्ण भुगतान एक `complete` दान बनाते हैं (या एक मौजूदा `pending` या `failed` को बढ़ावा देते हैं), ACH-शैली इवेंट निपटान तक `pending` के रूप में उतरते हैं, एक विफल सदस्यता चालान (Stripe `invoice.payment_failed`) `failed` दान बनाता है चालान आईडी पर keyed, और रद्द करने की इवेंट स्थानीय `subscriptions` पंक्ति को हटाते हैं। नियंत्रक कभी भी प्रदाता-विशिष्ट इवेंट नामों का निरीक्षण नहीं करता।

### विफल आवर्ती उपहार और Dunning

एक `failed` दान कार्य की इकाई है वसूली के लिए। `GET /giving/donations/failed` उन्हें सबसे नई गेटवे विफलता संदेश के साथ सूचीबद्ध करता है `eventLogs` से और गेटवे की क्षमताओं से `canRetry` ध्वज; `POST /giving/donate/retry/:donationId` प्रदाता के `retryFailedPayment` को कॉल करता है (Stripe खुले चालान का भुगतान करता है), और परिणामी वेबहुक पंक्ति को सामान्य dedup पथ के माध्यम से `complete` में बढ़ावा देता है। Dunning ईमेल दिन 0 पर वेबहुक हैंडलर से दाता को जाते हैं, फिर `DunningHelper.run` से मध्यरात्रि टाइमर में (दोनों `lambda/timer-handler.ts` और `RailwayCron.ts` में wired) दिन 3 और 7 पर; प्रत्येक भेजना `eventLogs` में `provider: "dunning"`, `providerId: "<donationId>:<day>"` के रूप में रिकॉर्ड किया जाता है, इसलिए एक पुनः-रन कभी दोहरा-ईमेल न करे। Stripe वेबहुक एंडपॉइंट इस सुविधा से पहले बनाए गए `invoice.payment_failed` को सदस्यता न दें; गेटवे को पुनः-बचाना एक नई एंडपॉइंट को प्रदान करता है इवेंट के साथ।

`logsDonationsImmediately` के साथ प्रदाता (PayPal, Kingdom Funding, Paystack) `/charge` प्रतिक्रिया से लॉग किए जाते हैं (खुश पथ के लिए कोई वेबहुक राउंड-ट्रिप की आवश्यकता नहीं), जबकि Stripe `payment_intent.succeeded` / `invoice.paid` और ACH `payment_intent.processing` पर निर्भर करता है। शुल्क हैंडलिंग (`POST /giving/donate/fee`, `payFees` गेटवे ध्वज, और प्रत्येक प्रदाता की `calculateFees`) दाता-साइड पर "शुल्क कवर" ग्रॉस-अप की गणना करता है — B1 कोई प्लेटफ़ॉर्म कट नहीं लेता है, इसलिए कोई आवेदन शुल्क कभी नहीं जोड़ा जाता है।

:::info
चार्ज और वेबहुक पथ समान `donations` / `fundDonations` पंक्तियां लिखते हैं। `transactionId` वह जॉइन कुंजी है जो एक आशावादी चार्ज लॉग और इसकी बाद की वेबहुक को एक उपहार के लिए दो दान पैदा करने से रोकती है।
:::

## संबंधित पृष्ठ

- [दान एंडपॉइंट्स](../api/endpoints/giving) — दान, निधि, बैच, गेटवे, सदस्यता, भुगतान विधि, और वेबहुक्स के लिए पूरी REST सतह
- [AppHelper](../shared-libraries/app-helper) — npm पैकेज जो भुगतान प्रदाता रजिस्ट्री और दान घटकों शिप करता है
- [मॉड्यूल संरचना](../api/module-structure) — GivingApi मॉड्यूल सर्वर-साइड कैसे व्यवस्थित है
