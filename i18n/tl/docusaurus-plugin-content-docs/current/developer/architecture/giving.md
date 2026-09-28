---
title: "Arkitektura ng Pagbibigay"
---

# Arkitektura ng Pagbibigay

<div class="article-intro">

Ang ChurchApps ay gumagamit ng gateway-rail model para sa mga donasyon: ang simbahan ay nagpapanatili ng sariling Stripe (o PayPal, Kingdom Funding, o Paystack) account, at hindi kailanman nasa landas ng pera ang B1 bilang platform processor. Ang card data ay tokenized sa browser at hindi kailanman umaabot sa ChurchApps server. Ang pahinang ito ay nagmemapa ng buong stack — ang client-side provider registry sa `@churchapps/apphelper`, ang GivingApi gateway abstraction, ang donation data model, at kung paano ang gateway webhooks ay nauugnay bumalik sa database.

</div>

## Pangkalahatang Pananaw

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

Tatlong prinsipyo ang sumasaklaw sa buong stack:

1. **Ang gateway ay nagtataglay ng card.** Bawat provider's entry widget ay tokenizes sa browser; ang API ay tumatanggap lamang ng token, nonce, o order id.
2. **Isang abstraction, maraming providers.** Ang browser ay nagresolba ng `PaymentProvider` mula sa registry; ang server ay nagresolba ng `IGatewayProvider` mula sa factory. Pareho ay gumagamit ng parehong normalized provider name na naka-store sa gateway record.
3. **Ang webhooks ay ang source of truth para sa settlement.** Ang charge response ay narerekord ng optimistic, ngunit ang gateway's signed webhook ang nakakakumpirma (o lumilikha) ng completed donation, may idempotency guards sa magkabilang panig.

## Client-side: ang payment provider registry (`@churchapps/apphelper`)

Ang registry ay naroroon sa `Packages/apphelper/src/donations/providers/`, na may bawat provider's widgets at helpers sa sariling subfolder (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — walang branch sa labas ng `providers/` na umaasa sa provider name. Ang `PaymentProvider` (tingnan ang `providers/types.ts`) ay nagsasama ng lahat ng kailangan ng host app para sa isang gateway: isang `descriptor` (admin labels, supported currencies, fee fields, default fee rates, dashboard/signup URLs), isang `capabilities` flag set (saved cards, ACH, recurring, inline new-card entry, implicit save-on-tokenize), ang React widgets para sa member entry (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), saved-method editing (`MethodEditForm`), at form-question payments (`FormPayment`), pati na rin `buildChargeRequest(ctx, token)` — ang iisang lugar kung saan ang charge payload shape ay naiiba sa bawat provider. Bawat provider's `MemberWrapper` ay nag-load ng sariling SDK mula sa gateway record's public key, kaya ang host apps ay hindi kailanman nag-import ng gateway SDK (B1App at B1Admin ay walang `@stripe/*` dependency). `pickDefaultGateway(gateways, capability?)` ay nag-centralize kung aling gateway ng simbahan ang dapat gamitin ng isang surface.

`providers/registry.ts` ay naglalaman ng built-ins. Sila ay **referenced by value**, hindi registered sa pamamagitan ng module side-effect, kaya ang bundler's tree-shaking ay hindi kailanman makakapag-drop ng registration:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Function | Purpose |
|----------|---------|
| `getPaymentProvider(name)` | Magresolba ng provider ayon sa normalized name; bumabalik sa Stripe kung ang provider ay miscononfigured para hindi crash ang donor form |
| `registerPaymentProvider(p)` | Magparehistro ng dagdag na provider sa runtime (para sa custom gateway ng host app) |
| `listPaymentProviders()` | Magbilang ng built-ins + custom — ginagamit upang bumuo ng admin gateway dropdown |
| `hasPaymentProvider(name)` | Membership check |

**Built-in client providers: Stripe, PayPal, Kingdom Funding, Paystack.** B1App at B1Admin ay lamang **read** ang registry (`getPaymentProvider`, `listPaymentProviders`); walang tumatawag ng `registerPaymentProvider` — ang registration ay nananatili sa loob ng apphelper.

Bawat provider ay nag-tokenize ng iba't ibang paraan, ngunit lahat ay nagpapanatili ng card na labas ng B1:

