---
title: "Giving आर्किटेक्चर"
description: "ChurchApps दान के लिए डेवलपर गाइड: B1 Admin और B1.church Stripe, PayPal, Kingdom Funding या Paystack गेटवे के माध्यम से दान कैसे भेजते हैं।"
---

# Giving आर्किटेक्चर

<div class="article-intro">

ChurchApps दान को एक gateway-rail मॉडल पर चलाता है: चर्च अपना स्वयं का Stripe (या PayPal, Kingdom Funding, या Paystack) खाता रखता है, और B1 कभी भी एक प्लेटफ़ॉर्म प्रोसेसर के रूप में money path में नहीं बैठता। कार्ड डेटा ब्राउज़र में tokenize होता है और कभी ChurchApps सर्वर तक नहीं पहुँचता। यह पृष्ठ पूरे स्टैक का मानचित्र देता है -- `@churchapps/apphelper` में क्लाइंट-साइड provider रजिस्ट्री, GivingApi gateway abstraction, दान डेटा मॉडल, और gateway webhooks डेटाबेस में कैसे पुनर्मिलान होते हैं।

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

इस स्टैक में तीन सिद्धांत लागू होते हैं:

1. **Gateway कार्ड रखता है।** हर प्रदाता का एंट्री विजेट ब्राउज़र में tokenize करता है; API को केवल एक token, nonce, या order id मिलता है।
2. **एक abstraction, कई प्रदाता।** ब्राउज़र एक रजिस्ट्री से `PaymentProvider` हल करता है; सर्वर एक factory से `IGatewayProvider` हल करता है। दोनों gateway रिकॉर्ड पर संग्रहीत एक ही सामान्यीकृत provider नाम पर निर्भर हैं।
3. **Webhooks भुगतान के निपटान के लिए सत्य का स्रोत हैं।** charge प्रतिक्रिया आशावादी रूप से रिकॉर्ड होती है, लेकिन gateway का हस्ताक्षरित webhook ही पूर्ण दान की पुष्टि (या निर्माण) करता है, दोनों ओर idempotency guards के साथ।

## क्लाइंट-साइड: payment provider रजिस्ट्री (`@churchapps/apphelper`)

