---
title: "Arsitektur Donasi"
description: "Panduan pengembang persembahan ChurchApps: cara B1 Admin dan B1.church mengirim donasi lewat gateway Stripe, PayPal, Kingdom Funding, atau Paystack."
---

# Arsitektur Donasi

<div class="article-intro">

ChurchApps menjalankan donasi dengan model gateway-rail: gereja tetap memiliki akun Stripe (atau PayPal, Kingdom Funding, atau Paystack) sendiri, dan B1 tidak pernah berada di jalur uang sebagai prosesor pembayaran platform. Data kartu di-tokenisasi di browser dan tidak pernah sampai ke server ChurchApps. Halaman ini memetakan keseluruhan stack: registri penyedia pembayaran di sisi klien dalam `@churchapps/apphelper`, abstraksi gateway GivingApi, model data donasi, dan cara webhook gateway direkonsiliasi kembali ke database.

</div>

## Ikhtisar

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Ada tiga prinsip yang berlaku di seluruh stack:

1. **Gateway memegang kartu.** Setiap widget entri penyedia men-tokenisasi data di browser; API hanya menerima token, nonce, atau order id.
2. **Satu abstraksi, banyak penyedia.** Browser menentukan `PaymentProvider` dari sebuah registri; server menentukan `IGatewayProvider` dari sebuah factory. Keduanya menggunakan nama penyedia ternormalisasi yang sama yang disimpan pada record gateway.
3. **Webhook adalah sumber kebenaran untuk penyelesaian.** Respons charge dicatat secara optimistis, tetapi webhook gateway yang ditandatangani yang mengonfirmasi (atau membuat) donasi yang selesai, dengan pengaman idempotensi di kedua sisi.

## Sisi klien: registri penyedia pembayaran (`@churchapps/apphelper`)

Registri berada di `Packages/apphelper/src/donations/providers/`, dengan widget dan helper setiap penyedia berada di subfolder masing-masing (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Tidak ada kode di luar `providers/` yang bercabang berdasarkan nama penyedia. `PaymentProvider` (lihat `providers/types.ts`) menggabungkan semua yang dibutuhkan aplikasi host untuk satu gateway: `descriptor` (label admin, mata uang yang didukung, field biaya, tarif biaya default, URL dasbor/pendaftaran), kumpulan flag `capabilities` (kartu tersimpan, ACH, berulang, entri kartu baru secara inline, penyimpanan otomatis saat tokenisasi), widget React untuk entri anggota (`MemberWrapper`/`MemberEntry`), donasi tamu (`GuestForm`), pengeditan metode tersimpan (`MethodEditForm`), dan pembayaran form-question (`FormPayment`), serta `buildChargeRequest(ctx, token)`, satu-satunya tempat bentuk payload charge berbeda untuk setiap penyedia. `MemberWrapper` setiap penyedia memuat SDK-nya sendiri dari kunci publik pada record gateway, sehingga aplikasi host tidak pernah mengimpor SDK gateway (B1App dan B1Admin tidak memiliki dependensi `@stripe/*`). `pickDefaultGateway(gateways, capability?)` memusatkan penentuan gateway mana dari gereja yang harus digunakan suatu permukaan.

`providers/registry.ts` berisi penyedia bawaan. Penyedia tersebut **direferensikan secara langsung (by value)**, bukan didaftarkan melalui efek samping modul, sehingga tree-shaking dari bundler tidak akan pernah menghapus pendaftaran:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Fungsi | Tujuan |
|----------|---------|
| `getPaymentProvider(name)` | Menentukan berdasarkan nama ternormalisasi; kembali ke Stripe agar penyedia yang salah konfigurasi tidak membuat form donatur crash |
| `registerPaymentProvider(p)` | Mendaftarkan penyedia tambahan saat runtime (untuk gateway kustom aplikasi host) |
| `listPaymentProviders()` | Mencacah bawaan + kustom, digunakan untuk membangun dropdown gateway admin |
| `hasPaymentProvider(name)` | Pemeriksaan keanggotaan |

**Penyedia klien bawaan: Stripe, PayPal, Kingdom Funding, Paystack.** B1App dan B1Admin hanya *membaca* registri (`getPaymentProvider`, `listPaymentProviders`); keduanya tidak memanggil `registerPaymentProvider`. Pendaftaran tetap berada di dalam apphelper.

Setiap penyedia melakukan tokenisasi dengan cara yang berbeda, tetapi semuanya menjaga kartu tetap di luar B1:

| Penyedia | Widget entri | Token yang dikembalikan ke API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` dari Stripe `Elements` → `stripe.createPaymentMethod(...)`; form tamu juga memasang `ExpressCheckoutElement` (Apple Pay / Google Pay, untuk hadiah sekali) yang `onConfirm`-nya menghasilkan id `pm_…` yang sama | id payment-method (`pm_…`); bank melalui `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` untuk gateway USD, Canadian PAD `acss_debit` (modal mandat yang di-host, mandat `default_for` untuk invoice/langganan, charge sekali meneruskan id mandat) untuk gateway CAD |
| Kingdom Funding | Form tokenizer yang di-host, dikunci oleh kunci publik gateway | nonce sekali pakai |
| PayPal | PayPal Hosted Fields (kartu, berulang) ditambah PayPal Smart Buttons dengan pendanaan Venmo (sekali); keduanya berbagi satu pemuatan SDK dan order server yang dibangun melalui `/donate/client-token` + `/donate/create-order` | id order yang di-capture |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`); popup itu sendiri yang memproses pembayaran (kartu, mobile money, transfer bank, USSD) | referensi transaksi yang sudah dibayar; metode tersimpan berupa kode otorisasi Paystack `AUTH_…` |

