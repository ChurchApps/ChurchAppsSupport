---
title: "Mengelola Khotbah"
---

# Mengelola Khotbah

<div class="article-intro">

Halaman Khotbah menampilkan seluruh pustaka khotbah Anda. Dari sini, Anda dapat menambahkan khotbah baru, mengedit entri yang sudah ada, dan mengatur konten berdasarkan playlist. Setiap khotbah dapat ditautkan ke video atau audio yang dihosting di YouTube, Vimeo, Facebook, atau URL kustom.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan izin **contentApi.streamingServices.edit**. Lihat [Peran & Izin](../settings/roles-permissions.md) jika Anda tidak memiliki akses.
- Buat setidaknya satu [playlist](playlists) untuk mengelompokkan khotbah Anda
- Siapkan ID video atau URL dari YouTube, Vimeo, atau Facebook

</div>

## Melihat Pustaka Khotbah Anda

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), perluas **Khotbah**, lalu klik **Khotbah**.
2. Halaman Khotbah menampilkan entri khotbah Anda dalam bentuk tabel dengan **Playlist**, judul, dan **Tanggal Publikasi** masing-masing khotbah. Gunakan kotak pencarian di atas tabel untuk menyaring daftar. Playlist Anda tercantum di panel **Playlist** di samping tabel.
3. Klik **Edit** pada baris khotbah mana pun untuk melihat atau mengedit detailnya.

## Menambahkan Khotbah

1. Klik tombol **Tambah Khotbah** di pojok kanan atas, lalu pilih **Tambah Khotbah** dari menu tarik-turun.
2. Pilih **Playlist** tempat khotbah akan ditambahkan.
3. Pilih **Penyedia Video** Anda -- YouTube, Vimeo, Facebook, atau URL Kustom. Kami merekomendasikan YouTube karena paling sesuai dengan sistem B1.
4. Masukkan ID video atau URL, lalu klik **Ambil**. Untuk YouTube, ID video adalah rangkaian karakter setelah `v=` pada URL YouTube.
5. Saat Anda mengklik **Ambil**, detail khotbah akan diimpor secara otomatis, termasuk tanggal publikasi, durasi, judul, deskripsi, dan thumbnail.
6. Buat perubahan yang diinginkan, lalu klik **Simpan**.

:::tip
Anda juga dapat menambahkan URL siaran langsung permanen dengan memilih **Tambah URL Live Permanen** dari menu tarik-turun **Tambah Khotbah**. Ini membuat koneksi tetap ke siaran langsung saluran YouTube Anda menggunakan Channel ID Anda. Lihat [Siaran Langsung](live-streaming) untuk informasi selengkapnya.
:::

## Mengedit Khotbah

1. Klik **Edit** pada baris khotbah mana pun di pustaka Anda untuk membuka detailnya.
2. Perbarui judul, pembicara, tanggal, deskripsi, thumbnail, atau tautan media sesuai kebutuhan.
3. Klik **Simpan** untuk menerapkan perubahan Anda.

## Detail Khotbah

Setiap entri khotbah dapat mencakup:

- **Judul** -- Nama khotbah yang ditampilkan kepada pengunjung
- **Pembicara** -- Orang yang menyampaikan khotbah
- **Tanggal** -- Tanggal publikasi atau penyampaian
- **Deskripsi** -- Ringkasan isi khotbah
- **Thumbnail** -- Gambar pratinjau yang ditampilkan di pustaka khotbah Anda
- **Tautan Video/Audio** -- URL media khotbah di YouTube, Vimeo, Facebook, atau host kustom
- **URL File Audio (untuk podcast)** -- Tautan langsung ke file MP3/M4A untuk khotbah ini. Tempelkan URL atau klik **Unggah Audio** untuk mengunggah file dan mengisinya secara otomatis. Hanya khotbah yang memiliki kolom ini (atau tautan file video langsung) yang disertakan dalam feed podcast Anda.

## Feed Podcast Anda

Setelah setidaknya satu khotbah memiliki file audio atau video, B1 Admin akan membuat feed RSS podcast untuk gereja Anda secara otomatis -- tidak ada yang perlu diaktifkan. Temukan feed tersebut di panel **Feed Podcast** di bawah daftar khotbah: klik ikon salin untuk menyalin URL feed, lalu kirimkan URL tersebut ke Apple Podcasts, Spotify, atau direktori podcast lainnya.

:::info
Khotbah yang hanya menautkan ke pemutar tersemat (seperti ID video YouTube atau Vimeo) tidak akan muncul di feed podcast, karena aplikasi podcast memerlukan file media langsung yang dapat diunduh. Tambahkan **URL File Audio** untuk menyertakan khotbah tersebut.
:::

## Menjadwalkan Khotbah untuk Siaran Langsung

Setelah menambahkan khotbah, Anda dapat menjadwalkannya untuk disiarkan di halaman siaran langsung Anda:

1. Di menu Jump, pilih **Khotbah > Waktu Siaran Langsung**.
2. Edit sebuah kebaktian, lalu di bawah **Pengaturan Video**, pilih khotbah Anda dari menu tarik-turun.
3. Khotbah akan diputar pada waktu kebaktian yang dijadwalkan.

:::info
Untuk mengimpor banyak khotbah sekaligus, alih-alih menambahkannya satu per satu, gunakan alat [Impor Massal](bulk-import) untuk mengambil video langsung dari akun YouTube atau Vimeo Anda.
:::

## Langkah Selanjutnya

- [Playlist](playlists) -- Mengatur khotbah ke dalam seri
- [Siaran Langsung](live-streaming) -- Mengonfigurasi jadwal streaming Anda
- [Impor Massal](bulk-import) -- Mengimpor banyak khotbah sekaligus
