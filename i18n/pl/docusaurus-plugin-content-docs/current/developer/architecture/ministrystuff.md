# MinistryStuff (płatna pamięć i SMS-y)

MinistryStuff.org to oddzielna płatna usługa, która finansuje dwie rzeczy, których ChurchApps nie może udostępnić za darmo: masowe przechowywanie plików (1 TB i więcej) oraz kredyty SMS. Oferowane są w formie stałych miesięcznych subskrypcji. ChurchApps pozostaje w 100% bezpłatny. Nic w B1 nie wymaga subskrypcji MinistryStuff, a każdy punkt integracji to interfejs dostawcy, który mogłaby zaimplementować także inna firma.

## Komponenty

| Element | Repozytorium | Rola |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 w dev) | Rozliczenia (Stripe), wysyłka SMS i ewidencja kredytów (AWS End User Messaging), przechowywanie (S3 + rozliczanie limitu). Jedna baza MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 w dev) | ministrystuff.org: strona marketingowa, cennik i portal konta (plany, zużycie, przekierowania do Stripe Checkout i Customer Portal). |
| Dostawca SMS | `Packages/texting` → `MinistryStuffProvider` | Zarejestrowany jako `ministrystuff` obok Clearstream i TextInChurch. |
| Punkt integracji pamięci | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (domyślny, bezpłatny) opakowuje oryginalny przełącznik S3/dysk. `FileStorageHelper` deleguje do domyślnego dostawcy bez zmian. |
| Konfiguracja Api | moduły `Api/` content i messaging | `MinistryStuffStorageProvider` oraz `StorageResolver` (content), wstrzykiwanie klucza serwisowego w `TextingConfigHelper` (messaging), tabela `storageProviders`, endpointy `/content/storage/*` i `/messaging/texting/credits`. |

## Tożsamość i zaufanie

- Te same konta, te same kościoły: MinistryStuffApi weryfikuje tokeny JWT ChurchApps wspólnym `JWT_SECRET` (wzorzec aplikacji siostrzanych, jak B1Transfer). Portal loguje się przez MembershipApi i akceptuje przekazanie `?jwt=`.
- Komunikacja serwer-serwer (główne Api → MinistryStuffApi): nagłówek `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, po obu stronach) oraz jawny `churchId`. Uprawnienia są zawsze sprawdzane względem subskrypcji danego kościoła. Kościoły nigdy nie przechowują danych uwierzytelniających MinistryStuff. Wystarczy wybrać dostawcę w B1Admin.

## Przepływ wysyłki SMS

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → liczba segmentów jest odejmowana od `smsCreditGrants` bieżącego okresu rozliczeniowego → AWS End User Messaging (lub `smsMode: mock` w dev).

Kredyty działają jako **twarde ograniczenie**: po ich wyczerpaniu wiadomość jest odrzucana w całości (`insufficient_credits`, w B1Admin wyświetlane jako przyjazna zachęta do aktualizacji planu). Nigdy nie ma częściowych wysyłek ani opłat za nadwyżkę. Przyznania kredytów są wydawane idempotentnie dla każdego okresu rozliczeniowego na podstawie webhooków Stripe `invoice.paid`. Rezygnacje z SMS-ów (`smsOptOuts`) są filtrowane przed każdą wysyłką.

Inne ścieżki docierają do tego samego dostawcy bez przechodzenia przez `TextingController`: alerty meldowania (`CheckinController` → `MessagingModuleGateway.sendBulkText`) oraz akcja kroku przepływu pracy **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, która zapisuje wiersze `sentTexts` i `deliveryLogs` z pustym nadawcą). Pola scalania (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) są rozwiązywane dla każdego odbiorcy przez `MergeFieldHelper.resolve`, a wynik jest ograniczony do 1600 znaków. W `TextingController` wiadomość grupowa zawierająca `{{` jest wysyłana jako osobne `sendMessage` dla każdego odbiorcy zamiast jednego `sendBulk`. Wiadomość bez znaczników nadal idzie jako jedna wysyłka zbiorcza.

## Przepływ przechowywania

Dostawca przypisany do kościoła (wiersz w `content.storageProviders`, zarządzany w B1Admin → Settings → File Storage) wskazuje, dokąd trafiają **nowe** przesyłane pliki. `contentPath` to bezwzględny adres URL pliku, więc różni dostawcy mogą współistnieć bez migracji: stare pliki nadal są serwowane z `content.churchapps.org`, a nowe z `content.ministrystuff.org`. Przesyłanie przebiega w kolejności Api → `StorageResolver.forChurch` → `store`/`getUploadUrl` dostawcy (presigned POST z `content-length-range` w trybie S3; awaryjne base64 w trybie dysk/dev). Usuwanie jest kierowane według zapisanego URL (`StorageResolver.forUrl`). Limit to liczba bajtów planu, liczona z `storageObjects` (rezerwacje `stored` i `pending`). Po jego przekroczeniu nowe przesyłanie jest blokowane (`storage_quota_exceeded`). Nic nigdy nie jest usuwane ani dodatkowo naliczane. Darmowy poziom ChurchApps pozostaje bez zmian: te same limity co wcześniej, bez limitu na cały kościół.

Uwaga o zakresie: wybór dostawcy obejmuje przepływ **plików i zasobów** w treściach, czyli miejsce, gdzie przechowywane są duże media. Przesyłanie galerii, logo i zdjęć pozostaje u domyślnego dostawcy. Pobierają one klucze z pamięci i budują adresy URL po stronie klienta, więc przypisywanie do kościoła na razie nie ma tu zastosowania.

Ten sam punkt integracji obsługuje również [Własny magazyn (Bring-Your-Own Storage)](./byos-storage.md): kościoły mogą podłączyć Dysk Google, Dropbox, OneDrive lub własny kubełek zgodny z S3 zamiast planu MinistryStuff.

## Rozliczenia

Stripe Checkout (hostowany) służy do zakupu subskrypcji, a Stripe Customer Portal do zmiany karty, anulowania i przeglądania faktur. MinistryStuffWeb nie ma żadnych formularzy kart. Jeden wiersz `subscriptions` przypada na parę (kościół, produkt). Plany i poziomy są zapisane w kodzie (`MinistryStuffApi/src/helpers/Plans.ts`), a identyfikatory cen Stripe pochodzą z konfiguracji. Webhook (`/billing/webhook`, weryfikacja podpisu na surowym ciele żądania, deduplikacja w `webhookEvents`) steruje cyklem życia subskrypcji: active → past_due (okres karencji) → canceled.

## Konfiguracja deweloperska

Uruchom MinistryStuffApi (`yarn dev`, port 8097; wymaga pliku `.env` ze wspólnym `JWT_SECRET` i `MINISTRYSTUFF_SERVICE_KEY`) i ustaw ten sam klucz serwisowy w `Api/.env`. `Api/config/dev.json` już wskazuje `ministryStuffApi` na `localhost:8097`. MinistryStuffWeb wymaga pliku `.env` z `VITE_STAGE=dev`. W dev używany jest `smsMode: mock` oraz dyskowe przechowywanie, więc AWS nie jest potrzebny.
