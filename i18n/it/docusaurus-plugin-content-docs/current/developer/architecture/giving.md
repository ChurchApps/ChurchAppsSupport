---
title: "Architettura Donazioni"
---

# Architettura Donazioni

<div class="article-intro">

ChurchApps esegue le donazioni su un modello gateway-rail: la chiesa mantiene il proprio account Stripe (o PayPal, Kingdom Funding o Paystack), e B1 non si siede mai nel percorso del denaro come processore di piattaforma. I dati della carta vengono tokenizzati nel browser e non raggiungono mai un server ChurchApps. Questa pagina mappa l'intero stack — il registro del provider lato client in `@churchapps/apphelper`, l'astrazione gateway GivingApi, il modello di dati di donazione e il modo in cui i webhook del gateway si riconciliano nuovamente nel database.

</div>

## Panoramica

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Gateway di pagamento                │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ entry carta nel   │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (la carta non raggiunge mai un server B1) │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ webhook firmato
┌─────────────────────────────────────────────┐ (secret key) │                │ evento
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  salva donazioni + fundDonations — dedup tramite eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Tre principi si mantengono in tutto lo stack:

1. **Il gateway tiene la carta.** Ogni widget di entry del provider tokenizza nel browser; l'API riceve solo un token, nonce o ID ordine.
2. **Un'astrazione, molti provider.** Il browser risolve un `PaymentProvider` da un registro; il server risolve un `IGatewayProvider` da una factory. Entrambi si basano sul nome del provider normalizzato memorizzato sulla riga del gateway.
3. **I webhook sono la fonte di verità per il regolamento.** Una risposta di carica viene registrata in modo ottimistico, ma il webhook firmato del gateway è quello che conferma (o crea) la donazione completata, con guardie di idempotenza su entrambi i lati.

## Lato client: il registro del provider di pagamento (`@churchapps/apphelper`)

Il registro vive in `Packages/apphelper/src/donations/providers/`, con i widget e gli assistenti di ogni provider nella sua sottocartella (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nulla al di fuori di `providers/` si dirama su un nome di provider. Un `PaymentProvider` (vedi `providers/types.ts`) raggruppa tutto ciò che un'app host ha bisogno per un gateway: un `descriptor` (etichette di amministrazione, valute supportate, campi di commissione, tassi di commissione predefiniti, URL di dashboard/iscrizione), un set di flag `capabilities` (carte salvate, ACH, ricorrente, entry di nuova carta inline, save-on-tokenize implicito), i widget React per l'entry dei membri (`MemberWrapper`/`MemberEntry`), le donazioni per ospiti (`GuestForm`), l'editing del metodo salvato (`MethodEditForm`) e i pagamenti per domande di modulo (`FormPayment`), più `buildChargeRequest(ctx, token)` — l'unico luogo in cui la forma del payload di carica differisce per provider. Il `MemberWrapper` di ogni provider carica il suo SDK del gateway dal gateway record's public key, in modo che le app host non importino mai un SDK di gateway (B1App e B1Admin non hanno alcuna dipendenza `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizza quale dei gateway di una chiesa una superficie dovrebbe usare.

`providers/registry.ts` contiene i built-in. Sono **referenziati per valore**, non registrati tramite un effetto collaterale del modulo, in modo che uno shaker del bundler non possa mai eliminare la registrazione:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Function | Purpose |
|----------|---------|
| `getPaymentProvider(name)` | Risolvere per nome normalizzato; ritorna a Stripe in modo che un provider mal configurato non arresti mai in difficoltà il modulo del donatore |
| `registerPaymentProvider(p)` | Registra un provider extra in fase di esecuzione (per un gateway personalizzato di un'app host) |
| `listPaymentProviders()` | Enumerare built-in + personalizzati — utilizzato per costruire l'elenco a discesa di gateway di amministrazione |
| `hasPaymentProvider(name)` | Controllo di appartenenza |

**Provider client built-in: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin solo *leggono* il registro (`getPaymentProvider`, `listPaymentProviders`); nessuno chiama `registerPaymentProvider` — la registrazione rimane dentro apphelper.

Ogni provider tokenizza diversamente, ma tutti mantengono la carta fuori da B1:

| Provider | Entry widget | Token restituito all'API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; il modulo guest monta anche un `ExpressCheckoutElement` (Apple Pay / Google Pay, doni una tantum) il cui `onConfirm` si risolve nello stesso ID `pm_…` | ID metodo di pagamento (`pm_…`); banca tramite `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` per gateway USD, mandato canadese PAD `acss_debit` (modale di mandato ospitato, mandato `default_for` fatture/sottoscrizioni, gli addebiti una tantum passano l'ID mandato) per gateway CAD |
| Kingdom Funding | Modulo tokenizer ospitato chiave dal gateway public key | nonce a singolo uso |
| PayPal | PayPal Hosted Fields (carta, ricorrente) più PayPal Smart Buttons con finanziamento Venmo (una tantum); entrambi condividono un carico SDK e l'ordine del server costruito tramite `/donate/client-token` + `/donate/create-order` | ID ordine catturato |
| Paystack | Pop-up Paystack Inline (`js.paystack.co/v2/inline.js`) — il pop-up stesso accetta il pagamento (carta, denaro mobile, trasferimento bancario, USSD) | riferimento transazione pagato; i metodi salvati sono codici di autorizzazione Paystack `AUTH_…` |

Il `finalizeResult` di Stripe esegue 3-D Secure / SCA nel browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) prima che la donazione sia considerata completa; il modulo condiviso chiama solo `provider.finalizeResult(result)` senza conoscenza di cosa faccia.

