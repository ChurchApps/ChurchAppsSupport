---
title: "Arkitektura ng Pagbibigay"
---

# Arkitektura ng Pagbibigay

<div class="article-intro">

Pinapatakbo ng ChurchApps ang mga donasyon sa modelong gateway-rail: ang simbahan ang may hawak ng sarili nitong Stripe (o PayPal, Kingdom Funding, o Paystack) account, at ang B1 ay hindi kailanman nasa daanan ng pera bilang platform processor. Ang datos ng card ay tinotokenize sa browser at hindi kailanman umaabot sa server ng ChurchApps. Inilalarawan ng pahinang ito ang buong stack -- ang client-side provider registry sa `@churchapps/apphelper`, ang gateway abstraction ng GivingApi, ang data model ng donasyon, at kung paano nagre-reconcile pabalik sa database ang mga webhook ng gateway.

</div>

## Pangkalahatang-tanaw

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

Tatlong prinsipyo ang umiiral sa buong stack:

1. **Ang gateway ang may hawak ng card.** Ang entry widget ng bawat provider ay nagto-tokenize sa browser; ang API ay tumatanggap lamang ng token, nonce, o order id.
2. **Isang abstraction, maraming provider.** Ang browser ay nagreresolba ng `PaymentProvider` mula sa isang registry; ang server ay nagreresolba ng `IGatewayProvider` mula sa isang factory. Pareho silang gumagamit ng iisang normalized na pangalan ng provider na naka-store sa gateway record.
3. **Ang mga webhook ang pinagmumulan ng katotohanan para sa settlement.** Ang tugon ng charge ay nire-record nang optimistiko, pero ang signed webhook ng gateway ang kumukumpirma (o lumilikha) ng kumpletong donasyon, na may mga idempotency guard sa magkabilang panig.

## Client-side: ang payment provider registry (`@churchapps/apphelper`)

Ang registry ay nasa `Packages/apphelper/src/donations/providers/`, kung saan ang mga widget at helper ng bawat provider ay nasa sarili nitong subfolder (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- walang nasa labas ng `providers/` na nagbabranch ayon sa pangalan ng provider. Ang isang `PaymentProvider` (tingnan ang `providers/types.ts`) ay nagbibigkis ng lahat ng kailangan ng host app para sa isang gateway: isang `descriptor` (mga admin label, sinusuportahang currency, mga field ng fee, default na rate ng fee, mga URL ng dashboard/signup), isang set ng `capabilities` flag (mga naka-save na card, ACH, recurring, inline na pagpasok ng bagong card, implicit na save-on-tokenize), ang mga React widget para sa pagpasok ng miyembro (`MemberWrapper`/`MemberEntry`), pagbibigay ng bisita (`GuestForm`), pag-edit ng naka-save na paraan (`MethodEditForm`), at mga bayad sa tanong ng form (`FormPayment`), kasama ang `buildChargeRequest(ctx, token)` -- ang nag-iisang lugar kung saan nagkakaiba ang hugis ng charge payload bawat provider. Ang `MemberWrapper` ng bawat provider ay naglo-load ng sarili nitong SDK mula sa public key ng gateway record, kaya ang mga host app ay hindi kailanman nag-i-import ng gateway SDK (walang dependency na `@stripe/*` ang B1App at B1Admin). Ang `pickDefaultGateway(gateways, capability?)` ay nagsesentralisa kung alin sa mga gateway ng simbahan ang dapat gamitin ng isang surface.

Ang `providers/registry.ts` ang may hawak ng mga built-in. Ang mga ito ay **tinutukoy ayon sa value**, hindi nirerehistro sa pamamagitan ng module side-effect, kaya hindi kailanman maaalis ng tree-shaking ng bundler ang pagrerehistro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Function | Layunin |
|----------|---------|
| `getPaymentProvider(name)` | Magresolba ayon sa normalized na pangalan; bumabalik sa Stripe para ang maling na-configure na provider ay hindi kailanman magpapabagsak sa form ng donor |
| `registerPaymentProvider(p)` | Magrehistro ng karagdagang provider sa runtime (para sa custom na gateway ng host app) |
| `listPaymentProviders()` | Ilista ang mga built-in + custom -- ginagamit sa pagbuo ng dropdown ng admin gateway |
| `hasPaymentProvider(name)` | Pagsusuri ng pagiging kasapi |

**Mga built-in na client provider: Stripe, PayPal, Kingdom Funding, Paystack.** Ang B1App at B1Admin ay *nagbabasa* lamang ng registry (`getPaymentProvider`, `listPaymentProviders`); wala sa kanila ang tumatawag ng `registerPaymentProvider` -- ang pagrerehistro ay nananatili sa loob ng apphelper.

Magkakaiba ang paraan ng pag-tokenize ng bawat provider, pero lahat ay pinapanatiling wala ang card sa B1:

| Provider | Entry widget | Token na ibinabalik sa API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; ang guest form ay nagma-mount din ng `ExpressCheckoutElement` (Apple Pay / Google Pay, mga one-time na handog) na ang `onConfirm` ay nareresolba sa parehong `pm_…` id | payment-method id (`pm_…`); bangko sa pamamagitan ng `/paymentmethods/ach-setup-intent` -- Financial Connections `us_bank_account` para sa mga USD gateway, Canadian PAD `acss_debit` (hosted mandate modal, mandate `default_for` mga invoice/subscription, ang mga one-off na charge ay nagpapasa ng mandate id) para sa mga CAD gateway |
| Kingdom Funding | Hosted tokenizer form na nakabatay sa public key ng gateway | single-use na nonce |
| PayPal | PayPal Hosted Fields (card, recurring) kasama ang PayPal Smart Buttons na may Venmo funding (one-time); parehong nagbabahagi ng isang SDK load at ang server order na binuo sa pamamagitan ng `/donate/client-token` + `/donate/create-order` | captured na order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) -- ang popup mismo ang tumatanggap ng bayad (card, mobile money, bank transfer, USSD) | reference ng bayad na transaksyon; ang mga naka-save na paraan ay mga Paystack `AUTH_…` authorization code |

