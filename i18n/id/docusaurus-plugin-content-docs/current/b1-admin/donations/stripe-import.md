---
title: "Impor Stripe"
description: "Tarik donasi Stripe ke B1 Admin dengan impor berbasis pratinjau yang menandai tiap transaksi sebagai baru, sudah diimpor, atau dilewati sebelum Anda simpan."
---

# Impor Stripe

<div class="article-intro">

Jika Anda menerima donasi online melalui Stripe, alat Impor Stripe memungkinkan Anda menarik transaksi tersebut ke dalam B1 Admin sehingga semua data pemberian Anda tersimpan di satu tempat. Ini sangat berguna untuk menangkap transaksi yang tidak tersinkronisasi secara otomatis.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Selesaikan [Pengaturan Pemberian Online](online-giving-setup.md) untuk menghubungkan akun Stripe Anda ke B1 Admin. Item menu **Impor Stripe** dan tombol di halaman Batch hanya muncul ketika gerbang pemberian gereja Anda adalah Stripe, dan hanya untuk orang yang dapat mengedit donasi
- Pastikan Anda memiliki donasi di dasbor Stripe Anda untuk rentang tanggal yang ingin Anda impor

</div>

## Cara Kerjanya

Proses impor menggunakan alur kerja dua langkah: pertama Anda melihat pratinjau apa yang akan diimpor, kemudian Anda mengonfirmasi impor. Pendekatan uji coba ini memungkinkan Anda meninjau semuanya sebelum data apa pun dibuat.

## Mengimpor Transaksi

1. Di **B1 Admin**, buka **Donasi > Impor Stripe**. (Anda juga dapat mengklik **Impor transaksi Stripe yang hilang** di bagian atas halaman **Batch**.)
2. Halaman **Impor Stripe** akan terbuka.
3. Pilih **rentang tanggal** untuk transaksi yang ingin Anda impor.
4. Klik **Pratinjau** untuk menjalankan pemeriksaan uji coba.

## Meninjau Pratinjau

Pratinjau menampilkan setiap transaksi dari Stripe beserta indikator status:

- **Baru** -- transaksi ini belum pernah diimpor dan akan disertakan jika Anda melanjutkan.
- **Sudah Diimpor** -- transaksi ini sudah ada di B1 Admin dan akan dilewati.
- **Dilewati** -- transaksi ini dikecualikan karena alasan lain (misalnya, pengembalian dana atau pembayaran yang gagal).

Bagian ringkasan di bagian atas menampilkan jumlah total transaksi di setiap kategori beserta jumlah dolar yang terlibat.

:::info
Langkah pratinjau tidak membuat catatan apa pun. Ini adalah pemeriksaan hanya-baca sehingga Anda dapat memverifikasi apa yang akan terjadi sebelum melakukan tindakan.
:::

## Menyelesaikan Impor

1. Tinjau hasil pratinjau dan total ringkasan.
2. Klik **Impor yang Hilang** untuk mengimpor semua transaksi yang ditandai sebagai **Baru**.
3. Setelah impor selesai, lencana status di samping setiap transaksi akan diperbarui untuk menunjukkan hasilnya.

## Tips Menggunakan Impor Stripe

- Jalankan impor secara rutin (mingguan atau bulanan) agar catatan Anda tetap mutakhir.
- Jika transaksi menampilkan status **Sudah Diimpor**, itu berarti B1 Admin sudah memiliki catatan yang cocok -- tidak perlu tindakan apa pun.
- Gunakan filter rentang tanggal untuk memfokuskan pada periode tertentu jika Anda mencari transaksi tertentu.

:::tip
Setelah mengimpor, kunjungi halaman [Batch](batches.md) untuk memverifikasi bahwa donasi yang diimpor muncul dengan benar dan total-totalnya sesuai dengan yang Anda lihat di dasbor Stripe Anda.
:::

## Langkah Selanjutnya

- Lihat [Laporan Donasi](donation-reports.md) untuk meninjau transaksi yang diimpor bersama data pemberian Anda yang lain
- Pastikan donasi yang diimpor ditetapkan ke [dana](funds.md) yang tepat agar [laporan pemberian](giving-statements.md) akurat