रजिस्ट्री `Packages/apphelper/src/donations/providers/` में रहती है, जिसमें हर प्रदाता के विजेट और helpers अपने उप-फ़ोल्डर के अंतर्गत हैं (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- `providers/` के बाहर कुछ भी provider नाम पर शाखा नहीं लेता। एक `PaymentProvider` (`providers/types.ts` देखें) एक gateway के लिए होस्ट ऐप को चाहिए सब कुछ समेटता है: एक `descriptor` (admin लेबल, समर्थित मुद्राएँ, शुल्क फ़ील्ड, डिफ़ॉल्ट शुल्क दरें, डैशबोर्ड/साइनअप URLs), एक `capabilities` फ़्लैग सेट (सहेजे कार्ड, ACH, आवर्ती, इनलाइन नया-कार्ड एंट्री, implicit save-on-tokenize), सदस्य एंट्री (`MemberWrapper`/`MemberEntry`) के React विजेट, गुमनाम दान (`GuestForm`), सहेजी विधि संपादन (`MethodEditForm`), और फ़ॉर्म-प्रश्न भुगतान (`FormPayment`), साथ में `buildChargeRequest(ctx, token)` -- वह एक स्थान जहाँ हर प्रदाता के लिए charge payload का आकार अलग होता है। हर प्रदाता का `MemberWrapper` gateway रिकॉर्ड की सार्वजनिक key से अपना SDK लोड करता है, इसलिए होस्ट ऐप कभी gateway SDK import नहीं करते (B1App और B1Admin में कोई `@stripe/*` निर्भरता नहीं है)। `pickDefaultGateway(gateways, capability?)` केंद्रीय रूप से तय करता है कि किसी सतह को चर्च के कौन से gateway का उपयोग करना चाहिए।

`providers/registry.ts` अंतर्निहित प्रदाताओं को रखता है। वे **मान द्वारा संदर्भित** हैं, किसी module side-effect के माध्यम से पंजीकृत नहीं, इसलिए bundler का tree-shaking कभी पंजीकरण नहीं हटा सकता:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| फ़ंक्शन | उद्देश्य |
|----------|---------|
| `getPaymentProvider(name)` | सामान्यीकृत नाम से हल करें; Stripe पर वापस गिरता है ताकि गलत कॉन्फ़िगर प्रदाता दान फ़ॉर्म को कभी हार्ड-क्रैश न करे |
| `registerPaymentProvider(p)` | रनटाइम पर एक अतिरिक्त प्रदाता पंजीकृत करें (होस्ट ऐप के कस्टम gateway के लिए) |
| `listPaymentProviders()` | अंतर्निहित + कस्टम की सूची -- admin gateway ड्रॉपडाउन बनाने के लिए उपयोग |
| `hasPaymentProvider(name)` | सदस्यता जाँच |

**अंतर्निहित क्लाइंट प्रदाता: Stripe, PayPal, Kingdom Funding, Paystack।** B1App और B1Admin रजिस्ट्री को केवल *पढ़ते* हैं (`getPaymentProvider`, `listPaymentProviders`); कोई `registerPaymentProvider` को कॉल नहीं करता -- पंजीकरण apphelper के भीतर रहता है।

हर प्रदाता अलग तरह से tokenize करता है, लेकिन सभी कार्ड को B1 से बाहर रखते हैं:

| प्रदाता | एंट्री विजेट | API को लौटाया गया token |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; guest फ़ॉर्म एक `ExpressCheckoutElement` (Apple Pay / Google Pay, एकबारगी उपहार) भी माउंट करता है जिसका `onConfirm` उसी `pm_…` id पर हल होता है | payment-method id (`pm_…`); बैंक `/paymentmethods/ach-setup-intent` के माध्यम से -- USD gateways के लिए Financial Connections `us_bank_account`, CAD gateways के लिए कनाडाई PAD `acss_debit` (hosted mandate modal, mandate `default_for` invoices/subscriptions, एकबारगी charges mandate id पास करते हैं) |
| Kingdom Funding | gateway public key से keyed hosted tokenizer फ़ॉर्म | एकल-उपयोग nonce |
| PayPal | PayPal Hosted Fields (कार्ड, आवर्ती) साथ में Venmo funding वाले PayPal Smart Buttons (एकबारगी); दोनों एक SDK लोड साझा करते हैं, और सर्वर order `/donate/client-token` + `/donate/create-order` के माध्यम से बनता है | कैप्चर किया गया order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) -- popup स्वयं भुगतान लेता है (कार्ड, mobile money, बैंक ट्रांसफ़र, USSD) | भुगतान किया गया transaction reference; सहेजी विधियाँ Paystack `AUTH_…` authorization codes हैं |

