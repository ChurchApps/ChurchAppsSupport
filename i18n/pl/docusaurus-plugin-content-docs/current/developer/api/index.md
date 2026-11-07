---
title: "API"
description: "Wyjaśnia modułową architekturę API ChurchApps, sześć modułów danych, stos technologiczny, porty i funkcje Lambda, z linkami do dokumentacji dla deweloperów."
---

# API

<div class="article-intro">

Interfejs API ChurchApps to **monolit modułowy** -- pojedyncza baza kodu obsługująca sześć modułów danych, z których każdy ma własną bazę danych. Ta architektura daje korzyści organizacyjne mikrousług (wyraźne granice, niezależne magazyny danych) przy prostocie operacyjnej pojedynczego wdrożenia.

</div>

## Moduły

| Moduł | Przeznaczenie |
|--------|---------|
| **Membership** | Osoby, grupy, gospodarstwa domowe, uprawnienia |
| **Attendance** | Nabożeństwa, sesje, rekordy zameldowań |
| **Content** | Strony, sekcje, elementy, transmisje |
| **Giving** | Darowizny, fundusze, obsługa płatności |
| **Messaging** | Rozmowy, powiadomienia, e-mail |
| **Doing** | Zadania, plany, przydziały |

## Stos technologiczny

- **Środowisko uruchomieniowe:** Node.js 24.x z TypeScript (moduły ES)
- **Framework:** Express
- **Wstrzykiwanie zależności:** Inversify (routing oparty na dekoratorach)
- **Baza danych:** MySQL -- jedna baza na moduł, każda z własną pulą połączeń
- **Uwierzytelnianie:** uwierzytelnianie oparte na JWT za pośrednictwem `CustomAuthProvider`
- **Wdrażanie:** AWS Lambda za pomocą Serverless Framework v3

## Porty

| Protokół | Port | Opis |
|----------|------|-------------|
| HTTP | `8084` | Główne REST API |
| WebSocket | `8087` | Połączenia gniazd w czasie rzeczywistym |

## Funkcje Lambda

Po wdrożeniu w AWS API działa jako sześć funkcji Lambda:

- **`web`** -- obsługuje wszystkie żądania HTTP
- **`socket`** -- zarządza połączeniami WebSocket
- **`timer15Min`** -- uruchamiana co 30 minut w celu wysyłania powiadomień e-mail (nazwa jest historyczna)
- **`timerMidnight`** -- uruchamiana codziennie w celu wysyłania e-maili z podsumowaniami i zadań konserwacyjnych
- **`timerScheduledTasks`** -- uruchamiana codziennie w celu przetwarzania zaplanowanych automatyzacji i zaległych procesów roboczych
- **`timerWebhooks`** -- uruchamiana co minutę w celu dostarczania zakolejkowanych webhooków wychodzących

## Biblioteki współdzielone

API korzysta z dwóch współdzielonych pakietów ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)** -- podstawowe narzędzia (DateHelper, ApiHelper itp.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)** -- narzędzia serwera Express, w tym uwierzytelnianie, pomocnicze funkcje bazy danych i integracje z AWS

:::info
API korzysta z modułów ES (`"type": "module"` w `package.json`). Upewnij się, że importy używają składni modułów ES.
:::

## W tej sekcji

- **[Lokalna konfiguracja](./local-setup.md)** -- sklonuj, skonfiguruj i uruchom API lokalnie
- **[Baza danych](./database.md)** -- architektura bazy na moduł, skrypty schematu i wzorce dostępu do danych
- **[Struktura modułów](./module-structure.md)** -- kontrolery, repozytoria, modele i uwierzytelnianie
- **[Klucze API](./api-keys.md)** -- osobiste tokeny dostępu do skryptów i konektorów
- **[Połączone aplikacje (OAuth)](./connected-apps.md)** -- wielonajemcowy przepływ OAuth dla aplikacji zewnętrznych
- **[Webhooki](./webhooks.md)** -- wysyłanie powiadomień o zdarzeniach do systemów zewnętrznych
- **[Serwer MCP](./mcp.md)** -- punkt końcowy Model Context Protocol udostępniający API asystentom AI
- **[Dokumentacja punktów końcowych](./endpoints/index.md)** -- pełna dokumentacja REST API dla wszystkich modułów
