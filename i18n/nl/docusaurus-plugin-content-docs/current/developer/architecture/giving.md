---
title: "Giving Architecture"
description: "Ontwikkelaarsgids voor geven in ChurchApps: hoe B1 Admin en B1.church donaties sturen via de gateways van Stripe, PayPal, Kingdom Funding of Paystack."
---

# Giving Architecture

<div class="article-intro">

ChurchApps voert donaties uit via een gateway-rail-model: de kerk behoudt haar eigen Stripe- (of PayPal-, Kingdom Funding- of Paystack-)account, en B1 bevindt zich nooit in het betaalpad als platformverwerker. Kaartgegevens worden in de browser getokeniseerd en bereiken nooit een ChurchApps-server. Deze pagina beschrijft de volledige stack: het clientzijde providerregister in `@churchapps/apphelper`, de GivingApi-gatewayabstractie, het donatiegegevensmodel en hoe gateway-webhooks terugkoppelen naar de database.

</div>

## Overzicht

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Betaalgateway                        │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ kaartinvoer in de │  Stripe Elements · KF-tokenizer ·     │
│  │ Betaalproviderregister│──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (kaart bereikt nooit een B1-server)  │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ ondertekende webhook
┌─────────────────────────────────────────────┐ (geheime sleutel)│             │ gebeurtenis
│  GivingApi — /giving-module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  donaties + fundDonations opslaan — ontdubbeling via eventLogs / transactionId
                      ▼
                MySQL (giving-schema)
