---
title: "Menggunakan Editor Halaman"
description: "Atur editor halaman di B1 Admin dengan menambahkan bagian dan elemen, memberi gaya, melihat pratinjau di ponsel, dan menerbitkan draf. Juga mencakup pembatalan dan riwayat versi."
---

# Menggunakan Editor Halaman

<div class="article-intro">

Editor halaman B1 adalah pembuat visual dengan fitur seret-dan-lepas yang memungkinkan Anda mendesain halaman situs web gereja tanpa menulis kode. Anda dapat menambahkan bagian dan blok konten, menyesuaikan gaya, melihat pratinjau hasil kerja, dan membatalkan perubahan, semuanya dari dalam browser Anda.

</div>

## Video Pelatihan

<YouTube id="m2B_JxmfFm4" title="Mengedit Halaman dan Navigasi di B1" next="Menghubungkan Domain Kustom di B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Selesaikan [Pengaturan Awal](./initial-setup.md) agar situs web Anda terkonfigurasi
- Buat setidaknya satu halaman di [Mengelola Halaman](./managing-pages.md)
- Anda memerlukan izin **content.edit** untuk mengakses editor

</div>

## Membuka Editor

1. Di B1 Admin, buka [Menu Lompat](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), perluas **Website**, lalu klik **Pages**.
2. Temukan halaman yang ingin Anda edit di tabel Pages, lalu klik **Edit Content**.

Editor terbuka dalam mode layar penuh. Panel kiri menampilkan struktur halaman Anda dan elemen konten yang tersedia; area tengah menampilkan pratinjau langsung halaman Anda.

:::info
Editor selalu ditampilkan dalam mode terang, terlepas dari pengaturan tema B1 Admin Anda, dan menggunakan font judul dan isi yang Anda pilih di [Tampilan](./appearance.md). Ini memastikan pratinjau sesuai dengan tampilan halaman bagi pengunjung situs web.
:::

## Struktur Halaman: Bagian dan Elemen

Setiap halaman dibangun dari dua tingkat:

- **Bagian** -- Wadah tingkat atas yang membagi halaman Anda menjadi pita horizontal (misalnya, bagian hero, blok konten, atau strip footer). Setiap halaman harus memiliki setidaknya satu bagian sebelum Anda dapat menambahkan konten.
- **Elemen** -- Potongan konten individual yang ditempatkan di dalam bagian, seperti teks, gambar, tombol, kartu, formulir, dan kalender.

### Menambahkan Bagian

1. Klik **Add Section** (atau tombol **+** di bagian atas panel kiri).
2. Pilih cara memulai:
   - **Dari templat** — telusuri galeri templat bagian yang diurutkan berdasarkan kategori (Hero, About, Services, Giving, dll.) dan klik salah satunya untuk menyisipkannya sebagai bagian yang sudah bergaya dan terisi sebagian. Anda dapat menyesuaikan semuanya setelah ditambahkan.
   - **Bagian kosong** — pilih tata letak kolom (satu, dua kolom, tiga kolom, dll.) dan bangun dari awal.
3. Bagian baru muncul di pratinjau. Klik untuk memilihnya, lalu atur warna latar belakang, padding, dan opsi gaya lainnya.

### Mengganti Tata Letak Bagian

Sudah membuat bagian tetapi ingin struktur yang berbeda? Gunakan pengganti tata letak pada bagian tersebut untuk menukar susunan kolomnya dengan susunan lain dari galeri, sambil tetap mempertahankan konten dan elemen yang sudah ada.

### Menambahkan Elemen ke Bagian

