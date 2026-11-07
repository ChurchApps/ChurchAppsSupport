---
title: "Zarządzanie kazaniami"
description: "Zarządzaj biblioteką kazań w B1 Admin: dodawaj kazania z YouTube, Vimeo lub Facebooka, edytuj szczegóły i uzyskaj kanał podcastu dla swojego kościoła."
---

# Zarządzanie kazaniami

<div class="article-intro">

Strona Kazania wyświetla całą bibliotekę kazań. Stąd możesz dodawać nowe kazania, edytować istniejące wpisy i porządkować treści według playlist. Każde kazanie może być połączone z wideo lub audio hostowanym na YouTube, Vimeo, Facebooku lub niestandardowym adresie URL.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnienia **contentApi.streamingServices.edit**. Jeśli nie masz dostępu, zobacz [Role i uprawnienia](../settings/roles-permissions.md).
- Utwórz co najmniej jedną [playlistę](./playlists.md), do której przypiszesz kazania
- Przygotuj identyfikatory wideo lub adresy URL z YouTube, Vimeo lub Facebooka

</div>

## Przeglądanie biblioteki kazań

1. W B1 Admin otwórz [menu skoków](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Kazania** i kliknij **Kazania**.
2. Strona Kazania wyświetla wpisy kazań w tabeli, z kolumnami **Playlista**, tytuł i **Data publikacji**. Użyj pola wyszukiwania nad tabelą, aby filtrować listę. Twoje playlisty są wymienione w panelu **Playlisty** obok tabeli.
3. Kliknij **Edytuj** w wierszu wybranego kazania, aby zobaczyć lub zmienić jego szczegóły.

## Dodawanie kazania

1. Kliknij przycisk **Dodaj kazanie** w prawym górnym rogu i wybierz **Dodaj kazanie** z listy rozwijanej.
2. Wybierz **Playlistę**, do której ma zostać przypisane kazanie.
3. Wybierz **Dostawcę wideo**: YouTube, Vimeo, Facebook lub Niestandardowy adres URL. Polecamy YouTube, ponieważ najlepiej współpracuje z systemem B1.
4. Wpisz identyfikator wideo lub adres URL i kliknij **Pobierz**. W przypadku YouTube identyfikator wideo to ciąg znaków występujący po `v=` w adresie URL YouTube.
5. Po kliknięciu **Pobierz** szczegóły kazania są importowane automatycznie, w tym data publikacji, czas trwania, tytuł, opis i miniatura.
6. Wprowadź potrzebne zmiany i kliknij **Zapisz**.

:::tip
Możesz też dodać stały adres URL transmisji na żywo, wybierając **Dodaj stały adres URL na żywo** z listy rozwijanej **Dodaj kazanie**. Tworzy to trwałe połączenie z transmisją na żywo Twojego kanału YouTube, korzystając z Twojego identyfikatora kanału. Więcej informacji znajdziesz w sekcji [Transmisje na żywo](./live-streaming.md).
:::

## Edytowanie kazania

1. Kliknij **Edytuj** w wierszu wybranego kazania w bibliotece, aby otworzyć jego szczegóły.
2. W razie potrzeby zaktualizuj tytuł, mówcę, datę, opis, miniaturę lub linki do multimediów.
3. Kliknij **Zapisz**, aby zastosować zmiany.

## Szczegóły kazania

Każdy wpis kazania może zawierać:

- **Tytuł** -- Nazwa kazania wyświetlana odwiedzającym
- **Mówca** -- Osoba, która wygłosiła kazanie
- **Data** -- Data publikacji lub wygłoszenia
- **Opis** -- Streszczenie treści kazania
- **Miniatura** -- Podgląd obrazu wyświetlany w bibliotece kazań
- **Linki do wideo/audio** -- Adresy URL multimediów kazania na YouTube, Vimeo, Facebooku lub niestandardowym hostingu
- **Adres pliku audio (dla podcastu)** -- Bezpośredni link do pliku MP3/M4A z tym kazaniem. Możesz wkleić adres URL lub kliknąć **Prześlij audio**, aby przesłać plik i automatycznie wypełnić to pole. Do kanału podcastu trafiają tylko kazania, w których ustawiono to pole (lub bezpośredni link do pliku wideo).

## Twój kanał podcastu

Gdy co najmniej jedno kazanie ma dołączony plik audio lub wideo, B1 Admin automatycznie generuje dla Twojego kościoła kanał podcastu RSS. Nie trzeba go niczym włączać. Znajdziesz go w panelu **Kanał podcastu** pod listą kazań: kliknij ikonę kopiowania, aby skopiować adres kanału, a następnie zgłoś ten adres w Apple Podcasts, Spotify lub innym katalogu podcastów.

:::info
Kazania, które tylko odsyłają do osadzonego odtwarzacza (na przykład identyfikatora wideo z YouTube lub Vimeo), nie pojawią się w kanale podcastu, ponieważ aplikacje podcastowe wymagają bezpośredniego pliku multimedialnego do pobrania. Aby uwzględnić kazanie, dodaj **Adres pliku audio**.
:::

## Planowanie kazania do transmisji na żywo

Po dodaniu kazania możesz zaplanować jego emisję na stronie transmisji na żywo:

1. W menu skoków wybierz **Kazania > Czasy transmisji na żywo**.
2. Edytuj nabożeństwo, a w sekcji **Ustawienia wideo** wybierz swoje kazanie z listy rozwijanej.
3. Kazanie zostanie odtworzone o zaplanowanej porze nabożeństwa.

:::info
Aby zaimportować wiele kazań naraz zamiast dodawać je pojedynczo, skorzystaj z narzędzia [Import zbiorczy](./bulk-import.md), które pobiera filmy bezpośrednio z Twojego konta YouTube lub Vimeo.
:::

## Następne kroki

- [Playlisty](./playlists.md) -- Porządkowanie kazań w serie
- [Transmisje na żywo](./live-streaming.md) -- Konfiguracja harmonogramu transmisji
- [Import zbiorczy](./bulk-import.md) -- Import wielu kazań naraz
