---
title: "Architektura darowizn"
description: "Przewodnik dla deweloperów po darach ChurchApps: jak B1 Admin i B1.church wysyłają darowizny przez bramki Stripe, PayPal, Kingdom Funding lub Paystack."
---

# Architektura darowizn

<div class="article-intro">

ChurchApps obsługuje darowizny w modelu gateway-rail: kościół zachowuje własne konto Stripe (lub PayPal, Kingdom Funding albo Paystack), a B1 nigdy nie znajduje się w ścieżce płatności jako platforma przetwarzająca. Dane karty są tokenizowane w przeglądarce i nigdy nie trafiają na serwer ChurchApps. Ta strona opisuje cały stos: rejestr dostawców płatności po stronie klienta w `@churchapps/apphelper`, abstrakcję bramki GivingApi, model danych darowizn oraz sposób, w jaki webhooki bramek są uzgadniane z bazą danych.

</div>

## Przegląd

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

Trzy zasady obowiązują w całym stosie:

1. **Bramka przechowuje kartę.** Widżet wprowadzania danych każdego dostawcy tokenizuje dane w przeglądarce; API otrzymuje wyłącznie token, nonce lub identyfikator zamówienia.
2. **Jedna abstrakcja, wielu dostawców.** Przeglądarka pobiera `PaymentProvider` z rejestru; serwer pobiera `IGatewayProvider` z fabryki. Obie strony korzystają z tej samej znormalizowanej nazwy dostawcy zapisanej w rekordzie bramki.
3. **Webhooki są źródłem prawdy o rozliczeniu.** Odpowiedź na obciążenie jest zapisywana optymistycznie, ale to podpisany webhook bramki potwierdza (lub tworzy) zakończoną darowiznę; po obu stronach działają zabezpieczenia idempotentności.

## Po stronie klienta: rejestr dostawców płatności (`@churchapps/apphelper`)

