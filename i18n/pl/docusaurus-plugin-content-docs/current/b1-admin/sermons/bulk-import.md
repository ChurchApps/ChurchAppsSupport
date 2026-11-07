---
title: "Import masowy"
description: "Zaimportuj zbiorczo filmy z kazaniami z kanału YouTube lub konta Vimeo do B1 Admin, a następnie uporządkuj je w playlistę."
---

# Import masowy

<div class="article-intro">

Strona Import masowy pozwala szybko wypełnić bibliotekę kazań, importując filmy z YouTube lub Vimeo. To najszybszy sposób na przeniesienie istniejących treści kazań, zamiast dodawania każdego filmu osobno.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnienia **contentApi.streamingServices.edit**. Jeśli nie masz dostępu, zobacz [Role i uprawnienia](../settings/roles-permissions.md).
- Utwórz co najmniej jedną [playlistę](./playlists.md), do której zaimportujesz kazania
- Przygotuj identyfikator kanału YouTube lub dane konta Vimeo

</div>

## Wybór źródła

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Kazania** i kliknij **Kazania**. Kliknij **Dodaj kazanie** i wybierz **Import masowy** z menu.
2. W sekcji **Wybierz źródło importu** zobaczysz dwie opcje:
   - **YouTube** -- import filmów z kanału YouTube
   - **Vimeo** -- import filmów z konta Vimeo
3. Kliknij opcję platformy, na której znajdują się Twoje kazania (lub kliknij **Importuj z YouTube** / **Importuj z Vimeo** pod jej opisem). Kliknij **Wstecz** u góry strony, aby wrócić do wyboru źródła.

:::tip
Jeśli masz filmy na obu platformach, możesz w dowolnym momencie wrócić i zmienić źródło.
:::

## Przed importem

Zanim zaimportujesz filmy, potrzebujesz co najmniej jednej playlisty, do której zostaną przypisane. Jeśli nie utworzyłeś jeszcze żadnej playlisty:

1. Wróć na stronę **Kazania** i znajdź panel **Playlisty**.
2. Kliknij **Utwórz pierwszą playlistę** i wypełnij nazwę, opis, datę publikacji oraz miniaturę.
3. Kliknij **Zapisz**, a następnie wróć do importu masowego, klikając **Dodaj kazanie** i wybierając **Import masowy**.

Szczegółowe instrukcje dotyczące tworzenia i zarządzania playlistami znajdziesz na stronie [Playlisty](./playlists.md).

## Importowanie filmów

1. Po wybraniu YouTube lub Vimeo wpisz **identyfikator kanału YouTube** lub **dane konta Vimeo** w odpowiednim polu.
2. Kliknij przycisk **Pobierz**, aby pobrać wszystkie dostępne filmy z kanału lub konta.
3. Po pobraniu zobaczysz listę wszystkich filmów z polami wyboru.
4. Zaznacz pola obok filmów, które chcesz zaimportować. Możesz zaznaczyć wszystkie lub wybrać konkretne.
5. Opcjonalnie włącz **Automatyczny import nowych filmów**, aby nowe przesyłane filmy były automatycznie dodawane do biblioteki.
6. Kliknij listę rozwijaną **Importuj do playlisty**, aby wybrać playlistę, do której mają trafić te filmy.
7. Kliknij przycisk **Importuj**, aby zakończyć import masowy.

Filmy zostaną zaimportowane wraz ze wszystkimi szczegółami, w tym tytułami, opisami, datami i miniaturami. Znaki specjalne w tytułach i opisach z YouTube, takie jak `&`, apostrofy i cudzysłowy, zostaną zachowane w oryginalnej postaci, a nie zamienione na kody typu `&amp;`.

:::info
Import masowy sprawdza się najlepiej przy rozpoczynaniu pracy, gdy przenosisz treści z innej platformy. Aby w przyszłości dodawać pojedyncze kazania, skorzystaj ze strony [Zarządzanie kazaniami](./managing-sermons.md).
:::

## Następne kroki

- [Zarządzanie kazaniami](./managing-sermons.md) -- edycja szczegółów zaimportowanych kazań
- [Playlisty](./playlists.md) -- tworzenie i zarządzanie seriami kazań
- [Transmisje na żywo](./live-streaming.md) -- konfiguracja transmisji na żywo dla Twoich nabożeństw
