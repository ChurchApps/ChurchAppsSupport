---
title: "Mengimpor Data"
description: "Bawa data orang, grup, kehadiran, dan pemberian yang sudah ada ke B1 Admin dengan alat B1 Transfer, atau ekspor cadangan data kapan saja."
---

# Mengimpor Data

<div class="article-intro">

Alat B1 Transfer memudahkan Anda memindahkan data yang sudah ada ke B1, baik Anda memulai dari nol dengan spreadsheet, beralih dari platform manajemen gereja lain, maupun mengimpor catatan persembahan. Alat ini juga dapat digunakan untuk mengekspor atau mencadangkan data Anda kapan saja.

</div>

## Video Pelatihan

<YouTube id="G-VnhzACYIU" title="Mengimpor Basis Data Jemaat Anda di B1" next="Mencari Jemaat dan Membuat Daftar di B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan akun B1 Admin yang aktif dengan akses ke **Pengaturan**.
- Pastikan data Anda sudah diekspor dan siap dari sistem sebelumnya sebelum memulai.
- Alat ini ditujukan untuk migrasi data awal. Jika Anda sudah lama menggunakan B1, mengimpor ulang dapat membuat catatan duplikat.

</div>

## Membuka Alat Transfer

1. Masuk ke **B1 Admin**.
2. Buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (kolom pencarian di pojok kiri atas), perluas **Pengaturan**, lalu klik **Pengaturan**.
3. Klik tautan **Impor/Ekspor** di bawah nama gereja Anda di bagian atas menu pengaturan sebelah kiri.
4. Ini akan membuka alat **B1 Transfer** di tab baru di [transfer.b1.church](https://transfer.b1.church).

Alat transfer memandu Anda melalui empat langkah: Sumber, Pratinjau, Tujuan, dan Jalankan.

---

## Langkah 1 - Pilih Sumber Anda

Pilih asal data Anda. Ada tujuh pilihan:

- **B1 Database** — Mengambil data langsung dari gereja B1 Anda yang sudah ada. Berguna untuk membuat cadangan atau mengubah data ke format lain. Anda harus sudah masuk untuk menggunakan opsi ini.
- **B1 Import Zip** — Berkas zip dalam format B1 sendiri. Ini terutama digunakan untuk memulihkan ekspor B1 sebelumnya. Memuat B1 Export Zip kembali ke **B1 Database** akan memulihkan semua yang dibawa oleh ekspor tersebut (lihat [Mengekspor Data](./exporting-data.md#full-data-export-from-settings)). Jika berkas tidak dapat dibaca, alat akan menampilkan kesalahannya alih-alih memulai dari awal.
- **Breeze Import Zip** — Berkas zip yang berisi berkas ekspor dari Breeze ChMS.
- **Planning Center Zip** — Berkas zip atau CSV yang diekspor dari Planning Center.
- **Custom CSV / Excel** — Berkas CSV atau Excel apa pun yang berisi data jemaat. Setelah diunggah, Anda akan memetakan kolom ke bidang B1 sebelum impor dilanjutkan.
- **Tithe.ly CSV** — Berkas ekspor jemaat atau persembahan dari Tithe.ly (format CSV atau Excel diterima).
- **CCB / Pushpay CSV** — Berkas CSV ekspor jemaat atau persembahan dari Church Community Builder atau Pushpay.

Anda dapat menyeret dan melepas berkas ke area unggah, atau klik untuk mencarinya.

---

## Langkah 1b - Petakan Bidang Anda (hanya Custom CSV / Excel)

Jika Anda memilih **Custom CSV / Excel**, setelah mengunggah berkas, alat akan menampilkan layar pemetaan bidang sebelum beralih ke pratinjau.

Setiap kolom dari berkas Anda ditampilkan bersama contoh nilainya. Untuk setiap kolom, gunakan menu tarik-turun untuk memilih bidang B1 yang sesuai. Alat akan otomatis mendeteksi nama kolom umum seperti "First Name," "Email," atau "Zip Code," tetapi Anda sebaiknya memeriksa setiap baris dan memperbaiki yang terlewat.

Bidang B1 yang tersedia meliputi:

- First Name (Nama Depan), Last Name (Nama Belakang), Middle Name (Nama Tengah), Nickname (Nama Panggilan), Display Name (Nama Tampilan), Title/Prefix (Gelar/Awalan), Suffix (Sufiks)
- Email, Home Phone (Telepon Rumah), Mobile Phone (Telepon Seluler), Work Phone (Telepon Kantor)
- Address Line 1 (Alamat Baris 1), Address Line 2 (Alamat Baris 2), City (Kota), State (Provinsi), Zip Code (Kode Pos)
- Birth Date (Tanggal Lahir), Anniversary (Hari Jadi Pernikahan), Gender (Jenis Kelamin), Marital Status (Status Pernikahan), Membership Status (Status Keanggotaan)
- Household/Family Name (Nama Rumah Tangga/Keluarga)
- Group Name (Nama Kelompok) — menetapkan orang ke kelompok berdasarkan nama
- **Custom Field (match by name)** — menyimpan kolom ke salah satu [bidang kustom jemaat](../settings/custom-fields.md) gereja Anda. Kotak **Nama bidang B1** akan muncul, terisi dengan judul kolom. Ubah menjadi nama bidang persis seperti yang tertulis di B1 (huruf besar/kecil tidak masalah).
- **Form Answer (custom field)** — menyimpan nilai kolom tersebut sebagai bidang kustom yang melekat pada catatan orang tersebut. Jika Anda menggunakan opsi ini, Anda akan diminta memberi nama pada formulir.

Tanggal dapat dalam format umum seperti `9/17/1994` dan akan dikonversi secara otomatis. Untuk bidang kustom, bidang Ya/Tidak menerima nilai seperti Yes, No, Y, N, True, False, 1, dan 0, sedangkan bidang pilihan ganda menerima teks pilihan atau nilainya.

:::info
Buat bidang kustom jemaat Anda di B1 Admin sebelum mengimpor. Saat impor selesai, langkah **Custom Fields** akan mencantumkan nama kolom yang tidak cocok dengan bidang B1 dan menghitung nilai yang tidak sesuai dengan jenis bidang. Nilai-nilai tersebut akan dilewati, dan sisa impor tetap berjalan hingga selesai.
:::

Kolom yang tidak ingin Anda impor dapat diatur ke **(Skip)** (Lewati). Setidaknya satu bidang nama (First Name atau Last Name) harus dipetakan sebelum Anda dapat melanjutkan.

Klik **Konfirmasi Pemetaan & Impor** untuk melanjutkan ke pratinjau.

---

## Langkah 2 - Tinjau Data Anda

Setelah mengunggah, alat menampilkan pratinjau semua yang akan diimpor. Gunakan tab untuk meninjau setiap jenis data:

- **People** (Jemaat) — Dikelompokkan berdasarkan rumah tangga, dengan foto jika disertakan.
- **Groups** (Kelompok) — Diatur berdasarkan kampus, ibadah, waktu, dan kategori.
- **Attendance** (Kehadiran) — Tanggal sesi, kelompok, dan jumlah kunjungan.
- **Donations** (Persembahan) — Batch, dana, donatur, dan jumlah.
- **Forms** (Formulir) — Nama formulir dan jenis konten.

Periksa dengan saksama sebelum melanjutkan. Jika ada yang tampak salah, klik **Mulai Ulang** dan perbaiki berkas sumber Anda.

---

## Langkah 3 - Pilih Tujuan Anda

Pilih ke mana Anda ingin data dikirim:

- **B1 Database** — Mengimpor langsung ke basis data B1 gereja Anda. Setelah memilih ini, alat akan menampilkan jumlah akhir catatan yang akan ditambahkan. Klik **Mulai Transfer** untuk mengonfirmasi.
- **B1 Export Zip** — Mengunduh data Anda sebagai berkas zip format B1 yang nanti dapat dipulihkan dengan **B1 Import Zip**. Baik untuk cadangan.
- **Breeze Export Zip** — Mengonversi data Anda ke format Breeze.
- **Planning Center Zip** — Mengonversi data Anda ke format Planning Center.

:::warning
Format sumber dan tujuan tidak boleh sama. Jika sama, alat akan memberi peringatan untuk mencegah duplikasi yang tidak disengaja.
:::

---

## Langkah 4 - Jalankan

Alat memproses transfer dan menampilkan kemajuan untuk setiap langkah:

- Kampus, Ibadah, dan Waktu
- Jemaat
- Foto
- Kelompok dan Anggota Kelompok
- Persembahan
- Kehadiran
- Formulir, Pertanyaan, Jawaban, dan Pengiriman Formulir
- Bidang Kustom (jika Anda memetakan kolom Custom Field)
- Mengompres (hanya untuk tujuan berkas zip)

Ketika tujuannya adalah **B1 Database**, kartu kemajuan berjudul **Import Progress** (Kemajuan Impor) dan diakhiri dengan **Import Complete!** (Impor Selesai!) atau **Import Completed with Errors** (Impor Selesai dengan Kesalahan). Untuk tujuan berkas zip, pesan yang sama menggunakan kata **Export** (Ekspor).

:::info
Saat memulihkan **B1 Import Zip**, catatan yang mengarah ke sesuatu yang tidak lagi ada dalam berkas akan dilewati alih-alih menghentikan impor: keanggotaan kelompok untuk jemaat atau kelompok yang tidak ada dalam zip, kehadiran untuk kelompok atau jemaat yang telah dihapus, dan tautan antara kelompok dan waktu ibadah yang telah dihapus. Sesi kehadiran yang tidak pernah dikaitkan dengan waktu ibadah tetap dipulihkan. Demikian pula, saat mengekspor, foto yang tidak dapat diunduh atau dibaca akan dikeluarkan agar langkah **Photos** (Foto) tetap berjalan.
:::

:::warning
Jangan menutup peramban Anda selama transfer berjalan. Tunggu sampai semua langkah menampilkan tanda selesai.
:::

---

## Menyiapkan Breeze Import Zip

1. Di Breeze, buka **Settings** (Pengaturan) dan klik **Export** di sidebar kiri.
2. Ekspor tiga berkas terpisah: **People**, **Tags**, dan **Contributions**.
3. Pilih ketiga berkas, klik kanan, dan kompres menjadi satu berkas zip.
   - Di Mac: pilih berkas, klik kanan, lalu pilih **Compress** (Kompres).
   - Di PC: pilih berkas, klik kanan, pilih **Send to** (Kirim ke), lalu **Compressed (zipped) folder** (Folder terkompresi (zip)).
4. Unggah berkas zip menggunakan opsi **Breeze Import Zip** di Langkah 1.

Impor Breeze secara otomatis memindahkan jemaat, kelompok (tag), dan catatan persembahan.

---

## Menyiapkan Ekspor Planning Center

1. Masuk ke Planning Center dan buka produk **People**.
2. Di sidebar kiri, klik **Lists** (Daftar) dan buat daftar yang mencakup semua orang yang ingin Anda pindahkan. (Jika Anda sudah memiliki daftar seluruh jemaat, gunakan daftar itu.)
3. Buka daftar dan gunakan opsi **export** (ekspor) untuk mengunduh data jemaat Anda sebagai berkas **CSV**. Sertakan bidang yang ingin Anda simpan — nama, email, telepon, alamat, tanggal lahir, jenis kelamin, dan status keanggotaan semuanya akan dipetakan ke B1.
4. Jika Planning Center memberi Anda lebih dari satu berkas, pilih semuanya, klik kanan, dan kompres menjadi satu zip.
   - Di Mac: pilih berkas, klik kanan, dan pilih **Compress** (Kompres).
   - Di PC: pilih berkas, klik kanan, pilih **Send to** (Kirim ke), lalu **Compressed (zipped) folder** (Folder terkompresi (zip)).
5. Unggah CSV atau zip menggunakan opsi **Planning Center Zip** di Langkah 1.

Setelah mengunggah, lanjutkan ke pratinjau dan pastikan jemaat serta rumah tangga Anda sudah benar sebelum menjalankan impor.

---

## Menyiapkan Ekspor Tithe.ly

1. Di Tithe.ly, ekspor data **People** Anda sebagai berkas CSV atau Excel. Anda juga dapat mengekspor berkas **Giving** (Persembahan) terpisah jika ingin memasukkan catatan persembahan.
2. Alat akan otomatis mendeteksi apakah berkas berisi data jemaat atau persembahan berdasarkan nama kolom.
3. Unggah berkas menggunakan opsi **Tithe.ly CSV** di Langkah 1.

:::info
Ekspor Tithe.ly dapat diimpor satu berkas per waktu. Jalankan prosesnya dua kali jika Anda perlu mengimpor data jemaat dan persembahan secara terpisah.
:::

---

## Menyiapkan Ekspor CCB atau Pushpay

1. Di Church Community Builder atau Pushpay, ekspor data **People** Anda sebagai berkas CSV. Anda juga dapat mengekspor berkas persembahan/kontribusi terpisah.
2. Alat akan otomatis mendeteksi apakah berkas berisi data jemaat atau persembahan berdasarkan nama kolom.
3. Unggah berkas menggunakan opsi **CCB / Pushpay CSV** di Langkah 1.

---

## Setelah Mengimpor

Setelah transfer selesai, luangkan beberapa menit untuk memverifikasi data Anda:

1. Buka halaman [People](../people/adding-people.md) dan periksa beberapa profil secara acak.
2. Pastikan nama, email, nomor telepon, dan alamat sudah benar.
3. Periksa bahwa hubungan rumah tangga masih utuh. Peran rumah tangga setiap orang (Head, Spouse, Child, atau Other) akan dibawa jika sumbernya memilikinya: kolom **householdRole** di B1 Import Zip, **Family Role** di Breeze atau Tithe.ly, dan **Family Position** di CCB / Pushpay. Peran seperti "Head of Household", "Primary", "Wife", atau "Son" akan dikonversi ke peran B1 yang sesuai. Impor Planning Center dan Custom CSV / Excel tidak memiliki kolom peran, sehingga orang-orang tersebut diatur ke **Other**; Anda dapat mengubah peran dari rumah tangga orang tersebut di halaman [People](../people/adding-people.md#managing-households).
4. Tinjau kelompok dan catatan persembahan yang diimpor.

Jika Anda menemukan masalah, Anda dapat mengedit profil individual dari halaman People. Anda juga dapat menjalankan alat transfer lagi untuk [mengekspor data Anda](exporting-data.md) sebagai cadangan.
