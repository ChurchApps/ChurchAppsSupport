---
title: "Siaran Langsung"
---

# Siaran Langsung

<div class="article-intro">

Halaman Waktu Siaran Langsung memungkinkan Anda mengonfigurasi jadwal streaming gereja, mengelola waktu layanan, dan menyesuaikan pengalaman pemirsa. Atur layanan mingguan berulang atau acara satu kali, konfigurasikan pengaturan chat dan video, dan kendalikan kapan siaran Anda mulai tayang.

</div>

## Video Pelatihan

<YouTube id="tpEY-sEYW6A" title="Mengatur Siaran Langsung di B1" next="Menyesuaikan Aplikasi Anggota Gereja Anda di B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan izin **contentApi.streamingServices.edit**. Lihat [Peran & Izin](../settings/roles-permissions.md) jika Anda tidak memiliki akses.
- Siapkan YouTube Channel ID Anda jika Anda berencana menggunakan siaran langsung otomatis
- Tambahkan setidaknya satu [khotbah](managing-sermons) atau URL live permanen sebagai sumber siaran Anda

</div>

Siaran langsung dikelola dari dua halaman di bagian **Khotbah** pada menu Jump: **Waktu Siaran Langsung** untuk mengelola jadwal siaran langsung Anda dan **Pengaturan** untuk mengonfigurasi tab pada halaman streaming Anda.

## Mengelola Layanan

### Menambahkan Layanan

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (kolom pencarian di pojok kiri atas), perluas **Khotbah**, lalu klik **Waktu Siaran Langsung**.
2. Klik tombol **Tambah Layanan** di bagian atas halaman untuk membuat layanan terjadwal baru. Layanan yang ada ditampilkan dalam tabel yang memuat nama, waktu, penyedia, dan durasi setiap layanan; klik ikon edit pada baris untuk mengubahnya.
3. Masukkan **Nama Layanan** (misalnya, "Ibadah Minggu Pagi").
4. Atur **Waktu Layanan** -- pilih hari dan jam layanan dimulai.
5. Atur **Berulang Setiap Minggu** ke **Ya** untuk layanan mingguan reguler, atau **Tidak** untuk acara satu kali.

### Mengonfigurasi Pengaturan Chat dan Video

6. Di bawah **Pengaturan Chat**, atur berapa menit sebelum dan sesudah layanan chat harus diaktifkan. Ini memungkinkan pengunjung mulai mengobrol sebelum layanan dimulai dan melanjutkannya setelahnya.
7. Di bawah **Pengaturan Video**, atur seberapa awal video siaran dimulai untuk konten hitung mundur atau konten sebelum layanan. Chat dibuka sejumlah menit tersebut *sebelum* video awal dimulai, sehingga waktu yang ditampilkan di samping pengaturan menit sebelum chat menghitung kedua angka. Misalnya, layanan pukul 10.00 dengan chat 15 menit sebelumnya dan awal video 5 menit, chat dibuka pukul 09.40.
8. Pilih khotbah yang akan diputar dari menu tarik-turun:
   - **Khotbah Terbaru** -- Otomatis memutar video yang paling baru ditambahkan.
   - **Layanan Langsung Saat Ini** -- Memutar siaran langsung Anda saat ini dari YouTube menggunakan Channel ID Anda.
   - Anda juga dapat memilih khotbah tertentu yang sudah Anda simpan.
9. Klik **Simpan** untuk menjadwalkan layanan Anda.

:::info
Layanan Anda akan diperbarui secara otomatis setiap minggu jika diatur berulang. Layanan tetap pada waktu lokal yang sama ketika waktu musim panas dimulai atau berakhir. Anda dapat menambahkan layanan sebanyak yang Anda butuhkan. Pengunjung akan melihat waktu layanan terjadwal berikutnya saat mereka membuka halaman streaming Anda.
:::

## Pengaturan Halaman Streaming

Untuk menyesuaikan tab dan tautan yang muncul di samping siaran langsung Anda, buka menu Jump, perluas **Khotbah**, dan klik **Pengaturan**. Halaman **Pengaturan Stream** menampilkan daftar **Tab Konten** Anda.

### Menambahkan Tab

1. Klik tombol **Tambah** untuk menambahkan tab baru ke halaman siaran langsung Anda.
2. Pilih **Jenis Tautan**: **URL Eksternal** untuk tautan kustom, atau salah satu tab **Chat** atau **Doa** yang telah dirancang sebelumnya.
3. Untuk tab Chat, cukup beri nama di kotak **Teks Tab**, dan pengaturannya selesai.
4. Untuk tab tertaut, masukkan nama tab, pilih ikon dengan mengklik tombol ikon, dan masukkan URL.
5. Tab yang telah Anda konfigurasi akan muncul di halaman siaran langsung agar pemirsa dapat mengakses sumber daya tambahan dan fitur interaktif.

