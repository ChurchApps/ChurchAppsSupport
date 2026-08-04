---
title: "Architettura dei contributi"
---

# Architettura dei contributi

<div class="article-intro">

ChurchApps gestisce le donazioni con un modello gateway-rail: la chiesa mantiene il proprio account Stripe (o PayPal, o Kingdom Funding), e B1 non si trova mai nel percorso del denaro come processore di piattaforma. I dati della carta vengono tokenizzati nel browser e non raggiungono mai un server ChurchApps. Questa pagina mappa l'intero stack — il registro dei provider lato client in `@churchapps/apphelper`, l'astrazione del gateway di GivingApi, il modello dati delle donazioni, e come i webhook del gateway si riconciliano nel database.

</div>

## Panoramica

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Gateway di pagamento                 │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ inserimento carta │  Stripe Elements · tokenizer KF ·     │
│  │ Registro provider di  │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ pagamento              │  │◀── token / nonce ─│  (la carta non raggiunge mai un       │
│  │ getPaymentProvider()  │  │                   │   server B1)                          │
│  │ Stripe · PayPal · KF  │  │                   └──────────▲────────────────┬───────────┘
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ evento webhook
┌─────────────────────────────────────────────┐ (chiave segreta) │             │ firmato
│  GivingApi — modulo /giving                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  salva donations + fundDonations — dedup tramite eventLogs / transactionId
                      ▼
                MySQL (schema giving)
```

Tre principi valgono in tutto lo stack:

1. **Il gateway detiene la carta.** Il widget di inserimento di ogni provider tokenizza nel browser; l'API riceve solo un token, un nonce, o un id ordine.
2. **Un'astrazione, molti provider.** Il browser risolve un `PaymentProvider` da un registro; il server risolve un `IGatewayProvider` da una fabbrica. Entrambi si basano sullo stesso nome di provider normalizzato memorizzato nel record del gateway.
3. **I webhook sono la fonte di verità per il regolamento.** Una risposta di addebito viene registrata in modo ottimistico, ma il webhook firmato del gateway è ciò che conferma (o crea) la donazione completata, con protezioni di idempotenza su entrambi i lati.

## Lato client: il registro dei provider di pagamento (`@churchapps/apphelper`)

Il registro vive in `Packages/apphelper/src/donations/providers/`, con i widget e gli helper di ogni provider nella propria sottocartella (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — niente al di fuori di `providers/` si dirama in base al nome di un provider. Un `PaymentProvider` (vedi `providers/types.ts`) raggruppa tutto ciò di cui un'app host ha bisogno per un gateway: un `descriptor` (etichette admin, valute supportate, campi commissione, tassi commissione predefiniti, URL dashboard/iscrizione), un insieme di flag `capabilities` (carte salvate, ACH, ricorrenza, inserimento inline di una nuova carta, salvataggio implicito alla tokenizzazione), i widget React per l'inserimento membri (`MemberWrapper`/`MemberEntry`), la donazione ospite (`GuestForm`), la modifica del metodo salvato (`MethodEditForm`), e i pagamenti da domande di modulo (`FormPayment`), più `buildChargeRequest(ctx, token)` — l'unico punto in cui la forma del payload di addebito differisce per provider. Il `MemberWrapper` di ogni provider carica il proprio SDK dalla chiave pubblica del record del gateway, così le app host non importano mai un SDK di gateway (B1App e B1Admin non hanno alcuna dipendenza `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizza quale gateway di una chiesa una superficie dovrebbe usare.

`providers/registry.ts` contiene i built-in. Sono **referenziati per valore**, non registrati tramite un side-effect di modulo, così il tree-shaking di un bundler non può mai eliminare la registrazione:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Funzione | Scopo |
|----------|---------|
| `getPaymentProvider(name)` | Risolve per nome normalizzato; ripiega su Stripe così un provider mal configurato non manda mai in crash il modulo del donatore |
| `registerPaymentProvider(p)` | Registra un provider aggiuntivo a runtime (per un gateway personalizzato di un'app host) |
| `listPaymentProviders()` | Enumera i built-in + i personalizzati — usato per costruire il menu a tendina del gateway admin |
| `hasPaymentProvider(name)` | Controllo di appartenenza |

**Provider client integrati: Stripe, PayPal, Kingdom Funding.** B1App e B1Admin *leggono* solo il registro (`getPaymentProvider`, `listPaymentProviders`); nessuno dei due chiama `registerPaymentProvider` — la registrazione resta dentro apphelper.

Ogni provider tokenizza in modo diverso, ma tutti tengono la carta fuori da B1:

| Provider | Widget di inserimento | Token restituito all'API |
|----------|--------------------|-----------------------|
| Stripe | `CardElement` di Stripe `Elements` → `stripe.createPaymentMethod(...)` | id metodo di pagamento (`pm_…`); banca via Financial Connections / SetupIntent ACH |
| Kingdom Funding | Modulo tokenizer ospitato con chiave del gateway pubblica | nonce monouso |
| PayPal | PayPal Hosted Fields; ordine server costruito via `/donate/client-token` + `/donate/create-order` | id ordine catturato |

`finalizeResult` di Stripe esegue 3-D Secure / SCA nel browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) prima che la donazione sia considerata completa; il modulo condiviso chiama semplicemente `provider.finalizeResult(result)` senza sapere cosa fa.

