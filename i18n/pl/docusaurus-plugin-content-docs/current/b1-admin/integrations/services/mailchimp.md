---
title: "Mailchimp"
description: "Synchronizuj osoby z B1 Admin i członkostwo w grupach lub listach do odbiorców Mailchimp jako tagi, z konfiguracją, importem i rozwiązywaniem problemów."
---

# Mailchimp

<div class="article-intro">

Automatycznie synchronizuj listę odbiorców Mailchimp z B1: nowe osoby trafiają na listę wraz z imieniem, adresem e-mail i numerem telefonu; członkostwo w grupach i listach zapisywanych staje się tagami w Mailchimp; usunięte osoby są archiwizowane. Synchronizacja jest wbudowana w B1: nie potrzebujesz usługi zewnętrznej, nie ma opłat za każde zadanie, a zmiany docierają niemal w czasie rzeczywistym, a nie raz na dobę.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto [Mailchimp](https://mailchimp.com) z listą odbiorców, którą B1 ma zarządzać
- **Klucz API** Mailchimp (Mailchimp: ikona profilu → **Account & billing → Extras → API keys**)
- **Identyfikator listy odbiorców** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Użytkownik B1Admin z uprawnieniem **Edit Settings**

</div>

## Co jest synchronizowane

| Zmiana w B1 | Skutek w Mailchimp |
|---|---|
| Dodanie lub aktualizacja osoby | Subskrybent zostaje dodany lub zaktualizowany (imię, nazwisko, telefon; nowi subskrybenci otrzymują status `subscribed`) |
| Usunięcie osoby (lub usunięcie danych zgodnie z RODO) | Subskrybent zostaje zarchiwizowany |
| Osoba dołącza do grupy | Dodawany jest tag o nazwie grupy |
| Osoba opuszcza grupę | Ten tag zostaje usunięty |
| Osoba trafia do zapisanej listy | Dodawany jest tag o nazwie listy |
| Osoba opuszcza zapisaną listę | Ten tag zostaje usunięty |

**Zapisane listy są zwykle lepszym źródłem tagów.** [Zapisana lista](/docs/b1-admin/people/lists) w B1 to grupa odbiorców oparta na regułach, która aktualizuje się automatycznie, np. „wszyscy z kampusu północnego” lub „członkowie, którzy zgodzili się na e-maile duszpasterskie”. Jeśli segmenty w Mailchimp oprzesz na tagach list, synchronizacja będzie je utrzymywać. Tagów grup używaj do wysyłek dla zespołów służby.

Synchronizacja jest **jednokierunkowa** (B1 → Mailchimp) i dotyczy wyłącznie standardowych pól Mailchimp, więc nie koliduje z polami scalania ani segmentami, którymi zarządzasz w Mailchimp.

## Konfiguracja

1. W B1Admin przejdź do **Settings → Developer → Webhooks → New Webhook**.
2. Ustaw **Connector Type** na **Mailchimp**.
3. Wklej **Mailchimp API Key** i **Audience ID**. Klucz jest przechowywany w postaci zaszyfrowanej i nigdy nie jest wyświetlany ponownie.
4. Odpowiednie zdarzenia są zaznaczone domyślnie; odznacz te, których nie chcesz (np. pozostaw zdarzenia dotyczące osób, ale pomiń tagi grup).
5. Zapisz. Zanim B1 zaakceptuje ustawienia, sprawdza klucz i listę odbiorców w Mailchimp. Błąd w literówce zostanie od razu zgłoszony wraz z przyczyną.

Możesz w każdej chwili użyć **Send Test**, aby ponownie sprawdzić połączenie. Każda próba synchronizacji jest zapisywana w historii dostarczeń webhooka wraz z rzeczywistą odpowiedzią Mailchimp. Nieudane dostawy są automatycznie ponawiane z rosnącymi przerwami przez około pięć dni.

## Import początkowy

Konektor synchronizuje *zmiany* od chwili włączenia; nie importuje wstecznie istniejącego katalogu osób. W dniu konfiguracji:

1. W B1Admin przejdź do **People**, wyszukaj osoby, które chcesz wyeksportować (lub uruchom zapisaną listę), i kliknij **Export**, aby pobrać plik CSV.
2. W Mailchimp użyj **Audience → Import contacts**, aby wczytać plik CSV, i w trakcie importu przypisz odpowiednie tagi.

Wykonanie pierwszego załadowania przez narzędzie importu Mailchimp pozwala zachować kontrolę nad kwestią zgody. Importuj tylko osoby, które faktycznie wyraziły zgodę na otrzymywanie Twoich wiadomości. Masowe importowanie całego katalogu jako subskrybentów może naruszać regulamin Mailchimp oraz przepisy antyspamowe (CAN-SPAM/RODO).

## Ograniczenia i uwagi

- **Synchronizacja jednokierunkowa.** Rezygnacje z subskrypcji, odbicia wiadomości i zmiany wprowadzone w Mailchimp nie wracają do B1. Osoba, która zrezygnowała w Mailchimp, może nadal otrzymywać wiadomości wysyłane bezpośrednio z B1. Traktuj Mailchimp jako źródło prawdy o zgodach na masową wysyłkę.
- **Osoby bez adresu e-mail są pomijane** (zapisywane jako pominięte w historii dostarczeń), ponieważ subskrybenci w Mailchimp są identyfikowani po adresie e-mail.
- **Zmiana adresu e-mail tworzy nowego subskrybenta.** Mailchimp identyfikuje osoby po adresie e-mail, więc zmiana adresu w B1 dodaje osobę pod nowym adresem. Stary subskrybent pozostaje, dopóki nie zarchiwizujesz go w Mailchimp.
- **Synchronizowane są tylko standardowe pola**: imię, nazwisko i telefon. Status członkostwa, kampus i niestandardowe pola B1 nie są w tej wersji mapowane na pola scalania Mailchimp. Do segmentacji używaj tagów list.
- **Nazwy tagów to nazwy grup i list.** Zmiana nazwy grupy lub listy powoduje tagowanie pod nową nazwą. Stary tag pozostaje przy istniejących subskrybentach, dopóki nie zostanie usunięty w Mailchimp.
- **Obowiązują limity kontaktów Mailchimp.** Jeśli synchronizacja przekroczy limit konta w planie darmowym, w historii dostarczeń pojawią się błędy `Member limit reached`.

## Inne scenariusze (Zapier / Make)

Wszystko, co wykracza poza synchronizację listy odbiorców, np. tagowanie darczyńców po zdarzeniu `donation.created`, odwrotny kierunek synchronizacji Mailchimp → B1 lub synchronizacja z zupełnie inną platformą e-mailową (Constant Contact, Brevo itp.), nadal można zrealizować za pomocą [Zapier](../zapier.md) lub [Make](../make.md). Oba narzędzia reagują na te same zdarzenia webhooka:

- **Tagowanie darczyńców:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Dwukierunkowo:** Mailchimp *New Subscriber* → B1 *Create Person*

Jeśli wcześniej skonfigurowano synchronizację osób i grup przez Zapier, wyłącz te Zapy po włączeniu natywnego konektora. Działanie obu rozwiązań równolegle powoduje podwójne przetwarzanie każdego zdarzenia i niepotrzebnie zużywa zadania Zapier.

## Rozwiązywanie problemów

- **Zapis kończy się komunikatem „Mailchimp rejected the API key”**: klucz został unieważniony lub wpisany z błędem. Klucze muszą kończyć się sufiksem centrum danych, np. `-us21`.
- **Zapis kończy się komunikatem „audience not found”**: identyfikator listy nie istnieje na tym koncie. Skopiuj go z **Audience → Settings → Audience name and defaults**. Nie jest to nazwa listy.
- **Osoba nigdy nie pojawiła się w Mailchimp**: sprawdź historię dostarczeń webhooka. Komunikat „Skipped: person has no email address” oznacza dokładnie to, co mówi. Kod `4xx` z Mailchimp pokazuje przyczynę w treści odpowiedzi.
- **Dostawy całkowicie ustały**: po wielokrotnych nieudanych dostawach webhook jest automatycznie wyłączany. Usuń przyczynę (zwykle unieważniony klucz), włącz webhook ponownie i użyj **Send Test**, aby potwierdzić działanie.

## Zobacz także

- [Webhooks (dokumentacja dla deweloperów)](/docs/developer/api/webhooks): silnik działający pod spodem, katalog zdarzeń, zasady dostarczania i ponawiania
- [Zapisane listy](/docs/b1-admin/people/lists): grupy odbiorców oparte na regułach, które naturalnie odpowiadają tagom w Mailchimp
- [Zapier (przegląd)](../zapier.md): scenariusze wykraczające poza synchronizację listy odbiorców
