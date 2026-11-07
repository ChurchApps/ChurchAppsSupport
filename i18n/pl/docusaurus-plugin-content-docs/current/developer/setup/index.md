---
title: "Konfiguracja"
description: "Wybierz lokalną ścieżkę pracy z projektami ChurchApps: praca nad frontendem na wspólnych demo API lub pełny stos lokalnie z MySQL do zmian w backendzie."
---

# Konfiguracja

<div class="article-intro">

Ta sekcja przeprowadzi Cię przez konfigurowanie lokalnego środowiska programistycznego dla projektów ChurchApps. Możesz albo skierować swój frontend na wspólne demonstracyjne API w celu szybkiego programowania, albo uruchomić pełny stos lokalnie, jeśli pracujesz nad backendem.

</div>

## Dwa podejścia

Istnieją dwa sposoby lokalnego programowania, w zależności od tego, ile stosu potrzebujesz:

### 1. Wskaż demonstracyjne API (najprostsze)

Jeśli pracujesz nad **projektem frontendowym** (aplikacją internetową, mobilną lub desktopową), najszybszą drogą jest skierowanie lokalnej aplikacji na wspólne demonstracyjne API. Nie jest wymagana żadna konfiguracja bazy danych ani backendu.

Bazowy adres URL demonstracyjnego API to:

```
https://api.demo.churchapps.org
```

Każdy moduł API jest dostępny pod ścieżką w tym adresie, na przykład:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Środowisko demonstracyjne uruchamia najnowszy kod z `main`, a jego dane przykładowe są odtwarzane każdej nocy, więc nie spodziewaj się, że cokolwiek tam utworzysz, przetrwa. (Dawne środowisko staging, `api.staging.churchapps.org`, zostało wycofane. Niektóre przykładowe pliki `.env` mogą nadal zawierać adresy staging -- zastąp je adresami demo lub lokalnymi.)

:::tip
To podejście pozwala zacząć wprowadzać zmiany we frontendzie w ciągu kilku minut. Jest to zalecana ścieżka dla większości współtwórców.
:::

### 2. Uruchom wszystko lokalnie

Jeśli musisz zmodyfikować kod API lub pracować offline, możesz uruchomić pełny stos lokalnie. Wymaga to MySQL 8.0+ oraz dodatkowej konfiguracji. Szczegółowe instrukcje znajdziesz w przewodniku [lokalna konfiguracja API](../api/local-setup.md).

## Pierwsze kroki

Wykonuj te strony w podanej kolejności:

1. **[Wymagania wstępne](./prerequisites.md)** -- Zainstaluj wymagane narzędzia (Node.js, Git, MySQL itd.)
2. **[Przegląd projektów](./project-overview.md)** -- Poznaj, jakie projekty istnieją i co robią
3. **[Zmienne środowiskowe](./environment-variables.md)** -- Skonfiguruj pliki `.env`, aby połączyć wszystko ze sobą

:::info
Każdy projekt ChurchApps to niezależne repozytorium Git. Musisz sklonować tylko te konkretne projekty, nad którymi chcesz pracować.
:::