## Lato server: l'astrazione gateway (GivingApi)

Il modulo `/giving` (`Api/src/modules/giving`) espone la superficie REST; il plumbing del gateway vive in `Api/src/shared/helpers`. `DonateController` non parla mai direttamente a un SDK di gateway — va tramite `GatewayService`, che risolve il giusto `IGatewayProvider` da `GatewayFactory` e gli consegna un `GatewayConfig` decrittografato.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrittografa privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) è il contratto che ogni gateway implementa — ciclo di vita webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), commissioni (`calculateFees`), handling del metodo salvato (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) e extra facoltativi (clienti, ordini, SetupIntents, replay di evento, `retryFailedPayment` per fattura di sottoscrizione fallita, `registerPaymentMethodDomain` per verifica del dominio Apple Pay). Un provider che omette un hook facoltativo è segnalato come non supportato per quell'azione e l'UI nasconde il controllo. Ogni classe provider dichiara la sua propria matrice `capabilities` (valute supportate, ACH, rimborsi, requisiti di sottoscrizione, limiti di transazione) — `GatewayService.getProviderCapabilities(provider)` la legge solo — e flag come `logsDonationsImmediately` comportamento controller drive senza alcun condizionale nome-provider nei controller.

**Provider server registrati in `GatewayFactory`:**