`finalizeResult` milik Stripe menjalankan 3-D Secure / SCA di browser (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) sebelum donasi dianggap selesai. Form bersama hanya memanggil `provider.finalizeResult(result)` tanpa mengetahui apa yang dilakukannya.

## Sisi server: abstraksi gateway (GivingApi)

Modul `/giving` (`Api/src/modules/giving`) menyediakan permukaan REST; infrastruktur gateway berada di `Api/src/shared/helpers`. `DonateController` tidak pernah berbicara langsung dengan SDK gateway. Ia melalui `GatewayService`, yang menentukan `IGatewayProvider` yang tepat dari `GatewayFactory` dan memberinya `GatewayConfig` yang sudah didekripsi.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) adalah kontrak yang diimplementasikan setiap gateway: siklus hidup webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), pembayaran (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), biaya (`calculateFees`), penanganan metode tersimpan (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), serta tambahan opsional (customer, order, SetupIntent, replay event, `retryFailedPayment` untuk invoice langganan yang gagal, `registerPaymentMethodDomain` untuk verifikasi domain Apple Pay). Penyedia yang tidak menyediakan hook opsional akan dilaporkan sebagai tidak didukung untuk aksi tersebut, dan UI menyembunyikan kontrolnya. Setiap kelas penyedia mendeklarasikan matriks `capabilities`-nya sendiri (mata uang yang didukung, ACH, refund, syarat langganan, batas transaksi). `GatewayService.getProviderCapabilities(provider)` hanya membacanya. Flag seperti `logsDonationsImmediately` mengatur perilaku controller tanpa kondisi bernama penyedia apa pun di dalam controller.

**Penyedia server yang terdaftar di `GatewayFactory`:**

| Penyedia | Ketersediaan |
|----------|-------------|
| Stripe | Selalu aktif |
| PayPal | Selalu aktif |
| Kingdom Funding | Selalu aktif |
| Paystack | Selalu aktif (merchant di Nigeria, Ghana, Afrika Selatan, Kenya, Côte d'Ivoire; mata uang NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in melalui flag lingkungan `ENABLE_SQUARE` |
| ePayMints | Opt-in melalui flag lingkungan `ENABLE_EPAYMINTS` |

Paystack berbeda dari yang lain karena uang berpindah sebelum GivingApi terlibat. Popup mengenakan biaya kepada donatur, `processCharge` adalah `GET /transaction/verify/:reference` yang jumlah dan mata uang yang dibayarkannya harus sesuai dengan donasi yang sedang dicatat (referensi yang sudah tercatat tidak pernah dicatat dua kali). Hadiah pertama dari jadwal berulang dicatat dari `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` dengan `start_date` satu interval ke depan). Webhook ditandatangani dengan secret key itu sendiri (`x-paystack-signature`, HMAC-SHA512 atas raw body), dan Paystack tidak memiliki API manajemen webhook, sehingga layar admin menampilkan URL agar gereja dapat menempelkannya ke dasbor mereka. Event `charge.success` perpanjangan tidak membawa pembagian dana; penyedia memulihkannya dari baris lokal `subscriptions`/`subscriptionFunds` milik donatur. Hanya otorisasi kartu yang bersifat `reusable`. Hadiah mobile money hanya sekali, sehingga `createSubscription` menolaknya. Data demo menanam gereja kedua (Accra Community Church, `CHU00000002`) pada gateway GHS mode uji Paystack, sehingga suite Playwright Paystack berjalan berdampingan dengan suite Stripe milik Grace.

