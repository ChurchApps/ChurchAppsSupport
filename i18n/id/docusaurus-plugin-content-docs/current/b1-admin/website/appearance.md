---
title: "Tampilan"
description: "Atur warna, font, jarak, logo, dan navigasi situs gereja Anda di B1 Admin, serta widget, analitik GA4, pengalihan, dan CSS kustom."
---

# Tampilan

<div class="article-intro">

Halaman Tampilan memungkinkan Anda menyesuaikan tampilan keseluruhan situs web gereja Anda. Dari warna dan font hingga jarak dan CSS kustom, Anda dapat mengatur setiap aspek visual situs Anda dari satu tempat.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Selesaikan [Pengaturan Awal](./initial-setup.md) untuk situs web Anda
- Siapkan logo gereja Anda dalam format PNG dengan latar belakang transparan dan rasio aspek 4:1
- Ketahui warna merek gereja Anda (nilai hex) jika Anda sudah memiliki panduan gaya

</div>

## Mengakses Pengaturan Tampilan

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas) dan perluas **Website**.
2. Klik **Appearance**.
3. Halaman **Site Styles** akan dimuat. Kartu **Theme, fonts & footer** menampilkan daftar **Style Settings** di sebelah kiri dan pratinjau situs contoh di sebelah kanan. Di bawahnya terdapat kartu **Announcement & widgets** dan **Redirects & analytics**.

## Palet Warna {#color-palette}

1. Klik **Color Palette** di panel Style Settings.
2. Anda akan melihat **Base Colors** (nuansa terang, aksen, dan gelap) dan **Semantic Colors** (Primary, Secondary, Success, Warning, dan Error).
3. Klik salah satu kotak warna untuk membuka pemilih warna. Seret penunjuk atau masukkan nilai hex untuk memilih warna Anda.
4. **Color Combinations Preview** menunjukkan bagaimana warna yang Anda pilih berpadu.
5. Gunakan **Suggested Palettes** untuk menerapkan skema warna yang telah dirancang sebelumnya dengan cepat.
6. Klik **Save Palette** setelah Anda puas.

## Tipografi

1. Klik **Fonts** di panel Style Settings.
2. Klik tombol **Heading Font** atau **Body Font** untuk membuka penelusur font. Anda dapat mencari berdasarkan nama atau menelusuri kategori seperti Serif, Sans Serif, Display, Handwriting, dan Monospace. Anda juga dapat memilih salah satu **Popular Font Combinations**.
3. Klik **Save Fonts** untuk menerapkan pilihan font Anda.
4. Untuk menyesuaikan hierarki ukuran Heading 1 hingga Heading 4, klik **Typography Scale** di panel Style Settings. Gunakan kolom **Type Scale** (pengali), **Base Size**, dan **Line Height** untuk penyesuaian halus, lalu klik **Save Typography**.

## Jarak

1. Klik **Spacing Scale** di panel Style Settings.
2. Sesuaikan nilai jarak dari Extra Small hingga Extra Large. Contoh praktis menunjukkan bagaimana setiap nilai memengaruhi tata letak.
3. Klik **Save Spacing** untuk menerapkan nilai-nilai tersebut ke seluruh situs Anda.

## Logo dan Identitas Merek {#logo-and-branding}

1. Klik **Logo** di panel Style Settings.
2. Unggah **Light Background Logo** dan **Dark Background Logo** Anda. Gunakan gambar dengan latar belakang transparan dan rasio aspek 4:1 untuk hasil terbaik.
3. Unggah **Social Media Image** untuk pratinjau tautan dan **Favicon** untuk ikon tab peramban.
4. Klik **Save Changes**. Gambar yang diunggah tidak disimpan sebelum Anda menyimpannya, jadi jika Anda mencoba menutup atau memuat ulang tab peramban terlebih dahulu, peramban akan memberi peringatan bahwa ada perubahan yang belum disimpan.

:::tip
Untuk hasil terbaik, gunakan logo dengan latar belakang transparan dalam format PNG. Ini memastikan logo tampak bagus pada latar belakang terang maupun gelap di seluruh situs web Anda dan [aplikasi seluler](../settings/mobile-app.md).
:::

## Gaya Navigasi

Sesuaikan warna bilah navigasi situs web Anda untuk mode solid dan transparan:

