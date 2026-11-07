---
title: "Edellytykset"
description: "Asenna Node.js, npm, Git ja alustakohtaiset työkalut ennen ChurchAppsin projektien (B1 Admin, Lessons.church, FreePlay, API) paikallista käyttöä."
---

# Edellytykset

<div class="article-intro">

Tarvittavat työkalut riippuvat siitä, mitä projekteja aiot työstää. Tämä sivu luettelee kaiken tarvittavan ohjelmiston kehitysalueittain, yleisistä vaatimuksista alustakohtaisiin työkaluketjuihin.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tutustu [projektien yleiskatsaukseen](./project-overview.md), jotta voit päättää, mitä projekteja haluat työstää
- Sinulla on oltava ylläpitäjän oikeudet kehityskoneellasi ohjelmistojen asentamiseksi

</div>

## Kaikki projektit

Nämä vaaditaan riippumatta siitä, mitä projektia työstät:

| Työkalu | Versio | Huomautukset |
|------|---------|-------|
| **Node.js** | 20+ | Versio 22+ vaaditaan B1App- ja LessonsApp-sovelluksille (Next.js 16); 24+ vaaditaan Api-palvelulle |
| **npm** | Tulee Node.js:n mukana | Käytetään pakettienhallintana kaikissa projekteissa |
| **Git** | Uusin | Jokainen projekti on erillinen repositorio |

:::tip
Käytä Node-versionhallintaa, kuten [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) tai [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), vaihtaaksesi Node-versioiden välillä helposti.
:::

## Taustapalvelun (API) kehitys

Jos aiot ajaa API-palvelun paikallisesti (demo-API-rajapintojen sijaan):

| Työkalu | Versio | Huomautukset |
|------|---------|-------|
| **MySQL** | 8.0+ | Jokainen API-moduuli käyttää omaa tietokantaansa |

Tarvitset ydin-API:lle kuusi tietokantaa: `membership`, `attendance`, `content`, `giving`, `messaging` ja `doing`. API sisältää skriptejä skeeman alustamiseen -- katso [API:n paikallisen asennuksen](../api/local-setup.md) opas.

## Mobiilisovellusten kehitys

B1Mobile-, B1Checkin-, LessonsScreen- tai muita React Native / Expo -sovelluksia varten:

| Työkalu | Versio | Huomautukset |
|------|---------|-------|
| **Expo CLI** | Uusin | Asenna globaalisti: `npm install -g expo-cli` |
| **Android Studio** | Uusin | Vaaditaan Android-kehitykseen (sisältää Android SDK:n) |
| **Xcode** | Uusin | Vaaditaan iOS-kehitykseen (vain macOS) |

:::info
Voit käyttää Expo Go -sovellusta fyysisellä laitteella nopeaan testaukseen ilman Android Studiota tai Xcodea. Tuotantoversioiden rakentaminen vaatii kuitenkin natiivityökaluketjut.
:::

## FreeShow (työpöytäsovellus) -kehitys

FreeShow vaatii lisäksi natiivit käännösriippuvuudet, koska se kääntää natiiveja Node-moduuleja (kuten `canvas`):

### Kaikki alustat

| Työkalu | Versio | Huomautukset |
|------|---------|-------|
| **Python** | 3.12 | `node-gyp` vaatii natiivimoduulien kääntämiseen |
| **setuptools** | Uusin | Asenna komennolla `pip install setuptools` |

### Windows

| Työkalu | Huomautukset |
|------|-------|
| **Visual Studio** | Community-versio riittää |
| **"Desktop development with C++" -työkuorma** | Valitse Visual Studion asennuksen aikana |
| **Windows 10 SDK** | Sisältyy C++-työkuormaan; varmista, että se on valittuna |

Voit asentaa Visual Studion käännystyökalut komentoriviltä:

```bash
npm install --global windows-build-tools
```

Tai asenna Visual Studio Community ja valitse asennuksen aikana "Desktop development with C++" -työkuorma.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcoden komentorivityökalut riittävät yleensä:

```bash
xcode-select --install
```

## Tarkista asennus

Suorita nämä komennot varmistaaksesi, että kaikki on asennettu:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Seuraavat vaiheet

- **[Projektien yleiskatsaus](./project-overview.md)** -- Katso kaikki projektit ja niiden tehtävät
- **[Ympäristömuuttujat](./environment-variables.md)** -- Määritä `.env`-tiedostot
