---
title: "Parowanie ekranu"
description: "Sparuj telewizor FreePlay z kalendarzem grupy ekranów w FreePlay Admin czteroliterowym kodem z telewizora, by samodzielnie odtwarzał treści z harmonogramu."
---

# Parowanie ekranu

<div class="article-intro">

Aby dodać telewizor do kalendarza, sparuj go z **FreePlay Admin**. Telewizor wyświetla czteroliterowy kod. Wpisujesz ten kod na stronie [admin.freeplay.church](https://admin.freeplay.church) i wybierasz grupę ekranów, której kalendarz ma być używany. Parowanie wykonujesz tylko raz dla każdego telewizora.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj i uruchom FreePlay na telewizorze. Zobacz [Pierwsze kroki](../getting-started/index.md)
- Miej dane logowania do ChurchApps dla swojego kościoła, aby móc zalogować się do FreePlay Admin
- Opcjonalnie najpierw [utwórz playlistę](./building-playlists.md) i [zaplanuj ją](./scheduling-the-calendar.md), aby telewizor od razu miał co odtwarzać

</div>

## Wyświetlanie kodu na telewizorze

1. Na telewizorze otwórz **Ustawienia** na dole paska bocznego.
2. Wybierz **Sparuj z kalendarzem**. Wiersz pokazuje **Nie sparowano**, dopóki telewizor nie zostanie sparowany.
3. Ekran **Sparuj ten ekran** wyświetla kod QR i czteroliterowy kod parowania, a także komunikat **Zeskanuj telefonem lub wejdź na freeplay.church/pair i wpisz ten kod**.
4. Pod kodem **Oczekiwanie na potwierdzenie** miga, dopóki FreePlay czeka, aż zakończysz parowanie.

Kod jest ważny przez 15 minut, a odliczanie pod nim pokazuje, ile czasu pozostało. Gdy czas minie, FreePlay sam wyświetli nowy kod. Możesz też wybrać **Wygeneruj nowy kod**, aby otrzymać świeży kod, albo **Anuluj**, aby wrócić do Ustawień.

## Parowanie w FreePlay Admin

1. Zeskanuj kod QR telefonem lub wejdź na stronę **freeplay.church/pair** na dowolnym komputerze lub telefonie. Jeśli zostaniesz poproszony, zaloguj się. FreePlay Admin otworzy formularz **Sparuj ekran** z już wpisanym kodem.
   - Formularz możesz też otworzyć samodzielnie. Przejdź do **Ekrany** w FreePlay Admin i kliknij **Sparuj ekran**.
2. Sprawdź **Kod parowania**. To cztery litery widoczne na telewizorze.
3. Wpisz **Etykietę**, aby odróżnić ten telewizor od innych, na przykład „Lewa strona holu”. To pole jest opcjonalne.
4. W polu **Grupa** wybierz grupę ekranów, której kalendarz ma śledzić ten telewizor. Aby utworzyć nową, wybierz **＋ Nowa grupa…** i wpisz **Nazwę nowej grupy**.
5. W polu **Tryb** pozostaw wybrane **Zaplanowany**. Telewizor będzie odtwarzać treści zgodnie z kalendarzem grupy, bez dodatkowych działań.
6. Kliknij **Sparuj**.

Telewizor wyświetli **Połączono!**, a następnie **Wczytywanie harmonogramu...**. Pobierze zaplanowane treści i rozpocznie odtwarzanie. Zobacz [Odtwarzanie zaplanowane na telewizorze](./scheduled-playback.md).

:::info
Jeśli FreePlay Admin wyświetli komunikat **Ten kod nie pasuje do żadnego telewizora**, sprawdź kod na ekranie. Jeśli wygasł, użyj nowego kodu, który telewizor wyświetla teraz.
:::

### Tryb zaplanowany a ręczny

Ustawienie **Tryb** ma dwie opcje:

- **Zaplanowany** - Odtwarza treści zgodnie z kalendarzem grupy, bez udziału użytkownika. Nikt nie musi naciskać Start.
- **Ręczny** - Treści wybiera osoba za pomocą pilota. Ekran ręczny nadal pojawia się na liście **Ekrany**, ale nie korzysta z kalendarza, dlatego pole **Grupa** jest wyłączone.

Tryb ekranu możesz później zmienić, klikając **Edytuj** na [stronie Ekrany](./managing-screens.md).

## Parowanie z planem nabożeństwa

Kod z ekranu **Sparuj ten ekran** działa również w B1 Admin. Jeśli wpiszesz go tam i wybierzesz typ planu w polu **Pokaż plany dla**, telewizor będzie wyświetlał ten typ planu w [Trybie planu](../plan-mode/index.md) zamiast kalendarza. Zobacz [Parowanie urządzenia](../plan-mode/device-pairing.md).

## Zmiana lub usuwanie parowania na telewizorze

Gdy telewizor jest sparowany, wiersz **Sparuj z kalendarzem** w **Ustawieniach** pokazuje nazwę grupy ekranów, którą śledzi. Wybierz ten wiersz, aby otworzyć okno **Sparowano z**, które ma trzy opcje:

- **Powrót do harmonogramu** - Zamyka okno i wraca do odtwarzacza zaplanowanego. Parowanie się nie zmienia.
- **Usuń parowanie** - Przestaje śledzić harmonogram. FreePlay otwiera ekran **Dostawcy treści**.
- **Sparuj z innym kalendarzem** - Usuwa parowanie, a następnie wyświetla nowy kod parowania, abyś mógł ponownie sparować telewizor.

:::warning
Usunięcie parowania kasuje pliki, które FreePlay pobrał dla tego kalendarza.
:::

## Usuwanie parowania w FreePlay Admin

1. Przejdź do **Ekrany** i kliknij nazwę ekranu.
2. Kliknij **Więcej**, a następnie **Usuń parowanie**.
3. Kliknij ponownie **Usuń parowanie**, aby potwierdzić.

Telewizor wróci do wyświetlania kodu parowania. Gdy chcesz go ponownie użyć, sparuj go jeszcze raz.

## Powiązane artykuły

- **[Zarządzanie ekranami i grupami](./managing-screens.md)** - Zmień nazwę ekranu, przenieś go do innej grupy lub sprawdź jego pobrane pliki
- **[Planowanie kalendarza](./scheduling-the-calendar.md)** - Ustal, co odtwarzają ekrany grupy
- **[Wybór trybu parowania](../getting-started/pairing-modes.md)** - Porównaj tryb zaplanowany z Trybem planu oraz samodzielnym przeglądaniem dostawców
