---
title: "Endpoint Giving"
---

# Endpoint Giving

<div class="article-intro">

Modul Giving mengelola donasi, dana, pemrosesan pembayaran, langganan, dan operasi keuangan terkait. Modul ini mendukung beberapa gateway pembayaran (Stripe, PayPal), menangani donasi sekali dan berulang, melacak batch donasi, serta menyediakan pemrosesan webhook untuk peristiwa pembayaran asinkron.

</div>

**Path dasar:** `/giving`

## Donasi

Path dasar: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View atau personId sendiri | Daftar semua donasi. Filter dengan `?batchId=` atau `?personId=`. Dengan `?personId=`, hadiah untuk dana yang tidak dapat dikurangkan dikecualikan (seperti pada laporan pemberian) kecuali pemanggil dengan Donations.View menambahkan `&includeNonDeductible=1`, yang dilakukan oleh rekam data person di B1Admin |
| GET | `/:id` | JWT | Donations.View | Ambil donasi berdasarkan ID |
| GET | `/my` | JWT | — | Ambil donasi pengguna saat ini |
| GET | `/my/summary?year=` | JWT | — | Total pemberian pengguna saat ini untuk satu tahun (default tahun ini): `{ year, total, count, currency, isConverted }`, dengan total dikonversi ke mata uang gereja. Digunakan untuk pratinjau pemberian di halaman beranda anggota |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Donasi yang bertanggal dalam rentang (inklusif). Kedua tanggal wajib dalam format `YYYY-MM-DD`, jika tidak, responsnya `400`. Halaman laporan pemberian B1Admin meminta satu tahun kalender dengan cara ini, bukan seluruh riwayat gereja |
| GET | `/summary` | JWT | Donations.ViewSummary | Ambil ringkasan donasi. Filter dengan `?startDate=&endDate=&type=`. Gunakan `type=person` untuk rincian per orang |
| GET | `/testEmail` | Public | — | Kirim email uji (untuk pengembangan/debugging) |
| POST | `/` | JWT | Donations.Edit atau Donations.Enter | Buat atau perbarui donasi (batch). Hanya dengan Donations.Enter, batch tujuan dan (untuk pembaruan) batch donasi saat ini harus terbuka, dan hadiah gateway (yang memiliki `transactionId`) tidak dapat diubah; jika tidak, `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit atau Donations.Enter | Hapus donasi. Hanya Donations.Enter: donasi harus berada di batch terbuka dan bukan hadiah gateway, jika tidak, `403` |

### Contoh: Daftar Donasi berdasarkan Batch

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Contoh: Ambil Ringkasan Donasi

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Batch Donasi

Path dasar: `/giving/donationbatches`

Memperluas `GenericCrudController` dengan rute CRUD: `getById`, `getAll`, `post`, `delete`. Operasi hapus juga menghapus semua donasi di dalam batch.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary atau Donations.Enter | Daftar semua batch donasi |
| GET | `/:id` | JWT | Donations.ViewSummary atau Donations.Enter | Ambil batch donasi berdasarkan ID |
| POST | `/` | JWT | Donations.Edit atau Donations.Enter | Buat atau perbarui batch donasi. Hanya Donations.Enter: memperbarui batch yang ada mengharuskan batch tersebut terbuka, jika tidak, `403 { "error": "This batch is closed." }`. `status` diabaikan di sini, jadi menyimpan batch tidak dapat membukanya kembali |
| POST | `/:id/close` | JWT | Donations.Edit | Tutup batch: mengatur `status` menjadi `closed`, `closedDate` menjadi waktu sekarang, dan `closedBy` menjadi ID pengguna pemanggil. Mengembalikan batch |
| POST | `/:id/reopen` | JWT | Donations.Edit | Buka kembali batch: mengatur `status` menjadi `open` dan menghapus `closedDate` dan `closedBy`. Mengembalikan batch |
| DELETE | `/:id` | JWT | Donations.Edit | Hapus batch beserta semua donasinya |

Setiap batch memiliki `status` (`open` atau `closed`; batch baru dan yang sudah ada adalah `open`), `closedDate`, dan `closedBy`. Donations.Edit dapat mengubah donasi di batch mana pun; Donations.Enter (ditampilkan sebagai **Enter Donations** di editor peran) hanya dapat menambah, mengubah, atau menghapus donasi dan pembagian dana selama batch-nya terbuka.

## Donate

Path dasar: `/giving/donate`

Menangani alur donasi publik termasuk pengisian, langganan, webhook, dan perhitungan biaya. Tidak ada rute CRUD dasar yang diaktifkan; semua endpoint bersifat kustom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | Ambil gateway pembayaran yang tersedia untuk gereja (hanya kunci publik) |
| POST | `/client-token` | JWT | — | Buat token klien untuk inisialisasi gateway |
| POST | `/create-order` | JWT | — | Buat pesanan pembayaran (checkout gaya PayPal) |
| POST | `/charge` | JWT | — | Proses pengisian donasi sekali |
| POST | `/subscribe` | JWT | — | Buat langganan donasi berulang |
| POST | `/log` | Public | — | Catat donasi. Body: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | Terima peristiwa webhook pembayaran (Stripe, PayPal). Memerlukan `?churchId=` |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Putar ulang peristiwa Stripe untuk rentang tanggal. Body: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | Hitung biaya transaksi. Body: `{ type, provider, gatewayId, amount, currency }`. Memerlukan `?churchId=` |
| POST | `/captcha-verify` | Public | — | Verifikasi token reCAPTCHA. Body: `{ token, churchId? }`. Jawaban manusia mengembalikan `{ response: "human", pass }`, di mana `pass` adalah pass pemberian tamu yang ditandatangani dan berlaku selama 10 menit (dan hanya untuk `churchId` jika dikirim) |

Ketika API berjalan dengan `CAPTCHA_ENFORCE=true`, panggilan tamu (yang belum masuk) ke `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard`, dan `/giving/paymentmethods/ach-setup-intent-anon` (serta panggilan `POST /content/registrations/register` tamu yang berbayar) harus menyertakan `captchaPass` tersebut di body, atau mereka mengembalikan 403 `Captcha verification required`. Pass dapat digunakan kembali hingga kedaluwarsa, karena alur tamu Stripe melakukan dua panggilan (tambah kartu, lalu pengisian). Panggilan yang sudah masuk tidak terpengaruh. `CAPTCHA_ENFORCE` default-nya `false`; formulir pemberian tamu di `@churchapps/apphelper` mengirim pass secara otomatis.

### Contoh: Proses Pengisian Donasi

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Contoh: Buat Langganan Berulang

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Dana

Path dasar: `/giving/funds`

Memperluas `GenericCrudController` dengan rute CRUD: `getById`, `getAll`, `post`, `delete`. Permission `view` adalah `null` (tidak memerlukan permission untuk melihat dana).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Daftar semua dana |
| GET | `/:id` | JWT | — | Ambil dana berdasarkan ID |
| GET | `/churchId/:churchId` | Public | — | Ambil semua dana untuk gereja tertentu (publik) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | Ambil total donasi suatu dana: `{ fundId, totalAmount, donationCount }`. Mendukung elemen `campaignProgress` pada pembuat situs web |
| POST | `/` | JWT | Donations.Edit | Buat atau perbarui dana |
| DELETE | `/:id` | JWT | Donations.Edit | Hapus dana |

## Donasi Dana

Path dasar: `/giving/funddonations`

Melacak bagaimana donasi individual dialokasikan ke berbagai dana. Tidak ada rute CRUD dasar yang diaktifkan; semua endpoint bersifat kustom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | Daftar donasi dana. Filter dengan `?donationId=`, `?personId=`, `?fundId=`, atau `?fundName=`. Opsional tambahkan `?startDate=&endDate=` untuk filter tanggal |
| GET | `/:id` | JWT | Donations.View | Ambil donasi dana berdasarkan ID |
| GET | `/my` | JWT | — | Ambil donasi dana pengguna saat ini |
| POST | `/` | JWT | Donations.Edit atau Donations.Enter | Buat atau perbarui donasi dana (batch). Hanya Donations.Enter: donasi induk harus berada di batch terbuka dan bukan hadiah gateway, jika tidak, `403` |
| DELETE | `/:id` | JWT | Donations.Edit atau Donations.Enter | Hapus donasi dana. Aturan batch terbuka yang sama berlaku untuk Donations.Enter |

## Gateway

Path dasar: `/giving/gateways`

Mengelola konfigurasi gateway pembayaran (Stripe, PayPal, dll.). Tidak ada rute CRUD dasar yang diaktifkan; semua endpoint bersifat kustom. Rahasia gateway dienkripsi saat disimpan.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Daftar semua gateway untuk gereja |
| GET | `/:id` | JWT | Settings.Edit | Ambil gateway berdasarkan ID |
| GET | `/churchId/:churchId` | Public | — | Ambil gateway untuk gereja (hanya kunci publik) |
| GET | `/configured/:churchId` | Public | — | Periksa apakah gereja memiliki gateway pembayaran yang sudah dikonfigurasi |
| POST | `/` | JWT | Settings.Edit | Buat atau perbarui gateway (mengenkripsi kunci, menyiapkan webhook dan produk) |
| PATCH | `/:id` | JWT | Settings.Edit | Perbarui sebagian gateway |
| DELETE | `/:id` | JWT | Settings.Edit | Hapus gateway (juga menghapus webhook-nya) |

### Contoh: Periksa Konfigurasi Gateway

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Pelanggan

Path dasar: `/giving/customers`

Memperluas `GenericCrudController` dengan rute CRUD: `getAll`, `delete`. Menghubungkan orang dengan catatan pelanggan gateway pembayaran mereka.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Daftar semua pelanggan |
| GET | `/:id` | JWT | Donations.ViewSummary atau catatan sendiri | Ambil pelanggan berdasarkan ID |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary atau catatan sendiri | Ambil langganan gateway untuk pelanggan |
| DELETE | `/:id` | JWT | Donations.Edit | Hapus pelanggan |

## Langganan

Path dasar: `/giving/subscriptions`

Mengelola langganan donasi berulang. Tidak ada rute CRUD dasar yang diaktifkan; semua endpoint bersifat kustom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Daftar semua langganan |
| GET | `/:id` | JWT | Donations.ViewSummary | Ambil langganan berdasarkan ID |
| POST | `/` | JWT | Donations.Edit atau langganan sendiri | Perbarui langganan dengan gateway pembayaran |
| DELETE | `/:id` | JWT | Donations.Edit atau langganan sendiri | Batalkan langganan dan hapus dari database. Body: `{ provider, reason }` |

## Dana Langganan

Path dasar: `/giving/subscriptionfunds`

Melacak alokasi dana untuk langganan berulang. Tidak ada rute CRUD dasar yang diaktifkan; semua endpoint bersifat kustom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View atau langganan sendiri | Daftar dana langganan. Filter dengan `?subscriptionId=` |
| GET | `/:id` | JWT | Donations.ViewSummary | Ambil dana langganan berdasarkan ID |
| DELETE | `/:id` | JWT | Donations.Edit | Hapus dana langganan |
| DELETE | `/subscription/:id` | JWT | Donations.Edit atau langganan sendiri | Hapus semua dana untuk satu langganan |

## Metode Pembayaran

Path dasar: `/giving/paymentmethods`

Mengelola metode pembayaran tersimpan (kartu, rekening bank) melalui API gateway pembayaran. Tidak ada rute CRUD dasar yang diaktifkan; semua endpoint bersifat kustom.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View atau personId sendiri | Ambil semua metode pembayaran tersimpan untuk satu orang (kartu, rekening bank) |
| POST | `/addcard` | JWT | — | Lampirkan metode pembayaran kartu. Body: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit atau personId sendiri | Perbarui detail kartu. Body: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit atau personId sendiri | Buat ACH SetupIntent Stripe untuk menautkan rekening bank. Body: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | Buat ACH SetupIntent anonim untuk donasi tamu. Body: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit atau personId sendiri | Tambahkan rekening bank melalui token (tidak digunakan lagi; gunakan `ach-setup-intent`). Body: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit atau personId sendiri | Perbarui detail rekening bank. Body: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit atau pelanggan sendiri | Verifikasi rekening bank dengan setoran mikro. Body: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit atau pelanggan sendiri | Hapus metode pembayaran (kartu atau rekening bank) |

## Log Peristiwa

Path dasar: `/giving/eventLog`

Memperluas `GenericCrudController` dengan rute CRUD: `getById`, `getAll`, `post`, `delete`. Melacak peristiwa webhook gateway pembayaran untuk audit dan deduplikasi.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | Daftar semua log peristiwa |
| GET | `/:id` | JWT | Donations.ViewSummary | Ambil log peristiwa berdasarkan ID |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Ambil log peristiwa yang difilter berdasarkan jenis peristiwa |
| POST | `/` | JWT | Donations.Edit | Buat atau perbarui log peristiwa |
| DELETE | `/:id` | JWT | Donations.Edit | Hapus log peristiwa |

## Halaman Terkait

- [Endpoint Keanggotaan](./membership): Orang, gereja, grup, peran, dan permission
- [Autentikasi & Permission](./authentication): Alur login, JWT, OAuth, model permission
- [Struktur Modul](../module-structure): Pola organisasi kode