## Lato server: l'astrazione del gateway (GivingApi)

Il modulo `/giving` (`Api/src/modules/giving`) espone la superficie REST; l'impianto del gateway vive in `Api/src/shared/helpers`. `DonateController` non parla mai direttamente con un SDK del gateway — passa attraverso `GatewayService`, che risolve l'`IGatewayProvider` corretto da `GatewayFactory` e gli passa un `GatewayConfig` decriptato.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decripta privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) è il contratto che ogni gateway implementa — ciclo di vita del webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), commissioni (`calculateFees`), gestione dei metodi salvati (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), ed extra opzionali (clienti, ordini, SetupIntent, replay degli eventi). Ogni classe provider dichiara la propria matrice `capabilities` (valute supportate, ACH, rimborsi, requisiti di sottoscrizione, limiti di transazione) — `GatewayService.getProviderCapabilities(provider)` la legge semplicemente — e flag come `logsDonationsImmediately` guidano il comportamento del controller senza alcun condizionale sul nome del provider nei controller.

**Provider server registrati in `GatewayFactory`:**

| Provider | Disponibilità |
|----------|-------------|
| Stripe | Sempre attivo |
| PayPal | Sempre attivo |
| Kingdom Funding | Sempre attivo |
| Square | Opt-in tramite il flag d'ambiente `ENABLE_SQUARE` |
| ePayMints | Opt-in tramite il flag d'ambiente `ENABLE_EPAYMINTS` |

