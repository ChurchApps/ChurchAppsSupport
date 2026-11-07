---
title: "Desainer Label Check-In"
---

# Desainer Label Check-In

<div class="article-intro">

Desainer Label memungkinkan Anda membuat dan menyesuaikan templat tanda nama dan slip penjemputan yang dicetak saat keluarga melakukan check-in untuk anak-anak mereka. Anda dapat mengontrol secara tepat informasi apa yang muncul pada setiap label, di mana posisinya, dan bagaimana tampilannya.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Siapkan [Kehadiran](setup) dan konfigurasikan setidaknya satu waktu layanan dengan check-in diaktifkan
- Siapkan [Check-In](check-in) agar label dapat dicetak
- Anda memerlukan akses administratif ke bagian Kehadiran

</div>

## Membuka Desainer Label

Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), perluas **Mobile**, lalu klik **B1 CheckIn**. Kemudian klik tombol **Design Labels** pada kartu Check-in Labels. Anda akan melihat daftar templat label yang telah disimpan, yang dipisahkan berdasarkan jenis: **Nametag** dan **Pickup Slip**.

## Jenis Label

- **Nametag** — dicetak dan dipasang pada anak. Biasanya mencakup nama anak, kelas/sesi mereka, dan kode keamanan.
- **Pickup Slip** — diberikan kepada orang tua atau wali. Biasanya mencakup kode keamanan dan daftar anak-anak yang mereka check-in.

B1 memberi Anda templat tanda nama dan slip penjemputan bawaan yang berukuran untuk label termal standar 3,5 × 1,1 inci.

## Membuat Templat Label

1. Klik **Add** dan pilih titik awal dari menu: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"**, atau **Blank**.
2. Templat baru akan terbuka di editor label.

### Editor Label

Editor menampilkan pratinjau label yang diskalakan sesuai ukuran yang dikonfigurasi. Di panel kiri, Anda dapat mengonfigurasi:

- **Name** — nama templat (hanya untuk referensi Anda)
- **Label Type** — Nametag atau Pickup Slip
- **Width / Height** — ukuran label dalam inci

### Menambahkan Blok

Label dibangun dari blok — potongan konten individual yang diposisikan pada kanvas label. Klik **Add Block** untuk menyisipkan blok baru dan pilih jenisnya:

- **Field** — mengambil nilai data saat pencetakan:
  - `person.displayName` — nama lengkap orang tersebut
  - `sessions` — layanan/kelas tempat mereka melakukan check-in
  - `securityCode` — kode keamanan penjemputan yang dibuat secara acak
  - `children` — daftar anak-anak (untuk slip penjemputan)
  - `person.nametagNotes` — catatan khusus pada data orang tersebut
  - `person.isBirthdayWeek` — bernilai true jika tanggal lahir orang tersebut (bulan dan hari) berada dalam rentang 3 hari sebelum atau sesudah tanggal check-in
  - `campus` — nama kampus
- **Text** — teks statis yang Anda ketik (untuk judul, label, atau instruksi)
- **Barcode** — barcode yang berisi kode keamanan

### Memposisikan Blok

Setiap blok memiliki kolom **X**, **Y**, **Width**, dan **Height** yang dinyatakan dalam persentase kanvas label (0–100). Sesuaikan nilai-nilai ini untuk memposisikan konten secara tepat. Anda juga dapat mengatur:

- **Font Size** — ukuran teks dalam poin
- **Bold** — mengaktifkan atau menonaktifkan teks tebal
- **Align** — perataan teks kiri, tengah, atau kanan
- **Condition** — opsional untuk menyembunyikan blok jika sebuah field kosong (misalnya, hanya menampilkan nametagNotes jika memiliki nilai). Ini juga dapat digunakan dengan `person.isBirthdayWeek` untuk menampilkan grafis atau teks ulang tahun hanya pada nametag untuk anak-anak yang ulang tahunnya berada dalam beberapa hari dari tanggal check-in.

### Menyimpan

Klik **Save** untuk menyimpan templat. Templat yang diperbarui akan digunakan saat label berikutnya dicetak di B1 Checkin.

## Mengurutkan Ulang Templat

Jika Anda memiliki beberapa templat nametag atau slip penjemputan, B1 Checkin akan menggunakan templat pertama dalam daftar secara default. Seret templat untuk mengurutkannya ulang.

## Menghapus Templat

Klik ikon hapus pada baris templat mana pun dan konfirmasi. Menghapus templat terakhir dari suatu jenis akan memulihkan templat bawaan.

:::tip
Lakukan percetakan uji setelah mengedit templat untuk memastikan tata letaknya sudah benar sebelum layanan berikutnya.
:::

## Artikel Terkait

- [Pengaturan Check-In](setup) — konfigurasikan layanan dan grup untuk check-in
- [Menyelesaikan Check-In](check-in) — alur check-in untuk keluarga
- [Memulai B1 Checkin](../../b1-checkin/getting-started/) — aplikasi kiosk Checkin
