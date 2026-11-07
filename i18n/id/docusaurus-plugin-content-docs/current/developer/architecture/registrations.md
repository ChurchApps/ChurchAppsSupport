---
title: "Pendaftaran Acara"
---

# Pendaftaran Acara

<div class="article-intro">

Pendaftaran acara native berada di modul content dan, sejak gelombang paid-registrations, memiliki model komersial yang lengkap: jenis peserta dengan harga, pilihan tambahan berbayar, kode diskon, pembayaran melalui gateway giving yang sudah dimiliki gereja, serta daftar tunggu berbasis status. Jalur uang sengaja menggunakan kembali tumpukan giving. Controller pendaftaran melakukan penagihan melalui abstraksi yang sama, yaitu `GatewayService` / `IGatewayProvider`, yang didokumentasikan di [Persembahan](./giving). Dengan begitu, tidak ada data kartu atau pengetahuan SDK gateway di dalam modul content. Halaman ini memetakan model data, aturan harga dan kapasitas, serta alur pendaftaran, pembayaran, dan daftar tunggu.

</div>

## Ikhtisar

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portal anggota)       │            │ Api — modul content                         │
│  wizard pendaftaran ·        │   HTTPS    │  RegistrationController                     │
│  Pendaftaran Saya            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (harga server)   │
│ B1Admin (staf)               │            │  RegistrationHelper (email)                 │
│  pengaturan pendaftaran acara│            └───────────────┬─────────────────────────────┘
│  · daftar peserta · ekspor CSV│                           │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ abstraksi gateway bersama (giving)          │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tiga aturan berlaku di seluruh tumpukan:

1. **Server yang menentukan harga.** Klien mengirimkan id jenis, id pilihan, dan jumlah. `RegistrationPricingHelper.computeTotal()` menghitung total di sisi server, dan kupon divalidasi ulang saat penagihan. Jumlah yang dikirim klien tidak pernah dipercaya.
2. **Kapasitas ditegakkan secara atomik saat insert.** Setiap insert yang dibatasi kapasitas menggunakan pernyataan `INSERT … SELECT … FROM dual WHERE (jumlah baris aktif) < kapasitas`, sehingga dua pendaftaran yang terjadi bersamaan tidak bisa sama-sama mengambil tempat terakhir. Jumlah diturunkan dari status (`pending`/`confirmed`) dan tidak pernah disimpan.
3. **Pembayaran berjalan di jalur giving.** `RegistrationController` memanggil `GatewayService.processCharge` bersama gateway yang dikonfigurasi gereja. Abstraksi provider, model tokenisasi, dan penanganan SCA-nya sama seperti untuk donasi.

## Model data (`Api/src/modules/content`)

Model berada di `models/Registration.ts`. Pemetaan tabel berada di `db/DatabaseTypes.ts`. Setiap tabel memiliki satu repo di dalam `repositories/`.

| Tabel | Arti | Field utama |
|-------|------|-------------|
| `registrations` | Satu pendaftaran (satu rumah tangga atau kelompok untuk satu acara) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Satu peserta dalam satu pendaftaran | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Jenis peserta per acara (misalnya Dewasa / Anak) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Opsi tambahan bernama dengan harga (misalnya kaus) | eventId, name, description, **price**, **capacity**, **maxQuantity** (batas per pendaftaran), sort, active |
| `registrationSelectionChoices` | Jumlah dari suatu pilihan yang dipilih oleh pendaftaran atau peserta | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Satu penagihan yang berhasil untuk suatu pendaftaran | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Kode diskon per acara | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Catatan:

