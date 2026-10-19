---
title: "Architettura delle Donazioni"
---

# Architettura delle Donazioni

<div class="article-intro">

ChurchApps gestisce le donazioni con un modello a gateway di pagamento: la chiesa mantiene il proprio account Stripe (o PayPal, Kingdom Funding o Paystack), e B1 non si inserisce mai nel flusso del denaro come processore di pagamento della piattaforma. I dati della carta vengono tokenizzati nel browser e non raggiungono mai un server di ChurchApps. Questa pagina descrive l'intero stack: il registro dei provider di pagamento lato client in `@churchapps/apphelper`, l'astrazione del gateway GivingApi, il modello dei dati delle donazioni e il modo in cui i webhook del gateway riconciliano i dati nel database.

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

Tre principi valgono per l'intero stack:

1. **Il gateway gestisce la carta.** Il widget di inserimento di ogni provider tokenizza nel browser; l'API riceve solo un token, un nonce o un ID ordine.
2. **Un'unica astrazione, molti provider.** Il browser risolve un `PaymentProvider` dal registro; il server risolve un `IGatewayProvider` dalla factory. Entrambi usano lo stesso nome normalizzato del provider memorizzato nel record del gateway.
3. **I webhook sono la fonte di verità per il regolamento.** La risposta a un addebito viene registrata in via ottimistica, ma è il webhook firmato del gateway a confermare (o creare) la donazione completata, con protezioni di idempotenza su entrambi i lati.

## Lato client: il registro dei provider di pagamento (`@churchapps/apphelper`)

