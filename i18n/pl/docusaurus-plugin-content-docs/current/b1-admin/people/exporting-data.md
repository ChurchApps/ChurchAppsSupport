---
title: "Eksportowanie danych"
description: "Eksportuj osoby do CSV, listy członków grup lub pełną kopię bazy B1 z B1 Admin, i sprawdź, co zawiera archiwum B1 Export Zip."
---

# Eksportowanie danych

<div class="article-intro">

B1 Admin umożliwia eksport danych Twojego kościoła, abyś mógł je wykorzystać w arkuszach kalkulacyjnych, udostępnić zespołowi lub zachować jako kopię zapasową. Niezależnie od tego, czy potrzebujesz szybkiej listy imion i adresów e-mail, czy pełnego eksportu bazy danych, dostępne są opcje dopasowane do Twoich potrzeb.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz aktywnego konta B1 Admin z uprawnieniami do przeglądania danych, które chcesz wyeksportować. Jeśli nie masz pewności co do swojego poziomu dostępu, zobacz [Role i uprawnienia](roles-permissions.md).
- Do pełnego eksportu bazy danych potrzebujesz dostępu do sekcji **Ustawienia**.

</div>

## Eksport ze strony Osoby

Najszybszy sposób na wyeksportowanie katalogu to bezpośrednio ze strony **Osoby**:

1. Otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pole wyszukiwania w lewym górnym rogu B1 Admin), rozwiń **Osoby** i kliknij **Osoby**.
2. Użyj pola wyszukiwania lub filtrów, aby zawęzić wyniki, które chcesz wyeksportować (lub pozostaw widok bez filtrów, aby wyeksportować wszystkie osoby). Wskazówki dotyczące filtrowania znajdziesz w artykule [Wyszukiwanie osób](searching-people.md).
3. Kliknij przycisk **Eksportuj** w nagłówku strony Osoby.
4. Na Twój komputer zostanie pobrany plik CSV z osobami znajdującymi się obecnie w wynikach, wraz z ich imieniem i nazwiskiem, danymi kontaktowymi, adresem i innymi standardowymi polami.

:::tip
Eksport obejmuje wszystkie osoby z bieżących wyników. Przed eksportem wykonaj wyszukiwanie, wczytaj [Zapisaną listę](./lists.md) lub skorzystaj najpierw z wyszukiwania **Zaawansowane**, aby wyeksportować tylko osoby, których potrzebujesz.
:::

## Pełny eksport danych z Ustawień

Aby wykonać pełny eksport wszystkich danych B1 (nie tylko osób), użyj narzędzia eksportu w sekcji Ustawienia:

1. W menu Jump wybierz **Ustawienia > Ustawienia**.
2. Kliknij łącze **Import/Eksport** pod nazwą swojego kościoła, w górnej części lewego menu ustawień.
3. Wybierz **B1 Database** z listy rozwijanej **Źródło danych**.
4. Przejrzyj podgląd danych i kliknij **Przejdź do miejsca docelowego**.
5. Jako miejsce docelowe eksportu wybierz **B1 Export Zip**.
6. Obserwuj postęp eksportu, aż wszystkie elementy pokażą zielone znaczniki wyboru.
7. Plik eksportu zostanie pobrany automatycznie. Poszukaj pliku `B1Export` w folderze pobranych plików.
8. Rozpakuj plik, aby uzyskać dostęp do poszczególnych plików CSV (takich jak `people.csv`), które możesz otworzyć w Excelu, Arkuszach Google lub Numbers.

:::info
B1 Export Zip to pełna kopia zapasowa danych Twojego kościoła. Zawiera:

- osoby (ze zdjęciami) oraz rodziny, w tym kontakty do odbioru dzieci z rodziny
- kampusy, nabożeństwa i godziny nabożeństw
- grupy i członków grup
- fundusze i darowizny, w tym dary rozdzielone na kilka funduszy
- frekwencję
- formularze, pytania, zgłoszenia i odpowiedzi
- pola niestandardowe i ich wartości
- zapisane listy osób

Jeśli zdjęcia osoby nie mogą zostać pobrane lub odczytane podczas eksportu, zdjęcie to zostanie pominięte, a eksport będzie kontynuowany bez niego.

Aby przywrócić dane, wybierz **B1 Import Zip** jako źródło i **B1 Database** jako miejsce docelowe (zobacz [Importowanie danych](./importing-data.md)). Rodziny, kontakty do odbioru dzieci i zapisane listy zostaną odtworzone wraz z osobami. Filtry zapisanych list zostaną powiązane z przywróconymi grupami, funduszami, kampusami i polami niestandardowymi.
:::

## Eksport danych grup

Listy członków poszczególnych grup również możesz wyeksportować. Na stronie **Grupy** otwórz wybraną grupę i kliknij **ikonę pobierania**, aby wyeksportować listę jej członków. Więcej szczegółów znajdziesz w artykule [Członkowie grupy](../groups/group-members.md).

:::info
Wyeksportowane pliki CSV działają we wszystkich popularnych programach arkusza kalkulacyjnego, w tym w Microsoft Excel, Arkuszach Google i Apple Numbers.
:::