| Provider | Availability |
|----------|-------------|
| Stripe | Sempre on |
| PayPal | Sempre on |
| Kingdom Funding | Sempre on |
| Paystack | Sempre on (commercianti Nigeria, Ghana, Sud Africa, Kenya, Côte d'Ivoire; valute NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in tramite il flag ambiente `ENABLE_SQUARE` |
| ePayMints | Opt-in tramite il flag ambiente `ENABLE_EPAYMINTS` |

Paystack differisce dagli altri in quanto il denaro si muove prima che GivingApi sia coinvolto: il pop-up addebita il donatore, `processCharge` è un `GET /transaction/verify/:reference` il cui importo pagato e valuta devono corrispondere alla donazione registrata (un riferimento già nel file non viene mai registrato due volte), e il primo regalo di un programma ricorrente viene registrato da `finalizeSubscription` (verifica → `POST /plan` → `POST /subscription` con `start_date` un intervallo in poi). I webhook sono firmati con la chiave segreta stessa (`x-paystack-signature`, HMAC-SHA512 sul corpo non elaborato) e Paystack non ha un API di gestione dei webhook, in modo che la schermata di amministrazione mostri l'URL per la chiesa da incollare nel suo dashboard. I `charge.success` di rinnovo portano nessuna divisione di fondi; il provider la recupera dalle righe `subscriptions`/`subscriptionFunds` del donatore locale. Solo le autorizzazioni di carta sono `riutilizzabili` — i doni di denaro mobile sono una tantum, in modo che `createSubscription` li rifiuti. I dati demo seminano una seconda chiesa (Accra Community Church, `CHU00000002`) su un gateway Paystack modalità test GHS in modo che la suite Paystack Playwright giri accanto a una Stripe di Grace.

I provider personalizzati possono essere registrati in fase di esecuzione quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` è impostato; `AbstractExperimentalGatewayProvider` è la classe base per quelli. I nomi dei provider vengono abbinati senza distinzione tra maiuscole e minuscole.

### Configurazione del gateway e segreti

Un amministratore salva le credenziali del gateway tramite `POST /giving/gateways` (`GatewayController`). Al salvataggio il controller crittografa le chiavi private e webhook con `EncryptionHelper` prima di persistere, quindi — su qualsiasi host non localhost — elimina il webhook esistente della chiesa e fornisce uno nuovo puntato a `/giving/donate/webhook/{provider}?churchId=…`. Una chiesa conserva una riga per provider: il salvataggio di un gateway sostituisce solo la riga esistente per quello stesso provider. I lettori pubblici (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) restituiscono solo chiavi pubbliche.

## Modello di dati

Lo schema di donazione (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelli in `models/`) è uno schema MySQL accessibile tramite Kysely:

| Table | Role |
|-------|------|
| `gateways` | Configurazione provider per chiesa: `provider`, `publicKey`, `privateKey`/`webhookKey` crittografati, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Designazioni di donazione (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Raggruppamento per entry/reporting (`name`, `batchDate`) |
| `donations` | Un regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; dichiarazioni, totali, dashboard e report di donazione contano solo `complete` o null), `transactionId` |
| `fundDonations` | Allocazione di una donazione tra uno o più fondi (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Regalo ricorrente; `id` è l'ID della sottoscrizione del gateway, collegato a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Divisione di fondi per un regalo ricorrente |
| `customers` | Collega un `personId` al suo ID cliente del gateway, per `provider` |
| `gatewayPaymentMethods` | Carte/banche salvate: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Percorso di audit webhook/evento e chiave dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagne di promessa legate a un fondo e l'importo promesso di ogni persona |

Una donazione è divisa tra i fondi tramite `fundDonations` — la donazione porta il totale, ogni `fundDonation` porta una fetta. `donations.currency` e `gateways.currency` portano la valuta ISO; ogni provider pubblicizza i suoi `supportedCurrencies` e gli importi sono formattati con `CurrencyHelper.formatCurrencyWithLocale`.

## Flussi end-to-end

### Membro una tantum e ricorrente (B1App)

La schermata dona autenticata (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compone tre componenti apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. B1App fa il caricamento di dati circostanti — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e passa l'elenco dei gateway; il provider risolto carica il suo SDK dal gateway record's public key. L'addebito stesso accade dentro apphelper: il provider risolto tokenizza il metodo (nuovo o salvato), quindi pubblica `/giving/donate/charge` per un regalo una tantum o `/giving/donate/subscribe` per uno ricorrente. Entrambi gli endpoint attribuiscono un donatore connesso al loro `personId` (solo titolari `donations.edit` possono attribuire a un altro) e rifiutano divisioni di fondi che si sommano a più dell'importo addebitato. I regali ricorrenti creano una riga `subscriptions` più `subscriptionFunds` e consegnano il programma al gateway (Stripe Subscriptions, PayPal Billing Plans o un programma ricorrente KF).

### Donazione ospite / anonima

La pagina di donazione pubblica (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e il pannello "dona ora" eseguono il rendering di `NonAuthDonationWrapper` da `@churchapps/apphelper/website`, che inietta reCAPTCHA e il contesto Elements del gateway intorno al `GuestForm` del provider. Gli ospiti non ottengono login, nessun metodo salvato e nessuna cronologia. Il flusso recupera `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (solo chiavi pubbliche), verifica il visitatore con `POST /giving/donate/captcha-verify`, tokenizza nel browser e pubblica `/giving/donate/charge` (o `/subscribe`). ACH ospite usa il `POST /giving/paymentmethods/ach-setup-intent-anon` anonimo.

Tre opzioni di modulo ospite cavalcano la stessa chiamata di addebito. `?fundId=` e `?amount=` sull'URL di donazione prescelgono la divisione di fondi (letto da ogni modulo ospite del provider al mount, instradato tramite il gestore di cambio fondo normale in modo che i totali e le commissioni si aggiornino). `anonymous: true` rende `DonateController.charge` scartare qualsiasi persona il client ha inviato e registra il regalo con `personId = null`; il modulo ospite salta `/people/loadOrCreate` e il passo cliente/vault, e i tre provider a registro immediato smettono di risolvere una persona dal cliente gateway. Apple Pay necessita che il dominio della pagina sia registrato con Stripe, quindi un modulo ospite Stripe pubblica una volta per sessione al `POST /giving/donate/register-domain` pubblico e rate-limited, che accetta solo un dominio che appartiene alla chiesa (`<subDomain>.b1.church`, una riga nella tabella domini del modulo contenuto, o un host locale) prima di chiamare l'API dei domini dei metodi di pagamento di Stripe.

### Amministrazione recording e importazione Stripe (B1Admin)

La sezione donazioni di B1Admin (`B1Admin/src/donations/`) è dove i team di finanza lavorano. L'entry batch (`components/BulkDonationEntry.tsx`) registra regali in contanti/assegni/in natura inviando `/giving/donations` quindi `/giving/funddonations` — nessun gateway coinvolto. Fondi, batch, campagne e dichiarazioni ciascuno mappa ai loro percorsi CRUD `/giving/*`. Il pannello di stile dona (`B1Admin/src/donationComponents/`) riusa gli stessi componenti apphelper di B1App.

Il reporting e gli hand-off contabili sono lavori lato client o runner di report, non lavoro del gateway: il CSV di esportazione di QuickBooks della pagina del batch costruisce una voce di diario dal `donations` + `fundDonations` del batch (debito Fondi Non Depositati, credito per fondo), la scheda Donatori Inattivi esegue `Api/reports/lapsedGivers.json` tramite il runner di report generico con nomi di persone risolti da `ReportOutput` e i formati di ricevuta per paese (Canada / Australia / Nuova Zelanda) sono impostazioni della chiesa nell'archivio chiave/valore di iscrizione reso da `GivingStatementDocument` e duplicato nella pagina di stampa di B1App.

### Conversione di totali misti-valuta

Qualsiasi endpoint che restituisca un singolo totale combinato tra possibili regali di valuta mista — i KPI di riepilogo di donazione (`GivingKpiCards`), un totale di batch di donazione, un totale di fondo e i totali anno-da-data/periodo della schermata di donazione di B1App — converte alla valuta predefinita della chiesa lato server piuttosto che sommare valute diverse. `Api/src/shared/helpers/ExchangeRateHelper.ts` recupera i tassi da `api.frankfurter.dev` chiave per la valuta della chiesa, li memorizza nella cache in-process per 12 ore ed espone `convertTotals(rows, churchCurrency, rates)`: le righe sono pre-raggruppate per valuta in SQL (un pugno di gruppi, mai una conversione per regalo), ogni gruppo viene convertito e sommato, e il risultato porta un flag `isConverted` il client usa per mostrare una nota "Convertito ai tassi di cambio attuali". I record di donazione individuale e i report storici/valuta originale non vengono mai convertiti — solo i totali combinati lo sono.

L'importazione Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) riempie i regali fatti fuori B1: chiama `POST /giving/donate/replay-stripe-events` con `dryRun: true` per un'anteprima, quindi `dryRun: false` per importare. Il server elenca gli eventi Stripe per l'intervallo di date e salta qualsiasi cosa già registrata — abbinata prima da `eventLogs` provider id, quindi da `DonationRepo.findMatchingDonation` (importo + data + persona) in modo che una re-esecuzione non importi mai doppi.

## Webhook e riconciliazione

I pagamenti liquidati e i cambiamenti di stato della sottoscrizione arrivano a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). L'elaborazione è intenzionalmente idempotente:

1. **Verifica** — `GatewayService.verifyWebhook` delega al controllo della firma del provider; una firma fallita restituisce 401. Gli eventi che non hanno bisogno di elaborazione si cortocircuitano con 200.
2. **Dedup l'evento** — `EventLogRepo.loadByProviderId` salta un webhook già registrato in `eventLogs`.
3. **Dedup la donazione** — prima di creare nulla, `DonationRepo.loadByTransactionId` viene controllato contro ogni ID candidato che il payload potrebbe portare. Questo assorbe consegne duplicate, eventi ACH multi-fase (in sospeso → liquidato) e il caso in cui `/donate/charge` ha già registrato il regalo in modo ottimistico.
4. **Applica** — il `classifyWebhookEvent(eventType)` del provider dice cosa significa l'evento (`donation` pending/complete, `cancel-subscription` o `ignore`); i pagamenti completati creano una donazione `complete` (o promuovono una `pending` o `failed` esistente), gli eventi in stile ACH si fermano come `pending` fino al regolamento, un'fattura di sottoscrizione fallita (Stripe `invoice.payment_failed`) crea una donazione `failed` chiave sull'ID fattura e gli eventi di annullamento eliminano la riga `subscriptions` locale. Il controller non ispeziona mai i nomi di evento specifici del provider.

