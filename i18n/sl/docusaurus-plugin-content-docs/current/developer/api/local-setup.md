---
title: "Lokalna nastavitev API-ja"
---

# Lokalna nastavitev API-ja

<div class="article-intro">

Ta vodnik vas popelje skozi nastavitev ChurchApps API-ja za lokalni razvoj. Klonirali boste repozitorij, nastavili povezave z bazo podatkov, inicializirali shemo in zagnali razvojni strežnik s samodejnim ponovnim nalaganjem.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite **Node.js 24+**, **Git** in **MySQL 8.0+** -- glejte [Predpogoji](../setup/prerequisites)
- Ustvarite uporabnika MySQL s pravicami za ustvarjanje baz podatkov
- Preglejte referenco [Okoljske spremenljivke](../setup/environment-variables) za nastavitve API-ja

</div>

## Postopna nastavitev

### 1. Klonirajte repozitorij

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Namestite odvisnosti

Projekt uporablja Yarn (zaščita onemogoča `npm install`):

```bash
cd Api
yarn install
```

### 3. Nastavite okoljske spremenljivke

```bash
cp .env.sample .env
```

Odprite `.env` in nastavite povezovalne nize za MySQL. Vsak modul potrebuje lastno povezavo z bazo podatkov v naslednji obliki:

```
mysql://root:password@localhost:3306/dbname
```

Potrebovali boste povezovalne nize za vseh šest modulnih baz (membership, attendance, content, giving, messaging, doing).

### 4. Inicializirajte baze podatkov

```bash
npm run initdb
```

Ta ukaz samodejno ustvari vseh šest baz podatkov in njihovih tabel.

:::tip
Bazo podatkov posameznega modula lahko inicializirate z `npm run initdb -- --module=membership` (ali `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Zaženite razvojni strežnik

```bash
npm run dev
```

API se zažene s samodejnim ponovnim nalaganjem na [http://localhost:8084](http://localhost:8084).

## Ključni ukazi

| Ukaz | Opis |
|---------|-------------|
| `npm run dev` | Zaženi razvojni strežnik s samodejnim ponovnim nalaganjem (tsx watch) |
| `npm run build` | Počisti, prevedi TypeScript in kopiraj datoteke sredstev |
| `npm run test` | Zaženi teste s Jest (vključno s pokritostjo) |
| `npm run test:watch` | Zaženi teste v načinu opazovanja |
| `npm run lint` | Zaženi ESLint s samodejnim popravljanjem (ESLint je edini oblikovalnik kode) |

## Uvajanje

Okolje za staging je bilo ukinjeno. API se ob vsakem pushu v `main` uvede v demo okolje, v produkcijo pa prek ročnega delovnega toka **Deploy Prod**, ki prav tako uporabi čakajoče migracije baze podatkov. Podrobnosti najdete v [Uvajanje API-ja](../deployment/apis).

## Lokalni razvoj knjižnic

Če želite skupaj z API-jem razvijati skupno knjižnico (`@churchapps/helpers` ali `@churchapps/apihelper`), jo zgradite v delovnem prostoru [Packages](https://github.com/ChurchApps/Packages) in v API-ju dodajte začasni Yarn portal:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Tako lahko preizkusite spremembe knjižnice z API-jem, ne da bi jih objavili na npm. Glejte [Skupne knjižnice](../shared-libraries/#local-development-against-a-consuming-app) za podrobnosti -- in nikoli ne zapišite portala, ki ga povezava vpiše v `package.json`.

## Sorodni članki

- **[Baza podatkov](./database)** -- Razumevanje arhitekture z ločeno bazo za vsak modul
- **[Struktura modulov](./module-structure)** -- Kako so organizirani kontrolerji, repozitoriji in modeli
- **[Skupne knjižnice](../shared-libraries/)** -- Delo z `@churchapps/helpers` in `@churchapps/apihelper`
