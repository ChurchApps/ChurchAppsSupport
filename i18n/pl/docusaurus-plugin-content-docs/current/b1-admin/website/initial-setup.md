---
title: "Pierwsze kroki z witryną B1 Admin"
sidebar_label: "Początkowa konfiguracja"
description: "Skonfiguruj witrynę kościoła w B1 Admin: wskaż subdomenę lub własną domenę, utwórz stronę główną, wybierz kolory marki i logo oraz zbuduj nawigację."
---

# Początkowa konfiguracja

<div class="article-intro">

Każde konto B1 zawiera gotową stronę internetową. Ten przewodnik przeprowadzi Cię przez konfigurację domeny kościoła, ustawienie wyglądu strony, tworzenie pierwszych podstron i organizację nawigacji.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz konta B1.church z uprawnieniami administratora
- Jeśli korzystasz z własnej domeny, przygotuj dane logowania do dostawcy DNS (np. GoDaddy, Cloudflare lub AWS)
- Przygotuj logo kościoła w formacie PNG z przezroczystym tłem, aby uzyskać najlepszy efekt

</div>

## Konfiguracja domeny

Twój kościół automatycznie otrzymuje subdomenę w B1.church (na przykład `twojkosciol.b1.church`). Możesz także wskazać własną domenę na swoją stronę B1.

1. Przejdź do **B1.church Admin**, wpisując admin.b1.church, lub kliknij rozwijane menu profilu i wybierz **Switch App**.
2. Otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Settings** i kliknij **Settings**.
3. Otwórz sekcję **Church Information**, aby zobaczyć swoją subdomenę. Ustaw ją na krótką i łatwą do zapamiętania nazwę bez spacji.
4. Aby użyć własnej domeny, zaloguj się do swojego dostawcy DNS (np. GoDaddy, Cloudflare lub AWS) i dodaj dwa rekordy:
   - Rekord **A** dla domeny głównej wskazujący na `3.23.251.61`
   - Rekord **CNAME** dla `www` wskazujący na `proxy.b1.church`
5. Wróć do B1.church Admin, otwórz sekcję **Domains** na tej samej stronie Settings, dodaj swoją domenę na listę i kliknij **Add**, a następnie **Save**. Twoja strona będzie dostępna pod własną domeną w ciągu kilku minut.

:::tip
Jeśli nie widzisz opcji Settings, poproś osobę, która skonfigurowała konto Twojego kościoła, o nadanie Ci uprawnienia „Edit Church Settings”. Szczegóły znajdziesz w artykule [Role i uprawnienia](../settings/roles-permissions.md).
:::

## Tworzenie pierwszej podstrony

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Website** i kliknij **Pages**.
2. Kliknij **Add Page** w prawym górnym rogu.
3. Wybierz **Blank** jako typ strony i nazwij ją „Home”.
4. Kliknij **Page Settings** i ustaw ścieżkę URL na `/` (sam ukośnik bez tekstu) dla strony głównej. Pozostałe strony używają formatu `/nazwa-strony`.
5. Kliknij **Edit Content**, aby rozpocząć budowanie. Każda strona musi zaczynać się od **Section** — jest to kontener dla wszystkich pozostałych elementów.
6. Po dodaniu sekcji kliknij ponownie **Add Content**, aby wstawić tekst, obrazy, filmy, karty, formularze i inne elementy, przeciągając je do sekcji.

:::info
Szczegółowe instrukcje dotyczące pracy ze stronami i nawigacją znajdziesz w artykule [Zarządzanie stronami](./managing-pages.md). Pełny przewodnik po wizualnym edytorze znajdziesz w artykule [Korzystanie z edytora stron](./page-editor.md).
:::

## Konfiguracja wyglądu strony

1. W menu Jump wybierz **Website > Appearance**.
2. Użyj **Color Palette**, aby ustawić kolory marki dla tonów podstawowego, drugorzędnego i akcentowego.
3. W sekcji **Fonts** wybierz czcionki nagłówków i tekstu z przeglądarki czcionek.
4. Prześlij logo kościoła w sekcji **Logo** w ustawieniach stylu. Podaj wersję z jasnym tłem i wersję z ciemnym tłem.
5. Skonfiguruj **Site Footer**, dodając dane kontaktowe kościoła i linki.

:::info
Zmiany wprowadzone w sekcji Appearance obowiązują w całej Twojej stronie internetowej. Szczegółowe instrukcje dotyczące każdego ustawienia znajdziesz na stronie [Appearance](./appearance.md).
:::

## Konfiguracja nawigacji

Linki nawigacyjne są widoczne w widoku Website Pages. Aby je uporządkować:

1. Kliknij **Add**, aby utworzyć nowy link nawigacyjny i wskazać nim jedną z Twoich stron.
2. Przeciągnij i upuść linki, aby zmienić ich kolejność lub zagnieździć je pod elementami nadrzędnymi.
3. Wyświetl podgląd swojej strony, aby upewnić się, że nawigacja wygląda poprawnie.

## Kolejne kroki

- [Zarządzanie stronami](./managing-pages.md) — Dowiedz się szczegółowo, jak pracować ze stronami i nawigacją
- [Appearance](./appearance.md) — Dopracuj kolory, czcionki i układ swojej strony
- [Pliki](./files.md) — Prześlij obrazy i dokumenty na swoją stronę internetową