Il registro si trova in `Packages/apphelper/src/donations/providers/`, con i widget e gli helper di ciascun provider nella propria sottocartella (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nulla al di fuori di `providers/` esegue una diramazione in base al nome del provider. Un `PaymentProvider` (vedi `providers/types.ts`) raccoglie tutto ciò che un'app host necessita per un gateway: un `descriptor` (etichette per l'amministratore, valute supportate, campi delle commissioni, tariffe predefinite, URL di dashboard/registrazione), un insieme di `capabilities` (carte salvate, ACH, ricorrenze, inserimento di una nuova carta in linea, salvataggio implicito durante la tokenizzazione), i widget React per l'inserimento da parte dei membri (`MemberWrapper`/`MemberEntry`), la donazione da ospite (`GuestForm`), la modifica dei metodi salvati (`MethodEditForm`) e i pagamenti tramite modulo (`FormPayment`), oltre a `buildChargeRequest(ctx, token)` — l'unico punto in cui la struttura del payload di addebito differisce per provider. Il `MemberWrapper` di ogni provider carica il proprio SDK dalla chiave pubblica presente nel record del gateway, quindi le app host non importano mai un SDK di gateway (B1App e B1Admin non hanno alcuna dipendenza da `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizza la scelta, tra i gateway di una chiesa, di quello da usare in una determinata schermata.

`providers/registry.ts` contiene i provider integrati. Vengono **referenziati per valore**, non registrati tramite un effetto collaterale di un modulo, così il tree-shaking del bundler non può mai eliminare la registrazione:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funzione | Scopo |
|----------|---------|
| `getPaymentProvider(name)` | Risolve tramite il nome normalizzato; ripiega su Stripe in modo che un provider configurato male non blocchi mai il modulo del donatore |
| `registerPaymentProvider(p)` | Registra un provider aggiuntivo a runtime (per un gateway personalizzato di un'app host) |
| `listPaymentProviders()` | Elenca i provider integrati e quelli personalizzati — usato per costruire il menu a tendina dei gateway nell'amministrazione |
| `hasPaymentProvider(name)` | Verifica di appartenenza |

**Provider client integrati: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin si limitano a *leggere* il registro (`getPaymentProvider`, `listPaymentProviders`); nessuno dei due chiama `registerPaymentProvider` — la registrazione resta all'interno di apphelper.

Ogni provider tokenizza in modo diverso, ma tutti tengono la carta lontana da B1:

| Provider | Widget di inserimento | Token restituito all'API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` di Stripe `Elements` → `stripe.createPaymentMethod(...)`; il modulo per ospiti monta anche un `ExpressCheckoutElement` (Apple Pay / Google Pay, per donazioni una tantum) il cui `onConfirm` risolve nello stesso ID `pm_…` | ID del metodo di pagamento (`pm_…`); conto bancario tramite `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` per gateway in USD, PAD canadese `acss_debit` (modale di mandato ospitata, mandato `default_for` fatture/abbonamenti, gli addebiti una tantum passano l'ID del mandato) per gateway in CAD |
| Kingdom Funding | Modulo di tokenizzazione ospitato, associato alla chiave pubblica del gateway | nonce monouso |
| PayPal | PayPal Hosted Fields (carta, ricorrenti) più PayPal Smart Buttons con finanziamento Venmo (una tantum); entrambi condividono un unico caricamento dell'SDK e l'ordine lato server creato tramite `/donate/client-token` + `/donate/create-order` | ID dell'ordine approvato |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`) — il popup stesso effettua il pagamento (carta, denaro mobile, bonifico bancario, USSD) | riferimento della transazione pagata; i metodi salvati sono codici di autorizzazione Paystack `AUTH_…` |

Il `finalizeResult` di Stripe esegue la 3-D Secure / SCA nel browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) prima che la donazione sia considerata completata; il modulo condiviso richiama semplicemente `provider.finalizeResult(result)` senza sapere cosa faccia.

## Lato server: l'astrazione del gateway (GivingApi)

Il modulo `/giving` (`Api/src/modules/giving`) espone la superficie REST; l'infrastruttura dei gateway si trova in `Api/src/shared/helpers`. `DonateController` non comunica mai direttamente con un SDK di gateway — passa da `GatewayService`, che risolve il `IGatewayProvider` corretto da `GatewayFactory` e gli consegna una `GatewayConfig` decifrata.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) è il contratto che ogni gateway implementa — ciclo di vita dei webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamenti (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), commissioni (`calculateFees`), gestione dei metodi salvati (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) e funzioni aggiuntive facoltative (clienti, ordini, SetupIntent, replay degli eventi, `retryFailedPayment` per una fattura di abbonamento non riuscita, `registerPaymentMethodDomain` per la verifica del dominio di Apple Pay). Un provider che non implementa un hook facoltativo viene segnalato come non supportato per quell'azione e l'interfaccia nasconde il relativo controllo. Ogni classe di provider dichiara la propria matrice `capabilities` (valute supportate, ACH, rimborsi, requisiti degli abbonamenti, limiti delle transazioni) — `GatewayService.getProviderCapabilities(provider)` si limita a leggerla — e i flag come `logsDonationsImmediately` guidano il comportamento dei controller senza alcuna condizione sul nome del provider nei controller.

**Provider server registrati in `GatewayFactory`:**

| Provider | Disponibilità |
|----------|-------------|
| Stripe | Sempre attivo |
| PayPal | Sempre attivo |
| Kingdom Funding | Sempre attivo |
| Paystack | Sempre attivo (commercianti in Nigeria, Ghana, Sudafrica, Kenya, Costa d'Avorio; valute NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Attivabile tramite la variabile d'ambiente `ENABLE_SQUARE` |
| ePayMints | Attivabile tramite la variabile d'ambiente `ENABLE_EPAYMINTS` |

Paystack si differenzia dagli altri perché il denaro si muove prima che GivingApi sia coinvolto: il popup addebita il donatore, `processCharge` è un `GET /transaction/verify/:reference` il cui importo e la cui valuta pagati devono corrispondere alla donazione che viene registrata (un riferimento già presente non viene mai registrato due volte), e la prima donazione di una pianificazione ricorrente viene registrata da `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` con `start_date` a un intervallo di distanza). I webhook sono firmati con la chiave segreta stessa (`x-paystack-signature`, HMAC-SHA512 sul corpo grezzo) e Paystack non dispone di alcuna API di gestione dei webhook, quindi la schermata di amministrazione mostra l'URL che la chiesa deve incollare nella propria dashboard. Gli eventi `charge.success` di rinnovo non contengono la suddivisione per fondo; il provider la recupera dalle righe locali `subscriptions`/`subscriptionFunds` del donatore. Solo le autorizzazioni di carta sono `reusable` — le donazioni tramite denaro mobile sono solo una tantum, quindi `createSubscription` le rifiuta. I dati demo inseriscono una seconda chiesa (Accra Community Church, `CHU00000002`) su un gateway GHS in modalità test di Paystack, così la suite Playwright di Paystack viene eseguita accanto a quella di Stripe di Grace.

I provider personalizzati possono essere registrati a runtime quando è impostata `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` è la classe base per questi. I nomi dei provider vengono confrontati senza distinguere maiuscole e minuscole.

### Configurazione e segreti del gateway

Un amministratore salva le credenziali del gateway tramite `POST /giving/gateways` (`GatewayController`). Al salvataggio il controller cifra le chiavi privata e del webhook con `EncryptionHelper` prima di persisterle, poi — su qualsiasi host diverso da localhost — elimina il webhook esistente della chiesa e ne predispone uno nuovo che punta a `/giving/donate/webhook/{provider}?churchId=…`. Una chiesa mantiene una riga per provider: salvare un gateway sostituisce solo la riga esistente per quello stesso provider. Le letture pubbliche (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) restituiscono solo le chiavi pubbliche.

## Modello dei dati

Lo schema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelli in `models/`) è uno schema MySQL acceduto tramite Kysely:

