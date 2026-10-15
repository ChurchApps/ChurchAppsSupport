---
title: "Architettura delle donazioni"
---

# Architettura delle donazioni

<div class="article-intro">

ChurchApps gestisce le donazioni con un modello a gateway: la chiesa mantiene il proprio account Stripe (oppure PayPal, Kingdom Funding o Paystack), e B1 non si trova mai nel flusso del denaro come processore di pagamento della piattaforma. I dati della carta vengono tokenizzati nel browser e non raggiungono mai un server ChurchApps. Questa pagina descrive l'intero stack: il registro dei provider di pagamento lato client in `@churchapps/apphelper`, l'astrazione del gateway in GivingApi, il modello dei dati delle donazioni e come i webhook dei gateway si riconciliano con il database.

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

Tre principi valgono per tutto lo stack:

1. **Il gateway custodisce la carta.** Il widget di inserimento di ogni provider tokenizza nel browser; l'API riceve solo un token, un nonce o un ID ordine.
2. **Un'unica astrazione, molti provider.** Il browser risolve un `PaymentProvider` dal registro; il server risolve un `IGatewayProvider` dalla factory. Entrambi usano lo stesso nome normalizzato del provider memorizzato nel record del gateway.
3. **I webhook sono la fonte di verità per il regolamento.** La risposta di un addebito viene registrata in modo ottimistico, ma il webhook firmato del gateway è ciò che conferma (o crea) la donazione completata, con protezioni di idempotenza su entrambi i lati.

## Lato client: il registro dei provider di pagamento (`@churchapps/apphelper`)

Il registro si trova in `Packages/apphelper/src/donations/providers/`, con i widget e le funzioni di supporto di ciascun provider nella propria sottocartella (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nulla al di fuori di `providers/` si diramma in base al nome del provider. Un `PaymentProvider` (vedi `providers/types.ts`) raggruppa tutto ciò che un'app host richiede per un gateway: un `descriptor` (etichette per l'amministratore, valute supportate, campi delle commissioni, tariffe predefinite, URL di dashboard/registrazione), un insieme di `capabilities` (carte salvate, ACH, ricorrenti, inserimento di nuova carta inline, salvataggio implicito alla tokenizzazione), i widget React per l'inserimento dei membri (`MemberWrapper`/`MemberEntry`), le donazioni dei visitatori (`GuestForm`), la modifica dei metodi salvati (`MethodEditForm`) e i pagamenti delle domande dei moduli (`FormPayment`), oltre a `buildChargeRequest(ctx, token)` — l'unico punto in cui la forma del payload dell'addebito differisce per provider. Il `MemberWrapper` di ogni provider carica il proprio SDK dalla chiave pubblica del record del gateway, quindi le app host non importano mai un SDK di gateway (B1App e B1Admin non hanno alcuna dipendenza da `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizza quale dei gateway di una chiesa deve usare ciascuna superficie.

`providers/registry.ts` contiene i provider integrati. Sono **referenziati per valore**, non registrati tramite un effetto collaterale di un modulo, così il tree-shaking del bundler non può mai eliminare la registrazione:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funzione | Scopo |
|----------|---------|
| `getPaymentProvider(name)` | Risolve per nome normalizzato; ricade su Stripe così un provider configurato male non blocca il modulo del donatore |
| `registerPaymentProvider(p)` | Registra un provider aggiuntivo a runtime (per un gateway personalizzato dell'app host) |
| `listPaymentProviders()` | Enumera i provider integrati e quelli personalizzati — usato per costruire il menu a tendina dei gateway dell'amministratore |
| `hasPaymentProvider(name)` | Verifica di appartenenza |

**Provider lato client integrati: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin si limitano a *leggere* il registro (`getPaymentProvider`, `listPaymentProviders`); nessuno dei due chiama `registerPaymentProvider` — la registrazione resta all'interno di apphelper.

Ogni provider tokenizza in modo diverso, ma tutti tengono la carta fuori da B1:

| Provider | Widget di inserimento | Token restituito all'API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` di Stripe `Elements` → `stripe.createPaymentMethod(...)`; il modulo per i visitatori monta anche un `ExpressCheckoutElement` (Apple Pay / Google Pay, per doni una tantum) il cui `onConfirm` risolve nello stesso ID `pm_…` | ID del metodo di pagamento (`pm_…`); conto bancario tramite `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` per i gateway in USD, `acss_debit` PAD canadese (modale del mandato ospitata, mandato `default_for` fatture/abbonamenti, gli addebiti una tantum passano l'ID del mandato) per i gateway in CAD |
| Kingdom Funding | Modulo di tokenizzazione ospitato, indicizzato dalla chiave pubblica del gateway | nonce monouso |
| PayPal | PayPal Hosted Fields (carta, ricorrenti) più PayPal Smart Buttons con finanziamento Venmo (una tantum); entrambi condividono un unico caricamento dell'SDK e l'ordine lato server costruito tramite `/donate/client-token` + `/donate/create-order` | ID dell'ordine incassato |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`) — il popup stesso effettua il pagamento (carta, mobile money, bonifico bancario, USSD) | riferimento della transazione pagata; i metodi salvati sono codici di autorizzazione Paystack `AUTH_…` |

