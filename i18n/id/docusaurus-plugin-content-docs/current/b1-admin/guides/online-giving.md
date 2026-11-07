---
title: "Panduan: Mengatur Donasi Online"
---

# Mengatur Donasi Online

<div class="article-intro">

Ikuti semua langkah yang diperlukan untuk menerima donasi online di gereja Anda, mulai dari membuat dana donasi, menghubungkan Stripe untuk pemrosesan pembayaran, hingga membagikan halaman pemberian kepada jemaat. Setelah selesai, anggota dapat memberi secara online melalui situs web dan aplikasi seluler Anda.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun B1 Admin dengan akses admin — lihat [Peran & Izin](../people/roles-permissions.md)
- Akun Stripe (buat secara gratis di [stripe.com](https://stripe.com) jika diperlukan)

</div>

## Langkah 1: Buat Dana Donasi

Dana adalah kategori tempat donatur dapat memberi. Anda memerlukan setidaknya satu dana sebelum dapat menerima donasi.

Ikuti panduan [Dana](../donations/funds.md) untuk menyiapkan kategori pemberian Anda:

1. Buat dana yang paling sering digunakan (misalnya, "Dana Umum", "Dana Pembangunan", "Misi")
2. Tandai dana yang dapat dikurangkan dari pajak dengan tepat — ini memengaruhi laporan pemberian akhir tahun

:::tip
Anda dapat menambahkan dana lain kapan saja. Mulailah dengan kategori pemberian yang paling sering digunakan.
:::

## Langkah 2: Hubungkan Stripe

Stripe menangani semua pemrosesan pembayaran. Anda akan menghubungkan akun Stripe Anda ke B1 Admin agar donasi masuk ke rekening bank Anda.

Ikuti panduan [Pengaturan Donasi Online](../donations/online-giving-setup.md) untuk menghubungkan Stripe:

1. Masuk ke dasbor Stripe Anda dan ambil Publishable Key dan Secret Key Anda
2. Di B1 Admin, buka Settings dan masukkan kedua kunci tersebut

:::warning
Stripe hanya menampilkan Secret Key Anda sekali. Salin dan simpan sebelum meninggalkan dasbor Stripe. Jika kehilangan kunci ini, Anda harus membuat kunci baru.
:::

## Langkah 3: Tambahkan Halaman Pemberian ke Situs Web Anda

Buat pemberian mudah diakses dengan menambahkan halaman donasi ke situs B1 Anda.

Ikuti panduan [Pengaturan Donasi Online](../donations/online-giving-setup.md) dan [Mengelola Halaman](../website/managing-pages.md) untuk:

1. Menambahkan tab "Donate" ke situs B1.church Anda
2. URL pemberian Anda akan berupa: `https://yoursubdomain.b1.church/donate`
3. Anggota dapat memberi tanpa masuk (halaman publik) atau masuk untuk menggunakan metode pembayaran yang tersimpan dan melihat riwayat donasi

## Langkah 4: Lakukan Uji Donasi

Sebelum mengumumkan kepada jemaat, pastikan semuanya berfungsi.

1. Lakukan uji donasi kecil untuk memastikan alur berfungsi dari awal hingga akhir
2. Periksa bahwa donasi tersebut muncul di B1 Admin pada bagian Donations

:::tip
Gunakan mode uji Stripe terlebih dahulu jika Anda ingin memverifikasi tanpa pengisian nyata, lalu beralih ke mode live sebelum mengumumkan kepada jemaat.
:::

## Langkah 5: Umumkan kepada Jemaat

Sebarkan informasinya agar anggota tahu bahwa mereka dapat memberi secara online.

1. Bagikan URL pemberian melalui situs web, buletin email, warta jemaat, dan media sosial
2. Anggota juga dapat memberi melalui [aplikasi B1 Mobile](../../b1-mobile/giving/) — fitur pemberian sudah tersedia di dalamnya

:::info
Anggota yang masuk dapat menyimpan metode pembayaran, mengatur donasi berulang, dan melihat riwayat pemberian mereka. Pemberian anonim juga tersedia — tidak perlu masuk.
:::

## Langkah 6: Pengelolaan Berkelanjutan

Jaga catatan donasi Anda tetap mutakhir dan buat laporan sepanjang tahun.

1. [Impor transaksi Stripe](../donations/stripe-import.md) secara berkala (mingguan atau bulanan) agar catatan Anda tetap mutakhir
2. [Lihat laporan donasi](../donations/donation-reports.md) untuk melacak tren dan total pemberian per dana
3. [Buat laporan pemberian akhir tahun](../donations/giving-statements.md) untuk catatan pajak donatur Anda

:::tip
Jalankan impor Stripe setidaknya sebulan sekali agar catatan Anda tetap mutakhir. Lihat [Panduan Laporan Akhir Tahun](./year-end-reports.md) untuk proses akhir tahun secara lengkap.
:::

## Selesai!

Gereja Anda kini menerima donasi online. Anggota dapat memberi melalui situs web Anda, aplikasi B1 Mobile, atau perangkat apa pun dengan peramban web. Semua donasi dicatat secara otomatis di B1 Admin.

## Artikel Terkait

- [Dana](../donations/funds.md) — membuat dan mengelola kategori donasi
- [Batch](../donations/batches.md) — mengatur donasi ke dalam kelompok
- [Mencatat Donasi](../donations/recording-donations.md) — memasukkan donasi tunai dan cek secara manual
- [Impor Stripe](../donations/stripe-import.md) — menarik transaksi online ke B1 Admin
- [Laporan Donasi](../donations/donation-reports.md) — melihat tren dan total pemberian
- [Laporan Pemberian](../donations/giving-statements.md) — membuat laporan pajak akhir tahun
- [Membuat Donasi (Web)](../../b1-church/giving/making-donations.md) — pengalaman memberi bagi anggota di web
- [Membuat Donasi (Seluler)](../../b1-mobile/giving/making-donations.md) — memberi dari aplikasi seluler
