---
title: "Penerapan Aplikasi Mobile"
description: "Panduan membangun rilis Android dan iOS untuk aplikasi Expo seperti B1 Checkin, mengirimkannya ke toko aplikasi, dan mendorong pembaruan OTA dengan EAS."
---

# Penerapan Aplikasi Mobile

<div class="article-intro">

Aplikasi mobile Expo milik ChurchApps, seperti B1 Checkin, dibangun dengan **Expo EAS Build** atau build Gradle lokal, lalu didistribusikan melalui toko aplikasi. Halaman ini membahas cara membangun, mengirimkan, dan mendorong pembaruan over-the-air (OTA) untuk Android dan iOS, dengan B1 Checkin sebagai contoh.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Siapkan aplikasi secara lokal -- lihat [Aplikasi Mobile](../mobile/index.md#local-setup)
- Pasang dan konfigurasikan [EAS CLI](https://docs.expo.dev/eas/)
- Pastikan Anda memiliki akses ke Google Play Console (Android) dan/atau Apple App Store Connect (iOS)

</div>

## Membangun

### Android

Build rilis Android dijalankan secara lokal dan ditandatangani dengan keystore rilis dari EAS. Unduh sekali saja dengan `npx eas-cli credentials -p android` (pilih **credentials.json: Download credentials from EAS**), lalu jalankan:

```bash
yarn build:android
```

Bundle Google Play akan ditulis ke `android/app/build/outputs/bundle/release/app-release.aab`. Untuk membangun di EAS sebagai gantinya, jalankan `yarn build:android:eas`.

### iOS

Build iOS selalu dijalankan di EAS:

```bash
yarn build:ios
```

## Mengirimkan ke Toko Aplikasi

### Android -- Google Play Store

Unggah AAB melalui Play Console, atau kirimkan dengan EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Kirimkan build iOS langsung melalui EAS:

```bash
eas submit --platform ios
```

## Pembaruan OTA

Untuk perubahan yang hanya berupa JavaScript dan tidak memerlukan tinjauan toko aplikasi, gunakan pembaruan over-the-air (OTA):

```bash
yarn update
```

Perintah ini menggunakan EAS Update untuk mendorong perubahan langsung ke pengguna tanpa pengiriman penuh ke toko aplikasi.

:::tip
Pembaruan OTA jauh lebih cepat daripada build toko -- perubahan bisa sampai ke pengguna dalam hitungan menit, bukan hari. Gunakan untuk perbaikan bug, perubahan teks, dan penyesuaian UI kecil yang tidak melibatkan perubahan kode native.
:::

## Nomor Versi

Sebelum membuat build untuk toko, nomor versi harus diperbarui di beberapa file:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` dan `versionCode`)

Nomor build iOS ditambah secara otomatis oleh EAS.

:::warning
Jika lupa memperbarui nomor versi di semua file, build akan gagal atau aplikasi ditolak oleh toko aplikasi. Periksa ulang setiap file di atas sebelum memulai build produksi.
:::

## Artikel Terkait

- **[Aplikasi Mobile](../mobile/index.md)** -- Panduan pengaturan lokal dan pengembangan
- **[Penerapan API](./apis.md)** -- Menerapkan API backend
- **[Penerapan Aplikasi Web](./web-apps.md)** -- Menerapkan aplikasi web frontend
