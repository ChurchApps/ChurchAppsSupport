---
title: "Przypomnienia o wydarzeniach"
---

# Przypomnienia o wydarzeniach

<div class="article-intro">

Przypomnienia o wydarzeniach automatycznie informują odpowiednie osoby przed rozpoczęciem wydarzenia -- na przykład: „Nie przegap! Warsztat dotyczący zdrowia zaczyna się jutro o 9:00." Przypomnienie konfigurujesz raz, przy wydarzeniu, a B1 wysyła je zgodnie z harmonogramem w postaci powiadomień push, wiadomości e-mail oraz, jeśli Twój kościół ma skonfigurowane wysyłanie SMS-ów, wiadomości tekstowych. Członkowie mogą sami decydować, jakie przypomnienia chcą otrzymywać, w swoich [Ustawieniach powiadomień](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Utwórz wydarzenie, o którym chcesz przypominać (zobacz [Tworzenie kalendarzy](creating-calendars))
- Aby dotrzeć do zarejestrowanych uczestników, [włącz rejestrację](creating-calendars) dla wydarzenia
- Aby dotrzeć do całej grupy, upewnij się, że wydarzenie należy do [grupy](../groups/creating-groups) z członkami

</div>

## Konfigurowanie przypomnienia

Przypomnienia konfigurujesz w sekcji **Przypomnienia** wydarzenia.

- Gdy **tworzysz nowe wydarzenie**, rozwiń sekcję **Przypomnienia** w edytorze wydarzeń przed zapisaniem.
- Dla **istniejącego wydarzenia** otwórz stronę **Szczegóły rejestracji** (z sekcji **Rejestracje**), aby dodać lub zmienić przypomnienie.

