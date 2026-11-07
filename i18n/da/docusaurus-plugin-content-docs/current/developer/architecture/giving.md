---
title: "Gavearkitektur"
description: "Udviklerguide til ChurchApps-givning: hvordan B1 Admin og B1.church sender donationer via Stripe, PayPal, Kingdom Funding eller Paystack-gateways."
---

# Gavearkitektur

<div class="article-intro">

ChurchApps kører donationer efter en gateway-rail-model: kirken beholder sin egen Stripe-konto (eller PayPal, Kingdom Funding eller Paystack), og B1 optræder aldrig som platformsprocessor i pengestrømmen. Kortdata tokeniseres i browseren og når aldrig en ChurchApps-server. Denne side beskriver hele stakken: det klientsidede udbyderregister i `@churchapps/apphelper`, GivingApi-gateway-abstraktionen, donationens datamodel, og hvordan gateway-webhooks afstemmes tilbage i databasen.

</div>

## Oversigt

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Betalingsgateway                     │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ kortindtastning i │  Stripe Elements · KF-tokenizer ·     │
│  │ Betalingsudbyder-     │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ register              │  │◀── token / nonce ─│  (kortet når aldrig en B1-server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signeret webhook
┌─────────────────────────────────────────────┐ (hemmelig nøgle)│                │ begivenhed
│  GivingApi — /giving-modul                  │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  gem donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving-skema)
```

Tre principper gælder på tværs af hele stakken:

1. **Gatewayen holder kortet.** Enhver udbyders indtastningswidget tokeniserer i browseren; API'et modtager kun et token, en nonce eller et ordre-id.
2. **Én abstraktion, mange udbydere.** Browseren finder en `PaymentProvider` i et register; serveren finder en `IGatewayProvider` i en factory. Begge bruger det samme normaliserede udbydernavn, som er gemt på gateway-posten.
3. **Webhooks er sandhedskilden for afregning.** Et opkaldssvar fra `/donate/charge` registreres optimistisk, men det er gatewayens signerede webhook, der bekræfter (eller opretter) den gennemførte donation. Der er idempotensbeskyttelse på begge sider.

## Klientsiden: betalingsudbyderregistret (`@churchapps/apphelper`)

Registret ligger i `Packages/apphelper/src/donations/providers/`, og hver udbyders widgets og hjælpefunktioner ligger i deres egen undermappe (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Intet uden for `providers/` forgrener sig efter et udbydernavn. En `PaymentProvider` (se `providers/types.ts`) samler alt, en værtsapp har brug for til én gateway: en `descriptor` (administratoretiketter, understøttede valutaer, gebyrfelter, standardgebyrsatser og links til dashboard og tilmelding), et sæt `capabilities`-flag (gemte kort, ACH, gentagne betalinger, indtastning af nyt kort direkte i formularen, implicit gem ved tokenisering), React-widgets til medlemsindtastning (`MemberWrapper`/`MemberEntry`), gæstegivning (`GuestForm`), redigering af gemte betalingsmetoder (`MethodEditForm`) og betalinger i formularspørgsmål (`FormPayment`), samt `buildChargeRequest(ctx, token)`, som er det ene sted, hvor formatet på betalingsanmodningen varierer mellem udbydere. Hver udbyders `MemberWrapper` indlæser sit eget SDK ud fra gateway-postens offentlige nøgle, så værtsapps aldrig importerer et gateway-SDK. B1App og B1Admin har ingen `@stripe/*`-afhængighed. `pickDefaultGateway(gateways, capability?)` samler valget af, hvilken af kirkens gateways en flade skal bruge.

`providers/registry.ts` indeholder de indbyggede udbydere. De **refereres ved værdi** i stedet for at blive registreret via en sideeffekt i et modul. Dermed kan bundlerens tree-shaking aldrig fjerne registreringen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funktion | Formål |
|----------|---------|
| `getPaymentProvider(name)` | Finder udbyderen ud fra det normaliserede navn; falder tilbage til Stripe, så en fejlkonfigureret udbyder aldrig får donationsformularen til at gå ned |
| `registerPaymentProvider(p)` | Registrerer en ekstra udbyder under kørsel (til en værtsapps egen gateway) |
| `listPaymentProviders()` | Lister de indbyggede og de tilpassede udbydere; bruges til at opbygge administrationens rullemenu for gateways |
| `hasPaymentProvider(name)` | Tjekker, om en udbyder findes i registret |

**Indbyggede klientudbydere: Stripe, PayPal, Kingdom Funding og Paystack.** B1App og B1Admin *læser* kun registret (`getPaymentProvider`, `listPaymentProviders`). Ingen af dem kalder `registerPaymentProvider`. Registrering sker altid inde i apphelper.

Hver udbyder tokeniserer forskelligt, men alle holder kortet ude af B1:

| Udbyder | Indtastningswidget | Token returneret til API |
|---------|--------------------|--------------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`. Gæsteformularen monterer desuden en `ExpressCheckoutElement` (Apple Pay / Google Pay, til engangsgaver), hvis `onConfirm` giver det samme `pm_…`-id | Betalingsmetode-id (`pm_…`). Bank via `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` for USD-gateways, canadisk PAD `acss_debit` (hostet mandatmodal, mandat med `default_for` for fakturaer/abonnementer, engangsbetalinger sender mandat-id med) for CAD-gateways |
| Kingdom Funding | Hostet tokeniseringsformular, nøglet med gatewayens offentlige nøgle | Engangsnonce |
| PayPal | PayPal Hosted Fields (kort, gentagne betalinger) samt PayPal Smart Buttons med Venmo-finansiering (engangsbetalinger). Begge deler ét SDK-indlæsning og serverordren, som bygges via `/donate/client-token` + `/donate/create-order` | Fanget ordre-id |
| Paystack | Paystack Inline-popup (`js.paystack.co/v2/inline.js`). Selve popuppen gennemfører betalingen (kort, mobilpenge, bankoverførsel, USSD) | Betalt transaktionsreference. Gemte betalingsmetoder er Paystack-`AUTH_…`-autorisationskoder |

Stripes `finalizeResult` kører 3-D Secure / SCA i browseren (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), før donationen betragtes som gennemført. Den fælles formular kalder bare `provider.finalizeResult(result)` og ved ikke, hvad den gør.

## Serversiden: gateway-abstraktionen (GivingApi)

`/giving`-modulet (`Api/src/modules/giving`) udstiller REST-overfladen, og gateway-infrastrukturen ligger i `Api/src/shared/helpers`. `DonateController` taler aldrig direkte med et gateway-SDK. Den går gennem `GatewayService`, som finder den rigtige `IGatewayProvider` via `GatewayFactory` og giver den en dekrypteret `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() dekrypterer privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) er kontrakten, som hver gateway implementerer. Den dækker webhook-livscyklussen (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betalinger (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), gebyrer (`calculateFees`), håndtering af gemte betalingsmetoder (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) og valgfrie udvidelser (kunder, ordrer, SetupIntents, genafspilning af begivenheder, `retryFailedPayment` for en fejlet abonnementsfaktura og `registerPaymentMethodDomain` til verificering af Apple Pay-domæner). En udbyder, der udelader en valgfri hook, rapporteres som ikke understøttet for den handling, og brugerfladen skjuler kontrollen. Hver udbyderklasse angiver sin egen `capabilities`-matrix (understøttede valutaer, ACH, refusioner, krav til abonnementer, transaktionsgrænser). `GatewayService.getProviderCapabilities(provider)` læser blot den. Flag som `logsDonationsImmediately` styrer controllerens adfærd uden betingelser på udbydernavne i controllerne.

**Serverudbydere registreret i `GatewayFactory`:**

| Udbyder | Tilgængelighed |
|---------|----------------|
| Stripe | Altid aktiv |
| PayPal | Altid aktiv |
| Kingdom Funding | Altid aktiv |
| Paystack | Altid aktiv (handlende i Nigeria, Ghana, Sydafrika, Kenya og Côte d'Ivoire; valutaerne NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Fravalg via miljøflaget `ENABLE_SQUARE` |
| ePayMints | Fravalg via miljøflaget `ENABLE_EPAYMINTS` |

Paystack adskiller sig fra de andre ved, at pengene bevæger sig, før GivingApi er involveret. Popuppen trækker beløbet fra donoren, og `processCharge` er et `GET /transaction/verify/:reference`, hvor det betalte beløb og valuta skal matche donationen, der registreres. En reference, der allerede er registreret, logges aldrig to gange. Den første gave i en gentagen plan logges fra `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` med `start_date` ét interval ude i fremtiden). Webhooks signeres med den hemmelige nøgle selv (`x-paystack-signature`, HMAC-SHA512 over den rå body). Paystack har ingen API til at administrere webhooks, så administrationsskærmen viser den URL, som kirken skal indsætte i sit dashboard. Fornyelseshændelser `charge.success` indeholder ingen fordeling på fonde, så udbyderen finder den i donorens lokale rækker i `subscriptions`/`subscriptionFunds`. Kun kortautorisationer er `reusable`. Mobilpengegaver er kun engangsgaver, så `createSubscription` afviser dem. Demodataene opretter en anden kirke (Accra Community Church, `CHU00000002`) med en Paystack-testgateway i GHS, så Paystack-Playwright-testene kører ved siden af Graces Stripe-test.

Tilpassede udbydere kan registreres under kørsel, når `ENABLE_CUSTOM_GATEWAY_PROVIDERS` er sat. `AbstractExperimentalGatewayProvider` er basisklassen for dem. Udbydernavne matches uden hensyn til store og små bogstaver.

### Gateway-konfiguration og hemmeligheder

En administrator gemmer gateway-legitimationsoplysninger via `POST /giving/gateways` (`GatewayController`). Ved lagring krypterer controlleren de private nøgler og webhook-nøglerne med `EncryptionHelper`, før de gemmes. Derefter, på enhver anden vært end localhost, sletter den kirkens eksisterende webhook og opretter en ny, som peger på `/giving/donate/webhook/{provider}?churchId=…`. En kirke har én række pr. udbyder. Når en gateway gemmes, erstattes kun den eksisterende række for netop den udbyder. Offentlige læsninger (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnerer kun offentlige nøgler.

## Datamodel

Giving-skemaet (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller i `models/`) er et MySQL-skema, som tilgås via Kysely:

| Tabel | Rolle |
|-------|-------|
| `gateways` | Udbyderkonfiguration pr. kirke: `provider`, `publicKey`, krypteret `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Gaveformål (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppering til indtastning og rapportering (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Én gave: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; opgørelser, totaler, dashboards og donationsrapporter tæller kun `complete` eller null), `transactionId` |
| `fundDonations` | Fordeling af en donation på en eller flere fonde (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Gentagen gave. `id` er gatewayens abonnements-id, knyttet til `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fordeling på fonde for en gentagen gave |
| `customers` | Knytter et `personId` til gatewayens kunde-id, pr. `provider` |
| `gatewayPaymentMethods` | Gemte kort og bankkonti: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Revisionsspor for webhooks og begivenheder samt dedup-nøgle (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Løfteindsamlinger knyttet til en fond, og hver persons lovede beløb |

En donation fordeles på fonde via `fundDonations`. Donationen bærer det samlede beløb, og hver `fundDonation` bærer en del af det. `donations.currency` og `gateways.currency` bærer ISO-valutakoden. Hver udbyder annoncerer sine `supportedCurrencies`, og beløb formateres med `CurrencyHelper.formatCurrencyWithLocale`.

## Ende-til-ende-flows

### Medlem: engangs- og gentagne gaver (B1App)

Den godkendte donationsskærm (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) sammensætter tre apphelper-komponenter: `MultiGatewayDonationForm`, `PaymentMethods` og `RecurringDonations`. B1App står for den omgivende dataindlæsning: `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id` og `/customers/:id/subscriptions`. Gatewaylisten sendes videre, og den valgte udbyder indlæser sit eget SDK ud fra gatewayens offentlige nøgle. Selve betalingen sker inde i apphelper. Den valgte udbyder tokeniserer den (nye eller gemte) betalingsmetode og sender derefter til `/giving/donate/charge` for en engangsgave eller `/giving/donate/subscribe` for en gentagen gave. Begge endepunkter tilskriver en logget ind donor til dennes egen `personId` (kun `donations.edit`-brugere må tilskrive en anden person). De afviser også fordelinger på fonde, der summerer til mere end det opkrævede beløb. Gentagne gaver opretter en `subscriptions`-række plus `subscriptionFunds` og overdrager planen til gatewayen (Stripe Subscriptions, PayPal Billing Plans eller en KF-gentagelsesplan).

### Gæster og anonym giving

Den offentlige donationsside (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) og panelet "giv nu" viser `NonAuthDonationWrapper` fra `@churchapps/apphelper/website`. Den indsætter reCAPTCHA og gatewayens Elements-kontekst omkring udbyderens `GuestForm`. Gæster får ingen login, ingen gemte betalingsmetoder og ingen historik. Flowet henter `GET /giving/funds/churchId/:id` og `GET /giving/donate/gateways/:churchId` (kun offentlige nøgler), verificerer besøgende med `POST /giving/donate/captcha-verify`, tokeniserer i browseren og sender til `/giving/donate/charge` (eller `/subscribe`). Verificeringskaldet returnerer et `captchaPass` med HMAC-signatur, der gælder i 10 minutter (`Api/src/modules/giving/helpers/CaptchaPass.ts`). Formularen sender det med hvert pengerelateret gæstekald. Hvis `CAPTCHA_ENFORCE=true` er sat, afviser API'et gæsters kald til `create-order`, `charge`, `subscribe`, `addcard` og `ach-setup-intent-anon`, hvis der ikke medsendes et gyldigt pass for den kirke. Betalte gæstetilmeldinger til begivenheder (`POST /content/registrations/register`) kontrollerer det samme pass lige før opkrævningen. Se [Event Registrations](./registrations.md#payment-flow). Gæste-ACH bruger det anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`, som kun tillader øjeblikkelig verificering (Financial Connections). En verificering med mikrobeløb afsluttes først flere dage senere, når gæstesiden er lukket, så gaven kunne aldrig fuldføres. Formularen nægter at opkræve på et ikke-verificeret SetupIntent og henviser donoren til kort eller til en bankopsætning med login.

Tre valgmuligheder i gæsteformularen bruger det samme betalingskald. `?fundId=` og `?amount=` i donationens URL forudvælger fordelingen på fonde. Hver udbyders gæsteformular læser dem ved montering og sender dem gennem den normale handler for ændring af fonde, så summer og gebyrer opdateres. `anonymous: true` får `DonateController.charge` til at kassere enhver person, som klienten har sendt, og registrere gaven med `personId = null`. Gæsteformularen springer over `/people/loadOrCreate` og trinnet for kunde/boks. De tre udbydere, der logger øjeblikkeligt, holder op med at finde en person ud fra gatewaykunden. Apple Pay kræver, at sidens domæne er registreret hos Stripe. Derfor sender en Stripe-gæsteformular én gang pr. session til det offentlige, hastighedsbegrænsede `POST /giving/donate/register-domain`. Endepunktet accepterer kun et domæne, der tilhører kirken (`<subDomain>.b1.church`, en række i indholdsmodulets domænetabel eller en lokal vært), før det kalder Stripes API for betalingsmetodedomæner.

### Administrativ registrering og Stripe-import (B1Admin)

Donationsafsnittet i B1Admin (`B1Admin/src/donations/`) er der, hvor økonomiteams arbejder. Batchindtastning (`components/BulkDonationEntry.tsx`) registrerer kontant-, check- og naturalgaver ved at sende til `/giving/donations` og derefter `/giving/funddonations`. Ingen gateway er involveret. Personens **Log a gift**-ark (`components/LogGiftDialog.tsx`) gør det samme for en enkelt gave. Først finder den batchen, hvis `batchDate` matcher gavedatoen, eller opretter en batch med datoen som navn (`POST /giving/donationbatches`). Hvis et senere trin fejler, sletter den donationen eller den nye batch igen. Fonde, batcher, kampagner og opgørelser svarer hver til deres CRUD-ruter under `/giving/*`. Siderne for giveropgørelser (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) henter ét kalenderår med `GET /donations?startDate=&endDate=` og `GET /fundDonations?startDate=&endDate=` i stedet for hele kirkens historik, som ellers kunne overskride Lambdas grænse for svarstørrelse. Donationspanelet i medlemsstil (`B1Admin/src/donationComponents/`) genbruger de samme apphelper-komponenter som B1App.

Hånd-overdragelser til regnskab og rapportering sker på klientsiden eller i rapportkøreren og ikke i gatewayen. Batchsidens QuickBooks-eksport bygger en CSV med bogføringspost ud fra batchens `donations` og `fundDonations` (debet Undeposited Funds, en kredit pr. fond). Oversigtssidens visning af Lapsed Givers kører `Api/reports/lapsedGivers.json` gennem den generelle rapportkører, hvor personnavne slås op af `ReportOutput`. Landespecifikke kvitteringsformater (Canada / Australien / New Zealand) er kirkeindstillinger i medlemsskabets nøgle/værdi-lager, og de gengives af `GivingStatementDocument` og dubleres på B1Apps udskriftsside. B1Admins udskriftssider for opgørelser (`PrintDonationPage`, `PrintAllStatementsPage`) sender kirkens indstilling `logoLight` med (via `usePrintLogo` i `B1Admin/src/components/PrintChurchHeader.tsx`), så logoet udskrives øverst på hver opgørelse. De venter også på billedet, før automatisk udskrivning.

### Batchstatus og tilladelsen Enter Donations

Batcher kan lukkes, så en optalt indbetaling forbliver, som den var. `POST /giving/donationbatches/:id/close` og `/:id/reopen` (kun Donations.Edit) er de eneste skrivere af `status`, `closedDate` og `closedBy` (`DonationBatchRepo.setStatus`). Et almindeligt batchgem rører dem aldrig, så bogføring af en batch kan ikke genåbne den. Skriveadgang samles i `Api/src/modules/giving/helpers/BatchAccessHelper.ts`. Donations.Edit må ændre alt. Den snævrere tilladelse Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Enter Donations" i rolleeditoren) må oprette batcher og gemme eller slette donationer og fondsfordelinger, men kun når både donationens nuværende batch og dens målbatch er åbne. Den må aldrig bruges på en gateway-gave (en med en `transactionId`). En blokeret skrivning returnerer `403 { error: "This batch is closed." }`. Læsning af batcher accepterer Donations.ViewSummary eller Donations.Enter, så en tæller kan vælge den batch, de indtaster i. På klientsiden spejler `B1Admin/src/donations/batchAccess.ts` reglerne (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`). `Header` og `SecondaryMenuHelper` viser **Donations > Batches** for alle, der kan se batcher, også uden View Summary.

### Omregning af blandede valutatotaler

Ethvert endepunkt, der returnerer en samlet total over gaver, der muligvis er i blandede valutaer, konverterer til kirkens standardvaluta på serveren. Det gælder giveropgørelsens nøgletal (`GivingKpiCards`), en donationsbatchs total, en fondstotal og B1Apps donationsskærms totaler for år til dato og periode. Summen laves ikke på tværs af forskellige valutaer. `Api/src/shared/helpers/ExchangeRateHelper.ts` henter kurser fra `api.frankfurter.dev` ud fra kirkens valuta og cacher dem i processen i 12 timer. Helperen tilbyder `convertTotals(rows, churchCurrency, rates)`. Rækkerne grupperes på valuta i SQL, så der kun er få grupper, og aldrig en konvertering pr. gave. Hver gruppe konverteres og summeres. Resultatet bærer et `isConverted`-flag, som klienten bruger til at vise noten "Converted at current exchange rates". `GET /donations/exchange-rates` udstiller kurstabellen til klienter, der har brug for den (B1Apps donationsskærm). Kurserne accepteres aldrig fra en forespørgsel. De hentes kun på serveren, så en klient ikke kan påvirke en rapporteret total. Enkelte donationsposter og historiske rapporter i originalvalutaen konverteres aldrig. Kun samlede totaler konverteres.

Stripe-import (`B1Admin/src/donations/StripeImportPage.tsx`) indlæser gaver, der er givet uden for B1. Den kalder `POST /giving/donate/replay-stripe-events` med `dryRun: true` for et eksempel og derefter `dryRun: false` for at importere. Serveren lister Stripe-begivenheder for datointervallet og springer alt over, der allerede er registreret. Først matches på udbyder-id i `eventLogs`, derefter på transaktions-id og til sidst på `DonationRepo.findMatchingDonation` (beløb + dato + person), så en ny kørsel aldrig importerer dobbelt. Abonnementers `charge.succeeded`- og `payment_intent.succeeded`-begivenheder springes over, fordi `invoice.paid` registrerer disse gaver. Nyere Stripe-API-versioner fjerner `PaymentIntent.invoice`, så springningen bygger også på beskrivelsen "Subscription …".

## Webhooks og afstemning

Afregnede betalinger og ændringer i abonnementstatus kommer til `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Behandlingen er bevidst idempotent:

1. **Verificering.** `GatewayService.verifyWebhook` delegerer til udbyderens signaturkontrol. En fejlet signatur giver 401. Begivenheder, der ikke skal behandles, afsluttes med 200.
2. **Dedup af begivenheden.** `EventLogRepo.loadByProviderId` springer en webhook over, hvis den allerede er registreret i `eventLogs`.
3. **Dedup af donationen.** Før noget oprettes, kontrolleres `DonationRepo.loadByTransactionId` mod hvert kandidat-id, som payloaden kan indeholde. Det fanger dubletter af leveringer, flertrins-ACH-begivenheder (afventende → afregnet) og tilfældet, hvor `/donate/charge` allerede har registreret gaven optimistisk.
4. **Anvendelse.** Udbyderens `classifyWebhookEvent(eventType)` siger, hvad begivenheden betyder (`donation` afventende/gennemført, `cancel-subscription` eller `ignore`). Gennemførte betalinger opretter en `complete`-donation eller opgraderer en eksisterende `pending`- eller `failed`-donation. ACH-lignende begivenheder bliver `pending`, indtil de afregnes. En fejlet abonnementsfaktura (Stripe `invoice.payment_failed`) opretter en `failed`-donation med fakturaens id som nøgle. Annulleringsbegivenheder sletter den lokale `subscriptions`-række. Controlleren undersøger aldrig udbyderspecifikke begivenhedsnavne.

### Fejlede gentagne gaver og rykkerprocessen

En `failed`-donation er enheden for genopretning. `GET /giving/donations/failed` lister dem med den nyeste fejlbesked fra gatewayen i `eventLogs` og et `canRetry`-flag fra gatewayens capabilities. `POST /giving/donate/retry/:donationId` kalder udbyderens `retryFailedPayment` (Stripe betaler den åbne faktura), og den resulterende webhook opgraderer rækken til `complete` via den normale dedup-vej. Rykkerbreve sendes til donoren fra webhook-handleren på dag 0 og derefter fra `DunningHelper.run` i midnatstimeren (koblet til både `lambda/timer-handler.ts` og `RailwayCron.ts`) på dag 3 og 7. Hver udsendelse registreres i `eventLogs` som `provider: "dunning"` og `providerId: "<donationId>:<day>"`, så en genkørsel aldrig sender dobbelt. Når Stripe giver op og annullerer abonnementet (`customer.subscription.deleted` med `cancellation_details.reason: "payment_failed"`), sender `DunningHelper.notifyCanceled` donoren én e-mail (`providerId: "<subscriptionId>:canceled"`). Annulleringer, som donoren eller en administrator selv har startet, forbliver stille. Stripe tilføjer aldrig begivenheder til et eksisterende endepunkt. Efter ændring af `StripeHelper.webhookEvents` skal du enten gemme gatewayen igen eller køre `tools/manual/stripe-webhook-events.ts` mod produktion (tørkørsel som standard, `--apply` for at skrive).

Udbydere med `logsDonationsImmediately` (PayPal, Kingdom Funding og Paystack) får deres betalinger logget ud fra svaret fra `/charge`, så der ikke kræves en webhook-runde i det normale tilfælde. Stripe bygger i stedet på `payment_intent.succeeded`/`invoice.paid` og ACH's `payment_intent.processing`. Gebyrhåndtering (`POST /giving/donate/fee`, gatewayflaget `payFees` og hver udbyders `calculateFees`) beregner "dæk gebyrerne"-tillægget på donorens side. B1 tager ingen platformsafgift, så der tilføjes aldrig et applikationsgebyr.

:::info
Betalings- og webhook-stien skriver til de samme rækker i `donations` og `fundDonations`. `transactionId` er nøglen, der forhindrer, at en optimistisk betalingsregistrering og dens senere webhook giver to donationer for samme gave.
:::

## Relaterede sider

- [Giving Endpoints](../api/endpoints/giving.md) — den fulde REST-overflade for donationer, fonde, batcher, gateways, abonnementer, betalingsmetoder og webhooks
- [AppHelper](../shared-libraries/app-helper.md) — npm-pakken, der leverer betalingsudbyderregistret og donationskomponenterne
- [Module Structure](../api/module-structure.md) — hvordan GivingApi-modulet er organiseret på serversiden
