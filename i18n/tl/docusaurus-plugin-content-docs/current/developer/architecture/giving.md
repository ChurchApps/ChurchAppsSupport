---
title: "Arkitektura ng Giving"
description: "Gabay ng developer sa giving ng ChurchApps: paano ipinapadala ng B1 Admin at B1.church ang donasyon sa Stripe, PayPal, Kingdom Funding, o Paystack."
---

# Arkitektura ng Giving

<div class="article-intro">

Pinapatakbo ng ChurchApps ang mga donasyon sa modelong gateway-rail: pinapanatili ng simbahan ang sarili nitong Stripe (o PayPal, Kingdom Funding, o Paystack) account, at hindi kailanman pumapasok ang B1 sa daloy ng pera bilang platform processor. Tokenized sa browser ang datos ng card at hindi kailanman umaabot sa server ng ChurchApps. Sakop ng pahinang ito ang buong stack -- ang client-side na provider registry sa `@churchapps/apphelper`, ang gateway abstraction ng GivingApi, ang data model ng donasyon, at kung paano bumabalik sa database ang mga webhook ng gateway.

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

Tatlong prinsipyo ang nananatili sa buong stack:

1. **Ang gateway ang may hawak ng card.** Ang bawat entry widget ng provider ay nagto-tokenize sa browser; ang API ay tumatanggap lang ng token, nonce, o order id.
2. **Isang abstraction, maraming provider.** Nireresolba ng browser ang `PaymentProvider` mula sa isang registry; nireresolba ng server ang `IGatewayProvider` mula sa isang factory. Pareho silang umaasa sa iisang normalized na pangalan ng provider na nakaimbak sa gateway record.
3. **Ang mga webhook ang pinagmumulan ng katotohanan para sa settlement.** Naitatala nang optimistic ang charge response, pero ang signed na webhook ng gateway ang nagkukumpirma (o gumagawa) ng natapos na donasyon, na may idempotency guard sa magkabilang panig.

## Panig ng client: ang payment provider registry (`@churchapps/apphelper`)

