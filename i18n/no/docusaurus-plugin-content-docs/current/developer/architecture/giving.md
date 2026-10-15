---
title: "Giving-arkitektur"
---

# Giving-arkitektur

<div class="article-intro">

ChurchApps kjører gaver etter en modell med gatewayer: kirken beholder sin egen Stripe-konto (eller PayPal, Kingdom Funding eller Paystack), og B1 står aldri i pengestrømmen som en plattformbehandler. Kortdata tokeniseres i nettleseren og når aldri en ChurchApps-server. Denne siden viser hele stacken – registeret for betalingsleverandører på klientsiden i `@churchapps/apphelper`, gatewayabstraksjonen i GivingApi, datamodellen for gaver, og hvordan webhooks fra gatewayene synkroniseres tilbake til databasen.

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

Tre prinsipper gjelder på tvers av hele stacken:

1. **Gatewayen holder kortet.** Hver leverandørs inntastingskomponent tokeniserer i nettleseren; API-et mottar bare et token, en nonce eller en ordre-ID.
2. **Én abstraksjon, mange leverandører.** Nettleseren finner en `PaymentProvider` i et register; serveren finner en `IGatewayProvider` i en fabrikk. Begge bruker det samme normaliserte leverandørnavnet som er lagret på gatewayposten.
3. **Webhooks er kilden til sannheten for oppgjør.** Et svar fra belastningen registreres optimistisk, men gatewayens signerte webhook er det som bekrefter (eller oppretter) den fullførte gaven, med idempotensvern på begge sider.

## Klientsiden: registeret for betalingsleverandører (`@churchapps/apphelper`)

Registeret ligger i `Packages/apphelper/src/donations/providers/`, med hver leverandørs komponenter og hjelpefunksjoner i sin egen undermappe (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) – ingenting utenfor `providers/` forgrener seg på et leverandørnavn. En `PaymentProvider` (se `providers/types.ts`) samler alt en vertsapplikasjon trenger for én gateway: en `descriptor` (etiketter for admin, støttede valutaer, gebyrfelt, standard gebyrsatser, URL-er for dashbord/registrering), et sett med `capabilities` (lagrede kort, ACH, gjentakende, inline inntasting av nytt kort, implisitt lagring ved tokenisering), React-komponentene for medlemsinntasting (`MemberWrapper`/`MemberEntry`), gaver som gjest (`GuestForm`), redigering av lagrede metoder (`MethodEditForm`), og betalinger fra skjemaspørsmål (`FormPayment`), pluss `buildChargeRequest(ctx, token)` – det ene stedet der formatet på belastningsforespørselen varierer per leverandør. Hver leverandørs `MemberWrapper` laster sin egen SDK fra gatewayens offentlige nøkkel, så vertsapplikasjoner aldri importerer en SDK for gatewayer (B1App og B1Admin har ingen `@stripe/*`-avhengighet). `pickDefaultGateway(gateways, capability?)` samler avgjørelsen om hvilken av kirkens gatewayer en flate skal bruke.

`providers/registry.ts` inneholder de innebygde leverandørene. De **refereres etter verdi**, ikke registreres gjennom en sidevirkning i modulen, slik at tree-shaking i bundleren aldri kan fjerne registreringen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funksjon | Formål |
|----------|---------|
| `getPaymentProvider(name)` | Finn etter normalisert navn; faller tilbake til Stripe slik at en feilkonfigurert leverandør aldri krasjer giverskjemaet |
| `registerPaymentProvider(p)` | Registrer en ekstra leverandør ved kjøretid (for en vertsapplikasjons egendefinerte gateway) |
| `listPaymentProviders()` | Oppregner innebygde og egendefinerte leverandører – brukes til å bygge rullegardinmenyen for gatewayer i admin |
| `hasPaymentProvider(name)` | Sjekk om en leverandør finnes |

**Innebygde leverandører på klientsiden: Stripe, PayPal, Kingdom Funding, Paystack.** B1App og B1Admin *leser* bare registeret (`getPaymentProvider`, `listPaymentProviders`); ingen av dem kaller `registerPaymentProvider` – registreringen forblir inne i apphelper.

Hver leverandør tokeniserer ulikt, men alle holder kortet utenfor B1:

