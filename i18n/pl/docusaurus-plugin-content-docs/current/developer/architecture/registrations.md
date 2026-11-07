---
title: "Rejestracje na wydarzenia"
---

# Rejestracje na wydarzenia

<div class="article-intro">

Natywna rejestracja na wydarzenia znajduje się w module treści i od czasu wdrożenia płatnych rejestracji obejmuje pełny model handlowy: typy uczestników z cenami, opcjonalne dodatki z cenami, kody rabatowe, płatności przez istniejącą bramkę płatności kościoła oraz listę oczekujących sterowaną statusami. Ścieżka płatności celowo korzysta z istniejącego stosu darowizn: kontroler rejestracji obciąża kartę przez tę samą abstrakcję `GatewayService` / `IGatewayProvider`, opisaną na stronie [Dawanie](./giving), więc w module treści nie ma żadnych danych kart ani wiedzy o SDK bramki. Ta strona opisuje model danych, zasady cen i pojemności oraz przepływy rejestracji, płatności i listy oczekujących.

</div>

## Przegląd

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portal członka)       │            │ Api — moduł treści                          │
│  kreator rejestracji ·       │   HTTPS    │  RegistrationController                     │
│  Moje rejestracje            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (ceny na serwerze)│
│ B1Admin (personel)           │            │  RegistrationHelper (e-maile)               │
│  ustawienia rejestracji      │            └───────────────┬─────────────────────────────┘
│  · lista · eksport CSV       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ wspólna abstrakcja bramki (dawanie)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Trzy zasady obowiązują w całym stosie:

1. **Cenę ustala serwer.** Klient przesyła identyfikatory typów, identyfikatory wyborów i ilości; `RegistrationPricingHelper.computeTotal()` oblicza sumę po stronie serwera, a kupony są ponownie weryfikowane w momencie obciążenia. Kwoty przesłanej przez klienta nigdy się nie ufa.
2. **Pojemność jest egzekwowana atomowo w momencie wstawiania.** Każde wstawienie z ograniczoną pojemnością używa instrukcji `INSERT … SELECT … FROM dual WHERE (liczba aktywnych wierszy) < pojemność`, więc dwie równoczesne rejestracje nie mogą obie zająć ostatniego miejsca. Liczniki wyznaczane są na podstawie statusu (`pending`/`confirmed`) i nigdy nie są zapisywane.
3. **Płatności korzystają z tych samych torów co dawanie.** `RegistrationController` wywołuje wspólną metodę `GatewayService.processCharge` ze skonfigurowaną bramką kościoła — ta sama abstrakcja dostawcy, model tokenizacji i obsługa SCA co przy darowiznach.

## Model danych (`Api/src/modules/content`)

Modele znajdują się w `models/Registration.ts`, mapowania tabel w `db/DatabaseTypes.ts`, a jedno repozytorium na tabelę jest w katalogu `repositories/`.

| Tabela | Znaczenie | Kluczowe pola |
|-------|---------|-----------|
| `registrations` | Jedna rejestracja (jedno gospodarstwo domowe lub grupa na jedno wydarzenie) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Jeden uczestnik w rejestracji | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Typy uczestników na wydarzenie (np. dorosły / dziecko) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Nazwane opcje dodatkowe z ceną (np. koszulka) | eventId, name, description, **price**, **capacity**, **maxQuantity** (limit na rejestrację), sort, active |
| `registrationSelectionChoices` | Ilość wybranej opcji przez rejestrację lub uczestnika | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Jedno udane obciążenie związane z rejestracją | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Kody rabatowe na wydarzenie | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Uwagi:

- **Nie ma tabeli listy oczekujących.** Oczekujące grupy to wiersze w `registrations` ze statusem `status = 'waitlisted'`; cały cykl życia listy oczekujących to zmiany statusu w tej jednej tabeli.
- **Brak zapisanych liczników.** Liczby „sprzedanych” / „wykorzystanych” miejsc (pojemność wydarzenia, pojemność typu, pojemność opcji, wykorzystanie kuponów) są obliczane przez skorelowane podzapytania po wierszach o statusie `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Anulowanie rejestracji zwalnia więc pojemność bez dodatkowej księgowości.
- Ceny są kolumnami DECIMAL w MySQL (przesyłane jako ciągi znaków) i są konwertowane przez `Number()` wewnątrz helpera cen.

## Interfejs REST

Wszystkie trasy znajdują się pod `/content/registrations` (`controllers/RegistrationController.ts`) i są chronione przez `Permissions.registrations` (`view` / `edit`):

| Trasa | Dostęp | Cel |
|-------|--------|-----|
| `POST /register` | anonimowy | Pełne zgłoszenie: gość, członek lub dodanie uczestnika przez personel; ceny na serwerze, sprawdzenie pojemności, opcjonalne obciążenie |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | publiczny | Typy i opcje z wyliczonymi `used` / `remainingCapacity` dla kreatora |
| `POST /types`, `DELETE /types/:id` (analogicznie dla `/selections`, `/coupons`) | `registrations.edit` | CRUD ustawień dla personelu |
| `POST /coupons/validate` | publiczny | Weryfikacja kodu rabatowego na bieżąco w kreatorze |
| `GET /coupons/event/:eventId` | personel | Kupony wraz z liczbą wykorzystań |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personel · publiczny | Lista uczestników; liczba aktywnych rejestracji do wyświetlenia pojemności |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | uwierzytelniony | Moje rejestracje, szczegóły, historia płatności |
| `PUT /:id` | właściciel/personel | Edycja po zgłoszeniu — zastępuje uczestników i wybory opcji nowymi, atomowymi sprawdzeniami pojemności, przelicza `totalAmount`; nigdy nie obciąża ani nie zwraca środków automatycznie |
| `POST /:id/pay` | właściciel | „Dokończ płatność”: obciąża `totalAmount − amountPaid` i zmienia status `waitlisted`/`pending` na `confirmed` |
| `POST /:id/promote` | personel | Ręczne przesunięcie z listy oczekujących |
| `POST /:id/cancel` · `DELETE /:id` | właściciel · personel | Anulowanie / usunięcie; oba uruchamiają automatyczne przesunięcie z listy oczekujących |

Istniejąca, niean anulowana rejestracja dla tego samego `personId` na tym samym wydarzeniu jest odrzucana kodem 409, a każda utworzona rejestracja wysyła webhook `registration.created` przez `WebhookDispatcher`.

## Ceny i kody rabatowe

`helpers/RegistrationPricingHelper.ts` jest jedynym źródłem obliczeń finansowych:

- `computeTotal()` sumuje cenę typu każdego uczestnika oraz `cena × ilość` każdego wyboru opcji.
- `validateCoupon()` sprawdza flagę aktywności, okno dat (`startDate`/`endDate`), `minMembers` w porównaniu z liczbą osób w zgłoszeniu oraz `maxUses` w porównaniu z liczbą wykorzystań wyliczoną na podstawie statusu.
- `applyDiscount()` — `percent` odejmuje `suma × value/100`; `amount` odejmuje `value`; w obu przypadkach wynik nie schodzi poniżej zera.

Kreator wywołuje `POST /coupons/validate`, aby na bieżąco pokazać wynik, ale `register` ponownie weryfikuje i stosuje kupon po stronie serwera — suma wyświetlana klientowi ma charakter wyłącznie informacyjny.

## Atomowy wzorzec pojemności

Każde wstawienie z ograniczoną pojemnością jest bezpieczne przy równoczesnych żądaniach bez transakcji i blokad, ponieważ sprawdzenie pojemności jest częścią samej instrukcji `INSERT`. Na poziomie wydarzenia (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero zmienionych wierszy oznacza „brak miejsc”. Ten sam wzorzec chroni wstawienia dla typów (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, liczący uczestników połączonych z aktywnymi rejestracjami) oraz ilości dla opcji (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, z warunkiem `COALESCE(SUM(quantity),0) + ? <= capacity`). Gdy wstawienie uczestnika lub opcji nie powiedzie się w trakcie rejestracji, kontroler wycofuje częściowo zapisaną rejestrację przez `deleteCascade()` i zgłasza, który typ lub która opcja się wyprzedały.

## Przepływ płatności

`processRegistrationCharge` w kontrolerze jest jedynym miejscem, w którym rejestracje dotykają pieniędzy, i jest cienkim klientem stosu darowizn:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenizacja odbywa się w przeglądarce dokładnie tak jak przy darowiznach (zob. [Dawanie](./giving)) — kreator korzysta z rejestru dostawców płatności apphelper, więc zalogowani członkowie mogą płacić zapisanymi kartami, a goście tokenizują nową kartę. Kontroler odzwierciedla niestandardowe zachowania dostawców z `DonateController` (identyfikatory metod płatności `pm-{id}` w Kingdom Funding, odpowiedzi `requires_action` ze Stripe SCA zwracane klientowi bez zapisywania płatności). Udane obciążenie zapisuje wiersz w `registrationPayments`, zwiększa `amountPaid` i potwierdza rejestrację. **Zwroty nie są zaimplementowane** — anulowana płatna rejestracja zachowuje wiersze płatności, a ewentualny zwrot realizowany jest poza systemem, w panelu bramki.

Oba punkty wejścia przechodzą przez tę samą ścieżkę kodu: `register` (płatność przy zapisie) oraz `pay` (płatność reszty / dokończenie z listy oczekujących).

`register` pomija obciążenie w dwóch przypadkach i zapisuje rejestrację jako `pending` z `amountPaid = 0`, pozostawiając pełną kwotę do zapłaty:

- **Dodanie uczestnika przez personel.** Treść zawiera `personId` inny niż osoba wywołująca, bez `guestInfo`, a wywołujący ma `registrations.edit` w tym kościele. Osoba musi istnieć (w przeciwnym razie 404), filtr członków gospodarstwa domowego jest pomijany i nic nie zostaje obciążone.
- **Brak bramki.** Kościół nie ma bramki płatności za darowizny (`hasGateway` sprawdza `gateway.loadAll`). Krok płatności w B1App pokazuje przycisk **Zarejestruj się i zapłać później** zamiast formularza karty.

Rejestracje gości (brak `au.id`) z ceną muszą zawierać `captchaPass` z `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (obecnie w `shared/helpers`) uruchamia się tuż przed obciążeniem, więc zapisy na listę oczekujących i bezpłatne zapisy nie są dotknięte. Gdy `CAPTCHA_ENFORCE=true` i przepustka jest nieobecna lub nieważna, nowa rejestracja zostaje wycofana przez `deleteCascade()`, a wywołanie zwraca 403. Komponent `RegistrationPaymentForm` w B1App pokazuje gościom pole reCAPTCHA i wysyła przepustkę razem z zapisem karty i rejestracją.