1. Klik di dalam bagian pada pratinjau untuk memilihnya.
2. Klik **Add Content** dan pilih jenis elemen dari daftar:
   - **Text** -- Judul, paragraf, dan teks kaya
   - **Image** -- Unggah atau tautkan ke foto
   - **Button** -- Tautan ajakan bertindak yang dapat diklik
   - **Card** -- Gambar dengan judul dan deskripsi
   - **Form** -- Sematkan [formulir](../forms/creating-forms.md) langsung di halaman. Jika formulir memiliki [foto header](../forms/creating-forms.md#adding-a-header-photo), foto tersebut akan muncul di atas pertanyaan
   - **Calendar** -- Tampilkan kalender acara
   - **FAQ** -- Blok pertanyaan dan jawaban gaya akordeon
   - **Video** -- Sematkan video melalui URL
   - **Groups Browser** -- Direktori grup gereja yang dapat difilter, dengan pencarian, filter kategori, dan filter label secara opsional. **Layout**-nya dapat berupa **Grid** (bawaan) atau **Scrolling (automatic)** -- lihat [Tata letak menggulir](#scrolling-layouts)
   - **Group List** -- Ubin untuk grup publik Anda, opsional hanya grup dengan label tertentu. **Layout**-nya dapat berupa **Grid** (bawaan; hingga tiga ubin per baris) atau **Scrolling (automatic)** -- lihat [Tata letak menggulir](#scrolling-layouts)
   - **Icon Feature** -- Ikon dengan judul dan deskripsi singkat, untuk sorotan fitur atau pelayanan
   - **Gallery** -- Tata letak kisi atau masonry berisi banyak foto
   - **Testimonial** -- Satu atau beberapa kutipan dengan nama penulis, peran, dan foto
   - **Social Icons** -- Ikon bertautan untuk profil media sosial gereja Anda: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo, dan Podcast. Isi tautan untuk setiap yang ingin Anda tampilkan; untuk **WhatsApp**, gunakan tautan `https://wa.me/` dengan nomor Anda atau tautan undangan grup
   - **Countdown** -- Pengatur waktu yang menghitung mundur ke tanggal atau jadwal ibadah mingguan
   - **Stats** -- Deretan angka besar dengan label (anggota, tahun, kampus)
   - **Campaign Progress** -- Bilah kemajuan langsung untuk kampanye pemberian, yang menampilkan total dana yang terkumpul untuk target dana
   - **Staff Grid** -- Kartu foto untuk anggota sebuah grup; grup tersebut harus mengaktifkan opsi **daftar publik**
   - **Service Times** -- Jadwal ibadah kampus Anda, ditarik otomatis dari pengaturan kehadiran
   - **Sermons** -- Pustaka khotbah Anda, sebagai penjelajah penuh atau dengan tata letak kisi, daftar, atau unggulan terbaru
   - **Map** -- Peta yang disematkan dan berpusat pada alamat gereja Anda
   - **Table** -- Kisi sederhana berisi baris dan kolom untuk konten tabular
   - **Text with Photo** -- Teks dan gambar berdampingan
   - **Logo** -- Logo gereja Anda, diambil dari [Tampilan](./appearance.md)
   - **Live Stream** -- Pemutar siaran langsung Anda, disematkan langsung di halaman
   - **Podcast** -- Daftar episode yang diambil dari URL umpan RSS podcast eksternal yang Anda berikan, dengan pengaturan jumlah episode yang ditampilkan dan apakah tanggal serta deskripsi ditampilkan. Setiap episode di situs langsung memiliki pemutar audio dan tautan **Download** yang menyimpan file audio episode dengan judul episode. Ini untuk menampilkan umpan podcast apa pun di situs Anda; untuk mempublikasikan khotbah Anda sendiri sebagai podcast, lihat [Mengelola Khotbah](../sermons/managing-sermons.md#your-podcast-feed) sebagai gantinya
   - **Donation** -- Tombol pemberian atau formulir donasi yang disematkan
   - **HTML** -- HTML mentah Anda sendiri, untuk kasus penggunaan lanjutan seperti menyematkan widget pihak ketiga (lihat [Menggunakan elemen HTML](#using-the-html-element))
   - **iFrame** -- Sematkan konten eksternal melalui URL
3. Konfigurasikan elemen menggunakan panel pengaturan yang muncul.

### Menggunakan elemen HTML

Elemen **HTML** memiliki dua kotak:

- **HTML Content** -- Markup yang akan ditampilkan di halaman. Tag `<script>` apa pun yang Anda sertakan di sini akan dijalankan di situs langsung Anda.
- **JavaScript (exclude script tag)** -- Kode skrip yang dijalankan saat halaman dimuat. Anda juga dapat menempelkan cuplikan sematan dari vendor di sini beserta tag `<script>`-nya, dan cuplikan tersebut akan dijalankan di situs langsung.

Jika Anda hanya menempelkan alamat web (seperti tautan gambar) ke kotak JavaScript, kotak tersebut akan berubah merah dengan peringatan *"This is a web address, not JavaScript."* Alamat biasa di kotak itu tidak melakukan apa pun. Untuk menampilkan gambar, gunakan elemen **Image** atau letakkan `<img src="...">` di **HTML Content**.

### Menggunakan elemen Calendar {#using-the-calendar-element}

Elemen **Calendar** menampilkan acara dari salah satu kalender Anda:

1. Di bawah **Select**, pilih **Group Calendar** (acara satu grup -- daftar menampilkan grup yang Anda ikuti) atau **Curated Calendar** (kalender yang Anda buat di **Calendars**; lihat [Curated Calendar](../calendars/curated-calendar.md)).
2. Di bawah **Select Calendar**, pilih grup atau kalender.
3. Di bawah **Display**, pilih cara menampilkannya:
   - **Month calendar** -- Kisi bulanan yang dapat dijelajahi pengunjung. Setiap acara diberi warna sesuai grup yang memilikinya, sehingga acara sebuah grup memiliki warna yang sama di setiap kalender. B1 memilih warna secara otomatis; tidak ada yang perlu diatur.
   - **Upcoming events** -- Kisi ubin untuk 12 acara mendatang berikutnya, dengan acara berulang ditampilkan sekali pada tanggal berikutnya. Setiap ubin menampilkan foto acara (atau judulnya pada warna gelap tema Anda jika tidak ada foto), lencana tanggal, hari dan waktu, serta baris pertama deskripsinya. Tombol **Subscribe** di atas ubin memungkinkan pengunjung menyalin tautan ICS kalender atau mengunduhnya. Pengaturan **Layout** muncul untuk tampilan ini: **Grid** (bawaan) atau **Scrolling (automatic)**, yang menempatkan ubin dalam satu baris yang bergulir sendiri (lihat [Tata letak menggulir](#scrolling-layouts)). Untuk **Curated Calendar**, aktifkan pengaturan **Group badge** untuk menampilkan nama grup setiap acara di pojok kanan atas ubinnya, dengan warna kalender grup tersebut. Acara dari grup yang diarsipkan atau rahasia tidak mendapatkan lencana.
4. Untuk menampilkan hanya sebagian acara, ketik tag di **Only events tagged** -- misalnya, `youth`. Hanya acara yang **Tags**-nya mencakup kata tersebut yang akan muncul. Biarkan kosong untuk menampilkan semua acara. Tag diatur pada setiap acara; lihat [Menambah dan Mengedit Acara](../calendars/creating-calendars.md#adding-and-editing-events).

Pada kedua tampilan, mengklik acara akan membuka halamannya sendiri di situs web Anda. Halaman acara menampilkan foto, judul, tanggal dan waktu, serta deskripsi acara, ditambah kotak berisi **When** (termasuk pola pengulangan untuk acara berulang) dan **Where** (ruangan yang dipesan untuknya). Halaman ini juga memiliki tombol **Register for this Event** jika pendaftaran diaktifkan, dan tautan **Add to my calendar** yang mengunduh acara sebagai file kalender. Halaman ini disiapkan agar mesin pencari dapat menampilkan tanggal dan detail acara dalam hasil pencarian mereka. Halaman acara dari kalender kurasi yang ditampilkan di halaman Anda (untuk acara dalam enam bulan ke depan) juga dicantumkan di peta situs Anda, sehingga mesin pencari dapat menemukannya.

### Tata letak menggulir {#scrolling-layouts}

Tata letak **Scrolling (automatic)** pada **Groups Browser**, **Group List**, dan tampilan **Upcoming events** pada elemen Calendar menempatkan ubin dalam satu baris, bukan kisi. Di ponsel, setiap ubin memenuhi satu baris; di komputer, dua ubin muat berdampingan. Ketika ubin lebih banyak daripada yang muat, baris tersebut:

- Bergerak maju satu ubin sekitar setiap empat detik, dan kembali ke ubin pertama setelah ubin terakhir.
- Berhenti sementara saat pengunjung mengarahkan kursor, menyentuh, atau masuk dengan tombol Tab ke ubin tersebut, lalu melanjutkan beberapa detik kemudian.
- Menampilkan deretan titik di bawahnya, satu untuk setiap ubin, dengan titik ubin saat ini terisi. Pengunjung dapat mengklik titik untuk melompat ke ubin tersebut.

Pada perangkat yang diatur untuk mengurangi gerakan, baris tetap diam dan pengunjung menggeser atau menggulirnya sendiri. Jika semua ubin muat, baris tidak bergerak dan tidak ada titik yang muncul.

### Mengurutkan Ulang Konten

Seret bagian atau elemen menggunakan ikon pegangan (enam titik) di sisi kiri setiap item untuk mengurutkannya ulang. Anda dapat menyeret elemen di dalam bagian atau memindahkannya ke bagian lain.

## Memberi Gaya pada Halaman Anda

### Gaya Bagian

Klik bagian mana pun untuk membuka panel gayanya. Anda dapat mengatur:

- **Background** -- Warna solid, gradien, atau gambar. Saat menggunakan latar belakang gambar, pemilih **Focal Point** memungkinkan Anda mengklik untuk menentukan bagian gambar mana yang tetap berada di tengah saat bagian diskalakan, dan opsi warna **Overlay** memungkinkan Anda menambahkan lapisan warna semi-transparan di atas gambar agar teks lebih mudah dibaca.
- **Padding** -- Jarak atas dan bawah di dalam bagian
- **Width** -- Lebar penuh atau terpusat/terbatas
- **Dividers** -- Pemisah bentuk dekoratif (gelombang, miring, lengkung, segitiga, dan lainnya) di tepi atas atau bawah bagian, dengan opsi warna, tinggi, dan balik

### Gaya Elemen

Klik elemen mana pun untuk membuka panel gayanya. Opsi umum mencakup ukuran font, warna, perataan, margin, dan padding. Untuk gambar, Anda dapat mengatur teks alternatif dan target tautan.

### CSS Kustom

Untuk penataan gaya tingkat lanjut, setiap bagian dan elemen memiliki kolom **Custom CSS** tempat Anda dapat menulis aturan CSS sendiri. Aturan ini hanya berlaku untuk elemen tersebut, sehingga tidak akan secara tidak sengaja memengaruhi bagian lain dari halaman.

:::tip
Jika Anda perlu menerapkan gaya di seluruh situs Anda -- seperti font kustom atau warna global -- gunakan pengaturan [Tampilan](./appearance.md) alih-alih CSS kustom pada halaman individual.
:::

## Melihat Pratinjau Halaman Anda

Gunakan kontrol pratinjau di bilah alat untuk memeriksa tampilan halaman Anda pada berbagai ukuran layar:

- **Desktop** -- Tampilan browser lebar penuh
- **Mobile** -- Tampilan sempit seukuran ponsel

Di ponsel, kolom dalam satu baris akan bertumpuk satu di atas yang lain dengan lebar penuh, kecuali Anda mengatur **Mobile Width** untuknya di pengaturan baris. Daftar khotbah dan podcast juga menumpuk teks setiap episode di bawah thumbnail-nya di ponsel.

Untuk melihat halaman langsung persis seperti yang dilihat pengunjung, kembali ke daftar Pages dan klik jalur halaman tersebut. Halaman akan terbuka di tab browser baru.

## Memeriksa Aksesibilitas

Klik ikon **Accessibility** di bilah alat untuk menjalankan pemeriksaan cepat terhadap masalah umum -- gambar tanpa teks alternatif, kontras warna yang rendah, atau judul yang tidak berurutan. Setiap masalah menautkan langsung ke elemen yang perlu diperbaiki sehingga Anda dapat memperbaikinya di tempat.

## Membatalkan Perubahan

Editor secara otomatis mencatat riwayat pengeditan Anda. Gunakan tombol bilah alat atau pintasan keyboard untuk menavigasi:

- **Undo** (Ctrl+Z / Cmd+Z) -- Membatalkan tindakan terakhir Anda
- **Redo** (Ctrl+Shift+Z atau Ctrl+Y / Cmd+Shift+Z) -- Menerapkan kembali tindakan yang dibatalkan

Anda juga dapat memulihkan halaman ke cuplikan sebelumnya. Klik **View history** di bilah alat untuk melihat daftar cuplikan tersimpan beserta deskripsinya, lalu klik entri mana pun untuk memulihkan ke titik tersebut.

:::warning
Memulihkan cuplikan akan mengganti konten halaman Anda saat ini dengan versi cuplikan. Ini tidak dapat dibatalkan dengan tombol undo standar. Simpan cuplikan kondisi Anda saat ini sebelum memulihkan yang lama jika Anda ingin tetap dapat kembali.
:::

## Menyimpan dan Menerbitkan

Perubahan disimpan secara otomatis saat Anda bekerja. Indikator status di bilah alat menunjukkan apakah perubahan Anda sudah tersimpan.

### Status draf dan terbit

Halaman dapat memiliki status **published**, yang mengontrol kapan pengunjung melihat perubahan Anda. Bilah alat menampilkan chip status yang menunjukkan kondisi saat ini:

- **Live on save** -- Halaman tidak menggunakan alur kerja penerbitan. Setiap perubahan yang disimpan langsung tayang. Ini adalah bawaan untuk halaman baru.
- **Unpublished changes** -- Halaman pernah diterbitkan, tetapi Anda telah membuat perubahan sejak penerbitan terakhir. Pengunjung masih melihat versi yang diterbitkan sebelumnya.
- **Published** -- Halaman sudah tayang dan konten tersimpan Anda sama dengan yang dilihat pengunjung.

Untuk menerbitkan perubahan Anda, klik tombol **Publish** di bilah alat. Halaman langsung tayang.

Untuk kembali ke versi terbitan terakhir tanpa memengaruhi apa yang dilihat pengunjung, buka menu tambahan (⋮) dan klik **Discard unpublished changes**.

Untuk berhenti menggunakan alur kerja penerbitan, buka menu tambahan dan klik **Turn off publishing**. Setelah itu, setiap pengeditan langsung tayang kembali.

:::tip
Gunakan alur kerja draf/penerbitan saat Anda ingin menyiapkan halaman -- misalnya, untuk acara yang akan datang -- dan hanya menayangkannya pada waktu yang tepat. Bangun dan lihat pratinjau halaman, lalu klik Publish saat Anda siap.
:::

## Artikel Terkait

- [Mengelola Halaman](./managing-pages.md) -- Membuat halaman, mengatur URL, dan mengelola navigasi situs
- [Tampilan](./appearance.md) -- Mengatur warna, font, dan branding untuk seluruh situs
- [Berkas](./files.md) -- Mengunggah gambar dan dokumen untuk digunakan di editor
- [Membuat Formulir](../forms/creating-forms.md) -- Membuat formulir yang dapat disematkan di halaman
