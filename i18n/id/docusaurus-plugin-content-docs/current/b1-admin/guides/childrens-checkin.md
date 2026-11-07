---
title: "Panduan: Menyiapkan Check-In Pelayanan Anak"
description: "Atur check-in anak di B1 Admin: hubungkan keluarga, buat grup berdasarkan usia, atur layanan, dan cetak label nama untuk kios B1 Checkin."
---

# Menyiapkan Check-In Pelayanan Anak

<div class="article-intro">

Panduan ini memandu Anda melalui semua langkah yang diperlukan untuk menjalankan sistem check-in anak di gereja Anda, mulai dari memasukkan keluarga ke dalam basis data, mengatur kelompok sesuai usia, hingga mencetak tanda nama pada hari Minggu pagi. Setelah selesai, orang tua dapat melakukan check-in anak mereka di tablet kios dan menerima tanda keamanan yang cocok.

</div>

## Video Pelatihan

<YouTube id="Ep9CBUcJwPI" title="Menyiapkan Check-In Anak di B1" next="Mencatat dan Melacak Kehadiran di B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Buat akun gereja Anda di [admin.b1.church](https://admin.b1.church)
- Pastikan Anda memiliki akses admin — lihat [Peran & Izin](../people/roles-permissions.md) jika diperlukan
- Opsional: Siapkan file CSV berisi data keluarga jika Anda bermigrasi dari sistem lain

</div>

## Langkah 1: Tambahkan Keluarga ke Basis Data Anda

Sebelum check-in dapat berfungsi, sistem perlu mengetahui keluarga Anda. Setiap anak perlu dihubungkan dengan orang tuanya melalui fitur rumah tangga.

Ikuti panduan [Menambahkan Orang](../people/adding-people.md) untuk menambahkan setidaknya satu keluarga. Pastikan untuk:

- Menambahkan orang tua terlebih dahulu
- Menambahkan setiap anak
- Menghubungkan mereka dalam rumah tangga yang sama menggunakan [editor rumah tangga](../people/adding-people.md#managing-households)

:::tip
Jika Anda memiliki lebih dari beberapa keluarga untuk ditambahkan, gunakan alat [Impor CSV](../people/importing-data.md) alih-alih menambahkannya satu per satu. Anda dapat mengimpor seluruh direktori dalam hitungan menit.
:::

## Langkah 2: Buat Kelompok Anak

Kelompok menentukan kelas tempat anak-anak melakukan check-in. Biasanya Anda akan membuat satu kelompok untuk setiap rentang usia.

Ikuti panduan [Membuat Kelompok](../groups/creating-groups.md) untuk membuat kelompok seperti:

- **Nursery** (usia 0–2)
- **Prasekolah** (usia 3–5)
- **SD** (usia 6–10)

Anda dapat menyesuaikan nama dan rentang usia agar sesuai dengan struktur pelayanan Anda.

## Langkah 3: Atur Kampus dan Layanan

Check-in terikat pada jadwal ibadah tertentu. Anda perlu mengatur setidaknya satu kampus dan satu layanan.

Ikuti panduan [Pengaturan Kehadiran](../attendance/setup.md) untuk:

1. Menambahkan kampus Anda (misalnya, "Kampus Utama")
2. Menambahkan layanan (misalnya, "Ibadah Minggu Pagi")
3. Mengatur waktu layanan (misalnya, "09.00") dan, secara opsional, [jadwal check-in](../attendance/setup.md#setting-a-check-in-schedule) agar check-in terbuka otomatis sebelum setiap ibadah dan ditutup setelahnya
4. Menugaskan kelompok anak Anda ke layanan tersebut

## Langkah 4: Siapkan Aplikasi Check-In

Sekarang hubungkan semuanya dengan memasang aplikasi check-in di tablet.

1. Pasang **aplikasi B1 Checkin** — lihat artikel [Check-In](../attendance/check-in.md) untuk tautan unduhan
2. Masuk dengan kredensial B1 Admin Anda
3. Pilih kampus dan waktu layanan Anda

Lihat artikel lengkap [Check-In](../attendance/check-in.md) untuk langkah-langkah pengaturan yang terperinci.

## Langkah 5: Siapkan Perangkat Keras

Anda memerlukan tablet untuk kios dan, secara opsional, printer label Brother untuk tanda nama.

Minimal:
- **Satu tablet Android atau Amazon Fire** — lihat [tablet yang direkomendasikan](../attendance/check-in.md#recommended-hardware)
- **Satu printer label Brother** — QL-1110NWB direkomendasikan karena mendukung Bluetooth dan WiFi
- **Label Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Hanya printer label Brother yang kompatibel dengan aplikasi B1 Checkin. Printer merek lain tidak akan berfungsi.
:::

## Langkah 6: Jalankan Uji Coba Check-In

Sebelum hari Minggu pagi, lakukan uji coba:

1. Buka aplikasi B1 Checkin di tablet Anda
2. Pilih kampus dan waktu layanan yang benar
3. Cari salah satu keluarga yang telah Anda tambahkan
4. Lakukan check-in untuk seorang anak dan periksa:
   - Kehadiran muncul di B1 Admin pada bagian **Kehadiran**
   - Jika menggunakan printer, tanda nama tercetak dengan benar

:::tip
Latih relawan tim sambutan tentang proses check-in sebelum peluncuran. Pengarahan singkat selama 5 menit biasanya sudah cukup.
:::

## Selesai!

Check-in pelayanan anak gereja Anda sudah siap. Orang tua dapat mencari keluarga mereka, memilih anak-anak mereka, dan melakukan check-in di kios. Kehadiran dicatat secara otomatis di B1 Admin.

## Artikel Terkait

- [Menambahkan Orang](../people/adding-people.md) — tambahkan keluarga lain saat mereka berkunjung
- [Membuat Kelompok](../groups/creating-groups.md) — kelola kelompok anak Anda
- [Pengaturan Kehadiran](../attendance/setup.md) — atur kampus dan layanan
- [Check-In](../attendance/check-in.md) — pengaturan aplikasi check-in dan perangkat keras secara terperinci
- [Melacak Kehadiran](../attendance/tracking-attendance.md) — lihat laporan check-in
