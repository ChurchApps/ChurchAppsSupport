---
title: "Bezpieczeństwo zameldowania"
description: "Skonfiguruj zabezpieczenia dzieci w B1 Admin: pojemność sal, proporcje wolontariuszy, listy zaufanych odbiorców i SMS-y do rodziców przy meldowaniu."
---

# Bezpieczeństwo zameldowania

<div class="article-intro">

B1 zawiera zestaw zabezpieczeń dla dzieci podczas zameldowania: limity pojemności sal i proporcje wolontariuszy do dzieci, wskazówki wiekowe i klasowe na kiosku, typy zameldowania, które rozróżniają członków, gości i wolontariuszy, oraz listę zaufanych osób odbierających, przypisaną do każdego gospodarstwa domowego i weryfikowaną podczas wymeldowania. Ta strona opisuje, jak skonfigurować każdą funkcję bezpieczeństwa w B1 Admin.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj [strukturę frekwencji](setup.md) i [kioski zameldowania](check-in.md)
- Sale to [grupy](../groups/creating-groups.md) powiązane z godzinami nabożeństw — poniższe ustawienia bezpieczeństwa znajdują się w grupie
- Powiadamianie rodziców i alarm awaryjny wymagają podłączonego dostawcy wiadomości tekstowych ([Text In Church](../integrations/services/text-in-church.md), [Clearstream](../integrations/services/clearstream.md) lub Mutual Ministry)

</div>

## Pojemność sali i zamykanie sali

Każda sala zameldowania (grupa) może egzekwować własne limity. Otwórz grupę, kliknij **Edytuj**, aby zmienić jej ustawienia, i znajdź sekcję **Pojemność zameldowania**:

- **Pojemność** — Maksymalna liczba osób, które mogą być jednocześnie zameldowane w tej sali. Gdy sala jest pełna, zameldowanie do niej jest zablokowane, a kiosk wskazuje pełną salę.
- **Pojemność dla gości** — Opcjonalny, osobny limit liczby gości, których sala może przyjąć.
- **Zamknięte dla zameldowania** — Ustaw na **Tak**, aby natychmiast wstrzymać wszystkie zameldowania do tej sali (na przykład gdy zajęcia zostały odwołane lub sala jest niedostępna). Wymeldowania nadal działają.

## Proporcje wolontariuszy

Ta sama sekcja **Pojemność zameldowania** w grupie zawiera zasady obsady:

- **Dzieci na jednego wolontariusza** — Maksymalna liczba dzieci, którymi może zaopiekować się jeden zameldowany wolontariusz (np. 5 oznacza jednego wolontariusza na pięcioro dzieci).
- **Minimalna liczba wolontariuszy** — Najmniejsza liczba wolontariuszy, którzy muszą być zameldowani, zanim dzieci będą mogły zameldować się do sali.

