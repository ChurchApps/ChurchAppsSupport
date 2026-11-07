---
title: "Bidang Kustom"
---

# Bidang Kustom

<div class="article-intro">

**Bidang Kustom** memungkinkan Anda mencatat informasi sendiri pada setiap data orang, seperti tanggal kedaluwarsa pemeriksaan latar belakang, ukuran kaos, atau status kelas baptisan, yang tidak tersedia sebagai bidang bawaan di B1. Anda cukup mendefinisikan bidang sekali di Settings, lalu mengisi nilainya di profil setiap orang dan mencarinya atau membuat daftar berdasarkannya. Cara ini menggantikan solusi lama, yaitu membuat formulir People hanya untuk menyimpan satu data kustom.

</div>

## Video Pelatihan

<YouTube id="yUfDEbp2HQ4" title="Bidang Kustom, Pengeditan Massal, dan Ekspor di B1" next="Membuat Grup dan Menambahkan Anggota di B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan izin edit **People** untuk mendefinisikan bidang dan mengisi nilainya, serta akses ke area **Settings**. Siapa pun yang memiliki izin lihat People dapat melihat nilainya. Lihat [Peran & Izin](./roles-permissions.md).
- Tentukan dulu data apa yang ingin dicatat dan tipe mana yang paling sesuai (teks, angka, tanggal, ya/tidak, atau daftar pilihan) sebelum memulai.

</div>

## Membuka Bidang Kustom

Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), pilih **Settings > Settings**, lalu klik **Custom Fields** di daftar sebelah kiri untuk menggulir ke bagian **Custom Fields**. Anda juga bisa langsung membukanya di **/settings/custom-fields**. Anda akan melihat daftar semua bidang yang telah didefinisikan, beserta **Name** dan **Field Type**-nya. Jika belum ada bidang yang dibuat, panel akan menampilkan tulisan *"No custom fields have been added yet."*

## Menambahkan Bidang

1. Klik **Add Field**.
2. Di editor yang terbuka di sisi kanan, isi **Name**. Ini adalah label yang akan dilihat staf di profil orang dan di pencarian (misalnya, *Background check expires*).
3. Pilih **Field Type**:
   - **Textbox**: teks pendek bebas.
   - **Whole Number**: angka bulat tanpa desimal (misalnya, jumlah).
   - **Decimal**: angka yang bisa mengandung desimal.
   - **Date**: tanggal kalender.
   - **Yes/No**: jawaban sederhana ya atau tidak.
   - **Multiple Choice**: daftar pilihan. Saat tipe ini dipilih, **choices editor** akan muncul sehingga Anda bisa menambahkan setiap opsi yang dapat dipilih orang.
4. Klik **Save**.

Bidang tersebut sekarang tersedia di profil setiap orang.

:::info
Tipe bidang ini sama dengan tipe yang digunakan untuk [pertanyaan formulir](../forms/creating-forms.md), sehingga nilainya berperilaku konsisten di seluruh B1.
:::

## Mengedit Bidang

Klik baris bidang mana pun di daftar untuk membukanya kembali di editor. Ubah nama, tipe, atau pilihannya, lalu klik **Save**.

:::warning
Mengubah **Field Type** pada bidang yang sudah memiliki nilai (misalnya, dari Textbox ke Date) dapat membuat nilai yang sudah dimasukkan tidak sesuai lagi dengan tipe yang baru. Ubah tipe dengan hati-hati setelah staf mulai mengisi bidang tersebut.
:::

## Menghapus Bidang

Buka bidang untuk diedit, lalu klik **Delete**. Anda akan diminta konfirmasi: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Menghapus bidang akan menghilangkannya secara permanen **beserta semua nilai yang tersimpan untuknya** pada seluruh orang. Tindakan ini tidak dapat dibatalkan.

## Mengisi Nilai pada Data Seseorang

Setelah minimal satu bidang kustom dibuat, nilainya akan tampil berdampingan dengan detail bawaan di data setiap orang. Anda dapat melihatnya bersama detail kontak orang tersebut di sisi kiri profil, dan mengeditnya di formulir yang sama dengan informasi orang lainnya. Tidak ada yang muncul sebelum Anda mendefinisikan bidang pertama.