Rejestr znajduje się w `Packages/apphelper/src/donations/providers/`, a widżety i funkcje pomocnicze każdego dostawcy są w jego własnym podfolderze (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Nic poza `providers/` nie rozgałęzia się na podstawie nazwy dostawcy.

`PaymentProvider` (zob. `providers/types.ts`) zawiera wszystko, czego aplikacja hosta potrzebuje do obsługi jednej bramki: `descriptor` (etykiety dla administratora, obsługiwane waluty, pola opłat, domyślne stawki opłat, adresy URL panelu i rejestracji), zestaw flag `capabilities` (zapisane karty, ACH, płatności cykliczne, wprowadzanie nowej karty w formularzu, automatyczne zapisywanie przy tokenizacji), widżety React do wprowadzania danych przez członków (`MemberWrapper`/`MemberEntry`), darowizny gości (`GuestForm`), edycję zapisanych metod (`MethodEditForm`) oraz płatności w formularzach (`FormPayment`), a także `buildChargeRequest(ctx, token)`, czyli jedyne miejsce, w którym kształt ładunku obciążenia różni się w zależności od dostawcy. `MemberWrapper` każdego dostawcy ładuje własny SDK na podstawie klucza publicznego z rekordu bramki, dzięki czemu aplikacje hosta nigdy nie importują SDK bramki (B1App i B1Admin nie mają zależności `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralizuje wybór bramki kościoła, której dana powierzchnia ma używać.

`providers/registry.ts` zawiera wbudowanych dostawców. Są oni **przekazywani przez wartość**, a nie rejestrowani przez efekt uboczny modułu, dzięki czemu tree-shaking bundlera nigdy nie może usunąć rejestracji:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Funkcja | Przeznaczenie |
|----------|---------|
| `getPaymentProvider(name)` | Pobiera dostawcę po znormalizowanej nazwie; w razie braku wraca do Stripe, aby źle skonfigurowany dostawca nigdy nie powodował awarii formularza darczyńcy |
| `registerPaymentProvider(p)` | Rejestruje dodatkowego dostawcę w czasie działania (dla niestandardowej bramki aplikacji hosta) |
| `listPaymentProviders()` | Wylicza wbudowanych i niestandardowych dostawców; używane do zbudowania listy rozwijanej bramek w panelu administracyjnym |
| `hasPaymentProvider(name)` | Sprawdza, czy dostawca jest zarejestrowany |

**Wbudowani dostawcy po stronie klienta: Stripe, PayPal, Kingdom Funding, Paystack.** B1App i B1Admin jedynie *odczytują* rejestr (`getPaymentProvider`, `listPaymentProviders`); żadna z nich nie wywołuje `registerPaymentProvider`. Rejestracja pozostaje wewnątrz apphelper.

Każdy dostawca tokenizuje inaczej, ale wszyscy trzymają kartę poza B1:

| Dostawca | Widżet wprowadzania danych | Token zwracany do API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; formularz gościa montuje też `ExpressCheckoutElement` (Apple Pay / Google Pay, jednorazowe darowizny), którego `onConfirm` zwraca ten sam identyfikator `pm_…` | identyfikator metody płatności (`pm_…`); bank przez `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` dla bramek w USD, kanadyjski PAD `acss_debit` (modal z mandatem hostowanym, mandat `default_for` faktur/subskrypcji, jednorazowe obciążenia przekazują identyfikator mandatu) dla bramek w CAD |
| Kingdom Funding | Hostowany formularz tokenizacji powiązany z kluczem publicznym bramki | jednorazowy nonce |
| PayPal | PayPal Hosted Fields (karta, płatności cykliczne) oraz PayPal Smart Buttons z finansowaniem Venmo (jednorazowo); oba korzystają z jednego ładowania SDK, a zamówienie po stronie serwera tworzone jest przez `/donate/client-token` + `/donate/create-order` | przechwycony identyfikator zamówienia |
| Paystack | Wyskakujące okno Paystack Inline (`js.paystack.co/v2/inline.js`); samo okno przyjmuje płatność (karta, mobile money, przelew bankowy, USSD) | referencja opłaconej transakcji; zapisane metody to kody autoryzacji Paystack `AUTH_…` |

Metoda `finalizeResult` w Stripe uruchamia 3-D Secure / SCA w przeglądarce (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`), zanim darowizna zostanie uznana za zakończoną. Wspólny formularz jedynie wywołuje `provider.finalizeResult(result)`, bez wiedzy o tym, co ta metoda robi.

## Po stronie serwera: abstrakcja bramki (GivingApi)

Moduł `/giving` (`Api/src/modules/giving`) udostępnia powierzchnię REST; infrastruktura bramek znajduje się w `Api/src/shared/helpers`. `DonateController` nigdy nie komunikuje się bezpośrednio z SDK bramki. Korzysta z `GatewayService`, który pobiera właściwy `IGatewayProvider` z `GatewayFactory` i przekazuje mu odszyfrowany `GatewayConfig`.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) to kontrakt, który implementuje każda bramka: cykl życia webhooka (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), płatności (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), opłaty (`calculateFees`), obsługę zapisanych metod (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) oraz opcjonalne dodatki (klienci, zamówienia, SetupIntents, ponowne odtwarzanie zdarzeń, `retryFailedPayment` dla nieudanej faktury subskrypcji oraz `registerPaymentMethodDomain` do weryfikacji domeny Apple Pay). Dostawca, który pomija opcjonalny hook, jest raportowany jako nieobsługujący danej czynności, a interfejs ukrywa odpowiednią kontrolkę. Każda klasa dostawcy deklaruje własną macierz `capabilities` (obsługiwane waluty, ACH, zwroty, wymagania subskrypcji, limity transakcji). `GatewayService.getProviderCapabilities(provider)` jedynie ją odczytuje. Flagi takie jak `logsDonationsImmediately` sterują zachowaniem kontrolerów bez warunków zależnych od nazwy dostawcy.

**Dostawcy po stronie serwera zarejestrowani w `GatewayFactory`:**

