---
title: "Wygląd"
---

# Wygląd

<div class="article-intro">

Strona Wygląd pozwala dostosować ogólny wygląd i charakter witryny Twojego kościoła. Od kolorów i czcionek po odstępy i własny CSS, z jednego miejsca możesz kontrolować każdy aspekt wizualny swojej witryny.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Ukończ [wstępną konfigurację](initial-setup) swojej witryny
- Przygotuj logo kościoła w formacie PNG z przezroczystym tłem i proporcjami 4:1
- Jeśli masz przewodnik po stylu, znaj kolory marki swojego kościoła (wartości szesnastkowe)

</div>

## Dostęp do ustawień wyglądu

1. W B1 Admin otwórz [menu Przejdź do](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu) i rozwiń **Witryna**.
2. Kliknij **Wygląd**.
3. Otworzy się strona **Style witryny**. Karta **Motyw, czcionki i stopka** pokazuje listę **Ustawień stylu** po lewej stronie oraz podgląd przykładowej witryny po prawej. Poniżej znajdują się karty **Ogłoszenie i widżety** oraz **Przekierowania i analityka**.

## Paleta kolorów {#color-palette}

1. Kliknij **Paleta kolorów** w panelu Ustawienia stylu.
2. Zobaczysz **Kolory podstawowe** (jasne, akcentowe i ciemne odcienie) oraz **Kolory semantyczne** (Podstawowy, Drugorzędny, Sukces, Ostrzeżenie i Błąd).
3. Kliknij dowolną próbkę koloru, aby otworzyć selektor kolorów. Przeciągnij wskaźnik lub wpisz wartość szesnastkową, aby wybrać kolor.
4. **Podgląd kombinacji kolorów** pokazuje, jak wybrane kolory współgrają ze sobą.
5. Użyj **Sugerowanych palet**, aby szybko zastosować gotowy schemat kolorów.
6. Gdy będziesz zadowolony, kliknij **Zapisz paletę**.

## Typografia

1. Kliknij **Czcionki** w panelu Ustawienia stylu.
2. Kliknij przycisk **Czcionka nagłówków** lub **Czcionka treści**, aby otworzyć przeglądarkę czcionek. Możesz wyszukiwać po nazwie lub przeglądać kategorie, takie jak Szeryfowe, Bezszeryfowe, Dekoracyjne, Odręczne i Monospace. Możesz też wybrać jeden z **Popularnych zestawów czcionek**.
3. Kliknij **Zapisz czcionki**, aby zastosować wybrane czcionki.
4. Aby dostosować hierarchię rozmiarów nagłówków od H1 do H4, kliknij **Skala typografii** w panelu Ustawienia stylu. Użyj pól **Mnożnik skali**, **Rozmiar podstawowy** i **Wysokość linii**, aby dopracować wygląd, a następnie kliknij **Zapisz typografię**.

## Odstępy

1. Kliknij **Skala odstępów** w panelu Ustawienia stylu.
2. Dostosuj wartości odstępów od Bardzo małego do Bardzo dużego. Praktyczne przykłady pokazują, jak każda wartość wpływa na układ strony.
3. Kliknij **Zapisz odstępy**, aby zastosować wartości w całej witrynie.

## Logo i branding {#logo-and-branding}

1. Kliknij **Logo** w panelu Ustawienia stylu.
2. Prześlij **Logo na jasnym tle** i **Logo na ciemnym tle**. Najlepsze rezultaty uzyskasz, używając obrazów z przezroczystym tłem i proporcjami 4:1.
3. Prześlij **Obraz do mediów społecznościowych**, który będzie wyświetlany w podglądach linków, oraz **Favicon**, czyli ikonę na karcie przeglądarki.
4. Kliknij **Zapisz zmiany**. Przesłane obrazy nie są zapisywane, dopóki nie klikniesz zapisu, dlatego jeśli spróbujesz najpierw zamknąć lub przeładować kartę przeglądarki, przeglądarka ostrzeże Cię o niezapisanych zmianach.

:::tip
Najlepsze rezultaty daje logo w formacie PNG z przezroczystym tłem. Dzięki temu będzie dobrze wyglądać zarówno na jasnym, jak i ciemnym tle, zarówno na Twojej witrynie, jak i w [aplikacji mobilnej](../settings/mobile-app.md).
:::

## Style nawigacji

Dostosuj kolory paska nawigacji witryny zarówno dla trybu z jednolitym tłem, jak i dla trybu przezroczystego:

