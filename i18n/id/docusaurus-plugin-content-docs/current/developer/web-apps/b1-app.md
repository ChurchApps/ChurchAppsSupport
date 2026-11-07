---
title: "B1App"
description: "Siapkan aplikasi web anggota B1App secara lokal dengan Next.js 22+, atur endpoint API di .env, dan jalankan dev server di port 3301."
---

# B1App

<div class="article-intro">

B1App adalah aplikasi anggota gereja untuk publik yang dibangun dengan Next.js. Aplikasi ini menyediakan pengalaman anggota, termasuk profil, direktori grup, siaran langsung, dan halaman donasi.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Instal **Node.js 22+** dan **Git** -- lihat [Prasyarat](../setup/prerequisites.md)
- Konfigurasikan target API Anda (demo atau lokal) -- lihat [Variabel Lingkungan](../setup/environment-variables.md)

</div>

:::warning
B1App memerlukan Node.js 22 atau yang lebih baru. Versi sebelumnya tidak didukung.
:::

## Pengaturan

### 1. Clone repositori

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Instal dependensi

```bash
cd B1App
npm install
```

### 3. Konfigurasikan variabel lingkungan

```bash
cp dotenv.sample.txt .env
```

Buka `.env` dan konfigurasikan URL endpoint `NEXT_PUBLIC_*_API`. URL ini dapat mengarah ke API demo bersama (`https://api.demo.churchapps.org`) atau instans API lokal Anda. File contoh mungkin masih mencantumkan URL staging yang sudah tidak digunakan; gantilah URL tersebut.

### 4. Jalankan dev server

```bash
npm run dev
```

Dev server Next.js akan berjalan di [http://localhost:3301](http://localhost:3301).

## Perintah Utama

| Perintah | Deskripsi |
|---------|-------------|
| `npm run dev` | Jalankan dev server Next.js di port 3301 |
| `npm run build` | Build produksi melalui Next.js |
| `npm run test` | Jalankan pengujian end-to-end dengan Playwright |
| `npm run lint` | Jalankan lint Next.js |

## Variabel Lingkungan Utama

| Variabel | Deskripsi |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | URL endpoint API untuk setiap modul |

:::info
Skrip `postinstall` menyalin file locale dan CSS dari `@churchapps/apphelper`. Jika komponen tampil tanpa gaya setelah instalasi, jalankan `npm run postinstall` secara manual.
:::

## Tech Stack

- **Next.js 16** dengan TypeScript
- **React 19** untuk komponen UI
- **Material-UI 7** untuk sistem desain
- **React Query 5** untuk state server
- **`@churchapps/apphelper*`** paket untuk komponen bersama

## Deployment

Build produksi di-deploy ke **S3 + CloudFront**:

1. `npm run build` menghasilkan build Next.js yang sudah dioptimalkan
2. Output build disinkronkan ke bucket S3
3. Invalidasi CloudFront dipicu agar versi baru disajikan

:::tip
Untuk instruksi deployment yang lebih rinci, lihat panduan [Deployment Web App](../deployment/web-apps.md).
:::
