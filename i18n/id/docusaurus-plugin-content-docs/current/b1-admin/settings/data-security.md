---
title: "Keamanan Data"
---

# Keamanan Data

<div class="article-intro">

Tidak ada sistem yang benar-benar aman sepenuhnya, namun ChurchApps menganggap keamanan data dengan serius. Halaman ini menjelaskan langkah-langkah yang diambil untuk melindungi semua data yang dimasukkan ke dalam B1.church Admin dan produk ChurchApps lainnya.

</div>

<div class="prereqs">
<h4>Sebelum Anda Memulai</h4>

- Tinjau halaman ini untuk memahami cara data gereja Anda dilindungi
- Atur [Peran & Izin](./roles-permissions.md) untuk mengontrol siapa yang dapat mengakses informasi sensitif
- Pelajari [kebijakan privasi](https://churchapps.org/privacy)

</div>

## Membatasi Data Sensitif yang Disimpan

Pendekatan pertama kami adalah tidak menyimpan data sensitif lebih dari yang diperlukan. Ini berarti kami tidak pernah menyimpan detail kartu kredit atau rekening bank yang digunakan untuk memberikan donasi. Ketika pengguna memberikan donasi menggunakan B1.church Admin atau B1, data kartu kredit tidak pernah dikirim ke server kami mana pun, hanya ke gateway pembayaran Anda (Stripe). Artinya, jika terjadi pelanggaran data, tidak ada informasi kartu kredit atau bank yang akan bocor.

Kami juga tidak pernah menyimpan kata sandi dalam sistem kami. Semua kata sandi diproses melalui algoritma hashing satu arah, di mana sebagian data dihancurkan, sehingga tidak ada seorang pun yang dapat mengambil kata sandi dari basis data, bahkan kami sendiri. Untuk memverifikasi kata sandi, nilai yang dimasukkan harus melalui hash satu arah yang sama dan menghasilkan hasil yang sama.

Setelah kedua sumber ini dihapus, satu-satunya data sensitif yang tersisa adalah daftar nama dan informasi kontak.

:::tip
Karena ChurchApps tidak pernah menyimpan informasi kartu kredit atau rekening bank, bahkan dalam skenario pelanggaran data terburuk sekalipun, detail rekening keuangan tidak akan terekspos. Hanya nama dan informasi kontak yang berisiko.
:::

## Menggunakan Praktik Terbaik Standar

Kami menerapkan praktik terbaik standar industri untuk keamanan, termasuk mengenkripsi semua data yang dikirim ke dan dari server kami menggunakan HTTPS. Semua server di-hosting di pusat data fisik yang aman di Amazon Web Services. Semua server basis data berada di balik firewall dan tidak dapat diakses dari Internet.

## Pemisahan Data

Data dipisahkan ke dalam basis data yang berbeda berdasarkan lingkupnya. Setiap API kami (Membership, Giving, Attendance, Messaging, Doing, dan Lessons) adalah silo data yang independen dengan basis datanya sendiri. Jika salah satunya disusupi, kegunaan data tersebut terbatas tanpa ikut disusupinya yang lain. Misalnya, jika API/basis data Giving disusupi, pihak yang tidak bertanggung jawab berpotensi mendapatkan akses ke daftar donasi dan tanggalnya (tetapi tidak pernah data kartu/rekening). Namun, mereka tidak akan memiliki akses ke pengguna mana yang memberikan donasi atau untuk gereja mana, karena data tersebut disimpan di basis data Membership yang terpisah.

:::info
Pemisahan data berarti bahwa menyusupi satu sistem tidak memberikan akses ke semua data gereja. Setiap API beroperasi secara independen dengan basis datanya sendiri, sehingga membatasi dampak dari potensi pelanggaran.
:::

## Akses Terbatas

Akses ke server produksi sangat dibatasi hanya untuk administrator server yang memerlukannya. Saat ini, ini adalah dua orang yang juga merupakan anggota dewan. Pengembang, relawan, dan anggota dewan lainnya tidak diizinkan mengakses server produksi.

## Kebijakan Privasi

Data Anda adalah milik Anda dan tidak akan pernah dijual kepada pihak ketiga. Anda dapat membaca kebijakan privasi lengkap kami [di sini](https://churchapps.org/privacy).

## Kepatuhan GDPR

ChurchApps mendukung kepatuhan GDPR untuk gereja-gereja yang memiliki anggota di Inggris atau Uni Eropa. Berikut cara kami memenuhi persyaratan utama:

### Hak Subjek Data

ChurchApps menyediakan alat untuk membantu gereja merespons permintaan subjek data:

- **Hak Akses (Pasal 15)** — Anggota dapat meminta salinan data pribadi mereka dengan menghubungi gereja mereka. Administrator dapat mengekspor data seseorang dari bagian **Data Management** pada halaman detail orang tersebut di B1.church Admin.
- **Hak Penghapusan (Pasal 17)** — Anggota dapat meminta penghapusan akun sendiri dari halaman Profil mereka (lihat [Meninjau Permintaan Penghapusan Akun](../profile/account-deletion.md)), atau dengan menghubungi gereja mereka secara langsung. Administrator juga dapat menganonimkan data seseorang di semua modul dari bagian **Data Management** pada halaman detail orang tersebut. Anonimisasi mengganti informasi pribadi dengan nilai generik sambil mempertahankan catatan agregat (total donasi, jumlah kehadiran) yang diperlukan untuk pelaporan keuangan gereja.
- **Hak Pembatasan (Pasal 18)** — Anggota dapat meminta pembatasan pemrosesan dengan menghubungi gereja mereka, termasuk memilih keluar dari komunikasi.
- **Hak Portabilitas Data (Pasal 20)** — Administrator dapat mengekspor data pribadi dalam format JSON yang terstruktur dan dapat dibaca mesin atas nama anggota yang memintanya.

### Menggunakan Alat Manajemen Data

Untuk mengakses alat data GDPR untuk seorang individu:

1. Buka **People** di B1 Admin dan buka catatan orang tersebut.
2. Klik **Edit** untuk masuk ke mode edit.
3. Gulir ke bawah ke bagian **Data Management** (secara default tertutup) dan klik untuk memperluasnya.
4. Gunakan **Export Data** untuk mengunduh file JSON dari semua data yang disimpan untuk orang tersebut.
5. Gunakan **Anonymize** untuk mengganti informasi pribadi dengan nilai generik. Anda akan diminta mengetik `ANONYMIZE` untuk mengonfirmasi — tindakan ini tidak dapat dibatalkan.

:::warning
Anonimisasi bersifat permanen. Total donasi dan jumlah kehadiran dipertahankan untuk keperluan pelaporan keuangan, tetapi semua pengidentifikasi pribadi (nama, email, alamat, dll.) dihapus dan tidak dapat dipulihkan.
:::

### Pemrosesan Data

ChurchApps bertindak sebagai **prosesor data** atas nama gereja Anda (**pengendali data**). [Perjanjian Pemrosesan Data](https://churchapps.org/terms) kami menguraikan tanggung jawab masing-masing pihak, termasuk penggunaan sub-prosesor, prosedur pemberitahuan pelanggaran, dan penanganan data saat pengakhiran layanan.

### Transfer Data Internasional

Data ChurchApps di-hosting di Amazon Web Services (AWS) di Amerika Serikat. Transfer data internasional dari Inggris/UE dicakup oleh Klausul Kontrak Standar (SCC) AWS berdasarkan [AWS Data Processing Addendum](https://aws.amazon.com/compliance/data-processing-addendum/). AWS DPA secara otomatis dimasukkan ke dalam Ketentuan Layanan AWS untuk semua pelanggan. Hosting berbasis UE tidak diwajibkan ketika mekanisme transfer yang sesuai seperti SCC sudah diterapkan.

Untuk detail tentang bagaimana risiko transfer dievaluasi, lihat [Penilaian Risiko Transfer](./transfer-risk-assessment.md).

### Sub-Prosesor

- **Amazon Web Services (AWS)** — Hosting infrastruktur, penyimpanan data, dan pengiriman konten
- **Stripe** — Pemrosesan pembayaran untuk donasi (tidak ada data kartu yang disimpan oleh ChurchApps)

:::info
Untuk detail lengkap tentang cara kami menangani data pribadi, lihat [Kebijakan Privasi](https://churchapps.org/privacy) dan [Ketentuan Layanan](https://churchapps.org/terms) kami. Jika Anda memiliki pertanyaan tentang kepatuhan GDPR, hubungi kami di support@churchapps.org.
:::
