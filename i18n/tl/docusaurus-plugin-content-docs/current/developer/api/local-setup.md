---
title: "Local API Setup"
---

# Lokal na Setup ng API

<div class="article-intro">

Ginagabayan ka ng gabay na ito sa pag-set up ng ChurchApps API para sa lokal na development. Ika-clone mo ang repository, i-configure ang mga koneksyon sa database, i-initialize ang schema, at simulan ang dev server na may hot reload.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **Node.js 22+**, **Git**, at **MySQL 8.0+** -- tingnan ang [Prerequisites](../setup/prerequisites)
- Gumawa ng MySQL user na may pribilehiyo sa paggawa ng database
- Basahin ang [Environment Variables](../setup/environment-variables) reference para sa configuration ng API

</div>

## Hakbang-Hakbang na Setup

### 1. I-clone ang repository

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. I-install ang mga dependency

Gumagamit ang proyekto ng Yarn (hinaharangan ng guard ang `npm install`):

```bash
cd Api
yarn install
```

### 3. I-configure ang mga environment variable

```bash
cp .env.sample .env
```

Buksan ang `.env` at i-configure ang iyong mga MySQL connection string. Kailangan ng bawat module ng sarili nitong koneksyon sa database sa sumusunod na format:

```
mysql://root:password@localhost:3306/dbname
```

Kakailanganin mo ang mga connection string para sa lahat ng anim na database ng module (membership, attendance, content, giving, messaging, doing).

### 4. I-initialize ang mga database

```bash
npm run initdb
```

Awtomatikong ginagawa nito ang lahat ng anim na database at ang kanilang mga table.

:::tip
Maaari mong i-initialize ang database ng iisang module gamit ang `npm run initdb -- --module=membership` (o `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Simulan ang dev server

```bash
npm run dev
```

Magsisimula ang API na may hot reload sa [http://localhost:8084](http://localhost:8084).

## Mga Pangunahing Command

| Command | Paglalarawan |
|---------|-------------|
| `npm run dev` | Simulan ang dev server na may hot reload (tsx watch) |
| `npm run build` | Linisin, i-compile ang TypeScript, at kopyahin ang mga asset |
| `npm run test` | Patakbuhin ang mga test gamit ang Jest (kasama ang coverage) |
| `npm run test:watch` | Patakbuhin ang mga test sa watch mode |
| `npm run lint` | Patakbuhin ang ESLint na may auto-fix (ESLint ang tanging formatter) |

## Deployment

Wala na ang staging environment. Dine-deploy ang Api sa demo environment sa bawat push sa `main` at sa production sa pamamagitan ng manual na workflow na **Deploy Prod**, na naglalapat din ng mga nakabinbing migration sa database. Tingnan ang [API Deployment](../deployment/apis) para sa mga detalye.

## Lokal na Development ng Library

Kung kailangan mong i-develop ang isang shared library (`@churchapps/helpers` o `@churchapps/apihelper`) kasama ng API, i-build ito sa [Packages](https://github.com/ChurchApps/Packages) workspace at magdagdag ng pansamantalang Yarn portal sa API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Pinapayagan ka nitong subukan ang mga pagbabago sa library laban sa API nang hindi nagpa-publish sa npm. Tingnan ang [Shared Libraries](../shared-libraries/#local-development-against-a-consuming-app) para sa mga detalye — at huwag kailanman i-commit ang portal resolution na isinusulat ng link sa `package.json`.

## Mga Kaugnay na Artikulo

- **[Database](./database)** -- Pag-unawa sa arkitektura ng database-per-module
- **[Module Structure](./module-structure)** -- Kung paano inaayos ang mga controller, repository, at model
- **[Shared Libraries](../shared-libraries/)** -- Pagtatrabaho sa `@churchapps/helpers` at `@churchapps/apihelper`
