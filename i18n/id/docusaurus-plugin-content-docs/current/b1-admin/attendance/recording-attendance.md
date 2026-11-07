---
title: "Mencatat Kehadiran"
---

# Mencatat Kehadiran

<div class="article-intro">

Setelah kampus, jadwal ibadah, dan kelompok Anda diatur, Anda dapat mencatat kehadiran secara manual setelah setiap pertemuan. B1 Admin mengelola kehadiran berdasarkan **sesi** -- satu sesi untuk setiap kelompok pada setiap tanggal pertemuan. Anda membuat sesi, menandai siapa yang hadir, dan datanya langsung masuk ke laporan kehadiran Anda.

</div>

## Video Pelatihan

<YouTube id="gS8h2rhyMys" title="Mencatat dan Melacak Kehadiran di B1" next="Membuat Rencana dan Menjadwalkan Relawan di B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Kampus, jadwal ibadah, dan kelompok Anda harus sudah dikonfigurasi. Lihat [Pengaturan Kehadiran](setup.md) jika Anda belum melakukannya.
- Kelompok yang ingin Anda lacak harus mengaktifkan **Lacak Kehadiran**. Lihat [Pengaturan Kehadiran](setup.md) untuk detailnya.
- Anda memerlukan izin **Edit Kehadiran** untuk menyimpan kehadiran. Relawan yang hanya memiliki izin **Lihat Hanya Nama Orang** dapat tetap mencatat kehadiran dengan cara ini -- mereka membuka kelas dari **Kelompok** dan hanya melihat anggota berdasarkan nama. Lihat [Hanya Nama Orang](../settings/roles-permissions.md#people-names-only).

</div>

## Membuat Sesi

Sesi mewakili satu kali pertemuan kelompok -- misalnya, kelas kelas K--3 pada hari Minggu tertentu.

1. Buka **B1 Admin**, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas), perluas **Orang**, lalu klik **Kelompok**.
2. Pilih kelompok yang ingin Anda catat kehadirannya.
3. Di bagian **Sesi** pada halaman kelompok, klik **Semua sesi**.
4. Klik **Baru** untuk membuat sesi baru.
5. Jika kelompok ditetapkan ke jadwal ibadah, pilih **Jadwal Ibadah**. Jika kelompok tidak terjadwal, kolom ini tidak akan muncul.
6. Pilih **Tanggal Sesi** -- bisa hari ini, tanggal lampau, atau tanggal mendatang.
7. Klik **Simpan**.

### Menambahkan Sesi untuk Setiap Kelas dalam Satu Jadwal Ibadah

Jika kelompok lain bertemu pada jadwal ibadah yang sama (misalnya, semua kelas anak Anda pada Minggu pukul 09.00), Anda dapat membuat sesi mereka sekaligus tanpa harus membuka setiap kelompok satu per satu.

1. Ikuti langkah di atas dan pilih **Jadwal Ibadah**.
2. Centang **Tambahkan juga untuk _N_ kelompok lainnya di _jadwal ibadah_**. Kotak centang menunjukkan berapa banyak kelompok lain yang ditetapkan ke jadwal ibadah tersebut. Opsi ini hanya muncul saat menambahkan sesi baru dan setidaknya ada satu kelompok lain yang bertemu pada waktu itu.
3. Klik **Simpan**.

Sesi dibuat untuk kelompok saat ini dan untuk setiap kelompok lain pada tanggal dan jadwal ibadah yang sama. Kelompok yang sudah memiliki sesi untuk tanggal dan jadwal ibadah tersebut akan dilewati, sehingga tidak ada sesi ganda.

:::tip
Anda dapat membuat sesi untuk tanggal lampau guna mengejar kehadiran yang belum dicatat, atau membuatnya lebih awal agar sudah siap saat kelompok Anda bertemu.
:::

## Catatan Sesi {#session-notes}

Setiap sesi dapat memiliki catatan -- rangkuman materi yang dibahas, pengumuman, atau permintaan doa.

1. Saat menambahkan sesi, atau setelah mengklik ikon **Edit** (pensil) di samping sesi dalam daftar, ketik di kotak **Catatan (materi yang dibahas, pengumuman, permintaan doa)** di bawah tanggal. Bilah alat memungkinkan Anda menambahkan teks tebal, daftar, dan tautan.
2. Klik **Simpan**.

