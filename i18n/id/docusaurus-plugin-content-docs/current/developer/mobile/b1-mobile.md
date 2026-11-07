---
title: "B1 Mobile"
description: "Atur dan jalankan aplikasi B1 Mobile (React Native/Expo) secara lokal, konfigurasi endpoint API, dan build untuk Android atau iOS. B1 Mobile sudah usang."
---

# B1 Mobile

<div class="article-intro">

B1 Mobile adalah aplikasi seluler utama untuk anggota ChurchApps, dibangun dengan React Native dan Expo. Aplikasi ini memungkinkan anggota gereja untuk melihat direktori, mengakses pemberian, mencatat kehadiran, menerima notifikasi, dan berinteraksi dengan komunitas gereja mereka.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Instal **Node.js** dan **Expo CLI** -- lihat [Prasyarat](../setup/prerequisites.md)
- Instal **Android Studio** (untuk emulator Android) atau **Xcode** (untuk simulator iOS)
- Konfigurasikan target API Anda (demo atau lokal) -- lihat [Variabel Lingkungan](../setup/environment-variables.md)

</div>

## Pengaturan

1. Kloning repositori:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Instal dependensi:

   ```bash
   cd B1Mobile && npm install
   ```

3. Konfigurasikan variabel lingkungan -- salin file contoh dan perbarui endpoint API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Jalankan server pengembangan Expo:

   ```bash
   npm start
   ```

:::tip
Anda dapat menggunakan aplikasi **Expo Go** di perangkat fisik untuk pengujian cepat tanpa perlu mengatur Android Studio atau Xcode.
:::

## Variabel Lingkungan

| Variabel | Deskripsi |
|----------|-------------|
| `STAGE` | Tahap lingkungan (misalnya, `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL root untuk pengiriman konten |
| `MEMBERSHIP_API` | Endpoint API keanggotaan |
| `MESSAGING_API` | Endpoint API pesan |
| `ATTENDANCE_API` | Endpoint API kehadiran |
| `GIVING_API` | Endpoint API pemberian |
| `DOING_API` | Endpoint API doing |
| `CONTENT_API` | Endpoint API konten |
| `LESSONS_ROOT` | URL root untuk konten pelajaran |

## Perintah Utama

| Perintah | Deskripsi |
|---------|-------------|
| `npm start` | Jalankan server pengembangan Expo |
| `npm run android` | Jalankan di emulator Android |
| `npm run ios` | Jalankan di simulator iOS |
| `npm run test` | Jalankan pengujian (Jest) |

## Build Produksi

Sebelum membuat build produksi, perbarui nomor versi di semua file berikut:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Perintah ini menggunakan EAS Build untuk membuat binary Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Pembaruan OTA

Untuk mengirim pembaruan over-the-air (tanpa melalui tinjauan toko aplikasi):

```bash
npm run update:production
```

:::info
Pembaruan OTA ideal untuk perubahan khusus JavaScript. Jika Anda mengubah kode native atau dependensi, Anda harus mengirimkan build toko lengkap sebagai gantinya.
:::

## Artikel Terkait

- **[Deployment Seluler](../deployment/mobile.md)** -- Panduan lengkap untuk membangun, mengirimkan, dan men-deploy aplikasi seluler
- **[Variabel Lingkungan](../setup/environment-variables.md)** -- Referensi lengkap untuk konfigurasi lingkungan seluler