1. Kliknij **Nawigacja** w panelu Ustawienia stylu.
2. Skonfiguruj kolory dla **Nagłówka (jednolitego)** oraz **Nagłówka nad sekcją hero (przezroczystego)**.
3. Kliknij **Zapisz nawigację**, aby zastosować kolory nawigacji.

Szczegółowe instrukcje znajdziesz w artykule [Style nawigacji](./navigation-styles.md).

## Ogłoszenie i widżety

Widżety witryny pojawiają się na każdej stronie witryny, unosząc się nad treścią strony:

- **Baner ogłoszeniowy** -- Pasek u góry witryny, który można zamknąć, przeznaczony na komunikaty o czasowym znaczeniu, na przykład o nadchodzącym wydarzeniu lub zmianie nabożeństwa.
- **Przycisk szybkiego dostępu** -- Pływający przycisk, który otwiera menu szybkiego dostępu, na przykład z linkami do dawania, zameldowania się lub przeglądania biuletynu.

1. Znajdź kartę **Ogłoszenie i widżety** poniżej Ustawień stylu.
2. Włącz widżety, które chcesz używać, i skonfiguruj ich tekst, linki i kolory.
3. Kliknij **Zapisz**.

## Przekierowania i analityka

Karta **Przekierowania i analityka** (poniżej Ustawień stylu) zawiera dwa niezwiązane ze sobą, ale często potrzebne ustawienia:

- **Analityka** -- Dodaj swój **identyfikator pomiaru GA4** (w formacie `G-XXXXXXXXXX`), aby śledzić ruch odwiedzających na swojej witrynie. Ten sam identyfikator śledzi także odsłony w aplikacji B1 Twojego kościoła (portal członka pod adresem `/mobile`, również w zainstalowanej aplikacji). Odsłony są oznaczane wartością `display_mode` równą `installed` lub `browser`, dzięki czemu w Google Analytics możesz odróżnić wizyty w zainstalowanej aplikacji od wizyt w przeglądarce.
- **Przekierowania** -- Przypisz stary adres URL do nowego, aby linki do strony, którą przeniesiono lub zmieniono nazwę, nadal działały zamiast zwracać błąd 404. Wpisz starą ścieżkę w polu **Z** i nową ścieżkę w polu **Do**, a następnie kliknij **Zapisz**. Przekierowanie ma też pierwszeństwo przed wbudowanymi stronami B1 (`/sermons`, `/stream`, `/donate`, `/bible` i `/votd`), dzięki czemu możesz przekierować ten adres gdzie indziej, na przykład na własną stronę kazań lub kanał YouTube. Nie zastąpi ono strony, którą sam utworzyłeś pod tym samym adresem. Jeśli chcesz, aby przekierowanie zadziałało, najpierw usuń tę stronę.

## Własny CSS i JavaScript

1. Kliknij **CSS i JavaScript** w panelu Ustawienia stylu.
2. Dodaj **Własny CSS**, aby nadpisać domyślne style i zaawansowanie dostosować wygląd.
3. Dodaj **Własny HTML** dla kodów śledzących lub innych skryptów.
4. Skorzystaj z sekcji **Przykłady popularnego JavaScriptu**, aby znaleźć fragmenty kodu, na przykład do integracji z Google Analytics.

:::warning
Własny CSS jest potężny, ale nieprawidłowe użycie może zepsuć układ witryny. Większość kościołów może uzyskać pożądany wygląd, korzystając z wbudowanych ustawień kolorów, czcionek i odstępów. Używaj własnego CSS tylko wtedy, gdy czujesz się pewnie w tworzeniu stron internetowych.
:::

:::info
Twoja witryna stosuje politykę bezpieczeństwa treści (Content Security Policy), która blokuje skrypty wbudowane pochodzące z innych źródeł. Pole **Własny HTML** tutaj oraz [element HTML](page-editor#using-the-html-element) na poszczególnych stronach są zaufanymi wyjątkami -- kod zapisany w tych miejscach jest uruchamiany bez zmian, dlatego wklejaj skrypty tylko ze źródeł, którym ufasz (tagi analityczne, widżety czatu i podobne osadzenia).
:::

## Motywy stylów

Jeśli szukasz szybkiego punktu wyjścia, **Sugerowane palety** w sekcji Paleta kolorów oferują gotowe motywy, które jednym kliknięciem ustawiają spójne kolory. Po zastosowaniu motywu zawsze możesz dopracować poszczególne ustawienia.

## Następne kroki

- [Zarządzanie stronami](managing-pages) -- Tworzenie i organizowanie stron witryny
- [Pliki](files) -- Przesyłanie zasobów multimedialnych dla witryny
