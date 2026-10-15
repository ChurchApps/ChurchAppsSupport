---
title: "Arkitektura ng Giving"
---

# Arkitektura ng Giving

<div class="article-intro">

Ang ChurchApps ay nagpapatakbo ng mga donasyon sa modelong gateway-rail: pinananatili ng simbahan ang sarili nitong Stripe (o PayPal, Kingdom Funding, o Paystack) account, at hindi kailanman pumapasok ang B1 sa daloy ng pera bilang platform processor. Ang datos ng card ay tino-tokenize sa browser at hindi kailanman umaabot sa server ng ChurchApps. Inilalatag ng pahinang ito ang buong stack -- ang client-side provider registry sa `@churchapps/apphelper`, ang gateway abstraction ng GivingApi, ang data model ng donasyon, at kung paano ibinabalik ng mga webhook ng gateway ang mga pagbabago sa database.

</div>

## Pangkalahatang-ideya

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

1. **Hawak ng gateway ang card.** Tino-tokenize sa browser ng entry widget ng bawat provider; ang API ay tumatanggap lamang ng token, nonce, o order id.
2. **Isang abstraction, maraming provider.** Kumukuha ang browser ng `PaymentProvider` mula sa isang registry; kumukuha ang server ng `IGatewayProvider` mula sa isang factory. Pareho silang gumagamit ng iisang normalized na pangalan ng provider na nakaimbak sa gateway record.
3. **Ang mga webhook ang tunay na pinagmumulan para sa settlement.** Naitatala nang optimistic ang tugon ng charge, ngunit ang naka-sign na webhook ng gateway ang nagkukumpirma (o lumilikha) ng nakumpletong donasyon, na may mga idempotency guard sa magkabilang panig.

## Client-side: ang payment provider registry (`@churchapps/apphelper`)

Nasa `Packages/apphelper/src/donations/providers/` ang registry, kung saan ang bawat widget at helper ng provider ay nasa sarili nitong subfolder (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- walang nasa labas ng `providers/` na nagsasanga batay sa pangalan ng provider. Ang `PaymentProvider` (tingnan ang `providers/types.ts`) ay naglalaman ng lahat ng kailangan ng host app para sa isang gateway: isang `descriptor` (mga label para sa admin, mga suportadong currency, mga field ng bayarin, mga default na fee rate, mga URL ng dashboard/signup), isang set ng `capabilities` (mga naka-save na card, ACH, recurring, inline na pagpasok ng bagong card, implicit na save-on-tokenize), ang mga React widget para sa pagpasok ng miyembro (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), pag-edit ng naka-save na paraan (`MethodEditForm`), at mga bayad sa form-question (`FormPayment`), kasama ang `buildChargeRequest(ctx, token)` -- ang nag-iisang lugar kung saan nag-iiba ang hugis ng charge payload kada provider. Nilo-load ng `MemberWrapper` ng bawat provider ang sarili nitong SDK mula sa public key ng gateway record, kaya hindi kailanman nag-i-import ng gateway SDK ang mga host app (walang dependency sa `@stripe/*` ang B1App at B1Admin). Pinagsasama-sama ng `pickDefaultGateway(gateways, capability?)` kung aling gateway ng simbahan ang dapat gamitin ng isang surface.

Nasa `providers/registry.ts` ang mga built-in. **Tinutukoy ang mga ito bilang value**, hindi nire-register sa pamamagitan ng module side-effect, kaya hindi kailanman maaaring alisin ng tree-shaking ng bundler ang registration:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Function | Layunin |
|----------|---------|
| `getPaymentProvider(name)` | Kunin ayon sa normalized na pangalan; bumabalik sa Stripe upang ang maling naka-configure na provider ay hindi kailanman tuluyang mag-crash sa donor form |
| `registerPaymentProvider(p)` | Mag-register ng karagdagang provider sa runtime (para sa custom na gateway ng host app) |
| `listPaymentProviders()` | Ilista ang built-in at custom na provider -- ginagamit para buuin ang admin gateway dropdown |
| `hasPaymentProvider(name)` | Pagsusuri ng membership |

**Mga built-in na client provider: Stripe, PayPal, Kingdom Funding, Paystack.** Ang B1App at B1Admin ay *nagbabasa lamang* ng registry (`getPaymentProvider`, `listPaymentProviders`); walang tumatawag sa `registerPaymentProvider` sa alinman sa dalawa -- nananatili ang registration sa loob ng apphelper.

Magkakaiba ang tokenization ng bawat provider, ngunit lahat ay pinananatiling wala sa B1 ang card:

| Provider | Entry widget | Token na ibinabalik sa API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; ini-mount din ng guest form ang `ExpressCheckoutElement` (Apple Pay / Google Pay, para sa one-time na regalo) na ang `onConfirm` ay nagreresolba sa parehong `pm_…` id | payment-method id (`pm_…`); bank sa pamamagitan ng `/paymentmethods/ach-setup-intent` -- Financial Connections `us_bank_account` para sa mga USD gateway, Canadian PAD `acss_debit` (hosted mandate modal, `default_for` ng mandate para sa mga invoice/subscription, ang mga one-off charge ay nagpapasa ng mandate id) para sa mga CAD gateway |
| Kingdom Funding | Hosted tokenizer form na naka-key sa public key ng gateway | single-use nonce |
| PayPal | PayPal Hosted Fields (card, recurring) kasama ang PayPal Smart Buttons na may Venmo funding (one-time); parehong nagbabahagi ng iisang SDK load at ang server order na binubuo sa pamamagitan ng `/donate/client-token` + `/donate/create-order` | captured order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) -- ang popup mismo ang kumukuha ng bayad (card, mobile money, bank transfer, USSD) | paid transaction reference; ang mga naka-save na paraan ay mga Paystack `AUTH_…` authorization code |

