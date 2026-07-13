---
title: "Sakhiwo Sekunikela"
---

# Sakhiwo Sekunikela

<div class="article-intro">

I-ChurchApps isebentisa kunikela phezu kwemodeli ye-gateway-rail: libandla ligcina i-akhawunti yalo ye-Stripe (nome PayPal, nome Kingdom Funding), kantsi i-B1 ayikaze ihlale endleleni yemali njenge-processor. Lwati lwekhadi lufakwa i-token ku-browser futsi akukaze kufike kuseva ye-ChurchApps. Lelikhasi limephu sonkhe lesakhiwo — luhlu lwabahlinzeki bekukhokha ku-`@churchapps/apphelper`, abstraction yeliso ye-GivingApi, imodeli yemininingwane yekunikela, kanye nendlela ema-webhook eliso abuyisela ngayo ku-database.

</div>

## Sifinyeto

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

Imitsetfo lemitsatfu isebenta kulesakhiwo:

1. **Iliso ligcina likhadi.** Sisebentiso ngasinye sekufaka sekungena sombhalisi (entry widget) sifaka i-token ku-browser; i-API itfola kuphela i-token, i-nonce, nome i-id ye-order.
2. **Abstraction yinye, abahlinzeki labaningi.** I-browser icacisa i-`PaymentProvider` kusuka ku-registry; iseva icacisa i-`IGatewayProvider` kusuka ku-factory. Kokubili kucondziswa ligama lelifanako lomhlinzeki lelisicaba lelisemgceni weliso.
3. **Ema-webhook ngiwo mtfombo wekucinisekiswa kwekukhokha.** Sento sekukhokha sibhalwa ngekutsemba (optimistically), kodvwa i-webhook lesayiniwe yeliso ngiyona lecinisekisa (nome ikhicite) kunikela lokuphelele, kunetivikelo te-idempotency kokubili emaceleni.

## Ku-client-side: luhlu lwabahlinzeki bekukhokha (`@churchapps/apphelper`)

Loluhlu luhlala ku-`Packages/apphelper/src/donations/providers/`, tisebentiso nemisiti yomhlinzeki ngamunye kungephasi kwesigcini sawo ngasinye (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — akukho lutfo ngephandle kwe-`providers/` loluhlukanisa ngeligama lomhlinzeki. I-`PaymentProvider` (bona `providers/types.ts`) isongela konkhe intfo yenhlelo yeklayenti ledzinga kuleliso linye: i-`descriptor` (emaphawu e-admin, tinhlobo temali letisekelwe, tinkambu tetindleko, tilinganiso tetindleko tekwehluleka, ma-URL edashbhodi/kubhalisa), luhlu lwekwati (`capabilities`) (makhadi lasagciniwe, ACH, kuphindzaphindza, kufaka likhadi lelisha lekhatsi, kugcinwa lokungasobala ngesikhatsi sekufaka i-token), tisebentiso te-React kwekufaka kwelilunga (`MemberWrapper`/`MemberEntry`), kunikela kwesihambi (`GuestForm`), kuhlela indlela lesagciniwe (`MethodEditForm`), kanye nekukhokha kwemibuto yefomu (`FormPayment`), kanye ne-`buildChargeRequest(ctx, token)` — indzawo yinye lapho sakhiwo semtfwalo sekukhokha sihluke ngomhlinzeki. I-`MemberWrapper` yomhlinzeki ngamunye ilayisha i-SDK yayo ngekwayo kusuka ku-key lomphakatsi yemugca weliso, ngako tinhlelo tesigcini atikaze tingenise SDK yeliso (i-B1App kanye ne-B1Admin abukho ne-dependency ye-`@stripe/*`). I-`pickDefaultGateway(gateways, capability?)` iyahlanganisa ekhatsi kutsi ngutoni emaliso elibandla lokufanele lisetjentiswe yindlela lenkulu.

I-`providers/registry.ts` iphetse labo labakhelwe kucala. **Babejwa ngeligugu**, hhayi ngekubhaliswa nge-side-effect yemodyuli, ngako i-tree-shaking ye-bundler ayikaze isuse kubhaliswa:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Umsebenti | Injongo |
|----------|---------|
| `getPaymentProvider(name)` | Cacisa ngeligama lelisincane; iwela ku-Stripe kuze umhlinzeki lohlelwe kabi angaze awisele lifomu lombhalisi |
| `registerPaymentProvider(p)` | Bhalisa umhlinzeki lengetiwe ngesikhatsi sekusebenta (kwentela iliso lelifisako lesigcini) |
| `listPaymentProviders()` | Bala labakhelwe kucala + labangetiwe — kusetjentiswa kwakha luhlu lwekukhetsa lweliso le-admin |
| `hasPaymentProvider(name)` | Kuhlola bulunga |

**Bahlinzeki bekungena be-client labakhelwe kucala: Stripe, PayPal, Kingdom Funding.** I-B1App kanye ne-B1Admin ku**funda kuphela** luhlu (`getPaymentProvider`, `listPaymentProviders`); akutsi awakhona lobita i-`registerPaymentProvider` — kubhaliswa kuhlala ngekhatsi kwe-apphelper.

Umhlinzeki ngamunye ufaka i-token ngendlela lehlukene, kodvwa bonkhe bagcina likhadi ngephandle kwe-B1:

| Umhlinzeki | Tisebentiso tekufaka | Token lebuyiselwa ku-API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | i-id ye-payment-method (`pm_…`); libhange nge-Financial Connections / ACH SetupIntent |
| Kingdom Funding | Ifomu lekutokenisa lelihlaliswe lekhiywe ngekhi lomphakatsi yeliso | i-nonce yekusebentiswa kanye |
| PayPal | PayPal Hosted Fields; order yeliso yakhiwe nge-`/donate/client-token` + `/donate/create-order` | id ye-order lebanjiwe |

I-`finalizeResult` ye-Stripe isebentisa i-3-D Secure / SCA ku-browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) ngaphambi kwekutsi kunikela kubhekwe njengekuphelele; lifomu lelabelene libita nje `provider.finalizeResult(result)` ngephandle kwekwati kutsi yenta ini.