| Dostawca | Dostępność |
|----------|-------------|
| Stripe | Zawsze włączony |
| PayPal | Zawsze włączony |
| Kingdom Funding | Zawsze włączony |
| Paystack | Zawsze włączony (sprzedawcy z Nigerii, Ghany, Republiki Południowej Afryki, Kenii i Wybrzeża Kości Słoniowej; waluty NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opcjonalnie, za pomocą flagi środowiskowej `ENABLE_SQUARE` |
| ePayMints | Opcjonalnie, za pomocą flagi środowiskowej `ENABLE_EPAYMINTS` |

Paystack różni się od pozostałych tym, że pieniądze przepływają, zanim w proces zaangażowane zostanie GivingApi. Okno płatności obciąża darczyńcę, `processCharge` to `GET /transaction/verify/:reference`, którego opłacona kwota i waluta muszą odpowiadać rejestrowanej darowiźnie (referencja już zapisana nigdy nie jest rejestrowana dwukrotnie), a pierwsza darowizna z harmonogramu cyklicznego jest rejestrowana w `finalizeSubscription` (weryfikacja → `POST /plan` → `POST /subscription` z `start_date` ustawioną o jeden interwał w przód). Webhooki są podpisywane samym kluczem tajnym (`x-paystack-signature`, HMAC-SHA512 surowego ciała). Paystack nie ma API do zarządzania webhookami, więc ekran administracyjny pokazuje adres URL, który kościół wkleja do swojego panelu. Zdarzenia odnowienia `charge.success` nie zawierają podziału na fundusze; dostawca odzyskuje go z lokalnych wierszy `subscriptions`/`subscriptionFunds` darczyńcy. Tylko autoryzacje kartą są `reusable`. Darowizny mobile money są jednorazowe, więc `createSubscription` je odrzuca. Dane demonstracyjne zawierają drugi kościół (Accra Community Church, `CHU00000002`) na bramce Paystack w trybie testowym GHS, aby pakiet testów Playwright dla Paystack działał obok pakietu dla Grace opartego na Stripe.

Niestandardowi dostawcy mogą być rejestrowani w czasie działania, gdy ustawiona jest zmienna `ENABLE_CUSTOM_GATEWAY_PROVIDERS`; `AbstractExperimentalGatewayProvider` jest dla nich klasą bazową. Nazwy dostawców są dopasowywane bez rozróżniania wielkości liter.

### Konfiguracja bramki i sekrety

Administrator zapisuje dane uwierzytelniające bramki przez `POST /giving/gateways` (`GatewayController`). Podczas zapisu kontroler szyfruje klucz prywatny i klucz webhooka za pomocą `EncryptionHelper` przed zapisem, a następnie, na każdym hoście innym niż localhost, usuwa istniejący webhook kościoła i tworzy nowy, wskazujący na `/giving/donate/webhook/{provider}?churchId=…`. Kościół ma jeden wiersz na dostawcę: zapisanie bramki zastępuje wyłącznie istniejący wiersz dla tego samego dostawcy. Publiczne odczyty (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) zwracają wyłącznie klucze publiczne.

## Model danych

Schemat giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modele w `models/`) to schemat MySQL, dostępny przez Kysely:

