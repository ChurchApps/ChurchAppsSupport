---
title: "Mengelola Halaman"
---

# Mengelola Halaman

<div class="article-intro">

Tampilan Halaman Situs Web adalah pusat kendali Anda untuk membuat, mengedit, dan mengatur semua halaman di situs web gereja Anda. Dari satu layar ini, Anda dapat mengelola konten halaman sekaligus navigasi situs Anda.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Selesaikan [Pengaturan Awal](initial-setup) untuk mengonfigurasi domain dan pengaturan dasar situs Anda
- Siapkan konten dan gambar Anda. Gunakan pengelola [Berkas](files) untuk mengunggah aset media terlebih dahulu.

</div>

:::info
Jika gereja Anda memiliki lebih dari satu situs web (misalnya, situs terpisah untuk setiap kampus), gunakan pengalih situs di bagian atas tampilan Halaman Situs Web untuk berpindah di antara situs-situs tersebut. Setiap situs memiliki halaman, navigasi, dan pengaturan [tampilan](appearance) sendiri.
:::

## Memahami Jenis Halaman

Tabel **Halaman** mencantumkan setiap halaman di situs Anda berdasarkan **Jalur** dan **Judul**. Ada dua jenis halaman:

- **Dibuat otomatis** -- Halaman yang dibuat secara otomatis oleh sistem berdasarkan data gereja Anda (misalnya, halaman Kelompok, halaman Khotbah, atau halaman individual untuk setiap khotbah di perpustakaan Anda). Halaman ini menampilkan lencana **Dibuat otomatis** dan diperbarui sendiri seiring perubahan data Anda.
- **Kustom** -- Halaman yang Anda buat sendiri dengan konten dan tata letak Anda sendiri.

Anda dapat mengubah halaman yang dibuat otomatis menjadi halaman kustom jika ingin kendali penuh atas konten dan desainnya. Klik **Konversi** di samping halaman yang dibuat otomatis, lalu konfirmasi.

## Menambah dan Mengedit Halaman

1. Klik tombol **Tambah Halaman** di pojok kanan atas tampilan Halaman Situs Web.
2. Pilih jenis halaman (kosong atau templat) dan beri nama.
3. Klik **Edit Konten** di samping halaman mana pun untuk membuka [editor halaman](page-editor), tempat Anda dapat menambahkan bagian, teks, gambar, dan elemen lainnya.
4. Klik **Pengaturan Halaman** di samping halaman untuk memperbarui judul halaman, jalur URL, dan metadata lainnya.
5. Klik jalur halaman di kolom **Jalur** untuk membuka halaman langsung di tab baru dan melihat tampilannya bagi pengunjung.

:::tip
Untuk halaman utama Anda, atur jalur URL hanya menjadi `/`. Untuk semua halaman lain, gunakan jalur deskriptif seperti `/about` atau `/contact`.
:::

### Pengaturan Halaman

Buka **Pengaturan Halaman** pada halaman mana pun untuk mengonfigurasi:

- **Judul dan Jalur URL** -- Nama halaman dan alamatnya di situs Anda.
- **Visibilitas** -- Pilih siapa yang dapat melihat halaman: semua orang, hanya anggota, hanya staf, atau anggota grup tertentu. Ini adalah cara cepat untuk membatasi halaman pribadi (seperti halaman sumber daya staf) tanpa kata sandi terpisah.
- **Deskripsi Meta** -- Ringkasan singkat yang ditampilkan di hasil mesin pencari dan pratinjau tautan media sosial.
- **Pengalihan** -- Arahkan jalur URL lama ke halaman ini, sehingga tautan dan markah ke halaman yang sudah tidak digunakan tetap berfungsi.

## Mengelola Navigasi

Panel **Navigasi Utama** di sisi kanan tampilan Halaman Situs Web menampilkan tautan navigasi Anda. Tautan-tautan ini mengontrol menu yang dilihat pengunjung di situs web Anda.

1. Klik **Tambah** untuk membuat tautan navigasi baru. Anda dapat mengarahkannya ke halaman mana pun di situs Anda atau ke URL eksternal.
2. Untuk mengatur ulang tautan, seret dan lepaskan ke urutan yang Anda inginkan. Anda juga dapat menyusun tautan di bawah item induk untuk membuat menu tarik-turun.
3. Klik tautan mana pun untuk membuka **Pengaturan Tautan**, tempat Anda dapat mengubah teks, URL, atau halaman induknya.
4. Untuk menghapus tautan dari navigasi, buka **Pengaturan Tautan**-nya lalu klik **Hapus**.

:::info
Menghapus tautan navigasi tidak menghapus halamannya. Halaman tetap ada dan dapat diakses langsung melalui URL-nya -- hanya saja tidak akan muncul di menu.
:::

## Sakelar untuk Seluruh Situs

