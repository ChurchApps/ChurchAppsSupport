---
title: "Pengaturan Pemberian Online"
description: "Hubungkan Stripe, PayPal, Kingdom Funding, atau Paystack ke B1 Admin agar anggota bisa memberi online lewat situs B1.church dan catatannya tersinkron."
---

# Pengaturan Pemberian Online

<div class="article-intro">

B1 Admin terintegrasi dengan **Stripe**, **PayPal**, **Kingdom Funding**, dan **Paystack** (untuk gereja-gereja di Afrika) sehingga jemaat Anda dapat memberi secara daring melalui situs B1.church Anda. Setelah dikonfigurasi, donasi daring akan otomatis muncul di catatan donasi Anda bersama dengan persembahan yang dimasukkan secara manual, sehingga semuanya tetap berada dalam satu sistem.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Siapkan [dana donasi](funds.md) Anda agar donatur dapat menentukan tujuan pemberiannya
- Buat akun Stripe di [stripe.com](https://stripe.com) dan aktifkan (keluarkan dari mode uji)
- Siapkan kredensial login B1 Admin Anda

</div>

## Menyiapkan Stripe

1. Buat akun di [stripe.com](https://stripe.com) jika Anda belum memilikinya. Pastikan untuk **mengaktifkan akun Anda** dan mengeluarkannya dari mode uji.
2. Di Stripe, buka **Developers > API Keys**.
3. Salin **Publishable Key** Anda.
4. Masuk ke [B1 Admin](https://admin.b1.church/).
5. Buka **Settings** dan buka bagian **Giving**.
6. Klik **Edit** pada bagian **Giving**.
7. Atur **Provider** ke **Stripe**.
8. Tempelkan Publishable Key Anda ke kolom **Public Key**.
9. Kembali ke Stripe dan tampilkan **Secret Key** Anda (kunci ini hanya dapat dilihat satu kali, jadi simpan cadangannya).
10. Tempelkan Secret Key ke kolom **Secret Key** lalu klik **Save**.

:::warning
Secret Key Stripe Anda hanya ditampilkan satu kali. Salin ke lokasi yang aman sebelum meninggalkan dasbor Stripe. Jika Anda kehilangan kunci ini, Anda harus membuat kunci baru.
:::

## Memilih Mata Uang Anda

Setelah memilih Stripe sebagai provider, dropdown **Currency** akan muncul di samping API key Anda. Pilih mata uang yang sesuai dengan mata uang penyelesaian (settlement) akun Stripe Anda agar donasi ditagihkan dengan benar.

Mata uang yang didukung meliputi USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, dan BRL. Anda dapat memastikan atau mengubah mata uang default akun Anda di [Dasbor Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
Mata uang yang Anda pilih di sini digunakan untuk donasi sekali, langganan berulang, perhitungan biaya, dan laporan donasi. Jika Anda mengganti mata uang nanti, hanya donasi dan langganan baru yang akan menggunakan mata uang baru—pemberian berulang yang sudah ada tetap menggunakan mata uang saat pemberian itu dibuat.
:::

:::warning
Pastikan akun Stripe Anda dikonfigurasi untuk menerima mata uang yang Anda pilih. Jika akun Stripe Anda tidak mendukung mata uang yang dipilih, donasi akan gagal saat checkout.
:::

## Apple Pay dan Google Pay

Gereja yang menggunakan Stripe akan otomatis mendapatkan tombol Apple Pay dan Google Pay di halaman pemberian publik. Tombol ini muncul di atas kolom kartu untuk pemberian sekali setelah donatur memilih dana dan jumlah, serta hanya jika peramban atau perangkat donatur sudah memiliki dompet digital yang disiapkan. Pemberian berulang tetap menggunakan kolom kartu atau bank.

Google Pay tidak memerlukan pengaturan. Apple Pay mengharuskan domain halaman pemberian Anda didaftarkan di Stripe; B1 akan mendaftarkannya saat halaman pemberian pertama kali dimuat di domain Anda. Jika tombol Apple Pay tidak muncul di iPhone, periksa **Settings > Payment method domains** di Dasbor Stripe Anda dan pastikan domain `yoursubdomain.b1.church` (atau domain kustom) Anda tercantum dan telah diverifikasi.

## Pemberian Anonim

Donatur di halaman pemberian publik dapat mencentang **Give anonymously**. Pemberian anonim dicatat tanpa donatur yang terkait, tetap masuk ke dana yang dipilih donatur, dan ditampilkan sebagai **Anonymous** di batch dan laporan Anda. Email donatur tetap diperlukan agar tanda terima dapat dikirim, tetapi tidak ada data orang yang dibuat. Pemberian anonim hanya untuk sekali, dan tidak muncul di laporan pemberian apa pun.

## Pemberian Berulang yang Gagal

Ketika pemberian berulang di Stripe gagal (misalnya kartu kedaluwarsa atau ditolak), tagihan yang gagal akan muncul di **Donations > Failed Gifts** beserta donatur, jumlah, tanggal, dan alasan yang diberikan oleh gateway. Klik **Retry** untuk mencoba menagih kembali setelah donatur memperbarui metode pembayarannya.

B1 juga mengirim email kepada donatur ketika tagihan gagal, dan kembali tiga dan tujuh hari kemudian jika masih belum berhasil, dengan tautan untuk memperbarui metode pembayaran mereka di B1.church.

:::info
Jika gereja Anda menyiapkan Stripe sebelum fitur ini ada, buka **Settings** > **Giving**, klik edit, lalu klik **Save** satu kali. Ini akan menyegarkan webhook Stripe sehingga tagihan yang gagal dilaporkan ke B1.
:::

## Menambahkan Halaman Donasi ke Situs B1.church Anda

1. Buka [b1.church](https://b1.church/) dan masuk.
2. Klik ikon **Settings**.
3. Klik **Add Tab**.
4. Pilih **Donation** sebagai jenisnya.
5. Masukkan nama untuk tab (misalnya "Give") lalu klik **Save**.
6. Opsional, ubah ikon tab—ketik "Giv" di pencarian ikon untuk ikon yang berkaitan dengan pemberian.

Halaman donasi Anda sekarang sudah aktif. Jemaat dapat mengunjunginya di `yoursubdomain.b1.church/donate`.

## Membagikan Tautan Pemberian Anda

Untuk menemukan URL pemberian Anda, buka **B1 Admin** dan klik ikon **Settings** untuk melihat subdomain Anda. Tautan donasi Anda mengikuti format berikut:

`https://yoursubdomain.b1.church/donate`

Bagikan tautan ini di situs web Anda, dalam email, atau di buletin Anda agar jemaat tahu di mana mereka dapat memberi secara daring.

### Tautan dengan Dana dan Jumlah yang Sudah Ditentukan

Untuk mengarahkan donatur langsung ke dana tertentu, buka **Donations > Funds** dan klik **Giving Link** pada dana tersebut. Secara opsional, masukkan jumlah, lalu salin tautannya. Dialog juga menampilkan kode QR untuk tautan yang sama; klik **Download PNG** untuk menyimpannya guna buletin, slide, atau poster. Ketika donatur membuka tautan atau memindai kode, dana dan jumlah sudah dipilih di halaman pemberian. Tautan memiliki bentuk berikut:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Parameter yang sama juga berfungsi pada elemen **Donate Link** di website builder.

## Notifikasi Donasi

Stripe mengirim notifikasi email setiap kali donasi diterima. Untuk mengubah alamat email notifikasi, buka dasbor Stripe, klik profil Anda di kanan atas, pilih **Profile**, lalu perbarui alamat email Anda.

## Opsi Biaya Pemrosesan

Anda dapat mengonfigurasi halaman pemberian Anda agar donatur dapat memilih untuk menanggung biaya pemrosesan sehingga gereja Anda menerima jumlah donasi penuh. Pengaturan ini dikelola di pengaturan gereja Anda dalam B1 Admin.

:::tip
Setelah pengaturan selesai, lakukan donasi uji coba kecil untuk memastikan semuanya berfungsi sebelum mengumumkan pemberian daring kepada jemaat Anda.
:::

## Menyiapkan Kingdom Funding

Kingdom Funding adalah prosesor pembayaran Kristen yang mendukung kartu kredit/debit dan transfer bank ACH. Jika gereja Anda terdaftar di Kingdom Funding, Anda dapat menghubungkannya sebagai gateway pemberian Anda.

:::info
Integrasi Kingdom Funding saat ini masih dalam beta. Hubungi perwakilan akun B1 Anda untuk mengaktifkannya bagi gereja Anda.
:::

1. Daftar atau masuk di [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Dapatkan **Security Key** (publik) dan **Private Key** Anda dari portal merchant Kingdom Funding.
3. Di B1 Admin, buka **Settings**, buka bagian **Giving**, dan klik edit.
4. Atur **Provider** ke **Kingdom Funding**.
5. Tempelkan Security Key Anda ke kolom **Security Key** dan Private Key Anda ke kolom **Private Key**.
6. Atur **Webhook Key** yang Anda terima dari Kingdom Funding, lalu salin URL webhook yang ditampilkan ke pengaturan merchant Kingdom Funding Anda agar Kingdom Funding dapat memberi tahu B1 tentang transaksi yang selesai.
7. Simpan.

Setelah terhubung, jemaat akan melihat sakelar kartu/bank di halaman donasi dan dapat memberi melalui kartu kredit atau transfer ACH.

## Tombol PayPal dan Venmo

Gereja yang menggunakan **PayPal** sebagai provider akan mendapatkan tombol **PayPal** dan **Venmo** di atas kolom kartu di halaman pemberian untuk pemberian sekali. Donatur yang mengklik salah satu tombol akan menyelesaikan pembayaran di jendela PayPal, dan pemberian tersebut dicatat seperti donasi daring lainnya. Venmo hanya muncul bagi donatur di Amerika Serikat pada perangkat yang dianggap memenuhi syarat oleh PayPal. Pemberian berulang tetap menggunakan kolom kartu.

## Menyiapkan Paystack (Afrika)

Stripe tidak membuka akun untuk gereja di Ghana, Nigeria, Kenya, Afrika Selatan, atau Pantai Gading. [Paystack](https://paystack.com) membukanya, dan menerima kartu lokal, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transfer bank, dan USSD. Donatur membayar dalam mata uang lokal Anda (GHS, NGN, KES, ZAR, XOF).

1. Daftar di [paystack.com](https://paystack.com) dengan sertifikat pendaftaran usaha gereja dan rekening bank lokal Anda, lalu selesaikan proses aktivasi (go-live) Paystack.
2. Di Dasbor Paystack, buka **Settings → API Keys & Webhooks** dan salin **Public Key** dan **Secret Key** (gunakan kunci live, bukan kunci uji).
3. Di B1 Admin, buka **Settings**, buka bagian **Giving**, dan klik edit.
4. Atur **Provider** ke **Paystack**, tempelkan Public Key dan Secret Key, lalu pilih **Currency** Anda.
5. Salin **webhook URL** yang ditampilkan di bawah provider, kembali ke Dasbor Paystack (**Settings → API Keys & Webhooks**), dan tempelkan ke kolom **Webhook URL**. Dengan cara inilah pemberian berulang dan pembayaran mobile money dicatat.
6. Simpan.

Donatur menyelesaikan pembayaran mereka di jendela Paystack yang aman dan dapat memilih kartu, mobile money, atau transfer bank di sana. Catatan:

- **Pemberian berulang** memerlukan kartu; mobile money tidak dapat ditagih secara otomatis, sehingga Paystack hanya mengizinkan pemberian mobile money sekali.
- Pemberian berulang Paystack dapat dibatalkan dari B1 tetapi tidak dapat dijeda atau diubah—batalkan dan buat yang baru untuk mengubah jumlahnya.
- Default **Processing Fee** mencerminkan tarif kartu lokal Paystack untuk mata uang Anda; ubah jika tarif yang Anda sepakati berbeda.

## Langkah Berikutnya

- Gunakan [Stripe Import](stripe-import.md) untuk menarik transaksi daring ke B1 Admin jika tidak tersinkronisasi secara otomatis
- Periksa [Laporan Donasi](donation-reports.md) Anda untuk memastikan donasi daring muncul dengan benar
- Buat [Laporan Pemberian](giving-statements.md) yang mencakup donasi daring dan luring
