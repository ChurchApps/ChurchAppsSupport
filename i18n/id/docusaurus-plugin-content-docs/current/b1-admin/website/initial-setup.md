---
title: "Pengaturan Awal"
---

# Pengaturan Awal

<div class="article-intro">

Setiap akun B1 sudah dilengkapi dengan situs web yang siap digunakan. Panduan ini akan membantu Anda mengatur domain gereja, mengonfigurasi tampilan situs, membuat halaman pertama, dan menata navigasi.

</div>

<div class="prereqs">
<h4>Sebelum Anda Memulai</h4>

- Anda memerlukan akun B1.church dengan akses administratif
- Jika menggunakan domain kustom, siapkan kredensial login penyedia DNS Anda (misalnya GoDaddy, Cloudflare, atau AWS)
- Siapkan logo gereja Anda dalam format PNG dengan latar belakang transparan untuk hasil terbaik

</div>

## Mengatur Domain Anda

Gereja Anda secara otomatis menerima subdomain di B1.church (misalnya, `yourchurch.b1.church`). Anda juga dapat mengarahkan domain kustom Anda sendiri ke situs B1 Anda.

1. Buka **B1.church Admin** dengan mengunjungi admin.b1.church atau dengan mengklik menu dropdown profil Anda lalu memilih **Switch App**.
2. Buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), perluas **Settings**, lalu klik **Settings**.
3. Buka bagian **Church Information** untuk melihat subdomain Anda. Atur menjadi sesuatu yang singkat dan mudah dikenali tanpa spasi.
4. Untuk menggunakan domain kustom, masuk ke penyedia DNS Anda (seperti GoDaddy, Cloudflare, atau AWS) dan tambahkan dua rekaman:
   - Rekaman **A** untuk domain utama Anda yang mengarah ke `3.23.251.61`
   - Rekaman **CNAME** untuk `www` yang mengarah ke `proxy.b1.church`
5. Kembali ke B1.church Admin, buka bagian **Domains** pada halaman Settings yang sama, tambahkan domain kustom Anda ke daftar, lalu klik **Add** kemudian **Save**. Situs Anda akan dapat diakses melalui domain kustom dalam beberapa menit.

:::tip
Jika Anda tidak melihat opsi Settings, mintalah orang yang menyiapkan akun gereja Anda untuk memberi Anda izin "Edit Church Settings". Lihat [Peran & Izin](../settings/roles-permissions.md) untuk detailnya.
:::

## Membuat Halaman Pertama Anda

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), perluas **Website**, lalu klik **Pages**.
2. Klik **Add Page** di pojok kanan atas.
3. Pilih **Blank** sebagai jenis halaman dan beri nama "Home."
4. Klik **Page Settings** dan atur jalur URL ke `/` (garis miring tanpa teks) untuk halaman utama Anda. Halaman lain menggunakan `/nama-halaman`.
5. Klik **Edit Content** untuk mulai membangun halaman. Setiap halaman harus dimulai dengan **Section** -- ini adalah wadah untuk semua elemen lainnya.
6. Setelah menambahkan section, klik **Add Content** lagi untuk menyisipkan teks, gambar, video, kartu, formulir, dan lainnya dengan menyeretnya ke dalam section Anda.

:::info
Untuk petunjuk terperinci tentang mengelola halaman dan navigasi, lihat [Mengelola Halaman](managing-pages). Untuk panduan lengkap editor visual, lihat [Menggunakan Editor Halaman](page-editor).
:::

## Mengonfigurasi Tampilan Situs

1. Di menu Jump, pilih **Website > Appearance**.
2. Gunakan **Color Palette** untuk mengatur warna merek Anda untuk nada primer, sekunder, dan aksen.
3. Di bawah **Fonts**, pilih font judul dan font isi dari penjelajah font.
4. Unggah logo gereja Anda di bawah **Logo** pada Style Settings. Sediakan versi dengan latar belakang terang dan latar belakang gelap.
5. Konfigurasi **Site Footer** dengan informasi kontak dan tautan gereja Anda.

:::info
Perubahan yang Anda buat di Appearance berlaku di seluruh situs web Anda. Lihat halaman [Appearance](appearance) untuk petunjuk terperinci tentang setiap pengaturan.
:::

## Mengatur Navigasi

Tautan navigasi Anda muncul di tampilan Website Pages. Untuk menatanya:

1. Klik **Add** untuk membuat tautan navigasi baru dan arahkan ke salah satu halaman Anda.
2. Seret dan lepas tautan untuk mengurutkannya ulang atau menempatkannya di bawah item induk.
3. Pratinjau situs Anda untuk memastikan navigasi sudah benar.

## Langkah Selanjutnya

- [Mengelola Halaman](managing-pages) -- Pelajari cara bekerja dengan halaman dan navigasi secara terperinci
- [Appearance](appearance) -- Sesuaikan warna, font, dan tata letak situs Anda
- [Files](files) -- Unggah gambar dan dokumen untuk situs web Anda
