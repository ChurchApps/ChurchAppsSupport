---
title: "Giving आर्किटेक्चर"
---

# Giving आर्किटेक्चर

<div class="article-intro">

ChurchApps दान को एक gateway-rail मॉडल पर चलाता है: चर्च अपना Stripe (या PayPal, Kingdom Funding, या Paystack) खाता रखता है, और B1 कभी platform processor के रूप में money path में नहीं बैठता। कार्ड डेटा ब्राउज़र में tokenize होता है और कभी ChurchApps सर्वर तक नहीं पहुँचता। यह पृष्ठ पूरे स्टैक को मैप करता है -- `@churchapps/apphelper` में client-side provider registry, GivingApi gateway abstraction, दान data model, और gateway webhooks डेटाबेस में कैसे reconcile होते हैं।

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

1. **गेटवे कार्ड रखता है।** हर provider का entry widget ब्राउज़र में tokenize करता है; API को केवल एक token, nonce, या order id मिलता है।
2. **एक abstraction, कई providers।** ब्राउज़र registry से एक `PaymentProvider` हल करता है; सर्वर factory से एक `IGatewayProvider` हल करता है। दोनों उसी normalized provider नाम पर आधारित होते हैं जो gateway रिकॉर्ड पर संग्रहीत है।
3. **Settlement के लिए webhooks ही सत्य का स्रोत हैं।** charge response आशावादी रूप से दर्ज होता है, लेकिन gateway का signed webhook ही पूर्ण दान की पुष्टि (या निर्माण) करता है, दोनों तरफ idempotency guards के साथ।

## Client-side: payment provider registry (`@churchapps/apphelper`)

registry `Packages/apphelper/src/donations/providers/` में रहती है, हर provider के widgets और helpers अपने subfolder के अंतर्गत (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- `providers/` के बाहर कुछ भी provider नाम पर branch नहीं करता। एक `PaymentProvider` (`providers/types.ts` देखें) एक gateway के लिए host app को चाहिए सब कुछ बंडल करता है: एक `descriptor` (admin लेबल, समर्थित मुद्राएँ, fee फ़ील्ड, डिफ़ॉल्ट fee दरें, dashboard/signup URLs), एक `capabilities` flag set (saved cards, ACH, recurring, inline new-card entry, implicit save-on-tokenize), member entry (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), saved-method संपादन (`MethodEditForm`), और form-question payments (`FormPayment`) के लिए React widgets, साथ में `buildChargeRequest(ctx, token)` -- वह एक जगह जहाँ charge payload का आकार provider-दर-provider अलग होता है। हर provider का `MemberWrapper` gateway रिकॉर्ड की public key से अपना SDK लोड करता है, इसलिए host apps कभी gateway SDK import नहीं करते (B1App और B1Admin में `@stripe/*` dependency नहीं है)। `pickDefaultGateway(gateways, capability?)` केंद्रीकृत करता है कि किसी सतह को चर्च के कौन से gateway का उपयोग करना चाहिए।

`providers/registry.ts` built-ins रखता है। इन्हें एक module side-effect के माध्यम से register नहीं किया जाता, बल्कि **value द्वारा reference** किया जाता है, ताकि bundler का tree-shaking कभी registration को न हटा सके:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Function | उद्देश्य |
|----------|---------|
| `getPaymentProvider(name)` | normalized नाम से हल करें; Stripe पर fallback करता है ताकि एक गलत कॉन्फ़िगर provider कभी donor फ़ॉर्म को hard-crash न करे |
| `registerPaymentProvider(p)` | runtime पर एक अतिरिक्त provider register करें (host app के custom gateway के लिए) |
| `listPaymentProviders()` | built-ins + custom की सूची -- admin gateway dropdown बनाने के लिए उपयोग |
| `hasPaymentProvider(name)` | सदस्यता जाँच |

**Built-in client providers: Stripe, PayPal, Kingdom Funding, Paystack।** B1App और B1Admin registry को केवल *पढ़ते* हैं (`getPaymentProvider`, `listPaymentProviders`); कोई भी `registerPaymentProvider` नहीं बुलाता -- registration apphelper के भीतर ही रहती है।

हर provider अलग तरह से tokenize करता है, लेकिन सभी कार्ड को B1 से बाहर रखते हैं:

| Provider | Entry widget | API को लौटाया गया token |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; guest फ़ॉर्म एक `ExpressCheckoutElement` (Apple Pay / Google Pay, एक-बार उपहार) भी माउंट करता है जिसका `onConfirm` उसी `pm_…` id पर हल होता है | payment-method id (`pm_…`); bank `/paymentmethods/ach-setup-intent` के माध्यम से -- USD gateways के लिए Financial Connections `us_bank_account`, CAD gateways के लिए कनाडाई PAD `acss_debit` (hosted mandate modal, mandate `default_for` invoices/subscriptions, एक-बार charges mandate id पास करते हैं) |
| Kingdom Funding | gateway public key द्वारा कुंजीबद्ध hosted tokenizer form | एक-बार उपयोग nonce |
| PayPal | PayPal Hosted Fields (card, recurring) plus Venmo funding वाले PayPal Smart Buttons (एक-बार); दोनों एक SDK load साझा करते हैं और सर्वर order `/donate/client-token` + `/donate/create-order` के माध्यम से बनता है | captured order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) -- popup स्वयं भुगतान लेता है (card, mobile money, bank transfer, USSD); saved methods Paystack `AUTH_…` authorization codes हैं | भुगतान किया गया transaction reference |

