---
title: "Mode Terjadwal"
description: "Atur TV FreePlay agar memutar playlist sesuai kalender di FreePlay Admin: layar mulai dan berhenti sendiri, dan tetap berjalan saat Wi-Fi terputus."
---

# Mode Terjadwal

<div class="article-intro">

Mode Terjadwal memungkinkan TV FreePlay berjalan sendiri. Anda membuat daftar putar dan menjadwalkannya di kalender di **FreePlay Admin** pada [admin.freeplay.church](https://admin.freeplay.church). Setiap TV yang dipasangkan dengan kalender tersebut akan mengunduh konten untuk seminggu ke depan dan memutar apa pun yang sudah dijadwalkan sesuai waktu, tanpa perlu ada yang menekan Start. Karena file sudah diunduh sebelumnya, pemutaran tetap berjalan meskipun koneksi Wi-Fi terputus.

</div>

:::tip
FreePlay Admin menggunakan login ChurchApps Anda, yaitu login yang sama dengan yang Anda gunakan untuk B1 Admin. Tidak ada akun terpisah yang perlu dibuat.
:::

## Bagaimana Semuanya Saling Terhubung

FreePlay Admin memiliki empat halaman utama, yang tercantum di bagian atas situs:

- **[Screens](./managing-screens.md)** - TV yang sudah Anda pasangkan, statusnya, dan **grup layar** tempat TV tersebut tergabung. Layar dalam satu grup berbagi satu kalender dan satu loop default
- **[Playlists](./building-playlists.md)** - Loop berisi gambar dan video yang Anda pilih dari penyedia konten Anda
- **[Calendar](./scheduling-the-calendar.md)** - Apa yang diputar oleh setiap grup layar, dan kapan
- **[Providers](./building-playlists.md#connecting-providers)** - Sumber konten yang menjadi asal playlist Anda. Anda menghubungkan setiap penyedia sekali saja untuk seluruh gereja

Jika tidak ada jadwal, layar dalam grup akan memutar **loop default** grup tersebut. Jika grup tidak memiliki loop default, layar akan mati.

## Perbedaannya dengan Mode Rencana

- **[Plan Mode](../plan-mode/index.md)** (Mode Rencana) mengikuti satu jenis rencana ibadah dari B1 Admin. Seseorang menekan **Start Plan** di TV, dan pelajaran diputar saat tombol itu ditekan
- **Mode Terjadwal** mengikuti kalender. Konten dimulai dan berhenti pada waktu yang Anda tetapkan, sehingga cocok untuk tampilan informasi di lobi, loop pengumuman, dan ruang kelas yang pelajarannya perlu sudah tampil sebelum orang masuk

Entri kalender tetap dapat memutar rencana ibadah. Pilih jenis rencana di bagian **Service plans** saat Anda menambahkan jadwal, dan layar akan memutar rencana yang aktif di B1 Admin pada minggu tersebut. Ini termasuk pelajaran Go Curriculum, bahkan yang sudah Anda sesuaikan dalam rencana. Layar menggunakan login Go Curriculum yang terhubung dengan jenis rencana di pelayanan B1 Admin, atau koneksi Go Curriculum gereja jika pelayanan tersebut tidak memilikinya.

## Memulai

Sampai Anda menyelesaikan setiap langkah berikut, halaman **Screens** akan menampilkan daftar periksa **Get started** dengan tautan untuk setiap langkah:

1. **Hubungkan penyedia** - Tautkan Dropbox, OneDrive, Lessons.church, atau sumber lain di halaman **Providers**
2. **Buat daftar putar** - Pilih gambar dan video dari penyedia
3. **Masukkan ke kalender** - Tentukan apa yang diputar kapan, atau atur loop default untuk grup
4. **Pasangkan layar** - Masukkan kode empat huruf yang ditampilkan di TV

Klik **Hide** untuk menyembunyikan daftar periksa.

:::tip
Tekan **Ctrl+K** (**⌘K** di Mac), atau klik kotak pencarian di header, untuk membuka palet perintah. Dari sana Anda dapat berpindah ke halaman mana pun atau memulai tindakan seperti **Pair screen**, **Add playlist**, atau **Add schedule**.
:::

## Dalam Bagian Ini

- **[Pairing a Screen](./pairing-a-screen.md)** - Menampilkan kode di TV dan memasangkannya di FreePlay Admin
- **[Managing Screens and Groups](./managing-screens.md)** - Memeriksa status dan unduhan, serta mengelompokkan layar
- **[Connecting Providers and Building Playlists](./building-playlists.md)** - Menautkan sumber konten dan membuat loop gambar dan video
- **[Scheduling the Calendar](./scheduling-the-calendar.md)** - Menentukan apa yang diputar kapan, dan apa yang terjadi saat pemutaran selesai lebih awal
- **[Scheduled Playback on the TV](./scheduled-playback.md)** - Apa yang dilakukan TV secara otomatis, dan cara menggunakan remote selama pemutaran
