---
title: "Givertjeneste-arkitektur"
---

# Givertjeneste-arkitektur

<div class="article-intro">

ChurchApps kjører donasjoner på en gateway-skinne-modell: kirken beholder sin egen Stripe- (eller PayPal-, eller Kingdom Funding-) konto, og B1 sitter aldri i pengestrømmen som en plattformprosessor. Kortdata tokeniseres i nettleseren og når aldri en ChurchApps-server. Denne siden kartlegger hele stabelen — det klientsidige leverandørregisteret i `@churchapps/apphelper`, GivingApis gateway-abstraksjon, donasjonsdatamodellen, og hvordan gateway-webhooker avstemmer tilbake inn i databasen.

</div>

## Oversikt

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (nettleser)│                   │  Betalingsgateway                     │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ kortinntasting i  │  Stripe Elements · KF-tokenisering ·  │
│  │ Betalingsleverandør-  │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ register              │  │◀── token / nonce ─│  (kortet når aldri en B1-server)      │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signert webhook
┌─────────────────────────────────────────────┐ (hemmelig nøkkel) │            │ hendelse
│  GivingApi — /giving-modul                  │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  lagrer donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving-skjema)
```

Tre prinsipper gjelder for hele stabelen:

1. **Gatewayen holder kortet.** Hver leverandørs inntastingswidget tokeniserer i nettleseren; APIet mottar bare noensinne en token, nonce, eller ordre-id.
2. **Én abstraksjon, mange leverandører.** Nettleseren løser en `PaymentProvider` fra et register; serveren løser en `IGatewayProvider` fra en fabrikk. Begge nøkler av samme normaliserte leverandørnavn lagret på gateway-posten.
3. **Webhooker er sannhetskilden for oppgjør.** Et charge-svar registreres optimistisk, men gatewayens signerte webhook er det som bekrefter (eller oppretter) den fullførte donasjonen, med idempotens-vakter på begge sider.

## Klientsiden: betalingsleverandørregisteret (`@churchapps/apphelper`)

Registeret ligger i `Packages/apphelper/src/donations/providers/`, med hver leverandørs widgets og hjelpere under sin egen undermappe (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — ingenting utenfor `providers/` forgrener seg på et leverandørnavn. En `PaymentProvider` (se `providers/types.ts`) samler alt en vertsapp trenger for én gateway: en `descriptor` (adminetiketter, støttede valutaer, gebyrfelt, standard gebyrsatser, dashbord-/registrerings-URL-er), et sett `capabilities`-flagg (lagrede kort, ACH, gjentakende, inline ny-kort-inntasting, implisitt lagre-ved-tokenisering), React-widgetene for medlemsinntasting (`MemberWrapper`/`MemberEntry`), gjestedonasjon (`GuestForm`), redigering av lagret metode (`MethodEditForm`), og skjemaspørsmål-betalinger (`FormPayment`), pluss `buildChargeRequest(ctx, token)` — det ene stedet hvor charge-nyttelastens form skiller seg per leverandør. Hver leverandørs `MemberWrapper` laster sitt eget SDK fra gateway-postens offentlige nøkkel, slik at vertsapper aldri importerer et gateway-SDK (B1App og B1Admin har ingen `@stripe/*`-avhengighet). `pickDefaultGateway(gateways, capability?)` sentraliserer hvilken av en kirkes gateways en flate skal bruke.

`providers/registry.ts` inneholder de innebygde leverandørene. De er **referert ved verdi**, ikke registrert gjennom en modul-sideeffekt, slik at en bundlers tre-risting aldri kan droppe registreringen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Funksjon | Formål |
|----------|---------|
| `getPaymentProvider(name)` | Løs etter normalisert navn; faller tilbake til Stripe slik at en feilkonfigurert leverandør aldri hardkrasjer donorskjemaet |
| `registerPaymentProvider(p)` | Registrer en ekstra leverandør ved kjøretid (for en vertsapps egen gateway) |
| `listPaymentProviders()` | List opp innebygde + egendefinerte — brukes til å bygge admin-gateway-nedtrekkslisten |
| `hasPaymentProvider(name)` | Medlemskapssjekk |

**Innebygde klientleverandører: Stripe, PayPal, Kingdom Funding.** B1App og B1Admin bare *leser* registeret (`getPaymentProvider`, `listPaymentProviders`); ingen av dem kaller `registerPaymentProvider` — registrering forblir inne i apphelper.

Hver leverandør tokeniserer forskjellig, men alle holder kortet unna B1:

| Leverandør | Inntastingswidget | Token returnert til API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | betalingsmetode-id (`pm_…`); bank via Financial Connections / ACH SetupIntent |
| Kingdom Funding | Hostet tokeniseringsskjema med nøkkel fra gatewayens offentlige nøkkel | engangsbruk-nonce |
| PayPal | PayPal Hosted Fields; server-ordre bygget via `/donate/client-token` + `/donate/create-order` | fanget ordre-id |

Stripes `finalizeResult` kjører 3-D Secure / SCA i nettleseren (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) før donasjonen anses som fullført; det delte skjemaet kaller bare `provider.finalizeResult(result)` uten kjennskap til hva den gjør.

## Server-siden: gateway-abstraksjonen (GivingApi)

`/giving`-modulen (`Api/src/modules/giving`) eksponerer REST-flaten; gateway-rørleggingen ligger i `Api/src/shared/helpers`. `DonateController` snakker aldri direkte med et gateway-SDK — den går gjennom `GatewayService`, som løser riktig `IGatewayProvider` fra `GatewayFactory` og gir den en dekryptert `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() dekrypterer privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) er kontrakten hver gateway implementerer — webhook-livssyklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betaling (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), gebyrer (`calculateFees`), håndtering av lagrede metoder (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), og valgfrie ekstrafunksjoner (kunder, ordrer, SetupIntents, hendelses-replay). Hver leverandørklasse deklarerer sin egen `capabilities`-matrise (støttede valutaer, ACH, refusjoner, abonnementskrav, transaksjonsgrenser) — `GatewayService.getProviderCapabilities(provider)` leser den bare — og flagg som `logsDonationsImmediately` styrer controlleratferd uten noen leverandørnavn-betingelser i controllerne.

**Serverleverandører registrert i `GatewayFactory`:**

| Leverandør | Tilgjengelighet |
|----------|-------------|
| Stripe | Alltid på |
| PayPal | Alltid på |
| Kingdom Funding | Alltid på |
| Square | Opt-in via miljøflagget `ENABLE_SQUARE` |
| ePayMints | Opt-in via miljøflagget `ENABLE_EPAYMINTS` |

Egendefinerte leverandører kan registreres ved kjøretid når `ENABLE_CUSTOM_GATEWAY_PROVIDERS` er satt; `AbstractExperimentalGatewayProvider` er basisklassen for disse. Leverandørnavn matches uten hensyn til store/små bokstaver.

### Gateway-konfigurasjon og hemmeligheter

En admin lagrer gateway-legitimasjon via `POST /giving/gateways` (`GatewayController`). Ved lagring krypterer controlleren den private nøkkelen og webhook-nøkkelen med `EncryptionHelper` før lagring, og — på enhver ikke-localhost-vert — sletter deretter kirkens eksisterende webhook og provisjonerer en fersk en som peker på `/giving/donate/webhook/{provider}?churchId=…`. Offentlige lesinger (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnerer bare offentlige nøkler.

## Datamodell

Givertjeneste-skjemaet (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller i `models/`) er et MySQL-skjema tilgjengeliggjort gjennom Kysely:

| Tabell | Rolle |
|-------|------|
| `gateways` | Per-kirke leverandørkonfigurasjon: `provider`, `publicKey`, kryptert `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Donasjonsformål (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppering for registrering/rapportering (`name`, `batchDate`) |
| `donations` | Én gave: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Fordeling av en donasjon på ett eller flere formål (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Gjentakende gave; `id` er gatewayens abonnements-id, koblet til `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Formålsfordeling for en gjentakende gave |
| `customers` | Kobler en `personId` til sin gateway-kunde-id, per `provider` |
| `gatewayPaymentMethods` | Lagrede kort/bankkontoer: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook-/hendelses-revisjonsspor og dedup-nøkkel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Løftekampanjer knyttet til et formål, og hver persons lovede beløp |

En donasjon deles opp på formål gjennom `fundDonations` — donasjonen bærer totalen, hver `fundDonation` bærer en andel. `donations.currency` og `gateways.currency` bærer ISO-valutaen; hver leverandør annonserer sin `supportedCurrencies`, og beløp formateres med `CurrencyHelper.formatCurrencyWithLocale`.

## Ende-til-ende-flyter

### Medlemmers engangsgaver og gjentakende gaver (B1App)

Den autentiserte donasjonsskjermen (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) setter sammen tre apphelper-komponenter: `MultiGatewayDonationForm`, `PaymentMethods`, og `RecurringDonations`. B1App gjør den omkringliggende datainnlastingen — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — og sender med gateway-listen; den løste leverandøren laster sitt eget SDK fra gatewayens offentlige nøkkel. Selve belastningen skjer inne i apphelper: den løste leverandøren tokeniserer den (nye eller lagrede) metoden, og poster deretter til `/giving/donate/charge` for en engangsgave eller `/giving/donate/subscribe` for en gjentakende. Gjentakende gaver oppretter en `subscriptions`-rad pluss `subscriptionFunds` og overleverer planen til gatewayen (Stripe Subscriptions, PayPal Billing Plans, eller en KF-gjentakende plan).

### Gjeste-/anonym giving

Den offentlige donasjonssiden (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) og "gi nå"-panelet gjengir `NonAuthDonationWrapper` fra `@churchapps/apphelper/website`, som injiserer reCAPTCHA og gatewayens Elements-kontekst rundt leverandørens `GuestForm`. Gjester får ingen innlogging, ingen lagrede metoder, og ingen historikk. Flyten henter `GET /giving/funds/churchId/:id` og `GET /giving/donate/gateways/:churchId` (bare offentlige nøkler), verifiserer besøkeren med `POST /giving/donate/captcha-verify`, tokeniserer i nettleseren, og poster til `/giving/donate/charge` (eller `/subscribe`). Gjeste-ACH bruker det anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Admin-registrering og Stripe-import (B1Admin)

B1Admins donasjonsseksjon (`B1Admin/src/donations/`) er der finansteamene jobber. Partiregistrering (`components/BulkDonationEntry.tsx`) registrerer kontant-/sjekk-/naturaliegaver ved å poste til `/giving/donations` og deretter `/giving/funddonations` — ingen gateway er involvert. Formål, partier, kampanjer, og kontoutskrifter mapper hver til sine `/giving/*` CRUD-ruter. Det medlemslignende donasjonspanelet (`B1Admin/src/donationComponents/`) gjenbruker de samme apphelper-komponentene som B1App.

Stripe-import (`B1Admin/src/donations/StripeImportPage.tsx`) etterfyller gaver gjort utenfor B1: den kaller `POST /giving/donate/replay-stripe-events` med `dryRun: true` for en forhåndsvisning, deretter `dryRun: false` for å importere. Serveren lister opp Stripe-hendelser for datointervallet og hopper over alt som allerede er registrert — matchet først med `eventLogs`-leverandør-id, deretter med `DonationRepo.findMatchingDonation` (beløp + dato + person) slik at en gjentatt kjøring aldri dobbeltimporterer.

## Webhooker og avstemming

Oppgjorte betalinger og endringer i abonnementstilstand ankommer på `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Behandlingen er bevisst idempotent:

1. **Verifiser** — `GatewayService.verifyWebhook` delegerer til leverandørens signatursjekk; en mislykket signatur returnerer 401. Hendelser som ikke trenger behandling, kortslutter med 200.
2. **Dedupliser hendelsen** — `EventLogRepo.loadByProviderId` hopper over en webhook som allerede er registrert i `eventLogs`.
3. **Dedupliser donasjonen** — før noe opprettes, sjekkes `DonationRepo.loadByTransactionId` mot hver kandidat-id nyttelasten kan bære. Dette absorberer duplikate leveringer, flertrinns ACH-hendelser (ventende → oppgjort), og tilfellet der `/donate/charge` allerede har logget gaven optimistisk.
4. **Utfør** — leverandørens `classifyWebhookEvent(eventType)` sier hva hendelsen betyr (`donation` ventende/fullført, `cancel-subscription`, eller `ignore`); fullførte betalinger oppretter en `complete`-donasjon (eller fremmer en eksisterende `pending`), ACH-lignende hendelser lander som `pending` frem til oppgjør, og avbrytelseshendelser sletter den lokale `subscriptions`-raden. Controlleren inspiserer aldri leverandørspesifikke hendelsesnavn.

Leverandører med `logsDonationsImmediately` (PayPal, Kingdom Funding) har sine belastninger logget fra `/charge`-svaret (ingen webhook-runde er nødvendig for lykkelig-sti-tilfellet), mens Stripe stoler på `payment_intent.succeeded` / `invoice.paid` og ACH `payment_intent.processing`. Gebyrhåndtering (`POST /giving/donate/fee`, `payFees`-gateway-flagget, og hver leverandørs `calculateFees`) beregner "dekk gebyrene"-oppgraderingen på giversiden — B1 tar ingen plattformkutt, så ingen applikasjonsavgift legges noensinne til.

:::info
Belastnings- og webhook-stiene skriver de samme `donations`-/`fundDonations`-radene. `transactionId` er sammenføyingsnøkkelen som hindrer en optimistisk belastningslogg og dens senere webhook fra å produsere to donasjoner for én gave.
:::

## Relaterte sider

- [Giving-endepunkter](../api/endpoints/giving) — full REST-flate for donasjoner, formål, partier, gateways, abonnementer, betalingsmetoder og webhooker
- [AppHelper](../shared-libraries/app-helper) — npm-pakken som leverer betalingsleverandørregisteret og donasjonskomponentene
- [Modulstruktur](../api/module-structure) — hvordan GivingApi-modulen er organisert server-side
