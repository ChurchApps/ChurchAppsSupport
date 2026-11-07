---
title: "Panduan: Membuat Laporan Pemberian Akhir Tahun"
description: "Di B1 Admin, selesaikan catatan donasi tahun ini, periksa pengaturan pajak dana, dan buat laporan pemberian yang dapat dikurangkan pajak untuk setiap donatur."
---

# Membuat Laporan Pemberian Akhir Tahun

<div class="article-intro">

Ikuti proses akhir tahun untuk memfinalisasi catatan donasi Anda, memverifikasi pengaturan dana, dan membuat laporan pemberian yang dapat dikurangkan pajak untuk setiap donatur. Proses ini biasanya dilakukan pada awal Januari untuk tahun kalender sebelumnya.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun B1 Admin dengan akses keuangan
- Donasi yang tercatat sepanjang tahun (secara daring melalui Stripe dan/atau dimasukkan secara manual)
- Akses ke akun Stripe Anda jika Anda menerima donasi daring

</div>

## Langkah 1: Impor Transaksi Stripe Terakhir

Pastikan semua donasi daring dari akhir tahun sudah ada di sistem Anda.

Ikuti panduan [Impor Stripe](../donations/stripe-import.md) untuk:

1. Buka Donasi > Impor Stripe
2. Pilih rentang tanggal yang mencakup akhir tahun (misalnya, 1 Desember - 31 Desember)
3. Klik Pratinjau terlebih dahulu untuk meninjau, lalu klik Impor yang Hilang untuk menyelesaikan

:::warning
Jalankan impor ini sebelum membuat laporan pemberian. Transaksi yang belum Anda impor tidak akan muncul di laporan donatur.
:::

## Langkah 2: Tinjau Laporan Donasi

Pastikan catatan Anda akurat sebelum membuat laporan pemberian.

Ikuti panduan [Laporan Donasi](../donations/donation-reports.md) untuk:

1. Periksa halaman ringkasan donasi untuk seluruh tahun
2. Tinjau total per dana dan bandingkan dengan rekening bank Anda untuk menemukan perbedaan
3. Klik batch individual untuk memverifikasi detail tiap donatur jika diperlukan

## Langkah 3: Verifikasi Status Pajak Dana

Pastikan pengaturan dapat dikurangkan pajak untuk setiap dana sudah benar agar laporan akurat.

Ikuti panduan [Dana](../donations/funds.md) untuk:

1. Buka setiap dana dan pastikan pengaturan dapat dikurangkan pajak sudah benar

:::info
Hanya donasi ke dana yang ditandai sebagai dapat dikurangkan pajak yang akan muncul di laporan pemberian. Jika dana seharusnya dapat dikurangkan pajak tetapi belum ditandai demikian, perbarui sebelum membuat laporan.
:::

## Langkah 4: Buat Laporan Pemberian

Buat laporan pemberian resmi untuk donatur Anda.

Ikuti panduan [Laporan Pemberian](../donations/giving-statements.md) untuk:

1. Buka **Donasi > Laporan Pemberian**
2. Pilih tahun dari daftar dan tinjau statistik ringkasan
3. Pilih metode unduh Anda:
   - **Unduh ZIP** — file CSV individual, satu per donatur
   - **Cetak Semua** — tampilan siap cetak dengan setiap laporan di halaman baru, dengan logo gereja Anda di bagian atas (jika sudah diunggah)

:::tip
Buat laporan pada awal Januari selagi catatan masih segar. Ini memberi Anda waktu untuk memperbaiki masalah sebelum laporan dikirim.
:::

## Langkah 5: Distribusikan ke Donatur

Sampaikan laporan ke tangan donatur Anda.

1. Cetak dan kirim laporan melalui pos, atau kirim file CSV individual melalui email kepada donatur
2. Anggota juga dapat melihat riwayat pemberian mereka sendiri dan mencetak laporan dari [B1.church](../../b1-church/giving/donation-history.md) dan [Aplikasi B1 Mobile](../../b1-church/giving/donation-history.md)

## Selesai!

Laporan pemberian akhir tahun Anda sudah lengkap. Donatur memiliki laporan yang dapat dikurangkan pajak, dan catatan keuangan Anda sudah difinalisasi untuk tahun ini.

## Artikel Terkait

- [Impor Stripe](../donations/stripe-import.md) — impor transaksi daring
- [Laporan Donasi](../donations/donation-reports.md) — lihat tren dan total pemberian
- [Dana](../donations/funds.md) — kelola dana dan pengaturan dapat dikurangkan pajak
- [Laporan Pemberian](../donations/giving-statements.md) — buat laporan akhir tahun
- [Mencatat Donasi](../donations/recording-donations.md) — masukkan donasi tunai/cek secara manual
- [Riwayat Donasi (Web)](../../b1-church/giving/donation-history.md) — tampilan layanan mandiri untuk anggota
- [Panduan Menyiapkan Pemberian Daring](./online-giving.md) — pengaturan awal Stripe dan pemberian