Catatan akan muncul di bagian atas daftar kehadiran sesi. Catatan ini juga menjadi catatan pertemuan yang dibaca anggota kelompok di bagian **Pertemuan** pada halaman kelompok di B1.church, tempat pemimpin kelompok juga dapat menulis dan mengeditnya. Lihat [Detail Kelompok](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Menandai Kehadiran

Pilih sesi untuk melihat daftar kehadirannya. Setiap anggota kelompok tercantum dengan kotak centang, diurutkan berdasarkan nama belakang, dan siapa pun yang sudah tercatat hadir akan tercentang.

1. Centang kotak di samping setiap orang yang hadir. Gunakan **Pilih Semua** atau **Batal Pilih Semua** untuk mengubah status semua orang sekaligus.
2. Jumlah di atas daftar (misalnya, "12 dari 15 hadir") akan diperbarui saat Anda mencentang kotak.
3. Klik **Simpan Kehadiran**. Tidak ada yang tercatat sebelum Anda menyimpan, dan pesan akan mengonfirmasi saat penyimpanan selesai. Jika Anda mencoba menutup atau memuat ulang tab browser saat penyimpanan masih berjalan, browser akan memberi peringatan terlebih dahulu agar perubahan tidak hilang.

Menghapus centang pada orang yang sudah tercatat hadir lalu menyimpan akan menghapus mereka dari sesi tersebut.

### Menambahkan Pengunjung

Untuk mencatat seseorang yang bukan anggota kelompok, cari mereka di pencarian orang di samping daftar kehadiran. Jika mereka belum ada dalam database Anda, Anda dapat membuatnya langsung dari pencarian. Dalam kedua kasus, mereka akan ditambahkan ke daftar dalam keadaan sudah tercentang. Klik **Simpan Kehadiran** untuk mencatat mereka.

Orang yang sudah melakukan check-in di kiosk akan menampilkan label **Relawan** atau **Tamu**. Orang yang bukan anggota kelompok akan menampilkan label **Tamu**.

## Memeriksa Kelompok yang Masih Perlu Dicatat Kehadirannya

Ketika beberapa kelas bertemu pada jadwal ibadah yang sama, Anda dapat melihat sekilas kelas mana saja yang masih perlu dicatat kehadirannya untuk tanggal tersebut.

1. Buka sesi yang memiliki jadwal ibadah.
2. Klik **Siapa yang Masih Perlu Dicatat Kehadirannya** di bagian atas daftar kehadiran.
3. Sebuah dialog akan menampilkan setiap kelompok yang ditetapkan ke jadwal ibadah tersebut, dengan ringkasan seperti "5 dari 8 kelompok sudah dicatat" di bagian atas.

Kelompok yang tidak memiliki seorang pun yang ditandai hadir untuk tanggal tersebut akan menampilkan label **Belum dicatat** dan ditampilkan paling awal. Kelompok yang sudah memiliki kehadiran akan menampilkan **Sudah dicatat** beserta jumlah orang yang ditandai hadir (misalnya, "Sudah dicatat (12)"). Klik nama kelompok untuk membuka daftar sesinya dengan sesi untuk tanggal yang sama sudah dipilih, sehingga Anda dapat langsung mencatat kehadirannya. Jika kelompok belum memiliki sesi untuk tanggal tersebut, daftar sesinya akan terbuka agar Anda dapat menambahkannya.

:::tip
Gabungkan ini dengan **Cetak Semua Kelas** dan [menambahkan sesi untuk setiap kelas dalam satu jadwal ibadah](#adding-sessions-for-every-class-in-a-service-time): buat sesinya, bagikan lembar absen, lalu gunakan **Siapa yang Masih Perlu Dicatat Kehadirannya** untuk melihat lembar mana yang belum dimasukkan.
:::

## Mencetak Lembar Absen

Lembar absen adalah daftar kelas yang dapat dicetak, yang dapat ditandai secara manual oleh guru dan dikembalikan kepada Anda untuk dimasukkan nanti. Setiap lembar menampilkan logo gereja Anda (**Logo Latar Terang** dari [Situs Web > Tampilan](../website/appearance.md), jika Anda sudah mengunggahnya) dengan nama gereja di bawahnya, nama kelas, baris **Tanggal** yang besar di bawah nama kelas, dan jadwal ibadah. Anggota ditampilkan dalam dua kolom (dibaca ke bawah pada kolom kiri, lalu kolom kanan) agar lebih banyak nama muat dalam satu halaman, dan setiap anggota memiliki kotak **Hadir** dan **Tidak Hadir**. Tersedia juga baris kosong untuk pengunjung dan area **Guru / Catatan**.

- **Dari sesi** -- Klik ikon **Cetak Lembar Absen** (printer) di bagian atas daftar kehadiran sesi. Lembar akan diberi tanggal sesi tersebut dan menampilkan jadwal ibadah sesi itu.
- **Semua kelas untuk satu ibadah** -- Jika sesi memiliki jadwal ibadah, klik **Cetak Semua Kelas** untuk mencetak satu lembar untuk setiap kelas yang ditetapkan ke jadwal ibadah tersebut. Setiap kelas dicetak di halamannya sendiri.
- **Dari daftar anggota** -- Pada halaman kelompok, klik **Semua anggota**, lalu klik ikon **Cetak Lembar Absen** di atas daftar anggota dan pilih **Lembar Kehadiran** untuk mencetak lembar tanpa tanggal. Menu yang sama juga memiliki tata letak **Daftar Kontak** yang memuat telepon, email, dan alamat setiap anggota -- lihat [Mencetak Daftar Anggota](../groups/group-members.md#printing-the-member-list).

Lembar akan terbuka di tab baru dan dialog cetak browser Anda akan muncul otomatis.

## Mengekspor Kehadiran ke Spreadsheet

Anda dapat mengunduh catatan sesi sebagai file CSV untuk digunakan di Excel, Numbers, atau Google Sheets.

1. Buka sesi yang ingin Anda ekspor.
2. Klik tombol **Ekspor** di bagian atas daftar kehadiran.
3. Buka file yang diunduh di aplikasi spreadsheet Anda.

File ini berisi satu baris untuk setiap anggota kelompok dengan nama mereka dan status hadir atau tidak hadir, serta tanggal sesi dan catatan sesi.

## Melihat Kehadiran yang Tercatat

Setelah mencatat sesi, datanya akan muncul di laporan kehadiran Anda.

- **Tab Tren Kehadiran** (di bawah **Semua tahun** pada halaman Kehadiran) -- menampilkan tren kehadiran seluruh gereja dari waktu ke waktu. Lihat [Melacak Kehadiran](tracking-attendance.md).
- **Tab Kehadiran Kelompok** -- menampilkan kehadiran yang dirinci per kelompok. Lihat [Laporan Kehadiran](../reports/attendance-reports.md#group-attendance).

:::tip
Jika sesi yang baru saja Anda buat tidak langsung muncul di laporan, pastikan tanggal sesi berada dalam rentang tanggal yang dipilih pada filter laporan.
:::
