---
title: "Arkitektura ng Pagbibigay"
---

# Arkitektura ng Pagbibigay

<div class="article-intro">

Ang ChurchApps ay nagpapatakbo ng mga donasyon gamit ang modelong gateway-rail: ang simbahan ang may sariling Stripe (o PayPal, Kingdom Funding, o Paystack) account, at hindi kailanman pumapasok ang B1 sa daloy ng pera bilang platform processor. Ang card data ay tina-tokenize sa browser at hindi kailanman umaabot sa server ng ChurchApps. Inilalarawan ng pahinang ito ang buong stack: ang client-side provider registry sa `@churchapps/apphelper`, ang GivingApi gateway abstraction, ang data model ng donasyon, at kung paano bumabalik sa database ang mga webhook ng gateway para magkasundo ang mga talaan.

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

Tatlong prinsipyo ang sinusunod sa buong stack:

1. **Ang gateway ang may hawak ng card.** Ang bawat entry widget ng provider ay nagta-tokenize sa browser; ang API ay tumatanggap lamang ng token, nonce, o order id.
2. **Iisang abstraction, maraming provider.** Kinukuha ng browser ang `PaymentProvider` mula sa registry; kinukuha naman ng server ang `IGatewayProvider` mula sa factory. Parehong gumagamit ng iisang normalized na pangalan ng provider na nakaimbak sa gateway record.
3. **Ang mga webhook ang pinagmumulan ng katotohanan para sa settlement.** Naitatala nang optimistic ang charge response, ngunit ang signed webhook ng gateway ang nagkukumpirma (o lumilikha) ng nakumpletong donasyon, na may idempotency guard sa magkabilang panig.

## Client-side: ang payment provider registry (`@churchapps/apphelper`)