Ang `finalizeResult` ng Stripe ay nagpapatakbo ng 3-D Secure / SCA sa browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) bago ituring na kumpleto ang donasyon; ang shared form ay tumatawag lamang ng `provider.finalizeResult(result)` nang hindi alam kung ano ang ginagawa nito.

## Server-side: ang gateway abstraction (GivingApi)

Ang module na `/giving` (`Api/src/modules/giving`) ang naglalantad ng REST surface; ang gateway plumbing ay nasa `Api/src/shared/helpers`. Ang `DonateController` ay hindi kailanman direktang nakikipag-usap sa gateway SDK -- dumadaan ito sa `GatewayService`, na nagreresolba ng tamang `IGatewayProvider` mula sa `GatewayFactory` at nagbibigay dito ng na-decrypt na `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

Ang `IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ang kontrata na ipinapatupad ng bawat gateway -- webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagbabayad (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), mga fee (`calculateFees`), paghawak sa mga naka-save na paraan (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), at mga opsyonal na dagdag (mga customer, order, SetupIntent, event replay, `retryFailedPayment` para sa nabigong subscription invoice, `registerPaymentMethodDomain` para sa Apple Pay domain verification). Ang provider na hindi nagpatupad ng opsyonal na hook ay iuulat na hindi suportado para sa aksyong iyon at itatago ng UI ang kontrol. Ang bawat klase ng provider ay nagdedeklara ng sarili nitong matrix ng `capabilities` (mga sinusuportahang currency, ACH, refund, mga kinakailangan sa subscription, mga limitasyon sa transaksyon) -- binabasa lamang ito ng `GatewayService.getProviderCapabilities(provider)` -- at ang mga flag tulad ng `logsDonationsImmediately` ang nagtutulak sa asal ng controller nang walang anumang kondisyon sa pangalan ng provider sa mga controller.

**Mga server provider na nakarehistro sa `GatewayFactory`:**

