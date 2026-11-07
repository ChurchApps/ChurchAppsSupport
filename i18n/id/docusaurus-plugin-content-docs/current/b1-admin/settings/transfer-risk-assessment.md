---
title: "Penilaian Risiko Transfer"
description: "Catatan kepatuhan ChurchApps untuk transfer data gereja dari UK/EEA ke AS di B1 Admin, mencakup pengamanan, sub-prosesor, dan kontrol akses."
---

# Penilaian Risiko Transfer

<div class="article-intro">

Dokumen ini mencatat penilaian ChurchApps terhadap risiko yang terkait dengan transfer data pribadi internasional dari UK/EEA ke Amerika Serikat, sebagaimana diwajibkan oleh UK GDPR dan EU GDPR. Ini adalah catatan kepatuhan internal yang dikelola oleh ChurchApps sebagai prosesor data.

</div>

**Terakhir ditinjau:** April 2026

## 1. Detail Transfer

| Item | Detail |
|---|---|
| **Eksportir Data** | Gereja yang menggunakan ChurchApps (Pengendali Data) yang berlokasi di UK/EEA |
| **Importir Data** | ChurchApps (Prosesor Data), beroperasi dari Amerika Serikat |
| **Kategori Subjek Data** | Anggota gereja, peserta, pengunjung, donatur, relawan, anak-anak (dikelola oleh orang tua/administrator) |
| **Kategori Data Pribadi** | Nama, alamat email, nomor telepon, alamat pos, tanggal lahir, jenis kelamin, status pernikahan, foto profil, catatan donasi, catatan kehadiran, keanggotaan grup, penugasan relawan, riwayat pesan |
| **Data Sensitif** | Tidak ada yang dikumpulkan secara sengaja. Tidak ada data kesehatan, data biometrik, atau catatan kriminal yang disimpan. Detail rekening keuangan (kartu kredit, rekening bank) tidak pernah disimpan oleh ChurchApps — semuanya ditangani langsung oleh Stripe. |
| **Tujuan Transfer** | Menyediakan layanan perangkat lunak manajemen gereja (manajemen anggota, donasi, pelacakan kehadiran, komunikasi, penjadwalan relawan, pendaftaran acara) |
| **Negara Tujuan** | Amerika Serikat |
| **Mekanisme Transfer** | Klausul Kontrak Standar (SCC) UE dan Addendum Transfer Data Internasional (IDTA) Inggris, yang dimasukkan melalui Addendum Pemrosesan Data AWS |

## 2. Sub-Prosesor

| Sub-Prosesor | Peran | Lokasi | Mekanisme Transfer |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Hosting infrastruktur, penyimpanan data, pengiriman konten (wilayah us-east-2) | Amerika Serikat | DPA AWS dengan SCC (otomatis disertakan dalam Ketentuan Layanan AWS) |
| **Stripe** | Pemrosesan pembayaran untuk donasi | Amerika Serikat | DPA Stripe dengan SCC |

Data kartu kredit dan rekening bank dikirim langsung dari peramban pengguna ke Stripe dan tidak pernah disimpan di atau dikirim melalui server ChurchApps.

## 3. Penilaian Risiko

### 3.1 Enkripsi

- **Saat transmisi:** Semua data dienkripsi menggunakan TLS/HTTPS untuk semua komunikasi antara pengguna dan server ChurchApps.
- **Saat disimpan:** Data yang disimpan di AWS dienkripsi saat disimpan menggunakan enkripsi yang dikelola AWS.

### 3.2 Kontrol Akses

- Akses ke server produksi dibatasi untuk dua individu yang merupakan anggota dewan direksi ChurchApps.
- Pengembang, relawan, dan anggota dewan lainnya tidak memiliki akses ke server atau basis data produksi.
- Server basis data berada di belakang firewall dan tidak dapat diakses langsung dari internet.
- Data gereja dipisahkan secara logis — setiap gereja hanya dapat mengakses datanya sendiri melalui kontrol akses di tingkat aplikasi.

