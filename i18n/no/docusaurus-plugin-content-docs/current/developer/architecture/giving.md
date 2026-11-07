---
title: "Giving-arkitektur"
description: "Utviklerveiledning for ChurchApps-giving: hvordan B1 Admin og B1.church sender gaver gjennom Stripe-, PayPal-, Kingdom Funding- eller Paystack-gatewayer."
---

# Giving-arkitektur

<div class="article-intro">

ChurchApps kjører gaver etter en gateway-modell: kirken beholder sin egen Stripe-konto (eller PayPal, Kingdom Funding eller Paystack), og B1 er aldri i pengestrømmen som en plattformbehandler. Kortdata tokeniseres i nettleseren og når aldri en ChurchApps-server. Denne siden kartlegger hele stacken — det klientside leverandørregisteret i `@churchapps/apphelper`, GivingApi-gatewayabstraksjonen, datamodellen for gaver, og hvordan webhooks fra gatewayen avstemmes tilbake i databasen.

</div>

## Oversikt

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (nettleser) │                   │  Betalingsgateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ kortinput i       │  Stripe Elements · KF-tokenizer ·     │
│  │ Betalingsleverandør-  │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ register              │  │◀── token / nonce ─│  (kortet når aldri en B1-server)      │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signert webhook
┌─────────────────────────────────────────────┐ (hemmelig nøkkel)│                │ hendelse
│  GivingApi — /giving-modulen                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  lagre donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving-skjema)
```

Tre prinsipper gjelder på tvers av stacken:

1. **Gatewayen holder kortet.** Hver leverandørs innskrivingswidget tokeniserer i nettleseren; API-et mottar bare et token, en nonce eller en ordre-ID.
2. **Én abstraksjon, mange leverandører.** Nettleseren finner en `PaymentProvider` i et register; serveren finner en `IGatewayProvider` i en fabrikk. Begge bruker det samme normaliserte leverandørnavnet som er lagret på gateway-posten.
3. **Webhooks er sannhetskilden for oppgjør.** Et svar fra en belastning registreres optimistisk, men gatewayens signerte webhook er det som bekrefter (eller oppretter) den fullførte gaven, med idempotensvern på begge sider.

## Klientside: betalingsleverandørregisteret (`@churchapps/apphelper`)

Registeret ligger i `Packages/apphelper/src/donations/providers/`, med hver leverandørs widgets og hjelpere under sin egen undermappe (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — ingenting utenfor `providers/` forgrener seg på et leverandørnavn. En `PaymentProvider` (se `providers/types.ts`) samler alt en vertsapp trenger for én gateway: en `descriptor` (admin-etiketter, støttede valutaer, gebyrfelt, standard gebyrsatser, URL-er til dashbord/registrering), et sett med `capabilities`-flagg (lagrede kort, ACH, gjentakende, innebygd innskriving av nytt kort, implisitt lagring ved tokenisering), React-widgetene for medlemsinnskriving (`MemberWrapper`/`MemberEntry`), gavegivning for gjester (`GuestForm`), redigering av lagrede metoder (`MethodEditForm`), og betalinger for skjemaspørsmål (`FormPayment`), pluss `buildChargeRequest(ctx, token)` — det ene stedet der nyttelastformen for belastning varierer per leverandør. Hver leverandørs `MemberWrapper` laster sin egen SDK fra gateway-postens offentlige nøkkel, slik at vertsapper aldri importerer en gateway-SDK (B1App og B1Admin har ingen `@stripe/*`-avhengighet). `pickDefaultGateway(gateways, capability?)` samler hvilken av kirkens gatewayer en flate skal bruke.

`providers/registry.ts` holder de innebygde. De **refereres etter verdi**, ikke registreres gjennom en modulsidevirkning, slik at bundlerens tree-shaking aldri kan fjerne registreringen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funksjon | Formål |
|----------|---------|
| `getPaymentProvider(name)` | Finn etter normalisert navn; faller tilbake til Stripe slik at en feilkonfigurert leverandør aldri krasjer givarskjemaet |
| `registerPaymentProvider(p)` | Registrer en ekstra leverandør under kjøring (for en vertsapps egendefinerte gateway) |
| `listPaymentProviders()` | Oppregn innebygde + egendefinerte — brukes til å bygge admin-nedtrekkslisten for gatewayer |
| `hasPaymentProvider(name)` | Medlemskapssjekk |

**Innebygde klientleverandører: Stripe, PayPal, Kingdom Funding, Paystack.** B1App og B1Admin *leser* bare registeret (`getPaymentProvider`, `listPaymentProviders`); ingen av dem kaller `registerPaymentProvider` — registreringen forblir inne i apphelper.

Hver leverandør tokeniserer på ulik måte, men alle holder kortet utenfor B1:

| Leverandør | Innskrivingswidget | Token som returneres til API-et |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; gjesteskjemaet monterer også en `ExpressCheckoutElement` (Apple Pay / Google Pay, for engangsgaver) hvis `onConfirm` løser til samme `pm_…`-ID | payment-method-ID (`pm_…`); bank via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` for USD-gatewayer, kanadisk PAD `acss_debit` (hostet mandatmodal, mandat `default_for` fakturaer/abonnementer, engangsbelastninger sender med mandat-ID) for CAD-gatewayer |
| Kingdom Funding | Hostet tokenizer-skjema nøklet på gatewayens offentlige nøkkel | engangs-nonce |
| PayPal | PayPal Hosted Fields (kort, gjentakende) pluss PayPal Smart Buttons med Venmo-finansiering (engangs); begge deler én SDK-innlasting og serverordren bygget via `/donate/client-token` + `/donate/create-order` | fanget ordre-ID |
| Paystack | Paystack Inline-popup (`js.paystack.co/v2/inline.js`) — selve popupen gjennomfører betalingen (kort, mobilpenger, banktransaksjon, USSD) | betalt transaksjonsreferanse; lagrede metoder er Paystack `AUTH_…`-autorisasjonskoder |

Stripes `finalizeResult` kjører 3-D Secure / SCA i nettleseren (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) før gaven regnes som fullført; det delte skjemaet kaller bare `provider.finalizeResult(result)` uten å vite hva det gjør.

## Serverside: gateway-abstraksjonen (GivingApi)

`/giving`-modulen (`Api/src/modules/giving`) eksponerer REST-flaten; gateway-rørleggingen ligger i `Api/src/shared/helpers`. `DonateController` snakker aldri direkte med en gateway-SDK — den går gjennom `GatewayService`, som finner riktig `IGatewayProvider` fra `GatewayFactory` og gir den en dekryptert `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() dekrypterer privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) er kontrakten hver gateway implementerer — webhook-livssyklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betaling (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), gebyrer (`calculateFees`), håndtering av lagrede metoder (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), og valgfrie tillegg (kunder, ordrer, SetupIntents, hendelsesreplay, `retryFailedPayment` for en mislykket abonnementsfaktura, `registerPaymentMethodDomain` for verifisering av Apple Pay-domene). En leverandør som utelater en valgfri hook rapporteres som ikke støttet for den handlingen, og brukergrensesnittet skjuler kontrollen. Hver leverandørklasse deklarerer sin egen `capabilities`-matrise (støttede valutaer, ACH, refusjoner, abonnementskrav, transaksjonsgrenser) — `GatewayService.getProviderCapabilities(provider)` leser bare den — og flagg som `logsDonationsImmediately` styrer kontrollerens oppførsel uten noen betingelser på leverandørnavn i kontrollerne.

**Serverleverandører registrert i `GatewayFactory`:**

| Leverandør | Tilgjengelighet |
|----------|-------------|
| Stripe | Alltid på |
| PayPal | Alltid på |
| Kingdom Funding | Alltid på |
| Paystack | Alltid på (kjøpmenn i Nigeria, Ghana, Sør-Afrika, Kenya, Elfenbenskysten; valutaer NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in via miljøflagget `ENABLE_SQUARE` |
| ePayMints | Opt-in via miljøflagget `ENABLE_EPAYMINTS` |

Paystack skiller seg fra de andre ved at pengene beveger seg før GivingApi er involvert: popupen belaster giveren, `processCharge` er en `GET /transaction/verify/:reference` der det betalte beløpet og valutaen må samsvare med gaven som registreres (en referanse som allerede finnes, logges aldri to ganger), og den første gaven i en gjentakende plan logges fra `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` med `start_date` ett intervall fram). Webhooks signeres med selve hemmelige nøkkelen (`x-paystack-signature`, HMAC-SHA512 over rå body), og Paystack har ingen API for webhook-administrasjon, så admin-skjermen viser URL-en for at kirken skal lime den inn i sitt dashbord. Fornyelseshendelser `charge.success` bærer ingen fordeling på fond; leverandøren gjenoppretter den fra giverens lokale `subscriptions`/`subscriptionFunds`-rader. Bare kortautorisasjoner er `reusable` — mobilpenge-gaver er bare engangs, så `createSubscription` avviser dem. Demodataene seeder en annen kirke (Accra Community Church, `CHU00000002`) på en Paystack test-mode GHS-gateway, slik at Paystack-Playwright-suiten kjører ved siden av Graces Stripe-suite.

Egendefinerte leverandører kan registreres under kjøring når `ENABLE_CUSTOM_GATEWAY_PROVIDERS` er satt; `AbstractExperimentalGatewayProvider` er basisklassen for dem. Leverandørnavn matches uten hensyn til store/små bokstaver.

### Gateway-konfigurasjon og hemmeligheter

En admin lagrer gateway-legitimasjon via `POST /giving/gateways` (`GatewayController`). Ved lagring krypterer kontrolleren de private og webhook-nøklene med `EncryptionHelper` før lagring, og deretter — på en hvilken som helst vert som ikke er localhost — sletter den kirkens eksisterende webhook og provisjonerer en ny som peker på `/giving/donate/webhook/{provider}?churchId=…`. En kirke har én rad per leverandør: lagring av en gateway erstatter bare den eksisterende raden for samme leverandør. Offentlige lesinger (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnerer bare offentlige nøkler.

## Datamodell

Giving-skjemaet (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller i `models/`) er et MySQL-skjema som nås gjennom Kysely:

| Tabell | Rolle |
|-------|-------|
| `gateways` | Konfigurasjon av leverandør per kirke: `provider`, `publicKey`, kryptert `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Gavebestemmelser (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppering for registrering/rapportering (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Én gave: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; oppgaver, summer, dashbord og givenrapporter teller bare `complete` eller null), `transactionId` |
| `fundDonations` | Fordeling av en gave på én eller flere fond (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Gjentakende gave; `id` er gatewayens abonnements-ID, koblet til `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondfordeling for en gjentakende gave |
| `customers` | Kobler en `personId` til dens gateway-kunde-ID, per `provider` |
| `gatewayPaymentMethods` | Lagrede kort/banker: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Revisjonslogg for webhook/hendelser og deduplikeringsnøkkel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Løfte-kampanjer knyttet til et fond, og hver persons lovede beløp |

En gave fordeles på fond gjennom `fundDonations` — gaven bærer totalen, hver `fundDonation` bærer en del. `donations.currency` og `gateways.currency` bærer ISO-valutaen; hver leverandør annonserer sine `supportedCurrencies`, og beløp formateres med `CurrencyHelper.formatCurrencyWithLocale`.

## Ende-til-ende-flyter

### Medlem, engangs og gjentakende (B1App)

Den innloggede givskjermen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setter sammen tre apphelper-komponenter: `MultiGatewayDonationForm`, `PaymentMethods` og `RecurringDonations`. B1App gjør dataomgivelsene — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — og sender gateway-listen videre; den løste leverandøren laster sin egen SDK fra gatewayens offentlige nøkkel. Selve belastningen skjer inne i apphelper: den løste leverandøren tokeniserer den (nye eller lagrede) metoden, og poster deretter til `/giving/donate/charge` for en engangsgave eller `/giving/donate/subscribe` for en gjentakende. Begge endepunktene tilskriver en innlogget giver til sin egen `personId` (bare innehavere av `donations.edit` kan tilskrive noen andre), og avviser fordelinger på fond som summerer til mer enn det belastede beløpet. Gjentakende gaver oppretter en `subscriptions`-rad pluss `subscriptionFunds` og overlater planen til gatewayen (Stripe Subscriptions, PayPal Billing Plans, eller en KF-gjentakende plan).

### Gjestegiving / anonym giving

Den offentlige givsiden (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) og panelet «give now» rendrer `NonAuthDonationWrapper` fra `@churchapps/apphelper/website`, som injiserer reCAPTCHA og gatewayens Elements-kontekst rundt leverandørens `GuestForm`. Gjester får ingen innlogging, ingen lagrede metoder og ingen historikk. Flyten henter `GET /giving/funds/churchId/:id` og `GET /giving/donate/gateways/:churchId` (bare offentlige nøkler), verifiserer besøkeren med `POST /giving/donate/captcha-verify`, tokeniserer i nettleseren, og poster til `/giving/donate/charge` (eller `/subscribe`). Verifikasjonskallet returnerer en 10 minutter gyldig HMAC-signert `captchaPass` (`Api/src/modules/giving/helpers/CaptchaPass.ts`) som skjemaet sender med hvert pengekall fra gjester; med `CAPTCHA_ENFORCE=true` avviser Api-et gjestekall til `create-order`, `charge`, `subscribe`, `addcard` og `ach-setup-intent-anon` uten et gyldig pass for den kirken. Betalte påmeldinger til arrangementer for gjester (`POST /content/registrations/register`) sjekker det samme passet rett før belastningen; se [Påmeldinger til arrangementer](./registrations.md#payment-flow). ACH for gjester bruker det anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`, som bare tillater umiddelbar verifisering (Financial Connections): en sjekk med småbeløp fullføres dager senere, etter at gjestesiden er borte, så den kunne aldri fullføre gaven. Skjemaet nekter å belaste en uverifisert SetupIntent og peker giveren til kort eller en bankoppsett for innlogget bruker.

Tre valg for gjesteskjemaet bruker det samme belastningskallet. `?fundId=` og `?amount=` på giv-URL-en forhåndsvelger fordelingen på fond (leses av hver leverandørs gjesteskjema ved montering, og rutes gjennom den vanlige handleren for fondsendringer, slik at totaler og gebyrer oppdateres). `anonymous: true` gjør at `DonateController.charge` forkaster enhver person klienten sendte, og logger gaven med `personId = null`; gjesteskjemaet hopper over `/people/loadOrCreate` og kunde-/hvelvsteget, og de tre leverandørene med umiddelbar logging slutter å finne en person fra gateway-kunden. Apple Pay krever at sidens domene er registrert hos Stripe, så et Stripe-gjesteskjema poster én gang per økt til det offentlige, hastighetsbegrensede `POST /giving/donate/register-domain`, som bare godtar et domene som tilhører kirken (`<subDomain>.b1.church`, en rad i innholdsmodulens domenetabell, eller en lokal vert) før det kaller Stripes API for betalingsmetodedomener.

### Admin-registrering og Stripe-import (B1Admin)

Gavedelen av B1Admin (`B1Admin/src/donations/`) er der økonomiteamene jobber. Registrering av bunter (`components/BulkDonationEntry.tsx`) registrerer kontant-/sjekk-/naturalgaver ved å poste `/giving/donations` og deretter `/giving/funddonations` — ingen gateway involvert. Personsidens ark **Log a gift** (`components/LogGiftDialog.tsx`) gjør det samme for én gave, først ved å finne bunten der `batchDate` samsvarer med gavedatoen eller opprette en som er oppkalt etter den datoen (`POST /giving/donationbatches`), og slette gaven/den nye bunten igjen hvis et senere steg mislykkes. Fond, bunter, kampanjer og oppgaver knyttes hver til sine CRUD-ruter under `/giving/*`; sidene for giveroppgaver (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) ber om ett kalenderår med `GET /donations?startDate=&endDate=` og `GET /fundDonations?startDate=&endDate=` i stedet for kirkens fulle historikk, som kunne overskride responsgrensen til Lambda. Givepanelet i medlemsstil (`B1Admin/src/donationComponents/`) gjenbruker de samme apphelper-komponentene som B1App.

Rapportering og regnskapsoverleveringer er klientside- eller rapportkjøringsarbeid, ikke gatewayarbeid: bunt-sidens QuickBooks-eksport bygger en journalpost-CSV fra bunten sine `donations` + `fundDonations` (debet Undeposited Funds, én kredit per fond), sammendragssidens visning for Lapsed Givers kjører `Api/reports/lapsedGivers.json` gjennom den generiske rapportkjøreren med personnavn løst av `ReportOutput`, og landsspesifikke kvitteringsformater (Canada / Australia / New Zealand) er kirkeinnstillinger i membership-nøkkelverdi-lageret, rendret av `GivingStatementDocument` og duplisert i B1Apps utskriftsside. B1Admins utskriftssider for oppgaver (`PrintDonationPage`, `PrintAllStatementsPage`) sender kirkens innstilling `logoLight` (via `usePrintLogo` i `B1Admin/src/components/PrintChurchHeader.tsx`), slik at logoen skrives ut øverst på hver oppgave, og de venter på bildet før automatisk utskrift.

### Batchstatus og tillatelsen Enter Donations

Bunter kan lukkes slik at en talt innskudd forblir som den var. `POST /giving/donationbatches/:id/close` og `/:id/reopen` (bare Donations.Edit) er de eneste som skriver `status`, `closedDate` og `closedBy` (`DonationBatchRepo.setStatus`); en vanlig lagring av bunt rører dem aldri, så innsending av en bunt kan ikke gjenåpne den. Skrivetilgang samles i `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit kan endre alt, mens den smalere tillatelsen Donations.Enter (`GivingApi` / `Donations` / `Enter`, «Enter Donations» i rolleredigeringsprogrammet) kan opprette bunter og lagre eller slette gaver og fondsdelinger bare når både gavens nåværende bunt og målbunten er åpne, og aldri for en gatewaygave (en med en `transactionId`). En blokkert skriving returnerer `403 { error: "This batch is closed." }`. Lesing av bunter aksepterer Donations.ViewSummary eller Donations.Enter, slik at en teller kan velge bunten de fører inn i. På klientsiden speiler `B1Admin/src/donations/batchAccess.ts` disse reglene (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), og `Header` / `SecondaryMenuHelper` viser **Donations > Batches** for alle som kan se bunter, selv uten View Summary.

### Konvertering av blandede valutatotaler

Ethvert endepunkt som returnerer en enkelt samlet total over muligens blandede valutaer for gaver — gavesammendragets nøkkeltall (`GivingKpiCards`), en batch-total, en fondstotal, og B1Apps givskjerms år-til-dato-/periodetotaler — konverterer til kirkens standardvaluta på serveren i stedet for å summere ulike valutaer. `Api/src/shared/helpers/ExchangeRateHelper.ts` henter kurser fra `api.frankfurter.dev` nøklet på kirkens valuta, cacher dem i prosessen i 12 timer, og tilbyr `convertTotals(rows, churchCurrency, rates)`: rader grupperes på forhånd etter valuta i SQL (noen få grupper, aldri en konvertering per gave), hver gruppe konverteres og summeres, og resultatet bærer et flagg `isConverted` som klienten bruker til å vise en merknad «Converted at current exchange rates». `GET /donations/exchange-rates` eksponerer kurstabellen for klienter som trenger den (B1Apps givskjerm); selve kursene aksepteres aldri fra en forespørsel, bare hentes på serveren, slik at en klient ikke kan påvirke en rapportert total. Enkeltgave-poster og historiske rapporter i opprinnelig valuta konverteres aldri — bare samlede totaler gjør det.

Stripe-import (`B1Admin/src/donations/StripeImportPage.tsx`) fyller inn gaver gjort utenfor B1: den kaller `POST /giving/donate/replay-stripe-events` med `dryRun: true` for en forhåndsvisning, og deretter `dryRun: false` for å importere. Serveren lister Stripe-hendelser for datointervallet og hopper over alt som allerede er registrert — først matchet på `eventLogs` provider-ID, deretter på transaksjons-ID, og deretter `DonationRepo.findMatchingDonation` (beløp + dato + person), slik at en ny kjøring aldri importerer to ganger. Abonnements-hendelser `charge.succeeded` / `payment_intent.succeeded` hoppes over fordi `invoice.paid` registrerer disse gavene; nyere Stripe-API-versjoner fjerner `PaymentIntent.invoice`, så hoppingen bruker også beskrivelsen «Subscription …».

## Webhooks og avstemming

Oppgjorte betalinger og endringer i abonnementstilstand kommer til `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Behandlingen er bevisst idempotent:

1. **Verifiser** — `GatewayService.verifyWebhook` delegerer til leverandørens signatursjekk; en mislykket signatur returnerer 401. Hendelser som ikke trenger behandling avsluttes med 200.
2. **Dedupliser hendelsen** — `EventLogRepo.loadByProviderId` hopper over en webhook som allerede er registrert i `eventLogs`.
3. **Dedupliser gaven** — før noe opprettes, sjekkes `DonationRepo.loadByTransactionId` mot alle kandidat-ID-er nyttelasten kan bære. Dette absorberer duplikatleveranser, flertrinns ACH-hendelser (pending → settled), og tilfellet der `/donate/charge` allerede har logget gaven optimistisk.
4. **Bruk** — leverandørens `classifyWebhookEvent(eventType)` sier hva hendelsen betyr (`donation` pending/complete, `cancel-subscription`, eller `ignore`); fullførte betalinger oppretter en `complete`-gave (eller forfremmer en eksisterende `pending`- eller `failed`-gave), ACH-lignende hendelser havner som `pending` til oppgjør, en mislykket abonnementsfaktura (Stripe `invoice.payment_failed`) oppretter en `failed`-gave nøklet på faktura-ID-en, og avbestillingshendelser sletter den lokale `subscriptions`-raden. Kontrolleren inspiserer aldri leverandørspesifikke hendelsesnavn.

### Mislykkede gjentakende gaver og purring

En `failed`-gave er arbeidsenheten for gjenoppretting. `GET /giving/donations/failed` lister dem med den nyeste gateway-feilmeldingen fra `eventLogs` og et flagg `canRetry` fra gatewayens kapasiteter; `POST /giving/donate/retry/:donationId` kaller leverandørens `retryFailedPayment` (Stripe betaler den åpne fakturaen), og den resulterende webhooken forfremmer raden til `complete` gjennom den vanlige deduplikeringsstien. Purringsepost sendes til giveren fra webhook-handleren på dag 0, deretter fra `DunningHelper.run` i midnattstimeren (koblet i både `lambda/timer-handler.ts` og `RailwayCron.ts`) på dag 3 og 7; hver sending registreres i `eventLogs` som `provider: "dunning"`, `providerId: "<donationId>:<day>"`, slik at en ny kjøring aldri sender e-post to ganger. Når Stripe gir opp og avbestiller abonnementet (`customer.subscription.deleted` med `cancellation_details.reason: "payment_failed"`), sender `DunningHelper.notifyCanceled` giveren én e-post (`providerId: "<subscriptionId>:canceled"`); avbestillinger initiert av giver eller admin forblir stille. Stripe legger aldri til hendelser i et eksisterende endepunkt: etter endring av `StripeHelper.webhookEvents` må du enten lagre gatewayen på nytt eller kjøre `tools/manual/stripe-webhook-events.ts` (tørrkjøring som standard, `--apply` for å skrive) mot produksjon.

Leverandører med `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) får sine belastninger logget fra `/charge`-svaret (ingen webhook-runde kreves for den lykkelige veien), mens Stripe er avhengig av `payment_intent.succeeded` / `invoice.paid` og ACH `payment_intent.processing`. Gebyrhåndtering (`POST /giving/donate/fee`, gateway-flagget `payFees`, og hver leverandørs `calculateFees`) beregner «dekk gebyrene»-grossupen på giversiden — B1 tar ingen plattformandel, så ingen applikasjonsgebyr legges noen gang til.

:::info
Belastnings- og webhook-banene skriver de samme `donations`- / `fundDonations`-radene. `transactionId` er koblingsnøkkelen som hindrer at en optimistisk belastningslogg og dens senere webhook gir to gaver for én gave.
:::

## Relaterte sider

- [Giving-endepunkter](../api/endpoints/giving.md) — full REST-flate for gaver, fond, bunter, gatewayer, abonnementer, betalingsmetoder og webhooks
- [AppHelper](../shared-libraries/app-helper.md) — npm-pakken som leverer betalingsleverandørregisteret og gavekomponentene
- [Modulstruktur](../api/module-structure.md) — hvordan GivingApi-modulen er organisert på serversiden