| Provider | Availability |
|----------|-------------|
| Stripe | Laging naka-on |
| PayPal | Laging naka-on |
| Kingdom Funding | Laging naka-on |
| Paystack | Laging naka-on (mga merchant sa Nigeria, Ghana, South Africa, Kenya, Côte d'Ivoire; mga currency na NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in sa pamamagitan ng environment flag na `ENABLE_SQUARE` |
| ePayMints | Opt-in sa pamamagitan ng environment flag na `ENABLE_EPAYMINTS` |

Naiiba ang Paystack sa iba dahil gumagalaw na ang pera bago pa masangkot ang GivingApi: ang popup ang nagcha-charge sa donor, ang `processCharge` ay isang `GET /transaction/verify/:reference` na ang halaga at currency na nabayaran ay dapat tumugma sa donasyong nire-record (ang reference na nasa file na ay hindi kailanman nilo-log nang dalawang beses), at ang unang handog ng recurring na iskedyul ay nilo-log mula sa `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` na may `start_date` na isang interval ang layo). Ang mga webhook ay pinipirmahan gamit ang mismong secret key (`x-paystack-signature`, HMAC-SHA512 sa raw body) at walang webhook-management API ang Paystack, kaya ipinapakita ng admin screen ang URL para i-paste ng simbahan sa dashboard nito. Ang mga renewal na event ng `charge.success` ay walang dalang fund split; binabawi ito ng provider mula sa lokal na mga row ng `subscriptions`/`subscriptionFunds` ng donor. Ang mga card authorization lamang ang `reusable` -- ang mga handog sa mobile money ay one-time lamang, kaya tinatanggihan ang mga ito ng `createSubscription`. Ang demo data ay naglalagay ng ikalawang simbahan (Accra Community Church, `CHU00000002`) sa isang Paystack test-mode GHS gateway para tumakbo ang Paystack Playwright suite katabi ng Stripe suite ng Grace.

