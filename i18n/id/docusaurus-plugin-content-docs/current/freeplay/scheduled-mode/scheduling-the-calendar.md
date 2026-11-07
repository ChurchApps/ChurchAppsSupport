---
title: "Menjadwalkan Kalender"
description: "Atur jadwal mingguan atau sekali di Calendar FreePlay Admin untuk memutar playlist, rencana, atau folder penyedia, dengan loop default sebagai cadangan."
---

# Menjadwalkan Kalender

<div class="article-intro">

Halaman **Kalender** di FreePlay Admin mengatur apa yang diputar oleh setiap grup layar dan kapan diputarnya. Tambahkan jadwal untuk sebuah daftar putar, rencana layanan, atau folder penyedia, lalu atur agar berulang setiap minggu atau diputar satu kali. Jika tidak ada yang dijadwalkan, loop default grup akan diputar.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Buat setidaknya satu grup layar. Lihat [Mengelola Layar dan Grup](./managing-screens.md#screen-groups)
- [Buat daftar putar](./building-playlists.md), atau siapkan jenis rencana di B1 Admin

</div>

## Membaca Kalender

1. Buka **Kalender**.
2. Pilih grup layar dari tab di bagian atas. Setiap tab menampilkan jumlah jadwal yang dimiliki grup tersebut.
3. Tampilan mingguan berjalan dari Senin sampai Minggu, pukul 06.00 sampai 22.00. Garis merah menandai waktu saat ini.
4. Gunakan panah untuk berpindah ke minggu sebelumnya atau berikutnya, atau klik **Hari ini** untuk kembali ke minggu ini.

Subjudul halaman menampilkan zona waktu yang digunakan untuk kalender. Jadwal mengikuti zona waktu gereja Anda, yang Anda atur di B1 Admin pada [Informasi Gereja](../../b1-admin/settings/church-settings.md#time-zone). Jika gereja Anda belum mengatur zona waktu, FreePlay menggunakan zona waktu kampus Anda. Kalender dan TV Anda menggunakan zona waktu yang sama, jadi blok yang diletakkan pukul 09.00 di kalender akan diputar pukul 09.00 di layar, meskipun komputer Anda diatur ke zona waktu yang berbeda.

Jadwal diberi kode warna menurut jenisnya. Legenda menjelaskan warna-warna tersebut:

- **Loop default** - Latar belakang bergaris, ditampilkan di belakang semua jadwal jika grup memiliki loop default
- **Daftar putar**
- **Rencana layanan**
- **Folder penyedia**

Setiap blok menampilkan namanya, dan blok yang lebih tinggi juga menampilkan waktu, apakah jadwal tersebut berulang (**mingguan** atau **sekali**), serta apa yang terjadi saat konten selesai lebih awal.

## Mengatur Loop Default

Loop default diputar di layar grup kapan pun tidak ada yang dijadwalkan.

1. Di halaman **Kalender**, klik **Loop default…** di header. Jika loop default sudah diatur, tombol akan menampilkan **Loop default:** diikuti nama daftar putar.
2. Pilih **Daftar putar**, atau pilih **Tidak ada — layar mati**.
3. Klik **Simpan**.

## Menambahkan Jadwal

Ada tiga cara untuk memulai jadwal baru:

- Klik area kosong di kalender. Formulir akan terbuka dengan hari dan setengah jam tersebut sudah terisi.
- Klik **Tambah jadwal** di header.
- Pilih **Tambah jadwal** dari palet perintah (**Ctrl+K** atau **⌘K**).

Lalu isi formulirnya:

1. **Putar** - Pilih apa yang akan diputar:
   - **Daftar putar** - Daftar putar apa pun yang telah Anda buat
   - **Rencana layanan** - Jenis rencana dari B1 Admin, ditandai **(rencana saat ini)**. Layar akan memutar rencana yang sedang aktif untuk jenis rencana tersebut setiap minggu, termasuk pelajaran Go Curriculum (termasuk yang sudah disesuaikan), yang menggunakan login Go yang terhubung dengan pelayanan dari jenis rencana tersebut
   - **Folder penyedia…** - Membuka **Pilih folder penyedia**. Telusuri ke folder lalu klik **Gunakan folder ini**. Untuk memilih folder lain nanti, klik **Ubah**
2. **Berulang** - Pilih hari-hari dalam seminggu saat jadwal ini diputar. Untuk satu tanggal saja, aktifkan **Sekali** lalu pilih **Tanggal**.
3. **Mulai** dan **Selesai** - Waktu jadwal dimulai dan berhenti.
4. **Jika selesai lebih awal** - Apa yang harus dilakukan saat konten habis sebelum waktu selesai:
   - **Ulangi sampai waktu selesai** - Dimulai lagi dari awal. Cocok untuk loop papan informasi, pengumuman, dan hitung mundur
   - **Dipandu guru** - Slide menunggu remote guru. Pelajaran tetap tampil melewati waktu selesai hingga slide terakhir
   - **Putar sekali, lalu kembali ke loop default**
5. Untuk jadwal yang berulang, atur **Mulai** ke tanggal pertama. Di bawah **Berakhir**, pilih **Tidak pernah**, atau pilih **Pada tanggal** dan masukkan **Tanggal berakhir**.
6. Klik **Simpan**.

:::info
**Dipandu guru** menggantikan opsi lama "tahan slide terakhir". Jadwal yang disimpan dengan opsi tersebut sekarang diputar sebagai dipandu guru.
:::

## Mengedit atau Menghapus Jadwal

1. Klik blok jadwal di kalender.
2. Ubah kolom apa pun lalu klik **Simpan**, atau klik **Hapus** untuk menghapus jadwal.

## Jadwal yang Tumpang Tindih

Jika dua jadwal tumpang tindih, formulir akan menampilkan peringatan: **Tumpang tindih dengan jadwal lain. Jadwal yang dimulai lebih akhir yang akan diutamakan.** Selama jadwal yang lebih akhir sedang berjalan, layar akan memutarnya. Saat jadwal tersebut selesai, layar kembali ke jadwal sebelumnya jika masih berjalan.

## Cara Layar Menerima Perubahan

Layar yang sudah dipasangkan mengunduh semua yang dijadwalkan untuk 7 hari ke depan, dan memeriksa perubahan secara otomatis. Anda tidak perlu menyentuh TV setelah mengedit kalender. Untuk melihat kapan layar sudah memiliki semua yang dibutuhkan, periksa **Siap hingga** di [halaman Layar](./managing-screens.md).

## Artikel Terkait

- **[Membuat Daftar Putar](./building-playlists.md)** - Buat daftar putar yang akan Anda jadwalkan
- **[Pemutaran Terjadwal di TV](./scheduled-playback.md)** - Cara kerja pelajaran dipandu guru dan remote di TV
- **[Mengelola Layar dan Grup](./managing-screens.md)** - Tambahkan grup dan periksa unduhan setiap layar
- **[Menyimpan Hanya Sebagian dari Setiap Pelajaran](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Pangkas setiap pelajaran yang dijadwalkan dalam jenis rencana menjadi bagian yang diputar di ruangan Anda
