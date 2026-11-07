---
title: "Pustaka Bersama"
---

# Pustaka Bersama

<div class="article-intro">

Kode bersama ChurchApps dipublikasikan ke npm di bawah scope `@churchapps/*`. Semua paket bersama berada dalam satu repositori, yaitu [Packages](https://github.com/ChurchApps/Packages), yang dikelola sebagai workspace Yarn (Berry) dan diberi versi dengan [changesets](https://github.com/changesets/changesets).

</div>

## Paket

| Paket | Deskripsi | Digunakan Oleh |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Lapisan dasar: fungsi helper yang tidak bergantung pada framework dan antarmuka TypeScript bersama yang membentuk kontrak data lintas aplikasi | Semua proyek |
| [`@churchapps/apihelper`](./api-helper) | Utilitas Express sisi server: autentikasi, controller dasar, akses database, serta integrasi AWS dan email | Semua API |
| [`@churchapps/apphelper`](./app-helper) | Komponen React bersama dan modul fitur (login, donasi, formulir, markdown, website) | Semua aplikasi web |
| `@churchapps/content-providers` | Abstraksi atas penyedia konten pihak ketiga (Lessons.church, Planning Center, Dropbox, dan lainnya) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Toolkit untuk membangun integrasi B1.church: verifikasi webhook, klien REST bertipe, helper OAuth | Pengembang integrasi eksternal |
| `@churchapps/texting` | Abstraksi penyedia SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Arah dependensi selalu mengarah ke bawah: aplikasi bergantung pada `apihelper` dan `apphelper`, dan kedua paket tersebut mendeklarasikan `@churchapps/helpers` sebagai **peer dependency** agar setiap aplikasi hanya memakai satu salinan.

## Penyiapan Workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repositori ini menggunakan Yarn Berry (field `packageManager` di root adalah acuan utama) dengan satu lockfile. `yarn build` membangun setiap paket sesuai urutan dependensi; `yarn test` menjalankan semua pengujian paket.

## Merilis dengan Changesets

Setiap perubahan pada paket dikirim bersama sebuah changeset:

1. Jalankan `yarn changeset` di root workspace. Pilih paket yang Anda ubah, jenis kenaikan versi (patch = perbaikan, minor = ekspor atau fitur baru, major = perubahan yang merusak kompatibilitas), dan tulis ringkasan satu baris. Ringkasan ini akan menjadi entri CHANGELOG.
2. Commit file `.changeset/*.md` yang dihasilkan bersama perubahan kode Anda. Hook pre-commit akan memblokir commit yang mengubah kode sumber paket tanpa changeset yang sudah di-stage.
3. Saat siap menerbitkan, jalankan `yarn publish-all` di root. Perintah ini memproses changeset yang tertunda (menaikkan versi, menulis CHANGELOG, menyinkronkan rentang dependensi internal), membangun semuanya sesuai urutan dependensi, lalu menerbitkan paket yang versinya naik ke npm. Setelah itu, commit dan push kenaikan versinya.

:::warning
Jangan pernah menjalankan `npm publish` langsung di dalam satu paket. Cara itu melewati urutan build dan pencatatan versi yang ditangani skrip rilis. Penerbitan membutuhkan akun npm yang memiliki hak publikasi ke scope `@churchapps`.
:::

## Pengembangan Lokal Terhadap Aplikasi Pengguna

Di dalam workspace, paket dibangun langsung terhadap paket sejawatnya, sehingga tidak perlu melakukan linking. Untuk menguji hasil build paket yang belum diterbitkan di dalam aplikasi yang memakainya (B1Admin, B1App, dll.), tambahkan Yarn portal sementara di proyek konsumen:

```bash
# di dalam proyek konsumen
yarn link ../Packages/helpers
# ... uji ...
yarn unlink ../Packages/helpers && yarn install
```

Bangun paketnya terlebih dahulu (`yarn build` di root workspace), karena konsumen membaca output `dist/` yang sudah dikompilasi, bukan kode sumbernya.

:::warning
`yarn link` menulis resolusi portal ke `package.json` konsumen. Jangan pernah meng-commit-nya. Selalu jalankan `yarn unlink` dan instal ulang ketika selesai.
:::
