---
title: "Mencari Orang"
description: "Cari direktori Orang B1 Admin berdasarkan nama, urutkan dan pilih kolom di tampilan tabel, buat filter dengan Pencarian Lanjutan, dan ekspor hasil ke CSV."
---

# Mencari Orang

<div class="article-intro">

Halaman **People** menampilkan direktori gereja Anda sebagai daftar keluarga yang dapat dicari, atau sebagai tabel individu yang dapat diurutkan. Anda dapat dengan cepat menemukan siapa pun di jemaat Anda, menyesuaikan informasi yang ditampilkan, dan mengekspor hasil Anda. Pencarian yang efisien sangat penting untuk tugas administrasi gereja sehari-hari, seperti menindaklanjuti pengunjung, menyiapkan daftar kontak, dan mengelola catatan anggota.

</div>

## Video Pelatihan

<YouTube id="7Y-tN9RmnDQ" title="Mencari Orang dan Membuat Daftar di B1" next="Bidang Kustom, Pengeditan Massal, dan Ekspor di B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan akun B1 Admin yang aktif dengan izin untuk melihat orang. Lihat [Peran & Izin](roles-permissions.md) jika Anda tidak yakin dengan tingkat akses Anda.
- Direktori gereja Anda seharusnya sudah berisi orang. Jika Anda belum menambahkan siapa pun, lihat [Menambahkan Orang](adding-people.md) atau [Mengimpor Data](importing-data.md).

</div>

## Keluarga dan Tampilan Tabel

Halaman People menampilkan direktori Anda berdasarkan **keluarga**, dikelompokkan menurut abjad. Setiap baris menampilkan foto keluarga, namanya (misalnya, "Keluarga Smith"), dan nama semua anggotanya. Klik sebuah keluarga untuk membuka profil kepala keluarga, atau klik nama anggota mana pun untuk membuka orang tersebut. Jumlah di atas daftar menunjukkan berapa banyak keluarga dan orang yang ditampilkan.

Gunakan sakelar **Tampilkan sebagai** di atas daftar untuk beralih antara **Keluarga** dan **Tabel**. Tampilan **Tabel** menampilkan satu orang per baris dan di sinilah Anda dapat mengurutkan serta memilih kolom (lihat di bawah). B1 mengingat pilihan Anda pada perangkat tersebut.

