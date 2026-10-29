---
title: "Giving-arkitektur"
---

# Giving-arkitektur

<div class="article-intro">

ChurchApps kjører gaver etter en gateway-modell: kirken beholder sin egen Stripe- (eller PayPal-, Kingdom Funding- eller Paystack-) konto, og B1 er aldri i pengestrømmen som en plattformprosessor. Kortdata tokeniseres i nettleseren og når aldri en ChurchApps-server. Denne siden kartlegger hele stakken — det klientsidige leverandørregisteret i `@churchapps/apphelper`, GivingApi-gateway-abstraksjonen, gavedatamodellen, og hvordan gateway-webhooks avstemmes tilbake til databasen.

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

Tre prinsipper gjelder gjennom hele stakken:

1. **Gatewayen holder kortet.** Hver leverandørs inntastingswidget tokeniserer i nettleseren; API-et mottar bare et token, en nonce eller en ordre-ID.
2. **Én abstraksjon, mange leverandører.** Nettleseren løser en `PaymentProvider` fra et register; serveren løser en `IGatewayProvider` fra en fabrikk. Begge bruker det samme normaliserte leverandørnavnet som er lagret på gateway-posten.
3. **Webhooks er sannhetskilden for oppgjør.** Et belastningssvar registreres optimistisk, men gatewayens signerte webhook er det som bekrefter (eller oppretter) den fullførte gaven, med idempotensvern på begge sider.

## Klientsiden: betalingsleverandørregisteret (`@churchapps/apphelper`)

