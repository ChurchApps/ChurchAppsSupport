---
title: "Mga Kinakailangan"
---

# Mga Kinakailangan

<div class="article-intro">

Nakadepende sa mga proyektong balak mong pagtrabahuhan ang mga tool na kailangan mo. Nakalista sa pahinang ito ang lahat ng kinakailangang software, nakaayos ayon sa lugar ng development, mula sa mga universal na kinakailangan hanggang sa platform-specific na toolchain.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Basahin ang [Project Overview](./project-overview) para malaman kung aling mga proyekto ang gusto mong pagtrabahuhan
- Dapat may administrator access ka sa development machine mo para makapag-install ng software

</div>

## Lahat ng Proyekto

Kinakailangan ang mga ito anuman ang proyektong pinagtatrabahuhan mo:

| Tool | Bersyon | Mga Tala |
|------|---------|----------|
| **Node.js** | 20+ | Kailangan ang bersyon 22+ para sa B1App at LessonsApp (Next.js 16) |
| **npm** | Kasama ng Node.js | Ginagamit na package manager sa lahat ng proyekto |
| **Git** | Pinakabago | Bawat proyekto ay hiwalay na repository |

:::tip
Gumamit ng Node version manager gaya ng [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) para madaling makalipat sa pagitan ng mga bersyon ng Node.
:::

## Pag-develop ng Backend API

Kung balak mong patakbuhin ang API nang lokal (sa halip na ituro sa demo API):

| Tool | Bersyon | Mga Tala |
|------|---------|----------|
| **MySQL** | 8.0+ | Gumagamit ang bawat API module ng sarili nitong database |

Kakailanganin mo ng anim na database para sa core API: `membership`, `attendance`, `content`, `giving`, `messaging`, at `doing`. May mga script ang API para i-initialize ang schema -- tingnan ang gabay na [API local setup](../api/local-setup).

## Pag-develop ng Mobile App

Para sa B1Mobile, B1Checkin, LessonsScreen, o iba pang React Native / Expo app:

| Tool | Bersyon | Mga Tala |
|------|---------|----------|
| **Expo CLI** | Pinakabago | I-install nang global: `npm install -g expo-cli` |
| **Android Studio** | Pinakabago | Kailangan para sa Android development (kasama ang Android SDK) |
| **Xcode** | Pinakabago | Kailangan para sa iOS development (macOS lamang) |

:::info
Maaari mong gamitin ang Expo Go app sa totoong device para sa mabilisang pagsubok nang walang Android Studio o Xcode. Gayunman, kailangan ng native toolchain ang pag-build ng production binaries.
:::

## FreeShow (Desktop App) Development

Ang FreeShow ay may dagdag na native build dependency dahil nagko-compile ito ng native Node module (gaya ng `canvas`):

### Lahat ng Platform

| Tool | Bersyon | Mga Tala |
|------|---------|----------|
| **Python** | 3.12 | Kailangan ng `node-gyp` para sa pag-compile ng native module |
| **setuptools** | Pinakabago | I-install sa pamamagitan ng `pip install setuptools` |

### Windows

| Tool | Mga Tala |
|------|-------|
| **Visual Studio** | Sapat na ang Community edition |
| **"Desktop development with C++" workload** | Piliin habang nag-i-install ng Visual Studio |
| **Windows 10 SDK** | Kasama sa C++ workload; siguraduhing naka-check ito |

Maaari mong i-install ang Visual Studio build tools sa pamamagitan ng command line:

```bash
npm install --global windows-build-tools
```

O mag-install ng Visual Studio Community at piliin ang workload na "Desktop development with C++" habang nag-i-install.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Karaniwan nang sapat na ang Xcode Command Line Tools:

```bash
xcode-select --install
```

## I-verify ang Iyong Installation

Patakbuhin ang mga command na ito para kumpirmahin na naka-install ang lahat:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Mga Susunod na Hakbang

- **[Project Overview](./project-overview)** -- Tingnan ang lahat ng proyekto at kung ano ang ginagawa ng bawat isa
- **[Environment Variables](./environment-variables)** -- I-configure ang iyong mga `.env` file