| Leverandør | Inntastingskomponent | Token som returneres til API-et |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; gjesteskjemaet monterer også en `ExpressCheckoutElement` (Apple Pay / Google Pay, for engangsgaver) hvis `onConfirm` løser til samme `pm_…`-ID | ID for betalingsmetode (`pm_…`); bank via `/paymentmethods/ach-setup-intent` – Financial Connections `us_bank_account` for USD-gatewayer, kanadisk PAD `acss_debit` (hostet mandatmodal, mandatet `default_for` fakturaer/abonnementer, engangsbelastninger sender med mandat-ID) for CAD-gatewayer |
| Kingdom Funding | Hostet tokeniseringsskjema nøklet på gatewayens offentlige nøkkel | engangs-nonce |
| PayPal | PayPal Hosted Fields (kort, gjentakende) pluss PayPal Smart Buttons med Venmo-finansiering (engangs); begge deler én SDK-lasting, og serverordren bygges via `/donate/client-token` + `/donate/create-order` | fanget ordre-ID |
| Paystack | Paystack Inline-popup (`js.paystack.co/v2/inline.js`) – popupen tar selve betalingen (kort, mobilpenger, bankoverføring, USSD) | betalt transaksjonsreferanse; lagrede metoder er Paystack `AUTH_…`-autorisasjonskoder |

Stripes `finalizeResult` kjører 3-D Secure / SCA i nettleseren (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) før gaven regnes som fullført; det delte skjemaet kaller bare `provider.finalizeResult(result)` uten å vite hva den gjør.

## Serversiden: gatewayabstraksjonen (GivingApi)