Registeret ligger i `Packages/apphelper/src/donations/providers/`, med hver leverandørs widgets og hjelpere i sin egen undermappe (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — ingenting utenfor `providers/` forgrener på et leverandørnavn. En `PaymentProvider` (se `providers/types.ts`) samler alt en vertsapp trenger for én gateway: en `descriptor` (etiketter for administrator, støttede valutaer, gebyrfelt, standard gebyrsatser, dashbord-/registreringsadresser), et `capabilities`-flaggsett (lagrede kort, ACH, gjentakende, inline inntasting av nytt kort, implisitt lagring ved tokenisering), React-widgets for medlemsinntasting (`MemberWrapper`/`MemberEntry`), gaver som gjest (`GuestForm`), redigering av lagret metode (`MethodEditForm`), og betalinger for skjemaspørsmål (`FormPayment`), pluss `buildChargeRequest(ctx, token)` — det ene stedet der belastningsnyttelastens form varierer per leverandør. Hver leverandørs `MemberWrapper` laster sin egen SDK fra gateway-postens offentlige nøkkel, så vertsapper importerer aldri en gateway-SDK (B1App og B1Admin har ingen `@stripe/*`-avhengighet). `pickDefaultGateway(gateways, capability?)` samler hvilken av kirkens gatewayer en flate skal bruke.

`providers/registry.ts` holder de innebygde. De er **referert etter verdi**, ikke registrert gjennom en modulbiverknad, så tree-shaking i en bundler aldri kan fjerne registreringen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funksjon | Formål |
|----------|---------|
| `getPaymentProvider(name)` | Løs etter normalisert navn; faller tilbake til Stripe slik at en feilkonfigurert leverandør aldri krasjer gavesskjemaet hardt |
| `registerPaymentProvider(p)` | Registrer en ekstra leverandør under kjøring (for en vertsapps egendefinerte gateway) |
| `listPaymentProviders()` | Oppramsing av innebygde + egendefinerte — brukes til å bygge administratorens gateway-nedtrekksliste |
| `hasPaymentProvider(name)` | Medlemskapssjekk |

**Innebygde klientleverandører: Stripe, PayPal, Kingdom Funding, Paystack.** B1App og B1Admin *leser* bare registeret (`getPaymentProvider`, `listPaymentProviders`); ingen av dem kaller `registerPaymentProvider` — registrering forblir inne i apphelper.

Hver leverandør tokeniserer forskjellig, men alle holder kortet utenfor B1:

| Leverandør | Inntastingswidget | Token returnert til API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; gjesteskjemaet monterer også en `ExpressCheckoutElement` (Apple Pay / Google Pay, engangsgaver) hvis `onConfirm` løses til samme `pm_…`-ID | betalingsmetode-ID (`pm_…`); bank via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` for USD-gatewayer, kanadisk PAD `acss_debit` (hostet mandatmodal, mandat `default_for` fakturaer/abonnementer, engangsbelastninger sender mandat-ID) for CAD-gatewayer |
| Kingdom Funding | Hostet tokenizer-skjema nøklet på gatewayens offentlige nøkkel | engangs-nonce |
| PayPal | PayPal Hosted Fields (kort, gjentakende) pluss PayPal Smart Buttons med Venmo-finansiering (engangs); begge deler én SDK-lasting, og serverordren bygges via `/donate/client-token` + `/donate/create-order` | fanget ordre-ID |
| Paystack | Paystack Inline-popup (`js.paystack.co/v2/inline.js`) — selve popupen tar betalingen (kort, mobilpenger, banköverføring, USSD) | betalt transaksjonsreferanse; lagrede metoder er Paystack `AUTH_…`-autorisasjonskoder |

Stripes `finalizeResult` kjører 3-D Secure / SCA i nettleseren (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) før gaven regnes som fullført; det delte skjemaet kaller bare `provider.finalizeResult(result)` uten å vite hva som skjer.

## Serversiden: gateway-abstraksjonen (GivingApi)

`/giving`-modulen (`Api/src/modules/giving`) eksponerer REST-flaten; gateway-rørleggingen ligger i `Api/src/shared/helpers`. `DonateController` snakker aldri direkte med en gateway-SDK — den går gjennom `GatewayService`, som løser riktig `IGatewayProvider` fra `GatewayFactory` og gir den en dekryptert `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) er kontrakten hver gateway implementerer — webhook-livssyklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betaling (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), gebyrer (`calculateFees`), håndtering av lagrede metoder (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), og valgfrie tillegg (kunder, ordrer, SetupIntents, hendelsesreplay, `retryFailedPayment` for en mislykket abonnementsfaktura, `registerPaymentMethodDomain` for Apple Pay-domeneverifisering). En leverandør som utelater en valgfri krok, rapporteres som ikke støttet for den handlingen, og brukergrensesnittet skjuler kontrollen. Hver leverandørklasse erklærer sin egen `capabilities`-matrise (støttede valutaer, ACH, refusjoner, abonnementskrav, transaksjonsgrenser) — `GatewayService.getProviderCapabilities(provider)` leser den bare — og flagg som `logsDonationsImmediately` styrer kontrollerens oppførsel uten noen leverandørnavnbetingelser i kontrollerne.

**Serverleverandører registrert i `GatewayFactory`:**

| Leverandør | Tilgjengelighet |
|----------|-------------|
| Stripe | Alltid på |
| PayPal | Alltid på |
| Kingdom Funding | Alltid på |
| Paystack | Alltid på (Nigeria, Ghana, Sør-Afrika, Kenya, Elfenbenskysten-handelsmenn; valutaer NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in via miljøflagget `ENABLE_SQUARE` |
| ePayMints | Opt-in via miljøflagget `ENABLE_EPAYMINTS` |

Paystack skiller seg fra de andre ved at pengene flytter seg før GivingApi er involvert: popupen belaster giveren, `processCharge` er en `GET /transaction/verify/:reference` der den betalte summen og valutaen må samsvare med gaven som registreres (en referanse som allerede finnes, logges aldri to ganger), og første gave i en gjentakende plan logges fra `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` med `start_date` ett intervall fram). Webhooks signeres med selve den hemmelige nøkkelen (`x-paystack-signature`, HMAC-SHA512 over den rå body), og Paystack har ikke noe webhook-administrasjons-API, så administratorskjermen viser URL-en for kirken å lime inn i dashbordet sitt. Fornyelses-`charge.success`-hendelser inneholder ingen fondsfordeling; leverandøren henter den fra giverens lokale `subscriptions`-/`subscriptionFunds`-rader. Bare kortautorisasjoner er `reusable` — mobilpengegaver er bare engangs, så `createSubscription` avviser dem. Demodataene seeder en andre kirke (Accra Community Church, `CHU00000002`) på en Paystack-testmodus GHS-gateway, slik at Paystack-Playwright-testsuiten kjører ved siden av Graces Stripe-suite.

