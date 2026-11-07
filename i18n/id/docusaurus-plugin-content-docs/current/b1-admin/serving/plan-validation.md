---
title: "Validasi Rencana & Notifikasi"
---

# Validasi Rencana & Notifikasi Relawan

<div class="article-intro">

B1 Admin secara otomatis memeriksa rencana Anda untuk mencari masalah sebelum hari Minggu, seperti posisi yang belum terisi, konflik jadwal, dan relawan yang telah memblokir tanggal tersebut. Ketika semuanya sudah baik, Anda dapat memberi tahu seluruh tim dengan satu klik.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Buat [rencana ibadah](./plans.md) dan tugaskan relawan ke posisi
- Tambahkan [jadwal ibadah](./plans.md) ke rencana agar deteksi konflik dapat memeriksa tumpang tindih
- Pastikan relawan telah memasang aplikasi B1 Mobile untuk menerima notifikasi push

</div>

## Panel Validasi

Setiap rencana memiliki panel **Validasi** yang berjalan secara otomatis saat Anda menyusunnya. Panel ini memeriksa tiga hal:

### Posisi yang Belum Terisi
Jika suatu posisi membutuhkan lebih banyak orang daripada yang saat ini ditugaskan, panel validasi akan mencantumkan dengan jelas apa yang masih dibutuhkan, misalnya *"Teknisi Suara: masih butuh 1 orang lagi."* Anda dapat melihat sekilas apakah rencana Anda sudah terisi penuh sebelum minggu tersebut tiba.

### Konflik Jadwal
Jika seorang relawan ditugaskan ke dua posisi yang waktunya tumpang tindih dalam rencana yang sama, panel validasi akan menandai konflik tersebut, misalnya *"Jane Smith: konflik waktu antara Pemimpin Pujian dan Check-in Anak selama Ibadah Minggu."* Ini membantu menangkap jadwal ganda sebelum menjadi masalah pada pagi hari Minggu.

### Tanggal Blokir
Relawan dapat mengatur tanggal ketika mereka tidak tersedia di B1 Mobile. Jika seseorang ditugaskan ke rencana yang jatuh dalam salah satu tanggal blokir mereka, panel validasi akan menampilkan konflik tersebut secara otomatis sehingga Anda dapat mencari pengganti.

### Konflik Antar-Rencana
Validasi juga memeriksa semua rencana Anda sekaligus. Jika relawan yang sama ditugaskan dalam dua rencana berbeda yang waktunya tumpang tindih, misalnya ibadah pukul 09.00 dan ibadah pukul 10.00 yang sama-sama berlangsung hingga pukul 10.30, B1 Admin akan menandai orang tersebut sebagai terjadwal ganda lintas rencana.

:::tip
Anda tidak perlu melakukan apa pun untuk menjalankan validasi. Validasi akan diperbarui secara otomatis setiap kali Anda menambah atau mengubah penugasan. Cukup pantau panel saat Anda menyusun rencana.
:::

## Memberi Tahu Relawan

Setelah rencana Anda siap, Anda dapat memberi tahu semua relawan yang ditugaskan sekaligus langsung dari panel validasi.

1. Buka rencana dan gulir ke panel **Validasi**
2. Jika ada relawan yang belum diberi tahu, Anda akan melihat tautan yang menunjukkan berapa banyak yang perlu diberi tahu (misalnya, *"Beri tahu 8 relawan"*)
3. Klik tautan tersebut untuk mengirim notifikasi push kepada semua orang yang belum diberi tahu
4. Relawan menerima notifikasi di ponsel mereka yang memberi tahu bahwa mereka telah dijadwalkan dan meminta mereka untuk mengonfirmasi penugasan

:::info
Hanya relawan yang belum diberi tahu yang akan disertakan. Jika Anda menambahkan seseorang ke rencana nanti, tautan akan muncul kembali sehingga Anda dapat memberi tahu anggota baru tersebut tanpa memberi tahu ulang seluruh tim.
:::

### Rencana dengan Alur Kerja Konfirmasi

Jika pengaturan rencana menyebutkan [alur kerja konfirmasi](./workflows.md#serving-assignment-confirmations), panel akan menampilkan *"Permintaan baru menggunakan alur kerja konfirmasi. Peringatan aplikasi tetap aktif. Tindak lanjut akan berhenti saat setiap permintaan diterima atau ditolak."* Dalam kasus ini:

- Tautan pemberitahuan hanya menghitung relawan yang belum diberi tahu dan belum merespons.
- Saat diklik, tautan akan mengirim peringatan dalam aplikasi seperti biasa dan membuat satu kartu untuk setiap permintaan di papan alur kerja. Alur kerja kemudian mengirim tindak lanjut melalui email dan pesan teks dan, jika diperlukan, menyerahkan permintaan kepada seseorang untuk dihubungi melalui telepon.
- Rencana harus sudah dipublikasikan (bukan masih sementara) dan alur kerja harus aktif. Jika tidak, panel akan menampilkan *"Permintaan tidak dapat dikirim. Periksa apakah alur kerja yang dipilih aktif dan rencana sudah dipublikasikan, lalu coba lagi."*

:::warning
Relawan harus memasang pengalaman seluler B1.church (PWA di layar utama mereka, atau aplikasi native B1 Mobile yang sudah tidak digunakan lagi bagi pengguna yang masih memilikinya) dengan notifikasi diaktifkan untuk menerima notifikasi push. Lihat [Memasang sebagai Aplikasi (PWA)](/docs/b1-church/getting-started/installing-pwa) untuk petunjuk pengaturan.
:::

## Artikel Terkait

- [Rencana Ibadah](./plans.md)
- [Alur Kerja](./workflows.md)
- [Memasang PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