| Tabela | Rola |
|-------|------|
| `gateways` | Konfiguracja dostawcy dla kościoła: `provider`, `publicKey`, zaszyfrowane `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Przeznaczenia darowizn (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Grupowanie wpisów i raportów (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Jedna darowizna: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; zestawienia, sumy, pulpity i raporty darowizn uwzględniają wyłącznie `complete` lub null), `transactionId` |
| `fundDonations` | Podział darowizny na jeden lub więcej funduszy (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Darowizna cykliczna; `id` to identyfikator subskrypcji w bramce, powiązany z `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Podział na fundusze dla darowizny cyklicznej |
| `customers` | Łączy `personId` z identyfikatorem klienta w bramce, osobno dla każdego `provider` |
| `gatewayPaymentMethods` | Zapisane karty/konta bankowe: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Ścieżka audytu webhooków/zdarzeń i klucz deduplikacji (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Kampanie zobowiązań powiązane z funduszem oraz kwota zobowiązania każdej osoby |

Darowizna jest dzielona na fundusze za pośrednictwem `fundDonations`: darowizna przechowuje sumę, a każdy `fundDonation` przechowuje jej część. `donations.currency` i `gateways.currency` zawierają kod waluty ISO. Każdy dostawca ogłasza swoje `supportedCurrencies`, a kwoty są formatowane za pomocą `CurrencyHelper.formatCurrencyWithLocale`.

## Przepływy end-to-end

### Darowizny jednorazowe i cykliczne członków (B1App)

Ekran darowizn dla zalogowanych użytkowników (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) składa się z trzech komponentów apphelper: `MultiGatewayDonationForm`, `PaymentMethods` i `RecurringDonations`. B1App obsługuje otaczające ładowanie danych (`GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`) i przekazuje listę bramek dalej. Rozpoznany dostawca ładuje własny SDK z klucza publicznego bramki. Samo obciążenie odbywa się wewnątrz apphelper: rozpoznany dostawca tokenizuje (nową lub zapisaną) metodę, a następnie wysyła żądanie do `/giving/donate/charge` dla darowizny jednorazowej lub do `/giving/donate/subscribe` dla cyklicznej. Oba punkty końcowe przypisują zalogowanego darczyńcę do jego własnego `personId` (tylko posiadacze `donations.edit` mogą przypisać darowiznę komuś innemu) i odrzucają podziały na fundusze, których suma przekracza obciążoną kwotę. Darowizny cykliczne tworzą wiersz `subscriptions` oraz `subscriptionFunds` i przekazują harmonogram bramce (Stripe Subscriptions, PayPal Billing Plans lub cykliczny harmonogram KF).

### Darowizny gości / anonimowe

Publiczna strona darowizn (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) oraz panel „daj teraz” renderują `NonAuthDonationWrapper` z `@churchapps/apphelper/website`, który wstrzykuje reCAPTCHA i kontekst Elements bramki wokół `GuestForm` dostawcy. Goście nie logują się, nie mają zapisanych metod i nie mają historii. Przepływ pobiera `GET /giving/funds/churchId/:id` i `GET /giving/donate/gateways/:churchId` (tylko klucze publiczne), weryfikuje odwiedzającego przez `POST /giving/donate/captcha-verify`, tokenizuje w przeglądarce i wysyła żądanie do `/giving/donate/charge` (lub `/subscribe`). Wywołanie weryfikacji zwraca podpisany HMAC `captchaPass` ważny 10 minut (`Api/src/modules/giving/helpers/CaptchaPass.ts`), który formularz wysyła przy każdym żądaniu płatniczym gościa. Przy `CAPTCHA_ENFORCE=true` API odrzuca wywołania gościa `create-order`, `charge`, `subscribe`, `addcard` i `ach-setup-intent-anon` bez ważnego przepustu dla danego kościoła. Płatne rejestracje gości na wydarzenia (`POST /content/registrations/register`) sprawdzają ten sam przepust tuż przed obciążeniem; zob. [Rejestracje na wydarzenia](./registrations.md#payment-flow). Przelew ACH dla gości korzysta z anonimowego `POST /giving/paymentmethods/ach-setup-intent-anon`, który dopuszcza wyłącznie natychmiastową weryfikację (Financial Connections). Sprawdzenie mikrowpłatą kończy się po kilku dniach, już po opuszczeniu strony przez gościa, więc nigdy nie mogłoby zakończyć darowizny. Formularz odmawia obciążenia niezweryfikowanego SetupIntent i kieruje darczyńcę do karty lub do konfiguracji konta bankowego po zalogowaniu.

Trzy opcje formularza gościa korzystają z tego samego wywołania obciążenia. `?fundId=` i `?amount=` w adresie URL darowizny wstępnie wybierają podział na fundusze (odczytywane przez formularz gościa każdego dostawcy przy montowaniu i kierowane przez zwykłą obsługę zmiany funduszu, aby sumy i opłaty się aktualizowały). `anonymous: true` powoduje, że `DonateController.charge` odrzuca wszelką osobę przesłaną przez klienta i rejestruje darowiznę z `personId = null`. Formularz gościa pomija `/people/loadOrCreate` oraz krok klienta/sejfu, a trzej dostawcy rejestrujący natychmiast przestają ustalać osobę na podstawie klienta bramki. Apple Pay wymaga zarejestrowania domeny strony w Stripe, dlatego formularz gościa Stripe wysyła raz na sesję żądanie do publicznego, ograniczonego liczbą wywołań `POST /giving/donate/register-domain`. Endpoint ten akceptuje wyłącznie domenę należącą do kościoła (`<subDomain>.b1.church`, wiersz w tabeli domen modułu treści lub host lokalny), zanim wywoła API domen metod płatności Stripe.

### Rejestrowanie przez administratorów i import ze Stripe (B1Admin)

Sekcja darowizn w B1Admin (`B1Admin/src/donations/`) to miejsce pracy zespołów finansowych. Wprowadzanie zbiorcze (`components/BulkDonationEntry.tsx`) rejestruje darowizny gotówkowe, czekowe i rzeczowe przez wysłanie `/giving/donations`, a następnie `/giving/funddonations`, bez udziału bramki. Okno **Zarejestruj darowiznę** w karcie osoby (`components/LogGiftDialog.tsx`) robi to samo dla pojedynczej darowizny: najpierw szuka partii, której `batchDate` odpowiada dacie darowizny, lub tworzy nową o nazwie od tej daty (`POST /giving/donationbatches`). Jeśli późniejszy krok się nie powiedzie, ponownie usuwa darowiznę i nowo utworzoną partię. Fundusze, partie, kampanie i zestawienia mapują się na swoje trasy CRUD `/giving/*`. Strony zestawień darowizn (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) żądają jednego roku kalendarzowego przez `GET /donations?startDate=&endDate=` i `GET /fundDonations?startDate=&endDate=`, a nie pełnej historii kościoła, która mogłaby przekroczyć limit rozmiaru odpowiedzi Lambda. Panel darowizny w stylu członka (`B1Admin/src/donationComponents/`) ponownie wykorzystuje te same komponenty apphelper co B1App.

Raportowanie i przekazywanie danych księgowych odbywają się po stronie klienta lub w module raportów, a nie w bramce. Eksport QuickBooks na stronie partii buduje plik CSV z zapisem księgowym z `donations` + `fundDonations` partii (debet: Undeposited Funds, jeden kredyt na fundusz). Widok Dawni darczyńcy (Lapsed Givers) na stronie Podsumowanie uruchamia `Api/reports/lapsedGivers.json` przez ogólny moduł raportów, z nazwami osób rozwiązywanymi przez `ReportOutput`. Formaty pokwitowań krajowych (Kanada / Australia / Nowa Zelandia) to ustawienia kościoła w magazynie klucz/wartość członkostwa, renderowane przez `GivingStatementDocument` i zduplikowane na stronie wydruku B1App. Strony wydruku zestawień w B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) przekazują ustawienie `logoLight` kościoła (przez `usePrintLogo` w `B1Admin/src/components/PrintChurchHeader.tsx`), aby logo drukowało się u góry każdego zestawienia, i czekają na załadowanie obrazu przed automatycznym drukowaniem.

### Status partii i uprawnienie Enter Donations

Partie można zamknąć, aby policzony depozyt pozostał niezmieniony. `POST /giving/donationbatches/:id/close` i `/:id/reopen` (tylko Donations.Edit) są jedynymi zapisującymi `status`, `closedDate` i `closedBy` (`DonationBatchRepo.setStatus`). Zwykły zapis partii nigdy ich nie dotyka, więc zapisanie partii nie może jej ponownie otworzyć. Dostęp do zapisu jest scentralizowany w `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit może zmieniać wszystko, natomiast węższe uprawnienie Donations.Enter (`GivingApi` / `Donations` / `Enter`, „Enter Donations” w edytorze ról) może tworzyć partie oraz zapisywać lub usuwać darowizny i podziały na fundusze wyłącznie wtedy, gdy zarówno bieżąca partia darowizny, jak i docelowa partia są otwarte. Nigdy nie dotyczy to darowizny z bramki (takiej, która ma `transactionId`). Zablokowany zapis zwraca `403 { error: "This batch is closed." }`. Odczyt partii akceptuje Donations.ViewSummary lub Donations.Enter, aby osoba liczącą mogła wybrać partię, do której wpisuje. Po stronie klienta `B1Admin/src/donations/batchAccess.ts` odzwierciedla te zasady (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), a `Header` / `SecondaryMenuHelper` pokazują **Donations > Batches** każdemu, kto może widzieć partie, nawet bez View Summary.

### Przeliczanie sum w różnych walutach

Każdy punkt końcowy zwracający pojedynczą łączną sumę z darowizn, które mogą być w różnych walutach (wskaźniki KPI podsumowania darowizn (`GivingKpiCards`), suma partii darowizn, suma funduszu oraz sumy od początku roku lub za okres na ekranie darowizn B1App), przelicza kwoty na domyślną walutę kościoła po stronie serwera, zamiast sumować różne waluty. `Api/src/shared/helpers/ExchangeRateHelper.ts` pobiera kursy z `api.frankfurter.dev` według waluty kościoła, przechowuje je w pamięci procesu przez 12 godzin i udostępnia `convertTotals(rows, churchCurrency, rates)`. Wiersze są wstępnie grupowane według waluty w SQL (kilka grup, nigdy przeliczenie dla każdej darowizny), każda grupa jest przeliczana i sumowana, a wynik zawiera flagę `isConverted`, którą klient wykorzystuje do wyświetlenia informacji „Przeliczono według bieżących kursów wymiany”. `GET /donations/exchange-rates` udostępnia tabelę kursów klientom, którzy jej potrzebują (ekran darowizn B1App). Same kursy nigdy nie są przyjmowane z żądania, a jedynie pobierane po stronie serwera, więc klient nie może wpłynąć na raportowaną sumę. Pojedyncze rekordy darowizn oraz raporty historyczne lub w walucie oryginalnej nigdy nie są przeliczane. Przeliczane są wyłącznie sumy łączne.

Import ze Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) uzupełnia darowizny dokonane poza B1: wywołuje `POST /giving/donate/replay-stripe-events` z `dryRun: true` w celu podglądu, a następnie z `dryRun: false`, aby zaimportować. Serwer wypisuje zdarzenia Stripe z zakresu dat i pomija wszystko, co już zostało zarejestrowane. Najpierw dopasowuje po identyfikatorze dostawcy w `eventLogs`, następnie po identyfikatorze transakcji, a potem przez `DonationRepo.findMatchingDonation` (kwota + data + osoba), tak aby ponowne uruchomienie nigdy nie importowało dwukrotnie. Zdarzenia `charge.succeeded` / `payment_intent.succeeded` subskrypcji są pomijane, ponieważ te darowizny rejestruje `invoice.paid`. Nowsze wersje API Stripe usuwają `PaymentIntent.invoice`, więc pominięcie opiera się również na opisie „Subscription …”.

## Webhooki i uzgadnianie

Rozliczone płatności i zmiany stanu subskrypcji docierają pod adres `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Przetwarzanie jest celowo idempotentne:

1. **Weryfikacja**: `GatewayService.verifyWebhook` deleguje do sprawdzenia podpisu dostawcy; nieprawidłowy podpis zwraca 401. Zdarzenia, które nie wymagają przetwarzania, są natychmiast kończone odpowiedzią 200.
2. **Deduplikacja zdarzenia**: `EventLogRepo.loadByProviderId` pomija webhook, który jest już zapisany w `eventLogs`.
3. **Deduplikacja darowizny**: przed utworzeniem czegokolwiek `DonationRepo.loadByTransactionId` jest sprawdzane pod kątem każdego możliwego identyfikatora, który może zawierać ładunek. Mechanizm ten obsługuje duplikaty dostaw, wieloetapowe zdarzenia ACH (oczekujące → rozliczone) oraz sytuację, w której `/donate/charge` już zarejestrowało darowiznę optymistycznie.
4. **Zastosowanie**: metoda `classifyWebhookEvent(eventType)` dostawcy określa, co oznacza zdarzenie (`donation` pending/complete, `cancel-subscription` lub `ignore`). Zakończone płatności tworzą darowiznę `complete` (lub awansują istniejącą `pending` albo `failed`), zdarzenia w stylu ACH trafiają jako `pending` do czasu rozliczenia, nieudana faktura subskrypcji (Stripe `invoice.payment_failed`) tworzy darowiznę `failed` powiązaną z identyfikatorem faktury, a zdarzenia anulowania usuwają lokalny wiersz `subscriptions`. Kontroler nigdy nie sprawdza nazw zdarzeń specyficznych dla dostawcy.

### Nieudane darowizny cykliczne i przypomnienia o płatności (dunning)

Darowizna `failed` jest jednostką pracy przy odzyskiwaniu. `GET /giving/donations/failed` wypisuje je wraz z najnowszym komunikatem o błędzie bramki z `eventLogs` oraz flagą `canRetry` z możliwości bramki. `POST /giving/donate/retry/:donationId` wywołuje `retryFailedPayment` dostawcy (Stripe opłaca otwartą fakturę), a powstały webhook awansuje wiersz do `complete` przez zwykłą ścieżkę deduplikacji. E-maile przypominające o nieudanej płatności (dunning) są wysyłane do darczyńcy przez obsługę webhooka w dniu 0, a następnie przez `DunningHelper.run` w timerze północnym (podłączonym zarówno w `lambda/timer-handler.ts`, jak i w `RailwayCron.ts`) po 3 i 7 dniach. Każde wysłanie jest zapisywane w `eventLogs` jako `provider: "dunning"`, `providerId: "<donationId>:<day>"`, dzięki czemu ponowne uruchomienie nigdy nie wysyła e-maila dwukrotnie. Gdy Stripe rezygnuje i anuluje subskrypcję (`customer.subscription.deleted` z `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` wysyła darczyńcy jeden e-mail (`providerId: "<subscriptionId>:canceled"`). Anulowania zainicjowane przez darczyńcę lub administratora pozostająciche. Stripe nigdy nie dodaje zdarzeń do istniejącego punktu końcowego: po zmianie `StripeHelper.webhookEvents` należy albo ponownie zapisać bramkę, albo uruchomić `tools/manual/stripe-webhook-events.ts` (domyślnie próbne uruchomienie, `--apply` do zapisu) na środowisku produkcyjnym.

Dostawcy z `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) mają obciążenia rejestrowane na podstawie odpowiedzi `/charge` (w szczęśliwym przebiegu nie jest wymagany obieg przez webhook), natomiast Stripe polega na `payment_intent.succeeded` / `invoice.paid` oraz na ACH `payment_intent.processing`. Obsługa opłat (`POST /giving/donate/fee`, flaga bramki `payFees` i `calculateFees` każdego dostawcy) oblicza po stronie darczyńcy kwotę brutto potrzebną do „pokrycia opłat”. B1 nie pobiera żadnej prowizji platformy, więc nigdy nie jest dodawana opłata aplikacyjna.

:::info
Ścieżki obciążenia i webhooka zapisują te same wiersze `donations` / `fundDonations`. `transactionId` jest kluczem łączenia, który nie dopuszcza, aby optymistyczny zapis obciążenia i późniejszy webhook utworzyły dwie darowizny dla jednej płatności.
:::

## Powiązane strony

- [Punkty końcowe modułu darowizn](../api/endpoints/giving.md): pełna powierzchnia REST dla darowizn, funduszy, partii, bramek, subskrypcji, metod płatności i webhooków
- [AppHelper](../shared-libraries/app-helper.md): pakiet npm, który dostarcza rejestr dostawców płatności i komponenty darowizn
- [Struktura modułów](../api/module-structure.md): jak moduł GivingApi jest zorganizowany po stronie serwera
