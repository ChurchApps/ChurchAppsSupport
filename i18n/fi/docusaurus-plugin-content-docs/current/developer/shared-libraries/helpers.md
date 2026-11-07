---
title: "Kirjastot"
---

# Kirjastot

<div class="article-intro">

Paketti `@churchapps/helpers` tarjoaa perustyökaluja, joita kaikki ChurchApps-projektit käyttävät sekä frontend- että backend-puolella. Se ei ole sidottu mihinkään kehykseen, ja siinä on yleisiä apuluokkia, kuten `DateHelper`, `ApiHelper` ja `CurrencyHelper`, sekä jaetut TypeScript-rajapinnat, jotka muodostavat sovellusten ja rajapintojen välisen tietosopimuksen.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna **Node.js** ja **Git** -- katso [Esivaatimukset](../setup/prerequisites)
- Tutustu [Packages-työtilaan](./index.md) ja julkaisuprosessiin

</div>

## Kuka tätä käyttää

Jokainen ChurchApps-rajapinta (Api, AskApi ja LessonsApi) sekä jokainen web-frontend (B1Admin, B1App, B1Transfer ja LessonsApp) riippuu suoraan tästä paketista. Frontendit saavat myös monia sen vientejä (`ApiHelper`, `DateHelper`, `UserHelper` ja muut rajapinnat) uudelleen viennin kautta [`@churchapps/apphelper`](./app-helper)-paketista. Muut jaetut paketit ilmoittavat sen vertais-riippuvuutena, jotta jokainen sovellus käyttää täsmälleen yhtä kopiota.

## Paikallinen kehitysympäristö

Tämä paketti sijaitsee [Packages](https://github.com/ChurchApps/Packages)-työtilassa muiden jaettujen kirjastojen rinnalla:

1. Kloonaa työtila:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Asenna riippuvuudet työtilan juurihakemistossa:

   ```bash
   cd Packages && yarn install
   ```

3. Rakenna (kääntää TypeScriptin hakemistoon `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Tai aja `yarn build` juuressa rakentaaksesi kaikki paketit riippuvuusjärjestyksessä.

Jos haluat testata muutoksia käyttävässä projektissa, käytä väliaikaista Yarn-portaalia -- katso [Paikallinen kehitys käyttävää sovellusta vasten](./index.md#local-development-against-a-consuming-app).

## Julkaisu

Julkaisut kulkevat changesets-työkalun kautta, eikä versioita nosteta käsin:

1. Aja `yarn changeset` työtilan juuressa, valitse `@churchapps/helpers` sopivalla version nostotyypillä ja tallenna syntynyt changeset-tiedosto muutoksesi mukana.
2. Kun olet valmis julkaisemaan, aja `yarn publish-all` juuressa -- se nostaa versiot, kirjoittaa CHANGELOG-tiedostot, rakentaa riippuvuusjärjestyksessä ja julkaisee npm-rekisteriin.

Uudet jaetut rajapinnat kuuluvat hakemistoon `helpers/src/interfaces/` ja ne viedään uudelleen paketin pääkooditiedoston kautta. Verkkosivunrakentajan elementtityyppiluettelo (`ElementTypes.ts` -- 35 tyyppiä vastausskeemoineen) sijaitsee myös täällä. Se on sopimus, jonka apphelper-renderöijät, B1Admin-muokkauslomakkeet ja tekoälyn sisällöntuotantokehotteet jakavat (katso [Verkkosivunrakentajan arkkitehtuuri](../architecture/website-builder)).

:::warning
Koska tätä pakettia käyttää jokainen ChurchApps-projekti, tämän kirjaston muutoksilla on laaja vaikutus. `helpers`-paketin julkaisu nostaa automaattisesti myös `apihelper`- ja `apphelper`-paketit, jotta niiden riippuvuusrajat pysyvät ajan tasalla. Testaa Yarn-portaalilla vähintään yhdessä käyttävässä rajapinnassa ja yhdessä käyttävässä web-sovelluksessa ennen julkaisua.
:::

## Aiheeseen liittyvät artikkelit

- **[ApiHelper](./api-helper)** -- Palvelinpuolen apuluokat, jotka riippuvat tästä paketista
- **[AppHelper](./app-helper)** -- React-komponentit, jotka riippuvat tästä paketista
- **[Jaettujen kirjastojen yleiskatsaus](./index.md)** -- Työtilan asennus, julkaisuprosessi ja paikallinen linkitystyönkulku
