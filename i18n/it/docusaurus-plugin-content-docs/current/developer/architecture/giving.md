---
title: "Architettura Donazioni"
---

# Architettura Donazioni

<div class="article-intro">

ChurchApps esegue le donazioni su un modello gateway-rail: la chiesa mantiene il proprio account Stripe (o PayPal, Kingdom Funding o Paystack), e B1 non si posiziona mai nel percorso dei soldi come processore di piattaforma. I dati della carta vengono tokenizzati nel browser e non raggiungono mai un server ChurchApps. Questa pagina mappa l'intero stack — il registro dei provider lato client in `@churchapps/apphelper`, l'astrazione del gateway GivingApi, il modello dati della donazione, e come i webhook del gateway si riconciliano nel database.

</div>

## Panoramica

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

Tre principi reggono l'intero stack:

1. **Il gateway tiene la carta.** Il widget di immissione di ogni provider tokenizza nel browser; l'API riceve solo un token, nonce o id di ordine.
2. **Un'astrazione, molti provider.** Il browser risolve un `PaymentProvider` da un registro; il server risolve un `IGatewayProvider` da una factory. Entrambi si basano sullo stesso nome di provider normalizzato memorizzato nel record del gateway.
3. **I webhook sono la fonte di verità per il regolamento.** Una risposta di addebito viene registrata in modo ottimistico, ma il webhook firmato del gateway è ciò che conferma (o crea) la donazione completata, con guardie di idempotenza su entrambi i lati.

## Lato client: il registro dei provider di pagamento (`@churchapps/apphelper`)

