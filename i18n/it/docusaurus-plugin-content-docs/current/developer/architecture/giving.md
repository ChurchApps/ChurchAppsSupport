---
title: "Architettura dei contributi"
---

# Architettura dei contributi

<div class="article-intro">

ChurchApps esegue le donazioni su un modello gateway-rail: la chiesa mantiene il proprio account Stripe (o PayPal, o Kingdom Funding), e B1 non si siede mai nel percorso dei soldi come processore di piattaforma. I dati della carta vengono tokenizzati nel browser e non raggiungono mai un server ChurchApps. Questa pagina mappa l'intero stack — il registro del provider lato client in `@churchapps/apphelper`, l'astrazione del gateway GivingApi, il modello di dati di donazione, e come i webhook del gateway si riconciliano di nuovo nel database.

</div>

## Panoramica

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Gateway di pagamento                 │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ voce di carta in  │  Stripe Elements · tokenizzatore KF · │
│  │ Registro provider di  │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ pagamento             │  │◀── token / nonce ─│  (carta non raggiunge mai un server B1)
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ firmato
│  GivingApi — modulo /giving                 │──────────────┘                │ evento
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  salva donations + fundDonations — dedup tramite eventLogs / transactionId
                      ▼
                MySQL (schema giving)
```

Tre principi si mantengono in tutto lo stack:

1. **Il gateway tiene la carta.** Ogni widget di ingresso del provider tokenizza nel browser; l'API riceve solo un token, nonce, o id ordine.
2. **Un'astrazione, molti provider.** Il browser risolve un `PaymentProvider` da un registro; il server risolve un `IGatewayProvider` da una fabbrica. Entrambi si basano sulla stessa nome del provider normalizzato memorizzato nel record del gateway.
3. **I webhook sono la fonte di verità per l'insediamento.** Una risposta di charge viene registrata ottimisticamente, ma il webhook firmato del gateway è quello che conferma (o crea) la donazione completata, con protezioni di idempotenza su entrambi i lati.

## Lato client: il registro del provider di pagamento (`@churchapps/apphelper`)

Il registro si trova in `Packages/apphelper/src/donations/providers/`, con i widget e gli helper di ogni provider nella sua sottocartella (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — niente al di fuori di `providers/` si dirama su un nome di provider. Un `PaymentProvider` (vedi `providers/types.ts`) raggruppa tutto ciò di cui un'app host ha bisogno per un gateway: un `descriptor` (etichette di amministrazione, valute supportate, campi di commissione, tassi di commissione predefiniti, URL di dashboard/iscrizione), un insieme di flag `capabilities` (carte salvate, ACH, ricorrente, immissione di carta nuova inline, salvataggio implicito-su-tokenizzazione), i widget React per l'ingresso dei membri (`MemberWrapper`/`MemberEntry`), la donazione ospite (`GuestForm`), la modifica del metodo salvato (`MethodEditForm`), e i pagamenti di domande di modulo (`FormPayment`), più `buildChargeRequest(ctx, token)` — il posto dove la forma del payload di charge differisce per provider. Il `MemberWrapper` di ogni provider carica il suo SDK dal gateway record's public key, così le app host non importano mai un SDK gateway (B1App e B1Admin non hanno alcuna dipendenza `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizza quale gateway di una chiesa una superficie dovrebbe usare.

`providers/registry.ts` tiene i built-in. Sono **referenziati per valore**, non registrati attraverso un effetto collaterale di modulo, così il tree-shaking di un bundler non può mai far cadere la registrazione:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Funzione | Scopo |
|----------|---------|
| `getPaymentProvider(name)` | Risolvi per nome normalizzato; ritorna a Stripe così un provider mal configurato non fatico-blocca il modulo del donatore |
| `registerPaymentProvider(p)` | Registra un provider aggiuntivo al runtime (per un gateway personalizzato dell'app host) |
| `listPaymentProviders()` | Enumera built-in + personalizzato — usato per costruire il dropdown del gateway di amministrazione |
| `hasPaymentProvider(name)` | Controllo di appartenenza |

**Provider client built-in: Stripe, PayPal, Kingdom Funding.** B1App e B1Admin solo *leggono* il registro (`getPaymentProvider`, `listPaymentProviders`); nessuno chiama `registerPaymentProvider` — la registrazione rimane dentro apphelper.

Ogni provider tokenizza diversamente, ma tutti mantengono la carta fuori da B1:

| Provider | Widget di ingresso | Token ritornato all'API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | id metodo di pagamento (`pm_…`); banca tramite Financial Connections / ACH SetupIntent |
| Kingdom Funding | Forma tokenizzatore ospitato keyed dal gateway public key | nonce per singolo uso |
| PayPal | PayPal Hosted Fields; ordine server costruito tramite `/donate/client-token` + `/donate/create-order` | id ordine catturato |

Lo `finalizeResult` di Stripe esegue 3-D Secure / SCA nel browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) prima che la donazione sia considerata completata; il modulo condiviso chiama solo `provider.finalizeResult(result)` senza conoscenza di cosa fa.

