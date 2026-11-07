---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO to platforma do zaangażowania wolontariuszy. Ludzie zapisują się na projekty, meldują się przy kiosku i zbierają godziny. Jeśli używasz VOMO do planowania wolontariatu, a B1 do danych osób, Zapier może synchronizować członkostwo i meldunki między nimi, tak aby oba systemy były zgodne.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto [VOMO](https://vomo.org) w planie, który udostępnia Zapiera (jeśli nie masz pewności, zapytaj pomoc techniczną VOMO)
- Konto [Zapier](https://zapier.com)
- Użytkownik B1Admin z uprawnieniem **Edytuj ustawienia**

</div>

## Co możesz połączyć

Aplikacja VOMO w Zapierze udostępnia cztery wyzwalacze natychmiastowe i cztery akcje. Najczęściej wybierane scenariusze to:

| Kierunek | Wyzwalacz | Akcja |
|---|---|---|
| VOMO → B1 | VOMO Membership (utworzono) | B1: Znajdź osobę → Utwórz osobę (jeśli nowa) |
| VOMO → B1 | Meldunek przy kiosku VOMO | B1: Dodaj członka do grupy „Currently Serving” lub zapisz jako obecność |
| B1 → VOMO | B1 `person.created` | VOMO: Znajdź organizatora (po e-mailu); w przeciwnym razie niestandardowy krok |
| Dowolny | Udział w VOMO (zapisy) | B1: Dodaj członka do grupy przypisanej do projektu |

Akcje VOMO ograniczają się obecnie do **tworzenia projektów w wersji roboczej** oraz **wyszukiwania** istniejących organizatorów i projektów. Nie ma akcji „dodaj tę osobę do projektu VOMO”. Najciekawsze połączenia dotyczą głównie kierunku VOMO → B1.

## Konfiguracja

### 1. Utwórz klucz API B1

**Ustawienia → Developer → API Keys → New API Key**. Zakresy:

- `people:read`, `people:write`, aby wyszukiwać i tworzyć wolontariuszy jako osoby w B1
- `groups:write`, aby dodawać ich do grup zespołów służebnych
- (Opcjonalnie) `attendance:write`, jeśli meldunki przy kiosku mają być traktowane jako obecność

### 2. Zbuduj Zap synchronizacji członkostwa

1. **Wyzwalacz** — VOMO: Membership (zdarzenie = `created`).
2. **Akcja** — B1.church: Znajdź osobę, dopasowanie po e-mailu.
3. **Filtr / Ścieżka** — rozgałęzienie w zależności od tego, czy osoba została znaleziona:
   - Nie znaleziono → B1.church: Utwórz osobę, a następnie Dodaj członka do odpowiedniej grupy wolontariuszy.
   - Znaleziono → B1.church: Dodaj członka do grupy bezpośrednio.
4. Włącz Zap. Nowi wolontariusze z VOMO pojawią się w B1 z odpowiednim członkostwem w grupach.

### 3. (Opcjonalnie) Zbuduj Zap meldunków przy kiosku

1. **Wyzwalacz** — VOMO: Kiosk
2. **Akcja** — B1.church: Znajdź osobę (po e-mailu)
3. **Akcja** — wybierz jedną z opcji:
   - *Jeśli traktujesz to jako obecność* — Webhooks by Zapier wysyła żądanie POST do endpointu `/attendance/visits` w B1 (aplikacja B1 w Zapierze nie ma jeszcze dedykowanej akcji *Zapisz obecność*). [Klucz API](/docs/developer/api/api-keys) B1 umieszcza się w nagłówku `Authorization: Bearer cak_…`.
   - *Jeśli traktujesz to jako członkostwo w grupie* — B1.church: Dodaj członka do grupy „Currently Serving (Today)”, a drugi Zap uruchamiany później tego dnia usuwa ich za pomocą zaplanowanego czyszczenia.

## Częste scenariusze

### Synchronizacja grup dla projektu

- **Wyzwalacz** — VOMO: Participation (utworzono)
- **Akcja** — Filtr Zapier po identyfikatorze projektu, a następnie
- **Akcja** — B1.church: Dodaj członka do grupy B1, której nazwa odpowiada projektowi VOMO.

Gdy projekt VOMO się zakończy, ręcznie wyczyść grupę w B1 (albo połącz to z wyzwalaczem *Participation deleted*, który usuwa osoby z grupy).

### Wysyłanie SMS-a z podziękowaniem za zapis

W tym samym Zapie połącz VOMO Participation z akcją Clearstream Send Text lub Text In Church Send Message. Obie mają natywne akcje Zapiera. Zobacz [Clearstream](./clearstream) i [Text In Church](./text-in-church).

### Wykrywanie rezygnacji

Uruchom codzienny wyzwalacz *Schedule* w Zapierze, który wywołuje akcję Find Organizer w VOMO dla listy osób z B1, które w tym miesiącu dołączyły do zespołu służebnego. Jeśli VOMO zwróci „not found”, oznacza to, że dana osoba nie aktywowała konta VOMO i warto ją przypomnieć.

## Ograniczenia i uwagi

- **E-mail jest kluczem łączącym.** Dane z VOMO zawierają adres e-mail użytkownika, ale nie identyfikator osoby w B1. Darczyńcy, którzy w każdym systemie używają innych adresów e-mail, zostaną zduplikowani.
- **Brak akcji „Dodaj do projektu” w aplikacji VOMO dla Zapiera.** Jeśli potrzebujesz zapisywania osób z B1 do projektu VOMO, musisz wysłać żądanie POST do REST API VOMO z kroku *Webhooks by Zapier*. To integracja niestandardowa.
- **Darmowe lub niższe plany VOMO mogą nie zawierać Zapiera.** Przed podaniem terminu wdrożenia połączenia potwierdź to w pomocy technicznej VOMO.

## Rozwiązywanie problemów

- **Wyzwalacz nigdy się nie uruchamia** — natychmiastowe wyzwalacze VOMO wymagają, aby token API pozostał ważny. Przetestuj Zap ponownie i połącz VOMO na nowo, jeśli token został zmieniony.
- **Akcja B1 *Add Group Member* kończy się błędem 422** — identyfikator grupy w akcji nie istnieje. Otwórz **B1Admin → Groups**, kliknij grupę i skopiuj fragment identyfikatora z adresu URL do kroku Zapa.
- **Zduplikowane osoby w B1 z jednego wolontariusza VOMO** — prawdopodobnie zapisał się przy użyciu innego adresu e-mail niż ten, który już był w B1. Ujednolić adresy e-mail albo dodać *Ścieżkę* w Zapierze, która przed utworzeniem osoby wyszukuje również po numerze telefonu.

## Zobacz także

- [Zapier (przegląd)](../zapier) — strona B1 dla każdego scenariusza Zapiera
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — łączą zapisy wolontariuszy z potwierdzeniami SMS
- [Webhooks (dokumentacja deweloperska)](/docs/developer/api/webhooks) — zdarzenia, które mogą uruchamiać VOMO
