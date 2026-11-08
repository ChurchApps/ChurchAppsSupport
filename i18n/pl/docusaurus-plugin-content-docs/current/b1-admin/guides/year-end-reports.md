---
title: "Przewodnik: Generowanie rocznych raportów darowizn"
description: "W B1 Admin sfinalizuj rekordy darowizn z danego roku, sprawdź ustawienia podatkowe funduszy i wygeneruj zaświadczenia o darowiznach odliczanych od podatku dla każdego darczyńcy."
---

# Generowanie rocznych raportów darowizn

<div class="article-intro">

Przejdź przez roczny proces finalizowania rekordów darowizn, weryfikacji ustawień funduszy i generowania zaświadczeń o darowiznach odliczanych od podatku dla każdego darczyńcy. Zazwyczaj wykonuje się to na początku stycznia za poprzedni rok kalendarzowy.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto B1 Admin z dostępem do finansów
- Darowizny zarejestrowane w ciągu roku (online przez Stripe i/lub wprowadzone ręcznie)
- Dostęp do konta Stripe, jeśli przyjmujesz darowizny online

</div>

## Krok 1: Zaimportuj końcowe transakcje Stripe

Upewnij się, że wszystkie darowizny online z końca roku znajdują się w systemie.

Skorzystaj z przewodnika [Import Stripe](../donations/stripe-import.md), aby:

1. Przejść do Darowizny > Import Stripe
2. Wybrać zakres dat obejmujący koniec roku (np. 1 grudnia - 31 grudnia)
3. Kliknąć Podgląd, aby najpierw przejrzeć dane, a następnie Importuj brakujące, aby sfinalizować import

:::warning
Uruchom ten import przed wygenerowaniem zaświadczeń. Transakcje, których nie zaimportujesz, nie pojawią się na zaświadczeniach darczyńców.
:::

## Krok 2: Przejrzyj raporty darowizn

Sprawdź, czy Twoje rekordy są poprawne, zanim wygenerujesz zaświadczenia.

Skorzystaj z przewodnika [Raporty darowizn](../donations/donation-reports.md), aby:

1. Sprawdzić stronę podsumowania darowizn za cały rok
2. Przejrzeć sumy według funduszu i porównać je z wyciągami bankowymi, aby wychwycić ewentualne rozbieżności
3. W razie potrzeby kliknąć poszczególne partie, aby zweryfikować szczegóły dotyczące darczyńców

## Krok 3: Zweryfikuj status podatkowy funduszy

Upewnij się, że ustawienie odliczenia podatkowego każdego funduszu jest prawidłowe, aby zaświadczenia były dokładne.

Skorzystaj z przewodnika [Fundusze](../donations/funds.md), aby:

1. Otworzyć każdy fundusz i potwierdzić, że ustawienie odliczenia od podatku jest prawidłowe

:::info
Na zaświadczeniach o darowiznach pojawią się wyłącznie darowizny na fundusze oznaczone jako odliczane od podatku. Jeśli fundusz powinien być odliczany od podatku, ale nie jest tak oznaczony, zaktualizuj go przed wygenerowaniem zaświadczeń.
:::

## Krok 4: Wygeneruj zaświadczenia o darowiznach

Utwórz oficjalne zaświadczenia o darowiznach dla swoich darczyńców.

Skorzystaj z przewodnika [Zaświadczenia o darowiznach](../donations/giving-statements.md), aby:

1. Przejść do **Darowizny > Zaświadczenia o darowiznach**
2. Wybrać rok z listy rozwijanej i przejrzeć statystyki podsumowania
3. Wybrać sposób pobierania:
   - **Pobierz ZIP** — osobne pliki CSV, po jednym na każdego darczyńcę
   - **Drukuj wszystkie** — widok do druku, w którym każde zaświadczenie zaczyna się na nowej stronie, z logo kościoła u góry (jeśli je przesłałeś)

:::tip
Wygeneruj zaświadczenia wcześnie w styczniu, gdy dane są jeszcze świeże. Dzięki temu będziesz mieć czas, aby wychwycić ewentualne problemy, zanim zostaną wysłane.
:::

## Krok 5: Przekaż darczyńcom

Dostarcz zaświadczenia do rąk swoich darczyńców.

1. Wydrukuj i wyślij zaświadczenia pocztą lub wyślij poszczególne pliki CSV darczyńcom e-mailem
2. Członkowie mogą również przeglądać swoją historię darowizn i drukować zaświadczenia na [B1.church lub w aplikacji B1 App](../../b1-church/giving/donation-history.md)

## Gotowe!

Twoje roczne raporty darowizn są gotowe. Darczyńcy otrzymali zaświadczenia o darowiznach odliczanych od podatku, a dane finansowe za dany rok zostały sfinalizowane.

## Powiązane artykuły

- [Import Stripe](../donations/stripe-import.md) — import transakcji online
- [Raporty darowizn](../donations/donation-reports.md) — przeglądanie trendów i sum darowizn
- [Fundusze](../donations/funds.md) — zarządzanie funduszami i ustawieniami odliczeń podatkowych
- [Zaświadczenia o darowiznach](../donations/giving-statements.md) — generowanie rocznych zaświadczeń
- [Rejestrowanie darowizn](../donations/recording-donations.md) — ręczne wprowadzanie darowizn gotówkowych i czekowych
- [Historia darowizn (wersja internetowa)](../../b1-church/giving/donation-history.md) — samoobsługowy widok dla członków
- [Przewodnik konfiguracji darowizn online](./online-giving.md) — wstępna konfiguracja Stripe i darowizn
