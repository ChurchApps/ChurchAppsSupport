---
title: "Pengaturan Gereja"
description: "Atur nama, alamat, subdomain, zona waktu, format wilayah, penyedia SMS, dan penyimpanan file gereja Anda di halaman Pengaturan Gereja di B1 Admin."
---

# Pengaturan Gereja

<div class="article-intro">

Halaman Pengaturan Gereja adalah tempat Anda mengonfigurasi informasi dasar gereja, detail kontak, dan branding. Detail ini digunakan di seluruh alat ChurchApps, termasuk situs web B1.church Anda dan aplikasi B1 Mobile.

</div>

## Video Pelatihan

<YouTube id="634zSbzDkYA" title="Mengatur Info dan Branding Gereja di B1" next="Peran, Izin, dan Mengundang Tim Anda di B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan izin "Edit Church Settings". Lihat [Peran & Izin](./roles-permissions.md) jika Anda tidak memiliki akses.
- Siapkan alamat, informasi kontak, dan logo gereja Anda

</div>

## Mengedit Informasi Gereja Anda

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas), perluas **Settings**, lalu klik **Settings**.
2. Di bagian **Church Information** (di bagian atas halaman), klik **Edit**.
3. Perbarui salah satu kolom berikut:
   - **Church Name** -- Nama yang ditampilkan di semua produk ChurchApps.
   - **Address** -- Alamat fisik gereja Anda.
   - **Contact Information** -- Nomor telepon, email, dan detail kontak lainnya.
   - **Time Zone** -- Zona waktu gereja Anda. Lihat [Time Zone](#time-zone) di bawah.
4. Klik **Save** untuk menerapkan perubahan Anda.

## Mengatur Subdomain Anda

Gereja Anda mendapatkan subdomain gratis di **yourchurch.1.church**. Ini adalah alamat web tempat anggota dan pengunjung dapat mengakses kehadiran daring gereja Anda.

1. Di halaman Settings, klik **Edit** di bagian **Church Information** dan temukan kolom **Subdomain**.
2. Masukkan subdomain pilihan Anda (misalnya "gracechurch" untuk gracechurch.1.church).
3. Simpan perubahan Anda.

:::info
Subdomain Anda harus unik di semua gereja ChurchApps. Jika nama pilihan Anda sudah digunakan, coba tambahkan nama kota atau negara bagian Anda (misalnya "gracechurch-dallas").
:::

Jika Anda ingin pengunjung mengakses situs Anda melalui domain Anda sendiri (misalnya **`www.gracechurch.org`**), lihat [Domain Kustom](./custom-domain.md).

## Mengonfigurasi Branding

Sesuaikan tampilan gereja Anda di semua alat ChurchApps:

1. Unggah **logo gereja** Anda dengan mengklik area logo dan memilih file gambar.
2. Tambahkan **gambar gereja** tambahan yang digunakan di situs web dan [aplikasi seluler](./mobile-app.md) Anda.

:::tip
Untuk hasil terbaik, gunakan logo dengan latar belakang transparan dalam format PNG. Ini memastikan logo terlihat bagus di latar belakang terang maupun gelap.
:::

## Hari Pertama dalam Seminggu

Pilih hari kalender Anda dimulai. Dropdown **First Day of Week** di bagian Church Info secara default adalah **Sunday** (Minggu), tetapi dapat diatur ke hari apa pun. Setelah diubah, pengaturan ini diterapkan di kisi kalender di B1 Admin dan portal anggota B1.church. Kalender grup, kalender kurasi, dan editor acara semuanya menampilkan minggu dimulai pada hari yang Anda pilih.

## Zona Waktu

Dropdown **Time Zone** di bagian **Church Information** menetapkan zona waktu gereja Anda (misalnya *America/Chicago*). Pilih **None** untuk mengosongkannya. Setelah disimpan, zona tersebut muncul di ringkasan Church Information.

B1 menggunakan zona waktu ini untuk waktu di seluruh gereja, seperti pengingat acara dan jadwal di TV [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) Anda. [Jadwal check-in](../attendance/setup.md#setting-a-check-in-schedule) diukur berdasarkan zona waktu [kampus](./campuses.md) tempat layanan diadakan terlebih dahulu, dan hanya menggunakan zona waktu gereja jika kampus tersebut tidak memilikinya. Jika semua kampus Anda berada di satu zona waktu, atur zona waktu tersebut pada gereja maupun setiap kampus.

## Wilayah (Format Tanggal dan Telepon)

Pengaturan **Region** mengontrol cara tanggal dan waktu ditulis di seluruh B1. Secara default, tanggal menggunakan format Amerika Serikat (misalnya "Sep 28, 2026" dan "9/28/2026"). Gereja di luar AS dapat beralih ke format mereka sendiri. Misalnya, memilih English (United Kingdom) menampilkan "28 Sept 2026" dan "28/09/2026" sebagai gantinya.

1. Di halaman Settings, klik **Region** di daftar sebelah kiri, lalu klik **Edit** di bagian **Region**.
2. Pilih wilayah Anda dari dropdown **Region**. Setiap opsi menampilkan contoh tanggal agar Anda dapat melihat dengan jelas bagaimana tanggal akan tampil.
3. Klik **Save**.

Bagian Region kemudian menampilkan wilayah yang Anda pilih, contoh **Date format**, dan format **Phone numbers** Anda.

### Format Nomor Telepon

Bagian Region yang sama memiliki pengaturan **Phone numbers** yang mengontrol cara nomor telepon dimasukkan pada catatan seseorang:

- **International (with country code)** -- default. Kolom telepon menampilkan pemilih bendera negara dan menyimpan nomor dengan kode negara (misalnya +1 918 555 1234).
- **Local (as typed)** -- kolom telepon menjadi kotak teks biasa dan menyimpan nomor persis seperti yang Anda ketik, tanpa menambahkan kode negara (misalnya 0701 234 5678). Pilih ini jika gereja Anda menulis nomor dalam format lokal dan tidak ingin B1 menambahkan kode negara.

Saat **Local** dipilih, bagian Region juga menampilkan "Local phone numbers" di samping wilayah Anda.

:::tip
Pengiriman SMS paling baik jika nomor menyertakan kode negara. Jika Anda mengirim SMS dari B1, gunakan format **International**, atau pastikan nomor yang Anda ketik dalam mode Local menyertakan kode negara.
:::

Wilayah Anda berlaku untuk tanggal dan waktu di B1 Admin serta di situs web B1.church dan portal anggota Anda, termasuk khotbah, postingan blog, kalender grup, dan rencana pelayanan. Dengan demikian, anggota melihat tanggal dengan format yang sama seperti staf Anda.

## Pengiriman SMS {#texting}

Hubungkan penyedia SMS untuk mengirim pesan SMS kepada seseorang atau seluruh grup dari B1 Admin. Pesan dikirim melalui akun Anda sendiri dengan penyedia tersebut, sehingga harga dan batasan mereka berlaku.

1. Di halaman Settings, klik **Texting** di daftar sebelah kiri, lalu klik **Edit** di bagian **Texting**.
2. Pilih **Provider**:
   - **Clearstream** -- masukkan **API Key**. Buat kunci di Clearstream Account Settings di bawah API Keys.
   - **Text In Church** -- masukkan **API Key**. Minta akses API pengembang kepada Text In Church Support terlebih dahulu, lalu buat kunci di bagian Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- masukkan kunci autentikasi dari akun Nalo Solutions Anda sebagai **API Key**, dan **Sender ID** (hingga 11 karakter) yang telah disetujui Nalo untuk Anda.
   - **Twilio** -- gunakan akun Twilio milik gereja Anda sendiri; Twilio menagih Anda secara langsung. Salin **Account SID** dan **Auth Token** dari [Twilio Console](https://console.twilio.com), lalu masukkan **From Number**, yaitu nomor telepon Twilio yang terdaftar untuk A2P 10DLC, dengan format seperti `+15551234567`. Setelah menyimpan, tempelkan URL webhook masuk (lihat di bawah) ke webhook **A message comes in** pada nomor tersebut di Twilio agar balasan STOP juga tercatat di B1.
3. Klik **Save**.

Untuk berhenti menggunakan pengiriman SMS, atur **Provider** ke **None** lalu simpan. Ini akan menghapus penyedia yang tersimpan.

### Menghentikan Penerimaan Pesan bagi Orang yang Membalas STOP

Setelah penyedia disimpan, buka kembali bagian Texting dengan **Edit**. Di bawah pengaturan penyedia, kolom **Inbound (STOP) webhook URL** hanya-baca menampilkan alamat web yang unik untuk gereja Anda. Klik kolom tersebut untuk memilih alamat, salin, lalu tempelkan ke pengaturan webhook pesan masuk (balasan) di penyedia SMS Anda. Ini berfungsi dengan penyedia di atas yang dapat meneruskan balasan masuk ke webhook.

Setelah itu, ketika seseorang membalas **STOP** (atau STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, atau REVOKE) pada pesan Anda, B1 akan mencari semua orang dengan nomor ponsel yang cocok, menandai mereka sebagai berhenti berlangganan, dan menonaktifkan pengingat SMS mereka. Mereka kemudian dilewati dari pesan grup. Balasan lain diabaikan.

:::info
Ini menggunakan pengaturan berhenti berlangganan yang sama dengan **Hide me from the member directory**, sehingga orang yang membalas STOP juga ditampilkan sebagai **Hidden from directory** di profil mereka. Kolom ini hanya muncul saat penyedia yang disimpan dipilih. Jika Anda mengganti dropdown ke penyedia lain, simpan terlebih dahulu untuk melihat URL lagi.
:::

Setelah penyedia terhubung, staf yang memiliki izin mengirim pesan akan melihat tombol **Text** di halaman grup (**Text this group**) dan halaman seseorang yang memiliki ponsel (**Send text message**). Ketik pesan Anda dan klik **Send**. Dialog menghitung karakter dan segmen SMS. Untuk grup, dialog menampilkan berapa banyak anggota yang akan menerima pesan sebelum Anda mengirim:

- Anggota tanpa nomor ponsel di catatan akan dilewati.
- Anggota yang memilih **Hide me from the member directory** dihitung sebagai berhenti berlangganan dan dilewati.
- Anggota keluarga yang berbagi nomor ponsel hanya menerima pesan sekali.

### Mempersonalisasi Pesan dengan Kolom Gabungan {#personalizing-texts-with-merge-fields}

Di bawah kotak pesan, dialog Text menampilkan chip placeholder: **First Name**, **Last Name**, **Display Name**, dan **Church Name**. Klik chip untuk menyisipkan placeholder-nya (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, atau `{{churchName}}`) di posisi kursor Anda. Saat pesan dikirim, setiap placeholder diganti dengan detail penerima tersebut. Dengan demikian, pesan grup seperti `Hi {{firstName}}, see you Sunday!` sampai ke setiap anggota dengan nama mereka sendiri. Placeholder berfungsi untuk pesan grup maupun pesan kepada satu orang. Pesan ke grup juga menyediakan chip **Group Name** (`{{groupName}}`), yang diganti dengan nama grup.

Untuk menggunakan ulang pesan, simpan sebagai [templat teks](./email-templates.md#text-templates) (templat email dengan kategori **Text**), lalu pilih dari **Load Template (optional)** di bagian atas jendela Text.

:::info
Batas 1.600 karakter berlaku untuk pesan saat Anda mengetiknya. Setelah placeholder diisi, teks apa pun yang lebih dari 1.600 karakter akan dipotong pada panjang tersebut.
:::

Pesan juga dapat dikirim secara otomatis dari langkah [alur kerja](../serving/workflows.md#sending-a-text) dengan aksi **Send Text**, yang menggunakan penyedia dan placeholder yang sama.

## Penyimpanan File

Secara default, file yang Anda unggah ke situs web (melalui [Files](../website/files.md)) dan area konten lainnya menggunakan penyimpanan hosting gratis B1, hingga 100MB. Jika Anda memerlukan ruang lebih, Anda dapat menghubungkan penyimpanan cloud Anda sendiri. Unggahan baru kemudian langsung masuk ke akun Anda tanpa batas platform.

1. Di halaman Settings, klik **File Storage** di daftar sebelah kiri, lalu klik **Edit** di bagian **File Storage**.
2. Pilih penyedia: **Google Drive**, **Dropbox**, **OneDrive**, atau **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, dll.).
3. Untuk Google Drive, Dropbox, atau OneDrive, klik **Connect** dan masuk untuk memberikan izin akses. Untuk bucket S3-compatible, masukkan access key, secret, nama bucket, dan base URL publik Anda.
4. Klik **Save**.

:::info
Ini hanya memengaruhi unggahan baru ke Files situs web Anda dan area konten serupa. Gambar galeri, thumbnail, logo, dan foto orang selalu tetap di penyimpanan default B1.
:::

## Kenaikan Kelas

Jika Anda mencatat **Grade** untuk anak-anak dan siswa, B1 dapat secara otomatis menaikkan kelas semua orang pada tanggal yang Anda pilih (misalnya 1 Agustus), sehingga Anda tidak perlu mengedit setiap profil secara manual.

1. Di halaman Settings, klik **Grade Promotion** di daftar sebelah kiri, lalu klik **Edit** di bagian **Grade Promotion**.
2. Nyalakan sakelar (akan menampilkan **Enabled**) dan pilih **Month** dan **Day** untuk menaikkan kelas setiap tahun. Pada tanggal tersebut, setiap orang yang memiliki kelas naik satu tingkat, dan siswa kelas 12 menjadi **Graduated**.
3. Simpan perubahan Anda.

Untuk menghentikan kenaikan kelas otomatis, matikan sakelar sehingga menampilkan **Disabled**, lalu simpan. Tanggal kenaikan dihapus dan kelas tidak akan berubah sendiri lagi.

## Pendaftaran Relawan {#volunteer-signup}

Secara default, anggota yang melihat [pendaftaran relawan](../../b1-church/serving/volunteer-signup.md) melihat setiap minggu mendatang yang masih memiliki posisi terbuka. Jika daftar ini menjadi panjang, Anda dapat hanya menampilkan minggu berikutnya untuk setiap jenis rencana.

1. Di halaman Settings, klik **Volunteer Signup** di daftar sebelah kiri, lalu klik **Edit** di bagian **Volunteer Signup**.
2. Nyalakan **Show only the next week of each plan type**.
3. Simpan perubahan Anda.

Dengan pengaturan ini aktif, setiap jenis rencana hanya menampilkan rencana berikutnya yang akan datang. Minggu berikutnya muncul setelah tanggal tersebut berlalu. Baris **Weeks shown** di bagian ini menampilkan **Only the next week of each plan type** atau **All upcoming weeks**.

## Privasi Pemberian {#giving-privacy}

Orang yang memiliki akses pemberian biasanya dapat melihat total pemberian seseorang pada [catatan orangnya](../people/adding-people.md#editing-details). Jika Anda tidak ingin jumlah tersebut terlihat setiap kali catatan dibuka, Anda dapat menyembunyikannya sampai seseorang memintanya.

1. Di halaman Settings, klik **Giving privacy** di daftar sebelah kiri, lalu klik **Edit** di bagian **Giving privacy**.
2. Nyalakan **Hide giving on person records until clicked**.
3. Simpan perubahan Anda.

Dengan pengaturan ini aktif, kartu pemberian pada catatan orang menampilkan tulisan "Giving is hidden on person records." Klik **Show giving** untuk memuat dan menampilkan pemberian orang tersebut. Tampilan akan disembunyikan lagi saat Anda membuka orang lain. Siapa yang dapat melihat pemberian tidak berubah: hanya orang yang memiliki akses pemberian yang melihat kartu tersebut.

## Impor dan Ekspor

Tautan **Import/Export** di bawah nama gereja Anda pada halaman Settings membuka alat khusus di jendela peramban baru. Gunakan ini untuk:

- Mengimpor data anggota dari sistem manajemen gereja lain.
- Mengekspor data ChurchApps Anda untuk keperluan cadangan atau migrasi.

Ini sangat membantu saat Anda pertama kali menyiapkan gereja dan perlu memindahkan catatan yang sudah ada ke ChurchApps.

:::warning
Saat mengimpor data, selalu cadangkan catatan yang sudah ada terlebih dahulu. Operasi impor menambahkan data ke sistem Anda dan dapat membuat entri duplikat jika dijalankan berkali-kali.
:::
