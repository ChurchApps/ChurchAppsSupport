---
title: "Dukungan Multi-Mata Uang"
---

# Dukungan Multi-Mata Uang

<div class="article-intro">

Fitur multi-mata uang B1 memungkinkan gereja Anda menerima dan melacak donasi dalam berbagai mata uang. Fitur ini sangat berguna bagi gereja dengan anggota internasional, misionaris, atau beberapa kampus di negara yang berbeda.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan izin untuk mengelola donasi. Lihat [Peran & Izin](../people/roles-permissions.md) untuk detailnya.
- Siapkan [pemberian daring](./online-giving-setup.md) Anda dengan Stripe, yang mendukung transaksi multi-mata uang.
- Pahami kebutuhan akuntansi gereja Anda untuk menangani beberapa mata uang.

</div>

## Mengaktifkan Multi-Mata Uang

Dukungan multi-mata uang kini diaktifkan secara default di B1. Setelah diaktifkan:

- Anggota dapat memberi dalam mata uang lokal mereka saat berdonasi secara daring
- Anda dapat mencatat donasi secara manual dalam mata uang apa pun
- Laporan donasi menampilkan jumlah dalam mata uang aslinya
- Stripe menangani konversi mata uang secara otomatis untuk pemberian daring

## Mata Uang yang Didukung

Sistem ini mendukung semua mata uang utama dunia, termasuk:

- **USD** -- Dolar Amerika Serikat
- **EUR** -- Euro
- **GBP** -- Pound Inggris
- **CAD** -- Dolar Kanada
- **AUD** -- Dolar Australia
- **MXN** -- Peso Meksiko
- **BRL** -- Real Brasil
- **INR** -- Rupee India
- **CNY** -- Yuan Tiongkok
- **JPY** -- Yen Jepang
- Dan masih banyak lagi...

Mata uang yang tersedia untuk pemberian daring bergantung pada mata uang yang didukung oleh akun Stripe Anda.

## Mencatat Donasi dalam Mata Uang Berbeda

### Donasi Daring

Ketika anggota memberi secara daring melalui Stripe:

1. Mereka memilih mata uang yang diinginkan saat checkout
2. Stripe memproses pembayaran dalam mata uang tersebut
3. Donasi dicatat di B1 dengan jumlah dalam mata uang asli
4. Stripe secara otomatis menangani konversi mata uang yang diperlukan ke mata uang default akun Anda

### Entri Manual

Untuk mencatat donasi tunai atau cek dalam mata uang berbeda:

1. Buka **Donations > Batches** di B1 Admin dan buka batch-nya
2. Klik **Add Donation** di bagian atas halaman batch
3. Pilih mata uang dari menu tarik-turun mata uang
4. Masukkan jumlah dalam mata uang tersebut
5. Lengkapi sisa detail donasi
6. Klik **Save**

## Melihat Donasi Multi-Mata Uang

### Laporan Donasi

Laporan donasi menampilkan jumlah dalam mata uang aslinya:

- Catatan donasi individual menampilkan kode mata uang (misalnya, "$100.00 USD")
- Total dihitung per mata uang
- Anda dapat memfilter berdasarkan mata uang tertentu

### Total yang Dikonversi

Di mana pun B1 menampilkan satu total gabungan -- kartu KPI ringkasan pemberian, total batch donasi, dan total dana -- donasi yang dicatat dalam mata uang selain mata uang default gereja Anda dikonversi ke mata uang gereja menggunakan nilai tukar terkini, sehingga total menjadi satu angka yang bermakna alih-alih menjumlahkan mata uang yang berbeda. Catatan **Dikonversi menggunakan nilai tukar terkini** akan muncul di bawah total setiap kali konversi diterapkan. Item donasi individual tetap ditampilkan dalam mata uang aslinya.

### Laporan Pemberian

Saat membuat laporan pemberian:

- Setiap donasi muncul dengan mata uang aslinya
- Total dirinci per mata uang
- Anggota melihat dengan jelas apa yang mereka berikan dalam setiap mata uang

## Integrasi Stripe

Untuk pemberian daring, Stripe menangani transaksi multi-mata uang:

- **Konversi otomatis** -- Stripe mengonversi mata uang ke mata uang default akun Anda
- **Nilai tukar** -- Stripe menggunakan nilai tukar pasar terkini
- **Biaya** -- Konversi mata uang dapat dikenakan biaya Stripe tambahan
- **Mata uang pencairan** -- Dana disetorkan dalam mata uang default akun Anda

:::info
Periksa dasbor Stripe Anda untuk melihat nilai tukar terkini dan biaya apa pun yang terkait dengan transaksi multi-mata uang.
:::

## Pertimbangan Akuntansi

Saat menangani beberapa mata uang:

- **Pencatatan** -- Simpan catatan jumlah dan mata uang asli donasi untuk pelaporan yang akurat
- **Nilai tukar** -- Perhatikan bahwa nilai tukar Stripe mungkin berbeda dengan nilai tukar bank Anda
- **Kwitansi pajak** -- Konsultasikan dengan akuntan Anda tentang cara melaporkan donasi dalam mata uang berbeda untuk keperluan pajak
- **Alokasi dana** -- Anda dapat mengalokasikan donasi ke dana tertentu terlepas dari mata uangnya

## Praktik Terbaik

- **Mata uang default** -- Atur mata uang utama gereja Anda sebagai default untuk sebagian besar transaksi
- **Komunikasi yang jelas** -- Beri tahu donatur dalam mata uang apa mereka memberi selama proses checkout
- **Pelaporan yang konsisten** -- Total gabungan selalu dikonversi secara otomatis ke mata uang gereja Anda; gunakan filter mata uang per donasi saat Anda perlu melihat jumlah asli
- **Rekonsiliasi rutin** -- Cocokkan pencairan Stripe dengan catatan donasi Anda, dengan memperhitungkan konversi mata uang

## Batasan

- Konversi mata uang untuk pemrosesan pembayaran hanya ditangani oleh Stripe untuk pemberian daring; donasi manual dicatat sebagaimana dimasukkan tanpa konversi otomatis
- Laporan historis dan item donasi individual selalu menampilkan mata uang asli tempat pemberian dicatat
- Total gabungan (kartu KPI, total batch, total dana) dikonversi ke mata uang gereja Anda menggunakan nilai tukar terkini -- nilai tukar ini mungkin sedikit berbeda dari nilai tukar bank Anda atau Stripe pada saat dana diselesaikan

## Artikel Terkait

- [Pengaturan Pemberian Daring](./online-giving-setup.md) -- Konfigurasi Stripe untuk menerima donasi
- [Mencatat Donasi](./recording-donations.md) -- Memasukkan catatan donasi secara manual
- [Laporan Donasi](./donation-reports.md) -- Membuat dan melihat ringkasan donasi
- [Laporan Pemberian](./giving-statements.md) -- Membuat laporan pemberian akhir tahun
