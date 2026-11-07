---
title: "Penerapan Aplikasi Seluler"
description: "Panduan membangun rilis Android dan iOS aplikasi B1 Mobile dengan Expo EAS, mengirimkannya ke toko aplikasi, dan mendorong pembaruan OTA."
---

# Penerapan Aplikasi Seluler

<div class="article-intro">

Aplikasi seluler ChurchApps dibangun dan diterapkan menggunakan **Expo EAS Build** serta didistribusikan melalui toko aplikasi. Halaman ini membahas cara membangun, mengirimkan, dan mendorong pembaruan over-the-air (OTA) untuk Android maupun iOS.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Siapkan aplikasi seluler secara lokal -- lihat [B1 Mobile](../mobile/b1-mobile.md)
- Pasang dan konfigurasikan [EAS CLI](https://docs.expo.dev/eas/)
- Pastikan Anda memiliki akses ke Google Play Console (Android) dan/atau Apple App Store Connect (iOS)

</div>

## Membangun

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Mengirimkan ke Toko Aplikasi

### Android -- Google Play Store

Setelah build EAS berhasil, berkas Android (AAB) dikirimkan ke Google Play Store melalui Play Console.

### iOS -- Apple App Store

Kirimkan build iOS langsung melalui EAS:

```bash
eas submit --platform ios
```

## Pembaruan OTA

Untuk perubahan yang hanya menyangkut JavaScript dan tidak memerlukan tinjauan toko aplikasi, gunakan pembaruan over-the-air (OTA):

```bash
npm run update:production
```

Perintah ini menggunakan EAS Update untuk mendorong perubahan langsung ke pengguna tanpa pengiriman penuh ke toko aplikasi.

:::tip
Pembaruan OTA jauh lebih cepat dibandingkan build toko -- perubahan bisa sampai ke pengguna dalam hitungan menit, bukan hari. Gunakan untuk perbaikan bug, perubahan teks, dan penyesuaian antarmuka kecil yang tidak melibatkan perubahan kode native.
:::

## Nomor Versi

Sebelum membuat build untuk toko, nomor versi harus diperbarui di beberapa berkas sekaligus:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Jika lupa memperbarui nomor versi di semua berkas, build akan gagal atau aplikasi bisa ditolak oleh toko aplikasi. Periksa ulang setiap berkas di atas sebelum memulai build produksi.
:::

## Artikel Terkait

- **[B1 Mobile](../mobile/b1-mobile.md)** -- Panduan penyiapan lokal dan pengembangan
- **[Penerapan API](./apis.md)** -- Menerapkan layanan backend API
- **[Penerapan Aplikasi Web](./web-apps.md)** -- Menerapkan aplikasi web frontend