`/giving`-modulen (`Api/src/modules/giving`) eksponerer REST-flaten; gateway-rørleggingen ligger i `Api/src/shared/helpers`. `DonateController` kommuniserer aldri direkte med en gateway-SDK – den går via `GatewayService`, som finner riktig `IGatewayProvider` fra `GatewayFactory` og gir den en dekryptert `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) er kontrakten hver gateway implementerer – livssyklus for webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betaling (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), gebyrer (`calculateFees`), håndtering av lagrede metoder (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), og valgfrie tillegg (kunder, ordrer, SetupIntents, avspilling av hendelser, `retryFailedPayment` for en mislykket abonnementsfaktura, `registerPaymentMethodDomain` for verifisering av Apple Pay-domene). En leverandør som utelater en valgfri hook, rapporteres som ustøttet for den handlingen, og brukergrensesnittet skjuler kontrollen. Hver leverandørklasse deklarerer sin egen `capabilities`-matrise (støttede valutaer, ACH, refusjoner, abonnementskrav, transaksjonsgrenser) – `GatewayService.getProviderCapabilities(provider)` leser bare den – og flagg som `logsDonationsImmediately` styrer kontrollerens oppførsel uten noen betingelser på leverandørnavn i kontrollerne.

**Serverleverandører registrert i `GatewayFactory`:**

| Leverandør | Tilgjengelighet |
|----------|-------------|
| Stripe | Alltid på |
| PayPal | Alltid på |
| Kingdom Funding | Alltid på |
| Paystack | Alltid på (kjøpmenn i Nigeria, Ghana, Sør-Afrika, Kenya, Elfenbenskysten; valutaene NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Valgfritt via miljøflagget `ENABLE_SQUARE` |
| ePayMints | Valgfritt via miljøflagget `ENABLE_EPAYMINTS` |

Paystack skiller seg fra de andre ved at pengene flyttes før GivingApi er involvert: popupen belaster giveren, `processCharge` er en `GET /transaction/verify/:reference` der det betalte beløpet og valutaen må samsvare med gaven som registreres (en referanse som allerede finnes, logges aldri to ganger), og den første gaven i en gjentakende plan logges fra `finalizeSubscription` (verifiser → `POST /plan` → `POST /subscription` med `start_date` ett intervall frem). Webhooks signeres med selve hemmelige nøkkelen (`x-paystack-signature`, HMAC-SHA512 over den rå forespørselskroppen), og Paystack har ingen API for administrasjon av webhooks, så adminskjermen viser URL-en for kirken å lime inn i dashbordet sitt. Fornyelseshendelser `charge.success` inneholder ingen fondfordeling; leverandøren henter den fra giverens lokale rader i `subscriptions`/`subscriptionFunds`. Bare kortautorisasjoner er `reusable` – mobilpenge-gaver er kun engangs, så `createSubscription` avviser dem. Demodataene legger inn en andre kirke (Accra Community Church, `CHU00000002`) på en Paystack-gateway i testmodus med GHS, slik at Paystack-testsuiten i Playwright kjører ved siden av Graces Stripe-suite.

Egendefinerte leverandører kan registreres ved kjøretid når `ENABLE_CUSTOM_GATEWAY_PROVIDERS` er satt; `AbstractExperimentalGatewayProvider` er basisklassen for dem. Leverandørnavn matches uten hensyn til store og små bokstaver.

### Gatewaykonfigurasjon og hemmeligheter

En administrator lagrer gateway-legitimasjon via `POST /giving/gateways` (`GatewayController`). Ved lagring krypterer kontrolleren de private og webhook-nøklene med `EncryptionHelper` før lagring, og deretter – på alle verter som ikke er localhost – sletter den kirkens eksisterende webhook og oppretter en ny som peker til `/giving/donate/webhook/{provider}?churchId=…`. En kirke har én rad per leverandør: lagring av en gateway erstatter bare den eksisterende raden for samme leverandør. Offentlige lesinger (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnerer bare offentlige nøkler.

## Datamodell

Giving-skjemaet (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller i `models/`) er et MySQL-skjema som brukes via Kysely:

| Tabell | Rolle |
|-------|------|
| `gateways` | Leverandørkonfigurasjon per kirke: `provider`, `publicKey`, kryptert `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Givingsbestemmelser (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppering for registrering/rapportering (`name`, `batchDate`) |
| `donations` | Én gave: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; bekreftelser, totaler, dashbord og gaverapporter teller bare `complete` eller null), `transactionId` |
| `fundDonations` | Fordeling av en gave på ett eller flere fond (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Gjentakende gave; `id` er gatewayens abonnements-ID, koblet til `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondfordeling for en gjentakende gave |
| `customers` | Kobler en `personId` til gatewayens kunde-ID, per `provider` |
| `gatewayPaymentMethods` | Lagrede kort/banker: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Revisjonslogg for webhooks/hendelser og deduplikeringsnøkkel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Løftekampanjer knyttet til et fond, og hver persons lovede beløp |

En gave fordeles på fond gjennom `fundDonations` – gaven bærer totalen, og hver `fundDonation` bærer en del. `donations.currency` og `gateways.currency` bærer ISO-valutaen; hver leverandør annonserer sine `supportedCurrencies`, og beløp formateres med `CurrencyHelper.formatCurrencyWithLocale`.

## End-to-end-flyter

### Medlem: engangs- og gjentakende gave (B1App)

Den innloggede gaveskjermen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setter sammen tre komponenter fra apphelper: `MultiGatewayDonationForm`, `PaymentMethods` og `RecurringDonations`. B1App gjør den omkringliggende datalastingen – `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` – og sender gatewaylisten videre; den løste leverandøren laster sin egen SDK fra gatewayens offentlige nøkkel. Selve belastningen skjer inne i apphelper: den løste leverandøren tokeniserer den (nye eller lagrede) metoden, og sender deretter til `/giving/donate/charge` for en engangsgave eller `/giving/donate/subscribe` for en gjentakende. Begge endepunktene knytter en innlogget giver til sin egen `personId` (kun `donations.edit`-holdere kan knytte til andre), og avviser fondfordelinger som summerer til mer enn det belastede beløpet. Gjentakende gaver oppretter en `subscriptions`-rad pluss `subscriptionFunds`, og overleverer planen til gatewayen (Stripe Subscriptions, PayPal Billing Plans, eller en KF-gjentakende plan).

### Gjest / anonym giving

Den offentlige gavesiden (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) og panelet «gi nå» viser `NonAuthDonationWrapper` fra `@churchapps/apphelper/website`, som injiserer reCAPTCHA og gatewayens Elements-kontekst rundt leverandørens `GuestForm`. Gjester får ingen innlogging, ingen lagrede metoder og ingen historikk. Flyten henter `GET /giving/funds/churchId/:id` og `GET /giving/donate/gateways/:churchId` (kun offentlige nøkler), verifiserer besøkende med `POST /giving/donate/captcha-verify`, tokeniserer i nettleseren og sender til `/giving/donate/charge` (eller `/subscribe`). ACH for gjester bruker det anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`, som kun tillater umiddelbar verifisering (Financial Connections): en verifisering med småbeløp tar flere dager, etter at gjestesiden er borte, så den kunne aldri fullføre gaven. Skjemaet nekter å belaste en uverifisert SetupIntent og viser giveren til kort eller oppsett av bank for innlogget bruker.

Tre valg for gjesteskjemaet bruker det samme belastningskallet. `?fundId=` og `?amount=` på gave-URL-en forhåndsvelger fondfordelingen (leses av hver leverandørs gjesteskjema ved montering, og sendes gjennom den vanlige håndtereren for fondendring slik at summer og gebyrer oppdateres). `anonymous: true` gjør at `DonateController.charge` forkaster en eventuell person klienten sendte, og registrerer gaven med `personId = null`; gjesteskjemaet hopper over `/people/loadOrCreate` og kunde-/hvelvtrinnet, og de tre leverandørene som logger umiddelbart, slutter å finne en person fra gatewaykunden. Apple Pay krever at sidens domene er registrert hos Stripe, så et Stripe-gjesteskjema sender én gang per økt til det offentlige, hastighetsbegrensede `POST /giving/donate/register-domain`, som bare godtar et domene som tilhører kirken (`<subDomain>.b1.church`, en rad i domenetabellen i innholdsmodulen, eller en lokal vert) før Stripes API for payment-method-domains kalles.

### Administrativ registrering og Stripe-import (B1Admin)

Gaveseksjonen i B1Admin (`B1Admin/src/donations/`) er der økonomiteamene jobber. Batch-registrering (`components/BulkDonationEntry.tsx`) registrerer kontant-/sjekk-/gaver i natura ved å sende `/giving/donations` og deretter `/giving/funddonations` – ingen gateway involvert. Arket **Registrer en gave** på personregistreringen (`components/LogGiftDialog.tsx`) gjør det samme for én enkelt gave: først finnes batchen der `batchDate` samsvarer med gavedatoen, eller en opprettes med datoen som navn (`POST /giving/donationbatches`), og gaven/den nye batchen slettes igjen hvis et senere trinn mislykkes. Fond, batcher, kampanjer og bekreftelser kobles hver til sine `/giving/*`-CRUD-ruter. Gavepanelet i medlemsstil (`B1Admin/src/donationComponents/`) gjenbruker de samme apphelper-komponentene som B1App.

Rapportering og regnskapsoverføringer er arbeid på klientsiden eller i rapportkjøreren, ikke gatewayarbeid: QuickBooks-eksporten på batchsiden bygger en journalpostfil (CSV) fra batchens `donations` + `fundDonations` (debet Undeposited Funds, én kredit per fond), visningen Lapsed Givers på Oppsummering-siden kjører `Api/reports/lapsedGivers.json` gjennom den generelle rapportkjøreren med personnavn løst av `ReportOutput`, og landsspesifikke kvitteringsformater (Canada / Australia / New Zealand) er kirkeinnstillinger i nøkkel/verdi-lageret for medlemskap, gjengitt av `GivingStatementDocument` og duplisert på utskriftssiden i B1App. Utskriftssidene for bekreftelser i B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) sender kirkens innstilling `logoLight` (via `usePrintLogo` i `B1Admin/src/components/PrintChurchHeader.tsx`), slik at logoen skrives ut øverst på hver bekreftelse, og de venter på bildet før automatisk utskrift.