Stripe का `finalizeResult` दान पूर्ण माने जाने से पहले ब्राउज़र में 3-D Secure / SCA चलाता है (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`); साझा फ़ॉर्म बस `provider.finalizeResult(result)` कॉल करता है, यह जाने बिना कि वह क्या करता है।

## सर्वर-साइड: gateway abstraction (GivingApi)

`/giving` मॉड्यूल (`Api/src/modules/giving`) REST सतह देता है; gateway plumbing `Api/src/shared/helpers` में रहता है। `DonateController` कभी सीधे gateway SDK से बात नहीं करता -- यह `GatewayService` के माध्यम से जाता है, जो `GatewayFactory` से सही `IGatewayProvider` हल करता है और उसे एक decrypted `GatewayConfig` देता है।

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) वह अनुबंध है जो हर gateway लागू करता है -- webhook जीवनचक्र (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), भुगतान (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), शुल्क (`calculateFees`), सहेजी-विधि संभालना (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), और वैकल्पिक अतिरिक्त (customers, orders, SetupIntents, इवेंट replay, विफल सब्सक्रिप्शन इनवॉइस के लिए `retryFailedPayment`, Apple Pay domain सत्यापन के लिए `registerPaymentMethodDomain`)। जो प्रदाता कोई वैकल्पिक hook छोड़ता है, उस क्रिया के लिए अनसमर्थित माना जाता है और UI नियंत्रण छिपा देता है। हर provider class अपना `capabilities` मैट्रिक्स घोषित करती है (समर्थित मुद्राएँ, ACH, रिफ़ंड, सब्सक्रिप्शन आवश्यकताएँ, लेन-देन सीमाएँ) -- `GatewayService.getProviderCapabilities(provider)` केवल उसे पढ़ता है -- और `logsDonationsImmediately` जैसे फ़्लैग नियंत्रक व्यवहार चलाते हैं बिना नियंत्रकों में किसी provider-नाम शर्त के।

**`GatewayFactory` में पंजीकृत सर्वर प्रदाता:**

| प्रदाता | उपलब्धता |
|----------|-------------|
| Stripe | हमेशा चालू |
| PayPal | हमेशा चालू |
| Kingdom Funding | हमेशा चालू |
| Paystack | हमेशा चालू (नाइजीरिया, घाना, दक्षिण अफ़्रीका, केन्या, कोट डी आइवर के व्यापारी; मुद्राएँ NGN/GHS/ZAR/KES/XOF/USD) |
| Square | `ENABLE_SQUARE` पर्यावरण फ़्लैग के माध्यम से opt-in |
| ePayMints | `ENABLE_EPAYMINTS` पर्यावरण फ़्लैग के माध्यम से opt-in |

Paystack अन्य से इस मायने में अलग है कि GivingApi शामिल होने से पहले पैसा चलता है: popup दानकर्ता से शुल्क लेता है, `processCharge` एक `GET /transaction/verify/:reference` है जिसकी भुगतान राशि और मुद्रा रिकॉर्ड हो रहे दान से मेल खानी चाहिए (पहले से दर्ज reference कभी दोबारा लॉग नहीं होता), और आवर्ती शेड्यूल का पहला उपहार `finalizeSubscription` से लॉग होता है (verify → `POST /plan` → `POST /subscription` जिसमें `start_date` एक अंतराल आगे है)। Webhooks स्वयं secret key से हस्ताक्षरित हैं (`x-paystack-signature`, कच्चे body पर HMAC-SHA512), और Paystack के पास webhook-प्रबंधन API नहीं है, इसलिए एडमिन स्क्रीन URL दिखाती है ताकि चर्च उसे अपने डैशबोर्ड में चिपका सके। नवीनीकरण `charge.success` इवेंट में कोई फ़ंड विभाजन नहीं होता; प्रदाता इसे दानकर्ता की स्थानीय `subscriptions`/`subscriptionFunds` पंक्तियों से वापस पाता है। केवल कार्ड authorizations `reusable` हैं -- mobile money उपहार केवल एकबारगी हैं, इसलिए `createSubscription` उन्हें अस्वीकार करता है। डेमो डेटा एक दूसरा चर्च (Accra Community Church, `CHU00000002`) एक Paystack test-mode GHS gateway पर सीड करता है ताकि Paystack Playwright suite Grace के Stripe suite के साथ चले।

कस्टम प्रदाता रनटाइम पर पंजीकृत हो सकते हैं जब `ENABLE_CUSTOM_GATEWAY_PROVIDERS` सेट हो; `AbstractExperimentalGatewayProvider` उनके लिए आधार क्लास है। Provider नाम केस-इनसेंसिटिव रूप से मिलाए जाते हैं।

### Gateway कॉन्फ़िगरेशन और secrets

एक एडमिन `POST /giving/gateways` (`GatewayController`) के माध्यम से gateway credentials सहेजता है। सहेजने पर नियंत्रक private और webhook keys को persist करने से पहले `EncryptionHelper` से एन्क्रिप्ट करता है, फिर -- किसी भी non-localhost होस्ट पर -- चर्च का मौजूदा webhook हटाता है और `/giving/donate/webhook/{provider}?churchId=…` की ओर इंगित एक नया provision करता है। चर्च प्रति प्रदाता एक पंक्ति रखता है: gateway सहेजने पर केवल उसी प्रदाता की मौजूदा पंक्ति बदलती है। सार्वजनिक पढ़ने (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) केवल सार्वजनिक keys लौटाते हैं।

## डेटा मॉडल

giving स्कीमा (`Api/src/modules/giving/db/DatabaseTypes.ts`, `models/` में मॉडल) एक MySQL स्कीमा है जो Kysely के माध्यम से एक्सेस होता है:

| तालिका | भूमिका |
|-------|------|
| `gateways` | प्रति-चर्च प्रदाता कॉन्फ़िग: `provider`, `publicKey`, एन्क्रिप्टेड `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | दान के निर्देश (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | प्रविष्टि/रिपोर्टिंग के लिए समूहन (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | एक उपहार: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; statements, totals, dashboards और donation reports केवल `complete` या null गिनते हैं), `transactionId` |
| `fundDonations` | एक या अधिक फंड में दान का आवंटन (`donationId`, `fundId`, `amount`) |
| `subscriptions` | आवर्ती उपहार; `id` gateway का सब्सक्रिप्शन id है, `personId`, `customerId`, `gatewayId` से जुड़ा |
| `subscriptionFunds` | आवर्ती उपहार के लिए फंड विभाजन |
| `customers` | `personId` को प्रति `provider` उसके gateway customer id से जोड़ता है |
| `gatewayPaymentMethods` | सहेजे कार्ड/बैंक: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | webhook/इवेंट ऑडिट ट्रेल और dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | एक फंड से जुड़े pledge अभियान, और हर व्यक्ति की pledged राशि |

एक दान `fundDonations` के माध्यम से फंडों में बँटता है -- दान कुल राशि रखता है, हर `fundDonation` एक हिस्सा रखता है। `donations.currency` और `gateways.currency` ISO मुद्रा रखते हैं; हर प्रदाता अपनी `supportedCurrencies` विज्ञापित करता है, और राशियाँ `CurrencyHelper.formatCurrencyWithLocale` से फ़ॉर्मेट होती हैं।

## अंत-से-अंत प्रवाह

### सदस्य एकबारगी और आवर्ती (B1App)

प्रमाणीकृत दान स्क्रीन (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) तीन apphelper कंपोनेंट्स को संयोजित करती है: `MultiGatewayDonationForm`, `PaymentMethods`, और `RecurringDonations`। B1App आसपास का डेटा लोड करता है -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- और gateway सूची आगे पास करता है; हल किया गया प्रदाता gateway की सार्वजनिक key से अपना SDK लोड करता है। वास्तविक charge apphelper के भीतर होता है: हल किया गया प्रदाता (नई या सहेजी) विधि को tokenize करता है, फिर एकबारगी उपहार के लिए `/giving/donate/charge` या आवर्ती के लिए `/giving/donate/subscribe` पर पोस्ट करता है। दोनों endpoints साइन-इन दानकर्ता को उनके अपने `personId` से जोड़ते हैं (केवल `donations.edit` धारक किसी और को जोड़ सकते हैं) और उन फंड विभाजनों को अस्वीकार करते हैं जिनका योग चार्ज की गई राशि से अधिक हो। आवर्ती उपहार एक `subscriptions` पंक्ति और `subscriptionFunds` बनाते हैं और शेड्यूल को gateway को सौंपते हैं (Stripe Subscriptions, PayPal Billing Plans, या KF आवर्ती शेड्यूल)।

### गुमनाम / अतिथि दान

सार्वजनिक दान पृष्ठ (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) और "give now" पैनल `@churchapps/apphelper/website` से `NonAuthDonationWrapper` रेंडर करते हैं, जो प्रदाता के `GuestForm` के चारों ओर reCAPTCHA और gateway का Elements context इंजेक्ट करता है। अतिथियों को कोई लॉगिन, सहेजी विधियाँ या इतिहास नहीं मिलता। प्रवाह `GET /giving/funds/churchId/:id` और `GET /giving/donate/gateways/:churchId` (केवल सार्वजनिक keys) लाता है, `POST /giving/donate/captcha-verify` से visitor को सत्यापित करता है, ब्राउज़र में tokenize करता है, और `/giving/donate/charge` (या `/subscribe`) पर पोस्ट करता है। verify कॉल 10 मिनट का HMAC-हस्ताक्षरित `captchaPass` (`Api/src/modules/giving/helpers/CaptchaPass.ts`) लौटाता है जिसे फ़ॉर्म हर guest धन कॉल के साथ भेजता है; `CAPTCHA_ENFORCE=true` के साथ API उस चर्च के लिए वैध pass के बिना guest `create-order`, `charge`, `subscribe`, `addcard`, और `ach-setup-intent-anon` कॉल को अस्वीकार करता है। Guest भुगतान वाले इवेंट पंजीकरण (`POST /content/registrations/register`) अपने charge से ठीक पहले वही pass जाँचते हैं; देखें [Event Registrations](./registrations.md#payment-flow)। Guest ACH गुमनाम `POST /giving/paymentmethods/ach-setup-intent-anon` का उपयोग करता है, जो केवल तत्काल (Financial Connections) सत्यापन की अनुमति देता है: एक microdeposit जाँच दिनों बाद पूरी होती है, guest पृष्ठ के चले जाने के बाद, इसलिए वह उपहार कभी पूरा नहीं हो सकता। फ़ॉर्म एक असत्यापित SetupIntent पर charge करने से इनकार करता है और दानकर्ता को कार्ड या साइन-इन बैंक सेटअप की ओर इंगित करता है।

तीन guest-फ़ॉर्म विकल्प एक ही charge कॉल पर चलते हैं। दान URL पर `?fundId=` और `?amount=` फंड विभाजन पूर्व-चयन करते हैं (हर प्रदाता का guest फ़ॉर्म माउंट पर पढ़ता है, सामान्य fund-change handler के माध्यम से, ताकि कुल और शुल्क अपडेट हों)। `anonymous: true` `DonateController.charge` को क्लाइंट द्वारा भेजे गए किसी भी व्यक्ति को त्यागने और उपहार को `personId = null` के साथ लॉग करने के लिए बनाता है; guest फ़ॉर्म `/people/loadOrCreate` और customer/vault चरण को छोड़ता है, और तीन तुरंत-लॉग प्रदाता gateway customer से व्यक्ति हल करना बंद कर देते हैं। Apple Pay को पृष्ठ के डोमेन का Stripe के साथ पंजीकृत होना आवश्यक है, इसलिए Stripe guest फ़ॉर्म सत्र में एक बार सार्वजनिक, दर-सीमित `POST /giving/donate/register-domain` पर पोस्ट करता है, जो केवल वह डोमेन स्वीकार करता है जो चर्च का है (`<subDomain>.b1.church`, content मॉड्यूल की domains तालिका में एक पंक्ति, या एक स्थानीय होस्ट) इससे पहले कि Stripe के payment-method-domains API को कॉल करे।

### एडमिन रिकॉर्डिंग और Stripe आयात (B1Admin)

B1Admin का दान अनुभाग (`B1Admin/src/donations/`) वह जगह है जहाँ वित्त टीमें काम करती हैं। बैच प्रविष्टि (`components/BulkDonationEntry.tsx`) नकद/चेक/वस्तु-रूप उपहार `/giving/donations` और फिर `/giving/funddonations` पोस्ट करके दर्ज करती है -- कोई gateway शामिल नहीं। व्यक्ति रिकॉर्ड की **Log a gift** शीट (`components/LogGiftDialog.tsx`) एक एकल उपहार के लिए भी यही करती है, पहले उस बैच को खोजकर जिसकी `batchDate` उपहार की तारीख से मेल खाती है या उस तारीख के नाम पर एक बनाकर (`POST /giving/donationbatches`), और बाद का चरण विफल होने पर दान/नया बैच फिर हटाकर। फंड, बैच, अभियान, और statements हर एक अपने `/giving/*` CRUD रूट से मैप होते हैं; giving statements पृष्ठ (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) चर्च के पूरे इतिहास के बजाय `GET /donations?startDate=&endDate=` और `GET /fundDonations?startDate=&endDate=` के साथ एक कैलेंडर वर्ष माँगते हैं, जो Lambda की response size सीमा से अधिक हो सकता था। सदस्य-शैली दान पैनल (`B1Admin/src/donationComponents/`) B1App के समान apphelper कंपोनेंट्स का पुन: उपयोग करता है।

रिपोर्टिंग और लेखा हस्तांतरण क्लाइंट-साइड या रिपोर्ट-रनर कार्य हैं, gateway कार्य नहीं: बैच पृष्ठ का QuickBooks निर्यात बैच के `donations` + `fundDonations` से एक journal-entry CSV बनाता है (Undeposited Funds पर डेबिट, हर फंड पर एक क्रेडिट), Summary पृष्ठ का Lapsed Givers दृश्य `Api/reports/lapsedGivers.json` को सामान्य रिपोर्ट-रनर के माध्यम से चलाता है जिसमें व्यक्ति नाम `ReportOutput` द्वारा हल होते हैं, और देश-विशिष्ट रसीद प्रारूप (कनाडा / ऑस्ट्रेलिया / न्यूज़ीलैंड) membership key/value store में चर्च सेटिंग्स हैं जिन्हें `GivingStatementDocument` रेंडर करता है और B1App प्रिंट पृष्ठ में डुप्लिकेट है। B1Admin के statement प्रिंट पृष्ठ (`PrintDonationPage`, `PrintAllStatementsPage`) चर्च की `logoLight` सेटिंग (`B1Admin/src/components/PrintChurchHeader.tsx` में `usePrintLogo` के माध्यम से) पास करते हैं ताकि लोगो हर statement के शीर्ष पर प्रिंट हो, और स्वतः-प्रिंट से पहले छवि की प्रतीक्षा करते हैं।

### बैच स्थिति और Enter Donations अनुमति

बैच बंद किए जा सकते हैं ताकि गिना गया जमा जैसा था वैसा रहे। `POST /giving/donationbatches/:id/close` और `/:id/reopen` (केवल Donations.Edit) `status`, `closedDate` और `closedBy` के एकमात्र लेखक हैं (`DonationBatchRepo.setStatus`); सामान्य बैच save उन्हें कभी नहीं छूता, इसलिए बैच पोस्ट करने से वह फिर नहीं खुलता। लिखने की पहुँच `Api/src/modules/giving/helpers/BatchAccessHelper.ts` में केंद्रीकृत है: Donations.Edit कुछ भी बदल सकता है, जबकि संकीर्ण Donations.Enter अनुमति (`GivingApi` / `Donations` / `Enter`, भूमिका संपादक में "Enter Donations") बैच बना सकती है और दान व फंड विभाजन सहेज या हटा सकती है केवल तब जब दान का वर्तमान बैच और उसका लक्ष्य बैच दोनों खुले हों, और कभी गेटवे उपहार (जिसमें `transactionId` हो) के लिए नहीं। अवरुद्ध लिखाई `403 { error: "This batch is closed." }` लौटाती है। बैच पढ़ना Donations.ViewSummary या Donations.Enter स्वीकार करता है ताकि गिनने वाला वह बैच चुन सके जिसमें वे प्रविष्टि कर रहे हैं। क्लाइंट पर, `B1Admin/src/donations/batchAccess.ts` इन नियमों को प्रतिबिंबित करता है (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), और `Header` / `SecondaryMenuHelper` **Donations > Batches** उसे दिखाते हैं जो बैच देख सकता है, भले ही View Summary न हो।

### मिश्रित-मुद्रा कुल का रूपांतरण

कोई भी endpoint जो संभवतः मिश्रित-मुद्रा उपहारों के एकल संयुक्त कुल लौटाता है -- giving summary KPIs (`GivingKpiCards`), बैच कुल, फंड कुल, और B1App दान स्क्रीन के वर्ष-से-अब/अवधि कुल -- असमान मुद्राओं को जोड़ने के बजाय सर्वर-साइड पर चर्च की डिफ़ॉल्ट मुद्रा में बदलता है। `Api/src/shared/helpers/ExchangeRateHelper.ts` चर्च मुद्रा द्वारा कुंजीबद्ध `api.frankfurter.dev` से दरें लाता है, उन्हें 12 घंटे के लिए प्रक्रिया-के-भीतर कैश करता है, और `convertTotals(rows, churchCurrency, rates)` देता है: पंक्तियाँ SQL में पहले से मुद्रा द्वारा समूहित होती हैं (कुछ समूह, कभी प्रति-उपहार रूपांतरण नहीं), हर समूह बदला और जोड़ा जाता है, और परिणाम एक `isConverted` फ़्लैग रखता है जिसे क्लाइंट "Converted at current exchange rates" नोट दिखाने के लिए उपयोग करता है। `GET /donations/exchange-rates` दर तालिका उन क्लाइंटों के लिए देता है जिन्हें इसकी ज़रूरत है (B1App की दान स्क्रीन); दरें कभी अनुरोध से स्वीकार नहीं होतीं, केवल सर्वर-साइड पर लाई जाती हैं, इसलिए क्लाइंट रिपोर्ट किए गए कुल को प्रभावित नहीं कर सकता। व्यक्तिगत दान रिकॉर्ड और ऐतिहासिक/मूल-मुद्रा रिपोर्ट कभी रूपांतरित नहीं होते -- केवल संयुक्त कुल।

Stripe आयात (`B1Admin/src/donations/StripeImportPage.tsx`) B1 के बाहर किए गए उपहारों को भरता है: यह पूर्वावलोकन के लिए `dryRun: true` के साथ `POST /giving/donate/replay-stripe-events` कॉल करता है, फिर आयात के लिए `dryRun: false`। सर्वर तारीख सीमा के लिए Stripe इवेंट सूचीबद्ध करता है और पहले से दर्ज किसी भी चीज़ को छोड़ता है -- पहले `eventLogs` provider id से, फिर transaction id से, फिर `DonationRepo.findMatchingDonation` (राशि + तारीख + व्यक्ति) से, ताकि दोबारा चलाने से दोहरा आयात न हो। सब्सक्रिप्शन `charge.succeeded` / `payment_intent.succeeded` इवेंट छोड़े जाते हैं क्योंकि `invoice.paid` वे उपहार दर्ज करता है; नए Stripe API संस्करण `PaymentIntent.invoice` हटा देते हैं, इसलिए छोड़ना "Subscription …" विवरण पर भी निर्भर करता है।

## Webhooks और पुनर्मिलान

निपटे हुए भुगतान और सब्सक्रिप्शन स्थिति परिवर्तन `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`) पर आते हैं। प्रसंस्करण जानबूझकर idempotent है:

1. **सत्यापित करें** -- `GatewayService.verifyWebhook` प्रदाता के हस्ताक्षर जाँच को सौंपता है; विफल हस्ताक्षर 401 लौटाता है। जिन इवेंट्स को प्रसंस्करण की ज़रूरत नहीं है वे 200 के साथ छोटे-रास्ते से निकल जाते हैं।
2. **इवेंट dedup करें** -- `EventLogRepo.loadByProviderId` वह webhook छोड़ता है जो पहले से `eventLogs` में दर्ज है।
3. **दान dedup करें** -- कुछ भी बनाने से पहले, `DonationRepo.loadByTransactionId` payload में हो सकने वाले हर उम्मीदवार id के विरुद्ध जाँचा जाता है। यह डुप्लिकेट डिलीवरी, बहु-चरण ACH इवेंट्स (pending → settled), और वह स्थिति समेटता है जहाँ `/donate/charge` पहले ही उपहार को आशावादी रूप से लॉग कर चुका है।
4. **लागू करें** -- प्रदाता का `classifyWebhookEvent(eventType)` बताता है कि इवेंट का क्या अर्थ है (`donation` pending/complete, `cancel-subscription`, या `ignore`); पूर्ण भुगतान एक `complete` दान बनाते हैं (या मौजूदा `pending` या `failed` को प्रमोट करते हैं), ACH-शैली इवेंट निपटान तक `pending` के रूप में आते हैं, एक विफल सब्सक्रिप्शन इनवॉइस (Stripe `invoice.payment_failed`) इनवॉइस id पर keyed `failed` दान बनाता है, और रद्दीकरण इवेंट स्थानीय `subscriptions` पंक्ति हटाते हैं। नियंत्रक कभी प्रदाता-विशिष्ट इवेंट नामों की जाँच नहीं करता।

### विफल आवर्ती उपहार और dunning

`failed` दान वसूली की इकाई है। `GET /giving/donations/failed` उन्हें gateway की नवीनतम विफलता संदेश `eventLogs` से और gateway क्षमताओं से `canRetry` फ़्लैग के साथ सूचीबद्ध करता है; `POST /giving/donate/retry/:donationId` प्रदाता के `retryFailedPayment` को कॉल करता है (Stripe खुला इनवॉइस भुगतान करता है), और परिणामी webhook सामान्य dedup पथ से पंक्ति को `complete` पर प्रमोट करता है। Dunning ईमेल दिन 0 पर webhook handler से दानकर्ता को जाते हैं, फिर 3 और 7 दिनों पर midnight timer (`lambda/timer-handler.ts` और `RailwayCron.ts` दोनों में वायर्ड) में `DunningHelper.run` से; हर भेजना `eventLogs` में `provider: "dunning"`, `providerId: "<donationId>:<day>"` के रूप में दर्ज होता है, ताकि दोबारा चलाने पर कभी दोबारा ईमेल न हो। जब Stripe हार मानकर सब्सक्रिप्शन रद्द करता है (`customer.subscription.deleted` जिसमें `cancellation_details.reason: "payment_failed"` हो), `DunningHelper.notifyCanceled` दानकर्ता को एक बार ईमेल करता है (`providerId: "<subscriptionId>:canceled"`); दानकर्ता या एडमिन द्वारा शुरू किए गए रद्दीकरण चुप रहते हैं। Stripe मौजूदा endpoint में कभी इवेंट नहीं जोड़ता: `StripeHelper.webhookEvents` बदलने के बाद, या तो gateway फिर से सहेजें या प्रोड के विरुद्ध `tools/manual/stripe-webhook-events.ts` चलाएँ (डिफ़ॉल्ट रूप से dry run, लिखने के लिए `--apply`)।

`logsDonationsImmediately` वाले प्रदाता (PayPal, Kingdom Funding, Paystack) का charge `/charge` प्रतिक्रिया से लॉग होता है (सफल पथ के लिए webhook राउंड-ट्रिप की ज़रूरत नहीं), जबकि Stripe `payment_intent.succeeded` / `invoice.paid` और ACH `payment_intent.processing` पर निर्भर है। शुल्क संभालना (`POST /giving/donate/fee`, `payFees` gateway फ़्लैग, और हर प्रदाता का `calculateFees`) दानकर्ता पक्ष पर "शुल्क कवर करें" gross-up की गणना करता है -- B1 कोई प्लेटफ़ॉर्म हिस्सा नहीं लेता, इसलिए कभी कोई application fee नहीं जोड़ी जाती।

:::info
charge और webhook पथ एक ही `donations` / `fundDonations` पंक्तियाँ लिखते हैं। `transactionId` वह join key है जो आशावादी charge लॉग और उसके बाद के webhook को एक ही उपहार के लिए दो दान बनने से रोकती है।
:::

## संबंधित पृष्ठ

- [Giving Endpoints](../api/endpoints/giving.md) -- दान, फंड, बैच, gateways, सब्सक्रिप्शन, भुगतान विधियों और webhooks के लिए पूर्ण REST सतह
- [AppHelper](../shared-libraries/app-helper.md) -- npm पैकेज जो payment provider रजिस्ट्री और दान कंपोनेंट्स भेजता है
- [Module Structure](../api/module-structure.md) -- GivingApi मॉड्यूल सर्वर-साइड पर कैसे व्यवस्थित है