Stripe का `finalizeResult` दान पूर्ण माने जाने से पहले ब्राउज़र में 3-D Secure / SCA चलाता है (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`); साझा फ़ॉर्म केवल `provider.finalizeResult(result)` कॉल करता है, बिना जाने कि वह क्या करता है।

## Server-side: gateway abstraction (GivingApi)

`/giving` module (`Api/src/modules/giving`) REST surface देता है; gateway plumbing `Api/src/shared/helpers` में रहता है। `DonateController` कभी सीधे gateway SDK से बात नहीं करता -- वह `GatewayService` के माध्यम से जाता है, जो `GatewayFactory` से सही `IGatewayProvider` हल करता है और उसे एक decrypted `GatewayConfig` देता है।

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) वह contract है जिसे हर gateway लागू करता है -- webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), भुगतान (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), fees (`calculateFees`), saved-method संभालना (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), और वैकल्पिक extras (customers, orders, SetupIntents, event replay, विफल subscription invoice के लिए `retryFailedPayment`, Apple Pay domain verification के लिए `registerPaymentMethodDomain`)। जो provider कोई वैकल्पिक hook छोड़ता है, उसे उस action के लिए unsupported रिपोर्ट किया जाता है और UI नियंत्रण छिपा देता है। हर provider class अपना `capabilities` matrix घोषित करती है (समर्थित मुद्राएँ, ACH, refunds, subscription आवश्यकताएँ, लेनदेन सीमाएँ) -- `GatewayService.getProviderCapabilities(provider)` केवल उसे पढ़ता है -- और `logsDonationsImmediately` जैसे flags controllers के व्यवहार को बिना किसी provider-नाम शर्त के चलाते हैं।

**`GatewayFactory` में पंजीकृत सर्वर providers:**

| Provider | उपलब्धता |
|----------|-------------|
| Stripe | हमेशा चालू |
| PayPal | हमेशा चालू |
| Kingdom Funding | हमेशा चालू |
| Paystack | हमेशा चालू (नाइजीरिया, घाना, दक्षिण अफ़्रीका, केन्या, कोत डी'आइवर के व्यापारी; मुद्राएँ NGN/GHS/ZAR/KES/XOF/USD) |
| Square | `ENABLE_SQUARE` environment flag के माध्यम से opt-in |
| ePayMints | `ENABLE_EPAYMINTS` environment flag के माध्यम से opt-in |

Paystack अन्य से इस मायने में अलग है कि GivingApi शामिल होने से पहले पैसा चलता है: popup दाता से चार्ज करता है, `processCharge` एक `GET /transaction/verify/:reference` है जिसकी भुगतान राशि और मुद्रा उस दान से मेल खानी चाहिए जो दर्ज हो रहा है (जो reference पहले से दर्ज है उसे कभी दोबारा नहीं लिखा जाता), और एक आवर्ती शेड्यूल का पहला उपहार `finalizeSubscription` से लॉग होता है (verify → `POST /plan` → `POST /subscription` जिसका `start_date` एक interval आगे है)। webhooks secret key से ही signed होते हैं (`x-paystack-signature`, raw body पर HMAC-SHA512), और Paystack में webhook-management API नहीं है, इसलिए admin स्क्रीन URL दिखाती है ताकि चर्च उसे अपने dashboard में चिपका सके। नवीनीकरण `charge.success` इवेंट में कोई fund split नहीं होता; provider उसे दाता की स्थानीय `subscriptions`/`subscriptionFunds` पंक्तियों से पुनः प्राप्त करता है। केवल card authorizations `reusable` हैं -- mobile money उपहार केवल एक-बार होते हैं, इसलिए `createSubscription` उन्हें अस्वीकार करता है। डेमो डेटा एक दूसरा चर्च (Accra Community Church, `CHU00000002`) बोता है, जो एक Paystack test-mode GHS gateway पर है, ताकि Paystack Playwright suite Grace वाले Stripe suite के साथ चल सके।

Custom providers `ENABLE_CUSTOM_GATEWAY_PROVIDERS` सेट होने पर runtime पर register हो सकते हैं; `AbstractExperimentalGatewayProvider` उनके लिए base class है। provider नाम case-insensitive रूप से मिलाए जाते हैं।

### Gateway कॉन्फ़िगरेशन और secrets

एक admin `POST /giving/gateways` (`GatewayController`) के माध्यम से gateway credentials सहेजता है। सेव होने पर controller persist करने से पहले `EncryptionHelper` से private और webhook keys को एन्क्रिप्ट करता है, फिर -- किसी भी non-localhost host पर -- चर्च के मौजूदा webhook को हटाता है और `/giving/donate/webhook/{provider}?churchId=…` की ओर इशारा करता हुआ नया provision करता है। एक चर्च हर provider के लिए एक पंक्ति रखता है: gateway सहेजने से केवल उसी provider की मौजूदा पंक्ति बदलती है। सार्वजनिक reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) केवल public keys लौटाते हैं।

## Data model

giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, models `models/` में) एक MySQL schema है जो Kysely के माध्यम से एक्सेस होती है:

| Table | भूमिका |
|-------|------|
| `gateways` | प्रति-चर्च provider कॉन्फ़िग: `provider`, `publicKey`, एन्क्रिप्टेड `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | दान के उद्देश्य (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | प्रविष्टि/रिपोर्टिंग के लिए समूहीकरण (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | एक उपहार: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; statements, totals, dashboards, और donation reports केवल `complete` या null गिनते हैं), `transactionId` |
| `fundDonations` | एक या अधिक फंड में दान का आवंटन (`donationId`, `fundId`, `amount`) |
| `subscriptions` | आवर्ती उपहार; `id` gateway की subscription id है, `personId`, `customerId`, `gatewayId` से जुड़ी |
| `subscriptionFunds` | आवर्ती उपहार का फंड विभाजन |
| `customers` | `personId` को प्रति `provider` उसकी gateway customer id से जोड़ता है |
| `gatewayPaymentMethods` | संग्रहीत कार्ड/बैंक: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | webhook/event ऑडिट ट्रेल और dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | फंड से जुड़ी pledge campaigns, और हर व्यक्ति की pledged राशि |

एक दान `fundDonations` के माध्यम से फंड्स में विभाजित होता है -- दान में कुल होता है, हर `fundDonation` उसका एक हिस्सा रखता है। `donations.currency` और `gateways.currency` ISO मुद्रा रखते हैं; हर provider अपनी `supportedCurrencies` बताता है, और राशियाँ `CurrencyHelper.formatCurrencyWithLocale` से formatted होती हैं।

## अंत-से-अंत प्रवाह

### सदस्य का एक-बार और आवर्ती दान (B1App)

प्रमाणित donate स्क्रीन (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) तीन apphelper components को जोड़ती है: `MultiGatewayDonationForm`, `PaymentMethods`, और `RecurringDonations`। B1App आसपास का डेटा लोड करता है -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- और gateway सूची पास करता है; हल किया गया provider gateway की public key से अपना SDK लोड करता है। चार्ज स्वयं apphelper के भीतर होता है: हल किया गया provider (नया या सहेजा गया) method को tokenize करता है, फिर एक-बार उपहार के लिए `/giving/donate/charge` या आवर्ती के लिए `/giving/donate/subscribe` पर पोस्ट करता है। दोनों endpoints हस्ताक्षरित दाता को उनके अपने `personId` से जोड़ते हैं (केवल `donations.edit` धारक किसी और को जोड़ सकते हैं), और उन फंड विभाजनों को अस्वीकार करते हैं जिनका योग चार्ज की गई राशि से अधिक हो। आवर्ती उपहार एक `subscriptions` पंक्ति के साथ `subscriptionFunds` बनाते हैं और शेड्यूल को gateway को सौंपते हैं (Stripe Subscriptions, PayPal Billing Plans, या KF recurring schedule)।

### अतिथि / गुमनाम दान

सार्वजनिक donate पृष्ठ (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) और "give now" पैनल `@churchapps/apphelper/website` से `NonAuthDonationWrapper` रेंडर करते हैं, जो provider के `GuestForm` के चारों ओर reCAPTCHA और gateway का Elements context इंजेक्ट करता है। अतिथियों को कोई login, saved methods, या इतिहास नहीं मिलता। प्रवाह `GET /giving/funds/churchId/:id` और `GET /giving/donate/gateways/:churchId` (केवल public keys) लाता है, आगंतुक को `POST /giving/donate/captcha-verify` से सत्यापित करता है, ब्राउज़र में tokenize करता है, और `/giving/donate/charge` (या `/subscribe`) पर पोस्ट करता है। verify कॉल 10-मिनट का HMAC-हस्ताक्षरित `captchaPass` (`Api/src/modules/giving/helpers/CaptchaPass.ts`) लौटाता है जिसे फ़ॉर्म हर अतिथि money कॉल के साथ भेजता है; `CAPTCHA_ENFORCE=true` के साथ API उस चर्च के लिए वैध pass के बिना अतिथि `create-order`, `charge`, `subscribe`, `addcard`, और `ach-setup-intent-anon` कॉल अस्वीकार करता है। अतिथि ACH गुमनाम `POST /giving/paymentmethods/ach-setup-intent-anon` का उपयोग करता है, जो केवल तत्काल (Financial Connections) सत्यापन की अनुमति देता है: माइक्रोडिपॉज़िट जाँच दिनों बाद पूरी होती है, जब अतिथि पृष्ठ जा चुका होता है, इसलिए वह उपहार कभी पूरा नहीं हो सकता। फ़ॉर्म किसी असत्यापित SetupIntent पर चार्ज करने से इनकार करता है और दाता को कार्ड या साइन-इन बैंक सेटअप की ओर भेजता है।

तीन guest-form विकल्प उसी charge कॉल पर चलते हैं। donate URL पर `?fundId=` और `?amount=` फंड विभाजन को पहले से चुनते हैं (हर provider का guest फ़ॉर्म माउंट पर पढ़ता है, और सामान्य fund-change handler से गुज़ारता है ताकि totals और fees अपडेट हों)। `anonymous: true` `DonateController.charge` को क्लाइंट द्वारा भेजे गए किसी भी व्यक्ति को हटाने और उपहार को `personId = null` के साथ लॉग करने का कारण बनता है; guest फ़ॉर्म `/people/loadOrCreate` और customer/vault चरण छोड़ता है, और तीन तत्काल-लॉग providers gateway customer से व्यक्ति हल करना बंद करते हैं। Apple Pay के लिए पृष्ठ का डोमेन Stripe में पंजीकृत होना चाहिए, इसलिए Stripe guest फ़ॉर्म प्रति सत्र एक बार सार्वजनिक, दर-सीमित `POST /giving/donate/register-domain` पर पोस्ट करता है, जो केवल चर्च के अपने डोमेन स्वीकार करता है (`<subDomain>.b1.church`, content module की domains तालिका की एक पंक्ति, या एक local host) और फिर Stripe के payment-method-domains API को कॉल करता है।

### एडमिन रिकॉर्डिंग और Stripe import (B1Admin)

B1Admin का donations अनुभाग (`B1Admin/src/donations/`) वह जगह है जहाँ finance टीमें काम करती हैं। बैच प्रविष्टि (`components/BulkDonationEntry.tsx`) `/giving/donations` और फिर `/giving/funddonations` पोस्ट करके नकद/चेक/in-kind उपहार दर्ज करती है -- कोई gateway शामिल नहीं। व्यक्ति रिकॉर्ड की **Log a gift** शीट (`components/LogGiftDialog.tsx`) एक एकल उपहार के लिए भी यही करती है, पहले वह बैच खोजती है जिसकी `batchDate` उपहार की तारीख से मेल खाती है या उस तारीख के नाम पर एक बनाती है (`POST /giving/donationbatches`), और यदि बाद का चरण विफल हो तो दान/नया बैच फिर से हटा देती है। फंड, बैच, campaigns, और statements हर एक अपने `/giving/*` CRUD routes से मैप होते हैं; giving statements पृष्ठ (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) चर्च के पूरे इतिहास के बजाय `GET /donations?startDate=&endDate=` और `GET /fundDonations?startDate=&endDate=` से एक कैलेंडर वर्ष माँगते हैं, जो Lambda की response size सीमा से अधिक हो सकता था। member-शैली donate पैनल (`B1Admin/src/donationComponents/`) B1App के समान apphelper components का पुन: उपयोग करता है।

रिपोर्टिंग और लेखा हस्तांतरण क्लाइंट-side या report-runner का काम हैं, gateway का नहीं: बैच पृष्ठ का QuickBooks export बैच के `donations` + `fundDonations` से एक journal-entry CSV बनाता है (Undeposited Funds पर debit, हर फंड पर एक credit), Summary पृष्ठ का Lapsed Givers दृश्य `Api/reports/lapsedGivers.json` को generic report runner के माध्यम से चलाता है जिसमें व्यक्ति के नाम `ReportOutput` द्वारा हल होते हैं, और देश-विशिष्ट रसीद फ़ॉर्मेट (Canada / Australia / New Zealand) membership की key/value store में चर्च सेटिंग्स हैं जो `GivingStatementDocument` से रेंडर होती हैं और B1App के print पृष्ठ में दोहराई जाती हैं। B1Admin के statement print पृष्ठ (`PrintDonationPage`, `PrintAllStatementsPage`) चर्च की `logoLight` सेटिंग (`B1Admin/src/components/PrintChurchHeader.tsx` में `usePrintLogo` के माध्यम से) पास करते हैं ताकि हर statement के शीर्ष पर लोगो प्रिंट हो, और स्वचालित प्रिंट से पहले छवि की प्रतीक्षा करते हैं।

### बैच स्थिति और Enter Donations अनुमति

बैच बंद किए जा सकते हैं ताकि गिना गया जमा जैसा था वैसा ही रहे। `POST /giving/donationbatches/:id/close` और `/:id/reopen` (केवल Donations.Edit) `status`, `closedDate` और `closedBy` के एकमात्र लेखक हैं (`DonationBatchRepo.setStatus`); सामान्य बैच सेव इन्हें कभी नहीं छूता, इसलिए बैच पोस्ट करने से वह फिर से नहीं खुलता। लिखने की पहुँच `Api/src/modules/giving/helpers/BatchAccessHelper.ts` में केंद्रीकृत है: Donations.Edit कुछ भी बदल सकता है, जबकि संकीर्ण Donations.Enter अनुमति (`GivingApi` / `Donations` / `Enter`, भूमिका संपादक में "Enter Donations") बैच बना सकती है और दान तथा फंड विभाजन केवल तभी सहेज या हटा सकती है जब दान का वर्तमान बैच और उसका लक्ष्य बैच दोनों खुले हों, और कभी gateway उपहार (जिसमें `transactionId` हो) के लिए नहीं। अवरुद्ध लेखन `403 { error: "This batch is closed." }` लौटाता है। बैच पढ़ना Donations.ViewSummary या Donations.Enter स्वीकार करता है, ताकि एक गिनती करने वाला वह बैच चुन सके जिसमें वह प्रविष्टि कर रहा है। क्लाइंट पर, `B1Admin/src/donations/batchAccess.ts` इन नियमों को प्रतिबिंबित करता है (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), और `Header` / `SecondaryMenuHelper` **Donations > Batches** को उन सभी को दिखाते हैं जो बैच देख सकते हैं, भले ही View Summary न हो।

### मिश्रित-मुद्रा कुलों को परिवर्तित करना

कोई भी endpoint जो संभवतः मिश्रित-मुद्रा उपहारों पर एकल संयुक्त कुल लौटाता है -- giving summary KPIs (`GivingKpiCards`), एक बैच कुल, एक फंड कुल, और B1App donate स्क्रीन के वर्ष-से-आज/अवधि कुल -- असमान मुद्राएँ जोड़ने के बजाय सर्वर-side पर चर्च की डिफ़ॉल्ट मुद्रा में परिवर्तित करता है। `Api/src/shared/helpers/ExchangeRateHelper.ts` चर्च मुद्रा से keyed दरें `api.frankfurter.dev` से लाता है, उन्हें 12 घंटे के लिए process में cache करता है, और `convertTotals(rows, churchCurrency, rates)` expose करता है: पंक्तियाँ SQL में मुद्रा के अनुसार पहले से समूहित होती हैं (कुछ समूह, कभी प्रति-उपहार परिवर्तन नहीं), हर समूह परिवर्तित और जोड़ा जाता है, और परिणाम एक `isConverted` flag रखता है जिसे client "Converted at current exchange rates" नोट दिखाने के लिए उपयोग करता है। `GET /donations/exchange-rates` दर तालिका को उन clients के लिए expose करता है जिन्हें इसकी आवश्यकता है (B1App का donate स्क्रीन); दरें कभी अनुरोध से स्वीकार नहीं की जातीं, केवल सर्वर-side पर लाई जाती हैं, इसलिए क्लाइंट रिपोर्ट किए गए कुल को प्रभावित नहीं कर सकता। व्यक्तिगत दान रिकॉर्ड और ऐतिहासिक/मूल-मुद्रा रिपोर्ट कभी परिवर्तित नहीं होते -- केवल संयुक्त कुल।

Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) B1 के बाहर किए गए उपहारों को बैकफ़िल करता है: यह पूर्वावलोकन के लिए `dryRun: true` के साथ `POST /giving/donate/replay-stripe-events` कॉल करता है, फिर आयात के लिए `dryRun: false`। सर्वर तिथि सीमा के लिए Stripe इवेंट सूचीबद्ध करता है और जो पहले से दर्ज है उसे छोड़ देता है -- पहले `eventLogs` provider id से, फिर transaction id से, फिर `DonationRepo.findMatchingDonation` (राशि + तारीख + व्यक्ति) से मिलान होता है, ताकि दोबारा चलाने पर डबल आयात न हो। subscription `charge.succeeded` / `payment_intent.succeeded` इवेंट छोड़े जाते हैं क्योंकि उन उपहारों को `invoice.paid` दर्ज करता है; नए Stripe API versions `PaymentIntent.invoice` हटा देते हैं, इसलिए छोड़ना "Subscription …" विवरण पर भी निर्भर करता है।

## Webhooks और reconciliation

निपटाए गए भुगतान और subscription स्थिति परिवर्तन `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`) पर आते हैं। प्रसंस्करण जानबूझकर idempotent है:

