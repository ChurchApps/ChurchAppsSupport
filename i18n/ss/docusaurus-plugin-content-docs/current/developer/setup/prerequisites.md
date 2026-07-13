---
title: "Tidzingo Tekucala"
---

# Tidzingo Tekucala

<div class="article-intro">

Tinsimbi lotidzingako kuya ngekutsi ngumaphi emaphrojekthi lohlose kuwasebentela. Lelikhasi lilalisa sonkhe simiselo lesidzingekako, sihlelwe ngendzawo yekutfutfukisa, kusuka etidzingweni letijwayelekile kuya etinsimbini letikhetsekile ngekwe-platform.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekutsi Ucale</h4>

- Bukisisa [Simo Sonkhe Semaphrojekthi](./project-overview) kute ukhombe kutsi ngimaphi emaphrojekthi lofuna kuwasebentela
- Yiba nemvumo yebaphatsi (administrator access) kumshini wakho wekutfutfukisa kute ukwati kufaka i-software

</div>

## Onkhe Emaphrojekthi

Loku kudzingeka kungakhatsaliseki kutsi usebenta liphi liphrojekthi:

| Insimbi | Vasyini | Emanotsi |
|------|---------|-------|
| **Node.js** | 20+ | Vasyini 22+ iyadzingeka ku-B1App nase-LessonsApp (Next.js 16) |
| **npm** | Iveta ne-Node.js | Isetjentiswa njengemphatsi wemaphakheji kuwo onkhe emaphrojekthi |
| **Git** | Lokusha kakhulu | Ngalinye liphrojekthi liyi-repository lelizimele |

:::tip
Sebentisa umphatsi wevasyini ye-Node njenge-[nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) kumbe [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) kute ukwati kushintjashintja emkatsi kwetivasyini te-Node ngalula.
:::

## Kutfutfukiswa Kwe-Backend API

Nangabe uhlose kugijimisa i-API ngasekhaya (esikhundleni sekukhomba ku-staging):

| Insimbi | Vasyini | Emanotsi |
|------|---------|-------|
| **MySQL** | 8.0+ | Ngamunye we-module ye-API isebentisa i-database yayo |

Utodzinga tidatabase letisitfupha kuma-core API: `membership`, `attendance`, `content`, `giving`, `messaging`, ne-`doing`. I-API ihlanganisa ema-script ekucalisa i-schema -- bona umhlahlandlela we-[API local setup](../api/local-setup).

## Kutfutfukiswa Kwetinhlelo Teselula

Kuma-B1Mobile, B1Checkin, LessonsScreen, kumbe letinye tinhlelo te-React Native / Expo:

| Insimbi | Vasyini | Emanotsi |
|------|---------|-------|
| **Expo CLI** | Lokusha kakhulu | Faka kabanti (globally): `npm install -g expo-cli` |
| **Android Studio** | Lokusha kakhulu | Iyadzingeka ekutfutfukisweni kwe-Android (ihlanganisa i-Android SDK) |
| **Xcode** | Lokusha kakhulu | Iyadzingeka ekutfutfukisweni kwe-iOS (macOS kuphela) |

:::info
Ungasebentisa uhlelo lwe-Expo Go kudivayisi lelibambekako kute uhlole ngekushesha ngaphandle kwe-Android Studio nome i-Xcode. Nomakunjalo, kwakha ema-binary elikhulu (production binaries) kudzinga tinsimbi tendabuko (native toolchains).
:::

## Kutfutfukiswa Kwe-FreeShow (Uhlelo Lwe-Desktop)

I-FreeShow inetidzingo letengetiwe tekwakha lokwendabuko ngobe ihlanganisa ema-module e-Node lendabuko (njenge-`canvas`):

### Onkhe Ema-Platform

| Insimbi | Vasyini | Emanotsi |
|------|---------|-------|
| **Python** | 3.12 | Iyadzingwa yi-`node-gyp` ekuhlanganisweni kwema-module endabuko |
| **setuptools** | Lokusha kakhulu | Faka nge-`pip install setuptools` |

### Windows

| Insimbi | Emanotsi |
|------|-------|
| **Visual Studio** | I-Community edition iyanele |
| **"Desktop development with C++" workload** | Khetsa ngesikhatsi sekufakwa kwe-Visual Studio |
| **Windows 10 SDK** | Ihlanganisiwe ku-C++ workload; caphela kutsi ikhethiwe |

Ungafaka tinsimbi tekwakha te-Visual Studio nge-command line:

```bash
npm install --global windows-build-tools
```

Kumbe faka i-Visual Studio Community bese ukhetsa i-"Desktop development with C++" workload ngesikhatsi sekufakwa.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Ema-Xcode Command Line Tools ngalokuvamile ayanele:

```bash
xcode-select --install
```

## Chaka Kutsi Konkhe Kufakiwe Kahle

Gijimisa lemiyalo kute uchake kutsi konkhe kufakiwe:

```bash
node --version    # Kufanele kucindzetele v20.x.x kumbe ngetulu
npm --version     # Kufanele kucindzetele 10.x.x kumbe ngetulu
git --version     # Kufanele kucindzetele git version 2.x.x
mysql --version   # Kudzingeka kuphela ekutfutfukisweni kwe-API yasekhaya
```

## Tinyatselo Letilandzelako

- **[Simo Sonkhe Semaphrojekthi](./project-overview)** -- Bona onkhe emaphrojekthi nekutsi enta ini
- **[Emavariyebuli Endzawo](./environment-variables)** -- Hlela emafayela akho e-`.env`