Dalam tampilan **Tabel**, status keanggotaan setiap orang muncul di bawah namanya, dan masing-masing dari tujuh status memiliki warna sendiri, sama dengan warna yang digunakan pada profil orang tersebut. Siapa pun yang peran keluarganya diatur sebagai **Anak** juga menampilkan label **Anak** di samping statusnya. Untuk menandai seseorang sebagai anak, atur perannya di [panel keluarga](./adding-people.md#managing-households) pada profil mereka.

Secara default, halaman memuat bagian pertama dari direktori Anda. Jika Anda memiliki lebih banyak orang, klik **Tampilkan Semua Anggota** di bawah daftar untuk memuat semua orang.

## Pencarian Cepat

Kotak **Cari keluarga atau orang** di bagian atas halaman People memungkinkan Anda menemukan anggota secara real time:

1. Klik **kotak pencarian** di bagian atas halaman People.
2. Mulai ketik nama.
3. Hasil akan difilter secara otomatis saat Anda mengetik (ada jeda singkat sekitar setengah detik agar pencarian tidak berjalan pada setiap ketukan tombol).
4. Daftar di bawahnya diperbarui untuk hanya menampilkan hasil yang cocok.

Klik **Hapus** (di bawah kotak pencarian) untuk mengatur ulang pencarian dan menampilkan kembali seluruh direktori Anda.

:::tip
Anda tidak perlu menekan Enter. Pencarian berjalan otomatis setelah Anda berhenti mengetik.
:::

## Mengurutkan Hasil

Dalam tampilan **Tabel**, orang-orang didaftarkan berdasarkan nama belakang, lalu nama depan. Anda dapat mengurutkan direktori dengan cara lain dengan mengklik header kolom mana pun:

1. Klik **header kolom** (misalnya, **Nama** atau **Email**) untuk mengurutkan berdasarkan kolom tersebut.
2. Klik header yang sama lagi untuk membalik urutan pengurutan.

Hal ini memudahkan Anda menemukan orang secara alfabetis, berdasarkan usia, atau berdasarkan kolom lain yang terlihat.

## Menyesuaikan Kolom

Tidak semua informasi perlu terlihat sekaligus. Anda dapat memilih kolom mana yang muncul di tabel:

1. Klik ikon **Pilih kolom** di header halaman People. (Kolom berlaku untuk tampilan **Tabel**.)
2. Centang atau hapus centang kolom untuk menampilkan atau menyembunyikannya. Kolom yang tersedia meliputi:
   - **Foto**
   - **Nama**
   - **Email**
   - **Telepon**
   - **Alamat**
   - **Tanggal Lahir**
   - **Usia**
   - **Jenis Kelamin**
   - **Status Keanggotaan**
   - **Kampus**
   - **Tanggal Ditambahkan** -- saat catatan orang tersebut dibuat
3. Tabel langsung diperbarui untuk mencerminkan pilihan Anda. Klik **Selesai** untuk menutup dialog **Pilih Kolom**.

### Menampilkan Bidang Kustom sebagai Kolom

Pemilih kolom memiliki dua tab: **Standar** berisi kolom bawaan yang tercantum di atas, dan **Kustom** berisi [Bidang Kustom](../settings/custom-fields.md) gereja Anda beserta pertanyaan dari formulir People mana pun. Centang bidang kustom di tab **Kustom** untuk menambahkannya sebagai kolom, dan nilai setiap orang untuk bidang tersebut akan muncul di tabel. Nilai ditampilkan dengan cara yang sama seperti di profil orang tersebut -- bidang Ya/Tidak menampilkan *Ya* atau *Tidak*, bidang Pilihan Ganda menampilkan label opsinya, dan tanggal ditampilkan sebagai tanggal singkat. Orang yang tidak memiliki nilai untuk bidang tersebut akan menampilkan sel kosong.

## Mengekspor Hasil Pencarian

Anda dapat mengunduh hasil pencarian saat ini sebagai file CSV kapan saja:

1. Terapkan pencarian atau filter apa pun yang Anda inginkan.
2. Klik tombol **Ekspor** di header halaman People.
3. File CSV akan diunduh ke komputer Anda, siap dibuka di Excel, Google Sheets, atau aplikasi spreadsheet lainnya.

Untuk detail lebih lanjut tentang ekspor, lihat [Mengekspor Data](./exporting-data.md).

:::tip
Untuk kueri yang lebih lanjut -- seperti menemukan semua orang yang tidak hadir dalam tiga bulan terakhir -- coba fitur [Pencarian AI](./ai-search.md), yang memungkinkan Anda mencari menggunakan pertanyaan dalam bahasa sehari-hari.
:::

## Pencarian Lanjutan

Pencarian Lanjutan memungkinkan Anda membuat filter yang presisi dengan menggabungkan beberapa kondisi. Bukanya dengan mengklik **Lanjutan** di bawah kotak pencarian pada halaman People, lalu perluas sebuah kategori dan centang bidang yang ingin Anda filter (Anda dapat mengklik nama bidang atau kotak centangnya), dengan memilih operator dan nilai untuk masing-masing. Kategorinya meliputi **Nama**, **Demografi**, **Kontak**, **Keanggotaan**, **Aktivitas** (donasi dan kehadiran), dan **Bidang Kustom**.

Untuk menemukan orang baru, buka **Keanggotaan** dan centang **Tanggal Ditambahkan**. Filter ini dimulai dengan **dalam N hari terakhir** dengan angka 30 yang sudah terisi, sehingga Anda dapat menemukan semua orang yang ditambahkan dalam sebulan terakhir hanya dengan satu klik; ubah jumlah hari, atau beralih ke *sama dengan / setelah / sebelum* untuk memilih tanggal. **Tanggal Lahir** dan **Ulang Tahun Pernikahan** juga menawarkan **dalam N hari terakhir**. Tanggal Ditambahkan hanya dicatat untuk orang yang dibuat sejak akhir Oktober 2026; orang yang ditambahkan sebelumnya tidak memiliki tanggal, sehingga filter ini tidak akan menemukan mereka.

Kategori **Bidang Kustom** mencantumkan [Bidang Kustom](../settings/custom-fields.md) gereja Anda -- bidang yang Anda tentukan di Pengaturan untuk melacak informasi Anda sendiri (seperti tanggal kedaluwarsa pemeriksaan latar belakang). Operator yang tersedia sesuai dengan jenis setiap bidang: bidang teks mendukung *berisi / sama dengan / dimulai dengan / diakhiri dengan*, bidang angka mendukung operator perbandingan, bidang tanggal mendukung *sama dengan / setelah / sebelum*, dan bidang Ya/Tidak serta Pilihan Ganda memungkinkan Anda memilih nilai. Bidang apa pun yang dapat difilter di sini dapat disimpan sebagai [Daftar](./lists.md) yang aktif.

## Menyimpan Pencarian sebagai Daftar

Setelah menjalankan pencarian, tombol **Simpan sebagai Daftar** akan muncul di header halaman People. Klik tombol tersebut untuk menyimpan kueri Anda saat ini dengan nama dan kategori opsional, sehingga Anda dapat memuatnya kembali dengan cepat di sesi mendatang. Lihat [Daftar Tersimpan](./lists.md) untuk detail lengkapnya.
