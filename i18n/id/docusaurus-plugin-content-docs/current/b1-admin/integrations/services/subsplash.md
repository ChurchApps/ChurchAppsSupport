---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Jika Anda menggunakan Subsplash untuk aplikasi gereja, persembahan, atau formulir, tetapi ingin B1 menjadi sistem utama untuk data jemaat dan donasi, aplikasi Zapier dari Subsplash dapat mengalirkan donasi, profil baru, dan tanggapan formulir ke B1 secara real-time. Perlu diperhatikan bahwa aplikasi Zapier dari Subsplash saat ini hanya mendukung **pemicu (triggers) saja**, sehingga alurnya satu arah (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Akun Subsplash dengan paket yang mencakup akses **API + Zapier** (tanyakan kepada Client Success Manager Subsplash Anda, karena fitur ini bergantung pada tingkat paket)
- Akun [Zapier](https://zapier.com)
- Pengguna B1Admin dengan izin **Edit Settings**

</div>

## Yang Dapat Anda Hubungkan

Semua pemicu di bawah ini berasal dari Subsplash. Tindakannya berasal dari B1.

| Pemicu Subsplash | Tindakan B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person jika belum ada) |
| New Pledge | Add Donation (dengan `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (tidak ada tindakan B1 langsung — catat ke Google Sheet untuk ditinjau secara manual) |
| New Form Response | Create Person + (opsional) Add Group Member berdasarkan formulir |

Saat ini, Subsplash → B1 adalah satu-satunya arah yang didukung oleh aplikasi Subsplash.

## Pengaturan

### 1. Buat kunci API B1

Di B1Admin: **Settings → Developer → API Keys → New API Key**. Cakupan (scopes):

- `people:read`: untuk mencari donatur berdasarkan email
- `people:write`: untuk membuat data jemaat baru jika belum ada
- `donations:write`: untuk mencatat pemberian
- (Tidak perlu `settings:write`, karena pemicunya dikelola oleh Subsplash, bukan B1.)

### 2. Hubungkan Subsplash ke Zapier

Ikuti [panduan integrasi Zapier dari Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash akan menerbitkan token API dari dalam Dashboard Subsplash, yang digunakan Zapier untuk mengautentikasi sisi pemicu.

### 3. Buat Zap "catat donasi"

1. **Pemicu**: Subsplash: New Donation
2. **Tindakan**: B1.church: Find Person (berdasarkan email)
3. **Filter / Path**: cabangkan alur berdasarkan "person found":
   - **Ditemukan:** B1.church: Add Donation. Petakan jumlah, tanggal, dana, metode = "Online", dan notes = ID transaksi Subsplash.
   - **Tidak ditemukan:** B1.church: Create Person → B1.church: Add Donation (menggunakan ID jemaat yang baru dibuat).

Aktifkan Zap. Donasi Subsplash berikutnya akan masuk ke **B1Admin → Donations** dalam hitungan detik.

## Contoh Resep Umum

### Kirim ucapan terima kasih saat pemberian pertama masuk

- **Pemicu**: Subsplash: New Donation
- **Tindakan**: Filter oleh Zapier: lanjutkan hanya jika ini adalah pemberian pertama dari donatur (gunakan *Lookup Table* pada Donor Email terhadap Google Sheet berisi daftar pemberi sebelumnya, atau langkah *Paths* di Zapier berdasarkan tanggal pembuatan donatur)
- **Tindakan**: Mailchimp / SMTP / SendGrid: kirim pesan ucapan terima kasih untuk pemberian pertama
- **Tindakan**: B1.church: Add Donation (seperti biasa)

### Pisahkan janji pemberian dari alur persembahan rutin

- **Pemicu**: Subsplash: New Pledge
- **Tindakan**: B1.church: Add Donation dengan `notes = "Pledge — Subsplash"` dan dana bernama `Pledges` (terpisah dari dana operasional Anda) agar Anda dapat membuat laporan janji pemberian secara terpisah di **B1Admin → Donations → Summary**.

### Sinkronkan pengguna aplikasi baru sebagai jemaat B1

- **Pemicu**: Subsplash: New Person Created
- **Tindakan**: B1.church: Create Person, isi nama, email, dan telepon. Beri label di B1 dengan menambahkan jemaat baru ke grup seperti "Subsplash App Users".

## Batasan & Catatan

- **Aplikasi Zapier Subsplash hanya mendukung pemicu.** Jika Anda ingin perubahan di sisi B1 juga tersinkron ke Subsplash (misalnya, jemaat B1 baru juga muncul di Subsplash), Anda perlu membangun jembatan dari pemicu aplikasi Zapier B1 yang memanggil REST API Subsplash melalui tindakan *Webhooks by Zapier — POST* khusus. Ini adalah integrasi kustom, bukan resep siap pakai.
- **Akses API bergantung pada paket.** Jika koneksi Zapier gagal dengan `403 Forbidden`, paket Subsplash Anda kemungkinan tidak mencakup akses API. Hubungi Client Success Manager Anda.
- **Pemetaan dana dilakukan secara manual.** Subsplash mengirimkan nama kampanye atau kategori, sedangkan B1 membutuhkan ID dana numerik. Anda dapat menuliskan dana secara tetap di dalam Zap, atau mengelola *Lookup Table* Zapier yang memetakan kampanye Subsplash ke dana B1.

## Pemecahan Masalah

- **Tidak ada pemicu yang aktif setelah donasi**: periksa di dasbor Zapier Subsplash bahwa koneksi masih berstatus *Connected*. Jika token API diganti di sisi Subsplash, Zap akan berhenti tanpa pemberitahuan; hubungkan kembali.
- **B1 *Add Donation* gagal dengan 422**: penyebab paling umum adalah `fundId` yang hilang atau tidak dikenali. Lihat daftar dana Anda di **B1Admin → Donations → Funds**, lalu salin ID yang tepat ke dalam langkah Zap.
- **Pemberian pertama memicu dua kali**: Subsplash terkadang mengirim ulang pemicu jika Zapier melewatkan konfirmasinya. Tambahkan *Filter by Zapier* pada ID donasi (Subsplash menyertakannya dalam muatan data) untuk menyaring duplikat.

## Lihat Juga

- [Donorbox](./donorbox): bentuk resepnya sama, tetapi menggunakan platform donasi yang berbeda
- [Zapier (ikhtisar)](../zapier): sisi B1 dari setiap resep Zapier
- [Panduan integrasi Zapier Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (dokumentasi Subsplash)