Pinapatakbo ng `finalizeResult` ng Stripe ang 3-D Secure / SCA sa browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) bago ituring na kumpleto ang donasyon; tinatawag lamang ng shared form ang `provider.finalizeResult(result)` nang walang alam kung ano ang ginagawa nito.

## Server-side: ang gateway abstraction (GivingApi)

Inilalantad ng `/giving` module (`Api/src/modules/giving`) ang REST surface; nasa `Api/src/shared/helpers` ang plumbing ng gateway. Hindi kailanman direktang nakikipag-usap ang `DonateController` sa SDK ng gateway -- dumadaan ito sa `GatewayService`, na kumukuha ng tamang `IGatewayProvider` mula sa `GatewayFactory` at binibigyan ito ng na-decrypt na `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

Ang `IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ay ang kontratang ipinapatupad ng bawat gateway -- lifecycle ng webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagbabayad (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), bayarin (`calculateFees`), paghawak ng naka-save na paraan (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), at mga opsyonal na karagdagan (customers, orders, SetupIntents, event replay, `retryFailedPayment` para sa isang nabigong subscription invoice, `registerPaymentMethodDomain` para sa Apple Pay domain verification). Kapag hindi ipinatupad ng isang provider ang opsyonal na hook, iniuulat itong hindi suportado para sa aksyong iyon at itinatago ng UI ang kontrol. Bawat provider class ay nagdedeklara ng sarili nitong `capabilities` matrix (mga suportadong currency, ACH, refund, mga kinakailangan sa subscription, mga limitasyon sa transaksyon) -- binabasa lamang ito ng `GatewayService.getProviderCapabilities(provider)` -- at ang mga flag gaya ng `logsDonationsImmediately` ang nagtutulak ng asal ng controller nang walang anumang kondisyon batay sa pangalan ng provider sa mga controller.

**Mga server provider na naka-register sa `GatewayFactory`:**

