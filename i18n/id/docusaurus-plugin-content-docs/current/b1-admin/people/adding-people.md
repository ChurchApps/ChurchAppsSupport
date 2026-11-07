---
title: "Menambahkan Orang"
description: "Tambahkan orang ke basis data gereja di B1 Admin, isi detailnya, dan hubungkan anggota keluarga ke dalam rumah tangga untuk check-in dan pelaporan."
---

# Menambahkan Orang

<div class="article-intro">

Bagian Orang adalah fondasi B1 Admin, yaitu basis data anggota gereja Anda. Setiap fitur lain (grup, kehadiran, donasi, formulir) terhubung dengan catatan orang. Panduan ini akan membantu Anda menambahkan seseorang ke basis data, mengedit detailnya, dan menghubungkan anggota keluarga ke dalam rumah tangga.

</div>

## Video Pelatihan

<YouTube id="NTL1UDQpx8s" title="Menambahkan Orang dan Rumah Tangga di B1" next="Mengimpor Basis Data Orang di B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Anda memerlukan akun B1 Admin yang aktif dengan izin untuk mengelola orang. Lihat [Peran & Izin](roles-permissions.md) jika Anda tidak yakin dengan tingkat akses Anda.
- Jika Anda akan menambahkan lebih dari beberapa orang, pertimbangkan untuk menggunakan alat [Impor CSV](importing-data.md) sebagai gantinya.

</div>

## Menambahkan Orang

1. Buka dasbor B1.church Admin.
2. Buka [Menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), perluas **People**, lalu klik **People**.
3. Klik tombol **Add Person** di header halaman. Halaman akan bergulir ke bawah ke formulir **Add New Person** di bawah direktori.
4. Isi **First Name**, **Last Name**, dan **Email** orang tersebut, lalu klik **Add**.

Halaman profil orang tersebut akan terbuka, siap untuk Anda tambahkan detail lainnya.

:::tip
Jika Anda beralih dari sistem manajemen gereja lain, fitur [Impor Data](importing-data.md) memungkinkan Anda memasukkan seluruh direktori dari berkas CSV, jauh lebih cepat daripada menambahkan orang satu per satu.
:::

### Peringatan Duplikat

Jika alamat email (atau, saat membuat orang dari formulir Edit lengkap, nomor telepon atau kecocokan nama depan + nama belakang + tanggal lahir) cocok dengan seseorang yang sudah ada di basis data Anda, dialog **Possible Duplicate** akan muncul sebelum catatan baru disimpan. Dialog ini mencantumkan setiap orang yang cocok beserta email, telepon, dan tanggal lahirnya agar Anda dapat membandingkan.

- Klik **Use Existing** di samping salah satu kecocokan untuk menggunakan catatan orang tersebut alih-alih membuat catatan baru.
- Klik **Create Anyway** untuk tetap menambahkan orang baru meskipun ada kemungkinan kecocokan.

Pemeriksaan duplikat hanya dilakukan saat Anda membuat orang yang benar-benar baru. Mengedit catatan yang sudah ada tidak pernah memicunya. Fitur ini hanya mencegah duplikat baru; fitur ini tidak menggabungkan dua catatan yang sudah ada.

## Mengedit Detail

1. Pada halaman profil orang tersebut, klik tombol **Edit** di bawah detail kontaknya di sisi kiri.
2. Di formulir **Personal Details**, isi informasi tambahan seperti **Title** (pilih Mr, Mrs, Miss, Ms, Dr, Prof, Rev, atau Pastor dari daftar, atau ketik sendiri, hingga 10 karakter), nama tengah, status keanggotaan (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, atau **Deceased**), tanggal, alamat, nomor telepon, dan (untuk anak-anak dan siswa) kelas dan sekolah.
3. Klik **Save** untuk menyimpan informasi pribadi.

Sisi kiri profil menampilkan foto, nama, status keanggotaan, detail kontak, nilai [bidang kustom](../settings/custom-fields.md), dan rumah tangga orang tersebut. Di bawah rumah tangga, **Added** menampilkan tanggal catatan dibuat (hanya untuk orang yang ditambahkan sejak akhir Oktober 2026). Klik foto untuk mengubahnya. Di bawah tombol **Edit** ada beberapa tindakan lain: **Workflow** (menambahkan orang ke [alur kerja](../serving/workflows.md)), **Merge**, **Export**, dan **Export Data**.

Bagian lain dari profil menampilkan ringkasan untuk setiap jenis informasi terkait:

