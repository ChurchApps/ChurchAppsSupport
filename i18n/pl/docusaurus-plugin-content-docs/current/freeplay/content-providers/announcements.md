---
title: "Ogłoszenia"
description: "Zapętlanie folderu slajdów na telewizorze FreePlay przed nabożeństwem lub lekcją: wybór folderu dostawcy, synchronizacja i wyłączenie po zakończeniu."
---

# Ogłoszenia

<div class="article-intro">

FreePlay może w pętli wyświetlać na telewizorze folder slajdów z ogłoszeniami, na przykład w holu lub przed rozpoczęciem zajęć. Wybierasz folder u jednego z podłączonych dostawców treści, FreePlay pobiera jego slajdy na urządzenie, a w pasku bocznym pojawia się pozycja **Ogłoszenia**, dzięki której możesz w dowolnym momencie uruchomić pętlę.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- [Połącz się z dostawcą treści](./connecting-providers.md), który przechowuje Twoje slajdy z ogłoszeniami, na przykład Dropbox lub OneDrive
- Umieść obrazy lub filmy, które chcesz zapętlić, razem w jednym folderze u tego dostawcy

</div>

## Wybieranie folderu ogłoszeń

1. Otwórz **Ustawienia** na dole paska bocznego, a następnie wybierz **Dostawcy**
2. Wybierz połączonego dostawcę, który przechowuje Twoje slajdy (ma oznaczenie **Połączono**), aby otworzyć jego **Ustawienia dostawcy**
3. Wybierz **Użyj do ogłoszeń**
4. Otworzy się przeglądarka **Wybierz folder ogłoszeń**. Przechodź między folderami, aż znajdziesz ten z slajdami, a następnie wybierz ten folder (lub dowolny plik w jego środku)
5. FreePlay pobierze slajdy i wróci do **Ustawień dostawcy**, gdzie wiersz będzie teraz wyświetlał: **Zapętlanie „*nazwa folderu*” -- *liczba* slajdów pobranych**

Jednocześnie używany jest tylko jeden folder ogłoszeń. Wybór folderu od innego dostawcy zastępuje poprzedni.

## Odtwarzanie ogłoszeń

Gdy slajdy zostaną pobrane, pozycja **Ogłoszenia** pojawi się blisko góry paska bocznego (poniżej **Plan na dziś**, jeśli Twój telewizor ją wyświetla). Wybierz ją, aby uruchomić pętlę.

- Obrazy pozostają na ekranie przez 15 sekund, chyba że dostawca przypisał plikowi własny czas wyświetlania
- Filmy są odtwarzane do końca, zanim przejdzie się do następnego slajdu
- Po ostatnim slajdzie pętla zaczyna się od nowa, od pierwszego
- Jeśli folder zawiera jeden film, będzie on powtarzany w miejscu

Pętla odtwarzana jest z plików zapisanych na urządzeniu, więc działa bez połączenia z internetem. Możesz używać tych samych przycisków pilota co przy każdej innej treści -- zobacz [Odtwarzanie treści](./playing-content.md).

## Aktualizowanie slajdów

FreePlay sprawdza folder ogłoszeń za każdym razem, gdy aplikacja się uruchamia, pobiera nowe slajdy i usuwa te, które zostały usunięte z folderu.

Aby sprawdzić od razu, otwórz **Ustawienia dostawcy** i wybierz **Sprawdź aktualizacje ogłoszeń**. Po zakończeniu wiersz pokaże **Aktualne** wraz z liczbą slajdów.

:::info
Jeśli FreePlay nie może połączyć się z dostawcą lub folder jest pusty, nadal odtwarza slajdy, które już ma. Aby całkowicie przestać korzystać z ogłoszeń, wyłącz je w sposób opisany poniżej.
:::

:::warning
Slajd zastąpiony nową wersją pod tą samą nazwą pliku nie zostanie pobrany ponownie. Aby zmienić slajd, dodaj go jako nowy plik i usuń stary.
:::

## Wyłączanie ogłoszeń

Otwórz **Ustawienia dostawcy** i ponownie wybierz **Użyj do ogłoszeń**. FreePlay przestanie korzystać z folderu, usunie pobrane slajdy z urządzenia i usunie **Ogłoszenia** z paska bocznego.

Odłączenie dostawcy również wyłącza ogłoszenia pochodzące od niego.

## Powiązane artykuły

- **[Łączenie z dostawcami](./connecting-providers.md)** - Połącz dostawcę, który przechowuje Twoje slajdy
- **[Przeglądanie i pobieranie treści](./browsing-content.md)** - Przeglądaj foldery dostawcy i odtwarzaj treści na żądanie
- **[Odtwarzanie treści](./playing-content.md)** - Sterowanie odtwarzaniem za pomocą pilota telewizora
