---
title: "Giving आर्किटेक्चर"
---

# Giving आर्किटेक्चर

<div class="article-intro">

ChurchApps donations को एक gateway-rail model पर चलाता है: church अपना स्वयं का Stripe (या PayPal, Kingdom Funding, या Paystack) account रखता है, और B1 कभी platform processor के रूप में पैसे के रास्ते में नहीं आता। card data browser में tokenize होता है और कभी ChurchApps server तक नहीं पहुंचता। यह पेज पूरे stack का नक्शा देता है — `@churchapps/apphelper` में client-side provider registry, GivingApi gateway abstraction, donation data model, और यह कि gateway webhooks database में कैसे reconcile होते हैं।

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

पूरे stack में तीन सिद्धांत लागू होते हैं:

1. **Gateway card रखता है।** हर provider का entry widget browser में tokenize करता है; API को कभी केवल token, nonce, या order id मिलता है।
2. **एक abstraction, कई providers।** browser एक registry से `PaymentProvider` हल करता है; server एक factory से `IGatewayProvider` हल करता है। दोनों gateway record पर सहेजे गए उसी normalized provider name से चलते हैं।
3. **Settlement के लिए webhooks ही सत्य का स्रोत हैं।** charge का response आशावादी रूप से दर्ज होता है, लेकिन पूरा हुआ donation gateway का signed webhook ही पुष्टि करता है (या बनाता है), और दोनों ओर idempotency guards होते हैं।

## Client-side: payment provider registry (`@churchapps/apphelper`)

registry `Packages/apphelper/src/donations/providers/` में रहती है, और हर provider के widgets व helpers उसके अपने subfolder में होते हैं (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — `providers/` के बाहर कुछ भी provider name पर branch नहीं करता। एक `PaymentProvider` (देखें `providers/types.ts`) एक gateway के लिए host app को आवश्यक सब कुछ बंडल करता है: एक `descriptor` (admin labels, supported currencies, fee fields, default fee rates, dashboard/signup URLs), एक `capabilities` flag set (saved cards, ACH, recurring, inline new-card entry, implicit save-on-tokenize), member entry के लिए React widgets (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), saved-method editing (`MethodEditForm`), और form-question payments (`FormPayment`), साथ में `buildChargeRequest(ctx, token)` — वह एक जगह जहां charge payload का आकार हर provider के लिए अलग होता है। हर provider का `MemberWrapper` gateway record की public key से अपना SDK स्वयं लोड करता है, इसलिए host apps कभी gateway SDK import नहीं करते (B1App और B1Admin में `@stripe/*` dependency नहीं है)। `pickDefaultGateway(gateways, capability?)` यह केंद्रीकृत करता है कि किसी surface के लिए church के gateways में से कौन-सा उपयोग हो।

`providers/registry.ts` में built-ins हैं। वे **value द्वारा reference** किए जाते हैं, module side-effect के माध्यम से register नहीं होते, इसलिए bundler का tree-shaking कभी registration नहीं हटा सकता:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Function | उद्देश्य |
|----------|---------|
| `getPaymentProvider(name)` | normalized name से हल करें; Stripe पर fallback करता है ताकि गलत कॉन्फ़िगर provider donor form को कभी hard-crash न करे |
| `registerPaymentProvider(p)` | runtime पर एक अतिरिक्त provider register करें (host app के custom gateway के लिए) |
| `listPaymentProviders()` | built-ins + custom की गणना करें — admin gateway dropdown बनाने के लिए उपयोग |
| `hasPaymentProvider(name)` | सदस्यता जांच |

**Built-in client providers: Stripe, PayPal, Kingdom Funding, Paystack।** B1App और B1Admin registry को केवल *पढ़ते* हैं (`getPaymentProvider`, `listPaymentProviders`); कोई भी `registerPaymentProvider` नहीं बुलाता — registration apphelper के भीतर ही रहती है।

हर provider अलग तरीके से tokenize करता है, लेकिन सभी card को B1 से बाहर रखते हैं:

| Provider | Entry widget | API को लौटाया गया token |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; guest form एक `ExpressCheckoutElement` (Apple Pay / Google Pay, one-time gifts) भी mount करता है, जिसका `onConfirm` उसी `pm_…` id पर resolve होता है | payment-method id (`pm_…`); bank के लिए `/paymentmethods/ach-setup-intent` — USD gateways के लिए Financial Connections `us_bank_account`, CAD gateways के लिए कनाडाई PAD `acss_debit` (hosted mandate modal, mandate `default_for` invoices/subscriptions, one-off charges mandate id पास करते हैं) |
| Kingdom Funding | gateway public key से जुड़ा hosted tokenizer form | single-use nonce |
| PayPal | PayPal Hosted Fields (card, recurring) साथ में Venmo funding वाले PayPal Smart Buttons (one-time); दोनों एक ही SDK load साझा करते हैं, और server order `/donate/client-token` + `/donate/create-order` से बनता है | captured order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) — popup स्वयं भुगतान लेता है (card, mobile money, bank transfer, USSD) | paid transaction reference; saved methods Paystack `AUTH_…` authorization codes होते हैं |

