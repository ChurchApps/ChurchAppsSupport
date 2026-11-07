---
title: "Architettura delle donazioni"
description: "Guida per sviluppatori alle offerte ChurchApps: come B1 Admin e B1.church inviano donazioni tramite i gateway Stripe, PayPal, Kingdom Funding o Paystack."
---

# Architettura delle donazioni

<div class="article-intro">

ChurchApps gestisce le donazioni con un modello a binario di gateway: la chiesa mantiene il proprio account Stripe (oppure PayPal, Kingdom Funding o Paystack), e B1 non si frappone mai nel flusso del denaro come processore di pagamenti della piattaforma. I dati della carta vengono tokenizzati nel browser e non raggiungono mai un server ChurchApps. Questa pagina mappa l'intero stack: il registro dei provider lato client in `@churchapps/apphelper`, l'astrazione del gateway di GivingApi, il modello dei dati delle donazioni e il modo in cui i webhook dei gateway riconciliano i dati nel database.

</div>

## Panoramica

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Gateway di pagamento                 │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ inserimento carta │  Stripe Elements · tokenizzatore KF · │
│  │ Registro dei provider │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ di pagamento          │  │◀── token / nonce ─│  (la carta non raggiunge mai un       │
│  │ getPaymentProvider()  │  │                   │  server B1)                           │
│  │ Stripe · PayPal · KF  │  │                   └──────────▲────────────────┬───────────┘
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            addebito/abbonamento              │ evento webhook
┌─────────────────────────────────────────────┐ (chiave segreta)│                │ firmato
│  GivingApi — modulo /giving                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  salva donations + fundDonations — deduplica tramite eventLogs / transactionId
                      ▼
                MySQL (schema giving)
```

Tre principi valgono per l'intero stack:

1. **Il gateway custodisce la carta.** Il widget di inserimento di ogni provider tokenizza nel browser; l'API riceve solo un token, un nonce o un id d'ordine.
2. **Un'unica astrazione, molti provider.** Il browser risolve un `PaymentProvider` da un registro; il server risolve un `IGatewayProvider` da una factory. Entrambi usano lo stesso nome di provider normalizzato memorizzato nel record del gateway.
3. **I webhook sono la fonte di verità per il regolamento.** La risposta dell'addebito viene registrata in modo ottimistico, ma il webhook firmato del gateway è ciò che conferma (o crea) la donazione completata, con protezioni di idempotenza su entrambi i lati.

## Lato client: il registro dei provider di pagamento (`@churchapps/apphelper`)

Il registro si trova in `Packages/apphelper/src/donations/providers/`, con i widget e gli helper di ciascun provider nella propria sottocartella (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- nulla al di fuori di `providers/` si diramma in base al nome del provider. Un `PaymentProvider` (vedi `providers/types.ts`) raccoglie tutto ciò che un'app host richiede per un gateway: un `descriptor` (etichette per l'amministrazione, valute supportate, campi delle commissioni, tariffe predefinite, URL di dashboard/registrazione), un insieme di `capabilities` (carte salvate, ACH, ricorrenti, inserimento di nuova carta in linea, salvataggio implicito alla tokenizzazione), i widget React per l'inserimento dei membri (`MemberWrapper`/`MemberEntry`), la donazione degli ospiti (`GuestForm`), la modifica dei metodi salvati (`MethodEditForm`) e i pagamenti nei moduli (`FormPayment`), più `buildChargeRequest(ctx, token)` -- l'unico punto in cui la forma del payload di addebito varia tra provider. Il `MemberWrapper` di ciascun provider carica il proprio SDK dalla chiave pubblica del record del gateway, così le app host non importano mai un SDK di gateway (B1App e B1Admin non hanno alcuna dipendenza da `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizza quale dei gateway della chiesa debba usare ciascuna superficie.