## Ku-server-side: abstraction yeliso (GivingApi)

Umodyuli we-`/giving` (`Api/src/modules/giving`) ukhombisa bubanti be-REST; umsebenti weliso uhlala ku-`Api/src/shared/helpers`. I-`DonateController` ayikhulumi ne-gateway SDK ngco — ihamba nge-`GatewayService`, lecabanga i-`IGatewayProvider` lelungile kusuka ku-`GatewayFactory` bese inikeza i-`GatewayConfig` lengakahlungwa.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

I-`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) sivumelwano leliso ngalinye lesisebentisako — kuphila kwe-webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), kukhokha (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), tindleko (`calculateFees`), kuphatfwa kwendlela legciniwe (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), kanye netengetiwe letingakhetfwa (bakhasimende, ma-order, ema-SetupIntent, kuphindza kwemcimbi). Klasi ngayinye yomhlinzeki icacisa luhlu lwayo lwe-`capabilities` (tinhlobo temali letisekelwe, ACH, kubuyisela imali, tidzingo tekuphindzaphindza, imikhawulo yekuhweba) — i-`GatewayService.getProviderCapabilities(provider)` ifunda nje loko — kantsi maphawu lafana ne-`logsDonationsImmediately` acondzisa kwenteka kwe-controller ngephandle kwanome yiliphi liphawu leligama lomhlinzeki emakontroleni.

**Bahlinzeki beliso ababhalisiwe ku-`GatewayFactory`:**

| Umhlinzeki | Kukhona |
|----------|-------------|
| Stripe | Kuhlala kuvuliwe |
| PayPal | Kuhlala kuvuliwe |
| Kingdom Funding | Kuhlala kuvuliwe |
| Square | Kungakhetfwa nge-phawu le-environment le-`ENABLE_SQUARE` |
| ePayMints | Kungakhetfwa nge-phawu le-environment le-`ENABLE_EPAYMINTS` |

Bahlinzeki lesifisako bangabhaliswa ngesikhatsi sekusebenta nangabe i-`ENABLE_CUSTOM_GATEWAY_PROVIDERS` isethiwe; i-`AbstractExperimentalGatewayProvider` sisekelo saloko. Emagama abahlinzeki afaniswa ngephandle kwekubona emabala lamakhulu/lamancane.

### Kuhleleka kweliso netimfihlo

Umlawuli ugcina tincwadzi teliso nge-`POST /giving/gateways` (`GatewayController`). Ngekugcina, umlawuli ufaka i-token yemfihlo kanye newebhook nge-`EncryptionHelper` ngaphambi kwekugcina, bese — kunome yini i-host lengasiyo yelocalhost — asuse i-webhook lesikhona yelibandla futsi enze lensha lekhomba ku-`/giving/donate/webhook/{provider}?churchId=…`. Kufunda komphakatsi (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) kubuyisa ema-key womphakatsi kuphela.

## Imodeli yemininingwane

I-schema yekunikela (`Api/src/modules/giving/db/DatabaseTypes.ts`, emamodeli ku-`models/`) yi-schema ye-MySQL lefinyelelwa nge-Kysely:

| Lithebula | Umsebenti |
|-------|------|
| `gateways` | Kuhleleka kweliso ngelibandla ngalinye: `provider`, `publicKey`, i-`privateKey`/`webhookKey` lehlungiwe, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Tinhlobo tekunikela (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Kuhlanganiswa kwekufaka/kubika (`name`, `batchDate`) |
| `donations` | Sipho sinye: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Kwabelwa kwesipho kutinhlobo letiningi (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Sipho lesiphindzaphindzako; `id` yi-id yeliso yesipho, sihlangene ne-`personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Kwabelwa kwenhlobo yesipho lesiphindzaphindzako |
| `customers` | Ihlanganisa `personId` ne-id yakhasimende yeliso, ngo-`provider` |
| `gatewayPaymentMethods` | Makhadi/mabhange lasagciniwe: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Umlandvo wekuhlola we-webhook/mcimbi kanye nesikhiya se-dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Emakhambidwe ekutfembisa lahlotene nenhlobo, kanye nemali lettembisiwe womuntfu ngamunye |

