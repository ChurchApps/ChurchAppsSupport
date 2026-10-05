---
title: "दान देना आर्किटेक्चर"
---

# दान देना आर्किटेक्चर

<div class="article-intro">

ChurchApps दान को gateway-rail model पर run करता है: चर्च अपना own Stripe (या PayPal, Kingdom Funding, या Paystack) account को रखता है, और B1 कभी भी पैसे के path में एक platform processor के रूप में sit नहीं करता है। Card data को browser में tokenize किया जाता है और कभी ChurchApps server तक नहीं पहुंचता है। यह page पूरे stack को map करता है — client-side provider registry in `@churchapps/apphelper`, GivingApi gateway abstraction, donation data model, और gateway webhooks को कैसे database में reconcile किया जाता है।

</div>

## Overview

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

तीन principles पूरे stack में hold होते हैं:

1. **Gateway card को hold करता है।** हर provider के entry widget को browser में tokenize करता है; API केवल एक token, nonce, या order id receive करता है।
2. **एक abstraction, कई providers।** Browser एक `PaymentProvider` को registry से resolve करता है; server एक `IGatewayProvider` को factory से resolve करता है। दोनों को gateway record पर stored same normalized provider name से key किया जाता है।
3. **Webhooks हैं settlement के लिए source of truth।** एक charge response को optimistically record किया जाता है, लेकिन gateway का signed webhook वह है जो completed donation को confirm (या create) करता है, दोनों sides पर idempotency guards के साथ।

## Client-side: payment provider registry (`@churchapps/apphelper`)

