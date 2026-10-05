---
title: "Giverarkitektur"
---

# Giverarkitektur

<div class="article-intro">

ChurchApps håndterer gaver etter en gateway-modell: menigheten har sin egen Stripe-konto (eller PayPal, Kingdom Funding eller Paystack), og B1 står aldri i pengestrømmen som plattformens betalingsbehandler. Kortdata tokeniseres i nettleseren og når aldri en ChurchApps-server. Denne siden kartlegger hele stakken — leverandørregisteret på klientsiden i `@churchapps/apphelper`, gateway-abstraksjonen i GivingApi, datamodellen for gaver og hvordan webhooks fra gatewayene avstemmes tilbake i databasen.

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
2. **Én abstraksjon, mange leverandører.** Nettleseren henter en `PaymentProvider` fra et register; serveren henter en `IGatewayProvider` fra en fabrikk. Begge bruker det samme normaliserte leverandørnavnet som er lagret på gateway-posten.
3. **Webhooks er sannhetskilden for oppgjør.** Et belastningssvar registreres optimistisk, men det er gatewayens signerte webhook som bekrefter (eller oppretter) den fullførte gaven, med vern mot duplikater på begge sider.

## Klientsiden: leverandørregisteret for betaling (`@churchapps/apphelper`)

Registeret ligger i `Packages/apphelper/src/donations/providers/`, med hver leverandørs widgets og hjelpere i sin egen undermappe (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — ingenting utenfor `providers/` forgrener seg på leverandørnavn. En `PaymentProvider` (se `providers/types.ts`) samler alt en vertsapp trenger for én gateway: en `descriptor` (administratoretiketter, støttede valutaer, gebyrfelt, standard gebyrsatser, URL-er til dashbord/registrering), et `capabilities`-sett med flagg (lagrede kort, ACH, gjentakende, inntasting av nytt kort på stedet, implisitt lagring ved tokenisering), React-widgetene for medlemsinntasting (`MemberWrapper`/`MemberEntry`), gavegiving som gjest (`GuestForm`), redigering av lagrede betalingsmåter (`MethodEditForm`) og betalinger i skjemaspørsmål (`FormPayment`), pluss `buildChargeRequest(ctx, token)` — det ene stedet der formen på belastningsnyttelasten er forskjellig per leverandør. Hver leverandørs `MemberWrapper` laster sin egen SDK fra gateway-postens offentlige nøkkel, slik at vertsapper aldri importerer en gateway-SDK (B1App og B1Admin har ingen `@stripe/*`-avhengighet). `pickDefaultGateway(gateways, capability?)` samler på ett sted valget av hvilken av menighetens gatewayer en flate skal bruke.

`providers/registry.ts` rommer de innebygde. De **refereres til som verdier**, ikke registreres gjennom en sideeffekt i en modul, slik at bundlerens tree-shaking aldri kan fjerne registreringen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funksjon | Formål |
|----------|---------|
| `getPaymentProvider(name)` | Hent etter normalisert navn; faller tilbake til Stripe slik at en feilkonfigurert leverandør aldri krasjer giverskjemaet |
| `registerPaymentProvider(p)` | Registrer en ekstra leverandør under kjøring (for en vertsapps egen gateway) |
| `listPaymentProviders()` | List opp innebygde + egne — brukes til å bygge nedtrekkslisten for gateway i administrasjonen |
| `hasPaymentProvider(name)` | Sjekk om den finnes |

**Innebygde klientleverandører: Stripe, PayPal, Kingdom Funding, Paystack.** B1App og B1Admin bare *leser* registeret (`getPaymentProvider`, `listPaymentProviders`); ingen av dem kaller `registerPaymentProvider` — registreringen forblir inne i apphelper.

Hver leverandør tokeniserer på sin måte, men alle holder kortet utenfor B1:

| Leverandør | Inntastingswidget | Token som returneres til API-et |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; gjesteskjemaet monterer også en `ExpressCheckoutElement` (Apple Pay / Google Pay, engangsgaver) hvis `onConfirm` ender i den samme `pm_…`-ID-en | betalingsmåte-ID (`pm_…`); bank via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` for USD-gatewayer, kanadisk PAD `acss_debit` (modal for vert-hostet fullmakt, fullmakt `default_for` fakturaer/abonnementer, engangsbelastninger sender fullmakts-ID-en) for CAD-gatewayer |
| Kingdom Funding | Vert-hostet tokeniseringsskjema styrt av gatewayens offentlige nøkkel | engangs-nonce |
| PayPal | PayPal Hosted Fields (kort, gjentakende) pluss PayPal Smart Buttons med Venmo-finansiering (engangs); begge deler én SDK-lasting og serverordren som bygges via `/donate/client-token` + `/donate/create-order` | fullført ordre-ID |
| Paystack | Paystack Inline-popup (`js.paystack.co/v2/inline.js`) — selve popupen tar imot betalingen (kort, mobilpenger, bankoverføring, USSD) | betalt transaksjonsreferanse; lagrede betalingsmåter er Paystack `AUTH_…`-autorisasjonskoder |

Stripes `finalizeResult` kjører 3-D Secure / SCA i nettleseren (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) før gaven regnes som fullført; det delte skjemaet kaller bare `provider.finalizeResult(result)` uten å vite hva den gjør.

## Serversiden: gateway-abstraksjonen (GivingApi)

`/giving`-modulen (`Api/src/modules/giving`) eksponerer REST-flaten; gateway-rørleggerarbeidet ligger i `Api/src/shared/helpers`. `DonateController` snakker aldri direkte med en gateway-SDK — den går gjennom `GatewayService`, som henter riktig `IGatewayProvider` fra `GatewayFactory` og gir den en dekryptert `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) er kontrakten som hver gateway implementerer — livssyklus for webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betaling (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), gebyrer (`calculateFees`), håndtering av lagrede betalingsmåter (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) og valgfrie tillegg (kunder, ordrer, SetupIntents, avspilling av hendelser, `retryFailedPayment` for en mislykket abonnementsfaktura, `registerPaymentMethodDomain` for domeneverifisering for Apple Pay). En leverandør som utelater en valgfri hook, rapporteres som ikke støttet for den handlingen, og brukergrensesnittet skjuler kontrollen. Hver leverandørklasse deklarerer sin egen `capabilities`-matrise (støttede valutaer, ACH, refusjoner, krav til abonnement, transaksjonsgrenser) — `GatewayService.getProviderCapabilities(provider)` leser den bare — og flagg som `logsDonationsImmediately` styrer kontrollernes oppførsel uten noen betingelser på leverandørnavn i kontrollerne.

