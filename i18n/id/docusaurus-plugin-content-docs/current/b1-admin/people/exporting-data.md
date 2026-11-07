---
title: "Mengekspor Data"
description: "Ekspor orang ke CSV, daftar anggota grup, atau cadangan basis data B1 lengkap dari B1 Admin, dan lihat isi B1 Export Zip."
---

# Mengekspor Data

<div class="article-intro">

B1 Admin memungkinkan Anda mengekspor data gereja agar dapat digunakan di spreadsheet, dibagikan kepada tim, atau disimpan sebagai cadangan. Baik Anda membutuhkan daftar nama dan email dengan cepat maupun ekspor database lengkap, tersedia berbagai pilihan yang sesuai dengan kebutuhan Anda.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Anda memerlukan akun B1 Admin yang aktif dengan izin untuk melihat data yang ingin diekspor. Lihat [Peran & Izin](roles-permissions.md) jika Anda tidak yakin dengan tingkat akses Anda.
- Untuk ekspor database lengkap, Anda memerlukan akses ke area **Pengaturan**.

</div>

## Mengekspor dari Halaman Jemaat

Cara tercepat untuk mengekspor direktori Anda adalah langsung dari halaman **Jemaat**:

1. Buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas B1 Admin), perluas **Jemaat**, lalu klik **Jemaat**.
2. Gunakan bilah pencarian atau filter untuk mempersempit hasil yang ingin Anda ekspor (atau biarkan tanpa filter untuk mengekspor semua orang). Lihat [Mencari Jemaat](searching-people.md) untuk tips pemfilteran.
3. Klik tombol **Ekspor** di header halaman Jemaat.
4. Sebuah file CSV akan diunduh ke komputer Anda berisi orang-orang dalam hasil Anda saat ini, termasuk nama, informasi kontak, alamat, dan bidang standar lainnya.

:::tip
Ekspor mencakup semua orang dalam hasil Anda saat ini. Jalankan pencarian, muat [Daftar Tersimpan](./lists.md), atau gunakan pencarian **Lanjutan** terlebih dahulu untuk mengekspor hanya orang-orang yang Anda butuhkan.
:::

## Ekspor Data Lengkap dari Pengaturan

Untuk ekspor lengkap semua data B1 Anda (bukan hanya jemaat), gunakan alat ekspor di Pengaturan:

1. Di menu Jump, pilih **Pengaturan > Pengaturan**.
2. Klik tautan **Impor/Ekspor** di bawah nama gereja Anda di bagian atas menu pengaturan sisi kiri.
3. Pilih **Database B1** dari dropdown **Sumber Data**.
4. Tinjau pratinjau data dan klik **Lanjutkan ke Tujuan**.
5. Pilih **Zip Ekspor B1** sebagai tujuan ekspor.
6. Pantau kemajuan ekspor hingga semua item menampilkan tanda centang hijau.
7. File ekspor akan otomatis terunduh. Cari file `B1Export` di folder unduhan Anda.
8. Ekstrak file zip untuk mengakses file CSV individual (seperti `people.csv`) yang dapat Anda buka di Excel, Google Sheets, atau Numbers.

:::info
B1 Export Zip adalah cadangan lengkap data gereja Anda. Isinya meliputi:

- jemaat (beserta foto) dan keluarga, termasuk kontak penjemputan keluarga
- kampus, layanan, dan jadwal layanan
- kelompok dan anggota kelompok
- dana dan donasi, termasuk pemberian yang dibagi ke beberapa dana
- kehadiran
- formulir, pertanyaan, pengiriman, dan jawaban
- bidang kustom dan nilainya
- daftar jemaat tersimpan

Jika foto seseorang tidak dapat diunduh atau dibaca selama ekspor, foto tersebut akan dilewati dan ekspor tetap dilanjutkan tanpa foto itu.

Untuk memulihkannya, pilih **Zip Impor B1** sebagai sumber dan **Database B1** sebagai tujuan (lihat [Mengimpor Data](./importing-data.md)). Keluarga, kontak penjemputan, dan daftar tersimpan akan dibangun kembali bersama jemaat. Filter daftar tersimpan akan diarahkan ke kelompok, dana, kampus, dan bidang kustom yang telah dipulihkan.
:::

## Mengekspor Data Kelompok

Anda juga dapat mengekspor daftar anggota untuk kelompok tertentu. Dari halaman **Kelompok**, buka sebuah kelompok lalu klik **ikon unduh** untuk mengekspor daftar anggota kelompok tersebut. Lihat [Anggota Kelompok](../groups/group-members.md) untuk detail selengkapnya.

:::info
File CSV hasil ekspor dapat digunakan di semua aplikasi spreadsheet utama, termasuk Microsoft Excel, Google Sheets, dan Apple Numbers.
:::
