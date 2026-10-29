---
title: "Architettura delle donazioni"
---

# Architettura delle donazioni

<div class="article-intro">

ChurchApps gestisce le donazioni con un modello a gateway di pagamento: la chiesa mantiene il proprio account Stripe (oppure PayPal, Kingdom Funding o Paystack), e B1 non si trova mai nel flusso del denaro come processore di pagamento della piattaforma. I dati della carta vengono tokenizzati nel browser e non raggiungono mai un server ChurchApps. Questa pagina descrive l'intero stack: il registro dei provider lato client in `@churchapps/apphelper`, l'astrazione del gateway GivingApi, il modello dei dati delle donazioni e il modo in cui i webhook dei gateway riconciliano i dati nel database.

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

1. **Il gateway custodisce la carta.** Il widget di inserimento di ogni provider tokenizza i dati nel browser; l'API riceve solo un token, un nonce o un id d'ordine.
2. **Un'unica astrazione, molti provider.** Il browser risolve un `PaymentProvider` da un registro; il server risolve un `IGatewayProvider` da una factory. Entrambi usano lo stesso nome normalizzato del provider memorizzato nel record del gateway.
3. **I webhook sono la fonte di verità per il regolamento.** La risposta di un addebito viene registrata in modo ottimistico, ma è il webhook firmato del gateway a confermare (o creare) la donazione completata, con protezioni di idempotenza su entrambi i lati.

## Lato client: il registro dei provider di pagamento (`@churchapps/apphelper`)

Il registro si trova in `Packages/apphelper/src/donations/providers/`, e i widget e gli helper di ciascun provider si trovano nella propria sottocartella (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Nulla al di fuori di `providers/` si ramifica in base al nome del provider. Un `PaymentProvider` (vedi `providers/types.ts`) raccoglie tutto ciò che un'app host necessita per un gateway: un `descriptor` (etichette per l'amministratore, valute supportate, campi delle commissioni, tariffe predefinite, URL della dashboard e della registrazione), un insieme di `capabilities` (carte salvate, ACH, ricorrenti, inserimento di una nuova carta in linea, salvataggio implicito alla tokenizzazione), i widget React per l'inserimento dei membri (`MemberWrapper`/`MemberEntry`), la donazione degli ospiti (`GuestForm`), la modifica dei metodi salvati (`MethodEditForm`) e i pagamenti tramite moduli (`FormPayment`), oltre a `buildChargeRequest(ctx, token)`, cioè l'unico punto in cui la struttura del payload dell'addebito varia da provider a provider. Il `MemberWrapper` di ogni provider carica il proprio SDK a partire dalla chiave pubblica contenuta nel record del gateway, quindi le app host non importano mai un SDK di gateway (B1App e B1Admin non hanno alcuna dipendenza da `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizza la scelta, tra i gateway di una chiesa, di quello da usare in una determinata superficie.

`providers/registry.ts` contiene i provider integrati. Vengono **referenziati per valore**, e non registrati tramite un effetto collaterale di un modulo, così che il tree-shaking del bundler non possa mai eliminare la registrazione:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funzione | Scopo |
|----------|---------|
| `getPaymentProvider(name)` | Risolve tramite il nome normalizzato; ricade su Stripe, così un provider configurato male non blocca mai in modo brusco il modulo del donatore |
| `registerPaymentProvider(p)` | Registra un provider aggiuntivo a runtime (per il gateway personalizzato di un'app host) |
| `listPaymentProviders()` | Elenca i provider integrati e quelli personalizzati; usata per costruire il menu a tendina dei gateway nell'amministrazione |
| `hasPaymentProvider(name)` | Verifica di appartenenza |

**Provider lato client integrati: Stripe, PayPal, Kingdom Funding, Paystack.** B1App e B1Admin si limitano a *leggere* il registro (`getPaymentProvider`, `listPaymentProviders`); nessuna delle due chiama `registerPaymentProvider`: la registrazione resta all'interno di apphelper.

Ogni provider tokenizza in modo diverso, ma tutti tengono la carta fuori da B1:

| Provider | Widget di inserimento | Token restituito all'API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` di Stripe `Elements` → `stripe.createPaymentMethod(...)`; il modulo per gli ospiti monta anche un `ExpressCheckoutElement` (Apple Pay / Google Pay, per i doni una tantum) il cui `onConfirm` risolve nello stesso id `pm_…` | id del metodo di pagamento (`pm_…`); conto bancario tramite `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` per i gateway in USD, `acss_debit` PAD canadese (modale con mandato ospitato, mandato `default_for` per fatture/abbonamenti, gli addebiti una tantum passano l'id del mandato) per i gateway in CAD |
| Kingdom Funding | Modulo di tokenizzazione ospitato, associato alla chiave pubblica del gateway | nonce monouso |
| PayPal | PayPal Hosted Fields (carta, ricorrenti) più PayPal Smart Buttons con finanziamento Venmo (una tantum); entrambi condividono un unico caricamento dell'SDK e l'ordine lato server creato tramite `/donate/client-token` + `/donate/create-order` | id dell'ordine incassato |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`): è il popup stesso a gestire il pagamento (carta, denaro mobile, bonifico bancario, USSD) | riferimento della transazione pagata; i metodi salvati sono codici di autorizzazione Paystack `AUTH_…` |