Sipho sabelwa tinhlobo letiningi nge-`fundDonations` — sipho siphetse lonkhe, kantsi `fundDonation` ngayinye iphetse incenye. I-`donations.currency` kanye ne-`gateways.currency` ziphetse i-ISO currency; umhlinzeki ngamunye umemetela i-`supportedCurrencies` yakhe, kantsi emanani asikwa nge-`CurrencyHelper.formatCurrencyWithLocale`.

## Kwenteka kusuka ekucaleni kuya ekugcineni

### Kunikela kwelilunga kanye lokuphindzaphindzako (B1App)

Sikrini sekunikela lesivunyelwe (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) sihlanganisa tisebentiso letintsatfu te-apphelper: `MultiGatewayDonationForm`, `PaymentMethods`, kanye ne-`RecurringDonations`. I-B1App yenta kulayishwa kwemininingwane lokuyihlanganisako — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — bese idlulisela luhlu lweliso; umhlinzeki lokhethiwe ulayisha i-SDK yakhe kusuka ku-key lomphakatsi weliso. Kukhokha ngokwako kwenteka ngekhatsi kwe-apphelper: umhlinzeki lokhethiwe ufaka i-token kwindlela (lensha nome legciniwe), bese atfumele ku-`/giving/donate/charge` kwesipho sinye nome ku-`/giving/donate/subscribe` kwesiphindzaphindzako. Tipho letiphindzaphindzako takha umugca we-`subscriptions` kanye ne-`subscriptionFunds` bese unikeza luhlelo kuliso (Stripe Subscriptions, PayPal Billing Plans, nome luhlelo lweku-KF lolwaphindzaphindzako).

### Kunikela kwesihambi / lokungaziwa

Likhasi lekunikela lomphakatsi (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) kanye ne-paneli ye-"nikela nyalo" ikhicita i-`NonAuthDonationWrapper` kusuka ku-`@churchapps/apphelper/website`, lefaka i-reCAPTCHA kanye ne-context ye-Elements yeliso ngekhatsi kwe-`GuestForm` yomhlinzeki. Tihambi atikangeni, akukho tindlela letigciniwe, akukho mlandvo. Lendlela ilanda i-`GET /giving/funds/churchId/:id` kanye ne-`GET /giving/donate/gateways/:churchId` (ema-key womphakatsi kuphela), icinisekisa livakashi nge-`POST /giving/donate/captcha-verify`, ifake i-token ku-browser, futsi itfumele ku-`/giving/donate/charge` (nome `/subscribe`). I-ACH yesihambi isebentisa i-`POST /giving/paymentmethods/ach-setup-intent-anon` lengaziwa.

### Kubhala kwe-admin kanye nekungeniswa kwe-Stripe (B1Admin)

Sigaba sekunikela se-B1Admin (`B1Admin/src/donations/`) yindzawo lamacembu etimali asebenta khona. Kufaka nge-batch (`components/BulkDonationEntry.tsx`) kubhala tipho temali/tsheke/kwemphahla nge-`/giving/donations` bese kulandzele ne-`/giving/funddonations` — akukho liso lelibandzakanyekile. Tinhlobo, ema-batch, ma-campaign, kanye netincwadzi tekubika kucondzisa endzaweni yato ye-CRUD ye-`/giving/*`. Iphaneli yekunikela ye-lilunga (`B1Admin/src/donationComponents/`) isebentisa kabusha tisebentiso te-apphelper letifanako ne-B1App.

