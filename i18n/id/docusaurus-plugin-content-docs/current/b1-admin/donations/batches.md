---
title: "Kelompok Donasi"
---

# Kelompok Donasi

<div class="article-intro">

Batch mengelompokkan donasi Anda agar lebih mudah dilacak dan dicocokkan. Satu batch biasanya mewakili satu kali pengumpulan, misalnya persembahan hari Minggu atau acara khusus. Dengan menggunakan batch, Anda dapat tetap teratur dan lebih mudah memastikan bahwa catatan Anda sesuai dengan setoran yang sebenarnya.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Pastikan Anda sudah [menyiapkan dana](funds.md) agar tersedia saat mencatat donasi
- Anda memerlukan izin **Lihat Ringkasan Donasi**, **Edit Donasi**, atau **Masukkan Donasi** untuk melihat halaman Batch (lihat [Siapa yang Dapat Mengubah Batch](#who-can-change-a-batch))

</div>

## Halaman Batch

Saat Anda membuka **Donasi > Batch**, Anda akan melihat daftar batch Anda. Setiap baris menampilkan:

- **Nama** -- label yang Anda berikan untuk batch
- **Tanggal** -- tanggal pengumpulan
- **Donasi** -- jumlah donasi individual dalam batch
- **Total** -- jumlah uang gabungan
- **Status** -- **Terbuka** atau **Tertutup** (lihat [Menutup dan Membuka Kembali Batch](#closing-and-reopening-a-batch))

Di atas daftar, tombol tahun memungkinkan Anda hanya menampilkan batch dari satu tahun tertentu, atau semua batch dengan tombol **Semua**. Ringkasan satu baris menampilkan jumlah batch, jumlah pemberian, dan total jumlah untuk batch yang ditampilkan.

## Membuat Batch Baru

1. Klik **Tambah Batch** di bagian atas halaman.
2. Masukkan nama deskriptif (misalnya, "Persembahan Minggu - 9 Feb").
3. Pilih tanggal pengumpulan.
4. Klik **Simpan**.

Batch baru Anda akan muncul dalam daftar, siap untuk Anda tambahkan donasinya.

## Bekerja dengan Batch

- **Melihat donasi** -- klik nama batch untuk membukanya dan melihat semua donasi individual di dalamnya. Dari sana, Anda dapat menambah, mengedit, atau menghapus donasi, atau klik **Impor CSV** untuk menambahkan banyak donasi sekaligus dari spreadsheet (lihat [Mengimpor Donasi dari File CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Mengedit detail batch** -- klik tombol **Edit** pada baris batch untuk mengubah nama atau tanggalnya. Hanya orang dengan izin **Edit Donasi** yang dapat menghapus batch.
- **Mengurutkan** -- gunakan judul kolom untuk mengurutkan batch berdasarkan nama atau tanggal.
- **Ekspor** -- klik **Ekspor** di bagian atas halaman untuk mengunduh batch yang ditampilkan sebagai spreadsheet (CSV).
- **Peristiwa gagal** -- jika gateway pembayaran Anda melaporkan masalah, tombol **Peristiwa gagal** (dengan jumlah peristiwa yang belum terselesaikan) akan muncul di bagian atas halaman. Klik tombol tersebut untuk menampilkan atau menyembunyikan daftar peristiwa di bawah batch.
- **Impor dari Stripe** -- klik **Impor transaksi Stripe yang hilang** di bagian atas halaman untuk membuka alat [Impor Stripe](stripe-import.md). Tombol ini hanya muncul jika gateway pemberian gereja Anda adalah Stripe.

## Siapa yang Mencatat Setiap Pemberian

Setiap pemberian yang dimasukkan ke dalam batch menampilkan **Dimasukkan oleh** dan nama orangnya di bawah nama donatur, sehingga Anda dapat mengetahui siapa yang memasukkannya tanpa lembar tanda tangan. B1 mencatat ini secara otomatis berdasarkan siapa yang sedang masuk, dan mengedit pemberian nanti tidak akan mengubahnya. Pemberian yang dibawa melalui **Impor CSV** menampilkan orang yang menjalankan impor tersebut.

Donasi online, pemberian yang ditambahkan oleh alat [Impor Stripe](stripe-import.md), dan pemberian yang dimasukkan sebelum fitur ini ditambahkan pada November 2026 tidak menampilkan nama.

## Menutup dan Membuka Kembali Batch

Setelah batch dihitung dan disetorkan, tutuplah agar donasinya tetap sama persis seperti saat Anda menutupnya.

1. Buka batch.
2. Klik **Tutup Batch** di bagian atas halaman.

Label status di samping nama batch akan berubah dari **Terbuka** menjadi **Tertutup**, batch akan menampilkan **Tertutup** di kolom **Status** pada halaman Batch, dan pemberitahuan di bagian atas batch akan menjelaskan bahwa batch tersebut sudah ditutup. Selama batch tertutup, orang dengan izin **Masukkan Donasi** tetap dapat melihatnya, tetapi mereka tidak dapat menambah, mengedit, atau menghapus donasinya, ataupun mengubah nama atau tanggal batch.

Untuk membuat perubahan lagi, buka batch dan klik **Buka Kembali Batch**. Batch baru selalu dimulai dalam keadaan terbuka.

:::info
Hanya orang dengan izin **Edit Donasi** yang dapat melihat tombol **Tutup Batch** dan **Buka Kembali Batch**. Mereka juga tetap dapat mengubah donasi dalam batch yang tertutup jika diperlukan koreksi, tanpa perlu membuka kembali batch tersebut.
:::

## Siapa yang Dapat Mengubah Batch

Dua [izin peran](../settings/roles-permissions.md) memungkinkan seseorang untuk bekerja dengan batch:

- **Edit Donasi** -- akses penuh: menambah dan menghapus batch, menutup dan membuka kembali batch, serta menambah, mengedit, atau menghapus donasi mana pun, baik batch terbuka maupun tertutup.
- **Masukkan Donasi** -- untuk tim penghitung dan relawan yang mencatat persembahan. Mereka dapat menambah batch serta menambah, mengedit, atau menghapus donasi, tetapi hanya saat batch masih terbuka. Mereka tidak dapat menghapus batch, menutup atau membuka kembalinya, atau mengubah pemberian yang masuk melalui pemberian online.

Seseorang dengan izin **Masukkan Donasi** tetapi tanpa **Lihat Ringkasan Donasi** akan melihat **Donasi** di menu B1 Admin, yang langsung membuka halaman Batch. Menu **Ringkasan**, **Dana**, **Kampanye**, dan **Laporan Pemberian** tetap disembunyikan dari mereka. Untuk membuka batch dan melihat donasi di dalamnya, peran tersebut juga memerlukan izin **Lihat Donasi**.

:::tip
Pengaturan yang umum adalah peran "Tim Penghitung" dengan izin **Masukkan Donasi** dan **Lihat Donasi**, serta bendahara dengan izin **Edit Donasi** yang menutup setiap batch setelah setoran dicocokkan.
:::

## Mencetak Batch

Buka batch dan klik **Cetak** di atas daftar donasi untuk mencetak salinan kertas bagi tim penghitung atau catatan setoran Anda. Hasil cetakan mencakup:

- Kop surat gereja Anda -- logo Anda (**Logo Latar Belakang Terang** dari [Situs Web > Tampilan](../website/appearance.md), jika Anda sudah mengunggahnya) dengan nama gereja Anda di bawahnya -- kemudian nama batch dan tanggal batch
- Setiap donasi dalam batch, dengan nama donatur, orang yang mencatatnya, metode, catatan, tanggal, dan jumlah (pemberian yang dikembalikan dicoret dan ditandai sebagai dikembalikan)
- **Subtotal Dana** -- total yang diberikan untuk setiap dana dalam batch
- **Total Batch** -- jumlah gabungan untuk seluruh batch

Tombol **Cetak** hanya muncul setelah batch memiliki setidaknya satu donasi.

### Mencetak Beberapa Batch Sekaligus

Untuk mencetak semua batch dari suatu periode sekaligus -- misalnya, semua setoran bulan lalu -- klik **Cetak** di bagian atas halaman **Batch**, di samping **Ekspor**. Halaman **Cetak Batch** akan terbuka dengan **Tanggal Mulai** dan **Tanggal Akhir** yang sesuai dengan batch di layar: 1 Januari hingga 31 Desember untuk tahun yang Anda pilih, atau dari tanggal batch paling awal hingga paling akhir saat **Semua** dipilih. Ubah salah satu tanggal untuk memilih rentang yang berbeda.

Setiap batch yang bertanggal dalam rentang tersebut (termasuk tanggal mulai dan tanggal akhir) akan dicetak berurutan berdasarkan tanggal, satu batch per halaman, dengan tata letak yang sama seperti cetakan satu batch. Batch tanpa donasi tidak disertakan, dan jika tidak ada batch dalam rentang tersebut yang memiliki donasi, Anda akan melihat pesan "Tidak ada batch dengan donasi dalam rentang tanggal ini." Klik **Cetak** untuk membuka dialog cetak peramban Anda, atau **Tutup** untuk kembali ke daftar batch.

## Mengekspor Batch ke QuickBooks Online

Buka batch dan klik **Ekspor untuk QuickBooks** untuk mengunduh batch sebagai entri jurnal yang dapat diimpor oleh QuickBooks Online (**Pengaturan > Impor Data > Entri Jurnal**). File tersebut berisi satu debit ke **Dana Belum Disetor** untuk total batch dan satu kredit untuk setiap dana, dengan menggunakan nama setiap dana sebagai nama akun. QuickBooks akan meminta Anda mencocokkan nama-nama tersebut dengan bagan akun Anda selama impor, jadi beri nama dana Anda sesuai dengan nama akun pendapatan yang digunakan oleh pembuku Anda, atau petakan sekali saat impor.

:::tip
Beri nama batch Anda secara konsisten agar mudah ditemukan nanti. Mencantumkan tanggal dan jenis pengumpulan (misalnya, "Minggu Pagi - 2025-02-09") membuat daftar Anda tetap teratur seiring pertumbuhannya.
:::

## Langkah Selanjutnya

Setelah Anda memiliki batch, lihat [Mencatat Donasi](recording-donations.md) untuk mempelajari cara menambahkan donasi individual ke dalamnya. Anda juga dapat [mengimpor transaksi Stripe](stripe-import.md) untuk membuat batch secara otomatis dari pemberian online.
