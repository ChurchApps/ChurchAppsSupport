---
title: "Arkitektura donațiilor"
description: "Ghid pentru dezvoltatori despre donațiile ChurchApps: cum trimit B1 Admin și B1.church donațiile prin gateway-urile Stripe, PayPal, Kingdom Funding sau Paystack."
---

# Arkitektura donațiilor

<div class="article-intro">

ChurchApps gestionează donațiile pe un model de tip „gateway-rail”: biserica își păstrează propriul cont Stripe (sau PayPal, Kingdom Funding ori Paystack), iar B1 nu intervine niciodată în fluxul banilor ca procesator de plăți al platformei. Datele cardului sunt tokenizate în browser și nu ajung niciodată pe un server ChurchApps. Această pagină prezintă întreaga arhitectură — registrul de furnizori de plăți din partea clientului din `@churchapps/apphelper`, abstractizarea gateway-ului GivingApi, modelul de date al donațiilor și modul în care webhook-urile gateway-ului se reconciliază cu baza de date.

</div>

## Prezentare generală

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Gateway de plată                     │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ introducerea      │  Stripe Elements · tokenizer KF ·     │
│  │ Registru furnizori    │──┼ cardului           ▶│  PayPal Hosted Fields                 │
│  │ de plăți              │  │◀── token / nonce ─│  (cardul nu ajunge la un server B1)   │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ eveniment webhook
┌─────────────────────────────────────────────┐ (cheie secretă)│                │ semnat
│  GivingApi — modulul /giving                │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  salvează donations + fundDonations — deduplicare prin eventLogs / transactionId
                      ▼
                MySQL (schema giving)
```

Trei principii se aplică pe întreaga arhitectură:

1. **Gateway-ul deține cardul.** Fiecare furnizor își tokenizează widget-ul de introducere în browser; API-ul primește doar un token, un nonce sau un ID de comandă.
2. **O singură abstractizare, mulți furnizori.** Browserul obține un `PaymentProvider` din registru; serverul obține un `IGatewayProvider` dintr-o fabrică. Ambele se bazează pe același nume normalizat al furnizorului, stocat în înregistrarea gateway-ului.
3. **Webhook-urile sunt sursa de adevăr pentru decontare.** Răspunsul la o plată este înregistrat optimist, dar webhook-ul semnat al gateway-ului este cel care confirmă (sau creează) donația finalizată, cu protecții de idempotență pe ambele părți.

## Partea client: registrul furnizorilor de plăți (`@churchapps/apphelper`)

Registrul se află în `Packages/apphelper/src/donations/providers/`, iar widget-urile și utilitarele fiecărui furnizor se află în subfolderul propriu (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — nimic din afara `providers/` nu ramifică în funcție de numele unui furnizor. Un `PaymentProvider` (vezi `providers/types.ts`) grupează tot ce are nevoie o aplicație gazdă pentru un gateway: un `descriptor` (etichete pentru administrator, monede acceptate, câmpuri pentru comisioane, rate implicite ale comisioanelor, URL-uri pentru panoul de control/înscriere), un set de `capabilities` (carduri salvate, ACH, plăți recurente, introducere inline a unui card nou, salvare implicită la tokenizare), widget-urile React pentru introducerea de către membri (`MemberWrapper`/`MemberEntry`), donațiile de la vizitatori (`GuestForm`), editarea metodei salvate (`MethodEditForm`) și plățile din formularele cu întrebări (`FormPayment`), precum și `buildChargeRequest(ctx, token)` — singurul loc în care structura payload-ului de plată diferă de la un furnizor la altul. `MemberWrapper` al fiecărui furnizor încarcă propriul SDK din cheia publică a înregistrării gateway-ului, astfel încât aplicațiile gazdă nu importă niciodată un SDK de gateway (B1App și B1Admin nu au nicio dependență de `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizează alegerea gateway-ului dintre cele ale bisericii pe care o folosește fiecare suprafață.

`providers/registry.ts` conține furnizorii încorporați. Aceștia sunt **referențiați prin valoare**, nu înregistrați printr-un efect secundar al modulului, astfel încât eliminarea codului neutilizat de către bundler nu poate șterge niciodată înregistrarea:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funcție | Scop |
|----------|---------|
| `getPaymentProvider(name)` | Rezolvă după numele normalizat; revine la Stripe, astfel încât un furnizor configurat greșit să nu blocheze niciodată formularul donatorului |
| `registerPaymentProvider(p)` | Înregistrează un furnizor suplimentar în timpul rulării (pentru gateway-ul personalizat al unei aplicații gazdă) |
| `listPaymentProviders()` | Enumeră furnizorii încorporați și pe cei personalizați — folosit pentru a construi lista derulantă a gateway-urilor din administrare |
| `hasPaymentProvider(name)` | Verificarea apartenenței |