- **Tidak ada tabel daftar tunggu.** Kelompok yang masuk daftar tunggu adalah baris `registrations` dengan `status = 'waitlisted'`. Seluruh siklus hidup daftar tunggu berupa transisi status pada satu tabel tersebut.
- **Tidak ada penghitung yang disimpan.** Jumlah "terjual" atau "terpakai" (kapasitas acara, kapasitas per jenis, kapasitas per pilihan, penggunaan kupon) dihitung dengan subquery berkorelasi terhadap baris yang statusnya ada di `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Dengan demikian, membatalkan pendaftaran langsung membebaskan kapasitas tanpa perlu pencatatan tambahan.
- Harga berupa kolom DECIMAL MySQL (dikirim sebagai string) yang dikonversi dengan `Number()` di dalam helper harga.

## Permukaan REST

Semua endpoint berada di bawah `/content/registrations` (`controllers/RegistrationController.ts`) dan dijaga oleh `Permissions.registrations` (`view` / `edit`):

| Rute | Akses | Tujuan |
|------|-------|--------|
| `POST /register` | anonim | Pengiriman lengkap: tamu, anggota, atau Tambah Peserta oleh staf; harga server, pemeriksaan kapasitas, penagihan opsional |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | publik | Jenis dan pilihan dengan `used` / `remainingCapacity` yang dihitung untuk wizard |
| `POST /types`, `DELETE /types/:id` (sama untuk `/selections`, `/coupons`) | `registrations.edit` | CRUD pengaturan untuk staf |
| `POST /coupons/validate` | publik | Validasi kode diskon secara inline selama wizard |
| `GET /coupons/event/:eventId` | staf | Kupon beserta jumlah penggunaannya |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staf · publik | Daftar peserta; jumlah peserta aktif untuk tampilan kapasitas |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | terautentikasi | Pendaftaran Saya, detail, riwayat pembayaran |
| `PUT /:id` | pemilik/staf | Penyuntingan setelah pengiriman. Mengganti peserta dan pilihan dengan pemeriksaan kapasitas atomik yang baru, serta menghitung ulang `totalAmount`. Tidak pernah menagih atau mengembalikan dana secara otomatis |
| `POST /:id/pay` | pemilik | "Selesaikan pembayaran": menagih `totalAmount − amountPaid`, lalu mengubah `waitlisted`/`pending` menjadi `confirmed` |
| `POST /:id/promote` | staf | Promosi manual dari daftar tunggu |
| `POST /:id/cancel` · `DELETE /:id` | pemilik · staf | Membatalkan / menghapus. Keduanya memicu promosi otomatis dari daftar tunggu |

Pendaftaran yang belum dibatalkan untuk `personId` dan acara yang sama akan ditolak dengan 409. Setiap pendaftaran yang dibuat mengirim webhook `registration.created` melalui `WebhookDispatcher`.

## Harga dan kode diskon

`helpers/RegistrationPricingHelper.ts` adalah satu-satunya otoritas perhitungan uang:

- `computeTotal()` menjumlahkan harga jenis setiap peserta ditambah `harga × jumlah` dari setiap pilihan.
- `validateCoupon()` memeriksa flag aktif, rentang tanggal (`startDate`/`endDate`), `minMembers` terhadap jumlah peserta yang dikirim, dan `maxUses` terhadap jumlah penukaran yang dihitung dari status.
- `applyDiscount()`: `percent` mengurangi `total × value/100`; `amount` mengurangi `value`. Keduanya tidak pernah turun di bawah nol.

Wizard memanggil `POST /coupons/validate` untuk umpan balik inline, tetapi `register` memvalidasi ulang dan menerapkan kupon di sisi server. Total yang ditampilkan di klien hanya bersifat informatif.

## Idiom kapasitas atomik

Setiap insert yang dibatasi kapasitas aman dari kondisi balapan tanpa transaksi atau kunci, karena pemeriksaan kapasitas menjadi bagian dari `INSERT` itu sendiri. Pada tingkat acara (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Jika baris yang terpengaruh adalah nol, artinya "kapasitas penuh". Idiom yang sama melindungi insert per jenis (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, yang menghitung peserta yang tergabung dengan pendaftaran aktif) dan jumlah per pilihan (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, yang menggunakan `COALESCE(SUM(quantity),0) + ? <= capacity`). Jika insert peserta atau pilihan gagal di tengah pendaftaran, controller membatalkan pendaftaran parsial dengan `deleteCascade()` dan melaporkan jenis atau pilihan mana yang sudah habis.

## Alur pembayaran

`processRegistrationCharge` di controller adalah satu-satunya tempat pendaftaran menyentuh uang, dan fungsi ini hanyalah klien tipis dari tumpukan giving:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenisasi terjadi di browser, sama persis seperti untuk donasi (lihat [Persembahan](./giving)). Wizard menggunakan ulang registri provider pembayaran apphelper, sehingga anggota yang sudah login dapat membayar dengan kartu tersimpan, dan tamu men-tokenisasi kartu baru. Controller mengikuti keunikan provider dari `DonateController` (id metode pembayaran `pm-{id}` dari Kingdom Funding, serta respons `requires_action` dari SCA Stripe yang dikembalikan ke klien tanpa mencatat pembayaran). Penagihan yang berhasil menulis baris `registrationPayments`, menambah `amountPaid`, dan mengonfirmasi pendaftaran. **Pengembalian dana belum diimplementasikan.** Pendaftaran berbayar yang dibatalkan tetap menyimpan baris pembayarannya, dan pengembalian dana ditangani di luar sistem melalui dasbor gateway.

Kedua titik masuk menggunakan jalur kode yang sama: `register` (bayar saat mendaftar) dan `pay` (pembayaran sisa tagihan atau penyelesaian daftar tunggu).

`register` melewati penagihan dalam dua kasus dan menyimpan pendaftaran sebagai `pending` dengan `amountPaid = 0`, sehingga total penuh tercatat sebagai sisa tagihan:

- **Tambah Peserta oleh staf.** Body berisi `personId` yang bukan milik pemanggil, tanpa `guestInfo`, dan pemanggil memiliki `registrations.edit` di gereja tersebut. Orang tersebut harus ada (jika tidak, 404), filter anggota rumah tangga dilewati, dan kartu tidak ditagih.
- **Tanpa gateway.** Gereja tidak memiliki gateway giving (`hasGateway` memeriksa `gateway.loadAll`). Langkah pembayaran B1App menampilkan **Daftar dan Bayar Nanti** sebagai ganti formulir kartu.

Pendaftaran berbayar oleh tamu (tanpa `au.id`) harus menyertakan `captchaPass` dari `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (sekarang berada di `shared/helpers`) dijalankan tepat sebelum penagihan, sehingga pendaftaran daftar tunggu dan pendaftaran gratis tidak terpengaruh. Jika `CAPTCHA_ENFORCE=true` dan pass tidak ada atau tidak valid, pendaftaran baru dibatalkan dengan `deleteCascade()` dan panggilan mengembalikan 403. `RegistrationPaymentForm` di B1App menampilkan kotak centang reCAPTCHA kepada tamu dan mengirimkan pass bersama penyimpanan kartu serta pendaftaran.