Di bawah tautan pada panel **Navigasi Utama** terdapat dua sakelar yang berlaku untuk seluruh situs web gereja Anda:

- **Tampilkan Masuk** -- Menampilkan tombol **Masuk** di bilah navigasi situs web Anda.
- **Nonaktifkan Situs Web Publik** -- Mematikan situs web publik Anda. Gunakan ini jika gereja Anda hanya menggunakan B1 untuk portal anggota, pemberian persembahan, dan pendaftaran, dan menyimpan situs utamanya di tempat lain.

### Dampak Menonaktifkan Situs Web Publik

Saat **Nonaktifkan Situs Web Publik** aktif:

- Setiap halaman publik, termasuk halaman utama dan halaman kustom Anda, akan mengarahkan pengunjung yang belum masuk ke layar masuk. Setelah masuk, mereka akan kembali ke halaman yang mereka minta.
- Anggota yang sudah masuk tetap melihat situs web lengkap seperti biasa, termasuk navigasi Anda dan halaman bawaan **Dibuat otomatis** (seperti Kelompok dan Khotbah). Halaman yang dibuat otomatis tidak lagi muncul di tabel Halaman.
- Mesin pencari diberi tahu untuk tidak mengindeks situs. Peta situs dikosongkan dan `robots.txt` memblokir semua perayapan.

Tautan berikut tetap berfungsi, sehingga anggota dan tamu tetap dapat mengaksesnya:

- Masuk dan keluar
- Portal anggota (semua yang ada di bawah `/mobile`)
- Tautan [pendaftaran acara](../guides/event-registration.md) dan pendaftaran tamu

Sebuah peringatan muncul di bawah sakelar saat situs web publik dimatikan. Nyalakan kembali sakelar untuk mengaktifkan halaman Anda. Tidak ada yang dihapus selama situs dinonaktifkan.

:::info
Pengaturan ini berlaku untuk seluruh gereja Anda. Jika Anda memiliki lebih dari satu situs, pengaturan ini mematikan semuanya, bukan hanya situs yang dipilih di pengalih situs.
:::

## Tips Mengatur Situs Anda

- Batasi navigasi tingkat atas Anda hingga lima atau enam item agar pengunjung dapat menemukan sesuatu dengan cepat.
- Gunakan tautan bertingkat untuk subhalaman yang terkait (misalnya, menu tarik-turun "Tentang" dengan "Tim Kami," "Keyakinan," dan "Sejarah").
- Periksa navigasi Anda di ponsel untuk memastikan berfungsi dengan baik di layar yang lebih kecil.
- Beri halaman nama yang jelas dan deskriptif agar pengunjung memahami apa yang akan mereka temukan.

:::tip
Anda dapat menambahkan [formulir](../forms/creating-forms.md) ke halaman Anda untuk mengumpulkan pendaftaran, permintaan doa, atau informasi lainnya dari pengunjung.
:::

## Memulai dari Templat Situs

Jika Anda membangun situs dari awal, Anda dapat menggunakan **Templat Situs** untuk memulainya, alih-alih membuat halaman satu per satu. Templat situs membuat sekumpulan halaman siap pakai -- beranda, tentang, terhubung, beri, dan lainnya -- dengan konten contoh dan tautan navigasi yang sudah terhubung.

1. Pada layar Halaman, klik tombol **Mulai dari Templat** (di samping tombol **Tambah Halaman**).
2. Telusuri templat yang tersedia dan klik salah satu untuk melihat pratinjau struktur halamannya.
3. Saat menemukan yang Anda sukai, klik **Terapkan Templat**.
4. Halaman yang belum ada akan dibuat dan ditambahkan ke navigasi Anda. Halaman yang sudah ada dibiarkan apa adanya.

Setelah menerapkan templat, buka setiap halaman di [editor halaman](page-editor) untuk mengganti teks dan gambar contoh dengan konten asli gereja Anda.

:::info
Templat situs membuat struktur halaman dan navigasi. Templat tidak menimpa skema warna atau font situs Anda -- itu dikendalikan oleh [Tampilan](appearance).
:::

## Lightbox Gambar

Ketika pengunjung mengklik gambar di situs web Anda, gambar tersebut akan terbuka dalam lapisan lightbox layar penuh. Ini memungkinkan orang melihat foto dalam ukuran lebih besar tanpa meninggalkan halaman. Tidak diperlukan konfigurasi -- lightbox otomatis aktif untuk gambar di konten halaman Anda.

## Langkah Selanjutnya

- [Pengaturan Awal](initial-setup) -- Petunjuk pengaturan pertama kali
- [Menggunakan Editor Halaman](page-editor) -- Pelajari cara membangun dan mendesain konten halaman
- [Tampilan](appearance) -- Sesuaikan tema visual situs Anda
- [Berkas](files) -- Unggah dan kelola aset media untuk halaman Anda
