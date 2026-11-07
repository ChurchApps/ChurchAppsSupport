---
title: "Keamanan Check-In"
---

# Keamanan Check-In

<div class="article-intro">

B1 menyediakan sejumlah kontrol keamanan anak untuk check-in: batas kapasitas ruangan dan rasio relawan-anak, panduan usia dan tingkat kelas di kiosk, jenis check-in yang membedakan anggota, tamu, dan relawan, serta daftar penjemputan terpercaya untuk setiap keluarga yang diverifikasi saat check-out. Halaman ini menjelaskan cara mengonfigurasi setiap fitur keamanan di B1 Admin.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Siapkan [struktur kehadiran](setup.md) dan [kiosk check-in](check-in.md) Anda
- Ruangan adalah [grup](../groups/creating-groups.md) yang terhubung dengan jadwal ibadah. Pengaturan keamanan di bawah ini terdapat pada grup
- Fitur memanggil orang tua dan siaran darurat memerlukan penyedia layanan pesan teks yang terhubung ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), atau Mutual Ministry)

</div>

## Kapasitas Ruangan dan Menutup Ruangan

Setiap ruangan check-in (grup) dapat menerapkan batasannya sendiri. Buka grup, klik **Edit** untuk mengubah pengaturannya, lalu temukan bagian **Check-In Capacity**:

- **Capacity** -- Jumlah maksimum orang yang dapat di-check-in ke ruangan ini pada saat yang sama. Ketika ruangan penuh, check-in ke ruangan tersebut diblokir dan kiosk menyebutkan nama ruangan yang penuh.
- **Guest Capacity** -- Batas terpisah yang bersifat opsional untuk jumlah tamu yang dapat ditampung ruangan.
- **Closed for Check-In** -- Setel ke **Yes** untuk menghentikan semua check-in ke ruangan ini secara langsung (misalnya, ketika kelas dibatalkan atau ruangan tidak tersedia). Check-out tetap dapat dilakukan.

## Rasio Relawan

Bagian **Check-In Capacity** yang sama pada grup juga mencakup aturan staf:

- **Children per Volunteer** -- Jumlah maksimum anak yang dapat dijaga oleh setiap relawan yang sudah di-check-in (misalnya, 5 berarti satu relawan untuk lima anak).
- **Minimum Volunteers** -- Jumlah relawan terkecil yang harus sudah di-check-in sebelum anak-anak dapat di-check-in ke ruangan.