Il `finalizeResult` di Stripe esegue 3-D Secure / SCA nel browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) prima che la donazione sia considerata completata; il modulo condiviso chiama semplicemente `provider.finalizeResult(result)` senza sapere cosa faccia.

## Lato server: l'astrazione del gateway (GivingApi)

Il modulo `/giving` (`Api/src/modules/giving`) espone la superficie REST; l'infrastruttura del gateway si trova in `Api/src/shared/helpers`. `DonateController` non parla mai direttamente con un SDK di gateway — passa per `GatewayService`, che risolve il corretto `IGatewayProvider` da `GatewayFactory` e gli consegna una `GatewayConfig` decifrata.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) è il contratto che ogni gateway implementa — ciclo di vita dei webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), commissioni (`calculateFees`), gestione dei metodi salvati (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) ed estensioni opzionali (clienti, ordini, SetupIntent, riproduzione degli eventi, `retryFailedPayment` per una fattura di abbonamento non riuscita, `registerPaymentMethodDomain` per la verifica del dominio di Apple Pay). Un provider che omette un hook opzionale viene segnalato come non supportato per quell'azione e l'interfaccia nasconde il controllo. Ogni classe di provider dichiara la propria matrice `capabilities` (valute supportate, ACH, rimborsi, requisiti degli abbonamenti, limiti di transazione) — `GatewayService.getProviderCapabilities(provider)` si limita a leggerla — e flag come `logsDonationsImmediately` guidano il comportamento dei controller senza condizioni sul nome del provider nei controller.

**Provider server registrati in `GatewayFactory`:**

| Provider | Disponibilità |
|----------|-------------|
| Stripe | Sempre attivo |
| PayPal | Sempre attivo |
| Kingdom Funding | Sempre attivo |
| Paystack | Sempre attivo (commercianti di Nigeria, Ghana, Sudafrica, Kenya, Costa d'Avorio; valute NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Attivabile tramite la variabile d'ambiente `ENABLE_SQUARE` |
| ePayMints | Attivabile tramite la variabile d'ambiente `ENABLE_EPAYMINTS` |

Paystack differisce dagli altri perché il denaro si muove prima che GivingApi sia coinvolto: il popup addebita il donatore, `processCharge` è un `GET /transaction/verify/:reference` il cui importo pagato e la cui valuta devono corrispondere alla donazione che viene registrata (un riferimento già presente non viene mai registrato due volte), e il primo dono di una pianificazione ricorrente viene registrato da `finalizeSubscription` (verifica → `POST /plan` → `POST /subscription` con `start_date` a un intervallo di distanza). I webhook sono firmati con la chiave segreta stessa (`x-paystack-signature`, HMAC-SHA512 sul corpo grezzo) e Paystack non ha alcuna API di gestione dei webhook, quindi la schermata dell'amministratore mostra l'URL che la chiesa deve incollare nella propria dashboard. Gli eventi `charge.success` di rinnovo non contengono la ripartizione sui fondi; il provider la recupera dalle righe locali `subscriptions`/`subscriptionFunds` del donatore. Solo le autorizzazioni di carta sono `reusable` — i doni tramite mobile money sono solo una tantum, quindi `createSubscription` li rifiuta. I dati demo seminano una seconda chiesa (Accra Community Church, `CHU00000002`) su un gateway GHS in modalità test di Paystack, così la suite Playwright di Paystack gira accanto a quella di Stripe di Grace.

I provider personalizzati possono essere registrati a runtime quando è impostata la variabile `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` è la classe base per questi. I nomi dei provider vengono confrontati senza distinzione tra maiuscole e minuscole.

### Configurazione del gateway e segreti

Un amministratore salva le credenziali del gateway tramite `POST /giving/gateways` (`GatewayController`). Al salvataggio il controller cifra le chiavi privata e del webhook con `EncryptionHelper` prima di memorizzarle, poi — su qualsiasi host diverso da localhost — elimina il webhook esistente della chiesa e ne configura uno nuovo che punta a `/giving/donate/webhook/{provider}?churchId=…`. Una chiesa mantiene una riga per provider: salvare un gateway sostituisce solo la riga esistente per quello stesso provider. Le letture pubbliche (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) restituiscono solo le chiavi pubbliche.

## Modello dei dati

Lo schema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelli in `models/`) è uno schema MySQL acceduto tramite Kysely:

| Tabella | Ruolo |
|-------|------|
| `gateways` | Configurazione del provider per chiesa: `provider`, `publicKey`, `privateKey`/`webhookKey` cifrate, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinazioni delle donazioni (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Raggruppamento per inserimento e reportistica (`name`, `batchDate`) |
| `donations` | Un singolo dono: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; attestati, totali, dashboard e report sulle donazioni contano solo `complete` o null), `transactionId` |
| `fundDonations` | Ripartizione di una donazione su uno o più fondi (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Dono ricorrente; `id` è l'ID di abbonamento del gateway, collegato a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Ripartizione sui fondi di un dono ricorrente |
| `customers` | Collega un `personId` al suo ID cliente presso il gateway, per `provider` |
| `gatewayPaymentMethods` | Carte/conti bancari salvati: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Registro di audit degli eventi/webhook e chiave di deduplicazione (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagne di impegni legate a un fondo, e l'importo promesso da ciascuna persona |

Una donazione viene ripartita tra i fondi tramite `fundDonations` — la donazione contiene il totale, ogni `fundDonation` contiene una porzione. `donations.currency` e `gateways.currency` riportano la valuta ISO; ogni provider dichiara le proprie `supportedCurrencies`, e gli importi vengono formattati con `CurrencyHelper.formatCurrencyWithLocale`.

## Flussi end-to-end

### Donazioni una tantum e ricorrenti dei membri (B1App)

La schermata di donazione autenticata (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compone tre componenti di apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. B1App gestisce il caricamento dei dati circostanti — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e passa l'elenco dei gateway; il provider risolto carica il proprio SDK dalla chiave pubblica del gateway. L'addebito vero e proprio avviene dentro apphelper: il provider risolto tokenizza il metodo (nuovo o salvato), poi invia a `/giving/donate/charge` per un dono una tantum oppure a `/giving/donate/subscribe` per uno ricorrente. Entrambi gli endpoint attribuiscono un donatore autenticato al proprio `personId` (solo i titolari di `donations.edit` possono attribuire a un'altra persona) e rifiutano le ripartizioni sui fondi la cui somma supera l'importo addebitato. I doni ricorrenti creano una riga `subscriptions` più `subscriptionFunds` e consegnano la pianificazione al gateway (Stripe Subscriptions, PayPal Billing Plans o una pianificazione ricorrente KF).

### Donazioni dei visitatori / anonime

La pagina pubblica di donazione (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e il pannello "dona ora" renderizzano `NonAuthDonationWrapper` da `@churchapps/apphelper/website`, che inietta reCAPTCHA e il contesto Elements del gateway attorno al `GuestForm` del provider. I visitatori non hanno accesso, né metodi salvati, né storico. Il flusso recupera `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (solo chiavi pubbliche), verifica il visitatore con `POST /giving/donate/captcha-verify`, tokenizza nel browser e invia a `/giving/donate/charge` (oppure `/subscribe`). L'ACH per i visitatori usa l'endpoint anonimo `POST /giving/paymentmethods/ach-setup-intent-anon`, che consente solo la verifica istantanea (Financial Connections): una verifica tramite micro-deposito si completa giorni dopo, quando la pagina del visitatore non c'è più, quindi non potrebbe mai portare a termine il dono. Il modulo rifiuta di addebitare un SetupIntent non verificato e indirizza il donatore verso la carta o verso una configurazione bancaria con accesso effettuato.

Tre opzioni del modulo per i visitatori usano la stessa chiamata di addebito. `?fundId=` e `?amount=` nell'URL della donazione preselezionano la ripartizione sui fondi (letti dal modulo per visitatori di ciascun provider al montaggio, e instradati tramite il normale gestore di modifica dei fondi così totali e commissioni si aggiornano). `anonymous: true` fa sì che `DonateController.charge` scarti qualsiasi persona inviata dal client e registri il dono con `personId = null`; il modulo per visitatori salta `/people/loadOrCreate` e il passaggio di cliente/vault, e i tre provider a registrazione immediata smettono di risolvere una persona dal cliente del gateway. Apple Pay richiede che il dominio della pagina sia registrato presso Stripe, quindi un modulo per visitatori Stripe invia una volta per sessione a `POST /giving/donate/register-domain`, pubblico e con limite di frequenza, che accetta solo un dominio appartenente alla chiesa (`<subDomain>.b1.church`, una riga nella tabella dei domini del modulo contenuti, oppure un host locale) prima di chiamare l'API dei domini dei metodi di pagamento di Stripe.

### Registrazione amministrativa e importazione da Stripe (B1Admin)

La sezione donazioni di B1Admin (`B1Admin/src/donations/`) è dove lavora il team finanziario. L'inserimento in lotti (`components/BulkDonationEntry.tsx`) registra doni in contanti/assegno/in natura inviando `POST /giving/donations` poi `/giving/funddonations` — nessun gateway coinvolto. La scheda **Registra un dono** della scheda persona (`components/LogGiftDialog.tsx`) fa lo stesso per un singolo dono, cercando prima il lotto la cui `batchDate` corrisponde alla data del dono oppure creandone uno con quel nome (`POST /giving/donationbatches`), ed eliminando la donazione/il nuovo lotto se un passaggio successivo fallisce. Fondi, lotti, campagne e attestati corrispondono ciascuno alle rispettive rotte CRUD `/giving/*`. Il pannello per le donazioni in stile membro (`B1Admin/src/donationComponents/`) riutilizza gli stessi componenti di apphelper di B1App.

La reportistica e i passaggi verso la contabilità sono lavoro lato client o del report runner, non lavoro sul gateway: l'esportazione QuickBooks della pagina del lotto costruisce un CSV di scritture contabili dai `donations` + `fundDonations` del lotto (debito su Undeposited Funds, un credito per ciascun fondo), la vista Lapsed Givers della pagina Riepilogo esegue `Api/reports/lapsedGivers.json` tramite il report runner generico con i nomi delle persone risolti da `ReportOutput`, e i formati delle ricevute per paese (Canada / Australia / Nuova Zelanda) sono impostazioni della chiesa nell'archivio chiave/valore del modulo membership, renderizzati da `GivingStatementDocument` e duplicati nella pagina di stampa di B1App. Le pagine di stampa degli attestati di B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) passano l'impostazione `logoLight` della chiesa (tramite `usePrintLogo` in `B1Admin/src/components/PrintChurchHeader.tsx`) così il logo viene stampato in cima a ogni attestato, e attendono il caricamento dell'immagine prima della stampa automatica.

### Conversione di totali in valute miste

Qualsiasi endpoint che restituisce un singolo totale combinato su donazioni che possono essere in valute miste — i KPI di riepilogo delle donazioni (`GivingKpiCards`), il totale di un lotto di donazioni, il totale di un fondo e i totali dell'anno in corso/del periodo della schermata donazioni di B1App — converte nella valuta predefinita della chiesa lato server, invece di sommare valute diverse. `Api/src/shared/helpers/ExchangeRateHelper.ts` recupera i tassi da `api.frankfurter.dev` indicizzati dalla valuta della chiesa, li memorizza in cache nel processo per 12 ore, ed espone `convertTotals(rows, churchCurrency, rates)`: le righe sono pre-raggruppate per valuta in SQL (poche combinazioni, mai una conversione per dono), ogni gruppo viene convertito e sommato, e il risultato porta un flag `isConverted` che il client usa per mostrare la nota "Convertito ai tassi di cambio correnti". `GET /donations/exchange-rates` espone la tabella dei tassi ai client che ne hanno bisogno (la schermata donazioni di B1App); i tassi stessi non vengono mai accettati da una richiesta, ma solo recuperati lato server, così un client non può influenzare un totale riportato. I singoli record di donazione e i report nella valuta originale/storica non vengono mai convertiti — solo i totali combinati.

L'importazione da Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera i doni effettuati al di fuori di B1: chiama `POST /giving/donate/replay-stripe-events` con `dryRun: true` per un'anteprima, poi con `dryRun: false` per importare. Il server elenca gli eventi Stripe per l'intervallo di date e salta quelli già registrati — confrontati prima per ID provider in `eventLogs`, poi per ID transazione, poi tramite `DonationRepo.findMatchingDonation` (importo + data + persona) così una nuova esecuzione non importa mai due volte. Gli eventi `charge.succeeded` / `payment_intent.succeeded` degli abbonamenti vengono saltati perché `invoice.paid` registra già quei doni; le versioni più recenti dell'API di Stripe eliminano `PaymentIntent.invoice`, quindi il salto si basa anche sulla descrizione "Subscription …".

## Webhook e riconciliazione

I pagamenti regolati e le variazioni di stato degli abbonamenti arrivano a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). L'elaborazione è volutamente idempotente:

1. **Verifica** — `GatewayService.verifyWebhook` delega il controllo della firma al provider; una firma non valida restituisce 401. Gli eventi che non richiedono elaborazione si chiudono subito con 200.
2. **Deduplica l'evento** — `EventLogRepo.loadByProviderId` salta un webhook già registrato in `eventLogs`.
3. **Deduplica la donazione** — prima di creare qualsiasi cosa, `DonationRepo.loadByTransactionId` viene verificato rispetto a ogni ID candidato che il payload potrebbe contenere. Questo assorbe le consegne duplicate, gli eventi ACH a più stadi (in sospeso → regolato) e il caso in cui `/donate/charge` abbia già registrato il dono in modo ottimistico.
4. **Applica** — `classifyWebhookEvent(eventType)` del provider indica cosa significa l'evento (`donation` in sospeso/completata, `cancel-subscription`, oppure `ignore`); i pagamenti completati creano una donazione `complete` (oppure promuovono una donazione `pending` o `failed` esistente), gli eventi in stile ACH si registrano come `pending` fino al regolamento, una fattura di abbonamento non riuscita (`invoice.payment_failed` di Stripe) crea una donazione `failed` con chiave sull'ID della fattura, e gli eventi di annullamento eliminano la riga locale `subscriptions`. Il controller non ispeziona mai i nomi degli eventi specifici di un provider.

### Donazioni ricorrenti fallite e solleciti

Una donazione `failed` è l'unità di lavoro per il recupero. `GET /giving/donations/failed` le elenca con il messaggio di errore del gateway più recente da `eventLogs` e un flag `canRetry` dalle capabilities del gateway; `POST /giving/donate/retry/:donationId` chiama `retryFailedPayment` del provider (Stripe paga la fattura aperta), e il webhook risultante promuove la riga a `complete` tramite il normale percorso di deduplicazione. Le email di sollecito vengono inviate al donatore dal gestore del webhook al giorno 0, poi da `DunningHelper.run` nel timer di mezzanotte (collegato sia in `lambda/timer-handler.ts` sia in `RailwayCron.ts`) a 3 e 7 giorni; ogni invio viene registrato in `eventLogs` come `provider: "dunning"`, `providerId: "<donationId>:<day>"`, così una nuova esecuzione non invia mai due volte la stessa email. Quando Stripe rinuncia e annulla l'abbonamento (`customer.subscription.deleted` con `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` invia al donatore una sola email (`providerId: "<subscriptionId>:canceled"`); gli annullamenti avviati dal donatore o dall'amministratore restano silenziosi. Stripe non aggiunge mai eventi a un endpoint esistente: dopo aver modificato `StripeHelper.webhookEvents`, o salva di nuovo il gateway oppure esegui `tools/manual/stripe-webhook-events.ts` (simulazione per impostazione predefinita, `--apply` per scrivere) in produzione.

I provider con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) hanno i loro addebiti registrati dalla risposta di `/charge` (nessun giro di webhook richiesto per il percorso felice), mentre Stripe si basa su `payment_intent.succeeded` / `invoice.paid` e su `payment_intent.processing` per gli ACH. La gestione delle commissioni (`POST /giving/donate/fee`, il flag `payFees` del gateway e il `calculateFees` di ciascun provider) calcola la maggiorazione "copri le commissioni" lato donatore — B1 non trattiene alcuna quota della piattaforma, quindi non viene mai aggiunta alcuna commissione applicativa.

:::info
I percorsi di addebito e di webhook scrivono le stesse righe `donations` / `fundDonations`. Il `transactionId` è la chiave di join che impedisce che un log di addebito ottimistico e il suo webhook successivo producano due donazioni per un unico dono.
:::

## Pagine correlate

- [Endpoint Giving](../api/endpoints/giving) — superficie REST completa per donazioni, fondi, lotti, gateway, abbonamenti, metodi di pagamento e webhook
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che include il registro dei provider di pagamento e i componenti per le donazioni
- [Struttura del modulo](../api/module-structure) — come è organizzato lato server il modulo GivingApi
