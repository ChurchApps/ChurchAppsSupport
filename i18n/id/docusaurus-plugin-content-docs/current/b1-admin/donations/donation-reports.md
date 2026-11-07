---
title: "Laporan Donasi"
description: "Tinjau total pemberian, donatur yang berhenti, dan rincian batch di B1 Admin lewat dasbor Ringkasan Donasi, tampilan Donatur Tidak Aktif, serta ekspor CSV."
---

# Laporan Donasi

<div class="article-intro">

B1 Admin menyediakan beberapa cara untuk melihat dan menganalisis data pemberian gereja Anda. Dasbor pemberian pada halaman **Ringkasan** Donasi menampilkan gambaran visual dengan grafik dan filter, sedangkan bagian Laporan menawarkan laporan Ringkasan Donasi yang lebih rinci. Gunakan alat-alat ini untuk melacak tren pemberian, mempersiapkan rapat dewan, atau merekonsiliasi catatan Anda.

</div>

<div class="prereqs">
<h4>Sebelum Anda Memulai</h4>

- Pastikan donasi sudah [dicatat dalam batch](recording-donations.md) atau [diimpor dari Stripe](stripe-import.md)
- Pastikan [dana](funds.md) Anda sudah diatur dengan benar agar donasi terkategori dengan tepat

</div>

## Dasbor Pemberian

Dasbor pemberian adalah tampilan **Dasbor** pada halaman **Ringkasan**, yaitu halaman pertama yang Anda lihat saat membuka bagian **Donasi**.

1. Buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (kolom pencarian di kiri atas B1 Admin), perluas **Donasi**, lalu klik **Ringkasan**. Halaman **Ringkasan** akan terbuka di tampilan **Dasbor**. Tombol **Tampilan** di kanan atas berfungsi untuk beralih antara **Dasbor** dan **Donatur Tidak Aktif**.
2. Gunakan tombol **Mingguan**, **Bulanan**, dan **Kuartalan** di atas laporan untuk memilih cara pemberian dikelompokkan.
3. Di panel **Filter Laporan**, atur **Tanggal Mulai** dan **Tanggal Akhir** (secara default, setahun terakhir hingga kemarin), lalu opsional pilih **Dana**, kemudian klik **Jalankan Laporan**. Laporan otomatis berjalan dengan pengaturan default saat halaman dibuka.
4. Empat **kartu KPI** menampilkan metrik pemberian Anda untuk rentang yang dipilih:
   - **Total Pemberian** -- Jumlah total yang didonasikan.
   - **Rata-rata Pemberian** -- Rata-rata jumlah donasi.
   - **Donatur Unik** -- Jumlah orang yang berbeda yang memberi.
   - **Total Donasi** -- Jumlah total donasi perorangan.
5. Di bawah KPI, grafik batang menampilkan pemberian per minggu, bulan, atau kuartal, dikelompokkan menurut dana.
6. Klik **Opsi Unduh** dan pilih **Ringkasan** untuk mengekspor CSV berisi total menurut periode dan dana, atau klik ikon cetak untuk mencetak laporan. Logo gereja Anda (**Logo Latar Terang** dari [Website > Tampilan](../website/appearance.md), jika Anda sudah mengunggahnya) dan nama akan muncul di tengah atas laporan cetak. Hasil cetakan menggunakan teks gelap dan grafik terang, meskipun Anda menggunakan B1 Admin dalam mode gelap.

Jika donasi dalam periode tersebut diberikan dalam lebih dari satu mata uang, total KPI akan dikonversi ke mata uang gereja Anda dan catatan **Dikonversi menggunakan kurs saat ini** akan muncul di bawah kartu. Lihat [Dukungan Multi-Mata Uang](./multi-currency.md#converted-totals) untuk detailnya.

:::info
Dasbor menampilkan data pemberian yang sudah digabungkan. Dasbor tidak menyertakan nama donatur perorangan. Untuk detail per donatur, gunakan halaman [Batch](batches.md).
:::

## Donatur Tidak Aktif

Pilih **Donatur Tidak Aktif** pada tombol **Tampilan** untuk menampilkan daftar orang yang memberi pada satu periode tetapi tidak memberi lagi sejak itu. Secara default, laporan ini membandingkan tahun kalender lalu dengan tahun berjalan hingga saat ini; ubah salah satu rentang tanggal untuk memperluas atau mempersempit pencarian. Setiap baris menampilkan orang tersebut, tanggal pemberian terakhirnya, dan totalnya pada periode sebelumnya. **Opsi Unduh > Ringkasan** mengunduh daftar ini sebagai CSV untuk daftar surat atau panggilan tindak lanjut.

## Melihat Detail per Donatur

Untuk melihat rincian siapa yang memberi, berapa jumlahnya, dan ke dana mana:

1. Buka **Donasi > Batch**.
2. Klik **nama batch** untuk membukanya.
3. Halaman detail batch mencantumkan setiap donasi beserta metodenya (dan nomor cek atau empat digit kartu), nama donatur, tanggal, catatan, dan jumlahnya, dengan total di bagian bawah.
4. Klik **Edit** pada baris donasi untuk membuka detail lengkap donasi perorangan tersebut, termasuk danya.
5. Klik **Ekspor** di atas daftar untuk mengunduh CSV yang berisi semua informasi donatur dan donasi untuk batch tersebut.

## Laporan Ringkasan Donasi

Pelaporan donasi sudah terintegrasi langsung di bagian Donasi. Halaman Ringkasan berfungsi sebagai laporan ringkasan donasi Anda:

1. Di menu Jump, pilih **Donasi > Ringkasan**.
2. Pada tampilan **Dasbor**, atur **Tanggal Mulai** dan **Tanggal Akhir** di panel **Filter Laporan**, lalu klik **Jalankan Laporan**.
3. Klik **Opsi Unduh** dan pilih **Ringkasan** untuk mengekspor laporan sebagai file CSV.

## Mengekspor Data

Anda dapat mengekspor data donasi dari beberapa tempat:

- **Halaman Ringkasan** -- unduh CSV berisi total pemberian menurut minggu, bulan, atau kuartal dan dana
- **Halaman detail batch** -- unduh CSV berisi donasi perorangan beserta detail donatur
- **Halaman detail dana** -- unduh riwayat donasi untuk dana tertentu

:::tip
Untuk pelaporan akhir tahun, gabungkan ekspor halaman Ringkasan dengan alat [Laporan Pemberian](giving-statements.md) untuk mendapatkan tren agregat sekaligus laporan pemberian untuk setiap donatur perorangan.
:::

## Langkah Selanjutnya

- Buat [Laporan Pemberian](giving-statements.md) untuk donatur Anda pada akhir tahun
- Tinjau [batch](batches.md) satu per satu untuk memverifikasi detail donasi
- Periksa halaman detail [dana](funds.md) untuk melihat rincian pemberian menurut kategori
