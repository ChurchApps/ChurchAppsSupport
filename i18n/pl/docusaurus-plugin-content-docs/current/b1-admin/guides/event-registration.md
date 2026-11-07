---
title: "Przewodnik: Konfigurowanie rejestracji na wydarzenia"
---

# Konfigurowanie rejestracji na wydarzenia

<div class="article-intro">

Utwórz formularz rejestracji na wydarzenie, zbieraj informacje o uczestnikach oraz opcjonalne płatności, osadź go na stronie internetowej kościoła i zarządzaj zgłoszeniami na bieżąco. Po zakończeniu będziesz mieć gotową do udostępnienia stronę rejestracji dla dowolnego wydarzenia kościelnego.

</div>

:::info
**Dwa sposoby obsługi rejestracji na wydarzenia:** Ten przewodnik opisuje **rejestrację opartą na formularzach**, która daje pełną kontrolę nad polami niestandardowymi i zbieraniem płatności. W przypadku prostszych wydarzeń, gdzie wystarczy śledzić, kto przyjdzie, użyj **natywnej rejestracji na wydarzenia** wbudowanej w kalendarz -- instrukcje konfiguracji znajdziesz w sekcji [Tworzenie kalendarzy](../calendars/creating-calendars.md#enabling-event-registration). Natywna rejestracja pozwala członkom zapisywać się bezpośrednio przez [stronę B1](../../b1-church/events/registering) i [aplikację mobilną B1](../../b1-mobile/events/registering), z kontrolą liczby miejsc, oknami dat i potwierdzeniami e-mail.
:::

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto B1 Admin z dostępem administracyjnym
- Do zbierania płatności: najpierw [należy skonfigurować Stripe](../donations/online-giving-setup.md)

</div>

## Krok 1: Utwórz samodzielny formularz

Formularze typu Stand Alone mają własny publiczny adres URL, do którego ma dostęp każdy -- idealne do rejestracji na wydarzenia.

Skorzystaj z przewodnika [Tworzenie formularzy](../forms/creating-forms.md), aby:

1. Przejść do sekcji Forms i kliknąć Add Form
2. Wybrać typ "Stand Alone" -- dzięki temu formularz otrzyma własny publiczny adres URL
3. Nadać mu nazwę wydarzenia (np. "Rejestracja na rekolekcje dla mężczyzn", "Zapisy na VBS")

## Krok 2: Dodaj pytania

Zbuduj pola, które chcesz zebrać od osób rejestrujących się.

Skorzystaj z przewodnika [Tworzenie formularzy](../forms/creating-forms.md#adding-questions), aby dodać pytania:

1. Przejdź do karty Questions i dodaj pola z informacjami, których potrzebujesz: imię i nazwisko, e-mail, telefon, ograniczenia dietetyczne, rozmiar koszulki, kontakt awaryjny itp.
2. Użyj pytań wielokrotnego wyboru (Multiple Choice) dla opcji takich jak preferencje posiłków czy wybór sesji

:::warning
Typ pola Payment wymaga skonfigurowanego Stripe. Jeśli nie skonfigurowano jeszcze płatności online za darowizny, zapoznaj się z [Konfiguracją płatności online](../donations/online-giving-setup.md), zanim dodasz pola płatności.
:::

## Krok 3: Skonfiguruj ustawienia formularza

Określ, kiedy i w jaki sposób formularz rejestracji jest dostępny.

1. Ustaw daty dostępności, jeśli rejestracja ma być otwarta tylko przez ograniczony czas
2. Skopiuj publiczny adres URL -- możesz go udostępnić bezpośrednio
3. Dodaj członków formularza z rolami Admin lub View Only, aby pomagali w zarządzaniu zgłoszeniami

## Krok 4: Osadź na swojej stronie internetowej

Ułatw znalezienie formularza rejestracji, dodając go na stronę internetową kościoła.

Skorzystaj z przewodnika [Zarządzanie stronami](../website/managing-pages.md), aby:

1. W edytorze strony B1 dodać nową sekcję do strony i wybrać element Form
2. Wybrać formularz rejestracji z listy

:::tip
Udostępniaj również samodzielny adres URL przez e-mail, media społecznościowe i biuletyny parafialne -- im więcej miejsc, w których będzie widoczny, tym więcej zapisów otrzymasz.
:::

## Krok 5: Zarządzaj zgłoszeniami

Śledź rejestracje na bieżąco i eksportuj dane, gdy ich potrzebujesz.

Skorzystaj z przewodnika [Zarządzanie zgłoszeniami](../forms/managing-submissions.md), aby:

1. Przeglądać odpowiedzi na bieżąco w zakładce Submissions
2. Eksportować do pliku CSV na potrzeby arkuszy kalkulacyjnych, śledzenia liczby uczestników lub przekazania organizatorom wydarzenia

## Gotowe!

Twoja rejestracja na wydarzenie jest aktywna. Udostępnij link, osadź go na stronie internetowej i śledź zapisy w B1 Admin. Po zakończeniu wydarzenia wyeksportuj ostateczną listę do swojej dokumentacji.

## Powiązane artykuły

- [Tworzenie formularzy](../forms/creating-forms.md) — tworzenie formularzy z różnymi typami pól
- [Zarządzanie zgłoszeniami](../forms/managing-submissions.md) — przeglądanie i eksportowanie odpowiedzi z formularzy
- [Zarządzanie stronami](../website/managing-pages.md) — osadzanie formularzy na stronie internetowej
- [Konfiguracja płatności online](../donations/online-giving-setup.md) — wymagana dla pól płatności
