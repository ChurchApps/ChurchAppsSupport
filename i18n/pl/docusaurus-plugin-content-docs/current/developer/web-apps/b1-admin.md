---
title: "B1 Admin"
description: "Lokalna konfiguracja B1 Admin: klonowanie panelu React/Vite, endpointy API w .env i uruchomienie serwera deweloperskiego do zarządzania kościołem."
---

# B1 Admin

<div class="article-intro">

B1Admin to panel administracyjny kościoła, aplikacja jednostronicowa (SPA) w React, zbudowana z użyciem Vite i Material-UI. Personel kościoła używa jej do zarządzania osobami, grupami, frekwencją, darowiznami, treściami i nie tylko.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj **Node.js 22+** i **Git** -- zobacz [Wymagania wstępne](../setup/prerequisites.md)
- Skonfiguruj docelowy adres API (demo lub lokalny) -- zobacz [Zmienne środowiskowe](../setup/environment-variables.md)

</div>

## Konfiguracja

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Zainstaluj zależności

```bash
cd B1Admin
npm install
```

### 3. Skonfiguruj zmienne środowiskowe

```bash
cp dotenv.sample.txt .env
```

Otwórz plik `.env` i skonfiguruj punkty końcowe API. Możesz wskazać albo wspólne demonstracyjne API (`https://api.demo.churchapps.org`), albo własną lokalną instancję API. Plik przykładowy może nadal zawierać wycofane adresy URL środowiska testowego; zastąp je.

### 4. Uruchom serwer deweloperski

```bash
npm start
```

To polecenie uruchamia serwer deweloperski Vite. Aplikacja będzie dostępna w przeglądarce z włączoną wymianą modułów na gorąco (HMR).

## Kluczowe zmienne środowiskowe

| Zmienna | Opis |
|----------|-------------|
| `REACT_APP_STAGE` | Nazwa środowiska (np. `demo`, jak w pliku przykładowym, `prod` lub `selfhost`) |
| `PORT` | Port serwera deweloperskiego (domyślnie: `3101`) |
| `REACT_APP_*_API` | Adresy URL punktów końcowych API dla każdego modułu |

:::info
Skrypt `postinstall` kopiuje pliki lokalizacji i CSS z `@churchapps/apphelper`. Jeśli komponenty wyglądają bez stylów, uruchom ręcznie `npm run postinstall`.
:::

## Kluczowe polecenia

| Polecenie | Opis |
|---------|-------------|
| `npm start` | Uruchom serwer deweloperski Vite |
| `npm run build` | Kompilacja produkcyjna za pomocą Vite |
| `npm run test` | Uruchom testy end-to-end w Playwright |
| `npm run lint` | Uruchom ESLint z automatyczną naprawą |

## Stos technologiczny

- **React 19** z TypeScript
- **Vite** do narzędzi budowania i serwera deweloperskiego
- **Material-UI 7** dla komponentów interfejsu
- **React Query 5** do stanu po stronie serwera
- **`@churchapps/apphelper*`** – pakiety ze wspólnymi komponentami

## Wdrażanie

Kompilacje produkcyjne są wdrażane na **S3 + CloudFront**:

1. `npm run build` generuje statyczne zasoby
2. Zasoby są synchronizowane z zasobnikiem S3
3. Uruchamiana jest unieważnienie w CloudFront, aby serwować nową wersję

:::tip
Szczegółowe instrukcje wdrażania znajdziesz w przewodniku [Wdrażanie aplikacji webowych](../deployment/web-apps.md).
:::
