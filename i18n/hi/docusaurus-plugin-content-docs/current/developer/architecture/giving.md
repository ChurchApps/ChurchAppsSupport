---
title: "Giving आर्किटेक्चर"
---

# Giving आर्किटेक्चर

<div class="article-intro">

ChurchApps donations को एक gateway-rail मॉडल पर चलाता है: चर्च अपना खुद का Stripe (या PayPal, या Kingdom Funding) अकाउंट रखता है, और B1 कभी भी एक प्लेटफ़ॉर्म प्रोसेसर के रूप में पैसे के रास्ते में नहीं बैठता। कार्ड डेटा ब्राउज़र में टोकनाइज़ किया जाता है और कभी किसी ChurchApps सर्वर तक नहीं पहुँचता। यह पृष्ठ पूरे स्टैक को मैप करता है — `@churchapps/apphelper` में क्लाइंट-साइड प्रोवाइडर रजिस्ट्री, GivingApi गेटवे abstraction, donation डेटा मॉडल, और गेटवे वेबहुक्स डेटाबेस में वापस कैसे reconcile करते हैं।

</div>

## अवलोकन

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
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

1. **गेटवे कार्ड को रखता है।** हर प्रोवाइडर का entry widget ब्राउज़र में टोकनाइज़ करता है; API को कभी केवल एक token, nonce, या order id मिलता है।
2. **एक abstraction, कई प्रोवाइडर।** ब्राउज़र एक रजिस्ट्री से `PaymentProvider` को resolve करता है; सर्वर एक factory से `IGatewayProvider` को resolve करता है। दोनों गेटवे रिकॉर्ड पर स्टोर किए गए एक ही normalized प्रोवाइडर नाम पर key करते हैं।
3. **सेटलमेंट के लिए Webhooks सत्य का स्रोत हैं।** एक charge response optimistically रिकॉर्ड किया जाता है, लेकिन गेटवे का signed webhook ही है जो पूर्ण donation की पुष्टि करता है (या बनाता है), दोनों तरफ idempotency guards के साथ।

## क्लाइंट-साइड: पेमेंट प्रोवाइडर रजिस्ट्री (`@churchapps/apphelper`)

