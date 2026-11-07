---
title: "Wdrażanie API"
description: "Wdróż API ChurchApps na AWS Lambda za pomocą Serverless: budowanie, przepływy demo i prod, migracje baz danych i konfiguracja SSM."
---

# Wdrażanie API

<div class="article-intro">

Interfejsy API ChurchApps są wdrażane jako funkcje AWS Lambda przy użyciu Serverless Framework. Ta strona opisuje proces budowania, wdrażania i konfiguracji dla środowisk demo i produkcyjnego.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj API lokalnie -- zobacz [Lokalna konfiguracja API](../api/local-setup.md)
- Skonfiguruj poświadczenia AWS na swoim komputerze
- Upewnij się, że masz dostęp do docelowego konta AWS

</div>

## Budowanie

Interfejsy API są budowane do środowiska produkcyjnego przy użyciu dedykowanej konfiguracji TypeScript:

```bash
npm run build:prod
```

Ta komenda używa pliku `tsconfig.prod.json` do skompilowania projektu dla środowiska uruchomieniowego Lambda.

## Wdrażanie

Wdróż do środowiska demo:

```bash
npm run deploy-demo
```

Wdróż na produkcję:

```bash
npm run deploy-prod
```

W praktyce API jest wdrażane przez GitHub Actions: **Deploy Demo** uruchamia się przy każdym wypchnięciu zmian do `main`, a **Deploy Prod** jest uruchamiany ręcznie (workflow dispatch). Środowisko staging nie istnieje już.

## Migracje bazy danych

**Deploy Prod** stosuje oczekujące migracje bazy danych w ramach wdrożenia. Bazy danych produkcyjne akceptują połączenia tylko z wnętrza VPC, dlatego zaraz po `serverless deploy` workflow wywołuje funkcję Lambda `migrate` (`api-Prod-migrate`), która uruchamia oczekujące migracje każdego modułu i zwraca `{ ok, environment, modules }`. Jeśli którykolwiek moduł zakończy się niepowodzeniem lub zostanie odrzucony (na przykład baza danych bez historii migracji), zadanie kończy się błędem, aby schemat nigdy nie pozostał w tyle za kodem. **Rollback Prod** cofa wyłącznie kod funkcji Lambda; migracje pozostają zastosowane, dlatego pisz je w sposób addytywny. Informacje o sprawdzaniu stanu lub ręcznym uruchamianiu migracji znajdziesz w artykule [Server Admin -- Database Migrations](../server-admin.md#database-migrations).

## Co zostaje utworzone

Każde wdrożenie API tworzy lub aktualizuje następujące funkcje AWS Lambda:

| Funkcja | Przeznaczenie |
|----------|---------|
| `web` | Obsługa żądań HTTP przez API Gateway |
| `socket` | Obsługa połączeń WebSocket |
| `timer15Min` | Zadanie cykliczne uruchamiane co 30 minut (nazwa pochodzi z historycznych powodów) |
| `timerMidnight` | Zadanie cykliczne uruchamiane codziennie o północy |
| `migrate` | Stosuje oczekujące migracje bazy danych; wywoływana przez workflow Deploy Prod |

## Konfiguracja środowiska

W środowiskach wdrożonych konfiguracja jest odczytywana z **AWS SSM Parameter Store** zamiast z plików `.env`. Dzięki temu sekrety nie trafiają do paczki wdrożeniowej, a zmiany konfiguracji można wprowadzać bez ponownego wdrażania.

:::warning
Nigdy nie zapisuj danych uwierzytelniających środowiska produkcyjnego w repozytorium. Całą wrażliwą konfigurację należy przechowywać w AWS SSM Parameter Store i pobierać w czasie wykonywania.
:::

:::tip
Każde scalenie zmian do `main` najpierw wdraża kod do środowiska demo. Przed uruchomieniem Deploy Prod sprawdź swoją zmianę tam (na przykład pod adresem [demo.b1.church](https://demo.b1.church)).
:::

## Powiązane artykuły

- **[Lokalna konfiguracja API](../api/local-setup.md)** -- Konfiguracja API na potrzeby programowania
- **[Struktura modułów](../api/module-structure.md)** -- Zrozumienie architektury funkcji Lambda
- **[Wdrażanie aplikacji webowych](./web-apps.md)** -- Wdrażanie aplikacji frontendowych