### Konvertering av blandede valutatotaler

Ethvert endepunkt som returnerer én samlet total over gaver som muligens er i blandede valutaer – gavesammendragets nøkkeltall (`GivingKpiCards`), en batchtotal, en fondtotal, og årssummen/periodetotalene på B1Apps gaveskjerm – konverterer til kirkens standardvaluta på serveren i stedet for å summere ulike valutaer. `Api/src/shared/helpers/ExchangeRateHelper.ts` henter kurser fra `api.frankfurter.dev` nøklet på kirkens valuta, cacher dem i prosessen i 12 timer, og tilbyr `convertTotals(rows, churchCurrency, rates)`: rader grupperes på forhånd etter valuta i SQL (noen få grupper, aldri konvertering per gave), hver gruppe konverteres og summeres, og resultatet bærer et flagg `isConverted` som klienten bruker til å vise merknaden «Konvertert til dagens valutakurs». `GET /donations/exchange-rates` eksponerer kurstabellen for klienter som trenger den (B1Apps gaveskjerm); kursene aksepteres aldri fra en forespørsel, bare hentes på serveren, så en klient ikke kan påvirke en rapportert total. Individuelle gaveregistreringer og historiske rapporter i originalvaluta konverteres aldri – bare samlede totaler konverteres.

Stripe-import (`B1Admin/src/donations/StripeImportPage.tsx`) fyller inn gaver som er gjort utenfor B1: den kaller `POST /giving/donate/replay-stripe-events` med `dryRun: true` for forhåndsvisning, og deretter `dryRun: false` for å importere. Serveren lister Stripe-hendelser for datointervallet og hopper over alt som allerede er registrert – først matchet på `eventLogs` provider-ID, deretter på transaksjons-ID, og deretter på `DonationRepo.findMatchingDonation` (beløp + dato + person), slik at en ny kjøring aldri importerer dobbelt. Abonnementshendelser `charge.succeeded` / `payment_intent.succeeded` hoppes over fordi `invoice.paid` registrerer disse gavene; nyere Stripe-API-versjoner fjerner `PaymentIntent.invoice`, så hoppingen bruker også beskrivelsen «Subscription …».

