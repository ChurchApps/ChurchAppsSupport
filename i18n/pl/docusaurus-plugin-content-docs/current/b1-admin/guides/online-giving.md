---
title: "Przewodnik: Konfiguracja internetowych darowizn"
description: "Skonfiguruj internetowe darowizny w B1 Admin: utwórz fundusze darowizn, połącz konto Stripe i dodaj stronę Przekaż na swojej witrynie B1.church, z której skorzystają członkowie zboru."
---

# Konfiguracja internetowych darowizn

<div class="article-intro">

Przejdź przez wszystko, czego potrzebujesz, aby przyjmować internetowe darowizny w swoim zborze: od utworzenia funduszy darowizn, przez połączenie konta Stripe do obsługi płatności, po udostępnienie strony przekazów zborowi. Po zakończeniu członkowie będą mogli przekazywać darowizny online za pośrednictwem Twojej witryny i aplikacji mobilnej.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto B1 Admin z uprawnieniami administratora — zobacz [Role i uprawnienia](../people/roles-permissions.md)
- Konto Stripe (w razie potrzeby możesz je bezpłatnie założyć na stronie [stripe.com](https://stripe.com))

</div>

## Krok 1: Utwórz fundusze darowizn

Fundusze to kategorie, na które darczyńcy mogą przekazywać pieniądze. Zanim będziesz mógł przyjmować darowizny, potrzebny jest co najmniej jeden fundusz.

Skorzystaj z przewodnika [Fundusze](../donations/funds.md), aby skonfigurować kategorie darowizn:

1. Utwórz najpopularniejsze fundusze (np. „Fundusz ogólny”, „Fundusz budowy”, „Misje”)
2. Odpowiednio oznacz fundusze objęte odliczeniem podatkowym — wpływa to na roczne zestawienia darowizn

:::tip
Nowe fundusze możesz dodawać w dowolnym momencie. Zacznij od najczęstszych kategorii darowizn.
:::

## Krok 2: Połącz Stripe

Stripe obsługuje wszystkie płatności. Połączysz swoje konto Stripe z B1 Admin, dzięki czemu darowizny będą trafiać na Twoje konto bankowe.

Skorzystaj z przewodnika [Konfiguracja internetowych darowizn](../donations/online-giving-setup.md), aby połączyć Stripe:

1. Zaloguj się do panelu Stripe i pobierz swój klucz publikowalny (Publishable Key) oraz klucz tajny (Secret Key)
2. W B1 Admin przejdź do Ustawień i wprowadź oba klucze

:::warning
Stripe pokazuje klucz tajny (Secret Key) tylko raz. Skopiuj go i zapisz, zanim opuścisz panel Stripe. Jeśli go utracisz, będziesz musiał wygenerować nowy.
:::

## Krok 3: Dodaj stronę przekazów do swojej witryny

Ułatw zborowi przekazywanie darowizn, dodając stronę darowizn do swojej witryny B1.

Skorzystaj z przewodników [Konfiguracja internetowych darowizn](../donations/online-giving-setup.md) i [Zarządzanie stronami](../website/managing-pages.md), aby:

1. Dodać zakładkę „Przekaż” do witryny B1.church
2. Adres URL strony przekazów będzie wyglądał tak: `https://twojasubdomena.b1.church/donate`
3. Członkowie mogą przekazywać darowizny bez logowania (strona publiczna) lub zalogować się, aby korzystać z zapisanych metod płatności i historii darowizn

## Krok 4: Wykonaj darowiznę testową

Zanim ogłosisz to zborowi, sprawdź, czy wszystko działa.

1. Wykonaj niewielką darowiznę testową, aby sprawdzić cały przebieg procesu
2. Upewnij się, że darowizna pojawia się w B1 Admin w sekcji Darowizny

:::tip
Jeśli chcesz sprawdzić działanie bez prawdziwych obciążeń, najpierw skorzystaj z trybu testowego Stripe, a przed ogłoszeniem zborowi przełącz się na tryb produkcyjny.
:::

## Krok 5: Ogłoś to zborowi

Poinformuj członków, że mogą przekazywać darowizny online.

1. Udostępnij adres URL strony przekazów na swojej witrynie, w newsletterach e-mailowych, biuletynach i mediach społecznościowych
2. Członkowie mogą także przekazywać darowizny za pośrednictwem [aplikacji B1](../../b1-church/giving/index.md) — funkcja przekazów jest w niej wbudowana

:::info
Zalogowani członkowie mogą zapisywać metody płatności, konfigurować darowizny cykliczne i przeglądać historię swoich przekazów. Działa też darowizna anonimowa — nie wymaga logowania.
:::

## Krok 6: Bieżące zarządzanie

Na bieżąco aktualizuj dane o darowiznach i generuj raporty przez cały rok.

1. Regularnie [importuj transakcje Stripe](../donations/stripe-import.md) (co tydzień lub co miesiąc), aby dane były aktualne
2. [Przeglądaj raporty z darowizn](../donations/donation-reports.md), aby śledzić trendy i sumy darowizn w podziale na fundusze
3. [Generuj roczne zestawienia darowizn](../donations/giving-statements.md) dla celów podatkowych darczyńców

:::tip
Importuj dane ze Stripe co najmniej raz w miesiącu, aby rekordy były aktualne. Pełny opis rocznego procesu znajdziesz w przewodniku [Raporty roczne](./year-end-reports.md).
:::

## Gotowe!

Twój zbór przyjmuje już internetowe darowizny. Członkowie mogą przekazywać je przez Twoją witrynę, aplikację B1 lub dowolne urządzenie z przeglądarką internetową. Wszystkie darowizny są automatycznie rejestrowane w B1 Admin.

## Powiązane artykuły

- [Fundusze](../donations/funds.md) — tworzenie i zarządzanie kategoriami darowizn
- [Partie](../donations/batches.md) — grupowanie darowizn w zestawy
- [Rejestrowanie darowizn](../donations/recording-donations.md) — ręczne wprowadzanie darowizn gotówkowych i czekowych
- [Import Stripe](../donations/stripe-import.md) — pobieranie transakcji internetowych do B1 Admin
- [Raporty z darowizn](../donations/donation-reports.md) — przeglądanie trendów i sum darowizn
- [Zestawienia darowizn](../donations/giving-statements.md) — generowanie rocznych zestawień podatkowych
- [Przekazywanie darowizn](../../b1-church/giving/making-donations.md) — doświadczenie członka zboru przy przekazywaniu darowizn w B1.church i w aplikacji B1
