---
title: "Arquitectura de donaciones"
---

Ahora no estoy seguro de que deba ser "Arquitectura de donaciones" ya que el idioma objetivo es sueco. Corrijo esto: el idioma es **sueco**.

---
title: "Givandets arkitektur"
---

# Givandets arkitektur

<div class="article-intro">

ChurchApps kör donationer på en gateway-modell: kyrkan behåller sitt eget Stripe-konto (eller PayPal, Kingdom Funding eller Paystack), och B1 finns aldrig i betalningsflödet som plattformsprocessor. Kortuppgifter tokeniseras i webbläsaren och når aldrig någon ChurchApps-server. Den här sidan beskriver hela stacken: det klientsidiga leverantörsregistret i `@churchapps/apphelper`, gateway-abstraktionen i GivingApi, datamodellen för donationer och hur gateway-webhooks stämmer av mot databasen.

</div>

## Översikt

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Betalningsgateway                    │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ kortinmatning i   │  Stripe Elements · KF-tokenizer ·     │
│  │ Register för          │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ betalningsleverantörer│  │◀── token / nonce ─│  (kortet når aldrig en B1-server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signerad webhook
┌─────────────────────────────────────────────┐ (hemlig nyckel)│                │ händelse
│  GivingApi — /giving-modulen                │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  spara donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving-schema)
```

Tre principer gäller genom hela stacken:

1. **Gatewayn håller kortet.** Varje leverantörs inmatningskomponent tokeniserar i webbläsaren; API:t får bara en token, en nonce eller ett order-id.
2. **En abstraktion, många leverantörer.** Webbläsaren hämtar en `PaymentProvider` från ett register; servern hämtar en `IGatewayProvider` från en fabrik. Båda använder samma normaliserade leverantörsnamn som lagras på gateway-posten.
3. **Webhooks är källan till sanningen för avräkning.** Ett svar från `/charge` registreras optimistiskt, men det är gatewayns signerade webhook som bekräftar (eller skapar) den genomförda donationen. Båda sidor har skydd mot dubbelbearbetning.

## Klientsidan: registret för betalningsleverantörer (`@churchapps/apphelper`)

Registret finns i `Packages/apphelper/src/donations/providers/`. Varje leverantörs komponenter och hjälpfunktioner ligger i en egen undermapp (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Ingenting utanför `providers/` förgrenar sig på leverantörsnamn. En `PaymentProvider` (se `providers/types.ts`) samlar allt en värdapp behöver för en gateway: en `descriptor` (etiketter i admin, valutor som stöds, avgiftsfält, standardavgifter, länkar till instrumentpanel och registrering), en uppsättning `capabilities` (sparade kort, ACH, återkommande, inline-inmatning av nytt kort, implicit spara vid tokenisering), React-komponenterna för medlemsinmatning (`MemberWrapper`/`MemberEntry`), gåvor från gäster (`GuestForm`), redigering av sparade betalningsmetoder (`MethodEditForm`) och betalningar i formulärfrågor (`FormPayment`). Dessutom finns `buildChargeRequest(ctx, token)`, det enda stället där formatet på betalningsbegäran skiljer sig mellan leverantörer. Varje leverantörs `MemberWrapper` laddar sitt eget SDK utifrån gateway-postens publika nyckel, så värdapparna importerar aldrig något gateway-SDK (B1App och B1Admin har inget beroende på `@stripe/*`). `pickDefaultGateway(gateways, capability?)` avgör centralt vilken av kyrkans gateways en yta ska använda.

`providers/registry.ts` innehåller de inbyggda leverantörerna. De **refereras via värde**, inte registreras via en sidoeffekt vid modulladdning, så att tree-shaking i bundlern aldrig kan ta bort registreringen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funktion | Syfte |
|----------|-------|
| `getPaymentProvider(name)` | Hämtar efter normaliserat namn; faller tillbaka till Stripe så att en felkonfigurerad leverantör aldrig kraschar gåveformuläret |
| `registerPaymentProvider(p)` | Registrerar en extra leverantör vid körning (för en värdapps egen gateway) |
| `listPaymentProviders()` | Listar inbyggda + egna leverantörer — används för att bygga gateway-listan i admin |
| `hasPaymentProvider(name)` | Kontrollerar om en leverantör finns |

**Inbyggda klientleverantörer: Stripe, PayPal, Kingdom Funding, Paystack.** B1App och B1Admin *läser* bara registret (`getPaymentProvider`, `listPaymentProviders`); ingen av dem anropar `registerPaymentProvider`. Registreringen stannar inne i apphelper.

Varje leverantör tokeniserar olika, men alla håller kortet utanför B1:

| Leverantör | Inmatningskomponent | Token som returneras till API:t |
|------------|---------------------|---------------------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`. Gästformuläret monterar dessutom en `ExpressCheckoutElement` (Apple Pay / Google Pay, engångsgåvor) vars `onConfirm` ger samma `pm_…`-id | Betalningsmetodens id (`pm_…`). Bank via `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` för USD-gateways, kanadensisk PAD `acss_debit` (hosted mandate-modal, mandatet har `default_for` för fakturor/prenumerationer, engångsbetalningar skickar med mandat-id) för CAD-gateways |
| Kingdom Funding | Hostad tokeniserings-formulär, nycklad på gatewayens publika nyckel | Engångs-nonce |
| PayPal | PayPal Hosted Fields (kort, återkommande) plus PayPal Smart Buttons med Venmo-finansiering (engångsgåvor). Båda delar en gemensam SDK-laddning, och serverorder skapas via `/donate/client-token` + `/donate/create-order` | Fångat order-id |
| Paystack | Paystack Inline-popup (`js.paystack.co/v2/inline.js`). Själva popupen tar betalningen (kort, mobilpengar, banköverföring, USSD) | Betald transaktionsreferens. Sparade metoder är Paystack-auktoriseringskoder `AUTH_…` |

Stripes `finalizeResult` kör 3-D Secure / SCA i webbläsaren (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) innan donationen anses slutförd. Det gemensamma formuläret anropar bara `provider.finalizeResult(result)` utan att veta vad som sker.

## Serversidan: gateway-abstraktionen (GivingApi)

`/giving`-modulen (`Api/src/modules/giving`) exponerar REST-ytan. Gateway-kopplingen finns i `Api/src/shared/helpers`. `DonateController` pratar aldrig direkt med något gateway-SDK. Den går via `GatewayService`, som hämtar rätt `IGatewayProvider` från `GatewayFactory` och ger den en avkrypterad `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() avkrypterar privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) är kontraktet som varje gateway implementerar. Det omfattar webhook-livscykeln (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betalningar (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), avgifter (`calculateFees`), hantering av sparade metoder (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) samt valfria tillägg (kunder, order, SetupIntents, återspelning av händelser, `retryFailedPayment` för en misslyckad prenumerationsfaktura och `registerPaymentMethodDomain` för domänverifiering till Apple Pay). En leverantör som utelämnar en valfri hook rapporteras som ej stödd för den åtgärden, och gränssnittet döljer kontrollen. Varje leverantörsklass deklarerar sin egen matris `capabilities` (valutor som stöds, ACH, återbetalningar, krav för prenumerationer, transaktionsgränser). `GatewayService.getProviderCapabilities(provider)` läser bara den. Flaggor som `logsDonationsImmediately` styr beteendet i kontrollerna utan några villkor på leverantörsnamn i kontrollerna.

**Serverleverantörer som registreras i `GatewayFactory`:**

| Leverantör | Tillgänglighet |
|------------|----------------|
| Stripe | Alltid på |
| PayPal | Alltid på |
| Kingdom Funding | Alltid på |
| Paystack | Alltid på (handlare i Nigeria, Ghana, Sydafrika, Kenya, Elfenbenskusten; valutor NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Aktiveras via miljöflaggan `ENABLE_SQUARE` |
| ePayMints | Aktiveras via miljöflaggan `ENABLE_EPAYMINTS` |

Paystack skiljer sig från de övriga eftersom pengarna flyttas innan GivingApi är inblandat. Popupen debiterar givaren, `processCharge` är ett `GET /transaction/verify/:reference` vars betalda belopp och valuta måste stämma med donationen som registreras (en referens som redan finns sparad loggas aldrig två gånger). Första gåvan i ett återkommande schema loggas från `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` med `start_date` ett intervall framåt). Webhooks signeras med den hemliga nyckeln själv (`x-paystack-signature`, HMAC-SHA512 över den råa kroppen). Paystack har inget API för att hantera webhooks, så admin-skärmen visar URL:en som kyrkan klistrar in i sin instrumentpanel. Förnyelse-händelser `charge.success` innehåller ingen fondfördelning. Leverantören hämtar den från givarens lokala `subscriptions`/`subscriptionFunds`-rader. Bara kortauktoriseringar är `reusable`. Mobilpengargåvor är enbart engångsgåvor, så `createSubscription` avvisar dem. Demodatan lägger till en andra kyrka (Accra Community Church, `CHU00000002`) på en GHS-testgateway i Paystack, så att Paystack-testsviten i Playwright körs bredvid Graces Stripe-svit.

Egna leverantörer kan registreras vid körning när `ENABLE_CUSTOM_GATEWAY_PROVIDERS` är satt. `AbstractExperimentalGatewayProvider` är basklassen för dem. Leverantörsnamn matchas utan hänsyn till versaler och gemener.

### Gateway-konfiguration och hemligheter

En admin sparar gateway-uppgifter via `POST /giving/gateways` (`GatewayController`). Vid sparning krypterar kontrollern de privata och webhook-nycklarna med `EncryptionHelper` innan de sparas. Sedan, på alla värdar som inte är localhost, tas kyrkans befintliga webhook bort och en ny skapas, pekande på `/giving/donate/webhook/{provider}?churchId=…`. En kyrka har en rad per leverantör: när en gateway sparas ersätts bara den befintliga raden för just den leverantören. Publika läsningar (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnerar bara publika nycklar.

## Datamodell

Giving-schemat (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller i `models/`) är ett MySQL-schema som nås via Kysely:

| Tabell | Roll |
|--------|------|
| `gateways` | Leverantörskonfiguration per kyrka: `provider`, `publicKey`, krypterad `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Givardesignationer (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppering för registrering och rapportering (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | En gåva: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; kontoutdrag, summor, instrumentpaneler och donationsrapporter räknar bara `complete` eller null), `transactionId` |
| `fundDonations` | Fördelning av en donation på en eller flera fonder (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Återkommande gåva. `id` är gatewayns prenumerations-id, kopplat till `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondfördelning för en återkommande gåva |
| `customers` | Kopplar ett `personId` till dess gateway-kund-id, per `provider` |
| `gatewayPaymentMethods` | Sparade kort/bankkonton: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Granskningsspår för webhooks/händelser och dedup-nyckel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Löftesinsamlingar kopplade till en fond, och varje persons utlovade belopp |

En donation fördelas på fonder via `fundDonations`. Donationen bär totalbeloppet, och varje `fundDonation` bär en del. `donations.currency` och `gateways.currency` bär ISO-valutan. Varje leverantör anger sina `supportedCurrencies`, och belopp formateras med `CurrencyHelper.formatCurrencyWithLocale`.

## Flöden från början till slut

### Medlem: engångs- och återkommande gåvor (B1App)

Den inloggade gåvosidan (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) sätter ihop tre apphelper-komponenter: `MultiGatewayDonationForm`, `PaymentMethods` och `RecurringDonations`. B1App hanterar den omgivande datahämtningen (`GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`) och skickar vidare gateway-listan. Den valda leverantören laddar sitt eget SDK från gatewayens publika nyckel. Själva betalningen sker inne i apphelper: den valda leverantören tokeniserar den (nya eller sparade) metoden och skickar sedan till `/giving/donate/charge` för en engångsgåva eller `/giving/donate/subscribe` för en återkommande. Båda endpoints kopplar en inloggad givare till dess egna `personId` (bara innehavare av `donations.edit` får koppla till någon annan) och avvisar fondfördelningar vars summa överstiger det debiterade beloppet. Återkommande gåvor skapar en `subscriptions`-rad plus `subscriptionFunds` och överlämnar schemat till gatewayen (Stripe Subscriptions, PayPal Billing Plans eller ett KF-schema för återkommande betalningar).

### Gäst / anonym givande

Den publika gåvosidan (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) och panelen "ge nu" renderar `NonAuthDonationWrapper` från `@churchapps/apphelper/website`. Den injicerar reCAPTCHA och gatewayens Elements-kontext runt leverantörens `GuestForm`. Gäster får ingen inloggning, inga sparade metoder och ingen historik. Flödet hämtar `GET /giving/funds/churchId/:id` och `GET /giving/donate/gateways/:churchId` (bara publika nycklar), verifierar besökaren med `POST /giving/donate/captcha-verify`, tokeniserar i webbläsaren och skickar till `/giving/donate/charge` (eller `/subscribe`). Verifieringsanropet returnerar ett 10 minuter giltigt HMAC-signerat `captchaPass` (`Api/src/modules/giving/helpers/CaptchaPass.ts`). Formuläret skickar det med varje penningrelaterat anrop från gäst. Med `CAPTCHA_ENFORCE=true` nekar API:t gäströsanrop till `create-order`, `charge`, `subscribe`, `addcard` och `ach-setup-intent-anon` utan giltigt pass för den kyrkan. Betalda gäst-registreringar till evenemang (`POST /content/registrations/register`) kontrollerar samma pass precis före debiteringen. Se [Event Registrations](./registrations#payment-flow). Gäst-ACH använder den anonyma `POST /giving/paymentmethods/ach-setup-intent-anon`, som bara tillåter omedelbar verifiering (Financial Connections). En verifiering med mikroinsättningar slutförs först några dagar senare, när gästsidan redan är stängd, och kan därför aldrig slutföra gåvan. Formuläret vägrar debitera ett overifierat SetupIntent och hänvisar givaren till kort eller till bankuppsättning för inloggad användare.

Tre alternativ i gästformuläret använder samma betalningsanrop. `?fundId=` och `?amount=` i gåve-URL:en förvalet fondfördelningen (läses av varje leverantörs gästformulär vid montering och går genom den vanliga hanteraren för fondändring, så summor och avgifter uppdateras). `anonymous: true` gör att `DonateController.charge` kasserar varje person som klienten skickat och registrerar gåvan med `personId = null`. Gästformuläret hoppar över `/people/loadOrCreate` och steget med kund/valv, och de tre leverantörerna med omedelbar loggning slutar slå upp en person utifrån gateway-kunden. Apple Pay kräver att sidans domän är registrerad hos Stripe, så ett Stripe-gästformulär postar en gång per session till det publika, hastighetsbegränsade `POST /giving/donate/register-domain`. Det accepterar bara en domän som tillhör kyrkan (`<subDomain>.b1.church`, en rad i content-modulens domäntabell eller en lokal värd), innan Stripes API för payment-method-domains anropas.

### Admin: registrering och Stripe-import (B1Admin)

Avsnittet för donationer i B1Admin (`B1Admin/src/donations/`) är där ekonomiteamen arbetar. Registrering i batch (`components/BulkDonationEntry.tsx`) bokför kontant-, check- och naturagåvor genom att posta till `/giving/donations` och sedan `/giving/funddonations`. Ingen gateway är inblandad. Personens blad **Registrera en gåva** (`components/LogGiftDialog.tsx`) gör detsamma för en enskild gåva. Först letar det upp batchen vars `batchDate` matchar gåvodatumet, eller skapar en batch med det datumet som namn (`POST /giving/donationbatches`). Om ett senare steg misslyckas tas donationen eller den nya batchen bort igen. Fonder, batcher, kampanjer och kontoutdrag mappar var och en till sina CRUD-rutter under `/giving/*`. Sidorna för givarkontoutdrag (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) begär ett kalenderår med `GET /donations?startDate=&endDate=` och `GET /fundDonations?startDate=&endDate=`, i stället för hela kyrkans historik, som kunde överskrida Lambdas gräns för svarsstorlek. Givarpanelen i medlemsstil (`B1Admin/src/donationComponents/`) återanvänder samma apphelper-komponenter som B1App.

Rapportering och överlämning till redovisning sker på klientsidan eller i rapportkörningen, inte i gatewayen. QuickBooks-exporten på batchsidan bygger en CSV med journalpost från batchens `donations` + `fundDonations` (debet Undeposited Funds, en kredit per fond). Vyn Lapsed Givers på sammanfattningssidan kör `Api/reports/lapsedGivers.json` genom den generiska rapportkörningen, med personnamn lösta av `ReportOutput`. Landsspecifika kvittoformat (Kanada / Australien / Nya Zeeland) är kyrkoinställningar i membership-nyckel-värdelagret, renderade av `GivingStatementDocument` och dupliceras på utskriftssidan i B1App. B1Admins utskriftssidor för kontoutdrag (`PrintDonationPage`, `PrintAllStatementsPage`) skickar kyrkans inställning `logoLight` (via `usePrintLogo` i `B1Admin/src/components/PrintChurchHeader.tsx`) så att logotypen skrivs ut överst på varje kontoutdrag. Sidan väntar på bilden innan den skrivs ut automatiskt.

### Batchstatus och behörigheten Registrera donationer

Batcher kan stängas så att en räknad insättning förblir oförändrad. `POST /giving/donationbatches/:id/close` och `/:id/reopen` (endast Donations.Edit) är de enda som skriver till `status`, `closedDate` och `closedBy` (`DonationBatchRepo.setStatus`). Ett vanligt batchsparande rör dem aldrig, så att bokföra en batch inte kan öppna den igen. Skrivåtkomst samlas i `Api/src/modules/giving/helpers/BatchAccessHelper.ts`. Donations.Edit får ändra allt. Den snävare behörigheten Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Registrera donationer" i rolleditorn) får skapa batcher samt spara eller ta bort donationer och fondfördelningar, men bara medan både donationens nuvarande batch och målbatchen är öppna. Den får aldrig ändra en gateway-gåva (en med `transactionId`). En blockerad skrivning returnerar `403 { error: "This batch is closed." }`. Läsning av batcher accepteras för Donations.ViewSummary eller Donations.Enter, så att en räknare kan välja batchen de registrerar i. På klientsidan speglar `B1Admin/src/donations/batchAccess.ts` reglerna (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`). `Header` och `SecondaryMenuHelper` visar **Donations > Batches** för alla som kan se batcher, även utan View Summary.

### Omvandling av summor i blandade valutor

Varje endpoint som returnerar en enda sammanlagd summa över gåvor som möjligen har blandade valutor, alltså KPI:erna i givaröversikten (`GivingKpiCards`), en batchsumma, en fondsumma och års- och periodsummorna på B1Apps gåvosida, konverterar till kyrkans standardvaluta på serversidan. De adderar inte olika valutor. `Api/src/shared/helpers/ExchangeRateHelper.ts` hämtar kurser från `api.frankfurter.dev` med kyrkans valuta som nyckel, cachar dem i processen i 12 timmar och exponerar `convertTotals(rows, churchCurrency, rates)`. Rader grupperas i förväg per valuta i SQL (ett fåtal grupper, aldrig en omvandling per gåva). Varje grupp omvandlas och summeras, och resultatet bär en flagga `isConverted` som klienten använder för att visa noten "Omräknat till aktuella valutakurser". `GET /donations/exchange-rates` exponerar kurstabellen för klienter som behöver den (B1Apps gåvosida). Kurserna accepteras aldrig från en förfrågan utan hämtas alltid på serversidan, så en klient kan inte påverka en rapporterad summa. Enskilda donationsposter och historiska rapporter i originalvaluta omvandlas aldrig. Bara sammanlagda summor omvandlas.

Stripe-import (`B1Admin/src/donations/StripeImportPage.tsx`) fyller i gåvor som gjorts utanför B1. Den anropar `POST /giving/donate/replay-stripe-events` med `dryRun: true` för en förhandsvisning och sedan `dryRun: false` för att importera. Servern listar Stripe-händelser för datumintervallet och hoppar över allt som redan är registrerat. Matchningen sker först via `eventLogs` provider-id, sedan via transaktions-id, sedan via `DonationRepo.findMatchingDonation` (belopp + datum + person), så att en ny körning aldrig dubbelimporterar. Prenumerationshändelser `charge.succeeded` / `payment_intent.succeeded` hoppas över eftersom `invoice.paid` registrerar dessa gåvor. Nyare Stripe-API-versioner tar bort `PaymentIntent.invoice`, så hoppet använder även beskrivningen "Subscription …".

## Webhooks och avstämning

Avslutade betalningar och ändringar i prenumerationers status kommer till `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Bearbetningen är avsiktligt idempotent:

1. **Verifiera.** `GatewayService.verifyWebhook` delegerar till leverantörens signaturkontroll. En misslyckad signatur returnerar 401. Händelser som inte behöver bearbetas avslutas med 200.
2. **Dedup av händelsen.** `EventLogRepo.loadByProviderId` hoppar över en webhook som redan finns i `eventLogs`.
3. **Dedup av donationen.** Innan något skapas kontrolleras `DonationRepo.loadByTransactionId` mot varje kandidat-id som payloaden kan innehålla. Detta fångar dubbla leveranser, flerstegs-ACH-händelser (väntande → avräknad) och fallet där `/donate/charge` redan registrerat gåvan optimistiskt.
4. **Tillämpa.** Leverantörens `classifyWebhookEvent(eventType)` säger vad händelsen betyder (`donation` väntande/slutförd, `cancel-subscription` eller `ignore`). Slutförda betalningar skapar en `complete`-donation (eller uppgraderar en befintlig `pending`- eller `failed`-donation). ACH-liknande händelser landar som `pending` tills de avräknas. En misslyckad prenumerationsfaktura (Stripes `invoice.payment_failed`) skapar en `failed`-donation nycklad på faktura-id. Avbokningshändelser tar bort den lokala `subscriptions`-raden. Kontrollern granskar aldrig leverantörsspecifika händelsenamn.

### Misslyckade återkommande gåvor och dunning

En `failed`-donation är enheten för återhämtning. `GET /giving/donations/failed` listar dem med det senaste gateway-felmeddelandet från `eventLogs` och en flagga `canRetry` från gatewayens capabilities. `POST /giving/donate/retry/:donationId` anropar leverantörens `retryFailedPayment` (Stripe betalar den öppna fakturan), och den resulterande webhooken uppgraderar raden till `complete` via den vanliga dedup-vägen. Dunning-mejl skickas till givaren från webhook-hanteraren på dag 0, och sedan från `DunningHelper.run` i midnattstimern (kopplad i både `lambda/timer-handler.ts` och `RailwayCron.ts`) på dag 3 och 7. Varje utskick registreras i `eventLogs` som `provider: "dunning"`, `providerId: "<donationId>:<day>"`, så att en omkörning aldrig skickar två mejl. När Stripe ger upp och avbryter prenumerationen (`customer.subscription.deleted` med `cancellation_details.reason: "payment_failed"`) skickar `DunningHelper.notifyCanceled` ett mejl till givaren en gång (`providerId: "<subscriptionId>:canceled"`). Avbokningar som görs av givaren eller admin förblir tysta. Stripe lägger aldrig till händelser i en befintlig endpoint. Efter att du ändrat `StripeHelper.webhookEvents` måste du antingen spara gatewayen igen eller köra `tools/manual/stripe-webhook-events.ts` (torrkörning som standard, `--apply` för att skriva) mot produktion.

Leverantörer med `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) får sina betalningar loggade från svaret på `/charge` (ingen webhook-runda krävs för den lyckliga vägen). Stripe förlitar sig på `payment_intent.succeeded` / `invoice.paid` och ACH `payment_intent.processing`. Avgiftshanteringen (`POST /giving/donate/fee`, gatewayflaggan `payFees` och varje leverantörs `calculateFees`) beräknar "täck avgifterna"-tillägget på givarsidan. B1 tar ingen plattformsandel, så ingen applikationsavgift läggs någonsin till.

:::info
Betalnings- och webhook-vägarna skriver till samma `donations`- / `fundDonations`-rader. `transactionId` är kopplingsnyckeln som hindrar en optimistisk betalningslogg och dess senare webhook från att skapa två donationer för en och samma gåva.
:::

## Relaterade sidor

- [Giving Endpoints](../api/endpoints/giving): hela REST-ytan för donationer, fonder, batcher, gateways, prenumerationer, betalningsmetoder och webhooks
- [AppHelper](../shared-libraries/app-helper): npm-paketet som levererar registret för betalningsleverantörer och donationskomponenterna
- [Module Structure](../api/module-structure): hur GivingApi-modulen är organiserad på serversidan
