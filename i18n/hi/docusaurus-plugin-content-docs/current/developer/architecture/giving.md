---
title: "देना आर्किटेक्चर"
---

# देना आर्किटेक्चर

<div class="article-intro">

ChurchApps donations को एक gateway-rail model पर चलाता है: चर्च अपना स्वयं का Stripe (या PayPal, या Kingdom Funding) account रखता है, और B1 कभी भी एक platform processor के रूप में पैसे के पाथ में नहीं बैठता है। Card data को browser में tokenize किया जाता है और कभी भी ChurchApps server तक पहुंचता नहीं है। यह पृष्ठ पूरे stack को map करता है — `@churchapps/apphelper` में client-side provider registry, GivingApi gateway abstraction, donation data model, और कैसे gateway webhooks database में वापस reconcile करते हैं।

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

तीन सिद्धांत पूरे stack में रखे गए हैं:

1. **Gateway card को रखता है।** हर provider का entry widget browser में tokenize करता है; API केवल एक token, nonce, या order id receive करता है।
2. **एक abstraction, कई providers।** Browser एक registry से `PaymentProvider` को resolve करता है; सर्वर एक factory से `IGatewayProvider` को resolve करता है। दोनों gateway record पर संग्रहीत समान normalized provider name पर key करते हैं।
3. **Webhooks settlement के लिए सत्य का स्रोत हैं।** एक charge response को optimistically record किया जाता है, लेकिन gateway का signed webhook वह है जो completed donation को confirm करता है (या बनाता है), दोनों पक्षों पर idempotency guards के साथ।

## Client-side: payment provider registry (`@churchapps/apphelper`)

Registry `Packages/apphelper/src/donations/providers/` में रहता है, प्रत्येक provider के widgets और helpers अपने subfolder के अंदर (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — कुछ भी `providers/` से बाहर एक provider name पर branch नहीं करता है। एक `PaymentProvider` (देखें `providers/types.ts`) एक gateway के लिए एक host app को जरूरत की हर चीज को bundle करता है: एक `descriptor` (admin labels, supported currencies, fee fields, default fee rates, dashboard/signup URLs), एक `capabilities` flag set (saved cards, ACH, recurring, inline new-card entry, implicit save-on-tokenize), member entry के लिए React widgets (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), saved-method editing (`MethodEditForm`), और form-question payments (`FormPayment`), साथ ही `buildChargeRequest(ctx, token)` — वह एक जगह है जहां charge payload shape प्रति provider अलग है। प्रत्येक provider का `MemberWrapper` gateway record के public key से अपना SDK load करता है, इसलिए host apps कभी एक gateway SDK import नहीं करते (B1App और B1Admin के पास कोई `@stripe/*` dependency नहीं है)। `pickDefaultGateway(gateways, capability?)` केंद्रीभूत करता है कि एक चर्च के gateways का कौन सा सतह को use करना चाहिए।

`providers/registry.ts` built-ins को रखता है। वे **value द्वारा referenced हैं**, module side-effect के माध्यम से registered नहीं, इसलिए bundler का tree-shaking कभी भी registration को drop नहीं कर सकता:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| फ़ंक्शन | उद्देश्य |
|----------|---------|
| `getPaymentProvider(name)` | normalized name द्वारा resolve करें; Stripe फॉलबैक करता है ताकि एक misconfigured provider कभी भी donor form को hard-crash न करे |
| `registerPaymentProvider(p)` | runtime पर एक extra provider register करें (एक host app के custom gateway के लिए) |
| `listPaymentProviders()` | built-ins + custom को enumerate करें — admin gateway dropdown बनाने के लिए use किया जाता है |
| `hasPaymentProvider(name)` | membership check |

**Built-in client providers: Stripe, PayPal, Kingdom Funding।** B1App और B1Admin केवल registry को *read* करते हैं (`getPaymentProvider`, `listPaymentProviders`); न तो `registerPaymentProvider` को call करता है — registration apphelper के अंदर रहता है।

प्रत्येक provider अलग-अलग tokenize करता है, लेकिन सभी card को B1 से बाहर रखते हैं:

| Provider | Entry widget | Token API को return किया गया |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | payment-method id (`pm_…`); bank via Financial Connections / ACH SetupIntent |
| Kingdom Funding | Hosted tokenizer form gateway public key द्वारा keyed | single-use nonce |
| PayPal | PayPal Hosted Fields; server order built via `/donate/client-token` + `/donate/create-order` | captured order id |

Stripe का `finalizeResult` browser में 3-D Secure / SCA चलाता है (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) इससे पहले कि donation को complete माना जाता है; shared form केवल `provider.finalizeResult(result)` को बिना कोई knowledge के कि यह क्या करता है call करता है।

## Server-side: gateway abstraction (GivingApi)

`/giving` module (`Api/src/modules/giving`) REST surface को expose करता है; gateway plumbing `Api/src/shared/helpers` में रहता है। `DonateController` कभी भी एक gateway SDK से सीधे बात नहीं करता — यह `GatewayService` के माध्यम से जाता है, जो `GatewayFactory` से सही `IGatewayProvider` को resolve करता है और इसे एक decrypted `GatewayConfig` को hand करता है।

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) हर gateway जो implement करता है वह contract है — webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), payment (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), fees (`calculateFees`), saved-method handling (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), और optional extras (customers, orders, SetupIntents, event replay)। प्रत्येक provider class अपना `capabilities` matrix declare करता है (supported currencies, ACH, refunds, subscription requirements, transaction limits) — `GatewayService.getProviderCapabilities(provider)` केवल इसे read करता है — और flags जैसे `logsDonationsImmediately` controllers behavior को drive करते हैं controllers में कोई provider-name conditionals के बिना।

