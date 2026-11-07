---
title: "Pemutaran Terjadwal di TV"
---

# Pemutaran Terjadwal di TV

<div class="article-intro">

Setelah TV dipasangkan ke kalender, FreePlay akan menjalankannya untuk Anda. Aplikasi ini mengunduh jadwal satu minggu ke depan, mengganti konten pada waktu yang dijadwalkan, dan tetap memutar dari penyimpanannya sendiri jika koneksi internet terputus. Guru atau relawan tetap dapat menjeda, melewati, dan berpindah konten dengan remote TV.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- [Pasangkan TV ke kalender](./pairing-a-screen)
- [Isi kalender dengan konten](./scheduling-the-calendar), atau atur loop default untuk grup layar

</div>

## Yang Dilakukan TV secara Otomatis

- **Langsung membuka jadwal** - Saat TV yang sudah dipasangkan menjalankan FreePlay, aplikasi langsung membuka pemutar terjadwal
- **Mengunduh lebih dulu** - FreePlay mengunduh setiap file yang dijadwalkan untuk 7 hari ke depan, ditambah loop default, lalu memutar dari file unduhan tersebut
- **Memutar sesuai jam** - Pada setiap waktu mulai yang dijadwalkan, layar beralih ke konten tersebut. Jika tidak ada yang dijadwalkan, layar memutar loop default grup
- **Memeriksa perubahan** - FreePlay memeriksa FreePlay Admin secara berkala untuk perubahan kalender dan mengunduh apa pun yang baru
- **Memperbaiki file bermasalah** - Jika file yang diunduh tidak bisa diputar, FreePlay melewatinya dan mengunduh ulang

Sebelum file pertama tiba, layar menampilkan **Loading schedule...** atau **Downloading X of Y files**. Jika tidak ada yang dijadwalkan dan grup tidak memiliki loop default, layar menampilkan **Nothing is scheduled right now**.

## Panel Informasi

Tekan **Select** pada remote untuk membuka panel informasi. Panel akan tertutup sendiri setelah beberapa detik. Panel menampilkan:

- **Kanan atas** - **Ready through** diikuti tanggal ketika semua konten sampai tanggal tersebut sudah terunduh, atau **Downloading** selama file masih masuk. Di bawahnya, jumlah file yang sudah terunduh dan bilah progres
- **Kiri bawah** - Nama konten yang sedang diputar (atau **Default loop**), item yang sedang tampil di layar, serta konten berikutnya beserta waktunya
- **Last checked** - Waktu terakhir FreePlay memeriksa perubahan jadwal

Panel ini juga memiliki tiga tombol:

- **Pin This Playlist** - Terus memutar konten saat ini secara berulang dan abaikan kalender. Pilih **Unpin Playlist** untuk kembali ke jadwal
- **Browse Content** - Keluar dari pemutar terjadwal untuk menelusuri penyedia konten yang terhubung
- **Settings** - Buka pengaturan FreePlay, tempat Anda dapat [melepas pasangan atau memasangkan ke kalender lain](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
Untuk kembali ke jadwal setelah menelusuri, tekan **Back** pada remote dari layar **Content Providers**, atau buka **Settings**, pilih **Pair to a calendar**, lalu pilih **Back to schedule**. TV yang sudah dipasangkan juga akan kembali ke pemutar terjadwal setiap kali FreePlay kembali ke latar depan, dan selalu membuka pemutar terjadwal saat dinyalakan.
:::

## Kontrol Remote

| Tombol Remote | Tindakan |
|---|---|
| **Select** | Buka panel informasi |
| **Play/Pause** | Jeda atau lanjutkan. Ikon play tampil saat dijeda |
| **Right arrow** | Slide atau video berikutnya |
| **Left arrow** | Slide atau video sebelumnya |
| **Up arrow** | Buka ikhtisar slide untuk melompat ke slide mana pun |
| **Fast Forward** | Maju 10 detik dalam video |
| **Rewind** | Mundur 10 detik dalam video |
| **Back** | Tutup ikhtisar slide atau panel informasi, atau buka panel informasi |

Berikutnya dan sebelumnya hanya berlaku dalam konten yang sedang diputar. Perpindahan dari item terakhir ke item pertama hanya terjadi jika jadwal diatur untuk diulang. Fast Forward dan Rewind hanya bekerja saat video diputar. Keduanya tidak berpengaruh pada slide.

### Melompat ke Slide

Tekan **Up** untuk membuka ikhtisar slide. Layar menampilkan setiap item dalam playlist atau pelajaran saat ini. Pindah ke item yang Anda inginkan dan tekan **Select** untuk langsung melompat ke sana.

## Pelajaran dengan Kecepatan Guru

Saat jadwal diatur ke **Teacher paced**, slide gambar tidak berpindah sendiri. Guru memajukannya dengan **Right arrow**. Video diputar sampai selesai, lalu lanjut ke item berikutnya.

Pelajaran dengan kecepatan guru akan tetap tampil di layar melewati waktu selesai yang dijadwalkan, hingga guru mencapai slide terakhir dan pelajaran itu selesai. Setelah itu, layar beralih ke konten berikutnya yang dijadwalkan. Dengan begitu, kelas yang berjalan lebih lama tidak akan terpotong di tengah pelajaran.

## Presentasi dari Browser

Anda juga dapat memutar kalender layar di browser web. Di FreePlay Admin, buka layar dari halaman **Screens** dan klik **Present in browser**. Browser mengikuti kalender layar tersebut seperti TV, dan bilah kontrol menampilkan konten berikutnya. Gunakan **Space** untuk jeda, **←** / **→** untuk melewati, **F** untuk layar penuh, dan **Esc** untuk keluar.

## Artikel Terkait

- **[Menjadwalkan Kalender](./scheduling-the-calendar)** - Atur apa yang diputar dan apa yang terjadi saat konten selesai lebih awal
- **[Mengelola Layar dan Grup](./managing-screens)** - Periksa unduhan setiap layar dari FreePlay Admin
- **[Memutar Konten](../content-providers/playing-content)** - Kontrol pemutar saat Anda memutar konten sendiri
