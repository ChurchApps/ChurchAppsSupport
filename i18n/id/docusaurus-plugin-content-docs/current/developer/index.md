---
title: "Dokumentasi Pengembang"
description: "Panduan dokumentasi developer ChurchApps: pengaturan lokal, API dan aplikasi web, pustaka bersama, build mobile, dan deployment untuk proyek open-source."
---

# Dokumentasi Pengembang

<div class="article-intro">

ChurchApps adalah kumpulan sekitar 20 proyek open-source yang bersama-sama menyediakan platform manajemen gereja yang lengkap. Proyek-proyek ini mencakup API backend, aplikasi web, aplikasi seluler, aplikasi desktop, dan pustaka bersama -- semuanya ditulis dalam TypeScript. Bagian ini berisi semua yang Anda perlukan untuk menyiapkan lingkungan pengembangan lokal dan mulai berkontribusi.

</div>

## Arsitektur Sekilas

Proyek-proyek ini adalah **repositori independen** (bukan monorepo). Kode bersama dipublikasikan ke npm di bawah lingkup `@churchapps/*` dan digunakan sebagai dependensi biasa. Artinya, Anda dapat mengerjakan satu proyek tanpa perlu mengkloning seluruh ekosistem.

Karakteristik utama:

- **Bahasa pemrograman:** TypeScript di seluruh proyek
- **Backend:** API Node.js / Express yang diterapkan ke AWS Lambda melalui Serverless Framework
- **Web:** React 19 (Vite dan Next.js), Material-UI 7
- **Seluler:** React Native dengan Expo
- **Basis data:** MySQL 8.0, satu basis data untuk setiap modul API

## Isi Bagian Ini

- **[Penyiapan](./setup/index.md)** -- Lingkungan pengembangan lokal, prasyarat, dan konfigurasi
  - [Prasyarat](./setup/prerequisites.md) -- Alat dan perangkat lunak yang diperlukan
  - [Ikhtisar Proyek](./setup/project-overview.md) -- Semua proyek sekilas
  - [Variabel Lingkungan](./setup/environment-variables.md) -- Mengonfigurasi file `.env`
- **[API](./api/index.md)** -- Penyiapan API inti secara lokal, inisialisasi basis data, dan struktur modul
- **[Aplikasi Web](./web-apps/index.md)** -- Menjalankan B1Admin, B1App, dan LessonsApp secara lokal
- **[Aplikasi Seluler](./mobile/index.md)** -- Membangun B1Mobile dan aplikasi Expo lainnya
- **[Pustaka Bersama](./shared-libraries/index.md)** -- Bekerja dengan Helpers, ApiHelper, dan AppHelper
- **[Penerapan](./deployment/index.md)** -- Menerapkan API, aplikasi web, dan aplikasi seluler
- **[Penyedia Konten FreePlay](./freeplay-content-provider.md)** -- Mengintegrasikan pustaka pelajaran Anda dengan FreePlay

## Komunitas dan Sumber Daya

| Sumber Daya | Tautan |
|----------|------|
| Organisasi GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Pelacak Isu | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Komunitas Slack | [Bergabung dengan Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
Cara tercepat untuk mulai berkontribusi adalah memilih satu aplikasi web (seperti B1Admin), mengarahkannya ke **API demo** bersama, lalu mulai membuat perubahan frontend. Tidak diperlukan basis data atau penyiapan API.
:::
