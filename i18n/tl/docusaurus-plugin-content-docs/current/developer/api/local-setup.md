---
title: "Lokal na Pag-setup ng API"
---

# Lokal na Pag-setup ng API

<div class="article-intro">

Ginagabayan ka ng patnubay na ito sa pag-setup ng ChurchApps API para sa lokal na development. I-clone mo ang repository, i-configure ang iyong mga koneksyon sa database, simulan ang schema, at simulan ang dev server na may hot reload.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-install ng **Node.js 22+**, **Git**, at **MySQL 8.0+** -- tingnan ang [Mga Pangangailangan](../setup/prerequisites)
- Lumikha ng MySQL user na may mga pribilehiyo sa paglikha ng database
- Suriin ang sanggunian ng [Mga Variable ng Kapaligiran](../setup/environment-variables) para sa configuration ng API

</div>

## Sunud-sunod na Pag-setup

### 1. I-clone ang repository

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Mag-install ng mga dependency

```bash
cd Api
npm install
```

### 3. I-configure ang mga variable ng kapaligiran

```bash
cp .env.sample .env
```

Buksan ang `.env` at i-configure ang iyong mga MySQL connection string. Ang bawat module ay nangangailangan ng sariling koneksyon sa database sa sumusunod na format:

```
mysql://root:password@localhost:3306/dbname
```

Kakailanganin mo ng mga connection string para sa lahat ng anim na database ng module (membership, attendance, content, giving, messaging, doing).

### 4. Simulan ang mga database

```bash
npm run initdb
```

Lumilikha ito ng lahat ng anim na database at ang kanilang mga talahanayan nang awtomatiko.

:::tip
Maaari mong simulan ang database ng isang module gamit ang `npm run initdb:membership` (o `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Simulan ang dev server

```bash
npm run dev
```

Ang API ay nagsisimula na may hot reload sa [http://localhost:8084](http://localhost:8084).

## Mga Pangunahing Utos

| Utos | Paglalarawan |
|---------|-------------|
| `npm run dev` | Simulan ang dev server na may hot reload (tsx watch) |
| `npm run build` | Linisin, i-compile ang TypeScript, at kopyahin ang mga asset |
| `npm run test` | Patakbuhin ang mga test gamit ang Jest (kasama ang coverage) |
| `npm run test:watch` | Patakbuhin ang mga test sa watch mode |
| `npm run lint` | Patakbuhin ang Prettier at ESLint na may auto-fix |

## Pag-deploy sa Staging

Para mag-deploy sa staging na kapaligiran:

```bash
npm run deploy-staging
```

Nagpapatakbo ito ng production build at pagkatapos ay nagde-deploy sa pamamagitan ng Serverless Framework.

:::warning
Siguraduhing naka-configure ang iyong mga AWS credential bago patakbuhin ang deploy command.
:::

## Lokal na Development ng Library

Kung kailangan mong mag-develop ng shared library (`@churchapps/helpers` o `@churchapps/apihelper`) kasabay ng API, gamitin ang `npm link`:

```bash
# Sa direktoryo ng library
cd Helpers
npm run build
npm link

# Sa direktoryo ng API
cd ../Api
npm link @churchapps/helpers
```

Pinapayagan ka nitong subukan ang mga pagbabago sa library laban sa API nang hindi nagpa-publish sa npm.

## Mga Kaugnay na Artikulo

- **[Database](./database)** -- Pag-unawa sa arkitekturang database-per-module
- **[Istraktura ng Module](./module-structure)** -- Kung paano inorganisa ang mga controller, repository, at modelo
- **[Mga Shared Library](../shared-libraries/)** -- Pagtatrabaho sa `@churchapps/helpers` at `@churchapps/apihelper`
