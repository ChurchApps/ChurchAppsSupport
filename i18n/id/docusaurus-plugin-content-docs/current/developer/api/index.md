---
title: "API"
description: "Jelaskan desain monolit modular API ChurchApps, enam modul data, teknologi, port, dan fungsi Lambda, dengan tautan ke panduan pengaturan dan endpoint."
---

# API

<div class="article-intro">

API ChurchApps adalah **monolit modular** -- satu basis kode yang melayani enam modul data, masing-masing dengan database sendiri. Arsitektur ini memberikan manfaat organisasi dari microservices (batas yang jelas, penyimpanan data yang independen) dengan kesederhanaan operasional dari satu penerapan tunggal.

</div>

## Modul

| Modul | Tujuan |
|--------|---------|
| **Membership** | Orang, grup, rumah tangga, izin |
| **Attendance** | Layanan, sesi, catatan check-in |
| **Content** | Halaman, bagian, elemen, streaming |
| **Giving** | Donasi, dana, pemrosesan pembayaran |
| **Messaging** | Percakapan, notifikasi, email |
| **Doing** | Tugas, rencana, penugasan |

## Tumpukan Teknologi

- **Runtime:** Node.js 24.x dengan TypeScript (modul ES)
- **Framework:** Express
- **Injeksi Dependensi:** Inversify (perutean berbasis dekorator)
- **Database:** MySQL -- satu database per modul, masing-masing dengan connection pool sendiri
- **Autentikasi:** Autentikasi berbasis JWT melalui `CustomAuthProvider`
- **Penerapan:** AWS Lambda dengan Serverless Framework v3

## Port

| Protokol | Port | Deskripsi |
|----------|------|-----------|
| HTTP | `8084` | REST API utama |
| WebSocket | `8087` | Koneksi socket real-time |

## Fungsi Lambda

Saat diterapkan ke AWS, API berjalan sebagai enam fungsi Lambda:

- **`web`** -- Menangani semua permintaan HTTP
- **`socket`** -- Mengelola koneksi WebSocket
- **`timer15Min`** -- Berjalan setiap 30 menit untuk notifikasi email (nama ini bersifat historis)
- **`timerMidnight`** -- Berjalan setiap hari untuk email ringkasan dan tugas pemeliharaan
- **`timerScheduledTasks`** -- Berjalan setiap hari untuk otomasi yang sudah jatuh tempo dan pemrosesan alur kerja yang terlambat
- **`timerWebhooks`** -- Berjalan setiap menit untuk mengirimkan webhook keluar yang antre

## Pustaka Bersama

API bergantung pada dua pustaka bersama ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)** -- Utilitas dasar (DateHelper, ApiHelper, dll.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)** -- Utilitas server Express, termasuk autentikasi, helper database, dan integrasi AWS

:::info
API menggunakan modul ES (`"type": "module"` di `package.json`). Pastikan impor Anda menggunakan sintaks modul ES.
:::

## Dalam Bagian Ini

- **[Pengaturan Lokal](./local-setup.md)** -- Kloning, konfigurasi, dan jalankan API secara lokal
- **[Database](./database.md)** -- Arsitektur database per modul, skrip skema, dan pola akses data
- **[Struktur Modul](./module-structure.md)** -- Controller, repository, model, dan autentikasi
- **[Kunci API](./api-keys.md)** -- Token akses pribadi untuk skrip dan konektor
- **[Aplikasi Terhubung (OAuth)](./connected-apps.md)** -- Alur OAuth multi-tenant untuk aplikasi pihak ketiga
- **[Webhook](./webhooks.md)** -- Mengirim notifikasi peristiwa ke sistem eksternal
- **[Server MCP](./mcp.md)** -- Endpoint Model Context Protocol yang mengekspos API ke asisten AI
- **[Referensi Endpoint](./endpoints/index.md)** -- Dokumentasi REST API lengkap untuk semua modul
