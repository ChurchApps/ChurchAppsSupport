---
title: "Raporty frekwencji"
---

# Raporty frekwencji

<div class="article-intro">

B1 Admin udostępnia trzy raporty frekwencji, które pomagają zrozumieć, jak ludzie uczestniczą w nabożeństwach i grupach. Każdy raport oferuje inną perspektywę na dane o frekwencji, od ogólnych trendów po szczegółowe zestawienia dzienne.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Upewnij się, że frekwencja jest [konsekwentnie rejestrowana](../attendance/tracking-attendance.md) dla Twoich nabożeństw i grup
- Sprawdź, czy Twoje [grupy](../groups/creating-groups.md) i nabożeństwa są skonfigurowane w B1 Admin
- Potrzebujesz odpowiednich [uprawnień](../settings/roles-permissions.md), aby mieć dostęp do raportów

</div>

## Trend frekwencji

Raport Trend frekwencji pokazuje, jak frekwencja na Twoich nabożeństwach zmienia się w czasie.

1. Przejdź bezpośrednio do **admin.b1.church/reports/attendanceTrend** w przeglądarce (raporty nie mają pozycji w menu nawigacyjnym — najłatwiej wrócić do nich, zapisując adres w zakładkach). Ten sam raport znajduje się także na stronie Frekwencja: kliknij **Wszystkie lata**, a następnie wybierz zakładkę **Trend frekwencji**.
2. Opcjonalnie wybierz **Kampus**, **Nabożeństwo**, **Godzinę nabożeństwa** lub **Grupę**, aby filtrować wyniki.
3. Ustaw **Datę rozpoczęcia** i **Datę zakończenia**. Domyślnie raport obejmuje ostatni rok, od roku temu do dzisiaj, a data zakończenia jest uwzględniona w całości. Kliknij **Uruchom raport**.
4. Raport wyświetla wykres słupkowy i tabelę łącznej liczby wizyt na tydzień. Każdy tydzień jest oznaczony datą niedzieli tego tygodnia, a kolumna **Daty sesji** w tabeli zawiera rzeczywiste daty w tym tygodniu, w których odnotowano frekwencję (na przykład „9/27, 9/30”).

Ten raport jest przydatny do wychwytywania wzorców, takich jak sezonowe spadki, trendy wzrostowe lub wpływ wydarzeń specjalnych.

## Frekwencja w grupach

Raport Frekwencja w grupach pokazuje, kto uczestniczył w każdym spotkaniu grupy w wybranym zakresie dat.

1. Przejdź bezpośrednio do **admin.b1.church/reports/groupAttendance** w przeglądarce lub na stronie Frekwencja kliknij **Wszystkie lata** i wybierz zakładkę **Frekwencja w grupach**.
2. Opcjonalnie wybierz **Kampus** i **Nabożeństwo**.
3. Ustaw **Datę rozpoczęcia** i **Datę zakończenia**. Domyślnie raport obejmuje okres od ostatniej niedzieli do dzisiaj, a data zakończenia jest uwzględniona w całości.
4. Kliknij **Uruchom raport**.

Wyniki są grupowane według daty sesji, następnie według godziny nabożeństwa, a na końcu według grupy, a osoby, które uczestniczyły, są wymienione pod każdą grupą. Godziny nabożeństw, grupy i nazwiska są sortowane alfabetycznie. Obok imienia i nazwiska każdej osoby kolumna **Zameldowany** pokazuje czas zarejestrowania jej obecności (puste, gdy brak zapisanej godziny), a kolumna **Status członkostwa** pokazuje jej status, na przykład Członek lub Gość. Uwzględniane są także sesje grup, które nie spotykają się w określonej godzinie nabożeństwa; pojawiają się one bez godziny nabożeństwa.

Aby pobrać arkusz kalkulacyjny, kliknij **Opcje pobierania** i wybierz **Podsumowanie**. Plik CSV zawiera:

- Jeden wiersz dla każdego członka każdej grupy, która spotykała się w wybranym zakresie dat, posortowany według grupy, a następnie według nazwiska.
- Imię i nazwisko osoby oraz nazwę grupy w pierwszych kolumnach.
- Jedną kolumnę dla każdej datowanej sesji, nazwaną według nabożeństwa, godziny nabożeństwa i daty (na przykład „Niedziela - 9:00 (2026-09-27)”), przy czym każda osoba jest oznaczona jako **obecna** lub **nieobecna**. Sesja bez godziny nabożeństwa jest nazywana wyłącznie według daty.

Skorzystaj z tego raportu, aby porównać frekwencję między grupami i określić, które grupy się rozwijają lub wymagają uwagi.

## Dzienna frekwencja w grupach

Raport Dzienna frekwencja w grupach (zatytułowany **Frekwencja w grupie według dnia**) podaje dzienną liczbę osób, które uczestniczyły w jednej grupie.

1. Przejdź bezpośrednio do **admin.b1.church/reports/dailyGroupAttendance** w przeglądarce.
2. Użyj list rozwijanych **Kampus**, **Nabożeństwo** i **Godzina nabożeństwa**, aby zawęzić listę, a następnie wybierz **Grupę**, którą chcesz sprawdzić.
3. Uruchom raport. Wyświetla on każdy dzień, w którym grupa się spotykała, od najstarszego do najnowszego, wraz z **Datą** i liczbą **Uczestników** zarejestrowanych tego dnia.

Ten raport zapewnia szczegółowe informacje, które są pomocne w zrozumieniu zmienności z tygodnia na tydzień lub w wykrywaniu konkretnych dni z nietypowo wysoką lub niską frekwencją.

:::tip
Użyj raportu Trend frekwencji, aby uzyskać ogólny przegląd, a raportu Dzienna frekwencja w grupach, gdy potrzebujesz szczegółowo przeanalizować konkretne daty.
:::

## Praktyczne zastosowania

- **Planowanie** -- Wykorzystaj trendy frekwencji do planowania miejsc siedzących, obsady i zasobów na nadchodzące nabożeństwa.
- **Dotarcie do ludzi** -- Wcześnie wykrywaj spadki frekwencji, abyś mógł skontaktować się z członkami wspólnoty.
- **Raporty dla zarządu** -- Uwzględniaj dane o frekwencji w regularnych raportach dla kierownictwa, aby pokazać kondycję służby.
- **Ocena wydarzeń** -- Porównaj frekwencję przed i po wydarzeniach specjalnych, aby zmierzyć ich wpływ.

:::warning
Dane o frekwencji są rejestrowane za pośrednictwem procesów zameldowania w grupach i nabożeństwach. Jeśli frekwencja nie jest rejestrowana konsekwentnie, raporty nie będą dokładnie odzwierciedlać rzeczywistego uczestnictwa. Instrukcje konfiguracji znajdziesz w artykule [Rejestrowanie frekwencji](../attendance/tracking-attendance.md).
:::
