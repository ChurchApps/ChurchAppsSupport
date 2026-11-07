---
title: "Paikallisen API:n asennus"
description: "Ota ChurchApps-API käyttöön paikallisesti: kloonaa repo, määritä kuusi MySQL-moduulitietokantaa, alusta skeema ja käynnistä kehityspalvelin uudelleenlatauksella."
---

# Paikallisen API:n asennus

<div class="article-intro">

Tämä opas opastaa sinua ChurchApps API:n asentamisessa paikalliseen kehitysympäristöön. Kloonaat repositorion, määrität tietokantayhteydet, alustat skeeman ja käynnistät kehityspalvelimen hot reload -toiminnolla.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna **Node.js 24+**, **Git** ja **MySQL 8.0+** -- katso [Esivaatimukset](../setup/prerequisites.md)
- Luo MySQL-käyttäjä, jolla on oikeudet tietokantojen luomiseen
- Tutustu [Ympäristömuuttujat](../setup/environment-variables.md) -viitteeseen API:n asetusten osalta

</div>

## Vaiheittainen asennus

### 1. Kloonaa repositorio

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Asenna riippuvuudet

Projekti käyttää Yarnia (suojaus estää `npm install` -komennon):

```bash
cd Api
yarn install
```

### 3. Määritä ympäristömuuttujat

```bash
cp .env.sample .env
```

Avaa `.env` ja määritä MySQL-yhteysmerkkijonot. Jokainen moduuli tarvitsee oman tietokantayhteytensä seuraavassa muodossa:

```
mysql://root:password@localhost:3306/dbname
```

Tarvitset yhteysmerkkijonot kaikille kuudelle moduulin tietokannalle (membership, attendance, content, giving, messaging, doing).

### 4. Alusta tietokannat

```bash
npm run initdb
```

Tämä luo automaattisesti kaikki kuusi tietokantaa ja niiden taulut.

:::tip
Voit alustaa yksittäisen moduulin tietokannan komennolla `npm run initdb -- --module=membership` (tai `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Käynnistä kehityspalvelin

```bash
npm run dev
```

API käynnistyy hot reload -toiminnolla osoitteessa [http://localhost:8084](http://localhost:8084).

## Tärkeimmät komennot

| Komento | Kuvaus |
|---------|-------------|
| `npm run dev` | Käynnistää kehityspalvelimen hot reloadilla (tsx watch) |
| `npm run build` | Tyhjentää, kääntää TypeScriptin ja kopioi resurssit |
| `npm run test` | Suorittaa testit Jestillä (sisältää kattavuusraportin) |
| `npm run test:watch` | Suorittaa testit watch-tilassa |
| `npm run lint` | Suorittaa ESLintin automaattisella korjauksella (ESLint on ainoa muotoilija) |

## Julkaisu

Staging-ympäristö on poistettu käytöstä. API julkaistaan demo-ympäristöön jokaisella `main`-haaraan tehdyllä pushilla ja tuotantoon manuaalisella **Deploy Prod** -työnkululla, joka myös soveltaa odottavat tietokantamigraatiot. Lisätietoja on sivulla [API-julkaisu](../deployment/apis.md).

## Paikallinen kirjastokehitys

Jos haluat kehittää jaettua kirjastoa (`@churchapps/helpers` tai `@churchapps/apihelper`) API:n rinnalla, rakenna se [Packages](https://github.com/ChurchApps/Packages) -työtilassa ja lisää API:hen väliaikainen Yarn-portaali:

```bash
# Packages-työtilassa
yarn build

# API-hakemistossa
yarn link ../Packages/helpers
# ... testaa ...
yarn unlink ../Packages/helpers && yarn install
```

Näin voit testata kirjastomuutoksia API:a vastaan julkaisematta niitä npm:ään. Lisätietoja on sivulla [Jaetut kirjastot](../shared-libraries/index.md#local-development-against-a-consuming-app) -- ja älä koskaan tee commit portaalin ratkaisua, jonka link kirjoittaa `package.json`-tiedostoon.

## Aiheeseen liittyvät artikkelit

- **[Tietokanta](./database.md)** -- Moduulikohtaisen tietokantarakenteen ymmärtäminen
- **[Moduulin rakenne](./module-structure.md)** -- Kontrollerien, repositorioiden ja mallien järjestely
- **[Jaetut kirjastot](../shared-libraries/index.md)** -- Työskentely `@churchapps/helpers`- ja `@churchapps/apihelper`-kirjastojen kanssa
