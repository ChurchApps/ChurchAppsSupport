---
title: "Peran & Izin"
---

# Peran & Izin

<div class="article-intro">

Peran memungkinkan Anda mengontrol apa yang dapat diakses oleh pengguna yang berbeda dalam akun ChurchApps Anda. Anda dapat membuat peran kustom untuk staf, relawan, dan anggota tim lainnya, masing-masing dengan tingkat akses mereka sendiri untuk menjaga keamanan data Anda.

</div>

## Video Pelatihan

<YouTube id="ZzCIkinVMnE" title="Peran, Izin, dan Mengundang Tim Anda di B1" next="Menyiapkan Layanan dan Kehadiran di B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Anda memerlukan akses Domain Admin atau peran dengan izin untuk mengelola peran
- Siapkan daftar anggota tim dan area yang mereka perlukan aksesnya
- Tinjau kategori izin yang tersedia di bawah untuk merencanakan peran Anda

</div>

## Mengakses Peran

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas) dan perluas **Pengaturan**.
2. Klik **Peran**.
3. Halaman Peran menampilkan semua peran yang saat ini ditetapkan untuk gereja Anda. Kolom **Anggota** menunjukkan berapa banyak pengguna di setiap peran, dan baris **(Everyone)** menampilkan **Semua pengguna**.

## Memahami Halaman Peran

Halaman Peran terbagi menjadi dua panel:

- **Sisi kiri** -- Menampilkan daftar anggota yang ditetapkan ke peran yang dipilih.
- **Sisi kanan** -- Menampilkan pengaturan izin yang dapat Anda konfigurasi untuk peran tersebut.

Klik nama peran mana pun untuk melihat dan mengelola anggota serta izinnya.

## Menambahkan Pengguna ke Peran

1. Pilih peran yang ingin Anda tambahkan anggotanya.
2. Gunakan **kolom pencarian** di sisi kiri untuk menemukan orang yang ingin Anda tambahkan.
3. Pilih orang tersebut dari hasil pencarian.
4. Mereka akan langsung ditambahkan ke peran tersebut.

## Menghapus Pengguna dari Peran

1. Pilih peran yang berisi pengguna yang ingin Anda hapus.
2. Temukan orang tersebut dalam daftar anggota di sisi kiri.
3. Klik **tombol hapus** di sebelah namanya.

## Mengonfigurasi Izin

Setiap peran dapat diberi akses ke area tertentu di B1 Admin. Di panel **Edit Izin**, izin dikelompokkan ke dalam bagian yang dapat Anda perluas, seperti **Kehadiran**, **Konten**, **Donasi**, **Formulir dan Rencana**, **Pelajaran**, **Pesan**, **Orang dan Grup**, dan **Tugas**. Ketik di kotak **Filter izin** untuk hanya menampilkan izin yang cocok.

Centang atau hapus centang pada izin untuk memberikan atau mencabutnya dari peran. Judul setiap bagian menunjukkan berapa banyak izinnya yang dimiliki peran tersebut, misalnya **2 dari 5**, dan jumlah ini diperbarui saat Anda mencentang dan menghapus centang kotak.

### Izin Donasi

Bagian **Donasi** memiliki izin berikut:

