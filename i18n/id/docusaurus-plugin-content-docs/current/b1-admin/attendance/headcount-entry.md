---
title: "Entri Jumlah Kehadiran & Tren"
description: "Masukkan total jumlah hadir untuk layanan atau grup di B1 Admin tanpa daftar nama, lalu pantau total mingguan di laporan Tren Jumlah Hadir."
---

# Entri Jumlah Kehadiran & Tren

<div class="article-intro">

Jumlah kehadiran memungkinkan Anda mencatat total kehadiran sederhana -- untuk sebuah ibadah, waktu ibadah, atau kelompok -- tanpa memeriksa daftar nama orang satu per satu. Gunakan fitur ini saat Anda hanya perlu tahu "berapa banyak orang yang hadir," dan padukan dengan laporan Tren Jumlah Kehadiran untuk memantau angka tersebut dari waktu ke waktu.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Kampus, ibadah, dan waktu ibadah Anda harus sudah dikonfigurasi. Lihat [Pengaturan Kehadiran](setup.md).
- Untuk memasukkan jumlah kehadiran diperlukan izin **Attendance &gt; Edit**; untuk melihat laporan tren diperlukan **Attendance &gt; View**. Lihat [Peran & Izin](../settings/roles-permissions.md).

</div>

:::info
Jumlah kehadiran adalah alternatif yang hanya berupa total, sebagai pengganti [Mencatat Kehadiran](recording-attendance.md). Jika Anda perlu tahu **siapa** yang hadir -- misalnya, untuk menindaklanjuti orang-orang yang sudah lama tidak datang -- tetap gunakan kehadiran sesi per nama di Sesi kelompok. Jumlah kehadiran hanya menyimpan sebuah angka.
:::

## Mencatat Jumlah Kehadiran

1. Buka **B1 Admin**, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), perluas **People**, lalu klik **Attendance**.
2. Klik **Enter headcount** di kolom kiri.
3. Isi formulir:
   - **Service** *(wajib)*
   - **Service Time** -- kosongkan untuk mencatat total dari semua waktu ibadah
   - **Group** -- opsional; hanya kelompok dengan Track Attendance yang aktif yang ditampilkan. Kosongkan untuk "No group (whole service)."
   - **Date**
   - **Headcount** -- total jumlah orang yang hadir
4. Klik **Save**.

Tabel **Recent Headcounts** di samping formulir menampilkan beberapa entri terakhir Anda beserta tanggal, ibadah, waktu ibadah, kelompok, dan jumlahnya. Klik sebuah baris untuk memuat kembali entri tersebut ke formulir jika Anda perlu memperbaiki atau menghapusnya.

## Laporan Tren Jumlah Kehadiran

1. Dari halaman **Attendance** yang sama, klik **All years** di kolom kiri, lalu pilih tab **Headcount Trend**.
2. Gunakan filter **Campus**, **Service**, **Service Time**, dan **Group** untuk mempersempit laporan.

Laporan menampilkan jumlah kehadiran yang telah Anda catat, dijumlahkan per minggu, dalam bentuk grafik garis dan tabel -- dengan gaya laporan yang sama seperti pada [tab Tren Kehadiran dan Kehadiran Kelompok](tracking-attendance.md). Jumlah kehadiran yang dimasukkan untuk minggu berjalan juga muncul di bawah **Headcounts this week** pada halaman Attendance utama.

## Halaman Terkait

- [Mencatat Kehadiran](recording-attendance.md) -- kehadiran sesi per orang, berdasarkan nama
- [Melacak Kehadiran](tracking-attendance.md) -- laporan tren kehadiran dan kelompok
- [Pengaturan Kehadiran](setup.md) -- mengonfigurasi kampus, ibadah, dan waktu ibadah