| Tabella | Ruolo |
|-------|------|
| `gateways` | Configurazione del provider per chiesa: `provider`, `publicKey`, `privateKey`/`webhookKey` cifrati, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinazioni delle donazioni (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Raggruppamento per inserimento/reportistica (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Una singola offerta: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; estratti conto, totali, dashboard e report delle donazioni contano solo `complete` o null), `transactionId` |
| `fundDonations` | Ripartizione di una donazione su uno o più fondi (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Donazione ricorrente; `id` è l'ID dell'abbonamento del gateway, collegato a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Ripartizione per fondo di una donazione ricorrente |
| `customers` | Collega un `personId` all'ID cliente del gateway, per `provider` |
| `gatewayPaymentMethods` | Carte/conti bancari salvati: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Registro di audit degli eventi/webhook e chiave di deduplicazione (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagne di impegni collegate a un fondo, e l'importo promesso da ciascuna persona |

Una donazione viene ripartita tra i fondi tramite `fundDonations` — la donazione riporta il totale, ogni `fundDonation` riporta una quota. `donations.currency` e `gateways.currency` riportano la valuta ISO; ogni provider pubblicizza i propri `supportedCurrencies`, e gli importi vengono formattati con `CurrencyHelper.formatCurrencyWithLocale`.

## Flussi end-to-end

### Donazione singola e ricorrente del membro (B1App)

La schermata di donazione per utenti autenticati (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) combina tre componenti di apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. B1App gestisce il caricamento dei dati circostanti — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — e passa l'elenco dei gateway; il provider risolto carica il proprio SDK dalla chiave pubblica del gateway. L'addebito vero e proprio avviene all'interno di apphelper: il provider risolto tokenizza il metodo (nuovo o salvato), poi invia a `/giving/donate/charge` per una donazione singola o a `/giving/donate/subscribe` per una ricorrente. Entrambi gli endpoint attribuiscono un donatore autenticato al proprio `personId` (solo chi possiede `donations.edit` può attribuire a un'altra persona) e rifiutano le ripartizioni per fondo la cui somma supera l'importo addebitato. Le donazioni ricorrenti creano una riga `subscriptions` più `subscriptionFunds` e consegnano la pianificazione al gateway (Stripe Subscriptions, PayPal Billing Plans o una pianificazione ricorrente KF).

### Donazioni di ospiti / anonime

La pagina pubblica di donazione (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e il pannello "dona ora" visualizzano `NonAuthDonationWrapper` da `@churchapps/apphelper/website`, che inserisce reCAPTCHA e il contesto Elements del gateway attorno al `GuestForm` del provider. Gli ospiti non hanno accesso, nessun metodo salvato e nessuna cronologia. Il flusso recupera `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (solo chiavi pubbliche), verifica il visitatore con `POST /giving/donate/captcha-verify`, tokenizza nel browser e invia a `/giving/donate/charge` (o `/subscribe`). Il metodo ACH per gli ospiti usa l'endpoint anonimo `POST /giving/paymentmethods/ach-setup-intent-anon`, che consente solo la verifica immediata (Financial Connections): una verifica tramite microdepositi si completa giorni dopo, quando la pagina per ospiti non è più aperta, quindi non potrebbe mai completare la donazione. Il modulo rifiuta di addebitare un SetupIntent non verificato e indirizza il donatore verso la carta o una configurazione bancaria da utente autenticato.

Tre opzioni del modulo per ospiti passano attraverso la stessa chiamata di addebito. `?fundId=` e `?amount=` nell'URL della donazione preselezionano la ripartizione per fondo (letti dal `GuestForm` di ogni provider al montaggio, instradati attraverso il normale gestore di cambio fondo in modo che totali e commissioni si aggiornino). `anonymous: true` fa sì che `DonateController.charge` scarti qualsiasi persona inviata dal client e registri la donazione con `personId = null`; il modulo per ospiti salta `/people/loadOrCreate` e il passaggio di cliente/vault, e i tre provider a registrazione immediata smettono di risolvere una persona dal cliente del gateway. Apple Pay richiede che il dominio della pagina sia registrato presso Stripe, quindi un modulo per ospiti Stripe invia una volta per sessione a `POST /giving/donate/register-domain`, pubblico e con limite di frequenza, che accetta solo un dominio appartenente alla chiesa (`<subDomain>.b1.church`, una riga nella tabella dei domini del modulo content, o un host locale) prima di chiamare l'API dei domini per metodi di pagamento di Stripe.

### Registrazione amministrativa e importazione da Stripe (B1Admin)

La sezione donazioni di B1Admin (`B1Admin/src/donations/`) è dove lavorano i team amministrativi. L'inserimento in batch (`components/BulkDonationEntry.tsx`) registra donazioni in contanti/assegno/in natura inviando `/giving/donations` poi `/giving/funddonations` — senza coinvolgere alcun gateway. La scheda **Registra un'offerta** del record della persona (`components/LogGiftDialog.tsx`) fa lo stesso per una singola donazione, cercando prima il batch la cui `batchDate` corrisponde alla data della donazione oppure creandone uno con quella data (`POST /giving/donationbatches`), ed eliminando di nuovo la donazione/il nuovo batch se un passaggio successivo fallisce. Fondi, batch, campagne ed estratti conto corrispondono ciascuno alle rotte CRUD `/giving/*`; le pagine degli estratti conto (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) richiedono un anno solare con `GET /donations?startDate=&endDate=` e `GET /fundDonations?startDate=&endDate=` anziché l'intera cronologia della chiesa, che potrebbe superare il limite di dimensione della risposta di Lambda. Il pannello di donazione in stile membro (`B1Admin/src/donationComponents/`) riutilizza gli stessi componenti apphelper di B1App.

Le operazioni di reportistica e contabilità sono lato client o lavoro del runner dei report, non lavoro del gateway: l'esportazione QuickBooks della pagina del batch crea un CSV di registrazione contabile dai `donations` + `fundDonations` del batch (addebito su Undeposited Funds, un accredito per ogni fondo), la pagina di riepilogo con la vista Donatori inattivi esegue `Api/reports/lapsedGivers.json` tramite il runner generico dei report con i nomi delle persone risolti da `ReportOutput`, e i formati delle ricevute per paese (Canada / Australia / Nuova Zelanda) sono impostazioni della chiesa nell'archivio chiave/valore del modulo membership, visualizzati da `GivingStatementDocument` e duplicati nella pagina di stampa di B1App. Le pagine di stampa degli estratti conto di B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) passano l'impostazione `logoLight` della chiesa (tramite `usePrintLogo` in `B1Admin/src/components/PrintChurchHeader.tsx`) così il logo viene stampato in cima a ogni estratto, e attendono il caricamento dell'immagine prima della stampa automatica.

### Stato dei batch e permesso Inserisci donazioni

I batch possono essere chiusi affinché un deposito contato resti invariato. `POST /giving/donationbatches/:id/close` e `/:id/reopen` (solo Donations.Edit) sono gli unici scrittori di `status`, `closedDate` e `closedBy` (`DonationBatchRepo.setStatus`); un normale salvataggio del batch non li tocca mai, quindi registrare un batch non può riaprirlo. L'accesso in scrittura è centralizzato in `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit può modificare qualsiasi cosa, mentre il permesso più limitato Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Enter Donations" nell'editor dei ruoli) può creare batch e salvare o eliminare donazioni e ripartizioni per fondo solo quando sia il batch attuale della donazione sia il batch di destinazione sono aperti, e mai per un'offerta da gateway (una con `transactionId`). Una scrittura bloccata restituisce `403 { error: "This batch is closed." }`. La lettura dei batch accetta Donations.ViewSummary o Donations.Enter, così un addetto al conteggio può selezionare il batch in cui sta inserendo. Lato client, `B1Admin/src/donations/batchAccess.ts` replica queste regole (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), e `Header` / `SecondaryMenuHelper` mostrano **Donazioni > Batch** a chiunque possa vedere i batch, anche senza View Summary.

### Conversione di totali in valute miste

Qualsiasi endpoint che restituisce un unico totale combinato su donazioni potenzialmente in valute miste — i KPI di riepilogo delle donazioni (`GivingKpiCards`), il totale di un batch di donazioni, il totale di un fondo e i totali anno-in-corso/periodo della schermata donazioni di B1App — converte nella valuta predefinita della chiesa lato server, invece di sommare valute diverse. `Api/src/shared/helpers/ExchangeRateHelper.ts` recupera i tassi da `api.frankfurter.dev` usando la valuta della chiesa come chiave, li memorizza nella cache in-process per 12 ore ed espone `convertTotals(rows, churchCurrency, rates)`: le righe sono già raggruppate per valuta in SQL (poche decine di gruppi, mai una conversione per ogni donazione), ogni gruppo viene convertito e sommato, e il risultato porta un flag `isConverted` che il client usa per mostrare la nota "Convertito ai tassi di cambio correnti". `GET /donations/exchange-rates` espone la tabella dei tassi ai client che ne hanno bisogno (la schermata donazioni di B1App); i tassi stessi non vengono mai accettati da una richiesta, ma sempre recuperati lato server, così un client non può influenzare un totale riportato. I singoli record delle donazioni e i report storici/nella valuta originale non vengono mai convertiti — solo i totali combinati.

L'importazione da Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera le offerte effettuate al di fuori di B1: chiama `POST /giving/donate/replay-stripe-events` con `dryRun: true` per un'anteprima, poi con `dryRun: false` per importare. Il server elenca gli eventi Stripe per l'intervallo di date e salta quelli già registrati — confrontati prima per ID provider in `eventLogs`, poi per ID transazione, poi tramite `DonationRepo.findMatchingDonation` (importo + data + persona), così una nuova esecuzione non importa mai due volte. Gli eventi `charge.succeeded` / `payment_intent.succeeded` degli abbonamenti vengono saltati perché `invoice.paid` registra già quelle donazioni; le versioni più recenti dell'API di Stripe eliminano `PaymentIntent.invoice`, quindi il salto si basa anche sulla descrizione "Subscription …".

## Webhook e riconciliazione

I pagamenti regolati e le variazioni di stato degli abbonamenti arrivano a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). L'elaborazione è deliberatamente idempotente:

1. **Verifica** — `GatewayService.verifyWebhook` delega il controllo della firma al provider; una firma non valida restituisce 401. Gli eventi che non richiedono elaborazione terminano subito con 200.
2. **Deduplica dell'evento** — `EventLogRepo.loadByProviderId` salta un webhook già registrato in `eventLogs`.
3. **Deduplica della donazione** — prima di creare qualsiasi cosa, `DonationRepo.loadByTransactionId` viene verificato rispetto a ogni ID candidato che il payload potrebbe contenere. Questo assorbe le consegne duplicate, gli eventi ACH in più fasi (in sospeso → regolato) e il caso in cui `/donate/charge` abbia già registrato l'offerta in modo ottimistico.
4. **Applicazione** — `classifyWebhookEvent(eventType)` del provider stabilisce cosa significa l'evento (`donation` in sospeso/completato, `cancel-subscription` oppure `ignore`); i pagamenti completati creano una donazione `complete` (o promuovono una donazione `pending` o `failed` esistente), gli eventi in stile ACH vengono registrati come `pending` fino alla regolazione, una fattura di abbonamento non riuscita (`invoice.payment_failed` di Stripe) crea una donazione `failed` associata all'ID della fattura, e gli eventi di annullamento eliminano la riga locale `subscriptions`. Il controller non ispeziona mai i nomi degli eventi specifici di un provider.

### Donazioni ricorrenti non riuscite e solleciti

Una donazione `failed` è l'unità di lavoro per il recupero. `GET /giving/donations/failed` le elenca con il messaggio di errore più recente del gateway da `eventLogs` e un flag `canRetry` dalle capacità del gateway; `POST /giving/donate/retry/:donationId` chiama `retryFailedPayment` del provider (Stripe salda la fattura aperta), e il webhook risultante promuove la riga a `complete` tramite il normale percorso di deduplicazione. Le email di sollecito vengono inviate al donatore dal gestore dei webhook il giorno 0, poi da `DunningHelper.run` nel timer di mezzanotte (collegato sia in `lambda/timer-handler.ts` sia in `RailwayCron.ts`) al 3° e al 7° giorno; ogni invio viene registrato in `eventLogs` come `provider: "dunning"`, `providerId: "<donationId>:<day>"`, così una nuova esecuzione non invia mai due volte la stessa email. Quando Stripe rinuncia e annulla l'abbonamento (`customer.subscription.deleted` con `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` invia al donatore un'unica email (`providerId: "<subscriptionId>:canceled"`); gli annullamenti avviati dal donatore o dall'amministratore restano silenziosi. Stripe non aggiunge mai nuovi eventi a un endpoint esistente: dopo aver modificato `StripeHelper.webhookEvents`, è necessario ri-salvare il gateway oppure eseguire `tools/manual/stripe-webhook-events.ts` (simulazione per impostazione predefinita, `--apply` per scrivere) sull'ambiente di produzione.

I provider con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) registrano gli addebiti dalla risposta di `/charge` (non serve alcun passaggio tramite webhook nel caso normale), mentre Stripe si basa su `payment_intent.succeeded` / `invoice.paid` e su `payment_intent.processing` per l'ACH. La gestione delle commissioni (`POST /giving/donate/fee`, il flag del gateway `payFees` e il `calculateFees` di ogni provider) calcola la maggiorazione "copri le commissioni" lato donatore — B1 non trattiene alcuna quota per la piattaforma, quindi non viene mai aggiunta alcuna commissione applicativa.

:::info
I percorsi di addebito e webhook scrivono le stesse righe in `donations` / `fundDonations`. Il `transactionId` è la chiave di collegamento che impedisce che un addebito registrato in modo ottimistico e il suo webhook successivo producano due donazioni per la stessa offerta.
:::

## Pagine correlate

- [Endpoint Giving](../api/endpoints/giving) — superficie REST completa per donazioni, fondi, batch, gateway, abbonamenti, metodi di pagamento e webhook
- [AppHelper](../shared-libraries/app-helper) — il pacchetto npm che include il registro dei provider di pagamento e i componenti per le donazioni
- [Struttura dei moduli](../api/module-structure) — come è organizzato lato server il modulo GivingApi