Nasa `Packages/apphelper/src/donations/providers/` ang registry, at ang bawat provider ay may sariling subfolder para sa mga widget at helper nito (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Walang anumang nasa labas ng `providers/` na nag-sasanga batay sa pangalan ng provider. Ang `PaymentProvider` (tingnan ang `providers/types.ts`) ay naglalaman ng lahat ng kailangan ng host app para sa isang gateway: isang `descriptor` (mga label sa admin, mga sinusuportahang currency, fee fields, default na fee rate, mga URL ng dashboard/signup), isang set ng `capabilities` flag (mga naka-save na card, ACH, recurring, inline na bagong card entry, implicit na save-on-tokenize), ang mga React widget para sa pagpasok ng miyembro (`MemberWrapper`/`MemberEntry`), guest giving (`GuestForm`), pag-edit ng naka-save na paraan ng pagbabayad (`MethodEditForm`), at mga bayad sa form question (`FormPayment`), kasama ang `buildChargeRequest(ctx, token)`, ang iisang lugar kung saan nagkakaiba ang hugis ng charge payload kada provider. Ang `MemberWrapper` ng bawat provider ay naglo-load ng sarili nitong SDK mula sa public key ng gateway record, kaya hindi kailanman nag-iimport ng gateway SDK ang mga host app (walang dependency sa `@stripe/*` ang B1App at B1Admin). Pinagsasama-sama ng `pickDefaultGateway(gateways, capability?)` kung aling gateway ng simbahan ang dapat gamitin ng isang surface.

Ang `providers/registry.ts` ang naglalaman ng mga built-in. **Ipinapasa ang mga ito bilang value**, hindi nirerehistro sa pamamagitan ng module side-effect, kaya hindi kailanman maaalis ng tree-shaking ng bundler ang rehistro:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Function | Layunin |
|----------|---------|
| `getPaymentProvider(name)` | Kukunin ayon sa normalized na pangalan; babalik sa Stripe para hindi biglang mag-crash ang donor form dahil sa maling provider |
| `registerPaymentProvider(p)` | Magrehistro ng dagdag na provider habang tumatakbo (para sa custom gateway ng host app) |
| `listPaymentProviders()` | Inilalista ang mga built-in at custom na provider, ginagamit sa pagbuo ng dropdown ng gateway sa admin |
| `hasPaymentProvider(name)` | Pagsusuri kung kasama ang provider |

**Mga built-in na client provider: Stripe, PayPal, Kingdom Funding, Paystack.** Ang B1App at B1Admin ay *nagbabasa* lamang ng registry (`getPaymentProvider`, `listPaymentProviders`); wala sa kanila ang tumatawag sa `registerPaymentProvider`. Nananatili ang pagpapatala sa loob ng apphelper.

Magkakaiba ang paraan ng pag-tokenize ng bawat provider, ngunit lahat ay pinapanatiling wala sa B1 ang card:

| Provider | Entry widget | Token na ibinabalik sa API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; ang guest form ay nagkakabit din ng `ExpressCheckoutElement` (Apple Pay / Google Pay, para sa one-time na regalo) na ang `onConfirm` ay nagbabalik ng parehong `pm_…` id | payment-method id (`pm_…`); bank sa pamamagitan ng `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` para sa USD gateway, Canadian PAD `acss_debit` (hosted mandate modal, ang mandate ay `default_for` ng mga invoice/subscription, ang one-off charge ay nagpapasa ng mandate id) para sa CAD gateway |
| Kingdom Funding | Hosted tokenizer form na nakatali sa public key ng gateway | single-use nonce |
| PayPal | PayPal Hosted Fields (card, recurring) at PayPal Smart Buttons na may Venmo funding (one-time); parehong nagbabahagi ng iisang SDK load at ng server order na binubuo sa pamamagitan ng `/donate/client-token` + `/donate/create-order` | nakuhang order id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`); ang popup mismo ang tumatanggap ng bayad (card, mobile money, bank transfer, USSD) | transaction reference na bayad na; ang mga naka-save na paraan ay Paystack `AUTH_…` authorization code |

Pinapatakbo ng `finalizeResult` ng Stripe ang 3-D Secure / SCA sa browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) bago ituring na kumpleto ang donasyon. Tinatawag lamang ng shared form ang `provider.finalizeResult(result)` nang hindi alam kung ano ang ginagawa nito.

## Server-side: ang gateway abstraction (GivingApi)

Ang `/giving` module (`Api/src/modules/giving`) ang naglalantad ng REST surface; ang gateway plumbing ay nasa `Api/src/shared/helpers`. Hindi kailanman direktang nakikipag-usap ang `DonateController` sa gateway SDK. Dumadaan ito sa `GatewayService`, na kumukuha ng tamang `IGatewayProvider` mula sa `GatewayFactory` at binibigyan ito ng na-decrypt na `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

Ang `IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) ang kontratang ipinapatupad ng bawat gateway. Kasama rito ang webhook lifecycle (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), bayad (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), fees (`calculateFees`), paghawak ng naka-save na paraan ng pagbabayad (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), at mga opsyonal na dagdag (customers, orders, SetupIntents, event replay, `retryFailedPayment` para sa nabigong subscription invoice, `registerPaymentMethodDomain` para sa Apple Pay domain verification). Kapag hindi ipinatupad ng provider ang isang opsyonal na hook, itinuturing itong hindi suportado para sa aksyong iyon at itinatago ng UI ang kontrol. Nagdedeklara ang bawat provider class ng sarili nitong `capabilities` matrix (mga sinusuportahang currency, ACH, refund, mga kinakailangan sa subscription, mga limitasyon sa transaksyon). Binabasa lamang ito ng `GatewayService.getProviderCapabilities(provider)`. Ang mga flag gaya ng `logsDonationsImmediately` ang nagtutulak ng asal ng controller nang walang anumang kondisyon batay sa pangalan ng provider sa mga controller.

**Mga server provider na nakarehistro sa `GatewayFactory`:**

| Provider | Availability |
|----------|-------------|
| Stripe | Laging naka-on |
| PayPal | Laging naka-on |
| Kingdom Funding | Laging naka-on |
| Paystack | Laging naka-on (mga merchant sa Nigeria, Ghana, South Africa, Kenya, Côte d'Ivoire; mga currency na NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in sa pamamagitan ng `ENABLE_SQUARE` environment flag |
| ePayMints | Opt-in sa pamamagitan ng `ENABLE_EPAYMINTS` environment flag |

Iba ang Paystack sa iba dahil gumagalaw na ang pera bago pa masangkot ang GivingApi: sisingilin ng popup ang donor, ang `processCharge` ay isang `GET /transaction/verify/:reference` na ang nabayarang halaga at currency ay dapat tumugma sa donasyong itatala (ang reference na nakatala na ay hindi kailanman naitatala nang dalawang beses), at ang unang regalo ng isang paulit-ulit na iskedyul ay naitatala mula sa `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` na may `start_date` na isang interval mula ngayon). Naka-sign ang mga webhook gamit ang mismong secret key (`x-paystack-signature`, HMAC-SHA512 sa raw body), at walang webhook-management API ang Paystack, kaya ipinapakita ng admin screen ang URL na ipi-paste ng simbahan sa dashboard nito. Ang mga renewal na `charge.success` event ay walang fund split; binabawi ito ng provider mula sa mga lokal na row ng `subscriptions`/`subscriptionFunds` ng donor. Ang mga card authorization lamang ang `reusable`; one-time lamang ang mga mobile money na regalo, kaya tinatanggihan ng `createSubscription` ang mga ito. Ang demo data ay nagse-seed ng pangalawang simbahan (Accra Community Church, `CHU00000002`) sa isang Paystack test-mode GHS gateway, para tumakbo ang Paystack Playwright suite kasabay ng suite ni Grace na gumagamit ng Stripe.

Maaaring magrehistro ng custom na provider habang tumatakbo kapag nakatakda ang `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; ang `AbstractExperimentalGatewayProvider` ang base class para sa mga ito. Hindi sensitibo sa malaki at maliit na titik ang pagtutugma ng pangalan ng provider.

### Configuration ng gateway at mga secret

Nagse-save ang admin ng mga kredensyal ng gateway sa pamamagitan ng `POST /giving/gateways` (`GatewayController`). Sa pag-save, ine-encrypt ng controller ang private at webhook key gamit ang `EncryptionHelper` bago itago ang mga ito. Pagkatapos, sa anumang host na hindi localhost, binubura nito ang umiiral na webhook ng simbahan at gumagawa ng bagong webhook na nakaturo sa `/giving/donate/webhook/{provider}?churchId=…`. Isang row kada provider ang itinatago ng simbahan: ang pag-save ng gateway ay pumapalit lamang sa umiiral na row para sa parehong provider. Ang mga pampublikong pagbasa (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ay nagbabalik lamang ng public key.

## Data model

Ang giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, mga model sa `models/`) ay isang MySQL schema na ina-access sa pamamagitan ng Kysely:

| Table | Tungkulin |
|-------|------|
| `gateways` | Config ng provider kada simbahan: `provider`, `publicKey`, naka-encrypt na `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Mga designasyon ng pagbibigay (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Pagpapangkat para sa pagpasok at pag-uulat ng datos (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Isang regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; ang mga statement, kabuuan, dashboard, at ulat ng donasyon ay binibilang lamang ang `complete` o null), `transactionId` |
| `fundDonations` | Paghahati ng isang donasyon sa isa o higit pang pondo (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Paulit-ulit na regalo; ang `id` ay ang subscription id ng gateway, na naka-link sa `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Paghahati ng pondo para sa paulit-ulit na regalo |
| `customers` | Nag-uugnay ng `personId` sa customer id nito sa gateway, kada `provider` |
| `gatewayPaymentMethods` | Mga naka-save na card/bangko: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Audit trail ng webhook/event at dedup key (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Mga kampanya ng pangako na nakatali sa isang pondo, at ang pangakong halaga ng bawat tao |

Hinahati ang donasyon sa mga pondo sa pamamagitan ng `fundDonations`. Dala ng donasyon ang kabuuan; ang bawat `fundDonation` ay dala ang sarili nitong bahagi. Dala ng `donations.currency` at `gateways.currency` ang ISO currency. Ina-advertise ng bawat provider ang `supportedCurrencies` nito, at ina-format ang mga halaga gamit ang `CurrencyHelper.formatCurrencyWithLocale`.

## Mga end-to-end na daloy

### Isahan at paulit-ulit na regalo ng miyembro (B1App)

Ang authenticated na donate screen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) ay binubuo ng tatlong apphelper component: `MultiGatewayDonationForm`, `PaymentMethods`, at `RecurringDonations`. Ang B1App ang gumagawa ng nakapaligid na pag-load ng datos (`GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`) at ipinapasa ang listahan ng gateway. Ang na-resolve na provider ang naglo-load ng sarili nitong SDK mula sa public key ng gateway. Nangyayari ang aktwal na singil sa loob ng apphelper: tina-tokenize ng na-resolve na provider ang paraan ng pagbabayad (bago o naka-save), pagkatapos ay nagpo-post sa `/giving/donate/charge` para sa isahang regalo, o sa `/giving/donate/subscribe` para sa paulit-ulit. Parehong itinatala ng mga endpoint na ito ang naka-sign-in na donor sa sarili nitong `personId` (tanging ang mga may `donations.edit` lamang ang maaaring mag-ugnay sa ibang tao), at tinatanggihan ang mga fund split na lampas sa siningil na halaga. Ang mga paulit-ulit na regalo ay lumilikha ng row sa `subscriptions` kasama ang `subscriptionFunds`, at ibinibigay ang iskedyul sa gateway (Stripe Subscriptions, PayPal Billing Plans, o KF recurring schedule).

### Guest / anonymous na pagbibigay

Ang pampublikong donate page (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) at ang panel na "give now" ay nagre-render ng `NonAuthDonationWrapper` mula sa `@churchapps/apphelper/website`, na nag-iinject ng reCAPTCHA at ng Elements context ng gateway sa paligid ng `GuestForm` ng provider. Walang login, naka-save na paraan, o kasaysayan ang mga guest. Kinukuha ng daloy ang `GET /giving/funds/churchId/:id` at `GET /giving/donate/gateways/:churchId` (public key lamang), bini-verify ang bisita gamit ang `POST /giving/donate/captcha-verify`, tina-tokenize sa browser, at nagpo-post sa `/giving/donate/charge` (o `/subscribe`). Ang guest ACH ay gumagamit ng anonymous na `POST /giving/paymentmethods/ach-setup-intent-anon`, na nagpapahintulot lamang ng agarang (Financial Connections) na beripikasyon: ang microdeposit check ay natatapos pagkalipas ng ilang araw, kapag wala na ang guest page, kaya hindi ito makukumpleto kailanman. Tumatanggi ang form na singilin ang hindi beripikadong SetupIntent at itinuturo sa donor ang card o ang naka-sign-in na setup ng bangko.

Tatlong opsyon ng guest form ang gumagamit ng parehong charge call. Ang `?fundId=` at `?amount=` sa donate URL ay nagpi-preselect ng fund split (binabasa ng guest form ng bawat provider sa mount, at dumadaan sa normal na fund-change handler para ma-update ang kabuuan at fees). Ang `anonymous: true` ay nagpapawalang-bisa sa anumang taong ipinadala ng client: binabalewala ng `DonateController.charge` ang taong iyon at itinatala ang regalo na may `personId = null`; nilalaktawan ng guest form ang `/people/loadOrCreate` at ang hakbang ng customer/vault, at hindi na nireresolba ng tatlong immediate-log provider ang tao mula sa gateway customer. Kailangang nakarehistro sa Stripe ang domain ng page para gumana ang Apple Pay, kaya ang Stripe guest form ay nagpo-post nang isang beses kada session sa pampubliko at rate-limited na `POST /giving/donate/register-domain`. Tanging domain na kabilang sa simbahan ang tinatanggap nito (`<subDomain>.b1.church`, isang row sa domains table ng content module, o isang local host) bago tawagin ang payment-method-domains API ng Stripe.

### Pagtatala ng admin at pag-import ng Stripe (B1Admin)

Ang donations section ng B1Admin (`B1Admin/src/donations/`) ang lugar ng trabaho ng finance team. Itinatala ng batch entry (`components/BulkDonationEntry.tsx`) ang cash/check/in-kind na regalo sa pamamagitan ng pag-post sa `/giving/donations` at pagkatapos sa `/giving/funddonations`; walang kinalaman dito ang gateway. Ginagawa rin ito ng sheet na **Log a gift** sa record ng tao (`components/LogGiftDialog.tsx`) para sa isang regalo, sa pamamagitan ng unang paghahanap ng batch na tumutugma sa `batchDate` ng petsa ng regalo o paglikha ng isa na ipinangalan sa petsang iyon (`POST /giving/donationbatches`), at pagbura ng donasyon/bagong batch kung pumalya ang susunod na hakbang. Ang mga pondo, batch, kampanya, at statement ay bawat isa may kaukulang `/giving/*` CRUD route; ang mga pahina ng giving statement (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) ay humihiling ng isang taong kalendaryo gamit ang `GET /donations?startDate=&endDate=` at `GET /fundDonations?startDate=&endDate=`, sa halip na ang buong kasaysayan ng simbahan, na maaaring lumampas sa limitasyon ng laki ng response ng Lambda. Ang donate panel na istilo ng miyembro (`B1Admin/src/donationComponents/`) ay muling gumagamit ng parehong apphelper component ng B1App.

Ang pag-uulat at mga ipinapasa sa accounting ay client-side o trabaho ng report runner, hindi trabaho ng gateway: ang QuickBooks export ng batch page ay bumubuo ng journal-entry CSV mula sa `donations` + `fundDonations` ng batch (debit Undeposited Funds, isang credit kada pondo); ang Lapsed Givers view ng Summary page ay nagpapatakbo ng `Api/reports/lapsedGivers.json` sa pamamagitan ng generic report runner, na nireresolba ang mga pangalan ng tao ng `ReportOutput`; at ang mga format ng resibo ayon sa bansa (Canada / Australia / New Zealand) ay mga setting ng simbahan sa key/value store ng membership na ni-render ng `GivingStatementDocument` at dinoble sa print page ng B1App. Ipinapasa ng mga print page ng statement ng B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) ang setting na `logoLight` ng simbahan (sa pamamagitan ng `usePrintLogo` sa `B1Admin/src/components/PrintChurchHeader.tsx`) para lumabas ang logo sa itaas ng bawat statement, at hinihintay ang imahe bago awtomatikong mag-print.