Kungeniswa kwe-Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) kubuyisela tipho letentiwe ngephandle kwe-B1: ibita i-`POST /giving/donate/replay-stripe-events` nge-`dryRun: true` kwekubuka kucala, bese ku-`dryRun: false` kungenisa. Iseva ibala imicimbi ye-Stripe kwesikhala setinsuku futsi iyewe nome yini lesivele lokobhaliwe — kufaniswa kucala nge-id ye-`eventLogs` yomhlinzeki, bese nge-`DonationRepo.findMatchingDonation` (imali + lusuku + umuntfu) ngako kuphindza kusebenta akukaze kungenise kabili.

## Ema-Webhook nekubuyiselana

Tipho letikhokhiwe kanye nekushintja kwesimo sesiphindzaphindzako tifika ku-`POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Kwenteka kwentiwe ngekucabanga kutsi kube idempotent:

1. **Cinisekisa** — i-`GatewayService.verifyWebhook` idlulisela kuhlolo lwesignature lomhlinzeki; sisayino lesehlulekile sibuyisa i-401. Imicimbi lengadzingi kwenteka kuvinjelwa nge-200.
2. **Susa kuphindza kwemcimbi** — i-`EventLogRepo.loadByProviderId` iyewa i-webhook lesivele ibhaliwe ku-`eventLogs`.
3. **Susa kuphindza kwesipho** — ngaphambi kwekwakha nome ngutoni, i-`DonationRepo.loadByTransactionId` iyahlolwa kumelene naso sonkhe id lelicabelako lokungenzeka kutsi umtfwalo uphetse. Loku kugwinya kudlulisela lokuphindzako, imicimbi ye-ACH yetigaba letiningi (kulindzelwe → kucinisekiswe), kanye nesimo lapho `/donate/charge` sesivele sabhala sipho ngekutsemba.
4. **Sebentisa** — i-`classifyWebhookEvent(eventType)` yomhlinzeki isho kutsi lomcimbi usho ini (`donation` lokulindzelwe/lokuphelele, `cancel-subscription`, nome `ignore`); tipho letiphelele takha sipho se-`complete` (nome tikhulise lesengu-`pending`), imicimbi lefana ne-ACH iwela njenge-`pending` kuze kufike ekukhokhelweni, kantsi imicimbi yekukhansela isule umugca wangekhatsi we-`subscriptions`. Umlawuli akaze abhekise emagameni emcimbi wemhlinzeki.

Bahlinzeki labane-`logsDonationsImmediately` (PayPal, Kingdom Funding) babhala tikhokho tabo kusuka kuphendvulo lwe-`/charge` (akudzingekali kubuyela kwe-webhook kwendlela lejwayelekile), kantsi i-Stripe isekela `payment_intent.succeeded` / `invoice.paid` kanye ne-ACH `payment_intent.processing`. Kuphatfwa kwetindleko (`POST /giving/donate/fee`, liphawu le-`payFees` yeliso, kanye ne-`calculateFees` yomhlinzeki ngamunye) kubala kunyusa "sibekele tindleko" ecaleni lomniki — i-B1 ayitsatsi sabelo se-platform, ngako akukho ntfwalo lengetiwe lefakwako.

:::info
Tindlela tekukhokha kanye newebhook tibhala imigca lefanako ye-`donations` / `fundDonations`. I-`transactionId` sikhiya sekuhlanganisa lesigcina i-log yekukhokha ngekutsemba kanye newebhook yayo lelandzelako kutsi angakhicitwa tipho letimbili tesipho sinye.
:::

## Emakhasi Lahlobene

- [Ema-Endpoint Ekunikela](../api/endpoints/giving) — bubanti be-REST lobugcwele bwetipho, tinhlobo, ema-batch, ema-liso, tiphindzaphindzako, tindlela tekukhokha, kanye newebhook
- [AppHelper](../shared-libraries/app-helper) — i-pakethi ye-npm lehambisa luhlu lwabahlinzeki bekukhokha kanye netisebentiso tekunikela
- [Sakhiwo Semodyuli](../api/module-structure) — kutsi umodyuli we-GivingApi uhlelwe njani ku-server-side
