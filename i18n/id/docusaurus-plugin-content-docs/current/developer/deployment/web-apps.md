---
title: "Web App Deployment"
description: "Cara deploy aplikasi web ChurchApps seperti B1 Admin ke Amazon S3 dan CloudFront, dengan deploy otomatis lewat GitHub Actions saat merge atau perintah manual."
---

# Web App Deployment

<div class="article-intro">

Aplikasi web ChurchApps di-deploy sebagai situs statis ke **Amazon S3** dengan **CloudFront** sebagai CDN. Deployment dijalankan otomatis melalui GitHub Actions, tetapi juga dapat dijalankan secara manual jika diperlukan.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Siapkan aplikasi web secara lokal dan pastikan aplikasi dapat dibangun -- lihat [Aplikasi Web](../web-apps/index.md)
- Konfigurasikan kredensial AWS dengan akses S3 dan CloudFront
- Ketahui nama bucket S3 tujuan dan ID distribusi CloudFront

</div>

## Langkah Deployment

1. **Bangun aplikasi** -- hasilkan output statis:

   ```bash
   npm run build
   ```

2. **Sinkronkan ke S3** -- unggah output build ke bucket S3:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Invalidasi CloudFront** -- hapus cache CDN agar pengguna menerima versi terbaru:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Deployment Otomatis

Workflow GitHub Actions menangani deployment secara otomatis saat ada push ke branch `main`. Workflow ini menjalankan ketiga langkah di atas -- build, sinkronisasi S3, dan invalidasi CloudFront -- tanpa intervensi manual.

:::info
Anda biasanya tidak perlu menjalankan perintah-perintah ini secara manual. Menggabungkan pull request ke `main` akan memicu pipeline deployment otomatis.
:::

:::tip
Jika Anda perlu memverifikasi build secara lokal sebelum deployment, jalankan `npm run build` dan periksa output di direktori `build/`. Anda dapat menyajikannya secara lokal dengan server file statis apa pun untuk memastikan semuanya berfungsi.
:::

## Artikel Terkait

- **[Aplikasi Web](../web-apps/index.md)** -- Panduan pengaturan untuk B1Admin, B1App, dan LessonsApp
- **[Deployment API](./apis.md)** -- Men-deploy API backend
- **[Deployment Mobile](./mobile.md)** -- Men-deploy aplikasi mobile ke toko aplikasi
