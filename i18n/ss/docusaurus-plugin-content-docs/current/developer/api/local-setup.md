---
title: "Kuhlela I-API Endzaweni Yakho"
---

# Kuhlela I-API Endzaweni Yakho

<div class="article-intro">

Lomhlahlandlela uyakuhambisa ekuhleleni i-ChurchApps API kutfutfuka endzaweni yakho. Utawuklona i-repository, uhlele kuxhumana kwakho kwe-database, ucalise i-schema, futsi ucalise i-dev server ine-hot reload.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Faka **Node.js 22+**, **Git**, kanye ne-**MySQL 8.0+** -- buka [Prerequisites](../setup/prerequisites)
- Akha umsebentisi we-MySQL lonelungelo lekwakha ema-database
- Buyeketa i-[Environment Variables](../setup/environment-variables) yekuhlela i-API

</div>

## Kuhlela Sinyatselo Ngesinyatselo

### 1. Klona i-repository

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Faka tidzingo

Iprojekthi isebentisa i-Yarn (kunemvikeli levimbela `npm install`):

```bash
cd Api
yarn install
```

### 3. Hlela ema-environment variable

```bash
cp .env.sample .env
```

Vula i-`.env` bese uhlela emastringi akho ekuxhumana ne-MySQL. Module ngayinye idzinga kuxhumana kwayo kwe-database ngalomumo lolandzelako:

```
mysql://root:password@localhost:3306/dbname
```

Utawudzinga emastringi ekuxhumana kuwo wonkhe ema-database lasi-6 emamodule (membership, attendance, content, giving, messaging, doing).

### 4. Calisa ema-database

```bash
npm run initdb
```

Loku kwakha onkhe ema-database lasi-6 nemathebula awo ngekutentekela.

:::tip
Ungacalisa database ye-module linye nge-`npm run initdb -- --module=membership` (nobe `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Calisa dev server

```bash
npm run dev
```

I-API icala nge-hot reload ku-[http://localhost:8084](http://localhost:8084).

## Imiyalo Lesemcoka

| Umyalo | Incazelo |
|---------|-------------|
| `npm run dev` | Calisa dev server ine-hot reload (tsx watch) |
| `npm run build` | Hlambulula, hlanganisa i-TypeScript, futsi ukopishe letifaka |
| `npm run test` | Hambisa ema-test nge-Jest (kufaka ne-coverage) |
| `npm run test:watch` | Hambisa ema-test ku-watch mode |
| `npm run lint` | Hambisa i-ESLint ne-auto-fix (i-ESLint yiyona lodwa yekulungisa umumo) |

## Kudeploya Ku-Staging

Kudeploya ku-simo se-staging:

```bash
npm run deploy-staging
```

Loku kuhambisa i-build ye-production bese kudeployiwe nge-Serverless Framework.

:::warning
Cinisekisa kutsi ema-credential akho e-AWS ahleliwe ngaphambi kwekuhambisa umyalo wekudeploya.
:::

## Kutfutfukiswa Kwephakheji Endzaweni Yakho

Nangabe udzinga kutfutfukisa liphakheji lelihlanganyelwako (`@churchapps/helpers` nobe `@churchapps/apihelper`) kanye ne-API, yakhe ku-workspace ye-[Packages](https://github.com/ChurchApps/Packages) bese wengeta i-Yarn portal yesikhashana ku-API:

```bash
# Ku-workspace ye-Packages
yarn build

# Ku-directory ye-API
yarn link ../Packages/helpers
# ... hlola ...
yarn unlink ../Packages/helpers && yarn install
```

Loku kukuvumela kuhlola kushintjwa kwe-library kumelene ne-API ngaphandle kwekushicelela ku-npm. Buka [Shared Libraries](../shared-libraries/#local-development-against-a-consuming-app) kuemininingwane -- futsi ungakaze wenze commit ye-portal resolution leyibhala i-link ku-`package.json`.

## Emahlandla Lahlobene

- **[Database](./database)** -- Kucondzisisa umumo we-database-nga-module ngayinye
- **[Module Structure](./module-structure)** -- Kuhlelwa kwema-controller, ema-repository, kanye nema-model
- **[Shared Libraries](../shared-libraries/)** -- Kusebenta ne-`@churchapps/helpers` kanye ne-`@churchapps/apihelper`