| Provider | Entry widget | Token returned to API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; ang guest form ay nag-mount din ng `ExpressCheckoutElement` (Apple Pay / Google Pay, one-time gifts) na ang `onConfirm` ay nagresolba sa parehong `pm_…` id | payment-method id (`pm_…`); bank sa pamamagitan ng `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` para sa USD gateways, Canadian PAD `acss_debit` (hosted mandate modal, mandate `default_for` invoices/subscriptions, one-off charges ay dumadaan ang mandate id) para sa CAD gateways |
| Kingdom Funding | Hosted tokenizer form keyed ng gateway public key | single-use nonce |
| PayPal | PayPal Hosted Fields (card, recurring) pati na rin PayPal Smart Buttons na may Venmo funding (one-time); pareho ay nagbabahagi ng isang SDK load at ang server order na binuo sa pamamagitan ng `/donate/client-token` + `/donate/create-order` | captured order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) — ang popup mismo ay tumatanggap ng bayad (card, mobile money, bank transfer, USSD) | paid transaction reference; ang saved methods ay Paystack `AUTH_…` authorization codes |

Ang Stripe's `finalizeResult` ay tumatakbo ng 3-D Secure / SCA sa browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) bago ang donation ay ituring na complete; ang shared form ay tumatawag lamang ng `provider.finalizeResult(result)` nang walang kaalaman kung ano ang ginagawa nito.

## Server-side: ang gateway abstraction (GivingApi)

Ang `/giving` module (`Api/src/modules/giving`) ay naglalantad ng REST surface; ang gateway plumbing ay naroroon sa `Api/src/shared/helpers`. `DonateController` ay hindi kailanman nakikipag-usap sa gateway SDK nang direkta — ito ay napupunta sa pamamagitan ng `GatewayService`, na nagresolba ng tamang `IGatewayProvider` mula sa `GatewayFactory` at nagbibigay sa ito ng decrypted `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ay ang kontrata na ginagawa ng bawat gateway — webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), payment (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), fees (`calculateFees`), saved-method handling (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), at optional extras (customers, orders, SetupIntents, event replay, `retryFailedPayment` para sa failed subscription invoice, `registerPaymentMethodDomain` para sa Apple Pay domain verification). Ang provider na nag-omit ng optional hook ay nire-report bilang unsupported para sa action na iyon at ang UI ay naghihintay ng kontrol. Bawat provider class ay nagdideklara ng sariling `capabilities` matrix (supported currencies, ACH, refunds, subscription requirements, transaction limits) — `GatewayService.getProviderCapabilities(provider)` ay lamang binabasa ito — at ang flags tulad ng `logsDonationsImmediately` ay nag-drive ng controller behavior nang walang anumang provider-name conditionals sa controllers.

**Server providers registered sa `GatewayFactory`:**

| Provider | Availability |
|----------|-------------|
| Stripe | Always on |
| PayPal | Always on |
| Kingdom Funding | Always on |
| Paystack | Always on (Nigeria, Ghana, South Africa, Kenya, Côte d'Ivoire merchants; currencies NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in sa pamamagitan ng `ENABLE_SQUARE` environment flag |
| ePayMints | Opt-in sa pamamagitan ng `ENABLE_EPAYMINTS` environment flag |

Ang Paystack ay naiiba sa iba dahil ang pera ay gumagalaw bago ang GivingApi ay kasangkot: ang popup ay nag-charge sa donor, `processCharge` ay isang `GET /transaction/verify/:reference` na ang paid amount at currency ay dapat tumugma sa donation na ire-record (isang reference na nasa file na ay hindi kailanman nakalog nang dalawang beses), at ang unang regalo ng recurring schedule ay naka-log mula sa `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` na ang `start_date` ay isang interval out). Ang webhooks ay naka-sign na may secret key mismo (`x-paystack-signature`, HMAC-SHA512 sa raw body) at ang Paystack ay walang webhook-management API, kaya ang admin screen ay nagpapakita ng URL para ang simbahan ay ipaste sa dashboard nito. Ang renewal `charge.success` events ay walang fund split; ang provider ay nire-recover ito mula sa donor's local `subscriptions`/`subscriptionFunds` rows. Lamang ang card authorizations ay `reusable` — ang mobile money gifts ay one-time lang, kaya ang `createSubscription` ay tinatanggihan ang mga ito. Ang demo data ay nag-seed ng pangalawang simbahan (Accra Community Church, `CHU00000002`) sa Paystack test-mode GHS gateway para ang Paystack Playwright suite ay tumatakbo sa tabi ng Grace's Stripe one.

Ang custom providers ay maaaring magrehistro sa runtime kapag ang `ENABLE_CUSTOM_GATEWAY_PROVIDERS` ay itinakda; `AbstractExperimentalGatewayProvider` ay ang base class para sa mga iyon. Ang provider names ay mi-match nang case-insensitively.

### Gateway configuration & secrets

Ang admin ay nagsasave ng gateway credentials sa pamamagitan ng `POST /giving/gateways` (`GatewayController`). Sa save ang controller ay nag-encrypt ng private at webhook keys na may `EncryptionHelper` bago mag-persist, pagkatapos — sa anumang non-localhost host — ay nag-delete ng simbahan's existing webhook at nag-provision ng bagong nakatutok sa `/giving/donate/webhook/{provider}?churchId=…`. Ang simbahan ay nagpapanatili ng isang row bawat provider: ang pagsave ng gateway ay nagsasalit lamang ng existing row para sa parehong provider. Ang public reads (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ay nagbabalik lamang ng public keys.

## Data model

Ang giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, models sa `models/`) ay isang MySQL schema na na-access sa pamamagitan ng Kysely:

| Table | Role |
|-------|------|
| `gateways` | Per-church provider config: `provider`, `publicKey`, encrypted `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giving designations (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Grouping para sa entry/reporting (`name`, `batchDate`) |
| `donations` | One gift: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; statements, totals, dashboards at donation reports ay nag-count lamang ng `complete` o null), `transactionId` |
| `fundDonations` | Allocation ng donation sa isa o maraming funds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Recurring gift; `id` ay ang gateway's subscription id, linked sa `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fund split para sa recurring gift |
| `customers` | Nag-link ng `personId` sa gateway customer id nito, bawat `provider` |
| `gatewayPaymentMethods` | Saved cards/banks: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/event audit trail at dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Pledge campaigns na nakakabit sa fund, at bawat tao's pledged amount |

