---
title: "Transmisja na żywo"
---

# Transmisja na żywo

<div class="article-intro">

Strona Godziny transmisji na żywo pozwala skonfigurować harmonogram transmisji Twojego kościoła, zarządzać godzinami nabożeństw i dostosować doświadczenie widzów. Ustaw cykliczne cotygodniowe nabożeństwa lub jednorazowe wydarzenia, skonfiguruj czat i ustawienia wideo oraz kontroluj moment, w którym transmisja rozpocznie się na żywo.

</div>

## Film szkoleniowy

<YouTube id="tpEY-sEYW6A" title="Konfigurowanie transmisji na żywo w B1" next="Dostosowywanie aplikacji mobilnej dla członków kościoła w B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnienia **contentApi.streamingServices.edit**. Jeśli nie masz dostępu, zobacz [Role i uprawnienia](../settings/roles-permissions.md).
- Przygotuj identyfikator swojego kanału YouTube, jeśli planujesz korzystać z automatycznej transmisji na żywo
- Dodaj co najmniej jedno [kazanie](managing-sermons) lub stały adres URL transmisji na żywo, który będzie źródłem transmisji

</div>

Transmisją na żywo zarządza się na dwóch stronach w sekcji **Kazania** menu Jump: **Godziny transmisji na żywo** służy do zarządzania harmonogramem transmisji, a **Ustawienia** do konfigurowania zakładek na stronie transmisji.

## Zarządzanie nabożeństwami

### Dodawanie nabożeństwa

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Kazania** i kliknij **Godziny transmisji na żywo**.
2. Kliknij przycisk **Dodaj nabożeństwo** u góry strony, aby utworzyć nowe zaplanowane nabożeństwo. Istniejące nabożeństwa są wyświetlane w tabeli, która pokazuje nazwę, godzinę, dostawcę i czas trwania każdego z nich; aby zmienić nabożeństwo, kliknij ikonę edycji w jego wierszu.
3. Wpisz **Nazwę nabożeństwa** (na przykład „Niedzielne nabożeństwo poranne”).
4. Ustaw **Godzinę nabożeństwa** -- wybierz dzień i godzinę rozpoczęcia nabożeństwa.
5. Ustaw **Cykliczne co tydzień** na **Tak** dla regularnych cotygodniowych nabożeństw lub na **Nie** dla jednorazowego wydarzenia.

### Konfigurowanie czatu i ustawień wideo

6. W sekcji **Ustawienia czatu** określ, na ile minut przed i po nabożeństwie czat ma być włączony. Dzięki temu odwiedzający mogą zacząć rozmawiać przed nabożeństwem i kontynuować po nim.
7. W sekcji **Ustawienia wideo** określ, o ile wcześniej ma się rozpocząć transmisja wideo, aby wyświetlać odliczanie lub treści przed nabożeństwem. Czat otwiera się o tyle minut *przed* wcześniejszym startem wideo, więc wartość wyświetlana obok ustawienia minut przed czatem uwzględnia obie liczby. Na przykład nabożeństwo o 10:00 z 15 minutami czatu przed nim i wcześniejszym startem o 5 minut otworzy czat o 9:40.
8. Wybierz z listy rozwijanej kazanie do odtworzenia:
   - **Najnowsze kazanie** -- Automatycznie odtwarza ostatnio dodany film.
   - **Bieżąca transmisja na żywo** -- Odtwarza bieżącą transmisję na żywo z YouTube, korzystając z identyfikatora Twojego kanału.
   - Możesz też wybrać dowolne konkretne kazanie, które już zapisałeś.
9. Kliknij **Zapisz**, aby zaplanować nabożeństwo.

:::info
Jeśli nabożeństwo jest ustawione jako cykliczne, będzie się automatycznie aktualizować co tydzień. Zachowuje tę samą godzinę lokalną po rozpoczęciu i zakończeniu czasu letniego. Możesz dodać dowolną liczbę nabożeństw. Odwiedzający zobaczą najbliższą zaplanowaną godzinę nabożeństwa, gdy wejdą na Twoją stronę transmisji.
:::

## Ustawienia strony transmisji

Aby dostosować zakładki i linki wyświetlane obok transmisji na żywo, otwórz menu Jump, rozwiń **Kazania** i kliknij **Ustawienia**. Strona **Ustawienia transmisji** pokazuje listę **Zakładek treści**.

### Dodawanie zakładek

1. Kliknij przycisk **Dodaj**, aby dodać nową zakładkę na stronie transmisji na żywo.
2. Wybierz **Typ linku**: **Zewnętrzny adres URL**, aby dodać własny link, albo jedną z gotowych zakładek **Czat** lub **Modlitwa**.
3. W przypadku zakładki Czat wystarczy wpisać nazwę w polu **Tekst zakładki** i konfiguracja jest gotowa.
4. W przypadku zakładki z linkiem wpisz nazwę zakładki, wybierz ikonę, klikając przycisk ikony, i wpisz adres URL.
5. Skonfigurowane zakładki pojawią się na stronie transmisji na żywo, aby widzowie mogli korzystać z dodatkowych materiałów i interaktywnych funkcji.

