---
title: "Giverarkitektur"
---

# Giverarkitektur

<div class="article-intro">

ChurchApps kjører donasjoner på en gateway-rail-modell: kirken beholder sin egen Stripe (eller PayPal, Kingdom Funding eller Paystack) konto, og B1 sitter aldri i pengeflaten som en plattformbehandler. Kortdata blir tokenisert i nettleseren og når aldri en ChurchApps-server. Denne siden kartlegger hele stacken — klientregistret for betalingsleverandør i `@churchapps/apphelper`, GivingApi gateway-abstraksjonen, donasjondatamodellen, og hvordan gateway-webhooks blir innhentet tilbake til databasen.

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

Tre prinsipper holder seg gjennom hele stacken:

1. **Gatewayen holder kortet.** Hver leverandørs oppføringsvideo blir tokenisert i nettleseren; API-en mottar kun en token, nonce eller ordre-id.
2. **En abstraksjon, mange leverandører.** Nettleseren løser en `PaymentProvider` fra et register; serveren løser en `IGatewayProvider` fra en fabrikk. Begge nøkkeler av samme normaliserte leverandørnavn som lagres på gatewayposten.
3. **Webhooks er kilden til sannhet for oppgjør.** Et gebyrrespons blir registrert optimistisk, men gatewayens signerte webhook er det som bekrefter (eller oppretter) den fullførte donasjonen, med idempotensibeskyttelse på begge sider.

## Klientsiden: betalingsleverandørregisteret (`@churchapps/apphelper`)

Registeret ligger i `Packages/apphelper/src/donations/providers/`, med hver leverandørs widgets og hjelpere under sin egen undermappe (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — ingenting utenfor `providers/` grener på et leverandørnavn. En `PaymentProvider` (se `providers/types.ts`) bunter sammen alt en vertapp trenger for en gateway: en `descriptor` (admin-etiketter, støttede valutaer, gebyrfelt, standardgebyrrate, dashboard/påmeldingsadresser), et `capabilities`-flagsett (lagrede kort, ACH, gjentakende, innebygd oppføring av nytt kort, implisitt lagring ved tokenisering), React-widgetene for medlemsoppføring (`MemberWrapper`/`MemberEntry`), gjestegivinger (`GuestForm`), redigering av lagret metode (`MethodEditForm`) og skjemagavebetaling (`FormPayment`), pluss `buildChargeRequest(ctx, token)` — stedet der gebyrpayloaden form varierer per leverandør. Hver leverandørs `MemberWrapper` laster sin egen SDK fra gatewayens offentlige nøkkel, så vertapper importerer aldri en gateway SDK (B1App og B1Admin har ingen `@stripe/*` avhengighet). `pickDefaultGateway(gateways, capability?)` sentraliserer hvilken av kirkens gateways et område skal bruke.

`providers/registry.ts` holder innebygningene. De er **referert til etter verdi**, ikke registrert gjennom en modulside-effekt, så en bundlers treskakning kan aldri slippe registreringen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funksjon | Formål |
|----------|---------|
| `getPaymentProvider(name)` | Løse etter normalisert navn; faller tilbake til Stripe slik at en feilkonfigurert leverandør aldri hardt-krasjer giverformen |
| `registerPaymentProvider(p)` | Registrer en ekstra leverandør under kjøring (for en vertapps egendefinerte gateway) |
| `listPaymentProviders()` | Oppramse innebygninger + egendefinert — brukt til å bygge administrasjonsgatewayens rullegardin |
| `hasPaymentProvider(name)` | Medlemskapssjekk |

**Innebygde klientleverandører: Stripe, PayPal, Kingdom Funding, Paystack.** B1App og B1Admin *leser* registeret (`getPaymentProvider`, `listPaymentProviders`); ingen kaller `registerPaymentProvider` — registreringen forblir inne i apphelper.

Hver leverandør tokeniserer annerledes, men alle holder kortet ut av B1:

| Leverandør | Oppføringsvideo | Token returnert til API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; gjesteformen monterer også en `ExpressCheckoutElement` (Apple Pay / Google Pay, engangsgaver) hvis `onConfirm` løser til samme `pm_…` id | betalingsmetode-id (`pm_…`); bank via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` for USD-gatewayer, kanadisk PAD `acss_debit` (vertsbasert mandatmodal, mandat `default_for` fakturaer/abonnementer, engangsgebyrer sender mandat-id) for CAD-gatewayer |
| Kingdom Funding | Vertsbasert tokeniseringsform knyttet til gatewayens offentlige nøkkel | engangsbruk nonce |
| PayPal | PayPal Hosted Fields (kort, gjentakende) pluss PayPal Smart Buttons med Venmo-finansiering (engang); begge deler en SDK-belastning og serverordren bygget via `/donate/client-token` + `/donate/create-order` | fangede ordre-id |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) — popupen selv tar betalingen (kort, mobil penger, bankoverføring, USSD) | betalt transaksjonsreferanse; lagrede metoder er Paystack `AUTH_…` autorisasjonskoder |

Stripes `finalizeResult` kjører 3-D Secure / SCA i nettleseren (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) før donasjonen anses som fullført; det delte skjemaet kaller bare `provider.finalizeResult(result)` uten kunnskap om hva det gjør.

## Serversiden: gateway-abstraksjonen (GivingApi)

`/giving`-modulen (`Api/src/modules/giving`) viser REST-flaten; gateway-rørleggeriet ligger i `Api/src/shared/helpers`. `DonateController` snakker aldri direkte til en gateway SDK — det går gjennom `GatewayService`, som løser rett `IGatewayProvider` fra `GatewayFactory` og gir den en dekryptert `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() dekrypterer privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) er kontrakten hver gateway implementerer — webhook livssyklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betaling (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), gebyrer (`calculateFees`), lagret-metodebehandling (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) og valgfrie ekstra (kunder, ordre, SetupIntents, arrangementsomfang, `retryFailedPayment` for en mislykket abonnementsfaktura, `registerPaymentMethodDomain` for Apple Pay domenebekreftelse). En leverandør som utelater en valgfri krok rapporteres som ikke støttet for den handlingen og brukergrensesnittet skjuler kontrollen. Hver leverandørklasse erklærer sin egen `capabilities` matrise (støttede valutaer, ACH, refusjoner, abonnementskrav, transaksjonsgrenser) — `GatewayService.getProviderCapabilities(provider)` leser bare den — og flagg som `logsDonationsImmediately` driver controllerkraftverk uten noen leverandørnavn-betinget i kontrollerne.

