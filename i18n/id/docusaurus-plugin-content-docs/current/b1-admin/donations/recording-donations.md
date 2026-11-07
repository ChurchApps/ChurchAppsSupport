---
title: "Mencatat Donasi"
description: "Catat donasi gereja di B1 Admin dengan membuat batch, memasukkan pemberian satu per satu, mengimpor CSV, atau mencatat satu pemberian dari profil donatur."
---

# Mencatat Donasi

<div class="article-intro">

Mencatat donasi di B1 Admin dilakukan melalui sistem Batch. Anda membuat batch untuk mewakili satu kumpulan dana (misalnya persembahan hari Minggu), lalu menambahkan donasi individual ke dalam batch tersebut. Cara ini menjaga catatan pemberian tetap teratur dan mudah dicocokkan.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Siapkan [dana](funds.md) Anda agar donasi dapat ditetapkan ke kategori yang tepat
- Buat [batch](batches.md) untuk menampung donasi yang akan Anda masukkan
- Pastikan para donatur sudah ada di [direktori jemaat](../people/adding-people.md) agar Anda dapat mencari mereka saat memasukkan pemberian
- Anda memerlukan izin **Edit Donations**, atau **Enter Donations** bersama **View Donations**, untuk memasukkan pemberian ke dalam batch (lihat [Siapa yang Dapat Mengubah Batch](batches.md#who-can-change-a-batch))

</div>

## Membuat Batch dan Menambahkan Donasi

1. Di **B1 Admin**, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas), perluas **Donations**, lalu klik **Batches**.
2. Klik **Add Batch** di bagian atas halaman.
3. Masukkan nama batch (misalnya "Persembahan Minggu - 5 Jan") dan pilih tanggalnya. Klik **Save**.
4. Batch baru Anda muncul dalam daftar dengan jumlah donasi nol dan $0.00.
5. Klik **nama batch** untuk membukanya.

## Memasukkan Donasi Satu per Satu

1. Pada halaman detail batch, panel entri donasi muncul di samping daftar donasi. Di bawah **Select Person or Anonymous**, ketik nama donatur di kolom pencarian untuk menemukannya, atau klik **Anonymous**. (Mengklik **Add Donation** di bagian atas halaman akan langsung membawa Anda ke panel ini.)
2. Setelah memilih seseorang, formulir entri menampilkan kolom **Date**, **Method** (Check, Cash, Card, atau In-Kind), **Fund**, **Notes**, **Amount**, dan **Check #** (atau **Last 4 digits** untuk pemberian kartu, atau **Item** untuk menjelaskan pemberian in-kind). Klik **Change** di samping nama donatur untuk memilih orang lain.
3. Isi detailnya lalu klik **Add Donation** (atau tekan Enter).
4. Donasi akan ditambahkan ke daftar donasi, dan formulir akan dikosongkan agar Anda dapat memasukkan donasi berikutnya.

:::info
Jika batch telah [ditutup](batches.md#closing-and-reopening-a-batch), panel entri dan tautan **Edit** disembunyikan bagi siapa pun yang tidak memiliki izin **Edit Donations**, dan sebuah pemberitahuan di bagian atas batch menyatakan bahwa batch tersebut sudah ditutup. Mintalah seseorang yang memiliki izin **Edit Donations** untuk membukanya kembali.
:::

:::tip
Anda dapat dengan cepat memasukkan beberapa donasi berturut-turut tanpa meninggalkan halaman batch. Formulir akan dikosongkan setelah setiap entri sehingga Anda dapat memproses tumpukan cek atau amplop dengan efisien.
:::

## Mengimpor Donasi dari File CSV {#importing-donations-from-a-csv-file}

Jika donasi Anda sudah ada dalam spreadsheet, misalnya hasil ekspor dari sistem pemberian lain atau lembar hitung dari tim penghitung, Anda dapat mengimpornya ke dalam batch alih-alih mengetik satu per satu.

1. Buka batch lalu klik **Import CSV** di bagian atas halaman. (Tombol ini muncul ketika Anda dapat mengubah batch dan gereja Anda memiliki setidaknya satu [dana](funds.md).)
2. Klik **Choose CSV File** lalu pilih file Anda. File harus memiliki baris judul, dan kolomnya boleh berada dalam urutan apa pun:
   - **Amount** (wajib; `Total` juga diterima) -- Simbol mata uang dan koma diabaikan, jadi `$1,250.00` sudah benar. Jumlahnya harus lebih besar dari nol.
   - **Date** -- Gunakan format seperti `2026-10-25` atau `10/25/2026`. Jika dikosongkan, tanggal batch akan digunakan.
   - **Fund** -- Nama dana, dicocokkan tanpa memperhatikan huruf besar atau kecil. Jika dikosongkan, dana pertama Anda akan digunakan.
   - **Method** -- **Check**, **Cash**, **Card**, atau **In-Kind**. Jika dikosongkan, **Check** akan digunakan.
   - **Check Number** -- Nomor cek (atau rincian pembayaran lainnya).
   - **Notes**
   - **Email**, **Name**, atau **First Name** dan **Last Name** -- Digunakan untuk mencocokkan donatur dengan seseorang di basis data Anda. Nama yang ditulis "Smith, John" dibaca sebagai "John Smith".
3. Tinjau pratinjau. Setiap baris menampilkan nomor barisnya, donatur dari file, **Match**, dana, dan jumlahnya:
   - Nama seseorang berarti donatur telah dicocokkan. B1 mencocokkan berdasarkan email terlebih dahulu, lalu berdasarkan nama persis, dan hanya jika tepat satu orang yang sesuai.
   - **Not found — anonymous** berarti tidak ditemukan satu pun kecocokan. Pemberian diimpor sebagai anonim, dan "Imported as:" beserta nama donatur ditambahkan ke catatannya agar Anda dapat menetapkannya nanti.
   - Pesan merah seperti **Invalid amount**, **Unknown fund**, **Unknown method**, atau **Invalid date** berarti baris tersebut akan dilewati. Perbaiki file lalu pilih ulang agar baris itu disertakan.
4. Klik **Import** (tombol menampilkan berapa banyak baris yang akan diimpor). Donasi akan ditambahkan ke batch.

:::tip
Setelah mengimpor, gunakan **Edit** pada donasi anonim mana pun untuk memilih orang yang tepat. Catatan "Imported as:" memberi tahu Anda siapa yang tertulis dalam file sebagai pengirimnya.
:::

## Mencatat Pemberian dari Catatan Seseorang

Untuk mencatat satu pemberian tanpa membuka batch, buka catatan donatur di **People** lalu klik **Log a gift** (di ringkasan pemberian, atau di tampilan pemberian orang tersebut).

1. Atur **Date** dan **Amount**.
2. Pilih **Fund** dan **Method** (Check, Cash, Card, atau In-Kind), lalu masukkan **Check #**, **Last 4 digits**, atau **Item** (untuk pemberian in-kind) jika diperlukan.
3. Opsional, tambahkan **Notes**, lalu klik **Save**.

Pemberian akan disimpan ke batch untuk tanggal tersebut. Jika belum ada batch untuk tanggal itu, sebuah batch akan dibuat secara otomatis dan diberi nama sesuai tanggal.

## Membagi Donasi ke Beberapa Dana

Terkadang seorang donatur memberikan ke lebih dari satu dana dalam satu transaksi. Untuk menanganinya:

1. Di bawah panel entri, klik tautan **full donation editor** (atau klik **Edit** pada baris donasi yang sudah ada).
2. Di editor lengkap, tambahkan jumlah ke dana yang berbeda. Total akan dihitung otomatis dari jumlah setiap dana.
3. Klik **Save** untuk memperbarui donasi.

:::info
Membagi donasi ke beberapa dana umum dilakukan ketika donatur menulis satu cek yang ditujukan untuk beberapa tujuan, misalnya Dana Umum dan Misi.
:::

## Mengedit atau Menghapus Donasi

Untuk mengedit donasi, klik tombol **Edit** pada barisnya di batch. Anda dapat mengubah tanggal, jumlah, dana, metode pembayaran (Check, Cash, Card, atau In-Kind), atau detail lainnya. Untuk pemberian in-kind, editor memberi label **Item** pada kolom detail agar Anda dapat menjelaskan apa yang diberikan. Klik **Save** jika sudah selesai.

:::tip
Baris di bawah nama batch di bagian atas halaman akan diperbarui secara otomatis untuk menampilkan tanggal batch, jumlah pemberian, dan total nominal saat Anda menambah atau mengubah entri. Gunakan ini untuk mencocokkan dengan slip setoran Anda.
:::

## Mengembalikan Dana Donasi

Jika donatur dikenakan biaya secara keliru atau meminta uangnya dikembalikan, Anda dapat mengembalikan donasi yang sudah selesai langsung dari layar editnya, tanpa perlu membuka dasbor penyedia pembayaran.

1. Buka donasi lalu klik **Edit**.
2. Klik tombol **Refund** di sebelah Delete di bagian bawah formulir.
3. Konfirmasi dialog: "Refund this donation in full through the payment gateway? This cannot be undone."

Donasi akan dikembalikan penuh melalui penyedia pembayaran asli dan ditandai **Refunded** di daftar donasi Anda.

:::warning
Pengembalian dana hanya bisa penuh -- tidak ada cara untuk mengembalikan sebagian jumlah dari B1 Admin. Pengembalian dana juga tidak dapat dibatalkan setelah dikonfirmasi.
:::

:::info
Tombol **Refund** hanya muncul untuk donasi yang dibayar secara daring (memiliki transaksi gateway) dan masih berstatus **Complete**. Donasi yang dimasukkan secara manual (tunai, cek) tidak memiliki transaksi gateway untuk dikembalikan -- edit atau hapus donasi tersebut.
:::

## Mencetak Kwitansi untuk Satu Pemberian

Ketika seseorang menyerahkan cek, membayar untuk acara atau kaus, atau sebuah organisasi tamu membawa donasi, Anda dapat mencetak kwitansi hanya untuk pemberian tersebut, alih-alih untuk seluruh batch atau laporan akhir tahun.

1. Buka batch yang berisi donasi tersebut.
2. Klik **Receipt** di sebelah **Edit** pada baris donasi. Anda juga dapat mengklik **Receipt** di bagian bawah formulir Edit Donation.
3. Klik **Print**, atau **Close** untuk kembali.

Kwitansi menggunakan tata letak yang sama dengan laporan pemberian: gereja Anda dan donatur (atau "Anonymous"), tanggal dan metode pemberian, setiap dana dan jumlahnya, catatan, Giving Note Anda, serta blok kwitansi resmi jika Anda telah mengatur **Statement format** (lihat [Laporan Pemberian](giving-statements.md)). Nomor kwitansi di blok tersebut adalah ID donasi.

:::info
Kalimat "tidak ada barang atau jasa" hanya dicetak ketika setiap dana pada pemberian ditandai sebagai dapat dikurangkan dari pajak. Jika sebagian pemberian masuk ke dana yang tidak dapat dikurangkan dari pajak, misalnya biaya acara atau pembelian, kalimat tersebut dihilangkan agar kwitansi terbaca sebagai pembayaran, bukan sumbangan amal.
:::

:::tip
Pemberian daring sudah otomatis mendapatkan email ucapan terima kasih, jadi kwitansi terutama berguna untuk pemberian yang Anda masukkan secara manual.
:::

## Langkah Selanjutnya

- Tinjau entri Anda menggunakan [Laporan Donasi](donation-reports.md) untuk memastikan keakuratannya
- Pada akhir tahun, buat [Laporan Pemberian](giving-statements.md) untuk donatur Anda
