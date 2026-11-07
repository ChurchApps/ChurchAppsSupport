---
title: "Jaetut kirjastot"
description: "ChurchAppsin @churchapps npm-paketit, joita B1 Admin, B1.church ja API:t käyttävät, sekä Packages-työtilan käyttöönotto ja julkaisu changesetsin avulla."
---

# Jaetut kirjastot

<div class="article-intro">

ChurchAppsin jaettu koodi julkaistaan npm-rekisteriin `@churchapps/*`-scopen alle. Kaikki jaetut paketit sijaitsevat yhdessä repositoriossa -- [Packages](https://github.com/ChurchApps/Packages) -- jota hallitaan Yarn (Berry) -työtilana (workspace) ja versioidaan [changesets](https://github.com/changesets/changesets)-työkalulla.

</div>

## Paketit

| Paketti | Kuvaus | Käyttäjät |
|---------|--------|-----------|
| [`@churchapps/helpers`](./helpers.md) | Perustaso: kehyksestä riippumattomat apufunktiot ja jaetut TypeScript-rajapinnat, jotka muodostavat sovellusten välisen datasopimuksen | Kaikki projektit |
| [`@churchapps/apihelper`](./api-helper.md) | Palvelinpuolen Express-apuvälineet: todennus, perus-controllerit, tietokantayhteys sekä AWS- ja sähköpostiintegraatiot | Kaikki API:t |
| [`@churchapps/apphelper`](./app-helper.md) | Jaetut React-komponentit ja ominaisuusmoduulit (kirjautuminen, lahjoitukset, lomakkeet, markdown, verkkosivusto) | Kaikki web-sovellukset |
| `@churchapps/content-providers` | Abstraktio kolmannen osapuolen sisältöpalveluille (Lessons.church, Planning Center, Dropbox ja muut) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Työkalupakki B1.church-integraatioiden rakentamiseen: webhook-vahvistus, tyypitetty REST-asiakas ja OAuth-apufunktiot | Ulkoiset integraatiokehittäjät |
| `@churchapps/texting` | SMS-palveluntarjoajien abstraktio (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Riippuvuussuunta kulkee tiukasti alaspäin: sovellukset riippuvat paketeista `apihelper` ja `apphelper`, jotka ilmoittavat `@churchapps/helpers`-paketin **vertaisriippuvuudekseen** (peer dependency), jotta jokaisessa sovelluksessa on täsmälleen yksi kopio siitä.

## Työtilan asennus

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repo käyttää Yarn Berryä (juuritason `packageManager`-kenttä on ratkaiseva) ja yhtä lukitustiedostoa. `yarn build` rakentaa kaikki paketit riippuvuusjärjestyksessä, ja `yarn test` ajaa kaikkien pakettien testit.

## Julkaiseminen changesetsillä

Jokainen pakettiin tehty muutos julkaistaan changesetin kanssa:

1. Aja `yarn changeset` työtilan juuressa. Valitse muokkaamasi paketit, versiopäivityksen tyyppi (patch = korjaus, minor = uusi export tai ominaisuus, major = yhteensopimaton muutos) ja kirjoita yhden rivin yhteenveto. Se muuttuu CHANGELOG-merkinnäksi.
2. Tee generoidusta `.changeset/*.md`-tiedostosta osa koodimuutostasi ja commitoi ne yhdessä. Pre-commit-koukku estää commitit, jotka muuttavat paketin lähdekoodia ilman mukana olevaa changesetiä.
3. Kun olet valmis julkaisemaan, aja `yarn publish-all` juuressa. Se käsittelee odottavat changesetit (päivittää versiot, kirjoittaa CHANGELOGit ja synkronoi sisäiset riippuvuusvälit), rakentaa kaiken riippuvuusjärjestyksessä ja julkaisee päivitetyt paketit npm-rekisteriin. Lopuksi commitoi ja pushaa versiopäivitykset.

:::warning
Älä koskaan aja suoraa `npm publish` -komentoa yksittäisen paketin kansiossa. Se ohittaa rakennusjärjestyksen ja versiokirjanpidon, jonka julkaisuskripti hoitaa. Julkaiseminen vaatii npm-tilin, jolla on julkaisuoikeudet `@churchapps`-scopeen.
:::

## Paikallinen kehitys kuluttavaa sovellusta vastaan

Työtilan sisällä paketit rakentuvat suoraan toisiinsa, joten linkitystä ei tarvita. Kun haluat testata julkaisematonta pakettiversiota kuluttavassa sovelluksessa (B1Admin, B1App jne.), lisää kuluttajaan väliaikainen Yarn-portaali:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Rakenna paketti ensin (`yarn build` työtilan juuressa). Kuluttaja lukee käännetyn `dist/`-tulosteen, ei lähdekoodia.

:::warning
`yarn link` kirjoittaa portaaliresoluution kuluttajan `package.json`-tiedostoon. Älä koskaan commitoi sitä. Aja aina `yarn unlink` ja asenna riippuvuudet uudelleen, kun olet valmis.
:::