### Status ng batch at ang permiso na Enter Donations

Maaaring isara ang mga batch para manatiling pareho ang nabilang na deposito. Ang `POST /giving/donationbatches/:id/close` at `/:id/reopen` (Donations.Edit lamang) ang tanging sumusulat ng `status`, `closedDate`, at `closedBy` (`DonationBatchRepo.setStatus`); hindi kailanman ginagalaw ng karaniwang pag-save ng batch ang mga ito, kaya ang pag-post ng batch ay hindi makapagbubukas muli ng isinarang batch. Nasa `Api/src/modules/giving/helpers/BatchAccessHelper.ts` ang lahat ng access sa pagsulat: maaaring baguhin ng Donations.Edit ang anuman, habang ang mas makitid na permiso na Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Enter Donations" sa role editor) ay maaaring gumawa ng batch at mag-save o magbura ng donasyon at fund split lamang kapag bukas ang batch ng kasalukuyang donasyon at ang target na batch nito, at hindi kailanman para sa gateway gift (isa na may `transactionId`). Ang nabigong pagsulat ay nagbabalik ng `403 { error: "This batch is closed." }`. Tinatanggap ng pagbasa ng batch ang Donations.ViewSummary o Donations.Enter para makapili ng batch ang tagabilang na papasukan nila. Sa client, ginagaya ng `B1Admin/src/donations/batchAccess.ts` ang mga patakarang ito (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), at ipinapakita ng `Header` / `SecondaryMenuHelper` ang **Donations > Batches** sa sinumang makakakita ng batch kahit walang View Summary.