1. Buka data seseorang di **People**.
2. Klik tombol **Edit** di sisi kiri profil, di bawah detail kontak orang tersebut.
3. Gulir ke area **Custom Fields** di bagian bawah formulir edit, lalu isi nilai untuk setiap bidang. Setiap bidang menampilkan input yang sesuai dengan tipenya, seperti pemilih tanggal untuk bidang Date, dropdown ya/tidak untuk bidang Yes/No, daftar pilihan untuk Multiple Choice, dan seterusnya.
4. Klik **Save**. Nilai bidang kustom Anda akan disimpan bersama dengan detail lain milik orang tersebut.

Kembali ke profil, bidang yang sudah memiliki nilai akan tampil di bawah detail kontak orang tersebut dalam format *Nama bidang: nilai* (jawaban Yes/No ditampilkan sebagai *Yes* atau *No*, dan Multiple Choice menampilkan label opsinya). Bidang yang kosong tidak ditampilkan. Untuk menghapus nilai, edit data orang tersebut, kosongkan bidangnya, lalu simpan. Nilai kosong akan dihapus dari data, bukan disimpan sebagai kosong.

:::tip
Contoh penggunaan yang paling umum adalah keselamatan relawan. Buat bidang **Date** bernama *Background check expires*, catat tanggal setiap relawan, lalu buat [Saved List](../people/lists.md) yang menandai siapa pun yang tanggalnya sudah lewat.
:::

## Mencari dan Membuat Daftar Berdasarkan Bidang Kustom

Bidang kustom dapat dicari sepenuhnya:

1. Di halaman **People**, buka [Advanced Search](../people/searching-people.md).
2. Perluas kategori **Custom Fields**.
3. Centang bidang yang ingin Anda saring, pilih operator, lalu masukkan nilai. Operator yang tersedia menyesuaikan tipe bidang:
   - **Textbox**: contains, equals, starts with, ends with.
   - **Whole Number / Decimal**: equals, greater than, greater than or equal, less than, less than or equal.
   - **Date**: equals, after (greater than), before (less than).
   - **Yes/No**: equals Yes atau No.
   - **Multiple Choice**: equals atau contains salah satu pilihan.

Simpan pencarian bidang kustom apa pun sebagai [List](../people/lists.md). Daftar bersifat kueri langsung, sehingga daftar yang dibuat berdasarkan *Background check expires is before today* akan memeriksa ulang setiap orang setiap kali Anda membukanya, tanpa perlu perawatan manual.

## Menampilkan Bidang Kustom sebagai Kolom

Untuk melihat nilai sebuah bidang untuk semua orang sekaligus, tambahkan bidang tersebut sebagai kolom di halaman **People**. Ubah **View as** menjadi **Table**, klik ikon **Select columns** di header halaman, buka tab **Custom**, lalu centang bidangnya. Nilai setiap orang akan muncul di kolomnya sendiri di samping kolom bawaan. Lihat [Menampilkan Bidang Kustom sebagai Kolom](../people/searching-people.md#showing-custom-fields-as-columns).

## Yang Terjadi Saat Penggabungan

Saat Anda [menggabungkan dua data orang](../people/adding-people.md), nilai bidang kustom akan terbawa secara otomatis. Data orang yang dipertahankan tetap memiliki nilainya sendiri. Untuk bidang yang hanya memiliki nilai pada data orang yang dihapus, nilai tersebut akan disalin agar tidak ada yang hilang.

## Artikel Terkait

- [Mencari Orang](../people/searching-people.md): pencarian lanjutan, termasuk kategori Custom Fields, dan menampilkan bidang kustom sebagai kolom
- [Saved Lists](../people/lists.md): menyimpan pencarian bidang kustom dan menjalankannya kembali secara langsung
- [Peran & Izin](./roles-permissions.md): siapa yang dapat mendefinisikan bidang dan mengedit nilai
- [Membuat Formulir](../forms/creating-forms.md): untuk pengumpulan data multi-pertanyaan, ketika formulir lengkap lebih cocok daripada bidang tunggal
