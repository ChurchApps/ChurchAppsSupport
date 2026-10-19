---
title: "Arkitektur for gaver"
---

# Arkitektur for gaver

<div class="article-intro">

ChurchApps kjører donasjoner etter en gateway-modell: kirken beholder sin egen Stripe-konto (eller PayPal, Kingdom Funding eller Paystack), og B1 er aldri en plattformbehandler i betalingsflyten. Kortdata tokeniseres i nettleseren og når aldri en ChurchApps-server. Denne siden beskriver hele stacken — provider-registeret på klientsiden i `@churchapps/apphelper`, GivingApi-gatewayabstraksjonen, datamodellen for donasjoner, og hvordan gateway-webhooks synkroniseres tilbake til databasen.

</div>

## Oversikt

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

Tre prinsipper gjelder for hele stacken:

1. **Gatewayen holder kortet.** Hver leverandørs innskrivingskomponent tokeniserer i nettleseren; API-et mottar bare et token, en nonce eller en ordre-id.
2. **Én abstraksjon, mange leverandører.** Nettleseren finner en `PaymentProvider` i et register; serveren finner en `IGatewayProvider` fra en fabrikk. Begge bruker samme normaliserte leverandørnavn lagret på gateway-posten.
3. **Webhooks er sannhetskilden for oppgjør.** Et svar fra belastning registreres optimistisk, men det er gatewayens signerte webhook som bekrefter (eller oppretter) den fullførte donasjonen, med idempotensvern på begge sider.

## Klientsiden: register for betalingsleverandører (`@churchapps/apphelper`)