Ang donation ay hinihati sa funds sa pamamagitan ng `fundDonations` — ang donation ay nagdadala ng kabuuan, bawat `fundDonation` ay nagdadala ng slice. Ang `donations.currency` at `gateways.currency` ay nagdadala ng ISO currency; bawat provider ay nag-advertise ng `supportedCurrencies` nito, at ang amounts ay na-format na may `CurrencyHelper.formatCurrencyWithLocale`.

## End-to-end flows

### Member one-time at recurring (B1App)

Ang authenticated donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) ay nagsasama ng tatlong apphelper components: `MultiGatewayDonationForm`, `PaymentMethods`, at `RecurringDonations`. Ang B1App ay gumagawa ng surrounding data-loading — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — at dumadaan ang gateway list; ang resolved provider ay nag-load ng sariling SDK mula sa gateway's public key. Ang charge mismo ay nangyayari sa loob ng apphelper: ang resolved provider ay nag-tokenize ng (bagong o saved) method, pagkatapos ay nag-post sa `/giving/donate/charge` para sa isang one-time gift o `/giving/donate/subscribe` para sa recurring one. Parehong endpoints ay nag-attribute ng signed-in donor sa kanilang sariling `personId` (lamang ang `donations.edit` holders ay maaaring mag-attribute sa iba) at tinatanggihan ang fund splits na nagdadagdag ng higit pa sa charged amount. Ang recurring gifts ay lumilikha ng `subscriptions` row pati `subscriptionFunds` at nagbibigay ng schedule sa gateway (Stripe Subscriptions, PayPal Billing Plans, o KF recurring schedule).

### Guest / anonymous giving

Ang public donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) at ang "give now" panel ay gumagawa ng `NonAuthDonationWrapper` mula sa `@churchapps/apphelper/website`, na nag-inject ng reCAPTCHA at ang gateway's Elements context sa paligid ng provider's `GuestForm`. Ang guests ay walang login, walang saved methods, at walang history. Ang flow ay nag-fetch ng `GET /giving/funds/churchId/:id` at `GET /giving/donate/gateways/:churchId` (public keys lamang), nag-verify ng bisita na may `POST /giving/donate/captcha-verify`, nag-tokenize sa browser, at nag-post sa `/giving/donate/charge` (o `/subscribe`). Ang guest ACH ay gumagamit ng anonymous `POST /giving/paymentmethods/ach-setup-intent-anon`.

