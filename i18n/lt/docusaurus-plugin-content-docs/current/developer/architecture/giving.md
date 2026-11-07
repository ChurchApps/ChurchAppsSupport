---
title: "Aukojimo architektūra"
---

# Aukojimo architektūra

<div class="article-intro">

ChurchApps aukojimus valdo pagal šliuzo (gateway) modelį: bažnyčia turi savo Stripe (arba PayPal, Kingdom Funding ar Paystack) paskyrą, o B1 mokėjimų kelyje niekada nedalyvauja kaip platformos tarpininkas. Kortelės duomenys tokenizuojami naršyklėje ir niekada nepasiekia ChurchApps serverių. Šis puslapis aprašo visą sistemą: kliento pusės tiekėjų registrą `@churchapps/apphelper` pakete, GivingApi šliuzo abstrakciją, aukų duomenų modelį ir tai, kaip šliuzo webhook'ai sinchronizuojasi su duomenų baze.

</div>

## Apžvalga

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (naršyklė) │                   │  Mokėjimų šliuzas                     │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ kortelės įvedimas │  Stripe Elements · KF tokenizatorius ·│
│  │ Mokėjimo tiekėjų      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registras             │  │◀── žetonas/nonce ─│  (kortelė niekada nepasiekia B1       │
│  │ getPaymentProvider()  │  │                   │  serverio)                            │
│  │ Stripe · PayPal · KF  │  │                   └──────────▲────────────────┬───────────┘
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ pasirašytas webhook
┌─────────────────────────────────────────────┐ (slaptasis    │                │ įvykis
│  GivingApi — /giving modulis                │  raktas)      │                │
│  DonateController → GatewayService          │───────────────┘                │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  įrašo donations + fundDonations — dublikatai tikrinami per eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Visą sistemą vienija trys principai:

1. **Kortelę saugo šliuzas.** Kiekvieno tiekėjo įvesties forma tokenizuoja duomenis naršyklėje; API gauna tik žetoną, nonce arba užsakymo ID.
2. **Viena abstrakcija, daug tiekėjų.** Naršyklė tiekėjo `PaymentProvider` gauna iš registro, serveris – iš gamyklos `IGatewayProvider`. Abu naudoja tą patį normalizuotą tiekėjo pavadinimą, saugomą šliuzo įraše.
3. **Settlement'ui lemiamas yra webhook'as.** Mokėjimo atsakymas įrašomas optimistiškai, tačiau būtent pasirašytas šliuzo webhook'as patvirtina (arba sukuria) užbaigtą auką, o abiejose pusėse taikomos idempotentiškumo apsaugos.

## Kliento pusė: mokėjimo tiekėjų registras (`@churchapps/apphelper`)