```

Drie principes gelden voor de hele stack:

1. **De gateway bewaart de kaart.** Het invoerwidget van elke provider tokeniseert in de browser; de API ontvangt uitsluitend een token, nonce of order-id.
2. **Eén abstractie, meerdere providers.** De browser haalt een `PaymentProvider` op uit een register; de server haalt een `IGatewayProvider` op uit een factory. Beide gebruiken dezelfde genormaliseerde providernaam die is opgeslagen in het gatewayrecord.
3. **Webhooks zijn de bron van waarheid voor afwikkeling.** Een charge-respons wordt optimistisch vastgelegd, maar de ondertekende webhook van de gateway is wat de voltooide donatie bevestigt (of aanmaakt), met idempotentiebeveiligingen aan beide kanten.

## Clientzijde: het betaalproviderregister (`@churchapps/apphelper`)

Het register staat in `Packages/apphelper/src/donations/providers/`, waarbij de widgets en hulpfuncties van elke provider in een eigen submap staan (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Niets buiten `providers/` vertakt op een providernaam. Een `PaymentProvider` (zie `providers/types.ts`) bundelt alles wat een hostapp nodig heeft voor één gateway: een `descriptor` (beheerderslabels, ondersteunde valuta's, kostenvelden, standaardkostenpercentages, dashboard- en aanmeldings-URL's), een set `capabilities`-vlaggen (opgeslagen kaarten, ACH, terugkerend, inline invoer van nieuwe kaarten, impliciet opslaan bij tokenisatie), de React-widgets voor invoer door leden (`MemberWrapper`/`MemberEntry`), gastgeven (`GuestForm`), bewerken van opgeslagen betaalmethoden (`MethodEditForm`) en betalingen via formuliervragen (`FormPayment`), plus `buildChargeRequest(ctx, token)` — de enige plek waar de vorm van de chargepayload per provider verschilt. De `MemberWrapper` van elke provider laadt zijn eigen SDK op basis van de publieke sleutel in het gatewayrecord, zodat hostapps nooit een gateway-SDK importeren (B1App en B1Admin hebben geen `@stripe/*`-afhankelijkheid). `pickDefaultGateway(gateways, capability?)` bepaalt centraal welke van de gateways van een kerk een oppervlak moet gebruiken.

`providers/registry.ts` bevat de ingebouwde providers. Ze worden **bij waarde** gerefereerd, niet via een registratie als neveneffect van een module, zodat de tree-shaking van een bundler de registratie nooit kan laten vallen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Functie | Doel |
|---------|------|
| `getPaymentProvider(name)` | Opzoeken op genormaliseerde naam; valt terug op Stripe, zodat een verkeerd geconfigureerde provider het donorformulier nooit hard laat crashen |
| `registerPaymentProvider(p)` | Een extra provider tijdens runtime registreren (voor de aangepaste gateway van een hostapp) |
| `listPaymentProviders()` | Ingebouwde en aangepaste providers opsommen — gebruikt om de gatewaykeuzelijst van de beheerder op te bouwen |
| `hasPaymentProvider(name)` | Controle op lidmaatschap |

**Ingebouwde clientproviders: Stripe, PayPal, Kingdom Funding, Paystack.** B1App en B1Admin *lezen* het register alleen (`getPaymentProvider`, `listPaymentProviders`); geen van beide roept `registerPaymentProvider` aan — registratie blijft binnen apphelper.

Elke provider tokeniseert op een andere manier, maar alle houden de kaart buiten B1:

| Provider | Invoerwidget | Token naar API |
|----------|--------------|----------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; het gastformulier koppelt ook een `ExpressCheckoutElement` (Apple Pay / Google Pay, eenmalige giften) waarvan `onConfirm` resulteert in dezelfde `pm_…`-id | betaalmethode-id (`pm_…`); bank via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` voor USD-gateways, Canadese PAD `acss_debit` (hosted mandaatmodal, mandaat `default_for` facturen/abonnementen, eenmalige charges geven het mandaat-id mee) voor CAD-gateways |
| Kingdom Funding | Gehoste tokenizer-formulier gekoppeld aan de publieke sleutel van de gateway | eenmalige nonce |
| PayPal | PayPal Hosted Fields (kaart, terugkerend) plus PayPal Smart Buttons met Venmo-financiering (eenmalig); beide delen één SDK-load en de serverorder die wordt opgebouwd via `/donate/client-token` + `/donate/create-order` | vastgelegd order-id |
| Paystack | Paystack Inline-popup (`js.paystack.co/v2/inline.js`) — de popup zelf verwerkt de betaling (kaart, mobiel geld, banküberschrijving, USSD) | betaalde transactiereferentie; opgeslagen betaalmethoden zijn Paystack `AUTH_…`-autorisatiecodes |

De `finalizeResult` van Stripe voert 3-D Secure / SCA uit in de browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) voordat de donatie als voltooid wordt beschouwd; het gedeelde formulier roept gewoon `provider.finalizeResult(result)` aan zonder te weten wat er gebeurt.

## Serverzijde: de gatewayabstractie (GivingApi)

De `/giving`-module (`Api/src/modules/giving`) biedt het REST-oppervlak; de gatewaykoppeling zit in `Api/src/shared/helpers`. `DonateController` praat nooit rechtstreeks met een gateway-SDK — hij gaat via `GatewayService`, die de juiste `IGatewayProvider` ophaalt uit `GatewayFactory` en hem een ontsleutelde `GatewayConfig` overhandigt.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() ontsleutelt privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) is het contract dat elke gateway implementeert — webhooklevenscyclus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betaling (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), kosten (`calculateFees`), afhandeling van opgeslagen betaalmethoden (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) en optionele extra's (klanten, orders, SetupIntents, herhalen van gebeurtenissen, `retryFailedPayment` voor een mislukte abonnementsfactuur, `registerPaymentMethodDomain` voor Apple Pay-domeinverificatie). Een provider die een optionele hook weglaat, wordt gemeld als niet-ondersteund voor die actie en de UI verbergt het bedieningselement. Elke providerklasse declareert zijn eigen `capabilities`-matrix (ondersteunde valuta's, ACH, terugbetalingen, abonnementsvereisten, transactielimieten) — `GatewayService.getProviderCapabilities(provider)` leest die alleen uit — en vlaggen zoals `logsDonationsImmediately` sturen het controllergedrag aan zonder providernaam-voorwaarden in de controllers.

**Serverproviders geregistreerd in `GatewayFactory`:**

| Provider | Beschikbaarheid |
|----------|-----------------|
| Stripe | Altijd actief |
| PayPal | Altijd actief |
| Kingdom Funding | Altijd actief |
| Paystack | Altijd actief (handelaren in Nigeria, Ghana, Zuid-Afrika, Kenia, Ivoorkust; valuta's NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Optioneel via de omgevingsvlag `ENABLE_SQUARE` |
| ePayMints | Optioneel via de omgevingsvlag `ENABLE_EPAYMINTS` |

Paystack verschilt van de andere doordat het geld al beweegt voordat GivingApi erbij betrokken is: de popup belast de donor, `processCharge` is een `GET /transaction/verify/:reference` waarvan het betaalde bedrag en de valuta moeten overeenkomen met de donatie die wordt geregistreerd (een referentie die al is opgeslagen, wordt nooit dubbel vastgelegd), en de eerste gift van een terugkerend schema wordt vastgelegd vanuit `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` met `start_date` één interval verder). Webhooks worden ondertekend met de geheime sleutel zelf (`x-paystack-signature`, HMAC-SHA512 over de ruwe body) en Paystack heeft geen API voor webhookbeheer, dus het beheerscherm toont de URL die de kerk in haar dashboard moet plakken. `charge.success`-gebeurtenissen bij verlengingen bevatten geen fondsenverdeling; de provider haalt die op uit de lokale `subscriptions`/`subscriptionFunds`-rijen van de donor. Alleen kaartautorisaties zijn `reusable` — mobiel-geldgiften zijn uitsluitend eenmalig, dus `createSubscription` weigert ze. De demodata voegt een tweede kerk toe (Accra Community Church, `CHU00000002`) op een Paystack-testmodusgateway in GHS, zodat de Paystack Playwright-suite naast die van Grace's Stripe kan draaien.

Aangepaste providers kunnen tijdens runtime worden geregistreerd wanneer `ENABLE_CUSTOM_GATEWAY_PROVIDERS` is ingesteld; `AbstractExperimentalGatewayProvider` is de basisklasse voor die providers. Providernamen worden hoofdletterongevoelig vergeleken.

### Gatewayconfiguratie en geheimen

Een beheerder slaat gatewaygegevens op via `POST /giving/gateways` (`GatewayController`). Bij het opslaan versleutelt de controller de privé- en webhooksleutels met `EncryptionHelper` voordat ze worden opgeslagen, en verwijdert vervolgens — op elke niet-localhost-host — de bestaande webhook van de kerk en richt een nieuwe in die wijst naar `/giving/donate/webhook/{provider}?churchId=…`. Een kerk houdt één rij per provider aan: het opslaan van een gateway vervangt alleen de bestaande rij voor diezelfde provider. Openbare leesacties (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) geven alleen publieke sleutels terug.

## Datamodel

Het giving-schema (`Api/src/modules/giving/db/DatabaseTypes.ts`, modellen in `models/`) is een MySQL-schema dat via Kysely wordt benaderd:

| Tabel | Rol |
|-------|-----|
| `gateways` | Providerconfiguratie per kerk: `provider`, `publicKey`, versleutelde `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giving-bestemmingen (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Groepering voor invoer/rapportage (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Eén gift: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; overzichten, totalen, dashboards en donatierapporten tellen alleen `complete` of null), `transactionId` |
| `fundDonations` | Verdeling van een donatie over één of meer fondsen (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Terugkerende gift; `id` is het abonnements-id van de gateway, gekoppeld aan `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondsenverdeling voor een terugkerende gift |
| `customers` | Koppelt een `personId` aan het klant-id van de gateway, per `provider` |
| `gatewayPaymentMethods` | Opgeslagen kaarten/banken: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Audittrail van webhooks/gebeurtenissen en ontdubbelingssleutel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Toezeggingscampagnes gekoppeld aan een fonds, en het toegezegde bedrag per persoon |

Een donatie wordt via `fundDonations` over fondsen verdeeld — de donatie bevat het totaal, elke `fundDonation` bevat een deel. `donations.currency` en `gateways.currency` bevatten de ISO-valuta; elke provider adverteert zijn `supportedCurrencies`, en bedragen worden opgemaakt met `CurrencyHelper.formatCurrencyWithLocale`.

## Stroomafwaartse processen

### Lid eenmalig en terugkerend (B1App)

Het geauthenticeerde donatiescherm (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) combineert drie apphelper-componenten: `MultiGatewayDonationForm`, `PaymentMethods` en `RecurringDonations`. B1App verzorgt het omliggende laden van gegevens — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — en geeft de gatewaylijst door; de gekozen provider laadt zijn eigen SDK op basis van de publieke sleutel van de gateway. De betaling zelf gebeurt binnen apphelper: de gekozen provider tokeniseert de (nieuwe of opgeslagen) betaalmethode en stuurt daarna een POST naar `/giving/donate/charge` voor een eenmalige gift of `/giving/donate/subscribe` voor een terugkerende. Beide eindpunten koppelen een ingelogde donor aan diens eigen `personId` (alleen houders van `donations.edit` mogen aan iemand anders koppelen) en weigeren fondsenverdelingen die meer opleveren dan het belaste bedrag. Terugkerende giften maken een `subscriptions`-rij plus `subscriptionFunds` aan en geven het schema door aan de gateway (Stripe Subscriptions, PayPal Billing Plans of een KF-terugkerend schema).

### Gast- / anoniem geven

De openbare donatiepagina (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) en het paneel "geef nu" renderen `NonAuthDonationWrapper` uit `@churchapps/apphelper/website`, dat reCAPTCHA en de Elements-context van de gateway injecteert rond het `GuestForm` van de provider. Gasten krijgen geen login, geen opgeslagen betaalmethoden en geen geschiedenis. Het proces haalt `GET /giving/funds/churchId/:id` en `GET /giving/donate/gateways/:churchId` op (alleen publieke sleutels), verifieert de bezoeker met `POST /giving/donate/captcha-verify`, tokeniseert in de browser en stuurt een POST naar `/giving/donate/charge` (of `/subscribe`). De verify-aanroep geeft een 10 minuten geldige, HMAC-ondertekende `captchaPass` terug (`Api/src/modules/giving/helpers/CaptchaPass.ts`) die het formulier meestuurt bij elke geldaanroep voor gasten; met `CAPTCHA_ENFORCE=true` weigert de Api aanroepen van gasten voor `create-order`, `charge`, `subscribe`, `addcard` en `ach-setup-intent-anon` zonder een geldige pass voor die kerk. Betaalde evenementinschrijvingen voor gasten (`POST /content/registrations/register`) controleren dezelfde pass direct vóór hun charge; zie [Event Registrations](./registrations.md#payment-flow). ACH voor gasten gebruikt het anonieme `POST /giving/paymentmethods/ach-setup-intent-anon`, dat alleen directe verificatie (Financial Connections) toestaat: een controle met microstortingen duurt dagen en is pas klaar nadat de gastpagina al is gesloten, waardoor de gift nooit zou kunnen worden voltooid. Het formulier weigert een niet-geverifieerde SetupIntent te belasten en verwijst de donor naar kaart of een bankinstelling via een ingelogd account.

Drie opties voor het gastformulier gebruiken dezelfde charge-aanroep. `?fundId=` en `?amount=` in de donatie-URL selecteren vooraf de fondsenverdeling (gelezen door het gastformulier van elke provider bij het laden en doorgestuurd via de normale handler voor fondswijzigingen, zodat totalen en kosten worden bijgewerkt). `anonymous: true` zorgt ervoor dat `DonateController.charge` elke persoon die de client heeft meegestuurd negeert en de gift vastlegt met `personId = null`; het gastformulier slaat `/people/loadOrCreate` en de klant-/kluisstap over, en de drie providers met directe registratie stoppen met het afleiden van een persoon uit de gatewayklant. Apple Pay vereist dat het domein van de pagina bij Stripe is geregistreerd, dus een Stripe-gastformulier stuurt eenmaal per sessie een POST naar het openbare, snelheidsbegrensde `POST /giving/donate/register-domain`, dat alleen een domein accepteert dat bij de kerk hoort (`<subDomain>.b1.church`, een rij in de domeinentabel van de contentmodule, of een lokale host) voordat het Stripe's payment-method-domains-API aanroept.

### Beheerder registreert en Stripe-import (B1Admin)

Het donatiegedeelte van B1Admin (`B1Admin/src/donations/`) is waar financiële teams werken. Batch-invoer (`components/BulkDonationEntry.tsx`) registreert contante/cheque-/in-natura-giften door een POST naar `/giving/donations` en daarna naar `/giving/funddonations` te sturen — er is geen gateway bij betrokken. Het **Gift registreren**-paneel op het persoonsrecord (`components/LogGiftDialog.tsx`) doet hetzelfde voor één gift: het zoekt eerst de batch waarvan `batchDate` overeenkomt met de datum van de gift, of maakt er een aan met die datum als naam (`POST /giving/donationbatches`), en verwijdert de donatie/nieuwe batch weer als een latere stap mislukt. Fondsen, batches, campagnes en overzichten koppelen elk aan hun `/giving/*` CRUD-routes; de pagina's met giftoverzichten (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) vragen één kalenderjaar op met `GET /donations?startDate=&endDate=` en `GET /fundDonations?startDate=&endDate=` in plaats van de volledige geschiedenis van de kerk, die de responsegrootte-limiet van Lambda zou kunnen overschrijden. Het donatiepaneel in de ledenstijl (`B1Admin/src/donationComponents/`) hergebruikt dezelfde apphelper-componenten als B1App.

Rapportage en overdracht naar de boekhouding gebeuren aan de clientzijde of via de rapportagerunner, niet via de gateway: de QuickBooks-export op de batchpagina bouwt een journaalboeking-CSV op uit de `donations` + `fundDonations` van de batch (debit Undeposited Funds, één credit per fonds), de Samenvattingspagina's weergave Lapsed Givers draait `Api/reports/lapsedGivers.json` door de generieke rapportagerunner met personen namen opgelost door `ReportOutput`, en landspecifieke ontvangstformaten (Canada / Australia / New Zealand) zijn kerkinstellingen in de key/value-opslag van het ledenbeheer, weergegeven door `GivingStatementDocument` en gedupliceerd op de afdrukpagina van B1App. De afdrukpagina's voor overzichten van B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) geven de instelling `logoLight` van de kerk door (via `usePrintLogo` in `B1Admin/src/components/PrintChurchHeader.tsx`), zodat het logo bovenaan elk overzicht wordt afgedrukt, en wachten op de afbeelding voordat ze automatisch afdrukken.

### Batchstatus en het recht Donaties invoeren

Batches kunnen worden gesloten, zodat een geteld bankafschrift blijft zoals het was. `POST /giving/donationbatches/:id/close` en `/:id/reopen` (alleen Donations.Edit) zijn de enige schrijvers van `status`, `closedDate` en `closedBy` (`DonationBatchRepo.setStatus`); een gewone batch-opslag raakt deze nooit aan, dus het boeken van een batch kan hem niet heropenen. Schrijftoegang is gecentraliseerd in `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit mag alles wijzigen, terwijl het smallere recht Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Enter Donations" in de rolbewerker) alleen batches mag aanmaken en donaties en fondsverdelingen mag opslaan of verwijderen zolang zowel de huidige batch van de donatie als de doelbatch open zijn, en nooit voor een gateway-gift (een met een `transactionId`). Een geblokkeerde schrijfactie geeft `403 { error: "This batch is closed." }` terug. Het lezen van batches accepteert Donations.ViewSummary of Donations.Enter, zodat een teller de batch kan kiezen waarin hij invoert. Aan de clientzijde spiegelt `B1Admin/src/donations/batchAccess.ts` deze regels (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), en tonen `Header` / `SecondaryMenuHelper` **Donaties > Batches** aan iedereen die batches kan zien, ook zonder View Summary.

### Gemengde valutatotalen omrekenen

Elk eindpunt dat één gecombineerd totaal teruggeeft over mogelijk gemengde valuta's — de KPI's van het giving-overzicht (`GivingKpiCards`), een batchtotaal van donaties, een fondstotaal en de jaar-tot-datum-/periodetotalen op het donatiescherm van B1App — rekent aan de serverzijde om naar de standaardvaluta van de kerk in plaats van ongelijke valuta's op te tellen. `Api/src/shared/helpers/ExchangeRateHelper.ts` haalt koersen op van `api.frankfurter.dev` met de kerkvaluta als sleutel, bewaart ze 12 uur in het proces (in-process cache) en biedt `convertTotals(rows, churchCurrency, rates)`: rijen worden al in SQL per valuta gegroepeerd (een handvol groepen, nooit een omrekening per gift), elke groep wordt omgerekend en opgeteld, en het resultaat draagt een vlag `isConverted` waarmee de client de melding "Omgerekend tegen actuele wisselkoersen" toont. `GET /donations/exchange-rates` maakt de koerstabel beschikbaar voor clients die die nodig hebben (het donatiescherm van B1App); de koersen zelf worden nooit uit een verzoek aangenomen, maar uitsluitend aan de serverzijde opgehaald, zodat een client een gerapporteerd totaal niet kan beïnvloeden. Afzonderlijke donatieregistraties en historische rapporten in de oorspronkelijke valuta worden nooit omgerekend — alleen gecombineerde totalen.

Stripe-import (`B1Admin/src/donations/StripeImportPage.tsx`) vult giften aan die buiten B1 zijn gedaan: het roept `POST /giving/donate/replay-stripe-events` aan met `dryRun: true` voor een voorbeeld, en daarna met `dryRun: false` om te importeren. De server somt Stripe-gebeurtenissen op voor het datumbereik en slaat alles over dat al is vastgelegd — eerst herkend via de provider-id in `eventLogs`, daarna via het transaction-id, en daarna via `DonationRepo.findMatchingDonation` (bedrag + datum + persoon), zodat een herhaling nooit dubbel importeert. Gebeurtenissen `charge.succeeded` / `payment_intent.succeeded` van abonnementen worden overgeslagen omdat `invoice.paid` die giften al registreert; nieuwere Stripe-API-versies laten `PaymentIntent.invoice` weg, dus de overslag let ook op de beschrijving "Subscription …".

## Webhooks en afstemming

Afgewikkelde betalingen en wijzigingen in de status van abonnementen komen binnen op `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). De verwerking is bewust idempotent:

1. **Verifiëren** — `GatewayService.verifyWebhook` delegeert naar de handtekeningcontrole van de provider; een mislukte handtekening geeft 401. Gebeurtenissen die geen verwerking nodig hebben, eindigen met 200.
2. **De gebeurtenis ontdubbelen** — `EventLogRepo.loadByProviderId` slaat een webhook over die al in `eventLogs` is vastgelegd.
3. **De donatie ontdubbelen** — voordat er iets wordt aangemaakt, wordt `DonationRepo.loadByTransactionId` gecontroleerd tegen elk kandidaat-id dat de payload kan bevatten. Dit vangt dubbele leveringen op, ACH-gebeurtenissen in meerdere fasen (in behandeling → afgewikkeld) en het geval dat `/donate/charge` de gift al optimistisch heeft vastgelegd.
4. **Toepassen** — `classifyWebhookEvent(eventType)` van de provider zegt wat de gebeurtenis betekent (`donation` in behandeling/voltooid, `cancel-subscription`, of `ignore`); voltooide betalingen maken een `complete`-donatie aan (of promoveren een bestaande `pending`- of `failed`-donatie), ACH-achtige gebeurtenissen komen als `pending` binnen tot afwikkeling, een mislukte abonnementsfactuur (Stripe `invoice.payment_failed`) maakt een `failed`-donatie aan die is gekoppeld aan het factuur-id, en annuleringsgebeurtenissen verwijderen de lokale `subscriptions`-rij. De controller inspecteert nooit providerspecifieke gebeurtenisnamen.

### Mislukte terugkerende giften en dunning

Een `failed`-donatie is de werkeenheid voor herstel. `GET /giving/donations/failed` toont ze met het nieuwste foutbericht van de gateway uit `eventLogs` en een `canRetry`-vlag uit de capabilities van de gateway; `POST /giving/donate/retry/:donationId` roept de `retryFailedPayment` van de provider aan (Stripe betaalt de openstaande factuur), en de resulterende webhook promoveert de rij naar `complete` via het normale ontdubbelingspad. Dunning-e-mails gaan vanaf de webhook-handler naar de donor op dag 0, en daarna vanuit `DunningHelper.run` in de middernachttimer (aangesloten in zowel `lambda/timer-handler.ts` als `RailwayCron.ts`) op dag 3 en 7; elke verzending wordt in `eventLogs` vastgelegd als `provider: "dunning"`, `providerId: "<donationId>:<day>"`, zodat een herhaling nooit dubbel mailt. Wanneer Stripe het opgeeft en het abonnement annuleert (`customer.subscription.deleted` met `cancellation_details.reason: "payment_failed"`), mailt `DunningHelper.notifyCanceled` de donor één keer (`providerId: "<subscriptionId>:canceled"`); annuleringen door de donor of beheerder blijven stil. Stripe voegt nooit gebeurtenissen toe aan een bestaand eindpunt: na het wijzigen van `StripeHelper.webhookEvents` moet je ofwel de gateway opnieuw opslaan, ofwel `tools/manual/stripe-webhook-events.ts` uitvoeren (standaard een proefrun, `--apply` om te schrijven) tegen productie.

Providers met `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) krijgen hun charges vastgelegd vanuit de `/charge`-respons (geen webhook-ronde nodig voor het gelukkige pad), terwijl Stripe vertrouwt op `payment_intent.succeeded` / `invoice.paid` en ACH `payment_intent.processing`. Kostenafhandeling (`POST /giving/donate/fee`, de vlag `payFees` van de gateway, en de `calculateFees` van elke provider) berekent de "dekking van de kosten"-opslag aan de donorzijde — B1 neemt geen platformvergoeding, dus er wordt nooit een applicatiekost toegevoegd.

:::info
Het charge- en het webhookpad schrijven dezelfde `donations`- / `fundDonations`-rijen. Het `transactionId` is de koppelsleutel die voorkomt dat een optimistische charge-registratie en de latere webhook twee donaties voor één gift opleveren.
:::

## Gerelateerde pagina's

- [Giving Endpoints](../api/endpoints/giving.md) — volledig REST-oppervlak voor donaties, fondsen, batches, gateways, abonnementen, betaalmethoden en webhooks
- [AppHelper](../shared-libraries/app-helper.md) — het npm-pakket dat het betaalproviderregister en de donatiecomponenten levert
- [Module Structure](../api/module-structure.md) — hoe de GivingApi-module server-side is georganiseerd