Stripe का `finalizeResult` donation पूरा माने जाने से पहले browser में 3-D Secure / SCA चलाता है (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`); shared form केवल `provider.finalizeResult(result)` कॉल करता है, बिना यह जाने कि वह क्या करता है।

## Server-side: gateway abstraction (GivingApi)

`/giving` module (`Api/src/modules/giving`) REST surface देता है; gateway plumbing `Api/src/shared/helpers` में रहता है। `DonateController` सीधे किसी gateway SDK से बात नहीं करता — वह `GatewayService` के माध्यम से जाता है, जो `GatewayFactory` से सही `IGatewayProvider` हल करता है और उसे decrypted `GatewayConfig` देता है।

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) वह contract है जिसे हर gateway लागू करता है — webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), भुगतान (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), fees (`calculateFees`), saved-method handling (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), और वैकल्पिक extras (customers, orders, SetupIntents, event replay, failed subscription invoice के लिए `retryFailedPayment`, Apple Pay domain verification के लिए `registerPaymentMethodDomain`)। जो provider कोई वैकल्पिक hook छोड़ता है, उसे उस action के लिए unsupported माना जाता है और UI control छिपा देता है। हर provider class अपना `capabilities` matrix घोषित करती है (supported currencies, ACH, refunds, subscription requirements, transaction limits) — `GatewayService.getProviderCapabilities(provider)` बस उसे पढ़ता है — और `logsDonationsImmediately` जैसे flags controller का व्यवहार चलाते हैं, controllers में बिना किसी provider-name conditionals के।

**`GatewayFactory` में registered server providers:**

| Provider | उपलब्धता |
|----------|-------------|
| Stripe | हमेशा चालू |
| PayPal | हमेशा चालू |
| Kingdom Funding | हमेशा चालू |
| Paystack | हमेशा चालू (नाइजीरिया, घाना, दक्षिण अफ्रीका, केन्या, Côte d'Ivoire के merchants; currencies NGN/GHS/ZAR/KES/XOF/USD) |
| Square | `ENABLE_SQUARE` environment flag से opt-in |
| ePayMints | `ENABLE_EPAYMINTS` environment flag से opt-in |

Paystack बाकी से इस मायने में अलग है कि GivingApi शामिल होने से पहले पैसा चल चुका होता है: popup donor से charge करता है, `processCharge` एक `GET /transaction/verify/:reference` है जिसकी paid amount और currency उस donation से मेल खानी चाहिए जो दर्ज हो रहा है (पहले से दर्ज reference कभी दोबारा log नहीं होता), और recurring schedule का पहला gift `finalizeSubscription` से log होता है (verify → `POST /plan` → `POST /subscription` जिसका `start_date` एक interval आगे है)। Webhooks स्वयं secret key से signed होते हैं (`x-paystack-signature`, raw body पर HMAC-SHA512), और Paystack में कोई webhook-management API नहीं है, इसलिए admin screen वह URL दिखाती है जिसे church को अपने dashboard में paste करना होता है। Renewal `charge.success` events में कोई fund split नहीं होता; provider उसे donor की local `subscriptions`/`subscriptionFunds` rows से वापस निकालता है। केवल card authorizations `reusable` हैं — mobile money gifts केवल one-time हैं, इसलिए `createSubscription` उन्हें अस्वीकार करता है। demo data एक दूसरा church (Accra Community Church, `CHU00000002`) seed करता है, जो Paystack test-mode GHS gateway पर है, ताकि Paystack Playwright suite Grace के Stripe suite के साथ चल सके।

जब `ENABLE_CUSTOM_GATEWAY_PROVIDERS` सेट हो, तो custom providers runtime पर register किए जा सकते हैं; `AbstractExperimentalGatewayProvider` उनका base class है। provider names case-insensitively मिलाए जाते हैं।

### Gateway configuration और secrets

admin `POST /giving/gateways` (`GatewayController`) के माध्यम से gateway credentials सहेजता है। save पर controller persist करने से पहले `EncryptionHelper` से private और webhook keys encrypt करता है, फिर किसी भी non-localhost host पर church का मौजूदा webhook हटाता है और `/giving/donate/webhook/{provider}?churchId=…` की ओर इंगित एक नया webhook provision करता है। एक church हर provider के लिए एक row रखता है: gateway save करने से केवल उसी provider की मौजूदा row बदलती है। public reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) केवल public keys लौटाते हैं।

## Data model

giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, models `models/` में) एक MySQL schema है जिसे Kysely के माध्यम से access किया जाता है:

| Table | भूमिका |
|-------|------|
| `gateways` | हर church की provider config: `provider`, `publicKey`, encrypted `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giving designations (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | entry/reporting के लिए grouping (`name`, `batchDate`) |
| `donations` | एक gift: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; statements, totals, dashboards और donation reports केवल `complete` या null गिनते हैं), `transactionId` |
| `fundDonations` | एक या अधिक funds में donation का आवंटन (`donationId`, `fundId`, `amount`) |
| `subscriptions` | recurring gift; `id` gateway का subscription id है, जो `personId`, `customerId`, `gatewayId` से जुड़ा है |
| `subscriptionFunds` | recurring gift के लिए fund split |
| `customers` | `personId` को `provider` के अनुसार उसके gateway customer id से जोड़ता है |
| `gatewayPaymentMethods` | saved cards/banks: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | webhook/event audit trail और dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | किसी fund से जुड़े pledge campaigns, और हर व्यक्ति की pledged राशि |

donation को `fundDonations` के माध्यम से कई funds में बांटा जाता है — donation कुल राशि रखता है, हर `fundDonation` उसका एक हिस्सा। `donations.currency` और `gateways.currency` ISO currency रखते हैं; हर provider अपने `supportedCurrencies` विज्ञापित करता है, और राशियां `CurrencyHelper.formatCurrencyWithLocale` से format होती हैं।

## End-to-end flows

### Member one-time और recurring (B1App)

authenticated donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) apphelper के तीन components को जोड़ता है: `MultiGatewayDonationForm`, `PaymentMethods`, और `RecurringDonations`। B1App आसपास का data-loading करता है — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — और gateway list पास करता है; हल हुआ provider अपने gateway की public key से अपना SDK लोड करता है। वास्तविक charge apphelper के भीतर होता है: हल हुआ provider (नई या saved) method को tokenize करता है, फिर one-time gift के लिए `/giving/donate/charge` या recurring के लिए `/giving/donate/subscribe` पर post करता है। दोनों endpoints signed-in donor को उसके अपने `personId` से जोड़ते हैं (केवल `donations.edit` धारक किसी और को जोड़ सकते हैं) और ऐसे fund splits अस्वीकार करते हैं जिनका योग charged राशि से अधिक हो। recurring gifts एक `subscriptions` row और `subscriptionFunds` बनाते हैं और schedule gateway को सौंपते हैं (Stripe Subscriptions, PayPal Billing Plans, या KF recurring schedule)।

