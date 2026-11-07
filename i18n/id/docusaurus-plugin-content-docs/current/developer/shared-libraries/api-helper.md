---
title: "ApiHelper"
description: "Referensi paket @churchapps/apihelper untuk API Express ChurchApps di workspace Packages: build lokal, uji dengan portal Yarn, dan publikasi changeset."
---

# ApiHelper

<div class="article-intro">

Paket `@churchapps/apihelper` menyediakan utilitas sisi server untuk semua API Express.js ChurchApps. Paket ini mencakup kelas controller dasar, autentikasi JWT, utilitas database, dan integrasi AWS yang dibutuhkan oleh setiap proyek API.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Instal **Node.js** dan **Git** -- lihat [Prasyarat](../setup/prerequisites.md)
- Pelajari pengaturan dan alur rilis [workspace Packages](./index.md)
- Paket ini bergantung pada [`@churchapps/helpers`](./helpers.md) (sebagai peer dependency) dan mengekspornya kembali

</div>

## Yang Termasuk

- **CustomBaseController** -- kelas dasar untuk controller API, dibangun di atas `inversify-express-utils`
- **Auth** -- autentikasi JWT melalui `CustomAuthProvider`, `AuthenticatedUser`, dan `Principal`
- **Utilitas database** -- `DB.query` / `DB.queryOne` dan kelas `Pool` untuk pengelolaan koneksi MySQL, serta `MySqlHelper` dan `DBCreator` untuk pengaturan skema
- **Integrasi AWS** -- `AwsHelper` untuk penyimpanan file S3 dan pembacaan SSM Parameter Store
- **Email** -- `EmailHelper` yang mendukung transport SES dan SMTP
- **Pemuatan konfigurasi** -- `EnvironmentBase` membaca string koneksi dan rahasia dari variabel lingkungan atau Parameter Store
- **Lain-lain** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Pengaturan untuk Pengembangan Lokal

Paket ini berada di [workspace Packages](https://github.com/ChurchApps/Packages) bersama pustaka bersama lainnya:

1. Clone workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instal dependensi di root workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Build (mengompilasi TypeScript ke `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Atau jalankan `yarn build` di root untuk membangun semua paket sesuai urutan dependensinya.

Untuk menguji perubahan di dalam API yang menggunakannya, gunakan Yarn portal sementara -- lihat [Pengembangan Lokal Melalui Aplikasi yang Menggunakannya](./index.md#local-development-against-a-consuming-app).

## Publikasi

Rilis dilakukan melalui changesets: jalankan `yarn changeset` di root workspace untuk setiap perubahan, lalu `yarn publish-all` saat siap dirilis. Lihat [Ikhtisar Pustaka Bersama](./index.md#releasing-with-changesets) untuk alur lengkapnya.

:::info
Paket ini adalah dependensi dari setiap API ChurchApps -- Api inti, AskApi, dan LessonsApi. Saat membuat perubahan, uji terhadap API secara lokal sebelum mempublikasikannya.
:::

## Artikel Terkait

- **[Helpers](./helpers.md)** -- Paket utilitas dasar yang menjadi dependensi paket ini
- **[Struktur Modul](../api/module-structure.md)** -- Cara controller dan middleware autentikasi digunakan dalam modul API
- **[Pengaturan API Lokal](../api/local-setup.md)** -- Menyiapkan API untuk pengembangan lokal