`providers/registry.ts` contiene i provider integrati. Sono **referenziati per valore**, non registrati tramite un effetto collaterale di un modulo, così lo tree-shaking del bundler non può mai eliminare la registrazione:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funzione | Scopo |
|----------|---------|
| `getPaymentProvider(name)` | Risolve per nome normalizzato; ricade su Stripe così un provider configurato male non fa mai crashare il modulo del donatore |
| `registerPaymentProvider(p)` | Registra a runtime un provider aggiuntivo (per un gateway personalizzato di un'app host) |
| `listPaymentProviders()` | Elenca gli integrati e i personalizzati -- usato per costruire il menu a tendina dei gateway dell'amministrazione |
| `hasPaymentProvider(name)` | Verifica di appartenenza |

**Provider lato client integrati: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin si limitano a *leggere* il registro (`getPaymentProvider`, `listPaymentProviders`); nessuno dei due chiama `registerPaymentProvider` -- la registrazione resta all'interno di apphelper.

Ogni provider tokenizza in modo diverso, ma tutti tengono la carta fuori da B1:

| Provider | Widget di inserimento | Token restituito all'API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` di Stripe `Elements` → `stripe.createPaymentMethod(...)`; il modulo per gli ospiti monta anche un `ExpressCheckoutElement` (Apple Pay / Google Pay, per donazioni una tantum) il cui `onConfirm` risolve nello stesso id `pm_…` | id del metodo di pagamento (`pm_…`); conto bancario tramite `/paymentmethods/ach-setup-intent` -- Financial Connections `us_bank_account` per i gateway in USD, `acss_debit` PAD canadese (modale del mandato ospitato, mandato `default_for` per fatture/abbonamenti, gli addebiti una tantum passano l'id del mandato) per i gateway in CAD |
| Kingdom Funding | Modulo di tokenizzazione ospitato, indicizzato dalla chiave pubblica del gateway | nonce monouso |
| PayPal | PayPal Hosted Fields (carta, ricorrenti) più PayPal Smart Buttons con finanziamento Venmo (una tantum); entrambi condividono un unico caricamento dell'SDK e l'ordine lato server costruito tramite `/donate/client-token` + `/donate/create-order` | id dell'ordine catturato |
| Paystack | Popup inline di Paystack (`js.paystack.co/v2/inline.js`) -- il popup stesso riscuote il pagamento (carta, denaro mobile, bonifico, USSD) | riferimento della transazione pagata; i metodi salvati sono codici di autorizzazione Paystack `AUTH_…` |

Il `finalizeResult` di Stripe esegue il 3-D Secure / SCA nel browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) prima che la donazione sia considerata completa; il modulo condiviso chiama semplicemente `provider.finalizeResult(result)` senza sapere cosa faccia.

## Lato server: l'astrazione del gateway (GivingApi)

Il modulo `/giving` (`Api/src/modules/giving`) espone la superficie REST; l'infrastruttura del gateway si trova in `Api/src/shared/helpers`. `DonateController` non parla mai direttamente con un SDK di gateway -- passa per `GatewayService`, che risolve il corretto `IGatewayProvider` da `GatewayFactory` e gli consegna un `GatewayConfig` decifrato.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decifra privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) è il contratto che ogni gateway implementa -- ciclo di vita del webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), commissioni (`calculateFees`), gestione dei metodi salvati (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) ed extra facoltativi (clienti, ordini, SetupIntent, replay degli eventi, `retryFailedPayment` per una fattura di abbonamento fallita, `registerPaymentMethodDomain` per la verifica del dominio di Apple Pay). Un provider che omette un hook facoltativo viene segnalato come non supportato per quell'azione, e l'interfaccia nasconde il controllo. Ogni classe di provider dichiara la propria matrice `capabilities` (valute supportate, ACH, rimborsi, requisiti degli abbonamenti, limiti di transazione) -- `GatewayService.getProviderCapabilities(provider)` si limita a leggerla -- e flag come `logsDonationsImmediately` guidano il comportamento dei controller senza condizioni sul nome del provider nei controller.

**Provider lato server registrati in `GatewayFactory`:**

