---
title: "Impor Massal"
description: "Impor video khotbah secara massal dari kanal YouTube atau akun Vimeo ke B1 Admin, lalu kelompokkan ke dalam daftar putar."
---

# Impor Massal

<div class="article-intro">

Halaman Impor Massal memungkinkan Anda dengan cepat mengisi pustaka khotbah dengan mengimpor video dari YouTube atau Vimeo. Ini adalah cara tercepat untuk memasukkan konten khotbah yang sudah ada, daripada menambahkan setiap video satu per satu.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan izin **contentApi.streamingServices.edit**. Lihat [Peran & Izin](../settings/roles-permissions.md) jika Anda tidak memiliki akses.
- Buat setidaknya satu [playlist](./playlists.md) untuk tempat mengimpor khotbah Anda
- Siapkan ID Channel YouTube atau informasi akun Vimeo Anda

</div>

## Memilih Sumber Anda

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas), perluas **Khotbah**, lalu klik **Khotbah**. Klik **Tambah Khotbah** dan pilih **Impor Massal** dari menu.
2. Di bawah **Pilih Sumber Impor**, Anda akan melihat dua pilihan:
   - **YouTube** -- Impor video dari channel YouTube
   - **Vimeo** -- Impor video dari akun Vimeo
3. Klik opsi untuk platform tempat khotbah Anda dihosting (atau klik **Impor dari YouTube** / **Impor dari Vimeo** di bawah deskripsinya). Klik **Kembali** di bagian atas halaman untuk kembali ke pilihan sumber.

:::tip
Anda dapat kembali dan mengganti sumber kapan saja jika video Anda ada di kedua platform.
:::

## Sebelum Anda Mengimpor

Sebelum mengimpor video, Anda memerlukan setidaknya satu playlist untuk mengatur video tersebut. Jika Anda belum membuat playlist apa pun:

1. Kembali ke halaman **Khotbah** dan temukan panel **Playlist**.
2. Klik **Buat Playlist Pertama** dan isi nama, deskripsi, tanggal publikasi, dan thumbnail.
3. Klik **Simpan**, lalu kembali ke Impor Massal dengan mengklik **Tambah Khotbah** dan memilih **Impor Massal**.

Lihat [Playlist](./playlists.md) untuk petunjuk lengkap tentang membuat dan mengelola playlist.

## Mengimpor Video

1. Setelah memilih YouTube atau Vimeo, masukkan **ID Channel YouTube** atau **informasi akun Vimeo** Anda di kolom yang tersedia.
2. Klik tombol **Fetch** untuk mengambil semua video yang tersedia dari channel atau akun Anda.
3. Setelah pengambilan selesai, Anda akan melihat daftar semua video Anda dengan kotak centang.
4. Centang kotak di samping video yang ingin Anda impor. Anda dapat memilih semua video atau memilih video tertentu.
5. Opsional, aktifkan **Auto Import New Videos** untuk otomatis menambahkan unggahan baru ke pustaka Anda.
6. Klik dropdown **Import Into Playlist** untuk memilih playlist tempat video ini akan ditambahkan.
7. Klik tombol **Import** untuk menyelesaikan impor massal.

Video Anda akan diimpor beserta semua detailnya, termasuk judul, deskripsi, tanggal, dan thumbnail. Karakter khusus dalam judul dan deskripsi YouTube, seperti `&`, tanda kutip tunggal, dan tanda kutip ganda, akan tampil sebagaimana aslinya, bukan sebagai kode seperti `&amp;`.

:::info
Impor massal sangat cocok untuk memulai saat Anda berpindah dari platform lain. Untuk menambahkan khotbah satuan ke depannya, gunakan halaman [Mengelola Khotbah](./managing-sermons.md) sebagai gantinya.
:::

## Langkah Selanjutnya

- [Mengelola Khotbah](./managing-sermons.md) -- Edit detail khotbah yang diimpor
- [Playlist](./playlists.md) -- Buat dan kelola seri khotbah
- [Live Streaming](./live-streaming.md) -- Siapkan siaran langsung untuk ibadah Anda