| Provider | Availability |
|----------|-------------|
| Stripe | Laging naka-on |
| PayPal | Laging naka-on |
| Kingdom Funding | Laging naka-on |
| Paystack | Laging naka-on (para sa mga merchant sa Nigeria, Ghana, South Africa, Kenya, Côte d'Ivoire; mga currency na NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in sa pamamagitan ng `ENABLE_SQUARE` environment flag |
| ePayMints | Opt-in sa pamamagitan ng `ENABLE_EPAYMINTS` environment flag |

Naiiba ang Paystack sa iba dahil gumagalaw ang pera bago pa kasangkot ang GivingApi: sinisingil ng popup ang donor, ang `processCharge` ay isang `GET /transaction/verify/:reference` na ang nabayarang halaga at currency ay dapat tumugma sa donasyong itatala (ang reference na nasa file na ay hindi kailanman nilo-log nang dalawang beses), at ang unang regalo ng recurring schedule ay nila-log mula sa `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` na may `start_date` na isang interval mula ngayon). Naka-sign ang mga webhook gamit ang mismong secret key (`x-paystack-signature`, HMAC-SHA512 sa raw body), at walang webhook-management API ang Paystack, kaya ipinapakita ng admin screen ang URL para ipaste ng simbahan sa dashboard nito. Ang `charge.success` na renewal event ay walang fund split; binabawi ito ng provider mula sa mga lokal na row ng `subscriptions`/`subscriptionFunds` ng donor. Tanging ang card authorization ang `reusable` -- ang mobile money na regalo ay one-time lamang, kaya tinatanggihan ito ng `createSubscription`. Nagse-seed ang demo data ng pangalawang simbahan (Accra Community Church, `CHU00000002`) sa isang Paystack test-mode na GHS gateway, para tumakbo ang Paystack Playwright suite kasabay ng Stripe ni Grace.

