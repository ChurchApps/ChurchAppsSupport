---
title: "Mga Kinakailangan"
description: "I-set up ang Node.js, npm, Git, at mga platform toolchain bago magtrabaho sa mga proyekto ng ChurchApps tulad ng B1 Admin, Lessons.church, FreePlay, o ang API nang lokal."
---

# Mga Kinakailangan

<div class="article-intro">

Ang mga kasangkapang kailangan mo ay nakadepende sa mga proyektong balak mong pagtrabahuhan. Nakalista sa pahinang ito ang lahat ng kinakailangang software, na inayos ayon sa lugar ng development, mula sa mga pangkalahatang kinakailangan hanggang sa mga toolchain na partikular sa platform.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Basahin ang [Project Overview](./project-overview.md) para malaman kung aling mga proyekto ang gusto mong pagtrabahuhan
- Kailangan mo ng administrator access sa iyong development machine para mag-install ng software

</div>

## Lahat ng Proyekto

Kinakailangan ang mga ito anuman ang proyektong pagtatrabahuhan mo:

| Tool | Bersyon | Mga Tala |
|------|---------|-------|
| **Node.js** | 20+ | Kailangan ang bersyon 22+ para sa B1App at LessonsApp (Next.js 16); 24+ para sa Api |
| **npm** | Kasama ng Node.js | Ginagamit na package manager sa lahat ng proyekto |
| **Git** | Pinakabago | Magkakahiwalay na repository ang bawat proyekto |

:::tip
Gumamit ng Node version manager tulad ng [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) para madaling makapagpalit ng bersyon ng Node.
:::

## Backend API Development

Kung balak mong patakbuhin ang API nang lokal (sa halip na gamitin ang mga demo API):

| Tool | Bersyon | Mga Tala |
|------|---------|-------|
| **MySQL** | 8.0+ | Gumagamit ang bawat API module ng sarili nitong database |

Kakailanganin mo ng anim na database para sa core API: `membership`, `attendance`, `content`, `giving`, `messaging`, at `doing`. May mga script ang API para i-initialize ang schema -- tingnan ang gabay na [API local setup](../api/local-setup.md).

## Mobile App Development

Para sa B1Checkin, LessonsScreen, o iba pang React Native / Expo app:

| Tool | Bersyon | Mga Tala |
|------|---------|-------|
| **Expo CLI** | Pinakabago | I-install nang global: `npm install -g expo-cli` |
| **Android Studio** | Pinakabago | Kailangan para sa Android development (kasama ang Android SDK) |
| **Xcode** | Pinakabago | Kailangan para sa iOS development (macOS lang) |

:::info
Maaari mong gamitin ang Expo Go app sa totoong device para sa mabilisang pagsubok nang walang Android Studio o Xcode. Gayunman, kailangan ng native toolchain para makabuo ng production binary.
:::

## FreeShow (Desktop App) Development

May karagdagang native build dependency ang FreeShow dahil nagko-compile ito ng native Node module (gaya ng `canvas`):

### Lahat ng Platform

| Tool | Bersyon | Mga Tala |
|------|---------|-------|
| **Python** | 3.12 | Kailangan ng `node-gyp` para sa pag-compile ng native module |
| **setuptools** | Pinakabago | I-install gamit ang `pip install setuptools` |

### Windows

| Tool | Mga Tala |
|------|-------|
| **Visual Studio** | Sapat na ang Community edition |
| **"Desktop development with C++" workload** | Piliin habang nag-i-install ng Visual Studio |
| **Windows 10 SDK** | Kasama sa C++ workload; siguraduhing may check ito |

Maaari mong i-install ang Visual Studio build tools sa pamamagitan ng command line:

```bash
npm install --global windows-build-tools
```

O i-install ang Visual Studio Community at piliin ang "Desktop development with C++" workload habang nag-i-install.

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

Patakbuhin ang mga command na ito para makumpirmang tama ang lahat ng naka-install:

```bash
node --version    # Dapat mag-print ng v20.x.x o mas mataas
npm --version     # Dapat mag-print ng 10.x.x o mas mataas
git --version     # Dapat mag-print ng git version 2.x.x
mysql --version   # Kailangan lang para sa lokal na API development
```

## Susunod na Hakbang

- **[Project Overview](./project-overview.md)** -- Tingnan ang lahat ng proyekto at ang ginagawa ng bawat isa
- **[Environment Variables](./environment-variables.md)** -- I-configure ang iyong mga `.env` file
