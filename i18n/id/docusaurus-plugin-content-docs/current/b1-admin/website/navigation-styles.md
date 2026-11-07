---
title: "Gaya Navigasi"
---

# Gaya Navigasi

<div class="article-intro">

Sesuaikan warna bilah navigasi situs web gereja Anda agar sesuai dengan identitas merek Anda. Anda dapat mengatur warna untuk latar belakang solid maupun lapisan transparan, sehingga Anda memiliki kendali penuh atas tampilan navigasi di berbagai halaman.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan izin untuk mengelola situs web gereja Anda. Lihat [Peran & Izin](../people/roles-permissions.md) untuk detailnya.
- Siapkan warna merek Anda, termasuk kode warna heksadesimal (misalnya, #03A9F4).
- Pahami perbedaan antara gaya navigasi solid dan transparan di situs web Anda.

</div>

## Memahami Mode Navigasi

Navigasi situs web Anda dapat tampil dalam dua gaya berbeda, tergantung pada halaman:

- **Navigasi solid** -- Bilah navigasi dengan warna latar belakang, biasanya digunakan pada halaman konten
- **Navigasi transparan** -- Navigasi yang berada di atas konten halaman, biasanya digunakan pada halaman dengan gambar hero atau latar belakang layar penuh

Anda dapat menyesuaikan warna untuk kedua mode secara terpisah.

## Mengakses Gaya Navigasi

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas) dan perluas **Website**
2. Klik **Appearance**
3. Dalam daftar **Style Settings**, klik **Navigation**

Editor **Navigation Styling** memiliki dua kartu: **Header (solid)** dan **Header over hero (transparent)**.

## Mengonfigurasi Navigasi Solid

Navigasi solid tampil dengan warna latar belakang di belakang bilah navigasi. Pengaturan ini berada di kartu **Header (solid)**. Anda dapat menyesuaikan:

### Warna Latar Belakang

1. Aktifkan sakelar **Override** untuk **Background color**
2. Klik pemilih warna
3. Pilih warna latar belakang yang Anda inginkan
4. Warna bawaannya adalah putih (#FFFFFF)

### Warna Tautan

1. Aktifkan sakelar **Override** untuk **Link color**
2. Pilih warna untuk teks tautan navigasi
3. Ini memengaruhi tautan dalam kondisi standarnya
4. Warna bawaannya adalah abu-abu gelap (#555555)

### Warna Tautan Saat Disorot

1. Aktifkan sakelar **Override** untuk **Link hover color**
2. Pilih warna yang akan digunakan tautan saat pengguna mengarahkan kursor ke atasnya
3. Ini memberikan umpan balik visual untuk tautan yang dapat diklik
4. Warna bawaannya adalah biru muda (#03A9F4)

### Warna Aktif

1. Aktifkan sakelar **Override** untuk **Active link color**
2. Pilih warna untuk tautan halaman yang sedang aktif
3. Ini membantu pengguna mengetahui halaman mana yang sedang mereka buka
4. Warna bawaannya adalah biru muda (#03A9F4)

## Mengonfigurasi Navigasi Transparan

Navigasi transparan berada di atas konten halaman Anda tanpa latar belakang. Pengaturan ini berada di kartu **Header over hero (transparent)**. Anda dapat menyesuaikan:

### Warna Tautan

1. Aktifkan sakelar **Override** untuk **Link color**
2. Pilih warna yang kontras dengan latar belakang halaman Anda
3. Warna putih atau warna terang biasanya paling cocok di atas latar belakang gelap
4. Warna bawaannya adalah abu-abu gelap (#555555)

### Warna Tautan Saat Disorot

1. Aktifkan sakelar **Override** untuk **Link hover color**
2. Pilih warna untuk status sorotan
3. Pastikan warna tersebut terlihat jelas di atas latar belakang halaman Anda
4. Warna bawaannya adalah biru muda (#03A9F4)

### Warna Aktif

1. Aktifkan sakelar **Override** untuk **Active link color**
2. Pilih warna untuk indikator halaman aktif
3. Warna ini sebaiknya menonjol namun tetap sesuai dengan desain Anda
4. Warna bawaannya adalah biru muda (#03A9F4)

:::info
Navigasi transparan tidak memiliki pengaturan warna latar belakang karena navigasi ini langsung berada di atas konten halaman.
:::

## Menyimpan Perubahan Anda

1. Setelah mengonfigurasi warna, klik **Save Navigation**
2. Perubahan Anda langsung diterapkan di situs web yang sudah aktif
3. Kunjungi situs web Anda untuk melihat navigasi dalam kedua mode

## Mengembalikan ke Pengaturan Bawaan

Jika Anda ingin kembali ke warna bawaan:

1. Nonaktifkan sakelar **Override** untuk warna kustom mana pun
2. Klik **Save Navigation**
3. Navigasi akan kembali ke skema warna bawaan

Atau klik **Cancel** untuk membatalkan semua perubahan tanpa menyimpannya.

## Praktik Terbaik

### Kontras Warna

- **Keterbacaan** -- Pastikan warna tautan memiliki kontras yang cukup dengan latar belakang
- **Kepatuhan WCAG** -- Usahakan rasio kontras minimal 4,5:1 untuk aksesibilitas
- **Uji kedua mode** -- Pratinjau situs Anda dengan navigasi solid maupun transparan

### Konsistensi Merek

- **Gunakan warna merek Anda** -- Samakan dengan logo dan tema situs web Anda
- **Batasi palet Anda** -- Gunakan 2-3 warna saja agar tampilannya kohesif
- **Perhatikan gambar Anda** -- Jika menggunakan navigasi transparan, uji pada latar belakang halaman yang umum digunakan

### Status Sorotan dan Aktif

- **Umpan balik yang jelas** -- Buat status sorotan tampak jelas berbeda dari tautan biasa
- **Bedakan halaman aktif** -- Gunakan warna yang berbeda agar pengguna tahu di mana mereka berada
- **Transisi yang halus** -- Sistem secara otomatis memberikan animasi pada perubahan warna

## Pemecahan Masalah

### Warna Tidak Tampak Benar

- **Hapus cache Anda** -- Cache peramban dapat menampilkan warna lama
- **Periksa kode heksadesimal** -- Pastikan Anda memasukkan kode warna heksadesimal yang valid
- **Uji pada latar belakang yang berbeda** -- Warna dapat terlihat berbeda tergantung pada halaman

### Navigasi Tidak Terlihat

- **Mode transparan** -- Jika menggunakan navigasi transparan di atas gambar yang terang, teks gelap mungkin sulit terlihat
- **Solusi** -- Sesuaikan warna tautan Anda atau gunakan latar belakang halaman yang lebih gelap
- **Alternatif** -- Tambahkan bayangan tipis atau lapisan latar belakang di area navigasi

## Detail Teknis

Gaya navigasi disimpan dalam format JSON dan diterapkan menggunakan variabel CSS:

- Perubahan langsung berlaku tanpa perlu membangun ulang situs
- Warna diterapkan ke semua elemen navigasi
- Pengaturan kustom bersifat opsional; warna yang tidak diatur menggunakan tema bawaan

## Artikel Terkait

- [Appearance](./appearance.md) -- Sesuaikan tampilan dan nuansa keseluruhan situs web Anda
- [Managing Pages](./managing-pages.md) -- Buat dan atur halaman situs web Anda
- [Page Editor](./page-editor.md) -- Rancang tata letak dan konten halaman