Maaaring i-register ang mga custom na provider sa runtime kapag naka-set ang `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; ang `AbstractExperimentalGatewayProvider` ang base class para sa mga iyon. Case-insensitive ang pagtutugma ng mga pangalan ng provider.

### Configuration ng gateway at mga secret

Nagsa-save ang admin ng mga kredensyal ng gateway sa pamamagitan ng `POST /giving/gateways` (`GatewayController`). Sa pag-save, ine-encrypt ng controller ang private at webhook key gamit ang `EncryptionHelper` bago i-persist, at pagkatapos -- sa anumang host na hindi localhost -- binubura ang umiiral na webhook ng simbahan at nagpo-provision ng bago na nakaturo sa `/giving/donate/webhook/{provider}?churchId=…`. Isang row kada provider ang iniingatan ng simbahan: ang pag-save ng gateway ay pinapalitan lamang ang umiiral na row para sa parehong provider. Ang mga public na pagbasa (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ay nagbabalik lamang ng public key.

## Data model

Ang giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, mga model sa `models/`) ay isang MySQL schema na ina-access sa pamamagitan ng Kysely:

| Table | Papel |
|-------|------|
| `gateways` | Configuration ng provider bawat simbahan: `provider`, `publicKey`, naka-encrypt na `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Mga designasyon ng giving (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Pagpapangkat para sa entry/pag-uulat (`name`, `batchDate`) |
| `donations` | Isang regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; ang mga statement, kabuuan, dashboard, at ulat ng donasyon ay binibilang lamang ang `complete` o null), `transactionId` |
| `fundDonations` | Alokasyon ng isang donasyon sa isa o higit pang fund (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Paulit-ulit na regalo; ang `id` ay ang subscription id ng gateway, naka-link sa `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fund split para sa paulit-ulit na regalo |
| `customers` | Nagli-link ng `personId` sa customer id nito sa gateway, bawat `provider` |
| `gatewayPaymentMethods` | Naka-save na card/bank: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Audit trail ng webhook/event at dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Mga pledge campaign na naka-tali sa isang fund, at ang pledged na halaga ng bawat tao |

Hinahati ang isang donasyon sa mga fund sa pamamagitan ng `fundDonations` -- dala ng donasyon ang kabuuan, bawat `fundDonation` ay dala ang isang bahagi. Dala ng `donations.currency` at `gateways.currency` ang ISO currency; bawat provider ay nag-aanunsyo ng kanyang `supportedCurrencies`, at ino-format ang mga halaga gamit ang `CurrencyHelper.formatCurrencyWithLocale`.

## Mga end-to-end na daloy

### Miyembro: one-time at recurring (B1App)

Ang authenticated na donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) ay pinagsasama ang tatlong apphelper component: `MultiGatewayDonationForm`, `PaymentMethods`, at `RecurringDonations`. Ginagawa ng B1App ang nakapalibot na pag-load ng datos -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- at ipinapasa ang listahan ng gateway; ang nireresolbang provider ay nagla-load ng sarili nitong SDK mula sa public key ng gateway. Nangyayari sa loob ng apphelper mismo ang aktwal na charge: tino-tokenize ng nireresolbang provider ang paraan (bago o naka-save), pagkatapos ay nagpo-post sa `/giving/donate/charge` para sa one-time na regalo o `/giving/donate/subscribe` para sa recurring. Parehong endpoint ay ina-attribute ang naka-sign in na donor sa sarili nitong `personId` (tanging ang may hawak ng `donations.edit` ang maaaring mag-attribute sa ibang tao) at tinatanggihan ang mga fund split na lalampas sa halagang sinisingil. Ang recurring na regalo ay lumilikha ng row na `subscriptions` kasama ang `subscriptionFunds` at ibinibigay ang iskedyul sa gateway (Stripe Subscriptions, PayPal Billing Plans, o KF recurring schedule).

### Guest / anonymous na giving

Ang public na donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) at ang "give now" panel ay nagre-render ng `NonAuthDonationWrapper` mula sa `@churchapps/apphelper/website`, na nag-iinject ng reCAPTCHA at ng Elements context ng gateway sa paligid ng `GuestForm` ng provider. Walang login, walang naka-save na paraan, at walang kasaysayan ang mga guest. Kinukuha ng daloy ang `GET /giving/funds/churchId/:id` at `GET /giving/donate/gateways/:churchId` (public key lamang), bini-verify ang bisita gamit ang `POST /giving/donate/captcha-verify`, nagto-tokenize sa browser, at nagpo-post sa `/giving/donate/charge` (o `/subscribe`). Gumagamit ang guest ACH ng anonymous na `POST /giving/paymentmethods/ach-setup-intent-anon`, na nagpapahintulot lamang ng instant (Financial Connections) na verification: natatapos ang microdeposit check pagkaraan ng ilang araw, pagkatapos mawala ang guest page, kaya hindi ito kailanman makukumpleto ang regalo. Tumatangging mag-charge ang form sa isang hindi pa na-verify na SetupIntent at itinuturo sa donor ang card o naka-sign in na bank setup.

Tatlong guest-form na opsyon ang sumasakay sa parehong charge call. Ang `?fundId=` at `?amount=` sa donate URL ay nagpi-preselect ng fund split (binabasa ng guest form ng bawat provider sa mount, at dumadaan sa normal na fund-change handler upang ma-update ang mga kabuuan at bayarin). Ang `anonymous: true` ay nagpapawalang-bisa sa anumang taong ipinadala ng client sa `DonateController.charge` at itinatala ang regalo gamit ang `personId = null`; nilalaktawan ng guest form ang `/people/loadOrCreate` at ang hakbang ng customer/vault, at tumitigil ang tatlong immediate-log na provider sa pagre-resolve ng tao mula sa gateway customer. Kailangang naka-register sa Stripe ang domain ng page para gumana ang Apple Pay, kaya ang Stripe guest form ay nagpo-post nang isang beses bawat session sa public, rate-limited na `POST /giving/donate/register-domain`, na tumatanggap lamang ng domain na pag-aari ng simbahan (`<subDomain>.b1.church`, isang row sa domains table ng content module, o isang local host) bago tawagin ang payment-method-domains API ng Stripe.

### Admin na pagtatala at Stripe import (B1Admin)

Dito nagtatrabaho ang finance team sa B1Admin donations section (`B1Admin/src/donations/`). Ang batch entry (`components/BulkDonationEntry.tsx`) ay nagtatala ng cash/check/in-kind na regalo sa pamamagitan ng pag-post sa `/giving/donations` at pagkatapos `/giving/funddonations` -- walang gateway na sangkot. Ginagawa rin ito ng sheet na **Log a gift** sa person record (`components/LogGiftDialog.tsx`) para sa iisang regalo, sa pamamagitan muna ng paghahanap ng batch na tumutugma ang `batchDate` sa petsa ng regalo o paggawa ng isa na ang pangalan ay ang petsang iyon (`POST /giving/donationbatches`), at pagbura muli ng donasyon/bagong batch kung mabigo ang susunod na hakbang. Bawat fund, batch, campaign, at statement ay tumutugma sa kanilang `/giving/*` CRUD route. Ginagamit ng member-style na donate panel (`B1Admin/src/donationComponents/`) ang parehong apphelper component ng B1App.

Ang pag-uulat at mga handoff sa accounting ay client-side o gawain ng report runner, hindi gawain ng gateway: ang QuickBooks export ng batch page ay bumubuo ng journal-entry CSV mula sa `donations` + `fundDonations` ng batch (debit Undeposited Funds, isang credit bawat fund), ang Lapsed Givers view ng Summary page ay nagpapatakbo ng `Api/reports/lapsedGivers.json` sa pamamagitan ng generic report runner na may mga pangalan ng tao na niresolba ng `ReportOutput`, at ang mga format ng resibo ng bansa (Canada / Australia / New Zealand) ay mga setting ng simbahan sa key/value store ng membership na nire-render ng `GivingStatementDocument` at dinoduplicate sa print page ng B1App. Ipinapasa ng mga print page ng statement ng B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) ang setting na `logoLight` ng simbahan (sa pamamagitan ng `usePrintLogo` sa `B1Admin/src/components/PrintChurchHeader.tsx`) upang mai-print ang logo sa itaas ng bawat statement, at hinihintay ang larawan bago awtomatikong mag-print.

### Pag-convert ng halong-currency na kabuuan

Anumang endpoint na nagbabalik ng iisang pinagsamang kabuuan mula sa posibleng halong-currency na regalo -- ang giving summary KPI (`GivingKpiCards`), kabuuan ng donation batch, kabuuan ng fund, at ang year-to-date/period totals ng donate screen ng B1App -- ay nagko-convert sa default na currency ng simbahan sa server side sa halip na magdagdag ng magkakaibang currency. Kumukuha ang `Api/src/shared/helpers/ExchangeRateHelper.ts` ng mga rate mula sa `api.frankfurter.dev` na naka-key sa currency ng simbahan, nagca-cache sa loob ng proseso nang 12 oras, at naglalantad ng `convertTotals(rows, churchCurrency, rates)`: ang mga row ay paunang pinapangkat ayon sa currency sa SQL (ilang grupo lamang, hindi kailanman per-gift na conversion), bawat grupo ay kino-convert at dinadagdag, at ang resulta ay may dalang flag na `isConverted` na ginagamit ng client upang ipakita ang tala na "Converted at current exchange rates". Inilalantad ng `GET /donations/exchange-rates` ang talahanayan ng rate sa mga client na nangangailangan nito (ang donate screen ng B1App); ang mga rate mismo ay hindi kailanman tinatanggap mula sa request, laging kinukuha lamang sa server side, kaya walang client na makakaimpluwensya sa iniulat na kabuuan. Ang indibidwal na donation record at ang mga historikal/orihinal-na-currency na ulat ay hindi kailanman kino-convert -- ang mga pinagsamang kabuuan lamang.

Ang Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) ay nagbabalik ng mga regalong ginawa sa labas ng B1: tumatawag ito sa `POST /giving/donate/replay-stripe-events` na may `dryRun: true` para sa preview, pagkatapos `dryRun: false` para mag-import. Inililista ng server ang mga Stripe event para sa saklaw ng petsa at nilalaktawan ang anumang naitala na -- unang tinutugma sa pamamagitan ng provider id ng `eventLogs`, pagkatapos sa transaction id, pagkatapos sa `DonationRepo.findMatchingDonation` (halaga + petsa + tao) upang hindi kailanman madoble ng muling pagtakbo ang import. Nilalaktawan ang mga subscription na `charge.succeeded` / `payment_intent.succeeded` na event dahil itinatala ng `invoice.paid` ang mga regalong iyon; dinadrop ng mas bagong bersyon ng Stripe API ang `PaymentIntent.invoice`, kaya ang paglaktaw ay nakabatay din sa paglalarawang "Subscription …".

## Mga webhook at reconciliation

Ang mga nabayarang pagbabayad at pagbabago sa estado ng subscription ay dumarating sa `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Sadyang idempotent ang pagproseso:

1. **I-verify** -- ipinapasa ng `GatewayService.verifyWebhook` ang pagsusuri ng signature sa provider; ang nabigong signature ay nagbabalik ng 401. Ang mga event na hindi kailangang iproseso ay agad nagbabalik ng 200.
2. **I-dedup ang event** -- nilalaktawan ng `EventLogRepo.loadByProviderId` ang webhook na naitala na sa `eventLogs`.
3. **I-dedup ang donasyon** -- bago gumawa ng anuman, sinusuri ang `DonationRepo.loadByTransactionId` laban sa bawat posibleng candidate id na maaaring dala ng payload. Sumasalo ito sa mga duplicate na delivery, sa mga multi-stage na ACH event (pending → settled), at sa kaso kung saan naitala na nang optimistic ng `/donate/charge` ang regalo.
4. **Ilapat** -- sinasabi ng `classifyWebhookEvent(eventType)` ng provider kung ano ang ibig sabihin ng event (`donation` pending/complete, `cancel-subscription`, o `ignore`); ang mga nakumpletong pagbabayad ay lumilikha ng `complete` na donasyon (o nagpo-promote ng umiiral na `pending` o `failed`), ang mga event na tulad ng ACH ay napupunta bilang `pending` hanggang ma-settle, ang nabigong subscription invoice (Stripe `invoice.payment_failed`) ay lumilikha ng `failed` na donasyon na naka-key sa invoice id, at binubura ng mga cancellation event ang lokal na row ng `subscriptions`. Hindi kailanman sinusuri ng controller ang mga pangalan ng event na tiyak sa provider.

### Mga nabigong recurring na regalo at dunning

Ang `failed` na donasyon ang yunit ng trabaho para sa pagbawi. Inililista ito ng `GET /giving/donations/failed` kasama ang pinakabagong mensahe ng pagkabigo ng gateway mula sa `eventLogs` at isang flag na `canRetry` mula sa capabilities ng gateway; tinatawag ng `POST /giving/donate/retry/:donationId` ang `retryFailedPayment` ng provider (binabayaran ng Stripe ang bukas na invoice), at ang nagresultang webhook ay nagpo-promote ng row sa `complete` sa pamamagitan ng karaniwang dedup path. Ang mga dunning email ay ipinapadala sa donor mula sa webhook handler sa day 0, pagkatapos mula sa `DunningHelper.run` sa midnight timer (naka-wire sa `lambda/timer-handler.ts` at `RailwayCron.ts`) sa araw 3 at 7; bawat pagpapadala ay naitala sa `eventLogs` bilang `provider: "dunning"`, `providerId: "<donationId>:<day>"`, kaya hindi kailanman makakapagpadala muli ng email ang muling pagtakbo. Kapag sumuko ang Stripe at kinansela ang subscription (`customer.subscription.deleted` na may `cancellation_details.reason: "payment_failed"`), minsang nagpapadala ng email sa donor ang `DunningHelper.notifyCanceled` (`providerId: "<subscriptionId>:canceled"`); nananatiling tahimik ang mga pagkansela na mula sa donor o admin. Hindi kailanman nagdaragdag ang Stripe ng event sa umiiral na endpoint: pagkatapos baguhin ang `StripeHelper.webhookEvents`, alinman sa i-save muli ang gateway o patakbuhin ang `tools/manual/stripe-webhook-events.ts` (dry run bilang default, `--apply` para magsulat) laban sa prod.

Ang mga provider na may `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ay nila-log ang kanilang mga charge mula sa tugon ng `/charge` (hindi kailangan ng round-trip ng webhook para sa happy path), habang umaasa ang Stripe sa `payment_intent.succeeded` / `invoice.paid` at sa ACH na `payment_intent.processing`. Ang paghawak ng bayarin (`POST /giving/donate/fee`, ang flag ng gateway na `payFees`, at ang `calculateFees` ng bawat provider) ang kumukuwenta ng "cover the fees" na gross-up sa panig ng donor -- walang platform cut ang B1, kaya hindi kailanman nagdaragdag ng application fee.

:::info
Ang charge at webhook path ay nagsusulat ng parehong row ng `donations` / `fundDonations`. Ang `transactionId` ang join key na pumipigil sa optimistic na charge log at sa kasunod nitong webhook na makalikha ng dalawang donasyon para sa iisang regalo.
:::

## Mga Kaugnay na Pahina

- [Giving Endpoints](../api/endpoints/giving) -- kumpletong REST surface para sa mga donasyon, fund, batch, gateway, subscription, paraan ng pagbabayad, at webhook
- [AppHelper](../shared-libraries/app-helper) -- ang npm package na nagpapadala ng payment provider registry at mga component ng donasyon
- [Module Structure](../api/module-structure) -- kung paano inaayos ang GivingApi module sa server side