### Guest / अनाम giving

सार्वजनिक donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) और "give now" panel `@churchapps/apphelper/website` से `NonAuthDonationWrapper` render करते हैं, जो provider के `GuestForm` के चारों ओर reCAPTCHA और gateway का Elements context inject करता है। guests को कोई login, saved methods, या history नहीं मिलती। flow `GET /giving/funds/churchId/:id` और `GET /giving/donate/gateways/:churchId` (केवल public keys) लाता है, `POST /giving/donate/captcha-verify` से visitor को verify करता है, browser में tokenize करता है, और `/giving/donate/charge` (या `/subscribe`) पर post करता है। guest ACH अनाम `POST /giving/paymentmethods/ach-setup-intent-anon` का उपयोग करता है, जो केवल तुरंत (Financial Connections) verification की अनुमति देता है: microdeposit जांच कुछ दिनों बाद पूरी होती है, जब तक guest page जा चुका होता है, इसलिए वह gift कभी पूरा नहीं हो सकता। form एक unverified SetupIntent पर charge करने से इनकार करता है और donor को card या signed-in bank setup की ओर भेजता है।

तीन guest-form विकल्प उसी charge call पर चलते हैं। donate URL पर `?fundId=` और `?amount=` fund split पहले से चुनते हैं (हर provider का guest form mount पर इन्हें पढ़ता है, और इन्हें सामान्य fund-change handler से गुज़ारा जाता है ताकि totals और fees अपडेट हों)। `anonymous: true` `DonateController.charge` को किसी भी ऐसे person को discard करने देता है जिसे client ने भेजा हो, और gift को `personId = null` के साथ log करता है; guest form `/people/loadOrCreate` और customer/vault step छोड़ देता है, और तीनों immediate-log providers gateway customer से person हल करना बंद कर देते हैं। Apple Pay के लिए page का domain Stripe के साथ register होना आवश्यक है, इसलिए Stripe guest form हर session में एक बार सार्वजनिक, rate-limited `POST /giving/donate/register-domain` पर post करता है, जो केवल ऐसे domain स्वीकार करता है जो church का हो (`<subDomain>.b1.church`, content module की domains table में एक row, या कोई local host), और फिर Stripe के payment-method-domains API को कॉल करता है।

