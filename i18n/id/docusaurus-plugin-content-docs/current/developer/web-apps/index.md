---
title: "Aplikasi Web"
description: "Ikhtisar tiga aplikasi web ChurchApps (B1 Admin, B1.church, Lessons.church), stack React dan MUI bersama, paket apphelper, dan tooling build."
---

# Aplikasi Web

<div class="article-intro">

ChurchApps mencakup tiga aplikasi web, masing-masing melayani audiens dan tujuan yang berbeda. Ketiganya berbagi fondasi teknologi yang sama, yaitu React 19, TypeScript, dan Material-UI 7, tetapi berbeda dalam alat build dan target deployment.

</div>

## Sekilas Pandang Aplikasi

| Aplikasi | Tujuan | Framework | Port Pengembangan |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Dasbor administrasi gereja | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Aplikasi anggota gereja untuk publik | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Pengelolaan konten pelajaran | Next.js 16 + React 19 | 3501 |

## Tumpukan Teknologi Bersama

Ketiga aplikasi web dibangun dengan:

- **TypeScript** -- Keamanan tipe menyeluruh (end-to-end)
- **React 19** -- Pustaka komponen UI
- **Material-UI 7** -- Sistem desain dan kumpulan komponen
- **React Query 5** -- Pengelolaan state server

## Komponen Bersama

Aplikasi-aplikasi ini berbagi komponen UI dan utilitas melalui keluarga paket `@churchapps/apphelper*`:

| Paket | Tujuan |
|---------|---------|
| `@churchapps/apphelper` | Komponen React bersama inti |
| `@churchapps/apphelper-login` | Komponen UI autentikasi |
| `@churchapps/apphelper-donations` | Formulir donasi dan pemberian |
| `@churchapps/apphelper-forms` | Komponen pembuat formulir |
| `@churchapps/apphelper-markdown` | Render Markdown |
| `@churchapps/apphelper-website` | Komponen situs web/CMS |

:::tip
Untuk detail tentang pengembangan paket bersama ini secara lokal, lihat dokumentasi [AppHelper](../shared-libraries/app-helper.md).
:::

## Skrip Postinstall

Setiap aplikasi web memiliki skrip `postinstall` yang menyalin file locale dan aset CSS dari `@churchapps/apphelper` ke dalam proyek. Skrip ini berjalan otomatis setelah `npm install`.

:::info
Jika komponen tampak tanpa gaya setelah memasang dependensi, skrip `postinstall` mungkin tidak berjalan dengan benar. Anda dapat menjalankannya secara manual dengan `npm run postinstall`.
:::

## Alat Build

Aplikasi menggunakan dua alat build yang berbeda:

- **B1Admin** menggunakan **Vite** -- bundler modern yang cepat, ideal untuk aplikasi satu halaman (single-page application)
- **B1App** dan **LessonsApp** menggunakan **Next.js** -- menyediakan server-side rendering, routing berbasis file, dan build produksi yang dioptimalkan