Il `finalizeResult` di Stripe esegue nel browser il 3-D Secure / SCA (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) prima che la donazione venga considerata completata; il modulo condiviso si limita a chiamare `provider.finalizeResult(result)` senza sapere cosa faccia.

## Lato server: l'astrazione del gateway (GivingApi)

Il modulo `/giving` (`Api/src/modules/giving`) espone la superficie REST; l'infrastruttura del gateway si trova in `Api/src/shared/helpers`. `DonateController` non parla mai direttamente con un SDK del gateway: passa da `GatewayService`, che risolve il `IGatewayProvider` corretto tramite `GatewayFactory` e gli consegna una `GatewayConfig` già decifrata.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) è il contratto che ogni gateway implementa: ciclo di vita dei webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pagamento (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), commissioni (`calculateFees`), gestione dei metodi salvati (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) e funzioni opzionali aggiuntive (clienti, ordini, SetupIntent, replay degli eventi, `retryFailedPayment` per una fattura di abbonamento non riuscita, `registerPaymentMethodDomain` per la verifica del dominio di Apple Pay). Un provider che non implementa un hook opzionale viene segnalato come non supportato per quell'azione e l'interfaccia nasconde il relativo controllo. Ogni classe di provider dichiara la propria matrice `capabilities` (valute supportate, ACH, rimborsi, requisiti degli abbonamenti, limiti delle transazioni): `GatewayService.getProviderCapabilities(provider)` si limita a leggerla, e flag come `logsDonationsImmediately` guidano il comportamento dei controller senza che questi contengano alcuna condizione sul nome del provider.

**Provider lato server registrati in `GatewayFactory`:**

| Provider | Disponibilità |
|----------|-------------|
| Stripe | Sempre attivo |
| PayPal | Sempre attivo |
| Kingdom Funding | Sempre attivo |
| Paystack | Sempre attivo (commercianti in Nigeria, Ghana, Sudafrica, Kenya, Costa d'Avorio; valute NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Attivabile tramite la variabile d'ambiente `ENABLE_SQUARE` |
| ePayMints | Attivabile tramite la variabile d'ambiente `ENABLE_EPAYMINTS` |

Paystack si distingue dagli altri perché il denaro si muove prima che GivingApi entri in gioco: il popup addebita il donatore, `processCharge` è una `GET /transaction/verify/:reference` il cui importo pagato e la cui valuta devono corrispondere alla donazione che viene registrata (un riferimento già presente non viene mai registrato due volte), e la prima donazione di una pianificazione ricorrente viene registrata da `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` con `start_date` a un intervallo di distanza). I webhook sono firmati con la chiave segreta stessa (`x-paystack-signature`, HMAC-SHA512 sul corpo grezzo) e Paystack non dispone di alcuna API per la gestione dei webhook, quindi la schermata di amministrazione mostra l'URL che la chiesa deve incollare nella propria dashboard. Gli eventi `charge.success` dei rinnovi non contengono la ripartizione per fondo; il provider la recupera dalle righe locali `subscriptions`/`subscriptionFunds` del donatore. Solo le autorizzazioni di carta sono `reusable`: i doni tramite denaro mobile sono esclusivamente una tantum, quindi `createSubscription` li rifiuta. I dati demo inseriscono una seconda chiesa (Accra Community Church, `CHU00000002`) con un gateway Paystack GHS in modalità test, così la suite Playwright di Paystack funziona accanto a quella di Stripe di Grace.

