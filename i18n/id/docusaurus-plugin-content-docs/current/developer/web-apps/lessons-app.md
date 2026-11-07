---
title: "LessonsApp"
description: "Siapkan editor pelajaran Next.js LessonsApp secara lokal di Node.js 22+, arahkan ke LessonsApi lokal, dan pahami build serta deployment S3/CloudFront-nya."
---

# LessonsApp

<div class="article-intro">

LessonsApp adalah aplikasi pengelolaan konten pelajaran untuk [Lessons.church](https://lessons.church). Aplikasi ini menyediakan antarmuka untuk membuat, mengatur, dan menerbitkan kurikulum pelajaran gereja, dibangun dengan Next.js dan React.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Pasang **Node.js 22+** dan **Git** -- lihat [Prasyarat](../setup/prerequisites.md)
- Konfigurasikan target API Anda (LessonsApi lokal) -- lihat [Variabel Lingkungan](../setup/environment-variables.md)

</div>

:::warning
LessonsApp memerlukan Node.js 22 atau yang lebih baru. Versi yang lebih lama tidak didukung.
:::

## Pengaturan

### 1. Kloning repositori

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Pasang dependensi

```bash
cd LessonsApp
npm install
```

### 3. Konfigurasikan variabel lingkungan

Salin file contoh lingkungan ke `.env` lalu konfigurasikan endpoint API:

```bash
cp dotenv.sample.txt .env
```

Perbarui URL endpoint API agar mengarah ke instans LessonsApi lokal Anda (`http://localhost:8090`). API Lessons staging sudah dihentikan, jadi ganti URL `api.staging.lessons.church` yang masih ada di file contoh.

### 4. Jalankan server pengembangan

```bash
npm run dev
```

Server pengembangan Next.js akan berjalan di [http://localhost:3501](http://localhost:3501).

## Perintah Utama

| Perintah | Deskripsi |
|---------|-------------|
| `npm run dev` | Menjalankan server pengembangan Next.js di port 3501 |
| `npm run build` | Build produksi melalui Next.js |

## Tumpukan Teknologi

- **Next.js 16** dengan TypeScript
- **React 19** untuk komponen UI
- Paket **`@churchapps/apphelper*`** untuk komponen bersama

:::info
LessonsApp berkomunikasi dengan backend **LessonsApi**, yang merupakan API terpisah dari ChurchApps Api utama. Pastikan lingkungan Anda dikonfigurasi dengan endpoint Lessons API yang benar.
:::

## Penerapan

Build produksi diterapkan ke **S3 + CloudFront**:

1. `npm run build` menghasilkan build Next.js yang sudah dioptimalkan
2. Output build disinkronkan ke bucket S3
3. Invalidasi CloudFront dipicu agar versi baru disajikan

:::tip
Untuk petunjuk penerapan yang lebih rinci, lihat panduan [Penerapan Aplikasi Web](../deployment/web-apps.md).
:::
