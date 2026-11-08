---
title: "Panduan: Mengatur Donasi Online"
description: "Atur donasi online di B1 Admin dengan membuat dana donasi, menghubungkan Stripe, dan menambahkan halaman Donate ke situs web B1.church Anda untuk jemaat."
---

# Mengatur Donasi Online

<div class="article-intro">

Pelajari semua yang dibutuhkan untuk menerima donasi online di gereja Anda — mulai dari membuat dana donasi, menghubungkan Stripe untuk pemrosesan pembayaran, hingga membagikan halaman pemberian kepada jemaat. Setelah selesai, anggota dapat memberi secara online melalui situs web dan aplikasi seluler Anda.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun B1 Admin dengan akses admin — lihat [Peran & Izin](../people/roles-permissions.md)
- Akun Stripe (buat secara gratis di [stripe.com](https://stripe.com) jika belum punya)

</div>

## Langkah 1: Membuat Dana Donasi

Dana adalah kategori tempat donatur dapat memberi. Anda memerlukan setidaknya satu dana sebelum dapat menerima donasi.

Ikuti panduan [Dana](../donations/funds.md) untuk mengatur kategori pemberian Anda:

1. Buat dana yang paling umum digunakan (misalnya, "Dana Umum", "Dana Pembangunan", "Misi")
2. Tandai dana yang dapat dikurangkan pajaknya dengan tepat — ini memengaruhi laporan pemberian akhir tahun

:::tip
Anda dapat menambahkan dana lain kapan saja. Mulailah dengan kategori pemberian yang paling umum.
:::

## Langkah 2: Menghubungkan Stripe

Stripe menangani seluruh pemrosesan pembayaran. Anda akan menghubungkan akun Stripe ke B1 Admin agar donasi masuk ke rekening bank Anda.

Ikuti panduan [Pengaturan Donasi Online](../donations/online-giving-setup.md) untuk menghubungkan Stripe:

1. Masuk ke dasbor Stripe Anda dan ambil Kunci Publik (Publishable Key) dan Kunci Rahasia (Secret Key)
2. Di B1 Admin, buka Pengaturan dan masukkan kedua kunci tersebut

:::warning
Stripe hanya menampilkan Kunci Rahasia satu kali. Salin dan simpan sebelum meninggalkan dasbor Stripe. Jika kehilangannya, Anda harus membuat kunci baru.
:::

## Langkah 3: Menambahkan Halaman Pemberian ke Situs Web Anda

Buat pemberian mudah diakses dengan menambahkan halaman donasi ke situs web B1 Anda.

Ikuti panduan [Pengaturan Donasi Online](../donations/online-giving-setup.md) dan [Mengelola Halaman](../website/managing-pages.md) untuk:

1. Menambahkan tab "Donate" ke situs B1.church Anda
2. URL pemberian Anda akan berupa: `https://yoursubdomain.b1.church/donate`
3. Anggota dapat memberi tanpa masuk (halaman publik) atau masuk untuk menggunakan metode pembayaran tersimpan dan melihat riwayat donasi

## Langkah 4: Melakukan Donasi Uji Coba

Sebelum mengumumkan kepada jemaat, pastikan semuanya berfungsi.

1. Lakukan donasi uji coba dalam jumlah kecil untuk memastikan alurnya berjalan dari awal hingga akhir
2. Periksa apakah donasi tersebut muncul di B1 Admin pada bagian Donasi

:::tip
Gunakan mode uji (test mode) Stripe terlebih dahulu jika ingin memverifikasi tanpa transaksi sungguhan, lalu beralih ke mode live sebelum mengumumkan kepada jemaat.
:::

## Langkah 5: Mengumumkan kepada Jemaat

Sebarkan informasi agar anggota tahu bahwa mereka dapat memberi secara online.

1. Bagikan URL pemberian melalui situs web, buletin email, warta jemaat, dan media sosial
2. Anggota juga dapat memberi melalui [Aplikasi B1](../../b1-church/giving/index.md) — fitur pemberian sudah tersedia di dalamnya

:::info
Anggota yang masuk dapat menyimpan metode pembayaran, mengatur donasi berulang, dan melihat riwayat pemberian mereka. Pemberian anonim juga tersedia — tanpa perlu masuk.
:::

## Langkah 6: Pengelolaan Berkelanjutan

Jaga agar catatan donasi tetap mutakhir dan buat laporan sepanjang tahun.

1. [Impor transaksi Stripe](../donations/stripe-import.md) secara rutin (mingguan atau bulanan) agar catatan tetap mutakhir
2. [Lihat laporan donasi](../donations/donation-reports.md) untuk melacak tren dan total pemberian per dana
3. [Buat laporan pemberian akhir tahun](../donations/giving-statements.md) untuk catatan pajak donatur Anda

:::tip
Jalankan impor Stripe minimal sebulan sekali agar catatan Anda tetap mutakhir. Lihat [Panduan Laporan Akhir Tahun](./year-end-reports.md) untuk proses akhir tahun secara lengkap.
:::

## Selesai!

Gereja Anda kini menerima donasi online. Anggota dapat memberi melalui situs web Anda, Aplikasi B1, atau perangkat apa pun dengan peramban web. Semua donasi dicatat secara otomatis di B1 Admin.

## Artikel Terkait

- [Dana](../donations/funds.md) — membuat dan mengelola kategori donasi
- [Batch](../donations/batches.md) — mengelompokkan donasi ke dalam kelompok
- [Mencatat Donasi](../donations/recording-donations.md) — memasukkan donasi tunai dan cek secara manual
- [Impor Stripe](../donations/stripe-import.md) — menarik transaksi online ke B1 Admin
- [Laporan Donasi](../donations/donation-reports.md) — melihat tren dan total pemberian
- [Laporan Pemberian](../donations/giving-statements.md) — membuat laporan pajak akhir tahun
- [Memberi Donasi](../../b1-church/giving/making-donations.md) — pengalaman memberi bagi anggota di B1.church dan Aplikasi B1
