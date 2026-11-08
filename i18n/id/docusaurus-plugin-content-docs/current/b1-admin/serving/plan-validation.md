---
title: "Validasi Rencana & Notifikasi"
description: "Periksa rencana layanan di B1 Admin untuk posisi yang belum terisi, bentrok jadwal, dan relawan yang sudah menandai tanggal tidak tersedia, lalu beri tahu seluruh tim dengan satu klik."
---

# Validasi Rencana & Notifikasi Relawan

<div class="article-intro">

B1 Admin secara otomatis memeriksa rencana Anda untuk mendeteksi masalah sebelum hari Minggu, seperti posisi yang belum terisi, bentrok jadwal, dan relawan yang sudah menandai tanggal tersebut sebagai tidak tersedia. Jika semuanya sudah sesuai, Anda dapat memberi tahu seluruh tim dengan satu klik.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Buat [rencana layanan](./plans.md) dan tugaskan relawan ke posisi-posisinya
- Tambahkan [jadwal ibadah](./plans.md) ke rencana agar deteksi bentrok dapat memeriksa jadwal yang tumpang tindih
- Pastikan relawan sudah [memasang B1 App](../../b1-church/getting-started/installing-pwa.md) agar dapat menerima notifikasi push

</div>

## Panel Validasi

Setiap rencana memiliki panel **Validasi** yang berjalan otomatis saat Anda menyusunnya. Panel ini memeriksa tiga hal:

### Posisi yang Belum Terisi
Jika suatu posisi membutuhkan lebih banyak orang daripada yang saat ini ditugaskan, panel validasi akan menampilkan dengan jelas apa yang masih dibutuhkan, misalnya *"Teknisi Suara: perlu 1 orang lagi."* Anda dapat langsung melihat apakah rencana sudah terisi lengkap sebelum minggu tersebut tiba.

### Bentrok Jadwal
Jika seorang relawan ditugaskan ke dua posisi yang waktunya tumpang tindih dalam rencana yang sama, panel validasi akan menandai bentrokan tersebut, misalnya *"Jane Smith: bentrok waktu antara Pemimpin Pujian dan Check-in Anak selama Ibadah Minggu."* Ini membantu mencegah jadwal ganda sebelum menjadi masalah pada pagi hari Minggu.

### Tanggal Tidak Tersedia
Relawan dapat menetapkan tanggal ketika mereka tidak tersedia di B1 App. Jika seseorang ditugaskan ke rencana yang jatuh pada salah satu tanggal tidak tersedia tersebut, panel validasi akan otomatis menampilkan bentrokan itu sehingga Anda dapat mencari pengganti.

### Bentrok Antar-Rencana
Validasi juga memeriksa semua rencana Anda sekaligus. Jika relawan yang sama ditugaskan pada dua rencana berbeda yang waktunya tumpang tindih, misalnya ibadah pukul 09.00 dan ibadah pukul 10.00 yang sama-sama berlangsung hingga pukul 10.30, B1 Admin akan menandai orang tersebut sebagai terjadwal ganda di seluruh rencana.

:::tip
Anda tidak perlu melakukan apa pun untuk menjalankan validasi. Panel ini diperbarui otomatis setiap kali Anda menambah atau mengubah penugasan. Cukup perhatikan panelnya saat menyusun rencana.
:::

## Memberi Tahu Relawan

Setelah rencana selesai, Anda dapat memberi tahu semua relawan yang ditugaskan sekaligus langsung dari panel validasi.

1. Buka rencana lalu gulir ke panel **Validasi**
2. Jika ada relawan yang belum diberi tahu, Anda akan melihat tautan yang menunjukkan berapa banyak yang perlu diberi tahu (misalnya *"Beri tahu 8 relawan"*)
3. Klik tautan tersebut untuk mengirim notifikasi push kepada semua relawan yang belum pernah diberi tahu
4. Relawan akan menerima notifikasi di ponsel mereka yang memberi tahu bahwa mereka telah dijadwalkan dan meminta mereka mengonfirmasi penugasan

:::info
Hanya relawan yang belum pernah diberi tahu yang akan disertakan. Jika Anda menambahkan seseorang ke rencana nanti, tautan akan muncul kembali sehingga Anda dapat memberi tahu anggota baru tersebut tanpa memberi tahu ulang seluruh tim.
:::

### Rencana dengan Alur Konfirmasi

Jika pengaturan rencana menyebutkan [alur kerja konfirmasi](./workflows.md#serving-assignment-confirmations), panel akan menampilkan *"Permintaan baru menggunakan alur konfirmasi. Peringatan aplikasi tetap aktif. Tindak lanjut berhenti setelah setiap permintaan diterima atau ditolak."* Dalam kondisi ini:

- Tautan notifikasi hanya menghitung relawan yang belum diberi tahu dan belum merespons.
- Saat diklik, tautan akan mengirim peringatan dalam aplikasi seperti biasa dan membuat satu kartu untuk setiap permintaan di papan alur kerja. Alur kerja kemudian mengirim tindak lanjut melalui email dan pesan teks serta, jika diperlukan, menyerahkan permintaan kepada seseorang untuk dihubungi melalui telepon.
- Rencana harus sudah dipublikasikan (bukan masih berupa draf) dan alur kerja harus aktif. Jika tidak, panel akan menampilkan *"Permintaan tidak dapat dikirim. Pastikan alur kerja yang dipilih aktif dan rencana sudah dipublikasikan, lalu coba lagi."*

:::warning
Relawan harus memasang B1 App di layar utama perangkat mereka dan mengaktifkan notifikasi agar dapat menerima notifikasi push. Lihat [Memasang sebagai Aplikasi (PWA)](../../b1-church/getting-started/installing-pwa.md) untuk petunjuk pengaturan.
:::

## Artikel Terkait

- [Rencana Layanan](./plans.md)
- [Alur Kerja](./workflows.md)
- [Memasang PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
