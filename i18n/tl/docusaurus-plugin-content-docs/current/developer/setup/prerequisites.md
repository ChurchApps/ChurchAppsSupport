---
title: "Mga Kinakailangan"
---

# Mga Kinakailangan

<div class="article-intro">

Ang mga tool na kailangan mo ay depende sa kung aling mga proyekto ang plano mong gawin. Inilalista ng pahinang ito ang lahat ng kinakailangang software na nakaayos ayon sa development area, mula sa mga unibersal na kinakailangan hanggang sa mga platform-specific na toolchain.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Suriin ang [Pangkalahatang-tanaw ng Proyekto](./project-overview) para malaman kung aling mga proyekto ang gusto mong gawin
- Magkaroon ng administrator access sa iyong development machine para sa pag-install ng software

</div>

## Lahat ng Proyekto

Kinakailangan ang mga ito anuman ang proyektong ginagawa mo:

| Tool | Bersyon | Mga Tala |
|------|---------|-------|
| **Node.js** | 20+ | Kailangan ang bersyon 22+ para sa B1App at LessonsApp (Next.js 16) |
| **npm** | Kasama ng Node.js | Ginagamit bilang package manager sa lahat ng proyekto |
| **Git** | Pinakabago | Ang bawat proyekto ay isang hiwalay na repository |

:::tip
Gumamit ng Node version manager tulad ng [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) para madaling maglipat sa pagitan ng mga bersyon ng Node.
:::

## Backend API Development

Kung plano mong patakbuhin ang API nang lokal (sa halip na ituro sa staging):

| Tool | Bersyon | Mga Tala |
|------|---------|-------|
| **MySQL** | 8.0+ | Ang bawat API module ay gumagamit ng sarili nitong database |

Kakailanganin mo ng anim na database para sa core API: `membership`, `attendance`, `content`, `giving`, `messaging`, at `doing`. Kasama sa API ang mga script para i-initialize ang schema -- tingnan ang gabay sa [Lokal na API setup](../api/local-setup).

## Mobile App Development

Para sa B1Mobile, B1Checkin, LessonsScreen, o iba pang React Native / Expo na mga app:

| Tool | Bersyon | Mga Tala |
|------|---------|-------|
| **Expo CLI** | Pinakabago | I-install nang global: `npm install -g expo-cli` |
| **Android Studio** | Pinakabago | Kinakailangan para sa Android development (kasama ang Android SDK) |
| **Xcode** | Pinakabago | Kinakailangan para sa iOS development (macOS lamang) |

:::info
Maaari mong gamitin ang Expo Go app sa isang pisikal na device para sa mabilis na pagsubok nang walang Android Studio o Xcode. Gayunpaman, ang pagbuo ng production binary ay nangangailangan ng mga native toolchain.
:::

## FreeShow (Desktop App) Development

Ang FreeShow ay may karagdagang native build dependency dahil kino-compile nito ang mga native Node module (tulad ng `canvas`):

### Lahat ng Platform

| Tool | Bersyon | Mga Tala |
|------|---------|-------|
| **Python** | 3.12 | Kinakailangan ng `node-gyp` para sa native module compilation |
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

O mag-install ng Visual Studio Community at piliin ang "Desktop development with C++" workload habang nag-i-install.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Ang Xcode Command Line Tools ay karaniwang sapat:

```bash
xcode-select --install
```

## I-verify ang Iyong Installation

Patakbuhin ang mga command na ito para kumpirmahin na lahat ay naka-install:

```bash
node --version    # Should print v20.x.x or higher
npm --version     # Should print 10.x.x or higher
git --version     # Should print git version 2.x.x
mysql --version   # Only needed for local API development
```

## Mga Susunod na Hakbang

- **[Pangkalahatang-tanaw ng Proyekto](./project-overview)** -- Tingnan ang lahat ng proyekto at kung ano ang ginagawa nila
- **[Mga Environment Variable](./environment-variables)** -- I-configure ang iyong mga `.env` file