### Admin द्वारा recording और Stripe import (B1Admin)

B1Admin का donations section (`B1Admin/src/donations/`) वह जगह है जहां finance teams काम करती हैं। Batch entry (`components/BulkDonationEntry.tsx`) `/giving/donations` और फिर `/giving/funddonations` पर post करके cash/check/in-kind gifts दर्ज करती है — इसमें कोई gateway शामिल नहीं होता। person record की **Log a gift** sheet (`components/LogGiftDialog.tsx`) एक single gift के लिए भी यही करती है, पहले वह batch खोजकर जिसकी `batchDate` gift की तारीख से मेल खाती है या उस तारीख के नाम पर एक नया बनाकर (`POST /giving/donationbatches`), और यदि बाद का कोई step विफल हो तो donation/नया batch फिर से हटाकर। Funds, batches, campaigns, और statements हर एक अपने `/giving/*` CRUD routes से मैप होते हैं। member-style donate panel (`B1Admin/src/donationComponents/`) B1App वाले ही apphelper components का पुनः उपयोग करता है।

reporting और accounting hand-offs client-side या report-runner का काम हैं, gateway का नहीं: batch page का QuickBooks export batch के `donations` + `fundDonations` से एक journal-entry CSV बनाता है (Undeposited Funds पर debit, हर fund के लिए एक credit), Summary page का Lapsed Givers view `Api/reports/lapsedGivers.json` को generic report runner से चलाता है जिसमें व्यक्ति के नाम `ReportOutput` द्वारा हल होते हैं, और देश के अनुसार receipt formats (Canada / Australia / New Zealand) membership key/value store में church settings हैं, जिन्हें `GivingStatementDocument` render करता है और B1App के print page में दोहराया गया है। B1Admin के statement print pages (`PrintDonationPage`, `PrintAllStatementsPage`) church की `logoLight` setting पास करते हैं (`B1Admin/src/components/PrintChurchHeader.tsx` में `usePrintLogo` के माध्यम से), ताकि हर statement के ऊपर logo छपे, और स्वतः print से पहले image के लोड होने की प्रतीक्षा करते हैं।

