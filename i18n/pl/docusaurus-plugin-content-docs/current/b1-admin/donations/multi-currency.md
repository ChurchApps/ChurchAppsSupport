---
title: "Obsługa wielu walut"
---

# Obsługa wielu walut

<div class="article-intro">

Funkcja wielu walut w B1 pozwala Twojemu kościołowi przyjmować i śledzić darowizny w różnych walutach. Jest to szczególnie przydatne dla kościołów z międzynarodowymi członkami, misjonarzami lub zborami w różnych krajach.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnień do zarządzania darowiznami. Szczegóły znajdziesz w artykule [Role i uprawnienia](../people/roles-permissions.md).
- Skonfiguruj [darowizny online](./online-giving-setup.md) za pomocą Stripe, który obsługuje transakcje w wielu walutach.
- Zapoznaj się z wymogami księgowymi swojego kościoła dotyczącymi obsługi kilku walut.

</div>

## Włączanie obsługi wielu walut

Obsługa wielu walut jest obecnie domyślnie włączona w B1. Po włączeniu:

- Członkowie mogą przekazywać darowizny online w swojej lokalnej walucie
- Możesz ręcznie rejestrować darowizny w dowolnej walucie
- Raporty z darowizn pokazują kwoty w oryginalnej walucie
- Stripe automatycznie przelicza waluty w przypadku darowizn online

## Obsługiwane waluty

System obsługuje wszystkie główne waluty świata, w tym:

- **USD** -- dolar amerykański
- **EUR** -- euro
- **GBP** -- funt brytyjski
- **CAD** -- dolar kanadyjski
- **AUD** -- dolar australijski
- **MXN** -- peso meksykańskie
- **BRL** -- real brazylijski
- **INR** -- rupia indyjska
- **CNY** -- juan chiński
- **JPY** -- jen japoński
- I wiele innych...

Dostępne waluty dla darowizn online zależą od walut obsługiwanych przez Twoje konto Stripe.

## Rejestrowanie darowizn w różnych walutach

### Darowizny online

Gdy członek przekazuje darowiznę online przez Stripe:

1. Wybiera preferowaną walutę przy płatności
2. Stripe przetwarza płatność w tej walucie
3. Darowizna zostaje zapisana w B1 z kwotą w oryginalnej walucie
4. Stripe automatycznie przelicza walutę na domyślną walutę Twojego konta, jeśli jest to konieczne

### Wprowadzanie ręczne

Aby zarejestrować darowiznę gotówkową lub czekową w innej walucie:

1. W B1 Admin przejdź do **Donations > Batches** i otwórz partię
2. Kliknij **Add Donation** u góry strony partii
3. Wybierz walutę z listy rozwijanej walut
4. Wpisz kwotę w tej walucie
5. Uzupełnij pozostałe dane darowizny
6. Kliknij **Save**

## Przeglądanie darowizn w wielu walutach

### Raporty z darowizn

Raporty z darowizn wyświetlają kwoty w oryginalnej walucie:

- Pojedyncze rekordy darowizn pokazują kod waluty (np. "$100.00 USD")
- Sumy są obliczane osobno dla każdej waluty
- Możesz filtrować według konkretnych walut

### Przeliczone sumy

Wszędzie tam, gdzie B1 pokazuje jedną łączną sumę -- karty KPI podsumowania darowizn, sumę partii darowizn oraz sumę funduszu -- darowizny zarejestrowane w walucie innej niż domyślna waluta kościoła są przeliczane na walutę kościoła według bieżących kursów wymiany. Dzięki temu suma jest jedną, sensowną wartością, a nie sumą różnych walut. Pod sumą pojawia się notatka **Przeliczono według bieżących kursów wymiany**, gdy zastosowano przeliczenie. Poszczególne pozycje darowizn nadal wyświetlane są w oryginalnej walucie.

### Zestawienia do celów podatkowych

Przy generowaniu zestawień darowizn:

- Każda darowizna pojawia się w oryginalnej walucie
- Sumy są podzielone według waluty
- Darczyńcy widzą dokładnie, ile przekazali w każdej walucie

## Integracja ze Stripe

W przypadku darowizn online Stripe obsługuje transakcje w wielu walutach:

- **Automatyczne przeliczanie** -- Stripe przelicza waluty na domyślną walutę Twojego konta
- **Kursy wymiany** -- Stripe korzysta z bieżących kursów rynkowych
- **Opłaty** -- Przeliczenie waluty może wiązać się z dodatkowymi opłatami Stripe
- **Waluta wypłat** -- Środki są wpłacane w domyślnej walucie Twojego konta

:::info
Sprawdź w panelu Stripe bieżące kursy przeliczeniowe oraz opłaty związane z transakcjami w wielu walutach.
:::

## Kwestie księgowe

Pracując z wieloma walutami:

- **Prowadzenie dokumentacji** -- Zapisuj oryginalne kwoty darowizn i waluty, aby zapewnić dokładne raportowanie
- **Kursy wymiany** -- Pamiętaj, że kursy Stripe mogą różnić się od kursów Twojego banku
- **Zaświadczenia podatkowe** -- Skonsultuj się z księgowym, jak wykazywać darowizny w różnych walutach do celów podatkowych
- **Przydział na fundusze** -- Darowizny możesz przypisywać do konkretnych funduszy niezależnie od waluty

## Dobre praktyki

- **Domyślna waluta** -- Ustaw główną walutę kościoła jako domyślną dla większości transakcji
- **Jasna komunikacja** -- Informuj darczyńców, w jakiej walucie przekazują darowiznę podczas płatności
- **Spójna sprawozdawczość** -- Sumy łączne są zawsze automatycznie przeliczane na walutę kościoła; użyj filtra walut przy poszczególnych darowiznach, gdy potrzebujesz zobaczyć oryginalne kwoty
- **Regularne uzgadnianie** -- Uzgadniaj wypłaty ze Stripe z rekordami darowizn, uwzględniając przeliczenia walutowe

## Ograniczenia

- Przeliczanie walut przy przetwarzaniu płatności jest obsługiwane przez Stripe wyłącznie dla darowizn online; darowizny ręczne są zapisywane w podanej kwocie, bez automatycznego przeliczania
- Raporty historyczne i poszczególne pozycje darowizn zawsze pokazują oryginalną walutę, w jakiej zarejestrowano dar
- Sumy łączne (karty KPI, sumy partii, sumy funduszy) są przeliczane na walutę kościoła według bieżących kursów wymiany -- kursy te mogą nieznacznie różnić się od kursów Twojego banku lub Stripe w chwili rozliczenia środków

## Powiązane artykuły

- [Konfiguracja darowizn online](./online-giving-setup.md) -- Konfiguracja Stripe do przyjmowania darowizn
- [Rejestrowanie darowizn](./recording-donations.md) -- Ręczne wprowadzanie rekordów darowizn
- [Raporty z darowizn](./donation-reports.md) -- Generowanie i przeglądanie podsumowań darowizn
- [Zestawienia darowizn](./giving-statements.md) -- Tworzenie zestawień darowizn na koniec roku
