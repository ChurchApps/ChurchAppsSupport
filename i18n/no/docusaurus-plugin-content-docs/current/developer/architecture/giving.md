---
title: "Donerings arkitektur"
---

# Donerings arkitektur

<div class="article-intro">

ChurchApps kjører donasjoner på en gateway-skinnmell: kirken beholder sin egen Stripe (eller PayPal, eller Kingdom Funding) konto, og B1 sitter aldri i pengene sti som plattform prosessor. Kort data blir tokenisert i nettleseren og når aldri en ChurchApps server. Denne siden kartlegger hele stabelen — klient-side leverandør registeret i `@churchapps/apphelper`, GivingApi gateway abstraksjon, donerings data modellen, og hvordan gateway webhooks avstemmer tilbake inn i databasen.

</div>

## Oversikt

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (nettleser)│                   │  Betalings gateway                    │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ kort innsetting i │  Stripe Elements · KF tokenizer ·     │
│  │ Betalings leverandør  │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registrering          │  │◀── token / nonce ─│  (kort når aldri når en B1 server)   │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signert webhook
┌─────────────────────────────────────────────┐ (hemmelighet nøkkel) │                │ hendelse
│  GivingApi — /giving modul                  │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  lagrer donasjoner + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving skjema)
```

Tre prinsipper holder på tvers av stabelen:

1. **Gateway holder kortet.** Hver leverandør innsettinggjennomstillet tokeniserer i nettleseren; API mottaker bare en token, nonce, eller ordre id.
2. **En abstraksjon, mange leverandørers.** Nettleseren løser en `PaymentProvider` fra registeret; serveren løser en `IGatewayProvider` fra en fabrikk. Begge nøkler av samme normalisert leverandør navn lagret på gateway posten.
3. **Webhooks er kilden til sannhet for oppgjøring.** En charge respons er registrert optimistisk, men gateway signerte webhook er hva som bekrefter (eller oppretter) den fullførte donasjonen, med idempotency vakt på begge sider.

## Klient-side: betalings leverandør registeret (`@churchapps/apphelper`)

Registeret lever i `Packages/apphelper/src/donations/providers/`, med hver leverandør sin widgets og hjelpemidler under sin eget undermappe (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — ingenting utenfor `providers/` grener på ett leverandør navn. En `PaymentProvider` (se `providers/types.ts`) samlet alt en vert app trenger for en gateway: en `descriptor` (admin etiketter, støttet valutaer, gebyr felt, standard gebyr priser, instrumentbrett/registrering URLer), en `capabilities` flagg sett (lagret kort, ACH, gjentakende, inline nye-kort innsetting, implisitt lagre-på-tokenisere), React widgets for medlem innsetting (`MemberWrapper`/`MemberEntry`), gjest donering (`GuestForm`), lagret-metode redigering (`MethodEditForm`), og skjema-spørsmål betalinger (`FormPayment`), pluss `buildChargeRequest(ctx, token)` — det ene stedet charge last form skiller per leverandør. Hver leverandør `MemberWrapper` laster sin eget SDK fra gateway posten offentlig nøkkel, så vert apps aldri import en gateway SDK (B1App og B1Admin har nei `@stripe/*` avhengighet). `pickDefaultGateway(gateways, capability?)` sentraliserer hvilken av en kirkes gateways en flate skal bruke.

`providers/registry.ts` holder de innebygde. De er **referansert etter verdi**, ikke registrert gjennom en modul side-virkning, så ett bundler tre-risting kan aldri slippet registreringen:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Funksjon | Formål |
|----------|---------|
| `getPaymentProvider(name)` | Løse etter normalisert navn; faller tilbake til Stripe så en feiltolket leverandør aldri hard-krasjer donor forma |
| `registerPaymentProvider(p)` | Registrer en ekstra leverandør på kjøretid (for en vert app sin egne gateway) |
| `listPaymentProviders()` | Opprek innebygde + egne — brukt til å bygge admin gateway nedrulling |
| `hasPaymentProvider(name)` | Medlemskaps sjekk |

**Innebygde klient leverandørers: Stripe, PayPal, Kingdom Funding.** B1App og B1Admin bare *lese* registeret (`getPaymentProvider`, `listPaymentProviders`); ingen kaller `registerPaymentProvider` — registrering blir innsiden apphelper.

Hver leverandør tokeniserer annerledes, men alle holde kortet ut av B1:

| Leverandør | Innsettings widget | Token returnert til API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | betalings-metode id (`pm_…`); bank via Financial Connections / ACH SetupIntent |
| Kingdom Funding | Hosted tokeniserer forma nøkklet etter gateway offentlig nøkkel | engangs nonce |
| PayPal | PayPal Hosted Fields; server ordre bygget via `/donate/client-token` + `/donate/create-order` | innhentet ordre id |

Stripe `finalizeResult` kjører 3-D Secure / SCA i nettleseren (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) før donasjonen blir vurdert fullføre; den delte forma bare kaller `provider.finalizeResult(result)` med nei kunnskap om hva den gjør.

## Server-side: gateway abstraksjon (GivingApi)

Den `/giving` modul (`Api/src/modules/giving`) avslører REST flaten; gateway røret lever i `Api/src/shared/helpers`. `DonateController` aldri snakker til gateway SDK direkte — det går gjennom `GatewayService`, som løser rett `IGatewayProvider` fra `GatewayFactory` og hender det en dekryptert `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() dekrypterer privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) er kontrakten hver gateway implementerer — webhook livssyklus (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), betaling (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), gebyr (`calculateFees`), lagret-metode håndtering (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), og valgfri ekstra (kunder, ordrer, SetupIntents, hendelse replay). Hver leverandør klasse erklærer sin egen `capabilities` matrise (støttet valutaer, ACH, refusjoner, abonnement krav, transaksjon grenser) — `GatewayService.getProviderCapabilities(provider)` bare leser det — og flagg som `logsDonationsImmediately` drive kontroller oppførsel uten noen leverandør-navn betingede i kontrollere.

**Server leverandørers registrert i `GatewayFactory`:**

| Leverandør | Tilgjengelighet |
|----------|-------------|
| Stripe | Alltid på |
| PayPal | Alltid på |
| Kingdom Funding | Alltid på |
| Square | Opt-in via `ENABLE_SQUARE` miljø flagg |
| ePayMints | Opt-in via `ENABLE_EPAYMINTS` miljø flagg |

Egne leverandørers kan registreres på kjøretid når `ENABLE_CUSTOM_GATEWAY_PROVIDERS` er satt; `AbstractExperimentalGatewayProvider` er bas klasse for de. Leverandør navn blir matchet case-insensitively.

### Gateway konfigurasjon og hemmeligheter

En admin lagrer gateway kredentialer via `POST /giving/gateways` (`GatewayController`). Ved lagring controlleren krypterer private og webhook nøkler med `EncryptionHelper` før vedvarende, så — på noen ikke-localhost vert — sletter kirken den eksisterende webhook og provisjonerer en frisk en pekende på `/giving/donate/webhook/{provider}?churchId=…`. Offentlig lest (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnerer bare offentlig nøkler.

## Datamodell

Den givning skjema (`Api/src/modules/giving/db/DatabaseTypes.ts`, modeller i `models/`) er en MySQL skjema tilgang gjennom Kysely:

| Tabell | Rolle |
|-------|------|
| `gateways` | Per-kirke leverandør konfig: `provider`, `publicKey`, kryptert `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Donerings betegnelser (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Gruppering for innsetting/rapportering (`name`, `batchDate`) |
| `donations` | Ein gave: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Fordeling av en donasjon på tvers av ein eller flere midler (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Gjentakende gave; `id` er gateway abonnements id, koblet til `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Fond deling for en gjentakende gave |
| `customers` | Lenke en `personId` til sin gateway kunde id, per `provider` |
| `gatewayPaymentMethods` | Lagret kort/banker: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Webhook/hendelse revisjon spor og dedup nøkkel (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Løfte kampanjer bundet til en fond, og hver person sin løftet beløp |

En donasjon blir delt på tvers av fond gjennom `fundDonations` — donasjonen bærer totalen, hver `fundDonation` bærer en skive. `donations.currency` og `gateways.currency` bærer ISO valuta; hver leverandør annonserer sin `supportedCurrencies`, og beløp blir formatert med `CurrencyHelper.formatCurrencyWithLocale`.

## Ende-til-ende flyter

### Medlem en-gangen og gjentakende (B1App)

Den autentisert donasjon skjerm (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) komponenter tre apphelper: `MultiGatewayDonationForm`, `PaymentMethods`, og `RecurringDonations`. B1App gjør omgivelse data-lasting — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — og går gjennom gateway listen; den løst leverandør laster sin eget SDK fra gateway offentlig nøkkel. Charge selv skjer innsiden apphelper: den løst leverandør tokeniserer (ny eller lagret) metode, så poster til `/giving/donate/charge` for en en-gangen gave eller `/giving/donate/subscribe` for en gjentakende. Gjentakende gave opprette en `subscriptions` rad pluss `subscriptionFunds` og hender planen til gateway (Stripe abonnement, PayPal planer, eller en KF gjentakende plan).

### Gjest / anonym donering

Det offentlig donasjon side (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) og "gi nå" panel gjengivelse `NonAuthDonationWrapper` fra `@churchapps/apphelper/website`, som injiserer reCAPTCHA og gateway Elements kontekst rundt leverandør `GuestForm`. Gjester får nei pålogging, nei lagret metoder, og nei historie. Flyten henter `GET /giving/funds/churchId/:id` og `GET /giving/donate/gateways/:churchId` (bare offentlig nøkler), verifiserer besøkende med `POST /giving/donate/captcha-verify`, tokeniserer i nettleseren, og poster til `/giving/donate/charge` (eller `/subscribe`). Gjest ACH bruker anonym `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Admin registrering og Stripe import (B1Admin)

B1Admin donasjoner seksjonen (`B1Admin/src/donations/`) er hvor finanslag arbeider. Parti innsetting (`components/BulkDonationEntry.tsx`) registrerer kontanter/sjekk/i-naturalier gave ved posting `/giving/donations` så `/giving/funddonations` — nei gateway involvert. Midler, partier, kampanjer, og uttalelse hver karte til deres `/giving/*` CRUD rutene. Medlem-stil dona panel (`B1Admin/src/donationComponents/`) gjenbruk samme apphelper komponenter som B1App.

Stripe import (`B1Admin/src/donations/StripeImportPage.tsx`) bakfyller gave gjort utenfor B1: den kaller `POST /giving/donate/replay-stripe-events` med `dryRun: true` for forhandvis, så `dryRun: false` til import. Serveren lister Stripe hendelser for dato område og hopper noe allerede registrert — matchet først etter `eventLogs` leverandør id, så etter `DonationRepo.findMatchingDonation` (beløp + dato + person) så en re-kjør aldri dobbel-import.

## Webhooks og avstemming

Oppgjort betalinger og abonnements tilstand endringer komme på `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Behandling er bevisst idempotent:

1. **Verifiser** — `GatewayService.verifyWebhook` delegat til leverandør signatur sjekk; en mislykket signatur returnerer 401. Hendelser som ikke trenger behandling kortslutt med 200.
2. **Dedup hendelsen** — `EventLogRepo.loadByProviderId` hopper en webhook allerede registrert i `eventLogs`.
3. **Dedup donasjonen** — før opprettelse noe, `DonationRepo.loadByTransactionId` er sjekket mot hver kandidat id lasten kan bærer. Dette absorberer dupliser leveringer, multi-etapp ACH hendelser (ventende → oppgjort), og kasse hvor `/donate/charge` allerede logget gaven optimistisk.
4. **Påfør** — leverandør `classifyWebhookEvent(eventType)` sier hva hendelsen betyr (`donation` ventende/fullføre, `cancel-subscription`, eller `ignore`); fullførte betalinger oppretter en `complete` donasjon (eller fremme en eksisterende `pending`), ACH-stil hendelser lande som `pending` til oppgjøring, og avbrytelse hendelser slett den lokale `subscriptions` rad. Controlleren aldri inspiser leverandør-spesifikk hendelse navn.

Leverandørers med `logsDonationsImmediately` (PayPal, Kingdom Funding) har sin charge loggett fra `/charge` respons (nei webhook rund-tur kreves for lykke banen), mens Stripe stolier på `payment_intent.succeeded` / `invoice.paid` og ACH `payment_intent.processing`. Gebyr håndtering (`POST /giving/donate/fee`, `payFees` gateway flagg, og hver leverandør `calculateFees`) beregner "dekk avgiftene" brutto-opp på giver siden — B1 tar nei plattform kutt, så nei applikasjon gebyr blir aldri lagt til.

:::info
Charge og webhook baner skrive samme `donations` / `fundDonations` rader. Den `transactionId` er sammenføyings nøkklen som holder en optimistisk charge logg og sin senere webhook fra produsering to donasjoner for en gave.
:::

## Relaterte sider

- [Giving endepunkter](../api/endpoints/giving) — full REST flate for donasjoner, midler, partier, gateways, abonnement, betalings metoder, og webhooks
- [AppHelper](../shared-libraries/app-helper) — npm pakken som lever betalings leverandør registeret og donerings komponenter
- [Modul struktur](../api/module-structure) — hvordan GivingApi modulen er organisert server-side
