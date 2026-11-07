---
title: "Mga Kinakailangan"
description: "I-set up ang Node.js, npm, Git, at platform toolchains bago magtrabaho sa ChurchApps tulad ng B1 Admin, Lessons.church, FreePlay, o API nang lokal."
---

# Mga Kinakailangan

<div class="article-intro">

Nakadepende sa mga proyektong balak mong pagtrabahuhan ang mga kasangkapang kailangan mo. Nakalista sa pahinang ito ang lahat ng kinakailangang software, nakaayos ayon sa lugar ng development -- mula sa mga pangkalahatang kinakailangan hanggang sa mga toolchain na partikular sa platform.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Repasuhin ang [Project Overview](./project-overview.md) para malaman kung aling mga proyekto ang gusto mong pagtrabahuhan
- Magkaroon ng administrator access sa iyong development machine para makapag-install ng software

</div>

## Lahat ng Proyekto

Kinakailangan ang mga ito anuman ang proyektong pagtatrabahuhan mo:

| Kasangkapan | Bersyon | Mga tala |
|------|---------|-------|
| **Node.js** | 20+ | Kailangan ang 22+ para sa B1App at LessonsApp (Next.js 16); 24+ para sa Api |
| **npm** | Kasama ng Node.js | Ginagamit na package manager sa lahat ng proyekto |
| **Git** | Pinakabago | Magkakahiwalay na repository ang bawat proyekto |

:::tip
Gumamit ng Node version manager gaya ng [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) para madaling makalipat sa pagitan ng mga bersyon ng Node.
:::

## Pag-develop ng Backend API

Kung balak mong patakbuhin nang lokal ang API (sa halip na ituro sa mga demo API):

| Kasangkapan | Bersyon | Mga tala |
|------|---------|-------|
| **MySQL** | 8.0+ | Gumagamit ang bawat module ng API ng sarili nitong database |

Kakailanganin mo ng anim na database para sa core API: `membership`, `attendance`, `content`, `giving`, `messaging`, at `doing`. May mga script ang API para i-initialize ang schema -- tingnan ang gabay na [API local setup](../api/local-setup.md).

## Pag-develop ng Mobile App

Para sa B1Mobile, B1Checkin, LessonsScreen, o iba pang React Native / Expo app:

| Kasangkapan | Bersyon | Mga tala |
|------|---------|-------|
| **Expo CLI** | Pinakabago | I-install nang global: `npm install -g expo-cli` |
| **Android Studio** | Pinakabago | Kailangan para sa Android development (kasama ang Android SDK) |
| **Xcode** | Pinakabago | Kailangan para sa iOS development (macOS lang) |

:::info
Maaari mong gamitin ang Expo Go app sa pisikal na device para sa mabilisang pagsubok nang walang Android Studio o Xcode. Gayunman, kailangan ng native toolchain ang pagbuo ng production binary.
:::

## Pag-develop ng FreeShow (Desktop App)

May karagdagang native build dependency ang FreeShow dahil nagko-compile ito ng native Node module (gaya ng `canvas`):

### Lahat ng Platform

| Kasangkapan | Bersyon | Mga tala |
|------|---------|-------|
| **Python** | 3.12 | Kailangan ng `node-gyp` para sa pag-compile ng native module |
| **setuptools** | Pinakabago | I-install sa pamamagitan ng `pip install setuptools` |

### Windows

| Kasangkapan | Mga tala |
|-------|-------|
| **Visual Studio** | Sapat na ang Community edition |
| **Workload na "Desktop development with C++"** | Piliin habang nag-i-install ng Visual Studio |
| **Windows 10 SDK** | Kasama sa C++ workload; siguraduhing naka-check ito |

Maaari mong i-install ang Visual Studio build tools sa pamamagitan ng command line:

```bash
npm install --global windows-build-tools
```

O i-install ang Visual Studio Community at piliin ang workload na "Desktop development with C++" habang nag-i-install.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Kadalasang sapat na ang Xcode Command Line Tools:

```bash
xcode-select --install
```

## I-verify ang Iyong Installation

Patakbuhin ang mga command na ito para makumpirmang lahat ay naka-install:

```bash
node --version    # Dapat magpakita ng v20.x.x o mas mataas
npm --version     # Dapat magpakita ng 10.x.x o mas mataas
git --version     # Dapat magpakita ng git version 2.x.x
mysql --version   # Kailangan lang para sa lokal na API development
```

## Mga Susunod na Hakbang

- **[Project Overview](./project-overview.md)** -- Tingnan ang lahat ng proyekto at kung ano ang ginagawa ng bawat isa
- **[Environment Variables](./environment-variables.md)** -- I-configure ang iyong mga file na `.env`