1. Klik **Navigation** di panel Style Settings
2. Atur warna untuk **Header (solid)** dan **Header over hero (transparent)**
3. Klik **Save Navigation** untuk menerapkan warna navigasi Anda

Untuk petunjuk terperinci, lihat [Gaya Navigasi](./navigation-styles.md).

## Pengumuman dan Widget

Widget situs muncul di setiap halaman situs Anda, melayang di atas konten halaman:

- **Announcement Banner** -- Bilah yang dapat ditutup di bagian atas situs Anda untuk pesan yang mendesak, seperti acara yang akan datang atau perubahan jadwal ibadah.
- **Launcher** -- Tombol mengambang yang membuka menu akses cepat, misalnya tautan untuk memberi, melakukan check-in, atau melihat buletin.

1. Temukan kartu **Announcement & widgets** di bawah Style Settings.
2. Aktifkan widget yang Anda inginkan dan atur teks, tautan, serta warnanya.
3. Klik **Save**.

## Pengalihan dan Analitik

Kartu **Redirects & analytics** (di bawah Style Settings) berisi dua pengaturan yang tidak berkaitan tetapi sering dibutuhkan:

- **Analytics** -- Tambahkan **GA4 Measurement ID** Anda (format `G-XXXXXXXXXX`) untuk melacak lalu lintas pengunjung di situs web Anda. ID yang sama juga melacak tampilan halaman di aplikasi B1 gereja Anda (portal anggota di `/mobile`, termasuk aplikasi yang terpasang), diberi tag `display_mode` berupa `installed` atau `browser` sehingga Anda dapat membedakan kunjungan dari aplikasi yang terpasang dan kunjungan dari peramban di Google Analytics.
- **Redirects** -- Petakan jalur URL lama ke jalur baru, sehingga tautan ke halaman yang Anda pindahkan atau ganti namanya tetap berfungsi dan tidak menampilkan 404. Masukkan jalur lama di **From** dan jalur baru di **To**, lalu klik **Save**. Pengalihan juga lebih diutamakan daripada halaman bawaan B1 (`/sermons`, `/stream`, `/donate`, `/bible`, dan `/votd`), sehingga Anda dapat mengirim alamat tersebut ke tempat lain (misalnya, ke halaman khotbah Anda sendiri atau saluran YouTube). Pengalihan ini tidak menggantikan halaman yang Anda buat sendiri di alamat yang sama. Hapus halaman tersebut terlebih dahulu jika Anda ingin pengalihan diterapkan.

## CSS dan JavaScript Kustom

1. Klik **CSS & Javascript** di panel Style Settings.
2. Tambahkan **Custom CSS** untuk mengesampingkan gaya bawaan guna penyesuaian lanjutan.
3. Tambahkan **Custom HTML** untuk kode pelacakan atau skrip lainnya.
4. Gunakan bagian **Common JavaScript Examples** untuk contoh kode seperti integrasi Google Analytics.

:::warning
CSS kustom sangat kuat tetapi dapat merusak tata letak situs Anda jika digunakan secara tidak tepat. Sebagian besar gereja dapat mencapai tampilan yang mereka inginkan dengan menggunakan kontrol warna, font, dan jarak bawaan. Gunakan CSS kustom hanya jika Anda nyaman dengan pengembangan web.
:::

:::info
Situs Anda menerapkan Content Security Policy yang memblokir skrip inline dari sumber lain. Kolom **Custom HTML** di sini, dan [elemen HTML](./page-editor.md#using-the-html-element) pada halaman individual, adalah pengecualian tepercaya -- kode yang Anda simpan di sana dijalankan apa adanya, jadi tempelkan skrip hanya dari sumber yang Anda percaya (tag analitik, widget obrolan, dan sematan serupa).
:::

## Tema Gaya

Jika Anda menginginkan titik awal yang cepat, **Suggested Palettes** di bagian Color Palette menawarkan tema siap pakai yang mengatur warna yang selaras hanya dengan satu klik. Anda selalu dapat menyempurnakan pengaturan individual setelah menerapkan tema.

## Langkah Berikutnya

- [Mengelola Halaman](./managing-pages.md) -- Membangun dan mengatur halaman situs web Anda
- [Berkas](./files.md) -- Mengunggah aset media untuk situs Anda
