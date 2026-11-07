---
title: "Planowany tryb"
description: "Ustaw telewizory FreePlay do odtwarzania playlist wg kalendarza w FreePlay Admin: startują i kończą same, działają mimo przerw w Wi-Fi."
---

# Planowany tryb

<div class="article-intro">

Planowany tryb pozwala telewizorowi FreePlay działać samodzielnie. Tworzysz listy odtwarzania i umieszczasz je w kalendarzu w **FreePlay Admin** pod adresem [admin.freeplay.church](https://admin.freeplay.church). Każdy telewizor sparowany z tym kalendarzem pobiera pliki na nadchodzący tydzień i odtwarza zaplanowane treści zgodnie z zegarem, bez konieczności naciskania przycisku Start. Ponieważ pliki są już pobrane, odtwarzanie trwa nawet wtedy, gdy połączenie Wi-Fi zostanie przerwane.

</div>

:::tip
FreePlay Admin korzysta z Twojego loginu ChurchApps, tego samego, którego używasz w B1 Admin. Nie trzeba tworzyć osobnego konta.
:::

## Jak to działa

FreePlay Admin ma cztery główne strony, wymienione w górnej części witryny:

- **[Ekrany](./managing-screens.md)** - Sparowane telewizory, ich stan oraz **grupy ekranów**, do których należą. Ekrany w grupie współdzielą jeden kalendarz i jedną domyślną pętlę
- **[Listy odtwarzania](./building-playlists.md)** - Pętle obrazów i filmów, które wybierasz od dostawców treści
- **[Kalendarz](./scheduling-the-calendar.md)** - Co i kiedy odtwarza każda grupa ekranów
- **[Dostawcy](./building-playlists.md#connecting-providers)** - Źródła treści, z których pobierają się Twoje listy odtwarzania. Każdego dostawcę łączysz raz, dla całego kościoła

Gdy nic nie jest zaplanowane, ekrany grupy odtwarzają jej **domyślną pętlę**. Jeśli grupa nie ma domyślnej pętli, ekrany pozostają ciemne.

## Czym różni się od trybu planu

- **[Tryb planu](../plan-mode/index.md)** podąża za jednym typem planu nabożeństwa z B1 Admin. Ktoś naciska na telewizorze **Rozpocznij plan**, a lekcja zaczyna się odtwarzać dopiero wtedy
- **Planowany tryb** podąża za kalendarzem. Treści uruchamiają się i zatrzymują o ustawionych godzinach, dlatego sprawdza się przy oznakowaniu w holu, komunikatach ogłoszeniowych i w salach lekcyjnych, gdzie lekcja powinna być widoczna, zanim ktokolwiek wejdzie

Wpis w kalendarzu może nadal odtwarzać plan nabożeństwa. Wybierz typ planu w sekcji **Plany nabożeństw** podczas dodawania harmonogramu, a ekran odtworzy plan, który jest aktualny w B1 Admin w danym tygodniu. Dotyczy to także lekcji Go Curriculum, nawet tych, które dostosowałeś w planie. Ekran używa loginu Go Curriculum powiązanego z typem planu w B1 Admin w danej służbie lub, jeśli służba go nie ma, połączenia Go Curriculum kościoła.

## Pierwsze kroki

Dopóki nie wykonasz każdego z poniższych kroków, strona **Ekrany** pokazuje listę kontrolną **Rozpocznij** z linkiem do każdego etapu:

1. **Połącz dostawcę** - Podłącz Dropbox, OneDrive, Lessons.church lub inne źródło na stronie **Dostawcy**
2. **Utwórz listę odtwarzania** - Wybierz obrazy i filmy od dostawcy
3. **Umieść ją w kalendarzu** - Wybierz, co i kiedy ma być odtwarzane, lub ustaw domyślną pętlę dla grupy
4. **Sparuj ekran** - Wpisz czteroliterowy kod widoczny na telewizorze

Kliknij **Ukryj**, aby zamknąć listę kontrolną.

:::tip
Naciśnij **Ctrl+K** (**⌘K** na Macu) lub kliknij pole wyszukiwania w nagłówku, aby otworzyć paletę poleceń. Stamtąd możesz przejść do dowolnej strony lub uruchomić działanie, takie jak **Sparuj ekran**, **Dodaj listę odtwarzania** lub **Dodaj harmonogram**.
:::

## W tej sekcji

- **[Parowanie ekranu](./pairing-a-screen.md)** - Pokaż kod na telewizorze i sparuj go w FreePlay Admin
- **[Zarządzanie ekranami i grupami](./managing-screens.md)** - Sprawdzaj stan i pobieranie oraz organizuj ekrany w grupy
- **[Łączenie dostawców i tworzenie list odtwarzania](./building-playlists.md)** - Podłączaj źródła treści i twórz pętle obrazów i filmów
- **[Planowanie kalendarza](./scheduling-the-calendar.md)** - Decyduj, co i kiedy się odtwarza oraz co się dzieje, gdy treść skończy się wcześniej
- **[Odtwarzanie zaplanowanej treści na telewizorze](./scheduled-playback.md)** - Co telewizor robi samodzielnie i jak używać pilota podczas odtwarzania
