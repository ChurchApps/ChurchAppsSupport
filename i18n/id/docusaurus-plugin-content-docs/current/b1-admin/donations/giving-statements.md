---
title: "Laporan Pemberian"
description: "Buat laporan pemberian akhir tahun untuk setiap donatur di B1 Admin, lalu unduh sebagai CSV atau cetak untuk dikirim dengan total yang dapat dikurangkan pajak."
---

# Laporan Pemberian

<div class="article-intro">

Setiap akhir tahun, donatur Anda memerlukan ringkasan pemberian yang dapat dikurangkan dari pajak untuk catatan mereka. B1 Admin memudahkan Anda membuat laporan ini untuk semua donatur sekaligus, sehingga menghemat waktu berjam-jam untuk pekerjaan manual.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Pastikan [dana](funds.md) Anda sudah ditandai dengan benar sebagai **Dapat Dikurangkan Pajak** -- hanya donasi untuk dana yang dapat dikurangkan pajak yang muncul pada laporan
- Pastikan semua donasi sudah [dicatat](recording-donations.md) dan semua transaksi online sudah [diimpor dari Stripe](stripe-import.md)

</div>

## Mengakses Laporan Pemberian

1. Di **B1 Admin**, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas) dan perluas **Donasi**.
2. Klik **Laporan Pemberian**. Halaman **Laporan Pemberian Batch** akan terbuka.

## Membuat Laporan

1. Di panel **Pilih Tahun**, pilih **Tahun** dari menu tarik-turun. Anda dapat memilih tahun berjalan atau salah satu dari lima tahun sebelumnya.
2. Halaman hanya memuat donasi yang tanggalnya berada dalam tahun tersebut (1 Januari hingga 31 Desember), sehingga halaman terbuka dengan cepat meskipun gereja Anda memiliki riwayat pemberian bertahun-tahun. Ketika Anda memilih tahun yang berbeda, ringkasan akan diperbarui dengan donasi tahun tersebut. Panel **Ringkasan** di bawah tahun menampilkan statistik untuk tahun itu, meliputi:
   - **Total Donatur** -- jumlah orang yang memberi
   - **Total Donasi** -- jumlah catatan donasi individual
   - **Total Jumlah** -- jumlah gabungan dari seluruh pemberian

## Mengunduh Laporan

Panel **Opsi Unduhan** memberi Anda dua pilihan untuk menyampaikan laporan kepada donatur:

### Unduh sebagai File CSV

Di bawah **File CSV Individual**, klik **Unduh ZIP** untuk mengunduh file ZIP yang berisi file CSV terpisah untuk setiap donatur. Ini berguna jika Anda ingin mengirim laporan satu per satu melalui email atau mengimpornya ke sistem lain.

### Cetak Semua Laporan

Di bawah **Laporan yang Dapat Dicetak**, klik **Cetak Semua** (tombol ini menampilkan jumlah laporan) untuk membuka tampilan siap cetak dari laporan setiap donatur untuk tahun yang dipilih di peramban Anda. Dari sana, gunakan fungsi cetak peramban untuk mengirimnya ke printer. Setiap laporan dimulai di halaman baru sehingga siap dilipat dan dikirim melalui pos, dan laporan disusun berdasarkan nama belakang donatur, lalu nama depan.

Jika Anda telah mengunggah **Logo untuk Latar Terang** di [Situs Web > Tampilan](../website/appearance.md), logo akan dicetak di tengah bagian atas setiap laporan, di atas judul laporan. Ini berlaku untuk **Cetak Semua** maupun untuk laporan satu donatur yang dicetak dari catatannya.

:::tip
Jalankan laporan Anda di awal Januari selagi catatan masih segar. Periksa ulang bahwa dana Anda sudah ditandai dengan benar sebagai dapat dikurangkan pajak sebelum membuat laporan -- hanya donasi untuk dana yang dapat dikurangkan pajak yang disertakan.
:::

:::info
Laporan pemberian hanya mencakup donasi untuk dana yang memiliki pengaturan **Dapat Dikurangkan Pajak** aktif. Jika sebuah dana tidak ditandai sebagai dapat dikurangkan pajak, donasinya tidak akan muncul pada laporan. Anda dapat mengelola pengaturan ini di halaman [Dana](funds.md).
:::

## Format Kwitansi untuk Kanada, Australia, dan Selandia Baru

Gereja di luar Amerika Serikat dapat mengubah laporan ke tata letak kwitansi resmi negara mereka. Klik **Format laporan** di bagian atas halaman Laporan Pemberian (atau buka **Pengaturan** dan buka bagian **Pemberian**), lalu atur **Format Laporan** ke **Kanada**, **Australia** atau **Selandia Baru**, kemudian isi kolom yang muncul: nomor registrasi Anda (nomor registrasi CRA, ABN, atau nomor registrasi amal Selandia Baru), alamat organisasi Anda, nama orang yang berwenang menandatangani kwitansi, dan untuk Kanada, kota tempat kwitansi diterbitkan.

Laporan kemudian memuat kalimat yang diharapkan oleh otoritas pajak Anda (untuk Kanada, "Kwitansi Resmi untuk Keperluan Pajak Penghasilan" dengan referensi CRA), nomor kwitansi dengan format `YEAR-DONORID`, jumlah yang memenuhi syarat yang hanya dihitung dari dana yang dapat dikurangkan pajak, serta baris terpisah untuk setiap pemberian ke dana yang tidak dapat dikurangkan pajak. Donatur melihat blok kwitansi yang sama ketika mereka mencetak laporan mereka sendiri dari B1.church.

## Apa yang Dilihat Anggota di B1.church

Bagian pengaturan **Pemberian** yang sama juga mengontrol apa yang dilihat anggota di halaman pemberian mereka sendiri di B1.church:

- **Riwayat Pemberian Anggota** menentukan tahun mana yang dapat dilihat anggota. **Semua tahun** adalah pengaturan bawaan. **Sampai 2025** (atau tahun lain) membatasi sampai tahun tersebut, sehingga anggota tidak dapat melihat atau mencetak tahun berikutnya hingga Anda mengizinkannya. Gunakan ini untuk menahan tahun berjalan selagi Anda menyelesaikan koreksi dan pengembalian dana. **Tersembunyi** menghapus sepenuhnya riwayat pemberian, total tahunan, dan pencetakan laporan. Anggota tetap dapat memberi.
- **Catatan Pemberian** adalah pesan singkat yang ditampilkan di halaman pemberian dan riwayat pemberian anggota, serta dicetak di bagian bawah setiap laporan pemberian, termasuk laporan yang Anda cetak di sini. Gunakan untuk hal-hal seperti kebijakan pengembalian dana Anda.

Pengaturan ini hanya mengubah apa yang dilihat anggota. Anda tetap dapat mencetak laporan tahun mana pun dari halaman ini.

## Langkah Selanjutnya

Jika Anda perlu meninjau detail donasi sebelum membuat laporan, kunjungi halaman [Laporan Donasi](donation-reports.md) atau periksa [batch](batches.md) satu per satu.
