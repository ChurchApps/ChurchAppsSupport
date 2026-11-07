---
title: "Arhitektura darovanj"
description: "Razvijalski vodnik za darovanje v ChurchApps: kako B1 Admin in B1.church pošiljata darove prek prehodov Stripe, PayPal, Kingdom Funding ali Paystack."
---

# Arhitektura darovanj

<div class="article-intro">

ChurchApps izvaja donacije po modelu plačilnega prehoda: cerkev ohrani svoj račun pri Stripe (ali PayPal, Kingdom Funding ali Paystack), B1 pa nikoli ne sodeluje v denarnem toku kot platformni procesor. Podatki o kartici se tokenizirajo v brskalniku in nikoli ne dosežejo strežnika ChurchApps. Ta stran opisuje celoten sklad: register ponudnikov plačil na strani odjemalca v `@churchapps/apphelper`, abstrakcijo prehoda GivingApi, podatkovni model darovanj ter način, kako se webhooki prehoda uskladijo nazaj z bazo podatkov.

</div>

## Pregled

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (brskalnik)│                   │  Plačilni prehod                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ vnos kartice v    │  Stripe Elements · KF tokenizer ·     │
│  │ Register ponudnikov   │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ plačil                │  │◀── žeton / nonce ─│  (kartica nikoli ne doseže strežnika B1)│
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ podpisan webhook
┌─────────────────────────────────────────────┐ (tajni ključ)│                │ dogodek
│  GivingApi — modul /giving                  │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  shrani donations + fundDonations — deduplikacija prek eventLogs / transactionId
                      ▼
                MySQL (shema giving)
```

Trije načela veljajo v celotnem skladu:

1. **Prehod hrani kartico.** Vsak vnosni gradnik ponudnika tokenizira podatke v brskalniku; API prejme le žeton, nonce ali ID naročila.
2. **Ena abstrakcija, mnogo ponudnikov.** Brskalnik iz registra razreši `PaymentProvider`; strežnik iz tovarne razreši `IGatewayProvider`. Oboje se ravna po istem normaliziranem imenu ponudnika, shranjenem v zapisu prehoda.
3. **Webhooki so vir resnice za poravnavo.** Odgovor na polnjenje se zabeleži optimistično, vendar podpisani webhook prehoda potrdi (ali ustvari) dokončano darovanje, z zaščito pred podvajanjem na obeh straneh.

## Na strani odjemalca: register ponudnikov plačil (`@churchapps/apphelper`)

Register se nahaja v `Packages/apphelper/src/donations/providers/`, gradniki in pomožne funkcije vsakega ponudnika pa so v njegovi podmapi (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Nič zunaj mape `providers/` ne veji glede na ime ponudnika. `PaymentProvider` (glej `providers/types.ts`) združuje vse, kar gostiteljska aplikacija potrebuje za enega ponudnika: `descriptor` (oznake za skrbnika, podprte valute, polja provizij, privzete stopnje provizij, URL-je nadzorne plošče in registracije), nabor zastavic `capabilities` (shranjene kartice, ACH, ponavljajoča darovanja, vnos nove kartice v vrstici, samodejno shranjevanje ob tokenizaciji), React gradnike za vnos člana (`MemberWrapper`/`MemberEntry`), darovanje gostov (`GuestForm`), urejanje shranjenega načina plačila (`MethodEditForm`) in plačila v obrazcih z vprašanji (`FormPayment`) ter `buildChargeRequest(ctx, token)`, to je edino mesto, kjer se oblika zahteve za polnjenje razlikuje glede na ponudnika. `MemberWrapper` vsakega ponudnika naloži svoj SDK iz javnega ključa zapisa prehoda, zato gostiteljske aplikacije nikoli ne uvozijo SDK-ja prehoda (B1App in B1Admin nimata odvisnosti `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizira, kateri od prehodov cerkve naj uporablja posamezna površina.