- **Attendance**: Menampilkan minggu-minggu terakhir yang dihadiri orang tersebut dan kunjungan terbarunya. Klik **All years** untuk melihat seluruh riwayat kunjungan, termasuk kampus, layanan, waktu layanan, grup, dan kolom **Checked In** dengan waktu check-in kiosk (ditampilkan sebagai tanda strip untuk kunjungan yang tercatat tanpa check-in kiosk), atau klik **Print** untuk mencetaknya (hasil cetakan menampilkan logo dan nama gereja Anda di tengah atas, di atas nama orang tersebut). Untuk tren kehadiran seluruh gereja, bukan riwayat satu orang, lihat [Melacak Kehadiran](../attendance/tracking-attendance.md).
- **Donations**: Menampilkan pemberian tahun ini, termasuk pemberian untuk dana yang tidak dapat dikurangkan pajak. Klik **All years** untuk [riwayat donasi](../donations/recording-donations.md) lengkap, atau **Log a gift** untuk mencatat pemberian baru. Jika gereja Anda mengaktifkan [Privasi Pemberian](../settings/church-settings.md#giving-privacy), jumlahnya tetap tersembunyi hingga Anda mengklik **Show giving**.
- **Groups**: Mencantumkan [keanggotaan grup](../groups/group-members.md) orang tersebut, dengan **Joined** dan tanggal bergabung di setiap grup jika tercatat.
- **Notes**: Menampilkan catatan terbaru tentang orang tersebut (perawatan pastoral, tindak lanjut, dan sebagainya). Klik **All notes** untuk membaca dan menambahkan catatan. Setiap catatan menampilkan siapa yang menulisnya serta tanggal dan waktu pengirimannya. Untuk melihat catatan terbaru dari semua orang sekaligus, gunakan halaman [Catatan](./notes.md).
- **Forms**: Mencantumkan formulir orang tersebut dan apakah setiap formulir sudah dikirim (lihat [Bekerja dengan Formulir](#working-with-forms) di bawah).

Saat Anda membuka salah satu tampilan lengkap ini, klik tautan **Back to** dengan nama orang tersebut di bagian atas untuk kembali ke profil.

## Mengirim Email kepada Orang

Jika orang tersebut memiliki alamat email yang tercatat, tombol **Email** akan muncul di bawah detail kontaknya di sisi kiri profil.

1. Pada profil orang tersebut, klik **Email**.
2. Dialog **Email** yang berjudul nama orang tersebut akan terbuka, menampilkan **Sending to** dengan alamat orang tersebut.
3. Secara opsional, pilih templat tersimpan dari **Load Template (optional)**.
4. Masukkan **Subject** dan tulis pesannya.
5. Klik **Send Email**.

Untuk menulis pesan di aplikasi email Anda sendiri, klik **Open in my email app**.

:::info
Pengiriman dari B1 menggunakan persetujuan dan batas harian yang sama dengan email grup. Jika gereja Anda belum disetujui, dialog akan meminta Anda untuk mengajukan peninjauan. Anda tetap dapat mengklik **Open in my email app** sementara itu. Lihat [Mengaktifkan Email Grup untuk Gereja Anda](../groups/group-members.md#turning-on-group-email-for-your-church). Pengguna yang tidak memiliki izin untuk mengedit anggota grup akan langsung dibawa ke aplikasi email mereka saat mengklik **Email**.
:::

## Bekerja dengan Formulir

Anda dapat mengisi formulir kustom langsung dari profil seseorang. Ini adalah formulir yang didefinisikan pengguna dan dapat Anda buat dengan mengikuti panduan [Membuat Formulir](../forms/creating-forms.md).

1. Pada profil orang tersebut, temukan bagian **Forms**. Bagian ini mencantumkan setiap formulir beserta statusnya, apakah sudah **Submitted** atau **Not submitted**.
2. Klik nama formulir untuk membukanya (atau klik **All forms** untuk melihat daftar lengkap).
3. Klik **ikon edit** (pensil) pada formulir, isi detailnya, lalu klik **Save**.

Setelah formulir dikirim, klik **ikon cetak** di sampingnya untuk mencetak jawaban yang telah diisi orang tersebut. Jika orang tersebut hanya memiliki satu pengiriman untuk suatu formulir, formulir tersebut menampilkan **Submitted** beserta tanggalnya di atas jawaban.

Jika sebuah pengiriman tercatat pada orang yang salah, klik ikon **Change person** (dua panah) di sampingnya untuk memindahkannya ke orang lain atau melepas tautannya. Lihat [Mengubah Orang pada Pengiriman](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formulir yang ditautkan ke profil orang menggunakan jenis formulir **People**. Jika Anda memerlukan formulir mandiri (seperti pendaftaran acara), lihat [opsi formulir Stand Alone](../forms/creating-forms.md) di panduan formulir.
:::

:::tip
Jika Anda hanya perlu melacak satu atau dua informasi tambahan tentang orang, seperti tanggal, angka, atau jawaban ya/tidak, gunakan [Bidang Kustom](../settings/custom-fields.md) sebagai ganti formulir. Bidang kustom lebih cepat diisi dan dapat langsung dicari di Pencarian Lanjutan.
:::

## Mengelola Rumah Tangga {#managing-households}

Rumah tangga memungkinkan Anda menghubungkan anggota keluarga satu sama lain. Ini sangat berguna untuk [check-in](../attendance/check-in.md), karena orang tua dapat melakukan check-in untuk semua anaknya sekaligus.

1. Pada profil seseorang, klik **Edit** di samping judul **Household** di sisi kiri.
2. Editor rumah tangga akan terbuka. Pilih **household role** untuk orang saat ini (misalnya, Head, Spouse, Child, Other).
3. Klik ikon **Add** untuk menambahkan anggota rumah tangga lain.
4. Di bawah **Add Household Member**, ketik nama orang tersebut di kotak pencarian lalu tekan **Enter** atau klik ikon pencarian. (Sebelum Anda mengetik, daftar singkat **Recent people** akan ditampilkan.)
5. Saat orang tersebut muncul di hasil, klik namanya atau ikon tambah di sampingnya.
6. Pilih peran rumah tangganya, lalu klik **Save** untuk menyelesaikan pengaturan rumah tangga.
