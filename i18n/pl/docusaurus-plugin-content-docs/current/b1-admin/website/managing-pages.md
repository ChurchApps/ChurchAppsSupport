---
title: "Zarządzanie stronami"
---

# Zarządzanie stronami

<div class="article-intro">

Widok **Strony internetowej** to centralne miejsce do tworzenia, edytowania i porządkowania wszystkich stron na witrynie Twojego kościoła. Z tego jednego ekranu możesz zarządzać zarówno treścią stron, jak i nawigacją witryny.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Wykonaj [wstępną konfigurację](initial-setup), aby ustawić domenę i podstawowe ustawienia witryny
- Przygotuj treści i obrazy. Najpierw prześlij pliki multimedialne, korzystając z menedżera [Pliki](files).

</div>

:::info
Jeśli Twój kościół ma więcej niż jedną witrynę (na przykład oddzielne witryny dla poszczególnych zborów), użyj przełącznika witryn u góry widoku **Strony internetowej**, aby przełączać się między nimi. Każda witryna ma własne strony, nawigację i ustawienia [wyglądu](appearance).
:::

## Rodzaje stron

Tabela **Strony** wyświetla wszystkie strony witryny wraz z **Ścieżką** i **Tytułem**. Istnieją dwa rodzaje stron:

- **Wygenerowane** -- Strony utworzone automatycznie przez system na podstawie danych kościoła (na przykład strona grup, strona kazań lub osobna strona dla każdego kazania w bibliotece). Te strony mają oznaczenie **Wygenerowana** i aktualizują się automatycznie wraz ze zmianą danych.
- **Niestandardowe** -- Strony, które sam utworzyłeś, z własną treścią i układem.

Dowolną automatycznie wygenerowaną stronę możesz przekształcić w stronę niestandardową, jeśli chcesz mieć pełną kontrolę nad jej treścią i wyglądem. Kliknij **Przekształć** obok wygenerowanej strony i potwierdź.

## Dodawanie i edytowanie stron

1. Kliknij przycisk **Dodaj stronę** w prawym górnym rogu widoku **Strony internetowej**.
2. Wybierz rodzaj strony (pustą lub szablon) i nadaj jej nazwę.
3. Kliknij **Edytuj treść** obok dowolnej strony, aby otworzyć [edytor stron](page-editor), w którym możesz dodawać sekcje, tekst, obrazy i inne elementy.
4. Kliknij **Ustawienia strony** obok strony, aby zmienić jej tytuł, ścieżkę URL i inne metadane.
5. Kliknij ścieżkę strony w kolumnie **Ścieżka**, aby otworzyć działającą stronę w nowej karcie i zobaczyć dokładnie, jak będzie wyglądać dla odwiedzających.

:::tip
Dla strony głównej ustaw ścieżkę URL jako samo `/`. Dla wszystkich pozostałych stron używaj opisowej ścieżki, na przykład `/about` lub `/contact`.
:::

### Ustawienia strony

Otwórz **Ustawienia strony** dowolnej strony, aby skonfigurować:

- **Tytuł i ścieżka URL** -- Nazwa strony i jej adres w witrynie.
- **Widoczność** -- Wybierz, kto może zobaczyć stronę: wszyscy, tylko członkowie, tylko personel lub członkowie określonych grup. To szybki sposób na ograniczenie dostępu do prywatnej strony (na przykład strony z materiałami dla personelu) bez osobnego hasła.
- **Opis meta** -- Krótkie podsumowanie wyświetlane w wynikach wyszukiwarek i podglądach linków w mediach społecznościowych.
- **Przekierowania** -- Skieruj starą ścieżkę URL na tę stronę, aby linki i zakładki prowadzące do wycofanej strony nadal działały.

## Zarządzanie nawigacją

Panel **Główna nawigacja** po prawej stronie widoku **Strony internetowej** wyświetla linki nawigacyjne. Te linki określają menu, które widzą odwiedzający Twoją witrynę.

1. Kliknij **Dodaj**, aby utworzyć nowy link nawigacyjny. Może on prowadzić do dowolnej strony w Twojej witrynie lub do zewnętrznego adresu URL.
2. Aby zmienić kolejność linków, przeciągnij je we właściwe miejsce. Możesz też zagnieździć linki pod elementem nadrzędnym, aby utworzyć menu rozwijane.
3. Kliknij dowolny link, aby otworzyć jego **Ustawienia linku**, gdzie możesz zmienić tekst, adres URL lub stronę nadrzędną.
4. Aby usunąć link z nawigacji, otwórz jego **Ustawienia linku** i kliknij **Usuń**.

:::info
Usunięcie linku nawigacyjnego nie usuwa samej strony. Strona nadal istnieje i można do niej przejść bezpośrednio pod jej adresem URL -- po prostu nie pojawi się w menu.
:::

## Przełączniki dla całej witryny

Poniżej linków w panelu **Główna nawigacja** znajdują się dwa przełączniki, które dotyczą całej witryny kościoła:

- **Pokaż logowanie** -- Wyświetla przycisk **Zaloguj się** na pasku nawigacyjnym witryny.
- **Wyłącz publiczną stronę internetową** -- Wyłącza publiczną witrynę. Skorzystaj z tej opcji, jeśli Twój kościół korzysta z B1 wyłącznie do portalu członków, składek i rejestracji, a główną witrynę prowadzi gdzie indziej.

### Co robi wyłączenie publicznej strony internetowej

Gdy opcja **Wyłącz publiczną stronę internetową** jest włączona:

- Każda publiczna strona, w tym strona główna i Twoje strony niestandardowe, przekierowuje niezalogowanych odwiedzających na ekran logowania. Po zalogowaniu wracają na stronę, o którą prosili.
- Zalogowani członkowie widzą całą witrynę jak zwykle, w tym nawigację i wbudowane strony **Wygenerowane** (takie jak Grupy i Kazania). Strony wygenerowane nie pojawiają się już w tabeli Strony.
- Wyszukiwarkom przekazywana jest informacja, by nie indeksowały witryny. Mapa witryny jest pusta, a plik `robots.txt` blokuje wszelkie indeksowanie.

Następujące linki nadal działają, dzięki czemu członkowie i goście mogą do nich dotrzeć:

- Logowanie i wylogowanie
- Portal członków (wszystko w ramach `/mobile`)
- Linki do [rejestracji na wydarzenia](../guides/event-registration.md) oraz rejestracja gości

Dopóki publiczna witryna jest wyłączona, pod przełącznikiem wyświetla się ostrzeżenie. Aby przywrócić swoje strony, wyłącz ponownie przełącznik. Podczas wyłączenia witryny nic nie zostaje usunięte.

:::info
To ustawienie dotyczy całego kościoła. Jeśli masz więcej niż jedną witrynę, wyłącza ona wszystkie z nich, a nie tylko tę wybraną w przełączniku witryn.
:::

## Wskazówki dotyczące organizacji witryny

- Ogranicz główną nawigację do pięciu lub sześciu pozycji, aby odwiedzający szybko znajdowali potrzebne informacje.
- Używaj zagnieżdżonych linków dla powiązanych podstron (na przykład menu rozwijanego „O nas” z pozycjami „Nasz zespół”, „Wierzenia” i „Historia”).
- Sprawdź nawigację na telefonie, aby upewnić się, że dobrze działa na mniejszych ekranach.
- Nadawaj stronom jasne, opisowe nazwy, które pomogą odwiedzającym zrozumieć, co na nich znajdą.

:::tip
Na swoich stronach możesz dodać [formularze](../forms/creating-forms.md), aby zbierać rejestracje, prośby o modlitwę lub inne informacje od odwiedzających.
:::

## Rozpoczynanie od szablonu witryny

Jeśli budujesz witrynę od podstaw, możesz utworzyć jej szkielet przy użyciu **szablonu witryny** zamiast tworzyć strony pojedynczo. Szablon witryny tworzy zestaw gotowych stron, takich jak strona główna, o nas, kontakt, dawanie i inne, z przykładową treścią i już podłączonymi linkami nawigacyjnymi.

1. Na ekranie Strony kliknij przycisk **Rozpocznij od szablonu** (obok przycisku **Dodaj stronę**).
2. Przeglądaj dostępne szablony i kliknij jeden, aby zobaczyć podgląd jego struktury stron.
3. Gdy znajdziesz odpowiedni, kliknij **Zastosuj szablon**.
4. Strony, które jeszcze nie istnieją, zostaną utworzone i dodane do nawigacji. Istniejące strony pozostaną bez zmian.

Po zastosowaniu szablonu otwórz każdą stronę w [edytorze stron](page-editor), aby zastąpić tekst zastępczy i obrazy prawdziwą treścią Twojego kościoła.

:::info
Szablony witryn tworzą strukturę stron i nawigację. Nie zmieniają schematu kolorów ani czcionek witryny -- te ustawienia kontroluje sekcja [Wygląd](appearance).
:::

## Podgląd obrazu (lightbox)

Gdy odwiedzający kliknie obraz na Twojej witrynie, otwiera się on w pełnoekranowym oknie podglądu. Dzięki temu ludzie mogą oglądać zdjęcia w większym rozmiarze bez opuszczania strony. Nie jest wymagana żadna konfiguracja -- podgląd jest włączony automatycznie dla obrazów w treści Twoich stron.

## Następne kroki

- [Wstępna konfiguracja](initial-setup) -- Instrukcje konfiguracji przy pierwszym uruchomieniu
- [Korzystanie z edytora stron](page-editor) -- Dowiedz się, jak tworzyć i stylizować treść stron
- [Wygląd](appearance) -- Dostosuj motyw wizualny witryny
- [Pliki](files) -- Prześlij i zarządzaj plikami multimedialnymi dla swoich stron
