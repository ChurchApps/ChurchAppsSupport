---
title: "Giving आर्किटेक्चर"
---

# Giving आर्किटेक्चर

<div class="article-intro">

ChurchApps donations को gateway-rail मॉडल पर चलाता है: church अपना Stripe (या PayPal, Kingdom Funding, या Paystack) account रखता है, और B1 कभी भी money path में platform processor के रूप में नहीं आता। Card data browser में tokenize होता है और कभी ChurchApps server तक नहीं पहुंचता। यह पेज पूरे stack को map करता है — `@churchapps/apphelper` में client-side provider registry, GivingApi gateway abstraction, donation data model, और gateway webhooks कैसे database में reconcile होते हैं।

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

इस पूरे stack के पीछे तीन सिद्धांत हैं:

1. **Gateway card रखता है।** हर provider का entry widget browser में tokenize करता है; API को केवल एक token, nonce, या order id मिलता है।
2. **एक abstraction, कई providers।** browser एक registry से `PaymentProvider` resolve करता है; server एक factory से `IGatewayProvider` resolve करता है। दोनों एक ही normalized provider name पर चलते हैं, जो gateway record पर सहेजा जाता है।
3. **Settlement के लिए webhooks ही source of truth हैं।** charge response optimistically रिकॉर्ड होता है, लेकिन gateway का signed webhook ही completed donation की पुष्टि करता है (या उसे बनाता है), और दोनों तरफ idempotency guards होते हैं।

## Client-side: payment provider registry (`@churchapps/apphelper`)

registry `Packages/apphelper/src/donations/providers/` में है, जहां हर provider के widgets और helpers उसके अपने subfolder में हैं (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — `providers/` के बाहर कुछ भी provider name पर branch नहीं करता। `PaymentProvider` (देखें `providers/types.ts`) एक gateway के लिए host app को जो कुछ चाहिए वह सब बंडल करता है: एक `descriptor` (admin labels, समर्थित currencies, fee fields, default fee rates, dashboard/signup URLs), एक `capabilities` flag set (saved cards, ACH, recurring, inline new-card entry, implicit save-on-tokenize), member entry के लिए React widgets (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), saved-method editing (`MethodEditForm`), और form-question payments (`FormPayment`), साथ ही `buildChargeRequest(ctx, token)` — वह एक जगह जहां charge payload का आकार हर provider के लिए अलग होता है। हर provider का `MemberWrapper` gateway record की public key से अपना SDK लोड करता है, इसलिए host apps कभी gateway SDK import नहीं करते (B1App और B1Admin में कोई `@stripe/*` dependency नहीं है)। `pickDefaultGateway(gateways, capability?)` यह केंद्रीकृत करता है कि किसी surface के लिए church के कौन-से gateway का उपयोग हो।

`providers/registry.ts` built-ins रखता है। उन्हें **value के रूप में reference** किया जाता है, module side-effect के जरिए register नहीं किया जाता, इसलिए bundler की tree-shaking कभी registration को हटा नहीं सकती:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| फ़ंक्शन | उद्देश्य |
|----------|---------|
| `getPaymentProvider(name)` | normalized name से resolve करता है; अगर provider गलत कॉन्फ़िगर हो तो Stripe पर fall back करता है, ताकि donor form कभी hard-crash न हो |
| `registerPaymentProvider(p)` | runtime पर एक अतिरिक्त provider register करता है (host app के custom gateway के लिए) |
| `listPaymentProviders()` | built-ins + custom की सूची बनाता है — admin gateway dropdown बनाने के लिए उपयोग होता है |
| `hasPaymentProvider(name)` | सदस्यता की जांच |

**Built-in client providers: Stripe, PayPal, Kingdom Funding, Paystack।** B1App और B1Admin registry को केवल *पढ़ते* हैं (`getPaymentProvider`, `listPaymentProviders`); दोनों में से कोई `registerPaymentProvider` को कॉल नहीं करता — registration apphelper के भीतर ही रहती है।

हर provider अलग तरीके से tokenize करता है, लेकिन सभी card को B1 से बाहर रखते हैं:

| Provider | Entry widget | API को लौटाया गया token |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; guest form एक `ExpressCheckoutElement` (Apple Pay / Google Pay, एक बार के उपहारों के लिए) भी माउंट करता है, जिसका `onConfirm` उसी `pm_…` id पर resolve होता है | payment-method id (`pm_…`); bank के लिए `/paymentmethods/ach-setup-intent` — USD gateways के लिए Financial Connections `us_bank_account`, CAD gateways के लिए Canadian PAD `acss_debit` (hosted mandate modal, mandate `default_for` invoices/subscriptions पर, one-off charges mandate id पास करते हैं) |
| Kingdom Funding | gateway public key से जुड़ा hosted tokenizer form | single-use nonce |
| PayPal | PayPal Hosted Fields (card, recurring) और Venmo funding वाले PayPal Smart Buttons (एक बार के लिए); दोनों एक ही SDK load साझा करते हैं, और server order `/donate/client-token` + `/donate/create-order` के जरिए बनता है | captured order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) — popup स्वयं भुगतान लेता है (card, mobile money, bank transfer, USSD) | paid transaction reference; saved methods Paystack `AUTH_…` authorization codes हैं |

