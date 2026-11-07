---
title: "Prasyarat"
---

# Prasyarat

<div class="article-intro">

Alat yang Anda perlukan bergantung pada proyek mana yang ingin Anda kerjakan. Halaman ini mencantumkan semua perangkat lunak yang diperlukan, dikelompokkan menurut area pengembangan, mulai dari persyaratan umum hingga toolchain khusus platform.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Tinjau [Ikhtisar Proyek](./project-overview) untuk menentukan proyek mana yang ingin Anda kerjakan
- Pastikan Anda memiliki akses administrator di komputer pengembangan Anda untuk menginstal perangkat lunak

</div>

## Semua Proyek

Ini diperlukan terlepas dari proyek mana yang Anda kerjakan:

| Alat | Versi | Catatan |
|------|---------|-------|
| **Node.js** | 20+ | Versi 22+ diperlukan untuk B1App dan LessonsApp (Next.js 16); 24+ diperlukan untuk Api |
| **npm** | Tersedia bersama Node.js | Digunakan sebagai package manager di semua proyek |
| **Git** | Terbaru | Setiap proyek adalah repositori terpisah |

:::tip
Gunakan manajer versi Node seperti [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) atau [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) untuk beralih antarversi Node dengan mudah.
:::

## Pengembangan Backend API

Jika Anda berencana menjalankan API secara lokal (alih-alih mengarahkan ke API demo):

| Alat | Versi | Catatan |
|------|---------|-------|
| **MySQL** | 8.0+ | Setiap modul API menggunakan database-nya sendiri |

Anda memerlukan enam database untuk API inti: `membership`, `attendance`, `content`, `giving`, `messaging`, dan `doing`. API menyertakan skrip untuk menginisialisasi skema -- lihat panduan [pengaturan lokal API](../api/local-setup).

## Pengembangan Aplikasi Seluler

Untuk B1Mobile, B1Checkin, LessonsScreen, atau aplikasi React Native / Expo lainnya:

| Alat | Versi | Catatan |
|------|---------|-------|
| **Expo CLI** | Terbaru | Instal secara global: `npm install -g expo-cli` |
| **Android Studio** | Terbaru | Diperlukan untuk pengembangan Android (termasuk Android SDK) |
| **Xcode** | Terbaru | Diperlukan untuk pengembangan iOS (hanya macOS) |

:::info
Anda dapat menggunakan aplikasi Expo Go di perangkat fisik untuk pengujian cepat tanpa Android Studio atau Xcode. Namun, membangun binary produksi memerlukan toolchain native.
:::

## Pengembangan FreeShow (Aplikasi Desktop)

FreeShow memiliki dependensi build native tambahan karena mengompilasi modul Node native (seperti `canvas`):

### Semua Platform

| Alat | Versi | Catatan |
|------|---------|-------|
| **Python** | 3.12 | Diperlukan oleh `node-gyp` untuk kompilasi modul native |
| **setuptools** | Terbaru | Instal melalui `pip install setuptools` |

### Windows

| Alat | Catatan |
|------|-------|
| **Visual Studio** | Edisi Community sudah memadai |
| **Beban kerja "Desktop development with C++"** | Pilih saat instalasi Visual Studio |
| **Windows 10 SDK** | Termasuk dalam beban kerja C++; pastikan opsi ini dicentang |

Anda dapat menginstal alat build Visual Studio melalui baris perintah:

```bash
npm install --global windows-build-tools
```

Atau instal Visual Studio Community dan pilih beban kerja "Desktop development with C++" saat instalasi.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Xcode Command Line Tools biasanya sudah memadai:

```bash
xcode-select --install
```

## Verifikasi Instalasi Anda

Jalankan perintah berikut untuk memastikan semuanya sudah terinstal:

```bash
node --version    # Seharusnya menampilkan v20.x.x atau lebih tinggi
npm --version     # Seharusnya menampilkan 10.x.x atau lebih tinggi
git --version     # Seharusnya menampilkan git version 2.x.x
mysql --version   # Hanya diperlukan untuk pengembangan API lokal
```

## Langkah Berikutnya

- **[Ikhtisar Proyek](./project-overview)** -- Lihat semua proyek dan fungsinya
- **[Variabel Lingkungan](./environment-variables)** -- Konfigurasikan file `.env` Anda
