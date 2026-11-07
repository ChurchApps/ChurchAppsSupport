---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App to publiczna aplikacja dla członków kościoła, zbudowana w oparciu o Next.js. Zapewnia doświadczenie członkowskie, w tym profile, katalogi grup, transmisje na żywo i strony darowizn.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj **Node.js 22+** oraz **Git** -- zobacz [Wymagania wstępne](../setup/prerequisites)
- Skonfiguruj docelowy adres API (demo lub lokalny) -- zobacz [Zmienne środowiskowe](../setup/environment-variables)

</div>

:::warning
B1App wymaga Node.js w wersji 22 lub nowszej. Wcześniejsze wersje nie są obsługiwane.
:::

## Konfiguracja

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Zainstaluj zależności

```bash
cd B1App
npm install
```

### 3. Skonfiguruj zmienne środowiskowe

```bash
cp dotenv.sample.txt .env
```

Otwórz plik `.env` i skonfiguruj adresy URL punktów końcowych `NEXT_PUBLIC_*_API`. Mogą one wskazywać na wspólne demonstracyjne API (`https://api.demo.churchapps.org`) lub na Twoją lokalną instancję API. Plik przykładowy może nadal zawierać wycofane adresy URL środowiska testowego; zastąp je.

### 4. Uruchom serwer deweloperski

```bash
npm run dev
```

Serwer deweloperski Next.js uruchamia się pod adresem [http://localhost:3301](http://localhost:3301).

## Najważniejsze polecenia

| Polecenie | Opis |
|-----------|------|
| `npm run dev` | Uruchamia serwer deweloperski Next.js na porcie 3301 |
| `npm run build` | Kompilacja produkcyjna za pomocą Next.js |
| `npm run test` | Uruchamia testy end-to-end w Playwright |
| `npm run lint` | Uruchamia lintera Next.js |

## Najważniejsze zmienne środowiskowe

| Zmienna | Opis |
|---------|------|
| `NEXT_PUBLIC_*_API` | Adresy URL punktów końcowych API dla każdego modułu |

:::info
Skrypt `postinstall` kopiuje pliki locale i CSS z `@churchapps/apphelper`. Jeśli po instalacji komponenty wyglądają bez stylów, uruchom ręcznie `npm run postinstall`.
:::

## Stos technologiczny

- **Next.js 16** z TypeScript
- **React 19** do komponentów interfejsu
- **Material-UI 7** jako system projektowania
- **React Query 5** do zarządzania stanem serwera
- Pakiety **`@churchapps/apphelper*`** z komponentami współdzielonymi

## Wdrażanie

Kompilacje produkcyjne są wdrażane w **S3 + CloudFront**:

1. `npm run build` generuje zoptymalizowaną kompilację Next.js
2. Wynik kompilacji jest synchronizowany z zasobnikiem S3
3. Uruchamiane jest unieważnienie w CloudFront, aby udostępnić nową wersję

:::tip
Szczegółowe instrukcje wdrażania znajdziesz w przewodniku [Wdrażanie aplikacji internetowych](../deployment/web-apps).
:::