### 3.3 Segregasi Data

Data didistribusikan di enam basis data independen (Keanggotaan, Pemberian, Kehadiran, Pesan, Doing, Konten). Kompromi satu basis data tidak mengekspos data dari basis data lain. Misalnya, basis data Pemberian berisi jumlah dan tanggal donasi, tetapi tidak berisi nama atau informasi kontak donatur (yang disimpan di Keanggotaan).

### 3.4 Minimalisasi Data

- Tidak ada informasi kartu kredit atau rekening bank yang disimpan (ditangani oleh Stripe).
- Kata sandi disimpan menggunakan hashing satu arah dan tidak dapat diambil kembali.
- Gereja mengendalikan data apa saja yang mereka kumpulkan dari anggotanya.

### 3.5 Hak Subjek Data

ChurchApps menyediakan alat teknis yang memungkinkan gereja memenuhi permintaan subjek data:

- **Akses & Portabilitas:** Ekspor data lengkap dalam format JSON yang dapat dibaca mesin.
- **Penghapusan:** Anonimisasi di seluruh enam basis data, menggantikan data pribadi dengan nilai generik sambil mempertahankan catatan agregat yang diperlukan untuk pelaporan keuangan.
- **Pembatasan:** Status keanggotaan nonaktif mengecualikan individu dari pencarian, direktori, laporan, dan pesan, sambil tetap menyimpan catatan mereka.
- **Pembetulan:** Anggota dan administrator dapat mengedit informasi pribadi melalui aplikasi.

### 3.6 Pemberitahuan Pelanggaran

ChurchApps berkomitmen untuk memberi tahu gereja yang terdampak dalam waktu 72 jam sejak mengetahui adanya pelanggaran data pribadi, sebagaimana didokumentasikan dalam [Ketentuan Layanan](https://churchapps.org/terms) (Bagian 11.6).

### 3.7 Akses Pemerintah AS

Risiko utama yang terkait dengan data yang di-hosting di AS adalah potensi akses oleh otoritas pemerintah AS berdasarkan FISA Section 702 atau Executive Order 12333. Risiko ini dinilai **rendah** dengan alasan berikut:

- ChurchApps memproses data keanggotaan dan kehadiran gereja, bukan data yang memiliki nilai intelijen.
- Subjek data adalah anggota dan peserta gereja — bukan kategori yang biasanya menjadi target program pengawasan.
- Tidak ada data pribadi sensitif (kesehatan, rekening keuangan, pandangan politik) yang disimpan.
- DPA AWS mencakup komitmen terkait permintaan akses pemerintah dan pelaporan transparansi.
- Kerangka Kerja Privasi Data UE-AS (ditetapkan 2023) memberikan perlindungan tambahan untuk transfer data ke organisasi AS yang tersertifikasi.

## 4. Kesimpulan Risiko Keseluruhan

Risiko terhadap subjek data dari transfer internasional ini dinilai **rendah**. Kombinasi dari:

- Klausul Kontrak Standar sebagai mekanisme transfer hukum
- Enkripsi saat transmisi dan saat disimpan
- Kontrol akses yang ketat dengan hanya dua individu yang berwenang
- Segregasi data di basis data independen
- Tidak ada penyimpanan detail rekening keuangan
- Sensitivitas rendah dan nilai intelijen rendah dari data yang diproses
- Alat teknis untuk menjalankan semua hak subjek data

memberikan langkah-langkah tambahan yang memadai untuk memastikan bahwa data yang ditransfer menerima tingkat perlindungan yang pada dasarnya setara dengan yang dijamin di dalam UK/EEA.

## 5. Jadwal Peninjauan

Penilaian ini akan ditinjau setiap tahun atau ketika terjadi perubahan material pada pemrosesan data, sub-prosesor, atau kerangka hukum yang mengatur transfer data internasional.