**Serverleverandører registrert i `GatewayFactory`:**

| Leverandør | Tilgjengelighet |
|----------|-------------|
| Stripe | Alltid på |
| PayPal | Alltid på |
| Kingdom Funding | Alltid på |
| Paystack | Alltid på (Nigeria, Ghana, Sør-Afrika, Kenya, Côte d'Ivoire kjøpmenn; valutaer NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in via `ENABLE_SQUARE` miljøflagget |
| ePayMints | Opt-in via `ENABLE_EPAYMINTS` miljøflagget |

Paystack skiller seg fra de andre ved at penger beveger seg før GivingApi er involvert: popupen belaster giveren, `processCharge` er en `GET /transaction/verify/:reference` hvis betalte beløp og valuta må være sammenfallende med donasjonen som registreres (en referanse som allerede er på fil blir aldri logget to ganger), og den første gaven av en gjentakende tidsplan blir logget fra `finalizeSubscription` (verifiser → `POST /plan` → `POST /subscription` med `start_date` en interval ut). Webhooks blir signert med den hemmelige nøkkelen selv (`x-paystack-signature`, HMAC-SHA512 over råroten) og Paystack har ingen webhook-administrasjons-API, så administrasjonsskjermen viser adressen for kirken til å lime inn på sitt dashbord. Fornyelse `charge.success` hendelser har ingen fondsdeling; leverandøren gjenoppretter den fra giverens lokale `subscriptions`/`subscriptionFunds` rader. Bare kortautorisasjoner er `reusable` — mobil penge-gaver er engangsbruk, så `createSubscription` nekter dem. Demodata såer en andre kirke (Accra Community Church, `CHU00000002`) på en Paystack test-modell GHS gateway slik at Paystack Playwright-suiten kjører ved siden av Graces Stripe en.

Egendefinerte leverandører kan registreres under kjøring når `ENABLE_CUSTOM_GATEWAY_PROVIDERS` er satt; `AbstractExperimentalGatewayProvider` er basisklassen for disse. Leverandørnavn blir matchet case-insensitivt.

### Gateway-konfigurering & hemmeligheter

En administrator lagrer gateway-legitimasjon via `POST /giving/gateways` (`GatewayController`). På lagring krypterer kontrolleren private og webhook-nøkler med `EncryptionHelper` før vedvarende, deretter — på en hvilken som helst ikke-localhost-vert — sletter kirkens eksisterende webhook og etablerer en frisk som peker på `/giving/donate/webhook/{provider}?churchId=…`. En kirke beholder én rad per leverandør: lagring av en gateway erstatter bare den eksisterende raden for samme leverandør. Offentlige lesinger (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnerer bare offentlige nøkler.

## Datamodell

Givingskjemaet (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller i `models/`) er et MySQL-skjema som åpnes gjennom Kysely:

| Bord | Rolle |
|-------|------|
| `gateways` | Per-kirke leverandørkonfigurasjon: `provider`, `publicKey`, kryptert `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Givingtildelinger (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppering for oppføring/rapportering (`name`, `batchDate`) |
| `donations` | En gave: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; utsagn, totaler, dashbord og donasjonsrapporter teller bare `complete` eller null), `transactionId` |
| `fundDonations` | Tildeling av en donasjon over en eller flere fond (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Gjentakende gave; `id` er gatewayens abonnements-id, koblet til `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fondsdeling for en gjentakende gave |
| `customers` | Kobler en `personId` til sin gateway kunde-id, per `provider` |
| `gatewayPaymentMethods` | Lagrede kort/banker: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/arrangementer revisjonsspor og dedupnøkkel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Løfte-kampanjer knyttet til et fond, og hver persons lovte beløp |

En donasjon blir delt over fond gjennom `fundDonations` — donasjonen bærer totalen, hver `fundDonation` bærer en del. `donations.currency` og `gateways.currency` bærer ISO-valutaen; hver leverandør annonserer sin `supportedCurrencies`, og beløp blir formatert med `CurrencyHelper.formatCurrencyWithLocale`.

## End-to-end-flyter

### Medlem engang og gjentakende (B1App)

Den godkjente doneringsskjermen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) komponerer tre apphelper-komponenter: `MultiGatewayDonationForm`, `PaymentMethods` og `RecurringDonations`. B1App gjør den omgivende datalasten — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — og sender gatewaylisten igjennom; den løste leverandøren laster sin egen SDK fra gatewayens offentlige nøkkel. Gebyret selv skjer inne i apphelper: den løste leverandøren tokeniserer (ny eller lagret) metode, deretter poster til `/giving/donate/charge` for en engangsave eller `/giving/donate/subscribe` for en gjentakende. Begge endepunkter tilskriver en innlogget giver til sin egen `personId` (bare `donations.edit` holdere kan tilskrive til noen andre) og avviser fonddelinger som legger opp til mer enn det ladde beløpet. Gjentakende gaver lager en `subscriptions` rad pluss `subscriptionFunds` og sender tidsplanen til gatewayen (Stripe Abonnement, PayPal Fakturaplan eller en KF gjentakende plan).

### Gjest / anonym giver

Den offentlige donerningssiden (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) og panelet "gi nå" gjengir `NonAuthDonationWrapper` fra `@churchapps/apphelper/website`, som injiserer reCAPTCHA og leverandørens Elements-kontekst rundt leverandørens `GuestForm`. Gjester får ingen pålogging, ingen lagrede metoder og ingen historie. Flyten henter `GET /giving/funds/churchId/:id` og `GET /giving/donate/gateways/:churchId` (bare offentlige nøkler), bekrefter besøkende med `POST /giving/donate/captcha-verify`, tokeniserer i nettleseren og poster til `/giving/donate/charge` (eller `/subscribe`). Gjest ACH bruker den anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`.

Tre gaveskjemavalg kjører på samme gebyrkall. `?fundId=` og `?amount=` på donasjonsadressen forinnstiller fonddelingen (lest av hver leverandørs gaveskjema på montering, rouret gjennom normal fondskiftebehandler slik totaler og gebyrer oppdateres). `anonymous: true` gjør `DonateController.charge` kaster ut hvilken som helst person klienten sendte og logger gaven med `personId = null`; gaveskjemaet hopper over `/people/loadOrCreate` og kunde/valvtrinn, og de tre umiddelbare loggtrinnleverandørene slutter å løse en person fra gatewaykunnen. Apple Pay trenger sidens domene registrert hos Stripe, så en Stripe gaveskjema poster en gang per sesjon til det offentlige, ratebegrensede `POST /giving/donate/register-domain`, som kun godtar et domene som tilhører kirken (`<subDomain>.b1.church`, en rad i innholdsmodulens domener-bord eller en lokal vert) før Stripes betalingsmetode-domener-API anropet.

### Admin-oppføring og Stripe-import (B1Admin)

B1Admin donasjonsavsnittet (`B1Admin/src/donations/`) er hvor finansteam arbeider. Batchoppføring (`components/BulkDonationEntry.tsx`) registrerer kontanter/sjekk/slag-in-kind-gaver ved posting `/giving/donations` deretter `/giving/funddonations` — ingen gateway involvert. Midler, seriebatcher, kampanjer og uttalelser hver kart til deres `/giving/*` CRUD-ruter. Det medlemsstil doneringspanel (`B1Admin/src/donationComponents/`) gjenbruker samme apphelper-komponentene som B1App.

Rapportering og regnskapsoverføringer er klientsidearbeid eller rapportkjører-arbeid, ikke gatewayarbeid: sideprisen sitt QuickBooks-eksport bygger et journaloppføring-CSV fra batchens `donations` + `fundDonations` (debit Ikke-innskudd midler, en kreditt per fond), Lapsed Givers-fanen kjører `Api/reports/lapsedGivers.json` gjennom den generiske rapportkjøreren med person-navn løst av `ReportOutput`, og land mottaksformater (Kanada / Australia / New Zealand) er kirkestillinger i medlemskapsnøkkel/verdilageret gjengivet av `GivingStatementDocument` og duplisert i B1App utskriftssiden.

### Konvertere blandet-valutasum

Et endepunkt som returnerer en enkelt kombinert sum over mulig blandet-valutagaver — giversammenfatningen KPI-kort (`GivingKpiCards`), en donasjonsbatch sum, en fond sum og B1App donasjonseskjermen år-til-dato/periode totaler — konverterer til kirkens standardvaluta serversiden i stedet for å summere ulikt valutaer. `Api/src/shared/helpers/ExchangeRateHelper.ts` henter satser fra `api.frankfurter.dev` knyttet av kirkenes valuta, lagrer dem i prosess i 12 timer og eksponerer `convertTotals(rows, churchCurrency, rates)`: rader er pre-gruppert etter valuta i SQL (en håndvoll grupper, aldri en per-gave konvertering), hver gruppe blir konvertert og summert, og resultatet bærer en `isConverted` flagg klienten bruker til å vise en "Konvertert til gjeldende valutakurser" merknad. `GET /donations/exchange-rates` eksponerer satskursen til klienter som trenger det (B1App donasjonseskjermen); satskursen selv blir aldri godtatt fra en forespørsel, bare noensinne hentet serversiden slik at en klient ikke kan påvirke en rapportert sum. Individuelle donasjonsrekorder og historisk/original-valuta-rapporter blir aldri konvertert — bare kombinerte totaler er.

Stripe-import (`B1Admin/src/donations/StripeImportPage.tsx`) fylling bakover gaver gjort utenfor B1: den kaller `POST /giving/donate/replay-stripe-events` med `dryRun: true` for en forhåndsvisning, deretter `dryRun: false` til import. Serveren lister Stripe-arrangementer for datointervallet og hopper alt allerede registrert — matchet først av `eventLogs` leverandør-id, deretter av `DonationRepo.findMatchingDonation` (beløp + dato + person) slik en rerun aldri dobbelt-import.

## Webhooks og avstemming

Oppgjorte betalinger og abonnementstilstandsendringer ankomst på `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Bearbeiding er bevisst idempotent:

1. **Verifiser** — `GatewayService.verifyWebhook` delegerer til leverandørens signatursjekk; en mislykket signatur returnerer 401. Arrangementer som ikke trenger bearbeiding kortslutning med 200.
2. **Dedup arrangementet** — `EventLogRepo.loadByProviderId` hopper et webhook allerede registrert i `eventLogs`.
3. **Dedup donasjonen** — før du lager noe, `DonationRepo.loadByTransactionId` blir sjekket mot hver kandidat-id payloaden mulig å bære. Dette absorberer duplisert leveranser, multi-trinn ACH-arrangementer (ventende → oppgjort) og saken hvor `/donate/charge` allerede logget gaven optimistisk.
4. **Påfør** — leverandørens `classifyWebhookEvent(eventType)` sier hva arrangementet betyr (`donation` ventende/fullføring, `cancel-subscription` eller `ignore`); fullførte betalinger lager en `complete` donasjon (eller fremme en eksisterende `pending` eller `failed`), ACH-stilvender lander som `pending` til oppgjør, en mislykket abonnementsfaktura (Stripe `invoice.payment_failed`) lager en `failed` donasjon knyttet på faktura-id, og kanselleringshendelser sletter den lokale `subscriptions` rad. Kontrolleren inspekterer aldri leverandørspesifikke arrangementnavn.

### Mislykkede gjentakende gaver og innkreving

En `failed` donasjon er arbeidsenhetene for gjenoppretting. `GET /giving/donations/failed` lister dem med den nyeste gatewayfeilen fra `eventLogs` og en `canRetry` flagg fra gatewayens evner; `POST /giving/donate/retry/:donationId` kaller leverandørens `retryFailedPayment` (Stripe betaler den åpne fakturaen), og den resulterende webhookfremmer raden til `complete` gjennom det normale dedupslinga. Innkrevingspostene går til giveren fra webhook-behandleren på dag 0, deretter fra `DunningHelper.run` i midnattstidtakeren (ledningsført i både `lambda/timer-handler.ts` og `RailwayCron.ts`) på dag 3 og 7; hver sending blir registrert i `eventLogs` som `provider: "dunning"`, `providerId: "<donationId>:<day>"` slik en omgivelsen aldri e-post dobbelt. Stripe webhook-endepunkter opprettet før denne funksjonen abonnerer ikke på `invoice.payment_failed`; lagring av gatewayen igjen fasiliterer et frisk endepunkt med arrangementet.

Leverandører med `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) har deres gebyrer logget fra `/charge` responsen (ingen webhook omgang-tur nødvendig for den lykkelig vei), mens Stripe er avhengig av `payment_intent.succeeded` / `invoice.paid` og ACH `payment_intent.processing`. Gebyrbehandling (`POST /giving/donate/fee`, `payFees` gatewayflaget og hver leverandørs `calculateFees`) beregner "dekk gebyrene" brutto-up på giverens side — B1 tar ingen plattformkutt, slik ingen applikasjonsgebyr blir noen gang lagt til.

:::info
Gebyret og webhook-stiene skriver samme `donations` / `fundDonations` rader. `transactionId` er sammenføyningsnøkkelen som holder en optimistisk gebyrkall og dens senere webhook fra å produsere to donasjoner for en gave.
:::

## Relaterte sider

- [Giving Endepunkter](../api/endpoints/giving) — full REST overflate for donasjoner, midler, seriebatcher, gatewayen, abonnement, betalingsmetoder og webhooks
- [AppHelper](../shared-libraries/app-helper) — npm-pakken som leverer betalingsleverandørregisteret og donasjonskomponentene
- [Modulstruktur](../api/module-structure) — hvordan GivingApi-modulen er organisert serversiden