### Regali ricorrenti falliti e dunning

Una donazione `failed` è l'unità di lavoro per il recupero. `GET /giving/donations/failed` li elenca con il messaggio di errore gateway più nuovo da `eventLogs` e un flag `canRetry` dalle capacità del provider; `POST /giving/donate/retry/:donationId` chiama il `retryFailedPayment` del provider (Stripe paga la fattura aperta) e il webhook risultante promuove la riga a `complete` tramite il percorso dedup normale. Le email di dunning vanno al donatore dal gestore webhook il giorno 0, quindi da `DunningHelper.run` nel timer di mezzanotte (cablato sia in `lambda/timer-handler.ts` che `RailwayCron.ts`) ai giorni 3 e 7; ogni invio è registrato in `eventLogs` come `provider: "dunning"`, `providerId: "<donationId>:<day>"`, quindi un re-esecuzione non invia mai email due volte. Quando Stripe smette e annulla la sottoscrizione (`customer.subscription.deleted` con `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` invia un'email al donatore una volta (`providerId: "<subscriptionId>:canceled"`); le cancellazioni iniziate da donatore o amministratore rimangono silenziose. Stripe non aggiunge mai eventi a un endpoint esistente: dopo aver cambiato `StripeHelper.webhookEvents`, ri-salvare il gateway o eseguire `tools/manual/stripe-webhook-events.ts` (esecuzione a secco per impostazione predefinita, `--apply` per scrivere) in prod.

I provider con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) hanno i loro addebiti registrati dalla risposta `/charge` (nessun round-trip webhook richiesto per il percorso felice), mentre Stripe si affida a `payment_intent.succeeded` / `invoice.paid` e ACH `payment_intent.processing`. L'handling delle commissioni (`POST /giving/donate/fee`, il flag `payFees` gateway e il `calculateFees` di ogni provider) calcola il lordo "coprire le commissioni" dal lato donatore — B1 non accetta alcun taglio di piattaforma, quindi nessuna commissione di applicazione è mai aggiunta.

:::info
I percorsi di carica e webhook scrivono le stesse righe `donations` / `fundDonations`. `transactionId` è la chiave di unione che mantiene un registro di carica ottimista e il suo webhook successivo dal produrre due donazioni per un regalo.
:::

## Pagine Correlate

- [Endpoint di Donazioni](../api/endpoints/giving) — superficie REST completa per donazioni, fondi, batch, gateway, sottoscrizioni, metodi di pagamento e webhook
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che spedisce il registro del provider di pagamento e i componenti di donazione
- [Struttura dei Moduli](../api/module-structure) — come il modulo GivingApi è organizzato lato server