`providers/registry.ts` vsebuje vgrajene ponudnike. Na njih se sklicuje **po vrednosti**, ne prek registracije s stranskim učinkom modula, zato stresanje dreves (tree-shaking) v paketniku registracije nikoli ne odstrani:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funkcija | Namen |
|----------|-------|
| `getPaymentProvider(name)` | Razreši po normaliziranem imenu; kot rezerva uporabi Stripe, da napačno nastavljen ponudnik nikoli ne sesuje obrazca za darovalce |
| `registerPaymentProvider(p)` | Med izvajanjem registrira dodatnega ponudnika (za prehod po meri v gostiteljski aplikaciji) |
| `listPaymentProviders()` | Našteje vgrajene in prilagojene ponudnike; uporablja se za spustni seznam prehodov v skrbniku |
| `hasPaymentProvider(name)` | Preveri članstvo |

**Vgrajeni ponudniki na strani odjemalca: Stripe, PayPal, Kingdom Funding, Paystack.** B1App in B1Admin register samo *bereta* (`getPaymentProvider`, `listPaymentProviders`); nobeden ne kliče `registerPaymentProvider`, registracija ostane znotraj apphelperja.

Vsak ponudnik tokenizira drugače, vsi pa ohranijo kartico izven B1:

| Ponudnik | Vnosni gradnik | Žeton, poslan API-ju |
|----------|----------------|----------------------|
| Stripe | `CardElement` iz Stripe `Elements` → `stripe.createPaymentMethod(...)`; obrazec za goste poleg tega vključuje `ExpressCheckoutElement` (Apple Pay / Google Pay, enkratna darila), katerega `onConfirm` vrne isti ID `pm_…` | ID načina plačila (`pm_…`); bančni račun prek `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` za prehode v USD, kanadski PAD `acss_debit` (modalno okno za mandat, mandat `default_for` za račune/naročnine, enkratna bremenitev posreduje ID mandata) za prehode v CAD |
| Kingdom Funding | Gostujoči tokenizator, vezan na javni ključ prehoda | enkratni nonce |
| PayPal | PayPal Hosted Fields (kartica, ponavljajoča darovanja) ter PayPal Smart Buttons z financiranjem prek Venma (enkratna darila); oba delita eno nalaganje SDK-ja, strežniško naročilo pa se ustvari prek `/donate/client-token` + `/donate/create-order` | zajet ID naročila |
| Paystack | Paystack Inline pojavno okno (`js.paystack.co/v2/inline.js`); plačilo opravi samo pojavno okno (kartica, mobilni denar, bančni prenos, USSD) | referenca plačane transakcije; shranjeni načini so kode pooblastila Paystack `AUTH_…` |

Metoda `finalizeResult` pri Stripe izvede 3-D Secure / SCA v brskalniku (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), preden se darovanje šteje za dokončano. Skupni obrazec preprosto pokliče `provider.finalizeResult(result)} brez poznavanja podrobnosti.

## Na strani strežnika: abstrakcija prehoda (GivingApi)

Modul `/giving` (`Api/src/modules/giving`) izpostavlja REST vmesnik, infrastruktura prehodov pa se nahaja v `Api/src/shared/helpers`. `DonateController` nikoli ne komunicira neposredno s SDK-jem prehoda. Namesto tega gre prek `GatewayService`, ki iz `GatewayFactory` razreši pravi `IGatewayProvider` in mu poda dešifrirano `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() dešifrira privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) je pogodba, ki jo mora izpolniti vsak prehod. Vključuje življenjski cikel webhookov (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), plačila (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), provizije (`calculateFees`), upravljanje shranjenih načinov plačila (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) ter neobvezne dodatke (stranke, naročila, SetupIntents, ponovno predvajanje dogodkov, `retryFailedPayment` za neuspešen račun naročnine in `registerPaymentMethodDomain` za preverjanje domene Apple Pay). Če ponudnik izpusti neobvezno kljuko, je ta dejanje prijavljeno kot nepodprto, uporabniški vmesnik pa skrije ustrezno kontrolo. Vsak razred ponudnika deklarira lastno matriko `capabilities` (podprte valute, ACH, vračila, zahteve za naročnine, omejitve transakcij). `GatewayService.getProviderCapabilities(provider)` jo samo prebere. Zastavice, kot je `logsDonationsImmediately`, upravljajo vedenje krmilnikov brez pogojev glede na ime ponudnika v krmilnikih.

