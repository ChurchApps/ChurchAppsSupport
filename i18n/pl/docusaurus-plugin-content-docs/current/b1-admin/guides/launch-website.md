---
title: "Przewodnik: Uruchom swoją stronę internetową kościoła"
description: "Skonfiguruj stronę kościoła w B1 Admin: zbuduj stronę główną, dopasuj kolory i logo, dodaj kluczowe podstrony, podłącz własną domenę i formularze darowizn."
---

# Uruchom swoją stronę internetową kościoła

<div class="article-intro">

B1.church zawiera pełny kreator stron internetowych bez dodatkowych opłat. Ten przewodnik krok po kroku pokaże, jak stworzyć stronę internetową kościoła od podstaw: skonfigurować stronę główną, dostosować wygląd, dodać kluczowe podstrony, a opcjonalnie podłączyć internetowe datki i formularze zapisów na wydarzenia.

</div>

## Film szkoleniowy

<YouTube id="aA4UahZpmXg" title="Uruchamianie strony internetowej kościoła w B1" next="Edycja stron i nawigacji w B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Przygotuj logo kościoła (najlepiej PNG z przezroczystym tłem)
- Wybierz 2–3 kolory marki dla swojej strony
- Jeśli używasz własnej domeny (np. twojkosciol.pl), upewnij się, że masz dostęp do dostawcy DNS (GoDaddy, Cloudflare itp.)
- Jeśli chcesz mieć na stronie internetowe datki, najpierw wykonaj [Konfigurację datków online](../donations/online-giving-setup.md) (Stripe)

</div>

## Krok 1: Wstępna konfiguracja strony

Zacznij od utworzenia strony głównej i podstawowej struktury witryny.

Postępuj zgodnie z przewodnikiem [Wstępna konfiguracja strony](../website/initial-setup.md), aby:

1. Przejść do sekcji **Strona internetowa** w B1 Admin
2. Utworzyć stronę główną z sekcją główną, powitaniem i najważniejszymi informacjami
3. Dodać nazwę kościoła i hasło przewodnie

## Krok 2: Skonfiguruj wygląd

Ustaw wizualną tożsamość swojej strony — kolory, czcionki, logo i stopkę.

Postępuj zgodnie z przewodnikiem [Wygląd](../website/appearance.md), aby:

1. Przesłać logo kościoła
2. Ustawić główny kolor i kolor akcentu
3. Skonfigurować pasek nawigacji i stopkę
4. Podejrzeć wprowadzone zmiany

:::tip
Zachowaj prostą paletę kolorów — zwykle wystarczy kolor główny i jeden kolor akcentu. Resztą zajmie się kreator stron.
:::

## Krok 3: Dodaj strony z treścią

Przygotuj strony, których odwiedzający potrzebują najbardziej.

Postępuj zgodnie z przewodnikiem [Zarządzanie stronami](../website/managing-pages.md), aby utworzyć strony takie jak:

- **O nas** — historia kościoła, wyznawane wartości i przywództwo
- **Kazania** — link do [biblioteki kazań](../sermons/managing-sermons.md)
- **Wydarzenia** — nadchodzące wydarzenia i zapisy
- **Dary** — strona internetowych datków (wymaga [konfiguracji Stripe](../donations/online-giving-setup.md))
- **Kontakt** — lokalizacja, godziny nabożeństw i dane kontaktowe

## Krok 4: Podłącz swoją domenę

Jeśli chcesz używać własnej nazwy domeny (np. twojkosciol.pl) zamiast domyślnego adresu B1:

1. Przejdź do sekcji **Ustawienia** w B1 Admin i otwórz sekcję **Domeny**
2. Wpisz swoją domenę
3. Zaktualizuj rekordy DNS u dostawcy domeny, tak aby wskazywały na B1

:::info
Zmiany DNS mogą propagować się nawet do 48 godzin. Strona może być chwilowo niedostępna pod własną domeną. Domyślny adres B1 będzie działać przez cały ten czas.
:::

## Krok 5: Dodaj datki i formularze

Wzbogać swoją stronę o elementy interaktywne:

- **Datki online** — dodaj sekcję datków, dzięki której członkowie mogą wspierać kościół bezpośrednio ze strony. Najpierw skonfiguruj Stripe zgodnie z [Konfiguracją datków online](../donations/online-giving-setup.md).
- **Formularze zapisów** — osadź [samodzielne formularze](../forms/creating-forms.md) do zapisów na wydarzenia, kart odwiedzających lub zgłoszeń wolontariuszy. Informacje o dodawaniu formularza do dowolnej strony znajdziesz w [Zarządzaniu stronami](../website/managing-pages.md).

## Gotowe!

Twoja strona internetowa kościoła jest już online. Udostępnij adres swojej wspólnocie i w mediach społecznościowych. Treści, nowe podstrony i wygląd możesz zmieniać w dowolnym momencie z panelu B1 Admin.

## Powiązane artykuły

- [Wstępna konfiguracja strony](../website/initial-setup.md) — szczegółowy przewodnik po konfiguracji
- [Zarządzanie stronami](../website/managing-pages.md) — dodawanie i edycja stron
- [Wygląd](../website/appearance.md) — kolory, logo i układ
- [Zarządzanie plikami](../website/files.md) — przesyłanie obrazów i dokumentów
- [Konfiguracja datków online](../donations/online-giving-setup.md) — konfiguracja Stripe
- [Tworzenie formularzy](../forms/creating-forms.md) — tworzenie formularzy zapisów i ankiet