Registry `Packages/apphelper/src/donations/providers/` में रहता है, प्रत्येक provider के widgets और helpers अपने own subfolder के तहत (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — `providers/` के बाहर कुछ भी provider name पर branch नहीं करता है। एक `PaymentProvider` (देखें `providers/types.ts`) एक host app को एक gateway के लिए required हर चीज को bundle करता है: एक `descriptor` (admin labels, supported currencies, fee fields, default fee rates, dashboard/signup URLs), एक `capabilities` flag set (saved cards, ACH, recurring, inline new-card entry, implicit save-on-tokenize), React widgets member entry (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), saved-method editing (`MethodEditForm`), और form-question payments (`FormPayment`), plus `buildChargeRequest(ctx, token)` — एक जगह जहां charge payload shape provider के लिए differ करता है। हर provider का `MemberWrapper` gateway record के public key से अपना SDK load करता है, इसलिए host apps को कभी भी gateway SDK को import नहीं करना पड़ता है (B1App और B1Admin के पास `@stripe/*` dependency नहीं है)। `pickDefaultGateway(gateways, capability?)` को centralize करता है कि एक church के gateways में से कौन सा surface को use करना चाहिए।

`providers/registry.ts` built-ins को hold करता है। वे **referenced by value** हैं, module side-effect के माध्यम से registered नहीं हैं, इसलिए bundler का tree-shaking registration को कभी drop नहीं कर सकता है:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Function | Purpose |
|----------|---------|
| `getPaymentProvider(name)` | Normalized name द्वारा resolve करता है; Stripe को fallback करता है इसलिए एक misconfigured provider कभी hard-crash नहीं करता है donor form को |
| `registerPaymentProvider(p)` | Runtime पर एक extra provider को register करता है (एक host app के custom gateway के लिए) |
| `listPaymentProviders()` | Built-ins + custom को enumerate करता है — admin gateway dropdown को build करने के लिए use किया जाता है |
| `hasPaymentProvider(name)` | Membership check |

**Built-in client providers: Stripe, PayPal, Kingdom Funding, Paystack।** B1App और B1Admin केवल registry को *read* करते हैं (`getPaymentProvider`, `listPaymentProviders`); कोई भी `registerPaymentProvider` को call नहीं करता है — registration को apphelper के भीतर रहते हैं।

प्रत्येक provider अलग-अलग tokenize करता है, लेकिन सभी card को B1 से out रखते हैं:

| Provider | Entry widget | Token returned to API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; guest form भी एक `ExpressCheckoutElement` (Apple Pay / Google Pay, one-time gifts) को mount करता है जिसका `onConfirm` same `pm_…` id को resolve करता है | payment-method id (`pm_…`); bank via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` USD gateways के लिए, Canadian PAD `acss_debit` (hosted mandate modal, mandate `default_for` invoices/subscriptions, one-off charges को mandate id pass करता है) CAD gateways के लिए |
| Kingdom Funding | Hosted tokenizer form gateway public key द्वारा keyed | single-use nonce |
| PayPal | PayPal Hosted Fields (card, recurring) plus PayPal Smart Buttons with Venmo funding (one-time); दोनों एक SDK load को share करते हैं और server order जो `/donate/client-token` + `/donate/create-order` के माध्यम से built होता है | captured order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) — popup को payment लेता है (card, mobile money, bank transfer, USSD) | paid transaction reference; saved methods Paystack `AUTH_…` authorization codes हैं |

Stripe का `finalizeResult` 3-D Secure / SCA को browser में run करता है (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) इससे पहले कि donation complete माना जाता है; shared form को just `provider.finalizeResult(result)` को call करता है बिना किसी को क्या करता है इसे जानते हुए।

## Server-side: gateway abstraction (GivingApi)

`/giving` module (`Api/src/modules/giving`) REST surface को expose करता है; gateway plumbing `Api/src/shared/helpers` में रहता है। `DonateController` कभी gateway SDK को directly talk नहीं करता है — यह `GatewayService` के माध्यम से जाता है, जो right `IGatewayProvider` को `GatewayFactory` से resolve करता है और यह एक decrypted `GatewayConfig` को hand करता है।

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) contract है जो हर gateway implement करता है — webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), payment (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), fees (`calculateFees`), saved-method handling (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), और optional extras (customers, orders, SetupIntents, event replay, `retryFailedPayment` एक failed subscription invoice के लिए, `registerPaymentMethodDomain` Apple Pay domain verification के लिए)। एक provider जो optional hook को omit करता है को unsupported के रूप में report किया जाता है उस action के लिए और UI control को hide करता है। प्रत्येक provider class को declare करता है अपना own `capabilities` matrix (supported currencies, ACH, refunds, subscription requirements, transaction limits) — `GatewayService.getProviderCapabilities(provider)` को just read करता है — और flags जैसे `logsDonationsImmediately` को drive करता है controller behavior बिना कोई provider-name conditionals के controllers में।

**Server providers registered in `GatewayFactory`:**

| Provider | Availability |
|----------|-------------|
| Stripe | Always on |
| PayPal | Always on |
| Kingdom Funding | Always on |
| Paystack | Always on (Nigeria, Ghana, South Africa, Kenya, Côte d'Ivoire merchants; currencies NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in via the `ENABLE_SQUARE` environment flag |
| ePayMints | Opt-in via the `ENABLE_EPAYMINTS` environment flag |

Paystack दूसरों से differs उसमें पैसा move करता है GivingApi को involve किए जाने से पहले: popup charge करता है donor को, `processCharge` एक `GET /transaction/verify/:reference` है जिसका paid amount और currency को match करना होगा donation को record किया जा रहा है (एक reference पहले से file पर कभी नहीं log किया जाता है), और एक recurring schedule का पहला gift को log किया जाता है `finalizeSubscription` से (verify → `POST /plan` → `POST /subscription` with `start_date` one interval out)। Webhooks को sign किया जाता है secret key को self (`x-paystack-signature`, HMAC-SHA512 over the raw body) के साथ और Paystack को webhook-management API नहीं है, इसलिए admin screen को church को show करता है URL को अपने dashboard में paste करने के लिए। Renewal `charge.success` events को कोई fund split carry नहीं करते; provider को recover करता है donor के local `subscriptions`/`subscriptionFunds` rows से। केवल card authorizations को `reusable` हैं — mobile money gifts हैं one-time only, इसलिए `createSubscription` उन्हें refuse करता है। Demo data को एक दूसरे church (Accra Community Church, `CHU00000002`) को seed करता है एक Paystack test-mode GHS gateway पर इसलिए Paystack Playwright suite को Grace के Stripe के beside run करता है।

Custom providers को runtime पर register किया जा सकता है जब `ENABLE_CUSTOM_GATEWAY_PROVIDERS` को set किया गया हो; `AbstractExperimentalGatewayProvider` को base class होता है उन के लिए। Provider names को match किया जाता है case-insensitively।

### Gateway configuration & secrets

एक admin को gateway credentials save करता है via `POST /giving/gateways` (`GatewayController`)। Save पर controller को private और webhook keys को `EncryptionHelper` के साथ encrypt करता है persist से पहले, फिर — किसी भी non-localhost host पर — church के existing webhook को delete करता है और एक fresh एक को provision करता है pointed at `/giving/donate/webhook/{provider}?churchId=…`। एक church को keep करता है एक row per provider: gateway save करना को replace करता है केवल existing row को same provider के लिए। Public reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) को return करता है public keys केवल।

## Data model

Giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, models in `models/`) एक MySQL schema है Kysely के माध्यम से accessed:

| Table | Role |
|-------|------|
| `gateways` | Per-church provider config: `provider`, `publicKey`, encrypted `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giving designations (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Grouping for entry/reporting (`name`, `batchDate`) |
| `donations` | One gift: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; statements, totals, dashboards और donation reports count करते हैं केवल `complete` या null), `transactionId` |
| `fundDonations` | Allocation एक donation का across एक या अधिक funds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Recurring gift; `id` है gateway का subscription id, linked to `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fund split एक recurring gift के लिए |
| `customers` | Links एक `personId` को its gateway customer id, per `provider` |
| `gatewayPaymentMethods` | Saved cards/banks: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/event audit trail और dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Pledge campaigns tied एक fund को, और प्रत्येक person का pledged amount |

एक donation को split किया जाता है funds के across `fundDonations` के माध्यम से — donation को carry करता है total, हर `fundDonation` carry करता है slice। `donations.currency` और `gateways.currency` carry करते हैं ISO currency; प्रत्येक provider को advertise करता है its `supportedCurrencies`, और amounts को format किया जाता है `CurrencyHelper.formatCurrencyWithLocale` के साथ।

## End-to-end flows

### Member one-time और recurring (B1App)

Authenticated donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compose करता है तीन apphelper components: `MultiGatewayDonationForm`, `PaymentMethods`, और `RecurringDonations`। B1App को data-loading — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — और gateway list को resolved provider के माध्यम से pass करता है; gateway के public key से अपना SDK load करता है। Charge को itself inside apphelper happen करता है: resolved provider को tokenize करता है (new या saved) method, फिर post करता है `/giving/donate/charge` को एक one-time gift के लिए या `/giving/donate/subscribe` एक recurring एक के लिए। दोनों endpoints को attribute करता है एक signed-in donor को उनके own `personId` (केवल `donations.edit` holders को किसी और को attribute कर सकते हैं) और reject करते हैं fund splits जो add up होते हैं charged amount से अधिक। Recurring gifts को create करते हैं एक `subscriptions` row plus `subscriptionFunds` और hand करते हैं schedule को gateway को (Stripe Subscriptions, PayPal Billing Plans, या एक KF recurring schedule)।

### Guest / anonymous giving

Public donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) और "give now" panel को render करता है `NonAuthDonationWrapper` from `@churchapps/apphelper/website`, जो inject करता है reCAPTCHA और gateway के Elements context around provider का `GuestForm`। Guests को get no login, no saved methods, और no history। Flow को fetch करता है `GET /giving/funds/churchId/:id` और `GET /giving/donate/gateways/:churchId` (केवल public keys), verify करता है visitor को `POST /giving/donate/captcha-verify` के साथ, tokenize करता है browser में, और post करता है `/giving/donate/charge` (या `/subscribe`)। Guest ACH को use करता है anonymous `POST /giving/paymentmethods/ach-setup-intent-anon`।

तीन guest-form options को ride करते हैं same charge call पर। `?fundId=` और `?amount=` donate URL पर preselect करते हैं fund split (हर provider के guest form द्वारा read किया जाता है mount पर, normal fund-change handler के माध्यम से routed इसलिए totals और fees update होते हैं)। `anonymous: true` को make करता है `DonateController.charge` discard करता है कोई भी person client को send किया है और log करता है gift को `personId = null` के साथ; guest form को skip करता है `/people/loadOrCreate` और customer/vault step, और तीन immediate-log providers को stop करता है resolve करने से एक person gateway customer से। Apple Pay को page का domain को require करता है Stripe के साथ registered, इसलिए एक Stripe guest form को post करता है once per session को public, rate-limited `POST /giving/donate/register-domain` को, जो केवल accept करता है एक domain जो church को belong करता है (`<subDomain>.b1.church`, एक row in the content module के domains table, या एक local host) Stripe के payment-method-domains API को call करने से पहले।

### Admin recording और Stripe import (B1Admin)

B1Admin donations section (`B1Admin/src/donations/`) वह है जहां finance teams काम करते हैं। Batch entry (`components/BulkDonationEntry.tsx`) को record करता है cash/check/in-kind gifts by posting `/giving/donations` फिर `/giving/funddonations` — कोई gateway involved नहीं। Funds, batches, campaigns, और statements को प्रत्येक map करते हैं उनके `/giving/*` CRUD routes के लिए। Member-style donate panel (`B1Admin/src/donationComponents/`) को reuse करता है same apphelper components as B1App।

Reporting और accounting hand-offs को be client-side या report-runner work, नहीं gateway work: batch page के QuickBooks export को build करता है एक journal-entry CSV from batch के `donations` + `fundDonations` (debit Undeposited Funds, एक credit per fund), Lapsed Givers tab को run करता है `Api/reports/lapsedGivers.json` through generic report runner को person names resolved by `ReportOutput` के साथ, और country receipt formats (Canada / Australia / New Zealand) को be church settings in membership key/value store को rendered by `GivingStatementDocument` और duplicated in B1App print page।

### Converting mixed-currency totals

किसी भी endpoint जो एक single combined total return करता है possibly-mixed-currency gifts के across — giving summary KPIs (`GivingKpiCards`), एक donation batch total, एक fund total, और B1App donate screen के year-to-date/period totals — convert करता है church के default currency को server-side बजाय unlike currencies को sum करने के। `Api/src/shared/helpers/ExchangeRateHelper.ts` को fetch करता है rates from `api.frankfurter.dev` keyed by church currency, cache करता है in-process 12 hours के लिए, और expose करता है `convertTotals(rows, churchCurrency, rates)`: rows को be pre-grouped by currency in SQL (handful groups, कभी per-gift conversion नहीं), प्रत्येक group को convert और sum किया जाता है, और result को carry करता है एक `isConverted` flag client को use करने के लिए "Converted at current exchange rates" note को show करने के लिए। Individual donation records और historical/original-currency reports को कभी convert नहीं किया जाता है — केवल combined totals हैं।

Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) को backfill करता है gifts B1 के बाहर made: यह call करता है `POST /giving/donate/replay-stripe-events` को `dryRun: true` के साथ preview के लिए, फिर `dryRun: false` को import करने के लिए। Server को list करता है Stripe events date range के लिए और skip करता है कुछ भी पहले से ही recorded — matched first by `eventLogs` provider id, फिर by `DonationRepo.findMatchingDonation` (amount + date + person) इसलिए re-run को कभी double-import नहीं करता है।

## Webhooks और reconciliation

Settled payments और subscription state changes को arrive करते हैं `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`)। Processing को deliberately idempotent है:

1. **Verify करता है** — `GatewayService.verifyWebhook` delegate करता है provider के signature check को; एक failed signature को return करता है 401। Events जो processing को require नहीं करते हैं को short-circuit करते हैं 200 के साथ।
2. **Event को dedup करता है** — `EventLogRepo.loadByProviderId` को skip करता है एक webhook पहले से ही recorded in `eventLogs` को।
3. **Donation को dedup करता है** — कुछ भी create करने से पहले, `DonationRepo.loadByTransactionId` को check किया जाता है हर candidate id के विरुद्ध payload को carry कर सकता है। यह absorb करता है duplicate deliveries, multi-stage ACH events (pending → settled), और case जहां `/donate/charge` पहले से ही optimistically gift को log किया था।
4. **Apply करता है** — provider का `classifyWebhookEvent(eventType)` को say करता है event को क्या means (`donation` pending/complete, `cancel-subscription`, या `ignore`); completed payments को create करते हैं एक `complete` donation (या promote एक existing `pending` या `failed` एक), ACH-style events को land करते हैं `pending` के रूप में जब तक settlement, एक failed subscription invoice (Stripe `invoice.payment_failed`) को create करता है एक `failed` donation keyed on invoice id, और cancellation events को delete करते हैं local `subscriptions` row। Controller को कभी inspect नहीं करता provider-specific event names।

### Failed recurring gifts और dunning

एक `failed` donation unit of work है recovery के लिए। `GET /giving/donations/failed` को list करता है उन्हें newest gateway failure message के साथ `eventLogs` से और एक `canRetry` flag gateway की capabilities से; `POST /giving/donate/retry/:donationId` को call करता है provider का `retryFailedPayment` (Stripe को open invoice को pay करता है), और resulting webhook को promote करता है row को `complete` के लिए normal dedup path के माध्यम से। Dunning emails को go करते हैं donor को webhook handler से day 0 पर, फिर from `DunningHelper.run` midnight timer में (wired in both `lambda/timer-handler.ts` और `RailwayCron.ts`) 3 और 7 days पर; प्रत्येक send को record किया जाता है in `eventLogs` as `provider: "dunning"`, `providerId: "<donationId>:<day>"`, इसलिए rerun को कभी email नहीं दो बार करता है। जब Stripe give up करता है और subscription को cancel करता है (`customer.subscription.deleted` with `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` को email करता है donor once (`providerId: "<subscriptionId>:canceled"`); donor- या admin-initiated cancels को stay silent। Stripe कभी add नहीं करता events को existing endpoint को: बाद `StripeHelper.webhookEvents` change करने के बाद, या gateway को re-save करो या run करो `tools/manual/stripe-webhook-events.ts` (dry run by default, `--apply` को write करने के लिए) prod के विरुद्ध।

Providers जिन्हें `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) हैं उन्हें have charge को logged से `/charge` response (कोई webhook round-trip required नहीं happy path के लिए), जबकि Stripe को rely करता है `payment_intent.succeeded` / `invoice.paid` और ACH `payment_intent.processing`। Fee handling (`POST /giving/donate/fee`, `payFees` gateway flag, और हर provider का `calculateFees`) को compute करता है "cover the fees" gross-up donor side पर — B1 को take करता है कोई platform cut नहीं, इसलिए कोई application fee को कभी add नहीं किया जाता है।

:::info
Charge और webhook paths को write करते हैं same `donations` / `fundDonations` rows। `transactionId` को be join key जो keep करता है एक optimistic charge log और its later webhook से producing two donations एक gift के लिए।
:::

## संबंधित पृष्ठ

- [Giving Endpoints](../api/endpoints/giving) — donations, funds, batches, gateways, subscriptions, payment methods, और webhooks के लिए full REST surface
- [AppHelper](../shared-libraries/app-helper) — npm package जो ship करता है payment provider registry और donation components
- [Module Structure](../api/module-structure) — GivingApi module को server-side कैसे organize किया जाता है
