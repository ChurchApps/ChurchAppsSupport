---
title: "Walidacja planu i powiadomienia"
description: "Sprawdzaj plany nabożeństw w B1 Admin pod kątem wolnych miejsc, konfliktów terminów i wolontariuszy z zablokowanymi datami, a następnie wyślij powiadomienie push do całego zespołu jednym kliknięciem."
---

# Walidacja planu i powiadomienia dla wolontariuszy

<div class="article-intro">

B1 Admin automatycznie sprawdza plany przed niedzielą: wolne miejsca na stanowiskach, konflikty w harmonogramie oraz wolontariuszy, którzy zablokowali tę datę. Gdy wszystko wygląda dobrze, możesz powiadomić cały zespół jednym kliknięciem.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Utwórz [plan nabożeństwa](./plans.md) i przypisz wolontariuszy do stanowisk
- Dodaj [godziny nabożeństw](./plans.md) do planu, aby wykrywanie konfliktów mogło sprawdzać nakładanie się terminów
- Upewnij się, że wolontariusze mają [zainstalowaną aplikację B1](../../b1-church/getting-started/installing-pwa.md), aby otrzymywać powiadomienia push

</div>

## Panel walidacji

Każdy plan ma panel **Walidacja**, który działa automatycznie podczas jego tworzenia. Sprawdza on trzy rzeczy:

### Wolne stanowiska
Jeśli na stanowisko potrzeba więcej osób, niż jest obecnie przypisanych, panel walidacji wypisuje dokładnie, czego jeszcze brakuje, na przykład *„Technik dźwięku: potrzebna 1 osoba więcej.”* Dzięki temu jednym rzutem oka widzisz, czy plan jest w pełni obsadzony, zanim nadejdzie dany tydzień.

### Konflikty terminów
Jeśli wolontariusz jest przypisany do dwóch stanowisk, których czasy nakładają się w ramach tego samego planu, panel walidacji oznacza konflikt, na przykład *„Jane Smith: konflikt czasowy między Prowadzącym uwielbienie a Zameldowaniem dzieci podczas nabożeństwa niedzielnego.”* Pozwala to wychwycić podwójne rezerwacje, zanim staną się problemem w niedzielny poranek.

### Daty blokad
Wolontariusze mogą w aplikacji B1 ustawić daty, w które nie są dostępni. Jeśli ktoś zostanie przypisany do planu przypadającego w jednej z jego zablokowanych dat, panel walidacji automatycznie wyświetli konflikt, abyś mógł znaleźć zastępstwo.

### Konflikty między planami
Walidacja sprawdza również jednocześnie wszystkie Twoje plany. Jeśli ten sam wolontariusz jest przypisany do dwóch różnych planów, których terminy się nakładają, na przykład nabożeństwo o 9:00 i nabożeństwo o 10:00, które trwają do 10:30, B1 Admin oznaczy tę osobę jako zarezerwowaną podwójnie między planami.

:::tip
Nie musisz nic robić, aby uruchomić walidację. Aktualizuje się ona automatycznie za każdym razem, gdy dodasz lub zmienisz przypisanie. Wystarczy zerkać na panel podczas tworzenia planu.
:::

## Powiadamianie wolontariuszy

Po ustaleniu planu możesz powiadomić wszystkich przypisanych wolontariuszy naraz, bezpośrednio z panelu walidacji.

1. Otwórz plan i przewiń do panelu **Walidacja**
2. Jeśli są wolontariusze, którzy nie zostali powiadomieni, zobaczysz link pokazujący, ilu osobom trzeba wysłać powiadomienie (np. *„Powiadom 8 wolontariuszy”*)
3. Kliknij link, aby wysłać powiadomienia push do wszystkich, którzy jeszcze nie zostali powiadomieni
4. Wolontariusze otrzymują na telefonie powiadomienie informujące, że zostali zaplanowani, i zachęcające do potwierdzenia przydziału

:::info
Uwzględniani są tylko wolontariusze, którzy nie zostali jeszcze powiadomieni. Jeśli później dodasz kogoś do planu, link pojawi się ponownie, dzięki czemu możesz powiadomić nową osobę bez ponownego powiadamiania reszty zespołu.
:::

### Plany z przepływem potwierdzeń

Jeśli ustawienia planu wskazują [przepływ pracy potwierdzeń](./workflows.md#serving-assignment-confirmations), panel wyświetla komunikat *„Nowe prośby korzystają z przepływu potwierdzeń. Powiadomienia w aplikacji pozostają włączone. Przypomnienia ustają, gdy każda prośba zostanie zaakceptowana lub odrzucona.”* W takim przypadku:

- Link powiadomienia liczy tylko wolontariuszy, którzy nie zostali powiadomieni i jeszcze nie odpowiedzieli.
- Kliknięcie go wysyła zwykłe powiadomienie w aplikacji i tworzy po jednej karcie na każdą prośbę na tablicy przepływu pracy. Przepływ następnie wysyła wiadomości e-mail i SMS-y z przypomnieniami oraz w razie potrzeby przekazuje prośbę komuś, kto ma zadzwonić.
- Plan musi być opublikowany (a nie tylko wstępnie zaplanowany), a przepływ pracy musi być aktywny. W przeciwnym razie panel wyświetla komunikat *„Nie udało się wysłać próśb. Sprawdź, czy wybrany przepływ pracy jest aktywny, a plan opublikowany, a następnie spróbuj ponownie.”*

:::warning
Aby wolontariusze mogli otrzymywać powiadomienia push, aplikacja B1 musi być zainstalowana na ekranie głównym, a powiadomienia włączone. Instrukcje konfiguracji znajdziesz w artykule [Instalacja jako aplikacja (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Powiązane artykuły

- [Plany nabożeństw](./plans.md)
- [Przepływy pracy](./workflows.md)
- [Instalacja PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
