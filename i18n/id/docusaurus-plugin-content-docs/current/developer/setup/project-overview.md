---
title: "Ikhtisar Proyek"
description: "Petakan setiap repositori ChurchApps berdasarkan kategori, beserta framework, port pengembangan, basis data, dan cara paket @churchapps bersama saling terhubung, dalam dokumentasi pengaturan pengembang."
---

# Ikhtisar Proyek

<div class="article-intro">

ChurchApps terdiri dari sekitar 20 repositori independen, masing-masing diterbitkan di bawah [organisasi GitHub ChurchApps](https://github.com/ChurchApps). Halaman ini memuat inventaris lengkap semua proyek yang dikelompokkan berdasarkan kategori, beserta framework, port, dan hubungannya.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Pasang [prasyarat](./prerequisites.md) untuk kategori proyek yang ingin Anda kerjakan

</div>

## API Backend

Semua API dibangun dengan Node.js, Express, dan TypeScript, serta diterapkan ke AWS Lambda melalui Serverless Framework.

| Proyek | Tujuan | Port Pengembangan | Basis Data |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Monolit modular inti yang mencakup keanggotaan, kehadiran, konten, pemberian, pesan, dan doing | 8084 | Database MySQL terpisah untuk setiap modul (6 total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend Lessons.church | -- | Satu database MySQL `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Alat kueri AI yang didukung OpenAI | -- | -- |

:::info
Proyek **Api** inti adalah monolit modular. Setiap modul (keanggotaan, kehadiran, konten, pemberian, pesan, doing) memiliki basis datanya sendiri dan dapat diakses melalui subpath seperti `/membership` atau `/giving`. Di lingkungan produksi, modul-modul ini diekspos sebagai fungsi Lambda terpisah di balik API Gateway.
:::

## Aplikasi Web

| Proyek | Framework | Port Pengembangan | Tujuan |
|-----------|-----------|----------|----------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Dasbor administrasi gereja |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Aplikasi anggota gereja untuk publik |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilitas impor/ekspor data |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Statis | -- | Situs brosur gereja statis |

## Aplikasi Seluler

Semua aplikasi seluler menggunakan React Native dengan Expo.

| Proyek | Tujuan | Versi Utama |
|---------|--------------|--------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplikasi kios check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Tampilan pelajaran untuk Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Pemutaran konten (termasuk TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Pengendali jarak jauh seluler untuk FreeShow | Expo |

## Desktop

| Proyek | Stack | Tujuan |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Perangkat lunak presentasi dan ibadah |

## Pustaka Bersama

Kode bersama diterbitkan ke npm di bawah scope `@churchapps` dan digunakan sebagai dependensi npm biasa oleh proyek-proyek di atas. Semua paket bersama berada dalam satu repositori -- [Packages](https://github.com/ChurchApps/Packages) -- yang dikelola sebagai Yarn workspace dan dirilis dengan changesets.

| Paket | Tujuan | Digunakan Oleh |
|---------|---------|---------|
| `@churchapps/helpers` | Utilitas dasar dan antarmuka TypeScript bersama (DateHelper, ApiHelper, CurrencyHelper, dll.) | Semua proyek |
| `@churchapps/apihelper` | Utilitas server Express (autentikasi, controller dasar, akses basis data, integrasi AWS) | Semua API |
| `@churchapps/apphelper` | Pustaka komponen React dengan modul subpath untuk login, donasi, formulir, markdown, dan pembuatan situs web | Semua aplikasi web |
| `@churchapps/content-providers` | Abstraksi penyedia konten pihak ketiga (Lessons.church, Planning Center, Dropbox, dan lainnya) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit integrasi B1.church: webhook, klien REST, OAuth | Pengembang integrasi eksternal |
| `@churchapps/texting` | Abstraksi penyedia SMS | Api |

Lihat [Pustaka Bersama](../shared-libraries/index.md) untuk pengaturan workspace dan alur kerja rilis.

## Hubungan Antarproyek

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Semua aplikasi frontend bergantung pada `@churchapps/helpers`. Aplikasi web juga bergantung pada paket `@churchapps/apphelper`. Semua API backend bergantung pada `@churchapps/helpers` dan `@churchapps/apihelper`.

## Langkah Selanjutnya

- **[Variabel Lingkungan](./environment-variables.md)** -- Konfigurasikan file `.env` Anda untuk terhubung ke API
- **[Pengaturan Lokal API](../api/local-setup.md)** -- Siapkan API backend secara lokal
