---
title: "Helpers"
---

# Helpers

<div class="article-intro">

Paket `@churchapps/helpers` menyediakan utilitas dasar yang digunakan oleh semua proyek ChurchApps, baik frontend maupun backend. Paket ini tidak bergantung pada framework tertentu dan mencakup helper umum seperti `DateHelper`, `ApiHelper`, `CurrencyHelper`, serta antarmuka TypeScript bersama yang membentuk kontrak data antara aplikasi dan API.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Instal **Node.js** dan **Git** -- lihat [Prasyarat](../setup/prerequisites)
- Pelajari pengaturan [workspace Packages](./index.md) dan alur rilisnya

</div>

## Siapa yang Menggunakan Paket Ini

Setiap API ChurchApps (Api inti, AskApi, dan LessonsApi) dan setiap frontend web (B1Admin, B1App, B1Transfer, LessonsApp) bergantung langsung pada paket ini. Frontend juga mendapatkan banyak ekspornya (`ApiHelper`, `DateHelper`, `UserHelper`, dan antarmuka lainnya) yang diekspor ulang melalui [`@churchapps/apphelper`](./app-helper). Paket bersama lainnya mendeklarasikannya sebagai peer dependency agar setiap aplikasi hanya menggunakan satu salinan.

## Pengaturan untuk Pengembangan Lokal

Paket ini berada di workspace [Packages](https://github.com/ChurchApps/Packages) bersama pustaka bersama lainnya:

1. Clone workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instal dependensi di root workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Build (mengompilasi TypeScript ke `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Atau jalankan `yarn build` di root untuk membangun setiap paket sesuai urutan dependensinya.

Untuk menguji perubahan di dalam proyek yang menggunakannya, gunakan Yarn portal sementara -- lihat [Pengembangan Lokal Terhadap Aplikasi yang Menggunakan Paket](./index.md#local-development-against-a-consuming-app).

## Publikasi

Rilis dilakukan melalui changesets, bukan dengan menaikkan versi secara manual:

1. Jalankan `yarn changeset` di root workspace dan pilih `@churchapps/helpers` dengan jenis kenaikan versi yang sesuai; commit file changeset yang dihasilkan bersama perubahan Anda.
2. Saat siap merilis, jalankan `yarn publish-all` di root -- perintah ini menaikkan versi, menulis CHANGELOG, membangun sesuai urutan dependensi, dan mempublikasikan ke npm.

Antarmuka bersama yang baru ditempatkan di `helpers/src/interfaces/` dan diekspor ulang melalui barrel paket. Katalog jenis elemen website builder (`ElementTypes.ts` -- 35 jenis beserta skema jawabannya) juga berada di sini; katalog ini menjadi kontrak yang dipakai bersama oleh renderer apphelper, formulir editor B1Admin, dan prompt pembuatan AI (lihat [Arsitektur Website Builder](../architecture/website-builder)).

:::warning
Karena paket ini digunakan oleh setiap proyek ChurchApps, perubahan di sini berdampak luas. Rilis `helpers` secara otomatis menaikkan versi `apihelper` dan `apphelper` agar rentang dependensinya tetap mutakhir. Uji dengan Yarn portal di setidaknya satu API yang menggunakannya dan satu aplikasi web yang menggunakannya sebelum mempublikasikan.
:::

## Artikel Terkait

- **[ApiHelper](./api-helper)** -- Utilitas sisi server yang bergantung pada paket ini
- **[AppHelper](./app-helper)** -- Komponen React yang bergantung pada paket ini
- **[Ringkasan Pustaka Bersama](./index.md)** -- Pengaturan workspace, alur rilis, dan alur kerja tautan lokal
