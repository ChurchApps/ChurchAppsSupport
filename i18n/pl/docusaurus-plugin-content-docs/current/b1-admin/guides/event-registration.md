---
title: "Przewodnik: konfiguracja rejestracji na wydarzenia"
description: "Skonfiguruj formularz rejestracji na wydarzenie w B1 Admin, aby zbierać dane uczestników i opcjonalne płatności, osadzić go na stronie internetowej kościoła i śledzić zgłoszenia."
---

# Konfiguracja rejestracji na wydarzenia

<div class="article-intro">

Utwórz formularz rejestracji na wydarzenie, zbieraj dane uczestników i opcjonalne płatności, osadź go na stronie internetowej kościoła i zarządzaj zgłoszeniami w miarę ich napływania. Po zakończeniu będziesz mieć gotową do udostępnienia stronę rejestracji na dowolne wydarzenie kościelne.

</div>

:::info
**Dwa sposoby obsługi rejestracji na wydarzenia:** Ten przewodnik opisuje **rejestrację opartą na formularzach**, która daje pełną kontrolę nad polami niestandardowymi i zbieraniem płatności. W przypadku prostszych wydarzeń, gdzie wystarczy śledzenie, kto przyjdzie, użyj **natywnej rejestracji na wydarzenia** wbudowanej w kalendarz -- instrukcje konfiguracji znajdziesz w artykule [Tworzenie kalendarzy](../calendars/creating-calendars.md#enabling-event-registration). Natywna rejestracja pozwala członkom zapisać się bezpośrednio z [B1.church lub aplikacji B1](../../b1-church/events/registering.md), z kontrolą liczby miejsc, oknami dat i potwierdzeniami e-mail.
:::

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto B1 Admin z uprawnieniami administratora
- Do zbierania płatności: najpierw należy skonfigurować [Stripe](../donations/online-giving-setup.md)

</div>

## Krok 1: Utwórz formularz samodzielny

Formularze samodzielne mają własny publiczny adres URL, do którego może wejść każdy -- idealny do rejestracji na wydarzenia.

Skorzystaj z przewodnika [Tworzenie formularzy](../forms/creating-forms.md), aby:

1. Przejść do sekcji Formularze i kliknąć Dodaj formularz
2. Wybrać typ „Samodzielny” -- dzięki temu formularz otrzyma własny publiczny adres URL
3. Nadać mu nazwę wydarzenia (np. „Rejestracja na weekendowy wyjazd mężczyzn”, „Zapisy na VBS”)

## Krok 2: Dodaj pytania

Zbuduj pola, które chcesz zebrać od osób rejestrujących się.

Skorzystaj z przewodnika [Tworzenie formularzy](../forms/creating-forms.md#adding-questions), aby dodać pytania:

1. Przejdź do karty Pytania i dodaj pola z informacjami, których potrzebujesz: imię i nazwisko, e-mail, telefon, ograniczenia dietetyczne, rozmiar koszulki, kontakt awaryjny itp.
2. Użyj pola Wielokrotnego wyboru w przypadku opcji takich jak preferencje dotyczące posiłków lub wybór sesji

:::warning
Typ pola Płatność wymaga skonfigurowanego Stripe. Jeśli nie skonfigurowano jeszcze darowizn online, przed dodaniem pól płatności zapoznaj się z artykułem [Konfiguracja darowizn online](../donations/online-giving-setup.md).
:::

## Krok 3: Skonfiguruj ustawienia formularza

Określ, kiedy i w jaki sposób formularz rejestracji jest dostępny.

1. Ustaw daty dostępności, jeśli rejestracja ma być otwarta tylko przez ograniczony czas
2. Skopiuj publiczny adres URL -- możesz go udostępnić bezpośrednio
3. Dodaj do formularza członków z rolami Administrator lub Tylko podgląd, aby pomagali zarządzać zgłoszeniami

## Krok 4: Osadź na swojej stronie internetowej

Ułatw znalezienie formularza rejestracji, dodając go do strony internetowej kościoła.

Skorzystaj z przewodnika [Zarządzanie stronami](../website/managing-pages.md), aby:

1. W edytorze strony internetowej B1 dodać nową sekcję do strony i wybrać element Formularz
2. Wybrać formularz rejestracji z listy

:::tip
Udostępnij też samodzielny adres URL e-mailem, w mediach społecznościowych i w biuletynach parafialnych -- im więcej miejsc, w których będzie widoczny, tym więcej zgłoszeń otrzymasz.
:::

## Krok 5: Zarządzaj zgłoszeniami

Śledź rejestracje w miarę ich napływania i eksportuj dane, gdy zajdzie taka potrzeba.

Skorzystaj z przewodnika [Zarządzanie zgłoszeniami](../forms/managing-submissions.md), aby:

1. Przeglądać odpowiedzi w miarę ich napływania na karcie Zgłoszenia
2. Wyeksportować dane do pliku CSV, aby pracować w arkuszu kalkulacyjnym, liczyć uczestników lub przekazać koordynatorom wydarzenia

## Gotowe!

Twoja rejestracja na wydarzenie jest aktywna. Udostępnij link, osadź go na swojej stronie internetowej i śledź zgłoszenia w B1 Admin. Po zakończeniu wydarzenia wyeksportuj ostateczną listę do swojej dokumentacji.

## Powiązane artykuły

- [Tworzenie formularzy](../forms/creating-forms.md) — twórz formularze z różnymi typami pól
- [Zarządzanie zgłoszeniami](../forms/managing-submissions.md) — przeglądaj i eksportuj odpowiedzi z formularzy
- [Zarządzanie stronami](../website/managing-pages.md) — osadzaj formularze na swojej stronie internetowej
- [Konfiguracja darowizn online](../donations/online-giving-setup.md) — wymagane dla pól płatności