रजिस्ट्री `Packages/apphelper/src/donations/providers/` में रहती है, हर प्रोवाइडर के widgets और helpers अपने ही सबफ़ोल्डर के अंदर (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — `providers/` के बाहर कुछ भी किसी प्रोवाइडर नाम पर शाखा नहीं करता। एक `PaymentProvider` (देखें `providers/types.ts`) एक गेटवे के लिए एक host app को जो कुछ चाहिए वह सब bundle करता है: एक `descriptor` (admin लेबल, समर्थित मुद्राएँ, fee फ़ील्ड, डिफ़ॉल्ट fee दरें, dashboard/signup URLs), एक `capabilities` फ़्लैग सेट (saved कार्ड, ACH, recurring, inline new-card entry, implicit save-on-tokenize), member entry के लिए React widgets (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), saved-method editing (`MethodEditForm`), और form-question payments (`FormPayment`), साथ ही `buildChargeRequest(ctx, token)` — वह एकमात्र जगह जहाँ charge payload का shape प्रति प्रोवाइडर अलग होता है। हर प्रोवाइडर का `MemberWrapper` गेटवे रिकॉर्ड की public key से अपना SDK लोड करता है, इसलिए host apps कभी कोई गेटवे SDK import नहीं करते (B1App और B1Admin के पास कोई `@stripe/*` dependency नहीं है)। `pickDefaultGateway(gateways, capability?)` केंद्रीकृत करता है कि एक चर्च के कौन से गेटवे का उपयोग एक सतह को करना चाहिए।

`providers/registry.ts` built-ins को रखता है। इन्हें **value द्वारा संदर्भित किया जाता है**, module side-effect के माध्यम से रजिस्टर्ड नहीं, इसलिए एक bundler का tree-shaking कभी registration को drop नहीं कर सकता:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| फ़ंक्शन | उद्देश्य |
|----------|---------|
| `getPaymentProvider(name)` | normalized नाम से resolve करें; Stripe पर फ़ॉलबैक करता है ताकि एक misconfigured प्रोवाइडर कभी donor फ़ॉर्म को hard-crash न करे |
| `registerPaymentProvider(p)` | runtime पर एक अतिरिक्त प्रोवाइडर रजिस्टर करें (एक host app के कस्टम गेटवे के लिए) |
| `listPaymentProviders()` | built-ins + कस्टम को सूचीबद्ध करें — admin गेटवे dropdown बनाने के लिए उपयोग किया जाता है |
| `hasPaymentProvider(name)` | membership जाँच |

**Built-in क्लाइंट प्रोवाइडर: Stripe, PayPal, Kingdom Funding।** B1App और B1Admin केवल रजिस्ट्री को *पढ़ते* हैं (`getPaymentProvider`, `listPaymentProviders`); कोई भी `registerPaymentProvider` को कॉल नहीं करता — registration apphelper के अंदर ही रहता है।

हर प्रोवाइडर अलग तरीके से टोकनाइज़ करता है, लेकिन सभी कार्ड को B1 से बाहर रखते हैं:

| प्रोवाइडर | Entry widget | API को लौटाया गया Token |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | payment-method id (`pm_…`); Financial Connections / ACH SetupIntent के माध्यम से बैंक |
| Kingdom Funding | गेटवे public key द्वारा keyed hosted tokenizer फ़ॉर्म | single-use nonce |
| PayPal | PayPal Hosted Fields; `/donate/client-token` + `/donate/create-order` के माध्यम से बनाया गया सर्वर order | कैप्चर किया गया order id |

Stripe का `finalizeResult` donation को पूर्ण मानने से पहले ब्राउज़र में 3-D Secure / SCA चलाता है (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`); shared फ़ॉर्म बस `provider.finalizeResult(result)` को यह जाने बिना कॉल करता है कि यह क्या करता है।

## सर्वर-साइड: गेटवे abstraction (GivingApi)

`/giving` मॉड्यूल (`Api/src/modules/giving`) REST सतह को expose करता है; गेटवे plumbing `Api/src/shared/helpers` में रहती है। `DonateController` कभी सीधे किसी गेटवे SDK से बात नहीं करता — यह `GatewayService` से होकर जाता है, जो `GatewayFactory` से सही `IGatewayProvider` को resolve करता है और इसे एक decrypted `GatewayConfig` सौंपता है।

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) वह कॉन्ट्रैक्ट है जिसे हर गेटवे लागू करता है — webhook लाइफ़साइकल (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), पेमेंट (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), fees (`calculateFees`), saved-method हैंडलिंग (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), और वैकल्पिक extras (customers, orders, SetupIntents, event replay)। हर प्रोवाइडर क्लास अपना खुद का `capabilities` matrix घोषित करता है (समर्थित मुद्राएँ, ACH, refunds, subscription requirements, transaction limits) — `GatewayService.getProviderCapabilities(provider)` इसे बस पढ़ता है — और `logsDonationsImmediately` जैसे फ़्लैग कंट्रोलर के व्यवहार को बिना कंट्रोलरों में किसी provider-name conditional के ड्राइव करते हैं।

**`GatewayFactory` में रजिस्टर्ड सर्वर प्रोवाइडर:**

| प्रोवाइडर | उपलब्धता |
|----------|-------------|
| Stripe | हमेशा चालू |
| PayPal | हमेशा चालू |
| Kingdom Funding | हमेशा चालू |
| Square | `ENABLE_SQUARE` एनवायरनमेंट फ़्लैग के माध्यम से Opt-in |
| ePayMints | `ENABLE_EPAYMINTS` एनवायरनमेंट फ़्लैग के माध्यम से Opt-in |

जब `ENABLE_CUSTOM_GATEWAY_PROVIDERS` सेट हो तब कस्टम प्रोवाइडर runtime पर रजिस्टर किए जा सकते हैं; `AbstractExperimentalGatewayProvider` उनके लिए base क्लास है। प्रोवाइडर नामों को case-insensitively मैच किया जाता है।

### गेटवे कॉन्फ़िगरेशन और सीक्रेट्स

एक admin `POST /giving/gateways` (`GatewayController`) के माध्यम से गेटवे क्रेडेंशियल्स सेव करता है। सेव पर कंट्रोलर persist करने से पहले `EncryptionHelper` के साथ private और webhook keys को encrypt करता है, फिर — किसी भी non-localhost होस्ट पर — चर्च के मौजूदा webhook को डिलीट करता है और `/giving/donate/webhook/{provider}?churchId=…` पर पॉइंट किया हुआ एक नया provision करता है। Public reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) केवल public keys लौटाते हैं।

## डेटा मॉडल

Giving स्कीमा (`Api/src/modules/giving/db/DatabaseTypes.ts`, `models/` में models) Kysely के माध्यम से एक्सेस किया गया एक MySQL स्कीमा है:

| टेबल | भूमिका |
|-------|------|
| `gateways` | प्रति-चर्च प्रोवाइडर कॉन्फ़िग: `provider`, `publicKey`, encrypted `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giving नामाकरण (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Entry/reporting के लिए ग्रुपिंग (`name`, `batchDate`) |
| `donations` | एक gift: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | एक या अधिक funds में एक donation का आवंटन (`donationId`, `fundId`, `amount`) |
| `subscriptions` | आवर्ती gift; `id` गेटवे की subscription id है, `personId`, `customerId`, `gatewayId` से लिंक्ड |
| `subscriptionFunds` | एक आवर्ती gift के लिए fund split |
| `customers` | एक `personId` को उसके गेटवे customer id से लिंक करता है, प्रति `provider` |
| `gatewayPaymentMethods` | Saved कार्ड/बैंक: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/event audit trail और dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | एक fund से जुड़ी Pledge campaigns, और हर व्यक्ति की pledged राशि |

एक donation `fundDonations` के माध्यम से funds में split किया जाता है — donation कुल राशि carry करता है, हर `fundDonation` एक हिस्सा carry करता है। `donations.currency` और `gateways.currency` ISO मुद्रा carry करते हैं; हर प्रोवाइडर अपनी `supportedCurrencies` advertise करता है, और राशियों को `CurrencyHelper.formatCurrencyWithLocale` के साथ फ़ॉर्मैट किया जाता है।

## End-to-end फ़्लो

### Member एक-बार और आवर्ती (B1App)

Authenticated donate स्क्रीन (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) तीन apphelper components को compose करती है: `MultiGatewayDonationForm`, `PaymentMethods`, और `RecurringDonations`। B1App चारों ओर की data-loading करता है — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — और गेटवे सूची को आगे पास करता है; resolved प्रोवाइडर अपना SDK गेटवे की public key से लोड करता है। Charge खुद apphelper के अंदर होता है: resolved प्रोवाइडर (नए या saved) method को टोकनाइज़ करता है, फिर एक बार के gift के लिए `/giving/donate/charge` को या आवर्ती के लिए `/giving/donate/subscribe` को post करता है। आवर्ती gifts एक `subscriptions` रो प्लस `subscriptionFunds` बनाते हैं और शेड्यूल को गेटवे को सौंपते हैं (Stripe Subscriptions, PayPal Billing Plans, या एक KF आवर्ती शेड्यूल)।

### Guest / anonymous giving

Public donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) और "give now" panel `@churchapps/apphelper/website` से `NonAuthDonationWrapper` को render करते हैं, जो reCAPTCHA को inject करता है और गेटवे के Elements context को प्रोवाइडर के `GuestForm` के चारों ओर। Guests को कोई login, कोई saved methods, और कोई history नहीं मिलती। फ़्लो `GET /giving/funds/churchId/:id` और `GET /giving/donate/gateways/:churchId` (केवल public keys) को fetch करता है, विज़िटर को `POST /giving/donate/captcha-verify` से verify करता है, ब्राउज़र में टोकनाइज़ करता है, और `/giving/donate/charge` (या `/subscribe`) को post करता है। Guest ACH anonymous `POST /giving/paymentmethods/ach-setup-intent-anon` का उपयोग करता है।

### Admin रिकॉर्डिंग और Stripe import (B1Admin)

B1Admin donations सेक्शन (`B1Admin/src/donations/`) वह जगह है जहाँ finance टीमें काम करती हैं। Batch entry (`components/BulkDonationEntry.tsx`) `/giving/donations` फिर `/giving/funddonations` को post करके cash/check/in-kind gifts रिकॉर्ड करता है — कोई गेटवे शामिल नहीं। Funds, batches, campaigns, और statements हर एक अपने `/giving/*` CRUD routes से मैप होते हैं। Member-style donate panel (`B1Admin/src/donationComponents/`) B1App जैसे same apphelper components को दोबारा उपयोग करता है।

Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) B1 के बाहर की गई gifts को backfill करता है: यह preview के लिए `dryRun: true` के साथ `POST /giving/donate/replay-stripe-events` को कॉल करता है, फिर import करने के लिए `dryRun: false` के साथ। सर्वर date range के लिए Stripe events को सूचीबद्ध करता है और जो कुछ पहले से रिकॉर्ड हो चुका है उसे skip करता है — पहले `eventLogs` provider id से मैच किया जाता है, फिर `DonationRepo.findMatchingDonation` (amount + date + person) से ताकि एक re-run कभी double-import न करे।

## Webhooks और reconciliation

Settled payments और subscription state changes `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`) पर आते हैं। Processing जानबूझकर idempotent है:

