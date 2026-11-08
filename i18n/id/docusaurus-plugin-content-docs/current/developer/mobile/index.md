---
title: "Aplikasi Seluler"
description: "Ikhtisar aplikasi seluler Expo dan React Native milik ChurchApps, B1 Checkin dan LessonsScreen, serta langkah-langkah pengaturan lokal untuk toolchain Expo yang digunakan bersama."
---

# Aplikasi Seluler

<div class="article-intro">

Aplikasi seluler ChurchApps dibangun dengan **React Native** dan **Expo**, sehingga memberikan pengalaman native di Android, iOS, dan Android TV. Semua aplikasi seluler berbagi toolchain berbasis Expo yang sama, jadi jika Anda sudah bisa membangun salah satunya, Anda bisa membangun semuanya.

</div>

## Aplikasi

| Aplikasi | Tujuan | Platform |
|-----|---------|----------|
| B1 Checkin | Aplikasi kiosk untuk stasiun check-in | Android, iOS |
| LessonsScreen | Aplikasi Android TV untuk menampilkan pelajaran di ruang kelas | Android TV |

:::info
Aplikasi yang digunakan anggota adalah B1 App -- bagian `/mobile` dari B1App, yang dipasang anggota sebagai Progressive Web App. Ini adalah aplikasi web, bukan proyek Expo; lihat [Aplikasi Web](../web-apps/index.md) untuk menjalankannya secara lokal.
:::

### B1 Checkin

Aplikasi kiosk yang dirancang khusus untuk stasiun check-in di gereja. Aplikasi ini menyediakan antarmuka sederhana yang ramah sentuhan bagi anggota untuk melakukan check-in anak-anak dan mencatat kehadiran pada ibadah dan acara.

### LessonsScreen

Aplikasi Android TV yang menampilkan konten pelajaran di ruang kelas. Guru dapat mengirim slide pelajaran, video, dan aktivitas ke layar TV, sehingga memudahkan penyajian materi kurikulum selama kelas berlangsung.

## Pengaturan Lokal

Semua aplikasi seluler berbagi toolchain berbasis Expo yang sama dan mengikuti pola pengaturan yang serupa. Dengan B1 Checkin sebagai contoh:

1. Instal **Node.js**, Android Studio (untuk emulator Android), dan Xcode (untuk simulator iOS, hanya di macOS) -- lihat [Prasyarat](../setup/prerequisites.md).
2. Clone repositori dan instal dependensi (B1 Checkin menggunakan Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Salin `dotenv.sample.txt` ke `.env` dan atur stage yang akan dihubungkan aplikasi (`dev` untuk API lokal) -- lihat [Variabel Lingkungan](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Jalankan server pengembangan Expo dengan `yarn start`, lalu jalankan `yarn android` atau `yarn ios` untuk membuka aplikasi di emulator atau perangkat.

Lihat [Deployment Seluler](../deployment/mobile.md) untuk build rilis dan pembaruan over-the-air.