### Pag-convert ng halong currency na kabuuan

Anumang endpoint na nagbabalik ng iisang pinagsamang kabuuan mula sa mga regalong maaaring halong currency, gaya ng giving summary KPI (`GivingKpiCards`), kabuuan ng batch ng donasyon, kabuuan ng pondo, at ang year-to-date/period totals ng donate screen ng B1App, ay nagko-convert sa default na currency ng simbahan sa server side sa halip na magdagdag ng magkakaibang currency. Kumukuha ang `Api/src/shared/helpers/ExchangeRateHelper.ts` ng rate mula sa `api.frankfurter.dev` na nakabatay sa currency ng simbahan, nagca-cache sa memorya ng 12 oras, at naglalantad ng `convertTotals(rows, churchCurrency, rates)`. Pre-grouped sa SQL ayon sa currency ang mga row (ilang grupo lamang, hindi kailanman conversion kada regalo); bawat grupo ay kino-convert at dinadagdag, at ang resulta ay may flag na `isConverted` na ginagamit ng client para magpakita ng tala na "Converted at current exchange rates". Inilalantad ng `GET /donations/exchange-rates` ang talahanayan ng rate para sa mga client na kailangan nito (ang donate screen ng B1App). Hindi kailanman tinatanggap mula sa request ang mismong mga rate; laging kinukuha lamang sa server side, kaya walang client na makaaapekto sa iniulat na kabuuan. Hindi kailanman kino-convert ang mga indibidwal na tala ng donasyon at ang mga historical/original-currency na ulat; mga pinagsamang kabuuan lamang ang kino-convert.

