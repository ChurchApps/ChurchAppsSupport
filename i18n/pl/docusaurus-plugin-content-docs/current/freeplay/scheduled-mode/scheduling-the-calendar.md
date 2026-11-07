---
title: "Planowanie kalendarza"
---

# Planowanie kalendarza

<div class="article-intro">

Strona **Kalendarz** w FreePlay Admin określa, co każda grupa ekranów odtwarza i kiedy. Dodaj harmonogram dla playlisty, planu nabożeństwa lub folderu dostawcy i ustaw go tak, aby powtarzał się co tydzień lub odtwarzał jednorazowo. Gdy nic nie jest zaplanowane, odtwarzana jest domyślna pętla grupy.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Utwórz co najmniej jedną grupę ekranów. Zobacz [Zarządzanie ekranami i grupami](./managing-screens#screen-groups)
- [Utwórz playlistę](./building-playlists) lub skonfiguruj typ planu w B1 Admin

</div>

## Odczyt kalendarza

1. Przejdź do **Kalendarz**.
2. Wybierz grupę ekranów z kart u góry. Każda karta pokazuje, ile harmonogramów ma dana grupa.
3. Widok tygodnia obejmuje dni od poniedziałku do niedzieli, od 6:00 do 22:00. Czerwona linia oznacza bieżący czas.
4. Użyj strzałek, aby przejść do poprzedniego lub następnego tygodnia, albo kliknij **Dziś**, aby wrócić do bieżącego tygodnia.

Podtytuł strony pokazuje strefę czasową używaną w kalendarzu. Harmonogramy są zgodne ze strefą czasową twojego kościoła, którą ustawiasz w B1 Admin w sekcji [Informacje o kościele](../../b1-admin/settings/church-settings.md#time-zone). Jeśli kościół nie ma ustawionej strefy czasowej, FreePlay używa strefy czasowej twojego kampusu. Kalendarz i telewizory korzystają z tej samej strefy czasowej, więc blok umieszczony w kalendarzu o 9:00 zostanie odtworzony o 9:00 na ekranie, nawet jeśli komputer ma ustawioną inną strefę czasową.

Harmonogramy są oznaczone kolorami według typu. Legenda wyjaśnia kolory:

- **Domyślna pętla** - Tło w ukośne kreski, wyświetlane za wszystkim, gdy grupa ma domyślną pętlę
- **Playlista**
- **Plan nabożeństwa**
- **Folder dostawcy**

Każdy blok pokazuje swoją nazwę, a wyższe bloki dodatkowo pokazują godziny, to, czy blok się powtarza (**co tydzień** lub **jednorazowo**), oraz to, co się dzieje, gdy zakończy się wcześniej.

## Ustawianie domyślnej pętli

Domyślna pętla jest odtwarzana na ekranach grupy zawsze wtedy, gdy nic nie jest zaplanowane.

1. Na stronie **Kalendarz** kliknij **Domyślna pętla…** w nagłówku. Jeśli domyślna pętla jest już ustawiona, przycisk pokazuje **Domyślna pętla:** i nazwę playlisty.
2. Wybierz **Playlistę** albo wybierz **Brak — ekran gaśnie**.
3. Kliknij **Zapisz**.

## Dodawanie harmonogramu

Nowy harmonogram można zacząć na trzy sposoby:

- Kliknij puste miejsce w kalendarzu. Formularz otworzy się z już wypełnionym dniem i półgodziną.
- Kliknij **Dodaj harmonogram** w nagłówku.
- Wybierz **Dodaj harmonogram** z palety poleceń (**Ctrl+K** lub **⌘K**).

Następnie wypełnij formularz:

1. **Odtwarzaj** - Wybierz, co ma być odtwarzane:
   - **Playlisty** - Dowolna playlista, którą zbudowałeś
   - **Plany nabożeństw** - Typ planu z B1 Admin, oznaczony **(bieżący plan)**. Ekran odtwarza co tydzień aktualny plan dla danego typu planu, w tym lekcje Go Curriculum (także dostosowane), które używają loginu Go powiązanego z ministerium typu planu
   - **Folder dostawcy…** - Otwiera **Wybierz folder dostawcy**. Przejdź do folderu i kliknij **Użyj tego folderu**. Aby później wybrać inny folder, kliknij **Zmień**
2. **Powtarza się** - Zaznacz dni tygodnia, w które ma być odtwarzany harmonogram. Aby zamiast tego ustawić jedną datę, włącz **Jednorazowo** i wybierz **Datę**.
3. **Start** i **Koniec** - Godziny rozpoczęcia i zakończenia harmonogramu.
4. **Jeśli zakończy się wcześniej** - Co zrobić, gdy treść się skończy przed godziną końcową:
   - **Zapętl do godziny końcowej** - Zaczyna od początku. Dobre do pętli sygnalizacyjnych, ogłoszeń i odliczań
   - **Tempo nauczyciela** - Slajdy czekają na pilota nauczyciela. Lekcja pozostaje wyświetlona po godzinie końcowej, aż do ostatniego slajdu
   - **Odtwórz raz, potem wróć do domyślnej pętli**
5. Dla harmonogramów cyklicznych ustaw **Zaczyna się** na pierwszą datę. W sekcji **Kończy się** wybierz **Nigdy** albo wybierz **W dniu** i wpisz **Datę zakończenia**.
6. Kliknij **Zapisz**.

:::info
**Tempo nauczyciela** zastąpiło starszą opcję „przytrzymaj ostatni slajd”. Harmonogramy zapisane z tą opcją są teraz odtwarzane jako tempo nauczyciela.
:::

## Edytowanie lub usuwanie harmonogramu

1. Kliknij blok harmonogramu w kalendarzu.
2. Zmień dowolne pole i kliknij **Zapisz** albo kliknij **Usuń**, aby usunąć harmonogram.

## Nakładające się harmonogramy

Jeśli dwa harmonogramy się nakładają, formularz wyświetla ostrzeżenie: **Nakłada się na inny harmonogram. Wygrywa ten, który zaczyna się później.** Gdy późniejszy harmonogram trwa, ekrany odtwarzają go. Gdy się skończy, wracają do wcześniejszego harmonogramu, jeśli nadal trwa.

## Jak ekrany pobierają zmiany

Sparowane ekrany pobierają wszystko, co jest zaplanowane na kolejne 7 dni, i samodzielnie sprawdzają, czy są zmiany. Nie musisz dotykać telewizora po edycji kalendarza. Aby sprawdzić, kiedy ekran ma wszystko, czego potrzebuje, zobacz **Gotowe do** na [stronie Ekrany](./managing-screens).

## Powiązane artykuły

- **[Tworzenie playlist](./building-playlists)** - Utwórz playlisty, które planujesz
- **[Odtwarzanie zaplanowanych treści w telewizorze](./scheduled-playback)** - Jak lekcje w tempie nauczyciela i pilot działają w telewizorze
- **[Zarządzanie ekranami i grupami](./managing-screens)** - Dodawaj grupy i sprawdzaj pobieranie na każdym ekranie
- **[Zachowanie tylko części każdej lekcji](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Przytnij każdą zaplanowaną lekcję w typie planu do części, które odtwarza twoja sala
