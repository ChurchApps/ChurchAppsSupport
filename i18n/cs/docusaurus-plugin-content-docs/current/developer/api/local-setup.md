---
title: "Nastavení lokálního API"
description: "Lokální nastavení API ChurchApps: klonování repozitáře, šest databází MySQL pro moduly, inicializace schématu a vývojový server s automatickým obnovením."
---

# Nastavení lokálního API

<div class="article-intro">

Tento průvodce vás provede nastavením API ChurchApps pro lokální vývoj. Naklonujete repozitář, nakonfigurujete připojení k databázi, inicializujete schéma a spustíte vývojový server s automatickým obnovením při změnách.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte **Node.js 24+**, **Git** a **MySQL 8.0+** -- viz [Požadavky](../setup/prerequisites.md)
- Vytvořte uživatele MySQL s oprávněním vytvářet databáze
- Prostudujte si referenci [Proměnné prostředí](../setup/environment-variables.md) pro konfiguraci API

</div>

## Postup nastavení krok za krokem

### 1. Naklonujte repozitář

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Nainstalujte závislosti

Projekt používá Yarn (ochrana blokuje `npm install`):

```bash
cd Api
yarn install
```

### 3. Nastavte proměnné prostředí

```bash
cp .env.sample .env
```

Otevřete soubor `.env` a nakonfigurujte připojovací řetězce MySQL. Každý modul potřebuje vlastní připojení k databázi v následujícím formátu:

```
mysql://root:password@localhost:3306/dbname
```

Budete potřebovat připojovací řetězce pro všech šest databází modulů (membership, attendance, content, giving, messaging, doing).

### 4. Inicializujte databáze

```bash
npm run initdb
```

Tento příkaz automaticky vytvoří všech šest databází a jejich tabulky.

:::tip
Databázi jednoho modulu můžete inicializovat příkazem `npm run initdb -- --module=membership` (nebo `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Spusťte vývojový server

```bash
npm run dev
```

API se spustí s automatickým obnovením na adrese [http://localhost:8084](http://localhost:8084).

## Přehled příkazů

| Příkaz | Popis |
|---------|-------------|
| `npm run dev` | Spustí vývojový server s automatickým obnovením (tsx watch) |
| `npm run build` | Vyčistí projekt, zkompiluje TypeScript a zkopíruje prostředky |
| `npm run test` | Spustí testy pomocí Jest (včetně pokrytí kódu) |
| `npm run test:watch` | Spustí testy v režimu sledování změn |
| `npm run lint` | Spustí ESLint s automatickou opravou (ESLint je jediný formátovací nástroj) |

## Nasazení

Prostředí staging bylo vyřazeno z provozu. API se nasazuje do demo prostředí při každém nahrání změn do větve `main` a do produkce ručním spuštěním pracovního postupu **Deploy Prod**, který zároveň aplikuje čekající migrace databáze. Podrobnosti najdete v článku [Nasazení API](../deployment/apis.md).

## Vývoj lokálních knihoven

Pokud potřebujete vyvíjet sdílenou knihovnu (`@churchapps/helpers` nebo `@churchapps/apihelper`) společně s API, sestavte ji v pracovním prostoru [Packages](https://github.com/ChurchApps/Packages) a v API přidejte dočasný Yarn portal:

```bash
# V pracovním prostoru Packages
yarn build

# V adresáři API
yarn link ../Packages/helpers
# ... testování ...
yarn unlink ../Packages/helpers && yarn install
```

Tímto způsobem můžete otestovat změny knihovny v API bez publikování na npm. Podrobnosti najdete v článku [Sdílené knihovny](../shared-libraries/index.md#local-development-against-a-consuming-app) -- a nikdy nepotvrzujte (necommitujte) do `package.json` přesměrování, které příkaz link zapíše.

## Související články

- **[Databáze](./database.md)** -- Pochopení architektury s databází pro každý modul
- **[Struktura modulů](./module-structure.md)** -- Jak jsou uspořádány kontrolery, repozitáře a modely
- **[Sdílené knihovny](../shared-libraries/index.md)** -- Práce s `@churchapps/helpers` a `@churchapps/apihelper`