Stripe का `finalizeResult` browser में 3-D Secure / SCA चलाता है (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), इससे पहले कि donation पूरा माना जाए; shared form बस `provider.finalizeResult(result)` कॉल करता है, और उसे नहीं पता कि यह क्या करता है।

## Server-side: gateway abstraction (GivingApi)

`/giving` module (`Api/src/modules/giving`) REST surface उपलब्ध कराता है; gateway का ढांचा `Api/src/shared/helpers` में है। `DonateController` कभी सीधे gateway SDK से बात नहीं करता — वह `GatewayService` के माध्यम से जाता है, जो `GatewayFactory` से सही `IGatewayProvider` resolve करता है और उसे एक decrypted `GatewayConfig` देता है।

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) वह contract है जिसे हर gateway लागू करता है — webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), payment (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), fees (`calculateFees`), saved-method handling (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), और वैकल्पिक extras (customers, orders, SetupIntents, event replay, failed subscription invoice के लिए `retryFailedPayment`, Apple Pay domain verification के लिए `registerPaymentMethodDomain`)। जो provider कोई वैकल्पिक hook नहीं देता, उसे उस action के लिए unsupported माना जाता है और UI control छिपा देता है। हर provider class अपना `capabilities` matrix घोषित करती है (समर्थित currencies, ACH, refunds, subscription requirements, transaction limits) — `GatewayService.getProviderCapabilities(provider)` बस उसे पढ़ता है — और `logsDonationsImmediately` जैसे flags controllers के व्यवहार को बिना किसी provider-name condition के चलाते हैं।

**`GatewayFactory` में registered server providers:**

| Provider | उपलब्धता |
|----------|-------------|
| Stripe | हमेशा चालू |
| PayPal | हमेशा चालू |
| Kingdom Funding | हमेशा चालू |
| Paystack | हमेशा चालू (नाइजीरिया, घाना, दक्षिण अफ़्रीका, केन्या, Côte d'Ivoire के merchants; currencies NGN/GHS/ZAR/KES/XOF/USD) |
| Square | `ENABLE_SQUARE` environment flag से opt-in |
| ePayMints | `ENABLE_EPAYMINTS` environment flag से opt-in |

Paystack बाकी से इस मायने में अलग है कि GivingApi शामिल होने से पहले पैसा चल चुका होता है: popup donor से चार्ज करता है, `processCharge` एक `GET /transaction/verify/:reference` है जिसकी भुगतान की गई राशि और currency दर्ज हो रहे donation से मेल खानी चाहिए (जो reference पहले से दर्ज है, वह कभी दोबारा log नहीं होता), और एक recurring schedule का पहला उपहार `finalizeSubscription` से log होता है (verify → `POST /plan` → `POST /subscription` जिसमें `start_date` एक interval आगे हो)। Webhooks स्वयं secret key से signed होते हैं (`x-paystack-signature`, raw body पर HMAC-SHA512), और Paystack में webhook-management API नहीं है, इसलिए admin screen वह URL दिखाती है जिसे church को अपने dashboard में paste करना होता है। Renewal `charge.success` events में fund split नहीं होता; provider उसे donor की local `subscriptions`/`subscriptionFunds` rows से निकालता है। केवल card authorizations `reusable` हैं — mobile money gifts केवल एक बार के हैं, इसलिए `createSubscription` उन्हें मना करता है। Demo data में एक दूसरा church (Accra Community Church, `CHU00000002`) Paystack test-mode GHS gateway पर seed होता है, ताकि Paystack Playwright suite Grace के Stripe suite के साथ चल सके।

Custom providers `ENABLE_CUSTOM_GATEWAY_PROVIDERS` सेट होने पर runtime पर register किए जा सकते हैं; `AbstractExperimentalGatewayProvider` उनके लिए base class है। Provider names case-insensitively match होते हैं।

### Gateway configuration और secrets

admin `POST /giving/gateways` (`GatewayController`) के जरिए gateway credentials सहेजता है। सेव पर controller private और webhook keys को persist करने से पहले `EncryptionHelper` से encrypt करता है, फिर — localhost के अलावा किसी भी host पर — church के मौजूदा webhook को हटाकर `/giving/donate/webhook/{provider}?churchId=…` की ओर इशारा करता हुआ एक नया webhook provision करता है। हर church के पास प्रति provider एक row होती है: किसी gateway को सेव करने से उसी provider की मौजूदा row ही बदलती है। सार्वजनिक reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) केवल public keys लौटाते हैं।