- **Lihat Ringkasan Donasi** -- melihat bagian Donasi, termasuk halaman Ringkasan, Batch, Dana, Kampanye, dan Laporan Pemberian.
- **Lihat Donasi** -- melihat donasi individual, seperti pemberian di dalam batch.
- **Edit Donasi** -- kontrol penuh: menambah, mengedit, dan menghapus donasi serta batch, dan [menutup dan membuka kembali batch](../donations/batches.md#closing-and-reopening-a-batch).
- **Masukkan Donasi** -- menambah batch dan memasukkan, mengedit, atau menghapus donasi, tetapi hanya di batch yang masih terbuka. Orang yang hanya memiliki izin ini tidak dapat menghapus batch, menutup atau membukanya kembali, atau mengubah pemberian yang masuk melalui pemberian online.
- **Edit Pengaturan** -- mengelola pengaturan donasi.

Seseorang dengan **Masukkan Donasi** tetapi tanpa **Lihat Ringkasan Donasi** hanya melihat halaman **Batch** di bawah **Donasi**. Berikan kepada peran tim penghitung baik **Masukkan Donasi** maupun **Lihat Donasi** agar mereka dapat membuka batch dan melihat pemberian yang mereka masukkan. Lihat [Siapa yang Dapat Mengubah Batch](../donations/batches.md#who-can-change-a-batch) untuk detailnya.

### Hanya Nama Orang

Bagian **Orang dan Grup** mencakup **Lihat Nama Orang Saja**. Gunakan izin ini untuk relawan yang perlu mencari orang berdasarkan nama -- misalnya, untuk memilih seseorang di kotak pencarian -- tanpa akses ke direktori lengkap. Dengan izin ini saja, seseorang:

- Dapat mencari orang berdasarkan nama dan melihat daftar orang yang baru ditambahkan, tetapi hanya melihat nama, foto, dan status keanggotaan setiap orang
- Tidak dapat mencari berdasarkan email, melihat detail kontak, atau membuka direktori **Orang**

Padukan **Lihat Nama Orang Saja** dengan **Lihat Kehadiran** atau **Edit Kehadiran** untuk relawan yang mencatat kehadiran kelas. **Orang** di menu mereka kemudian akan membuka **Grup**, tempat mereka dapat membuka daftar **Semua grup** dan melihat nama anggota serta sesi setiap kelas. Dengan **Edit Kehadiran**, mereka juga dapat [mencatat kehadiran](../attendance/recording-attendance.md) dan menambahkan pengunjung dengan mencari nama mereka. Nama tidak ditautkan ke catatan orang, dan grup rahasia tetap tersembunyi kecuali relawan tersebut adalah anggotanya.

B1 Admin menyembunyikan tautan dan tombol yang memerlukan izin yang tidak dimiliki suatu peran. Misalnya, daftar **Semua grup** hanya tersedia bagi orang yang dapat mengedit grup, melihat anggota grup, atau melihat orang, atau yang memiliki **Lihat Nama Orang Saja** bersama **Lihat Kehadiran** atau **Edit Kehadiran** (pengguna lain akan dikembalikan ke Dasbor). Pengaturan kehadiran hanya muncul dengan **Edit Layanan**. Tombol **Email** sebuah grup hanya muncul bagi orang yang memiliki **Edit Anggota Grup** (izin yang diperlukan untuk mengirim email grup). Mencetak daftar anggota grup memerlukan **Lihat Anggota Grup** atau menjadi pemimpin grup tersebut, dan menghapus acara kalender memerlukan **Edit Konten** (atau membatalkan permintaan tertunda Anda sendiri).

### Akun Kiosk Check-In

Akun yang masuk ke kiosk [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) memerlukan izin **Checkin** di bagian **Kehadiran** (atau **Edit Kehadiran**). Dengan **Checkin** saja, kiosk dapat mencari keluarga berdasarkan nama atau telepon, melakukan check-in dan check-out, serta menampilkan siapa yang boleh menjemput anak, tanpa akses ke direktori Orang.

Izin Checkin tidak lagi diberikan melalui baris **(Everyone)**. Menjadi bagian dari peran dengan izin lain tidak memungkinkan seseorang menjalankan kiosk; tambahkan **Checkin** ke peran seperti “Relawan Check-In” dan masukkan akun kiosk ke dalamnya.

:::warning
**Domain Admin** memiliki akses penuh ke semua area akun ChurchApps Anda. Izin mereka tidak dapat diubah atau dibatasi. Gunakan peran ini hanya untuk administrator Anda yang paling tepercaya.
:::

:::tip
Buat peran khusus seperti “Bendahara” hanya dengan akses **Donasi**, “Tim Penghitung” dengan **Masukkan Donasi** dan **Lihat Donasi**, atau “Relawan Check-In” hanya dengan akses **Kehadiran**. Ini mengikuti prinsip hak akses minimum dan menjaga keamanan data Anda. Lihat [Keamanan Data](./data-security.md) untuk informasi lebih lanjut tentang cara ChurchApps melindungi informasi Anda.
:::
