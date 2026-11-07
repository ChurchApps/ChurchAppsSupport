---
title: "Self-Hosting on Railway"
---

# Self-Hosting on Railway

<div class="article-intro">

ChurchApps menerbitkan templat [Railway](https://railway.com) sekali klik yang memberi gereja Anda instans pribadinya sendiri dari B1 Admin, portal anggota B1, API, dan basis data MySQL — semuanya berjalan di infrastruktur yang Anda miliki dan bayar langsung. Panduan ini akan membantu Anda online dalam sekitar 15 menit, lalu membahas konfigurasi pascadeploy yang biasanya ingin dilakukan oleh sebagian besar gereja.

</div>

## Mulai Cepat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klik tombol **Deploy on Railway** di atas.
2. Masuk ke Railway (atau buat akun gratis) dan tambahkan metode pembayaran.
3. Klik **Deploy** tanpa mengubah apa pun — setiap variabel sudah memiliki nilai default yang wajar.
4. Tunggu 5–10 menit hingga keempat layanan berstatus hijau.
5. Buka URL layanan **B1Admin**, klik **Register**, lalu buat akun Anda. Akun pertama otomatis menjadi admin server.
6. Ikuti petunjuk di aplikasi untuk membuat gereja pertama Anda.

Selesai. Anda sekarang memiliki instans ChurchApps yang berfungsi penuh. Semua bagian di bawah ini bersifat opsional untuk penyempurnaan.

:::tip
Deploy ini saat ini berstatus **beta**. Jika Anda menemukan sesuatu yang tidak tercakup dalam dokumentasi, silakan buka isu di [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) dengan melampirkan log deploy.
:::

<div class="prereqs">
<h4>Yang Anda Butuhkan</h4>

- Akun [Railway](https://railway.com) gratis
- Kartu kredit yang terdaftar di Railway (~$15–25/bulan untuk jemaat kecil; lihat [Biaya](#costs))
- Sekitar 15 menit untuk deploy awal
- *Opsional tetapi sangat disarankan nanti:* kredensial SMTP dan domain kustom

</div>

## Yang Di-deploy

Templat ini menyediakan empat layanan dalam satu proyek Railway:

| Layanan | Fungsi | URL setelah deploy |
|---------|--------|--------------------|
| **MySQL** | Menyimpan semua data (satu instans, banyak skema) | hanya internal |
| **Api** | Backend untuk keanggotaan, konten, pemberian, kehadiran, dll. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Aplikasi web untuk staf/admin | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Aplikasi web untuk anggota dan situs web gereja | `https://b1app-<id>.up.railway.app` |

Skema basis data dibuat secara otomatis saat pertama kali dijalankan oleh migrasi startup API.

## Konfigurasi Awal

Sekarang setelah layanan berjalan, berikut hal-hal yang paling sering diatur gereja selanjutnya, urutannya kurang lebih berdasarkan prioritas.

### 1. Email (Sangat Disarankan)

Tanpa email, anggota tetap bisa mendaftar dan menggunakan sistem, tetapi **mereka tidak bisa mengatur ulang kata sandi yang terlupa** — admin harus melakukannya untuk mereka. Menyiapkan SMTP membutuhkan sekitar 5 menit.

Di dasbor Railway, buka layanan **Api** → **Variables**, lalu tambahkan:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<host penyedia Anda>
SMTP_USER=<nama pengguna Anda>
SMTP_PASS=<kata sandi atau kunci API Anda>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Ada tiga penyedia yang layak Anda ketahui:

#### Resend — opsi gratis paling sederhana (100 email/hari)

1. Daftar di [resend.com](https://resend.com).
2. Verifikasi domain pengirim (atau gunakan pengirim uji `onboarding@resend.dev` untuk memulai).
3. Buat kunci API.
4. Atur `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratis untuk penggunaan pribadi (~500/hari)

1. Aktifkan autentikasi 2 langkah pada akun Google.
2. Buat [App Password](https://myaccount.google.com/apppasswords).
3. Atur `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=alamat-anda@gmail.com`, `SMTP_PASS=<app password 16 karakter>`.

#### AWS SES — paling murah untuk skala besar

1. Verifikasi domain pengirim di AWS.
2. Keluar dari sandbox SES jika Anda akan mengirim ke alamat yang belum terverifikasi.
3. Buat kredensial SMTP di **SES → SMTP Settings → Create credentials**.
4. Atur `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<kata sandi SMTP SES>`.

Setelah variabel disimpan, layanan Api akan di-deploy ulang secara otomatis. Uji dengan memicu pengaturan ulang kata sandi pada akun percobaan.

:::warning
Jika Anda mengatur `MAIL_SYSTEM=SMTP` dengan kredensial yang salah, pendaftaran akan tampak berhasil tetapi email verifikasi tidak pernah sampai. Perbaiki kredensialnya atau hapus `MAIL_SYSTEM` agar kembali ke mode tanpa email.
:::

### 2. Domain Kustom

URL default `*.up.railway.app` sudah berfungsi, tetapi kebanyakan gereja ingin menggunakan domain sendiri.

Untuk setiap layanan web (B1Admin dan B1App):

1. Buka layanan di Railway → **Settings** → **Networking**.
2. Klik **+ Custom Domain** dan masukkan nama host:
   - `admin.yourchurch.org` untuk B1Admin
   - `app.yourchurch.org` (atau `www`) untuk B1App
3. Tambahkan rekaman CNAME yang ditampilkan Railway ke penyedia DNS Anda.
4. Tunggu beberapa menit hingga DNS menyebar. Railway akan menyediakan sertifikat TLS secara otomatis.

Kemudian perbarui variabel layanan **Api** agar tautan di email menggunakan domain baru:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Dan pada layanan **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (jika Anda juga mengatur domain API kustom)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Token `{subdomain}` ini bersifat harfiah — token tersebut akan diganti saat runtime dengan subdomain setiap gereja (lihat Multi-Situs di bawah).

### 3. Multi-Situs (Banyak Gereja dalam Satu Instans)

ChurchApps dirancang dengan arsitektur multi-penyewa — satu deployment dapat menampung berapa pun jumlah gereja, masing-masing dengan jemaat, kelompok, dan situs webnya sendiri. Gereja baru ditambahkan sepenuhnya melalui antarmuka admin; tidak perlu perubahan infrastruktur.

#### Menambahkan gereja lain

1. Di **B1 Admin**, buka **Settings → Manage Church → Switch Church → Create New**.
2. Setiap gereja memiliki **slug subdomain** yang unik (misalnya `firstchurch`, `gracecommunity`).
3. Gereja baru mendapatkan data, anggota, situs web, dan pengaturan pemberian sendiri, sepenuhnya terpisah dari gereja lain dalam instans yang sama.

#### Mengarahkan setiap gereja ke URL-nya sendiri

Ada dua cara untuk mempublikasikan gereja:

| Pola | Contoh | Pengaturan |
|------|--------|------------|
| **Berbasis path** (langsung berfungsi) | `app.yourchurch.org/firstchurch` | Tidak perlu pengaturan tambahan |
| **Berbasis subdomain** (URL lebih rapi) | `firstchurch.yourchurch.org` | DNS wildcard + domain kustom wildcard |

Untuk perutean **berbasis subdomain** di Railway:

1. Di penyedia DNS Anda, buat CNAME wildcard: `*.yourchurch.org → <target railway b1app>`.
2. Di Railway, pada layanan B1App → **Settings → Networking**, tambahkan `*.yourchurch.org` sebagai domain kustom.
3. Pada layanan **B1Admin**, atur `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Setelah di-deploy ulang, situs setiap gereja akan otomatis dilayani di `<subdomain-mereka>.yourchurch.org`.

:::info
Domain kustom wildcard memerlukan paket Railway berbayar. Perutean berbasis path berfungsi di semua paket dan secara fungsional identik — hanya kurang rapi di bilah URL.
:::

### 4. Pemberian Online (Stripe / PayPal)

Pemberian diatur **per gereja di dalam antarmuka admin**, bukan melalui variabel lingkungan — dengan begitu setiap gereja dapat menggunakan akun merchant-nya sendiri.

1. Dapatkan kredensial pengembang dari [Stripe](https://dashboard.stripe.com/) (Developers → API keys) atau [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Di B1 Admin, buka **Settings → Giving Settings**.
3. Pilih penyedia Anda, tempelkan kunci Public dan Secret, lalu atur penanganan biaya.
4. Opsional: tambahkan `GOOGLE_RECAPTCHA_SECRET_KEY` ke layanan **Api** di Railway untuk melindungi formulir donasi publik dari bot.

### 5. Penyimpanan File

Templat ini menyediakan **volume persisten 1 GB** yang terpasang pada layanan Api untuk foto anggota, file khotbah, dan dokumen yang diunggah.

Untuk memperbesarnya: buka layanan Api → **Volumes** → sesuaikan penggeser ukuran.

Untuk deployment yang lebih besar (100+ GB atau banyak unggahan bersamaan), beralihlah ke S3 dengan mengatur variabel berikut pada layanan **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<bucket Anda>
AWS_ACCESS_KEY_ID=<kunci>
AWS_SECRET_ACCESS_KEY=<rahasia>
AWS_REGION=us-east-2
```

File yang sudah ada di volume tidak otomatis dipindahkan — salin ke bucket sebelum mengubah variabel.

### 6. Integrasi Fitur Opsional

Integrasi ini membuka fitur tertentu dan semuanya dapat ditambahkan nanti melalui dasbor Railway. Atur pada layanan **Api**.

| Variabel | Fitur yang diaktifkan |
|----------|------------------------|
| `OPENAI_API_KEY` *atau* `OPENROUTER_API_KEY` | Pencarian dan saran konten berbantuan AI |
| `YOUTUBE_API_KEY` | Pencarian dan penyematan khotbah YouTube |
| `PEXELS_KEY` | Pemilih gambar stok untuk pembuat situs web |
| `VIMEO_TOKEN` | Dukungan khotbah Vimeo |
| `API_BIBLE_KEY` | Pencarian ayat Alkitab dalam pelajaran dan konten |
| `YOUVERSION_API_KEY` | Integrasi Alkitab YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Notifikasi push browser ([buat pasangan kunci VAPID](./docker#push-notifications)) |
| `HUBSPOT_KEY` | Sinkronisasi CRM opsional untuk pendaftaran baru |

## Pembaruan

Setiap layanan terhubung ke repositori GitHub masing-masing. Dorongan (push) ke `main` pada `ChurchApps/Api`, `ChurchApps/B1Admin`, atau `ChurchApps/B1App` akan memicu deploy ulang otomatis.

Untuk mengunci versi tertentu, ubah pengaturan **Branch** pada setiap layanan ke tag atau cabang rilis. Ini adalah pengaturan yang direkomendasikan untuk produksi — deploy otomatis dari `main` berarti Anda ikut menerima pekerjaan yang sedang berlangsung.

## Biaya

Kisaran biaya nyata untuk gereja kecil (di bawah 200 anggota, lalu lintas ringan):

| Komponen | Perkiraan biaya bulanan |
|----------|-------------------------|
| Dasar Railway | $5 |
| Plugin MySQL | $5 + ~$1 penyimpanan |
| Komputasi 3 layanan web | $3–10 gabungan |
| Volume 1 GB | $0,25 |
| **Total** | **~$15–25/bulan** |

Biaya meningkat secara linear seiring lalu lintas, unggahan foto, dan ukuran basis data. Railway menampilkan penggunaan real-time di tab **Usage** proyek — atur batas pengeluaran di sana untuk membatasi risiko Anda.

## Pemecahan Masalah

| Gejala | Kemungkinan penyebab | Solusi |
|--------|----------------------|--------|
| Build gagal dengan `EBUSY: rmdir '/app/node_modules/.cache'` | Konflik mount cache Nixpacks | Atur `NIXPACKS_NO_CACHE=true` pada layanan yang terdampak |
| Build gagal pada B1Admin dengan `Missing: @types/...` | `package-lock.json` tidak sinkron | Tarik `main` terbaru |
| Deploy Api macet di "Deploying" | Healthcheck gagal — `/health` tidak mengembalikan 200 | Lihat log deploy; biasanya variabel lingkungan wajib yang belum diisi |
| B1Admin menampilkan "check your email" tetapi email tidak masuk | `MAIL_SYSTEM=SMTP` diatur tetapi kredensial hilang/salah | Perbaiki kredensial, atau hapus `MAIL_SYSTEM` untuk menonaktifkan email |
| Login mengarah ke `api.churchapps.org` | `REACT_APP_STAGE` bernilai `prod` | Atur `REACT_APP_STAGE=custom` pada layanan B1Admin |
| Gereja subdomain semuanya menampilkan konten yang sama | `REACT_APP_B1_WEBSITE_URL` tidak menyertakan token `{subdomain}` | Atur ke misalnya `https://{subdomain}.yourchurch.org` |
| Domain kustom menampilkan "Application not found" | DNS belum menyebar, atau sertifikat Railway masih tertunda | Tunggu 5 menit; periksa DNS dengan `dig admin.yourchurch.org` |

Jika Anda menemukan masalah yang tidak ada dalam daftar ini, buka isu di [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) dengan melampirkan log deploy.

## Artikel Terkait

- **[Self-Hosting dengan Docker](./docker)** — Tumpukan yang sama di perangkat keras atau VPS Anda sendiri
- **[Pengaturan Awal](../../getting-started/initial-setup)** — Langkah pertama setelah gereja Anda dibuat
- **[Pengaturan Awal Situs Web](../../b1-admin/website/initial-setup)** — Konfigurasi situs publik gereja Anda
- **[Pengaturan Pemberian](../../b1-admin/donations/online-giving-setup)** — Hubungkan Stripe atau PayPal
- **[Pengaturan API Lokal](../api/local-setup)** — Menjalankan tumpukan secara lokal untuk pengembangan
- **[Deployment API (AWS)](./apis)** — Cara SaaS resmi ChurchApps di-deploy
