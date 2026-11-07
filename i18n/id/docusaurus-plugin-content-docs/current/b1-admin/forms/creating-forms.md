---
title: "Membuat Formulir"
description: "Buat formulir kustom di B1 Admin untuk pendaftaran acara, survei, dan kartu pengunjung, lalu bagikan lewat tautan, kode QR, atau cetakan."
---

# Membuat Formulir

<div class="article-intro">

Buat formulir khusus untuk mengumpulkan informasi dari jemaat Anda. Anda dapat membuat formulir untuk pendaftaran acara, survei, kartu pengunjung, aplikasi keanggotaan, dan lainnya. Formulir dapat ditautkan ke orang-orang dalam basis data Anda atau digunakan sebagai halaman mandiri dengan URL publik sendiri.

</div>

## Video Pelatihan

<YouTube id="sr9wxEj9ghQ" title="Membuat Formulir dan Mengelola Pengajuan di B1" next="Meluncurkan Situs Web Gereja Anda di B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Untuk formulir **Orang** (yang ditautkan ke catatan orang), Anda perlu [menambahkan orang ke basis data Anda](../people/adding-people.md) terlebih dahulu.
- Untuk formulir yang mengumpulkan **pembayaran**, Anda harus [mengonfigurasi Stripe untuk pemberian daring](../donations/online-giving-setup.md).

</div>

## Membuat Formulir Baru

1. Buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas B1 Admin), perluas **People**, lalu klik **Forms**.
2. Klik **Add Form**.
3. Masukkan **nama** untuk formulir Anda.
4. Pilih jenis formulir dari menu tarik-turun **Associate With**:
   - **People** — Mengaitkan pengajuan dengan [catatan orang](../people/adding-people.md) dalam basis data Anda. Formulir People diisi dari catatan seseorang, sehingga tidak memiliki tautan yang dapat dibagikan.
   - **Stand Alone** — Membuat formulir independen dengan URL publik sendiri, ideal untuk pendaftaran eksternal. Hanya formulir Stand Alone yang menawarkan [foto header](#adding-a-header-photo), [kode QR](#sharing-a-form-with-a-qr-code), [grup tertaut](#linking-a-form-to-a-group), dan **Create a person record from submissions**.
5. Klik **Save** untuk membuat formulir.

Formulir baru Anda akan muncul dalam daftar. Klik formulir tersebut untuk mulai menambahkan pertanyaan.

## Mencetak Formulir Kosong {#printing-a-blank-form}

Perlu salinan cetak untuk dibagikan, misalnya kartu pengunjung di meja selamat datang, atau formulir yang bisa diisi dengan tangan oleh orang yang tidak memiliki akses internet? Klik **Print** di sebelah formulir pada daftar Forms utama untuk membuka pratinjau, lalu klik **Print**. Kolom kosong akan dicetak dengan garis bawah atau kotak centang untuk setiap pertanyaan sehingga orang dapat mengisinya dengan tangan; pertanyaan wajib ditandai dengan tanda bintang. Bagian atas halaman menampilkan logo gereja Anda (**Light Background Logo** dari [Website > Appearance](../website/appearance.md), jika Anda telah mengunggahnya) beserta nama gereja di bawahnya, kemudian nama formulir. Tidak ada opsi cetak lainnya — cetak seluruh formulir atau tidak sama sekali.

## Membagikan Formulir dengan Kode QR {#sharing-a-form-with-a-qr-code}

Formulir Stand Alone memiliki tautan **QR Code** di sebelahnya pada daftar Forms utama (formulir yang diarsipkan tidak memilikinya). Klik tautan tersebut untuk membuka kode QR untuk URL publik formulir, dengan tautan ditampilkan di bawahnya. Klik **Download PNG** untuk menyimpan kode sebagai gambar yang dapat Anda cetak pada buletin atau tampilkan di slide. Siapa pun yang memindainya akan membuka formulir di ponsel mereka.

## Menambahkan Pertanyaan {#adding-questions}

1. Buka formulir Anda dan pergi ke tab **Questions**.
2. Klik **Add Question**.
3. Pilih **jenis kolom** dari menu tarik-turun Provider. Jenis yang tersedia meliputi:
   - **Textbox** — Untuk jawaban teks singkat
   - **Date** — Untuk pilihan tanggal
   - **Email** — Untuk alamat email
   - **Phone Number** — Untuk input nomor telepon
   - **Multiple Choice** — Untuk memilih dari opsi yang telah ditentukan
   - **Payment** — Untuk mengumpulkan pembayaran
4. Masukkan **Title** dan **Description** opsional untuk pertanyaan tersebut. Deskripsi muncul di bawah pertanyaan saat orang mengisi formulir, jadi gunakan untuk petunjuk seperti "Sertakan alergi apa pun yang perlu kami ketahui."
5. Centang **Require an answer** jika kolom ini wajib diisi.
6. Klik **Save**.
7. Ulangi untuk menambahkan pertanyaan lainnya.

:::warning
Jenis kolom **Payment** memerlukan konfigurasi Stripe. Jika Anda belum menyiapkan pemberian daring, lihat [Penyiapan Pemberian Daring](../donations/online-giving-setup.md) sebelum menambahkan kolom pembayaran. Orang yang membayar pada formulir tanpa masuk harus mencentang **I'm not a robot** (Saya bukan robot) sebelum kartu mereka diterima.
:::

## Mengelola Anggota Formulir {#managing-form-members}

1. Buka formulir Anda dan pergi ke tab **Form Members**.
2. Cari seseorang dan tambahkan mereka dengan peran:
   - **Admin** — Dapat mengedit formulir dan melihat semua pengajuan.
   - **View Only** — Dapat melihat pengajuan tetapi tidak dapat mengedit formulir.

## Menautkan Formulir ke Grup {#linking-a-form-to-a-group}

Anda dapat menautkan formulir Stand Alone mana pun ke grup — misalnya, formulir permintaan doa untuk grup kecil, atau surat izin medis untuk perjalanan remaja:

1. Buka **Details** formulir Anda.
2. Di bawah **Linked group**, pilih grup, atau biarkan diatur ke **None**.
3. Klik **Save**.

Setelah formulir ditautkan:

- **Anggota grup** melihat formulir di bagian **Forms** pada halaman grup di B1.church selama formulir terbuka, dengan tombol **Fill out** yang membukanya (lihat [Detail Grup](../../b1-church/groups/group-details.md#linked-forms)).
- **Pemimpin grup** juga melihat formulir yang sudah ditutup, dan dapat membaca jawaban setiap pengajuan serta mencetaknya (satu pengajuan atau **Print all**). Pemimpin hanya dapat melihat jawaban — mereka tidak dapat mengedit formulir kecuali mereka juga merupakan [anggota formulir](#managing-form-members).
- **Di B1 Admin**, halaman grup menampilkan bagian **Linked forms** yang mencantumkan setiap formulir tertaut sebagai **Open** atau **Closed**. Bagian ini muncul bagi pemimpin grup dan orang yang dapat mengelola formulir. Lihat [Anggota Grup](../groups/group-members.md#linked-forms).

Formulir ditutup ketika berada di luar rentang waktu ketersediaannya. Formulir yang diarsipkan tidak ditampilkan di halaman grup.

### Menambahkan Pengirim Secara Otomatis ke Grup {#automatically-adding-submitters-to-a-group}

Menautkan formulir ke grup tidak otomatis menambahkan siapa pun ke dalamnya. Untuk menambahkan setiap pengirim ke daftar anggota grup tertaut, aktifkan juga **Create a person record from submissions** di detail formulir dan klik **Save**.

Setiap kali seseorang mengirimkan formulir, orang yang cocok atau baru dibuat akan ditambahkan ke grup (anggota grup yang sudah ada dilewati). Ini berguna untuk hal seperti formulir pendaftaran kemah yang seharusnya otomatis membentuk daftar anggota grup kemah.

### Mengirim Email Tindak Lanjut

Dengan **Create a person record from submissions** diaktifkan, Anda juga dapat mengirim email kepada setiap orang yang mengirimkan formulir. Isi **Follow-up Email Subject** dan **Follow-up Email Body** di detail formulir. Anda dapat menggunakan token `{firstName}` dan `{churchName}` di keduanya. Email hanya dikirim jika kedua kolom sudah terisi.

:::info
Email tindak lanjut hanya dikirim setelah gereja Anda disetujui untuk mengirim email grup, dan email tersebut dihitung dalam batas email harian gereja Anda. Lihat [Mengaktifkan Email Grup untuk Gereja Anda](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Menduplikasi Formulir

Untuk menggunakan kembali formulir sebagai titik awal bagi formulir baru, klik **Duplicate** di sebelah formulir pada daftar Forms lalu konfirmasi. B1 membuat salinan persis dari formulir — termasuk semua pertanyaan — yang kemudian dapat Anda ganti nama dan edit secara independen.

:::tip
Duplikasi sangat berguna untuk acara berulang yang pertanyaan pendaftarannya tetap sama dari tahun ke tahun. Duplikasi formulir tahun lalu, perbarui nama dan tanggal, dan Anda siap digunakan.
:::

## Mengonfigurasi Properti Formulir

Anda dapat memperbarui nama dan pengaturan formulir kapan saja. Untuk formulir Stand Alone, Anda juga akan melihat **URL publik** unik yang dapat dibagikan kepada siapa saja, beserta kolom **Description** — teks yang ditampilkan di atas pertanyaan pada halaman formulir publik, berguna untuk menjelaskan tujuan formulir sebelum orang mulai mengisinya.

### Menambahkan Foto Header {#adding-a-header-photo}

Formulir Stand Alone dapat menampilkan **Header Photo** di bagian atas formulir. Di detail formulir, klik kotak foto atau **Add Photo**, lalu pilih atau unggah gambar (gambar akan dipotong menjadi rasio 16:9). Klik **Save**. Foto akan muncul di bawah nama formulir, di atas deskripsi, pada halaman URL publik formulir, dan di mana pun formulir disematkan melalui elemen **Form** website. Gunakan **Change Photo** untuk menggantinya atau **Remove** untuk menghapusnya.

Gunakan kolom **Thank You Message** untuk menentukan apa yang dilihat orang setelah mengirimkan formulir, termasuk pada halaman URL publik formulir. Jika dibiarkan kosong, mereka akan melihat "Terima kasih telah mengirimkan formulir!"

:::tip
Formulir Stand Alone sangat cocok untuk pendaftaran acara. Bagikan URL publik melalui email, media sosial, atau sematkan formulir langsung di situs web gereja Anda.
:::

:::info
Untuk menyematkan formulir di situs web B1 Anda, buka editor situs web, tambahkan bagian baru, lalu pilih elemen **Form**. Kemudian pilih formulir yang ingin ditampilkan. Lihat [Mengelola Halaman](../website/managing-pages.md) untuk detail tentang mengedit situs web Anda.
:::
