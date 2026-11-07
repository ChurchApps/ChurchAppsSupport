---
title: "Zarządzanie ekranami i grupami"
description: "Sprawdź, czy telewizory FreePlay są online i gotowe na niedzielę, edytuj ustawienia ekranów i twórz grupy z jednym kalendarzem w FreePlay Admin."
---

# Zarządzanie ekranami i grupami

<div class="article-intro">

Strona **Ekrany** w FreePlay Admin wyświetla wszystkie telewizory sparowane z Twoim kościołem wraz z tym, co aktualnie odtwarzają, i informacją, czy są gotowe na niedzielę. Tutaj zarządzasz także **grupami ekranów**. Ekrany w tej samej grupie korzystają z jednego kalendarza i jednej domyślnej pętli.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zaloguj się do FreePlay Admin pod adresem [admin.freeplay.church](https://admin.freeplay.church)
- [Sparuj co najmniej jeden ekran](./pairing-a-screen.md)

</div>

## Strona Ekrany

U góry trzy liczby dają szybki przegląd stanu:

- **Online teraz** - Ekrany, które melidowały się w ciągu ostatnich 15 minut
- **Gotowe na niedzielę** - Liczba zaplanowanych ekranów, które pobrały wszystko aż do najbliższej niedzieli
- **Wymaga uwagi** - Ekrany, które są offline lub brakuje im plików

Poniżej użyj pola **Szukaj ekranów**, aby znaleźć ekran po etykiecie, grupie lub tym, co odtwarza. Filtry pozwalają zawęzić listę do **Wszystkie**, **Zaplanowane**, **Ręczne**, **Wymaga uwagi** lub jednej grupy. Przełącznik po prawej stronie pozwala przechodzić między widokami **Tabela** i **Siatka**.

Każdy ekran pokazuje:

- **Etykietę** i model urządzenia
- **Grupę**
- **Tryb** - **Zaplanowany** lub **Ręczny**
- **Teraz odtwarzane** - Co jest właśnie wyświetlane. Ekrany ręczne pokazują **Sala lekcyjna · nauczyciel naciska Start**
- **Gotowe do** - Data, do której ekran pobrał pliki. Jeśli pliki się nie pobrały, zamiast tego wyświetla się **Brakuje N plików**. Nowy ekran pokazuje **Oczekiwanie na pierwszą synchronizację**
- **Ostatnio widziany** - Kiedy ekran ostatnio się zgłosił. Ekran, który nie zgłaszał się przez dłuższy czas, pokazuje **Offline**, a ekran, który nigdy nie połączył się, pokazuje **Nigdy nie widziany**

Użyj **Wyświetl**, aby odtworzyć kalendarz ekranu w przeglądarce, albo **Edytuj**, aby zmienić jego ustawienia.

## Podgląd ekranu

Kliknij etykietę ekranu, aby otworzyć jego stronę. Po lewej stronie:

- **Wyświetl w przeglądarce** - Odtwórz kalendarz tego ekranu na pełnym ekranie w przeglądarce, tak jak wyglądałby na telewizorze. Zobacz [Wyświetlanie z przeglądarki](./scheduled-playback.md#presenting-from-a-browser)
- **Edytuj** - Zmień etykietę, grupę lub tryb
- **Więcej** > **Rozparuj** - Rozłącz telewizor. Wróci on do wyświetlania kodu parowania

Pozostała część strony zawiera następujące sekcje:

- **Teraz i następnie** - Co jest odtwarzane teraz i do kiedy, a następnie wszystko zaplanowane na kolejne 7 dni. Kliknij **Otwórz kalendarz**, aby przejść do kalendarza tej grupy
- **Pobrania** - **Gotowe do** daty, gdy wszystko jest pobrane, lub lista brakujących plików
- **Urządzenie** - Identyfikator urządzenia, platforma, model, wersja aplikacji FreePlay, adres IP, wykorzystana i wolna pamięć, ostatnie zgłoszenie oraz tryb
- **Ostatnie** - Najnowsza aktywność zgłoszona przez ekran

:::tip
Jeśli ekran pokazuje brakujące pliki, upewnij się, że jest online i ma wolne miejsce w pamięci. Telewizor sam pobierze brakujące pliki przy następnym zgłoszeniu się.
:::

## Edytowanie ekranu

1. Kliknij **Edytuj** obok ekranu lub na jego stronie.
2. Zmień **Etykietę**, **Grupę** lub **Tryb** (**Zaplanowany** lub **Ręczny**).
3. Kliknij **Zapisz**.

Przeniesienie ekranu do innej grupy przełącza go na kalendarz tej grupy.

## Grupy ekranów

Grupa ekranów to zestaw ekranów, które jednocześnie odtwarzają tę samą treść, na przykład „Lobby” lub „Skrzydło dziecięce”. Każda grupa ma własny kalendarz i może mieć **domyślną pętlę**, która odtwarza się, gdy nic nie jest zaplanowane.

Aby zarządzać grupami, kliknij **Grupy** na górze strony **Ekrany**. Lista **Grupy ekranów** pokazuje nazwę każdej grupy, liczbę ekranów i jej domyślną pętlę. Kliknij **Ekrany**, aby wrócić.

### Dodawanie grupy

1. W widoku **Grupy ekranów** kliknij **Dodaj grupę**.
2. Wpisz **Nazwę**, na przykład „Lobby”.
3. Wybierz playlistę jako **Domyślną pętlę** lub pozostaw ustawienie **Brak — ekran gaśnie**.
4. Kliknij **Zapisz**.

Grupę możesz też utworzyć podczas parowania ekranu, wybierając **＋ Nowa grupa…** w polu **Grupa**.

### Edytowanie lub usuwanie grupy

1. Kliknij **Edytuj** obok grupy.
2. Zmień nazwę lub domyślną pętlę, a następnie kliknij **Zapisz**.
3. Aby usunąć grupę, kliknij **Usuń** i potwierdź.

:::warning
Usunięcie grupy usuwa również jej harmonogram. Ekrany w tej grupie gasną, dopóki nie przeniesiesz ich do innej grupy.
:::

## Powiązane artykuły

- **[Parowanie ekranu](./pairing-a-screen.md)** - Dodaj nowy telewizor
- **[Planowanie kalendarza](./scheduling-the-calendar.md)** - Ustaw, co odtwarza każda grupa, i jej domyślną pętlę
- **[Zaplanowane odtwarzanie na telewizorze](./scheduled-playback.md)** - Co oznacza data „Gotowe do” na samym telewizorze