**Serverleverandører registrert i `GatewayFactory`:**

| Leverandør | Tilgjengelighet |
|----------|-------------|
| Stripe | Alltid på |
| PayPal | Alltid på |
| Kingdom Funding | Alltid på |
| Paystack | Alltid på (selgere i Nigeria, Ghana, Sør-Afrika, Kenya og Elfenbenskysten; valutaene NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Må velges aktivt via miljøflagget `ENABLE_SQUARE` |
| ePayMints | Må velges aktivt via miljøflagget `ENABLE_EPAYMINTS` |

Paystack skiller seg fra de andre ved at pengene flyttes før GivingApi er involvert: popupen belaster giveren, `processCharge` er en `GET /transaction/verify/:reference` der det betalte beløpet og valutaen må samsvare med gaven som registreres (en referanse som allerede finnes, logges aldri to ganger), og den første gaven i en gjentakende plan logges fra `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` med `start_date` ett intervall fram). Webhooks signeres med selve hemmelige nøkkelen (`x-paystack-signature`, HMAC-SHA512 over råbodyen), og Paystack har ikke noe API for administrasjon av webhooks, så administrasjonsskjermen viser URL-en som menigheten limer inn i sitt dashbord. `charge.success`-hendelser ved fornyelse har ingen fordeling på fond; leverandøren gjenoppretter den fra giverens lokale `subscriptions`-/`subscriptionFunds`-rader. Bare kortautorisasjoner er `reusable` — gaver med mobilpenger er bare engangsgaver, så `createSubscription` avviser dem. Demodataene legger inn en andre menighet (Accra Community Church, `CHU00000002`) på en Paystack-gateway i testmodus med GHS, slik at Paystack-Playwright-testene kjører ved siden av Graces Stripe-tester.

