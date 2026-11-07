---
title: "Lokalios API sąranka"
---

# Lokalios API sąranka

<div class="article-intro">

Šiame vadove rasite, kaip nustatyti ChurchApps API vietiniam kūrimui. Klonuosite saugyklą, sukonfigūruosite duomenų bazių ryšius, inicializuosite schemą ir paleisite kūrimo serverį su karštuoju perkrovimu.

</div>

<div class="prereqs">
<h4>Prieš pradėdami</h4>

- Įdiekite **Node.js 24+**, **Git** ir **MySQL 8.0+** -- žr. [Reikalavimai](../setup/prerequisites)
- Sukurkite MySQL naudotoją su duomenų bazių kūrimo teisėmis
- Peržiūrėkite [Aplinkos kintamųjų](../setup/environment-variables) nuorodą, kurioje aprašyta API konfigūracija

</div>

## Sąrankos žingsniai

### 1. Klonuokite saugyklą

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Įdiekite priklausomybes

Projekte naudojamas Yarn (apsauga blokuoja `npm install`):

```bash
cd Api
yarn install
```

### 3. Sukonfigūruokite aplinkos kintamuosius

```bash
cp .env.sample .env
```

Atidarykite `.env` ir sukonfigūruokite MySQL ryšio eilutes. Kiekvienam moduliui reikia atskiro duomenų bazės ryšio pagal šį formatą:

```
mysql://root:password@localhost:3306/dbname
```

Jums reikės ryšio eilučių visoms šešioms modulių duomenų bazėms (membership, attendance, content, giving, messaging, doing).

### 4. Inicializuokite duomenų bazes

```bash
npm run initdb
```

Ši komanda automatiškai sukuria visas šešias duomenų bazes ir jų lenteles.

:::tip
Galite inicializuoti vieno modulio duomenų bazę su `npm run initdb -- --module=membership` (arba `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Paleiskite kūrimo serverį

```bash
npm run dev
```

API paleidžiamas su karštuoju perkrovimu adresu [http://localhost:8084](http://localhost:8084).

## Pagrindinės komandos

| Komanda | Aprašymas |
|---------|-----------|
| `npm run dev` | Paleisti kūrimo serverį su karštuoju perkrovimu (tsx watch) |
| `npm run build` | Išvalyti, sukompiliuoti TypeScript ir nukopijuoti resursus |
| `npm run test` | Paleisti testus su Jest (įskaitant aprėptį) |
| `npm run test:watch` | Paleisti testus stebėjimo režimu |
| `npm run lint` | Paleisti ESLint su automatiniu taisymu (ESLint yra vienintelis formatavimo įrankis) |

## Diegimas

Pastraipos aplinka nebenaudojama. API diegiamas į demonstracinę aplinką po kiekvieno įkėlimo į `main` šaką, o į produkcinę aplinką -- rankiniu **Deploy Prod** darbo eigos paleidimu, kuris taip pat taiko laukiančias duomenų bazės migracijas. Išsamesnės informacijos rasite [API diegimas](../deployment/apis).

## Vietinis bibliotekų kūrimas

Jei reikia kurti bendrą biblioteką (`@churchapps/helpers` arba `@churchapps/apihelper`) kartu su API, sukurkite ją [Packages](https://github.com/ChurchApps/Packages) darbo erdvėje ir pridėkite laikiną Yarn portalą API projekte:

```bash
# Packages darbo erdvėje
yarn build

# API kataloge
yarn link ../Packages/helpers
# ... testavimas ...
yarn unlink ../Packages/helpers && yarn install
```

Taip galite išbandyti bibliotekos pakeitimus su API, nepublikuodami jų npm. Išsamiau žr. [Bendrosios bibliotekos](../shared-libraries/#local-development-against-a-consuming-app) -- ir niekada necommitinkite portalo nuorodos, kurią `link` įrašo į `package.json`.

## Susiję straipsniai

- **[Duomenų bazė](./database)** -- Supraskite kiekvienam moduliui skirtos duomenų bazės architektūrą
- **[Modulio struktūra](./module-structure)** -- Kaip organizuoti valdikliai, saugyklos ir modeliai
- **[Bendrosios bibliotekos](../shared-libraries/)** -- Darbas su `@churchapps/helpers` ir `@churchapps/apihelper`
