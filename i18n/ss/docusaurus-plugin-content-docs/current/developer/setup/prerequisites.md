---
title: "Ntfutfumelo"
description: "Lungisa i-Node.js, i-npm, i-Git, kanye nemasistimu ye-platform ngaphambi kokusebenta kumaphrojekthi e-ChurchApps njenge-B1 Admin, Lessons.church, FreePlay, noma i-API endzaweni yakho."
---

# Ntfutfumelo

<div class="article-intro">

Ematuluzi lodzingekako ancike kutsi ngumaphrojekthi aphi lotfuna kusebenta kiwo. Leli khasi likhombisa wonkhe softhiwe lodzingekako lehlelwe ngekutfola kwemsebenti wekuthuthukisa, kusukela kulokudzingekako wonkhe kuya kumatulusi lokumele kuhlelelwe ngawo.

</div>

<div class="prereqs">
<h4>Ngaphambi Kokuqala</h4>

- Buka [Ngekwehluka Kwephrojekthi](./project-overview.md) ukuze uncume ukuthi ngumaphrojekthi aphi lofuna kusebenta kiwo
- Kufanele une-akhawunti yomphatsi kulikhompyutha lakho lekuthuthukisa kuze ufake softhiwe

</div>

## Wonkhe Emaphrojekthi

Lokhu kudzingeka nakuba ngumaphrojekthi aphi losebentisa:

| Ithuluzi | Inguqulo | Tinkhomba |
|------|---------|-------|
| **Node.js** | 20+ | Inguqulo 22+ idzingeka ye-B1App ne-LessonsApp (Next.js 16); 24+ idzingeka ye-Api |
| **npm** | Iyeta ne-Node.js | Isetfwa njengesiphatsi sematfuba kuwo wonkhe emaphrojekthi |
| **Git** | Lokusha kakhulu | Ngulokunye lephrojekthi ngurepositori lehlukile |

:::tip
Sebentisa umphatsi wenguqulo ye-Node njenge-[nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) noma i-[nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) ukuze ushintshe phakathi kweminguqulo ye-Node ngekusheshisa.
:::

## Ntfutfumelo Yekuthuthukisa Kwe-Backend API

Uma uhlela kusebentisa i-API endzaweni yakho (hhayi kusebentisa ama-API ledemo):

| Ithuluzi | Inguqulo | Tinkhomba |
|------|---------|-------|
| **MySQL** | 8.0+ | Ililinga ngalinye le-API lisebentisa idatabhesi yalo |

Utawudzingeka emadatabhesi lasitfupha ye-API lenkhulu: `membership`, `attendance`, `content`, `giving`, `messaging`, kanye ne-`doing`. I-API iletfwa emascriptsi ekuqalisa i-schema -- bheka kugcwaliswa kwe-[API local setup](../api/local-setup.md).

## Ntfutfumelo Yesifakeli Se-Mobile

Ye-B1Checkin, LessonsScreen, noma amanye ama-app e-React Native / Expo:

| Ithuluzi | Inguqulo | Tinkhomba |
|------|---------|-------|
| **Expo CLI** | Lokusha kakhulu | Fakela ngekubanti: `npm install -g expo-cli` |
| **Android Studio** | Lokusha kakhulu | Idzingeka ekuthuthukiseni i-Android (ifaka ne-Android SDK) |
| **Xcode** | Lokusha kakhulu | Idzingeka ekuthuthukiseni i-iOS (ye-macOS kuphela) |

:::info
Ungasebentisa i-app ye-Expo Go kudivayisi lebonakalako kuze uhlole ngekusheshisa ngaphandle kwe-Android Studio noma i-Xcode. Nakuba kunjalo, kwakha tinhlelo letikhiqizwako kudzinga emathuluzi lendzawo.
:::

## Ukuthuthukisa I-FreeShow (Softhiwe Yedeskithophu)

I-FreeShow inetindzawo letingeniwe letidzingekako lapho yakha khona timodyuli te-native (njenge-`canvas`):

### Wonkhe Emaplatifomu

| Ithuluzi | Inguqulo | Tinkhomba |
|------|---------|-------|
| **Python** | 3.12 | Idzingeka ye-`node-gyp` ekuhlanganiseni timodyuli te-native |
| **setuptools** | Lokusha kakhulu | Fakela ngi `pip install setuptools` |

### Windows

| Ithuluzi | Tinkhomba |
|------|-------|
| **Visual Studio** | Inguqulo ye-Community iyanele |
| **Umsebenti "Desktop development with C++"** | Khetha ngesikhatsi sekufakwa kwe-Visual Studio |
| **Windows 10 SDK** | Ifakwe ku-workload ye-C++; netsa kutsi iyachekwa |

Ungafaka ematuluzi wekwakha we-Visual Studio ngomugca wemilayeni:

```bash
npm install --global windows-build-tools
```

Noma ufake i-Visual Studio Community bese ukhetha umsebenti "Desktop development with C++" ngesikhatsi sekufaka.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Ematuluzi emugca wemilayeni we-Xcode ngalokuvamile ayanele:

```bash
xcode-select --install
```

## Hlola Kufakwa Kwakho

Gijima layo myalelo ukuze uciniseke kutsi konkhe kufakiwe:

```bash
node --version    # Kufanele iprinte v20.x.x noma ngaphezulu
npm --version     # Kufanele iprinte 10.x.x noma ngaphezulu
git --version     # Kufanele iprinte git version 2.x.x
mysql --version   # Idzingeka kuphela ekuthuthukisweni kwe-API endzaweni
```

## Tinyatelo Letilandzelako

- **[Ngekwehluka Kwephrojekthi](./project-overview.md)** -- Bona wonkhe emaphrojekthi nekutsi yenta ini
- **[Tinguquko Temvelo](./environment-variables.md)** -- Lungisa emafayela akho `.env`