I provider personalizzati possono essere registrati a runtime quando è impostata `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` è la classe base per questi. I nomi dei provider vengono confrontati senza distinzione tra maiuscole e minuscole.

### Configurazione del gateway e segreti

Un amministratore salva le credenziali del gateway tramite `POST /giving/gateways` (`GatewayController`). Al salvataggio il controller cifra le chiavi privata e del webhook con `EncryptionHelper` prima di memorizzarle, poi, su qualunque host diverso da localhost, elimina il webhook esistente della chiesa e ne configura uno nuovo che punta a `/giving/donate/webhook/{provider}?churchId=…`. Una chiesa mantiene una riga per provider: salvare un gateway sostituisce solo la riga esistente per quello stesso provider. Le letture pubbliche (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) restituiscono solo le chiavi pubbliche.

## Modello dei dati

Lo schema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelli in `models/`) è uno schema MySQL a cui si accede tramite Kysely:

| Tabella | Ruolo |
|-------|------|
| `gateways` | Configurazione del provider per chiesa: `provider`, `publicKey`, `privateKey`/`webhookKey` cifrate, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinazioni delle donazioni (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Raggruppamento per inserimento e reportistica (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Un singolo dono: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; estratti conto, totali, dashboard e report delle donazioni contano solo `complete` o null), `transactionId` |
| `fundDonations` | Ripartizione di una donazione tra uno o più fondi (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Dono ricorrente; `id` è l'id di abbonamento del gateway, collegato a `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Ripartizione per fondo di un dono ricorrente |
| `customers` | Collega un `personId` al suo id cliente nel gateway, per `provider` |
| `gatewayPaymentMethods` | Carte/conti bancari salvati: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Registro di audit dei webhook/eventi e chiave di deduplicazione (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagne di impegno legate a un fondo e importo promesso da ciascuna persona |

Una donazione viene ripartita tra i fondi tramite `fundDonations`: la donazione contiene il totale, e ogni `fundDonation` contiene una quota. `donations.currency` e `gateways.currency` contengono la valuta ISO; ogni provider dichiara le proprie `supportedCurrencies` e gli importi vengono formattati con `CurrencyHelper.formatCurrencyWithLocale`.

## Flussi end-to-end

### Donazioni dei membri, una tantum e ricorrenti (B1App)

La schermata di donazione per utenti autenticati (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compone tre componenti di apphelper: `MultiGatewayDonationForm`, `PaymentMethods` e `RecurringDonations`. B1App si occupa del caricamento dei dati circostante (`GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`) e passa l'elenco dei gateway; il provider risolto carica il proprio SDK dalla chiave pubblica del gateway. L'addebito vero e proprio avviene all'interno di apphelper: il provider risolto tokenizza il metodo (nuovo o salvato), poi invia una richiesta a `/giving/donate/charge` per un dono una tantum oppure a `/giving/donate/subscribe` per un dono ricorrente. Entrambi gli endpoint attribuiscono un donatore autenticato al proprio `personId` (solo chi possiede `donations.edit` può attribuire a un'altra persona) e rifiutano le ripartizioni tra fondi la cui somma supera l'importo addebitato. I doni ricorrenti creano una riga `subscriptions` più `subscriptionFunds` e consegnano la pianificazione al gateway (Stripe Subscriptions, PayPal Billing Plans o una pianificazione ricorrente KF).

### Donazioni di ospiti / anonime

La pagina pubblica di donazione (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) e il pannello "dona ora" visualizzano `NonAuthDonationWrapper` da `@churchapps/apphelper/website`, che inserisce reCAPTCHA e il contesto Elements del gateway attorno al `GuestForm` del provider. Gli ospiti non hanno accesso, non possono salvare metodi né consultare uno storico. Il flusso recupera `GET /giving/funds/churchId/:id` e `GET /giving/donate/gateways/:churchId` (solo chiavi pubbliche), verifica il visitatore con `POST /giving/donate/captcha-verify`, tokenizza nel browser e invia a `/giving/donate/charge` (o `/subscribe`). La chiamata di verifica restituisce un `captchaPass` firmato con HMAC e valido 10 minuti (`Api/src/modules/giving/helpers/CaptchaPass.ts`), che il modulo invia con ogni operazione di pagamento dell'ospite; con `CAPTCHA_ENFORCE=true` l'Api rifiuta le chiamate ospite a `create-order`, `charge`, `subscribe`, `addcard` e `ach-setup-intent-anon` prive di un pass valido per quella chiesa. Il bonifico per gli ospiti usa l'endpoint anonimo `POST /giving/paymentmethods/ach-setup-intent-anon`, che consente solo la verifica immediata (Financial Connections): un controllo con microdepositi si conclude dopo giorni, quando la pagina dell'ospite non c'è più, quindi non potrebbe mai completare il dono. Il modulo rifiuta di addebitare un SetupIntent non verificato e indirizza il donatore verso la carta o verso una configurazione bancaria con accesso effettuato.

Tre opzioni del modulo per gli ospiti utilizzano la stessa chiamata di addebito. `?fundId=` e `?amount=` nell'URL di donazione preselezionano la ripartizione tra i fondi (letta dal modulo ospite di ciascun provider al montaggio, e instradata attraverso il normale gestore di cambio fondo, così totali e commissioni si aggiornano). `anonymous: true` fa sì che `DonateController.charge` scarti qualsiasi persona inviata dal client e registri il dono con `personId = null`; il modulo ospite salta `/people/loadOrCreate` e la fase di cliente/vault, e i tre provider a registrazione immediata smettono di risolvere una persona a partire dal cliente del gateway. Apple Pay richiede che il dominio della pagina sia registrato presso Stripe, quindi un modulo ospite Stripe invia una volta per sessione una richiesta `POST /giving/donate/register-domain` pubblica e con limitazione di frequenza, che accetta solo un dominio appartenente alla chiesa (`<subDomain>.b1.church`, una riga nella tabella dei domini del modulo content, oppure un host locale) prima di chiamare l'API dei payment-method-domains di Stripe.

### Registrazione da parte dell'amministrazione e importazione da Stripe (B1Admin)

La sezione donazioni di B1Admin (`B1Admin/src/donations/`) è dove lavorano i team amministrativi. L'inserimento in batch (`components/BulkDonationEntry.tsx`) registra i doni in contanti, assegno o in natura inviando `/giving/donations` e poi `/giving/funddonations`, senza coinvolgere alcun gateway. La scheda **Registra un dono** del record della persona (`components/LogGiftDialog.tsx`) fa lo stesso per un singolo dono: cerca prima il batch la cui `batchDate` corrisponde alla data del dono, oppure ne crea uno con quella data (`POST /giving/donationbatches`), ed elimina di nuovo la donazione o il nuovo batch se un passaggio successivo fallisce. Fondi, batch, campagne ed estratti conto corrispondono ciascuno alle rotte CRUD `/giving/*`; le pagine degli estratti conto (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) richiedono un anno solare con `GET /donations?startDate=&endDate=` e `GET /fundDonations?startDate=&endDate=`, anziché l'intero storico della chiesa, che potrebbe superare il limite di dimensione della risposta di Lambda. Il pannello di donazione in stile membro (`B1Admin/src/donationComponents/`) riutilizza gli stessi componenti apphelper di B1App.

Le consegne alla reportistica e alla contabilità avvengono lato client o tramite il report runner, non tramite il gateway: l'esportazione QuickBooks della pagina del batch genera un CSV di scrittura contabile a partire da `donations` + `fundDonations` del batch (debito su Undeposited Funds, un credito per ogni fondo); la vista Lapsed Givers della pagina Summary esegue `Api/reports/lapsedGivers.json` tramite il report runner generico, con i nomi delle persone risolti da `ReportOutput`; i formati delle ricevute per paese (Canada / Australia / Nuova Zelanda) sono impostazioni della chiesa nel key/value store di membership, visualizzate da `GivingStatementDocument` e duplicate nella pagina di stampa di B1App. Le pagine di stampa degli estratti conto di B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) passano l'impostazione `logoLight` della chiesa (tramite `usePrintLogo` in `B1Admin/src/components/PrintChurchHeader.tsx`) affinché il logo venga stampato in cima a ciascun estratto, e attendono il caricamento dell'immagine prima di avviare la stampa automatica.

### Stato dei batch e permesso Inserire donazioni

I batch possono essere chiusi affinché un deposito già contato resti invariato. `POST /giving/donationbatches/:id/close` e `/:id/reopen` (solo Donations.Edit) sono gli unici scrittori di `status`, `closedDate` e `closedBy` (`DonationBatchRepo.setStatus`); un normale salvataggio del batch non li tocca mai, quindi l'invio di un batch non può riaprirlo. L'accesso in scrittura è centralizzato in `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit può modificare qualsiasi cosa, mentre il permesso più ristretto Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Inserire donazioni" nell'editor dei ruoli) può creare batch e salvare o eliminare donazioni e ripartizioni tra fondi solo quando sia il batch attuale della donazione sia il batch di destinazione sono aperti, e mai per un dono da gateway (uno con un `transactionId`). Una scrittura bloccata restituisce `403 { error: "This batch is closed." }`. La lettura dei batch accetta Donations.ViewSummary oppure Donations.Enter, così chi conta può selezionare il batch in cui sta inserendo. Lato client, `B1Admin/src/donations/batchAccess.ts` replica queste regole (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), e `Header` / `SecondaryMenuHelper` mostrano **Donazioni > Batch** a chiunque possa vedere i batch, anche senza View Summary.

### Conversione di totali in valute miste

Qualsiasi endpoint che restituisce un unico totale combinato su doni che potrebbero essere in valute diverse (i KPI di riepilogo delle donazioni, `GivingKpiCards`, il totale di un batch di donazioni, il totale di un fondo e i totali annuali/di periodo della schermata di donazione di B1App) converte lato server nella valuta predefinita della chiesa, anziché sommare valute diverse. `Api/src/shared/helpers/ExchangeRateHelper.ts` recupera i tassi da `api.frankfurter.dev` in base alla valuta della chiesa, li memorizza nella cache del processo per 12 ore ed espone `convertTotals(rows, churchCurrency, rates)`: le righe vengono raggruppate per valuta già in SQL (poche decine di gruppi, mai una conversione per ogni singolo dono), ciascun gruppo viene convertito e sommato, e il risultato porta un flag `isConverted` che il client usa per mostrare la nota "Convertito ai tassi di cambio correnti". `GET /donations/exchange-rates` espone la tabella dei tassi ai client che ne hanno bisogno (la schermata di donazione di B1App); i tassi non vengono mai accettati da una richiesta, ma sempre e solo recuperati lato server, così un client non può influenzare un totale riportato. I singoli record di donazione e i report nella valuta originale o storica non vengono mai convertiti: vengono convertiti solo i totali combinati.

L'importazione da Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) recupera i doni effettuati al di fuori di B1: chiama `POST /giving/donate/replay-stripe-events` con `dryRun: true` per un'anteprima, poi con `dryRun: false` per importare. Il server elenca gli eventi Stripe per l'intervallo di date e salta quelli già registrati, confrontandoli prima per id provider in `eventLogs`, poi per id transazione, infine con `DonationRepo.findMatchingDonation` (importo + data + persona), così una nuova esecuzione non importa mai due volte. Gli eventi `charge.succeeded` / `payment_intent.succeeded` degli abbonamenti vengono saltati perché `invoice.paid` registra già quei doni; le versioni più recenti dell'API di Stripe eliminano `PaymentIntent.invoice`, quindi il salto si basa anche sulla descrizione "Subscription …".

## Webhook e riconciliazione

I pagamenti regolati e le variazioni di stato degli abbonamenti arrivano a `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). L'elaborazione è volutamente idempotente:

1. **Verifica**: `GatewayService.verifyWebhook` delega il controllo della firma al provider; una firma non valida restituisce 401. Gli eventi che non richiedono elaborazione terminano subito con 200.
2. **Deduplicazione dell'evento**: `EventLogRepo.loadByProviderId` salta un webhook già registrato in `eventLogs`.
3. **Deduplicazione della donazione**: prima di creare qualsiasi cosa, `DonationRepo.loadByTransactionId` viene verificato per ogni possibile id candidato contenuto nel payload. Questo assorbe le consegne duplicate, gli eventi ACH in più fasi (in elaborazione → regolato) e il caso in cui `/donate/charge` abbia già registrato il dono in modo ottimistico.
4. **Applicazione**: `classifyWebhookEvent(eventType)` del provider indica il significato dell'evento (`donation` in attesa/completata, `cancel-subscription` oppure `ignore`); i pagamenti completati creano una donazione `complete` (oppure promuovono una donazione `pending` o `failed` esistente), gli eventi in stile ACH vengono registrati come `pending` fino al regolamento, una fattura di abbonamento non riuscita (`invoice.payment_failed` di Stripe) crea una donazione `failed` associata all'id della fattura, e gli eventi di annullamento eliminano la riga `subscriptions` locale. Il controller non esamina mai i nomi degli eventi specifici di un provider.

### Donazioni ricorrenti non riuscite e solleciti

Una donazione `failed` è l'unità di lavoro per il recupero. `GET /giving/donations/failed` le elenca insieme al messaggio di errore più recente del gateway, preso da `eventLogs`, e a un flag `canRetry` ricavato dalle capacità del gateway; `POST /giving/donate/retry/:donationId` chiama `retryFailedPayment` del provider (Stripe salda la fattura aperta), e il webhook risultante promuove la riga a `complete` tramite il normale percorso di deduplicazione. Le email di sollecito vengono inviate al donatore dal gestore dei webhook il giorno 0, poi da `DunningHelper.run` nel timer di mezzanotte (collegato sia in `lambda/timer-handler.ts` sia in `RailwayCron.ts`) dopo 3 e 7 giorni; ogni invio viene registrato in `eventLogs` come `provider: "dunning"`, `providerId: "<donationId>:<day>"`, così una nuova esecuzione non invia mai due volte la stessa email. Quando Stripe rinuncia e annulla l'abbonamento (`customer.subscription.deleted` con `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` invia al donatore una sola email (`providerId: "<subscriptionId>:canceled"`); gli annullamenti avviati dal donatore o dall'amministratore restano silenziosi. Stripe non aggiunge mai eventi a un endpoint esistente: dopo aver modificato `StripeHelper.webhookEvents`, occorre salvare di nuovo il gateway oppure eseguire `tools/manual/stripe-webhook-events.ts` (per impostazione predefinita in modalità di prova, `--apply` per scrivere) sull'ambiente di produzione.

I provider con `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) registrano gli addebiti dalla risposta di `/charge` (nel percorso ideale non è richiesto alcun passaggio tramite webhook), mentre Stripe si basa su `payment_intent.succeeded` / `invoice.paid` e su `payment_intent.processing` per l'ACH. La gestione delle commissioni (`POST /giving/donate/fee`, il flag del gateway `payFees` e `calculateFees` di ciascun provider) calcola lato donatore la maggiorazione "copri le commissioni": B1 non trattiene alcuna quota della piattaforma, quindi non viene mai aggiunta una commissione applicativa.

:::info
I percorsi di addebito e di webhook scrivono le stesse righe `donations` / `fundDonations`. Il `transactionId` è la chiave di unione che impedisce che un log di addebito ottimistico e il suo webhook successivo generino due donazioni per lo stesso dono.
:::

## Pagine correlate

- [Endpoint Giving](../api/endpoints/giving): l'intera superficie REST per donazioni, fondi, batch, gateway, abbonamenti, metodi di pagamento e webhook
- [AppHelper](../shared-libraries/app-helper): il pacchetto npm che include il registro dei provider di pagamento e i componenti per le donazioni
- [Struttura dei moduli](../api/module-structure): come è organizzato lato server il modulo GivingApi
