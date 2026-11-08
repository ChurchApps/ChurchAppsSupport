---
title: "Panduan: Membuat Laporan Pemberian Akhir Tahun"
description: "Di B1 Admin, selesaikan catatan donasi tahun ini, periksa pengaturan pajak dana, dan buat laporan pemberian yang dapat dikurangkan pajak untuk setiap donatur."
---

# Membuat Laporan Pemberian Akhir Tahun

<div class="article-intro">

Ikuti proses akhir tahun untuk menyelesaikan catatan donasi, memverifikasi pengaturan dana, dan membuat laporan pemberian yang dapat dikurangkan pajak untuk setiap donatur. Proses ini biasanya dilakukan pada awal Januari untuk tahun kalender sebelumnya.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun B1 Admin dengan akses keuangan
- Donasi yang dicatat sepanjang tahun (secara daring melalui Stripe dan/atau dimasukkan secara manual)
- Akses ke akun Stripe Anda jika Anda menerima donasi daring

</div>

## Langkah 1: Impor Transaksi Stripe Terakhir

Pastikan semua donasi daring dari akhir tahun sudah ada di sistem Anda.

Ikuti panduan [Stripe Import](../donations/stripe-import.md) untuk:

1. Buka Donations > Stripe Import
2. Pilih rentang tanggal yang mencakup akhir tahun (misalnya, 1 Desember - 31 Desember)
3. Klik Preview terlebih dahulu untuk meninjau, lalu klik Import Missing untuk menyelesaikannya

:::warning
Jalankan impor ini sebelum membuat laporan pemberian. Transaksi yang belum Anda impor tidak akan muncul di laporan donatur.
:::

## Langkah 2: Tinjau Laporan Donasi

Pastikan catatan Anda akurat sebelum membuat laporan pemberian.

Ikuti panduan [Donation Reports](../donations/donation-reports.md) untuk:

1. Periksa halaman ringkasan donasi untuk seluruh tahun
2. Tinjau total per dana dan bandingkan dengan rekening koran bank Anda untuk menemukan ketidaksesuaian
3. Klik batch individual untuk memverifikasi detail setiap donatur jika diperlukan

## Langkah 3: Verifikasi Status Pajak Dana

Pastikan pengaturan dapat dikurangkan pajak untuk setiap dana sudah benar agar laporan pemberian akurat.

Ikuti panduan [Funds](../donations/funds.md) untuk:

1. Buka setiap dana dan pastikan pengaturan dapat dikurangkan pajak sudah benar

:::info
Hanya donasi ke dana yang ditandai sebagai dapat dikurangkan pajak yang akan muncul di laporan pemberian. Jika suatu dana seharusnya dapat dikurangkan pajak tetapi belum ditandai demikian, perbarui sebelum membuat laporan pemberian.
:::

## Langkah 4: Buat Laporan Pemberian

Buat laporan pemberian resmi untuk donatur Anda.

Ikuti panduan [Giving Statements](../donations/giving-statements.md) untuk:

1. Buka **Donations > Giving Statements**
2. Pilih tahun dari daftar tarik-turun dan tinjau statistik ringkasan
3. Pilih metode unduh Anda:
   - **Download ZIP** — file CSV terpisah, satu per donatur
   - **Print All** — tampilan siap cetak dengan setiap laporan di halaman baru, dengan logo gereja Anda di bagian atas (jika Anda telah mengunggahnya)

:::tip
Buat laporan pemberian lebih awal di bulan Januari selagi catatan masih segar. Ini memberi Anda waktu untuk memperbaiki masalah sebelum laporan dikirim.
:::

## Langkah 5: Distribusikan ke Donatur

Pastikan laporan pemberian sampai ke tangan donatur Anda.

1. Cetak dan kirim laporan melalui pos, atau kirim file CSV individual melalui email kepada donatur
2. Anggota juga dapat melihat riwayat pemberian mereka sendiri dan mencetak laporan di [B1.church atau di B1 App](../../b1-church/giving/donation-history.md)

## Selesai!

Laporan pemberian akhir tahun Anda sudah lengkap. Donatur telah menerima laporan yang dapat dikurangkan pajak, dan catatan keuangan Anda untuk tahun ini telah difinalisasi.

## Artikel Terkait

- [Stripe Import](../donations/stripe-import.md) — impor transaksi daring
- [Donation Reports](../donations/donation-reports.md) — lihat tren dan total pemberian
- [Funds](../donations/funds.md) — kelola dana dan pengaturan dapat dikurangkan pajak
- [Giving Statements](../donations/giving-statements.md) — buat laporan pemberian akhir tahun
- [Recording Donations](../donations/recording-donations.md) — masukkan donasi tunai/cek secara manual
- [Donation History (Web)](../../b1-church/giving/donation-history.md) — tampilan layanan mandiri untuk anggota
- [Set Up Online Giving Guide](./online-giving.md) — pengaturan awal Stripe dan pemberian daring