## Lato server: l'astrazione del gateway (GivingApi)

Il modulo `/giving` (`Api/src/modules/giving`) espone la superficie REST; l'impianto del gateway vive in `Api/src/shared/helpers`. `DonateController` non parla mai a un SDK gateway direttamente — va attraverso `GatewayService`, che risolve il `IGatewayProvider` giusto da `GatewayFactory` e gli passa un `GatewayConfig` decriptato.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decripta privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) è il contratto che ogni gateway implementa — ciclo di vita webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), commissioni (`calculateFees`), gestione del metodo salvato (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), e extra facoltativi (clienti, ordini, SetupIntents, ripetizione degli eventi). Ogni classe di provider dichiara la sua matrice `capabilities` propria (valute supportate, ACH, rimborsi, requisiti di sottoscrizione, limiti di transazione) — `GatewayService.getProviderCapabilities(provider)` la legge semplicemente — e flag come `logsDonationsImmediately` guidano il comportamento del controller senza alcun condizionale nome-provider nei controller.

**Provider server registrati in `GatewayFactory`:**

| Provider | Disponibilità |
|----------|-------------|
| Stripe | Sempre acceso |
| PayPal | Sempre acceso |
| Kingdom Funding | Sempre acceso |
| Square | Opt-in tramite il flag di ambiente `ENABLE_SQUARE` |
| ePayMints | Opt-in tramite il flag di ambiente `ENABLE_EPAYMINTS` |

I provider personalizzati possono essere registrati al runtime quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` è impostato; `AbstractExperimentalGatewayProvider` è la classe base per quelli. I nomi dei provider sono abbinati in modo case-insensitive.

### Configurazione del gateway e segreti

Un amministratore salva le credenziali del gateway tramite `POST /giving/gateways` (`GatewayController`). Al salvataggio il controller cripta le chiavi private e webhook con `EncryptionHelper` prima di persistere, poi — su qualsiasi host non-localhost — elimina il webhook esistente della chiesa e ne fornisce uno fresco puntato a `/giving/donate/webhook/{provider}?churchId=…`. Le letture pubbliche (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ritornano solo le chiavi pubbliche.

## Modello di dati

Lo schema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelli in `models/`) è uno schema MySQL accessibile tramite Kysely:

| Tabella | Ruolo |
|-------|------|
| `gateways` | Configurazione del provider per chiesa: `provider`, `publicKey`, `privateKey`/`webhookKey` criptato, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Designazioni di donazione (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Raggruppamento per ingresso/report (`name`, `batchDate`) |
| `donations` | Un regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Allocazione di una donazione su uno o più fondi (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Regalo ricorrente; `id` è l'id di sottoscrizione del gateway, collegato a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Divisione del fondo per un regalo ricorrente |
| `customers` | Collega un `personId` al suo id cliente del gateway, per `provider` |
| `gatewayPaymentMethods` | Carte/banche salvate: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Audit trail webhook/evento e chiave dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagne di impegno legate a un fondo, e l'importo impegnato di ogni persona |

Una donazione è divisa tra fondi tramite `fundDonations` — la donazione porta il totale, ogni `fundDonation` porta una fetta. `donations.currency` e `gateways.currency` portano la valuta ISO; ogni provider pubblicizza le sue `supportedCurrencies`, e gli importi sono formattati con `CurrencyHelper.formatCurrencyWithLocale`.

## Flussi end-to-end

### Membro una-volta e ricorrente (B1App)

La schermata di donazione autenticata (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compone tre componenti apphelper: `MultiGatewayDonationForm`, `PaymentMethods`, e `RecurringDonations`. B1App fa il caricamento dei dati circostante — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e passa l'elenco dei gateway; il provider risolto carica il suo SDK dal gateway's public key. La charge stessa accade dentro apphelper: il provider risolto tokenizza il metodo (nuovo o salvato), poi posta a `/giving/donate/charge` per un regalo una-volta o `/giving/donate/subscribe` per uno ricorrente. I regali ricorrenti creano una riga `subscriptions` più `subscriptionFunds` e affidano il programma al gateway (Stripe Subscriptions, PayPal Billing Plans, o un programma ricorrente KF).

### Donazione ospite / anonima

La pagina di donazione pubblica (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e il pannello "dona ora" renderizzano `NonAuthDonationWrapper` da `@churchapps/apphelper/website`, che inietta reCAPTCHA e il contesto Elements del gateway intorno al `GuestForm` del provider. Gli ospiti non ottengono accesso, nessun metodo salvato, e nessuna cronologia. Il flusso recupera `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (solo chiavi pubbliche), verifica il visitatore con `POST /giving/donate/captcha-verify`, tokenizza nel browser, e posta a `/giving/donate/charge` (o `/subscribe`). ACH ospite usa l'anonimo `POST /giving/paymentmethods/ach-setup-intent-anon`.