Egendefinerte leverandører kan registreres under kjøring når `ENABLE_CUSTOM_GATEWAY_PROVIDERS` er satt; `AbstractExperimentalGatewayProvider` er basisklassen for dem. Leverandørnavn matches uten hensyn til store/små bokstaver.

### Gatewaykonfigurasjon og hemmeligheter

En administrator lagrer gateway-legitimasjon via `POST /giving/gateways` (`GatewayController`). Ved lagring krypterer kontrolleren de private og webhook-nøklene med `EncryptionHelper` før lagring, og — på en hvilken som helst vert som ikke er localhost — sletter kirkens eksisterende webhook og klargjør en ny som peker til `/giving/donate/webhook/{provider}?churchId=…`. En kirke har én rad per leverandør: lagring av en gateway erstatter bare den eksisterende raden for samme leverandør. Offentlige lesinger (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnerer bare offentlige nøkler.

## Datamodell

Giving-skjemaet (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller i `models/`) er et MySQL-skjema som nås gjennom Kysely:

| Tabell | Rolle |
|-------|-------|
| `gateways` | Konfigurasjon per leverandør for kirken: `provider`, `publicKey`, kryptert `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Gaveformål (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppering for inntasting/rapportering (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | En gave: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; oppgaver, summer, dashbord og gaverapporter teller bare `complete` eller null), `transactionId` |
| `fundDonations` | Fordeling av en gave på ett eller flere fond (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Gjentakende gave; `id` er gatewayens abonnements-ID, knyttet til `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondsfordeling for en gjentakende gave |
| `customers` | Kobler en `personId` til dens gateway-kunde-ID, per `provider` |
| `gatewayPaymentMethods` | Lagrede kort/banker: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Revisjonsspor for webhook/hendelser og deduplikasjonsnøkkel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Løftekampanjer knyttet til et fond, og hver persons lovede beløp |

En gave deles mellom fond gjennom `fundDonations` — gaven bærer totalen, og hver `fundDonation` bærer en skive. `donations.currency` og `gateways.currency` bærer ISO-valutaen; hver leverandør annonserer sine `supportedCurrencies`, og beløp formateres med `CurrencyHelper.formatCurrencyWithLocale`.

## Ende-til-ende-flyter

### Medlem, engangs og gjentakende (B1App)

Den innloggede gavesiden (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setter sammen tre apphelper-komponenter: `MultiGatewayDonationForm`, `PaymentMethods` og `RecurringDonations`. B1App gjør databehandlingen rundt — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — og sender gateway-listen videre; den løste leverandøren laster sin egen SDK fra gatewayens offentlige nøkkel. Selve belastningen skjer i apphelper: den løste leverandøren tokeniserer den (nye eller lagrede) metoden, og sender deretter til `/giving/donate/charge` for en engangsgave eller `/giving/donate/subscribe` for en gjentakende. Begge endepunktene tilskriver en innlogget giver til sin egen `personId` (bare innehavere av `donations.edit` kan tilskrive noen andre), og avviser fondsfordelinger som summerer til mer enn det belastede beløpet. Gjentakende gaver oppretter en `subscriptions`-rad pluss `subscriptionFunds`, og overleverer planen til gatewayen (Stripe Subscriptions, PayPal Billing Plans, eller en KF-gjentakende plan).

### Gjest / anonym giving

Den offentlige gavesiden (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) og panelet «gi nå» rendrer `NonAuthDonationWrapper` fra `@churchapps/apphelper/website`, som injiserer reCAPTCHA og gatewayens Elements-kontekst rundt leverandørens `GuestForm`. Gjester får ingen innlogging, ingen lagrede metoder og ingen historikk. Flyten henter `GET /giving/funds/churchId/:id` og `GET /giving/donate/gateways/:churchId` (bare offentlige nøkler), verifiserer den besøkende med `POST /giving/donate/captcha-verify`, tokeniserer i nettleseren, og sender til `/giving/donate/charge` (eller `/subscribe`). Verifiseringskallet returnerer en 10 minutter lang HMAC-signert `captchaPass` (`Api/src/modules/giving/helpers/CaptchaPass.ts`) som skjemaet sender med hvert gjestepengekall; med `CAPTCHA_ENFORCE=true` avviser API-et gjestekall til `create-order`, `charge`, `subscribe`, `addcard` og `ach-setup-intent-anon` uten et gyldig pass for den kirken. Gjeste-ACH bruker det anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`, som bare tillater øyeblikkelig verifisering (Financial Connections): en mikrobeløpskontroll fullføres dager senere, etter at gjestesiden er borte, så den kunne aldri fullføre gaven. Skjemaet nekter å belaste et uverifisert SetupIntent og peker giveren til kort eller en bankoppsett for innlogget bruker.

Tre valg for gjesteskjemaet bruker samme belastningskall. `?fundId=` og `?amount=` på gave-URL-en forhåndsvelger fondsfordelingen (leses av hver leverandørs gjesteskjema ved montering, og går gjennom den vanlige fondsendringsbehandleren slik at summer og gebyrer oppdateres). `anonymous: true` gjør at `DonateController.charge` forkaster enhver person klienten sendte og logger gaven med `personId = null`; gjesteskjemaet hopper over `/people/loadOrCreate` og kunde-/hvelvsteget, og de tre umiddelbart-loggende leverandørene slutter å løse en person fra gateway-kunden. Apple Pay krever at sidens domene er registrert hos Stripe, så et Stripe-gjesteskjema poster én gang per økt til det offentlige, hastighetsbegrensede `POST /giving/donate/register-domain`, som bare godtar et domene som tilhører kirken (`<subDomain>.b1.church`, en rad i content-modulens domenetabell, eller en lokal vert) før det kaller Stripes API for betalingsmetodedomener.

### Administrator-registrering og Stripe-import (B1Admin)

Giving-delen i B1Admin (`B1Admin/src/donations/`) er der økonomiteamene jobber. Partiinntasting (`components/BulkDonationEntry.tsx`) registrerer kontant-/sjekk-/naturalgaver ved å poste `/giving/donations` og deretter `/giving/funddonations` — ingen gateway involvert. Personpostens **Logg en gave**-ark (`components/LogGiftDialog.tsx`) gjør det samme for en enkelt gave, først ved å finne partiet hvis `batchDate` samsvarer med gavedatoen eller opprette ett som heter etter den datoen (`POST /giving/donationbatches`), og slette gaven/det nye partiet igjen hvis et senere steg mislykkes. Fond, partier, kampanjer og oppgaver kobler hver til sine `/giving/*` CRUD-ruter; sidene for gaveoversikter (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) ber om ett kalenderår med `GET /donations?startDate=&endDate=` og `GET /fundDonations?startDate=&endDate=` i stedet for kirkens fulle historikk, som kunne overskride Lambdas responsstørrelsesgrense. Gavepanelet i stil med medlemmer (`B1Admin/src/donationComponents/`) gjenbruker de samme apphelper-komponentene som B1App.

Rapportering og regnskapsoverleveringer er klientside- eller rapportkjøringsarbeid, ikke gateway-arbeid: partiets QuickBooks-eksport bygger en journalpost-CSV fra partiets `donations` + `fundDonations` (debet på Ikke innsatte midler, én kredit per fond), oppsummeringssidens visning «Tidligere givere» kjører `Api/reports/lapsedGivers.json` gjennom den generiske rapportkjøreren med personnavn løst av `ReportOutput`, og landsspesifikke kvitteringsformater (Canada / Australia / New Zealand) er kirkeinnstillinger i membership-nøkkelverdi-lageret som rendres av `GivingStatementDocument` og dupliseres på B1Apps utskriftsside. B1Admins utskriftssider for oppgaver (`PrintDonationPage`, `PrintAllStatementsPage`) sender kirkens `logoLight`-innstilling (via `usePrintLogo` i `B1Admin/src/components/PrintChurchHeader.tsx`), slik at logoen skrives ut øverst på hver oppgave, og venter på bildet før automatisk utskrift.

### Partistatus og tillatelsen Registrer gaver

Partier kan lukkes slik at en telt innskudd forblir som den var. `POST /giving/donationbatches/:id/close` og `/:id/reopen` (kun Donations.Edit) er de eneste som skriver `status`, `closedDate` og `closedBy` (`DonationBatchRepo.setStatus`); en vanlig partilagring rører dem aldri, så innsending av et parti kan ikke gjenåpne det. Skrivetilgang samles i `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit kan endre alt, mens den smalere tillatelsen Donations.Enter (`GivingApi` / `Donations` / `Enter`, «Registrer gaver» i rolleredigeringen) kan opprette partier og lagre eller slette gaver og fondsfordelinger bare så lenge både gavens nåværende parti og målpartiet er åpne, og aldri for en gatewaygave (en med `transactionId`). En blokkert skriving returnerer `403 { error: "This batch is closed." }`. Å lese partier godtar Donations.ViewSummary eller Donations.Enter, slik at en teller kan velge partiet de registrerer i. På klientsiden speiler `B1Admin/src/donations/batchAccess.ts` disse reglene (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), og `Header` / `SecondaryMenuHelper` viser **Gaver > Partier** for alle som kan se partier, selv uten View Summary.

### Konvertering av blandede valutasummer

Ethvert endepunkt som returnerer en enkelt samlet sum på tvers av muligens blandede valutagaver — giving-sammendragets KPI-kort (`GivingKpiCards`), et partis sum, en fondssum, og B1Apps gavesides år-til-dato-/periodesummer — konverterer til kirkens standardvaluta på serveren i stedet for å summere ulike valutaer. `Api/src/shared/helpers/ExchangeRateHelper.ts` henter kurser fra `api.frankfurter.dev` nøklet på kirkevalutaen, cacher dem i prosessen i 12 timer, og eksponerer `convertTotals(rows, churchCurrency, rates)`: rader er forhåndsgruppert etter valuta i SQL (noen få grupper, aldri en konvertering per gave), hver gruppe konverteres og summeres, og resultatet bærer et `isConverted`-flagg som klienten bruker til å vise en merknad «Konvertert til gjeldende valutakurs». `GET /donations/exchange-rates` eksponerer kurstabellen for klienter som trenger den (B1Apps gavesides); kursene aksepteres aldri fra en forespørsel, bare hentes på serveren, så en klient ikke kan påvirke en rapportert sum. Enkeltgaverposter og historiske rapporter i originalvaluta konverteres aldri — bare samlede summer.

Stripe-import (`B1Admin/src/donations/StripeImportPage.tsx`) fyller inn gaver gjort utenfor B1: den kaller `POST /giving/donate/replay-stripe-events` med `dryRun: true` for en forhåndsvisning, deretter `dryRun: false` for å importere. Serveren lister Stripe-hendelser for datointervallet og hopper over alt som allerede er registrert — først matchet med `eventLogs`-provider-ID, deretter med transaksjons-ID, deretter med `DonationRepo.findMatchingDonation` (beløp + dato + person), slik at en ny kjøring aldri importerer to ganger. Abonnements-`charge.succeeded` / `payment_intent.succeeded`-hendelser hoppes over fordi `invoice.paid` registrerer disse gavene; nyere Stripe-API-versjoner fjerner `PaymentIntent.invoice`, så hoppingen styres også av beskrivelsen «Subscription …».

## Webhooks og avstemming

Oppgjorte betalinger og endringer i abonnementstilstand kommer til `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Behandlingen er bevisst idempotent:

1. **Verifiser** — `GatewayService.verifyWebhook` delegerer til leverandørens signatursjekk; en mislykket signatur gir 401. Hendelser som ikke trenger behandling avsluttes med 200.
2. **Dedupliser hendelsen** — `EventLogRepo.loadByProviderId` hopper over en webhook som allerede er registrert i `eventLogs`.
3. **Dedupliser gaven** — før noe opprettes, sjekkes `DonationRepo.loadByTransactionId` mot hver kandidat-ID nyttelasten kan bære. Dette absorberer dupliserte leveranser, flertrinns ACH-hendelser (venter → oppgjort), og tilfellet der `/donate/charge` allerede har logget gaven optimistisk.
4. **Bruk** — leverandørens `classifyWebhookEvent(eventType)` sier hva hendelsen betyr (`donation` venter/fullført, `cancel-subscription`, eller `ignore`); fullførte betalinger oppretter en `complete`-gave (eller forfremmer en eksisterende `pending`- eller `failed`-gave), ACH-lignende hendelser lander som `pending` inntil oppgjør, en mislykket abonnementsfaktura (Stripe `invoice.payment_failed`) oppretter en `failed`-gave nøklet på faktura-ID, og avslutningshendelser sletter den lokale `subscriptions`-raden. Kontrolleren inspiserer aldri leverandørspesifikke hendelsesnavn.

### Mislykkede gjentakende gaver og purring

En `failed`-gave er arbeidsenheten for gjenoppretting. `GET /giving/donations/failed` lister dem med den nyeste gateway-feilmeldingen fra `eventLogs` og et `canRetry`-flagg fra gatewayens kapabiliteter; `POST /giving/donate/retry/:donationId` kaller leverandørens `retryFailedPayment` (Stripe betaler den åpne fakturaen), og den resulterende webhooken forfremmer raden til `complete` gjennom den vanlige deduplikasjonsveien. Purre-e-poster går til giveren fra webhook-behandleren på dag 0, deretter fra `DunningHelper.run` i midnattstimeren (koblet i både `lambda/timer-handler.ts` og `RailwayCron.ts`) på dag 3 og 7; hvert utsendelse registreres i `eventLogs` som `provider: "dunning"`, `providerId: "<donationId>:<day>"`, så en ny kjøring aldri sender e-post to ganger. Når Stripe gir opp og avslutter abonnementet (`customer.subscription.deleted` med `cancellation_details.reason: "payment_failed"`), sender `DunningHelper.notifyCanceled` giveren én e-post (`providerId: "<subscriptionId>:canceled"`); avslutninger initiert av giver eller administrator forblir stille. Stripe legger aldri til hendelser på et eksisterende endepunkt: etter å ha endret `StripeHelper.webhookEvents`, lagre gatewayen på nytt eller kjør `tools/manual/stripe-webhook-events.ts` (tørrkjøring som standard, `--apply` for å skrive) mot produksjon.

Leverandører med `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) får belastningene sine logget fra `/charge`-svaret (ingen webhook-rundtur nødvendig for den lykkelige veien), mens Stripe er avhengig av `payment_intent.succeeded` / `invoice.paid` og ACH `payment_intent.processing`. Gebyrhåndtering (`POST /giving/donate/fee`, gateway-flagget `payFees`, og hver leverandørs `calculateFees`) beregner «dekk gebyrene»-oppskalering på giverens side — B1 tar ingen plattformandel, så ingen applikasjonsgebyr legges noen gang til.

:::info
Belastnings- og webhook-veiene skriver de samme `donations` / `fundDonations`-radene. `transactionId` er koblingsnøkkelen som hindrer at en optimistisk belastningslogg og dens senere webhook gir to gaver for én gave.
:::

## Relaterte sider

- [Giving-endepunkter](../api/endpoints/giving) — fullstendig REST-flate for gaver, fond, partier, gatewayer, abonnementer, betalingsmetoder og webhooks
- [AppHelper](../shared-libraries/app-helper) — npm-pakken som leverer betalingsleverandørregisteret og gavekomponentene
- [Modulstruktur](../api/module-structure) — hvordan GivingApi-modulen er organisert på serversiden