## Webhooks og avstemming

Oppgjorte betalinger og endringer i abonnementstilstand kommer til `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Behandlingen er bevisst idempotent:

1. **Verifiser** – `GatewayService.verifyWebhook` delegerer til leverandørens signatursjekk; en mislykket signatur gir 401. Hendelser som ikke trenger behandling avsluttes med 200.
2. **Dedupliser hendelsen** – `EventLogRepo.loadByProviderId` hopper over en webhook som allerede er registrert i `eventLogs`.
3. **Dedupliser gaven** – før noe opprettes, sjekkes `DonationRepo.loadByTransactionId` mot alle kandidat-ID-er nyttelasten kan inneholde. Dette fanger opp dupliserte leveringer, ACH-hendelser i flere trinn (venter → oppgjort), og tilfellet der `/donate/charge` allerede har registrert gaven optimistisk.
4. **Bruk** – leverandørens `classifyWebhookEvent(eventType)` sier hva hendelsen betyr (`donation` venter/fullført, `cancel-subscription`, eller `ignore`); fullførte betalinger oppretter en `complete`-gave (eller oppgraderer en eksisterende `pending`- eller `failed`-gave), ACH-lignende hendelser havner som `pending` til oppgjør, en mislykket abonnementsfaktura (Stripe `invoice.payment_failed`) oppretter en `failed`-gave nøklet på faktura-ID-en, og kanselleringshendelser sletter den lokale `subscriptions`-raden. Kontrolleren inspiserer aldri leverandørspesifikke hendelsesnavn.

### Mislykkede gjentakende gaver og purring

En `failed`-gave er enheten for gjenoppretting. `GET /giving/donations/failed` lister dem med den nyeste feilmeldingen fra gatewayen fra `eventLogs` og et flagg `canRetry` fra gatewayens capabilities; `POST /giving/donate/retry/:donationId` kaller leverandørens `retryFailedPayment` (Stripe betaler den åpne fakturaen), og den resulterende webhooken oppgraderer raden til `complete` gjennom den vanlige deduplikeringsveien. Purre-e-poster sendes til giveren fra webhook-håndtereren på dag 0, deretter fra `DunningHelper.run` i midnattstimeren (koblet opp i både `lambda/timer-handler.ts` og `RailwayCron.ts`) på dag 3 og 7; hver utsending registreres i `eventLogs` som `provider: "dunning"`, `providerId: "<donationId>:<day>"`, slik at en ny kjøring aldri sender to ganger. Når Stripe gir opp og kansellerer abonnementet (`customer.subscription.deleted` med `cancellation_details.reason: "payment_failed"`), sender `DunningHelper.notifyCanceled` én e-post til giveren (`providerId: "<subscriptionId>:canceled"`); kanselleringer initiert av giveren eller administrator forblir stille. Stripe legger aldri til hendelser på et eksisterende endepunkt: etter at du har endret `StripeHelper.webhookEvents`, enten lagre gatewayen på nytt, eller kjør `tools/manual/stripe-webhook-events.ts` (tørrkjøring som standard, `--apply` for å skrive) mot produksjon.

Leverandører med `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) får belastningene sine logget fra svaret på `/charge` (ingen webhook-runde kreves i den vellykkede flyten), mens Stripe bruker `payment_intent.succeeded` / `invoice.paid` og ACH `payment_intent.processing`. Gebyrhåndtering (`POST /giving/donate/fee`, gatewayflagget `payFees`, og hver leverandørs `calculateFees`) beregner «dekk gebyrene»-påslaget på giverens side – B1 tar ingen plattformandel, så ingen applikasjonsgebyr legges noen gang til.

:::info
Belastnings- og webhook-stiene skriver til de samme radene i `donations` / `fundDonations`. `transactionId` er koblingsnøkkelen som hindrer at en optimistisk belastningsregistrering og den senere webhooken gir to gaver for én gave.
:::

## Relaterte sider

- [Giving-endepunkter](../api/endpoints/giving) — hele REST-flaten for gaver, fond, batcher, gatewayer, abonnementer, betalingsmetoder og webhooks
- [AppHelper](../shared-libraries/app-helper) — npm-pakken som leverer registeret for betalingsleverandører og gavekomponentene
- [Modulstruktur](../api/module-structure) — hvordan GivingApi-modulen er organisert på serversiden