## Data model

giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, models `models/` में) एक MySQL schema है, जो Kysely के माध्यम से एक्सेस होता है:

| Table | भूमिका |
|-------|------|
| `gateways` | प्रति-church provider कॉन्फ़िग: `provider`, `publicKey`, encrypted `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giving designations (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | entry/reporting के लिए grouping (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | एक उपहार: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; statements, totals, dashboards और donation reports केवल `complete` या null गिनते हैं), `transactionId` |
| `fundDonations` | एक या अधिक funds में donation का आवंटन (`donationId`, `fundId`, `amount`) |
| `subscriptions` | recurring gift; `id` gateway का subscription id है, `personId`, `customerId`, `gatewayId` से linked |
| `subscriptionFunds` | recurring gift का fund split |
| `customers` | `personId` को प्रति `provider` gateway customer id से जोड़ता है |
| `gatewayPaymentMethods` | saved cards/banks: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | webhook/event audit trail और dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | किसी fund से जुड़े pledge campaigns, और हर व्यक्ति की pledged राशि |

एक donation `fundDonations` के माध्यम से कई funds में बंटता है — donation में कुल राशि होती है, और हर `fundDonation` उसका एक हिस्सा रखता है। `donations.currency` और `gateways.currency` ISO currency रखते हैं; हर provider अपनी `supportedCurrencies` घोषित करता है, और राशियां `CurrencyHelper.formatCurrencyWithLocale` से format होती हैं।

## End-to-end flows

### Member का एक बार और recurring giving (B1App)

authenticated donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) तीन apphelper components को जोड़ती है: `MultiGatewayDonationForm`, `PaymentMethods`, और `RecurringDonations`। B1App आसपास का डेटा लोड करता है — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — और gateway list पास करता है; resolve हुआ provider अपने SDK को gateway की public key से लोड करता है। असली charge apphelper के भीतर होता है: resolve हुआ provider नए (या सहेजे हुए) method को tokenize करता है, फिर एक बार के उपहार के लिए `/giving/donate/charge` या recurring के लिए `/giving/donate/subscribe` पर post करता है। दोनों endpoints signed-in donor को उसके अपने `personId` से attribute करते हैं (केवल `donations.edit` धारक किसी और को attribute कर सकते हैं), और ऐसे fund splits को reject करते हैं जिनका जोड़ charged राशि से अधिक हो। Recurring gifts `subscriptions` row और `subscriptionFunds` बनाते हैं और schedule gateway को सौंपते हैं (Stripe Subscriptions, PayPal Billing Plans, या KF recurring schedule)।

### Guest / अनाम giving

सार्वजनिक donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) और "give now" panel `@churchapps/apphelper/website` से `NonAuthDonationWrapper` render करते हैं, जो provider के `GuestForm` के चारों ओर reCAPTCHA और gateway का Elements context inject करता है। Guests को login, saved methods, या history नहीं मिलती। flow `GET /giving/funds/churchId/:id` और `GET /giving/donate/gateways/:churchId` (केवल public keys) लाता है, `POST /giving/donate/captcha-verify` से visitor को verify करता है, browser में tokenize करता है, और `/giving/donate/charge` (या `/subscribe`) पर post करता है। Guest ACH अनाम `POST /giving/paymentmethods/ach-setup-intent-anon` का उपयोग करता है, जो केवल तुरंत (Financial Connections) verification की अनुमति देता है: microdeposit जांच कुछ दिनों बाद पूरी होती है, जब तक guest page जा चुका होता है, इसलिए वह कभी उपहार पूरा नहीं कर सकती। Form unverified SetupIntent पर charge करने से मना करता है और donor को card या signed-in bank setup की ओर भेजता है।

Guest form के तीन विकल्प उसी charge call पर चलते हैं। donate URL पर `?fundId=` और `?amount=` fund split पहले से चुनते हैं (हर provider का guest form mount पर इन्हें पढ़ता है, और इन्हें सामान्य fund-change handler से गुज़ारा जाता है ताकि totals और fees अपडेट हों)। `anonymous: true` `DonateController.charge` को client द्वारा भेजे गए किसी भी person को हटाने देता है और gift को `personId = null` से log करता है; guest form `/people/loadOrCreate` और customer/vault चरण छोड़ देता है, और तीन immediate-log providers gateway customer से person resolve करना बंद कर देते हैं। Apple Pay के लिए page का domain Stripe में register होना ज़रूरी है, इसलिए Stripe guest form हर session में एक बार सार्वजनिक, rate-limited `POST /giving/donate/register-domain` पर post करता है, जो केवल उस domain को स्वीकार करता है जो church का है (`<subDomain>.b1.church`, content module की domains table की कोई row, या कोई local host) और फिर Stripe के payment-method-domains API को कॉल करता है।

### Admin द्वारा रिकॉर्डिंग और Stripe import (B1Admin)

B1Admin का donations section (`B1Admin/src/donations/`) वह जगह है जहां finance teams काम करती हैं। Batch entry (`components/BulkDonationEntry.tsx`) cash/check/in-kind gifts को `/giving/donations` और फिर `/giving/funddonations` पर post करके दर्ज करती है — इसमें कोई gateway शामिल नहीं होता। व्यक्ति के record पर **Log a gift** sheet (`components/LogGiftDialog.tsx`) वही काम एक gift के लिए करती है, पहले वह batch खोजती है जिसकी `batchDate` gift की तारीख से मेल खाती है, या उस तारीख के नाम पर एक नई बनाती है (`POST /giving/donationbatches`), और अगर बाद का कोई चरण विफल हो तो donation/नई batch को फिर से हटा देती है। Funds, batches, campaigns, और statements अपने `/giving/*` CRUD routes से जुड़े हैं; giving statements pages (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) पूरी church की history के बजाय एक calendar year मांगते हैं, `GET /donations?startDate=&endDate=` और `GET /fundDonations?startDate=&endDate=` से, क्योंकि पूरी history Lambda की response size limit से अधिक हो सकती है। Member-style donate panel (`B1Admin/src/donationComponents/`) वही apphelper components उपयोग करता है जो B1App में हैं।

Reporting और accounting hand-offs client-side या report-runner का काम हैं, gateway का काम नहीं: batch page का QuickBooks export batch के `donations` + `fundDonations` से journal-entry CSV बनाता है (debit Undeposited Funds, हर fund के लिए एक credit), Summary page का Lapsed Givers view `Api/reports/lapsedGivers.json` को generic report runner से चलाता है जिसमें `ReportOutput` person names resolve करता है, और देश-विशिष्ट receipt formats (Canada / Australia / New Zealand) membership key/value store में church settings हैं, जिन्हें `GivingStatementDocument` render करता है और B1App print page में duplicate किया गया है। B1Admin के statement print pages (`PrintDonationPage`, `PrintAllStatementsPage`) church की `logoLight` setting पास करते हैं (`B1Admin/src/components/PrintChurchHeader.tsx` में `usePrintLogo` से), ताकि हर statement के ऊपर logo छपे, और ऑटो-प्रिंट से पहले image का इंतज़ार करते हैं।

### Batch status और Enter Donations permission

Batches बंद की जा सकती हैं, ताकि गिनी गई जमा राशि जैसी थी वैसी ही रहे। `POST /giving/donationbatches/:id/close` और `/:id/reopen` (केवल Donations.Edit) `status`, `closedDate`, और `closedBy` के एकमात्र writers हैं (`DonationBatchRepo.setStatus`); सामान्य batch save इन्हें कभी नहीं छूता, इसलिए batch पोस्ट करने से वह दोबारा नहीं खुलती। Write access `Api/src/modules/giving/helpers/BatchAccessHelper.ts` में केंद्रीकृत है: Donations.Edit कुछ भी बदल सकता है, जबकि संकरी Donations.Enter permission (`GivingApi` / `Donations` / `Enter`, role editor में "Enter Donations") batches बना सकती है और donations व fund splits को सहेज या हटा सकती है, केवल तब जब donation की वर्तमान batch और उसकी लक्षित batch दोनों खुली हों, और कभी किसी gateway gift (जिसमें `transactionId` हो) के लिए नहीं। बंद batch पर blocked write `403 { error: "This batch is closed." }` लौटाता है। Batches पढ़ना Donations.ViewSummary या Donations.Enter स्वीकार करता है, ताकि counter उस batch को चुन सके जिसमें वह entry कर रहा है। Client पर `B1Admin/src/donations/batchAccess.ts` इन नियमों को दर्पण करता है (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), और `Header` / `SecondaryMenuHelper` **Donations > Batches** को उन सभी को दिखाते हैं जो batches देख सकते हैं, भले ही उनके पास View Summary न हो।

### Mixed-currency totals को बदलना

कोई भी endpoint जो संभावित रूप से मिश्रित-currency उपहारों का एक संयुक्त total लौटाता है — giving summary KPIs (`GivingKpiCards`), donation batch total, fund total, और B1App donate screen के year-to-date/period totals — server-side church की डिफ़ॉल्ट currency में बदलता है, बजाय अलग-अलग currencies को जोड़ने के। `Api/src/shared/helpers/ExchangeRateHelper.ts` दरें `api.frankfurter.dev` से लाता है, जो church currency से keyed हैं, उन्हें 12 घंटे के लिए in-process cache करता है, और `convertTotals(rows, churchCurrency, rates)` उपलब्ध कराता है: rows SQL में currency के अनुसार पहले से समूहित होती हैं (कुछ ही groups, कभी प्रति-उपहार conversion नहीं), हर group बदली और जोड़ी जाती है, और परिणाम में एक `isConverted` flag होता है, जिससे client "Converted at current exchange rates" नोट दिखाता है। `GET /donations/exchange-rates` दर तालिका को उन clients के लिए खोलता है जिन्हें इसकी ज़रूरत है (B1App का donate screen); दरें कभी request से स्वीकार नहीं होतीं, केवल server-side लाई जाती हैं, ताकि client रिपोर्ट किए गए total को प्रभावित न कर सके। अलग-अलग donation records और ऐतिहासिक/मूल-currency reports कभी नहीं बदले जाते — केवल संयुक्त totals बदले जाते हैं।

Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) B1 के बाहर किए गए उपहारों को बाद में भरता है: यह `POST /giving/donate/replay-stripe-events` को `dryRun: true` के साथ preview के लिए कॉल करता है, फिर import के लिए `dryRun: false` के साथ। Server तारीख सीमा के लिए Stripe events सूचीबद्ध करता है और जो पहले से दर्ज है उसे छोड़ देता है — पहले `eventLogs` provider id से, फिर transaction id से, फिर `DonationRepo.findMatchingDonation` (राशि + तारीख + व्यक्ति) से, ताकि दोबारा चलाने पर कुछ दो बार import न हो। Subscription `charge.succeeded` / `payment_intent.succeeded` events छोड़ दिए जाते हैं, क्योंकि उन उपहारों को `invoice.paid` दर्ज करता है; नए Stripe API versions `PaymentIntent.invoice` हटा देते हैं, इसलिए skip "Subscription …" description पर भी निर्भर करता है।

## Webhooks और reconciliation

निपटाए गए भुगतान और subscription state के बदलाव `POST /giving/donate/webhook/:provider?churchId=…` पर पहुंचते हैं (`DonateController.webhook`)। प्रोसेसिंग जानबूझकर idempotent है:

1. **Verify** — `GatewayService.verifyWebhook` provider की signature जांच को सौंपता है; विफल signature 401 लौटाता है। जिन events को प्रोसेसिंग की ज़रूरत नहीं, वे 200 पर शॉर्ट-सर्किट होते हैं।
2. **Event को dedup करें** — `EventLogRepo.loadByProviderId` वह webhook छोड़ देता है जो `eventLogs` में पहले से दर्ज है।
3. **Donation को dedup करें** — कुछ भी बनाने से पहले, `DonationRepo.loadByTransactionId` को हर उस candidate id के विरुद्ध जांचा जाता है जो payload में हो सकता है। यह duplicate deliveries, multi-stage ACH events (pending → settled), और उस स्थिति को संभालता है जहां `/donate/charge` ने पहले ही gift optimistically log कर दिया हो।
4. **Apply** — provider का `classifyWebhookEvent(eventType)` बताता है कि event का क्या अर्थ है (`donation` pending/complete, `cancel-subscription`, या `ignore`); पूरे हुए भुगतान एक `complete` donation बनाते हैं (या मौजूदा `pending` या `failed` को promote करते हैं), ACH-style events settlement तक `pending` के रूप में आते हैं, विफल subscription invoice (Stripe `invoice.payment_failed`) invoice id पर आधारित एक `failed` donation बनाता है, और cancellation events स्थानीय `subscriptions` row हटा देते हैं। Controller कभी provider-विशिष्ट event नाम नहीं जांचता।

### विफल recurring gifts और dunning

`failed` donation वसूली की इकाई है। `GET /giving/donations/failed` उन्हें `eventLogs` से नवीनतम gateway failure message और gateway capabilities से `canRetry` flag के साथ सूचीबद्ध करता है; `POST /giving/donate/retry/:donationId` provider का `retryFailedPayment` कॉल करता है (Stripe खुली invoice का भुगतान करता है), और परिणामी webhook सामान्य dedup path से row को `complete` पर promote करता है। Dunning emails donor को webhook handler से दिन 0 पर जाते हैं, फिर midnight timer में `DunningHelper.run` से (`lambda/timer-handler.ts` और `RailwayCron.ts` दोनों में wired) दिन 3 और 7 पर; हर भेजा गया email `eventLogs` में `provider: "dunning"`, `providerId: "<donationId>:<day>"` के रूप में दर्ज होता है, ताकि दोबारा चलने पर कोई दो बार email न पाए। जब Stripe हार मान कर subscription रद्द कर देता है (`customer.subscription.deleted` जिसमें `cancellation_details.reason: "payment_failed"`), तो `DunningHelper.notifyCanceled` donor को एक बार email करता है (`providerId: "<subscriptionId>:canceled"`); donor या admin द्वारा शुरू किए गए cancel चुप रहते हैं। Stripe मौजूदा endpoint में कभी नए events नहीं जोड़ता: `StripeHelper.webhookEvents` बदलने के बाद, या तो gateway को फिर से सेव करें, या production पर `tools/manual/stripe-webhook-events.ts` चलाएं (डिफ़ॉल्ट रूप से dry run, लिखने के लिए `--apply`)।

`logsDonationsImmediately` वाले providers (PayPal, Kingdom Funding, Paystack) के charges `/charge` response से log होते हैं (सामान्य मामले में webhook round-trip की ज़रूरत नहीं), जबकि Stripe `payment_intent.succeeded` / `invoice.paid` और ACH `payment_intent.processing` पर निर्भर करता है। Fee handling (`POST /giving/donate/fee`, `payFees` gateway flag, और हर provider का `calculateFees`) donor की ओर "fees कवर करें" gross-up की गणना करता है — B1 कोई platform cut नहीं लेता, इसलिए कभी application fee नहीं जोड़ी जाती।

:::info
charge और webhook paths एक ही `donations` / `fundDonations` rows लिखते हैं। `transactionId` वह join key है जो सुनिश्चित करता है कि optimistic charge log और उसका बाद का webhook एक ही उपहार के लिए दो donations न बनाएं।
:::

## संबंधित पेज

- [Giving Endpoints](../api/endpoints/giving) — donations, funds, batches, gateways, subscriptions, payment methods, और webhooks के लिए पूरा REST surface
- [AppHelper](../shared-libraries/app-helper) — npm package जो payment provider registry और donation components भेजता है
- [Module Structure](../api/module-structure) — GivingApi module server-side पर कैसे व्यवस्थित है