1. **Verify** — `GatewayService.verifyWebhook` प्रोवाइडर की signature जाँच को delegate करता है; एक विफल signature 401 लौटाती है। जिन events को processing की ज़रूरत नहीं होती वे 200 के साथ short-circuit हो जाती हैं।
2. **Event को dedup करें** — `EventLogRepo.loadByProviderId` एक ऐसे webhook को skip करता है जो पहले से `eventLogs` में रिकॉर्ड है।
3. **Donation को dedup करें** — कुछ भी बनाने से पहले, `DonationRepo.loadByTransactionId` को हर उस candidate id के विरुद्ध चेक किया जाता है जो payload carry कर सकती है। यह duplicate deliveries, multi-stage ACH events (pending → settled), और उस स्थिति को absorb करता है जहाँ `/donate/charge` ने पहले ही gift को optimistically लॉग कर दिया था।
4. **Apply** — प्रोवाइडर का `classifyWebhookEvent(eventType)` बताता है कि event का क्या मतलब है (`donation` pending/complete, `cancel-subscription`, या `ignore`); पूर्ण payments एक `complete` donation बनाते हैं (या एक मौजूदा `pending` को promote करते हैं), ACH-style events settlement तक `pending` के रूप में रहते हैं, और cancellation events local `subscriptions` रो को डिलीट करते हैं। कंट्रोलर कभी प्रोवाइडर-specific event नामों की जाँच नहीं करता।