### Registrazione di amministrazione e importazione Stripe (B1Admin)

La sezione donazioni di B1Admin (`B1Admin/src/donations/`) è dove i team finanziari lavorano. L'ingresso batch (`components/BulkDonationEntry.tsx`) registra regali in contanti/assegni/in-natura postando `/giving/donations` poi `/giving/funddonations` — nessun gateway coinvolto. Fondi, batch, campagne, e dichiarazioni ognuno mappa alle loro rotte CRUD `/giving/*`. Il pannello di stile donatore dei membri (`B1Admin/src/donationComponents/`) riusa gli stessi componenti apphelper di B1App.

L'importazione Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) riempie i regali fatti fuori B1: chiama `POST /giving/donate/replay-stripe-events` con `dryRun: true` per un'anteprima, poi `dryRun: false` per importare. Il server elenca gli eventi Stripe per l'intervallo di date e salta qualcosa già registrato — abbinato prima da `eventLogs` provider id, poi da `DonationRepo.findMatchingDonation` (importo + data + persona) così una re-esecuzione non importa doppio mai.

## Webhook e riconciliazione

I pagamenti insediati e i cambiamenti di stato di sottoscrizione arrivano a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). L'elaborazione è deliberatamente idempotente:

1. **Verifica** — `GatewayService.verifyWebhook` delega al controllo della firma del provider; una firma fallita ritorna 401. Gli eventi che non hanno bisogno di elaborazione cortocircuitano con 200.
2. **Dedup l'evento** — `EventLogRepo.loadByProviderId` salta un webhook già registrato in `eventLogs`.
3. **Dedup la donazione** — prima di creare qualcosa, `DonationRepo.loadByTransactionId` è controllato contro ogni id candidato che il payload potrebbe portare. Questo assorbe consegne duplicate, eventi ACH multi-fase (in sospeso → insediato), e il caso dove `/donate/charge` ha già registrato il regalo ottimisticamente.
4. **Applica** — il `classifyWebhookEvent(eventType)` del provider dice cosa significa l'evento (`donazione` in sospeso/completa, `cancel-subscription`, o `ignore`); i pagamenti completati creano una donazione `complete` (o promuovono una `pending` esistente), gli eventi in stile ACH atterrano come `pending` fino all'insediamento, e gli eventi di cancellazione eliminano la riga locale `subscriptions`. Il controller non ispeziona mai nomi di eventi specifici del provider.

I provider con `logsDonationsImmediately` (PayPal, Kingdom Funding) hanno le loro charge registrate dalla risposta `/charge` (nessun giro di webhook necessario per il percorso felice), mentre Stripe si affida a `payment_intent.succeeded` / `invoice.paid` e ACH `payment_intent.processing`. La gestione delle commissioni (`POST /giving/donate/fee`, il flag gateway `payFees`, e il `calculateFees` di ogni provider) calcola il gross-up "copri le commissioni" sul lato del donatore — B1 non prende nessun taglio di piattaforma, così nessuna commissione di applicazione viene mai aggiunta.

:::info
I percorsi di charge e webhook scrivono le stesse righe `donations` / `fundDonations`. Il `transactionId` è la chiave join che mantiene un registro di charge ottimistico e il suo webhook successivo da non produrre due donazioni per un regalo.
:::

## Pagine correlate

- [Endpoint di donazione](../api/endpoints/giving) — superficie REST completa per donazioni, fondi, batch, gateway, sottoscrizioni, metodi di pagamento, e webhook
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che spedisce il registro del provider di pagamento e i componenti di donazione
- [Struttura del modulo](../api/module-structure) — come il modulo GivingApi è organizzato lato server