Wolontariusze są uwzględniani w tych zasadach, gdy melduję się z typem **Wolontariusz** na kiosku (zobacz [Typy zameldowania](#check-in-types) poniżej).

### Ostrzeżenie czy blokada

To, jak ściśle egzekwowane są proporcje, ustawia się dla całego kościoła:

1. W B1 Admin przejdź do **Ustawienia** i otwórz sekcję **Zameldowanie**.
2. Ustaw **Egzekwowanie proporcji wolontariuszy**:
   - **Ostrzeżenie (zezwól po potwierdzeniu)** — Kiosk wyświetla ostrzeżenie, gdy sala przekracza proporcje lub nie ma minimalnej liczby wolontariuszy, a członek personelu może potwierdzić i kontynuować. To ustawienie domyślne.
   - **Blokada (uniemożliwij zameldowanie)** — Zameldowanie do sali jest odrzucane, dopóki nie zostanie zameldowana wystarczająca liczba wolontariuszy.

:::info
Pojemność i Zamknięte dla zameldowania są zawsze twardymi limitami — wybór ostrzeżenia lub blokady dotyczy wyłącznie proporcji wolontariuszy.
:::

## Typy zameldowania

Każde zameldowanie zapisuje, czy dana osoba jest **Członkiem**, **Gościem** czy **Wolontariuszem**. Typ wybiera się za pomocą przycisków na ekranie gospodarstwa domowego na kiosku (domyślnie Członek). Typy zasilają reguły bezpieczeństwa — wolontariusze zapewniają pokrycie proporcji, a goście wliczają się do pojemności sali dla gości.

## Wskazówki wiekowe i klasowe dla sal

Każdej sali możesz przypisać granice wieku lub klasy, dzięki czemu kiosk będzie prowadzić rodziny do odpowiednich sal:

- W ustawieniach grupy użyj sekcji **Wiek i klasa**, aby ustawić minimalny i maksymalny wiek (lata i miesiące) lub klasę dla sali.
- Na kiosku sale, do których dziecko się kwalifikuje, są wyróżnione, a te, do których nie pasuje, są przyciemnione. Przyciemnioną salę można nadal wybrać po potwierdzeniu przez personel — wskazówki nigdy nie blokują twardo.

Klasy przechodzą na następną po **dacie promocji klasowej** w twoim kościele:

1. W B1 Admin przejdź do **Ustawienia** i otwórz sekcję **Promocja klasowa**.
2. Ustaw miesiąc i dzień, w których twój kościół promuje uczniów (na przykład 1 sierpnia). Wiek i klasy na kiosku są obliczane według ostatniej daty promocji.

## Zaufane i nieupoważnione osoby odbierające

Każde gospodarstwo domowe może mieć listę osób, które są — lub nie są — upoważnione do odbioru jego dzieci.

1. Otwórz stronę osoby w **Osoby** i znajdź kartę **Odbiór**.
2. Kliknij **Dodaj**. Wyszukaj istniejącą osobę albo dodaj kogoś, kogo nie ma w systemie, podając jego **Imię i nazwisko**, **Relację** oraz zdjęcie.
3. Ustaw **Status**:
   - **Zaufana** — Podczas wymeldowania ta osoba pojawia się jako karta odbioru ze zdjęciem, którą można dotknąć, co przyspiesza zweryfikowany odbiór.
   - **Nieupoważniona** — Jeśli ktoś spróbuje odebrać dziecko pod tym nazwiskiem, kiosk blokuje wymeldowanie z ostrzeżeniem. Członek personelu może to obejść, a fakt obejścia zostaje zapisany w rekordzie frekwencji.

Kliknij chip statusu osoby na karcie, aby przełączać między Zaufana a Nieupoważniona.

:::tip
Dodawaj zdjęcia zaufanym osobom odbierającym, gdy tylko to możliwe — ekran wymeldowania pokazuje zdjęcie, dzięki czemu wolontariusze mogą wizualnie zweryfikować osobę stojącą przed nimi.
:::

## Powiadamianie rodziców i alarm awaryjny

Obie funkcje wysyłają wiadomości tekstowe przez podłączonego dostawcę wiadomości kościoła — nie ma wbudowanej usługi SMS, więc najpierw trzeba skonfigurować jednego z obsługiwanych dostawców.

- **Powiadomienie rodzica** — Z ekranu wymeldowania na obsługiwanym kiosku personel może wysłać SMS do rodziców lub opiekunów zameldowanego dziecka (na przykład „Proszę podejść do żłobka”).
- **Alarm awaryjny** — Z ustawień administracyjnych kiosku personel może jednocześnie wysłać SMS do opiekunów każdego zameldowanego gospodarstwa domowego na wybrane nabożeństwo. Wysłanie wymaga wpisania **EMERGENCY** w celu potwierdzenia.

Osoby, które zrezygnowały z wiadomości tekstowych lub nie mają zapisanego numeru komórkowego, są pomijane automatycznie — kiosk podaje, ile wiadomości zostało wysłanych, a ile pominięto.

Opis tego procesu od strony kiosku znajdziesz w [Wymeldowanie i bezpieczeństwo dzieci](../../b1-checkin/check-in/checking-out.md).

## Powiązane artykuły

- [Zameldowanie](check-in.md) — konfiguracja kiosku i sprzęt
- [Wymeldowanie i bezpieczeństwo dzieci](../../b1-checkin/check-in/checking-out.md) — wymeldowanie na kiosku, weryfikacja odbioru i przepływy powiadamiania
- [Tworzenie grup](../groups/creating-groups.md) — gdzie znajdują się ustawienia sal
- [Konfiguracja frekwencji](setup.md) — nabożeństwa, godziny nabożeństw i przypisania sal
- [Minimalny wiek dla wiadomości prywatnych](../settings/mobile-app.md#member-directory--messaging-settings) — blokuje nowe prywatne rozmowy z dziećmi, zachowując ich obecność w katalogu
