---
title: "Požiūris"
description: "Nustatykite Node.js, npm, Git ir platformos įrankius prieš dirbdami su ChurchApps projektais, tokiais kaip B1 Admin, Lessons.church, FreePlay ar API, lokaliai."
---

# Požiūris

<div class="article-intro">

Įrankiai, kurių jums reikia, priklauso nuo to, su kuriais projektais planuojate dirbti. Šiame puslapyje pateikiama visa reikalinga programinė įranga, sugrupuota pagal kūrimo sritis: nuo bendrųjų reikalavimų iki platformai specifinių įrankių grandinių.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Peržiūrėkite [Projekto apžvalgą](./project-overview.md), kad nustatytumėte, su kuriais projektais norite dirbti
- Savo kompiuteryje turėkite administratoriaus teises programinei įrangai įdiegti

</div>

## Visi projektai

Šie reikalavimai taikomi nepriklausomai nuo to, su kuriuo projektu dirbate:

| Įrankis | Versija | Pastabos |
|------|---------|-------|
| **Node.js** | 20+ | Versija 22+ reikalinga B1App ir LessonsApp (Next.js 16); 24+ reikalinga Api |
| **npm** | Pateikiamas kartu su Node.js | Naudojamas kaip paketų tvarkyklė visuose projektuose |
| **Git** | Naujausia | Kiekvienas projektas yra atskira saugykla |

:::tip
Naudokite Node versijų tvaldymo įrankį, pvz., [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) arba [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows), kad patogiai perjungtumėte Node versijas.
:::

## Backend API kūrimas

Jei planuojate paleisti API lokaliai (o ne naudoti demonstracinius API):

| Įrankis | Versija | Pastabos |
|------|---------|-------|
| **MySQL** | 8.0+ | Kiekvienas API modulis naudoja savo duomenų bazę |

Pagrindiniam API jums reikės šešių duomenų bazių: `membership`, `attendance`, `content`, `giving`, `messaging` ir `doing`. API yra skriptų, skirtų schemai inicializuoti – žr. [API lokalaus nustatymo](../api/local-setup.md) vadovą.

## Mobiliosios programėlės kūrimas

B1Checkin, LessonsScreen ar kitoms React Native / Expo programėlėms:

| Įrankis | Versija | Pastabos |
|------|---------|-------|
| **Expo CLI** | Naujausia | Įdiegti globaliai: `npm install -g expo-cli` |
| **Android Studio** | Naujausia | Reikalinga Android kūrimui (apima Android SDK) |
| **Xcode** | Naujausia | Reikalinga iOS kūrimui (tik macOS) |

:::info
Greitam testavimui fiziniame įrenginyje galite naudoti Expo Go programėlę, be Android Studio ar Xcode. Tačiau produkcinių versijų kūrimui reikalingos vietinės įrankių grandinės.
:::

## FreeShow (darbalaukio programėlės) kūrimas

FreeShow turi papildomų vietinių kūrimo priklausomybių, nes kompiliuoja vietinius Node modulius (pvz., `canvas`):

### Visos platformos

| Įrankis | Versija | Pastabos |
|------|---------|-------|
| **Python** | 3.12 | Reikalinga `node-gyp` vietinių modulių kompiliavimui |
| **setuptools** | Naujausia | Įdiekite per `pip install setuptools` |

### Windows

| Įrankis | Pastabos |
|------|-------|
| **Visual Studio** | Pakanka Community leidimo |
| **„Desktop development with C++“ darbo apkrova** | Pasirinkite diegiant Visual Studio |
| **Windows 10 SDK** | Įtraukta į C++ darbo apkrovą; įsitikinkite, kad pažymėta |

Visual Studio kūrimo įrankius galite įdiegti per komandinę eilutę:

```bash
npm install --global windows-build-tools
```

Arba įdiekite Visual Studio Community ir diegimo metu pasirinkite „Desktop development with C++“ darbo apkrovą.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Paprastai pakanka Xcode komandinės eilutės įrankių:

```bash
xcode-select --install
```

## Patikrinkite diegimą

Paleiskite šias komandas, kad įsitikintumėte, jog viskas įdiegta:

```bash
node --version    # Turėtų išvesti v20.x.x arba aukštesnę
npm --version     # Turėtų išvesti 10.x.x arba aukštesnę
git --version     # Turėtų išvesti git version 2.x.x
mysql --version   # Reikalinga tik lokaliam API kūrimui
```

## Kiti žingsniai

- **[Projekto apžvalga](./project-overview.md)** -- Peržiūrėkite visus projektus ir jų paskirtį
- **[Aplinkos kintamieji](./environment-variables.md)** -- Sukonfigūruokite savo `.env` failus