1. **सत्यापित करें** -- `GatewayService.verifyWebhook` provider की signature जाँच को सौंपता है; विफल signature 401 लौटाता है। जिन इवेंट को प्रसंस्करण की आवश्यकता नहीं, वे 200 पर short-circuit होते हैं।
2. **इवेंट को dedup करें** -- `EventLogRepo.loadByProviderId` वह webhook छोड़ता है जो `eventLogs` में पहले से दर्ज है।
3. **दान को dedup करें** -- कुछ भी बनाने से पहले, `DonationRepo.loadByTransactionId` को हर उस candidate id के विरुद्ध जाँचा जाता है जो payload में हो सकती है। यह duplicate deliveries, बहु-चरणीय ACH इवेंट (pending → settled), और उस स्थिति को संभालता है जहाँ `/donate/charge` ने पहले ही उपहार आशावादी रूप से लॉग कर दिया हो।
4. **लागू करें** -- provider का `classifyWebhookEvent(eventType)` बताता है कि इवेंट का अर्थ क्या है (`donation` pending/complete, `cancel-subscription`, या `ignore`); पूर्ण भुगतान एक `complete` दान बनाते हैं (या मौजूदा `pending` या `failed` को प्रमोट करते हैं), ACH-शैली इवेंट settlement तक `pending` के रूप में आते हैं, एक विफल subscription invoice (Stripe `invoice.payment_failed`) invoice id पर कुंजीबद्ध `failed` दान बनाता है, और रद्दीकरण इवेंट स्थानीय `subscriptions` पंक्ति हटाते हैं। controller कभी provider-विशिष्ट इवेंट नामों की जाँच नहीं करता।

