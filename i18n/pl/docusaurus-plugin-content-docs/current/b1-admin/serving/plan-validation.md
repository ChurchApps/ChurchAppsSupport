---
title: "Weryfikacja planu i powiadomienia"
---

# Weryfikacja planu i powiadomienia dla wolontariuszy

<div class="article-intro">

B1 Admin automatycznie sprawdza Twoje plany pod kątem problemów przed niedzielą: nieobsadzone stanowiska, konflikty w harmonogramie oraz wolontariuszy, którzy zablokowali sobie dany termin. Gdy wszystko wygląda dobrze, możesz powiadomić cały zespół jednym kliknięciem.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Utwórz [plan nabożeństwa](./plans.md) i przypisz wolontariuszy do stanowisk
- Dodaj do planu [godziny nabożeństw](./plans.md), aby wykrywanie konfliktów mogło sprawdzić nakładanie się terminów
- Upewnij się, że wolontariusze mają zainstalowaną aplikację B1 Mobile, aby mogli otrzymywać powiadomienia push

</div>

## Panel weryfikacji

Każdy plan ma panel **Weryfikacja**, który działa automatycznie podczas jego tworzenia. Sprawdza on trzy rzeczy:

### Nieobsadzone stanowiska
Jeśli stanowisko wymaga większej liczby osób, niż jest obecnie przypisanych, panel weryfikacji wymienia dokładnie, czego jeszcze brakuje, na przykład *„Technik dźwięku: potrzebna 1 osoba więcej.”* Dzięki temu na pierwszy rzut oka widzisz, czy plan jest w pełni obsadzony, zanim nadejdzie dany tydzień.

### Konflikty w harmonogramie
Jeśli wolontariusz jest przypisany do dwóch stanowisk, których terminy nakładają się w obrębie tego samego planu, panel weryfikacji oznacza konflikt, na przykład *„Jane Smith: konflikt czasowy między Prowadzącym uwielbienie a Dziecięcym punktem zameldowania podczas Nabożeństwa niedzielnego.”* Pozwala to wychwycić podwójne przydziały, zanim staną się problemem w niedzielny poranek.

### Daty niedostępności
Wolontariusze mogą w aplikacji B1 Mobile wskazać daty, w których nie są dostępni. Jeśli ktoś jest przypisany do planu przypadającego w jednym z tych terminów, panel weryfikacji automatycznie pokazuje konflikt, dzięki czemu możesz znaleźć zastępstwo.

### Konflikty między planami
Weryfikacja obejmuje też wszystkie Twoje plany naraz. Jeśli ten sam wolontariusz jest przypisany do dwóch różnych planów, których terminy się nakładają, na przykład do nabożeństwa o 9:00 i nabożeństwa o 10:00, które trwają do 10:30, B1 Admin oznaczy tę osobę jako podwójnie przydzieloną między planami.

:::tip
Nie musisz nic robić, aby uruchomić weryfikację. Aktualizuje się ona automatycznie za każdym razem, gdy dodajesz lub zmieniasz przydział. Wystarczy, że będziesz zerkać na panel podczas tworzenia planu.
:::

## Powiadamianie wolontariuszy

Gdy plan jest gotowy, możesz powiadomić wszystkich przypisanych wolontariuszy jednocześnie bezpośrednio z panelu weryfikacji.

1. Otwórz plan i przewiń do panelu **Weryfikacja**
2. Jeśli są wolontariusze, którzy nie zostali powiadomieni, zobaczysz odnośnik z liczbą osób do powiadomienia (np. *„Powiadom 8 wolontariuszy”*)
3. Kliknij odnośnik, aby wysłać powiadomienia push do wszystkich, którzy jeszcze ich nie otrzymali
4. Wolontariusze dostaną powiadomienie na telefon, informujące, że zostali zaplanowani, z prośbą o potwierdzenie przydziału

:::info
Uwzględniani są tylko wolontariusze, którzy jeszcze nie zostali powiadomieni. Jeśli później dodasz kogoś do planu, odnośnik pojawi się ponownie, dzięki czemu możesz powiadomić nową osobę bez ponownego powiadamiania reszty zespołu.
:::

### Plany z procesem potwierdzania

Jeśli w ustawieniach planu wskazany jest [proces potwierdzania](./workflows.md#serving-assignment-confirmations), panel pokazuje komunikat *„Nowe prośby korzystają z procesu potwierdzania. Powiadomienia w aplikacji pozostają włączone. Przypomnienia są wysyłane, dopóki każda prośba nie zostanie zaakceptowana lub odrzucona.”* W takim przypadku:

- Odnośnik do powiadamiania uwzględnia tylko wolontariuszy, którzy nie zostali powiadomieni i jeszcze nie odpowiedzieli.
- Kliknięcie go wysyła zwykły alert w aplikacji i tworzy jedną kartę dla każdej prośby na tablicy procesu. Następnie proces wysyła przypomnienia e-mailem i SMS-em oraz, jeśli to konieczne, przekazuje prośbę komuś, kto zadzwoni do wolontariusza.
- Plan musi być opublikowany (nie tylko wstępnie zaplanowany), a proces musi być aktywny. W przeciwnym razie panel pokaże komunikat *„Nie udało się wysłać próśb. Sprawdź, czy wybrany proces jest aktywny i czy plan jest opublikowany, a następnie spróbuj ponownie.”*

:::warning
Wolontariusze muszą mieć zainstalowane mobilne środowisko B1.church (PWA na ekranie głównym lub przestarzałą natywną aplikację B1 Mobile dla osób, które jej jeszcze używają) z włączonymi powiadomieniami, aby mogli otrzymywać powiadomienia push. Instrukcje konfiguracji znajdziesz w artykule [Instalacja jako aplikacja (PWA)](/docs/b1-church/getting-started/installing-pwa).
:::

## Powiązane artykuły

- [Plany nabożeństw](./plans.md)
- [Procesy](./workflows.md)
- [Instalacja B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