Ang mga custom provider ay maaaring irehistro sa runtime kapag naka-set ang `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; ang `AbstractExperimentalGatewayProvider` ang base class para sa mga iyon. Ang mga pangalan ng provider ay itinutugma nang hindi sensitibo sa laki ng titik.

### Configuration ng gateway at mga lihim

Sine-save ng admin ang mga credential ng gateway sa pamamagitan ng `POST /giving/gateways` (`GatewayController`). Sa pag-save, ine-encrypt ng controller ang private at webhook key gamit ang `EncryptionHelper` bago i-persist, at pagkatapos -- sa anumang hindi-localhost na host -- binubura ang kasalukuyang webhook ng simbahan at gumagawa ng bago na nakaturo sa `/giving/donate/webhook/{provider}?churchId=…`. Ang simbahan ay may isang row bawat provider: ang pag-save ng gateway ay pinapalitan lamang ang kasalukuyang row para sa parehong provider. Ang mga pampublikong read (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ay nagbabalik lamang ng mga public key.

## Data model

Ang giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, mga model sa `models/`) ay isang MySQL schema na ina-access sa pamamagitan ng Kysely:

| Table | Papel |
|-------|------|
| `gateways` | Config ng provider bawat simbahan: `provider`, `publicKey`, naka-encrypt na `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Mga designasyon ng pagbibigay (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Pagpapangkat para sa pagpasok/pag-uulat (`name`, `batchDate`) |
| `donations` | Isang handog: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; ang mga statement, kabuuan, dashboard, at ulat ng donasyon ay binibilang lamang ang `complete` o null), `transactionId` |
| `fundDonations` | Paghahati ng isang donasyon sa isa o higit pang fund (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Recurring na handog; ang `id` ay ang subscription id ng gateway, naka-link sa `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Hati ng fund para sa recurring na handog |
| `customers` | Nag-uugnay ng `personId` sa customer id nito sa gateway, bawat `provider` |
| `gatewayPaymentMethods` | Mga naka-save na card/bangko: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Audit trail ng webhook/event at dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Mga campaign ng pledge na nakatali sa isang fund, at ang pinledge na halaga ng bawat tao |

Ang donasyon ay hinahati sa mga fund sa pamamagitan ng `fundDonations` -- ang donasyon ang may dalang kabuuan, ang bawat `fundDonation` ay may dalang hiwa. Ang `donations.currency` at `gateways.currency` ang may dalang ISO currency; ang bawat provider ay nag-aanunsyo ng `supportedCurrencies` nito, at ang mga halaga ay fino-format gamit ang `CurrencyHelper.formatCurrencyWithLocale`.

## Mga daloy mula simula hanggang dulo

### Miyembro: one-time at recurring (B1App)

Ang authenticated na donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) ay bumubuo ng tatlong apphelper component: `MultiGatewayDonationForm`, `PaymentMethods`, at `RecurringDonations`. Ang B1App ang gumagawa ng nakapaligid na pag-load ng data -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- at ipinapasa ang listahan ng gateway; ang nareresolbang provider ay naglo-load ng sarili nitong SDK mula sa public key ng gateway. Ang mismong charge ay nangyayari sa loob ng apphelper: ang nareresolbang provider ay nagto-tokenize ng (bago o naka-save na) paraan, pagkatapos ay nagpo-post sa `/giving/donate/charge` para sa one-time na handog o `/giving/donate/subscribe` para sa recurring. Ang dalawang endpoint ay iniuugnay ang naka-sign in na donor sa sarili niyang `personId` (tanging mga may hawak ng `donations.edit` ang maaaring mag-attribute sa iba) at tinatanggihan ang mga fund split na lumalampas sa halagang sinisingil. Ang mga recurring na handog ay gumagawa ng row ng `subscriptions` kasama ang `subscriptionFunds` at ibinibigay ang iskedyul sa gateway (Stripe Subscriptions, PayPal Billing Plans, o KF recurring schedule).

### Pagbibigay ng bisita / anonymous

Ang pampublikong donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) at ang panel na "give now" ay nagre-render ng `NonAuthDonationWrapper` mula sa `@churchapps/apphelper/website`, na nag-iinject ng reCAPTCHA at ng Elements context ng gateway sa paligid ng `GuestForm` ng provider. Ang mga bisita ay walang login, walang naka-save na paraan, at walang kasaysayan. Kinukuha ng daloy ang `GET /giving/funds/churchId/:id` at `GET /giving/donate/gateways/:churchId` (mga public key lamang), bine-beripika ang bisita gamit ang `POST /giving/donate/captcha-verify`, nagto-tokenize sa browser, at nagpo-post sa `/giving/donate/charge` (o `/subscribe`). Ang guest ACH ay gumagamit ng anonymous na `POST /giving/paymentmethods/ach-setup-intent-anon`.

Tatlong opsyon ng guest form ang sumasabay sa parehong charge call. Ang `?fundId=` at `?amount=` sa donate URL ay nagpiprepili ng fund split (binabasa ng guest form ng bawat provider sa mount, dumadaan sa karaniwang fund-change handler para ma-update ang mga kabuuan at fee). Ang `anonymous: true` ay ginagawang itapon ng `DonateController.charge` ang anumang taong ipinadala ng client at i-log ang handog na may `personId = null`; nilalaktawan ng guest form ang `/people/loadOrCreate` at ang hakbang ng customer/vault, at ang tatlong immediate-log provider ay hindi na nagreresolba ng tao mula sa customer ng gateway. Ang Apple Pay ay nangangailangang nakarehistro sa Stripe ang domain ng pahina, kaya ang Stripe guest form ay nagpo-post nang isang beses bawat sesyon sa pampubliko at rate-limited na `POST /giving/donate/register-domain`, na tumatanggap lamang ng domain na pag-aari ng simbahan (`<subDomain>.b1.church`, isang row sa domains table ng content module, o lokal na host) bago tumawag sa payment-method-domains API ng Stripe.

### Pagre-record ng admin at Stripe import (B1Admin)

Ang seksyon ng mga donasyon ng B1Admin (`B1Admin/src/donations/`) ang pinagtatrabahuhan ng mga finance team. Ang batch entry (`components/BulkDonationEntry.tsx`) ay nagre-record ng mga handog na cash/check/in-kind sa pamamagitan ng pag-post sa `/giving/donations` pagkatapos ay `/giving/funddonations` -- walang gateway na kasangkot. Ang mga fund, batch, campaign, at statement ay bawat isa ay tumutugma sa kanilang mga CRUD route na `/giving/*`. Ang member-style na donate panel (`B1Admin/src/donationComponents/`) ay gumagamit ng parehong apphelper component gaya ng B1App.

Ang pag-uulat at mga hand-off sa accounting ay gawa ng client-side o report-runner, hindi ng gateway: ang QuickBooks export ng batch page ay bumubuo ng journal-entry CSV mula sa mga `donations` + `fundDonations` ng batch (debit Undeposited Funds, isang credit bawat fund), ang tab na Lapsed Givers ay nagpapatakbo ng `Api/reports/lapsedGivers.json` sa pamamagitan ng generic na report runner na ang mga pangalan ng tao ay nareresolba ng `ReportOutput`, at ang mga format ng resibo ng bansa (Canada / Australia / New Zealand) ay mga setting ng simbahan sa key/value store ng membership na nire-render ng `GivingStatementDocument` at dinoble sa print page ng B1App.

### Pag-convert ng mga kabuuang may halo-halong currency

Anumang endpoint na nagbabalik ng iisang pinagsamang kabuuan sa mga handog na maaaring halo-halo ang currency -- ang mga KPI ng giving summary (`GivingKpiCards`), kabuuan ng donation batch, kabuuan ng fund, at ang mga kabuuang year-to-date/period ng donate screen ng B1App -- ay kino-convert sa default na currency ng simbahan sa panig ng server sa halip na pagsamahin ang magkakaibang currency. Ang `Api/src/shared/helpers/ExchangeRateHelper.ts` ay kumukuha ng mga rate mula sa `api.frankfurter.dev` na nakabatay sa currency ng simbahan, kina-cache ang mga ito sa proseso sa loob ng 12 oras, at naglalantad ng `convertTotals(rows, churchCurrency, rates)`: ang mga row ay pre-grouped ayon sa currency sa SQL (ilang grupo lamang, hindi kailanman conversion bawat handog), bawat grupo ay kino-convert at sinusuma, at ang resulta ay may dalang flag na `isConverted` na ginagamit ng client para magpakita ng paalalang "Converted at current exchange rates." Inilalantad ng `GET /donations/exchange-rates` ang rate table sa mga client na nangangailangan nito (ang donate screen ng B1App); ang mga rate mismo ay hindi kailanman tinatanggap mula sa request, kinukuha lamang sa panig ng server, kaya hindi maiimpluwensyahan ng client ang iniulat na kabuuan. Ang mga indibidwal na tala ng donasyon at mga makasaysayan/orihinal-na-currency na ulat ay hindi kailanman kino-convert -- ang mga pinagsamang kabuuan lamang.

Ang Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) ay nagba-backfill ng mga handog na ginawa sa labas ng B1: tumatawag ito ng `POST /giving/donate/replay-stripe-events` na may `dryRun: true` para sa preview, pagkatapos ay `dryRun: false` para mag-import. Inililista ng server ang mga Stripe event para sa saklaw ng petsa at nilalaktawan ang anumang na-record na -- itinutugma muna ayon sa provider id ng `eventLogs`, pagkatapos ay ng `DonationRepo.findMatchingDonation` (halaga + petsa + tao) para ang muling pagpapatakbo ay hindi kailanman magdodoble ng import.

## Mga webhook at reconciliation

Ang mga nakumpletong bayad at pagbabago ng estado ng subscription ay dumarating sa `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Sadyang idempotent ang pagproseso:

1. **Verify** -- ang `GatewayService.verifyWebhook` ay nagdedelegate sa signature check ng provider; ang bigong signature ay nagbabalik ng 401. Ang mga event na hindi kailangang iproseso ay agad na sumasagot ng 200.
2. **Dedup ng event** -- nilalaktawan ng `EventLogRepo.loadByProviderId` ang webhook na na-record na sa `eventLogs`.
3. **Dedup ng donasyon** -- bago gumawa ng anuman, sinusuri ang `DonationRepo.loadByTransactionId` laban sa bawat kandidatong id na maaaring dalhin ng payload. Sinasalo nito ang mga duplicate na paghahatid, mga multi-stage na ACH event (pending → settled), at ang kasong na-log na ng `/donate/charge` ang handog nang optimistiko.
4. **Apply** -- sinasabi ng `classifyWebhookEvent(eventType)` ng provider kung ano ang ibig sabihin ng event (`donation` pending/complete, `cancel-subscription`, o `ignore`); ang mga nakumpletong bayad ay gumagawa ng `complete` na donasyon (o nagpo-promote ng kasalukuyang `pending` o `failed`), ang mga ACH-style na event ay lumalapag bilang `pending` hanggang settlement, ang nabigong subscription invoice (Stripe `invoice.payment_failed`) ay gumagawa ng `failed` na donasyon na nakabatay sa invoice id, at ang mga cancellation event ay nagbubura sa lokal na row ng `subscriptions`. Ang controller ay hindi kailanman sumusuri ng mga pangalan ng event na partikular sa provider.

### Mga nabigong recurring na handog at dunning

Ang `failed` na donasyon ang yunit ng trabaho para sa pagbawi. Inililista ito ng `GET /giving/donations/failed` kasama ang pinakabagong mensahe ng pagkabigo ng gateway mula sa `eventLogs` at flag na `canRetry` mula sa mga capability ng gateway; ang `POST /giving/donate/retry/:donationId` ay tumatawag ng `retryFailedPayment` ng provider (binabayaran ng Stripe ang bukas na invoice), at ang nagreresultang webhook ay nagpo-promote ng row sa `complete` sa pamamagitan ng karaniwang dedup path. Ang mga dunning email ay ipinapadala sa donor mula sa webhook handler sa day 0, pagkatapos ay mula sa `DunningHelper.run` sa midnight timer (naka-wire sa parehong `lambda/timer-handler.ts` at `RailwayCron.ts`) sa 3 at 7 araw; ang bawat padala ay nire-record sa `eventLogs` bilang `provider: "dunning"`, `providerId: "<donationId>:<day>"`, kaya ang muling pagpapatakbo ay hindi kailanman magpapadala ng email nang dalawang beses. Kapag sumuko ang Stripe at kinansela ang subscription (`customer.subscription.deleted` na may `cancellation_details.reason: "payment_failed"`), ang `DunningHelper.notifyCanceled` ay nag-i-email sa donor nang isang beses (`providerId: "<subscriptionId>:canceled"`); ang mga pagkansela na sinimulan ng donor o admin ay tahimik. Ang Stripe ay hindi kailanman nagdaragdag ng mga event sa kasalukuyang endpoint: pagkatapos baguhin ang `StripeHelper.webhookEvents`, muling i-save ang gateway o patakbuhin ang `tools/manual/stripe-webhook-events.ts` (dry run bilang default, `--apply` para magsulat) laban sa prod.

Ang mga provider na may `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ay may mga charge na nilo-log mula sa tugon ng `/charge` (hindi na kailangan ng webhook round-trip sa maayos na kaso), habang ang Stripe ay umaasa sa `payment_intent.succeeded` / `invoice.paid` at sa ACH `payment_intent.processing`. Ang paghawak sa fee (`POST /giving/donate/fee`, ang flag ng gateway na `payFees`, at ang `calculateFees` ng bawat provider) ay kinukuwenta ang "cover the fees" gross-up sa panig ng donor -- ang B1 ay walang kinukuhang bahagi bilang platform, kaya walang application fee na idinaragdag.

:::info
Ang mga landas ng charge at webhook ay nagsusulat ng parehong mga row ng `donations` / `fundDonations`. Ang `transactionId` ang join key na pumipigil sa optimistikong charge log at sa kasunod nitong webhook na makagawa ng dalawang donasyon para sa isang handog.
:::

## Mga Kaugnay na Pahina

- [Mga Endpoint ng Pagbibigay](../api/endpoints/giving) — buong REST surface para sa mga donasyon, fund, batch, gateway, subscription, paraan ng pagbabayad, at webhook
- [AppHelper](../shared-libraries/app-helper) — ang npm package na may dalang payment provider registry at mga component ng donasyon
- [Istruktura ng Module](../api/module-structure) — kung paano inaayos ang GivingApi module sa panig ng server
