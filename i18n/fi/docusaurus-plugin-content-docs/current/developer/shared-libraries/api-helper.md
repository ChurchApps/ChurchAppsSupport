---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Paketti `@churchapps/apihelper` tarjoaa palvelinpuolen apuvälineitä kaikille ChurchApps Express.js -API:ille. Se sisältää perustason controller-luokan, JWT-todennuksen, tietokantatyökalut ja AWS-integraatiot, joihin jokainen API-projekti tukeutuu.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna **Node.js** ja **Git** -- katso [Esivaatimukset](../setup/prerequisites)
- Tutustu [Packages-työtilaan](./index.md) ja julkaisuprosessiin
- Tämä paketti riippuu [`@churchapps/helpers`](./helpers)-paketista (vertaisriippuvuutena) ja välittää sen eteenpäin

</div>

## Mitä pakettiin kuuluu

- **CustomBaseController** -- API-controllerien perusluokka, joka perustuu `inversify-express-utils`-kirjastoon
- **Auth** -- JWT-todennus `CustomAuthProvider`-, `AuthenticatedUser`- ja `Principal`-luokkien kautta
- **Tietokantatyökalut** -- `DB.query` / `DB.queryOne` ja `Pool`-luokka MySQL-yhteyksien hallintaan, sekä `MySqlHelper` ja `DBCreator` skeeman määrittämiseen
- **AWS-integraatiot** -- `AwsHelper` S3-tiedostotallennukseen ja SSM Parameter Store -lukuihin
- **Sähköposti** -- `EmailHelper`, joka tukee SES- ja SMTP-välityksiä
- **Asetusten lataus** -- `EnvironmentBase` lukee tietokantayhteydet ja salaisuudet ympäristömuuttujista tai Parameter Storesta
- **Muut** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Paikallisen kehityksen asennus

Tämä paketti sijaitsee [Packages](https://github.com/ChurchApps/Packages)-työtilassa muiden jaettujen kirjastojen rinnalla:

1. Kloonaa työtila:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Asenna riippuvuudet työtilan juuressa:

   ```bash
   cd Packages && yarn install
   ```

3. Käännä (kääntää TypeScriptin `dist/`-kansioon):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Tai aja `yarn build` juuressa, jolloin kaikki paketit käännetään riippuvuusjärjestyksessä.

Testataksesi muutoksia käyttävässä API:ssa, käytä väliaikaista Yarn-portaalia -- katso [Paikallinen kehitys kuluttavaa sovellusta vastaan](./index.md#local-development-against-a-consuming-app).

## Julkaiseminen

Julkaisut kulkevat changesetien kautta: aja `yarn changeset` työtilan juuressa jokaisen muutoksen yhteydessä ja aja sitten `yarn publish-all`, kun olet valmis julkaisemaan. Koko prosessin kuvaus löytyy kohdasta [Jaettujen kirjastojen yleiskatsaus](./index.md#releasing-with-changesets).

:::info
Tämä paketti on riippuvuus jokaiselle ChurchApps-API:lle -- ytimelle Api, AskApi ja LessonsApi. Kun teet muutoksia, testaa ne paikallisesti API:a vasten ennen julkaisua.
:::

## Aiheeseen liittyvät artikkelit

- **[Helpers](./helpers)** -- Perustason apupaketti, josta tämä paketti riippuu
- **[Moduulien rakenne](../api/module-structure)** -- Miten controllereita ja auth-välikerroksia käytetään API-moduuleissa
- **[Paikallinen API-asennus](../api/local-setup)** -- API:n asentaminen paikalliseen kehitykseen
