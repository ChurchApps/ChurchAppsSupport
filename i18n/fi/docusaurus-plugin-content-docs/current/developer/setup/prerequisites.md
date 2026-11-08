---
title: "Edellytykset"
description: "Asenna Node.js, npm, Git ja alustakohtaiset työkalut ennen ChurchApps-projektien, kuten B1 Adminin, Lessons.churchin, FreePlayn tai API:n, paikallista kehittämistä."
---

# Edellytykset

<div class="article-intro">

Tarvittavat työkalut riippuvat siitä, mihin projekteihin aiot osallistua. Tämä sivu luettelee kaikki vaadittavat ohjelmistot kehitysalueittain, yleisistä vaatimuksista alustakohtaisiin työkaluketjuihin.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Tutustu [Projektin yleiskatsaukseen](./project-overview.md), jotta tiedät, mihin projekteihin haluat osallistua
- Sinulla on oltava järjestelmänvalvojan oikeudet kehityskoneellasi ohjelmistojen asentamista varten

</div>

## Kaikki projektit

Nämä vaaditaan riippumatta siitä, mihin projektiin osallistut:

| Työkalu | Versio | Huomautuksia |
|------|---------|-------|
| **Node.js** | 20+ | Versio 22+ vaaditaan B1App- ja LessonsApp-sovelluksille (Next.js 16); 24+ vaaditaan Api-palvelulle |
| **npm** | Tulee Node.js:n mukana | Käytetään pakettienhallintana kaikissa projekteissa |
| **Git** | Uusin | Jokainen projekti on erillinen repositorio |

:::tip
Käytä Node-versionhallintaa, kuten [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) tai [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), vaihtaaksesi Node-versioiden välillä helposti.
:::

## Taustapalvelun (API) kehitys

Jos aiot ajaa API:n paikallisesti (sen sijaan, että käyttäisit demo-rajapintoja):

| Työkalu | Versio | Huomautuksia |
|------|---------|-------|
| **MySQL** | 8.0+ | Jokaisella API-moduulilla on oma tietokantansa |

Tarvitset kuusi tietokantaa ydin-API:lle: `membership`, `attendance`, `content`, `giving`, `messaging` ja `doing`. API sisältää skriptit skeeman alustamiseen -- katso [API:n paikallinen asennus](../api/local-setup.md) -opas.

## Mobiilisovelluskehitys

B1Checkin-, LessonsScreen- tai muille React Native / Expo -sovelluksille:

| Työkalu | Versio | Huomautuksia |
|------|---------|-------|
| **Expo CLI** | Uusin | Asenna globaalisti: `npm install -g expo-cli` |
| **Android Studio** | Uusin | Vaaditaan Android-kehitykseen (sisältää Android SDK:n) |
| **Xcode** | Uusin | Vaaditaan iOS-kehitykseen (vain macOS) |

:::info
Voit käyttää Expo Go -sovellusta fyysisellä laitteella nopeaan testaukseen ilman Android Studiota tai Xcodea. Tuotantoversioiden rakentaminen vaatii kuitenkin alustakohtaiset työkaluketjut.
:::

## FreeShow (työpöytäsovellus) -kehitys

FreeShow vaatii lisäksi natiiveja rakennusriippuvuuksia, koska se kääntää natiiveja Node-moduuleja (kuten `canvas`):

### Kaikki alustat

| Työkalu | Versio | Huomautuksia |
|------|---------|-------|
| **Python** | 3.12 | Vaaditaan `node-gyp`:n natiivimoduulien kääntämiseen |
| **setuptools** | Uusin | Asenna komennolla `pip install setuptools` |

### Windows

| Työkalu | Huomautuksia |
|------|-------|
| **Visual Studio** | Community-versio riittää |
| **"Desktop development with C++" -työkuorma** | Valitse Visual Studion asennuksen aikana |
| **Windows 10 SDK** | Sisältyy C++-työkuormaan; varmista, että se on valittuna |

Voit asentaa Visual Studion rakennustyökalut komentorivin kautta:

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

## Varmista asennus

Suorita nämä komennot varmistaaksesi, että kaikki on asennettu:

```bash
node --version    # Pitäisi tulostaa v20.x.x tai uudempi
npm --version     # Pitäisi tulostaa 10.x.x tai uudempi
git --version     # Pitäisi tulostaa git version 2.x.x
mysql --version   # Tarvitaan vain paikalliseen API-kehitykseen
```

## Seuraavat vaiheet

- **[Projektin yleiskatsaus](./project-overview.md)** -- Tutustu kaikkiin projekteihin ja niiden toimintaan
- **[Ympäristömuuttujat](./environment-variables.md)** -- Määritä `.env`-tiedostosi