Il registro vive in `Packages/apphelper/src/donations/providers/`, con i widget e gli helper di ogni provider nella propria sottocartella (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nulla al di fuori di `providers/` si biforca su un nome di provider. Un `PaymentProvider` (vedi `providers/types.ts`) raggruppa tutto ciò di cui un'app host ha bisogno per un gateway: un `descriptor` (etichette amministrative, valute supportate, campi di commissione, tariffe di commissione predefinite, URL del dashboard/registrazione), un set di flag `capabilities` (carte salvate, ACH, ricorrente, immissione carta nuova in linea, salvataggio implicito su tokenizzazione), i widget React per l'immissione dei membri (`MemberWrapper`/`MemberEntry`), le donazioni guest (`GuestForm`), la modifica del metodo salvato (`MethodEditForm`), e i pagamenti tramite domande di modulo (`FormPayment`), più `buildChargeRequest(ctx, token)` — l'unico posto dove la forma del payload di addebito differisce per provider. Il `MemberWrapper` di ogni provider carica il proprio SDK dal record del gateway della chiave pubblica, quindi le app host non importano mai un SDK del gateway (B1App e B1Admin non hanno alcuna dipendenza `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizza quale dei gateway della chiesa una superficie dovrebbe utilizzare.

`providers/registry.ts` contiene i built-in. Sono **referenziati per valore**, non registrati tramite un effetto collaterale del modulo, quindi l'albero-shake di un bundler non può mai eliminare la registrazione:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funzione | Scopo |
|----------|---------|
| `getPaymentProvider(name)` | Risolvi per nome normalizzato; ritorna a Stripe in modo che un provider non configurato non faccia crash difficili il modulo donatore |
| `registerPaymentProvider(p)` | Registra un provider aggiuntivo in fase di esecuzione (per un gateway personalizzato di un'app host) |
| `listPaymentProviders()` | Enumera built-in + personalizzati — usato per creare il dropdown del gateway amministrativo |
| `hasPaymentProvider(name)` | Controllo di appartenenza |

**Provider client built-in: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin solo *leggono* il registro (`getPaymentProvider`, `listPaymentProviders`); nessuno chiama `registerPaymentProvider` — la registrazione rimane all'interno di apphelper.

Ogni provider tokenizza diversamente, ma tutti mantengono la carta fuori da B1:

| Provider | Widget di immissione | Token restituito all'API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; il modulo guest monta anche un `ExpressCheckoutElement` (Apple Pay / Google Pay, doni una tantum) il cui `onConfirm` si risolve nello stesso id `pm_…` | id metodo di pagamento (`pm_…`); banca tramite `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` per gateway USD, Canadian PAD `acss_debit` (modale mandato ospitato, mandato `default_for` fatture/sottoscrizioni, gli addebiti una tantum passano l'id mandato) per gateway CAD |
| Kingdom Funding | Modulo tokenizzatore ospitato con chiave dalla chiave pubblica del gateway | nonce monouso |
| PayPal | PayPal Hosted Fields (carta, ricorrente) più PayPal Smart Buttons con finanziamento Venmo (una tantum); entrambi condividono un caricamento SDK e il server ordina costruito tramite `/donate/client-token` + `/donate/create-order` | id ordine catturato |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`) — il popup stesso accetta il pagamento (carta, denaro mobile, trasferimento bancario, USSD) | riferimento transazione pagato; i metodi salvati sono codici di autorizzazione Paystack `AUTH_…` |

Il `finalizeResult` di Stripe esegue 3-D Secure / SCA nel browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) prima che la donazione sia considerata completa; il modulo condiviso chiama semplicemente `provider.finalizeResult(result)` senza conoscenza di quello che fa.

## Lato server: l'astrazione del gateway (GivingApi)

Il modulo `/giving` (`Api/src/modules/giving`) espone la superficie REST; l'impianto idraulico del gateway vive in `Api/src/shared/helpers`. `DonateController` non parla mai direttamente a un SDK del gateway — passa attraverso `GatewayService`, che risolve il giusto `IGatewayProvider` da `GatewayFactory` e gli passa un `GatewayConfig` decifrato.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) è il contratto che ogni gateway implementa — ciclo di vita del webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), commissioni (`calculateFees`), gestione del metodo salvato (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), e extra facoltativi (clienti, ordini, SetupIntents, riproduzione di eventi, `retryFailedPayment` per una fattura di sottoscrizione non riuscita, `registerPaymentMethodDomain` per la verifica del dominio Apple Pay). Un provider che omette un hook facoltativo viene segnalato come non supportato per tale azione e l'interfaccia utente nasconde il controllo. Ogni classe provider dichiara la propria matrice `capabilities` (valute supportate, ACH, rimborsi, requisiti di sottoscrizione, limiti di transazione) — `GatewayService.getProviderCapabilities(provider)` la legge semplicemente — e i flag come `logsDonationsImmediately` guidano il comportamento del controller senza alcun condizionale di nome di provider nei controller.

**Provider server registrati in `GatewayFactory`:**

| Provider | Disponibilità |
|----------|-------------|
| Stripe | Sempre attivo |
| PayPal | Sempre attivo |
| Kingdom Funding | Sempre attivo |
| Paystack | Sempre attivo (commercianti Nigeria, Ghana, Sud Africa, Kenya, Costa d'Avorio; valute NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in tramite il flag di ambiente `ENABLE_SQUARE` |
| ePayMints | Opt-in tramite il flag di ambiente `ENABLE_EPAYMINTS` |

Paystack differisce dagli altri in quanto il denaro si muove prima che GivingApi sia coinvolto: il popup addebita al donatore, `processCharge` è un `GET /transaction/verify/:reference` il cui importo pagato e valuta devono corrispondere alla donazione registrata (un riferimento già in file non viene mai registrato due volte), e il primo regalo di un programma ricorrente viene registrato da `finalizeSubscription` (verifica → `POST /plan` → `POST /subscription` con `start_date` un intervallo di distanza). I webhook sono firmati con la stessa chiave segreta (`x-paystack-signature`, HMAC-SHA512 sul corpo grezzo) e Paystack non ha un'API di gestione dei webhook, quindi lo schermo amministrativo mostra l'URL per la chiesa da incollare nel suo dashboard. Gli eventi di rinnovo `charge.success` non portano alcuna divisione di fondi; il provider la recupera dalle righe locali di `subscriptions`/`subscriptionFunds` del donatore. Solo le autorizzazioni di carta sono `riutilizzabili` — i doni di denaro mobile sono solo una tantum, quindi `createSubscription` le rifiuta. I dati demo seminano una seconda chiesa (Accra Community Church, `CHU00000002`) su un gateway Paystack in modalità test GHS in modo che la suite Playwright di Paystack funzioni accanto a quella di Grace su Stripe.

I provider personalizzati possono essere registrati in fase di esecuzione quando `ENABLE_CUSTOM_GATEWAY_PROVIDERS` è impostato; `AbstractExperimentalGatewayProvider` è la classe base per quelli. I nomi dei provider vengono confrontati senza distinzione tra maiuscole e minuscole.

### Configurazione del gateway e segreti

Un amministratore salva le credenziali del gateway tramite `POST /giving/gateways` (`GatewayController`). Al salvataggio il controller cifra le chiavi private e webhook con `EncryptionHelper` prima della persistenza, quindi — su qualsiasi host non localhost — elimina il webhook esistente della chiesa e fornisce uno nuovo indirizzato a `/giving/donate/webhook/{provider}?churchId=…`. Una chiesa mantiene una riga per provider: salvare un gateway sostituisce solo la riga esistente per lo stesso provider. Le letture pubbliche (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) restituiscono solo chiavi pubbliche.

## Modello dati

Lo schema di donazione (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelli in `models/`) è uno schema MySQL accessibile attraverso Kysely:

| Tabella | Ruolo |
|-------|------|
| `gateways` | Configurazione del provider per chiesa: `provider`, `publicKey`, `privateKey`/`webhookKey` criptati, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Designazioni di donazione (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Raggruppamento per immissione/relazione (`name`, `batchDate`) |
| `donations` | Un regalo: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; rendiconti, totali, dashboard e relazioni su donazioni contano solo `complete` o null), `transactionId` |
| `fundDonations` | Allocazione di una donazione su uno o più fondi (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Regalo ricorrente; `id` è l'id della sottoscrizione del gateway, collegato a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Divisione dei fondi per un regalo ricorrente |
| `customers` | Collega un `personId` al suo id cliente del gateway, per `provider` |
| `gatewayPaymentMethods` | Carte/banche salvate: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Traccia di audit webhook/evento e chiave di dedup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagne di promesse legate a un fondo, e l'importo promesso di ogni persona |

Una donazione è divisa tra i fondi tramite `fundDonations` — la donazione porta il totale, ogni `fundDonation` porta una fetta. `donations.currency` e `gateways.currency` portano la valuta ISO; ogni provider pubblicizza il suo `supportedCurrencies`, e gli importi sono formattati con `CurrencyHelper.formatCurrencyWithLocale`.

## Flussi end-to-end

### Membro una tantum e ricorrente (B1App)

Lo schermo di donazione autenticato (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compone tre componenti apphelper: `MultiGatewayDonationForm`, `PaymentMethods`, e `RecurringDonations`. B1App esegue il caricamento dati circostante — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e passa l'elenco del gateway; il provider risolto carica il suo SDK dalla chiave pubblica del gateway. L'addebito stesso avviene all'interno di apphelper: il provider risolto tokenizza il metodo (nuovo o salvato), quindi pubblica a `/giving/donate/charge` per un regalo una tantum o `/giving/donate/subscribe` per un regalo ricorrente. Entrambi gli endpoint attribuiscono un donatore firmato al loro proprio `personId` (solo gli holder di `donations.edit` possono attribuire a qualcun altro) e rifiutano le divisioni di fondi che si aggiungono a più dell'importo addebitato. I regali ricorrenti creano una riga `subscriptions` più `subscriptionFunds` e affidano il programma al gateway (Stripe Subscriptions, PayPal Billing Plans, o un programma ricorrente KF).

### Donazione ospite / anonima

La pagina di donazione pubblica (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e il pannello "dai ora" visualizzano `NonAuthDonationWrapper` da `@churchapps/apphelper/website`, che inietta reCAPTCHA e il contesto degli Elementi del gateway intorno al `GuestForm` del provider. Gli ospiti non ottengono login, nessun metodo salvato e nessuna cronologia. Il flusso recupera `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (solo chiavi pubbliche), verifica il visitatore con `POST /giving/donate/captcha-verify`, tokenizza nel browser e pubblica a `/giving/donate/charge` (o `/subscribe`). L'ACH ospite anonimo usa il `POST /giving/paymentmethods/ach-setup-intent-anon` anonimo.

Tre opzioni di modulo ospite si verificano sulla stessa chiamata di addebito. `?fundId=` e `?amount=` sull'URL di donazione preselezionano la divisione dei fondi (letto da ogni modulo ospite del provider al montaggio, instradato attraverso il gestore normale di cambio di fondo in modo che i totali e le commissioni si aggiornino). `anonymous: true` fa sì che `DonateController.charge` scarta qualsiasi persona che il client ha inviato e registra il regalo con `personId = null`; il modulo ospite salta `/people/loadOrCreate` e il passo cliente/vault, e i tre provider di log immediato smettono di risolvere una persona dal cliente del gateway. Apple Pay ha bisogno che il dominio della pagina sia registrato su Stripe, quindi un modulo ospite Stripe pubblica una volta per sessione al `POST /giving/donate/register-domain` pubblico, con limitazione di velocità, che accetta solo un dominio che appartiene alla chiesa (`<subDomain>.b1.church`, una riga nella tabella dei domini del modulo di contenuto, o un host locale) prima di chiamare l'API dei domini del metodo di pagamento di Stripe.

### Registrazione amministrativa e importazione Stripe (B1Admin)

La sezione donazioni di B1Admin (`B1Admin/src/donations/`) è dove i team finanziari lavorano. L'immissione batch (`components/BulkDonationEntry.tsx`) registra regali in contanti/assegni/in natura inviando `/giving/donations` quindi `/giving/funddonations` — nessun gateway coinvolto. I fondi, i batch, le campagne e gli estratti conto mappano ciascuno alle loro rotte CRUD `/giving/*`. Il pannello di donazione in stile membro (`B1Admin/src/donationComponents/`) riutilizza gli stessi componenti apphelper di B1App.

La relazione e i trasferimenti di contabilità sono lavoro lato client o runner di relazione, non lavoro di gateway: la pagina di batch ha la costruzione di esportazione QuickBooks di un CSV di registrazione del giornale dal `donations` del batch + `fundDonations` (Undeposited Funds di debito, un credito per fondo), la scheda Donatori lapsed esegue `Api/reports/lapsedGivers.json` tramite il runner di relazione generico con nomi di persone risolti da `ReportOutput`, e i formati di riceuta per paese (Canada / Australia / Nuova Zelanda) sono impostazioni della chiesa nell'archivio di coppie chiave/valore di appartenenza renderizzato da `GivingStatementDocument` e duplicato nella pagina di stampa di B1App.

### Conversione di totali in valuta mista

Qualsiasi endpoint che restituisce un singolo totale combinato tra possibili regali in valuta mista — i KPI del riepilogo di donazione (`GivingKpiCards`), un totale di batch di donazione, un totale di fondo, e i totali anno-da-data/periodo dello schermo di donazione di B1App — converte alla valuta predefinita della chiesa lato server piuttosto che sommare valute diverse. `Api/src/shared/helpers/ExchangeRateHelper.ts` recupera i tassi da `api.frankfurter.dev` con chiave dalla valuta della chiesa, li memorizza nel processo per 12 ore, e espone `convertTotals(rows, churchCurrency, rates)`: le righe sono pre-raggruppate per valuta in SQL (una manciata di gruppi, mai una conversione per regalo), ogni gruppo viene convertito e sommato, e il risultato porta un flag `isConverted` che il client usa per mostrare una nota "Convertito ai tassi di cambio attuali". `GET /donations/exchange-rates` espone la tabella dei tassi ai client che ne hanno bisogno (schermo di donazione di B1App); i tassi stessi non vengono mai accettati da una richiesta, solo mai recuperati lato server, quindi un client non può influenzare un totale riportato. I singoli record di donazione e i rapporti storici/della valuta originale non vengono mai convertiti — solo i totali combinati lo sono.

Importazione Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) backfill regali fatti al di fuori di B1: chiama `POST /giving/donate/replay-stripe-events` con `dryRun: true` per un'anteprima, quindi `dryRun: false` per importare. Il server elenca gli eventi Stripe per l'intervallo di date e salta qualsiasi cosa già registrata — corrispondenza prima da `eventLogs` provider id, quindi da `DonationRepo.findMatchingDonation` (importo + data + persona) in modo che un re-run non faccia mai doppia importazione.