### मिश्रित-currency totals को बदलना

कोई भी endpoint जो संभावित रूप से मिश्रित-currency gifts का एक संयुक्त total लौटाता है — giving summary KPIs (`GivingKpiCards`), donation batch total, fund total, और B1App donate screen के year-to-date/period totals — unlike currencies को जोड़ने के बजाय server-side पर church की default currency में बदलता है। `Api/src/shared/helpers/ExchangeRateHelper.ts` church currency के आधार पर `api.frankfurter.dev` से rates लाता है, उन्हें 12 घंटे के लिए process में cache करता है, और `convertTotals(rows, churchCurrency, rates)` expose करता है: rows SQL में पहले से currency के अनुसार समूहित होती हैं (कुछ ही groups, कभी प्रति-gift conversion नहीं), हर group बदली और जोड़ी जाती है, और परिणाम एक `isConverted` flag रखता है जिसे client "Converted at current exchange rates" नोट दिखाने के लिए उपयोग करता है। `GET /donations/exchange-rates` rate table को उन clients के लिए expose करता है जिन्हें उसकी ज़रूरत है (B1App का donate screen); rates कभी किसी request से स्वीकार नहीं किए जाते, केवल server-side पर लाए जाते हैं, ताकि client reported total को प्रभावित न कर सके। व्यक्तिगत donation records और ऐतिहासिक/original-currency reports कभी नहीं बदले जाते — केवल संयुक्त totals बदले जाते हैं।

Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) B1 के बाहर किए गए gifts को backfill करता है: preview के लिए `dryRun: true` के साथ `POST /giving/donate/replay-stripe-events` कॉल करता है, फिर import के लिए `dryRun: false`। server date range के लिए Stripe events सूचीबद्ध करता है और जो पहले से दर्ज है उसे छोड़ देता है — पहले `eventLogs` provider id से, फिर transaction id से, फिर `DonationRepo.findMatchingDonation` (amount + date + person) से मिलान करता है, ताकि दोबारा चलाने पर कभी दोहरा import न हो। Subscription `charge.succeeded` / `payment_intent.succeeded` events छोड़ दिए जाते हैं क्योंकि उन gifts को `invoice.paid` दर्ज करता है; नए Stripe API versions `PaymentIntent.invoice` हटा देते हैं, इसलिए skip "Subscription …" description पर भी निर्भर करता है।

## Webhooks और reconciliation

settled payments और subscription state changes `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`) पर आते हैं। processing जानबूझकर idempotent है:

1. **Verify** — `GatewayService.verifyWebhook` signature check को provider को सौंपता है; विफल signature 401 लौटाता है। जिन events को प्रोसेस करने की ज़रूरत नहीं होती, वे 200 के साथ short-circuit होते हैं।
2. **Event को dedup करें** — `EventLogRepo.loadByProviderId` ऐसे webhook को छोड़ता है जो पहले से `eventLogs` में दर्ज है।
3. **Donation को dedup करें** — कुछ भी बनाने से पहले, payload में संभावित हर candidate id के विरुद्ध `DonationRepo.loadByTransactionId` जांचा जाता है। यह duplicate deliveries, multi-stage ACH events (pending → settled), और उस स्थिति को संभालता है जहां `/donate/charge` पहले ही gift को आशावादी रूप से log कर चुका है।
4. **Apply** — provider का `classifyWebhookEvent(eventType)` बताता है कि event का क्या अर्थ है (`donation` pending/complete, `cancel-subscription`, या `ignore`); पूरे हुए payments एक `complete` donation बनाते हैं (या मौजूदा `pending` या `failed` को promote करते हैं), ACH-style events settlement तक `pending` के रूप में आते हैं, विफल subscription invoice (Stripe `invoice.payment_failed`) invoice id पर आधारित एक `failed` donation बनाता है, और cancellation events स्थानीय `subscriptions` row हटाते हैं। controller provider-specific event names की जांच नहीं करता।

### विफल recurring gifts और dunning

`failed` donation recovery की इकाई है। `GET /giving/donations/failed` उन्हें `eventLogs` से नवीनतम gateway failure message और gateway capabilities से `canRetry` flag के साथ सूचीबद्ध करता है; `POST /giving/donate/retry/:donationId` provider के `retryFailedPayment` को कॉल करता है (Stripe खुला invoice चुकाता है), और परिणामी webhook सामान्य dedup path से row को `complete` पर promote करता है। Dunning emails donor को webhook handler से day 0 पर जाते हैं, फिर midnight timer में (`lambda/timer-handler.ts` और `RailwayCron.ts` दोनों में wired) `DunningHelper.run` से 3 और 7 दिन पर; हर send `eventLogs` में `provider: "dunning"`, `providerId: "<donationId>:<day>"` के रूप में दर्ज होता है, ताकि दोबारा चलने पर कभी दो बार email न जाए। जब Stripe हार मानकर subscription रद्द कर देता है (`customer.subscription.deleted` जिसमें `cancellation_details.reason: "payment_failed"`), तो `DunningHelper.notifyCanceled` donor को एक बार email करता है (`providerId: "<subscriptionId>:canceled"`); donor या admin द्वारा किए गए cancels चुप रहते हैं। Stripe मौजूदा endpoint में नए events नहीं जोड़ता: `StripeHelper.webhookEvents` बदलने के बाद, या तो gateway को दोबारा save करें या prod के विरुद्ध `tools/manual/stripe-webhook-events.ts` चलाएं (डिफ़ॉल्ट रूप से dry run, लिखने के लिए `--apply`)।

`logsDonationsImmediately` वाले providers (PayPal, Kingdom Funding, Paystack) के charges `/charge` response से log होते हैं (सामान्य मामले में webhook round-trip की ज़रूरत नहीं), जबकि Stripe `payment_intent.succeeded` / `invoice.paid` और ACH `payment_intent.processing` पर निर्भर करता है। Fee handling (`POST /giving/donate/fee`, `payFees` gateway flag, और हर provider का `calculateFees`) donor की ओर से "fees cover करें" gross-up की गणना करता है — B1 कोई platform cut नहीं लेता, इसलिए कभी कोई application fee नहीं जोड़ी जाती।

:::info
charge और webhook paths एक ही `donations` / `fundDonations` rows लिखते हैं। `transactionId` वह join key है जो सुनिश्चित करता है कि आशावादी charge log और उसका बाद का webhook एक ही gift के लिए दो donations न बनाएं।
:::

## संबंधित पेज

- [Giving Endpoints](../api/endpoints/giving) — donations, funds, batches, gateways, subscriptions, payment methods, और webhooks के लिए पूरी REST surface
- [AppHelper](../shared-libraries/app-helper) — npm package जो payment provider registry और donation components देता है
- [Module Structure](../api/module-structure) — GivingApi module server-side पर कैसे व्यवस्थित है