Nasa `Packages/apphelper/src/donations/providers/` ang registry, kung saan ang mga widget at helper ng bawat provider ay nasa sarili nilang subfolder (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- walang nasa labas ng `providers/` na nagsasanga batay sa pangalan ng provider. Pinagsasama ng `PaymentProvider` (tingnan ang `providers/types.ts`) ang lahat ng kailangan ng host app para sa isang gateway: isang `descriptor` (mga label ng admin, sinusuportahang currency, fee field, default na fee rate, mga URL ng dashboard/signup), isang set ng `capabilities` na flag (naka-save na card, ACH, paulit-ulit, inline na pagpasok ng bagong card, implicit na save-on-tokenize), ang mga React widget para sa pagpasok ng miyembro (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), pag-edit ng naka-save na paraan (`MethodEditForm`), at mga bayad sa form question (`FormPayment`), kasama ang `buildChargeRequest(ctx, token)` -- ang iisang lugar kung saan nag-iiba ang hugis ng charge payload kada provider. Ang `MemberWrapper` ng bawat provider ay naglo-load ng sarili nitong SDK mula sa public key ng gateway record, kaya hindi kailanman nag-i-import ng gateway SDK ang host app (walang dependency sa `@stripe/*` ang B1App at B1Admin). Sentralisado ng `pickDefaultGateway(gateways, capability?)` kung aling gateway ng simbahan ang dapat gamitin ng isang surface.

Hawak ng `providers/registry.ts` ang mga built-in. **Tinutukoy sila ayon sa value**, hindi sa pamamagitan ng module side-effect na registration, kaya hindi kailanman maaaring alisin ng tree-shaking ng bundler ang registration:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Function | Layunin |
|----------|---------|
| `getPaymentProvider(name)` | Resolbahin ayon sa normalized na pangalan; bumabalik sa Stripe para hindi kailanman bumagsak nang husto ang donor form dahil sa maling configuration ng provider |
| `registerPaymentProvider(p)` | Magrehistro ng dagdag na provider sa runtime (para sa custom na gateway ng host app) |
| `listPaymentProviders()` | Ilista ang mga built-in + custom -- ginagamit para buuin ang dropdown ng gateway ng admin |
| `hasPaymentProvider(name)` | Pagsusuri ng membership |

**Mga built-in na client provider: Stripe, PayPal, Kingdom Funding, Paystack.** *Binabasa* lang ng B1App at B1Admin ang registry (`getPaymentProvider`, `listPaymentProviders`); hindi sila tumatawag sa `registerPaymentProvider` -- nananatili ang registration sa loob ng apphelper.

Iba-iba ang pag-tokenize ng bawat provider, pero lahat ay pinapanatiling wala sa B1 ang card:

| Provider | Entry widget | Token na ibinabalik sa API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; ang guest form ay nagmo-mount din ng `ExpressCheckoutElement` (Apple Pay / Google Pay, para sa isang beses na regalo) na ang `onConfirm` ay nireresolba sa parehong `pm_…` id | payment-method id (`pm_…`); bank sa pamamagitan ng `/paymentmethods/ach-setup-intent` -- Financial Connections `us_bank_account` para sa mga USD gateway, Canadian PAD `acss_debit` (hosted mandate modal, mandate `default_for` invoices/subscriptions, ang mga one-off charge ay nagpapasa ng mandate id) para sa mga CAD gateway |
| Kingdom Funding | Hosted tokenizer form na nakatali sa gateway public key | single-use na nonce |
| PayPal | PayPal Hosted Fields (card, paulit-ulit) kasama ang PayPal Smart Buttons na may Venmo funding (isang beses); parehong nagbabahagi ng iisang SDK load at ang server order na binuo sa pamamagitan ng `/donate/client-token` + `/donate/create-order` | nakuhang order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) -- ang popup mismo ang nagproseso ng bayad (card, mobile money, bank transfer, USSD) | reference ng bayad na transaksyong nabayaran; ang mga naka-save na paraan ay mga Paystack `AUTH_…` authorization code |

Pinapatakbo ng `finalizeResult` ng Stripe ang 3-D Secure / SCA sa browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) bago ituring na kumpleto ang donasyon; tinatawag lang ng shared form ang `provider.finalizeResult(result)` nang walang alam kung ano ang ginagawa nito.

## Panig ng server: ang gateway abstraction (GivingApi)

Inilalantad ng module na `/giving` (`Api/src/modules/giving`) ang REST surface; nasa `Api/src/shared/helpers` ang plumbing ng gateway. Hindi kailanman direktang kinakausap ng `DonateController` ang SDK ng gateway -- dumadaan ito sa `GatewayService`, na nireresolba ang tamang `IGatewayProvider` mula sa `GatewayFactory` at binibigyan ito ng decrypted na `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

Ang `IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ang kontrata na ipinatutupad ng bawat gateway -- lifecycle ng webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), bayad (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), bayarin (`calculateFees`), paghawak ng naka-save na paraan (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), at mga opsyonal na dagdag (customer, order, SetupIntent, event replay, `retryFailedPayment` para sa nabigong subscription invoice, `registerPaymentMethodDomain` para sa pag-verify ng domain ng Apple Pay). Ang provider na hindi nagpatupad ng opsyonal na hook ay iniuulat bilang hindi suportado para sa aksyong iyon at itinatago ng UI ang kontrol. Bawat klase ng provider ay nagdedeklara ng sarili nitong matrix ng `capabilities` (sinusuportahang currency, ACH, refund, mga kinakailangan sa subscription, mga limitasyon ng transaksyon) -- binabasa lang ito ng `GatewayService.getProviderCapabilities(provider)` -- at ang mga flag gaya ng `logsDonationsImmediately` ay nagtutulak ng kilos ng controller nang walang anumang provider-name conditional sa mga controller.

**Mga server provider na nakarehistro sa `GatewayFactory`:**

