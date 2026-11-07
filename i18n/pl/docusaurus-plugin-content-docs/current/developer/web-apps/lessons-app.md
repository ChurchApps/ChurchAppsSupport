---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp to aplikacja do zarządzania treścią lekcji dla [Lessons.church](https://lessons.church). Zapewnia interfejs do tworzenia, organizowania i publikowania programów nauczania lekcji w kościele. Aplikacja została zbudowana w oparciu o Next.js i React.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj **Node.js 22+** oraz **Git** -- zobacz [Wymagania wstępne](../setup/prerequisites)
- Skonfiguruj docelowe API (lokalne LessonsApi) -- zobacz [Zmienne środowiskowe](../setup/environment-variables)

</div>

:::warning
LessonsApp wymaga Node.js w wersji 22 lub nowszej. Wcześniejsze wersje nie są obsługiwane.
:::

## Konfiguracja

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Zainstaluj zależności

```bash
cd LessonsApp
npm install
```

### 3. Skonfiguruj zmienne środowiskowe

Skopiuj plik przykładowy środowiska do `.env` i skonfiguruj adresy punktów końcowych API:

```bash
cp dotenv.sample.txt .env
```

Zaktualizuj adresy URL punktów końcowych API, aby wskazywały na Twoją lokalną instancję LessonsApi (`http://localhost:8090`). Środowisko testowe Lessons API zostało wycofane, dlatego zamień wszystkie adresy `api.staging.lessons.church` pozostałe w pliku przykładowym.

### 4. Uruchom serwer deweloperski

```bash
npm run dev
```

Serwer deweloperski Next.js uruchamia się pod adresem [http://localhost:3501](http://localhost:3501).

## Najważniejsze polecenia

| Polecenie | Opis |
|---------|-------------|
| `npm run dev` | Uruchamia serwer deweloperski Next.js na porcie 3501 |
| `npm run build` | Kompilacja produkcyjna za pomocą Next.js |

## Stos technologiczny

- **Next.js 16** z TypeScript
- **React 19** do komponentów interfejsu
- Pakiety **`@churchapps/apphelper*`** ze współdzielonymi komponentami

:::info
LessonsApp komunikuje się z backendem **LessonsApi**, który jest oddzielnym API od głównego API ChurchApps. Upewnij się, że środowisko jest skonfigurowane z prawidłowym punktem końcowym Lessons API.
:::

## Wdrażanie

Kompilacje produkcyjne są wdrażane w **S3 + CloudFront**:

1. `npm run build` generuje zoptymalizowaną kompilację Next.js
2. Wynik kompilacji jest synchronizowany z zasobnikiem S3
3. Uruchamiane jest unieważnienie w CloudFront, aby udostępnić nową wersję

:::tip
Szczegółowe instrukcje wdrażania znajdziesz w przewodniku [Wdrażanie aplikacji webowych](../deployment/web-apps).
:::