## Webhook e riconciliazione

I pagamenti regolati e i cambiamenti di stato della sottoscrizione arrivano a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). L'elaborazione è deliberatamente idempotente:

1. **Verifica** — `GatewayService.verifyWebhook` delega al controllo della firma del provider; una firma non riuscita restituisce 401. Gli eventi che non necessitano di elaborazione cortocircuitano con 200.
2. **Dedup l'evento** — `EventLogRepo.loadByProviderId` salta un webhook già registrato in `eventLogs`.
3. **Dedup la donazione** — prima di creare qualsiasi cosa, `DonationRepo.loadByTransactionId` è controllato rispetto a ogni id candidato che il payload potrebbe portare. Ciò assorbe consegne duplicate, eventi ACH multi-stage (pending → settled), e il caso in cui `/donate/charge` ha già registrato il regalo in modo ottimistico.
4. **Applica** — il `classifyWebhookEvent(eventType)` del provider dice cosa significa l'evento (`donation` pending/complete, `cancel-subscription`, o `ignore`); i pagamenti completati creano una donazione `complete` (o promuovono un `pending` o `failed` esistente), gli eventi in stile ACH si posizionano come `pending` fino al regolamento, una fattura di sottoscrizione non riuscita (Stripe `invoice.payment_failed`) crea una donazione `failed` con chiave su id fattura, e gli eventi di cancellazione eliminano la riga locale `subscriptions`. Il controller non ispeziona mai nomi di evento specifici del provider.

