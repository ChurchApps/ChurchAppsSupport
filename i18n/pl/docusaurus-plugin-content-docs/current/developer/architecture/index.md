---
title: "Architektura"
description: "Mapy systemów obejmujące wiele repozytoriów, pokazujące, jak działają darowizny, zameldowania, powiadomienia i strony internetowe w B1 Admin, B1.church i Api, zanim wprowadzisz zmiany."
---

# Architektura

<div class="article-intro">

Te strony to mapy systemów obejmujące wiele repozytoriów: opisują, jak podstawowy system ChurchApps działa od początku do końca — w aplikacjach, modułach API i wspólnych bibliotekach — a nie jak skonfigurować pojedynczy projekt. Przeczytaj je przed zmianą działania systemu; przeczytaj [Konfigurację](../setup/index.md), aby uruchomić projekt, oraz [sekcję API](../api/index.md) jako dokumentację na poziomie endpointów.

</div>

## Ekosystem w skrócie

ChurchApps to ok. 20 niezależnych repozytoriów (a nie monorepo). Aplikacje kliencki komunikują się z niewielkim zestawem backendowych API przez HTTPS i WebSocket, a kod współdzielą poprzez pakiety npm publikowane w zakresie `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Dwie zasady strukturalne określają wszystko, co opisano w tej sekcji:

1. **Moduły są odizolowane.** Każdy moduł Api posiada własną bazę danych i tabele; inne moduły i aplikacje mają dostęp do jego danych wyłącznie przez jego endpointy REST. Zobacz [Strukturę modułu](../api/module-structure.md).
2. **Wspólny kod jest dostarczany jako pakiety npm.** Aplikacje nigdy nie importują kodu źródłowego innych aplikacji; wszystko, co jest ponownie używane, przekracza granice repozytoriów przez `@churchapps/helpers`, `@churchapps/apphelper` lub `@churchapps/apihelper`. Zobacz [Wspólne biblioteki](../shared-libraries/index.md).

## Mapy systemu

| Strona | Co obejmuje | Zakres |
|------|----------------|-------|
| [Notifications & Reminders](./notifications.md) | Jak system przekazuje osobie informację: dwa punkty wysyłki, łańcuch eskalacji kanałów oraz silnik przypomnień | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime.md) | Framework dostarczania WebSocket stojący za czatem, statusem obecności i dostarczaniem w aplikacji | Api (messaging), all web apps |
| [Web Push Notifications](../web-push.md) | Kanał powiadomień push w przeglądarce: klucze VAPID, przechowywanie subskrypcji, dostarczanie | Api (messaging), all web apps |
| [Giving](./giving.md) | Dostawcy płatności i bramki, przepływy darowizn, fundusze/partie, webhooki bramek | Api (giving), apphelper, B1App, B1Admin |
| [Event Registrations](./registrations.md) | Model handlowy rejestracji: typy uczestników, wybory, kody rabatowe, płatności przez bramkę darowizn oraz listę oczekujących | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins.md) | Zameldowanie na kiosku i samodzielne, model danych frekwencji, kierowanie do sal, warstwa bezpieczeństwa dzieci, drukowanie etykiet | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder.md) | Drzewo stron/sekcji/elementów, kontrakt typów elementów i renderery, blog, strony z kontrolowanym dostępem, SEO oraz generowanie AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website Routing & Multi-Site](./websites.md) | Jak żądanie trafia do konkretnego kościoła i witryny, model danych wielowitrynowych z `siteId` oraz brzeg domen niestandardowych Caddy | B1App, Api (membership + content), B1Admin |
| [Integrations](./integrations.md) | Powierzchnia rozszerzeń: OAuth, klucze API, webhooki, dostawcy treści, MCP | Api, shared libraries, external apps |
| [Audit Log & Undoable Batches](./audit-log.md) | Domyślnie włączony audyt każdej modyfikacji w punkcie kontrolera oraz warstwa partii, dzięki której importy i operacje zbiorcze można cofnąć | Api (all modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Płatna usługa przechowywania i kredytów SMS: tożsamość oparta na wspólnym JWT, S2S z kluczem usługi, punkty styku dostawców SMS i przechowywania, rozliczenia Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper packages, B1Admin |
| [Bring-Your-Own Storage](./byos-storage.md) | Kościoły łączą Dysk Google, Dropbox, OneDrive lub kontener zgodny z S3 w celu przesyłania plików ponad darmowy limit 100 MB: połączenie OAuth, kształty przesyłania dla poszczególnych dostawców, publiczne przekierowanie pobierania | Api (content + membership), helpers/apphelper packages, B1Admin, B1App |
| [Content Commons](./commons.md) | Wspólny szkielet zasobów i zgłoszeń leżący u podstaw treści tworzonych przez użytkowników w wielu produktach oraz jedyna kolejka moderacji dostępna tylko dla personelu w B1Admin Server Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Gdy zmiana modyfikuje działanie jednego z tych systemów — a nie tylko jednej strony w obrębie aplikacji — odpowiadającą mu mapę systemu należy zaktualizować w ramach tej samej pracy. Dzięki temu ta sekcja pozostaje wiarygodnym pierwszym punktem odniesienia dla nowych współtwórców.
:::

## Propozycje

Te dokumenty opisują proponowane prace do przeglądu, a nie dostępne funkcjonalności produktu.

| Propozycja | Co obejmuje |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Konto należące do kościoła, klucze, usługa i numer telefonu; zakres integracji, zgoda, dostarczanie, szacunki oraz kontrole wydania |
| [Twilio church onboarding draft](./twilio-byok-onboarding-draft.md) | Proponowane ustawienia formularza rejestracji B1, przykłady kampanii dla kościołów oraz listy kontrolne zatwierdzania i eksploatacji |
