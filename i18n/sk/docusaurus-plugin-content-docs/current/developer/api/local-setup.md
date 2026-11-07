---
title: "Nastavenie lokálneho API"
description: "Nastavte API ChurchApps lokálne: naklonujte repozitár, nakonfigurujte šesť databáz MySQL pre moduly, inicializujte schému a spustite vývojový server s hot-reloadom."
---

# Nastavenie lokálneho API

<div class="article-intro">

Tento návod vás prevedie nastavením API ChurchApps pre lokálny vývoj. Naklonujete repozitár, nakonfigurujete pripojenia k databázam, inicializujete schému a spustíte vývojový server s automatickým obnovením (hot reload).

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte **Node.js 24+**, **Git** a **MySQL 8.0+** -- pozri [Predpoklady](../setup/prerequisites.md)
- Vytvorte používateľa MySQL s oprávnením na vytváranie databáz
- Prezrite si referenciu [Premenné prostredia](../setup/environment-variables.md) pre konfiguráciu API

</div>

## Postup krok za krokom

### 1. Naklonujte repozitár

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Nainštalujte závislosti

Projekt používa Yarn (ochrana zablokuje `npm install`):

```bash
cd Api
yarn install
```

### 3. Nakonfigurujte premenné prostredia

```bash
cp .env.sample .env
```

Otvorte `.env` a nakonfigurujte reťazce pripojenia k MySQL. Každý modul potrebuje vlastné pripojenie k databáze v tomto formáte:

```
mysql://root:password@localhost:3306/dbname
```

Budete potrebovať reťazce pripojenia pre všetkých šesť databáz modulov (membership, attendance, content, giving, messaging, doing).

### 4. Inicializujte databázy

```bash
npm run initdb
```

Tento príkaz automaticky vytvorí všetkých šesť databáz a ich tabuľky.

:::tip
Databázu jedného modulu môžete inicializovať príkazom `npm run initdb -- --module=membership` (alebo `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Spustite vývojový server

```bash
npm run dev
```

API sa spustí s automatickým obnovením na adrese [http://localhost:8084](http://localhost:8084).

## Kľúčové príkazy

| Príkaz | Popis |
|---------|-------------|
| `npm run dev` | Spustí vývojový server s automatickým obnovením (tsx watch) |
| `npm run build` | Vyčistí, skompiluje TypeScript a skopíruje assety |
| `npm run test` | Spustí testy s Jest (vrátane pokrytia kódu) |
| `npm run test:watch` | Spustí testy v režime sledovania |
| `npm run lint` | Spustí ESLint s automatickou opravou (ESLint je jediný formátovač) |

## Nasadenie

Staging prostredie bolo vyradené. API sa nasadzuje do demo prostredia pri každom pushi do `main` a do produkcie cez ručný workflow **Deploy Prod**, ktorý zároveň aplikuje čakajúce migrácie databázy. Podrobnosti nájdete v článku [Nasadenie API](../deployment/apis.md).

## Lokálny vývoj knižníc

Ak potrebujete vyvíjať zdieľanú knižnicu (`@churchapps/helpers` alebo `@churchapps/apihelper`) spolu s API, zostavte ju vo workspace [Packages](https://github.com/ChurchApps/Packages) a v API pridajte dočasný Yarn portal:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Týmto môžete testovať zmeny knižnice voči API bez publikovania na npm. Podrobnosti nájdete v článku [Zdieľané knižnice](../shared-libraries/index.md#local-development-against-a-consuming-app) -- a nikdy nekomitujte portal resolution, ktorý príkaz `link` zapíše do `package.json`.

## Súvisiace články

- **[Databáza](./database.md)** -- Pochopenie architektúry s databázou pre každý modul
- **[Štruktúra modulu](./module-structure.md)** -- Ako sú usporiadané kontroléry, repozitáre a modely
- **[Zdieľané knižnice](../shared-libraries/index.md)** -- Práca s `@churchapps/helpers` a `@churchapps/apihelper`
