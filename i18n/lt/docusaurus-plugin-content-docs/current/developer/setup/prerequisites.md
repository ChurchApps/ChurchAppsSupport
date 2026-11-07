---
title: "Požymiai"
description: "Įdiekite Node.js, npm, Git ir platformų įrankius prieš dirbdami su ChurchApps projektais, pvz., B1 Admin, Lessons.church, FreePlay ar API vietoje."
---

# Požymiai

<div class="article-intro">

Įrankiai, kurių jums reikės, priklauso nuo to, su kuriais projektais planuojate dirbti. Šiame puslapyje pateikiama visa reikalinga programinė įranga, suskirstyta pagal kūrimo sritis – nuo bendrųjų reikalavimų iki platformai skirtų įrankių rinkinių.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Peržiūrėkite [Projektų apžvalgą](./project-overview.md), kad nustatytumėte, su kuriais projektais norite dirbti
- Savo kūrimo kompiuteryje turėkite administratoriaus teises programinei įrangai įdiegti

</div>

## Visi projektai

Šie reikalavimai taikomi nepriklausomai nuo to, su kuriuo projektu dirbate:

| Įrankis | Versija | Pastabos |
|------|---------|-------|
| **Node.js** | 20+ | B1App ir LessonsApp (Next.js 16) reikalauja 22+ versijos; Api – 24+ versijos |
| **npm** | Pateikiamas kartu su Node.js | Naudojamas kaip paketų tvarkyklė visuose projektuose |
| **Git** | Naujausia | Kiekvienas projektas yra atskira saugykla |

:::tip
Norėdami lengvai perjungti Node versijas, naudokite versijų tvaldymo įrankį, pvz., [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) arba [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows).
:::

## Backend API kūrimas

Jei planuojate vietoje paleisti API (o ne nukreipti į demonstracinius API):

| Įrankis | Versija | Pastabos |
|------|---------|-------|
| **MySQL** | 8.0+ | Kiekvienas API modulis naudoja savo duomenų bazę |

Pagrindiniam API jums reikės šešių duomenų bazių: `membership`, `attendance`, `content`, `giving`, `messaging` ir `doing`. API yra skriptų, skirtų schemai inicializuoti – žr. vadovą [API vietinis diegimas](../api/local-setup.md).

## Mobiliųjų programėlių kūrimas

B1Mobile, B1Checkin, LessonsScreen ar kitoms React Native / Expo programėlėms:

| Įrankis | Versija | Pastabos |
|------|---------|-------|
| **Expo CLI** | Naujausia | Įdiegti globaliai: `npm install -g expo-cli` |
| **Android Studio** | Naujausia | Reikalingas Android kūrimui (apima Android SDK) |
| **Xcode** | Naujausia | Reikalingas iOS kūrimui (tik macOS) |

:::info
Greitam testavimui galite naudoti Expo Go programėlę fiziniame įrenginyje, be Android Studio ar Xcode. Tačiau gamybinių versijų kūrimui reikalingi native įrankių rinkiniai.
:::

## FreeShow (darbalaukio programa) kūrimas

FreeShow turi papildomų native kūrimo priklausomybių, nes kompiliuoja native Node modulius (pvz., `canvas`):

### Visos platformos

| Įrankis | Versija | Pastabos |
|------|---------|-------|
| **Python** | 3.12 | Reikalingas `node-gyp` native moduliams kompiliuoti |
| **setuptools** | Naujausia | Įdiegti per `pip install setuptools` |

### Windows

| Įrankis | Pastabos |
|------|-------|
| **Visual Studio** | Pakanka Community leidimo |
| **„Desktop development with C++“ darbo krūvis** | Pasirinkite diegiant Visual Studio |
| **Windows 10 SDK** | Įtrauktas į C++ darbo krūvį; įsitikinkite, kad jis pažymėtas |

Visual Studio kūrimo įrankius galite įdiegti per komandinę eilutę:

```bash
npm install --global windows-build-tools
```

Arba įdiekite Visual Studio Community ir diegimo metu pasirinkite „Desktop development with C++“ darbo krūvį.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Paprastai pakanka Xcode Command Line Tools:

```bash
xcode-select --install
```

## Patikrinkite diegimą

Paleiskite šias komandas, kad įsitikintumėte, jog viskas įdiegta:

```bash
node --version    # Turėtų išvesti v20.x.x arba aukštesnę
npm --version     # Turėtų išvesti 10.x.x arba aukštesnę
git --version     # Turėtų išvesti git version 2.x.x
mysql --version   # Reikalinga tik vietiniam API kūrimui
```

## Kiti žingsniai

- **[Projektų apžvalga](./project-overview.md)** -- Peržiūrėkite visus projektus ir jų paskirtį
- **[Aplinkos kintamieji](./environment-variables.md)** -- Sukonfigūruokite savo `.env` failus