**Strežniški ponudniki, registrirani v `GatewayFactory`:**

| Ponudnik | Razpoložljivost |
|----------|-----------------|
| Stripe | Vedno vklopljen |
| PayPal | Vedno vklopljen |
| Kingdom Funding | Vedno vklopljen |
| Paystack | Vedno vklopljen (trgovci v Nigeriji, Gani, Južni Afriki, Keniji in Obali Slonovine; valute NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Vklopi se prek okoljske spremenljivke `ENABLE_SQUARE` |
| ePayMints | Vklopi se prek okoljske spremenljivke `ENABLE_EPAYMINTS` |

Paystack se od drugih razlikuje po tem, da denar potuje, preden je vključen GivingApi: pojavno okno bremeni darovalca, `processCharge` pa je `GET /transaction/verify/:reference`, katerega plačani znesek in valuta se morata ujemati z darovanjem, ki se beleži (referenca, ki je že zabeležena, se nikoli ne zabeleži dvakrat). Prvo darilo ponavljajočega se načrta se zabeleži iz `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` z `start_date` en interval naprej). Webhooki so podpisani s samim tajnim ključem (`x-paystack-signature`, HMAC-SHA512 nad surovim telesom), Paystack pa nima API-ja za upravljanje webhookov, zato zaslon za skrbnike prikaže URL, ki ga cerkev prilepi v svojo nadzorno ploščo. Dogodki obnove `charge.success` ne vsebujejo delitve po skladih; ponudnik jo pridobi iz lokalnih vrstic `subscriptions`/`subscriptionFunds` darovalca. Samo pooblastila kartic so `reusable`; darila z mobilnim denarjem so le enkratna, zato jih `createSubscription` zavrne. Demonstracijski podatki dodajo drugo cerkev (Accra Community Church, `CHU00000002`) na testnem prehodu Paystack GHS, tako da paket Playwright za Paystack teče poleg Gracinega paketa za Stripe.

Prilagojeni ponudniki se lahko registrirajo med izvajanjem, če je nastavljena spremenljivka `ENABLE_CUSTOM_GATEWAY_PROVIDERS`. `AbstractExperimentalGatewayProvider` je osnovni razred za te. Imena ponudnikov se ujemajo brez upoštevanja velikosti črk.

### Konfiguracija prehoda in skrivnosti

Skrbnik shrani poverilnice prehoda prek `POST /giving/gateways` (`GatewayController`). Ob shranjevanju krmilnik zasebni in webhook ključ pred shranjevanjem šifrira z `EncryptionHelper`. Nato, na katerem koli gostitelju, ki ni localhost, izbriše obstoječi webhook cerkve in pripravi novega, usmerjenega na `/giving/donate/webhook/{provider}?churchId=…`. Cerkev ima po en zapis na ponudnika: shranjevanje prehoda nadomesti samo obstoječi zapis za istega ponudnika. Javna branja (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) vrnejo samo javne ključe.

## Podatkovni model

Shema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeli v `models/`) je shema MySQL, do katere se dostopa prek Kysely:

| Tabela | Vloga |
|--------|-------|
| `gateways` | Nastavitve ponudnika za cerkev: `provider`, `publicKey`, šifrirana `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Namembnosti darovanj (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Skupina za vnos in poročanje (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Eno darilo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; izpiski, skupni zneski, nadzorne plošče in poročila o darovanjih upoštevajo samo `complete` ali null), `transactionId` |
| `fundDonations` | Razdelitev darovanja med enim ali več skladov (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Ponavljajoče darilo; `id` je ID naročnine pri prehodu, povezan z `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Delitev ponavljajočega darila po skladih |
| `customers` | Poveže `personId` z ID-jem stranke pri prehodu, po `provider` |
| `gatewayPaymentMethods` | Shranjene kartice/bančni računi: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Revizijska sled webhookov/dogodkov in ključ za preprečevanje podvajanja (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Kampanje obljub, vezane na sklad, in obljubljeni znesek vsake osebe |

Darovanje se razdeli med sklade prek `fundDonations`: darovanje nosi skupni znesek, vsak `fundDonation` pa svoj delež. `donations.currency` in `gateways.currency` nosita valuto po ISO, vsak ponudnik pa oglašuje svoje `supportedCurrencies`, zneski pa se oblikujejo s `CurrencyHelper.formatCurrencyWithLocale`.

## Potek od začetka do konca

### Člani: enkratna in ponavljajoča darovanja (B1App)

Zaslon za darovanje za prijavljene uporabnike (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) sestavlja tri komponente apphelperja: `MultiGatewayDonationForm`, `PaymentMethods` in `RecurringDonations`. B1App opravi okoliško nalaganje podatkov, to so `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`, in seznam prehodov posreduje naprej. Razrešeni ponudnik naloži svoj SDK iz javnega ključa prehoda. Samo polnjenje se zgodi znotraj apphelperja: razrešeni ponudnik tokenizira (novi ali shranjeni) način plačila, nato pa pošlje zahtevo na `/giving/donate/charge` za enkratno darilo ali `/giving/donate/subscribe` za ponavljajoče. Oba končna punkta prijavljenega darovalca pripišeta njegovemu `personId` (samo imetniki `donations.edit` lahko pripišejo darilo nekomu drugemu), zavrneta pa delitve skladov, katerih vsota presega zaračunani znesek. Ponavljajoča darila ustvarijo vrstico `subscriptions` in `subscriptionFunds` ter urnik predajo prehodu (Stripe Subscriptions, PayPal Billing Plans ali ponavljajoči urnik KF).

### Gostje in anonimno darovanje

Javna stran za darovanje (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) in plošča »daruj zdaj« prikažeta `NonAuthDonationWrapper` iz `@churchapps/apphelper/website`. Ta okoli `GuestForm` ponudnika vbrizga reCAPTCHA in kontekst Elements prehoda. Gostje nimajo prijave, shranjenih načinov plačila ali zgodovine. Potek pridobi `GET /giving/funds/churchId/:id` in `GET /giving/donate/gateways/:churchId` (samo javni ključi), preveri obiskovalca s `POST /giving/donate/captcha-verify`, tokenizira v brskalniku in pošlje na `/giving/donate/charge` (ali `/subscribe`). Klic za preverjanje vrne 10-minutni z HMAC podpisan `captchaPass` (`Api/src/modules/giving/helpers/CaptchaPass.ts`), ki ga obrazec pošlje pri vsakem denarnem klicu gosta. Če je `CAPTCHA_ENFORCE=true`, API zavrne klice gostov `create-order`, `charge`, `subscribe`, `addcard` in `ach-setup-intent-anon` brez veljavne prepustnice za to cerkev. Plačljive prijave gostov na dogodke (`POST /content/registrations/register`) preverijo isto prepustnico tik pred bremenitvijo. Glej [Prijave na dogodke](./registrations.md#payment-flow). ACH za goste uporablja anonimni `POST /giving/paymentmethods/ach-setup-intent-anon`, ki dovoljuje samo takojšnje preverjanje (Financial Connections). Preverjanje z mikro nakazili se zaključi čez nekaj dni, ko je stran za goste že zaprta, zato darila nikoli ne bi bilo mogoče dokončati. Obrazec ne bremeni nepreverjenega SetupIntent in darovalca usmeri na kartico ali na nastavitev bančnega računa za prijavljene uporabnike.

Tri možnosti obrazca za goste uporabljajo isti klic za polnjenje. `?fundId=` in `?amount=` v URL-ju za darovanje vnaprej izbereta delitev skladov (prebere jo obrazec za goste vsakega ponudnika ob nalaganju in jo usmeri skozi običajni obdelovalnik spremembe sklada, da se skupni zneski in provizije posodobijo). `anonymous: true` pove, da `DonateController.charge` zavrže vsako osebo, ki jo je poslal odjemalec, in darilo zabeleži z `personId = null`. Obrazec za goste preskoči `/people/loadOrCreate` ter korak stranke/trezorja, tri ponudniki s takojšnjim beleženjem pa ne razrešijo osebe iz ID-ja stranke pri prehodu. Apple Pay zahteva, da je domena strani registrirana pri Stripe, zato obrazec za goste pri Stripe enkrat na sejo pošlje zahtevo na javni, s hitrostjo omejeni `POST /giving/donate/register-domain`. Ta sprejme samo domeno, ki pripada cerkvi (`<subDomain>.b1.church`, vrstica v tabeli domen modula content ali lokalni gostitelj), preden pokliče API metod domen za načine plačila pri Stripe.

### Skrbniško beleženje in uvoz iz Stripe (B1Admin)

Razdelek za darovanja v B1Admin (`B1Admin/src/donations/`) je delovno območje finančnih ekip. Vnos v serijah (`components/BulkDonationEntry.tsx`) beleži gotovinska, čekovna in darila v naravi tako, da pošilja na `/giving/donations`, nato na `/giving/funddonations`, brez sodelovanja prehoda. Zapis osebe v pogovornem oknu **Zabeleži darilo** (`components/LogGiftDialog.tsx`) naredi isto za eno darilo. Najprej poišče serijo, katere `batchDate` ustreza datumu darila, ali ustvari novo, poimenovano po tem datumu (`POST /giving/donationbatches`). Če kateri od naslednjih korakov ne uspe, izbriše darilo oziroma novo serijo. Skladi, serije, kampanje in izpiski se preslikajo na svoje CRUD poti `/giving/*`. Strani izpiskov (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) zahtevajo eno koledarsko leto z `GET /donations?startDate=&endDate=` in `GET /fundDonations?startDate=&endDate=`, ne pa celotne zgodovine cerkve, ki bi lahko presegla omejitev velikosti odgovora Lambda. Nadzorna plošča za darovanja v slogu člana (`B1Admin/src/donationComponents/`) ponovno uporablja iste komponente apphelperja kot B1App.

Poročanje in predaje računovodstvu se izvajajo na strani odjemalca ali v izvajalniku poročil, ne prek prehoda. Izvoz za QuickBooks na strani serije iz `donations` in `fundDonations` zgradi CSV dnevniškega vnosa (debet Undeposited Funds, en kredit za vsak sklad). Pogled Lapsed Givers na povzetku zažene `Api/reports/lapsedGivers.json` prek splošnega izvajalnika poročil, imena oseb pa razreši `ReportOutput`. Formati potrdil za države (Kanada / Avstralija / Nova Zelandija) so nastavitve cerkve v shrambi ključ-vrednost članstva, ki jih izriše `GivingStatementDocument` in podvoji stran za tiskanje v B1App. Strani za tiskanje izpiskov v B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) posredujejo nastavitev cerkve `logoLight` (prek `usePrintLogo` v `B1Admin/src/components/PrintChurchHeader.tsx`), da se logotip natisne na vrh vsakega izpiska, in počakajo na sliko, preden se samodejno natisnejo.

### Stanje serije in dovoljenje Vnos darovanj

Serije se lahko zaprejo, da preštet depozit ostane takšen, kot je bil. `POST /giving/donationbatches/:id/close` in `/:id/reopen` (samo Donations.Edit) sta edina pisca polj `status`, `closedDate` in `closedBy` (`DonationBatchRepo.setStatus`). Običajno shranjevanje serije se jih nikoli ne dotakne, zato objava serije ne more odpreti zaprte serije. Pravice pisanja so centralizirane v `Api/src/modules/giving/helpers/BatchAccessHelper.ts`. Donations.Edit lahko spremeni karkoli, ožje dovoljenje Donations.Enter (`GivingApi` / `Donations` / `Enter`, »Vnos darovanj« v urejevalniku vlog) pa lahko ustvarja serije ter shranjuje ali briše darovanja in delitve skladov samo, ko sta trenutna serija darovanja in ciljna serija odprti. Nikoli pa ne more pisati za darilo prehoda (tisto s `transactionId`). Blokirani zapis vrne `403 { error: "This batch is closed." }`. Branje serij sprejme Donations.ViewSummary ali Donations.Enter, da lahko števec izbere serijo, v katero vnaša. Na odjemalcu `B1Admin/src/donations/batchAccess.ts` zrcali ta pravila (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), `Header` in `SecondaryMenuHelper` pa prikažeta **Darovanja > Serije** vsakomur, ki lahko vidi serije, tudi brez View Summary.

### Pretvorba skupnih zneskov v različnih valutah

Vsaka končna točka, ki vrne en sam skupni znesek čez morda različne valute, na primer povzetek KPI darovanj (`GivingKpiCards`), skupni znesek serije, skupni znesek sklada in obdobne skupne vsote na zaslonu za darovanje v B1App, pretvori v privzeto valuto cerkve na strežniku, namesto da bi seštevala nepodobne valute. `Api/src/shared/helpers/ExchangeRateHelper.ts` pridobi tečaje iz `api.frankfurter.dev`, ključene po valuti cerkve, jih za 12 ur hrani v pomnilniku procesa in izpostavi `convertTotals(rows, churchCurrency, rates)`. Vrstice so vnaprej združene po valuti v SQL (peščica skupin, nikoli pretvorba za vsako darilo). Vsaka skupina se pretvori in sešteje, rezultat pa nosi zastavico `isConverted`, ki jo odjemalec uporabi za prikaz opombe »Pretvorjeno po trenutnih tečajih«. `GET /donations/exchange-rates` izpostavi tabelo tečajev odjemalcem, ki jo potrebujejo (zaslon za darovanje v B1App). Tečajev zahteva nikoli ne sprejme iz zahteve, pridobijo se izključno na strežniku, zato odjemalec ne more vplivati na prijavljeni skupni znesek. Posamezni zapisi o darovanjih in zgodovinska poročila v izvirni valuti se nikoli ne pretvarjajo, pretvorijo se samo skupni zneski.

Uvoz iz Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) naknadno vnese darila, narejena zunaj B1. Pokliče `POST /giving/donate/replay-stripe-events` z `dryRun: true` za predogled, nato z `dryRun: false` za uvoz. Strežnik našteje dogodke Stripe za obdobje in preskoči vse, kar je že zabeleženo. Najprej preveri ID ponudnika v `eventLogs`, nato ID transakcije, nato `DonationRepo.findMatchingDonation` (znesek + datum + oseba), tako da ponovni zagon nikoli ne uvozi dvakrat. Dogodke `charge.succeeded` / `payment_intent.succeeded` za naročnine se preskočijo, ker ta darila beleži `invoice.paid`. Novejše različice API-ja Stripe opuščajo `PaymentIntent.invoice`, zato se preskakovanje dodatno ujema z opisom »Subscription …«.