`logsDonationsImmediately` वाले प्रोवाइडर (PayPal, Kingdom Funding) के charges `/charge` response से लॉग होते हैं (happy path के लिए कोई webhook round-trip आवश्यक नहीं), जबकि Stripe `payment_intent.succeeded` / `invoice.paid` और ACH `payment_intent.processing` पर निर्भर करता है। Fee handling (`POST /giving/donate/fee`, `payFees` गेटवे फ़्लैग, और हर प्रोवाइडर की `calculateFees`) donor साइड पर "fees को cover करें" gross-up की गणना करती है — B1 कोई प्लेटफ़ॉर्म कट नहीं लेता, इसलिए कभी कोई application fee नहीं जोड़ी जाती।

:::info
Charge और webhook पाथ एक ही `donations` / `fundDonations` rows लिखते हैं। `transactionId` वह join key है जो एक optimistic charge log और उसके बाद के webhook को एक gift के लिए दो donations बनाने से रोकता है।
:::

## संबंधित पृष्ठ

- [Giving Endpoints](../api/endpoints/giving) — donations, funds, batches, gateways, subscriptions, payment methods, और webhooks के लिए पूर्ण REST सतह
- [AppHelper](../shared-libraries/app-helper) — वह npm पैकेज जो payment provider रजिस्ट्री और donation components को शिप करता है
- [Module Structure](../api/module-structure) — GivingApi मॉड्यूल को सर्वर-साइड कैसे व्यवस्थित किया जाता है