### Regali ricorrenti falliti e riscossione

Una donazione `failed` è l'unità di lavoro per il recupero. `GET /giving/donations/failed` le elenca con il messaggio di errore del gateway più recente da `eventLogs` e un flag `canRetry` dalle capacità del gateway; `POST /giving/donate/retry/:donationId` chiama il `retryFailedPayment` del provider (Stripe paga la fattura aperta), e il webhook risultante promuove la riga a `complete` attraverso il percorso di dedup normale. Le email di riscossione vanno al donatore dal gestore webhook nel giorno 0, quindi da `DunningHelper.run` nel timer di mezzanotte (cablato in sia `lambda/timer-handler.ts` che `RailwayCron.ts`) nei giorni 3 e 7; ogni invio è registrato in `eventLogs` come `provider: "dunning"`, `providerId: "<donationId>:<day>"`, quindi un re-run non invia email due volte. Gli endpoint webhook di Stripe creati prima di questa funzione non si sottoscrivono a `invoice.payment_failed`; ri-salvare il gateway fornisce un endpoint fresco con l'evento.

I provider con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) hanno i loro addebiti registrati dalla risposta `/charge` (nessun round-trip webhook richiesto per il percorso felice), mentre Stripe si affida a `payment_intent.succeeded` / `invoice.paid` e ACH `payment_intent.processing`. La gestione delle commissioni (`POST /giving/donate/fee`, il flag gateway `payFees`, e il `calculateFees` di ogni provider) calcola il gross-up "coprire le commissioni" dal lato del donatore — B1 non prende alcun taglio di piattaforma, quindi nessuna commissione di applicazione viene mai aggiunta.

:::info
I percorsi di addebito e webhook scrivono le stesse righe `donations` / `fundDonations`. `transactionId` è la chiave di join che mantiene un log di addebito ottimistico e il suo webhook successivo dal produrre due donazioni per un regalo.
:::

## Pagine correlate

- [Giving Endpoints](../api/endpoints/giving) — superficie REST completa per donazioni, fondi, batch, gateway, sottoscrizioni, metodi di pagamento e webhook
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che spedisce il registro del provider di pagamento e i componenti di donazione
- [Module Structure](../api/module-structure) — come il modulo GivingApi è organizzato lato server