1. Włącz opcję **Włącz przypomnienia**.
2. Wybierz **Kiedy** wysłać przypomnienie. Możesz wybrać do trzech terminów: **7 dni przed**, **3 dni przed**, **1 dzień przed** oraz **W dniu wydarzenia**.
3. Ustaw **Godzinę**, o której przypomnienie ma zostać wysłane (domyślnie **9:00**, według [strefy czasowej](../settings/church-settings.md#time-zone) Twojego kościoła).
4. Wybierz, **Kto** ma otrzymać przypomnienie (zobacz [Kto otrzymuje przypomnienie](#who-gets-reminded) poniżej).
5. Opcjonalnie dodaj **Wiadomość**. Pozostaw pole puste, aby użyć domyślnego tekstu, lub napisz własny -- możesz użyć `{{eventTitle}}`, a zostanie on zastąpiony nazwą wydarzenia.
6. Wybierz **Kanały**: powiadomienie **Push**, **E-mail** oraz, jeśli Twój kościół ma połączonego [dostawcę SMS-ów](../settings/church-settings.md#texting), **SMS**.
7. Zapisz wydarzenie.

Podczas wprowadzania zmian **podgląd na żywo** pokazuje w przybliżeniu, ilu osobom zostanie wysłane przypomnienie, ilu uczestników nie da się osiągnąć oraz najbliższe zaplanowane terminy wysyłki. Dzięki temu możesz sprawdzić, czy przypomnienie wygląda poprawnie, zanim zapiszesz wydarzenie.

## Kto otrzymuje przypomnienie

Ustawienie **Kto** określa, do kogo trafia przypomnienie:

- **Tylko zarejestrowani** -- Wszystkie osoby zarejestrowane na wydarzenie, które są powiązane z kartoteką osoby. Jest to domyślna opcja, gdy wydarzenie ma włączoną rejestrację, dzięki czemu przypomnienie o małym, zamkniętym wydarzeniu nigdy przypadkowo nie trafi do całej grupy.
- **Osoba zgłaszająca / tylko zarejestrowani** -- Jedno przypomnienie na rejestrację (dla osoby, która się zarejestrowała), a nie dla każdego członka rodziny ujętego w rejestracji.
- **Członkowie grupy** -- Wszyscy członkowie grupy przypisanej do wydarzenia. Jest to domyślna opcja, gdy wydarzenie nie korzysta z rejestracji.
- **Automatycznie** -- Używa zarejestrowanych osób, gdy rejestracja jest włączona, w przeciwnym razie członków grupy.

:::info
Goście dodani tylko z imienia i nazwiska (bez powiązanej kartoteki osoby) nie mogą otrzymać przypomnienia, ponieważ nie ma konta, urządzenia ani adresu e-mail, na który można by je wysłać. Podgląd pokazuje, ilu uczestników należy do tej kategorii, aby nie było niespodzianek. Członkowie, którzy zrezygnowali z komunikacji, są również pomijani.
:::

## Kiedy wysyłane są przypomnienia

- Przypomnienia są wysyłane o **wybranej godzinie**, według lokalnej strefy czasowej Twojego kościoła, w każdym z wybranych wcześniejszych terminów.
- Jeśli **zmienisz datę lub godzinę wydarzenia**, oczekujące przypomnienia zostaną automatycznie przeplanowane -- nie musisz edytować przypomnienia.
- Jeśli **usuniesz wydarzenie** (lub anulujesz pojedyncze wystąpienie wydarzenia cyklicznego), jego oczekujące przypomnienia zostaną automatycznie anulowane.
- Wydarzenia cykliczne są obsługiwane automatycznie: każde nadchodzące wystąpienie otrzymuje własne przypomnienie.

:::tip
Przypomnienia są wysyłane najpierw jako **push**, a e-mail pełni rolę zapasową. Jeśli członek ma włączone powiadomienia push, otrzyma push; jeśli nie, zamiast tego dostanie e-mail. Członkowie wybierają kanały dla każdego typu powiadomień w swoich [Ustawieniach powiadomień](../../b1-church/getting-started/notification-preferences).
:::

## Przypomnienia SMS

Kanał **SMS** pojawia się tylko wtedy, gdy Twój kościół ma połączonego dostawcę usług SMS. Wiadomości są wysyłane przez dostawcę usług SMS Twojego kościoła, a każda z nich może generować koszty dla kościoła. Są wysyłane oprócz ewentualnych przypomnień push lub e-mail, i tylko do osób, które:

- włączyły opcję **Wiadomości tekstowe** w swoich [Ustawieniach powiadomień](../../b1-church/getting-started/notification-preferences), oraz
- mają w profilu podany numer telefonu komórkowego.

Każda wiadomość zaczyna się od nazwy Twojego kościoła, mieści się w jednej wiadomości SMS i kończy się tekstem „Odpowiedz STOP, aby zrezygnować." Każda osoba, która odpowie STOP, przestaje otrzymywać wiadomości SMS od Twojego kościoła. Aby odpowiedzi STOP docierały do B1, wklej **adres URL webhooka dla wiadomości przychodzących (STOP)** z [ustawień SMS](../settings/church-settings.md#texting) do webhooka wiadomości przychodzących swojego dostawcy.

## Co mogą kontrolować członkowie

Przypomnienia zawsze respektują [Ustawienia powiadomień](../../b1-church/getting-started/notification-preferences) każdego członka. Członek może:

- wyłączyć **Przypomnienia o wydarzeniach** dla push, e-maila lub SMS-ów, zachowując inne powiadomienia,
- włączyć lub wyłączyć przypomnienia SMS za pomocą opcji **Wiadomości tekstowe**,
- ustawić **ciche godziny**, dzięki czemu mniej pilne powiadomienia poczekają na odpowiedni czas.

Nie możesz nadpisać decyzji członka o rezygnacji z przypomnień o wydarzeniach -- dzięki temu B1 jest zgodne z przepisami dotyczącymi spamu, a członkowie zachowują kontrolę nad swoją skrzynką odbiorczą.

## Przypomnienia o służbie

Wolontariusze zaplanowani w harmonogramie otrzymują osobne **przypomnienie o służbie** ze szczegółami planu oraz, jeśli jeszcze nie odpowiedzieli, przyciski **Akceptuję / Odrzucam** bezpośrednio w wiadomości e-mail. Te przypomnienia konfiguruje się w typie planu, a nie w wydarzeniu kalendarza, i mogą być również wysyłane jako SMS -- zobacz [Przypomnienia dla wolontariuszy](../serving/plans#volunteer-reminders) oraz [Wolontariusze w niedzielę](../guides/sunday-volunteers), aby dowiedzieć się, jak działa planowanie wolontariatu i przypomnienia.

## Następne kroki

- [Ustawienia powiadomień](../../b1-church/getting-started/notification-preferences) -- co mogą kontrolować członkowie
- [Przewodnik po rejestracji na wydarzenia](../guides/event-registration) -- konfiguracja rejestracji, aby przypomnienia mogły dotrzeć do uczestników
- [Tworzenie kalendarzy](creating-calendars) -- powrót do konfiguracji kalendarza