| Provider | Disponibilità |
|----------|-------------|
| Stripe | Sempre attivo |
| PayPal | Sempre attivo |
| Kingdom Funding | Sempre attivo |
| Paystack | Sempre attivo (commercianti in Nigeria, Ghana, Sudafrica, Kenya, Costa d'Avorio; valute NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Attivabile tramite la variabile d'ambiente `ENABLE_SQUARE` |
| ePayMints | Attivabile tramite la variabile d'ambiente `ENABLE_EPAYMINTS` |

Paystack si differenzia dagli altri perché il denaro si muove prima che GivingApi entri in gioco: il popup addebita il donatore, `processCharge` è un `GET /transaction/verify/:reference` il cui importo pagato e la cui valuta devono corrispondere alla donazione registrata (un riferimento già presente non viene mai registrato due volte), e la prima donazione di una pianificazione ricorrente viene registrata da `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` con `start_date` a un intervallo di distanza). I webhook sono firmati con la chiave segreta stessa (`x-paystack-signature`, HMAC-SHA512 sul corpo grezzo) e Paystack non offre alcuna API di gestione dei webhook, quindi la schermata di amministrazione mostra l'URL che la chiesa deve incollare nella propria dashboard. Gli eventi `charge.success` dei rinnovi non contengono ripartizione tra fondi; il provider la recupera dalle righe locali `subscriptions`/`subscriptionFunds` del donatore. Solo le autorizzazioni di carta sono `reusable` -- le donazioni con denaro mobile sono solo una tantum, quindi `createSubscription` le rifiuta. I dati demo inseriscono una seconda chiesa (Accra Community Church, `CHU00000002`) su un gateway Paystack in modalità test in GHS, così la suite Playwright di Paystack viene eseguita accanto a quella di Stripe di Grace.

I provider personalizzati possono essere registrati a runtime quando è impostata `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` è la classe base per questi. I nomi dei provider sono confrontati senza distinzione tra maiuscole e minuscole.

### Configurazione del gateway e segreti

Un amministratore salva le credenziali del gateway tramite `POST /giving/gateways` (`GatewayController`). Al salvataggio il controller cifra le chiavi privata e del webhook con `EncryptionHelper` prima di memorizzarle, poi -- su qualsiasi host diverso da localhost -- elimina il webhook esistente della chiesa e ne configura uno nuovo che punta a `/giving/donate/webhook/{provider}?churchId=…`. Una chiesa mantiene una riga per provider: salvare un gateway sostituisce solo la riga esistente per lo stesso provider. Le letture pubbliche (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) restituiscono solo le chiavi pubbliche.

## Modello dei dati

Lo schema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelli in `models/`) è uno schema MySQL acceduto tramite Kysely:

| Tabella | Ruolo |
|-------|------|
| `gateways` | Configurazione del provider per chiesa: `provider`, `publicKey`, `privateKey`/`webhookKey` cifrate, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinazioni delle donazioni (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Raggruppamento per inserimento/reportistica (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Una singola offerta: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; ricevute, totali, dashboard e report delle donazioni contano solo `complete` o null), `transactionId` |
| `fundDonations` | Ripartizione di una donazione su uno o più fondi (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Donazione ricorrente; `id` è l'id dell'abbonamento del gateway, collegato a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Ripartizione per fondo di una donazione ricorrente |
| `customers` | Collega un `personId` al proprio id cliente del gateway, per `provider` |
| `gatewayPaymentMethods` | Carte/conti salvati: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Registro di audit degli eventi/webhook e chiave di deduplicazione (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagne di impegni legate a un fondo, e l'importo promesso da ciascuna persona |

Una donazione viene ripartita tra i fondi tramite `fundDonations` -- la donazione porta il totale, ciascun `fundDonation` porta una quota. `donations.currency` e `gateways.currency` portano la valuta ISO; ogni provider dichiara i propri `supportedCurrencies`, e gli importi vengono formattati con `CurrencyHelper.formatCurrencyWithLocale`.

## Flussi end-to-end

### Donazioni dei membri, una tantum e ricorrenti (B1App)

La schermata di donazione per utenti autenticati (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compone tre componenti di apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. B1App gestisce il caricamento dei dati circostanti -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- e passa l'elenco dei gateway; il provider risolto carica il proprio SDK dalla chiave pubblica del gateway. L'addebito vero e proprio avviene dentro apphelper: il provider risolto tokenizza il metodo (nuovo o salvato), poi invia a `/giving/donate/charge` per un'offerta una tantum oppure a `/giving/donate/subscribe` per una ricorrente. Entrambi gli endpoint attribuiscono un donatore connesso al proprio `personId` (solo chi ha `donations.edit` può attribuire a un'altra persona) e rifiutano le ripartizioni tra fondi la cui somma supera l'importo addebitato. Le donazioni ricorrenti creano una riga `subscriptions` più `subscriptionFunds` e affidano la pianificazione al gateway (Stripe Subscriptions, PayPal Billing Plans o una pianificazione ricorrente KF).

### Donazioni di ospiti / anonime

La pagina pubblica delle donazioni (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e il pannello "dona ora" mostrano `NonAuthDonationWrapper` da `@churchapps/apphelper/website`, che inietta reCAPTCHA e il contesto Elements del gateway attorno al `GuestForm` del provider. Gli ospiti non ottengono accesso, metodi salvati né cronologia. Il flusso recupera `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (solo chiavi pubbliche), verifica il visitatore con `POST /giving/donate/captcha-verify`, tokenizza nel browser e invia a `/giving/donate/charge` (oppure `/subscribe`). La chiamata di verifica restituisce un `captchaPass` firmato con HMAC valido 10 minuti (`Api/src/modules/giving/helpers/CaptchaPass.ts`) che il modulo invia con ogni chiamata monetaria dell'ospite; con `CAPTCHA_ENFORCE=true` l'Api rifiuta le chiamate ospite a `create-order`, `charge`, `subscribe`, `addcard` e `ach-setup-intent-anon` senza un pass valido per quella chiesa. Le registrazioni a eventi a pagamento degli ospiti (`POST /content/registrations/register`) controllano lo stesso pass poco prima dell'addebito; vedi [Registrazioni agli eventi](./registrations.md#payment-flow). L'ACH per gli ospiti usa l'endpoint anonimo `POST /giving/paymentmethods/ach-setup-intent-anon`, che consente solo la verifica istantanea (Financial Connections): una verifica tramite microdepositi termina giorni dopo, quando la pagina dell'ospite non c'è più, quindi non potrebbe mai completare la donazione. Il modulo rifiuta di addebitare un SetupIntent non verificato e indirizza il donatore verso la carta o la configurazione bancaria con accesso.

Tre opzioni del modulo ospiti usano la stessa chiamata di addebito. `?fundId=` e `?amount=` nell'URL della donazione preselezionano la ripartizione tra fondi (letti dal modulo ospiti di ciascun provider al montaggio e instradati attraverso il normale gestore di cambio fondo, così i totali e le commissioni si aggiornano). `anonymous: true` fa sì che `DonateController.charge` scarti qualsiasi persona inviata dal client e registri la donazione con `personId = null`; il modulo ospiti salta `/people/loadOrCreate` e il passaggio di cliente/vault, e i tre provider a registrazione immediata smettono di risolvere una persona dal cliente del gateway. Apple Pay richiede che il dominio della pagina sia registrato in Stripe, quindi un modulo ospiti Stripe invia una volta per sessione all'endpoint pubblico e limitato per frequenza `POST /giving/donate/register-domain`, che accetta solo un dominio appartenente alla chiesa (`<subDomain>.b1.church`, una riga nella tabella dei domini del modulo content, oppure un host locale) prima di chiamare l'API dei domini dei metodi di pagamento di Stripe.

### Inserimento amministrativo e importazione Stripe (B1Admin)

La sezione donazioni di B1Admin (`B1Admin/src/donations/`) è dove lavorano i team finanziari. L'inserimento in lotto (`components/BulkDonationEntry.tsx`) registra offerte in contanti, assegni o in natura inviando `/giving/donations` poi `/giving/funddonations` -- senza coinvolgere alcun gateway. La finestra **Registra un'offerta** della scheda persona (`components/LogGiftDialog.tsx`) fa lo stesso per una singola offerta, prima cercando il lotto la cui `batchDate` coincide con la data dell'offerta oppure creandone uno con quel nome (`POST /giving/donationbatches`), ed eliminando di nuovo la donazione/il nuovo lotto se un passaggio successivo fallisce. Fondi, lotti, campagne e ricevute corrispondono ciascuno alle rotte CRUD `/giving/*`; le pagine delle ricevute (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) richiedono un anno solare con `GET /donations?startDate=&endDate=` e `GET /fundDonations?startDate=&endDate=` anziché l'intera storia della chiesa, che potrebbe superare il limite di dimensione della risposta di Lambda. Il pannello di donazione in stile membro (`B1Admin/src/donationComponents/`) riutilizza gli stessi componenti di apphelper di B1App.

Le attività di rendicontazione e contabilità sono lavoro lato client o del runner dei report, non del gateway: l'esportazione per QuickBooks della pagina dei lotti costruisce un CSV di voce contabile dai `donations` + `fundDonations` del lotto (addebito su Fondi non depositati, un accredito per fondo); la vista Donatori interrotti della pagina di riepilogo esegue `Api/reports/lapsedGivers.json` tramite il runner generico dei report con i nomi delle persone risolti da `ReportOutput`; i formati di ricevuta per paese (Canada / Australia / Nuova Zelanda) sono impostazioni della chiesa nello store chiave/valore del modulo membership, resi da `GivingStatementDocument` e duplicati nella pagina di stampa di B1App. Le pagine di stampa delle ricevute di B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) passano l'impostazione `logoLight` della chiesa (tramite `usePrintLogo` in `B1Admin/src/components/PrintChurchHeader.tsx`) così il logo viene stampato in cima a ogni ricevuta, e attendono il caricamento dell'immagine prima della stampa automatica.

### Stato del lotto e permesso Inserisci donazioni

I lotti possono essere chiusi così un deposito contato resta com'era. `POST /giving/donationbatches/:id/close` e `/:id/reopen` (solo Donations.Edit) sono gli unici scrittori di `status`, `closedDate` e `closedBy` (`DonationBatchRepo.setStatus`); un normale salvataggio del lotto non li tocca mai, quindi inviare un lotto non può riaprirlo. L'accesso in scrittura è centralizzato in `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit può modificare qualsiasi cosa, mentre il permesso più ristretto Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Inserisci donazioni" nell'editor dei ruoli) può creare lotti e salvare o eliminare donazioni e ripartizioni tra fondi solo quando sia il lotto attuale della donazione sia il lotto di destinazione sono aperti, e mai per un'offerta da gateway (una con `transactionId`). Una scrittura bloccata restituisce `403 { error: "This batch is closed." }`. La lettura dei lotti accetta Donations.ViewSummary oppure Donations.Enter, così un contatore può scegliere il lotto in cui sta inserendo. Lato client, `B1Admin/src/donations/batchAccess.ts` riflette queste regole (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), e `Header` / `SecondaryMenuHelper` mostrano **Donazioni > Lotti** a chiunque possa vedere i lotti anche senza View Summary.

### Conversione di totali in valute miste

Ogni endpoint che restituisce un unico totale combinato su offerte potenzialmente in valute miste -- i KPI di riepilogo delle donazioni (`GivingKpiCards`), il totale di un lotto, il totale di un fondo e i totali annuali/di periodo della schermata donazioni di B1App -- converte nella valuta predefinita della chiesa lato server anziché sommare valute diverse. `Api/src/shared/helpers/ExchangeRateHelper.ts` recupera i tassi da `api.frankfurter.dev` in base alla valuta della chiesa, li memorizza nella cache del processo per 12 ore ed espone `convertTotals(rows, churchCurrency, rates)`: le righe sono pre-raggruppate per valuta in SQL (poche combinazioni, mai una conversione per ogni offerta), ogni gruppo viene convertito e sommato, e il risultato porta un flag `isConverted` che il client usa per mostrare una nota "Convertito ai tassi di cambio attuali". `GET /donations/exchange-rates` espone la tabella dei tassi ai client che ne hanno bisogno (la schermata donazioni di B1App); i tassi non vengono mai accettati da una richiesta, ma solo recuperati lato server, quindi un client non può influenzare un totale riportato. I singoli record di donazione e i report nella valuta originale/storica non vengono mai convertiti -- solo i totali combinati.

L'importazione Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera le offerte fatte al di fuori di B1: chiama `POST /giving/donate/replay-stripe-events` con `dryRun: true` per un'anteprima, poi con `dryRun: false` per importare. Il server elenca gli eventi Stripe per l'intervallo di date e salta quelli già registrati -- confrontati prima per id provider in `eventLogs`, poi per id transazione, poi con `DonationRepo.findMatchingDonation` (importo + data + persona) così una nuova esecuzione non importa mai due volte. Gli eventi `charge.succeeded` / `payment_intent.succeeded` di abbonamenti vengono saltati perché `invoice.paid` registra già quelle offerte; le versioni più recenti dell'API di Stripe rimuovono `PaymentIntent.invoice`, quindi il salto si basa anche sulla descrizione "Subscription …".

## Webhook e riconciliazione

I pagamenti regolati e le variazioni di stato degli abbonamenti arrivano su `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). L'elaborazione è volutamente idempotente:

1. **Verifica** — `GatewayService.verifyWebhook` delega il controllo della firma al provider; una firma non valida restituisce 401. Gli eventi che non richiedono elaborazione terminano subito con 200.
2. **Deduplica dell'evento** — `EventLogRepo.loadByProviderId` salta un webhook già registrato in `eventLogs`.
3. **Deduplica della donazione** — prima di creare qualsiasi cosa, `DonationRepo.loadByTransactionId` viene controllato su ogni possibile id candidato che il payload potrebbe contenere. Questo assorbe le consegne duplicate, gli eventi ACH a più stadi (in attesa → regolato) e il caso in cui `/donate/charge` abbia già registrato l'offerta in modo ottimistico.
4. **Applicazione** — `classifyWebhookEvent(eventType)` del provider stabilisce cosa significa l'evento (`donation` in attesa/completata, `cancel-subscription`, oppure `ignore`); i pagamenti completati creano una donazione `complete` (oppure promuovono una `pending` o `failed` esistente), gli eventi in stile ACH finiscono come `pending` fino al regolamento, una fattura di abbonamento fallita (evento Stripe `invoice.payment_failed`) crea una donazione `failed` con chiave l'id della fattura, e gli eventi di annullamento eliminano la riga locale `subscriptions`. Il controller non ispeziona mai i nomi degli eventi specifici di un provider.

### Donazioni ricorrenti fallite e solleciti

Una donazione `failed` è l'unità di lavoro per il recupero. `GET /giving/donations/failed` le elenca con il messaggio di errore più recente del gateway da `eventLogs` e un flag `canRetry` dalle capacità del gateway; `POST /giving/donate/retry/:donationId` chiama il `retryFailedPayment` del provider (Stripe salda la fattura aperta), e il webhook risultante promuove la riga a `complete` attraverso il normale percorso di deduplica. Le email di sollecito vanno al donatore dal gestore del webhook il giorno 0, poi da `DunningHelper.run` nel timer di mezzanotte (collegato sia in `lambda/timer-handler.ts` sia in `RailwayCron.ts`) a 3 e 7 giorni; ogni invio viene registrato in `eventLogs` come `provider: "dunning"`, `providerId: "<donationId>:<day>"`, così una nuova esecuzione non invia mai due volte la stessa email. Quando Stripe rinuncia e annulla l'abbonamento (`customer.subscription.deleted` con `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` invia al donatore una sola email (`providerId: "<subscriptionId>:canceled"`); le disdette avviate dal donatore o dall'amministratore restano silenziose. Stripe non aggiunge mai eventi a un endpoint esistente: dopo aver modificato `StripeHelper.webhookEvents`, è necessario salvare di nuovo il gateway oppure eseguire `tools/manual/stripe-webhook-events.ts` (simulazione per impostazione predefinita, `--apply` per scrivere) in produzione.

I provider con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) hanno gli addebiti registrati dalla risposta di `/charge` (non serve un giro di webhook nel percorso felice), mentre Stripe si basa su `payment_intent.succeeded` / `invoice.paid` e su `payment_intent.processing` per l'ACH. La gestione delle commissioni (`POST /giving/donate/fee`, il flag del gateway `payFees` e il `calculateFees` di ciascun provider) calcola il ricarico "copri le commissioni" dal lato del donatore -- B1 non prende alcuna quota della piattaforma, quindi non viene mai aggiunta alcuna commissione applicativa.

:::info
I percorsi di addebito e di webhook scrivono le stesse righe `donations` / `fundDonations`. Il `transactionId` è la chiave di unione che evita che un log di addebito ottimistico e il suo webhook successivo producano due donazioni per la stessa offerta.
:::

## Pagine correlate

- [Endpoint Donazioni](../api/endpoints/giving.md) — superficie REST completa per donazioni, fondi, lotti, gateway, abbonamenti, metodi di pagamento e webhook
- [AppHelper](../shared-libraries/app-helper.md) — il pacchetto npm che include il registro dei provider di pagamento e i componenti delle donazioni
- [Struttura del modulo](../api/module-structure.md) — come è organizzato lato server il modulo GivingApi
