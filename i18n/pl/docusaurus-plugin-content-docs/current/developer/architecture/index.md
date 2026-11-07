---
title: "Architektura"
---

# Architektura

<div class="article-intro">

Te strony to mapy systemów obejmujących wiele repozytoriów: opisują, jak główne systemy ChurchApps działają od początku do końca — w aplikacjach, modułach API i wspólnych bibliotekach — a nie jak skonfigurować pojedynczy projekt. Przeczytaj je przed zmianą zachowania systemu. Aby uruchomić projekt, przeczytaj [Konfiguracja](../setup/), a dokumentację punktów końcowych znajdziesz w [sekcji API](../api/).

</div>

## Ekosystem w skrócie

ChurchApps to ok. 20 niezależnych repozytoriów (nie monorepo). Aplikacje klienckie komunikują się z niewielkim zestawem backendowych API przez HTTPS i WebSocket, a kod udostępniają za pomocą pakietów npm publikowanych w zakresie `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Dwie zasady strukturalne określają wszystko, co opisano w tej sekcji:

1. **Moduły są izolowane.** Każdy moduł Api ma własną bazę danych i własne tabele; inne moduły i aplikacje uzyskują dostęp do jego danych wyłącznie przez punkty końcowe REST. Zob. [Struktura modułu](../api/module-structure).
2. **Wspólny kod jest dostarczany jako pakiety npm.** Aplikacje nigdy nie importują kodu źródłowego innych aplikacji; wszystko, co jest ponownie używane, przekracza granice repozytoriów za pośrednictwem `@churchapps/helpers`, `@churchapps/apphelper` lub `@churchapps/apihelper`. Zob. [Biblioteki współdzielone](../shared-libraries/).

## Mapy systemów

| Strona | Zakres tematyczny | Obejmuje |
|------|----------------|-------|
| [Powiadomienia i przypomnienia](./notifications) | Jak system przekazuje osobie informacje: dwa punkty wysyłania, łańcuch eskalacji kanałów i silnik przypomnień | Api (messaging), B1Admin, B1App |
| [Architektura czasu rzeczywistego](../realtime) | Platforma dostarczania WebSocket obsługująca czat, obecność użytkowników i dostarczanie w aplikacji | Api (messaging), all web apps |
| [Powiadomienia Web Push](../web-push) | Kanał powiadomień push w przeglądarce: klucze VAPID, przechowywanie subskrypcji, dostarczanie | Api (messaging), all web apps |
| [Darowizny](./giving) | Dostawcy płatności i bramki płatnicze, przepływy darowizn, fundusze i partie, webhooki bramek płatniczych | Api (giving), apphelper, B1App, B1Admin |
| [Rejestracje na wydarzenia](./registrations) | Model handlowy rejestracji: typy uczestników, wybory, kody rabatowe, płatności przez bramkę darowizn oraz lista oczekujących | Api (content + giving), B1App, B1Admin |
| [Zameldowania](./check-ins) | Zameldowanie przy kiosku i samodzielne, model danych frekwencji, kierowanie do sal, warstwa bezpieczeństwa dzieci, drukowanie etykiet | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Kreator stron internetowych](./website-builder) | Drzewo stron/sekcji/elementów, kontrakt typów elementów i renderery, blog, strony z kontrolą dostępu, SEO i generowanie za pomocą AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routing stron i wiele witryn](./websites) | Jak żądanie jest kierowane do kościoła i konkretnej witryny, model danych dla wielu witryn `siteId` oraz brzeg Caddy dla domen niestandardowych | B1App, Api (membership + content), B1Admin |
| [Integracje](./integrations) | Powierzchnia rozszerzeń: OAuth, klucze API, webhooki, dostawcy treści, MCP | Api, shared libraries, external apps |
| [Dziennik audytu i cofalne partie](./audit-log) | Domyślnie włączony audyt każdej modyfikacji w punkcie kontrolera oraz warstwa partii, dzięki której importy i operacje zbiorcze można cofnąć | Api (all modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Płatna usługa przechowywania i kredytów na SMS-y: tożsamość oparta na wspólnym JWT, S2S z kluczem usługi, punkty styku dostawców SMS i pamięci masowej, rozliczenia Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper packages, B1Admin |
| [Własna pamięć masowa](./byos-storage) | Kościoły łączą Dysk Google, Dropbox, OneDrive lub zasobnik zgodny z S3 w celu przesyłania plików powyżej darmowego limitu 100 MB: połączenie OAuth, formaty przesyłania dla poszczególnych dostawców, publiczne przekierowanie pobierania | Api (content + membership), helpers/apphelper packages, B1Admin, B1App |
| [Wspólne zasoby treści](./commons) | Wspólny rdzeń zasobów i zgłoszeń, na którym opierają się treści generowane przez użytkowników w wielu produktach, oraz jedyna kolejka moderacji dostępna tylko dla personelu w B1Admin Server Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Jeśli zmiana zmienia sposób działania jednego z tych systemów — a nie tylko strony w jednej aplikacji — odpowiadającą jej mapę systemu należy zaktualizować w ramach tej samej pracy. Dzięki temu ta sekcja pozostaje wiarygodnym pierwszym punktem odniesienia dla nowych współtwórców.
:::

## Propozycje

Te dokumenty opisują proponowane prace do przeglądu, a nie dostępne funkcjonalności produktu.

| Propozycja | Zakres tematyczny |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Konto należące do kościoła, klucze, usługa i numer telefonu; zakres integracji, zgoda, dostarczanie, szacunki i kontrole wydania |
| [Wersja robocza wdrożenia Twilio dla kościołów](./twilio-byok-onboarding-draft) | Proponowane ustawienia formularza rejestracji B1, przykłady kampanii dla konkretnych kościołów oraz listy kontrolne zatwierdzania i eksploatacji |
