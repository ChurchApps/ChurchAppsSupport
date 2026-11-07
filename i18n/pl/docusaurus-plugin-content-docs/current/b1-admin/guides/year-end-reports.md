---
title: "Przewodnik: generowanie rocznych raportów darowizn"
description: "W B1 Admin zamknij roczne zapisy darowizn, sprawdź podatkowe ustawienia funduszy i wygeneruj zestawienia odliczalne od podatku dla wszystkich darczyńców."
---

# Generowanie rocznych raportów darowizn

<div class="article-intro">

Przeprowadzimy Cię przez roczny proces finalizowania zapisów darowizn, sprawdzania ustawień funduszy i generowania zaświadczeń o darowiznach odliczanych od podatku dla każdego darczyńcy. Zwykle wykonuje się go na początku stycznia za poprzedni rok kalendarzowy.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto B1 Admin z dostępem do finansów
- Darowizny zapisane przez cały rok (online przez Stripe i/lub wprowadzone ręcznie)
- Dostęp do Twojego konta Stripe, jeśli przyjmujesz darowizny online

</div>

## Krok 1: Zaimportuj końcowe transakcje Stripe

Upewnij się, że wszystkie darowizny online z końca roku znajdują się w systemie.

Skorzystaj z przewodnika [Stripe Import](../donations/stripe-import.md), aby:

1. Przejść do Donations > Stripe Import
2. Wybrać zakres dat obejmujący koniec roku (np. 1 grudnia – 31 grudnia)
3. Najpierw kliknąć Preview, aby sprawdzić dane, a następnie Import Missing, aby zakończyć import

:::warning
Wykonaj ten import przed wygenerowaniem zaświadczeń. Transakcje, których nie zaimportowano, nie pojawią się na zaświadczeniach darczyńców.
:::

## Krok 2: Przejrzyj raporty darowizn

Przed wygenerowaniem zaświadczeń sprawdź, czy dane są poprawne.

Skorzystaj z przewodnika [Donation Reports](../donations/donation-reports.md), aby:

1. Sprawdzić stronę podsumowania darowizn za cały rok
2. Przejrzeć sumy według funduszy i porównać je z wyciągami bankowymi, aby wykryć rozbieżności
3. W razie potrzeby kliknąć poszczególne partie, aby zweryfikować szczegóły dotyczące darczyńców

## Krok 3: Sprawdź status podatkowy funduszy

Upewnij się, że ustawienie odliczenia podatkowego dla każdego funduszu jest poprawne, aby zaświadczenia były dokładne.

Skorzystaj z przewodnika [Funds](../donations/funds.md), aby:

1. Otworzyć każdy fundusz i potwierdzić, że ustawienie odliczenia podatkowego jest poprawne

:::info
Na zaświadczeniach o darowiznach pojawią się wyłącznie darowizny na fundusze oznaczone jako podlegające odliczeniu podatkowemu. Jeśli fundusz powinien podlegać odliczeniu, ale nie jest tak oznaczony, zaktualizuj go przed wygenerowaniem zaświadczeń.
:::

## Krok 4: Wygeneruj zaświadczenia o darowiznach

Utwórz oficjalne zaświadczenia o darowiznach dla swoich darczyńców.

Skorzystaj z przewodnika [Giving Statements](../donations/giving-statements.md), aby:

1. Przejść do **Donations > Giving Statements**
2. Wybrać rok z listy rozwijanej i przejrzeć statystyki podsumowania
3. Wybrać sposób pobierania:
   - **Download ZIP** — osobne pliki CSV, po jednym na darczyńcę
   - **Print All** — widok do druku, na którym każde zaświadczenie zaczyna się na nowej stronie, a u góry znajduje się logo Twojego kościoła (jeśli je wgrałeś)

:::tip
Generuj zaświadczenia na początku stycznia, gdy dane są jeszcze świeże. Dzięki temu masz czas, aby wyłapać ewentualne problemy, zanim zostaną wysłane.
:::

## Krok 5: Przekaż zaświadczenia darczyńcom

Dostarcz zaświadczenia do rąk darczyńców.

1. Wydrukuj i wyślij zaświadczenia pocztą lub prześlij poszczególne pliki CSV darczyńcom e-mailem
2. Członkowie mogą również przeglądać własną historię darowizn i drukować zaświadczenia w [B1.church](../../b1-church/giving/donation-history.md) oraz w [aplikacji B1 Mobile](../../b1-church/giving/donation-history.md)

## Gotowe!

Roczne raporty darowizn są gotowe. Darczyńcy otrzymali zaświadczenia o darowiznach odliczanych od podatku, a Twoje zapisy finansowe za ten rok zostały sfinalizowane.

## Powiązane artykuły

- [Stripe Import](../donations/stripe-import.md) — importowanie transakcji online
- [Donation Reports](../donations/donation-reports.md) — przeglądanie trendów i sum darowizn
- [Funds](../donations/funds.md) — zarządzanie funduszami i ustawieniami odliczeń podatkowych
- [Giving Statements](../donations/giving-statements.md) — generowanie zaświadczeń za rok
- [Recording Donations](../donations/recording-donations.md) — ręczne wprowadzanie darowizn gotówkowych i czekowych
- [Donation History (Web)](../../b1-church/giving/donation-history.md) — podgląd historii darowizn dla członków
- [Set Up Online Giving Guide](./online-giving.md) — wstępna konfiguracja Stripe i darowizn online