I provider personalizzati possono essere registrati a runtime quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` è impostato; `AbstractExperimentalGatewayProvider` è la classe base per questi. I nomi dei provider vengono confrontati senza distinzione tra maiuscole e minuscole.

### Configurazione del gateway e segreti

Un amministratore salva le credenziali del gateway tramite `POST /giving/gateways` (`GatewayController`). Al salvataggio il controller cripta le chiavi private e webhook con `EncryptionHelper` prima di persisterle, poi — su qualsiasi host non-localhost — elimina il webhook esistente della chiesa e ne fornisce uno nuovo puntato a `/giving/donate/webhook/{provider}?churchId=…`. Le letture pubbliche (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) restituiscono solo le chiavi pubbliche.

## Modello dati

Lo schema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelli in `models/`) è uno schema MySQL accessibile tramite Kysely:

| Tabella | Ruolo |
|-------|------|
| `gateways` | Configurazione del provider per chiesa: `provider`, `publicKey`, `privateKey`/`webhookKey` criptate, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinazioni delle donazioni (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Raggruppamento per inserimento/reporting (`name`, `batchDate`) |
| `donations` | Un dono: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Allocazione di una donazione su uno o più fondi (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Dono ricorrente; `id` è l'id di sottoscrizione del gateway, collegato a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Ripartizione dei fondi per un dono ricorrente |
| `customers` | Collega un `personId` al suo id cliente del gateway, per `provider` |
| `gatewayPaymentMethods` | Carte/banche salvate: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Traccia di audit webhook/eventi e chiave di dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagne di raccolta fondi legate a un fondo, e l'importo promesso di ogni persona |

Una donazione viene ripartita tra i fondi tramite `fundDonations` — la donazione porta il totale, ogni `fundDonation` porta una porzione. `donations.currency` e `gateways.currency` portano la valuta ISO; ogni provider pubblicizza le proprie `supportedCurrencies`, e gli importi sono formattati con `CurrencyHelper.formatCurrencyWithLocale`.

## Flussi end-to-end

### Membro, una tantum e ricorrente (B1App)

La schermata di donazione autenticata (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compone tre componenti apphelper: `MultiGatewayDonationForm`, `PaymentMethods`, e `RecurringDonations`. B1App gestisce il caricamento dei dati circostante — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e passa l'elenco dei gateway; il provider risolto carica il proprio SDK dalla chiave pubblica del gateway. L'addebito stesso avviene dentro apphelper: il provider risolto tokenizza il metodo (nuovo o salvato), poi invia a `/giving/donate/charge` per un dono una tantum o `/giving/donate/subscribe` per uno ricorrente. I doni ricorrenti creano una riga `subscriptions` più `subscriptionFunds` e affidano il calendario al gateway (Stripe Subscriptions, PayPal Billing Plans, o un calendario ricorrente KF).

### Donazione ospite / anonima

La pagina di donazione pubblica (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e il pannello "dona ora" renderizzano `NonAuthDonationWrapper` da `@churchapps/apphelper/website`, che inietta reCAPTCHA e il contesto Elements del gateway attorno al `GuestForm` del provider. Gli ospiti non hanno login, nessun metodo salvato, e nessuna cronologia. Il flusso recupera `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (solo chiavi pubbliche), verifica il visitatore con `POST /giving/donate/captcha-verify`, tokenizza nel browser, e invia a `/giving/donate/charge` (o `/subscribe`). L'ACH ospite usa l'anonimo `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Registrazione admin e importazione Stripe (B1Admin)

La sezione donazioni di B1Admin (`B1Admin/src/donations/`) è dove lavorano i team finanziari. L'inserimento in batch (`components/BulkDonationEntry.tsx`) registra doni in contanti/assegno/in natura inviando a `/giving/donations` poi `/giving/funddonations` — nessun gateway coinvolto. Fondi, batch, campagne, e rendiconti mappano ciascuno alle proprie rotte CRUD `/giving/*`. Il pannello di donazione in stile membro (`B1Admin/src/donationComponents/`) riutilizza gli stessi componenti apphelper di B1App.

L'importazione Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera i doni fatti fuori da B1: chiama `POST /giving/donate/replay-stripe-events` con `dryRun: true` per un'anteprima, poi `dryRun: false` per importare. Il server elenca gli eventi Stripe per l'intervallo di date e salta tutto ciò che è già registrato — abbinato prima dall'id provider di `eventLogs`, poi da `DonationRepo.findMatchingDonation` (importo + data + persona) così una riesecuzione non importa mai due volte.

## Webhook e riconciliazione

I pagamenti regolati e i cambi di stato delle sottoscrizioni arrivano a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). L'elaborazione è deliberatamente idempotente:

1. **Verifica** — `GatewayService.verifyWebhook` delega al controllo della firma del provider; una firma non valida restituisce 401. Gli eventi che non richiedono elaborazione vengono interrotti con 200.
2. **Deduplica l'evento** — `EventLogRepo.loadByProviderId` salta un webhook già registrato in `eventLogs`.
3. **Deduplica la donazione** — prima di creare qualsiasi cosa, `DonationRepo.loadByTransactionId` viene controllato contro ogni id candidato che il payload potrebbe portare. Questo assorbe le consegne duplicate, gli eventi ACH multi-fase (pending → regolato), e il caso in cui `/donate/charge` ha già registrato il dono in modo ottimistico.
4. **Applica** — `classifyWebhookEvent(eventType)` del provider dice cosa significa l'evento (donazione pending/complete, `cancel-subscription`, o `ignore`); i pagamenti completati creano una donazione `complete` (o promuovono una `pending` esistente), gli eventi in stile ACH atterrano come `pending` fino al regolamento, e gli eventi di cancellazione eliminano la riga locale `subscriptions`. Il controller non ispeziona mai i nomi degli eventi specifici del provider.

I provider con `logsDonationsImmediately` (PayPal, Kingdom Funding) hanno i loro addebiti registrati dalla risposta `/charge` (nessun giro di webhook necessario per il percorso felice), mentre Stripe si affida a `payment_intent.succeeded` / `invoice.paid` e all'ACH `payment_intent.processing`. La gestione delle commissioni (`POST /giving/donate/fee`, il flag gateway `payFees`, e il `calculateFees` di ogni provider) calcola il gross-up "copri le commissioni" lato donatore — B1 non prende alcuna quota di piattaforma, quindi non viene mai aggiunta alcuna commissione applicativa.

:::info
I percorsi di addebito e webhook scrivono le stesse righe `donations` / `fundDonations`. Il `transactionId` è la chiave di join che impedisce a un registro di addebito ottimistico e al suo successivo webhook di produrre due donazioni per un unico dono.
:::

## Pagine correlate

- [Endpoint di giving](../api/endpoints/giving) — superficie REST completa per donazioni, fondi, batch, gateway, sottoscrizioni, metodi di pagamento, e webhook
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che distribuisce il registro dei provider di pagamento e i componenti di donazione
- [Struttura del modulo](../api/module-structure) — come è organizzato lato server il modulo GivingApi
