---
title: "Deployment API"
description: "Deploy API ChurchApps ke AWS Lambda dengan Serverless, mencakup build, alur kerja demo dan produksi, migrasi basis data, dan konfigurasi SSM."
---

# Deployment API

<div class="article-intro">

API ChurchApps di-deploy sebagai fungsi AWS Lambda menggunakan Serverless Framework. Halaman ini membahas alur kerja build, deploy, dan konfigurasi untuk lingkungan demo dan produksi.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Siapkan API secara lokal -- lihat [Penyiapan API Lokal](../api/local-setup.md)
- Konfigurasikan kredensial AWS di mesin Anda
- Pastikan Anda memiliki akses ke akun AWS tujuan

</div>

## Build

API dibangun untuk produksi menggunakan konfigurasi TypeScript khusus:

```bash
npm run build:prod
```

Perintah ini menggunakan `tsconfig.prod.json` untuk mengompilasi proyek untuk runtime Lambda.

## Deploy

Deploy ke lingkungan demo:

```bash
npm run deploy-demo
```

Deploy ke produksi:

```bash
npm run deploy-prod
```

Dalam praktiknya, API di-deploy oleh GitHub Actions: **Deploy Demo** berjalan setiap kali ada push ke `main`, dan **Deploy Prod** dijalankan secara manual (workflow dispatch). Saat ini tidak ada lagi lingkungan staging.

## Migrasi Database

**Deploy Prod** menerapkan migrasi database yang tertunda sebagai bagian dari proses deploy. Database produksi hanya menerima koneksi dari dalam VPC, sehingga segera setelah `serverless deploy`, workflow memanggil Lambda `migrate` (`api-Prod-migrate`), yang menjalankan semua migrasi tertunda dari setiap modul dan mengembalikan `{ ok, environment, modules }`. Jika ada modul yang gagal atau ditolak (misalnya database tanpa riwayat migrasi), job akan gagal sehingga skema tidak pernah tertinggal di belakang kode. **Rollback Prod** hanya mengembalikan kode Lambda; migrasi tetap diterapkan, jadi pastikan migrasi bersifat aditif. Lihat [Server Admin -- Migrasi Database](../server-admin.md#database-migrations) untuk memeriksa status atau menjalankan migrasi secara manual.

## Apa yang Dibuat

Setiap deployment API membuat atau memperbarui fungsi AWS Lambda berikut:

| Fungsi | Tujuan |
|----------|---------|
| `web` | Penangan permintaan HTTP melalui API Gateway |
| `socket` | Penangan koneksi WebSocket |
| `timer15Min` | Tugas terjadwal yang berjalan setiap 30 menit (nama ini bersifat historis) |
| `timerMidnight` | Tugas terjadwal yang berjalan setiap hari pada tengah malam |
| `migrate` | Menerapkan migrasi database yang tertunda; dipanggil oleh workflow Deploy Prod |

## Konfigurasi Lingkungan

Di lingkungan yang sudah di-deploy, konfigurasi dibaca dari **AWS SSM Parameter Store**, bukan dari file `.env`. Cara ini menjaga rahasia tetap berada di luar paket deployment dan memungkinkan perubahan konfigurasi tanpa deploy ulang.

:::warning
Jangan pernah melakukan commit kredensial produksi ke repositori. Semua konfigurasi sensitif harus disimpan di AWS SSM Parameter Store dan diakses saat runtime.
:::

:::tip
Setiap merge ke `main` akan di-deploy ke lingkungan demo terlebih dahulu. Periksa perubahan Anda di sana (misalnya di [demo.b1.church](https://demo.b1.church)) sebelum menjalankan Deploy Prod.
:::

## Artikel Terkait

- **[Penyiapan API Lokal](../api/local-setup.md)** -- Menyiapkan API untuk pengembangan
- **[Struktur Modul](../api/module-structure.md)** -- Memahami arsitektur fungsi Lambda
- **[Deployment Aplikasi Web](./web-apps.md)** -- Men-deploy aplikasi frontend
