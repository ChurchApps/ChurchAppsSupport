---
title: "Laporan Kehadiran"
---

# Laporan Kehadiran

<div class="article-intro">

B1 Admin menyediakan tiga laporan kehadiran untuk membantu Anda memahami bagaimana orang-orang terlibat dalam layanan dan kelompok Anda. Setiap laporan menawarkan sudut pandang yang berbeda terhadap data kehadiran Anda, mulai dari tren tingkat tinggi hingga rincian harian.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Pastikan kehadiran [dicatat secara konsisten](../attendance/tracking-attendance.md) untuk layanan dan kelompok Anda
- Pastikan [kelompok](../groups/creating-groups.md) dan layanan Anda sudah dikonfigurasi di B1 Admin
- Anda memerlukan [izin](../settings/roles-permissions.md) yang sesuai untuk mengakses laporan

</div>

## Tren Kehadiran

Laporan Tren Kehadiran menunjukkan bagaimana kehadiran untuk layanan Anda berubah dari waktu ke waktu.

1. Buka langsung **admin.b1.church/reports/attendanceTrend** di peramban Anda (laporan tidak memiliki entri di menu navigasi, jadi menyimpan alamat ini sebagai bookmark adalah cara termudah untuk kembali ke sana). Laporan yang sama juga tersedia di halaman Kehadiran: klik **Semua tahun**, lalu pilih tab **Tren Kehadiran**.
2. Opsional, pilih **Kampus**, **Layanan**, **Waktu Layanan**, atau **Kelompok** untuk memfilter hasil.
3. Atur **Tanggal Mulai** dan **Tanggal Akhir**. Secara default, laporan mencakup satu tahun terakhir, dari satu tahun yang lalu hingga hari ini, dan tanggal akhir disertakan sepenuhnya. Klik **Jalankan Laporan**.
4. Laporan menampilkan diagram batang dan tabel total kunjungan per minggu. Setiap minggu diberi label dengan tanggal hari Minggu pada minggu tersebut, dan kolom **Tanggal Sesi** dalam tabel mencantumkan tanggal sebenarnya dalam minggu itu yang memiliki data kehadiran (misalnya, "9/27, 9/30").

Laporan ini berguna untuk melihat pola seperti penurunan musiman, tren pertumbuhan, atau dampak acara khusus.

## Kehadiran Kelompok

Laporan Kehadiran Kelompok menunjukkan siapa saja yang hadir dalam setiap sesi kelompok dalam rentang tanggal tertentu.

1. Buka langsung **admin.b1.church/reports/groupAttendance** di peramban Anda, atau di halaman Kehadiran klik **Semua tahun** dan pilih tab **Kehadiran Kelompok**.
2. Opsional, pilih **Kampus** dan **Layanan**.
3. Atur **Tanggal Mulai** dan **Tanggal Akhir**. Secara default, laporan mencakup hari Minggu terakhir hingga hari ini, dan tanggal akhir disertakan sepenuhnya.
4. Klik **Jalankan Laporan**.

Hasil dikelompokkan berdasarkan tanggal sesi, kemudian waktu layanan, lalu kelompok, dengan orang-orang yang hadir tercantum di bawah setiap kelompok. Waktu layanan, kelompok, dan nama diurutkan secara alfabetis. Di sebelah nama setiap orang, kolom **Check-in** menampilkan waktu kehadiran mereka dicatat (kosong jika tidak ada waktu yang tercatat), dan kolom **Status Keanggotaan** menampilkan statusnya, seperti Anggota atau Pengunjung. Sesi untuk kelompok yang tidak bertemu pada waktu layanan tertentu juga disertakan; sesi tersebut muncul tanpa waktu layanan.

Untuk mengunduh spreadsheet, klik **Opsi Unduh** dan pilih **Ringkasan**. Berkas CSV berisi:

- Satu baris untuk setiap anggota dari setiap kelompok yang bertemu dalam rentang tanggal, diurutkan berdasarkan kelompok lalu nama.
- Nama orang dan nama kelompok di kolom-kolom pertama.
- Satu kolom untuk setiap sesi yang bertanggal, dinamai dengan layanan, waktu layanan, dan tanggal (misalnya, "Minggu - 9:00 AM (2026-09-27)"), dengan setiap orang ditandai **hadir** atau **tidak hadir**. Sesi tanpa waktu layanan hanya diberi nama sesuai tanggalnya.

Gunakan laporan ini untuk membandingkan kehadiran antarkelompok dan mengidentifikasi kelompok mana yang berkembang atau perlu perhatian.

## Kehadiran Kelompok Harian

Laporan Kehadiran Kelompok Harian (berjudul **Kehadiran kelompok per hari**) memberikan jumlah harian orang yang hadir dalam satu kelompok.

1. Buka langsung **admin.b1.church/reports/dailyGroupAttendance** di peramban Anda.
2. Gunakan dropdown **Kampus**, **Layanan**, dan **Waktu Layanan** untuk mempersempit daftar, lalu pilih **Kelompok** yang ingin Anda tinjau.
3. Jalankan laporan. Laporan menampilkan setiap hari ketika kelompok tersebut bertemu, dari yang paling awal, dengan **Tanggal** dan jumlah **Peserta** yang tercatat pada hari itu.

Laporan ini memberikan detail yang lebih rinci, yang berguna untuk memahami variasi dari minggu ke minggu atau mengidentifikasi hari tertentu dengan kehadiran yang sangat tinggi atau rendah.

:::tip
Gunakan laporan Tren Kehadiran untuk gambaran umum tingkat tinggi, dan laporan Kehadiran Kelompok Harian ketika Anda perlu menelusuri tanggal-tanggal tertentu.
:::

## Penggunaan Praktis

- **Perencanaan** -- Gunakan tren kehadiran untuk merencanakan tempat duduk, staf, dan sumber daya untuk layanan yang akan datang.
- **Penjangkauan** -- Kenali pola penurunan kehadiran sejak dini agar Anda dapat menindaklanjuti anggota jemaat.
- **Laporan pengurus** -- Sertakan data kehadiran dalam laporan kepemimpinan rutin Anda untuk menunjukkan kesehatan pelayanan.
- **Evaluasi acara** -- Bandingkan kehadiran sebelum dan sesudah acara khusus untuk mengukur dampaknya.

:::warning
Data kehadiran dicatat melalui proses check-in kelompok dan layanan Anda. Jika kehadiran tidak dicatat secara konsisten, laporan Anda tidak akan mencerminkan partisipasi yang sebenarnya. Lihat [Mencatat Kehadiran](../attendance/tracking-attendance.md) untuk petunjuk pengaturan.
:::
