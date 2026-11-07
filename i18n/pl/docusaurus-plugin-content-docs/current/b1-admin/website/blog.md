---
title: "Blog"
---

# Blog

<div class="article-intro">

Na stronie Blog możesz publikować wiadomości, aktualizacje i rozważania na stronie internetowej swojego kościoła. Wpisy pojawiają się na liście kart pod adresem `/blog`, pod własnym adresem URL oraz w kanale RSS, który inne narzędzia (np. Zapier) mogą śledzić pod kątem nowych wpisów.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Wykonaj [wstępną konfigurację](initial-setup) swojej strony internetowej
- Jeśli chcesz, aby odwiedzający znajdowali Twój blog w menu, dodaj link nawigacyjny do `/blog` w [Zarządzaniu stronami](managing-pages)

</div>

## Dostęp do bloga

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu) i rozwiń pozycję **Website**.
2. Kliknij **Blog**.
3. Strona Blog wyświetla wszystkie wpisy wraz z ich stanem i datą publikacji.

## Dodawanie wpisu

1. Kliknij **Add Post** w prawym górnym rogu.
2. Wpisz **Title**. Przyjazny dla adresu URL **Web address** (slug) jest generowany automatycznie podczas pisania -- możesz go edytować bezpośrednio, jeśli chcesz inny adres.
3. Dodaj **Excerpt** -- krótkie streszczenie wyświetlane na liście wpisów, w metaopisach i w kanale RSS. Jeśli pozostawisz to pole puste, zostanie ono automatycznie wygenerowane na podstawie początku treści wpisu.
4. Napisz treść wpisu w edytorze **Content**, używając Markdown. Kliknij **Preview**, aby zobaczyć, jak będzie wyglądał sformatowany wpis.
5. Wybierz **Category** (istniejącą lub wpisz nową) oraz opcjonalnie **Tags** oddzielone przecinkami.
6. Kliknij **Select Image**, aby wybrać zdjęcie z galerii [Files](files), lub prześlij nowe. Przesłane zdjęcia otwierają się we wbudowanym narzędziu do kadrowania, zablokowanym na proporcje 16:9, dzięki czemu możesz tak wykadrować dowolne zdjęcie, aby pasowało do nagłówka wpisu i kart na liście.
7. Ustaw **Author** -- domyślnie jesteś nim Ty, ale możesz wyszukać i wybrać dowolną osobę z bazy danych.
8. Włącz **Published** i ustaw **Publish Date**, gdy wpis ma być publiczny. Pozostaw wyłączone, aby zapisać wpis jako szkic.

:::tip
Ustaw **Publish Date** na przyszłą datę, aby zaplanować wpis. Pozostaje on ukryty przed odwiedzającymi i wyświetla znacznik **Scheduled** na liście blogów do momentu nadejścia tej daty.
:::

## Stany wpisów

Każdy wpis na liście pokazuje jeden z trzech stanów:

- **Draft** -- Niepublikowany. Widoczny tylko w panelu administracyjnym.
- **Scheduled** -- Opcja Published jest włączona, ale data publikacji jest w przyszłości.
- **Published** -- Opublikowany na Twojej stronie internetowej i uwzględniony w kanale RSS.

## Edytowanie, podgląd i usuwanie wpisów

- Kliknij **Edit** obok wpisu, aby wprowadzić zmiany.
- Kliknij **View on Site** (widoczne przy opublikowanych wpisach), aby otworzyć opublikowany wpis na swojej stronie w nowej karcie.
- Kliknij **Delete**, aby trwale usunąć wpis.

## Jak odwiedzający widzą Twój blog

Opublikowane wpisy pojawiają się pod adresem `{yoursite}/blog`, po 10 na stronę, z linkami **Older**/**Newer** do przeglądania archiwum, a także z filtrem kategorii oraz autorem i zdjęciem każdego wpisu. Tagi są również wyświetlane jako klikalne znaczniki, dzięki czemu odwiedzający mogą filtrować listę według tagów w ten sam sposób. Pojedyncze wpisy znajdują się pod adresem `{yoursite}/blog/{slug}` i zawierają powiązane wpisy z tej samej kategorii. Strona bloga udostępnia również kanał RSS, który jest automatycznie wykrywany przez czytniki kanałów i narzędzia automatyzacji, takie jak Zapier.

:::info
Wpisy na blogu to osobny typ treści niż zwykłe strony internetowe -- nie są tworzone w [edytorze stron](page-editor) i nie pojawiają się na liście Pages. Dzięki temu tworzenie wpisów na blogu jest szybkie i skupia się na pisaniu.
:::

## Dodawanie komentarzy pod wpisami

B1 nie hostuje samodzielnie komentarzy do bloga, ale możesz dodać usługę komentarzy. Możesz też umieścić pod każdym wpisem dowolny inny element, np. formularz zapisu do newslettera lub przycisk darowizn.

1. Zarejestruj się w usłudze komentarzy, takiej jak [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) lub [Disqus](https://disqus.com), i skopiuj jej kod osadzania.
2. Na stronie Blog przewiń do sekcji **Below Every Post**.
3. Wklej kod osadzania i kliknij **Save**.

Kod pojawi się pod treścią każdego opublikowanego wpisu. Usługa komentarzy zajmuje się moderacją i filtrowaniem spamu, dlatego regularnie sprawdzaj jej panel.

:::tip
Wyczyść pole i kliknij **Save**, aby usunąć kod ze wszystkich wpisów. To pole widzą tylko osoby, które mogą edytować ustawienia kościoła.
:::

## Następne kroki

- [Zarządzanie stronami](managing-pages) -- dodaj link nawigacyjny do swojego bloga
- [Files](files) -- prześlij zdjęcia do użycia we wpisach
- [Integracja z Zapier](../integrations/zapier.md) -- uruchamiaj automatyzacje po opublikowaniu nowych wpisów