## Webhooki in uskladitev

Poravnana plačila in spremembe stanja naročnin prispejo na `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Obdelava je namerno idempotentna:

1. **Preveri**: `GatewayService.verifyWebhook` prenese preverjanje podpisa na ponudnika. Če podpis ni veljaven, vrne 401. Dogodki, ki jih ni treba obdelati, se predčasno končajo z 200.
2. **Deduplikacija dogodka**: `EventLogRepo.loadByProviderId` preskoči webhook, ki je že zabeležen v `eventLogs`.
3. **Deduplikacija darovanja**: preden se kaj ustvari, se `DonationRepo.loadByTransactionId` preveri za vsak možen ID, ki ga lahko vsebuje vsebina. To pokrije ponovljene dostave, večstopenjske dogodke ACH (na čakanju → poravnano) in primer, ko je `/donate/charge` darilo že optimistično zabeležil.
4. **Uporabi**: metoda `classifyWebhookEvent(eventType)` ponudnika pove, kaj dogodek pomeni (`donation` na čakanju/dokončano, `cancel-subscription` ali `ignore`). Dokončana plačila ustvarijo darovanje `complete` (ali povišajo obstoječe `pending` ali `failed`). Dogodki v slogu ACH pristanejo kot `pending`, dokler niso poravnani. Neuspešen račun za naročnino (Stripe `invoice.payment_failed`) ustvari darovanje `failed` po ID-ju računa, dogodki preklica pa izbrišejo lokalno vrstico `subscriptions`. Krmilnik nikoli ne preverja imen dogodkov, specifičnih za ponudnika.

### Neuspešna ponavljajoča darila in opomnik za plačilo

Darovanje `failed` je enota dela pri obnovi. `GET /giving/donations/failed` jih našteje z najnovejšim sporočilom o napaki prehoda iz `eventLogs` ter zastavico `canRetry` iz zmožnosti prehoda. `POST /giving/donate/retry/:donationId` pokliče `retryFailedPayment` ponudnika (Stripe poravna odprti račun), rezultirajoči webhook pa vrstico prestavi v `complete` prek običajne poti deduplikacije. Opomnike za plačilo darovalcu pošilja obdelovalnik webhookov na dan 0, nato pa jih `DunningHelper.run` v polnočnem časovniku (vezan v `lambda/timer-handler.ts` in v `RailwayCron.ts`) pošlje po 3 in 7 dneh. Vsako pošiljanje se zabeleži v `eventLogs` kot `provider: "dunning"`, `providerId: "<donationId>:<day>"`, zato ponovni zagon nikoli ne pošlje e-pošte dvakrat. Ko Stripe odneha in prekliče naročnino (`customer.subscription.deleted` s `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` darovalcu pošlje e-pošto enkrat (`providerId: "<subscriptionId>:canceled"`). Preklici, ki jih sproži darovalec ali skrbnik, ostanejo tihi. Stripe nikoli ne doda dogodkov obstoječi končni točki. Po spremembi `StripeHelper.webhookEvents` ponovno shranite prehod ali zaženite `tools/manual/stripe-webhook-events.ts` (privzeto suhi zagon, `--apply` za zapis) na produkciji.

Ponudniki z `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) imajo bremenitve zabeležene iz odgovora `/charge` (za srečno pot ni potreben krog webhookov), medtem ko se Stripe zanaša na `payment_intent.succeeded` / `invoice.paid` in ACH `payment_intent.processing`. Ravnanje s provizijami (`POST /giving/donate/fee`, zastavica prehoda `payFees` in `calculateFees` vsakega ponudnika) na strani darovalca izračuna »kritje provizij« kot bruto dvig. B1 ne jemlje platformnega deleža, zato se nikoli ne doda provizija aplikacije.

:::info
Pot polnjenja in pot webhookov zapisujeta iste vrstice `donations` / `fundDonations`. `transactionId` je ključ za povezavo, ki prepreči, da bi optimistično zabeleženo polnjenje in kasnejši webhook ustvarila dve darili za eno darovanje.
:::

## Sorodne strani

- [Končne točke darovanj](../api/endpoints/giving.md): celoten REST vmesnik za darovanja, sklade, serije, prehode, naročnine, načine plačila in webhooke
- [AppHelper](../shared-libraries/app-helper.md): paket npm, ki vsebuje register ponudnikov plačil in komponente za darovanja
- [Struktura modulov](../api/module-structure.md): kako je modul GivingApi organiziran na strežniku
