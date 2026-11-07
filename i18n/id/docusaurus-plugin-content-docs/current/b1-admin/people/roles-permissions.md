---
title: "Menetapkan Peran"
---

# Menetapkan Peran

<div class="article-intro">

B1 Admin menggunakan sistem izin berbasis peran untuk mengatur apa yang dapat dilihat dan dilakukan setiap pengguna di tim Anda. Dengan menetapkan peran, Anda dapat memberikan staf dan relawan akses hanya ke area yang mereka butuhkan, tidak lebih. Pengelolaan peran yang tepat menjaga keamanan data gereja Anda sekaligus membantu tim bekerja lebih efisien.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan akses **Domain Admin** atau peran dengan izin untuk mengelola **Settings** di B1 Admin.
- Orang yang ingin Anda beri peran harus sudah ada di direktori Anda. Lihat [Menambahkan Orang](adding-people.md) jika Anda perlu menambahkan mereka terlebih dahulu.

</div>

## Memahami Peran

Peran adalah kumpulan izin yang Anda tetapkan kepada satu atau beberapa pengguna. Misalnya, Anda dapat membuat peran "Finance Team" yang memberi akses ke [catatan donasi](../donations/recording-donations.md), atau peran "Check-In Volunteer" yang hanya mengizinkan akses ke [fitur kehadiran](../attendance/check-in.md).

Setiap peran mengontrol akses ke area tertentu di B1 Admin, termasuk:

- **People** -- melihat dan mengedit profil anggota. Bagian Notes pada catatan seseorang memerlukan **Edit People**, dan izin terpisah **View Confidential Notes** mengontrol akses ke bagian Confidential Notes (untuk perawatan pastoral, riwayat pribadi, dan catatan sensitif lainnya). **View People Names Only** memungkinkan seseorang mencari orang berdasarkan nama (hanya melihat nama, foto, dan status keanggotaan) tanpa akses ke direktori lengkap. Dikombinasikan dengan **View Attendance** atau **Edit Attendance**, izin ini memungkinkan relawan membuka **Groups** dan melihat daftar kelas berdasarkan nama; dengan **Edit Attendance** mereka juga dapat [mencatat kehadiran](../attendance/recording-attendance.md). Lihat [People Names Only](../settings/roles-permissions.md#people-names-only).
- **Donations** -- mengelola kontribusi dan laporan keuangan. **Enter Donations** adalah opsi yang lebih terbatas untuk tim penghitung: opsi ini memungkinkan seseorang memasukkan persembahan, tetapi hanya di [batch](../donations/batches.md#who-can-change-a-batch) yang masih terbuka.
- **Attendance** -- mencatat dan melihat data kehadiran
- **Forms** -- membuat dan mengelola [formulir kustom](../forms/creating-forms.md)
- **Groups** -- mengelola [keanggotaan grup](../groups/group-members.md) dan kalender
- **Settings** -- mengonfigurasi pengaturan untuk seluruh gereja

:::warning
**Domain Admin** memiliki akses penuh ke setiap area B1 Admin. Izinnya tidak dapat diubah atau dibatasi. Gunakan peran ini hanya untuk administrator utama Anda.
:::

## Melihat dan Mengelola Peran

1. Buka [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (kolom pencarian di pojok kiri atas B1 Admin) lalu perluas **Settings**.
2. Klik **Roles**.
3. Anda akan melihat daftar semua peran yang dikonfigurasi untuk gereja Anda, dengan kolom **Members** yang menampilkan jumlah pengguna di setiap peran.
4. Klik peran mana pun untuk melihat anggotanya dan izinnya.

## Menambahkan Pengguna ke Peran

1. Di Jump menu, pilih **Settings > Roles**.
2. Klik peran yang ingin Anda tambahkan penggunanya.
3. Di bagian **Members**, cari orang tersebut berdasarkan nama.
4. Klik **Add** untuk menetapkannya ke peran tersebut.

Pengguna akan memiliki semua izin yang terkait dengan peran itu saat mereka masuk berikutnya.

## Mengedit Izin Peran

1. Di Jump menu, pilih **Settings > Roles**.
2. Klik peran yang ingin Anda ubah.
3. Di bagian **Permissions**, centang atau hapus centang area yang ingin Anda izinkan untuk peran tersebut. Setiap grup izin menampilkan berapa banyak izinnya yang dicentang (misalnya, **2 of 5**).
4. Setiap perubahan tersimpan segera setelah Anda mencentang atau menghapus centang pada kotak.

:::tip
Terapkan prinsip hak akses minimum: berikan setiap peran hanya izin yang benar-benar dibutuhkan. Ini menjaga keamanan data Anda dan mengurangi risiko perubahan yang tidak disengaja.
:::

## Contoh Peran Umum

- **Office Staff** -- akses ke People, Donations, Attendance, dan Forms
- **Group Leaders** -- hanya akses ke [Groups](../groups/creating-groups.md)
- **Check-In Volunteers** -- izin attendance **Checkin**, yang diperlukan oleh akun yang masuk ke [kiosk check-in](../attendance/check-in.md)
- **Finance Team** -- akses ke [Donations](../donations/recording-donations.md) dan pelaporan
- **Counting Team** -- **Enter Donations** dan **View Donations**, sehingga relawan dapat memasukkan persembahan ke dalam batch yang terbuka tanpa melihat ringkasan pemberian

Lihat [Roles & Permissions](../settings/roles-permissions.md) untuk penjelasan lebih lanjut tentang izin donasi dan orang.