Penyedia kustom dapat didaftarkan saat runtime jika `ENABLE_CUSTOM_GATEWAY_PROVIDERS` diatur. `AbstractExperimentalGatewayProvider` adalah kelas dasar untuk penyedia tersebut. Nama penyedia dicocokkan tanpa membedakan huruf besar dan kecil.

### Konfigurasi gateway dan secret

Admin menyimpan kredensial gateway melalui `POST /giving/gateways` (`GatewayController`). Saat penyimpanan, controller mengenkripsi private key dan webhook key dengan `EncryptionHelper` sebelum disimpan, lalu, pada host selain localhost, menghapus webhook yang sudah ada milik gereja dan menyediakan webhook baru yang mengarah ke `/giving/donate/webhook/{provider}?churchId=…`. Setiap gereja hanya memiliki satu baris per penyedia. Menyimpan gateway hanya menggantikan baris yang sudah ada untuk penyedia yang sama. Pembacaan publik (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) hanya mengembalikan kunci publik.

## Model data

Skema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, model di `models/`) adalah skema MySQL yang diakses melalui Kysely:

| Tabel | Peran |
|-------|------|
| `gateways` | Konfigurasi penyedia per gereja: `provider`, `publicKey`, `privateKey`/`webhookKey` terenkripsi, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Peruntukan donasi (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Pengelompokan untuk entri/pelaporan (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Satu hadiah: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; laporan, total, dasbor, dan laporan donasi hanya menghitung `complete` atau null), `transactionId` |
| `fundDonations` | Alokasi satu donasi ke satu atau beberapa dana (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Hadiah berulang; `id` adalah id langganan dari gateway, terhubung ke `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Pembagian dana untuk hadiah berulang |
| `customers` | Menghubungkan `personId` ke id customer gateway-nya, per `provider` |
| `gatewayPaymentMethods` | Kartu/bank tersimpan: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Jejak audit webhook/event dan kunci deduplikasi (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Kampanye janji yang terikat pada dana, dan jumlah janji setiap orang |

Donasi dibagi ke beberapa dana melalui `fundDonations`. Donasi membawa total, dan setiap `fundDonation` membawa sebagiannya. `donations.currency` dan `gateways.currency` menyimpan mata uang ISO. Setiap penyedia mengiklankan `supportedCurrencies`-nya, dan jumlah diformat dengan `CurrencyHelper.formatCurrencyWithLocale`.

## Alur end-to-end

### Anggota, sekali dan berulang (B1App)

Layar donasi yang terautentikasi (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) menyusun tiga komponen apphelper: `MultiGatewayDonationForm`, `PaymentMethods`, dan `RecurringDonations`. B1App melakukan pemuatan data di sekitarnya (`GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`) dan meneruskan daftar gateway. Penyedia yang ditentukan memuat SDK-nya sendiri dari kunci publik gateway. Charge itu sendiri terjadi di dalam apphelper. Penyedia yang ditentukan men-tokenisasi metode (baru atau tersimpan), lalu mengirim ke `/giving/donate/charge` untuk hadiah sekali atau `/giving/donate/subscribe` untuk hadiah berulang. Kedua endpoint mengaitkan donatur yang sudah masuk ke `personId`-nya sendiri (hanya pemegang `donations.edit` yang dapat mengaitkan ke orang lain) dan menolak pembagian dana yang totalnya melebihi jumlah yang dikenakan. Hadiah berulang membuat baris `subscriptions` beserta `subscriptionFunds`, lalu menyerahkan jadwal ke gateway (Stripe Subscriptions, PayPal Billing Plans, atau jadwal berulang KF).

### Donasi tamu / anonim

Halaman donasi publik (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) dan panel "beri sekarang" me-render `NonAuthDonationWrapper` dari `@churchapps/apphelper/website`. Komponen ini menyuntikkan reCAPTCHA dan konteks Elements gateway di sekitar `GuestForm` milik penyedia. Tamu tidak mendapatkan login, metode tersimpan, maupun riwayat. Alurnya mengambil `GET /giving/funds/churchId/:id` dan `GET /giving/donate/gateways/:churchId` (hanya kunci publik), memverifikasi pengunjung dengan `POST /giving/donate/captcha-verify`, men-tokenisasi di browser, lalu mengirim ke `/giving/donate/charge` (atau `/subscribe`). Panggilan verifikasi mengembalikan `captchaPass` yang ditandatangani HMAC dan berlaku 10 menit (`Api/src/modules/giving/helpers/CaptchaPass.ts`). Form mengirimkannya pada setiap panggilan uang tamu. Jika `CAPTCHA_ENFORCE=true`, Api menolak panggilan `create-order`, `charge`, `subscribe`, `addcard`, dan `ach-setup-intent-anon` dari tamu yang tidak menyertakan pass valid untuk gereja tersebut. Pendaftaran acara berbayar oleh tamu (`POST /content/registrations/register`) memeriksa pass yang sama tepat sebelum charge; lihat [Pendaftaran Acara](./registrations.md#payment-flow). ACH tamu menggunakan `POST /giving/paymentmethods/ach-setup-intent-anon` yang anonim, dan hanya mengizinkan verifikasi instan (Financial Connections). Pemeriksaan microdeposit selesai beberapa hari kemudian, setelah halaman tamu sudah ditutup, sehingga tidak akan pernah menyelesaikan hadiah. Form menolak mengenakan biaya pada SetupIntent yang belum diverifikasi dan mengarahkan donatur ke kartu atau pengaturan bank untuk pengguna yang sudah masuk.

Tiga opsi form tamu menggunakan panggilan charge yang sama. `?fundId=` dan `?amount=` pada URL donasi memilih pembagian dana sebelumnya. Form tamu setiap penyedia membacanya saat dipasang, lalu meneruskannya melalui handler perubahan dana normal sehingga total dan biaya ikut diperbarui. `anonymous: true` membuat `DonateController.charge` membuang orang mana pun yang dikirim klien dan mencatat hadiah dengan `personId = null`. Form tamu melewati `/people/loadOrCreate` dan langkah customer/vault. Tiga penyedia yang mencatat secara langsung berhenti menentukan orang dari customer gateway. Apple Pay memerlukan domain halaman terdaftar di Stripe, sehingga form tamu Stripe mengirim sekali per sesi ke `POST /giving/donate/register-domain` yang publik dan dibatasi laju. Endpoint ini hanya menerima domain yang dimiliki gereja (`<subDomain>.b1.church`, baris di tabel domain modul konten, atau host lokal) sebelum memanggil API payment-method-domains Stripe.

### Pencatatan admin dan impor Stripe (B1Admin)

Bagian donasi B1Admin (`B1Admin/src/donations/`) adalah tempat tim keuangan bekerja. Entri batch (`components/BulkDonationEntry.tsx`) mencatat hadiah tunai/cek/in-kind dengan mengirim `/giving/donations` lalu `/giving/funddonations`, tanpa melibatkan gateway. Sheet **Log a gift** pada record orang (`components/LogGiftDialog.tsx`) melakukan hal yang sama untuk satu hadiah. Sheet ini pertama-tama mencari batch yang `batchDate`-nya cocok dengan tanggal hadiah, atau membuat batch baru dengan nama tanggal tersebut (`POST /giving/donationbatches`). Jika langkah berikutnya gagal, donasi dan batch baru dihapus kembali. Dana, batch, kampanye, dan laporan masing-masing dipetakan ke rute CRUD `/giving/*` mereka. Halaman laporan pemberian (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) meminta satu tahun kalender dengan `GET /donations?startDate=&endDate=` dan `GET /fundDonations?startDate=&endDate=`, bukan seluruh riwayat gereja, yang bisa melebihi batas ukuran respons Lambda. Panel donasi bergaya anggota (`B1Admin/src/donationComponents/`) menggunakan kembali komponen apphelper yang sama dengan B1App.

Serah terima pelaporan dan akuntansi dilakukan di sisi klien atau oleh report runner, bukan pekerjaan gateway. Ekspor QuickBooks pada halaman batch membangun CSV journal-entry dari `donations` + `fundDonations` batch (debit Undeposited Funds, satu kredit per dana). Tampilan Lapsed Givers pada halaman Summary menjalankan `Api/reports/lapsedGivers.json` melalui report runner generik dengan nama orang yang diselesaikan oleh `ReportOutput`. Format kwitansi negara (Kanada / Australia / Selandia Baru) adalah pengaturan gereja pada key/value store membership, yang di-render oleh `GivingStatementDocument` dan diduplikasi pada halaman cetak B1App. Halaman cetak laporan B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) meneruskan pengaturan `logoLight` gereja (melalui `usePrintLogo` di `B1Admin/src/components/PrintChurchHeader.tsx`) agar logo tercetak di bagian atas setiap laporan, dan menunggu gambar dimuat sebelum mencetak otomatis.

### Status batch dan izin Masukkan Donasi

Batch dapat ditutup agar deposit yang sudah dihitung tetap seperti semula. `POST /giving/donationbatches/:id/close` dan `/:id/reopen` (hanya Donations.Edit) adalah satu-satunya penulis `status`, `closedDate`, dan `closedBy` (`DonationBatchRepo.setStatus`). Penyimpanan batch biasa tidak pernah menyentuhnya, sehingga memposting batch tidak akan membuka kembali batch yang sudah ditutup. Akses tulis dipusatkan di `Api/src/modules/giving/helpers/BatchAccessHelper.ts`. Donations.Edit dapat mengubah apa saja. Izin Donations.Enter yang lebih terbatas (`GivingApi` / `Donations` / `Enter`, "Masukkan Donasi" di editor peran) dapat membuat batch serta menyimpan atau menghapus donasi dan pembagian dana hanya selama batch donasi saat ini dan batch tujuan sama-sama terbuka. Izin ini tidak pernah berlaku untuk hadiah gateway (yang memiliki `transactionId`). Penulisan yang diblokir mengembalikan `403 { error: "This batch is closed." }`. Membaca batch menerima Donations.ViewSummary atau Donations.Enter agar petugas penghitung dapat memilih batch tempat mereka memasukkan data. Di sisi klien, `B1Admin/src/donations/batchAccess.ts` mencerminkan aturan ini (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`). `Header` dan `SecondaryMenuHelper` menampilkan **Donations > Batches** kepada siapa pun yang dapat melihat batch, meskipun tanpa View Summary.

### Konversi total campuran mata uang

Setiap endpoint yang mengembalikan satu total gabungan dari hadiah yang mungkin campuran mata uang (KPI ringkasan pemberian `GivingKpiCards`, total batch donasi, total dana, dan total periode/tahun berjalan pada layar donasi B1App) melakukan konversi ke mata uang default gereja di sisi server, bukan menjumlahkan mata uang yang berbeda. `Api/src/shared/helpers/ExchangeRateHelper.ts` mengambil kurs dari `api.frankfurter.dev` dengan kunci mata uang gereja, menyimpannya dalam cache di proses selama 12 jam, dan menyediakan `convertTotals(rows, churchCurrency, rates)`. Baris dikelompokkan per mata uang di SQL (beberapa grup saja, bukan konversi per hadiah). Setiap grup dikonversi dan dijumlahkan. Hasilnya membawa flag `isConverted` yang digunakan klien untuk menampilkan catatan "Dikonversi dengan kurs terkini". `GET /donations/exchange-rates` menyediakan tabel kurs bagi klien yang membutuhkannya (layar donasi B1App). Kursnya sendiri tidak pernah diterima dari request, hanya diambil di sisi server, sehingga klien tidak dapat memengaruhi total yang dilaporkan. Catatan donasi individual dan laporan historis/mata uang asli tidak pernah dikonversi. Hanya total gabungan yang dikonversi.

Impor Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) mengisi hadiah yang dibuat di luar B1. Halaman ini memanggil `POST /giving/donate/replay-stripe-events` dengan `dryRun: true` untuk pratinjau, lalu `dryRun: false` untuk mengimpor. Server mencacah event Stripe untuk rentang tanggal dan melewati apa pun yang sudah tercatat. Pencocokan dilakukan pertama dengan provider id `eventLogs`, lalu dengan transaction id, lalu dengan `DonationRepo.findMatchingDonation` (jumlah + tanggal + orang) sehingga menjalankan ulang tidak pernah mengimpor dua kali. Event `charge.succeeded` / `payment_intent.succeeded` pada langganan dilewati karena `invoice.paid` sudah mencatat hadiah tersebut. Versi API Stripe yang lebih baru tidak lagi menyertakan `PaymentIntent.invoice`, sehingga pelewatan juga bergantung pada deskripsi "Subscription …".

## Webhook dan rekonsiliasi

Pembayaran yang sudah diselesaikan dan perubahan status langganan tiba di `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Pemrosesannya dirancang agar idempoten:

1. **Verifikasi**: `GatewayService.verifyWebhook` mendelegasikan ke pemeriksaan tanda tangan penyedia. Tanda tangan yang gagal mengembalikan 401. Event yang tidak perlu diproses langsung dikembalikan dengan 200.
2. **Deduplikasi event**: `EventLogRepo.loadByProviderId` melewati webhook yang sudah tercatat di `eventLogs`.
3. **Deduplikasi donasi**: sebelum membuat apa pun, `DonationRepo.loadByTransactionId` diperiksa terhadap setiap kandidat id yang mungkin dibawa payload. Ini menangani pengiriman ganda, event ACH multi-tahap (pending → settled), dan kasus ketika `/donate/charge` sudah mencatat hadiah secara optimistis.
4. **Penerapan**: `classifyWebhookEvent(eventType)` milik penyedia menentukan arti event (`donation` pending/complete, `cancel-subscription`, atau `ignore`). Pembayaran yang selesai membuat donasi `complete` (atau mempromosikan donasi `pending` atau `failed` yang sudah ada). Event bergaya ACH masuk sebagai `pending` hingga diselesaikan. Invoice langganan yang gagal (`invoice.payment_failed` Stripe) membuat donasi `failed` yang dikunci pada id invoice. Event pembatalan menghapus baris `subscriptions` lokal. Controller tidak pernah memeriksa nama event khusus penyedia.

### Hadiah berulang yang gagal dan dunning

Donasi `failed` adalah unit kerja untuk pemulihan. `GET /giving/donations/failed` mencantumkannya beserta pesan kegagalan gateway terbaru dari `eventLogs` dan flag `canRetry` dari capabilities gateway. `POST /giving/donate/retry/:donationId` memanggil `retryFailedPayment` milik penyedia (Stripe membayar invoice yang terbuka), dan webhook yang dihasilkan mempromosikan baris menjadi `complete` melalui jalur deduplikasi normal. Email dunning dikirim ke donatur oleh handler webhook pada hari ke-0, lalu oleh `DunningHelper.run` pada timer tengah malam (terpasang di `lambda/timer-handler.ts` dan `RailwayCron.ts`) pada hari ke-3 dan ke-7. Setiap pengiriman dicatat di `eventLogs` sebagai `provider: "dunning"`, `providerId: "<donationId>:<day>"`, sehingga menjalankan ulang tidak pernah mengirim email dua kali. Ketika Stripe menyerah dan membatalkan langganan (`customer.subscription.deleted` dengan `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` mengirim email kepada donatur satu kali (`providerId: "<subscriptionId>:canceled"`). Pembatalan oleh donatur atau admin tidak menghasilkan notifikasi. Stripe tidak pernah menambahkan event ke endpoint yang sudah ada. Setelah mengubah `StripeHelper.webhookEvents`, simpan ulang gateway atau jalankan `tools/manual/stripe-webhook-events.ts` (dry run secara default, `--apply` untuk menulis) terhadap produksi.

Penyedia dengan `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) mencatat charge dari respons `/charge` (tidak perlu perjalanan webhook untuk jalur normal). Stripe mengandalkan `payment_intent.succeeded` / `invoice.paid` dan ACH `payment_intent.processing`. Penanganan biaya (`POST /giving/donate/fee`, flag gateway `payFees`, dan `calculateFees` setiap penyedia) menghitung penambahan "tutup biaya" di sisi donatur. B1 tidak mengambil potongan platform, sehingga tidak ada application fee yang pernah ditambahkan.

:::info
Jalur charge dan webhook menulis baris `donations` / `fundDonations` yang sama. `transactionId` adalah kunci penghubung yang mencegah catatan charge optimistis dan webhook berikutnya menghasilkan dua donasi untuk satu hadiah.
:::

## Halaman Terkait

- [Endpoint Giving](../api/endpoints/giving.md): permukaan REST lengkap untuk donasi, dana, batch, gateway, langganan, metode pembayaran, dan webhook
- [AppHelper](../shared-libraries/app-helper.md): paket npm yang menyediakan registri penyedia pembayaran dan komponen donasi
- [Struktur Modul](../api/module-structure.md): cara modul GivingApi diorganisasi di sisi server
