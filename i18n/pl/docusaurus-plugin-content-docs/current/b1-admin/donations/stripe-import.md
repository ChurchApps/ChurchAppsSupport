---
title: "Import ze Stripe"
---

# Import ze Stripe

<div class="article-intro">

Jeśli przyjmujesz darowizny online za pośrednictwem Stripe, narzędzie Import ze Stripe pozwala pobrać te transakcje do B1 Admin, dzięki czemu wszystkie dane o darowiznach znajdują się w jednym miejscu. Jest to szczególnie przydatne do wychwycenia transakcji, które nie zostały automatycznie zsynchronizowane.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Wykonaj kroki z artykułu [Konfiguracja darowizn online](online-giving-setup.md), aby połączyć konto Stripe z B1 Admin. Pozycja menu **Import ze Stripe** oraz przycisk na stronie Partie pojawiają się tylko wtedy, gdy bramką darowizn Twojego kościoła jest Stripe, i tylko dla osób, które mogą edytować darowizny
- Sprawdź, czy w panelu Stripe masz darowizny z zakresu dat, który chcesz zaimportować

</div>

## Jak to działa

Proces importu składa się z dwóch etapów: najpierw podglądasz, co zostanie zaimportowane, a następnie potwierdzasz import. Takie podejście próbne pozwala sprawdzić wszystko, zanim zostaną utworzone jakiekolwiek dane.

## Importowanie transakcji

1. W **B1 Admin** przejdź do **Dary > Import ze Stripe**. (Możesz też kliknąć **Importuj brakujące transakcje Stripe** u góry strony **Partie**.)
2. Otworzy się strona **Import ze Stripe**.
3. Wybierz **zakres dat** transakcji, które chcesz zaimportować.
4. Kliknij **Podgląd**, aby wykonać sprawdzenie próbne.

## Przeglądanie podglądu

Podgląd wyświetla każdą transakcję ze Stripe wraz ze wskaźnikiem statusu:

- **Nowa** -- ta transakcja nie została jeszcze zaimportowana i zostanie uwzględniona, jeśli przejdziesz dalej.
- **Już zaimportowana** -- ta transakcja istnieje już w B1 Admin i zostanie pominięta.
- **Pominięta** -- ta transakcja została wykluczona z innego powodu (np. zwrot lub nieudana płatność).

Sekcja podsumowania u góry pokazuje łączną liczbę transakcji w każdej kategorii oraz powiązane kwoty.

:::info
Etap podglądu nie tworzy żadnych rekordów. Jest to sprawdzenie tylko do odczytu, dzięki któremu możesz zweryfikować, co się stanie, zanim zatwierdzisz import.
:::

## Finalizowanie importu

1. Przejrzyj wyniki podglądu oraz sumy w podsumowaniu.
2. Kliknij **Importuj brakujące**, aby zaimportować wszystkie transakcje oznaczone jako **Nowa**.
3. Po zakończeniu importu etykiety statusu obok każdej transakcji zostaną zaktualizowane, aby pokazać wynik.

## Wskazówki dotyczące importu ze Stripe

- Importuj regularnie (co tydzień lub co miesiąc), aby Twoje dane były aktualne.
- Jeśli transakcja jest oznaczona jako **Już zaimportowana**, oznacza to, że B1 Admin ma już odpowiadający jej rekord -- nie trzeba nic robić.
- Skorzystaj z filtra zakresu dat, aby skupić się na konkretnym okresie, jeśli szukasz określonych transakcji.

:::tip
Po zaimportowaniu odwiedź stronę [Partie](batches.md), aby sprawdzić, czy zaimportowane darowizny pojawiły się prawidłowo i czy sumy zgadzają się z tym, co widzisz w panelu Stripe.
:::

## Następne kroki

- Zajrzyj do [Raporty darowizn](donation-reports.md), aby przejrzeć zaimportowane transakcje razem z pozostałymi danymi o darowiznach
- Upewnij się, że zaimportowane darowizny są przypisane do właściwych [funduszy](funds.md), aby [potwierdzenia darowizn](giving-statements.md) były dokładne
