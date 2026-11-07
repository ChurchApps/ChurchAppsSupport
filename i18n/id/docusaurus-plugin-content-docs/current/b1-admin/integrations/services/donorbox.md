---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Jika gereja Anda menerima donasi melalui Donorbox tetapi mencatat jemaat dan laporan sumbangan di B1, Anda dapat meminta trigger instan Zapier dari Donorbox membuat catatan donasi yang sesuai di dalam B1, dan membuat donatur sebagai orang di B1 jika mereka belum ada. Tidak perlu rekonsiliasi manual, tidak perlu ekspor bulanan.

</div>

<div class="prereqs">
<h4>Sebelum Anda Memulai</h4>

- Akun [Donorbox](https://donorbox.org) dengan setidaknya satu kampanye
- Akun [Zapier](https://zapier.com)
- Pengguna B1Admin dengan izin **Edit Settings**

</div>

## Yang Dapat Anda Hubungkan

| Arah | Trigger Donorbox | Aksi B1 |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (instan) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (berulang) | Find Person → Add Donation (gunakan id Plan sebagai catatan) |

Donorbox menerbitkan triggernya sebagai **instan**, sehingga berjalan dalam hitungan detik setelah donasi sungguhan masuk. Tidak ada jeda polling.

## Pengaturan

### 1. Buat kunci API B1

Di B1Admin: **Settings → Developer → API Keys → New API Key**. Cakupan (scope):

- `people:read` — untuk mencari donatur berdasarkan email
- `people:write` — untuk membuat donatur jika belum ada
- `donations:write` — untuk mencatat pemberian

Trigger pada arah ini berasal dari Donorbox, bukan dari B1, sehingga Anda tidak memerlukan `settings:write` di sini.

### 2. Buat Zap "catat donasi"

1. **Trigger** — Donorbox: New Donation. Hubungkan dengan kunci API Donorbox (di Donorbox: *Account → Profile → API Settings*).
2. **Aksi** — B1.church: Find Person. Petakan email donatur dari trigger ke kolom pencarian *Email*.
3. **Aksi** — Filter by Zapier (opsional): lanjutkan hanya jika donatur tidak ditemukan, lalu…
4. **Aksi** — B1.church: Create Person. Petakan nama depan/belakang/email agar donatur tercatat sebagai anggota, bukan hanya sebagai catatan pemberian.
5. **Aksi** — B1.church: Add Donation. Petakan:
   - Amount → `data.amount`
   - Donation Date → tanggal donasi dari trigger
   - Fund → pilih dana B1 yang mencerminkan kampanye Donorbox (Zapier memungkinkan Anda mengganti dana berdasarkan filter atau langkah Formatter)
   - Method → "Online"
   - Notes → id transaksi Donorbox (berguna saat rekonsiliasi)

Aktifkan Zap. Donasi langsung berikutnya melalui Donorbox akan masuk ke **B1Admin → Donations** secara otomatis.

## Resep Umum

### Satu Zap per dana

Jika Anda menjalankan beberapa kampanye Donorbox yang dipetakan ke dana B1 yang berbeda, tata letak yang paling rapi adalah satu Zap per kampanye dengan filter *campaign* Donorbox di bagian atas. Dengan cara ini, pemetaan dana sudah ditetapkan secara tetap dan langkah pencarian dapat dilewati.

### Perlakukan donasi yang diperbarui sebagai koreksi

*New or Updated Donation* dari Donorbox juga terpicu saat donasi diedit. Gunakan langkah *Path* Zapier pada `event_type` untuk memisahkan alurnya: "new" → Add Donation, "updated" → Find Donation + Update (catatan: aplikasi Zapier B1 saat ini belum memiliki aksi Update Donation; untuk sementara, catat peristiwa "updated" ke saluran Slack untuk ditinjau secara manual).

### Sinkronkan perubahan paket berulang ke saluran Slack

- **Trigger** — Donorbox: New or Updated Plan
- **Aksi** — Slack: Send Message ke `#donations` (misalnya "Paket berubah — pemberian bulanan Sarah sekarang $200")

## Batasan & Catatan

- **Cocokkan donatur berdasarkan email.** Donorbox tidak membagikan id orang B1; satu-satunya kunci penghubung yang andal adalah email. Donatur yang memberi dengan email berbeda akan membuat orang baru di B1. Rekonsiliasi bulanan Anda sebaiknya memeriksa kasus-kasus ini.
- **Pengembalian dana tidak ditampilkan secara terpisah.** Donorbox mengirim pembaruan status pada donasi yang sama. Aplikasi Zapier B1 saat ini tidak memiliki aksi *Update Donation*; pola yang aman saat ini adalah mencatat peristiwa pengembalian dana di luar sistem dan menyesuaikan donasi secara manual.
- **Uji di sandbox Donorbox terlebih dahulu** untuk menghindari pembuatan pemberian palsu di B1 produksi. Donorbox menyediakan kredensial mode uji yang terpisah dari kredensial live.

## Pemecahan Masalah

- **Peringatan "Person not found" setiap kali berjalan** — tidak masalah jika langkah-langkahnya diurutkan sehingga *Create Person* berjalan pada cabang tidak-ditemukan. Jika langkah Create Person juga tidak pernah berjalan, periksa kembali bahwa kunci API memiliki `people:write`.
- **Jumlah donasi tampak 100× terlalu besar atau kecil** — Donorbox mengirim sen pada beberapa varian payload dan dolar pada varian lain. Gunakan langkah *Formatter by Zapier — Numbers* untuk membagi dengan 100 jika diperlukan.
- **Donasi ganda dari satu pemberian** — Donorbox memicu *New Donation* dan *Updated Donation* sekaligus. Filter ke `event_type = "donation.succeeded"` atau buat dua Zap dengan filter yang tidak tumpang tindih.

## Lihat Juga

- [Zapier (ikhtisar)](../zapier) — sisi B1 dari setiap resep Zapier
- [Subsplash](./subsplash) — platform donasi lain dengan aplikasi Zapier
- [Mailchimp](./mailchimp) — hubungkan "pemberian baru" dengan tag email