**Furnizorii încorporați pe partea client: Stripe, PayPal, Kingdom Funding, Paystack.** B1App și B1Admin doar *citesc* registrul (`getPaymentProvider`, `listPaymentProviders`); niciuna nu apelează `registerPaymentProvider` — înregistrarea rămâne în interiorul apphelper.

Fiecare furnizor tokenizează diferit, dar toți țin cardul în afara B1:

| Furnizor | Widget de introducere | Token returnat către API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` din Stripe `Elements` → `stripe.createPaymentMethod(...)`; formularul pentru vizitatori montează și un `ExpressCheckoutElement` (Apple Pay / Google Pay, pentru daruri unice), al cărui `onConfirm` se rezolvă în același ID `pm_…` | ID-ul metodei de plată (`pm_…`); pentru bancă, prin `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` pentru gateway-urile în USD, `acss_debit` pentru PAD din Canada (modal de mandat găzduit, mandatul `default_for` facturi/abonamente, plățile unice transmit ID-ul mandatului) pentru gateway-urile în CAD |
| Kingdom Funding | Formular de tokenizare găzduit, identificat prin cheia publică a gateway-ului | nonce de unică folosință |
| PayPal | PayPal Hosted Fields (card, recurent) plus PayPal Smart Buttons cu finanțare Venmo (plăți unice); ambele partajează o singură încărcare de SDK, iar comanda de pe server este construită prin `/donate/client-token` + `/donate/create-order` | ID-ul comenzii capturate |
| Paystack | Fereastra Paystack Inline (`js.paystack.co/v2/inline.js`) — fereastra în sine efectuează plata (card, mobile money, transfer bancar, USSD) | referința tranzacției plătite; metodele salvate sunt coduri de autorizare Paystack `AUTH_…` |

`finalizeResult` de la Stripe rulează 3-D Secure / SCA în browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) înainte ca donația să fie considerată finalizată; formularul comun apelează doar `provider.finalizeResult(result)`, fără să știe ce face aceasta.

## Partea server: abstractizarea gateway-ului (GivingApi)

Modulul `/giving` (`Api/src/modules/giving`) expune suprafața REST; infrastructura gateway-ului se află în `Api/src/shared/helpers`. `DonateController` nu comunică niciodată direct cu un SDK de gateway — trece prin `GatewayService`, care obține `IGatewayProvider`-ul potrivit din `GatewayFactory` și îi transmite un `GatewayConfig` decriptat.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decriptează privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) este contractul pe care îl implementează fiecare gateway — ciclul de viață al webhook-ului (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), plata (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), comisioanele (`calculateFees`), gestionarea metodelor salvate (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) și extensiile opționale (clienți, comenzi, SetupIntents, reluarea evenimentelor, `retryFailedPayment` pentru o factură de abonament eșuată, `registerPaymentMethodDomain` pentru verificarea domeniului Apple Pay). Un furnizor care omite un hook opțional este raportat ca neacceptat pentru acea acțiune, iar interfața ascunde controlul respectiv. Fiecare clasă de furnizor își declară propria matrice `capabilities` (monede acceptate, ACH, rambursări, cerințe pentru abonamente, limite de tranzacție) — `GatewayService.getProviderCapabilities(provider)` doar o citește — iar indicatori precum `logsDonationsImmediately` controlează comportamentul controllerelor fără nicio condiție legată de numele furnizorului în controllere.

**Furnizori pe server înregistrați în `GatewayFactory`:**

| Furnizor | Disponibilitate |
|----------|-------------|
| Stripe | Întotdeauna activ |
| PayPal | Întotdeauna activ |
| Kingdom Funding | Întotdeauna activ |
| Paystack | Întotdeauna activ (comercianți din Nigeria, Ghana, Africa de Sud, Kenya, Côte d'Ivoire; monedele NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opțional, prin indicatorul de mediu `ENABLE_SQUARE` |
| ePayMints | Opțional, prin indicatorul de mediu `ENABLE_EPAYMINTS` |

Paystack diferă de ceilalți prin faptul că banii circulă înainte ca GivingApi să fie implicat: fereastra încasează plata de la donator, `processCharge` este un `GET /transaction/verify/:reference` a cărui sumă plătită și monedă trebuie să corespundă donației care se înregistrează (o referință deja existentă nu este înregistrată niciodată de două ori), iar prima donație dintr-un program recurent este înregistrată din `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` cu `start_date` la un interval distanță). Webhook-urile sunt semnate chiar cu cheia secretă (`x-paystack-signature`, HMAC-SHA512 peste corpul brut), iar Paystack nu are un API de gestionare a webhook-urilor, astfel încât ecranul de administrare afișează URL-ul pe care biserica trebuie să îl lipească în panoul său. Evenimentele `charge.success` de reînnoire nu conțin împărțirea pe fonduri; furnizorul o recuperează din rândurile locale `subscriptions`/`subscriptionFunds` ale donatorului. Doar autorizările de card sunt `reusable` — donațiile prin mobile money sunt doar unice, astfel încât `createSubscription` le refuză. Datele demonstrative includ o a doua biserică (Accra Community Church, `CHU00000002`) pe un gateway Paystack în mod test, în GHS, pentru ca suita Playwright Paystack să ruleze alături de cea Stripe a lui Grace.

Furnizorii personalizați pot fi înregistrați în timpul rulării când este setată variabila `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` este clasa de bază pentru aceștia. Numele furnizorilor sunt comparate fără a ține cont de majuscule.

### Configurarea gateway-ului și secretele

Un administrator salvează credențialele gateway-ului prin `POST /giving/gateways` (`GatewayController`). La salvare, controllerul criptează cheia privată și cheia webhook cu `EncryptionHelper` înainte de persistare, apoi — pe orice gazdă care nu este localhost — șterge webhook-ul existent al bisericii și provizionează unul nou, care indică spre `/giving/donate/webhook/{provider}?churchId=…`. O biserică păstrează câte un rând pentru fiecare furnizor: salvarea unui gateway înlocuiește doar rândul existent pentru același furnizor. Citirile publice (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) returnează doar cheile publice.

## Modelul de date

Schema `giving` (`Api/src/modules/giving/db/DatabaseTypes.ts`, modelele din `models/`) este o schemă MySQL accesată prin Kysely:

| Tabel | Rol |
|-------|------|
| `gateways` | Configurația furnizorului per biserică: `provider`, `publicKey`, `privateKey`/`webhookKey` criptate, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Destinațiile donațiilor (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Grupare pentru introducere/raportare (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Un singur dar: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; extrasele, totalurile, tablourile de bord și rapoartele de donații numără doar `complete` sau null), `transactionId` |
| `fundDonations` | Alocarea unei donații către unul sau mai multe fonduri (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Dar recurent; `id` este ID-ul abonamentului din gateway, legat de `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Împărțirea pe fonduri a unui dar recurent |
| `customers` | Leagă un `personId` de ID-ul clientului din gateway, pentru fiecare `provider` |
| `gatewayPaymentMethods` | Carduri/conturi bancare salvate: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Jurnalul de audit al webhook-urilor/evenimentelor și cheia de deduplicare (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campanii de promisiuni legate de un fond și suma promisă de fiecare persoană |

O donație se împarte pe fonduri prin `fundDonations` — donația poartă totalul, iar fiecare `fundDonation` poartă o porțiune. `donations.currency` și `gateways.currency` poartă codul ISO al monedei; fiecare furnizor anunță `supportedCurrencies`, iar sumele sunt formatate cu `CurrencyHelper.formatCurrencyWithLocale`.

## Fluxuri end-to-end

### Donații unice și recurente ale membrilor (B1App)

Ecranul autentificat de donare (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compune trei componente din apphelper: `MultiGatewayDonationForm`, `PaymentMethods` și `RecurringDonations`. B1App se ocupă de încărcarea datelor din jur — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — și transmite lista gateway-urilor mai departe; furnizorul rezolvat își încarcă propriul SDK din cheia publică a gateway-ului. Plata propriu-zisă are loc în interiorul apphelper: furnizorul rezolvat tokenizează metoda (nouă sau salvată), apoi trimite cererea către `/giving/donate/charge` pentru un dar unic sau către `/giving/donate/subscribe` pentru unul recurent. Ambele endpoint-uri atribuie un donator autentificat propriului `personId` (doar cei care dețin `donations.edit` pot atribui unei alte persoane) și resping împărțirile pe fonduri a căror sumă depășește suma încasată. Darurile recurente creează un rând `subscriptions` plus `subscriptionFunds` și predau programul gateway-ului (Stripe Subscriptions, PayPal Billing Plans sau un program recurent KF).

### Donații de la vizitatori / anonime

Pagina publică de donare (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) și panoul „dă acum” randează `NonAuthDonationWrapper` din `@churchapps/apphelper/website`, care injectează reCAPTCHA și contextul Elements al gateway-ului în jurul `GuestForm`-ului furnizorului. Vizitatorii nu au autentificare, metode salvate sau istoric. Fluxul preia `GET /giving/funds/churchId/:id` și `GET /giving/donate/gateways/:churchId` (doar cheile publice), verifică vizitatorul prin `POST /giving/donate/captcha-verify`, tokenizează în browser și trimite cererea către `/giving/donate/charge` (sau `/subscribe`). Apelul de verificare returnează un `captchaPass` semnat HMAC, valabil 10 minute (`Api/src/modules/giving/helpers/CaptchaPass.ts`), pe care formularul îl trimite cu fiecare apel financiar al vizitatorului; cu `CAPTCHA_ENFORCE=true`, Api-ul refuză apelurile `create-order`, `charge`, `subscribe`, `addcard` și `ach-setup-intent-anon` de la vizitatori fără un pass valid pentru biserica respectivă. Înregistrările plătite la evenimente de către vizitatori (`POST /content/registrations/register`) verifică același pass chiar înainte de încasare; vezi [Înregistrări la evenimente](./registrations.md#payment-flow). Pentru ACH de către vizitatori se folosește endpoint-ul anonim `POST /giving/paymentmethods/ach-setup-intent-anon`, care permite doar verificarea instantanee (Financial Connections): verificarea prin microdepuneri se termină peste câteva zile, după ce pagina vizitatorului nu mai există, deci darul nu s-ar putea finaliza niciodată. Formularul refuză să încaseze un SetupIntent neverificat și îndreaptă donatorul către card sau către configurarea unui cont bancar de pe un cont autentificat.

Trei opțiuni ale formularului pentru vizitatori folosesc același apel de încasare. `?fundId=` și `?amount=` din URL-ul paginii de donare preselectează împărțirea pe fonduri (citite de formularul fiecărui furnizor la montare, direcționate prin handler-ul normal de schimbare a fondului, astfel încât totalurile și comisioanele se actualizează). `anonymous: true` determină `DonateController.charge` să ignore orice persoană trimisă de client și să înregistreze darul cu `personId = null`; formularul pentru vizitatori sare peste `/people/loadOrCreate` și peste etapa clientului/seifului, iar cei trei furnizori cu înregistrare imediată nu mai deduc o persoană din clientul gateway-ului. Apple Pay necesită ca domeniul paginii să fie înregistrat la Stripe, așa că un formular Stripe pentru vizitatori trimite o dată pe sesiune cererea publică, limitată ca rată, `POST /giving/donate/register-domain`, care acceptă doar un domeniu ce aparține bisericii (`<subDomain>.b1.church`, un rând din tabelul de domenii al modulului de conținut, sau o gazdă locală) înainte de a apela API-ul Stripe pentru domeniile metodelor de plată.

### Înregistrarea de către administrare și importul din Stripe (B1Admin)

Secțiunea de donații din B1Admin (`B1Admin/src/donations/`) este locul în care lucrează echipele financiare. Introducerea în lot (`components/BulkDonationEntry.tsx`) înregistrează darurile în numerar/cec/în natură trimițând `/giving/donations`, apoi `/giving/funddonations` — fără niciun gateway implicat. Fișa persoanei **Înregistrează un dar** (`components/LogGiftDialog.tsx`) face același lucru pentru un singur dar: mai întâi caută lotul a cărui `batchDate` corespunde datei darului sau creează unul denumit după acea dată (`POST /giving/donationbatches`), iar dacă un pas ulterior eșuează, șterge din nou donația/lotul nou creat. Fondurile, loturile, campaniile și extrasele corespund fiecare rutelor CRUD `/giving/*`; paginile de extrase (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) cer un an calendaristic cu `GET /donations?startDate=&endDate=` și `GET /fundDonations?startDate=&endDate=`, în loc de întregul istoric al bisericii, care ar putea depăși limita de dimensiune a răspunsului Lambda. Panoul de donare în stil membru (`B1Admin/src/donationComponents/`) reutilizează aceleași componente apphelper ca B1App.

Transferurile către contabilitate și raportare sunt lucru pe partea client sau al rulatorului de rapoarte, nu al gateway-ului: exportul QuickBooks de pe pagina lotului construiește un CSV de înregistrare contabilă din `donations` + `fundDonations` ale lotului (debit Undeposited Funds, un credit per fond); vizualizarea Lapsed Givers de pe pagina Summary rulează `Api/reports/lapsedGivers.json` prin rulatorul generic de rapoarte, cu numele persoanelor rezolvate de `ReportOutput`; iar formatele de chitanțe pentru țări (Canada / Australia / Noua Zeelandă) sunt setări ale bisericii din magazinul cheie/valoare al membership, randate de `GivingStatementDocument` și duplicate în pagina de tipărire din B1App. Paginile de tipărire ale extraselor din B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) transmit setarea `logoLight` a bisericii (prin `usePrintLogo` din `B1Admin/src/components/PrintChurchHeader.tsx`), astfel încât logoul se tipărește în partea de sus a fiecărui extras, și așteaptă încărcarea imaginii înainte de tipărirea automată.

### Starea lotului și permisiunea Introducere donații

Loturile pot fi închise, astfel încât un depozit numărat să rămână neschimbat. `POST /giving/donationbatches/:id/close` și `/:id/reopen` (doar Donations.Edit) sunt singurele care scriu `status`, `closedDate` și `closedBy` (`DonationBatchRepo.setStatus`); o salvare obișnuită a lotului nu le atinge niciodată, deci postarea unui lot nu îl poate redeschide. Accesul la scriere este centralizat în `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit poate modifica orice, în timp ce permisiunea mai restrânsă Donations.Enter (`GivingApi` / `Donations` / `Enter`, „Enter Donations” în editorul de roluri) poate crea loturi și poate salva sau șterge donații și împărțiri pe fonduri doar cât timp atât lotul actual al donației, cât și lotul țintă sunt deschise, și niciodată pentru un dar de gateway (unul cu `transactionId`). O scriere blocată returnează `403 { error: "This batch is closed." }`. Citirea loturilor acceptă Donations.ViewSummary sau Donations.Enter, astfel încât un casier să poată alege lotul în care introduce. Pe partea client, `B1Admin/src/donations/batchAccess.ts` oglindește aceste reguli (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), iar `Header` / `SecondaryMenuHelper` afișează **Donations > Batches** oricui poate vedea loturile, chiar fără View Summary.

### Conversia totalurilor în monede mixte

Orice endpoint care returnează un singur total combinat pentru darurile posibil în monede diferite — indicatorii KPI de sinteză ai donațiilor (`GivingKpiCards`), totalul unui lot de donații, totalul unui fond și totalurile anului curent/perioadei de pe ecranul de donare din B1App — convertește în moneda implicită a bisericii pe server, în loc să adune monede diferite. `Api/src/shared/helpers/ExchangeRateHelper.ts` preia cursurile de la `api.frankfurter.dev` pe baza monedei bisericii, le memorează în cache în proces timp de 12 ore și expune `convertTotals(rows, churchCurrency, rates)`: rândurile sunt pre-grupate pe monedă în SQL (câteva grupuri, niciodată o conversie per dar), fiecare grup este convertit și însumat, iar rezultatul poartă un indicator `isConverted`, pe care clientul îl folosește pentru a afișa nota „Convertit la cursurile de schimb actuale”. `GET /donations/exchange-rates` expune tabelul de cursuri pentru clienții care au nevoie de el (ecranul de donare din B1App); cursurile în sine nu sunt acceptate niciodată dintr-o cerere, ci sunt preluate doar pe server, astfel încât un client nu poate influența un total raportat. Înregistrările individuale de donații și rapoartele istorice/în moneda originală nu sunt convertite niciodată — se convertesc doar totalurile combinate.

Importul din Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) completează darurile făcute în afara B1: apelează `POST /giving/donate/replay-stripe-events` cu `dryRun: true` pentru o previzualizare, apoi cu `dryRun: false` pentru import. Serverul listează evenimentele Stripe pentru intervalul de date și sare peste orice este deja înregistrat — potrivite mai întâi după ID-ul furnizorului din `eventLogs`, apoi după ID-ul tranzacției, apoi prin `DonationRepo.findMatchingDonation` (sumă + dată + persoană), astfel încât o reluare să nu importe niciodată dublu. Evenimentele `charge.succeeded` / `payment_intent.succeeded` ale abonamentelor sunt sărite, deoarece `invoice.paid` înregistrează acele daruri; versiunile mai noi ale API-ului Stripe elimină `PaymentIntent.invoice`, deci sărirea se bazează și pe descrierea „Subscription …”.

## Webhook-uri și reconciliere

Plățile decontate și schimbările de stare ale abonamentelor ajung la `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Procesarea este intenționat idempotentă:

1. **Verificare** — `GatewayService.verifyWebhook` delegă verificarea semnăturii către furnizor; o semnătură nevalidă returnează 401. Evenimentele care nu necesită procesare se opresc devreme cu 200.
2. **Deduplicarea evenimentului** — `EventLogRepo.loadByProviderId` sare peste un webhook deja înregistrat în `eventLogs`.
3. **Deduplicarea donației** — înainte de a crea ceva, `DonationRepo.loadByTransactionId` este verificat pentru fiecare ID candidat pe care l-ar putea conține payload-ul. Aceasta absoarbe livrările duplicate, evenimentele ACH în mai multe etape (în așteptare → decontat) și cazul în care `/donate/charge` a înregistrat deja darul optimist.
4. **Aplicare** — `classifyWebhookEvent(eventType)` al furnizorului spune ce înseamnă evenimentul (`donation` în așteptare/complet, `cancel-subscription` sau `ignore`); plățile finalizate creează o donație `complete` (sau promovează una existentă `pending` ori `failed`), evenimentele de tip ACH ajung ca `pending` până la decontare, o factură de abonament eșuată (`invoice.payment_failed` de la Stripe) creează o donație `failed` identificată prin ID-ul facturii, iar evenimentele de anulare șterg rândul local din `subscriptions`. Controllerul nu inspectează niciodată numele evenimentelor specifice unui furnizor.

### Daruri recurente eșuate și dunning

O donație `failed` este unitatea de lucru pentru recuperare. `GET /giving/donations/failed` le listează împreună cu cel mai recent mesaj de eșec al gateway-ului din `eventLogs` și cu un indicator `canRetry` din capabilitățile gateway-ului; `POST /giving/donate/retry/:donationId` apelează `retryFailedPayment` al furnizorului (Stripe plătește factura deschisă), iar webhook-ul rezultat promovează rândul la `complete` prin calea normală de deduplicare. Emailurile de dunning merg către donator din handler-ul webhook-ului în ziua 0, apoi din `DunningHelper.run` din temporizatorul de la miezul nopții (conectat atât în `lambda/timer-handler.ts`, cât și în `RailwayCron.ts`) la 3 și 7 zile; fiecare trimitere este înregistrată în `eventLogs` ca `provider: "dunning"`, `providerId: "<donationId>:<day>"`, astfel încât o rerulare să nu trimită niciodată un email dublu. Când Stripe renunță și anulează abonamentul (`customer.subscription.deleted` cu `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` trimite donatorului un email o singură dată (`providerId: "<subscriptionId>:canceled"`); anulările inițiate de donator sau de administrator rămân fără notificare. Stripe nu adaugă niciodată evenimente la un endpoint existent: după ce modifici `StripeHelper.webhookEvents`, fie salvezi din nou gateway-ul, fie rulezi `tools/manual/stripe-webhook-events.ts` (implicit în mod dry run, `--apply` pentru a scrie) pe producție.

Furnizorii cu `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) au încasările înregistrate din răspunsul `/charge` (nu este necesară o rundă de webhook pentru scenariul normal), în timp ce Stripe se bazează pe `payment_intent.succeeded` / `invoice.paid` și pe `payment_intent.processing` pentru ACH. Gestionarea comisioanelor (`POST /giving/donate/fee`, indicatorul de gateway `payFees` și `calculateFees` al fiecărui furnizor) calculează majorarea brută „acoperă comisioanele” pe partea donatorului — B1 nu ia niciun procent al platformei, deci nu se adaugă niciodată un comision de aplicație.

:::info
Calea de încasare și cea a webhook-ului scriu aceleași rânduri `donations` / `fundDonations`. `transactionId` este cheia de legătură care împiedică un jurnal de încasare optimist și webhook-ul ulterior al acestuia să producă două donații pentru același dar.
:::

## Pagini conexe

- [Endpoint-uri Giving](../api/endpoints/giving.md) — suprafața REST completă pentru donații, fonduri, loturi, gateway-uri, abonamente, metode de plată și webhook-uri
- [AppHelper](../shared-libraries/app-helper.md) — pachetul npm care livrează registrul furnizorilor de plăți și componentele de donații
- [Structura modulelor](../api/module-structure.md) — modul în care este organizat modulul GivingApi pe server