| Provider | Availability |
|----------|-------------|
| Stripe | Laging naka-on |
| PayPal | Laging naka-on |
| Kingdom Funding | Laging naka-on |
| Paystack | Laging naka-on (mga merchant sa Nigeria, Ghana, South Africa, Kenya, Côte d'Ivoire; mga currency na NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in sa pamamagitan ng environment flag na `ENABLE_SQUARE` |
| ePayMints | Opt-in sa pamamagitan ng environment flag na `ENABLE_EPAYMINTS` |

Iba ang Paystack sa iba dahil gumagalaw ang pera bago pa masangkot ang GivingApi: sinisingil ng popup ang donor, ang `processCharge` ay isang `GET /transaction/verify/:reference` na ang nabayarang halaga at currency ay dapat tumugma sa donasyong nire-record (ang reference na nasa file na ay hindi kailanman nilo-log nang dalawang beses), at ang unang regalo ng paulit-ulit na iskedyul ay nilolog mula sa `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` na may `start_date` na isang interval pa lang ang layo). Pinipirmahan ang mga webhook gamit ang mismong secret key (`x-paystack-signature`, HMAC-SHA512 sa raw body) at walang webhook-management API ang Paystack, kaya ipinapakita ng admin screen ang URL para ipaste ng simbahan sa dashboard nito. Ang mga renewal na event na `charge.success` ay walang fund split; binabawi ito ng provider mula sa lokal na row ng `subscriptions`/`subscriptionFunds` ng donor. Tanging ang mga card authorization ang `reusable` -- ang mobile money na regalo ay isang beses lang, kaya tinatanggihan ito ng `createSubscription`. Naglalagay ang demo data ng ikalawang simbahan (Accra Community Church, `CHU00000002`) sa isang Paystack test-mode na GHS gateway para tumakbo ang Paystack Playwright suite kasabay ng Stripe ni Grace.