Relawan dihitung dalam aturan ini ketika mereka check-in dengan jenis **Volunteer** di kiosk (lihat [Jenis Check-In](#check-in-types) di bawah).

### Memilih Peringatan atau Blokir

Seberapa ketat rasio diterapkan adalah pengaturan untuk seluruh gereja:

1. Di B1 Admin, buka **Settings** lalu buka bagian **Check-In**.
2. Atur **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- Kiosk menampilkan peringatan ketika ruangan melebihi rasio atau berada di bawah jumlah minimum relawan, dan staf dapat mengonfirmasi untuk tetap melanjutkan. Ini adalah pengaturan bawaan.
   - **Block (prevent check-in)** -- Check-in ke ruangan ditolak sampai jumlah relawan yang di-check-in mencukupi.

:::info
Capacity dan Closed for Check-In selalu merupakan batas keras. Pilihan peringatan atau blokir hanya berlaku untuk rasio relawan.
:::

## Jenis Check-In

Setiap check-in mencatat apakah orang tersebut adalah **Member** (anggota), **Guest** (tamu), atau **Volunteer** (relawan). Jenis dipilih melalui chip pada layar keluarga di kiosk (Member adalah pilihan bawaan). Jenis ini menjadi dasar aturan keamanan: relawan memberikan cakupan rasio, dan tamu dihitung terhadap Guest Capacity ruangan.

## Panduan Ruangan Berdasarkan Usia dan Tingkat Kelas

Anda dapat memberikan batas usia atau tingkat kelas untuk setiap ruangan agar kiosk memandu keluarga ke ruangan yang sesuai:

- Pada pengaturan grup, gunakan bagian **Age & Grade** untuk menetapkan usia minimum/maksimum (tahun dan bulan) dan/atau tingkat kelas untuk ruangan.
- Di kiosk, ruangan yang sesuai dengan anak akan disorot dan ruangan yang tidak sesuai akan dibuat redup. Ruangan yang redup tetap dapat dipilih dengan konfirmasi staf. Panduan ini tidak pernah memblokir secara keras.

Tingkat kelas berganti pada **tanggal kenaikan tingkat** gereja Anda:

1. Di B1 Admin, buka **Settings** lalu buka bagian **Grade Promotion**.
2. Atur bulan dan tanggal ketika gereja Anda menaikkan tingkat siswa (misalnya, 1 Agustus). Usia dan tingkat kelas di kiosk dihitung berdasarkan tanggal kenaikan terakhir.

## Orang Penjemput Terpercaya dan Tidak Diizinkan

Setiap keluarga dapat memiliki daftar orang yang diizinkan atau tidak diizinkan untuk menjemput anak-anaknya.

1. Buka halaman seseorang di **People** lalu temukan kartu **Pickup**.
2. Klik **Add**. Cari orang yang sudah ada, atau tambahkan seseorang yang belum ada di sistem dengan memasukkan **Name**, **Relationship**, dan foto.
3. Atur **Status**:
   - **Trusted** -- Saat check-out, orang ini muncul sebagai kartu penjemputan yang dapat diketuk beserta fotonya, sehingga penjemputan terverifikasi berlangsung cepat.
   - **Not Authorized** -- Jika seseorang mencoba menjemput dengan nama ini, kiosk memblokir check-out dengan peringatan. Staf dapat menimpa keputusan ini, dan penimpaan tersebut dicatat pada rekaman kehadiran.

Klik chip status seseorang pada kartu untuk beralih antara Trusted dan Not Authorized.

:::tip
Tambahkan foto untuk orang penjemput terpercaya sebisa mungkin. Layar check-out menampilkan foto sehingga relawan dapat memverifikasi secara visual orang yang berdiri di hadapan mereka.
:::

## Memanggil Orang Tua dan Siaran Darurat

Kedua fitur ini mengirim pesan teks melalui penyedia layanan pesan teks gereja Anda yang terhubung. Tidak ada layanan SMS bawaan, jadi salah satu penyedia yang didukung harus dikonfigurasi terlebih dahulu.

- **Page a parent** -- Dari layar check-out kiosk yang dijaga, staf dapat mengirim pesan teks kepada orang tua/wali anak yang sudah di-check-in (misalnya, "Mohon segera datang ke ruang bayi").
- **Emergency broadcast** -- Dari pengaturan admin kiosk, staf dapat mengirim pesan teks kepada wali dari setiap keluarga yang sudah di-check-in untuk jadwal ibadah yang dipilih sekaligus. Untuk mengirim, Anda harus mengetik **EMERGENCY** untuk konfirmasi.

Orang yang telah berhenti berlangganan pesan teks, atau yang tidak memiliki nomor ponsel tercatat, akan dilewati secara otomatis. Kiosk akan melaporkan berapa pesan yang terkirim dan berapa yang dilewati.

Lihat panduan dari sisi kiosk di [Check-Out & Keamanan Anak](../../b1-checkin/check-in/checking-out).

## Artikel Terkait

- [Check-In](check-in.md) — pengaturan kiosk dan perangkat keras
- [Check-Out & Keamanan Anak](../../b1-checkin/check-in/checking-out) — alur check-out kiosk, verifikasi penjemputan, dan pemanggilan
- [Membuat Grup](../groups/creating-groups.md) — tempat pengaturan ruangan berada
- [Pengaturan Kehadiran](setup.md) — layanan, jadwal ibadah, dan penugasan ruangan
- [Usia Minimum untuk Pesan Pribadi](../settings/mobile-app.md#member-directory--messaging-settings) — memblokir percakapan pesan pribadi baru dengan anak-anak sambil tetap mempertahankan mereka di direktori