Egne leverandører kan registreres under kjøring når `ENABLE_CUSTOM_GATEWAY_PROVIDERS` er satt; `AbstractExperimentalGatewayProvider` er baseklassen for disse. Leverandørnavn sammenlignes uten hensyn til store og små bokstaver.

### Gateway-konfigurasjon og hemmeligheter

En administrator lagrer gateway-legitimasjon via `POST /giving/gateways` (`GatewayController`). Ved lagring krypterer kontrolleren den private nøkkelen og webhook-nøkkelen med `EncryptionHelper` før de lagres, og — på alle verter som ikke er localhost — sletter den menighetens eksisterende webhook og oppretter en ny som peker til `/giving/donate/webhook/{provider}?churchId=…`. En menighet har én rad per leverandør: å lagre en gateway erstatter bare den eksisterende raden for den samme leverandøren. Offentlige lesinger (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnerer bare offentlige nøkler.

## Datamodell

Giverskjemaet (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller i `models/`) er et MySQL-skjema som nås gjennom Kysely:

| Tabell | Rolle |
|-------|------|
| `gateways` | Leverandørkonfigurasjon per menighet: `provider`, `publicKey`, krypterte `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Giverformål (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppering for registrering/rapportering (`name`, `batchDate`) |
| `donations` | Én gave: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; giveroppgaver, totaler, dashbord og gaverapporter teller bare `complete` eller null), `transactionId` |
| `fundDonations` | Fordeling av en gave på ett eller flere fond (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Gjentakende gave; `id` er gatewayens abonnements-ID, knyttet til `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fordeling på fond for en gjentakende gave |
| `customers` | Knytter en `personId` til dens gateway-kunde-ID, per `provider` |
| `gatewayPaymentMethods` | Lagrede kort/banker: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Revisjonsspor for webhooks/hendelser og nøkkel for duplikatkontroll (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Løftekampanjer knyttet til et fond, og hver persons lovede beløp |

En gave fordeles på fond gjennom `fundDonations` — gaven bærer totalen, hver `fundDonation` bærer en andel. `donations.currency` og `gateways.currency` bærer ISO-valutaen; hver leverandør oppgir sine `supportedCurrencies`, og beløp formateres med `CurrencyHelper.formatCurrencyWithLocale`.

## Flyter fra ende til ende

### Medlem, engangs og gjentakende (B1App)

Den autentiserte giverskjermen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setter sammen tre apphelper-komponenter: `MultiGatewayDonationForm`, `PaymentMethods` og `RecurringDonations`. B1App står for datainnlastingen rundt — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — og sender gateway-listen videre; den valgte leverandøren laster sin egen SDK fra gatewayens offentlige nøkkel. Selve belastningen skjer inne i apphelper: den valgte leverandøren tokeniserer den (nye eller lagrede) betalingsmåten og sender deretter til `/giving/donate/charge` for en engangsgave eller `/giving/donate/subscribe` for en gjentakende. Begge endepunktene knytter en innlogget giver til vedkommendes egen `personId` (bare innehavere av `donations.edit` kan knytte til en annen) og avviser fordelinger på fond som summerer seg til mer enn det belastede beløpet. Gjentakende gaver oppretter en `subscriptions`-rad pluss `subscriptionFunds` og overlater planen til gatewayen (Stripe Subscriptions, PayPal Billing Plans eller en gjentakende plan hos KF).

### Gjestegaver / anonyme gaver

Den offentlige giversiden (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) og panelet «gi nå» viser `NonAuthDonationWrapper` fra `@churchapps/apphelper/website`, som legger reCAPTCHA og gatewayens Elements-kontekst rundt leverandørens `GuestForm`. Gjester får ingen innlogging, ingen lagrede betalingsmåter og ingen historikk. Flyten henter `GET /giving/funds/churchId/:id` og `GET /giving/donate/gateways/:churchId` (bare offentlige nøkler), verifiserer den besøkende med `POST /giving/donate/captcha-verify`, tokeniserer i nettleseren og sender til `/giving/donate/charge` (eller `/subscribe`). ACH for gjester bruker det anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`.

Tre valg i gjesteskjemaet følger med det samme belastningskallet. `?fundId=` og `?amount=` i giver-URL-en forhåndsvelger fordelingen på fond (leses av hver leverandørs gjesteskjema ved montering og sendes gjennom den vanlige håndtereren for fondsendring slik at totaler og gebyrer oppdateres). `anonymous: true` gjør at `DonateController.charge` forkaster enhver person klienten sendte og logger gaven med `personId = null`; gjesteskjemaet hopper over `/people/loadOrCreate` og kunde-/hvelvtrinnet, og de tre leverandørene som logger umiddelbart, slutter å hente en person fra gateway-kunden. Apple Pay krever at sidens domene er registrert hos Stripe, så et Stripe-gjesteskjema sender én gang per økt til det offentlige, hastighetsbegrensede `POST /giving/donate/register-domain`, som bare godtar et domene som tilhører menigheten (`<subDomain>.b1.church`, en rad i innholdsmodulens domenetabell, eller en lokal vert) før det kaller Stripes API for betalingsmåte-domener.

### Administratorregistrering og Stripe-import (B1Admin)

Gaveseksjonen i B1Admin (`B1Admin/src/donations/`) er der økonomiteamene jobber. Batch-registrering (`components/BulkDonationEntry.tsx`) registrerer kontant-/sjekk-/naturagaver ved å sende `/giving/donations` og deretter `/giving/funddonations` — ingen gateway er involvert. Fond, bunter, kampanjer og giveroppgaver tilsvarer hver sine `/giving/*`-CRUD-ruter. Giverpanelet i medlemsstil (`B1Admin/src/donationComponents/`) gjenbruker de samme apphelper-komponentene som B1App.

Rapportering og overleveringer til regnskap er arbeid på klienten eller i rapportkjøreren, ikke gateway-arbeid: QuickBooks-eksporten på bunt-siden bygger en CSV med journalposter fra buntens `donations` + `fundDonations` (debet Undeposited Funds, én kreditt per fond), fanen Lapsed Givers kjører `Api/reports/lapsedGivers.json` gjennom den generiske rapportkjøreren der personnavn løses opp av `ReportOutput`, og landsspesifikke kvitteringsformater (Canada / Australia / New Zealand) er menighetsinnstillinger i nøkkel/verdi-lageret for medlemskap, gjengitt av `GivingStatementDocument` og duplisert i utskriftssiden i B1App.

### Konvertering av totaler i blandede valutaer

Ethvert endepunkt som returnerer én samlet total for gaver i muligens blandede valutaer — nøkkeltallene i giveroppsummeringen (`GivingKpiCards`), en totalsum for en gavebunt, en totalsum for et fond og totalene hittil i år/for perioden på giverskjermen i B1App — konverterer til menighetens standardvaluta på serveren i stedet for å summere ulike valutaer. `Api/src/shared/helpers/ExchangeRateHelper.ts` henter kurser fra `api.frankfurter.dev` med menighetens valuta som nøkkel, mellomlagrer dem i prosessen i 12 timer og eksponerer `convertTotals(rows, churchCurrency, rates)`: radene er på forhånd gruppert etter valuta i SQL (en håndfull grupper, aldri konvertering per gave), hver gruppe konverteres og summeres, og resultatet bærer et `isConverted`-flagg som klienten bruker til å vise en merknad om «Converted at current exchange rates». `GET /donations/exchange-rates` eksponerer kurstabellen for klienter som trenger den (giverskjermen i B1App); selve kursene godtas aldri fra en forespørsel, de hentes alltid bare på serveren, slik at en klient ikke kan påvirke en rapportert total. Enkeltgaver og historiske rapporter/rapporter i opprinnelig valuta konverteres aldri — bare samlede totaler.

Stripe-importen (`B1Admin/src/donations/StripeImportPage.tsx`) fyller inn gaver gitt utenfor B1: den kaller `POST /giving/donate/replay-stripe-events` med `dryRun: true` for en forhåndsvisning, deretter `dryRun: false` for å importere. Serveren lister Stripe-hendelser for datointervallet og hopper over alt som allerede er registrert — avstemt først mot `eventLogs`-leverandørens ID, deretter mot `DonationRepo.findMatchingDonation` (beløp + dato + person), slik at en ny kjøring aldri importerer to ganger.

## Webhooks og avstemming

Gjennomførte betalinger og endringer i abonnementstilstand kommer til `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Behandlingen er bevisst idempotent:

1. **Verifiser** — `GatewayService.verifyWebhook` delegerer til leverandørens signatursjekk; en mislykket signatur gir 401. Hendelser som ikke trenger behandling, avsluttes tidlig med 200.
2. **Fjern duplikater av hendelsen** — `EventLogRepo.loadByProviderId` hopper over en webhook som allerede er registrert i `eventLogs`.
3. **Fjern duplikater av gaven** — før noe opprettes, sjekkes `DonationRepo.loadByTransactionId` mot hver kandidat-ID nyttelasten kan bære. Dette fanger opp dobbeltlevering, ACH-hendelser i flere trinn (pending → settled) og tilfellet der `/donate/charge` allerede har logget gaven optimistisk.
4. **Bruk** — leverandørens `classifyWebhookEvent(eventType)` sier hva hendelsen betyr (`donation` pending/complete, `cancel-subscription` eller `ignore`); fullførte betalinger oppretter en `complete`-gave (eller løfter en eksisterende `pending` eller `failed` opp), ACH-lignende hendelser havner som `pending` til oppgjør, en mislykket abonnementsfaktura (Stripe `invoice.payment_failed`) oppretter en `failed`-gave med faktura-ID-en som nøkkel, og kanselleringshendelser sletter den lokale `subscriptions`-raden. Kontrolleren inspiserer aldri leverandørspesifikke hendelsesnavn.

### Mislykkede gjentakende gaver og purring

En `failed`-gave er arbeidsenheten for gjenoppretting. `GET /giving/donations/failed` lister dem med den nyeste gateway-feilmeldingen fra `eventLogs` og et `canRetry`-flagg fra gatewayens muligheter; `POST /giving/donate/retry/:donationId` kaller leverandørens `retryFailedPayment` (Stripe betaler den åpne fakturaen), og den resulterende webhooken løfter raden til `complete` gjennom den vanlige duplikatkontrollen. E-poster om purring sendes til giveren fra webhook-håndtereren på dag 0, deretter fra `DunningHelper.run` i midnattstimeren (koblet inn i både `lambda/timer-handler.ts` og `RailwayCron.ts`) etter 3 og 7 dager; hver sending registreres i `eventLogs` som `provider: "dunning"`, `providerId: "<donationId>:<day>"`, slik at en ny kjøring aldri sender e-post to ganger. Når Stripe gir opp og kansellerer abonnementet (`customer.subscription.deleted` med `cancellation_details.reason: "payment_failed"`), sender `DunningHelper.notifyCanceled` giveren én e-post (`providerId: "<subscriptionId>:canceled"`); kanselleringer startet av giveren eller en administrator er stille. Stripe legger aldri til hendelser på et eksisterende endepunkt: etter at `StripeHelper.webhookEvents` er endret, må du enten lagre gatewayen på nytt eller kjøre `tools/manual/stripe-webhook-events.ts` (prøvekjøring som standard, `--apply` for å skrive) mot produksjon.

Leverandører med `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) får belastningene sine logget fra `/charge`-svaret (ingen webhook-runde kreves for den gunstige veien), mens Stripe er avhengig av `payment_intent.succeeded` / `invoice.paid` og ACH `payment_intent.processing`. Gebyrhåndteringen (`POST /giving/donate/fee`, gateway-flagget `payFees` og hver leverandørs `calculateFees`) beregner påslaget for «dekk gebyrene» på giverens side — B1 tar ingen plattformandel, så noe applikasjonsgebyr legges aldri til.

:::info
Belastnings- og webhook-veiene skriver de samme `donations`-/`fundDonations`-radene. `transactionId` er koblingsnøkkelen som hindrer at en optimistisk belastningslogg og den senere webhooken gir to gaver for én gave.
:::

## Relaterte sider

- [Endepunkter for gaver](../api/endpoints/giving) — hele REST-flaten for gaver, fond, bunter, gatewayer, abonnementer, betalingsmåter og webhooks
- [AppHelper](../shared-libraries/app-helper) — npm-pakken som leverer leverandørregisteret for betaling og gavekomponentene
- [Modulstruktur](../api/module-structure) — hvordan GivingApi-modulen er organisert på serversiden