## Cykl życia listy oczekujących

Gdy wydarzenie jest pełne, a flaga `waitlistEnabled` jest włączona, `register` zapisuje grupę ze statusem `waitlisted` (pomijając sprawdzenie pojemności) i wysyła zwykły e-mail z potwierdzeniem, oznaczony jako miejsce na liście oczekujących. Przesunięcie następuje na trzy sposoby — `cancel`, `delete` i endpoint personelu `promote` — wszystkie kierują do `RegistrationRepo.promoteFromWaitlist`, który wybiera najstarszy wiersz z listy oczekujących i zmienia go atomowo:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Warunek `status='waitlisted'` gwarantuje, że równoczesne przesunięcia nie przesuną tego samego wiersza dwukrotnie, a podzapytanie o pojemność zapobiega przekroczeniu liczby miejsc. Przesunięte wiersze trafiają do statusu `pending`, a nie `confirmed`, ponieważ saldo może być jeszcze do zapłaty. `RegistrationHelper.sendWaitlistAvailabilityEmail` informuje zgłaszającego, że pojawiło się miejsce, i — gdy `totalAmount − amountPaid > 0` — zawiera link do strony `/mobile/registrations` (Moje rejestracje) w B1 danego kościoła, zbudowany z `B1AppRoot` i subdomeny kościoła. Zapłata (lub brak salda) potwierdza rejestrację.

:::info
Samo podniesienie pojemności nie przesuwa automatycznie osób z listy oczekujących — personel używa działania Przesuń na liście uczestników po zwiększeniu pojemności. Anulowania i usunięcia przesuwają automatycznie.
:::

## Powierzchnie klienckie

- **Kreator w B1App** — jeden wspólny hook, `B1App/src/components/registration/useEventRegistration.ts`, steruje zarówno komponentem na stronie internetowej (`components/registration/EventRegister.tsx`), jak i ekranem portalu mobilnego (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`), przez kroki `info → members → selections → questions → payment → confirm` (kroki środkowe pojawiają się tylko wtedy, gdy wydarzenie ma opcje, załączony formularz lub niezerową sumę). Kroki informacji i uczestników pokazują wybór typów dla każdego uczestnika z aktualną liczbą wolnych miejsc i stanami „wyprzedane”. Płatność (`RegistrationPaymentForm.tsx`) pokazuje podsumowanie zamówienia, pole kodu rabatowego oraz — dla zalogowanych członków — zapisane metody płatności przez rejestr dostawców apphelper, a goście tokenizują nową kartę. Ekran mobilny **Rejestracje** (`screens/RegistrationsPage.tsx`) to Moje rejestracje: status, saldo do zapłaty, Dokończ płatność (`POST /:id/pay`), Edytuj (`PUT /:id` — dane kontaktowe, typy członków, ilości opcji) oraz Anuluj.
- **Ustawienia w B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` dodaje przełącznik Włącz listę oczekujących oraz akordeony Typy uczestników, Opcje i Kody rabatowe (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), wszystkie z operacjami CRUD na trasach `/types`, `/selections`, `/coupons`.
- **Lista uczestników w B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: kolumna Typ dla każdego uczestnika, kolumna Zapłacone/Razem z etykietą salda, znaczniki liczby dla każdego typu, okno szczegółów płatności (`RegistrationDetailDialog.tsx`, z `GET /payments/:registrationId`), akcja Przesuń w wierszu listy oczekujących oraz eksport CSV obejmujący typy uczestników, opcje, kwoty zapłacone/razem/saldo oraz odpowiedzi na pytania.

Wyszukiwania między modułami (ustalanie lub tworzenie osoby-gościa, pobieranie kościoła do e-maili) przechodzą przez `getMembershipModuleGateway()` — moduł treści nigdy nie odczytuje bezpośrednio tabel członkostwa.

## Powiązane strony

- [Dawanie](./giving) — abstrakcja bramki, rejestr dostawców i model tokenizacji, które wykorzystuje ta funkcja
- [Punkty końcowe treści](../api/endpoints/content) — interfejs REST modułu treści
- [Webhooki](../api/webhooks) — zdarzenie `registration.created`
- [Struktura modułów](../api/module-structure) — organizacja modułu treści po stronie serwera
