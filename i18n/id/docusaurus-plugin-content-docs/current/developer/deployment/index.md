---
title: "Deployment"
description: "Temukan tempat tiap proyek ChurchApps di-deploy: API AWS Lambda, aplikasi web S3, build Expo seluler, dan B1 Admin self-hosted di Railway atau Docker."
---

# Deployment

<div class="article-intro">

ChurchApps menggunakan strategi deployment yang berbeda-beda tergantung jenis proyeknya. API di-deploy ke AWS Lambda, aplikasi web di-deploy sebagai situs statis ke S3 dengan CloudFront, dan aplikasi seluler dibangun serta didistribusikan melalui Expo EAS dan toko aplikasi.

</div>

## Deployment Berdasarkan Jenis Proyek

| Jenis Proyek | Target Deployment | Perangkat Pendukung |
|-------------|-------------------|---------------------|
| [API](./apis.md) | AWS Lambda | Serverless Framework v3 (runtime Node.js 24.x) |
| [Aplikasi Web](./web-apps.md) | S3 + CloudFront | Build statis, sinkronisasi S3, invalidasi CloudFront |
| [Aplikasi Seluler](./mobile.md) | Toko Aplikasi | Expo EAS Build + OTA Updates |
| [Self-Hosting (Railway)](./railway-template.md) | Railway | Template satu klik: MySQL + Api + B1Admin + B1App |
| [Self-Hosting (Docker)](./docker.md) | Host Docker mana pun | Installer satu baris; image GHCR yang sudah dibangun + Caddy, `./deploy/b1` untuk upgrade/backup/rollback |
| [Proxy Domain Kustom Caddy](./caddy-proxy.md) | Windows EC2 (Elastic IP `3.23.251.61`) | Caddyfile statis + layanan WinSW + sinkronisasi peta terjadwal |
| FreeShow | Unduhan langsung | Electron Builder (binary lintas platform) |

## Lingkungan

| Lingkungan | Tujuan |
|-------------|---------|
| `dev` | Pengembangan lokal |
| `demo` | Instance demo publik; di-deploy setiap kali ada push ke `main`, sehingga juga berfungsi sebagai pengujian pra-produksi |
| `prod` | Produksi |

:::info
Setiap lingkungan memiliki kumpulan endpoint API, database, dan konfigurasinya sendiri. Pengaturan spesifik lingkungan dikelola melalui file `.env` di lokal dan AWS SSM Parameter Store di lingkungan yang di-deploy.
:::