Ibinabalik ng Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) ang mga regalong ginawa sa labas ng B1: tinatawag nito ang `POST /giving/donate/replay-stripe-events` na may `dryRun: true` para sa preview, at pagkatapos ay `dryRun: false` para mag-import. Inililista ng server ang mga event ng Stripe para sa saklaw ng petsa at nilalaktawan ang anumang naitala na; unang tinutugma ayon sa provider id ng `eventLogs`, pagkatapos ayon sa transaction id, at saka ayon sa `DonationRepo.findMatchingDonation` (halaga + petsa + tao) para hindi kailanman mag-double import ang muling pagtakbo. Nilalaktawan ang mga subscription na `charge.succeeded` / `payment_intent.succeeded` event dahil itinatala ng `invoice.paid` ang mga regalong iyon. Dahil inaalis ng mas bagong bersyon ng Stripe API ang `PaymentIntent.invoice`, nakabatay din ang paglaktaw sa paglalarawang "Subscription …".

## Mga webhook at pagkakasundo

Ang mga nabayarang bayad at mga pagbabago sa estado ng subscription ay dumarating sa `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Sinadya ang pagproseso na maging idempotent:

1. **I-verify** — idine-delegate ng `GatewayService.verifyWebhook` ang pagsusuri ng signature sa provider; ang nabigong signature ay nagbabalik ng 401. Ang mga event na hindi kailangang iproseso ay agad na nagbabalik ng 200.
2. **I-dedup ang event** — nilalaktawan ng `EventLogRepo.loadByProviderId` ang webhook na naitala na sa `eventLogs`.
3. **I-dedup ang donasyon** — bago gumawa ng anuman, sinusuri ang `DonationRepo.loadByTransactionId` laban sa bawat posibleng candidate id na maaaring dala ng payload. Sinasalo nito ang mga duplicate na delivery, ang mga multi-stage na ACH event (pending → settled), at ang kaso kung saan naitala na nang optimistic ng `/donate/charge` ang regalo.
4. **Ilapat** — sinasabi ng `classifyWebhookEvent(eventType)` ng provider kung ano ang ibig sabihin ng event (`donation` pending/complete, `cancel-subscription`, o `ignore`). Ang mga nakumpletong bayad ay lumilikha ng `complete` na donasyon (o nagpapataas ng umiiral na `pending` o `failed`), ang mga event na gaya ng ACH ay nagiging `pending` hanggang ma-settle, ang nabigong subscription invoice (Stripe `invoice.payment_failed`) ay lumilikha ng `failed` na donasyon na nakabatay sa invoice id, at ang mga event ng pagkansela ay bumubura ng lokal na row ng `subscriptions`. Hindi kailanman sinusuri ng controller ang mga pangalan ng event na tiyak sa provider.

### Mga nabigong paulit-ulit na regalo at dunning

Ang `failed` na donasyon ang yunit ng trabaho para sa pagbawi. Inililista ito ng `GET /giving/donations/failed` kasama ang pinakabagong mensahe ng pagkabigo ng gateway mula sa `eventLogs` at isang flag na `canRetry` mula sa mga capability ng gateway. Tinatawag ng `POST /giving/donate/retry/:donationId` ang `retryFailedPayment` ng provider (binabayaran ng Stripe ang bukas na invoice), at ang resultang webhook ang nagpapataas ng row sa `complete` sa pamamagitan ng normal na dedup path. Ipinapadala ang mga dunning email sa donor mula sa webhook handler sa araw 0, at pagkatapos mula sa `DunningHelper.run` sa midnight timer (naka-wire sa `lambda/timer-handler.ts` at `RailwayCron.ts`) sa araw 3 at 7. Naitatala ang bawat pagpapadala sa `eventLogs` bilang `provider: "dunning"`, `providerId: "<donationId>:<day>"`, kaya hindi kailanman nag-e-email nang dalawang beses ang muling pagtakbo. Kapag sumuko ang Stripe at kinansela ang subscription (`customer.subscription.deleted` na may `cancellation_details.reason: "payment_failed"`), minsan lamang nag-e-email sa donor ang `DunningHelper.notifyCanceled` (`providerId: "<subscriptionId>:canceled"`); tahimik ang mga pagkansela na sinimulan ng donor o admin. Hindi kailanman nagdaragdag ang Stripe ng event sa umiiral na endpoint: pagkatapos baguhin ang `StripeHelper.webhookEvents`, alinman sa i-save muli ang gateway o patakbuhin ang `tools/manual/stripe-webhook-events.ts` (dry run bilang default, `--apply` para magsulat) laban sa prod.

Ang mga provider na may `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ay naitatala ang mga charge mula sa `/charge` response (hindi kailangan ng round-trip ng webhook para sa normal na daloy), habang umaasa ang Stripe sa `payment_intent.succeeded` / `invoice.paid` at sa ACH `payment_intent.processing`. Ang paghawak ng fee (`POST /giving/donate/fee`, ang flag na `payFees` ng gateway, at ang `calculateFees` ng bawat provider) ang nagkakalkula ng "cover the fees" gross-up sa panig ng donor. Walang platform cut ang B1, kaya walang application fee na idinadagdag kailanman.

:::info
Ang charge at webhook path ay nagsusulat ng parehong row ng `donations` / `fundDonations`. Ang `transactionId` ang join key na pumipigil sa optimistic na charge log at sa kasunod nitong webhook na gumawa ng dalawang donasyon para sa iisang regalo.
:::

## Mga Kaugnay na Pahina

- [Giving Endpoints](../api/endpoints/giving) — kumpletong REST surface para sa mga donasyon, pondo, batch, gateway, subscription, paraan ng pagbabayad, at webhook
- [AppHelper](../shared-libraries/app-helper) — ang npm package na naglalaman ng payment provider registry at mga component ng donasyon
- [Module Structure](../api/module-structure) — kung paano nakaayos ang GivingApi module sa server side