### Melihat Pratinjau Siaran Anda

Di halaman **Waktu Siaran Langsung**, klik **Lihat Siaran Anda** di bagian atas halaman untuk melihat secara tepat bagaimana halaman siaran langsung Anda akan tampak bagi pengunjung, termasuk logo, waktu layanan, dan tab yang telah dikonfigurasi.

## Menyiapkan Siaran Langsung YouTube Anda

Untuk menghubungkan kanal YouTube Anda untuk siaran langsung otomatis:

1. Buka **Khotbah** dan klik **Tambah Khotbah**, lalu pilih **Tambah URL Live Permanen**.
2. Penyedia video secara default adalah **Siaran Langsung YouTube Saat Ini**. Masukkan **YouTube Channel ID** Anda.
3. Tambahkan judul dan deskripsi, lalu klik **Simpan**.
4. Di **Waktu Siaran Langsung**, buat layanan dan pilih URL live permanen Anda dari menu tarik-turun khotbah.

:::tip
Untuk menemukan YouTube Channel ID Anda, buka pengaturan lanjutan kanal YouTube Anda dan salin nilai Channel ID.
:::

## Menyesuaikan Warna dan Logo

Halaman siaran langsung Anda menggunakan pengaturan [Tampilan](../website/appearance) situs web Anda:

- **Warna aksen terang** dengan teks gelap digunakan untuk header.
- **Warna aksen gelap** dengan teks terang digunakan untuk sidebar.
- **Logo Latar Belakang Terang** Anda muncul di halaman streaming. Gunakan gambar dengan latar belakang transparan dan rasio 4:1.

Untuk mengubah ini, buka **Website** lalu **Tampilan** dan perbarui pengaturan [Palet Warna](../website/appearance#color-palette) dan [Logo](../website/appearance#logo-and-branding) Anda.

## Menambahkan Host Streaming

Untuk memberi anggota tim akses ke chat khusus host bersama chat publik:

1. Di menu Jump, pilih **Pengaturan > Peran**.
2. Klik tombol plus dan pilih **Tambah Peran Kustom**.
3. Beri nama peran "Host Streaming" dan klik **Simpan**.
4. Klik peran baru, lalu klik **Tambah** di bagian Anggota untuk menambahkan orang.
5. Gulir ke bawah ke **Edit Izin**, perluas bagian **Konten**, dan centang **Chat Host**.

Ketika host masuk ke halaman siaran langsung, tab **Chat Host** pribadi muncul di samping chat publik untuk percakapan khusus staf selama siaran.

:::info
Untuk detail lebih lanjut tentang membuat peran dan mengelola izin, lihat [Peran & Izin](../settings/roles-permissions.md).
:::

## Pemecahan Masalah

Jika siaran langsung YouTube otomatis Anda tidak tampil dengan benar saat menggunakan opsi "Siaran Langsung YouTube Saat Ini" dengan Channel ID Anda, coba langkah berikut:

**Gejala:**
- Embed siaran langsung menampilkan "Video tidak tersedia"
- Halaman dimuat tetapi tidak ada video yang muncul
- Embed YouTube langsung berfungsi, tetapi siaran langsung kanal otomatis tidak

**Solusi:**
Periksa kanal YouTube Anda untuk siaran langsung lama atau yang dijadwalkan mendatang, lalu hapus:

1. Buka YouTube Studio Anda.
2. Navigasi ke **Konten** lalu **Live**.
3. Cari siaran langsung terjadwal lama atau siaran terjadwal mendatang.
4. Hapus entri siaran langsung lama atau terjadwal ini.
5. Uji kembali halaman siaran langsung Anda.

:::warning
Embed siaran langsung kanal otomatis YouTube dapat diblokir ketika ada beberapa entri siaran langsung terjadwal atau yang sudah lewat di kanal Anda. Menghapusnya memungkinkan YouTube mengidentifikasi dan menayangkan siaran langsung Anda saat ini dengan benar.
:::

**Persyaratan tambahan:**
- Siaran langsung Anda harus diatur ke **Publik** (bukan Tidak Terdaftar atau Pribadi).
- Penyematan harus diizinkan di pengaturan siaran YouTube Anda.
- Pastikan Anda menggunakan penyedia **Siaran Langsung YouTube Saat Ini** (dengan Channel ID), bukan penyedia **YouTube** (dengan Video ID).

## Langkah Selanjutnya

- [Mengelola Khotbah](managing-sermons) -- Tambahkan khotbah ke pustaka Anda
- [Daftar Putar](playlists) -- Atur khotbah ke dalam seri