Registeret ligger i `Packages/apphelper/src/donations/providers/`, med hver leverandørs komponenter og hjelpefunksjoner i sin egen undermappe (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Ingenting utenfor `providers/` forgrener på et leverandørnavn. En `PaymentProvider` (se `providers/types.ts`) samler alt en vertsapp trenger for én gateway: en `descriptor` (etiketter i administrasjonen, støttede valutaer, gebyrfelt, standard gebyrsatser, URL-er til dashbord og registrering), et sett med `capabilities` (lagrede kort, ACH, gjentakende betalinger, inline oppføring av nytt kort, implisitt lagring ved tokenisering), React-komponentene for medlemsregistrering (`MemberWrapper`/`MemberEntry`), gavegivning som gjest (`GuestForm`), redigering av lagret betalingsmetode (`MethodEditForm`) og betalinger fra skjemaspørsmål (`FormPayment`), samt `buildChargeRequest(ctx, token)`, som er det ene stedet der formen på belastningsforespørselen varierer mellom leverandørene. Hver leverandørs `MemberWrapper` laster sitt eget SDK ut fra gateway-postens offentlige nøkkel, så vertsappene aldri importerer et gateway-SDK (B1App og B1Admin har ingen `@stripe/*`-avhengighet). `pickDefaultGateway(gateways, capability?)` samler avgjørelsen om hvilken av kirkens gatewayer en flate skal bruke.

`providers/registry.ts` inneholder de innebygde leverandørene. De er **referert etter verdi**, ikke registrert via en side-effekt ved import, slik at tree-shaking i bundleren aldri kan fjerne registreringen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funksjon | Formål |
|----------|--------|
| `getPaymentProvider(name)` | Finner leverandøren etter normalisert navn; faller tilbake til Stripe, slik at en feilkonfigurert leverandør aldri krasjer giverskjemaet |
| `registerPaymentProvider(p)` | Registrerer en ekstra leverandør under kjøring (for en vertsapps egendefinerte gateway) |
| `listPaymentProviders()` | Lister innebygde og egendefinerte leverandører — brukes til å bygge gatewayvalget i administrasjonen |
| `hasPaymentProvider(name)` | Sjekk om leverandøren finnes |

**Innebygde klientleverandører: Stripe, PayPal, Kingdom Funding, Paystack.** B1App og B1Admin *leser* bare registeret (`getPaymentProvider`, `listPaymentProviders`). Ingen av dem kaller `registerPaymentProvider`; registreringen forblir i apphelper.

Hver leverandør tokeniserer på sin måte, men alle holder kortet utenfor B1:

| Leverandør | Oppføringskomponent | Token som sendes til API |
|------------|---------------------|--------------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`. Gjesteskjemaet monterer også en `ExpressCheckoutElement` (Apple Pay / Google Pay, for engangsgaver), og `onConfirm` der løser til samme `pm_…`-id | betalingsmetode-id (`pm_…`). Bankkonto via `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` for USD-gatewayer, kanadisk PAD `acss_debit` (hostet mandatmodal, mandatet `default_for` fakturaer og abonnementer, engangsbelastninger sender mandat-id-en) for CAD-gatewayer |
| Kingdom Funding | Hostet tokeniseringsskjema nøklet med gatewayens offentlige nøkkel | engangs-nonce |
| PayPal | PayPal Hosted Fields (kort, gjentakende) og PayPal Smart Buttons med Venmo-finansiering (engangs). Begge deler én SDK-lasting, og serverordren bygges via `/donate/client-token` + `/donate/create-order` | fanget ordre-id |
| Paystack | Paystack Inline-popup (`js.paystack.co/v2/inline.js`). Popup-vinduet tar selv betalingen (kort, mobilpenger, banköverføring, USSD) | betalt transaksjonsreferanse. Lagrede metoder er Paystack `AUTH_…`-autorisasjonskoder |

Stripes `finalizeResult` kjører 3-D Secure / SCA i nettleseren (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) før donasjonen regnes som fullført. Det delte skjemaet kaller bare `provider.finalizeResult(result)` uten å vite hva det gjør.

## Serversiden: gateway-abstraksjonen (GivingApi)

`/giving`-modulen (`Api/src/modules/giving`) eksponerer REST-grensesnittet. Gateway-infrastrukturen ligger i `Api/src/shared/helpers`. `DonateController` snakker aldri direkte med et gateway-SDK. Den går gjennom `GatewayService`, som finner riktig `IGatewayProvider` fra `GatewayFactory` og gir den en dekryptert `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) er kontrakten alle gatewayer implementerer. Den dekker webhook-livssyklusen (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betaling (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), gebyrer (`calculateFees`), håndtering av lagrede metoder (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) og valgfrie tillegg (kunder, ordrer, SetupIntents, hendelsesavspilling, `retryFailedPayment` for en mislykket abonnementsfaktura, `registerPaymentMethodDomain` for domeneverifisering av Apple Pay). En leverandør som utelater en valgfri hook rapporteres som ustøttet for den handlingen, og brukergrensesnittet skjuler kontrollen. Hver leverandørklasse deklarerer sin egen `capabilities`-matrise (støttede valutaer, ACH, refusjoner, krav til abonnementer, transaksjonsgrenser). `GatewayService.getProviderCapabilities(provider)` leser den bare. Flagg som `logsDonationsImmediately` styrer kontrollerens oppførsel uten at kontrollerne inneholder noen betingelser på leverandørnavn.

**Serverleverandører registrert i `GatewayFactory`:**

| Leverandør | Tilgjengelighet |
|------------|-----------------|
| Stripe | Alltid på |
| PayPal | Alltid på |
| Kingdom Funding | Alltid på |
| Paystack | Alltid på (kjøpmenn i Nigeria, Ghana, Sør-Afrika, Kenya og Elfenbenskysten; valutaene NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Valgfri via miljøflagget `ENABLE_SQUARE` |
| ePayMints | Valgfri via miljøflagget `ENABLE_EPAYMINTS` |

Paystack skiller seg fra de andre ved at pengene flytter seg før GivingApi er involvert. Popup-vinduet belaster giveren. `processCharge` er en `GET /transaction/verify/:reference`, der det betalte beløpet og valutaen må stemme med donasjonen som registreres (en referanse som allerede finnes, logges aldri to ganger). Den første gaven i en gjentakende plan logges fra `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` med `start_date` ett intervall frem i tid). Webhooks signeres med selve den hemmelige nøkkelen (`x-paystack-signature`, HMAC-SHA512 over den rå forespørselskroppen). Paystack har ikke noe API for webhook-administrasjon, så admin-skjermen viser URL-en som kirken må lime inn i sitt dashbord. Fornyelseshendelser av typen `charge.success` inneholder ingen fordeling på fond. Leverandøren henter den fra giverens lokale `subscriptions`/`subscriptionFunds`-rader. Bare kortautorisasjoner er `reusable`. Mobilpengegaver er kun engangsgaver, så `createSubscription` avviser dem. Demodataene legger inn en andre kirke (Accra Community Church, `CHU00000002`) på en Paystack-gateway i testmodus med GHS, slik at Paystack-Playwright-testsuiten kjører ved siden av Graces Stripe-suite.

Egendefinerte leverandører kan registreres under kjøring når `ENABLE_CUSTOM_GATEWAY_PROVIDERS` er satt. `AbstractExperimentalGatewayProvider` er basisklassen for dem. Leverandørnavn sammenlignes uten hensyn til store og små bokstaver.

### Gateway-konfigurasjon og hemmeligheter

En administrator lagrer gateway-legitimasjon via `POST /giving/gateways` (`GatewayController`). Ved lagring krypterer kontrolleren de private nøklene og webhook-nøklene med `EncryptionHelper` før de lagres. Deretter, på alle verter som ikke er localhost, sletter den kirkens eksisterende webhook og oppretter en ny som peker til `/giving/donate/webhook/{provider}?churchId=…`. En kirke har én rad per leverandør: lagring av en gateway erstatter bare den eksisterende raden for samme leverandør. Offentlige lesinger (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnerer bare offentlige nøkler.

## Datamodell

Giving-skjemaet (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller i `models/`) er et MySQL-skjema som brukes via Kysely:

| Tabell | Rolle |
|--------|-------|
| `gateways` | Konfigurasjon per leverandør for kirken: `provider`, `publicKey`, kryptert `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Gaveformål (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppering for registrering og rapportering (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Én gave: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; oppgaver, totaler, dashbord og donasjonsrapporter teller bare `complete` eller null), `transactionId` |
| `fundDonations` | Fordeling av en donasjon på ett eller flere fond (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Gjentakende gave. `id` er gatewayens abonnements-id, koblet til `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondsfordeling for en gjentakende gave |
| `customers` | Kobler en `personId` til gatewayens kunde-id, per `provider` |
| `gatewayPaymentMethods` | Lagrede kort og banker: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Revisjonslogg for webhook-hendelser og deduplikeringsnøkkel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Løfteinnsamlinger knyttet til et fond, og hver persons lovede beløp |

En donasjon fordeles på fond via `fundDonations`. Donasjonen bærer totalbeløpet, og hver `fundDonation` bærer en andel. `donations.currency` og `gateways.currency` bærer ISO-valutakoden. Hver leverandør annonserer sine `supportedCurrencies`, og beløp formateres med `CurrencyHelper.formatCurrencyWithLocale`.

## Ende-til-ende-flyter

### Medlem: engangs- og gjentakende gave (B1App)

Den innloggede donasjonsskjermen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setter sammen tre apphelper-komponenter: `MultiGatewayDonationForm`, `PaymentMethods` og `RecurringDonations`. B1App gjør datalastingen rundt dem: `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id` og `/customers/:id/subscriptions`. Gateway-listen sendes videre, og den valgte leverandøren laster sitt eget SDK fra gatewayens offentlige nøkkel. Selve belastningen skjer inne i apphelper. Den valgte leverandøren tokeniserer den (nye eller lagrede) metoden, og sender deretter til `/giving/donate/charge` for en engangsgave eller `/giving/donate/subscribe` for en gjentakende gave. Begge endepunktene knytter en innlogget giver til sin egen `personId` (bare de som har `donations.edit` kan knytte en gave til noen andre), og de avviser fondsfordelinger som summerer til mer enn det belastede beløpet. Gjentakende gaver oppretter en `subscriptions`-rad pluss `subscriptionFunds`, og planen overlates til gatewayen (Stripe Subscriptions, PayPal Billing Plans eller en KF-gjentakende plan).

### Gjest og anonym givning

Den offentlige donasjonssiden (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) og panelet «gi nå» viser `NonAuthDonationWrapper` fra `@churchapps/apphelper/website`. Den legger reCAPTCHA og gatewayens Elements-kontekst rundt leverandørens `GuestForm`. Gjester får ingen innlogging, ingen lagrede metoder og ingen historikk. Flyten henter `GET /giving/funds/churchId/:id` og `GET /giving/donate/gateways/:churchId` (bare offentlige nøkler), verifiserer besøkende med `POST /giving/donate/captcha-verify`, tokeniserer i nettleseren og sender til `/giving/donate/charge` (eller `/subscribe`). ACH for gjester bruker det anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`, som bare tillater øyeblikkelig verifisering (Financial Connections). En verifisering med småbeløp fullføres flere dager senere, etter at gjestesiden er borte, og kunne derfor aldri fullføre gaven. Skjemaet nekter å belaste et uverifisert SetupIntent og viser giveren til kort eller et innlogget bankoppsett.

Tre alternativer i gjesteskjemaet bruker samme belastningskall. `?fundId=` og `?amount=` på donasjons-URL-en forhåndsvelger fondsfordelingen. Hvert leverandørs gjesteskjema leser dem ved montering, og sender dem gjennom den vanlige håndtereren for fondsendring, slik at summer og gebyrer oppdateres. `anonymous: true` gjør at `DonateController.charge` forkaster en eventuell person klienten sendte, og registrerer gaven med `personId = null`. Gjesteskjemaet hopper over `/people/loadOrCreate` og kunde-/hvelvsteget, og de tre leverandørene som registrerer umiddelbart, slutter å finne en person ut fra gatewaykunden. Apple Pay krever at sidens domene er registrert hos Stripe. Et Stripe-gjesteskjema sender derfor én gang per økt til det offentlige, hastighetsbegrensede `POST /giving/donate/register-domain`. Endepunktet godtar bare et domene som tilhører kirken (`<subDomain>.b1.church`, en rad i innholdsmodulens domenetabell, eller en lokal vert), før det kaller Stripes API for betalingsmetodedomener.

### Admin-registrering og Stripe-import (B1Admin)

Donasjonsdelen i B1Admin (`B1Admin/src/donations/`) er der økonomiteamene jobber. Massregistrering (`components/BulkDonationEntry.tsx`) registrerer kontante gaver, sjekker og gaver i natura ved å poste til `/giving/donations` og deretter `/giving/funddonations`. Ingen gateway er involvert. Personens **Registrer en gave**-ark (`components/LogGiftDialog.tsx`) gjør det samme for én enkelt gave. Først finner den batchen der `batchDate` samsvarer med gavedatoen, eller oppretter en batch oppkalt etter datoen (`POST /giving/donationbatches`). Hvis et senere steg mislykkes, slettes donasjonen og den nye batchen igjen. Fond, batcher, kampanjer og oppgaver knyttes hver til sine `/giving/*`-CRUD-ruter. Utskriftssidene for gaveoppgaver (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) ber om ett kalenderår med `GET /donations?startDate=&endDate=` og `GET /fundDonations?startDate=&endDate=`, i stedet for hele kirkens historikk, som kunne overskride Lambdas grense for responsstørrelse. Donasjonspanelet i medlemsstil (`B1Admin/src/donationComponents/`) gjenbruker de samme apphelper-komponentene som B1App.

Rapportering og overføring til regnskap skjer på klientsiden eller i rapportkjøreren, ikke i gatewayen. Batchsidens QuickBooks-eksport bygger en journalpost-CSV fra batchens `donations` og `fundDonations` (debet Undeposited Funds, én kredit per fond). Visningen Lapsed Givers på oversiktssiden kjører `Api/reports/lapsedGivers.json` gjennom den generiske rapportkjøreren, med personnavn løst av `ReportOutput`. Landsspesifikke kvitteringsformater (Canada, Australia, New Zealand) er kirkeinnstillinger i medlemsmodulens nøkkel/verdi-lager. De gjengis av `GivingStatementDocument` og er duplisert på B1Apps utskriftsside. B1Admins utskriftssider for oppgaver (`PrintDonationPage`, `PrintAllStatementsPage`) sender kirkens `logoLight`-innstilling (via `usePrintLogo` i `B1Admin/src/components/PrintChurchHeader.tsx`), slik at logoen skrives ut øverst på hver oppgave. Sidene venter på bildet før de skriver ut automatisk.

### Batchstatus og tillatelsen Registrer donasjoner

Batcher kan lukkes, slik at en talt innbetaling forblir slik den var. `POST /giving/donationbatches/:id/close` og `/:id/reopen` (bare Donations.Edit) er de eneste som skriver `status`, `closedDate` og `closedBy` (`DonationBatchRepo.setStatus`). En vanlig lagring av batch berører dem aldri, så det å bokføre en batch kan ikke åpne den igjen. Skrivetilgangen er samlet i `Api/src/modules/giving/helpers/BatchAccessHelper.ts`. Donations.Edit kan endre alt. Den smalere tillatelsen Donations.Enter (`GivingApi` / `Donations` / `Enter`, «Enter Donations» i rolleredigereren) kan bare opprette batcher og lagre eller slette donasjoner og fondsfordelinger, og bare når både donasjonens nåværende batch og målbatchen er åpne. Den kan aldri brukes på en gateway-gave (en med `transactionId`). En blokkert skriving returnerer `403 { error: "This batch is closed." }`. Lesing av batcher godtar Donations.ViewSummary eller Donations.Enter, slik at en teller kan velge batchen de registrerer i. På klientsiden speiler `B1Admin/src/donations/batchAccess.ts` disse reglene (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`). `Header` og `SecondaryMenuHelper` viser **Donasjoner > Batcher** til alle som kan se batcher, også uten View Summary.

### Omregning av blandede valutatotaler

Ethvert endepunkt som returnerer én samlet total over gaver i muligens blandede valutaer, konverterer til kirkens standardvaluta på serveren i stedet for å summere ulike valutaer. Dette gjelder nøkkeltallene for gaveoppsummeringen (`GivingKpiCards`), en batchtotal, en fondstotal og donasjonsskjermens år-til-dato- og periodetotaler i B1App. `Api/src/shared/helpers/ExchangeRateHelper.ts` henter kurser fra `api.frankfurter.dev`, nøklet på kirkevalutaen, og cacher dem i prosessen i 12 timer. Den tilbyr `convertTotals(rows, churchCurrency, rates)`: rader grupperes på forhånd etter valuta i SQL (noen få grupper, aldri en konvertering per gave). Hver gruppe konverteres og summeres, og resultatet har et `isConverted`-flagg som klienten bruker for å vise merknaden «Konvertert til gjeldende valutakurser». `GET /donations/exchange-rates` eksponerer kurstabellen for klienter som trenger den (B1Apps donasjonsskjerm). Kursene aksepteres aldri fra en forespørsel, bare hentes på serveren, slik at en klient ikke kan påvirke en rapportert total. Enkeltdonasjoner og historiske rapporter i originalvaluta konverteres aldri, bare samlede totaler.

Stripe-import (`B1Admin/src/donations/StripeImportPage.tsx`) fyller inn gaver som ble gitt utenfor B1. Den kaller `POST /giving/donate/replay-stripe-events` med `dryRun: true` for en forhåndsvisning, og deretter `dryRun: false` for å importere. Serveren lister Stripe-hendelser for datoperioden og hopper over alt som allerede er registrert. Først matches hendelsen på leverandør-id i `eventLogs`, deretter på transaksjons-id, og til slutt på `DonationRepo.findMatchingDonation` (beløp, dato og person), slik at en ny kjøring aldri importerer dobbelt. Abonnementshendelsene `charge.succeeded` og `payment_intent.succeeded` hoppes over, fordi `invoice.paid` registrerer disse gavene. Nyere Stripe-API-versjoner fjerner `PaymentIntent.invoice`, så hoppingen bruker også beskrivelsen «Subscription …».

## Webhooks og avstemming

Oppgjorte betalinger og endringer i abonnementstilstand kommer til `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Behandlingen er bevisst idempotent:

1. **Verifiser.** `GatewayService.verifyWebhook` delegerer til leverandørens signaturkontroll. En mislykket signatur gir 401. Hendelser som ikke trenger behandling avsluttes med 200.
2. **Dedupliser hendelsen.** `EventLogRepo.loadByProviderId` hopper over en webhook som allerede er registrert i `eventLogs`.
3. **Dedupliser donasjonen.** Før noe opprettes, sjekkes `DonationRepo.loadByTransactionId` mot hver kandidat-id payloaden kan inneholde. Dette tar unna dupliserte leveringer, flertrinns ACH-hendelser (venter → oppgjort) og tilfellet der `/donate/charge` allerede registrerte gaven optimistisk.
4. **Bruk.** Leverandørens `classifyWebhookEvent(eventType)` sier hva hendelsen betyr: `donation` (venter eller fullført), `cancel-subscription` eller `ignore`. Fullførte betalinger oppretter en `complete`-donasjon, eller oppgraderer en eksisterende `pending`- eller `failed`-donasjon. ACH-lignende hendelser havner som `pending` til oppgjør. En mislykket abonnementsfaktura (Stripe `invoice.payment_failed`) oppretter en `failed`-donasjon nøklet på faktura-id-en. Avslutningshendelser sletter den lokale `subscriptions`-raden. Kontrolleren inspiserer aldri leverandørspesifikke hendelsesnavn.

### Mislykkede gjentakende gaver og purring

En `failed`-donasjon er enheten for gjenoppretting. `GET /giving/donations/failed` lister dem med den nyeste feilmeldingen fra gatewayen (fra `eventLogs`) og et `canRetry`-flagg fra gatewayens capabilities. `POST /giving/donate/retry/:donationId` kaller leverandørens `retryFailedPayment` (Stripe betaler den åpne fakturaen), og den resulterende webhooken hever raden til `complete` gjennom den vanlige deduplikeringsveien. Purre-e-poster sendes til giveren fra webhook-håndtereren på dag 0, og deretter fra `DunningHelper.run` i midnattstimeren (koblet i både `lambda/timer-handler.ts` og `RailwayCron.ts`) etter 3 og 7 dager. Hver utsending registreres i `eventLogs` som `provider: "dunning"`, `providerId: "<donationId>:<day>"`, slik at en ny kjøring aldri sender e-post to ganger. Når Stripe gir opp og avslutter abonnementet (`customer.subscription.deleted` med `cancellation_details.reason: "payment_failed"`), sender `DunningHelper.notifyCanceled` én e-post til giveren (`providerId: "<subscriptionId>:canceled"`). Avslutninger initiert av giveren eller admin forblir stille. Stripe legger aldri til hendelser i et eksisterende endepunkt. Etter å ha endret `StripeHelper.webhookEvents` må du enten lagre gatewayen på nytt, eller kjøre `tools/manual/stripe-webhook-events.ts` mot produksjon (tørrkjøring som standard, `--apply` for å skrive).

Leverandører med `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) får sine belastninger registrert fra `/charge`-svaret, så ingen webhook-runde er nødvendig i den vellykkede flyten. Stripe bruker i stedet `payment_intent.succeeded`, `invoice.paid` og ACH `payment_intent.processing`. Gebyrhåndteringen (`POST /giving/donate/fee`, gateway-flagget `payFees` og hver leverandørs `calculateFees`) beregner «dekk gebyrene»-påslaget på giverens side. B1 tar ingen plattformandel, så det legges aldri til noe applikasjonsgebyr.

:::info
Belastnings- og webhook-banene skriver de samme `donations`- og `fundDonations`-radene. `transactionId` er koblingsnøkkelen som hindrer at en optimistisk belastningsregistrering og dens senere webhook gir to donasjoner for én gave.
:::

## Relaterte sider

- [Giving-endepunkter](../api/endpoints/giving): fullt REST-grensesnitt for donasjoner, fond, batcher, gatewayer, abonnementer, betalingsmetoder og webhooks
- [AppHelper](../shared-libraries/app-helper): npm-pakken som leverer register for betalingsleverandører og donasjonskomponenter
- [Modulstruktur](../api/module-structure): hvordan GivingApi-modulen er organisert på serversiden