Maaaring iparehistro ang mga custom provider sa runtime kapag naka-set ang `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; ang `AbstractExperimentalGatewayProvider` ang base class para sa mga iyon. Case-insensitive ang pagtutugma ng mga pangalan ng provider.

### Configuration ng gateway at mga secret

Nagse-save ang admin ng credential ng gateway sa pamamagitan ng `POST /giving/gateways` (`GatewayController`). Sa pag-save, ine-encrypt ng controller ang private at webhook key gamit ang `EncryptionHelper` bago i-persist, pagkatapos -- sa anumang host na hindi localhost -- binubura ang umiiral na webhook ng simbahan at nagpo-provision ng bago na nakaturo sa `/giving/donate/webhook/{provider}?churchId=…`. Isang row kada provider ang pinapanatili ng simbahan: ang pag-save ng gateway ay pumapalit lang sa umiiral na row para sa parehong provider. Ang mga public read (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ay nagbabalik lang ng mga public key.

## Data model

Ang giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, mga model sa `models/`) ay isang MySQL schema na ina-access sa pamamagitan ng Kysely:

| Table | Papel |
|-------|-------|
| `gateways` | Configuration ng provider kada simbahan: `provider`, `publicKey`, naka-encrypt na `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Mga designasyon ng giving (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Pagpapangkat para sa entry/pag-uulat (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Isang regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; ang mga statement, kabuuan, dashboard, at donation report ay nagbibilang lang ng `complete` o null), `transactionId` |
| `fundDonations` | Paglalaan ng donasyon sa isa o higit pang fund (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Paulit-ulit na regalo; ang `id` ay ang subscription id ng gateway, naka-link sa `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fund split para sa paulit-ulit na regalo |
| `customers` | Nag-uugnay ng `personId` sa customer id ng gateway, kada `provider` |
| `gatewayPaymentMethods` | Mga naka-save na card/bank: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Audit trail ng webhook/event at dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Mga campaign ng pangako na nakatali sa isang fund, at ang ipinangakong halaga ng bawat tao |

Hinahati ang donasyon sa mga fund sa pamamagitan ng `fundDonations` -- dala ng donasyon ang kabuuan, bawat `fundDonation` ay dala ang isang hiwa. Dala ng `donations.currency` at `gateways.currency` ang ISO currency; bawat provider ay nag-aanunsyo ng `supportedCurrencies` nito, at ina-format ang mga halaga gamit ang `CurrencyHelper.formatCurrencyWithLocale`.

## Mga end-to-end na daloy

### Miyembrong isang beses at paulit-ulit na regalo (B1App)

Binubuo ng authenticated na donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) ang tatlong component ng apphelper: `MultiGatewayDonationForm`, `PaymentMethods`, at `RecurringDonations`. Ginagawa ng B1App ang nakapaligid na data loading -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- at ipinapasa ang listahan ng gateway; ang nireresolbang provider ay naglo-load ng sarili nitong SDK mula sa public key ng gateway. Ang aktwal na singil ay nangyayari sa loob ng apphelper: tino-tokenize ng nireresolbang provider ang (bago o naka-save na) paraan, pagkatapos nagpo-post sa `/giving/donate/charge` para sa isang beses na regalo o `/giving/donate/subscribe` para sa paulit-ulit. Parehong endpoint ang nag-aatribut ng naka-sign in na donor sa sarili nilang `personId` (tanging ang mga may `donations.edit` ang maaaring mag-atribut sa iba) at tinatanggihan ang mga fund split na lampas sa halagang sinisingil. Ang paulit-ulit na regalo ay gumagawa ng row na `subscriptions` kasama ang `subscriptionFunds` at ibinibigay ang iskedyul sa gateway (Stripe Subscriptions, PayPal Billing Plans, o isang KF recurring schedule).

### Guest / anonymous na giving

Ang pampublikong donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) at ang panel na "give now" ay nagre-render ng `NonAuthDonationWrapper` mula sa `@churchapps/apphelper/website`, na nag-iinject ng reCAPTCHA at ng Elements context ng gateway sa paligid ng `GuestForm` ng provider. Walang login, walang naka-save na paraan, at walang kasaysayan ang mga guest. Kinukuha ng daloy ang `GET /giving/funds/churchId/:id` at `GET /giving/donate/gateways/:churchId` (public key lang), bini-verify ang bisita gamit ang `POST /giving/donate/captcha-verify`, tino-tokenize sa browser, at nagpo-post sa `/giving/donate/charge` (o `/subscribe`). Ang verify call ay nagbabalik ng HMAC-signed na `captchaPass` na 10 minuto (`Api/src/modules/giving/helpers/CaptchaPass.ts`) na ipinapadala ng form sa bawat guest money call; kapag `CAPTCHA_ENFORCE=true`, tinatanggihan ng Api ang mga guest na `create-order`, `charge`, `subscribe`, `addcard`, at `ach-setup-intent-anon` na tawag na walang valid na pass para sa simbahang iyon. Sinusuri ng mga guest paid event registration (`POST /content/registrations/register`) ang parehong pass ilang sandali bago ang singil; tingnan ang [Event Registrations](./registrations.md#payment-flow). Ang guest ACH ay gumagamit ng anonymous na `POST /giving/paymentmethods/ach-setup-intent-anon`, na nagpapahintulot lang ng agarang (Financial Connections) na verification: natatapos ang microdeposit check pagkalipas ng ilang araw, pagkatapos mawala na ang guest page, kaya hindi ito kailanman makukumpleto ang regalo. Tumatangging maningil ang form sa isang hindi-verified na SetupIntent at itinuturo ang donor sa card o sa signed-in na bank setup.

Tatlong opsyon ng guest form ang sumasakay sa parehong charge call. Ang `?fundId=` at `?amount=` sa donate URL ay nagpi-preselect ng fund split (binabasa ng guest form ng bawat provider sa mount, at dumadaan sa normal na fund-change handler para ma-update ang kabuuan at bayarin). Ang `anonymous: true` ay nagpapatapon ng anumang taong ipinadala ng client sa `DonateController.charge` at nagli-log ng regalo na may `personId = null`; nilalaktawan ng guest form ang `/people/loadOrCreate` at ang hakbang ng customer/vault, at hindi na nireresolba ng tatlong immediate-log provider ang isang tao mula sa gateway customer. Kailangang nakarehistro sa Stripe ang domain ng pahina para sa Apple Pay, kaya nagpo-post minsan bawat session ang Stripe guest form sa public, rate-limited na `POST /giving/donate/register-domain`, na tumatanggap lang ng domain na pag-aari ng simbahan (`<subDomain>.b1.church`, isang row sa domains table ng content module, o local host) bago tawagan ang payment-method-domains API ng Stripe.

### Pag-record ng admin at Stripe import (B1Admin)

Ang seksyon ng donasyon ng B1Admin (`B1Admin/src/donations/`) ang lugar kung saan nagtatrabaho ang mga finance team. Ang batch entry (`components/BulkDonationEntry.tsx`) ay nagre-record ng cash/check/in-kind na regalo sa pamamagitan ng pag-post sa `/giving/donations` at pagkatapos `/giving/funddonations` -- walang kasangkot na gateway. Ang sheet na **Log a gift** ng record ng tao (`components/LogGiftDialog.tsx`) ay ginagawa ang parehong para sa iisang regalo, una nitong hinahanap ang batch na may `batchDate` na tugma sa petsa ng regalo o gumagawa ng isa na pinangalanan para sa petsang iyon (`POST /giving/donationbatches`), at binubura ulit ang donasyon/bagong batch kung pumalya ang susunod na hakbang. Bawat fund, batch, campaign, at statement ay tumutugma sa kanilang `/giving/*` CRUD route; ang mga pahina ng giving statement (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) ay humihiling ng isang kalendaryong taon gamit ang `GET /donations?startDate=&endDate=` at `GET /fundDonations?startDate=&endDate=` sa halip na buong kasaysayan ng simbahan, na maaaring lumampas sa limitasyon ng laki ng response ng Lambda. Ginagamit muli ng member-style donate panel (`B1Admin/src/donationComponents/`) ang parehong apphelper component gaya ng B1App.

Ang mga hand-off ng pag-uulat at accounting ay gawain ng client-side o report-runner, hindi ng gateway: ang QuickBooks export ng batch page ay bumubuo ng journal-entry CSV mula sa `donations` + `fundDonations` ng batch (debit ang Undeposited Funds, isang credit bawat fund), ang Lapsed Givers view ng Summary page ay nagpapatakbo ng `Api/reports/lapsedGivers.json` sa pamamagitan ng generic report runner na may mga pangalan ng tao na nireresolba ng `ReportOutput`, at ang mga format ng resibo ng bansa (Canada / Australia / New Zealand) ay mga setting ng simbahan sa key/value store ng membership na nire-render ng `GivingStatementDocument` at dinudoble sa print page ng B1App. Ang mga print page ng statement ng B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) ay nagpapasa ng setting na `logoLight` ng simbahan (sa pamamagitan ng `usePrintLogo` sa `B1Admin/src/components/PrintChurchHeader.tsx`) para lumabas ang logo sa itaas ng bawat statement, at naghihintay sa larawan bago awtomatikong mag-print.

### Status ng batch at ang permiso na Enter Donations

Maaaring isara ang mga batch para manatiling gaya ng dati ang nabilang na deposito. Ang `POST /giving/donationbatches/:id/close` at `/:id/reopen` (Donations.Edit lang) ang tanging sumusulat ng `status`, `closedDate` at `closedBy` (`DonationBatchRepo.setStatus`); hindi kailanman hinahawakan ng normal na pag-save ng batch ang mga ito, kaya hindi maaaring buksang muli ng pag-post ng batch ang isang batch. Nakasentro ang write access sa `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: maaaring baguhin ng Donations.Edit ang lahat, habang ang mas makitid na permiso na Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Enter Donations" sa role editor) ay maaaring gumawa ng batch at mag-save o magbura ng mga donasyon at fund split lang habang bukas ang batch ng kasalukuyang donasyon at ang target na batch nito, at hindi kailanman para sa gateway gift (yaong may `transactionId`). Ang hinaharangang write ay nagbabalik ng `403 { error: "This batch is closed." }`. Tumatanggap ang pagbasa ng batch ng Donations.ViewSummary o Donations.Enter para mapili ng counter ang batch na kanyang pinapasukan. Sa client, ginagaya ng `B1Admin/src/donations/batchAccess.ts` ang mga panuntunang ito (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), at ipinapakita ng `Header` / `SecondaryMenuHelper` ang **Donations > Batches** sa sinumang makakakita ng batch kahit walang View Summary.

### Pag-convert ng mga kabuuang may halo-halong currency

Anumang endpoint na nagbabalik ng iisang pinagsamang kabuuan sa mga regalong posibleng may halo-halong currency -- ang mga KPI ng giving summary (`GivingKpiCards`), kabuuan ng donation batch, kabuuan ng fund, at ang mga year-to-date/period total ng donate screen ng B1App -- ay nagko-convert sa default na currency ng simbahan sa panig ng server sa halip na magdagdag ng hindi magkaparehong currency. Kumukuha ang `Api/src/shared/helpers/ExchangeRateHelper.ts` ng mga rate mula sa `api.frankfurter.dev` na naka-key sa currency ng simbahan, kinakachache ang mga ito sa proseso sa loob ng 12 oras, at naglalantad ng `convertTotals(rows, churchCurrency, rates)`: ang mga row ay paunang pinagpapangkat ayon sa currency sa SQL (iilang grupo lang, hindi per-gift na conversion), kinokonvert at sinusuma ang bawat grupo, at ang resulta ay may dalang flag na `isConverted` na ginagamit ng client para magpakita ng tala na "Converted at current exchange rates". Inilalantad ng `GET /donations/exchange-rates` ang talahanayan ng rate para sa mga client na nangangailangan nito (donate screen ng B1App); hindi kailanman tinatanggap ang mga rate mula sa request, palaging kinukuha lang sa panig ng server, kaya hindi maaaring maimpluwensyahan ng client ang iniulat na kabuuan. Hindi kailanman kinoconvert ang mga indibidwal na record ng donasyon at ang mga historikal/orihinal-na-currency na ulat -- tanging ang pinagsamang kabuuan lang.

Ang Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) ay nagbabalik ng mga regalong ginawa sa labas ng B1: tumatawag ito ng `POST /giving/donate/replay-stripe-events` na may `dryRun: true` para sa preview, pagkatapos `dryRun: false` para mag-import. Nililista ng server ang mga event ng Stripe para sa saklaw ng petsa at nilalaktawan ang anumang naitala na -- unang tinutugma ayon sa provider id ng `eventLogs`, pagkatapos sa transaction id, pagkatapos sa `DonationRepo.findMatchingDonation` (halaga + petsa + tao) para hindi kailanman madoble ang import ng muling pagtakbo. Nilalaktawan ang mga subscription na `charge.succeeded` / `payment_intent.succeeded` na event dahil itinatala ng `invoice.paid` ang mga regalong iyon; ang mas bagong bersyon ng Stripe API ay nag-aalis ng `PaymentIntent.invoice`, kaya ang laktaw ay nakabatay din sa paglalarawang "Subscription …".

## Mga webhook at reconciliation

Ang mga settled na bayad at pagbabago ng estado ng subscription ay dumarating sa `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Sadyang idempotent ang pagproseso:

1. **I-verify** -- ang `GatewayService.verifyWebhook` ay dinadaan sa signature check ng provider; ang pumalyang signature ay nagbabalik ng 401. Ang mga event na hindi kailangang iproseso ay agad na nagbabalik ng 200.
2. **I-dedup ang event** -- nilalaktawan ng `EventLogRepo.loadByProviderId` ang webhook na naitala na sa `eventLogs`.
3. **I-dedup ang donasyon** -- bago gumawa ng anuman, sinusuri ang `DonationRepo.loadByTransactionId` laban sa bawat posibleng id na maaaring dala ng payload. Sumisipsip ito ng mga duplicate na delivery, mga multi-stage na ACH event (pending → settled), at ang kasong naitala na ng `/donate/charge` ang regalo nang optimistic.
4. **Ilapat** -- sinasabi ng `classifyWebhookEvent(eventType)` ng provider kung ano ang ibig sabihin ng event (`donation` pending/complete, `cancel-subscription`, o `ignore`); ang mga natapos na bayad ay gumagawa ng donasyong `complete` (o nagpo-promote ng umiiral na `pending` o `failed`), ang mga event na tulad ng ACH ay napupunta bilang `pending` hanggang ma-settle, ang nabigong subscription invoice (Stripe `invoice.payment_failed`) ay gumagawa ng donasyong `failed` na naka-key sa invoice id, at ang mga event ng pagkansela ay nagbubura ng lokal na row ng `subscriptions`. Hindi kailanman sinusuri ng controller ang mga pangalan ng event na partikular sa provider.

### Mga nabigong paulit-ulit na regalo at dunning

Ang donasyong `failed` ang yunit ng trabaho para sa pagbawi. Inililista ng `GET /giving/donations/failed` ang mga ito kasama ang pinakabagong mensahe ng pagkabigo ng gateway mula sa `eventLogs` at isang flag na `canRetry` mula sa mga capability ng gateway; tinatawag ng `POST /giving/donate/retry/:donationId` ang `retryFailedPayment` ng provider (binabayaran ng Stripe ang bukas na invoice), at ang resultang webhook ay nagpo-promote ng row sa `complete` sa pamamagitan ng normal na dedup path. Ang mga dunning email ay ipinapadala sa donor mula sa webhook handler sa day 0, pagkatapos mula sa `DunningHelper.run` sa midnight timer (naka-wire sa `lambda/timer-handler.ts` at `RailwayCron.ts`) sa 3 at 7 araw; bawat pagpapadala ay naitatala sa `eventLogs` bilang `provider: "dunning"`, `providerId: "<donationId>:<day>"`, kaya hindi kailanman magpapadala ng email nang dalawang beses ang muling pagtakbo. Kapag sumuko ang Stripe at kinansela ang subscription (`customer.subscription.deleted` na may `cancellation_details.reason: "payment_failed"`), minsang nag-e-email sa donor ang `DunningHelper.notifyCanceled` (`providerId: "<subscriptionId>:canceled"`); tahimik ang mga pagkansela na sinimulan ng donor o admin. Hindi kailanman nagdaragdag ang Stripe ng event sa umiiral na endpoint: pagkatapos baguhin ang `StripeHelper.webhookEvents`, alinman i-save muli ang gateway o patakbuhin ang `tools/manual/stripe-webhook-events.ts` (dry run bilang default, `--apply` para magsulat) laban sa prod.

Ang mga provider na may `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ay nilo-log ang kanilang singil mula sa tugon ng `/charge` (hindi kailangan ng round-trip ng webhook para sa happy path), habang umaasa ang Stripe sa `payment_intent.succeeded` / `invoice.paid` at ACH na `payment_intent.processing`. Ang paghawak ng bayarin (`POST /giving/donate/fee`, ang flag ng gateway na `payFees`, at ang `calculateFees` ng bawat provider) ay kinukuwenta ang "cover the fees" gross-up sa panig ng donor -- walang platform cut ang B1, kaya walang application fee na idinadagdag kailanman.

:::info
Parehong row na `donations` / `fundDonations` ang isinusulat ng charge at webhook path. Ang `transactionId` ang join key na pumipigil sa optimistic charge log at sa kasunod na webhook nito na lumikha ng dalawang donasyon para sa iisang regalo.
:::

## Mga Kaugnay na Pahina

- [Giving Endpoints](../api/endpoints/giving.md) -- kumpletong REST surface para sa mga donasyon, fund, batch, gateway, subscription, paraan ng pagbabayad, at webhook
- [AppHelper](../shared-libraries/app-helper.md) -- ang npm package na naglalaman ng payment provider registry at mga component ng donasyon
- [Module Structure](../api/module-structure.md) -- kung paano inaayos ang GivingApi module sa panig ng server