### Podgląd transmisji

Na stronie **Godziny transmisji na żywo** kliknij **Wyświetl swoją transmisję** u góry strony, aby zobaczyć dokładnie, jak strona transmisji będzie wyglądać dla odwiedzających, łącznie z logo, godzinami nabożeństw i skonfigurowanymi zakładkami.

## Konfigurowanie transmisji na żywo w YouTube

Aby połączyć kanał YouTube z automatyczną transmisją na żywo:

1. Przejdź do **Kazania**, kliknij **Dodaj kazanie**, a następnie wybierz **Dodaj stały adres URL transmisji na żywo**.
2. Domyślnym dostawcą wideo jest **Bieżąca transmisja na żywo z YouTube**. Wpisz swój **Identyfikator kanału YouTube**.
3. Dodaj tytuł i opis, a następnie kliknij **Zapisz**.
4. W **Godzinach transmisji na żywo** utwórz nabożeństwo i wybierz swój stały adres URL transmisji z listy rozwijanej kazań.

:::tip
Aby znaleźć identyfikator kanału YouTube, przejdź do zaawansowanych ustawień swojego kanału YouTube i skopiuj wartość Identyfikatora kanału.
:::

## Dostosowywanie kolorów i logo

Strona transmisji na żywo korzysta z ustawień [wyglądu](../website/appearance) Twojej strony internetowej:

- **Jasny kolor akcentu** z ciemnym tekstem jest używany w nagłówku.
- **Ciemny kolor akcentu** z jasnym tekstem jest używany w panelu bocznym.
- Twoje **logo na jasnym tle** pojawia się na stronie transmisji. Użyj obrazu z przezroczystym tłem i proporcją 4:1.

Aby zmienić te ustawienia, przejdź do **Strona internetowa**, a następnie **Wygląd** i zaktualizuj ustawienia [palety kolorów](../website/appearance#color-palette) oraz [logo](../website/appearance#logo-and-branding).

## Dodawanie prowadzących transmisję

Aby dać członkom zespołu dostęp do czatu dla prowadzących obok czatu publicznego:

1. W menu Jump wybierz **Ustawienia > Role**.
2. Kliknij przycisk plusa i wybierz **Dodaj niestandardową rolę**.
3. Nazwij rolę „Prowadzący transmisję” i kliknij **Zapisz**.
4. Kliknij nową rolę, a następnie kliknij **Dodaj** w sekcji Członkowie, aby dodać osoby.
5. Przewiń do **Edytuj uprawnienia**, rozwiń sekcję **Treść** i zaznacz **Czat dla prowadzących**.

Kiedy prowadzący zalogują się na stronę transmisji na żywo, obok czatu publicznego pojawi się prywatna zakładka **Czat dla prowadzących**, służąca do rozmów tylko dla personelu podczas transmisji.

:::info
Więcej informacji o tworzeniu ról i zarządzaniu uprawnieniami znajdziesz w artykule [Role i uprawnienia](../settings/roles-permissions.md).
:::

## Rozwiązywanie problemów

Jeśli automatyczna transmisja na żywo z YouTube nie wyświetla się poprawnie przy użyciu opcji „Bieżąca transmisja na żywo z YouTube” z identyfikatorem Twojego kanału, spróbuj następujących kroków:

**Objawy:**
- Osadzona transmisja pokazuje komunikat „Film niedostępny”
- Strona się ładuje, ale nie pojawia się żadne wideo
- Bezpośrednie osadzenia z YouTube działają, ale automatyczna transmisja z kanału nie

**Rozwiązanie:**
Sprawdź kanał YouTube pod kątem starych lub zaplanowanych transmisji na żywo i usuń je:

1. Przejdź do YouTube Studio.
2. Otwórz **Treść**, a następnie **Na żywo**.
3. Poszukaj starych zaplanowanych transmisji na żywo lub nadchodzących zaplanowanych transmisji.
4. Usuń te stare lub zaplanowane wpisy transmisji na żywo.
5. Ponownie sprawdź stronę transmisji na żywo.

:::warning
Automatyczne osadzenie transmisji z kanału YouTube może być zablokowane, gdy na kanale znajduje się wiele zaplanowanych lub minionych wpisów transmisji na żywo. Ich usunięcie pozwala YouTube prawidłowo zidentyfikować i wyświetlić bieżącą transmisję.
:::

**Dodatkowe wymagania:**
- Transmisja na żywo musi być ustawiona jako **Publiczna** (nie Niepubliczna ani Prywatna).
- Osadzanie musi być dozwolone w ustawieniach transmisji na YouTube.
- Upewnij się, że używasz dostawcy **Bieżąca transmisja na żywo z YouTube** (z identyfikatorem kanału), a nie dostawcy **YouTube** (z identyfikatorem wideo).

## Następne kroki

- [Zarządzanie kazaniami](managing-sermons) -- Dodawanie kazań do biblioteki
- [Playlisty](playlists) -- Organizowanie kazań w serie