### विफल आवर्ती उपहार और dunning

एक `failed` दान वसूली की इकाई है। `GET /giving/donations/failed` उन्हें `eventLogs` से नवीनतम gateway विफलता संदेश और gateway की capabilities से `canRetry` flag के साथ सूचीबद्ध करता है; `POST /giving/donate/retry/:donationId` provider के `retryFailedPayment` को कॉल करता है (Stripe खुला invoice चुकाता है), और परिणामी webhook सामान्य dedup पथ से पंक्ति को `complete` पर प्रमोट करता है। Dunning ईमेल दिन 0 पर webhook handler से दाता को जाते हैं, फिर मध्यरात्रि timer (`lambda/timer-handler.ts` और `RailwayCron.ts` दोनों में जुड़ा) में `DunningHelper.run` से दिन 3 और 7 पर; हर भेजना `eventLogs` में `provider: "dunning"`, `providerId: "<donationId>:<day>"` के रूप में दर्ज होता है, ताकि दोबारा चलाने पर दो बार ईमेल न जाए। जब Stripe हार मानकर subscription रद्द करता है (`customer.subscription.deleted` with `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` दाता को एक बार ईमेल करता है (`providerId: "<subscriptionId>:canceled"`); दाता या एडमिन द्वारा शुरू किए गए रद्दीकरण चुप रहते हैं। Stripe मौजूदा endpoint में कभी इवेंट नहीं जोड़ता: `StripeHelper.webhookEvents` बदलने के बाद, या तो gateway फिर से सहेजें या production के विरुद्ध `tools/manual/stripe-webhook-events.ts` चलाएँ (डिफ़ॉल्ट रूप से dry run, लिखने के लिए `--apply`)।

`logsDonationsImmediately` वाले providers (PayPal, Kingdom Funding, Paystack) के charges `/charge` response से लॉग होते हैं (happy path के लिए webhook round-trip आवश्यक नहीं), जबकि Stripe `payment_intent.succeeded` / `invoice.paid` और ACH `payment_intent.processing` पर निर्भर है। Fee संभालना (`POST /giving/donate/fee`, gateway flag `payFees`, और हर provider का `calculateFees`) दाता की ओर "fees कवर करें" gross-up की गणना करता है -- B1 कोई platform cut नहीं लेता, इसलिए कभी कोई application fee नहीं जोड़ी जाती।

:::info
charge और webhook पथ एक ही `donations` / `fundDonations` पंक्तियाँ लिखते हैं। `transactionId` join key है जो एक ही उपहार के लिए आशावादी charge log और उसके बाद के webhook को दो दान बनाने से रोकता है।
:::

## संबंधित पृष्ठ

- [Giving Endpoints](../api/endpoints/giving) — दान, फंड, बैच, gateways, subscriptions, payment methods, और webhooks के लिए पूर्ण REST surface
- [AppHelper](../shared-libraries/app-helper) — npm package जो payment provider registry और donation components भेजता है
- [Module Structure](../api/module-structure) — GivingApi module server-side पर कैसे व्यवस्थित है
