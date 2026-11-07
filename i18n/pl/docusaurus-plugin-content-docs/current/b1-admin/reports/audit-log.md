---
title: "Protokol zdarzeń"
---

# Protokol zdarzeń

<div class="article-intro">

Protokol zdarzeń rejestruje wszystkie istotne działania i zmiany w Twoim systemie zarządzania kościołem. Użyj go, aby sprawdzić aktywność logowania, śledzić, kto wprowadzał zmiany w rekordach osób, monitorować aktualizacje uprawnień i utrzymywać odpowiedzialność w całym zespole.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto B1 Admin z dostępem administratora serwera
- Przejdź do **Ustawień**, aby znaleźć Protokół zdarzeń

</div>

## Przeglądanie protokołu zdarzeń

1. Otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu B1 Admin) i rozwiń **Ustawienia**.
2. Kliknij **Protokół zdarzeń**.
3. Protokół wyświetla ostatnie wpisy w tabeli z następującymi kolumnami:
   - **Data** -- Kiedy wystąpiło działanie.
   - **Kategoria** -- Typ działania (oznaczony kolorem, aby ułatwić szybkie przeglądanie).
   - **Działanie** -- Co zostało wykonane (np. create, update, delete, login_success).
   - **Encja** -- Typ i identyfikator rekordu, którego dotyczyło działanie.
   - **Adres IP** -- Adres IP użytkownika, który wykonał działanie.
   - **Szczegóły** -- Podsumowanie konkretnych wprowadzonych zmian.

## Filtrowanie protokołu

Użyj filtrów u góry strony, aby zawęzić wyniki:

- **Kategoria** -- Filtruj według typu działania:
  - **Wszystkie kategorie** -- Pokaż wszystko.
  - **Logowanie** -- Udane i nieudane logowania.
  - **Osoby** -- Tworzenie, aktualizowanie lub usuwanie rekordów osób.
  - **Uprawnienia** -- Nadawanie i odbieranie uprawnień.
  - **Darowizny** -- Zmiany w rekordach darowizn.
  - **Grupy** -- Działania związane z zarządzaniem grupami.
  - **Formularze** -- Aktywność związana z przesyłaniem formularzy.
  - **Ustawienia** -- Zmiany konfiguracji.
- **Data początkowa** -- Pokaż wpisy od tej daty.
- **Data końcowa** -- Pokaż wpisy do tej daty.

Po ustawieniu filtrów kliknij **Szukaj**, aby zaktualizować wyniki.

## Omówienie kategorii

Każda kategoria jest oznaczona kolorem, aby ułatwić identyfikację:

- **Logowanie** -- Niebieski znacznik. Śledzi udane i nieudane próby logowania.
- **Osoby** -- Fioletowy znacznik. Śledzi tworzenie, aktualizowanie i usuwanie rekordów osób.
- **Uprawnienia** -- Czerwony znacznik. Śledzi nadawanie i odbieranie praw dostępu.
- **Darowizny** -- Zielony znacznik. Śledzi zmiany w rekordach darowizn.
- **Grupy** -- Szary znacznik. Śledzi operacje zarządzania grupami.
- **Formularze** -- Pomarańczowy znacznik. Śledzi aktywność związaną z przesyłaniem formularzy.
- **Ustawienia** -- Żółty znacznik. Śledzi zmiany konfiguracji.

## Eksportowanie protokołu

Gdy wpisy protokołu są wyświetlane, pojawia się przycisk **pobierania CSV**. Kliknij go, aby wyeksportować bieżące przefiltrowane wyniki do arkusza kalkulacyjnego do przeglądu offline lub do celów ewidencyjnych.

## Stronicowanie

Użyj elementów sterujących stronicowaniem u dołu tabeli, aby przechodzić między wynikami. Możesz wyświetlać 25, 50 lub 100 wpisów na stronę.

:::info
Wpisy protokołu zdarzeń są automatycznie przechowywane przez rok. Wpisy starsze niż 365 dni są usuwane, aby system działał wydajnie.
:::

:::tip
Regularnie przeglądaj protokół zdarzeń, szczególnie po wdrożeniu nowych członków zespołu lub wprowadzeniu znaczących zmian w konfiguracji. Pomaga to wcześnie wykryć nieoczekiwaną aktywność.
:::

## Powiązane artykuły

- [Role i uprawnienia](../settings/roles-permissions) -- Zarządzaj tym, kto ma dostęp do czego
- [Bezpieczeństwo danych](../settings/data-security) -- Dowiedz się, jak chronione są Twoje dane
- [Przegląd raportów](./index.md) -- Zobacz wszystkie dostępne raporty