**GatewayFactory में registered server providers:**

| Provider | उपलब्धता |
|----------|-------------|
| Stripe | हमेशा on |
| PayPal | हमेशा on |
| Kingdom Funding | हमेशा on |
| Square | `ENABLE_SQUARE` environment flag के माध्यम से Opt-in |
| ePayMints | `ENABLE_EPAYMINTS` environment flag के माध्यम से Opt-in |

Custom providers को runtime पर register किया जा सकता है जब `ENABLE_CUSTOM_GATEWAY_PROVIDERS` set हो; `AbstractExperimentalGatewayProvider` उन के लिए base class है। Provider names को case-insensitively match किया जाता है।

### Gateway configuration & secrets

एक admin `POST /giving/gateways` के माध्यम से gateway credentials save करता है (`GatewayController`)। save पर controller private और webhook keys को `EncryptionHelper` के साथ encrypt करता है persisting से पहले, फिर — किसी भी non-localhost host पर — चर्च के existing webhook को delete करता है और `/giving/donate/webhook/{provider}?churchId=…` पर pointed एक fresh एक provision करता है। Public reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) केवल public keys return करते हैं।

## डेटा मॉडल

Giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, `models/` में models) एक MySQL schema है जो Kysely के माध्यम से accessed है:

| तालिका | भूमिका |
|-------|------|
| `gateways` | Per-church provider config: `provider`, `publicKey`, encrypted `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giving designations (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Entry/reporting के लिए grouping (`name`, `batchDate`) |
| `donations` | एक gift: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | एक donation का allocation एक या अधिक funds में (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Recurring gift; `id` gateway का subscription id है, `personId`, `customerId`, `gatewayId` से linked |
| `subscriptionFunds` | एक recurring gift के लिए fund split |
| `customers` | एक `personId` को इसके gateway customer id से link करता है, per `provider` |
| `gatewayPaymentMethods` | Saved cards/banks: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/event audit trail और dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Pledge campaigns एक fund से tied, और हर person का pledged amount |

एक donation `fundDonations` के माध्यम से funds में split किया जाता है — donation total को ले जाता है, हर `fundDonation` एक slice को ले जाता है। `donations.currency` और `gateways.currency` ISO currency को ले जाते हैं; हर provider अपने `supportedCurrencies` को advertise करता है, और amounts को `CurrencyHelper.formatCurrencyWithLocale` के साथ formatted किया जाता है।

## End-to-end flows

### Member one-time और recurring (B1App)

Authenticated donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) तीन apphelper components को compose करता है: `MultiGatewayDonationForm`, `PaymentMethods`, और `RecurringDonations`। B1App surrounding data-loading को करता है — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — और gateway list को pass through करता है; resolved provider अपना SDK gateway के public key से load करता है। charge itself apphelper के अंदर होता है: resolved provider (new या saved) method को tokenize करता है, फिर एक one-time gift के लिए `/giving/donate/charge` को या एक recurring एक के लिए `/giving/donate/subscribe` को post करता है। Recurring gifts एक `subscriptions` row plus `subscriptionFunds` create करते हैं और schedule को gateway को hand करते हैं (Stripe Subscriptions, PayPal Billing Plans, या एक KF recurring schedule)।

### Guest / anonymous giving

Public donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) और "give now" panel `NonAuthDonationWrapper` को `@churchapps/apphelper/website` से render करते हैं, जो reCAPTCHA को inject करता है और provider के `GuestForm` के चारों ओर gateway के Elements context को। Guests को कोई login, कोई saved methods, और कोई history नहीं मिलते हैं। flow `GET /giving/funds/churchId/:id` और `GET /giving/donate/gateways/:churchId` (केवल public keys) को fetch करता है, visitor को `POST /giving/donate/captcha-verify` के साथ verify करता है, browser में tokenize करता है, और `/giving/donate/charge` (या `/subscribe`) को post करता है। Guest ACH anonymous `POST /giving/paymentmethods/ach-setup-intent-anon` को use करता है।

### Admin recording और Stripe import (B1Admin)

B1Admin donations section (`B1Admin/src/donations/`) जहां finance teams काम करते हैं। Batch entry (`components/BulkDonationEntry.tsx`) `/giving/donations` को post करके cash/check/in-kind gifts record करता है फिर `/giving/funddonations` — कोई gateway involved नहीं। Funds, batches, campaigns, और statements हर एक अपने `/giving/*` CRUD routes में map करते हैं। member-style donate panel (`B1Admin/src/donationComponents/`) B1App जैसे same apphelper components को reuse करता है।

Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) B1 के बाहर बनाई गई gifts को backfill करता है: यह `POST /giving/donate/replay-stripe-events` को `dryRun: true` के साथ call करता है preview के लिए, फिर `dryRun: false` को import करने के लिए। server date range के लिए Stripe events को list करता है और कुछ भी पहले से recorded को skip करता है — पहले `eventLogs` provider id से match किया जाता है, फिर `DonationRepo.findMatchingDonation` (amount + date + person) द्वारा ताकि एक re-run कभी double-import न करे।

## Webhooks और reconciliation

Settled payments और subscription state changes `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`) पर आते हैं। Processing deliberate रूप से idempotent है:

1. **Verify** — `GatewayService.verifyWebhook` provider के signature check को delegate करता है; एक failed signature 401 return करता है। Events जिन्हें processing की जरूरत नहीं है 200 के साथ short-circuit करते हैं।
2. **Event को dedup करें** — `EventLogRepo.loadByProviderId` एक webhook को `eventLogs` में already recorded को skip करता है।
3. **Donation को dedup करें** — कुछ भी create करने से पहले, `DonationRepo.loadByTransactionId` को हर candidate id के विरुद्ध checked जाता है जो payload carry कर सकता है। यह duplicate deliveries को absorb करता है, multi-stage ACH events (pending → settled), और case जहां `/donate/charge` पहले से ही gift को optimistically log कर चुका है।
4. **Apply** — provider का `classifyWebhookEvent(eventType)` कहता है कि event का मतलब क्या है (`donation` pending/complete, `cancel-subscription`, या `ignore`); completed payments एक `complete` donation create करते हैं (या एक existing `pending` को promote करते हैं), ACH-style events `pending` के रूप में settlement तक land करते हैं, और cancellation events local `subscriptions` row को delete करते हैं। controller कभी भी provider-specific event names को inspect नहीं करता है।

Providers जिनके पास `logsDonationsImmediately` (PayPal, Kingdom Funding) hैं उनके charges `/charge` response से logged होते हैं (happy path के लिए कोई webhook round-trip required नहीं है), जबकि Stripe `payment_intent.succeeded` / `invoice.paid` और ACH `payment_intent.processing` पर relies करता है। Fee handling (`POST /giving/donate/fee`, `payFees` gateway flag, और प्रत्येक provider का `calculateFees`) donor side पर "cover the fees" gross-up को compute करता है — B1 कोई platform cut नहीं लेता है, इसलिए कोई application fee कभी भी नहीं जोड़ा जाता है।

:::info
charge और webhook paths same `donations` / `fundDonations` rows को write करते हैं। `transactionId` join key है जो एक optimistic charge log और इसके later webhook को एक donation के लिए two donations से रोकता है।
:::

## संबंधित पृष्ठ

- [Giving Endpoints](../api/endpoints/giving) — donations, funds, batches, gateways, subscriptions, payment methods, और webhooks के लिए पूर्ण REST surface
- [AppHelper](../shared-libraries/app-helper) — npm package जो payment provider registry और donation components को ship करता है
- [Module Structure](../api/module-structure) — कैसे GivingApi module को server-side organize किया जाता है