## Siklus hidup daftar tunggu

Ketika acara sudah penuh dan flag `waitlistEnabled` acara aktif, `register` menyimpan kelompok tersebut sebagai `waitlisted` (melewati pemeriksaan kapasitas) dan mengirim email konfirmasi biasa yang ditandai sebagai tempat daftar tunggu. Promosi terjadi melalui tiga cara: `cancel`, `delete`, dan endpoint `promote` untuk staf. Ketiganya mengarah ke `RegistrationRepo.promoteFromWaitlist`, yang memilih baris daftar tunggu paling lama dan mengubahnya secara atomik:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…jumlah aktif untuk acara…) < ?
```

Guard `status='waitlisted'` memastikan promosi bersamaan tidak menggandakan baris yang sama, dan subquery kapasitas memastikan promosi tidak melebihi kuota. Baris yang dipromosikan masuk ke status `pending`, bukan `confirmed`, karena mungkin masih ada sisa tagihan. `RegistrationHelper.sendWaitlistAvailabilityEmail` memberi tahu pendaftar bahwa tempatnya telah tersedia. Jika `totalAmount − amountPaid > 0`, email tersebut juga memuat tautan ke halaman B1 `/mobile/registrations` milik gereja (Pendaftaran Saya), yang dibangun dari `B1AppRoot` dan subdomain gereja. Pembayaran (atau tidak adanya sisa tagihan) akan mengonfirmasi pendaftaran.

:::info
Peningkatan kapasitas tidak otomatis memindahkan orang dari daftar tunggu. Staf menggunakan aksi Promosikan di daftar peserta setelah menaikkan kapasitas. Pembatalan dan penghapusan dipromosikan secara otomatis.
:::

## Permukaan klien

- **Wizard B1App**: satu hook bersama, `B1App/src/components/registration/useEventRegistration.ts`, menggerakkan komponen situs web (`components/registration/EventRegister.tsx`) dan layar portal seluler (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) melalui langkah `info → members → selections → questions → payment → confirm`. Langkah tengah hanya muncul jika acara memiliki pilihan, formulir terlampir, atau total yang bukan nol. Langkah info dan peserta menampilkan pemilih per jenis peserta dengan sisa kapasitas langsung serta status habis. Langkah pembayaran (`RegistrationPaymentForm.tsx`) menampilkan ringkasan pesanan, kolom kode diskon, dan, untuk anggota yang sudah login, metode pembayaran tersimpan melalui registri provider apphelper. Tamu men-tokenisasi kartu baru. Layar seluler **Pendaftaran** (`screens/RegistrationsPage.tsx`) adalah Pendaftaran Saya: status, sisa tagihan, Selesaikan pembayaran (`POST /:id/pay`), Sunting (`PUT /:id`: kontak, jenis peserta, jumlah pilihan), dan Batalkan.
- **Pengaturan B1Admin**: `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` menambahkan sakelar Aktifkan Daftar Tunggu serta akordeon untuk Jenis Peserta, Pilihan, dan Kode Diskon (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Semuanya berupa CRUD terhadap rute `/types`, `/selections`, dan `/coupons`.
- **Daftar peserta B1Admin**: `B1Admin/src/registrations/RegistrationDetailsPage.tsx` berisi kolom Jenis per peserta, kolom Dibayar/Total dengan chip sisa tagihan, chip jumlah per jenis, dialog detail pembayaran (`RegistrationDetailDialog.tsx`, dari `GET /payments/:registrationId`), aksi baris Promosikan untuk daftar tunggu, serta ekspor CSV yang mencakup jenis peserta, pilihan, dibayar/total/sisa tagihan, dan jawaban pertanyaan.

Pencarian lintas modul (menemukan atau membuat orang tamu, memuat gereja untuk email) melalui `getMembershipModuleGateway()`. Modul content tidak pernah membaca tabel keanggotaan secara langsung.

## Halaman terkait

- [Persembahan](./giving): abstraksi gateway, registri provider, dan model tokenisasi yang digunakan kembali oleh fitur ini
- [Endpoint Content](../api/endpoints/content): permukaan REST modul content
- [Webhook](../api/webhooks): event `registration.created`
- [Struktur Modul](../api/module-structure): cara modul content diorganisasi di sisi server