Tatlong guest-form options ay sumakay sa parehong charge call. Ang `?fundId=` at `?amount=` sa donate URL ay pre-select ang fund split (binabasa ng bawat provider's guest form sa mount, na-route sa pamamagitan ng normal fund-change handler para ang totals at fees ay mag-update). Ang `anonymous: true` ay ginagawang `DonateController.charge` ay itapon ang anumang person na ipinapadala ng client at mag-log ng regalo na may `personId = null`; ang guest form ay nag-skip ng `/people/loadOrCreate` at ang customer/vault step, at ang tatlong immediate-log providers ay tumigil sa pag-resolve ng person mula sa gateway customer. Ang Apple Pay ay kailangan ang page's domain na maka-register sa Stripe, kaya isang Stripe guest form ay nag-post nang minsan bawat session sa public, rate-limited `POST /giving/donate/register-domain`, na lamang tumatanggap ng domain na pag-aari ng simbahan (`<subDomain>.b1.church`, isang row sa content module's domains table, o isang local host) bago tumatawag sa Stripe's payment-method-domains API.

### Admin recording at Stripe import (B1Admin)

Ang B1Admin donations section (`B1Admin/src/donations/`) ay kung saan ang finance teams ay gumagawa ng trabaho. Ang batch entry (`components/BulkDonationEntry.tsx`) ay nag-record ng cash/check/in-kind gifts sa pamamagitan ng pag-post ng `/giving/donations` pagkatapos ay `/giving/funddonations` — walang gateway na kasangkot. Ang funds, batches, campaigns, at statements ay bawat isa ay nag-map sa `/giving/*` CRUD routes. Ang member-style donate panel (`B1Admin/src/donationComponents/`) ay muling gumagamit ng parehong apphelper components tulad ng B1App.

Ang reporting at accounting hand-offs ay client-side o report-runner work, hindi gateway work: ang batch page's QuickBooks export ay bumubuo ng journal-entry CSV mula sa batch's `donations` + `fundDonations` (debit Undeposited Funds, isang credit bawat fund), ang Lapsed Givers tab ay tumatakbo ng `Api/reports/lapsedGivers.json` sa pamamagitan ng generic report runner na may person names na nire-resolve ng `ReportOutput`, at ang country receipt formats (Canada / Australia / New Zealand) ay church settings sa membership key/value store na rini-render ng `GivingStatementDocument` at na-duplicate sa B1App print page.

### Converting mixed-currency totals

Anumang endpoint na nagbabalik ng isang single combined total sa buong mixed-currency gifts — ang giving summary KPIs (`GivingKpiCards`), isang donation batch total, isang fund total, at ang B1App donate screen's year-to-date/period totals — ay nag-convert sa church's default currency server-side sa halip na magdagdag ng unlike currencies. Ang `Api/src/shared/helpers/ExchangeRateHelper.ts` ay nag-fetch ng rates mula sa `api.frankfurter.dev` keyed ng church currency, nag-cache sa in-process para 12 hours, at nag-expose ng `convertTotals(rows, churchCurrency, rates)`: ang rows ay pre-grouped ng currency sa SQL (isang handful ng groups, hindi ever per-gift conversion), bawat group ay converted at summed, at ang result ay nagdadala ng `isConverted` flag na ginagamit ng client upang ipakita ang "Converted at current exchange rates" note. Ang `GET /donations/exchange-rates` ay nag-expose ng rate table sa clients na kailangan nito (B1App's donate screen); ang rates mismo ay hindi kailanman tinatanggap mula sa request, lamang ever na-fetch server-side, kaya ang client ay hindi maaaring mag-impluwensya ng reported total. Ang individual donation records at historical/original-currency reports ay hindi kailanman na-convert — lamang combined totals ang ginagawa.

Ang Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) ay nag-backfill ng mga regalo na ginawa sa labas ng B1: ito ay tumatawag ng `POST /giving/donate/replay-stripe-events` na may `dryRun: true` para sa preview, pagkatapos ay `dryRun: false` upang mag-import. Ang server ay naglilista ng Stripe events para sa date range at nag-skip ng anumang naka-record na — mi-match una ng `eventLogs` provider id, pagkatapos ng `DonationRepo.findMatchingDonation` (amount + date + person) kaya isang re-run ay hindi kailanman double-imports.

## Webhooks at reconciliation

Ang settled payments at subscription state changes ay dumadating sa `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Ang processing ay sadyang idempotent:

1. **Verify** — `GatewayService.verifyWebhook` ay nag-delegate sa provider's signature check; isang failed signature ay nagbabalik ng 401. Ang events na hindi kailangan ng processing ay nag-shortcircuit na may 200.
2. **Dedup ang event** — `EventLogRepo.loadByProviderId` ay nag-skip ng webhook na naka-record na sa `eventLogs`.
3. **Dedup ang donation** — bago lumikha ng anumang bagay, `DonationRepo.loadByTransactionId` ay sinusuri laban sa bawat candidate id na ang payload ay maaaring magdala. Ito ay kumukuha ng duplicate deliveries, multi-stage ACH events (pending → settled), at ang case kung saan ang `/donate/charge` ay nag-log na ng regalo optimistically.
4. **Apply** — ang provider's `classifyWebhookEvent(eventType)` ay nagsasabi kung ano ang ibig sabihin ng event (`donation` pending/complete, `cancel-subscription`, o `ignore`); ang completed payments ay lumilikha ng `complete` donation (o nagpo-promote ng existing `pending` o `failed` one), ang ACH-style events ay nakakarating bilang `pending` hanggang settlement, isang failed subscription invoice (Stripe `invoice.payment_failed`) ay lumilikha ng `failed` donation keyed sa invoice id, at ang cancellation events ay nag-delete ng local `subscriptions` row. Ang controller ay hindi kailanman sinusuri ang provider-specific event names.

### Failed recurring gifts at dunning

Ang `failed` donation ay ang unit ng work para sa recovery. Ang `GET /giving/donations/failed` ay naglilista ng mga ito na may pinakabagong gateway failure message mula sa `eventLogs` at isang `canRetry` flag mula sa gateway's capabilities; ang `POST /giving/donate/retry/:donationId` ay tumatawag sa provider's `retryFailedPayment` (Stripe ay nagbabayad ng open invoice), at ang resulting webhook ay nagpo-promote ang row sa `complete` sa pamamagitan ng normal dedup path. Ang dunning emails ay napupunta sa donor mula sa webhook handler sa day 0, pagkatapos mula sa `DunningHelper.run` sa midnight timer (naka-wire sa parehong `lambda/timer-handler.ts` at `RailwayCron.ts`) sa day 3 at 7; bawat send ay naka-record sa `eventLogs` bilang `provider: "dunning"`, `providerId: "<donationId>:<day>"`, kaya isang rerun ay hindi kailanman nag-email nang dalawang beses. Ang Stripe webhook endpoints na ginawa bago ang feature na ito ay hindi nag-subscribe sa `invoice.payment_failed`; ang re-saving ng gateway ay nag-provision ng fresh endpoint na may event.

Ang providers na may `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ay may kanilang charges na naka-log mula sa `/charge` response (walang webhook round-trip na kailangan para sa happy path), habang ang Stripe ay umaasa sa `payment_intent.succeeded` / `invoice.paid` at ACH `payment_intent.processing`. Ang fee handling (`POST /giving/donate/fee`, ang `payFees` gateway flag, at bawat provider's `calculateFees`) ay nag-compute ng "cover the fees" gross-up sa donor side — ang B1 ay hindi kumukunha ng platform cut, kaya walang application fee na kailanman idagdag.

:::info
Ang charge at webhook paths ay sumusulat ng parehong `donations` / `fundDonations` rows. Ang `transactionId` ay ang join key na nagpapanatili ng optimistic charge log at ang delayed webhook nito mula sa paggawa ng dalawang donations para sa isang regalo.
:::

## Related Pages

- [Giving Endpoints](../api/endpoints/giving) — buong REST surface para sa donations, funds, batches, gateways, subscriptions, payment methods, at webhooks
- [AppHelper](../shared-libraries/app-helper) — ang npm package na naghahatid ng payment provider registry at donation components
- [Module Structure](../api/module-structure) — kung paano ang GivingApi module ay inorganisa server-side
