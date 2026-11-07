---
title: "Subsplash"
description: "Połącz darowizny Subsplash, nowe osoby i odpowiedzi z formularzy z B1 przez Zapier, aby wpłaty i profile trafiały automatycznie do B1 Admin."
---

# Subsplash

<div class="article-intro">

Jeśli korzystasz z Subsplash w aplikacji kościelnej, do darowizn lub formularzy, ale chcesz, aby B1 był głównym systemem do przechowywania danych o osobach i darowiznach, aplikacja Zapier firmy Subsplash może w czasie rzeczywistym przesyłać do B1 darowizny, nowe profile i odpowiedzi z formularzy. Pamiętaj, że aplikacja Zapier firmy Subsplash obsługuje obecnie wyłącznie **wyzwalacze**, więc połączenie działa jednokierunkowo (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Konto Subsplash w planie, który obejmuje dostęp do **API + Zapier** (szczegóły sprawdź u swojego opiekuna klienta w Subsplash; ta funkcja zależy od poziomu planu)
- Konto na [Zapier](https://zapier.com)
- Użytkownik B1Admin z uprawnieniem **Edit Settings**

</div>

## Co można połączyć

Wszystkie poniższe wyzwalacze pochodzą z Subsplash. Akcje należą do B1.

| Wyzwalacz w Subsplash | Akcja w B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person, jeśli osoby brak) |
| New Pledge | Add Donation (z `notes` = „Pledge: …”) |
| New Person Created | Create Person |
| Person Updated Profile | (brak bezpośredniej akcji w B1 — zapisz w Arkuszu Google do ręcznego przeglądu) |
| New Form Response | Create Person + (opcjonalnie) Add Group Member na podstawie formularza |

Obecnie aplikacja Subsplash obsługuje wyłącznie kierunek Subsplash → B1.

## Konfiguracja

### 1. Utwórz klucz API w B1

W B1Admin wybierz: **Settings → Developer → API Keys → New API Key**. Zakresy uprawnień:

- `people:read` — do wyszukiwania darczyńcy po adresie e-mail
- `people:write` — do utworzenia osoby, jeśli jeszcze nie istnieje
- `donations:write` — do zapisania darowizny
- (Zakres `settings:write` nie jest potrzebny — wyzwalacz zarządza Subsplash, a nie B1.)

### 2. Połącz Subsplash z Zapier

Postępuj zgodnie z [przewodnikiem integracji Subsplash z Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash wystawia token API w panelu Subsplash Dashboard; Zapier używa go do uwierzytelnienia po stronie wyzwalacza.

### 3. Utwórz Zap „zapisz darowiznę”

1. **Wyzwalacz** — Subsplash: New Donation
2. **Akcja** — B1.church: Find Person (po adresie e-mail)
3. **Filtr / Ścieżka** — rozgałęzienie według wyniku „person found”:
   - **Znaleziono:** B1.church: Add Donation. Zmapuj kwotę, datę, fundusz, metodę = „Online” oraz notatki = identyfikator transakcji Subsplash.
   - **Nie znaleziono:** B1.church: Create Person → B1.church: Add Donation (z identyfikatorem nowo utworzonej osoby).

Włącz Zap. Kolejne darowizny z Subsplash będą trafiać do **B1Admin → Donations** w ciągu kilku sekund.

## Popularne scenariusze

### Wyślij podziękowanie po pierwszej darowiźnie

- **Wyzwalacz** — Subsplash: New Donation
- **Akcja** — Filter by Zapier: kontynuuj tylko wtedy, gdy to pierwsza darowizna darczyńcy (użyj *Lookup Table* z adresem e-mail darczyńcy i Arkuszem Google z listą dotychczasowych darczyńców albo kroku Zapier *Paths* opartego na dacie utworzenia darczyńcy)
- **Akcja** — Mailchimp / SMTP / SendGrid: wyślij wiadomość z podziękowaniem za pierwszą darowiznę
- **Akcja** — B1.church: Add Donation (jak zwykle)

### Oddziel zobowiązania od zwykłych darowizn

- **Wyzwalacz** — Subsplash: New Pledge
- **Akcja** — B1.church: Add Donation z `notes = "Pledge — Subsplash"` oraz funduszem o nazwie `Pledges` (oddzielnym od funduszu operacyjnego), dzięki czemu zobowiązania możesz raportować osobno w **B1Admin → Donations → Summary**.

### Synchronizuj nowych użytkowników aplikacji jako osoby w B1

- **Wyzwalacz** — Subsplash: New Person Created
- **Akcja** — B1.church: Create Person, wypełniając imię i nazwisko, e-mail i telefon. Oznacz osobę w B1, dodając ją do grupy np. „Subsplash App Users”.

## Ograniczenia i uwagi

- **Aplikacja Zapier firmy Subsplash obsługuje wyłącznie wyzwalacze.** Jeśli chcesz, aby zmiany po stronie B1 (np. nowa osoba w B1) trafiały także do Subsplash, musisz zbudować most z wyzwalaczy aplikacji Zapier B1, które wywołują REST API Subsplash przez akcję *Webhooks by Zapier — POST*. To niestandardowa integracja, a nie gotowy przepis.
- **Dostęp do API zależy od planu.** Jeśli połączenie w Zapier kończy się błędem `403 Forbidden`, Twój plan Subsplash prawdopodobnie nie obejmuje dostępu do API — skontaktuj się z opiekunem klienta.
- **Mapowanie funduszy wykonujesz ręcznie.** Subsplash przekazuje nazwę kampanii lub kategorii, a B1 wymaga numerycznego identyfikatora funduszu. Możesz wpisać fundusz na sztywno w Zap albo utrzymywać *Lookup Table* w Zapier, która przypisuje kampanie Subsplash do funduszy B1.

## Rozwiązywanie problemów

- **Po darowiźnie nie uruchamia się żaden wyzwalacz** — sprawdź w panelu Zapier dla Subsplash, czy połączenie nadal ma status *Connected*. Jeśli po stronie Subsplash zmieniono token API, Zap po cichu przestaje działać; połącz go ponownie.
- **Akcja B1 *Add Donation* kończy się błędem 422** — najczęściej brakuje `fundId` albo podano nierozpoznany identyfikator. Listę funduszy znajdziesz w **B1Admin → Donations → Funds**; skopiuj dokładny identyfikator do kroku Zap.
- **Pierwsza darowizna uruchamia wyzwalacz dwukrotnie** — Subsplash czasem ponownie wysyła wyzwalacz, jeśli Zapier nie potwierdził jego odbioru. Dodaj *Filter by Zapier* oparty na identyfikatorze darowizny (Subsplash przesyła go w danych), aby odfiltrować duplikaty.

## Zobacz także

- [Donorbox](./donorbox.md) — ten sam schemat przepisów, inna platforma do darowizn
- [Zapier (przegląd)](../zapier.md) — strona B1 wszystkich przepisów Zapier
- [Przewodnik integracji Subsplash z Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (dokumentacja Subsplash)
