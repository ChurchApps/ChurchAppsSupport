---
title: "Menghubungkan Penyedia dan Membuat Daftar Putar"
description: "Atur penyedia konten yang terhubung di FreePlay Admin, lalu buat, susun, dan pratinjau playlist untuk layar TV terjadwal."
---

# Menghubungkan Penyedia dan Membuat Daftar Putar

<div class="article-intro">

Daftar putar adalah rangkaian gambar dan video yang diulang yang Anda tempatkan di kalender. Di FreePlay Admin, Anda menghubungkan penyedia konten sekali untuk seluruh gereja. Kemudian, Anda membuat daftar putar dengan memilih file dari penyedia tersebut.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Masuk ke FreePlay Admin di [admin.freeplay.church](https://admin.freeplay.church)
- Siapkan login untuk akun penyedia mana pun yang ingin Anda tautkan, seperti Dropbox atau OneDrive

</div>

## Menghubungkan Penyedia

Halaman **Providers** mencantumkan sumber konten Anda dalam dua bagian:

- **Connected** - Penyedia yang dapat Anda gunakan sekarang. Penyedia publik yang tidak memerlukan masuk, seperti Lessons.church dan Bible Project, selalu tercantum di sini sebagai **Public · no sign-in needed**. Akun yang tertaut menampilkan **Account linked** beserta kapan tautannya berakhir.
- **Available** - Penyedia yang memerlukan Anda masuk sebelum dapat digunakan.

Untuk menghubungkan penyedia:

1. Buka **Providers**.
2. Temukan penyedia di bawah **Available** dan klik **Connect**.
3. Masuk ke akun Anda dengan penyedia tersebut:
   - Beberapa penyedia, seperti Dropbox, Google Drive, dan OneDrive, membuka jendela pop-up untuk masuk. Jika tidak ada yang muncul, izinkan pop-up untuk admin.freeplay.church.
   - Penyedia lain menampilkan tautan dan kode. Kunjungi tautan tersebut, masukkan kodenya, lalu setujui akses. Dialog akan diperbarui sendiri setelah selesai.
4. Ketika Anda melihat **Account linked successfully!**, penyedia tersebut akan pindah ke **Connected**.

Penyedia yang terhubung memiliki tiga tindakan:

- **Browse** - Telusuri folder penyedia
- **Refresh** - Perbarui masuk penyedia
- **Unlink** - Putuskan akun

:::info
Koneksi penyedia di FreePlay Admin dimiliki oleh seluruh gereja, bukan oleh satu orang atau satu TV. Layar yang dijadwalkan mendapatkan file-nya melalui koneksi ini, sehingga Anda tidak perlu masuk ke setiap penyedia di setiap TV.
:::

**FreeShow** tercantum sebagai **On your church network · each TV finds it itself**. Tidak ada yang perlu dihubungkan untuknya di FreePlay Admin.

## Halaman Playlists

Halaman **Playlists** mencantumkan setiap daftar putar dengan jumlah itemnya, total durasinya, tempat penggunaannya (**Default loop** untuk grup, atau jumlah jadwal), dan kapan terakhir diperbarui. Setiap baris memiliki tindakan berikut:

- **Present** - Putar daftar putar layar penuh di browser Anda
- **Edit** - Buka editor daftar putar
- **Duplicate** - Buat salinan bernama "(copy)"

## Membuat Daftar Putar

1. Buka **Playlists** dan klik **Add playlist**.
2. Masukkan **Name**, misalnya "Loop selamat datang".
3. Klik **Add playlist**. Editor daftar putar akan terbuka.

## Menambahkan Item

Editor daftar putar menampilkan **Items** daftar putar Anda di sebelah kiri dan **Add from provider** di sebelah kanan.

1. Di sebelah kanan, pilih tab penyedia. Untuk menambahkan sumber lain, klik **Connect another**, yang akan membuka halaman **Providers**.
2. Klik folder untuk masuk ke dalamnya. Gunakan jejak breadcrumb untuk kembali ke atas.
3. Klik file untuk menambahkannya ke akhir daftar putar. File yang sudah ada di daftar putar akan ditandai sebagai terpilih.
4. Untuk menambahkan semua isi folder saat ini sekaligus, klik **Add all**. Tombol ini menampilkan berapa banyak file yang belum ada di daftar putar.
5. Klik **Save** di bagian atas editor.

:::warning
Perubahan tidak disimpan sampai Anda mengklik **Save**. Klik **Cancel** untuk keluar tanpa menyimpan.
:::

## Mengatur Item

Di daftar **Items** di sebelah kiri:

- **Reorder** - Seret item dengan pegangannya di sebelah kiri
- **Image timing** - Gambar ditampilkan selama 10 detik secara default. Ubah jumlah detik di sebelah gambar
- **Videos** - Video menampilkan **Plays to end** dan diputar sepanjang durasi penuhnya
- **Remove** - Keluarkan item dari daftar putar

Ringkasan di bagian atas menampilkan jumlah item dan total panjang daftar putar.

## Mengganti Nama, Menduplikasi, dan Menghapus

Panel di sisi kiri editor menampilkan tempat daftar putar digunakan. Panel ini juga memiliki tindakan berikut:

- **Present** - Putar daftar putar di browser Anda
- **Rename** - Ubah nama daftar putar
- **Duplicate** - Buat salinan untuk diedit secara terpisah
- **Delete** - Hapus daftar putar. Jadwal yang memutarnya akan kembali ke loop default grup

## Menampilkan Daftar Putar di Browser Anda

Klik **Present** untuk memutar daftar putar layar penuh di browser Anda. Ini berguna untuk melihat pratinjau daftar putar, atau untuk menjalankannya dari laptop yang terhubung ke proyektor. Gerakkan mouse untuk menampilkan bilah kontrol, lalu gunakan tombol berikut:

| Tombol | Tindakan |
|---|---|
| **Spasi** | Jeda atau lanjutkan |
| **←** / **→** | Item sebelumnya atau berikutnya |
| **F** | Aktifkan atau nonaktifkan layar penuh |
| **Esc** | Keluar |

## Artikel Terkait

- **[Menjadwalkan Kalender](./scheduling-the-calendar.md)** - Tempatkan daftar putar Anda di kalender grup layar
- **[Mengelola Layar dan Grup](./managing-screens.md)** - Tetapkan daftar putar sebagai loop default grup
- **[Penyedia Konten](../content-providers/index.md)** - Penyedia yang dapat Anda hubungkan langsung di TV
