---
title: "Przewodnik: konfiguracja internetowych darowizn"
description: "Skonfiguruj darowizny online w B1 Admin: utwórz fundusze, połącz Stripe i dodaj stronę Donate na swojej stronie B1.church dla członków."
---

# Konfiguracja internetowych darowizn

<div class="article-intro">

Przejdź przez wszystko, co potrzebne, aby przyjmować internetowe darowizny w Twoim kościele: od utworzenia funduszy darowizn, przez podłączenie Stripe do obsługi płatności, po udostępnienie strony z darowiznami swojej wspólnocie. Po zakończeniu członkowie będą mogli składać darowizny przez Twoją stronę internetową i aplikację mobilną.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto B1 Admin z dostępem administratora — zobacz [Role i uprawnienia](../people/roles-permissions.md)
- Konto Stripe (w razie potrzeby załóż je bezpłatnie na [stripe.com](https://stripe.com))

</div>

## Krok 1: Utwórz fundusze darowizn

Fundusze to kategorie, na które darczyńcy mogą przekazywać środki. Zanim będziesz mógł przyjmować darowizny, potrzebujesz co najmniej jednego funduszu.

Skorzystaj z przewodnika [Fundusze](../donations/funds.md), aby skonfigurować kategorie darowizn:

1. Utwórz najpopularniejsze fundusze (np. „Fundusz ogólny”, „Fundusz budowlany”, „Misje”)
2. Odpowiednio oznacz fundusze, od których można odliczyć darowiznę od podatku — wpływa to na roczne zestawienia darowizn

:::tip
Nowe fundusze możesz dodawać w dowolnym momencie. Zacznij od najczęstszych kategorii darowizn.
:::

## Krok 2: Połącz Stripe

Stripe obsługuje wszystkie płatności. Połączysz swoje konto Stripe z B1 Admin, aby darowizny trafiały na Twoje konto bankowe.

Skorzystaj z przewodnika [Konfiguracja internetowych darowizn](../donations/online-giving-setup.md), aby połączyć Stripe:

1. Zaloguj się do panelu Stripe i pobierz swój klucz publikowalny (Publishable Key) oraz klucz tajny (Secret Key)
2. W B1 Admin przejdź do Ustawień i wpisz oba klucze

:::warning
Stripe pokazuje klucz tajny tylko raz. Skopiuj go i zapisz, zanim opuścisz panel Stripe. Jeśli go zgubisz, będziesz musiał wygenerować nowy.
:::

## Krok 3: Dodaj stronę z darowiznami do swojej strony internetowej

Ułatw członkom dostęp do darowizn, dodając stronę z darowiznami na swojej stronie B1.

Skorzystaj z przewodników [Konfiguracja internetowych darowizn](../donations/online-giving-setup.md) i [Zarządzanie stronami](../website/managing-pages.md), aby:

1. Dodać zakładkę „Donate” na stronie B1.church
2. Twój adres do darowizn będzie wyglądał tak: `https://yoursubdomain.b1.church/donate`
3. Członkowie mogą składać darowizny bez logowania (strona publiczna) lub zalogować się, aby zapisać metody płatności i zobaczyć historię darowizn

## Krok 4: Wykonaj testową darowiznę

Zanim ogłosisz to swojej wspólnocie, sprawdź, czy wszystko działa.

1. Wykonaj niewielką testową darowiznę, aby sprawdzić cały przebieg procesu
2. Sprawdź, czy darowizna pojawia się w B1 Admin w sekcji Darowizny

:::tip
Jeśli chcesz sprawdzić działanie bez prawdziwych obciążeń, najpierw użyj trybu testowego Stripe, a przed ogłoszeniem wspólnocie przełącz się na tryb produkcyjny.
:::

## Krok 5: Ogłoś to wspólnocie

Poinformuj członków, że mogą już składać darowizny online.

1. Udostępnij adres do darowizn na swojej stronie internetowej, w newsletterach e-mailowych, biuletynach i mediach społecznościowych
2. Członkowie mogą też składać darowizny w [aplikacji B1 Mobile](../../b1-church/giving/index.md) — funkcja darowizn jest w niej wbudowana

:::info
Członkowie, którzy się zalogują, mogą zapisywać metody płatności, konfigurować darowizny cykliczne i przeglądać historię swoich darowizn. Darowizny anonimowe również są możliwe — nie jest wymagane logowanie.
:::

## Krok 6: Bieżące zarządzanie

Na bieżąco aktualizuj dane o darowiznach i generuj raporty przez cały rok.

1. Regularnie [importuj transakcje Stripe](../donations/stripe-import.md) (co tydzień lub co miesiąc), aby utrzymać dane w aktualności
2. [Przeglądaj raporty z darowizn](../donations/donation-reports.md), aby śledzić trendy i sumy darowizn w podziale na fundusze
3. [Generuj roczne zestawienia darowizn](../donations/giving-statements.md) dla celów podatkowych darczyńców

:::tip
Importuj dane ze Stripe przynajmniej raz w miesiącu, aby Twoje rekordy były aktualne. Pełny opis rocznego procesu znajdziesz w [Przewodniku po raportach rocznych](./year-end-reports.md).
:::

## Gotowe!

Twój kościół przyjmuje już internetowe darowizny. Członkowie mogą składać je przez Twoją stronę internetową, aplikację B1 Mobile lub na dowolnym urządzeniu z przeglądarką. Wszystkie darowizny są automatycznie rejestrowane w B1 Admin.

## Powiązane artykuły

- [Fundusze](../donations/funds.md) — tworzenie i zarządzanie kategoriami darowizn
- [Partie](../donations/batches.md) — grupowanie darowizn
- [Rejestrowanie darowizn](../donations/recording-donations.md) — ręczne wprowadzanie darowizn gotówkowych i czekowych
- [Import ze Stripe](../donations/stripe-import.md) — pobieranie transakcji online do B1 Admin
- [Raporty z darowizn](../donations/donation-reports.md) — przeglądanie trendów i sum darowizn
- [Zestawienia darowizn](../donations/giving-statements.md) — generowanie rocznych zestawień podatkowych
- [Składanie darowizn (Web)](../../b1-church/giving/making-donations.md) — doświadczenie darczyńcy na stronie
- [Składanie darowizn (Mobile)](../../b1-church/giving/making-donations.md) — darowizny z aplikacji mobilnej