Registras yra `Packages/apphelper/src/donations/providers/` kataloge, o kiekvieno tiekėjo valdikliai ir pagalbinės funkcijos – savame poaplankyje (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Už `providers/` ribų joks kodas nesišakoja pagal tiekėjo pavadinimą. `PaymentProvider` (žr. `providers/types.ts`) apima viską, ko reikia host programai vienam šliuzui: `descriptor` (administratoriaus etiketės, palaikomos valiutos, mokesčių laukai, numatytieji mokesčių procentai, valdymo skydelio ir registracijos URL), `capabilities` požymių rinkinį (išsaugotos kortelės, ACH, pasikartojantys mokėjimai, įvedimas naujai kortelei inline, automatinis išsaugojimas tokenizavimo metu), React valdiklius narių įvedimui (`MemberWrapper`/`MemberEntry`), svečių aukojimui (`GuestForm`), išsaugotų mokėjimo būdų redagavimui (`MethodEditForm`) ir mokėjimams per formos klausimus (`FormPayment`), taip pat `buildChargeRequest(ctx, token)` – vienintelę vietą, kur mokėjimo užklausos struktūra skiriasi tarp tiekėjų. Kiekvieno tiekėjo `MemberWrapper` įkelia savo SDK pagal viešąjį šliuzo įrašo raktą, todėl host programos niekada neimportuoja šliuzo SDK (B1App ir B1Admin neturi priklausomybės nuo `@stripe/*`). `pickDefaultGateway(gateways, capability?)` nusprendžia, kurį bažnyčios šliuzą turi naudoti konkretus paviršius.

`providers/registry.ts` saugo integruotus tiekėjus. Jie **nurodomi pagal reikšmę**, o ne registruojami per modulio šalutinį poveikį, todėl paketuotojo medžio kratymas (tree-shaking) niekada nepašalins registracijos:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funkcija | Paskirtis |
|----------|-----------|
| `getPaymentProvider(name)` | Randa pagal normalizuotą pavadinimą; kaip atsarginis variantas grąžina Stripe, kad neteisingai sukonfigūruotas tiekėjas nesugadintų aukotojo formos |
| `registerPaymentProvider(p)` | Vykdymo metu registruoja papildomą tiekėją (host programos pasirinktinis šliuzas) |
| `listPaymentProviders()` | Išvardija integruotus ir pasirinktinius tiekėjus – naudojama administratoriaus šliuzų išskleidžiamajam sąrašui sudaryti |
| `hasPaymentProvider(name)` | Tikrina, ar tiekėjas įtrauktas į registrą |

**Integruoti kliento tiekėjai: Stripe, PayPal, Kingdom Funding, Paystack.** B1App ir B1Admin tik *skaito* registrą (`getPaymentProvider`, `listPaymentProviders`); nė vienas iš jų nekviečia `registerPaymentProvider` – registracija lieka apphelper viduje.

Kiekvienas tiekėjas tokenizuoja skirtingai, tačiau visi kortelės duomenis palieka už B1 ribų:

| Tiekėjas | Įvedimo valdiklis | API grąžinamas žetonas |
|----------|-------------------|------------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; svečių formoje taip pat įdedamas `ExpressCheckoutElement` (Apple Pay / Google Pay, vienkartinėms aukoms), kurio `onConfirm` grąžina tą patį `pm_…` ID | mokėjimo būdo ID (`pm_…`); banko sąskaita per `/paymentmethods/ach-setup-intent` – JAV dolerių šliuzams Financial Connections `us_bank_account`, o kanadietiškiems CAD šliuzams – Kanados PAD `acss_debit` (įgaliojimo modalas, įgaliojimas `default_for` sąskaitoms faktūroms ir prenumeratoms; vienkartiniai mokėjimai perduoda įgaliojimo ID) |
| Kingdom Funding | Hosted tokenizavimo forma, susieta su viešuoju šliuzo raktu | vienkartinis nonce |
| PayPal | PayPal Hosted Fields (kortelė, pasikartojantys mokėjimai) ir PayPal Smart Buttons su Venmo finansavimu (vienkartiniai); abu naudoja bendrą SDK įkėlimą ir serverio pusėje sukurtą užsakymą per `/donate/client-token` + `/donate/create-order` | užfiksuotas užsakymo ID |
| Paystack | Paystack Inline iškylantysis langas (`js.paystack.co/v2/inline.js`) – mokėjimą atlieka pats langas (kortele, mobiliaisiais pinigais, banko pavedimu, USSD); saugomi būdai yra Paystack `AUTH_…` autorizacijos kodai | apmokėta operacijos nuoroda; išsaugoti būdai – Paystack `AUTH_…` autorizacijos kodai |

Stripe `finalizeResult` naršyklėje vykdo 3-D Secure / SCA (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), kol auka laikoma užbaigta. Bendra forma tiesiog iškviečia `provider.finalizeResult(result)` ir nežino, ką ši funkcija daro.

## Serverio pusė: šliuzo abstrakcija (GivingApi)

`/giving` modulis (`Api/src/modules/giving`) atskleidžia REST sąsają, o šliuzo infrastruktūra yra `Api/src/shared/helpers`. `DonateController` niekada tiesiogiai nebendrauja su šliuzo SDK – jis eina per `GatewayService`, kuris iš `GatewayFactory` parenka tinkamą `IGatewayProvider` ir perduoda jam iššifruotą `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() iššifruoja privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) yra sutartis, kurią įgyvendina kiekvienas šliuzas: webhook'ų gyvavimo ciklas (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), mokėjimai (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), mokesčiai (`calculateFees`), išsaugotų mokėjimo būdų valdymas (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) ir pasirenkamos papildomos funkcijos (klientai, užsakymai, SetupIntent, įvykių atkūrimas, `retryFailedPayment` nepavykusiai prenumeratos sąskaitai faktūrai, `registerPaymentMethodDomain` Apple Pay domeno patvirtinimui). Tiekėjas, kuris nepateikia pasirenkamo kablio, pažymimas kaip nepalaikantis atitinkamo veiksmo, o valdiklis sąsajoje paslepiamas. Kiekviena tiekėjo klasė deklaruoja savo `capabilities` matricą (palaikomos valiutos, ACH, grąžinimai, prenumeratos reikalavimai, operacijų limitai) – `GatewayService.getProviderCapabilities(provider)` tik ją nuskaito. Požymiai, pavyzdžiui `logsDonationsImmediately`, valdo valdiklių elgseną, todėl valdikliuose nėra jokių sąlygų pagal tiekėjo pavadinimą.

**Serverio tiekėjai, registruoti `GatewayFactory`:**

| Tiekėjas | Prieinamumas |
|----------|--------------|
| Stripe | Visada įjungtas |
| PayPal | Visada įjungtas |
| Kingdom Funding | Visada įjungtas |
| Paystack | Visada įjungtas (Nigerijos, Ganos, Pietų Afrikos, Kenijos, Dramblio Kaulo Kranto prekybininkams; valiutos NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Įjungiamas pasirinktinai per `ENABLE_SQUARE` aplinkos kintamąjį |
| ePayMints | Įjungiamas pasirinktinai per `ENABLE_EPAYMINTS` aplinkos kintamąjį |

Paystack skiriasi nuo kitų tuo, kad pinigai judą dar prieš GivingApi įsitraukiant: iškylantysis langas nurašo lėšas iš aukotojo, `processCharge` yra `GET /transaction/verify/:reference` užklausa, kurios sumokėta suma ir valiuta turi sutapti su įrašomu aukojimu (nuoroda, jau esanti įraše, niekada neįrašoma dukart). Pirmoji periodinio grafiko auka įrašoma iš `finalizeSubscription` (verify → `POST /plan` → `POST /subscription`, kur `start_date` nustatoma vieną intervalą į priekį). Webhook'ai pasirašomi pačiu slaptuoju raktu (`x-paystack-signature`, HMAC-SHA512 nuo neapdoroto turinio), o Paystack neturi webhook'ų valdymo API, todėl administratoriaus ekrane rodomas URL, kurį bažnyčia turi įklijuoti į savo valdymo skydelį. Pratęsimų `charge.success` įvykiai neturi lėšų paskirstymo; tiekėjas jį atkuria iš aukotojo vietinių `subscriptions`/`subscriptionFunds` įrašų. Pakartotinai naudojami tik kortelių autorizavimai – mobiliųjų pinigų aukos galioja tik vienkartinės, todėl `createSubscription` jų atsisako. Demonstraciniai duomenys įkelia antrą bažnyčią (Accra Community Church, `CHU00000002`) su Paystack testiniu GHS šliuzu, kad Paystack Playwright testų rinkinys veiktų šalia Grace Stripe rinkinio.

Pasirinktiniai tiekėjai gali būti registruojami vykdymo metu, kai nustatytas `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` yra tokių tiekėjų bazinė klasė. Tiekėjų pavadinimai lyginami nepaisant raidžių dydžio.

### Šliuzo konfigūracija ir paslaptys

Administratorius šliuzo prisijungimo duomenis išsaugo per `POST /giving/gateways` (`GatewayController`). Išsaugant valdiklis prieš įrašydamas šifruoja privatų ir webhook raktus per `EncryptionHelper`, o bet kuriame ne localhost serveryje ištrina esamą bažnyčios webhook'ą ir sukuria naują, nukreiptą į `/giving/donate/webhook/{provider}?churchId=…`. Bažnyčia turi po vieną įrašą kiekvienam tiekėjui: išsaugojus šliuzą, pakeičiamas tik to paties tiekėjo esamas įrašas. Viešos užklausos (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) grąžina tik viešuosius raktus.

## Duomenų modelis

Giving schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeliai `models/` kataloge) yra MySQL schema, pasiekiama per Kysely:

| Lentelė | Paskirtis |
|---------|-----------|
| `gateways` | Bažnyčios tiekėjo konfigūracija: `provider`, `publicKey`, užšifruoti `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Aukų paskirtys (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Įvedimo ir ataskaitų grupavimas (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Viena auka: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; pažymėjimai, sumos, suvestinės ir aukų ataskaitos skaičiuoja tik `complete` arba null įrašus), `transactionId` |
| `fundDonations` | Vienos aukos paskirstymas vienam ar keliems fondams (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Periodinė auka; `id` yra šliuzo prenumeratos ID, susietas su `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Periodinės aukos lėšų paskirstymas pagal fondus |
| `customers` | Susieja `personId` su šliuzo kliento ID, pagal `provider` |
| `gatewayPaymentMethods` | Išsaugotos kortelės ir banko sąskaitos: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook'ų ir įvykių auditas bei dublikatų raktas (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Pažadų kampanijos, susietos su fondu, ir kiekvieno asmens pažadėta suma |

Auka paskirstoma tarp fondų per `fundDonations` – `donations` įraše saugoma bendra suma, o kiekvienas `fundDonation` įrašas saugo jos dalį. `donations.currency` ir `gateways.currency` saugo ISO valiutos kodą; kiekvienas tiekėjas nurodo savo `supportedCurrencies`, o sumos formatuojamos su `CurrencyHelper.formatCurrencyWithLocale`.

## Visi srautai nuo pradžios iki galo

### Narių vienkartinės ir periodinės aukos (B1App)

Autentifikuotas aukojimo ekranas (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) sudėtas iš trijų apphelper komponentų: `MultiGatewayDonationForm`, `PaymentMethods` ir `RecurringDonations`. B1App atlieka aplinkinį duomenų įkėlimą – `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` – ir perduoda šliuzų sąrašą; parinktas tiekėjas pats įkelia SDK pagal viešąjį šliuzo raktą. Mokėjimą atlieka apphelper viduje: parinktas tiekėjas tokenizuoja (naują arba išsaugotą) mokėjimo būdą, tada siunčia užklausą į `/giving/donate/charge` vienkartinei aukai arba į `/giving/donate/subscribe` periodinei. Abu galutiniai taškai prisijungusio aukotojo auką priskiria jo paties `personId` (kitam asmeniui priskirti gali tik `donations.edit` turėtojai) ir atmeta lėšų paskirstymus, kurių suma viršija nurašytą sumą. Periodinės aukos sukuria `subscriptions` įrašą ir `subscriptionFunds`, o tvarkaraštį perduoda šliuzui (Stripe Subscriptions, PayPal Billing Plans arba KF periodinis tvarkaraštis).

### Svečių ir anonimiškos aukos

Viešas aukojimo puslapis (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) ir "aukoti dabar" skydelis atvaizduoja `NonAuthDonationWrapper` iš `@churchapps/apphelper/website`, kuris aplink tiekėjo `GuestForm` įterpia reCAPTCHA ir šliuzo Elements kontekstą. Svečiams nereikia prisijungti, jie neturi išsaugotų mokėjimo būdų ir istorijos. Srautas kviečia `GET /giving/funds/churchId/:id` ir `GET /giving/donate/gateways/:churchId` (tik viešieji raktai), patikrina lankytoją per `POST /giving/donate/captcha-verify`, tokenizuoja naršyklėje ir siunčia į `/giving/donate/charge` (arba `/subscribe`). Patikros atsakyme grąžinamas 10 minučių galiojimo HMAC pasirašytas `captchaPass` (`Api/src/modules/giving/helpers/CaptchaPass.ts`), kurį forma siunčia su kiekviena svečio mokėjimo užklausa. Jei nustatytas `CAPTCHA_ENFORCE=true`, API atmeta svečių `create-order`, `charge`, `subscribe`, `addcard` ir `ach-setup-intent-anon` užklausas be galiojančio tos bažnyčios pass'o. Mokamos svečių renginių registracijos (`POST /content/registrations/register`) tikrina tą patį pass'ą prieš pat mokėjimą; žr. [Renginių registracijos](./registrations#payment-flow). Svečių ACH naudoja anoniminį `POST /giving/paymentmethods/ach-setup-intent-anon`, kuris leidžia tik momentinį (Financial Connections) patvirtinimą: mikroįnašų patikrinimas baigiasi po kelių dienų, kai svečio puslapis jau uždarytas, todėl auka niekada nebūtų užbaigta. Forma atsisako nurašyti lėšas nepatvirtintu SetupIntent ir nukreipia aukotoją į kortelę arba į prisijungusio asmens banko sąskaitos nustatymą.

Trys svečių formos parinktys veikia per tą patį mokėjimo užklausos kvietimą. `?fundId=` ir `?amount=` aukojimo URL iš anksto parenka lėšų paskirstymą (jį nuskaito kiekvienos tiekėjo svečių forma prisijungiant, o pakeitimai eina per įprastą fondo keitimo tvarkyklę, todėl sumos ir mokesčiai atsinaujina). `anonymous: true` verčia `DonateController.charge` atmesti bet kokį kliento atsiųstą asmenį ir įrašyti auką su `personId = null`; svečių forma praleidžia `/people/loadOrCreate` ir kliento/saugyklos žingsnį, o trys tiekėjai, kurie įrašo iš karto, nebebando nustatyti asmens iš šliuzo kliento. Apple Pay reikalauja, kad puslapio domenas būtų užregistruotas Stripe, todėl Stripe svečių forma kartą per sesiją siunčia į viešą, greičio apribotą `POST /giving/donate/register-domain`, kuris priima tik bažnyčiai priklausantį domeną (`<subDomain>.b1.church`, turinio modulio domenų lentelės įrašą arba vietinį serverį), prieš kviesdamas Stripe payment-method-domains API.

### Administratoriaus įrašymas ir Stripe importas (B1Admin)

B1Admin aukų skyrius (`B1Admin/src/donations/`) yra finansų komandų darbo vieta. Partijų įvedimas (`components/BulkDonationEntry.tsx`) registruoja grynuosius, čekių ar natūra gautas aukas siųsdamas `/giving/donations`, o po to `/giving/funddonations` – šliuzas čia nedalyvauja. Asmens įrašo lapas **Log a gift** (`components/LogGiftDialog.tsx`) daro tą patį vienai aukai: pirmiausia randa partiją, kurios `batchDate` sutampa su aukos data, arba sukuria partiją, pavadintą pagal tą datą (`POST /giving/donationbatches`), ir jei vėlesnis žingsnis nepavyksta, ištrina aukos ar naujai sukurtos partijos įrašą. Lėšos, partijos, kampanijos ir pažymėjimai atitinka savo `/giving/*` CRUD maršrutus. Aukų pažymėjimų puslapiai (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) užklausia vienų kalendorinių metų duomenis per `GET /donations?startDate=&endDate=` ir `GET /fundDonations?startDate=&endDate=`, o ne visą bažnyčios istoriją, kuri galėtų viršyti Lambda atsakymo dydžio ribą. Narių stiliaus aukojimo skydelis (`B1Admin/src/donationComponents/`) naudoja tuos pačius apphelper komponentus kaip B1App.

Ataskaitų teikimas ir apskaitos perdavimai vyksta kliento pusėje arba ataskaitų vykdytuve, o ne per šliuzą: partijos puslapio QuickBooks eksportas sudaro žurnalo įrašų CSV iš partijos `donations` ir `fundDonations` (debetas Undeposited Funds, po vieną kreditą kiekvienam fondui); suvestinės puslapio Lapsed Givers rodinys paleidžia `Api/reports/lapsedGivers.json` per bendrą ataskaitų vykdytuvą, o asmenų vardus pateikia `ReportOutput`; šalių kvitų formatai (Kanada / Australija / Naujoji Zelandija) yra bažnyčios nustatymai narystės raktų ir reikšmių saugykloje, kuriuos atvaizduoja `GivingStatementDocument` ir kurie dubliuojami B1App spausdinimo puslapyje. B1Admin pažymėjimų spausdinimo puslapiai (`PrintDonationPage`, `PrintAllStatementsPage`) perduoda bažnyčios `logoLight` nustatymą (per `usePrintLogo` iš `B1Admin/src/components/PrintChurchHeader.tsx`), kad logotipas būtų spausdinamas kiekvieno pažymėjimo viršuje, ir palaukia, kol paveikslėlis įsikraus, prieš automatiškai pradedant spausdinimą.

### Partijų būsena ir leidimas Enter Donations

Partijas galima uždaryti, kad patvirtintas indėlis išliktų toks, koks buvo. `POST /giving/donationbatches/:id/close` ir `/:id/reopen` (tik Donations.Edit) yra vieninteliai `status`, `closedDate` ir `closedBy` rašytojai (`DonationBatchRepo.setStatus`); įprastas partijos išsaugojimas jų niekada nepaliečia, todėl partijos paskelbimas negali ją atidaryti iš naujo. Rašymo prieigą centralizuoja `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit gali keisti bet ką, o siauresnis Donations.Enter leidimas (`GivingApi` / `Donations` / `Enter`, role editor'iuje pavadintas "Enter Donations") gali kurti partijas ir išsaugoti ar šalinti aukas bei lėšų paskirstymus tik tada, kai atitinkama aukos dabartinė partija ir tikslinė partija yra atidarytos, ir niekada gateway aukai (tokiai, kuri turi `transactionId`). Užblokuotas rašymas grąžina `403 { error: "This batch is closed." }`. Partijų skaitymui pakanka Donations.ViewSummary arba Donations.Enter, kad skaičiuotojas galėtų pasirinkti partiją, į kurią įveda duomenis. Kliento pusėje `B1Admin/src/donations/batchAccess.ts` atkartoja šias taisykles (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), o `Header` / `SecondaryMenuHelper` rodo meniu punktą **Donations > Batches** visiems, kurie gali matyti partijas, net jei neturi View Summary leidimo.

### Mišrių valiutų sumų konvertavimas

Bet kuris galutinis taškas, grąžinantis vieną bendrą sumą iš galimai skirtingomis valiutomis atliktų aukų – aukojimo suvestinės KPI (`GivingKpiCards`), partijos suma, fondo suma ir B1App aukojimo ekrano metų nuo pradžios / laikotarpio sumos – konvertuoja sumas į bažnyčios numatytąją valiutą serverio pusėje, o ne sudeda nepanašias valiutas. `Api/src/shared/helpers/ExchangeRateHelper.ts` gauna kursus iš `api.frankfurter.dev` pagal bažnyčios valiutą, talpina juos proceso atmintyje 12 valandų ir teikia `convertTotals(rows, churchCurrency, rates)`: eilutės SQL užklausoje jau sugrupuotos pagal valiutą (keletas grupių, niekada ne konvertavimas kiekvienai aukai), kiekviena grupė konvertuojama ir sumuojama, o rezultate pateikiamas `isConverted` požymis, pagal kurį klientas rodo pastabą "Converted at current exchange rates". `GET /donations/exchange-rates` atskleidžia kursų lentelę klientams, kuriems jos reikia (B1App aukojimo ekranui); kursų niekada nepriima užklausa – jie visada gaunami tik serverio pusėje, todėl klientas negali paveikti pateikiamos sumos. Atskiri aukų įrašai ir istoriniai / originalios valiutos pranešimai niekada nekonvertuojami – konvertuojamos tik bendros sumos.

Stripe importas (`B1Admin/src/donations/StripeImportPage.tsx`) papildo aukas, įvestas ne per B1: jis kviečia `POST /giving/donate/replay-stripe-events` su `dryRun: true` peržiūrai, o paskui su `dryRun: false` importavimui. Serveris išvardija Stripe įvykius nurodytam laikotarpiui ir praleidžia tuos, kurie jau įrašyti: pirmiausia atitikimas ieškomas pagal `eventLogs` tiekėjo ID, po to pagal transakcijos ID, tada pagal `DonationRepo.findMatchingDonation` (suma + data + asmuo), todėl pakartotinis paleidimas nesukuria dublikatų. Prenumeratų `charge.succeeded` / `payment_intent.succeeded` įvykiai praleidžiami, nes tas aukas įrašo `invoice.paid`; naujesnės Stripe API versijos nebepateikia `PaymentIntent.invoice`, todėl praleidimas taip pat remiasi aprašymu "Subscription …".

## Webhook'ai ir sinchronizavimas

Įvykdyti mokėjimai ir prenumeratų būsenos pakeitimai pasiekia `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Apdorojimas tyčia yra idempotentiškas:

1. **Patikrinimas** – `GatewayService.verifyWebhook` perduoda tikrinimą tiekėjo parašo patikrai; nepavykus parašo patikrai, grąžinamas 401. Įvykiai, kuriems apdorojimo nereikia, nutraukiami su 200.
2. **Įvykio dublikato patikrinimas** – `EventLogRepo.loadByProviderId` praleidžia webhook'ą, jau įrašytą `eventLogs`.
3. **Aukos dublikato patikrinimas** – prieš ką nors kuriant, `DonationRepo.loadByTransactionId` tikrinamas su kiekvienu galimu kandidato ID, kurį gali turėti užklausos turinys. Tai sugeria pakartotinius pristatymus, kelių etapų ACH įvykius (laukiama → įskaityta) ir atvejį, kai `/donate/charge` jau optimistiškai įrašė aukos ataskaitą.
4. **Taikymas** – tiekėjo `classifyWebhookEvent(eventType)` nusako, ką įvykis reiškia (`donation` laukiama/užbaigta, `cancel-subscription` arba `ignore`); užbaigti mokėjimai sukuria `complete` auką (arba paaukština esamą `pending` ar `failed` įrašą), ACH tipo įvykiai įrašomi kaip `pending` iki įskaitymo, nepavykusi prenumeratos sąskaita (Stripe `invoice.payment_failed`) sukuria `failed` auką, susietą su sąskaitos ID, o atšaukimo įvykiai ištrina vietinį `subscriptions` įrašą. Valdiklis niekada netikrina tiekėjui specifinių įvykių pavadinimų.

### Nepavykę periodiniai mokėjimai ir priminimai

`failed` auka yra atkūrimo darbo vienetas. `GET /giving/donations/failed` išvardija tokias aukas su naujausiu šliuzo klaidos pranešimu iš `eventLogs` ir `canRetry` požymiu pagal šliuzo galimybes; `POST /giving/donate/retry/:donationId` iškviečia tiekėjo `retryFailedPayment` (Stripe apmoka atvirą sąskaitą faktūrą), o gautas webhook'as per įprastą dublikatų kelią paaukština įrašą iki `complete`. Priminimo laiškai aukotojui siunčiami iš webhook tvarkyklės pirmą dieną (0), o vėliau iš `DunningHelper.run` vidurnakčio laikmačio (įregistruoto tiek `lambda/timer-handler.ts`, tiek `RailwayCron.ts`) 3-ią ir 7-ą dieną; kiekvienas išsiuntimas įrašomas `eventLogs` kaip `provider: "dunning"`, `providerId: "<donationId>:<day>"`, todėl pakartotinis paleidimas niekada nesiunčia laiško dukart. Kai Stripe atsisako bandymų ir atšaukia prenumeratą (`customer.subscription.deleted` su `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` vieną kartą informuoja aukotoją el. laišku (`providerId: "<subscriptionId>:canceled"`); aukotojo ar administratoriaus inicijuoti atšaukimai lieka tylūs. Stripe niekada nepridedą įvykių prie jau esamo galutinio taško: pakeitus `StripeHelper.webhookEvents`, arba iš naujo išsaugokite šliuzą, arba paleiskite `tools/manual/stripe-webhook-events.ts` (pagal numatytuosius nustatymus bandomasis paleidimas, `--apply` įrašymui) prieš produkciją.

Tiekėjai su `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) aukas įrašo iš `/charge` atsakymo (sėkmingam scenarijui webhook'o kelio nereikia), o Stripe remiasi `payment_intent.succeeded` / `invoice.paid` ir ACH `payment_intent.processing`. Mokesčių tvarkymas (`POST /giving/donate/fee`, šliuzo `payFees` požymis ir kiekvieno tiekėjo `calculateFees`) apskaičiuoja aukotojo pusės "padengti mokesčius" sumą – B1 jokio platformos mokesčio neima, todėl niekada nepridedamas joks taikomasis mokestis.

:::info
Mokėjimo ir webhook'o keliai įrašo tas pačias `donations` / `fundDonations` eilutes. `transactionId` yra jungiamasis raktas, kuris neleidžia optimistiškai įrašytam mokėjimui ir vėlesniam webhook'ui sukurti dviejų aukų vienai aukai.
:::

## Susiję puslapiai

- [Aukų galutiniai taškai](../api/endpoints/giving) – pilna REST sąsaja aukoms, fondams, partijoms, šliuzams, prenumeratoms, mokėjimo būdams ir webhook'ams
- [AppHelper](../shared-libraries/app-helper) – npm paketas, pateikiantis mokėjimo tiekėjų registrą ir aukų komponentus
- [Modulio struktūra](../api/module-structure) – kaip serverio pusėje organizuotas GivingApi modulis
