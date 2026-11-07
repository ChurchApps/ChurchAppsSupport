---
title: "Pengaturan API Lokal"
---

# Pengaturan API Lokal

<div class="article-intro">

Panduan ini memandu Anda menyiapkan API ChurchApps untuk pengembangan lokal. Anda akan mengkloning repositori, mengonfigurasi koneksi database, menginisialisasi skema, dan menjalankan server pengembangan dengan hot reload.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Instal **Node.js 24+**, **Git**, dan **MySQL 8.0+** -- lihat [Prasyarat](../setup/prerequisites)
- Buat pengguna MySQL dengan hak istimewa untuk membuat database
- Tinjau referensi [Variabel Lingkungan](../setup/environment-variables) untuk konfigurasi API

</div>

## Langkah demi Langkah

### 1. Kloning repositori

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instal dependensi

Proyek ini menggunakan Yarn (sebuah penjaga akan memblokir `npm install`):

```bash
cd Api
yarn install
```

### 3. Konfigurasi variabel lingkungan

```bash
cp .env.sample .env
```

Buka `.env` dan konfigurasikan string koneksi MySQL Anda. Setiap modul memerlukan koneksi database sendiri dengan format berikut:

```
mysql://root:password@localhost:3306/dbname
```

Anda memerlukan string koneksi untuk keenam database modul (membership, attendance, content, giving, messaging, doing).

### 4. Inisialisasi database

```bash
npm run initdb
```

Perintah ini membuat keenam database beserta tabel-tabelnya secara otomatis.

:::tip
Anda dapat menginisialisasi database satu modul saja dengan `npm run initdb -- --module=membership` (atau `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Jalankan server pengembangan

```bash
npm run dev
```

API akan dimulai dengan hot reload di [http://localhost:8084](http://localhost:8084).

## Perintah Utama

| Perintah | Deskripsi |
|---------|-------------|
| `npm run dev` | Jalankan server pengembangan dengan hot reload (tsx watch) |
| `npm run build` | Bersihkan, kompilasi TypeScript, dan salin aset |
| `npm run test` | Jalankan pengujian dengan Jest (termasuk cakupan) |
| `npm run test:watch` | Jalankan pengujian dalam mode watch |
| `npm run lint` | Jalankan ESLint dengan perbaikan otomatis (ESLint adalah satu-satunya pemformat) |

## Deployment

Lingkungan staging sudah dihentikan. API di-deploy ke lingkungan demo pada setiap push ke `main`, dan ke produksi melalui alur kerja **Deploy Prod** secara manual, yang juga menerapkan migrasi database yang tertunda. Lihat [Deployment API](../deployment/apis) untuk detailnya.

## Pengembangan Pustaka Lokal

Jika Anda perlu mengembangkan pustaka bersama (`@churchapps/helpers` atau `@churchapps/apihelper`) bersama API, bangun pustaka tersebut di ruang kerja [Packages](https://github.com/ChurchApps/Packages) dan tambahkan portal Yarn sementara di API:

```bash
# Di ruang kerja Packages
yarn build

# Di direktori API
yarn link ../Packages/helpers
# ... uji ...
yarn unlink ../Packages/helpers && yarn install
```

Cara ini memungkinkan Anda menguji perubahan pustaka terhadap API tanpa mempublikasikannya ke npm. Lihat [Pustaka Bersama](../shared-libraries/#local-development-against-a-consuming-app) untuk detailnya -- dan jangan pernah melakukan commit pada resolusi portal yang ditulis oleh tautan ke dalam `package.json`.

## Artikel Terkait

- **[Database](./database)** -- Memahami arsitektur database-per-modul
- **[Struktur Modul](./module-structure)** -- Cara controller, repository, dan model diatur
- **[Pustaka Bersama](../shared-libraries/)** -- Bekerja dengan `@churchapps/helpers` dan `@churchapps/apihelper`
